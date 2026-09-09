var J_ = Object.create,
	G0 = Object.defineProperty,
	W_ = Object.getOwnPropertyDescriptor,
	e1 = Object.getOwnPropertyNames,
	t1 = Object.getPrototypeOf,
	n1 = Object.prototype.hasOwnProperty,
	zn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	i1 = (e, n, a, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var l = e1(n), o = 0, f = l.length, h; o < f; o++)
				((h = l[o]),
					!n1.call(e, h) &&
						h !== a &&
						G0(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = W_(n, h)) || u.enumerable }));
		return e;
	},
	X0 = (e, n, a) => (
		(a = e != null ? J_(t1(e)) : {}),
		i1(n || !e || !e.__esModule ? G0(a, "default", { value: e, enumerable: !0 }) : a, e)
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
var a1 = zn((e) => {
		var n = Symbol.for("react.transitional.element"),
			a = Symbol.for("react.portal"),
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
			S = Symbol.iterator;
		function E(N) {
			return N === null || typeof N != "object"
				? null
				: ((N = (S && N[S]) || N["@@iterator"]), typeof N == "function" ? N : null);
		}
		var C = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			A = Object.assign,
			D = {};
		function T(N, X, re) {
			((this.props = N), (this.context = X), (this.refs = D), (this.updater = re || C));
		}
		((T.prototype.isReactComponent = {}),
			(T.prototype.setState = function (N, X) {
				if (typeof N != "object" && typeof N != "function" && N != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, N, X, "setState");
			}),
			(T.prototype.forceUpdate = function (N) {
				this.updater.enqueueForceUpdate(this, N, "forceUpdate");
			}));
		function R() {}
		R.prototype = T.prototype;
		function O(N, X, re) {
			((this.props = N), (this.context = X), (this.refs = D), (this.updater = re || C));
		}
		var I = (O.prototype = new R());
		((I.constructor = O), A(I, T.prototype), (I.isPureReactComponent = !0));
		var L = Array.isArray;
		function j() {}
		var k = { H: null, A: null, T: null, S: null },
			U = Object.prototype.hasOwnProperty;
		function B(N, X, re) {
			var le = re.ref;
			return { $$typeof: n, type: N, key: X, ref: le !== void 0 ? le : null, props: re };
		}
		function Z(N, X) {
			return B(N.type, X, N.props);
		}
		function ie(N) {
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
		function ae(N, X) {
			return typeof N == "object" && N !== null && N.key != null ? ee("" + N.key) : X.toString(36);
		}
		function z(N) {
			switch (N.status) {
				case "fulfilled":
					return N.value;
				case "rejected":
					throw N.reason;
				default:
					switch (
						(typeof N.status == "string"
							? N.then(j, j)
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
		function H(N, X, re, le, me) {
			var ve = typeof N;
			(ve === "undefined" || ve === "boolean") && (N = null);
			var Se = !1;
			if (N === null) Se = !0;
			else
				switch (ve) {
					case "bigint":
					case "string":
					case "number":
						Se = !0;
						break;
					case "object":
						switch (N.$$typeof) {
							case n:
							case a:
								Se = !0;
								break;
							case _:
								return ((Se = N._init), H(Se(N._payload), X, re, le, me));
						}
				}
			if (Se)
				return (
					(me = me(N)),
					(Se = le === "" ? "." + ae(N, 0) : le),
					L(me)
						? ((re = ""),
							Se != null && (re = Se.replace(K, "$&/") + "/"),
							H(me, X, re, "", function (At) {
								return At;
							}))
						: me != null &&
							(ie(me) &&
								(me = Z(
									me,
									re + (me.key == null || (N && N.key === me.key) ? "" : ("" + me.key).replace(K, "$&/") + "/") + Se,
								)),
							X.push(me)),
					1
				);
			Se = 0;
			var Ze = le === "" ? "." : le + ":";
			if (L(N))
				for (var qe = 0; qe < N.length; qe++) ((le = N[qe]), (ve = Ze + ae(le, qe)), (Se += H(le, X, re, ve, me)));
			else if (((qe = E(N)), typeof qe == "function"))
				for (N = qe.call(N), qe = 0; !(le = N.next()).done; )
					((le = le.value), (ve = Ze + ae(le, qe++)), (Se += H(le, X, re, ve, me)));
			else if (ve === "object") {
				if (typeof N.then == "function") return H(z(N), X, re, le, me);
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
		function $(N, X, re) {
			if (N == null) return N;
			var le = [],
				me = 0;
			return (
				H(N, le, "", "", function (ve) {
					return X.call(re, ve, me++);
				}),
				le
			);
		}
		function G(N) {
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
		var oe =
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
			_e = {
				map: $,
				forEach: function (N, X, re) {
					$(
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
						$(N, function () {
							X++;
						}),
						X
					);
				},
				toArray: function (N) {
					return (
						$(N, function (X) {
							return X;
						}) || []
					);
				},
				only: function (N) {
					if (!ie(N)) throw Error("React.Children.only expected to receive a single React element child.");
					return N;
				},
			};
		((e.Activity = p),
			(e.Children = _e),
			(e.Component = T),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = O),
			(e.StrictMode = l),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (N) {
					return k.H.useMemoCache(N);
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
				var le = A({}, N.props),
					me = N.key;
				if (X != null)
					for (ve in (X.key !== void 0 && (me = "" + X.key), X))
						!U.call(X, ve) ||
							ve === "key" ||
							ve === "__self" ||
							ve === "__source" ||
							(ve === "ref" && X.ref === void 0) ||
							(le[ve] = X[ve]);
				var ve = arguments.length - 2;
				if (ve === 1) le.children = re;
				else if (1 < ve) {
					for (var Se = Array(ve), Ze = 0; Ze < ve; Ze++) Se[Ze] = arguments[Ze + 2];
					le.children = Se;
				}
				return B(N.type, me, le);
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
				var le,
					me = {},
					ve = null;
				if (X != null)
					for (le in (X.key !== void 0 && (ve = "" + X.key), X))
						U.call(X, le) && le !== "key" && le !== "__self" && le !== "__source" && (me[le] = X[le]);
				var Se = arguments.length - 2;
				if (Se === 1) me.children = re;
				else if (1 < Se) {
					for (var Ze = Array(Se), qe = 0; qe < Se; qe++) Ze[qe] = arguments[qe + 2];
					me.children = Ze;
				}
				if (N && N.defaultProps) for (le in ((Se = N.defaultProps), Se)) me[le] === void 0 && (me[le] = Se[le]);
				return B(N, ve, me);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (N) {
				return { $$typeof: m, render: N };
			}),
			(e.isValidElement = ie),
			(e.lazy = function (N) {
				return { $$typeof: _, _payload: { _status: -1, _result: N }, _init: G };
			}),
			(e.memo = function (N, X) {
				return { $$typeof: g, type: N, compare: X === void 0 ? null : X };
			}),
			(e.startTransition = function (N) {
				var X = k.T,
					re = {};
				k.T = re;
				try {
					var le = N(),
						me = k.S;
					(me !== null && me(re, le),
						typeof le == "object" && le !== null && typeof le.then == "function" && le.then(j, oe));
				} catch (ve) {
					oe(ve);
				} finally {
					(X !== null && re.types !== null && (X.types = re.types), (k.T = X));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return k.H.useCacheRefresh();
			}),
			(e.use = function (N) {
				return k.H.use(N);
			}),
			(e.useActionState = function (N, X, re) {
				return k.H.useActionState(N, X, re);
			}),
			(e.useCallback = function (N, X) {
				return k.H.useCallback(N, X);
			}),
			(e.useContext = function (N) {
				return k.H.useContext(N);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (N, X) {
				return k.H.useDeferredValue(N, X);
			}),
			(e.useEffect = function (N, X) {
				return k.H.useEffect(N, X);
			}),
			(e.useEffectEvent = function (N) {
				return k.H.useEffectEvent(N);
			}),
			(e.useId = function () {
				return k.H.useId();
			}),
			(e.useImperativeHandle = function (N, X, re) {
				return k.H.useImperativeHandle(N, X, re);
			}),
			(e.useInsertionEffect = function (N, X) {
				return k.H.useInsertionEffect(N, X);
			}),
			(e.useLayoutEffect = function (N, X) {
				return k.H.useLayoutEffect(N, X);
			}),
			(e.useMemo = function (N, X) {
				return k.H.useMemo(N, X);
			}),
			(e.useOptimistic = function (N, X) {
				return k.H.useOptimistic(N, X);
			}),
			(e.useReducer = function (N, X, re) {
				return k.H.useReducer(N, X, re);
			}),
			(e.useRef = function (N) {
				return k.H.useRef(N);
			}),
			(e.useState = function (N) {
				return k.H.useState(N);
			}),
			(e.useSyncExternalStore = function (N, X, re) {
				return k.H.useSyncExternalStore(N, X, re);
			}),
			(e.useTransition = function () {
				return k.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	ao = zn((e, n) => {
		n.exports = a1();
	}),
	Qn = [],
	Mn = [],
	r1 = Uint8Array,
	Qf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Ar = 0, u1 = Qf.length; Ar < u1; ++Ar) ((Qn[Ar] = Qf[Ar]), (Mn[Qf.charCodeAt(Ar)] = Ar));
Mn[45] = 62;
Mn[95] = 63;
function s1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var a = e.indexOf("=");
	a === -1 && (a = n);
	var u = a === n ? 0 : 4 - (a % 4);
	return [a, u];
}
function l1(e, n, a) {
	return ((n + a) * 3) / 4 - a;
}
function Pu(e) {
	var n,
		a = s1(e),
		u = a[0],
		l = a[1],
		o = new r1(l1(e, u, l)),
		f = 0,
		h = l > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(Mn[e.charCodeAt(m)] << 18) |
			(Mn[e.charCodeAt(m + 1)] << 12) |
			(Mn[e.charCodeAt(m + 2)] << 6) |
			Mn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		l === 2 && ((n = (Mn[e.charCodeAt(m)] << 2) | (Mn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		l === 1 &&
			((n = (Mn[e.charCodeAt(m)] << 10) | (Mn[e.charCodeAt(m + 1)] << 4) | (Mn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function o1(e) {
	return Qn[(e >> 18) & 63] + Qn[(e >> 12) & 63] + Qn[(e >> 6) & 63] + Qn[e & 63];
}
function c1(e, n, a) {
	for (var u, l = [], o = n; o < a; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), l.push(o1(u)));
	return l.join("");
}
function Yu(e) {
	for (var n, a = e.length, u = a % 3, l = [], o = 16383, f = 0, h = a - u; f < h; f += o)
		l.push(c1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[a - 1]), l.push(Qn[n >> 2] + Qn[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[a - 2] << 8) + e[a - 1]), l.push(Qn[n >> 10] + Qn[(n >> 4) & 63] + Qn[(n << 2) & 63] + "=")),
		l.join("")
	);
}
function wi(e) {
	if (e === void 0) return {};
	if (!J0(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function f1(e) {
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
	Ur = BigInt("-9223372036854775808"),
	kd = BigInt("9223372036854775807"),
	dd = BigInt("0"),
	d1 = BigInt("8"),
	h1 = BigInt("256"),
	Pf =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	eb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Pf);
		}
		valueOf() {
			throw new Error(Pf);
		}
		toJSON() {
			throw new Error(Pf);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	m1 = new eb();
function tb(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function v1(e) {
	e < dd && (e -= Ur + Ur);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const a = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const l of n.match(/.{2}/g).reverse()) (a.set([parseInt(l, 16)], u++), (e >>= d1));
	return Yu(a);
}
function g1(e) {
	const n = Pu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let a = dd,
		u = dd;
	for (const l of n) ((a += BigInt(l) * h1 ** u), u++);
	return (a > kd && (a += Ur + Ur), a);
}
function y1(e) {
	if (e < Ur || kd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), Yu(new Uint8Array(n)));
}
function b1(e) {
	const n = Pu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var p1 = DataView.prototype.setBigInt64 ? y1 : v1,
	S1 = DataView.prototype.getBigInt64 ? b1 : g1,
	gy = 1024;
function hd(e) {
	if (e.length > gy) throw new Error(`Field name ${e} exceeds maximum field name length ${gy}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const a = e.charCodeAt(n);
		if (a < 32 || a >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Lr(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Lr(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return Pu(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return S1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const l = Pu(e.$float);
			if (l.byteLength !== 8) throw new Error(`Received ${l.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(l.buffer).getFloat64(0, W0);
			if (!tb(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return m1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const a = {};
	for (const [u, l] of Object.entries(e)) (hd(u), (a[u] = Lr(l)));
	return a;
}
var yy = 16384;
function kr(e) {
	const n = JSON.stringify(e, (a, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > yy) {
		const a = "[...truncated]";
		let u = yy - 14;
		const l = n.codePointAt(u - 1);
		return (l !== void 0 && l > 65535 && (u -= 1), n.substring(0, u) + a);
	}
	return n;
}
function Ql(e, n, a, u) {
	if (e === void 0) {
		const f = a && ` (present at path ${a} in original object ${kr(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Ur || kd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: p1(e) };
	}
	if (typeof e == "number")
		if (tb(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, W0), { $float: Yu(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: Yu(new Uint8Array(e)) };
	if (e instanceof eb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Ql(f, n, a + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Yf(a, "Set", [...e], n));
	if (e instanceof Map) throw new Error(Yf(a, "Map", [...e], n));
	if (!J0(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Yf(a, h, e, n));
	}
	const l = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (hd(f), (l[f] = Ql(h, n, a + `.${f}`, !1))) : u && (hd(f), (l[f] = w1(h, n, a + `.${f}`)));
	return l;
}
function Yf(e, n, a, u) {
	return e
		? `${n}${kr(a)} is not a supported Convex type (present at path ${e} in original object ${kr(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${kr(a)} is not a supported Convex type.`;
}
function w1(e, n, a) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${kr(e)} but original value is undefined`);
	return Ql(e, n, a, !1);
}
function Un(e) {
	return Ql(e, e, "", !1);
}
var _1 = Object.defineProperty,
	x1 = (e, n, a) => (n in e ? _1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	tt = (e, n, a) => x1(e, typeof n != "symbol" ? n + "" : n, a),
	E1 = "https://docs.convex.dev/error#undefined-validator";
function Fu(e, n) {
	const a = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${a} in ${e}. This is often caused by circular imports. See ${E1} for details.`,
	);
}
var sn = class {
		constructor({ isOptional: e }) {
			(tt(this, "type"),
				tt(this, "fieldPaths"),
				tt(this, "isOptional"),
				tt(this, "isConvexValidator"),
				(this.isOptional = e),
				(this.isConvexValidator = !0));
		}
	},
	C1 = class nb extends sn {
		constructor({ isOptional: n, tableName: a }) {
			if ((super({ isOptional: n }), tt(this, "tableName"), tt(this, "kind", "id"), typeof a != "string"))
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
	by = class ib extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "float64"));
		}
		get json() {
			return { type: "number" };
		}
		asOptional() {
			return new ib({ isOptional: "optional" });
		}
	},
	py = class ab extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "int64"));
		}
		get json() {
			return { type: "bigint" };
		}
		asOptional() {
			return new ab({ isOptional: "optional" });
		}
	},
	T1 = class rb extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "commitTs"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new rb({ isOptional: "optional" });
		}
	},
	A1 = class ub extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "boolean"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ub({ isOptional: "optional" });
		}
	},
	R1 = class sb extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "bytes"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new sb({ isOptional: "optional" });
		}
	},
	O1 = class lb extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "string"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new lb({ isOptional: "optional" });
		}
	},
	N1 = class ob extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "null"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ob({ isOptional: "optional" });
		}
	},
	M1 = class cb extends sn {
		constructor() {
			(super(...arguments), tt(this, "kind", "any"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new cb({ isOptional: "optional" });
		}
	},
	z1 = class Or extends sn {
		constructor({ isOptional: n, fields: a }) {
			(super({ isOptional: n }),
				tt(this, "fields"),
				tt(this, "kind", "object"),
				globalThis.Object.entries(a).forEach(([u, l]) => {
					if ((l === void 0 && Fu("v.object()", u), !l.isConvexValidator))
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
			return new Or({ isOptional: "optional", fields: this.fields });
		}
		omit(...n) {
			const a = { ...this.fields };
			for (const u of n) delete a[u];
			return new Or({ isOptional: this.isOptional, fields: a });
		}
		pick(...n) {
			const a = {};
			for (const u of n) a[u] = this.fields[u];
			return new Or({ isOptional: this.isOptional, fields: a });
		}
		partial() {
			const n = {};
			for (const [a, u] of globalThis.Object.entries(this.fields)) n[a] = u.asOptional();
			return new Or({ isOptional: this.isOptional, fields: n });
		}
		extend(n) {
			return new Or({ isOptional: this.isOptional, fields: { ...this.fields, ...n } });
		}
	},
	k1 = class fb extends sn {
		constructor({ isOptional: n, value: a }) {
			if (
				(super({ isOptional: n }),
				tt(this, "value"),
				tt(this, "kind", "literal"),
				typeof a != "string" && typeof a != "boolean" && typeof a != "number" && typeof a != "bigint")
			)
				throw new Error("v.literal(value) must be a string, number, or boolean");
			this.value = a;
		}
		get json() {
			return { type: this.kind, value: Un(this.value) };
		}
		asOptional() {
			return new fb({ isOptional: "optional", value: this.value });
		}
	},
	D1 = class db extends sn {
		constructor({ isOptional: n, element: a }) {
			(super({ isOptional: n }),
				tt(this, "element"),
				tt(this, "kind", "array"),
				a === void 0 && Fu("v.array()"),
				(this.element = a));
		}
		get json() {
			return { type: this.kind, value: this.element.json };
		}
		asOptional() {
			return new db({ isOptional: "optional", element: this.element });
		}
	},
	j1 = class hb extends sn {
		constructor({ isOptional: n, key: a, value: u }) {
			if (
				(super({ isOptional: n }),
				tt(this, "key"),
				tt(this, "value"),
				tt(this, "kind", "record"),
				a === void 0 && Fu("v.record()", "key"),
				u === void 0 && Fu("v.record()", "value"),
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
	q1 = class mb extends sn {
		constructor({ isOptional: n, members: a }) {
			(super({ isOptional: n }),
				tt(this, "members"),
				tt(this, "kind", "union"),
				a.forEach((u, l) => {
					if ((u === void 0 && Fu("v.union()", `member at index ${l}`), !u.isConvexValidator))
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
	ce = {
		id: (e) => new C1({ isOptional: "required", tableName: e }),
		null: () => new N1({ isOptional: "required" }),
		number: () => new by({ isOptional: "required" }),
		float64: () => new by({ isOptional: "required" }),
		bigint: () => new py({ isOptional: "required" }),
		int64: () => new py({ isOptional: "required" }),
		commitTs: () => new T1({ isOptional: "required" }),
		boolean: () => new A1({ isOptional: "required" }),
		string: () => new O1({ isOptional: "required" }),
		bytes: () => new R1({ isOptional: "required" }),
		literal: (e) => new k1({ isOptional: "required", value: e }),
		array: (e) => new D1({ isOptional: "required", element: e }),
		object: (e) => new z1({ isOptional: "required", fields: e }),
		record: (e, n) => new j1({ isOptional: "required", key: e, value: n }),
		union: (...e) => new q1({ isOptional: "required", members: e }),
		any: () => new M1({ isOptional: "required" }),
		optional: (e) => e.asOptional(),
		nullable: (e) => ce.union(e, ce.null()),
	},
	I1 = Object.defineProperty,
	U1 = (e, n, a) => (n in e ? I1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Ff = (e, n, a) => U1(e, typeof n != "symbol" ? n + "" : n, a),
	Sy,
	wy,
	L1 = Symbol.for("ConvexError"),
	md = class extends ((wy = Error), (Sy = L1), wy) {
		constructor(e) {
			(super(typeof e == "string" ? e : kr(e)),
				Ff(this, "name", "ConvexError"),
				Ff(this, "data"),
				Ff(this, Sy, !0),
				(this.data = e));
		}
	},
	_y = "1.44.0",
	$1 = Object.defineProperty,
	B1 = (e, n, a) => (n in e ? $1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	xy = (e, n, a) => B1(e, typeof n != "symbol" ? n + "" : n, a),
	V1 = "color:rgb(0, 145, 255)";
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
		(xy(this, "_onLogLineFuncs"), xy(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, V1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${l}`);
}
function H1(e, n) {
	const a = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(a), new Error(a));
}
function Mr(e, n, a) {
	return `[CONVEX ${vb(e)}(${n})] ${a.errorMessage}
  Called by client`;
}
function vd(e, n) {
	return ((n.data = e.errorData), n);
}
function ka(e) {
	const n = e.split(":");
	let a, u;
	return (
		n.length === 1 ? ((a = n[0]), (u = "default")) : ((a = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		a.endsWith(".js") && (a = a.slice(0, -3)),
		`${a}:${u}`
	);
}
function Ma(e, n) {
	return JSON.stringify({ udfPath: ka(e), args: Un(n) });
}
function Ey(e, n, a) {
	const { initialNumItems: u, id: l } = a;
	return JSON.stringify({ type: "paginated", udfPath: ka(e), args: Un(n), options: Un({ initialNumItems: u, id: l }) });
}
var Z1 = Object.defineProperty,
	Q1 = (e, n, a) => (n in e ? Z1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Zn = (e, n, a) => Q1(e, typeof n != "symbol" ? n + "" : n, a),
	P1 = class {
		constructor() {
			(Zn(this, "nextQueryId"),
				Zn(this, "querySetVersion"),
				Zn(this, "querySet"),
				Zn(this, "queryIdToToken"),
				Zn(this, "identityVersion"),
				Zn(this, "auth"),
				Zn(this, "outstandingQueriesOlderThanRestart"),
				Zn(this, "outstandingAuthOlderThanRestart"),
				Zn(this, "paused"),
				Zn(this, "pendingQuerySetModifications"),
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
			const l = ka(e),
				o = Ma(l, n),
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
					g = this.querySetVersion + 1,
					_ = { type: "Add", queryId: h, udfPath: l, args: [Un(n)], journal: a, componentPath: u };
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
			const a = Ma(ka(e), n),
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
					args: [Un(u.args)],
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
	Y1 = Object.defineProperty,
	F1 = (e, n, a) => (n in e ? Y1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	jl = (e, n, a) => F1(e, typeof n != "symbol" ? n + "" : n, a),
	K1 = class {
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
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Lr(e.result) }), (f = () => l.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Pl(this.logger, "error", a, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Lr(m) : void 0, logLines: e.logLines }),
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
	Ku = Symbol.for("functionName"),
	pb = Symbol.for("toReferencePath");
function G1(e) {
	return e[pb] ?? null;
}
function X1(e) {
	return e.startsWith("function://");
}
function J1(e) {
	let n;
	if (typeof e == "string") X1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[Ku]) n = { name: e[Ku] };
	else {
		const a = G1(e);
		if (!a) throw new Error(`${e} is not a functionReference`);
		n = { reference: a };
	}
	return n;
}
function Qt(e) {
	const n = J1(e);
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
	const a = e[Ku];
	if (!a) throw new Error(`${e} is not a functionReference`);
	return a;
}
function Dd(e) {
	return { [Ku]: e };
}
function Sb(e = []) {
	return new Proxy(
		{},
		{
			get(n, a) {
				if (typeof a == "string") return Sb([...e, a]);
				if (a === Ku) {
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
	W1 = Object.defineProperty,
	ex = (e, n, a) => (n in e ? W1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Yl = (e, n, a) => ex(e, typeof n != "symbol" ? n + "" : n, a),
	Cy = class gd {
		constructor(n) {
			(Yl(this, "queryResults"), Yl(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...a) {
			const u = wi(a[0]),
				l = Qt(n),
				o = this.queryResults.get(Ma(l, u));
			if (o !== void 0) return gd.queryValue(o.result);
		}
		getAllQueries(n) {
			const a = [],
				u = Qt(n);
			for (const l of this.queryResults.values())
				l.udfPath === ka(u) && a.push({ args: l.args, value: gd.queryValue(l.result) });
			return a;
		}
		setQuery(n, a, u) {
			const l = wi(a),
				o = Qt(n),
				f = Ma(o, l);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: l, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	tx = class {
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
			const u = new Cy(this.queryResults);
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
			const a = new Cy(this.queryResults);
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
				throw a.errorData !== void 0 ? vd(a, new md(Mr("query", n.udfPath, a))) : new Error(Mr("query", n.udfPath, a));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	nx = Object.defineProperty,
	ix = (e, n, a) => (n in e ? nx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Kf = (e, n, a) => ix(e, typeof n != "symbol" ? n + "" : n, a),
	ts = class pi {
		constructor(n, a) {
			(Kf(this, "low"),
				Kf(this, "high"),
				Kf(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = a | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new pi(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? Ty : n >= ax ? rx : new pi((n % Hu) | 0, (n / Hu) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(Hu) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				pi.isLong(n) || (n = pi.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				pi.isLong(n) || (n = pi.fromValue(n)),
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
			return typeof n == "number" ? pi.fromNumber(n) : new pi(n.low, n.high);
		}
	},
	Ty = new ts(0, 0),
	Ay = 65536,
	Hu = Ay * Ay,
	ax = Hu * Hu,
	rx = new ts(-1, -1),
	ux = Object.defineProperty,
	sx = (e, n, a) => (n in e ? ux(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	ql = (e, n, a) => sx(e, typeof n != "symbol" ? n + "" : n, a),
	Ry = class {
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
						const l = Lr(a.value ?? null);
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
							errorData: l !== void 0 ? Lr(l) : void 0,
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
function Gf(e) {
	const n = Pu(e);
	return ts.fromBytesLE(Array.from(n));
}
function lx(e) {
	const n = new Uint8Array(e.toBytesLE());
	return Yu(n);
}
function Oy(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: Gf(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: Gf(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: Gf(e.endVersion.ts) },
			};
		default:
	}
}
function ox(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: lx(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var cx = Object.defineProperty,
	fx = (e, n, a) => (n in e ? cx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	wt = (e, n, a) => fx(e, typeof n != "symbol" ? n + "" : n, a),
	dx = 1e3,
	hx = 1001,
	mx = 1005,
	vx = 4040,
	Hl;
function Nr() {
	return (
		Hl === void 0 && (Hl = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Hl + performance.now())
	);
}
function Ny() {
	return `t=${Math.round((Nr() - Hl) / 100) / 10}s`;
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
function gx(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(_b)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var yx = class {
	constructor(e, n, a, u, l, o) {
		((this.markConnectionStateDirty = l),
			(this.debug = o),
			wt(this, "socket"),
			wt(this, "connectionCount"),
			wt(this, "_hasEverConnected", !1),
			wt(this, "lastCloseReason"),
			wt(this, "transitionChunkBuffer", null),
			wt(this, "defaultInitialBackoff"),
			wt(this, "maxBackoff"),
			wt(this, "retries"),
			wt(this, "serverInactivityThreshold"),
			wt(this, "reconnectDueToServerInactivityTimeout"),
			wt(this, "scheduledReconnect", null),
			wt(this, "networkOnlineHandler", null),
			wt(this, "pendingNetworkRecoveryInfo", null),
			wt(this, "uri"),
			wt(this, "onOpen"),
			wt(this, "onResume"),
			wt(this, "onMessage"),
			wt(this, "webSocketConstructor"),
			wt(this, "logger"),
			wt(this, "onServerDisconnectError"),
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
			const a = Oy(JSON.parse(n));
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
							clientTs: Nr(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", Ny(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", Ny())),
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
				let u = Oy(JSON.parse(n.data));
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
					n.code !== dx && n.code !== hx && n.code !== mx && n.code !== vx)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const a = gx(n.reason);
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
			const a = ox(e),
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
		const a = Nr(),
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
			const n = Nr() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Nr(),
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
		const a = Nr() - e.clientClockSkew - e.serverTs / 1e6,
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
function bx() {
	return px();
}
function px() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var Bu = class extends Error {};
Bu.prototype.name = "InvalidTokenError";
function Sx(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, a) => {
			let u = a.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function wx(e) {
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
		return Sx(n);
	} catch {
		return atob(n);
	}
}
function xb(e, n) {
	if (typeof e != "string") throw new Bu("Invalid token specified: must be a string");
	n || (n = {});
	const a = n.header === !0 ? 0 : 1,
		u = e.split(".")[a];
	if (typeof u != "string") throw new Bu(`Invalid token specified: missing part #${a + 1}`);
	let l;
	try {
		l = wx(u);
	} catch (o) {
		throw new Bu(`Invalid token specified: invalid base64 for part #${a + 1} (${o.message})`);
	}
	try {
		return JSON.parse(l);
	} catch (o) {
		throw new Bu(`Invalid token specified: invalid json for part #${a + 1} (${o.message})`);
	}
}
var _x = Object.defineProperty,
	xx = (e, n, a) => (n in e ? _x(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	an = (e, n, a) => xx(e, typeof n != "symbol" ? n + "" : n, a),
	Ex = 480 * 60 * 60 * 1e3,
	My = 2,
	Cx = class {
		constructor(e, n, a) {
			(an(this, "authState", { state: "noAuth" }),
				an(this, "configVersion", 0),
				an(this, "syncState"),
				an(this, "authenticate"),
				an(this, "stopSocket"),
				an(this, "tryRestartSocket"),
				an(this, "pauseSocket"),
				an(this, "resumeSocket"),
				an(this, "clearAuth"),
				an(this, "logger"),
				an(this, "refreshTokenLeewaySeconds"),
				an(this, "initialAuthTokenReuse"),
				an(this, "lastRefreshChange"),
				an(this, "tokenConfirmationAttempts", 0),
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= My))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${My - this.tokenConfirmationAttempts} attempts remaining`)),
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
			let h = Math.min(Ex, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
	Tx = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function Ax(e, n) {
	const a = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: a });
}
function Rx(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function Ox(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const a of Tx) {
		const u = performance
			.getEntriesByName(a)
			.filter((l) => l.entryType === "mark")
			.filter((l) => l.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(Rx);
}
var Nx = Object.defineProperty,
	Mx = (e, n, a) => (n in e ? Nx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	_t = (e, n, a) => Mx(e, typeof n != "symbol" ? n + "" : n, a),
	zx = class {
		constructor(e, n, a) {
			if (
				(_t(this, "address"),
				_t(this, "state"),
				_t(this, "requestManager"),
				_t(this, "webSocketManager"),
				_t(this, "authenticationManager"),
				_t(this, "remoteQuerySet"),
				_t(this, "optimisticQueryResults"),
				_t(this, "_transitionHandlerCounter", 0),
				_t(this, "_nextRequestId"),
				_t(this, "_onTransitionFns", new Map()),
				_t(this, "_sessionId"),
				_t(this, "firstMessageReceived", !1),
				_t(this, "debug"),
				_t(this, "logger"),
				_t(this, "maxObservedTimestamp"),
				_t(this, "connectionStateSubscribers", new Map()),
				_t(this, "nextConnectionStateSubscriberId", 0),
				_t(this, "_lastPublishedConnectionState"),
				_t(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const p = this.connectionState();
						if (JSON.stringify(p) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = p;
							for (const S of this.connectionStateSubscribers.values()) S(p);
						}
					});
				}),
				_t(this, "mark", (p) => {
					this.debug && Ax(p, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(a?.skipConvexDeploymentUrlCheck !== !0 && f1(e), (a = { ...a }));
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
			const v = `${m}://${f}/api/${_y}/sync`;
			((this.state = new P1()),
				(this.remoteQuerySet = new Ry((p) => this.state.queryPath(p), this.logger)),
				(this.requestManager = new K1(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new Cx(
				this.state,
				{
					authenticate: (p) => {
						const S = this.state.setAuth(p);
						return (this.webSocketManager.sendMessage(S), S.baseVersion);
					},
					stopSocket: () => this.webSocketManager.stop(),
					tryRestartSocket: () => this.webSocketManager.tryRestart(),
					pauseSocket: g,
					resumeSocket: () => this.webSocketManager.resume(),
					clearAuth: () => {
						this.clearAuth();
					},
				},
				{ logger: this.logger, refreshTokenLeewaySeconds: u, initialAuthTokenReuse: a.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new tx()),
				this.addOnTransitionHandler((p) => {
					n(p.queries.map((S) => S.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = bx()));
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
			((this.webSocketManager = new yx(
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
							(this.remoteQuerySet = new Ry((C) => this.state.queryPath(C), this.logger)));
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
								const S = H1(this.logger, p.error);
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
				a.expectAuth && g());
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
			const u = wi(n),
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
			const a = Ma(e, wi(n));
			return this.optimisticQueryResults.queryResult(a);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const a = Ma(e, wi(n));
			return this.optimisticQueryResults.queryLogs(a);
		}
		queryJournal(e, n) {
			const a = Ma(e, wi(n));
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
				throw u.errorData !== void 0 ? vd(u, new md(Mr("mutation", e, u))) : new Error(Mr("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, a, u) {
			const { mutationPromise: l } = this.enqueueMutation(e, n, a, u);
			return l;
		}
		enqueueMutation(e, n, a, u) {
			const l = wi(n);
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
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Un(l)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const a = await this.actionInternal(e, n);
			if (!a.success) throw a.errorData !== void 0 ? vd(a, new md(Mr("action", e, a))) : new Error(Mr("action", e, a));
			return a.value;
		}
		async actionInternal(e, n, a) {
			const u = wi(n),
				l = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: l, udfPath: e, componentPath: a, args: [Un(u)] },
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
				const e = Ox(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${_y}` },
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
function Xf(e) {
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
var kx = Object.defineProperty,
	Dx = (e, n, a) => (n in e ? kx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	zy = (e, n, a) => Dx(e, typeof n != "symbol" ? n + "" : n, a),
	jx = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				zy(this, "paginatedQuerySet", new Map()),
				zy(this, "lastTransitionTs"),
				(this.lastTransitionTs = ts.fromNumber(0)),
				this.client.addOnTransitionHandler((a) => this.onBaseTransition(a)));
		}
		subscribe(e, n, a) {
			const u = ka(e),
				l = Ey(u, n, a),
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
			const u = Ey(ka(e), n, a);
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
				const v = Xf(m);
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
			const l = Xf(u);
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
					const g = Xf(v);
					g.splitCursor &&
						(g.pageStatus === "SplitRecommended" ||
							g.pageStatus === "SplitRequired" ||
							g.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, g.splitCursor, g.continueCursor);
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
	w = X0(ao(), 1);
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
var qx = Object.defineProperty,
	Ix = (e, n, a) => (n in e ? qx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	bi = (e, n, a) => Ix(e, typeof n != "symbol" ? n + "" : n, a),
	Ux = 5e3;
if (typeof w.default > "u") throw new Error("Required dependency 'react' not found");
function Cb(e, n, a) {
	function u(l) {
		return (Vx(l), n.mutation(e, l, { optimisticUpdate: a }));
	}
	return (
		(u.withOptimisticUpdate = function (o) {
			if (a !== void 0) throw new Error(`Already specified optimistic update for mutation ${Qt(e)}`);
			return Cb(e, n, o);
		}),
		u
	);
}
function Lx(e, n) {
	return function (a) {
		return n.action(e, a);
	};
}
var Tb = class {
		constructor(e, n) {
			if (
				(bi(this, "address"),
				bi(this, "cachedSync"),
				bi(this, "cachedPaginatedQueryClient"),
				bi(this, "listeners"),
				bi(this, "options"),
				bi(this, "closed", !1),
				bi(this, "_logger"),
				bi(this, "adminAuth"),
				bi(this, "fakeUserIdentity"),
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
				: ((this.cachedSync = this.options.baseClient ?? new zx(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new jx(this.cachedSync, (e) => this.handleTransition(e))),
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
				l = Qt(e);
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
			const n = e.extendSubscriptionFor ?? Ux,
				a = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(a, n);
		}
		watchPaginatedQuery(e, n, a) {
			const u = Qt(e);
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
				l = Qt(e);
			return this.sync.mutation(l, a, u);
		}
		action(e, ...n) {
			const a = Qt(e);
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
function $a() {
	return (0, w.useContext)(ns);
}
var $x = ({ client: e, children: n }) => w.createElement(ns.Provider, { value: e }, n);
function Dr(e, ...n) {
	const a = n[0] === "skip",
		u = n[0] === "skip" ? {} : wi(n[0]),
		l = typeof e == "string" ? Dd(e) : e,
		o = Qt(l),
		f = jd((0, w.useMemo)(() => (a ? {} : { query: { query: l, args: u } }), [JSON.stringify(Un(u)), o, a])).query;
	if (f instanceof Error) throw f;
	return f;
}
function za(e) {
	const n = typeof e == "string" ? Dd(e) : e,
		a = (0, w.useContext)(ns);
	if (a === void 0)
		throw new Error(
			"Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, w.useMemo)(() => Cb(n, a), [a, Qt(n)]);
}
function Ab(e) {
	const n = (0, w.useContext)(ns),
		a = typeof e == "string" ? Dd(e) : e;
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, w.useMemo)(() => Lx(a, n), [n, Qt(a)]);
}
function Bx() {
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
function Vx(e) {
	if (typeof e == "object" && e !== null && "bubbles" in e && "persist" in e && "isDefaultPrevented" in e)
		throw new Error(
			"Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like `const handler = () => myMutation();` and using `handler` in the event handler.",
		);
}
var Hx = Object.defineProperty,
	Zx = (e, n, a) => (n in e ? Hx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Jf = (e, n, a) => Zx(e, typeof n != "symbol" ? n + "" : n, a),
	Qx = class {
		constructor(e) {
			(Jf(this, "createWatch"),
				Jf(this, "queries"),
				Jf(this, "listeners"),
				(this.createWatch = e),
				(this.queries = {}),
				(this.listeners = new Set()));
		}
		setQueries(e) {
			for (const n of Object.keys(e)) {
				const { query: a, args: u, paginationOptions: l } = e[n];
				if ((Qt(a), this.queries[n] === void 0)) this.addQuery(n, a, u, l ? { paginationOptions: l } : {});
				else {
					const o = this.queries[n];
					(Qt(a) !== Qt(o.query) ||
						JSON.stringify(Un(u)) !== JSON.stringify(Un(o.args)) ||
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
				Qt(u);
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
function jd(e) {
	const n = $a();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return Px(
		e,
		(0, w.useMemo)(
			() =>
				(a, u, { journal: l, paginationOptions: o }) =>
					o ? n.watchPaginatedQuery(a, u, o) : n.watchQuery(a, u, l ? { journal: l } : {}),
			[n],
		),
	);
}
function Px(e, n) {
	const [a] = (0, w.useState)(() => new Qx(n));
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
var Yx = () => Rb("components", []),
	Fx = wb,
	ky = 6e4,
	Kx = 500,
	Gx = 1e4,
	Xx = 1e3,
	Jx = 3e4,
	Wx = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function Dy(e) {
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
function jy(e) {
	const n = document.documentElement;
	for (const [a, u] of Object.entries(e.tokens)) n.style.setProperty(a, u);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function eE(e) {
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
function tE() {
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
	if (!Wx.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: l, nonce: o };
}
async function nE() {
	const { parentOrigin: e, nonce: n } = tE();
	let a = "",
		u = "",
		l = 0,
		o = "",
		f = 0,
		h = null;
	const m = new Set(),
		v = new Map();
	let g = null;
	async function _() {
		return Date.now() >= l - ky ? p() : u;
	}
	function p() {
		if (g) return g;
		const R = crypto.randomUUID();
		return (
			(g = new Promise((O, I) => {
				const L = setTimeout(() => {
					(v.delete(R), I(new Error("Plugin frame token refresh timed out")));
				}, Gx);
				v.set(R, { resolve: O, reject: I, timeout: L });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: R }, e);
				} catch (j) {
					(clearTimeout(L), v.delete(R), I(j));
				}
			}).finally(() => {
				g = null;
			})),
			g
		);
	}
	const S = () => o !== "" && Date.now() < f - ky,
		E = (R) => {
			typeof R.jwt == "string" && typeof R.jwtExpiresAt == "number" && Number.isFinite(R.jwtExpiresAt)
				? ((o = R.jwt), (f = R.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function C(R, O, I) {
		const L = JSON.stringify(O),
			j = (ie) => {
				const ee = new Headers(I?.headers);
				return (
					ee.set("Authorization", `Bearer ${ie}`),
					ee.set("Content-Type", "application/json"),
					ee.set("Accept", "application/json"),
					fetch(a + R, { ...I, method: "POST", body: L, headers: ee, redirect: "error" })
				);
			},
			k = await _();
		let U = await j(k);
		U.status === 401 && (U = await j(u !== k ? u : await p()));
		const B = await U.text();
		let Z = null;
		try {
			Z = JSON.parse(B);
		} catch {}
		return { status: U.status, body: Z };
	}
	async function A(R) {
		const O = new Headers(R);
		return (O.set("Authorization", `Bearer ${await _()}`), O);
	}
	const D = (R) =>
		fetch(a + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: R }),
		});
	async function T(R) {
		const O = R?.forceRefreshToken === !0;
		for (let I = 0; ; I += 1) {
			if (S() && !O) return o;
			let L = null;
			try {
				if (o !== "" && (await p(), S())) return o;
				((L = await D(await _())), L.status === 401 && (L = await D(await p())));
			} catch {
				L = null;
			}
			if (L?.ok) {
				const j = await L.json().catch(() => null),
					k = j?._yay?.jwt,
					U = j?._yay?.sessionExpiresAt;
				return typeof k != "string" || typeof U != "number" ? null : ((l = U), (o = k), (f = U), k);
			}
			if (!(L === null || L.status === 429 || L.status >= 500) || I >= 2) return null;
			await new Promise((j) => setTimeout(j, 1e3 * (I + 1)));
		}
	}
	return new Promise((R) => {
		let O = !1,
			I;
		const L = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			j = () => {
				clearInterval(I);
			},
			k = (U) => {
				if (U.source !== window.parent || U.origin !== e) return;
				const B = U.data;
				if (!(typeof B != "object" || B === null)) {
					if (
						B.type === "bonobo:init" &&
						!O &&
						B.nonce === n &&
						typeof B.apiOrigin == "string" &&
						typeof B.convexUrl == "string" &&
						typeof B.token == "string" &&
						typeof B.tokenExpiresAt == "number" &&
						Number.isFinite(B.tokenExpiresAt) &&
						eE(B.context)
					) {
						((O = !0),
							j(),
							window.removeEventListener("pagehide", j),
							(a = B.apiOrigin),
							(u = B.token),
							(l = B.tokenExpiresAt),
							E(B));
						const Z = new Tb(B.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let ie = Date.now();
						const ee = setInterval(() => {
							const K = Date.now();
							(K - ie >= Jx && Z.setAuth(T), (ie = K));
						}, Xx);
						(Z.setAuth(T),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(ee), Z.close());
								},
								{ once: !0 },
							),
							(h = Dy(B.theme)),
							h && jy(h),
							R({
								context: B.context,
								apiOrigin: a,
								getToken: _,
								refreshToken: p,
								fetchJson: C,
								authorize: A,
								convex: Z,
								api: Fx,
								session: { expiresAt: () => l, fetchJwt: T },
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
						O &&
						B.nonce === n &&
						B.type === "bonobo:token" &&
						typeof B.requestId == "string" &&
						typeof B.token == "string" &&
						typeof B.tokenExpiresAt == "number" &&
						Number.isFinite(B.tokenExpiresAt)
					) {
						const Z = v.get(B.requestId);
						Z &&
							(v.delete(B.requestId),
							clearTimeout(Z.timeout),
							(u = B.token),
							(l = B.tokenExpiresAt),
							E(B),
							Z.resolve(B.token));
					} else if (O && B.nonce === n && B.type === "bonobo:theme") {
						const Z = Dy(B.theme);
						if (Z) {
							((h = Z), jy(Z));
							for (const ie of m) ie(Z);
						}
					} else if (
						O &&
						B.nonce === n &&
						B.type === "bonobo:token-error" &&
						typeof B.requestId == "string" &&
						typeof B.message == "string"
					) {
						const Z = v.get(B.requestId);
						Z && (v.delete(B.requestId), clearTimeout(Z.timeout), Z.reject(new Error(B.message)));
					}
				}
			};
		(window.addEventListener("message", k),
			window.addEventListener("pagehide", j, { once: !0 }),
			L(),
			(I = setInterval(L, Kx)));
	});
}
var iE = zn((e) => {
		function n(z, H) {
			var $ = z.length;
			z.push(H);
			e: for (; 0 < $; ) {
				var G = ($ - 1) >>> 1,
					oe = z[G];
				if (0 < l(oe, H)) ((z[G] = H), (z[$] = oe), ($ = G));
				else break e;
			}
		}
		function a(z) {
			return z.length === 0 ? null : z[0];
		}
		function u(z) {
			if (z.length === 0) return null;
			var H = z[0],
				$ = z.pop();
			if ($ !== H) {
				z[0] = $;
				e: for (var G = 0, oe = z.length, _e = oe >>> 1; G < _e; ) {
					var N = 2 * (G + 1) - 1,
						X = z[N],
						re = N + 1,
						le = z[re];
					if (0 > l(X, $))
						re < oe && 0 > l(le, X) ? ((z[G] = le), (z[re] = $), (G = re)) : ((z[G] = X), (z[N] = $), (G = N));
					else if (re < oe && 0 > l(le, $)) ((z[G] = le), (z[re] = $), (G = re));
					else break e;
				}
			}
			return H;
		}
		function l(z, H) {
			var $ = z.sortIndex - H.sortIndex;
			return $ !== 0 ? $ : z.id - H.id;
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
			S = !1,
			E = !1,
			C = !1,
			A = !1,
			D = typeof setTimeout == "function" ? setTimeout : null,
			T = typeof clearTimeout == "function" ? clearTimeout : null,
			R = typeof setImmediate < "u" ? setImmediate : null;
		function O(z) {
			for (var H = a(v); H !== null; ) {
				if (H.callback === null) u(v);
				else if (H.startTime <= z) (u(v), (H.sortIndex = H.expirationTime), n(m, H));
				else break;
				H = a(v);
			}
		}
		function I(z) {
			if (((C = !1), O(z), !E))
				if (a(m) !== null) ((E = !0), L || ((L = !0), ie()));
				else {
					var H = a(v);
					H !== null && ae(I, H.startTime - z);
				}
		}
		var L = !1,
			j = -1,
			k = 5,
			U = -1;
		function B() {
			return A ? !0 : !(e.unstable_now() - U < k);
		}
		function Z() {
			if (((A = !1), L)) {
				var z = e.unstable_now();
				U = z;
				var H = !0;
				try {
					e: {
						((E = !1), C && ((C = !1), T(j), (j = -1)), (S = !0));
						var $ = p;
						try {
							t: {
								for (O(z), _ = a(m); _ !== null && !(_.expirationTime > z && B()); ) {
									var G = _.callback;
									if (typeof G == "function") {
										((_.callback = null), (p = _.priorityLevel));
										var oe = G(_.expirationTime <= z);
										if (((z = e.unstable_now()), typeof oe == "function")) {
											((_.callback = oe), O(z), (H = !0));
											break t;
										}
										(_ === a(m) && u(m), O(z));
									} else u(m);
									_ = a(m);
								}
								if (_ !== null) H = !0;
								else {
									var _e = a(v);
									(_e !== null && ae(I, _e.startTime - z), (H = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (p = $), (S = !1));
						}
						H = void 0;
					}
				} finally {
					H ? ie() : (L = !1);
				}
			}
		}
		var ie;
		if (typeof R == "function")
			ie = function () {
				R(Z);
			};
		else if (typeof MessageChannel < "u") {
			var ee = new MessageChannel(),
				K = ee.port2;
			((ee.port1.onmessage = Z),
				(ie = function () {
					K.postMessage(null);
				}));
		} else
			ie = function () {
				D(Z, 0);
			};
		function ae(z, H) {
			j = D(function () {
				z(e.unstable_now());
			}, H);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (z) {
				z.callback = null;
			}),
			(e.unstable_forceFrameRate = function (z) {
				0 > z || 125 < z
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (k = 0 < z ? Math.floor(1e3 / z) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return p;
			}),
			(e.unstable_next = function (z) {
				switch (p) {
					case 1:
					case 2:
					case 3:
						var H = 3;
						break;
					default:
						H = p;
				}
				var $ = p;
				p = H;
				try {
					return z();
				} finally {
					p = $;
				}
			}),
			(e.unstable_requestPaint = function () {
				A = !0;
			}),
			(e.unstable_runWithPriority = function (z, H) {
				switch (z) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						z = 3;
				}
				var $ = p;
				p = z;
				try {
					return H();
				} finally {
					p = $;
				}
			}),
			(e.unstable_scheduleCallback = function (z, H, $) {
				var G = e.unstable_now();
				switch (
					(typeof $ == "object" && $ !== null
						? (($ = $.delay), ($ = typeof $ == "number" && 0 < $ ? G + $ : G))
						: ($ = G),
					z)
				) {
					case 1:
						var oe = -1;
						break;
					case 2:
						oe = 250;
						break;
					case 5:
						oe = 1073741823;
						break;
					case 4:
						oe = 1e4;
						break;
					default:
						oe = 5e3;
				}
				return (
					(oe = $ + oe),
					(z = { id: g++, callback: H, priorityLevel: z, startTime: $, expirationTime: oe, sortIndex: -1 }),
					$ > G
						? ((z.sortIndex = $),
							n(v, z),
							a(m) === null && z === a(v) && (C ? (T(j), (j = -1)) : (C = !0), ae(I, $ - G)))
						: ((z.sortIndex = oe), n(m, z), E || S || ((E = !0), L || ((L = !0), ie()))),
					z
				);
			}),
			(e.unstable_shouldYield = B),
			(e.unstable_wrapCallback = function (z) {
				var H = p;
				return function () {
					var $ = p;
					p = H;
					try {
						return z.apply(this, arguments);
					} finally {
						p = $;
					}
				};
			}));
	}),
	aE = zn((e, n) => {
		n.exports = iE();
	}),
	rE = zn((e) => {
		var n = ao();
		function a(v) {
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
		function f(v, g, _) {
			var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: p == null ? null : "" + p, children: v, containerInfo: g, implementation: _ };
		}
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, g) {
			if (v === "font") return "";
			if (typeof g == "string") return g === "use-credentials" ? g : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
			(e.createPortal = function (v, g) {
				var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(a(299));
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
						S = typeof g.integrity == "string" ? g.integrity : void 0,
						E = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
					_ === "style"
						? l.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
								crossOrigin: p,
								integrity: S,
								fetchPriority: E,
							})
						: _ === "script" &&
							l.d.X(v, {
								crossOrigin: p,
								integrity: S,
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
	Ob = zn((e, n) => {
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
		(a(), (n.exports = rE()));
	}),
	uE = zn((e) => {
		var n = aE(),
			a = ao(),
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
		function g(t) {
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
					for (var y = !1, x = c.child; x; ) {
						if (x === r) {
							((y = !0), (r = c), (s = d));
							break;
						}
						if (x === s) {
							((y = !0), (s = c), (r = d));
							break;
						}
						x = x.sibling;
					}
					if (!y) {
						for (x = d.child; x; ) {
							if (x === r) {
								((y = !0), (r = d), (s = c));
								break;
							}
							if (x === s) {
								((y = !0), (s = d), (r = c));
								break;
							}
							x = x.sibling;
						}
						if (!y) throw Error(l(189));
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
			A = Symbol.for("react.fragment"),
			D = Symbol.for("react.strict_mode"),
			T = Symbol.for("react.profiler"),
			R = Symbol.for("react.consumer"),
			O = Symbol.for("react.context"),
			I = Symbol.for("react.forward_ref"),
			L = Symbol.for("react.suspense"),
			j = Symbol.for("react.suspense_list"),
			k = Symbol.for("react.memo"),
			U = Symbol.for("react.lazy"),
			B = Symbol.for("react.activity"),
			Z = Symbol.for("react.memo_cache_sentinel"),
			ie = Symbol.iterator;
		function ee(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (ie && t[ie]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var K = Symbol.for("react.client.reference");
		function ae(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === K ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case A:
					return "Fragment";
				case T:
					return "Profiler";
				case D:
					return "StrictMode";
				case L:
					return "Suspense";
				case j:
					return "SuspenseList";
				case B:
					return "Activity";
			}
			if (typeof t == "object")
				switch (t.$$typeof) {
					case C:
						return "Portal";
					case O:
						return t.displayName || "Context";
					case R:
						return (t._context.displayName || "Context") + ".Consumer";
					case I:
						var i = t.render;
						return (
							(t = t.displayName),
							t || ((t = i.displayName || i.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case k:
						return ((i = t.displayName || null), i !== null ? i : ae(t.type) || "Memo");
					case U:
						((i = t._payload), (t = t._init));
						try {
							return ae(t(i));
						} catch {}
				}
			return null;
		}
		var z = Array.isArray,
			H = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			$ = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			G = { pending: !1, data: null, method: null, action: null },
			oe = [],
			_e = -1;
		function N(t) {
			return { current: t };
		}
		function X(t) {
			0 > _e || ((t.current = oe[_e]), (oe[_e] = null), _e--);
		}
		function re(t, i) {
			(_e++, (oe[_e] = t.current), (t.current = i));
		}
		var le = N(null),
			me = N(null),
			ve = N(null),
			Se = N(null);
		function Ze(t, i) {
			switch ((re(ve, i), re(me, t), re(le, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? Vg(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = Vg(i)), (t = Hg(i, t)));
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
			(X(le), re(le, t));
		}
		function qe() {
			(X(le), X(me), X(ve));
		}
		function At(t) {
			t.memoizedState !== null && re(Se, t);
			var i = le.current,
				r = Hg(i, t.type);
			i !== r && (re(me, t), re(le, r));
		}
		function Pt(t) {
			(me.current === t && (X(le), X(me)), Se.current === t && (X(Se), (qu._currentValue = G)));
		}
		var pn, on;
		function ot(t) {
			if (pn === void 0)
				try {
					throw Error();
				} catch (r) {
					var i = r.stack.trim().match(/\n( *(at )?)/);
					((pn = (i && i[1]) || ""),
						(on =
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
				pn +
				t +
				on
			);
		}
		var de = !1;
		function Ee(t, i) {
			if (!t || de) return "";
			de = !0;
			var r = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var s = {
					DetermineComponentFrameRoot: function () {
						try {
							if (i) {
								var te = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(te.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(te, []);
									} catch (F) {
										var Y = F;
									}
									Reflect.construct(t, [], te);
								} else {
									try {
										te.call();
									} catch (F) {
										Y = F;
									}
									t.call(te.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (F) {
									Y = F;
								}
								(te = t()) && typeof te.catch == "function" && te.catch(function () {});
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
					y = d[0],
					x = d[1];
				if (y && x) {
					var M = y.split(`
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
				((de = !1), (Error.prepareStackTrace = r));
			}
			return (r = t ? t.displayName || t.name : "") ? ot(r) : "";
		}
		function st(t, i) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return ot(t.type);
				case 16:
					return ot("Lazy");
				case 13:
					return t.child !== i && i !== null ? ot("Suspense Fallback") : ot("Suspense");
				case 19:
					return ot("SuspenseList");
				case 0:
				case 15:
					return Ee(t.type, !1);
				case 11:
					return Ee(t.type.render, !1);
				case 1:
					return Ee(t.type, !0);
				case 31:
					return ot("Activity");
				default:
					return "";
			}
		}
		function ze(t) {
			try {
				var i = "",
					r = null;
				do ((i += st(t, r)), (r = t), (t = t.return));
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
		var zt = Object.prototype.hasOwnProperty,
			Ot = n.unstable_scheduleCallback,
			ue = n.unstable_cancelCallback,
			Re = n.unstable_shouldYield,
			it = n.unstable_requestPaint,
			Oe = n.unstable_now,
			kt = n.unstable_getCurrentPriorityLevel,
			Dt = n.unstable_ImmediatePriority,
			se = n.unstable_UserBlockingPriority,
			ge = n.unstable_NormalPriority,
			Ht = n.unstable_LowPriority,
			Jn = n.unstable_IdlePriority,
			BS = n.log,
			VS = n.unstable_setDisableYieldValue,
			Fr = null,
			cn = null;
		function Ni(t) {
			if ((typeof BS == "function" && VS(t), cn && typeof cn.setStrictMode == "function"))
				try {
					cn.setStrictMode(Fr, t);
				} catch {}
		}
		var fn = Math.clz32 ? Math.clz32 : QS,
			HS = Math.log,
			ZS = Math.LN2;
		function QS(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((HS(t) / ZS) | 0)) | 0);
		}
		var ps = 256,
			Ss = 262144,
			ws = 4194304;
		function oa(t) {
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
				y = t.pingedLanes;
			t = t.warmLanes;
			var x = s & 134217727;
			return (
				x !== 0
					? ((s = x & ~d),
						s !== 0 ? (c = oa(s)) : ((y &= x), y !== 0 ? (c = oa(y)) : r || ((r = x & ~t), r !== 0 && (c = oa(r)))))
					: ((x = s & ~d), x !== 0 ? (c = oa(x)) : y !== 0 ? (c = oa(y)) : r || ((r = s & ~t), r !== 0 && (c = oa(r)))),
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
		function Kr(t, i) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & i) === 0;
		}
		function PS(t, i) {
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
		function Eh() {
			var t = ws;
			return ((ws <<= 1), (ws & 62914560) === 0 && (ws = 4194304), t);
		}
		function ko(t) {
			for (var i = [], r = 0; 31 > r; r++) i.push(t);
			return i;
		}
		function xs(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function YS(t, i, r, s, c, d) {
			var y = t.pendingLanes;
			((t.pendingLanes = r),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= r),
				(t.entangledLanes &= r),
				(t.errorRecoveryDisabledLanes &= r),
				(t.shellSuspendCounter = 0));
			var x = t.entanglements,
				M = t.expirationTimes,
				P = t.hiddenUpdates;
			for (r = y & ~r; 0 < r; ) {
				var J = 31 - fn(r),
					te = 1 << J;
				((x[J] = 0), (M[J] = -1));
				var Y = P[J];
				if (Y !== null)
					for (P[J] = null, J = 0; J < Y.length; J++) {
						var F = Y[J];
						F !== null && (F.lane &= -536870913);
					}
				r &= ~te;
			}
			(s !== 0 && Ch(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(y & ~i)));
		}
		function Ch(t, i, r) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var s = 31 - fn(i);
			((t.entangledLanes |= i), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (r & 261930)));
		}
		function Th(t, i) {
			var r = (t.entangledLanes |= i);
			for (t = t.entanglements; r; ) {
				var s = 31 - fn(r),
					c = 1 << s;
				((c & i) | (t[s] & i) && (t[s] |= i), (r &= ~c));
			}
		}
		function Ah(t, i) {
			var r = i & -i;
			return ((r = (r & 42) !== 0 ? 1 : Rh(r)), (r & (t.suspendedLanes | i)) !== 0 ? 0 : r);
		}
		function Rh(t) {
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
		function Do(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Oh() {
			var t = $.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : cy(t.type));
		}
		function Nh(t, i) {
			var r = $.p;
			try {
				return (($.p = t), i());
			} finally {
				$.p = r;
			}
		}
		var Mi = Math.random().toString(36).slice(2),
			jt = "__reactFiber$" + Mi,
			Gt = "__reactProps$" + Mi,
			Gr = "__reactContainer$" + Mi,
			jo = "__reactEvents$" + Mi,
			FS = "__reactListeners$" + Mi,
			KS = "__reactHandles$" + Mi,
			Mh = "__reactResources$" + Mi,
			Xr = "__reactMarker$" + Mi;
		function qo(t) {
			(delete t[jt], delete t[Gt], delete t[jo], delete t[FS], delete t[KS]);
		}
		function Za(t) {
			var i = t[jt];
			if (i) return i;
			for (var r = t.parentNode; r; ) {
				if ((i = r[Gr] || r[jt])) {
					if (((r = i.alternate), i.child !== null || (r !== null && r.child !== null)))
						for (t = Gg(t); t !== null; ) {
							if ((r = t[jt])) return r;
							t = Gg(t);
						}
					return i;
				}
				((t = r), (r = t.parentNode));
			}
			return null;
		}
		function Qa(t) {
			if ((t = t[jt] || t[Gr])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function Jr(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(l(33));
		}
		function Pa(t) {
			var i = t[Mh];
			return (i || (i = t[Mh] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function Nt(t) {
			t[Xr] = !0;
		}
		var zh = new Set(),
			kh = {};
		function ca(t, i) {
			(Ya(t, i), Ya(t + "Capture", i));
		}
		function Ya(t, i) {
			for (kh[t] = i, t = 0; t < i.length; t++) zh.add(i[t]);
		}
		var GS = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			Dh = {},
			jh = {};
		function XS(t) {
			return zt.call(jh, t) ? !0 : zt.call(Dh, t) ? !1 : GS.test(t) ? (jh[t] = !0) : ((Dh[t] = !0), !1);
		}
		function Es(t, i, r) {
			if (XS(i))
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
		function Wn(t, i, r, s) {
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
		function Sn(t) {
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
		function qh(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function JS(t, i, r) {
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
						set: function (y) {
							((r = "" + y), d.call(this, y));
						},
					}),
					Object.defineProperty(t, i, { enumerable: s.enumerable }),
					{
						getValue: function () {
							return r;
						},
						setValue: function (y) {
							r = "" + y;
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
				var i = qh(t) ? "checked" : "value";
				t._valueTracker = JS(t, i, "" + t[i]);
			}
		}
		function Ih(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var r = i.getValue(),
				s = "";
			return (t && (s = qh(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== r ? (i.setValue(t), !0) : !1);
		}
		function Ts(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var WS = /[\n"\\]/g;
		function wn(t) {
			return t.replace(WS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function Uo(t, i, r, s, c, d, y, x) {
			((t.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (t.type = y)
					: t.removeAttribute("type"),
				i != null
					? y === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + Sn(i))
						: t.value !== "" + Sn(i) && (t.value = "" + Sn(i))
					: (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
				i != null ? Lo(t, y, Sn(i)) : r != null ? Lo(t, y, Sn(r)) : s != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean"
					? (t.name = "" + Sn(x))
					: t.removeAttribute("name"));
		}
		function Uh(t, i, r, s, c, d, y, x) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || r != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					Io(t);
					return;
				}
				((r = r != null ? "" + Sn(r) : ""),
					(i = i != null ? "" + Sn(i) : r),
					x || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(t.checked = x ? t.checked : !!s),
				(t.defaultChecked = !!s),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (t.name = y),
				Io(t));
		}
		function Lo(t, i, r) {
			(i === "number" && Ts(t.ownerDocument) === t) || t.defaultValue === "" + r || (t.defaultValue = "" + r);
		}
		function Fa(t, i, r, s) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < r.length; c++) i["$" + r[c]] = !0;
				for (r = 0; r < t.length; r++)
					((c = i.hasOwnProperty("$" + t[r].value)),
						t[r].selected !== c && (t[r].selected = c),
						c && s && (t[r].defaultSelected = !0));
			} else {
				for (r = "" + Sn(r), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === r) {
						((t[c].selected = !0), s && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function Lh(t, i, r) {
			if (i != null && ((i = "" + Sn(i)), i !== t.value && (t.value = i), r == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = r != null ? "" + Sn(r) : "";
		}
		function $h(t, i, r, s) {
			if (i == null) {
				if (s != null) {
					if (r != null) throw Error(l(92));
					if (z(s)) {
						if (1 < s.length) throw Error(l(93));
						s = s[0];
					}
					r = s;
				}
				((r ??= ""), (i = r));
			}
			((r = Sn(i)),
				(t.defaultValue = r),
				(s = t.textContent),
				s === r && s !== "" && s !== null && (t.value = s),
				Io(t));
		}
		function Ka(t, i) {
			if (i) {
				var r = t.firstChild;
				if (r && r === t.lastChild && r.nodeType === 3) {
					r.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var ew = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Bh(t, i, r) {
			var s = i.indexOf("--") === 0;
			r == null || typeof r == "boolean" || r === ""
				? s
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: s
					? t.setProperty(i, r)
					: typeof r != "number" || r === 0 || ew.has(i)
						? i === "float"
							? (t.cssFloat = r)
							: (t[i] = ("" + r).trim())
						: (t[i] = r + "px");
		}
		function Vh(t, i, r) {
			if (i != null && typeof i != "object") throw Error(l(62));
			if (((t = t.style), r != null)) {
				for (var s in r)
					!r.hasOwnProperty(s) ||
						(i != null && i.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""));
				for (var c in i) ((s = i[c]), i.hasOwnProperty(c) && r[c] !== s && Bh(t, c, s));
			} else for (var d in i) i.hasOwnProperty(d) && Bh(t, d, i[d]);
		}
		function $o(t) {
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
		var tw = new Map([
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
			nw =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function As(t) {
			return nw.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function ei() {}
		var Bo = null;
		function Vo(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Ga = null,
			Xa = null;
		function Hh(t) {
			var i = Qa(t);
			if (i && (t = i.stateNode)) {
				var r = t[Gt] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(Uo(t, r.value, r.defaultValue, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name),
							(i = r.name),
							r.type === "radio" && i != null)
						) {
							for (r = t; r.parentNode; ) r = r.parentNode;
							for (r = r.querySelectorAll('input[name="' + wn("" + i) + '"][type="radio"]'), i = 0; i < r.length; i++) {
								var s = r[i];
								if (s !== t && s.form === t.form) {
									var c = s[Gt] || null;
									if (!c) throw Error(l(90));
									Uo(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < r.length; i++) ((s = r[i]), s.form === t.form && Ih(s));
						}
						break e;
					case "textarea":
						Lh(t, r.value, r.defaultValue);
						break e;
					case "select":
						((i = r.value), i != null && Fa(t, !!r.multiple, i, !1));
				}
			}
		}
		var Ho = !1;
		function Zh(t, i, r) {
			if (Ho) return t(i, r);
			Ho = !0;
			try {
				return t(i);
			} finally {
				if (((Ho = !1), (Ga !== null || Xa !== null) && (ml(), Ga && ((i = Ga), (t = Xa), (Xa = Ga = null), Hh(i), t))))
					for (i = 0; i < t.length; i++) Hh(t[i]);
			}
		}
		function Wr(t, i) {
			var r = t.stateNode;
			if (r === null) return null;
			var s = r[Gt] || null;
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
		var ti = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Zo = !1;
		if (ti)
			try {
				var eu = {};
				(Object.defineProperty(eu, "passive", {
					get: function () {
						Zo = !0;
					},
				}),
					window.addEventListener("test", eu, eu),
					window.removeEventListener("test", eu, eu));
			} catch {
				Zo = !1;
			}
		var zi = null,
			Qo = null,
			Rs = null;
		function Qh() {
			if (Rs) return Rs;
			var t,
				i = Qo,
				r = i.length,
				s,
				c = "value" in zi ? zi.value : zi.textContent,
				d = c.length;
			for (t = 0; t < r && i[t] === c[t]; t++);
			var y = r - t;
			for (s = 1; s <= y && i[r - s] === c[d - s]; s++);
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
		function Ph() {
			return !1;
		}
		function Xt(t) {
			function i(r, s, c, d, y) {
				((this._reactName = r),
					(this._targetInst = c),
					(this.type = s),
					(this.nativeEvent = d),
					(this.target = y),
					(this.currentTarget = null));
				for (var x in t) t.hasOwnProperty(x) && ((r = t[x]), (this[x] = r ? r(d) : d[x]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Ns
						: Ph),
					(this.isPropagationStopped = Ph),
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
		var fa = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Ms = Xt(fa),
			tu = p({}, fa, { view: 0, detail: 0 }),
			iw = Xt(tu),
			Po,
			Yo,
			nu,
			zs = p({}, tu, {
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
				getModifierState: Ko,
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
						: (t !== nu &&
								(nu && t.type === "mousemove"
									? ((Po = t.screenX - nu.screenX), (Yo = t.screenY - nu.screenY))
									: (Yo = Po = 0),
								(nu = t)),
							Po);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : Yo;
				},
			}),
			Yh = Xt(zs),
			aw = Xt(p({}, zs, { dataTransfer: 0 })),
			Fo = Xt(p({}, tu, { relatedTarget: 0 })),
			rw = Xt(p({}, fa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			uw = Xt(
				p({}, fa, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Fh = Xt(p({}, fa, { data: 0 })),
			sw = {
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
			lw = {
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
			ow = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function cw(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = ow[t]) ? !!i[t] : !1;
		}
		function Ko() {
			return cw;
		}
		var fw = Xt(
				p({}, tu, {
					key: function (t) {
						if (t.key) {
							var i = sw[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Os(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? lw[t.keyCode] || "Unidentified"
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
					getModifierState: Ko,
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
			Kh = Xt(
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
			dw = Xt(
				p({}, tu, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: Ko,
				}),
			),
			hw = Xt(p({}, fa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			mw = Xt(
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
			vw = Xt(p({}, fa, { newState: 0, oldState: 0 })),
			gw = [9, 13, 27, 32],
			Go = ti && "CompositionEvent" in window,
			iu = null;
		ti && "documentMode" in document && (iu = document.documentMode);
		var yw = ti && "TextEvent" in window && !iu,
			Gh = ti && (!Go || (iu && 8 < iu && 11 >= iu)),
			Xh = " ",
			Jh = !1;
		function Wh(t, i) {
			switch (t) {
				case "keyup":
					return gw.indexOf(i.keyCode) !== -1;
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
		function em(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var Ja = !1;
		function bw(t, i) {
			switch (t) {
				case "compositionend":
					return em(i);
				case "keypress":
					return i.which !== 32 ? null : ((Jh = !0), Xh);
				case "textInput":
					return ((t = i.data), t === Xh && Jh ? null : t);
				default:
					return null;
			}
		}
		function pw(t, i) {
			if (Ja)
				return t === "compositionend" || (!Go && Wh(t, i)) ? ((t = Qh()), (Rs = Qo = zi = null), (Ja = !1), t) : null;
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
					return Gh && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var Sw = {
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
		function tm(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!Sw[t.type] : i === "textarea";
		}
		function nm(t, i, r, s) {
			(Ga ? (Xa ? Xa.push(s) : (Xa = [s])) : (Ga = s),
				(i = wl(i, "onChange")),
				0 < i.length && ((r = new Ms("onChange", "change", null, r, s)), t.push({ event: r, listeners: i })));
		}
		var au = null,
			ru = null;
		function ww(t) {
			jg(t, 0);
		}
		function ks(t) {
			if (Ih(Jr(t))) return t;
		}
		function im(t, i) {
			if (t === "change") return i;
		}
		var am = !1;
		if (ti) {
			var Xo;
			if (ti) {
				var Jo = "oninput" in document;
				if (!Jo) {
					var rm = document.createElement("div");
					(rm.setAttribute("oninput", "return;"), (Jo = typeof rm.oninput == "function"));
				}
				Xo = Jo;
			} else Xo = !1;
			am = Xo && (!document.documentMode || 9 < document.documentMode);
		}
		function um() {
			au && (au.detachEvent("onpropertychange", sm), (ru = au = null));
		}
		function sm(t) {
			if (t.propertyName === "value" && ks(ru)) {
				var i = [];
				(nm(i, ru, t, Vo(t)), Zh(ww, i));
			}
		}
		function _w(t, i, r) {
			t === "focusin" ? (um(), (au = i), (ru = r), au.attachEvent("onpropertychange", sm)) : t === "focusout" && um();
		}
		function xw(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return ks(ru);
		}
		function Ew(t, i) {
			if (t === "click") return ks(i);
		}
		function Cw(t, i) {
			if (t === "input" || t === "change") return ks(i);
		}
		function Tw(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var dn = typeof Object.is == "function" ? Object.is : Tw;
		function uu(t, i) {
			if (dn(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var r = Object.keys(t),
				s = Object.keys(i);
			if (r.length !== s.length) return !1;
			for (s = 0; s < r.length; s++) {
				var c = r[s];
				if (!zt.call(i, c) || !dn(t[c], i[c])) return !1;
			}
			return !0;
		}
		function lm(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function om(t, i) {
			var r = lm(t);
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
				r = lm(r);
			}
		}
		function cm(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? cm(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function fm(t) {
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
		function Wo(t) {
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
		var Aw = ti && "documentMode" in document && 11 >= document.documentMode,
			Wa = null,
			ec = null,
			su = null,
			tc = !1;
		function dm(t, i, r) {
			var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
			tc ||
				Wa == null ||
				Wa !== Ts(s) ||
				((s = Wa),
				"selectionStart" in s && Wo(s)
					? (s = { start: s.selectionStart, end: s.selectionEnd })
					: ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
						(s = {
							anchorNode: s.anchorNode,
							anchorOffset: s.anchorOffset,
							focusNode: s.focusNode,
							focusOffset: s.focusOffset,
						})),
				(su && uu(su, s)) ||
					((su = s),
					(s = wl(ec, "onSelect")),
					0 < s.length &&
						((i = new Ms("onSelect", "select", null, i, r)), t.push({ event: i, listeners: s }), (i.target = Wa))));
		}
		function da(t, i) {
			var r = {};
			return ((r[t.toLowerCase()] = i.toLowerCase()), (r["Webkit" + t] = "webkit" + i), (r["Moz" + t] = "moz" + i), r);
		}
		var er = {
				animationend: da("Animation", "AnimationEnd"),
				animationiteration: da("Animation", "AnimationIteration"),
				animationstart: da("Animation", "AnimationStart"),
				transitionrun: da("Transition", "TransitionRun"),
				transitionstart: da("Transition", "TransitionStart"),
				transitioncancel: da("Transition", "TransitionCancel"),
				transitionend: da("Transition", "TransitionEnd"),
			},
			nc = {},
			hm = {};
		ti &&
			((hm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete er.animationend.animation, delete er.animationiteration.animation, delete er.animationstart.animation),
			"TransitionEvent" in window || delete er.transitionend.transition);
		function ha(t) {
			if (nc[t]) return nc[t];
			if (!er[t]) return t;
			var i = er[t],
				r;
			for (r in i) if (i.hasOwnProperty(r) && r in hm) return (nc[t] = i[r]);
			return t;
		}
		var mm = ha("animationend"),
			vm = ha("animationiteration"),
			gm = ha("animationstart"),
			Rw = ha("transitionrun"),
			Ow = ha("transitionstart"),
			Nw = ha("transitioncancel"),
			ym = ha("transitionend"),
			bm = new Map(),
			ic =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		ic.push("scrollEnd");
		function Dn(t, i) {
			(bm.set(t, i), ca(i, [t]));
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
			_n = [],
			tr = 0,
			ac = 0;
		function js() {
			for (var t = tr, i = (ac = tr = 0); i < t; ) {
				var r = _n[i];
				_n[i++] = null;
				var s = _n[i];
				_n[i++] = null;
				var c = _n[i];
				_n[i++] = null;
				var d = _n[i];
				if (((_n[i++] = null), s !== null && c !== null)) {
					var y = s.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (s.pending = c));
				}
				d !== 0 && pm(r, c, d);
			}
		}
		function qs(t, i, r, s) {
			((_n[tr++] = t),
				(_n[tr++] = i),
				(_n[tr++] = r),
				(_n[tr++] = s),
				(ac |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function rc(t, i, r, s) {
			return (qs(t, i, r, s), Is(t));
		}
		function ma(t, i) {
			return (qs(t, null, null, i), Is(t));
		}
		function pm(t, i, r) {
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
						((c = 31 - fn(r)),
						(t = d.hiddenUpdates),
						(s = t[c]),
						s === null ? (t[c] = [i]) : s.push(i),
						(i.lane = r | 536870912)),
					d)
				: null;
		}
		function Is(t) {
			if (50 < Ou) throw ((Ou = 0), (vf = null), Error(l(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var nr = {};
		function Mw(t, i, r, s) {
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
		function hn(t, i, r, s) {
			return new Mw(t, i, r, s);
		}
		function uc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function ni(t, i) {
			var r = t.alternate;
			return (
				r === null
					? ((r = hn(t.tag, i, t.key, t.mode)),
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
		function Sm(t, i) {
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
		function Us(t, i, r, s, c, d) {
			var y = 0;
			if (((s = t), typeof t == "function")) uc(t) && (y = 1);
			else if (typeof t == "string")
				y = I_(t, r, le.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case B:
						return ((t = hn(31, r, i, c)), (t.elementType = B), (t.lanes = d), t);
					case A:
						return va(r.children, c, d, i);
					case D:
						((y = 8), (c |= 24));
						break;
					case T:
						return ((t = hn(12, r, i, c | 2)), (t.elementType = T), (t.lanes = d), t);
					case L:
						return ((t = hn(13, r, i, c)), (t.elementType = L), (t.lanes = d), t);
					case j:
						return ((t = hn(19, r, i, c)), (t.elementType = j), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case O:
									y = 10;
									break e;
								case R:
									y = 9;
									break e;
								case I:
									y = 11;
									break e;
								case k:
									y = 14;
									break e;
								case U:
									((y = 16), (s = null));
									break e;
							}
						((y = 29), (r = Error(l(130, t === null ? "null" : typeof t, ""))), (s = null));
				}
			return ((i = hn(y, r, i, c)), (i.elementType = t), (i.type = s), (i.lanes = d), i);
		}
		function va(t, i, r, s) {
			return ((t = hn(7, t, s, i)), (t.lanes = r), t);
		}
		function sc(t, i, r) {
			return ((t = hn(6, t, null, i)), (t.lanes = r), t);
		}
		function wm(t) {
			var i = hn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function lc(t, i, r) {
			return (
				(i = hn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = r),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var _m = new WeakMap();
		function xn(t, i) {
			if (typeof t == "object" && t !== null) {
				var r = _m.get(t);
				return r !== void 0 ? r : ((i = { value: t, source: i, stack: ze(i) }), _m.set(t, i), i);
			}
			return { value: t, source: i, stack: ze(i) };
		}
		var ir = [],
			ar = 0,
			Ls = null,
			lu = 0,
			En = [],
			Cn = 0,
			ki = null,
			Bn = 1,
			Vn = "";
		function ii(t, i) {
			((ir[ar++] = lu), (ir[ar++] = Ls), (Ls = t), (lu = i));
		}
		function xm(t, i, r) {
			((En[Cn++] = Bn), (En[Cn++] = Vn), (En[Cn++] = ki), (ki = t));
			var s = Bn;
			t = Vn;
			var c = 32 - fn(s) - 1;
			((s &= ~(1 << c)), (r += 1));
			var d = 32 - fn(i) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (s & ((1 << y) - 1)).toString(32)),
					(s >>= y),
					(c -= y),
					(Bn = (1 << (32 - fn(i) + c)) | (r << c) | s),
					(Vn = d + t));
			} else ((Bn = (1 << d) | (r << c) | s), (Vn = t));
		}
		function oc(t) {
			t.return !== null && (ii(t, 1), xm(t, 1, 0));
		}
		function cc(t) {
			for (; t === Ls; ) ((Ls = ir[--ar]), (ir[ar] = null), (lu = ir[--ar]), (ir[ar] = null));
			for (; t === ki; )
				((ki = En[--Cn]), (En[Cn] = null), (Vn = En[--Cn]), (En[Cn] = null), (Bn = En[--Cn]), (En[Cn] = null));
		}
		function Em(t, i) {
			((En[Cn++] = Bn), (En[Cn++] = Vn), (En[Cn++] = ki), (Bn = i.id), (Vn = i.overflow), (ki = t));
		}
		var qt = null,
			We = null,
			Ie = !1,
			Di = null,
			Tn = !1,
			fc = Error(l(519));
		function ji(t) {
			throw (
				ou(xn(Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				fc
			);
		}
		function Cm(t) {
			var i = t.stateNode,
				r = t.type,
				s = t.memoizedProps;
			switch (((i[jt] = t), (i[Gt] = s), r)) {
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
					for (r = 0; r < Mu.length; r++) Me(Mu[r], i);
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
					(Me("invalid", i), Uh(i, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					Me("invalid", i);
					break;
				case "textarea":
					(Me("invalid", i), $h(i, s.value, s.defaultValue, s.children));
			}
			((r = s.children),
				(typeof r != "string" && typeof r != "number" && typeof r != "bigint") ||
				i.textContent === "" + r ||
				s.suppressHydrationWarning === !0 ||
				$g(i.textContent, r)
					? (s.popover != null && (Me("beforetoggle", i), Me("toggle", i)),
						s.onScroll != null && Me("scroll", i),
						s.onScrollEnd != null && Me("scrollend", i),
						s.onClick != null && (i.onclick = ei),
						(i = !0))
					: (i = !1),
				i || ji(t, !0));
		}
		function Tm(t) {
			for (qt = t.return; qt; )
				switch (qt.tag) {
					case 5:
					case 31:
					case 13:
						Tn = !1;
						return;
					case 27:
					case 3:
						Tn = !0;
						return;
					default:
						qt = qt.return;
				}
		}
		function rr(t) {
			if (t !== qt) return !1;
			if (!Ie) return (Tm(t), (Ie = !0), !1);
			var i = t.tag,
				r;
			if (
				((r = i !== 3 && i !== 27) &&
					((r = i === 5) && ((r = t.type), (r = !(r !== "form" && r !== "button") || Of(t.type, t.memoizedProps))),
					(r = !r)),
				r && We && ji(t),
				Tm(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				We = Kg(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				We = Kg(t);
			} else
				i === 27
					? ((i = We), Yi(t.type) ? ((t = Df), (Df = null), (We = t)) : (We = i))
					: (We = qt ? On(t.stateNode.nextSibling) : null);
			return !0;
		}
		function ga() {
			((We = qt = null), (Ie = !1));
		}
		function dc() {
			var t = Di;
			return (t !== null && (tn === null ? (tn = t) : tn.push.apply(tn, t), (Di = null)), t);
		}
		function ou(t) {
			Di === null ? (Di = [t]) : Di.push(t);
		}
		var hc = N(null),
			ya = null,
			ai = null;
		function qi(t, i, r) {
			(re(hc, i._currentValue), (i._currentValue = r));
		}
		function ri(t) {
			((t._currentValue = hc.current), X(hc));
		}
		function mc(t, i, r) {
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
		function vc(t, i, r, s) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var x = d;
						d = c;
						for (var M = 0; M < i.length; M++)
							if (x.context === i[M]) {
								((d.lanes |= r), (x = d.alternate), x !== null && (x.lanes |= r), mc(d.return, r, t), s || (y = null));
								break e;
							}
						d = x.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(l(341));
					((y.lanes |= r), (d = y.alternate), d !== null && (d.lanes |= r), mc(y, r, t), (y = null));
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
		function ur(t, i, r, s) {
			t = null;
			for (var c = i, d = !1; c !== null; ) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var y = c.alternate;
					if (y === null) throw Error(l(387));
					if (((y = y.memoizedProps), y !== null)) {
						var x = c.type;
						dn(c.pendingProps.value, y.value) || (t !== null ? t.push(x) : (t = [x]));
					}
				} else if (c === Se.current) {
					if (((y = c.alternate), y === null)) throw Error(l(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(qu) : (t = [qu]));
				}
				c = c.return;
			}
			(t !== null && vc(i, t, r, s), (i.flags |= 262144));
		}
		function $s(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!dn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function ba(t) {
			((ya = t), (ai = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function It(t) {
			return Am(ya, t);
		}
		function Bs(t, i) {
			return (ya === null && ba(t), Am(t, i));
		}
		function Am(t, i) {
			var r = i._currentValue;
			if (((i = { context: i, memoizedValue: r, next: null }), ai === null)) {
				if (t === null) throw Error(l(308));
				((ai = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else ai = ai.next = i;
			return r;
		}
		var zw =
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
			kw = n.unstable_scheduleCallback,
			Dw = n.unstable_NormalPriority,
			yt = { $$typeof: O, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function gc() {
			return { controller: new zw(), data: new Map(), refCount: 0 };
		}
		function cu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					kw(Dw, function () {
						t.controller.abort();
					}));
		}
		var fu = null,
			yc = 0,
			sr = 0,
			lr = null;
		function jw(t, i) {
			if (fu === null) {
				var r = (fu = []);
				((yc = 0),
					(sr = wf()),
					(lr = {
						status: "pending",
						value: void 0,
						then: function (s) {
							r.push(s);
						},
					}));
			}
			return (yc++, i.then(Rm, Rm), i);
		}
		function Rm() {
			if (--yc === 0 && fu !== null) {
				lr !== null && (lr.status = "fulfilled");
				var t = fu;
				((fu = null), (sr = 0), (lr = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function qw(t, i) {
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
		var Om = H.S;
		H.S = function (t, i) {
			((og = Oe()),
				typeof i == "object" && i !== null && typeof i.then == "function" && jw(t, i),
				Om !== null && Om(t, i));
		};
		var pa = N(null);
		function bc() {
			var t = pa.current;
			return t !== null ? t : Xe.pooledCache;
		}
		function Vs(t, i) {
			i === null ? re(pa, pa.current) : re(pa, i.pool);
		}
		function Nm() {
			var t = bc();
			return t === null ? null : { parent: yt._currentValue, pool: t };
		}
		var or = Error(l(460)),
			pc = Error(l(474)),
			Hs = Error(l(542)),
			Zs = { then: function () {} };
		function Mm(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function zm(t, i, r) {
			switch (((r = t[r]), r === void 0 ? t.push(i) : r !== i && (i.then(ei, ei), (i = r)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), Dm(t), t);
				default:
					if (typeof i.status == "string") i.then(ei, ei);
					else {
						if (((t = Xe), t !== null && 100 < t.shellSuspendCounter)) throw Error(l(482));
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
							throw ((t = i.reason), Dm(t), t);
					}
					throw ((wa = i), or);
			}
		}
		function Sa(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (r) {
				throw r !== null && typeof r == "object" && typeof r.then == "function" ? ((wa = r), or) : r;
			}
		}
		var wa = null;
		function km() {
			if (wa === null) throw Error(l(459));
			var t = wa;
			return ((wa = null), t);
		}
		function Dm(t) {
			if (t === or || t === Hs) throw Error(l(483));
		}
		var cr = null,
			du = 0;
		function Qs(t) {
			var i = du;
			return ((du += 1), cr === null && (cr = []), zm(cr, t, i));
		}
		function hu(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function Ps(t, i) {
			throw i.$$typeof === S
				? Error(l(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(l(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function jm(t) {
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
				return ((V = ni(V, q)), (V.index = 0), (V.sibling = null), V);
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
			function y(V) {
				return (t && V.alternate === null && (V.flags |= 67108866), V);
			}
			function x(V, q, Q, W) {
				return q === null || q.tag !== 6
					? ((q = sc(Q, V.mode, W)), (q.return = V), q)
					: ((q = c(q, Q)), (q.return = V), q);
			}
			function M(V, q, Q, W) {
				var ye = Q.type;
				return ye === A
					? J(V, q, Q.props.children, W, Q.key)
					: q !== null &&
						  (q.elementType === ye || (typeof ye == "object" && ye !== null && ye.$$typeof === U && Sa(ye) === q.type))
						? ((q = c(q, Q.props)), hu(q, Q), (q.return = V), q)
						: ((q = Us(Q.type, Q.key, Q.props, null, V.mode, W)), hu(q, Q), (q.return = V), q);
			}
			function P(V, q, Q, W) {
				return q === null ||
					q.tag !== 4 ||
					q.stateNode.containerInfo !== Q.containerInfo ||
					q.stateNode.implementation !== Q.implementation
					? ((q = lc(Q, V.mode, W)), (q.return = V), q)
					: ((q = c(q, Q.children || [])), (q.return = V), q);
			}
			function J(V, q, Q, W, ye) {
				return q === null || q.tag !== 7
					? ((q = va(Q, V.mode, W, ye)), (q.return = V), q)
					: ((q = c(q, Q)), (q.return = V), q);
			}
			function te(V, q, Q) {
				if ((typeof q == "string" && q !== "") || typeof q == "number" || typeof q == "bigint")
					return ((q = sc("" + q, V.mode, Q)), (q.return = V), q);
				if (typeof q == "object" && q !== null) {
					switch (q.$$typeof) {
						case E:
							return ((Q = Us(q.type, q.key, q.props, null, V.mode, Q)), hu(Q, q), (Q.return = V), Q);
						case C:
							return ((q = lc(q, V.mode, Q)), (q.return = V), q);
						case U:
							return ((q = Sa(q)), te(V, q, Q));
					}
					if (z(q) || ee(q)) return ((q = va(q, V.mode, Q, null)), (q.return = V), q);
					if (typeof q.then == "function") return te(V, Qs(q), Q);
					if (q.$$typeof === O) return te(V, Bs(V, q), Q);
					Ps(V, q);
				}
				return null;
			}
			function Y(V, q, Q, W) {
				var ye = q !== null ? q.key : null;
				if ((typeof Q == "string" && Q !== "") || typeof Q == "number" || typeof Q == "bigint")
					return ye !== null ? null : x(V, q, "" + Q, W);
				if (typeof Q == "object" && Q !== null) {
					switch (Q.$$typeof) {
						case E:
							return Q.key === ye ? M(V, q, Q, W) : null;
						case C:
							return Q.key === ye ? P(V, q, Q, W) : null;
						case U:
							return ((Q = Sa(Q)), Y(V, q, Q, W));
					}
					if (z(Q) || ee(Q)) return ye !== null ? null : J(V, q, Q, W, null);
					if (typeof Q.then == "function") return Y(V, q, Qs(Q), W);
					if (Q.$$typeof === O) return Y(V, q, Bs(V, Q), W);
					Ps(V, Q);
				}
				return null;
			}
			function F(V, q, Q, W, ye) {
				if ((typeof W == "string" && W !== "") || typeof W == "number" || typeof W == "bigint")
					return ((V = V.get(Q) || null), x(q, V, "" + W, ye));
				if (typeof W == "object" && W !== null) {
					switch (W.$$typeof) {
						case E:
							return ((V = V.get(W.key === null ? Q : W.key) || null), M(q, V, W, ye));
						case C:
							return ((V = V.get(W.key === null ? Q : W.key) || null), P(q, V, W, ye));
						case U:
							return ((W = Sa(W)), F(V, q, Q, W, ye));
					}
					if (z(W) || ee(W)) return ((V = V.get(Q) || null), J(q, V, W, ye, null));
					if (typeof W.then == "function") return F(V, q, Q, Qs(W), ye);
					if (W.$$typeof === O) return F(V, q, Q, Bs(q, W), ye);
					Ps(q, W);
				}
				return null;
			}
			function fe(V, q, Q, W) {
				for (var ye = null, $e = null, he = q, Ae = (q = 0), De = null; he !== null && Ae < Q.length; Ae++) {
					he.index > Ae ? ((De = he), (he = null)) : (De = he.sibling);
					var Be = Y(V, he, Q[Ae], W);
					if (Be === null) {
						he === null && (he = De);
						break;
					}
					(t && he && Be.alternate === null && i(V, he),
						(q = d(Be, q, Ae)),
						$e === null ? (ye = Be) : ($e.sibling = Be),
						($e = Be),
						(he = De));
				}
				if (Ae === Q.length) return (r(V, he), Ie && ii(V, Ae), ye);
				if (he === null) {
					for (; Ae < Q.length; Ae++)
						((he = te(V, Q[Ae], W)),
							he !== null && ((q = d(he, q, Ae)), $e === null ? (ye = he) : ($e.sibling = he), ($e = he)));
					return (Ie && ii(V, Ae), ye);
				}
				for (he = s(he); Ae < Q.length; Ae++)
					((De = F(he, V, Ae, Q[Ae], W)),
						De !== null &&
							(t && De.alternate !== null && he.delete(De.key === null ? Ae : De.key),
							(q = d(De, q, Ae)),
							$e === null ? (ye = De) : ($e.sibling = De),
							($e = De)));
				return (
					t &&
						he.forEach(function (Ji) {
							return i(V, Ji);
						}),
					Ie && ii(V, Ae),
					ye
				);
			}
			function we(V, q, Q, W) {
				if (Q == null) throw Error(l(151));
				for (
					var ye = null, $e = null, he = q, Ae = (q = 0), De = null, Be = Q.next();
					he !== null && !Be.done;
					Ae++, Be = Q.next()
				) {
					he.index > Ae ? ((De = he), (he = null)) : (De = he.sibling);
					var Ji = Y(V, he, Be.value, W);
					if (Ji === null) {
						he === null && (he = De);
						break;
					}
					(t && he && Ji.alternate === null && i(V, he),
						(q = d(Ji, q, Ae)),
						$e === null ? (ye = Ji) : ($e.sibling = Ji),
						($e = Ji),
						(he = De));
				}
				if (Be.done) return (r(V, he), Ie && ii(V, Ae), ye);
				if (he === null) {
					for (; !Be.done; Ae++, Be = Q.next())
						((Be = te(V, Be.value, W)),
							Be !== null && ((q = d(Be, q, Ae)), $e === null ? (ye = Be) : ($e.sibling = Be), ($e = Be)));
					return (Ie && ii(V, Ae), ye);
				}
				for (he = s(he); !Be.done; Ae++, Be = Q.next())
					((Be = F(he, V, Ae, Be.value, W)),
						Be !== null &&
							(t && Be.alternate !== null && he.delete(Be.key === null ? Ae : Be.key),
							(q = d(Be, q, Ae)),
							$e === null ? (ye = Be) : ($e.sibling = Be),
							($e = Be)));
				return (
					t &&
						he.forEach(function (X_) {
							return i(V, X_);
						}),
					Ie && ii(V, Ae),
					ye
				);
			}
			function Ke(V, q, Q, W) {
				if (
					(typeof Q == "object" && Q !== null && Q.type === A && Q.key === null && (Q = Q.props.children),
					typeof Q == "object" && Q !== null)
				) {
					switch (Q.$$typeof) {
						case E:
							e: {
								for (var ye = Q.key; q !== null; ) {
									if (q.key === ye) {
										if (((ye = Q.type), ye === A)) {
											if (q.tag === 7) {
												(r(V, q.sibling), (W = c(q, Q.props.children)), (W.return = V), (V = W));
												break e;
											}
										} else if (
											q.elementType === ye ||
											(typeof ye == "object" && ye !== null && ye.$$typeof === U && Sa(ye) === q.type)
										) {
											(r(V, q.sibling), (W = c(q, Q.props)), hu(W, Q), (W.return = V), (V = W));
											break e;
										}
										r(V, q);
										break;
									} else i(V, q);
									q = q.sibling;
								}
								Q.type === A
									? ((W = va(Q.props.children, V.mode, W, Q.key)), (W.return = V), (V = W))
									: ((W = Us(Q.type, Q.key, Q.props, null, V.mode, W)), hu(W, Q), (W.return = V), (V = W));
							}
							return y(V);
						case C:
							e: {
								for (ye = Q.key; q !== null; ) {
									if (q.key === ye)
										if (
											q.tag === 4 &&
											q.stateNode.containerInfo === Q.containerInfo &&
											q.stateNode.implementation === Q.implementation
										) {
											(r(V, q.sibling), (W = c(q, Q.children || [])), (W.return = V), (V = W));
											break e;
										} else {
											r(V, q);
											break;
										}
									else i(V, q);
									q = q.sibling;
								}
								((W = lc(Q, V.mode, W)), (W.return = V), (V = W));
							}
							return y(V);
						case U:
							return ((Q = Sa(Q)), Ke(V, q, Q, W));
					}
					if (z(Q)) return fe(V, q, Q, W);
					if (ee(Q)) {
						if (((ye = ee(Q)), typeof ye != "function")) throw Error(l(150));
						return ((Q = ye.call(Q)), we(V, q, Q, W));
					}
					if (typeof Q.then == "function") return Ke(V, q, Qs(Q), W);
					if (Q.$$typeof === O) return Ke(V, q, Bs(V, Q), W);
					Ps(V, Q);
				}
				return (typeof Q == "string" && Q !== "") || typeof Q == "number" || typeof Q == "bigint"
					? ((Q = "" + Q),
						q !== null && q.tag === 6
							? (r(V, q.sibling), (W = c(q, Q)), (W.return = V), (V = W))
							: (r(V, q), (W = sc(Q, V.mode, W)), (W.return = V), (V = W)),
						y(V))
					: r(V, q);
			}
			return function (V, q, Q, W) {
				try {
					du = 0;
					var ye = Ke(V, q, Q, W);
					return ((cr = null), ye);
				} catch (he) {
					if (he === or || he === Hs) throw he;
					var $e = hn(29, he, null, V.mode);
					return (($e.lanes = W), ($e.return = V), $e);
				}
			};
		}
		var _a = jm(!0),
			qm = jm(!1),
			Ii = !1;
		function Sc(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function wc(t, i) {
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
		function xa(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function Ea(t, i, r) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (Ve & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(s.pending = i),
					(i = Is(t)),
					pm(t, null, r),
					i
				);
			}
			return (qs(t, s, i, r), Is(t));
		}
		function mu(t, i, r) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (r & 4194048) !== 0))) {
				var s = i.lanes;
				((s &= t.pendingLanes), (r |= s), (i.lanes = r), Th(t, r));
			}
		}
		function _c(t, i) {
			var r = t.updateQueue,
				s = t.alternate;
			if (s !== null && ((s = s.updateQueue), r === s)) {
				var c = null,
					d = null;
				if (((r = r.firstBaseUpdate), r !== null)) {
					do {
						var y = { lane: r.lane, tag: r.tag, payload: r.payload, callback: null, next: null };
						(d === null ? (c = d = y) : (d = d.next = y), (r = r.next));
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
		var xc = !1;
		function vu() {
			if (xc) {
				var t = lr;
				if (t !== null) throw t;
			}
		}
		function gu(t, i, r, s) {
			xc = !1;
			var c = t.updateQueue;
			Ii = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				x = c.shared.pending;
			if (x !== null) {
				c.shared.pending = null;
				var M = x,
					P = M.next;
				((M.next = null), y === null ? (d = P) : (y.next = P), (y = M));
				var J = t.alternate;
				J !== null &&
					((J = J.updateQueue),
					(x = J.lastBaseUpdate),
					x !== y && (x === null ? (J.firstBaseUpdate = P) : (x.next = P), (J.lastBaseUpdate = M)));
			}
			if (d !== null) {
				var te = c.baseState;
				((y = 0), (J = P = M = null), (x = d));
				do {
					var Y = x.lane & -536870913,
						F = Y !== x.lane;
					if (F ? (ke & Y) === Y : (s & Y) === Y) {
						(Y !== 0 && Y === sr && (xc = !0),
							J !== null && (J = J.next = { lane: 0, tag: x.tag, payload: x.payload, callback: null, next: null }));
						e: {
							var fe = t,
								we = x;
							Y = i;
							var Ke = r;
							switch (we.tag) {
								case 1:
									if (((fe = we.payload), typeof fe == "function")) {
										te = fe.call(Ke, te, Y);
										break e;
									}
									te = fe;
									break e;
								case 3:
									fe.flags = (fe.flags & -65537) | 128;
								case 0:
									if (((fe = we.payload), (Y = typeof fe == "function" ? fe.call(Ke, te, Y) : fe), Y == null)) break e;
									te = p({}, te, Y);
									break e;
								case 2:
									Ii = !0;
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
							J === null ? ((P = J = F), (M = te)) : (J = J.next = F),
							(y |= Y));
					if (((x = x.next), x === null)) {
						if (((x = c.shared.pending), x === null)) break;
						((F = x), (x = F.next), (F.next = null), (c.lastBaseUpdate = F), (c.shared.pending = null));
					}
				} while (!0);
				(J === null && (M = te),
					(c.baseState = M),
					(c.firstBaseUpdate = P),
					(c.lastBaseUpdate = J),
					d === null && (c.shared.lanes = 0),
					(Vi |= y),
					(t.lanes = y),
					(t.memoizedState = te));
			}
		}
		function Im(t, i) {
			if (typeof t != "function") throw Error(l(191, t));
			t.call(i);
		}
		function Um(t, i) {
			var r = t.callbacks;
			if (r !== null) for (t.callbacks = null, t = 0; t < r.length; t++) Im(r[t], i);
		}
		var fr = N(null),
			Ys = N(0);
		function Lm(t, i) {
			((t = mi), re(Ys, t), re(fr, i), (mi = t | i.baseLanes));
		}
		function Ec() {
			(re(Ys, mi), re(fr, fr.current));
		}
		function Cc() {
			((mi = Ys.current), X(fr), X(Ys));
		}
		var mn = N(null),
			An = null;
		function Ui(t) {
			var i = t.alternate;
			(re(dt, dt.current & 1),
				re(mn, t),
				An === null && (i === null || fr.current !== null || i.memoizedState !== null) && (An = t));
		}
		function Tc(t) {
			(re(dt, dt.current), re(mn, t), An === null && (An = t));
		}
		function $m(t) {
			t.tag === 22 ? (re(dt, dt.current), re(mn, t), An === null && (An = t)) : Li(t);
		}
		function Li() {
			(re(dt, dt.current), re(mn, mn.current));
		}
		function vn(t) {
			(X(mn), An === t && (An = null), X(dt));
		}
		var dt = N(0);
		function Fs(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var r = i.memoizedState;
					if (r !== null && ((r = r.dehydrated), r === null || zf(r) || kf(r))) return i;
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
		var ui = 0,
			Te = null,
			Ye = null,
			bt = null,
			Ks = !1,
			dr = !1,
			Ca = !1,
			Gs = 0,
			yu = 0,
			hr = null,
			Iw = 0;
		function ct() {
			throw Error(l(321));
		}
		function Ac(t, i) {
			if (i === null) return !1;
			for (var r = 0; r < i.length && r < t.length; r++) if (!dn(t[r], i[r])) return !1;
			return !0;
		}
		function Rc(t, i, r, s, c, d) {
			return (
				(ui = d),
				(Te = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				(H.H = t === null || t.memoizedState === null ? xv : Hc),
				(Ca = !1),
				(d = r(s, c)),
				(Ca = !1),
				dr && (d = Vm(i, r, s, c)),
				Bm(t),
				d
			);
		}
		function Bm(t) {
			H.H = Su;
			var i = Ye !== null && Ye.next !== null;
			if (((ui = 0), (bt = Ye = Te = null), (Ks = !1), (yu = 0), (hr = null), i)) throw Error(l(300));
			t === null || pt || ((t = t.dependencies), t !== null && $s(t) && (pt = !0));
		}
		function Vm(t, i, r, s) {
			Te = t;
			var c = 0;
			do {
				if ((dr && (hr = null), (yu = 0), (dr = !1), 25 <= c)) throw Error(l(301));
				if (((c += 1), (bt = Ye = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((H.H = Ev), (d = i(r, s)));
			} while (dr);
			return d;
		}
		function Uw() {
			var t = H.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? bu(i) : i),
				(t = t.useState()[0]),
				(Ye !== null ? Ye.memoizedState : null) !== t && (Te.flags |= 1024),
				i
			);
		}
		function Oc() {
			var t = Gs !== 0;
			return ((Gs = 0), t);
		}
		function Nc(t, i, r) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~r));
		}
		function Mc(t) {
			if (Ks) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				Ks = !1;
			}
			((ui = 0), (bt = Ye = Te = null), (dr = !1), (yu = Gs = 0), (hr = null));
		}
		function Yt() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (bt === null ? (Te.memoizedState = bt = t) : (bt = bt.next = t), bt);
		}
		function ht() {
			if (Ye === null) {
				var t = Te.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Ye.next;
			var i = bt === null ? Te.memoizedState : bt.next;
			if (i !== null) ((bt = i), (Ye = t));
			else {
				if (t === null) throw Te.alternate === null ? Error(l(467)) : Error(l(310));
				((Ye = t),
					(t = {
						memoizedState: Ye.memoizedState,
						baseState: Ye.baseState,
						baseQueue: Ye.baseQueue,
						queue: Ye.queue,
						next: null,
					}),
					bt === null ? (Te.memoizedState = bt = t) : (bt = bt.next = t));
			}
			return bt;
		}
		function Xs() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function bu(t) {
			var i = yu;
			return (
				(yu += 1),
				hr === null && (hr = []),
				(t = zm(hr, t, i)),
				(i = Te),
				(bt === null ? i.memoizedState : bt.next) === null &&
					((i = i.alternate), (H.H = i === null || i.memoizedState === null ? xv : Hc)),
				t
			);
		}
		function Js(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return bu(t);
				if (t.$$typeof === O) return It(t);
			}
			throw Error(l(438, String(t)));
		}
		function zc(t) {
			var i = null,
				r = Te.updateQueue;
			if ((r !== null && (i = r.memoCache), i == null)) {
				var s = Te.alternate;
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
				r === null && ((r = Xs()), (Te.updateQueue = r)),
				(r.memoCache = i),
				(r = i.data[i.index]),
				r === void 0)
			)
				for (r = i.data[i.index] = Array(t), s = 0; s < t; s++) r[s] = Z;
			return (i.index++, r);
		}
		function si(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function Ws(t) {
			return kc(ht(), Ye, t);
		}
		function kc(t, i, r) {
			var s = t.queue;
			if (s === null) throw Error(l(311));
			s.lastRenderedReducer = r;
			var c = t.baseQueue,
				d = s.pending;
			if (d !== null) {
				if (c !== null) {
					var y = c.next;
					((c.next = d.next), (d.next = y));
				}
				((i.baseQueue = c = d), (s.pending = null));
			}
			if (((d = t.baseState), c === null)) t.memoizedState = d;
			else {
				i = c.next;
				var x = (y = null),
					M = null,
					P = i,
					J = !1;
				do {
					var te = P.lane & -536870913;
					if (te !== P.lane ? (ke & te) === te : (ui & te) === te) {
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
								te === sr && (J = !0));
						else if ((ui & Y) === Y) {
							((P = P.next), Y === sr && (J = !0));
							continue;
						} else
							((te = {
								lane: 0,
								revertLane: P.revertLane,
								gesture: null,
								action: P.action,
								hasEagerState: P.hasEagerState,
								eagerState: P.eagerState,
								next: null,
							}),
								M === null ? ((x = M = te), (y = d)) : (M = M.next = te),
								(Te.lanes |= Y),
								(Vi |= Y));
						((te = P.action), Ca && r(d, te), (d = P.hasEagerState ? P.eagerState : r(d, te)));
					} else
						((Y = {
							lane: te,
							revertLane: P.revertLane,
							gesture: P.gesture,
							action: P.action,
							hasEagerState: P.hasEagerState,
							eagerState: P.eagerState,
							next: null,
						}),
							M === null ? ((x = M = Y), (y = d)) : (M = M.next = Y),
							(Te.lanes |= te),
							(Vi |= te));
					P = P.next;
				} while (P !== null && P !== i);
				if ((M === null ? (y = d) : (M.next = x), !dn(d, t.memoizedState) && ((pt = !0), J && ((r = lr), r !== null))))
					throw r;
				((t.memoizedState = d), (t.baseState = y), (t.baseQueue = M), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
		}
		function Dc(t) {
			var i = ht(),
				r = i.queue;
			if (r === null) throw Error(l(311));
			r.lastRenderedReducer = t;
			var s = r.dispatch,
				c = r.pending,
				d = i.memoizedState;
			if (c !== null) {
				r.pending = null;
				var y = (c = c.next);
				do ((d = t(d, y.action)), (y = y.next));
				while (y !== c);
				(dn(d, i.memoizedState) || (pt = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(r.lastRenderedState = d));
			}
			return [d, s];
		}
		function Hm(t, i, r) {
			var s = Te,
				c = ht(),
				d = Ie;
			if (d) {
				if (r === void 0) throw Error(l(407));
				r = r();
			} else r = i();
			var y = !dn((Ye || c).memoizedState, r);
			if (
				(y && ((c.memoizedState = r), (pt = !0)),
				(c = c.queue),
				Ic(Pm.bind(null, s, c, t), [t]),
				c.getSnapshot !== i || y || (bt !== null && bt.memoizedState.tag & 1))
			) {
				if (((s.flags |= 2048), mr(9, { destroy: void 0 }, Qm.bind(null, s, c, r, i), null), Xe === null))
					throw Error(l(349));
				d || (ui & 127) !== 0 || Zm(s, i, r);
			}
			return r;
		}
		function Zm(t, i, r) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: r }),
				(i = Te.updateQueue),
				i === null
					? ((i = Xs()), (Te.updateQueue = i), (i.stores = [t]))
					: ((r = i.stores), r === null ? (i.stores = [t]) : r.push(t)));
		}
		function Qm(t, i, r, s) {
			((i.value = r), (i.getSnapshot = s), Ym(i) && Fm(t));
		}
		function Pm(t, i, r) {
			return r(function () {
				Ym(i) && Fm(t);
			});
		}
		function Ym(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var r = i();
				return !dn(t, r);
			} catch {
				return !0;
			}
		}
		function Fm(t) {
			var i = ma(t, 2);
			i !== null && nn(i, t, 2);
		}
		function jc(t) {
			var i = Yt();
			if (typeof t == "function") {
				var r = t;
				if (((t = r()), Ca)) {
					Ni(!0);
					try {
						r();
					} finally {
						Ni(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: si, lastRenderedState: t }),
				i
			);
		}
		function Km(t, i, r, s) {
			return ((t.baseState = r), kc(t, Ye, typeof s == "function" ? s : si));
		}
		function Lw(t, i, r, s, c) {
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
					then: function (y) {
						d.listeners.push(y);
					},
				};
				(H.T !== null ? r(!0) : (d.isTransition = !1),
					s(d),
					(r = i.pending),
					r === null ? ((d.next = i.pending = d), Gm(i, d)) : ((d.next = r.next), (i.pending = r.next = d)));
			}
		}
		function Gm(t, i) {
			var r = i.action,
				s = i.payload,
				c = t.state;
			if (i.isTransition) {
				var d = H.T,
					y = {};
				H.T = y;
				try {
					var x = r(c, s),
						M = H.S;
					(M !== null && M(y, x), Xm(t, i, x));
				} catch (P) {
					qc(t, i, P);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), (H.T = d));
				}
			} else
				try {
					((d = r(c, s)), Xm(t, i, d));
				} catch (P) {
					qc(t, i, P);
				}
		}
		function Xm(t, i, r) {
			r !== null && typeof r == "object" && typeof r.then == "function"
				? r.then(
						function (s) {
							Jm(t, i, s);
						},
						function (s) {
							return qc(t, i, s);
						},
					)
				: Jm(t, i, r);
		}
		function Jm(t, i, r) {
			((i.status = "fulfilled"),
				(i.value = r),
				Wm(i),
				(t.state = r),
				(i = t.pending),
				i !== null && ((r = i.next), r === i ? (t.pending = null) : ((r = r.next), (i.next = r), Gm(t, r))));
		}
		function qc(t, i, r) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((i.status = "rejected"), (i.reason = r), Wm(i), (i = i.next));
				while (i !== s);
			}
			t.action = null;
		}
		function Wm(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function ev(t, i) {
			return i;
		}
		function tv(t, i) {
			if (Ie) {
				var r = Xe.formState;
				if (r !== null) {
					e: {
						var s = Te;
						if (Ie) {
							if (We) {
								t: {
									for (var c = We, d = Tn; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = On(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((We = On(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							ji(s);
						}
						s = !1;
					}
					s && (i = r[0]);
				}
			}
			return (
				(r = Yt()),
				(r.memoizedState = r.baseState = i),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ev, lastRenderedState: i }),
				(r.queue = s),
				(r = Sv.bind(null, Te, s)),
				(s.dispatch = r),
				(s = jc(!1)),
				(d = Vc.bind(null, Te, !1, s.queue)),
				(s = Yt()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(r = Lw.bind(null, Te, c, d, r)),
				(c.dispatch = r),
				(s.memoizedState = t),
				[i, r, !1]
			);
		}
		function nv(t) {
			return iv(ht(), Ye, t);
		}
		function iv(t, i, r) {
			if (((i = kc(t, i, ev)[0]), (t = Ws(si)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var s = bu(i);
				} catch (y) {
					throw y === or ? Hs : y;
				}
			else s = i;
			i = ht();
			var c = i.queue,
				d = c.dispatch;
			return (
				r !== i.memoizedState && ((Te.flags |= 2048), mr(9, { destroy: void 0 }, $w.bind(null, c, r), null)),
				[s, d, t]
			);
		}
		function $w(t, i) {
			t.action = i;
		}
		function av(t) {
			var i = ht(),
				r = Ye;
			if (r !== null) return iv(i, r, t);
			(ht(), (i = i.memoizedState), (r = ht()));
			var s = r.queue.dispatch;
			return ((r.memoizedState = t), [i, s, !1]);
		}
		function mr(t, i, r, s) {
			return (
				(t = { tag: t, create: r, deps: s, inst: i, next: null }),
				(i = Te.updateQueue),
				i === null && ((i = Xs()), (Te.updateQueue = i)),
				(r = i.lastEffect),
				r === null ? (i.lastEffect = t.next = t) : ((s = r.next), (r.next = t), (t.next = s), (i.lastEffect = t)),
				t
			);
		}
		function rv() {
			return ht().memoizedState;
		}
		function el(t, i, r, s) {
			var c = Yt();
			((Te.flags |= t), (c.memoizedState = mr(1 | i, { destroy: void 0 }, r, s === void 0 ? null : s)));
		}
		function tl(t, i, r, s) {
			var c = ht();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			Ye !== null && s !== null && Ac(s, Ye.memoizedState.deps)
				? (c.memoizedState = mr(i, d, r, s))
				: ((Te.flags |= t), (c.memoizedState = mr(1 | i, d, r, s)));
		}
		function uv(t, i) {
			el(8390656, 8, t, i);
		}
		function Ic(t, i) {
			tl(2048, 8, t, i);
		}
		function Bw(t) {
			Te.flags |= 4;
			var i = Te.updateQueue;
			if (i === null) ((i = Xs()), (Te.updateQueue = i), (i.events = [t]));
			else {
				var r = i.events;
				r === null ? (i.events = [t]) : r.push(t);
			}
		}
		function sv(t) {
			var i = ht().memoizedState;
			return (
				Bw({ ref: i, nextImpl: t }),
				function () {
					if ((Ve & 2) !== 0) throw Error(l(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function lv(t, i) {
			return tl(4, 2, t, i);
		}
		function ov(t, i) {
			return tl(4, 4, t, i);
		}
		function cv(t, i) {
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
		function fv(t, i, r) {
			((r = r != null ? r.concat([t]) : null), tl(4, 4, cv.bind(null, i, t), r));
		}
		function Uc() {}
		function dv(t, i) {
			var r = ht();
			i = i === void 0 ? null : i;
			var s = r.memoizedState;
			return i !== null && Ac(i, s[1]) ? s[0] : ((r.memoizedState = [t, i]), t);
		}
		function hv(t, i) {
			var r = ht();
			i = i === void 0 ? null : i;
			var s = r.memoizedState;
			if (i !== null && Ac(i, s[1])) return s[0];
			if (((s = t()), Ca)) {
				Ni(!0);
				try {
					t();
				} finally {
					Ni(!1);
				}
			}
			return ((r.memoizedState = [s, i]), s);
		}
		function Lc(t, i, r) {
			return r === void 0 || ((ui & 1073741824) !== 0 && (ke & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = r), (t = fg()), (Te.lanes |= t), (Vi |= t), r);
		}
		function mv(t, i, r, s) {
			return dn(r, i)
				? r
				: fr.current !== null
					? ((t = Lc(t, r, s)), dn(t, i) || (pt = !0), t)
					: (ui & 42) === 0 || ((ui & 1073741824) !== 0 && (ke & 261930) === 0)
						? ((pt = !0), (t.memoizedState = r))
						: ((t = fg()), (Te.lanes |= t), (Vi |= t), i);
		}
		function vv(t, i, r, s, c) {
			var d = $.p;
			$.p = d !== 0 && 8 > d ? d : 8;
			var y = H.T,
				x = {};
			((H.T = x), Vc(t, !1, i, r));
			try {
				var M = c(),
					P = H.S;
				(P !== null && P(x, M),
					M !== null && typeof M == "object" && typeof M.then == "function"
						? pu(t, i, qw(M, s), Rn(t))
						: pu(t, i, s, Rn(t)));
			} catch (J) {
				pu(t, i, { then: function () {}, status: "rejected", reason: J }, Rn());
			} finally {
				(($.p = d), y !== null && x.types !== null && (y.types = x.types), (H.T = y));
			}
		}
		function Vw() {}
		function $c(t, i, r, s) {
			if (t.tag !== 5) throw Error(l(476));
			var c = gv(t).queue;
			vv(
				t,
				c,
				i,
				G,
				r === null
					? Vw
					: function () {
							return (yv(t), r(s));
						},
			);
		}
		function gv(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: G,
				baseState: G,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: si, lastRenderedState: G },
				next: null,
			};
			var r = {};
			return (
				(i.next = {
					memoizedState: r,
					baseState: r,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: si, lastRenderedState: r },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function yv(t) {
			var i = gv(t);
			(i.next === null && (i = t.alternate.memoizedState), pu(t, i.next.queue, {}, Rn()));
		}
		function Bc() {
			return It(qu);
		}
		function bv() {
			return ht().memoizedState;
		}
		function pv() {
			return ht().memoizedState;
		}
		function Hw(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var r = Rn();
						t = xa(r);
						var s = Ea(i, t, r);
						(s !== null && (nn(s, i, r), mu(s, i, r)), (i = { cache: gc() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function Zw(t, i, r) {
			var s = Rn();
			((r = { lane: s, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null }),
				nl(t) ? wv(i, r) : ((r = rc(t, i, r, s)), r !== null && (nn(r, t, s), _v(r, i, s))));
		}
		function Sv(t, i, r) {
			pu(t, i, r, Rn());
		}
		function pu(t, i, r, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null };
			if (nl(t)) wv(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var y = i.lastRenderedState,
							x = d(y, r);
						if (((c.hasEagerState = !0), (c.eagerState = x), dn(x, y)))
							return (qs(t, i, c, 0), Xe === null && js(), !1);
					} catch {}
				if (((r = rc(t, i, c, s)), r !== null)) return (nn(r, t, s), _v(r, i, s), !0);
			}
			return !1;
		}
		function Vc(t, i, r, s) {
			if (
				((s = { lane: 2, revertLane: wf(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				nl(t))
			) {
				if (i) throw Error(l(479));
			} else ((i = rc(t, r, s, 2)), i !== null && nn(i, t, 2));
		}
		function nl(t) {
			var i = t.alternate;
			return t === Te || (i !== null && i === Te);
		}
		function wv(t, i) {
			dr = Ks = !0;
			var r = t.pending;
			(r === null ? (i.next = i) : ((i.next = r.next), (r.next = i)), (t.pending = i));
		}
		function _v(t, i, r) {
			if ((r & 4194048) !== 0) {
				var s = i.lanes;
				((s &= t.pendingLanes), (r |= s), (i.lanes = r), Th(t, r));
			}
		}
		var Su = {
			readContext: It,
			use: Js,
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
		Su.useEffectEvent = ct;
		var xv = {
				readContext: It,
				use: Js,
				useCallback: function (t, i) {
					return ((Yt().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: It,
				useEffect: uv,
				useImperativeHandle: function (t, i, r) {
					((r = r != null ? r.concat([t]) : null), el(4194308, 4, cv.bind(null, i, t), r));
				},
				useLayoutEffect: function (t, i) {
					return el(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					el(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var r = Yt();
					i = i === void 0 ? null : i;
					var s = t();
					if (Ca) {
						Ni(!0);
						try {
							t();
						} finally {
							Ni(!1);
						}
					}
					return ((r.memoizedState = [s, i]), s);
				},
				useReducer: function (t, i, r) {
					var s = Yt();
					if (r !== void 0) {
						var c = r(i);
						if (Ca) {
							Ni(!0);
							try {
								r(i);
							} finally {
								Ni(!1);
							}
						}
					} else c = i;
					return (
						(s.memoizedState = s.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(s.queue = t),
						(t = t.dispatch = Zw.bind(null, Te, t)),
						[s.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = Yt();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = jc(t);
					var i = t.queue,
						r = Sv.bind(null, Te, i);
					return ((i.dispatch = r), [t.memoizedState, r]);
				},
				useDebugValue: Uc,
				useDeferredValue: function (t, i) {
					return Lc(Yt(), t, i);
				},
				useTransition: function () {
					var t = jc(!1);
					return ((t = vv.bind(null, Te, t.queue, !0, !1)), (Yt().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, r) {
					var s = Te,
						c = Yt();
					if (Ie) {
						if (r === void 0) throw Error(l(407));
						r = r();
					} else {
						if (((r = i()), Xe === null)) throw Error(l(349));
						(ke & 127) !== 0 || Zm(s, i, r);
					}
					c.memoizedState = r;
					var d = { value: r, getSnapshot: i };
					return (
						(c.queue = d),
						uv(Pm.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						mr(9, { destroy: void 0 }, Qm.bind(null, s, d, r, i), null),
						r
					);
				},
				useId: function () {
					var t = Yt(),
						i = Xe.identifierPrefix;
					if (Ie) {
						var r = Vn,
							s = Bn;
						((r = (s & ~(1 << (32 - fn(s) - 1))).toString(32) + r),
							(i = "_" + i + "R_" + r),
							(r = Gs++),
							0 < r && (i += "H" + r.toString(32)),
							(i += "_"));
					} else ((r = Iw++), (i = "_" + i + "r_" + r.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: Bc,
				useFormState: tv,
				useActionState: tv,
				useOptimistic: function (t) {
					var i = Yt();
					i.memoizedState = i.baseState = t;
					var r = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = r), (i = Vc.bind(null, Te, !0, r)), (r.dispatch = i), [t, i]);
				},
				useMemoCache: zc,
				useCacheRefresh: function () {
					return (Yt().memoizedState = Hw.bind(null, Te));
				},
				useEffectEvent: function (t) {
					var i = Yt(),
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
			Hc = {
				readContext: It,
				use: Js,
				useCallback: dv,
				useContext: It,
				useEffect: Ic,
				useImperativeHandle: fv,
				useInsertionEffect: lv,
				useLayoutEffect: ov,
				useMemo: hv,
				useReducer: Ws,
				useRef: rv,
				useState: function () {
					return Ws(si);
				},
				useDebugValue: Uc,
				useDeferredValue: function (t, i) {
					return mv(ht(), Ye.memoizedState, t, i);
				},
				useTransition: function () {
					var t = Ws(si)[0],
						i = ht().memoizedState;
					return [typeof t == "boolean" ? t : bu(t), i];
				},
				useSyncExternalStore: Hm,
				useId: bv,
				useHostTransitionStatus: Bc,
				useFormState: nv,
				useActionState: nv,
				useOptimistic: function (t, i) {
					return Km(ht(), Ye, t, i);
				},
				useMemoCache: zc,
				useCacheRefresh: pv,
			};
		Hc.useEffectEvent = sv;
		var Ev = {
			readContext: It,
			use: Js,
			useCallback: dv,
			useContext: It,
			useEffect: Ic,
			useImperativeHandle: fv,
			useInsertionEffect: lv,
			useLayoutEffect: ov,
			useMemo: hv,
			useReducer: Dc,
			useRef: rv,
			useState: function () {
				return Dc(si);
			},
			useDebugValue: Uc,
			useDeferredValue: function (t, i) {
				var r = ht();
				return Ye === null ? Lc(r, t, i) : mv(r, Ye.memoizedState, t, i);
			},
			useTransition: function () {
				var t = Dc(si)[0],
					i = ht().memoizedState;
				return [typeof t == "boolean" ? t : bu(t), i];
			},
			useSyncExternalStore: Hm,
			useId: bv,
			useHostTransitionStatus: Bc,
			useFormState: av,
			useActionState: av,
			useOptimistic: function (t, i) {
				var r = ht();
				return Ye !== null ? Km(r, Ye, t, i) : ((r.baseState = t), [t, r.queue.dispatch]);
			},
			useMemoCache: zc,
			useCacheRefresh: pv,
		};
		Ev.useEffectEvent = sv;
		function Zc(t, i, r, s) {
			((i = t.memoizedState),
				(r = r(s, i)),
				(r = r == null ? i : p({}, i, r)),
				(t.memoizedState = r),
				t.lanes === 0 && (t.updateQueue.baseState = r));
		}
		var Qc = {
			enqueueSetState: function (t, i, r) {
				t = t._reactInternals;
				var s = Rn(),
					c = xa(s);
				((c.payload = i), r != null && (c.callback = r), (i = Ea(t, c, s)), i !== null && (nn(i, t, s), mu(i, t, s)));
			},
			enqueueReplaceState: function (t, i, r) {
				t = t._reactInternals;
				var s = Rn(),
					c = xa(s);
				((c.tag = 1),
					(c.payload = i),
					r != null && (c.callback = r),
					(i = Ea(t, c, s)),
					i !== null && (nn(i, t, s), mu(i, t, s)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var r = Rn(),
					s = xa(r);
				((s.tag = 2), i != null && (s.callback = i), (i = Ea(t, s, r)), i !== null && (nn(i, t, r), mu(i, t, r)));
			},
		};
		function Cv(t, i, r, s, c, d, y) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, y)
					: i.prototype && i.prototype.isPureReactComponent
						? !uu(r, s) || !uu(c, d)
						: !0
			);
		}
		function Tv(t, i, r, s) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(r, s),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(r, s),
				i.state !== t && Qc.enqueueReplaceState(i, i.state, null));
		}
		function Ta(t, i) {
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
		function Qw(t) {
			Ds(t);
		}
		function Pw(t) {
			console.error(t);
		}
		function Yw(t) {
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
		function Av(t, i, r) {
			try {
				var s = t.onCaughtError;
				s(r.value, { componentStack: r.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Pc(t, i, r) {
			return (
				(r = xa(r)),
				(r.tag = 3),
				(r.payload = { element: null }),
				(r.callback = function () {
					il(t, i);
				}),
				r
			);
		}
		function Rv(t) {
			return ((t = xa(t)), (t.tag = 3), t);
		}
		function Ov(t, i, r, s) {
			var c = r.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						Av(i, r, s);
					}));
			}
			var y = r.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(t.callback = function () {
					(Av(i, r, s), typeof c != "function" && (Hi === null ? (Hi = new Set([this])) : Hi.add(this)));
					var x = s.stack;
					this.componentDidCatch(s.value, { componentStack: x !== null ? x : "" });
				});
		}
		function Fw(t, i, r, s, c) {
			if (((r.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((i = r.alternate), i !== null && ur(i, r, c, !0), (r = mn.current), r !== null)) {
					switch (r.tag) {
						case 31:
						case 13:
							return (
								An === null ? vl() : r.alternate === null && ft === 0 && (ft = 3),
								(r.flags &= -257),
								(r.flags |= 65536),
								(r.lanes = c),
								s === Zs
									? (r.flags |= 16384)
									: ((i = r.updateQueue), i === null ? (r.updateQueue = new Set([s])) : i.add(s), bf(t, s, c)),
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
										bf(t, s, c)),
								!1
							);
					}
					throw Error(l(435, r.tag));
				}
				return (bf(t, s, c), vl(), !1);
			}
			if (Ie)
				return (
					(i = mn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							s !== fc && ((t = Error(l(422), { cause: s })), ou(xn(t, r))))
						: (s !== fc && ((i = Error(l(423), { cause: s })), ou(xn(i, r))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(s = xn(s, r)),
							(c = Pc(t.stateNode, s, c)),
							_c(t, c),
							ft !== 4 && (ft = 2)),
					!1
				);
			var d = Error(l(520), { cause: s });
			if (((d = xn(d, r)), Ru === null ? (Ru = [d]) : Ru.push(d), ft !== 4 && (ft = 2), i === null)) return !0;
			((s = xn(s, r)), (r = i));
			do {
				switch (r.tag) {
					case 3:
						return ((r.flags |= 65536), (t = c & -c), (r.lanes |= t), (t = Pc(r.stateNode, s, t)), _c(r, t), !1);
					case 1:
						if (
							((i = r.type),
							(d = r.stateNode),
							(r.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Hi === null || !Hi.has(d)))))
						)
							return ((r.flags |= 65536), (c &= -c), (r.lanes |= c), (c = Rv(c)), Ov(c, t, r, s), _c(r, c), !1);
				}
				r = r.return;
			} while (r !== null);
			return !1;
		}
		var Yc = Error(l(461)),
			pt = !1;
		function Ut(t, i, r, s) {
			i.child = t === null ? qm(i, null, r, s) : _a(i, t.child, r, s);
		}
		function Nv(t, i, r, s, c) {
			r = r.render;
			var d = i.ref;
			if ("ref" in s) {
				var y = {};
				for (var x in s) x !== "ref" && (y[x] = s[x]);
			} else y = s;
			return (
				ba(i),
				(s = Rc(t, i, r, y, d, c)),
				(x = Oc()),
				t !== null && !pt ? (Nc(t, i, c), li(t, i, c)) : (Ie && x && oc(i), (i.flags |= 1), Ut(t, i, s, c), i.child)
			);
		}
		function Mv(t, i, r, s, c) {
			if (t === null) {
				var d = r.type;
				return typeof d == "function" && !uc(d) && d.defaultProps === void 0 && r.compare === null
					? ((i.tag = 15), (i.type = d), zv(t, i, d, s, c))
					: ((t = Us(r.type, null, s, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !tf(t, c))) {
				var y = d.memoizedProps;
				if (((r = r.compare), (r = r !== null ? r : uu), r(y, s) && t.ref === i.ref)) return li(t, i, c);
			}
			return ((i.flags |= 1), (t = ni(d, s)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function zv(t, i, r, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (uu(d, s) && t.ref === i.ref)
					if (((pt = !1), (i.pendingProps = s = d), tf(t, c))) (t.flags & 131072) !== 0 && (pt = !0);
					else return ((i.lanes = t.lanes), li(t, i, c));
			}
			return Fc(t, i, r, s, c);
		}
		function kv(t, i, r, s) {
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
					return Dv(t, i, d, r, s);
				}
				if ((r & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && Vs(i, d !== null ? d.cachePool : null),
						d !== null ? Lm(i, d) : Ec(),
						$m(i));
				else return ((s = i.lanes = 536870912), Dv(t, i, d !== null ? d.baseLanes | r : r, r, s));
			} else
				d !== null
					? (Vs(i, d.cachePool), Lm(i, d), Li(i), (i.memoizedState = null))
					: (t !== null && Vs(i, null), Ec(), Li(i));
			return (Ut(t, i, c, r), i.child);
		}
		function wu(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function Dv(t, i, r, s, c) {
			var d = bc();
			return (
				(d = d === null ? null : { parent: yt._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: r, cachePool: d }),
				t !== null && Vs(i, null),
				Ec(),
				$m(i),
				t !== null && ur(t, i, s, !0),
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
		function jv(t, i, r) {
			return (_a(i, t.child, null, r), (t = al(i, i.pendingProps)), (t.flags |= 2), vn(i), (i.memoizedState = null), t);
		}
		function Kw(t, i, r) {
			var s = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if (Ie) {
					if (s.mode === "hidden") return ((t = al(i, s)), (i.lanes = 536870912), wu(null, t));
					if (
						(Tc(i),
						(t = We)
							? ((t = Fg(t, Tn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ki !== null ? { id: Bn, overflow: Vn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(r = wm(t)),
									(r.return = i),
									(i.child = r),
									(qt = i),
									(We = null)))
							: (t = null),
						t === null)
					)
						throw ji(i);
					return ((i.lanes = 536870912), null);
				}
				return al(i, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Tc(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = jv(t, i, r)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(l(558));
				else if ((pt || ur(t, i, r, !1), (c = (r & t.childLanes) !== 0), pt || c)) {
					if (((s = Xe), s !== null && ((y = Ah(s, r)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), ma(t, y), nn(s, t, y), Yc);
					(vl(), (i = jv(t, i, r)));
				} else
					((t = d.treeContext),
						(We = On(y.nextSibling)),
						(qt = i),
						(Ie = !0),
						(Di = null),
						(Tn = !1),
						t !== null && Em(i, t),
						(i = al(i, s)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = ni(t.child, { mode: s.mode, children: s.children })),
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
		function Fc(t, i, r, s, c) {
			return (
				ba(i),
				(r = Rc(t, i, r, s, void 0, c)),
				(s = Oc()),
				t !== null && !pt ? (Nc(t, i, c), li(t, i, c)) : (Ie && s && oc(i), (i.flags |= 1), Ut(t, i, r, c), i.child)
			);
		}
		function qv(t, i, r, s, c, d) {
			return (
				ba(i),
				(i.updateQueue = null),
				(r = Vm(i, s, r, c)),
				Bm(t),
				(s = Oc()),
				t !== null && !pt ? (Nc(t, i, d), li(t, i, d)) : (Ie && s && oc(i), (i.flags |= 1), Ut(t, i, r, d), i.child)
			);
		}
		function Iv(t, i, r, s, c) {
			if ((ba(i), i.stateNode === null)) {
				var d = nr,
					y = r.contextType;
				(typeof y == "object" && y !== null && (d = It(y)),
					(d = new r(s, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Qc),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = s),
					(d.state = i.memoizedState),
					(d.refs = {}),
					Sc(i),
					(y = r.contextType),
					(d.context = typeof y == "object" && y !== null ? It(y) : nr),
					(d.state = i.memoizedState),
					(y = r.getDerivedStateFromProps),
					typeof y == "function" && (Zc(i, r, y, s), (d.state = i.memoizedState)),
					typeof r.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && Qc.enqueueReplaceState(d, d.state, null),
						gu(i, s, d, c),
						vu(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(s = !0));
			} else if (t === null) {
				d = i.stateNode;
				var x = i.memoizedProps,
					M = Ta(r, x);
				d.props = M;
				var P = d.context,
					J = r.contextType;
				((y = nr), typeof J == "object" && J !== null && (y = It(J)));
				var te = r.getDerivedStateFromProps;
				((J = typeof te == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(x = i.pendingProps !== x),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((x || P !== y) && Tv(i, d, s, y)),
					(Ii = !1));
				var Y = i.memoizedState;
				((d.state = Y),
					gu(i, s, d, c),
					vu(),
					(P = i.memoizedState),
					x || Y !== P || Ii
						? (typeof te == "function" && (Zc(i, r, te, s), (P = i.memoizedState)),
							(M = Ii || Cv(i, r, M, s, Y, P, y))
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
							(d.context = y),
							(s = M))
						: (typeof d.componentDidMount == "function" && (i.flags |= 4194308), (s = !1)));
			} else {
				((d = i.stateNode),
					wc(t, i),
					(y = i.memoizedProps),
					(J = Ta(r, y)),
					(d.props = J),
					(te = i.pendingProps),
					(Y = d.context),
					(P = r.contextType),
					(M = nr),
					typeof P == "object" && P !== null && (M = It(P)),
					(x = r.getDerivedStateFromProps),
					(P = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== te || Y !== M) && Tv(i, d, s, M)),
					(Ii = !1),
					(Y = i.memoizedState),
					(d.state = Y),
					gu(i, s, d, c),
					vu());
				var F = i.memoizedState;
				y !== te || Y !== F || Ii || (t !== null && t.dependencies !== null && $s(t.dependencies))
					? (typeof x == "function" && (Zc(i, r, x, s), (F = i.memoizedState)),
						(J = Ii || Cv(i, r, J, s, Y, F, M) || (t !== null && t.dependencies !== null && $s(t.dependencies)))
							? (P ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, F, M),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, F, M)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === t.memoizedProps && Y === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === t.memoizedProps && Y === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = s),
								(i.memoizedState = F)),
						(d.props = s),
						(d.state = F),
						(d.context = M),
						(s = J))
					: (typeof d.componentDidUpdate != "function" ||
							(y === t.memoizedProps && Y === t.memoizedState) ||
							(i.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === t.memoizedProps && Y === t.memoizedState) ||
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
						t !== null && s ? ((i.child = _a(i, t.child, null, c)), (i.child = _a(i, null, r, c))) : Ut(t, i, r, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = li(t, i, c)),
				t
			);
		}
		function Uv(t, i, r, s) {
			return (ga(), (i.flags |= 256), Ut(t, i, r, s), i.child);
		}
		var Kc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function Gc(t) {
			return { baseLanes: t, cachePool: Nm() };
		}
		function Xc(t, i, r) {
			return ((t = t !== null ? t.childLanes & ~r : 0), i && (t |= yn), t);
		}
		function Lv(t, i, r) {
			var s = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				y;
			if (
				((y = d) || (y = t !== null && t.memoizedState === null ? !1 : (dt.current & 2) !== 0),
				y && ((c = !0), (i.flags &= -129)),
				(y = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if (Ie) {
					if (
						(c ? Ui(i) : Li(i),
						(t = We)
							? ((t = Fg(t, Tn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ki !== null ? { id: Bn, overflow: Vn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(r = wm(t)),
									(r.return = i),
									(i.child = r),
									(qt = i),
									(We = null)))
							: (t = null),
						t === null)
					)
						throw ji(i);
					return (kf(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var x = s.children;
				return (
					(s = s.fallback),
					c
						? (Li(i),
							(c = i.mode),
							(x = ul({ mode: "hidden", children: x }, c)),
							(s = va(s, c, r, null)),
							(x.return = i),
							(s.return = i),
							(x.sibling = s),
							(i.child = x),
							(s = i.child),
							(s.memoizedState = Gc(r)),
							(s.childLanes = Xc(t, y, r)),
							(i.memoizedState = Kc),
							wu(null, s))
						: (Ui(i), Jc(i, x))
				);
			}
			var M = t.memoizedState;
			if (M !== null && ((x = M.dehydrated), x !== null)) {
				if (d)
					i.flags & 256
						? (Ui(i), (i.flags &= -257), (i = Wc(t, i, r)))
						: i.memoizedState !== null
							? (Li(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (Li(i),
								(x = s.fallback),
								(c = i.mode),
								(s = ul({ mode: "visible", children: s.children }, c)),
								(x = va(x, c, r, null)),
								(x.flags |= 2),
								(s.return = i),
								(x.return = i),
								(s.sibling = x),
								(i.child = s),
								_a(i, t.child, null, r),
								(s = i.child),
								(s.memoizedState = Gc(r)),
								(s.childLanes = Xc(t, y, r)),
								(i.memoizedState = Kc),
								(i = wu(null, s)));
				else if ((Ui(i), kf(x))) {
					if (((y = x.nextSibling && x.nextSibling.dataset), y)) var P = y.dgst;
					((y = P),
						(s = Error(l(419))),
						(s.stack = ""),
						(s.digest = y),
						ou({ value: s, source: null, stack: null }),
						(i = Wc(t, i, r)));
				} else if ((pt || ur(t, i, r, !1), (y = (r & t.childLanes) !== 0), pt || y)) {
					if (((y = Xe), y !== null && ((s = Ah(y, r)), s !== 0 && s !== M.retryLane)))
						throw ((M.retryLane = s), ma(t, s), nn(y, t, s), Yc);
					(zf(x) || vl(), (i = Wc(t, i, r)));
				} else
					zf(x)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = M.treeContext),
							(We = On(x.nextSibling)),
							(qt = i),
							(Ie = !0),
							(Di = null),
							(Tn = !1),
							t !== null && Em(i, t),
							(i = Jc(i, s.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? (Li(i),
					(x = s.fallback),
					(c = i.mode),
					(M = t.child),
					(P = M.sibling),
					(s = ni(M, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = M.subtreeFlags & 65011712),
					P !== null ? (x = ni(P, x)) : ((x = va(x, c, r, null)), (x.flags |= 2)),
					(x.return = i),
					(s.return = i),
					(s.sibling = x),
					(i.child = s),
					wu(null, s),
					(s = i.child),
					(x = t.child.memoizedState),
					x === null
						? (x = Gc(r))
						: ((c = x.cachePool),
							c !== null ? ((M = yt._currentValue), (c = c.parent !== M ? { parent: M, pool: M } : c)) : (c = Nm()),
							(x = { baseLanes: x.baseLanes | r, cachePool: c })),
					(s.memoizedState = x),
					(s.childLanes = Xc(t, y, r)),
					(i.memoizedState = Kc),
					wu(t.child, s))
				: (Ui(i),
					(r = t.child),
					(t = r.sibling),
					(r = ni(r, { mode: "visible", children: s.children })),
					(r.return = i),
					(r.sibling = null),
					t !== null && ((y = i.deletions), y === null ? ((i.deletions = [t]), (i.flags |= 16)) : y.push(t)),
					(i.child = r),
					(i.memoizedState = null),
					r);
		}
		function Jc(t, i) {
			return ((i = ul({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function ul(t, i) {
			return ((t = hn(22, t, null, i)), (t.lanes = 0), t);
		}
		function Wc(t, i, r) {
			return (
				_a(i, t.child, null, r),
				(t = Jc(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function $v(t, i, r) {
			t.lanes |= i;
			var s = t.alternate;
			(s !== null && (s.lanes |= i), mc(t.return, i, r));
		}
		function ef(t, i, r, s, c, d) {
			var y = t.memoizedState;
			y === null
				? (t.memoizedState = {
						isBackwards: i,
						rendering: null,
						renderingStartTime: 0,
						last: s,
						tail: r,
						tailMode: c,
						treeForkCount: d,
					})
				: ((y.isBackwards = i),
					(y.rendering = null),
					(y.renderingStartTime = 0),
					(y.last = s),
					(y.tail = r),
					(y.tailMode = c),
					(y.treeForkCount = d));
		}
		function Bv(t, i, r) {
			var s = i.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var y = dt.current,
				x = (y & 2) !== 0;
			if (
				(x ? ((y = (y & 1) | 2), (i.flags |= 128)) : (y &= 1),
				re(dt, y),
				Ut(t, i, s, r),
				(s = Ie ? lu : 0),
				!x && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && $v(t, r, i);
					else if (t.tag === 19) $v(t, r, i);
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
						ef(i, !1, c, r, d, s));
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
					ef(i, !0, r, null, d, s);
					break;
				case "together":
					ef(i, !1, null, null, void 0, s);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function li(t, i, r) {
			if ((t !== null && (i.dependencies = t.dependencies), (Vi |= i.lanes), (r & i.childLanes) === 0))
				if (t !== null) {
					if ((ur(t, i, r, !1), (r & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(l(153));
			if (i.child !== null) {
				for (t = i.child, r = ni(t, t.pendingProps), i.child = r, r.return = i; t.sibling !== null; )
					((t = t.sibling), (r = r.sibling = ni(t, t.pendingProps)), (r.return = i));
				r.sibling = null;
			}
			return i.child;
		}
		function tf(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && $s(t)));
		}
		function Gw(t, i, r) {
			switch (i.tag) {
				case 3:
					(Ze(i, i.stateNode.containerInfo), qi(i, yt, t.memoizedState.cache), ga());
					break;
				case 27:
				case 5:
					At(i);
					break;
				case 4:
					Ze(i, i.stateNode.containerInfo);
					break;
				case 10:
					qi(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), Tc(i), null);
					break;
				case 13:
					var s = i.memoizedState;
					if (s !== null)
						return s.dehydrated !== null
							? (Ui(i), (i.flags |= 128), null)
							: (r & i.child.childLanes) !== 0
								? Lv(t, i, r)
								: (Ui(i), (t = li(t, i, r)), t !== null ? t.sibling : null);
					Ui(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((s = (r & i.childLanes) !== 0), s || (ur(t, i, r, !1), (s = (r & i.childLanes) !== 0)), c)) {
						if (s) return Bv(t, i, r);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						re(dt, dt.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), kv(t, i, r, i.pendingProps));
				case 24:
					qi(i, yt, t.memoizedState.cache);
			}
			return li(t, i, r);
		}
		function Vv(t, i, r) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) pt = !0;
				else {
					if (!tf(t, r) && (i.flags & 128) === 0) return ((pt = !1), Gw(t, i, r));
					pt = (t.flags & 131072) !== 0;
				}
			else ((pt = !1), Ie && (i.flags & 1048576) !== 0 && xm(i, lu, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var s = i.pendingProps;
						if (((t = Sa(i.elementType)), (i.type = t), typeof t == "function"))
							uc(t)
								? ((s = Ta(t, s)), (i.tag = 1), (i = Iv(null, i, t, s, r)))
								: ((i.tag = 0), (i = Fc(null, i, t, s, r)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === I) {
									((i.tag = 11), (i = Nv(null, i, t, s, r)));
									break e;
								} else if (c === k) {
									((i.tag = 14), (i = Mv(null, i, t, s, r)));
									break e;
								}
							}
							throw ((i = ae(t) || t), Error(l(306, i, "")));
						}
					}
					return i;
				case 0:
					return Fc(t, i, i.type, i.pendingProps, r);
				case 1:
					return ((s = i.type), (c = Ta(s, i.pendingProps)), Iv(t, i, s, c, r));
				case 3:
					e: {
						if ((Ze(i, i.stateNode.containerInfo), t === null)) throw Error(l(387));
						s = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), wc(t, i), gu(i, s, null, r));
						var y = i.memoizedState;
						if (
							((s = y.cache), qi(i, yt, s), s !== d.cache && vc(i, [yt], r, !0), vu(), (s = y.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: y.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = Uv(t, i, s, r);
								break e;
							} else if (s !== c) {
								((c = xn(Error(l(424)), i)), ou(c), (i = Uv(t, i, s, r)));
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
									We = On(t.firstChild), qt = i, Ie = !0, Di = null, Tn = !0, r = qm(i, null, s, r), i.child = r;
									r;
								)
									((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
							}
						else {
							if ((ga(), s === c)) {
								i = li(t, i, r);
								break e;
							}
							Ut(t, i, s, r);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						rl(t, i),
						t === null
							? (r = ey(i.type, null, i.pendingProps, null))
								? (i.memoizedState = r)
								: Ie ||
									((r = i.type),
									(t = i.pendingProps),
									(s = _l(ve.current).createElement(r)),
									(s[jt] = i),
									(s[Gt] = t),
									Lt(s, r, t),
									Nt(s),
									(i.stateNode = s))
							: (i.memoizedState = ey(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						At(i),
						t === null &&
							Ie &&
							((s = i.stateNode = Xg(i.type, i.pendingProps, ve.current)),
							(qt = i),
							(Tn = !0),
							(c = We),
							Yi(i.type) ? ((Df = c), (We = On(s.firstChild))) : (We = c)),
						Ut(t, i, i.pendingProps.children, r),
						rl(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							Ie &&
							((c = s = We) &&
								((s = E_(s, i.type, i.pendingProps, Tn)),
								s !== null ? ((i.stateNode = s), (qt = i), (We = On(s.firstChild)), (Tn = !1), (c = !0)) : (c = !1)),
							c || ji(i)),
						At(i),
						(c = i.type),
						(d = i.pendingProps),
						(y = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Of(c, d) ? (s = null) : y !== null && Of(c, y) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Rc(t, i, Uw, null, null, r)), (qu._currentValue = c)),
						rl(t, i),
						Ut(t, i, s, r),
						i.child
					);
				case 6:
					return (
						t === null &&
							Ie &&
							((t = r = We) &&
								((r = C_(r, i.pendingProps, Tn)),
								r !== null ? ((i.stateNode = r), (qt = i), (We = null), (t = !0)) : (t = !1)),
							t || ji(i)),
						null
					);
				case 13:
					return Lv(t, i, r);
				case 4:
					return (
						Ze(i, i.stateNode.containerInfo),
						(s = i.pendingProps),
						t === null ? (i.child = _a(i, null, s, r)) : Ut(t, i, s, r),
						i.child
					);
				case 11:
					return Nv(t, i, i.type, i.pendingProps, r);
				case 7:
					return (Ut(t, i, i.pendingProps, r), i.child);
				case 8:
					return (Ut(t, i, i.pendingProps.children, r), i.child);
				case 12:
					return (Ut(t, i, i.pendingProps.children, r), i.child);
				case 10:
					return ((s = i.pendingProps), qi(i, i.type, s.value), Ut(t, i, s.children, r), i.child);
				case 9:
					return (
						(c = i.type._context),
						(s = i.pendingProps.children),
						ba(i),
						(c = It(c)),
						(s = s(c)),
						(i.flags |= 1),
						Ut(t, i, s, r),
						i.child
					);
				case 14:
					return Mv(t, i, i.type, i.pendingProps, r);
				case 15:
					return zv(t, i, i.type, i.pendingProps, r);
				case 19:
					return Bv(t, i, r);
				case 31:
					return Kw(t, i, r);
				case 22:
					return kv(t, i, r, i.pendingProps);
				case 24:
					return (
						ba(i),
						(s = It(yt)),
						t === null
							? ((c = bc()),
								c === null &&
									((c = Xe),
									(d = gc()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= r),
									(c = d)),
								(i.memoizedState = { parent: s, cache: c }),
								Sc(i),
								qi(i, yt, c))
							: ((t.lanes & r) !== 0 && (wc(t, i), gu(i, null, null, r), vu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										qi(i, yt, s))
									: ((s = d.cache), qi(i, yt, s), s !== c.cache && vc(i, [yt], r, !0))),
						Ut(t, i, i.pendingProps.children, r),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(l(156, i.tag));
		}
		function oi(t) {
			t.flags |= 4;
		}
		function nf(t, i, r, s, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (vg()) t.flags |= 8192;
					else throw ((wa = Zs), pc);
			} else t.flags &= -16777217;
		}
		function Hv(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !ry(i)))
				if (vg()) t.flags |= 8192;
				else throw ((wa = Zs), pc);
		}
		function sl(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Eh() : 536870912), (t.lanes |= i), (br |= i)));
		}
		function _u(t, i) {
			if (!Ie)
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
		function et(t) {
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
		function Xw(t, i, r) {
			var s = i.pendingProps;
			switch ((cc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (et(i), null);
				case 1:
					return (et(i), null);
				case 3:
					return (
						(r = i.stateNode),
						(s = null),
						t !== null && (s = t.memoizedState.cache),
						i.memoizedState.cache !== s && (i.flags |= 2048),
						ri(yt),
						qe(),
						r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
						(t === null || t.child === null) &&
							(rr(i)
								? oi(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), dc())),
						et(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (oi(i), d !== null ? (et(i), Hv(i, d)) : (et(i), nf(i, c, null, s, r)))
							: d
								? d !== t.memoizedState
									? (oi(i), et(i), Hv(i, d))
									: (et(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && oi(i), et(i), nf(i, c, t, s, r)),
						null
					);
				case 27:
					if ((Pt(i), (r = ve.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== s && oi(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (et(i), null);
						}
						((t = le.current), rr(i) ? Cm(i, t) : ((t = Xg(c, s, r)), (i.stateNode = t), oi(i)));
					}
					return (et(i), null);
				case 5:
					if ((Pt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== s && oi(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (et(i), null);
						}
						if (((d = le.current), rr(i))) Cm(i, d);
						else {
							var y = _l(ve.current);
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
							((d[jt] = i), (d[Gt] = s));
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
							e: switch ((Lt(d, c, s), c)) {
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
							s && oi(i);
						}
					}
					return (et(i), nf(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, r), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== s && oi(i);
					else {
						if (typeof s != "string" && i.stateNode === null) throw Error(l(166));
						if (((t = ve.current), rr(i))) {
							if (((t = i.stateNode), (r = i.memoizedProps), (s = null), (c = qt), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[jt] = i),
								(t = !!(t.nodeValue === r || (s !== null && s.suppressHydrationWarning === !0) || $g(t.nodeValue, r))),
								t || ji(i, !0));
						} else ((t = _l(t).createTextNode(s)), (t[jt] = i), (i.stateNode = t));
					}
					return (et(i), null);
				case 31:
					if (((r = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = rr(i)), r !== null)) {
							if (t === null) {
								if (!s) throw Error(l(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(557));
								t[jt] = i;
							} else (ga(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(et(i), (t = !1));
						} else
							((r = dc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), (t = !0));
						if (!t) return i.flags & 256 ? (vn(i), i) : (vn(i), null);
						if ((i.flags & 128) !== 0) throw Error(l(558));
					}
					return (et(i), null);
				case 13:
					if (
						((s = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = rr(i)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(l(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(l(317));
								c[jt] = i;
							} else (ga(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(et(i), (c = !1));
						} else
							((c = dc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (vn(i), i) : (vn(i), null);
					}
					return (
						vn(i),
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
								et(i),
								null)
					);
				case 4:
					return (qe(), t === null && qg(i.stateNode.containerInfo), et(i), null);
				case 10:
					return (ri(i.type), et(i), null);
				case 19:
					if ((X(dt), (s = i.memoizedState), s === null)) return (et(i), null);
					if (((c = (i.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) _u(s, !1);
						else {
							if (ft !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = Fs(t)), d !== null)) {
										for (
											i.flags |= 128,
												_u(s, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												sl(i, t),
												i.subtreeFlags = 0,
												t = r,
												r = i.child;
											r !== null;
										)
											(Sm(r, t), (r = r.sibling));
										return (re(dt, (dt.current & 1) | 2), Ie && ii(i, s.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							s.tail !== null && Oe() > dl && ((i.flags |= 128), (c = !0), _u(s, !1), (i.lanes = 4194304));
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
									_u(s, !0),
									s.tail === null && s.tailMode === "hidden" && !d.alternate && !Ie)
								)
									return (et(i), null);
							} else
								2 * Oe() - s.renderingStartTime > dl &&
									r !== 536870912 &&
									((i.flags |= 128), (c = !0), _u(s, !1), (i.lanes = 4194304));
						s.isBackwards
							? ((d.sibling = i.child), (i.child = d))
							: ((t = s.last), t !== null ? (t.sibling = d) : (i.child = d), (s.last = d));
					}
					return s.tail !== null
						? ((t = s.tail),
							(s.rendering = t),
							(s.tail = t.sibling),
							(s.renderingStartTime = Oe()),
							(t.sibling = null),
							(r = dt.current),
							re(dt, c ? (r & 1) | 2 : r & 1),
							Ie && ii(i, s.treeForkCount),
							t)
						: (et(i), null);
				case 22:
				case 23:
					return (
						vn(i),
						Cc(),
						(s = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== s && (i.flags |= 8192) : s && (i.flags |= 8192),
						s
							? (r & 536870912) !== 0 && (i.flags & 128) === 0 && (et(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: et(i),
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
						t !== null && X(pa),
						null
					);
				case 24:
					return (
						(r = null),
						t !== null && (r = t.memoizedState.cache),
						i.memoizedState.cache !== r && (i.flags |= 2048),
						ri(yt),
						et(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(l(156, i.tag));
		}
		function Jw(t, i) {
			switch ((cc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						ri(yt),
						qe(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (Pt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((vn(i), i.alternate === null)) throw Error(l(340));
						ga();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((vn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(l(340));
						ga();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (X(dt), null);
				case 4:
					return (qe(), null);
				case 10:
					return (ri(i.type), null);
				case 22:
				case 23:
					return (
						vn(i),
						Cc(),
						t !== null && X(pa),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (ri(yt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Zv(t, i) {
			switch ((cc(i), i.tag)) {
				case 3:
					(ri(yt), qe());
					break;
				case 26:
				case 27:
				case 5:
					Pt(i);
					break;
				case 4:
					qe();
					break;
				case 31:
					i.memoizedState !== null && vn(i);
					break;
				case 13:
					vn(i);
					break;
				case 19:
					X(dt);
					break;
				case 10:
					ri(i.type);
					break;
				case 22:
				case 23:
					(vn(i), Cc(), t !== null && X(pa));
					break;
				case 24:
					ri(yt);
			}
		}
		function xu(t, i) {
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
								y = r.inst;
							((s = d()), (y.destroy = s));
						}
						r = r.next;
					} while (r !== c);
				}
			} catch (x) {
				Pe(i, i.return, x);
			}
		}
		function $i(t, i, r) {
			try {
				var s = i.updateQueue,
					c = s !== null ? s.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					s = d;
					do {
						if ((s.tag & t) === t) {
							var y = s.inst,
								x = y.destroy;
							if (x !== void 0) {
								((y.destroy = void 0), (c = i));
								var M = r,
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
		function Qv(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var r = t.stateNode;
				try {
					Um(i, r);
				} catch (s) {
					Pe(t, t.return, s);
				}
			}
		}
		function Pv(t, i, r) {
			((r.props = Ta(t.type, t.memoizedProps)), (r.state = t.memoizedState));
			try {
				r.componentWillUnmount();
			} catch (s) {
				Pe(t, i, s);
			}
		}
		function Eu(t, i) {
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
		function Hn(t, i) {
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
		function Yv(t) {
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
		function af(t, i, r) {
			try {
				var s = t.stateNode;
				(b_(s, t.type, r, i), (s[Gt] = i));
			} catch (c) {
				Pe(t, t.return, c);
			}
		}
		function Fv(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Yi(t.type)) || t.tag === 4;
		}
		function rf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || Fv(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && Yi(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function uf(t, i, r) {
			var s = t.tag;
			if (s === 5 || s === 6)
				((t = t.stateNode),
					i
						? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(t, i)
						: ((i = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r),
							i.appendChild(t),
							(r = r._reactRootContainer),
							r != null || i.onclick !== null || (i.onclick = ei)));
			else if (s !== 4 && (s === 27 && Yi(t.type) && ((r = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (uf(t, i, r), t = t.sibling; t !== null; ) (uf(t, i, r), (t = t.sibling));
		}
		function ll(t, i, r) {
			var s = t.tag;
			if (s === 5 || s === 6) ((t = t.stateNode), i ? r.insertBefore(t, i) : r.appendChild(t));
			else if (s !== 4 && (s === 27 && Yi(t.type) && (r = t.stateNode), (t = t.child), t !== null))
				for (ll(t, i, r), t = t.sibling; t !== null; ) (ll(t, i, r), (t = t.sibling));
		}
		function Kv(t) {
			var i = t.stateNode,
				r = t.memoizedProps;
			try {
				for (var s = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(Lt(i, s, r), (i[jt] = t), (i[Gt] = r));
			} catch (d) {
				Pe(t, t.return, d);
			}
		}
		var ci = !1,
			St = !1,
			sf = !1,
			Gv = typeof WeakSet == "function" ? WeakSet : Set,
			Mt = null;
		function Ww(t, i) {
			if (((t = t.containerInfo), (Af = Ol), (t = fm(t)), Wo(t))) {
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
							var y = 0,
								x = -1,
								M = -1,
								P = 0,
								J = 0,
								te = t,
								Y = null;
							t: for (;;) {
								for (
									var F;
									te !== r || (c !== 0 && te.nodeType !== 3) || (x = y + c),
										te !== d || (s !== 0 && te.nodeType !== 3) || (M = y + s),
										te.nodeType === 3 && (y += te.nodeValue.length),
										(F = te.firstChild) !== null;
								)
									((Y = te), (te = F));
								for (;;) {
									if (te === t) break t;
									if ((Y === r && ++P === c && (x = y), Y === d && ++J === s && (M = y), (F = te.nextSibling) !== null))
										break;
									((te = Y), (Y = te.parentNode));
								}
								te = F;
							}
							r = x === -1 || M === -1 ? null : { start: x, end: M };
						} else r = null;
					}
				r = r || { start: 0, end: 0 };
			} else r = null;
			for (Rf = { focusedElem: t, selectionRange: r }, Ol = !1, Mt = i; Mt !== null; )
				if (((i = Mt), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = i), (Mt = t));
				else
					for (; Mt !== null; ) {
						switch (((i = Mt), (d = i.alternate), (t = i.flags), i.tag)) {
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
										var fe = Ta(r.type, c);
										((t = s.getSnapshotBeforeUpdate(fe, d)), (s.__reactInternalSnapshotBeforeUpdate = t));
									} catch (we) {
										Pe(r, r.return, we);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (r = t.nodeType), r === 9)) Mf(t);
									else if (r === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Mf(t);
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
							((t.return = i.return), (Mt = t));
							break;
						}
						Mt = i.return;
					}
		}
		function Xv(t, i, r) {
			var s = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(di(t, r), s & 4 && xu(5, r));
					break;
				case 1:
					if ((di(t, r), s & 4))
						if (((t = r.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (y) {
								Pe(r, r.return, y);
							}
						else {
							var c = Ta(r.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								Pe(r, r.return, y);
							}
						}
					(s & 64 && Qv(r), s & 512 && Eu(r, r.return));
					break;
				case 3:
					if ((di(t, r), s & 64 && ((t = r.updateQueue), t !== null))) {
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
							Um(t, i);
						} catch (y) {
							Pe(r, r.return, y);
						}
					}
					break;
				case 27:
					i === null && s & 4 && Kv(r);
				case 26:
				case 5:
					(di(t, r), i === null && s & 4 && Yv(r), s & 512 && Eu(r, r.return));
					break;
				case 12:
					di(t, r);
					break;
				case 31:
					(di(t, r), s & 4 && eg(t, r));
					break;
				case 13:
					(di(t, r),
						s & 4 && tg(t, r),
						s & 64 &&
							((t = r.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((r = l_.bind(null, r)), T_(t, r)))));
					break;
				case 22:
					if (((s = r.memoizedState !== null || ci), !s)) {
						((i = (i !== null && i.memoizedState !== null) || St), (c = ci));
						var d = St;
						((ci = s), (St = i) && !d ? hi(t, r, (r.subtreeFlags & 8772) !== 0) : di(t, r), (ci = c), (St = d));
					}
					break;
				case 30:
					break;
				default:
					di(t, r);
			}
		}
		function Jv(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), Jv(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && qo(i)),
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
			Jt = !1;
		function fi(t, i, r) {
			for (r = r.child; r !== null; ) (Wv(t, i, r), (r = r.sibling));
		}
		function Wv(t, i, r) {
			if (cn && typeof cn.onCommitFiberUnmount == "function")
				try {
					cn.onCommitFiberUnmount(Fr, r);
				} catch {}
			switch (r.tag) {
				case 26:
					(St || Hn(r, i),
						fi(t, i, r),
						r.memoizedState
							? r.memoizedState.count--
							: r.stateNode && ((r = r.stateNode), r.parentNode.removeChild(r)));
					break;
				case 27:
					St || Hn(r, i);
					var s = at,
						c = Jt;
					(Yi(r.type) && ((at = r.stateNode), (Jt = !1)), fi(t, i, r), ku(r.stateNode), (at = s), (Jt = c));
					break;
				case 5:
					St || Hn(r, i);
				case 6:
					if (((s = at), (c = Jt), (at = null), fi(t, i, r), (at = s), (Jt = c), at !== null))
						if (Jt)
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
						(Jt
							? ((t = at),
								Pg(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, r.stateNode),
								Tr(t))
							: Pg(at, r.stateNode));
					break;
				case 4:
					((s = at), (c = Jt), (at = r.stateNode.containerInfo), (Jt = !0), fi(t, i, r), (at = s), (Jt = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					($i(2, r, i), St || $i(4, r, i), fi(t, i, r));
					break;
				case 1:
					(St || (Hn(r, i), (s = r.stateNode), typeof s.componentWillUnmount == "function" && Pv(r, i, s)),
						fi(t, i, r));
					break;
				case 21:
					fi(t, i, r);
					break;
				case 22:
					((St = (s = St) || r.memoizedState !== null), fi(t, i, r), (St = s));
					break;
				default:
					fi(t, i, r);
			}
		}
		function eg(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Tr(t);
				} catch (r) {
					Pe(i, i.return, r);
				}
			}
		}
		function tg(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Tr(t);
				} catch (r) {
					Pe(i, i.return, r);
				}
		}
		function e_(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new Gv()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new Gv()), i);
				default:
					throw Error(l(435, t.tag));
			}
		}
		function ol(t, i) {
			var r = e_(t);
			i.forEach(function (s) {
				if (!r.has(s)) {
					r.add(s);
					var c = o_.bind(null, t, s);
					s.then(c, c);
				}
			});
		}
		function Wt(t, i) {
			var r = i.deletions;
			if (r !== null)
				for (var s = 0; s < r.length; s++) {
					var c = r[s],
						d = t,
						y = i,
						x = y;
					e: for (; x !== null; ) {
						switch (x.tag) {
							case 27:
								if (Yi(x.type)) {
									((at = x.stateNode), (Jt = !1));
									break e;
								}
								break;
							case 5:
								((at = x.stateNode), (Jt = !1));
								break e;
							case 3:
							case 4:
								((at = x.stateNode.containerInfo), (Jt = !0));
								break e;
						}
						x = x.return;
					}
					if (at === null) throw Error(l(160));
					(Wv(d, y, c), (at = null), (Jt = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (ng(i, t), (i = i.sibling));
		}
		var jn = null;
		function ng(t, i) {
			var r = t.alternate,
				s = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(Wt(i, t), en(t), s & 4 && ($i(3, t, t.return), xu(3, t), $i(5, t, t.return)));
					break;
				case 1:
					(Wt(i, t),
						en(t),
						s & 512 && (St || r === null || Hn(r, r.return)),
						s & 64 &&
							ci &&
							((t = t.updateQueue),
							t !== null &&
								((s = t.callbacks),
								s !== null &&
									((r = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = r === null ? s : r.concat(s))))));
					break;
				case 26:
					var c = jn;
					if ((Wt(i, t), en(t), s & 512 && (St || r === null || Hn(r, r.return)), s & 4)) {
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
														d[Xr] ||
														d[jt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(s)), c.head.insertBefore(d, c.querySelector("head > title"))),
													Lt(d, s, r),
													(d[jt] = t),
													Nt(d),
													(s = d));
												break e;
											case "link":
												var y = iy("link", "href", c).get(s + (r.href || ""));
												if (y) {
													for (var x = 0; x < y.length; x++)
														if (
															((d = y[x]),
															d.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) &&
																d.getAttribute("rel") === (r.rel == null ? null : r.rel) &&
																d.getAttribute("title") === (r.title == null ? null : r.title) &&
																d.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin))
														) {
															y.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(s)), Lt(d, s, r), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = iy("meta", "content", c).get(s + (r.content || "")))) {
													for (x = 0; x < y.length; x++)
														if (
															((d = y[x]),
															d.getAttribute("content") === (r.content == null ? null : "" + r.content) &&
																d.getAttribute("name") === (r.name == null ? null : r.name) &&
																d.getAttribute("property") === (r.property == null ? null : r.property) &&
																d.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) &&
																d.getAttribute("charset") === (r.charSet == null ? null : r.charSet))
														) {
															y.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(s)), Lt(d, s, r), c.head.appendChild(d));
												break;
											default:
												throw Error(l(468, s));
										}
										((d[jt] = t), Nt(d), (s = d));
									}
									t.stateNode = s;
								} else ay(c, t.type, t.stateNode);
							else t.stateNode = ny(c, s, t.memoizedProps);
						else
							d !== s
								? (d === null ? r.stateNode !== null && ((r = r.stateNode), r.parentNode.removeChild(r)) : d.count--,
									s === null ? ay(c, t.type, t.stateNode) : ny(c, s, t.memoizedProps))
								: s === null && t.stateNode !== null && af(t, t.memoizedProps, r.memoizedProps);
					}
					break;
				case 27:
					(Wt(i, t),
						en(t),
						s & 512 && (St || r === null || Hn(r, r.return)),
						r !== null && s & 4 && af(t, t.memoizedProps, r.memoizedProps));
					break;
				case 5:
					if ((Wt(i, t), en(t), s & 512 && (St || r === null || Hn(r, r.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							Ka(c, "");
						} catch (fe) {
							Pe(t, t.return, fe);
						}
					}
					(s & 4 && t.stateNode != null && ((c = t.memoizedProps), af(t, c, r !== null ? r.memoizedProps : c)),
						s & 1024 && (sf = !0));
					break;
				case 6:
					if ((Wt(i, t), en(t), s & 4)) {
						if (t.stateNode === null) throw Error(l(162));
						((s = t.memoizedProps), (r = t.stateNode));
						try {
							r.nodeValue = s;
						} catch (fe) {
							Pe(t, t.return, fe);
						}
					}
					break;
				case 3:
					if (
						((Cl = null),
						(c = jn),
						(jn = xl(i.containerInfo)),
						Wt(i, t),
						(jn = c),
						en(t),
						s & 4 && r !== null && r.memoizedState.isDehydrated)
					)
						try {
							Tr(i.containerInfo);
						} catch (fe) {
							Pe(t, t.return, fe);
						}
					sf && ((sf = !1), ig(t));
					break;
				case 4:
					((s = jn), (jn = xl(t.stateNode.containerInfo)), Wt(i, t), en(t), (jn = s));
					break;
				case 12:
					(Wt(i, t), en(t));
					break;
				case 31:
					(Wt(i, t), en(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), ol(t, s))));
					break;
				case 13:
					(Wt(i, t),
						en(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (r !== null && r.memoizedState !== null) &&
							(fl = Oe()),
						s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), ol(t, s))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var M = r !== null && r.memoizedState !== null,
						P = ci,
						J = St;
					if (((ci = P || c), (St = J || M), Wt(i, t), (St = J), (ci = P), en(t), s & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (r === null || M || ci || St || Aa(t)),
								r = null,
								i = t;
							;
						) {
							if (i.tag === 5 || i.tag === 26) {
								if (r === null) {
									M = r = i;
									try {
										if (((d = M.stateNode), c))
											((y = d.style),
												typeof y.setProperty == "function"
													? y.setProperty("display", "none", "important")
													: (y.display = "none"));
										else {
											x = M.stateNode;
											var te = M.memoizedProps.style,
												Y = te != null && te.hasOwnProperty("display") ? te.display : null;
											x.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
										}
									} catch (fe) {
										Pe(M, M.return, fe);
									}
								}
							} else if (i.tag === 6) {
								if (r === null) {
									M = i;
									try {
										M.stateNode.nodeValue = c ? "" : M.memoizedProps;
									} catch (fe) {
										Pe(M, M.return, fe);
									}
								}
							} else if (i.tag === 18) {
								if (r === null) {
									M = i;
									try {
										var F = M.stateNode;
										c ? Yg(F, !0) : Yg(M.stateNode, !1);
									} catch (fe) {
										Pe(M, M.return, fe);
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
					(Wt(i, t), en(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), ol(t, s))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(Wt(i, t), en(t));
			}
		}
		function en(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var r, s = t.return; s !== null; ) {
						if (Fv(s)) {
							r = s;
							break;
						}
						s = s.return;
					}
					if (r == null) throw Error(l(160));
					switch (r.tag) {
						case 27:
							var c = r.stateNode;
							ll(t, rf(t), c);
							break;
						case 5:
							var d = r.stateNode;
							(r.flags & 32 && (Ka(d, ""), (r.flags &= -33)), ll(t, rf(t), d));
							break;
						case 3:
						case 4:
							var y = r.stateNode.containerInfo;
							uf(t, rf(t), y);
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
		function ig(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(ig(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function di(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (Xv(t, i.alternate, i), (i = i.sibling));
		}
		function Aa(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						($i(4, i, i.return), Aa(i));
						break;
					case 1:
						Hn(i, i.return);
						var r = i.stateNode;
						(typeof r.componentWillUnmount == "function" && Pv(i, i.return, r), Aa(i));
						break;
					case 27:
						ku(i.stateNode);
					case 26:
					case 5:
						(Hn(i, i.return), Aa(i));
						break;
					case 22:
						i.memoizedState === null && Aa(i);
						break;
					case 30:
						Aa(i);
						break;
					default:
						Aa(i);
				}
				t = t.sibling;
			}
		}
		function hi(t, i, r) {
			for (r = r && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var s = i.alternate,
					c = t,
					d = i,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(hi(c, d, r), xu(4, d));
						break;
					case 1:
						if ((hi(c, d, r), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (P) {
								Pe(s, s.return, P);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var x = s.stateNode;
							try {
								var M = c.shared.hiddenCallbacks;
								if (M !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < M.length; c++) Im(M[c], x);
							} catch (P) {
								Pe(s, s.return, P);
							}
						}
						(r && y & 64 && Qv(d), Eu(d, d.return));
						break;
					case 27:
						Kv(d);
					case 26:
					case 5:
						(hi(c, d, r), r && s === null && y & 4 && Yv(d), Eu(d, d.return));
						break;
					case 12:
						hi(c, d, r);
						break;
					case 31:
						(hi(c, d, r), r && y & 4 && eg(c, d));
						break;
					case 13:
						(hi(c, d, r), r && y & 4 && tg(c, d));
						break;
					case 22:
						(d.memoizedState === null && hi(c, d, r), Eu(d, d.return));
						break;
					case 30:
						break;
					default:
						hi(c, d, r);
				}
				i = i.sibling;
			}
		}
		function lf(t, i) {
			var r = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(r = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== r && (t != null && t.refCount++, r != null && cu(r)));
		}
		function of(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && cu(t)));
		}
		function qn(t, i, r, s) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (ag(t, i, r, s), (i = i.sibling));
		}
		function ag(t, i, r, s) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(qn(t, i, r, s), c & 2048 && xu(9, i));
					break;
				case 1:
					qn(t, i, r, s);
					break;
				case 3:
					(qn(t, i, r, s),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && cu(t))));
					break;
				case 12:
					if (c & 2048) {
						(qn(t, i, r, s), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								y = d.id,
								x = d.onPostCommit;
							typeof x == "function" && x(y, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (M) {
							Pe(i, i.return, M);
						}
					} else qn(t, i, r, s);
					break;
				case 31:
					qn(t, i, r, s);
					break;
				case 13:
					qn(t, i, r, s);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(y = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? qn(t, i, r, s)
								: Cu(t, i)
							: d._visibility & 2
								? qn(t, i, r, s)
								: ((d._visibility |= 2), vr(t, i, r, s, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && lf(y, i));
					break;
				case 24:
					(qn(t, i, r, s), c & 2048 && of(i.alternate, i));
					break;
				default:
					qn(t, i, r, s);
			}
		}
		function vr(t, i, r, s, c) {
			for (c = c && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
				var d = t,
					y = i,
					x = r,
					M = s,
					P = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(vr(d, y, x, M, c), xu(8, y));
						break;
					case 23:
						break;
					case 22:
						var J = y.stateNode;
						(y.memoizedState !== null
							? J._visibility & 2
								? vr(d, y, x, M, c)
								: Cu(d, y)
							: ((J._visibility |= 2), vr(d, y, x, M, c)),
							c && P & 2048 && lf(y.alternate, y));
						break;
					case 24:
						(vr(d, y, x, M, c), c && P & 2048 && of(y.alternate, y));
						break;
					default:
						vr(d, y, x, M, c);
				}
				i = i.sibling;
			}
		}
		function Cu(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var r = t,
						s = i,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(Cu(r, s), c & 2048 && lf(s.alternate, s));
							break;
						case 24:
							(Cu(r, s), c & 2048 && of(s.alternate, s));
							break;
						default:
							Cu(r, s);
					}
					i = i.sibling;
				}
		}
		var Tu = 8192;
		function gr(t, i, r) {
			if (t.subtreeFlags & Tu) for (t = t.child; t !== null; ) (rg(t, i, r), (t = t.sibling));
		}
		function rg(t, i, r) {
			switch (t.tag) {
				case 26:
					(gr(t, i, r), t.flags & Tu && t.memoizedState !== null && U_(r, jn, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					gr(t, i, r);
					break;
				case 3:
				case 4:
					var s = jn;
					((jn = xl(t.stateNode.containerInfo)), gr(t, i, r), (jn = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = Tu), (Tu = 16777216), gr(t, i, r), (Tu = s)) : gr(t, i, r));
					break;
				default:
					gr(t, i, r);
			}
		}
		function ug(t) {
			var i = t.alternate;
			if (i !== null && ((t = i.child), t !== null)) {
				i.child = null;
				do ((i = t.sibling), (t.sibling = null), (t = i));
				while (t !== null);
			}
		}
		function Au(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var r = 0; r < i.length; r++) {
						var s = i[r];
						((Mt = s), lg(s, t));
					}
				ug(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (sg(t), (t = t.sibling));
		}
		function sg(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Au(t), t.flags & 2048 && $i(9, t, t.return));
					break;
				case 3:
					Au(t);
					break;
				case 12:
					Au(t);
					break;
				case 22:
					var i = t.stateNode;
					t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((i._visibility &= -3), cl(t))
						: Au(t);
					break;
				default:
					Au(t);
			}
		}
		function cl(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var r = 0; r < i.length; r++) {
						var s = i[r];
						((Mt = s), lg(s, t));
					}
				ug(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						($i(8, i, i.return), cl(i));
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
		function lg(t, i) {
			for (; Mt !== null; ) {
				var r = Mt;
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						$i(8, r, i);
						break;
					case 23:
					case 22:
						if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
							var s = r.memoizedState.cachePool.pool;
							s != null && s.refCount++;
						}
						break;
					case 24:
						cu(r.memoizedState.cache);
				}
				if (((s = r.child), s !== null)) ((s.return = r), (Mt = s));
				else
					e: for (r = t; Mt !== null; ) {
						s = Mt;
						var c = s.sibling,
							d = s.return;
						if ((Jv(s), s === r)) {
							Mt = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (Mt = c));
							break e;
						}
						Mt = d;
					}
			}
		}
		var t_ = {
				getCacheForType: function (t) {
					var i = It(yt),
						r = i.data.get(t);
					return (r === void 0 && ((r = t()), i.data.set(t, r)), r);
				},
				cacheSignal: function () {
					return It(yt).controller.signal;
				},
			},
			n_ = typeof WeakMap == "function" ? WeakMap : Map,
			Ve = 0,
			Xe = null,
			Ne = null,
			ke = 0,
			Qe = 0,
			gn = null,
			Bi = !1,
			yr = !1,
			cf = !1,
			mi = 0,
			ft = 0,
			Vi = 0,
			Ra = 0,
			ff = 0,
			yn = 0,
			br = 0,
			Ru = null,
			tn = null,
			df = !1,
			fl = 0,
			og = 0,
			dl = 1 / 0,
			hl = null,
			Hi = null,
			Rt = 0,
			Zi = null,
			pr = null,
			vi = 0,
			hf = 0,
			mf = null,
			cg = null,
			Ou = 0,
			vf = null;
		function Rn() {
			return (Ve & 2) !== 0 && ke !== 0 ? ke & -ke : H.T !== null ? wf() : Oh();
		}
		function fg() {
			if (yn === 0)
				if ((ke & 536870912) === 0 || Ie) {
					var t = Ss;
					((Ss <<= 1), (Ss & 3932160) === 0 && (Ss = 262144), (yn = t));
				} else yn = 536870912;
			return ((t = mn.current), t !== null && (t.flags |= 32), yn);
		}
		function nn(t, i, r) {
			(((t === Xe && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null) && (Sr(t, 0), Qi(t, ke, yn, !1)),
				xs(t, r),
				((Ve & 2) === 0 || t !== Xe) &&
					(t === Xe && ((Ve & 2) === 0 && (Ra |= r), ft === 4 && Qi(t, ke, yn, !1)), gi(t)));
		}
		function dg(t, i, r) {
			if ((Ve & 6) !== 0) throw Error(l(327));
			var s = (!r && (i & 127) === 0 && (i & t.expiredLanes) === 0) || Kr(t, i),
				c = s ? r_(t, i) : yf(t, i, !0),
				d = s;
			do {
				if (c === 0) {
					yr && !s && Qi(t, i, 0, !1);
					break;
				} else {
					if (((r = t.current.alternate), d && !i_(r))) {
						((c = yf(t, i, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = i), t.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = t.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							i = y;
							e: {
								var x = t;
								c = Ru;
								var M = x.current.memoizedState.isDehydrated;
								if ((M && (Sr(x, y).flags |= 256), (y = yf(x, y, !1)), y !== 2)) {
									if (cf && !M) {
										((x.errorRecoveryDisabledLanes |= d), (Ra |= d), (c = 4));
										break e;
									}
									((d = tn), (tn = c), d !== null && (tn === null ? (tn = d) : tn.push.apply(tn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Sr(t, 0), Qi(t, i, 0, !0));
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
								Qi(s, i, yn, !Bi);
								break e;
							case 2:
								tn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(l(329));
						}
						if ((i & 62914560) === i && ((c = fl + 300 - Oe()), 10 < c)) {
							if ((Qi(s, i, yn, !Bi), _s(s, 0, !0) !== 0)) break e;
							((vi = i),
								(s.timeoutHandle = Zg(hg.bind(null, s, r, tn, hl, df, i, yn, Ra, br, Bi, d, "Throttled", -0, 0), c)));
							break e;
						}
						hg(s, r, tn, hl, df, i, yn, Ra, br, Bi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			gi(t);
		}
		function hg(t, i, r, s, c, d, y, x, M, P, J, te, Y, F) {
			if (((t.timeoutHandle = -1), (te = i.subtreeFlags), te & 8192 || (te & 16785408) === 16785408)) {
				((te = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: ei,
				}),
					rg(i, d, te));
				var fe = (d & 62914560) === d ? fl - Oe() : (d & 4194048) === d ? og - Oe() : 0;
				if (((fe = L_(te, fe)), fe !== null)) {
					((vi = d),
						(t.cancelPendingCommit = fe(wg.bind(null, t, i, d, r, s, c, y, x, M, J, te, null, Y, F))),
						Qi(t, d, y, !P));
					return;
				}
			}
			wg(t, i, d, r, s, c, y, x, M);
		}
		function i_(t) {
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
							if (!dn(d(), c)) return !1;
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
		function Qi(t, i, r, s) {
			((i &= ~ff),
				(i &= ~Ra),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				s && (t.warmLanes |= i),
				(s = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - fn(c),
					y = 1 << d;
				((s[d] = -1), (c &= ~y));
			}
			r !== 0 && Ch(t, r, i);
		}
		function ml() {
			return (Ve & 6) === 0 ? (Nu(0, !1), !1) : !0;
		}
		function gf() {
			if (Ne !== null) {
				if (Qe === 0) var t = Ne.return;
				else ((t = Ne), (ai = ya = null), Mc(t), (cr = null), (du = 0), (t = Ne));
				for (; t !== null; ) (Zv(t.alternate, t), (t = t.return));
				Ne = null;
			}
		}
		function Sr(t, i) {
			var r = t.timeoutHandle;
			(r !== -1 && ((t.timeoutHandle = -1), w_(r)),
				(r = t.cancelPendingCommit),
				r !== null && ((t.cancelPendingCommit = null), r()),
				(vi = 0),
				gf(),
				(Xe = t),
				(Ne = r = ni(t.current, null)),
				(ke = i),
				(Qe = 0),
				(gn = null),
				(Bi = !1),
				(yr = Kr(t, i)),
				(cf = !1),
				(br = yn = ff = Ra = Vi = ft = 0),
				(tn = Ru = null),
				(df = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var s = t.entangledLanes;
			if (s !== 0)
				for (t = t.entanglements, s &= i; 0 < s; ) {
					var c = 31 - fn(s),
						d = 1 << c;
					((i |= t[c]), (s &= ~d));
				}
			return ((mi = i), js(), r);
		}
		function mg(t, i) {
			((Te = null),
				(H.H = Su),
				i === or || i === Hs
					? ((i = km()), (Qe = 3))
					: i === pc
						? ((i = km()), (Qe = 4))
						: (Qe = i === Yc ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(gn = i),
				Ne === null && ((ft = 1), il(t, xn(i, t.current))));
		}
		function vg() {
			var t = mn.current;
			return t === null
				? !0
				: (ke & 4194048) === ke
					? An === null
					: (ke & 62914560) === ke || (ke & 536870912) !== 0
						? t === An
						: !1;
		}
		function gg() {
			var t = H.H;
			return ((H.H = Su), t === null ? Su : t);
		}
		function yg() {
			var t = H.A;
			return ((H.A = t_), t);
		}
		function vl() {
			((ft = 4),
				Bi || ((ke & 4194048) !== ke && mn.current !== null) || (yr = !0),
				((Vi & 134217727) === 0 && (Ra & 134217727) === 0) || Xe === null || Qi(Xe, ke, yn, !1));
		}
		function yf(t, i, r) {
			var s = Ve;
			Ve |= 2;
			var c = gg(),
				d = yg();
			((Xe !== t || ke !== i) && ((hl = null), Sr(t, i)), (i = !1));
			var y = ft;
			e: do
				try {
					if (Qe !== 0 && Ne !== null) {
						var x = Ne,
							M = gn;
						switch (Qe) {
							case 8:
								(gf(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								mn.current === null && (i = !0);
								var P = Qe;
								if (((Qe = 0), (gn = null), wr(t, x, M, P), r && yr)) {
									y = 0;
									break e;
								}
								break;
							default:
								((P = Qe), (Qe = 0), (gn = null), wr(t, x, M, P));
						}
					}
					(a_(), (y = ft));
					break;
				} catch (J) {
					mg(t, J);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(ai = ya = null),
				(Ve = s),
				(H.H = c),
				(H.A = d),
				Ne === null && ((Xe = null), (ke = 0), js()),
				y
			);
		}
		function a_() {
			for (; Ne !== null; ) bg(Ne);
		}
		function r_(t, i) {
			var r = Ve;
			Ve |= 2;
			var s = gg(),
				c = yg();
			Xe !== t || ke !== i ? ((hl = null), (dl = Oe() + 500), Sr(t, i)) : (yr = Kr(t, i));
			e: do
				try {
					if (Qe !== 0 && Ne !== null) {
						i = Ne;
						var d = gn;
						t: switch (Qe) {
							case 1:
								((Qe = 0), (gn = null), wr(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (Mm(d)) {
									((Qe = 0), (gn = null), pg(i));
									break;
								}
								((i = function () {
									((Qe !== 2 && Qe !== 9) || Xe !== t || (Qe = 7), gi(t));
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
								Mm(d) ? ((Qe = 0), (gn = null), pg(i)) : ((Qe = 0), (gn = null), wr(t, i, d, 7));
								break;
							case 5:
								var y = null;
								switch (Ne.tag) {
									case 26:
										y = Ne.memoizedState;
									case 5:
									case 27:
										var x = Ne;
										if (y ? ry(y) : x.stateNode.complete) {
											((Qe = 0), (gn = null));
											var M = x.sibling;
											if (M !== null) Ne = M;
											else {
												var P = x.return;
												P !== null ? ((Ne = P), gl(P)) : (Ne = null);
											}
											break t;
										}
								}
								((Qe = 0), (gn = null), wr(t, i, d, 5));
								break;
							case 6:
								((Qe = 0), (gn = null), wr(t, i, d, 6));
								break;
							case 8:
								(gf(), (ft = 6));
								break e;
							default:
								throw Error(l(462));
						}
					}
					u_();
					break;
				} catch (J) {
					mg(t, J);
				}
			while (!0);
			return ((ai = ya = null), (H.H = s), (H.A = c), (Ve = r), Ne !== null ? 0 : ((Xe = null), (ke = 0), js(), ft));
		}
		function u_() {
			for (; Ne !== null && !Re(); ) bg(Ne);
		}
		function bg(t) {
			var i = Vv(t.alternate, t, mi);
			((t.memoizedProps = t.pendingProps), i === null ? gl(t) : (Ne = i));
		}
		function pg(t) {
			var i = t,
				r = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = qv(r, i, i.pendingProps, i.type, void 0, ke);
					break;
				case 11:
					i = qv(r, i, i.pendingProps, i.type.render, i.ref, ke);
					break;
				case 5:
					Mc(i);
				default:
					(Zv(r, i), (i = Ne = Sm(i, mi)), (i = Vv(r, i, mi)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? gl(t) : (Ne = i));
		}
		function wr(t, i, r, s) {
			((ai = ya = null), Mc(i), (cr = null), (du = 0));
			var c = i.return;
			try {
				if (Fw(t, c, i, r, ke)) {
					((ft = 1), il(t, xn(r, t.current)), (Ne = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Ne = c), d);
				((ft = 1), il(t, xn(r, t.current)), (Ne = null));
				return;
			}
			i.flags & 32768
				? (Ie || s === 1
						? (t = !0)
						: yr || (ke & 536870912) !== 0
							? (t = !1)
							: ((Bi = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = mn.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					Sg(i, t))
				: gl(i);
		}
		function gl(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					Sg(i, Bi);
					return;
				}
				t = i.return;
				var r = Xw(i.alternate, i, mi);
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
			ft === 0 && (ft = 5);
		}
		function Sg(t, i) {
			do {
				var r = Jw(t.alternate, t);
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
			((ft = 6), (Ne = null));
		}
		function wg(t, i, r, s, c, d, y, x, M) {
			t.cancelPendingCommit = null;
			do yl();
			while (Rt !== 0);
			if ((Ve & 6) !== 0) throw Error(l(327));
			if (i !== null) {
				if (i === t.current) throw Error(l(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= ac),
					YS(t, r, d, y, x, M),
					t === Xe && ((Ne = Xe = null), (ke = 0)),
					(pr = i),
					(Zi = t),
					(vi = r),
					(hf = d),
					(mf = c),
					(cg = s),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							c_(ge, function () {
								return (Tg(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(s = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || s)
				) {
					((s = H.T), (H.T = null), (c = $.p), ($.p = 2), (y = Ve), (Ve |= 4));
					try {
						Ww(t, i, r);
					} finally {
						((Ve = y), ($.p = c), (H.T = s));
					}
				}
				((Rt = 1), _g(), xg(), Eg());
			}
		}
		function _g() {
			if (Rt === 1) {
				Rt = 0;
				var t = Zi,
					i = pr,
					r = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || r) {
					((r = H.T), (H.T = null));
					var s = $.p;
					$.p = 2;
					var c = Ve;
					Ve |= 4;
					try {
						ng(i, t);
						var d = Rf,
							y = fm(t.containerInfo),
							x = d.focusedElem,
							M = d.selectionRange;
						if (y !== x && x && x.ownerDocument && cm(x.ownerDocument.documentElement, x)) {
							if (M !== null && Wo(x)) {
								var P = M.start,
									J = M.end;
								if ((J === void 0 && (J = P), "selectionStart" in x))
									((x.selectionStart = P), (x.selectionEnd = Math.min(J, x.value.length)));
								else {
									var te = x.ownerDocument || document,
										Y = (te && te.defaultView) || window;
									if (Y.getSelection) {
										var F = Y.getSelection(),
											fe = x.textContent.length,
											we = Math.min(M.start, fe),
											Ke = M.end === void 0 ? we : Math.min(M.end, fe);
										!F.extend && we > Ke && ((y = Ke), (Ke = we), (we = y));
										var V = om(x, we),
											q = om(x, Ke);
										if (
											V &&
											q &&
											(F.rangeCount !== 1 ||
												F.anchorNode !== V.node ||
												F.anchorOffset !== V.offset ||
												F.focusNode !== q.node ||
												F.focusOffset !== q.offset)
										) {
											var Q = te.createRange();
											(Q.setStart(V.node, V.offset),
												F.removeAllRanges(),
												we > Ke
													? (F.addRange(Q), F.extend(q.node, q.offset))
													: (Q.setEnd(q.node, q.offset), F.addRange(Q)));
										}
									}
								}
							}
							for (te = [], F = x; (F = F.parentNode); )
								F.nodeType === 1 && te.push({ element: F, left: F.scrollLeft, top: F.scrollTop });
							for (typeof x.focus == "function" && x.focus(), x = 0; x < te.length; x++) {
								var W = te[x];
								((W.element.scrollLeft = W.left), (W.element.scrollTop = W.top));
							}
						}
						((Ol = !!Af), (Rf = Af = null));
					} finally {
						((Ve = c), ($.p = s), (H.T = r));
					}
				}
				((t.current = i), (Rt = 2));
			}
		}
		function xg() {
			if (Rt === 2) {
				Rt = 0;
				var t = Zi,
					i = pr,
					r = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || r) {
					((r = H.T), (H.T = null));
					var s = $.p;
					$.p = 2;
					var c = Ve;
					Ve |= 4;
					try {
						Xv(t, i.alternate, i);
					} finally {
						((Ve = c), ($.p = s), (H.T = r));
					}
				}
				Rt = 3;
			}
		}
		function Eg() {
			if (Rt === 4 || Rt === 3) {
				((Rt = 0), it());
				var t = Zi,
					i = pr,
					r = vi,
					s = cg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (Rt = 5)
					: ((Rt = 0), (pr = Zi = null), Cg(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (Hi = null), Do(r), (i = i.stateNode), cn && typeof cn.onCommitFiberRoot == "function"))
					try {
						cn.onCommitFiberRoot(Fr, i, void 0, (i.current.flags & 128) === 128);
					} catch {}
				if (s !== null) {
					((i = H.T), (c = $.p), ($.p = 2), (H.T = null));
					try {
						for (var d = t.onRecoverableError, y = 0; y < s.length; y++) {
							var x = s[y];
							d(x.value, { componentStack: x.stack });
						}
					} finally {
						((H.T = i), ($.p = c));
					}
				}
				((vi & 3) !== 0 && yl(),
					gi(t),
					(c = t.pendingLanes),
					(r & 261930) !== 0 && (c & 42) !== 0 ? (t === vf ? Ou++ : ((Ou = 0), (vf = t))) : (Ou = 0),
					Nu(0, !1));
			}
		}
		function Cg(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), cu(i)));
		}
		function yl() {
			return (_g(), xg(), Eg(), Tg());
		}
		function Tg() {
			if (Rt !== 5) return !1;
			var t = Zi,
				i = hf;
			hf = 0;
			var r = Do(vi),
				s = H.T,
				c = $.p;
			try {
				(($.p = 32 > r ? 32 : r), (H.T = null), (r = mf), (mf = null));
				var d = Zi,
					y = vi;
				if (((Rt = 0), (pr = Zi = null), (vi = 0), (Ve & 6) !== 0)) throw Error(l(331));
				var x = Ve;
				if (
					((Ve |= 4),
					sg(d.current),
					ag(d, d.current, y, r),
					(Ve = x),
					Nu(0, !1),
					cn && typeof cn.onPostCommitFiberRoot == "function")
				)
					try {
						cn.onPostCommitFiberRoot(Fr, d);
					} catch {}
				return !0;
			} finally {
				(($.p = c), (H.T = s), Cg(t, i));
			}
		}
		function Ag(t, i, r) {
			((i = xn(r, i)), (i = Pc(t.stateNode, i, 2)), (t = Ea(t, i, 2)), t !== null && (xs(t, 2), gi(t)));
		}
		function Pe(t, i, r) {
			if (t.tag === 3) Ag(t, t, r);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						Ag(i, t, r);
						break;
					} else if (i.tag === 1) {
						var s = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Hi === null || !Hi.has(s)))
						) {
							((t = xn(r, t)), (r = Rv(2)), (s = Ea(i, r, 2)), s !== null && (Ov(r, s, i, t), xs(s, 2), gi(s)));
							break;
						}
					}
					i = i.return;
				}
		}
		function bf(t, i, r) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new n_();
				var c = new Set();
				s.set(i, c);
			} else ((c = s.get(i)), c === void 0 && ((c = new Set()), s.set(i, c)));
			c.has(r) || ((cf = !0), c.add(r), (t = s_.bind(null, t, i, r)), i.then(t, t));
		}
		function s_(t, i, r) {
			var s = t.pingCache;
			(s !== null && s.delete(i),
				(t.pingedLanes |= t.suspendedLanes & r),
				(t.warmLanes &= ~r),
				Xe === t &&
					(ke & r) === r &&
					(ft === 4 || (ft === 3 && (ke & 62914560) === ke && 300 > Oe() - fl) ? (Ve & 2) === 0 && Sr(t, 0) : (ff |= r),
					br === ke && (br = 0)),
				gi(t));
		}
		function Rg(t, i) {
			(i === 0 && (i = Eh()), (t = ma(t, i)), t !== null && (xs(t, i), gi(t)));
		}
		function l_(t) {
			var i = t.memoizedState,
				r = 0;
			(i !== null && (r = i.retryLane), Rg(t, r));
		}
		function o_(t, i) {
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
			(s !== null && s.delete(i), Rg(t, r));
		}
		function c_(t, i) {
			return Ot(t, i);
		}
		var bl = null,
			_r = null,
			pf = !1,
			pl = !1,
			Sf = !1,
			Pi = 0;
		function gi(t) {
			(t !== _r && t.next === null && (_r === null ? (bl = _r = t) : (_r = _r.next = t)),
				(pl = !0),
				pf || ((pf = !0), d_()));
		}
		function Nu(t, i) {
			if (!Sf && pl) {
				Sf = !0;
				do
					for (var r = !1, s = bl; s !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = s.suspendedLanes,
										x = s.pingedLanes;
									((d = (1 << (31 - fn(42 | t) + 1)) - 1),
										(d &= c & ~(y & ~x)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((r = !0), zg(s, d));
							} else
								((d = ke),
									(d = _s(s, s === Xe ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || Kr(s, d) || ((r = !0), zg(s, d)));
						s = s.next;
					}
				while (r);
				Sf = !1;
			}
		}
		function f_() {
			Og();
		}
		function Og() {
			pl = pf = !1;
			var t = 0;
			Pi !== 0 && S_() && (t = Pi);
			for (var i = Oe(), r = null, s = bl; s !== null; ) {
				var c = s.next,
					d = Ng(s, i);
				(d === 0
					? ((s.next = null), r === null ? (bl = c) : (r.next = c), c === null && (_r = r))
					: ((r = s), (t !== 0 || (d & 3) !== 0) && (pl = !0)),
					(s = c));
			}
			((Rt !== 0 && Rt !== 5) || Nu(t, !1), Pi !== 0 && (Pi = 0));
		}
		function Ng(t, i) {
			for (
				var r = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - fn(d),
					x = 1 << y,
					M = c[y];
				(M === -1 ? ((x & r) === 0 || (x & s) !== 0) && (c[y] = PS(x, i)) : M <= i && (t.expiredLanes |= x), (d &= ~x));
			}
			if (
				((i = Xe),
				(r = ke),
				(r = _s(t, t === i ? r : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				r === 0 || (t === i && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && ue(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((r & 3) === 0 || Kr(t, r)) {
				if (((i = r & -r), i === t.callbackPriority)) return i;
				switch ((s !== null && ue(s), Do(r))) {
					case 2:
					case 8:
						r = se;
						break;
					case 32:
						r = ge;
						break;
					case 268435456:
						r = Jn;
						break;
					default:
						r = ge;
				}
				return ((s = Mg.bind(null, t)), (r = Ot(r, s)), (t.callbackPriority = i), (t.callbackNode = r), i);
			}
			return (s !== null && s !== null && ue(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function Mg(t, i) {
			if (Rt !== 0 && Rt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var r = t.callbackNode;
			if (yl() && t.callbackNode !== r) return null;
			var s = ke;
			return (
				(s = _s(t, t === Xe ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (dg(t, s, i), Ng(t, Oe()), t.callbackNode != null && t.callbackNode === r ? Mg.bind(null, t) : null)
			);
		}
		function zg(t, i) {
			if (yl()) return null;
			dg(t, i, !0);
		}
		function d_() {
			__(function () {
				(Ve & 6) !== 0 ? Ot(Dt, f_) : Og();
			});
		}
		function wf() {
			if (Pi === 0) {
				var t = sr;
				(t === 0 && ((t = ps), (ps <<= 1), (ps & 261888) === 0 && (ps = 256)), (Pi = t));
			}
			return Pi;
		}
		function kg(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: As("" + t);
		}
		function Dg(t, i) {
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
		function h_(t, i, r, s, c) {
			if (i === "submit" && r && r.stateNode === c) {
				var d = kg((c[Gt] || null).action),
					y = s.submitter;
				y &&
					((i = (i = y[Gt] || null) ? kg(i.formAction) : y.getAttribute("formAction")),
					i !== null && ((d = i), (y = null)));
				var x = new Ms("action", "action", null, s, c);
				t.push({
					event: x,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (Pi !== 0) {
										var M = y ? Dg(c, y) : new FormData(c);
										$c(r, { pending: !0, data: M, method: c.method, action: d }, null, M);
									}
								} else
									typeof d == "function" &&
										(x.preventDefault(),
										(M = y ? Dg(c, y) : new FormData(c)),
										$c(r, { pending: !0, data: M, method: c.method, action: d }, d, M));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var _f = 0; _f < ic.length; _f++) {
			var xf = ic[_f];
			Dn(xf.toLowerCase(), "on" + (xf[0].toUpperCase() + xf.slice(1)));
		}
		(Dn(mm, "onAnimationEnd"),
			Dn(vm, "onAnimationIteration"),
			Dn(gm, "onAnimationStart"),
			Dn("dblclick", "onDoubleClick"),
			Dn("focusin", "onFocus"),
			Dn("focusout", "onBlur"),
			Dn(Rw, "onTransitionRun"),
			Dn(Ow, "onTransitionStart"),
			Dn(Nw, "onTransitionCancel"),
			Dn(ym, "onTransitionEnd"),
			Ya("onMouseEnter", ["mouseout", "mouseover"]),
			Ya("onMouseLeave", ["mouseout", "mouseover"]),
			Ya("onPointerEnter", ["pointerout", "pointerover"]),
			Ya("onPointerLeave", ["pointerout", "pointerover"]),
			ca("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			ca("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			ca("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			ca("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			ca("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			ca("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Mu =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			m_ = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Mu));
		function jg(t, i) {
			i = (i & 4) !== 0;
			for (var r = 0; r < t.length; r++) {
				var s = t[r],
					c = s.event;
				s = s.listeners;
				e: {
					var d = void 0;
					if (i)
						for (var y = s.length - 1; 0 <= y; y--) {
							var x = s[y],
								M = x.instance,
								P = x.currentTarget;
							if (((x = x.listener), M !== d && c.isPropagationStopped())) break e;
							((d = x), (c.currentTarget = P));
							try {
								d(c);
							} catch (J) {
								Ds(J);
							}
							((c.currentTarget = null), (d = M));
						}
					else
						for (y = 0; y < s.length; y++) {
							if (
								((x = s[y]),
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
								Ds(J);
							}
							((c.currentTarget = null), (d = M));
						}
				}
			}
		}
		function Me(t, i) {
			var r = i[jo];
			r === void 0 && (r = i[jo] = new Set());
			var s = t + "__bubble";
			r.has(s) || (Ig(i, t, 2, !1), r.add(s));
		}
		function Ef(t, i, r) {
			var s = 0;
			(i && (s |= 4), Ig(r, t, s, i));
		}
		var Sl = "_reactListening" + Math.random().toString(36).slice(2);
		function qg(t) {
			if (!t[Sl]) {
				((t[Sl] = !0),
					zh.forEach(function (r) {
						r !== "selectionchange" && (m_.has(r) || Ef(r, !1, t), Ef(r, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[Sl] || ((i[Sl] = !0), Ef("selectionchange", !1, i));
			}
		}
		function Ig(t, i, r, s) {
			switch (cy(i)) {
				case 2:
					var c = Z_;
					break;
				case 8:
					c = Q_;
					break;
				default:
					c = Lf;
			}
			((r = c.bind(null, i, r, t)),
				(c = void 0),
				!Zo || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				s
					? c !== void 0
						? t.addEventListener(i, r, { capture: !0, passive: c })
						: t.addEventListener(i, r, !0)
					: c !== void 0
						? t.addEventListener(i, r, { passive: c })
						: t.addEventListener(i, r, !1));
		}
		function Cf(t, i, r, s, c) {
			var d = s;
			if ((i & 1) === 0 && (i & 2) === 0 && s !== null)
				e: for (;;) {
					if (s === null) return;
					var y = s.tag;
					if (y === 3 || y === 4) {
						var x = s.stateNode.containerInfo;
						if (x === c) break;
						if (y === 4)
							for (y = s.return; y !== null; ) {
								var M = y.tag;
								if ((M === 3 || M === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; x !== null; ) {
							if (((y = Za(x)), y === null)) return;
							if (((M = y.tag), M === 5 || M === 6 || M === 26 || M === 27)) {
								s = d = y;
								continue e;
							}
							x = x.parentNode;
						}
					}
					s = s.return;
				}
			Zh(function () {
				var P = d,
					J = Vo(r),
					te = [];
				e: {
					var Y = bm.get(t);
					if (Y !== void 0) {
						var F = Ms,
							fe = t;
						switch (t) {
							case "keypress":
								if (Os(r) === 0) break e;
							case "keydown":
							case "keyup":
								F = fw;
								break;
							case "focusin":
								((fe = "focus"), (F = Fo));
								break;
							case "focusout":
								((fe = "blur"), (F = Fo));
								break;
							case "beforeblur":
							case "afterblur":
								F = Fo;
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
								F = Yh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								F = aw;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								F = dw;
								break;
							case mm:
							case vm:
							case gm:
								F = rw;
								break;
							case ym:
								F = hw;
								break;
							case "scroll":
							case "scrollend":
								F = iw;
								break;
							case "wheel":
								F = mw;
								break;
							case "copy":
							case "cut":
							case "paste":
								F = uw;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								F = Kh;
								break;
							case "toggle":
							case "beforetoggle":
								F = vw;
						}
						var we = (i & 4) !== 0,
							Ke = !we && (t === "scroll" || t === "scrollend"),
							V = we ? (Y !== null ? Y + "Capture" : null) : Y;
						we = [];
						for (var q = P, Q; q !== null; ) {
							var W = q;
							if (
								((Q = W.stateNode),
								(W = W.tag),
								(W !== 5 && W !== 26 && W !== 27) ||
									Q === null ||
									V === null ||
									((W = Wr(q, V)), W != null && we.push(zu(q, W, Q))),
								Ke)
							)
								break;
							q = q.return;
						}
						0 < we.length && ((Y = new F(Y, fe, null, r, J)), te.push({ event: Y, listeners: we }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((Y = t === "mouseover" || t === "pointerover"),
							(F = t === "mouseout" || t === "pointerout"),
							Y && r !== Bo && (fe = r.relatedTarget || r.fromElement) && (Za(fe) || fe[Gr]))
						)
							break e;
						if (
							(F || Y) &&
							((Y = J.window === J ? J : (Y = J.ownerDocument) ? Y.defaultView || Y.parentWindow : window),
							F
								? ((fe = r.relatedTarget || r.toElement),
									(F = P),
									(fe = fe ? Za(fe) : null),
									fe !== null &&
										((Ke = f(fe)), (we = fe.tag), fe !== Ke || (we !== 5 && we !== 27 && we !== 6)) &&
										(fe = null))
								: ((F = null), (fe = P)),
							F !== fe)
						) {
							if (
								((we = Yh),
								(W = "onMouseLeave"),
								(V = "onMouseEnter"),
								(q = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((we = Kh), (W = "onPointerLeave"), (V = "onPointerEnter"), (q = "pointer")),
								(Ke = F == null ? Y : Jr(F)),
								(Q = fe == null ? Y : Jr(fe)),
								(Y = new we(W, q + "leave", F, r, J)),
								(Y.target = Ke),
								(Y.relatedTarget = Q),
								(W = null),
								Za(J) === P &&
									((we = new we(V, q + "enter", fe, r, J)), (we.target = Q), (we.relatedTarget = Ke), (W = we)),
								(Ke = W),
								F && fe)
							)
								t: {
									for (we = v_, V = F, q = fe, Q = 0, W = V; W; W = we(W)) Q++;
									W = 0;
									for (var ye = q; ye; ye = we(ye)) W++;
									for (; 0 < Q - W; ) ((V = we(V)), Q--);
									for (; 0 < W - Q; ) ((q = we(q)), W--);
									for (; Q--; ) {
										if (V === q || (q !== null && V === q.alternate)) {
											we = V;
											break t;
										}
										((V = we(V)), (q = we(q)));
									}
									we = null;
								}
							else we = null;
							(F !== null && Ug(te, Y, F, we, !1), fe !== null && Ke !== null && Ug(te, Ke, fe, we, !0));
						}
					}
					e: {
						if (
							((Y = P ? Jr(P) : window),
							(F = Y.nodeName && Y.nodeName.toLowerCase()),
							F === "select" || (F === "input" && Y.type === "file"))
						)
							var $e = im;
						else if (tm(Y))
							if (am) $e = Cw;
							else {
								$e = xw;
								var he = _w;
							}
						else
							((F = Y.nodeName),
								!F || F.toLowerCase() !== "input" || (Y.type !== "checkbox" && Y.type !== "radio")
									? P && $o(P.elementType) && ($e = im)
									: ($e = Ew));
						if ($e && ($e = $e(t, P))) {
							nm(te, $e, r, J);
							break e;
						}
						(he && he(t, Y, P),
							t === "focusout" &&
								P &&
								Y.type === "number" &&
								P.memoizedProps.value != null &&
								Lo(Y, "number", Y.value));
					}
					switch (((he = P ? Jr(P) : window), t)) {
						case "focusin":
							(tm(he) || he.contentEditable === "true") && ((Wa = he), (ec = P), (su = null));
							break;
						case "focusout":
							su = ec = Wa = null;
							break;
						case "mousedown":
							tc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((tc = !1), dm(te, r, J));
							break;
						case "selectionchange":
							if (Aw) break;
						case "keydown":
						case "keyup":
							dm(te, r, J);
					}
					var Ae;
					if (Go)
						e: {
							switch (t) {
								case "compositionstart":
									var De = "onCompositionStart";
									break e;
								case "compositionend":
									De = "onCompositionEnd";
									break e;
								case "compositionupdate":
									De = "onCompositionUpdate";
									break e;
							}
							De = void 0;
						}
					else
						Ja
							? Wh(t, r) && (De = "onCompositionEnd")
							: t === "keydown" && r.keyCode === 229 && (De = "onCompositionStart");
					(De &&
						(Gh &&
							r.locale !== "ko" &&
							(Ja || De !== "onCompositionStart"
								? De === "onCompositionEnd" && Ja && (Ae = Qh())
								: ((zi = J), (Qo = "value" in zi ? zi.value : zi.textContent), (Ja = !0))),
						(he = wl(P, De)),
						0 < he.length &&
							((De = new Fh(De, t, null, r, J)),
							te.push({ event: De, listeners: he }),
							Ae ? (De.data = Ae) : ((Ae = em(r)), Ae !== null && (De.data = Ae)))),
						(Ae = yw ? bw(t, r) : pw(t, r)) &&
							((De = wl(P, "onBeforeInput")),
							0 < De.length &&
								((he = new Fh("onBeforeInput", "beforeinput", null, r, J)),
								te.push({ event: he, listeners: De }),
								(he.data = Ae))),
						h_(te, t, P, r, J));
				}
				jg(te, i);
			});
		}
		function zu(t, i, r) {
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
						((c = Wr(t, r)), c != null && s.unshift(zu(t, c, d)), (c = Wr(t, i)), c != null && s.push(zu(t, c, d))),
					t.tag === 3)
				)
					return s;
				t = t.return;
			}
			return [];
		}
		function v_(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function Ug(t, i, r, s, c) {
			for (var d = i._reactName, y = []; r !== null && r !== s; ) {
				var x = r,
					M = x.alternate,
					P = x.stateNode;
				if (((x = x.tag), M !== null && M === s)) break;
				((x !== 5 && x !== 26 && x !== 27) ||
					P === null ||
					((M = P),
					c
						? ((P = Wr(r, d)), P != null && y.unshift(zu(r, P, M)))
						: c || ((P = Wr(r, d)), P != null && y.push(zu(r, P, M)))),
					(r = r.return));
			}
			y.length !== 0 && t.push({ event: i, listeners: y });
		}
		var g_ = /\r\n?/g,
			y_ = /\u0000|\uFFFD/g;
		function Lg(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					g_,
					`
`,
				)
				.replace(y_, "");
		}
		function $g(t, i) {
			return ((i = Lg(i)), Lg(t) === i);
		}
		function Fe(t, i, r, s, c, d) {
			switch (r) {
				case "children":
					typeof s == "string"
						? i === "body" || (i === "textarea" && s === "") || Ka(t, s)
						: (typeof s == "number" || typeof s == "bigint") && i !== "body" && Ka(t, "" + s);
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
					Vh(t, s, d);
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
								? (i !== "input" && Fe(t, i, "name", c.name, c, null),
									Fe(t, i, "formEncType", c.formEncType, c, null),
									Fe(t, i, "formMethod", c.formMethod, c, null),
									Fe(t, i, "formTarget", c.formTarget, c, null))
								: (Fe(t, i, "encType", c.encType, c, null),
									Fe(t, i, "method", c.method, c, null),
									Fe(t, i, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(r);
						break;
					}
					((s = As("" + s)), t.setAttribute(r, s));
					break;
				case "onClick":
					s != null && (t.onclick = ei);
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
					Wn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					Wn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					Wn(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					Wn(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					Wn(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					Wn(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					Wn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					Wn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					Wn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					Es(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < r.length) || (r[0] !== "o" && r[0] !== "O") || (r[1] !== "n" && r[1] !== "N")) &&
						((r = tw.get(r) || r), Es(t, r, s));
			}
		}
		function Tf(t, i, r, s, c, d) {
			switch (r) {
				case "style":
					Vh(t, s, d);
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
					typeof s == "string" ? Ka(t, s) : (typeof s == "number" || typeof s == "bigint") && Ka(t, "" + s);
					break;
				case "onScroll":
					s != null && Me("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Me("scrollend", t);
					break;
				case "onClick":
					s != null && (t.onclick = ei);
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
					if (!kh.hasOwnProperty(r))
						e: {
							if (
								r[0] === "o" &&
								r[1] === "n" &&
								((c = r.endsWith("Capture")),
								(i = r.slice(2, c ? r.length - 7 : void 0)),
								(d = t[Gt] || null),
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
		function Lt(t, i, r) {
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
							var y = r[d];
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
										throw Error(l(137, i));
									default:
										Fe(t, i, d, y, r, null);
								}
						}
					(c && Fe(t, i, "srcSet", r.srcSet, r, null), s && Fe(t, i, "src", r.src, r, null));
					return;
				case "input":
					Me("invalid", t);
					var x = (d = y = c = null),
						M = null,
						P = null;
					for (s in r)
						if (r.hasOwnProperty(s)) {
							var J = r[s];
							if (J != null)
								switch (s) {
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
										Fe(t, i, s, J, r, null);
								}
						}
					Uh(t, d, x, M, P, y, c, !1);
					return;
				case "select":
					(Me("invalid", t), (s = y = d = null));
					for (c in r)
						if (r.hasOwnProperty(c) && ((x = r[c]), x != null))
							switch (c) {
								case "value":
									d = x;
									break;
								case "defaultValue":
									y = x;
									break;
								case "multiple":
									s = x;
								default:
									Fe(t, i, c, x, r, null);
							}
					((i = d), (r = y), (t.multiple = !!s), i != null ? Fa(t, !!s, i, !1) : r != null && Fa(t, !!s, r, !0));
					return;
				case "textarea":
					(Me("invalid", t), (d = c = s = null));
					for (y in r)
						if (r.hasOwnProperty(y) && ((x = r[y]), x != null))
							switch (y) {
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
									Fe(t, i, y, x, r, null);
							}
					$h(t, s, c, d);
					return;
				case "option":
					for (M in r)
						if (r.hasOwnProperty(M) && ((s = r[M]), s != null))
							switch (M) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									Fe(t, i, M, s, r, null);
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
					for (s = 0; s < Mu.length; s++) Me(Mu[s], t);
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
									Fe(t, i, P, s, r, null);
							}
					return;
				default:
					if ($o(i)) {
						for (J in r) r.hasOwnProperty(J) && ((s = r[J]), s !== void 0 && Tf(t, i, J, s, r, void 0));
						return;
					}
			}
			for (x in r) r.hasOwnProperty(x) && ((s = r[x]), s != null && Fe(t, i, x, s, r, null));
		}
		function b_(t, i, r, s) {
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
						x = null,
						M = null,
						P = null,
						J = null;
					for (F in r) {
						var te = r[F];
						if (r.hasOwnProperty(F) && te != null)
							switch (F) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									M = te;
								default:
									s.hasOwnProperty(F) || Fe(t, i, F, null, s, te);
							}
					}
					for (var Y in s) {
						var F = s[Y];
						if (((te = r[Y]), s.hasOwnProperty(Y) && (F != null || te != null)))
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
									J = F;
									break;
								case "value":
									y = F;
									break;
								case "defaultValue":
									x = F;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (F != null) throw Error(l(137, i));
									break;
								default:
									F !== te && Fe(t, i, Y, F, s, te);
							}
					}
					Uo(t, y, x, M, P, J, d, c);
					return;
				case "select":
					F = y = x = Y = null;
					for (d in r)
						if (((M = r[d]), r.hasOwnProperty(d) && M != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									F = M;
								default:
									s.hasOwnProperty(d) || Fe(t, i, d, null, s, M);
							}
					for (c in s)
						if (((d = s[c]), (M = r[c]), s.hasOwnProperty(c) && (d != null || M != null)))
							switch (c) {
								case "value":
									Y = d;
									break;
								case "defaultValue":
									x = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== M && Fe(t, i, c, d, s, M);
							}
					((i = x),
						(r = y),
						(s = F),
						Y != null
							? Fa(t, !!r, Y, !1)
							: !!s != !!r && (i != null ? Fa(t, !!r, i, !0) : Fa(t, !!r, r ? [] : "", !1)));
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
									Fe(t, i, x, null, s, c);
							}
					for (y in s)
						if (((c = s[y]), (d = r[y]), s.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
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
									c !== d && Fe(t, i, y, c, s, d);
							}
					Lh(t, Y, F);
					return;
				case "option":
					for (var fe in r)
						if (((Y = r[fe]), r.hasOwnProperty(fe) && Y != null && !s.hasOwnProperty(fe)))
							switch (fe) {
								case "selected":
									t.selected = !1;
									break;
								default:
									Fe(t, i, fe, null, s, Y);
							}
					for (M in s)
						if (((Y = s[M]), (F = r[M]), s.hasOwnProperty(M) && Y !== F && (Y != null || F != null)))
							switch (M) {
								case "selected":
									t.selected = Y && typeof Y != "function" && typeof Y != "symbol";
									break;
								default:
									Fe(t, i, M, Y, s, F);
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
					for (var we in r)
						((Y = r[we]), r.hasOwnProperty(we) && Y != null && !s.hasOwnProperty(we) && Fe(t, i, we, null, s, Y));
					for (P in s)
						if (((Y = s[P]), (F = r[P]), s.hasOwnProperty(P) && Y !== F && (Y != null || F != null)))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (Y != null) throw Error(l(137, i));
									break;
								default:
									Fe(t, i, P, Y, s, F);
							}
					return;
				default:
					if ($o(i)) {
						for (var Ke in r)
							((Y = r[Ke]),
								r.hasOwnProperty(Ke) && Y !== void 0 && !s.hasOwnProperty(Ke) && Tf(t, i, Ke, void 0, s, Y));
						for (J in s)
							((Y = s[J]),
								(F = r[J]),
								!s.hasOwnProperty(J) || Y === F || (Y === void 0 && F === void 0) || Tf(t, i, J, Y, s, F));
						return;
					}
			}
			for (var V in r)
				((Y = r[V]), r.hasOwnProperty(V) && Y != null && !s.hasOwnProperty(V) && Fe(t, i, V, null, s, Y));
			for (te in s)
				((Y = s[te]),
					(F = r[te]),
					!s.hasOwnProperty(te) || Y === F || (Y == null && F == null) || Fe(t, i, te, Y, s, F));
		}
		function Bg(t) {
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
		function p_() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
					var c = r[s],
						d = c.transferSize,
						y = c.initiatorType,
						x = c.duration;
					if (d && x && Bg(y)) {
						for (y = 0, x = c.responseEnd, s += 1; s < r.length; s++) {
							var M = r[s],
								P = M.startTime;
							if (P > x) break;
							var J = M.transferSize,
								te = M.initiatorType;
							J && Bg(te) && ((M = M.responseEnd), (y += J * (M < x ? 1 : (x - P) / (M - P))));
						}
						if ((--s, (i += (8 * (d + y)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Af = null,
			Rf = null;
		function _l(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Vg(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Hg(t, i) {
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
		function Of(t, i) {
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
		var Nf = null;
		function S_() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === Nf ? !1 : ((Nf = t), !0)) : ((Nf = null), !1);
		}
		var Zg = typeof setTimeout == "function" ? setTimeout : void 0,
			w_ = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Qg = typeof Promise == "function" ? Promise : void 0,
			__ =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Qg < "u"
						? function (t) {
								return Qg.resolve(null).then(t).catch(x_);
							}
						: Zg;
		function x_(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function Yi(t) {
			return t === "head";
		}
		function Pg(t, i) {
			var r = i,
				s = 0;
			do {
				var c = r.nextSibling;
				if ((t.removeChild(r), c && c.nodeType === 8))
					if (((r = c.data), r === "/$" || r === "/&")) {
						if (s === 0) {
							(t.removeChild(c), Tr(i));
							return;
						}
						s--;
					} else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&") s++;
					else if (r === "html") ku(t.ownerDocument.documentElement);
					else if (r === "head") {
						((r = t.ownerDocument.head), ku(r));
						for (var d = r.firstChild; d; ) {
							var y = d.nextSibling,
								x = d.nodeName;
							(d[Xr] ||
								x === "SCRIPT" ||
								x === "STYLE" ||
								(x === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								r.removeChild(d),
								(d = y));
						}
					} else r === "body" && ku(t.ownerDocument.body);
				r = c;
			} while (r);
			Tr(i);
		}
		function Yg(t, i) {
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
		function Mf(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var r = i;
				switch (((i = i.nextSibling), r.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Mf(r), qo(r));
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
		function E_(t, i, r, s) {
			for (; t.nodeType === 1; ) {
				var c = r;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (s) {
					if (!t[Xr])
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
				if (((t = On(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function C_(t, i, r) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r) ||
					((t = On(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Fg(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = On(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function zf(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function kf(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function T_(t, i) {
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
		function On(t) {
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
		var Df = null;
		function Kg(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var r = t.data;
					if (r === "/$" || r === "/&") {
						if (i === 0) return On(t.nextSibling);
						i--;
					} else (r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Gg(t) {
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
		function Xg(t, i, r) {
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
		function ku(t) {
			for (var i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
			qo(t);
		}
		var Nn = new Map(),
			Jg = new Set();
		function xl(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var yi = $.d;
		$.d = { f: A_, r: R_, D: O_, C: N_, L: M_, m: z_, X: D_, S: k_, M: j_ };
		function A_() {
			var t = yi.f(),
				i = ml();
			return t || i;
		}
		function R_(t) {
			var i = Qa(t);
			i !== null && i.tag === 5 && i.type === "form" ? yv(i) : yi.r(t);
		}
		var xr = typeof document > "u" ? null : document;
		function Wg(t, i, r) {
			var s = xr;
			if (s && typeof i == "string" && i) {
				var c = wn(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof r == "string" && (c += '[crossorigin="' + r + '"]'),
					Jg.has(c) ||
						(Jg.add(c),
						(t = { rel: t, crossOrigin: r, href: i }),
						s.querySelector(c) === null &&
							((i = s.createElement("link")), Lt(i, "link", t), Nt(i), s.head.appendChild(i))));
			}
		}
		function O_(t) {
			(yi.D(t), Wg("dns-prefetch", t, null));
		}
		function N_(t, i) {
			(yi.C(t, i), Wg("preconnect", t, i));
		}
		function M_(t, i, r) {
			yi.L(t, i, r);
			var s = xr;
			if (s && t && i) {
				var c = 'link[rel="preload"][as="' + wn(i) + '"]';
				i === "image" && r && r.imageSrcSet
					? ((c += '[imagesrcset="' + wn(r.imageSrcSet) + '"]'),
						typeof r.imageSizes == "string" && (c += '[imagesizes="' + wn(r.imageSizes) + '"]'))
					: (c += '[href="' + wn(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Er(t);
						break;
					case "script":
						d = Cr(t);
				}
				Nn.has(d) ||
					((t = p({ rel: "preload", href: i === "image" && r && r.imageSrcSet ? void 0 : t, as: i }, r)),
					Nn.set(d, t),
					s.querySelector(c) !== null ||
						(i === "style" && s.querySelector(Du(d))) ||
						(i === "script" && s.querySelector(ju(d))) ||
						((i = s.createElement("link")), Lt(i, "link", t), Nt(i), s.head.appendChild(i)));
			}
		}
		function z_(t, i) {
			yi.m(t, i);
			var r = xr;
			if (r && t) {
				var s = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + wn(s) + '"][href="' + wn(t) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Cr(t);
				}
				if (!Nn.has(d) && ((t = p({ rel: "modulepreload", href: t }, i)), Nn.set(d, t), r.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (r.querySelector(ju(d))) return;
					}
					((s = r.createElement("link")), Lt(s, "link", t), Nt(s), r.head.appendChild(s));
				}
			}
		}
		function k_(t, i, r) {
			yi.S(t, i, r);
			var s = xr;
			if (s && t) {
				var c = Pa(s).hoistableStyles,
					d = Er(t);
				i = i || "default";
				var y = c.get(d);
				if (!y) {
					var x = { loading: 0, preload: null };
					if ((y = s.querySelector(Du(d)))) x.loading = 5;
					else {
						((t = p({ rel: "stylesheet", href: t, "data-precedence": i }, r)), (r = Nn.get(d)) && jf(t, r));
						var M = (y = s.createElement("link"));
						(Nt(M),
							Lt(M, "link", t),
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
							El(y, i, s));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: x }), c.set(d, y));
				}
			}
		}
		function D_(t, i) {
			yi.X(t, i);
			var r = xr;
			if (r && t) {
				var s = Pa(r).hoistableScripts,
					c = Cr(t),
					d = s.get(c);
				d ||
					((d = r.querySelector(ju(c))),
					d ||
						((t = p({ src: t, async: !0 }, i)),
						(i = Nn.get(c)) && qf(t, i),
						(d = r.createElement("script")),
						Nt(d),
						Lt(d, "link", t),
						r.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function j_(t, i) {
			yi.M(t, i);
			var r = xr;
			if (r && t) {
				var s = Pa(r).hoistableScripts,
					c = Cr(t),
					d = s.get(c);
				d ||
					((d = r.querySelector(ju(c))),
					d ||
						((t = p({ src: t, async: !0, type: "module" }, i)),
						(i = Nn.get(c)) && qf(t, i),
						(d = r.createElement("script")),
						Nt(d),
						Lt(d, "link", t),
						r.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function ey(t, i, r, s) {
			var c = (c = ve.current) ? xl(c) : null;
			if (!c) throw Error(l(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof r.precedence == "string" && typeof r.href == "string"
						? ((i = Er(r.href)),
							(r = Pa(c).hoistableStyles),
							(s = r.get(i)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), r.set(i, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
						t = Er(r.href);
						var d = Pa(c).hoistableStyles,
							y = d.get(t);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, y),
								(d = c.querySelector(Du(t))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								Nn.has(t) ||
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
									Nn.set(t, r),
									d || q_(c, t, r, y.state))),
							i && s === null)
						)
							throw Error(l(528, ""));
						return y;
					}
					if (i && s !== null) throw Error(l(529, ""));
					return null;
				case "script":
					return (
						(i = r.async),
						(r = r.src),
						typeof r == "string" && i && typeof i != "function" && typeof i != "symbol"
							? ((i = Cr(r)),
								(r = Pa(c).hoistableScripts),
								(s = r.get(i)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), r.set(i, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(l(444, t));
			}
		}
		function Er(t) {
			return 'href="' + wn(t) + '"';
		}
		function Du(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function ty(t) {
			return p({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function q_(t, i, r, s) {
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
					Lt(i, "link", r),
					Nt(i),
					t.head.appendChild(i));
		}
		function Cr(t) {
			return '[src="' + wn(t) + '"]';
		}
		function ju(t) {
			return "script[async]" + t;
		}
		function ny(t, i, r) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + wn(r.href) + '"]');
						if (s) return ((i.instance = s), Nt(s), s);
						var c = p({}, r, { "data-href": r.href, "data-precedence": r.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							Nt(s),
							Lt(s, "style", c),
							El(s, r.precedence, t),
							(i.instance = s)
						);
					case "stylesheet":
						c = Er(r.href);
						var d = t.querySelector(Du(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), Nt(d), d);
						((s = ty(r)), (c = Nn.get(c)) && jf(s, c), (d = (t.ownerDocument || t).createElement("link")), Nt(d));
						var y = d;
						return (
							(y._p = new Promise(function (x, M) {
								((y.onload = x), (y.onerror = M));
							})),
							Lt(d, "link", s),
							(i.state.loading |= 4),
							El(d, r.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Cr(r.src)),
							(c = t.querySelector(ju(d)))
								? ((i.instance = c), Nt(c), c)
								: ((s = r),
									(c = Nn.get(d)) && ((s = p({}, r)), qf(s, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									Nt(c),
									Lt(c, "link", s),
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
					y = 0;
				y < s.length;
				y++
			) {
				var x = s[y];
				if (x.dataset.precedence === i) d = x;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(t, d.nextSibling)
				: ((i = r.nodeType === 9 ? r.head : r), i.insertBefore(t, i.firstChild));
		}
		function jf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function qf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Cl = null;
		function iy(t, i, r) {
			if (Cl === null) {
				var s = new Map(),
					c = (Cl = new Map());
				c.set(r, s);
			} else ((c = Cl), (s = c.get(r)), s || ((s = new Map()), c.set(r, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), r = r.getElementsByTagName(t), c = 0; c < r.length; c++) {
				var d = r[c];
				if (
					!(d[Xr] || d[jt] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var y = d.getAttribute(i) || "";
					y = t + y;
					var x = s.get(y);
					x ? x.push(d) : s.set(y, [d]);
				}
			}
			return s;
		}
		function ay(t, i, r) {
			((t = t.ownerDocument || t), t.head.insertBefore(r, i === "title" ? t.querySelector("head > title") : null));
		}
		function I_(t, i, r) {
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
		function ry(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function U_(t, i, r, s) {
			if (
				r.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(r.state.loading & 4) === 0
			) {
				if (r.instance === null) {
					var c = Er(s.href),
						d = i.querySelector(Du(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Tl.bind(t)), i.then(t, t)),
							(r.state.loading |= 4),
							(r.instance = d),
							Nt(d));
						return;
					}
					((d = i.ownerDocument || i), (s = ty(s)), (c = Nn.get(c)) && jf(s, c), (d = d.createElement("link")), Nt(d));
					var y = d;
					((y._p = new Promise(function (x, M) {
						((y.onload = x), (y.onerror = M));
					})),
						Lt(d, "link", s),
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
		function L_(t, i) {
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
							0 < t.imgBytes && If === 0 && (If = 62500 * p_());
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
				t.unsuspend !== null && (t.count++, (Al = new Map()), i.forEach($_, t), (Al = null), Tl.call(t)));
		}
		function $_(t, i) {
			if (!(i.state.loading & 4)) {
				var r = Al.get(t);
				if (r) var s = r.get(null);
				else {
					((r = new Map()), Al.set(t, r));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var y = c[d];
						(y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
							(r.set(y.dataset.precedence, y), (s = y));
					}
					s && r.set(null, s);
				}
				((c = i.instance),
					(y = c.getAttribute("data-precedence")),
					(d = r.get(y) || s),
					d === s && r.set(null, c),
					r.set(y, c),
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
		var qu = { $$typeof: O, Provider: null, Consumer: null, _currentValue: G, _currentValue2: G, _threadCount: 0 };
		function B_(t, i, r, s, c, d, y, x, M) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = ko(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = ko(0)),
				(this.hiddenUpdates = ko(null)),
				(this.identifierPrefix = s),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = M),
				(this.incompleteTransitions = new Map()));
		}
		function V_(t, i, r, s, c, d, y, x, M, P, J, te) {
			return (
				(t = new B_(t, i, r, y, M, P, J, te, x)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = hn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = gc()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: s, isDehydrated: r, cache: i }),
				Sc(d),
				t
			);
		}
		function H_(t) {
			return t ? ((t = nr), t) : nr;
		}
		function uy(t, i, r, s, c, d) {
			((c = H_(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = xa(i)),
				(s.payload = { element: r }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(r = Ea(t, s, i)),
				r !== null && (nn(r, t, i), mu(r, t, i)));
		}
		function sy(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var r = t.retryLane;
				t.retryLane = r !== 0 && r < i ? r : i;
			}
		}
		function Uf(t, i) {
			(sy(t, i), (t = t.alternate) && sy(t, i));
		}
		function ly(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = ma(t, 67108864);
				(i !== null && nn(i, t, 67108864), Uf(t, 67108864));
			}
		}
		function oy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Rn();
				i = Rh(i);
				var r = ma(t, i);
				(r !== null && nn(r, t, i), Uf(t, i));
			}
		}
		var Ol = !0;
		function Z_(t, i, r, s) {
			var c = H.T;
			H.T = null;
			var d = $.p;
			try {
				(($.p = 2), Lf(t, i, r, s));
			} finally {
				(($.p = d), (H.T = c));
			}
		}
		function Q_(t, i, r, s) {
			var c = H.T;
			H.T = null;
			var d = $.p;
			try {
				(($.p = 8), Lf(t, i, r, s));
			} finally {
				(($.p = d), (H.T = c));
			}
		}
		function Lf(t, i, r, s) {
			if (Ol) {
				var c = $f(s);
				if (c === null) (Cf(t, i, s, Nl, r), fy(t, s));
				else if (Y_(c, t, i, r, s)) s.stopPropagation();
				else if ((fy(t, s), i & 4 && -1 < P_.indexOf(t))) {
					for (; c !== null; ) {
						var d = Qa(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = oa(d.pendingLanes);
										if (y !== 0) {
											var x = d;
											for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
												var M = 1 << (31 - fn(y));
												((x.entanglements[1] |= M), (y &= ~M));
											}
											(gi(d), (Ve & 6) === 0 && ((dl = Oe() + 500), Nu(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((x = ma(d, 2)), x !== null && nn(x, d, 2), ml(), Uf(d, 2));
							}
						if (((d = $f(s)), d === null && Cf(t, i, s, Nl, r), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Cf(t, i, s, null, r);
			}
		}
		function $f(t) {
			return ((t = Vo(t)), Bf(t));
		}
		var Nl = null;
		function Bf(t) {
			if (((Nl = null), (t = Za(t)), t !== null)) {
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
		function cy(t) {
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
					switch (kt()) {
						case Dt:
							return 2;
						case se:
							return 8;
						case ge:
						case Ht:
							return 32;
						case Jn:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Vf = !1,
			Fi = null,
			Ki = null,
			Gi = null,
			Iu = new Map(),
			Uu = new Map(),
			Xi = [],
			P_ =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function fy(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					Fi = null;
					break;
				case "dragenter":
				case "dragleave":
					Ki = null;
					break;
				case "mouseover":
				case "mouseout":
					Gi = null;
					break;
				case "pointerover":
				case "pointerout":
					Iu.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Uu.delete(i.pointerId);
			}
		}
		function Lu(t, i, r, s, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: r, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = Qa(i)), i !== null && ly(i)),
					t)
				: ((t.eventSystemFlags |= s), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Y_(t, i, r, s, c) {
			switch (i) {
				case "focusin":
					return ((Fi = Lu(Fi, t, i, r, s, c)), !0);
				case "dragenter":
					return ((Ki = Lu(Ki, t, i, r, s, c)), !0);
				case "mouseover":
					return ((Gi = Lu(Gi, t, i, r, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Iu.set(d, Lu(Iu.get(d) || null, t, i, r, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Uu.set(d, Lu(Uu.get(d) || null, t, i, r, s, c)), !0);
			}
			return !1;
		}
		function dy(t) {
			var i = Za(t.target);
			if (i !== null) {
				var r = f(i);
				if (r !== null) {
					if (((i = r.tag), i === 13)) {
						if (((i = h(r)), i !== null)) {
							((t.blockedOn = i),
								Nh(t.priority, function () {
									oy(r);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(r)), i !== null)) {
							((t.blockedOn = i),
								Nh(t.priority, function () {
									oy(r);
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
				var r = $f(t.nativeEvent);
				if (r === null) {
					r = t.nativeEvent;
					var s = new r.constructor(r.type, r);
					((Bo = s), r.target.dispatchEvent(s), (Bo = null));
				} else return ((i = Qa(r)), i !== null && ly(i), (t.blockedOn = r), !1);
				i.shift();
			}
			return !0;
		}
		function hy(t, i, r) {
			Ml(t) && r.delete(i);
		}
		function F_() {
			((Vf = !1),
				Fi !== null && Ml(Fi) && (Fi = null),
				Ki !== null && Ml(Ki) && (Ki = null),
				Gi !== null && Ml(Gi) && (Gi = null),
				Iu.forEach(hy),
				Uu.forEach(hy));
		}
		function zl(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), Vf || ((Vf = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, F_)));
		}
		var kl = null;
		function my(t) {
			kl !== t &&
				((kl = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					kl === t && (kl = null);
					for (var i = 0; i < t.length; i += 3) {
						var r = t[i],
							s = t[i + 1],
							c = t[i + 2];
						if (typeof s != "function") {
							if (Bf(s || r) === null) continue;
							break;
						}
						var d = Qa(r);
						d !== null &&
							(t.splice(i, 3), (i -= 3), $c(d, { pending: !0, data: c, method: r.method, action: s }, s, c));
					}
				}));
		}
		function Tr(t) {
			function i(M) {
				return zl(M, t);
			}
			(Fi !== null && zl(Fi, t), Ki !== null && zl(Ki, t), Gi !== null && zl(Gi, t), Iu.forEach(i), Uu.forEach(i));
			for (var r = 0; r < Xi.length; r++) {
				var s = Xi[r];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Xi.length && ((r = Xi[0]), r.blockedOn === null); ) (dy(r), r.blockedOn === null && Xi.shift());
			if (((r = (t.ownerDocument || t).$$reactFormReplay), r != null))
				for (s = 0; s < r.length; s += 3) {
					var c = r[s],
						d = r[s + 1],
						y = c[Gt] || null;
					if (typeof d == "function") y || my(r);
					else if (y) {
						var x = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[Gt] || null))) x = y.formAction;
							else if (Bf(c) !== null) continue;
						} else x = y.action;
						(typeof x == "function" ? (r[s + 1] = x) : (r.splice(s, 3), (s -= 3)), my(r));
					}
				}
		}
		function K_() {
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
		function Hf(t) {
			this._internalRoot = t;
		}
		((Zf.prototype.render = Hf.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(l(409));
				var r = i.current;
				uy(r, Rn(), t, i, null, null);
			}),
			(Zf.prototype.unmount = Hf.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(uy(t.current, 2, null, t, null, null), ml(), (i[Gr] = null));
					}
				}));
		function Zf(t) {
			this._internalRoot = t;
		}
		Zf.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = Oh();
				t = { blockedOn: null, target: t, priority: i };
				for (var r = 0; r < Xi.length && i !== 0 && i < Xi[r].priority; r++);
				(Xi.splice(r, 0, t), r === 0 && dy(t));
			}
		};
		var vy = a.version;
		if (vy !== "19.2.8") throw Error(l(527, vy, "19.2.8"));
		$.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(l(188)) : ((t = Object.keys(t).join(",")), Error(l(268, t)));
			return ((t = g(i)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var G_ = {
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
					((Fr = Dl.inject(G_)), (cn = Dl));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(l(299));
			var r = !1,
				s = "",
				c = Qw,
				d = Pw,
				y = Yw;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (r = !0),
					i.identifierPrefix !== void 0 && (s = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (y = i.onRecoverableError)),
				(i = V_(t, 1, !1, null, null, r, s, null, c, d, y, K_)),
				(t[Gr] = i.current),
				qg(t),
				new Hf(i)
			);
		};
	}),
	sE = zn((e, n) => {
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
		(a(), (n.exports = uE()));
	}),
	lE = sE(),
	be = wb,
	Sk = Yx(),
	oE = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
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
	qd =
		"Only the people added here and the organization owner can read this channel. Its copies in Files have separate sharing settings. File managers can share those copies, including later updates, with other people.",
	cE = "Someone with no name yet";
function zb(e) {
	return e !== null && e !== "" ? e : cE;
}
function fE(e, n) {
	const a = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (a === null) return null;
	const u = a[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function dE(e, n, a) {
	const u = n.toLowerCase();
	return e
		.filter((l) => l.userId !== a)
		.map((l) => ({ ...l, label: zb(l.displayName) }))
		.filter((l) => l.label.toLowerCase().includes(u))
		.sort((l, o) => l.label.localeCompare(o.label));
}
function hE(e, n, a, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(a)}`, caret: n + u.length + 2 };
}
function mE(e, n) {
	const a = [];
	for (const [u, l] of e) n.includes(`@${l}`) && a.push(u);
	return a;
}
function ro(e, n) {
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
function uo(e) {
	return e instanceof Error ? e.message : String(e);
}
var vE = zn((e) => {
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
	gE = zn((e, n) => {
		n.exports = vE();
	}),
	b = gE();
function Pn(e) {
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
function _i(e) {
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
function Je(e, n, ...a) {
	const u = Dr(n, ...(e.ready || e.refreshing ? a : ["skip"])),
		l = JSON.stringify([
			Qt(n),
			a,
			e.member?.hostUserId,
			e.member?.installationId,
			e.member?.generation,
			e.member?.membershipLifetime,
		]),
		[o, f] = (0, w.useState)({ key: l, value: e.refreshing ? void 0 : u }),
		h = e.refreshing ? (a[0] !== "skip" && o.key === l ? o.value : void 0) : u;
	return ((o.key !== l || o.value !== h) && f({ key: l, value: h }), h);
}
var Gu = Ob(),
	yd =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function qy(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(yd) ? n : (e.querySelector(yd) ?? e);
}
function Vr(e) {
	const n = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			l = n.current;
		return (
			(l === null ? null : qy(l))?.focus(),
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
					!u.isConnected || document.activeElement !== document.body || qy(u).focus();
				},
				o = (f) => {
					f.relatedTarget === null && queueMicrotask(l);
				};
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
		const o = [...l.querySelectorAll(yd)];
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
	return (0, Gu.createPortal)(
		(0, b.jsx)("div", {
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
										(0, b.jsx)("button", {
											type: "button",
											className: "button",
											onClick: e.onClose,
											children: "Close",
										}),
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
		}),
		document.body,
	);
}
var Iy;
function ne(e, n, a) {
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
			const p = g[_];
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
		for (const g of v._zod.deferred) g();
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
var jr = class extends Error {
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
function Da(e) {
	return (e && Object.assign(Fl, e), Fl);
}
function Db(e) {
	const n = Object.values(e).filter((a) => typeof a == "number");
	return Object.entries(e)
		.filter(([a, u]) => n.indexOf(+a) === -1)
		.map(([a, u]) => u);
}
function bd(e, n) {
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
function Ud(e) {
	return e == null;
}
function Ld(e) {
	const n = e.startsWith("^") ? 1 : 0,
		a = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, a);
}
function yE(e, n) {
	const a = e / n,
		u = Math.round(a),
		l = Number.EPSILON * Math.max(Math.abs(a), 1);
	return Math.abs(a - u) < l ? 0 : a - u;
}
var Uy = Symbol("evaluating");
function Ge(e, n, a) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== Uy) return (u === void 0 && ((u = Uy), (u = a())), u);
		},
		set(l) {
			Object.defineProperty(e, n, { value: l });
		},
		configurable: !0,
	});
}
function Ba(e, n, a) {
	Object.defineProperty(e, n, { value: a, writable: !0, enumerable: !0, configurable: !0 });
}
function ua(...e) {
	const n = {};
	for (const a of e) {
		const u = Object.getOwnPropertyDescriptors(a);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function Ly(e) {
	return JSON.stringify(e);
}
function bE(e) {
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
var pE = Id(() => {
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
var SE = new Set(["string", "number", "symbol"]);
function so(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function sa(e, n, a) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || a?.parent) && (u._zod.parent = e), u);
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
function wE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var _E = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function xE(e, n) {
	const a = e._zod.def,
		u = a.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return sa(
		e,
		ua(e._zod.def, {
			get shape() {
				const l = {};
				for (const o in n) {
					if (!(o in a.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (l[o] = a.shape[o]);
				}
				return (Ba(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function EE(e, n) {
	const a = e._zod.def,
		u = a.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return sa(
		e,
		ua(e._zod.def, {
			get shape() {
				const l = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in a.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete l[o];
				}
				return (Ba(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function CE(e, n) {
	if (!Xu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const a = e._zod.def.checks;
	if (a && a.length > 0) {
		const u = e._zod.def.shape;
		for (const l in n)
			if (Object.getOwnPropertyDescriptor(u, l) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return sa(
		e,
		ua(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (Ba(this, "shape", u), u);
			},
		}),
	);
}
function TE(e, n) {
	if (!Xu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return sa(
		e,
		ua(e._zod.def, {
			get shape() {
				const a = { ...e._zod.def.shape, ...n };
				return (Ba(this, "shape", a), a);
			},
		}),
	);
}
function AE(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return sa(
		e,
		ua(e._zod.def, {
			get shape() {
				const a = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (Ba(this, "shape", a), a);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function RE(e, n, a) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return sa(
		n,
		ua(n._zod.def, {
			get shape() {
				const l = n._zod.def.shape,
					o = { ...l };
				if (a)
					for (const f in a) {
						if (!(f in l)) throw new Error(`Unrecognized key: "${f}"`);
						a[f] && (o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f]);
					}
				else for (const f in l) o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f];
				return (Ba(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function OE(e, n, a) {
	return sa(
		n,
		ua(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					l = { ...u };
				if (a)
					for (const o in a) {
						if (!(o in l)) throw new Error(`Unrecognized key: "${o}"`);
						a[o] && (l[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) l[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Ba(this, "shape", l), l);
			},
		}),
	);
}
function zr(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let a = n; a < e.issues.length; a++) if (e.issues[a]?.continue !== !0) return !0;
	return !1;
}
function NE(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let a = n; a < e.issues.length; a++) if (e.issues[a]?.continue === !1) return !0;
	return !1;
}
function Ib(e, n) {
	return n.map((a) => {
		var u;
		return ((u = a).path ?? (u.path = []), a.path.unshift(e), a);
	});
}
function Il(e) {
	return typeof e == "string" ? e : e?.message;
}
function ja(e, n, a) {
	const u = e.message
			? e.message
			: (Il(e.inst?._zod.def?.error?.(e)) ??
				Il(n?.error?.(e)) ??
				Il(a.customError?.(e)) ??
				Il(a.localeError?.(e)) ??
				"Invalid input"),
		{ inst: l, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function $d(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Ju(...e) {
	const [n, a, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: a, inst: u } : { ...n };
}
var Ub = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, bd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Lb = ne("$ZodError", Ub),
	$b = ne("$ZodError", Ub, { Parent: Error });
function ME(e, n = (a) => a.message) {
	const a = {},
		u = [];
	for (const l of e.issues)
		l.path.length > 0 ? ((a[l.path[0]] = a[l.path[0]] || []), a[l.path[0]].push(n(l))) : u.push(n(l));
	return { formErrors: u, fieldErrors: a };
}
function zE(e, n = (a) => a.message) {
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
	return (u(e), a);
}
var Bd = (e) => (n, a, u, l) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: a, issues: [] }, o);
		if (f instanceof Promise) throw new jr();
		if (f.issues.length) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => ja(m, o, Da())));
			throw (jb(h, l?.callee), h);
		}
		return f.value;
	},
	Vd = (e) => async (n, a, u, l) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: a, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => ja(m, o, Da())));
			throw (jb(h, l?.callee), h);
		}
		return f.value;
	},
	lo = (e) => (n, a, u) => {
		const l = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: a, issues: [] }, l);
		if (o instanceof Promise) throw new jr();
		return o.issues.length
			? { success: !1, error: new (e ?? Lb)(o.issues.map((f) => ja(f, l, Da()))) }
			: { success: !0, data: o.value };
	},
	kE = lo($b),
	oo = (e) => async (n, a, u) => {
		const l = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: a, issues: [] }, l);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => ja(f, l, Da()))) }
				: { success: !0, data: o.value }
		);
	},
	DE = oo($b),
	jE = (e) => (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Bd(e)(n, a, l);
	},
	qE = (e) => (n, a, u) => Bd(e)(n, a, u),
	IE = (e) => async (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Vd(e)(n, a, l);
	},
	UE = (e) => async (n, a, u) => Vd(e)(n, a, u),
	LE = (e) => (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return lo(e)(n, a, l);
	},
	$E = (e) => (n, a, u) => lo(e)(n, a, u),
	BE = (e) => async (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return oo(e)(n, a, l);
	},
	VE = (e) => async (n, a, u) => oo(e)(n, a, u),
	HE = /^[cC][0-9a-z]{6,}$/,
	ZE = /^[0-9a-z]+$/,
	QE = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	PE = /^[0-9a-vA-V]{20}$/,
	YE = /^[A-Za-z0-9]{27}$/,
	FE = /^[a-zA-Z0-9_-]{21}$/,
	KE = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	GE = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	$y = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	XE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	JE = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function WE() {
	return new RegExp(JE, "u");
}
var eC =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	tC =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	nC =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	iC =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	aC = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Bb = /^[A-Za-z0-9_-]*$/,
	rC = /^https?$/,
	uC = /^\+[1-9]\d{6,14}$/,
	Vb =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	sC = new RegExp(`^${Vb}$`);
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
function lC(e) {
	return new RegExp(`^${Hb(e)}$`);
}
function oC(e) {
	const n = Hb({ precision: e.precision }),
		a = ["Z"];
	(e.local && a.push(""), e.offset && a.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${a.join("|")})`;
	return new RegExp(`^${Vb}T(?:${u})$`);
}
var cC = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	fC = /^-?\d+$/,
	dC = /^-?\d+(?:\.\d+)?$/,
	hC = /^[^A-Z]*$/,
	mC = /^[^a-z]*$/,
	ln = ne("$ZodCheck", (e, n) => {
		var a;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (a = e._zod).onattach ?? (a.onattach = []));
	}),
	Zb = { number: "number", bigint: "bigint", object: "date" },
	Qb = ne("$ZodCheckLessThan", (e, n) => {
		ln.init(e, n);
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
	Pb = ne("$ZodCheckGreaterThan", (e, n) => {
		ln.init(e, n);
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
	vC = ne("$ZodCheckMultipleOf", (e, n) => {
		(ln.init(e, n),
			e._zod.onattach.push((a) => {
				var u;
				(u = a._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (a) => {
				if (typeof a.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof a.value == "bigint" ? a.value % n.value === BigInt(0) : yE(a.value, n.value) === 0) ||
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
	gC = ne("$ZodCheckNumberFormat", (e, n) => {
		(ln.init(e, n), (n.format = n.format || "float64"));
		const a = n.format?.includes("int"),
			u = a ? "int" : "number",
			[l, o] = _E[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = l), (h.maximum = o), a && (h.pattern = fC));
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
	yC = ne("$ZodCheckMaxLength", (e, n) => {
		var a;
		(ln.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
					const l = u.value;
					return !Ud(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < l && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length <= n.maximum) return;
				const o = $d(l);
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
	bC = ne("$ZodCheckMinLength", (e, n) => {
		var a;
		(ln.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
					const l = u.value;
					return !Ud(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > l && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length >= n.minimum) return;
				const o = $d(l);
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
	pC = ne("$ZodCheckLengthEquals", (e, n) => {
		var a;
		(ln.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
					const l = u.value;
					return !Ud(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				((l.minimum = n.length), (l.maximum = n.length), (l.length = n.length));
			}),
			(e._zod.check = (u) => {
				const l = u.value,
					o = l.length;
				if (o === n.length) return;
				const f = $d(l),
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
	co = ne("$ZodCheckStringFormat", (e, n) => {
		var a, u;
		(ln.init(e, n),
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
	SC = ne("$ZodCheckRegex", (e, n) => {
		(co.init(e, n),
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
	wC = ne("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = hC), co.init(e, n));
	}),
	_C = ne("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = mC), co.init(e, n));
	}),
	xC = ne("$ZodCheckIncludes", (e, n) => {
		ln.init(e, n);
		const a = so(n.includes),
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
	EC = ne("$ZodCheckStartsWith", (e, n) => {
		ln.init(e, n);
		const a = new RegExp(`^${so(n.prefix)}.*`);
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
	CC = ne("$ZodCheckEndsWith", (e, n) => {
		ln.init(e, n);
		const a = new RegExp(`.*${so(n.suffix)}$`);
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
	TC = ne("$ZodCheckOverwrite", (e, n) => {
		(ln.init(e, n),
			(e._zod.check = (a) => {
				a.value = n.tx(a.value);
			}));
	}),
	AC = class {
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
	RC = { major: 4, minor: 4, patch: 3 },
	Ct = ne("$ZodType", (e, n) => {
		var a;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = RC));
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
					let v = zr(f),
						g;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (NE(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const p = f.issues.length,
							S = _._zod.check(f);
						if (S instanceof Promise && m?.async === !1) throw new jr();
						if (g || S instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await S, f.issues.length !== p && (v || (v = zr(f, p))));
							});
						else {
							if (f.issues.length === p) continue;
							v || (v = zr(f, p));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (zr(f)) return ((f.aborted = !0), f);
					const v = l(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new jr();
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
					if (h.async === !1) throw new jr();
					return m.then((v) => l(v, u, h));
				}
				return l(m, u, h);
			};
		}
		Ge(e, "~standard", () => ({
			validate: (l) => {
				try {
					const o = kE(e, l);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return DE(e, l).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	Hd = ne("$ZodString", (e, n) => {
		(Ct.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? cC(e._zod.bag)),
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
	ut = ne("$ZodStringFormat", (e, n) => {
		(co.init(e, n), Hd.init(e, n));
	}),
	OC = ne("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = GE), ut.init(e, n));
	}),
	NC = ne("$ZodUUID", (e, n) => {
		if (n.version) {
			const a = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (a === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = $y(a));
		} else n.pattern ?? (n.pattern = $y());
		ut.init(e, n);
	}),
	MC = ne("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = XE), ut.init(e, n));
	}),
	zC = ne("$ZodURL", (e, n) => {
		(ut.init(e, n),
			(e._zod.check = (a) => {
				try {
					const u = a.value.trim();
					if (!n.normalize && n.protocol?.source === rC.source && !/^https?:\/\//i.test(u)) {
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
	kC = ne("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = WE()), ut.init(e, n));
	}),
	DC = ne("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = FE), ut.init(e, n));
	}),
	jC = ne("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = HE), ut.init(e, n));
	}),
	qC = ne("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = ZE), ut.init(e, n));
	}),
	IC = ne("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = QE), ut.init(e, n));
	}),
	UC = ne("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = PE), ut.init(e, n));
	}),
	LC = ne("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = YE), ut.init(e, n));
	}),
	$C = ne("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = oC(n)), ut.init(e, n));
	}),
	BC = ne("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = sC), ut.init(e, n));
	}),
	VC = ne("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = lC(n)), ut.init(e, n));
	}),
	HC = ne("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = KE), ut.init(e, n));
	}),
	ZC = ne("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = eC), ut.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	QC = ne("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = tC),
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
	PC = ne("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = nC), ut.init(e, n));
	}),
	YC = ne("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = iC),
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
var FC = ne("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = aC),
		ut.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (a) => {
			Yb(a.value) ||
				a.issues.push({ code: "invalid_format", format: "base64", input: a.value, inst: e, continue: !n.abort });
		}));
});
function KC(e) {
	if (!Bb.test(e)) return !1;
	const n = e.replace(/[-_]/g, (a) => (a === "-" ? "+" : "/"));
	return Yb(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var GC = ne("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Bb),
			ut.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (a) => {
				KC(a.value) ||
					a.issues.push({ code: "invalid_format", format: "base64url", input: a.value, inst: e, continue: !n.abort });
			}));
	}),
	XC = ne("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = uC), ut.init(e, n));
	});
function JC(e, n = null) {
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
var WC = ne("$ZodJWT", (e, n) => {
		(ut.init(e, n),
			(e._zod.check = (a) => {
				JC(a.value, n.alg) ||
					a.issues.push({ code: "invalid_format", format: "jwt", input: a.value, inst: e, continue: !n.abort });
			}));
	}),
	Fb = ne("$ZodNumber", (e, n) => {
		(Ct.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? dC),
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
	eT = ne("$ZodNumberFormat", (e, n) => {
		(gC.init(e, n), Fb.init(e, n));
	}),
	tT = ne("$ZodUnknown", (e, n) => {
		(Ct.init(e, n), (e._zod.parse = (a) => a));
	}),
	nT = ne("$ZodNever", (e, n) => {
		(Ct.init(e, n),
			(e._zod.parse = (a, u) => (
				a.issues.push({ expected: "never", code: "invalid_type", input: a.value, inst: e }),
				a
			)));
	});
function By(e, n, a) {
	(e.issues.length && n.issues.push(...Ib(a, e.issues)), (n.value[a] = e.value));
}
var iT = ne("$ZodArray", (e, n) => {
	(Ct.init(e, n),
		(e._zod.parse = (a, u) => {
			const l = a.value;
			if (!Array.isArray(l)) return (a.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), a);
			a.value = Array(l.length);
			const o = [];
			for (let f = 0; f < l.length; f++) {
				const h = l[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => By(v, a, f))) : By(m, a, f);
			}
			return o.length ? Promise.all(o).then(() => a) : a;
		}));
});
function Gl(e, n, a, u, l, o) {
	const f = a in u;
	if (e.issues.length) {
		if (l && o && !f) return;
		n.issues.push(...Ib(a, e.issues));
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
	const a = wE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(a) };
}
function Gb(e, n, a, u, l, o) {
	const f = [],
		h = l.keySet,
		m = l.catchall._zod,
		v = m.def.type,
		g = m.optin === "optional",
		_ = m.optout === "optional";
	for (const p in n) {
		if (p === "__proto__" || h.has(p)) continue;
		if (v === "never") {
			f.push(p);
			continue;
		}
		const S = m.run({ value: n[p], issues: [] }, u);
		S instanceof Promise ? e.push(S.then((E) => Gl(E, a, p, n, g, _))) : Gl(S, a, p, n, g, _);
	}
	return (
		f.length && a.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => a) : a
	);
}
var aT = ne("$ZodObject", (e, n) => {
		if ((Ct.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const a = Id(() => Kb(n));
		Ge(e._zod, "propValues", () => {
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
		const u = Kl,
			l = n.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = a.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				g = o.shape;
			for (const _ of o.keys) {
				const p = g[_],
					S = p._zod.optin === "optional",
					E = p._zod.optout === "optional",
					C = p._zod.run({ value: m[_], issues: [] }, h);
				C instanceof Promise ? v.push(C.then((A) => Gl(A, f, _, m, S, E))) : Gl(C, f, _, m, S, E);
			}
			return l ? Gb(v, m, f, h, a.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	rT = ne("$ZodObjectJIT", (e, n) => {
		aT.init(e, n);
		const a = e._zod.parse,
			u = Id(() => Kb(n)),
			l = (p) => {
				const S = new AC(["shape", "payload", "ctx"]),
					E = u.value,
					C = (R) => {
						const O = Ly(R);
						return `shape[${O}]._zod.run({ value: input[${O}], issues: [] }, ctx)`;
					};
				S.write("const input = payload.value;");
				const A = Object.create(null);
				let D = 0;
				for (const R of E.keys) A[R] = `key_${D++}`;
				S.write("const newResult = {};");
				for (const R of E.keys) {
					const O = A[R],
						I = Ly(R),
						L = p[R],
						j = L?._zod?.optin === "optional",
						k = L?._zod?.optout === "optional";
					(S.write(`const ${O} = ${C(R)};`),
						j && k
							? S.write(`
        if (${O}.issues.length) {
          if (${I} in input) {
            payload.issues = payload.issues.concat(${O}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${I}, ...iss.path] : [${I}]
            })));
          }
        }
        
        if (${O}.value === undefined) {
          if (${I} in input) {
            newResult[${I}] = undefined;
          }
        } else {
          newResult[${I}] = ${O}.value;
        }
        
      `)
							: j
								? S.write(`
        if (${O}.issues.length) {
          payload.issues = payload.issues.concat(${O}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${I}, ...iss.path] : [${I}]
          })));
        }
        
        if (${O}.value === undefined) {
          if (${I} in input) {
            newResult[${I}] = undefined;
          }
        } else {
          newResult[${I}] = ${O}.value;
        }
        
      `)
								: S.write(`
        const ${O}_present = ${I} in input;
        if (${O}.issues.length) {
          payload.issues = payload.issues.concat(${O}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${I}, ...iss.path] : [${I}]
          })));
        }
        if (!${O}_present && !${O}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${I}]
          });
        }

        if (${O}_present) {
          if (${O}.value === undefined) {
            newResult[${I}] = undefined;
          } else {
            newResult[${I}] = ${O}.value;
          }
        }

      `));
				}
				(S.write("payload.value = newResult;"), S.write("return payload;"));
				const T = S.compile();
				return (R, O) => T(p, R, O);
			};
		let o;
		const f = Kl,
			h = !Fl.jitless,
			v = h && pE.value,
			g = n.catchall;
		let _;
		e._zod.parse = (p, S) => {
			_ ?? (_ = u.value);
			const E = p.value;
			return f(E)
				? h && v && S?.async === !1 && S.jitless !== !0
					? (o || (o = l(n.shape)), (p = o(p, S)), g ? Gb([], E, p, S, _, e) : p)
					: a(p, S)
				: (p.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), p);
		};
	});
function Vy(e, n, a, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const l = e.filter((o) => !zr(o));
	return l.length === 1
		? ((n.value = l[0].value), l[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: a,
				errors: e.map((o) => o.issues.map((f) => ja(f, u, Da()))),
			}),
			n);
}
var uT = ne("$ZodUnion", (e, n) => {
		(Ct.init(e, n),
			Ge(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			Ge(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			Ge(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			Ge(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => Ld(l.source)).join("|")})$`);
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
			return o ? Promise.all(f).then((h) => Vy(h, u, e, l)) : Vy(f, u, e, l);
		};
	}),
	sT = ne("$ZodIntersection", (e, n) => {
		(Ct.init(e, n),
			(e._zod.parse = (a, u) => {
				const l = a.value,
					o = n.left._zod.run({ value: l, issues: [] }, u),
					f = n.right._zod.run({ value: l, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Hy(a, h, m))
					: Hy(a, o, f);
			}));
	});
function pd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (Xu(e) && Xu(n)) {
		const a = Object.keys(n),
			u = Object.keys(e).filter((o) => a.indexOf(o) !== -1),
			l = { ...e, ...n };
		for (const o of u) {
			const f = pd(e[o], n[o]);
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
				f = pd(l, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			a.push(f.data);
		}
		return { valid: !0, data: a };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Hy(e, n, a) {
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
	if ((o.length && l && e.issues.push({ ...l, keys: o }), zr(e))) return e;
	const f = pd(n.value, a.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var lT = ne("$ZodEnum", (e, n) => {
		Ct.init(e, n);
		const a = Db(n.entries),
			u = new Set(a);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${a
					.filter((l) => SE.has(typeof l))
					.map((l) => (typeof l == "string" ? so(l) : l.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (l, o) => {
				const f = l.value;
				return (u.has(f) || l.issues.push({ code: "invalid_value", values: a, input: f, inst: e }), l);
			}));
	}),
	oT = ne("$ZodTransform", (e, n) => {
		(Ct.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") throw new kb(e.constructor.name);
				const l = n.transform(a.value, a);
				if (u.async)
					return (l instanceof Promise ? l : Promise.resolve(l)).then((o) => ((a.value = o), (a.fallback = !0), a));
				if (l instanceof Promise) throw new jr();
				return ((a.value = l), (a.fallback = !0), a);
			}));
	});
function Zy(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Xb = ne("$ZodOptional", (e, n) => {
		(Ct.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			Ge(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			Ge(e._zod, "pattern", () => {
				const a = n.innerType._zod.pattern;
				return a ? new RegExp(`^(${Ld(a.source)})?$`) : void 0;
			}),
			(e._zod.parse = (a, u) => {
				if (n.innerType._zod.optin === "optional") {
					const l = a.value,
						o = n.innerType._zod.run(a, u);
					return o instanceof Promise ? o.then((f) => Zy(f, l)) : Zy(o, l);
				}
				return a.value === void 0 ? a : n.innerType._zod.run(a, u);
			}));
	}),
	cT = ne("$ZodExactOptional", (e, n) => {
		(Xb.init(e, n),
			Ge(e._zod, "values", () => n.innerType._zod.values),
			Ge(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (a, u) => n.innerType._zod.run(a, u)));
	}),
	fT = ne("$ZodNullable", (e, n) => {
		(Ct.init(e, n),
			Ge(e._zod, "optin", () => n.innerType._zod.optin),
			Ge(e._zod, "optout", () => n.innerType._zod.optout),
			Ge(e._zod, "pattern", () => {
				const a = n.innerType._zod.pattern;
				return a ? new RegExp(`^(${Ld(a.source)}|null)$`) : void 0;
			}),
			Ge(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (a, u) => (a.value === null ? a : n.innerType._zod.run(a, u))));
	}),
	dT = ne("$ZodDefault", (e, n) => {
		(Ct.init(e, n),
			(e._zod.optin = "optional"),
			Ge(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(a, u);
				if (a.value === void 0) return ((a.value = n.defaultValue), a);
				const l = n.innerType._zod.run(a, u);
				return l instanceof Promise ? l.then((o) => Qy(o, n)) : Qy(l, n);
			}));
	});
function Qy(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var hT = ne("$ZodPrefault", (e, n) => {
		(Ct.init(e, n),
			(e._zod.optin = "optional"),
			Ge(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => (
				u.direction === "backward" || (a.value === void 0 && (a.value = n.defaultValue)),
				n.innerType._zod.run(a, u)
			)));
	}),
	mT = ne("$ZodNonOptional", (e, n) => {
		(Ct.init(e, n),
			Ge(e._zod, "values", () => {
				const a = n.innerType._zod.values;
				return a ? new Set([...a].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (a, u) => {
				const l = n.innerType._zod.run(a, u);
				return l instanceof Promise ? l.then((o) => Py(o, e)) : Py(l, e);
			}));
	});
function Py(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var vT = ne("$ZodCatch", (e, n) => {
		(Ct.init(e, n),
			(e._zod.optin = "optional"),
			Ge(e._zod, "optout", () => n.innerType._zod.optout),
			Ge(e._zod, "values", () => n.innerType._zod.values),
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
										error: { issues: o.issues.map((f) => ja(f, u, Da())) },
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
								error: { issues: l.issues.map((o) => ja(o, u, Da())) },
								input: a.value,
							})),
							(a.issues = []),
							(a.fallback = !0)),
						a);
			}));
	}),
	gT = ne("$ZodPipe", (e, n) => {
		(Ct.init(e, n),
			Ge(e._zod, "values", () => n.in._zod.values),
			Ge(e._zod, "optin", () => n.in._zod.optin),
			Ge(e._zod, "optout", () => n.out._zod.optout),
			Ge(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(a, u);
					return o instanceof Promise ? o.then((f) => Ul(f, n.in, u)) : Ul(o, n.in, u);
				}
				const l = n.in._zod.run(a, u);
				return l instanceof Promise ? l.then((o) => Ul(o, n.out, u)) : Ul(l, n.out, u);
			}));
	});
function Ul(e, n, a) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, a);
}
var yT = ne("$ZodReadonly", (e, n) => {
	(Ct.init(e, n),
		Ge(e._zod, "propValues", () => n.innerType._zod.propValues),
		Ge(e._zod, "values", () => n.innerType._zod.values),
		Ge(e._zod, "optin", () => n.innerType?._zod?.optin),
		Ge(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (a, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(a, u);
			const l = n.innerType._zod.run(a, u);
			return l instanceof Promise ? l.then(Yy) : Yy(l);
		}));
});
function Yy(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var bT = ne("$ZodCustom", (e, n) => {
	(ln.init(e, n),
		Ct.init(e, n),
		(e._zod.parse = (a, u) => a),
		(e._zod.check = (a) => {
			const u = a.value,
				l = n.fn(u);
			if (l instanceof Promise) return l.then((o) => Fy(o, a, u, e));
			Fy(l, a, u, e);
		}));
});
function Fy(e, n, a, u) {
	if (!e) {
		const l = { code: "custom", input: a, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (l.params = u._zod.def.params), n.issues.push(Ju(l)));
	}
}
var Ky,
	pT = class {
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
function ST() {
	return new pT();
}
(Ky = globalThis).__zod_globalRegistry ?? (Ky.__zod_globalRegistry = ST());
var Vu = globalThis.__zod_globalRegistry;
function wT(e, n) {
	return new e({ type: "string", ...pe(n) });
}
function _T(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...pe(n) });
}
function Gy(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...pe(n) });
}
function xT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...pe(n) });
}
function ET(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...pe(n) });
}
function CT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...pe(n) });
}
function TT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...pe(n) });
}
function AT(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...pe(n) });
}
function RT(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...pe(n) });
}
function OT(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...pe(n) });
}
function NT(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...pe(n) });
}
function MT(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...pe(n) });
}
function zT(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...pe(n) });
}
function kT(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...pe(n) });
}
function DT(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...pe(n) });
}
function jT(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...pe(n) });
}
function qT(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...pe(n) });
}
function IT(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...pe(n) });
}
function UT(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...pe(n) });
}
function LT(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...pe(n) });
}
function $T(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...pe(n) });
}
function BT(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...pe(n) });
}
function VT(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...pe(n) });
}
function HT(e, n) {
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
function ZT(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...pe(n) });
}
function QT(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...pe(n) });
}
function PT(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...pe(n) });
}
function YT(e, n) {
	return new e({ type: "number", checks: [], ...pe(n) });
}
function FT(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...pe(n) });
}
function KT(e) {
	return new e({ type: "unknown" });
}
function GT(e, n) {
	return new e({ type: "never", ...pe(n) });
}
function Xy(e, n) {
	return new Qb({ check: "less_than", ...pe(n), value: e, inclusive: !1 });
}
function Wf(e, n) {
	return new Qb({ check: "less_than", ...pe(n), value: e, inclusive: !0 });
}
function Jy(e, n) {
	return new Pb({ check: "greater_than", ...pe(n), value: e, inclusive: !1 });
}
function ed(e, n) {
	return new Pb({ check: "greater_than", ...pe(n), value: e, inclusive: !0 });
}
function Wy(e, n) {
	return new vC({ check: "multiple_of", ...pe(n), value: e });
}
function Jb(e, n) {
	return new yC({ check: "max_length", ...pe(n), maximum: e });
}
function Xl(e, n) {
	return new bC({ check: "min_length", ...pe(n), minimum: e });
}
function Wb(e, n) {
	return new pC({ check: "length_equals", ...pe(n), length: e });
}
function XT(e, n) {
	return new SC({ check: "string_format", format: "regex", ...pe(n), pattern: e });
}
function JT(e) {
	return new wC({ check: "string_format", format: "lowercase", ...pe(e) });
}
function WT(e) {
	return new _C({ check: "string_format", format: "uppercase", ...pe(e) });
}
function eA(e, n) {
	return new xC({ check: "string_format", format: "includes", ...pe(n), includes: e });
}
function tA(e, n) {
	return new EC({ check: "string_format", format: "starts_with", ...pe(n), prefix: e });
}
function nA(e, n) {
	return new CC({ check: "string_format", format: "ends_with", ...pe(n), suffix: e });
}
function Hr(e) {
	return new TC({ check: "overwrite", tx: e });
}
function iA(e) {
	return Hr((n) => n.normalize(e));
}
function aA() {
	return Hr((e) => e.trim());
}
function rA() {
	return Hr((e) => e.toLowerCase());
}
function uA() {
	return Hr((e) => e.toUpperCase());
}
function sA() {
	return Hr((e) => bE(e));
}
function lA(e, n, a) {
	return new e({ type: "array", element: n, ...pe(a) });
}
function oA(e, n, a) {
	return new e({ type: "custom", check: "custom", fn: n, ...pe(a) });
}
function cA(e, n) {
	const a = fA(
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
function fA(e, n) {
	const a = new ln({ check: "custom", ...pe(n) });
	return ((a._zod.check = e), a);
}
function ep(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? Vu,
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
function Vt(e, n, a = { path: [], schemaPath: [] }) {
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
		const g = e._zod.parent;
		g && (f.ref || (f.ref = g), Vt(g, n, v), (n.seen.get(g).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		n.io === "input" && Ft(e) && (delete f.schema.examples, delete f.schema.default),
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
				const g = e.external.registry.get(f[0])?.id,
					_ = e.external.uri ?? ((S) => S);
				if (g) return { ref: _(g) };
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
function np(e, n) {
	const a = e.seen.get(n);
	if (!a) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const v = m.def ?? m.schema,
			g = { ...v },
			_ = m.ref;
		if (((m.ref = null), _)) {
			u(_);
			const S = e.seen.get(_),
				E = S.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(E))
					: Object.assign(v, E),
				Object.assign(v, g),
				h._zod.parent === _)
			)
				for (const C in v) C === "$ref" || C === "allOf" || C in g || delete v[C];
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
function Ft(e, n) {
	const a = n ?? { seen: new Set() };
	if (a.seen.has(e)) return !1;
	a.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Ft(u.element, a);
	if (u.type === "set") return Ft(u.valueType, a);
	if (u.type === "lazy") return Ft(u.getter(), a);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Ft(u.innerType, a);
	if (u.type === "intersection") return Ft(u.left, a) || Ft(u.right, a);
	if (u.type === "record" || u.type === "map") return Ft(u.keyType, a) || Ft(u.valueType, a);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Ft(u.in, a) || Ft(u.out, a);
	if (u.type === "object") {
		for (const l in u.shape) if (Ft(u.shape[l], a)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const l of u.options) if (Ft(l, a)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const l of u.items) if (Ft(l, a)) return !0;
		return !!(u.rest && Ft(u.rest, a));
	}
	return !1;
}
var dA =
		(e, n = {}) =>
		(a) => {
			const u = ep({ ...a, processors: n });
			return (Vt(e, u), tp(u, e), np(u, e));
		},
	Jl =
		(e, n, a = {}) =>
		(u) => {
			const { libraryOptions: l, target: o } = u ?? {},
				f = ep({ ...(l ?? {}), target: o, io: n, processors: a });
			return (Vt(e, f), tp(f, e), np(f, e));
		},
	hA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	mA = (e, n, a, u) => {
		const l = a;
		l.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (l.minLength = o),
			typeof f == "number" && (l.maxLength = f),
			h && ((l.format = hA[h] ?? h), l.format === "" && delete l.format, h === "time" && delete l.format),
			v && (l.contentEncoding = v),
			m && m.size > 0)
		) {
			const g = [...m];
			g.length === 1
				? (l.pattern = g[0].source)
				: g.length > 1 &&
					(l.allOf = [
						...g.map((_) => ({
							...(n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: _.source,
						})),
					]);
		}
	},
	vA = (e, n, a, u) => {
		const l = a,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: g } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (l.type = "integer") : (l.type = "number");
		const _ = typeof g == "number" && g >= (o ?? Number.NEGATIVE_INFINITY),
			p = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			S = n.target === "draft-04" || n.target === "openapi-3.0";
		(_
			? S
				? ((l.minimum = g), (l.exclusiveMinimum = !0))
				: (l.exclusiveMinimum = g)
			: typeof o == "number" && (l.minimum = o),
			p
				? S
					? ((l.maximum = v), (l.exclusiveMaximum = !0))
					: (l.exclusiveMaximum = v)
				: typeof f == "number" && (l.maximum = f),
			typeof m == "number" && (l.multipleOf = m));
	},
	gA = (e, n, a, u) => {
		a.not = {};
	},
	yA = (e, n, a, u) => {},
	bA = (e, n, a, u) => {
		const l = e._zod.def,
			o = Db(l.entries);
		(o.every((f) => typeof f == "number") && (a.type = "number"),
			o.every((f) => typeof f == "string") && (a.type = "string"),
			(a.enum = o));
	},
	pA = (e, n, a, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	SA = (e, n, a, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	wA = (e, n, a, u) => {
		const l = a,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (l.minItems = f),
			typeof h == "number" && (l.maxItems = h),
			(l.type = "array"),
			(l.items = Vt(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	_A = (e, n, a, u) => {
		const l = a,
			o = e._zod.def;
		((l.type = "object"), (l.properties = {}));
		const f = o.shape;
		for (const v in f) l.properties[v] = Vt(f[v], n, { ...u, path: [...u.path, "properties", v] });
		const h = new Set(Object.keys(f)),
			m = new Set(
				[...h].filter((v) => {
					const g = o.shape[v]._zod;
					return n.io === "input" ? g.optin === void 0 : g.optout === void 0;
				}),
			);
		(m.size > 0 && (l.required = Array.from(m)),
			o.catchall?._zod.def.type === "never"
				? (l.additionalProperties = !1)
				: o.catchall
					? o.catchall &&
						(l.additionalProperties = Vt(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (l.additionalProperties = !1));
	},
	xA = (e, n, a, u) => {
		const l = e._zod.def,
			o = l.inclusive === !1,
			f = l.options.map((h, m) => Vt(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (a.oneOf = f) : (a.anyOf = f);
	},
	EA = (e, n, a, u) => {
		const l = e._zod.def,
			o = Vt(l.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Vt(l.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		a.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	CA = (e, n, a, u) => {
		const l = e._zod.def,
			o = Vt(l.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = l.innerType), (a.nullable = !0)) : (a.anyOf = [o, { type: "null" }]);
	},
	TA = (e, n, a, u) => {
		const l = e._zod.def;
		Vt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	AA = (e, n, a, u) => {
		const l = e._zod.def;
		Vt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (a.default = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	RA = (e, n, a, u) => {
		const l = e._zod.def;
		Vt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), n.io === "input" && (a._prefault = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	OA = (e, n, a, u) => {
		const l = e._zod.def;
		Vt(l.innerType, n, u);
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
	NA = (e, n, a, u) => {
		const l = e._zod.def,
			o = l.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? l.out : l.in) : l.out;
		Vt(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	MA = (e, n, a, u) => {
		const l = e._zod.def;
		Vt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (a.readOnly = !0));
	},
	ip = (e, n, a, u) => {
		const l = e._zod.def;
		Vt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	zA = ne("ZodISODateTime", (e, n) => {
		($C.init(e, n), lt.init(e, n));
	});
function kA(e) {
	return HT(zA, e);
}
var DA = ne("ZodISODate", (e, n) => {
	(BC.init(e, n), lt.init(e, n));
});
function jA(e) {
	return ZT(DA, e);
}
var qA = ne("ZodISOTime", (e, n) => {
	(VC.init(e, n), lt.init(e, n));
});
function IA(e) {
	return QT(qA, e);
}
var UA = ne("ZodISODuration", (e, n) => {
	(HC.init(e, n), lt.init(e, n));
});
function LA(e) {
	return PT(UA, e);
}
var $A = (e, n) => {
		(Lb.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (a) => zE(e, a) },
				flatten: { value: (a) => ME(e, a) },
				addIssue: {
					value: (a) => {
						(e.issues.push(a), (e.message = JSON.stringify(e.issues, bd, 2)));
					},
				},
				addIssues: {
					value: (a) => {
						(e.issues.push(...a), (e.message = JSON.stringify(e.issues, bd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	kn = ne("ZodError", $A, { Parent: Error }),
	BA = Bd(kn),
	VA = Vd(kn),
	HA = lo(kn),
	ZA = oo(kn),
	QA = jE(kn),
	PA = qE(kn),
	YA = IE(kn),
	FA = UE(kn),
	KA = LE(kn),
	GA = $E(kn),
	XA = BE(kn),
	JA = VE(kn),
	e0 = new WeakMap();
function is(e, n, a) {
	const u = Object.getPrototypeOf(e);
	let l = e0.get(u);
	if ((l || ((l = new Set()), e0.set(u, l)), !l.has(n))) {
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
var Tt = ne(
		"ZodType",
		(e, n) => (
			Ct.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: Jl(e, "input"), output: Jl(e, "output") } }),
			(e.toJSONSchema = dA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (a, u) => BA(e, a, u, { callee: e.parse })),
			(e.safeParse = (a, u) => HA(e, a, u)),
			(e.parseAsync = async (a, u) => VA(e, a, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (a, u) => ZA(e, a, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (a, u) => QA(e, a, u)),
			(e.decode = (a, u) => PA(e, a, u)),
			(e.encodeAsync = async (a, u) => YA(e, a, u)),
			(e.decodeAsync = async (a, u) => FA(e, a, u)),
			(e.safeEncode = (a, u) => KA(e, a, u)),
			(e.safeDecode = (a, u) => GA(e, a, u)),
			(e.safeEncodeAsync = async (a, u) => XA(e, a, u)),
			(e.safeDecodeAsync = async (a, u) => JA(e, a, u)),
			is(e, "ZodType", {
				check(...a) {
					const u = this.def;
					return this.clone(
						ua(u, {
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
					return sa(this, a, u);
				},
				brand() {
					return this;
				},
				register(a, u) {
					return (a.add(this, u), this);
				},
				refine(a, u) {
					return this.check(YR(a, u));
				},
				superRefine(a, u) {
					return this.check(FR(a, u));
				},
				overwrite(a) {
					return this.check(Hr(a));
				},
				optional() {
					return r0(this);
				},
				exactOptional() {
					return DR(this);
				},
				nullable() {
					return u0(this);
				},
				nullish() {
					return r0(u0(this));
				},
				nonoptional(a) {
					return $R(this, a);
				},
				array() {
					return xR(this);
				},
				or(a) {
					return AR([this, a]);
				},
				and(a) {
					return OR(this, a);
				},
				transform(a) {
					return s0(this, zR(a));
				},
				default(a) {
					return IR(this, a);
				},
				prefault(a) {
					return LR(this, a);
				},
				catch(a) {
					return VR(this, a);
				},
				pipe(a) {
					return s0(this, a);
				},
				readonly() {
					return QR(this);
				},
				describe(a) {
					const u = this.clone();
					return (Vu.add(u, { description: a }), u);
				},
				meta(...a) {
					if (a.length === 0) return Vu.get(this);
					const u = this.clone();
					return (Vu.add(u, a[0]), u);
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
					return Vu.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	ap = ne("_ZodString", (e, n) => {
		(Hd.init(e, n), Tt.init(e, n), (e._zod.processJSONSchema = (u, l, o) => mA(e, u, l, o)));
		const a = e._zod.bag;
		((e.format = a.format ?? null),
			(e.minLength = a.minimum ?? null),
			(e.maxLength = a.maximum ?? null),
			is(e, "_ZodString", {
				regex(...u) {
					return this.check(XT(...u));
				},
				includes(...u) {
					return this.check(eA(...u));
				},
				startsWith(...u) {
					return this.check(tA(...u));
				},
				endsWith(...u) {
					return this.check(nA(...u));
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
					return this.check(JT(u));
				},
				uppercase(u) {
					return this.check(WT(u));
				},
				trim() {
					return this.check(aA());
				},
				normalize(...u) {
					return this.check(iA(...u));
				},
				toLowerCase() {
					return this.check(rA());
				},
				toUpperCase() {
					return this.check(uA());
				},
				slugify() {
					return this.check(sA());
				},
			}));
	}),
	WA = ne("ZodString", (e, n) => {
		(Hd.init(e, n),
			ap.init(e, n),
			(e.email = (a) => e.check(_T(tR, a))),
			(e.url = (a) => e.check(AT(nR, a))),
			(e.jwt = (a) => e.check(VT(yR, a))),
			(e.emoji = (a) => e.check(RT(iR, a))),
			(e.guid = (a) => e.check(Gy(t0, a))),
			(e.uuid = (a) => e.check(xT(Ll, a))),
			(e.uuidv4 = (a) => e.check(ET(Ll, a))),
			(e.uuidv6 = (a) => e.check(CT(Ll, a))),
			(e.uuidv7 = (a) => e.check(TT(Ll, a))),
			(e.nanoid = (a) => e.check(OT(aR, a))),
			(e.guid = (a) => e.check(Gy(t0, a))),
			(e.cuid = (a) => e.check(NT(rR, a))),
			(e.cuid2 = (a) => e.check(MT(uR, a))),
			(e.ulid = (a) => e.check(zT(sR, a))),
			(e.base64 = (a) => e.check(LT(mR, a))),
			(e.base64url = (a) => e.check($T(vR, a))),
			(e.xid = (a) => e.check(kT(lR, a))),
			(e.ksuid = (a) => e.check(DT(oR, a))),
			(e.ipv4 = (a) => e.check(jT(cR, a))),
			(e.ipv6 = (a) => e.check(qT(fR, a))),
			(e.cidrv4 = (a) => e.check(IT(dR, a))),
			(e.cidrv6 = (a) => e.check(UT(hR, a))),
			(e.e164 = (a) => e.check(BT(gR, a))),
			(e.datetime = (a) => e.check(kA(a))),
			(e.date = (a) => e.check(jA(a))),
			(e.time = (a) => e.check(IA(a))),
			(e.duration = (a) => e.check(LA(a))));
	});
function eR(e) {
	return wT(WA, e);
}
var lt = ne("ZodStringFormat", (e, n) => {
		(ut.init(e, n), ap.init(e, n));
	}),
	tR = ne("ZodEmail", (e, n) => {
		(MC.init(e, n), lt.init(e, n));
	}),
	t0 = ne("ZodGUID", (e, n) => {
		(OC.init(e, n), lt.init(e, n));
	}),
	Ll = ne("ZodUUID", (e, n) => {
		(NC.init(e, n), lt.init(e, n));
	}),
	nR = ne("ZodURL", (e, n) => {
		(zC.init(e, n), lt.init(e, n));
	}),
	iR = ne("ZodEmoji", (e, n) => {
		(kC.init(e, n), lt.init(e, n));
	}),
	aR = ne("ZodNanoID", (e, n) => {
		(DC.init(e, n), lt.init(e, n));
	}),
	rR = ne("ZodCUID", (e, n) => {
		(jC.init(e, n), lt.init(e, n));
	}),
	uR = ne("ZodCUID2", (e, n) => {
		(qC.init(e, n), lt.init(e, n));
	}),
	sR = ne("ZodULID", (e, n) => {
		(IC.init(e, n), lt.init(e, n));
	}),
	lR = ne("ZodXID", (e, n) => {
		(UC.init(e, n), lt.init(e, n));
	}),
	oR = ne("ZodKSUID", (e, n) => {
		(LC.init(e, n), lt.init(e, n));
	}),
	cR = ne("ZodIPv4", (e, n) => {
		(ZC.init(e, n), lt.init(e, n));
	}),
	fR = ne("ZodIPv6", (e, n) => {
		(QC.init(e, n), lt.init(e, n));
	}),
	dR = ne("ZodCIDRv4", (e, n) => {
		(PC.init(e, n), lt.init(e, n));
	}),
	hR = ne("ZodCIDRv6", (e, n) => {
		(YC.init(e, n), lt.init(e, n));
	}),
	mR = ne("ZodBase64", (e, n) => {
		(FC.init(e, n), lt.init(e, n));
	}),
	vR = ne("ZodBase64URL", (e, n) => {
		(GC.init(e, n), lt.init(e, n));
	}),
	gR = ne("ZodE164", (e, n) => {
		(XC.init(e, n), lt.init(e, n));
	}),
	yR = ne("ZodJWT", (e, n) => {
		(WC.init(e, n), lt.init(e, n));
	}),
	rp = ne("ZodNumber", (e, n) => {
		(Fb.init(e, n),
			Tt.init(e, n),
			(e._zod.processJSONSchema = (u, l, o) => vA(e, u, l, o)),
			is(e, "ZodNumber", {
				gt(u, l) {
					return this.check(Jy(u, l));
				},
				gte(u, l) {
					return this.check(ed(u, l));
				},
				min(u, l) {
					return this.check(ed(u, l));
				},
				lt(u, l) {
					return this.check(Xy(u, l));
				},
				lte(u, l) {
					return this.check(Wf(u, l));
				},
				max(u, l) {
					return this.check(Wf(u, l));
				},
				int(u) {
					return this.check(i0(u));
				},
				safe(u) {
					return this.check(i0(u));
				},
				positive(u) {
					return this.check(Jy(0, u));
				},
				nonnegative(u) {
					return this.check(ed(0, u));
				},
				negative(u) {
					return this.check(Xy(0, u));
				},
				nonpositive(u) {
					return this.check(Wf(0, u));
				},
				multipleOf(u, l) {
					return this.check(Wy(u, l));
				},
				step(u, l) {
					return this.check(Wy(u, l));
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
function n0(e) {
	return YT(rp, e);
}
var bR = ne("ZodNumberFormat", (e, n) => {
	(eT.init(e, n), rp.init(e, n));
});
function i0(e) {
	return FT(bR, e);
}
var pR = ne("ZodUnknown", (e, n) => {
	(tT.init(e, n), Tt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => yA(e, a, u, l)));
});
function a0() {
	return KT(pR);
}
var SR = ne("ZodNever", (e, n) => {
	(nT.init(e, n), Tt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => gA(e, a, u, l)));
});
function wR(e) {
	return GT(SR, e);
}
var _R = ne("ZodArray", (e, n) => {
	(iT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => wA(e, a, u, l)),
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
function xR(e, n) {
	return lA(_R, e, n);
}
var ER = ne("ZodObject", (e, n) => {
	(rT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => _A(e, a, u, l)),
		Ge(e, "shape", () => n.shape),
		is(e, "ZodObject", {
			keyof() {
				return NR(Object.keys(this._zod.def.shape));
			},
			catchall(a) {
				return this.clone({ ...this._zod.def, catchall: a });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: a0() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: a0() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: wR() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(a) {
				return CE(this, a);
			},
			safeExtend(a) {
				return TE(this, a);
			},
			merge(a) {
				return AE(this, a);
			},
			pick(a) {
				return xE(this, a);
			},
			omit(a) {
				return EE(this, a);
			},
			partial(...a) {
				return RE(up, this, a[0]);
			},
			required(...a) {
				return OE(sp, this, a[0]);
			},
		}));
});
function CR(e, n) {
	const a = { type: "object", shape: e ?? {}, ...pe(n) };
	return new ER(a);
}
var TR = ne("ZodUnion", (e, n) => {
	(uT.init(e, n), Tt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => xA(e, a, u, l)), (e.options = n.options));
});
function AR(e, n) {
	return new TR({ type: "union", options: e, ...pe(n) });
}
var RR = ne("ZodIntersection", (e, n) => {
	(sT.init(e, n), Tt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => EA(e, a, u, l)));
});
function OR(e, n) {
	return new RR({ type: "intersection", left: e, right: n });
}
var Sd = ne("ZodEnum", (e, n) => {
	(lT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (u, l, o) => bA(e, u, l, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const a = new Set(Object.keys(n.entries));
	((e.extract = (u, l) => {
		const o = {};
		for (const f of u)
			if (a.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Sd({ ...n, checks: [], ...pe(l), entries: o });
	}),
		(e.exclude = (u, l) => {
			const o = { ...n.entries };
			for (const f of u)
				if (a.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Sd({ ...n, checks: [], ...pe(l), entries: o });
		}));
});
function NR(e, n) {
	const a = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Sd({ type: "enum", entries: a, ...pe(n) });
}
var MR = ne("ZodTransform", (e, n) => {
	(oT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => SA(e, a, u, l)),
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
function zR(e) {
	return new MR({ type: "transform", transform: e });
}
var up = ne("ZodOptional", (e, n) => {
	(Xb.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => ip(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function r0(e) {
	return new up({ type: "optional", innerType: e });
}
var kR = ne("ZodExactOptional", (e, n) => {
	(cT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => ip(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function DR(e) {
	return new kR({ type: "optional", innerType: e });
}
var jR = ne("ZodNullable", (e, n) => {
	(fT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => CA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function u0(e) {
	return new jR({ type: "nullable", innerType: e });
}
var qR = ne("ZodDefault", (e, n) => {
	(dT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => AA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function IR(e, n) {
	return new qR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : qb(n);
		},
	});
}
var UR = ne("ZodPrefault", (e, n) => {
	(hT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => RA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function LR(e, n) {
	return new UR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : qb(n);
		},
	});
}
var sp = ne("ZodNonOptional", (e, n) => {
	(mT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => TA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function $R(e, n) {
	return new sp({ type: "nonoptional", innerType: e, ...pe(n) });
}
var BR = ne("ZodCatch", (e, n) => {
	(vT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => OA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function VR(e, n) {
	return new BR({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var HR = ne("ZodPipe", (e, n) => {
	(gT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => NA(e, a, u, l)),
		(e.in = n.in),
		(e.out = n.out));
});
function s0(e, n) {
	return new HR({ type: "pipe", in: e, out: n });
}
var ZR = ne("ZodReadonly", (e, n) => {
	(yT.init(e, n),
		Tt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => MA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function QR(e) {
	return new ZR({ type: "readonly", innerType: e });
}
var PR = ne("ZodCustom", (e, n) => {
	(bT.init(e, n), Tt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => pA(e, a, u, l)));
});
function YR(e, n = {}) {
	return oA(PR, e, n);
}
function FR(e, n) {
	return cA(e, n);
}
function KR(e) {
	const n = new Tb("https://exuberant-hippopotamus-790.convex.cloud", { authRefreshTokenLeewaySeconds: 15 });
	let a = { phase: "connecting", message: null, deadline: 0, refreshing: !1 };
	const u = new Set();
	let l = null,
		o = null,
		f = null,
		h = null,
		m = null,
		v = 0,
		g = !1,
		_ = !1;
	function p(A) {
		if (!g) {
			a = { ...a, ...A };
			for (const D of u) D();
		}
	}
	function S(A) {
		((_ = A),
			A && performance.now() < a.deadline
				? p({ phase: "ready", message: null })
				: !o &&
					a.phase !== "denied" &&
					p({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }));
	}
	function E() {
		g ||
			o ||
			((l = null), m && clearTimeout(m), (m = null), p({ phase: "connecting", message: null }), n.setAuth(C, S));
	}
	function C(A) {
		return !A.forceRefreshToken && l && performance.now() < a.deadline
			? Promise.resolve(l)
			: o ||
					(p({ refreshing: !0 }),
					(o = (async () => {
						const D = performance.now();
						f = new AbortController();
						const T = setTimeout(() => f?.abort(), 25e3);
						try {
							const R = await e.getToken(),
								O = "https://exuberant-hippopotamus-790.convex.site/auth/lease",
								I = {
									method: "POST",
									redirect: "error",
									headers: { "Content-Type": "application/json" },
									signal: f.signal,
								};
							let L = await fetch(O, { ...I, body: JSON.stringify({ pressToken: R }) });
							if (L.status === 401) {
								const B = await e.refreshToken();
								L = await fetch(O, { ...I, body: JSON.stringify({ pressToken: B }) });
							}
							const j = await L.json(),
								k = CR({ jwt: eR(), expiresAt: n0(), validForMs: n0().min(0).max(3e4) }).safeParse(j);
							if (!L.ok || !k.success) {
								const B = L.status === 401 || L.status === 403;
								throw (
									p({
										phase: B ? "denied" : "unavailable",
										message: B
											? "Press no longer allows this Chitchat session."
											: "Chitchat is reconnecting. Your draft is kept.",
									}),
									new Error("Chitchat lease was refused")
								);
							}
							const U = D + k.data.validForMs;
							if (U <= performance.now()) throw new Error("Chitchat lease expired in transit");
							return (
								(l = k.data.jwt),
								(v = 0),
								h && clearTimeout(h),
								(h = setTimeout(
									() => {
										((l = null),
											p({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
											o || ((_ = !1), n.clearAuth(), E()));
									},
									Math.max(0, U - performance.now()),
								)),
								p({ phase: _ ? "ready" : "connecting", deadline: U, message: null }),
								l
							);
						} catch {
							return (
								(l = null),
								a.phase !== "denied" &&
									p({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
								!g && a.phase !== "denied" && ((v += 1), (m = setTimeout(E, Math.min(3e4, 2e3 * 2 ** Math.min(v, 4))))),
								null
							);
						} finally {
							(clearTimeout(T), (f = null), (o = null), p({ refreshing: !1 }));
						}
					})()),
					o);
	}
	return {
		convex: n,
		start: () => n.setAuth(C, S),
		retry: E,
		getSnapshot: () => a,
		subscribe: (A) => (
			u.add(A),
			() => {
				u.delete(A);
			}
		),
		can_request_now: () =>
			a.phase === "ready" &&
			!a.refreshing &&
			performance.now() < a.deadline &&
			n.connectionState().isWebSocketConnected,
		close: () => {
			((g = !0), f?.abort(), h && clearTimeout(h), m && clearTimeout(m), u.clear(), n.close());
		},
	};
}
var lp = (0, w.createContext)(null);
function GR(e) {
	const [n] = (0, w.useState)(() => KR(e.client));
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
		(0, b.jsx)(lp.Provider, { value: n, children: (0, b.jsx)($x, { client: n.convex, children: e.children }) })
	);
}
function $n() {
	const e = (0, w.useContext)(lp);
	if (!e) throw new Error("Chitchat needs its session provider");
	const n = (0, w.useSyncExternalStore)(e.subscribe, e.getSnapshot),
		a = Bx(),
		u = n.phase === "ready" && performance.now() < n.deadline,
		l = Dr(be.sessions.current, u ? {} : "skip"),
		o = Dr(be.sessions.status, u ? {} : "skip"),
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
	const n = $n(),
		a = Pn(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		u = Je(n, be.members.list, { paginationOpts: { numItems: 100, cursor: a.cursor } });
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
			(0, b.jsx)(_i, { page: a, result: u, label: "People" }),
		],
	});
}
function l0(e) {
	const n = $a(),
		a = $n(),
		u = (0, w.useId)(),
		l = (0, w.useId)(),
		o = (0, w.useId)(),
		f = (0, w.useId)(),
		h = Je(a, be.channels.permissions, e.channel ? { channelId: e.channel._id } : "skip"),
		[m, v] = (0, w.useState)(e.channel?.name ?? ""),
		[g, _] = (0, w.useState)(e.channel?.topic ?? ""),
		[p, S] = (0, w.useState)(!1),
		[E, C] = (0, w.useState)([]),
		[A, D] = (0, w.useState)(null),
		[T, R] = (0, w.useState)(!1),
		[O, I] = (0, w.useState)(null),
		L = T || A !== null,
		j = async () => {
			if (T) return;
			if (!a.can_request_now()) {
				I("Reconnect before saving. Your changes are kept.");
				return;
			}
			if (m.trim().length === 0 || m.trim().length > 64 || g.trim().length > 250) {
				I("Use a name of 1–64 characters and a topic of at most 250 characters.");
				return;
			}
			const k =
				A ??
				(e.channel
					? {
							kind: "rename",
							args: {
								channelId: e.channel._id,
								expectedRevision: e.channel.revision,
								clientRequestId: crypto.randomUUID(),
								name: m.trim(),
								topic: g.trim(),
							},
						}
					: {
							kind: "create",
							args: {
								clientRequestId: crypto.randomUUID(),
								name: m.trim(),
								topic: g.trim(),
								visibility: p ? "private" : "public",
								invitedUserIds: p ? E : [],
							},
						});
			(D(k), R(!0), I(null));
			try {
				const U =
					k.kind === "create"
						? await n.mutation(be.channels.create, k.args)
						: await n.mutation(be.channels.update, k.args);
				if (U._nay) {
					(D(null), I(U._nay.message));
					return;
				}
				U._yay.kind === "channel" && e.onSaved(U._yay.channelId);
			} catch {
				I("The save may have reached Chitchat. Retry to check the same request.");
			} finally {
				R(!1);
			}
		};
	return (0, b.jsxs)(Vr, {
		labelledBy: u,
		accessUnavailable: !a.refreshing && (!a.ready || (e.channel !== null && h === null)),
		onReconnect: a.retry,
		onClose: () => {
			T || e.onClose();
		},
		children: [
			(0, b.jsx)("h2", {
				id: u,
				className: "dialog-title",
				children: e.channel ? `Rename #${e.channel.name}` : "Create channel",
			}),
			(0, b.jsxs)("form", {
				onSubmit: (k) => {
					(k.preventDefault(), j());
				},
				onKeyDown: (k) => {
					k.key === "Enter" && k.nativeEvent.isComposing && k.preventDefault();
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
								disabled: L,
								"aria-describedby": O ? f : void 0,
								onInput: (k) => v(k.currentTarget.value),
							}),
						],
					}),
					(0, b.jsxs)("div", {
						className: "field",
						children: [
							(0, b.jsx)("label", { htmlFor: o, children: "Topic (optional)" }),
							(0, b.jsx)("input", {
								id: o,
								value: g,
								maxLength: 250,
								disabled: L,
								onInput: (k) => _(k.currentTarget.value),
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
												disabled: L,
												onChange: (k) => S(k.currentTarget.checked),
											}),
											"Private channel",
										],
									}),
									p
										? (0, b.jsxs)(b.Fragment, {
												children: [
													(0, b.jsx)("p", { className: "field-note", children: qd }),
													(0, b.jsx)("p", {
														className: "field-note",
														children:
															"Tick one person for a direct message, or several for a group. Up to 50 people can join.",
													}),
													(0, b.jsx)(op, {
														selfUserId: e.selfUserId,
														selected: E,
														disabled: L,
														onToggle: (k, U) => C((B) => (U ? [...B, k] : B.filter((Z) => Z !== k))),
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
					O ? (0, b.jsx)("p", { id: f, className: "form-error", role: "alert", children: O }) : null,
					(0, b.jsxs)("div", {
						className: "dialog-actions",
						children: [
							(0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: T,
								onClick: e.onClose,
								children: A ? "Stop checking" : "Cancel",
							}),
							(0, b.jsx)("button", {
								type: "submit",
								className: "button button-primary",
								disabled: T || !(A ? a.connected : a.canSend),
								children: T ? "Saving…" : A ? "Retry" : e.channel ? "Rename" : "Create",
							}),
						],
					}),
				],
			}),
		],
	});
}
function XR(e) {
	const n = $a(),
		a = $n(),
		u = (0, w.useId)(),
		[l, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		g = Je(a, be.channels.get, { channelId: e.channelId }),
		_ = Je(a, be.channels.list_members, { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } }),
		p = Je(a, be.channels.permissions, { channelId: e.channelId }),
		S = Je(a, be.members.resolve, _ ? { userIds: _.page.map((T) => T.hostUserId) } : "skip"),
		E = Je(a, be.channel_members.status, l ? { channelId: e.channelId, clientRequestId: l.clientRequestId } : "skip"),
		C = E?.status === "pending";
	(0, w.useEffect)(() => {
		(E?.status === "complete" && (o(null), v(null)),
			E?.status === "cancelled" &&
				(o(null), v("Access changed before this request finished. Check the people list and try again.")));
	}, [E]);
	const A = async (T) => {
			if (!(f || C)) {
				if (!a.can_request_now()) {
					v("Reconnect before changing channel access.");
					return;
				}
				(o(T), h(!0), v(null));
				try {
					const R = await n.mutation(be.channel_members.change, T);
					R._nay && (o(null), v(R._nay.message));
				} catch {
					v("This change may have reached Chitchat. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		D = (T, R) => {
			_ &&
				A({
					channelId: e.channelId,
					clientRequestId: crypto.randomUUID(),
					expectedMembershipRevision: _.membershipRevision,
					expectedPrincipalCount: _.memberCount,
					hostUserId: T,
					level: R,
				});
		};
	return (0, b.jsxs)(Vr, {
		labelledBy: u,
		accessUnavailable: !a.refreshing && (!a.ready || p === null),
		onReconnect: a.retry,
		onClose: () => {
			f || e.onClose();
		},
		children: [
			(0, b.jsx)("h2", { id: u, className: "dialog-title", children: g ? `People in #${g.name}` : "Channel access" }),
			(0, b.jsx)("p", { className: "field-note", children: qd }),
			C
				? (0, b.jsx)("p", { role: "status", children: "Updating channel and transcript access…" })
				: _
					? (0, b.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: _.page.map((T) =>
								(0, b.jsxs)(
									"li",
									{
										className: "people-item",
										children: [
											(0, b.jsxs)("span", {
												children: [
													S?.[T.hostUserId] ?? "Unnamed member",
													T.level === "manage" ? " (can add people)" : T.level === "read" ? " (can read)" : "",
												],
											}),
											p?.canManage && T.hostUserId !== e.selfUserId
												? (0, b.jsxs)(b.Fragment, {
														children: [
															(0, b.jsxs)("select", {
																"aria-label": `Access for ${S?.[T.hostUserId] ?? "member"}`,
																value: T.level,
																disabled: f || l !== null,
																onChange: (R) => {
																	const O = R.currentTarget.value;
																	(O === "read" || O === "write" || O === "manage") && D(T.hostUserId, O);
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
																onClick: () => D(T.hostUserId, null),
																children: "Remove",
															}),
														],
													})
												: null,
										],
									},
									T.hostUserId,
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
								selected: _.page.map((T) => T.hostUserId),
								disabled: f || l !== null,
								onToggle: (T, R) => D(T, R ? "write" : null),
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
								onClick: () => void A(l),
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
function JR(e) {
	const n = $a(),
		a = $n(),
		u = (0, w.useId)(),
		[l] = (0, w.useState)(() => crypto.randomUUID()),
		[o, f] = (0, w.useState)(!1),
		[h, m] = (0, w.useState)(!1),
		[v, g] = (0, w.useState)(null),
		_ = e.action === "leave" || e.action === "delete",
		p = Je(a, be.channels.permissions, { channelId: e.channel._id }),
		S = Je(a, be.channel_members.status, h && _ ? { channelId: e.channel._id, clientRequestId: l } : "skip"),
		E = S?.status === "pending";
	(0, w.useEffect)(() => {
		(S?.status === "complete" && e.onDone(),
			S?.status === "cancelled" && g("Access changed before this request finished. Close this dialog and try again."));
	}, [S, e.onDone]);
	const C =
			e.action === "archive"
				? "Archive"
				: e.action === "unarchive"
					? "Unarchive"
					: e.action === "leave"
						? "Leave"
						: "Delete",
		A = async () => {
			if (!(o || E)) {
				if (!a.can_request_now()) {
					g("Reconnect before changing this channel.");
					return;
				}
				(f(!0), m(!0), g(null));
				try {
					const T =
						e.action === "archive" || e.action === "unarchive"
							? await n.mutation(be.channels.archive, {
									channelId: e.channel._id,
									clientRequestId: l,
									expectedRevision: e.channel.revision,
									archived: e.action === "archive",
								})
							: e.action === "leave"
								? await n.mutation(be.channel_members.leave, {
										channelId: e.channel._id,
										clientRequestId: l,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									})
								: await n.mutation(be.channel_members.delete_channel, {
										channelId: e.channel._id,
										clientRequestId: l,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									});
					if (T._nay) {
						(m(!1), g(T._nay.message));
						return;
					}
					(T._yay.kind !== "membership" || !T._yay.pending) && e.onDone();
				} catch {
					g("This change may have reached Chitchat. Retry to check the same request.");
				} finally {
					f(!1);
				}
			}
		},
		D = e.action === "delete" || (e.action === "leave" && e.channel.memberCount === 1);
	return (0, b.jsxs)(Vr, {
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
						onClick: () => void A(),
						children: o ? "Saving…" : h ? "Retry" : `${C} channel`,
					}),
				],
			}),
		],
	});
}
function Zu(...e) {}
function cp(e, n) {
	return WR(e) ? e(eO(n) ? n() : n) : e;
}
function WR(e) {
	return typeof e == "function";
}
function eO(e) {
	return typeof e == "function";
}
function Ti(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function un(...e) {
	return (...n) => {
		for (const a of e) typeof a == "function" && a(...n);
	};
}
function fp(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function tO(e, n) {
	const a = { ...e };
	for (const u of n) Ti(a, u) && delete a[u];
	return a;
}
function nO(e, n) {
	const a = {};
	for (const u of n) Ti(e, u) && (a[u] = e[u]);
	return a;
}
function dp(e) {
	return e;
}
function vt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function iO(e) {
	return Object.keys(e);
}
function fo(e, ...n) {
	const a = typeof e == "function" ? e(...n) : e;
	return a == null ? !1 : !a;
}
function as(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function Va(e) {
	const n = {};
	for (const a in e) e[a] !== void 0 && (n[a] = e[a]);
	return n;
}
function Ce(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function wd(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function aO(e) {
	return !e || !(0, w.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function rO(e) {
	return aO(e) ? { ...e.props }.ref || e.ref : null;
}
function uO(e, n) {
	const a = { ...e };
	for (const u in n) {
		if (!Ti(n, u)) continue;
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
var Zr = sO();
function sO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function nt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function hp(e) {
	return e ? ("self" in e ? e.self : nt(e).defaultView || window) : self;
}
function Ai(e, n = !1) {
	const { activeElement: a } = nt(e);
	if (!a?.nodeName) return null;
	if (Zd(a) && a.contentDocument) return Ai(a.contentDocument.body, n);
	if (n) {
		const u = a.getAttribute("aria-activedescendant");
		if (u) {
			const l = nt(a).getElementById(u);
			if (l) return l;
		}
	}
	return a;
}
function Et(e, n) {
	return e === n || e.contains(n);
}
function Zd(e) {
	return e.tagName === "IFRAME";
}
function na(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? lO.indexOf(e.type) !== -1 : !1;
}
var lO = ["button", "color", "file", "image", "reset", "submit"];
function mp(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Gn(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			a = e.tagName === "TEXTAREA";
		return n || a || !1;
	} catch {
		return !1;
	}
}
function _d(e) {
	return e.isContentEditable || Gn(e);
}
function oO(e) {
	if (Gn(e)) return e.value;
	if (e.isContentEditable) {
		const n = nt(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function xd(e) {
	let n = 0,
		a = 0;
	if (Gn(e)) ((n = e.selectionStart || 0), (a = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = nt(e).getSelection();
		if (u?.rangeCount && u.anchorNode && Et(e, u.anchorNode) && u.focusNode && Et(e, u.focusNode)) {
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
function ho(e, n) {
	const a = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && a.indexOf(u) !== -1 ? u : n;
}
function vp(e, n) {
	var a;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		l = ho(e);
	return l && (a = u[l]) != null ? a : n;
}
function Qd(e) {
	if (!e) return null;
	const n = (a) => a === "auto" || a === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: a } = getComputedStyle(e);
		if (n(a)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: a } = getComputedStyle(e);
		if (n(a)) return e;
	}
	return Qd(e.parentElement) || document.scrollingElement || document.body;
}
function td(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function gp(e, n) {
	const a = e.map((l, o) => [o, l]);
	let u = !1;
	return (
		a.sort(([l, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : cO(m, v) ? (l > f && (u = !0), -1) : (l < f && (u = !0), 1);
		}),
		u ? a.map(([l, o]) => o) : e
	);
}
function cO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function yp() {
	return Zr && !!navigator.maxTouchPoints;
}
function Pd() {
	return Zr ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function mo() {
	return Zr && Pd() && /apple/i.test(navigator.vendor);
}
function fO() {
	return Zr && /firefox\//i.test(navigator.userAgent);
}
function dO() {
	return Zr && navigator.platform.startsWith("Mac") && !yp();
}
function bp(e) {
	return !!(e.currentTarget && !Et(e.currentTarget, e.target));
}
function bn(e) {
	return e.target === e.currentTarget;
}
function pp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const a = Pd();
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
function hO(e, n, a) {
	const u = new Event(n, a);
	return e.dispatchEvent(u);
}
function Rr(e, n) {
	const a = new FocusEvent("blur", n),
		u = e.dispatchEvent(a),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", l)), u);
}
function mO(e, n, a) {
	const u = new KeyboardEvent(n, a);
	return e.dispatchEvent(u);
}
function o0(e, n) {
	const a = new MouseEvent("click", n);
	return e.dispatchEvent(a);
}
function Na(e, n) {
	const a = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Et(a, u);
}
function qr(e, n, a, u) {
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
function $t(e, n, a, u = window) {
	const l = [];
	try {
		u.document.addEventListener(e, n, a);
		for (const f of Array.from(u.frames)) l.push($t(e, n, a, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, a);
		} catch {}
		for (const f of l) f();
	};
}
var Yd = { ...w },
	c0 = Yd.useId,
	wk = Yd.useDeferredValue,
	f0 = Yd.useInsertionEffect,
	He = Zr ? w.useLayoutEffect : w.useEffect;
function vO(e) {
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
function xe(e) {
	const n = (0, w.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		f0
			? f0(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, w.useCallback)((...a) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...a);
		}, [])
	);
}
function gO(e) {
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
				for (const a of e) wd(a, n);
			};
	}, e);
}
function Ri(e) {
	if (c0) {
		const u = c0();
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
function yO(e, n, a) {
	const u = vO(a),
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
function Qr(e, n) {
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
function bO(e, n) {
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
	return xe(typeof e == "function" ? e : () => e);
}
function Bt(e, n, a = []) {
	const u = (0, w.useCallback)((l) => (e.wrapElement && (l = e.wrapElement(l)), n(l)), [...a, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function Fd(e = !1, n) {
	const [a, u] = (0, w.useState)(null);
	return { portalRef: gt(u, n), portalNode: a, domReady: !e || a };
}
function Ep(e, n, a) {
	const u = e.onLoadedMetadataCapture,
		l = (0, w.useMemo)(() => Object.assign(() => {}, { ...u, [n]: a }), [u, n, a]);
	return [u?.[n], { onLoadedMetadataCapture: l }];
}
var d0 = !1;
function Kd() {
	return (
		(0, w.useEffect)(() => {
			d0 ||
				($t("mousemove", SO, !0),
				$t("mousedown", $l, !0),
				$t("mouseup", $l, !0),
				$t("keydown", $l, !0),
				$t("scroll", $l, !0),
				(d0 = !0));
		}, []),
		xe(() => Gd)
	);
}
var Gd = !1,
	h0 = 0,
	m0 = 0;
function pO(e) {
	const n = e.movementX || e.screenX - h0,
		a = e.movementY || e.screenY - m0;
	return ((h0 = e.screenX), (m0 = e.screenY), n || a || !1);
}
function SO(e) {
	pO(e) && (Gd = !0);
}
function $l() {
	Gd = !1;
}
function je(e) {
	const n = w.forwardRef((a, u) => e({ ...a, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function vo(e, n) {
	return w.memo(e, n);
}
function Ue(e, n) {
	const { wrapElement: a, render: u, ...l } = n,
		o = gt(n.ref, rO(u));
	let f;
	if (w.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = w.cloneElement(u, uO(l, h));
	} else u ? (f = u(l)) : (f = (0, b.jsx)(e, { ...l }));
	return a ? a(f) : f;
}
function Le(e) {
	const n = (a = {}) => e(a);
	return ((n.displayName = e.name), n);
}
function Xn(e = [], n = []) {
	const a = w.createContext(void 0),
		u = w.createContext(void 0),
		l = () => w.useContext(a),
		o = (v = !1) => {
			const g = w.useContext(u),
				_ = l();
			return v ? g : g || _;
		},
		f = () => {
			const v = w.useContext(u),
				g = l();
			if (!(v && v === g)) return g;
		},
		h = (v) => e.reduceRight((g, _) => (0, b.jsx)(_, { ...v, children: g }), (0, b.jsx)(a.Provider, { ...v }));
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
				children: n.reduceRight((g, _) => (0, b.jsx)(_, { ...v, children: g }), (0, b.jsx)(u.Provider, { ...v })),
			}),
	};
}
var rs = Xn(),
	wO = rs.useContext,
	_k = rs.useScopedContext,
	xk = rs.useProviderContext,
	_O = rs.ContextProvider,
	xO = rs.ScopedContextProvider,
	us = Xn([_O], [xO]),
	go = us.useContext,
	Ek = us.useScopedContext,
	EO = us.useProviderContext,
	ss = us.ContextProvider,
	yo = us.ScopedContextProvider,
	CO = (0, w.createContext)(void 0),
	TO = (0, w.createContext)(void 0),
	ls = Xn([ss], [yo]),
	AO = ls.useContext,
	RO = ls.useScopedContext,
	Ck = ls.useProviderContext,
	Tk = ls.ContextProvider,
	Ak = ls.ScopedContextProvider,
	Rk = (0, w.createContext)(void 0),
	os = Xn(),
	Ok = os.useContext,
	Nk = os.useScopedContext,
	Xd = os.useProviderContext,
	OO = os.ContextProvider,
	NO = os.ScopedContextProvider,
	cs = Xn([OO], [NO]),
	Mk = cs.useContext,
	zk = cs.useScopedContext,
	bo = cs.useProviderContext,
	MO = cs.ContextProvider,
	Jd = cs.ScopedContextProvider,
	zO = (0, w.createContext)(void 0),
	kO = (0, w.createContext)(void 0),
	fs = Xn([MO], [Jd]),
	kk = fs.useContext,
	Dk = fs.useScopedContext,
	po = fs.useProviderContext,
	Cp = fs.ContextProvider,
	So = fs.ScopedContextProvider,
	ds = Xn([Cp], [So]),
	jk = ds.useContext,
	qk = ds.useScopedContext,
	Wd = ds.useProviderContext,
	DO = ds.ContextProvider,
	Tp = ds.ScopedContextProvider,
	hs = Xn([ss, DO], [yo, Tp]),
	Ap = hs.useContext,
	jO = hs.useScopedContext,
	wo = hs.useProviderContext,
	Rp = hs.ContextProvider,
	qO = hs.ScopedContextProvider,
	Ik = (0, w.createContext)(void 0),
	IO = { id: null };
function UO(e, n, a = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(a ? [IO] : []), ...e.slice(0, u)];
}
function LO(e, n) {
	return e.find((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function ea(e, n) {
	return (n && e.item(n)) || null;
}
function $O(e) {
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
function BO(e, n = !1) {
	if (Gn(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const a = nt(e).getSelection();
		(a?.selectAllChildren(e), n && a?.collapseToEnd());
	}
}
var Ed = Symbol("FOCUS_SILENTLY");
function VO(e) {
	((e[Ed] = !0), e.focus({ preventScroll: !0 }));
}
function HO(e) {
	const n = e[Ed];
	return (delete e[Ed], n);
}
function Qu(e, n, a) {
	if (!n || n === a) return !1;
	const u = e.item(n.id);
	return !(!u || (a && u.element === a));
}
var ZO = "div",
	xi = "";
function nd() {
	xi = "";
}
function QO(e) {
	const n = e.target;
	return n && Gn(n)
		? !1
		: e.key === " " && xi.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function PO(e, n) {
	if (bn(e)) return !0;
	const a = e.target;
	return a ? n.some((u) => u.element === a) : !1;
}
function YO(e) {
	return e.filter((n) => !n.disabled);
}
function Zl(e, n) {
	var a;
	const u = ((a = e.element) == null ? void 0 : a.textContent) || e.children || ("value" in e && e.value);
	return u ? fp(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function FO(e, n, a) {
	if (!a) return e;
	const u = e.find((l) => l.id === a);
	return !u || !Zl(u, n) || (xi !== n && Zl(u, xi))
		? e
		: ((xi = n),
			UO(
				e.filter((l) => Zl(l, xi)),
				a,
			).filter((l) => l.id !== a));
}
var eh = Le(function ({ store: n, typeahead: a = !0, ...u }) {
		const l = go();
		((n = n || l), vt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, w.useRef)(0),
			h = xe((m) => {
				if ((o?.(m), m.defaultPrevented || !a || !n)) return;
				if (!QO(m)) return nd();
				const { renderedItems: v, items: g, activeId: _, id: p } = n.getState();
				let S = YO(g.length > v.length ? g : v);
				const E = nt(m.currentTarget),
					C = `[data-offscreen-id="${p}"]`,
					A = E.querySelectorAll(C);
				for (const R of A) {
					const O = R.ariaDisabled === "true" || ("disabled" in R && !!R.disabled);
					S.push({ id: R.id, element: R, disabled: O });
				}
				if ((A.length && (S = gp(S, (R) => R.element)), !PO(m, S))) return nd();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						xi = "";
					}, 500)));
				const D = m.key.toLowerCase();
				((xi += D), (S = FO(S, D, _)));
				const T = S.find((R) => Zl(R, xi));
				T ? n.move(T.id) : nd();
			});
		return ((u = { ...u, onKeyDownCapture: h }), Va(u));
	}),
	Uk = je(function (n) {
		return Ue(ZO, eh(n));
	});
function Ha(e, n) {
	const a = e.__unstableInternals;
	return (vt(a, "Invalid store"), a[n]);
}
function Ln(e, ...n) {
	let a = e,
		u = a,
		l = Symbol(),
		o = Zu;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		_ = new WeakMap(),
		p = new WeakMap(),
		S = (k) => (m.add(k), () => m.delete(k)),
		E = () => {
			const k = f.size,
				U = Symbol();
			f.add(U);
			const B = () => {
				(f.delete(U), !f.size && o());
			};
			if (k) return B;
			const Z = iO(a).map((K) =>
					un(
						...n.map((ae) => {
							var z;
							const H = (z = ae?.getState) == null ? void 0 : z.call(ae);
							if (H && Ti(H, K))
								return Zt(ae, [K], ($) => {
									L(K, $[K], !0);
								});
						}),
					),
				),
				ie = [];
			for (const K of m) ie.push(K());
			const ee = n.map(th);
			return ((o = un(...Z, ...ie, ...ee)), B);
		},
		C = (k, U, B = v) => (
			B.add(U),
			p.set(U, k),
			() => {
				var Z;
				((Z = _.get(U)) == null || Z(), _.delete(U), p.delete(U), B.delete(U));
			}
		),
		A = (k, U) => C(k, U),
		D = (k, U) => (_.set(U, U(a, a)), C(k, U)),
		T = (k, U) => (_.set(U, U(a, u)), C(k, U, g)),
		R = (k) => Ln(nO(a, k), j),
		O = (k) => Ln(tO(a, k), j),
		I = () => a,
		L = (k, U, B = !1) => {
			var Z;
			if (!Ti(a, k)) return;
			const ie = cp(U, a[k]);
			if (ie === a[k]) return;
			if (!B) for (const z of n) (Z = z?.setState) == null || Z.call(z, k, ie);
			const ee = a;
			a = { ...a, [k]: ie };
			const K = Symbol();
			((l = K), h.add(k));
			const ae = (z, H, $) => {
				var G;
				const oe = p.get(z),
					_e = (N) => ($ ? $.has(N) : N === k);
				(!oe || oe.some(_e)) && ((G = _.get(z)) == null || G(), _.set(z, z(a, H)));
			};
			for (const z of v) ae(z, ee);
			queueMicrotask(() => {
				if (l !== K) return;
				const z = a;
				for (const H of g) ae(H, u, h);
				((u = z), h.clear());
			});
		},
		j = {
			getState: I,
			setState: L,
			__unstableInternals: { setup: S, init: E, subscribe: A, sync: D, batch: T, pick: R, omit: O },
		};
	return j;
}
function Kt(e, ...n) {
	if (e) return Ha(e, "setup")(...n);
}
function th(e, ...n) {
	if (e) return Ha(e, "init")(...n);
}
function nh(e, ...n) {
	if (e) return Ha(e, "subscribe")(...n);
}
function Zt(e, ...n) {
	if (e) return Ha(e, "sync")(...n);
}
function Wl(e, ...n) {
	if (e) return Ha(e, "batch")(...n);
}
function ih(e, ...n) {
	if (e) return Ha(e, "omit")(...n);
}
function Op(e, ...n) {
	if (e) return Ha(e, "pick")(...n);
}
function _o(...e) {
	var n;
	const a = {};
	for (const l of e) {
		const o = (n = l?.getState) == null ? void 0 : n.call(l);
		o && Object.assign(a, o);
	}
	const u = Ln(a, ...e);
	return Object.assign({}, ...e, u);
}
var KO = zn((e) => {
		var n = ao();
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
				A = C[0].inst,
				D = C[1];
			return (
				f(
					function () {
						((A.value = E), (A.getSnapshot = S), v(A) && D({ inst: A }));
					},
					[p, E, S],
				),
				o(
					function () {
						return (
							v(A) && D({ inst: A }),
							p(function () {
								v(A) && D({ inst: A });
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
		function g(p, S) {
			return S();
		}
		var _ = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : _;
	}),
	GO = zn((e, n) => {
		n.exports = KO();
	}),
	XO = X0(GO(), 1),
	{ useSyncExternalStore: Np } = XO.default,
	Mp = () => () => {};
function xt(e, n = dp) {
	const a = w.useCallback((l) => (e ? nh(e, null, l) : Mp()), [e]),
		u = () => {
			const l = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && l && Ti(f, l)) return f[l];
		};
	return Np(a, u, u);
}
function zp(e, n) {
	const a = w.useRef({}),
		u = w.useCallback((o) => (e ? nh(e, null, o) : Mp()), [e]),
		l = () => {
			const o = e?.getState();
			let f = !1;
			const h = a.current;
			for (const m in n) {
				const v = n[m];
				if (typeof v == "function") {
					const g = v(o);
					g !== h[m] && ((h[m] = g), (f = !0));
				}
				if (typeof v == "string") {
					if (!o || !Ti(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (a.current = { ...h }), a.current);
		};
	return Np(u, l, l);
}
function mt(e, n, a, u) {
	const l = Ti(n, a) ? n[a] : void 0,
		o = wp({ value: l, setValue: u ? n[u] : void 0 });
	(He(
		() =>
			Zt(e, [a], (f, h) => {
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
function xo(e, n) {
	const [a, u] = w.useState(() => e(n));
	He(() => th(a), [a]);
	const l = w.useCallback((o) => xt(a, o), [a]);
	return [
		w.useMemo(() => ({ ...a, useState: l }), [a, l]),
		xe(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var JO = "div";
function v0(e, n) {
	const a = setTimeout(n, e);
	return () => clearTimeout(a);
}
function WO(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function g0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, a) => {
			const u = a.endsWith("ms") ? 1 : 1e3,
				l = Number.parseFloat(a || "0s") * u;
			return l > n ? l : n;
		}, 0);
}
function Eo(e, n, a) {
	return !a && n !== !1 && (!e || !!n);
}
var ah = Le(function ({ store: n, alwaysVisible: a, ...u }) {
		const l = Xd();
		((n = n || l), vt(n, !1));
		const o = (0, w.useRef)(null),
			f = Ri(u.id),
			[h, m] = (0, w.useState)(null),
			v = n.useState("open"),
			g = n.useState("mounted"),
			_ = n.useState("animated"),
			p = n.useState("contentElement"),
			S = xt(n.disclosure, "contentElement");
		(He(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			He(() => {
				let D;
				return (
					n?.setState("animated", (T) => ((D = T), !0)),
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
					return WO(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [_, p, v, g]),
			He(() => {
				if (!n || !_ || !h || !p) return;
				const D = () => n?.setState("animating", !1),
					T = () => (0, Gu.flushSync)(D);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return v0(_, T);
				const {
						transitionDuration: R,
						animationDuration: O,
						transitionDelay: I,
						animationDelay: L,
					} = getComputedStyle(p),
					{
						transitionDuration: j = "0",
						animationDuration: k = "0",
						transitionDelay: U = "0",
						animationDelay: B = "0",
					} = S ? getComputedStyle(S) : {},
					Z = g0(I, L, U, B) + g0(R, O, j, k);
				if (!Z) {
					(h === "enter" && n.setState("animated", !1), D());
					return;
				}
				return v0(Math.max(Z - 1e3 / 60, 0), T);
			}, [n, _, p, S, v, h]),
			(u = Bt(u, (D) => (0, b.jsx)(Jd, { value: n, children: D }), [n])));
		const E = Eo(g, u.hidden, a),
			C = u.style,
			A = (0, w.useMemo)(() => (E ? { ...C, display: "none" } : C), [E, C]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: gt(f ? n.setContentElement : null, o, u.ref),
				style: A,
			}),
			Va(u)
		);
	}),
	eN = je(function (n) {
		return Ue(JO, ah(n));
	}),
	Lk = je(function ({ unmountOnHide: n, ...a }) {
		const u = Xd();
		return xt(a.store || u, (l) => !n || l?.mounted) === !1 ? null : (0, b.jsx)(eN, { ...a });
	}),
	kp = (0, w.createContext)(!0),
	Co =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function tN(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function In(e) {
	return !(!e.matches(Co) || !mp(e) || e.closest("[inert]"));
}
function $r(e) {
	if (!In(e) || tN(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const a = Ai(e);
	return !a || a === e || !("form" in a) || a.form !== e.form || a.name !== e.name;
}
function rh(e, n) {
	const a = Array.from(e.querySelectorAll(Co));
	n && a.unshift(e);
	const u = a.filter(In);
	return (
		u.forEach((l, o) => {
			if (Zd(l) && l.contentDocument) {
				const f = l.contentDocument.body;
				u.splice(o, 1, ...rh(f));
			}
		}),
		u
	);
}
function To(e, n, a) {
	const u = Array.from(e.querySelectorAll(Co)),
		l = u.filter($r);
	return (
		n && $r(e) && l.unshift(e),
		l.forEach((o, f) => {
			if (Zd(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = To(h, !1, a);
				l.splice(f, 1, ...m);
			}
		}),
		!l.length && a ? u : l
	);
}
function nN(e, n, a) {
	const [u] = To(e, n, a);
	return u || null;
}
function iN(e, n, a, u) {
	const l = Ai(e),
		o = rh(e, n),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find($r) || (a ? o.find($r) : null) || (u ? h[0] : null) || null;
}
function id(e, n) {
	return iN(document.body, !1, e, n);
}
function aN(e, n, a, u) {
	const l = Ai(e),
		o = rh(e, n).reverse(),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find($r) || (a ? o.find($r) : null) || (u ? h[0] : null) || null;
}
function y0(e, n) {
	return aN(document.body, !1, e, n);
}
function rN(e) {
	for (; e && !In(e); ) e = e.closest(Co);
	return e || null;
}
function qa(e) {
	const n = Ai(e);
	if (!n) return !1;
	if (n === e) return !0;
	const a = n.getAttribute("aria-activedescendant");
	return a ? a === e.id : !1;
}
function ta(e) {
	const n = Ai(e);
	if (!n) return !1;
	if (Et(e, n)) return !0;
	const a = n.getAttribute("aria-activedescendant");
	return !a || !("id" in e) ? !1 : a === e.id ? !0 : !!e.querySelector(`#${CSS.escape(a)}`);
}
function Dp(e) {
	!ta(e) && In(e) && e.focus();
}
function uN(e) {
	var n;
	const a = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", a), e.setAttribute("tabindex", "-1"));
}
function sN(e, n) {
	const a = To(e, n);
	for (const u of a) uN(u);
}
function lN(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		a = (u) => {
			const l = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), l ? u.setAttribute("tabindex", l) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && a(e);
	for (const u of n) a(u);
}
function oN(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var cN = "div",
	b0 = mo(),
	fN = [
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
function dN(e) {
	return e ? !!e[jp] : !1;
}
function p0(e, n) {
	e && (e[jp] = n);
}
function hN(e) {
	const { tagName: n, readOnly: a, type: u } = e;
	return (n === "TEXTAREA" && !a) || (n === "SELECT" && !a)
		? !0
		: n === "INPUT" && !a
			? fN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function mN(e) {
	return "labels" in e ? e.labels : null;
}
function S0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function vN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function gN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function yN(e, n, a, u, l) {
	return e ? (n ? (a && !u ? -1 : void 0) : a ? l : l || 0) : l;
}
function ad(e, n) {
	return xe((a) => {
		(e?.(a), !a.defaultPrevented && n && (a.stopPropagation(), a.preventDefault()));
	});
}
var w0 = !1,
	uh = !0;
function bN(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (uh = !1));
}
function pN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (uh = !0);
}
var ms = Le(function ({ focusable: n = !0, accessibleWhenDisabled: a, autoFocus: u, onFocusVisible: l, ...o }) {
		const f = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			n && (w0 || ($t("mousedown", bN, !0), $t("keydown", pN, !0), (w0 = !0)));
		}, [n]),
			b0 &&
				(0, w.useEffect)(() => {
					if (!n) return;
					const K = f.current;
					if (!K || !S0(K)) return;
					const ae = mN(K);
					if (!ae) return;
					const z = () => queueMicrotask(() => K.focus());
					for (const H of ae) H.addEventListener("mouseup", z);
					return () => {
						for (const H of ae) H.removeEventListener("mouseup", z);
					};
				}, [n]));
		const h = n && as(o),
			m = !!h && !a,
			[v, g] = (0, w.useState)(!1);
		((0, w.useEffect)(() => {
			n && m && v && g(!1);
		}, [n, m, v]),
			(0, w.useEffect)(() => {
				if (!n || !v) return;
				const K = f.current;
				if (!K || typeof IntersectionObserver > "u") return;
				const ae = new IntersectionObserver(() => {
					In(K) || g(!1);
				});
				return (ae.observe(K), () => ae.disconnect());
			}, [n, v]));
		const _ = ad(o.onKeyPressCapture, h),
			p = ad(o.onMouseDownCapture, h),
			S = ad(o.onClickCapture, h),
			E = o.onMouseDown,
			C = xe((K) => {
				if ((E?.(K), K.defaultPrevented || !n)) return;
				const ae = K.currentTarget;
				if (!b0 || bp(K) || (!na(ae) && !S0(ae))) return;
				let z = !1;
				const H = () => {
					z = !0;
				};
				ae.addEventListener("focusin", H, { capture: !0, once: !0 });
				const $ = rN(ae.parentElement);
				(p0($, !0),
					qr(ae, "mouseup", () => {
						(ae.removeEventListener("focusin", H, !0), p0($, !1), !z && Dp(ae));
					}));
			}),
			A = (K, ae) => {
				if ((ae && (K.currentTarget = ae), !n)) return;
				const z = K.currentTarget;
				z && qa(z) && (l?.(K), !K.defaultPrevented && ((z.dataset.focusVisible = "true"), g(!0)));
			},
			D = o.onKeyDownCapture,
			T = xe((K) => {
				if ((D?.(K), K.defaultPrevented || !n || v || K.metaKey || K.altKey || K.ctrlKey || !bn(K))) return;
				const ae = K.currentTarget;
				qr(ae, "focusout", () => A(K, ae));
			}),
			R = o.onFocusCapture,
			O = xe((K) => {
				if ((R?.(K), K.defaultPrevented || !n)) return;
				if (!bn(K)) {
					g(!1);
					return;
				}
				const ae = K.currentTarget,
					z = () => A(K, ae);
				uh || hN(K.target) ? qr(K.target, "focusout", z) : g(!1);
			}),
			I = o.onBlur,
			L = xe((K) => {
				(I?.(K), n && Na(K) && (K.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			j = (0, w.useContext)(kp),
			k = xe((K) => {
				n &&
					u &&
					K &&
					j &&
					queueMicrotask(() => {
						qa(K) || (In(K) && K.focus());
					});
			}),
			U = _p(f),
			B = n && vN(U),
			Z = n && gN(U),
			ie = o.style,
			ee = (0, w.useMemo)(() => (m ? { pointerEvents: "none", ...ie } : ie), [m, ie]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: gt(f, k, o.ref),
				style: ee,
				tabIndex: yN(n, m, B, Z, o.tabIndex),
				disabled: Z && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: S,
				onMouseDownCapture: p,
				onMouseDown: C,
				onKeyDownCapture: T,
				onFocusCapture: O,
				onBlur: L,
			}),
			Va(o)
		);
	}),
	$k = je(function (n) {
		return Ue(cN, ms(n));
	});
function qp(e) {
	const n = [];
	for (const a of e) n.push(...a);
	return n;
}
function Cd(e) {
	return e.slice().reverse();
}
var SN = "div";
function wN(e) {
	return e.some((n) => !!n.rowId);
}
function _N(e) {
	const n = e.target;
	return n && !Gn(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function xN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function _0(e, n, a) {
	return xe((u) => {
		var l;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !bn(u) || xN(u) || _N(u))) return;
		const o = (l = ea(e, e.getState().activeId)) == null ? void 0 : l.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== a?.current && o.focus(),
			mO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function EN(e) {
	return LO(qp(Cd($O(e))));
}
function CN(e) {
	const [n, a] = (0, w.useState)(!1),
		u = (0, w.useCallback)(() => a(!0), []),
		l = e.useState((o) => ea(e, o.activeId));
	return (
		(0, w.useEffect)(() => {
			const o = l?.element;
			n && o && (a(!1), o.focus({ preventScroll: !0 }));
		}, [l, n]),
		u
	);
}
var sh = Le(function ({ store: n, composite: a = !0, focusOnMove: u = a, moveOnKeyPress: l = !0, ...o }) {
		const f = EO();
		((n = n || f), vt(n, !1));
		const h = (0, w.useRef)(null),
			m = (0, w.useRef)(null),
			v = CN(n),
			g = n.useState("moves"),
			[, _] = gO(a ? n.setBaseElement : null);
		((0, w.useEffect)(() => {
			var U;
			if (!n || !g || !a || !u) return;
			const { activeId: B } = n.getState(),
				Z = (U = ea(n, B)) == null ? void 0 : U.element;
			Z && oN(Z);
		}, [n, g, a, u]),
			He(() => {
				if (!n || !g || !a) return;
				const { baseElement: U, activeId: B } = n.getState();
				if (B !== null || !U) return;
				const Z = m.current;
				((m.current = null), Z && Rr(Z, { relatedTarget: U }), qa(U) || U.focus());
			}, [n, g, a]));
		const p = n.useState("activeId"),
			S = n.useState("virtualFocus");
		He(() => {
			var U;
			if (!n || !a || !S) return;
			const B = m.current;
			if (((m.current = null), !B)) return;
			const Z = ((U = ea(n, p)) == null ? void 0 : U.element) || Ai(B);
			Z !== B && Rr(B, { relatedTarget: Z });
		}, [n, p, S, a]);
		const E = _0(n, o.onKeyDownCapture, m),
			C = _0(n, o.onKeyUpCapture, m),
			A = o.onFocusCapture,
			D = xe((U) => {
				if ((A?.(U), U.defaultPrevented || !n)) return;
				const { virtualFocus: B } = n.getState();
				if (!B) return;
				const Z = U.relatedTarget,
					ie = HO(U.currentTarget);
				bn(U) && ie && (U.stopPropagation(), (m.current = Z));
			}),
			T = o.onFocus,
			R = xe((U) => {
				if ((T?.(U), U.defaultPrevented || !a || !n)) return;
				const { relatedTarget: B } = U,
					{ virtualFocus: Z } = n.getState();
				Z ? bn(U) && !Qu(n, B) && queueMicrotask(v) : bn(U) && n.setActiveId(null);
			}),
			O = o.onBlurCapture,
			I = xe((U) => {
				var B;
				if ((O?.(U), U.defaultPrevented || !n)) return;
				const { virtualFocus: Z, activeId: ie } = n.getState();
				if (!Z) return;
				const ee = (B = ea(n, ie)) == null ? void 0 : B.element,
					K = U.relatedTarget,
					ae = Qu(n, K),
					z = m.current;
				((m.current = null),
					bn(U) && ae
						? (K === ee ? z && z !== K && Rr(z, U) : ee ? Rr(ee, U) : z && Rr(z, U), U.stopPropagation())
						: !Qu(n, U.target) && ee && Rr(ee, U));
			}),
			L = o.onKeyDown,
			j = rt(l),
			k = xe((U) => {
				var B;
				if ((L?.(U), U.nativeEvent.isComposing || U.defaultPrevented || !n || !bn(U))) return;
				const { orientation: Z, renderedItems: ie, activeId: ee } = n.getState(),
					K = ea(n, ee);
				if ((B = K?.element) != null && B.isConnected) return;
				const ae = Z !== "horizontal",
					z = Z !== "vertical",
					H = wN(ie);
				if (
					(U.key === "ArrowLeft" || U.key === "ArrowRight" || U.key === "Home" || U.key === "End") &&
					Gn(U.currentTarget)
				)
					return;
				const G = {
					ArrowUp:
						(H || ae) &&
						(() => {
							if (H) {
								const oe = EN(ie);
								return oe?.id;
							}
							return n?.last();
						}),
					ArrowRight: (H || z) && n.first,
					ArrowDown: (H || ae) && n.first,
					ArrowLeft: (H || z) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[U.key];
				if (G) {
					const oe = G();
					if (oe !== void 0) {
						if (!j(U)) return;
						(U.preventDefault(), n.move(oe));
					}
				}
			});
		return (
			(o = Bt(o, (U) => (0, b.jsx)(ss, { value: n, children: U }), [n])),
			(o = {
				"aria-activedescendant": n.useState((U) => {
					var B;
					if (n && a && U.virtualFocus) return (B = ea(n, U.activeId)) == null ? void 0 : B.id;
				}),
				...o,
				ref: gt(h, _, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: C,
				onFocusCapture: D,
				onFocus: R,
				onBlurCapture: I,
				onKeyDown: k,
			}),
			(o = ms({ focusable: n.useState((U) => a && (U.virtualFocus || U.activeId === null)), ...o })),
			o
		);
	}),
	Bk = je(function (n) {
		return Ue(SN, sh(n));
	}),
	TN = "div";
function AN({ store: e, ...n }) {
	const [a, u] = (0, w.useState)(void 0),
		l = n["aria-label"],
		o = xt(e, "disclosureElement"),
		f = xt(e, "contentElement");
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
var Ip = Le(function ({ store: n, alwaysVisible: a, composite: u, ...l }) {
		const o = wo();
		((n = n || o), vt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = Ri(l.id),
			g = l.onKeyDown,
			_ = n.useState((O) => O.placement.split("-")[0]),
			p = n.useState((O) => (O.orientation === "both" ? void 0 : O.orientation)),
			S = p !== "vertical",
			E = xt(h, (O) => !!O && O.orientation !== "vertical"),
			C = xe((O) => {
				if ((g?.(O), !O.defaultPrevented)) {
					if (m || (h && !S)) {
						const I = {
							ArrowRight: () => _ === "left" && !S,
							ArrowLeft: () => _ === "right" && !S,
							ArrowUp: () => _ === "bottom" && S,
							ArrowDown: () => _ === "top" && S,
						}[O.key];
						if (I?.()) return (O.stopPropagation(), O.preventDefault(), n?.hide());
					}
					if (h) {
						const I = {
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
							}[O.key],
							L = I?.();
						L !== void 0 && (O.stopPropagation(), O.preventDefault(), h.move(L));
					}
				}
			});
		l = Bt(l, (O) => (0, b.jsx)(qO, { value: n, children: O }), [n]);
		const A = AN({ store: n, ...l }),
			D = Eo(n.useState("mounted"), l.hidden, a),
			T = D ? { ...l.style, display: "none" } : l.style;
		l = {
			id: v,
			"aria-labelledby": A,
			hidden: D,
			...l,
			ref: gt(v ? n.setContentElement : null, l.ref),
			style: T,
			onKeyDown: C,
		};
		const R = !!n.combobox;
		return (
			(u = u ?? !R),
			u && (l = { role: "menu", "aria-orientation": p, ...l }),
			(l = sh({ store: n, composite: u, ...l })),
			(l = eh({ store: n, typeahead: !R, ...l })),
			l
		);
	}),
	Vk = je(function (n) {
		return Ue(TN, Ip(n));
	});
function rd(e) {
	return [e.clientX, e.clientY];
}
function x0(e, n) {
	const [a, u] = e;
	let l = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = n[h],
			[_, p] = n[m],
			[, S] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (g - p) * (a - v) - (v - _) * (u - g);
		if (p < g) {
			if (u >= p && u < g) {
				if (E === 0) return !0;
				E > 0 && (u === p ? u > S && (l = !l) : (l = !l));
			}
		} else if (g < p) {
			if (u > g && u <= p) {
				if (E === 0) return !0;
				E < 0 && (u === p ? u < S && (l = !l) : (l = !l));
			}
		} else if (u === g && ((a >= _ && a <= v) || (a >= v && a <= _))) return !0;
	}
	return l;
}
function RN(e, n) {
	const { top: a, right: u, bottom: l, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < a ? "top" : h > l ? "bottom" : null];
}
function E0(e, n) {
	const a = e.getBoundingClientRect(),
		{ top: u, right: l, bottom: o, left: f } = a,
		[h, m] = RN(n, a),
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
var C0 = (0, w.createContext)(null),
	ON = "span",
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
	Hk = je(function (n) {
		return Ue(ON, Up(n));
	}),
	NN = "span",
	MN = Le(function (n) {
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
	Bl = je(function (n) {
		return Ue(NN, MN(n));
	}),
	zN = "div";
function kN(e) {
	return nt(e).body;
}
function DN(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : nt(e).createElement("div");
}
function jN(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Wi(e) {
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
			v = (0, w.useContext)(C0),
			[g, _] = (0, w.useState)(null),
			[p, S] = (0, w.useState)(null),
			E = (0, w.useRef)(null),
			C = (0, w.useRef)(null),
			A = (0, w.useRef)(null),
			D = (0, w.useRef)(null);
		return (
			He(() => {
				const T = h.current;
				if (!T || !o) {
					_(null);
					return;
				}
				const R = DN(T, u);
				if (!R) {
					_(null);
					return;
				}
				const O = R.isConnected;
				if ((O || (v || kN(T)).appendChild(R), R.id || (R.id = T.id ? `portal/${T.id}` : jN()), _(R), wd(l, R), !O))
					return () => {
						(R.remove(), wd(l, null));
					};
			}, [o, u, v, l]),
			He(() => {
				if (!o || !n || !a) return;
				const T = nt(a).createElement("span");
				return (
					(T.style.position = "fixed"),
					a.insertAdjacentElement("afterend", T),
					S(T),
					() => {
						(T.remove(), S(null));
					}
				);
			}, [o, n, a]),
			(0, w.useEffect)(() => {
				if (!g || !n) return;
				let T = 0;
				const R = (O) => {
					if (!Na(O)) return;
					const I = O.type === "focusin";
					if ((cancelAnimationFrame(T), I)) return lN(g);
					T = requestAnimationFrame(() => {
						sN(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", R, !0),
					g.addEventListener("focusout", R, !0),
					() => {
						(cancelAnimationFrame(T),
							g.removeEventListener("focusin", R, !0),
							g.removeEventListener("focusout", R, !0));
					}
				);
			}, [g, n]),
			(f = Bt(
				f,
				(T) => {
					if (((T = (0, b.jsx)(C0.Provider, { value: g || v, children: T })), !o)) return T;
					if (!g) return (0, b.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((T = (0, b.jsxs)(b.Fragment, {
						children: [
							n &&
								g &&
								(0, b.jsx)(Bl, {
									ref: C,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (O) => {
										Na(O, g) ? Wi(id()) : Wi(E.current);
									},
								}),
							T,
							n &&
								g &&
								(0, b.jsx)(Bl, {
									ref: A,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (O) => {
										Na(O, g) ? Wi(y0()) : Wi(D.current);
									},
								}),
						],
					})),
						g && (T = (0, Gu.createPortal)(T, g)));
					let R = (0, b.jsxs)(b.Fragment, {
						children: [
							n &&
								g &&
								(0, b.jsx)(Bl, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (O) => {
										O.relatedTarget !== D.current && Na(O, g) ? Wi(C.current) : Wi(y0());
									},
								}),
							n && (0, b.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							n &&
								g &&
								(0, b.jsx)(Bl, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (O) => {
										if (Na(O, g)) Wi(A.current);
										else {
											const I = id();
											if (I === C.current) {
												requestAnimationFrame(() => {
													var L;
													return (L = id()) == null ? void 0 : L.focus();
												});
												return;
											}
											Wi(I);
										}
									},
								}),
						],
					});
					return (p && n && (R = (0, Gu.createPortal)(R, p)), (0, b.jsxs)(b.Fragment, { children: [R, T] }));
				},
				[g, v, o, f.id, n, p],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	Zk = je(function (n) {
		return Ue(zN, Lp(n));
	}),
	T0 = (0, w.createContext)(0);
function qN({ level: e, children: n }) {
	const a = (0, w.useContext)(T0),
		u = Math.max(Math.min(e || a + 1, 6), 1);
	return (0, b.jsx)(T0.Provider, { value: u, children: n });
}
var IN = "div",
	$p = Le(function ({ autoFocusOnShow: n = !0, ...a }) {
		return ((a = Bt(a, (u) => (0, b.jsx)(kp.Provider, { value: n, children: u }), [n])), a);
	}),
	Qk = je(function (n) {
		return Ue(IN, $p(n));
	});
function UN(e, n) {
	const a = nt(e).createElement("button");
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
function LN(e) {
	const n = (0, w.useRef)();
	return (
		(0, w.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return $t(
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
var ud = new WeakMap();
function vs(e, n, a) {
	ud.has(e) || ud.set(e, new Map());
	const u = ud.get(e),
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
function lh(e, n, a) {
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
function Ia(e, n, a) {
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
function Td(e, n) {
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
function $N(e, n, a) {
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
var BN = ["SCRIPT", "STYLE"];
function Ad(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function VN(e, n) {
	const a = nt(n),
		u = Ad(e);
	if (!a.body[u]) return !0;
	do {
		if (n === a.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function HN(e, n, a) {
	return BN.includes(n.tagName) || !VN(e, n) ? !1 : !a.some((u) => u && Et(n, u));
}
function oh(e, n, a, u) {
	for (let l of n) {
		if (!l?.isConnected) continue;
		const o = n.some((m) => (!m || m === l ? !1 : m.contains(l))),
			f = nt(l),
			h = l;
		for (; l.parentElement && l !== f.body; ) {
			if ((u?.(l.parentElement, h), !o)) for (const m of l.parentElement.children) HN(e, m, n) && a(m, h);
			l = l.parentElement;
		}
	}
}
function ZN(e, n) {
	const { body: a } = nt(n[0]),
		u = [];
	return (
		oh(e, n, (o) => {
			u.push(Ia(o, Ad(e), !0));
		}),
		un(Ia(a, Ad(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function Bp(e, ...n) {
	if (!e) return !1;
	const a = e.getAttribute("data-backdrop");
	return a == null ? !1 : a === "" || a === "true" || !n.length ? !0 : n.some((u) => a === u);
}
function Br(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function QN(e, n = "") {
	return un(Ia(e, Br(), !0), Ia(e, Br(n), !0));
}
function Vp(e, n = "") {
	return un(Ia(e, Br("", !0), !0), Ia(e, Br(n, !0), !0));
}
function ch(e, n) {
	const a = Br(n, !0);
	if (e[a]) return !0;
	const u = Br(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function A0(e, n) {
	const a = [],
		u = n.map((o) => o?.id);
	return (
		oh(
			e,
			n,
			(o) => {
				Bp(o, ...u) || a.unshift(QN(o, e));
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
function PN(e) {
	return e.tagName === "HTML" ? !0 : Et(nt(e).body, e);
}
function YN(e, n) {
	if (!e) return !1;
	if (Et(e, n)) return !0;
	const a = n.getAttribute("aria-activedescendant");
	if (a) {
		const u = nt(e).getElementById(a);
		if (u) return Et(e, u);
	}
	return !1;
}
function FN(e, n) {
	if (!("clientY" in e)) return !1;
	const a = n.getBoundingClientRect();
	return a.width === 0 || a.height === 0
		? !1
		: a.top <= e.clientY && e.clientY <= a.top + a.height && a.left <= e.clientX && e.clientX <= a.left + a.width;
}
function sd({ store: e, type: n, listener: a, capture: u, domReady: l }) {
	const o = xe(a),
		f = xt(e, "open"),
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
					? $t(
							n,
							(v) => {
								const { contentElement: g, disclosureElement: _ } = e.getState(),
									p = v.target;
								g &&
									p &&
									PN(p) &&
									(Et(g, p) ||
										YN(_, p) ||
										p.hasAttribute("data-focus-trap") ||
										FN(v, g) ||
										(h.current && !ch(p, g.id)) ||
										dN(p) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function ld(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function KN(e, n, a) {
	const u = LN(xt(e, "open")),
		l = { store: e, domReady: a, capture: !0 };
	(sd({
		...l,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && mp(h) && ch(h, f?.id) && ld(n, o) && e.hide();
		},
	}),
		sd({
			...l,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== nt(f) && ld(n, o) && e.hide();
			},
		}),
		sd({
			...l,
			type: "contextmenu",
			listener: (o) => {
				ld(n, o) && e.hide();
			},
		}));
}
var R0 = (0, w.createContext)({});
function GN(e) {
	const n = (0, w.useContext)(R0),
		[a, u] = (0, w.useState)([]),
		l = (0, w.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					un((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	He(
		() =>
			Zt(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, w.useMemo)(() => ({ store: e, add: l }), [e, l]);
	return {
		wrapElement: (0, w.useCallback)((f) => (0, b.jsx)(R0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: a,
	};
}
function XN({ attribute: e, contentId: n, contentElement: a, enabled: u }) {
	const [l, o] = xp(),
		f = (0, w.useCallback)(() => {
			if (!u || !a) return !1;
			const { body: h } = nt(a),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [l, u, a, e, n]);
	return (
		(0, w.useEffect)(() => {
			if (!u || !n || !a) return;
			const { body: h } = nt(a);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, Gu.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [l, u, n, a, f, e]),
		f
	);
}
function JN(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function WN(e, n, a) {
	const u = XN({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: a });
	(0, w.useEffect)(() => {
		if (!u() || !e) return;
		const l = nt(e),
			o = hp(e),
			{ documentElement: f, body: h } = l,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => $N(f, "--scrollbar-width", `${v}px`),
			_ = JN(f),
			p = () => Td(h, { overflow: "hidden", [_]: `${v}px` }),
			S = () => {
				var C, A;
				const { scrollX: D, scrollY: T, visualViewport: R } = o,
					O = (C = R?.offsetLeft) != null ? C : 0,
					I = (A = R?.offsetTop) != null ? A : 0,
					L = Td(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(T - Math.floor(I))}px`,
						left: `${-(D - Math.floor(O))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(L(), o.scrollTo({ left: D, top: T, behavior: "instant" }));
				};
			},
			E = Pd() && !dO();
		return un(g(), E ? S() : p());
	}, [u, e]);
}
function e2(e, ...n) {
	if (!e) return !1;
	const a = e.getAttribute("data-focus-trap");
	return a == null ? !1 : n.length ? (a === "" ? !1 : n.some((u) => a === u)) : !0;
}
function Hp() {
	return "inert" in HTMLElement.prototype;
}
function t2(e) {
	return lh(e, "aria-hidden", "true");
}
function Zp(e, n) {
	return "style" in e
		? Hp()
			? Ia(e, "inert", !0)
			: un(
					...To(e, !0).map((a) => {
						if (n?.some((l) => l && Et(l, a))) return Zu;
						const u = vs(
							a,
							"focus",
							() => (
								(a.focus = Zu),
								() => {
									delete a.focus;
								}
							),
						);
						return un(lh(a, "tabindex", "-1"), u);
					}),
					t2(e),
					Td(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: Zu;
}
function n2(e, n) {
	const a = [],
		u = n.map((o) => o?.id);
	return (
		oh(
			e,
			n,
			(o) => {
				Bp(o, ...u) || e2(o, ...u) || a.unshift(Zp(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Et(f, o)) || a.unshift(lh(o, "role", "none")));
			},
		),
		() => {
			for (const o of a) o();
		}
	);
}
function Qp(e = {}) {
	const n = _o(e.store, ih(e.disclosure, ["contentElement", "disclosureElement"]));
	const a = n?.getState(),
		u = Ce(e.open, a?.open, e.defaultOpen, !1),
		l = Ce(e.animated, a?.animated, !1),
		o = Ln(
			{
				open: u,
				animated: l,
				animating: !!l && u,
				mounted: u,
				contentElement: Ce(a?.contentElement, null),
				disclosureElement: Ce(a?.disclosureElement, null),
			},
			n,
		);
	return (
		Kt(o, () =>
			Zt(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Kt(o, () =>
			nh(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Kt(o, () =>
			Zt(o, ["open", "animating"], (f) => {
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
		Qr(n, [a.store, a.disclosure]),
		mt(e, a, "open", "setOpen"),
		mt(e, a, "mounted", "setMounted"),
		mt(e, a, "animated"),
		Object.assign(e, { disclosure: a.disclosure })
	);
}
function i2(e = {}) {
	const [n, a] = xo(Qp, e);
	return Pp(n, a, e);
}
var a2 = "div",
	r2 = [
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
	Pk = Le(function (n) {
		return n;
	}),
	eo = je(function (n) {
		return Ue(a2, n);
	});
Object.assign(
	eo,
	r2.reduce(
		(e, n) => (
			(e[n] = je(function (u) {
				return Ue(n, u);
			})),
			e
		),
		{},
	),
);
function u2({ store: e, backdrop: n, alwaysVisible: a, hidden: u }) {
	const l = (0, w.useRef)(null),
		o = i2({ disclosure: e }),
		f = xt(e, "contentElement");
	((0, w.useEffect)(() => {
		const v = l.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		He(() => {
			const v = f?.id;
			if (!v) return;
			const g = l.current;
			if (g) return Vp(g, v);
		}, [f]));
	const h = ah({
		ref: l,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: a,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, w.isValidElement)(n)) return (0, b.jsx)(eo, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, b.jsx)(eo, { ...h, render: (0, b.jsx)(m, {}) });
}
function Yp(e = {}) {
	return Qp(e);
}
function Fp(e, n, a) {
	return Pp(e, n, a);
}
function s2(e = {}) {
	const [n, a] = xo(Yp, e);
	return Fp(n, a, e);
}
var l2 = "div",
	O0 = mo();
function o2(e) {
	const n = Ai();
	return !n || (e && Et(e, n)) ? !1 : !!In(n);
}
function N0(e, n = !1) {
	if (!e) return null;
	const a = "current" in e ? e.current : e;
	return a ? (n ? (In(a) ? a : null) : a) : null;
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
	getPersistentElements: g,
	preventBodyScroll: _ = !!o,
	autoFocusOnShow: p = !0,
	autoFocusOnHide: S = !0,
	initialFocus: E,
	finalFocus: C,
	unmountOnHide: A,
	unstable_treeSnapshotKey: D,
	...T
}) {
	const R = bo(),
		O = (0, w.useRef)(null),
		I = s2({
			store: n || R,
			open: a,
			setOpen(de) {
				if (de) return;
				const Ee = O.current;
				if (!Ee) return;
				const st = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ee.addEventListener("close", u, { once: !0 }),
					Ee.dispatchEvent(st),
					st.defaultPrevented && I.setOpen(!0));
			},
		}),
		{ portalRef: L, domReady: j } = Fd(f, T.portalRef),
		k = T.preserveTabOrder,
		U = xt(I, (de) => k && !o && de.mounted),
		B = Ri(T.id),
		Z = xt(I, "open"),
		ie = xt(I, "mounted"),
		ee = xt(I, "contentElement"),
		K = Eo(ie, T.hidden, T.alwaysVisible);
	(WN(ee, B, _ && !K), KN(I, v, j));
	const { wrapElement: ae, nestedDialogs: z } = GN(I);
	((T = Bt(T, ae, [ae])),
		He(() => {
			if (!Z) return;
			const de = O.current,
				Ee = Ai(de, !0);
			Ee && Ee.tagName !== "BODY" && ((de && Et(de, Ee)) || I.setDisclosureElement(Ee));
		}, [I, Z]),
		O0 &&
			(0, w.useEffect)(() => {
				if (!ie) return;
				const { disclosureElement: de } = I.getState();
				if (!de || !na(de)) return;
				const Ee = () => {
					let st = !1;
					const ze = () => {
						st = !0;
					};
					(de.addEventListener("focusin", ze, { capture: !0, once: !0 }),
						qr(de, "mouseup", () => {
							(de.removeEventListener("focusin", ze, !0), !st && Dp(de));
						}));
				};
				return (
					de.addEventListener("mousedown", Ee),
					() => {
						de.removeEventListener("mousedown", Ee);
					}
				);
			}, [I, ie]),
		(0, w.useEffect)(() => {
			if (!ie || !j) return;
			const de = O.current;
			if (!de) return;
			const Ee = hp(de),
				st = Ee.visualViewport || Ee,
				ze = () => {
					var zt, Ot;
					const ue = (Ot = (zt = Ee.visualViewport) == null ? void 0 : zt.height) != null ? Ot : Ee.innerHeight;
					de.style.setProperty("--dialog-viewport-height", `${ue}px`);
				};
			return (
				ze(),
				st.addEventListener("resize", ze),
				() => {
					st.removeEventListener("resize", ze);
				}
			);
		}, [ie, j]),
		(0, w.useEffect)(() => {
			if (!o || !ie || !j) return;
			const de = O.current;
			if (de && !de.querySelector("[data-dialog-dismiss]")) return UN(de, I.hide);
		}, [I, o, ie, j]),
		He(() => {
			if (!Hp() || Z || !ie || !j) return;
			const de = O.current;
			if (de) return Zp(de);
		}, [Z, ie, j]));
	const H = Z && j;
	He(() => {
		if (!B || !H) return;
		const de = O.current;
		return ZN(B, [de]);
	}, [B, H, D]);
	const $ = xe(g);
	He(() => {
		if (!B || !H) return;
		const { disclosureElement: de } = I.getState(),
			Ee = [O.current, ...($() || []), ...z.map((st) => st.getState().contentElement)];
		return o ? un(A0(B, Ee), n2(B, Ee)) : A0(B, [de, ...Ee]);
	}, [B, I, H, $, z, o, D]);
	const G = !!p,
		oe = rt(p),
		[_e, N] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (!Z || !G || !j || !ee?.isConnected) return;
		const de = N0(E, !0) || ee.querySelector("[data-autofocus=true],[autofocus]") || nN(ee, !0, f && U) || ee,
			Ee = In(de);
		oe(Ee ? de : null) &&
			(N(!0),
			queueMicrotask(() => {
				(de.focus(), O0 && Ee && de.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [Z, G, j, ee, E, f, U, oe]);
	const X = !!S,
		re = rt(S),
		[le, me] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (Z) return (me(!0), () => me(!1));
	}, [Z]);
	const ve = (0, w.useCallback)(
			(de, Ee = !0) => {
				const { disclosureElement: st } = I.getState();
				if (o2(de)) return;
				let ze = N0(C) || st;
				if (ze?.id) {
					const Ot = nt(ze),
						ue = `[aria-activedescendant="${ze.id}"]`,
						Re = Ot.querySelector(ue);
					Re && (ze = Re);
				}
				if (ze && !In(ze)) {
					const Ot = ze.closest("[data-dialog]");
					if (Ot?.id) {
						const ue = nt(Ot),
							Re = `[aria-controls~="${Ot.id}"]`,
							it = ue.querySelector(Re);
						it && (ze = it);
					}
				}
				const zt = ze && In(ze);
				if (!zt && Ee) {
					requestAnimationFrame(() => ve(de, !1));
					return;
				}
				re(zt ? ze : null) && zt && ze?.focus({ preventScroll: !0 });
			},
			[I, C, re],
		),
		Se = (0, w.useRef)(!1);
	(He(() => {
		if (Z || !le || !X) return;
		const de = O.current;
		((Se.current = !0), ve(de));
	}, [Z, le, j, X, ve]),
		(0, w.useEffect)(() => {
			if (!le || !X) return;
			const de = O.current;
			return () => {
				if (Se.current) {
					Se.current = !1;
					return;
				}
				ve(de);
			};
		}, [le, X, ve]));
	const Ze = rt(m);
	((0, w.useEffect)(
		() =>
			!j || !ie
				? void 0
				: $t(
						"keydown",
						(Ee) => {
							if (Ee.key !== "Escape" || Ee.defaultPrevented) return;
							const st = O.current;
							if (!st || ch(st)) return;
							const ze = Ee.target;
							if (!ze) return;
							const { disclosureElement: zt } = I.getState();
							!!(ze.tagName === "BODY" || Et(st, ze) || !zt || Et(zt, ze)) && Ze(Ee) && I.hide();
						},
						!0,
					),
		[I, j, ie, Ze],
	),
		(T = Bt(T, (de) => (0, b.jsx)(qN, { level: o ? 1 : void 0, children: de }), [o])));
	const qe = T.hidden,
		At = T.alwaysVisible;
	T = Bt(
		T,
		(de) =>
			h
				? (0, b.jsxs)(b.Fragment, {
						children: [(0, b.jsx)(u2, { store: I, backdrop: h, hidden: qe, alwaysVisible: At }), de],
					})
				: de,
		[I, h, qe, At],
	);
	const [Pt, pn] = (0, w.useState)(),
		[on, ot] = (0, w.useState)();
	return (
		(T = Bt(
			T,
			(de) =>
				(0, b.jsx)(Jd, {
					value: I,
					children: (0, b.jsx)(zO.Provider, {
						value: pn,
						children: (0, b.jsx)(kO.Provider, { value: ot, children: de }),
					}),
				}),
			[I],
		)),
		(T = {
			id: B,
			"data-dialog": "",
			role: "dialog",
			tabIndex: l ? -1 : void 0,
			"aria-labelledby": Pt,
			"aria-describedby": on,
			...T,
			ref: gt(O, T.ref),
		}),
		(T = $p({ ...T, autoFocusOnShow: _e })),
		(T = ah({ store: I, ...T })),
		(T = ms({ ...T, focusable: l })),
		(T = Lp({ portal: f, ...T, portalRef: L, preserveTabOrder: U })),
		T
	);
});
function gs(e, n = bo) {
	return je(function (u) {
		const l = n();
		return xt(u.store || l, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, b.jsx)(e, { ...u }) : null;
	});
}
var Yk = gs(
		je(function (n) {
			return Ue(l2, Kp(n));
		}),
		bo,
	),
	ia = Math.min,
	Ei = Math.max,
	to = Math.round,
	Vl = Math.floor,
	Ci = (e) => ({ x: e, y: e }),
	c2 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Gp(e, n, a) {
	return Ei(e, ia(n, a));
}
function aa(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function ra(e) {
	return e.split("-")[0];
}
function Pr(e) {
	return e.split("-")[1];
}
function fh(e) {
	return e === "x" ? "y" : "x";
}
function dh(e) {
	return e === "y" ? "height" : "width";
}
function Yn(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function hh(e) {
	return fh(Yn(e));
}
function f2(e, n, a) {
	a === void 0 && (a = !1);
	const u = Pr(e),
		l = hh(e),
		o = dh(l);
	let f = l === "x" ? (u === (a ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = no(f)), [f, no(f)]);
}
function d2(e) {
	const n = no(e);
	return [Rd(e), n, Rd(n)];
}
function Rd(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var M0 = ["left", "right"],
	z0 = ["right", "left"],
	h2 = ["top", "bottom"],
	m2 = ["bottom", "top"];
function v2(e, n, a) {
	switch (e) {
		case "top":
		case "bottom":
			return a ? (n ? z0 : M0) : n ? M0 : z0;
		case "left":
		case "right":
			return n ? h2 : m2;
		default:
			return [];
	}
}
function g2(e, n, a, u) {
	const l = Pr(e);
	let o = v2(ra(e), a === "start", u);
	return (l && ((o = o.map((f) => f + "-" + l)), n && (o = o.concat(o.map(Rd)))), o);
}
function no(e) {
	const n = ra(e);
	return c2[n] + e.slice(n.length);
}
function y2(e) {
	var n, a, u, l;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (a = e.right) != null ? a : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (l = e.left) != null ? l : 0,
	};
}
function Xp(e) {
	return typeof e != "number" ? y2(e) : { top: e, right: e, bottom: e, left: e };
}
function io(e) {
	const { x: n, y: a, width: u, height: l } = e;
	return { width: u, height: l, top: a, left: n, right: n + u, bottom: a + l, x: n, y: a };
}
function k0(e, n, a) {
	let { reference: u, floating: l } = e;
	const o = Yn(n),
		f = hh(n),
		h = dh(f),
		m = ra(n),
		v = o === "y",
		g = u.x + u.width / 2 - l.width / 2,
		_ = u.y + u.height / 2 - l.height / 2,
		p = u[h] / 2 - l[h] / 2;
	let S;
	switch (m) {
		case "top":
			S = { x: g, y: u.y - l.height };
			break;
		case "bottom":
			S = { x: g, y: u.y + u.height };
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
	const E = Pr(n);
	return (E && (S[f] += p * (E === "end" ? 1 : -1) * (a && v ? -1 : 1)), S);
}
async function b2(e, n) {
	var a;
	n === void 0 && (n = {});
	const { x: u, y: l, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: _ = "floating",
			altBoundary: p = !1,
			padding: S = 0,
		} = aa(n, e),
		E = Xp(S),
		C = h[p ? (_ === "floating" ? "reference" : "floating") : _],
		A = io(
			await o.getClippingRect({
				element:
					(a = await (o.isElement == null ? void 0 : o.isElement(C))) == null || a
						? C
						: C.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: v,
				rootBoundary: g,
				strategy: m,
			}),
		),
		D = _ === "floating" ? { x: u, y: l, width: f.floating.width, height: f.floating.height } : f.reference,
		T = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		R = ((await (o.isElement == null ? void 0 : o.isElement(T))) &&
			(await (o.getScale == null ? void 0 : o.getScale(T)))) || { x: 1, y: 1 },
		O = io(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: D,
						offsetParent: T,
						strategy: m,
					})
				: D,
		);
	return {
		top: (A.top - O.top + E.top) / R.y,
		bottom: (O.bottom - A.bottom + E.bottom) / R.y,
		left: (A.left - O.left + E.left) / R.x,
		right: (O.right - A.right + E.right) / R.x,
	};
}
var p2 = 50,
	S2 = async (e, n, a) => {
		const { placement: u = "bottom", strategy: l = "absolute", middleware: o = [], platform: f } = a,
			h = f.detectOverflow ? f : { ...f, detectOverflow: b2 },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: l }),
			{ x: g, y: _ } = k0(v, u, m),
			p = u,
			S = 0;
		const E = {};
		for (let C = 0; C < o.length; C++) {
			const A = o[C];
			if (!A) continue;
			const { name: D, fn: T } = A,
				{
					x: R,
					y: O,
					data: I,
					reset: L,
				} = await T({
					x: g,
					y: _,
					initialPlacement: u,
					placement: p,
					strategy: l,
					middlewareData: E,
					rects: v,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((g = R ?? g),
				(_ = O ?? _),
				(E[D] = { ...E[D], ...I }),
				L &&
					S < p2 &&
					(S++,
					typeof L == "object" &&
						(L.placement && (p = L.placement),
						L.rects &&
							(v = L.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: l }) : L.rects),
						({ x: g, y: _ } = k0(v, p, m))),
					(C = -1)));
		}
		return { x: g, y: _, placement: p, strategy: l, middlewareData: E };
	},
	w2 = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: a, y: u, placement: l, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: g = 0 } = aa(e, n) || {};
			if (v == null) return {};
			const _ = Xp(g),
				p = { x: a, y: u },
				S = hh(l),
				E = dh(S),
				C = await f.getDimensions(v),
				A = S === "y",
				D = A ? "top" : "left",
				T = A ? "bottom" : "right",
				R = A ? "clientHeight" : "clientWidth",
				O = o.reference[E] + o.reference[S] - p[S] - o.floating[E],
				I = p[S] - o.reference[S],
				L = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let j = L ? L[R] : 0;
			(!j || !(await (f.isElement == null ? void 0 : f.isElement(L)))) && (j = h.floating[R] || o.floating[E]);
			const k = O / 2 - I / 2,
				U = j / 2 - C[E] / 2 - 1,
				B = ia(_[D], U),
				Z = ia(_[T], U),
				ie = j - C[E] - Z,
				ee = j / 2 - C[E] / 2 + k,
				K = Gp(B, ee, ie),
				ae = !m.arrow && Pr(l) != null && ee !== K && o.reference[E] / 2 - (ee < B ? B : Z) - C[E] / 2 < 0,
				z = ae ? (ee < B ? ee - B : ee - ie) : 0;
			return {
				[S]: p[S] + z,
				data: { [S]: K, centerOffset: ee - K - z, ...(ae && { alignmentOffset: z }) },
				reset: ae,
			};
		},
	}),
	_2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var a, u;
					const { placement: l, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = n,
						{
							mainAxis: g = !0,
							crossAxis: _ = !0,
							fallbackPlacements: p,
							fallbackStrategy: S = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: C = !0,
							...A
						} = aa(e, n);
					if ((a = o.arrow) != null && a.alignmentOffset) return {};
					const D = ra(l),
						T = Yn(h),
						R = ra(h) === h,
						O = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						I = p || (R || !C ? [no(h)] : d2(h)),
						L = E !== "none";
					!p && L && I.push(...g2(h, C, E, O));
					const j = [h, ...I],
						k = await m.detectOverflow(n, A),
						U = [];
					let B = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && U.push(k[D]), _)) {
						const K = f2(l, f, O);
						U.push(k[K[0]], k[K[1]]);
					}
					if (((B = [...B, { placement: l, overflows: U }]), !U.every((K) => K <= 0))) {
						var Z, ie;
						const K = (((Z = o.flip) == null ? void 0 : Z.index) || 0) + 1,
							ae = j[K];
						if (
							ae &&
							(!(_ === "alignment" && T !== Yn(ae)) ||
								B.every((H) => (Yn(H.placement) === T ? H.overflows[0] > 0 : !0)))
						)
							return { data: { index: K, overflows: B }, reset: { placement: ae } };
						let z =
							(ie = B.filter((H) => H.overflows[0] <= 0).sort((H, $) => H.overflows[1] - $.overflows[1])[0]) == null
								? void 0
								: ie.placement;
						if (!z)
							switch (S) {
								case "bestFit": {
									var ee;
									const H =
										(ee = B.filter(($) => {
											if (L) {
												const G = Yn($.placement);
												return G === T || G === "y";
											}
											return !0;
										})
											.map(($) => [$.placement, $.overflows.filter((G) => G > 0).reduce((G, oe) => G + oe, 0)])
											.sort(($, G) => $[1] - G[1])[0]) == null
											? void 0
											: ee[0];
									H && (z = H);
									break;
								}
								case "initialPlacement":
									z = h;
									break;
							}
						if (l !== z) return { reset: { placement: z } };
					}
					return {};
				},
			}
		);
	},
	Jp = new Set(["left", "top"]);
async function x2(e, n) {
	const { placement: a, platform: u, elements: l } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)),
		f = ra(a),
		h = Pr(a),
		m = Yn(a) === "y",
		v = Jp.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		_ = aa(n, e);
	let {
		mainAxis: p,
		crossAxis: S,
		alignmentAxis: E,
	} = typeof _ == "number"
		? { mainAxis: _, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: _.mainAxis || 0, crossAxis: _.crossAxis || 0, alignmentAxis: _.alignmentAxis };
	return (
		h && typeof E == "number" && (S = h === "end" ? E * -1 : E),
		m ? { x: S * g, y: p * v } : { x: p * v, y: S * g }
	);
}
var E2 = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var a, u;
					const { x: l, y: o, placement: f, middlewareData: h } = n,
						m = await x2(n, e);
					return f === ((a = h.offset) == null ? void 0 : a.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: l + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	C2 = function (e) {
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
								fn: (T) => {
									let { x: R, y: O } = T;
									return { x: R, y: O };
								},
							},
							...v
						} = aa(e, n),
						g = { x: a, y: u },
						_ = await o.detectOverflow(n, v),
						p = Yn(l),
						S = fh(p);
					let E = g[S],
						C = g[p];
					const A = (T, R) => Gp(R + _[T === "y" ? "top" : "left"], R, R - _[T === "y" ? "bottom" : "right"]);
					(f && (E = A(S, E)), h && (C = A(p, C)));
					const D = m.fn({ ...n, [S]: E, [p]: C });
					return { ...D, data: { x: D.x - a, y: D.y - u, enabled: { [S]: f, [p]: h } } };
				},
			}
		);
	},
	T2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var a, u;
					const { x: l, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: _ = !0 } = aa(e, n),
						p = { x: l, y: o },
						S = Yn(f),
						E = fh(S);
					let C = p[E],
						A = p[S];
					const D = aa(v, n),
						T =
							typeof D == "number"
								? { mainAxis: D, crossAxis: 0 }
								: { mainAxis: (a = D.mainAxis) != null ? a : 0, crossAxis: (u = D.crossAxis) != null ? u : 0 };
					if (g) {
						const I = E === "y" ? "height" : "width",
							L = h.reference[E] - h.floating[I] + T.mainAxis,
							j = h.reference[E] + h.reference[I] - T.mainAxis;
						C < L ? (C = L) : C > j && (C = j);
					}
					if (_) {
						var R, O;
						const I = E === "y" ? "width" : "height",
							L = Jp.has(ra(f)),
							j =
								h.reference[S] -
								h.floating[I] +
								((L && ((R = m.offset) == null ? void 0 : R[S])) || 0) +
								(L ? 0 : T.crossAxis),
							k =
								h.reference[S] +
								h.reference[I] +
								(L ? 0 : ((O = m.offset) == null ? void 0 : O[S]) || 0) -
								(L ? T.crossAxis : 0);
						A < j ? (A = j) : A > k && (A = k);
					}
					return { [E]: C, [S]: A };
				},
			}
		);
	},
	A2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: a, rects: u, platform: l, elements: o } = n,
						{ apply: f = () => {}, ...h } = aa(e, n),
						m = await l.detectOverflow(n, h),
						v = ra(a),
						g = Pr(a),
						_ = Yn(a) === "y",
						{ width: p, height: S } = u.floating;
					let E, C;
					v === "top" || v === "bottom"
						? ((E = v),
							(C =
								g === ((await (l.isRTL == null ? void 0 : l.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((C = v), (E = g === "end" ? "top" : "bottom"));
					const A = S - m.top - m.bottom,
						D = p - m.left - m.right,
						T = ia(S - m[E], A),
						R = ia(p - m[C], D),
						O = n.middlewareData.shift,
						I = !O;
					let L = T,
						j = R;
					(O != null && O.enabled.x && (j = D),
						O != null && O.enabled.y && (L = A),
						I && !g && (_ ? (j = p - 2 * Ei(m.left, m.right)) : (L = S - 2 * Ei(m.top, m.bottom))),
						await f({ ...n, availableWidth: j, availableHeight: L }));
					const k = await l.getDimensions(o.floating);
					return p !== k.width || S !== k.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Ao() {
	return typeof window < "u";
}
function Yr(e) {
	return Wp(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function rn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Oi(e) {
	var n;
	return (n = (Wp(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function Wp(e) {
	return Ao() ? e instanceof Node || e instanceof rn(e).Node : !1;
}
function Fn(e) {
	return Ao() ? e instanceof Element || e instanceof rn(e).Element : !1;
}
function la(e) {
	return Ao() ? e instanceof HTMLElement || e instanceof rn(e).HTMLElement : !1;
}
function D0(e) {
	return !Ao() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof rn(e).ShadowRoot;
}
function Ro(e) {
	const { overflow: n, overflowX: a, overflowY: u, display: l } = Kn(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + a) && l !== "inline" && l !== "contents";
}
function R2(e) {
	return /^(table|td|th)$/.test(Yr(e));
}
function Oo(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var O2 = /transform|translate|scale|rotate|perspective|filter/,
	N2 = /paint|layout|strict|content/,
	Oa = (e) => !!e && e !== "none",
	od;
function mh(e) {
	const n = Fn(e) ? Kn(e) : e;
	return (
		Oa(n.transform) ||
		Oa(n.translate) ||
		Oa(n.scale) ||
		Oa(n.rotate) ||
		Oa(n.perspective) ||
		(!vh() && (Oa(n.backdropFilter) || Oa(n.filter))) ||
		O2.test(n.willChange || "") ||
		N2.test(n.contain || "")
	);
}
function M2(e) {
	let n = Ua(e);
	for (; la(n) && !Wu(n); ) {
		if (mh(n)) return n;
		if (Oo(n)) return null;
		n = Ua(n);
	}
	return null;
}
function vh() {
	return (od == null && (od = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), od);
}
function Wu(e) {
	return /^(html|body|#document)$/.test(Yr(e));
}
function Kn(e) {
	return rn(e).getComputedStyle(e);
}
function No(e) {
	return Fn(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ua(e) {
	if (Yr(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (D0(e) && e.host) || Oi(e);
	return D0(n) ? n.host : n;
}
function eS(e) {
	const n = Ua(e);
	return Wu(n) ? (e.ownerDocument || e).body : la(n) && Ro(n) ? n : eS(n);
}
function es(e, n, a) {
	var u;
	(n === void 0 && (n = []), a === void 0 && (a = !0));
	const l = eS(e),
		o = l === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = rn(l);
	if (o) {
		const h = Od(f);
		return n.concat(f, f.visualViewport || [], Ro(l) ? l : [], h && a ? es(h) : []);
	} else return n.concat(l, es(l, [], a));
}
function Od(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function tS(e) {
	const n = Kn(e);
	let a = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const l = la(e),
		o = l ? e.offsetWidth : a,
		f = l ? e.offsetHeight : u,
		h = to(a) !== o || to(u) !== f;
	return (h && ((a = o), (u = f)), { width: a, height: u, $: h });
}
function gh(e) {
	return Fn(e) ? e : e.contextElement;
}
function Ir(e) {
	const n = gh(e);
	if (!la(n)) return Ci(1);
	const a = n.getBoundingClientRect(),
		{ width: u, height: l, $: o } = tS(n);
	let f = (o ? to(a.width) : a.width) / u,
		h = (o ? to(a.height) : a.height) / l;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var z2 = Ci(0);
function nS(e) {
	const n = rn(e);
	return !vh() || !n.visualViewport ? z2 : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function k2(e, n, a) {
	return (n === void 0 && (n = !1), !!a && n && a === rn(e));
}
function La(e, n, a, u) {
	(n === void 0 && (n = !1), a === void 0 && (a = !1));
	const l = e.getBoundingClientRect(),
		o = gh(e);
	let f = Ci(1);
	n && (u ? Fn(u) && (f = Ir(u)) : (f = Ir(e)));
	const h = k2(o, a, u) ? nS(o) : Ci(0);
	let m = (l.left + h.x) / f.x,
		v = (l.top + h.y) / f.y,
		g = l.width / f.x,
		_ = l.height / f.y;
	if (o && u) {
		const p = rn(o),
			S = Fn(u) ? rn(u) : u;
		let E = p,
			C = Od(E);
		for (; C && S !== E; ) {
			const A = Ir(C),
				D = C.getBoundingClientRect(),
				T = Kn(C),
				R = D.left + (C.clientLeft + parseFloat(T.paddingLeft)) * A.x,
				O = D.top + (C.clientTop + parseFloat(T.paddingTop)) * A.y;
			((m *= A.x), (v *= A.y), (g *= A.x), (_ *= A.y), (m += R), (v += O), (E = rn(C)), (C = Od(E)));
		}
	}
	return io({ width: g, height: _, x: m, y: v });
}
function Mo(e, n) {
	const a = No(e).scrollLeft;
	return n ? n.left + a : La(Oi(e)).left + a;
}
function iS(e, n) {
	const a = e.getBoundingClientRect();
	return { x: a.left + n.scrollLeft - Mo(e, a), y: a.top + n.scrollTop };
}
function D2(e) {
	let { elements: n, rect: a, offsetParent: u, strategy: l } = e;
	const o = l === "fixed",
		f = Oi(u),
		h = n ? Oo(n.floating) : !1;
	if (u === f || (h && o)) return a;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ci(1);
	const g = Ci(0),
		_ = la(u);
	if ((_ || !o) && ((Yr(u) !== "body" || Ro(f)) && (m = No(u)), _)) {
		const S = La(u);
		((v = Ir(u)), (g.x = S.x + u.clientLeft), (g.y = S.y + u.clientTop));
	}
	const p = f && !_ && !o ? iS(f, m) : Ci(0);
	return {
		width: a.width * v.x,
		height: a.height * v.y,
		x: a.x * v.x - m.scrollLeft * v.x + g.x + p.x,
		y: a.y * v.y - m.scrollTop * v.y + g.y + p.y,
	};
}
function j2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function q2(e) {
	const n = No(e),
		a = e.ownerDocument.body,
		u = Ei(e.scrollWidth, e.clientWidth, a.scrollWidth, a.clientWidth),
		l = Ei(e.scrollHeight, e.clientHeight, a.scrollHeight, a.clientHeight);
	let o = -n.scrollLeft + Mo(e);
	const f = -n.scrollTop;
	return (
		Kn(a).direction === "rtl" && (o += Ei(e.clientWidth, a.clientWidth) - u),
		{ width: u, height: l, x: o, y: f }
	);
}
var I2 = 25;
function U2(e, n, a) {
	a === void 0 && (a = "viewport");
	const u = a === "layoutViewport",
		l = rn(e),
		o = Oi(e),
		f = l.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const _ = !vh() || n === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (Mo(o) <= 0) {
		const _ = o.ownerDocument,
			p = _.body,
			S = getComputedStyle(p),
			E = (_.compatMode === "CSS1Compat" && parseFloat(S.marginLeft) + parseFloat(S.marginRight)) || 0,
			C = Math.abs(o.clientWidth - p.clientWidth - E),
			A = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? C / 2 : C;
		A <= I2 && (h -= A);
	}
	return { width: h, height: m, x: v, y: g };
}
function L2(e, n) {
	const a = La(e, !0, n === "fixed"),
		u = a.top + e.clientTop,
		l = a.left + e.clientLeft,
		o = Ir(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: l * o.x, y: u * o.y };
}
function j0(e, n, a) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = U2(e, a, n);
	else if (n === "document") u = q2(Oi(e));
	else if (Fn(n)) u = L2(n, a);
	else {
		const l = nS(e);
		u = { x: n.x - l.x, y: n.y - l.y, width: n.width, height: n.height };
	}
	return io(u);
}
function $2(e, n) {
	const a = n.get(e);
	if (a) return a;
	let u = es(e, [], !1).filter((h) => Fn(h) && Yr(h) !== "body"),
		l = null;
	const o = Kn(e).position === "fixed";
	let f = o ? Ua(e) : e;
	for (; Fn(f) && !Wu(f); ) {
		const h = Kn(f),
			m = mh(f),
			v = l ? l.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (l = h),
			(f = Ua(f)));
	}
	return (n.set(e, u), u);
}
function B2(e) {
	let { element: n, boundary: a, rootBoundary: u, strategy: l } = e;
	const o = [...(a === "clippingAncestors" ? (Oo(n) ? [] : $2(n, this._c)) : [].concat(a)), u],
		f = j0(n, o[0], l);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const p = j0(n, o[_], l);
		((h = Ei(p.top, h)), (m = ia(p.right, m)), (v = ia(p.bottom, v)), (g = Ei(p.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function V2(e) {
	const { width: n, height: a } = tS(e);
	return { width: n, height: a };
}
function H2(e, n, a) {
	const u = la(n),
		l = Oi(n),
		o = a === "fixed",
		f = La(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ci(0);
	if ((u || !o) && ((Yr(n) !== "body" || Ro(l)) && (h = No(n)), u)) {
		const g = La(n, !0, o, n);
		((m.x = g.x + n.clientLeft), (m.y = g.y + n.clientTop));
	}
	!u && l && (m.x = Mo(l));
	const v = l && !u && !o ? iS(l, h) : Ci(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function cd(e) {
	return Kn(e).position === "static";
}
function q0(e, n) {
	if (!la(e) || Kn(e).position === "fixed") return null;
	if (n) return n(e);
	let a = e.offsetParent;
	return (Oi(e) === a && (a = a.ownerDocument.body), a);
}
function aS(e, n) {
	const a = rn(e);
	if (Oo(e)) return a;
	if (!la(e)) {
		let l = Ua(e);
		for (; l && !Wu(l); ) {
			if (Fn(l) && !cd(l)) return l;
			l = Ua(l);
		}
		return a;
	}
	let u = q0(e, n);
	for (; u && R2(u) && cd(u); ) u = q0(u, n);
	return u && Wu(u) && cd(u) && !mh(u) ? a : u || M2(e) || a;
}
var Z2 = async function (e) {
	const n = this.getOffsetParent || aS,
		a = this.getDimensions,
		u = await a(e.floating);
	return {
		reference: H2(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function Q2(e) {
	return Kn(e).direction === "rtl";
}
var P2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: D2,
	getDocumentElement: Oi,
	getClippingRect: B2,
	getOffsetParent: aS,
	getElementRects: Z2,
	getClientRects: j2,
	getDimensions: V2,
	getScale: Ir,
	isElement: Fn,
	isRTL: Q2,
};
function rS(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function Y2(e, n, a) {
	let u = null,
		l;
	const o = Oi(e);
	function f() {
		var g;
		(clearTimeout(l), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, _) {
		(g === void 0 && (g = !1), _ === void 0 && (_ = 1), f());
		const p = e.getBoundingClientRect(),
			{ left: S, top: E, width: C, height: A } = p;
		if ((g || n(), !C || !A)) return;
		const D = Vl(E),
			T = Vl(o.clientWidth - (S + C)),
			R = Vl(o.clientHeight - (E + A)),
			O = Vl(S),
			I = { rootMargin: -D + "px " + -T + "px " + -R + "px " + -O + "px", threshold: Ei(0, ia(1, _)) || 1 };
		let L = !0;
		function j(k) {
			const U = k[0].intersectionRatio;
			if (!rS(p, e.getBoundingClientRect())) return h();
			if (U !== _) {
				if (!L) return h();
				U
					? h(!1, U)
					: (l = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			L = !1;
		}
		try {
			u = new IntersectionObserver(j, { ...I, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(j, I);
		}
		u.observe(e);
	}
	const m = rn(e),
		v = () => h(a);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function F2(e, n, a, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: l = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = gh(e),
		g = l || o ? [...(v ? es(v) : []), ...(n ? es(n) : [])] : [];
	g.forEach((D) => {
		(l && D.addEventListener("scroll", a), o && D.addEventListener("resize", a));
	});
	const _ = v && h ? Y2(v, a, o) : null;
	let p = -1,
		S = null;
	f &&
		((S = new ResizeObserver((D) => {
			let [T] = D;
			(T &&
				T.target === v &&
				S &&
				n &&
				(S.unobserve(n),
				cancelAnimationFrame(p),
				(p = requestAnimationFrame(() => {
					var R;
					(R = S) == null || R.observe(n);
				}))),
				a());
		})),
		v && !m && S.observe(v),
		n && S.observe(n));
	let E,
		C = m ? La(e) : null;
	m && A();
	function A() {
		const D = La(e);
		(C && !rS(C, D) && a(), (C = D), (E = requestAnimationFrame(A)));
	}
	return (
		a(),
		() => {
			var D;
			(g.forEach((T) => {
				(l && T.removeEventListener("scroll", a), o && T.removeEventListener("resize", a));
			}),
				_?.(),
				(D = S) == null || D.disconnect(),
				(S = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var K2 = E2,
	G2 = C2,
	X2 = _2,
	J2 = A2,
	W2 = w2,
	eM = T2,
	tM = (e, n, a) => {
		const u = new Map(),
			l = a ?? {},
			o = { ...P2, ...l.platform, _c: u };
		return S2(e, n, { ...l, platform: o });
	},
	nM = "div";
function I0(e = 0, n = 0, a = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, a, u);
	const l = { x: e, y: n, width: a, height: u, top: n, right: e + a, bottom: n + u, left: e };
	return { ...l, toJSON: () => l };
}
function iM(e) {
	if (!e) return I0();
	const { x: n, y: a, width: u, height: l } = e;
	return I0(n, a, u, l);
}
function aM(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const a = e,
				u = n?.(a);
			return u || !a ? iM(u) : a.getBoundingClientRect();
		},
	};
}
function rM(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function U0(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function uM(e, n) {
	return K2(({ placement: a }) => {
		var u;
		const l = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + l : (u = n.gutter) != null ? u : l;
		return { crossAxis: a.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function sM(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (vt(!n || n.every(rM), !1), X2({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function lM(e) {
	if (!(!e.slide && !e.overlap))
		return G2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: eM() });
}
function oM(e) {
	return J2({
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
function cM(e, n) {
	if (e) return W2({ element: e, padding: n.arrowPadding });
}
var yh = Le(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		preserveTabOrder: l = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: v = 0,
		slide: g = !0,
		overlap: _ = !1,
		sameWidth: p = !1,
		fitViewport: S = !1,
		gutter: E,
		arrowPadding: C = 4,
		overflowPadding: A = 8,
		getAnchorRect: D,
		updatePosition: T,
		...R
	}) {
		const O = po();
		((n = n || O), vt(n, !1));
		const I = n.useState("arrowElement"),
			L = n.useState("anchorElement"),
			j = n.useState("disclosureElement"),
			k = n.useState("popoverElement"),
			U = n.useState("contentElement"),
			B = n.useState("placement"),
			Z = n.useState("mounted"),
			ie = n.useState("rendered"),
			ee = (0, w.useRef)(null),
			[K, ae] = (0, w.useState)(!1),
			{ portalRef: z, domReady: H } = Fd(u, R.portalRef),
			$ = xe(D),
			G = xe(T),
			oe = !!T;
		(He(() => {
			if (!k?.isConnected) return;
			k.style.setProperty("--popover-overflow-padding", `${A}px`);
			const N = aM(L, $),
				X = async () => {
					if (!Z) return;
					I || (ee.current = ee.current || document.createElement("div"));
					const me = I || ee.current,
						ve = [
							uM(me, { gutter: E, shift: v }),
							sM({ flip: m, overflowPadding: A }),
							lM({ slide: g, shift: v, overlap: _, overflowPadding: A }),
							cM(me, { arrowPadding: C }),
							oM({ sameWidth: p, fitViewport: S, overflowPadding: A }),
						],
						Se = await tM(N, k, { placement: B, strategy: h ? "fixed" : "absolute", middleware: ve });
					(n?.setState("currentPlacement", Se.placement), ae(!0));
					const Ze = U0(Se.x),
						qe = U0(Se.y);
					if (
						(Object.assign(k.style, { top: "0", left: "0", transform: `translate3d(${Ze}px,${qe}px,0)` }),
						me && Se.middlewareData.arrow)
					) {
						const { x: At, y: Pt } = Se.middlewareData.arrow,
							pn = Se.placement.split("-")[0],
							on = me.clientWidth / 2,
							ot = me.clientHeight / 2,
							de = At != null ? At + on : -on,
							Ee = Pt != null ? Pt + ot : -ot;
						(k.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${de}px calc(100% + ${ot}px)`,
								bottom: `${de}px ${-ot}px`,
								left: `calc(100% + ${on}px) ${Ee}px`,
								right: `${-on}px ${Ee}px`,
							}[pn],
						),
							Object.assign(me.style, {
								left: At != null ? `${At}px` : "",
								top: Pt != null ? `${Pt}px` : "",
								[pn]: "100%",
							}));
					}
				},
				le = F2(
					N,
					k,
					async () => {
						oe ? (await G({ updatePosition: X }), ae(!0)) : await X();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ae(!1), le());
			};
		}, [n, ie, k, I, L, k, B, Z, H, h, m, v, g, _, p, S, E, C, A, $, oe, G]),
			He(() => {
				if (!Z || !H || !k?.isConnected || !U?.isConnected) return;
				const N = () => {
					k.style.zIndex = getComputedStyle(U).zIndex;
				};
				N();
				let X = requestAnimationFrame(() => {
					X = requestAnimationFrame(N);
				});
				return () => cancelAnimationFrame(X);
			}, [Z, H, k, U]));
		const _e = h ? "fixed" : "absolute";
		return (
			(R = Bt(
				R,
				(N) =>
					(0, b.jsx)("div", {
						...f,
						style: { position: _e, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: N,
					}),
				[n, _e, f],
			)),
			(R = Bt(R, (N) => (0, b.jsx)(So, { value: n, children: N }), [n])),
			(R = { "data-placing": !K || void 0, ...R, style: { position: "relative", ...R.style } }),
			(R = Kp({
				store: n,
				modal: a,
				portal: u,
				preserveTabOrder: l,
				preserveTabOrderAnchor: j || L,
				autoFocusOnShow: K && o,
				...R,
				portalRef: z,
			})),
			R
		);
	}),
	Fk = gs(
		je(function (n) {
			return Ue(nM, yh(n));
		}),
		po,
	),
	fM = "div";
function uS(e, n, a, u) {
	return ta(n) ? !0 : e ? !!(Et(n, e) || (a && Et(a, e)) || u?.some((l) => uS(e, l, a))) : !1;
}
function dM({ store: e, ...n }) {
	const [a, u] = (0, w.useState)(!1),
		l = e.useState("mounted");
	(0, w.useEffect)(() => {
		l || u(!1);
	}, [l]);
	const o = n.onFocus,
		f = xe((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, w.useRef)(null);
	return (
		(0, w.useEffect)(
			() =>
				Zt(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: a, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var L0 = (0, w.createContext)(null),
	sS = Le(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		hideOnEscape: l = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = Wd();
		((n = n || m), vt(n, !1));
		const v = (0, w.useRef)(null),
			[g, _] = (0, w.useState)([]),
			p = (0, w.useRef)(0),
			S = (0, w.useRef)(null),
			{ portalRef: E, domReady: C } = Fd(u, h.portalRef),
			A = Kd(),
			D = !!o,
			T = rt(o),
			R = !!f,
			O = rt(f),
			I = n.useState("open"),
			L = n.useState("mounted");
		((0, w.useEffect)(() => {
			if (!C || !L || (!D && !R)) return;
			const Z = v.current;
			return Z
				? un(
						$t(
							"mousemove",
							(ee) => {
								if (!n || !A()) return;
								const { anchorElement: K, hideTimeout: ae, timeout: z } = n.getState(),
									H = S.current,
									[$] = ee.composedPath(),
									G = K;
								if (uS($, Z, G, g)) {
									((S.current = $ && G && Et(G, $) ? rd(ee) : null), window.clearTimeout(p.current), (p.current = 0));
									return;
								}
								if (!p.current) {
									if (H) {
										const oe = rd(ee);
										if (x0(oe, E0(Z, H))) {
											if (((S.current = oe), !O(ee))) return;
											(ee.preventDefault(), ee.stopPropagation());
											return;
										}
									}
									T(ee) &&
										(p.current = window.setTimeout(() => {
											((p.current = 0), n?.hide());
										}, ae ?? z));
								}
							},
							!0,
						),
						() => clearTimeout(p.current),
					)
				: void 0;
		}, [n, A, C, L, D, R, g, O, T]),
			(0, w.useEffect)(() => {
				if (!C || !L || !R) return;
				const Z = (ie) => {
					const ee = v.current;
					if (!ee) return;
					const K = S.current;
					if (!K) return;
					const ae = E0(ee, K);
					if (x0(rd(ie), ae)) {
						if (!O(ie)) return;
						(ie.preventDefault(), ie.stopPropagation());
					}
				};
				return un($t("mouseenter", Z, !0), $t("mouseover", Z, !0), $t("mouseout", Z, !0), $t("mouseleave", Z, !0));
			}, [C, L, R, O]),
			(0, w.useEffect)(() => {
				C && (I || n?.setAutoFocusOnShow(!1));
			}, [n, C, I]));
		const j = wp(I);
		(0, w.useEffect)(() => {
			if (C)
				return () => {
					j.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, C]);
		const k = (0, w.useContext)(L0);
		He(() => {
			if (a || !u || !L || !C) return;
			const Z = v.current;
			if (Z) return k?.(Z);
		}, [a, u, L, C]);
		const U = (0, w.useCallback)(
			(Z) => {
				_((ee) => [...ee, Z]);
				const ie = k?.(Z);
				return () => {
					(_((ee) => ee.filter((K) => K !== Z)), ie?.());
				};
			},
			[k],
		);
		((h = Bt(h, (Z) => (0, b.jsx)(Tp, { value: n, children: (0, b.jsx)(L0.Provider, { value: U, children: Z }) }), [
			n,
			U,
		])),
			(h = { ...h, ref: gt(v, h.ref) }),
			(h = dM({ store: n, ...h })));
		const B = n.useState((Z) => a || Z.autoFocusOnShow);
		return (
			(h = yh({
				store: n,
				modal: a,
				portal: u,
				autoFocusOnShow: B,
				...h,
				portalRef: E,
				hideOnEscape(Z) {
					return fo(l, Z)
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
	Kk = gs(
		je(function (n) {
			return Ue(fM, sS(n));
		}),
		Wd,
	),
	hM = "div",
	mM = Le(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		hideOnEscape: l = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = wo();
		((n = n || v), vt(n, !1));
		const g = (0, w.useRef)(null),
			_ = n.parent,
			p = n.menubar,
			S = !!_,
			E = !!p && !S;
		m = { ...m, ref: gt(g, m.ref) };
		const { "aria-labelledby": C, ...A } = Ip({ store: n, alwaysVisible: h, ...m });
		m = A;
		const [D, T] = (0, w.useState)(),
			R = n.useState("autoFocusOnShow"),
			O = n.useState("initialFocus"),
			I = n.useState("baseElement"),
			L = n.useState("renderedItems");
		(0, w.useEffect)(() => {
			let ee = !1;
			return (
				T((K) => {
					var ae, z, H;
					if (ee || !R) return;
					if ((ae = K?.current) != null && ae.isConnected) return K;
					const $ = (0, w.createRef)();
					switch (O) {
						case "first":
							$.current = ((z = L.find((G) => !G.disabled && G.element)) == null ? void 0 : z.element) || null;
							break;
						case "last":
							$.current =
								((H = [...L].reverse().find((G) => !G.disabled && G.element)) == null ? void 0 : H.element) || null;
							break;
						default:
							$.current = I;
					}
					return $;
				}),
				() => {
					ee = !0;
				}
			);
		}, [n, R, O, L, I]);
		const j = S ? !1 : a,
			k = !!o,
			U = !!D || !!m.initialFocus || !!j,
			B = xt(n.combobox || n, "contentElement"),
			Z = xt(_?.combobox || _, "contentElement"),
			ie = (0, w.useMemo)(() => {
				if (!Z || !B) return;
				const ee = B.getAttribute("role"),
					K = Z.getAttribute("role");
				if (!((K === "menu" || K === "menubar") && ee === "menu")) return Z;
			}, [B, Z]);
		return (
			ie !== void 0 && (m = { preserveTabOrderAnchor: ie, ...m }),
			(m = sS({
				store: n,
				alwaysVisible: h,
				initialFocus: D,
				autoFocusOnShow: k ? U && o : R || !!j,
				...m,
				hideOnEscape(ee) {
					return fo(l, ee) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(ee) {
					const K = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(ee) : (f ?? (S ? !0 : E ? (K ? !ta(K) : !0) : !1)))
						? ee.defaultPrevented || !S || !K || (hO(K, "mouseout", ee), !ta(K))
							? !0
							: (requestAnimationFrame(() => {
									ta(K) || n?.hide();
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
	vM = gs(
		je(function (n) {
			return Ue(hM, mM(n));
		}),
		wo,
	);
function gM(e) {
	var n;
	const a = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let l = (n = a?.element) == null ? void 0 : n.parentElement;
	for (; l && u?.element; ) {
		if (u && l.contains(u.element)) return l;
		l = l.parentElement;
	}
	return nt(l).body;
}
function yM(e) {
	return e?.__unstablePrivateStore;
}
function bM(e = {}) {
	var n;
	e.store;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = Ce(e.items, a?.items, e.defaultItems, []),
		l = new Map(u.map((p) => [p.id, p])),
		o = { items: u, renderedItems: Ce(a?.renderedItems, []) },
		f = yM(e.store),
		h = Ln({ items: u, renderedItems: o.renderedItems }, f),
		m = Ln(o, e.store),
		v = (p) => {
			const S = gp(p, (E) => E.element);
			(h.setState("renderedItems", S), m.setState("renderedItems", S));
		};
	(Kt(m, () => th(h)),
		Kt(h, () =>
			Wl(h, ["items"], (p) => {
				m.setState("items", p.items);
			}),
		),
		Kt(h, () =>
			Wl(h, ["renderedItems"], (p) => {
				let S = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: T } = m.getState();
						p.renderedItems !== T && v(p.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const C = () => {
						if (S) {
							S = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => v(p.renderedItems))));
					},
					A = gM(p.renderedItems),
					D = new IntersectionObserver(C, { root: A });
				for (const T of p.renderedItems) T.element && D.observe(T.element);
				return () => {
					(cancelAnimationFrame(E), D.disconnect());
				};
			}),
		));
	const g = (p, S, E = !1) => {
			let C;
			return (
				S((D) => {
					const T = D.findIndex(({ id: O }) => O === p.id),
						R = D.slice();
					if (T !== -1) {
						C = D[T];
						const O = { ...C, ...p };
						((R[T] = O), l.set(p.id, O));
					} else (R.push(p), l.set(p.id, p));
					return R;
				}),
				() => {
					S((D) => {
						if (!C) return (E && l.delete(p.id), D.filter(({ id: O }) => O !== p.id));
						const T = D.findIndex(({ id: O }) => O === p.id);
						if (T === -1) return D;
						const R = D.slice();
						return ((R[T] = C), l.set(p.id, C), R);
					});
				}
			);
		},
		_ = (p) => g(p, (S) => h.setState("items", S), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (p) =>
			un(
				_(p),
				g(p, (S) => h.setState("renderedItems", S)),
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
function pM(e, n, a) {
	return (Qr(n, [a.store]), mt(e, a, "items", "setItems"), e);
}
var SM = { id: null };
function Si(e, n) {
	return e.find((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function wM(e, n) {
	return e.filter((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function $0(e, n) {
	return e.filter((a) => a.rowId === n);
}
function _M(e, n, a = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(a ? [SM] : []), ...e.slice(0, u)];
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
function xM(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function EM(e, n, a) {
	const u = oS(e);
	for (const l of e)
		for (let o = 0; o < u; o += 1) {
			const f = l[o];
			if (!f || (a && f.disabled)) {
				const h = o === 0 && a ? Si(l) : l[o - 1];
				l[o] = h && n !== h.id && a ? h : xM(h?.rowId);
			}
		}
	return e;
}
function CM(e) {
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
		u = bM(e),
		l = Ce(e.activeId, a?.activeId, e.defaultActiveId),
		o = Ln(
			{
				...u.getState(),
				id: Ce(e.id, a?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: l,
				baseElement: Ce(a?.baseElement, null),
				includesBaseElement: Ce(e.includesBaseElement, a?.includesBaseElement, l === null),
				moves: Ce(a?.moves, 0),
				orientation: Ce(e.orientation, a?.orientation, "both"),
				rtl: Ce(e.rtl, a?.rtl, !1),
				virtualFocus: Ce(e.virtualFocus, a?.virtualFocus, !1),
				focusLoop: Ce(e.focusLoop, a?.focusLoop, !1),
				focusWrap: Ce(e.focusWrap, a?.focusWrap, !1),
				focusShift: Ce(e.focusShift, a?.focusShift, !1),
			},
			u,
			e.store,
		);
	Kt(o, () =>
		Zt(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = Si(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, g;
		const _ = o.getState(),
			{
				skip: p = 0,
				activeId: S = _.activeId,
				focusShift: E = _.focusShift,
				focusLoop: C = _.focusLoop,
				focusWrap: A = _.focusWrap,
				includesBaseElement: D = _.includesBaseElement,
				renderedItems: T = _.renderedItems,
				rtl: R = _.rtl,
			} = m,
			O = h === "up" || h === "down",
			I = h === "next" || h === "down",
			L = I ? R && !O : !R || O,
			j = E && !p;
		let k = O ? qp(EM(lS(T), S, j)) : T;
		if (((k = L ? Cd(k) : k), (k = O ? CM(k) : k), S == null)) return (v = Si(k)) == null ? void 0 : v.id;
		const U = k.find(($) => $.id === S);
		if (!U) return (g = Si(k)) == null ? void 0 : g.id;
		const B = k.some(($) => $.rowId),
			Z = k.indexOf(U),
			ie = k.slice(Z + 1),
			ee = $0(ie, U.rowId);
		if (p) {
			const $ = wM(ee, S),
				G = $.slice(p)[0] || $[$.length - 1];
			return G?.id;
		}
		const K = C && (O ? C !== "horizontal" : C !== "vertical"),
			ae = B && A && (O ? A !== "horizontal" : A !== "vertical"),
			z = I ? (!B || O) && K && D : O ? D : !1;
		if (K) {
			const $ = Si(_M(ae && !z ? k : $0(k, U.rowId), S, z), S);
			return $?.id;
		}
		if (ae) {
			const $ = Si(z ? ee : ie, S);
			return z ? $?.id || null : $?.id;
		}
		const H = Si(ee, S);
		return !H && z ? null : H?.id;
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
			return (h = Si(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Si(Cd(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function TM(e) {
	return { id: Ri(e.id), ...e };
}
function fS(e, n, a) {
	return (
		(e = pM(e, n, a)),
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
var AM = "a",
	dS = Le(function ({ store: n, showOnHover: a = !0, ...u }) {
		const l = Wd();
		((n = n || l), vt(n, !1));
		const o = as(u),
			f = (0, w.useRef)(0);
		((0, w.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, w.useEffect)(
				() =>
					$t(
						"mouseleave",
						(C) => {
							if (!n) return;
							const { anchorElement: A } = n.getState();
							A && C.target === A && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[n],
			));
		const h = u.onMouseMove,
			m = rt(a),
			v = Kd(),
			g = xe((E) => {
				if ((h?.(E), o || !n || E.defaultPrevented || f.current || !v() || !m(E))) return;
				const C = E.currentTarget;
				(n.setAnchorElement(C), n.setDisclosureElement(C));
				const { showTimeout: A, timeout: D } = n.getState(),
					T = () => {
						((f.current = 0),
							v() &&
								(n?.setAnchorElement(C),
								n?.show(),
								queueMicrotask(() => {
									n?.setDisclosureElement(C);
								})));
					},
					R = A ?? D;
				R === 0 ? T() : (f.current = window.setTimeout(T, R));
			}),
			_ = u.onClick,
			p = xe((E) => {
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
		return ((u = { ...u, ref: gt(S, u.ref), onMouseMove: g, onClick: p }), (u = ms(u)), u);
	}),
	Gk = je(function (n) {
		return Ue(AM, dS(n));
	}),
	RM = "div",
	bh = Le(function ({ store: n, ...a }) {
		const u = po();
		return ((n = n || u), (a = { ...a, ref: gt(n?.setAnchorElement, a.ref) }), a);
	}),
	Xk = je(function (n) {
		return Ue(RM, bh(n));
	}),
	OM = "button";
function B0(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? na(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? na(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var NM = Symbol("command"),
	ph = Le(function ({ clickOnEnter: n = !0, clickOnSpace: a = !0, ...u }) {
		const l = (0, w.useRef)(null),
			[o, f] = (0, w.useState)(!1);
		(0, w.useEffect)(() => {
			l.current && f(na(l.current));
		}, []);
		const [h, m] = (0, w.useState)(!1),
			v = (0, w.useRef)(!1),
			g = as(u),
			[_, p] = Ep(u, NM, !0),
			S = u.onKeyDown,
			E = xe((D) => {
				S?.(D);
				const T = D.currentTarget;
				if (D.defaultPrevented || _ || g || !bn(D) || Gn(T) || T.isContentEditable) return;
				const R = n && D.key === "Enter",
					O = a && D.key === " ",
					I = D.key === "Enter" && !n,
					L = D.key === " " && !a;
				if (I || L) {
					D.preventDefault();
					return;
				}
				if (R || O) {
					const j = B0(D);
					if (R) {
						if (!j) {
							D.preventDefault();
							const { view: k, ...U } = D,
								B = () => o0(T, U);
							fO() ? qr(T, "keyup", B) : queueMicrotask(B);
						}
					} else O && ((v.current = !0), j || (D.preventDefault(), m(!0)));
				}
			}),
			C = u.onKeyUp,
			A = xe((D) => {
				if ((C?.(D), D.defaultPrevented || _ || g || D.metaKey)) return;
				const T = a && D.key === " ";
				if (v.current && T && ((v.current = !1), !B0(D))) {
					(D.preventDefault(), m(!1));
					const R = D.currentTarget,
						{ view: O, ...I } = D;
					queueMicrotask(() => o0(R, I));
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
				onKeyUp: A,
			}),
			(u = ms(u)),
			u
		);
	}),
	Jk = je(function (n) {
		return Ue(OM, ph(n));
	}),
	hS = "button",
	mS = Le(function (n) {
		const a = (0, w.useRef)(null),
			u = _p(a, hS),
			[l, o] = (0, w.useState)(() => !!u && na({ tagName: u, type: n.type }));
		return (
			(0, w.useEffect)(() => {
				a.current && o(na(a.current));
			}, []),
			(n = { role: !l && u !== "a" ? "button" : void 0, ...n, ref: gt(a, n.ref) }),
			(n = ph(n)),
			n
		);
	}),
	Wk = je(function (n) {
		return Ue(hS, mS(n));
	}),
	MM = "button",
	zM = Symbol("disclosure"),
	vS = Le(function ({ store: n, toggleOnClick: a = !0, ...u }) {
		const l = Xd();
		((n = n || l), vt(n, !1));
		const o = (0, w.useRef)(null),
			[f, h] = (0, w.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, w.useEffect)(() => {
			let A = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (A = !0)), h(v && A));
		}, [m, n, v]);
		const g = u.onClick,
			_ = rt(a),
			[p, S] = Ep(u, zM, !0),
			E = xe((A) => {
				(g?.(A), !A.defaultPrevented && (p || (_(A) && (n?.setDisclosureElement(A.currentTarget), n?.toggle()))));
			}),
			C = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": C?.id, ...S, ...u, ref: gt(o, u.ref), onClick: E }),
			(u = mS(u)),
			u
		);
	}),
	eD = je(function (n) {
		return Ue(MM, vS(n));
	}),
	kM = "button",
	gS = Le(function ({ store: n, ...a }) {
		const u = bo();
		return (
			(n = n || u),
			vt(n, !1),
			(a = { "aria-haspopup": ho(n.useState("contentElement"), "dialog"), ...a }),
			(a = vS({ store: n, ...a })),
			a
		);
	}),
	tD = je(function (n) {
		return Ue(kM, gS(n));
	}),
	DM = "button",
	yS = Le(function ({ store: n, ...a }) {
		const u = po();
		((n = n || u), vt(n, !1));
		const l = a.onClick,
			o = xe((f) => {
				(n?.setAnchorElement(f.currentTarget), l?.(f));
			});
		return (
			(a = Bt(a, (f) => (0, b.jsx)(So, { value: n, children: f }), [n])),
			(a = { ...a, onClick: o }),
			(a = bh({ store: n, ...a })),
			(a = gS({ store: n, ...a })),
			a
		);
	}),
	nD = je(function (n) {
		return Ue(DM, yS(n));
	}),
	jM = "button";
function qM(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function V0(e, n) {
	return !!e?.some((a) => (!a.element || a.element === n ? !1 : a.element.getAttribute("aria-expanded") === "true"));
}
var IM = Le(function ({ store: n, focusable: a, accessibleWhenDisabled: u, showOnHover: l, ...o }) {
		const f = wo();
		((n = n || f), vt(n, !1));
		const h = (0, w.useRef)(null),
			m = n.parent,
			v = n.menubar,
			g = !!m,
			_ = !!v && !g,
			p = as(o),
			S = () => {
				const j = h.current;
				j && (n?.setDisclosureElement(j), n?.setAnchorElement(j), n?.show());
			},
			E = o.onFocus,
			C = xe((j) => {
				if ((E?.(j), p || j.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: k } = v.getState();
				V0(k, j.currentTarget) && S();
			}),
			A = xt(n, (j) => j.placement.split("-")[0]),
			D = o.onKeyDown,
			T = xe((j) => {
				if ((D?.(j), p || j.defaultPrevented)) return;
				const k = qM(j, A);
				k && (j.preventDefault(), S(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(k));
			}),
			R = o.onClick,
			O = xe((j) => {
				if ((R?.(j), j.defaultPrevented || !n)) return;
				const k = !j.detail,
					{ open: U } = n.getState();
				((!U || k) && ((!g || k) && n.setAutoFocusOnShow(!0), n.setInitialFocus(k ? "first" : "container")), g && S());
			});
		((o = Bt(o, (j) => (0, b.jsx)(Rp, { value: n, children: j }), [n])),
			g && (o = { ...o, render: (0, b.jsx)(eo.div, { render: o.render }) }));
		const I = Ri(o.id),
			L = xt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: I,
				role: g || _ ? vp(L, "menuitem") : void 0,
				"aria-haspopup": ho(n.useState("contentElement"), "menu"),
				...o,
				ref: gt(h, o.ref),
				onFocus: C,
				onKeyDown: T,
				onClick: O,
			}),
			(o = dS({
				store: n,
				focusable: a,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (j) => {
					if (
						!(() => {
							if (typeof l == "function") return l(j);
							if (l != null) return l;
							if (g) return !0;
							if (!v) return !1;
							const { items: B } = v.getState();
							return _ && V0(B);
						})()
					)
						return !1;
					const U = _ ? v : m;
					return (U && U.setActiveId(j.currentTarget.id), !0);
				},
			})),
			(o = yS({ store: n, toggleOnClick: !g, focusable: a, accessibleWhenDisabled: u, ...o })),
			(o = eh({ store: n, typeahead: _, ...o })),
			o
		);
	}),
	UM = je(function (n) {
		return Ue(jM, IM(n));
	}),
	LM = "div";
function bS(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function $M(e) {
	const n = bS(e);
	return n ? Et(e.currentTarget, n) : !1;
}
var Nd = Symbol("composite-hover");
function BM(e) {
	let n = bS(e);
	if (!n) return !1;
	do {
		if (Ti(n, Nd) && n[Nd]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var Sh = Le(function ({ store: n, focusOnHover: a = !0, blurOnHoverEnd: u = !!a, ...l }) {
		const o = go();
		((n = n || o), vt(n, !1));
		const f = Kd(),
			h = l.onMouseMove,
			m = rt(a),
			v = xe((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!ta(E.currentTarget)) {
						const C = n?.getState().baseElement;
						C && !qa(C) && C.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			g = l.onMouseLeave,
			_ = rt(u),
			p = xe((E) => {
				var C;
				(g?.(E),
					!E.defaultPrevented &&
						f() &&
						($M(E) ||
							BM(E) ||
							(m(E) && _(E) && (n?.setActiveId(null), (C = n?.getState().baseElement) == null || C.focus()))));
			}),
			S = (0, w.useCallback)((E) => {
				E && (E[Nd] = !0);
			}, []);
		return ((l = { ...l, ref: gt(S, l.ref), onMouseMove: v, onMouseLeave: p }), Va(l));
	}),
	iD = vo(
		je(function (n) {
			return Ue(LM, Sh(n));
		}),
	),
	VM = "div",
	pS = Le(function ({ store: n, shouldRegisterItem: a = !0, getItem: u = dp, element: l, ...o }) {
		const f = wO();
		n = n || f;
		const h = Ri(o.id),
			m = (0, w.useRef)(l);
		return (
			(0, w.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !a) return;
				const g = u({ id: h, element: v });
				return n?.renderItem(g);
			}, [h, a, u, n]),
			(o = { ...o, ref: gt(m, o.ref) }),
			Va(o)
		);
	}),
	aD = je(function (n) {
		return Ue(VM, pS(n));
	}),
	HM = "button";
function ZM(e) {
	return _d(e) ? !0 : e.tagName === "INPUT" && !na(e);
}
function QM(e, n = !1) {
	const a = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		l = Math.max(a * 0.875, a - 40) * 1.5,
		o = n ? a - l + u : l + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function PM(e, n = !1) {
	const { top: a } = e.getBoundingClientRect();
	return n ? a + e.clientHeight : a;
}
function H0(e, n, a, u = !1) {
	var l;
	if (!n || !a) return;
	const { renderedItems: o } = n.getState(),
		f = Qd(e);
	if (!f) return;
	const h = QM(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const _ = m;
		if (((m = a(g)), !m)) break;
		if (m === _) continue;
		const p = (l = ea(n, m)) == null ? void 0 : l.element;
		if (!p) continue;
		const S = PM(p, u) - h,
			E = Math.abs(S);
		if ((u && S <= 0) || (!u && S >= 0)) {
			v !== void 0 && v < E && (m = _);
			break;
		}
		v = E;
	}
	return m;
}
function YM(e, n) {
	return bn(e) ? !1 : Qu(n, e.target);
}
var wh = Le(function ({
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
		const g = go();
		n = n || g;
		const _ = Ri(v.id),
			p = (0, w.useRef)(null),
			S = (0, w.useContext)(TO),
			E = as(v) && !v.accessibleWhenDisabled,
			{
				rowId: C,
				baseElement: A,
				isActiveItem: D,
				ariaSetSize: T,
				ariaPosInSet: R,
				isTabbable: O,
			} = zp(n, {
				rowId(z) {
					if (a) return a;
					if (z && S?.baseElement && S.baseElement === z.baseElement) return S.id;
				},
				baseElement(z) {
					return z?.baseElement || void 0;
				},
				isActiveItem(z) {
					return !!z && z.activeId === _;
				},
				ariaSetSize(z) {
					if (h != null) return h;
					if (z && S?.ariaSetSize && S.baseElement === z.baseElement) return S.ariaSetSize;
				},
				ariaPosInSet(z) {
					if (m != null) return m;
					if (!z || !S?.ariaPosInSet || S.baseElement !== z.baseElement) return;
					const H = z.renderedItems.filter(($) => $.rowId === C);
					return S.ariaPosInSet + H.findIndex(($) => $.id === _);
				},
				isTabbable(z) {
					if (!z?.renderedItems.length) return !0;
					if (z.virtualFocus) return !1;
					if (o) return !0;
					if (z.activeId === null) return !1;
					const H = n?.item(z.activeId);
					return H?.disabled || !H?.element ? !0 : z.activeId === _;
				},
			}),
			I = (0, w.useCallback)(
				(z) => {
					var H;
					const $ = {
						...z,
						id: _ || z.id,
						rowId: C,
						disabled: !!E,
						children: (H = z.element) == null ? void 0 : H.textContent,
					};
					return f ? f($) : $;
				},
				[_, C, E, f],
			),
			L = v.onFocus,
			j = (0, w.useRef)(!1),
			k = xe((z) => {
				if ((L?.(z), z.defaultPrevented || bp(z) || !_ || !n || YM(z, n))) return;
				const { virtualFocus: H, baseElement: $ } = n.getState();
				(n.setActiveId(_),
					_d(z.currentTarget) && BO(z.currentTarget),
					H &&
						bn(z) &&
						(ZM(z.currentTarget) ||
							($?.isConnected &&
								(mo() &&
									z.currentTarget.hasAttribute("data-autofocus") &&
									z.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(j.current = !0),
								z.relatedTarget === $ || Qu(n, z.relatedTarget) ? VO($) : $.focus()))));
			}),
			U = v.onBlurCapture,
			B = xe((z) => {
				if ((U?.(z), z.defaultPrevented)) return;
				const H = n?.getState();
				H?.virtualFocus && j.current && ((j.current = !1), z.preventDefault(), z.stopPropagation());
			}),
			Z = v.onKeyDown,
			ie = rt(u),
			ee = rt(l),
			K = xe((z) => {
				if ((Z?.(z), z.defaultPrevented || !bn(z) || !n)) return;
				const { currentTarget: H } = z,
					$ = n.getState(),
					G = n.item(_),
					oe = !!G?.rowId,
					_e = $.orientation !== "horizontal",
					N = $.orientation !== "vertical",
					X = () => !!(oe || N || !$.baseElement || !Gn($.baseElement)),
					re = {
						ArrowUp: (oe || _e) && n.up,
						ArrowRight: (oe || N) && n.next,
						ArrowDown: (oe || _e) && n.down,
						ArrowLeft: (oe || N) && n.previous,
						Home: () => {
							if (X()) return !oe || z.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (X()) return !oe || z.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => H0(H, n, n?.up, !0),
						PageDown: () => H0(H, n, n?.down),
					}[z.key];
				if (re) {
					if (_d(H)) {
						const me = xd(H),
							ve = N && z.key === "ArrowLeft",
							Se = N && z.key === "ArrowRight",
							Ze = _e && z.key === "ArrowUp",
							qe = _e && z.key === "ArrowDown";
						if (Se || qe) {
							const { length: At } = oO(H);
							if (me.end !== At) return;
						} else if ((ve || Ze) && me.start !== 0) return;
					}
					const le = re();
					if (ie(z) || le !== void 0) {
						if (!ee(z)) return;
						(z.preventDefault(), n.move(le));
					}
				}
			}),
			ae = (0, w.useMemo)(() => ({ id: _, baseElement: A }), [_, A]);
		return (
			(v = Bt(v, (z) => (0, b.jsx)(CO.Provider, { value: ae, children: z }), [ae])),
			(v = {
				id: _,
				"data-active-item": D || void 0,
				...v,
				ref: gt(p, v.ref),
				tabIndex: O ? v.tabIndex : -1,
				onFocus: k,
				onBlurCapture: B,
				onKeyDown: K,
			}),
			(v = ph(v)),
			(v = pS({ store: n, ...v, getItem: I, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			Va({ ...v, "aria-setsize": T, "aria-posinset": R })
		);
	}),
	rD = vo(
		je(function (n) {
			return Ue(HM, wh(n));
		}),
	),
	FM = "div";
function KM(e, n, a) {
	var u;
	if (!e) return !1;
	if (ta(e)) return !0;
	const l = n?.find((h) => {
			var m;
			return h.element === a ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = l?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = nt(e).getElementById(o);
	return f ? (ta(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var GM = Le(function ({
		store: n,
		hideOnClick: a = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: l,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = jO(!0),
			m = RO();
		((n = n || h || m), vt(n, !1));
		const v = f.onClick,
			g = rt(a),
			_ = "hideAll" in n ? n.hideAll : void 0,
			p = !!_,
			S = xe((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(Sp(E) || pp(E) || (_ && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(E) && _())));
			});
		return (
			(f = {
				role: vp(
					xt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: S,
			}),
			(f = wh({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = Sh({
				store: n,
				...f,
				focusOnHover(E) {
					const C = () => (typeof l == "function" ? l(E) : (l ?? !0));
					if (!n || !C()) return !1;
					const { baseElement: A, items: D } = n.getState();
					return p
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: KM(A, D, E.currentTarget)
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
	XM = vo(
		je(function (n) {
			return Ue(FM, GM(n));
		}),
	);
function SS({ popover: e, ...n } = {}) {
	const a = _o(
		n.store,
		ih(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = a?.getState(),
		l = Yp({ ...n, store: a }),
		o = Ce(n.placement, u?.placement, "bottom"),
		f = Ln(
			{
				...l.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: Ce(u?.anchorElement, null),
				popoverElement: Ce(u?.popoverElement, null),
				arrowElement: Ce(u?.arrowElement, null),
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
	return (Qr(n, [a.popover]), mt(e, a, "placement"), Fp(e, n, a));
}
function JM(e = {}) {
	var n;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = SS({ ...e, placement: Ce(e.placement, a?.placement, "bottom") }),
		l = Ce(e.timeout, a?.timeout, 500),
		o = Ln(
			{
				...u.getState(),
				timeout: l,
				showTimeout: Ce(e.showTimeout, a?.showTimeout),
				hideTimeout: Ce(e.hideTimeout, a?.hideTimeout),
				autoFocusOnShow: Ce(a?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function WM(e, n, a) {
	return (mt(e, a, "timeout"), mt(e, a, "showTimeout"), mt(e, a, "hideTimeout"), wS(e, n, a));
}
var _S = (0, w.createContext)(void 0),
	ys = Xn([Cp, ss], [So, yo]),
	ez = ys.useContext,
	xS = ys.useScopedContext,
	zo = ys.useProviderContext,
	uD = ys.ContextProvider,
	tz = ys.ScopedContextProvider,
	nz = (0, w.createContext)(void 0),
	iz = (0, w.createContext)(!1);
function az({ combobox: e, parent: n, menubar: a, ...u } = {}) {
	const l = !!a && !n,
		o = _o(
			u.store,
			Op(n, ["values"]),
			ih(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = cS({ ...u, store: o, orientation: Ce(u.orientation, f.orientation, "vertical") }),
		m = JM({
			...u,
			store: o,
			placement: Ce(u.placement, f.placement, "bottom-start"),
			timeout: Ce(u.timeout, f.timeout, l ? 0 : 150),
			hideTimeout: Ce(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Ln(
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
		Kt(v, () =>
			Zt(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		Kt(v, () =>
			Zt(n, ["orientation"], (g) => {
				v.setState("placement", g.orientation === "vertical" ? "right-start" : "bottom-start");
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
			setInitialFocus: (g) => v.setState("initialFocus", g),
			setValues: (g) => v.setState("values", g),
			setValue: (g, _) => {
				g !== "__proto__" &&
					g !== "constructor" &&
					(Array.isArray(g) ||
						v.setState("values", (p) => {
							const S = p[g],
								E = cp(_, S);
							return E === S ? p : { ...p, [g]: E !== void 0 && E };
						}));
			},
		}
	);
}
function rz(e, n, a) {
	return (
		Qr(n, [a.combobox, a.parent, a.menubar]),
		mt(e, a, "values", "setValues"),
		Object.assign(WM(fS(e, n, a), n, a), { combobox: a.combobox, parent: a.parent, menubar: a.menubar })
	);
}
function uz(e = {}) {
	const n = Ap(),
		a = AO(),
		u = zo();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : a,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [l, o] = xo(az, e);
	return rz(l, o, e);
}
function sz(e = {}) {
	return (0, b.jsx)(Rp, { value: uz(e), children: e.children });
}
var lz = "hr",
	ES = Le(function ({ orientation: n = "horizontal", ...a }) {
		return ((a = { role: "separator", "aria-orientation": n, ...a }), a);
	}),
	sD = je(function (n) {
		return Ue(lz, ES(n));
	}),
	oz = "hr",
	CS = Le(function ({ store: n, ...a }) {
		const u = go();
		((n = n || u), vt(n, !1));
		const l = n.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((a = ES({ ...a, orientation: l })), a);
	}),
	lD = je(function (n) {
		return Ue(oz, CS(n));
	}),
	cz = "hr",
	fz = Le(function ({ store: n, ...a }) {
		const u = Ap();
		return ((n = n || u), (a = CS({ store: n, ...a })), a);
	}),
	dz = je(function (n) {
		return Ue(cz, fz(n));
	}),
	hz = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	mz = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, a, u) => (u ? u.toUpperCase() : a.toLowerCase())),
	Z0 = (e) => {
		const n = mz(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	TS = (...e) =>
		e
			.filter((n, a, u) => !!n && n.trim() !== "" && u.indexOf(n) === a)
			.join(" ")
			.trim(),
	vz = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	gz = {
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
	yz = (0, w.forwardRef)(
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
					...gz,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(a) * 24) / Number(n) : a,
					className: TS("lucide", l),
					...(!o && !vz(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, w.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	_h = (e, n) => {
		const a = (0, w.forwardRef)(({ className: u, ...l }, o) =>
			(0, w.createElement)(yz, { ref: o, iconNode: n, className: TS(`lucide-${hz(Z0(e))}`, `lucide-${e}`, u), ...l }),
		);
		return ((a.displayName = Z0(e)), a);
	},
	bz = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	pz = _h("arrow-up", bz),
	Sz = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	wz = _h("ellipsis", Sz),
	_z = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	xz = _h("paperclip", _z),
	Ez = (0, w.memo)(function (n) {
		const { channelName: a, items: u } = n;
		return (0, b.jsxs)(sz, {
			placement: "bottom-end",
			children: [
				(0, b.jsx)(UM, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${a}`,
					children: (0, b.jsx)(wz, { size: 16, "aria-hidden": "true" }),
				}),
				(0, b.jsx)(vM, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${a}`,
					children: u.map((l) =>
						"separator" in l
							? (0, b.jsx)(dz, { className: "ChannelRowMenu-separator" }, l.id)
							: (0, b.jsx)(
									XM,
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
	Cz = "input";
function Q0(e, n, a) {
	if (!a) return !1;
	const u = e.find((l) => !l.disabled && l.value);
	return u?.value === n;
}
function P0(e, n) {
	return !n || e == null ? !1 : ((e = fp(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function Tz(e) {
	return e.type === "input";
}
function Az(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function Rz(e) {
	const n = e.find((a) => {
		var u;
		return a.disabled ? !1 : ((u = a.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var Oz = Le(function ({
		store: n,
		focusable: a = !0,
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
		setValueOnClick: S = !0,
		moveOnKeyPress: E = !0,
		autoComplete: C = "list",
		...A
	}) {
		const D = zo();
		((n = n || D), vt(n, !1));
		const T = (0, w.useRef)(null),
			[R, O] = xp(),
			I = (0, w.useRef)(!1),
			L = (0, w.useRef)(!1),
			j = n.useState((ue) => ue.virtualFocus && u),
			k = C === "inline" || C === "both",
			[U, B] = (0, w.useState)(k);
		bO(() => {
			k && B(!0);
		}, [k]);
		const Z = n.useState("value"),
			ie = (0, w.useRef)();
		(0, w.useEffect)(
			() =>
				Zt(n, ["selectedValue", "activeId"], (ue, Re) => {
					ie.current = Re.selectedValue;
				}),
			[],
		);
		const ee = n.useState((ue) => {
				var Re;
				if (
					k &&
					U &&
					!(
						ue.activeValue &&
						Array.isArray(ue.selectedValue) &&
						(ue.selectedValue.includes(ue.activeValue) || ((Re = ie.current) != null && Re.includes(ue.activeValue)))
					)
				)
					return ue.activeValue;
			}),
			K = n.useState("renderedItems"),
			ae = n.useState("open"),
			z = n.useState("contentElement"),
			H = (0, w.useMemo)(() => {
				if (!k || !U) return Z;
				if (Q0(K, ee, j)) {
					if (P0(Z, ee)) {
						const ue = ee?.slice(Z.length) || "";
						return Z + ue;
					}
					return Z;
				}
				return ee || Z;
			}, [k, U, K, ee, j, Z]);
		((0, w.useEffect)(() => {
			const ue = T.current;
			if (!ue) return;
			const Re = () => B(!0);
			return (
				ue.addEventListener("combobox-item-move", Re),
				() => {
					ue.removeEventListener("combobox-item-move", Re);
				}
			);
		}, []),
			(0, w.useEffect)(() => {
				if (!k || !U || !ee || !Q0(K, ee, j) || !P0(Z, ee)) return;
				let ue = Zu;
				return (
					queueMicrotask(() => {
						const Re = T.current;
						if (!Re) return;
						const { start: it, end: Oe } = xd(Re),
							kt = Z.length,
							Dt = ee.length;
						(td(Re, kt, Dt),
							(ue = () => {
								if (!qa(Re)) return;
								const { start: se, end: ge } = xd(Re);
								se === kt && ge === Dt && td(Re, it, Oe);
							}));
					}),
					() => ue()
				);
			}, [R, k, U, ee, K, j, Z]));
		const $ = (0, w.useRef)(null),
			G = xe(l),
			oe = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			if (!ae || !z) return;
			const ue = Qd(z);
			if (!ue) return;
			$.current = ue;
			const Re = () => {
					I.current = !1;
				},
				it = () => {
					if (!n || !I.current) return;
					const { activeId: kt } = n.getState();
					kt !== null && kt !== oe.current && (I.current = !1);
				},
				Oe = { passive: !0, capture: !0 };
			return (
				ue.addEventListener("wheel", Re, Oe),
				ue.addEventListener("touchmove", Re, Oe),
				ue.addEventListener("scroll", it, Oe),
				() => {
					(ue.removeEventListener("wheel", Re, !0),
						ue.removeEventListener("touchmove", Re, !0),
						ue.removeEventListener("scroll", it, !0));
				}
			);
		}, [ae, z, n]),
			He(() => {
				Z && (L.current || (I.current = !0));
			}, [Z]),
			He(() => {
				(j !== "always" && ae) || (I.current = ae);
			}, [j, ae]));
		const _e = n.useState("resetValueOnSelect");
		(Qr(() => {
			var ue, Re;
			const it = I.current;
			if (!n || !ae || (!it && !_e)) return;
			const { baseElement: Oe, contentElement: kt, activeId: Dt } = n.getState();
			if (!(Oe && !qa(Oe))) {
				if (kt?.hasAttribute("data-placing")) {
					const se = new MutationObserver(O);
					return (se.observe(kt, { attributeFilter: ["data-placing"] }), () => se.disconnect());
				}
				if (j && it) {
					const se = G(K),
						ge = se !== void 0 ? se : (ue = Rz(K)) != null ? ue : n.first();
					((oe.current = ge), n.move(ge ?? null));
				} else {
					const se = (Re = n.item(Dt || n.first())) == null ? void 0 : Re.element;
					se && "scrollIntoView" in se && se.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ae, R, Z, j, _e, G, K]),
			(0, w.useEffect)(() => {
				if (!k) return;
				const ue = T.current;
				if (!ue) return;
				const Re = [ue, z].filter((Oe) => !!Oe),
					it = (Oe) => {
						Re.every((kt) => Na(Oe, kt)) && n?.setValue(H);
					};
				for (const Oe of Re) Oe.addEventListener("focusout", it);
				return () => {
					for (const Oe of Re) Oe.removeEventListener("focusout", it);
				};
			}, [k, z, n, H]));
		const N = (ue) => ue.currentTarget.value.length >= f,
			X = A.onChange,
			re = rt(h ?? N),
			le = rt(o ?? !n.tag),
			me = xe((ue) => {
				if ((X?.(ue), ue.defaultPrevented || !n)) return;
				const Re = ue.currentTarget,
					{ value: it, selectionStart: Oe, selectionEnd: kt } = Re,
					Dt = ue.nativeEvent;
				if (((I.current = !0), Tz(Dt) && (Dt.isComposing && ((I.current = !1), (L.current = !0)), k))) {
					const se = Dt.inputType === "insertText" || Dt.inputType === "insertCompositionText",
						ge = Oe === it.length;
					B(se && ge);
				}
				if (le(ue)) {
					const se = it === n.getState().value;
					(n.setValue(it),
						queueMicrotask(() => {
							td(Re, Oe, kt);
						}),
						k && j && se && O());
				}
				(re(ue) && n.show(), (!j || !I.current) && n.setActiveId(null));
			}),
			ve = A.onCompositionEnd,
			Se = xe((ue) => {
				((I.current = !0), (L.current = !1), ve?.(ue), !ue.defaultPrevented && j && O());
			}),
			Ze = A.onMouseDown,
			qe = rt(p ?? (() => !!n?.getState().includesBaseElement)),
			At = rt(S),
			Pt = rt(v ?? N),
			pn = xe((ue) => {
				(Ze?.(ue),
					!ue.defaultPrevented &&
						(ue.button ||
							ue.ctrlKey ||
							(n &&
								(qe(ue) && n.setActiveId(null),
								At(ue) && n.setValue(H),
								Pt(ue) && qr(ue.currentTarget, "mouseup", n.show)))));
			}),
			on = A.onKeyDown,
			ot = rt(_ ?? N),
			de = xe((ue) => {
				if (
					(on?.(ue),
					ue.repeat || (I.current = !1),
					ue.defaultPrevented || ue.ctrlKey || ue.altKey || ue.shiftKey || ue.metaKey || !n)
				)
					return;
				const { open: Re } = n.getState();
				Re || ((ue.key === "ArrowUp" || ue.key === "ArrowDown") && ot(ue) && (ue.preventDefault(), n.show()));
			}),
			Ee = A.onBlur,
			st = xe((ue) => {
				((I.current = !1), Ee?.(ue), ue.defaultPrevented);
			}),
			ze = Ri(A.id),
			zt = Az(C) ? C : void 0,
			Ot = n.useState((ue) => ue.activeId === null);
		return (
			(A = {
				id: ze,
				role: "combobox",
				"aria-autocomplete": zt,
				"aria-haspopup": ho(z, "listbox"),
				"aria-expanded": ae,
				"aria-controls": z?.id,
				"data-active-item": Ot || void 0,
				value: H,
				...A,
				ref: gt(T, A.ref),
				onChange: me,
				onCompositionEnd: Se,
				onMouseDown: pn,
				onKeyDown: de,
				onBlur: st,
			}),
			(A = sh({ store: n, focusable: a, ...A, moveOnKeyPress: (ue) => (fo(E, ue) ? !1 : (k && B(!0), !0)) })),
			(A = bh({ store: n, ...A })),
			{ autoComplete: "off", ...A }
		);
	}),
	Nz = je(function (n) {
		return Ue(Cz, Oz(n));
	}),
	Mz = "div";
function zz(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function kz(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var Dz = Le(function ({
		store: n,
		value: a,
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
		const p = xS();
		((n = n || p), vt(n, !1));
		const {
				resetValueOnSelectState: S,
				multiSelectable: E,
				selected: C,
			} = zp(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(B) {
					return Array.isArray(B.selectedValue);
				},
				selected(B) {
					return zz(B.selectedValue, a);
				},
			}),
			A = (0, w.useCallback)(
				(B) => {
					const Z = { ...B, value: a };
					return v ? v(Z) : Z;
				},
				[a, v],
			);
		((l = l ?? !E), (u = u ?? (a != null && !E)));
		const D = g.onClick,
			T = rt(l),
			R = rt(o),
			O = rt((_ = f ?? S) != null ? _ : E),
			I = rt(u),
			L = xe((B) => {
				(D?.(B),
					!B.defaultPrevented &&
						(Sp(B) ||
							pp(B) ||
							(a != null &&
								(R(B) &&
									(O(B) && n?.resetValue(),
									n?.setSelectedValue((Z) =>
										Array.isArray(Z) ? (Z.includes(a) ? Z.filter((ie) => ie !== a) : [...Z, a]) : a,
									)),
								T(B) && n?.setValue(a)),
							I(B) && n?.hide())));
			}),
			j = g.onKeyDown,
			k = xe((B) => {
				if ((j?.(B), B.defaultPrevented)) return;
				const Z = n?.getState().baseElement;
				Z &&
					(qa(Z) ||
						((B.key.length === 1 || B.key === "Backspace" || B.key === "Delete") &&
							(queueMicrotask(() => Z.focus()), Gn(Z) && n?.setValue(Z.value))));
			});
		(E && C != null && (g = { "aria-selected": C, ...g }),
			(g = Bt(
				g,
				(B) =>
					(0, b.jsx)(nz.Provider, { value: a, children: (0, b.jsx)(iz.Provider, { value: C ?? !1, children: B }) }),
				[a, C],
			)),
			(g = { role: kz((0, w.useContext)(_S)), children: a, ...g, onClick: L, onKeyDown: k }));
		const U = rt(m);
		return (
			(g = wh({
				store: n,
				...g,
				getItem: A,
				moveOnKeyPress: (B) => {
					if (!U(B)) return !1;
					const Z = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(Z), !0);
				},
			})),
			(g = Sh({ store: n, focusOnHover: h, ...g })),
			g
		);
	}),
	jz = vo(
		je(function (n) {
			return Ue(Mz, Dz(n));
		}),
	),
	qz = "div",
	AS = Le(function ({ store: n, alwaysVisible: a, ...u }) {
		const l = xS(!0),
			o = ez();
		n = n || o;
		const f = !!n && n === l;
		vt(n, !1);
		const h = (0, w.useRef)(null),
			m = Ri(u.id),
			v = n.useState("mounted"),
			g = Eo(v, u.hidden, a),
			_ = g ? { ...u.style, display: "none" } : u.style,
			p = n.useState((R) => Array.isArray(R.selectedValue)),
			S = yO(h, "role", u.role),
			E = ((S === "listbox" || S === "tree" || S === "grid") && p) || void 0,
			[C, A] = (0, w.useState)(!1),
			D = n.useState("contentElement");
		(He(() => {
			if (!v) return;
			const R = h.current;
			if (!R || D !== R) return;
			const O = () => {
					A(!!R.querySelector("[role='listbox']"));
				},
				I = new MutationObserver(O);
			return (I.observe(R, { subtree: !0, childList: !0, attributeFilter: ["role"] }), O(), () => I.disconnect());
		}, [v, D]),
			C || (u = { role: "listbox", "aria-multiselectable": E, ...u }),
			(u = Bt(u, (R) => (0, b.jsx)(tz, { value: n, children: (0, b.jsx)(_S.Provider, { value: S, children: R }) }), [
				n,
				S,
			])));
		const T = m && (!l || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: gt(T, h, u.ref), style: _ }), Va(u));
	}),
	oD = je(function (n) {
		return Ue(qz, AS(n));
	}),
	Iz = "div";
function Uz(e, ...n) {
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
var Lz = Le(function ({
		store: n,
		modal: a,
		tabIndex: u,
		alwaysVisible: l,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = zo();
		((n = n || m), vt(n, !1));
		const v = n.useState("baseElement"),
			g = (0, w.useRef)(!1),
			_ = xt(n.tag, (p) => p?.renderedItems.length);
		return (
			(h = AS({ store: n, alwaysVisible: l, ...h })),
			(h = yh({
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
					const A = nt(C),
						D = [];
					if ((E?.id && D.push(`[aria-controls~="${E.id}"]`), C?.id && D.push(`[aria-controls~="${C.id}"]`), !D.length))
						return [...S, C];
					const T = D.join(","),
						R = A.querySelectorAll(T);
					return [...S, ...R];
				},
				autoFocusOnHide(p) {
					return fo(o, p) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(p) {
					var S, E;
					const C = n?.getState(),
						A = (S = C?.contentElement) == null ? void 0 : S.id,
						D = (E = C?.baseElement) == null ? void 0 : E.id;
					if (Uz(p.target, A, D)) return !1;
					const T = typeof f == "function" ? f(p) : f;
					return (T && (g.current = p.type === "click"), T);
				},
			})),
			h
		);
	}),
	$z = gs(
		je(function (n) {
			return Ue(Iz, Lz(n));
		}),
		zo,
	),
	cD = (0, w.createContext)(null),
	fD = (0, w.createContext)(null),
	bs = Xn([ss], [yo]),
	Bz = bs.useContext,
	dD = bs.useScopedContext,
	hD = bs.useProviderContext,
	mD = bs.ContextProvider,
	vD = bs.ScopedContextProvider,
	Vz = mo() && yp();
function Hz({ tag: e, ...n } = {}) {
	const a = _o(n.store, Op(e, ["value", "rtl"]));
	const u = e?.getState(),
		l = a?.getState(),
		o = Ce(n.activeId, l?.activeId, n.defaultActiveId, null),
		f = cS({
			...n,
			activeId: o,
			includesBaseElement: Ce(n.includesBaseElement, l?.includesBaseElement, !0),
			orientation: Ce(n.orientation, l?.orientation, "vertical"),
			focusLoop: Ce(n.focusLoop, l?.focusLoop, !0),
			focusWrap: Ce(n.focusWrap, l?.focusWrap, !0),
			virtualFocus: Ce(n.virtualFocus, l?.virtualFocus, !0),
		}),
		h = SS({ ...n, placement: Ce(n.placement, l?.placement, "bottom-start") }),
		m = Ce(n.value, l?.value, n.defaultValue, ""),
		v = Ce(n.selectedValue, l?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		g = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: Ce(n.resetValueOnSelect, l?.resetValueOnSelect, g),
			resetValueOnHide: Ce(n.resetValueOnHide, l?.resetValueOnHide, g && !e),
			activeValue: l?.activeValue,
		},
		p = Ln(_, f, h, a);
	return (
		Vz &&
			Kt(p, () =>
				Zt(p, ["virtualFocus"], () => {
					p.setState("virtualFocus", !1);
				}),
			),
		Kt(p, () => {
			if (e)
				return un(
					Zt(p, ["selectedValue"], (S) => {
						Array.isArray(S.selectedValue) && e.setValues(S.selectedValue);
					}),
					Zt(e, ["values"], (S) => {
						p.setState("selectedValue", S.values);
					}),
				);
		}),
		Kt(p, () =>
			Zt(p, ["resetValueOnHide", "mounted"], (S) => {
				S.resetValueOnHide && (S.mounted || p.setState("value", m));
			}),
		),
		Kt(p, () =>
			Zt(p, ["open"], (S) => {
				S.open || (p.setState("activeId", o), p.setState("moves", 0));
			}),
		),
		Kt(p, () =>
			Zt(p, ["moves", "activeId"], (S, E) => {
				S.moves === E.moves && p.setState("activeValue", void 0);
			}),
		),
		Kt(p, () =>
			Wl(p, ["moves", "renderedItems"], (S, E) => {
				if (S.moves === E.moves) return;
				const { activeId: C } = p.getState(),
					A = f.item(C);
				p.setState("activeValue", A?.value);
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
function Zz(e) {
	const n = Bz();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), TM(e));
}
function Qz(e, n, a) {
	return (
		Qr(n, [a.tag]),
		mt(e, a, "value", "setValue"),
		mt(e, a, "selectedValue", "setSelectedValue"),
		mt(e, a, "resetValueOnHide"),
		mt(e, a, "resetValueOnSelect"),
		Object.assign(fS(wS(e, n, a), n, a), { tag: a.tag })
	);
}
function Pz(e = {}) {
	e = Zz(e);
	const [n, a] = xo(Hz, e);
	return Qz(n, a, e);
}
var Yz = ce.union(
		ce.literal("thumbs_up"),
		ce.literal("heart"),
		ce.literal("laugh"),
		ce.literal("wow"),
		ce.literal("sad"),
		ce.literal("party"),
		ce.literal("rocket"),
		ce.literal("eyes"),
	),
	gD = ce.object({ fileNodeId: ce.string(), name: ce.string() }),
	yD = ce.union(ce.literal("read"), ce.literal("write"), ce.literal("manage")),
	Fz = ce.object({ message: ce.string(), name: ce.optional(ce.string()) }),
	Kz = ce.union(
		ce.object({
			kind: ce.literal("message"),
			messageId: ce.id("messages"),
			revision: ce.number(),
			sequence: ce.number(),
		}),
		ce.object({ kind: ce.literal("channel"), channelId: ce.id("channels"), revision: ce.number() }),
		ce.object({ kind: ce.literal("reaction"), messageId: ce.id("messages"), token: Yz, on: ce.boolean() }),
		ce.object({
			kind: ce.literal("membership"),
			channelId: ce.id("channels"),
			membershipRevision: ce.number(),
			left: ce.boolean(),
			deleted: ce.boolean(),
			pending: ce.boolean(),
		}),
	),
	bD = ce.union(ce.object({ _yay: Kz }), ce.object({ _nay: Fz })),
	pD = ce.union(
		ce.object({
			kind: ce.literal("block"),
			messageId: ce.id("messages"),
			rootSequence: ce.number(),
			replySequence: ce.number(),
			renderedBlock: ce.string(),
			sourceRevision: ce.number(),
		}),
		ce.object({ kind: ce.literal("header"), name: ce.string(), topic: ce.string(), isPrivate: ce.boolean() }),
		ce.object({ kind: ce.literal("archive"), archived: ce.boolean() }),
		ce.object({
			kind: ce.literal("readers"),
			readerRevision: ce.number(),
			readers: ce.array(ce.object({ userId: ce.string(), membershipLifetime: ce.number() })),
			deleted: ce.boolean(),
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
var Gz = { text: "", attachments: [], mentions: [], pending: [] },
	Y0 = new WeakMap();
function Xz() {
	const e = new Map(),
		n = new Set();
	return {
		get: (a) => e.get(a) ?? Gz,
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
	let a = Y0.get(e);
	a || ((a = Xz()), Y0.set(e, a));
	const u = a;
	return {
		value: (0, w.useSyncExternalStore)(u.subscribe, () => u.get(n)),
		get: () => u.get(n),
		set: (l) => u.set(n, l),
	};
}
var Jz = 3 * 1024 * 1024;
function NS(e) {
	const n = "rootMessageId" in e.target,
		a = Jz - 32 * 1024 - (n ? 32 * 1024 : 0),
		u = e.enabled || e.retain,
		[l, o] = (0, w.useState)(null),
		f = Dr(be.messages.get, u && l ? { messageId: l._id } : "skip"),
		h = Dr(be.messages.latest_roots, u && "channelId" in e.target ? e.target : "skip"),
		m = Dr(be.messages.latest_replies, u && "rootMessageId" in e.target ? e.target : "skip"),
		v = n ? m : h,
		[g, _] = (0, w.useState)(null),
		p = (0, w.useRef)(0),
		S = (0, w.useRef)(new Map()),
		E = (0, w.useRef)({ head: null, rows: [] }),
		C = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		A = u && (v !== null || e.retain),
		D = jd(
			(0, w.useMemo)(
				() =>
					Object.fromEntries(
						(A ? (g?.pages ?? []) : []).map(($) => [
							String($.id),
							{
								query: n ? be.messages.list_replies : be.messages.list_roots,
								args: {
									...(n ? { rootMessageId: C } : { channelId: C }),
									anchorSequence: g.anchor,
									paginationOpts: {
										numItems: 50,
										cursor: $.cursor,
										...($.endCursor ? { endCursor: $.endCursor } : {}),
									},
								},
							},
						]),
					),
				[A, g, n, C],
			),
		),
		T = e.retain ? E.current.head : (v ?? null),
		R = v === null && !e.retain,
		O = new Set(g?.pages.map(($) => $.id));
	for (const $ of S.current.keys()) (!O.has($) || R || !u) && S.current.delete($);
	const I =
			g?.pages.map(($) => {
				const G = D[String($.id)];
				return (
					e.enabled && v !== null && G && !(G instanceof Error) && S.current.set($.id, G),
					{ descriptor: $, result: G ?? S.current.get($.id) }
				);
			}) ?? [],
		L = I.find(($) => $.result instanceof Error)?.result,
		j = I.filter(($) => $.result !== void 0 && !($.result instanceof Error)),
		k = g === null ? (T?.messages ?? []) : j.flatMap(($) => $.result.page),
		U = f === void 0 ? l : f,
		B =
			U &&
			("rootMessageId" in e.target ? U.rootMessageId === e.target.rootMessageId : U.rootMessageId === null) &&
			U.deletedAt === null &&
			!k.some(($) => $._id === U._id)
				? [...k, U].sort(($, G) => G.sequence - $.sequence)
				: k,
		Z = e.retain ? E.current.rows : R ? [] : e.enabled ? B : [],
		ie = new TextEncoder().encode(JSON.stringify({ rows: Z, head: T })).byteLength,
		ee = j.at(-1),
		K = e.enabled && v !== null && (T === null || I.some(($) => D[String($.descriptor.id)] === void 0));
	((0, w.useEffect)(() => {
		((!e.enabled && !e.retain) || R || (!e.retain && (f === null || f?.deletedAt != null))) && o(null);
	}, [e.enabled, e.retain, R, f]),
		(0, w.useEffect)(() => {
			!e.enabled && !e.retain
				? ((E.current = { head: null, rows: [] }), _(null))
				: e.enabled && (E.current = { head: T, rows: Z });
		}, [e.enabled, e.retain, T, Z]),
		(0, w.useEffect)(() => {
			if (!g || !e.enabled) return;
			const $ = j.some(({ descriptor: G, result: oe }) => !G.endCursor && !oe.isDone);
			if (j.some(({ result: G }) => G.pageStatus === "SplitRequired")) {
				const G = k[0]?.sequence ?? g.anchor;
				_({ anchor: G, pages: [{ id: ++p.current, cursor: null }], newerAnchor: g.newerAnchor, extend: !1 });
			} else
				ie > a && g.pages.length > 1
					? _({ ...g, pages: g.pages.slice(1), newerAnchor: k[0]?.sequence ?? g.anchor })
					: g.extend && ee
						? _({
								...g,
								extend: !1,
								pages: ee.result.isDone
									? g.pages
									: [
											...g.pages.map((G) => ({ ...G, endCursor: ee.result.continueCursor })),
											{ id: ++p.current, cursor: ee.result.continueCursor },
										],
							})
						: $ &&
							_({
								...g,
								pages: g.pages.map((G) => {
									const oe = D[String(G.id)];
									return !G.endCursor && oe && !(oe instanceof Error) && !oe.isDone
										? { ...G, endCursor: oe.continueCursor }
										: G;
								}),
							});
		}, [g, e.enabled, D, ie]));
	const ae = () => _(null),
		z = () => {
			if (!e.enabled || K || !T) return;
			if (!g) {
				(T.messages.at(-1)?.sequence ?? 0) > 1 &&
					_({ anchor: T.sequence, pages: [{ id: ++p.current, cursor: null }], newerAnchor: T.sequence, extend: !0 });
				return;
			}
			if (!ee || ee.result.isDone) return;
			const $ = [...g.pages, { id: ++p.current, cursor: ee.result.continueCursor }],
				G = n ? 2 : 5;
			_({ ...g, pages: $.slice(-G), newerAnchor: $.length > G ? (k[0]?.sequence ?? g.anchor) : g.newerAnchor });
		},
		H = () => {
			!g?.newerAnchor ||
				!e.enabled ||
				K ||
				(g.newerAnchor >= (T?.sequence ?? 0)
					? ae()
					: _({
							anchor: g.newerAnchor,
							pages: [{ id: ++p.current, cursor: null }],
							newerAnchor: Math.min(T?.sequence ?? g.newerAnchor, g.newerAnchor + 50),
							extend: !1,
						}));
		};
	return {
		rows: Z,
		editingMessageId: l?._id ?? null,
		setEditingMessage: o,
		denied: R,
		loading: K,
		error: R ? "Messages are unavailable. Your access may have changed." : L instanceof Error ? L.message : null,
		sequence: T?.sequence ?? 0,
		atLatest: g === null,
		hasOlder: g === null ? (T?.messages.at(-1)?.sequence ?? 0) > 1 : !!ee && !ee.result.isDone,
		hasNewer: g !== null,
		newCount: g ? Math.max(0, (T?.sequence ?? 0) - g.anchor) : 0,
		older: z,
		newer: H,
		latest: ae,
	};
}
var F0 = 128;
function Wz(e) {
	return new TextEncoder().encode(e).byteLength;
}
function ek(e) {
	if (e === null) return null;
	const n = e
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (n === "") return null;
	if (Wz(n) <= F0) return n;
	const a = new TextEncoder().encode(n).slice(0, F0);
	return new TextDecoder().decode(a).replace(/�$/, "");
}
function MS(e) {
	const n = $n(),
		a = za(be.messages.send),
		u = za(be.messages.reply),
		l = Ab(be.files.authorize_selection),
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
						fileNodeIds: _.attachments.map((A) => A.fileNodeId),
					});
					if (C._nay) throw new Error(C._nay.message);
					if (_.attachments.some((A) => !C._yay.some((D) => D.fileNodeId === A.fileNodeId && D.name === A.name)))
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
							C.clientRequestId === _.clientRequestId ? { ...C, status: "failed", error: uo(E) } : C,
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
			const E = RS({ text: _, attachments: p, mentions: S, authorName: ek(n.member?.displayName ?? null) });
			if (E) return (m(E), !1);
			const C = {
					clientRequestId: crypto.randomUUID(),
					text: _,
					attachments: p,
					mentions: S,
					status: "sending",
					error: null,
				},
				A = e.draft.set({
					...e.draft.get(),
					text: "",
					attachments: [],
					mentions: [],
					pending: [...e.draft.get().pending, C],
				});
			return A ? (m(A), !1) : (m(null), v(C), !0);
		},
		retry: (_) => void v(_),
		error: h,
		busy: e.draft.value.pending.some((_) => _.status === "sending"),
	};
}
function tk(e) {
	const [n, a] = (0, w.useState)({}),
		[u, l] = (0, w.useState)(!1),
		[o, f] = (0, w.useState)(null),
		h = (0, w.useRef)(new Map()),
		m = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		m.current && (h.current.get(m.current)?.focus(), (m.current = null));
	}, [n]);
	const v = async (g) => {
		(l(!0), f(null), (m.current = g));
		try {
			const _ = await e.client.fetchJson("/api/v1/files/download-urls", {
				fileNodeIds: e.attachments.map((S) => S.fileNodeId),
				download: !0,
			});
			if (_.status !== 200 || !_.body) throw new Error(_.body?.message ?? "The file links are unavailable.");
			a(Object.fromEntries(_.body.items.map((S) => [S.fileNodeId, { url: S.url, expiresAt: S.expiresAt }])));
			const p = _.body.errors.find((S) => S.fileNodeId === g);
			p && f(p.message);
		} catch (_) {
			f(uo(_));
		} finally {
			l(!1);
		}
	};
	return (0, b.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((g) =>
				(0, b.jsx)(
					"span",
					{
						className: "attachment",
						children: n[g.fileNodeId]
							? (0, b.jsxs)(b.Fragment, {
									children: [
										(0, b.jsx)("a", {
											ref: (_) => {
												_ ? h.current.set(g.fileNodeId, _) : h.current.delete(g.fileNodeId);
											},
											className: "attachment-link",
											href: n[g.fileNodeId].url,
											download: g.name,
											rel: "noreferrer",
											onClick: (_) => {
												n[g.fileNodeId].expiresAt <= Date.now() &&
													(_.preventDefault(), f("This download link expired. Use Refresh link to try again."));
											},
											children: g.name,
										}),
										(0, b.jsx)("button", {
											type: "button",
											className: "attachment-button",
											disabled: u,
											onClick: () => void v(g.fileNodeId),
											children: "Refresh link",
										}),
									],
								})
							: (0, b.jsx)("button", {
									type: "button",
									className: "attachment-button",
									disabled: u,
									onClick: () => void v(g.fileNodeId),
									children: u ? `Getting link for ${g.name}…` : g.name,
								}),
					},
					g.fileNodeId,
				),
			),
			o ? (0, b.jsx)("span", { className: "attachment-error", role: "alert", children: o }) : null,
		],
	});
}
function nk(e) {
	const n = (0, w.useId)(),
		[a, u] = (0, w.useState)([]),
		[l, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(null),
		[m, v] = (0, w.useState)(!1),
		[g, _] = (0, w.useState)(!0),
		[p, S] = (0, w.useState)(null),
		[E, C] = (0, w.useState)(0);
	return (
		(0, w.useEffect)(() => {
			let A = !1;
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
						if (!A) {
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
						A || S(uo(D));
					})
					.finally(() => {
						A || _(!1);
					}),
				() => {
					A = !0;
				}
			);
		}, [e.client, l, E]),
		(0, b.jsxs)(Vr, {
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
					children: a.map((A) =>
						(0, b.jsx)(
							"li",
							{
								children: (0, b.jsxs)("button", {
									type: "button",
									className: "picker-item",
									onClick: () => e.onPick({ fileNodeId: A.nodeId, name: A.name }),
									children: [
										(0, b.jsx)("span", { className: "picker-item-name", children: A.name }),
										(0, b.jsx)("span", { className: "picker-item-path", children: A.path }),
									],
								}),
							},
							A.nodeId,
						),
					),
				}),
				g ? (0, b.jsx)("p", { role: "status", children: "Loading files…" }) : null,
				p
					? (0, b.jsxs)("p", {
							role: "alert",
							children: [p, " ", (0, b.jsx)("button", { type: "button", onClick: () => C(E + 1), children: "Retry" })],
						})
					: null,
				!g && !p && a.length === 0
					? (0, b.jsx)("p", { children: m ? "No files found." : "No matching files on this page." })
					: null,
				l !== null
					? (0, b.jsx)("button", {
							type: "button",
							className: "button",
							disabled: g,
							onClick: () => o(null),
							children: "First page",
						})
					: null,
				m
					? null
					: (0, b.jsx)("button", {
							type: "button",
							className: "button",
							disabled: g || !!p,
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
		u = $n(),
		[l, o] = (0, w.useState)(!1),
		[f, h] = (0, w.useState)(null),
		[m, v] = (0, w.useState)(null),
		[g, _] = (0, w.useState)(null),
		p = Je(u, be.members.list, m !== null ? { paginationOpts: { numItems: 100, cursor: g } } : "skip"),
		S = e.draft.value.text,
		E = (0, w.useRef)(null),
		C = (0, w.useRef)(null),
		A = Pz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (j) => {
				j || v(null);
			},
		}),
		D = m && p ? dE(p.page, m.query, e.userId).slice(0, 8) : [],
		T = m !== null && (u.ready || u.refreshing),
		R = (j) => h(e.draft.set({ ...e.draft.get(), ...j })),
		O = (j) => {
			if (!m) return;
			const k = hE(S, m.start, E.current?.selectionStart ?? S.length, j.label),
				U = new Map(e.draft.value.mentions);
			(U.set(j.userId, j.label), R({ text: k.text, mentions: [...U] }), (C.current = k.caret), A.hide());
		},
		I = () => {
			if (e.busy || e.disabled) return;
			const j = S.trim();
			(!j && e.draft.value.attachments.length === 0) ||
				(e.onSend(j, e.draft.value.attachments, mE(e.draft.value.mentions, j)) && A.hide());
		},
		L = (j) => {
			if (!(j.nativeEvent.isComposing || j.keyCode === 229)) {
				if (T) {
					if (j.key === "ArrowLeft" || j.key === "ArrowRight") {
						A.hide();
						return;
					}
					if (j.key === "Escape") {
						(j.preventDefault(), j.stopPropagation(), A.hide());
						return;
					}
					if ((j.key === "Enter" || j.key === "Tab") && !j.shiftKey && D.length) {
						(j.preventDefault(), O(D.find((k) => `${a}-${k.userId}` === A.getState().activeId) ?? D[0]));
						return;
					}
				}
				j.key === "Enter" && !j.shiftKey && (j.preventDefault(), I());
			}
		};
	return (
		(0, w.useLayoutEffect)(() => {
			A.setOpen(T);
		}, [A, T]),
		(0, w.useLayoutEffect)(() => {
			C.current !== null &&
				E.current &&
				(E.current.focus(), E.current.setSelectionRange(C.current, C.current), (C.current = null));
		}, [S]),
		(0, b.jsxs)("div", {
			className: "composer",
			inert: e.inert || void 0,
			children: [
				e.draft.value.attachments.length
					? (0, b.jsx)("ul", {
							className: "composer-attachments",
							children: e.draft.value.attachments.map((j) =>
								(0, b.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, b.jsx)("span", { children: j.name }),
											(0, b.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${j.name}`,
												onClick: () =>
													R({ attachments: e.draft.value.attachments.filter((k) => k.fileNodeId !== j.fileNodeId) }),
												children: "×",
											}),
										],
									},
									j.fileNodeId,
								),
							),
						})
					: null,
				(0, b.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, b.jsx)(Nz, {
							store: A,
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
								onChange: (j) => {
									const k = j.currentTarget.value;
									R({ text: k });
									const U = fE(k, j.currentTarget.selectionStart);
									(v(U), A.setValue(U?.query ?? ""));
								},
								onKeyDown: L,
								onPointerDown: A.hide,
								onScroll: A.render,
							}),
						}),
						(0, b.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled || e.draft.value.attachments.length >= 20,
							onClick: () => o(!0),
							children: (0, b.jsx)(xz, { size: 18, "aria-hidden": "true" }),
						}),
						(0, b.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: I,
							children: (0, b.jsx)(pz, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, b.jsxs)($z, {
					store: A,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !T,
					getAnchorRect: () => E.current?.getBoundingClientRect() ?? null,
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						p ? null : (0, b.jsx)("div", { role: "status", children: "Loading people…" }),
						p && D.length === 0 ? (0, b.jsx)("div", { role: "status", children: "No match on this page." }) : null,
						D.map((j) =>
							(0, b.jsx)(
								jz,
								{
									id: `${a}-${j.userId}`,
									value: j.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (k) => k.preventDefault(),
									onClick: () => O(j),
									children: j.label,
								},
								j.userId,
							),
						),
						g !== null
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
					? (0, b.jsx)(nk, {
							client: e.client,
							onClose: () => o(!1),
							onPick: (j) => {
								(e.draft.value.attachments.some((k) => k.fileNodeId === j.fileNodeId) ||
									R({ attachments: [...e.draft.value.attachments, j] }),
									o(!1));
							},
						})
					: null,
			],
		})
	);
}
function ik(e) {
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
						children: oE.map((f, h) => {
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
function Md(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function ak(e) {
	const n = new Date(e).toDateString();
	return n === new Date().toDateString()
		? "Today"
		: n === new Date(Date.now() - kS).toDateString()
			? "Yesterday"
			: Md(e);
}
function rk(e) {
	const n = e?.trim().split(/\s+/u);
	return n?.[0] ? `${n[0][0]}${n.length > 1 ? n.at(-1)[0] : ""}`.toUpperCase() : "•";
}
function uk(e, n, a) {
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
		a = $n(),
		u = Je(a, be.reactions.get_for_message, { messageId: n._id }),
		l = Je(a, be.threads.get_summary, e.onOpenThread ? { rootMessageId: n._id } : "skip"),
		o = za(be.messages.edit),
		f = za(be.messages.remove),
		h = za(be.reactions.set),
		[m, v] = (0, w.useState)(!1),
		[g, _] = (0, w.useState)(""),
		p = (0, w.useRef)(null),
		[S, E] = (0, w.useState)(!1),
		[C, A] = (0, w.useState)(!1),
		[D, T] = (0, w.useState)(null),
		[R, O] = (0, w.useState)(!1),
		I = (0, w.useRef)(null),
		L = (0, w.useRef)(null),
		j = (0, w.useRef)(null),
		k = (0, w.useRef)(null),
		U = (0, w.useId)(),
		B = n.deletedAt !== null,
		Z = e.canWrite && a.canSend;
	((0, w.useEffect)(() => {
		m && L.current?.focus();
	}, [m]),
		(0, w.useEffect)(() => {
			if (B) {
				const G = j.current?.contains(document.activeElement);
				(v(!1), _(""), (p.current = null), m && e.onEditingChange?.(null), E(!1), G && j.current?.focus());
			}
		}, [B]));
	const ie = async () => {
			if (!(C || !I.current || !a.can_request_now())) {
				(A(!0), T(null), e.onRequestStart());
				try {
					const G = await I.current();
					if (G._nay) {
						(T(G._nay.message), (I.current = null), O(!1));
						return;
					}
					((I.current = null),
						O(!1),
						v(!1),
						_(""),
						(p.current = null),
						m && e.onEditingChange?.(null),
						E(!1),
						queueMicrotask(() => (B ? j.current : k.current)?.focus()));
				} catch (G) {
					(T(uo(G)), O(!0));
				} finally {
					(A(!1), e.onRequestSettled());
				}
			}
		},
		ee = () => {
			if (!(!Z && !I.current)) {
				if (!I.current) {
					const G = p.current,
						oe = G.mentions.filter((X) => {
							const re = e.memberNames.get(X);
							return !!re && g.includes(`@${re}`);
						}),
						_e = RS({ ...n, text: g.trim(), mentions: oe });
					if (_e) {
						T(_e);
						return;
					}
					const N = {
						messageId: n._id,
						clientRequestId: crypto.randomUUID(),
						expectedRevision: G.revision,
						text: g.trim(),
						mentions: oe,
					};
					I.current = () => o(N);
				}
				ie();
			}
		},
		K = () => {
			if (!(!Z && !I.current)) {
				if (!I.current) {
					const G = { messageId: n._id, clientRequestId: crypto.randomUUID(), expectedRevision: n.revision };
					I.current = () => f(G);
				}
				ie();
			}
		},
		ae = (G, oe) => {
			if (!Z || C || I.current || !a.can_request_now()) return;
			const _e = { messageId: n._id, clientRequestId: crypto.randomUUID(), token: G, on: !oe };
			((I.current = () => h(_e)), ie());
		},
		z = () => {
			C ||
				((I.current = null),
				O(!1),
				v(!1),
				_(""),
				(p.current = null),
				m && e.onEditingChange?.(null),
				E(!1),
				T(null),
				queueMicrotask(() => k.current?.focus()));
		},
		H = e.memberNames.get(n.authorHostUserId),
		$ = Date.now() - n.createdAt < 7 * kS;
	return (0, b.jsxs)("li", {
		ref: j,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, b.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: rk(H) }),
			(0, b.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, b.jsx)("span", { className: "message-author", children: H === null ? "Former member" : (H ?? "…") }),
					(0, b.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(n.createdAt).toISOString(),
						children: [
							$ ? (0, b.jsxs)("span", { className: "visually-hidden", children: [Md(n.createdAt), " "] }) : null,
							(0, b.jsx)("span", {
								className: "message-clock",
								children: $
									? new Date(n.createdAt).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
									: Md(n.createdAt),
							}),
						],
					}),
				],
			}),
			B
				? (0, b.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: m
					? (0, b.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, b.jsx)("textarea", {
									ref: L,
									className: "composer-input",
									"aria-label": "Edit message",
									value: g,
									readOnly: C || R,
									onChange: (G) => _(G.currentTarget.value),
									onKeyDown: (G) => {
										G.nativeEvent.isComposing ||
											G.keyCode === 229 ||
											(G.key === "Escape"
												? (G.preventDefault(), G.stopPropagation(), z())
												: G.key === "Enter" && !G.shiftKey && (G.preventDefault(), ee()));
									},
								}),
								(0, b.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, b.jsx)("button", {
											type: "button",
											className: "button",
											disabled: C,
											onClick: z,
											children: "Cancel",
										}),
										(0, b.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: C || (!Z && !R),
											onClick: ee,
											children: C ? "Saving…" : R ? "Retry" : "Save",
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
										uk(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, b.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, b.jsx)(tk, { client: e.client, attachments: n.attachments }) : null,
								u?.length
									? (0, b.jsx)("div", {
											className: "message-reactions",
											children: u.map((G) =>
												(0, b.jsxs)(
													"button",
													{
														type: "button",
														disabled: !Z || C,
														className: G.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": G.reactedByMe,
														"aria-label": `${Mb[G.token]}, ${G.count} ${G.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => ae(G.token, G.reactedByMe),
														children: [
															(0, b.jsx)("span", { "aria-hidden": "true", children: Nb[G.token] }),
															(0, b.jsx)("span", { className: "reaction-chip-count", children: G.count }),
														],
													},
													G.token,
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
										children: ["Last reply ", ro(l.latestReplyAt, Date.now())],
									})
								: null,
						],
					})
				: null,
			!B && !m
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
							(0, b.jsx)(ik, { groups: u ?? [], disabled: !Z || C, onPick: ae }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, b.jsxs)(b.Fragment, {
										children: [
											(0, b.jsx)("button", {
												ref: k,
												type: "button",
												className: "button message-action",
												disabled: C || R || (e.editingMessageId != null && e.editingMessageId !== n._id),
												onClick: () => {
													((p.current = { revision: n.revision, mentions: n.mentions }),
														_(n.text),
														v(!0),
														e.onEditingChange?.(n),
														T(null));
												},
												children: "Edit",
											}),
											(0, b.jsx)("button", {
												type: "button",
												className: "button message-action button-danger",
												disabled: C || R,
												onClick: () => E(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			D && !S
				? (0, b.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							D,
							R && !m
								? (0, b.jsxs)(b.Fragment, {
										children: [
											(0, b.jsx)("button", {
												type: "button",
												className: "button",
												disabled: C || !a.ready,
												onClick: () => void ie(),
												children: "Retry change",
											}),
											(0, b.jsx)("button", {
												type: "button",
												className: "button",
												disabled: C,
												onClick: z,
												children: "Dismiss",
											}),
										],
									})
								: null,
						],
					})
				: null,
			S
				? (0, b.jsxs)(Vr, {
						labelledBy: U,
						onClose: z,
						children: [
							(0, b.jsx)("h2", { id: U, className: "dialog-title", children: "Delete message?" }),
							(0, b.jsx)("p", { children: "The message is replaced by a “Message deleted” placeholder for everyone." }),
							D ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: D }) : null,
							(0, b.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, b.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: C,
										onClick: z,
										children: "Cancel",
									}),
									(0, b.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: C || (!Z && !R),
										onClick: K,
										children: C ? "Deleting…" : R ? "Retry delete" : "Delete message",
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
function IS(e) {
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
				sk,
				{
					...e,
					doc: u,
					isContinuation: m,
					newDay: f ? ak(u.createdAt) : null,
					newMark: h,
					replyTriggerRef: e.setReplyTrigger ? (v) => e.setReplyTrigger?.(u._id, v) : void 0,
				},
				u._id,
			);
		}),
	});
}
function sk(e) {
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
function lk(e) {
	const n = $n(),
		a = n.ready && e.channel !== null,
		u = Je(n, be.messages.get, a || n.refreshing ? { messageId: e.rootMessageId } : "skip"),
		l = NS({ target: { rootMessageId: e.rootMessageId }, enabled: a && u !== null, retain: n.refreshing }),
		o = OS(e.client, `${e.userId}:${e.channelId}:${e.rootMessageId}`),
		f = MS({
			...e,
			rootMessageId: e.rootMessageId,
			draft: o,
			canWrite: e.canWrite && !l.denied && e.channel?.archivedAt === null,
		}),
		h = (0, w.useRef)(null),
		m = (0, w.useRef)(null),
		v = (0, w.useRef)(!0),
		g = (0, w.useRef)(null),
		[_, p] = (0, w.useState)(0);
	return (
		(0, w.useEffect)(() => {
			h.current?.focus();
		}, []),
		(0, w.useEffect)(() => {
			const S = u ? [u, ...l.rows] : l.rows,
				E = [...new Set(S.map((A) => A.authorHostUserId))],
				C = [...new Set([...E, ...S.flatMap((A) => A.mentions)])];
			C.length && e.memberNames.resolve(C, E);
		}, [l.rows, u, e.memberNames]),
		(0, w.useLayoutEffect)(() => {
			if (m.current) {
				if (v.current && l.atLatest) ((m.current.scrollTop = m.current.scrollHeight), p(l.sequence));
				else if (g.current) {
					const S = [...m.current.querySelectorAll("[data-key]")].find((E) => E.dataset.key === g.current.id);
					S && (m.current.scrollTop += S.getBoundingClientRect().top - g.current.top);
				}
			}
		}, [l.rows, l.atLatest, l.sequence]),
		(0, w.useEffect)(() => {
			const S = () => {
				a &&
					u &&
					!l.denied &&
					l.atLatest &&
					v.current &&
					document.visibilityState === "visible" &&
					_ === l.sequence &&
					e.onObservedThreadRead({ rootMessageId: e.rootMessageId, replySequence: _ });
			};
			return (
				S(),
				document.addEventListener("visibilitychange", S),
				() => document.removeEventListener("visibilitychange", S)
			);
		}, [a, u, l.denied, l.atLatest, _, l.sequence, e.rootMessageId, e.onObservedThreadRead]),
		(0, b.jsxs)("section", {
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
				(0, b.jsxs)("div", {
					className: "thread-head",
					children: [
						(0, b.jsx)("h3", { className: "thread-title", children: "Thread" }),
						(0, b.jsx)("button", {
							ref: h,
							type: "button",
							className: "button",
							disabled: e.sendInFlight,
							onClick: e.onClose,
							children: e.isNarrow ? "Back to messages" : "Close thread",
						}),
					],
				}),
				u
					? (0, b.jsx)("ul", {
							className: "message-list thread-root",
							children: (0, b.jsx)(DS, {
								...e,
								doc: u,
								isContinuation: !1,
								editingMessageId: l.editingMessageId,
								onEditingChange: l.setEditingMessage,
							}),
						})
					: (0, b.jsx)("p", {
							className: "channel-status",
							children: a && u === void 0 ? "Loading thread…" : "This thread is unavailable.",
						}),
				(0, b.jsxs)("div", {
					ref: m,
					className: "thread-replies",
					onScroll: () => {
						const S = m.current;
						if (!S) return;
						((v.current = S.scrollHeight - S.scrollTop - S.clientHeight < 80),
							v.current && l.atLatest && p(l.sequence));
						const E = [...S.querySelectorAll("[data-key]")].find(
							(C) => C.getBoundingClientRect().bottom >= S.getBoundingClientRect().top,
						);
						g.current = E ? { id: E.dataset.key, top: E.getBoundingClientRect().top } : null;
					},
					children: [
						(0, b.jsx)(qS, { window: l, disabled: e.sendInFlight || !a }),
						l.loading
							? (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading replies…" })
							: null,
						a && !l.denied && !l.loading && !l.rows.length
							? (0, b.jsx)("p", { className: "channel-status", children: "No replies yet" })
							: null,
						(0, b.jsxs)("ul", {
							className: "message-list",
							children: [
								(0, b.jsx)(IS, {
									...e,
									rows: l.rows,
									editingMessageId: l.editingMessageId,
									onEditingChange: l.setEditingMessage,
								}),
								(0, b.jsx)(jS, { draft: o, queue: f, disabled: !n.ready || !n.can_request_now() }),
							],
						}),
					],
				}),
				f.error ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
				(0, b.jsx)(zS, {
					client: e.client,
					userId: e.userId,
					draft: o,
					label: "Reply in thread",
					busy: f.busy,
					disabled: !a || !u || l.denied || !e.canWrite || !n.canSend || e.channel?.archivedAt !== null,
					onSend: f.enqueue,
				}),
			],
		})
	);
}
var ok = 420,
	$u = 244,
	fd = 340;
function ck(e) {
	return (0, b.jsx)(fk, { ...e }, `${e.userId}:${e.channelId}`);
}
function fk(e) {
	const n = $n(),
		a = n.ready && e.channel !== null,
		u = e.isNarrow && e.threadRootId !== null,
		l = NS({ target: { channelId: e.channelId }, enabled: a, retain: n.refreshing }),
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
		g = (0, w.useRef)(!0),
		_ = (0, w.useRef)(null),
		p = (0, w.useRef)(null),
		[S, E] = (0, w.useState)(0),
		[C, A] = (0, w.useState)(fd),
		[D, T] = (0, w.useState)(0),
		R = Math.max($u, S - ok),
		O = Math.min(R, Math.max($u, C));
	((0, w.useEffect)(() => {
		if (!e.threadRootId || !h.current) return;
		const L = h.current;
		E(L.clientWidth);
		const j = new ResizeObserver(() => E(L.clientWidth));
		return (j.observe(L), () => j.disconnect());
	}, [e.threadRootId]),
		(0, w.useEffect)(() => {
			const L = [...new Set(l.rows.map((k) => k.authorHostUserId))],
				j = [...new Set([...L, ...l.rows.flatMap((k) => k.mentions)])];
			j.length && e.memberNames.resolve(j, L);
		}, [l.rows, e.memberNames]),
		(0, w.useLayoutEffect)(() => {
			if (!(!m.current || u)) {
				if (g.current && l.atLatest) ((m.current.scrollTop = m.current.scrollHeight), T(l.sequence));
				else if (_.current) {
					const L = [...m.current.querySelectorAll("[data-key]")].find((j) => j.dataset.key === _.current.id);
					L && (m.current.scrollTop += L.getBoundingClientRect().top - _.current.top);
				}
			}
		}, [l.rows, l.atLatest, l.sequence, u]),
		(0, w.useEffect)(() => {
			(p.current !== null && l.sequence > p.current && l.atLatest && e.announce("New messages in this channel."),
				(p.current = l.sequence));
		}, [l.sequence, l.atLatest, e.announce]),
		(0, w.useEffect)(() => {
			const L = () => {
				a &&
					!u &&
					!l.denied &&
					l.atLatest &&
					g.current &&
					document.visibilityState === "visible" &&
					D === l.sequence &&
					e.onObservedRead({ rootSequence: D });
			};
			return (
				L(),
				document.addEventListener("visibilitychange", L),
				() => document.removeEventListener("visibilitychange", L)
			);
		}, [a, l.atLatest, D, l.sequence, u, l.denied, e.onObservedRead]));
	const I = () => {
		if (e.sendInFlight) return;
		const L = e.threadRootId;
		(e.setThreadRootId(null), L && queueMicrotask(() => (v.current.get(L) ?? m.current)?.focus()));
	};
	return (0, b.jsxs)("div", {
		className: "channel",
		children: [
			(0, b.jsxs)("header", {
				className: "channel-head",
				inert: u || void 0,
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
								? (0, b.jsx)("p", { className: "channel-privacy", children: qd })
								: null,
						],
					}),
					e.channel?.archivedAt
						? (0, b.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
						: null,
				],
			}),
			(0, b.jsxs)("div", {
				ref: h,
				className: "channel-body",
				style: { "--thread-width": `${O}px` },
				children: [
					(0, b.jsxs)("div", {
						ref: m,
						className: "message-log",
						inert: u || void 0,
						role: "log",
						tabIndex: 0,
						"aria-live": "off",
						"aria-label": e.channel ? `Messages in #${e.channel.name}` : "Messages",
						onScroll: () => {
							const L = m.current;
							if (!L) return;
							((g.current = L.scrollHeight - L.scrollTop - L.clientHeight < 80),
								g.current && l.atLatest && T(l.sequence));
							const j = [...L.querySelectorAll("[data-key]")].find(
								(k) => k.getBoundingClientRect().bottom >= L.getBoundingClientRect().top,
							);
							_.current = j ? { id: j.dataset.key, top: j.getBoundingClientRect().top } : null;
						},
						children: [
							!a && !n.refreshing
								? (0, b.jsx)("p", {
										className: "channel-status",
										role: "status",
										children: "Messages are hidden until Chitchat can confirm your access. Your draft is kept.",
									})
								: null,
							(0, b.jsx)(qS, { window: l, disabled: e.sendInFlight || !a }),
							l.loading
								? (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading messages…" })
								: null,
							a && !l.denied && !l.loading && !l.rows.length && !o.value.pending.length
								? (0, b.jsx)("p", { className: "channel-status", children: "No messages yet" })
								: null,
							(0, b.jsxs)("ul", {
								className: "message-list",
								children: [
									(0, b.jsx)(IS, {
										...e,
										rows: l.rows,
										editingMessageId: l.editingMessageId,
										onEditingChange: l.setEditingMessage,
										readSequence: e.openedAtReadSequence,
										onOpenThread: (L) => {
											e.sendInFlight || e.setThreadRootId(L);
										},
										threadDisabled: e.sendInFlight,
										setReplyTrigger: (L, j) => {
											j ? v.current.set(L, j) : v.current.delete(L);
										},
									}),
									(0, b.jsx)(jS, { draft: o, queue: f, disabled: !n.ready || !n.can_request_now() }),
								],
							}),
						],
					}),
					e.threadRootId
						? (0, b.jsxs)(b.Fragment, {
								children: [
									(0, b.jsx)("div", {
										className: "thread-resize",
										inert: u || void 0,
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": O,
										"aria-valuemin": $u,
										"aria-valuemax": R,
										onKeyDown: (L) => {
											["ArrowLeft", "ArrowRight", "Home"].includes(L.key) &&
												(L.preventDefault(),
												A(Math.min(R, Math.max($u, L.key === "Home" ? fd : O + (L.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (L) => {
											(L.preventDefault(), L.currentTarget.setPointerCapture(L.pointerId));
										},
										onPointerMove: (L) => {
											L.currentTarget.hasPointerCapture(L.pointerId) &&
												h.current &&
												A(Math.min(R, Math.max($u, h.current.getBoundingClientRect().right - L.clientX)));
										},
										onDoubleClick: () => A(fd),
									}),
									(0, b.jsx)(lk, { ...e, rootMessageId: e.threadRootId, onClose: I }, e.threadRootId),
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
			f.error ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
			(0, b.jsx)(zS, {
				client: e.client,
				userId: e.userId,
				draft: o,
				label: e.channel ? `Message #${e.channel.name}` : "Message draft",
				busy: f.busy,
				disabled: !a || l.denied || !e.canWrite || !n.canSend || !e.online || e.channel?.archivedAt !== null,
				inert: u,
				onSend: f.enqueue,
			}),
		],
	});
}
function US(e) {
	const n = $n(),
		a = Je(n, be.transcripts.status, { channelId: e.channelId }),
		u = Ab(be.transcripts.connect),
		l = za(be.transcripts.retry),
		o = za(be.transcripts.reconcile),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		[g, _] = (0, w.useState)(!1),
		[p, S] = (0, w.useState)(!1),
		E = (0, w.useRef)(null),
		C = (0, w.useRef)(null),
		A = (0, w.useId)(),
		D = (0, w.useId)(),
		T = async () => {
			if (!f) {
				if (!n.can_request_now()) {
					v("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				((E.current ??= crypto.randomUUID()), h(!0), v(null));
				try {
					const I = await e.client.getToken();
					if (!n.can_request_now()) {
						v("Chitchat is reconnecting. Try again shortly.");
						return;
					}
					const L = await u({ channelId: e.channelId, pluginToken: I, clientRequestId: E.current });
					L._nay ? v(L._nay.message) : (E.current = null);
				} catch {
					v("Could not confirm the Files connection. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		R = async () => {
			if (!f) {
				if (!n.can_request_now()) {
					v("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				(h(!0), v(null));
				try {
					const I = await l({ channelId: e.channelId });
					I._nay && v(I._nay.message);
				} catch {
					v("Could not restart transcript sync. Try again.");
				} finally {
					h(!1);
				}
			}
		},
		O = async () => {
			if (!(f || !p || !a?.canReconcile)) {
				if (!n.can_request_now()) {
					v("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				if (n.canSend) {
					((C.current ??= crypto.randomUUID()), h(!0), v(null));
					try {
						const I = await o({ channelId: e.channelId, clientRequestId: C.current });
						I._nay ? v(I._nay.message) : ((C.current = null), _(!1), S(!1));
					} catch {
						v("Could not confirm the rebuild request. Retry to check it.");
					} finally {
						h(!1);
					}
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
							? a.deletionPhase
								? a.status === "blocked"
									? "Channel deleted. Its Files copies need attention."
									: a.deletionPhase === "copy"
										? "Channel deleted. Saving its last messages in Files…"
										: "Channel deleted. Archiving its Files copies…"
								: a.status === "ready"
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
								onClick: () => void T(),
								children: f ? "Connecting…" : a.status === "not_connected" ? "Connect Files" : "Reconnect Files",
							})
						: null,
					(a?.status === "blocked" || a?.indexStatus === "blocked") && a.canConnect
						? (0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void R(),
								children: "Retry sync",
							})
						: null,
					a
						? (0, b.jsxs)("details", {
								children: [
									(0, b.jsx)("summary", { children: "Transcript details" }),
									a.folderPath
										? (0, b.jsxs)("p", {
												children: [
													a.folderNodeId ? "Folder in Press Files" : "Planned folder in Press Files",
													":",
													" ",
													(0, b.jsx)("code", { children: a.folderPath }),
												],
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
												children: a.folderNodeId
													? "If folder access is missing, open this folder in Press Files. Give the Chitchat service account Can manage, then reconnect."
													: "If permissions blocked setup, ask a workspace admin to connect. Both the person connecting and the Chitchat service account need Can manage on the parent folder or workspace to create the locked folder.",
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
					m && !g ? (0, b.jsx)("span", { role: "alert", children: m }) : null,
				],
			}),
			g
				? (0, b.jsxs)(Vr, {
						labelledBy: A,
						accessUnavailable: !n.refreshing && (!n.ready || a === null),
						onReconnect: n.retry,
						onClose: () => {
							f || _(!1);
						},
						children: [
							(0, b.jsx)("h2", { id: A, className: "dialog-title", children: "Rebuild transcript copies?" }),
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
										onChange: (I) => S(I.currentTarget.checked),
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
										onClick: () => void O(),
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
function dk(e, n) {
	const a = $a(),
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
			const g = o.current,
				_ = new Set(v);
			for (const C of v) {
				const A = u.current.get(C);
				A && (u.current.delete(C), u.current.set(C, { ...A, author: !0 }));
			}
			const p = [...new Set(m)]
					.slice(0, 1e3)
					.filter((C) => !u.current.has(C) || Date.now() - u.current.get(C).at >= 3e5),
				S = new Set(),
				E = [];
			for (const C of p) {
				const A = l.current.get(C);
				A ? (_.has(C) && (A.author = !0), S.add(A.promise)) : E.push(C);
			}
			for (let C = 0; C < E.length; C += 50) {
				const A = E.slice(C, C + 50),
					D = a
						.query(be.members.resolve, { userIds: A })
						.then((T) => {
							if (!(o.current !== g || !T)) {
								for (const R of A) {
									const O = l.current.get(R)?.author === !0 || u.current.get(R)?.author === !0;
									(u.current.delete(R), u.current.set(R, { name: T[R] ?? null, at: Date.now(), author: O }));
								}
								for (; u.current.size > 1e3; ) {
									const R = [...u.current].find(([, O]) => !O.author)?.[0] ?? u.current.keys().next().value;
									R !== void 0 && u.current.delete(R);
								}
							}
						})
						.catch(() => {})
						.finally(() => {
							if (o.current === g) for (const T of A) l.current.delete(T);
						});
				for (const T of A) l.current.set(T, { promise: D, author: _.has(T) });
				S.add(D);
			}
			S.size > 0 && (await Promise.all(S), o.current === g && f((C) => C + 1));
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
function xh(e, n) {
	const a = e.get(n);
	return a === void 0 ? "…" : (a ?? "Former member");
}
function hk(e) {
	const n = Pn(`${e.scopeKey}:public`),
		a = Pn(`${e.scopeKey}:private`),
		u = Je(e.session, be.views.unreads, { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } }),
		l = Je(e.session, be.views.unreads, { visibility: "private", paginationOpts: { numItems: 50, cursor: a.cursor } });
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
																				children: ro(v.lastActivityAt, Date.now()),
																			}),
																			v.latest
																				? (0, b.jsxs)("span", {
																						className: "view-row-preview",
																						children: [
																							xh(e.memberNames, v.latest.authorHostUserId),
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
										(0, b.jsx)(_i, { page: h, result: m, label: f }),
									],
								},
								f,
							),
						),
					}),
		],
	});
}
function mk(e) {
	const n = Pn(e.scopeKey),
		a = Je(e.session, be.views.activity, { paginationOpts: { numItems: 50, cursor: n.cursor } });
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
																	children: xh(e.memberNames, f.authorHostUserId),
																}),
																(0, b.jsx)("span", {
																	className: "view-row-time",
																	children: ro(f.createdAt, Date.now()),
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
			(0, b.jsx)(_i, { page: n, result: a, label: "Activity" }),
		],
	});
}
function vk(e) {
	const n = Pn(e.scopeKey),
		a = Je(e.session, be.views.threads, { paginationOpts: { numItems: 50, cursor: n.cursor } });
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
														children: ro(u.latest.createdAt, Date.now()),
													}),
													(0, b.jsxs)("span", {
														className: "view-row-preview",
														children: [
															u.summary.activeReplyCount,
															" ",
															u.summary.activeReplyCount === 1 ? "reply" : "replies",
															" ·",
															" ",
															xh(e.memberNames, u.latest.authorHostUserId),
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
				(0, b.jsx)(_i, { page: n, result: a, label: "Threads" }),
			],
		})
	);
}
function gk(e) {
	const n = Pn(e.scopeKey),
		a = Je(e.session, be.transcripts.list_deletions, { paginationOpts: { numItems: 20, cursor: n.cursor } });
	return (0, b.jsxs)("section", {
		className: "view",
		"aria-label": "Files sync",
		children: [
			(0, b.jsx)("header", {
				className: "view-head",
				children: (0, b.jsx)("h2", { className: "view-title", children: "Deleted channel copies" }),
			}),
			(0, b.jsx)("p", {
				className: "view-note",
				children: "Finish saving and archiving the Files copies for deleted channels.",
			}),
			a
				? a.page.length === 0
					? (0, b.jsx)("p", {
							className: "channel-status",
							children: "No deleted channel copies need attention on this page.",
						})
					: (0, b.jsx)("ul", {
							className: "view-rows",
							children: a.page.map((u) =>
								(0, b.jsxs)(
									"li",
									{
										className: "view-row",
										children: [
											(0, b.jsxs)("h3", { className: "view-row-title", children: ["#", u.name] }),
											(0, b.jsx)(US, { client: e.client, channelId: u.channelId }),
										],
									},
									u.channelId,
								),
							),
						})
				: (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Checking Files sync…" }),
			(0, b.jsx)(_i, { page: n, result: a, label: "Deleted channel copies" }),
		],
	});
}
function yk(e) {
	const n = Je(e.session, be.channels.permissions, { channelId: e.channel._id }),
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
				children: (0, b.jsx)(Ez, {
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
var bk = class extends w.Component {
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
function K0(e, n) {
	const a = $a(),
		[u, l] = (0, w.useState)(0),
		o = (0, w.useRef)(0),
		f = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		if (!e || !n) return;
		const h = JSON.stringify(e);
		if (f.current === h) return;
		let m = !1,
			v;
		const g = () => {
			m ||
				((o.current += 1),
				(v = setTimeout(() => l((_) => _ + 1), Math.min(3e4, 1e3 * 2 ** Math.min(o.current - 1, 5)))));
		};
		return (
			("rootMessageId" in e
				? a.mutation(be.read_states.mark_thread_read, {
						rootMessageId: e.rootMessageId,
						replySequence: e.replySequence,
					})
				: a.mutation(be.read_states.mark_read, { channelId: e.channelId, rootSequence: e.rootSequence })
			)
				.then((_) => {
					"_nay" in _ ? g() : m || ((f.current = h), (o.current = 0));
				})
				.catch(g),
			() => {
				((m = !0), v && clearTimeout(v));
			}
		);
	}, [a, e, n, u]);
}
function pk(e) {
	const n = $a(),
		a = $n(),
		u = e.client.context.userId,
		l = `${a.member?.generation ?? "loading"}:${a.member?.membershipLifetime ?? 0}`,
		o = dk(l, a.ready || a.refreshing),
		f = Pn(`${l}:public`),
		h = Pn(`${l}:private`),
		m = Pn(`${l}:archived`),
		v = Pn(`${l}:archived-private`),
		[g, _] = (0, w.useState)(!1),
		p = Je(a, be.channels.list_public, { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } }),
		S = Je(a, be.channels.list_mine, { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } }),
		E = Je(a, be.channels.list_mine, g ? { archived: !0, paginationOpts: { numItems: 50, cursor: v.cursor } } : "skip"),
		C = Je(
			a,
			be.channels.list_public,
			g ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[A, D] = (0, w.useState)(null),
		[T, R] = (0, w.useState)(null),
		[O, I] = (0, w.useState)(null),
		[L, j] = (0, w.useState)(!1),
		[k, U] = (0, w.useState)(!1),
		[B, Z] = (0, w.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[ie, ee] = (0, w.useState)(0),
		[K, ae] = (0, w.useState)({ sequence: 0, text: "" }),
		[z, H] = (0, w.useState)(null),
		[$, G] = (0, w.useState)(null),
		oe = B && T !== null,
		_e = A?.kind === "channel" ? A.id : null,
		N = Je(a, be.channels.get, _e ? { channelId: _e } : "skip"),
		X = Je(a, be.channels.permissions, _e ? { channelId: _e } : "skip"),
		re = N ?? null,
		le = (0, w.useRef)(null),
		me = (0, w.useRef)(null),
		ve = (0, w.useRef)(null),
		Se = (0, w.useRef)(null),
		Ze = (0, w.useRef)(null),
		qe = (0, w.useRef)(0);
	(0, w.useEffect)(() => {
		qe.current += 1;
	}, [a.ready, l]);
	const At = (0, w.useId)(),
		Pt = (0, w.useId)(),
		pn = (0, w.useId)(),
		on = (0, w.useId)(),
		ot = (0, w.useMemo)(
			() => [...(p?.page ?? []), ...(S?.page ?? []), ...(C?.page ?? []), ...(E?.page ?? [])],
			[p, S, C, E],
		),
		de = jd(
			(0, w.useMemo)(
				() =>
					Object.fromEntries(
						ot.map((se) => [se._id, { query: be.read_states.get_for_channel, args: { channelId: se._id } }]),
					),
				[ot],
			),
		),
		Ee = ot.filter((se) => {
			const ge = de[se._id];
			return se.archivedAt === null && !(ge instanceof Error) && ge?.hasUnread;
		}).length,
		st = !p?.isDone || !S?.isDone || f.number > 1 || h.number > 1,
		ze = (0, w.useCallback)((se) => ae((ge) => ({ sequence: ge.sequence + 1, text: se })), []),
		zt = (0, w.useCallback)(() => ee((se) => se + 1), []),
		Ot = (0, w.useCallback)(() => ee((se) => Math.max(0, se - 1)), []),
		ue = (0, w.useCallback)(
			(se) => {
				_e &&
					H((ge) =>
						ge?.channelId === _e && ge.scopeKey === l && ge.rootSequence >= se.rootSequence
							? ge
							: {
									scopeKey: l,
									channelId: _e,
									rootSequence: Math.max(
										ge?.channelId === _e && ge.scopeKey === l ? ge.rootSequence : 0,
										se.rootSequence,
									),
								},
					);
			},
			[_e, l],
		),
		Re = (0, w.useCallback)(
			(se) => {
				G((ge) =>
					ge?.scopeKey === l && ge.rootMessageId === se.rootMessageId && ge.replySequence >= se.replySequence
						? ge
						: { scopeKey: l, ...se },
				);
			},
			[l],
		);
	(K0(z, z?.scopeKey === l && a.connected && a.can_request_now() && z?.channelId === N?._id),
		K0($, $?.scopeKey === l && a.connected && a.can_request_now() && !!N && $?.rootMessageId === T));
	const it = (0, w.useCallback)(
			async (se, ge) => {
				if (ie > 0 || !a.ready) return;
				const Ht = ++qe.current;
				try {
					const Jn = await n.query(be.read_states.get_for_channel, { channelId: se._id });
					if (Ht !== qe.current) return;
					(D({ kind: "channel", id: se._id, openedAtReadSequence: Jn?.state?.rootSequence ?? 0 }),
						R(ge ?? null),
						j(!1),
						U(!1),
						ze(`Opened #${se.name}`));
				} catch {
					ze("Could not open this channel. Try again.");
				}
			},
			[n, ie, a.ready, ze],
		),
		Oe = (0, w.useCallback)(() => {
			(I(null), (Ze.current = "selected"));
		}, []),
		kt = (0, w.useCallback)(() => {
			(I(null), _(!0), (Ze.current = "selected"));
		}, []);
	((0, w.useEffect)(() => {
		const se = (Ht) => {
				Ht.target instanceof Node && !le.current?.contains(Ht.target) && (Se.current = null);
			},
			ge = () => {
				Se.current = null;
			};
		return (
			document.addEventListener("focusin", se),
			window.addEventListener("blur", ge),
			() => {
				(document.removeEventListener("focusin", se), window.removeEventListener("blur", ge));
			}
		);
	}, []),
		(0, w.useEffect)(() => {
			const se = window.matchMedia("(max-width: 719px)"),
				ge = (Ht) => {
					((Ze.current = Ht.matches
						? T && Se.current !== null
							? "thread"
							: Se.current === "sidebar" && !L
								? "drawer"
								: null
						: Se.current === "drawer"
							? "selected"
							: null),
						Ht.matches && T && j(!1),
						Z(Ht.matches));
				};
			return (se.addEventListener("change", ge), () => se.removeEventListener("change", ge));
		}, [L, T]),
		(0, w.useLayoutEffect)(() => {
			if (document.querySelector(".dialog-overlay")) return;
			const se = Ze.current;
			if (((Ze.current = null), se === "thread" || (se !== null && B && T))) {
				const ge = le.current?.querySelector(".thread"),
					Ht = ge?.querySelector(".thread-head button:not([disabled])");
				Ht ? Ht.focus() : ge ? ge.focus() : ve.current?.focus();
			} else if (se === "drawer" || (se === "selected" && B && !L)) ve.current?.focus();
			else if (se === "selected") {
				const ge = me.current?.querySelector('[aria-current="page"]');
				ge && !ge.disabled ? ge.focus() : me.current?.focus();
			}
		}, [O, B, T, L]));
	const Dt = (se, ge, Ht) =>
		Ht.length === 0
			? null
			: (0, b.jsxs)("div", {
					className: "channel-section",
					children: [
						(0, b.jsx)("h2", { id: ge, className: "channel-section-title", children: se }),
						(0, b.jsx)("ul", {
							className: "channel-list",
							"aria-labelledby": ge,
							children: Ht.map((Jn) =>
								(0, b.jsx)(
									yk,
									{
										channel: Jn,
										selected: _e === Jn._id,
										blocked: ie > 0,
										session: a,
										unread: de[Jn._id],
										onOpen: it,
										onDialog: I,
									},
									Jn._id,
								),
							),
						}),
					],
				});
	return (0, b.jsxs)("div", {
		ref: le,
		className: "chitchat",
		onFocusCapture: (se) => {
			const ge = se.target;
			Se.current =
				ge === ve.current
					? "drawer"
					: me.current?.contains(ge)
						? "sidebar"
						: ge.classList.contains("thread-resize")
							? "separator"
							: le.current?.contains(ge) && !ge.closest(".thread")
								? "main"
								: null;
		},
		children: [
			(0, b.jsxs)("header", {
				className: "app-bar",
				inert: oe || void 0,
				children: [
					(0, b.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, b.jsx)("button", {
						ref: ve,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": L,
						onClick: () => j((se) => !se),
						children: "Channels",
					}),
				],
			}),
			(0, b.jsx)("nav", {
				ref: me,
				inert: oe || void 0,
				className: ["sidebar", L && "is-open", k && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (se) => {
					se.key === "Escape" && B && L && (j(!1), ve.current?.focus());
				},
				children: (0, b.jsxs)("div", {
					className: "sidebar-inner",
					inert: B && !L ? !0 : void 0,
					children: [
						(0, b.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, b.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, b.jsx)("button", {
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": k,
									"aria-label": k ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => U((se) => !se),
									children: k ? "«" : "»",
								}),
								(0, b.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: ie > 0 || !a.canSend,
									onClick: () => I({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						(0, b.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: ["unreads", "threads", "activity", "transcripts"].map((se) =>
								(0, b.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, b.jsxs)("button", {
											type: "button",
											className:
												se === "unreads" && Ee > 0 ? "channel-link view-link is-unread" : "channel-link view-link",
											"aria-current": A?.kind === se ? "page" : void 0,
											disabled: ie > 0,
											onClick: () => {
												((qe.current += 1),
													D({ kind: se }),
													R(null),
													j(!1),
													ze(`Opened ${se === "transcripts" ? "Files sync" : se}`));
											},
											children: [
												(0, b.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: se === "transcripts" ? "F" : se[0].toUpperCase(),
												}),
												(0, b.jsx)("span", {
													className: "channel-name",
													children: se === "transcripts" ? "Files sync" : se[0].toUpperCase() + se.slice(1),
												}),
												se === "unreads" && Ee > 0
													? (0, b.jsxs)("span", {
															className: "mention-badge",
															children: [
																Ee,
																st ? "+" : "",
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
									se,
								),
							),
						}),
						(a.ready || a.refreshing) && p && S
							? (0, b.jsxs)(b.Fragment, {
									children: [
										Dt("Channels", At, p.page),
										(0, b.jsx)(_i, { page: f, result: p, label: "Public channels" }),
										Dt("Private channels", Pt, S.page),
										(0, b.jsx)(_i, { page: h, result: S, label: "Private channels" }),
										ot.length === 0
											? (0, b.jsx)("p", { className: "channel-status", children: "No channels on this page" })
											: null,
										(0, b.jsx)("button", {
											type: "button",
											className: "button sidebar-archive-toggle",
											"aria-expanded": g,
											onClick: () => _((se) => !se),
											children: g ? "Hide archived channels" : "Show archived channels",
										}),
										g
											? (0, b.jsxs)(b.Fragment, {
													children: [
														Dt("Archived", pn, C?.page ?? []),
														(0, b.jsx)(_i, { page: m, result: C, label: "Archived channels" }),
														Dt("Archived private channels", on, E?.page ?? []),
														(0, b.jsx)(_i, { page: v, result: E, label: "Archived private channels" }),
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
					(0, b.jsxs)("div", {
						className: "main-notices",
						inert: oe || void 0,
						children: [
							_e ? (0, b.jsx)(US, { client: e.client, channelId: _e }, `transcript:${_e}`) : null,
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
						],
					}),
					A?.kind === "unreads"
						? (0, b.jsx)(hk, { scopeKey: l, session: a, memberNames: o, onOpen: it })
						: A?.kind === "activity"
							? (0, b.jsx)(mk, { scopeKey: l, session: a, userId: u, memberNames: o, onOpen: it })
							: A?.kind === "threads"
								? (0, b.jsx)(vk, { scopeKey: l, session: a, memberNames: o, onOpen: it })
								: A?.kind === "transcripts"
									? (0, b.jsx)(gk, { client: e.client, scopeKey: l, session: a })
									: A?.kind === "channel"
										? (0, b.jsx)(
												ck,
												{
													client: e.client,
													channelId: A.id,
													channel: re,
													userId: u,
													memberNames: o,
													announce: ze,
													threadRootId: T,
													setThreadRootId: (se) => {
														(R(se), se && j(!1));
													},
													isNarrow: B,
													canWrite: X?.canWrite ?? !1,
													online: a.connected,
													openedAtReadSequence: A.openedAtReadSequence,
													onObservedRead: ue,
													onObservedThreadRead: Re,
													onRequestStart: zt,
													onRequestSettled: Ot,
													sendInFlight: ie > 0,
												},
												`channel:${A.id}`,
											)
										: (0, b.jsx)("p", {
												className: "channel-status",
												children: a.ready
													? ot.length === 0
														? st
															? "No channels on this page. Use the page controls to continue."
															: "No channels yet — create the first one."
														: "Select a channel."
													: "Connecting to Chitchat…",
											}),
				],
			}),
			O?.kind === "create"
				? (0, b.jsx)(l0, {
						channel: null,
						selfUserId: u,
						onClose: Oe,
						onSaved: (se) => {
							(Oe(), D({ kind: "channel", id: se, openedAtReadSequence: 0 }), R(null));
						},
					})
				: null,
			O?.kind === "rename" ? (0, b.jsx)(l0, { channel: O.channel, selfUserId: u, onClose: Oe, onSaved: Oe }) : null,
			O?.kind === "people" ? (0, b.jsx)(XR, { channelId: O.channel._id, selfUserId: u, onClose: Oe }) : null,
			O && O.kind !== "create" && O.kind !== "rename" && O.kind !== "people"
				? (0, b.jsx)(JR, { channel: O.channel, action: O.kind, onClose: Oe, onDone: kt })
				: null,
			(0, b.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, b.jsx)("span", { "data-announcement-sequence": K.sequence }), K.text],
			}),
		],
	});
}
function LS(e) {
	return (0, b.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var $S = document.getElementById("root");
if (!$S) throw new Error("index.html is missing the #root element");
var zd = (0, lE.createRoot)($S);
zd.render((0, b.jsx)(LS, { message: "Connecting…" }));
nE().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			zd.render(
				(0, b.jsx)(bk, { client: e, children: (0, b.jsx)(GR, { client: e, children: (0, b.jsx)(pk, { client: e }) }) }),
			));
	},
	(e) => {
		zd.render((0, b.jsx)(LS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
