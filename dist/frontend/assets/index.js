var G_ = Object.create,
	X0 = Object.defineProperty,
	X_ = Object.getOwnPropertyDescriptor,
	J_ = Object.getOwnPropertyNames,
	W_ = Object.getPrototypeOf,
	e1 = Object.prototype.hasOwnProperty,
	kn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	t1 = (e, n, r, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var l = J_(n), o = 0, f = l.length, h; o < f; o++)
				((h = l[o]),
					!e1.call(e, h) &&
						h !== r &&
						X0(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = X_(n, h)) || u.enumerable }));
		return e;
	},
	J0 = (e, n, r) => (
		(r = e != null ? G_(W_(e)) : {}),
		t1(n || !e || !e.__esModule ? X0(r, "default", { value: e, enumerable: !0 }) : r, e)
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
var n1 = kn((e) => {
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
			w = Symbol.for("react.lazy"),
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
		function A(O, X, re) {
			((this.props = O), (this.context = X), (this.refs = D), (this.updater = re || C));
		}
		((A.prototype.isReactComponent = {}),
			(A.prototype.setState = function (O, X) {
				if (typeof O != "object" && typeof O != "function" && O != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, O, X, "setState");
			}),
			(A.prototype.forceUpdate = function (O) {
				this.updater.enqueueForceUpdate(this, O, "forceUpdate");
			}));
		function N() {}
		N.prototype = A.prototype;
		function R(O, X, re) {
			((this.props = O), (this.context = X), (this.refs = D), (this.updater = re || C));
		}
		var $ = (R.prototype = new N());
		(($.constructor = R), T($, A.prototype), ($.isPureReactComponent = !0));
		var I = Array.isArray;
		function j() {}
		var z = { H: null, A: null, T: null, S: null },
			U = Object.prototype.hasOwnProperty;
		function L(O, X, re) {
			var le = re.ref;
			return { $$typeof: n, type: O, key: X, ref: le !== void 0 ? le : null, props: re };
		}
		function Q(O, X) {
			return L(O.type, X, O.props);
		}
		function ie(O) {
			return typeof O == "object" && O !== null && O.$$typeof === n;
		}
		function G(O) {
			var X = { "=": "=0", ":": "=2" };
			return (
				"$" +
				O.replace(/[=:]/g, function (re) {
					return X[re];
				})
			);
		}
		var F = /\/+/g;
		function ne(O, X) {
			return typeof O == "object" && O !== null && O.key != null ? G("" + O.key) : X.toString(36);
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
									function (X) {
										O.status === "pending" && ((O.status = "fulfilled"), (O.value = X));
									},
									function (X) {
										O.status === "pending" && ((O.status = "rejected"), (O.reason = X));
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
		function H(O, X, re, le, me) {
			var ge = typeof O;
			(ge === "undefined" || ge === "boolean") && (O = null);
			var be = !1;
			if (O === null) be = !0;
			else
				switch (ge) {
					case "bigint":
					case "string":
					case "number":
						be = !0;
						break;
					case "object":
						switch (O.$$typeof) {
							case n:
							case r:
								be = !0;
								break;
							case w:
								return ((be = O._init), H(be(O._payload), X, re, le, me));
						}
				}
			if (be)
				return (
					(me = me(O)),
					(be = le === "" ? "." + ne(O, 0) : le),
					I(me)
						? ((re = ""),
							be != null && (re = be.replace(F, "$&/") + "/"),
							H(me, X, re, "", function (ot) {
								return ot;
							}))
						: me != null &&
							(ie(me) &&
								(me = Q(
									me,
									re + (me.key == null || (O && O.key === me.key) ? "" : ("" + me.key).replace(F, "$&/") + "/") + be,
								)),
							X.push(me)),
					1
				);
			be = 0;
			var Ve = le === "" ? "." : le + ":";
			if (I(O))
				for (var Me = 0; Me < O.length; Me++) ((le = O[Me]), (ge = Ve + ne(le, Me)), (be += H(le, X, re, ge, me)));
			else if (((Me = E(O)), typeof Me == "function"))
				for (O = Me.call(O), Me = 0; !(le = O.next()).done; )
					((le = le.value), (ge = Ve + ne(le, Me++)), (be += H(le, X, re, ge, me)));
			else if (ge === "object") {
				if (typeof O.then == "function") return H(k(O), X, re, le, me);
				throw (
					(X = String(O)),
					Error(
						"Objects are not valid as a React child (found: " +
							(X === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : X) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return be;
		}
		function B(O, X, re) {
			if (O == null) return O;
			var le = [],
				me = 0;
			return (
				H(O, le, "", "", function (ge) {
					return X.call(re, ge, me++);
				}),
				le
			);
		}
		function ue(O) {
			if (O._status === -1) {
				var X = O._result;
				((X = X()),
					X.then(
						function (re) {
							(O._status === 0 || O._status === -1) && ((O._status = 1), (O._result = re));
						},
						function (re) {
							(O._status === 0 || O._status === -1) && ((O._status = 2), (O._result = re));
						},
					),
					O._status === -1 && ((O._status = 0), (O._result = X)));
			}
			if (O._status === 1) return O._result.default;
			throw O._result;
		}
		var fe =
				typeof reportError == "function"
					? reportError
					: function (O) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var X = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
									error: O,
								});
								if (!window.dispatchEvent(X)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", O);
								return;
							}
							console.error(O);
						},
			qe = {
				map: B,
				forEach: function (O, X, re) {
					B(
						O,
						function () {
							X.apply(this, arguments);
						},
						re,
					);
				},
				count: function (O) {
					var X = 0;
					return (
						B(O, function () {
							X++;
						}),
						X
					);
				},
				toArray: function (O) {
					return (
						B(O, function (X) {
							return X;
						}) || []
					);
				},
				only: function (O) {
					if (!ie(O)) throw Error("React.Children.only expected to receive a single React element child.");
					return O;
				},
			};
		((e.Activity = b),
			(e.Children = qe),
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
			(e.cloneElement = function (O, X, re) {
				if (O == null) throw Error("The argument must be a React element, but you passed " + O + ".");
				var le = T({}, O.props),
					me = O.key;
				if (X != null)
					for (ge in (X.key !== void 0 && (me = "" + X.key), X))
						!U.call(X, ge) ||
							ge === "key" ||
							ge === "__self" ||
							ge === "__source" ||
							(ge === "ref" && X.ref === void 0) ||
							(le[ge] = X[ge]);
				var ge = arguments.length - 2;
				if (ge === 1) le.children = re;
				else if (1 < ge) {
					for (var be = Array(ge), Ve = 0; Ve < ge; Ve++) be[Ve] = arguments[Ve + 2];
					le.children = be;
				}
				return L(O.type, me, le);
			}),
			(e.createContext = function (O) {
				return (
					(O = { $$typeof: h, _currentValue: O, _currentValue2: O, _threadCount: 0, Provider: null, Consumer: null }),
					(O.Provider = O),
					(O.Consumer = { $$typeof: f, _context: O }),
					O
				);
			}),
			(e.createElement = function (O, X, re) {
				var le,
					me = {},
					ge = null;
				if (X != null)
					for (le in (X.key !== void 0 && (ge = "" + X.key), X))
						U.call(X, le) && le !== "key" && le !== "__self" && le !== "__source" && (me[le] = X[le]);
				var be = arguments.length - 2;
				if (be === 1) me.children = re;
				else if (1 < be) {
					for (var Ve = Array(be), Me = 0; Me < be; Me++) Ve[Me] = arguments[Me + 2];
					me.children = Ve;
				}
				if (O && O.defaultProps) for (le in ((be = O.defaultProps), be)) me[le] === void 0 && (me[le] = be[le]);
				return L(O, ge, me);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (O) {
				return { $$typeof: m, render: O };
			}),
			(e.isValidElement = ie),
			(e.lazy = function (O) {
				return { $$typeof: w, _payload: { _status: -1, _result: O }, _init: ue };
			}),
			(e.memo = function (O, X) {
				return { $$typeof: y, type: O, compare: X === void 0 ? null : X };
			}),
			(e.startTransition = function (O) {
				var X = z.T,
					re = {};
				z.T = re;
				try {
					var le = O(),
						me = z.S;
					(me !== null && me(re, le),
						typeof le == "object" && le !== null && typeof le.then == "function" && le.then(j, fe));
				} catch (ge) {
					fe(ge);
				} finally {
					(X !== null && re.types !== null && (X.types = re.types), (z.T = X));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return z.H.useCacheRefresh();
			}),
			(e.use = function (O) {
				return z.H.use(O);
			}),
			(e.useActionState = function (O, X, re) {
				return z.H.useActionState(O, X, re);
			}),
			(e.useCallback = function (O, X) {
				return z.H.useCallback(O, X);
			}),
			(e.useContext = function (O) {
				return z.H.useContext(O);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (O, X) {
				return z.H.useDeferredValue(O, X);
			}),
			(e.useEffect = function (O, X) {
				return z.H.useEffect(O, X);
			}),
			(e.useEffectEvent = function (O) {
				return z.H.useEffectEvent(O);
			}),
			(e.useId = function () {
				return z.H.useId();
			}),
			(e.useImperativeHandle = function (O, X, re) {
				return z.H.useImperativeHandle(O, X, re);
			}),
			(e.useInsertionEffect = function (O, X) {
				return z.H.useInsertionEffect(O, X);
			}),
			(e.useLayoutEffect = function (O, X) {
				return z.H.useLayoutEffect(O, X);
			}),
			(e.useMemo = function (O, X) {
				return z.H.useMemo(O, X);
			}),
			(e.useOptimistic = function (O, X) {
				return z.H.useOptimistic(O, X);
			}),
			(e.useReducer = function (O, X, re) {
				return z.H.useReducer(O, X, re);
			}),
			(e.useRef = function (O) {
				return z.H.useRef(O);
			}),
			(e.useState = function (O) {
				return z.H.useState(O);
			}),
			(e.useSyncExternalStore = function (O, X, re) {
				return z.H.useSyncExternalStore(O, X, re);
			}),
			(e.useTransition = function () {
				return z.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	uo = kn((e, n) => {
		n.exports = n1();
	}),
	Yn = [],
	zn = [],
	i1 = Uint8Array,
	Yf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Aa = 0, r1 = Yf.length; Aa < r1; ++Aa) ((Yn[Aa] = Yf[Aa]), (zn[Yf.charCodeAt(Aa)] = Aa));
zn[45] = 62;
zn[95] = 63;
function a1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var r = e.indexOf("=");
	r === -1 && (r = n);
	var u = r === n ? 0 : 4 - (r % 4);
	return [r, u];
}
function u1(e, n, r) {
	return ((n + r) * 3) / 4 - r;
}
function Yu(e) {
	var n,
		r = a1(e),
		u = r[0],
		l = r[1],
		o = new i1(u1(e, u, l)),
		f = 0,
		h = l > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(zn[e.charCodeAt(m)] << 18) |
			(zn[e.charCodeAt(m + 1)] << 12) |
			(zn[e.charCodeAt(m + 2)] << 6) |
			zn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		l === 2 && ((n = (zn[e.charCodeAt(m)] << 2) | (zn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		l === 1 &&
			((n = (zn[e.charCodeAt(m)] << 10) | (zn[e.charCodeAt(m + 1)] << 4) | (zn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function s1(e) {
	return Yn[(e >> 18) & 63] + Yn[(e >> 12) & 63] + Yn[(e >> 6) & 63] + Yn[e & 63];
}
function l1(e, n, r) {
	for (var u, l = [], o = n; o < r; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), l.push(s1(u)));
	return l.join("");
}
function Fu(e) {
	for (var n, r = e.length, u = r % 3, l = [], o = 16383, f = 0, h = r - u; f < h; f += o)
		l.push(l1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[r - 1]), l.push(Yn[n >> 2] + Yn[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[r - 2] << 8) + e[r - 1]), l.push(Yn[n >> 10] + Yn[(n >> 4) & 63] + Yn[(n << 2) & 63] + "=")),
		l.join("")
	);
}
function wi(e) {
	if (e === void 0) return {};
	if (!W0(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function o1(e) {
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
function W0(e) {
	const n = typeof e == "object",
		r = Object.getPrototypeOf(e),
		u = r === null || r === Object.prototype || r?.constructor?.name === "Object";
	return n && u;
}
var eb = !0,
	Ia = BigInt("-9223372036854775808"),
	jd = BigInt("9223372036854775807"),
	md = BigInt("0"),
	c1 = BigInt("8"),
	f1 = BigInt("256"),
	Ff =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	tb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Ff);
		}
		valueOf() {
			throw new Error(Ff);
		}
		toJSON() {
			throw new Error(Ff);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	d1 = new tb();
function nb(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function h1(e) {
	e < md && (e -= Ia + Ia);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const r = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const l of n.match(/.{2}/g).reverse()) (r.set([parseInt(l, 16)], u++), (e >>= c1));
	return Fu(r);
}
function m1(e) {
	const n = Yu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let r = md,
		u = md;
	for (const l of n) ((r += BigInt(l) * f1 ** u), u++);
	return (r > jd && (r += Ia + Ia), r);
}
function v1(e) {
	if (e < Ia || jd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), Fu(new Uint8Array(n)));
}
function g1(e) {
	const n = Yu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var y1 = DataView.prototype.setBigInt64 ? v1 : h1,
	b1 = DataView.prototype.getBigInt64 ? g1 : m1,
	by = 1024;
function vd(e) {
	if (e.length > by) throw new Error(`Field name ${e} exceeds maximum field name length ${by}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const r = e.charCodeAt(n);
		if (r < 32 || r >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Ua(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Ua(u));
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
			return b1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const l = Yu(e.$float);
			if (l.byteLength !== 8) throw new Error(`Received ${l.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(l.buffer).getFloat64(0, eb);
			if (!nb(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return d1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const r = {};
	for (const [u, l] of Object.entries(e)) (vd(u), (r[u] = Ua(l)));
	return r;
}
var py = 16384;
function ka(e) {
	const n = JSON.stringify(e, (r, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > py) {
		const r = "[...truncated]";
		let u = py - 14;
		const l = n.codePointAt(u - 1);
		return (l !== void 0 && l > 65535 && (u -= 1), n.substring(0, u) + r);
	}
	return n;
}
function Yl(e, n, r, u) {
	if (e === void 0) {
		const f = r && ` (present at path ${r} in original object ${ka(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Ia || jd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: y1(e) };
	}
	if (typeof e == "number")
		if (nb(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, eb), { $float: Fu(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: Fu(new Uint8Array(e)) };
	if (e instanceof tb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Yl(f, n, r + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Kf(r, "Set", [...e], n));
	if (e instanceof Map) throw new Error(Kf(r, "Map", [...e], n));
	if (!W0(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Kf(r, h, e, n));
	}
	const l = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (vd(f), (l[f] = Yl(h, n, r + `.${f}`, !1))) : u && (vd(f), (l[f] = p1(h, n, r + `.${f}`)));
	return l;
}
function Kf(e, n, r, u) {
	return e
		? `${n}${ka(r)} is not a supported Convex type (present at path ${e} in original object ${ka(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${ka(r)} is not a supported Convex type.`;
}
function p1(e, n, r) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${ka(e)} but original value is undefined`);
	return Yl(e, n, r, !1);
}
function $n(e) {
	return Yl(e, e, "", !1);
}
var S1 = Object.defineProperty,
	w1 = (e, n, r) => (n in e ? S1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	tt = (e, n, r) => w1(e, typeof n != "symbol" ? n + "" : n, r),
	_1 = "https://docs.convex.dev/error#undefined-validator";
function Ku(e, n) {
	const r = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${r} in ${e}. This is often caused by circular imports. See ${_1} for details.`,
	);
}
var ln = class {
		constructor({ isOptional: e }) {
			(tt(this, "type"),
				tt(this, "fieldPaths"),
				tt(this, "isOptional"),
				tt(this, "isConvexValidator"),
				(this.isOptional = e),
				(this.isConvexValidator = !0));
		}
	},
	x1 = class ib extends ln {
		constructor({ isOptional: n, tableName: r }) {
			if ((super({ isOptional: n }), tt(this, "tableName"), tt(this, "kind", "id"), typeof r != "string"))
				throw new Error("v.id(tableName) requires a string");
			this.tableName = r;
		}
		get json() {
			return { type: "id", tableName: this.tableName };
		}
		asOptional() {
			return new ib({ isOptional: "optional", tableName: this.tableName });
		}
	},
	Sy = class rb extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "float64"));
		}
		get json() {
			return { type: "number" };
		}
		asOptional() {
			return new rb({ isOptional: "optional" });
		}
	},
	wy = class ab extends ln {
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
	E1 = class ub extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "commitTs"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ub({ isOptional: "optional" });
		}
	},
	C1 = class sb extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "boolean"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new sb({ isOptional: "optional" });
		}
	},
	T1 = class lb extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "bytes"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new lb({ isOptional: "optional" });
		}
	},
	A1 = class ob extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "string"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ob({ isOptional: "optional" });
		}
	},
	R1 = class cb extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "null"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new cb({ isOptional: "optional" });
		}
	},
	O1 = class fb extends ln {
		constructor() {
			(super(...arguments), tt(this, "kind", "any"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new fb({ isOptional: "optional" });
		}
	},
	N1 = class Oa extends ln {
		constructor({ isOptional: n, fields: r }) {
			(super({ isOptional: n }),
				tt(this, "fields"),
				tt(this, "kind", "object"),
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
			return new Oa({ isOptional: "optional", fields: this.fields });
		}
		omit(...n) {
			const r = { ...this.fields };
			for (const u of n) delete r[u];
			return new Oa({ isOptional: this.isOptional, fields: r });
		}
		pick(...n) {
			const r = {};
			for (const u of n) r[u] = this.fields[u];
			return new Oa({ isOptional: this.isOptional, fields: r });
		}
		partial() {
			const n = {};
			for (const [r, u] of globalThis.Object.entries(this.fields)) n[r] = u.asOptional();
			return new Oa({ isOptional: this.isOptional, fields: n });
		}
		extend(n) {
			return new Oa({ isOptional: this.isOptional, fields: { ...this.fields, ...n } });
		}
	},
	M1 = class db extends ln {
		constructor({ isOptional: n, value: r }) {
			if (
				(super({ isOptional: n }),
				tt(this, "value"),
				tt(this, "kind", "literal"),
				typeof r != "string" && typeof r != "boolean" && typeof r != "number" && typeof r != "bigint")
			)
				throw new Error("v.literal(value) must be a string, number, or boolean");
			this.value = r;
		}
		get json() {
			return { type: this.kind, value: $n(this.value) };
		}
		asOptional() {
			return new db({ isOptional: "optional", value: this.value });
		}
	},
	z1 = class hb extends ln {
		constructor({ isOptional: n, element: r }) {
			(super({ isOptional: n }),
				tt(this, "element"),
				tt(this, "kind", "array"),
				r === void 0 && Ku("v.array()"),
				(this.element = r));
		}
		get json() {
			return { type: this.kind, value: this.element.json };
		}
		asOptional() {
			return new hb({ isOptional: "optional", element: this.element });
		}
	},
	k1 = class mb extends ln {
		constructor({ isOptional: n, key: r, value: u }) {
			if (
				(super({ isOptional: n }),
				tt(this, "key"),
				tt(this, "value"),
				tt(this, "kind", "record"),
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
			return new mb({ isOptional: "optional", key: this.key, value: this.value });
		}
	},
	D1 = class vb extends ln {
		constructor({ isOptional: n, members: r }) {
			(super({ isOptional: n }),
				tt(this, "members"),
				tt(this, "kind", "union"),
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
			return new vb({ isOptional: "optional", members: this.members });
		}
	},
	oe = {
		id: (e) => new x1({ isOptional: "required", tableName: e }),
		null: () => new R1({ isOptional: "required" }),
		number: () => new Sy({ isOptional: "required" }),
		float64: () => new Sy({ isOptional: "required" }),
		bigint: () => new wy({ isOptional: "required" }),
		int64: () => new wy({ isOptional: "required" }),
		commitTs: () => new E1({ isOptional: "required" }),
		boolean: () => new C1({ isOptional: "required" }),
		string: () => new A1({ isOptional: "required" }),
		bytes: () => new T1({ isOptional: "required" }),
		literal: (e) => new M1({ isOptional: "required", value: e }),
		array: (e) => new z1({ isOptional: "required", element: e }),
		object: (e) => new N1({ isOptional: "required", fields: e }),
		record: (e, n) => new k1({ isOptional: "required", key: e, value: n }),
		union: (...e) => new D1({ isOptional: "required", members: e }),
		any: () => new O1({ isOptional: "required" }),
		optional: (e) => e.asOptional(),
		nullable: (e) => oe.union(e, oe.null()),
	},
	j1 = Object.defineProperty,
	q1 = (e, n, r) => (n in e ? j1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Gf = (e, n, r) => q1(e, typeof n != "symbol" ? n + "" : n, r),
	_y,
	xy,
	I1 = Symbol.for("ConvexError"),
	gd = class extends ((xy = Error), (_y = I1), xy) {
		constructor(e) {
			(super(typeof e == "string" ? e : ka(e)),
				Gf(this, "name", "ConvexError"),
				Gf(this, "data"),
				Gf(this, _y, !0),
				(this.data = e));
		}
	},
	Ey = "1.44.0",
	U1 = Object.defineProperty,
	L1 = (e, n, r) => (n in e ? U1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Cy = (e, n, r) => L1(e, typeof n != "symbol" ? n + "" : n, r),
	$1 = "color:rgb(0, 145, 255)";
function gb(e) {
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
var yb = class {
	constructor(e) {
		(Cy(this, "_onLogLineFuncs"), Cy(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function bb(e) {
	const n = new yb(e);
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
function pb(e) {
	return new yb(e);
}
function Fl(e, n, r, u, l) {
	const o = gb(r);
	if ((typeof l == "object" && (l = `ConvexError ${JSON.stringify(l.errorData, null, 2)}`), n === "info")) {
		const f = l.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = l.slice(1, f[0].length - 2),
			m = l.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, $1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${l}`);
}
function B1(e, n) {
	const r = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(r), new Error(r));
}
function Ma(e, n, r) {
	return `[CONVEX ${gb(e)}(${n})] ${r.errorMessage}
  Called by client`;
}
function yd(e, n) {
	return ((n.data = e.errorData), n);
}
function Dr(e) {
	const n = e.split(":");
	let r, u;
	return (
		n.length === 1 ? ((r = n[0]), (u = "default")) : ((r = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		r.endsWith(".js") && (r = r.slice(0, -3)),
		`${r}:${u}`
	);
}
function zr(e, n) {
	return JSON.stringify({ udfPath: Dr(e), args: $n(n) });
}
function Ty(e, n, r) {
	const { initialNumItems: u, id: l } = r;
	return JSON.stringify({ type: "paginated", udfPath: Dr(e), args: $n(n), options: $n({ initialNumItems: u, id: l }) });
}
var V1 = Object.defineProperty,
	H1 = (e, n, r) => (n in e ? V1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Pn = (e, n, r) => H1(e, typeof n != "symbol" ? n + "" : n, r),
	Z1 = class {
		constructor() {
			(Pn(this, "nextQueryId"),
				Pn(this, "querySetVersion"),
				Pn(this, "querySet"),
				Pn(this, "queryIdToToken"),
				Pn(this, "identityVersion"),
				Pn(this, "auth"),
				Pn(this, "outstandingQueriesOlderThanRestart"),
				Pn(this, "outstandingAuthOlderThanRestart"),
				Pn(this, "paused"),
				Pn(this, "pendingQuerySetModifications"),
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
			const l = Dr(e),
				o = zr(l, n),
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
					w = { type: "Add", queryId: h, udfPath: l, args: [$n(n)], journal: r, componentPath: u };
				return (
					this.paused ? this.pendingQuerySetModifications.set(h, w) : (this.querySetVersion = y),
					{
						queryToken: o,
						modification: { type: "ModifyQuerySet", baseVersion: v, newVersion: y, modifications: [w] },
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
			const r = zr(Dr(e), n),
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
					args: [$n(u.args)],
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
	Q1 = Object.defineProperty,
	P1 = (e, n, r) => (n in e ? Q1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Il = (e, n, r) => P1(e, typeof n != "symbol" ? n + "" : n, r),
	Y1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				Il(this, "inflightRequests"),
				Il(this, "requestsOlderThanRestart"),
				Il(this, "inflightMutationsCount", 0),
				Il(this, "inflightActionsCount", 0),
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
			for (const h of e.logLines) Fl(this.logger, "info", r, u, h);
			const l = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Ua(e.result) }), (f = () => l.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Fl(this.logger, "error", r, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Ua(m) : void 0, logLines: e.logLines }),
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
	Sb = Symbol.for("toReferencePath");
function F1(e) {
	return e[Sb] ?? null;
}
function K1(e) {
	return e.startsWith("function://");
}
function G1(e) {
	let n;
	if (typeof e == "string") K1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[Gu]) n = { name: e[Gu] };
	else {
		const r = F1(e);
		if (!r) throw new Error(`${e} is not a functionReference`);
		n = { reference: r };
	}
	return n;
}
function Pt(e) {
	const n = G1(e);
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
function qd(e) {
	return { [Gu]: e };
}
function wb(e = []) {
	return new Proxy(
		{},
		{
			get(n, r) {
				if (typeof r == "string") return wb([...e, r]);
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
var _b = wb(),
	X1 = Object.defineProperty,
	J1 = (e, n, r) => (n in e ? X1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Kl = (e, n, r) => J1(e, typeof n != "symbol" ? n + "" : n, r),
	Ay = class bd {
		constructor(n) {
			(Kl(this, "queryResults"), Kl(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...r) {
			const u = wi(r[0]),
				l = Pt(n),
				o = this.queryResults.get(zr(l, u));
			if (o !== void 0) return bd.queryValue(o.result);
		}
		getAllQueries(n) {
			const r = [],
				u = Pt(n);
			for (const l of this.queryResults.values())
				l.udfPath === Dr(u) && r.push({ args: l.args, value: bd.queryValue(l.result) });
			return r;
		}
		setQuery(n, r, u) {
			const l = wi(r),
				o = Pt(n),
				f = zr(o, l);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: l, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	W1 = class {
		constructor() {
			(Kl(this, "queryResults"),
				Kl(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const r = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Ay(this.queryResults);
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
			const r = new Ay(this.queryResults);
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
				throw r.errorData !== void 0 ? yd(r, new gd(Ma("query", n.udfPath, r))) : new Error(Ma("query", n.udfPath, r));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	ex = Object.defineProperty,
	tx = (e, n, r) => (n in e ? ex(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Xf = (e, n, r) => tx(e, typeof n != "symbol" ? n + "" : n, r),
	is = class pi {
		constructor(n, r) {
			(Xf(this, "low"),
				Xf(this, "high"),
				Xf(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = r | 0),
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
			return isNaN(n) || n < 0 ? Ry : n >= nx ? ix : new pi((n % Zu) | 0, (n / Zu) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(Zu) + BigInt(this.low)).toString();
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
	Ry = new is(0, 0),
	Oy = 65536,
	Zu = Oy * Oy,
	nx = Zu * Zu,
	ix = new is(-1, -1),
	rx = Object.defineProperty,
	ax = (e, n, r) => (n in e ? rx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Ul = (e, n, r) => ax(e, typeof n != "symbol" ? n + "" : n, r),
	Ny = class {
		constructor(e, n) {
			(Ul(this, "version"),
				Ul(this, "remoteQuerySet"),
				Ul(this, "queryPath"),
				Ul(this, "logger"),
				(this.version = { querySet: 0, ts: is.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of r.logLines) Fl(this.logger, "info", "query", u, o);
						const l = Ua(r.value ?? null);
						this.remoteQuerySet.set(r.queryId, { success: !0, value: l, logLines: r.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(r.queryId);
						if (u) for (const o of r.logLines) Fl(this.logger, "info", "query", u, o);
						const { errorData: l } = r;
						this.remoteQuerySet.set(r.queryId, {
							success: !1,
							errorMessage: r.errorMessage,
							errorData: l !== void 0 ? Ua(l) : void 0,
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
function Jf(e) {
	const n = Yu(e);
	return is.fromBytesLE(Array.from(n));
}
function ux(e) {
	const n = new Uint8Array(e.toBytesLE());
	return Fu(n);
}
function My(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: Jf(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: Jf(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: Jf(e.endVersion.ts) },
			};
		default:
	}
}
function sx(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: ux(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var lx = Object.defineProperty,
	ox = (e, n, r) => (n in e ? lx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Tt = (e, n, r) => ox(e, typeof n != "symbol" ? n + "" : n, r),
	cx = 1e3,
	fx = 1001,
	dx = 1005,
	hx = 4040,
	Ql;
function Na() {
	return (
		Ql === void 0 && (Ql = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Ql + performance.now())
	);
}
function zy() {
	return `t=${Math.round((Na() - Ql) / 100) / 10}s`;
}
var xb = {
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
function mx(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(xb)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var vx = class {
	constructor(e, n, r, u, l, o) {
		((this.markConnectionStateDirty = l),
			(this.debug = o),
			Tt(this, "socket"),
			Tt(this, "connectionCount"),
			Tt(this, "_hasEverConnected", !1),
			Tt(this, "lastCloseReason"),
			Tt(this, "transitionChunkBuffer", null),
			Tt(this, "defaultInitialBackoff"),
			Tt(this, "maxBackoff"),
			Tt(this, "retries"),
			Tt(this, "serverInactivityThreshold"),
			Tt(this, "reconnectDueToServerInactivityTimeout"),
			Tt(this, "scheduledReconnect", null),
			Tt(this, "networkOnlineHandler", null),
			Tt(this, "pendingNetworkRecoveryInfo", null),
			Tt(this, "uri"),
			Tt(this, "onOpen"),
			Tt(this, "onResume"),
			Tt(this, "onMessage"),
			Tt(this, "webSocketConstructor"),
			Tt(this, "logger"),
			Tt(this, "onServerDisconnectError"),
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
			const r = My(JSON.parse(n));
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
							clientTs: Na(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", zy(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", zy())),
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
				let u = My(JSON.parse(n.data));
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
					n.code !== cx && n.code !== fx && n.code !== dx && n.code !== hx)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const r = mx(n.reason);
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
			const r = sx(e),
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
		const r = Na(),
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
			const n = Na() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Na(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : xb[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const r = Math.min(n, this.maxBackoff);
		return r + r * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const r = Na() - e.clientClockSkew - e.serverTs / 1e6,
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
function gx() {
	return yx();
}
function yx() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var Vu = class extends Error {};
Vu.prototype.name = "InvalidTokenError";
function bx(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, r) => {
			let u = r.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function px(e) {
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
		return bx(n);
	} catch {
		return atob(n);
	}
}
function Eb(e, n) {
	if (typeof e != "string") throw new Vu("Invalid token specified: must be a string");
	n || (n = {});
	const r = n.header === !0 ? 0 : 1,
		u = e.split(".")[r];
	if (typeof u != "string") throw new Vu(`Invalid token specified: missing part #${r + 1}`);
	let l;
	try {
		l = px(u);
	} catch (o) {
		throw new Vu(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
	}
	try {
		return JSON.parse(l);
	} catch (o) {
		throw new Vu(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
	}
}
var Sx = Object.defineProperty,
	wx = (e, n, r) => (n in e ? Sx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	an = (e, n, r) => wx(e, typeof n != "symbol" ? n + "" : n, r),
	_x = 480 * 60 * 60 * 1e3,
	ky = 2,
	xx = class {
		constructor(e, n, r) {
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= ky))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${ky - this.tokenConfirmationAttempts} attempts remaining`)),
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
			let h = Math.min(_x, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return Eb(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	Ex = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function Cx(e, n) {
	const r = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: r });
}
function Tx(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function Ax(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const r of Ex) {
		const u = performance
			.getEntriesByName(r)
			.filter((l) => l.entryType === "mark")
			.filter((l) => l.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(Tx);
}
var Rx = Object.defineProperty,
	Ox = (e, n, r) => (n in e ? Rx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	At = (e, n, r) => Ox(e, typeof n != "symbol" ? n + "" : n, r),
	Nx = class {
		constructor(e, n, r) {
			if (
				(At(this, "address"),
				At(this, "state"),
				At(this, "requestManager"),
				At(this, "webSocketManager"),
				At(this, "authenticationManager"),
				At(this, "remoteQuerySet"),
				At(this, "optimisticQueryResults"),
				At(this, "_transitionHandlerCounter", 0),
				At(this, "_nextRequestId"),
				At(this, "_onTransitionFns", new Map()),
				At(this, "_sessionId"),
				At(this, "firstMessageReceived", !1),
				At(this, "debug"),
				At(this, "logger"),
				At(this, "maxObservedTimestamp"),
				At(this, "connectionStateSubscribers", new Map()),
				At(this, "nextConnectionStateSubscriberId", 0),
				At(this, "_lastPublishedConnectionState"),
				At(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const b = this.connectionState();
						if (JSON.stringify(b) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = b;
							for (const S of this.connectionStateSubscribers.values()) S(b);
						}
					});
				}),
				At(this, "mark", (b) => {
					this.debug && Cx(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(r?.skipConvexDeploymentUrlCheck !== !0 && o1(e), (r = { ...r }));
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
						? pb({ verbose: r.verbose ?? !1 })
						: r.logger !== !0 && r.logger
							? r.logger
							: bb({ verbose: r.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${Ey}/sync`;
			((this.state = new Z1()),
				(this.remoteQuerySet = new Ny((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new Y1(this.logger, this.markConnectionStateDirty)));
			const y = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new xx(
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
				(this.optimisticQueryResults = new W1()),
				this.addOnTransitionHandler((b) => {
					n(b.queries.map((S) => S.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = gx()));
			const { unsavedChangesWarning: w } = r;
			if (typeof window > "u" || typeof window.addEventListener > "u") {
				if (w === !0)
					throw new Error(
						"unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.",
					);
			} else
				w !== !1 &&
					window.addEventListener("beforeunload", (b) => {
						if (this.requestManager.hasIncompleteRequests()) {
							b.preventDefault();
							const S = "Are you sure you want to leave? Your changes may not be saved.";
							return (((b || window.event).returnValue = S), S);
						}
					});
			((this.webSocketManager = new vx(
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
							(this.remoteQuerySet = new Ny((C) => this.state.queryPath(C), this.logger)));
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
								const S = B1(this.logger, b.error);
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
					n = e ? Eb(e.value) : {};
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
			const u = wi(n),
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
			const r = zr(e, wi(n));
			return this.optimisticQueryResults.queryResult(r);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const r = zr(e, wi(n));
			return this.optimisticQueryResults.queryLogs(r);
		}
		queryJournal(e, n) {
			const r = zr(e, wi(n));
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
				throw u.errorData !== void 0 ? yd(u, new gd(Ma("mutation", e, u))) : new Error(Ma("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, r, u) {
			const { mutationPromise: l } = this.enqueueMutation(e, n, r, u);
			return l;
		}
		enqueueMutation(e, n, r, u) {
			const l = wi(n);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, r !== void 0)) {
				const m = r.optimisticUpdate;
				if (m !== void 0) {
					const v = (w) => {
							m(w, l) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						y = this.optimisticQueryResults.applyOptimisticUpdate(v, o).map((w) => {
							const b = this.localQueryResultByToken(w);
							return {
								token: w,
								modification: {
									kind: "Updated",
									result: b === void 0 ? void 0 : { success: !0, value: b, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: y, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [$n(l)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const r = await this.actionInternal(e, n);
			if (!r.success) throw r.errorData !== void 0 ? yd(r, new gd(Ma("action", e, r))) : new Error(Ma("action", e, r));
			return r.value;
		}
		async actionInternal(e, n, r) {
			const u = wi(n),
				l = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: l, udfPath: e, componentPath: r, args: [$n(u)] },
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
				const e = Ax(this.sessionId);
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
				.then((r) => {
					r.ok || this.logger.warn("Analytics request failed with response:", r.body);
				})
				.catch((r) => {
					this.logger.warn("Analytics response failed with error:", r);
				});
		}
	};
function Wf(e) {
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
var Mx = Object.defineProperty,
	zx = (e, n, r) => (n in e ? Mx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Dy = (e, n, r) => zx(e, typeof n != "symbol" ? n + "" : n, r),
	kx = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				Dy(this, "paginatedQuerySet", new Map()),
				Dy(this, "lastTransitionTs"),
				(this.lastTransitionTs = is.fromNumber(0)),
				this.client.addOnTransitionHandler((r) => this.onBaseTransition(r)));
		}
		subscribe(e, n, r) {
			const u = Dr(e),
				l = Ty(u, n, r),
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
			const u = Ty(Dr(e), n, r);
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
				const v = Wf(m);
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
			const l = Wf(u);
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
					const y = Wf(v);
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
	_ = J0(uo(), 1);
function Cb({ getCurrentValue: e, subscribe: n }) {
	const [r, u] = (0, _.useState)(() => ({ getCurrentValue: e, subscribe: n, value: e() }));
	let l = r.value;
	return (
		(r.getCurrentValue !== e || r.subscribe !== n) && ((l = e()), u({ getCurrentValue: e, subscribe: n, value: l })),
		(0, _.useEffect)(() => {
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
var Dx = Object.defineProperty,
	jx = (e, n, r) => (n in e ? Dx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	bi = (e, n, r) => jx(e, typeof n != "symbol" ? n + "" : n, r),
	qx = 5e3;
if (typeof _.default > "u") throw new Error("Required dependency 'react' not found");
function Tb(e, n, r) {
	function u(l) {
		return ($x(l), n.mutation(e, l, { optimisticUpdate: r }));
	}
	return (
		(u.withOptimisticUpdate = function (o) {
			if (r !== void 0) throw new Error(`Already specified optimistic update for mutation ${Pt(e)}`);
			return Tb(e, n, o);
		}),
		u
	);
}
function Ix(e, n) {
	return function (r) {
		return n.action(e, r);
	};
}
var Ab = class {
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
						? pb({ verbose: n?.verbose ?? !1 })
						: n?.logger !== !0 && n?.logger
							? n.logger
							: bb({ verbose: n?.verbose ?? !1 })),
				(this.options = { ...n, logger: this._logger }));
		}
		get url() {
			return this.address;
		}
		get sync() {
			if (this.closed) throw new Error("ConvexReactClient has already been closed.");
			return this.cachedSync
				? this.cachedSync
				: ((this.cachedSync = this.options.baseClient ?? new Nx(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new kx(this.cachedSync, (e) => this.handleTransition(e))),
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
				l = Pt(e);
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
			const n = e.extendSubscriptionFor ?? qx,
				r = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(r, n);
		}
		watchPaginatedQuery(e, n, r) {
			const u = Pt(e);
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
				l = Pt(e);
			return this.sync.mutation(l, r, u);
		}
		action(e, ...n) {
			const r = Pt(e);
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
	rs = _.createContext(void 0);
function Ba() {
	return (0, _.useContext)(rs);
}
var Ux = ({ client: e, children: n }) => _.createElement(rs.Provider, { value: e }, n);
function Xu(e, ...n) {
	const r = n[0] === "skip",
		u = n[0] === "skip" ? {} : wi(n[0]),
		l = typeof e == "string" ? qd(e) : e,
		o = Pt(l),
		f = Id((0, _.useMemo)(() => (r ? {} : { query: { query: l, args: u } }), [JSON.stringify($n(u)), o, r])).query;
	if (f instanceof Error) throw f;
	return f;
}
function kr(e) {
	const n = typeof e == "string" ? qd(e) : e,
		r = (0, _.useContext)(rs);
	if (r === void 0)
		throw new Error(
			"Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, _.useMemo)(() => Tb(n, r), [r, Pt(n)]);
}
function Rb(e) {
	const n = (0, _.useContext)(rs),
		r = typeof e == "string" ? qd(e) : e;
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, _.useMemo)(() => Ix(r, n), [n, Pt(r)]);
}
function Lx() {
	const e = (0, _.useContext)(rs);
	if (e === void 0)
		throw new Error(
			"Could not find Convex client! `useConvexConnectionState` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return Cb({
		getCurrentValue: (0, _.useCallback)(() => e.connectionState(), [e]),
		subscribe: (0, _.useCallback)(
			(n) =>
				e.subscribeToConnectionState(() => {
					n();
				}),
			[e],
		),
	});
}
function $x(e) {
	if (typeof e == "object" && e !== null && "bubbles" in e && "persist" in e && "isDefaultPrevented" in e)
		throw new Error(
			"Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like `const handler = () => myMutation();` and using `handler` in the event handler.",
		);
}
var Bx = Object.defineProperty,
	Vx = (e, n, r) => (n in e ? Bx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	ed = (e, n, r) => Vx(e, typeof n != "symbol" ? n + "" : n, r),
	Hx = class {
		constructor(e) {
			(ed(this, "createWatch"),
				ed(this, "queries"),
				ed(this, "listeners"),
				(this.createWatch = e),
				(this.queries = {}),
				(this.listeners = new Set()));
		}
		setQueries(e) {
			for (const n of Object.keys(e)) {
				const { query: r, args: u, paginationOptions: l } = e[n];
				if ((Pt(r), this.queries[n] === void 0)) this.addQuery(n, r, u, l ? { paginationOptions: l } : {});
				else {
					const o = this.queries[n];
					(Pt(r) !== Pt(o.query) ||
						JSON.stringify($n(u)) !== JSON.stringify($n(o.args)) ||
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
				Pt(u);
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
function Id(e) {
	const n = Ba();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return Zx(
		e,
		(0, _.useMemo)(
			() =>
				(r, u, { journal: l, paginationOptions: o }) =>
					o ? n.watchPaginatedQuery(r, u, o) : n.watchQuery(r, u, l ? { journal: l } : {}),
			[n],
		),
	);
}
function Zx(e, n) {
	const [r] = (0, _.useState)(() => new Hx(n));
	return (
		r.createWatch !== n && r.setCreateWatch(n),
		(0, _.useEffect)(() => () => r.destroy(), [r]),
		Cb(
			(0, _.useMemo)(
				() => ({ getCurrentValue: () => r.getLocalResults(e), subscribe: (u) => (r.setQueries(e), r.subscribe(u)) }),
				[r, e],
			),
		)
	);
}
function Ob(e, n) {
	return new Proxy(
		{},
		{
			get(r, u) {
				if (typeof u == "string") return Ob(e, [...n, u]);
				if (u === Sb) {
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
var Qx = () => Ob("components", []),
	Px = _b,
	jy = 6e4,
	Yx = 500,
	Fx = 1e4,
	Kx = 1e3,
	Gx = 3e4,
	Xx = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function qy(e) {
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
function Iy(e) {
	const n = document.documentElement;
	for (const [r, u] of Object.entries(e.tokens)) n.style.setProperty(r, u);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function Jx(e) {
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
function Wx() {
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
	if (!Xx.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: l, nonce: o };
}
async function eE() {
	const { parentOrigin: e, nonce: n } = Wx();
	let r = "",
		u = "",
		l = 0,
		o = "",
		f = 0,
		h = null;
	const m = new Set(),
		v = new Map();
	let y = null;
	async function w() {
		return Date.now() >= l - jy ? b() : u;
	}
	function b() {
		if (y) return y;
		const N = crypto.randomUUID();
		return (
			(y = new Promise((R, $) => {
				const I = setTimeout(() => {
					(v.delete(N), $(new Error("Plugin frame token refresh timed out")));
				}, Fx);
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
	const S = () => o !== "" && Date.now() < f - jy,
		E = (N) => {
			typeof N.jwt == "string" && typeof N.jwtExpiresAt == "number" && Number.isFinite(N.jwtExpiresAt)
				? ((o = N.jwt), (f = N.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function C(N, R, $) {
		const I = JSON.stringify(R),
			j = (ie) => {
				const G = new Headers($?.headers);
				return (
					G.set("Authorization", `Bearer ${ie}`),
					G.set("Content-Type", "application/json"),
					G.set("Accept", "application/json"),
					fetch(r + N, { ...$, method: "POST", body: I, headers: G, redirect: "error" })
				);
			},
			z = await w();
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
		return (R.set("Authorization", `Bearer ${await w()}`), R);
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
				((I = await D(await w())), I.status === 401 && (I = await D(await b())));
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
						Jx(L.context)
					) {
						((R = !0),
							j(),
							window.removeEventListener("pagehide", j),
							(r = L.apiOrigin),
							(u = L.token),
							(l = L.tokenExpiresAt),
							E(L));
						const Q = new Ab(L.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let ie = Date.now();
						const G = setInterval(() => {
							const F = Date.now();
							(F - ie >= Gx && Q.setAuth(A), (ie = F));
						}, Kx);
						(Q.setAuth(A),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(G), Q.close());
								},
								{ once: !0 },
							),
							(h = qy(L.theme)),
							h && Iy(h),
							N({
								context: L.context,
								apiOrigin: r,
								getToken: w,
								refreshToken: b,
								fetchJson: C,
								authorize: T,
								convex: Q,
								api: Px,
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
						const Q = qy(L.theme);
						if (Q) {
							((h = Q), Iy(Q));
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
			($ = setInterval(I, Yx)));
	});
}
var tE = kn((e) => {
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
				e: for (var ue = 0, fe = k.length, qe = fe >>> 1; ue < qe; ) {
					var O = 2 * (ue + 1) - 1,
						X = k[O],
						re = O + 1,
						le = k[re];
					if (0 > l(X, B))
						re < fe && 0 > l(le, X) ? ((k[ue] = le), (k[re] = B), (ue = re)) : ((k[ue] = X), (k[O] = B), (ue = O));
					else if (re < fe && 0 > l(le, B)) ((k[ue] = le), (k[re] = B), (ue = re));
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
			w = null,
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
								for (R(k), w = r(m); w !== null && !(w.expirationTime > k && L()); ) {
									var ue = w.callback;
									if (typeof ue == "function") {
										((w.callback = null), (b = w.priorityLevel));
										var fe = ue(w.expirationTime <= k);
										if (((k = e.unstable_now()), typeof fe == "function")) {
											((w.callback = fe), R(k), (H = !0));
											break t;
										}
										(w === r(m) && u(m), R(k));
									} else u(m);
									w = r(m);
								}
								if (w !== null) H = !0;
								else {
									var qe = r(v);
									(qe !== null && ne($, qe.startTime - k), (H = !1));
								}
							}
							break e;
						} finally {
							((w = null), (b = B), (S = !1));
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
			var G = new MessageChannel(),
				F = G.port2;
			((G.port1.onmessage = Q),
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
	nE = kn((e, n) => {
		n.exports = tE();
	}),
	iE = kn((e) => {
		var n = uo();
		function r(v) {
			var y = "https://react.dev/errors/" + v;
			if (1 < arguments.length) {
				y += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var w = 2; w < arguments.length; w++) y += "&args[]=" + encodeURIComponent(arguments[w]);
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
		function f(v, y, w) {
			var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: b == null ? null : "" + b, children: v, containerInfo: y, implementation: w };
		}
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, y) {
			if (v === "font") return "";
			if (typeof y == "string") return y === "use-credentials" ? y : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
			(e.createPortal = function (v, y) {
				var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(r(299));
				return f(v, y, null, w);
			}),
			(e.flushSync = function (v) {
				var y = h.T,
					w = l.p;
				try {
					if (((h.T = null), (l.p = 2), v)) return v();
				} finally {
					((h.T = y), (l.p = w), l.d.f());
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
					var w = y.as,
						b = m(w, y.crossOrigin),
						S = typeof y.integrity == "string" ? y.integrity : void 0,
						E = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
					w === "style"
						? l.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
								crossOrigin: b,
								integrity: S,
								fetchPriority: E,
							})
						: w === "script" &&
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
							var w = m(y.as, y.crossOrigin);
							l.d.M(v, {
								crossOrigin: w,
								integrity: typeof y.integrity == "string" ? y.integrity : void 0,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							});
						}
					} else y ?? l.d.M(v);
			}),
			(e.preload = function (v, y) {
				if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
					var w = y.as,
						b = m(w, y.crossOrigin);
					l.d.L(v, w, {
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
						var w = m(y.as, y.crossOrigin);
						l.d.m(v, {
							as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
							crossOrigin: w,
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
			(e.useFormState = function (v, y, w) {
				return h.H.useFormState(v, y, w);
			}),
			(e.useFormStatus = function () {
				return h.H.useHostTransitionStatus();
			}),
			(e.version = "19.2.8"));
	}),
	Nb = kn((e, n) => {
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
	rE = kn((e) => {
		var n = nE(),
			r = uo(),
			u = Nb();
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
		function w(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t;
			for (t = t.child; t !== null; ) {
				if (((i = w(t)), i !== null)) return i;
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
		function G(t) {
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
			qe = -1;
		function O(t) {
			return { current: t };
		}
		function X(t) {
			0 > qe || ((t.current = fe[qe]), (fe[qe] = null), qe--);
		}
		function re(t, i) {
			(qe++, (fe[qe] = t.current), (t.current = i));
		}
		var le = O(null),
			me = O(null),
			ge = O(null),
			be = O(null);
		function Ve(t, i) {
			switch ((re(ge, i), re(me, t), re(le, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? Zg(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = Zg(i)), (t = Qg(i, t)));
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
		function Me() {
			(X(le), X(me), X(ge));
		}
		function ot(t) {
			t.memoizedState !== null && re(be, t);
			var i = le.current,
				a = Qg(i, t.type);
			i !== a && (re(me, t), re(le, a));
		}
		function wt(t) {
			(me.current === t && (X(le), X(me)), be.current === t && (X(be), (Iu._currentValue = ue)));
		}
		var Sn, cn;
		function kt(t) {
			if (Sn === void 0)
				try {
					throw Error();
				} catch (a) {
					var i = a.stack.trim().match(/\n( *(at )?)/);
					((Sn = (i && i[1]) || ""),
						(cn =
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
				Sn +
				t +
				cn
			);
		}
		var de = !1;
		function we(t, i) {
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
		function ut(t, i) {
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
					return we(t.type, !1);
				case 11:
					return we(t.type.render, !1);
				case 1:
					return we(t.type, !0);
				case 31:
					return kt("Activity");
				default:
					return "";
			}
		}
		function Ie(t) {
			try {
				var i = "",
					a = null;
				do ((i += ut(t, a)), (a = t), (t = t.return));
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
			ct = n.unstable_scheduleCallback,
			ae = n.unstable_cancelCallback,
			Ae = n.unstable_shouldYield,
			mt = n.unstable_requestPaint,
			Re = n.unstable_now,
			ft = n.unstable_getCurrentPriorityLevel,
			Gt = n.unstable_ImmediatePriority,
			st = n.unstable_UserBlockingPriority,
			se = n.unstable_NormalPriority,
			xe = n.unstable_LowPriority,
			vt = n.unstable_IdlePriority,
			jn = n.log,
			Fa = n.unstable_setDisableYieldValue,
			Ka = null,
			fn = null;
		function Ni(t) {
			if ((typeof jn == "function" && Fa(t), fn && typeof fn.setStrictMode == "function"))
				try {
					fn.setStrictMode(Ka, t);
				} catch {}
		}
		var dn = Math.clz32 ? Math.clz32 : HS,
			BS = Math.log,
			VS = Math.LN2;
		function HS(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((BS(t) / VS) | 0)) | 0);
		}
		var ws = 256,
			_s = 262144,
			xs = 4194304;
		function cr(t) {
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
		function Es(t, i, a) {
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
						s !== 0 ? (c = cr(s)) : ((g &= x), g !== 0 ? (c = cr(g)) : a || ((a = x & ~t), a !== 0 && (c = cr(a)))))
					: ((x = s & ~d), x !== 0 ? (c = cr(x)) : g !== 0 ? (c = cr(g)) : a || ((a = s & ~t), a !== 0 && (c = cr(a)))),
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
		function ZS(t, i) {
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
		function Th() {
			var t = xs;
			return ((xs <<= 1), (xs & 62914560) === 0 && (xs = 4194304), t);
		}
		function jo(t) {
			for (var i = [], a = 0; 31 > a; a++) i.push(t);
			return i;
		}
		function Cs(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function QS(t, i, a, s, c, d) {
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
				var J = 31 - dn(a),
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
			(s !== 0 && Ah(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(g & ~i)));
		}
		function Ah(t, i, a) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var s = 31 - dn(i);
			((t.entangledLanes |= i), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930)));
		}
		function Rh(t, i) {
			var a = (t.entangledLanes |= i);
			for (t = t.entanglements; a; ) {
				var s = 31 - dn(a),
					c = 1 << s;
				((c & i) | (t[s] & i) && (t[s] |= i), (a &= ~c));
			}
		}
		function Oh(t, i) {
			var a = i & -i;
			return ((a = (a & 42) !== 0 ? 1 : Nh(a)), (a & (t.suspendedLanes | i)) !== 0 ? 0 : a);
		}
		function Nh(t) {
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
		function qo(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Mh() {
			var t = B.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : dy(t.type));
		}
		function zh(t, i) {
			var a = B.p;
			try {
				return ((B.p = t), i());
			} finally {
				B.p = a;
			}
		}
		var Mi = Math.random().toString(36).slice(2),
			It = "__reactFiber$" + Mi,
			Xt = "__reactProps$" + Mi,
			Xa = "__reactContainer$" + Mi,
			Io = "__reactEvents$" + Mi,
			PS = "__reactListeners$" + Mi,
			YS = "__reactHandles$" + Mi,
			kh = "__reactResources$" + Mi,
			Ja = "__reactMarker$" + Mi;
		function Uo(t) {
			(delete t[It], delete t[Xt], delete t[Io], delete t[PS], delete t[YS]);
		}
		function Zr(t) {
			var i = t[It];
			if (i) return i;
			for (var a = t.parentNode; a; ) {
				if ((i = a[Xa] || a[It])) {
					if (((a = i.alternate), i.child !== null || (a !== null && a.child !== null)))
						for (t = Jg(t); t !== null; ) {
							if ((a = t[It])) return a;
							t = Jg(t);
						}
					return i;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function Qr(t) {
			if ((t = t[It] || t[Xa])) {
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
		function Pr(t) {
			var i = t[kh];
			return (i || (i = t[kh] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function jt(t) {
			t[Ja] = !0;
		}
		var Dh = new Set(),
			jh = {};
		function fr(t, i) {
			(Yr(t, i), Yr(t + "Capture", i));
		}
		function Yr(t, i) {
			for (jh[t] = i, t = 0; t < i.length; t++) Dh.add(i[t]);
		}
		var FS = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			qh = {},
			Ih = {};
		function KS(t) {
			return Dt.call(Ih, t) ? !0 : Dt.call(qh, t) ? !1 : FS.test(t) ? (Ih[t] = !0) : ((qh[t] = !0), !1);
		}
		function Ts(t, i, a) {
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
							var s = i.toLowerCase().slice(0, 5);
							if (s !== "data-" && s !== "aria-") {
								t.removeAttribute(i);
								return;
							}
					}
					t.setAttribute(i, "" + a);
				}
		}
		function As(t, i, a) {
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
		function Wn(t, i, a, s) {
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
		function wn(t) {
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
		function GS(t, i, a) {
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
		function Lo(t) {
			if (!t._valueTracker) {
				var i = Uh(t) ? "checked" : "value";
				t._valueTracker = GS(t, i, "" + t[i]);
			}
		}
		function Lh(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var a = i.getValue(),
				s = "";
			return (t && (s = Uh(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== a ? (i.setValue(t), !0) : !1);
		}
		function Rs(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var XS = /[\n"\\]/g;
		function _n(t) {
			return t.replace(XS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function $o(t, i, a, s, c, d, g, x) {
			((t.name = ""),
				g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean"
					? (t.type = g)
					: t.removeAttribute("type"),
				i != null
					? g === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + wn(i))
						: t.value !== "" + wn(i) && (t.value = "" + wn(i))
					: (g !== "submit" && g !== "reset") || t.removeAttribute("value"),
				i != null ? Bo(t, g, wn(i)) : a != null ? Bo(t, g, wn(a)) : s != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean"
					? (t.name = "" + wn(x))
					: t.removeAttribute("name"));
		}
		function $h(t, i, a, s, c, d, g, x) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					Lo(t);
					return;
				}
				((a = a != null ? "" + wn(a) : ""),
					(i = i != null ? "" + wn(i) : a),
					x || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(t.checked = x ? t.checked : !!s),
				(t.defaultChecked = !!s),
				g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (t.name = g),
				Lo(t));
		}
		function Bo(t, i, a) {
			(i === "number" && Rs(t.ownerDocument) === t) || t.defaultValue === "" + a || (t.defaultValue = "" + a);
		}
		function Fr(t, i, a, s) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < a.length; c++) i["$" + a[c]] = !0;
				for (a = 0; a < t.length; a++)
					((c = i.hasOwnProperty("$" + t[a].value)),
						t[a].selected !== c && (t[a].selected = c),
						c && s && (t[a].defaultSelected = !0));
			} else {
				for (a = "" + wn(a), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === a) {
						((t[c].selected = !0), s && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function Bh(t, i, a) {
			if (i != null && ((i = "" + wn(i)), i !== t.value && (t.value = i), a == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = a != null ? "" + wn(a) : "";
		}
		function Vh(t, i, a, s) {
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
			((a = wn(i)),
				(t.defaultValue = a),
				(s = t.textContent),
				s === a && s !== "" && s !== null && (t.value = s),
				Lo(t));
		}
		function Kr(t, i) {
			if (i) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var JS = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Hh(t, i, a) {
			var s = i.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? s
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: s
					? t.setProperty(i, a)
					: typeof a != "number" || a === 0 || JS.has(i)
						? i === "float"
							? (t.cssFloat = a)
							: (t[i] = ("" + a).trim())
						: (t[i] = a + "px");
		}
		function Zh(t, i, a) {
			if (i != null && typeof i != "object") throw Error(l(62));
			if (((t = t.style), a != null)) {
				for (var s in a)
					!a.hasOwnProperty(s) ||
						(i != null && i.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""));
				for (var c in i) ((s = i[c]), i.hasOwnProperty(c) && a[c] !== s && Hh(t, c, s));
			} else for (var d in i) i.hasOwnProperty(d) && Hh(t, d, i[d]);
		}
		function Vo(t) {
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
		var WS = new Map([
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
			ew =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Os(t) {
			return ew.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function ei() {}
		var Ho = null;
		function Zo(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Gr = null,
			Xr = null;
		function Qh(t) {
			var i = Qr(t);
			if (i && (t = i.stateNode)) {
				var a = t[Xt] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							($o(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(i = a.name),
							a.type === "radio" && i != null)
						) {
							for (a = t; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + _n("" + i) + '"][type="radio"]'), i = 0; i < a.length; i++) {
								var s = a[i];
								if (s !== t && s.form === t.form) {
									var c = s[Xt] || null;
									if (!c) throw Error(l(90));
									$o(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < a.length; i++) ((s = a[i]), s.form === t.form && Lh(s));
						}
						break e;
					case "textarea":
						Bh(t, a.value, a.defaultValue);
						break e;
					case "select":
						((i = a.value), i != null && Fr(t, !!a.multiple, i, !1));
				}
			}
		}
		var Qo = !1;
		function Ph(t, i, a) {
			if (Qo) return t(i, a);
			Qo = !0;
			try {
				return t(i);
			} finally {
				if (((Qo = !1), (Gr !== null || Xr !== null) && (gl(), Gr && ((i = Gr), (t = Xr), (Xr = Gr = null), Qh(i), t))))
					for (i = 0; i < t.length; i++) Qh(t[i]);
			}
		}
		function eu(t, i) {
			var a = t.stateNode;
			if (a === null) return null;
			var s = a[Xt] || null;
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
		var ti = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Po = !1;
		if (ti)
			try {
				var tu = {};
				(Object.defineProperty(tu, "passive", {
					get: function () {
						Po = !0;
					},
				}),
					window.addEventListener("test", tu, tu),
					window.removeEventListener("test", tu, tu));
			} catch {
				Po = !1;
			}
		var zi = null,
			Yo = null,
			Ns = null;
		function Yh() {
			if (Ns) return Ns;
			var t,
				i = Yo,
				a = i.length,
				s,
				c = "value" in zi ? zi.value : zi.textContent,
				d = c.length;
			for (t = 0; t < a && i[t] === c[t]; t++);
			var g = a - t;
			for (s = 1; s <= g && i[a - s] === c[d - s]; s++);
			return (Ns = c.slice(t, 1 < s ? 1 - s : void 0));
		}
		function Ms(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function zs() {
			return !0;
		}
		function Fh() {
			return !1;
		}
		function Jt(t) {
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
						? zs
						: Fh),
					(this.isPropagationStopped = Fh),
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
							(this.isDefaultPrevented = zs));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = zs));
					},
					persist: function () {},
					isPersistent: zs,
				}),
				i
			);
		}
		var dr = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			ks = Jt(dr),
			nu = b({}, dr, { view: 0, detail: 0 }),
			tw = Jt(nu),
			Fo,
			Ko,
			iu,
			Ds = b({}, nu, {
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
				getModifierState: Xo,
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
									? ((Fo = t.screenX - iu.screenX), (Ko = t.screenY - iu.screenY))
									: (Ko = Fo = 0),
								(iu = t)),
							Fo);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : Ko;
				},
			}),
			Kh = Jt(Ds),
			nw = Jt(b({}, Ds, { dataTransfer: 0 })),
			Go = Jt(b({}, nu, { relatedTarget: 0 })),
			iw = Jt(b({}, dr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			rw = Jt(
				b({}, dr, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Gh = Jt(b({}, dr, { data: 0 })),
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
			uw = {
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
			sw = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function lw(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = sw[t]) ? !!i[t] : !1;
		}
		function Xo() {
			return lw;
		}
		var ow = Jt(
				b({}, nu, {
					key: function (t) {
						if (t.key) {
							var i = aw[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Ms(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? uw[t.keyCode] || "Unidentified"
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
					getModifierState: Xo,
					charCode: function (t) {
						return t.type === "keypress" ? Ms(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Ms(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Xh = Jt(
				b({}, Ds, {
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
			cw = Jt(
				b({}, nu, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: Xo,
				}),
			),
			fw = Jt(b({}, dr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			dw = Jt(
				b({}, Ds, {
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
			hw = Jt(b({}, dr, { newState: 0, oldState: 0 })),
			mw = [9, 13, 27, 32],
			Jo = ti && "CompositionEvent" in window,
			ru = null;
		ti && "documentMode" in document && (ru = document.documentMode);
		var vw = ti && "TextEvent" in window && !ru,
			Jh = ti && (!Jo || (ru && 8 < ru && 11 >= ru)),
			Wh = " ",
			em = !1;
		function tm(t, i) {
			switch (t) {
				case "keyup":
					return mw.indexOf(i.keyCode) !== -1;
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
		function nm(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var Jr = !1;
		function gw(t, i) {
			switch (t) {
				case "compositionend":
					return nm(i);
				case "keypress":
					return i.which !== 32 ? null : ((em = !0), Wh);
				case "textInput":
					return ((t = i.data), t === Wh && em ? null : t);
				default:
					return null;
			}
		}
		function yw(t, i) {
			if (Jr)
				return t === "compositionend" || (!Jo && tm(t, i)) ? ((t = Yh()), (Ns = Yo = zi = null), (Jr = !1), t) : null;
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
					return Jh && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var bw = {
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
		function im(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!bw[t.type] : i === "textarea";
		}
		function rm(t, i, a, s) {
			(Gr ? (Xr ? Xr.push(s) : (Xr = [s])) : (Gr = s),
				(i = xl(i, "onChange")),
				0 < i.length && ((a = new ks("onChange", "change", null, a, s)), t.push({ event: a, listeners: i })));
		}
		var au = null,
			uu = null;
		function pw(t) {
			Ig(t, 0);
		}
		function js(t) {
			if (Lh(Wa(t))) return t;
		}
		function am(t, i) {
			if (t === "change") return i;
		}
		var um = !1;
		if (ti) {
			var Wo;
			if (ti) {
				var ec = "oninput" in document;
				if (!ec) {
					var sm = document.createElement("div");
					(sm.setAttribute("oninput", "return;"), (ec = typeof sm.oninput == "function"));
				}
				Wo = ec;
			} else Wo = !1;
			um = Wo && (!document.documentMode || 9 < document.documentMode);
		}
		function lm() {
			au && (au.detachEvent("onpropertychange", om), (uu = au = null));
		}
		function om(t) {
			if (t.propertyName === "value" && js(uu)) {
				var i = [];
				(rm(i, uu, t, Zo(t)), Ph(pw, i));
			}
		}
		function Sw(t, i, a) {
			t === "focusin" ? (lm(), (au = i), (uu = a), au.attachEvent("onpropertychange", om)) : t === "focusout" && lm();
		}
		function ww(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return js(uu);
		}
		function _w(t, i) {
			if (t === "click") return js(i);
		}
		function xw(t, i) {
			if (t === "input" || t === "change") return js(i);
		}
		function Ew(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var hn = typeof Object.is == "function" ? Object.is : Ew;
		function su(t, i) {
			if (hn(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var a = Object.keys(t),
				s = Object.keys(i);
			if (a.length !== s.length) return !1;
			for (s = 0; s < a.length; s++) {
				var c = a[s];
				if (!Dt.call(i, c) || !hn(t[c], i[c])) return !1;
			}
			return !0;
		}
		function cm(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function fm(t, i) {
			var a = cm(t);
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
				a = cm(a);
			}
		}
		function dm(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? dm(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function hm(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var i = Rs(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var a = typeof i.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = i.contentWindow;
				else break;
				i = Rs(t.document);
			}
			return i;
		}
		function tc(t) {
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
		var Cw = ti && "documentMode" in document && 11 >= document.documentMode,
			Wr = null,
			nc = null,
			lu = null,
			ic = !1;
		function mm(t, i, a) {
			var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			ic ||
				Wr == null ||
				Wr !== Rs(s) ||
				((s = Wr),
				"selectionStart" in s && tc(s)
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
					(s = xl(nc, "onSelect")),
					0 < s.length &&
						((i = new ks("onSelect", "select", null, i, a)), t.push({ event: i, listeners: s }), (i.target = Wr))));
		}
		function hr(t, i) {
			var a = {};
			return ((a[t.toLowerCase()] = i.toLowerCase()), (a["Webkit" + t] = "webkit" + i), (a["Moz" + t] = "moz" + i), a);
		}
		var ea = {
				animationend: hr("Animation", "AnimationEnd"),
				animationiteration: hr("Animation", "AnimationIteration"),
				animationstart: hr("Animation", "AnimationStart"),
				transitionrun: hr("Transition", "TransitionRun"),
				transitionstart: hr("Transition", "TransitionStart"),
				transitioncancel: hr("Transition", "TransitionCancel"),
				transitionend: hr("Transition", "TransitionEnd"),
			},
			rc = {},
			vm = {};
		ti &&
			((vm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete ea.animationend.animation, delete ea.animationiteration.animation, delete ea.animationstart.animation),
			"TransitionEvent" in window || delete ea.transitionend.transition);
		function mr(t) {
			if (rc[t]) return rc[t];
			if (!ea[t]) return t;
			var i = ea[t],
				a;
			for (a in i) if (i.hasOwnProperty(a) && a in vm) return (rc[t] = i[a]);
			return t;
		}
		var gm = mr("animationend"),
			ym = mr("animationiteration"),
			bm = mr("animationstart"),
			Tw = mr("transitionrun"),
			Aw = mr("transitionstart"),
			Rw = mr("transitioncancel"),
			pm = mr("transitionend"),
			Sm = new Map(),
			ac =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		ac.push("scrollEnd");
		function qn(t, i) {
			(Sm.set(t, i), fr(i, [t]));
		}
		var qs =
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
			xn = [],
			ta = 0,
			uc = 0;
		function Is() {
			for (var t = ta, i = (uc = ta = 0); i < t; ) {
				var a = xn[i];
				xn[i++] = null;
				var s = xn[i];
				xn[i++] = null;
				var c = xn[i];
				xn[i++] = null;
				var d = xn[i];
				if (((xn[i++] = null), s !== null && c !== null)) {
					var g = s.pending;
					(g === null ? (c.next = c) : ((c.next = g.next), (g.next = c)), (s.pending = c));
				}
				d !== 0 && wm(a, c, d);
			}
		}
		function Us(t, i, a, s) {
			((xn[ta++] = t),
				(xn[ta++] = i),
				(xn[ta++] = a),
				(xn[ta++] = s),
				(uc |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function sc(t, i, a, s) {
			return (Us(t, i, a, s), Ls(t));
		}
		function vr(t, i) {
			return (Us(t, null, null, i), Ls(t));
		}
		function wm(t, i, a) {
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
						((c = 31 - dn(a)),
						(t = d.hiddenUpdates),
						(s = t[c]),
						s === null ? (t[c] = [i]) : s.push(i),
						(i.lane = a | 536870912)),
					d)
				: null;
		}
		function Ls(t) {
			if (50 < Nu) throw ((Nu = 0), (yf = null), Error(l(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var na = {};
		function Ow(t, i, a, s) {
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
		function mn(t, i, a, s) {
			return new Ow(t, i, a, s);
		}
		function lc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function ni(t, i) {
			var a = t.alternate;
			return (
				a === null
					? ((a = mn(t.tag, i, t.key, t.mode)),
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
		function _m(t, i) {
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
		function $s(t, i, a, s, c, d) {
			var g = 0;
			if (((s = t), typeof t == "function")) lc(t) && (g = 1);
			else if (typeof t == "string")
				g = j_(t, a, le.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case L:
						return ((t = mn(31, a, i, c)), (t.elementType = L), (t.lanes = d), t);
					case T:
						return gr(a.children, c, d, i);
					case D:
						((g = 8), (c |= 24));
						break;
					case A:
						return ((t = mn(12, a, i, c | 2)), (t.elementType = A), (t.lanes = d), t);
					case I:
						return ((t = mn(13, a, i, c)), (t.elementType = I), (t.lanes = d), t);
					case j:
						return ((t = mn(19, a, i, c)), (t.elementType = j), (t.lanes = d), t);
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
			return ((i = mn(g, a, i, c)), (i.elementType = t), (i.type = s), (i.lanes = d), i);
		}
		function gr(t, i, a, s) {
			return ((t = mn(7, t, s, i)), (t.lanes = a), t);
		}
		function oc(t, i, a) {
			return ((t = mn(6, t, null, i)), (t.lanes = a), t);
		}
		function xm(t) {
			var i = mn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function cc(t, i, a) {
			return (
				(i = mn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = a),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var Em = new WeakMap();
		function En(t, i) {
			if (typeof t == "object" && t !== null) {
				var a = Em.get(t);
				return a !== void 0 ? a : ((i = { value: t, source: i, stack: Ie(i) }), Em.set(t, i), i);
			}
			return { value: t, source: i, stack: Ie(i) };
		}
		var ia = [],
			ra = 0,
			Bs = null,
			ou = 0,
			Cn = [],
			Tn = 0,
			ki = null,
			Hn = 1,
			Zn = "";
		function ii(t, i) {
			((ia[ra++] = ou), (ia[ra++] = Bs), (Bs = t), (ou = i));
		}
		function Cm(t, i, a) {
			((Cn[Tn++] = Hn), (Cn[Tn++] = Zn), (Cn[Tn++] = ki), (ki = t));
			var s = Hn;
			t = Zn;
			var c = 32 - dn(s) - 1;
			((s &= ~(1 << c)), (a += 1));
			var d = 32 - dn(i) + c;
			if (30 < d) {
				var g = c - (c % 5);
				((d = (s & ((1 << g) - 1)).toString(32)),
					(s >>= g),
					(c -= g),
					(Hn = (1 << (32 - dn(i) + c)) | (a << c) | s),
					(Zn = d + t));
			} else ((Hn = (1 << d) | (a << c) | s), (Zn = t));
		}
		function fc(t) {
			t.return !== null && (ii(t, 1), Cm(t, 1, 0));
		}
		function dc(t) {
			for (; t === Bs; ) ((Bs = ia[--ra]), (ia[ra] = null), (ou = ia[--ra]), (ia[ra] = null));
			for (; t === ki; )
				((ki = Cn[--Tn]), (Cn[Tn] = null), (Zn = Cn[--Tn]), (Cn[Tn] = null), (Hn = Cn[--Tn]), (Cn[Tn] = null));
		}
		function Tm(t, i) {
			((Cn[Tn++] = Hn), (Cn[Tn++] = Zn), (Cn[Tn++] = ki), (Hn = i.id), (Zn = i.overflow), (ki = t));
		}
		var Ut = null,
			Je = null,
			je = !1,
			Di = null,
			An = !1,
			hc = Error(l(519));
		function ji(t) {
			throw (
				cu(En(Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				hc
			);
		}
		function Am(t) {
			var i = t.stateNode,
				a = t.type,
				s = t.memoizedProps;
			switch (((i[It] = t), (i[Xt] = s), a)) {
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
					for (a = 0; a < zu.length; a++) Ne(zu[a], i);
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
					(Ne("invalid", i), $h(i, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					Ne("invalid", i);
					break;
				case "textarea":
					(Ne("invalid", i), Vh(i, s.value, s.defaultValue, s.children));
			}
			((a = s.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				i.textContent === "" + a ||
				s.suppressHydrationWarning === !0 ||
				Vg(i.textContent, a)
					? (s.popover != null && (Ne("beforetoggle", i), Ne("toggle", i)),
						s.onScroll != null && Ne("scroll", i),
						s.onScrollEnd != null && Ne("scrollend", i),
						s.onClick != null && (i.onclick = ei),
						(i = !0))
					: (i = !1),
				i || ji(t, !0));
		}
		function Rm(t) {
			for (Ut = t.return; Ut; )
				switch (Ut.tag) {
					case 5:
					case 31:
					case 13:
						An = !1;
						return;
					case 27:
					case 3:
						An = !0;
						return;
					default:
						Ut = Ut.return;
				}
		}
		function aa(t) {
			if (t !== Ut) return !1;
			if (!je) return (Rm(t), (je = !0), !1);
			var i = t.tag,
				a;
			if (
				((a = i !== 3 && i !== 27) &&
					((a = i === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || Mf(t.type, t.memoizedProps))),
					(a = !a)),
				a && Je && ji(t),
				Rm(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				Je = Xg(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				Je = Xg(t);
			} else
				i === 27
					? ((i = Je), Yi(t.type) ? ((t = qf), (qf = null), (Je = t)) : (Je = i))
					: (Je = Ut ? Nn(t.stateNode.nextSibling) : null);
			return !0;
		}
		function yr() {
			((Je = Ut = null), (je = !1));
		}
		function mc() {
			var t = Di;
			return (t !== null && (nn === null ? (nn = t) : nn.push.apply(nn, t), (Di = null)), t);
		}
		function cu(t) {
			Di === null ? (Di = [t]) : Di.push(t);
		}
		var vc = O(null),
			br = null,
			ri = null;
		function qi(t, i, a) {
			(re(vc, i._currentValue), (i._currentValue = a));
		}
		function ai(t) {
			((t._currentValue = vc.current), X(vc));
		}
		function gc(t, i, a) {
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
		function yc(t, i, a, s) {
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
								((d.lanes |= a), (x = d.alternate), x !== null && (x.lanes |= a), gc(d.return, a, t), s || (g = null));
								break e;
							}
						d = x.next;
					}
				} else if (c.tag === 18) {
					if (((g = c.return), g === null)) throw Error(l(341));
					((g.lanes |= a), (d = g.alternate), d !== null && (d.lanes |= a), gc(g, a, t), (g = null));
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
		function ua(t, i, a, s) {
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
						hn(c.pendingProps.value, g.value) || (t !== null ? t.push(x) : (t = [x]));
					}
				} else if (c === be.current) {
					if (((g = c.alternate), g === null)) throw Error(l(387));
					g.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(Iu) : (t = [Iu]));
				}
				c = c.return;
			}
			(t !== null && yc(i, t, a, s), (i.flags |= 262144));
		}
		function Vs(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!hn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function pr(t) {
			((br = t), (ri = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function Lt(t) {
			return Om(br, t);
		}
		function Hs(t, i) {
			return (br === null && pr(t), Om(t, i));
		}
		function Om(t, i) {
			var a = i._currentValue;
			if (((i = { context: i, memoizedValue: a, next: null }), ri === null)) {
				if (t === null) throw Error(l(308));
				((ri = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else ri = ri.next = i;
			return a;
		}
		var Nw =
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
			Mw = n.unstable_scheduleCallback,
			zw = n.unstable_NormalPriority,
			_t = { $$typeof: R, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function bc() {
			return { controller: new Nw(), data: new Map(), refCount: 0 };
		}
		function fu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					Mw(zw, function () {
						t.controller.abort();
					}));
		}
		var du = null,
			pc = 0,
			sa = 0,
			la = null;
		function kw(t, i) {
			if (du === null) {
				var a = (du = []);
				((pc = 0),
					(sa = xf()),
					(la = {
						status: "pending",
						value: void 0,
						then: function (s) {
							a.push(s);
						},
					}));
			}
			return (pc++, i.then(Nm, Nm), i);
		}
		function Nm() {
			if (--pc === 0 && du !== null) {
				la !== null && (la.status = "fulfilled");
				var t = du;
				((du = null), (sa = 0), (la = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function Dw(t, i) {
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
		var Mm = H.S;
		H.S = function (t, i) {
			((fg = Re()),
				typeof i == "object" && i !== null && typeof i.then == "function" && kw(t, i),
				Mm !== null && Mm(t, i));
		};
		var Sr = O(null);
		function Sc() {
			var t = Sr.current;
			return t !== null ? t : Xe.pooledCache;
		}
		function Zs(t, i) {
			i === null ? re(Sr, Sr.current) : re(Sr, i.pool);
		}
		function zm() {
			var t = Sc();
			return t === null ? null : { parent: _t._currentValue, pool: t };
		}
		var oa = Error(l(460)),
			wc = Error(l(474)),
			Qs = Error(l(542)),
			Ps = { then: function () {} };
		function km(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function Dm(t, i, a) {
			switch (((a = t[a]), a === void 0 ? t.push(i) : a !== i && (i.then(ei, ei), (i = a)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), qm(t), t);
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
							throw ((t = i.reason), qm(t), t);
					}
					throw ((_r = i), oa);
			}
		}
		function wr(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((_r = a), oa) : a;
			}
		}
		var _r = null;
		function jm() {
			if (_r === null) throw Error(l(459));
			var t = _r;
			return ((_r = null), t);
		}
		function qm(t) {
			if (t === oa || t === Qs) throw Error(l(483));
		}
		var ca = null,
			hu = 0;
		function Ys(t) {
			var i = hu;
			return ((hu += 1), ca === null && (ca = []), Dm(ca, t, i));
		}
		function mu(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function Fs(t, i) {
			throw i.$$typeof === S
				? Error(l(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(l(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function Im(t) {
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
				return ((V = ni(V, q)), (V.index = 0), (V.sibling = null), V);
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
					? ((q = oc(Z, V.mode, W)), (q.return = V), q)
					: ((q = c(q, Z)), (q.return = V), q);
			}
			function M(V, q, Z, W) {
				var ve = Z.type;
				return ve === T
					? J(V, q, Z.props.children, W, Z.key)
					: q !== null &&
						  (q.elementType === ve || (typeof ve == "object" && ve !== null && ve.$$typeof === U && wr(ve) === q.type))
						? ((q = c(q, Z.props)), mu(q, Z), (q.return = V), q)
						: ((q = $s(Z.type, Z.key, Z.props, null, V.mode, W)), mu(q, Z), (q.return = V), q);
			}
			function P(V, q, Z, W) {
				return q === null ||
					q.tag !== 4 ||
					q.stateNode.containerInfo !== Z.containerInfo ||
					q.stateNode.implementation !== Z.implementation
					? ((q = cc(Z, V.mode, W)), (q.return = V), q)
					: ((q = c(q, Z.children || [])), (q.return = V), q);
			}
			function J(V, q, Z, W, ve) {
				return q === null || q.tag !== 7
					? ((q = gr(Z, V.mode, W, ve)), (q.return = V), q)
					: ((q = c(q, Z)), (q.return = V), q);
			}
			function ee(V, q, Z) {
				if ((typeof q == "string" && q !== "") || typeof q == "number" || typeof q == "bigint")
					return ((q = oc("" + q, V.mode, Z)), (q.return = V), q);
				if (typeof q == "object" && q !== null) {
					switch (q.$$typeof) {
						case E:
							return ((Z = $s(q.type, q.key, q.props, null, V.mode, Z)), mu(Z, q), (Z.return = V), Z);
						case C:
							return ((q = cc(q, V.mode, Z)), (q.return = V), q);
						case U:
							return ((q = wr(q)), ee(V, q, Z));
					}
					if (k(q) || G(q)) return ((q = gr(q, V.mode, Z, null)), (q.return = V), q);
					if (typeof q.then == "function") return ee(V, Ys(q), Z);
					if (q.$$typeof === R) return ee(V, Hs(V, q), Z);
					Fs(V, q);
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
							return ((Z = wr(Z)), Y(V, q, Z, W));
					}
					if (k(Z) || G(Z)) return ve !== null ? null : J(V, q, Z, W, null);
					if (typeof Z.then == "function") return Y(V, q, Ys(Z), W);
					if (Z.$$typeof === R) return Y(V, q, Hs(V, Z), W);
					Fs(V, Z);
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
							return ((W = wr(W)), K(V, q, Z, W, ve));
					}
					if (k(W) || G(W)) return ((V = V.get(Z) || null), J(q, V, W, ve, null));
					if (typeof W.then == "function") return K(V, q, Z, Ys(W), ve);
					if (W.$$typeof === R) return K(V, q, Z, Hs(q, W), ve);
					Fs(q, W);
				}
				return null;
			}
			function ce(V, q, Z, W) {
				for (var ve = null, $e = null, he = q, Te = (q = 0), ke = null; he !== null && Te < Z.length; Te++) {
					he.index > Te ? ((ke = he), (he = null)) : (ke = he.sibling);
					var Be = Y(V, he, Z[Te], W);
					if (Be === null) {
						he === null && (he = ke);
						break;
					}
					(t && he && Be.alternate === null && i(V, he),
						(q = d(Be, q, Te)),
						$e === null ? (ve = Be) : ($e.sibling = Be),
						($e = Be),
						(he = ke));
				}
				if (Te === Z.length) return (a(V, he), je && ii(V, Te), ve);
				if (he === null) {
					for (; Te < Z.length; Te++)
						((he = ee(V, Z[Te], W)),
							he !== null && ((q = d(he, q, Te)), $e === null ? (ve = he) : ($e.sibling = he), ($e = he)));
					return (je && ii(V, Te), ve);
				}
				for (he = s(he); Te < Z.length; Te++)
					((ke = K(he, V, Te, Z[Te], W)),
						ke !== null &&
							(t && ke.alternate !== null && he.delete(ke.key === null ? Te : ke.key),
							(q = d(ke, q, Te)),
							$e === null ? (ve = ke) : ($e.sibling = ke),
							($e = ke)));
				return (
					t &&
						he.forEach(function (Ji) {
							return i(V, Ji);
						}),
					je && ii(V, Te),
					ve
				);
			}
			function pe(V, q, Z, W) {
				if (Z == null) throw Error(l(151));
				for (
					var ve = null, $e = null, he = q, Te = (q = 0), ke = null, Be = Z.next();
					he !== null && !Be.done;
					Te++, Be = Z.next()
				) {
					he.index > Te ? ((ke = he), (he = null)) : (ke = he.sibling);
					var Ji = Y(V, he, Be.value, W);
					if (Ji === null) {
						he === null && (he = ke);
						break;
					}
					(t && he && Ji.alternate === null && i(V, he),
						(q = d(Ji, q, Te)),
						$e === null ? (ve = Ji) : ($e.sibling = Ji),
						($e = Ji),
						(he = ke));
				}
				if (Be.done) return (a(V, he), je && ii(V, Te), ve);
				if (he === null) {
					for (; !Be.done; Te++, Be = Z.next())
						((Be = ee(V, Be.value, W)),
							Be !== null && ((q = d(Be, q, Te)), $e === null ? (ve = Be) : ($e.sibling = Be), ($e = Be)));
					return (je && ii(V, Te), ve);
				}
				for (he = s(he); !Be.done; Te++, Be = Z.next())
					((Be = K(he, V, Te, Be.value, W)),
						Be !== null &&
							(t && Be.alternate !== null && he.delete(Be.key === null ? Te : Be.key),
							(q = d(Be, q, Te)),
							$e === null ? (ve = Be) : ($e.sibling = Be),
							($e = Be)));
				return (
					t &&
						he.forEach(function (K_) {
							return i(V, K_);
						}),
					je && ii(V, Te),
					ve
				);
			}
			function Ke(V, q, Z, W) {
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
											(typeof ve == "object" && ve !== null && ve.$$typeof === U && wr(ve) === q.type)
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
									? ((W = gr(Z.props.children, V.mode, W, Z.key)), (W.return = V), (V = W))
									: ((W = $s(Z.type, Z.key, Z.props, null, V.mode, W)), mu(W, Z), (W.return = V), (V = W));
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
								((W = cc(Z, V.mode, W)), (W.return = V), (V = W));
							}
							return g(V);
						case U:
							return ((Z = wr(Z)), Ke(V, q, Z, W));
					}
					if (k(Z)) return ce(V, q, Z, W);
					if (G(Z)) {
						if (((ve = G(Z)), typeof ve != "function")) throw Error(l(150));
						return ((Z = ve.call(Z)), pe(V, q, Z, W));
					}
					if (typeof Z.then == "function") return Ke(V, q, Ys(Z), W);
					if (Z.$$typeof === R) return Ke(V, q, Hs(V, Z), W);
					Fs(V, Z);
				}
				return (typeof Z == "string" && Z !== "") || typeof Z == "number" || typeof Z == "bigint"
					? ((Z = "" + Z),
						q !== null && q.tag === 6
							? (a(V, q.sibling), (W = c(q, Z)), (W.return = V), (V = W))
							: (a(V, q), (W = oc(Z, V.mode, W)), (W.return = V), (V = W)),
						g(V))
					: a(V, q);
			}
			return function (V, q, Z, W) {
				try {
					hu = 0;
					var ve = Ke(V, q, Z, W);
					return ((ca = null), ve);
				} catch (he) {
					if (he === oa || he === Qs) throw he;
					var $e = mn(29, he, null, V.mode);
					return (($e.lanes = W), ($e.return = V), $e);
				}
			};
		}
		var xr = Im(!0),
			Um = Im(!1),
			Ii = !1;
		function _c(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function xc(t, i) {
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
		function Er(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function Cr(t, i, a) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (He & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(s.pending = i),
					(i = Ls(t)),
					wm(t, null, a),
					i
				);
			}
			return (Us(t, s, i, a), Ls(t));
		}
		function vu(t, i, a) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (a & 4194048) !== 0))) {
				var s = i.lanes;
				((s &= t.pendingLanes), (a |= s), (i.lanes = a), Rh(t, a));
			}
		}
		function Ec(t, i) {
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
		var Cc = !1;
		function gu() {
			if (Cc) {
				var t = la;
				if (t !== null) throw t;
			}
		}
		function yu(t, i, a, s) {
			Cc = !1;
			var c = t.updateQueue;
			Ii = !1;
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
						(Y !== 0 && Y === sa && (Cc = !0),
							J !== null && (J = J.next = { lane: 0, tag: x.tag, payload: x.payload, callback: null, next: null }));
						e: {
							var ce = t,
								pe = x;
							Y = i;
							var Ke = a;
							switch (pe.tag) {
								case 1:
									if (((ce = pe.payload), typeof ce == "function")) {
										ee = ce.call(Ke, ee, Y);
										break e;
									}
									ee = ce;
									break e;
								case 3:
									ce.flags = (ce.flags & -65537) | 128;
								case 0:
									if (((ce = pe.payload), (Y = typeof ce == "function" ? ce.call(Ke, ee, Y) : ce), Y == null)) break e;
									ee = b({}, ee, Y);
									break e;
								case 2:
									Ii = !0;
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
					(Vi |= g),
					(t.lanes = g),
					(t.memoizedState = ee));
			}
		}
		function Lm(t, i) {
			if (typeof t != "function") throw Error(l(191, t));
			t.call(i);
		}
		function $m(t, i) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) Lm(a[t], i);
		}
		var fa = O(null),
			Ks = O(0);
		function Bm(t, i) {
			((t = mi), re(Ks, t), re(fa, i), (mi = t | i.baseLanes));
		}
		function Tc() {
			(re(Ks, mi), re(fa, fa.current));
		}
		function Ac() {
			((mi = Ks.current), X(fa), X(Ks));
		}
		var vn = O(null),
			Rn = null;
		function Ui(t) {
			var i = t.alternate;
			(re(gt, gt.current & 1),
				re(vn, t),
				Rn === null && (i === null || fa.current !== null || i.memoizedState !== null) && (Rn = t));
		}
		function Rc(t) {
			(re(gt, gt.current), re(vn, t), Rn === null && (Rn = t));
		}
		function Vm(t) {
			t.tag === 22 ? (re(gt, gt.current), re(vn, t), Rn === null && (Rn = t)) : Li(t);
		}
		function Li() {
			(re(gt, gt.current), re(vn, vn.current));
		}
		function gn(t) {
			(X(vn), Rn === t && (Rn = null), X(gt));
		}
		var gt = O(0);
		function Gs(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var a = i.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Df(a) || jf(a))) return i;
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
			Ce = null,
			Ye = null,
			xt = null,
			Xs = !1,
			da = !1,
			Tr = !1,
			Js = 0,
			bu = 0,
			ha = null,
			jw = 0;
		function dt() {
			throw Error(l(321));
		}
		function Oc(t, i) {
			if (i === null) return !1;
			for (var a = 0; a < i.length && a < t.length; a++) if (!hn(t[a], i[a])) return !1;
			return !0;
		}
		function Nc(t, i, a, s, c, d) {
			return (
				(ui = d),
				(Ce = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				(H.H = t === null || t.memoizedState === null ? Cv : Qc),
				(Tr = !1),
				(d = a(s, c)),
				(Tr = !1),
				da && (d = Zm(i, a, s, c)),
				Hm(t),
				d
			);
		}
		function Hm(t) {
			H.H = wu;
			var i = Ye !== null && Ye.next !== null;
			if (((ui = 0), (xt = Ye = Ce = null), (Xs = !1), (bu = 0), (ha = null), i)) throw Error(l(300));
			t === null || Et || ((t = t.dependencies), t !== null && Vs(t) && (Et = !0));
		}
		function Zm(t, i, a, s) {
			Ce = t;
			var c = 0;
			do {
				if ((da && (ha = null), (bu = 0), (da = !1), 25 <= c)) throw Error(l(301));
				if (((c += 1), (xt = Ye = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((H.H = Tv), (d = i(a, s)));
			} while (da);
			return d;
		}
		function qw() {
			var t = H.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? pu(i) : i),
				(t = t.useState()[0]),
				(Ye !== null ? Ye.memoizedState : null) !== t && (Ce.flags |= 1024),
				i
			);
		}
		function Mc() {
			var t = Js !== 0;
			return ((Js = 0), t);
		}
		function zc(t, i, a) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~a));
		}
		function kc(t) {
			if (Xs) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				Xs = !1;
			}
			((ui = 0), (xt = Ye = Ce = null), (da = !1), (bu = Js = 0), (ha = null));
		}
		function Yt() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (xt === null ? (Ce.memoizedState = xt = t) : (xt = xt.next = t), xt);
		}
		function yt() {
			if (Ye === null) {
				var t = Ce.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Ye.next;
			var i = xt === null ? Ce.memoizedState : xt.next;
			if (i !== null) ((xt = i), (Ye = t));
			else {
				if (t === null) throw Ce.alternate === null ? Error(l(467)) : Error(l(310));
				((Ye = t),
					(t = {
						memoizedState: Ye.memoizedState,
						baseState: Ye.baseState,
						baseQueue: Ye.baseQueue,
						queue: Ye.queue,
						next: null,
					}),
					xt === null ? (Ce.memoizedState = xt = t) : (xt = xt.next = t));
			}
			return xt;
		}
		function Ws() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function pu(t) {
			var i = bu;
			return (
				(bu += 1),
				ha === null && (ha = []),
				(t = Dm(ha, t, i)),
				(i = Ce),
				(xt === null ? i.memoizedState : xt.next) === null &&
					((i = i.alternate), (H.H = i === null || i.memoizedState === null ? Cv : Qc)),
				t
			);
		}
		function el(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return pu(t);
				if (t.$$typeof === R) return Lt(t);
			}
			throw Error(l(438, String(t)));
		}
		function Dc(t) {
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
				a === null && ((a = Ws()), (Ce.updateQueue = a)),
				(a.memoCache = i),
				(a = i.data[i.index]),
				a === void 0)
			)
				for (a = i.data[i.index] = Array(t), s = 0; s < t; s++) a[s] = Q;
			return (i.index++, a);
		}
		function si(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function tl(t) {
			return jc(yt(), Ye, t);
		}
		function jc(t, i, a) {
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
					if (ee !== P.lane ? (ze & ee) === ee : (ui & ee) === ee) {
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
								ee === sa && (J = !0));
						else if ((ui & Y) === Y) {
							((P = P.next), Y === sa && (J = !0));
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
								(Vi |= Y));
						((ee = P.action), Tr && a(d, ee), (d = P.hasEagerState ? P.eagerState : a(d, ee)));
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
							(Vi |= ee));
					P = P.next;
				} while (P !== null && P !== i);
				if ((M === null ? (g = d) : (M.next = x), !hn(d, t.memoizedState) && ((Et = !0), J && ((a = la), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = g), (t.baseQueue = M), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
		}
		function qc(t) {
			var i = yt(),
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
				(hn(d, i.memoizedState) || (Et = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, s];
		}
		function Qm(t, i, a) {
			var s = Ce,
				c = yt(),
				d = je;
			if (d) {
				if (a === void 0) throw Error(l(407));
				a = a();
			} else a = i();
			var g = !hn((Ye || c).memoizedState, a);
			if (
				(g && ((c.memoizedState = a), (Et = !0)),
				(c = c.queue),
				Lc(Fm.bind(null, s, c, t), [t]),
				c.getSnapshot !== i || g || (xt !== null && xt.memoizedState.tag & 1))
			) {
				if (((s.flags |= 2048), ma(9, { destroy: void 0 }, Ym.bind(null, s, c, a, i), null), Xe === null))
					throw Error(l(349));
				d || (ui & 127) !== 0 || Pm(s, i, a);
			}
			return a;
		}
		function Pm(t, i, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: a }),
				(i = Ce.updateQueue),
				i === null
					? ((i = Ws()), (Ce.updateQueue = i), (i.stores = [t]))
					: ((a = i.stores), a === null ? (i.stores = [t]) : a.push(t)));
		}
		function Ym(t, i, a, s) {
			((i.value = a), (i.getSnapshot = s), Km(i) && Gm(t));
		}
		function Fm(t, i, a) {
			return a(function () {
				Km(i) && Gm(t);
			});
		}
		function Km(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var a = i();
				return !hn(t, a);
			} catch {
				return !0;
			}
		}
		function Gm(t) {
			var i = vr(t, 2);
			i !== null && rn(i, t, 2);
		}
		function Ic(t) {
			var i = Yt();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), Tr)) {
					Ni(!0);
					try {
						a();
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
		function Xm(t, i, a, s) {
			return ((t.baseState = a), jc(t, Ye, typeof s == "function" ? s : si));
		}
		function Iw(t, i, a, s, c) {
			if (rl(t)) throw Error(l(485));
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
					a === null ? ((d.next = i.pending = d), Jm(i, d)) : ((d.next = a.next), (i.pending = a.next = d)));
			}
		}
		function Jm(t, i) {
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
					(M !== null && M(g, x), Wm(t, i, x));
				} catch (P) {
					Uc(t, i, P);
				} finally {
					(d !== null && g.types !== null && (d.types = g.types), (H.T = d));
				}
			} else
				try {
					((d = a(c, s)), Wm(t, i, d));
				} catch (P) {
					Uc(t, i, P);
				}
		}
		function Wm(t, i, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (s) {
							ev(t, i, s);
						},
						function (s) {
							return Uc(t, i, s);
						},
					)
				: ev(t, i, a);
		}
		function ev(t, i, a) {
			((i.status = "fulfilled"),
				(i.value = a),
				tv(i),
				(t.state = a),
				(i = t.pending),
				i !== null && ((a = i.next), a === i ? (t.pending = null) : ((a = a.next), (i.next = a), Jm(t, a))));
		}
		function Uc(t, i, a) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((i.status = "rejected"), (i.reason = a), tv(i), (i = i.next));
				while (i !== s);
			}
			t.action = null;
		}
		function tv(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function nv(t, i) {
			return i;
		}
		function iv(t, i) {
			if (je) {
				var a = Xe.formState;
				if (a !== null) {
					e: {
						var s = Ce;
						if (je) {
							if (Je) {
								t: {
									for (var c = Je, d = An; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = Nn(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((Je = Nn(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							ji(s);
						}
						s = !1;
					}
					s && (i = a[0]);
				}
			}
			return (
				(a = Yt()),
				(a.memoizedState = a.baseState = i),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: nv, lastRenderedState: i }),
				(a.queue = s),
				(a = _v.bind(null, Ce, s)),
				(s.dispatch = a),
				(s = Ic(!1)),
				(d = Zc.bind(null, Ce, !1, s.queue)),
				(s = Yt()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(a = Iw.bind(null, Ce, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = t),
				[i, a, !1]
			);
		}
		function rv(t) {
			return av(yt(), Ye, t);
		}
		function av(t, i, a) {
			if (((i = jc(t, i, nv)[0]), (t = tl(si)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var s = pu(i);
				} catch (g) {
					throw g === oa ? Qs : g;
				}
			else s = i;
			i = yt();
			var c = i.queue,
				d = c.dispatch;
			return (
				a !== i.memoizedState && ((Ce.flags |= 2048), ma(9, { destroy: void 0 }, Uw.bind(null, c, a), null)),
				[s, d, t]
			);
		}
		function Uw(t, i) {
			t.action = i;
		}
		function uv(t) {
			var i = yt(),
				a = Ye;
			if (a !== null) return av(i, a, t);
			(yt(), (i = i.memoizedState), (a = yt()));
			var s = a.queue.dispatch;
			return ((a.memoizedState = t), [i, s, !1]);
		}
		function ma(t, i, a, s) {
			return (
				(t = { tag: t, create: a, deps: s, inst: i, next: null }),
				(i = Ce.updateQueue),
				i === null && ((i = Ws()), (Ce.updateQueue = i)),
				(a = i.lastEffect),
				a === null ? (i.lastEffect = t.next = t) : ((s = a.next), (a.next = t), (t.next = s), (i.lastEffect = t)),
				t
			);
		}
		function sv() {
			return yt().memoizedState;
		}
		function nl(t, i, a, s) {
			var c = Yt();
			((Ce.flags |= t), (c.memoizedState = ma(1 | i, { destroy: void 0 }, a, s === void 0 ? null : s)));
		}
		function il(t, i, a, s) {
			var c = yt();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			Ye !== null && s !== null && Oc(s, Ye.memoizedState.deps)
				? (c.memoizedState = ma(i, d, a, s))
				: ((Ce.flags |= t), (c.memoizedState = ma(1 | i, d, a, s)));
		}
		function lv(t, i) {
			nl(8390656, 8, t, i);
		}
		function Lc(t, i) {
			il(2048, 8, t, i);
		}
		function Lw(t) {
			Ce.flags |= 4;
			var i = Ce.updateQueue;
			if (i === null) ((i = Ws()), (Ce.updateQueue = i), (i.events = [t]));
			else {
				var a = i.events;
				a === null ? (i.events = [t]) : a.push(t);
			}
		}
		function ov(t) {
			var i = yt().memoizedState;
			return (
				Lw({ ref: i, nextImpl: t }),
				function () {
					if ((He & 2) !== 0) throw Error(l(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function cv(t, i) {
			return il(4, 2, t, i);
		}
		function fv(t, i) {
			return il(4, 4, t, i);
		}
		function dv(t, i) {
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
		function hv(t, i, a) {
			((a = a != null ? a.concat([t]) : null), il(4, 4, dv.bind(null, i, t), a));
		}
		function $c() {}
		function mv(t, i) {
			var a = yt();
			i = i === void 0 ? null : i;
			var s = a.memoizedState;
			return i !== null && Oc(i, s[1]) ? s[0] : ((a.memoizedState = [t, i]), t);
		}
		function vv(t, i) {
			var a = yt();
			i = i === void 0 ? null : i;
			var s = a.memoizedState;
			if (i !== null && Oc(i, s[1])) return s[0];
			if (((s = t()), Tr)) {
				Ni(!0);
				try {
					t();
				} finally {
					Ni(!1);
				}
			}
			return ((a.memoizedState = [s, i]), s);
		}
		function Bc(t, i, a) {
			return a === void 0 || ((ui & 1073741824) !== 0 && (ze & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = a), (t = hg()), (Ce.lanes |= t), (Vi |= t), a);
		}
		function gv(t, i, a, s) {
			return hn(a, i)
				? a
				: fa.current !== null
					? ((t = Bc(t, a, s)), hn(t, i) || (Et = !0), t)
					: (ui & 42) === 0 || ((ui & 1073741824) !== 0 && (ze & 261930) === 0)
						? ((Et = !0), (t.memoizedState = a))
						: ((t = hg()), (Ce.lanes |= t), (Vi |= t), i);
		}
		function yv(t, i, a, s, c) {
			var d = B.p;
			B.p = d !== 0 && 8 > d ? d : 8;
			var g = H.T,
				x = {};
			((H.T = x), Zc(t, !1, i, a));
			try {
				var M = c(),
					P = H.S;
				(P !== null && P(x, M),
					M !== null && typeof M == "object" && typeof M.then == "function"
						? Su(t, i, Dw(M, s), On(t))
						: Su(t, i, s, On(t)));
			} catch (J) {
				Su(t, i, { then: function () {}, status: "rejected", reason: J }, On());
			} finally {
				((B.p = d), g !== null && x.types !== null && (g.types = x.types), (H.T = g));
			}
		}
		function $w() {}
		function Vc(t, i, a, s) {
			if (t.tag !== 5) throw Error(l(476));
			var c = bv(t).queue;
			yv(
				t,
				c,
				i,
				ue,
				a === null
					? $w
					: function () {
							return (pv(t), a(s));
						},
			);
		}
		function bv(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: ue,
				baseState: ue,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: si, lastRenderedState: ue },
				next: null,
			};
			var a = {};
			return (
				(i.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: si, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function pv(t) {
			var i = bv(t);
			(i.next === null && (i = t.alternate.memoizedState), Su(t, i.next.queue, {}, On()));
		}
		function Hc() {
			return Lt(Iu);
		}
		function Sv() {
			return yt().memoizedState;
		}
		function wv() {
			return yt().memoizedState;
		}
		function Bw(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var a = On();
						t = Er(a);
						var s = Cr(i, t, a);
						(s !== null && (rn(s, i, a), vu(s, i, a)), (i = { cache: bc() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function Vw(t, i, a) {
			var s = On();
			((a = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				rl(t) ? xv(i, a) : ((a = sc(t, i, a, s)), a !== null && (rn(a, t, s), Ev(a, i, s))));
		}
		function _v(t, i, a) {
			Su(t, i, a, On());
		}
		function Su(t, i, a, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (rl(t)) xv(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var g = i.lastRenderedState,
							x = d(g, a);
						if (((c.hasEagerState = !0), (c.eagerState = x), hn(x, g)))
							return (Us(t, i, c, 0), Xe === null && Is(), !1);
					} catch {}
				if (((a = sc(t, i, c, s)), a !== null)) return (rn(a, t, s), Ev(a, i, s), !0);
			}
			return !1;
		}
		function Zc(t, i, a, s) {
			if (
				((s = { lane: 2, revertLane: xf(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				rl(t))
			) {
				if (i) throw Error(l(479));
			} else ((i = sc(t, a, s, 2)), i !== null && rn(i, t, 2));
		}
		function rl(t) {
			var i = t.alternate;
			return t === Ce || (i !== null && i === Ce);
		}
		function xv(t, i) {
			da = Xs = !0;
			var a = t.pending;
			(a === null ? (i.next = i) : ((i.next = a.next), (a.next = i)), (t.pending = i));
		}
		function Ev(t, i, a) {
			if ((a & 4194048) !== 0) {
				var s = i.lanes;
				((s &= t.pendingLanes), (a |= s), (i.lanes = a), Rh(t, a));
			}
		}
		var wu = {
			readContext: Lt,
			use: el,
			useCallback: dt,
			useContext: dt,
			useEffect: dt,
			useImperativeHandle: dt,
			useLayoutEffect: dt,
			useInsertionEffect: dt,
			useMemo: dt,
			useReducer: dt,
			useRef: dt,
			useState: dt,
			useDebugValue: dt,
			useDeferredValue: dt,
			useTransition: dt,
			useSyncExternalStore: dt,
			useId: dt,
			useHostTransitionStatus: dt,
			useFormState: dt,
			useActionState: dt,
			useOptimistic: dt,
			useMemoCache: dt,
			useCacheRefresh: dt,
		};
		wu.useEffectEvent = dt;
		var Cv = {
				readContext: Lt,
				use: el,
				useCallback: function (t, i) {
					return ((Yt().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: Lt,
				useEffect: lv,
				useImperativeHandle: function (t, i, a) {
					((a = a != null ? a.concat([t]) : null), nl(4194308, 4, dv.bind(null, i, t), a));
				},
				useLayoutEffect: function (t, i) {
					return nl(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					nl(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var a = Yt();
					i = i === void 0 ? null : i;
					var s = t();
					if (Tr) {
						Ni(!0);
						try {
							t();
						} finally {
							Ni(!1);
						}
					}
					return ((a.memoizedState = [s, i]), s);
				},
				useReducer: function (t, i, a) {
					var s = Yt();
					if (a !== void 0) {
						var c = a(i);
						if (Tr) {
							Ni(!0);
							try {
								a(i);
							} finally {
								Ni(!1);
							}
						}
					} else c = i;
					return (
						(s.memoizedState = s.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(s.queue = t),
						(t = t.dispatch = Vw.bind(null, Ce, t)),
						[s.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = Yt();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = Ic(t);
					var i = t.queue,
						a = _v.bind(null, Ce, i);
					return ((i.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: $c,
				useDeferredValue: function (t, i) {
					return Bc(Yt(), t, i);
				},
				useTransition: function () {
					var t = Ic(!1);
					return ((t = yv.bind(null, Ce, t.queue, !0, !1)), (Yt().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, a) {
					var s = Ce,
						c = Yt();
					if (je) {
						if (a === void 0) throw Error(l(407));
						a = a();
					} else {
						if (((a = i()), Xe === null)) throw Error(l(349));
						(ze & 127) !== 0 || Pm(s, i, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: i };
					return (
						(c.queue = d),
						lv(Fm.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						ma(9, { destroy: void 0 }, Ym.bind(null, s, d, a, i), null),
						a
					);
				},
				useId: function () {
					var t = Yt(),
						i = Xe.identifierPrefix;
					if (je) {
						var a = Zn,
							s = Hn;
						((a = (s & ~(1 << (32 - dn(s) - 1))).toString(32) + a),
							(i = "_" + i + "R_" + a),
							(a = Js++),
							0 < a && (i += "H" + a.toString(32)),
							(i += "_"));
					} else ((a = jw++), (i = "_" + i + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: Hc,
				useFormState: iv,
				useActionState: iv,
				useOptimistic: function (t) {
					var i = Yt();
					i.memoizedState = i.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = a), (i = Zc.bind(null, Ce, !0, a)), (a.dispatch = i), [t, i]);
				},
				useMemoCache: Dc,
				useCacheRefresh: function () {
					return (Yt().memoizedState = Bw.bind(null, Ce));
				},
				useEffectEvent: function (t) {
					var i = Yt(),
						a = { impl: t };
					return (
						(i.memoizedState = a),
						function () {
							if ((He & 2) !== 0) throw Error(l(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Qc = {
				readContext: Lt,
				use: el,
				useCallback: mv,
				useContext: Lt,
				useEffect: Lc,
				useImperativeHandle: hv,
				useInsertionEffect: cv,
				useLayoutEffect: fv,
				useMemo: vv,
				useReducer: tl,
				useRef: sv,
				useState: function () {
					return tl(si);
				},
				useDebugValue: $c,
				useDeferredValue: function (t, i) {
					return gv(yt(), Ye.memoizedState, t, i);
				},
				useTransition: function () {
					var t = tl(si)[0],
						i = yt().memoizedState;
					return [typeof t == "boolean" ? t : pu(t), i];
				},
				useSyncExternalStore: Qm,
				useId: Sv,
				useHostTransitionStatus: Hc,
				useFormState: rv,
				useActionState: rv,
				useOptimistic: function (t, i) {
					return Xm(yt(), Ye, t, i);
				},
				useMemoCache: Dc,
				useCacheRefresh: wv,
			};
		Qc.useEffectEvent = ov;
		var Tv = {
			readContext: Lt,
			use: el,
			useCallback: mv,
			useContext: Lt,
			useEffect: Lc,
			useImperativeHandle: hv,
			useInsertionEffect: cv,
			useLayoutEffect: fv,
			useMemo: vv,
			useReducer: qc,
			useRef: sv,
			useState: function () {
				return qc(si);
			},
			useDebugValue: $c,
			useDeferredValue: function (t, i) {
				var a = yt();
				return Ye === null ? Bc(a, t, i) : gv(a, Ye.memoizedState, t, i);
			},
			useTransition: function () {
				var t = qc(si)[0],
					i = yt().memoizedState;
				return [typeof t == "boolean" ? t : pu(t), i];
			},
			useSyncExternalStore: Qm,
			useId: Sv,
			useHostTransitionStatus: Hc,
			useFormState: uv,
			useActionState: uv,
			useOptimistic: function (t, i) {
				var a = yt();
				return Ye !== null ? Xm(a, Ye, t, i) : ((a.baseState = t), [t, a.queue.dispatch]);
			},
			useMemoCache: Dc,
			useCacheRefresh: wv,
		};
		Tv.useEffectEvent = ov;
		function Pc(t, i, a, s) {
			((i = t.memoizedState),
				(a = a(s, i)),
				(a = a == null ? i : b({}, i, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var Yc = {
			enqueueSetState: function (t, i, a) {
				t = t._reactInternals;
				var s = On(),
					c = Er(s);
				((c.payload = i), a != null && (c.callback = a), (i = Cr(t, c, s)), i !== null && (rn(i, t, s), vu(i, t, s)));
			},
			enqueueReplaceState: function (t, i, a) {
				t = t._reactInternals;
				var s = On(),
					c = Er(s);
				((c.tag = 1),
					(c.payload = i),
					a != null && (c.callback = a),
					(i = Cr(t, c, s)),
					i !== null && (rn(i, t, s), vu(i, t, s)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var a = On(),
					s = Er(a);
				((s.tag = 2), i != null && (s.callback = i), (i = Cr(t, s, a)), i !== null && (rn(i, t, a), vu(i, t, a)));
			},
		};
		function Av(t, i, a, s, c, d, g) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, g)
					: i.prototype && i.prototype.isPureReactComponent
						? !su(a, s) || !su(c, d)
						: !0
			);
		}
		function Rv(t, i, a, s) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, s),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, s),
				i.state !== t && Yc.enqueueReplaceState(i, i.state, null));
		}
		function Ar(t, i) {
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
		function Hw(t) {
			qs(t);
		}
		function Zw(t) {
			console.error(t);
		}
		function Qw(t) {
			qs(t);
		}
		function al(t, i) {
			try {
				var a = t.onUncaughtError;
				a(i.value, { componentStack: i.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function Ov(t, i, a) {
			try {
				var s = t.onCaughtError;
				s(a.value, { componentStack: a.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Fc(t, i, a) {
			return (
				(a = Er(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					al(t, i);
				}),
				a
			);
		}
		function Nv(t) {
			return ((t = Er(t)), (t.tag = 3), t);
		}
		function Mv(t, i, a, s) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						Ov(i, a, s);
					}));
			}
			var g = a.stateNode;
			g !== null &&
				typeof g.componentDidCatch == "function" &&
				(t.callback = function () {
					(Ov(i, a, s), typeof c != "function" && (Hi === null ? (Hi = new Set([this])) : Hi.add(this)));
					var x = s.stack;
					this.componentDidCatch(s.value, { componentStack: x !== null ? x : "" });
				});
		}
		function Pw(t, i, a, s, c) {
			if (((a.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((i = a.alternate), i !== null && ua(i, a, c, !0), (a = vn.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Rn === null ? yl() : a.alternate === null && ht === 0 && (ht = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								s === Ps
									? (a.flags |= 16384)
									: ((i = a.updateQueue), i === null ? (a.updateQueue = new Set([s])) : i.add(s), Sf(t, s, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								s === Ps
									? (a.flags |= 16384)
									: ((i = a.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([s]) }),
												(a.updateQueue = i))
											: ((a = i.retryQueue), a === null ? (i.retryQueue = new Set([s])) : a.add(s)),
										Sf(t, s, c)),
								!1
							);
					}
					throw Error(l(435, a.tag));
				}
				return (Sf(t, s, c), yl(), !1);
			}
			if (je)
				return (
					(i = vn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							s !== hc && ((t = Error(l(422), { cause: s })), cu(En(t, a))))
						: (s !== hc && ((i = Error(l(423), { cause: s })), cu(En(i, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(s = En(s, a)),
							(c = Fc(t.stateNode, s, c)),
							Ec(t, c),
							ht !== 4 && (ht = 2)),
					!1
				);
			var d = Error(l(520), { cause: s });
			if (((d = En(d, a)), Ou === null ? (Ou = [d]) : Ou.push(d), ht !== 4 && (ht = 2), i === null)) return !0;
			((s = En(s, a)), (a = i));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = Fc(a.stateNode, s, t)), Ec(a, t), !1);
					case 1:
						if (
							((i = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Hi === null || !Hi.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Nv(c)), Mv(c, t, a, s), Ec(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Kc = Error(l(461)),
			Et = !1;
		function $t(t, i, a, s) {
			i.child = t === null ? Um(i, null, a, s) : xr(i, t.child, a, s);
		}
		function zv(t, i, a, s, c) {
			a = a.render;
			var d = i.ref;
			if ("ref" in s) {
				var g = {};
				for (var x in s) x !== "ref" && (g[x] = s[x]);
			} else g = s;
			return (
				pr(i),
				(s = Nc(t, i, a, g, d, c)),
				(x = Mc()),
				t !== null && !Et ? (zc(t, i, c), li(t, i, c)) : (je && x && fc(i), (i.flags |= 1), $t(t, i, s, c), i.child)
			);
		}
		function kv(t, i, a, s, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !lc(d) && d.defaultProps === void 0 && a.compare === null
					? ((i.tag = 15), (i.type = d), Dv(t, i, d, s, c))
					: ((t = $s(a.type, null, s, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !rf(t, c))) {
				var g = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : su), a(g, s) && t.ref === i.ref)) return li(t, i, c);
			}
			return ((i.flags |= 1), (t = ni(d, s)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function Dv(t, i, a, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (su(d, s) && t.ref === i.ref)
					if (((Et = !1), (i.pendingProps = s = d), rf(t, c))) (t.flags & 131072) !== 0 && (Et = !0);
					else return ((i.lanes = t.lanes), li(t, i, c));
			}
			return Gc(t, i, a, s, c);
		}
		function jv(t, i, a, s) {
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
					return qv(t, i, d, a, s);
				}
				if ((a & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && Zs(i, d !== null ? d.cachePool : null),
						d !== null ? Bm(i, d) : Tc(),
						Vm(i));
				else return ((s = i.lanes = 536870912), qv(t, i, d !== null ? d.baseLanes | a : a, a, s));
			} else
				d !== null
					? (Zs(i, d.cachePool), Bm(i, d), Li(i), (i.memoizedState = null))
					: (t !== null && Zs(i, null), Tc(), Li(i));
			return ($t(t, i, c, a), i.child);
		}
		function _u(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function qv(t, i, a, s, c) {
			var d = Sc();
			return (
				(d = d === null ? null : { parent: _t._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && Zs(i, null),
				Tc(),
				Vm(i),
				t !== null && ua(t, i, s, !0),
				(i.childLanes = c),
				null
			);
		}
		function ul(t, i) {
			return (
				(i = ll({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function Iv(t, i, a) {
			return (xr(i, t.child, null, a), (t = ul(i, i.pendingProps)), (t.flags |= 2), gn(i), (i.memoizedState = null), t);
		}
		function Yw(t, i, a) {
			var s = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if (je) {
					if (s.mode === "hidden") return ((t = ul(i, s)), (i.lanes = 536870912), _u(null, t));
					if (
						(Rc(i),
						(t = Je)
							? ((t = Gg(t, An)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ki !== null ? { id: Hn, overflow: Zn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = xm(t)),
									(a.return = i),
									(i.child = a),
									(Ut = i),
									(Je = null)))
							: (t = null),
						t === null)
					)
						throw ji(i);
					return ((i.lanes = 536870912), null);
				}
				return ul(i, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var g = d.dehydrated;
				if ((Rc(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = Iv(t, i, a)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(l(558));
				else if ((Et || ua(t, i, a, !1), (c = (a & t.childLanes) !== 0), Et || c)) {
					if (((s = Xe), s !== null && ((g = Oh(s, a)), g !== 0 && g !== d.retryLane)))
						throw ((d.retryLane = g), vr(t, g), rn(s, t, g), Kc);
					(yl(), (i = Iv(t, i, a)));
				} else
					((t = d.treeContext),
						(Je = Nn(g.nextSibling)),
						(Ut = i),
						(je = !0),
						(Di = null),
						(An = !1),
						t !== null && Tm(i, t),
						(i = ul(i, s)),
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
		function sl(t, i) {
			var a = i.ref;
			if (a === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(l(284));
				(t === null || t.ref !== a) && (i.flags |= 4194816);
			}
		}
		function Gc(t, i, a, s, c) {
			return (
				pr(i),
				(a = Nc(t, i, a, s, void 0, c)),
				(s = Mc()),
				t !== null && !Et ? (zc(t, i, c), li(t, i, c)) : (je && s && fc(i), (i.flags |= 1), $t(t, i, a, c), i.child)
			);
		}
		function Uv(t, i, a, s, c, d) {
			return (
				pr(i),
				(i.updateQueue = null),
				(a = Zm(i, s, a, c)),
				Hm(t),
				(s = Mc()),
				t !== null && !Et ? (zc(t, i, d), li(t, i, d)) : (je && s && fc(i), (i.flags |= 1), $t(t, i, a, d), i.child)
			);
		}
		function Lv(t, i, a, s, c) {
			if ((pr(i), i.stateNode === null)) {
				var d = na,
					g = a.contextType;
				(typeof g == "object" && g !== null && (d = Lt(g)),
					(d = new a(s, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Yc),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = s),
					(d.state = i.memoizedState),
					(d.refs = {}),
					_c(i),
					(g = a.contextType),
					(d.context = typeof g == "object" && g !== null ? Lt(g) : na),
					(d.state = i.memoizedState),
					(g = a.getDerivedStateFromProps),
					typeof g == "function" && (Pc(i, a, g, s), (d.state = i.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((g = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						g !== d.state && Yc.enqueueReplaceState(d, d.state, null),
						yu(i, s, d, c),
						gu(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(s = !0));
			} else if (t === null) {
				d = i.stateNode;
				var x = i.memoizedProps,
					M = Ar(a, x);
				d.props = M;
				var P = d.context,
					J = a.contextType;
				((g = na), typeof J == "object" && J !== null && (g = Lt(J)));
				var ee = a.getDerivedStateFromProps;
				((J = typeof ee == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(x = i.pendingProps !== x),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((x || P !== g) && Rv(i, d, s, g)),
					(Ii = !1));
				var Y = i.memoizedState;
				((d.state = Y),
					yu(i, s, d, c),
					gu(),
					(P = i.memoizedState),
					x || Y !== P || Ii
						? (typeof ee == "function" && (Pc(i, a, ee, s), (P = i.memoizedState)),
							(M = Ii || Av(i, a, M, s, Y, P, g))
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
					xc(t, i),
					(g = i.memoizedProps),
					(J = Ar(a, g)),
					(d.props = J),
					(ee = i.pendingProps),
					(Y = d.context),
					(P = a.contextType),
					(M = na),
					typeof P == "object" && P !== null && (M = Lt(P)),
					(x = a.getDerivedStateFromProps),
					(P = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((g !== ee || Y !== M) && Rv(i, d, s, M)),
					(Ii = !1),
					(Y = i.memoizedState),
					(d.state = Y),
					yu(i, s, d, c),
					gu());
				var K = i.memoizedState;
				g !== ee || Y !== K || Ii || (t !== null && t.dependencies !== null && Vs(t.dependencies))
					? (typeof x == "function" && (Pc(i, a, x, s), (K = i.memoizedState)),
						(J = Ii || Av(i, a, J, s, Y, K, M) || (t !== null && t.dependencies !== null && Vs(t.dependencies)))
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
				sl(t, i),
				(s = (i.flags & 128) !== 0),
				d || s
					? ((d = i.stateNode),
						(a = s && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && s ? ((i.child = xr(i, t.child, null, c)), (i.child = xr(i, null, a, c))) : $t(t, i, a, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = li(t, i, c)),
				t
			);
		}
		function $v(t, i, a, s) {
			return (yr(), (i.flags |= 256), $t(t, i, a, s), i.child);
		}
		var Xc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function Jc(t) {
			return { baseLanes: t, cachePool: zm() };
		}
		function Wc(t, i, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), i && (t |= bn), t);
		}
		function Bv(t, i, a) {
			var s = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				g;
			if (
				((g = d) || (g = t !== null && t.memoizedState === null ? !1 : (gt.current & 2) !== 0),
				g && ((c = !0), (i.flags &= -129)),
				(g = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if (je) {
					if (
						(c ? Ui(i) : Li(i),
						(t = Je)
							? ((t = Gg(t, An)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ki !== null ? { id: Hn, overflow: Zn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = xm(t)),
									(a.return = i),
									(i.child = a),
									(Ut = i),
									(Je = null)))
							: (t = null),
						t === null)
					)
						throw ji(i);
					return (jf(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var x = s.children;
				return (
					(s = s.fallback),
					c
						? (Li(i),
							(c = i.mode),
							(x = ll({ mode: "hidden", children: x }, c)),
							(s = gr(s, c, a, null)),
							(x.return = i),
							(s.return = i),
							(x.sibling = s),
							(i.child = x),
							(s = i.child),
							(s.memoizedState = Jc(a)),
							(s.childLanes = Wc(t, g, a)),
							(i.memoizedState = Xc),
							_u(null, s))
						: (Ui(i), ef(i, x))
				);
			}
			var M = t.memoizedState;
			if (M !== null && ((x = M.dehydrated), x !== null)) {
				if (d)
					i.flags & 256
						? (Ui(i), (i.flags &= -257), (i = tf(t, i, a)))
						: i.memoizedState !== null
							? (Li(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (Li(i),
								(x = s.fallback),
								(c = i.mode),
								(s = ll({ mode: "visible", children: s.children }, c)),
								(x = gr(x, c, a, null)),
								(x.flags |= 2),
								(s.return = i),
								(x.return = i),
								(s.sibling = x),
								(i.child = s),
								xr(i, t.child, null, a),
								(s = i.child),
								(s.memoizedState = Jc(a)),
								(s.childLanes = Wc(t, g, a)),
								(i.memoizedState = Xc),
								(i = _u(null, s)));
				else if ((Ui(i), jf(x))) {
					if (((g = x.nextSibling && x.nextSibling.dataset), g)) var P = g.dgst;
					((g = P),
						(s = Error(l(419))),
						(s.stack = ""),
						(s.digest = g),
						cu({ value: s, source: null, stack: null }),
						(i = tf(t, i, a)));
				} else if ((Et || ua(t, i, a, !1), (g = (a & t.childLanes) !== 0), Et || g)) {
					if (((g = Xe), g !== null && ((s = Oh(g, a)), s !== 0 && s !== M.retryLane)))
						throw ((M.retryLane = s), vr(t, s), rn(g, t, s), Kc);
					(Df(x) || yl(), (i = tf(t, i, a)));
				} else
					Df(x)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = M.treeContext),
							(Je = Nn(x.nextSibling)),
							(Ut = i),
							(je = !0),
							(Di = null),
							(An = !1),
							t !== null && Tm(i, t),
							(i = ef(i, s.children)),
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
					P !== null ? (x = ni(P, x)) : ((x = gr(x, c, a, null)), (x.flags |= 2)),
					(x.return = i),
					(s.return = i),
					(s.sibling = x),
					(i.child = s),
					_u(null, s),
					(s = i.child),
					(x = t.child.memoizedState),
					x === null
						? (x = Jc(a))
						: ((c = x.cachePool),
							c !== null ? ((M = _t._currentValue), (c = c.parent !== M ? { parent: M, pool: M } : c)) : (c = zm()),
							(x = { baseLanes: x.baseLanes | a, cachePool: c })),
					(s.memoizedState = x),
					(s.childLanes = Wc(t, g, a)),
					(i.memoizedState = Xc),
					_u(t.child, s))
				: (Ui(i),
					(a = t.child),
					(t = a.sibling),
					(a = ni(a, { mode: "visible", children: s.children })),
					(a.return = i),
					(a.sibling = null),
					t !== null && ((g = i.deletions), g === null ? ((i.deletions = [t]), (i.flags |= 16)) : g.push(t)),
					(i.child = a),
					(i.memoizedState = null),
					a);
		}
		function ef(t, i) {
			return ((i = ll({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function ll(t, i) {
			return ((t = mn(22, t, null, i)), (t.lanes = 0), t);
		}
		function tf(t, i, a) {
			return (
				xr(i, t.child, null, a),
				(t = ef(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function Vv(t, i, a) {
			t.lanes |= i;
			var s = t.alternate;
			(s !== null && (s.lanes |= i), gc(t.return, i, a));
		}
		function nf(t, i, a, s, c, d) {
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
		function Hv(t, i, a) {
			var s = i.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var g = gt.current,
				x = (g & 2) !== 0;
			if (
				(x ? ((g = (g & 1) | 2), (i.flags |= 128)) : (g &= 1),
				re(gt, g),
				$t(t, i, s, a),
				(s = je ? ou : 0),
				!x && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && Vv(t, a, i);
					else if (t.tag === 19) Vv(t, a, i);
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
						((t = a.alternate), t !== null && Gs(t) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = i.child), (i.child = null)) : ((c = a.sibling), (a.sibling = null)),
						nf(i, !1, c, a, d, s));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && Gs(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					nf(i, !0, a, null, d, s);
					break;
				case "together":
					nf(i, !1, null, null, void 0, s);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function li(t, i, a) {
			if ((t !== null && (i.dependencies = t.dependencies), (Vi |= i.lanes), (a & i.childLanes) === 0))
				if (t !== null) {
					if ((ua(t, i, a, !1), (a & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(l(153));
			if (i.child !== null) {
				for (t = i.child, a = ni(t, t.pendingProps), i.child = a, a.return = i; t.sibling !== null; )
					((t = t.sibling), (a = a.sibling = ni(t, t.pendingProps)), (a.return = i));
				a.sibling = null;
			}
			return i.child;
		}
		function rf(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Vs(t)));
		}
		function Fw(t, i, a) {
			switch (i.tag) {
				case 3:
					(Ve(i, i.stateNode.containerInfo), qi(i, _t, t.memoizedState.cache), yr());
					break;
				case 27:
				case 5:
					ot(i);
					break;
				case 4:
					Ve(i, i.stateNode.containerInfo);
					break;
				case 10:
					qi(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), Rc(i), null);
					break;
				case 13:
					var s = i.memoizedState;
					if (s !== null)
						return s.dehydrated !== null
							? (Ui(i), (i.flags |= 128), null)
							: (a & i.child.childLanes) !== 0
								? Bv(t, i, a)
								: (Ui(i), (t = li(t, i, a)), t !== null ? t.sibling : null);
					Ui(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((s = (a & i.childLanes) !== 0), s || (ua(t, i, a, !1), (s = (a & i.childLanes) !== 0)), c)) {
						if (s) return Hv(t, i, a);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						re(gt, gt.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), jv(t, i, a, i.pendingProps));
				case 24:
					qi(i, _t, t.memoizedState.cache);
			}
			return li(t, i, a);
		}
		function Zv(t, i, a) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) Et = !0;
				else {
					if (!rf(t, a) && (i.flags & 128) === 0) return ((Et = !1), Fw(t, i, a));
					Et = (t.flags & 131072) !== 0;
				}
			else ((Et = !1), je && (i.flags & 1048576) !== 0 && Cm(i, ou, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var s = i.pendingProps;
						if (((t = wr(i.elementType)), (i.type = t), typeof t == "function"))
							lc(t)
								? ((s = Ar(t, s)), (i.tag = 1), (i = Lv(null, i, t, s, a)))
								: ((i.tag = 0), (i = Gc(null, i, t, s, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === $) {
									((i.tag = 11), (i = zv(null, i, t, s, a)));
									break e;
								} else if (c === z) {
									((i.tag = 14), (i = kv(null, i, t, s, a)));
									break e;
								}
							}
							throw ((i = ne(t) || t), Error(l(306, i, "")));
						}
					}
					return i;
				case 0:
					return Gc(t, i, i.type, i.pendingProps, a);
				case 1:
					return ((s = i.type), (c = Ar(s, i.pendingProps)), Lv(t, i, s, c, a));
				case 3:
					e: {
						if ((Ve(i, i.stateNode.containerInfo), t === null)) throw Error(l(387));
						s = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), xc(t, i), yu(i, s, null, a));
						var g = i.memoizedState;
						if (
							((s = g.cache), qi(i, _t, s), s !== d.cache && yc(i, [_t], a, !0), gu(), (s = g.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: g.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = $v(t, i, s, a);
								break e;
							} else if (s !== c) {
								((c = En(Error(l(424)), i)), cu(c), (i = $v(t, i, s, a)));
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
									Je = Nn(t.firstChild), Ut = i, je = !0, Di = null, An = !0, a = Um(i, null, s, a), i.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((yr(), s === c)) {
								i = li(t, i, a);
								break e;
							}
							$t(t, i, s, a);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						sl(t, i),
						t === null
							? (a = ny(i.type, null, i.pendingProps, null))
								? (i.memoizedState = a)
								: je ||
									((a = i.type),
									(t = i.pendingProps),
									(s = El(ge.current).createElement(a)),
									(s[It] = i),
									(s[Xt] = t),
									Bt(s, a, t),
									jt(s),
									(i.stateNode = s))
							: (i.memoizedState = ny(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						ot(i),
						t === null &&
							je &&
							((s = i.stateNode = Wg(i.type, i.pendingProps, ge.current)),
							(Ut = i),
							(An = !0),
							(c = Je),
							Yi(i.type) ? ((qf = c), (Je = Nn(s.firstChild))) : (Je = c)),
						$t(t, i, i.pendingProps.children, a),
						sl(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							je &&
							((c = s = Je) &&
								((s = __(s, i.type, i.pendingProps, An)),
								s !== null ? ((i.stateNode = s), (Ut = i), (Je = Nn(s.firstChild)), (An = !1), (c = !0)) : (c = !1)),
							c || ji(i)),
						ot(i),
						(c = i.type),
						(d = i.pendingProps),
						(g = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Mf(c, d) ? (s = null) : g !== null && Mf(c, g) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Nc(t, i, qw, null, null, a)), (Iu._currentValue = c)),
						sl(t, i),
						$t(t, i, s, a),
						i.child
					);
				case 6:
					return (
						t === null &&
							je &&
							((t = a = Je) &&
								((a = x_(a, i.pendingProps, An)),
								a !== null ? ((i.stateNode = a), (Ut = i), (Je = null), (t = !0)) : (t = !1)),
							t || ji(i)),
						null
					);
				case 13:
					return Bv(t, i, a);
				case 4:
					return (
						Ve(i, i.stateNode.containerInfo),
						(s = i.pendingProps),
						t === null ? (i.child = xr(i, null, s, a)) : $t(t, i, s, a),
						i.child
					);
				case 11:
					return zv(t, i, i.type, i.pendingProps, a);
				case 7:
					return ($t(t, i, i.pendingProps, a), i.child);
				case 8:
					return ($t(t, i, i.pendingProps.children, a), i.child);
				case 12:
					return ($t(t, i, i.pendingProps.children, a), i.child);
				case 10:
					return ((s = i.pendingProps), qi(i, i.type, s.value), $t(t, i, s.children, a), i.child);
				case 9:
					return (
						(c = i.type._context),
						(s = i.pendingProps.children),
						pr(i),
						(c = Lt(c)),
						(s = s(c)),
						(i.flags |= 1),
						$t(t, i, s, a),
						i.child
					);
				case 14:
					return kv(t, i, i.type, i.pendingProps, a);
				case 15:
					return Dv(t, i, i.type, i.pendingProps, a);
				case 19:
					return Hv(t, i, a);
				case 31:
					return Yw(t, i, a);
				case 22:
					return jv(t, i, a, i.pendingProps);
				case 24:
					return (
						pr(i),
						(s = Lt(_t)),
						t === null
							? ((c = Sc()),
								c === null &&
									((c = Xe),
									(d = bc()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(i.memoizedState = { parent: s, cache: c }),
								_c(i),
								qi(i, _t, c))
							: ((t.lanes & a) !== 0 && (xc(t, i), yu(i, null, null, a), gu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										qi(i, _t, s))
									: ((s = d.cache), qi(i, _t, s), s !== c.cache && yc(i, [_t], a, !0))),
						$t(t, i, i.pendingProps.children, a),
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
		function af(t, i, a, s, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (yg()) t.flags |= 8192;
					else throw ((_r = Ps), wc);
			} else t.flags &= -16777217;
		}
		function Qv(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !sy(i)))
				if (yg()) t.flags |= 8192;
				else throw ((_r = Ps), wc);
		}
		function ol(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Th() : 536870912), (t.lanes |= i), (ba |= i)));
		}
		function xu(t, i) {
			if (!je)
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
		function We(t) {
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
		function Kw(t, i, a) {
			var s = i.pendingProps;
			switch ((dc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (We(i), null);
				case 1:
					return (We(i), null);
				case 3:
					return (
						(a = i.stateNode),
						(s = null),
						t !== null && (s = t.memoizedState.cache),
						i.memoizedState.cache !== s && (i.flags |= 2048),
						ai(_t),
						Me(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(aa(i)
								? oi(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), mc())),
						We(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (oi(i), d !== null ? (We(i), Qv(i, d)) : (We(i), af(i, c, null, s, a)))
							: d
								? d !== t.memoizedState
									? (oi(i), We(i), Qv(i, d))
									: (We(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && oi(i), We(i), af(i, c, t, s, a)),
						null
					);
				case 27:
					if ((wt(i), (a = ge.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== s && oi(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (We(i), null);
						}
						((t = le.current), aa(i) ? Am(i, t) : ((t = Wg(c, s, a)), (i.stateNode = t), oi(i)));
					}
					return (We(i), null);
				case 5:
					if ((wt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== s && oi(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (We(i), null);
						}
						if (((d = le.current), aa(i))) Am(i, d);
						else {
							var g = El(ge.current);
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
							((d[It] = i), (d[Xt] = s));
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
							e: switch ((Bt(d, c, s), c)) {
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
					return (We(i), af(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, a), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== s && oi(i);
					else {
						if (typeof s != "string" && i.stateNode === null) throw Error(l(166));
						if (((t = ge.current), aa(i))) {
							if (((t = i.stateNode), (a = i.memoizedProps), (s = null), (c = Ut), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[It] = i),
								(t = !!(t.nodeValue === a || (s !== null && s.suppressHydrationWarning === !0) || Vg(t.nodeValue, a))),
								t || ji(i, !0));
						} else ((t = El(t).createTextNode(s)), (t[It] = i), (i.stateNode = t));
					}
					return (We(i), null);
				case 31:
					if (((a = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = aa(i)), a !== null)) {
							if (t === null) {
								if (!s) throw Error(l(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(557));
								t[It] = i;
							} else (yr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(We(i), (t = !1));
						} else
							((a = mc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return i.flags & 256 ? (gn(i), i) : (gn(i), null);
						if ((i.flags & 128) !== 0) throw Error(l(558));
					}
					return (We(i), null);
				case 13:
					if (
						((s = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = aa(i)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(l(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(l(317));
								c[It] = i;
							} else (yr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(We(i), (c = !1));
						} else
							((c = mc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (gn(i), i) : (gn(i), null);
					}
					return (
						gn(i),
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
								ol(i, i.updateQueue),
								We(i),
								null)
					);
				case 4:
					return (Me(), t === null && Ug(i.stateNode.containerInfo), We(i), null);
				case 10:
					return (ai(i.type), We(i), null);
				case 19:
					if ((X(gt), (s = i.memoizedState), s === null)) return (We(i), null);
					if (((c = (i.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) xu(s, !1);
						else {
							if (ht !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = Gs(t)), d !== null)) {
										for (
											i.flags |= 128,
												xu(s, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												ol(i, t),
												i.subtreeFlags = 0,
												t = a,
												a = i.child;
											a !== null;
										)
											(_m(a, t), (a = a.sibling));
										return (re(gt, (gt.current & 1) | 2), je && ii(i, s.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							s.tail !== null && Re() > ml && ((i.flags |= 128), (c = !0), xu(s, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = Gs(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									ol(i, t),
									xu(s, !0),
									s.tail === null && s.tailMode === "hidden" && !d.alternate && !je)
								)
									return (We(i), null);
							} else
								2 * Re() - s.renderingStartTime > ml &&
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
							(s.renderingStartTime = Re()),
							(t.sibling = null),
							(a = gt.current),
							re(gt, c ? (a & 1) | 2 : a & 1),
							je && ii(i, s.treeForkCount),
							t)
						: (We(i), null);
				case 22:
				case 23:
					return (
						gn(i),
						Ac(),
						(s = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== s && (i.flags |= 8192) : s && (i.flags |= 8192),
						s
							? (a & 536870912) !== 0 && (i.flags & 128) === 0 && (We(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: We(i),
						(a = i.updateQueue),
						a !== null && ol(i, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(s = null),
						i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool),
						s !== a && (i.flags |= 2048),
						t !== null && X(Sr),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						i.memoizedState.cache !== a && (i.flags |= 2048),
						ai(_t),
						We(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(l(156, i.tag));
		}
		function Gw(t, i) {
			switch ((dc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						ai(_t),
						Me(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (wt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((gn(i), i.alternate === null)) throw Error(l(340));
						yr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((gn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(l(340));
						yr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (X(gt), null);
				case 4:
					return (Me(), null);
				case 10:
					return (ai(i.type), null);
				case 22:
				case 23:
					return (
						gn(i),
						Ac(),
						t !== null && X(Sr),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (ai(_t), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Pv(t, i) {
			switch ((dc(i), i.tag)) {
				case 3:
					(ai(_t), Me());
					break;
				case 26:
				case 27:
				case 5:
					wt(i);
					break;
				case 4:
					Me();
					break;
				case 31:
					i.memoizedState !== null && gn(i);
					break;
				case 13:
					gn(i);
					break;
				case 19:
					X(gt);
					break;
				case 10:
					ai(i.type);
					break;
				case 22:
				case 23:
					(gn(i), Ac(), t !== null && X(Sr));
					break;
				case 24:
					ai(_t);
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
		function $i(t, i, a) {
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
		function Yv(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var a = t.stateNode;
				try {
					$m(i, a);
				} catch (s) {
					Pe(t, t.return, s);
				}
			}
		}
		function Fv(t, i, a) {
			((a.props = Ar(t.type, t.memoizedProps)), (a.state = t.memoizedState));
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
		function Qn(t, i) {
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
		function Kv(t) {
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
		function uf(t, i, a) {
			try {
				var s = t.stateNode;
				(g_(s, t.type, a, i), (s[Xt] = i));
			} catch (c) {
				Pe(t, t.return, c);
			}
		}
		function Gv(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Yi(t.type)) || t.tag === 4;
		}
		function sf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || Gv(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && Yi(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function lf(t, i, a) {
			var s = t.tag;
			if (s === 5 || s === 6)
				((t = t.stateNode),
					i
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, i)
						: ((i = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							i.appendChild(t),
							(a = a._reactRootContainer),
							a != null || i.onclick !== null || (i.onclick = ei)));
			else if (s !== 4 && (s === 27 && Yi(t.type) && ((a = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (lf(t, i, a), t = t.sibling; t !== null; ) (lf(t, i, a), (t = t.sibling));
		}
		function cl(t, i, a) {
			var s = t.tag;
			if (s === 5 || s === 6) ((t = t.stateNode), i ? a.insertBefore(t, i) : a.appendChild(t));
			else if (s !== 4 && (s === 27 && Yi(t.type) && (a = t.stateNode), (t = t.child), t !== null))
				for (cl(t, i, a), t = t.sibling; t !== null; ) (cl(t, i, a), (t = t.sibling));
		}
		function Xv(t) {
			var i = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var s = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(Bt(i, s, a), (i[It] = t), (i[Xt] = a));
			} catch (d) {
				Pe(t, t.return, d);
			}
		}
		var ci = !1,
			Ct = !1,
			of = !1,
			Jv = typeof WeakSet == "function" ? WeakSet : Set,
			qt = null;
		function Xw(t, i) {
			if (((t = t.containerInfo), (Of = Ml), (t = hm(t)), tc(t))) {
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
			for (Nf = { focusedElem: t, selectionRange: a }, Ml = !1, qt = i; qt !== null; )
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
										var ce = Ar(a.type, c);
										((t = s.getSnapshotBeforeUpdate(ce, d)), (s.__reactInternalSnapshotBeforeUpdate = t));
									} catch (pe) {
										Pe(a, a.return, pe);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (a = t.nodeType), a === 9)) kf(t);
									else if (a === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												kf(t);
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
		function Wv(t, i, a) {
			var s = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(di(t, a), s & 4 && Eu(5, a));
					break;
				case 1:
					if ((di(t, a), s & 4))
						if (((t = a.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (g) {
								Pe(a, a.return, g);
							}
						else {
							var c = Ar(a.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (g) {
								Pe(a, a.return, g);
							}
						}
					(s & 64 && Yv(a), s & 512 && Cu(a, a.return));
					break;
				case 3:
					if ((di(t, a), s & 64 && ((t = a.updateQueue), t !== null))) {
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
							$m(t, i);
						} catch (g) {
							Pe(a, a.return, g);
						}
					}
					break;
				case 27:
					i === null && s & 4 && Xv(a);
				case 26:
				case 5:
					(di(t, a), i === null && s & 4 && Kv(a), s & 512 && Cu(a, a.return));
					break;
				case 12:
					di(t, a);
					break;
				case 31:
					(di(t, a), s & 4 && ng(t, a));
					break;
				case 13:
					(di(t, a),
						s & 4 && ig(t, a),
						s & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = u_.bind(null, a)), E_(t, a)))));
					break;
				case 22:
					if (((s = a.memoizedState !== null || ci), !s)) {
						((i = (i !== null && i.memoizedState !== null) || Ct), (c = ci));
						var d = Ct;
						((ci = s), (Ct = i) && !d ? hi(t, a, (a.subtreeFlags & 8772) !== 0) : di(t, a), (ci = c), (Ct = d));
					}
					break;
				case 30:
					break;
				default:
					di(t, a);
			}
		}
		function eg(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), eg(i)),
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
		var it = null,
			Wt = !1;
		function fi(t, i, a) {
			for (a = a.child; a !== null; ) (tg(t, i, a), (a = a.sibling));
		}
		function tg(t, i, a) {
			if (fn && typeof fn.onCommitFiberUnmount == "function")
				try {
					fn.onCommitFiberUnmount(Ka, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(Ct || Qn(a, i),
						fi(t, i, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					Ct || Qn(a, i);
					var s = it,
						c = Wt;
					(Yi(a.type) && ((it = a.stateNode), (Wt = !1)), fi(t, i, a), Du(a.stateNode), (it = s), (Wt = c));
					break;
				case 5:
					Ct || Qn(a, i);
				case 6:
					if (((s = it), (c = Wt), (it = null), fi(t, i, a), (it = s), (Wt = c), it !== null))
						if (Wt)
							try {
								(it.nodeType === 9 ? it.body : it.nodeName === "HTML" ? it.ownerDocument.body : it).removeChild(
									a.stateNode,
								);
							} catch (d) {
								Pe(a, i, d);
							}
						else
							try {
								it.removeChild(a.stateNode);
							} catch (d) {
								Pe(a, i, d);
							}
					break;
				case 18:
					it !== null &&
						(Wt
							? ((t = it),
								Fg(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								Ta(t))
							: Fg(it, a.stateNode));
					break;
				case 4:
					((s = it), (c = Wt), (it = a.stateNode.containerInfo), (Wt = !0), fi(t, i, a), (it = s), (Wt = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					($i(2, a, i), Ct || $i(4, a, i), fi(t, i, a));
					break;
				case 1:
					(Ct || (Qn(a, i), (s = a.stateNode), typeof s.componentWillUnmount == "function" && Fv(a, i, s)),
						fi(t, i, a));
					break;
				case 21:
					fi(t, i, a);
					break;
				case 22:
					((Ct = (s = Ct) || a.memoizedState !== null), fi(t, i, a), (Ct = s));
					break;
				default:
					fi(t, i, a);
			}
		}
		function ng(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Ta(t);
				} catch (a) {
					Pe(i, i.return, a);
				}
			}
		}
		function ig(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Ta(t);
				} catch (a) {
					Pe(i, i.return, a);
				}
		}
		function Jw(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new Jv()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new Jv()), i);
				default:
					throw Error(l(435, t.tag));
			}
		}
		function fl(t, i) {
			var a = Jw(t);
			i.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = s_.bind(null, t, s);
					s.then(c, c);
				}
			});
		}
		function en(t, i) {
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
								if (Yi(x.type)) {
									((it = x.stateNode), (Wt = !1));
									break e;
								}
								break;
							case 5:
								((it = x.stateNode), (Wt = !1));
								break e;
							case 3:
							case 4:
								((it = x.stateNode.containerInfo), (Wt = !0));
								break e;
						}
						x = x.return;
					}
					if (it === null) throw Error(l(160));
					(tg(d, g, c), (it = null), (Wt = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (rg(i, t), (i = i.sibling));
		}
		var In = null;
		function rg(t, i) {
			var a = t.alternate,
				s = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(en(i, t), tn(t), s & 4 && ($i(3, t, t.return), Eu(3, t), $i(5, t, t.return)));
					break;
				case 1:
					(en(i, t),
						tn(t),
						s & 512 && (Ct || a === null || Qn(a, a.return)),
						s & 64 &&
							ci &&
							((t = t.updateQueue),
							t !== null &&
								((s = t.callbacks),
								s !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? s : a.concat(s))))));
					break;
				case 26:
					var c = In;
					if ((en(i, t), tn(t), s & 512 && (Ct || a === null || Qn(a, a.return)), s & 4)) {
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
														d[It] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(s)), c.head.insertBefore(d, c.querySelector("head > title"))),
													Bt(d, s, a),
													(d[It] = t),
													jt(d),
													(s = d));
												break e;
											case "link":
												var g = ay("link", "href", c).get(s + (a.href || ""));
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
												((d = c.createElement(s)), Bt(d, s, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((g = ay("meta", "content", c).get(s + (a.content || "")))) {
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
												((d = c.createElement(s)), Bt(d, s, a), c.head.appendChild(d));
												break;
											default:
												throw Error(l(468, s));
										}
										((d[It] = t), jt(d), (s = d));
									}
									t.stateNode = s;
								} else uy(c, t.type, t.stateNode);
							else t.stateNode = ry(c, s, t.memoizedProps);
						else
							d !== s
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									s === null ? uy(c, t.type, t.stateNode) : ry(c, s, t.memoizedProps))
								: s === null && t.stateNode !== null && uf(t, t.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(en(i, t),
						tn(t),
						s & 512 && (Ct || a === null || Qn(a, a.return)),
						a !== null && s & 4 && uf(t, t.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((en(i, t), tn(t), s & 512 && (Ct || a === null || Qn(a, a.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							Kr(c, "");
						} catch (ce) {
							Pe(t, t.return, ce);
						}
					}
					(s & 4 && t.stateNode != null && ((c = t.memoizedProps), uf(t, c, a !== null ? a.memoizedProps : c)),
						s & 1024 && (of = !0));
					break;
				case 6:
					if ((en(i, t), tn(t), s & 4)) {
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
						((Al = null),
						(c = In),
						(In = Cl(i.containerInfo)),
						en(i, t),
						(In = c),
						tn(t),
						s & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							Ta(i.containerInfo);
						} catch (ce) {
							Pe(t, t.return, ce);
						}
					of && ((of = !1), ag(t));
					break;
				case 4:
					((s = In), (In = Cl(t.stateNode.containerInfo)), en(i, t), tn(t), (In = s));
					break;
				case 12:
					(en(i, t), tn(t));
					break;
				case 31:
					(en(i, t), tn(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), fl(t, s))));
					break;
				case 13:
					(en(i, t),
						tn(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(hl = Re()),
						s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), fl(t, s))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var M = a !== null && a.memoizedState !== null,
						P = ci,
						J = Ct;
					if (((ci = P || c), (Ct = J || M), en(i, t), (Ct = J), (ci = P), tn(t), s & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (a === null || M || ci || Ct || Rr(t)),
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
										c ? Kg(K, !0) : Kg(M.stateNode, !1);
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
						((s = t.updateQueue), s !== null && ((a = s.retryQueue), a !== null && ((s.retryQueue = null), fl(t, a))));
					break;
				case 19:
					(en(i, t), tn(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), fl(t, s))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(en(i, t), tn(t));
			}
		}
		function tn(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var a, s = t.return; s !== null; ) {
						if (Gv(s)) {
							a = s;
							break;
						}
						s = s.return;
					}
					if (a == null) throw Error(l(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							cl(t, sf(t), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Kr(d, ""), (a.flags &= -33)), cl(t, sf(t), d));
							break;
						case 3:
						case 4:
							var g = a.stateNode.containerInfo;
							lf(t, sf(t), g);
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
		function di(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (Wv(t, i.alternate, i), (i = i.sibling));
		}
		function Rr(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						($i(4, i, i.return), Rr(i));
						break;
					case 1:
						Qn(i, i.return);
						var a = i.stateNode;
						(typeof a.componentWillUnmount == "function" && Fv(i, i.return, a), Rr(i));
						break;
					case 27:
						Du(i.stateNode);
					case 26:
					case 5:
						(Qn(i, i.return), Rr(i));
						break;
					case 22:
						i.memoizedState === null && Rr(i);
						break;
					case 30:
						Rr(i);
						break;
					default:
						Rr(i);
				}
				t = t.sibling;
			}
		}
		function hi(t, i, a) {
			for (a = a && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var s = i.alternate,
					c = t,
					d = i,
					g = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(hi(c, d, a), Eu(4, d));
						break;
					case 1:
						if ((hi(c, d, a), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (P) {
								Pe(s, s.return, P);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var x = s.stateNode;
							try {
								var M = c.shared.hiddenCallbacks;
								if (M !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < M.length; c++) Lm(M[c], x);
							} catch (P) {
								Pe(s, s.return, P);
							}
						}
						(a && g & 64 && Yv(d), Cu(d, d.return));
						break;
					case 27:
						Xv(d);
					case 26:
					case 5:
						(hi(c, d, a), a && s === null && g & 4 && Kv(d), Cu(d, d.return));
						break;
					case 12:
						hi(c, d, a);
						break;
					case 31:
						(hi(c, d, a), a && g & 4 && ng(c, d));
						break;
					case 13:
						(hi(c, d, a), a && g & 4 && ig(c, d));
						break;
					case 22:
						(d.memoizedState === null && hi(c, d, a), Cu(d, d.return));
						break;
					case 30:
						break;
					default:
						hi(c, d, a);
				}
				i = i.sibling;
			}
		}
		function cf(t, i) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && fu(a)));
		}
		function ff(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && fu(t)));
		}
		function Un(t, i, a, s) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (ug(t, i, a, s), (i = i.sibling));
		}
		function ug(t, i, a, s) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(Un(t, i, a, s), c & 2048 && Eu(9, i));
					break;
				case 1:
					Un(t, i, a, s);
					break;
				case 3:
					(Un(t, i, a, s),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && fu(t))));
					break;
				case 12:
					if (c & 2048) {
						(Un(t, i, a, s), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								g = d.id,
								x = d.onPostCommit;
							typeof x == "function" && x(g, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (M) {
							Pe(i, i.return, M);
						}
					} else Un(t, i, a, s);
					break;
				case 31:
					Un(t, i, a, s);
					break;
				case 13:
					Un(t, i, a, s);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(g = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? Un(t, i, a, s)
								: Tu(t, i)
							: d._visibility & 2
								? Un(t, i, a, s)
								: ((d._visibility |= 2), va(t, i, a, s, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && cf(g, i));
					break;
				case 24:
					(Un(t, i, a, s), c & 2048 && ff(i.alternate, i));
					break;
				default:
					Un(t, i, a, s);
			}
		}
		function va(t, i, a, s, c) {
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
						(va(d, g, x, M, c), Eu(8, g));
						break;
					case 23:
						break;
					case 22:
						var J = g.stateNode;
						(g.memoizedState !== null
							? J._visibility & 2
								? va(d, g, x, M, c)
								: Tu(d, g)
							: ((J._visibility |= 2), va(d, g, x, M, c)),
							c && P & 2048 && cf(g.alternate, g));
						break;
					case 24:
						(va(d, g, x, M, c), c && P & 2048 && ff(g.alternate, g));
						break;
					default:
						va(d, g, x, M, c);
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
							(Tu(a, s), c & 2048 && cf(s.alternate, s));
							break;
						case 24:
							(Tu(a, s), c & 2048 && ff(s.alternate, s));
							break;
						default:
							Tu(a, s);
					}
					i = i.sibling;
				}
		}
		var Au = 8192;
		function ga(t, i, a) {
			if (t.subtreeFlags & Au) for (t = t.child; t !== null; ) (sg(t, i, a), (t = t.sibling));
		}
		function sg(t, i, a) {
			switch (t.tag) {
				case 26:
					(ga(t, i, a), t.flags & Au && t.memoizedState !== null && q_(a, In, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					ga(t, i, a);
					break;
				case 3:
				case 4:
					var s = In;
					((In = Cl(t.stateNode.containerInfo)), ga(t, i, a), (In = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = Au), (Au = 16777216), ga(t, i, a), (Au = s)) : ga(t, i, a));
					break;
				default:
					ga(t, i, a);
			}
		}
		function lg(t) {
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
						((qt = s), cg(s, t));
					}
				lg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (og(t), (t = t.sibling));
		}
		function og(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Ru(t), t.flags & 2048 && $i(9, t, t.return));
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
						? ((i._visibility &= -3), dl(t))
						: Ru(t);
					break;
				default:
					Ru(t);
			}
		}
		function dl(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var s = i[a];
						((qt = s), cg(s, t));
					}
				lg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						($i(8, i, i.return), dl(i));
						break;
					case 22:
						((a = i.stateNode), a._visibility & 2 && ((a._visibility &= -3), dl(i)));
						break;
					default:
						dl(i);
				}
				t = t.sibling;
			}
		}
		function cg(t, i) {
			for (; qt !== null; ) {
				var a = qt;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						$i(8, a, i);
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
						if ((eg(s), s === a)) {
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
		var Ww = {
				getCacheForType: function (t) {
					var i = Lt(_t),
						a = i.data.get(t);
					return (a === void 0 && ((a = t()), i.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return Lt(_t).controller.signal;
				},
			},
			e_ = typeof WeakMap == "function" ? WeakMap : Map,
			He = 0,
			Xe = null,
			Oe = null,
			ze = 0,
			Qe = 0,
			yn = null,
			Bi = !1,
			ya = !1,
			df = !1,
			mi = 0,
			ht = 0,
			Vi = 0,
			Or = 0,
			hf = 0,
			bn = 0,
			ba = 0,
			Ou = null,
			nn = null,
			mf = !1,
			hl = 0,
			fg = 0,
			ml = 1 / 0,
			vl = null,
			Hi = null,
			zt = 0,
			Zi = null,
			pa = null,
			vi = 0,
			vf = 0,
			gf = null,
			dg = null,
			Nu = 0,
			yf = null;
		function On() {
			return (He & 2) !== 0 && ze !== 0 ? ze & -ze : H.T !== null ? xf() : Mh();
		}
		function hg() {
			if (bn === 0)
				if ((ze & 536870912) === 0 || je) {
					var t = _s;
					((_s <<= 1), (_s & 3932160) === 0 && (_s = 262144), (bn = t));
				} else bn = 536870912;
			return ((t = vn.current), t !== null && (t.flags |= 32), bn);
		}
		function rn(t, i, a) {
			(((t === Xe && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null) && (Sa(t, 0), Qi(t, ze, bn, !1)),
				Cs(t, a),
				((He & 2) === 0 || t !== Xe) &&
					(t === Xe && ((He & 2) === 0 && (Or |= a), ht === 4 && Qi(t, ze, bn, !1)), gi(t)));
		}
		function mg(t, i, a) {
			if ((He & 6) !== 0) throw Error(l(327));
			var s = (!a && (i & 127) === 0 && (i & t.expiredLanes) === 0) || Ga(t, i),
				c = s ? i_(t, i) : pf(t, i, !0),
				d = s;
			do {
				if (c === 0) {
					ya && !s && Qi(t, i, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !t_(a))) {
						((c = pf(t, i, !1)), (d = !1));
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
								if ((M && (Sa(x, g).flags |= 256), (g = pf(x, g, !1)), g !== 2)) {
									if (df && !M) {
										((x.errorRecoveryDisabledLanes |= d), (Or |= d), (c = 4));
										break e;
									}
									((d = nn), (nn = c), d !== null && (nn === null ? (nn = d) : nn.push.apply(nn, d)));
								}
								c = g;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Sa(t, 0), Qi(t, i, 0, !0));
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
								Qi(s, i, bn, !Bi);
								break e;
							case 2:
								nn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(l(329));
						}
						if ((i & 62914560) === i && ((c = hl + 300 - Re()), 10 < c)) {
							if ((Qi(s, i, bn, !Bi), Es(s, 0, !0) !== 0)) break e;
							((vi = i),
								(s.timeoutHandle = Pg(vg.bind(null, s, a, nn, vl, mf, i, bn, Or, ba, Bi, d, "Throttled", -0, 0), c)));
							break e;
						}
						vg(s, a, nn, vl, mf, i, bn, Or, ba, Bi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			gi(t);
		}
		function vg(t, i, a, s, c, d, g, x, M, P, J, ee, Y, K) {
			if (((t.timeoutHandle = -1), (ee = i.subtreeFlags), ee & 8192 || (ee & 16785408) === 16785408)) {
				((ee = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: ei,
				}),
					sg(i, d, ee));
				var ce = (d & 62914560) === d ? hl - Re() : (d & 4194048) === d ? fg - Re() : 0;
				if (((ce = I_(ee, ce)), ce !== null)) {
					((vi = d),
						(t.cancelPendingCommit = ce(xg.bind(null, t, i, d, a, s, c, g, x, M, J, ee, null, Y, K))),
						Qi(t, d, g, !P));
					return;
				}
			}
			xg(t, i, d, a, s, c, g, x, M);
		}
		function t_(t) {
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
							if (!hn(d(), c)) return !1;
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
		function Qi(t, i, a, s) {
			((i &= ~hf),
				(i &= ~Or),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				s && (t.warmLanes |= i),
				(s = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - dn(c),
					g = 1 << d;
				((s[d] = -1), (c &= ~g));
			}
			a !== 0 && Ah(t, a, i);
		}
		function gl() {
			return (He & 6) === 0 ? (Mu(0, !1), !1) : !0;
		}
		function bf() {
			if (Oe !== null) {
				if (Qe === 0) var t = Oe.return;
				else ((t = Oe), (ri = br = null), kc(t), (ca = null), (hu = 0), (t = Oe));
				for (; t !== null; ) (Pv(t.alternate, t), (t = t.return));
				Oe = null;
			}
		}
		function Sa(t, i) {
			var a = t.timeoutHandle;
			(a !== -1 && ((t.timeoutHandle = -1), p_(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(vi = 0),
				bf(),
				(Xe = t),
				(Oe = a = ni(t.current, null)),
				(ze = i),
				(Qe = 0),
				(yn = null),
				(Bi = !1),
				(ya = Ga(t, i)),
				(df = !1),
				(ba = bn = hf = Or = Vi = ht = 0),
				(nn = Ou = null),
				(mf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var s = t.entangledLanes;
			if (s !== 0)
				for (t = t.entanglements, s &= i; 0 < s; ) {
					var c = 31 - dn(s),
						d = 1 << c;
					((i |= t[c]), (s &= ~d));
				}
			return ((mi = i), Is(), a);
		}
		function gg(t, i) {
			((Ce = null),
				(H.H = wu),
				i === oa || i === Qs
					? ((i = jm()), (Qe = 3))
					: i === wc
						? ((i = jm()), (Qe = 4))
						: (Qe = i === Kc ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(yn = i),
				Oe === null && ((ht = 1), al(t, En(i, t.current))));
		}
		function yg() {
			var t = vn.current;
			return t === null
				? !0
				: (ze & 4194048) === ze
					? Rn === null
					: (ze & 62914560) === ze || (ze & 536870912) !== 0
						? t === Rn
						: !1;
		}
		function bg() {
			var t = H.H;
			return ((H.H = wu), t === null ? wu : t);
		}
		function pg() {
			var t = H.A;
			return ((H.A = Ww), t);
		}
		function yl() {
			((ht = 4),
				Bi || ((ze & 4194048) !== ze && vn.current !== null) || (ya = !0),
				((Vi & 134217727) === 0 && (Or & 134217727) === 0) || Xe === null || Qi(Xe, ze, bn, !1));
		}
		function pf(t, i, a) {
			var s = He;
			He |= 2;
			var c = bg(),
				d = pg();
			((Xe !== t || ze !== i) && ((vl = null), Sa(t, i)), (i = !1));
			var g = ht;
			e: do
				try {
					if (Qe !== 0 && Oe !== null) {
						var x = Oe,
							M = yn;
						switch (Qe) {
							case 8:
								(bf(), (g = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								vn.current === null && (i = !0);
								var P = Qe;
								if (((Qe = 0), (yn = null), wa(t, x, M, P), a && ya)) {
									g = 0;
									break e;
								}
								break;
							default:
								((P = Qe), (Qe = 0), (yn = null), wa(t, x, M, P));
						}
					}
					(n_(), (g = ht));
					break;
				} catch (J) {
					gg(t, J);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(ri = br = null),
				(He = s),
				(H.H = c),
				(H.A = d),
				Oe === null && ((Xe = null), (ze = 0), Is()),
				g
			);
		}
		function n_() {
			for (; Oe !== null; ) Sg(Oe);
		}
		function i_(t, i) {
			var a = He;
			He |= 2;
			var s = bg(),
				c = pg();
			Xe !== t || ze !== i ? ((vl = null), (ml = Re() + 500), Sa(t, i)) : (ya = Ga(t, i));
			e: do
				try {
					if (Qe !== 0 && Oe !== null) {
						i = Oe;
						var d = yn;
						t: switch (Qe) {
							case 1:
								((Qe = 0), (yn = null), wa(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (km(d)) {
									((Qe = 0), (yn = null), wg(i));
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
								km(d) ? ((Qe = 0), (yn = null), wg(i)) : ((Qe = 0), (yn = null), wa(t, i, d, 7));
								break;
							case 5:
								var g = null;
								switch (Oe.tag) {
									case 26:
										g = Oe.memoizedState;
									case 5:
									case 27:
										var x = Oe;
										if (g ? sy(g) : x.stateNode.complete) {
											((Qe = 0), (yn = null));
											var M = x.sibling;
											if (M !== null) Oe = M;
											else {
												var P = x.return;
												P !== null ? ((Oe = P), bl(P)) : (Oe = null);
											}
											break t;
										}
								}
								((Qe = 0), (yn = null), wa(t, i, d, 5));
								break;
							case 6:
								((Qe = 0), (yn = null), wa(t, i, d, 6));
								break;
							case 8:
								(bf(), (ht = 6));
								break e;
							default:
								throw Error(l(462));
						}
					}
					r_();
					break;
				} catch (J) {
					gg(t, J);
				}
			while (!0);
			return ((ri = br = null), (H.H = s), (H.A = c), (He = a), Oe !== null ? 0 : ((Xe = null), (ze = 0), Is(), ht));
		}
		function r_() {
			for (; Oe !== null && !Ae(); ) Sg(Oe);
		}
		function Sg(t) {
			var i = Zv(t.alternate, t, mi);
			((t.memoizedProps = t.pendingProps), i === null ? bl(t) : (Oe = i));
		}
		function wg(t) {
			var i = t,
				a = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = Uv(a, i, i.pendingProps, i.type, void 0, ze);
					break;
				case 11:
					i = Uv(a, i, i.pendingProps, i.type.render, i.ref, ze);
					break;
				case 5:
					kc(i);
				default:
					(Pv(a, i), (i = Oe = _m(i, mi)), (i = Zv(a, i, mi)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? bl(t) : (Oe = i));
		}
		function wa(t, i, a, s) {
			((ri = br = null), kc(i), (ca = null), (hu = 0));
			var c = i.return;
			try {
				if (Pw(t, c, i, a, ze)) {
					((ht = 1), al(t, En(a, t.current)), (Oe = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Oe = c), d);
				((ht = 1), al(t, En(a, t.current)), (Oe = null));
				return;
			}
			i.flags & 32768
				? (je || s === 1
						? (t = !0)
						: ya || (ze & 536870912) !== 0
							? (t = !1)
							: ((Bi = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = vn.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					_g(i, t))
				: bl(i);
		}
		function bl(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					_g(i, Bi);
					return;
				}
				t = i.return;
				var a = Kw(i.alternate, i, mi);
				if (a !== null) {
					Oe = a;
					return;
				}
				if (((i = i.sibling), i !== null)) {
					Oe = i;
					return;
				}
				Oe = i = t;
			} while (i !== null);
			ht === 0 && (ht = 5);
		}
		function _g(t, i) {
			do {
				var a = Gw(t.alternate, t);
				if (a !== null) {
					((a.flags &= 32767), (Oe = a));
					return;
				}
				if (
					((a = t.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!i && ((t = t.sibling), t !== null))
				) {
					Oe = t;
					return;
				}
				Oe = t = a;
			} while (t !== null);
			((ht = 6), (Oe = null));
		}
		function xg(t, i, a, s, c, d, g, x, M) {
			t.cancelPendingCommit = null;
			do pl();
			while (zt !== 0);
			if ((He & 6) !== 0) throw Error(l(327));
			if (i !== null) {
				if (i === t.current) throw Error(l(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= uc),
					QS(t, a, d, g, x, M),
					t === Xe && ((Oe = Xe = null), (ze = 0)),
					(pa = i),
					(Zi = t),
					(vi = a),
					(vf = d),
					(gf = c),
					(dg = s),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							l_(se, function () {
								return (Rg(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(s = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || s)
				) {
					((s = H.T), (H.T = null), (c = B.p), (B.p = 2), (g = He), (He |= 4));
					try {
						Xw(t, i, a);
					} finally {
						((He = g), (B.p = c), (H.T = s));
					}
				}
				((zt = 1), Eg(), Cg(), Tg());
			}
		}
		function Eg() {
			if (zt === 1) {
				zt = 0;
				var t = Zi,
					i = pa,
					a = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || a) {
					((a = H.T), (H.T = null));
					var s = B.p;
					B.p = 2;
					var c = He;
					He |= 4;
					try {
						rg(i, t);
						var d = Nf,
							g = hm(t.containerInfo),
							x = d.focusedElem,
							M = d.selectionRange;
						if (g !== x && x && x.ownerDocument && dm(x.ownerDocument.documentElement, x)) {
							if (M !== null && tc(x)) {
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
											pe = Math.min(M.start, ce),
											Ke = M.end === void 0 ? pe : Math.min(M.end, ce);
										!K.extend && pe > Ke && ((g = Ke), (Ke = pe), (pe = g));
										var V = fm(x, pe),
											q = fm(x, Ke);
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
												pe > Ke
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
						((Ml = !!Of), (Nf = Of = null));
					} finally {
						((He = c), (B.p = s), (H.T = a));
					}
				}
				((t.current = i), (zt = 2));
			}
		}
		function Cg() {
			if (zt === 2) {
				zt = 0;
				var t = Zi,
					i = pa,
					a = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || a) {
					((a = H.T), (H.T = null));
					var s = B.p;
					B.p = 2;
					var c = He;
					He |= 4;
					try {
						Wv(t, i.alternate, i);
					} finally {
						((He = c), (B.p = s), (H.T = a));
					}
				}
				zt = 3;
			}
		}
		function Tg() {
			if (zt === 4 || zt === 3) {
				((zt = 0), mt());
				var t = Zi,
					i = pa,
					a = vi,
					s = dg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (zt = 5)
					: ((zt = 0), (pa = Zi = null), Ag(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (Hi = null), qo(a), (i = i.stateNode), fn && typeof fn.onCommitFiberRoot == "function"))
					try {
						fn.onCommitFiberRoot(Ka, i, void 0, (i.current.flags & 128) === 128);
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
				((vi & 3) !== 0 && pl(),
					gi(t),
					(c = t.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (t === yf ? Nu++ : ((Nu = 0), (yf = t))) : (Nu = 0),
					Mu(0, !1));
			}
		}
		function Ag(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), fu(i)));
		}
		function pl() {
			return (Eg(), Cg(), Tg(), Rg());
		}
		function Rg() {
			if (zt !== 5) return !1;
			var t = Zi,
				i = vf;
			vf = 0;
			var a = qo(vi),
				s = H.T,
				c = B.p;
			try {
				((B.p = 32 > a ? 32 : a), (H.T = null), (a = gf), (gf = null));
				var d = Zi,
					g = vi;
				if (((zt = 0), (pa = Zi = null), (vi = 0), (He & 6) !== 0)) throw Error(l(331));
				var x = He;
				if (
					((He |= 4),
					og(d.current),
					ug(d, d.current, g, a),
					(He = x),
					Mu(0, !1),
					fn && typeof fn.onPostCommitFiberRoot == "function")
				)
					try {
						fn.onPostCommitFiberRoot(Ka, d);
					} catch {}
				return !0;
			} finally {
				((B.p = c), (H.T = s), Ag(t, i));
			}
		}
		function Og(t, i, a) {
			((i = En(a, i)), (i = Fc(t.stateNode, i, 2)), (t = Cr(t, i, 2)), t !== null && (Cs(t, 2), gi(t)));
		}
		function Pe(t, i, a) {
			if (t.tag === 3) Og(t, t, a);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						Og(i, t, a);
						break;
					} else if (i.tag === 1) {
						var s = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Hi === null || !Hi.has(s)))
						) {
							((t = En(a, t)), (a = Nv(2)), (s = Cr(i, a, 2)), s !== null && (Mv(a, s, i, t), Cs(s, 2), gi(s)));
							break;
						}
					}
					i = i.return;
				}
		}
		function Sf(t, i, a) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new e_();
				var c = new Set();
				s.set(i, c);
			} else ((c = s.get(i)), c === void 0 && ((c = new Set()), s.set(i, c)));
			c.has(a) || ((df = !0), c.add(a), (t = a_.bind(null, t, i, a)), i.then(t, t));
		}
		function a_(t, i, a) {
			var s = t.pingCache;
			(s !== null && s.delete(i),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				Xe === t &&
					(ze & a) === a &&
					(ht === 4 || (ht === 3 && (ze & 62914560) === ze && 300 > Re() - hl) ? (He & 2) === 0 && Sa(t, 0) : (hf |= a),
					ba === ze && (ba = 0)),
				gi(t));
		}
		function Ng(t, i) {
			(i === 0 && (i = Th()), (t = vr(t, i)), t !== null && (Cs(t, i), gi(t)));
		}
		function u_(t) {
			var i = t.memoizedState,
				a = 0;
			(i !== null && (a = i.retryLane), Ng(t, a));
		}
		function s_(t, i) {
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
			(s !== null && s.delete(i), Ng(t, a));
		}
		function l_(t, i) {
			return ct(t, i);
		}
		var Sl = null,
			_a = null,
			wf = !1,
			wl = !1,
			_f = !1,
			Pi = 0;
		function gi(t) {
			(t !== _a && t.next === null && (_a === null ? (Sl = _a = t) : (_a = _a.next = t)),
				(wl = !0),
				wf || ((wf = !0), c_()));
		}
		function Mu(t, i) {
			if (!_f && wl) {
				_f = !0;
				do
					for (var a = !1, s = Sl; s !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var g = s.suspendedLanes,
										x = s.pingedLanes;
									((d = (1 << (31 - dn(42 | t) + 1)) - 1),
										(d &= c & ~(g & ~x)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), Dg(s, d));
							} else
								((d = ze),
									(d = Es(s, s === Xe ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || Ga(s, d) || ((a = !0), Dg(s, d)));
						s = s.next;
					}
				while (a);
				_f = !1;
			}
		}
		function o_() {
			Mg();
		}
		function Mg() {
			wl = wf = !1;
			var t = 0;
			Pi !== 0 && b_() && (t = Pi);
			for (var i = Re(), a = null, s = Sl; s !== null; ) {
				var c = s.next,
					d = zg(s, i);
				(d === 0
					? ((s.next = null), a === null ? (Sl = c) : (a.next = c), c === null && (_a = a))
					: ((a = s), (t !== 0 || (d & 3) !== 0) && (wl = !0)),
					(s = c));
			}
			((zt !== 0 && zt !== 5) || Mu(t, !1), Pi !== 0 && (Pi = 0));
		}
		function zg(t, i) {
			for (
				var a = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var g = 31 - dn(d),
					x = 1 << g,
					M = c[g];
				(M === -1 ? ((x & a) === 0 || (x & s) !== 0) && (c[g] = ZS(x, i)) : M <= i && (t.expiredLanes |= x), (d &= ~x));
			}
			if (
				((i = Xe),
				(a = ze),
				(a = Es(t, t === i ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				a === 0 || (t === i && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && ae(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || Ga(t, a)) {
				if (((i = a & -a), i === t.callbackPriority)) return i;
				switch ((s !== null && ae(s), qo(a))) {
					case 2:
					case 8:
						a = st;
						break;
					case 32:
						a = se;
						break;
					case 268435456:
						a = vt;
						break;
					default:
						a = se;
				}
				return ((s = kg.bind(null, t)), (a = ct(a, s)), (t.callbackPriority = i), (t.callbackNode = a), i);
			}
			return (s !== null && s !== null && ae(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function kg(t, i) {
			if (zt !== 0 && zt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (pl() && t.callbackNode !== a) return null;
			var s = ze;
			return (
				(s = Es(t, t === Xe ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (mg(t, s, i), zg(t, Re()), t.callbackNode != null && t.callbackNode === a ? kg.bind(null, t) : null)
			);
		}
		function Dg(t, i) {
			if (pl()) return null;
			mg(t, i, !0);
		}
		function c_() {
			S_(function () {
				(He & 6) !== 0 ? ct(Gt, o_) : Mg();
			});
		}
		function xf() {
			if (Pi === 0) {
				var t = sa;
				(t === 0 && ((t = ws), (ws <<= 1), (ws & 261888) === 0 && (ws = 256)), (Pi = t));
			}
			return Pi;
		}
		function jg(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: Os("" + t);
		}
		function qg(t, i) {
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
		function f_(t, i, a, s, c) {
			if (i === "submit" && a && a.stateNode === c) {
				var d = jg((c[Xt] || null).action),
					g = s.submitter;
				g &&
					((i = (i = g[Xt] || null) ? jg(i.formAction) : g.getAttribute("formAction")),
					i !== null && ((d = i), (g = null)));
				var x = new ks("action", "action", null, s, c);
				t.push({
					event: x,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (Pi !== 0) {
										var M = g ? qg(c, g) : new FormData(c);
										Vc(a, { pending: !0, data: M, method: c.method, action: d }, null, M);
									}
								} else
									typeof d == "function" &&
										(x.preventDefault(),
										(M = g ? qg(c, g) : new FormData(c)),
										Vc(a, { pending: !0, data: M, method: c.method, action: d }, d, M));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Ef = 0; Ef < ac.length; Ef++) {
			var Cf = ac[Ef];
			qn(Cf.toLowerCase(), "on" + (Cf[0].toUpperCase() + Cf.slice(1)));
		}
		(qn(gm, "onAnimationEnd"),
			qn(ym, "onAnimationIteration"),
			qn(bm, "onAnimationStart"),
			qn("dblclick", "onDoubleClick"),
			qn("focusin", "onFocus"),
			qn("focusout", "onBlur"),
			qn(Tw, "onTransitionRun"),
			qn(Aw, "onTransitionStart"),
			qn(Rw, "onTransitionCancel"),
			qn(pm, "onTransitionEnd"),
			Yr("onMouseEnter", ["mouseout", "mouseover"]),
			Yr("onMouseLeave", ["mouseout", "mouseover"]),
			Yr("onPointerEnter", ["pointerout", "pointerover"]),
			Yr("onPointerLeave", ["pointerout", "pointerover"]),
			fr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			fr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			fr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			fr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			fr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			fr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var zu =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			d_ = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zu));
		function Ig(t, i) {
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
								qs(J);
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
								qs(J);
							}
							((c.currentTarget = null), (d = M));
						}
				}
			}
		}
		function Ne(t, i) {
			var a = i[Io];
			a === void 0 && (a = i[Io] = new Set());
			var s = t + "__bubble";
			a.has(s) || (Lg(i, t, 2, !1), a.add(s));
		}
		function Tf(t, i, a) {
			var s = 0;
			(i && (s |= 4), Lg(a, t, s, i));
		}
		var _l = "_reactListening" + Math.random().toString(36).slice(2);
		function Ug(t) {
			if (!t[_l]) {
				((t[_l] = !0),
					Dh.forEach(function (a) {
						a !== "selectionchange" && (d_.has(a) || Tf(a, !1, t), Tf(a, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[_l] || ((i[_l] = !0), Tf("selectionchange", !1, i));
			}
		}
		function Lg(t, i, a, s) {
			switch (dy(i)) {
				case 2:
					var c = V_;
					break;
				case 8:
					c = H_;
					break;
				default:
					c = Bf;
			}
			((a = c.bind(null, i, a, t)),
				(c = void 0),
				!Po || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				s
					? c !== void 0
						? t.addEventListener(i, a, { capture: !0, passive: c })
						: t.addEventListener(i, a, !0)
					: c !== void 0
						? t.addEventListener(i, a, { passive: c })
						: t.addEventListener(i, a, !1));
		}
		function Af(t, i, a, s, c) {
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
							if (((g = Zr(x)), g === null)) return;
							if (((M = g.tag), M === 5 || M === 6 || M === 26 || M === 27)) {
								s = d = g;
								continue e;
							}
							x = x.parentNode;
						}
					}
					s = s.return;
				}
			Ph(function () {
				var P = d,
					J = Zo(a),
					ee = [];
				e: {
					var Y = Sm.get(t);
					if (Y !== void 0) {
						var K = ks,
							ce = t;
						switch (t) {
							case "keypress":
								if (Ms(a) === 0) break e;
							case "keydown":
							case "keyup":
								K = ow;
								break;
							case "focusin":
								((ce = "focus"), (K = Go));
								break;
							case "focusout":
								((ce = "blur"), (K = Go));
								break;
							case "beforeblur":
							case "afterblur":
								K = Go;
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
								K = Kh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								K = nw;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								K = cw;
								break;
							case gm:
							case ym:
							case bm:
								K = iw;
								break;
							case pm:
								K = fw;
								break;
							case "scroll":
							case "scrollend":
								K = tw;
								break;
							case "wheel":
								K = dw;
								break;
							case "copy":
							case "cut":
							case "paste":
								K = rw;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								K = Xh;
								break;
							case "toggle":
							case "beforetoggle":
								K = hw;
						}
						var pe = (i & 4) !== 0,
							Ke = !pe && (t === "scroll" || t === "scrollend"),
							V = pe ? (Y !== null ? Y + "Capture" : null) : Y;
						pe = [];
						for (var q = P, Z; q !== null; ) {
							var W = q;
							if (
								((Z = W.stateNode),
								(W = W.tag),
								(W !== 5 && W !== 26 && W !== 27) ||
									Z === null ||
									V === null ||
									((W = eu(q, V)), W != null && pe.push(ku(q, W, Z))),
								Ke)
							)
								break;
							q = q.return;
						}
						0 < pe.length && ((Y = new K(Y, ce, null, a, J)), ee.push({ event: Y, listeners: pe }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((Y = t === "mouseover" || t === "pointerover"),
							(K = t === "mouseout" || t === "pointerout"),
							Y && a !== Ho && (ce = a.relatedTarget || a.fromElement) && (Zr(ce) || ce[Xa]))
						)
							break e;
						if (
							(K || Y) &&
							((Y = J.window === J ? J : (Y = J.ownerDocument) ? Y.defaultView || Y.parentWindow : window),
							K
								? ((ce = a.relatedTarget || a.toElement),
									(K = P),
									(ce = ce ? Zr(ce) : null),
									ce !== null &&
										((Ke = f(ce)), (pe = ce.tag), ce !== Ke || (pe !== 5 && pe !== 27 && pe !== 6)) &&
										(ce = null))
								: ((K = null), (ce = P)),
							K !== ce)
						) {
							if (
								((pe = Kh),
								(W = "onMouseLeave"),
								(V = "onMouseEnter"),
								(q = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((pe = Xh), (W = "onPointerLeave"), (V = "onPointerEnter"), (q = "pointer")),
								(Ke = K == null ? Y : Wa(K)),
								(Z = ce == null ? Y : Wa(ce)),
								(Y = new pe(W, q + "leave", K, a, J)),
								(Y.target = Ke),
								(Y.relatedTarget = Z),
								(W = null),
								Zr(J) === P &&
									((pe = new pe(V, q + "enter", ce, a, J)), (pe.target = Z), (pe.relatedTarget = Ke), (W = pe)),
								(Ke = W),
								K && ce)
							)
								t: {
									for (pe = h_, V = K, q = ce, Z = 0, W = V; W; W = pe(W)) Z++;
									W = 0;
									for (var ve = q; ve; ve = pe(ve)) W++;
									for (; 0 < Z - W; ) ((V = pe(V)), Z--);
									for (; 0 < W - Z; ) ((q = pe(q)), W--);
									for (; Z--; ) {
										if (V === q || (q !== null && V === q.alternate)) {
											pe = V;
											break t;
										}
										((V = pe(V)), (q = pe(q)));
									}
									pe = null;
								}
							else pe = null;
							(K !== null && $g(ee, Y, K, pe, !1), ce !== null && Ke !== null && $g(ee, Ke, ce, pe, !0));
						}
					}
					e: {
						if (
							((Y = P ? Wa(P) : window),
							(K = Y.nodeName && Y.nodeName.toLowerCase()),
							K === "select" || (K === "input" && Y.type === "file"))
						)
							var $e = am;
						else if (im(Y))
							if (um) $e = xw;
							else {
								$e = ww;
								var he = Sw;
							}
						else
							((K = Y.nodeName),
								!K || K.toLowerCase() !== "input" || (Y.type !== "checkbox" && Y.type !== "radio")
									? P && Vo(P.elementType) && ($e = am)
									: ($e = _w));
						if ($e && ($e = $e(t, P))) {
							rm(ee, $e, a, J);
							break e;
						}
						(he && he(t, Y, P),
							t === "focusout" &&
								P &&
								Y.type === "number" &&
								P.memoizedProps.value != null &&
								Bo(Y, "number", Y.value));
					}
					switch (((he = P ? Wa(P) : window), t)) {
						case "focusin":
							(im(he) || he.contentEditable === "true") && ((Wr = he), (nc = P), (lu = null));
							break;
						case "focusout":
							lu = nc = Wr = null;
							break;
						case "mousedown":
							ic = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((ic = !1), mm(ee, a, J));
							break;
						case "selectionchange":
							if (Cw) break;
						case "keydown":
						case "keyup":
							mm(ee, a, J);
					}
					var Te;
					if (Jo)
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
						Jr
							? tm(t, a) && (ke = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
					(ke &&
						(Jh &&
							a.locale !== "ko" &&
							(Jr || ke !== "onCompositionStart"
								? ke === "onCompositionEnd" && Jr && (Te = Yh())
								: ((zi = J), (Yo = "value" in zi ? zi.value : zi.textContent), (Jr = !0))),
						(he = xl(P, ke)),
						0 < he.length &&
							((ke = new Gh(ke, t, null, a, J)),
							ee.push({ event: ke, listeners: he }),
							Te ? (ke.data = Te) : ((Te = nm(a)), Te !== null && (ke.data = Te)))),
						(Te = vw ? gw(t, a) : yw(t, a)) &&
							((ke = xl(P, "onBeforeInput")),
							0 < ke.length &&
								((he = new Gh("onBeforeInput", "beforeinput", null, a, J)),
								ee.push({ event: he, listeners: ke }),
								(he.data = Te))),
						f_(ee, t, P, a, J));
				}
				Ig(ee, i);
			});
		}
		function ku(t, i, a) {
			return { instance: t, listener: i, currentTarget: a };
		}
		function xl(t, i) {
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
		function h_(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function $g(t, i, a, s, c) {
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
		var m_ = /\r\n?/g,
			v_ = /\u0000|\uFFFD/g;
		function Bg(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					m_,
					`
`,
				)
				.replace(v_, "");
		}
		function Vg(t, i) {
			return ((i = Bg(i)), Bg(t) === i);
		}
		function Fe(t, i, a, s, c, d) {
			switch (a) {
				case "children":
					typeof s == "string"
						? i === "body" || (i === "textarea" && s === "") || Kr(t, s)
						: (typeof s == "number" || typeof s == "bigint") && i !== "body" && Kr(t, "" + s);
					break;
				case "className":
					As(t, "class", s);
					break;
				case "tabIndex":
					As(t, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					As(t, a, s);
					break;
				case "style":
					Zh(t, s, d);
					break;
				case "data":
					if (i !== "object") {
						As(t, "data", s);
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
					((s = Os("" + s)), t.setAttribute(a, s));
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
								? (i !== "input" && Fe(t, i, "name", c.name, c, null),
									Fe(t, i, "formEncType", c.formEncType, c, null),
									Fe(t, i, "formMethod", c.formMethod, c, null),
									Fe(t, i, "formTarget", c.formTarget, c, null))
								: (Fe(t, i, "encType", c.encType, c, null),
									Fe(t, i, "method", c.method, c, null),
									Fe(t, i, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Os("" + s)), t.setAttribute(a, s));
					break;
				case "onClick":
					s != null && (t.onclick = ei);
					break;
				case "onScroll":
					s != null && Ne("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Ne("scrollend", t);
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
					((a = Os("" + s)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
					(Ne("beforetoggle", t), Ne("toggle", t), Ts(t, "popover", s));
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
					Ts(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = WS.get(a) || a), Ts(t, a, s));
			}
		}
		function Rf(t, i, a, s, c, d) {
			switch (a) {
				case "style":
					Zh(t, s, d);
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
					typeof s == "string" ? Kr(t, s) : (typeof s == "number" || typeof s == "bigint") && Kr(t, "" + s);
					break;
				case "onScroll":
					s != null && Ne("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Ne("scrollend", t);
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
					if (!jh.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(i = a.slice(2, c ? a.length - 7 : void 0)),
								(d = t[Xt] || null),
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
							a in t ? (t[a] = s) : s === !0 ? t.setAttribute(a, "") : Ts(t, a, s);
						}
			}
		}
		function Bt(t, i, a) {
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
										Fe(t, i, d, g, a, null);
								}
						}
					(c && Fe(t, i, "srcSet", a.srcSet, a, null), s && Fe(t, i, "src", a.src, a, null));
					return;
				case "input":
					Ne("invalid", t);
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
										Fe(t, i, s, J, a, null);
								}
						}
					$h(t, d, x, M, P, g, c, !1);
					return;
				case "select":
					(Ne("invalid", t), (s = g = d = null));
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
									Fe(t, i, c, x, a, null);
							}
					((i = d), (a = g), (t.multiple = !!s), i != null ? Fr(t, !!s, i, !1) : a != null && Fr(t, !!s, a, !0));
					return;
				case "textarea":
					(Ne("invalid", t), (d = c = s = null));
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
									Fe(t, i, g, x, a, null);
							}
					Vh(t, s, c, d);
					return;
				case "option":
					for (M in a)
						if (a.hasOwnProperty(M) && ((s = a[M]), s != null))
							switch (M) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									Fe(t, i, M, s, a, null);
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
					for (s = 0; s < zu.length; s++) Ne(zu[s], t);
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
					for (P in a)
						if (a.hasOwnProperty(P) && ((s = a[P]), s != null))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(l(137, i));
								default:
									Fe(t, i, P, s, a, null);
							}
					return;
				default:
					if (Vo(i)) {
						for (J in a) a.hasOwnProperty(J) && ((s = a[J]), s !== void 0 && Rf(t, i, J, s, a, void 0));
						return;
					}
			}
			for (x in a) a.hasOwnProperty(x) && ((s = a[x]), s != null && Fe(t, i, x, s, a, null));
		}
		function g_(t, i, a, s) {
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
									s.hasOwnProperty(K) || Fe(t, i, K, null, s, ee);
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
									K !== ee && Fe(t, i, Y, K, s, ee);
							}
					}
					$o(t, g, x, M, P, J, d, c);
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
									s.hasOwnProperty(d) || Fe(t, i, d, null, s, M);
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
									d !== M && Fe(t, i, c, d, s, M);
							}
					((i = x),
						(a = g),
						(s = K),
						Y != null
							? Fr(t, !!a, Y, !1)
							: !!s != !!a && (i != null ? Fr(t, !!a, i, !0) : Fr(t, !!a, a ? [] : "", !1)));
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
									Fe(t, i, x, null, s, c);
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
									c !== d && Fe(t, i, g, c, s, d);
							}
					Bh(t, Y, K);
					return;
				case "option":
					for (var ce in a)
						if (((Y = a[ce]), a.hasOwnProperty(ce) && Y != null && !s.hasOwnProperty(ce)))
							switch (ce) {
								case "selected":
									t.selected = !1;
									break;
								default:
									Fe(t, i, ce, null, s, Y);
							}
					for (M in s)
						if (((Y = s[M]), (K = a[M]), s.hasOwnProperty(M) && Y !== K && (Y != null || K != null)))
							switch (M) {
								case "selected":
									t.selected = Y && typeof Y != "function" && typeof Y != "symbol";
									break;
								default:
									Fe(t, i, M, Y, s, K);
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
					for (var pe in a)
						((Y = a[pe]), a.hasOwnProperty(pe) && Y != null && !s.hasOwnProperty(pe) && Fe(t, i, pe, null, s, Y));
					for (P in s)
						if (((Y = s[P]), (K = a[P]), s.hasOwnProperty(P) && Y !== K && (Y != null || K != null)))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (Y != null) throw Error(l(137, i));
									break;
								default:
									Fe(t, i, P, Y, s, K);
							}
					return;
				default:
					if (Vo(i)) {
						for (var Ke in a)
							((Y = a[Ke]),
								a.hasOwnProperty(Ke) && Y !== void 0 && !s.hasOwnProperty(Ke) && Rf(t, i, Ke, void 0, s, Y));
						for (J in s)
							((Y = s[J]),
								(K = a[J]),
								!s.hasOwnProperty(J) || Y === K || (Y === void 0 && K === void 0) || Rf(t, i, J, Y, s, K));
						return;
					}
			}
			for (var V in a)
				((Y = a[V]), a.hasOwnProperty(V) && Y != null && !s.hasOwnProperty(V) && Fe(t, i, V, null, s, Y));
			for (ee in s)
				((Y = s[ee]),
					(K = a[ee]),
					!s.hasOwnProperty(ee) || Y === K || (Y == null && K == null) || Fe(t, i, ee, Y, s, K));
		}
		function Hg(t) {
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
		function y_() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						g = c.initiatorType,
						x = c.duration;
					if (d && x && Hg(g)) {
						for (g = 0, x = c.responseEnd, s += 1; s < a.length; s++) {
							var M = a[s],
								P = M.startTime;
							if (P > x) break;
							var J = M.transferSize,
								ee = M.initiatorType;
							J && Hg(ee) && ((M = M.responseEnd), (g += J * (M < x ? 1 : (x - P) / (M - P))));
						}
						if ((--s, (i += (8 * (d + g)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Of = null,
			Nf = null;
		function El(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Zg(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Qg(t, i) {
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
		function Mf(t, i) {
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
		var zf = null;
		function b_() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === zf ? !1 : ((zf = t), !0)) : ((zf = null), !1);
		}
		var Pg = typeof setTimeout == "function" ? setTimeout : void 0,
			p_ = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Yg = typeof Promise == "function" ? Promise : void 0,
			S_ =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Yg < "u"
						? function (t) {
								return Yg.resolve(null).then(t).catch(w_);
							}
						: Pg;
		function w_(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function Yi(t) {
			return t === "head";
		}
		function Fg(t, i) {
			var a = i,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(t.removeChild(c), Ta(i));
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
			Ta(i);
		}
		function Kg(t, i) {
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
		function kf(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var a = i;
				switch (((i = i.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(kf(a), Uo(a));
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
		function __(t, i, a, s) {
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
				if (((t = Nn(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function x_(t, i, a) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = Nn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Gg(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = Nn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Df(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function jf(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function E_(t, i) {
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
		function Nn(t) {
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
		var qf = null;
		function Xg(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (i === 0) return Nn(t.nextSibling);
						i--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Jg(t) {
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
		function Wg(t, i, a) {
			switch (((i = El(a)), t)) {
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
		var Mn = new Map(),
			ey = new Set();
		function Cl(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var yi = B.d;
		B.d = { f: C_, r: T_, D: A_, C: R_, L: O_, m: N_, X: z_, S: M_, M: k_ };
		function C_() {
			var t = yi.f(),
				i = gl();
			return t || i;
		}
		function T_(t) {
			var i = Qr(t);
			i !== null && i.tag === 5 && i.type === "form" ? pv(i) : yi.r(t);
		}
		var xa = typeof document > "u" ? null : document;
		function ty(t, i, a) {
			var s = xa;
			if (s && typeof i == "string" && i) {
				var c = _n(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					ey.has(c) ||
						(ey.add(c),
						(t = { rel: t, crossOrigin: a, href: i }),
						s.querySelector(c) === null &&
							((i = s.createElement("link")), Bt(i, "link", t), jt(i), s.head.appendChild(i))));
			}
		}
		function A_(t) {
			(yi.D(t), ty("dns-prefetch", t, null));
		}
		function R_(t, i) {
			(yi.C(t, i), ty("preconnect", t, i));
		}
		function O_(t, i, a) {
			yi.L(t, i, a);
			var s = xa;
			if (s && t && i) {
				var c = 'link[rel="preload"][as="' + _n(i) + '"]';
				i === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + _n(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + _n(a.imageSizes) + '"]'))
					: (c += '[href="' + _n(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Ea(t);
						break;
					case "script":
						d = Ca(t);
				}
				Mn.has(d) ||
					((t = b({ rel: "preload", href: i === "image" && a && a.imageSrcSet ? void 0 : t, as: i }, a)),
					Mn.set(d, t),
					s.querySelector(c) !== null ||
						(i === "style" && s.querySelector(ju(d))) ||
						(i === "script" && s.querySelector(qu(d))) ||
						((i = s.createElement("link")), Bt(i, "link", t), jt(i), s.head.appendChild(i)));
			}
		}
		function N_(t, i) {
			yi.m(t, i);
			var a = xa;
			if (a && t) {
				var s = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + _n(s) + '"][href="' + _n(t) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Ca(t);
				}
				if (!Mn.has(d) && ((t = b({ rel: "modulepreload", href: t }, i)), Mn.set(d, t), a.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(qu(d))) return;
					}
					((s = a.createElement("link")), Bt(s, "link", t), jt(s), a.head.appendChild(s));
				}
			}
		}
		function M_(t, i, a) {
			yi.S(t, i, a);
			var s = xa;
			if (s && t) {
				var c = Pr(s).hoistableStyles,
					d = Ea(t);
				i = i || "default";
				var g = c.get(d);
				if (!g) {
					var x = { loading: 0, preload: null };
					if ((g = s.querySelector(ju(d)))) x.loading = 5;
					else {
						((t = b({ rel: "stylesheet", href: t, "data-precedence": i }, a)), (a = Mn.get(d)) && If(t, a));
						var M = (g = s.createElement("link"));
						(jt(M),
							Bt(M, "link", t),
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
							Tl(g, i, s));
					}
					((g = { type: "stylesheet", instance: g, count: 1, state: x }), c.set(d, g));
				}
			}
		}
		function z_(t, i) {
			yi.X(t, i);
			var a = xa;
			if (a && t) {
				var s = Pr(a).hoistableScripts,
					c = Ca(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(qu(c))),
					d ||
						((t = b({ src: t, async: !0 }, i)),
						(i = Mn.get(c)) && Uf(t, i),
						(d = a.createElement("script")),
						jt(d),
						Bt(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function k_(t, i) {
			yi.M(t, i);
			var a = xa;
			if (a && t) {
				var s = Pr(a).hoistableScripts,
					c = Ca(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(qu(c))),
					d ||
						((t = b({ src: t, async: !0, type: "module" }, i)),
						(i = Mn.get(c)) && Uf(t, i),
						(d = a.createElement("script")),
						jt(d),
						Bt(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function ny(t, i, a, s) {
			var c = (c = ge.current) ? Cl(c) : null;
			if (!c) throw Error(l(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((i = Ea(a.href)),
							(a = Pr(c).hoistableStyles),
							(s = a.get(i)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), a.set(i, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Ea(a.href);
						var d = Pr(c).hoistableStyles,
							g = d.get(t);
						if (
							(g ||
								((c = c.ownerDocument || c),
								(g = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, g),
								(d = c.querySelector(ju(t))) && !d._p && ((g.instance = d), (g.state.loading = 5)),
								Mn.has(t) ||
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
									Mn.set(t, a),
									d || D_(c, t, a, g.state))),
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
							? ((i = Ca(a)),
								(a = Pr(c).hoistableScripts),
								(s = a.get(i)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), a.set(i, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(l(444, t));
			}
		}
		function Ea(t) {
			return 'href="' + _n(t) + '"';
		}
		function ju(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function iy(t) {
			return b({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function D_(t, i, a, s) {
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
					Bt(i, "link", a),
					jt(i),
					t.head.appendChild(i));
		}
		function Ca(t) {
			return '[src="' + _n(t) + '"]';
		}
		function qu(t) {
			return "script[async]" + t;
		}
		function ry(t, i, a) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + _n(a.href) + '"]');
						if (s) return ((i.instance = s), jt(s), s);
						var c = b({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							jt(s),
							Bt(s, "style", c),
							Tl(s, a.precedence, t),
							(i.instance = s)
						);
					case "stylesheet":
						c = Ea(a.href);
						var d = t.querySelector(ju(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), jt(d), d);
						((s = iy(a)), (c = Mn.get(c)) && If(s, c), (d = (t.ownerDocument || t).createElement("link")), jt(d));
						var g = d;
						return (
							(g._p = new Promise(function (x, M) {
								((g.onload = x), (g.onerror = M));
							})),
							Bt(d, "link", s),
							(i.state.loading |= 4),
							Tl(d, a.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Ca(a.src)),
							(c = t.querySelector(qu(d)))
								? ((i.instance = c), jt(c), c)
								: ((s = a),
									(c = Mn.get(d)) && ((s = b({}, a)), Uf(s, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									jt(c),
									Bt(c, "link", s),
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
					((s = i.instance), (i.state.loading |= 4), Tl(s, a.precedence, t));
			return i.instance;
		}
		function Tl(t, i, a) {
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
		function If(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function Uf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Al = null;
		function ay(t, i, a) {
			if (Al === null) {
				var s = new Map(),
					c = (Al = new Map());
				c.set(a, s);
			} else ((c = Al), (s = c.get(a)), s || ((s = new Map()), c.set(a, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[Ja] || d[It] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
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
		function uy(t, i, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, i === "title" ? t.querySelector("head > title") : null));
		}
		function j_(t, i, a) {
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
		function sy(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function q_(t, i, a, s) {
			if (
				a.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Ea(s.href),
						d = i.querySelector(ju(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Rl.bind(t)), i.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							jt(d));
						return;
					}
					((d = i.ownerDocument || i), (s = iy(s)), (c = Mn.get(c)) && If(s, c), (d = d.createElement("link")), jt(d));
					var g = d;
					((g._p = new Promise(function (x, M) {
						((g.onload = x), (g.onerror = M));
					})),
						Bt(d, "link", s),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, i),
					(i = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Rl.bind(t)), i.addEventListener("load", a), i.addEventListener("error", a)));
			}
		}
		var Lf = 0;
		function I_(t, i) {
			return (
				t.stylesheets && t.count === 0 && Nl(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var s = setTimeout(function () {
								if ((t.stylesheets && Nl(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && Lf === 0 && (Lf = 62500 * y_());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Nl(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > Lf ? 50 : 800) + i,
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
		function Rl() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Nl(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Ol = null;
		function Nl(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Ol = new Map()), i.forEach(U_, t), (Ol = null), Rl.call(t)));
		}
		function U_(t, i) {
			if (!(i.state.loading & 4)) {
				var a = Ol.get(t);
				if (a) var s = a.get(null);
				else {
					((a = new Map()), Ol.set(t, a));
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
					(s = Rl.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var Iu = { $$typeof: R, Provider: null, Consumer: null, _currentValue: ue, _currentValue2: ue, _threadCount: 0 };
		function L_(t, i, a, s, c, d, g, x, M) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = jo(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = jo(0)),
				(this.hiddenUpdates = jo(null)),
				(this.identifierPrefix = s),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = g),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = M),
				(this.incompleteTransitions = new Map()));
		}
		function $_(t, i, a, s, c, d, g, x, M, P, J, ee) {
			return (
				(t = new L_(t, i, a, g, M, P, J, ee, x)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = mn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = bc()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: s, isDehydrated: a, cache: i }),
				_c(d),
				t
			);
		}
		function B_(t) {
			return t ? ((t = na), t) : na;
		}
		function ly(t, i, a, s, c, d) {
			((c = B_(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = Er(i)),
				(s.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(a = Cr(t, s, i)),
				a !== null && (rn(a, t, i), vu(a, t, i)));
		}
		function oy(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < i ? a : i;
			}
		}
		function $f(t, i) {
			(oy(t, i), (t = t.alternate) && oy(t, i));
		}
		function cy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = vr(t, 67108864);
				(i !== null && rn(i, t, 67108864), $f(t, 67108864));
			}
		}
		function fy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = On();
				i = Nh(i);
				var a = vr(t, i);
				(a !== null && rn(a, t, i), $f(t, i));
			}
		}
		var Ml = !0;
		function V_(t, i, a, s) {
			var c = H.T;
			H.T = null;
			var d = B.p;
			try {
				((B.p = 2), Bf(t, i, a, s));
			} finally {
				((B.p = d), (H.T = c));
			}
		}
		function H_(t, i, a, s) {
			var c = H.T;
			H.T = null;
			var d = B.p;
			try {
				((B.p = 8), Bf(t, i, a, s));
			} finally {
				((B.p = d), (H.T = c));
			}
		}
		function Bf(t, i, a, s) {
			if (Ml) {
				var c = Vf(s);
				if (c === null) (Af(t, i, s, zl, a), hy(t, s));
				else if (Q_(c, t, i, a, s)) s.stopPropagation();
				else if ((hy(t, s), i & 4 && -1 < Z_.indexOf(t))) {
					for (; c !== null; ) {
						var d = Qr(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var g = cr(d.pendingLanes);
										if (g !== 0) {
											var x = d;
											for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
												var M = 1 << (31 - dn(g));
												((x.entanglements[1] |= M), (g &= ~M));
											}
											(gi(d), (He & 6) === 0 && ((ml = Re() + 500), Mu(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((x = vr(d, 2)), x !== null && rn(x, d, 2), gl(), $f(d, 2));
							}
						if (((d = Vf(s)), d === null && Af(t, i, s, zl, a), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Af(t, i, s, null, a);
			}
		}
		function Vf(t) {
			return ((t = Zo(t)), Hf(t));
		}
		var zl = null;
		function Hf(t) {
			if (((zl = null), (t = Zr(t)), t !== null)) {
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
			return ((zl = t), null);
		}
		function dy(t) {
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
					switch (ft()) {
						case Gt:
							return 2;
						case st:
							return 8;
						case se:
						case xe:
							return 32;
						case vt:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Zf = !1,
			Fi = null,
			Ki = null,
			Gi = null,
			Uu = new Map(),
			Lu = new Map(),
			Xi = [],
			Z_ =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function hy(t, i) {
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
					i !== null && ((i = Qr(i)), i !== null && cy(i)),
					t)
				: ((t.eventSystemFlags |= s), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Q_(t, i, a, s, c) {
			switch (i) {
				case "focusin":
					return ((Fi = $u(Fi, t, i, a, s, c)), !0);
				case "dragenter":
					return ((Ki = $u(Ki, t, i, a, s, c)), !0);
				case "mouseover":
					return ((Gi = $u(Gi, t, i, a, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Uu.set(d, $u(Uu.get(d) || null, t, i, a, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Lu.set(d, $u(Lu.get(d) || null, t, i, a, s, c)), !0);
			}
			return !1;
		}
		function my(t) {
			var i = Zr(t.target);
			if (i !== null) {
				var a = f(i);
				if (a !== null) {
					if (((i = a.tag), i === 13)) {
						if (((i = h(a)), i !== null)) {
							((t.blockedOn = i),
								zh(t.priority, function () {
									fy(a);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(a)), i !== null)) {
							((t.blockedOn = i),
								zh(t.priority, function () {
									fy(a);
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
		function kl(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var a = Vf(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var s = new a.constructor(a.type, a);
					((Ho = s), a.target.dispatchEvent(s), (Ho = null));
				} else return ((i = Qr(a)), i !== null && cy(i), (t.blockedOn = a), !1);
				i.shift();
			}
			return !0;
		}
		function vy(t, i, a) {
			kl(t) && a.delete(i);
		}
		function P_() {
			((Zf = !1),
				Fi !== null && kl(Fi) && (Fi = null),
				Ki !== null && kl(Ki) && (Ki = null),
				Gi !== null && kl(Gi) && (Gi = null),
				Uu.forEach(vy),
				Lu.forEach(vy));
		}
		function Dl(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), Zf || ((Zf = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, P_)));
		}
		var jl = null;
		function gy(t) {
			jl !== t &&
				((jl = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					jl === t && (jl = null);
					for (var i = 0; i < t.length; i += 3) {
						var a = t[i],
							s = t[i + 1],
							c = t[i + 2];
						if (typeof s != "function") {
							if (Hf(s || a) === null) continue;
							break;
						}
						var d = Qr(a);
						d !== null &&
							(t.splice(i, 3), (i -= 3), Vc(d, { pending: !0, data: c, method: a.method, action: s }, s, c));
					}
				}));
		}
		function Ta(t) {
			function i(M) {
				return Dl(M, t);
			}
			(Fi !== null && Dl(Fi, t), Ki !== null && Dl(Ki, t), Gi !== null && Dl(Gi, t), Uu.forEach(i), Lu.forEach(i));
			for (var a = 0; a < Xi.length; a++) {
				var s = Xi[a];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Xi.length && ((a = Xi[0]), a.blockedOn === null); ) (my(a), a.blockedOn === null && Xi.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (s = 0; s < a.length; s += 3) {
					var c = a[s],
						d = a[s + 1],
						g = c[Xt] || null;
					if (typeof d == "function") g || gy(a);
					else if (g) {
						var x = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (g = d[Xt] || null))) x = g.formAction;
							else if (Hf(c) !== null) continue;
						} else x = g.action;
						(typeof x == "function" ? (a[s + 1] = x) : (a.splice(s, 3), (s -= 3)), gy(a));
					}
				}
		}
		function Y_() {
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
		function Qf(t) {
			this._internalRoot = t;
		}
		((Pf.prototype.render = Qf.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(l(409));
				var a = i.current;
				ly(a, On(), t, i, null, null);
			}),
			(Pf.prototype.unmount = Qf.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(ly(t.current, 2, null, t, null, null), gl(), (i[Xa] = null));
					}
				}));
		function Pf(t) {
			this._internalRoot = t;
		}
		Pf.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = Mh();
				t = { blockedOn: null, target: t, priority: i };
				for (var a = 0; a < Xi.length && i !== 0 && i < Xi[a].priority; a++);
				(Xi.splice(a, 0, t), a === 0 && my(t));
			}
		};
		var yy = r.version;
		if (yy !== "19.2.8") throw Error(l(527, yy, "19.2.8"));
		B.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(l(188)) : ((t = Object.keys(t).join(",")), Error(l(268, t)));
			return ((t = y(i)), (t = t !== null ? w(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var F_ = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: H,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var ql = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!ql.isDisabled && ql.supportsFiber)
				try {
					((Ka = ql.inject(F_)), (fn = ql));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(l(299));
			var a = !1,
				s = "",
				c = Hw,
				d = Zw,
				g = Qw;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (a = !0),
					i.identifierPrefix !== void 0 && (s = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (g = i.onRecoverableError)),
				(i = $_(t, 1, !1, null, null, a, s, null, c, d, g, Y_)),
				(t[Xa] = i.current),
				Ug(t),
				new Qf(i)
			);
		};
	}),
	aE = kn((e, n) => {
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
		(r(), (n.exports = rE()));
	}),
	uE = aE(),
	Se = _b,
	bk = Qx(),
	sE = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	Mb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	zb = {
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
	lE = "Someone with no name yet";
function kb(e) {
	return e !== null && e !== "" ? e : lE;
}
function oE(e, n) {
	const r = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (r === null) return null;
	const u = r[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function cE(e, n, r) {
	const u = n.toLowerCase();
	return e
		.filter((l) => l.userId !== r)
		.map((l) => ({ ...l, label: kb(l.displayName) }))
		.filter((l) => l.label.toLowerCase().includes(u))
		.sort((l, o) => l.label.localeCompare(o.label));
}
function fE(e, n, r, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(r)}`, caret: n + u.length + 2 };
}
function dE(e, n) {
	const r = [];
	for (const [u, l] of e) n.includes(`@${l}`) && r.push(u);
	return r;
}
function so(e, n) {
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
function lo(e) {
	return e instanceof Error ? e.message : String(e);
}
var hE = kn((e) => {
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
	mE = kn((e, n) => {
		n.exports = hE();
	}),
	p = mE();
function _i(e) {
	const [n, r] = (0, _.useState)({ key: e, cursor: null, previous: [], number: 1 });
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
function tr(e) {
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
function et(e, n, ...r) {
	const u = Xu(n, ...(e.ready || e.refreshing ? r : ["skip"])),
		l = JSON.stringify([
			Pt(n),
			r,
			e.member?.hostUserId,
			e.member?.installationId,
			e.member?.generation,
			e.member?.membershipLifetime,
		]),
		[o, f] = (0, _.useState)({ key: l, value: e.refreshing ? void 0 : u }),
		h = e.refreshing ? (r[0] !== "skip" && o.key === l ? o.value : void 0) : u;
	return ((o.key !== l || o.value !== h) && f({ key: l, value: h }), h);
}
var Ju = Nb(),
	pd =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Uy(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(pd) ? n : (e.querySelector(pd) ?? e);
}
function Va(e) {
	const n = (0, _.useRef)(null);
	((0, _.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			l = n.current;
		return (
			(l === null ? null : Uy(l))?.focus(),
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
		(0, _.useEffect)(() => {
			const u = n.current;
			if (!u) return;
			const l = () => {
					!u.isConnected || document.activeElement !== document.body || Uy(u).focus();
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
		const o = [...l.querySelectorAll(pd)];
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
	return (0, Ju.createPortal)(
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
var Ly;
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
		for (let w = 0; w < y.length; w++) {
			const b = y[w];
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
var Da = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Db = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Ly = globalThis).__zod_globalConfig ?? (Ly.__zod_globalConfig = {});
var Gl = globalThis.__zod_globalConfig;
function jr(e) {
	return (e && Object.assign(Gl, e), Gl);
}
function jb(e) {
	const n = Object.values(e).filter((r) => typeof r == "number");
	return Object.entries(e)
		.filter(([r, u]) => n.indexOf(+r) === -1)
		.map(([r, u]) => u);
}
function Sd(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function Ld(e) {
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
function $d(e) {
	return e == null;
}
function Bd(e) {
	const n = e.startsWith("^") ? 1 : 0,
		r = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, r);
}
function vE(e, n) {
	const r = e / n,
		u = Math.round(r),
		l = Number.EPSILON * Math.max(Math.abs(r), 1);
	return Math.abs(r - u) < l ? 0 : r - u;
}
var $y = Symbol("evaluating");
function Ge(e, n, r) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== $y) return (u === void 0 && ((u = $y), (u = r())), u);
		},
		set(l) {
			Object.defineProperty(e, n, { value: l });
		},
		configurable: !0,
	});
}
function Br(e, n, r) {
	Object.defineProperty(e, n, { value: r, writable: !0, enumerable: !0, configurable: !0 });
}
function sr(...e) {
	const n = {};
	for (const r of e) {
		const u = Object.getOwnPropertyDescriptors(r);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function By(e) {
	return JSON.stringify(e);
}
function gE(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var qb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Xl(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var yE = Ld(() => {
	if (Gl.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Wu(e) {
	if (Xl(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const r = n.prototype;
	return !(Xl(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function Ib(e) {
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
var bE = new Set(["string", "number", "symbol"]);
function oo(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function lr(e, n, r) {
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
function pE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var SE = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function wE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return lr(
		e,
		sr(e._zod.def, {
			get shape() {
				const l = {};
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (l[o] = r.shape[o]);
				}
				return (Br(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function _E(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return lr(
		e,
		sr(e._zod.def, {
			get shape() {
				const l = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete l[o];
				}
				return (Br(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function xE(e, n) {
	if (!Wu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const r = e._zod.def.checks;
	if (r && r.length > 0) {
		const u = e._zod.def.shape;
		for (const l in n)
			if (Object.getOwnPropertyDescriptor(u, l) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return lr(
		e,
		sr(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (Br(this, "shape", u), u);
			},
		}),
	);
}
function EE(e, n) {
	if (!Wu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return lr(
		e,
		sr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n };
				return (Br(this, "shape", r), r);
			},
		}),
	);
}
function CE(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return lr(
		e,
		sr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (Br(this, "shape", r), r);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function TE(e, n, r) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return lr(
		n,
		sr(n._zod.def, {
			get shape() {
				const l = n._zod.def.shape,
					o = { ...l };
				if (r)
					for (const f in r) {
						if (!(f in l)) throw new Error(`Unrecognized key: "${f}"`);
						r[f] && (o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f]);
					}
				else for (const f in l) o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f];
				return (Br(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function AE(e, n, r) {
	return lr(
		n,
		sr(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					l = { ...u };
				if (r)
					for (const o in r) {
						if (!(o in l)) throw new Error(`Unrecognized key: "${o}"`);
						r[o] && (l[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) l[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Br(this, "shape", l), l);
			},
		}),
	);
}
function za(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
	return !1;
}
function RE(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue === !1) return !0;
	return !1;
}
function Ub(e, n) {
	return n.map((r) => {
		var u;
		return ((u = r).path ?? (u.path = []), r.path.unshift(e), r);
	});
}
function Ll(e) {
	return typeof e == "string" ? e : e?.message;
}
function qr(e, n, r) {
	const u = e.message
			? e.message
			: (Ll(e.inst?._zod.def?.error?.(e)) ??
				Ll(n?.error?.(e)) ??
				Ll(r.customError?.(e)) ??
				Ll(r.localeError?.(e)) ??
				"Invalid input"),
		{ inst: l, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function Vd(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function es(...e) {
	const [n, r, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: r, inst: u } : { ...n };
}
var Lb = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, Sd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	$b = te("$ZodError", Lb),
	Bb = te("$ZodError", Lb, { Parent: Error });
function OE(e, n = (r) => r.message) {
	const r = {},
		u = [];
	for (const l of e.issues)
		l.path.length > 0 ? ((r[l.path[0]] = r[l.path[0]] || []), r[l.path[0]].push(n(l))) : u.push(n(l));
	return { formErrors: u, fieldErrors: r };
}
function NE(e, n = (r) => r.message) {
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
var Hd = (e) => (n, r, u, l) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: r, issues: [] }, o);
		if (f instanceof Promise) throw new Da();
		if (f.issues.length) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => qr(m, o, jr())));
			throw (qb(h, l?.callee), h);
		}
		return f.value;
	},
	Zd = (e) => async (n, r, u, l) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: r, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => qr(m, o, jr())));
			throw (qb(h, l?.callee), h);
		}
		return f.value;
	},
	co = (e) => (n, r, u) => {
		const l = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: r, issues: [] }, l);
		if (o instanceof Promise) throw new Da();
		return o.issues.length
			? { success: !1, error: new (e ?? $b)(o.issues.map((f) => qr(f, l, jr()))) }
			: { success: !0, data: o.value };
	},
	ME = co(Bb),
	fo = (e) => async (n, r, u) => {
		const l = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: r, issues: [] }, l);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => qr(f, l, jr()))) }
				: { success: !0, data: o.value }
		);
	},
	zE = fo(Bb),
	kE = (e) => (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Hd(e)(n, r, l);
	},
	DE = (e) => (n, r, u) => Hd(e)(n, r, u),
	jE = (e) => async (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Zd(e)(n, r, l);
	},
	qE = (e) => async (n, r, u) => Zd(e)(n, r, u),
	IE = (e) => (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return co(e)(n, r, l);
	},
	UE = (e) => (n, r, u) => co(e)(n, r, u),
	LE = (e) => async (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return fo(e)(n, r, l);
	},
	$E = (e) => async (n, r, u) => fo(e)(n, r, u),
	BE = /^[cC][0-9a-z]{6,}$/,
	VE = /^[0-9a-z]+$/,
	HE = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	ZE = /^[0-9a-vA-V]{20}$/,
	QE = /^[A-Za-z0-9]{27}$/,
	PE = /^[a-zA-Z0-9_-]{21}$/,
	YE = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	FE = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Vy = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	KE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	GE = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function XE() {
	return new RegExp(GE, "u");
}
var JE =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	WE =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	eC =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	tC =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	nC = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Vb = /^[A-Za-z0-9_-]*$/,
	iC = /^https?$/,
	rC = /^\+[1-9]\d{6,14}$/,
	Hb =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	aC = new RegExp(`^${Hb}$`);
function Zb(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function uC(e) {
	return new RegExp(`^${Zb(e)}$`);
}
function sC(e) {
	const n = Zb({ precision: e.precision }),
		r = ["Z"];
	(e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${r.join("|")})`;
	return new RegExp(`^${Hb}T(?:${u})$`);
}
var lC = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	oC = /^-?\d+$/,
	cC = /^-?\d+(?:\.\d+)?$/,
	fC = /^[^A-Z]*$/,
	dC = /^[^a-z]*$/,
	on = te("$ZodCheck", (e, n) => {
		var r;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (r = e._zod).onattach ?? (r.onattach = []));
	}),
	Qb = { number: "number", bigint: "bigint", object: "date" },
	Pb = te("$ZodCheckLessThan", (e, n) => {
		on.init(e, n);
		const r = Qb[typeof n.value];
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
	Yb = te("$ZodCheckGreaterThan", (e, n) => {
		on.init(e, n);
		const r = Qb[typeof n.value];
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
	hC = te("$ZodCheckMultipleOf", (e, n) => {
		(on.init(e, n),
			e._zod.onattach.push((r) => {
				var u;
				(u = r._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (r) => {
				if (typeof r.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof r.value == "bigint" ? r.value % n.value === BigInt(0) : vE(r.value, n.value) === 0) ||
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
	mC = te("$ZodCheckNumberFormat", (e, n) => {
		(on.init(e, n), (n.format = n.format || "float64"));
		const r = n.format?.includes("int"),
			u = r ? "int" : "number",
			[l, o] = SE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = l), (h.maximum = o), r && (h.pattern = oC));
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
	vC = te("$ZodCheckMaxLength", (e, n) => {
		var r;
		(on.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const l = u.value;
					return !$d(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < l && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length <= n.maximum) return;
				const o = Vd(l);
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
	gC = te("$ZodCheckMinLength", (e, n) => {
		var r;
		(on.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const l = u.value;
					return !$d(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > l && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length >= n.minimum) return;
				const o = Vd(l);
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
	yC = te("$ZodCheckLengthEquals", (e, n) => {
		var r;
		(on.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const l = u.value;
					return !$d(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				((l.minimum = n.length), (l.maximum = n.length), (l.length = n.length));
			}),
			(e._zod.check = (u) => {
				const l = u.value,
					o = l.length;
				if (o === n.length) return;
				const f = Vd(l),
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
	ho = te("$ZodCheckStringFormat", (e, n) => {
		var r, u;
		(on.init(e, n),
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
	bC = te("$ZodCheckRegex", (e, n) => {
		(ho.init(e, n),
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
	pC = te("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = fC), ho.init(e, n));
	}),
	SC = te("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = dC), ho.init(e, n));
	}),
	wC = te("$ZodCheckIncludes", (e, n) => {
		on.init(e, n);
		const r = oo(n.includes),
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
	_C = te("$ZodCheckStartsWith", (e, n) => {
		on.init(e, n);
		const r = new RegExp(`^${oo(n.prefix)}.*`);
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
	xC = te("$ZodCheckEndsWith", (e, n) => {
		on.init(e, n);
		const r = new RegExp(`.*${oo(n.suffix)}$`);
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
	EC = te("$ZodCheckOverwrite", (e, n) => {
		(on.init(e, n),
			(e._zod.check = (r) => {
				r.value = n.tx(r.value);
			}));
	}),
	CC = class {
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
	TC = { major: 4, minor: 4, patch: 3 },
	Nt = te("$ZodType", (e, n) => {
		var r;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = TC));
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
					let v = za(f),
						y;
					for (const w of h) {
						if (w._zod.def.when) {
							if (RE(f) || !w._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							S = w._zod.check(f);
						if (S instanceof Promise && m?.async === !1) throw new Da();
						if (y || S instanceof Promise)
							y = (y ?? Promise.resolve()).then(async () => {
								(await S, f.issues.length !== b && (v || (v = za(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = za(f, b));
						}
					}
					return y ? y.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (za(f)) return ((f.aborted = !0), f);
					const v = l(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Da();
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
					if (h.async === !1) throw new Da();
					return m.then((v) => l(v, u, h));
				}
				return l(m, u, h);
			};
		}
		Ge(e, "~standard", () => ({
			validate: (l) => {
				try {
					const o = ME(e, l);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return zE(e, l).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	Qd = te("$ZodString", (e, n) => {
		(Nt.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? lC(e._zod.bag)),
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
	at = te("$ZodStringFormat", (e, n) => {
		(ho.init(e, n), Qd.init(e, n));
	}),
	AC = te("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = FE), at.init(e, n));
	}),
	RC = te("$ZodUUID", (e, n) => {
		if (n.version) {
			const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (r === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = Vy(r));
		} else n.pattern ?? (n.pattern = Vy());
		at.init(e, n);
	}),
	OC = te("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = KE), at.init(e, n));
	}),
	NC = te("$ZodURL", (e, n) => {
		(at.init(e, n),
			(e._zod.check = (r) => {
				try {
					const u = r.value.trim();
					if (!n.normalize && n.protocol?.source === iC.source && !/^https?:\/\//i.test(u)) {
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
	MC = te("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = XE()), at.init(e, n));
	}),
	zC = te("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = PE), at.init(e, n));
	}),
	kC = te("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = BE), at.init(e, n));
	}),
	DC = te("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = VE), at.init(e, n));
	}),
	jC = te("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = HE), at.init(e, n));
	}),
	qC = te("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = ZE), at.init(e, n));
	}),
	IC = te("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = QE), at.init(e, n));
	}),
	UC = te("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = sC(n)), at.init(e, n));
	}),
	LC = te("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = aC), at.init(e, n));
	}),
	$C = te("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = uC(n)), at.init(e, n));
	}),
	BC = te("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = YE), at.init(e, n));
	}),
	VC = te("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = JE), at.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	HC = te("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = WE),
			at.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (r) => {
				try {
					new URL(`http://[${r.value}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "ipv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	ZC = te("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = eC), at.init(e, n));
	}),
	QC = te("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = tC),
			at.init(e, n),
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
function Fb(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var PC = te("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = nC),
		at.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (r) => {
			Fb(r.value) ||
				r.issues.push({ code: "invalid_format", format: "base64", input: r.value, inst: e, continue: !n.abort });
		}));
});
function YC(e) {
	if (!Vb.test(e)) return !1;
	const n = e.replace(/[-_]/g, (r) => (r === "-" ? "+" : "/"));
	return Fb(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var FC = te("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Vb),
			at.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (r) => {
				YC(r.value) ||
					r.issues.push({ code: "invalid_format", format: "base64url", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	KC = te("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = rC), at.init(e, n));
	});
function GC(e, n = null) {
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
var XC = te("$ZodJWT", (e, n) => {
		(at.init(e, n),
			(e._zod.check = (r) => {
				GC(r.value, n.alg) ||
					r.issues.push({ code: "invalid_format", format: "jwt", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	Kb = te("$ZodNumber", (e, n) => {
		(Nt.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? cC),
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
	JC = te("$ZodNumberFormat", (e, n) => {
		(mC.init(e, n), Kb.init(e, n));
	}),
	WC = te("$ZodUnknown", (e, n) => {
		(Nt.init(e, n), (e._zod.parse = (r) => r));
	}),
	eT = te("$ZodNever", (e, n) => {
		(Nt.init(e, n),
			(e._zod.parse = (r, u) => (
				r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
				r
			)));
	});
function Hy(e, n, r) {
	(e.issues.length && n.issues.push(...Ub(r, e.issues)), (n.value[r] = e.value));
}
var tT = te("$ZodArray", (e, n) => {
	(Nt.init(e, n),
		(e._zod.parse = (r, u) => {
			const l = r.value;
			if (!Array.isArray(l)) return (r.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), r);
			r.value = Array(l.length);
			const o = [];
			for (let f = 0; f < l.length; f++) {
				const h = l[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => Hy(v, r, f))) : Hy(m, r, f);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		}));
});
function Jl(e, n, r, u, l, o) {
	const f = r in u;
	if (e.issues.length) {
		if (l && o && !f) return;
		n.issues.push(...Ub(r, e.issues));
	}
	if (!f && !l) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
		return;
	}
	e.value === void 0 ? f && (n.value[r] = void 0) : (n.value[r] = e.value);
}
function Gb(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const r = pE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(r) };
}
function Xb(e, n, r, u, l, o) {
	const f = [],
		h = l.keySet,
		m = l.catchall._zod,
		v = m.def.type,
		y = m.optin === "optional",
		w = m.optout === "optional";
	for (const b in n) {
		if (b === "__proto__" || h.has(b)) continue;
		if (v === "never") {
			f.push(b);
			continue;
		}
		const S = m.run({ value: n[b], issues: [] }, u);
		S instanceof Promise ? e.push(S.then((E) => Jl(E, r, b, n, y, w))) : Jl(S, r, b, n, y, w);
	}
	return (
		f.length && r.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => r) : r
	);
}
var nT = te("$ZodObject", (e, n) => {
		if ((Nt.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const r = Ld(() => Gb(n));
		Ge(e._zod, "propValues", () => {
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
		const u = Xl,
			l = n.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = r.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				y = o.shape;
			for (const w of o.keys) {
				const b = y[w],
					S = b._zod.optin === "optional",
					E = b._zod.optout === "optional",
					C = b._zod.run({ value: m[w], issues: [] }, h);
				C instanceof Promise ? v.push(C.then((T) => Jl(T, f, w, m, S, E))) : Jl(C, f, w, m, S, E);
			}
			return l ? Xb(v, m, f, h, r.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	iT = te("$ZodObjectJIT", (e, n) => {
		nT.init(e, n);
		const r = e._zod.parse,
			u = Ld(() => Gb(n)),
			l = (b) => {
				const S = new CC(["shape", "payload", "ctx"]),
					E = u.value,
					C = (N) => {
						const R = By(N);
						return `shape[${R}]._zod.run({ value: input[${R}], issues: [] }, ctx)`;
					};
				S.write("const input = payload.value;");
				const T = Object.create(null);
				let D = 0;
				for (const N of E.keys) T[N] = `key_${D++}`;
				S.write("const newResult = {};");
				for (const N of E.keys) {
					const R = T[N],
						$ = By(N),
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
		const f = Xl,
			h = !Gl.jitless,
			v = h && yE.value,
			y = n.catchall;
		let w;
		e._zod.parse = (b, S) => {
			w ?? (w = u.value);
			const E = b.value;
			return f(E)
				? h && v && S?.async === !1 && S.jitless !== !0
					? (o || (o = l(n.shape)), (b = o(b, S)), y ? Xb([], E, b, S, w, e) : b)
					: r(b, S)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function Zy(e, n, r, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const l = e.filter((o) => !za(o));
	return l.length === 1
		? ((n.value = l[0].value), l[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: r,
				errors: e.map((o) => o.issues.map((f) => qr(f, u, jr()))),
			}),
			n);
}
var rT = te("$ZodUnion", (e, n) => {
		(Nt.init(e, n),
			Ge(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			Ge(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			Ge(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			Ge(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => Bd(l.source)).join("|")})$`);
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
			return o ? Promise.all(f).then((h) => Zy(h, u, e, l)) : Zy(f, u, e, l);
		};
	}),
	aT = te("$ZodIntersection", (e, n) => {
		(Nt.init(e, n),
			(e._zod.parse = (r, u) => {
				const l = r.value,
					o = n.left._zod.run({ value: l, issues: [] }, u),
					f = n.right._zod.run({ value: l, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Qy(r, h, m))
					: Qy(r, o, f);
			}));
	});
function wd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (Wu(e) && Wu(n)) {
		const r = Object.keys(n),
			u = Object.keys(e).filter((o) => r.indexOf(o) !== -1),
			l = { ...e, ...n };
		for (const o of u) {
			const f = wd(e[o], n[o]);
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
				f = wd(l, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			r.push(f.data);
		}
		return { valid: !0, data: r };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Qy(e, n, r) {
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
	if ((o.length && l && e.issues.push({ ...l, keys: o }), za(e))) return e;
	const f = wd(n.value, r.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var uT = te("$ZodEnum", (e, n) => {
		Nt.init(e, n);
		const r = jb(n.entries),
			u = new Set(r);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${r
					.filter((l) => bE.has(typeof l))
					.map((l) => (typeof l == "string" ? oo(l) : l.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (l, o) => {
				const f = l.value;
				return (u.has(f) || l.issues.push({ code: "invalid_value", values: r, input: f, inst: e }), l);
			}));
	}),
	sT = te("$ZodTransform", (e, n) => {
		(Nt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") throw new Db(e.constructor.name);
				const l = n.transform(r.value, r);
				if (u.async)
					return (l instanceof Promise ? l : Promise.resolve(l)).then((o) => ((r.value = o), (r.fallback = !0), r));
				if (l instanceof Promise) throw new Da();
				return ((r.value = l), (r.fallback = !0), r);
			}));
	});
function Py(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Jb = te("$ZodOptional", (e, n) => {
		(Nt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			Ge(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			Ge(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${Bd(r.source)})?$`) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				if (n.innerType._zod.optin === "optional") {
					const l = r.value,
						o = n.innerType._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => Py(f, l)) : Py(o, l);
				}
				return r.value === void 0 ? r : n.innerType._zod.run(r, u);
			}));
	}),
	lT = te("$ZodExactOptional", (e, n) => {
		(Jb.init(e, n),
			Ge(e._zod, "values", () => n.innerType._zod.values),
			Ge(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (r, u) => n.innerType._zod.run(r, u)));
	}),
	oT = te("$ZodNullable", (e, n) => {
		(Nt.init(e, n),
			Ge(e._zod, "optin", () => n.innerType._zod.optin),
			Ge(e._zod, "optout", () => n.innerType._zod.optout),
			Ge(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${Bd(r.source)}|null)$`) : void 0;
			}),
			Ge(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (r, u) => (r.value === null ? r : n.innerType._zod.run(r, u))));
	}),
	cT = te("$ZodDefault", (e, n) => {
		(Nt.init(e, n),
			(e._zod.optin = "optional"),
			Ge(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				if (r.value === void 0) return ((r.value = n.defaultValue), r);
				const l = n.innerType._zod.run(r, u);
				return l instanceof Promise ? l.then((o) => Yy(o, n)) : Yy(l, n);
			}));
	});
function Yy(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var fT = te("$ZodPrefault", (e, n) => {
		(Nt.init(e, n),
			(e._zod.optin = "optional"),
			Ge(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => (
				u.direction === "backward" || (r.value === void 0 && (r.value = n.defaultValue)),
				n.innerType._zod.run(r, u)
			)));
	}),
	dT = te("$ZodNonOptional", (e, n) => {
		(Nt.init(e, n),
			Ge(e._zod, "values", () => {
				const r = n.innerType._zod.values;
				return r ? new Set([...r].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				const l = n.innerType._zod.run(r, u);
				return l instanceof Promise ? l.then((o) => Fy(o, e)) : Fy(l, e);
			}));
	});
function Fy(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var hT = te("$ZodCatch", (e, n) => {
		(Nt.init(e, n),
			(e._zod.optin = "optional"),
			Ge(e._zod, "optout", () => n.innerType._zod.optout),
			Ge(e._zod, "values", () => n.innerType._zod.values),
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
										error: { issues: o.issues.map((f) => qr(f, u, jr())) },
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
								error: { issues: l.issues.map((o) => qr(o, u, jr())) },
								input: r.value,
							})),
							(r.issues = []),
							(r.fallback = !0)),
						r);
			}));
	}),
	mT = te("$ZodPipe", (e, n) => {
		(Nt.init(e, n),
			Ge(e._zod, "values", () => n.in._zod.values),
			Ge(e._zod, "optin", () => n.in._zod.optin),
			Ge(e._zod, "optout", () => n.out._zod.optout),
			Ge(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => $l(f, n.in, u)) : $l(o, n.in, u);
				}
				const l = n.in._zod.run(r, u);
				return l instanceof Promise ? l.then((o) => $l(o, n.out, u)) : $l(l, n.out, u);
			}));
	});
function $l(e, n, r) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, r);
}
var vT = te("$ZodReadonly", (e, n) => {
	(Nt.init(e, n),
		Ge(e._zod, "propValues", () => n.innerType._zod.propValues),
		Ge(e._zod, "values", () => n.innerType._zod.values),
		Ge(e._zod, "optin", () => n.innerType?._zod?.optin),
		Ge(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(r, u);
			const l = n.innerType._zod.run(r, u);
			return l instanceof Promise ? l.then(Ky) : Ky(l);
		}));
});
function Ky(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var gT = te("$ZodCustom", (e, n) => {
	(on.init(e, n),
		Nt.init(e, n),
		(e._zod.parse = (r, u) => r),
		(e._zod.check = (r) => {
			const u = r.value,
				l = n.fn(u);
			if (l instanceof Promise) return l.then((o) => Gy(o, r, u, e));
			Gy(l, r, u, e);
		}));
});
function Gy(e, n, r, u) {
	if (!e) {
		const l = { code: "custom", input: r, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (l.params = u._zod.def.params), n.issues.push(es(l)));
	}
}
var Xy,
	yT = class {
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
function bT() {
	return new yT();
}
(Xy = globalThis).__zod_globalRegistry ?? (Xy.__zod_globalRegistry = bT());
var Hu = globalThis.__zod_globalRegistry;
function pT(e, n) {
	return new e({ type: "string", ...ye(n) });
}
function ST(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...ye(n) });
}
function Jy(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...ye(n) });
}
function wT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...ye(n) });
}
function _T(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...ye(n) });
}
function xT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...ye(n) });
}
function ET(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...ye(n) });
}
function CT(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...ye(n) });
}
function TT(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...ye(n) });
}
function AT(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...ye(n) });
}
function RT(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...ye(n) });
}
function OT(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...ye(n) });
}
function NT(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...ye(n) });
}
function MT(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...ye(n) });
}
function zT(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...ye(n) });
}
function kT(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...ye(n) });
}
function DT(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...ye(n) });
}
function jT(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...ye(n) });
}
function qT(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...ye(n) });
}
function IT(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...ye(n) });
}
function UT(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...ye(n) });
}
function LT(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...ye(n) });
}
function $T(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...ye(n) });
}
function BT(e, n) {
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
function VT(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...ye(n) });
}
function HT(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...ye(n) });
}
function ZT(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...ye(n) });
}
function QT(e, n) {
	return new e({ type: "number", checks: [], ...ye(n) });
}
function PT(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...ye(n) });
}
function YT(e) {
	return new e({ type: "unknown" });
}
function FT(e, n) {
	return new e({ type: "never", ...ye(n) });
}
function Wy(e, n) {
	return new Pb({ check: "less_than", ...ye(n), value: e, inclusive: !1 });
}
function td(e, n) {
	return new Pb({ check: "less_than", ...ye(n), value: e, inclusive: !0 });
}
function e0(e, n) {
	return new Yb({ check: "greater_than", ...ye(n), value: e, inclusive: !1 });
}
function nd(e, n) {
	return new Yb({ check: "greater_than", ...ye(n), value: e, inclusive: !0 });
}
function t0(e, n) {
	return new hC({ check: "multiple_of", ...ye(n), value: e });
}
function Wb(e, n) {
	return new vC({ check: "max_length", ...ye(n), maximum: e });
}
function Wl(e, n) {
	return new gC({ check: "min_length", ...ye(n), minimum: e });
}
function ep(e, n) {
	return new yC({ check: "length_equals", ...ye(n), length: e });
}
function KT(e, n) {
	return new bC({ check: "string_format", format: "regex", ...ye(n), pattern: e });
}
function GT(e) {
	return new pC({ check: "string_format", format: "lowercase", ...ye(e) });
}
function XT(e) {
	return new SC({ check: "string_format", format: "uppercase", ...ye(e) });
}
function JT(e, n) {
	return new wC({ check: "string_format", format: "includes", ...ye(n), includes: e });
}
function WT(e, n) {
	return new _C({ check: "string_format", format: "starts_with", ...ye(n), prefix: e });
}
function eA(e, n) {
	return new xC({ check: "string_format", format: "ends_with", ...ye(n), suffix: e });
}
function Ha(e) {
	return new EC({ check: "overwrite", tx: e });
}
function tA(e) {
	return Ha((n) => n.normalize(e));
}
function nA() {
	return Ha((e) => e.trim());
}
function iA() {
	return Ha((e) => e.toLowerCase());
}
function rA() {
	return Ha((e) => e.toUpperCase());
}
function aA() {
	return Ha((e) => gE(e));
}
function uA(e, n, r) {
	return new e({ type: "array", element: n, ...ye(r) });
}
function sA(e, n, r) {
	return new e({ type: "custom", check: "custom", fn: n, ...ye(r) });
}
function lA(e, n) {
	const r = oA(
		(u) => (
			(u.addIssue = (l) => {
				if (typeof l == "string") u.issues.push(es(l, u.value, r._zod.def));
				else {
					const o = l;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = r),
						o.continue ?? (o.continue = !r._zod.def.abort),
						u.issues.push(es(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return r;
}
function oA(e, n) {
	const r = new on({ check: "custom", ...ye(n) });
	return ((r._zod.check = e), r);
}
function tp(e) {
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
function Zt(e, n, r = { path: [], schemaPath: [] }) {
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
			const w = f.schema,
				b = n.processors[l.type];
			if (!b) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${l.type}`);
			b(e, n, w, v);
		}
		const y = e._zod.parent;
		y && (f.ref || (f.ref = y), Zt(y, n, v), (n.seen.get(y).isParent = !0));
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
function np(e, n) {
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
					w = e.external.uri ?? ((S) => S);
				if (y) return { ref: w(y) };
				const b = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = b), { defId: b, ref: `${w("__shared")}#/${h}/${b}` });
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
			for (const w in y) delete y[w];
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
function ip(e, n) {
	const r = e.seen.get(n);
	if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const v = m.def ?? m.schema,
			y = { ...v },
			w = m.ref;
		if (((m.ref = null), w)) {
			u(w);
			const S = e.seen.get(w),
				E = S.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(E))
					: Object.assign(v, E),
				Object.assign(v, y),
				h._zod.parent === w)
			)
				for (const C in v) C === "$ref" || C === "allOf" || C in y || delete v[C];
			if (E.$ref && S.def)
				for (const C in v)
					C === "$ref" ||
						C === "allOf" ||
						(C in S.def && JSON.stringify(v[C]) === JSON.stringify(S.def[C]) && delete v[C]);
		}
		const b = h._zod.parent;
		if (b && b !== w) {
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
					jsonSchema: { input: eo(n, "input", e.processors), output: eo(n, "output", e.processors) },
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
	const r = n ?? { seen: new Set() };
	if (r.seen.has(e)) return !1;
	r.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Ft(u.element, r);
	if (u.type === "set") return Ft(u.valueType, r);
	if (u.type === "lazy") return Ft(u.getter(), r);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Ft(u.innerType, r);
	if (u.type === "intersection") return Ft(u.left, r) || Ft(u.right, r);
	if (u.type === "record" || u.type === "map") return Ft(u.keyType, r) || Ft(u.valueType, r);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Ft(u.in, r) || Ft(u.out, r);
	if (u.type === "object") {
		for (const l in u.shape) if (Ft(u.shape[l], r)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const l of u.options) if (Ft(l, r)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const l of u.items) if (Ft(l, r)) return !0;
		return !!(u.rest && Ft(u.rest, r));
	}
	return !1;
}
var cA =
		(e, n = {}) =>
		(r) => {
			const u = tp({ ...r, processors: n });
			return (Zt(e, u), np(u, e), ip(u, e));
		},
	eo =
		(e, n, r = {}) =>
		(u) => {
			const { libraryOptions: l, target: o } = u ?? {},
				f = tp({ ...(l ?? {}), target: o, io: n, processors: r });
			return (Zt(e, f), np(f, e), ip(f, e));
		},
	fA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	dA = (e, n, r, u) => {
		const l = r;
		l.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (l.minLength = o),
			typeof f == "number" && (l.maxLength = f),
			h && ((l.format = fA[h] ?? h), l.format === "" && delete l.format, h === "time" && delete l.format),
			v && (l.contentEncoding = v),
			m && m.size > 0)
		) {
			const y = [...m];
			y.length === 1
				? (l.pattern = y[0].source)
				: y.length > 1 &&
					(l.allOf = [
						...y.map((w) => ({
							...(n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: w.source,
						})),
					]);
		}
	},
	hA = (e, n, r, u) => {
		const l = r,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: y } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (l.type = "integer") : (l.type = "number");
		const w = typeof y == "number" && y >= (o ?? Number.NEGATIVE_INFINITY),
			b = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			S = n.target === "draft-04" || n.target === "openapi-3.0";
		(w
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
	mA = (e, n, r, u) => {
		r.not = {};
	},
	vA = (e, n, r, u) => {},
	gA = (e, n, r, u) => {
		const l = e._zod.def,
			o = jb(l.entries);
		(o.every((f) => typeof f == "number") && (r.type = "number"),
			o.every((f) => typeof f == "string") && (r.type = "string"),
			(r.enum = o));
	},
	yA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	bA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	pA = (e, n, r, u) => {
		const l = r,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (l.minItems = f),
			typeof h == "number" && (l.maxItems = h),
			(l.type = "array"),
			(l.items = Zt(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	SA = (e, n, r, u) => {
		const l = r,
			o = e._zod.def;
		((l.type = "object"), (l.properties = {}));
		const f = o.shape;
		for (const v in f) l.properties[v] = Zt(f[v], n, { ...u, path: [...u.path, "properties", v] });
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
						(l.additionalProperties = Zt(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (l.additionalProperties = !1));
	},
	wA = (e, n, r, u) => {
		const l = e._zod.def,
			o = l.inclusive === !1,
			f = l.options.map((h, m) => Zt(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (r.oneOf = f) : (r.anyOf = f);
	},
	_A = (e, n, r, u) => {
		const l = e._zod.def,
			o = Zt(l.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Zt(l.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		r.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	xA = (e, n, r, u) => {
		const l = e._zod.def,
			o = Zt(l.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = l.innerType), (r.nullable = !0)) : (r.anyOf = [o, { type: "null" }]);
	},
	EA = (e, n, r, u) => {
		const l = e._zod.def;
		Zt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	CA = (e, n, r, u) => {
		const l = e._zod.def;
		Zt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (r.default = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	TA = (e, n, r, u) => {
		const l = e._zod.def;
		Zt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), n.io === "input" && (r._prefault = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	AA = (e, n, r, u) => {
		const l = e._zod.def;
		Zt(l.innerType, n, u);
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
	RA = (e, n, r, u) => {
		const l = e._zod.def,
			o = l.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? l.out : l.in) : l.out;
		Zt(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	OA = (e, n, r, u) => {
		const l = e._zod.def;
		Zt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (r.readOnly = !0));
	},
	rp = (e, n, r, u) => {
		const l = e._zod.def;
		Zt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	NA = te("ZodISODateTime", (e, n) => {
		(UC.init(e, n), lt.init(e, n));
	});
function MA(e) {
	return BT(NA, e);
}
var zA = te("ZodISODate", (e, n) => {
	(LC.init(e, n), lt.init(e, n));
});
function kA(e) {
	return VT(zA, e);
}
var DA = te("ZodISOTime", (e, n) => {
	($C.init(e, n), lt.init(e, n));
});
function jA(e) {
	return HT(DA, e);
}
var qA = te("ZodISODuration", (e, n) => {
	(BC.init(e, n), lt.init(e, n));
});
function IA(e) {
	return ZT(qA, e);
}
var UA = (e, n) => {
		($b.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (r) => NE(e, r) },
				flatten: { value: (r) => OE(e, r) },
				addIssue: {
					value: (r) => {
						(e.issues.push(r), (e.message = JSON.stringify(e.issues, Sd, 2)));
					},
				},
				addIssues: {
					value: (r) => {
						(e.issues.push(...r), (e.message = JSON.stringify(e.issues, Sd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Dn = te("ZodError", UA, { Parent: Error }),
	LA = Hd(Dn),
	$A = Zd(Dn),
	BA = co(Dn),
	VA = fo(Dn),
	HA = kE(Dn),
	ZA = DE(Dn),
	QA = jE(Dn),
	PA = qE(Dn),
	YA = IE(Dn),
	FA = UE(Dn),
	KA = LE(Dn),
	GA = $E(Dn),
	n0 = new WeakMap();
function as(e, n, r) {
	const u = Object.getPrototypeOf(e);
	let l = n0.get(u);
	if ((l || ((l = new Set()), n0.set(u, l)), !l.has(n))) {
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
var Mt = te(
		"ZodType",
		(e, n) => (
			Nt.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: eo(e, "input"), output: eo(e, "output") } }),
			(e.toJSONSchema = cA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (r, u) => LA(e, r, u, { callee: e.parse })),
			(e.safeParse = (r, u) => BA(e, r, u)),
			(e.parseAsync = async (r, u) => $A(e, r, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (r, u) => VA(e, r, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (r, u) => HA(e, r, u)),
			(e.decode = (r, u) => ZA(e, r, u)),
			(e.encodeAsync = async (r, u) => QA(e, r, u)),
			(e.decodeAsync = async (r, u) => PA(e, r, u)),
			(e.safeEncode = (r, u) => YA(e, r, u)),
			(e.safeDecode = (r, u) => FA(e, r, u)),
			(e.safeEncodeAsync = async (r, u) => KA(e, r, u)),
			(e.safeDecodeAsync = async (r, u) => GA(e, r, u)),
			as(e, "ZodType", {
				check(...r) {
					const u = this.def;
					return this.clone(
						sr(u, {
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
					return lr(this, r, u);
				},
				brand() {
					return this;
				},
				register(r, u) {
					return (r.add(this, u), this);
				},
				refine(r, u) {
					return this.check(QR(r, u));
				},
				superRefine(r, u) {
					return this.check(PR(r, u));
				},
				overwrite(r) {
					return this.check(Ha(r));
				},
				optional() {
					return s0(this);
				},
				exactOptional() {
					return zR(this);
				},
				nullable() {
					return l0(this);
				},
				nullish() {
					return s0(l0(this));
				},
				nonoptional(r) {
					return UR(this, r);
				},
				array() {
					return wR(this);
				},
				or(r) {
					return CR([this, r]);
				},
				and(r) {
					return AR(this, r);
				},
				transform(r) {
					return o0(this, NR(r));
				},
				default(r) {
					return jR(this, r);
				},
				prefault(r) {
					return IR(this, r);
				},
				catch(r) {
					return $R(this, r);
				},
				pipe(r) {
					return o0(this, r);
				},
				readonly() {
					return HR(this);
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
	ap = te("_ZodString", (e, n) => {
		(Qd.init(e, n), Mt.init(e, n), (e._zod.processJSONSchema = (u, l, o) => dA(e, u, l, o)));
		const r = e._zod.bag;
		((e.format = r.format ?? null),
			(e.minLength = r.minimum ?? null),
			(e.maxLength = r.maximum ?? null),
			as(e, "_ZodString", {
				regex(...u) {
					return this.check(KT(...u));
				},
				includes(...u) {
					return this.check(JT(...u));
				},
				startsWith(...u) {
					return this.check(WT(...u));
				},
				endsWith(...u) {
					return this.check(eA(...u));
				},
				min(...u) {
					return this.check(Wl(...u));
				},
				max(...u) {
					return this.check(Wb(...u));
				},
				length(...u) {
					return this.check(ep(...u));
				},
				nonempty(...u) {
					return this.check(Wl(1, ...u));
				},
				lowercase(u) {
					return this.check(GT(u));
				},
				uppercase(u) {
					return this.check(XT(u));
				},
				trim() {
					return this.check(nA());
				},
				normalize(...u) {
					return this.check(tA(...u));
				},
				toLowerCase() {
					return this.check(iA());
				},
				toUpperCase() {
					return this.check(rA());
				},
				slugify() {
					return this.check(aA());
				},
			}));
	}),
	XA = te("ZodString", (e, n) => {
		(Qd.init(e, n),
			ap.init(e, n),
			(e.email = (r) => e.check(ST(WA, r))),
			(e.url = (r) => e.check(CT(eR, r))),
			(e.jwt = (r) => e.check($T(vR, r))),
			(e.emoji = (r) => e.check(TT(tR, r))),
			(e.guid = (r) => e.check(Jy(i0, r))),
			(e.uuid = (r) => e.check(wT(Bl, r))),
			(e.uuidv4 = (r) => e.check(_T(Bl, r))),
			(e.uuidv6 = (r) => e.check(xT(Bl, r))),
			(e.uuidv7 = (r) => e.check(ET(Bl, r))),
			(e.nanoid = (r) => e.check(AT(nR, r))),
			(e.guid = (r) => e.check(Jy(i0, r))),
			(e.cuid = (r) => e.check(RT(iR, r))),
			(e.cuid2 = (r) => e.check(OT(rR, r))),
			(e.ulid = (r) => e.check(NT(aR, r))),
			(e.base64 = (r) => e.check(IT(dR, r))),
			(e.base64url = (r) => e.check(UT(hR, r))),
			(e.xid = (r) => e.check(MT(uR, r))),
			(e.ksuid = (r) => e.check(zT(sR, r))),
			(e.ipv4 = (r) => e.check(kT(lR, r))),
			(e.ipv6 = (r) => e.check(DT(oR, r))),
			(e.cidrv4 = (r) => e.check(jT(cR, r))),
			(e.cidrv6 = (r) => e.check(qT(fR, r))),
			(e.e164 = (r) => e.check(LT(mR, r))),
			(e.datetime = (r) => e.check(MA(r))),
			(e.date = (r) => e.check(kA(r))),
			(e.time = (r) => e.check(jA(r))),
			(e.duration = (r) => e.check(IA(r))));
	});
function JA(e) {
	return pT(XA, e);
}
var lt = te("ZodStringFormat", (e, n) => {
		(at.init(e, n), ap.init(e, n));
	}),
	WA = te("ZodEmail", (e, n) => {
		(OC.init(e, n), lt.init(e, n));
	}),
	i0 = te("ZodGUID", (e, n) => {
		(AC.init(e, n), lt.init(e, n));
	}),
	Bl = te("ZodUUID", (e, n) => {
		(RC.init(e, n), lt.init(e, n));
	}),
	eR = te("ZodURL", (e, n) => {
		(NC.init(e, n), lt.init(e, n));
	}),
	tR = te("ZodEmoji", (e, n) => {
		(MC.init(e, n), lt.init(e, n));
	}),
	nR = te("ZodNanoID", (e, n) => {
		(zC.init(e, n), lt.init(e, n));
	}),
	iR = te("ZodCUID", (e, n) => {
		(kC.init(e, n), lt.init(e, n));
	}),
	rR = te("ZodCUID2", (e, n) => {
		(DC.init(e, n), lt.init(e, n));
	}),
	aR = te("ZodULID", (e, n) => {
		(jC.init(e, n), lt.init(e, n));
	}),
	uR = te("ZodXID", (e, n) => {
		(qC.init(e, n), lt.init(e, n));
	}),
	sR = te("ZodKSUID", (e, n) => {
		(IC.init(e, n), lt.init(e, n));
	}),
	lR = te("ZodIPv4", (e, n) => {
		(VC.init(e, n), lt.init(e, n));
	}),
	oR = te("ZodIPv6", (e, n) => {
		(HC.init(e, n), lt.init(e, n));
	}),
	cR = te("ZodCIDRv4", (e, n) => {
		(ZC.init(e, n), lt.init(e, n));
	}),
	fR = te("ZodCIDRv6", (e, n) => {
		(QC.init(e, n), lt.init(e, n));
	}),
	dR = te("ZodBase64", (e, n) => {
		(PC.init(e, n), lt.init(e, n));
	}),
	hR = te("ZodBase64URL", (e, n) => {
		(FC.init(e, n), lt.init(e, n));
	}),
	mR = te("ZodE164", (e, n) => {
		(KC.init(e, n), lt.init(e, n));
	}),
	vR = te("ZodJWT", (e, n) => {
		(XC.init(e, n), lt.init(e, n));
	}),
	up = te("ZodNumber", (e, n) => {
		(Kb.init(e, n),
			Mt.init(e, n),
			(e._zod.processJSONSchema = (u, l, o) => hA(e, u, l, o)),
			as(e, "ZodNumber", {
				gt(u, l) {
					return this.check(e0(u, l));
				},
				gte(u, l) {
					return this.check(nd(u, l));
				},
				min(u, l) {
					return this.check(nd(u, l));
				},
				lt(u, l) {
					return this.check(Wy(u, l));
				},
				lte(u, l) {
					return this.check(td(u, l));
				},
				max(u, l) {
					return this.check(td(u, l));
				},
				int(u) {
					return this.check(a0(u));
				},
				safe(u) {
					return this.check(a0(u));
				},
				positive(u) {
					return this.check(e0(0, u));
				},
				nonnegative(u) {
					return this.check(nd(0, u));
				},
				negative(u) {
					return this.check(Wy(0, u));
				},
				nonpositive(u) {
					return this.check(td(0, u));
				},
				multipleOf(u, l) {
					return this.check(t0(u, l));
				},
				step(u, l) {
					return this.check(t0(u, l));
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
function r0(e) {
	return QT(up, e);
}
var gR = te("ZodNumberFormat", (e, n) => {
	(JC.init(e, n), up.init(e, n));
});
function a0(e) {
	return PT(gR, e);
}
var yR = te("ZodUnknown", (e, n) => {
	(WC.init(e, n), Mt.init(e, n), (e._zod.processJSONSchema = (r, u, l) => vA(e, r, u, l)));
});
function u0() {
	return YT(yR);
}
var bR = te("ZodNever", (e, n) => {
	(eT.init(e, n), Mt.init(e, n), (e._zod.processJSONSchema = (r, u, l) => mA(e, r, u, l)));
});
function pR(e) {
	return FT(bR, e);
}
var SR = te("ZodArray", (e, n) => {
	(tT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => pA(e, r, u, l)),
		(e.element = n.element),
		as(e, "ZodArray", {
			min(r, u) {
				return this.check(Wl(r, u));
			},
			nonempty(r) {
				return this.check(Wl(1, r));
			},
			max(r, u) {
				return this.check(Wb(r, u));
			},
			length(r, u) {
				return this.check(ep(r, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function wR(e, n) {
	return uA(SR, e, n);
}
var _R = te("ZodObject", (e, n) => {
	(iT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => SA(e, r, u, l)),
		Ge(e, "shape", () => n.shape),
		as(e, "ZodObject", {
			keyof() {
				return RR(Object.keys(this._zod.def.shape));
			},
			catchall(r) {
				return this.clone({ ...this._zod.def, catchall: r });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: u0() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: u0() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: pR() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(r) {
				return xE(this, r);
			},
			safeExtend(r) {
				return EE(this, r);
			},
			merge(r) {
				return CE(this, r);
			},
			pick(r) {
				return wE(this, r);
			},
			omit(r) {
				return _E(this, r);
			},
			partial(...r) {
				return TE(sp, this, r[0]);
			},
			required(...r) {
				return AE(lp, this, r[0]);
			},
		}));
});
function xR(e, n) {
	const r = { type: "object", shape: e ?? {}, ...ye(n) };
	return new _R(r);
}
var ER = te("ZodUnion", (e, n) => {
	(rT.init(e, n), Mt.init(e, n), (e._zod.processJSONSchema = (r, u, l) => wA(e, r, u, l)), (e.options = n.options));
});
function CR(e, n) {
	return new ER({ type: "union", options: e, ...ye(n) });
}
var TR = te("ZodIntersection", (e, n) => {
	(aT.init(e, n), Mt.init(e, n), (e._zod.processJSONSchema = (r, u, l) => _A(e, r, u, l)));
});
function AR(e, n) {
	return new TR({ type: "intersection", left: e, right: n });
}
var _d = te("ZodEnum", (e, n) => {
	(uT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (u, l, o) => gA(e, u, l, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const r = new Set(Object.keys(n.entries));
	((e.extract = (u, l) => {
		const o = {};
		for (const f of u)
			if (r.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new _d({ ...n, checks: [], ...ye(l), entries: o });
	}),
		(e.exclude = (u, l) => {
			const o = { ...n.entries };
			for (const f of u)
				if (r.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new _d({ ...n, checks: [], ...ye(l), entries: o });
		}));
});
function RR(e, n) {
	const r = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new _d({ type: "enum", entries: r, ...ye(n) });
}
var OR = te("ZodTransform", (e, n) => {
	(sT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => bA(e, r, u, l)),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") throw new Db(e.constructor.name);
			r.addIssue = (o) => {
				if (typeof o == "string") r.issues.push(es(o, r.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = r.value),
						f.inst ?? (f.inst = e),
						r.issues.push(es(f)));
				}
			};
			const l = n.transform(r.value, r);
			return l instanceof Promise
				? l.then((o) => ((r.value = o), (r.fallback = !0), r))
				: ((r.value = l), (r.fallback = !0), r);
		}));
});
function NR(e) {
	return new OR({ type: "transform", transform: e });
}
var sp = te("ZodOptional", (e, n) => {
	(Jb.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => rp(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function s0(e) {
	return new sp({ type: "optional", innerType: e });
}
var MR = te("ZodExactOptional", (e, n) => {
	(lT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => rp(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function zR(e) {
	return new MR({ type: "optional", innerType: e });
}
var kR = te("ZodNullable", (e, n) => {
	(oT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => xA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function l0(e) {
	return new kR({ type: "nullable", innerType: e });
}
var DR = te("ZodDefault", (e, n) => {
	(cT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => CA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function jR(e, n) {
	return new DR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Ib(n);
		},
	});
}
var qR = te("ZodPrefault", (e, n) => {
	(fT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => TA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function IR(e, n) {
	return new qR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Ib(n);
		},
	});
}
var lp = te("ZodNonOptional", (e, n) => {
	(dT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => EA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function UR(e, n) {
	return new lp({ type: "nonoptional", innerType: e, ...ye(n) });
}
var LR = te("ZodCatch", (e, n) => {
	(hT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => AA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function $R(e, n) {
	return new LR({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var BR = te("ZodPipe", (e, n) => {
	(mT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => RA(e, r, u, l)),
		(e.in = n.in),
		(e.out = n.out));
});
function o0(e, n) {
	return new BR({ type: "pipe", in: e, out: n });
}
var VR = te("ZodReadonly", (e, n) => {
	(vT.init(e, n),
		Mt.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => OA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function HR(e) {
	return new VR({ type: "readonly", innerType: e });
}
var ZR = te("ZodCustom", (e, n) => {
	(gT.init(e, n), Mt.init(e, n), (e._zod.processJSONSchema = (r, u, l) => yA(e, r, u, l)));
});
function QR(e, n = {}) {
	return sA(ZR, e, n);
}
function PR(e, n) {
	return lA(e, n);
}
function YR(e) {
	const n = new Ab("https://exuberant-hippopotamus-790.convex.cloud", { authRefreshTokenLeewaySeconds: 15 });
	let r = { phase: "connecting", message: null, deadline: 0, refreshing: !1 };
	const u = new Set();
	let l = null,
		o = null,
		f = null,
		h = null,
		m = null,
		v = 0,
		y = !1,
		w = !1;
	function b(T) {
		if (!y) {
			r = { ...r, ...T };
			for (const D of u) D();
		}
	}
	function S(T) {
		((w = T),
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
								z = xR({ jwt: JA(), expiresAt: r0(), validForMs: r0().min(0).max(3e4) }).safeParse(j);
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
											o || ((w = !1), n.clearAuth(), E()));
									},
									Math.max(0, U - performance.now()),
								)),
								b({ phase: w ? "ready" : "connecting", deadline: U, message: null }),
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
var op = (0, _.createContext)(null);
function FR(e) {
	const [n] = (0, _.useState)(() => YR(e.client));
	return (
		(0, _.useEffect)(() => {
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
		(0, p.jsx)(op.Provider, { value: n, children: (0, p.jsx)(Ux, { client: n.convex, children: e.children }) })
	);
}
function Vn() {
	const e = (0, _.useContext)(op);
	if (!e) throw new Error("Chitchat needs its session provider");
	const n = (0, _.useSyncExternalStore)(e.subscribe, e.getSnapshot),
		r = Lx(),
		u = n.phase === "ready" && performance.now() < n.deadline,
		l = Xu(Se.sessions.current, u ? {} : "skip"),
		o = Xu(Se.sessions.status, u ? {} : "skip"),
		[f, h] = (0, _.useState)(l);
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
function cp(e) {
	const n = Vn(),
		r = _i(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		u = et(n, Se.members.list, { paginationOpts: { numItems: 100, cursor: r.cursor } });
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
												kb(l.displayName),
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
			(0, p.jsx)(tr, { page: r, result: u, label: "People" }),
		],
	});
}
function c0(e) {
	const n = Ba(),
		r = Vn(),
		u = (0, _.useId)(),
		l = (0, _.useId)(),
		o = (0, _.useId)(),
		f = (0, _.useId)(),
		h = et(r, Se.channels.permissions, e.channel ? { channelId: e.channel._id } : "skip"),
		[m, v] = (0, _.useState)(e.channel?.name ?? ""),
		[y, w] = (0, _.useState)(e.channel?.topic ?? ""),
		[b, S] = (0, _.useState)(!1),
		[E, C] = (0, _.useState)([]),
		[T, D] = (0, _.useState)(null),
		[A, N] = (0, _.useState)(!1),
		[R, $] = (0, _.useState)(null),
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
	return (0, p.jsxs)(Va, {
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
								onInput: (z) => w(z.currentTarget.value),
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
													(0, p.jsx)("p", { className: "field-note", children: Ud }),
													(0, p.jsx)("p", {
														className: "field-note",
														children:
															"Tick one person for a direct message, or several for a group. Up to 50 people can join.",
													}),
													(0, p.jsx)(cp, {
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
function KR(e) {
	const n = Ba(),
		r = Vn(),
		u = (0, _.useId)(),
		[l, o] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(null),
		y = et(r, Se.channels.get, { channelId: e.channelId }),
		w = et(r, Se.channels.list_members, { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } }),
		b = et(r, Se.channels.permissions, { channelId: e.channelId }),
		S = et(r, Se.members.resolve, w ? { userIds: w.page.map((A) => A.hostUserId) } : "skip"),
		E = et(r, Se.channel_members.status, l ? { channelId: e.channelId, clientRequestId: l.clientRequestId } : "skip"),
		C = E?.status === "pending";
	(0, _.useEffect)(() => {
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
			w &&
				T({
					channelId: e.channelId,
					clientRequestId: crypto.randomUUID(),
					expectedMembershipRevision: w.membershipRevision,
					expectedPrincipalCount: w.memberCount,
					hostUserId: A,
					level: N,
				});
		};
	return (0, p.jsxs)(Va, {
		labelledBy: u,
		accessUnavailable: !r.refreshing && (!r.ready || b === null),
		onReconnect: r.retry,
		onClose: () => {
			f || e.onClose();
		},
		children: [
			(0, p.jsx)("h2", { id: u, className: "dialog-title", children: y ? `People in #${y.name}` : "Channel access" }),
			(0, p.jsx)("p", { className: "field-note", children: Ud }),
			C
				? (0, p.jsx)("p", { role: "status", children: "Updating channel and transcript access…" })
				: w
					? (0, p.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: w.page.map((A) =>
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
							children: w === null ? "The people list is not currently available." : "Loading people…",
						}),
			b?.canManage && w
				? (0, p.jsxs)("div", {
						className: "field",
						children: [
							(0, p.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, p.jsx)(cp, {
								selfUserId: e.selfUserId,
								selected: w.page.map((A) => A.hostUserId),
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
function GR(e) {
	const n = Ba(),
		r = Vn(),
		u = (0, _.useId)(),
		[l] = (0, _.useState)(() => crypto.randomUUID()),
		[o, f] = (0, _.useState)(!1),
		[h, m] = (0, _.useState)(!1),
		[v, y] = (0, _.useState)(null),
		w = e.action === "leave" || e.action === "delete",
		b = et(r, Se.channels.permissions, { channelId: e.channel._id }),
		S = et(r, Se.channel_members.status, h && w ? { channelId: e.channel._id, clientRequestId: l } : "skip"),
		E = S?.status === "pending";
	(0, _.useEffect)(() => {
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
	return (0, p.jsxs)(Va, {
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
function fp(e, n) {
	return XR(e) ? e(JR(n) ? n() : n) : e;
}
function XR(e) {
	return typeof e == "function";
}
function JR(e) {
	return typeof e == "function";
}
function Ti(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function sn(...e) {
	return (...n) => {
		for (const r of e) typeof r == "function" && r(...n);
	};
}
function dp(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function WR(e, n) {
	const r = { ...e };
	for (const u of n) Ti(r, u) && delete r[u];
	return r;
}
function eO(e, n) {
	const r = {};
	for (const u of n) Ti(e, u) && (r[u] = e[u]);
	return r;
}
function hp(e) {
	return e;
}
function pt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function tO(e) {
	return Object.keys(e);
}
function mo(e, ...n) {
	const r = typeof e == "function" ? e(...n) : e;
	return r == null ? !1 : !r;
}
function us(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function Vr(e) {
	const n = {};
	for (const r in e) e[r] !== void 0 && (n[r] = e[r]);
	return n;
}
function Ee(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function xd(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function nO(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function iO(e) {
	return nO(e) ? { ...e.props }.ref || e.ref : null;
}
function rO(e, n) {
	const r = { ...e };
	for (const u in n) {
		if (!Ti(n, u)) continue;
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
var Za = aO();
function aO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function nt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function mp(e) {
	return e ? ("self" in e ? e.self : nt(e).defaultView || window) : self;
}
function Ai(e, n = !1) {
	const { activeElement: r } = nt(e);
	if (!r?.nodeName) return null;
	if (Pd(r) && r.contentDocument) return Ai(r.contentDocument.body, n);
	if (n) {
		const u = r.getAttribute("aria-activedescendant");
		if (u) {
			const l = nt(r).getElementById(u);
			if (l) return l;
		}
	}
	return r;
}
function Ot(e, n) {
	return e === n || e.contains(n);
}
function Pd(e) {
	return e.tagName === "IFRAME";
}
function ir(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? uO.indexOf(e.type) !== -1 : !1;
}
var uO = ["button", "color", "file", "image", "reset", "submit"];
function vp(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Xn(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			r = e.tagName === "TEXTAREA";
		return n || r || !1;
	} catch {
		return !1;
	}
}
function Ed(e) {
	return e.isContentEditable || Xn(e);
}
function sO(e) {
	if (Xn(e)) return e.value;
	if (e.isContentEditable) {
		const n = nt(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function Cd(e) {
	let n = 0,
		r = 0;
	if (Xn(e)) ((n = e.selectionStart || 0), (r = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = nt(e).getSelection();
		if (u?.rangeCount && u.anchorNode && Ot(e, u.anchorNode) && u.focusNode && Ot(e, u.focusNode)) {
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
function vo(e, n) {
	const r = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && r.indexOf(u) !== -1 ? u : n;
}
function gp(e, n) {
	var r;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		l = vo(e);
	return l && (r = u[l]) != null ? r : n;
}
function Yd(e) {
	if (!e) return null;
	const n = (r) => r === "auto" || r === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: r } = getComputedStyle(e);
		if (n(r)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: r } = getComputedStyle(e);
		if (n(r)) return e;
	}
	return Yd(e.parentElement) || document.scrollingElement || document.body;
}
function id(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function yp(e, n) {
	const r = e.map((l, o) => [o, l]);
	let u = !1;
	return (
		r.sort(([l, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : lO(m, v) ? (l > f && (u = !0), -1) : (l < f && (u = !0), 1);
		}),
		u ? r.map(([l, o]) => o) : e
	);
}
function lO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function bp() {
	return Za && !!navigator.maxTouchPoints;
}
function Fd() {
	return Za ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function go() {
	return Za && Fd() && /apple/i.test(navigator.vendor);
}
function oO() {
	return Za && /firefox\//i.test(navigator.userAgent);
}
function cO() {
	return Za && navigator.platform.startsWith("Mac") && !bp();
}
function pp(e) {
	return !!(e.currentTarget && !Ot(e.currentTarget, e.target));
}
function pn(e) {
	return e.target === e.currentTarget;
}
function Sp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = Fd();
	if ((r && !e.metaKey) || (!r && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function wp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = n.tagName.toLowerCase();
	return e.altKey ? r === "a" || (r === "button" && n.type === "submit") || (r === "input" && n.type === "submit") : !1;
}
function fO(e, n, r) {
	const u = new Event(n, r);
	return e.dispatchEvent(u);
}
function Ra(e, n) {
	const r = new FocusEvent("blur", n),
		u = e.dispatchEvent(r),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", l)), u);
}
function dO(e, n, r) {
	const u = new KeyboardEvent(n, r);
	return e.dispatchEvent(u);
}
function f0(e, n) {
	const r = new MouseEvent("click", n);
	return e.dispatchEvent(r);
}
function Mr(e, n) {
	const r = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Ot(r, u);
}
function ja(e, n, r, u) {
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
function Vt(e, n, r, u = window) {
	const l = [];
	try {
		u.document.addEventListener(e, n, r);
		for (const f of Array.from(u.frames)) l.push(Vt(e, n, r, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, r);
		} catch {}
		for (const f of l) f();
	};
}
var Kd = { ..._ },
	d0 = Kd.useId,
	pk = Kd.useDeferredValue,
	h0 = Kd.useInsertionEffect,
	Ze = Za ? _.useLayoutEffect : _.useEffect;
function hO(e) {
	const [n] = (0, _.useState)(e);
	return n;
}
function _p(e) {
	const n = (0, _.useRef)(e);
	return (
		Ze(() => {
			n.current = e;
		}),
		n
	);
}
function _e(e) {
	const n = (0, _.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		h0
			? h0(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, _.useCallback)((...r) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...r);
		}, [])
	);
}
function mO(e) {
	const [n, r] = (0, _.useState)(null);
	return (
		Ze(() => {
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
function St(...e) {
	return (0, _.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const r of e) xd(r, n);
			};
	}, e);
}
function Ri(e) {
	if (d0) {
		const u = d0();
		return e || u;
	}
	const [n, r] = (0, _.useState)(e);
	return (
		Ze(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			r(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function xp(e, n) {
	const r = (o) => {
			if (typeof o == "string") return o;
		},
		[u, l] = (0, _.useState)(() => r(n));
	return (
		Ze(() => {
			const o = e && "current" in e ? e.current : e;
			l(o?.tagName.toLowerCase() || r(n));
		}, [e, n]),
		u
	);
}
function vO(e, n, r) {
	const u = hO(r),
		[l, o] = (0, _.useState)(u);
	return (
		(0, _.useEffect)(() => {
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
function Qa(e, n) {
	const r = (0, _.useRef)(!1);
	((0, _.useEffect)(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		(0, _.useEffect)(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function gO(e, n) {
	const r = (0, _.useRef)(!1);
	(Ze(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		Ze(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function Ep() {
	return (0, _.useReducer)(() => [], []);
}
function rt(e) {
	return _e(typeof e == "function" ? e : () => e);
}
function Ht(e, n, r = []) {
	const u = (0, _.useCallback)((l) => (e.wrapElement && (l = e.wrapElement(l)), n(l)), [...r, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function Gd(e = !1, n) {
	const [r, u] = (0, _.useState)(null);
	return { portalRef: St(u, n), portalNode: r, domReady: !e || r };
}
function Cp(e, n, r) {
	const u = e.onLoadedMetadataCapture,
		l = (0, _.useMemo)(() => Object.assign(() => {}, { ...u, [n]: r }), [u, n, r]);
	return [u?.[n], { onLoadedMetadataCapture: l }];
}
var m0 = !1;
function Xd() {
	return (
		(0, _.useEffect)(() => {
			m0 ||
				(Vt("mousemove", bO, !0),
				Vt("mousedown", Vl, !0),
				Vt("mouseup", Vl, !0),
				Vt("keydown", Vl, !0),
				Vt("scroll", Vl, !0),
				(m0 = !0));
		}, []),
		_e(() => Jd)
	);
}
var Jd = !1,
	v0 = 0,
	g0 = 0;
function yO(e) {
	const n = e.movementX || e.screenX - v0,
		r = e.movementY || e.screenY - g0;
	return ((v0 = e.screenX), (g0 = e.screenY), n || r || !1);
}
function bO(e) {
	yO(e) && (Jd = !0);
}
function Vl() {
	Jd = !1;
}
function De(e) {
	const n = _.forwardRef((r, u) => e({ ...r, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function yo(e, n) {
	return _.memo(e, n);
}
function Ue(e, n) {
	const { wrapElement: r, render: u, ...l } = n,
		o = St(n.ref, iO(u));
	let f;
	if (_.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = _.cloneElement(u, rO(l, h));
	} else u ? (f = u(l)) : (f = (0, p.jsx)(e, { ...l }));
	return r ? r(f) : f;
}
function Le(e) {
	const n = (r = {}) => e(r);
	return ((n.displayName = e.name), n);
}
function Jn(e = [], n = []) {
	const r = _.createContext(void 0),
		u = _.createContext(void 0),
		l = () => _.useContext(r),
		o = (v = !1) => {
			const y = _.useContext(u),
				w = l();
			return v ? y : y || w;
		},
		f = () => {
			const v = _.useContext(u),
				y = l();
			if (!(v && v === y)) return y;
		},
		h = (v) => e.reduceRight((y, w) => (0, p.jsx)(w, { ...v, children: y }), (0, p.jsx)(r.Provider, { ...v }));
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
				children: n.reduceRight((y, w) => (0, p.jsx)(w, { ...v, children: y }), (0, p.jsx)(u.Provider, { ...v })),
			}),
	};
}
var ss = Jn(),
	pO = ss.useContext,
	Sk = ss.useScopedContext,
	wk = ss.useProviderContext,
	SO = ss.ContextProvider,
	wO = ss.ScopedContextProvider,
	ls = Jn([SO], [wO]),
	bo = ls.useContext,
	_k = ls.useScopedContext,
	_O = ls.useProviderContext,
	os = ls.ContextProvider,
	po = ls.ScopedContextProvider,
	xO = (0, _.createContext)(void 0),
	EO = (0, _.createContext)(void 0),
	cs = Jn([os], [po]),
	CO = cs.useContext,
	TO = cs.useScopedContext,
	xk = cs.useProviderContext,
	Ek = cs.ContextProvider,
	Ck = cs.ScopedContextProvider,
	Tk = (0, _.createContext)(void 0),
	fs = Jn(),
	Ak = fs.useContext,
	Rk = fs.useScopedContext,
	Wd = fs.useProviderContext,
	AO = fs.ContextProvider,
	RO = fs.ScopedContextProvider,
	ds = Jn([AO], [RO]),
	Ok = ds.useContext,
	Nk = ds.useScopedContext,
	So = ds.useProviderContext,
	OO = ds.ContextProvider,
	eh = ds.ScopedContextProvider,
	NO = (0, _.createContext)(void 0),
	MO = (0, _.createContext)(void 0),
	hs = Jn([OO], [eh]),
	Mk = hs.useContext,
	zk = hs.useScopedContext,
	wo = hs.useProviderContext,
	Tp = hs.ContextProvider,
	_o = hs.ScopedContextProvider,
	ms = Jn([Tp], [_o]),
	kk = ms.useContext,
	Dk = ms.useScopedContext,
	th = ms.useProviderContext,
	zO = ms.ContextProvider,
	Ap = ms.ScopedContextProvider,
	vs = Jn([os, zO], [po, Ap]),
	Rp = vs.useContext,
	kO = vs.useScopedContext,
	xo = vs.useProviderContext,
	Op = vs.ContextProvider,
	DO = vs.ScopedContextProvider,
	jk = (0, _.createContext)(void 0),
	jO = { id: null };
function qO(e, n, r = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(r ? [jO] : []), ...e.slice(0, u)];
}
function IO(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function er(e, n) {
	return (n && e.item(n)) || null;
}
function UO(e) {
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
function LO(e, n = !1) {
	if (Xn(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const r = nt(e).getSelection();
		(r?.selectAllChildren(e), n && r?.collapseToEnd());
	}
}
var Td = Symbol("FOCUS_SILENTLY");
function $O(e) {
	((e[Td] = !0), e.focus({ preventScroll: !0 }));
}
function BO(e) {
	const n = e[Td];
	return (delete e[Td], n);
}
function Pu(e, n, r) {
	if (!n || n === r) return !1;
	const u = e.item(n.id);
	return !(!u || (r && u.element === r));
}
var VO = "div",
	xi = "";
function rd() {
	xi = "";
}
function HO(e) {
	const n = e.target;
	return n && Xn(n)
		? !1
		: e.key === " " && xi.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function ZO(e, n) {
	if (pn(e)) return !0;
	const r = e.target;
	return r ? n.some((u) => u.element === r) : !1;
}
function QO(e) {
	return e.filter((n) => !n.disabled);
}
function Pl(e, n) {
	var r;
	const u = ((r = e.element) == null ? void 0 : r.textContent) || e.children || ("value" in e && e.value);
	return u ? dp(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function PO(e, n, r) {
	if (!r) return e;
	const u = e.find((l) => l.id === r);
	return !u || !Pl(u, n) || (xi !== n && Pl(u, xi))
		? e
		: ((xi = n),
			qO(
				e.filter((l) => Pl(l, xi)),
				r,
			).filter((l) => l.id !== r));
}
var nh = Le(function ({ store: n, typeahead: r = !0, ...u }) {
		const l = bo();
		((n = n || l), pt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, _.useRef)(0),
			h = _e((m) => {
				if ((o?.(m), m.defaultPrevented || !r || !n)) return;
				if (!HO(m)) return rd();
				const { renderedItems: v, items: y, activeId: w, id: b } = n.getState();
				let S = QO(y.length > v.length ? y : v);
				const E = nt(m.currentTarget),
					C = `[data-offscreen-id="${b}"]`,
					T = E.querySelectorAll(C);
				for (const N of T) {
					const R = N.ariaDisabled === "true" || ("disabled" in N && !!N.disabled);
					S.push({ id: N.id, element: N, disabled: R });
				}
				if ((T.length && (S = yp(S, (N) => N.element)), !ZO(m, S))) return rd();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						xi = "";
					}, 500)));
				const D = m.key.toLowerCase();
				((xi += D), (S = PO(S, D, w)));
				const A = S.find((N) => Pl(N, xi));
				A ? n.move(A.id) : rd();
			});
		return ((u = { ...u, onKeyDownCapture: h }), Vr(u));
	}),
	qk = De(function (n) {
		return Ue(VO, nh(n));
	});
function Hr(e, n) {
	const r = e.__unstableInternals;
	return (pt(r, "Invalid store"), r[n]);
}
function Bn(e, ...n) {
	let r = e,
		u = r,
		l = Symbol(),
		o = Qu;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		y = new Set(),
		w = new WeakMap(),
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
			const Q = tO(r).map((F) =>
					sn(
						...n.map((ne) => {
							var k;
							const H = (k = ne?.getState) == null ? void 0 : k.call(ne);
							if (H && Ti(H, F))
								return Qt(ne, [F], (B) => {
									I(F, B[F], !0);
								});
						}),
					),
				),
				ie = [];
			for (const F of m) ie.push(F());
			const G = n.map(ih);
			return ((o = sn(...Q, ...ie, ...G)), L);
		},
		C = (z, U, L = v) => (
			L.add(U),
			b.set(U, z),
			() => {
				var Q;
				((Q = w.get(U)) == null || Q(), w.delete(U), b.delete(U), L.delete(U));
			}
		),
		T = (z, U) => C(z, U),
		D = (z, U) => (w.set(U, U(r, r)), C(z, U)),
		A = (z, U) => (w.set(U, U(r, u)), C(z, U, y)),
		N = (z) => Bn(eO(r, z), j),
		R = (z) => Bn(WR(r, z), j),
		$ = () => r,
		I = (z, U, L = !1) => {
			var Q;
			if (!Ti(r, z)) return;
			const ie = fp(U, r[z]);
			if (ie === r[z]) return;
			if (!L) for (const k of n) (Q = k?.setState) == null || Q.call(k, z, ie);
			const G = r;
			r = { ...r, [z]: ie };
			const F = Symbol();
			((l = F), h.add(z));
			const ne = (k, H, B) => {
				var ue;
				const fe = b.get(k),
					qe = (O) => (B ? B.has(O) : O === z);
				(!fe || fe.some(qe)) && ((ue = w.get(k)) == null || ue(), w.set(k, k(r, H)));
			};
			for (const k of v) ne(k, G);
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
function Kt(e, ...n) {
	if (e) return Hr(e, "setup")(...n);
}
function ih(e, ...n) {
	if (e) return Hr(e, "init")(...n);
}
function rh(e, ...n) {
	if (e) return Hr(e, "subscribe")(...n);
}
function Qt(e, ...n) {
	if (e) return Hr(e, "sync")(...n);
}
function to(e, ...n) {
	if (e) return Hr(e, "batch")(...n);
}
function ah(e, ...n) {
	if (e) return Hr(e, "omit")(...n);
}
function Np(e, ...n) {
	if (e) return Hr(e, "pick")(...n);
}
function Eo(...e) {
	var n;
	const r = {};
	for (const l of e) {
		const o = (n = l?.getState) == null ? void 0 : n.call(l);
		o && Object.assign(r, o);
	}
	const u = Bn(r, ...e);
	return Object.assign({}, ...e, u);
}
var YO = kn((e) => {
		var n = uo();
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
		var w = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : w;
	}),
	FO = kn((e, n) => {
		n.exports = YO();
	}),
	KO = J0(FO(), 1),
	{ useSyncExternalStore: Mp } = KO.default,
	zp = () => () => {};
function Rt(e, n = hp) {
	const r = _.useCallback((l) => (e ? rh(e, null, l) : zp()), [e]),
		u = () => {
			const l = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && l && Ti(f, l)) return f[l];
		};
	return Mp(r, u, u);
}
function kp(e, n) {
	const r = _.useRef({}),
		u = _.useCallback((o) => (e ? rh(e, null, o) : zp()), [e]),
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
					if (!o || !Ti(o, v)) continue;
					const y = o[v];
					y !== h[m] && ((h[m] = y), (f = !0));
				}
			}
			return (f && (r.current = { ...h }), r.current);
		};
	return Mp(u, l, l);
}
function bt(e, n, r, u) {
	const l = Ti(n, r) ? n[r] : void 0,
		o = _p({ value: l, setValue: u ? n[u] : void 0 });
	(Ze(
		() =>
			Qt(e, [r], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[r] !== h[r] && f[r] !== m && v(f[r]);
			}),
		[e, r],
	),
		Ze(() => {
			if (l !== void 0)
				return (
					e.setState(r, l),
					to(e, [r], () => {
						l !== void 0 && e.setState(r, l);
					})
				);
		}));
}
function Co(e, n) {
	const [r, u] = _.useState(() => e(n));
	Ze(() => ih(r), [r]);
	const l = _.useCallback((o) => Rt(r, o), [r]);
	return [
		_.useMemo(() => ({ ...r, useState: l }), [r, l]),
		_e(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var GO = "div";
function y0(e, n) {
	const r = setTimeout(n, e);
	return () => clearTimeout(r);
}
function XO(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function b0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, r) => {
			const u = r.endsWith("ms") ? 1 : 1e3,
				l = Number.parseFloat(r || "0s") * u;
			return l > n ? l : n;
		}, 0);
}
function To(e, n, r) {
	return !r && n !== !1 && (!e || !!n);
}
var uh = Le(function ({ store: n, alwaysVisible: r, ...u }) {
		const l = Wd();
		((n = n || l), pt(n, !1));
		const o = (0, _.useRef)(null),
			f = Ri(u.id),
			[h, m] = (0, _.useState)(null),
			v = n.useState("open"),
			y = n.useState("mounted"),
			w = n.useState("animated"),
			b = n.useState("contentElement"),
			S = Rt(n.disclosure, "contentElement");
		(Ze(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			Ze(() => {
				let D;
				return (
					n?.setState("animated", (A) => ((D = A), !0)),
					() => {
						D !== void 0 && n?.setState("animated", D);
					}
				);
			}, [n]),
			Ze(() => {
				if (w) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return XO(() => {
						m(v ? "enter" : y ? "leave" : null);
					});
				}
			}, [w, b, v, y]),
			Ze(() => {
				if (!n || !w || !h || !b) return;
				const D = () => n?.setState("animating", !1),
					A = () => (0, Ju.flushSync)(D);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof w == "number") return y0(w, A);
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
					Q = b0($, I, U, L) + b0(N, R, j, z);
				if (!Q) {
					(h === "enter" && n.setState("animated", !1), D());
					return;
				}
				return y0(Math.max(Q - 1e3 / 60, 0), A);
			}, [n, w, b, S, v, h]),
			(u = Ht(u, (D) => (0, p.jsx)(eh, { value: n, children: D }), [n])));
		const E = To(y, u.hidden, r),
			C = u.style,
			T = (0, _.useMemo)(() => (E ? { ...C, display: "none" } : C), [E, C]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: St(f ? n.setContentElement : null, o, u.ref),
				style: T,
			}),
			Vr(u)
		);
	}),
	JO = De(function (n) {
		return Ue(GO, uh(n));
	}),
	Ik = De(function ({ unmountOnHide: n, ...r }) {
		const u = Wd();
		return Rt(r.store || u, (l) => !n || l?.mounted) === !1 ? null : (0, p.jsx)(JO, { ...r });
	}),
	Dp = (0, _.createContext)(!0),
	Ao =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function WO(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Ln(e) {
	return !(!e.matches(Ao) || !vp(e) || e.closest("[inert]"));
}
function La(e) {
	if (!Ln(e) || WO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const r = Ai(e);
	return !r || r === e || !("form" in r) || r.form !== e.form || r.name !== e.name;
}
function sh(e, n) {
	const r = Array.from(e.querySelectorAll(Ao));
	n && r.unshift(e);
	const u = r.filter(Ln);
	return (
		u.forEach((l, o) => {
			if (Pd(l) && l.contentDocument) {
				const f = l.contentDocument.body;
				u.splice(o, 1, ...sh(f));
			}
		}),
		u
	);
}
function Ro(e, n, r) {
	const u = Array.from(e.querySelectorAll(Ao)),
		l = u.filter(La);
	return (
		n && La(e) && l.unshift(e),
		l.forEach((o, f) => {
			if (Pd(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Ro(h, !1, r);
				l.splice(f, 1, ...m);
			}
		}),
		!l.length && r ? u : l
	);
}
function eN(e, n, r) {
	const [u] = Ro(e, n, r);
	return u || null;
}
function tN(e, n, r, u) {
	const l = Ai(e),
		o = sh(e, n),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(La) || (r ? o.find(La) : null) || (u ? h[0] : null) || null;
}
function ad(e, n) {
	return tN(document.body, !1, e, n);
}
function nN(e, n, r, u) {
	const l = Ai(e),
		o = sh(e, n).reverse(),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(La) || (r ? o.find(La) : null) || (u ? h[0] : null) || null;
}
function p0(e, n) {
	return nN(document.body, !1, e, n);
}
function iN(e) {
	for (; e && !Ln(e); ) e = e.closest(Ao);
	return e || null;
}
function Ir(e) {
	const n = Ai(e);
	if (!n) return !1;
	if (n === e) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return r ? r === e.id : !1;
}
function nr(e) {
	const n = Ai(e);
	if (!n) return !1;
	if (Ot(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return !r || !("id" in e) ? !1 : r === e.id ? !0 : !!e.querySelector(`#${CSS.escape(r)}`);
}
function jp(e) {
	!nr(e) && Ln(e) && e.focus();
}
function rN(e) {
	var n;
	const r = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", r), e.setAttribute("tabindex", "-1"));
}
function aN(e, n) {
	const r = Ro(e, n);
	for (const u of r) rN(u);
}
function uN(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		r = (u) => {
			const l = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), l ? u.setAttribute("tabindex", l) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && r(e);
	for (const u of n) r(u);
}
function sN(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var lN = "div",
	S0 = go(),
	oN = [
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
	qp = Symbol("safariFocusAncestor");
function cN(e) {
	return e ? !!e[qp] : !1;
}
function w0(e, n) {
	e && (e[qp] = n);
}
function fN(e) {
	const { tagName: n, readOnly: r, type: u } = e;
	return (n === "TEXTAREA" && !r) || (n === "SELECT" && !r)
		? !0
		: n === "INPUT" && !r
			? oN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function dN(e) {
	return "labels" in e ? e.labels : null;
}
function _0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function hN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function mN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function vN(e, n, r, u, l) {
	return e ? (n ? (r && !u ? -1 : void 0) : r ? l : l || 0) : l;
}
function ud(e, n) {
	return _e((r) => {
		(e?.(r), !r.defaultPrevented && n && (r.stopPropagation(), r.preventDefault()));
	});
}
var x0 = !1,
	lh = !0;
function gN(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (lh = !1));
}
function yN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (lh = !0);
}
var gs = Le(function ({ focusable: n = !0, accessibleWhenDisabled: r, autoFocus: u, onFocusVisible: l, ...o }) {
		const f = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			n && (x0 || (Vt("mousedown", gN, !0), Vt("keydown", yN, !0), (x0 = !0)));
		}, [n]),
			S0 &&
				(0, _.useEffect)(() => {
					if (!n) return;
					const F = f.current;
					if (!F || !_0(F)) return;
					const ne = dN(F);
					if (!ne) return;
					const k = () => queueMicrotask(() => F.focus());
					for (const H of ne) H.addEventListener("mouseup", k);
					return () => {
						for (const H of ne) H.removeEventListener("mouseup", k);
					};
				}, [n]));
		const h = n && us(o),
			m = !!h && !r,
			[v, y] = (0, _.useState)(!1);
		((0, _.useEffect)(() => {
			n && m && v && y(!1);
		}, [n, m, v]),
			(0, _.useEffect)(() => {
				if (!n || !v) return;
				const F = f.current;
				if (!F || typeof IntersectionObserver > "u") return;
				const ne = new IntersectionObserver(() => {
					Ln(F) || y(!1);
				});
				return (ne.observe(F), () => ne.disconnect());
			}, [n, v]));
		const w = ud(o.onKeyPressCapture, h),
			b = ud(o.onMouseDownCapture, h),
			S = ud(o.onClickCapture, h),
			E = o.onMouseDown,
			C = _e((F) => {
				if ((E?.(F), F.defaultPrevented || !n)) return;
				const ne = F.currentTarget;
				if (!S0 || pp(F) || (!ir(ne) && !_0(ne))) return;
				let k = !1;
				const H = () => {
					k = !0;
				};
				ne.addEventListener("focusin", H, { capture: !0, once: !0 });
				const B = iN(ne.parentElement);
				(w0(B, !0),
					ja(ne, "mouseup", () => {
						(ne.removeEventListener("focusin", H, !0), w0(B, !1), !k && jp(ne));
					}));
			}),
			T = (F, ne) => {
				if ((ne && (F.currentTarget = ne), !n)) return;
				const k = F.currentTarget;
				k && Ir(k) && (l?.(F), !F.defaultPrevented && ((k.dataset.focusVisible = "true"), y(!0)));
			},
			D = o.onKeyDownCapture,
			A = _e((F) => {
				if ((D?.(F), F.defaultPrevented || !n || v || F.metaKey || F.altKey || F.ctrlKey || !pn(F))) return;
				const ne = F.currentTarget;
				ja(ne, "focusout", () => T(F, ne));
			}),
			N = o.onFocusCapture,
			R = _e((F) => {
				if ((N?.(F), F.defaultPrevented || !n)) return;
				if (!pn(F)) {
					y(!1);
					return;
				}
				const ne = F.currentTarget,
					k = () => T(F, ne);
				lh || fN(F.target) ? ja(F.target, "focusout", k) : y(!1);
			}),
			$ = o.onBlur,
			I = _e((F) => {
				($?.(F), n && Mr(F) && (F.currentTarget.removeAttribute("data-focus-visible"), y(!1)));
			}),
			j = (0, _.useContext)(Dp),
			z = _e((F) => {
				n &&
					u &&
					F &&
					j &&
					queueMicrotask(() => {
						Ir(F) || (Ln(F) && F.focus());
					});
			}),
			U = xp(f),
			L = n && hN(U),
			Q = n && mN(U),
			ie = o.style,
			G = (0, _.useMemo)(() => (m ? { pointerEvents: "none", ...ie } : ie), [m, ie]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: St(f, z, o.ref),
				style: G,
				tabIndex: vN(n, m, L, Q, o.tabIndex),
				disabled: Q && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: w,
				onClickCapture: S,
				onMouseDownCapture: b,
				onMouseDown: C,
				onKeyDownCapture: A,
				onFocusCapture: R,
				onBlur: I,
			}),
			Vr(o)
		);
	}),
	Uk = De(function (n) {
		return Ue(lN, gs(n));
	});
function Ip(e) {
	const n = [];
	for (const r of e) n.push(...r);
	return n;
}
function Ad(e) {
	return e.slice().reverse();
}
var bN = "div";
function pN(e) {
	return e.some((n) => !!n.rowId);
}
function SN(e) {
	const n = e.target;
	return n && !Xn(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function wN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function E0(e, n, r) {
	return _e((u) => {
		var l;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !pn(u) || wN(u) || SN(u))) return;
		const o = (l = er(e, e.getState().activeId)) == null ? void 0 : l.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== r?.current && o.focus(),
			dO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function _N(e) {
	return IO(Ip(Ad(UO(e))));
}
function xN(e) {
	const [n, r] = (0, _.useState)(!1),
		u = (0, _.useCallback)(() => r(!0), []),
		l = e.useState((o) => er(e, o.activeId));
	return (
		(0, _.useEffect)(() => {
			const o = l?.element;
			n && o && (r(!1), o.focus({ preventScroll: !0 }));
		}, [l, n]),
		u
	);
}
var oh = Le(function ({ store: n, composite: r = !0, focusOnMove: u = r, moveOnKeyPress: l = !0, ...o }) {
		const f = _O();
		((n = n || f), pt(n, !1));
		const h = (0, _.useRef)(null),
			m = (0, _.useRef)(null),
			v = xN(n),
			y = n.useState("moves"),
			[, w] = mO(r ? n.setBaseElement : null);
		((0, _.useEffect)(() => {
			var U;
			if (!n || !y || !r || !u) return;
			const { activeId: L } = n.getState(),
				Q = (U = er(n, L)) == null ? void 0 : U.element;
			Q && sN(Q);
		}, [n, y, r, u]),
			Ze(() => {
				if (!n || !y || !r) return;
				const { baseElement: U, activeId: L } = n.getState();
				if (L !== null || !U) return;
				const Q = m.current;
				((m.current = null), Q && Ra(Q, { relatedTarget: U }), Ir(U) || U.focus());
			}, [n, y, r]));
		const b = n.useState("activeId"),
			S = n.useState("virtualFocus");
		Ze(() => {
			var U;
			if (!n || !r || !S) return;
			const L = m.current;
			if (((m.current = null), !L)) return;
			const Q = ((U = er(n, b)) == null ? void 0 : U.element) || Ai(L);
			Q !== L && Ra(L, { relatedTarget: Q });
		}, [n, b, S, r]);
		const E = E0(n, o.onKeyDownCapture, m),
			C = E0(n, o.onKeyUpCapture, m),
			T = o.onFocusCapture,
			D = _e((U) => {
				if ((T?.(U), U.defaultPrevented || !n)) return;
				const { virtualFocus: L } = n.getState();
				if (!L) return;
				const Q = U.relatedTarget,
					ie = BO(U.currentTarget);
				pn(U) && ie && (U.stopPropagation(), (m.current = Q));
			}),
			A = o.onFocus,
			N = _e((U) => {
				if ((A?.(U), U.defaultPrevented || !r || !n)) return;
				const { relatedTarget: L } = U,
					{ virtualFocus: Q } = n.getState();
				Q ? pn(U) && !Pu(n, L) && queueMicrotask(v) : pn(U) && n.setActiveId(null);
			}),
			R = o.onBlurCapture,
			$ = _e((U) => {
				var L;
				if ((R?.(U), U.defaultPrevented || !n)) return;
				const { virtualFocus: Q, activeId: ie } = n.getState();
				if (!Q) return;
				const G = (L = er(n, ie)) == null ? void 0 : L.element,
					F = U.relatedTarget,
					ne = Pu(n, F),
					k = m.current;
				((m.current = null),
					pn(U) && ne
						? (F === G ? k && k !== F && Ra(k, U) : G ? Ra(G, U) : k && Ra(k, U), U.stopPropagation())
						: !Pu(n, U.target) && G && Ra(G, U));
			}),
			I = o.onKeyDown,
			j = rt(l),
			z = _e((U) => {
				var L;
				if ((I?.(U), U.nativeEvent.isComposing || U.defaultPrevented || !n || !pn(U))) return;
				const { orientation: Q, renderedItems: ie, activeId: G } = n.getState(),
					F = er(n, G);
				if ((L = F?.element) != null && L.isConnected) return;
				const ne = Q !== "horizontal",
					k = Q !== "vertical",
					H = pN(ie);
				if (
					(U.key === "ArrowLeft" || U.key === "ArrowRight" || U.key === "Home" || U.key === "End") &&
					Xn(U.currentTarget)
				)
					return;
				const ue = {
					ArrowUp:
						(H || ne) &&
						(() => {
							if (H) {
								const fe = _N(ie);
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
			(o = Ht(o, (U) => (0, p.jsx)(os, { value: n, children: U }), [n])),
			(o = {
				"aria-activedescendant": n.useState((U) => {
					var L;
					if (n && r && U.virtualFocus) return (L = er(n, U.activeId)) == null ? void 0 : L.id;
				}),
				...o,
				ref: St(h, w, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: C,
				onFocusCapture: D,
				onFocus: N,
				onBlurCapture: $,
				onKeyDown: z,
			}),
			(o = gs({ focusable: n.useState((U) => r && (U.virtualFocus || U.activeId === null)), ...o })),
			o
		);
	}),
	Lk = De(function (n) {
		return Ue(bN, oh(n));
	}),
	EN = "div";
function CN({ store: e, ...n }) {
	const [r, u] = (0, _.useState)(void 0),
		l = n["aria-label"],
		o = Rt(e, "disclosureElement"),
		f = Rt(e, "contentElement");
	return (
		(0, _.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (l || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [l, o, f]),
		r
	);
}
var Up = Le(function ({ store: n, alwaysVisible: r, composite: u, ...l }) {
		const o = xo();
		((n = n || o), pt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = Ri(l.id),
			y = l.onKeyDown,
			w = n.useState((R) => R.placement.split("-")[0]),
			b = n.useState((R) => (R.orientation === "both" ? void 0 : R.orientation)),
			S = b !== "vertical",
			E = Rt(h, (R) => !!R && R.orientation !== "vertical"),
			C = _e((R) => {
				if ((y?.(R), !R.defaultPrevented)) {
					if (m || (h && !S)) {
						const $ = {
							ArrowRight: () => w === "left" && !S,
							ArrowLeft: () => w === "right" && !S,
							ArrowUp: () => w === "bottom" && S,
							ArrowDown: () => w === "top" && S,
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
		l = Ht(l, (R) => (0, p.jsx)(DO, { value: n, children: R }), [n]);
		const T = CN({ store: n, ...l }),
			D = To(n.useState("mounted"), l.hidden, r),
			A = D ? { ...l.style, display: "none" } : l.style;
		l = {
			id: v,
			"aria-labelledby": T,
			hidden: D,
			...l,
			ref: St(v ? n.setContentElement : null, l.ref),
			style: A,
			onKeyDown: C,
		};
		const N = !!n.combobox;
		return (
			(u = u ?? !N),
			u && (l = { role: "menu", "aria-orientation": b, ...l }),
			(l = oh({ store: n, composite: u, ...l })),
			(l = nh({ store: n, typeahead: !N, ...l })),
			l
		);
	}),
	$k = De(function (n) {
		return Ue(EN, Up(n));
	});
function sd(e) {
	return [e.clientX, e.clientY];
}
function C0(e, n) {
	const [r, u] = e;
	let l = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, y] = n[h],
			[w, b] = n[m],
			[, S] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (y - b) * (r - v) - (v - w) * (u - y);
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
		} else if (u === y && ((r >= w && r <= v) || (r >= v && r <= w))) return !0;
	}
	return l;
}
function TN(e, n) {
	const { top: r, right: u, bottom: l, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < r ? "top" : h > l ? "bottom" : null];
}
function T0(e, n) {
	const r = e.getBoundingClientRect(),
		{ top: u, right: l, bottom: o, left: f } = r,
		[h, m] = TN(n, r),
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
var A0 = (0, _.createContext)(null),
	AN = "span",
	Lp = Le(function (n) {
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
	Bk = De(function (n) {
		return Ue(AN, Lp(n));
	}),
	RN = "span",
	ON = Le(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = Lp(n)),
			n
		);
	}),
	Hl = De(function (n) {
		return Ue(RN, ON(n));
	}),
	NN = "div";
function MN(e) {
	return nt(e).body;
}
function zN(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : nt(e).createElement("div");
}
function kN(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Wi(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var $p = Le(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: r,
		portalElement: u,
		portalRef: l,
		portal: o = !0,
		...f
	}) {
		const h = (0, _.useRef)(null),
			m = St(h, f.ref),
			v = (0, _.useContext)(A0),
			[y, w] = (0, _.useState)(null),
			[b, S] = (0, _.useState)(null),
			E = (0, _.useRef)(null),
			C = (0, _.useRef)(null),
			T = (0, _.useRef)(null),
			D = (0, _.useRef)(null);
		return (
			Ze(() => {
				const A = h.current;
				if (!A || !o) {
					w(null);
					return;
				}
				const N = zN(A, u);
				if (!N) {
					w(null);
					return;
				}
				const R = N.isConnected;
				if ((R || (v || MN(A)).appendChild(N), N.id || (N.id = A.id ? `portal/${A.id}` : kN()), w(N), xd(l, N), !R))
					return () => {
						(N.remove(), xd(l, null));
					};
			}, [o, u, v, l]),
			Ze(() => {
				if (!o || !n || !r) return;
				const A = nt(r).createElement("span");
				return (
					(A.style.position = "fixed"),
					r.insertAdjacentElement("afterend", A),
					S(A),
					() => {
						(A.remove(), S(null));
					}
				);
			}, [o, n, r]),
			(0, _.useEffect)(() => {
				if (!y || !n) return;
				let A = 0;
				const N = (R) => {
					if (!Mr(R)) return;
					const $ = R.type === "focusin";
					if ((cancelAnimationFrame(A), $)) return uN(y);
					A = requestAnimationFrame(() => {
						aN(y, !0);
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
			(f = Ht(
				f,
				(A) => {
					if (((A = (0, p.jsx)(A0.Provider, { value: y || v, children: A })), !o)) return A;
					if (!y) return (0, p.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((A = (0, p.jsxs)(p.Fragment, {
						children: [
							n &&
								y &&
								(0, p.jsx)(Hl, {
									ref: C,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (R) => {
										Mr(R, y) ? Wi(ad()) : Wi(E.current);
									},
								}),
							A,
							n &&
								y &&
								(0, p.jsx)(Hl, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (R) => {
										Mr(R, y) ? Wi(p0()) : Wi(D.current);
									},
								}),
						],
					})),
						y && (A = (0, Ju.createPortal)(A, y)));
					let N = (0, p.jsxs)(p.Fragment, {
						children: [
							n &&
								y &&
								(0, p.jsx)(Hl, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (R) => {
										R.relatedTarget !== D.current && Mr(R, y) ? Wi(C.current) : Wi(p0());
									},
								}),
							n && (0, p.jsx)("span", { "aria-owns": y?.id, style: { position: "fixed" } }),
							n &&
								y &&
								(0, p.jsx)(Hl, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (R) => {
										if (Mr(R, y)) Wi(T.current);
										else {
											const $ = ad();
											if ($ === C.current) {
												requestAnimationFrame(() => {
													var I;
													return (I = ad()) == null ? void 0 : I.focus();
												});
												return;
											}
											Wi($);
										}
									},
								}),
						],
					});
					return (b && n && (N = (0, Ju.createPortal)(N, b)), (0, p.jsxs)(p.Fragment, { children: [N, A] }));
				},
				[y, v, o, f.id, n, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	Vk = De(function (n) {
		return Ue(NN, $p(n));
	}),
	R0 = (0, _.createContext)(0);
function DN({ level: e, children: n }) {
	const r = (0, _.useContext)(R0),
		u = Math.max(Math.min(e || r + 1, 6), 1);
	return (0, p.jsx)(R0.Provider, { value: u, children: n });
}
var jN = "div",
	Bp = Le(function ({ autoFocusOnShow: n = !0, ...r }) {
		return ((r = Ht(r, (u) => (0, p.jsx)(Dp.Provider, { value: n, children: u }), [n])), r);
	}),
	Hk = De(function (n) {
		return Ue(jN, Bp(n));
	});
function qN(e, n) {
	const r = nt(e).createElement("button");
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
function IN(e) {
	const n = (0, _.useRef)();
	return (
		(0, _.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return Vt(
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
var ld = new WeakMap();
function ys(e, n, r) {
	ld.has(e) || ld.set(e, new Map());
	const u = ld.get(e),
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
function ch(e, n, r) {
	return ys(e, n, () => {
		const l = e.getAttribute(n);
		return (
			e.setAttribute(n, r),
			() => {
				l == null ? e.removeAttribute(n) : e.setAttribute(n, l);
			}
		);
	});
}
function Ur(e, n, r) {
	return ys(e, n, () => {
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
function Rd(e, n) {
	return e
		? ys(e, "style", () => {
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
function UN(e, n, r) {
	return e
		? ys(e, n, () => {
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
var LN = ["SCRIPT", "STYLE"];
function Od(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function $N(e, n) {
	const r = nt(n),
		u = Od(e);
	if (!r.body[u]) return !0;
	do {
		if (n === r.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function BN(e, n, r) {
	return LN.includes(n.tagName) || !$N(e, n) ? !1 : !r.some((u) => u && Ot(n, u));
}
function fh(e, n, r, u) {
	for (let l of n) {
		if (!l?.isConnected) continue;
		const o = n.some((m) => (!m || m === l ? !1 : m.contains(l))),
			f = nt(l),
			h = l;
		for (; l.parentElement && l !== f.body; ) {
			if ((u?.(l.parentElement, h), !o)) for (const m of l.parentElement.children) BN(e, m, n) && r(m, h);
			l = l.parentElement;
		}
	}
}
function VN(e, n) {
	const { body: r } = nt(n[0]),
		u = [];
	return (
		fh(e, n, (o) => {
			u.push(Ur(o, Od(e), !0));
		}),
		sn(Ur(r, Od(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function Vp(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-backdrop");
	return r == null ? !1 : r === "" || r === "true" || !n.length ? !0 : n.some((u) => r === u);
}
function $a(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function HN(e, n = "") {
	return sn(Ur(e, $a(), !0), Ur(e, $a(n), !0));
}
function Hp(e, n = "") {
	return sn(Ur(e, $a("", !0), !0), Ur(e, $a(n, !0), !0));
}
function dh(e, n) {
	const r = $a(n, !0);
	if (e[r]) return !0;
	const u = $a(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function O0(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		fh(
			e,
			n,
			(o) => {
				Vp(o, ...u) || r.unshift(HN(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || r.unshift(Hp(o, e));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function ZN(e) {
	return e.tagName === "HTML" ? !0 : Ot(nt(e).body, e);
}
function QN(e, n) {
	if (!e) return !1;
	if (Ot(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	if (r) {
		const u = nt(e).getElementById(r);
		if (u) return Ot(e, u);
	}
	return !1;
}
function PN(e, n) {
	if (!("clientY" in e)) return !1;
	const r = n.getBoundingClientRect();
	return r.width === 0 || r.height === 0
		? !1
		: r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;
}
function od({ store: e, type: n, listener: r, capture: u, domReady: l }) {
	const o = _e(r),
		f = Rt(e, "open"),
		h = (0, _.useRef)(!1);
	(Ze(() => {
		if (!f || !l) return;
		const { contentElement: m } = e.getState();
		if (!m) return;
		const v = () => {
			h.current = !0;
		};
		return (m.addEventListener("focusin", v, !0), () => m.removeEventListener("focusin", v, !0));
	}, [e, f, l]),
		(0, _.useEffect)(
			() =>
				f
					? Vt(
							n,
							(v) => {
								const { contentElement: y, disclosureElement: w } = e.getState(),
									b = v.target;
								y &&
									b &&
									ZN(b) &&
									(Ot(y, b) ||
										QN(w, b) ||
										b.hasAttribute("data-focus-trap") ||
										PN(v, y) ||
										(h.current && !dh(b, y.id)) ||
										cN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function cd(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function YN(e, n, r) {
	const u = IN(Rt(e, "open")),
		l = { store: e, domReady: r, capture: !0 };
	(od({
		...l,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && vp(h) && dh(h, f?.id) && cd(n, o) && e.hide();
		},
	}),
		od({
			...l,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== nt(f) && cd(n, o) && e.hide();
			},
		}),
		od({
			...l,
			type: "contextmenu",
			listener: (o) => {
				cd(n, o) && e.hide();
			},
		}));
}
var N0 = (0, _.createContext)({});
function FN(e) {
	const n = (0, _.useContext)(N0),
		[r, u] = (0, _.useState)([]),
		l = (0, _.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					sn((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	Ze(
		() =>
			Qt(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, _.useMemo)(() => ({ store: e, add: l }), [e, l]);
	return {
		wrapElement: (0, _.useCallback)((f) => (0, p.jsx)(N0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: r,
	};
}
function KN({ attribute: e, contentId: n, contentElement: r, enabled: u }) {
	const [l, o] = Ep(),
		f = (0, _.useCallback)(() => {
			if (!u || !r) return !1;
			const { body: h } = nt(r),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [l, u, r, e, n]);
	return (
		(0, _.useEffect)(() => {
			if (!u || !n || !r) return;
			const { body: h } = nt(r);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, Ju.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [l, u, n, r, f, e]),
		f
	);
}
function GN(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function XN(e, n, r) {
	const u = KN({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: r });
	(0, _.useEffect)(() => {
		if (!u() || !e) return;
		const l = nt(e),
			o = mp(e),
			{ documentElement: f, body: h } = l,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			y = () => UN(f, "--scrollbar-width", `${v}px`),
			w = GN(f),
			b = () => Rd(h, { overflow: "hidden", [w]: `${v}px` }),
			S = () => {
				var C, T;
				const { scrollX: D, scrollY: A, visualViewport: N } = o,
					R = (C = N?.offsetLeft) != null ? C : 0,
					$ = (T = N?.offsetTop) != null ? T : 0,
					I = Rd(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(A - Math.floor($))}px`,
						left: `${-(D - Math.floor(R))}px`,
						right: "0",
						[w]: `${v}px`,
					});
				return () => {
					(I(), o.scrollTo({ left: D, top: A, behavior: "instant" }));
				};
			},
			E = Fd() && !cO();
		return sn(y(), E ? S() : b());
	}, [u, e]);
}
function JN(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-focus-trap");
	return r == null ? !1 : n.length ? (r === "" ? !1 : n.some((u) => r === u)) : !0;
}
function Zp() {
	return "inert" in HTMLElement.prototype;
}
function WN(e) {
	return ch(e, "aria-hidden", "true");
}
function Qp(e, n) {
	return "style" in e
		? Zp()
			? Ur(e, "inert", !0)
			: sn(
					...Ro(e, !0).map((r) => {
						if (n?.some((l) => l && Ot(l, r))) return Qu;
						const u = ys(
							r,
							"focus",
							() => (
								(r.focus = Qu),
								() => {
									delete r.focus;
								}
							),
						);
						return sn(ch(r, "tabindex", "-1"), u);
					}),
					WN(e),
					Rd(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: Qu;
}
function e2(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		fh(
			e,
			n,
			(o) => {
				Vp(o, ...u) || JN(o, ...u) || r.unshift(Qp(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Ot(f, o)) || r.unshift(ch(o, "role", "none")));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function Pp(e = {}) {
	const n = Eo(e.store, ah(e.disclosure, ["contentElement", "disclosureElement"]));
	const r = n?.getState(),
		u = Ee(e.open, r?.open, e.defaultOpen, !1),
		l = Ee(e.animated, r?.animated, !1),
		o = Bn(
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
		Kt(o, () =>
			Qt(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Kt(o, () =>
			rh(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Kt(o, () =>
			Qt(o, ["open", "animating"], (f) => {
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
function Yp(e, n, r) {
	return (
		Qa(n, [r.store, r.disclosure]),
		bt(e, r, "open", "setOpen"),
		bt(e, r, "mounted", "setMounted"),
		bt(e, r, "animated"),
		Object.assign(e, { disclosure: r.disclosure })
	);
}
function t2(e = {}) {
	const [n, r] = Co(Pp, e);
	return Yp(n, r, e);
}
var n2 = "div",
	i2 = [
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
	Zk = Le(function (n) {
		return n;
	}),
	no = De(function (n) {
		return Ue(n2, n);
	});
Object.assign(
	no,
	i2.reduce(
		(e, n) => (
			(e[n] = De(function (u) {
				return Ue(n, u);
			})),
			e
		),
		{},
	),
);
function r2({ store: e, backdrop: n, alwaysVisible: r, hidden: u }) {
	const l = (0, _.useRef)(null),
		o = t2({ disclosure: e }),
		f = Rt(e, "contentElement");
	((0, _.useEffect)(() => {
		const v = l.current,
			y = f;
		v && y && (v.style.zIndex = getComputedStyle(y).zIndex);
	}, [f]),
		Ze(() => {
			const v = f?.id;
			if (!v) return;
			const y = l.current;
			if (y) return Hp(y, v);
		}, [f]));
	const h = uh({
		ref: l,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: r,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, _.isValidElement)(n)) return (0, p.jsx)(no, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, p.jsx)(no, { ...h, render: (0, p.jsx)(m, {}) });
}
function Fp(e = {}) {
	return Pp(e);
}
function Kp(e, n, r) {
	return Yp(e, n, r);
}
function a2(e = {}) {
	const [n, r] = Co(Fp, e);
	return Kp(n, r, e);
}
var u2 = "div",
	M0 = go();
function s2(e) {
	const n = Ai();
	return !n || (e && Ot(e, n)) ? !1 : !!Ln(n);
}
function z0(e, n = !1) {
	if (!e) return null;
	const r = "current" in e ? e.current : e;
	return r ? (n ? (Ln(r) ? r : null) : r) : null;
}
var Gp = Le(function ({
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
	preventBodyScroll: w = !!o,
	autoFocusOnShow: b = !0,
	autoFocusOnHide: S = !0,
	initialFocus: E,
	finalFocus: C,
	unmountOnHide: T,
	unstable_treeSnapshotKey: D,
	...A
}) {
	const N = So(),
		R = (0, _.useRef)(null),
		$ = a2({
			store: n || N,
			open: r,
			setOpen(de) {
				if (de) return;
				const we = R.current;
				if (!we) return;
				const ut = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && we.addEventListener("close", u, { once: !0 }),
					we.dispatchEvent(ut),
					ut.defaultPrevented && $.setOpen(!0));
			},
		}),
		{ portalRef: I, domReady: j } = Gd(f, A.portalRef),
		z = A.preserveTabOrder,
		U = Rt($, (de) => z && !o && de.mounted),
		L = Ri(A.id),
		Q = Rt($, "open"),
		ie = Rt($, "mounted"),
		G = Rt($, "contentElement"),
		F = To(ie, A.hidden, A.alwaysVisible);
	(XN(G, L, w && !F), YN($, v, j));
	const { wrapElement: ne, nestedDialogs: k } = FN($);
	((A = Ht(A, ne, [ne])),
		Ze(() => {
			if (!Q) return;
			const de = R.current,
				we = Ai(de, !0);
			we && we.tagName !== "BODY" && ((de && Ot(de, we)) || $.setDisclosureElement(we));
		}, [$, Q]),
		M0 &&
			(0, _.useEffect)(() => {
				if (!ie) return;
				const { disclosureElement: de } = $.getState();
				if (!de || !ir(de)) return;
				const we = () => {
					let ut = !1;
					const Ie = () => {
						ut = !0;
					};
					(de.addEventListener("focusin", Ie, { capture: !0, once: !0 }),
						ja(de, "mouseup", () => {
							(de.removeEventListener("focusin", Ie, !0), !ut && jp(de));
						}));
				};
				return (
					de.addEventListener("mousedown", we),
					() => {
						de.removeEventListener("mousedown", we);
					}
				);
			}, [$, ie]),
		(0, _.useEffect)(() => {
			if (!ie || !j) return;
			const de = R.current;
			if (!de) return;
			const we = mp(de),
				ut = we.visualViewport || we,
				Ie = () => {
					var Dt, ct;
					const ae = (ct = (Dt = we.visualViewport) == null ? void 0 : Dt.height) != null ? ct : we.innerHeight;
					de.style.setProperty("--dialog-viewport-height", `${ae}px`);
				};
			return (
				Ie(),
				ut.addEventListener("resize", Ie),
				() => {
					ut.removeEventListener("resize", Ie);
				}
			);
		}, [ie, j]),
		(0, _.useEffect)(() => {
			if (!o || !ie || !j) return;
			const de = R.current;
			if (de && !de.querySelector("[data-dialog-dismiss]")) return qN(de, $.hide);
		}, [$, o, ie, j]),
		Ze(() => {
			if (!Zp() || Q || !ie || !j) return;
			const de = R.current;
			if (de) return Qp(de);
		}, [Q, ie, j]));
	const H = Q && j;
	Ze(() => {
		if (!L || !H) return;
		const de = R.current;
		return VN(L, [de]);
	}, [L, H, D]);
	const B = _e(y);
	Ze(() => {
		if (!L || !H) return;
		const { disclosureElement: de } = $.getState(),
			we = [R.current, ...(B() || []), ...k.map((ut) => ut.getState().contentElement)];
		return o ? sn(O0(L, we), e2(L, we)) : O0(L, [de, ...we]);
	}, [L, $, H, B, k, o, D]);
	const ue = !!b,
		fe = rt(b),
		[qe, O] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!Q || !ue || !j || !G?.isConnected) return;
		const de = z0(E, !0) || G.querySelector("[data-autofocus=true],[autofocus]") || eN(G, !0, f && U) || G,
			we = Ln(de);
		fe(we ? de : null) &&
			(O(!0),
			queueMicrotask(() => {
				(de.focus(), M0 && we && de.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [Q, ue, j, G, E, f, U, fe]);
	const X = !!S,
		re = rt(S),
		[le, me] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (Q) return (me(!0), () => me(!1));
	}, [Q]);
	const ge = (0, _.useCallback)(
			(de, we = !0) => {
				const { disclosureElement: ut } = $.getState();
				if (s2(de)) return;
				let Ie = z0(C) || ut;
				if (Ie?.id) {
					const ct = nt(Ie),
						ae = `[aria-activedescendant="${Ie.id}"]`,
						Ae = ct.querySelector(ae);
					Ae && (Ie = Ae);
				}
				if (Ie && !Ln(Ie)) {
					const ct = Ie.closest("[data-dialog]");
					if (ct?.id) {
						const ae = nt(ct),
							Ae = `[aria-controls~="${ct.id}"]`,
							mt = ae.querySelector(Ae);
						mt && (Ie = mt);
					}
				}
				const Dt = Ie && Ln(Ie);
				if (!Dt && we) {
					requestAnimationFrame(() => ge(de, !1));
					return;
				}
				re(Dt ? Ie : null) && Dt && Ie?.focus({ preventScroll: !0 });
			},
			[$, C, re],
		),
		be = (0, _.useRef)(!1);
	(Ze(() => {
		if (Q || !le || !X) return;
		const de = R.current;
		((be.current = !0), ge(de));
	}, [Q, le, j, X, ge]),
		(0, _.useEffect)(() => {
			if (!le || !X) return;
			const de = R.current;
			return () => {
				if (be.current) {
					be.current = !1;
					return;
				}
				ge(de);
			};
		}, [le, X, ge]));
	const Ve = rt(m);
	((0, _.useEffect)(
		() =>
			!j || !ie
				? void 0
				: Vt(
						"keydown",
						(we) => {
							if (we.key !== "Escape" || we.defaultPrevented) return;
							const ut = R.current;
							if (!ut || dh(ut)) return;
							const Ie = we.target;
							if (!Ie) return;
							const { disclosureElement: Dt } = $.getState();
							!!(Ie.tagName === "BODY" || Ot(ut, Ie) || !Dt || Ot(Dt, Ie)) && Ve(we) && $.hide();
						},
						!0,
					),
		[$, j, ie, Ve],
	),
		(A = Ht(A, (de) => (0, p.jsx)(DN, { level: o ? 1 : void 0, children: de }), [o])));
	const Me = A.hidden,
		ot = A.alwaysVisible;
	A = Ht(
		A,
		(de) =>
			h
				? (0, p.jsxs)(p.Fragment, {
						children: [(0, p.jsx)(r2, { store: $, backdrop: h, hidden: Me, alwaysVisible: ot }), de],
					})
				: de,
		[$, h, Me, ot],
	);
	const [wt, Sn] = (0, _.useState)(),
		[cn, kt] = (0, _.useState)();
	return (
		(A = Ht(
			A,
			(de) =>
				(0, p.jsx)(eh, {
					value: $,
					children: (0, p.jsx)(NO.Provider, {
						value: Sn,
						children: (0, p.jsx)(MO.Provider, { value: kt, children: de }),
					}),
				}),
			[$],
		)),
		(A = {
			id: L,
			"data-dialog": "",
			role: "dialog",
			tabIndex: l ? -1 : void 0,
			"aria-labelledby": wt,
			"aria-describedby": cn,
			...A,
			ref: St(R, A.ref),
		}),
		(A = Bp({ ...A, autoFocusOnShow: qe })),
		(A = uh({ store: $, ...A })),
		(A = gs({ ...A, focusable: l })),
		(A = $p({ portal: f, ...A, portalRef: I, preserveTabOrder: U })),
		A
	);
});
function bs(e, n = So) {
	return De(function (u) {
		const l = n();
		return Rt(u.store || l, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, p.jsx)(e, { ...u }) : null;
	});
}
var Qk = bs(
		De(function (n) {
			return Ue(u2, Gp(n));
		}),
		So,
	),
	rr = Math.min,
	Ei = Math.max,
	io = Math.round,
	Zl = Math.floor,
	Ci = (e) => ({ x: e, y: e }),
	l2 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Xp(e, n, r) {
	return Ei(e, rr(n, r));
}
function ar(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function ur(e) {
	return e.split("-")[0];
}
function Pa(e) {
	return e.split("-")[1];
}
function hh(e) {
	return e === "x" ? "y" : "x";
}
function mh(e) {
	return e === "y" ? "height" : "width";
}
function Fn(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function vh(e) {
	return hh(Fn(e));
}
function o2(e, n, r) {
	r === void 0 && (r = !1);
	const u = Pa(e),
		l = vh(e),
		o = mh(l);
	let f = l === "x" ? (u === (r ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = ro(f)), [f, ro(f)]);
}
function c2(e) {
	const n = ro(e);
	return [Nd(e), n, Nd(n)];
}
function Nd(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var k0 = ["left", "right"],
	D0 = ["right", "left"],
	f2 = ["top", "bottom"],
	d2 = ["bottom", "top"];
function h2(e, n, r) {
	switch (e) {
		case "top":
		case "bottom":
			return r ? (n ? D0 : k0) : n ? k0 : D0;
		case "left":
		case "right":
			return n ? f2 : d2;
		default:
			return [];
	}
}
function m2(e, n, r, u) {
	const l = Pa(e);
	let o = h2(ur(e), r === "start", u);
	return (l && ((o = o.map((f) => f + "-" + l)), n && (o = o.concat(o.map(Nd)))), o);
}
function ro(e) {
	const n = ur(e);
	return l2[n] + e.slice(n.length);
}
function v2(e) {
	var n, r, u, l;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (r = e.right) != null ? r : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (l = e.left) != null ? l : 0,
	};
}
function Jp(e) {
	return typeof e != "number" ? v2(e) : { top: e, right: e, bottom: e, left: e };
}
function ao(e) {
	const { x: n, y: r, width: u, height: l } = e;
	return { width: u, height: l, top: r, left: n, right: n + u, bottom: r + l, x: n, y: r };
}
function j0(e, n, r) {
	let { reference: u, floating: l } = e;
	const o = Fn(n),
		f = vh(n),
		h = mh(f),
		m = ur(n),
		v = o === "y",
		y = u.x + u.width / 2 - l.width / 2,
		w = u.y + u.height / 2 - l.height / 2,
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
			S = { x: u.x + u.width, y: w };
			break;
		case "left":
			S = { x: u.x - l.width, y: w };
			break;
		default:
			S = { x: u.x, y: u.y };
	}
	const E = Pa(n);
	return (E && (S[f] += b * (E === "end" ? 1 : -1) * (r && v ? -1 : 1)), S);
}
async function g2(e, n) {
	var r;
	n === void 0 && (n = {});
	const { x: u, y: l, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: y = "viewport",
			elementContext: w = "floating",
			altBoundary: b = !1,
			padding: S = 0,
		} = ar(n, e),
		E = Jp(S),
		C = h[b ? (w === "floating" ? "reference" : "floating") : w],
		T = ao(
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
		D = w === "floating" ? { x: u, y: l, width: f.floating.width, height: f.floating.height } : f.reference,
		A = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		N = ((await (o.isElement == null ? void 0 : o.isElement(A))) &&
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
		top: (T.top - R.top + E.top) / N.y,
		bottom: (R.bottom - T.bottom + E.bottom) / N.y,
		left: (T.left - R.left + E.left) / N.x,
		right: (R.right - T.right + E.right) / N.x,
	};
}
var y2 = 50,
	b2 = async (e, n, r) => {
		const { placement: u = "bottom", strategy: l = "absolute", middleware: o = [], platform: f } = r,
			h = f.detectOverflow ? f : { ...f, detectOverflow: g2 },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: l }),
			{ x: y, y: w } = j0(v, u, m),
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
					y: w,
					initialPlacement: u,
					placement: b,
					strategy: l,
					middlewareData: E,
					rects: v,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((y = N ?? y),
				(w = R ?? w),
				(E[D] = { ...E[D], ...$ }),
				I &&
					S < y2 &&
					(S++,
					typeof I == "object" &&
						(I.placement && (b = I.placement),
						I.rects &&
							(v = I.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: l }) : I.rects),
						({ x: y, y: w } = j0(v, b, m))),
					(C = -1)));
		}
		return { x: y, y: w, placement: b, strategy: l, middlewareData: E };
	},
	p2 = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: r, y: u, placement: l, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: y = 0 } = ar(e, n) || {};
			if (v == null) return {};
			const w = Jp(y),
				b = { x: r, y: u },
				S = vh(l),
				E = mh(S),
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
				L = rr(w[D], U),
				Q = rr(w[A], U),
				ie = j - C[E] - Q,
				G = j / 2 - C[E] / 2 + z,
				F = Xp(L, G, ie),
				ne = !m.arrow && Pa(l) != null && G !== F && o.reference[E] / 2 - (G < L ? L : Q) - C[E] / 2 < 0,
				k = ne ? (G < L ? G - L : G - ie) : 0;
			return { [S]: b[S] + k, data: { [S]: F, centerOffset: G - F - k, ...(ne && { alignmentOffset: k }) }, reset: ne };
		},
	}),
	S2 = function (e) {
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
							crossAxis: w = !0,
							fallbackPlacements: b,
							fallbackStrategy: S = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: C = !0,
							...T
						} = ar(e, n);
					if ((r = o.arrow) != null && r.alignmentOffset) return {};
					const D = ur(l),
						A = Fn(h),
						N = ur(h) === h,
						R = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						$ = b || (N || !C ? [ro(h)] : c2(h)),
						I = E !== "none";
					!b && I && $.push(...m2(h, C, E, R));
					const j = [h, ...$],
						z = await m.detectOverflow(n, T),
						U = [];
					let L = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((y && U.push(z[D]), w)) {
						const F = o2(l, f, R);
						U.push(z[F[0]], z[F[1]]);
					}
					if (((L = [...L, { placement: l, overflows: U }]), !U.every((F) => F <= 0))) {
						var Q, ie;
						const F = (((Q = o.flip) == null ? void 0 : Q.index) || 0) + 1,
							ne = j[F];
						if (
							ne &&
							(!(w === "alignment" && A !== Fn(ne)) ||
								L.every((H) => (Fn(H.placement) === A ? H.overflows[0] > 0 : !0)))
						)
							return { data: { index: F, overflows: L }, reset: { placement: ne } };
						let k =
							(ie = L.filter((H) => H.overflows[0] <= 0).sort((H, B) => H.overflows[1] - B.overflows[1])[0]) == null
								? void 0
								: ie.placement;
						if (!k)
							switch (S) {
								case "bestFit": {
									var G;
									const H =
										(G = L.filter((B) => {
											if (I) {
												const ue = Fn(B.placement);
												return ue === A || ue === "y";
											}
											return !0;
										})
											.map((B) => [B.placement, B.overflows.filter((ue) => ue > 0).reduce((ue, fe) => ue + fe, 0)])
											.sort((B, ue) => B[1] - ue[1])[0]) == null
											? void 0
											: G[0];
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
	Wp = new Set(["left", "top"]);
async function w2(e, n) {
	const { placement: r, platform: u, elements: l } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)),
		f = ur(r),
		h = Pa(r),
		m = Fn(r) === "y",
		v = Wp.has(f) ? -1 : 1,
		y = o && m ? -1 : 1,
		w = ar(n, e);
	let {
		mainAxis: b,
		crossAxis: S,
		alignmentAxis: E,
	} = typeof w == "number"
		? { mainAxis: w, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: w.mainAxis || 0, crossAxis: w.crossAxis || 0, alignmentAxis: w.alignmentAxis };
	return (
		h && typeof E == "number" && (S = h === "end" ? E * -1 : E),
		m ? { x: S * y, y: b * v } : { x: b * v, y: S * y }
	);
}
var _2 = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var r, u;
					const { x: l, y: o, placement: f, middlewareData: h } = n,
						m = await w2(n, e);
					return f === ((r = h.offset) == null ? void 0 : r.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: l + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	x2 = function (e) {
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
						} = ar(e, n),
						y = { x: r, y: u },
						w = await o.detectOverflow(n, v),
						b = Fn(l),
						S = hh(b);
					let E = y[S],
						C = y[b];
					const T = (A, N) => Xp(N + w[A === "y" ? "top" : "left"], N, N - w[A === "y" ? "bottom" : "right"]);
					(f && (E = T(S, E)), h && (C = T(b, C)));
					const D = m.fn({ ...n, [S]: E, [b]: C });
					return { ...D, data: { x: D.x - r, y: D.y - u, enabled: { [S]: f, [b]: h } } };
				},
			}
		);
	},
	E2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var r, u;
					const { x: l, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: y = !0, crossAxis: w = !0 } = ar(e, n),
						b = { x: l, y: o },
						S = Fn(f),
						E = hh(S);
					let C = b[E],
						T = b[S];
					const D = ar(v, n),
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
					if (w) {
						var N, R;
						const $ = E === "y" ? "width" : "height",
							I = Wp.has(ur(f)),
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
	C2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: r, rects: u, platform: l, elements: o } = n,
						{ apply: f = () => {}, ...h } = ar(e, n),
						m = await l.detectOverflow(n, h),
						v = ur(r),
						y = Pa(r),
						w = Fn(r) === "y",
						{ width: b, height: S } = u.floating;
					let E, C;
					v === "top" || v === "bottom"
						? ((E = v),
							(C =
								y === ((await (l.isRTL == null ? void 0 : l.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((C = v), (E = y === "end" ? "top" : "bottom"));
					const T = S - m.top - m.bottom,
						D = b - m.left - m.right,
						A = rr(S - m[E], T),
						N = rr(b - m[C], D),
						R = n.middlewareData.shift,
						$ = !R;
					let I = A,
						j = N;
					(R != null && R.enabled.x && (j = D),
						R != null && R.enabled.y && (I = T),
						$ && !y && (w ? (j = b - 2 * Ei(m.left, m.right)) : (I = S - 2 * Ei(m.top, m.bottom))),
						await f({ ...n, availableWidth: j, availableHeight: I }));
					const z = await l.getDimensions(o.floating);
					return b !== z.width || S !== z.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Oo() {
	return typeof window < "u";
}
function Ya(e) {
	return eS(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function un(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Oi(e) {
	var n;
	return (n = (eS(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function eS(e) {
	return Oo() ? e instanceof Node || e instanceof un(e).Node : !1;
}
function Kn(e) {
	return Oo() ? e instanceof Element || e instanceof un(e).Element : !1;
}
function or(e) {
	return Oo() ? e instanceof HTMLElement || e instanceof un(e).HTMLElement : !1;
}
function q0(e) {
	return !Oo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof un(e).ShadowRoot;
}
function No(e) {
	const { overflow: n, overflowX: r, overflowY: u, display: l } = Gn(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + r) && l !== "inline" && l !== "contents";
}
function T2(e) {
	return /^(table|td|th)$/.test(Ya(e));
}
function Mo(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var A2 = /transform|translate|scale|rotate|perspective|filter/,
	R2 = /paint|layout|strict|content/,
	Nr = (e) => !!e && e !== "none",
	fd;
function gh(e) {
	const n = Kn(e) ? Gn(e) : e;
	return (
		Nr(n.transform) ||
		Nr(n.translate) ||
		Nr(n.scale) ||
		Nr(n.rotate) ||
		Nr(n.perspective) ||
		(!yh() && (Nr(n.backdropFilter) || Nr(n.filter))) ||
		A2.test(n.willChange || "") ||
		R2.test(n.contain || "")
	);
}
function O2(e) {
	let n = Lr(e);
	for (; or(n) && !ts(n); ) {
		if (gh(n)) return n;
		if (Mo(n)) return null;
		n = Lr(n);
	}
	return null;
}
function yh() {
	return (fd == null && (fd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), fd);
}
function ts(e) {
	return /^(html|body|#document)$/.test(Ya(e));
}
function Gn(e) {
	return un(e).getComputedStyle(e);
}
function zo(e) {
	return Kn(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Lr(e) {
	if (Ya(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (q0(e) && e.host) || Oi(e);
	return q0(n) ? n.host : n;
}
function tS(e) {
	const n = Lr(e);
	return ts(n) ? (e.ownerDocument || e).body : or(n) && No(n) ? n : tS(n);
}
function ns(e, n, r) {
	var u;
	(n === void 0 && (n = []), r === void 0 && (r = !0));
	const l = tS(e),
		o = l === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = un(l);
	if (o) {
		const h = Md(f);
		return n.concat(f, f.visualViewport || [], No(l) ? l : [], h && r ? ns(h) : []);
	} else return n.concat(l, ns(l, [], r));
}
function Md(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function nS(e) {
	const n = Gn(e);
	let r = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const l = or(e),
		o = l ? e.offsetWidth : r,
		f = l ? e.offsetHeight : u,
		h = io(r) !== o || io(u) !== f;
	return (h && ((r = o), (u = f)), { width: r, height: u, $: h });
}
function bh(e) {
	return Kn(e) ? e : e.contextElement;
}
function qa(e) {
	const n = bh(e);
	if (!or(n)) return Ci(1);
	const r = n.getBoundingClientRect(),
		{ width: u, height: l, $: o } = nS(n);
	let f = (o ? io(r.width) : r.width) / u,
		h = (o ? io(r.height) : r.height) / l;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var N2 = Ci(0);
function iS(e) {
	const n = un(e);
	return !yh() || !n.visualViewport ? N2 : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function M2(e, n, r) {
	return (n === void 0 && (n = !1), !!r && n && r === un(e));
}
function $r(e, n, r, u) {
	(n === void 0 && (n = !1), r === void 0 && (r = !1));
	const l = e.getBoundingClientRect(),
		o = bh(e);
	let f = Ci(1);
	n && (u ? Kn(u) && (f = qa(u)) : (f = qa(e)));
	const h = M2(o, r, u) ? iS(o) : Ci(0);
	let m = (l.left + h.x) / f.x,
		v = (l.top + h.y) / f.y,
		y = l.width / f.x,
		w = l.height / f.y;
	if (o && u) {
		const b = un(o),
			S = Kn(u) ? un(u) : u;
		let E = b,
			C = Md(E);
		for (; C && S !== E; ) {
			const T = qa(C),
				D = C.getBoundingClientRect(),
				A = Gn(C),
				N = D.left + (C.clientLeft + parseFloat(A.paddingLeft)) * T.x,
				R = D.top + (C.clientTop + parseFloat(A.paddingTop)) * T.y;
			((m *= T.x), (v *= T.y), (y *= T.x), (w *= T.y), (m += N), (v += R), (E = un(C)), (C = Md(E)));
		}
	}
	return ao({ width: y, height: w, x: m, y: v });
}
function ko(e, n) {
	const r = zo(e).scrollLeft;
	return n ? n.left + r : $r(Oi(e)).left + r;
}
function rS(e, n) {
	const r = e.getBoundingClientRect();
	return { x: r.left + n.scrollLeft - ko(e, r), y: r.top + n.scrollTop };
}
function z2(e) {
	let { elements: n, rect: r, offsetParent: u, strategy: l } = e;
	const o = l === "fixed",
		f = Oi(u),
		h = n ? Mo(n.floating) : !1;
	if (u === f || (h && o)) return r;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ci(1);
	const y = Ci(0),
		w = or(u);
	if ((w || !o) && ((Ya(u) !== "body" || No(f)) && (m = zo(u)), w)) {
		const S = $r(u);
		((v = qa(u)), (y.x = S.x + u.clientLeft), (y.y = S.y + u.clientTop));
	}
	const b = f && !w && !o ? rS(f, m) : Ci(0);
	return {
		width: r.width * v.x,
		height: r.height * v.y,
		x: r.x * v.x - m.scrollLeft * v.x + y.x + b.x,
		y: r.y * v.y - m.scrollTop * v.y + y.y + b.y,
	};
}
function k2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function D2(e) {
	const n = zo(e),
		r = e.ownerDocument.body,
		u = Ei(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth),
		l = Ei(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
	let o = -n.scrollLeft + ko(e);
	const f = -n.scrollTop;
	return (
		Gn(r).direction === "rtl" && (o += Ei(e.clientWidth, r.clientWidth) - u),
		{ width: u, height: l, x: o, y: f }
	);
}
var j2 = 25;
function q2(e, n, r) {
	r === void 0 && (r = "viewport");
	const u = r === "layoutViewport",
		l = un(e),
		o = Oi(e),
		f = l.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		y = 0;
	if (f) {
		const w = !yh() || n === "fixed";
		u
			? w || ((v = -f.offsetLeft), (y = -f.offsetTop))
			: ((h = f.width), (m = f.height), w && ((v = f.offsetLeft), (y = f.offsetTop)));
	}
	if (ko(o) <= 0) {
		const w = o.ownerDocument,
			b = w.body,
			S = getComputedStyle(b),
			E = (w.compatMode === "CSS1Compat" && parseFloat(S.marginLeft) + parseFloat(S.marginRight)) || 0,
			C = Math.abs(o.clientWidth - b.clientWidth - E),
			T = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? C / 2 : C;
		T <= j2 && (h -= T);
	}
	return { width: h, height: m, x: v, y };
}
function I2(e, n) {
	const r = $r(e, !0, n === "fixed"),
		u = r.top + e.clientTop,
		l = r.left + e.clientLeft,
		o = qa(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: l * o.x, y: u * o.y };
}
function I0(e, n, r) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = q2(e, r, n);
	else if (n === "document") u = D2(Oi(e));
	else if (Kn(n)) u = I2(n, r);
	else {
		const l = iS(e);
		u = { x: n.x - l.x, y: n.y - l.y, width: n.width, height: n.height };
	}
	return ao(u);
}
function U2(e, n) {
	const r = n.get(e);
	if (r) return r;
	let u = ns(e, [], !1).filter((h) => Kn(h) && Ya(h) !== "body"),
		l = null;
	const o = Gn(e).position === "fixed";
	let f = o ? Lr(e) : e;
	for (; Kn(f) && !ts(f); ) {
		const h = Gn(f),
			m = gh(f),
			v = l ? l.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((y) => y !== f)) : (l = h),
			(f = Lr(f)));
	}
	return (n.set(e, u), u);
}
function L2(e) {
	let { element: n, boundary: r, rootBoundary: u, strategy: l } = e;
	const o = [...(r === "clippingAncestors" ? (Mo(n) ? [] : U2(n, this._c)) : [].concat(r)), u],
		f = I0(n, o[0], l);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		y = f.left;
	for (let w = 1; w < o.length; w++) {
		const b = I0(n, o[w], l);
		((h = Ei(b.top, h)), (m = rr(b.right, m)), (v = rr(b.bottom, v)), (y = Ei(b.left, y)));
	}
	return { width: m - y, height: v - h, x: y, y: h };
}
function $2(e) {
	const { width: n, height: r } = nS(e);
	return { width: n, height: r };
}
function B2(e, n, r) {
	const u = or(n),
		l = Oi(n),
		o = r === "fixed",
		f = $r(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ci(0);
	if ((u || !o) && ((Ya(n) !== "body" || No(l)) && (h = zo(n)), u)) {
		const y = $r(n, !0, o, n);
		((m.x = y.x + n.clientLeft), (m.y = y.y + n.clientTop));
	}
	!u && l && (m.x = ko(l));
	const v = l && !u && !o ? rS(l, h) : Ci(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function dd(e) {
	return Gn(e).position === "static";
}
function U0(e, n) {
	if (!or(e) || Gn(e).position === "fixed") return null;
	if (n) return n(e);
	let r = e.offsetParent;
	return (Oi(e) === r && (r = r.ownerDocument.body), r);
}
function aS(e, n) {
	const r = un(e);
	if (Mo(e)) return r;
	if (!or(e)) {
		let l = Lr(e);
		for (; l && !ts(l); ) {
			if (Kn(l) && !dd(l)) return l;
			l = Lr(l);
		}
		return r;
	}
	let u = U0(e, n);
	for (; u && T2(u) && dd(u); ) u = U0(u, n);
	return u && ts(u) && dd(u) && !gh(u) ? r : u || O2(e) || r;
}
var V2 = async function (e) {
	const n = this.getOffsetParent || aS,
		r = this.getDimensions,
		u = await r(e.floating);
	return {
		reference: B2(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function H2(e) {
	return Gn(e).direction === "rtl";
}
var Z2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: z2,
	getDocumentElement: Oi,
	getClippingRect: L2,
	getOffsetParent: aS,
	getElementRects: V2,
	getClientRects: k2,
	getDimensions: $2,
	getScale: qa,
	isElement: Kn,
	isRTL: H2,
};
function uS(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function Q2(e, n, r) {
	let u = null,
		l;
	const o = Oi(e);
	function f() {
		var y;
		(clearTimeout(l), (y = u) == null || y.disconnect(), (u = null));
	}
	function h(y, w) {
		(y === void 0 && (y = !1), w === void 0 && (w = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: S, top: E, width: C, height: T } = b;
		if ((y || n(), !C || !T)) return;
		const D = Zl(E),
			A = Zl(o.clientWidth - (S + C)),
			N = Zl(o.clientHeight - (E + T)),
			R = Zl(S),
			$ = { rootMargin: -D + "px " + -A + "px " + -N + "px " + -R + "px", threshold: Ei(0, rr(1, w)) || 1 };
		let I = !0;
		function j(z) {
			const U = z[0].intersectionRatio;
			if (!uS(b, e.getBoundingClientRect())) return h();
			if (U !== w) {
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
	const m = un(e),
		v = () => h(r);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function P2(e, n, r, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: l = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = bh(e),
		y = l || o ? [...(v ? ns(v) : []), ...(n ? ns(n) : [])] : [];
	y.forEach((D) => {
		(l && D.addEventListener("scroll", r), o && D.addEventListener("resize", r));
	});
	const w = v && h ? Q2(v, r, o) : null;
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
		C = m ? $r(e) : null;
	m && T();
	function T() {
		const D = $r(e);
		(C && !uS(C, D) && r(), (C = D), (E = requestAnimationFrame(T)));
	}
	return (
		r(),
		() => {
			var D;
			(y.forEach((A) => {
				(l && A.removeEventListener("scroll", r), o && A.removeEventListener("resize", r));
			}),
				w?.(),
				(D = S) == null || D.disconnect(),
				(S = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var Y2 = _2,
	F2 = x2,
	K2 = S2,
	G2 = C2,
	X2 = p2,
	J2 = E2,
	W2 = (e, n, r) => {
		const u = new Map(),
			l = r ?? {},
			o = { ...Z2, ...l.platform, _c: u };
		return b2(e, n, { ...l, platform: o });
	},
	eM = "div";
function L0(e = 0, n = 0, r = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, r, u);
	const l = { x: e, y: n, width: r, height: u, top: n, right: e + r, bottom: n + u, left: e };
	return { ...l, toJSON: () => l };
}
function tM(e) {
	if (!e) return L0();
	const { x: n, y: r, width: u, height: l } = e;
	return L0(n, r, u, l);
}
function nM(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const r = e,
				u = n?.(r);
			return u || !r ? tM(u) : r.getBoundingClientRect();
		},
	};
}
function iM(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function $0(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function rM(e, n) {
	return Y2(({ placement: r }) => {
		var u;
		const l = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + l : (u = n.gutter) != null ? u : l;
		return { crossAxis: r.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function aM(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (pt(!n || n.every(iM), !1), K2({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function uM(e) {
	if (!(!e.slide && !e.overlap))
		return F2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: J2() });
}
function sM(e) {
	return G2({
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
function lM(e, n) {
	if (e) return X2({ element: e, padding: n.arrowPadding });
}
var ph = Le(function ({
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
		overlap: w = !1,
		sameWidth: b = !1,
		fitViewport: S = !1,
		gutter: E,
		arrowPadding: C = 4,
		overflowPadding: T = 8,
		getAnchorRect: D,
		updatePosition: A,
		...N
	}) {
		const R = wo();
		((n = n || R), pt(n, !1));
		const $ = n.useState("arrowElement"),
			I = n.useState("anchorElement"),
			j = n.useState("disclosureElement"),
			z = n.useState("popoverElement"),
			U = n.useState("contentElement"),
			L = n.useState("placement"),
			Q = n.useState("mounted"),
			ie = n.useState("rendered"),
			G = (0, _.useRef)(null),
			[F, ne] = (0, _.useState)(!1),
			{ portalRef: k, domReady: H } = Gd(u, N.portalRef),
			B = _e(D),
			ue = _e(A),
			fe = !!A;
		(Ze(() => {
			if (!z?.isConnected) return;
			z.style.setProperty("--popover-overflow-padding", `${T}px`);
			const O = nM(I, B),
				X = async () => {
					if (!Q) return;
					$ || (G.current = G.current || document.createElement("div"));
					const me = $ || G.current,
						ge = [
							rM(me, { gutter: E, shift: v }),
							aM({ flip: m, overflowPadding: T }),
							uM({ slide: y, shift: v, overlap: w, overflowPadding: T }),
							lM(me, { arrowPadding: C }),
							sM({ sameWidth: b, fitViewport: S, overflowPadding: T }),
						],
						be = await W2(O, z, { placement: L, strategy: h ? "fixed" : "absolute", middleware: ge });
					(n?.setState("currentPlacement", be.placement), ne(!0));
					const Ve = $0(be.x),
						Me = $0(be.y);
					if (
						(Object.assign(z.style, { top: "0", left: "0", transform: `translate3d(${Ve}px,${Me}px,0)` }),
						me && be.middlewareData.arrow)
					) {
						const { x: ot, y: wt } = be.middlewareData.arrow,
							Sn = be.placement.split("-")[0],
							cn = me.clientWidth / 2,
							kt = me.clientHeight / 2,
							de = ot != null ? ot + cn : -cn,
							we = wt != null ? wt + kt : -kt;
						(z.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${de}px calc(100% + ${kt}px)`,
								bottom: `${de}px ${-kt}px`,
								left: `calc(100% + ${cn}px) ${we}px`,
								right: `${-cn}px ${we}px`,
							}[Sn],
						),
							Object.assign(me.style, {
								left: ot != null ? `${ot}px` : "",
								top: wt != null ? `${wt}px` : "",
								[Sn]: "100%",
							}));
					}
				},
				le = P2(
					O,
					z,
					async () => {
						fe ? (await ue({ updatePosition: X }), ne(!0)) : await X();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ne(!1), le());
			};
		}, [n, ie, z, $, I, z, L, Q, H, h, m, v, y, w, b, S, E, C, T, B, fe, ue]),
			Ze(() => {
				if (!Q || !H || !z?.isConnected || !U?.isConnected) return;
				const O = () => {
					z.style.zIndex = getComputedStyle(U).zIndex;
				};
				O();
				let X = requestAnimationFrame(() => {
					X = requestAnimationFrame(O);
				});
				return () => cancelAnimationFrame(X);
			}, [Q, H, z, U]));
		const qe = h ? "fixed" : "absolute";
		return (
			(N = Ht(
				N,
				(O) =>
					(0, p.jsx)("div", {
						...f,
						style: { position: qe, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: O,
					}),
				[n, qe, f],
			)),
			(N = Ht(N, (O) => (0, p.jsx)(_o, { value: n, children: O }), [n])),
			(N = { "data-placing": !F || void 0, ...N, style: { position: "relative", ...N.style } }),
			(N = Gp({
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
	Pk = bs(
		De(function (n) {
			return Ue(eM, ph(n));
		}),
		wo,
	),
	oM = "div";
function sS(e, n, r, u) {
	return nr(n) ? !0 : e ? !!(Ot(n, e) || (r && Ot(r, e)) || u?.some((l) => sS(e, l, r))) : !1;
}
function cM({ store: e, ...n }) {
	const [r, u] = (0, _.useState)(!1),
		l = e.useState("mounted");
	(0, _.useEffect)(() => {
		l || u(!1);
	}, [l]);
	const o = n.onFocus,
		f = _e((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, _.useRef)(null);
	return (
		(0, _.useEffect)(
			() =>
				Qt(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: r, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var B0 = (0, _.createContext)(null),
	lS = Le(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: l = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = th();
		((n = n || m), pt(n, !1));
		const v = (0, _.useRef)(null),
			[y, w] = (0, _.useState)([]),
			b = (0, _.useRef)(0),
			S = (0, _.useRef)(null),
			{ portalRef: E, domReady: C } = Gd(u, h.portalRef),
			T = Xd(),
			D = !!o,
			A = rt(o),
			N = !!f,
			R = rt(f),
			$ = n.useState("open"),
			I = n.useState("mounted");
		((0, _.useEffect)(() => {
			if (!C || !I || (!D && !N)) return;
			const Q = v.current;
			return Q
				? sn(
						Vt(
							"mousemove",
							(G) => {
								if (!n || !T()) return;
								const { anchorElement: F, hideTimeout: ne, timeout: k } = n.getState(),
									H = S.current,
									[B] = G.composedPath(),
									ue = F;
								if (sS(B, Q, ue, y)) {
									((S.current = B && ue && Ot(ue, B) ? sd(G) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if (H) {
										const fe = sd(G);
										if (C0(fe, T0(Q, H))) {
											if (((S.current = fe), !R(G))) return;
											(G.preventDefault(), G.stopPropagation());
											return;
										}
									}
									A(G) &&
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
			(0, _.useEffect)(() => {
				if (!C || !I || !N) return;
				const Q = (ie) => {
					const G = v.current;
					if (!G) return;
					const F = S.current;
					if (!F) return;
					const ne = T0(G, F);
					if (C0(sd(ie), ne)) {
						if (!R(ie)) return;
						(ie.preventDefault(), ie.stopPropagation());
					}
				};
				return sn(Vt("mouseenter", Q, !0), Vt("mouseover", Q, !0), Vt("mouseout", Q, !0), Vt("mouseleave", Q, !0));
			}, [C, I, N, R]),
			(0, _.useEffect)(() => {
				C && ($ || n?.setAutoFocusOnShow(!1));
			}, [n, C, $]));
		const j = _p($);
		(0, _.useEffect)(() => {
			if (C)
				return () => {
					j.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, C]);
		const z = (0, _.useContext)(B0);
		Ze(() => {
			if (r || !u || !I || !C) return;
			const Q = v.current;
			if (Q) return z?.(Q);
		}, [r, u, I, C]);
		const U = (0, _.useCallback)(
			(Q) => {
				w((G) => [...G, Q]);
				const ie = z?.(Q);
				return () => {
					(w((G) => G.filter((F) => F !== Q)), ie?.());
				};
			},
			[z],
		);
		((h = Ht(h, (Q) => (0, p.jsx)(Ap, { value: n, children: (0, p.jsx)(B0.Provider, { value: U, children: Q }) }), [
			n,
			U,
		])),
			(h = { ...h, ref: St(v, h.ref) }),
			(h = cM({ store: n, ...h })));
		const L = n.useState((Q) => r || Q.autoFocusOnShow);
		return (
			(h = ph({
				store: n,
				modal: r,
				portal: u,
				autoFocusOnShow: L,
				...h,
				portalRef: E,
				hideOnEscape(Q) {
					return mo(l, Q)
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
	Yk = bs(
		De(function (n) {
			return Ue(oM, lS(n));
		}),
		th,
	),
	fM = "div",
	dM = Le(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: l = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = xo();
		((n = n || v), pt(n, !1));
		const y = (0, _.useRef)(null),
			w = n.parent,
			b = n.menubar,
			S = !!w,
			E = !!b && !S;
		m = { ...m, ref: St(y, m.ref) };
		const { "aria-labelledby": C, ...T } = Up({ store: n, alwaysVisible: h, ...m });
		m = T;
		const [D, A] = (0, _.useState)(),
			N = n.useState("autoFocusOnShow"),
			R = n.useState("initialFocus"),
			$ = n.useState("baseElement"),
			I = n.useState("renderedItems");
		(0, _.useEffect)(() => {
			let G = !1;
			return (
				A((F) => {
					var ne, k, H;
					if (G || !N) return;
					if ((ne = F?.current) != null && ne.isConnected) return F;
					const B = (0, _.createRef)();
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
					G = !0;
				}
			);
		}, [n, N, R, I, $]);
		const j = S ? !1 : r,
			z = !!o,
			U = !!D || !!m.initialFocus || !!j,
			L = Rt(n.combobox || n, "contentElement"),
			Q = Rt(w?.combobox || w, "contentElement"),
			ie = (0, _.useMemo)(() => {
				if (!Q || !L) return;
				const G = L.getAttribute("role"),
					F = Q.getAttribute("role");
				if (!((F === "menu" || F === "menubar") && G === "menu")) return Q;
			}, [L, Q]);
		return (
			ie !== void 0 && (m = { preserveTabOrderAnchor: ie, ...m }),
			(m = lS({
				store: n,
				alwaysVisible: h,
				initialFocus: D,
				autoFocusOnShow: z ? U && o : N || !!j,
				...m,
				hideOnEscape(G) {
					return mo(l, G) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(G) {
					const F = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(G) : (f ?? (S ? !0 : E ? (F ? !nr(F) : !0) : !1)))
						? G.defaultPrevented || !S || !F || (fO(F, "mouseout", G), !nr(F))
							? !0
							: (requestAnimationFrame(() => {
									nr(F) || n?.hide();
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
	hM = bs(
		De(function (n) {
			return Ue(fM, dM(n));
		}),
		xo,
	);
function mM(e) {
	var n;
	const r = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let l = (n = r?.element) == null ? void 0 : n.parentElement;
	for (; l && u?.element; ) {
		if (u && l.contains(u.element)) return l;
		l = l.parentElement;
	}
	return nt(l).body;
}
function vM(e) {
	return e?.__unstablePrivateStore;
}
function gM(e = {}) {
	var n;
	e.store;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = Ee(e.items, r?.items, e.defaultItems, []),
		l = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ee(r?.renderedItems, []) },
		f = vM(e.store),
		h = Bn({ items: u, renderedItems: o.renderedItems }, f),
		m = Bn(o, e.store),
		v = (b) => {
			const S = yp(b, (E) => E.element);
			(h.setState("renderedItems", S), m.setState("renderedItems", S));
		};
	(Kt(m, () => ih(h)),
		Kt(h, () =>
			to(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		Kt(h, () =>
			to(h, ["renderedItems"], (b) => {
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
					T = mM(b.renderedItems),
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
		w = (b) => y(b, (S) => h.setState("items", S), !0);
	return {
		...m,
		registerItem: w,
		renderItem: (b) =>
			sn(
				w(b),
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
function yM(e, n, r) {
	return (Qa(n, [r.store]), bt(e, r, "items", "setItems"), e);
}
var bM = { id: null };
function Si(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function pM(e, n) {
	return e.filter((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function V0(e, n) {
	return e.filter((r) => r.rowId === n);
}
function SM(e, n, r = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(r ? [bM] : []), ...e.slice(0, u)];
}
function oS(e) {
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
function cS(e) {
	let n = 0;
	for (const { length: r } of e) r > n && (n = r);
	return n;
}
function wM(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function _M(e, n, r) {
	const u = cS(e);
	for (const l of e)
		for (let o = 0; o < u; o += 1) {
			const f = l[o];
			if (!f || (r && f.disabled)) {
				const h = o === 0 && r ? Si(l) : l[o - 1];
				l[o] = h && n !== h.id && r ? h : wM(h?.rowId);
			}
		}
	return e;
}
function xM(e) {
	const n = oS(e),
		r = cS(n),
		u = [];
	for (let l = 0; l < r; l += 1)
		for (const o of n) {
			const f = o[l];
			f && u.push({ ...f, rowId: f.rowId ? `${l}` : void 0 });
		}
	return u;
}
function fS(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = gM(e),
		l = Ee(e.activeId, r?.activeId, e.defaultActiveId),
		o = Bn(
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
	Kt(o, () =>
		Qt(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = Si(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, y;
		const w = o.getState(),
			{
				skip: b = 0,
				activeId: S = w.activeId,
				focusShift: E = w.focusShift,
				focusLoop: C = w.focusLoop,
				focusWrap: T = w.focusWrap,
				includesBaseElement: D = w.includesBaseElement,
				renderedItems: A = w.renderedItems,
				rtl: N = w.rtl,
			} = m,
			R = h === "up" || h === "down",
			$ = h === "next" || h === "down",
			I = $ ? N && !R : !N || R,
			j = E && !b;
		let z = R ? Ip(_M(oS(A), S, j)) : A;
		if (((z = I ? Ad(z) : z), (z = R ? xM(z) : z), S == null)) return (v = Si(z)) == null ? void 0 : v.id;
		const U = z.find((B) => B.id === S);
		if (!U) return (y = Si(z)) == null ? void 0 : y.id;
		const L = z.some((B) => B.rowId),
			Q = z.indexOf(U),
			ie = z.slice(Q + 1),
			G = V0(ie, U.rowId);
		if (b) {
			const B = pM(G, S),
				ue = B.slice(b)[0] || B[B.length - 1];
			return ue?.id;
		}
		const F = C && (R ? C !== "horizontal" : C !== "vertical"),
			ne = L && T && (R ? T !== "horizontal" : T !== "vertical"),
			k = $ ? (!L || R) && F && D : R ? D : !1;
		if (F) {
			const B = Si(SM(ne && !k ? z : V0(z, U.rowId), S, k), S);
			return B?.id;
		}
		if (ne) {
			const B = Si(k ? G : ie, S);
			return k ? B?.id || null : B?.id;
		}
		const H = Si(G, S);
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
			return (h = Si(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Si(Ad(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function EM(e) {
	return { id: Ri(e.id), ...e };
}
function dS(e, n, r) {
	return (
		(e = yM(e, n, r)),
		bt(e, r, "activeId", "setActiveId"),
		bt(e, r, "includesBaseElement"),
		bt(e, r, "virtualFocus"),
		bt(e, r, "orientation"),
		bt(e, r, "rtl"),
		bt(e, r, "focusLoop"),
		bt(e, r, "focusWrap"),
		bt(e, r, "focusShift"),
		e
	);
}
var CM = "a",
	hS = Le(function ({ store: n, showOnHover: r = !0, ...u }) {
		const l = th();
		((n = n || l), pt(n, !1));
		const o = us(u),
			f = (0, _.useRef)(0);
		((0, _.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, _.useEffect)(
				() =>
					Vt(
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
			m = rt(r),
			v = Xd(),
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
			w = u.onClick,
			b = _e((E) => {
				(w?.(E), n && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			S = (0, _.useCallback)(
				(E) => {
					if (!n) return;
					const { anchorElement: C } = n.getState();
					C?.isConnected || n.setAnchorElement(E);
				},
				[n],
			);
		return ((u = { ...u, ref: St(S, u.ref), onMouseMove: y, onClick: b }), (u = gs(u)), u);
	}),
	Fk = De(function (n) {
		return Ue(CM, hS(n));
	}),
	TM = "div",
	Sh = Le(function ({ store: n, ...r }) {
		const u = wo();
		return ((n = n || u), (r = { ...r, ref: St(n?.setAnchorElement, r.ref) }), r);
	}),
	Kk = De(function (n) {
		return Ue(TM, Sh(n));
	}),
	AM = "button";
function H0(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? ir(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? ir(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var RM = Symbol("command"),
	wh = Le(function ({ clickOnEnter: n = !0, clickOnSpace: r = !0, ...u }) {
		const l = (0, _.useRef)(null),
			[o, f] = (0, _.useState)(!1);
		(0, _.useEffect)(() => {
			l.current && f(ir(l.current));
		}, []);
		const [h, m] = (0, _.useState)(!1),
			v = (0, _.useRef)(!1),
			y = us(u),
			[w, b] = Cp(u, RM, !0),
			S = u.onKeyDown,
			E = _e((D) => {
				S?.(D);
				const A = D.currentTarget;
				if (D.defaultPrevented || w || y || !pn(D) || Xn(A) || A.isContentEditable) return;
				const N = n && D.key === "Enter",
					R = r && D.key === " ",
					$ = D.key === "Enter" && !n,
					I = D.key === " " && !r;
				if ($ || I) {
					D.preventDefault();
					return;
				}
				if (N || R) {
					const j = H0(D);
					if (N) {
						if (!j) {
							D.preventDefault();
							const { view: z, ...U } = D,
								L = () => f0(A, U);
							oO() ? ja(A, "keyup", L) : queueMicrotask(L);
						}
					} else R && ((v.current = !0), j || (D.preventDefault(), m(!0)));
				}
			}),
			C = u.onKeyUp,
			T = _e((D) => {
				if ((C?.(D), D.defaultPrevented || w || y || D.metaKey)) return;
				const A = r && D.key === " ";
				if (v.current && A && ((v.current = !1), !H0(D))) {
					(D.preventDefault(), m(!1));
					const N = D.currentTarget,
						{ view: R, ...$ } = D;
					queueMicrotask(() => f0(N, $));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: St(l, u.ref),
				onKeyDown: E,
				onKeyUp: T,
			}),
			(u = gs(u)),
			u
		);
	}),
	Gk = De(function (n) {
		return Ue(AM, wh(n));
	}),
	mS = "button",
	vS = Le(function (n) {
		const r = (0, _.useRef)(null),
			u = xp(r, mS),
			[l, o] = (0, _.useState)(() => !!u && ir({ tagName: u, type: n.type }));
		return (
			(0, _.useEffect)(() => {
				r.current && o(ir(r.current));
			}, []),
			(n = { role: !l && u !== "a" ? "button" : void 0, ...n, ref: St(r, n.ref) }),
			(n = wh(n)),
			n
		);
	}),
	Xk = De(function (n) {
		return Ue(mS, vS(n));
	}),
	OM = "button",
	NM = Symbol("disclosure"),
	gS = Le(function ({ store: n, toggleOnClick: r = !0, ...u }) {
		const l = Wd();
		((n = n || l), pt(n, !1));
		const o = (0, _.useRef)(null),
			[f, h] = (0, _.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, _.useEffect)(() => {
			let T = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (T = !0)), h(v && T));
		}, [m, n, v]);
		const y = u.onClick,
			w = rt(r),
			[b, S] = Cp(u, NM, !0),
			E = _e((T) => {
				(y?.(T), !T.defaultPrevented && (b || (w(T) && (n?.setDisclosureElement(T.currentTarget), n?.toggle()))));
			}),
			C = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": C?.id, ...S, ...u, ref: St(o, u.ref), onClick: E }),
			(u = vS(u)),
			u
		);
	}),
	Jk = De(function (n) {
		return Ue(OM, gS(n));
	}),
	MM = "button",
	yS = Le(function ({ store: n, ...r }) {
		const u = So();
		return (
			(n = n || u),
			pt(n, !1),
			(r = { "aria-haspopup": vo(n.useState("contentElement"), "dialog"), ...r }),
			(r = gS({ store: n, ...r })),
			r
		);
	}),
	Wk = De(function (n) {
		return Ue(MM, yS(n));
	}),
	zM = "button",
	bS = Le(function ({ store: n, ...r }) {
		const u = wo();
		((n = n || u), pt(n, !1));
		const l = r.onClick,
			o = _e((f) => {
				(n?.setAnchorElement(f.currentTarget), l?.(f));
			});
		return (
			(r = Ht(r, (f) => (0, p.jsx)(_o, { value: n, children: f }), [n])),
			(r = { ...r, onClick: o }),
			(r = Sh({ store: n, ...r })),
			(r = yS({ store: n, ...r })),
			r
		);
	}),
	eD = De(function (n) {
		return Ue(zM, bS(n));
	}),
	kM = "button";
function DM(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function Z0(e, n) {
	return !!e?.some((r) => (!r.element || r.element === n ? !1 : r.element.getAttribute("aria-expanded") === "true"));
}
var jM = Le(function ({ store: n, focusable: r, accessibleWhenDisabled: u, showOnHover: l, ...o }) {
		const f = xo();
		((n = n || f), pt(n, !1));
		const h = (0, _.useRef)(null),
			m = n.parent,
			v = n.menubar,
			y = !!m,
			w = !!v && !y,
			b = us(o),
			S = () => {
				const j = h.current;
				j && (n?.setDisclosureElement(j), n?.setAnchorElement(j), n?.show());
			},
			E = o.onFocus,
			C = _e((j) => {
				if ((E?.(j), b || j.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !w)) return;
				const { items: z } = v.getState();
				Z0(z, j.currentTarget) && S();
			}),
			T = Rt(n, (j) => j.placement.split("-")[0]),
			D = o.onKeyDown,
			A = _e((j) => {
				if ((D?.(j), b || j.defaultPrevented)) return;
				const z = DM(j, T);
				z && (j.preventDefault(), S(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(z));
			}),
			N = o.onClick,
			R = _e((j) => {
				if ((N?.(j), j.defaultPrevented || !n)) return;
				const z = !j.detail,
					{ open: U } = n.getState();
				((!U || z) && ((!y || z) && n.setAutoFocusOnShow(!0), n.setInitialFocus(z ? "first" : "container")), y && S());
			});
		((o = Ht(o, (j) => (0, p.jsx)(Op, { value: n, children: j }), [n])),
			y && (o = { ...o, render: (0, p.jsx)(no.div, { render: o.render }) }));
		const $ = Ri(o.id),
			I = Rt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: $,
				role: y || w ? gp(I, "menuitem") : void 0,
				"aria-haspopup": vo(n.useState("contentElement"), "menu"),
				...o,
				ref: St(h, o.ref),
				onFocus: C,
				onKeyDown: A,
				onClick: R,
			}),
			(o = hS({
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
							return w && Z0(L);
						})()
					)
						return !1;
					const U = w ? v : m;
					return (U && U.setActiveId(j.currentTarget.id), !0);
				},
			})),
			(o = bS({ store: n, toggleOnClick: !y, focusable: r, accessibleWhenDisabled: u, ...o })),
			(o = nh({ store: n, typeahead: w, ...o })),
			o
		);
	}),
	qM = De(function (n) {
		return Ue(kM, jM(n));
	}),
	IM = "div";
function pS(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function UM(e) {
	const n = pS(e);
	return n ? Ot(e.currentTarget, n) : !1;
}
var zd = Symbol("composite-hover");
function LM(e) {
	let n = pS(e);
	if (!n) return !1;
	do {
		if (Ti(n, zd) && n[zd]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var _h = Le(function ({ store: n, focusOnHover: r = !0, blurOnHoverEnd: u = !!r, ...l }) {
		const o = bo();
		((n = n || o), pt(n, !1));
		const f = Xd(),
			h = l.onMouseMove,
			m = rt(r),
			v = _e((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!nr(E.currentTarget)) {
						const C = n?.getState().baseElement;
						C && !Ir(C) && C.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			y = l.onMouseLeave,
			w = rt(u),
			b = _e((E) => {
				var C;
				(y?.(E),
					!E.defaultPrevented &&
						f() &&
						(UM(E) ||
							LM(E) ||
							(m(E) && w(E) && (n?.setActiveId(null), (C = n?.getState().baseElement) == null || C.focus()))));
			}),
			S = (0, _.useCallback)((E) => {
				E && (E[zd] = !0);
			}, []);
		return ((l = { ...l, ref: St(S, l.ref), onMouseMove: v, onMouseLeave: b }), Vr(l));
	}),
	tD = yo(
		De(function (n) {
			return Ue(IM, _h(n));
		}),
	),
	$M = "div",
	SS = Le(function ({ store: n, shouldRegisterItem: r = !0, getItem: u = hp, element: l, ...o }) {
		const f = pO();
		n = n || f;
		const h = Ri(o.id),
			m = (0, _.useRef)(l);
		return (
			(0, _.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !r) return;
				const y = u({ id: h, element: v });
				return n?.renderItem(y);
			}, [h, r, u, n]),
			(o = { ...o, ref: St(m, o.ref) }),
			Vr(o)
		);
	}),
	nD = De(function (n) {
		return Ue($M, SS(n));
	}),
	BM = "button";
function VM(e) {
	return Ed(e) ? !0 : e.tagName === "INPUT" && !ir(e);
}
function HM(e, n = !1) {
	const r = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		l = Math.max(r * 0.875, r - 40) * 1.5,
		o = n ? r - l + u : l + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function ZM(e, n = !1) {
	const { top: r } = e.getBoundingClientRect();
	return n ? r + e.clientHeight : r;
}
function Q0(e, n, r, u = !1) {
	var l;
	if (!n || !r) return;
	const { renderedItems: o } = n.getState(),
		f = Yd(e);
	if (!f) return;
	const h = HM(f, u);
	let m, v;
	for (let y = 0; y < o.length; y += 1) {
		const w = m;
		if (((m = r(y)), !m)) break;
		if (m === w) continue;
		const b = (l = er(n, m)) == null ? void 0 : l.element;
		if (!b) continue;
		const S = ZM(b, u) - h,
			E = Math.abs(S);
		if ((u && S <= 0) || (!u && S >= 0)) {
			v !== void 0 && v < E && (m = w);
			break;
		}
		v = E;
	}
	return m;
}
function QM(e, n) {
	return pn(e) ? !1 : Pu(n, e.target);
}
var xh = Le(function ({
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
		const y = bo();
		n = n || y;
		const w = Ri(v.id),
			b = (0, _.useRef)(null),
			S = (0, _.useContext)(EO),
			E = us(v) && !v.accessibleWhenDisabled,
			{
				rowId: C,
				baseElement: T,
				isActiveItem: D,
				ariaSetSize: A,
				ariaPosInSet: N,
				isTabbable: R,
			} = kp(n, {
				rowId(k) {
					if (r) return r;
					if (k && S?.baseElement && S.baseElement === k.baseElement) return S.id;
				},
				baseElement(k) {
					return k?.baseElement || void 0;
				},
				isActiveItem(k) {
					return !!k && k.activeId === w;
				},
				ariaSetSize(k) {
					if (h != null) return h;
					if (k && S?.ariaSetSize && S.baseElement === k.baseElement) return S.ariaSetSize;
				},
				ariaPosInSet(k) {
					if (m != null) return m;
					if (!k || !S?.ariaPosInSet || S.baseElement !== k.baseElement) return;
					const H = k.renderedItems.filter((B) => B.rowId === C);
					return S.ariaPosInSet + H.findIndex((B) => B.id === w);
				},
				isTabbable(k) {
					if (!k?.renderedItems.length) return !0;
					if (k.virtualFocus) return !1;
					if (o) return !0;
					if (k.activeId === null) return !1;
					const H = n?.item(k.activeId);
					return H?.disabled || !H?.element ? !0 : k.activeId === w;
				},
			}),
			$ = (0, _.useCallback)(
				(k) => {
					var H;
					const B = {
						...k,
						id: w || k.id,
						rowId: C,
						disabled: !!E,
						children: (H = k.element) == null ? void 0 : H.textContent,
					};
					return f ? f(B) : B;
				},
				[w, C, E, f],
			),
			I = v.onFocus,
			j = (0, _.useRef)(!1),
			z = _e((k) => {
				if ((I?.(k), k.defaultPrevented || pp(k) || !w || !n || QM(k, n))) return;
				const { virtualFocus: H, baseElement: B } = n.getState();
				(n.setActiveId(w),
					Ed(k.currentTarget) && LO(k.currentTarget),
					H &&
						pn(k) &&
						(VM(k.currentTarget) ||
							(B?.isConnected &&
								(go() &&
									k.currentTarget.hasAttribute("data-autofocus") &&
									k.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(j.current = !0),
								k.relatedTarget === B || Pu(n, k.relatedTarget) ? $O(B) : B.focus()))));
			}),
			U = v.onBlurCapture,
			L = _e((k) => {
				if ((U?.(k), k.defaultPrevented)) return;
				const H = n?.getState();
				H?.virtualFocus && j.current && ((j.current = !1), k.preventDefault(), k.stopPropagation());
			}),
			Q = v.onKeyDown,
			ie = rt(u),
			G = rt(l),
			F = _e((k) => {
				if ((Q?.(k), k.defaultPrevented || !pn(k) || !n)) return;
				const { currentTarget: H } = k,
					B = n.getState(),
					ue = n.item(w),
					fe = !!ue?.rowId,
					qe = B.orientation !== "horizontal",
					O = B.orientation !== "vertical",
					X = () => !!(fe || O || !B.baseElement || !Xn(B.baseElement)),
					re = {
						ArrowUp: (fe || qe) && n.up,
						ArrowRight: (fe || O) && n.next,
						ArrowDown: (fe || qe) && n.down,
						ArrowLeft: (fe || O) && n.previous,
						Home: () => {
							if (X()) return !fe || k.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (X()) return !fe || k.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => Q0(H, n, n?.up, !0),
						PageDown: () => Q0(H, n, n?.down),
					}[k.key];
				if (re) {
					if (Ed(H)) {
						const me = Cd(H),
							ge = O && k.key === "ArrowLeft",
							be = O && k.key === "ArrowRight",
							Ve = qe && k.key === "ArrowUp",
							Me = qe && k.key === "ArrowDown";
						if (be || Me) {
							const { length: ot } = sO(H);
							if (me.end !== ot) return;
						} else if ((ge || Ve) && me.start !== 0) return;
					}
					const le = re();
					if (ie(k) || le !== void 0) {
						if (!G(k)) return;
						(k.preventDefault(), n.move(le));
					}
				}
			}),
			ne = (0, _.useMemo)(() => ({ id: w, baseElement: T }), [w, T]);
		return (
			(v = Ht(v, (k) => (0, p.jsx)(xO.Provider, { value: ne, children: k }), [ne])),
			(v = {
				id: w,
				"data-active-item": D || void 0,
				...v,
				ref: St(b, v.ref),
				tabIndex: R ? v.tabIndex : -1,
				onFocus: z,
				onBlurCapture: L,
				onKeyDown: F,
			}),
			(v = wh(v)),
			(v = SS({ store: n, ...v, getItem: $, shouldRegisterItem: w ? v.shouldRegisterItem : !1 })),
			Vr({ ...v, "aria-setsize": A, "aria-posinset": N })
		);
	}),
	iD = yo(
		De(function (n) {
			return Ue(BM, xh(n));
		}),
	),
	PM = "div";
function YM(e, n, r) {
	var u;
	if (!e) return !1;
	if (nr(e)) return !0;
	const l = n?.find((h) => {
			var m;
			return h.element === r ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = l?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = nt(e).getElementById(o);
	return f ? (nr(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var FM = Le(function ({
		store: n,
		hideOnClick: r = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: l,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = kO(!0),
			m = TO();
		((n = n || h || m), pt(n, !1));
		const v = f.onClick,
			y = rt(r),
			w = "hideAll" in n ? n.hideAll : void 0,
			b = !!w,
			S = _e((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(wp(E) || Sp(E) || (w && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && y(E) && w())));
			});
		return (
			(f = {
				role: gp(
					Rt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: S,
			}),
			(f = xh({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = _h({
				store: n,
				...f,
				focusOnHover(E) {
					const C = () => (typeof l == "function" ? l(E) : (l ?? !0));
					if (!n || !C()) return !1;
					const { baseElement: T, items: D } = n.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: YM(T, D, E.currentTarget)
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
	KM = yo(
		De(function (n) {
			return Ue(PM, FM(n));
		}),
	);
function wS({ popover: e, ...n } = {}) {
	const r = Eo(
		n.store,
		ah(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = r?.getState(),
		l = Fp({ ...n, store: r }),
		o = Ee(n.placement, u?.placement, "bottom"),
		f = Bn(
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
function _S(e, n, r) {
	return (Qa(n, [r.popover]), bt(e, r, "placement"), Kp(e, n, r));
}
function GM(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = wS({ ...e, placement: Ee(e.placement, r?.placement, "bottom") }),
		l = Ee(e.timeout, r?.timeout, 500),
		o = Bn(
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
function XM(e, n, r) {
	return (bt(e, r, "timeout"), bt(e, r, "showTimeout"), bt(e, r, "hideTimeout"), _S(e, n, r));
}
var xS = (0, _.createContext)(void 0),
	ps = Jn([Tp, os], [_o, po]),
	JM = ps.useContext,
	ES = ps.useScopedContext,
	Do = ps.useProviderContext,
	rD = ps.ContextProvider,
	WM = ps.ScopedContextProvider,
	ez = (0, _.createContext)(void 0),
	tz = (0, _.createContext)(!1);
function nz({ combobox: e, parent: n, menubar: r, ...u } = {}) {
	const l = !!r && !n,
		o = Eo(
			u.store,
			Np(n, ["values"]),
			ah(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = fS({ ...u, store: o, orientation: Ee(u.orientation, f.orientation, "vertical") }),
		m = GM({
			...u,
			store: o,
			placement: Ee(u.placement, f.placement, "bottom-start"),
			timeout: Ee(u.timeout, f.timeout, l ? 0 : 150),
			hideTimeout: Ee(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Bn(
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
		Kt(v, () =>
			Qt(v, ["mounted"], (y) => {
				y.mounted || v.setState("activeId", null);
			}),
		),
		Kt(v, () =>
			Qt(n, ["orientation"], (y) => {
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
			setValue: (y, w) => {
				y !== "__proto__" &&
					y !== "constructor" &&
					(Array.isArray(y) ||
						v.setState("values", (b) => {
							const S = b[y],
								E = fp(w, S);
							return E === S ? b : { ...b, [y]: E !== void 0 && E };
						}));
			},
		}
	);
}
function iz(e, n, r) {
	return (
		Qa(n, [r.combobox, r.parent, r.menubar]),
		bt(e, r, "values", "setValues"),
		Object.assign(XM(dS(e, n, r), n, r), { combobox: r.combobox, parent: r.parent, menubar: r.menubar })
	);
}
function rz(e = {}) {
	const n = Rp(),
		r = CO(),
		u = Do();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : r,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [l, o] = Co(nz, e);
	return iz(l, o, e);
}
function az(e = {}) {
	return (0, p.jsx)(Op, { value: rz(e), children: e.children });
}
var uz = "hr",
	CS = Le(function ({ orientation: n = "horizontal", ...r }) {
		return ((r = { role: "separator", "aria-orientation": n, ...r }), r);
	}),
	aD = De(function (n) {
		return Ue(uz, CS(n));
	}),
	sz = "hr",
	TS = Le(function ({ store: n, ...r }) {
		const u = bo();
		((n = n || u), pt(n, !1));
		const l = n.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((r = CS({ ...r, orientation: l })), r);
	}),
	uD = De(function (n) {
		return Ue(sz, TS(n));
	}),
	lz = "hr",
	oz = Le(function ({ store: n, ...r }) {
		const u = Rp();
		return ((n = n || u), (r = TS({ store: n, ...r })), r);
	}),
	cz = De(function (n) {
		return Ue(lz, oz(n));
	}),
	fz = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	dz = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, r, u) => (u ? u.toUpperCase() : r.toLowerCase())),
	P0 = (e) => {
		const n = dz(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	AS = (...e) =>
		e
			.filter((n, r, u) => !!n && n.trim() !== "" && u.indexOf(n) === r)
			.join(" ")
			.trim(),
	hz = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	mz = {
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
	vz = (0, _.forwardRef)(
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
			(0, _.createElement)(
				"svg",
				{
					ref: m,
					...mz,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(r) * 24) / Number(n) : r,
					className: AS("lucide", l),
					...(!o && !hz(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, y]) => (0, _.createElement)(v, y)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	Eh = (e, n) => {
		const r = (0, _.forwardRef)(({ className: u, ...l }, o) =>
			(0, _.createElement)(vz, { ref: o, iconNode: n, className: AS(`lucide-${fz(P0(e))}`, `lucide-${e}`, u), ...l }),
		);
		return ((r.displayName = P0(e)), r);
	},
	gz = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	yz = Eh("arrow-up", gz),
	bz = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	pz = Eh("ellipsis", bz),
	Sz = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	wz = Eh("paperclip", Sz),
	_z = (0, _.memo)(function (n) {
		const { channelName: r, items: u } = n;
		return (0, p.jsxs)(az, {
			placement: "bottom-end",
			children: [
				(0, p.jsx)(qM, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${r}`,
					children: (0, p.jsx)(pz, { size: 16, "aria-hidden": "true" }),
				}),
				(0, p.jsx)(hM, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${r}`,
					children: u.map((l) =>
						"separator" in l
							? (0, p.jsx)(cz, { className: "ChannelRowMenu-separator" }, l.id)
							: (0, p.jsx)(
									KM,
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
	xz = "input";
function Y0(e, n, r) {
	if (!r) return !1;
	const u = e.find((l) => !l.disabled && l.value);
	return u?.value === n;
}
function F0(e, n) {
	return !n || e == null ? !1 : ((e = dp(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function Ez(e) {
	return e.type === "input";
}
function Cz(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function Tz(e) {
	const n = e.find((r) => {
		var u;
		return r.disabled ? !1 : ((u = r.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var Az = Le(function ({
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
		showOnKeyPress: w = y,
		blurActiveItemOnClick: b,
		setValueOnClick: S = !0,
		moveOnKeyPress: E = !0,
		autoComplete: C = "list",
		...T
	}) {
		const D = Do();
		((n = n || D), pt(n, !1));
		const A = (0, _.useRef)(null),
			[N, R] = Ep(),
			$ = (0, _.useRef)(!1),
			I = (0, _.useRef)(!1),
			j = n.useState((ae) => ae.virtualFocus && u),
			z = C === "inline" || C === "both",
			[U, L] = (0, _.useState)(z);
		gO(() => {
			z && L(!0);
		}, [z]);
		const Q = n.useState("value"),
			ie = (0, _.useRef)();
		(0, _.useEffect)(
			() =>
				Qt(n, ["selectedValue", "activeId"], (ae, Ae) => {
					ie.current = Ae.selectedValue;
				}),
			[],
		);
		const G = n.useState((ae) => {
				var Ae;
				if (
					z &&
					U &&
					!(
						ae.activeValue &&
						Array.isArray(ae.selectedValue) &&
						(ae.selectedValue.includes(ae.activeValue) || ((Ae = ie.current) != null && Ae.includes(ae.activeValue)))
					)
				)
					return ae.activeValue;
			}),
			F = n.useState("renderedItems"),
			ne = n.useState("open"),
			k = n.useState("contentElement"),
			H = (0, _.useMemo)(() => {
				if (!z || !U) return Q;
				if (Y0(F, G, j)) {
					if (F0(Q, G)) {
						const ae = G?.slice(Q.length) || "";
						return Q + ae;
					}
					return Q;
				}
				return G || Q;
			}, [z, U, F, G, j, Q]);
		((0, _.useEffect)(() => {
			const ae = A.current;
			if (!ae) return;
			const Ae = () => L(!0);
			return (
				ae.addEventListener("combobox-item-move", Ae),
				() => {
					ae.removeEventListener("combobox-item-move", Ae);
				}
			);
		}, []),
			(0, _.useEffect)(() => {
				if (!z || !U || !G || !Y0(F, G, j) || !F0(Q, G)) return;
				let ae = Qu;
				return (
					queueMicrotask(() => {
						const Ae = A.current;
						if (!Ae) return;
						const { start: mt, end: Re } = Cd(Ae),
							ft = Q.length,
							Gt = G.length;
						(id(Ae, ft, Gt),
							(ae = () => {
								if (!Ir(Ae)) return;
								const { start: st, end: se } = Cd(Ae);
								st === ft && se === Gt && id(Ae, mt, Re);
							}));
					}),
					() => ae()
				);
			}, [N, z, U, G, F, j, Q]));
		const B = (0, _.useRef)(null),
			ue = _e(l),
			fe = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			if (!ne || !k) return;
			const ae = Yd(k);
			if (!ae) return;
			B.current = ae;
			const Ae = () => {
					$.current = !1;
				},
				mt = () => {
					if (!n || !$.current) return;
					const { activeId: ft } = n.getState();
					ft !== null && ft !== fe.current && ($.current = !1);
				},
				Re = { passive: !0, capture: !0 };
			return (
				ae.addEventListener("wheel", Ae, Re),
				ae.addEventListener("touchmove", Ae, Re),
				ae.addEventListener("scroll", mt, Re),
				() => {
					(ae.removeEventListener("wheel", Ae, !0),
						ae.removeEventListener("touchmove", Ae, !0),
						ae.removeEventListener("scroll", mt, !0));
				}
			);
		}, [ne, k, n]),
			Ze(() => {
				Q && (I.current || ($.current = !0));
			}, [Q]),
			Ze(() => {
				(j !== "always" && ne) || ($.current = ne);
			}, [j, ne]));
		const qe = n.useState("resetValueOnSelect");
		(Qa(() => {
			var ae, Ae;
			const mt = $.current;
			if (!n || !ne || (!mt && !qe)) return;
			const { baseElement: Re, contentElement: ft, activeId: Gt } = n.getState();
			if (!(Re && !Ir(Re))) {
				if (ft?.hasAttribute("data-placing")) {
					const st = new MutationObserver(R);
					return (st.observe(ft, { attributeFilter: ["data-placing"] }), () => st.disconnect());
				}
				if (j && mt) {
					const st = ue(F),
						se = st !== void 0 ? st : (ae = Tz(F)) != null ? ae : n.first();
					((fe.current = se), n.move(se ?? null));
				} else {
					const st = (Ae = n.item(Gt || n.first())) == null ? void 0 : Ae.element;
					st && "scrollIntoView" in st && st.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ne, N, Q, j, qe, ue, F]),
			(0, _.useEffect)(() => {
				if (!z) return;
				const ae = A.current;
				if (!ae) return;
				const Ae = [ae, k].filter((Re) => !!Re),
					mt = (Re) => {
						Ae.every((ft) => Mr(Re, ft)) && n?.setValue(H);
					};
				for (const Re of Ae) Re.addEventListener("focusout", mt);
				return () => {
					for (const Re of Ae) Re.removeEventListener("focusout", mt);
				};
			}, [z, k, n, H]));
		const O = (ae) => ae.currentTarget.value.length >= f,
			X = T.onChange,
			re = rt(h ?? O),
			le = rt(o ?? !n.tag),
			me = _e((ae) => {
				if ((X?.(ae), ae.defaultPrevented || !n)) return;
				const Ae = ae.currentTarget,
					{ value: mt, selectionStart: Re, selectionEnd: ft } = Ae,
					Gt = ae.nativeEvent;
				if ((($.current = !0), Ez(Gt) && (Gt.isComposing && (($.current = !1), (I.current = !0)), z))) {
					const st = Gt.inputType === "insertText" || Gt.inputType === "insertCompositionText",
						se = Re === mt.length;
					L(st && se);
				}
				if (le(ae)) {
					const st = mt === n.getState().value;
					(n.setValue(mt),
						queueMicrotask(() => {
							id(Ae, Re, ft);
						}),
						z && j && st && R());
				}
				(re(ae) && n.show(), (!j || !$.current) && n.setActiveId(null));
			}),
			ge = T.onCompositionEnd,
			be = _e((ae) => {
				(($.current = !0), (I.current = !1), ge?.(ae), !ae.defaultPrevented && j && R());
			}),
			Ve = T.onMouseDown,
			Me = rt(b ?? (() => !!n?.getState().includesBaseElement)),
			ot = rt(S),
			wt = rt(v ?? O),
			Sn = _e((ae) => {
				(Ve?.(ae),
					!ae.defaultPrevented &&
						(ae.button ||
							ae.ctrlKey ||
							(n &&
								(Me(ae) && n.setActiveId(null),
								ot(ae) && n.setValue(H),
								wt(ae) && ja(ae.currentTarget, "mouseup", n.show)))));
			}),
			cn = T.onKeyDown,
			kt = rt(w ?? O),
			de = _e((ae) => {
				if (
					(cn?.(ae),
					ae.repeat || ($.current = !1),
					ae.defaultPrevented || ae.ctrlKey || ae.altKey || ae.shiftKey || ae.metaKey || !n)
				)
					return;
				const { open: Ae } = n.getState();
				Ae || ((ae.key === "ArrowUp" || ae.key === "ArrowDown") && kt(ae) && (ae.preventDefault(), n.show()));
			}),
			we = T.onBlur,
			ut = _e((ae) => {
				(($.current = !1), we?.(ae), ae.defaultPrevented);
			}),
			Ie = Ri(T.id),
			Dt = Cz(C) ? C : void 0,
			ct = n.useState((ae) => ae.activeId === null);
		return (
			(T = {
				id: Ie,
				role: "combobox",
				"aria-autocomplete": Dt,
				"aria-haspopup": vo(k, "listbox"),
				"aria-expanded": ne,
				"aria-controls": k?.id,
				"data-active-item": ct || void 0,
				value: H,
				...T,
				ref: St(A, T.ref),
				onChange: me,
				onCompositionEnd: be,
				onMouseDown: Sn,
				onKeyDown: de,
				onBlur: ut,
			}),
			(T = oh({ store: n, focusable: r, ...T, moveOnKeyPress: (ae) => (mo(E, ae) ? !1 : (z && L(!0), !0)) })),
			(T = Sh({ store: n, ...T })),
			{ autoComplete: "off", ...T }
		);
	}),
	Rz = De(function (n) {
		return Ue(xz, Az(n));
	}),
	Oz = "div";
function Nz(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function Mz(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var zz = Le(function ({
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
		var w;
		const b = ES();
		((n = n || b), pt(n, !1));
		const {
				resetValueOnSelectState: S,
				multiSelectable: E,
				selected: C,
			} = kp(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(L) {
					return Array.isArray(L.selectedValue);
				},
				selected(L) {
					return Nz(L.selectedValue, r);
				},
			}),
			T = (0, _.useCallback)(
				(L) => {
					const Q = { ...L, value: r };
					return v ? v(Q) : Q;
				},
				[r, v],
			);
		((l = l ?? !E), (u = u ?? (r != null && !E)));
		const D = y.onClick,
			A = rt(l),
			N = rt(o),
			R = rt((w = f ?? S) != null ? w : E),
			$ = rt(u),
			I = _e((L) => {
				(D?.(L),
					!L.defaultPrevented &&
						(wp(L) ||
							Sp(L) ||
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
					(Ir(Q) ||
						((L.key.length === 1 || L.key === "Backspace" || L.key === "Delete") &&
							(queueMicrotask(() => Q.focus()), Xn(Q) && n?.setValue(Q.value))));
			});
		(E && C != null && (y = { "aria-selected": C, ...y }),
			(y = Ht(
				y,
				(L) =>
					(0, p.jsx)(ez.Provider, { value: r, children: (0, p.jsx)(tz.Provider, { value: C ?? !1, children: L }) }),
				[r, C],
			)),
			(y = { role: Mz((0, _.useContext)(xS)), children: r, ...y, onClick: I, onKeyDown: z }));
		const U = rt(m);
		return (
			(y = xh({
				store: n,
				...y,
				getItem: T,
				moveOnKeyPress: (L) => {
					if (!U(L)) return !1;
					const Q = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(Q), !0);
				},
			})),
			(y = _h({ store: n, focusOnHover: h, ...y })),
			y
		);
	}),
	kz = yo(
		De(function (n) {
			return Ue(Oz, zz(n));
		}),
	),
	Dz = "div",
	RS = Le(function ({ store: n, alwaysVisible: r, ...u }) {
		const l = ES(!0),
			o = JM();
		n = n || o;
		const f = !!n && n === l;
		pt(n, !1);
		const h = (0, _.useRef)(null),
			m = Ri(u.id),
			v = n.useState("mounted"),
			y = To(v, u.hidden, r),
			w = y ? { ...u.style, display: "none" } : u.style,
			b = n.useState((N) => Array.isArray(N.selectedValue)),
			S = vO(h, "role", u.role),
			E = ((S === "listbox" || S === "tree" || S === "grid") && b) || void 0,
			[C, T] = (0, _.useState)(!1),
			D = n.useState("contentElement");
		(Ze(() => {
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
			(u = Ht(u, (N) => (0, p.jsx)(WM, { value: n, children: (0, p.jsx)(xS.Provider, { value: S, children: N }) }), [
				n,
				S,
			])));
		const A = m && (!l || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: y, ...u, ref: St(A, h, u.ref), style: w }), Vr(u));
	}),
	sD = De(function (n) {
		return Ue(Dz, RS(n));
	}),
	jz = "div";
function qz(e, ...n) {
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
var Iz = Le(function ({
		store: n,
		modal: r,
		tabIndex: u,
		alwaysVisible: l,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Do();
		((n = n || m), pt(n, !1));
		const v = n.useState("baseElement"),
			y = (0, _.useRef)(!1),
			w = Rt(n.tag, (b) => b?.renderedItems.length);
		return (
			(h = RS({ store: n, alwaysVisible: l, ...h })),
			(h = ph({
				store: n,
				modal: r,
				alwaysVisible: l,
				backdrop: !1,
				autoFocusOnShow: !1,
				finalFocus: v,
				preserveTabOrderAnchor: null,
				unstable_treeSnapshotKey: w,
				...h,
				getPersistentElements() {
					var b;
					const S = ((b = h.getPersistentElements) == null ? void 0 : b.call(h)) || [];
					if (!r || !n) return S;
					const { contentElement: E, baseElement: C } = n.getState();
					if (!C) return S;
					const T = nt(C),
						D = [];
					if ((E?.id && D.push(`[aria-controls~="${E.id}"]`), C?.id && D.push(`[aria-controls~="${C.id}"]`), !D.length))
						return [...S, C];
					const A = D.join(","),
						N = T.querySelectorAll(A);
					return [...S, ...N];
				},
				autoFocusOnHide(b) {
					return mo(o, b) ? !1 : y.current ? ((y.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var S, E;
					const C = n?.getState(),
						T = (S = C?.contentElement) == null ? void 0 : S.id,
						D = (E = C?.baseElement) == null ? void 0 : E.id;
					if (qz(b.target, T, D)) return !1;
					const A = typeof f == "function" ? f(b) : f;
					return (A && (y.current = b.type === "click"), A);
				},
			})),
			h
		);
	}),
	Uz = bs(
		De(function (n) {
			return Ue(jz, Iz(n));
		}),
		Do,
	),
	lD = (0, _.createContext)(null),
	oD = (0, _.createContext)(null),
	Ss = Jn([os], [po]),
	Lz = Ss.useContext,
	cD = Ss.useScopedContext,
	fD = Ss.useProviderContext,
	dD = Ss.ContextProvider,
	hD = Ss.ScopedContextProvider,
	$z = go() && bp();
function Bz({ tag: e, ...n } = {}) {
	const r = Eo(n.store, Np(e, ["value", "rtl"]));
	const u = e?.getState(),
		l = r?.getState(),
		o = Ee(n.activeId, l?.activeId, n.defaultActiveId, null),
		f = fS({
			...n,
			activeId: o,
			includesBaseElement: Ee(n.includesBaseElement, l?.includesBaseElement, !0),
			orientation: Ee(n.orientation, l?.orientation, "vertical"),
			focusLoop: Ee(n.focusLoop, l?.focusLoop, !0),
			focusWrap: Ee(n.focusWrap, l?.focusWrap, !0),
			virtualFocus: Ee(n.virtualFocus, l?.virtualFocus, !0),
		}),
		h = wS({ ...n, placement: Ee(n.placement, l?.placement, "bottom-start") }),
		m = Ee(n.value, l?.value, n.defaultValue, ""),
		v = Ee(n.selectedValue, l?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		y = Array.isArray(v),
		w = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: Ee(n.resetValueOnSelect, l?.resetValueOnSelect, y),
			resetValueOnHide: Ee(n.resetValueOnHide, l?.resetValueOnHide, y && !e),
			activeValue: l?.activeValue,
		},
		b = Bn(w, f, h, r);
	return (
		$z &&
			Kt(b, () =>
				Qt(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		Kt(b, () => {
			if (e)
				return sn(
					Qt(b, ["selectedValue"], (S) => {
						Array.isArray(S.selectedValue) && e.setValues(S.selectedValue);
					}),
					Qt(e, ["values"], (S) => {
						b.setState("selectedValue", S.values);
					}),
				);
		}),
		Kt(b, () =>
			Qt(b, ["resetValueOnHide", "mounted"], (S) => {
				S.resetValueOnHide && (S.mounted || b.setState("value", m));
			}),
		),
		Kt(b, () =>
			Qt(b, ["open"], (S) => {
				S.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		Kt(b, () =>
			Qt(b, ["moves", "activeId"], (S, E) => {
				S.moves === E.moves && b.setState("activeValue", void 0);
			}),
		),
		Kt(b, () =>
			to(b, ["moves", "renderedItems"], (S, E) => {
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
			resetValue: () => b.setState("value", w.value),
			setSelectedValue: (S) => b.setState("selectedValue", S),
		}
	);
}
function Vz(e) {
	const n = Lz();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), EM(e));
}
function Hz(e, n, r) {
	return (
		Qa(n, [r.tag]),
		bt(e, r, "value", "setValue"),
		bt(e, r, "selectedValue", "setSelectedValue"),
		bt(e, r, "resetValueOnHide"),
		bt(e, r, "resetValueOnSelect"),
		Object.assign(dS(_S(e, n, r), n, r), { tag: r.tag })
	);
}
function Zz(e = {}) {
	e = Vz(e);
	const [n, r] = Co(Bz, e);
	return Hz(n, r, e);
}
var Qz = oe.union(
		oe.literal("thumbs_up"),
		oe.literal("heart"),
		oe.literal("laugh"),
		oe.literal("wow"),
		oe.literal("sad"),
		oe.literal("party"),
		oe.literal("rocket"),
		oe.literal("eyes"),
	),
	mD = oe.object({ fileNodeId: oe.string(), name: oe.string() }),
	vD = oe.union(oe.literal("read"), oe.literal("write"), oe.literal("manage")),
	Pz = oe.object({ message: oe.string(), name: oe.optional(oe.string()) }),
	Yz = oe.union(
		oe.object({
			kind: oe.literal("message"),
			messageId: oe.id("messages"),
			revision: oe.number(),
			sequence: oe.number(),
		}),
		oe.object({ kind: oe.literal("channel"), channelId: oe.id("channels"), revision: oe.number() }),
		oe.object({ kind: oe.literal("reaction"), messageId: oe.id("messages"), token: Qz, on: oe.boolean() }),
		oe.object({
			kind: oe.literal("membership"),
			channelId: oe.id("channels"),
			membershipRevision: oe.number(),
			left: oe.boolean(),
			deleted: oe.boolean(),
			pending: oe.boolean(),
		}),
	),
	gD = oe.union(oe.object({ _yay: Yz }), oe.object({ _nay: Pz })),
	yD = oe.union(
		oe.object({
			kind: oe.literal("block"),
			messageId: oe.id("messages"),
			rootSequence: oe.number(),
			replySequence: oe.number(),
			renderedBlock: oe.string(),
			sourceRevision: oe.number(),
		}),
		oe.object({ kind: oe.literal("header"), name: oe.string(), topic: oe.string(), isPrivate: oe.boolean() }),
		oe.object({ kind: oe.literal("archive"), archived: oe.boolean() }),
		oe.object({
			kind: oe.literal("readers"),
			readerRevision: oe.number(),
			readers: oe.array(oe.object({ userId: oe.string(), membershipLifetime: oe.number() })),
			deleted: oe.boolean(),
		}),
	);
function OS(e) {
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
var Fz = { text: "", attachments: [], mentions: [], pending: [] },
	K0 = new WeakMap();
function Kz() {
	const e = new Map(),
		n = new Set();
	return {
		get: (r) => e.get(r) ?? Fz,
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
function NS(e, n) {
	let r = K0.get(e);
	r || ((r = Kz()), K0.set(e, r));
	const u = r;
	return {
		value: (0, _.useSyncExternalStore)(u.subscribe, () => u.get(n)),
		get: () => u.get(n),
		set: (l) => u.set(n, l),
	};
}
var Gz = 3 * 1024 * 1024;
function MS(e) {
	const n = "rootMessageId" in e.target,
		r = Gz - (n ? 32 * 1024 : 0),
		u = e.enabled || e.retain,
		l = Xu(Se.messages.latest_roots, u && "channelId" in e.target ? e.target : "skip"),
		o = Xu(Se.messages.latest_replies, u && "rootMessageId" in e.target ? e.target : "skip"),
		f = n ? o : l,
		[h, m] = (0, _.useState)(null),
		v = (0, _.useRef)(0),
		y = (0, _.useRef)(new Map()),
		w = (0, _.useRef)({ head: null, rows: [] }),
		b = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		S = u && (f !== null || e.retain),
		E = Id(
			(0, _.useMemo)(
				() =>
					Object.fromEntries(
						(S ? (h?.pages ?? []) : []).map((G) => [
							String(G.id),
							{
								query: n ? Se.messages.list_replies : Se.messages.list_roots,
								args: {
									...(n ? { rootMessageId: b } : { channelId: b }),
									anchorSequence: h.anchor,
									paginationOpts: {
										numItems: 50,
										cursor: G.cursor,
										...(G.endCursor ? { endCursor: G.endCursor } : {}),
									},
								},
							},
						]),
					),
				[S, h, n, b],
			),
		),
		C = e.retain ? w.current.head : (f ?? null),
		T = f === null && !e.retain,
		D = new Set(h?.pages.map((G) => G.id));
	for (const G of y.current.keys()) (!D.has(G) || T || !u) && y.current.delete(G);
	const A =
			h?.pages.map((G) => {
				const F = E[String(G.id)];
				return (
					e.enabled && f !== null && F && !(F instanceof Error) && y.current.set(G.id, F),
					{ descriptor: G, result: F ?? y.current.get(G.id) }
				);
			}) ?? [],
		N = A.find((G) => G.result instanceof Error)?.result,
		R = A.filter((G) => G.result !== void 0 && !(G.result instanceof Error)),
		$ = h === null ? (C?.messages ?? []) : R.flatMap((G) => G.result.page),
		I = e.retain ? w.current.rows : T ? [] : e.enabled ? $ : [],
		j = new TextEncoder().encode(JSON.stringify({ rows: I, head: C })).byteLength,
		z = R.at(-1),
		U = e.enabled && f !== null && (C === null || A.some((G) => E[String(G.descriptor.id)] === void 0));
	((0, _.useEffect)(() => {
		!e.enabled && !e.retain
			? ((w.current = { head: null, rows: [] }), m(null))
			: e.enabled && (w.current = { head: C, rows: I });
	}, [e.enabled, e.retain, C, I]),
		(0, _.useEffect)(() => {
			if (!h || !e.enabled) return;
			const G = R.some(({ descriptor: F, result: ne }) => !F.endCursor && !ne.isDone);
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
						: G &&
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
			const G = [...h.pages, { id: ++v.current, cursor: z.result.continueCursor }],
				F = n ? 2 : 5;
			m({ ...h, pages: G.slice(-F), newerAnchor: G.length > F ? (I[0]?.sequence ?? h.anchor) : h.newerAnchor });
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
var G0 = 128;
function Xz(e) {
	return new TextEncoder().encode(e).byteLength;
}
function Jz(e) {
	if (e === null) return null;
	const n = e
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (n === "") return null;
	if (Xz(n) <= G0) return n;
	const r = new TextEncoder().encode(n).slice(0, G0);
	return new TextDecoder().decode(r).replace(/�$/, "");
}
function zS(e) {
	const n = Vn(),
		r = kr(Se.messages.send),
		u = kr(Se.messages.reply),
		l = Rb(Se.files.authorize_selection),
		o = (0, _.useRef)(new Set()),
		f = (0, _.useRef)(e.onRequestSettled);
	f.current = e.onRequestSettled;
	const [h, m] = (0, _.useState)(null),
		v = async (w) => {
			if (o.current.has(w.clientRequestId)) return;
			if (!n.ready || !n.can_request_now()) {
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((E) =>
							E.clientRequestId === w.clientRequestId
								? { ...E, status: "failed", error: "Chitchat is reconnecting. Retry when it is ready." }
								: E,
						),
				});
				return;
			}
			(o.current.add(w.clientRequestId),
				e.onRequestStart(),
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((E) =>
							E.clientRequestId === w.clientRequestId ? { ...E, status: "sending", error: null } : E,
						),
				}));
			const b = { clientRequestId: w.clientRequestId, text: w.text, attachments: w.attachments, mentions: w.mentions },
				S = () => (e.rootMessageId ? u({ ...b, rootMessageId: e.rootMessageId }) : r({ ...b, channelId: e.channelId }));
			try {
				let E = await S();
				if (E._nay?.message === "Check attachment access again before sending.") {
					const C = await l({
						pressToken: await e.client.getToken(),
						fileNodeIds: w.attachments.map((T) => T.fileNodeId),
					});
					if (C._nay) throw new Error(C._nay.message);
					if (w.attachments.some((T) => !C._yay.some((D) => D.fileNodeId === T.fileNodeId && D.name === T.name)))
						throw new Error("An attachment was renamed. Remove this pending send and select the file again.");
					if (!n.can_request_now()) throw new Error("Chitchat is reconnecting. Retry when it is ready.");
					E = await S();
				}
				if (E._nay) throw new Error(E._nay.message);
				e.draft.set({
					...e.draft.get(),
					pending: e.draft.get().pending.filter((C) => C.clientRequestId !== w.clientRequestId),
				});
			} catch (E) {
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((C) =>
							C.clientRequestId === w.clientRequestId ? { ...C, status: "failed", error: lo(E) } : C,
						),
				});
			} finally {
				(o.current.delete(w.clientRequestId), f.current());
			}
		};
	return {
		enqueue: (w, b, S) => {
			if (!e.canWrite || !n.canSend || !n.can_request_now())
				return (m("Chitchat is reconnecting or read-only. Your draft is kept."), !1);
			const E = OS({ text: w, attachments: b, mentions: S, authorName: Jz(n.member?.displayName ?? null) });
			if (E) return (m(E), !1);
			const C = {
					clientRequestId: crypto.randomUUID(),
					text: w,
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
		retry: (w) => void v(w),
		error: h,
		busy: e.draft.value.pending.some((w) => w.status === "sending"),
	};
}
function Wz(e) {
	const [n, r] = (0, _.useState)({}),
		[u, l] = (0, _.useState)(!1),
		[o, f] = (0, _.useState)(null),
		h = (0, _.useRef)(new Map()),
		m = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		m.current && (h.current.get(m.current)?.focus(), (m.current = null));
	}, [n]);
	const v = async (y) => {
		(l(!0), f(null), (m.current = y));
		try {
			const w = await e.client.fetchJson("/api/v1/files/download-urls", {
				fileNodeIds: e.attachments.map((S) => S.fileNodeId),
				download: !0,
			});
			if (w.status !== 200 || !w.body) throw new Error(w.body?.message ?? "The file links are unavailable.");
			r(Object.fromEntries(w.body.items.map((S) => [S.fileNodeId, { url: S.url, expiresAt: S.expiresAt }])));
			const b = w.body.errors.find((S) => S.fileNodeId === y);
			b && f(b.message);
		} catch (w) {
			f(lo(w));
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
											ref: (w) => {
												w ? h.current.set(y.fileNodeId, w) : h.current.delete(y.fileNodeId);
											},
											className: "attachment-link",
											href: n[y.fileNodeId].url,
											download: y.name,
											rel: "noreferrer",
											onClick: (w) => {
												n[y.fileNodeId].expiresAt <= Date.now() &&
													(w.preventDefault(), f("This download link expired. Use Refresh link to try again."));
											},
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
function ek(e) {
	const n = (0, _.useId)(),
		[r, u] = (0, _.useState)([]),
		[l, o] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(null),
		[m, v] = (0, _.useState)(!1),
		[y, w] = (0, _.useState)(!0),
		[b, S] = (0, _.useState)(null),
		[E, C] = (0, _.useState)(0);
	return (
		(0, _.useEffect)(() => {
			let T = !1;
			return (
				w(!0),
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
						T || S(lo(D));
					})
					.finally(() => {
						T || w(!1);
					}),
				() => {
					T = !0;
				}
			);
		}, [e.client, l, E]),
		(0, p.jsxs)(Va, {
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
function kS(e) {
	const n = (0, _.useId)(),
		r = (0, _.useId)(),
		u = Vn(),
		[l, o] = (0, _.useState)(!1),
		[f, h] = (0, _.useState)(null),
		[m, v] = (0, _.useState)(null),
		[y, w] = (0, _.useState)(null),
		b = et(u, Se.members.list, m !== null ? { paginationOpts: { numItems: 100, cursor: y } } : "skip"),
		S = e.draft.value.text,
		E = (0, _.useRef)(null),
		C = (0, _.useRef)(null),
		T = Zz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (j) => {
				j || v(null);
			},
		}),
		D = m && b ? cE(b.page, m.query, e.userId).slice(0, 8) : [],
		A = m !== null && (u.ready || u.refreshing),
		N = (j) => h(e.draft.set({ ...e.draft.get(), ...j })),
		R = (j) => {
			if (!m) return;
			const z = fE(S, m.start, E.current?.selectionStart ?? S.length, j.label),
				U = new Map(e.draft.value.mentions);
			(U.set(j.userId, j.label), N({ text: z.text, mentions: [...U] }), (C.current = z.caret), T.hide());
		},
		$ = () => {
			if (e.busy || e.disabled) return;
			const j = S.trim();
			(!j && e.draft.value.attachments.length === 0) ||
				(e.onSend(j, e.draft.value.attachments, dE(e.draft.value.mentions, j)) && T.hide());
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
		(0, _.useLayoutEffect)(() => {
			T.setOpen(A);
		}, [T, A]),
		(0, _.useLayoutEffect)(() => {
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
						(0, p.jsx)(Rz, {
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
									const U = oE(z, j.currentTarget.selectionStart);
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
							children: (0, p.jsx)(wz, { size: 18, "aria-hidden": "true" }),
						}),
						(0, p.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: $,
							children: (0, p.jsx)(yz, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, p.jsxs)(Uz, {
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
								kz,
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
							? (0, p.jsx)("button", { type: "button", onClick: () => w(null), children: "First people" })
							: null,
						b && !b.isDone
							? (0, p.jsx)("button", { type: "button", onClick: () => w(b.continueCursor), children: "Next people" })
							: null,
					],
				}),
				(0, p.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: f }) : null,
				l
					? (0, p.jsx)(ek, {
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
function tk(e) {
	const [n, r] = (0, _.useState)(!1),
		u = (0, _.useRef)(null),
		l = (0, _.useRef)([]);
	(0, _.useEffect)(() => {
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
						children: sE.map((f, h) => {
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
									"aria-label": zb[f],
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
									children: (0, p.jsx)("span", { "aria-hidden": "true", children: Mb[f] }),
								},
								f,
							);
						}),
					})
				: null,
		],
	});
}
var DS = 864e5;
function kd(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function nk(e) {
	const n = new Date(e).toDateString();
	return n === new Date().toDateString()
		? "Today"
		: n === new Date(Date.now() - DS).toDateString()
			? "Yesterday"
			: kd(e);
}
function ik(e) {
	const n = e?.trim().split(/\s+/u);
	return n?.[0] ? `${n[0][0]}${n.length > 1 ? n.at(-1)[0] : ""}`.toUpperCase() : "•";
}
function rk(e, n, r) {
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
function jS(e) {
	const { doc: n } = e,
		r = Vn(),
		u = et(r, Se.reactions.get_for_message, { messageId: n._id }),
		l = et(r, Se.threads.get_summary, e.onOpenThread ? { rootMessageId: n._id } : "skip"),
		o = kr(Se.messages.edit),
		f = kr(Se.messages.remove),
		h = kr(Se.reactions.set),
		[m, v] = (0, _.useState)(!1),
		[y, w] = (0, _.useState)(""),
		[b, S] = (0, _.useState)(!1),
		[E, C] = (0, _.useState)(!1),
		[T, D] = (0, _.useState)(null),
		[A, N] = (0, _.useState)(!1),
		R = (0, _.useRef)(null),
		$ = (0, _.useRef)(null),
		I = (0, _.useRef)(null),
		j = (0, _.useRef)(null),
		z = (0, _.useId)(),
		U = n.deletedAt !== null,
		L = e.canWrite && r.canSend;
	((0, _.useEffect)(() => {
		m && $.current?.focus();
	}, [m]),
		(0, _.useEffect)(() => {
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
					(D(lo(B)), N(!0));
				} finally {
					(C(!1), e.onRequestSettled());
				}
			}
		},
		ie = () => {
			if (!(!L && !R.current)) {
				if (!R.current) {
					const B = n.mentions.filter((qe) => {
							const O = e.memberNames.get(qe);
							return !!O && y.includes(`@${O}`);
						}),
						ue = OS({ ...n, text: y.trim(), mentions: B });
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
		G = () => {
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
		H = Date.now() - n.createdAt < 7 * DS;
	return (0, p.jsxs)("li", {
		ref: I,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, p.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: ik(k) }),
			(0, p.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, p.jsx)("span", { className: "message-author", children: k === null ? "Former member" : (k ?? "…") }),
					(0, p.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(n.createdAt).toISOString(),
						children: [
							H ? (0, p.jsxs)("span", { className: "visually-hidden", children: [kd(n.createdAt), " "] }) : null,
							(0, p.jsx)("span", {
								className: "message-clock",
								children: H
									? new Date(n.createdAt).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
									: kd(n.createdAt),
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
									onChange: (B) => w(B.currentTarget.value),
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
										rk(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, p.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, p.jsx)(Wz, { client: e.client, attachments: n.attachments }) : null,
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
														"aria-label": `${zb[B.token]}, ${B.count} ${B.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => F(B.token, B.reactedByMe),
														children: [
															(0, p.jsx)("span", { "aria-hidden": "true", children: Mb[B.token] }),
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
										children: ["Last reply ", so(l.latestReplyAt, Date.now())],
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
							(0, p.jsx)(tk, { groups: u ?? [], disabled: !L || E, onPick: F }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, p.jsxs)(p.Fragment, {
										children: [
											(0, p.jsx)("button", {
												ref: j,
												type: "button",
												className: "button message-action",
												disabled: E || A,
												onClick: () => {
													(w(n.text), v(!0), D(null));
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
				? (0, p.jsxs)(Va, {
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
										onClick: G,
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
function qS(e) {
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
function IS(e) {
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
function US(e) {
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
				ak,
				{
					...e,
					doc: u,
					isContinuation: m,
					newDay: f ? nk(u.createdAt) : null,
					newMark: h,
					replyTriggerRef: e.setReplyTrigger ? (v) => e.setReplyTrigger?.(u._id, v) : void 0,
				},
				u._id,
			);
		}),
	});
}
function ak(e) {
	return (0, p.jsxs)(p.Fragment, {
		children: [
			e.newDay ? (0, p.jsx)("li", { className: "day-divider", children: e.newDay }) : null,
			e.newMark
				? (0, p.jsx)("li", {
						className: "new-divider",
						children: (0, p.jsx)("span", { className: "new-divider-label", children: "New messages" }),
					})
				: null,
			(0, p.jsx)(jS, { ...e }),
		],
	});
}
function uk(e) {
	const n = Vn(),
		r = n.ready && e.channel !== null,
		u = et(n, Se.messages.get, r || n.refreshing ? { messageId: e.rootMessageId } : "skip"),
		l = MS({ target: { rootMessageId: e.rootMessageId }, enabled: r && u !== null, retain: n.refreshing }),
		o = NS(e.client, `${e.userId}:${e.channelId}:${e.rootMessageId}`),
		f = zS({
			...e,
			rootMessageId: e.rootMessageId,
			draft: o,
			canWrite: e.canWrite && !l.denied && e.channel?.archivedAt === null,
		}),
		h = (0, _.useRef)(null),
		m = (0, _.useRef)(null),
		v = (0, _.useRef)(!0),
		y = (0, _.useRef)(null);
	return (
		(0, _.useEffect)(() => {
			h.current?.focus();
		}, []),
		(0, _.useEffect)(() => {
			const w = u ? [u, ...l.rows] : l.rows,
				b = [...new Set(w.map((E) => E.authorHostUserId))],
				S = [...new Set([...b, ...w.flatMap((E) => E.mentions)])];
			S.length && e.memberNames.resolve(S, b);
		}, [l.rows, u, e.memberNames]),
		(0, _.useLayoutEffect)(() => {
			if (m.current) {
				if (v.current && l.atLatest) m.current.scrollTop = m.current.scrollHeight;
				else if (y.current) {
					const w = [...m.current.querySelectorAll("[data-key]")].find((b) => b.dataset.key === y.current.id);
					w && (m.current.scrollTop += w.getBoundingClientRect().top - y.current.top);
				}
			}
		}, [l.rows, l.atLatest]),
		(0, p.jsxs)("section", {
			className: "thread",
			"aria-label": "Thread",
			tabIndex: -1,
			onKeyDown: (w) => {
				w.key === "Escape" &&
					(w.stopPropagation(),
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
					? (0, p.jsx)("ul", {
							className: "message-list thread-root",
							children: (0, p.jsx)(jS, { ...e, doc: u, isContinuation: !1 }),
						})
					: (0, p.jsx)("p", {
							className: "channel-status",
							children: r && u === void 0 ? "Loading thread…" : "This thread is unavailable.",
						}),
				(0, p.jsxs)("div", {
					ref: m,
					className: "thread-replies",
					onScroll: () => {
						const w = m.current;
						if (!w) return;
						v.current = w.scrollHeight - w.scrollTop - w.clientHeight < 80;
						const b = [...w.querySelectorAll("[data-key]")].find(
							(S) => S.getBoundingClientRect().bottom >= w.getBoundingClientRect().top,
						);
						y.current = b ? { id: b.dataset.key, top: b.getBoundingClientRect().top } : null;
					},
					children: [
						(0, p.jsx)(IS, { window: l, disabled: e.sendInFlight || !r }),
						l.loading
							? (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading replies…" })
							: null,
						r && !l.denied && !l.loading && !l.rows.length
							? (0, p.jsx)("p", { className: "channel-status", children: "No replies yet" })
							: null,
						(0, p.jsxs)("ul", {
							className: "message-list",
							children: [
								(0, p.jsx)(US, { ...e, rows: l.rows }),
								(0, p.jsx)(qS, { draft: o, queue: f, disabled: !n.ready || !n.can_request_now() }),
							],
						}),
					],
				}),
				f.error ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
				(0, p.jsx)(kS, {
					client: e.client,
					userId: e.userId,
					draft: o,
					label: "Reply in thread",
					busy: f.busy,
					disabled: !r || !u || l.denied || !e.canWrite || !n.canSend || e.channel?.archivedAt !== null,
					onSend: f.enqueue,
				}),
			],
		})
	);
}
var sk = 420,
	Bu = 244,
	hd = 340;
function lk(e) {
	return (0, p.jsx)(ok, { ...e }, `${e.userId}:${e.channelId}`);
}
function ok(e) {
	const n = Vn(),
		r = n.ready && e.channel !== null,
		u = e.isNarrow && e.threadRootId !== null,
		l = MS({ target: { channelId: e.channelId }, enabled: r, retain: n.refreshing }),
		o = NS(e.client, `${e.userId}:${e.channelId}`),
		f = zS({
			...e,
			rootMessageId: null,
			draft: o,
			canWrite: e.canWrite && !l.denied && e.channel?.archivedAt === null,
		}),
		h = (0, _.useRef)(null),
		m = (0, _.useRef)(null),
		v = (0, _.useRef)(new Map()),
		y = (0, _.useRef)(!0),
		w = (0, _.useRef)(null),
		b = (0, _.useRef)(null),
		[S, E] = (0, _.useState)(0),
		[C, T] = (0, _.useState)(hd),
		[D, A] = (0, _.useState)(0),
		N = Math.max(Bu, S - sk),
		R = Math.min(N, Math.max(Bu, C));
	((0, _.useEffect)(() => {
		if (!e.threadRootId || !h.current) return;
		const I = h.current;
		E(I.clientWidth);
		const j = new ResizeObserver(() => E(I.clientWidth));
		return (j.observe(I), () => j.disconnect());
	}, [e.threadRootId]),
		(0, _.useEffect)(() => {
			const I = [...new Set(l.rows.map((z) => z.authorHostUserId))],
				j = [...new Set([...I, ...l.rows.flatMap((z) => z.mentions)])];
			j.length && e.memberNames.resolve(j, I);
		}, [l.rows, e.memberNames]),
		(0, _.useLayoutEffect)(() => {
			if (m.current) {
				if (y.current && l.atLatest) ((m.current.scrollTop = m.current.scrollHeight), A(l.sequence));
				else if (w.current) {
					const I = [...m.current.querySelectorAll("[data-key]")].find((j) => j.dataset.key === w.current.id);
					I && (m.current.scrollTop += I.getBoundingClientRect().top - w.current.top);
				}
			}
		}, [l.rows, l.atLatest, l.sequence]),
		(0, _.useEffect)(() => {
			(b.current !== null && l.sequence > b.current && l.atLatest && e.announce("New messages in this channel."),
				(b.current = l.sequence));
		}, [l.sequence, l.atLatest, e.announce]),
		(0, _.useEffect)(() => {
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
								? (0, p.jsx)("p", { className: "channel-privacy", children: Ud })
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
							w.current = j ? { id: j.dataset.key, top: j.getBoundingClientRect().top } : null;
						},
						children: [
							!r && !n.refreshing
								? (0, p.jsx)("p", {
										className: "channel-status",
										role: "status",
										children: "Messages are hidden until Chitchat can confirm your access. Your draft is kept.",
									})
								: null,
							(0, p.jsx)(IS, { window: l, disabled: e.sendInFlight || !r }),
							l.loading
								? (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading messages…" })
								: null,
							r && !l.denied && !l.loading && !l.rows.length && !o.value.pending.length
								? (0, p.jsx)("p", { className: "channel-status", children: "No messages yet" })
								: null,
							(0, p.jsxs)("ul", {
								className: "message-list",
								children: [
									(0, p.jsx)(US, {
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
									(0, p.jsx)(qS, { draft: o, queue: f, disabled: !n.ready || !n.can_request_now() }),
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
												T(Math.min(N, Math.max(Bu, I.key === "Home" ? hd : R + (I.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (I) => {
											(I.preventDefault(), I.currentTarget.setPointerCapture(I.pointerId));
										},
										onPointerMove: (I) => {
											I.currentTarget.hasPointerCapture(I.pointerId) &&
												h.current &&
												T(Math.min(N, Math.max(Bu, h.current.getBoundingClientRect().right - I.clientX)));
										},
										onDoubleClick: () => T(hd),
									}),
									(0, p.jsx)(uk, { ...e, rootMessageId: e.threadRootId, onClose: $ }, e.threadRootId),
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
			(0, p.jsx)(kS, {
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
function ck(e) {
	const n = Vn(),
		r = et(n, Se.transcripts.status, { channelId: e.channelId }),
		u = Rb(Se.transcripts.connect),
		l = kr(Se.transcripts.retry),
		o = kr(Se.transcripts.reconcile),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(null),
		[y, w] = (0, _.useState)(!1),
		[b, S] = (0, _.useState)(!1),
		E = (0, _.useRef)(null),
		C = (0, _.useRef)(null),
		T = (0, _.useId)(),
		D = (0, _.useId)(),
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
					$._nay ? v($._nay.message) : ((C.current = null), w(!1), S(!1));
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
													(w(!0), v(null));
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
				? (0, p.jsxs)(Va, {
						labelledBy: T,
						accessUnavailable: !n.refreshing && (!n.ready || r === null),
						onReconnect: n.retry,
						onClose: () => {
							f || w(!1);
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
										onClick: () => w(!1),
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
function fk(e, n) {
	const r = Ba(),
		u = (0, _.useRef)(new Map()),
		l = (0, _.useRef)(new Map()),
		o = (0, _.useRef)(0),
		[, f] = (0, _.useState)(0);
	(0, _.useEffect)(() => {
		((o.current += 1), u.current.clear(), l.current.clear());
	}, [e, n]);
	const h = (0, _.useCallback)(
		async (m, v = []) => {
			if (!n) return;
			const y = o.current,
				w = new Set(v);
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
				T ? (w.has(C) && (T.author = !0), S.add(T.promise)) : E.push(C);
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
				for (const A of T) l.current.set(A, { promise: D, author: w.has(A) });
				S.add(D);
			}
			S.size > 0 && (await Promise.all(S), o.current === y && f((C) => C + 1));
		},
		[r, n],
	);
	return (
		(0, _.useEffect)(() => {
			if (!n) return;
			const m = setInterval(() => {
				h([...u.current.keys()]);
			}, 6e4);
			return () => clearInterval(m);
		}, [h, n]),
		(0, _.useMemo)(() => ({ get: (m) => u.current.get(m)?.name, resolve: h }), [h])
	);
}
function Ch(e, n) {
	const r = e.get(n);
	return r === void 0 ? "…" : (r ?? "Former member");
}
function dk(e) {
	const n = _i(`${e.scopeKey}:public`),
		r = _i(`${e.scopeKey}:private`),
		u = et(e.session, Se.views.unreads, { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } }),
		l = et(e.session, Se.views.unreads, { visibility: "private", paginationOpts: { numItems: 50, cursor: r.cursor } });
	(0, _.useEffect)(() => {
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
																				children: so(v.lastActivityAt, Date.now()),
																			}),
																			v.latest
																				? (0, p.jsxs)("span", {
																						className: "view-row-preview",
																						children: [
																							Ch(e.memberNames, v.latest.authorHostUserId),
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
										(0, p.jsx)(tr, { page: h, result: m, label: f }),
									],
								},
								f,
							),
						),
					}),
		],
	});
}
function hk(e) {
	const n = _i(e.scopeKey),
		r = et(e.session, Se.views.activity, { paginationOpts: { numItems: 50, cursor: n.cursor } });
	(0, _.useEffect)(() => {
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
																	children: Ch(e.memberNames, f.authorHostUserId),
																}),
																(0, p.jsx)("span", {
																	className: "view-row-time",
																	children: so(f.createdAt, Date.now()),
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
			(0, p.jsx)(tr, { page: n, result: r, label: "Activity" }),
		],
	});
}
function mk(e) {
	const n = _i(e.scopeKey),
		r = et(e.session, Se.views.threads, { paginationOpts: { numItems: 50, cursor: n.cursor } });
	return (
		(0, _.useEffect)(() => {
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
														children: so(u.latest.createdAt, Date.now()),
													}),
													(0, p.jsxs)("span", {
														className: "view-row-preview",
														children: [
															u.summary.activeReplyCount,
															" ",
															u.summary.activeReplyCount === 1 ? "reply" : "replies",
															" ·",
															" ",
															Ch(e.memberNames, u.latest.authorHostUserId),
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
				(0, p.jsx)(tr, { page: n, result: r, label: "Threads" }),
			],
		})
	);
}
function vk(e) {
	const n = et(e.session, Se.channels.permissions, { channelId: e.channel._id }),
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
				children: (0, p.jsx)(_z, {
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
var gk = class extends _.Component {
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
function yk(e) {
	const n = Ba(),
		r = Vn(),
		u = e.client.context.userId,
		l = `${r.member?.generation ?? "loading"}:${r.member?.membershipLifetime ?? 0}`,
		o = fk(l, r.ready || r.refreshing),
		f = _i(`${l}:public`),
		h = _i(`${l}:private`),
		m = _i(`${l}:archived`),
		v = _i(`${l}:archived-private`),
		[y, w] = (0, _.useState)(!1),
		b = et(r, Se.channels.list_public, { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } }),
		S = et(r, Se.channels.list_mine, { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } }),
		E = et(r, Se.channels.list_mine, y ? { archived: !0, paginationOpts: { numItems: 50, cursor: v.cursor } } : "skip"),
		C = et(
			r,
			Se.channels.list_public,
			y ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[T, D] = (0, _.useState)(null),
		[A, N] = (0, _.useState)(null),
		[R, $] = (0, _.useState)(null),
		[I, j] = (0, _.useState)(!1),
		[z, U] = (0, _.useState)(!1),
		[L, Q] = (0, _.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[ie, G] = (0, _.useState)(0),
		[F, ne] = (0, _.useState)(0),
		k = (0, _.useRef)(0),
		[H, B] = (0, _.useState)({ sequence: 0, text: "" }),
		[ue, fe] = (0, _.useState)(null),
		qe = L && A !== null,
		O = T?.kind === "channel" ? T.id : null,
		X = et(r, Se.channels.get, O ? { channelId: O } : "skip"),
		re = et(r, Se.channels.permissions, O ? { channelId: O } : "skip"),
		le = X ?? null,
		me = (0, _.useRef)(null),
		ge = (0, _.useRef)(null),
		be = (0, _.useRef)(null),
		Ve = (0, _.useRef)(null),
		Me = (0, _.useRef)(null),
		ot = (0, _.useRef)(0),
		wt = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		ot.current += 1;
	}, [r.ready, l]);
	const Sn = (0, _.useId)(),
		cn = (0, _.useId)(),
		kt = (0, _.useId)(),
		de = (0, _.useId)(),
		we = (0, _.useMemo)(
			() => [...(b?.page ?? []), ...(S?.page ?? []), ...(C?.page ?? []), ...(E?.page ?? [])],
			[b, S, C, E],
		),
		ut = Id(
			(0, _.useMemo)(
				() =>
					Object.fromEntries(
						we.map((se) => [se._id, { query: Se.read_states.get_for_channel, args: { channelId: se._id } }]),
					),
				[we],
			),
		),
		Ie = we.filter((se) => {
			const xe = ut[se._id];
			return se.archivedAt === null && !(xe instanceof Error) && xe?.hasUnread;
		}).length,
		Dt = !b?.isDone || !S?.isDone || f.number > 1 || h.number > 1,
		ct = (0, _.useCallback)((se) => B((xe) => ({ sequence: xe.sequence + 1, text: se })), []),
		ae = (0, _.useCallback)(() => G((se) => se + 1), []),
		Ae = (0, _.useCallback)(() => G((se) => Math.max(0, se - 1)), []),
		mt = (0, _.useCallback)(
			(se) => {
				O &&
					fe((xe) =>
						xe?.channelId === O && xe.rootSequence >= se.rootSequence && xe.replySequence >= se.replySequence
							? xe
							: {
									channelId: O,
									rootSequence: Math.max(xe?.channelId === O ? xe.rootSequence : 0, se.rootSequence),
									replySequence: Math.max(xe?.channelId === O ? xe.replySequence : 0, se.replySequence),
								},
					);
			},
			[O],
		);
	(0, _.useEffect)(() => {
		if (!ue || ue.channelId !== X?._id || !r.connected || !r.can_request_now()) return;
		const se = JSON.stringify(ue);
		if (wt.current === se) return;
		wt.current = se;
		let xe = !1,
			vt;
		const jn = () => {
			xe ||
				wt.current !== se ||
				((wt.current = null),
				(k.current += 1),
				(vt = setTimeout(() => ne((Fa) => Fa + 1), Math.min(3e4, 1e3 * 2 ** Math.min(k.current - 1, 5)))));
		};
		return (
			n
				.mutation(Se.read_states.mark_read, ue)
				.then((Fa) => {
					"_nay" in Fa ? jn() : (k.current = 0);
				})
				.catch(jn),
			() => {
				((xe = !0), vt && clearTimeout(vt), wt.current === se && (wt.current = null));
			}
		);
	}, [n, ue, X?._id, r.connected, r.can_request_now, F]);
	const Re = (0, _.useCallback)(
			async (se, xe) => {
				if (ie > 0 || !r.ready) return;
				const vt = ++ot.current;
				try {
					const jn = await n.query(Se.read_states.get_for_channel, { channelId: se._id });
					if (vt !== ot.current) return;
					(D({ kind: "channel", id: se._id, openedAtReadSequence: jn?.state?.rootSequence ?? 0 }),
						N(xe ?? null),
						j(!1),
						U(!1),
						ct(`Opened #${se.name}`));
				} catch {
					ct("Could not open this channel. Try again.");
				}
			},
			[n, ie, r.ready, ct],
		),
		ft = (0, _.useCallback)(() => {
			($(null), (Me.current = "selected"));
		}, []),
		Gt = (0, _.useCallback)(() => {
			($(null), w(!0), (Me.current = "selected"));
		}, []);
	((0, _.useEffect)(() => {
		const se = (vt) => {
				vt.target instanceof Node && !me.current?.contains(vt.target) && (Ve.current = null);
			},
			xe = () => {
				Ve.current = null;
			};
		return (
			document.addEventListener("focusin", se),
			window.addEventListener("blur", xe),
			() => {
				(document.removeEventListener("focusin", se), window.removeEventListener("blur", xe));
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const se = window.matchMedia("(max-width: 719px)"),
				xe = (vt) => {
					((Me.current = vt.matches
						? A && Ve.current !== null
							? "thread"
							: Ve.current === "sidebar" && !I
								? "drawer"
								: null
						: Ve.current === "drawer"
							? "selected"
							: null),
						vt.matches && A && j(!1),
						Q(vt.matches));
				};
			return (se.addEventListener("change", xe), () => se.removeEventListener("change", xe));
		}, [I, A]),
		(0, _.useLayoutEffect)(() => {
			if (document.querySelector(".dialog-overlay")) return;
			const se = Me.current;
			if (((Me.current = null), se === "thread" || (se !== null && L && A))) {
				const xe = me.current?.querySelector(".thread"),
					vt = xe?.querySelector(".thread-head button:not([disabled])");
				vt ? vt.focus() : xe ? xe.focus() : be.current?.focus();
			} else if (se === "drawer" || (se === "selected" && L && !I)) be.current?.focus();
			else if (se === "selected") {
				const xe = ge.current?.querySelector('[aria-current="page"]');
				xe && !xe.disabled ? xe.focus() : ge.current?.focus();
			}
		}, [R, L, A, I]));
	const st = (se, xe, vt) =>
		vt.length === 0
			? null
			: (0, p.jsxs)("div", {
					className: "channel-section",
					children: [
						(0, p.jsx)("h2", { id: xe, className: "channel-section-title", children: se }),
						(0, p.jsx)("ul", {
							className: "channel-list",
							"aria-labelledby": xe,
							children: vt.map((jn) =>
								(0, p.jsx)(
									vk,
									{
										channel: jn,
										selected: O === jn._id,
										blocked: ie > 0,
										session: r,
										unread: ut[jn._id],
										onOpen: Re,
										onDialog: $,
									},
									jn._id,
								),
							),
						}),
					],
				});
	return (0, p.jsxs)("div", {
		ref: me,
		className: "chitchat",
		onFocusCapture: (se) => {
			const xe = se.target;
			Ve.current =
				xe === be.current
					? "drawer"
					: ge.current?.contains(xe)
						? "sidebar"
						: xe.classList.contains("thread-resize")
							? "separator"
							: me.current?.contains(xe) && !xe.closest(".thread")
								? "main"
								: null;
		},
		children: [
			(0, p.jsxs)("header", {
				className: "app-bar",
				inert: qe || void 0,
				children: [
					(0, p.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, p.jsx)("button", {
						ref: be,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": I,
						onClick: () => j((se) => !se),
						children: "Channels",
					}),
				],
			}),
			(0, p.jsx)("nav", {
				ref: ge,
				inert: qe || void 0,
				className: ["sidebar", I && "is-open", z && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (se) => {
					se.key === "Escape" && L && I && (j(!1), be.current?.focus());
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
									onClick: () => U((se) => !se),
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
							children: ["unreads", "threads", "activity"].map((se) =>
								(0, p.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, p.jsxs)("button", {
											type: "button",
											className:
												se === "unreads" && Ie > 0 ? "channel-link view-link is-unread" : "channel-link view-link",
											"aria-current": T?.kind === se ? "page" : void 0,
											disabled: ie > 0,
											onClick: () => {
												((ot.current += 1), D({ kind: se }), N(null), j(!1), ct(`Opened ${se}`));
											},
											children: [
												(0, p.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: se[0].toUpperCase(),
												}),
												(0, p.jsx)("span", { className: "channel-name", children: se[0].toUpperCase() + se.slice(1) }),
												se === "unreads" && Ie > 0
													? (0, p.jsxs)("span", {
															className: "mention-badge",
															children: [
																Ie,
																Dt ? "+" : "",
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
									se,
								),
							),
						}),
						(r.ready || r.refreshing) && b && S
							? (0, p.jsxs)(p.Fragment, {
									children: [
										st("Channels", Sn, b.page),
										(0, p.jsx)(tr, { page: f, result: b, label: "Public channels" }),
										st("Private channels", cn, S.page),
										(0, p.jsx)(tr, { page: h, result: S, label: "Private channels" }),
										we.length === 0
											? (0, p.jsx)("p", { className: "channel-status", children: "No channels on this page" })
											: null,
										(0, p.jsx)("button", {
											type: "button",
											className: "button sidebar-archive-toggle",
											"aria-expanded": y,
											onClick: () => w((se) => !se),
											children: y ? "Hide archived channels" : "Show archived channels",
										}),
										y
											? (0, p.jsxs)(p.Fragment, {
													children: [
														st("Archived", kt, C?.page ?? []),
														(0, p.jsx)(tr, { page: m, result: C, label: "Archived channels" }),
														st("Archived private channels", de, E?.page ?? []),
														(0, p.jsx)(tr, { page: v, result: E, label: "Archived private channels" }),
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
						inert: qe || void 0,
						children: [
							O ? (0, p.jsx)(ck, { client: e.client, channelId: O }, `transcript:${O}`) : null,
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
						? (0, p.jsx)(dk, { scopeKey: l, session: r, memberNames: o, onOpen: Re })
						: T?.kind === "activity"
							? (0, p.jsx)(hk, { scopeKey: l, session: r, userId: u, memberNames: o, onOpen: Re })
							: T?.kind === "threads"
								? (0, p.jsx)(mk, { scopeKey: l, session: r, memberNames: o, onOpen: Re })
								: T?.kind === "channel"
									? (0, p.jsx)(
											lk,
											{
												client: e.client,
												channelId: T.id,
												channel: le,
												userId: u,
												memberNames: o,
												announce: ct,
												threadRootId: A,
												setThreadRootId: (se) => {
													(N(se), se && j(!1));
												},
												isNarrow: L,
												canWrite: re?.canWrite ?? !1,
												online: r.connected,
												openedAtReadSequence: T.openedAtReadSequence,
												onObservedRead: mt,
												onRequestStart: ae,
												onRequestSettled: Ae,
												sendInFlight: ie > 0,
											},
											`channel:${T.id}`,
										)
									: (0, p.jsx)("p", {
											className: "channel-status",
											children: r.ready
												? we.length === 0
													? Dt
														? "No channels on this page. Use the page controls to continue."
														: "No channels yet — create the first one."
													: "Select a channel."
												: "Connecting to Chitchat…",
										}),
				],
			}),
			R?.kind === "create"
				? (0, p.jsx)(c0, {
						channel: null,
						selfUserId: u,
						onClose: ft,
						onSaved: (se) => {
							(ft(), D({ kind: "channel", id: se, openedAtReadSequence: 0 }), N(null));
						},
					})
				: null,
			R?.kind === "rename" ? (0, p.jsx)(c0, { channel: R.channel, selfUserId: u, onClose: ft, onSaved: ft }) : null,
			R?.kind === "people" ? (0, p.jsx)(KR, { channelId: R.channel._id, selfUserId: u, onClose: ft }) : null,
			R && R.kind !== "create" && R.kind !== "rename" && R.kind !== "people"
				? (0, p.jsx)(GR, { channel: R.channel, action: R.kind, onClose: ft, onDone: Gt })
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
function LS(e) {
	return (0, p.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var $S = document.getElementById("root");
if (!$S) throw new Error("index.html is missing the #root element");
var Dd = (0, uE.createRoot)($S);
Dd.render((0, p.jsx)(LS, { message: "Connecting…" }));
eE().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			Dd.render(
				(0, p.jsx)(gk, { client: e, children: (0, p.jsx)(FR, { client: e, children: (0, p.jsx)(yk, { client: e }) }) }),
			));
	},
	(e) => {
		Dd.render((0, p.jsx)(LS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
