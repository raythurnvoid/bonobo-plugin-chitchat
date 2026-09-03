var _1 = Object.create,
	Wp = Object.defineProperty,
	S1 = Object.getOwnPropertyDescriptor,
	w1 = Object.getOwnPropertyNames,
	E1 = Object.getPrototypeOf,
	T1 = Object.prototype.hasOwnProperty,
	_r = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	x1 = (e, n, i, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var l = w1(n), o = 0, f = l.length, h; o < f; o++)
				((h = l[o]),
					!T1.call(e, h) &&
						h !== i &&
						Wp(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = S1(n, h)) || u.enumerable }));
		return e;
	},
	eb = (e, n, i) => (
		(i = e != null ? _1(E1(e)) : {}),
		x1(n || !e || !e.__esModule ? Wp(i, "default", { value: e, enumerable: !0 }) : i, e)
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
var A1 = _r((e) => {
		var n = Symbol.for("react.transitional.element"),
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
		function x(k) {
			return k === null || typeof k != "object"
				? null
				: ((k = (w && k[w]) || k["@@iterator"]), typeof k == "function" ? k : null);
		}
		var R = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			I = Object.assign,
			D = {};
		function q(k, j, le) {
			((this.props = k), (this.context = j), (this.refs = D), (this.updater = le || R));
		}
		((q.prototype.isReactComponent = {}),
			(q.prototype.setState = function (k, j) {
				if (typeof k != "object" && typeof k != "function" && k != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, k, j, "setState");
			}),
			(q.prototype.forceUpdate = function (k) {
				this.updater.enqueueForceUpdate(this, k, "forceUpdate");
			}));
		function O() {}
		O.prototype = q.prototype;
		function C(k, j, le) {
			((this.props = k), (this.context = j), (this.refs = D), (this.updater = le || R));
		}
		var L = (C.prototype = new O());
		((L.constructor = C), I(L, q.prototype), (L.isPureReactComponent = !0));
		var J = Array.isArray;
		function X() {}
		var M = { H: null, A: null, T: null, S: null },
			$ = Object.prototype.hasOwnProperty;
		function B(k, j, le) {
			var de = le.ref;
			return { $$typeof: n, type: k, key: j, ref: de !== void 0 ? de : null, props: le };
		}
		function P(k, j) {
			return B(k.type, j, k.props);
		}
		function ce(k) {
			return typeof k == "object" && k !== null && k.$$typeof === n;
		}
		function se(k) {
			var j = { "=": "=0", ":": "=2" };
			return (
				"$" +
				k.replace(/[=:]/g, function (le) {
					return j[le];
				})
			);
		}
		var te = /\/+/g;
		function ne(k, j) {
			return typeof k == "object" && k !== null && k.key != null ? se("" + k.key) : j.toString(36);
		}
		function N(k) {
			switch (k.status) {
				case "fulfilled":
					return k.value;
				case "rejected":
					throw k.reason;
				default:
					switch (
						(typeof k.status == "string"
							? k.then(X, X)
							: ((k.status = "pending"),
								k.then(
									function (j) {
										k.status === "pending" && ((k.status = "fulfilled"), (k.value = j));
									},
									function (j) {
										k.status === "pending" && ((k.status = "rejected"), (k.reason = j));
									},
								)),
						k.status)
					) {
						case "fulfilled":
							return k.value;
						case "rejected":
							throw k.reason;
					}
			}
			throw k;
		}
		function V(k, j, le, de, he) {
			var Se = typeof k;
			(Se === "undefined" || Se === "boolean") && (k = null);
			var ye = !1;
			if (k === null) ye = !0;
			else
				switch (Se) {
					case "bigint":
					case "string":
					case "number":
						ye = !0;
						break;
					case "object":
						switch (k.$$typeof) {
							case n:
							case i:
								ye = !0;
								break;
							case _:
								return ((ye = k._init), V(ye(k._payload), j, le, de, he));
						}
				}
			if (ye)
				return (
					(he = he(k)),
					(ye = de === "" ? "." + ne(k, 0) : de),
					J(he)
						? ((le = ""),
							ye != null && (le = ye.replace(te, "$&/") + "/"),
							V(he, j, le, "", function (Ze) {
								return Ze;
							}))
						: he != null &&
							(ce(he) &&
								(he = P(
									he,
									le + (he.key == null || (k && k.key === he.key) ? "" : ("" + he.key).replace(te, "$&/") + "/") + ye,
								)),
							j.push(he)),
					1
				);
			ye = 0;
			var Ne = de === "" ? "." : de + ":";
			if (J(k))
				for (var Ue = 0; Ue < k.length; Ue++) ((de = k[Ue]), (Se = Ne + ne(de, Ue)), (ye += V(de, j, le, Se, he)));
			else if (((Ue = x(k)), typeof Ue == "function"))
				for (k = Ue.call(k), Ue = 0; !(de = k.next()).done; )
					((de = de.value), (Se = Ne + ne(de, Ue++)), (ye += V(de, j, le, Se, he)));
			else if (Se === "object") {
				if (typeof k.then == "function") return V(N(k), j, le, de, he);
				throw (
					(j = String(k)),
					Error(
						"Objects are not valid as a React child (found: " +
							(j === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : j) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return ye;
		}
		function Q(k, j, le) {
			if (k == null) return k;
			var de = [],
				he = 0;
			return (
				V(k, de, "", "", function (Se) {
					return j.call(le, Se, he++);
				}),
				de
			);
		}
		function ve(k) {
			if (k._status === -1) {
				var j = k._result;
				((j = j()),
					j.then(
						function (le) {
							(k._status === 0 || k._status === -1) && ((k._status = 1), (k._result = le));
						},
						function (le) {
							(k._status === 0 || k._status === -1) && ((k._status = 2), (k._result = le));
						},
					),
					k._status === -1 && ((k._status = 0), (k._result = j)));
			}
			if (k._status === 1) return k._result.default;
			throw k._result;
		}
		var pe =
				typeof reportError == "function"
					? reportError
					: function (k) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var j = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
									error: k,
								});
								if (!window.dispatchEvent(j)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", k);
								return;
							}
							console.error(k);
						},
			$e = {
				map: Q,
				forEach: function (k, j, le) {
					Q(
						k,
						function () {
							j.apply(this, arguments);
						},
						le,
					);
				},
				count: function (k) {
					var j = 0;
					return (
						Q(k, function () {
							j++;
						}),
						j
					);
				},
				toArray: function (k) {
					return (
						Q(k, function (j) {
							return j;
						}) || []
					);
				},
				only: function (k) {
					if (!ce(k)) throw Error("React.Children.only expected to receive a single React element child.");
					return k;
				},
			};
		((e.Activity = p),
			(e.Children = $e),
			(e.Component = q),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = C),
			(e.StrictMode = l),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = M),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (k) {
					return M.H.useMemoCache(k);
				},
			}),
			(e.cache = function (k) {
				return function () {
					return k.apply(null, arguments);
				};
			}),
			(e.cacheSignal = function () {
				return null;
			}),
			(e.cloneElement = function (k, j, le) {
				if (k == null) throw Error("The argument must be a React element, but you passed " + k + ".");
				var de = I({}, k.props),
					he = k.key;
				if (j != null)
					for (Se in (j.key !== void 0 && (he = "" + j.key), j))
						!$.call(j, Se) ||
							Se === "key" ||
							Se === "__self" ||
							Se === "__source" ||
							(Se === "ref" && j.ref === void 0) ||
							(de[Se] = j[Se]);
				var Se = arguments.length - 2;
				if (Se === 1) de.children = le;
				else if (1 < Se) {
					for (var ye = Array(Se), Ne = 0; Ne < Se; Ne++) ye[Ne] = arguments[Ne + 2];
					de.children = ye;
				}
				return B(k.type, he, de);
			}),
			(e.createContext = function (k) {
				return (
					(k = { $$typeof: h, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null }),
					(k.Provider = k),
					(k.Consumer = { $$typeof: f, _context: k }),
					k
				);
			}),
			(e.createElement = function (k, j, le) {
				var de,
					he = {},
					Se = null;
				if (j != null)
					for (de in (j.key !== void 0 && (Se = "" + j.key), j))
						$.call(j, de) && de !== "key" && de !== "__self" && de !== "__source" && (he[de] = j[de]);
				var ye = arguments.length - 2;
				if (ye === 1) he.children = le;
				else if (1 < ye) {
					for (var Ne = Array(ye), Ue = 0; Ue < ye; Ue++) Ne[Ue] = arguments[Ue + 2];
					he.children = Ne;
				}
				if (k && k.defaultProps) for (de in ((ye = k.defaultProps), ye)) he[de] === void 0 && (he[de] = ye[de]);
				return B(k, Se, he);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (k) {
				return { $$typeof: m, render: k };
			}),
			(e.isValidElement = ce),
			(e.lazy = function (k) {
				return { $$typeof: _, _payload: { _status: -1, _result: k }, _init: ve };
			}),
			(e.memo = function (k, j) {
				return { $$typeof: g, type: k, compare: j === void 0 ? null : j };
			}),
			(e.startTransition = function (k) {
				var j = M.T,
					le = {};
				M.T = le;
				try {
					var de = k(),
						he = M.S;
					(he !== null && he(le, de),
						typeof de == "object" && de !== null && typeof de.then == "function" && de.then(X, pe));
				} catch (Se) {
					pe(Se);
				} finally {
					(j !== null && le.types !== null && (j.types = le.types), (M.T = j));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return M.H.useCacheRefresh();
			}),
			(e.use = function (k) {
				return M.H.use(k);
			}),
			(e.useActionState = function (k, j, le) {
				return M.H.useActionState(k, j, le);
			}),
			(e.useCallback = function (k, j) {
				return M.H.useCallback(k, j);
			}),
			(e.useContext = function (k) {
				return M.H.useContext(k);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (k, j) {
				return M.H.useDeferredValue(k, j);
			}),
			(e.useEffect = function (k, j) {
				return M.H.useEffect(k, j);
			}),
			(e.useEffectEvent = function (k) {
				return M.H.useEffectEvent(k);
			}),
			(e.useId = function () {
				return M.H.useId();
			}),
			(e.useImperativeHandle = function (k, j, le) {
				return M.H.useImperativeHandle(k, j, le);
			}),
			(e.useInsertionEffect = function (k, j) {
				return M.H.useInsertionEffect(k, j);
			}),
			(e.useLayoutEffect = function (k, j) {
				return M.H.useLayoutEffect(k, j);
			}),
			(e.useMemo = function (k, j) {
				return M.H.useMemo(k, j);
			}),
			(e.useOptimistic = function (k, j) {
				return M.H.useOptimistic(k, j);
			}),
			(e.useReducer = function (k, j, le) {
				return M.H.useReducer(k, j, le);
			}),
			(e.useRef = function (k) {
				return M.H.useRef(k);
			}),
			(e.useState = function (k) {
				return M.H.useState(k);
			}),
			(e.useSyncExternalStore = function (k, j, le) {
				return M.H.useSyncExternalStore(k, j, le);
			}),
			(e.useTransition = function () {
				return M.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	mc = _r((e, n) => {
		n.exports = A1();
	}),
	Br = [],
	br = [],
	R1 = Uint8Array,
	Bd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Mu = 0, C1 = Bd.length; Mu < C1; ++Mu) ((Br[Mu] = Bd[Mu]), (br[Bd.charCodeAt(Mu)] = Mu));
br[45] = 62;
br[95] = 63;
function k1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = n);
	var u = i === n ? 0 : 4 - (i % 4);
	return [i, u];
}
function M1(e, n, i) {
	return ((n + i) * 3) / 4 - i;
}
function Js(e) {
	var n,
		i = k1(e),
		u = i[0],
		l = i[1],
		o = new R1(M1(e, u, l)),
		f = 0,
		h = l > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(br[e.charCodeAt(m)] << 18) |
			(br[e.charCodeAt(m + 1)] << 12) |
			(br[e.charCodeAt(m + 2)] << 6) |
			br[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		l === 2 && ((n = (br[e.charCodeAt(m)] << 2) | (br[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		l === 1 &&
			((n = (br[e.charCodeAt(m)] << 10) | (br[e.charCodeAt(m + 1)] << 4) | (br[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function N1(e) {
	return Br[(e >> 18) & 63] + Br[(e >> 12) & 63] + Br[(e >> 6) & 63] + Br[e & 63];
}
function O1(e, n, i) {
	for (var u, l = [], o = n; o < i; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), l.push(N1(u)));
	return l.join("");
}
function Ws(e) {
	for (var n, i = e.length, u = i % 3, l = [], o = 16383, f = 0, h = i - u; f < h; f += o)
		l.push(O1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[i - 1]), l.push(Br[n >> 2] + Br[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[i - 2] << 8) + e[i - 1]), l.push(Br[n >> 10] + Br[(n >> 4) & 63] + Br[(n << 2) & 63] + "=")),
		l.join("")
	);
}
function _i(e) {
	if (e === void 0) return {};
	if (!tb(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
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
function tb(e) {
	const n = typeof e == "object",
		i = Object.getPrototypeOf(e),
		u = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return n && u;
}
var nb = !0,
	Vu = BigInt("-9223372036854775808"),
	Kh = BigInt("9223372036854775807"),
	bh = BigInt("0"),
	D1 = BigInt("8"),
	j1 = BigInt("256"),
	Vd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	rb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Vd);
		}
		valueOf() {
			throw new Error(Vd);
		}
		toJSON() {
			throw new Error(Vd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	q1 = new rb();
function ib(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function I1(e) {
	e < bh && (e -= Vu + Vu);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const i = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const l of n.match(/.{2}/g).reverse()) (i.set([parseInt(l, 16)], u++), (e >>= D1));
	return Ws(i);
}
function L1(e) {
	const n = Js(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let i = bh,
		u = bh;
	for (const l of n) ((i += BigInt(l) * j1 ** u), u++);
	return (i > Kh && (i += Vu + Vu), i);
}
function U1(e) {
	if (e < Vu || Kh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), Ws(new Uint8Array(n)));
}
function $1(e) {
	const n = Js(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var B1 = DataView.prototype.setBigInt64 ? U1 : I1,
	V1 = DataView.prototype.getBigInt64 ? $1 : L1,
	l0 = 1024;
function _h(e) {
	if (e.length > l0) throw new Error(`Field name ${e} exceeds maximum field name length ${l0}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const i = e.charCodeAt(n);
		if (i < 32 || i >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Zu(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Zu(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return Js(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return V1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const l = Js(e.$float);
			if (l.byteLength !== 8) throw new Error(`Received ${l.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(l.buffer).getFloat64(0, nb);
			if (!ib(o)) throw new Error(`Float ${o} should be encoded as a number`);
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
	for (const [u, l] of Object.entries(e)) (_h(u), (i[u] = Zu(l)));
	return i;
}
var o0 = 16384;
function Lu(e) {
	const n = JSON.stringify(e, (i, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > o0) {
		const i = "[...truncated]";
		let u = o0 - 14;
		const l = n.codePointAt(u - 1);
		return (l !== void 0 && l > 65535 && (u -= 1), n.substring(0, u) + i);
	}
	return n;
}
function Fo(e, n, i, u) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Lu(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Vu || Kh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: B1(e) };
	}
	if (typeof e == "number")
		if (ib(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, nb), { $float: Ws(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: Ws(new Uint8Array(e)) };
	if (e instanceof rb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Fo(f, n, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Zd(i, "Set", [...e], n));
	if (e instanceof Map) throw new Error(Zd(i, "Map", [...e], n));
	if (!tb(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Zd(i, h, e, n));
	}
	const l = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (_h(f), (l[f] = Fo(h, n, i + `.${f}`, !1))) : u && (_h(f), (l[f] = Z1(h, n, i + `.${f}`)));
	return l;
}
function Zd(e, n, i, u) {
	return e
		? `${n}${Lu(i)} is not a supported Convex type (present at path ${e} in original object ${Lu(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${Lu(i)} is not a supported Convex type.`;
}
function Z1(e, n, i) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${Lu(e)} but original value is undefined`);
	return Fo(e, n, i, !1);
}
function ar(e) {
	return Fo(e, e, "", !1);
}
var H1 = Object.defineProperty,
	Q1 = (e, n, i) => (n in e ? H1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Hd = (e, n, i) => Q1(e, typeof n != "symbol" ? n + "" : n, i),
	c0,
	f0,
	P1 = Symbol.for("ConvexError"),
	Xo = class extends ((f0 = Error), (c0 = P1), f0) {
		constructor(e) {
			(super(typeof e == "string" ? e : Lu(e)),
				Hd(this, "name", "ConvexError"),
				Hd(this, "data"),
				Hd(this, c0, !0),
				(this.data = e));
		}
	},
	d0 = "1.44.0",
	K1 = Object.defineProperty,
	Y1 = (e, n, i) => (n in e ? K1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	h0 = (e, n, i) => Y1(e, typeof n != "symbol" ? n + "" : n, i),
	G1 = "color:rgb(0, 145, 255)";
function ab(e) {
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
var ub = class {
	constructor(e) {
		(h0(this, "_onLogLineFuncs"), h0(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
	}
	addLogLineListener(e) {
		let n = Math.random().toString(36).substring(2, 15);
		for (let i = 0; i < 10 && this._onLogLineFuncs[n] !== void 0; i++) n = Math.random().toString(36).substring(2, 15);
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
function sb(e) {
	const n = new ub(e);
	return (
		n.addLogLineListener((i, ...u) => {
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
		n
	);
}
function lb(e) {
	return new ub(e);
}
function Jo(e, n, i, u, l) {
	const o = ab(i);
	if ((typeof l == "object" && (l = `ConvexError ${JSON.stringify(l.errorData, null, 2)}`), n === "info")) {
		const f = l.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = l.slice(1, f[0].length - 2),
			m = l.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, G1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${l}`);
}
function F1(e, n) {
	const i = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(i), new Error(i));
}
function Du(e, n, i) {
	return `[CONVEX ${ab(e)}(${n})] ${i.errorMessage}
  Called by client`;
}
function Sh(e, n) {
	return ((n.data = e.errorData), n);
}
function Ha(e) {
	const n = e.split(":");
	let i, u;
	return (
		n.length === 1 ? ((i = n[0]), (u = "default")) : ((i = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${u}`
	);
}
function Ba(e, n) {
	return JSON.stringify({ udfPath: Ha(e), args: ar(n) });
}
function m0(e, n, i) {
	const { initialNumItems: u, id: l } = i;
	return JSON.stringify({ type: "paginated", udfPath: Ha(e), args: ar(n), options: ar({ initialNumItems: u, id: l }) });
}
var X1 = Object.defineProperty,
	J1 = (e, n, i) => (n in e ? X1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	$r = (e, n, i) => J1(e, typeof n != "symbol" ? n + "" : n, i),
	W1 = class {
		constructor() {
			($r(this, "nextQueryId"),
				$r(this, "querySetVersion"),
				$r(this, "querySet"),
				$r(this, "queryIdToToken"),
				$r(this, "identityVersion"),
				$r(this, "auth"),
				$r(this, "outstandingQueriesOlderThanRestart"),
				$r(this, "outstandingAuthOlderThanRestart"),
				$r(this, "paused"),
				$r(this, "pendingQuerySetModifications"),
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
		subscribe(e, n, i, u) {
			const l = Ha(e),
				o = Ba(l, n),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: l, args: n, numSubscribers: 1, journal: i, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const v = this.querySetVersion,
					g = this.querySetVersion + 1,
					_ = { type: "Add", queryId: h, udfPath: l, args: [ar(n)], journal: i, componentPath: u };
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
						const i = n.journal;
						if (i !== void 0) {
							const u = this.queryIdToToken.get(n.queryId);
							u !== void 0 && (this.querySet.get(u).journal = i);
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
			const i = Ba(Ha(e), n),
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
			const n = this.identityVersion;
			return (this.paused || (this.identityVersion = n + 1), { type: "Authenticate", baseVersion: n, ...this.auth });
		}
		setAdminAuth(e, n) {
			const i = { tokenType: "Admin", value: e, impersonating: n };
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
					args: [ar(u.args)],
					journal: u.journal,
					componentPath: u.componentPath,
				};
				(e.push(l), this.outstandingQueriesOlderThanRestart.add(u.id));
			}
			this.querySetVersion = 1;
			const n = { type: "ModifyQuerySet", baseVersion: 0, newVersion: 1, modifications: e };
			if (!this.auth) return ((this.identityVersion = 0), [n, void 0]);
			this.outstandingAuthOlderThanRestart = !0;
			const i = { type: "Authenticate", baseVersion: 0, ...this.auth };
			return ((this.identityVersion = 1), [n, i]);
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
				const i = this.querySetVersion,
					u = this.querySetVersion + 1,
					l = { type: "Remove", queryId: n.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(n.id)
							? this.pendingQuerySetModifications.delete(n.id)
							: this.pendingQuerySetModifications.set(n.id, l)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: i, newVersion: u, modifications: [l] }
				);
			}
		}
	},
	eE = Object.defineProperty,
	tE = (e, n, i) => (n in e ? eE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	qo = (e, n, i) => tE(e, typeof n != "symbol" ? n + "" : n, i),
	nE = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				qo(this, "inflightRequests"),
				qo(this, "requestsOlderThanRestart"),
				qo(this, "inflightMutationsCount", 0),
				qo(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, n) {
			const i = new Promise((u) => {
				const l = n ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: l, requestedAt: new Date(), onResult: u },
				}),
					e.type === "Mutation" ? this.inflightMutationsCount++ : e.type === "Action" && this.inflightActionsCount++);
			});
			return (this.markConnectionStateDirty(), i);
		}
		onResponse(e) {
			const n = this.inflightRequests.get(e.requestId);
			if (n === void 0 || n.status.status === "Completed") return null;
			const i = n.message.type === "Mutation" ? "mutation" : "action",
				u = n.message.udfPath;
			for (const h of e.logLines) Jo(this.logger, "info", i, u, h);
			const l = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Zu(e.result) }), (f = () => l.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Jo(this.logger, "error", i, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Zu(m) : void 0, logLines: e.logLines }),
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
			for (const [i, u] of this.inflightRequests.entries()) {
				const l = u.status;
				l.status === "Completed" &&
					l.ts.lessThanOrEqual(e) &&
					(l.onResolve(),
					n.set(i, l.result),
					u.message.type === "Mutation"
						? this.inflightMutationsCount--
						: u.message.type === "Action" && this.inflightActionsCount--,
					this.inflightRequests.delete(i),
					this.requestsOlderThanRestart.delete(i));
			}
			return (n.size > 0 && this.markConnectionStateDirty(), n);
		}
		restart() {
			this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
			const e = [];
			for (const [n, i] of this.inflightRequests) {
				if (i.status.status === "NotSent") {
					((i.status.status = "Requested"), e.push(i.message));
					continue;
				}
				if (i.message.type === "Mutation") e.push(i.message);
				else if (i.message.type === "Action") {
					if (
						(this.inflightRequests.delete(n),
						this.requestsOlderThanRestart.delete(n),
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
	el = Symbol.for("functionName"),
	rE = Symbol.for("toReferencePath");
function iE(e) {
	return e[rE] ?? null;
}
function aE(e) {
	return e.startsWith("function://");
}
function uE(e) {
	let n;
	if (typeof e == "string") aE(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[el]) n = { name: e[el] };
	else {
		const i = iE(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		n = { reference: i };
	}
	return n;
}
function jn(e) {
	const n = uE(e);
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
	const i = e[el];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function sE(e) {
	return { [el]: e };
}
function ob(e = []) {
	return new Proxy(
		{},
		{
			get(n, i) {
				if (typeof i == "string") return ob([...e, i]);
				if (i === el) {
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
var lE = ob(),
	oE = Object.defineProperty,
	cE = (e, n, i) => (n in e ? oE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Wo = (e, n, i) => cE(e, typeof n != "symbol" ? n + "" : n, i),
	v0 = class wh {
		constructor(n) {
			(Wo(this, "queryResults"), Wo(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...i) {
			const u = _i(i[0]),
				l = jn(n),
				o = this.queryResults.get(Ba(l, u));
			if (o !== void 0) return wh.queryValue(o.result);
		}
		getAllQueries(n) {
			const i = [],
				u = jn(n);
			for (const l of this.queryResults.values())
				l.udfPath === Ha(u) && i.push({ args: l.args, value: wh.queryValue(l.result) });
			return i;
		}
		setQuery(n, i, u) {
			const l = _i(i),
				o = jn(n),
				f = Ba(o, l);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: l, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	fE = class {
		constructor() {
			(Wo(this, "queryResults"),
				Wo(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const i = this.queryResults;
			this.queryResults = new Map(e);
			const u = new v0(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const l = [];
			for (const [o, f] of this.queryResults) {
				const h = i.get(o);
				(h === void 0 || h.result !== f.result) && l.push(o);
			}
			return l;
		}
		applyOptimisticUpdate(e, n) {
			this.optimisticUpdates.push({ update: e, mutationId: n });
			const i = new v0(this.queryResults);
			return (e(i), i.modifiedQueries);
		}
		rawQueryResult(e) {
			const n = this.queryResults.get(e);
			if (n !== void 0) return n.result;
		}
		queryResult(e) {
			const n = this.queryResults.get(e);
			if (n === void 0) return;
			const i = n.result;
			if (i !== void 0) {
				if (i.success) return i.value;
				throw i.errorData !== void 0 ? Sh(i, new Xo(Du("query", n.udfPath, i))) : new Error(Du("query", n.udfPath, i));
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
	hE = (e, n, i) => (n in e ? dE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Qd = (e, n, i) => hE(e, typeof n != "symbol" ? n + "" : n, i),
	al = class pi {
		constructor(n, i) {
			(Qd(this, "low"),
				Qd(this, "high"),
				Qd(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = i | 0),
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
				i = this.low;
			return [
				i & 255,
				(i >>> 8) & 255,
				(i >>> 16) & 255,
				i >>> 24,
				n & 255,
				(n >>> 8) & 255,
				(n >>> 16) & 255,
				n >>> 24,
			];
		}
		static fromNumber(n) {
			return isNaN(n) || n < 0 ? g0 : n >= mE ? vE : new pi((n % Ys) | 0, (n / Ys) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(Ys) + BigInt(this.low)).toString();
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
	g0 = new al(0, 0),
	y0 = 65536,
	Ys = y0 * y0,
	mE = Ys * Ys,
	vE = new al(-1, -1),
	gE = Object.defineProperty,
	yE = (e, n, i) => (n in e ? gE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Io = (e, n, i) => yE(e, typeof n != "symbol" ? n + "" : n, i),
	p0 = class {
		constructor(e, n) {
			(Io(this, "version"),
				Io(this, "remoteQuerySet"),
				Io(this, "queryPath"),
				Io(this, "logger"),
				(this.version = { querySet: 0, ts: al.fromNumber(0), identity: 0 }),
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
			for (const i of e.modifications)
				switch (i.type) {
					case "QueryUpdated": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) Jo(this.logger, "info", "query", u, o);
						const l = Zu(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: l, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) Jo(this.logger, "info", "query", u, o);
						const { errorData: l } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: l !== void 0 ? Zu(l) : void 0,
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
function Pd(e) {
	const n = Js(e);
	return al.fromBytesLE(Array.from(n));
}
function pE(e) {
	const n = new Uint8Array(e.toBytesLE());
	return Ws(n);
}
function b0(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: Pd(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: Pd(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: Pd(e.endVersion.ts) },
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
	SE = (e, n, i) => (n in e ? _E(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Wt = (e, n, i) => SE(e, typeof n != "symbol" ? n + "" : n, i),
	wE = 1e3,
	EE = 1001,
	TE = 1005,
	xE = 4040,
	Po;
function zu() {
	return (
		Po === void 0 && (Po = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Po + performance.now())
	);
}
function _0() {
	return `t=${Math.round((zu() - Po) / 100) / 10}s`;
}
var cb = {
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
	for (const n of Object.keys(cb)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var RE = class {
	constructor(e, n, i, u, l, o) {
		((this.markConnectionStateDirty = l),
			(this.debug = o),
			Wt(this, "socket"),
			Wt(this, "connectionCount"),
			Wt(this, "_hasEverConnected", !1),
			Wt(this, "lastCloseReason"),
			Wt(this, "transitionChunkBuffer", null),
			Wt(this, "defaultInitialBackoff"),
			Wt(this, "maxBackoff"),
			Wt(this, "retries"),
			Wt(this, "serverInactivityThreshold"),
			Wt(this, "reconnectDueToServerInactivityTimeout"),
			Wt(this, "scheduledReconnect", null),
			Wt(this, "networkOnlineHandler", null),
			Wt(this, "pendingNetworkRecoveryInfo", null),
			Wt(this, "uri"),
			Wt(this, "onOpen"),
			Wt(this, "onResume"),
			Wt(this, "onMessage"),
			Wt(this, "webSocketConstructor"),
			Wt(this, "logger"),
			Wt(this, "onServerDisconnectError"),
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
			const i = b0(JSON.parse(n));
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
							clientTs: zu(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", _0(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", _0())),
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
				const i = n.message;
				i && this.logger.log(`WebSocket error message: ${i}`);
			}),
			(e.onmessage = (n) => {
				this.resetServerInactivityTimeout();
				const i = n.data.length;
				let u = b0(JSON.parse(n.data));
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
			(e.onclose = (n) => {
				if (
					(this._logVerbose("begin ws.onclose"),
					(this.transitionChunkBuffer = null),
					this.lastCloseReason === null && (this.lastCloseReason = n.reason || `closed with code ${n.code}`),
					n.code !== wE && n.code !== EE && n.code !== TE && n.code !== xE)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const i = AE(n.reason);
				this.scheduleReconnect(i);
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
		const i = zu(),
			u = setTimeout(() => {
				this.scheduledReconnect?.timeout === u && ((this.scheduledReconnect = null), this.connect());
			}, n);
		this.scheduledReconnect = { timeout: u, scheduledAt: i, backoffMs: n };
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
				e.onmessage = (i) => {
					this._logVerbose("Ignoring message received after close");
				};
				const n = new Promise((i) => {
					e.onclose = () => {
						i();
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
			const n = zu() - this.scheduledReconnect.scheduledAt;
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
							clientTs: zu(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : cb[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(n, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = zu() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(i)}ms`,
			l = `${Math.round(n / 1e4) / 100}MB`,
			o = n / (i / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${l} transition in ${u} at ${f}`),
			n > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${l}) which will take a long time to download on slower connections`,
					)
				: i > 2e4 && this.logger.log(`received query results totaling ${l} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: i, messageLength: n },
				}));
	}
};
function CE() {
	return kE();
}
function kE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var Qs = class extends Error {};
Qs.prototype.name = "InvalidTokenError";
function ME(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, i) => {
			let u = i.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function NE(e) {
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
		return ME(n);
	} catch {
		return atob(n);
	}
}
function fb(e, n) {
	if (typeof e != "string") throw new Qs("Invalid token specified: must be a string");
	n || (n = {});
	const i = n.header === !0 ? 0 : 1,
		u = e.split(".")[i];
	if (typeof u != "string") throw new Qs(`Invalid token specified: missing part #${i + 1}`);
	let l;
	try {
		l = NE(u);
	} catch (o) {
		throw new Qs(`Invalid token specified: invalid base64 for part #${i + 1} (${o.message})`);
	}
	try {
		return JSON.parse(l);
	} catch (o) {
		throw new Qs(`Invalid token specified: invalid json for part #${i + 1} (${o.message})`);
	}
}
var OE = Object.defineProperty,
	zE = (e, n, i) => (n in e ? OE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Qn = (e, n, i) => zE(e, typeof n != "symbol" ? n + "" : n, i),
	DE = 480 * 60 * 60 * 1e3,
	S0 = 2,
	jE = class {
		constructor(e, n, i) {
			(Qn(this, "authState", { state: "noAuth" }),
				Qn(this, "configVersion", 0),
				Qn(this, "syncState"),
				Qn(this, "authenticate"),
				Qn(this, "stopSocket"),
				Qn(this, "tryRestartSocket"),
				Qn(this, "pauseSocket"),
				Qn(this, "resumeSocket"),
				Qn(this, "clearAuth"),
				Qn(this, "logger"),
				Qn(this, "refreshTokenLeewaySeconds"),
				Qn(this, "initialAuthTokenReuse"),
				Qn(this, "lastRefreshChange"),
				Qn(this, "tokenConfirmationAttempts", 0),
				(this.syncState = e),
				(this.authenticate = n.authenticate),
				(this.stopSocket = n.stopSocket),
				(this.tryRestartSocket = n.tryRestartSocket),
				(this.pauseSocket = n.pauseSocket),
				(this.resumeSocket = n.resumeSocket),
				(this.clearAuth = n.clearAuth),
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
		async setConfig(e, n, i) {
			(this.resetAuthState(), this._logVerbose("pausing WS for auth token fetch"), this.pauseSocket());
			const u = await this.fetchTokenAndGuardAgainstRace(e, { forceRefreshToken: !1 });
			if (u.isFromOutdatedConfig) return;
			const l = { fetchToken: e, onAuthChange: n, onRefreshChange: i };
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= S0))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${S0 - this.tokenConfirmationAttempts} attempts remaining`)),
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
			n !== void 0 ? ((f = l - (Date.now() - n) / 1e3), f <= 0 && (f = 0)) : (f = o);
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
		async fetchTokenAndGuardAgainstRace(e, n) {
			const i = ++this.configVersion;
			this._logVerbose(`fetching token with config version ${i}`);
			const u = await e(n);
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
				return fb(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	qE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function IE(e, n) {
	const i = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function LE(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function UE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const i of qE) {
		const u = performance
			.getEntriesByName(i)
			.filter((l) => l.entryType === "mark")
			.filter((l) => l.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(LE);
}
var $E = Object.defineProperty,
	BE = (e, n, i) => (n in e ? $E(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	en = (e, n, i) => BE(e, typeof n != "symbol" ? n + "" : n, i),
	VE = class {
		constructor(e, n, i) {
			if (
				(en(this, "address"),
				en(this, "state"),
				en(this, "requestManager"),
				en(this, "webSocketManager"),
				en(this, "authenticationManager"),
				en(this, "remoteQuerySet"),
				en(this, "optimisticQueryResults"),
				en(this, "_transitionHandlerCounter", 0),
				en(this, "_nextRequestId"),
				en(this, "_onTransitionFns", new Map()),
				en(this, "_sessionId"),
				en(this, "firstMessageReceived", !1),
				en(this, "debug"),
				en(this, "logger"),
				en(this, "maxObservedTimestamp"),
				en(this, "connectionStateSubscribers", new Map()),
				en(this, "nextConnectionStateSubscriberId", 0),
				en(this, "_lastPublishedConnectionState"),
				en(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const p = this.connectionState();
						if (JSON.stringify(p) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = p;
							for (const w of this.connectionStateSubscribers.values()) w(p);
						}
					});
				}),
				en(this, "mark", (p) => {
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
						? lb({ verbose: i.verbose ?? !1 })
						: i.logger !== !0 && i.logger
							? i.logger
							: sb({ verbose: i.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${d0}/sync`;
			((this.state = new W1()),
				(this.remoteQuerySet = new p0((p) => this.state.queryPath(p), this.logger)),
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
					n(p.queries.map((w) => w.token));
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
							(this.remoteQuerySet = new p0((R) => this.state.queryPath(R), this.logger)));
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
								const w = F1(this.logger, p.error);
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
			const n = this.remoteQuerySet.remoteQueryResults(),
				i = new Map();
			for (const [l, o] of n) {
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
					n = e ? fb(e.value) : {};
				} catch {
					n = {};
				}
			else return;
			return { token: e.value, decoded: n };
		}
		setAuth(e, n, i) {
			this.authenticationManager.setConfig(e, n, i);
		}
		hasAuth() {
			return this.state.hasAuth();
		}
		setAdminAuth(e, n) {
			const i = this.state.setAdminAuth(e, n);
			this.webSocketManager.sendMessage(i);
		}
		clearAuth() {
			const e = this.state.clearAuth();
			this.webSocketManager.sendMessage(e);
		}
		subscribe(e, n, i) {
			const u = _i(n),
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
		localQueryResult(e, n) {
			const i = Ba(e, _i(n));
			return this.optimisticQueryResults.queryResult(i);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const i = Ba(e, _i(n));
			return this.optimisticQueryResults.queryLogs(i);
		}
		queryJournal(e, n) {
			const i = Ba(e, _i(n));
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
			const n = this.nextConnectionStateSubscriberId++;
			return (
				this.connectionStateSubscribers.set(n, e),
				() => {
					this.connectionStateSubscribers.delete(n);
				}
			);
		}
		async mutation(e, n, i) {
			const u = await this.mutationInternal(e, n, i);
			if (!u.success)
				throw u.errorData !== void 0 ? Sh(u, new Xo(Du("mutation", e, u))) : new Error(Du("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, i, u) {
			const { mutationPromise: l } = this.enqueueMutation(e, n, i, u);
			return l;
		}
		enqueueMutation(e, n, i, u) {
			const l = _i(n);
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
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [ar(l)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const i = await this.actionInternal(e, n);
			if (!i.success) throw i.errorData !== void 0 ? Sh(i, new Xo(Du("action", e, i))) : new Error(Du("action", e, i));
			return i.value;
		}
		async actionInternal(e, n, i) {
			const u = _i(n),
				l = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: l, udfPath: e, componentPath: i, args: [ar(u)] },
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
			const n = `${this.address}/api/debug_event`;
			fetch(n, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${d0}` },
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
function Kd(e) {
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
	HE = (e, n, i) => (n in e ? ZE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	w0 = (e, n, i) => HE(e, typeof n != "symbol" ? n + "" : n, i),
	QE = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				w0(this, "paginatedQuerySet", new Map()),
				w0(this, "lastTransitionTs"),
				(this.lastTransitionTs = al.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, n, i) {
			const u = Ha(e),
				l = m0(u, n, i),
				o = () => this.removePaginatedQuerySubscriber(l),
				f = this.paginatedQuerySet.get(l);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: l, unsubscribe: o })
				: (this.paginatedQuerySet.set(l, {
						token: l,
						canonicalizedUdfPath: u,
						args: n,
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
		localQueryResult(e, n, i) {
			const u = m0(Ha(e), n, i);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) return;
			const i = this.activePageQueryTokens(n);
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
				const v = Kd(m);
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
				i = this.queriesContainingTokens(n);
			let u = [];
			i.length > 0 &&
				(this.processPaginatedQuerySplits(i, (o) => this.client.localQueryResultByToken(o)),
				(u = i.map((o) => ({ token: o, modification: { kind: "Updated", result: this.localQueryResultByToken(o) } }))));
			const l = { ...e, paginatedQueries: u };
			this.onTransition(l);
		}
		loadMoreOfPaginatedQuery(e, n) {
			this.mustGetPaginatedQuery(e);
			const i = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(i);
			if (!u) return !1;
			const l = Kd(u);
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
				i = new Set(e);
			for (const [u, l] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(l))
					if (i.has(o)) {
						n.push(u);
						break;
					}
			return n;
		}
		processPaginatedQuerySplits(e, n) {
			for (const i of e) {
				const u = this.mustGetPaginatedQuery(i),
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
					const g = Kd(v);
					g.splitCursor &&
						(g.pageStatus === "SplitRecommended" ||
							g.pageStatus === "SplitRequired" ||
							g.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, g.splitCursor, g.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, n, i, u, l) {
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
			(e.pageKeyToQuery.set(f, { ...v, cursor: u }), e.ongoingSplits.set(n, [o, f]));
		}
		addPageToPaginatedQuery(e, n, i) {
			const u = this.mustGetPaginatedQuery(e),
				l = u.nextPageKey++,
				o = { cursor: n, numItems: i, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(l), u.pageKeyToQuery.set(l, { ...h, cursor: n }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const n = this.paginatedQuerySet.get(e);
			if (n && ((n.numSubscribers -= 1), !(n.numSubscribers > 0))) {
				for (const i of n.pageKeyToQuery.values()) i.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, n, i, u) {
			const l = e.pageKeyToQuery.get(n);
			e.pageKeyToQuery.delete(n);
			const o = e.pageKeys.indexOf(n);
			(e.pageKeys.splice(o, 1, i, u), e.ongoingSplits.delete(n), l.unsubscribe());
		}
		activePageQueryTokens(e) {
			return e.pageKeys.map((n) => e.pageKeyToQuery.get(n).queryToken);
		}
		allQueryTokens(e) {
			return Array.from(e.pageKeyToQuery.values()).map((n) => n.queryToken);
		}
		queryTokenForLastPageOfPaginatedQuery(e) {
			const n = this.mustGetPaginatedQuery(e),
				i = n.pageKeys[n.pageKeys.length - 1];
			if (i === void 0) throw new Error(`No pages for paginated query ${e}`);
			return n.pageKeyToQuery.get(i).queryToken;
		}
		mustGetPaginatedQuery(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) throw new Error("paginated query no longer exists for token " + e);
			return n;
		}
	},
	b = eb(mc(), 1);
function PE({ getCurrentValue: e, subscribe: n }) {
	const [i, u] = (0, b.useState)(() => ({ getCurrentValue: e, subscribe: n, value: e() }));
	let l = i.value;
	return (
		(i.getCurrentValue !== e || i.subscribe !== n) && ((l = e()), u({ getCurrentValue: e, subscribe: n, value: l })),
		(0, b.useEffect)(() => {
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
var KE = Object.defineProperty,
	YE = (e, n, i) => (n in e ? KE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	yi = (e, n, i) => YE(e, typeof n != "symbol" ? n + "" : n, i),
	GE = 5e3;
if (typeof b.default > "u") throw new Error("Required dependency 'react' not found");
var FE = class {
		constructor(e, n) {
			if (
				(yi(this, "address"),
				yi(this, "cachedSync"),
				yi(this, "cachedPaginatedQueryClient"),
				yi(this, "listeners"),
				yi(this, "options"),
				yi(this, "closed", !1),
				yi(this, "_logger"),
				yi(this, "adminAuth"),
				yi(this, "fakeUserIdentity"),
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
						? lb({ verbose: n?.verbose ?? !1 })
						: n?.logger !== !0 && n?.logger
							? n.logger
							: sb({ verbose: n?.verbose ?? !1 })),
				(this.options = { ...n, logger: this._logger }));
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
					(this.cachedPaginatedQueryClient = new QE(this.cachedSync, (e) => this.handleTransition(e))),
					this.cachedSync);
		}
		get paginatedQueryClient() {
			if ((this.sync, this.cachedPaginatedQueryClient)) return this.cachedPaginatedQueryClient;
			throw new Error("Should already be instantiated");
		}
		setAuth(e, n, i) {
			if (typeof e == "string")
				throw new Error(
					"Passing a string to ConvexReactClient.setAuth is no longer supported, please upgrade to passing in an async function to handle reauthentication.",
				);
			this.sync.setAuth(e, n ?? (() => {}), i);
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
			const [i, u] = n,
				l = jn(e);
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
			const n = e.extendSubscriptionFor ?? GE,
				i = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(i, n);
		}
		watchPaginatedQuery(e, n, i) {
			const u = jn(e);
			return {
				onUpdate: (l) => {
					const { paginatedQueryToken: o, unsubscribe: f } = this.paginatedQueryClient.subscribe(u, n || {}, i),
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
				localQueryResult: () => this.paginatedQueryClient.localQueryResult(u, n, i),
			};
		}
		mutation(e, ...n) {
			const [i, u] = n,
				l = jn(e);
			return this.sync.mutation(l, i, u);
		}
		action(e, ...n) {
			const i = jn(e);
			return this.sync.action(i, ...n);
		}
		query(e, ...n) {
			const i = this.watchQuery(e, ...n),
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
			const n = e.queries.map((u) => u.token),
				i = e.paginatedQueries.map((u) => u.token);
			this.transition([...n, ...i]);
		}
		transition(e) {
			for (const n of e) {
				const i = this.listeners.get(n);
				if (i) for (const u of i) u();
			}
		}
	},
	db = b.createContext(void 0);
function hb() {
	return (0, b.useContext)(db);
}
var XE = ({ client: e, children: n }) => b.createElement(db.Provider, { value: e }, n);
function Va(e, ...n) {
	const i = n[0] === "skip",
		u = n[0] === "skip" ? {} : _i(n[0]),
		l = typeof e == "string" ? sE(e) : e,
		o = jn(l),
		f = ec((0, b.useMemo)(() => (i ? {} : { query: { query: l, args: u } }), [JSON.stringify(ar(u)), o, i])).query;
	if (f instanceof Error) throw f;
	return f;
}
var JE = Object.defineProperty,
	WE = (e, n, i) => (n in e ? JE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Yd = (e, n, i) => WE(e, typeof n != "symbol" ? n + "" : n, i),
	eT = class {
		constructor(e) {
			(Yd(this, "createWatch"),
				Yd(this, "queries"),
				Yd(this, "listeners"),
				(this.createWatch = e),
				(this.queries = {}),
				(this.listeners = new Set()));
		}
		setQueries(e) {
			for (const n of Object.keys(e)) {
				const { query: i, args: u, paginationOptions: l } = e[n];
				if ((jn(i), this.queries[n] === void 0)) this.addQuery(n, i, u, l ? { paginationOptions: l } : {});
				else {
					const o = this.queries[n];
					(jn(i) !== jn(o.query) ||
						JSON.stringify(ar(u)) !== JSON.stringify(ar(o.args)) ||
						JSON.stringify(l) !== JSON.stringify(o.paginationOptions)) &&
						(this.removeQuery(n), this.addQuery(n, i, u, l ? { paginationOptions: l } : {}));
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
			for (const i of Object.keys(e)) {
				const { query: u, args: l } = e[i],
					o = e[i].paginationOptions;
				jn(u);
				const f = this.createWatch(u, l, o ? { paginationOptions: o } : {});
				let h;
				try {
					h = f.localQueryResult();
				} catch (m) {
					if (m instanceof Error) h = m;
					else throw m;
				}
				n[i] = h;
			}
			return n;
		}
		setCreateWatch(e) {
			this.createWatch = e;
			for (const n of Object.keys(this.queries)) {
				const { query: i, args: u, watch: l, paginationOptions: o } = this.queries[n],
					f = "journal" in l ? l.journal() : void 0;
				(this.removeQuery(n),
					this.addQuery(n, i, u, { ...(f ? { journal: f } : []), ...(o ? { paginationOptions: o } : {}) }));
			}
		}
		destroy() {
			for (const e of Object.keys(this.queries)) this.removeQuery(e);
			this.listeners = new Set();
		}
		addQuery(e, n, i, { paginationOptions: u, journal: l }) {
			if (this.queries[e] !== void 0)
				throw new Error(`Tried to add a new query with identifier ${e} when it already exists.`);
			const o = this.createWatch(n, i, { ...(l ? { journal: l } : []), ...(u ? { paginationOptions: u } : {}) }),
				f = o.onUpdate(() => this.notifyListeners());
			this.queries[e] = { query: n, args: i, watch: o, unsubscribe: f, ...(u ? { paginationOptions: u } : {}) };
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
function ec(e) {
	const n = hb();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return tT(
		e,
		(0, b.useMemo)(
			() =>
				(i, u, { journal: l, paginationOptions: o }) =>
					o ? n.watchPaginatedQuery(i, u, o) : n.watchQuery(i, u, l ? { journal: l } : {}),
			[n],
		),
	);
}
function tT(e, n) {
	const [i] = (0, b.useState)(() => new eT(n));
	return (
		i.createWatch !== n && i.setCreateWatch(n),
		(0, b.useEffect)(() => () => i.destroy(), [i]),
		PE(
			(0, b.useMemo)(
				() => ({ getCurrentValue: () => i.getLocalResults(e), subscribe: (u) => (i.setQueries(e), i.subscribe(u)) }),
				[i, e],
			),
		)
	);
}
var nT = (e, n, i) => (u) => {
		const l = { ...u.queries },
			o = u.nextPageKey,
			f = u.nextPageKey + 1,
			h = u.nextPageKey + 2;
		((l[o] = {
			query: u.query,
			args: { ...u.args, paginationOpts: { ...u.queries[e].args.paginationOpts, endCursor: n } },
		}),
			(l[f] = {
				query: u.query,
				args: { ...u.args, paginationOpts: { ...u.queries[e].args.paginationOpts, cursor: n, endCursor: i } },
			}));
		const m = { ...u.ongoingSplits };
		return ((m[e] = [o, f]), { ...u, nextPageKey: h, queries: l, ongoingSplits: m });
	},
	rT = (e) => (n) => {
		const i = n.ongoingSplits[e];
		if (i === void 0) return n;
		const u = { ...n.queries };
		delete u[e];
		const l = { ...n.ongoingSplits };
		delete l[e];
		let o = n.pageKeys.slice();
		const f = n.pageKeys.findIndex((h) => h === e);
		return (
			f >= 0 && (o = [...n.pageKeys.slice(0, f), ...i, ...n.pageKeys.slice(f + 1)]),
			{ ...n, queries: u, pageKeys: o, ongoingSplits: l }
		);
	};
function iT(e, n, i) {
	const { user: u } = sT(e, n, i, !0);
	return u;
}
var aT = Symbol("includePageKeys"),
	uT = Symbol("page");
function sT(e, n, i, u = !0) {
	if (typeof i?.initialNumItems != "number" || i.initialNumItems < 0)
		throw new Error(`\`options.initialNumItems\` must be a positive number. Received \`${i?.initialNumItems}\`.`);
	const l = n === "skip",
		o = l ? {} : n,
		f = jn(e),
		h = (0, b.useMemo)(
			() => () => {
				const D = lT();
				return {
					query: e,
					args: o,
					id: D,
					nextPageKey: 1,
					pageKeys: l ? [] : [0],
					queries: l
						? {}
						: { 0: { query: e, args: { ...o, paginationOpts: { numItems: i.initialNumItems, cursor: null, id: D } } } },
					ongoingSplits: {},
					skip: l,
				};
			},
			[JSON.stringify(ar(o)), f, i.initialNumItems, l],
		),
		[m, v] = (0, b.useState)(h);
	let g = m;
	(jn(e) !== jn(m.query) || JSON.stringify(ar(o)) !== JSON.stringify(ar(m.args)) || l !== m.skip) && ((g = h()), v(g));
	const _ = hb().logger,
		p = ec(g.queries),
		w = i[aT] ?? !1,
		[x, R, I] = (0, b.useMemo)(() => {
			let D;
			const q = [];
			for (const O of g.pageKeys) {
				if (((D = p[O]), D === void 0)) break;
				if (D instanceof Error) {
					if (
						D.message.includes("InvalidCursor") ||
						(D instanceof Xo &&
							typeof D.data == "object" &&
							D.data?.isConvexSystemError === !0 &&
							D.data?.paginationError === "InvalidCursor")
					)
						return (
							_.warn("usePaginatedQuery hit error, resetting pagination state: " + D.message),
							v(h),
							[[], void 0, void 0]
						);
					if (u) throw D;
					return [q, void 0, D];
				}
				const C = g.ongoingSplits[O];
				if (
					(C !== void 0
						? p[C[0]] !== void 0 && p[C[1]] !== void 0 && v(rT(O))
						: D.splitCursor &&
							(D.pageStatus === "SplitRecommended" ||
								D.pageStatus === "SplitRequired" ||
								D.page.length > i.initialNumItems * 2) &&
							v(nT(O, D.splitCursor, D.continueCursor)),
					D.pageStatus === "SplitRequired")
				)
					return [q, void 0, void 0];
				q.push(...(w ? D.page.map((L) => ({ ...L, [uT]: O.toString() })) : D.page));
			}
			return [q, D, void 0];
		}, [p, g.pageKeys, g.ongoingSplits, i.initialNumItems, h, _, w, u]);
	return {
		user: {
			results: x,
			...(0, b.useMemo)(() => {
				if (I !== void 0) return { status: "Error", isLoading: !1, error: I, loadMore: () => {} };
				if (R === void 0)
					return g.nextPageKey === 1
						? { status: "LoadingFirstPage", isLoading: !0, loadMore: () => {} }
						: { status: "LoadingMore", isLoading: !0, loadMore: (O) => {} };
				if (R.isDone) return { status: "Exhausted", isLoading: !1, loadMore: (O) => {} };
				const D = R.continueCursor;
				let q = !1;
				return {
					status: "CanLoadMore",
					isLoading: !1,
					loadMore: (O) => {
						q ||
							((q = !0),
							v((C) => {
								const L = [...C.pageKeys, C.nextPageKey],
									J = { ...C.queries };
								return (
									(J[C.nextPageKey] = {
										query: C.query,
										args: { ...C.args, paginationOpts: { numItems: O, cursor: D, id: C.id } },
									}),
									{ ...C, nextPageKey: C.nextPageKey + 1, pageKeys: L, queries: J }
								);
							}));
					},
				};
			}, [I, R, g.nextPageKey]),
		},
		internal: { state: g },
	};
}
var E0 = 0;
function lT() {
	return (E0++, E0);
}
var oT = lE,
	T0 = 6e4,
	cT = 500,
	fT = 1e4,
	dT = 1e3,
	hT = 3e4,
	mT = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function x0(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e;
	if ((n.mode !== "light" && n.mode !== "dark") || typeof n.tokens != "object" || n.tokens === null) return null;
	const i = {};
	for (const [u, l] of Object.entries(n.tokens)) {
		if (typeof l != "string") return null;
		i[u] = l;
	}
	return { mode: n.mode, tokens: i };
}
function A0(e) {
	const n = document.documentElement;
	for (const [i, u] of Object.entries(e.tokens)) n.style.setProperty(i, u);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function vT(e) {
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
		const i = n.file;
		return (
			typeof i.fileNodeId == "string" &&
			typeof i.name == "string" &&
			typeof i.path == "string" &&
			typeof i.contentType == "string"
		);
	}
	return !1;
}
function gT() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const n = new URLSearchParams(e),
		i = n.getAll("parentOrigin"),
		u = n.getAll("nonce");
	if (n.size !== 2 || i.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
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
async function yT() {
	const { parentOrigin: e, nonce: n } = gT();
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
		return Date.now() >= l - T0 ? p() : u;
	}
	function p() {
		if (g) return g;
		const O = crypto.randomUUID();
		return (
			(g = new Promise((C, L) => {
				const J = setTimeout(() => {
					(v.delete(O), L(new Error("Plugin frame token refresh timed out")));
				}, fT);
				v.set(O, { resolve: C, reject: L, timeout: J });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: O }, e);
				} catch (X) {
					(clearTimeout(J), v.delete(O), L(X));
				}
			}).finally(() => {
				g = null;
			})),
			g
		);
	}
	const w = () => o !== "" && Date.now() < f - T0,
		x = (O) => {
			typeof O.jwt == "string" && typeof O.jwtExpiresAt == "number" && Number.isFinite(O.jwtExpiresAt)
				? ((o = O.jwt), (f = O.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function R(O, C, L) {
		const J = JSON.stringify(C),
			X = (se) => {
				const te = new Headers(L?.headers);
				return (
					te.set("Authorization", `Bearer ${se}`),
					te.set("Content-Type", "application/json"),
					te.set("Accept", "application/json"),
					fetch(i + O, { ...L, method: "POST", body: J, headers: te, redirect: "error" })
				);
			},
			M = await _();
		let $ = await X(M);
		$.status === 401 && ($ = await X(u !== M ? u : await p()));
		const B = await $.text(),
			P = (se) => Object.assign(new Error(`${O} responded ${$.status}: ${se}`), { status: $.status, responseText: B });
		if ($.status >= 500) throw P(B);
		let ce;
		try {
			ce = JSON.parse(B);
		} catch {
			throw P("the body was not JSON");
		}
		return { status: $.status, body: ce };
	}
	async function I(O) {
		const C = new Headers(O);
		return (C.set("Authorization", `Bearer ${await _()}`), C);
	}
	const D = (O) =>
		fetch(i + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: O }),
		});
	async function q(O) {
		const C = O?.forceRefreshToken === !0;
		for (let L = 0; ; L += 1) {
			if (w() && !C) return o;
			let J = null;
			try {
				if (o !== "" && (await p(), w())) return o;
				((J = await D(await _())), J.status === 401 && (J = await D(await p())));
			} catch {
				J = null;
			}
			if (J?.ok) {
				const X = await J.json().catch(() => null),
					M = X?._yay?.jwt,
					$ = X?._yay?.sessionExpiresAt;
				return typeof M != "string" || typeof $ != "number" ? null : ((l = $), (o = M), (f = $), M);
			}
			if (!(J === null || J.status === 429 || J.status >= 500) || L >= 2) return null;
			await new Promise((X) => setTimeout(X, 1e3 * (L + 1)));
		}
	}
	return new Promise((O) => {
		let C = !1,
			L;
		const J = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			X = () => {
				clearInterval(L);
			},
			M = ($) => {
				if ($.source !== window.parent || $.origin !== e) return;
				const B = $.data;
				if (!(typeof B != "object" || B === null)) {
					if (
						B.type === "bonobo:init" &&
						!C &&
						B.nonce === n &&
						typeof B.apiOrigin == "string" &&
						typeof B.convexUrl == "string" &&
						typeof B.token == "string" &&
						typeof B.tokenExpiresAt == "number" &&
						Number.isFinite(B.tokenExpiresAt) &&
						vT(B.context)
					) {
						((C = !0),
							X(),
							window.removeEventListener("pagehide", X),
							(i = B.apiOrigin),
							(u = B.token),
							(l = B.tokenExpiresAt),
							x(B));
						const P = new FE(B.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let ce = Date.now();
						const se = setInterval(() => {
							const te = Date.now();
							(te - ce >= hT && P.setAuth(q), (ce = te));
						}, dT);
						(P.setAuth(q),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(se), P.close());
								},
								{ once: !0 },
							),
							(h = x0(B.theme)),
							h && A0(h),
							O({
								context: B.context,
								apiOrigin: i,
								getToken: _,
								refreshToken: p,
								fetchJson: R,
								authorize: I,
								convex: P,
								api: oT,
								session: { expiresAt: () => l, fetchJwt: q },
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
						B.nonce === n &&
						B.type === "bonobo:token" &&
						typeof B.requestId == "string" &&
						typeof B.token == "string" &&
						typeof B.tokenExpiresAt == "number" &&
						Number.isFinite(B.tokenExpiresAt)
					) {
						const P = v.get(B.requestId);
						P &&
							(v.delete(B.requestId),
							clearTimeout(P.timeout),
							(u = B.token),
							(l = B.tokenExpiresAt),
							x(B),
							P.resolve(B.token));
					} else if (C && B.nonce === n && B.type === "bonobo:theme") {
						const P = x0(B.theme);
						if (P) {
							((h = P), A0(P));
							for (const ce of m) ce(P);
						}
					} else if (
						C &&
						B.nonce === n &&
						B.type === "bonobo:token-error" &&
						typeof B.requestId == "string" &&
						typeof B.message == "string"
					) {
						const P = v.get(B.requestId);
						P && (v.delete(B.requestId), clearTimeout(P.timeout), P.reject(new Error(B.message)));
					}
				}
			};
		(window.addEventListener("message", M),
			window.addEventListener("pagehide", X, { once: !0 }),
			J(),
			(L = setInterval(J, cT)));
	});
}
var pT = _r((e) => {
		function n(N, V) {
			var Q = N.length;
			N.push(V);
			e: for (; 0 < Q; ) {
				var ve = (Q - 1) >>> 1,
					pe = N[ve];
				if (0 < l(pe, V)) ((N[ve] = V), (N[Q] = pe), (Q = ve));
				else break e;
			}
		}
		function i(N) {
			return N.length === 0 ? null : N[0];
		}
		function u(N) {
			if (N.length === 0) return null;
			var V = N[0],
				Q = N.pop();
			if (Q !== V) {
				N[0] = Q;
				e: for (var ve = 0, pe = N.length, $e = pe >>> 1; ve < $e; ) {
					var k = 2 * (ve + 1) - 1,
						j = N[k],
						le = k + 1,
						de = N[le];
					if (0 > l(j, Q))
						le < pe && 0 > l(de, j) ? ((N[ve] = de), (N[le] = Q), (ve = le)) : ((N[ve] = j), (N[k] = Q), (ve = k));
					else if (le < pe && 0 > l(de, Q)) ((N[ve] = de), (N[le] = Q), (ve = le));
					else break e;
				}
			}
			return V;
		}
		function l(N, V) {
			var Q = N.sortIndex - V.sortIndex;
			return Q !== 0 ? Q : N.id - V.id;
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
			I = !1,
			D = typeof setTimeout == "function" ? setTimeout : null,
			q = typeof clearTimeout == "function" ? clearTimeout : null,
			O = typeof setImmediate < "u" ? setImmediate : null;
		function C(N) {
			for (var V = i(v); V !== null; ) {
				if (V.callback === null) u(v);
				else if (V.startTime <= N) (u(v), (V.sortIndex = V.expirationTime), n(m, V));
				else break;
				V = i(v);
			}
		}
		function L(N) {
			if (((R = !1), C(N), !x))
				if (i(m) !== null) ((x = !0), J || ((J = !0), ce()));
				else {
					var V = i(v);
					V !== null && ne(L, V.startTime - N);
				}
		}
		var J = !1,
			X = -1,
			M = 5,
			$ = -1;
		function B() {
			return I ? !0 : !(e.unstable_now() - $ < M);
		}
		function P() {
			if (((I = !1), J)) {
				var N = e.unstable_now();
				$ = N;
				var V = !0;
				try {
					e: {
						((x = !1), R && ((R = !1), q(X), (X = -1)), (w = !0));
						var Q = p;
						try {
							t: {
								for (C(N), _ = i(m); _ !== null && !(_.expirationTime > N && B()); ) {
									var ve = _.callback;
									if (typeof ve == "function") {
										((_.callback = null), (p = _.priorityLevel));
										var pe = ve(_.expirationTime <= N);
										if (((N = e.unstable_now()), typeof pe == "function")) {
											((_.callback = pe), C(N), (V = !0));
											break t;
										}
										(_ === i(m) && u(m), C(N));
									} else u(m);
									_ = i(m);
								}
								if (_ !== null) V = !0;
								else {
									var $e = i(v);
									($e !== null && ne(L, $e.startTime - N), (V = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (p = Q), (w = !1));
						}
						V = void 0;
					}
				} finally {
					V ? ce() : (J = !1);
				}
			}
		}
		var ce;
		if (typeof O == "function")
			ce = function () {
				O(P);
			};
		else if (typeof MessageChannel < "u") {
			var se = new MessageChannel(),
				te = se.port2;
			((se.port1.onmessage = P),
				(ce = function () {
					te.postMessage(null);
				}));
		} else
			ce = function () {
				D(P, 0);
			};
		function ne(N, V) {
			X = D(function () {
				N(e.unstable_now());
			}, V);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (N) {
				N.callback = null;
			}),
			(e.unstable_forceFrameRate = function (N) {
				0 > N || 125 < N
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (M = 0 < N ? Math.floor(1e3 / N) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return p;
			}),
			(e.unstable_next = function (N) {
				switch (p) {
					case 1:
					case 2:
					case 3:
						var V = 3;
						break;
					default:
						V = p;
				}
				var Q = p;
				p = V;
				try {
					return N();
				} finally {
					p = Q;
				}
			}),
			(e.unstable_requestPaint = function () {
				I = !0;
			}),
			(e.unstable_runWithPriority = function (N, V) {
				switch (N) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						N = 3;
				}
				var Q = p;
				p = N;
				try {
					return V();
				} finally {
					p = Q;
				}
			}),
			(e.unstable_scheduleCallback = function (N, V, Q) {
				var ve = e.unstable_now();
				switch (
					(typeof Q == "object" && Q !== null
						? ((Q = Q.delay), (Q = typeof Q == "number" && 0 < Q ? ve + Q : ve))
						: (Q = ve),
					N)
				) {
					case 1:
						var pe = -1;
						break;
					case 2:
						pe = 250;
						break;
					case 5:
						pe = 1073741823;
						break;
					case 4:
						pe = 1e4;
						break;
					default:
						pe = 5e3;
				}
				return (
					(pe = Q + pe),
					(N = { id: g++, callback: V, priorityLevel: N, startTime: Q, expirationTime: pe, sortIndex: -1 }),
					Q > ve
						? ((N.sortIndex = Q),
							n(v, N),
							i(m) === null && N === i(v) && (R ? (q(X), (X = -1)) : (R = !0), ne(L, Q - ve)))
						: ((N.sortIndex = pe), n(m, N), x || w || ((x = !0), J || ((J = !0), ce()))),
					N
				);
			}),
			(e.unstable_shouldYield = B),
			(e.unstable_wrapCallback = function (N) {
				var V = p;
				return function () {
					var Q = p;
					p = V;
					try {
						return N.apply(this, arguments);
					} finally {
						p = Q;
					}
				};
			}));
	}),
	bT = _r((e, n) => {
		n.exports = pT();
	}),
	_T = _r((e) => {
		var n = mc();
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
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
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
	mb = _r((e, n) => {
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
		(i(), (n.exports = _T()));
	}),
	ST = _r((e) => {
		var n = bT(),
			i = mc(),
			u = mb();
		function l(t) {
			var r = "https://react.dev/errors/" + t;
			if (1 < arguments.length) {
				r += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var a = 2; a < arguments.length; a++) r += "&args[]=" + encodeURIComponent(arguments[a]);
			}
			return (
				"Minified React error #" +
				t +
				"; visit " +
				r +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function o(t) {
			return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
		}
		function f(t) {
			var r = t,
				a = t;
			if (t.alternate) for (; r.return; ) r = r.return;
			else {
				t = r;
				do ((r = t), (r.flags & 4098) !== 0 && (a = r.return), (t = r.return));
				while (t);
			}
			return r.tag === 3 ? a : null;
		}
		function h(t) {
			if (t.tag === 13) {
				var r = t.memoizedState;
				if ((r === null && ((t = t.alternate), t !== null && (r = t.memoizedState)), r !== null)) return r.dehydrated;
			}
			return null;
		}
		function m(t) {
			if (t.tag === 31) {
				var r = t.memoizedState;
				if ((r === null && ((t = t.alternate), t !== null && (r = t.memoizedState)), r !== null)) return r.dehydrated;
			}
			return null;
		}
		function v(t) {
			if (f(t) !== t) throw Error(l(188));
		}
		function g(t) {
			var r = t.alternate;
			if (!r) {
				if (((r = f(t)), r === null)) throw Error(l(188));
				return r !== t ? null : t;
			}
			for (var a = t, s = r; ; ) {
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
			return a.stateNode.current === a ? t : r;
		}
		function _(t) {
			var r = t.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return t;
			for (t = t.child; t !== null; ) {
				if (((r = _(t)), r !== null)) return r;
				t = t.sibling;
			}
			return null;
		}
		var p = Object.assign,
			w = Symbol.for("react.element"),
			x = Symbol.for("react.transitional.element"),
			R = Symbol.for("react.portal"),
			I = Symbol.for("react.fragment"),
			D = Symbol.for("react.strict_mode"),
			q = Symbol.for("react.profiler"),
			O = Symbol.for("react.consumer"),
			C = Symbol.for("react.context"),
			L = Symbol.for("react.forward_ref"),
			J = Symbol.for("react.suspense"),
			X = Symbol.for("react.suspense_list"),
			M = Symbol.for("react.memo"),
			$ = Symbol.for("react.lazy"),
			B = Symbol.for("react.activity"),
			P = Symbol.for("react.memo_cache_sentinel"),
			ce = Symbol.iterator;
		function se(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (ce && t[ce]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var te = Symbol.for("react.client.reference");
		function ne(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === te ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case I:
					return "Fragment";
				case q:
					return "Profiler";
				case D:
					return "StrictMode";
				case J:
					return "Suspense";
				case X:
					return "SuspenseList";
				case B:
					return "Activity";
			}
			if (typeof t == "object")
				switch (t.$$typeof) {
					case R:
						return "Portal";
					case C:
						return t.displayName || "Context";
					case O:
						return (t._context.displayName || "Context") + ".Consumer";
					case L:
						var r = t.render;
						return (
							(t = t.displayName),
							t || ((t = r.displayName || r.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case M:
						return ((r = t.displayName || null), r !== null ? r : ne(t.type) || "Memo");
					case $:
						((r = t._payload), (t = t._init));
						try {
							return ne(t(r));
						} catch {}
				}
			return null;
		}
		var N = Array.isArray,
			V = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			Q = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ve = { pending: !1, data: null, method: null, action: null },
			pe = [],
			$e = -1;
		function k(t) {
			return { current: t };
		}
		function j(t) {
			0 > $e || ((t.current = pe[$e]), (pe[$e] = null), $e--);
		}
		function le(t, r) {
			($e++, (pe[$e] = t.current), (t.current = r));
		}
		var de = k(null),
			he = k(null),
			Se = k(null),
			ye = k(null);
		function Ne(t, r) {
			switch ((le(Se, r), le(he, t), le(de, null), r.nodeType)) {
				case 9:
				case 11:
					t = (t = r.documentElement) && (t = t.namespaceURI) ? Dy(t) : 0;
					break;
				default:
					if (((t = r.tagName), (r = r.namespaceURI))) ((r = Dy(r)), (t = jy(r, t)));
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
			(j(de), le(de, t));
		}
		function Ue() {
			(j(de), j(he), j(Se));
		}
		function Ze(t) {
			t.memoizedState !== null && le(ye, t);
			var r = de.current,
				a = jy(r, t.type);
			r !== a && (le(he, t), le(de, a));
		}
		function st(t) {
			(he.current === t && (j(de), j(he)), ye.current === t && (j(ye), ($s._currentValue = ve)));
		}
		var kn, mn;
		function lt(t) {
			if (kn === void 0)
				try {
					throw Error();
				} catch (a) {
					var r = a.stack.trim().match(/\n( *(at )?)/);
					((kn = (r && r[1]) || ""),
						(mn =
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
				kn +
				t +
				mn
			);
		}
		var be = !1;
		function Re(t, r) {
			if (!t || be) return "";
			be = !0;
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
									} catch (W) {
										var F = W;
									}
									Reflect.construct(t, [], ue);
								} else {
									try {
										ue.call();
									} catch (W) {
										F = W;
									}
									t.call(ue.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (W) {
									F = W;
								}
								(ue = t()) && typeof ue.catch == "function" && ue.catch(function () {});
							}
						} catch (W) {
							if (W && F && typeof W.stack == "string") return [W.stack, F.stack];
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
					var z = y.split(`
`),
						G = T.split(`
`);
					for (c = s = 0; s < z.length && !z[s].includes("DetermineComponentFrameRoot"); ) s++;
					for (; c < G.length && !G[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (s === z.length || c === G.length)
						for (s = z.length - 1, c = G.length - 1; 1 <= s && 0 <= c && z[s] !== G[c]; ) c--;
					for (; 1 <= s && 0 <= c; s--, c--)
						if (z[s] !== G[c]) {
							if (s !== 1 || c !== 1)
								do
									if ((s--, c--, 0 > c || z[s] !== G[c])) {
										var re =
											`
` + z[s].replace(" at new ", " at ");
										return (
											t.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", t.displayName)),
											re
										);
									}
								while (1 <= s && 0 <= c);
							break;
						}
				}
			} finally {
				((be = !1), (Error.prepareStackTrace = a));
			}
			return (a = t ? t.displayName || t.name : "") ? lt(a) : "";
		}
		function He(t, r) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return lt(t.type);
				case 16:
					return lt("Lazy");
				case 13:
					return t.child !== r && r !== null ? lt("Suspense Fallback") : lt("Suspense");
				case 19:
					return lt("SuspenseList");
				case 0:
				case 15:
					return Re(t.type, !1);
				case 11:
					return Re(t.type.render, !1);
				case 1:
					return Re(t.type, !0);
				case 31:
					return lt("Activity");
				default:
					return "";
			}
		}
		function Oe(t) {
			try {
				var r = "",
					a = null;
				do ((r += He(t, a)), (a = t), (t = t.return));
				while (t);
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
		var $t = Object.prototype.hasOwnProperty,
			ft = n.unstable_scheduleCallback,
			fe = n.unstable_cancelCallback,
			ke = n.unstable_shouldYield,
			St = n.unstable_requestPaint,
			ze = n.unstable_now,
			dt = n.unstable_getCurrentPriorityLevel,
			Rt = n.unstable_ImmediatePriority,
			ut = n.unstable_UserBlockingPriority,
			Ot = n.unstable_NormalPriority,
			on = n.unstable_LowPriority,
			an = n.unstable_IdlePriority,
			Gn = n.log,
			Et = n.unstable_setDisableYieldValue,
			vn = null,
			bt = null;
		function En(t) {
			if ((typeof Gn == "function" && Et(t), bt && typeof bt.setStrictMode == "function"))
				try {
					bt.setStrictMode(vn, t);
				} catch {}
		}
		var It = Math.clz32 ? Math.clz32 : ur,
			Fn = Math.log,
			cn = Math.LN2;
		function ur(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((Fn(t) / cn) | 0)) | 0);
		}
		var Tn = 256,
			Pt = 262144,
			sr = 4194304;
		function qn(t) {
			var r = t & 42;
			if (r !== 0) return r;
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
		function zt(t, r, a) {
			var s = t.pendingLanes;
			if (s === 0) return 0;
			var c = 0,
				d = t.suspendedLanes,
				y = t.pingedLanes;
			t = t.warmLanes;
			var T = s & 134217727;
			return (
				T !== 0
					? ((s = T & ~d),
						s !== 0 ? (c = qn(s)) : ((y &= T), y !== 0 ? (c = qn(y)) : a || ((a = T & ~t), a !== 0 && (c = qn(a)))))
					: ((T = s & ~d), T !== 0 ? (c = qn(T)) : y !== 0 ? (c = qn(y)) : a || ((a = s & ~t), a !== 0 && (c = qn(a)))),
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
		function ht(t, r) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
		}
		function wr(t, r) {
			switch (t) {
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
			var t = sr;
			return ((sr <<= 1), (sr & 62914560) === 0 && (sr = 4194304), t);
		}
		function Kt(t) {
			for (var r = [], a = 0; 31 > a; a++) r.push(t);
			return r;
		}
		function zr(t, r) {
			((t.pendingLanes |= r), r !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function Er(t, r, a, s, c, d) {
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
				G = t.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var re = 31 - It(a),
					ue = 1 << re;
				((T[re] = 0), (z[re] = -1));
				var F = G[re];
				if (F !== null)
					for (G[re] = null, re = 0; re < F.length; re++) {
						var W = F[re];
						W !== null && (W.lane &= -536870913);
					}
				a &= ~ue;
			}
			(s !== 0 && Tr(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(y & ~r)));
		}
		function Tr(t, r, a) {
			((t.pendingLanes |= r), (t.suspendedLanes &= ~r));
			var s = 31 - It(r);
			((t.entangledLanes |= r), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930)));
		}
		function Oi(t, r) {
			var a = (t.entangledLanes |= r);
			for (t = t.entanglements; a; ) {
				var s = 31 - It(a),
					c = 1 << s;
				((c & r) | (t[s] & r) && (t[s] |= r), (a &= ~c));
			}
		}
		function zi(t, r) {
			var a = r & -r;
			return ((a = (a & 42) !== 0 ? 1 : Yr(a)), (a & (t.suspendedLanes | r)) !== 0 ? 0 : a);
		}
		function Yr(t) {
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
		function xr(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Xn() {
			var t = Q.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : n0(t.type));
		}
		function Gr(t, r) {
			var a = Q.p;
			try {
				return ((Q.p = t), r());
			} finally {
				Q.p = a;
			}
		}
		var Mn = Math.random().toString(36).slice(2),
			mt = "__reactFiber$" + Mn,
			un = "__reactProps$" + Mn,
			Yt = "__reactContainer$" + Mn,
			In = "__reactEvents$" + Mn,
			Fr = "__reactListeners$" + Mn,
			Di = "__reactHandles$" + Mn,
			Xr = "__reactResources$" + Mn,
			ee = "__reactMarker$" + Mn;
		function ge(t) {
			(delete t[mt], delete t[un], delete t[In], delete t[Fr], delete t[Di]);
		}
		function qe(t) {
			var r = t[mt];
			if (r) return r;
			for (var a = t.parentNode; a; ) {
				if ((r = a[Yt] || a[mt])) {
					if (((a = r.alternate), r.child !== null || (a !== null && a.child !== null)))
						for (t = Vy(t); t !== null; ) {
							if ((a = t[mt])) return a;
							t = Vy(t);
						}
					return r;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function Ge(t) {
			if ((t = t[mt] || t[Yt])) {
				var r = t.tag;
				if (r === 5 || r === 6 || r === 13 || r === 31 || r === 26 || r === 27 || r === 3) return t;
			}
			return null;
		}
		function Qe(t) {
			var r = t.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return t.stateNode;
			throw Error(l(33));
		}
		function Fe(t) {
			var r = t[Xr];
			return (r || (r = t[Xr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), r);
		}
		function rt(t) {
			t[ee] = !0;
		}
		var wt = new Set(),
			Ln = {};
		function xn(t, r) {
			(Un(t, r), Un(t + "Capture", r));
		}
		function Un(t, r) {
			for (Ln[t] = r, t = 0; t < r.length; t++) wt.add(r[t]);
		}
		var El = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			Tl = {},
			xl = {};
		function Al(t) {
			return $t.call(xl, t) ? !0 : $t.call(Tl, t) ? !1 : El.test(t) ? (xl[t] = !0) : ((Tl[t] = !0), !1);
		}
		function ya(t, r, a) {
			if (Al(r))
				if (a === null) t.removeAttribute(r);
				else {
					switch (typeof a) {
						case "undefined":
						case "function":
						case "symbol":
							t.removeAttribute(r);
							return;
						case "boolean":
							var s = r.toLowerCase().slice(0, 5);
							if (s !== "data-" && s !== "aria-") {
								t.removeAttribute(r);
								return;
							}
					}
					t.setAttribute(r, "" + a);
				}
		}
		function ji(t, r, a) {
			if (a === null) t.removeAttribute(r);
			else {
				switch (typeof a) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(r);
						return;
				}
				t.setAttribute(r, "" + a);
			}
		}
		function Ar(t, r, a, s) {
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
				t.setAttributeNS(r, a, "" + s);
			}
		}
		function sn(t) {
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
		function Wa(t) {
			var r = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
		}
		function es(t, r, a) {
			var s = Object.getOwnPropertyDescriptor(t.constructor.prototype, r);
			if (!t.hasOwnProperty(r) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
				var c = s.get,
					d = s.set;
				return (
					Object.defineProperty(t, r, {
						configurable: !0,
						get: function () {
							return c.call(this);
						},
						set: function (y) {
							((a = "" + y), d.call(this, y));
						},
					}),
					Object.defineProperty(t, r, { enumerable: s.enumerable }),
					{
						getValue: function () {
							return a;
						},
						setValue: function (y) {
							a = "" + y;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[r]);
						},
					}
				);
			}
		}
		function qi(t) {
			if (!t._valueTracker) {
				var r = Wa(t) ? "checked" : "value";
				t._valueTracker = es(t, r, "" + t[r]);
			}
		}
		function Rl(t) {
			if (!t) return !1;
			var r = t._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				s = "";
			return (t && (s = Wa(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== a ? (r.setValue(t), !0) : !1);
		}
		function eu(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var $c = /[\n"\\]/g;
		function gn(t) {
			return t.replace($c, function (r) {
				return "\\" + r.charCodeAt(0).toString(16) + " ";
			});
		}
		function An(t, r, a, s, c, d, y, T) {
			((t.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (t.type = y)
					: t.removeAttribute("type"),
				r != null
					? y === "number"
						? ((r === 0 && t.value === "") || t.value != r) && (t.value = "" + sn(r))
						: t.value !== "" + sn(r) && (t.value = "" + sn(r))
					: (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
				r != null ? Ii(t, y, sn(r)) : a != null ? Ii(t, y, sn(a)) : s != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean"
					? (t.name = "" + sn(T))
					: t.removeAttribute("name"));
		}
		function ts(t, r, a, s, c, d, y, T) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				r != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || r != null)) {
					qi(t);
					return;
				}
				((a = a != null ? "" + sn(a) : ""),
					(r = r != null ? "" + sn(r) : a),
					T || r === t.value || (t.value = r),
					(t.defaultValue = r));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(t.checked = T ? t.checked : !!s),
				(t.defaultChecked = !!s),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (t.name = y),
				qi(t));
		}
		function Ii(t, r, a) {
			(r === "number" && eu(t.ownerDocument) === t) || t.defaultValue === "" + a || (t.defaultValue = "" + a);
		}
		function Jr(t, r, a, s) {
			if (((t = t.options), r)) {
				r = {};
				for (var c = 0; c < a.length; c++) r["$" + a[c]] = !0;
				for (a = 0; a < t.length; a++)
					((c = r.hasOwnProperty("$" + t[a].value)),
						t[a].selected !== c && (t[a].selected = c),
						c && s && (t[a].defaultSelected = !0));
			} else {
				for (a = "" + sn(a), r = null, c = 0; c < t.length; c++) {
					if (t[c].value === a) {
						((t[c].selected = !0), s && (t[c].defaultSelected = !0));
						return;
					}
					r !== null || t[c].disabled || (r = t[c]);
				}
				r !== null && (r.selected = !0);
			}
		}
		function Cl(t, r, a) {
			if (r != null && ((r = "" + sn(r)), r !== t.value && (t.value = r), a == null)) {
				t.defaultValue !== r && (t.defaultValue = r);
				return;
			}
			t.defaultValue = a != null ? "" + sn(a) : "";
		}
		function ns(t, r, a, s) {
			if (r == null) {
				if (s != null) {
					if (a != null) throw Error(l(92));
					if (N(s)) {
						if (1 < s.length) throw Error(l(93));
						s = s[0];
					}
					a = s;
				}
				((a ??= ""), (r = a));
			}
			((a = sn(r)),
				(t.defaultValue = a),
				(s = t.textContent),
				s === a && s !== "" && s !== null && (t.value = s),
				qi(t));
		}
		function Li(t, r) {
			if (r) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = r;
					return;
				}
			}
			t.textContent = r;
		}
		var kl = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Ml(t, r, a) {
			var s = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? s
					? t.setProperty(r, "")
					: r === "float"
						? (t.cssFloat = "")
						: (t[r] = "")
				: s
					? t.setProperty(r, a)
					: typeof a != "number" || a === 0 || kl.has(r)
						? r === "float"
							? (t.cssFloat = a)
							: (t[r] = ("" + a).trim())
						: (t[r] = a + "px");
		}
		function rs(t, r, a) {
			if (r != null && typeof r != "object") throw Error(l(62));
			if (((t = t.style), a != null)) {
				for (var s in a)
					!a.hasOwnProperty(s) ||
						(r != null && r.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""));
				for (var c in r) ((s = r[c]), r.hasOwnProperty(c) && a[c] !== s && Ml(t, c, s));
			} else for (var d in r) r.hasOwnProperty(d) && Ml(t, d, r[d]);
		}
		function Dr(t) {
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
		var Bc = new Map([
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
			jr =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Wr(t) {
			return jr.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function lr() {}
		var pa = null;
		function ba(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var ei = null,
			E = null;
		function A(t) {
			var r = Ge(t);
			if (r && (t = r.stateNode)) {
				var a = t[un] || null;
				e: switch (((t = r.stateNode), r.type)) {
					case "input":
						if (
							(An(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(r = a.name),
							a.type === "radio" && r != null)
						) {
							for (a = t; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + gn("" + r) + '"][type="radio"]'), r = 0; r < a.length; r++) {
								var s = a[r];
								if (s !== t && s.form === t.form) {
									var c = s[un] || null;
									if (!c) throw Error(l(90));
									An(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (r = 0; r < a.length; r++) ((s = a[r]), s.form === t.form && Rl(s));
						}
						break e;
					case "textarea":
						Cl(t, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && Jr(t, !!a.multiple, r, !1));
				}
			}
		}
		var H = !1;
		function Y(t, r, a) {
			if (H) return t(r, a);
			H = !0;
			try {
				return t(r);
			} finally {
				if (((H = !1), (ei !== null || E !== null) && (vo(), ei && ((r = ei), (t = E), (E = ei = null), A(r), t))))
					for (r = 0; r < t.length; r++) A(t[r]);
			}
		}
		function oe(t, r) {
			var a = t.stateNode;
			if (a === null) return null;
			var s = a[un] || null;
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
						((t = t.type), (s = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
						(t = !s));
					break e;
				default:
					t = !1;
			}
			if (t) return null;
			if (a && typeof a != "function") throw Error(l(231, r, typeof a));
			return a;
		}
		var me = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Ee = !1;
		if (me)
			try {
				var Me = {};
				(Object.defineProperty(Me, "passive", {
					get: function () {
						Ee = !0;
					},
				}),
					window.addEventListener("test", Me, Me),
					window.removeEventListener("test", Me, Me));
			} catch {
				Ee = !1;
			}
		var Ce = null,
			We = null,
			Ct = null;
		function qr() {
			if (Ct) return Ct;
			var t,
				r = We,
				a = r.length,
				s,
				c = "value" in Ce ? Ce.value : Ce.textContent,
				d = c.length;
			for (t = 0; t < a && r[t] === c[t]; t++);
			var y = a - t;
			for (s = 1; s <= y && r[a - s] === c[d - s]; s++);
			return (Ct = c.slice(t, 1 < s ? 1 - s : void 0));
		}
		function Ui(t) {
			var r = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && r === 13 && (t = 13)) : (t = r),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function _a() {
			return !0;
		}
		function is() {
			return !1;
		}
		function Rn(t) {
			function r(a, s, c, d, y) {
				((this._reactName = a),
					(this._targetInst = c),
					(this.type = s),
					(this.nativeEvent = d),
					(this.target = y),
					(this.currentTarget = null));
				for (var T in t) t.hasOwnProperty(T) && ((a = t[T]), (this[T] = a ? a(d) : d[T]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? _a
						: is),
					(this.isPropagationStopped = is),
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
							(this.isDefaultPrevented = _a));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = _a));
					},
					persist: function () {},
					isPersistent: _a,
				}),
				r
			);
		}
		var Sa = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Nl = Rn(Sa),
			as = p({}, Sa, { view: 0, detail: 0 }),
			xS = Rn(as),
			Vc,
			Zc,
			us,
			Ol = p({}, as, {
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
				getModifierState: Qc,
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
						: (t !== us &&
								(us && t.type === "mousemove"
									? ((Vc = t.screenX - us.screenX), (Zc = t.screenY - us.screenY))
									: (Zc = Vc = 0),
								(us = t)),
							Vc);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : Zc;
				},
			}),
			Um = Rn(Ol),
			AS = Rn(p({}, Ol, { dataTransfer: 0 })),
			Hc = Rn(p({}, as, { relatedTarget: 0 })),
			RS = Rn(p({}, Sa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			CS = Rn(
				p({}, Sa, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			$m = Rn(p({}, Sa, { data: 0 })),
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
		function OS(t) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(t) : (t = NS[t]) ? !!r[t] : !1;
		}
		function Qc() {
			return OS;
		}
		var zS = Rn(
				p({}, as, {
					key: function (t) {
						if (t.key) {
							var r = kS[t.key] || t.key;
							if (r !== "Unidentified") return r;
						}
						return t.type === "keypress"
							? ((t = Ui(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? MS[t.keyCode] || "Unidentified"
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
					getModifierState: Qc,
					charCode: function (t) {
						return t.type === "keypress" ? Ui(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Ui(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Bm = Rn(
				p({}, Ol, {
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
			DS = Rn(
				p({}, as, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: Qc,
				}),
			),
			jS = Rn(p({}, Sa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			qS = Rn(
				p({}, Ol, {
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
			IS = Rn(p({}, Sa, { newState: 0, oldState: 0 })),
			LS = [9, 13, 27, 32],
			Pc = me && "CompositionEvent" in window,
			ss = null;
		me && "documentMode" in document && (ss = document.documentMode);
		var US = me && "TextEvent" in window && !ss,
			Vm = me && (!Pc || (ss && 8 < ss && 11 >= ss)),
			Zm = " ",
			Hm = !1;
		function Qm(t, r) {
			switch (t) {
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
		function Pm(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var tu = !1;
		function $S(t, r) {
			switch (t) {
				case "compositionend":
					return Pm(r);
				case "keypress":
					return r.which !== 32 ? null : ((Hm = !0), Zm);
				case "textInput":
					return ((t = r.data), t === Zm && Hm ? null : t);
				default:
					return null;
			}
		}
		function BS(t, r) {
			if (tu)
				return t === "compositionend" || (!Pc && Qm(t, r)) ? ((t = qr()), (Ct = We = Ce = null), (tu = !1), t) : null;
			switch (t) {
				case "paste":
					return null;
				case "keypress":
					if (!(r.ctrlKey || r.altKey || r.metaKey) || (r.ctrlKey && r.altKey)) {
						if (r.char && 1 < r.char.length) return r.char;
						if (r.which) return String.fromCharCode(r.which);
					}
					return null;
				case "compositionend":
					return Vm && r.locale !== "ko" ? null : r.data;
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
		function Km(t) {
			var r = t && t.nodeName && t.nodeName.toLowerCase();
			return r === "input" ? !!VS[t.type] : r === "textarea";
		}
		function Ym(t, r, a, s) {
			(ei ? (E ? E.push(s) : (E = [s])) : (ei = s),
				(r = wo(r, "onChange")),
				0 < r.length && ((a = new Nl("onChange", "change", null, a, s)), t.push({ event: a, listeners: r })));
		}
		var ls = null,
			os = null;
		function ZS(t) {
			Ry(t, 0);
		}
		function zl(t) {
			if (Rl(Qe(t))) return t;
		}
		function Gm(t, r) {
			if (t === "change") return r;
		}
		var Fm = !1;
		if (me) {
			var Kc;
			if (me) {
				var Yc = "oninput" in document;
				if (!Yc) {
					var Xm = document.createElement("div");
					(Xm.setAttribute("oninput", "return;"), (Yc = typeof Xm.oninput == "function"));
				}
				Kc = Yc;
			} else Kc = !1;
			Fm = Kc && (!document.documentMode || 9 < document.documentMode);
		}
		function Jm() {
			ls && (ls.detachEvent("onpropertychange", Wm), (os = ls = null));
		}
		function Wm(t) {
			if (t.propertyName === "value" && zl(os)) {
				var r = [];
				(Ym(r, os, t, ba(t)), Y(ZS, r));
			}
		}
		function HS(t, r, a) {
			t === "focusin" ? (Jm(), (ls = r), (os = a), ls.attachEvent("onpropertychange", Wm)) : t === "focusout" && Jm();
		}
		function QS(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return zl(os);
		}
		function PS(t, r) {
			if (t === "click") return zl(r);
		}
		function KS(t, r) {
			if (t === "input" || t === "change") return zl(r);
		}
		function YS(t, r) {
			return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
		}
		var Jn = typeof Object.is == "function" ? Object.is : YS;
		function cs(t, r) {
			if (Jn(t, r)) return !0;
			if (typeof t != "object" || t === null || typeof r != "object" || r === null) return !1;
			var a = Object.keys(t),
				s = Object.keys(r);
			if (a.length !== s.length) return !1;
			for (s = 0; s < a.length; s++) {
				var c = a[s];
				if (!$t.call(r, c) || !Jn(t[c], r[c])) return !1;
			}
			return !0;
		}
		function ev(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function tv(t, r) {
			var a = ev(t);
			t = 0;
			for (var s; a; ) {
				if (a.nodeType === 3) {
					if (((s = t + a.textContent.length), t <= r && s >= r)) return { node: a, offset: r - t };
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
				a = ev(a);
			}
		}
		function nv(t, r) {
			return t && r
				? t === r
					? !0
					: t && t.nodeType === 3
						? !1
						: r && r.nodeType === 3
							? nv(t, r.parentNode)
							: "contains" in t
								? t.contains(r)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(r) & 16)
									: !1
				: !1;
		}
		function rv(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var r = eu(t.document); r instanceof t.HTMLIFrameElement; ) {
				try {
					var a = typeof r.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = r.contentWindow;
				else break;
				r = eu(t.document);
			}
			return r;
		}
		function Gc(t) {
			var r = t && t.nodeName && t.nodeName.toLowerCase();
			return (
				r &&
				((r === "input" &&
					(t.type === "text" ||
						t.type === "search" ||
						t.type === "tel" ||
						t.type === "url" ||
						t.type === "password")) ||
					r === "textarea" ||
					t.contentEditable === "true")
			);
		}
		var GS = me && "documentMode" in document && 11 >= document.documentMode,
			nu = null,
			Fc = null,
			fs = null,
			Xc = !1;
		function iv(t, r, a) {
			var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			Xc ||
				nu == null ||
				nu !== eu(s) ||
				((s = nu),
				"selectionStart" in s && Gc(s)
					? (s = { start: s.selectionStart, end: s.selectionEnd })
					: ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
						(s = {
							anchorNode: s.anchorNode,
							anchorOffset: s.anchorOffset,
							focusNode: s.focusNode,
							focusOffset: s.focusOffset,
						})),
				(fs && cs(fs, s)) ||
					((fs = s),
					(s = wo(Fc, "onSelect")),
					0 < s.length &&
						((r = new Nl("onSelect", "select", null, r, a)), t.push({ event: r, listeners: s }), (r.target = nu))));
		}
		function wa(t, r) {
			var a = {};
			return ((a[t.toLowerCase()] = r.toLowerCase()), (a["Webkit" + t] = "webkit" + r), (a["Moz" + t] = "moz" + r), a);
		}
		var ru = {
				animationend: wa("Animation", "AnimationEnd"),
				animationiteration: wa("Animation", "AnimationIteration"),
				animationstart: wa("Animation", "AnimationStart"),
				transitionrun: wa("Transition", "TransitionRun"),
				transitionstart: wa("Transition", "TransitionStart"),
				transitioncancel: wa("Transition", "TransitionCancel"),
				transitionend: wa("Transition", "TransitionEnd"),
			},
			Jc = {},
			av = {};
		me &&
			((av = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete ru.animationend.animation, delete ru.animationiteration.animation, delete ru.animationstart.animation),
			"TransitionEvent" in window || delete ru.transitionend.transition);
		function Ea(t) {
			if (Jc[t]) return Jc[t];
			if (!ru[t]) return t;
			var r = ru[t],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in av) return (Jc[t] = r[a]);
			return t;
		}
		var uv = Ea("animationend"),
			sv = Ea("animationiteration"),
			lv = Ea("animationstart"),
			FS = Ea("transitionrun"),
			XS = Ea("transitionstart"),
			JS = Ea("transitioncancel"),
			ov = Ea("transitionend"),
			cv = new Map(),
			Wc =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		Wc.push("scrollEnd");
		function Rr(t, r) {
			(cv.set(t, r), xn(r, [t]));
		}
		var Dl =
				typeof reportError == "function"
					? reportError
					: function (t) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var r = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
									error: t,
								});
								if (!window.dispatchEvent(r)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", t);
								return;
							}
							console.error(t);
						},
			or = [],
			iu = 0,
			ef = 0;
		function jl() {
			for (var t = iu, r = (ef = iu = 0); r < t; ) {
				var a = or[r];
				or[r++] = null;
				var s = or[r];
				or[r++] = null;
				var c = or[r];
				or[r++] = null;
				var d = or[r];
				if (((or[r++] = null), s !== null && c !== null)) {
					var y = s.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (s.pending = c));
				}
				d !== 0 && fv(a, c, d);
			}
		}
		function ql(t, r, a, s) {
			((or[iu++] = t),
				(or[iu++] = r),
				(or[iu++] = a),
				(or[iu++] = s),
				(ef |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function tf(t, r, a, s) {
			return (ql(t, r, a, s), Il(t));
		}
		function Ta(t, r) {
			return (ql(t, null, null, r), Il(t));
		}
		function fv(t, r, a) {
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
						r !== null &&
						((c = 31 - It(a)),
						(t = d.hiddenUpdates),
						(s = t[c]),
						s === null ? (t[c] = [r]) : s.push(r),
						(r.lane = a | 536870912)),
					d)
				: null;
		}
		function Il(t) {
			if (50 < zs) throw ((zs = 0), (fd = null), Error(l(185)));
			for (var r = t.return; r !== null; ) ((t = r), (r = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var au = {};
		function WS(t, r, a, s) {
			((this.tag = t),
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
		function Wn(t, r, a, s) {
			return new WS(t, r, a, s);
		}
		function nf(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function ti(t, r) {
			var a = t.alternate;
			return (
				a === null
					? ((a = Wn(t.tag, r, t.key, t.mode)),
						(a.elementType = t.elementType),
						(a.type = t.type),
						(a.stateNode = t.stateNode),
						(a.alternate = t),
						(t.alternate = a))
					: ((a.pendingProps = r), (a.type = t.type), (a.flags = 0), (a.subtreeFlags = 0), (a.deletions = null)),
				(a.flags = t.flags & 65011712),
				(a.childLanes = t.childLanes),
				(a.lanes = t.lanes),
				(a.child = t.child),
				(a.memoizedProps = t.memoizedProps),
				(a.memoizedState = t.memoizedState),
				(a.updateQueue = t.updateQueue),
				(r = t.dependencies),
				(a.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
				(a.sibling = t.sibling),
				(a.index = t.index),
				(a.ref = t.ref),
				(a.refCleanup = t.refCleanup),
				a
			);
		}
		function dv(t, r) {
			t.flags &= 65011714;
			var a = t.alternate;
			return (
				a === null
					? ((t.childLanes = 0),
						(t.lanes = r),
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
						(r = a.dependencies),
						(t.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext })),
				t
			);
		}
		function Ll(t, r, a, s, c, d) {
			var y = 0;
			if (((s = t), typeof t == "function")) nf(t) && (y = 1);
			else if (typeof t == "string")
				y = a1(t, a, de.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case B:
						return ((t = Wn(31, a, r, c)), (t.elementType = B), (t.lanes = d), t);
					case I:
						return xa(a.children, c, d, r);
					case D:
						((y = 8), (c |= 24));
						break;
					case q:
						return ((t = Wn(12, a, r, c | 2)), (t.elementType = q), (t.lanes = d), t);
					case J:
						return ((t = Wn(13, a, r, c)), (t.elementType = J), (t.lanes = d), t);
					case X:
						return ((t = Wn(19, a, r, c)), (t.elementType = X), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case C:
									y = 10;
									break e;
								case O:
									y = 9;
									break e;
								case L:
									y = 11;
									break e;
								case M:
									y = 14;
									break e;
								case $:
									((y = 16), (s = null));
									break e;
							}
						((y = 29), (a = Error(l(130, t === null ? "null" : typeof t, ""))), (s = null));
				}
			return ((r = Wn(y, a, r, c)), (r.elementType = t), (r.type = s), (r.lanes = d), r);
		}
		function xa(t, r, a, s) {
			return ((t = Wn(7, t, s, r)), (t.lanes = a), t);
		}
		function rf(t, r, a) {
			return ((t = Wn(6, t, null, r)), (t.lanes = a), t);
		}
		function hv(t) {
			var r = Wn(18, null, null, 0);
			return ((r.stateNode = t), r);
		}
		function af(t, r, a) {
			return (
				(r = Wn(4, t.children !== null ? t.children : [], t.key, r)),
				(r.lanes = a),
				(r.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				r
			);
		}
		var mv = new WeakMap();
		function cr(t, r) {
			if (typeof t == "object" && t !== null) {
				var a = mv.get(t);
				return a !== void 0 ? a : ((r = { value: t, source: r, stack: Oe(r) }), mv.set(t, r), r);
			}
			return { value: t, source: r, stack: Oe(r) };
		}
		var uu = [],
			su = 0,
			Ul = null,
			ds = 0,
			fr = [],
			dr = 0,
			$i = null,
			Ir = 1,
			Lr = "";
		function ni(t, r) {
			((uu[su++] = ds), (uu[su++] = Ul), (Ul = t), (ds = r));
		}
		function vv(t, r, a) {
			((fr[dr++] = Ir), (fr[dr++] = Lr), (fr[dr++] = $i), ($i = t));
			var s = Ir;
			t = Lr;
			var c = 32 - It(s) - 1;
			((s &= ~(1 << c)), (a += 1));
			var d = 32 - It(r) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (s & ((1 << y) - 1)).toString(32)),
					(s >>= y),
					(c -= y),
					(Ir = (1 << (32 - It(r) + c)) | (a << c) | s),
					(Lr = d + t));
			} else ((Ir = (1 << d) | (a << c) | s), (Lr = t));
		}
		function uf(t) {
			t.return !== null && (ni(t, 1), vv(t, 1, 0));
		}
		function sf(t) {
			for (; t === Ul; ) ((Ul = uu[--su]), (uu[su] = null), (ds = uu[--su]), (uu[su] = null));
			for (; t === $i; )
				(($i = fr[--dr]), (fr[dr] = null), (Lr = fr[--dr]), (fr[dr] = null), (Ir = fr[--dr]), (fr[dr] = null));
		}
		function gv(t, r) {
			((fr[dr++] = Ir), (fr[dr++] = Lr), (fr[dr++] = $i), (Ir = r.id), (Lr = r.overflow), ($i = t));
		}
		var yn = null,
			Tt = null,
			Xe = !1,
			Bi = null,
			hr = !1,
			lf = Error(l(519));
		function Vi(t) {
			throw (
				hs(cr(Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				lf
			);
		}
		function yv(t) {
			var r = t.stateNode,
				a = t.type,
				s = t.memoizedProps;
			switch (((r[mt] = t), (r[un] = s), a)) {
				case "dialog":
					(Ve("cancel", r), Ve("close", r));
					break;
				case "iframe":
				case "object":
				case "embed":
					Ve("load", r);
					break;
				case "video":
				case "audio":
					for (a = 0; a < js.length; a++) Ve(js[a], r);
					break;
				case "source":
					Ve("error", r);
					break;
				case "img":
				case "image":
				case "link":
					(Ve("error", r), Ve("load", r));
					break;
				case "details":
					Ve("toggle", r);
					break;
				case "input":
					(Ve("invalid", r), ts(r, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					Ve("invalid", r);
					break;
				case "textarea":
					(Ve("invalid", r), ns(r, s.value, s.defaultValue, s.children));
			}
			((a = s.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				s.suppressHydrationWarning === !0 ||
				Oy(r.textContent, a)
					? (s.popover != null && (Ve("beforetoggle", r), Ve("toggle", r)),
						s.onScroll != null && Ve("scroll", r),
						s.onScrollEnd != null && Ve("scrollend", r),
						s.onClick != null && (r.onclick = lr),
						(r = !0))
					: (r = !1),
				r || Vi(t, !0));
		}
		function pv(t) {
			for (yn = t.return; yn; )
				switch (yn.tag) {
					case 5:
					case 31:
					case 13:
						hr = !1;
						return;
					case 27:
					case 3:
						hr = !0;
						return;
					default:
						yn = yn.return;
				}
		}
		function lu(t) {
			if (t !== yn) return !1;
			if (!Xe) return (pv(t), (Xe = !0), !1);
			var r = t.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || xd(t.type, t.memoizedProps))),
					(a = !a)),
				a && Tt && Vi(t),
				pv(t),
				r === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				Tt = By(t);
			} else if (r === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				Tt = By(t);
			} else
				r === 27
					? ((r = Tt), ea(t.type) ? ((t = Md), (Md = null), (Tt = t)) : (Tt = r))
					: (Tt = yn ? gr(t.stateNode.nextSibling) : null);
			return !0;
		}
		function Aa() {
			((Tt = yn = null), (Xe = !1));
		}
		function of() {
			var t = Bi;
			return (t !== null && (Zn === null ? (Zn = t) : Zn.push.apply(Zn, t), (Bi = null)), t);
		}
		function hs(t) {
			Bi === null ? (Bi = [t]) : Bi.push(t);
		}
		var cf = k(null),
			Ra = null,
			ri = null;
		function Zi(t, r, a) {
			(le(cf, r._currentValue), (r._currentValue = a));
		}
		function ii(t) {
			((t._currentValue = cf.current), j(cf));
		}
		function ff(t, r, a) {
			for (; t !== null; ) {
				var s = t.alternate;
				if (
					((t.childLanes & r) !== r
						? ((t.childLanes |= r), s !== null && (s.childLanes |= r))
						: s !== null && (s.childLanes & r) !== r && (s.childLanes |= r),
					t === a)
				)
					break;
				t = t.return;
			}
		}
		function df(t, r, a, s) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var T = d;
						d = c;
						for (var z = 0; z < r.length; z++)
							if (T.context === r[z]) {
								((d.lanes |= a), (T = d.alternate), T !== null && (T.lanes |= a), ff(d.return, a, t), s || (y = null));
								break e;
							}
						d = T.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(l(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), ff(y, a, t), (y = null));
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
		function ou(t, r, a, s) {
			t = null;
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
						Jn(c.pendingProps.value, y.value) || (t !== null ? t.push(T) : (t = [T]));
					}
				} else if (c === ye.current) {
					if (((y = c.alternate), y === null)) throw Error(l(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push($s) : (t = [$s]));
				}
				c = c.return;
			}
			(t !== null && df(r, t, a, s), (r.flags |= 262144));
		}
		function $l(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!Jn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function Ca(t) {
			((Ra = t), (ri = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function pn(t) {
			return bv(Ra, t);
		}
		function Bl(t, r) {
			return (Ra === null && Ca(t), bv(t, r));
		}
		function bv(t, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), ri === null)) {
				if (t === null) throw Error(l(308));
				((ri = r), (t.dependencies = { lanes: 0, firstContext: r }), (t.flags |= 524288));
			} else ri = ri.next = r;
			return a;
		}
		var ew =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var t = [],
								r = (this.signal = {
									aborted: !1,
									addEventListener: function (a, s) {
										t.push(s);
									},
								});
							this.abort = function () {
								((r.aborted = !0),
									t.forEach(function (a) {
										return a();
									}));
							};
						},
			tw = n.unstable_scheduleCallback,
			nw = n.unstable_NormalPriority,
			Gt = { $$typeof: C, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function hf() {
			return { controller: new ew(), data: new Map(), refCount: 0 };
		}
		function ms(t) {
			(t.refCount--,
				t.refCount === 0 &&
					tw(nw, function () {
						t.controller.abort();
					}));
		}
		var vs = null,
			mf = 0,
			cu = 0,
			fu = null;
		function rw(t, r) {
			if (vs === null) {
				var a = (vs = []);
				((mf = 0),
					(cu = yd()),
					(fu = {
						status: "pending",
						value: void 0,
						then: function (s) {
							a.push(s);
						},
					}));
			}
			return (mf++, r.then(_v, _v), r);
		}
		function _v() {
			if (--mf === 0 && vs !== null) {
				fu !== null && (fu.status = "fulfilled");
				var t = vs;
				((vs = null), (cu = 0), (fu = null));
				for (var r = 0; r < t.length; r++) (0, t[r])();
			}
		}
		function iw(t, r) {
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
		var Sv = V.S;
		V.S = function (t, r) {
			((ty = ze()),
				typeof r == "object" && r !== null && typeof r.then == "function" && rw(t, r),
				Sv !== null && Sv(t, r));
		};
		var ka = k(null);
		function vf() {
			var t = ka.current;
			return t !== null ? t : _t.pooledCache;
		}
		function Vl(t, r) {
			r === null ? le(ka, ka.current) : le(ka, r.pool);
		}
		function wv() {
			var t = vf();
			return t === null ? null : { parent: Gt._currentValue, pool: t };
		}
		var du = Error(l(460)),
			gf = Error(l(474)),
			Zl = Error(l(542)),
			Hl = { then: function () {} };
		function Ev(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function Tv(t, r, a) {
			switch (((a = t[a]), a === void 0 ? t.push(r) : a !== r && (r.then(lr, lr), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((t = r.reason), Av(t), t);
				default:
					if (typeof r.status == "string") r.then(lr, lr);
					else {
						if (((t = _t), t !== null && 100 < t.shellSuspendCounter)) throw Error(l(482));
						((t = r),
							(t.status = "pending"),
							t.then(
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
							throw ((t = r.reason), Av(t), t);
					}
					throw ((Na = r), du);
			}
		}
		function Ma(t) {
			try {
				var r = t._init;
				return r(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((Na = a), du) : a;
			}
		}
		var Na = null;
		function xv() {
			if (Na === null) throw Error(l(459));
			var t = Na;
			return ((Na = null), t);
		}
		function Av(t) {
			if (t === du || t === Zl) throw Error(l(483));
		}
		var hu = null,
			gs = 0;
		function Ql(t) {
			var r = gs;
			return ((gs += 1), hu === null && (hu = []), Tv(hu, t, r));
		}
		function ys(t, r) {
			((r = r.props.ref), (t.ref = r !== void 0 ? r : null));
		}
		function Pl(t, r) {
			throw r.$$typeof === w
				? Error(l(525))
				: ((t = Object.prototype.toString.call(r)),
					Error(l(31, t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t)));
		}
		function Rv(t) {
			function r(Z, U) {
				if (t) {
					var K = Z.deletions;
					K === null ? ((Z.deletions = [U]), (Z.flags |= 16)) : K.push(U);
				}
			}
			function a(Z, U) {
				if (!t) return null;
				for (; U !== null; ) (r(Z, U), (U = U.sibling));
				return null;
			}
			function s(Z) {
				for (var U = new Map(); Z !== null; ) (Z.key !== null ? U.set(Z.key, Z) : U.set(Z.index, Z), (Z = Z.sibling));
				return U;
			}
			function c(Z, U) {
				return ((Z = ti(Z, U)), (Z.index = 0), (Z.sibling = null), Z);
			}
			function d(Z, U, K) {
				return (
					(Z.index = K),
					t
						? ((K = Z.alternate),
							K !== null ? ((K = K.index), K < U ? ((Z.flags |= 67108866), U) : K) : ((Z.flags |= 67108866), U))
						: ((Z.flags |= 1048576), U)
				);
			}
			function y(Z) {
				return (t && Z.alternate === null && (Z.flags |= 67108866), Z);
			}
			function T(Z, U, K, ie) {
				return U === null || U.tag !== 6
					? ((U = rf(K, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, K)), (U.return = Z), U);
			}
			function z(Z, U, K, ie) {
				var xe = K.type;
				return xe === I
					? re(Z, U, K.props.children, ie, K.key)
					: U !== null &&
						  (U.elementType === xe || (typeof xe == "object" && xe !== null && xe.$$typeof === $ && Ma(xe) === U.type))
						? ((U = c(U, K.props)), ys(U, K), (U.return = Z), U)
						: ((U = Ll(K.type, K.key, K.props, null, Z.mode, ie)), ys(U, K), (U.return = Z), U);
			}
			function G(Z, U, K, ie) {
				return U === null ||
					U.tag !== 4 ||
					U.stateNode.containerInfo !== K.containerInfo ||
					U.stateNode.implementation !== K.implementation
					? ((U = af(K, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, K.children || [])), (U.return = Z), U);
			}
			function re(Z, U, K, ie, xe) {
				return U === null || U.tag !== 7
					? ((U = xa(K, Z.mode, ie, xe)), (U.return = Z), U)
					: ((U = c(U, K)), (U.return = Z), U);
			}
			function ue(Z, U, K) {
				if ((typeof U == "string" && U !== "") || typeof U == "number" || typeof U == "bigint")
					return ((U = rf("" + U, Z.mode, K)), (U.return = Z), U);
				if (typeof U == "object" && U !== null) {
					switch (U.$$typeof) {
						case x:
							return ((K = Ll(U.type, U.key, U.props, null, Z.mode, K)), ys(K, U), (K.return = Z), K);
						case R:
							return ((U = af(U, Z.mode, K)), (U.return = Z), U);
						case $:
							return ((U = Ma(U)), ue(Z, U, K));
					}
					if (N(U) || se(U)) return ((U = xa(U, Z.mode, K, null)), (U.return = Z), U);
					if (typeof U.then == "function") return ue(Z, Ql(U), K);
					if (U.$$typeof === C) return ue(Z, Bl(Z, U), K);
					Pl(Z, U);
				}
				return null;
			}
			function F(Z, U, K, ie) {
				var xe = U !== null ? U.key : null;
				if ((typeof K == "string" && K !== "") || typeof K == "number" || typeof K == "bigint")
					return xe !== null ? null : T(Z, U, "" + K, ie);
				if (typeof K == "object" && K !== null) {
					switch (K.$$typeof) {
						case x:
							return K.key === xe ? z(Z, U, K, ie) : null;
						case R:
							return K.key === xe ? G(Z, U, K, ie) : null;
						case $:
							return ((K = Ma(K)), F(Z, U, K, ie));
					}
					if (N(K) || se(K)) return xe !== null ? null : re(Z, U, K, ie, null);
					if (typeof K.then == "function") return F(Z, U, Ql(K), ie);
					if (K.$$typeof === C) return F(Z, U, Bl(Z, K), ie);
					Pl(Z, K);
				}
				return null;
			}
			function W(Z, U, K, ie, xe) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(K) || null), T(U, Z, "" + ie, xe));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case x:
							return ((Z = Z.get(ie.key === null ? K : ie.key) || null), z(U, Z, ie, xe));
						case R:
							return ((Z = Z.get(ie.key === null ? K : ie.key) || null), G(U, Z, ie, xe));
						case $:
							return ((ie = Ma(ie)), W(Z, U, K, ie, xe));
					}
					if (N(ie) || se(ie)) return ((Z = Z.get(K) || null), re(U, Z, ie, xe, null));
					if (typeof ie.then == "function") return W(Z, U, K, Ql(ie), xe);
					if (ie.$$typeof === C) return W(Z, U, K, Bl(U, ie), xe);
					Pl(U, ie);
				}
				return null;
			}
			function _e(Z, U, K, ie) {
				for (var xe = null, tt = null, we = U, Le = (U = 0), Ke = null; we !== null && Le < K.length; Le++) {
					we.index > Le ? ((Ke = we), (we = null)) : (Ke = we.sibling);
					var nt = F(Z, we, K[Le], ie);
					if (nt === null) {
						we === null && (we = Ke);
						break;
					}
					(t && we && nt.alternate === null && r(Z, we),
						(U = d(nt, U, Le)),
						tt === null ? (xe = nt) : (tt.sibling = nt),
						(tt = nt),
						(we = Ke));
				}
				if (Le === K.length) return (a(Z, we), Xe && ni(Z, Le), xe);
				if (we === null) {
					for (; Le < K.length; Le++)
						((we = ue(Z, K[Le], ie)),
							we !== null && ((U = d(we, U, Le)), tt === null ? (xe = we) : (tt.sibling = we), (tt = we)));
					return (Xe && ni(Z, Le), xe);
				}
				for (we = s(we); Le < K.length; Le++)
					((Ke = W(we, Z, Le, K[Le], ie)),
						Ke !== null &&
							(t && Ke.alternate !== null && we.delete(Ke.key === null ? Le : Ke.key),
							(U = d(Ke, U, Le)),
							tt === null ? (xe = Ke) : (tt.sibling = Ke),
							(tt = Ke)));
				return (
					t &&
						we.forEach(function (aa) {
							return r(Z, aa);
						}),
					Xe && ni(Z, Le),
					xe
				);
			}
			function Ae(Z, U, K, ie) {
				if (K == null) throw Error(l(151));
				for (
					var xe = null, tt = null, we = U, Le = (U = 0), Ke = null, nt = K.next();
					we !== null && !nt.done;
					Le++, nt = K.next()
				) {
					we.index > Le ? ((Ke = we), (we = null)) : (Ke = we.sibling);
					var aa = F(Z, we, nt.value, ie);
					if (aa === null) {
						we === null && (we = Ke);
						break;
					}
					(t && we && aa.alternate === null && r(Z, we),
						(U = d(aa, U, Le)),
						tt === null ? (xe = aa) : (tt.sibling = aa),
						(tt = aa),
						(we = Ke));
				}
				if (nt.done) return (a(Z, we), Xe && ni(Z, Le), xe);
				if (we === null) {
					for (; !nt.done; Le++, nt = K.next())
						((nt = ue(Z, nt.value, ie)),
							nt !== null && ((U = d(nt, U, Le)), tt === null ? (xe = nt) : (tt.sibling = nt), (tt = nt)));
					return (Xe && ni(Z, Le), xe);
				}
				for (we = s(we); !nt.done; Le++, nt = K.next())
					((nt = W(we, Z, Le, nt.value, ie)),
						nt !== null &&
							(t && nt.alternate !== null && we.delete(nt.key === null ? Le : nt.key),
							(U = d(nt, U, Le)),
							tt === null ? (xe = nt) : (tt.sibling = nt),
							(tt = nt)));
				return (
					t &&
						we.forEach(function (b1) {
							return r(Z, b1);
						}),
					Xe && ni(Z, Le),
					xe
				);
			}
			function yt(Z, U, K, ie) {
				if (
					(typeof K == "object" && K !== null && K.type === I && K.key === null && (K = K.props.children),
					typeof K == "object" && K !== null)
				) {
					switch (K.$$typeof) {
						case x:
							e: {
								for (var xe = K.key; U !== null; ) {
									if (U.key === xe) {
										if (((xe = K.type), xe === I)) {
											if (U.tag === 7) {
												(a(Z, U.sibling), (ie = c(U, K.props.children)), (ie.return = Z), (Z = ie));
												break e;
											}
										} else if (
											U.elementType === xe ||
											(typeof xe == "object" && xe !== null && xe.$$typeof === $ && Ma(xe) === U.type)
										) {
											(a(Z, U.sibling), (ie = c(U, K.props)), ys(ie, K), (ie.return = Z), (Z = ie));
											break e;
										}
										a(Z, U);
										break;
									} else r(Z, U);
									U = U.sibling;
								}
								K.type === I
									? ((ie = xa(K.props.children, Z.mode, ie, K.key)), (ie.return = Z), (Z = ie))
									: ((ie = Ll(K.type, K.key, K.props, null, Z.mode, ie)), ys(ie, K), (ie.return = Z), (Z = ie));
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
											(a(Z, U.sibling), (ie = c(U, K.children || [])), (ie.return = Z), (Z = ie));
											break e;
										} else {
											a(Z, U);
											break;
										}
									else r(Z, U);
									U = U.sibling;
								}
								((ie = af(K, Z.mode, ie)), (ie.return = Z), (Z = ie));
							}
							return y(Z);
						case $:
							return ((K = Ma(K)), yt(Z, U, K, ie));
					}
					if (N(K)) return _e(Z, U, K, ie);
					if (se(K)) {
						if (((xe = se(K)), typeof xe != "function")) throw Error(l(150));
						return ((K = xe.call(K)), Ae(Z, U, K, ie));
					}
					if (typeof K.then == "function") return yt(Z, U, Ql(K), ie);
					if (K.$$typeof === C) return yt(Z, U, Bl(Z, K), ie);
					Pl(Z, K);
				}
				return (typeof K == "string" && K !== "") || typeof K == "number" || typeof K == "bigint"
					? ((K = "" + K),
						U !== null && U.tag === 6
							? (a(Z, U.sibling), (ie = c(U, K)), (ie.return = Z), (Z = ie))
							: (a(Z, U), (ie = rf(K, Z.mode, ie)), (ie.return = Z), (Z = ie)),
						y(Z))
					: a(Z, U);
			}
			return function (Z, U, K, ie) {
				try {
					gs = 0;
					var xe = yt(Z, U, K, ie);
					return ((hu = null), xe);
				} catch (we) {
					if (we === du || we === Zl) throw we;
					var tt = Wn(29, we, null, Z.mode);
					return ((tt.lanes = ie), (tt.return = Z), tt);
				}
			};
		}
		var Oa = Rv(!0),
			Cv = Rv(!1),
			Hi = !1;
		function yf(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function pf(t, r) {
			((t = t.updateQueue),
				r.updateQueue === t &&
					(r.updateQueue = {
						baseState: t.baseState,
						firstBaseUpdate: t.firstBaseUpdate,
						lastBaseUpdate: t.lastBaseUpdate,
						shared: t.shared,
						callbacks: null,
					}));
		}
		function za(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function Da(t, r, a) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (it & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(s.pending = r),
					(r = Il(t)),
					fv(t, null, a),
					r
				);
			}
			return (ql(t, s, r, a), Il(t));
		}
		function ps(t, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var s = r.lanes;
				((s &= t.pendingLanes), (a |= s), (r.lanes = a), Oi(t, a));
			}
		}
		function bf(t, r) {
			var a = t.updateQueue,
				s = t.alternate;
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
					(t.updateQueue = a));
				return;
			}
			((t = a.lastBaseUpdate), t === null ? (a.firstBaseUpdate = r) : (t.next = r), (a.lastBaseUpdate = r));
		}
		var _f = !1;
		function bs() {
			if (_f) {
				var t = fu;
				if (t !== null) throw t;
			}
		}
		function _s(t, r, a, s) {
			_f = !1;
			var c = t.updateQueue;
			Hi = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				T = c.shared.pending;
			if (T !== null) {
				c.shared.pending = null;
				var z = T,
					G = z.next;
				((z.next = null), y === null ? (d = G) : (y.next = G), (y = z));
				var re = t.alternate;
				re !== null &&
					((re = re.updateQueue),
					(T = re.lastBaseUpdate),
					T !== y && (T === null ? (re.firstBaseUpdate = G) : (T.next = G), (re.lastBaseUpdate = z)));
			}
			if (d !== null) {
				var ue = c.baseState;
				((y = 0), (re = G = z = null), (T = d));
				do {
					var F = T.lane & -536870913,
						W = F !== T.lane;
					if (W ? (Pe & F) === F : (s & F) === F) {
						(F !== 0 && F === cu && (_f = !0),
							re !== null && (re = re.next = { lane: 0, tag: T.tag, payload: T.payload, callback: null, next: null }));
						e: {
							var _e = t,
								Ae = T;
							F = r;
							var yt = a;
							switch (Ae.tag) {
								case 1:
									if (((_e = Ae.payload), typeof _e == "function")) {
										ue = _e.call(yt, ue, F);
										break e;
									}
									ue = _e;
									break e;
								case 3:
									_e.flags = (_e.flags & -65537) | 128;
								case 0:
									if (((_e = Ae.payload), (F = typeof _e == "function" ? _e.call(yt, ue, F) : _e), F == null)) break e;
									ue = p({}, ue, F);
									break e;
								case 2:
									Hi = !0;
							}
						}
						((F = T.callback),
							F !== null &&
								((t.flags |= 64),
								W && (t.flags |= 8192),
								(W = c.callbacks),
								W === null ? (c.callbacks = [F]) : W.push(F)));
					} else
						((W = { lane: F, tag: T.tag, payload: T.payload, callback: T.callback, next: null }),
							re === null ? ((G = re = W), (z = ue)) : (re = re.next = W),
							(y |= F));
					if (((T = T.next), T === null)) {
						if (((T = c.shared.pending), T === null)) break;
						((W = T), (T = W.next), (W.next = null), (c.lastBaseUpdate = W), (c.shared.pending = null));
					}
				} while (!0);
				(re === null && (z = ue),
					(c.baseState = z),
					(c.firstBaseUpdate = G),
					(c.lastBaseUpdate = re),
					d === null && (c.shared.lanes = 0),
					(Gi |= y),
					(t.lanes = y),
					(t.memoizedState = ue));
			}
		}
		function kv(t, r) {
			if (typeof t != "function") throw Error(l(191, t));
			t.call(r);
		}
		function Mv(t, r) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) kv(a[t], r);
		}
		var mu = k(null),
			Kl = k(0);
		function Nv(t, r) {
			((t = hi), le(Kl, t), le(mu, r), (hi = t | r.baseLanes));
		}
		function Sf() {
			(le(Kl, hi), le(mu, mu.current));
		}
		function wf() {
			((hi = Kl.current), j(mu), j(Kl));
		}
		var er = k(null),
			mr = null;
		function Qi(t) {
			var r = t.alternate;
			(le(Bt, Bt.current & 1),
				le(er, t),
				mr === null && (r === null || mu.current !== null || r.memoizedState !== null) && (mr = t));
		}
		function Ef(t) {
			(le(Bt, Bt.current), le(er, t), mr === null && (mr = t));
		}
		function Ov(t) {
			t.tag === 22 ? (le(Bt, Bt.current), le(er, t), mr === null && (mr = t)) : Pi(t);
		}
		function Pi() {
			(le(Bt, Bt.current), le(er, er.current));
		}
		function tr(t) {
			(j(er), mr === t && (mr = null), j(Bt));
		}
		var Bt = k(0);
		function Yl(t) {
			for (var r = t; r !== null; ) {
				if (r.tag === 13) {
					var a = r.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Cd(a) || kd(a))) return r;
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
				if (r === t) break;
				for (; r.sibling === null; ) {
					if (r.return === null || r.return === t) return null;
					r = r.return;
				}
				((r.sibling.return = r.return), (r = r.sibling));
			}
			return null;
		}
		var ai = 0,
			Ie = null,
			vt = null,
			Ft = null,
			Gl = !1,
			vu = !1,
			ja = !1,
			Fl = 0,
			Ss = 0,
			gu = null,
			aw = 0;
		function Lt() {
			throw Error(l(321));
		}
		function Tf(t, r) {
			if (r === null) return !1;
			for (var a = 0; a < r.length && a < t.length; a++) if (!Jn(t[a], r[a])) return !1;
			return !0;
		}
		function xf(t, r, a, s, c, d) {
			return (
				(ai = d),
				(Ie = r),
				(r.memoizedState = null),
				(r.updateQueue = null),
				(r.lanes = 0),
				(V.H = t === null || t.memoizedState === null ? vg : $f),
				(ja = !1),
				(d = a(s, c)),
				(ja = !1),
				vu && (d = Dv(r, a, s, c)),
				zv(t),
				d
			);
		}
		function zv(t) {
			V.H = Ts;
			var r = vt !== null && vt.next !== null;
			if (((ai = 0), (Ft = vt = Ie = null), (Gl = !1), (Ss = 0), (gu = null), r)) throw Error(l(300));
			t === null || Xt || ((t = t.dependencies), t !== null && $l(t) && (Xt = !0));
		}
		function Dv(t, r, a, s) {
			Ie = t;
			var c = 0;
			do {
				if ((vu && (gu = null), (Ss = 0), (vu = !1), 25 <= c)) throw Error(l(301));
				if (((c += 1), (Ft = vt = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((V.H = gg), (d = r(a, s)));
			} while (vu);
			return d;
		}
		function uw() {
			var t = V.H,
				r = t.useState()[0];
			return (
				(r = typeof r.then == "function" ? ws(r) : r),
				(t = t.useState()[0]),
				(vt !== null ? vt.memoizedState : null) !== t && (Ie.flags |= 1024),
				r
			);
		}
		function Af() {
			var t = Fl !== 0;
			return ((Fl = 0), t);
		}
		function Rf(t, r, a) {
			((r.updateQueue = t.updateQueue), (r.flags &= -2053), (t.lanes &= ~a));
		}
		function Cf(t) {
			if (Gl) {
				for (t = t.memoizedState; t !== null; ) {
					var r = t.queue;
					(r !== null && (r.pending = null), (t = t.next));
				}
				Gl = !1;
			}
			((ai = 0), (Ft = vt = Ie = null), (vu = !1), (Ss = Fl = 0), (gu = null));
		}
		function Nn() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (Ft === null ? (Ie.memoizedState = Ft = t) : (Ft = Ft.next = t), Ft);
		}
		function Vt() {
			if (vt === null) {
				var t = Ie.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = vt.next;
			var r = Ft === null ? Ie.memoizedState : Ft.next;
			if (r !== null) ((Ft = r), (vt = t));
			else {
				if (t === null) throw Ie.alternate === null ? Error(l(467)) : Error(l(310));
				((vt = t),
					(t = {
						memoizedState: vt.memoizedState,
						baseState: vt.baseState,
						baseQueue: vt.baseQueue,
						queue: vt.queue,
						next: null,
					}),
					Ft === null ? (Ie.memoizedState = Ft = t) : (Ft = Ft.next = t));
			}
			return Ft;
		}
		function Xl() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function ws(t) {
			var r = Ss;
			return (
				(Ss += 1),
				gu === null && (gu = []),
				(t = Tv(gu, t, r)),
				(r = Ie),
				(Ft === null ? r.memoizedState : Ft.next) === null &&
					((r = r.alternate), (V.H = r === null || r.memoizedState === null ? vg : $f)),
				t
			);
		}
		function Jl(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return ws(t);
				if (t.$$typeof === C) return pn(t);
			}
			throw Error(l(438, String(t)));
		}
		function kf(t) {
			var r = null,
				a = Ie.updateQueue;
			if ((a !== null && (r = a.memoCache), r == null)) {
				var s = Ie.alternate;
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
				a === null && ((a = Xl()), (Ie.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(t), s = 0; s < t; s++) a[s] = P;
			return (r.index++, a);
		}
		function ui(t, r) {
			return typeof r == "function" ? r(t) : r;
		}
		function Wl(t) {
			return Mf(Vt(), vt, t);
		}
		function Mf(t, r, a) {
			var s = t.queue;
			if (s === null) throw Error(l(311));
			s.lastRenderedReducer = a;
			var c = t.baseQueue,
				d = s.pending;
			if (d !== null) {
				if (c !== null) {
					var y = c.next;
					((c.next = d.next), (d.next = y));
				}
				((r.baseQueue = c = d), (s.pending = null));
			}
			if (((d = t.baseState), c === null)) t.memoizedState = d;
			else {
				r = c.next;
				var T = (y = null),
					z = null,
					G = r,
					re = !1;
				do {
					var ue = G.lane & -536870913;
					if (ue !== G.lane ? (Pe & ue) === ue : (ai & ue) === ue) {
						var F = G.revertLane;
						if (F === 0)
							(z !== null &&
								(z = z.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: G.action,
										hasEagerState: G.hasEagerState,
										eagerState: G.eagerState,
										next: null,
									}),
								ue === cu && (re = !0));
						else if ((ai & F) === F) {
							((G = G.next), F === cu && (re = !0));
							continue;
						} else
							((ue = {
								lane: 0,
								revertLane: G.revertLane,
								gesture: null,
								action: G.action,
								hasEagerState: G.hasEagerState,
								eagerState: G.eagerState,
								next: null,
							}),
								z === null ? ((T = z = ue), (y = d)) : (z = z.next = ue),
								(Ie.lanes |= F),
								(Gi |= F));
						((ue = G.action), ja && a(d, ue), (d = G.hasEagerState ? G.eagerState : a(d, ue)));
					} else
						((F = {
							lane: ue,
							revertLane: G.revertLane,
							gesture: G.gesture,
							action: G.action,
							hasEagerState: G.hasEagerState,
							eagerState: G.eagerState,
							next: null,
						}),
							z === null ? ((T = z = F), (y = d)) : (z = z.next = F),
							(Ie.lanes |= ue),
							(Gi |= ue));
					G = G.next;
				} while (G !== null && G !== r);
				if ((z === null ? (y = d) : (z.next = T), !Jn(d, t.memoizedState) && ((Xt = !0), re && ((a = fu), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = y), (t.baseQueue = z), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
		}
		function Nf(t) {
			var r = Vt(),
				a = r.queue;
			if (a === null) throw Error(l(311));
			a.lastRenderedReducer = t;
			var s = a.dispatch,
				c = a.pending,
				d = r.memoizedState;
			if (c !== null) {
				a.pending = null;
				var y = (c = c.next);
				do ((d = t(d, y.action)), (y = y.next));
				while (y !== c);
				(Jn(d, r.memoizedState) || (Xt = !0),
					(r.memoizedState = d),
					r.baseQueue === null && (r.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, s];
		}
		function jv(t, r, a) {
			var s = Ie,
				c = Vt(),
				d = Xe;
			if (d) {
				if (a === void 0) throw Error(l(407));
				a = a();
			} else a = r();
			var y = !Jn((vt || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), (Xt = !0)),
				(c = c.queue),
				Df(Lv.bind(null, s, c, t), [t]),
				c.getSnapshot !== r || y || (Ft !== null && Ft.memoizedState.tag & 1))
			) {
				if (((s.flags |= 2048), yu(9, { destroy: void 0 }, Iv.bind(null, s, c, a, r), null), _t === null))
					throw Error(l(349));
				d || (ai & 127) !== 0 || qv(s, r, a);
			}
			return a;
		}
		function qv(t, r, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: r, value: a }),
				(r = Ie.updateQueue),
				r === null
					? ((r = Xl()), (Ie.updateQueue = r), (r.stores = [t]))
					: ((a = r.stores), a === null ? (r.stores = [t]) : a.push(t)));
		}
		function Iv(t, r, a, s) {
			((r.value = a), (r.getSnapshot = s), Uv(r) && $v(t));
		}
		function Lv(t, r, a) {
			return a(function () {
				Uv(r) && $v(t);
			});
		}
		function Uv(t) {
			var r = t.getSnapshot;
			t = t.value;
			try {
				var a = r();
				return !Jn(t, a);
			} catch {
				return !0;
			}
		}
		function $v(t) {
			var r = Ta(t, 2);
			r !== null && Hn(r, t, 2);
		}
		function Of(t) {
			var r = Nn();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), ja)) {
					En(!0);
					try {
						a();
					} finally {
						En(!1);
					}
				}
			}
			return (
				(r.memoizedState = r.baseState = t),
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ui, lastRenderedState: t }),
				r
			);
		}
		function Bv(t, r, a, s) {
			return ((t.baseState = a), Mf(t, vt, typeof s == "function" ? s : ui));
		}
		function sw(t, r, a, s, c) {
			if (no(t)) throw Error(l(485));
			if (((t = r.action), t !== null)) {
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
				(V.T !== null ? a(!0) : (d.isTransition = !1),
					s(d),
					(a = r.pending),
					a === null ? ((d.next = r.pending = d), Vv(r, d)) : ((d.next = a.next), (r.pending = a.next = d)));
			}
		}
		function Vv(t, r) {
			var a = r.action,
				s = r.payload,
				c = t.state;
			if (r.isTransition) {
				var d = V.T,
					y = {};
				V.T = y;
				try {
					var T = a(c, s),
						z = V.S;
					(z !== null && z(y, T), Zv(t, r, T));
				} catch (G) {
					zf(t, r, G);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), (V.T = d));
				}
			} else
				try {
					((d = a(c, s)), Zv(t, r, d));
				} catch (G) {
					zf(t, r, G);
				}
		}
		function Zv(t, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (s) {
							Hv(t, r, s);
						},
						function (s) {
							return zf(t, r, s);
						},
					)
				: Hv(t, r, a);
		}
		function Hv(t, r, a) {
			((r.status = "fulfilled"),
				(r.value = a),
				Qv(r),
				(t.state = a),
				(r = t.pending),
				r !== null && ((a = r.next), a === r ? (t.pending = null) : ((a = a.next), (r.next = a), Vv(t, a))));
		}
		function zf(t, r, a) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((r.status = "rejected"), (r.reason = a), Qv(r), (r = r.next));
				while (r !== s);
			}
			t.action = null;
		}
		function Qv(t) {
			t = t.listeners;
			for (var r = 0; r < t.length; r++) (0, t[r])();
		}
		function Pv(t, r) {
			return r;
		}
		function Kv(t, r) {
			if (Xe) {
				var a = _t.formState;
				if (a !== null) {
					e: {
						var s = Ie;
						if (Xe) {
							if (Tt) {
								t: {
									for (var c = Tt, d = hr; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = gr(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((Tt = gr(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							Vi(s);
						}
						s = !1;
					}
					s && (r = a[0]);
				}
			}
			return (
				(a = Nn()),
				(a.memoizedState = a.baseState = r),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Pv, lastRenderedState: r }),
				(a.queue = s),
				(a = dg.bind(null, Ie, s)),
				(s.dispatch = a),
				(s = Of(!1)),
				(d = Uf.bind(null, Ie, !1, s.queue)),
				(s = Nn()),
				(c = { state: r, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(a = sw.bind(null, Ie, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = t),
				[r, a, !1]
			);
		}
		function Yv(t) {
			return Gv(Vt(), vt, t);
		}
		function Gv(t, r, a) {
			if (((r = Mf(t, r, Pv)[0]), (t = Wl(ui)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var s = ws(r);
				} catch (y) {
					throw y === du ? Zl : y;
				}
			else s = r;
			r = Vt();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((Ie.flags |= 2048), yu(9, { destroy: void 0 }, lw.bind(null, c, a), null)),
				[s, d, t]
			);
		}
		function lw(t, r) {
			t.action = r;
		}
		function Fv(t) {
			var r = Vt(),
				a = vt;
			if (a !== null) return Gv(r, a, t);
			(Vt(), (r = r.memoizedState), (a = Vt()));
			var s = a.queue.dispatch;
			return ((a.memoizedState = t), [r, s, !1]);
		}
		function yu(t, r, a, s) {
			return (
				(t = { tag: t, create: a, deps: s, inst: r, next: null }),
				(r = Ie.updateQueue),
				r === null && ((r = Xl()), (Ie.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = t.next = t) : ((s = a.next), (a.next = t), (t.next = s), (r.lastEffect = t)),
				t
			);
		}
		function Xv() {
			return Vt().memoizedState;
		}
		function eo(t, r, a, s) {
			var c = Nn();
			((Ie.flags |= t), (c.memoizedState = yu(1 | r, { destroy: void 0 }, a, s === void 0 ? null : s)));
		}
		function to(t, r, a, s) {
			var c = Vt();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			vt !== null && s !== null && Tf(s, vt.memoizedState.deps)
				? (c.memoizedState = yu(r, d, a, s))
				: ((Ie.flags |= t), (c.memoizedState = yu(1 | r, d, a, s)));
		}
		function Jv(t, r) {
			eo(8390656, 8, t, r);
		}
		function Df(t, r) {
			to(2048, 8, t, r);
		}
		function ow(t) {
			Ie.flags |= 4;
			var r = Ie.updateQueue;
			if (r === null) ((r = Xl()), (Ie.updateQueue = r), (r.events = [t]));
			else {
				var a = r.events;
				a === null ? (r.events = [t]) : a.push(t);
			}
		}
		function Wv(t) {
			var r = Vt().memoizedState;
			return (
				ow({ ref: r, nextImpl: t }),
				function () {
					if ((it & 2) !== 0) throw Error(l(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function eg(t, r) {
			return to(4, 2, t, r);
		}
		function tg(t, r) {
			return to(4, 4, t, r);
		}
		function ng(t, r) {
			if (typeof r == "function") {
				t = t();
				var a = r(t);
				return function () {
					typeof a == "function" ? a() : r(null);
				};
			}
			if (r != null)
				return (
					(t = t()),
					(r.current = t),
					function () {
						r.current = null;
					}
				);
		}
		function rg(t, r, a) {
			((a = a != null ? a.concat([t]) : null), to(4, 4, ng.bind(null, r, t), a));
		}
		function jf() {}
		function ig(t, r) {
			var a = Vt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			return r !== null && Tf(r, s[1]) ? s[0] : ((a.memoizedState = [t, r]), t);
		}
		function ag(t, r) {
			var a = Vt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			if (r !== null && Tf(r, s[1])) return s[0];
			if (((s = t()), ja)) {
				En(!0);
				try {
					t();
				} finally {
					En(!1);
				}
			}
			return ((a.memoizedState = [s, r]), s);
		}
		function qf(t, r, a) {
			return a === void 0 || ((ai & 1073741824) !== 0 && (Pe & 261930) === 0)
				? (t.memoizedState = r)
				: ((t.memoizedState = a), (t = ry()), (Ie.lanes |= t), (Gi |= t), a);
		}
		function ug(t, r, a, s) {
			return Jn(a, r)
				? a
				: mu.current !== null
					? ((t = qf(t, a, s)), Jn(t, r) || (Xt = !0), t)
					: (ai & 42) === 0 || ((ai & 1073741824) !== 0 && (Pe & 261930) === 0)
						? ((Xt = !0), (t.memoizedState = a))
						: ((t = ry()), (Ie.lanes |= t), (Gi |= t), r);
		}
		function sg(t, r, a, s, c) {
			var d = Q.p;
			Q.p = d !== 0 && 8 > d ? d : 8;
			var y = V.T,
				T = {};
			((V.T = T), Uf(t, !1, r, a));
			try {
				var z = c(),
					G = V.S;
				(G !== null && G(T, z),
					z !== null && typeof z == "object" && typeof z.then == "function"
						? Es(t, r, iw(z, s), vr(t))
						: Es(t, r, s, vr(t)));
			} catch (re) {
				Es(t, r, { then: function () {}, status: "rejected", reason: re }, vr());
			} finally {
				((Q.p = d), y !== null && T.types !== null && (y.types = T.types), (V.T = y));
			}
		}
		function cw() {}
		function If(t, r, a, s) {
			if (t.tag !== 5) throw Error(l(476));
			var c = lg(t).queue;
			sg(
				t,
				c,
				r,
				ve,
				a === null
					? cw
					: function () {
							return (og(t), a(s));
						},
			);
		}
		function lg(t) {
			var r = t.memoizedState;
			if (r !== null) return r;
			r = {
				memoizedState: ve,
				baseState: ve,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ui, lastRenderedState: ve },
				next: null,
			};
			var a = {};
			return (
				(r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ui, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = r),
				(t = t.alternate),
				t !== null && (t.memoizedState = r),
				r
			);
		}
		function og(t) {
			var r = lg(t);
			(r.next === null && (r = t.alternate.memoizedState), Es(t, r.next.queue, {}, vr()));
		}
		function Lf() {
			return pn($s);
		}
		function cg() {
			return Vt().memoizedState;
		}
		function fg() {
			return Vt().memoizedState;
		}
		function fw(t) {
			for (var r = t.return; r !== null; ) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = vr();
						t = za(a);
						var s = Da(r, t, a);
						(s !== null && (Hn(s, r, a), ps(s, r, a)), (r = { cache: hf() }), (t.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function dw(t, r, a) {
			var s = vr();
			((a = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				no(t) ? hg(r, a) : ((a = tf(t, r, a, s)), a !== null && (Hn(a, t, s), mg(a, r, s))));
		}
		function dg(t, r, a) {
			Es(t, r, a, vr());
		}
		function Es(t, r, a, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (no(t)) hg(r, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var y = r.lastRenderedState,
							T = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = T), Jn(T, y)))
							return (ql(t, r, c, 0), _t === null && jl(), !1);
					} catch {}
				if (((a = tf(t, r, c, s)), a !== null)) return (Hn(a, t, s), mg(a, r, s), !0);
			}
			return !1;
		}
		function Uf(t, r, a, s) {
			if (
				((s = { lane: 2, revertLane: yd(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				no(t))
			) {
				if (r) throw Error(l(479));
			} else ((r = tf(t, a, s, 2)), r !== null && Hn(r, t, 2));
		}
		function no(t) {
			var r = t.alternate;
			return t === Ie || (r !== null && r === Ie);
		}
		function hg(t, r) {
			vu = Gl = !0;
			var a = t.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (t.pending = r));
		}
		function mg(t, r, a) {
			if ((a & 4194048) !== 0) {
				var s = r.lanes;
				((s &= t.pendingLanes), (a |= s), (r.lanes = a), Oi(t, a));
			}
		}
		var Ts = {
			readContext: pn,
			use: Jl,
			useCallback: Lt,
			useContext: Lt,
			useEffect: Lt,
			useImperativeHandle: Lt,
			useLayoutEffect: Lt,
			useInsertionEffect: Lt,
			useMemo: Lt,
			useReducer: Lt,
			useRef: Lt,
			useState: Lt,
			useDebugValue: Lt,
			useDeferredValue: Lt,
			useTransition: Lt,
			useSyncExternalStore: Lt,
			useId: Lt,
			useHostTransitionStatus: Lt,
			useFormState: Lt,
			useActionState: Lt,
			useOptimistic: Lt,
			useMemoCache: Lt,
			useCacheRefresh: Lt,
		};
		Ts.useEffectEvent = Lt;
		var vg = {
				readContext: pn,
				use: Jl,
				useCallback: function (t, r) {
					return ((Nn().memoizedState = [t, r === void 0 ? null : r]), t);
				},
				useContext: pn,
				useEffect: Jv,
				useImperativeHandle: function (t, r, a) {
					((a = a != null ? a.concat([t]) : null), eo(4194308, 4, ng.bind(null, r, t), a));
				},
				useLayoutEffect: function (t, r) {
					return eo(4194308, 4, t, r);
				},
				useInsertionEffect: function (t, r) {
					eo(4, 2, t, r);
				},
				useMemo: function (t, r) {
					var a = Nn();
					r = r === void 0 ? null : r;
					var s = t();
					if (ja) {
						En(!0);
						try {
							t();
						} finally {
							En(!1);
						}
					}
					return ((a.memoizedState = [s, r]), s);
				},
				useReducer: function (t, r, a) {
					var s = Nn();
					if (a !== void 0) {
						var c = a(r);
						if (ja) {
							En(!0);
							try {
								a(r);
							} finally {
								En(!1);
							}
						}
					} else c = r;
					return (
						(s.memoizedState = s.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(s.queue = t),
						(t = t.dispatch = dw.bind(null, Ie, t)),
						[s.memoizedState, t]
					);
				},
				useRef: function (t) {
					var r = Nn();
					return ((t = { current: t }), (r.memoizedState = t));
				},
				useState: function (t) {
					t = Of(t);
					var r = t.queue,
						a = dg.bind(null, Ie, r);
					return ((r.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: jf,
				useDeferredValue: function (t, r) {
					return qf(Nn(), t, r);
				},
				useTransition: function () {
					var t = Of(!1);
					return ((t = sg.bind(null, Ie, t.queue, !0, !1)), (Nn().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, r, a) {
					var s = Ie,
						c = Nn();
					if (Xe) {
						if (a === void 0) throw Error(l(407));
						a = a();
					} else {
						if (((a = r()), _t === null)) throw Error(l(349));
						(Pe & 127) !== 0 || qv(s, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						Jv(Lv.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						yu(9, { destroy: void 0 }, Iv.bind(null, s, d, a, r), null),
						a
					);
				},
				useId: function () {
					var t = Nn(),
						r = _t.identifierPrefix;
					if (Xe) {
						var a = Lr,
							s = Ir;
						((a = (s & ~(1 << (32 - It(s) - 1))).toString(32) + a),
							(r = "_" + r + "R_" + a),
							(a = Fl++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = aw++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = r);
				},
				useHostTransitionStatus: Lf,
				useFormState: Kv,
				useActionState: Kv,
				useOptimistic: function (t) {
					var r = Nn();
					r.memoizedState = r.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = Uf.bind(null, Ie, !0, a)), (a.dispatch = r), [t, r]);
				},
				useMemoCache: kf,
				useCacheRefresh: function () {
					return (Nn().memoizedState = fw.bind(null, Ie));
				},
				useEffectEvent: function (t) {
					var r = Nn(),
						a = { impl: t };
					return (
						(r.memoizedState = a),
						function () {
							if ((it & 2) !== 0) throw Error(l(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			$f = {
				readContext: pn,
				use: Jl,
				useCallback: ig,
				useContext: pn,
				useEffect: Df,
				useImperativeHandle: rg,
				useInsertionEffect: eg,
				useLayoutEffect: tg,
				useMemo: ag,
				useReducer: Wl,
				useRef: Xv,
				useState: function () {
					return Wl(ui);
				},
				useDebugValue: jf,
				useDeferredValue: function (t, r) {
					return ug(Vt(), vt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = Wl(ui)[0],
						r = Vt().memoizedState;
					return [typeof t == "boolean" ? t : ws(t), r];
				},
				useSyncExternalStore: jv,
				useId: cg,
				useHostTransitionStatus: Lf,
				useFormState: Yv,
				useActionState: Yv,
				useOptimistic: function (t, r) {
					return Bv(Vt(), vt, t, r);
				},
				useMemoCache: kf,
				useCacheRefresh: fg,
			};
		$f.useEffectEvent = Wv;
		var gg = {
			readContext: pn,
			use: Jl,
			useCallback: ig,
			useContext: pn,
			useEffect: Df,
			useImperativeHandle: rg,
			useInsertionEffect: eg,
			useLayoutEffect: tg,
			useMemo: ag,
			useReducer: Nf,
			useRef: Xv,
			useState: function () {
				return Nf(ui);
			},
			useDebugValue: jf,
			useDeferredValue: function (t, r) {
				var a = Vt();
				return vt === null ? qf(a, t, r) : ug(a, vt.memoizedState, t, r);
			},
			useTransition: function () {
				var t = Nf(ui)[0],
					r = Vt().memoizedState;
				return [typeof t == "boolean" ? t : ws(t), r];
			},
			useSyncExternalStore: jv,
			useId: cg,
			useHostTransitionStatus: Lf,
			useFormState: Fv,
			useActionState: Fv,
			useOptimistic: function (t, r) {
				var a = Vt();
				return vt !== null ? Bv(a, vt, t, r) : ((a.baseState = t), [t, a.queue.dispatch]);
			},
			useMemoCache: kf,
			useCacheRefresh: fg,
		};
		gg.useEffectEvent = Wv;
		function Bf(t, r, a, s) {
			((r = t.memoizedState),
				(a = a(s, r)),
				(a = a == null ? r : p({}, r, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var Vf = {
			enqueueSetState: function (t, r, a) {
				t = t._reactInternals;
				var s = vr(),
					c = za(s);
				((c.payload = r), a != null && (c.callback = a), (r = Da(t, c, s)), r !== null && (Hn(r, t, s), ps(r, t, s)));
			},
			enqueueReplaceState: function (t, r, a) {
				t = t._reactInternals;
				var s = vr(),
					c = za(s);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = Da(t, c, s)),
					r !== null && (Hn(r, t, s), ps(r, t, s)));
			},
			enqueueForceUpdate: function (t, r) {
				t = t._reactInternals;
				var a = vr(),
					s = za(a);
				((s.tag = 2), r != null && (s.callback = r), (r = Da(t, s, a)), r !== null && (Hn(r, t, a), ps(r, t, a)));
			},
		};
		function yg(t, r, a, s, c, d, y) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, y)
					: r.prototype && r.prototype.isPureReactComponent
						? !cs(a, s) || !cs(c, d)
						: !0
			);
		}
		function pg(t, r, a, s) {
			((t = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, s),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, s),
				r.state !== t && Vf.enqueueReplaceState(r, r.state, null));
		}
		function qa(t, r) {
			var a = r;
			if ("ref" in r) {
				a = {};
				for (var s in r) s !== "ref" && (a[s] = r[s]);
			}
			if ((t = t.defaultProps)) {
				a === r && (a = p({}, a));
				for (var c in t) a[c] === void 0 && (a[c] = t[c]);
			}
			return a;
		}
		function hw(t) {
			Dl(t);
		}
		function mw(t) {
			console.error(t);
		}
		function vw(t) {
			Dl(t);
		}
		function ro(t, r) {
			try {
				var a = t.onUncaughtError;
				a(r.value, { componentStack: r.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function bg(t, r, a) {
			try {
				var s = t.onCaughtError;
				s(a.value, { componentStack: a.stack, errorBoundary: r.tag === 1 ? r.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Zf(t, r, a) {
			return (
				(a = za(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					ro(t, r);
				}),
				a
			);
		}
		function _g(t) {
			return ((t = za(t)), (t.tag = 3), t);
		}
		function Sg(t, r, a, s) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						bg(r, a, s);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(t.callback = function () {
					(bg(r, a, s), typeof c != "function" && (Fi === null ? (Fi = new Set([this])) : Fi.add(this)));
					var T = s.stack;
					this.componentDidCatch(s.value, { componentStack: T !== null ? T : "" });
				});
		}
		function gw(t, r, a, s, c) {
			if (((a.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((r = a.alternate), r !== null && ou(r, a, c, !0), (a = er.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								mr === null ? go() : a.alternate === null && Ut === 0 && (Ut = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								s === Hl
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([s])) : r.add(s), md(t, s, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								s === Hl
									? (a.flags |= 16384)
									: ((r = a.updateQueue),
										r === null
											? ((r = { transitions: null, markerInstances: null, retryQueue: new Set([s]) }),
												(a.updateQueue = r))
											: ((a = r.retryQueue), a === null ? (r.retryQueue = new Set([s])) : a.add(s)),
										md(t, s, c)),
								!1
							);
					}
					throw Error(l(435, a.tag));
				}
				return (md(t, s, c), go(), !1);
			}
			if (Xe)
				return (
					(r = er.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							s !== lf && ((t = Error(l(422), { cause: s })), hs(cr(t, a))))
						: (s !== lf && ((r = Error(l(423), { cause: s })), hs(cr(r, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(s = cr(s, a)),
							(c = Zf(t.stateNode, s, c)),
							bf(t, c),
							Ut !== 4 && (Ut = 2)),
					!1
				);
			var d = Error(l(520), { cause: s });
			if (((d = cr(d, a)), Os === null ? (Os = [d]) : Os.push(d), Ut !== 4 && (Ut = 2), r === null)) return !0;
			((s = cr(s, a)), (a = r));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = Zf(a.stateNode, s, t)), bf(a, t), !1);
					case 1:
						if (
							((r = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof r.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Fi === null || !Fi.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = _g(c)), Sg(c, t, a, s), bf(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Hf = Error(l(461)),
			Xt = !1;
		function bn(t, r, a, s) {
			r.child = t === null ? Cv(r, null, a, s) : Oa(r, t.child, a, s);
		}
		function wg(t, r, a, s, c) {
			a = a.render;
			var d = r.ref;
			if ("ref" in s) {
				var y = {};
				for (var T in s) T !== "ref" && (y[T] = s[T]);
			} else y = s;
			return (
				Ca(r),
				(s = xf(t, r, a, y, d, c)),
				(T = Af()),
				t !== null && !Xt ? (Rf(t, r, c), si(t, r, c)) : (Xe && T && uf(r), (r.flags |= 1), bn(t, r, s, c), r.child)
			);
		}
		function Eg(t, r, a, s, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !nf(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), Tg(t, r, d, s, c))
					: ((t = Ll(a.type, null, s, r, r.mode, c)), (t.ref = r.ref), (t.return = r), (r.child = t));
			}
			if (((d = t.child), !Jf(t, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : cs), a(y, s) && t.ref === r.ref)) return si(t, r, c);
			}
			return ((r.flags |= 1), (t = ti(d, s)), (t.ref = r.ref), (t.return = r), (r.child = t));
		}
		function Tg(t, r, a, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (cs(d, s) && t.ref === r.ref)
					if (((Xt = !1), (r.pendingProps = s = d), Jf(t, c))) (t.flags & 131072) !== 0 && (Xt = !0);
					else return ((r.lanes = t.lanes), si(t, r, c));
			}
			return Qf(t, r, a, s, c);
		}
		function xg(t, r, a, s) {
			var c = s.children,
				d = t !== null ? t.memoizedState : null;
			if (
				(t === null &&
					r.stateNode === null &&
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				s.mode === "hidden")
			) {
				if ((r.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | a : a), t !== null)) {
						for (s = r.child = t.child, c = 0; s !== null; ) ((c = c | s.lanes | s.childLanes), (s = s.sibling));
						s = c & ~d;
					} else ((s = 0), (r.child = null));
					return Ag(t, r, d, a, s);
				}
				if ((a & 536870912) !== 0)
					((r.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && Vl(r, d !== null ? d.cachePool : null),
						d !== null ? Nv(r, d) : Sf(),
						Ov(r));
				else return ((s = r.lanes = 536870912), Ag(t, r, d !== null ? d.baseLanes | a : a, a, s));
			} else
				d !== null
					? (Vl(r, d.cachePool), Nv(r, d), Pi(r), (r.memoizedState = null))
					: (t !== null && Vl(r, null), Sf(), Pi(r));
			return (bn(t, r, c, a), r.child);
		}
		function xs(t, r) {
			return (
				(t !== null && t.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function Ag(t, r, a, s, c) {
			var d = vf();
			return (
				(d = d === null ? null : { parent: Gt._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && Vl(r, null),
				Sf(),
				Ov(r),
				t !== null && ou(t, r, s, !0),
				(r.childLanes = c),
				null
			);
		}
		function io(t, r) {
			return (
				(r = uo({ mode: r.mode, children: r.children }, t.mode)),
				(r.ref = t.ref),
				(t.child = r),
				(r.return = t),
				r
			);
		}
		function Rg(t, r, a) {
			return (Oa(r, t.child, null, a), (t = io(r, r.pendingProps)), (t.flags |= 2), tr(r), (r.memoizedState = null), t);
		}
		function yw(t, r, a) {
			var s = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), t === null)) {
				if (Xe) {
					if (s.mode === "hidden") return ((t = io(r, s)), (r.lanes = 536870912), xs(null, t));
					if (
						(Ef(r),
						(t = Tt)
							? ((t = $y(t, hr)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: $i !== null ? { id: Ir, overflow: Lr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = hv(t)),
									(a.return = r),
									(r.child = a),
									(yn = r),
									(Tt = null)))
							: (t = null),
						t === null)
					)
						throw Vi(r);
					return ((r.lanes = 536870912), null);
				}
				return io(r, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Ef(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = Rg(t, r, a)));
					else if (r.memoizedState !== null) ((r.child = t.child), (r.flags |= 128), (r = null));
					else throw Error(l(558));
				else if ((Xt || ou(t, r, a, !1), (c = (a & t.childLanes) !== 0), Xt || c)) {
					if (((s = _t), s !== null && ((y = zi(s, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), Ta(t, y), Hn(s, t, y), Hf);
					(go(), (r = Rg(t, r, a)));
				} else
					((t = d.treeContext),
						(Tt = gr(y.nextSibling)),
						(yn = r),
						(Xe = !0),
						(Bi = null),
						(hr = !1),
						t !== null && gv(r, t),
						(r = io(r, s)),
						(r.flags |= 4096));
				return r;
			}
			return (
				(t = ti(t.child, { mode: s.mode, children: s.children })),
				(t.ref = r.ref),
				(r.child = t),
				(t.return = r),
				t
			);
		}
		function ao(t, r) {
			var a = r.ref;
			if (a === null) t !== null && t.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(l(284));
				(t === null || t.ref !== a) && (r.flags |= 4194816);
			}
		}
		function Qf(t, r, a, s, c) {
			return (
				Ca(r),
				(a = xf(t, r, a, s, void 0, c)),
				(s = Af()),
				t !== null && !Xt ? (Rf(t, r, c), si(t, r, c)) : (Xe && s && uf(r), (r.flags |= 1), bn(t, r, a, c), r.child)
			);
		}
		function Cg(t, r, a, s, c, d) {
			return (
				Ca(r),
				(r.updateQueue = null),
				(a = Dv(r, s, a, c)),
				zv(t),
				(s = Af()),
				t !== null && !Xt ? (Rf(t, r, d), si(t, r, d)) : (Xe && s && uf(r), (r.flags |= 1), bn(t, r, a, d), r.child)
			);
		}
		function kg(t, r, a, s, c) {
			if ((Ca(r), r.stateNode === null)) {
				var d = au,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = pn(y)),
					(d = new a(s, d)),
					(r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Vf),
					(r.stateNode = d),
					(d._reactInternals = r),
					(d = r.stateNode),
					(d.props = s),
					(d.state = r.memoizedState),
					(d.refs = {}),
					yf(r),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? pn(y) : au),
					(d.state = r.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (Bf(r, a, y, s), (d.state = r.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && Vf.enqueueReplaceState(d, d.state, null),
						_s(r, s, d, c),
						bs(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(s = !0));
			} else if (t === null) {
				d = r.stateNode;
				var T = r.memoizedProps,
					z = qa(a, T);
				d.props = z;
				var G = d.context,
					re = a.contextType;
				((y = au), typeof re == "object" && re !== null && (y = pn(re)));
				var ue = a.getDerivedStateFromProps;
				((re = typeof ue == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(T = r.pendingProps !== T),
					re ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((T || G !== y) && pg(r, d, s, y)),
					(Hi = !1));
				var F = r.memoizedState;
				((d.state = F),
					_s(r, s, d, c),
					bs(),
					(G = r.memoizedState),
					T || F !== G || Hi
						? (typeof ue == "function" && (Bf(r, a, ue, s), (G = r.memoizedState)),
							(z = Hi || yg(r, a, z, s, F, G, y))
								? (re ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (r.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (r.flags |= 4194308),
									(r.memoizedProps = s),
									(r.memoizedState = G)),
							(d.props = s),
							(d.state = G),
							(d.context = y),
							(s = z))
						: (typeof d.componentDidMount == "function" && (r.flags |= 4194308), (s = !1)));
			} else {
				((d = r.stateNode),
					pf(t, r),
					(y = r.memoizedProps),
					(re = qa(a, y)),
					(d.props = re),
					(ue = r.pendingProps),
					(F = d.context),
					(G = a.contextType),
					(z = au),
					typeof G == "object" && G !== null && (z = pn(G)),
					(T = a.getDerivedStateFromProps),
					(G = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ue || F !== z) && pg(r, d, s, z)),
					(Hi = !1),
					(F = r.memoizedState),
					(d.state = F),
					_s(r, s, d, c),
					bs());
				var W = r.memoizedState;
				y !== ue || F !== W || Hi || (t !== null && t.dependencies !== null && $l(t.dependencies))
					? (typeof T == "function" && (Bf(r, a, T, s), (W = r.memoizedState)),
						(re = Hi || yg(r, a, re, s, F, W, z) || (t !== null && t.dependencies !== null && $l(t.dependencies)))
							? (G ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, W, z),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, W, z)),
								typeof d.componentDidUpdate == "function" && (r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === t.memoizedProps && F === t.memoizedState) ||
									(r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === t.memoizedProps && F === t.memoizedState) ||
									(r.flags |= 1024),
								(r.memoizedProps = s),
								(r.memoizedState = W)),
						(d.props = s),
						(d.state = W),
						(d.context = z),
						(s = re))
					: (typeof d.componentDidUpdate != "function" ||
							(y === t.memoizedProps && F === t.memoizedState) ||
							(r.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === t.memoizedProps && F === t.memoizedState) ||
							(r.flags |= 1024),
						(s = !1));
			}
			return (
				(d = s),
				ao(t, r),
				(s = (r.flags & 128) !== 0),
				d || s
					? ((d = r.stateNode),
						(a = s && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						t !== null && s ? ((r.child = Oa(r, t.child, null, c)), (r.child = Oa(r, null, a, c))) : bn(t, r, a, c),
						(r.memoizedState = d.state),
						(t = r.child))
					: (t = si(t, r, c)),
				t
			);
		}
		function Mg(t, r, a, s) {
			return (Aa(), (r.flags |= 256), bn(t, r, a, s), r.child);
		}
		var Pf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function Kf(t) {
			return { baseLanes: t, cachePool: wv() };
		}
		function Yf(t, r, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), r && (t |= rr), t);
		}
		function Ng(t, r, a) {
			var s = r.pendingProps,
				c = !1,
				d = (r.flags & 128) !== 0,
				y;
			if (
				((y = d) || (y = t !== null && t.memoizedState === null ? !1 : (Bt.current & 2) !== 0),
				y && ((c = !0), (r.flags &= -129)),
				(y = (r.flags & 32) !== 0),
				(r.flags &= -33),
				t === null)
			) {
				if (Xe) {
					if (
						(c ? Qi(r) : Pi(r),
						(t = Tt)
							? ((t = $y(t, hr)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: $i !== null ? { id: Ir, overflow: Lr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = hv(t)),
									(a.return = r),
									(r.child = a),
									(yn = r),
									(Tt = null)))
							: (t = null),
						t === null)
					)
						throw Vi(r);
					return (kd(t) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				var T = s.children;
				return (
					(s = s.fallback),
					c
						? (Pi(r),
							(c = r.mode),
							(T = uo({ mode: "hidden", children: T }, c)),
							(s = xa(s, c, a, null)),
							(T.return = r),
							(s.return = r),
							(T.sibling = s),
							(r.child = T),
							(s = r.child),
							(s.memoizedState = Kf(a)),
							(s.childLanes = Yf(t, y, a)),
							(r.memoizedState = Pf),
							xs(null, s))
						: (Qi(r), Gf(r, T))
				);
			}
			var z = t.memoizedState;
			if (z !== null && ((T = z.dehydrated), T !== null)) {
				if (d)
					r.flags & 256
						? (Qi(r), (r.flags &= -257), (r = Ff(t, r, a)))
						: r.memoizedState !== null
							? (Pi(r), (r.child = t.child), (r.flags |= 128), (r = null))
							: (Pi(r),
								(T = s.fallback),
								(c = r.mode),
								(s = uo({ mode: "visible", children: s.children }, c)),
								(T = xa(T, c, a, null)),
								(T.flags |= 2),
								(s.return = r),
								(T.return = r),
								(s.sibling = T),
								(r.child = s),
								Oa(r, t.child, null, a),
								(s = r.child),
								(s.memoizedState = Kf(a)),
								(s.childLanes = Yf(t, y, a)),
								(r.memoizedState = Pf),
								(r = xs(null, s)));
				else if ((Qi(r), kd(T))) {
					if (((y = T.nextSibling && T.nextSibling.dataset), y)) var G = y.dgst;
					((y = G),
						(s = Error(l(419))),
						(s.stack = ""),
						(s.digest = y),
						hs({ value: s, source: null, stack: null }),
						(r = Ff(t, r, a)));
				} else if ((Xt || ou(t, r, a, !1), (y = (a & t.childLanes) !== 0), Xt || y)) {
					if (((y = _t), y !== null && ((s = zi(y, a)), s !== 0 && s !== z.retryLane)))
						throw ((z.retryLane = s), Ta(t, s), Hn(y, t, s), Hf);
					(Cd(T) || go(), (r = Ff(t, r, a)));
				} else
					Cd(T)
						? ((r.flags |= 192), (r.child = t.child), (r = null))
						: ((t = z.treeContext),
							(Tt = gr(T.nextSibling)),
							(yn = r),
							(Xe = !0),
							(Bi = null),
							(hr = !1),
							t !== null && gv(r, t),
							(r = Gf(r, s.children)),
							(r.flags |= 4096));
				return r;
			}
			return c
				? (Pi(r),
					(T = s.fallback),
					(c = r.mode),
					(z = t.child),
					(G = z.sibling),
					(s = ti(z, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = z.subtreeFlags & 65011712),
					G !== null ? (T = ti(G, T)) : ((T = xa(T, c, a, null)), (T.flags |= 2)),
					(T.return = r),
					(s.return = r),
					(s.sibling = T),
					(r.child = s),
					xs(null, s),
					(s = r.child),
					(T = t.child.memoizedState),
					T === null
						? (T = Kf(a))
						: ((c = T.cachePool),
							c !== null ? ((z = Gt._currentValue), (c = c.parent !== z ? { parent: z, pool: z } : c)) : (c = wv()),
							(T = { baseLanes: T.baseLanes | a, cachePool: c })),
					(s.memoizedState = T),
					(s.childLanes = Yf(t, y, a)),
					(r.memoizedState = Pf),
					xs(t.child, s))
				: (Qi(r),
					(a = t.child),
					(t = a.sibling),
					(a = ti(a, { mode: "visible", children: s.children })),
					(a.return = r),
					(a.sibling = null),
					t !== null && ((y = r.deletions), y === null ? ((r.deletions = [t]), (r.flags |= 16)) : y.push(t)),
					(r.child = a),
					(r.memoizedState = null),
					a);
		}
		function Gf(t, r) {
			return ((r = uo({ mode: "visible", children: r }, t.mode)), (r.return = t), (t.child = r));
		}
		function uo(t, r) {
			return ((t = Wn(22, t, null, r)), (t.lanes = 0), t);
		}
		function Ff(t, r, a) {
			return (
				Oa(r, t.child, null, a),
				(t = Gf(r, r.pendingProps.children)),
				(t.flags |= 2),
				(r.memoizedState = null),
				t
			);
		}
		function Og(t, r, a) {
			t.lanes |= r;
			var s = t.alternate;
			(s !== null && (s.lanes |= r), ff(t.return, r, a));
		}
		function Xf(t, r, a, s, c, d) {
			var y = t.memoizedState;
			y === null
				? (t.memoizedState = {
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
		function zg(t, r, a) {
			var s = r.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var y = Bt.current,
				T = (y & 2) !== 0;
			if (
				(T ? ((y = (y & 1) | 2), (r.flags |= 128)) : (y &= 1),
				le(Bt, y),
				bn(t, r, s, a),
				(s = Xe ? ds : 0),
				!T && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = r.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && Og(t, a, r);
					else if (t.tag === 19) Og(t, a, r);
					else if (t.child !== null) {
						((t.child.return = t), (t = t.child));
						continue;
					}
					if (t === r) break e;
					for (; t.sibling === null; ) {
						if (t.return === null || t.return === r) break e;
						t = t.return;
					}
					((t.sibling.return = t.return), (t = t.sibling));
				}
			switch (c) {
				case "forwards":
					for (a = r.child, c = null; a !== null; )
						((t = a.alternate), t !== null && Yl(t) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						Xf(r, !1, c, a, d, s));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && Yl(t) === null)) {
							r.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					Xf(r, !0, a, null, d, s);
					break;
				case "together":
					Xf(r, !1, null, null, void 0, s);
					break;
				default:
					r.memoizedState = null;
			}
			return r.child;
		}
		function si(t, r, a) {
			if ((t !== null && (r.dependencies = t.dependencies), (Gi |= r.lanes), (a & r.childLanes) === 0))
				if (t !== null) {
					if ((ou(t, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && r.child !== t.child) throw Error(l(153));
			if (r.child !== null) {
				for (t = r.child, a = ti(t, t.pendingProps), r.child = a, a.return = r; t.sibling !== null; )
					((t = t.sibling), (a = a.sibling = ti(t, t.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function Jf(t, r) {
			return (t.lanes & r) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && $l(t)));
		}
		function pw(t, r, a) {
			switch (r.tag) {
				case 3:
					(Ne(r, r.stateNode.containerInfo), Zi(r, Gt, t.memoizedState.cache), Aa());
					break;
				case 27:
				case 5:
					Ze(r);
					break;
				case 4:
					Ne(r, r.stateNode.containerInfo);
					break;
				case 10:
					Zi(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), Ef(r), null);
					break;
				case 13:
					var s = r.memoizedState;
					if (s !== null)
						return s.dehydrated !== null
							? (Qi(r), (r.flags |= 128), null)
							: (a & r.child.childLanes) !== 0
								? Ng(t, r, a)
								: (Qi(r), (t = si(t, r, a)), t !== null ? t.sibling : null);
					Qi(r);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((s = (a & r.childLanes) !== 0), s || (ou(t, r, a, !1), (s = (a & r.childLanes) !== 0)), c)) {
						if (s) return zg(t, r, a);
						r.flags |= 128;
					}
					if (
						((c = r.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						le(Bt, Bt.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((r.lanes = 0), xg(t, r, a, r.pendingProps));
				case 24:
					Zi(r, Gt, t.memoizedState.cache);
			}
			return si(t, r, a);
		}
		function Dg(t, r, a) {
			if (t !== null)
				if (t.memoizedProps !== r.pendingProps) Xt = !0;
				else {
					if (!Jf(t, a) && (r.flags & 128) === 0) return ((Xt = !1), pw(t, r, a));
					Xt = (t.flags & 131072) !== 0;
				}
			else ((Xt = !1), Xe && (r.flags & 1048576) !== 0 && vv(r, ds, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var s = r.pendingProps;
						if (((t = Ma(r.elementType)), (r.type = t), typeof t == "function"))
							nf(t)
								? ((s = qa(t, s)), (r.tag = 1), (r = kg(null, r, t, s, a)))
								: ((r.tag = 0), (r = Qf(null, r, t, s, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === L) {
									((r.tag = 11), (r = wg(null, r, t, s, a)));
									break e;
								} else if (c === M) {
									((r.tag = 14), (r = Eg(null, r, t, s, a)));
									break e;
								}
							}
							throw ((r = ne(t) || t), Error(l(306, r, "")));
						}
					}
					return r;
				case 0:
					return Qf(t, r, r.type, r.pendingProps, a);
				case 1:
					return ((s = r.type), (c = qa(s, r.pendingProps)), kg(t, r, s, c, a));
				case 3:
					e: {
						if ((Ne(r, r.stateNode.containerInfo), t === null)) throw Error(l(387));
						s = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), pf(t, r), _s(r, s, null, a));
						var y = r.memoizedState;
						if (
							((s = y.cache), Zi(r, Gt, s), s !== d.cache && df(r, [Gt], a, !0), bs(), (s = y.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: y.cache }),
								(r.updateQueue.baseState = d),
								(r.memoizedState = d),
								r.flags & 256)
							) {
								r = Mg(t, r, s, a);
								break e;
							} else if (s !== c) {
								((c = cr(Error(l(424)), r)), hs(c), (r = Mg(t, r, s, a)));
								break e;
							} else {
								switch (((t = r.stateNode.containerInfo), t.nodeType)) {
									case 9:
										t = t.body;
										break;
									default:
										t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
								}
								for (
									Tt = gr(t.firstChild), yn = r, Xe = !0, Bi = null, hr = !0, a = Cv(r, null, s, a), r.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((Aa(), s === c)) {
								r = si(t, r, a);
								break e;
							}
							bn(t, r, s, a);
						}
						r = r.child;
					}
					return r;
				case 26:
					return (
						ao(t, r),
						t === null
							? (a = Py(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Xe ||
									((a = r.type),
									(t = r.pendingProps),
									(s = Eo(Se.current).createElement(a)),
									(s[mt] = r),
									(s[un] = t),
									_n(s, a, t),
									rt(s),
									(r.stateNode = s))
							: (r.memoizedState = Py(r.type, t.memoizedProps, r.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						Ze(r),
						t === null &&
							Xe &&
							((s = r.stateNode = Zy(r.type, r.pendingProps, Se.current)),
							(yn = r),
							(hr = !0),
							(c = Tt),
							ea(r.type) ? ((Md = c), (Tt = gr(s.firstChild))) : (Tt = c)),
						bn(t, r, r.pendingProps.children, a),
						ao(t, r),
						t === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						t === null &&
							Xe &&
							((c = s = Tt) &&
								((s = Pw(s, r.type, r.pendingProps, hr)),
								s !== null ? ((r.stateNode = s), (yn = r), (Tt = gr(s.firstChild)), (hr = !1), (c = !0)) : (c = !1)),
							c || Vi(r)),
						Ze(r),
						(c = r.type),
						(d = r.pendingProps),
						(y = t !== null ? t.memoizedProps : null),
						(s = d.children),
						xd(c, d) ? (s = null) : y !== null && xd(c, y) && (r.flags |= 32),
						r.memoizedState !== null && ((c = xf(t, r, uw, null, null, a)), ($s._currentValue = c)),
						ao(t, r),
						bn(t, r, s, a),
						r.child
					);
				case 6:
					return (
						t === null &&
							Xe &&
							((t = a = Tt) &&
								((a = Kw(a, r.pendingProps, hr)),
								a !== null ? ((r.stateNode = a), (yn = r), (Tt = null), (t = !0)) : (t = !1)),
							t || Vi(r)),
						null
					);
				case 13:
					return Ng(t, r, a);
				case 4:
					return (
						Ne(r, r.stateNode.containerInfo),
						(s = r.pendingProps),
						t === null ? (r.child = Oa(r, null, s, a)) : bn(t, r, s, a),
						r.child
					);
				case 11:
					return wg(t, r, r.type, r.pendingProps, a);
				case 7:
					return (bn(t, r, r.pendingProps, a), r.child);
				case 8:
					return (bn(t, r, r.pendingProps.children, a), r.child);
				case 12:
					return (bn(t, r, r.pendingProps.children, a), r.child);
				case 10:
					return ((s = r.pendingProps), Zi(r, r.type, s.value), bn(t, r, s.children, a), r.child);
				case 9:
					return (
						(c = r.type._context),
						(s = r.pendingProps.children),
						Ca(r),
						(c = pn(c)),
						(s = s(c)),
						(r.flags |= 1),
						bn(t, r, s, a),
						r.child
					);
				case 14:
					return Eg(t, r, r.type, r.pendingProps, a);
				case 15:
					return Tg(t, r, r.type, r.pendingProps, a);
				case 19:
					return zg(t, r, a);
				case 31:
					return yw(t, r, a);
				case 22:
					return xg(t, r, a, r.pendingProps);
				case 24:
					return (
						Ca(r),
						(s = pn(Gt)),
						t === null
							? ((c = vf()),
								c === null &&
									((c = _t),
									(d = hf()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(r.memoizedState = { parent: s, cache: c }),
								yf(r),
								Zi(r, Gt, c))
							: ((t.lanes & a) !== 0 && (pf(t, r), _s(r, null, null, a), bs()),
								(c = t.memoizedState),
								(d = r.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Zi(r, Gt, s))
									: ((s = d.cache), Zi(r, Gt, s), s !== c.cache && df(r, [Gt], a, !0))),
						bn(t, r, r.pendingProps.children, a),
						r.child
					);
				case 29:
					throw r.pendingProps;
			}
			throw Error(l(156, r.tag));
		}
		function li(t) {
			t.flags |= 4;
		}
		function Wf(t, r, a, s, c) {
			if (((r = (t.mode & 32) !== 0) && (r = !1), r)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (sy()) t.flags |= 8192;
					else throw ((Na = Hl), gf);
			} else t.flags &= -16777217;
		}
		function jg(t, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !Xy(r)))
				if (sy()) t.flags |= 8192;
				else throw ((Na = Hl), gf);
		}
		function so(t, r) {
			(r !== null && (t.flags |= 4),
				t.flags & 16384 && ((r = t.tag !== 22 ? fn() : 536870912), (t.lanes |= r), (Su |= r)));
		}
		function As(t, r) {
			if (!Xe)
				switch (t.tailMode) {
					case "hidden":
						r = t.tail;
						for (var a = null; r !== null; ) (r.alternate !== null && (a = r), (r = r.sibling));
						a === null ? (t.tail = null) : (a.sibling = null);
						break;
					case "collapsed":
						a = t.tail;
						for (var s = null; a !== null; ) (a.alternate !== null && (s = a), (a = a.sibling));
						s === null ? (r || t.tail === null ? (t.tail = null) : (t.tail.sibling = null)) : (s.sibling = null);
				}
		}
		function xt(t) {
			var r = t.alternate !== null && t.alternate.child === t.child,
				a = 0,
				s = 0;
			if (r)
				for (var c = t.child; c !== null; )
					((a |= c.lanes | c.childLanes),
						(s |= c.subtreeFlags & 65011712),
						(s |= c.flags & 65011712),
						(c.return = t),
						(c = c.sibling));
			else
				for (c = t.child; c !== null; )
					((a |= c.lanes | c.childLanes), (s |= c.subtreeFlags), (s |= c.flags), (c.return = t), (c = c.sibling));
			return ((t.subtreeFlags |= s), (t.childLanes = a), r);
		}
		function bw(t, r, a) {
			var s = r.pendingProps;
			switch ((sf(r), r.tag)) {
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
						t !== null && (s = t.memoizedState.cache),
						r.memoizedState.cache !== s && (r.flags |= 2048),
						ii(Gt),
						Ue(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(lu(r)
								? li(r)
								: t === null || (t.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), of())),
						xt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						t === null
							? (li(r), d !== null ? (xt(r), jg(r, d)) : (xt(r), Wf(r, c, null, s, a)))
							: d
								? d !== t.memoizedState
									? (li(r), xt(r), jg(r, d))
									: (xt(r), (r.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && li(r), xt(r), Wf(r, c, t, s, a)),
						null
					);
				case 27:
					if ((st(r), (a = Se.current), (c = r.type), t !== null && r.stateNode != null))
						t.memoizedProps !== s && li(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(l(166));
							return (xt(r), null);
						}
						((t = de.current), lu(r) ? yv(r, t) : ((t = Zy(c, s, a)), (r.stateNode = t), li(r)));
					}
					return (xt(r), null);
				case 5:
					if ((st(r), (c = r.type), t !== null && r.stateNode != null)) t.memoizedProps !== s && li(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(l(166));
							return (xt(r), null);
						}
						if (((d = de.current), lu(r))) yv(r, d);
						else {
							var y = Eo(Se.current);
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
							((d[mt] = r), (d[un] = s));
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
							e: switch ((_n(d, c, s), c)) {
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
							s && li(r);
						}
					}
					return (xt(r), Wf(r, r.type, t === null ? null : t.memoizedProps, r.pendingProps, a), null);
				case 6:
					if (t && r.stateNode != null) t.memoizedProps !== s && li(r);
					else {
						if (typeof s != "string" && r.stateNode === null) throw Error(l(166));
						if (((t = Se.current), lu(r))) {
							if (((t = r.stateNode), (a = r.memoizedProps), (s = null), (c = yn), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[mt] = r),
								(t = !!(t.nodeValue === a || (s !== null && s.suppressHydrationWarning === !0) || Oy(t.nodeValue, a))),
								t || Vi(r, !0));
						} else ((t = Eo(t).createTextNode(s)), (t[mt] = r), (r.stateNode = t));
					}
					return (xt(r), null);
				case 31:
					if (((a = r.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = lu(r)), a !== null)) {
							if (t === null) {
								if (!s) throw Error(l(318));
								if (((t = r.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(557));
								t[mt] = r;
							} else (Aa(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(xt(r), (t = !1));
						} else
							((a = of()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return r.flags & 256 ? (tr(r), r) : (tr(r), null);
						if ((r.flags & 128) !== 0) throw Error(l(558));
					}
					return (xt(r), null);
				case 13:
					if (
						((s = r.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = lu(r)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(l(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(l(317));
								c[mt] = r;
							} else (Aa(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(xt(r), (c = !1));
						} else
							((c = of()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return r.flags & 256 ? (tr(r), r) : (tr(r), null);
					}
					return (
						tr(r),
						(r.flags & 128) !== 0
							? ((r.lanes = a), r)
							: ((a = s !== null),
								(t = t !== null && t.memoizedState !== null),
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
								a !== t && a && (r.child.flags |= 8192),
								so(r, r.updateQueue),
								xt(r),
								null)
					);
				case 4:
					return (Ue(), t === null && Cy(r.stateNode.containerInfo), xt(r), null);
				case 10:
					return (ii(r.type), xt(r), null);
				case 19:
					if ((j(Bt), (s = r.memoizedState), s === null)) return (xt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) As(s, !1);
						else {
							if (Ut !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = r.child; t !== null; ) {
									if (((d = Yl(t)), d !== null)) {
										for (
											r.flags |= 128,
												As(s, !1),
												t = d.updateQueue,
												r.updateQueue = t,
												so(r, t),
												r.subtreeFlags = 0,
												t = a,
												a = r.child;
											a !== null;
										)
											(dv(a, t), (a = a.sibling));
										return (le(Bt, (Bt.current & 1) | 2), Xe && ni(r, s.treeForkCount), r.child);
									}
									t = t.sibling;
								}
							s.tail !== null && ze() > ho && ((r.flags |= 128), (c = !0), As(s, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = Yl(d)), t !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(r.updateQueue = t),
									so(r, t),
									As(s, !0),
									s.tail === null && s.tailMode === "hidden" && !d.alternate && !Xe)
								)
									return (xt(r), null);
							} else
								2 * ze() - s.renderingStartTime > ho &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), As(s, !1), (r.lanes = 4194304));
						s.isBackwards
							? ((d.sibling = r.child), (r.child = d))
							: ((t = s.last), t !== null ? (t.sibling = d) : (r.child = d), (s.last = d));
					}
					return s.tail !== null
						? ((t = s.tail),
							(s.rendering = t),
							(s.tail = t.sibling),
							(s.renderingStartTime = ze()),
							(t.sibling = null),
							(a = Bt.current),
							le(Bt, c ? (a & 1) | 2 : a & 1),
							Xe && ni(r, s.treeForkCount),
							t)
						: (xt(r), null);
				case 22:
				case 23:
					return (
						tr(r),
						wf(),
						(s = r.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== s && (r.flags |= 8192) : s && (r.flags |= 8192),
						s
							? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (xt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
							: xt(r),
						(a = r.updateQueue),
						a !== null && so(r, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(s = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (s = r.memoizedState.cachePool.pool),
						s !== a && (r.flags |= 2048),
						t !== null && j(ka),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						r.memoizedState.cache !== a && (r.flags |= 2048),
						ii(Gt),
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
		function _w(t, r) {
			switch ((sf(r), r.tag)) {
				case 1:
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 3:
					return (
						ii(Gt),
						Ue(),
						(t = r.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((r.flags = (t & -65537) | 128), r) : null
					);
				case 26:
				case 27:
				case 5:
					return (st(r), null);
				case 31:
					if (r.memoizedState !== null) {
						if ((tr(r), r.alternate === null)) throw Error(l(340));
						Aa();
					}
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 13:
					if ((tr(r), (t = r.memoizedState), t !== null && t.dehydrated !== null)) {
						if (r.alternate === null) throw Error(l(340));
						Aa();
					}
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 19:
					return (j(Bt), null);
				case 4:
					return (Ue(), null);
				case 10:
					return (ii(r.type), null);
				case 22:
				case 23:
					return (
						tr(r),
						wf(),
						t !== null && j(ka),
						(t = r.flags),
						t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
					);
				case 24:
					return (ii(Gt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function qg(t, r) {
			switch ((sf(r), r.tag)) {
				case 3:
					(ii(Gt), Ue());
					break;
				case 26:
				case 27:
				case 5:
					st(r);
					break;
				case 4:
					Ue();
					break;
				case 31:
					r.memoizedState !== null && tr(r);
					break;
				case 13:
					tr(r);
					break;
				case 19:
					j(Bt);
					break;
				case 10:
					ii(r.type);
					break;
				case 22:
				case 23:
					(tr(r), wf(), t !== null && j(ka));
					break;
				case 24:
					ii(Gt);
			}
		}
		function Rs(t, r) {
			try {
				var a = r.updateQueue,
					s = a !== null ? a.lastEffect : null;
				if (s !== null) {
					var c = s.next;
					a = c;
					do {
						if ((a.tag & t) === t) {
							s = void 0;
							var d = a.create,
								y = a.inst;
							((s = d()), (y.destroy = s));
						}
						a = a.next;
					} while (a !== c);
				}
			} catch (T) {
				ct(r, r.return, T);
			}
		}
		function Ki(t, r, a) {
			try {
				var s = r.updateQueue,
					c = s !== null ? s.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					s = d;
					do {
						if ((s.tag & t) === t) {
							var y = s.inst,
								T = y.destroy;
							if (T !== void 0) {
								((y.destroy = void 0), (c = r));
								var z = a,
									G = T;
								try {
									G();
								} catch (re) {
									ct(c, z, re);
								}
							}
						}
						s = s.next;
					} while (s !== d);
				}
			} catch (re) {
				ct(r, r.return, re);
			}
		}
		function Ig(t) {
			var r = t.updateQueue;
			if (r !== null) {
				var a = t.stateNode;
				try {
					Mv(r, a);
				} catch (s) {
					ct(t, t.return, s);
				}
			}
		}
		function Lg(t, r, a) {
			((a.props = qa(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (s) {
				ct(t, r, s);
			}
		}
		function Cs(t, r) {
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
				ct(t, r, c);
			}
		}
		function Ur(t, r) {
			var a = t.ref,
				s = t.refCleanup;
			if (a !== null)
				if (typeof s == "function")
					try {
						s();
					} catch (c) {
						ct(t, r, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						ct(t, r, c);
					}
				else a.current = null;
		}
		function Ug(t) {
			var r = t.type,
				a = t.memoizedProps,
				s = t.stateNode;
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
				ct(t, t.return, c);
			}
		}
		function ed(t, r, a) {
			try {
				var s = t.stateNode;
				($w(s, t.type, a, r), (s[un] = r));
			} catch (c) {
				ct(t, t.return, c);
			}
		}
		function $g(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ea(t.type)) || t.tag === 4;
		}
		function td(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || $g(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && ea(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function nd(t, r, a) {
			var s = t.tag;
			if (s === 5 || s === 6)
				((t = t.stateNode),
					r
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, r)
						: ((r = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							r.appendChild(t),
							(a = a._reactRootContainer),
							a != null || r.onclick !== null || (r.onclick = lr)));
			else if (s !== 4 && (s === 27 && ea(t.type) && ((a = t.stateNode), (r = null)), (t = t.child), t !== null))
				for (nd(t, r, a), t = t.sibling; t !== null; ) (nd(t, r, a), (t = t.sibling));
		}
		function lo(t, r, a) {
			var s = t.tag;
			if (s === 5 || s === 6) ((t = t.stateNode), r ? a.insertBefore(t, r) : a.appendChild(t));
			else if (s !== 4 && (s === 27 && ea(t.type) && (a = t.stateNode), (t = t.child), t !== null))
				for (lo(t, r, a), t = t.sibling; t !== null; ) (lo(t, r, a), (t = t.sibling));
		}
		function Bg(t) {
			var r = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var s = t.type, c = r.attributes; c.length; ) r.removeAttributeNode(c[0]);
				(_n(r, s, a), (r[mt] = t), (r[un] = a));
			} catch (d) {
				ct(t, t.return, d);
			}
		}
		var oi = !1,
			Jt = !1,
			rd = !1,
			Vg = typeof WeakSet == "function" ? WeakSet : Set,
			dn = null;
		function Sw(t, r) {
			if (((t = t.containerInfo), (Ed = Mo), (t = rv(t)), Gc(t))) {
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
							var y = 0,
								T = -1,
								z = -1,
								G = 0,
								re = 0,
								ue = t,
								F = null;
							t: for (;;) {
								for (
									var W;
									ue !== a || (c !== 0 && ue.nodeType !== 3) || (T = y + c),
										ue !== d || (s !== 0 && ue.nodeType !== 3) || (z = y + s),
										ue.nodeType === 3 && (y += ue.nodeValue.length),
										(W = ue.firstChild) !== null;
								)
									((F = ue), (ue = W));
								for (;;) {
									if (ue === t) break t;
									if (
										(F === a && ++G === c && (T = y), F === d && ++re === s && (z = y), (W = ue.nextSibling) !== null)
									)
										break;
									((ue = F), (F = ue.parentNode));
								}
								ue = W;
							}
							a = T === -1 || z === -1 ? null : { start: T, end: z };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Td = { focusedElem: t, selectionRange: a }, Mo = !1, dn = r; dn !== null; )
				if (((r = dn), (t = r.child), (r.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = r), (dn = t));
				else
					for (; dn !== null; ) {
						switch (((r = dn), (d = r.alternate), (t = r.flags), r.tag)) {
							case 0:
								if ((t & 4) !== 0 && ((t = r.updateQueue), (t = t !== null ? t.events : null), t !== null))
									for (a = 0; a < t.length; a++) ((c = t[a]), (c.ref.impl = c.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((t & 1024) !== 0 && d !== null) {
									((t = void 0), (a = r), (c = d.memoizedProps), (d = d.memoizedState), (s = a.stateNode));
									try {
										var _e = qa(a.type, c);
										((t = s.getSnapshotBeforeUpdate(_e, d)), (s.__reactInternalSnapshotBeforeUpdate = t));
									} catch (Ae) {
										ct(a, a.return, Ae);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = r.stateNode.containerInfo), (a = t.nodeType), a === 9)) Rd(t);
									else if (a === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Rd(t);
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
						if (((t = r.sibling), t !== null)) {
							((t.return = r.return), (dn = t));
							break;
						}
						dn = r.return;
					}
		}
		function Zg(t, r, a) {
			var s = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(fi(t, a), s & 4 && Rs(5, a));
					break;
				case 1:
					if ((fi(t, a), s & 4))
						if (((t = a.stateNode), r === null))
							try {
								t.componentDidMount();
							} catch (y) {
								ct(a, a.return, y);
							}
						else {
							var c = qa(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								t.componentDidUpdate(c, r, t.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								ct(a, a.return, y);
							}
						}
					(s & 64 && Ig(a), s & 512 && Cs(a, a.return));
					break;
				case 3:
					if ((fi(t, a), s & 64 && ((t = a.updateQueue), t !== null))) {
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
							Mv(t, r);
						} catch (y) {
							ct(a, a.return, y);
						}
					}
					break;
				case 27:
					r === null && s & 4 && Bg(a);
				case 26:
				case 5:
					(fi(t, a), r === null && s & 4 && Ug(a), s & 512 && Cs(a, a.return));
					break;
				case 12:
					fi(t, a);
					break;
				case 31:
					(fi(t, a), s & 4 && Pg(t, a));
					break;
				case 13:
					(fi(t, a),
						s & 4 && Kg(t, a),
						s & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = Mw.bind(null, a)), Yw(t, a)))));
					break;
				case 22:
					if (((s = a.memoizedState !== null || oi), !s)) {
						((r = (r !== null && r.memoizedState !== null) || Jt), (c = oi));
						var d = Jt;
						((oi = s), (Jt = r) && !d ? di(t, a, (a.subtreeFlags & 8772) !== 0) : fi(t, a), (oi = c), (Jt = d));
					}
					break;
				case 30:
					break;
				default:
					fi(t, a);
			}
		}
		function Hg(t) {
			var r = t.alternate;
			(r !== null && ((t.alternate = null), Hg(r)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((r = t.stateNode), r !== null && ge(r)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var kt = null,
			$n = !1;
		function ci(t, r, a) {
			for (a = a.child; a !== null; ) (Qg(t, r, a), (a = a.sibling));
		}
		function Qg(t, r, a) {
			if (bt && typeof bt.onCommitFiberUnmount == "function")
				try {
					bt.onCommitFiberUnmount(vn, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(Jt || Ur(a, r),
						ci(t, r, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					Jt || Ur(a, r);
					var s = kt,
						c = $n;
					(ea(a.type) && ((kt = a.stateNode), ($n = !1)), ci(t, r, a), Is(a.stateNode), (kt = s), ($n = c));
					break;
				case 5:
					Jt || Ur(a, r);
				case 6:
					if (((s = kt), (c = $n), (kt = null), ci(t, r, a), (kt = s), ($n = c), kt !== null))
						if ($n)
							try {
								(kt.nodeType === 9 ? kt.body : kt.nodeName === "HTML" ? kt.ownerDocument.body : kt).removeChild(
									a.stateNode,
								);
							} catch (d) {
								ct(a, r, d);
							}
						else
							try {
								kt.removeChild(a.stateNode);
							} catch (d) {
								ct(a, r, d);
							}
					break;
				case 18:
					kt !== null &&
						($n
							? ((t = kt),
								Ly(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								ku(t))
							: Ly(kt, a.stateNode));
					break;
				case 4:
					((s = kt), (c = $n), (kt = a.stateNode.containerInfo), ($n = !0), ci(t, r, a), (kt = s), ($n = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Ki(2, a, r), Jt || Ki(4, a, r), ci(t, r, a));
					break;
				case 1:
					(Jt || (Ur(a, r), (s = a.stateNode), typeof s.componentWillUnmount == "function" && Lg(a, r, s)),
						ci(t, r, a));
					break;
				case 21:
					ci(t, r, a);
					break;
				case 22:
					((Jt = (s = Jt) || a.memoizedState !== null), ci(t, r, a), (Jt = s));
					break;
				default:
					ci(t, r, a);
			}
		}
		function Pg(t, r) {
			if (r.memoizedState === null && ((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					ku(t);
				} catch (a) {
					ct(r, r.return, a);
				}
			}
		}
		function Kg(t, r) {
			if (
				r.memoizedState === null &&
				((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					ku(t);
				} catch (a) {
					ct(r, r.return, a);
				}
		}
		function ww(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var r = t.stateNode;
					return (r === null && (r = t.stateNode = new Vg()), r);
				case 22:
					return ((t = t.stateNode), (r = t._retryCache), r === null && (r = t._retryCache = new Vg()), r);
				default:
					throw Error(l(435, t.tag));
			}
		}
		function oo(t, r) {
			var a = ww(t);
			r.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = Nw.bind(null, t, s);
					s.then(c, c);
				}
			});
		}
		function Bn(t, r) {
			var a = r.deletions;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s],
						d = t,
						y = r,
						T = y;
					e: for (; T !== null; ) {
						switch (T.tag) {
							case 27:
								if (ea(T.type)) {
									((kt = T.stateNode), ($n = !1));
									break e;
								}
								break;
							case 5:
								((kt = T.stateNode), ($n = !1));
								break e;
							case 3:
							case 4:
								((kt = T.stateNode.containerInfo), ($n = !0));
								break e;
						}
						T = T.return;
					}
					if (kt === null) throw Error(l(160));
					(Qg(d, y, c), (kt = null), ($n = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (r.subtreeFlags & 13886) for (r = r.child; r !== null; ) (Yg(r, t), (r = r.sibling));
		}
		var Cr = null;
		function Yg(t, r) {
			var a = t.alternate,
				s = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(Bn(r, t), Vn(t), s & 4 && (Ki(3, t, t.return), Rs(3, t), Ki(5, t, t.return)));
					break;
				case 1:
					(Bn(r, t),
						Vn(t),
						s & 512 && (Jt || a === null || Ur(a, a.return)),
						s & 64 &&
							oi &&
							((t = t.updateQueue),
							t !== null &&
								((s = t.callbacks),
								s !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? s : a.concat(s))))));
					break;
				case 26:
					var c = Cr;
					if ((Bn(r, t), Vn(t), s & 512 && (Jt || a === null || Ur(a, a.return)), s & 4)) {
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
														d[ee] ||
														d[mt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(s)), c.head.insertBefore(d, c.querySelector("head > title"))),
													_n(d, s, a),
													(d[mt] = t),
													rt(d),
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
												((d = c.createElement(s)), _n(d, s, a), c.head.appendChild(d));
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
												((d = c.createElement(s)), _n(d, s, a), c.head.appendChild(d));
												break;
											default:
												throw Error(l(468, s));
										}
										((d[mt] = t), rt(d), (s = d));
									}
									t.stateNode = s;
								} else Fy(c, t.type, t.stateNode);
							else t.stateNode = Yy(c, s, t.memoizedProps);
						else
							d !== s
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									s === null ? Fy(c, t.type, t.stateNode) : Yy(c, s, t.memoizedProps))
								: s === null && t.stateNode !== null && ed(t, t.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(Bn(r, t),
						Vn(t),
						s & 512 && (Jt || a === null || Ur(a, a.return)),
						a !== null && s & 4 && ed(t, t.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((Bn(r, t), Vn(t), s & 512 && (Jt || a === null || Ur(a, a.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							Li(c, "");
						} catch (_e) {
							ct(t, t.return, _e);
						}
					}
					(s & 4 && t.stateNode != null && ((c = t.memoizedProps), ed(t, c, a !== null ? a.memoizedProps : c)),
						s & 1024 && (rd = !0));
					break;
				case 6:
					if ((Bn(r, t), Vn(t), s & 4)) {
						if (t.stateNode === null) throw Error(l(162));
						((s = t.memoizedProps), (a = t.stateNode));
						try {
							a.nodeValue = s;
						} catch (_e) {
							ct(t, t.return, _e);
						}
					}
					break;
				case 3:
					if (
						((Ao = null),
						(c = Cr),
						(Cr = To(r.containerInfo)),
						Bn(r, t),
						(Cr = c),
						Vn(t),
						s & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							ku(r.containerInfo);
						} catch (_e) {
							ct(t, t.return, _e);
						}
					rd && ((rd = !1), Gg(t));
					break;
				case 4:
					((s = Cr), (Cr = To(t.stateNode.containerInfo)), Bn(r, t), Vn(t), (Cr = s));
					break;
				case 12:
					(Bn(r, t), Vn(t));
					break;
				case 31:
					(Bn(r, t), Vn(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), oo(t, s))));
					break;
				case 13:
					(Bn(r, t),
						Vn(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(fo = ze()),
						s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), oo(t, s))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var z = a !== null && a.memoizedState !== null,
						G = oi,
						re = Jt;
					if (((oi = G || c), (Jt = re || z), Bn(r, t), (Jt = re), (oi = G), Vn(t), s & 8192))
						e: for (
							r = t.stateNode,
								r._visibility = c ? r._visibility & -2 : r._visibility | 1,
								c && (a === null || z || oi || Jt || Ia(t)),
								a = null,
								r = t;
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
												F = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
											T.style.display = F == null || typeof F == "boolean" ? "" : ("" + F).trim();
										}
									} catch (_e) {
										ct(z, z.return, _e);
									}
								}
							} else if (r.tag === 6) {
								if (a === null) {
									z = r;
									try {
										z.stateNode.nodeValue = c ? "" : z.memoizedProps;
									} catch (_e) {
										ct(z, z.return, _e);
									}
								}
							} else if (r.tag === 18) {
								if (a === null) {
									z = r;
									try {
										var W = z.stateNode;
										c ? Uy(W, !0) : Uy(z.stateNode, !1);
									} catch (_e) {
										ct(z, z.return, _e);
									}
								}
							} else if (((r.tag !== 22 && r.tag !== 23) || r.memoizedState === null || r === t) && r.child !== null) {
								((r.child.return = r), (r = r.child));
								continue;
							}
							if (r === t) break e;
							for (; r.sibling === null; ) {
								if (r.return === null || r.return === t) break e;
								(a === r && (a = null), (r = r.return));
							}
							(a === r && (a = null), (r.sibling.return = r.return), (r = r.sibling));
						}
					s & 4 &&
						((s = t.updateQueue), s !== null && ((a = s.retryQueue), a !== null && ((s.retryQueue = null), oo(t, a))));
					break;
				case 19:
					(Bn(r, t), Vn(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), oo(t, s))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(Bn(r, t), Vn(t));
			}
		}
		function Vn(t) {
			var r = t.flags;
			if (r & 2) {
				try {
					for (var a, s = t.return; s !== null; ) {
						if ($g(s)) {
							a = s;
							break;
						}
						s = s.return;
					}
					if (a == null) throw Error(l(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							lo(t, td(t), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Li(d, ""), (a.flags &= -33)), lo(t, td(t), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							nd(t, td(t), y);
							break;
						default:
							throw Error(l(161));
					}
				} catch (T) {
					ct(t, t.return, T);
				}
				t.flags &= -3;
			}
			r & 4096 && (t.flags &= -4097);
		}
		function Gg(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var r = t;
					(Gg(r), r.tag === 5 && r.flags & 1024 && r.stateNode.reset(), (t = t.sibling));
				}
		}
		function fi(t, r) {
			if (r.subtreeFlags & 8772) for (r = r.child; r !== null; ) (Zg(t, r.alternate, r), (r = r.sibling));
		}
		function Ia(t) {
			for (t = t.child; t !== null; ) {
				var r = t;
				switch (r.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Ki(4, r, r.return), Ia(r));
						break;
					case 1:
						Ur(r, r.return);
						var a = r.stateNode;
						(typeof a.componentWillUnmount == "function" && Lg(r, r.return, a), Ia(r));
						break;
					case 27:
						Is(r.stateNode);
					case 26:
					case 5:
						(Ur(r, r.return), Ia(r));
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
				t = t.sibling;
			}
		}
		function di(t, r, a) {
			for (a = a && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
				var s = r.alternate,
					c = t,
					d = r,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(di(c, d, a), Rs(4, d));
						break;
					case 1:
						if ((di(c, d, a), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (G) {
								ct(s, s.return, G);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var T = s.stateNode;
							try {
								var z = c.shared.hiddenCallbacks;
								if (z !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < z.length; c++) kv(z[c], T);
							} catch (G) {
								ct(s, s.return, G);
							}
						}
						(a && y & 64 && Ig(d), Cs(d, d.return));
						break;
					case 27:
						Bg(d);
					case 26:
					case 5:
						(di(c, d, a), a && s === null && y & 4 && Ug(d), Cs(d, d.return));
						break;
					case 12:
						di(c, d, a);
						break;
					case 31:
						(di(c, d, a), a && y & 4 && Pg(c, d));
						break;
					case 13:
						(di(c, d, a), a && y & 4 && Kg(c, d));
						break;
					case 22:
						(d.memoizedState === null && di(c, d, a), Cs(d, d.return));
						break;
					case 30:
						break;
					default:
						di(c, d, a);
				}
				r = r.sibling;
			}
		}
		function id(t, r) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				r.memoizedState !== null && r.memoizedState.cachePool !== null && (t = r.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && ms(a)));
		}
		function ad(t, r) {
			((t = null),
				r.alternate !== null && (t = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== t && (r.refCount++, t != null && ms(t)));
		}
		function kr(t, r, a, s) {
			if (r.subtreeFlags & 10256) for (r = r.child; r !== null; ) (Fg(t, r, a, s), (r = r.sibling));
		}
		function Fg(t, r, a, s) {
			var c = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(kr(t, r, a, s), c & 2048 && Rs(9, r));
					break;
				case 1:
					kr(t, r, a, s);
					break;
				case 3:
					(kr(t, r, a, s),
						c & 2048 &&
							((t = null),
							r.alternate !== null && (t = r.alternate.memoizedState.cache),
							(r = r.memoizedState.cache),
							r !== t && (r.refCount++, t != null && ms(t))));
					break;
				case 12:
					if (c & 2048) {
						(kr(t, r, a, s), (t = r.stateNode));
						try {
							var d = r.memoizedProps,
								y = d.id,
								T = d.onPostCommit;
							typeof T == "function" && T(y, r.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (z) {
							ct(r, r.return, z);
						}
					} else kr(t, r, a, s);
					break;
				case 31:
					kr(t, r, a, s);
					break;
				case 13:
					kr(t, r, a, s);
					break;
				case 23:
					break;
				case 22:
					((d = r.stateNode),
						(y = r.alternate),
						r.memoizedState !== null
							? d._visibility & 2
								? kr(t, r, a, s)
								: ks(t, r)
							: d._visibility & 2
								? kr(t, r, a, s)
								: ((d._visibility |= 2), pu(t, r, a, s, (r.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && id(y, r));
					break;
				case 24:
					(kr(t, r, a, s), c & 2048 && ad(r.alternate, r));
					break;
				default:
					kr(t, r, a, s);
			}
		}
		function pu(t, r, a, s, c) {
			for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null; ) {
				var d = t,
					y = r,
					T = a,
					z = s,
					G = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(pu(d, y, T, z, c), Rs(8, y));
						break;
					case 23:
						break;
					case 22:
						var re = y.stateNode;
						(y.memoizedState !== null
							? re._visibility & 2
								? pu(d, y, T, z, c)
								: ks(d, y)
							: ((re._visibility |= 2), pu(d, y, T, z, c)),
							c && G & 2048 && id(y.alternate, y));
						break;
					case 24:
						(pu(d, y, T, z, c), c && G & 2048 && ad(y.alternate, y));
						break;
					default:
						pu(d, y, T, z, c);
				}
				r = r.sibling;
			}
		}
		function ks(t, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null; ) {
					var a = t,
						s = r,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(ks(a, s), c & 2048 && id(s.alternate, s));
							break;
						case 24:
							(ks(a, s), c & 2048 && ad(s.alternate, s));
							break;
						default:
							ks(a, s);
					}
					r = r.sibling;
				}
		}
		var Ms = 8192;
		function bu(t, r, a) {
			if (t.subtreeFlags & Ms) for (t = t.child; t !== null; ) (Xg(t, r, a), (t = t.sibling));
		}
		function Xg(t, r, a) {
			switch (t.tag) {
				case 26:
					(bu(t, r, a), t.flags & Ms && t.memoizedState !== null && u1(a, Cr, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					bu(t, r, a);
					break;
				case 3:
				case 4:
					var s = Cr;
					((Cr = To(t.stateNode.containerInfo)), bu(t, r, a), (Cr = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = Ms), (Ms = 16777216), bu(t, r, a), (Ms = s)) : bu(t, r, a));
					break;
				default:
					bu(t, r, a);
			}
		}
		function Jg(t) {
			var r = t.alternate;
			if (r !== null && ((t = r.child), t !== null)) {
				r.child = null;
				do ((r = t.sibling), (t.sibling = null), (t = r));
				while (t !== null);
			}
		}
		function Ns(t) {
			var r = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((dn = s), ey(s, t));
					}
				Jg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Wg(t), (t = t.sibling));
		}
		function Wg(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Ns(t), t.flags & 2048 && Ki(9, t, t.return));
					break;
				case 3:
					Ns(t);
					break;
				case 12:
					Ns(t);
					break;
				case 22:
					var r = t.stateNode;
					t.memoizedState !== null && r._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((r._visibility &= -3), co(t))
						: Ns(t);
					break;
				default:
					Ns(t);
			}
		}
		function co(t) {
			var r = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((dn = s), ey(s, t));
					}
				Jg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((r = t), r.tag)) {
					case 0:
					case 11:
					case 15:
						(Ki(8, r, r.return), co(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), co(r)));
						break;
					default:
						co(r);
				}
				t = t.sibling;
			}
		}
		function ey(t, r) {
			for (; dn !== null; ) {
				var a = dn;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						Ki(8, a, r);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var s = a.memoizedState.cachePool.pool;
							s != null && s.refCount++;
						}
						break;
					case 24:
						ms(a.memoizedState.cache);
				}
				if (((s = a.child), s !== null)) ((s.return = a), (dn = s));
				else
					e: for (a = t; dn !== null; ) {
						s = dn;
						var c = s.sibling,
							d = s.return;
						if ((Hg(s), s === a)) {
							dn = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (dn = c));
							break e;
						}
						dn = d;
					}
			}
		}
		var Ew = {
				getCacheForType: function (t) {
					var r = pn(Gt),
						a = r.data.get(t);
					return (a === void 0 && ((a = t()), r.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return pn(Gt).controller.signal;
				},
			},
			Tw = typeof WeakMap == "function" ? WeakMap : Map,
			it = 0,
			_t = null,
			Be = null,
			Pe = 0,
			ot = 0,
			nr = null,
			Yi = !1,
			_u = !1,
			ud = !1,
			hi = 0,
			Ut = 0,
			Gi = 0,
			La = 0,
			sd = 0,
			rr = 0,
			Su = 0,
			Os = null,
			Zn = null,
			ld = !1,
			fo = 0,
			ty = 0,
			ho = 1 / 0,
			mo = null,
			Fi = null,
			ln = 0,
			Xi = null,
			wu = null,
			mi = 0,
			od = 0,
			cd = null,
			ny = null,
			zs = 0,
			fd = null;
		function vr() {
			return (it & 2) !== 0 && Pe !== 0 ? Pe & -Pe : V.T !== null ? yd() : Xn();
		}
		function ry() {
			if (rr === 0)
				if ((Pe & 536870912) === 0 || Xe) {
					var t = Pt;
					((Pt <<= 1), (Pt & 3932160) === 0 && (Pt = 262144), (rr = t));
				} else rr = 536870912;
			return ((t = er.current), t !== null && (t.flags |= 32), rr);
		}
		function Hn(t, r, a) {
			(((t === _t && (ot === 2 || ot === 9)) || t.cancelPendingCommit !== null) && (Eu(t, 0), Ji(t, Pe, rr, !1)),
				zr(t, a),
				((it & 2) === 0 || t !== _t) &&
					(t === _t && ((it & 2) === 0 && (La |= a), Ut === 4 && Ji(t, Pe, rr, !1)), vi(t)));
		}
		function iy(t, r, a) {
			if ((it & 6) !== 0) throw Error(l(327));
			var s = (!a && (r & 127) === 0 && (r & t.expiredLanes) === 0) || ht(t, r),
				c = s ? Rw(t, r) : hd(t, r, !0),
				d = s;
			do {
				if (c === 0) {
					_u && !s && Ji(t, r, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !xw(a))) {
						((c = hd(t, r, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = r), t.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = t.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							r = y;
							e: {
								var T = t;
								c = Os;
								var z = T.current.memoizedState.isDehydrated;
								if ((z && (Eu(T, y).flags |= 256), (y = hd(T, y, !1)), y !== 2)) {
									if (ud && !z) {
										((T.errorRecoveryDisabledLanes |= d), (La |= d), (c = 4));
										break e;
									}
									((d = Zn), (Zn = c), d !== null && (Zn === null ? (Zn = d) : Zn.push.apply(Zn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Eu(t, 0), Ji(t, r, 0, !0));
						break;
					}
					e: {
						switch (((s = t), (d = c), d)) {
							case 0:
							case 1:
								throw Error(l(345));
							case 4:
								if ((r & 4194048) !== r) break;
							case 6:
								Ji(s, r, rr, !Yi);
								break e;
							case 2:
								Zn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(l(329));
						}
						if ((r & 62914560) === r && ((c = fo + 300 - ze()), 10 < c)) {
							if ((Ji(s, r, rr, !Yi), zt(s, 0, !0) !== 0)) break e;
							((mi = r),
								(s.timeoutHandle = qy(ay.bind(null, s, a, Zn, mo, ld, r, rr, La, Su, Yi, d, "Throttled", -0, 0), c)));
							break e;
						}
						ay(s, a, Zn, mo, ld, r, rr, La, Su, Yi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			vi(t);
		}
		function ay(t, r, a, s, c, d, y, T, z, G, re, ue, F, W) {
			if (((t.timeoutHandle = -1), (ue = r.subtreeFlags), ue & 8192 || (ue & 16785408) === 16785408)) {
				((ue = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: lr,
				}),
					Xg(r, d, ue));
				var _e = (d & 62914560) === d ? fo - ze() : (d & 4194048) === d ? ty - ze() : 0;
				if (((_e = s1(ue, _e)), _e !== null)) {
					((mi = d),
						(t.cancelPendingCommit = _e(hy.bind(null, t, r, d, a, s, c, y, T, z, re, ue, null, F, W))),
						Ji(t, d, y, !G));
					return;
				}
			}
			hy(t, r, d, a, s, c, y, T, z);
		}
		function xw(t) {
			for (var r = t; ; ) {
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
							if (!Jn(d(), c)) return !1;
						} catch {
							return !1;
						}
					}
				if (((a = r.child), r.subtreeFlags & 16384 && a !== null)) ((a.return = r), (r = a));
				else {
					if (r === t) break;
					for (; r.sibling === null; ) {
						if (r.return === null || r.return === t) return !0;
						r = r.return;
					}
					((r.sibling.return = r.return), (r = r.sibling));
				}
			}
			return !0;
		}
		function Ji(t, r, a, s) {
			((r &= ~sd),
				(r &= ~La),
				(t.suspendedLanes |= r),
				(t.pingedLanes &= ~r),
				s && (t.warmLanes |= r),
				(s = t.expirationTimes));
			for (var c = r; 0 < c; ) {
				var d = 31 - It(c),
					y = 1 << d;
				((s[d] = -1), (c &= ~y));
			}
			a !== 0 && Tr(t, a, r);
		}
		function vo() {
			return (it & 6) === 0 ? (Ds(0, !1), !1) : !0;
		}
		function dd() {
			if (Be !== null) {
				if (ot === 0) var t = Be.return;
				else ((t = Be), (ri = Ra = null), Cf(t), (hu = null), (gs = 0), (t = Be));
				for (; t !== null; ) (qg(t.alternate, t), (t = t.return));
				Be = null;
			}
		}
		function Eu(t, r) {
			var a = t.timeoutHandle;
			(a !== -1 && ((t.timeoutHandle = -1), Zw(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(mi = 0),
				dd(),
				(_t = t),
				(Be = a = ti(t.current, null)),
				(Pe = r),
				(ot = 0),
				(nr = null),
				(Yi = !1),
				(_u = ht(t, r)),
				(ud = !1),
				(Su = rr = sd = La = Gi = Ut = 0),
				(Zn = Os = null),
				(ld = !1),
				(r & 8) !== 0 && (r |= r & 32));
			var s = t.entangledLanes;
			if (s !== 0)
				for (t = t.entanglements, s &= r; 0 < s; ) {
					var c = 31 - It(s),
						d = 1 << c;
					((r |= t[c]), (s &= ~d));
				}
			return ((hi = r), jl(), a);
		}
		function uy(t, r) {
			((Ie = null),
				(V.H = Ts),
				r === du || r === Zl
					? ((r = xv()), (ot = 3))
					: r === gf
						? ((r = xv()), (ot = 4))
						: (ot = r === Hf ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(nr = r),
				Be === null && ((Ut = 1), ro(t, cr(r, t.current))));
		}
		function sy() {
			var t = er.current;
			return t === null
				? !0
				: (Pe & 4194048) === Pe
					? mr === null
					: (Pe & 62914560) === Pe || (Pe & 536870912) !== 0
						? t === mr
						: !1;
		}
		function ly() {
			var t = V.H;
			return ((V.H = Ts), t === null ? Ts : t);
		}
		function oy() {
			var t = V.A;
			return ((V.A = Ew), t);
		}
		function go() {
			((Ut = 4),
				Yi || ((Pe & 4194048) !== Pe && er.current !== null) || (_u = !0),
				((Gi & 134217727) === 0 && (La & 134217727) === 0) || _t === null || Ji(_t, Pe, rr, !1));
		}
		function hd(t, r, a) {
			var s = it;
			it |= 2;
			var c = ly(),
				d = oy();
			((_t !== t || Pe !== r) && ((mo = null), Eu(t, r)), (r = !1));
			var y = Ut;
			e: do
				try {
					if (ot !== 0 && Be !== null) {
						var T = Be,
							z = nr;
						switch (ot) {
							case 8:
								(dd(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								er.current === null && (r = !0);
								var G = ot;
								if (((ot = 0), (nr = null), Tu(t, T, z, G), a && _u)) {
									y = 0;
									break e;
								}
								break;
							default:
								((G = ot), (ot = 0), (nr = null), Tu(t, T, z, G));
						}
					}
					(Aw(), (y = Ut));
					break;
				} catch (re) {
					uy(t, re);
				}
			while (!0);
			return (
				r && t.shellSuspendCounter++,
				(ri = Ra = null),
				(it = s),
				(V.H = c),
				(V.A = d),
				Be === null && ((_t = null), (Pe = 0), jl()),
				y
			);
		}
		function Aw() {
			for (; Be !== null; ) cy(Be);
		}
		function Rw(t, r) {
			var a = it;
			it |= 2;
			var s = ly(),
				c = oy();
			_t !== t || Pe !== r ? ((mo = null), (ho = ze() + 500), Eu(t, r)) : (_u = ht(t, r));
			e: do
				try {
					if (ot !== 0 && Be !== null) {
						r = Be;
						var d = nr;
						t: switch (ot) {
							case 1:
								((ot = 0), (nr = null), Tu(t, r, d, 1));
								break;
							case 2:
							case 9:
								if (Ev(d)) {
									((ot = 0), (nr = null), fy(r));
									break;
								}
								((r = function () {
									((ot !== 2 && ot !== 9) || _t !== t || (ot = 7), vi(t));
								}),
									d.then(r, r));
								break e;
							case 3:
								ot = 7;
								break e;
							case 4:
								ot = 5;
								break e;
							case 7:
								Ev(d) ? ((ot = 0), (nr = null), fy(r)) : ((ot = 0), (nr = null), Tu(t, r, d, 7));
								break;
							case 5:
								var y = null;
								switch (Be.tag) {
									case 26:
										y = Be.memoizedState;
									case 5:
									case 27:
										var T = Be;
										if (y ? Xy(y) : T.stateNode.complete) {
											((ot = 0), (nr = null));
											var z = T.sibling;
											if (z !== null) Be = z;
											else {
												var G = T.return;
												G !== null ? ((Be = G), yo(G)) : (Be = null);
											}
											break t;
										}
								}
								((ot = 0), (nr = null), Tu(t, r, d, 5));
								break;
							case 6:
								((ot = 0), (nr = null), Tu(t, r, d, 6));
								break;
							case 8:
								(dd(), (Ut = 6));
								break e;
							default:
								throw Error(l(462));
						}
					}
					Cw();
					break;
				} catch (re) {
					uy(t, re);
				}
			while (!0);
			return ((ri = Ra = null), (V.H = s), (V.A = c), (it = a), Be !== null ? 0 : ((_t = null), (Pe = 0), jl(), Ut));
		}
		function Cw() {
			for (; Be !== null && !ke(); ) cy(Be);
		}
		function cy(t) {
			var r = Dg(t.alternate, t, hi);
			((t.memoizedProps = t.pendingProps), r === null ? yo(t) : (Be = r));
		}
		function fy(t) {
			var r = t,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = Cg(a, r, r.pendingProps, r.type, void 0, Pe);
					break;
				case 11:
					r = Cg(a, r, r.pendingProps, r.type.render, r.ref, Pe);
					break;
				case 5:
					Cf(r);
				default:
					(qg(a, r), (r = Be = dv(r, hi)), (r = Dg(a, r, hi)));
			}
			((t.memoizedProps = t.pendingProps), r === null ? yo(t) : (Be = r));
		}
		function Tu(t, r, a, s) {
			((ri = Ra = null), Cf(r), (hu = null), (gs = 0));
			var c = r.return;
			try {
				if (gw(t, c, r, a, Pe)) {
					((Ut = 1), ro(t, cr(a, t.current)), (Be = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Be = c), d);
				((Ut = 1), ro(t, cr(a, t.current)), (Be = null));
				return;
			}
			r.flags & 32768
				? (Xe || s === 1
						? (t = !0)
						: _u || (Pe & 536870912) !== 0
							? (t = !1)
							: ((Yi = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = er.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					dy(r, t))
				: yo(r);
		}
		function yo(t) {
			var r = t;
			do {
				if ((r.flags & 32768) !== 0) {
					dy(r, Yi);
					return;
				}
				t = r.return;
				var a = bw(r.alternate, r, hi);
				if (a !== null) {
					Be = a;
					return;
				}
				if (((r = r.sibling), r !== null)) {
					Be = r;
					return;
				}
				Be = r = t;
			} while (r !== null);
			Ut === 0 && (Ut = 5);
		}
		function dy(t, r) {
			do {
				var a = _w(t.alternate, t);
				if (a !== null) {
					((a.flags &= 32767), (Be = a));
					return;
				}
				if (
					((a = t.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!r && ((t = t.sibling), t !== null))
				) {
					Be = t;
					return;
				}
				Be = t = a;
			} while (t !== null);
			((Ut = 6), (Be = null));
		}
		function hy(t, r, a, s, c, d, y, T, z) {
			t.cancelPendingCommit = null;
			do po();
			while (ln !== 0);
			if ((it & 6) !== 0) throw Error(l(327));
			if (r !== null) {
				if (r === t.current) throw Error(l(177));
				if (
					((d = r.lanes | r.childLanes),
					(d |= ef),
					Er(t, a, d, y, T, z),
					t === _t && ((Be = _t = null), (Pe = 0)),
					(wu = r),
					(Xi = t),
					(mi = a),
					(od = d),
					(cd = c),
					(ny = s),
					(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							Ow(Ot, function () {
								return (py(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(s = (r.flags & 13878) !== 0),
					(r.subtreeFlags & 13878) !== 0 || s)
				) {
					((s = V.T), (V.T = null), (c = Q.p), (Q.p = 2), (y = it), (it |= 4));
					try {
						Sw(t, r, a);
					} finally {
						((it = y), (Q.p = c), (V.T = s));
					}
				}
				((ln = 1), my(), vy(), gy());
			}
		}
		function my() {
			if (ln === 1) {
				ln = 0;
				var t = Xi,
					r = wu,
					a = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || a) {
					((a = V.T), (V.T = null));
					var s = Q.p;
					Q.p = 2;
					var c = it;
					it |= 4;
					try {
						Yg(r, t);
						var d = Td,
							y = rv(t.containerInfo),
							T = d.focusedElem,
							z = d.selectionRange;
						if (y !== T && T && T.ownerDocument && nv(T.ownerDocument.documentElement, T)) {
							if (z !== null && Gc(T)) {
								var G = z.start,
									re = z.end;
								if ((re === void 0 && (re = G), "selectionStart" in T))
									((T.selectionStart = G), (T.selectionEnd = Math.min(re, T.value.length)));
								else {
									var ue = T.ownerDocument || document,
										F = (ue && ue.defaultView) || window;
									if (F.getSelection) {
										var W = F.getSelection(),
											_e = T.textContent.length,
											Ae = Math.min(z.start, _e),
											yt = z.end === void 0 ? Ae : Math.min(z.end, _e);
										!W.extend && Ae > yt && ((y = yt), (yt = Ae), (Ae = y));
										var Z = tv(T, Ae),
											U = tv(T, yt);
										if (
											Z &&
											U &&
											(W.rangeCount !== 1 ||
												W.anchorNode !== Z.node ||
												W.anchorOffset !== Z.offset ||
												W.focusNode !== U.node ||
												W.focusOffset !== U.offset)
										) {
											var K = ue.createRange();
											(K.setStart(Z.node, Z.offset),
												W.removeAllRanges(),
												Ae > yt
													? (W.addRange(K), W.extend(U.node, U.offset))
													: (K.setEnd(U.node, U.offset), W.addRange(K)));
										}
									}
								}
							}
							for (ue = [], W = T; (W = W.parentNode); )
								W.nodeType === 1 && ue.push({ element: W, left: W.scrollLeft, top: W.scrollTop });
							for (typeof T.focus == "function" && T.focus(), T = 0; T < ue.length; T++) {
								var ie = ue[T];
								((ie.element.scrollLeft = ie.left), (ie.element.scrollTop = ie.top));
							}
						}
						((Mo = !!Ed), (Td = Ed = null));
					} finally {
						((it = c), (Q.p = s), (V.T = a));
					}
				}
				((t.current = r), (ln = 2));
			}
		}
		function vy() {
			if (ln === 2) {
				ln = 0;
				var t = Xi,
					r = wu,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = V.T), (V.T = null));
					var s = Q.p;
					Q.p = 2;
					var c = it;
					it |= 4;
					try {
						Zg(t, r.alternate, r);
					} finally {
						((it = c), (Q.p = s), (V.T = a));
					}
				}
				ln = 3;
			}
		}
		function gy() {
			if (ln === 4 || ln === 3) {
				((ln = 0), St());
				var t = Xi,
					r = wu,
					a = mi,
					s = ny;
				(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
					? (ln = 5)
					: ((ln = 0), (wu = Xi = null), yy(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (Fi = null), xr(a), (r = r.stateNode), bt && typeof bt.onCommitFiberRoot == "function"))
					try {
						bt.onCommitFiberRoot(vn, r, void 0, (r.current.flags & 128) === 128);
					} catch {}
				if (s !== null) {
					((r = V.T), (c = Q.p), (Q.p = 2), (V.T = null));
					try {
						for (var d = t.onRecoverableError, y = 0; y < s.length; y++) {
							var T = s[y];
							d(T.value, { componentStack: T.stack });
						}
					} finally {
						((V.T = r), (Q.p = c));
					}
				}
				((mi & 3) !== 0 && po(),
					vi(t),
					(c = t.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (t === fd ? zs++ : ((zs = 0), (fd = t))) : (zs = 0),
					Ds(0, !1));
			}
		}
		function yy(t, r) {
			(t.pooledCacheLanes &= r) === 0 && ((r = t.pooledCache), r != null && ((t.pooledCache = null), ms(r)));
		}
		function po() {
			return (my(), vy(), gy(), py());
		}
		function py() {
			if (ln !== 5) return !1;
			var t = Xi,
				r = od;
			od = 0;
			var a = xr(mi),
				s = V.T,
				c = Q.p;
			try {
				((Q.p = 32 > a ? 32 : a), (V.T = null), (a = cd), (cd = null));
				var d = Xi,
					y = mi;
				if (((ln = 0), (wu = Xi = null), (mi = 0), (it & 6) !== 0)) throw Error(l(331));
				var T = it;
				if (
					((it |= 4),
					Wg(d.current),
					Fg(d, d.current, y, a),
					(it = T),
					Ds(0, !1),
					bt && typeof bt.onPostCommitFiberRoot == "function")
				)
					try {
						bt.onPostCommitFiberRoot(vn, d);
					} catch {}
				return !0;
			} finally {
				((Q.p = c), (V.T = s), yy(t, r));
			}
		}
		function by(t, r, a) {
			((r = cr(a, r)), (r = Zf(t.stateNode, r, 2)), (t = Da(t, r, 2)), t !== null && (zr(t, 2), vi(t)));
		}
		function ct(t, r, a) {
			if (t.tag === 3) by(t, t, a);
			else
				for (; r !== null; ) {
					if (r.tag === 3) {
						by(r, t, a);
						break;
					} else if (r.tag === 1) {
						var s = r.stateNode;
						if (
							typeof r.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Fi === null || !Fi.has(s)))
						) {
							((t = cr(a, t)), (a = _g(2)), (s = Da(r, a, 2)), s !== null && (Sg(a, s, r, t), zr(s, 2), vi(s)));
							break;
						}
					}
					r = r.return;
				}
		}
		function md(t, r, a) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new Tw();
				var c = new Set();
				s.set(r, c);
			} else ((c = s.get(r)), c === void 0 && ((c = new Set()), s.set(r, c)));
			c.has(a) || ((ud = !0), c.add(a), (t = kw.bind(null, t, r, a)), r.then(t, t));
		}
		function kw(t, r, a) {
			var s = t.pingCache;
			(s !== null && s.delete(r),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				_t === t &&
					(Pe & a) === a &&
					(Ut === 4 || (Ut === 3 && (Pe & 62914560) === Pe && 300 > ze() - fo) ? (it & 2) === 0 && Eu(t, 0) : (sd |= a),
					Su === Pe && (Su = 0)),
				vi(t));
		}
		function _y(t, r) {
			(r === 0 && (r = fn()), (t = Ta(t, r)), t !== null && (zr(t, r), vi(t)));
		}
		function Mw(t) {
			var r = t.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), _y(t, a));
		}
		function Nw(t, r) {
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
			(s !== null && s.delete(r), _y(t, a));
		}
		function Ow(t, r) {
			return ft(t, r);
		}
		var bo = null,
			xu = null,
			vd = !1,
			_o = !1,
			gd = !1,
			Wi = 0;
		function vi(t) {
			(t !== xu && t.next === null && (xu === null ? (bo = xu = t) : (xu = xu.next = t)),
				(_o = !0),
				vd || ((vd = !0), Dw()));
		}
		function Ds(t, r) {
			if (!gd && _o) {
				gd = !0;
				do
					for (var a = !1, s = bo; s !== null; ) {
						if (!r)
							if (t !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = s.suspendedLanes,
										T = s.pingedLanes;
									((d = (1 << (31 - It(42 | t) + 1)) - 1),
										(d &= c & ~(y & ~T)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), Ty(s, d));
							} else
								((d = Pe),
									(d = zt(s, s === _t ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || ht(s, d) || ((a = !0), Ty(s, d)));
						s = s.next;
					}
				while (a);
				gd = !1;
			}
		}
		function zw() {
			Sy();
		}
		function Sy() {
			_o = vd = !1;
			var t = 0;
			Wi !== 0 && Vw() && (t = Wi);
			for (var r = ze(), a = null, s = bo; s !== null; ) {
				var c = s.next,
					d = wy(s, r);
				(d === 0
					? ((s.next = null), a === null ? (bo = c) : (a.next = c), c === null && (xu = a))
					: ((a = s), (t !== 0 || (d & 3) !== 0) && (_o = !0)),
					(s = c));
			}
			((ln !== 0 && ln !== 5) || Ds(t, !1), Wi !== 0 && (Wi = 0));
		}
		function wy(t, r) {
			for (
				var a = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - It(d),
					T = 1 << y,
					z = c[y];
				(z === -1 ? ((T & a) === 0 || (T & s) !== 0) && (c[y] = wr(T, r)) : z <= r && (t.expiredLanes |= T), (d &= ~T));
			}
			if (
				((r = _t),
				(a = Pe),
				(a = zt(t, t === r ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				a === 0 || (t === r && (ot === 2 || ot === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && fe(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || ht(t, a)) {
				if (((r = a & -a), r === t.callbackPriority)) return r;
				switch ((s !== null && fe(s), xr(a))) {
					case 2:
					case 8:
						a = ut;
						break;
					case 32:
						a = Ot;
						break;
					case 268435456:
						a = an;
						break;
					default:
						a = Ot;
				}
				return ((s = Ey.bind(null, t)), (a = ft(a, s)), (t.callbackPriority = r), (t.callbackNode = a), r);
			}
			return (s !== null && s !== null && fe(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function Ey(t, r) {
			if (ln !== 0 && ln !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (po() && t.callbackNode !== a) return null;
			var s = Pe;
			return (
				(s = zt(t, t === _t ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (iy(t, s, r), wy(t, ze()), t.callbackNode != null && t.callbackNode === a ? Ey.bind(null, t) : null)
			);
		}
		function Ty(t, r) {
			if (po()) return null;
			iy(t, r, !0);
		}
		function Dw() {
			Hw(function () {
				(it & 6) !== 0 ? ft(Rt, zw) : Sy();
			});
		}
		function yd() {
			if (Wi === 0) {
				var t = cu;
				(t === 0 && ((t = Tn), (Tn <<= 1), (Tn & 261888) === 0 && (Tn = 256)), (Wi = t));
			}
			return Wi;
		}
		function xy(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: Wr("" + t);
		}
		function Ay(t, r) {
			var a = r.ownerDocument.createElement("input");
			return (
				(a.name = r.name),
				(a.value = r.value),
				t.id && a.setAttribute("form", t.id),
				r.parentNode.insertBefore(a, r),
				(t = new FormData(t)),
				a.parentNode.removeChild(a),
				t
			);
		}
		function jw(t, r, a, s, c) {
			if (r === "submit" && a && a.stateNode === c) {
				var d = xy((c[un] || null).action),
					y = s.submitter;
				y &&
					((r = (r = y[un] || null) ? xy(r.formAction) : y.getAttribute("formAction")),
					r !== null && ((d = r), (y = null)));
				var T = new Nl("action", "action", null, s, c);
				t.push({
					event: T,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (Wi !== 0) {
										var z = y ? Ay(c, y) : new FormData(c);
										If(a, { pending: !0, data: z, method: c.method, action: d }, null, z);
									}
								} else
									typeof d == "function" &&
										(T.preventDefault(),
										(z = y ? Ay(c, y) : new FormData(c)),
										If(a, { pending: !0, data: z, method: c.method, action: d }, d, z));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var pd = 0; pd < Wc.length; pd++) {
			var bd = Wc[pd];
			Rr(bd.toLowerCase(), "on" + (bd[0].toUpperCase() + bd.slice(1)));
		}
		(Rr(uv, "onAnimationEnd"),
			Rr(sv, "onAnimationIteration"),
			Rr(lv, "onAnimationStart"),
			Rr("dblclick", "onDoubleClick"),
			Rr("focusin", "onFocus"),
			Rr("focusout", "onBlur"),
			Rr(FS, "onTransitionRun"),
			Rr(XS, "onTransitionStart"),
			Rr(JS, "onTransitionCancel"),
			Rr(ov, "onTransitionEnd"),
			Un("onMouseEnter", ["mouseout", "mouseover"]),
			Un("onMouseLeave", ["mouseout", "mouseover"]),
			Un("onPointerEnter", ["pointerout", "pointerover"]),
			Un("onPointerLeave", ["pointerout", "pointerover"]),
			xn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			xn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			xn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			xn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			xn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			xn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var js =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			qw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(js));
		function Ry(t, r) {
			r = (r & 4) !== 0;
			for (var a = 0; a < t.length; a++) {
				var s = t[a],
					c = s.event;
				s = s.listeners;
				e: {
					var d = void 0;
					if (r)
						for (var y = s.length - 1; 0 <= y; y--) {
							var T = s[y],
								z = T.instance,
								G = T.currentTarget;
							if (((T = T.listener), z !== d && c.isPropagationStopped())) break e;
							((d = T), (c.currentTarget = G));
							try {
								d(c);
							} catch (re) {
								Dl(re);
							}
							((c.currentTarget = null), (d = z));
						}
					else
						for (y = 0; y < s.length; y++) {
							if (
								((T = s[y]),
								(z = T.instance),
								(G = T.currentTarget),
								(T = T.listener),
								z !== d && c.isPropagationStopped())
							)
								break e;
							((d = T), (c.currentTarget = G));
							try {
								d(c);
							} catch (re) {
								Dl(re);
							}
							((c.currentTarget = null), (d = z));
						}
				}
			}
		}
		function Ve(t, r) {
			var a = r[In];
			a === void 0 && (a = r[In] = new Set());
			var s = t + "__bubble";
			a.has(s) || (ky(r, t, 2, !1), a.add(s));
		}
		function _d(t, r, a) {
			var s = 0;
			(r && (s |= 4), ky(a, t, s, r));
		}
		var So = "_reactListening" + Math.random().toString(36).slice(2);
		function Cy(t) {
			if (!t[So]) {
				((t[So] = !0),
					wt.forEach(function (a) {
						a !== "selectionchange" && (qw.has(a) || _d(a, !1, t), _d(a, !0, t));
					}));
				var r = t.nodeType === 9 ? t : t.ownerDocument;
				r === null || r[So] || ((r[So] = !0), _d("selectionchange", !1, r));
			}
		}
		function ky(t, r, a, s) {
			switch (n0(r)) {
				case 2:
					var c = d1;
					break;
				case 8:
					c = h1;
					break;
				default:
					c = jd;
			}
			((a = c.bind(null, r, a, t)),
				(c = void 0),
				!Ee || (r !== "touchstart" && r !== "touchmove" && r !== "wheel") || (c = !0),
				s
					? c !== void 0
						? t.addEventListener(r, a, { capture: !0, passive: c })
						: t.addEventListener(r, a, !0)
					: c !== void 0
						? t.addEventListener(r, a, { passive: c })
						: t.addEventListener(r, a, !1));
		}
		function Sd(t, r, a, s, c) {
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
								var z = y.tag;
								if ((z === 3 || z === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; T !== null; ) {
							if (((y = qe(T)), y === null)) return;
							if (((z = y.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
								s = d = y;
								continue e;
							}
							T = T.parentNode;
						}
					}
					s = s.return;
				}
			Y(function () {
				var G = d,
					re = ba(a),
					ue = [];
				e: {
					var F = cv.get(t);
					if (F !== void 0) {
						var W = Nl,
							_e = t;
						switch (t) {
							case "keypress":
								if (Ui(a) === 0) break e;
							case "keydown":
							case "keyup":
								W = zS;
								break;
							case "focusin":
								((_e = "focus"), (W = Hc));
								break;
							case "focusout":
								((_e = "blur"), (W = Hc));
								break;
							case "beforeblur":
							case "afterblur":
								W = Hc;
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
								W = Um;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								W = AS;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								W = DS;
								break;
							case uv:
							case sv:
							case lv:
								W = RS;
								break;
							case ov:
								W = jS;
								break;
							case "scroll":
							case "scrollend":
								W = xS;
								break;
							case "wheel":
								W = qS;
								break;
							case "copy":
							case "cut":
							case "paste":
								W = CS;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								W = Bm;
								break;
							case "toggle":
							case "beforetoggle":
								W = IS;
						}
						var Ae = (r & 4) !== 0,
							yt = !Ae && (t === "scroll" || t === "scrollend"),
							Z = Ae ? (F !== null ? F + "Capture" : null) : F;
						Ae = [];
						for (var U = G, K; U !== null; ) {
							var ie = U;
							if (
								((K = ie.stateNode),
								(ie = ie.tag),
								(ie !== 5 && ie !== 26 && ie !== 27) ||
									K === null ||
									Z === null ||
									((ie = oe(U, Z)), ie != null && Ae.push(qs(U, ie, K))),
								yt)
							)
								break;
							U = U.return;
						}
						0 < Ae.length && ((F = new W(F, _e, null, a, re)), ue.push({ event: F, listeners: Ae }));
					}
				}
				if ((r & 7) === 0) {
					e: {
						if (
							((F = t === "mouseover" || t === "pointerover"),
							(W = t === "mouseout" || t === "pointerout"),
							F && a !== pa && (_e = a.relatedTarget || a.fromElement) && (qe(_e) || _e[Yt]))
						)
							break e;
						if (
							(W || F) &&
							((F = re.window === re ? re : (F = re.ownerDocument) ? F.defaultView || F.parentWindow : window),
							W
								? ((_e = a.relatedTarget || a.toElement),
									(W = G),
									(_e = _e ? qe(_e) : null),
									_e !== null &&
										((yt = f(_e)), (Ae = _e.tag), _e !== yt || (Ae !== 5 && Ae !== 27 && Ae !== 6)) &&
										(_e = null))
								: ((W = null), (_e = G)),
							W !== _e)
						) {
							if (
								((Ae = Um),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(U = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((Ae = Bm), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (U = "pointer")),
								(yt = W == null ? F : Qe(W)),
								(K = _e == null ? F : Qe(_e)),
								(F = new Ae(ie, U + "leave", W, a, re)),
								(F.target = yt),
								(F.relatedTarget = K),
								(ie = null),
								qe(re) === G &&
									((Ae = new Ae(Z, U + "enter", _e, a, re)), (Ae.target = K), (Ae.relatedTarget = yt), (ie = Ae)),
								(yt = ie),
								W && _e)
							)
								t: {
									for (Ae = Iw, Z = W, U = _e, K = 0, ie = Z; ie; ie = Ae(ie)) K++;
									ie = 0;
									for (var xe = U; xe; xe = Ae(xe)) ie++;
									for (; 0 < K - ie; ) ((Z = Ae(Z)), K--);
									for (; 0 < ie - K; ) ((U = Ae(U)), ie--);
									for (; K--; ) {
										if (Z === U || (U !== null && Z === U.alternate)) {
											Ae = Z;
											break t;
										}
										((Z = Ae(Z)), (U = Ae(U)));
									}
									Ae = null;
								}
							else Ae = null;
							(W !== null && My(ue, F, W, Ae, !1), _e !== null && yt !== null && My(ue, yt, _e, Ae, !0));
						}
					}
					e: {
						if (
							((F = G ? Qe(G) : window),
							(W = F.nodeName && F.nodeName.toLowerCase()),
							W === "select" || (W === "input" && F.type === "file"))
						)
							var tt = Gm;
						else if (Km(F))
							if (Fm) tt = KS;
							else {
								tt = QS;
								var we = HS;
							}
						else
							((W = F.nodeName),
								!W || W.toLowerCase() !== "input" || (F.type !== "checkbox" && F.type !== "radio")
									? G && Dr(G.elementType) && (tt = Gm)
									: (tt = PS));
						if (tt && (tt = tt(t, G))) {
							Ym(ue, tt, a, re);
							break e;
						}
						(we && we(t, F, G),
							t === "focusout" &&
								G &&
								F.type === "number" &&
								G.memoizedProps.value != null &&
								Ii(F, "number", F.value));
					}
					switch (((we = G ? Qe(G) : window), t)) {
						case "focusin":
							(Km(we) || we.contentEditable === "true") && ((nu = we), (Fc = G), (fs = null));
							break;
						case "focusout":
							fs = Fc = nu = null;
							break;
						case "mousedown":
							Xc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((Xc = !1), iv(ue, a, re));
							break;
						case "selectionchange":
							if (GS) break;
						case "keydown":
						case "keyup":
							iv(ue, a, re);
					}
					var Le;
					if (Pc)
						e: {
							switch (t) {
								case "compositionstart":
									var Ke = "onCompositionStart";
									break e;
								case "compositionend":
									Ke = "onCompositionEnd";
									break e;
								case "compositionupdate":
									Ke = "onCompositionUpdate";
									break e;
							}
							Ke = void 0;
						}
					else
						tu
							? Qm(t, a) && (Ke = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (Ke = "onCompositionStart");
					(Ke &&
						(Vm &&
							a.locale !== "ko" &&
							(tu || Ke !== "onCompositionStart"
								? Ke === "onCompositionEnd" && tu && (Le = qr())
								: ((Ce = re), (We = "value" in Ce ? Ce.value : Ce.textContent), (tu = !0))),
						(we = wo(G, Ke)),
						0 < we.length &&
							((Ke = new $m(Ke, t, null, a, re)),
							ue.push({ event: Ke, listeners: we }),
							Le ? (Ke.data = Le) : ((Le = Pm(a)), Le !== null && (Ke.data = Le)))),
						(Le = US ? $S(t, a) : BS(t, a)) &&
							((Ke = wo(G, "onBeforeInput")),
							0 < Ke.length &&
								((we = new $m("onBeforeInput", "beforeinput", null, a, re)),
								ue.push({ event: we, listeners: Ke }),
								(we.data = Le))),
						jw(ue, t, G, a, re));
				}
				Ry(ue, r);
			});
		}
		function qs(t, r, a) {
			return { instance: t, listener: r, currentTarget: a };
		}
		function wo(t, r) {
			for (var a = r + "Capture", s = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = oe(t, a)), c != null && s.unshift(qs(t, c, d)), (c = oe(t, r)), c != null && s.push(qs(t, c, d))),
					t.tag === 3)
				)
					return s;
				t = t.return;
			}
			return [];
		}
		function Iw(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function My(t, r, a, s, c) {
			for (var d = r._reactName, y = []; a !== null && a !== s; ) {
				var T = a,
					z = T.alternate,
					G = T.stateNode;
				if (((T = T.tag), z !== null && z === s)) break;
				((T !== 5 && T !== 26 && T !== 27) ||
					G === null ||
					((z = G),
					c
						? ((G = oe(a, d)), G != null && y.unshift(qs(a, G, z)))
						: c || ((G = oe(a, d)), G != null && y.push(qs(a, G, z)))),
					(a = a.return));
			}
			y.length !== 0 && t.push({ event: r, listeners: y });
		}
		var Lw = /\r\n?/g,
			Uw = /\u0000|\uFFFD/g;
		function Ny(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					Lw,
					`
`,
				)
				.replace(Uw, "");
		}
		function Oy(t, r) {
			return ((r = Ny(r)), Ny(t) === r);
		}
		function gt(t, r, a, s, c, d) {
			switch (a) {
				case "children":
					typeof s == "string"
						? r === "body" || (r === "textarea" && s === "") || Li(t, s)
						: (typeof s == "number" || typeof s == "bigint") && r !== "body" && Li(t, "" + s);
					break;
				case "className":
					ji(t, "class", s);
					break;
				case "tabIndex":
					ji(t, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					ji(t, a, s);
					break;
				case "style":
					rs(t, s, d);
					break;
				case "data":
					if (r !== "object") {
						ji(t, "data", s);
						break;
					}
				case "src":
				case "href":
					if (s === "" && (r !== "a" || a !== "href")) {
						t.removeAttribute(a);
						break;
					}
					if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Wr("" + s)), t.setAttribute(a, s));
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
								? (r !== "input" && gt(t, r, "name", c.name, c, null),
									gt(t, r, "formEncType", c.formEncType, c, null),
									gt(t, r, "formMethod", c.formMethod, c, null),
									gt(t, r, "formTarget", c.formTarget, c, null))
								: (gt(t, r, "encType", c.encType, c, null),
									gt(t, r, "method", c.method, c, null),
									gt(t, r, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Wr("" + s)), t.setAttribute(a, s));
					break;
				case "onClick":
					s != null && (t.onclick = lr);
					break;
				case "onScroll":
					s != null && Ve("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Ve("scrollend", t);
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
					((a = Wr("" + s)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
					(Ve("beforetoggle", t), Ve("toggle", t), ya(t, "popover", s));
					break;
				case "xlinkActuate":
					Ar(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					Ar(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					Ar(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					Ar(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					Ar(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					Ar(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					Ar(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					Ar(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					Ar(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					ya(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = Bc.get(a) || a), ya(t, a, s));
			}
		}
		function wd(t, r, a, s, c, d) {
			switch (a) {
				case "style":
					rs(t, s, d);
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
					typeof s == "string" ? Li(t, s) : (typeof s == "number" || typeof s == "bigint") && Li(t, "" + s);
					break;
				case "onScroll":
					s != null && Ve("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Ve("scrollend", t);
					break;
				case "onClick":
					s != null && (t.onclick = lr);
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
					if (!Ln.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(r = a.slice(2, c ? a.length - 7 : void 0)),
								(d = t[un] || null),
								(d = d != null ? d[a] : null),
								typeof d == "function" && t.removeEventListener(r, d, c),
								typeof s == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
									t.addEventListener(r, s, c));
								break e;
							}
							a in t ? (t[a] = s) : s === !0 ? t.setAttribute(a, "") : ya(t, a, s);
						}
			}
		}
		function _n(t, r, a) {
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
					(Ve("error", t), Ve("load", t));
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
										gt(t, r, d, y, a, null);
								}
						}
					(c && gt(t, r, "srcSet", a.srcSet, a, null), s && gt(t, r, "src", a.src, a, null));
					return;
				case "input":
					Ve("invalid", t);
					var T = (d = y = c = null),
						z = null,
						G = null;
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
										z = re;
										break;
									case "defaultChecked":
										G = re;
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
										gt(t, r, s, re, a, null);
								}
						}
					ts(t, d, T, z, G, y, c, !1);
					return;
				case "select":
					(Ve("invalid", t), (s = y = d = null));
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
									gt(t, r, c, T, a, null);
							}
					((r = d), (a = y), (t.multiple = !!s), r != null ? Jr(t, !!s, r, !1) : a != null && Jr(t, !!s, a, !0));
					return;
				case "textarea":
					(Ve("invalid", t), (d = c = s = null));
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
									gt(t, r, y, T, a, null);
							}
					ns(t, s, c, d);
					return;
				case "option":
					for (z in a)
						if (a.hasOwnProperty(z) && ((s = a[z]), s != null))
							switch (z) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									gt(t, r, z, s, a, null);
							}
					return;
				case "dialog":
					(Ve("beforetoggle", t), Ve("toggle", t), Ve("cancel", t), Ve("close", t));
					break;
				case "iframe":
				case "object":
					Ve("load", t);
					break;
				case "video":
				case "audio":
					for (s = 0; s < js.length; s++) Ve(js[s], t);
					break;
				case "image":
					(Ve("error", t), Ve("load", t));
					break;
				case "details":
					Ve("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					(Ve("error", t), Ve("load", t));
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
					for (G in a)
						if (a.hasOwnProperty(G) && ((s = a[G]), s != null))
							switch (G) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(l(137, r));
								default:
									gt(t, r, G, s, a, null);
							}
					return;
				default:
					if (Dr(r)) {
						for (re in a) a.hasOwnProperty(re) && ((s = a[re]), s !== void 0 && wd(t, r, re, s, a, void 0));
						return;
					}
			}
			for (T in a) a.hasOwnProperty(T) && ((s = a[T]), s != null && gt(t, r, T, s, a, null));
		}
		function $w(t, r, a, s) {
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
						G = null,
						re = null;
					for (W in a) {
						var ue = a[W];
						if (a.hasOwnProperty(W) && ue != null)
							switch (W) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									z = ue;
								default:
									s.hasOwnProperty(W) || gt(t, r, W, null, s, ue);
							}
					}
					for (var F in s) {
						var W = s[F];
						if (((ue = a[F]), s.hasOwnProperty(F) && (W != null || ue != null)))
							switch (F) {
								case "type":
									d = W;
									break;
								case "name":
									c = W;
									break;
								case "checked":
									G = W;
									break;
								case "defaultChecked":
									re = W;
									break;
								case "value":
									y = W;
									break;
								case "defaultValue":
									T = W;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (W != null) throw Error(l(137, r));
									break;
								default:
									W !== ue && gt(t, r, F, W, s, ue);
							}
					}
					An(t, y, T, z, G, re, d, c);
					return;
				case "select":
					W = y = T = F = null;
					for (d in a)
						if (((z = a[d]), a.hasOwnProperty(d) && z != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									W = z;
								default:
									s.hasOwnProperty(d) || gt(t, r, d, null, s, z);
							}
					for (c in s)
						if (((d = s[c]), (z = a[c]), s.hasOwnProperty(c) && (d != null || z != null)))
							switch (c) {
								case "value":
									F = d;
									break;
								case "defaultValue":
									T = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== z && gt(t, r, c, d, s, z);
							}
					((r = T),
						(a = y),
						(s = W),
						F != null
							? Jr(t, !!a, F, !1)
							: !!s != !!a && (r != null ? Jr(t, !!a, r, !0) : Jr(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					W = F = null;
					for (T in a)
						if (((c = a[T]), a.hasOwnProperty(T) && c != null && !s.hasOwnProperty(T)))
							switch (T) {
								case "value":
									break;
								case "children":
									break;
								default:
									gt(t, r, T, null, s, c);
							}
					for (y in s)
						if (((c = s[y]), (d = a[y]), s.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									F = c;
									break;
								case "defaultValue":
									W = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(l(91));
									break;
								default:
									c !== d && gt(t, r, y, c, s, d);
							}
					Cl(t, F, W);
					return;
				case "option":
					for (var _e in a)
						if (((F = a[_e]), a.hasOwnProperty(_e) && F != null && !s.hasOwnProperty(_e)))
							switch (_e) {
								case "selected":
									t.selected = !1;
									break;
								default:
									gt(t, r, _e, null, s, F);
							}
					for (z in s)
						if (((F = s[z]), (W = a[z]), s.hasOwnProperty(z) && F !== W && (F != null || W != null)))
							switch (z) {
								case "selected":
									t.selected = F && typeof F != "function" && typeof F != "symbol";
									break;
								default:
									gt(t, r, z, F, s, W);
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
					for (var Ae in a)
						((F = a[Ae]), a.hasOwnProperty(Ae) && F != null && !s.hasOwnProperty(Ae) && gt(t, r, Ae, null, s, F));
					for (G in s)
						if (((F = s[G]), (W = a[G]), s.hasOwnProperty(G) && F !== W && (F != null || W != null)))
							switch (G) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (F != null) throw Error(l(137, r));
									break;
								default:
									gt(t, r, G, F, s, W);
							}
					return;
				default:
					if (Dr(r)) {
						for (var yt in a)
							((F = a[yt]),
								a.hasOwnProperty(yt) && F !== void 0 && !s.hasOwnProperty(yt) && wd(t, r, yt, void 0, s, F));
						for (re in s)
							((F = s[re]),
								(W = a[re]),
								!s.hasOwnProperty(re) || F === W || (F === void 0 && W === void 0) || wd(t, r, re, F, s, W));
						return;
					}
			}
			for (var Z in a)
				((F = a[Z]), a.hasOwnProperty(Z) && F != null && !s.hasOwnProperty(Z) && gt(t, r, Z, null, s, F));
			for (ue in s)
				((F = s[ue]),
					(W = a[ue]),
					!s.hasOwnProperty(ue) || F === W || (F == null && W == null) || gt(t, r, ue, F, s, W));
		}
		function zy(t) {
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
		function Bw() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, r = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						y = c.initiatorType,
						T = c.duration;
					if (d && T && zy(y)) {
						for (y = 0, T = c.responseEnd, s += 1; s < a.length; s++) {
							var z = a[s],
								G = z.startTime;
							if (G > T) break;
							var re = z.transferSize,
								ue = z.initiatorType;
							re && zy(ue) && ((z = z.responseEnd), (y += re * (z < T ? 1 : (T - G) / (z - G))));
						}
						if ((--s, (r += (8 * (d + y)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return r / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Ed = null,
			Td = null;
		function Eo(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Dy(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function jy(t, r) {
			if (t === 0)
				switch (r) {
					case "svg":
						return 1;
					case "math":
						return 2;
					default:
						return 0;
				}
			return t === 1 && r === "foreignObject" ? 0 : t;
		}
		function xd(t, r) {
			return (
				t === "textarea" ||
				t === "noscript" ||
				typeof r.children == "string" ||
				typeof r.children == "number" ||
				typeof r.children == "bigint" ||
				(typeof r.dangerouslySetInnerHTML == "object" &&
					r.dangerouslySetInnerHTML !== null &&
					r.dangerouslySetInnerHTML.__html != null)
			);
		}
		var Ad = null;
		function Vw() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === Ad ? !1 : ((Ad = t), !0)) : ((Ad = null), !1);
		}
		var qy = typeof setTimeout == "function" ? setTimeout : void 0,
			Zw = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Iy = typeof Promise == "function" ? Promise : void 0,
			Hw =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Iy < "u"
						? function (t) {
								return Iy.resolve(null).then(t).catch(Qw);
							}
						: qy;
		function Qw(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function ea(t) {
			return t === "head";
		}
		function Ly(t, r) {
			var a = r,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(t.removeChild(c), ku(r));
							return;
						}
						s--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") s++;
					else if (a === "html") Is(t.ownerDocument.documentElement);
					else if (a === "head") {
						((a = t.ownerDocument.head), Is(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								T = d.nodeName;
							(d[ee] ||
								T === "SCRIPT" ||
								T === "STYLE" ||
								(T === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && Is(t.ownerDocument.body);
				a = c;
			} while (a);
			ku(r);
		}
		function Uy(t, r) {
			var a = t;
			t = 0;
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
						if (t === 0) break;
						t--;
					} else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || t++;
				a = s;
			} while (a);
		}
		function Rd(t) {
			var r = t.firstChild;
			for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
				var a = r;
				switch (((r = r.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Rd(a), ge(a));
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
		function Pw(t, r, a, s) {
			for (; t.nodeType === 1; ) {
				var c = a;
				if (t.nodeName.toLowerCase() !== r.toLowerCase()) {
					if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (s) {
					if (!t[ee])
						switch (r) {
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
				} else if (r === "input" && t.type === "hidden") {
					var d = c.name == null ? null : "" + c.name;
					if (c.type === "hidden" && t.getAttribute("name") === d) return t;
				} else return t;
				if (((t = gr(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function Kw(t, r, a) {
			if (r === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = gr(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function $y(t, r) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r) ||
					((t = gr(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Cd(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function kd(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function Yw(t, r) {
			var a = t.ownerDocument;
			if (t.data === "$~") t._reactRetry = r;
			else if (t.data !== "$?" || a.readyState !== "loading") r();
			else {
				var s = function () {
					(r(), a.removeEventListener("DOMContentLoaded", s));
				};
				(a.addEventListener("DOMContentLoaded", s), (t._reactRetry = s));
			}
		}
		function gr(t) {
			for (; t != null; t = t.nextSibling) {
				var r = t.nodeType;
				if (r === 1 || r === 3) break;
				if (r === 8) {
					if (
						((r = t.data), r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&" || r === "F!" || r === "F")
					)
						break;
					if (r === "/$" || r === "/&") return null;
				}
			}
			return t;
		}
		var Md = null;
		function By(t) {
			t = t.nextSibling;
			for (var r = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (r === 0) return gr(t.nextSibling);
						r--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || r++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Vy(t) {
			t = t.previousSibling;
			for (var r = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
						if (r === 0) return t;
						r--;
					} else (a !== "/$" && a !== "/&") || r++;
				}
				t = t.previousSibling;
			}
			return null;
		}
		function Zy(t, r, a) {
			switch (((r = Eo(a)), t)) {
				case "html":
					if (((t = r.documentElement), !t)) throw Error(l(452));
					return t;
				case "head":
					if (((t = r.head), !t)) throw Error(l(453));
					return t;
				case "body":
					if (((t = r.body), !t)) throw Error(l(454));
					return t;
				default:
					throw Error(l(451));
			}
		}
		function Is(t) {
			for (var r = t.attributes; r.length; ) t.removeAttributeNode(r[0]);
			ge(t);
		}
		var yr = new Map(),
			Hy = new Set();
		function To(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var gi = Q.d;
		Q.d = { f: Gw, r: Fw, D: Xw, C: Jw, L: Ww, m: e1, X: n1, S: t1, M: r1 };
		function Gw() {
			var t = gi.f(),
				r = vo();
			return t || r;
		}
		function Fw(t) {
			var r = Ge(t);
			r !== null && r.tag === 5 && r.type === "form" ? og(r) : gi.r(t);
		}
		var Au = typeof document > "u" ? null : document;
		function Qy(t, r, a) {
			var s = Au;
			if (s && typeof r == "string" && r) {
				var c = gn(r);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Hy.has(c) ||
						(Hy.add(c),
						(t = { rel: t, crossOrigin: a, href: r }),
						s.querySelector(c) === null &&
							((r = s.createElement("link")), _n(r, "link", t), rt(r), s.head.appendChild(r))));
			}
		}
		function Xw(t) {
			(gi.D(t), Qy("dns-prefetch", t, null));
		}
		function Jw(t, r) {
			(gi.C(t, r), Qy("preconnect", t, r));
		}
		function Ww(t, r, a) {
			gi.L(t, r, a);
			var s = Au;
			if (s && t && r) {
				var c = 'link[rel="preload"][as="' + gn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + gn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + gn(a.imageSizes) + '"]'))
					: (c += '[href="' + gn(t) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = Ru(t);
						break;
					case "script":
						d = Cu(t);
				}
				yr.has(d) ||
					((t = p({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : t, as: r }, a)),
					yr.set(d, t),
					s.querySelector(c) !== null ||
						(r === "style" && s.querySelector(Ls(d))) ||
						(r === "script" && s.querySelector(Us(d))) ||
						((r = s.createElement("link")), _n(r, "link", t), rt(r), s.head.appendChild(r)));
			}
		}
		function e1(t, r) {
			gi.m(t, r);
			var a = Au;
			if (a && t) {
				var s = r && typeof r.as == "string" ? r.as : "script",
					c = 'link[rel="modulepreload"][as="' + gn(s) + '"][href="' + gn(t) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Cu(t);
				}
				if (!yr.has(d) && ((t = p({ rel: "modulepreload", href: t }, r)), yr.set(d, t), a.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Us(d))) return;
					}
					((s = a.createElement("link")), _n(s, "link", t), rt(s), a.head.appendChild(s));
				}
			}
		}
		function t1(t, r, a) {
			gi.S(t, r, a);
			var s = Au;
			if (s && t) {
				var c = Fe(s).hoistableStyles,
					d = Ru(t);
				r = r || "default";
				var y = c.get(d);
				if (!y) {
					var T = { loading: 0, preload: null };
					if ((y = s.querySelector(Ls(d)))) T.loading = 5;
					else {
						((t = p({ rel: "stylesheet", href: t, "data-precedence": r }, a)), (a = yr.get(d)) && Nd(t, a));
						var z = (y = s.createElement("link"));
						(rt(z),
							_n(z, "link", t),
							(z._p = new Promise(function (G, re) {
								((z.onload = G), (z.onerror = re));
							})),
							z.addEventListener("load", function () {
								T.loading |= 1;
							}),
							z.addEventListener("error", function () {
								T.loading |= 2;
							}),
							(T.loading |= 4),
							xo(y, r, s));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: T }), c.set(d, y));
				}
			}
		}
		function n1(t, r) {
			gi.X(t, r);
			var a = Au;
			if (a && t) {
				var s = Fe(a).hoistableScripts,
					c = Cu(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Us(c))),
					d ||
						((t = p({ src: t, async: !0 }, r)),
						(r = yr.get(c)) && Od(t, r),
						(d = a.createElement("script")),
						rt(d),
						_n(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function r1(t, r) {
			gi.M(t, r);
			var a = Au;
			if (a && t) {
				var s = Fe(a).hoistableScripts,
					c = Cu(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Us(c))),
					d ||
						((t = p({ src: t, async: !0, type: "module" }, r)),
						(r = yr.get(c)) && Od(t, r),
						(d = a.createElement("script")),
						rt(d),
						_n(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function Py(t, r, a, s) {
			var c = (c = Se.current) ? To(c) : null;
			if (!c) throw Error(l(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((r = Ru(a.href)),
							(a = Fe(c).hoistableStyles),
							(s = a.get(r)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), a.set(r, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Ru(a.href);
						var d = Fe(c).hoistableStyles,
							y = d.get(t);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, y),
								(d = c.querySelector(Ls(t))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								yr.has(t) ||
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
									yr.set(t, a),
									d || i1(c, t, a, y.state))),
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
							? ((r = Cu(a)),
								(a = Fe(c).hoistableScripts),
								(s = a.get(r)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), a.set(r, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(l(444, t));
			}
		}
		function Ru(t) {
			return 'href="' + gn(t) + '"';
		}
		function Ls(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function Ky(t) {
			return p({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function i1(t, r, a, s) {
			t.querySelector('link[rel="preload"][as="style"][' + r + "]")
				? (s.loading = 1)
				: ((r = t.createElement("link")),
					(s.preload = r),
					r.addEventListener("load", function () {
						return (s.loading |= 1);
					}),
					r.addEventListener("error", function () {
						return (s.loading |= 2);
					}),
					_n(r, "link", a),
					rt(r),
					t.head.appendChild(r));
		}
		function Cu(t) {
			return '[src="' + gn(t) + '"]';
		}
		function Us(t) {
			return "script[async]" + t;
		}
		function Yy(t, r, a) {
			if ((r.count++, r.instance === null))
				switch (r.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + gn(a.href) + '"]');
						if (s) return ((r.instance = s), rt(s), s);
						var c = p({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							rt(s),
							_n(s, "style", c),
							xo(s, a.precedence, t),
							(r.instance = s)
						);
					case "stylesheet":
						c = Ru(a.href);
						var d = t.querySelector(Ls(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), rt(d), d);
						((s = Ky(a)), (c = yr.get(c)) && Nd(s, c), (d = (t.ownerDocument || t).createElement("link")), rt(d));
						var y = d;
						return (
							(y._p = new Promise(function (T, z) {
								((y.onload = T), (y.onerror = z));
							})),
							_n(d, "link", s),
							(r.state.loading |= 4),
							xo(d, a.precedence, t),
							(r.instance = d)
						);
					case "script":
						return (
							(d = Cu(a.src)),
							(c = t.querySelector(Us(d)))
								? ((r.instance = c), rt(c), c)
								: ((s = a),
									(c = yr.get(d)) && ((s = p({}, a)), Od(s, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									rt(c),
									_n(c, "link", s),
									t.head.appendChild(c),
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
					((s = r.instance), (r.state.loading |= 4), xo(s, a.precedence, t));
			return r.instance;
		}
		function xo(t, r, a) {
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
				? d.parentNode.insertBefore(t, d.nextSibling)
				: ((r = a.nodeType === 9 ? a.head : a), r.insertBefore(t, r.firstChild));
		}
		function Nd(t, r) {
			((t.crossOrigin ??= r.crossOrigin), (t.referrerPolicy ??= r.referrerPolicy), (t.title ??= r.title));
		}
		function Od(t, r) {
			((t.crossOrigin ??= r.crossOrigin), (t.referrerPolicy ??= r.referrerPolicy), (t.integrity ??= r.integrity));
		}
		var Ao = null;
		function Gy(t, r, a) {
			if (Ao === null) {
				var s = new Map(),
					c = (Ao = new Map());
				c.set(a, s);
			} else ((c = Ao), (s = c.get(a)), s || ((s = new Map()), c.set(a, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[ee] || d[mt] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var y = d.getAttribute(r) || "";
					y = t + y;
					var T = s.get(y);
					T ? T.push(d) : s.set(y, [d]);
				}
			}
			return s;
		}
		function Fy(t, r, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, r === "title" ? t.querySelector("head > title") : null));
		}
		function a1(t, r, a) {
			if (a === 1 || r.itemProp != null) return !1;
			switch (t) {
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
							return ((t = r.disabled), typeof r.precedence == "string" && t == null);
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
		function Xy(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function u1(t, r, a, s) {
			if (
				a.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Ru(s.href),
						d = r.querySelector(Ls(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(t.count++, (t = Ro.bind(t)), r.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							rt(d));
						return;
					}
					((d = r.ownerDocument || r), (s = Ky(s)), (c = yr.get(c)) && Nd(s, c), (d = d.createElement("link")), rt(d));
					var y = d;
					((y._p = new Promise(function (T, z) {
						((y.onload = T), (y.onerror = z));
					})),
						_n(d, "link", s),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, r),
					(r = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Ro.bind(t)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var zd = 0;
		function s1(t, r) {
			return (
				t.stylesheets && t.count === 0 && ko(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var s = setTimeout(function () {
								if ((t.stylesheets && ko(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < t.imgBytes && zd === 0 && (zd = 62500 * Bw());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && ko(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > zd ? 50 : 800) + r,
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
		function Ro() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) ko(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Co = null;
		function ko(t, r) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Co = new Map()), r.forEach(l1, t), (Co = null), Ro.call(t)));
		}
		function l1(t, r) {
			if (!(r.state.loading & 4)) {
				var a = Co.get(t);
				if (a) var s = a.get(null);
				else {
					((a = new Map()), Co.set(t, a));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
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
					(s = Ro.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var $s = { $$typeof: C, Provider: null, Consumer: null, _currentValue: ve, _currentValue2: ve, _threadCount: 0 };
		function o1(t, r, a, s, c, d, y, T, z) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = Kt(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = Kt(0)),
				(this.hiddenUpdates = Kt(null)),
				(this.identifierPrefix = s),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = z),
				(this.incompleteTransitions = new Map()));
		}
		function c1(t, r, a, s, c, d, y, T, z, G, re, ue) {
			return (
				(t = new o1(t, r, a, y, z, G, re, ue, T)),
				(r = 1),
				d === !0 && (r |= 24),
				(d = Wn(3, null, null, r)),
				(t.current = d),
				(d.stateNode = t),
				(r = hf()),
				r.refCount++,
				(t.pooledCache = r),
				r.refCount++,
				(d.memoizedState = { element: s, isDehydrated: a, cache: r }),
				yf(d),
				t
			);
		}
		function f1(t) {
			return t ? ((t = au), t) : au;
		}
		function Jy(t, r, a, s, c, d) {
			((c = f1(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = za(r)),
				(s.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(a = Da(t, s, r)),
				a !== null && (Hn(a, t, r), ps(a, t, r)));
		}
		function Wy(t, r) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Dd(t, r) {
			(Wy(t, r), (t = t.alternate) && Wy(t, r));
		}
		function e0(t) {
			if (t.tag === 13 || t.tag === 31) {
				var r = Ta(t, 67108864);
				(r !== null && Hn(r, t, 67108864), Dd(t, 67108864));
			}
		}
		function t0(t) {
			if (t.tag === 13 || t.tag === 31) {
				var r = vr();
				r = Yr(r);
				var a = Ta(t, r);
				(a !== null && Hn(a, t, r), Dd(t, r));
			}
		}
		var Mo = !0;
		function d1(t, r, a, s) {
			var c = V.T;
			V.T = null;
			var d = Q.p;
			try {
				((Q.p = 2), jd(t, r, a, s));
			} finally {
				((Q.p = d), (V.T = c));
			}
		}
		function h1(t, r, a, s) {
			var c = V.T;
			V.T = null;
			var d = Q.p;
			try {
				((Q.p = 8), jd(t, r, a, s));
			} finally {
				((Q.p = d), (V.T = c));
			}
		}
		function jd(t, r, a, s) {
			if (Mo) {
				var c = qd(s);
				if (c === null) (Sd(t, r, s, No, a), r0(t, s));
				else if (v1(c, t, r, a, s)) s.stopPropagation();
				else if ((r0(t, s), r & 4 && -1 < m1.indexOf(t))) {
					for (; c !== null; ) {
						var d = Ge(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = qn(d.pendingLanes);
										if (y !== 0) {
											var T = d;
											for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
												var z = 1 << (31 - It(y));
												((T.entanglements[1] |= z), (y &= ~z));
											}
											(vi(d), (it & 6) === 0 && ((ho = ze() + 500), Ds(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((T = Ta(d, 2)), T !== null && Hn(T, d, 2), vo(), Dd(d, 2));
							}
						if (((d = qd(s)), d === null && Sd(t, r, s, No, a), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Sd(t, r, s, null, a);
			}
		}
		function qd(t) {
			return ((t = ba(t)), Id(t));
		}
		var No = null;
		function Id(t) {
			if (((No = null), (t = qe(t)), t !== null)) {
				var r = f(t);
				if (r === null) t = null;
				else {
					var a = r.tag;
					if (a === 13) {
						if (((t = h(r)), t !== null)) return t;
						t = null;
					} else if (a === 31) {
						if (((t = m(r)), t !== null)) return t;
						t = null;
					} else if (a === 3) {
						if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
						t = null;
					} else r !== t && (t = null);
				}
			}
			return ((No = t), null);
		}
		function n0(t) {
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
					switch (dt()) {
						case Rt:
							return 2;
						case ut:
							return 8;
						case Ot:
						case on:
							return 32;
						case an:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Ld = !1,
			ta = null,
			na = null,
			ra = null,
			Bs = new Map(),
			Vs = new Map(),
			ia = [],
			m1 =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function r0(t, r) {
			switch (t) {
				case "focusin":
				case "focusout":
					ta = null;
					break;
				case "dragenter":
				case "dragleave":
					na = null;
					break;
				case "mouseover":
				case "mouseout":
					ra = null;
					break;
				case "pointerover":
				case "pointerout":
					Bs.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Vs.delete(r.pointerId);
			}
		}
		function Zs(t, r, a, s, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: r, domEventName: a, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = Ge(r)), r !== null && e0(r)),
					t)
				: ((t.eventSystemFlags |= s), (r = t.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), t);
		}
		function v1(t, r, a, s, c) {
			switch (r) {
				case "focusin":
					return ((ta = Zs(ta, t, r, a, s, c)), !0);
				case "dragenter":
					return ((na = Zs(na, t, r, a, s, c)), !0);
				case "mouseover":
					return ((ra = Zs(ra, t, r, a, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Bs.set(d, Zs(Bs.get(d) || null, t, r, a, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Vs.set(d, Zs(Vs.get(d) || null, t, r, a, s, c)), !0);
			}
			return !1;
		}
		function i0(t) {
			var r = qe(t.target);
			if (r !== null) {
				var a = f(r);
				if (a !== null) {
					if (((r = a.tag), r === 13)) {
						if (((r = h(a)), r !== null)) {
							((t.blockedOn = r),
								Gr(t.priority, function () {
									t0(a);
								}));
							return;
						}
					} else if (r === 31) {
						if (((r = m(a)), r !== null)) {
							((t.blockedOn = r),
								Gr(t.priority, function () {
									t0(a);
								}));
							return;
						}
					} else if (r === 3 && a.stateNode.current.memoizedState.isDehydrated) {
						t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
						return;
					}
				}
			}
			t.blockedOn = null;
		}
		function Oo(t) {
			if (t.blockedOn !== null) return !1;
			for (var r = t.targetContainers; 0 < r.length; ) {
				var a = qd(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var s = new a.constructor(a.type, a);
					((pa = s), a.target.dispatchEvent(s), (pa = null));
				} else return ((r = Ge(a)), r !== null && e0(r), (t.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function a0(t, r, a) {
			Oo(t) && a.delete(r);
		}
		function g1() {
			((Ld = !1),
				ta !== null && Oo(ta) && (ta = null),
				na !== null && Oo(na) && (na = null),
				ra !== null && Oo(ra) && (ra = null),
				Bs.forEach(a0),
				Vs.forEach(a0));
		}
		function zo(t, r) {
			t.blockedOn === r &&
				((t.blockedOn = null), Ld || ((Ld = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, g1)));
		}
		var Do = null;
		function u0(t) {
			Do !== t &&
				((Do = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					Do === t && (Do = null);
					for (var r = 0; r < t.length; r += 3) {
						var a = t[r],
							s = t[r + 1],
							c = t[r + 2];
						if (typeof s != "function") {
							if (Id(s || a) === null) continue;
							break;
						}
						var d = Ge(a);
						d !== null &&
							(t.splice(r, 3), (r -= 3), If(d, { pending: !0, data: c, method: a.method, action: s }, s, c));
					}
				}));
		}
		function ku(t) {
			function r(z) {
				return zo(z, t);
			}
			(ta !== null && zo(ta, t), na !== null && zo(na, t), ra !== null && zo(ra, t), Bs.forEach(r), Vs.forEach(r));
			for (var a = 0; a < ia.length; a++) {
				var s = ia[a];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < ia.length && ((a = ia[0]), a.blockedOn === null); ) (i0(a), a.blockedOn === null && ia.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (s = 0; s < a.length; s += 3) {
					var c = a[s],
						d = a[s + 1],
						y = c[un] || null;
					if (typeof d == "function") y || u0(a);
					else if (y) {
						var T = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[un] || null))) T = y.formAction;
							else if (Id(c) !== null) continue;
						} else T = y.action;
						(typeof T == "function" ? (a[s + 1] = T) : (a.splice(s, 3), (s -= 3)), u0(a));
					}
				}
		}
		function y1() {
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
					navigation.addEventListener("navigate", t),
					navigation.addEventListener("navigatesuccess", r),
					navigation.addEventListener("navigateerror", r),
					setTimeout(a, 100),
					function () {
						((s = !0),
							navigation.removeEventListener("navigate", t),
							navigation.removeEventListener("navigatesuccess", r),
							navigation.removeEventListener("navigateerror", r),
							c !== null && (c(), (c = null)));
					}
				);
			}
		}
		function Ud(t) {
			this._internalRoot = t;
		}
		(($d.prototype.render = Ud.prototype.render =
			function (t) {
				var r = this._internalRoot;
				if (r === null) throw Error(l(409));
				var a = r.current;
				Jy(a, vr(), t, r, null, null);
			}),
			($d.prototype.unmount = Ud.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var r = t.containerInfo;
						(Jy(t.current, 2, null, t, null, null), vo(), (r[Yt] = null));
					}
				}));
		function $d(t) {
			this._internalRoot = t;
		}
		$d.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var r = Xn();
				t = { blockedOn: null, target: t, priority: r };
				for (var a = 0; a < ia.length && r !== 0 && r < ia[a].priority; a++);
				(ia.splice(a, 0, t), a === 0 && i0(t));
			}
		};
		var s0 = i.version;
		if (s0 !== "19.2.8") throw Error(l(527, s0, "19.2.8"));
		Q.findDOMNode = function (t) {
			var r = t._reactInternals;
			if (r === void 0)
				throw typeof t.render == "function" ? Error(l(188)) : ((t = Object.keys(t).join(",")), Error(l(268, t)));
			return ((t = g(r)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var p1 = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: V,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var jo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!jo.isDisabled && jo.supportsFiber)
				try {
					((vn = jo.inject(p1)), (bt = jo));
				} catch {}
		}
		e.createRoot = function (t, r) {
			if (!o(t)) throw Error(l(299));
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
				(r = c1(t, 1, !1, null, null, a, s, null, c, d, y, y1)),
				(t[Yt] = r.current),
				Cy(t),
				new Ud(r)
			);
		};
	}),
	wT = _r((e, n) => {
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
		(i(), (n.exports = ST()));
	}),
	R0;
function ae(e, n, i) {
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
var Uu = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	vb = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(R0 = globalThis).__zod_globalConfig ?? (R0.__zod_globalConfig = {});
var tc = globalThis.__zod_globalConfig;
function xi(e) {
	return (e && Object.assign(tc, e), tc);
}
function gb(e) {
	const n = Object.values(e).filter((i) => typeof i == "number");
	return Object.entries(e)
		.filter(([i, u]) => n.indexOf(+i) === -1)
		.map(([i, u]) => u);
}
function Eh(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function Yh(e) {
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
function Gh(e) {
	return e == null;
}
function Fh(e) {
	const n = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, i);
}
function ET(e, n) {
	const i = e / n,
		u = Math.round(i),
		l = Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - u) < l ? 0 : i - u;
}
var C0 = Symbol("evaluating");
function pt(e, n, i) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== C0) return (u === void 0 && ((u = C0), (u = i())), u);
		},
		set(l) {
			Object.defineProperty(e, n, { value: l });
		},
		configurable: !0,
	});
}
function Fa(e, n, i) {
	Object.defineProperty(e, n, { value: i, writable: !0, enumerable: !0, configurable: !0 });
}
function ma(...e) {
	const n = {};
	for (const i of e) {
		const u = Object.getOwnPropertyDescriptors(i);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function k0(e) {
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
var yb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function nc(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var xT = Yh(() => {
	if (tc.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Hu(e) {
	if (nc(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const i = n.prototype;
	return !(nc(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function pb(e) {
	return Hu(e)
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
function Qu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function va(e, n, i) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || i?.parent) && (u._zod.parent = e), u);
}
function Te(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function RT(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var CT = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function kT(e, n) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return va(
		e,
		ma(e._zod.def, {
			get shape() {
				const l = {};
				for (const o in n) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (l[o] = i.shape[o]);
				}
				return (Fa(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function MT(e, n) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return va(
		e,
		ma(e._zod.def, {
			get shape() {
				const l = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete l[o];
				}
				return (Fa(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function NT(e, n) {
	if (!Hu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const u = e._zod.def.shape;
		for (const l in n)
			if (Object.getOwnPropertyDescriptor(u, l) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return va(
		e,
		ma(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (Fa(this, "shape", u), u);
			},
		}),
	);
}
function OT(e, n) {
	if (!Hu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return va(
		e,
		ma(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...n };
				return (Fa(this, "shape", i), i);
			},
		}),
	);
}
function zT(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return va(
		e,
		ma(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (Fa(this, "shape", i), i);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function DT(e, n, i) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return va(
		n,
		ma(n._zod.def, {
			get shape() {
				const l = n._zod.def.shape,
					o = { ...l };
				if (i)
					for (const f in i) {
						if (!(f in l)) throw new Error(`Unrecognized key: "${f}"`);
						i[f] && (o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f]);
					}
				else for (const f in l) o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f];
				return (Fa(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function jT(e, n, i) {
	return va(
		n,
		ma(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					l = { ...u };
				if (i)
					for (const o in i) {
						if (!(o in l)) throw new Error(`Unrecognized key: "${o}"`);
						i[o] && (l[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) l[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Fa(this, "shape", l), l);
			},
		}),
	);
}
function ju(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function qT(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue === !1) return !0;
	return !1;
}
function qu(e, n) {
	return n.map((i) => {
		var u;
		return ((u = i).path ?? (u.path = []), i.path.unshift(e), i);
	});
}
function Lo(e) {
	return typeof e == "string" ? e : e?.message;
}
function Ai(e, n, i) {
	const u = e.message
			? e.message
			: (Lo(e.inst?._zod.def?.error?.(e)) ??
				Lo(n?.error?.(e)) ??
				Lo(i.customError?.(e)) ??
				Lo(i.localeError?.(e)) ??
				"Invalid input"),
		{ inst: l, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function Xh(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function tl(...e) {
	const [n, i, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: i, inst: u } : { ...n };
}
var bb = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, Eh, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	_b = ae("$ZodError", bb),
	Sb = ae("$ZodError", bb, { Parent: Error });
function IT(e, n = (i) => i.message) {
	const i = {},
		u = [];
	for (const l of e.issues)
		l.path.length > 0 ? ((i[l.path[0]] = i[l.path[0]] || []), i[l.path[0]].push(n(l))) : u.push(n(l));
	return { formErrors: u, fieldErrors: i };
}
function LT(e, n = (i) => i.message) {
	const i = { _errors: [] },
		u = (l, o = []) => {
			for (const f of l.issues)
				if (f.code === "invalid_union" && f.errors.length) f.errors.map((h) => u({ issues: h }, [...o, ...f.path]));
				else if (f.code === "invalid_key") u({ issues: f.issues }, [...o, ...f.path]);
				else if (f.code === "invalid_element") u({ issues: f.issues }, [...o, ...f.path]);
				else {
					const h = [...o, ...f.path];
					if (h.length === 0) i._errors.push(n(f));
					else {
						let m = i,
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
	return (u(e), i);
}
var Jh = (e) => (n, i, u, l) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: i, issues: [] }, o);
		if (f instanceof Promise) throw new Uu();
		if (f.issues.length) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => Ai(m, o, xi())));
			throw (yb(h, l?.callee), h);
		}
		return f.value;
	},
	Wh = (e) => async (n, i, u, l) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: i, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => Ai(m, o, xi())));
			throw (yb(h, l?.callee), h);
		}
		return f.value;
	},
	vc = (e) => (n, i, u) => {
		const l = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: i, issues: [] }, l);
		if (o instanceof Promise) throw new Uu();
		return o.issues.length
			? { success: !1, error: new (e ?? _b)(o.issues.map((f) => Ai(f, l, xi()))) }
			: { success: !0, data: o.value };
	},
	UT = vc(Sb),
	gc = (e) => async (n, i, u) => {
		const l = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: i, issues: [] }, l);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Ai(f, l, xi()))) }
				: { success: !0, data: o.value }
		);
	},
	$T = gc(Sb),
	BT = (e) => (n, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Jh(e)(n, i, l);
	},
	VT = (e) => (n, i, u) => Jh(e)(n, i, u),
	ZT = (e) => async (n, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Wh(e)(n, i, l);
	},
	HT = (e) => async (n, i, u) => Wh(e)(n, i, u),
	QT = (e) => (n, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return vc(e)(n, i, l);
	},
	PT = (e) => (n, i, u) => vc(e)(n, i, u),
	KT = (e) => async (n, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return gc(e)(n, i, l);
	},
	YT = (e) => async (n, i, u) => gc(e)(n, i, u),
	GT = /^[cC][0-9a-z]{6,}$/,
	FT = /^[0-9a-z]+$/,
	XT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	JT = /^[0-9a-vA-V]{20}$/,
	WT = /^[A-Za-z0-9]{27}$/,
	ex = /^[a-zA-Z0-9_-]{21}$/,
	tx = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	nx = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	M0 = (e) =>
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
	sx =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	lx =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	ox =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	cx = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	wb = /^[A-Za-z0-9_-]*$/,
	fx = /^https?$/,
	dx = /^\+[1-9]\d{6,14}$/,
	Eb =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	hx = new RegExp(`^${Eb}$`);
function Tb(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function mx(e) {
	return new RegExp(`^${Tb(e)}$`);
}
function vx(e) {
	const n = Tb({ precision: e.precision }),
		i = ["Z"];
	(e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${i.join("|")})`;
	return new RegExp(`^${Eb}T(?:${u})$`);
}
var gx = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	yx = /^-?\d+$/,
	xb = /^-?\d+(?:\.\d+)?$/,
	px = /^undefined$/i,
	bx = /^[^A-Z]*$/,
	_x = /^[^a-z]*$/,
	Yn = ae("$ZodCheck", (e, n) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	Ab = { number: "number", bigint: "bigint", object: "date" },
	Rb = ae("$ZodCheckLessThan", (e, n) => {
		Yn.init(e, n);
		const i = Ab[typeof n.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (n.inclusive ? l.maximum : l.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			n.value < o && (n.inclusive ? (l.maximum = n.value) : (l.exclusiveMaximum = n.value));
		}),
			(e._zod.check = (u) => {
				(n.inclusive ? u.value <= n.value : u.value < n.value) ||
					u.issues.push({
						origin: i,
						code: "too_big",
						maximum: typeof n.value == "object" ? n.value.getTime() : n.value,
						input: u.value,
						inclusive: n.inclusive,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	Cb = ae("$ZodCheckGreaterThan", (e, n) => {
		Yn.init(e, n);
		const i = Ab[typeof n.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (n.inclusive ? l.minimum : l.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			n.value > o && (n.inclusive ? (l.minimum = n.value) : (l.exclusiveMinimum = n.value));
		}),
			(e._zod.check = (u) => {
				(n.inclusive ? u.value >= n.value : u.value > n.value) ||
					u.issues.push({
						origin: i,
						code: "too_small",
						minimum: typeof n.value == "object" ? n.value.getTime() : n.value,
						input: u.value,
						inclusive: n.inclusive,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	Sx = ae("$ZodCheckMultipleOf", (e, n) => {
		(Yn.init(e, n),
			e._zod.onattach.push((i) => {
				var u;
				(u = i._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint" ? i.value % n.value === BigInt(0) : ET(i.value, n.value) === 0) ||
					i.issues.push({
						origin: typeof i.value,
						code: "not_multiple_of",
						divisor: n.value,
						input: i.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	wx = ae("$ZodCheckNumberFormat", (e, n) => {
		(Yn.init(e, n), (n.format = n.format || "float64"));
		const i = n.format?.includes("int"),
			u = i ? "int" : "number",
			[l, o] = CT[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = l), (h.maximum = o), i && (h.pattern = yx));
		}),
			(e._zod.check = (f) => {
				const h = f.value;
				if (i) {
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
	Ex = ae("$ZodCheckMaxLength", (e, n) => {
		var i;
		(Yn.init(e, n),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const l = u.value;
					return !Gh(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < l && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length <= n.maximum) return;
				const o = Xh(l);
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
	Tx = ae("$ZodCheckMinLength", (e, n) => {
		var i;
		(Yn.init(e, n),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const l = u.value;
					return !Gh(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > l && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length >= n.minimum) return;
				const o = Xh(l);
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
	xx = ae("$ZodCheckLengthEquals", (e, n) => {
		var i;
		(Yn.init(e, n),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const l = u.value;
					return !Gh(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				((l.minimum = n.length), (l.maximum = n.length), (l.length = n.length));
			}),
			(e._zod.check = (u) => {
				const l = u.value,
					o = l.length;
				if (o === n.length) return;
				const f = Xh(l),
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
	yc = ae("$ZodCheckStringFormat", (e, n) => {
		var i, u;
		(Yn.init(e, n),
			e._zod.onattach.push((l) => {
				const o = l._zod.bag;
				((o.format = n.format), n.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n.pattern)));
			}),
			n.pattern
				? ((i = e._zod).check ??
					(i.check = (l) => {
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
	Ax = ae("$ZodCheckRegex", (e, n) => {
		(yc.init(e, n),
			(e._zod.check = (i) => {
				((n.pattern.lastIndex = 0),
					!n.pattern.test(i.value) &&
						i.issues.push({
							origin: "string",
							code: "invalid_format",
							format: "regex",
							input: i.value,
							pattern: n.pattern.toString(),
							inst: e,
							continue: !n.abort,
						}));
			}));
	}),
	Rx = ae("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = bx), yc.init(e, n));
	}),
	Cx = ae("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = _x), yc.init(e, n));
	}),
	kx = ae("$ZodCheckIncludes", (e, n) => {
		Yn.init(e, n);
		const i = Qu(n.includes),
			u = new RegExp(typeof n.position == "number" ? `^.{${n.position}}${i}` : i);
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
	Mx = ae("$ZodCheckStartsWith", (e, n) => {
		Yn.init(e, n);
		const i = new RegExp(`^${Qu(n.prefix)}.*`);
		(n.pattern ?? (n.pattern = i),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(i));
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
	Nx = ae("$ZodCheckEndsWith", (e, n) => {
		Yn.init(e, n);
		const i = new RegExp(`.*${Qu(n.suffix)}$`);
		(n.pattern ?? (n.pattern = i),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(i));
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
	Ox = ae("$ZodCheckOverwrite", (e, n) => {
		(Yn.init(e, n),
			(e._zod.check = (i) => {
				i.value = n.tx(i.value);
			}));
	}),
	zx = class {
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
				i = Math.min(...n.map((l) => l.length - l.trimStart().length)),
				u = n.map((l) => l.slice(i)).map((l) => " ".repeat(this.indent * 2) + l);
			for (const l of u) this.content.push(l);
		}
		compile() {
			const e = Function,
				n = this?.args,
				i = [...(this?.content ?? [""]).map((u) => `  ${u}`)];
			return new e(
				...n,
				i.join(`
`),
			);
		}
	},
	Dx = { major: 4, minor: 4, patch: 3 },
	Dt = ae("$ZodType", (e, n) => {
		var i;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = Dx));
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
					let v = ju(f),
						g;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (qT(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const p = f.issues.length,
							w = _._zod.check(f);
						if (w instanceof Promise && m?.async === !1) throw new Uu();
						if (g || w instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await w, f.issues.length !== p && (v || (v = ju(f, p))));
							});
						else {
							if (f.issues.length === p) continue;
							v || (v = ju(f, p));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (ju(f)) return ((f.aborted = !0), f);
					const v = l(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Uu();
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
					if (h.async === !1) throw new Uu();
					return m.then((v) => l(v, u, h));
				}
				return l(m, u, h);
			};
		}
		pt(e, "~standard", () => ({
			validate: (l) => {
				try {
					const o = UT(e, l);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return $T(e, l).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	em = ae("$ZodString", (e, n) => {
		(Dt.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? gx(e._zod.bag)),
			(e._zod.parse = (i, u) => {
				if (n.coerce)
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
	Nt = ae("$ZodStringFormat", (e, n) => {
		(yc.init(e, n), em.init(e, n));
	}),
	jx = ae("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = nx), Nt.init(e, n));
	}),
	qx = ae("$ZodUUID", (e, n) => {
		if (n.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = M0(i));
		} else n.pattern ?? (n.pattern = M0());
		Nt.init(e, n);
	}),
	Ix = ae("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = rx), Nt.init(e, n));
	}),
	Lx = ae("$ZodURL", (e, n) => {
		(Nt.init(e, n),
			(e._zod.check = (i) => {
				try {
					const u = i.value.trim();
					if (!n.normalize && n.protocol?.source === fx.source && !/^https?:\/\//i.test(u)) {
						i.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: i.value,
							inst: e,
							continue: !n.abort,
						});
						return;
					}
					const l = new URL(u);
					(n.hostname &&
						((n.hostname.lastIndex = 0),
						n.hostname.test(l.hostname) ||
							i.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid hostname",
								pattern: n.hostname.source,
								input: i.value,
								inst: e,
								continue: !n.abort,
							})),
						n.protocol &&
							((n.protocol.lastIndex = 0),
							n.protocol.test(l.protocol.endsWith(":") ? l.protocol.slice(0, -1) : l.protocol) ||
								i.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: n.protocol.source,
									input: i.value,
									inst: e,
									continue: !n.abort,
								})),
						n.normalize ? (i.value = l.href) : (i.value = u));
					return;
				} catch {
					i.issues.push({ code: "invalid_format", format: "url", input: i.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	Ux = ae("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = ax()), Nt.init(e, n));
	}),
	$x = ae("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = ex), Nt.init(e, n));
	}),
	Bx = ae("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = GT), Nt.init(e, n));
	}),
	Vx = ae("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = FT), Nt.init(e, n));
	}),
	Zx = ae("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = XT), Nt.init(e, n));
	}),
	Hx = ae("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = JT), Nt.init(e, n));
	}),
	Qx = ae("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = WT), Nt.init(e, n));
	}),
	Px = ae("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = vx(n)), Nt.init(e, n));
	}),
	Kx = ae("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = hx), Nt.init(e, n));
	}),
	Yx = ae("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = mx(n)), Nt.init(e, n));
	}),
	Gx = ae("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = tx), Nt.init(e, n));
	}),
	Fx = ae("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = ux), Nt.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	Xx = ae("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = sx),
			Nt.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (i) => {
				try {
					new URL(`http://[${i.value}]`);
				} catch {
					i.issues.push({ code: "invalid_format", format: "ipv6", input: i.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	Jx = ae("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = lx), Nt.init(e, n));
	}),
	Wx = ae("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = ox),
			Nt.init(e, n),
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
					i.issues.push({ code: "invalid_format", format: "cidrv6", input: i.value, inst: e, continue: !n.abort });
				}
			}));
	});
function kb(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var eA = ae("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = cx),
		Nt.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (i) => {
			kb(i.value) ||
				i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !n.abort });
		}));
});
function tA(e) {
	if (!wb.test(e)) return !1;
	const n = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return kb(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var nA = ae("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = wb),
			Nt.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (i) => {
				tA(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	rA = ae("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = dx), Nt.init(e, n));
	});
function iA(e, n = null) {
	try {
		const i = e.split(".");
		if (i.length !== 3) return !1;
		const [u] = i;
		if (!u) return !1;
		const l = JSON.parse(atob(u));
		return !(("typ" in l && l?.typ !== "JWT") || !l.alg || (n && (!("alg" in l) || l.alg !== n)));
	} catch {
		return !1;
	}
}
var aA = ae("$ZodJWT", (e, n) => {
		(Nt.init(e, n),
			(e._zod.check = (i) => {
				iA(i.value, n.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	Mb = ae("$ZodNumber", (e, n) => {
		(Dt.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? xb),
			(e._zod.parse = (i, u) => {
				if (n.coerce)
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
	uA = ae("$ZodNumberFormat", (e, n) => {
		(wx.init(e, n), Mb.init(e, n));
	}),
	sA = ae("$ZodUndefined", (e, n) => {
		(Dt.init(e, n),
			(e._zod.pattern = px),
			(e._zod.values = new Set([void 0])),
			(e._zod.parse = (i, u) => {
				const l = i.value;
				return (typeof l > "u" || i.issues.push({ expected: "undefined", code: "invalid_type", input: l, inst: e }), i);
			}));
	}),
	lA = ae("$ZodUnknown", (e, n) => {
		(Dt.init(e, n), (e._zod.parse = (i) => i));
	}),
	oA = ae("$ZodNever", (e, n) => {
		(Dt.init(e, n),
			(e._zod.parse = (i, u) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function N0(e, n, i) {
	(e.issues.length && n.issues.push(...qu(i, e.issues)), (n.value[i] = e.value));
}
var cA = ae("$ZodArray", (e, n) => {
	(Dt.init(e, n),
		(e._zod.parse = (i, u) => {
			const l = i.value;
			if (!Array.isArray(l)) return (i.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), i);
			i.value = Array(l.length);
			const o = [];
			for (let f = 0; f < l.length; f++) {
				const h = l[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => N0(v, i, f))) : N0(m, i, f);
			}
			return o.length ? Promise.all(o).then(() => i) : i;
		}));
});
function rc(e, n, i, u, l, o) {
	const f = i in u;
	if (e.issues.length) {
		if (l && o && !f) return;
		n.issues.push(...qu(i, e.issues));
	}
	if (!f && !l) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [i] });
		return;
	}
	e.value === void 0 ? f && (n.value[i] = void 0) : (n.value[i] = e.value);
}
function Nb(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const i = RT(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(i) };
}
function Ob(e, n, i, u, l, o) {
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
		const w = m.run({ value: n[p], issues: [] }, u);
		w instanceof Promise ? e.push(w.then((x) => rc(x, i, p, n, g, _))) : rc(w, i, p, n, g, _);
	}
	return (
		f.length && i.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var fA = ae("$ZodObject", (e, n) => {
		if ((Dt.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const i = Yh(() => Nb(n));
		pt(e._zod, "propValues", () => {
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
		const u = nc,
			l = n.catchall;
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
				R instanceof Promise ? v.push(R.then((I) => rc(I, f, _, m, w, x))) : rc(R, f, _, m, w, x);
			}
			return l ? Ob(v, m, f, h, i.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	dA = ae("$ZodObjectJIT", (e, n) => {
		fA.init(e, n);
		const i = e._zod.parse,
			u = Yh(() => Nb(n)),
			l = (p) => {
				const w = new zx(["shape", "payload", "ctx"]),
					x = u.value,
					R = (O) => {
						const C = k0(O);
						return `shape[${C}]._zod.run({ value: input[${C}], issues: [] }, ctx)`;
					};
				w.write("const input = payload.value;");
				const I = Object.create(null);
				let D = 0;
				for (const O of x.keys) I[O] = `key_${D++}`;
				w.write("const newResult = {};");
				for (const O of x.keys) {
					const C = I[O],
						L = k0(O),
						J = p[O],
						X = J?._zod?.optin === "optional",
						M = J?._zod?.optout === "optional";
					(w.write(`const ${C} = ${R(O)};`),
						X && M
							? w.write(`
        if (${C}.issues.length) {
          if (${L} in input) {
            payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${L}, ...iss.path] : [${L}]
            })));
          }
        }
        
        if (${C}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${C}.value;
        }
        
      `)
							: X
								? w.write(`
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }
        
        if (${C}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${C}.value;
        }
        
      `)
								: w.write(`
        const ${C}_present = ${L} in input;
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }
        if (!${C}_present && !${C}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${L}]
          });
        }

        if (${C}_present) {
          if (${C}.value === undefined) {
            newResult[${L}] = undefined;
          } else {
            newResult[${L}] = ${C}.value;
          }
        }

      `));
				}
				(w.write("payload.value = newResult;"), w.write("return payload;"));
				const q = w.compile();
				return (O, C) => q(p, O, C);
			};
		let o;
		const f = nc,
			h = !tc.jitless,
			v = h && xT.value,
			g = n.catchall;
		let _;
		e._zod.parse = (p, w) => {
			_ ?? (_ = u.value);
			const x = p.value;
			return f(x)
				? h && v && w?.async === !1 && w.jitless !== !0
					? (o || (o = l(n.shape)), (p = o(p, w)), g ? Ob([], x, p, w, _, e) : p)
					: i(p, w)
				: (p.issues.push({ expected: "object", code: "invalid_type", input: x, inst: e }), p);
		};
	});
function O0(e, n, i, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const l = e.filter((o) => !ju(o));
	return l.length === 1
		? ((n.value = l[0].value), l[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: i,
				errors: e.map((o) => o.issues.map((f) => Ai(f, u, xi()))),
			}),
			n);
}
var hA = ae("$ZodUnion", (e, n) => {
		(Dt.init(e, n),
			pt(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			pt(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			pt(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			pt(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => Fh(l.source)).join("|")})$`);
				}
			}));
		const i = n.options.length === 1 ? n.options[0]._zod.run : null;
		e._zod.parse = (u, l) => {
			if (i) return i(u, l);
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
			return o ? Promise.all(f).then((h) => O0(h, u, e, l)) : O0(f, u, e, l);
		};
	}),
	mA = ae("$ZodIntersection", (e, n) => {
		(Dt.init(e, n),
			(e._zod.parse = (i, u) => {
				const l = i.value,
					o = n.left._zod.run({ value: l, issues: [] }, u),
					f = n.right._zod.run({ value: l, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => z0(i, h, m))
					: z0(i, o, f);
			}));
	});
function Th(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (Hu(e) && Hu(n)) {
		const i = Object.keys(n),
			u = Object.keys(e).filter((o) => i.indexOf(o) !== -1),
			l = { ...e, ...n };
		for (const o of u) {
			const f = Th(e[o], n[o]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			l[o] = f.data;
		}
		return { valid: !0, data: l };
	}
	if (Array.isArray(e) && Array.isArray(n)) {
		if (e.length !== n.length) return { valid: !1, mergeErrorPath: [] };
		const i = [];
		for (let u = 0; u < e.length; u++) {
			const l = e[u],
				o = n[u],
				f = Th(l, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			i.push(f.data);
		}
		return { valid: !0, data: i };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function z0(e, n, i) {
	const u = new Map();
	let l;
	for (const h of n.issues)
		if (h.code === "unrecognized_keys") {
			l ?? (l = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of i.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && l && e.issues.push({ ...l, keys: o }), ju(e))) return e;
	const f = Th(n.value, i.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var vA = ae("$ZodRecord", (e, n) => {
		(Dt.init(e, n),
			(e._zod.parse = (i, u) => {
				const l = i.value;
				if (!Hu(l)) return (i.issues.push({ expected: "record", code: "invalid_type", input: l, inst: e }), i);
				const o = [],
					f = n.keyType._zod.values;
				if (f) {
					i.value = {};
					const h = new Set();
					for (const v of f)
						if (typeof v == "string" || typeof v == "number" || typeof v == "symbol") {
							h.add(typeof v == "number" ? v.toString() : v);
							const g = n.keyType._zod.run({ value: v, issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (g.issues.length) {
								i.issues.push({
									code: "invalid_key",
									origin: "record",
									issues: g.issues.map((w) => Ai(w, u, xi())),
									input: v,
									path: [v],
									inst: e,
								});
								continue;
							}
							const _ = g.value,
								p = n.valueType._zod.run({ value: l[v], issues: [] }, u);
							p instanceof Promise
								? o.push(
										p.then((w) => {
											(w.issues.length && i.issues.push(...qu(v, w.issues)), (i.value[_] = w.value));
										}),
									)
								: (p.issues.length && i.issues.push(...qu(v, p.issues)), (i.value[_] = p.value));
						}
					let m;
					for (const v in l) h.has(v) || ((m = m ?? []), m.push(v));
					m && m.length > 0 && i.issues.push({ code: "unrecognized_keys", input: l, inst: e, keys: m });
				} else {
					i.value = {};
					for (const h of Reflect.ownKeys(l)) {
						if (h === "__proto__" || !Object.prototype.propertyIsEnumerable.call(l, h)) continue;
						let m = n.keyType._zod.run({ value: h, issues: [] }, u);
						if (m instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof h == "string" && xb.test(h) && m.issues.length) {
							const g = n.keyType._zod.run({ value: Number(h), issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							g.issues.length === 0 && (m = g);
						}
						if (m.issues.length) {
							n.mode === "loose"
								? (i.value[h] = l[h])
								: i.issues.push({
										code: "invalid_key",
										origin: "record",
										issues: m.issues.map((g) => Ai(g, u, xi())),
										input: h,
										path: [h],
										inst: e,
									});
							continue;
						}
						const v = n.valueType._zod.run({ value: l[h], issues: [] }, u);
						v instanceof Promise
							? o.push(
									v.then((g) => {
										(g.issues.length && i.issues.push(...qu(h, g.issues)), (i.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && i.issues.push(...qu(h, v.issues)), (i.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => i) : i;
			}));
	}),
	gA = ae("$ZodEnum", (e, n) => {
		Dt.init(e, n);
		const i = gb(n.entries),
			u = new Set(i);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${i
					.filter((l) => AT.has(typeof l))
					.map((l) => (typeof l == "string" ? Qu(l) : l.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (l, o) => {
				const f = l.value;
				return (u.has(f) || l.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), l);
			}));
	}),
	yA = ae("$ZodLiteral", (e, n) => {
		if ((Dt.init(e, n), n.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const i = new Set(n.values);
		((e._zod.values = i),
			(e._zod.pattern = new RegExp(
				`^(${n.values.map((u) => (typeof u == "string" ? Qu(u) : u ? Qu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, l) => {
				const o = u.value;
				return (i.has(o) || u.issues.push({ code: "invalid_value", values: n.values, input: o, inst: e }), u);
			}));
	}),
	pA = ae("$ZodTransform", (e, n) => {
		(Dt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") throw new vb(e.constructor.name);
				const l = n.transform(i.value, i);
				if (u.async)
					return (l instanceof Promise ? l : Promise.resolve(l)).then((o) => ((i.value = o), (i.fallback = !0), i));
				if (l instanceof Promise) throw new Uu();
				return ((i.value = l), (i.fallback = !0), i);
			}));
	});
function D0(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var zb = ae("$ZodOptional", (e, n) => {
		(Dt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			pt(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			pt(e._zod, "pattern", () => {
				const i = n.innerType._zod.pattern;
				return i ? new RegExp(`^(${Fh(i.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				if (n.innerType._zod.optin === "optional") {
					const l = i.value,
						o = n.innerType._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => D0(f, l)) : D0(o, l);
				}
				return i.value === void 0 ? i : n.innerType._zod.run(i, u);
			}));
	}),
	bA = ae("$ZodExactOptional", (e, n) => {
		(zb.init(e, n),
			pt(e._zod, "values", () => n.innerType._zod.values),
			pt(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (i, u) => n.innerType._zod.run(i, u)));
	}),
	_A = ae("$ZodNullable", (e, n) => {
		(Dt.init(e, n),
			pt(e._zod, "optin", () => n.innerType._zod.optin),
			pt(e._zod, "optout", () => n.innerType._zod.optout),
			pt(e._zod, "pattern", () => {
				const i = n.innerType._zod.pattern;
				return i ? new RegExp(`^(${Fh(i.source)}|null)$`) : void 0;
			}),
			pt(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, u) => (i.value === null ? i : n.innerType._zod.run(i, u))));
	}),
	SA = ae("$ZodDefault", (e, n) => {
		(Dt.init(e, n),
			(e._zod.optin = "optional"),
			pt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(i, u);
				if (i.value === void 0) return ((i.value = n.defaultValue), i);
				const l = n.innerType._zod.run(i, u);
				return l instanceof Promise ? l.then((o) => j0(o, n)) : j0(l, n);
			}));
	});
function j0(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var wA = ae("$ZodPrefault", (e, n) => {
		(Dt.init(e, n),
			(e._zod.optin = "optional"),
			pt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (i, u) => (
				u.direction === "backward" || (i.value === void 0 && (i.value = n.defaultValue)),
				n.innerType._zod.run(i, u)
			)));
	}),
	EA = ae("$ZodNonOptional", (e, n) => {
		(Dt.init(e, n),
			pt(e._zod, "values", () => {
				const i = n.innerType._zod.values;
				return i ? new Set([...i].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				const l = n.innerType._zod.run(i, u);
				return l instanceof Promise ? l.then((o) => q0(o, e)) : q0(l, e);
			}));
	});
function q0(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var TA = ae("$ZodCatch", (e, n) => {
		(Dt.init(e, n),
			(e._zod.optin = "optional"),
			pt(e._zod, "optout", () => n.innerType._zod.optout),
			pt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(i, u);
				const l = n.innerType._zod.run(i, u);
				return l instanceof Promise
					? l.then(
							(o) => (
								(i.value = o.value),
								o.issues.length &&
									((i.value = n.catchValue({
										...i,
										error: { issues: o.issues.map((f) => Ai(f, u, xi())) },
										input: i.value,
									})),
									(i.issues = []),
									(i.fallback = !0)),
								i
							),
						)
					: ((i.value = l.value),
						l.issues.length &&
							((i.value = n.catchValue({
								...i,
								error: { issues: l.issues.map((o) => Ai(o, u, xi())) },
								input: i.value,
							})),
							(i.issues = []),
							(i.fallback = !0)),
						i);
			}));
	}),
	xA = ae("$ZodPipe", (e, n) => {
		(Dt.init(e, n),
			pt(e._zod, "values", () => n.in._zod.values),
			pt(e._zod, "optin", () => n.in._zod.optin),
			pt(e._zod, "optout", () => n.out._zod.optout),
			pt(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Uo(f, n.in, u)) : Uo(o, n.in, u);
				}
				const l = n.in._zod.run(i, u);
				return l instanceof Promise ? l.then((o) => Uo(o, n.out, u)) : Uo(l, n.out, u);
			}));
	});
function Uo(e, n, i) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
var AA = ae("$ZodReadonly", (e, n) => {
	(Dt.init(e, n),
		pt(e._zod, "propValues", () => n.innerType._zod.propValues),
		pt(e._zod, "values", () => n.innerType._zod.values),
		pt(e._zod, "optin", () => n.innerType?._zod?.optin),
		pt(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(i, u);
			const l = n.innerType._zod.run(i, u);
			return l instanceof Promise ? l.then(I0) : I0(l);
		}));
});
function I0(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var RA = ae("$ZodCustom", (e, n) => {
	(Yn.init(e, n),
		Dt.init(e, n),
		(e._zod.parse = (i, u) => i),
		(e._zod.check = (i) => {
			const u = i.value,
				l = n.fn(u);
			if (l instanceof Promise) return l.then((o) => L0(o, i, u, e));
			L0(l, i, u, e);
		}));
});
function L0(e, n, i, u) {
	if (!e) {
		const l = { code: "custom", input: i, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (l.params = u._zod.def.params), n.issues.push(tl(l)));
	}
}
var U0,
	CA = class {
		constructor() {
			((this._map = new WeakMap()), (this._idmap = new Map()));
		}
		add(e, ...n) {
			const i = n[0];
			return (this._map.set(e, i), i && typeof i == "object" && "id" in i && this._idmap.set(i.id, e), this);
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
				const i = { ...(this.get(n) ?? {}) };
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
function kA() {
	return new CA();
}
(U0 = globalThis).__zod_globalRegistry ?? (U0.__zod_globalRegistry = kA());
var Ps = globalThis.__zod_globalRegistry;
function MA(e, n) {
	return new e({ type: "string", ...Te(n) });
}
function NA(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...Te(n) });
}
function $0(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...Te(n) });
}
function OA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...Te(n) });
}
function zA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...Te(n) });
}
function DA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...Te(n) });
}
function jA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...Te(n) });
}
function qA(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...Te(n) });
}
function IA(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...Te(n) });
}
function LA(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...Te(n) });
}
function UA(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...Te(n) });
}
function $A(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...Te(n) });
}
function BA(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...Te(n) });
}
function VA(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...Te(n) });
}
function ZA(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...Te(n) });
}
function HA(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...Te(n) });
}
function QA(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...Te(n) });
}
function PA(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...Te(n) });
}
function KA(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...Te(n) });
}
function YA(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...Te(n) });
}
function GA(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...Te(n) });
}
function FA(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...Te(n) });
}
function XA(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...Te(n) });
}
function JA(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...Te(n),
	});
}
function WA(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...Te(n) });
}
function eR(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...Te(n) });
}
function tR(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...Te(n) });
}
function nR(e, n) {
	return new e({ type: "number", checks: [], ...Te(n) });
}
function rR(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...Te(n) });
}
function iR(e, n) {
	return new e({ type: "undefined", ...Te(n) });
}
function aR(e) {
	return new e({ type: "unknown" });
}
function uR(e, n) {
	return new e({ type: "never", ...Te(n) });
}
function B0(e, n) {
	return new Rb({ check: "less_than", ...Te(n), value: e, inclusive: !1 });
}
function Gd(e, n) {
	return new Rb({ check: "less_than", ...Te(n), value: e, inclusive: !0 });
}
function V0(e, n) {
	return new Cb({ check: "greater_than", ...Te(n), value: e, inclusive: !1 });
}
function Fd(e, n) {
	return new Cb({ check: "greater_than", ...Te(n), value: e, inclusive: !0 });
}
function Z0(e, n) {
	return new Sx({ check: "multiple_of", ...Te(n), value: e });
}
function Db(e, n) {
	return new Ex({ check: "max_length", ...Te(n), maximum: e });
}
function ic(e, n) {
	return new Tx({ check: "min_length", ...Te(n), minimum: e });
}
function jb(e, n) {
	return new xx({ check: "length_equals", ...Te(n), length: e });
}
function sR(e, n) {
	return new Ax({ check: "string_format", format: "regex", ...Te(n), pattern: e });
}
function lR(e) {
	return new Rx({ check: "string_format", format: "lowercase", ...Te(e) });
}
function oR(e) {
	return new Cx({ check: "string_format", format: "uppercase", ...Te(e) });
}
function cR(e, n) {
	return new kx({ check: "string_format", format: "includes", ...Te(n), includes: e });
}
function fR(e, n) {
	return new Mx({ check: "string_format", format: "starts_with", ...Te(n), prefix: e });
}
function dR(e, n) {
	return new Nx({ check: "string_format", format: "ends_with", ...Te(n), suffix: e });
}
function Yu(e) {
	return new Ox({ check: "overwrite", tx: e });
}
function hR(e) {
	return Yu((n) => n.normalize(e));
}
function mR() {
	return Yu((e) => e.trim());
}
function vR() {
	return Yu((e) => e.toLowerCase());
}
function gR() {
	return Yu((e) => e.toUpperCase());
}
function yR() {
	return Yu((e) => TT(e));
}
function pR(e, n, i) {
	return new e({ type: "array", element: n, ...Te(i) });
}
function bR(e, n, i) {
	const u = Te(i);
	return (u.abort ?? (u.abort = !0), new e({ type: "custom", check: "custom", fn: n, ...u }));
}
function _R(e, n, i) {
	return new e({ type: "custom", check: "custom", fn: n, ...Te(i) });
}
function SR(e, n) {
	const i = wR(
		(u) => (
			(u.addIssue = (l) => {
				if (typeof l == "string") u.issues.push(tl(l, u.value, i._zod.def));
				else {
					const o = l;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = i),
						o.continue ?? (o.continue = !i._zod.def.abort),
						u.issues.push(tl(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return i;
}
function wR(e, n) {
	const i = new Yn({ check: "custom", ...Te(n) });
	return ((i._zod.check = e), i);
}
function qb(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? Ps,
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
function nn(e, n, i = { path: [], schemaPath: [] }) {
	var u;
	const l = e._zod.def,
		o = n.seen.get(e);
	if (o) return (o.count++, i.schemaPath.includes(e) && (o.cycle = i.path), o.schema);
	const f = { schema: {}, count: 1, cycle: void 0, path: i.path };
	n.seen.set(e, f);
	const h = e._zod.toJSONSchema?.();
	if (h) f.schema = h;
	else {
		const v = { ...i, schemaPath: [...i.schemaPath, e], path: i.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(n, f.schema, v);
		else {
			const _ = f.schema,
				p = n.processors[l.type];
			if (!p) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${l.type}`);
			p(e, n, _, v);
		}
		const g = e._zod.parent;
		g && (f.ref || (f.ref = g), nn(g, n, v), (n.seen.get(g).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		n.io === "input" && On(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function Ib(e, n) {
	const i = e.seen.get(n);
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
function Lb(e, n) {
	const i = e.seen.get(n);
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
		const h = e.external.registry.get(n)?.id;
		if (!h) throw new Error("Schema is missing an `id` property");
		l.$id = e.external.uri(h);
	}
	Object.assign(l, i.def ?? i.schema);
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
					jsonSchema: { input: ac(n, "input", e.processors), output: ac(n, "output", e.processors) },
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
function On(e, n) {
	const i = n ?? { seen: new Set() };
	if (i.seen.has(e)) return !1;
	i.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return On(u.element, i);
	if (u.type === "set") return On(u.valueType, i);
	if (u.type === "lazy") return On(u.getter(), i);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return On(u.innerType, i);
	if (u.type === "intersection") return On(u.left, i) || On(u.right, i);
	if (u.type === "record" || u.type === "map") return On(u.keyType, i) || On(u.valueType, i);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : On(u.in, i) || On(u.out, i);
	if (u.type === "object") {
		for (const l in u.shape) if (On(u.shape[l], i)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const l of u.options) if (On(l, i)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const l of u.items) if (On(l, i)) return !0;
		return !!(u.rest && On(u.rest, i));
	}
	return !1;
}
var ER =
		(e, n = {}) =>
		(i) => {
			const u = qb({ ...i, processors: n });
			return (nn(e, u), Ib(u, e), Lb(u, e));
		},
	ac =
		(e, n, i = {}) =>
		(u) => {
			const { libraryOptions: l, target: o } = u ?? {},
				f = qb({ ...(l ?? {}), target: o, io: n, processors: i });
			return (nn(e, f), Ib(f, e), Lb(f, e));
		},
	TR = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	xR = (e, n, i, u) => {
		const l = i;
		l.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (l.minLength = o),
			typeof f == "number" && (l.maxLength = f),
			h && ((l.format = TR[h] ?? h), l.format === "" && delete l.format, h === "time" && delete l.format),
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
	AR = (e, n, i, u) => {
		const l = i,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: g } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (l.type = "integer") : (l.type = "number");
		const _ = typeof g == "number" && g >= (o ?? Number.NEGATIVE_INFINITY),
			p = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			w = n.target === "draft-04" || n.target === "openapi-3.0";
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
	RR = (e, n, i, u) => {
		if (n.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
	},
	CR = (e, n, i, u) => {
		i.not = {};
	},
	kR = (e, n, i, u) => {},
	MR = (e, n, i, u) => {
		const l = e._zod.def,
			o = gb(l.entries);
		(o.every((f) => typeof f == "number") && (i.type = "number"),
			o.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = o));
	},
	NR = (e, n, i, u) => {
		const l = e._zod.def,
			o = [];
		for (const f of l.values)
			if (f === void 0) {
				if (n.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof f == "bigint") {
				if (n.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
				o.push(Number(f));
			} else o.push(f);
		if (o.length !== 0)
			if (o.length === 1) {
				const f = o[0];
				((i.type = f === null ? "null" : typeof f),
					n.target === "draft-04" || n.target === "openapi-3.0" ? (i.enum = [f]) : (i.const = f));
			} else
				(o.every((f) => typeof f == "number") && (i.type = "number"),
					o.every((f) => typeof f == "string") && (i.type = "string"),
					o.every((f) => typeof f == "boolean") && (i.type = "boolean"),
					o.every((f) => f === null) && (i.type = "null"),
					(i.enum = o));
	},
	OR = (e, n, i, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	zR = (e, n, i, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	DR = (e, n, i, u) => {
		const l = i,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (l.minItems = f),
			typeof h == "number" && (l.maxItems = h),
			(l.type = "array"),
			(l.items = nn(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	jR = (e, n, i, u) => {
		const l = i,
			o = e._zod.def;
		((l.type = "object"), (l.properties = {}));
		const f = o.shape;
		for (const v in f) l.properties[v] = nn(f[v], n, { ...u, path: [...u.path, "properties", v] });
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
						(l.additionalProperties = nn(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (l.additionalProperties = !1));
	},
	qR = (e, n, i, u) => {
		const l = e._zod.def,
			o = l.inclusive === !1,
			f = l.options.map((h, m) => nn(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (i.oneOf = f) : (i.anyOf = f);
	},
	IR = (e, n, i, u) => {
		const l = e._zod.def,
			o = nn(l.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = nn(l.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		i.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	LR = (e, n, i, u) => {
		const l = i,
			o = e._zod.def;
		l.type = "object";
		const f = o.keyType,
			h = f._zod.bag?.patterns;
		if (o.mode === "loose" && h && h.size > 0) {
			const v = nn(o.valueType, n, { ...u, path: [...u.path, "patternProperties", "*"] });
			l.patternProperties = {};
			for (const g of h) l.patternProperties[g.source] = v;
		} else
			((n.target === "draft-07" || n.target === "draft-2020-12") &&
				(l.propertyNames = nn(o.keyType, n, { ...u, path: [...u.path, "propertyNames"] })),
				(l.additionalProperties = nn(o.valueType, n, { ...u, path: [...u.path, "additionalProperties"] })));
		const m = f._zod.values;
		if (m) {
			const v = [...m].filter((g) => typeof g == "string" || typeof g == "number");
			v.length > 0 && (l.required = v);
		}
	},
	UR = (e, n, i, u) => {
		const l = e._zod.def,
			o = nn(l.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = l.innerType), (i.nullable = !0)) : (i.anyOf = [o, { type: "null" }]);
	},
	$R = (e, n, i, u) => {
		const l = e._zod.def;
		nn(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	BR = (e, n, i, u) => {
		const l = e._zod.def;
		nn(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (i.default = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	VR = (e, n, i, u) => {
		const l = e._zod.def;
		nn(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), n.io === "input" && (i._prefault = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	ZR = (e, n, i, u) => {
		const l = e._zod.def;
		nn(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
		let f;
		try {
			f = l.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		i.default = f;
	},
	HR = (e, n, i, u) => {
		const l = e._zod.def,
			o = l.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? l.out : l.in) : l.out;
		nn(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	QR = (e, n, i, u) => {
		const l = e._zod.def;
		nn(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (i.readOnly = !0));
	},
	Ub = (e, n, i, u) => {
		const l = e._zod.def;
		nn(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	PR = ae("ZodISODateTime", (e, n) => {
		(Px.init(e, n), qt.init(e, n));
	});
function KR(e) {
	return JA(PR, e);
}
var YR = ae("ZodISODate", (e, n) => {
	(Kx.init(e, n), qt.init(e, n));
});
function GR(e) {
	return WA(YR, e);
}
var FR = ae("ZodISOTime", (e, n) => {
	(Yx.init(e, n), qt.init(e, n));
});
function XR(e) {
	return eR(FR, e);
}
var JR = ae("ZodISODuration", (e, n) => {
	(Gx.init(e, n), qt.init(e, n));
});
function WR(e) {
	return tR(JR, e);
}
var eC = (e, n) => {
		(_b.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (i) => LT(e, i) },
				flatten: { value: (i) => IT(e, i) },
				addIssue: {
					value: (i) => {
						(e.issues.push(i), (e.message = JSON.stringify(e.issues, Eh, 2)));
					},
				},
				addIssues: {
					value: (i) => {
						(e.issues.push(...i), (e.message = JSON.stringify(e.issues, Eh, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Sr = ae("ZodError", eC, { Parent: Error }),
	tC = Jh(Sr),
	nC = Wh(Sr),
	rC = vc(Sr),
	iC = gc(Sr),
	aC = BT(Sr),
	uC = VT(Sr),
	sC = ZT(Sr),
	lC = HT(Sr),
	oC = QT(Sr),
	cC = PT(Sr),
	fC = KT(Sr),
	dC = YT(Sr),
	H0 = new WeakMap();
function ul(e, n, i) {
	const u = Object.getPrototypeOf(e);
	let l = H0.get(u);
	if ((l || ((l = new Set()), H0.set(u, l)), !l.has(n))) {
		l.add(n);
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
var jt = ae(
		"ZodType",
		(e, n) => (
			Dt.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: ac(e, "input"), output: ac(e, "output") } }),
			(e.toJSONSchema = ER(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (i, u) => tC(e, i, u, { callee: e.parse })),
			(e.safeParse = (i, u) => rC(e, i, u)),
			(e.parseAsync = async (i, u) => nC(e, i, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (i, u) => iC(e, i, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (i, u) => aC(e, i, u)),
			(e.decode = (i, u) => uC(e, i, u)),
			(e.encodeAsync = async (i, u) => sC(e, i, u)),
			(e.decodeAsync = async (i, u) => lC(e, i, u)),
			(e.safeEncode = (i, u) => oC(e, i, u)),
			(e.safeDecode = (i, u) => cC(e, i, u)),
			(e.safeEncodeAsync = async (i, u) => fC(e, i, u)),
			(e.safeDecodeAsync = async (i, u) => dC(e, i, u)),
			ul(e, "ZodType", {
				check(...i) {
					const u = this.def;
					return this.clone(
						ma(u, {
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
					return va(this, i, u);
				},
				brand() {
					return this;
				},
				register(i, u) {
					return (i.add(this, u), this);
				},
				refine(i, u) {
					return this.check(uk(i, u));
				},
				superRefine(i, u) {
					return this.check(sk(i, u));
				},
				overwrite(i) {
					return this.check(Yu(i));
				},
				optional() {
					return Y0(this);
				},
				exactOptional() {
					return KC(this);
				},
				nullable() {
					return G0(this);
				},
				nullish() {
					return Y0(G0(this));
				},
				nonoptional(i) {
					return WC(this, i);
				},
				array() {
					return Ah(this);
				},
				or(i) {
					return tm([this, i]);
				},
				and(i) {
					return BC(this, i);
				},
				transform(i) {
					return F0(this, QC(i));
				},
				default(i) {
					return FC(this, i);
				},
				prefault(i) {
					return JC(this, i);
				},
				catch(i) {
					return tk(this, i);
				},
				pipe(i) {
					return F0(this, i);
				},
				readonly() {
					return ik(this);
				},
				describe(i) {
					const u = this.clone();
					return (Ps.add(u, { description: i }), u);
				},
				meta(...i) {
					if (i.length === 0) return Ps.get(this);
					const u = this.clone();
					return (Ps.add(u, i[0]), u);
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
					return Ps.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	$b = ae("_ZodString", (e, n) => {
		(em.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (u, l, o) => xR(e, u, l, o)));
		const i = e._zod.bag;
		((e.format = i.format ?? null),
			(e.minLength = i.minimum ?? null),
			(e.maxLength = i.maximum ?? null),
			ul(e, "_ZodString", {
				regex(...u) {
					return this.check(sR(...u));
				},
				includes(...u) {
					return this.check(cR(...u));
				},
				startsWith(...u) {
					return this.check(fR(...u));
				},
				endsWith(...u) {
					return this.check(dR(...u));
				},
				min(...u) {
					return this.check(ic(...u));
				},
				max(...u) {
					return this.check(Db(...u));
				},
				length(...u) {
					return this.check(jb(...u));
				},
				nonempty(...u) {
					return this.check(ic(1, ...u));
				},
				lowercase(u) {
					return this.check(lR(u));
				},
				uppercase(u) {
					return this.check(oR(u));
				},
				trim() {
					return this.check(mR());
				},
				normalize(...u) {
					return this.check(hR(...u));
				},
				toLowerCase() {
					return this.check(vR());
				},
				toUpperCase() {
					return this.check(gR());
				},
				slugify() {
					return this.check(yR());
				},
			}));
	}),
	hC = ae("ZodString", (e, n) => {
		(em.init(e, n),
			$b.init(e, n),
			(e.email = (i) => e.check(NA(mC, i))),
			(e.url = (i) => e.check(qA(vC, i))),
			(e.jwt = (i) => e.check(XA(MC, i))),
			(e.emoji = (i) => e.check(IA(gC, i))),
			(e.guid = (i) => e.check($0(Q0, i))),
			(e.uuid = (i) => e.check(OA($o, i))),
			(e.uuidv4 = (i) => e.check(zA($o, i))),
			(e.uuidv6 = (i) => e.check(DA($o, i))),
			(e.uuidv7 = (i) => e.check(jA($o, i))),
			(e.nanoid = (i) => e.check(LA(yC, i))),
			(e.guid = (i) => e.check($0(Q0, i))),
			(e.cuid = (i) => e.check(UA(pC, i))),
			(e.cuid2 = (i) => e.check($A(bC, i))),
			(e.ulid = (i) => e.check(BA(_C, i))),
			(e.base64 = (i) => e.check(YA(RC, i))),
			(e.base64url = (i) => e.check(GA(CC, i))),
			(e.xid = (i) => e.check(VA(SC, i))),
			(e.ksuid = (i) => e.check(ZA(wC, i))),
			(e.ipv4 = (i) => e.check(HA(EC, i))),
			(e.ipv6 = (i) => e.check(QA(TC, i))),
			(e.cidrv4 = (i) => e.check(PA(xC, i))),
			(e.cidrv6 = (i) => e.check(KA(AC, i))),
			(e.e164 = (i) => e.check(FA(kC, i))),
			(e.datetime = (i) => e.check(KR(i))),
			(e.date = (i) => e.check(GR(i))),
			(e.time = (i) => e.check(XR(i))),
			(e.duration = (i) => e.check(WR(i))));
	});
function Zr(e) {
	return MA(hC, e);
}
var qt = ae("ZodStringFormat", (e, n) => {
		(Nt.init(e, n), $b.init(e, n));
	}),
	mC = ae("ZodEmail", (e, n) => {
		(Ix.init(e, n), qt.init(e, n));
	}),
	Q0 = ae("ZodGUID", (e, n) => {
		(jx.init(e, n), qt.init(e, n));
	}),
	$o = ae("ZodUUID", (e, n) => {
		(qx.init(e, n), qt.init(e, n));
	}),
	vC = ae("ZodURL", (e, n) => {
		(Lx.init(e, n), qt.init(e, n));
	}),
	gC = ae("ZodEmoji", (e, n) => {
		(Ux.init(e, n), qt.init(e, n));
	}),
	yC = ae("ZodNanoID", (e, n) => {
		($x.init(e, n), qt.init(e, n));
	}),
	pC = ae("ZodCUID", (e, n) => {
		(Bx.init(e, n), qt.init(e, n));
	}),
	bC = ae("ZodCUID2", (e, n) => {
		(Vx.init(e, n), qt.init(e, n));
	}),
	_C = ae("ZodULID", (e, n) => {
		(Zx.init(e, n), qt.init(e, n));
	}),
	SC = ae("ZodXID", (e, n) => {
		(Hx.init(e, n), qt.init(e, n));
	}),
	wC = ae("ZodKSUID", (e, n) => {
		(Qx.init(e, n), qt.init(e, n));
	}),
	EC = ae("ZodIPv4", (e, n) => {
		(Fx.init(e, n), qt.init(e, n));
	}),
	TC = ae("ZodIPv6", (e, n) => {
		(Xx.init(e, n), qt.init(e, n));
	}),
	xC = ae("ZodCIDRv4", (e, n) => {
		(Jx.init(e, n), qt.init(e, n));
	}),
	AC = ae("ZodCIDRv6", (e, n) => {
		(Wx.init(e, n), qt.init(e, n));
	}),
	RC = ae("ZodBase64", (e, n) => {
		(eA.init(e, n), qt.init(e, n));
	}),
	CC = ae("ZodBase64URL", (e, n) => {
		(nA.init(e, n), qt.init(e, n));
	}),
	kC = ae("ZodE164", (e, n) => {
		(rA.init(e, n), qt.init(e, n));
	}),
	MC = ae("ZodJWT", (e, n) => {
		(aA.init(e, n), qt.init(e, n));
	}),
	Bb = ae("ZodNumber", (e, n) => {
		(Mb.init(e, n),
			jt.init(e, n),
			(e._zod.processJSONSchema = (u, l, o) => AR(e, u, l, o)),
			ul(e, "ZodNumber", {
				gt(u, l) {
					return this.check(V0(u, l));
				},
				gte(u, l) {
					return this.check(Fd(u, l));
				},
				min(u, l) {
					return this.check(Fd(u, l));
				},
				lt(u, l) {
					return this.check(B0(u, l));
				},
				lte(u, l) {
					return this.check(Gd(u, l));
				},
				max(u, l) {
					return this.check(Gd(u, l));
				},
				int(u) {
					return this.check(P0(u));
				},
				safe(u) {
					return this.check(P0(u));
				},
				positive(u) {
					return this.check(V0(0, u));
				},
				nonnegative(u) {
					return this.check(Fd(0, u));
				},
				negative(u) {
					return this.check(B0(0, u));
				},
				nonpositive(u) {
					return this.check(Gd(0, u));
				},
				multipleOf(u, l) {
					return this.check(Z0(u, l));
				},
				step(u, l) {
					return this.check(Z0(u, l));
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
function Mr(e) {
	return nR(Bb, e);
}
var NC = ae("ZodNumberFormat", (e, n) => {
	(uA.init(e, n), Bb.init(e, n));
});
function P0(e) {
	return rR(NC, e);
}
var OC = ae("ZodUndefined", (e, n) => {
	(sA.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, u, l) => RR(e, i, u, l)));
});
function zC(e) {
	return iR(OC, e);
}
var DC = ae("ZodUnknown", (e, n) => {
	(lA.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, u, l) => kR(e, i, u, l)));
});
function xh() {
	return aR(DC);
}
var jC = ae("ZodNever", (e, n) => {
	(oA.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, u, l) => CR(e, i, u, l)));
});
function qC(e) {
	return uR(jC, e);
}
var IC = ae("ZodArray", (e, n) => {
	(cA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => DR(e, i, u, l)),
		(e.element = n.element),
		ul(e, "ZodArray", {
			min(i, u) {
				return this.check(ic(i, u));
			},
			nonempty(i) {
				return this.check(ic(1, i));
			},
			max(i, u) {
				return this.check(Db(i, u));
			},
			length(i, u) {
				return this.check(jb(i, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function Ah(e, n) {
	return pR(IC, e, n);
}
var LC = ae("ZodObject", (e, n) => {
	(dA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => jR(e, i, u, l)),
		pt(e, "shape", () => n.shape),
		ul(e, "ZodObject", {
			keyof() {
				return VC(Object.keys(this._zod.def.shape));
			},
			catchall(i) {
				return this.clone({ ...this._zod.def, catchall: i });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: xh() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: xh() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: qC() });
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
				return DT(Zb, this, i[0]);
			},
			required(...i) {
				return jT(Hb, this, i[0]);
			},
		}));
});
function Ri(e, n) {
	const i = { type: "object", shape: e ?? {}, ...Te(n) };
	return new LC(i);
}
var UC = ae("ZodUnion", (e, n) => {
	(hA.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, u, l) => qR(e, i, u, l)), (e.options = n.options));
});
function tm(e, n) {
	return new UC({ type: "union", options: e, ...Te(n) });
}
var $C = ae("ZodIntersection", (e, n) => {
	(mA.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, u, l) => IR(e, i, u, l)));
});
function BC(e, n) {
	return new $C({ type: "intersection", left: e, right: n });
}
var K0 = ae("ZodRecord", (e, n) => {
	(vA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => LR(e, i, u, l)),
		(e.keyType = n.keyType),
		(e.valueType = n.valueType));
});
function Vb(e, n, i) {
	return !n || !n._zod
		? new K0({ type: "record", keyType: Zr(), valueType: e, ...Te(n) })
		: new K0({ type: "record", keyType: e, valueType: n, ...Te(i) });
}
var Rh = ae("ZodEnum", (e, n) => {
	(gA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (u, l, o) => MR(e, u, l, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const i = new Set(Object.keys(n.entries));
	((e.extract = (u, l) => {
		const o = {};
		for (const f of u)
			if (i.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Rh({ ...n, checks: [], ...Te(l), entries: o });
	}),
		(e.exclude = (u, l) => {
			const o = { ...n.entries };
			for (const f of u)
				if (i.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Rh({ ...n, checks: [], ...Te(l), entries: o });
		}));
});
function VC(e, n) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Rh({ type: "enum", entries: i, ...Te(n) });
}
var ZC = ae("ZodLiteral", (e, n) => {
	(yA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => NR(e, i, u, l)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function Ch(e, n) {
	return new ZC({ type: "literal", values: Array.isArray(e) ? e : [e], ...Te(n) });
}
var HC = ae("ZodTransform", (e, n) => {
	(pA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => zR(e, i, u, l)),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") throw new vb(e.constructor.name);
			i.addIssue = (o) => {
				if (typeof o == "string") i.issues.push(tl(o, i.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(tl(f)));
				}
			};
			const l = n.transform(i.value, i);
			return l instanceof Promise
				? l.then((o) => ((i.value = o), (i.fallback = !0), i))
				: ((i.value = l), (i.fallback = !0), i);
		}));
});
function QC(e) {
	return new HC({ type: "transform", transform: e });
}
var Zb = ae("ZodOptional", (e, n) => {
	(zb.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => Ub(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function Y0(e) {
	return new Zb({ type: "optional", innerType: e });
}
var PC = ae("ZodExactOptional", (e, n) => {
	(bA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => Ub(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function KC(e) {
	return new PC({ type: "optional", innerType: e });
}
var YC = ae("ZodNullable", (e, n) => {
	(_A.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => UR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function G0(e) {
	return new YC({ type: "nullable", innerType: e });
}
var GC = ae("ZodDefault", (e, n) => {
	(SA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => BR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function FC(e, n) {
	return new GC({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : pb(n);
		},
	});
}
var XC = ae("ZodPrefault", (e, n) => {
	(wA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => VR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function JC(e, n) {
	return new XC({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : pb(n);
		},
	});
}
var Hb = ae("ZodNonOptional", (e, n) => {
	(EA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => $R(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function WC(e, n) {
	return new Hb({ type: "nonoptional", innerType: e, ...Te(n) });
}
var ek = ae("ZodCatch", (e, n) => {
	(TA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => ZR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function tk(e, n) {
	return new ek({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var nk = ae("ZodPipe", (e, n) => {
	(xA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => HR(e, i, u, l)),
		(e.in = n.in),
		(e.out = n.out));
});
function F0(e, n) {
	return new nk({ type: "pipe", in: e, out: n });
}
var rk = ae("ZodReadonly", (e, n) => {
	(AA.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, u, l) => QR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ik(e) {
	return new rk({ type: "readonly", innerType: e });
}
var Qb = ae("ZodCustom", (e, n) => {
	(RA.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, u, l) => OR(e, i, u, l)));
});
function ak(e, n) {
	return bR(Qb, e ?? (() => !0), n);
}
function uk(e, n = {}) {
	return _R(Qb, e, n);
}
function sk(e, n) {
	return SR(e, n);
}
var lk = wT(),
	Iu = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	Pb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
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
	ok = 9999999999999,
	ck = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function Qa(e) {
	const n = ck.exec(e);
	return n ? ok - Number(n[1]) : null;
}
var Yb = "p/",
	fk = /^p\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u,
	kh = ["channels", "messages", "replies", "reactions"],
	nm =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function dk(e) {
	const n = crypto.randomUUID();
	return e === "private" ? `${Yb}${n}` : n;
}
function hn(e) {
	return e.startsWith(Yb);
}
function hk(e) {
	return fk.test(e);
}
function X0(e) {
	return `${e}:`;
}
function rm(e) {
	const n = e.split(":");
	return n.length < 3 || Qa(e) === null ? null : n.slice(0, -2).join(":");
}
function Gb(e) {
	return `${e}:`;
}
function mk(e) {
	const n = e.split(":");
	if (n.length < 4) return null;
	const i = n[n.length - 2];
	if (!Iu.includes(i)) return null;
	const u = n.slice(0, -2).join(":");
	return Qa(u) === null ? null : { targetKey: u, token: i, keyTailUserId: n[n.length - 1] };
}
function nl(e) {
	const n = e.split(":");
	if (n.length < 5) return null;
	const i = n.slice(0, -2).join(":");
	return Qa(i) === null || Qa(e) === null ? null : i;
}
function uc(e) {
	const n = e.split(":");
	return n.length === 3 ? (Qa(e) === null ? null : e) : n.length === 5 ? nl(e) : null;
}
function Xd(e) {
	return `me:${e}`;
}
function J0(e) {
	return `${e}:read`;
}
function vk(e) {
	const n = e.split(":");
	return n.length !== 3 || n[1] !== "read" || !hn(n[0]) ? null : { channelKey: n[0], keyTailUserId: n[2] };
}
var gk = Ri({ name: Zr().min(1).max(64), archivedAt: Mr().nullable(), topic: Zr().max(250).optional() }),
	yk = Ri({ fileNodeId: Zr().min(1), name: Zr().min(1) }),
	Mh = ak((e) => typeof e == "string"),
	pk = Ri({
		text: Zr(),
		attachments: Ah(yk),
		editedAt: Mr().nullable(),
		deletedAt: Mr().nullable(),
		mentions: Ah(Mh).optional(),
	}),
	bk = "Someone with no name yet";
function Ko(e) {
	return e !== null && e !== "" ? e : bk;
}
function _k(e, n) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (i === null) return null;
	const u = i[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function Sk(e, n, i) {
	const u = n.toLowerCase();
	return e
		.filter((l) => l.userId !== i)
		.map((l) => ({ ...l, label: Ko(l.displayName) }))
		.filter((l) => l.label.toLowerCase().includes(u))
		.sort((l, o) => l.label.localeCompare(o.label));
}
function wk(e, n, i, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(i)}`, caret: n + u.length + 2 };
}
function Ek(e, n) {
	const i = [];
	for (const [u, l] of e) n.includes(`@${l}`) && i.push(u);
	return i;
}
function Fb(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var Tk = Ri({ channels: Vb(Zr(), Mr()) }),
	xk = Ri({
		messages: Mr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
		replies: Mr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	}),
	Ak = tm([
		Ri({ at: Mr(), activity: xk }),
		Ri({ at: Mr(), activity: zC().optional() }).transform((e) => ({ at: e.at, activity: { messages: 0, replies: 0 } })),
	]),
	sl = Ri({
		collection: Zr(),
		key: Zr().min(1).max(128),
		value: Vb(Zr(), xh()),
		revision: Mr(),
		createdBy: Mh.refine((e) => e.length > 0),
		updatedBy: Mh,
		ownership: tm([Ch("shared"), Ch("owned")]),
		createdAt: Mr(),
		updatedAt: Mr(),
	});
function Rk(e, n) {
	const i = sl.safeParse(e);
	if (!i.success) return null;
	const u = Qa(i.data.key);
	if (u === null) return null;
	const l = n.safeParse(i.data.value);
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
function Hs(e) {
	const n = sl.safeParse(e);
	if (!n.success) return null;
	const i = gk.safeParse(n.data.value);
	return i.success
		? {
				key: n.data.key,
				value: i.data,
				revision: n.data.revision,
				createdBy: n.data.createdBy,
				updatedBy: n.data.updatedBy,
				createdAt: n.data.createdAt,
				updatedAt: n.data.updatedAt,
				timestamp: n.data.createdAt,
			}
		: null;
}
function sc(e) {
	return Rk(e, pk);
}
var Ck = Ri({ removed: Ch(!0).optional() });
function kk(e) {
	const n = sl.safeParse(e);
	if (!n.success) return null;
	const i = mk(n.data.key);
	if (i === null) return null;
	const u = Ck.safeParse(n.data.value);
	return u.success
		? {
				key: n.data.key,
				targetKey: i.targetKey,
				token: i.token,
				createdBy: n.data.createdBy,
				revision: n.data.revision,
				updatedAt: n.data.updatedAt,
				removed: u.data.removed === !0,
			}
		: null;
}
function Mk(e) {
	const n = sl.safeParse(e);
	if (!n.success) return null;
	const i = Tk.safeParse(n.data.value);
	return i.success
		? {
				key: n.data.key,
				value: i.data,
				revision: n.data.revision,
				createdBy: n.data.createdBy,
				updatedBy: n.data.updatedBy,
				createdAt: n.data.createdAt,
				updatedAt: n.data.updatedAt,
				ownership: n.data.ownership,
				timestamp: n.data.createdAt,
			}
		: null;
}
function W0(e) {
	const n = sl.safeParse(e);
	if (!n.success || n.data.ownership !== "owned") return null;
	const i = vk(n.data.key);
	if (i === null) return null;
	const u = Ak.safeParse(n.data.value);
	return u.success
		? {
				key: n.data.key,
				channelKey: i.channelKey,
				createdBy: n.data.createdBy,
				at: u.data.at,
				activity: u.data.activity,
				revision: n.data.revision,
			}
		: null;
}
function Nu(e, n) {
	const i = { ...e.channels };
	for (const [u, l] of Object.entries(n.channels)) {
		const o = i[u];
		i[u] = o === void 0 ? l : Math.max(o, l);
	}
	return { channels: i };
}
function Nk(e) {
	const n = new Map();
	for (const i of e.docs) {
		const u = rm(i.key);
		if (u === null || hn(u) || i.value.deletedAt !== null || i.createdBy === e.selfUserId) continue;
		const l = e.cursorChannels[u];
		if (l !== void 0 && i.timestamp <= l) continue;
		const o = i.value.mentions?.includes(e.selfUserId) ? 1 : 0,
			f = n.get(u);
		f === void 0
			? n.set(u, { unreadCount: 1, mentionCount: o, latest: i })
			: ((f.unreadCount += 1), (f.mentionCount += o), i.timestamp > f.latest.timestamp && (f.latest = i));
	}
	return n;
}
function pc(e, n) {
	const i = n - e;
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
function zn(e) {
	return e instanceof Error ? e.message : String(e);
}
function Jd(e) {
	const n = new Map();
	let i = 0;
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
					i += 1;
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
		dropped_count: () => i,
	};
}
function Yo(e) {
	let n = [],
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
			return ((n = l), l);
		},
		get_all: () => n,
		dropped_count: () => i,
	};
}
function Ok(e, n) {
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
		for (const h of Iu) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(n) });
		}
		u.set(l, f);
	}
	return u;
}
function zk(e) {
	const n = new Map();
	for (const i of e) {
		const u = nl(i.key);
		if (u === null) continue;
		const l = n.get(u);
		l === void 0
			? n.set(u, { count: 1, latestAt: i.timestamp })
			: ((l.count += 1), (l.latestAt = Math.max(l.latestAt, i.timestamp)));
	}
	return n;
}
function Dk(e, n) {
	return e > 99 && n ? "99+" : String(e);
}
function Xb(e, n) {
	return e.convex.query(e.api.plugins_data.list_members, n).then(
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
var jk = 3,
	qk = 5e3,
	Ik = 3e4,
	Lk = "This message is too long to send. Shorten it and try again.",
	Uk = "Sending too fast — wait a moment and try again.",
	$k = "This plugin session expired. Reload the page and try again.",
	Bk = "This plugin may not run its backend here.";
function Vk(e) {
	return new TextEncoder().encode(JSON.stringify(e)).byteLength > Ik;
}
function Zk(e) {
	return new Promise((n) => setTimeout(n, e));
}
async function Za(e, n, i) {
	try {
		for (let u = 1; ; u += 1) {
			const l = await e.fetchJson("/api/v1/plugin-backend/invoke", { endpoint: n, input: i });
			if (l.status === 409 || l.status === 429) {
				if (u < jk) {
					await Zk(Math.min(l.body.retryAfterMs ?? 1e3, qk));
					continue;
				}
				return { _nay: { name: "busy", message: Uk } };
			}
			if (l.status === 401 || l.status === 403)
				return { _nay: { name: "refused", message: Date.now() >= e.session.expiresAt() ? $k : Bk } };
			if (l.status !== 200)
				return { _nay: { name: l.status === 413 ? "too_large" : "refused", message: l.body.message } };
			let o = null;
			try {
				o = JSON.parse(l.body.output);
			} catch {
				o = null;
			}
			const f = typeof o == "object" && o !== null ? o : {};
			if (l.body.pluginStatus >= 200 && l.body.pluginStatus < 300) return { _yay: f };
			const h =
				typeof f.message == "string" && f.message !== ""
					? f.message
					: `The Chitchat backend refused this call (${l.body.pluginStatus})`;
			return {
				_nay: {
					name: l.body.pluginStatus === 409 ? "conflict" : l.body.pluginStatus === 413 ? "too_large" : "refused",
					message: h,
				},
			};
		}
	} catch (u) {
		return { _nay: { name: "unavailable", message: zn(u) } };
	}
}
var Hk = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	Qk = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, i, u) => (u ? u.toUpperCase() : i.toLowerCase())),
	ep = (e) => {
		const n = Qk(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	Jb = (...e) =>
		e
			.filter((n, i, u) => !!n && n.trim() !== "" && u.indexOf(n) === i)
			.join(" ")
			.trim(),
	Pk = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	Kk = {
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
	Yk = (0, b.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: n = 24,
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
					...Kk,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(i) * 24) / Number(n) : i,
					className: Jb("lucide", l),
					...(!o && !Pk(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, b.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	im = (e, n) => {
		const i = (0, b.forwardRef)(({ className: u, ...l }, o) =>
			(0, b.createElement)(Yk, { ref: o, iconNode: n, className: Jb(`lucide-${Hk(ep(e))}`, `lucide-${e}`, u), ...l }),
		);
		return ((i.displayName = ep(e)), i);
	},
	Gk = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	Fk = im("arrow-up", Gk),
	Xk = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	Jk = im("ellipsis", Xk),
	Wk = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	eM = im("paperclip", Wk),
	Gu = tM();
function tM() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function At(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function Wb(e) {
	return e ? ("self" in e ? e.self : At(e).defaultView || window) : self;
}
function ki(e, n = !1) {
	const { activeElement: i } = At(e);
	if (!i?.nodeName) return null;
	if (am(i) && i.contentDocument) return ki(i.contentDocument.body, n);
	if (n) {
		const u = i.getAttribute("aria-activedescendant");
		if (u) {
			const l = At(i).getElementById(u);
			if (l) return l;
		}
	}
	return i;
}
function rn(e, n) {
	return e === n || e.contains(n);
}
function am(e) {
	return e.tagName === "IFRAME";
}
function ca(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? nM.indexOf(e.type) !== -1 : !1;
}
var nM = ["button", "color", "file", "image", "reset", "submit"];
function e_(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Pr(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			i = e.tagName === "TEXTAREA";
		return n || i || !1;
	} catch {
		return !1;
	}
}
function Nh(e) {
	return e.isContentEditable || Pr(e);
}
function rM(e) {
	if (Pr(e)) return e.value;
	if (e.isContentEditable) {
		const n = At(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function Oh(e) {
	let n = 0,
		i = 0;
	if (Pr(e)) ((n = e.selectionStart || 0), (i = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = At(e).getSelection();
		if (u?.rangeCount && u.anchorNode && rn(e, u.anchorNode) && u.focusNode && rn(e, u.focusNode)) {
			const l = u.getRangeAt(0),
				o = l.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(l.startContainer, l.startOffset),
				(n = o.toString().length),
				o.setEnd(l.endContainer, l.endOffset),
				(i = o.toString().length));
		}
	}
	return { start: n, end: i };
}
function bc(e, n) {
	const i = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && i.indexOf(u) !== -1 ? u : n;
}
function t_(e, n) {
	var i;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		l = bc(e);
	return l && (i = u[l]) != null ? i : n;
}
function um(e) {
	if (!e) return null;
	const n = (i) => i === "auto" || i === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: i } = getComputedStyle(e);
		if (n(i)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: i } = getComputedStyle(e);
		if (n(i)) return e;
	}
	return um(e.parentElement) || document.scrollingElement || document.body;
}
function Wd(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function n_(e, n) {
	const i = e.map((l, o) => [o, l]);
	let u = !1;
	return (
		i.sort(([l, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : iM(m, v) ? (l > f && (u = !0), -1) : (l < f && (u = !0), 1);
		}),
		u ? i.map(([l, o]) => o) : e
	);
}
function iM(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var aM = { id: null };
function uM(e, n, i = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(i ? [aM] : []), ...e.slice(0, u)];
}
function sM(e, n) {
	return e.find((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function la(e, n) {
	return (n && e.item(n)) || null;
}
function lM(e) {
	const n = [];
	for (const i of e) {
		const u = n.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === i.rowId;
		});
		u ? u.push(i) : n.push([i]);
	}
	return n;
}
function oM(e, n = !1) {
	if (Pr(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = At(e).getSelection();
		(i?.selectAllChildren(e), n && i?.collapseToEnd());
	}
}
var zh = Symbol("FOCUS_SILENTLY");
function cM(e) {
	((e[zh] = !0), e.focus({ preventScroll: !0 }));
}
function fM(e) {
	const n = e[zh];
	return (delete e[zh], n);
}
function Gs(e, n, i) {
	if (!n || n === i) return !1;
	const u = e.item(n.id);
	return !(!u || (i && u.element === i));
}
function Fs(...e) {}
function r_(e, n) {
	return dM(e) ? e(hM(n) ? n() : n) : e;
}
function dM(e) {
	return typeof e == "function";
}
function hM(e) {
	return typeof e == "function";
}
function Ci(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function Kn(...e) {
	return (...n) => {
		for (const i of e) typeof i == "function" && i(...n);
	};
}
function i_(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function mM(e, n) {
	const i = { ...e };
	for (const u of n) Ci(i, u) && delete i[u];
	return i;
}
function vM(e, n) {
	const i = {};
	for (const u of n) Ci(e, u) && (i[u] = e[u]);
	return i;
}
function a_(e) {
	return e;
}
function Ht(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function gM(e) {
	return Object.keys(e);
}
function _c(e, ...n) {
	const i = typeof e == "function" ? e(...n) : e;
	return i == null ? !1 : !i;
}
function ll(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function Xa(e) {
	const n = {};
	for (const i in e) e[i] !== void 0 && (n[i] = e[i]);
	return n;
}
function je(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function Dh(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function yM(e) {
	return !e || !(0, b.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function pM(e) {
	return yM(e) ? { ...e.props }.ref || e.ref : null;
}
function bM(e, n) {
	const i = { ...e };
	for (const u in n) {
		if (!Ci(n, u)) continue;
		if (u === "className") {
			const o = "className";
			i[o] = e[o] ? `${e[o]} ${n[o]}` : n[o];
			continue;
		}
		if (u === "style") {
			const o = "style";
			i[o] = e[o] ? { ...e[o], ...n[o] } : n[o];
			continue;
		}
		const l = n[u];
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
	return Gu && !!navigator.maxTouchPoints;
}
function sm() {
	return Gu ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function Sc() {
	return Gu && sm() && /apple/i.test(navigator.vendor);
}
function _M() {
	return Gu && /firefox\//i.test(navigator.userAgent);
}
function SM() {
	return Gu && navigator.platform.startsWith("Mac") && !u_();
}
function s_(e) {
	return !!(e.currentTarget && !rn(e.currentTarget, e.target));
}
function ir(e) {
	return e.target === e.currentTarget;
}
function l_(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const i = sm();
	if ((i && !e.metaKey) || (!i && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function o_(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const i = n.tagName.toLowerCase();
	return e.altKey ? i === "a" || (i === "button" && n.type === "submit") || (i === "input" && n.type === "submit") : !1;
}
function wM(e, n, i) {
	const u = new Event(n, i);
	return e.dispatchEvent(u);
}
function Ou(e, n) {
	const i = new FocusEvent("blur", n),
		u = e.dispatchEvent(i),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", l)), u);
}
function EM(e, n, i) {
	const u = new KeyboardEvent(n, i);
	return e.dispatchEvent(u);
}
function tp(e, n) {
	const i = new MouseEvent("click", n);
	return e.dispatchEvent(i);
}
function $a(e, n) {
	const i = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !rn(i, u);
}
function $u(e, n, i, u) {
	const o = ((h) => {
			if (u) {
				const v = setTimeout(h, u);
				return () => clearTimeout(v);
			}
			const m = requestAnimationFrame(h);
			return () => cancelAnimationFrame(m);
		})(() => {
			(e.removeEventListener(n, f, !0), i());
		}),
		f = () => {
			(o(), i());
		};
	return (e.addEventListener(n, f, { once: !0, capture: !0 }), o);
}
function Sn(e, n, i, u = window) {
	const l = [];
	try {
		u.document.addEventListener(e, n, i);
		for (const f of Array.from(u.frames)) l.push(Sn(e, n, i, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, i);
		} catch {}
		for (const f of l) f();
	};
}
var lm = { ...b },
	np = lm.useId,
	kD = lm.useDeferredValue,
	rp = lm.useInsertionEffect,
	at = Gu ? b.useLayoutEffect : b.useEffect;
function TM(e) {
	const [n] = (0, b.useState)(e);
	return n;
}
function c_(e) {
	const n = (0, b.useRef)(e);
	return (
		at(() => {
			n.current = e;
		}),
		n
	);
}
function De(e) {
	const n = (0, b.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		rp
			? rp(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, b.useCallback)((...i) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...i);
		}, [])
	);
}
function xM(e) {
	const [n, i] = (0, b.useState)(null);
	return (
		at(() => {
			if (n == null || !e) return;
			let u = null;
			return (
				e((l) => ((u = l), n)),
				() => {
					e(u);
				}
			);
		}, [n, e]),
		[n, i]
	);
}
function Qt(...e) {
	return (0, b.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const i of e) Dh(i, n);
			};
	}, e);
}
function Mi(e) {
	if (np) {
		const u = np();
		return e || u;
	}
	const [n, i] = (0, b.useState)(e);
	return (
		at(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			i(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function f_(e, n) {
	const i = (o) => {
			if (typeof o == "string") return o;
		},
		[u, l] = (0, b.useState)(() => i(n));
	return (
		at(() => {
			const o = e && "current" in e ? e.current : e;
			l(o?.tagName.toLowerCase() || i(n));
		}, [e, n]),
		u
	);
}
function AM(e, n, i) {
	const u = TM(i),
		[l, o] = (0, b.useState)(u);
	return (
		(0, b.useEffect)(() => {
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
function Fu(e, n) {
	const i = (0, b.useRef)(!1);
	((0, b.useEffect)(() => {
		if (i.current) return e();
		i.current = !0;
	}, n),
		(0, b.useEffect)(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function RM(e, n) {
	const i = (0, b.useRef)(!1);
	(at(() => {
		if (i.current) return e();
		i.current = !0;
	}, n),
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
function Mt(e) {
	return De(typeof e == "function" ? e : () => e);
}
function wn(e, n, i = []) {
	const u = (0, b.useCallback)((l) => (e.wrapElement && (l = e.wrapElement(l)), n(l)), [...i, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function om(e = !1, n) {
	const [i, u] = (0, b.useState)(null);
	return { portalRef: Qt(u, n), portalNode: i, domReady: !e || i };
}
function h_(e, n, i) {
	const u = e.onLoadedMetadataCapture,
		l = (0, b.useMemo)(() => Object.assign(() => {}, { ...u, [n]: i }), [u, n, i]);
	return [u?.[n], { onLoadedMetadataCapture: l }];
}
var ip = !1;
function cm() {
	return (
		(0, b.useEffect)(() => {
			ip ||
				(Sn("mousemove", kM, !0),
				Sn("mousedown", Bo, !0),
				Sn("mouseup", Bo, !0),
				Sn("keydown", Bo, !0),
				Sn("scroll", Bo, !0),
				(ip = !0));
		}, []),
		De(() => fm)
	);
}
var fm = !1,
	ap = 0,
	up = 0;
function CM(e) {
	const n = e.movementX || e.screenX - ap,
		i = e.movementY || e.screenY - up;
	return ((ap = e.screenX), (up = e.screenY), n || i || !1);
}
function kM(e) {
	CM(e) && (fm = !0);
}
function Bo() {
	fm = !1;
}
var MM = _r((e) => {
		var n = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.fragment");
		function u(l, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: n, type: l, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = i), (e.jsx = u), (e.jsxs = u));
	}),
	NM = _r((e, n) => {
		n.exports = MM();
	}),
	S = NM();
function Ye(e) {
	const n = b.forwardRef((i, u) => e({ ...i, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function wc(e, n) {
	return b.memo(e, n);
}
function Je(e, n) {
	const { wrapElement: i, render: u, ...l } = n,
		o = Qt(n.ref, pM(u));
	let f;
	if (b.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = b.cloneElement(u, bM(l, h));
	} else u ? (f = u(l)) : (f = (0, S.jsx)(e, { ...l }));
	return i ? i(f) : f;
}
function et(e) {
	const n = (i = {}) => e(i);
	return ((n.displayName = e.name), n);
}
function Kr(e = [], n = []) {
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
				children: n.reduceRight((g, _) => (0, S.jsx)(_, { ...v, children: g }), (0, S.jsx)(u.Provider, { ...v })),
			}),
	};
}
var ol = Kr(),
	OM = ol.useContext,
	MD = ol.useScopedContext,
	ND = ol.useProviderContext,
	zM = ol.ContextProvider,
	DM = ol.ScopedContextProvider,
	cl = Kr([zM], [DM]),
	Ec = cl.useContext,
	OD = cl.useScopedContext,
	jM = cl.useProviderContext,
	fl = cl.ContextProvider,
	Tc = cl.ScopedContextProvider,
	qM = (0, b.createContext)(void 0),
	IM = (0, b.createContext)(void 0),
	m_ = (0, b.createContext)(!0),
	xc =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function LM(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Nr(e) {
	return !(!e.matches(xc) || !e_(e) || e.closest("[inert]"));
}
function Pu(e) {
	if (!Nr(e) || LM(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const i = ki(e);
	return !i || i === e || !("form" in i) || i.form !== e.form || i.name !== e.name;
}
function dm(e, n) {
	const i = Array.from(e.querySelectorAll(xc));
	n && i.unshift(e);
	const u = i.filter(Nr);
	return (
		u.forEach((l, o) => {
			if (am(l) && l.contentDocument) {
				const f = l.contentDocument.body;
				u.splice(o, 1, ...dm(f));
			}
		}),
		u
	);
}
function Ac(e, n, i) {
	const u = Array.from(e.querySelectorAll(xc)),
		l = u.filter(Pu);
	return (
		n && Pu(e) && l.unshift(e),
		l.forEach((o, f) => {
			if (am(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Ac(h, !1, i);
				l.splice(f, 1, ...m);
			}
		}),
		!l.length && i ? u : l
	);
}
function UM(e, n, i) {
	const [u] = Ac(e, n, i);
	return u || null;
}
function $M(e, n, i, u) {
	const l = ki(e),
		o = dm(e, n),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Pu) || (i ? o.find(Pu) : null) || (u ? h[0] : null) || null;
}
function eh(e, n) {
	return $M(document.body, !1, e, n);
}
function BM(e, n, i, u) {
	const l = ki(e),
		o = dm(e, n).reverse(),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Pu) || (i ? o.find(Pu) : null) || (u ? h[0] : null) || null;
}
function sp(e, n) {
	return BM(document.body, !1, e, n);
}
function VM(e) {
	for (; e && !Nr(e); ) e = e.closest(xc);
	return e || null;
}
function Pa(e) {
	const n = ki(e);
	if (!n) return !1;
	if (n === e) return !0;
	const i = n.getAttribute("aria-activedescendant");
	return i ? i === e.id : !1;
}
function oa(e) {
	const n = ki(e);
	if (!n) return !1;
	if (rn(e, n)) return !0;
	const i = n.getAttribute("aria-activedescendant");
	return !i || !("id" in e) ? !1 : i === e.id ? !0 : !!e.querySelector(`#${CSS.escape(i)}`);
}
function v_(e) {
	!oa(e) && Nr(e) && e.focus();
}
function ZM(e) {
	var n;
	const i = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", i), e.setAttribute("tabindex", "-1"));
}
function HM(e, n) {
	const i = Ac(e, n);
	for (const u of i) ZM(u);
}
function QM(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		i = (u) => {
			const l = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), l ? u.setAttribute("tabindex", l) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && i(e);
	for (const u of n) i(u);
}
function PM(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var KM = "div",
	lp = Sc(),
	YM = [
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
function GM(e) {
	return e ? !!e[g_] : !1;
}
function op(e, n) {
	e && (e[g_] = n);
}
function FM(e) {
	const { tagName: n, readOnly: i, type: u } = e;
	return (n === "TEXTAREA" && !i) || (n === "SELECT" && !i)
		? !0
		: n === "INPUT" && !i
			? YM.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function XM(e) {
	return "labels" in e ? e.labels : null;
}
function cp(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function JM(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function WM(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function eN(e, n, i, u, l) {
	return e ? (n ? (i && !u ? -1 : void 0) : i ? l : l || 0) : l;
}
function th(e, n) {
	return De((i) => {
		(e?.(i), !i.defaultPrevented && n && (i.stopPropagation(), i.preventDefault()));
	});
}
var fp = !1,
	hm = !0;
function tN(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (hm = !1));
}
function nN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (hm = !0);
}
var dl = et(function ({ focusable: n = !0, accessibleWhenDisabled: i, autoFocus: u, onFocusVisible: l, ...o }) {
		const f = (0, b.useRef)(null);
		((0, b.useEffect)(() => {
			n && (fp || (Sn("mousedown", tN, !0), Sn("keydown", nN, !0), (fp = !0)));
		}, [n]),
			lp &&
				(0, b.useEffect)(() => {
					if (!n) return;
					const te = f.current;
					if (!te || !cp(te)) return;
					const ne = XM(te);
					if (!ne) return;
					const N = () => queueMicrotask(() => te.focus());
					for (const V of ne) V.addEventListener("mouseup", N);
					return () => {
						for (const V of ne) V.removeEventListener("mouseup", N);
					};
				}, [n]));
		const h = n && ll(o),
			m = !!h && !i,
			[v, g] = (0, b.useState)(!1);
		((0, b.useEffect)(() => {
			n && m && v && g(!1);
		}, [n, m, v]),
			(0, b.useEffect)(() => {
				if (!n || !v) return;
				const te = f.current;
				if (!te || typeof IntersectionObserver > "u") return;
				const ne = new IntersectionObserver(() => {
					Nr(te) || g(!1);
				});
				return (ne.observe(te), () => ne.disconnect());
			}, [n, v]));
		const _ = th(o.onKeyPressCapture, h),
			p = th(o.onMouseDownCapture, h),
			w = th(o.onClickCapture, h),
			x = o.onMouseDown,
			R = De((te) => {
				if ((x?.(te), te.defaultPrevented || !n)) return;
				const ne = te.currentTarget;
				if (!lp || s_(te) || (!ca(ne) && !cp(ne))) return;
				let N = !1;
				const V = () => {
					N = !0;
				};
				ne.addEventListener("focusin", V, { capture: !0, once: !0 });
				const Q = VM(ne.parentElement);
				(op(Q, !0),
					$u(ne, "mouseup", () => {
						(ne.removeEventListener("focusin", V, !0), op(Q, !1), !N && v_(ne));
					}));
			}),
			I = (te, ne) => {
				if ((ne && (te.currentTarget = ne), !n)) return;
				const N = te.currentTarget;
				N && Pa(N) && (l?.(te), !te.defaultPrevented && ((N.dataset.focusVisible = "true"), g(!0)));
			},
			D = o.onKeyDownCapture,
			q = De((te) => {
				if ((D?.(te), te.defaultPrevented || !n || v || te.metaKey || te.altKey || te.ctrlKey || !ir(te))) return;
				const ne = te.currentTarget;
				$u(ne, "focusout", () => I(te, ne));
			}),
			O = o.onFocusCapture,
			C = De((te) => {
				if ((O?.(te), te.defaultPrevented || !n)) return;
				if (!ir(te)) {
					g(!1);
					return;
				}
				const ne = te.currentTarget,
					N = () => I(te, ne);
				hm || FM(te.target) ? $u(te.target, "focusout", N) : g(!1);
			}),
			L = o.onBlur,
			J = De((te) => {
				(L?.(te), n && $a(te) && (te.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			X = (0, b.useContext)(m_),
			M = De((te) => {
				n &&
					u &&
					te &&
					X &&
					queueMicrotask(() => {
						Pa(te) || (Nr(te) && te.focus());
					});
			}),
			$ = f_(f),
			B = n && JM($),
			P = n && WM($),
			ce = o.style,
			se = (0, b.useMemo)(() => (m ? { pointerEvents: "none", ...ce } : ce), [m, ce]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Qt(f, M, o.ref),
				style: se,
				tabIndex: eN(n, m, B, P, o.tabIndex),
				disabled: P && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: w,
				onMouseDownCapture: p,
				onMouseDown: R,
				onKeyDownCapture: q,
				onFocusCapture: C,
				onBlur: J,
			}),
			Xa(o)
		);
	}),
	zD = Ye(function (n) {
		return Je(KM, dl(n));
	});
function y_(e) {
	const n = [];
	for (const i of e) n.push(...i);
	return n;
}
function jh(e) {
	return e.slice().reverse();
}
var rN = "div";
function iN(e) {
	return e.some((n) => !!n.rowId);
}
function aN(e) {
	const n = e.target;
	return n && !Pr(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function uN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function dp(e, n, i) {
	return De((u) => {
		var l;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !ir(u) || uN(u) || aN(u))) return;
		const o = (l = la(e, e.getState().activeId)) == null ? void 0 : l.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== i?.current && o.focus(),
			EM(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function sN(e) {
	return sM(y_(jh(lM(e))));
}
function lN(e) {
	const [n, i] = (0, b.useState)(!1),
		u = (0, b.useCallback)(() => i(!0), []),
		l = e.useState((o) => la(e, o.activeId));
	return (
		(0, b.useEffect)(() => {
			const o = l?.element;
			n && o && (i(!1), o.focus({ preventScroll: !0 }));
		}, [l, n]),
		u
	);
}
var mm = et(function ({ store: n, composite: i = !0, focusOnMove: u = i, moveOnKeyPress: l = !0, ...o }) {
		const f = jM();
		((n = n || f), Ht(n, !1));
		const h = (0, b.useRef)(null),
			m = (0, b.useRef)(null),
			v = lN(n),
			g = n.useState("moves"),
			[, _] = xM(i ? n.setBaseElement : null);
		((0, b.useEffect)(() => {
			var $;
			if (!n || !g || !i || !u) return;
			const { activeId: B } = n.getState(),
				P = ($ = la(n, B)) == null ? void 0 : $.element;
			P && PM(P);
		}, [n, g, i, u]),
			at(() => {
				if (!n || !g || !i) return;
				const { baseElement: $, activeId: B } = n.getState();
				if (B !== null || !$) return;
				const P = m.current;
				((m.current = null), P && Ou(P, { relatedTarget: $ }), Pa($) || $.focus());
			}, [n, g, i]));
		const p = n.useState("activeId"),
			w = n.useState("virtualFocus");
		at(() => {
			var $;
			if (!n || !i || !w) return;
			const B = m.current;
			if (((m.current = null), !B)) return;
			const P = (($ = la(n, p)) == null ? void 0 : $.element) || ki(B);
			P !== B && Ou(B, { relatedTarget: P });
		}, [n, p, w, i]);
		const x = dp(n, o.onKeyDownCapture, m),
			R = dp(n, o.onKeyUpCapture, m),
			I = o.onFocusCapture,
			D = De(($) => {
				if ((I?.($), $.defaultPrevented || !n)) return;
				const { virtualFocus: B } = n.getState();
				if (!B) return;
				const P = $.relatedTarget,
					ce = fM($.currentTarget);
				ir($) && ce && ($.stopPropagation(), (m.current = P));
			}),
			q = o.onFocus,
			O = De(($) => {
				if ((q?.($), $.defaultPrevented || !i || !n)) return;
				const { relatedTarget: B } = $,
					{ virtualFocus: P } = n.getState();
				P ? ir($) && !Gs(n, B) && queueMicrotask(v) : ir($) && n.setActiveId(null);
			}),
			C = o.onBlurCapture,
			L = De(($) => {
				var B;
				if ((C?.($), $.defaultPrevented || !n)) return;
				const { virtualFocus: P, activeId: ce } = n.getState();
				if (!P) return;
				const se = (B = la(n, ce)) == null ? void 0 : B.element,
					te = $.relatedTarget,
					ne = Gs(n, te),
					N = m.current;
				((m.current = null),
					ir($) && ne
						? (te === se ? N && N !== te && Ou(N, $) : se ? Ou(se, $) : N && Ou(N, $), $.stopPropagation())
						: !Gs(n, $.target) && se && Ou(se, $));
			}),
			J = o.onKeyDown,
			X = Mt(l),
			M = De(($) => {
				var B;
				if ((J?.($), $.nativeEvent.isComposing || $.defaultPrevented || !n || !ir($))) return;
				const { orientation: P, renderedItems: ce, activeId: se } = n.getState(),
					te = la(n, se);
				if ((B = te?.element) != null && B.isConnected) return;
				const ne = P !== "horizontal",
					N = P !== "vertical",
					V = iN(ce);
				if (
					($.key === "ArrowLeft" || $.key === "ArrowRight" || $.key === "Home" || $.key === "End") &&
					Pr($.currentTarget)
				)
					return;
				const ve = {
					ArrowUp:
						(V || ne) &&
						(() => {
							if (V) {
								const pe = sN(ce);
								return pe?.id;
							}
							return n?.last();
						}),
					ArrowRight: (V || N) && n.first,
					ArrowDown: (V || ne) && n.first,
					ArrowLeft: (V || N) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[$.key];
				if (ve) {
					const pe = ve();
					if (pe !== void 0) {
						if (!X($)) return;
						($.preventDefault(), n.move(pe));
					}
				}
			});
		return (
			(o = wn(o, ($) => (0, S.jsx)(fl, { value: n, children: $ }), [n])),
			(o = {
				"aria-activedescendant": n.useState(($) => {
					var B;
					if (n && i && $.virtualFocus) return (B = la(n, $.activeId)) == null ? void 0 : B.id;
				}),
				...o,
				ref: Qt(h, _, o.ref),
				onKeyDownCapture: x,
				onKeyUpCapture: R,
				onFocusCapture: D,
				onFocus: O,
				onBlurCapture: L,
				onKeyDown: M,
			}),
			(o = dl({ focusable: n.useState(($) => i && ($.virtualFocus || $.activeId === null)), ...o })),
			o
		);
	}),
	DD = Ye(function (n) {
		return Je(rN, mm(n));
	}),
	hl = Kr(),
	jD = hl.useContext,
	qD = hl.useScopedContext,
	vm = hl.useProviderContext,
	oN = hl.ContextProvider,
	cN = hl.ScopedContextProvider,
	ml = Kr([oN], [cN]),
	ID = ml.useContext,
	LD = ml.useScopedContext,
	Rc = ml.useProviderContext,
	fN = ml.ContextProvider,
	gm = ml.ScopedContextProvider,
	dN = (0, b.createContext)(void 0),
	hN = (0, b.createContext)(void 0),
	vl = Kr([fN], [gm]),
	UD = vl.useContext,
	$D = vl.useScopedContext,
	Cc = vl.useProviderContext,
	p_ = vl.ContextProvider,
	kc = vl.ScopedContextProvider,
	mN = "div",
	ym = et(function ({ store: n, ...i }) {
		const u = Cc();
		return ((n = n || u), (i = { ...i, ref: Qt(n?.setAnchorElement, i.ref) }), i);
	}),
	BD = Ye(function (n) {
		return Je(mN, ym(n));
	}),
	b_ = (0, b.createContext)(void 0),
	gl = Kr([p_, fl], [kc, Tc]),
	vN = gl.useContext,
	__ = gl.useScopedContext,
	Mc = gl.useProviderContext,
	VD = gl.ContextProvider,
	gN = gl.ScopedContextProvider,
	yN = (0, b.createContext)(void 0),
	pN = (0, b.createContext)(!1);
function Ja(e, n) {
	const i = e.__unstableInternals;
	return (Ht(i, "Invalid store"), i[n]);
}
function Or(e, ...n) {
	let i = e,
		u = i,
		l = Symbol(),
		o = Fs;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		_ = new WeakMap(),
		p = new WeakMap(),
		w = (M) => (m.add(M), () => m.delete(M)),
		x = () => {
			const M = f.size,
				$ = Symbol();
			f.add($);
			const B = () => {
				(f.delete($), !f.size && o());
			};
			if (M) return B;
			const P = gM(i).map((te) =>
					Kn(
						...n.map((ne) => {
							var N;
							const V = (N = ne?.getState) == null ? void 0 : N.call(ne);
							if (V && Ci(V, te))
								return Cn(ne, [te], (Q) => {
									J(te, Q[te], !0);
								});
						}),
					),
				),
				ce = [];
			for (const te of m) ce.push(te());
			const se = n.map(pm);
			return ((o = Kn(...P, ...ce, ...se)), B);
		},
		R = (M, $, B = v) => (
			B.add($),
			p.set($, M),
			() => {
				var P;
				((P = _.get($)) == null || P(), _.delete($), p.delete($), B.delete($));
			}
		),
		I = (M, $) => R(M, $),
		D = (M, $) => (_.set($, $(i, i)), R(M, $)),
		q = (M, $) => (_.set($, $(i, u)), R(M, $, g)),
		O = (M) => Or(vM(i, M), X),
		C = (M) => Or(mM(i, M), X),
		L = () => i,
		J = (M, $, B = !1) => {
			var P;
			if (!Ci(i, M)) return;
			const ce = r_($, i[M]);
			if (ce === i[M]) return;
			if (!B) for (const N of n) (P = N?.setState) == null || P.call(N, M, ce);
			const se = i;
			i = { ...i, [M]: ce };
			const te = Symbol();
			((l = te), h.add(M));
			const ne = (N, V, Q) => {
				var ve;
				const pe = p.get(N),
					$e = (k) => (Q ? Q.has(k) : k === M);
				(!pe || pe.some($e)) && ((ve = _.get(N)) == null || ve(), _.set(N, N(i, V)));
			};
			for (const N of v) ne(N, se);
			queueMicrotask(() => {
				if (l !== te) return;
				const N = i;
				for (const V of g) ne(V, u, h);
				((u = N), h.clear());
			});
		},
		X = {
			getState: L,
			setState: J,
			__unstableInternals: { setup: w, init: x, subscribe: I, sync: D, batch: q, pick: O, omit: C },
		};
	return X;
}
function Dn(e, ...n) {
	if (e) return Ja(e, "setup")(...n);
}
function pm(e, ...n) {
	if (e) return Ja(e, "init")(...n);
}
function bm(e, ...n) {
	if (e) return Ja(e, "subscribe")(...n);
}
function Cn(e, ...n) {
	if (e) return Ja(e, "sync")(...n);
}
function lc(e, ...n) {
	if (e) return Ja(e, "batch")(...n);
}
function _m(e, ...n) {
	if (e) return Ja(e, "omit")(...n);
}
function S_(e, ...n) {
	if (e) return Ja(e, "pick")(...n);
}
function Nc(...e) {
	var n;
	const i = {};
	for (const l of e) {
		const o = (n = l?.getState) == null ? void 0 : n.call(l);
		o && Object.assign(i, o);
	}
	const u = Or(i, ...e);
	return Object.assign({}, ...e, u);
}
var bN = "input";
function hp(e, n, i) {
	if (!i) return !1;
	const u = e.find((l) => !l.disabled && l.value);
	return u?.value === n;
}
function mp(e, n) {
	return !n || e == null ? !1 : ((e = i_(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function _N(e) {
	return e.type === "input";
}
function SN(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function wN(e) {
	const n = e.find((i) => {
		var u;
		return i.disabled ? !1 : ((u = i.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var EN = et(function ({
		store: n,
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
		...I
	}) {
		const D = Mc();
		((n = n || D), Ht(n, !1));
		const q = (0, b.useRef)(null),
			[O, C] = d_(),
			L = (0, b.useRef)(!1),
			J = (0, b.useRef)(!1),
			X = n.useState((fe) => fe.virtualFocus && u),
			M = R === "inline" || R === "both",
			[$, B] = (0, b.useState)(M);
		RM(() => {
			M && B(!0);
		}, [M]);
		const P = n.useState("value"),
			ce = (0, b.useRef)();
		(0, b.useEffect)(
			() =>
				Cn(n, ["selectedValue", "activeId"], (fe, ke) => {
					ce.current = ke.selectedValue;
				}),
			[],
		);
		const se = n.useState((fe) => {
				var ke;
				if (
					M &&
					$ &&
					!(
						fe.activeValue &&
						Array.isArray(fe.selectedValue) &&
						(fe.selectedValue.includes(fe.activeValue) || ((ke = ce.current) != null && ke.includes(fe.activeValue)))
					)
				)
					return fe.activeValue;
			}),
			te = n.useState("renderedItems"),
			ne = n.useState("open"),
			N = n.useState("contentElement"),
			V = (0, b.useMemo)(() => {
				if (!M || !$) return P;
				if (hp(te, se, X)) {
					if (mp(P, se)) {
						const fe = se?.slice(P.length) || "";
						return P + fe;
					}
					return P;
				}
				return se || P;
			}, [M, $, te, se, X, P]);
		((0, b.useEffect)(() => {
			const fe = q.current;
			if (!fe) return;
			const ke = () => B(!0);
			return (
				fe.addEventListener("combobox-item-move", ke),
				() => {
					fe.removeEventListener("combobox-item-move", ke);
				}
			);
		}, []),
			(0, b.useEffect)(() => {
				if (!M || !$ || !se || !hp(te, se, X) || !mp(P, se)) return;
				let fe = Fs;
				return (
					queueMicrotask(() => {
						const ke = q.current;
						if (!ke) return;
						const { start: St, end: ze } = Oh(ke),
							dt = P.length,
							Rt = se.length;
						(Wd(ke, dt, Rt),
							(fe = () => {
								if (!Pa(ke)) return;
								const { start: ut, end: Ot } = Oh(ke);
								ut === dt && Ot === Rt && Wd(ke, St, ze);
							}));
					}),
					() => fe()
				);
			}, [O, M, $, se, te, X, P]));
		const Q = (0, b.useRef)(null),
			ve = De(l),
			pe = (0, b.useRef)(null);
		((0, b.useEffect)(() => {
			if (!ne || !N) return;
			const fe = um(N);
			if (!fe) return;
			Q.current = fe;
			const ke = () => {
					L.current = !1;
				},
				St = () => {
					if (!n || !L.current) return;
					const { activeId: dt } = n.getState();
					dt !== null && dt !== pe.current && (L.current = !1);
				},
				ze = { passive: !0, capture: !0 };
			return (
				fe.addEventListener("wheel", ke, ze),
				fe.addEventListener("touchmove", ke, ze),
				fe.addEventListener("scroll", St, ze),
				() => {
					(fe.removeEventListener("wheel", ke, !0),
						fe.removeEventListener("touchmove", ke, !0),
						fe.removeEventListener("scroll", St, !0));
				}
			);
		}, [ne, N, n]),
			at(() => {
				P && (J.current || (L.current = !0));
			}, [P]),
			at(() => {
				(X !== "always" && ne) || (L.current = ne);
			}, [X, ne]));
		const $e = n.useState("resetValueOnSelect");
		(Fu(() => {
			var fe, ke;
			const St = L.current;
			if (!n || !ne || (!St && !$e)) return;
			const { baseElement: ze, contentElement: dt, activeId: Rt } = n.getState();
			if (!(ze && !Pa(ze))) {
				if (dt?.hasAttribute("data-placing")) {
					const ut = new MutationObserver(C);
					return (ut.observe(dt, { attributeFilter: ["data-placing"] }), () => ut.disconnect());
				}
				if (X && St) {
					const ut = ve(te),
						Ot = ut !== void 0 ? ut : (fe = wN(te)) != null ? fe : n.first();
					((pe.current = Ot), n.move(Ot ?? null));
				} else {
					const ut = (ke = n.item(Rt || n.first())) == null ? void 0 : ke.element;
					ut && "scrollIntoView" in ut && ut.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ne, O, P, X, $e, ve, te]),
			(0, b.useEffect)(() => {
				if (!M) return;
				const fe = q.current;
				if (!fe) return;
				const ke = [fe, N].filter((ze) => !!ze),
					St = (ze) => {
						ke.every((dt) => $a(ze, dt)) && n?.setValue(V);
					};
				for (const ze of ke) ze.addEventListener("focusout", St);
				return () => {
					for (const ze of ke) ze.removeEventListener("focusout", St);
				};
			}, [M, N, n, V]));
		const k = (fe) => fe.currentTarget.value.length >= f,
			j = I.onChange,
			le = Mt(h ?? k),
			de = Mt(o ?? !n.tag),
			he = De((fe) => {
				if ((j?.(fe), fe.defaultPrevented || !n)) return;
				const ke = fe.currentTarget,
					{ value: St, selectionStart: ze, selectionEnd: dt } = ke,
					Rt = fe.nativeEvent;
				if (((L.current = !0), _N(Rt) && (Rt.isComposing && ((L.current = !1), (J.current = !0)), M))) {
					const ut = Rt.inputType === "insertText" || Rt.inputType === "insertCompositionText",
						Ot = ze === St.length;
					B(ut && Ot);
				}
				if (de(fe)) {
					const ut = St === n.getState().value;
					(n.setValue(St),
						queueMicrotask(() => {
							Wd(ke, ze, dt);
						}),
						M && X && ut && C());
				}
				(le(fe) && n.show(), (!X || !L.current) && n.setActiveId(null));
			}),
			Se = I.onCompositionEnd,
			ye = De((fe) => {
				((L.current = !0), (J.current = !1), Se?.(fe), !fe.defaultPrevented && X && C());
			}),
			Ne = I.onMouseDown,
			Ue = Mt(p ?? (() => !!n?.getState().includesBaseElement)),
			Ze = Mt(w),
			st = Mt(v ?? k),
			kn = De((fe) => {
				(Ne?.(fe),
					!fe.defaultPrevented &&
						(fe.button ||
							fe.ctrlKey ||
							(n &&
								(Ue(fe) && n.setActiveId(null),
								Ze(fe) && n.setValue(V),
								st(fe) && $u(fe.currentTarget, "mouseup", n.show)))));
			}),
			mn = I.onKeyDown,
			lt = Mt(_ ?? k),
			be = De((fe) => {
				if (
					(mn?.(fe),
					fe.repeat || (L.current = !1),
					fe.defaultPrevented || fe.ctrlKey || fe.altKey || fe.shiftKey || fe.metaKey || !n)
				)
					return;
				const { open: ke } = n.getState();
				ke || ((fe.key === "ArrowUp" || fe.key === "ArrowDown") && lt(fe) && (fe.preventDefault(), n.show()));
			}),
			Re = I.onBlur,
			He = De((fe) => {
				((L.current = !1), Re?.(fe), fe.defaultPrevented);
			}),
			Oe = Mi(I.id),
			$t = SN(R) ? R : void 0,
			ft = n.useState((fe) => fe.activeId === null);
		return (
			(I = {
				id: Oe,
				role: "combobox",
				"aria-autocomplete": $t,
				"aria-haspopup": bc(N, "listbox"),
				"aria-expanded": ne,
				"aria-controls": N?.id,
				"data-active-item": ft || void 0,
				value: V,
				...I,
				ref: Qt(q, I.ref),
				onChange: he,
				onCompositionEnd: ye,
				onMouseDown: kn,
				onKeyDown: be,
				onBlur: He,
			}),
			(I = mm({ store: n, focusable: i, ...I, moveOnKeyPress: (fe) => (_c(x, fe) ? !1 : (M && B(!0), !0)) })),
			(I = ym({ store: n, ...I })),
			{ autoComplete: "off", ...I }
		);
	}),
	TN = Ye(function (n) {
		return Je(bN, EN(n));
	}),
	xN = "button";
function vp(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? ca(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? ca(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var AN = Symbol("command"),
	Sm = et(function ({ clickOnEnter: n = !0, clickOnSpace: i = !0, ...u }) {
		const l = (0, b.useRef)(null),
			[o, f] = (0, b.useState)(!1);
		(0, b.useEffect)(() => {
			l.current && f(ca(l.current));
		}, []);
		const [h, m] = (0, b.useState)(!1),
			v = (0, b.useRef)(!1),
			g = ll(u),
			[_, p] = h_(u, AN, !0),
			w = u.onKeyDown,
			x = De((D) => {
				w?.(D);
				const q = D.currentTarget;
				if (D.defaultPrevented || _ || g || !ir(D) || Pr(q) || q.isContentEditable) return;
				const O = n && D.key === "Enter",
					C = i && D.key === " ",
					L = D.key === "Enter" && !n,
					J = D.key === " " && !i;
				if (L || J) {
					D.preventDefault();
					return;
				}
				if (O || C) {
					const X = vp(D);
					if (O) {
						if (!X) {
							D.preventDefault();
							const { view: M, ...$ } = D,
								B = () => tp(q, $);
							_M() ? $u(q, "keyup", B) : queueMicrotask(B);
						}
					} else C && ((v.current = !0), X || (D.preventDefault(), m(!0)));
				}
			}),
			R = u.onKeyUp,
			I = De((D) => {
				if ((R?.(D), D.defaultPrevented || _ || g || D.metaKey)) return;
				const q = i && D.key === " ";
				if (v.current && q && ((v.current = !1), !vp(D))) {
					(D.preventDefault(), m(!1));
					const O = D.currentTarget,
						{ view: C, ...L } = D;
					queueMicrotask(() => tp(O, L));
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
				onKeyUp: I,
			}),
			(u = dl(u)),
			u
		);
	}),
	ZD = Ye(function (n) {
		return Je(xN, Sm(n));
	}),
	w_ = "button",
	E_ = et(function (n) {
		const i = (0, b.useRef)(null),
			u = f_(i, w_),
			[l, o] = (0, b.useState)(() => !!u && ca({ tagName: u, type: n.type }));
		return (
			(0, b.useEffect)(() => {
				i.current && o(ca(i.current));
			}, []),
			(n = { role: !l && u !== "a" ? "button" : void 0, ...n, ref: Qt(i, n.ref) }),
			(n = Sm(n)),
			n
		);
	}),
	HD = Ye(function (n) {
		return Je(w_, E_(n));
	}),
	RN = "button",
	CN = Symbol("disclosure"),
	T_ = et(function ({ store: n, toggleOnClick: i = !0, ...u }) {
		const l = vm();
		((n = n || l), Ht(n, !1));
		const o = (0, b.useRef)(null),
			[f, h] = (0, b.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, b.useEffect)(() => {
			let I = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (I = !0)), h(v && I));
		}, [m, n, v]);
		const g = u.onClick,
			_ = Mt(i),
			[p, w] = h_(u, CN, !0),
			x = De((I) => {
				(g?.(I), !I.defaultPrevented && (p || (_(I) && (n?.setDisclosureElement(I.currentTarget), n?.toggle()))));
			}),
			R = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": R?.id, ...w, ...u, ref: Qt(o, u.ref), onClick: x }),
			(u = E_(u)),
			u
		);
	}),
	QD = Ye(function (n) {
		return Je(RN, T_(n));
	}),
	kN = "button",
	x_ = et(function ({ store: n, ...i }) {
		const u = Rc();
		return (
			(n = n || u),
			Ht(n, !1),
			(i = { "aria-haspopup": bc(n.useState("contentElement"), "dialog"), ...i }),
			(i = T_({ store: n, ...i })),
			i
		);
	}),
	PD = Ye(function (n) {
		return Je(kN, x_(n));
	}),
	MN = "div";
function A_(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function NN(e) {
	const n = A_(e);
	return n ? rn(e.currentTarget, n) : !1;
}
var qh = Symbol("composite-hover");
function ON(e) {
	let n = A_(e);
	if (!n) return !1;
	do {
		if (Ci(n, qh) && n[qh]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var wm = et(function ({ store: n, focusOnHover: i = !0, blurOnHoverEnd: u = !!i, ...l }) {
		const o = Ec();
		((n = n || o), Ht(n, !1));
		const f = cm(),
			h = l.onMouseMove,
			m = Mt(i),
			v = De((x) => {
				if ((h?.(x), !x.defaultPrevented && f() && m(x))) {
					if (!oa(x.currentTarget)) {
						const R = n?.getState().baseElement;
						R && !Pa(R) && R.focus();
					}
					n?.setActiveId(x.currentTarget.id);
				}
			}),
			g = l.onMouseLeave,
			_ = Mt(u),
			p = De((x) => {
				var R;
				(g?.(x),
					!x.defaultPrevented &&
						f() &&
						(NN(x) ||
							ON(x) ||
							(m(x) && _(x) && (n?.setActiveId(null), (R = n?.getState().baseElement) == null || R.focus()))));
			}),
			w = (0, b.useCallback)((x) => {
				x && (x[qh] = !0);
			}, []);
		return ((l = { ...l, ref: Qt(w, l.ref), onMouseMove: v, onMouseLeave: p }), Xa(l));
	}),
	KD = wc(
		Ye(function (n) {
			return Je(MN, wm(n));
		}),
	),
	zN = "div",
	R_ = et(function ({ store: n, shouldRegisterItem: i = !0, getItem: u = a_, element: l, ...o }) {
		const f = OM();
		n = n || f;
		const h = Mi(o.id),
			m = (0, b.useRef)(l);
		return (
			(0, b.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !i) return;
				const g = u({ id: h, element: v });
				return n?.renderItem(g);
			}, [h, i, u, n]),
			(o = { ...o, ref: Qt(m, o.ref) }),
			Xa(o)
		);
	}),
	YD = Ye(function (n) {
		return Je(zN, R_(n));
	}),
	DN = _r((e) => {
		var n = mc();
		function i(p, w) {
			return (p === w && (p !== 0 || 1 / p === 1 / w)) || (p !== p && w !== w);
		}
		var u = typeof Object.is == "function" ? Object.is : i,
			l = n.useState,
			o = n.useEffect,
			f = n.useLayoutEffect,
			h = n.useDebugValue;
		function m(p, w) {
			var x = w(),
				R = l({ inst: { value: x, getSnapshot: w } }),
				I = R[0].inst,
				D = R[1];
			return (
				f(
					function () {
						((I.value = x), (I.getSnapshot = w), v(I) && D({ inst: I }));
					},
					[p, x, w],
				),
				o(
					function () {
						return (
							v(I) && D({ inst: I }),
							p(function () {
								v(I) && D({ inst: I });
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
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : _;
	}),
	jN = _r((e, n) => {
		n.exports = DN();
	}),
	qN = eb(jN(), 1),
	{ useSyncExternalStore: C_ } = qN.default,
	k_ = () => () => {};
function tn(e, n = a_) {
	const i = b.useCallback((l) => (e ? bm(e, null, l) : k_()), [e]),
		u = () => {
			const l = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && l && Ci(f, l)) return f[l];
		};
	return C_(i, u, u);
}
function M_(e, n) {
	const i = b.useRef({}),
		u = b.useCallback((o) => (e ? bm(e, null, o) : k_()), [e]),
		l = () => {
			const o = e?.getState();
			let f = !1;
			const h = i.current;
			for (const m in n) {
				const v = n[m];
				if (typeof v == "function") {
					const g = v(o);
					g !== h[m] && ((h[m] = g), (f = !0));
				}
				if (typeof v == "string") {
					if (!o || !Ci(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (i.current = { ...h }), i.current);
		};
	return C_(u, l, l);
}
function Zt(e, n, i, u) {
	const l = Ci(n, i) ? n[i] : void 0,
		o = c_({ value: l, setValue: u ? n[u] : void 0 });
	(at(
		() =>
			Cn(e, [i], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[i] !== h[i] && f[i] !== m && v(f[i]);
			}),
		[e, i],
	),
		at(() => {
			if (l !== void 0)
				return (
					e.setState(i, l),
					lc(e, [i], () => {
						l !== void 0 && e.setState(i, l);
					})
				);
		}));
}
function Oc(e, n) {
	const [i, u] = b.useState(() => e(n));
	at(() => pm(i), [i]);
	const l = b.useCallback((o) => tn(i, o), [i]);
	return [
		b.useMemo(() => ({ ...i, useState: l }), [i, l]),
		De(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var IN = "button";
function LN(e) {
	return Nh(e) ? !0 : e.tagName === "INPUT" && !ca(e);
}
function UN(e, n = !1) {
	const i = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		l = Math.max(i * 0.875, i - 40) * 1.5,
		o = n ? i - l + u : l + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function $N(e, n = !1) {
	const { top: i } = e.getBoundingClientRect();
	return n ? i + e.clientHeight : i;
}
function gp(e, n, i, u = !1) {
	var l;
	if (!n || !i) return;
	const { renderedItems: o } = n.getState(),
		f = um(e);
	if (!f) return;
	const h = UN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const _ = m;
		if (((m = i(g)), !m)) break;
		if (m === _) continue;
		const p = (l = la(n, m)) == null ? void 0 : l.element;
		if (!p) continue;
		const w = $N(p, u) - h,
			x = Math.abs(w);
		if ((u && w <= 0) || (!u && w >= 0)) {
			v !== void 0 && v < x && (m = _);
			break;
		}
		v = x;
	}
	return m;
}
function BN(e, n) {
	return ir(e) ? !1 : Gs(n, e.target);
}
var Em = et(function ({
		store: n,
		rowId: i,
		preventScrollOnKeyDown: u = !1,
		moveOnKeyPress: l = !0,
		tabbable: o = !1,
		getItem: f,
		"aria-setsize": h,
		"aria-posinset": m,
		...v
	}) {
		const g = Ec();
		n = n || g;
		const _ = Mi(v.id),
			p = (0, b.useRef)(null),
			w = (0, b.useContext)(IM),
			x = ll(v) && !v.accessibleWhenDisabled,
			{
				rowId: R,
				baseElement: I,
				isActiveItem: D,
				ariaSetSize: q,
				ariaPosInSet: O,
				isTabbable: C,
			} = M_(n, {
				rowId(N) {
					if (i) return i;
					if (N && w?.baseElement && w.baseElement === N.baseElement) return w.id;
				},
				baseElement(N) {
					return N?.baseElement || void 0;
				},
				isActiveItem(N) {
					return !!N && N.activeId === _;
				},
				ariaSetSize(N) {
					if (h != null) return h;
					if (N && w?.ariaSetSize && w.baseElement === N.baseElement) return w.ariaSetSize;
				},
				ariaPosInSet(N) {
					if (m != null) return m;
					if (!N || !w?.ariaPosInSet || w.baseElement !== N.baseElement) return;
					const V = N.renderedItems.filter((Q) => Q.rowId === R);
					return w.ariaPosInSet + V.findIndex((Q) => Q.id === _);
				},
				isTabbable(N) {
					if (!N?.renderedItems.length) return !0;
					if (N.virtualFocus) return !1;
					if (o) return !0;
					if (N.activeId === null) return !1;
					const V = n?.item(N.activeId);
					return V?.disabled || !V?.element ? !0 : N.activeId === _;
				},
			}),
			L = (0, b.useCallback)(
				(N) => {
					var V;
					const Q = {
						...N,
						id: _ || N.id,
						rowId: R,
						disabled: !!x,
						children: (V = N.element) == null ? void 0 : V.textContent,
					};
					return f ? f(Q) : Q;
				},
				[_, R, x, f],
			),
			J = v.onFocus,
			X = (0, b.useRef)(!1),
			M = De((N) => {
				if ((J?.(N), N.defaultPrevented || s_(N) || !_ || !n || BN(N, n))) return;
				const { virtualFocus: V, baseElement: Q } = n.getState();
				(n.setActiveId(_),
					Nh(N.currentTarget) && oM(N.currentTarget),
					V &&
						ir(N) &&
						(LN(N.currentTarget) ||
							(Q?.isConnected &&
								(Sc() &&
									N.currentTarget.hasAttribute("data-autofocus") &&
									N.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(X.current = !0),
								N.relatedTarget === Q || Gs(n, N.relatedTarget) ? cM(Q) : Q.focus()))));
			}),
			$ = v.onBlurCapture,
			B = De((N) => {
				if (($?.(N), N.defaultPrevented)) return;
				const V = n?.getState();
				V?.virtualFocus && X.current && ((X.current = !1), N.preventDefault(), N.stopPropagation());
			}),
			P = v.onKeyDown,
			ce = Mt(u),
			se = Mt(l),
			te = De((N) => {
				if ((P?.(N), N.defaultPrevented || !ir(N) || !n)) return;
				const { currentTarget: V } = N,
					Q = n.getState(),
					ve = n.item(_),
					pe = !!ve?.rowId,
					$e = Q.orientation !== "horizontal",
					k = Q.orientation !== "vertical",
					j = () => !!(pe || k || !Q.baseElement || !Pr(Q.baseElement)),
					le = {
						ArrowUp: (pe || $e) && n.up,
						ArrowRight: (pe || k) && n.next,
						ArrowDown: (pe || $e) && n.down,
						ArrowLeft: (pe || k) && n.previous,
						Home: () => {
							if (j()) return !pe || N.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (j()) return !pe || N.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => gp(V, n, n?.up, !0),
						PageDown: () => gp(V, n, n?.down),
					}[N.key];
				if (le) {
					if (Nh(V)) {
						const he = Oh(V),
							Se = k && N.key === "ArrowLeft",
							ye = k && N.key === "ArrowRight",
							Ne = $e && N.key === "ArrowUp",
							Ue = $e && N.key === "ArrowDown";
						if (ye || Ue) {
							const { length: Ze } = rM(V);
							if (he.end !== Ze) return;
						} else if ((Se || Ne) && he.start !== 0) return;
					}
					const de = le();
					if (ce(N) || de !== void 0) {
						if (!se(N)) return;
						(N.preventDefault(), n.move(de));
					}
				}
			}),
			ne = (0, b.useMemo)(() => ({ id: _, baseElement: I }), [_, I]);
		return (
			(v = wn(v, (N) => (0, S.jsx)(qM.Provider, { value: ne, children: N }), [ne])),
			(v = {
				id: _,
				"data-active-item": D || void 0,
				...v,
				ref: Qt(p, v.ref),
				tabIndex: C ? v.tabIndex : -1,
				onFocus: M,
				onBlurCapture: B,
				onKeyDown: te,
			}),
			(v = Sm(v)),
			(v = R_({ store: n, ...v, getItem: L, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			Xa({ ...v, "aria-setsize": q, "aria-posinset": O })
		);
	}),
	GD = wc(
		Ye(function (n) {
			return Je(IN, Em(n));
		}),
	),
	VN = "div";
function ZN(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function HN(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var QN = et(function ({
		store: n,
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
		((n = n || p), Ht(n, !1));
		const {
				resetValueOnSelectState: w,
				multiSelectable: x,
				selected: R,
			} = M_(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(B) {
					return Array.isArray(B.selectedValue);
				},
				selected(B) {
					return ZN(B.selectedValue, i);
				},
			}),
			I = (0, b.useCallback)(
				(B) => {
					const P = { ...B, value: i };
					return v ? v(P) : P;
				},
				[i, v],
			);
		((l = l ?? !x), (u = u ?? (i != null && !x)));
		const D = g.onClick,
			q = Mt(l),
			O = Mt(o),
			C = Mt((_ = f ?? w) != null ? _ : x),
			L = Mt(u),
			J = De((B) => {
				(D?.(B),
					!B.defaultPrevented &&
						(o_(B) ||
							l_(B) ||
							(i != null &&
								(O(B) &&
									(C(B) && n?.resetValue(),
									n?.setSelectedValue((P) =>
										Array.isArray(P) ? (P.includes(i) ? P.filter((ce) => ce !== i) : [...P, i]) : i,
									)),
								q(B) && n?.setValue(i)),
							L(B) && n?.hide())));
			}),
			X = g.onKeyDown,
			M = De((B) => {
				if ((X?.(B), B.defaultPrevented)) return;
				const P = n?.getState().baseElement;
				P &&
					(Pa(P) ||
						((B.key.length === 1 || B.key === "Backspace" || B.key === "Delete") &&
							(queueMicrotask(() => P.focus()), Pr(P) && n?.setValue(P.value))));
			});
		(x && R != null && (g = { "aria-selected": R, ...g }),
			(g = wn(
				g,
				(B) =>
					(0, S.jsx)(yN.Provider, { value: i, children: (0, S.jsx)(pN.Provider, { value: R ?? !1, children: B }) }),
				[i, R],
			)),
			(g = { role: HN((0, b.useContext)(b_)), children: i, ...g, onClick: J, onKeyDown: M }));
		const $ = Mt(m);
		return (
			(g = Em({
				store: n,
				...g,
				getItem: I,
				moveOnKeyPress: (B) => {
					if (!$(B)) return !1;
					const P = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(P), !0);
				},
			})),
			(g = wm({ store: n, focusOnHover: h, ...g })),
			g
		);
	}),
	PN = wc(
		Ye(function (n) {
			return Je(VN, QN(n));
		}),
	),
	oc = mb(),
	KN = "div";
function yp(e, n) {
	const i = setTimeout(n, e);
	return () => clearTimeout(i);
}
function YN(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function pp(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, i) => {
			const u = i.endsWith("ms") ? 1 : 1e3,
				l = Number.parseFloat(i || "0s") * u;
			return l > n ? l : n;
		}, 0);
}
function zc(e, n, i) {
	return !i && n !== !1 && (!e || !!n);
}
var Tm = et(function ({ store: n, alwaysVisible: i, ...u }) {
		const l = vm();
		((n = n || l), Ht(n, !1));
		const o = (0, b.useRef)(null),
			f = Mi(u.id),
			[h, m] = (0, b.useState)(null),
			v = n.useState("open"),
			g = n.useState("mounted"),
			_ = n.useState("animated"),
			p = n.useState("contentElement"),
			w = tn(n.disclosure, "contentElement");
		(at(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			at(() => {
				let D;
				return (
					n?.setState("animated", (q) => ((D = q), !0)),
					() => {
						D !== void 0 && n?.setState("animated", D);
					}
				);
			}, [n]),
			at(() => {
				if (_) {
					if (!p?.isConnected) {
						m(null);
						return;
					}
					return YN(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [_, p, v, g]),
			at(() => {
				if (!n || !_ || !h || !p) return;
				const D = () => n?.setState("animating", !1),
					q = () => (0, oc.flushSync)(D);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return yp(_, q);
				const {
						transitionDuration: O,
						animationDuration: C,
						transitionDelay: L,
						animationDelay: J,
					} = getComputedStyle(p),
					{
						transitionDuration: X = "0",
						animationDuration: M = "0",
						transitionDelay: $ = "0",
						animationDelay: B = "0",
					} = w ? getComputedStyle(w) : {},
					P = pp(L, J, $, B) + pp(O, C, X, M);
				if (!P) {
					(h === "enter" && n.setState("animated", !1), D());
					return;
				}
				return yp(Math.max(P - 1e3 / 60, 0), q);
			}, [n, _, p, w, v, h]),
			(u = wn(u, (D) => (0, S.jsx)(gm, { value: n, children: D }), [n])));
		const x = zc(g, u.hidden, i),
			R = u.style,
			I = (0, b.useMemo)(() => (x ? { ...R, display: "none" } : R), [x, R]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: x,
				...u,
				ref: Qt(f ? n.setContentElement : null, o, u.ref),
				style: I,
			}),
			Xa(u)
		);
	}),
	GN = Ye(function (n) {
		return Je(KN, Tm(n));
	}),
	FD = Ye(function ({ unmountOnHide: n, ...i }) {
		const u = vm();
		return tn(i.store || u, (l) => !n || l?.mounted) === !1 ? null : (0, S.jsx)(GN, { ...i });
	}),
	FN = "div",
	N_ = et(function ({ store: n, alwaysVisible: i, ...u }) {
		const l = __(!0),
			o = vN();
		n = n || o;
		const f = !!n && n === l;
		Ht(n, !1);
		const h = (0, b.useRef)(null),
			m = Mi(u.id),
			v = n.useState("mounted"),
			g = zc(v, u.hidden, i),
			_ = g ? { ...u.style, display: "none" } : u.style,
			p = n.useState((O) => Array.isArray(O.selectedValue)),
			w = AM(h, "role", u.role),
			x = ((w === "listbox" || w === "tree" || w === "grid") && p) || void 0,
			[R, I] = (0, b.useState)(!1),
			D = n.useState("contentElement");
		(at(() => {
			if (!v) return;
			const O = h.current;
			if (!O || D !== O) return;
			const C = () => {
					I(!!O.querySelector("[role='listbox']"));
				},
				L = new MutationObserver(C);
			return (L.observe(O, { subtree: !0, childList: !0, attributeFilter: ["role"] }), C(), () => L.disconnect());
		}, [v, D]),
			R || (u = { role: "listbox", "aria-multiselectable": x, ...u }),
			(u = wn(u, (O) => (0, S.jsx)(gN, { value: n, children: (0, S.jsx)(b_.Provider, { value: w, children: O }) }), [
				n,
				w,
			])));
		const q = m && (!l || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Qt(q, h, u.ref), style: _ }), Xa(u));
	}),
	XD = Ye(function (n) {
		return Je(FN, N_(n));
	}),
	bp = (0, b.createContext)(null),
	XN = "span",
	O_ = et(function (n) {
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
	JD = Ye(function (n) {
		return Je(XN, O_(n));
	}),
	JN = "span",
	WN = et(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = O_(n)),
			n
		);
	}),
	Vo = Ye(function (n) {
		return Je(JN, WN(n));
	}),
	eO = "div";
function tO(e) {
	return At(e).body;
}
function nO(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : At(e).createElement("div");
}
function rO(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function ua(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var z_ = et(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: i,
		portalElement: u,
		portalRef: l,
		portal: o = !0,
		...f
	}) {
		const h = (0, b.useRef)(null),
			m = Qt(h, f.ref),
			v = (0, b.useContext)(bp),
			[g, _] = (0, b.useState)(null),
			[p, w] = (0, b.useState)(null),
			x = (0, b.useRef)(null),
			R = (0, b.useRef)(null),
			I = (0, b.useRef)(null),
			D = (0, b.useRef)(null);
		return (
			at(() => {
				const q = h.current;
				if (!q || !o) {
					_(null);
					return;
				}
				const O = nO(q, u);
				if (!O) {
					_(null);
					return;
				}
				const C = O.isConnected;
				if ((C || (v || tO(q)).appendChild(O), O.id || (O.id = q.id ? `portal/${q.id}` : rO()), _(O), Dh(l, O), !C))
					return () => {
						(O.remove(), Dh(l, null));
					};
			}, [o, u, v, l]),
			at(() => {
				if (!o || !n || !i) return;
				const q = At(i).createElement("span");
				return (
					(q.style.position = "fixed"),
					i.insertAdjacentElement("afterend", q),
					w(q),
					() => {
						(q.remove(), w(null));
					}
				);
			}, [o, n, i]),
			(0, b.useEffect)(() => {
				if (!g || !n) return;
				let q = 0;
				const O = (C) => {
					if (!$a(C)) return;
					const L = C.type === "focusin";
					if ((cancelAnimationFrame(q), L)) return QM(g);
					q = requestAnimationFrame(() => {
						HM(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", O, !0),
					g.addEventListener("focusout", O, !0),
					() => {
						(cancelAnimationFrame(q),
							g.removeEventListener("focusin", O, !0),
							g.removeEventListener("focusout", O, !0));
					}
				);
			}, [g, n]),
			(f = wn(
				f,
				(q) => {
					if (((q = (0, S.jsx)(bp.Provider, { value: g || v, children: q })), !o)) return q;
					if (!g) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((q = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(Vo, {
									ref: R,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (C) => {
										$a(C, g) ? ua(eh()) : ua(x.current);
									},
								}),
							q,
							n &&
								g &&
								(0, S.jsx)(Vo, {
									ref: I,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (C) => {
										$a(C, g) ? ua(sp()) : ua(D.current);
									},
								}),
						],
					})),
						g && (q = (0, oc.createPortal)(q, g)));
					let O = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(Vo, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (C) => {
										C.relatedTarget !== D.current && $a(C, g) ? ua(R.current) : ua(sp());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							n &&
								g &&
								(0, S.jsx)(Vo, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (C) => {
										if ($a(C, g)) ua(I.current);
										else {
											const L = eh();
											if (L === R.current) {
												requestAnimationFrame(() => {
													var J;
													return (J = eh()) == null ? void 0 : J.focus();
												});
												return;
											}
											ua(L);
										}
									},
								}),
						],
					});
					return (p && n && (O = (0, oc.createPortal)(O, p)), (0, S.jsxs)(S.Fragment, { children: [O, q] }));
				},
				[g, v, o, f.id, n, p],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	WD = Ye(function (n) {
		return Je(eO, z_(n));
	}),
	_p = (0, b.createContext)(0);
function iO({ level: e, children: n }) {
	const i = (0, b.useContext)(_p),
		u = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, S.jsx)(_p.Provider, { value: u, children: n });
}
var aO = "div",
	D_ = et(function ({ autoFocusOnShow: n = !0, ...i }) {
		return ((i = wn(i, (u) => (0, S.jsx)(m_.Provider, { value: n, children: u }), [n])), i);
	}),
	ej = Ye(function (n) {
		return Je(aO, D_(n));
	});
function uO(e, n) {
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
		i.addEventListener("click", n),
		e.prepend(i),
		() => {
			(i.removeEventListener("click", n), i.remove());
		}
	);
}
function sO(e) {
	const n = (0, b.useRef)();
	return (
		(0, b.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return Sn(
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
var nh = new WeakMap();
function yl(e, n, i) {
	nh.has(e) || nh.set(e, new Map());
	const u = nh.get(e),
		l = u.get(n);
	if (!l)
		return (
			u.set(n, i()),
			() => {
				var h;
				((h = u.get(n)) == null || h(), u.delete(n));
			}
		);
	const o = i(),
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
function xm(e, n, i) {
	return yl(e, n, () => {
		const l = e.getAttribute(n);
		return (
			e.setAttribute(n, i),
			() => {
				l == null ? e.removeAttribute(n) : e.setAttribute(n, l);
			}
		);
	});
}
function Ka(e, n, i) {
	return yl(e, n, () => {
		const l = n in e,
			o = e[n];
		return (
			(e[n] = i),
			() => {
				l ? (e[n] = o) : delete e[n];
			}
		);
	});
}
function Ih(e, n) {
	return e
		? yl(e, "style", () => {
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
function lO(e, n, i) {
	return e
		? yl(e, n, () => {
				const l = e.style.getPropertyValue(n);
				return (
					e.style.setProperty(n, i),
					() => {
						l ? e.style.setProperty(n, l) : e.style.removeProperty(n);
					}
				);
			})
		: () => {};
}
var oO = ["SCRIPT", "STYLE"];
function Lh(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function cO(e, n) {
	const i = At(n),
		u = Lh(e);
	if (!i.body[u]) return !0;
	do {
		if (n === i.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function fO(e, n, i) {
	return oO.includes(n.tagName) || !cO(e, n) ? !1 : !i.some((u) => u && rn(n, u));
}
function Am(e, n, i, u) {
	for (let l of n) {
		if (!l?.isConnected) continue;
		const o = n.some((m) => (!m || m === l ? !1 : m.contains(l))),
			f = At(l),
			h = l;
		for (; l.parentElement && l !== f.body; ) {
			if ((u?.(l.parentElement, h), !o)) for (const m of l.parentElement.children) fO(e, m, n) && i(m, h);
			l = l.parentElement;
		}
	}
}
function dO(e, n) {
	const { body: i } = At(n[0]),
		u = [];
	return (
		Am(e, n, (o) => {
			u.push(Ka(o, Lh(e), !0));
		}),
		Kn(Ka(i, Lh(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function j_(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !n.length ? !0 : n.some((u) => i === u);
}
function Ku(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function hO(e, n = "") {
	return Kn(Ka(e, Ku(), !0), Ka(e, Ku(n), !0));
}
function q_(e, n = "") {
	return Kn(Ka(e, Ku("", !0), !0), Ka(e, Ku(n, !0), !0));
}
function Rm(e, n) {
	const i = Ku(n, !0);
	if (e[i]) return !0;
	const u = Ku(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function Sp(e, n) {
	const i = [],
		u = n.map((o) => o?.id);
	return (
		Am(
			e,
			n,
			(o) => {
				j_(o, ...u) || i.unshift(hO(o, e));
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
function mO(e) {
	return e.tagName === "HTML" ? !0 : rn(At(e).body, e);
}
function vO(e, n) {
	if (!e) return !1;
	if (rn(e, n)) return !0;
	const i = n.getAttribute("aria-activedescendant");
	if (i) {
		const u = At(e).getElementById(i);
		if (u) return rn(e, u);
	}
	return !1;
}
function gO(e, n) {
	if (!("clientY" in e)) return !1;
	const i = n.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function rh({ store: e, type: n, listener: i, capture: u, domReady: l }) {
	const o = De(i),
		f = tn(e, "open"),
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
					? Sn(
							n,
							(v) => {
								const { contentElement: g, disclosureElement: _ } = e.getState(),
									p = v.target;
								g &&
									p &&
									mO(p) &&
									(rn(g, p) ||
										vO(_, p) ||
										p.hasAttribute("data-focus-trap") ||
										gO(v, g) ||
										(h.current && !Rm(p, g.id)) ||
										GM(p) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function ih(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function yO(e, n, i) {
	const u = sO(tn(e, "open")),
		l = { store: e, domReady: i, capture: !0 };
	(rh({
		...l,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && e_(h) && Rm(h, f?.id) && ih(n, o) && e.hide();
		},
	}),
		rh({
			...l,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== At(f) && ih(n, o) && e.hide();
			},
		}),
		rh({
			...l,
			type: "contextmenu",
			listener: (o) => {
				ih(n, o) && e.hide();
			},
		}));
}
var wp = (0, b.createContext)({});
function pO(e) {
	const n = (0, b.useContext)(wp),
		[i, u] = (0, b.useState)([]),
		l = (0, b.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					Kn((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	at(
		() =>
			Cn(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, b.useMemo)(() => ({ store: e, add: l }), [e, l]);
	return {
		wrapElement: (0, b.useCallback)((f) => (0, S.jsx)(wp.Provider, { value: o, children: f }), [o]),
		nestedDialogs: i,
	};
}
function bO({ attribute: e, contentId: n, contentElement: i, enabled: u }) {
	const [l, o] = d_(),
		f = (0, b.useCallback)(() => {
			if (!u || !i) return !1;
			const { body: h } = At(i),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [l, u, i, e, n]);
	return (
		(0, b.useEffect)(() => {
			if (!u || !n || !i) return;
			const { body: h } = At(i);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, oc.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [l, u, n, i, f, e]),
		f
	);
}
function _O(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function SO(e, n, i) {
	const u = bO({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: i });
	(0, b.useEffect)(() => {
		if (!u() || !e) return;
		const l = At(e),
			o = Wb(e),
			{ documentElement: f, body: h } = l,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => lO(f, "--scrollbar-width", `${v}px`),
			_ = _O(f),
			p = () => Ih(h, { overflow: "hidden", [_]: `${v}px` }),
			w = () => {
				var R, I;
				const { scrollX: D, scrollY: q, visualViewport: O } = o,
					C = (R = O?.offsetLeft) != null ? R : 0,
					L = (I = O?.offsetTop) != null ? I : 0,
					J = Ih(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(q - Math.floor(L))}px`,
						left: `${-(D - Math.floor(C))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(J(), o.scrollTo({ left: D, top: q, behavior: "instant" }));
				};
			},
			x = sm() && !SM();
		return Kn(g(), x ? w() : p());
	}, [u, e]);
}
function wO(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : n.length ? (i === "" ? !1 : n.some((u) => i === u)) : !0;
}
function I_() {
	return "inert" in HTMLElement.prototype;
}
function EO(e) {
	return xm(e, "aria-hidden", "true");
}
function L_(e, n) {
	return "style" in e
		? I_()
			? Ka(e, "inert", !0)
			: Kn(
					...Ac(e, !0).map((i) => {
						if (n?.some((l) => l && rn(l, i))) return Fs;
						const u = yl(
							i,
							"focus",
							() => (
								(i.focus = Fs),
								() => {
									delete i.focus;
								}
							),
						);
						return Kn(xm(i, "tabindex", "-1"), u);
					}),
					EO(e),
					Ih(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: Fs;
}
function TO(e, n) {
	const i = [],
		u = n.map((o) => o?.id);
	return (
		Am(
			e,
			n,
			(o) => {
				j_(o, ...u) || wO(o, ...u) || i.unshift(L_(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && rn(f, o)) || i.unshift(xm(o, "role", "none")));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function U_(e = {}) {
	const n = Nc(e.store, _m(e.disclosure, ["contentElement", "disclosureElement"]));
	const i = n?.getState(),
		u = je(e.open, i?.open, e.defaultOpen, !1),
		l = je(e.animated, i?.animated, !1),
		o = Or(
			{
				open: u,
				animated: l,
				animating: !!l && u,
				mounted: u,
				contentElement: je(i?.contentElement, null),
				disclosureElement: je(i?.disclosureElement, null),
			},
			n,
		);
	return (
		Dn(o, () =>
			Cn(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Dn(o, () =>
			bm(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Dn(o, () =>
			Cn(o, ["open", "animating"], (f) => {
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
function $_(e, n, i) {
	return (
		Fu(n, [i.store, i.disclosure]),
		Zt(e, i, "open", "setOpen"),
		Zt(e, i, "mounted", "setMounted"),
		Zt(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function xO(e = {}) {
	const [n, i] = Oc(U_, e);
	return $_(n, i, e);
}
var AO = "div",
	RO = [
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
	tj = et(function (n) {
		return n;
	}),
	cc = Ye(function (n) {
		return Je(AO, n);
	});
Object.assign(
	cc,
	RO.reduce(
		(e, n) => (
			(e[n] = Ye(function (u) {
				return Je(n, u);
			})),
			e
		),
		{},
	),
);
function CO({ store: e, backdrop: n, alwaysVisible: i, hidden: u }) {
	const l = (0, b.useRef)(null),
		o = xO({ disclosure: e }),
		f = tn(e, "contentElement");
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
	const h = Tm({
		ref: l,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: i,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, b.isValidElement)(n)) return (0, S.jsx)(cc, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, S.jsx)(cc, { ...h, render: (0, S.jsx)(m, {}) });
}
function B_(e = {}) {
	return U_(e);
}
function V_(e, n, i) {
	return $_(e, n, i);
}
function kO(e = {}) {
	const [n, i] = Oc(B_, e);
	return V_(n, i, e);
}
var MO = "div",
	Ep = Sc();
function NO(e) {
	const n = ki();
	return !n || (e && rn(e, n)) ? !1 : !!Nr(n);
}
function Tp(e, n = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (n ? (Nr(i) ? i : null) : i) : null;
}
var Z_ = et(function ({
	store: n,
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
	unmountOnHide: I,
	unstable_treeSnapshotKey: D,
	...q
}) {
	const O = Rc(),
		C = (0, b.useRef)(null),
		L = kO({
			store: n || O,
			open: i,
			setOpen(be) {
				if (be) return;
				const Re = C.current;
				if (!Re) return;
				const He = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Re.addEventListener("close", u, { once: !0 }),
					Re.dispatchEvent(He),
					He.defaultPrevented && L.setOpen(!0));
			},
		}),
		{ portalRef: J, domReady: X } = om(f, q.portalRef),
		M = q.preserveTabOrder,
		$ = tn(L, (be) => M && !o && be.mounted),
		B = Mi(q.id),
		P = tn(L, "open"),
		ce = tn(L, "mounted"),
		se = tn(L, "contentElement"),
		te = zc(ce, q.hidden, q.alwaysVisible);
	(SO(se, B, _ && !te), yO(L, v, X));
	const { wrapElement: ne, nestedDialogs: N } = pO(L);
	((q = wn(q, ne, [ne])),
		at(() => {
			if (!P) return;
			const be = C.current,
				Re = ki(be, !0);
			Re && Re.tagName !== "BODY" && ((be && rn(be, Re)) || L.setDisclosureElement(Re));
		}, [L, P]),
		Ep &&
			(0, b.useEffect)(() => {
				if (!ce) return;
				const { disclosureElement: be } = L.getState();
				if (!be || !ca(be)) return;
				const Re = () => {
					let He = !1;
					const Oe = () => {
						He = !0;
					};
					(be.addEventListener("focusin", Oe, { capture: !0, once: !0 }),
						$u(be, "mouseup", () => {
							(be.removeEventListener("focusin", Oe, !0), !He && v_(be));
						}));
				};
				return (
					be.addEventListener("mousedown", Re),
					() => {
						be.removeEventListener("mousedown", Re);
					}
				);
			}, [L, ce]),
		(0, b.useEffect)(() => {
			if (!ce || !X) return;
			const be = C.current;
			if (!be) return;
			const Re = Wb(be),
				He = Re.visualViewport || Re,
				Oe = () => {
					var $t, ft;
					const fe = (ft = ($t = Re.visualViewport) == null ? void 0 : $t.height) != null ? ft : Re.innerHeight;
					be.style.setProperty("--dialog-viewport-height", `${fe}px`);
				};
			return (
				Oe(),
				He.addEventListener("resize", Oe),
				() => {
					He.removeEventListener("resize", Oe);
				}
			);
		}, [ce, X]),
		(0, b.useEffect)(() => {
			if (!o || !ce || !X) return;
			const be = C.current;
			if (be && !be.querySelector("[data-dialog-dismiss]")) return uO(be, L.hide);
		}, [L, o, ce, X]),
		at(() => {
			if (!I_() || P || !ce || !X) return;
			const be = C.current;
			if (be) return L_(be);
		}, [P, ce, X]));
	const V = P && X;
	at(() => {
		if (!B || !V) return;
		const be = C.current;
		return dO(B, [be]);
	}, [B, V, D]);
	const Q = De(g);
	at(() => {
		if (!B || !V) return;
		const { disclosureElement: be } = L.getState(),
			Re = [C.current, ...(Q() || []), ...N.map((He) => He.getState().contentElement)];
		return o ? Kn(Sp(B, Re), TO(B, Re)) : Sp(B, [be, ...Re]);
	}, [B, L, V, Q, N, o, D]);
	const ve = !!p,
		pe = Mt(p),
		[$e, k] = (0, b.useState)(!1);
	(0, b.useEffect)(() => {
		if (!P || !ve || !X || !se?.isConnected) return;
		const be = Tp(x, !0) || se.querySelector("[data-autofocus=true],[autofocus]") || UM(se, !0, f && $) || se,
			Re = Nr(be);
		pe(Re ? be : null) &&
			(k(!0),
			queueMicrotask(() => {
				(be.focus(), Ep && Re && be.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [P, ve, X, se, x, f, $, pe]);
	const j = !!w,
		le = Mt(w),
		[de, he] = (0, b.useState)(!1);
	(0, b.useEffect)(() => {
		if (P) return (he(!0), () => he(!1));
	}, [P]);
	const Se = (0, b.useCallback)(
			(be, Re = !0) => {
				const { disclosureElement: He } = L.getState();
				if (NO(be)) return;
				let Oe = Tp(R) || He;
				if (Oe?.id) {
					const ft = At(Oe),
						fe = `[aria-activedescendant="${Oe.id}"]`,
						ke = ft.querySelector(fe);
					ke && (Oe = ke);
				}
				if (Oe && !Nr(Oe)) {
					const ft = Oe.closest("[data-dialog]");
					if (ft?.id) {
						const fe = At(ft),
							ke = `[aria-controls~="${ft.id}"]`,
							St = fe.querySelector(ke);
						St && (Oe = St);
					}
				}
				const $t = Oe && Nr(Oe);
				if (!$t && Re) {
					requestAnimationFrame(() => Se(be, !1));
					return;
				}
				le($t ? Oe : null) && $t && Oe?.focus({ preventScroll: !0 });
			},
			[L, R, le],
		),
		ye = (0, b.useRef)(!1);
	(at(() => {
		if (P || !de || !j) return;
		const be = C.current;
		((ye.current = !0), Se(be));
	}, [P, de, X, j, Se]),
		(0, b.useEffect)(() => {
			if (!de || !j) return;
			const be = C.current;
			return () => {
				if (ye.current) {
					ye.current = !1;
					return;
				}
				Se(be);
			};
		}, [de, j, Se]));
	const Ne = Mt(m);
	((0, b.useEffect)(
		() =>
			!X || !ce
				? void 0
				: Sn(
						"keydown",
						(Re) => {
							if (Re.key !== "Escape" || Re.defaultPrevented) return;
							const He = C.current;
							if (!He || Rm(He)) return;
							const Oe = Re.target;
							if (!Oe) return;
							const { disclosureElement: $t } = L.getState();
							!!(Oe.tagName === "BODY" || rn(He, Oe) || !$t || rn($t, Oe)) && Ne(Re) && L.hide();
						},
						!0,
					),
		[L, X, ce, Ne],
	),
		(q = wn(q, (be) => (0, S.jsx)(iO, { level: o ? 1 : void 0, children: be }), [o])));
	const Ue = q.hidden,
		Ze = q.alwaysVisible;
	q = wn(
		q,
		(be) =>
			h
				? (0, S.jsxs)(S.Fragment, {
						children: [(0, S.jsx)(CO, { store: L, backdrop: h, hidden: Ue, alwaysVisible: Ze }), be],
					})
				: be,
		[L, h, Ue, Ze],
	);
	const [st, kn] = (0, b.useState)(),
		[mn, lt] = (0, b.useState)();
	return (
		(q = wn(
			q,
			(be) =>
				(0, S.jsx)(gm, {
					value: L,
					children: (0, S.jsx)(dN.Provider, {
						value: kn,
						children: (0, S.jsx)(hN.Provider, { value: lt, children: be }),
					}),
				}),
			[L],
		)),
		(q = {
			id: B,
			"data-dialog": "",
			role: "dialog",
			tabIndex: l ? -1 : void 0,
			"aria-labelledby": st,
			"aria-describedby": mn,
			...q,
			ref: Qt(C, q.ref),
		}),
		(q = D_({ ...q, autoFocusOnShow: $e })),
		(q = Tm({ store: L, ...q })),
		(q = dl({ ...q, focusable: l })),
		(q = z_({ portal: f, ...q, portalRef: J, preserveTabOrder: $ })),
		q
	);
});
function pl(e, n = Rc) {
	return Ye(function (u) {
		const l = n();
		return tn(u.store || l, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, S.jsx)(e, { ...u }) : null;
	});
}
var nj = pl(
		Ye(function (n) {
			return Je(MO, Z_(n));
		}),
		Rc,
	),
	fa = Math.min,
	Ei = Math.max,
	fc = Math.round,
	Zo = Math.floor,
	Ti = (e) => ({ x: e, y: e }),
	OO = { left: "right", right: "left", bottom: "top", top: "bottom" };
function H_(e, n, i) {
	return Ei(e, fa(n, i));
}
function da(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function ha(e) {
	return e.split("-")[0];
}
function Xu(e) {
	return e.split("-")[1];
}
function Cm(e) {
	return e === "x" ? "y" : "x";
}
function km(e) {
	return e === "y" ? "height" : "width";
}
function Vr(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function Mm(e) {
	return Cm(Vr(e));
}
function zO(e, n, i) {
	i === void 0 && (i = !1);
	const u = Xu(e),
		l = Mm(e),
		o = km(l);
	let f = l === "x" ? (u === (i ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = dc(f)), [f, dc(f)]);
}
function DO(e) {
	const n = dc(e);
	return [Uh(e), n, Uh(n)];
}
function Uh(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var xp = ["left", "right"],
	Ap = ["right", "left"],
	jO = ["top", "bottom"],
	qO = ["bottom", "top"];
function IO(e, n, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (n ? Ap : xp) : n ? xp : Ap;
		case "left":
		case "right":
			return n ? jO : qO;
		default:
			return [];
	}
}
function LO(e, n, i, u) {
	const l = Xu(e);
	let o = IO(ha(e), i === "start", u);
	return (l && ((o = o.map((f) => f + "-" + l)), n && (o = o.concat(o.map(Uh)))), o);
}
function dc(e) {
	const n = ha(e);
	return OO[n] + e.slice(n.length);
}
function UO(e) {
	var n, i, u, l;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (l = e.left) != null ? l : 0,
	};
}
function Q_(e) {
	return typeof e != "number" ? UO(e) : { top: e, right: e, bottom: e, left: e };
}
function hc(e) {
	const { x: n, y: i, width: u, height: l } = e;
	return { width: u, height: l, top: i, left: n, right: n + u, bottom: i + l, x: n, y: i };
}
function Rp(e, n, i) {
	let { reference: u, floating: l } = e;
	const o = Vr(n),
		f = Mm(n),
		h = km(f),
		m = ha(n),
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
	const x = Xu(n);
	return (x && (w[f] += p * (x === "end" ? 1 : -1) * (i && v ? -1 : 1)), w);
}
async function $O(e, n) {
	var i;
	n === void 0 && (n = {});
	const { x: u, y: l, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: _ = "floating",
			altBoundary: p = !1,
			padding: w = 0,
		} = da(n, e),
		x = Q_(w),
		R = h[p ? (_ === "floating" ? "reference" : "floating") : _],
		I = hc(
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
		D = _ === "floating" ? { x: u, y: l, width: f.floating.width, height: f.floating.height } : f.reference,
		q = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		O = ((await (o.isElement == null ? void 0 : o.isElement(q))) &&
			(await (o.getScale == null ? void 0 : o.getScale(q)))) || { x: 1, y: 1 },
		C = hc(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: D,
						offsetParent: q,
						strategy: m,
					})
				: D,
		);
	return {
		top: (I.top - C.top + x.top) / O.y,
		bottom: (C.bottom - I.bottom + x.bottom) / O.y,
		left: (I.left - C.left + x.left) / O.x,
		right: (C.right - I.right + x.right) / O.x,
	};
}
var BO = 50,
	VO = async (e, n, i) => {
		const { placement: u = "bottom", strategy: l = "absolute", middleware: o = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: $O },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: l }),
			{ x: g, y: _ } = Rp(v, u, m),
			p = u,
			w = 0;
		const x = {};
		for (let R = 0; R < o.length; R++) {
			const I = o[R];
			if (!I) continue;
			const { name: D, fn: q } = I,
				{
					x: O,
					y: C,
					data: L,
					reset: J,
				} = await q({
					x: g,
					y: _,
					initialPlacement: u,
					placement: p,
					strategy: l,
					middlewareData: x,
					rects: v,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((g = O ?? g),
				(_ = C ?? _),
				(x[D] = { ...x[D], ...L }),
				J &&
					w < BO &&
					(w++,
					typeof J == "object" &&
						(J.placement && (p = J.placement),
						J.rects &&
							(v = J.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: l }) : J.rects),
						({ x: g, y: _ } = Rp(v, p, m))),
					(R = -1)));
		}
		return { x: g, y: _, placement: p, strategy: l, middlewareData: x };
	},
	ZO = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: i, y: u, placement: l, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: g = 0 } = da(e, n) || {};
			if (v == null) return {};
			const _ = Q_(g),
				p = { x: i, y: u },
				w = Mm(l),
				x = km(w),
				R = await f.getDimensions(v),
				I = w === "y",
				D = I ? "top" : "left",
				q = I ? "bottom" : "right",
				O = I ? "clientHeight" : "clientWidth",
				C = o.reference[x] + o.reference[w] - p[w] - o.floating[x],
				L = p[w] - o.reference[w],
				J = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let X = J ? J[O] : 0;
			(!X || !(await (f.isElement == null ? void 0 : f.isElement(J)))) && (X = h.floating[O] || o.floating[x]);
			const M = C / 2 - L / 2,
				$ = X / 2 - R[x] / 2 - 1,
				B = fa(_[D], $),
				P = fa(_[q], $),
				ce = X - R[x] - P,
				se = X / 2 - R[x] / 2 + M,
				te = H_(B, se, ce),
				ne = !m.arrow && Xu(l) != null && se !== te && o.reference[x] / 2 - (se < B ? B : P) - R[x] / 2 < 0,
				N = ne ? (se < B ? se - B : se - ce) : 0;
			return {
				[w]: p[w] + N,
				data: { [w]: te, centerOffset: se - te - N, ...(ne && { alignmentOffset: N }) },
				reset: ne,
			};
		},
	}),
	HO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var i, u;
					const { placement: l, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = n,
						{
							mainAxis: g = !0,
							crossAxis: _ = !0,
							fallbackPlacements: p,
							fallbackStrategy: w = "bestFit",
							fallbackAxisSideDirection: x = "none",
							flipAlignment: R = !0,
							...I
						} = da(e, n);
					if ((i = o.arrow) != null && i.alignmentOffset) return {};
					const D = ha(l),
						q = Vr(h),
						O = ha(h) === h,
						C = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						L = p || (O || !R ? [dc(h)] : DO(h)),
						J = x !== "none";
					!p && J && L.push(...LO(h, R, x, C));
					const X = [h, ...L],
						M = await m.detectOverflow(n, I),
						$ = [];
					let B = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && $.push(M[D]), _)) {
						const te = zO(l, f, C);
						$.push(M[te[0]], M[te[1]]);
					}
					if (((B = [...B, { placement: l, overflows: $ }]), !$.every((te) => te <= 0))) {
						var P, ce;
						const te = (((P = o.flip) == null ? void 0 : P.index) || 0) + 1,
							ne = X[te];
						if (
							ne &&
							(!(_ === "alignment" && q !== Vr(ne)) ||
								B.every((V) => (Vr(V.placement) === q ? V.overflows[0] > 0 : !0)))
						)
							return { data: { index: te, overflows: B }, reset: { placement: ne } };
						let N =
							(ce = B.filter((V) => V.overflows[0] <= 0).sort((V, Q) => V.overflows[1] - Q.overflows[1])[0]) == null
								? void 0
								: ce.placement;
						if (!N)
							switch (w) {
								case "bestFit": {
									var se;
									const V =
										(se = B.filter((Q) => {
											if (J) {
												const ve = Vr(Q.placement);
												return ve === q || ve === "y";
											}
											return !0;
										})
											.map((Q) => [Q.placement, Q.overflows.filter((ve) => ve > 0).reduce((ve, pe) => ve + pe, 0)])
											.sort((Q, ve) => Q[1] - ve[1])[0]) == null
											? void 0
											: se[0];
									V && (N = V);
									break;
								}
								case "initialPlacement":
									N = h;
									break;
							}
						if (l !== N) return { reset: { placement: N } };
					}
					return {};
				},
			}
		);
	},
	P_ = new Set(["left", "top"]);
async function QO(e, n) {
	const { placement: i, platform: u, elements: l } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)),
		f = ha(i),
		h = Xu(i),
		m = Vr(i) === "y",
		v = P_.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		_ = da(n, e);
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
var PO = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var i, u;
					const { x: l, y: o, placement: f, middlewareData: h } = n,
						m = await QO(n, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: l + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	KO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "shift",
				options: e,
				async fn(n) {
					const { x: i, y: u, placement: l, platform: o } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (q) => {
									let { x: O, y: C } = q;
									return { x: O, y: C };
								},
							},
							...v
						} = da(e, n),
						g = { x: i, y: u },
						_ = await o.detectOverflow(n, v),
						p = Vr(l),
						w = Cm(p);
					let x = g[w],
						R = g[p];
					const I = (q, O) => H_(O + _[q === "y" ? "top" : "left"], O, O - _[q === "y" ? "bottom" : "right"]);
					(f && (x = I(w, x)), h && (R = I(p, R)));
					const D = m.fn({ ...n, [w]: x, [p]: R });
					return { ...D, data: { x: D.x - i, y: D.y - u, enabled: { [w]: f, [p]: h } } };
				},
			}
		);
	},
	YO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var i, u;
					const { x: l, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: _ = !0 } = da(e, n),
						p = { x: l, y: o },
						w = Vr(f),
						x = Cm(w);
					let R = p[x],
						I = p[w];
					const D = da(v, n),
						q =
							typeof D == "number"
								? { mainAxis: D, crossAxis: 0 }
								: { mainAxis: (i = D.mainAxis) != null ? i : 0, crossAxis: (u = D.crossAxis) != null ? u : 0 };
					if (g) {
						const L = x === "y" ? "height" : "width",
							J = h.reference[x] - h.floating[L] + q.mainAxis,
							X = h.reference[x] + h.reference[L] - q.mainAxis;
						R < J ? (R = J) : R > X && (R = X);
					}
					if (_) {
						var O, C;
						const L = x === "y" ? "width" : "height",
							J = P_.has(ha(f)),
							X =
								h.reference[w] -
								h.floating[L] +
								((J && ((O = m.offset) == null ? void 0 : O[w])) || 0) +
								(J ? 0 : q.crossAxis),
							M =
								h.reference[w] +
								h.reference[L] +
								(J ? 0 : ((C = m.offset) == null ? void 0 : C[w]) || 0) -
								(J ? q.crossAxis : 0);
						I < X ? (I = X) : I > M && (I = M);
					}
					return { [x]: R, [w]: I };
				},
			}
		);
	},
	GO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: i, rects: u, platform: l, elements: o } = n,
						{ apply: f = () => {}, ...h } = da(e, n),
						m = await l.detectOverflow(n, h),
						v = ha(i),
						g = Xu(i),
						_ = Vr(i) === "y",
						{ width: p, height: w } = u.floating;
					let x, R;
					v === "top" || v === "bottom"
						? ((x = v),
							(R =
								g === ((await (l.isRTL == null ? void 0 : l.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((R = v), (x = g === "end" ? "top" : "bottom"));
					const I = w - m.top - m.bottom,
						D = p - m.left - m.right,
						q = fa(w - m[x], I),
						O = fa(p - m[R], D),
						C = n.middlewareData.shift,
						L = !C;
					let J = q,
						X = O;
					(C != null && C.enabled.x && (X = D),
						C != null && C.enabled.y && (J = I),
						L && !g && (_ ? (X = p - 2 * Ei(m.left, m.right)) : (J = w - 2 * Ei(m.top, m.bottom))),
						await f({ ...n, availableWidth: X, availableHeight: J }));
					const M = await l.getDimensions(o.floating);
					return p !== M.width || w !== M.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Dc() {
	return typeof window < "u";
}
function Ju(e) {
	return K_(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Pn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Ni(e) {
	var n;
	return (n = (K_(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function K_(e) {
	return Dc() ? e instanceof Node || e instanceof Pn(e).Node : !1;
}
function Hr(e) {
	return Dc() ? e instanceof Element || e instanceof Pn(e).Element : !1;
}
function ga(e) {
	return Dc() ? e instanceof HTMLElement || e instanceof Pn(e).HTMLElement : !1;
}
function Cp(e) {
	return !Dc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Pn(e).ShadowRoot;
}
function jc(e) {
	const { overflow: n, overflowX: i, overflowY: u, display: l } = Qr(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + i) && l !== "inline" && l !== "contents";
}
function FO(e) {
	return /^(table|td|th)$/.test(Ju(e));
}
function qc(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var XO = /transform|translate|scale|rotate|perspective|filter/,
	JO = /paint|layout|strict|content/,
	Ua = (e) => !!e && e !== "none",
	ah;
function Nm(e) {
	const n = Hr(e) ? Qr(e) : e;
	return (
		Ua(n.transform) ||
		Ua(n.translate) ||
		Ua(n.scale) ||
		Ua(n.rotate) ||
		Ua(n.perspective) ||
		(!Om() && (Ua(n.backdropFilter) || Ua(n.filter))) ||
		XO.test(n.willChange || "") ||
		JO.test(n.contain || "")
	);
}
function WO(e) {
	let n = Ya(e);
	for (; ga(n) && !rl(n); ) {
		if (Nm(n)) return n;
		if (qc(n)) return null;
		n = Ya(n);
	}
	return null;
}
function Om() {
	return (ah == null && (ah = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), ah);
}
function rl(e) {
	return /^(html|body|#document)$/.test(Ju(e));
}
function Qr(e) {
	return Pn(e).getComputedStyle(e);
}
function Ic(e) {
	return Hr(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ya(e) {
	if (Ju(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (Cp(e) && e.host) || Ni(e);
	return Cp(n) ? n.host : n;
}
function Y_(e) {
	const n = Ya(e);
	return rl(n) ? (e.ownerDocument || e).body : ga(n) && jc(n) ? n : Y_(n);
}
function il(e, n, i) {
	var u;
	(n === void 0 && (n = []), i === void 0 && (i = !0));
	const l = Y_(e),
		o = l === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = Pn(l);
	if (o) {
		const h = $h(f);
		return n.concat(f, f.visualViewport || [], jc(l) ? l : [], h && i ? il(h) : []);
	} else return n.concat(l, il(l, [], i));
}
function $h(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function G_(e) {
	const n = Qr(e);
	let i = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const l = ga(e),
		o = l ? e.offsetWidth : i,
		f = l ? e.offsetHeight : u,
		h = fc(i) !== o || fc(u) !== f;
	return (h && ((i = o), (u = f)), { width: i, height: u, $: h });
}
function zm(e) {
	return Hr(e) ? e : e.contextElement;
}
function Bu(e) {
	const n = zm(e);
	if (!ga(n)) return Ti(1);
	const i = n.getBoundingClientRect(),
		{ width: u, height: l, $: o } = G_(n);
	let f = (o ? fc(i.width) : i.width) / u,
		h = (o ? fc(i.height) : i.height) / l;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var e2 = Ti(0);
function F_(e) {
	const n = Pn(e);
	return !Om() || !n.visualViewport ? e2 : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function t2(e, n, i) {
	return (n === void 0 && (n = !1), !!i && n && i === Pn(e));
}
function Ga(e, n, i, u) {
	(n === void 0 && (n = !1), i === void 0 && (i = !1));
	const l = e.getBoundingClientRect(),
		o = zm(e);
	let f = Ti(1);
	n && (u ? Hr(u) && (f = Bu(u)) : (f = Bu(e)));
	const h = t2(o, i, u) ? F_(o) : Ti(0);
	let m = (l.left + h.x) / f.x,
		v = (l.top + h.y) / f.y,
		g = l.width / f.x,
		_ = l.height / f.y;
	if (o && u) {
		const p = Pn(o),
			w = Hr(u) ? Pn(u) : u;
		let x = p,
			R = $h(x);
		for (; R && w !== x; ) {
			const I = Bu(R),
				D = R.getBoundingClientRect(),
				q = Qr(R),
				O = D.left + (R.clientLeft + parseFloat(q.paddingLeft)) * I.x,
				C = D.top + (R.clientTop + parseFloat(q.paddingTop)) * I.y;
			((m *= I.x), (v *= I.y), (g *= I.x), (_ *= I.y), (m += O), (v += C), (x = Pn(R)), (R = $h(x)));
		}
	}
	return hc({ width: g, height: _, x: m, y: v });
}
function Lc(e, n) {
	const i = Ic(e).scrollLeft;
	return n ? n.left + i : Ga(Ni(e)).left + i;
}
function X_(e, n) {
	const i = e.getBoundingClientRect();
	return { x: i.left + n.scrollLeft - Lc(e, i), y: i.top + n.scrollTop };
}
function n2(e) {
	let { elements: n, rect: i, offsetParent: u, strategy: l } = e;
	const o = l === "fixed",
		f = Ni(u),
		h = n ? qc(n.floating) : !1;
	if (u === f || (h && o)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ti(1);
	const g = Ti(0),
		_ = ga(u);
	if ((_ || !o) && ((Ju(u) !== "body" || jc(f)) && (m = Ic(u)), _)) {
		const w = Ga(u);
		((v = Bu(u)), (g.x = w.x + u.clientLeft), (g.y = w.y + u.clientTop));
	}
	const p = f && !_ && !o ? X_(f, m) : Ti(0);
	return {
		width: i.width * v.x,
		height: i.height * v.y,
		x: i.x * v.x - m.scrollLeft * v.x + g.x + p.x,
		y: i.y * v.y - m.scrollTop * v.y + g.y + p.y,
	};
}
function r2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function i2(e) {
	const n = Ic(e),
		i = e.ownerDocument.body,
		u = Ei(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		l = Ei(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let o = -n.scrollLeft + Lc(e);
	const f = -n.scrollTop;
	return (
		Qr(i).direction === "rtl" && (o += Ei(e.clientWidth, i.clientWidth) - u),
		{ width: u, height: l, x: o, y: f }
	);
}
var a2 = 25;
function u2(e, n, i) {
	i === void 0 && (i = "viewport");
	const u = i === "layoutViewport",
		l = Pn(e),
		o = Ni(e),
		f = l.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const _ = !Om() || n === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (Lc(o) <= 0) {
		const _ = o.ownerDocument,
			p = _.body,
			w = getComputedStyle(p),
			x = (_.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight)) || 0,
			R = Math.abs(o.clientWidth - p.clientWidth - x),
			I = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? R / 2 : R;
		I <= a2 && (h -= I);
	}
	return { width: h, height: m, x: v, y: g };
}
function s2(e, n) {
	const i = Ga(e, !0, n === "fixed"),
		u = i.top + e.clientTop,
		l = i.left + e.clientLeft,
		o = Bu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: l * o.x, y: u * o.y };
}
function kp(e, n, i) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = u2(e, i, n);
	else if (n === "document") u = i2(Ni(e));
	else if (Hr(n)) u = s2(n, i);
	else {
		const l = F_(e);
		u = { x: n.x - l.x, y: n.y - l.y, width: n.width, height: n.height };
	}
	return hc(u);
}
function l2(e, n) {
	const i = n.get(e);
	if (i) return i;
	let u = il(e, [], !1).filter((h) => Hr(h) && Ju(h) !== "body"),
		l = null;
	const o = Qr(e).position === "fixed";
	let f = o ? Ya(e) : e;
	for (; Hr(f) && !rl(f); ) {
		const h = Qr(f),
			m = Nm(f),
			v = l ? l.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (l = h),
			(f = Ya(f)));
	}
	return (n.set(e, u), u);
}
function o2(e) {
	let { element: n, boundary: i, rootBoundary: u, strategy: l } = e;
	const o = [...(i === "clippingAncestors" ? (qc(n) ? [] : l2(n, this._c)) : [].concat(i)), u],
		f = kp(n, o[0], l);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const p = kp(n, o[_], l);
		((h = Ei(p.top, h)), (m = fa(p.right, m)), (v = fa(p.bottom, v)), (g = Ei(p.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function c2(e) {
	const { width: n, height: i } = G_(e);
	return { width: n, height: i };
}
function f2(e, n, i) {
	const u = ga(n),
		l = Ni(n),
		o = i === "fixed",
		f = Ga(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ti(0);
	if ((u || !o) && ((Ju(n) !== "body" || jc(l)) && (h = Ic(n)), u)) {
		const g = Ga(n, !0, o, n);
		((m.x = g.x + n.clientLeft), (m.y = g.y + n.clientTop));
	}
	!u && l && (m.x = Lc(l));
	const v = l && !u && !o ? X_(l, h) : Ti(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function uh(e) {
	return Qr(e).position === "static";
}
function Mp(e, n) {
	if (!ga(e) || Qr(e).position === "fixed") return null;
	if (n) return n(e);
	let i = e.offsetParent;
	return (Ni(e) === i && (i = i.ownerDocument.body), i);
}
function J_(e, n) {
	const i = Pn(e);
	if (qc(e)) return i;
	if (!ga(e)) {
		let l = Ya(e);
		for (; l && !rl(l); ) {
			if (Hr(l) && !uh(l)) return l;
			l = Ya(l);
		}
		return i;
	}
	let u = Mp(e, n);
	for (; u && FO(u) && uh(u); ) u = Mp(u, n);
	return u && rl(u) && uh(u) && !Nm(u) ? i : u || WO(e) || i;
}
var d2 = async function (e) {
	const n = this.getOffsetParent || J_,
		i = this.getDimensions,
		u = await i(e.floating);
	return {
		reference: f2(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function h2(e) {
	return Qr(e).direction === "rtl";
}
var m2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: n2,
	getDocumentElement: Ni,
	getClippingRect: o2,
	getOffsetParent: J_,
	getElementRects: d2,
	getClientRects: r2,
	getDimensions: c2,
	getScale: Bu,
	isElement: Hr,
	isRTL: h2,
};
function W_(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function v2(e, n, i) {
	let u = null,
		l;
	const o = Ni(e);
	function f() {
		var g;
		(clearTimeout(l), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, _) {
		(g === void 0 && (g = !1), _ === void 0 && (_ = 1), f());
		const p = e.getBoundingClientRect(),
			{ left: w, top: x, width: R, height: I } = p;
		if ((g || n(), !R || !I)) return;
		const D = Zo(x),
			q = Zo(o.clientWidth - (w + R)),
			O = Zo(o.clientHeight - (x + I)),
			C = Zo(w),
			L = { rootMargin: -D + "px " + -q + "px " + -O + "px " + -C + "px", threshold: Ei(0, fa(1, _)) || 1 };
		let J = !0;
		function X(M) {
			const $ = M[0].intersectionRatio;
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
			u = new IntersectionObserver(X, { ...L, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(X, L);
		}
		u.observe(e);
	}
	const m = Pn(e),
		v = () => h(i);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function g2(e, n, i, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: l = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = zm(e),
		g = l || o ? [...(v ? il(v) : []), ...(n ? il(n) : [])] : [];
	g.forEach((D) => {
		(l && D.addEventListener("scroll", i), o && D.addEventListener("resize", i));
	});
	const _ = v && h ? v2(v, i, o) : null;
	let p = -1,
		w = null;
	f &&
		((w = new ResizeObserver((D) => {
			let [q] = D;
			(q &&
				q.target === v &&
				w &&
				n &&
				(w.unobserve(n),
				cancelAnimationFrame(p),
				(p = requestAnimationFrame(() => {
					var O;
					(O = w) == null || O.observe(n);
				}))),
				i());
		})),
		v && !m && w.observe(v),
		n && w.observe(n));
	let x,
		R = m ? Ga(e) : null;
	m && I();
	function I() {
		const D = Ga(e);
		(R && !W_(R, D) && i(), (R = D), (x = requestAnimationFrame(I)));
	}
	return (
		i(),
		() => {
			var D;
			(g.forEach((q) => {
				(l && q.removeEventListener("scroll", i), o && q.removeEventListener("resize", i));
			}),
				_?.(),
				(D = w) == null || D.disconnect(),
				(w = null),
				m && cancelAnimationFrame(x));
		}
	);
}
var y2 = PO,
	p2 = KO,
	b2 = HO,
	_2 = GO,
	S2 = ZO,
	w2 = YO,
	E2 = (e, n, i) => {
		const u = new Map(),
			l = i ?? {},
			o = { ...m2, ...l.platform, _c: u };
		return VO(e, n, { ...l, platform: o });
	},
	T2 = "div";
function Np(e = 0, n = 0, i = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, i, u);
	const l = { x: e, y: n, width: i, height: u, top: n, right: e + i, bottom: n + u, left: e };
	return { ...l, toJSON: () => l };
}
function x2(e) {
	if (!e) return Np();
	const { x: n, y: i, width: u, height: l } = e;
	return Np(n, i, u, l);
}
function A2(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				u = n?.(i);
			return u || !i ? x2(u) : i.getBoundingClientRect();
		},
	};
}
function R2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function Op(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function C2(e, n) {
	return y2(({ placement: i }) => {
		var u;
		const l = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + l : (u = n.gutter) != null ? u : l;
		return { crossAxis: i.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function k2(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Ht(!n || n.every(R2), !1), b2({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function M2(e) {
	if (!(!e.slide && !e.overlap))
		return p2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: w2() });
}
function N2(e) {
	return _2({
		padding: e.overflowPadding,
		apply({ elements: n, availableWidth: i, availableHeight: u, rects: l }) {
			const o = n.floating,
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
function O2(e, n) {
	if (e) return S2({ element: e, padding: n.arrowPadding });
}
var Dm = et(function ({
		store: n,
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
		overflowPadding: I = 8,
		getAnchorRect: D,
		updatePosition: q,
		...O
	}) {
		const C = Cc();
		((n = n || C), Ht(n, !1));
		const L = n.useState("arrowElement"),
			J = n.useState("anchorElement"),
			X = n.useState("disclosureElement"),
			M = n.useState("popoverElement"),
			$ = n.useState("contentElement"),
			B = n.useState("placement"),
			P = n.useState("mounted"),
			ce = n.useState("rendered"),
			se = (0, b.useRef)(null),
			[te, ne] = (0, b.useState)(!1),
			{ portalRef: N, domReady: V } = om(u, O.portalRef),
			Q = De(D),
			ve = De(q),
			pe = !!q;
		(at(() => {
			if (!M?.isConnected) return;
			M.style.setProperty("--popover-overflow-padding", `${I}px`);
			const k = A2(J, Q),
				j = async () => {
					if (!P) return;
					L || (se.current = se.current || document.createElement("div"));
					const he = L || se.current,
						Se = [
							C2(he, { gutter: x, shift: v }),
							k2({ flip: m, overflowPadding: I }),
							M2({ slide: g, shift: v, overlap: _, overflowPadding: I }),
							O2(he, { arrowPadding: R }),
							N2({ sameWidth: p, fitViewport: w, overflowPadding: I }),
						],
						ye = await E2(k, M, { placement: B, strategy: h ? "fixed" : "absolute", middleware: Se });
					(n?.setState("currentPlacement", ye.placement), ne(!0));
					const Ne = Op(ye.x),
						Ue = Op(ye.y);
					if (
						(Object.assign(M.style, { top: "0", left: "0", transform: `translate3d(${Ne}px,${Ue}px,0)` }),
						he && ye.middlewareData.arrow)
					) {
						const { x: Ze, y: st } = ye.middlewareData.arrow,
							kn = ye.placement.split("-")[0],
							mn = he.clientWidth / 2,
							lt = he.clientHeight / 2,
							be = Ze != null ? Ze + mn : -mn,
							Re = st != null ? st + lt : -lt;
						(M.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${be}px calc(100% + ${lt}px)`,
								bottom: `${be}px ${-lt}px`,
								left: `calc(100% + ${mn}px) ${Re}px`,
								right: `${-mn}px ${Re}px`,
							}[kn],
						),
							Object.assign(he.style, {
								left: Ze != null ? `${Ze}px` : "",
								top: st != null ? `${st}px` : "",
								[kn]: "100%",
							}));
					}
				},
				de = g2(
					k,
					M,
					async () => {
						pe ? (await ve({ updatePosition: j }), ne(!0)) : await j();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ne(!1), de());
			};
		}, [n, ce, M, L, J, M, B, P, V, h, m, v, g, _, p, w, x, R, I, Q, pe, ve]),
			at(() => {
				if (!P || !V || !M?.isConnected || !$?.isConnected) return;
				const k = () => {
					M.style.zIndex = getComputedStyle($).zIndex;
				};
				k();
				let j = requestAnimationFrame(() => {
					j = requestAnimationFrame(k);
				});
				return () => cancelAnimationFrame(j);
			}, [P, V, M, $]));
		const $e = h ? "fixed" : "absolute";
		return (
			(O = wn(
				O,
				(k) =>
					(0, S.jsx)("div", {
						...f,
						style: { position: $e, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: k,
					}),
				[n, $e, f],
			)),
			(O = wn(O, (k) => (0, S.jsx)(kc, { value: n, children: k }), [n])),
			(O = { "data-placing": !te || void 0, ...O, style: { position: "relative", ...O.style } }),
			(O = Z_({
				store: n,
				modal: i,
				portal: u,
				preserveTabOrder: l,
				preserveTabOrderAnchor: X || J,
				autoFocusOnShow: te && o,
				...O,
				portalRef: N,
			})),
			O
		);
	}),
	rj = pl(
		Ye(function (n) {
			return Je(T2, Dm(n));
		}),
		Cc,
	),
	z2 = "div";
function D2(e, ...n) {
	if (!e) return !1;
	if ("id" in e) {
		const i = n
			.filter(Boolean)
			.map((u) => `[aria-controls~="${u}"]`)
			.join(", ");
		return i ? e.matches(i) : !1;
	}
	return !1;
}
var j2 = et(function ({
		store: n,
		modal: i,
		tabIndex: u,
		alwaysVisible: l,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Mc();
		((n = n || m), Ht(n, !1));
		const v = n.useState("baseElement"),
			g = (0, b.useRef)(!1),
			_ = tn(n.tag, (p) => p?.renderedItems.length);
		return (
			(h = N_({ store: n, alwaysVisible: l, ...h })),
			(h = Dm({
				store: n,
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
					if (!i || !n) return w;
					const { contentElement: x, baseElement: R } = n.getState();
					if (!R) return w;
					const I = At(R),
						D = [];
					if ((x?.id && D.push(`[aria-controls~="${x.id}"]`), R?.id && D.push(`[aria-controls~="${R.id}"]`), !D.length))
						return [...w, R];
					const q = D.join(","),
						O = I.querySelectorAll(q);
					return [...w, ...O];
				},
				autoFocusOnHide(p) {
					return _c(o, p) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(p) {
					var w, x;
					const R = n?.getState(),
						I = (w = R?.contentElement) == null ? void 0 : w.id,
						D = (x = R?.baseElement) == null ? void 0 : x.id;
					if (D2(p.target, I, D)) return !1;
					const q = typeof f == "function" ? f(p) : f;
					return (q && (g.current = p.type === "click"), q);
				},
			})),
			h
		);
	}),
	q2 = pl(
		Ye(function (n) {
			return Je(z2, j2(n));
		}),
		Mc,
	),
	ij = (0, b.createContext)(null),
	aj = (0, b.createContext)(null),
	bl = Kr([fl], [Tc]),
	I2 = bl.useContext,
	uj = bl.useScopedContext,
	sj = bl.useProviderContext,
	lj = bl.ContextProvider,
	oj = bl.ScopedContextProvider;
function eS({ popover: e, ...n } = {}) {
	const i = Nc(
		n.store,
		_m(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = i?.getState(),
		l = B_({ ...n, store: i }),
		o = je(n.placement, u?.placement, "bottom"),
		f = Or(
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
function tS(e, n, i) {
	return (Fu(n, [i.popover]), Zt(e, i, "placement"), V_(e, n, i));
}
function L2(e) {
	var n;
	const i = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let l = (n = i?.element) == null ? void 0 : n.parentElement;
	for (; l && u?.element; ) {
		if (u && l.contains(u.element)) return l;
		l = l.parentElement;
	}
	return At(l).body;
}
function U2(e) {
	return e?.__unstablePrivateStore;
}
function $2(e = {}) {
	var n;
	e.store;
	const i = (n = e.store) == null ? void 0 : n.getState(),
		u = je(e.items, i?.items, e.defaultItems, []),
		l = new Map(u.map((p) => [p.id, p])),
		o = { items: u, renderedItems: je(i?.renderedItems, []) },
		f = U2(e.store),
		h = Or({ items: u, renderedItems: o.renderedItems }, f),
		m = Or(o, e.store),
		v = (p) => {
			const w = n_(p, (x) => x.element);
			(h.setState("renderedItems", w), m.setState("renderedItems", w));
		};
	(Dn(m, () => pm(h)),
		Dn(h, () =>
			lc(h, ["items"], (p) => {
				m.setState("items", p.items);
			}),
		),
		Dn(h, () =>
			lc(h, ["renderedItems"], (p) => {
				let w = !0,
					x = requestAnimationFrame(() => {
						const { renderedItems: q } = m.getState();
						p.renderedItems !== q && v(p.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(x);
				const R = () => {
						if (w) {
							w = !1;
							return;
						}
						(cancelAnimationFrame(x), (x = requestAnimationFrame(() => v(p.renderedItems))));
					},
					I = L2(p.renderedItems),
					D = new IntersectionObserver(R, { root: I });
				for (const q of p.renderedItems) q.element && D.observe(q.element);
				return () => {
					(cancelAnimationFrame(x), D.disconnect());
				};
			}),
		));
	const g = (p, w, x = !1) => {
			let R;
			return (
				w((D) => {
					const q = D.findIndex(({ id: C }) => C === p.id),
						O = D.slice();
					if (q !== -1) {
						R = D[q];
						const C = { ...R, ...p };
						((O[q] = C), l.set(p.id, C));
					} else (O.push(p), l.set(p.id, p));
					return O;
				}),
				() => {
					w((D) => {
						if (!R) return (x && l.delete(p.id), D.filter(({ id: C }) => C !== p.id));
						const q = D.findIndex(({ id: C }) => C === p.id);
						if (q === -1) return D;
						const O = D.slice();
						return ((O[q] = R), l.set(p.id, R), O);
					});
				}
			);
		},
		_ = (p) => g(p, (w) => h.setState("items", w), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (p) =>
			Kn(
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
function B2(e, n, i) {
	return (Fu(n, [i.store]), Zt(e, i, "items", "setItems"), e);
}
var V2 = { id: null };
function bi(e, n) {
	return e.find((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function Z2(e, n) {
	return e.filter((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function zp(e, n) {
	return e.filter((i) => i.rowId === n);
}
function H2(e, n, i = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(i ? [V2] : []), ...e.slice(0, u)];
}
function nS(e) {
	const n = [];
	for (const i of e) {
		const u = n.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === i.rowId;
		});
		u ? u.push(i) : n.push([i]);
	}
	return n;
}
function rS(e) {
	let n = 0;
	for (const { length: i } of e) i > n && (n = i);
	return n;
}
function Q2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function P2(e, n, i) {
	const u = rS(e);
	for (const l of e)
		for (let o = 0; o < u; o += 1) {
			const f = l[o];
			if (!f || (i && f.disabled)) {
				const h = o === 0 && i ? bi(l) : l[o - 1];
				l[o] = h && n !== h.id && i ? h : Q2(h?.rowId);
			}
		}
	return e;
}
function K2(e) {
	const n = nS(e),
		i = rS(n),
		u = [];
	for (let l = 0; l < i; l += 1)
		for (const o of n) {
			const f = o[l];
			f && u.push({ ...f, rowId: f.rowId ? `${l}` : void 0 });
		}
	return u;
}
function iS(e = {}) {
	var n;
	const i = (n = e.store) == null ? void 0 : n.getState(),
		u = $2(e),
		l = je(e.activeId, i?.activeId, e.defaultActiveId),
		o = Or(
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
	Dn(o, () =>
		Cn(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = bi(h.renderedItems)) == null ? void 0 : v.id;
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
				focusWrap: I = _.focusWrap,
				includesBaseElement: D = _.includesBaseElement,
				renderedItems: q = _.renderedItems,
				rtl: O = _.rtl,
			} = m,
			C = h === "up" || h === "down",
			L = h === "next" || h === "down",
			J = L ? O && !C : !O || C,
			X = x && !p;
		let M = C ? y_(P2(nS(q), w, X)) : q;
		if (((M = J ? jh(M) : M), (M = C ? K2(M) : M), w == null)) return (v = bi(M)) == null ? void 0 : v.id;
		const $ = M.find((Q) => Q.id === w);
		if (!$) return (g = bi(M)) == null ? void 0 : g.id;
		const B = M.some((Q) => Q.rowId),
			P = M.indexOf($),
			ce = M.slice(P + 1),
			se = zp(ce, $.rowId);
		if (p) {
			const Q = Z2(se, w),
				ve = Q.slice(p)[0] || Q[Q.length - 1];
			return ve?.id;
		}
		const te = R && (C ? R !== "horizontal" : R !== "vertical"),
			ne = B && I && (C ? I !== "horizontal" : I !== "vertical"),
			N = L ? (!B || C) && te && D : C ? D : !1;
		if (te) {
			const Q = bi(H2(ne && !N ? M : zp(M, $.rowId), w, N), w);
			return Q?.id;
		}
		if (ne) {
			const Q = bi(N ? se : ce, w);
			return N ? Q?.id || null : Q?.id;
		}
		const V = bi(se, w);
		return !V && N ? null : V?.id;
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
			return (h = bi(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = bi(jh(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function Y2(e) {
	return { id: Mi(e.id), ...e };
}
function aS(e, n, i) {
	return (
		(e = B2(e, n, i)),
		Zt(e, i, "activeId", "setActiveId"),
		Zt(e, i, "includesBaseElement"),
		Zt(e, i, "virtualFocus"),
		Zt(e, i, "orientation"),
		Zt(e, i, "rtl"),
		Zt(e, i, "focusLoop"),
		Zt(e, i, "focusWrap"),
		Zt(e, i, "focusShift"),
		e
	);
}
var G2 = Sc() && u_();
function F2({ tag: e, ...n } = {}) {
	const i = Nc(n.store, S_(e, ["value", "rtl"]));
	const u = e?.getState(),
		l = i?.getState(),
		o = je(n.activeId, l?.activeId, n.defaultActiveId, null),
		f = iS({
			...n,
			activeId: o,
			includesBaseElement: je(n.includesBaseElement, l?.includesBaseElement, !0),
			orientation: je(n.orientation, l?.orientation, "vertical"),
			focusLoop: je(n.focusLoop, l?.focusLoop, !0),
			focusWrap: je(n.focusWrap, l?.focusWrap, !0),
			virtualFocus: je(n.virtualFocus, l?.virtualFocus, !0),
		}),
		h = eS({ ...n, placement: je(n.placement, l?.placement, "bottom-start") }),
		m = je(n.value, l?.value, n.defaultValue, ""),
		v = je(n.selectedValue, l?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		g = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: je(n.resetValueOnSelect, l?.resetValueOnSelect, g),
			resetValueOnHide: je(n.resetValueOnHide, l?.resetValueOnHide, g && !e),
			activeValue: l?.activeValue,
		},
		p = Or(_, f, h, i);
	return (
		G2 &&
			Dn(p, () =>
				Cn(p, ["virtualFocus"], () => {
					p.setState("virtualFocus", !1);
				}),
			),
		Dn(p, () => {
			if (e)
				return Kn(
					Cn(p, ["selectedValue"], (w) => {
						Array.isArray(w.selectedValue) && e.setValues(w.selectedValue);
					}),
					Cn(e, ["values"], (w) => {
						p.setState("selectedValue", w.values);
					}),
				);
		}),
		Dn(p, () =>
			Cn(p, ["resetValueOnHide", "mounted"], (w) => {
				w.resetValueOnHide && (w.mounted || p.setState("value", m));
			}),
		),
		Dn(p, () =>
			Cn(p, ["open"], (w) => {
				w.open || (p.setState("activeId", o), p.setState("moves", 0));
			}),
		),
		Dn(p, () =>
			Cn(p, ["moves", "activeId"], (w, x) => {
				w.moves === x.moves && p.setState("activeValue", void 0);
			}),
		),
		Dn(p, () =>
			lc(p, ["moves", "renderedItems"], (w, x) => {
				if (w.moves === x.moves) return;
				const { activeId: R } = p.getState(),
					I = f.item(R);
				p.setState("activeValue", I?.value);
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
function X2(e) {
	const n = I2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), Y2(e));
}
function J2(e, n, i) {
	return (
		Fu(n, [i.tag]),
		Zt(e, i, "value", "setValue"),
		Zt(e, i, "selectedValue", "setSelectedValue"),
		Zt(e, i, "resetValueOnHide"),
		Zt(e, i, "resetValueOnSelect"),
		Object.assign(aS(tS(e, n, i), n, i), { tag: i.tag })
	);
}
function W2(e = {}) {
	e = X2(e);
	const [n, i] = Oc(F2, e);
	return J2(n, i, e);
}
var ez = "hr",
	uS = et(function ({ orientation: n = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": n, ...i }), i);
	}),
	cj = Ye(function (n) {
		return Je(ez, uS(n));
	}),
	tz = "hr",
	sS = et(function ({ store: n, ...i }) {
		const u = Ec();
		((n = n || u), Ht(n, !1));
		const l = n.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((i = uS({ ...i, orientation: l })), i);
	}),
	fj = Ye(function (n) {
		return Je(tz, sS(n));
	}),
	Bh =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Dp(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(Bh) ? n : (e.querySelector(Bh) ?? e);
}
function Wu(e) {
	const n = (0, b.useRef)(null);
	((0, b.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			l = n.current;
		return (
			(l === null ? null : Dp(l))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, b.useEffect)(() => {
			const u = n.current;
			if (!u) return;
			const l = () => {
					!u.isConnected || document.activeElement !== document.body || Dp(u).focus();
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
		const l = n.current;
		if (!l) return;
		const o = [...l.querySelectorAll(Bh)];
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
			ref: n,
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
var nz = 1e3,
	rz = 3e4;
function lS(e) {
	const [n, i] = (0, b.useState)([]),
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
			_ = { clientRequestId: v.clientRequestId, retryDelayMs: nz, retryTimer: null, settled: !1, cancelled: !1 };
		(u.current.set(v.clientRequestId, _), e.onRequestStart());
		const p = (I) => {
				u.current.get(v.clientRequestId) !== _ ||
					_.cancelled ||
					(i((D) =>
						D.map((q) => (q.clientRequestId === v.clientRequestId ? { ...q, status: "failed", errorMessage: I } : q)),
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
					if (Vk(x)) {
						p(Lk);
						return;
					}
					try {
						Za(e.client, e.collection === "messages" ? "message-send" : "reply-send", x).then(
							(I) => {
								if (u.current.get(v.clientRequestId) !== _ || _.cancelled) return;
								if ("_nay" in I) {
									if (I._nay.name === "unavailable") {
										const O = _.retryDelayMs;
										_.retryTimer = setTimeout(() => {
											((_.retryTimer = null), (_.retryDelayMs = Math.min(O * 2, rz)), R());
										}, O);
										return;
									}
									p(I._nay.message);
									return;
								}
								const D = I._yay.messageKey;
								if (typeof D != "string") {
									p("The Chitchat backend answered without a message key");
									return;
								}
								i((O) => O.filter((C) => C.clientRequestId !== v.clientRequestId));
								const q = Qa(D) ?? Date.now();
								(e.onDelivered({
									key: D,
									value: g,
									revision: 0,
									createdBy: e.userId,
									updatedBy: e.userId,
									createdAt: q,
									updatedAt: q,
									timestamp: q,
								}),
									o(_));
							},
							(I) => {
								p(zn(I));
							},
						);
					} catch (I) {
						p(zn(I));
					}
				}
			};
		R();
	};
	return {
		pending: n,
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
		busy: n.some((v) => v.status === "sending"),
	};
}
var iz = ["image/", "video/", "audio/", "application/", "text/"],
	jp = 20;
function az(e) {
	const [n, i] = (0, b.useState)(new Map()),
		[u, l] = (0, b.useState)(!1),
		[o, f] = (0, b.useState)(null),
		h = (0, b.useRef)(new Map()),
		m = (0, b.useRef)(null);
	(0, b.useEffect)(() => {
		const g = m.current;
		if (g === null) return;
		const _ = h.current.get(g);
		_ && ((m.current = null), _.focus());
	}, [n]);
	const v = (g) => {
		((m.current = g),
			l(!0),
			f(null),
			(async () => {
				const _ = new Map(n);
				for (let p = 0; p < e.attachments.length; p += jp) {
					const w = e.attachments.slice(p, p + jp),
						x = await e.client.fetchJson("/api/v1/files/download-urls", { fileNodeIds: w.map((R) => R.fileNodeId) });
					if (x.status !== 200) throw new Error(x.body.message);
					for (const R of x.body.items) _.set(R.fileNodeId, { kind: "ready", url: R.url });
					for (const R of x.body.errors) _.set(R.fileNodeId, { kind: "error", message: R.message });
				}
				return _;
			})()
				.then((_) => {
					(l(!1), i(_));
				})
				.catch((_) => {
					(l(!1), (m.current = null), f(zn(_)));
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
function uz(e) {
	const n = (0, b.useId)(),
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
						path: "/",
						recursive: !0,
						kind: "file",
						limit: 100,
						scanLimit: 1e4,
						contentTypePrefixes: iz,
						cursor: l,
					})
					.then((R) => {
						if ((v(!1), R.status !== 200)) {
							_(R.body.message);
							return;
						}
						const I = R.body.items.filter((D) => !p.current.has(D.nodeId));
						for (const D of I) p.current.add(D.nodeId);
						(u((D) => [...D, ...I]), o(R.body.cursor), h(R.body.isDone));
					})
					.catch((R) => {
						(v(!1), _(zn(R)));
					}));
		};
	return (
		(0, b.useEffect)(() => {
			w.current || ((w.current = !0), x());
		}, []),
		(0, S.jsxs)(Wu, {
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
var sz = 8,
	lz = 100,
	oz = 10,
	Vh = new WeakMap(),
	sh = new WeakMap();
function cz(e) {
	const n = Vh.get(e);
	if (n !== void 0) return Promise.resolve(n);
	const i = sh.get(e);
	if (i !== void 0) return i;
	const u = fz(e).then((l) => (l.status === "ready" && Vh.set(e, l), sh.delete(e), l));
	return (sh.set(e, u), u);
}
async function fz(e) {
	const n = [];
	let i;
	for (let u = 0; u < oz; u += 1) {
		const l = await Xb(e, { limit: lz, ...(i === void 0 ? {} : { cursor: i }) });
		if ("_nay" in l) return { status: "refused", name: l._nay.name };
		if ((n.push(...l._yay.members), l._yay.cursor === null)) return { status: "ready", members: n };
		i = l._yay.cursor;
	}
	return { status: "ready", members: n };
}
function qp(e) {
	return `mention:${e}`;
}
function oS(e) {
	const n = (0, b.useId)(),
		[i, u] = (0, b.useState)(""),
		[l, o] = (0, b.useState)([]),
		[f, h] = (0, b.useState)(!1),
		[m, v] = (0, b.useState)(null),
		[g, _] = (0, b.useState)(null),
		p = (0, b.useRef)(new Map()),
		w = (0, b.useRef)(null),
		x = (0, b.useRef)(null),
		R = W2({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (M) => {
				M || _(null);
			},
		}),
		I = e.client.context.userId,
		D =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? Sk(m.members, g.query, I).slice(0, sz) : [],
		q = g !== null && (m === "loading" || (m !== null && m.status === "refused") || D.length > 0),
		O = () => {
			if (m !== null) return;
			const M = Vh.get(e.client);
			if (M !== void 0) {
				v(M);
				return;
			}
			(v("loading"), cz(e.client).then(v));
		},
		C = (M) => {
			if (g === null) return;
			const $ = w.current?.selectionStart ?? i.length,
				B = wk(i, g.start, $, M.label);
			(p.current.set(M.userId, M.label), u(B.text), _(null), (x.current = B.caret), R.hide(), R.setValue(""));
		},
		L = () => {
			if (e.busy || e.disabled) return;
			const M = i.trim();
			if (M === "" && l.length === 0) return;
			const $ = Ek(p.current, M);
			(e.onSend(M, l, $), u(""), o([]), _(null), p.current.clear(), R.hide());
		},
		J = (M) => {
			const $ = M.currentTarget.value,
				B = M.currentTarget.selectionStart ?? $.length;
			u($);
			const P = _k($, B);
			if ((_(P), R.setValue(P?.query ?? ""), P === null)) {
				R.hide();
				return;
			}
			O();
		},
		X = (M) => {
			if (q) {
				if (M.key === "ArrowLeft" || M.key === "ArrowRight") {
					R.hide();
					return;
				}
				if (M.key === "Escape") {
					(M.preventDefault(), M.stopPropagation(), _(null), R.hide());
					return;
				}
				if ((M.key === "Enter" || M.key === "Tab") && !M.shiftKey && D.length > 0) {
					M.preventDefault();
					const $ = R.getState().activeId,
						B = D.find((P) => qp(P.userId) === $) ?? D[0];
					C(B);
					return;
				}
			}
			M.key === "Enter" && !M.shiftKey && (M.preventDefault(), L());
		};
	return (
		(0, b.useLayoutEffect)(() => {
			R.setOpen(q);
		}, [R, q]),
		(0, b.useLayoutEffect)(() => {
			const M = x.current;
			if (M === null) return;
			x.current = null;
			const $ = w.current;
			$ !== null && ($.focus(), $.setSelectionRange(M, M));
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
							children: l.map((M) =>
								(0, S.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, S.jsx)("span", { children: M.name }),
											(0, S.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${M.name}`,
												onClick: () => o(($) => $.filter((B) => B.fileNodeId !== M.fileNodeId)),
												children: "×",
											}),
										],
									},
									M.fileNodeId,
								),
							),
						})
					: null,
				(0, S.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, S.jsx)(TN, {
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
								"aria-describedby": n,
								placeholder: e.label,
								rows: 1,
								onChange: J,
								onKeyDown: X,
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
							children: (0, S.jsx)(eM, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: L,
							children: (0, S.jsx)(Fk, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(q2, {
					store: R,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !q,
					getAnchorRect: () => {
						const M = w.current;
						return M === null ? null : M.getBoundingClientRect();
					},
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						m === "loading"
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: "Loading people…" })
							: null,
						m !== null && m !== "loading" && m.status === "refused"
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: Fb(m.name) })
							: null,
						D.map((M) =>
							(0, S.jsx)(
								PN,
								{
									id: qp(M.userId),
									value: M.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: ($) => {
										$.preventDefault();
									},
									onClick: () => C(M),
									children: M.label,
								},
								M.userId,
							),
						),
					],
				}),
				(0, S.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f
					? (0, S.jsx)(uz, {
							client: e.client,
							onPick: (M) => {
								(o(($) => ($.some((B) => B.fileNodeId === M.fileNodeId) ? $ : [...$, M])), h(!1));
							},
							onClose: () => h(!1),
						})
					: null,
			],
		})
	);
}
function dz(e) {
	const [n, i] = (0, b.useState)(!1),
		u = (0, b.useRef)(null),
		l = (0, b.useRef)([]);
	(0, b.useEffect)(() => {
		n && l.current[0]?.focus();
	}, [n]);
	const o = () => {
			(i(!1), u.current?.focus());
		},
		f = (h, m) => {
			h.key === "Escape"
				? (h.preventDefault(), o())
				: h.key === "ArrowRight" || h.key === "ArrowDown"
					? (h.preventDefault(), l.current[(m + 1) % Iu.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), l.current[(m + Iu.length - 1) % Iu.length]?.focus());
		};
	return (0, S.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, S.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				"aria-expanded": n,
				onClick: () => (n ? o() : i(!0)),
				children: "Add reaction",
			}),
			n
				? (0, S.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: Iu.map((h, m) => {
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
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: Pb[h] }),
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
	hz = 300 * 1e3;
function mz(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function Zh(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function vz(e, n) {
	const i = new Date(e).toDateString();
	return i === new Date(n).toDateString() ? "Today" : i === new Date(n - cS).toDateString() ? "Yesterday" : Zh(e);
}
function gz(e) {
	if (e == null) return "•";
	const n = e.split(/\s+/u).filter((u) => u !== "");
	if (n.length === 0) return "•";
	const i = n.length > 1 ? n[n.length - 1][0] : "";
	return `${n[0][0]}${i}`.toUpperCase();
}
function fS(e, n, i = null) {
	const u = [];
	let l = null,
		o = !1;
	for (const f of e) {
		const h = l !== null && new Date(l.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: vz(f.timestamp, n) });
		const m =
			!o && i !== null && f.timestamp > i.lastReadAt && f.createdBy !== i.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = l !== null && !h && !m && l.createdBy === f.createdBy && f.timestamp - l.timestamp <= hz;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (l = f));
	}
	return u;
}
function yz(e, n, i) {
	const u = e.mentions ?? [];
	if (u.length === 0) return e.text;
	const l = u
		.map((h) => ({ id: h, name: n.get(h) }))
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
function Hh(e) {
	const { client: n, collection: i, doc: u, isOwn: l } = e,
		o = u.value.deletedAt !== null,
		f = (0, b.useId)(),
		[h, m] = (0, b.useState)(!1),
		[v, g] = (0, b.useState)(""),
		[_, p] = (0, b.useState)(!1),
		[w, x] = (0, b.useState)(!1),
		[R, I] = (0, b.useState)(null),
		[D, q] = (0, b.useState)(!1),
		O = (0, b.useRef)(null),
		C = (0, b.useRef)(null),
		L = (0, b.useRef)(null),
		J = (0, b.useRef)(!1),
		X = (0, b.useRef)(null),
		M = (0, b.useRef)(null),
		$ = (0, b.useRef)(e.onRequestSettled);
	(($.current = e.onRequestSettled),
		(0, b.useEffect)(() => {
			h && O.current?.focus();
		}, [h]),
		(0, b.useEffect)(() => {
			const j = X.current;
			if (j === null) return;
			const le = j === "edit" ? C.current : L.current;
			le !== null && ((X.current = null), le.focus());
		}, [h, D, o]));
	const B = (j) => {
			j.settled || ((j.settled = !0), (j.cancelled = !0), M.current === j && (M.current = null), $.current());
		},
		P = (j) => {
			(B(j), p(!1), x(!1), I(null), j.onDone());
		},
		ce = (j) => {
			if (M.current !== j || j.running || j.cancelled) return;
			((j.running = !0), p(!0), x(!1), I(null));
			const le = (he) => {
					M.current !== j || j.cancelled || ((j.running = !1), (j.uncertain = !0), p(!1), x(!0), I(he));
				},
				de = j.value.deletedAt !== null && u.value.deletedAt === null;
			try {
				Za(
					n,
					de ? "message-delete" : "message-edit",
					de ? { messageKey: u.key } : { messageKey: u.key, text: j.value.text, mentions: j.value.mentions ?? [] },
				)
					.then((he) => {
						if (M.current !== j || j.cancelled) return;
						if (((j.running = !1), "_nay" in he)) {
							if (he._nay.name === "unavailable") {
								le(he._nay.message);
								return;
							}
							if (j.uncertain && he._nay.name === "conflict") {
								(p(!1), x(!0), I(he._nay.message));
								return;
							}
							(B(j), p(!1), x(!1), I(he._nay.message));
							return;
						}
						const Se = typeof he._yay.revision == "number" ? he._yay.revision : u.revision;
						(e.onApplyLocal({ ...u, value: j.value, revision: Se, updatedAt: Date.now() }), P(j));
					})
					.catch((he) => {
						le(zn(he));
					});
			} catch (he) {
				le(zn(he));
			}
		},
		se = (j, le) => {
			if (M.current !== null) return;
			const de = {
				value: j,
				expectedRevision: u.revision,
				onDone: le,
				running: !1,
				uncertain: !1,
				settled: !1,
				cancelled: !1,
			};
			((M.current = de), e.onRequestStart(), ce(de));
		},
		te = () => {
			const j = M.current;
			(j !== null && B(j), p(!1), x(!1), I(null));
		};
	((0, b.useEffect)(() => {
		o &&
			(h || D
				? (J.current && (X.current = "row"), m(!1), g(""), q(!1), p(!1), x(!1), I(null))
				: J.current && L.current?.focus());
	}, [o, h, D]),
		(0, b.useEffect)(() => {
			const j = M.current;
			if (!(j === null || j.cancelled || u.revision <= j.expectedRevision)) {
				if (u.value.deletedAt !== null && j.value.deletedAt === null) {
					(B(j), p(!1), x(!1), I(null));
					return;
				}
				if (
					j.value.deletedAt !== null
						? u.value.deletedAt !== null
						: u.value.text === j.value.text && u.value.editedAt !== null
				) {
					P(j);
					return;
				}
				(B(j),
					p(!1),
					x(!1),
					I("Someone else changed this message while the request was pending. Review it and try again."));
			}
		}, [u.revision, u.value.deletedAt, u.value.editedAt, u.value.text]),
		(0, b.useEffect)(
			() => () => {
				const j = M.current;
				j !== null && B(j);
			},
			[],
		));
	const ne = () => {
			if (_) return;
			const j = M.current;
			if (j !== null) {
				ce(j);
				return;
			}
			const le = v.trim();
			le !== "" &&
				se({ ...u.value, text: le, editedAt: Date.now() }, () => {
					((X.current = "edit"), m(!1), g(""));
				});
		},
		N = () => {
			_ || (te(), (X.current = "edit"), m(!1), g(""));
		},
		V = () => {
			if (_) return;
			const j = M.current;
			if (j !== null) {
				ce(j);
				return;
			}
			se({ ...u.value, deletedAt: Date.now() }, () => {
				((X.current = "row"), q(!1));
			});
		},
		Q = () => {
			_ || (te(), q(!1));
		},
		ve = (j, le) => {
			if ((I(null), !Array.isArray(e.reactionGroups) && le)) {
				I("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const de = le;
			Za(n, "reaction-toggle", { targetKey: u.key, token: j, on: !de })
				.then((he) => {
					if ("_nay" in he) {
						I(he._nay.message);
						return;
					}
					const Se = typeof he._yay.key == "string" ? he._yay.key : `${u.key}:${j}:${e.selfUserId}`,
						ye = typeof he._yay.revision == "number" ? he._yay.revision : 0;
					e.onApplyReaction({
						key: Se,
						targetKey: u.key,
						token: j,
						createdBy: e.selfUserId,
						revision: ye,
						updatedAt: Date.now(),
						removed: de,
					});
				})
				.catch((he) => {
					I(zn(he));
				});
		},
		pe = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		$e = Date.now() - u.timestamp < 7 * cS,
		k = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, S.jsxs)("li", {
		ref: L,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		tabIndex: -1,
		onFocusCapture: () => {
			J.current = !0;
		},
		onBlurCapture: (j) => {
			j.relatedTarget instanceof Node && (J.current = j.currentTarget.contains(j.relatedTarget));
		},
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: gz(e.authorName) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: pe }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							$e ? (0, S.jsxs)("span", { className: "visually-hidden", children: [Zh(u.timestamp), " "] }) : null,
							(0, S.jsx)("span", { className: "message-clock", children: $e ? mz(u.timestamp) : Zh(u.timestamp) }),
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
									ref: O,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: v,
									readOnly: _ || w,
									onInput: (j) => g(j.currentTarget.value),
									onKeyDown: (j) => {
										j.key === "Escape"
											? (j.preventDefault(), N())
											: j.key === "Enter" && !j.shiftKey && (j.preventDefault(), ne());
									},
								}),
								(0, S.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: _,
											onClick: N,
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
										yz(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, S.jsx)(az, { client: n, attachments: u.value.attachments }) : null,
								e.reactionGroups === "unknown"
									? (0, S.jsx)("div", { className: "message-reactions-unknown", children: "Reactions unavailable" })
									: Array.isArray(e.reactionGroups) && e.reactionGroups.length > 0
										? (0, S.jsx)("div", {
												className: "message-reactions",
												children: e.reactionGroups.map((j) =>
													(0, S.jsxs)(
														"button",
														{
															type: "button",
															className: j.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
															"aria-pressed": j.reactedByMe,
															"aria-label": `${Kb[j.token]}, ${j.count} ${j.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => ve(j.token, j.reactedByMe),
															children: [
																(0, S.jsx)("span", { "aria-hidden": "true", children: Pb[j.token] }),
																(0, S.jsx)("span", { className: "reaction-chip-count", children: j.count }),
															],
														},
														j.token,
													),
												),
											})
										: null,
								k && typeof e.replyCount == "number"
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
													children: `${Dk(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, S.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${pc(e.replyLatestAt, Date.now())}`,
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
							e.onOpenThread !== null && e.replyCount !== null && !k
								? (0, S.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, S.jsx)(dz, { groups: Array.isArray(e.reactionGroups) ? e.reactionGroups : [], onPick: ve }),
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
												onClick: () => q(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			R !== null && !D ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: R }) : null,
			D
				? (0, S.jsxs)(Wu, {
						labelledBy: f,
						onClose: Q,
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
										onClick: Q,
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
function lh(e, n) {
	return Date.now() >= e.session.expiresAt()
		? `This Chitchat session expired, so ${n} stopped updating. Reload the page to continue.`
		: `Chitchat can no longer read ${n}. Reload the page to try again.`;
}
function pz(e) {
	const { client: n, userId: i, root: u, memberNames: l, replies: o, repliesLoaded: f } = e,
		h = (0, b.useRef)(null);
	(0, b.useEffect)(() => {
		h.current?.focus();
	}, []);
	const m = lS({
		client: n,
		collection: "replies",
		keyPrefix: Gb(u.key),
		userId: i,
		getAuthorName: () => l.get(i) ?? null,
		onDelivered: (_) => {
			e.onApplyLocalReply(_);
		},
		onRequestStart: e.onRequestStart,
		onRequestSettled: e.onRequestSettled,
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
				children: (0, S.jsx)(Hh, {
					client: n,
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
													Hh,
													{
														client: n,
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
													},
													_.doc.key,
												),
								),
								m.pending.map((_) => (0, S.jsx)(dS, { pending: _, onRetry: () => m.retry(_) }, _.clientRequestId)),
							],
						})
					: null,
			(0, S.jsx)(oS, {
				client: n,
				label: "Reply in thread",
				busy: m.busy,
				disabled: e.repliesError !== null,
				onSend: m.send,
			}),
		],
	});
}
var Ip = { hasMore: !0, deepestRoot: null, incomplete: !1, dead: !1 };
function hS(e, n) {
	return e.incomplete || e.dead ? !1 : !e.hasMore || (e.deepestRoot !== null && n < e.deepestRoot);
}
var Lp = 100,
	oh = 1e3,
	bz = 3e4;
function _z(e) {
	let n = null;
	for (const i of e) (n === null || i.updatedAt > n) && (n = i.updatedAt);
	return n;
}
function Sz(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e.key;
	return typeof n == "string" ? n : null;
}
function ch(e) {
	let n = null;
	for (const i of e) {
		if (typeof i != "object" || i === null) continue;
		const u = i.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (n === null || u > n) && (n = u);
	}
	return n;
}
function fh(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function dh(e, n) {
	return e.filter((i) => {
		const u = Sz(i);
		return u !== null && u.startsWith(n);
	});
}
function Up(e, n) {
	return e.fetchJson("/api/v1/plugin-data/list", n).then((i) => {
		if (i.status !== 200) throw new Error(i.body.message);
		return i.body;
	});
}
function Qh(e, n, i) {
	if (e.incomplete || e.dead) return "unknown";
	const u = n.get(i);
	if (u !== void 0 && u.length > 0) return u;
	const l = uc(i);
	return l !== null && hS(e, l) ? (u ?? []) : "pending";
}
function wz(e, n, i) {
	if (e.incomplete || e.dead) return "unknown";
	const u = n.get(i);
	if (u !== void 0 && u.count > 0) return u.count;
	const l = uc(i);
	return l !== null && hS(e, l) ? (u?.count ?? 0) : "unknown";
}
var $p = 420,
	Ho = 244,
	hh = 340,
	Bp = 16;
function Ez(e) {
	const {
			client: n,
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
		[I, D] = (0, b.useState)(!1),
		[q, O] = (0, b.useState)(!1),
		[C, L] = (0, b.useState)([]),
		[J, X] = (0, b.useState)([]),
		[M, $] = (0, b.useState)(Ip),
		[B, P] = (0, b.useState)(Ip),
		[ce, se] = (0, b.useState)(hh),
		[te, ne] = (0, b.useState)(0),
		[N, V] = (0, b.useState)(null),
		[Q, ve] = (0, b.useState)(null),
		[pe, $e] = (0, b.useState)(null),
		[k, j] = (0, b.useState)(!1),
		[le, de] = (0, b.useState)(!1),
		[he, Se] = (0, b.useState)(null),
		ye = (0, b.useRef)(null),
		Ne = (0, b.useRef)(null),
		Ue = (0, b.useRef)(null),
		Ze = (0, b.useRef)(null),
		st = (0, b.useRef)(null),
		kn = (0, b.useRef)(null),
		mn = (0, b.useRef)(null),
		lt = (0, b.useRef)(null),
		be = (0, b.useRef)(0),
		Re = (0, b.useRef)({ reactions: null, replies: null }),
		He = (0, b.useRef)({ reactions: !1, replies: !1 }),
		Oe = (0, b.useRef)(0),
		$t = (0, b.useRef)({ reactions: { delayMs: oh, timer: null }, replies: { delayMs: oh, timer: null } }),
		ft = (0, b.useRef)(!1),
		fe = (0, b.useRef)(!1),
		ke = (0, b.useRef)(null),
		St = (0, b.useRef)(u.value.name),
		ze = (0, b.useRef)(null),
		dt = (0, b.useRef)(new Map()),
		Rt = (0, b.useRef)(null),
		ut = (0, b.useRef)(null),
		Ot = (0, b.useRef)(0),
		on = (0, b.useRef)(0),
		an = X0(u.key),
		Gn = hn(u.key) ? u.key : void 0,
		Et = iT(
			n.api.plugins_data.watch_documents_page,
			{ collection: "messages", keyPrefix: an },
			{ initialNumItems: 100 },
		),
		vn = () => {
			((on.current += 1), v());
		},
		bt = () => {
			on.current !== 0 && ((on.current -= 1), g());
		};
	((0, b.useEffect)(() => {
		St.current = u.value.name;
	}, [u.value.name]),
		(0, b.useEffect)(() => {
			Za(n, "reconcile", { channelKey: u.key }).catch(() => {});
		}, [n, u.key]));
	const En = (ee) => {
			const ge = Ne.current;
			ge !== null && (ge.apply_window(ee), X(ge.get_sorted()));
		},
		It = (ee, ge, qe, Ge, Qe) => {
			const Fe = ge.at(-1),
				rt =
					Fe === void 0 ? null : ee === "reactions" ? (Fe.targetKey === void 0 ? null : uc(Fe.targetKey)) : nl(Fe.key);
			qe.length > 0 && (Re.current[ee] = qe[qe.length - 1].key);
			const wt = {
				hasMore: qe.length === 0 ? !1 : !Ge,
				deepestRoot: rt ?? (ee === "reactions" ? Ze.current?.deepestRoot : st.current?.deepestRoot) ?? null,
				incomplete: Qe,
				dead: (ee === "reactions" ? Ze.current?.dead : st.current?.dead) ?? !1,
			};
			ee === "reactions"
				? ((Ze.current = wt), $(wt), Qe || cn("reactions"))
				: ((st.current = wt), P(wt), Qe || cn("replies"));
		},
		Fn = (ee) => {
			const ge = $t.current[ee];
			ge.timer !== null && (clearTimeout(ge.timer), (ge.timer = null));
		},
		cn = (ee) => {
			(Fn(ee), ($t.current[ee].delayMs = oh));
		},
		ur = (ee) => {
			if ((ee === "reactions" ? Ze.current : st.current)?.dead) return;
			const ge = $t.current[ee];
			if (ge.timer !== null) return;
			const qe = ge.delayMs,
				Ge = qe * (0.5 + Math.random());
			ge.timer = setTimeout(() => {
				((ge.timer = null), (ge.delayMs = Math.min(qe * 2, bz)), Tn(ee));
			}, Ge);
		},
		Tn = (ee) => {
			if (He.current[ee] || (ee === "reactions" ? Ze.current : st.current)?.dead) return;
			He.current[ee] = !0;
			const ge = Oe.current,
				qe = Re.current[ee];
			Up(n, { collection: ee, keyPrefix: an, ...(qe === null ? {} : { keyStartExclusive: qe }), limit: Lp })
				.then((Ge) => {
					if (!(!ft.current || Oe.current !== ge)) {
						if (((He.current[ee] = !1), ee === "reactions")) {
							const Qe = Ue.current;
							if (Qe === null) return;
							const Fe = Qe.apply_window(Ge.documents);
							L(Qe.get_sorted());
							const rt = Ge.documents.length === 0 && !Ge.isDone;
							(It("reactions", Fe, Ge.documents, Ge.isDone, rt), rt && ur("reactions"));
						} else {
							const Qe = Ne.current;
							if (Qe === null) return;
							const Fe = Qe.apply_window(Ge.documents);
							X(Qe.get_sorted());
							const rt = Ge.documents.length === 0 && !Ge.isDone;
							(It("replies", Fe, Ge.documents, Ge.isDone, rt), rt && ur("replies"));
						}
						sr();
					}
				})
				.catch(() => {
					!ft.current || Oe.current !== ge || ((He.current[ee] = !1), It(ee, [], [], !0, !0), ur(ee));
				});
		},
		Pt = (ee) => {
			const ge = ee === "reactions" ? Ze.current : st.current;
			ge === null || !ge.incomplete || ge.dead || (Fn(ee), Tn(ee));
		},
		sr = () => {
			const ee = kn.current;
			if (ee !== null)
				for (const ge of ["reactions", "replies"]) {
					const qe = ge === "reactions" ? Ze.current : st.current;
					qe === null ||
						!qe.hasMore ||
						qe.incomplete ||
						qe.dead ||
						((qe.deepestRoot === null || qe.deepestRoot < ee) && Tn(ge));
				}
		},
		qn = (ee) => {
			if (fe.current) return;
			const ge = _z(ee);
			ge !== null && ((fe.current = !0), V(ge), ve(ge), $e(ge));
		};
	((0, b.useEffect)(
		() => (
			(ye.current ??= Jd(sc)),
			(Ne.current ??= Jd(sc)),
			(Ue.current ??= Jd(kk)),
			(Oe.current += 1),
			(ft.current = !0),
			(fe.current = !1),
			(Re.current = { reactions: null, replies: null }),
			(He.current = { reactions: !1, replies: !1 }),
			cn("reactions"),
			cn("replies"),
			(Ze.current = null),
			(st.current = null),
			() => {
				((ft.current = !1), cn("reactions"), cn("replies"));
			}
		),
		[],
	),
		(0, b.useEffect)(() => {
			const ee = ye.current;
			if (Et.status === "LoadingFirstPage" || ee === null) return;
			const ge = ee.apply_window(Et.results);
			(R(ee.get_sorted()), D(!0));
			const qe = Et.results.at(-1)?.key ?? null;
			((mn.current = qe),
				(kn.current = qe === null ? null : uc(qe)),
				qn(Et.results),
				Ze.current === null && !He.current.reactions && Tn("reactions"),
				st.current === null && !He.current.replies && Tn("replies"),
				sr());
			const Ge = ze.current;
			if (Ge === null) {
				ze.current = new Set(ge.map((wt) => wt.key));
				return;
			}
			const Qe = lt.current;
			if (Qe !== null) {
				const wt = Et.results.findIndex((Ln) => Ln.key === Qe);
				if (wt < 0) lt.current = null;
				else {
					const Ln = Et.results.slice(wt + 1);
					for (const xn of Ln) Ge.add(xn.key);
					(Ln.length > 0 || Et.status !== "LoadingMore") && (lt.current = null);
				}
			}
			const Fe = ge.filter((wt) => !Ge.has(wt.key) && wt.createdBy !== i && wt.value.deletedAt === null);
			for (const wt of ge) Ge.add(wt.key);
			const rt = Fe.length > 0 ? ++be.current : be.current;
			if (Fe.length === 1) {
				const wt = Fe[0];
				l.resolve([wt.createdBy])
					.then(() => {
						if (!ft.current || rt !== be.current) return;
						const Ln = l.get(wt.createdBy) ?? null,
							xn = wt.value.text,
							Un = xn.length > 80 ? `${xn.slice(0, 80)}…` : xn;
						o(`${Ln ?? "Former member"}: ${Un}`);
					})
					.catch(() => {
						!ft.current || rt !== be.current || o(`New message in #${St.current}`);
					});
			} else Fe.length > 1 && o(`${Fe.length} new messages in #${St.current}`);
		}, [Et.results, Et.status, i, l, o]));
	const zt = Gn === void 0 ? {} : { scopeId: Gn },
		ht = Va(
			n.api.plugins_data.watch_changes,
			N === null ? "skip" : { collection: "messages", limit: 100, updatedSince: N, ...zt },
		),
		wr = Va(
			n.api.plugins_data.watch_changes,
			Q === null ? "skip" : { collection: "replies", limit: 100, updatedSince: Q, ...zt },
		),
		fn = Va(
			n.api.plugins_data.watch_changes,
			pe === null ? "skip" : { collection: "reactions", limit: 100, updatedSince: pe, ...zt },
		);
	((0, b.useEffect)(() => {
		if (ht === void 0 || N === null) return;
		if (ht === null) {
			O(!0);
			return;
		}
		O(!1);
		const ee = ye.current;
		if (ee === null) return;
		const ge = dh(ht.docs, an);
		(ee.apply_window(ge), R(ee.get_sorted()));
		const qe = ch(ht.docs),
			Ge = fh({ current: N, newest: qe, truncated: ht.truncated });
		Ge !== null && V(Ge);
	}, [ht, N, an]),
		(0, b.useEffect)(() => {
			if (wr === void 0 || Q === null) return;
			if (wr === null) {
				Fn("replies");
				const Fe = {
					...(st.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, dead: !1 }),
					incomplete: !1,
					dead: !0,
				};
				((st.current = Fe), P(Fe));
				return;
			}
			const ee = Ne.current;
			if (ee === null) return;
			const ge = st.current;
			if (ge !== null && ge.dead) {
				const Fe = { ...ge, dead: !1 };
				((st.current = Fe), P(Fe));
			}
			const qe = dh(wr.docs, an);
			(ee.apply_window(qe), X(ee.get_sorted()), Pt("replies"));
			const Ge = ch(wr.docs),
				Qe = fh({ current: Q, newest: Ge, truncated: wr.truncated });
			Qe !== null && ve(Qe);
		}, [wr, Q, an]),
		(0, b.useEffect)(() => {
			if (fn === void 0 || pe === null) return;
			if (fn === null) {
				Fn("reactions");
				const Fe = {
					...(Ze.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, dead: !1 }),
					incomplete: !1,
					dead: !0,
				};
				((Ze.current = Fe), $(Fe));
				return;
			}
			const ee = Ue.current;
			if (ee === null) return;
			const ge = Ze.current;
			if (ge !== null && ge.dead) {
				const Fe = { ...ge, dead: !1 };
				((Ze.current = Fe), $(Fe));
			}
			const qe = dh(fn.docs, an);
			(ee.apply_window(qe), L(ee.get_sorted()), Pt("reactions"));
			const Ge = ch(fn.docs),
				Qe = fh({ current: pe, newest: Ge, truncated: fn.truncated });
			Qe !== null && $e(Qe);
		}, [fn, pe, an]),
		(0, b.useEffect)(() => {
			const ee = () => {
				document.visibilityState === "visible" && (Pt("reactions"), Pt("replies"));
			};
			return (
				document.addEventListener("visibilitychange", ee),
				() => document.removeEventListener("visibilitychange", ee)
			);
		}, [n, u.key]),
		(0, b.useEffect)(() => {
			if (f === null) {
				(j(!0), de(!1), Se(null));
				return;
			}
			let ee = !1;
			return (
				j(!1),
				de(!1),
				Se(null),
				Up(n, { collection: "replies", keyPrefix: Gb(f), limit: Lp })
					.then((ge) => {
						ee || (En(ge.documents), de(!ge.isDone), j(!0));
					})
					.catch((ge) => {
						ee || (Se(zn(ge)), j(!0));
					}),
				() => {
					ee = !0;
				}
			);
		}, [n, f]));
	const Kt = lS({
		client: n,
		collection: "messages",
		keyPrefix: X0(u.key),
		userId: i,
		getAuthorName: () => l.get(i) ?? null,
		onDelivered: (ee) => {
			(ye.current?.apply_local(ee), ze.current?.add(ee.key), R(ye.current?.get_sorted() ?? []));
		},
		onRequestStart: vn,
		onRequestSettled: bt,
	});
	((0, b.useEffect)(() => {
		const ee = new Set();
		for (const ge of x) {
			ee.add(ge.createdBy);
			for (const qe of ge.value.mentions ?? []) ee.add(qe);
		}
		for (const ge of J) {
			ee.add(ge.createdBy);
			for (const qe of ge.value.mentions ?? []) ee.add(qe);
		}
		ee.size > 0 && l.resolve([...ee]);
	}, [x, J, l]),
		(0, b.useEffect)(() => {
			x.length > 0 && p(x[0].timestamp);
		}, [x, p]),
		(0, b.useEffect)(() => {
			const ee = x.length > 0 ? x[0].key : null,
				ge = ee !== null && ee !== ut.current,
				qe = Kt.pending.length > Ot.current;
			((ut.current = ee),
				(Ot.current = Kt.pending.length),
				(ge || qe) && Rt.current && (Rt.current.scrollTop = Rt.current.scrollHeight));
		}, [x, Kt.pending.length]));
	const zr = () => {
		((lt.current = mn.current), Et.loadMore(100));
	};
	(0, b.useEffect)(() => {
		const ee = ke.current;
		if (f === null || ee === null) return;
		ne(ee.clientWidth);
		const ge = new ResizeObserver(() => ne(ee.clientWidth));
		return (ge.observe(ee), () => ge.disconnect());
	}, [f]);
	const Er = (ee) => {
			const ge = Math.max(Ho, te - $p);
			return Math.min(ge, Math.max(Ho, ee));
		},
		Tr = (ee) => {
			ee.key === "ArrowLeft"
				? (ee.preventDefault(), se(Er(ce + Bp)))
				: ee.key === "ArrowRight"
					? (ee.preventDefault(), se(Er(ce - Bp)))
					: ee.key === "Home" && (ee.preventDefault(), se(Er(hh)));
		},
		Oi = (ee) => {
			(ee.preventDefault(), ee.currentTarget.setPointerCapture(ee.pointerId));
		},
		zi = (ee) => {
			if (!ee.currentTarget.hasPointerCapture(ee.pointerId)) return;
			const ge = ke.current?.getBoundingClientRect();
			ge !== void 0 && se(Er(ge.right - ee.clientX));
		},
		Yr = (0, b.useMemo)(() => Ok(C, i), [C, i]),
		xr = (0, b.useMemo)(() => zk(J), [J]),
		Xn = (ee) => {
			(ye.current?.apply_local(ee), R(ye.current?.get_sorted() ?? []));
		},
		Gr = (ee) => {
			(Ne.current?.apply_local(ee), X(Ne.current?.get_sorted() ?? []));
		},
		Mn = (ee) => {
			(Ue.current?.apply_local(ee), L(Ue.current?.get_sorted() ?? []));
		},
		mt = f === null ? [] : J.filter((ee) => nl(ee.key) === f),
		un = (ee) => {
			if ((_ || on.current > 0) && f !== ee.key) {
				o("Wait for pending message changes to finish before switching threads.");
				return;
			}
			h(ee.key);
		},
		Yt = () => {
			if (_ || on.current > 0) {
				o("Wait for pending message changes to finish before closing the thread.");
				return;
			}
			const ee = f;
			(h(null), ee !== null && dt.current.get(ee)?.focus());
		},
		In = f === null ? null : (x.find((ee) => ee.key === f) ?? null),
		Fr = fS([...x].reverse(), Date.now(), w === null ? null : { lastReadAt: w, selfUserId: i }),
		Di = Math.max(Ho, te - $p),
		Xr = Er(ce);
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
							hn(u.key) ? (0, S.jsx)("p", { className: "channel-privacy", children: nm }) : null,
						],
					}),
					u.value.archivedAt !== null
						? (0, S.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
						: null,
				],
			}),
			(0, S.jsxs)("div", {
				ref: ke,
				className: "channel-body",
				style: { "--thread-width": `${Xr}px` },
				children: [
					(0, S.jsxs)("div", {
						ref: Rt,
						className: "message-log",
						role: "log",
						"aria-live": "off",
						"aria-label": `Messages in #${u.value.name}`,
						children: [
							q
								? (0, S.jsx)("div", {
										className: "channel-status is-error",
										role: "alert",
										children: lh(n, `messages in #${u.value.name}`),
									})
								: null,
							I && (Et.status === "CanLoadMore" || Et.status === "LoadingMore")
								? (0, S.jsx)("div", {
										className: "log-older",
										children: (0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: Et.status === "LoadingMore",
											onClick: zr,
											children: "Load older",
										}),
									})
								: null,
							M.incomplete || B.incomplete
								? (0, S.jsx)("div", {
										className: "channel-status",
										role: "alert",
										children: "Some reactions and replies in this range could not be loaded.",
									})
								: null,
							M.dead
								? (0, S.jsx)("div", {
										className: "channel-status is-error",
										role: "alert",
										children: lh(n, "reactions in this channel"),
									})
								: null,
							B.dead
								? (0, S.jsx)("div", {
										className: "channel-status is-error",
										role: "alert",
										children: lh(n, "reply counts in this channel"),
									})
								: null,
							I
								? x.length === 0 && Kt.pending.length === 0
									? (0, S.jsx)("div", { className: "channel-status", children: "No messages yet" })
									: (0, S.jsxs)("ul", {
											className: "message-list",
											children: [
												Fr.map((ee) =>
													ee.kind === "divider"
														? (0, S.jsx)("li", { className: "day-divider", children: ee.label }, ee.key)
														: ee.kind === "new"
															? (0, S.jsx)(
																	"li",
																	{
																		className: "new-divider",
																		children: (0, S.jsx)("span", {
																			className: "new-divider-label",
																			children: "New messages",
																		}),
																	},
																	ee.key,
																)
															: (0, S.jsx)(
																	Hh,
																	{
																		client: n,
																		collection: "messages",
																		doc: ee.doc,
																		isOwn: ee.doc.createdBy === i,
																		selfUserId: i,
																		memberNames: l,
																		isContinuation: ee.isContinuation,
																		authorName: l.get(ee.doc.createdBy),
																		reactionGroups: Qh(M, Yr, ee.doc.key),
																		replyCount: wz(B, xr, ee.doc.key),
																		replyLatestAt: xr.get(ee.doc.key)?.latestAt ?? null,
																		repliesHasMore: B.hasMore,
																		onOpenThread: un,
																		threadDisabled: _,
																		replyTriggerRef: (ge) => {
																			ge === null ? dt.current.delete(ee.doc.key) : dt.current.set(ee.doc.key, ge);
																		},
																		onApplyLocal: Xn,
																		onRequestStart: vn,
																		onRequestSettled: bt,
																		onApplyReaction: Mn,
																	},
																	ee.doc.key,
																),
												),
												Kt.pending.map((ee) =>
													(0, S.jsx)(dS, { pending: ee, onRetry: () => Kt.retry(ee) }, ee.clientRequestId),
												),
											],
										})
								: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
						],
					}),
					In !== null
						? (0, S.jsx)("div", {
								className: "thread-resize",
								role: "separator",
								tabIndex: 0,
								"aria-orientation": "vertical",
								"aria-label": "Resize thread panel",
								"aria-valuenow": Xr,
								"aria-valuemin": Ho,
								"aria-valuemax": Di,
								onKeyDown: Tr,
								onPointerDown: Oi,
								onPointerMove: zi,
								onDoubleClick: () => se(Er(hh)),
							})
						: null,
					In !== null
						? (0, S.jsx)(
								pz,
								{
									client: n,
									userId: i,
									root: In,
									replies: mt,
									repliesLoaded: k,
									repliesTruncated: le,
									repliesError: he,
									reactionCoverage: M,
									reactionGroupsByTarget: Yr,
									memberNames: l,
									isNarrow: m,
									onApplyLocalRoot: Xn,
									onApplyLocalReply: Gr,
									onRequestStart: vn,
									onRequestSettled: bt,
									sendInFlight: _,
									announce: o,
									onApplyReaction: Mn,
									onClose: Yt,
								},
								In.key,
							)
						: null,
				],
			}),
			_
				? (0, S.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Wait for pending message changes to finish before leaving this channel or thread.",
					})
				: null,
			(0, S.jsx)(oS, { client: n, label: `Message #${u.value.name}`, busy: Kt.busy, disabled: !1, onSend: Kt.send }),
		],
	});
}
var _l = Kr([fl], [Tc]),
	Tz = _l.useContext,
	xz = _l.useScopedContext,
	dj = _l.useProviderContext,
	hj = _l.ContextProvider,
	mj = _l.ScopedContextProvider,
	vj = (0, b.createContext)(void 0),
	Sl = Kr([p_], [kc]),
	gj = Sl.useContext,
	yj = Sl.useScopedContext,
	jm = Sl.useProviderContext,
	Az = Sl.ContextProvider,
	mS = Sl.ScopedContextProvider,
	wl = Kr([fl, Az], [Tc, mS]),
	vS = wl.useContext,
	Rz = wl.useScopedContext,
	Uc = wl.useProviderContext,
	gS = wl.ContextProvider,
	Cz = wl.ScopedContextProvider,
	pj = (0, b.createContext)(void 0),
	kz = "div",
	wi = "";
function mh() {
	wi = "";
}
function Mz(e) {
	const n = e.target;
	return n && Pr(n)
		? !1
		: e.key === " " && wi.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function Nz(e, n) {
	if (ir(e)) return !0;
	const i = e.target;
	return i ? n.some((u) => u.element === i) : !1;
}
function Oz(e) {
	return e.filter((n) => !n.disabled);
}
function Go(e, n) {
	var i;
	const u = ((i = e.element) == null ? void 0 : i.textContent) || e.children || ("value" in e && e.value);
	return u ? i_(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function zz(e, n, i) {
	if (!i) return e;
	const u = e.find((l) => l.id === i);
	return !u || !Go(u, n) || (wi !== n && Go(u, wi))
		? e
		: ((wi = n),
			uM(
				e.filter((l) => Go(l, wi)),
				i,
			).filter((l) => l.id !== i));
}
var qm = et(function ({ store: n, typeahead: i = !0, ...u }) {
		const l = Ec();
		((n = n || l), Ht(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, b.useRef)(0),
			h = De((m) => {
				if ((o?.(m), m.defaultPrevented || !i || !n)) return;
				if (!Mz(m)) return mh();
				const { renderedItems: v, items: g, activeId: _, id: p } = n.getState();
				let w = Oz(g.length > v.length ? g : v);
				const x = At(m.currentTarget),
					R = `[data-offscreen-id="${p}"]`,
					I = x.querySelectorAll(R);
				for (const O of I) {
					const C = O.ariaDisabled === "true" || ("disabled" in O && !!O.disabled);
					w.push({ id: O.id, element: O, disabled: C });
				}
				if ((I.length && (w = n_(w, (O) => O.element)), !Nz(m, w))) return mh();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						wi = "";
					}, 500)));
				const D = m.key.toLowerCase();
				((wi += D), (w = zz(w, D, _)));
				const q = w.find((O) => Go(O, wi));
				q ? n.move(q.id) : mh();
			});
		return ((u = { ...u, onKeyDownCapture: h }), Xa(u));
	}),
	bj = Ye(function (n) {
		return Je(kz, qm(n));
	}),
	Dz = "div";
function jz({ store: e, ...n }) {
	const [i, u] = (0, b.useState)(void 0),
		l = n["aria-label"],
		o = tn(e, "disclosureElement"),
		f = tn(e, "contentElement");
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
var yS = et(function ({ store: n, alwaysVisible: i, composite: u, ...l }) {
		const o = Uc();
		((n = n || o), Ht(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = Mi(l.id),
			g = l.onKeyDown,
			_ = n.useState((C) => C.placement.split("-")[0]),
			p = n.useState((C) => (C.orientation === "both" ? void 0 : C.orientation)),
			w = p !== "vertical",
			x = tn(h, (C) => !!C && C.orientation !== "vertical"),
			R = De((C) => {
				if ((g?.(C), !C.defaultPrevented)) {
					if (m || (h && !w)) {
						const L = {
							ArrowRight: () => _ === "left" && !w,
							ArrowLeft: () => _ === "right" && !w,
							ArrowUp: () => _ === "bottom" && w,
							ArrowDown: () => _ === "top" && w,
						}[C.key];
						if (L?.()) return (C.stopPropagation(), C.preventDefault(), n?.hide());
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
							}[C.key],
							J = L?.();
						J !== void 0 && (C.stopPropagation(), C.preventDefault(), h.move(J));
					}
				}
			});
		l = wn(l, (C) => (0, S.jsx)(Cz, { value: n, children: C }), [n]);
		const I = jz({ store: n, ...l }),
			D = zc(n.useState("mounted"), l.hidden, i),
			q = D ? { ...l.style, display: "none" } : l.style;
		l = {
			id: v,
			"aria-labelledby": I,
			hidden: D,
			...l,
			ref: Qt(v ? n.setContentElement : null, l.ref),
			style: q,
			onKeyDown: R,
		};
		const O = !!n.combobox;
		return (
			(u = u ?? !O),
			u && (l = { role: "menu", "aria-orientation": p, ...l }),
			(l = mm({ store: n, composite: u, ...l })),
			(l = qm({ store: n, typeahead: !O, ...l })),
			l
		);
	}),
	_j = Ye(function (n) {
		return Je(Dz, yS(n));
	});
function vh(e) {
	return [e.clientX, e.clientY];
}
function Vp(e, n) {
	const [i, u] = e;
	let l = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = n[h],
			[_, p] = n[m],
			[, w] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
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
function qz(e, n) {
	const { top: i, right: u, bottom: l, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < i ? "top" : h > l ? "bottom" : null];
}
function Zp(e, n) {
	const i = e.getBoundingClientRect(),
		{ top: u, right: l, bottom: o, left: f } = i,
		[h, m] = qz(n, i),
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
var Iz = "div";
function pS(e, n, i, u) {
	return oa(n) ? !0 : e ? !!(rn(n, e) || (i && rn(i, e)) || u?.some((l) => pS(e, l, i))) : !1;
}
function Lz({ store: e, ...n }) {
	const [i, u] = (0, b.useState)(!1),
		l = e.useState("mounted");
	(0, b.useEffect)(() => {
		l || u(!1);
	}, [l]);
	const o = n.onFocus,
		f = De((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, b.useRef)(null);
	return (
		(0, b.useEffect)(
			() =>
				Cn(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: i, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var Hp = (0, b.createContext)(null),
	bS = et(function ({
		store: n,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: l = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = jm();
		((n = n || m), Ht(n, !1));
		const v = (0, b.useRef)(null),
			[g, _] = (0, b.useState)([]),
			p = (0, b.useRef)(0),
			w = (0, b.useRef)(null),
			{ portalRef: x, domReady: R } = om(u, h.portalRef),
			I = cm(),
			D = !!o,
			q = Mt(o),
			O = !!f,
			C = Mt(f),
			L = n.useState("open"),
			J = n.useState("mounted");
		((0, b.useEffect)(() => {
			if (!R || !J || (!D && !O)) return;
			const P = v.current;
			return P
				? Kn(
						Sn(
							"mousemove",
							(se) => {
								if (!n || !I()) return;
								const { anchorElement: te, hideTimeout: ne, timeout: N } = n.getState(),
									V = w.current,
									[Q] = se.composedPath(),
									ve = te;
								if (pS(Q, P, ve, g)) {
									((w.current = Q && ve && rn(ve, Q) ? vh(se) : null), window.clearTimeout(p.current), (p.current = 0));
									return;
								}
								if (!p.current) {
									if (V) {
										const pe = vh(se);
										if (Vp(pe, Zp(P, V))) {
											if (((w.current = pe), !C(se))) return;
											(se.preventDefault(), se.stopPropagation());
											return;
										}
									}
									q(se) &&
										(p.current = window.setTimeout(() => {
											((p.current = 0), n?.hide());
										}, ne ?? N));
								}
							},
							!0,
						),
						() => clearTimeout(p.current),
					)
				: void 0;
		}, [n, I, R, J, D, O, g, C, q]),
			(0, b.useEffect)(() => {
				if (!R || !J || !O) return;
				const P = (ce) => {
					const se = v.current;
					if (!se) return;
					const te = w.current;
					if (!te) return;
					const ne = Zp(se, te);
					if (Vp(vh(ce), ne)) {
						if (!C(ce)) return;
						(ce.preventDefault(), ce.stopPropagation());
					}
				};
				return Kn(Sn("mouseenter", P, !0), Sn("mouseover", P, !0), Sn("mouseout", P, !0), Sn("mouseleave", P, !0));
			}, [R, J, O, C]),
			(0, b.useEffect)(() => {
				R && (L || n?.setAutoFocusOnShow(!1));
			}, [n, R, L]));
		const X = c_(L);
		(0, b.useEffect)(() => {
			if (R)
				return () => {
					X.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, R]);
		const M = (0, b.useContext)(Hp);
		at(() => {
			if (i || !u || !J || !R) return;
			const P = v.current;
			if (P) return M?.(P);
		}, [i, u, J, R]);
		const $ = (0, b.useCallback)(
			(P) => {
				_((se) => [...se, P]);
				const ce = M?.(P);
				return () => {
					(_((se) => se.filter((te) => te !== P)), ce?.());
				};
			},
			[M],
		);
		((h = wn(h, (P) => (0, S.jsx)(mS, { value: n, children: (0, S.jsx)(Hp.Provider, { value: $, children: P }) }), [
			n,
			$,
		])),
			(h = { ...h, ref: Qt(v, h.ref) }),
			(h = Lz({ store: n, ...h })));
		const B = n.useState((P) => i || P.autoFocusOnShow);
		return (
			(h = Dm({
				store: n,
				modal: i,
				portal: u,
				autoFocusOnShow: B,
				...h,
				portalRef: x,
				hideOnEscape(P) {
					return _c(l, P)
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
	Sj = pl(
		Ye(function (n) {
			return Je(Iz, bS(n));
		}),
		jm,
	),
	Uz = "div",
	$z = et(function ({
		store: n,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: l = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = Uc();
		((n = n || v), Ht(n, !1));
		const g = (0, b.useRef)(null),
			_ = n.parent,
			p = n.menubar,
			w = !!_,
			x = !!p && !w;
		m = { ...m, ref: Qt(g, m.ref) };
		const { "aria-labelledby": R, ...I } = yS({ store: n, alwaysVisible: h, ...m });
		m = I;
		const [D, q] = (0, b.useState)(),
			O = n.useState("autoFocusOnShow"),
			C = n.useState("initialFocus"),
			L = n.useState("baseElement"),
			J = n.useState("renderedItems");
		(0, b.useEffect)(() => {
			let se = !1;
			return (
				q((te) => {
					var ne, N, V;
					if (se || !O) return;
					if ((ne = te?.current) != null && ne.isConnected) return te;
					const Q = (0, b.createRef)();
					switch (C) {
						case "first":
							Q.current = ((N = J.find((ve) => !ve.disabled && ve.element)) == null ? void 0 : N.element) || null;
							break;
						case "last":
							Q.current =
								((V = [...J].reverse().find((ve) => !ve.disabled && ve.element)) == null ? void 0 : V.element) || null;
							break;
						default:
							Q.current = L;
					}
					return Q;
				}),
				() => {
					se = !0;
				}
			);
		}, [n, O, C, J, L]);
		const X = w ? !1 : i,
			M = !!o,
			$ = !!D || !!m.initialFocus || !!X,
			B = tn(n.combobox || n, "contentElement"),
			P = tn(_?.combobox || _, "contentElement"),
			ce = (0, b.useMemo)(() => {
				if (!P || !B) return;
				const se = B.getAttribute("role"),
					te = P.getAttribute("role");
				if (!((te === "menu" || te === "menubar") && se === "menu")) return P;
			}, [B, P]);
		return (
			ce !== void 0 && (m = { preserveTabOrderAnchor: ce, ...m }),
			(m = bS({
				store: n,
				alwaysVisible: h,
				initialFocus: D,
				autoFocusOnShow: M ? $ && o : O || !!X,
				...m,
				hideOnEscape(se) {
					return _c(l, se) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(se) {
					const te = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(se) : (f ?? (w ? !0 : x ? (te ? !oa(te) : !0) : !1)))
						? se.defaultPrevented || !w || !te || (wM(te, "mouseout", se), !oa(te))
							? !0
							: (requestAnimationFrame(() => {
									oa(te) || n?.hide();
								}),
								!1)
						: !1;
				},
				modal: X,
				portal: u,
				backdrop: w ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": R, ...m }),
			m
		);
	}),
	Bz = pl(
		Ye(function (n) {
			return Je(Uz, $z(n));
		}),
		Uc,
	),
	Vz = "a",
	_S = et(function ({ store: n, showOnHover: i = !0, ...u }) {
		const l = jm();
		((n = n || l), Ht(n, !1));
		const o = ll(u),
			f = (0, b.useRef)(0);
		((0, b.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, b.useEffect)(
				() =>
					Sn(
						"mouseleave",
						(R) => {
							if (!n) return;
							const { anchorElement: I } = n.getState();
							I && R.target === I && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[n],
			));
		const h = u.onMouseMove,
			m = Mt(i),
			v = cm(),
			g = De((x) => {
				if ((h?.(x), o || !n || x.defaultPrevented || f.current || !v() || !m(x))) return;
				const R = x.currentTarget;
				(n.setAnchorElement(R), n.setDisclosureElement(R));
				const { showTimeout: I, timeout: D } = n.getState(),
					q = () => {
						((f.current = 0),
							v() &&
								(n?.setAnchorElement(R),
								n?.show(),
								queueMicrotask(() => {
									n?.setDisclosureElement(R);
								})));
					},
					O = I ?? D;
				O === 0 ? q() : (f.current = window.setTimeout(q, O));
			}),
			_ = u.onClick,
			p = De((x) => {
				(_?.(x), n && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			w = (0, b.useCallback)(
				(x) => {
					if (!n) return;
					const { anchorElement: R } = n.getState();
					R?.isConnected || n.setAnchorElement(x);
				},
				[n],
			);
		return ((u = { ...u, ref: Qt(w, u.ref), onMouseMove: g, onClick: p }), (u = dl(u)), u);
	}),
	wj = Ye(function (n) {
		return Je(Vz, _S(n));
	}),
	Zz = "button",
	SS = et(function ({ store: n, ...i }) {
		const u = Cc();
		((n = n || u), Ht(n, !1));
		const l = i.onClick,
			o = De((f) => {
				(n?.setAnchorElement(f.currentTarget), l?.(f));
			});
		return (
			(i = wn(i, (f) => (0, S.jsx)(kc, { value: n, children: f }), [n])),
			(i = { ...i, onClick: o }),
			(i = ym({ store: n, ...i })),
			(i = x_({ store: n, ...i })),
			i
		);
	}),
	Ej = Ye(function (n) {
		return Je(Zz, SS(n));
	}),
	Hz = "button";
function Qz(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function Qp(e, n) {
	return !!e?.some((i) => (!i.element || i.element === n ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var Pz = et(function ({ store: n, focusable: i, accessibleWhenDisabled: u, showOnHover: l, ...o }) {
		const f = Uc();
		((n = n || f), Ht(n, !1));
		const h = (0, b.useRef)(null),
			m = n.parent,
			v = n.menubar,
			g = !!m,
			_ = !!v && !g,
			p = ll(o),
			w = () => {
				const X = h.current;
				X && (n?.setDisclosureElement(X), n?.setAnchorElement(X), n?.show());
			},
			x = o.onFocus,
			R = De((X) => {
				if ((x?.(X), p || X.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: M } = v.getState();
				Qp(M, X.currentTarget) && w();
			}),
			I = tn(n, (X) => X.placement.split("-")[0]),
			D = o.onKeyDown,
			q = De((X) => {
				if ((D?.(X), p || X.defaultPrevented)) return;
				const M = Qz(X, I);
				M && (X.preventDefault(), w(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(M));
			}),
			O = o.onClick,
			C = De((X) => {
				if ((O?.(X), X.defaultPrevented || !n)) return;
				const M = !X.detail,
					{ open: $ } = n.getState();
				((!$ || M) && ((!g || M) && n.setAutoFocusOnShow(!0), n.setInitialFocus(M ? "first" : "container")), g && w());
			});
		((o = wn(o, (X) => (0, S.jsx)(gS, { value: n, children: X }), [n])),
			g && (o = { ...o, render: (0, S.jsx)(cc.div, { render: o.render }) }));
		const L = Mi(o.id),
			J = tn(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: L,
				role: g || _ ? t_(J, "menuitem") : void 0,
				"aria-haspopup": bc(n.useState("contentElement"), "menu"),
				...o,
				ref: Qt(h, o.ref),
				onFocus: R,
				onKeyDown: q,
				onClick: C,
			}),
			(o = _S({
				store: n,
				focusable: i,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (X) => {
					if (
						!(() => {
							if (typeof l == "function") return l(X);
							if (l != null) return l;
							if (g) return !0;
							if (!v) return !1;
							const { items: B } = v.getState();
							return _ && Qp(B);
						})()
					)
						return !1;
					const $ = _ ? v : m;
					return ($ && $.setActiveId(X.currentTarget.id), !0);
				},
			})),
			(o = SS({ store: n, toggleOnClick: !g, focusable: i, accessibleWhenDisabled: u, ...o })),
			(o = qm({ store: n, typeahead: _, ...o })),
			o
		);
	}),
	Kz = Ye(function (n) {
		return Je(Hz, Pz(n));
	}),
	Yz = "div";
function Gz(e, n, i) {
	var u;
	if (!e) return !1;
	if (oa(e)) return !0;
	const l = n?.find((h) => {
			var m;
			return h.element === i ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = l?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = At(e).getElementById(o);
	return f ? (oa(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var Fz = et(function ({
		store: n,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: l,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = Rz(!0),
			m = xz();
		((n = n || h || m), Ht(n, !1));
		const v = f.onClick,
			g = Mt(i),
			_ = "hideAll" in n ? n.hideAll : void 0,
			p = !!_,
			w = De((x) => {
				(v?.(x),
					!x.defaultPrevented &&
						(o_(x) || l_(x) || (_ && x.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(x) && _())));
			});
		return (
			(f = {
				role: t_(
					tn(n, (x) => ("contentElement" in x ? x.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: w,
			}),
			(f = Em({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = wm({
				store: n,
				...f,
				focusOnHover(x) {
					const R = () => (typeof l == "function" ? l(x) : (l ?? !0));
					if (!n || !R()) return !1;
					const { baseElement: I, items: D } = n.getState();
					return p
						? (x.currentTarget.hasAttribute("aria-expanded") && x.currentTarget.focus(), !0)
						: Gz(I, D, x.currentTarget)
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
	Xz = wc(
		Ye(function (n) {
			return Je(Yz, Fz(n));
		}),
	);
function Jz(e = {}) {
	var n;
	const i = (n = e.store) == null ? void 0 : n.getState(),
		u = eS({ ...e, placement: je(e.placement, i?.placement, "bottom") }),
		l = je(e.timeout, i?.timeout, 500),
		o = Or(
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
function Wz(e, n, i) {
	return (Zt(e, i, "timeout"), Zt(e, i, "showTimeout"), Zt(e, i, "hideTimeout"), tS(e, n, i));
}
function eD({ combobox: e, parent: n, menubar: i, ...u } = {}) {
	const l = !!i && !n,
		o = Nc(
			u.store,
			S_(n, ["values"]),
			_m(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = iS({ ...u, store: o, orientation: je(u.orientation, f.orientation, "vertical") }),
		m = Jz({
			...u,
			store: o,
			placement: je(u.placement, f.placement, "bottom-start"),
			timeout: je(u.timeout, f.timeout, l ? 0 : 150),
			hideTimeout: je(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Or(
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
		Dn(v, () =>
			Cn(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		Dn(v, () =>
			Cn(n, ["orientation"], (g) => {
				v.setState("placement", g.orientation === "vertical" ? "right-start" : "bottom-start");
			}),
		),
		{
			...h,
			...m,
			...v,
			combobox: e,
			parent: n,
			menubar: i,
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
							const w = p[g],
								x = r_(_, w);
							return x === w ? p : { ...p, [g]: x !== void 0 && x };
						}));
			},
		}
	);
}
function tD(e, n, i) {
	return (
		Fu(n, [i.combobox, i.parent, i.menubar]),
		Zt(e, i, "values", "setValues"),
		Object.assign(Wz(aS(e, n, i), n, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function nD(e = {}) {
	const n = vS(),
		i = Tz(),
		u = Mc();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [l, o] = Oc(eD, e);
	return tD(l, o, e);
}
function rD(e = {}) {
	return (0, S.jsx)(gS, { value: nD(e), children: e.children });
}
var iD = "hr",
	aD = et(function ({ store: n, ...i }) {
		const u = vS();
		return ((n = n || u), (i = sS({ store: n, ...i })), i);
	}),
	uD = Ye(function (n) {
		return Je(iD, aD(n));
	}),
	sD = (0, b.memo)(function (n) {
		const { channelName: i, items: u } = n;
		return (0, S.jsxs)(rD, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(Kz, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, S.jsx)(Jk, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(Bz, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: u.map((l) =>
						"separator" in l
							? (0, S.jsx)(uD, { className: "ChannelRowMenu-separator" }, l.id)
							: (0, S.jsx)(
									Xz,
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
	lD = 300 * 1e3;
function oD(e) {
	const n = (0, b.useRef)(new Map()),
		i = (0, b.useRef)(new Map()),
		u = (0, b.useRef)(new Map()),
		[, l] = (0, b.useState)(0),
		o = (0, b.useCallback)((h) => (n.current.has(h) ? n.current.get(h) : void 0), []),
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
					(w === void 0 || m - w >= lD) && v.push(_);
				}
				for (let _ = 0; _ < v.length; _ += 50) {
					const p = v.slice(_, _ + 50),
						w = e.convex
							.query(e.api.plugins_data.resolve_member_display, { userIds: p })
							.then((x) => {
								const R = new Map(Object.entries(x?.members ?? {}));
								for (const I of p) (n.current.set(I, R.get(I) ?? null), i.current.set(I, Date.now()));
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
function cD(e) {
	const [n, i] = (0, b.useState)(null);
	return (
		(0, b.useEffect)(() => {
			let u = !1;
			return (
				Xb(e, { limit: 100 }).then((l) => {
					if (!u) {
						if ("_nay" in l) {
							i({ members: [], error: Fb(l._nay.name), truncated: !1 });
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
		n
	);
}
function wS(e) {
	const n = cD(e.client);
	if (n === null) return (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (n.error !== null) return (0, S.jsx)("p", { className: "form-error", role: "alert", children: n.error });
	const i = n.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, l) => Ko(u.displayName).localeCompare(Ko(l.displayName)));
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
											Ko(u.displayName),
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
function Pp(e) {
	const n = (0, b.useId)(),
		i = (0, b.useId)(),
		u = (0, b.useId)(),
		l = (0, b.useId)(),
		[o, f] = (0, b.useState)(e.initialName),
		[h, m] = (0, b.useState)(e.initialTopic),
		[v, g] = (0, b.useState)(!1),
		[_, p] = (0, b.useState)([]),
		[w, x] = (0, b.useState)(null),
		R = e.busy || e.fieldsLocked,
		I = () => {
			if (e.busy || e.waiting) return;
			const O = o.trim();
			if (O.length < 1 || O.length > 64) {
				x("Enter a name between 1 and 64 characters.");
				return;
			}
			const C = h.trim();
			if (C.length > 250) {
				x("Keep the topic under 250 characters.");
				return;
			}
			(x(null), e.onSubmit(O, C, { isPrivate: v, userIds: _ }));
		},
		D = w ?? e.error,
		q = () => {
			e.busy || e.onClose();
		};
	return (0, S.jsxs)(Wu, {
		labelledBy: n,
		onClose: q,
		children: [
			(0, S.jsx)("h2", { id: n, className: "dialog-title", children: e.title }),
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
						onInput: (O) => f(O.currentTarget.value),
						onKeyDown: (O) => {
							O.key === "Enter" && (O.preventDefault(), I());
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
						onInput: (O) => m(O.currentTarget.value),
						onKeyDown: (O) => {
							O.key === "Enter" && (O.preventDefault(), I());
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
										onChange: (O) => g(O.currentTarget.checked),
									}),
									"Private channel",
								],
							}),
							v
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("p", { className: "field-note", children: nm }),
											(0, S.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, S.jsx)(wS, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: _,
												disabled: R,
												onToggle: (O, C) => p((L) => (C ? [...L, O] : L.filter((J) => J !== O))),
											}),
										],
									})
								: null,
						],
					})
				: null,
			D !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: D }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.busy,
						onClick: q,
						children: "Cancel",
					}),
					(0, S.jsx)("button", {
						type: "button",
						className: "button button-primary",
						disabled: e.busy || e.waiting,
						onClick: I,
						children: e.busy ? "Saving…" : e.waiting ? "Checking…" : e.fieldsLocked ? "Retry" : e.submitLabel,
					}),
				],
			}),
		],
	});
}
function fD(e) {
	const n = (0, b.useId)(),
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
				.then((L) => {
					if (!w.current || x.current !== C) return { kind: "cancelled" };
					const J = Xs(L);
					return (
						o(!0),
						J === null
							? (u(void 0), h("The people list response was invalid."), { kind: "unavailable" })
							: (u(J._yay),
								J._yay !== null && e.memberNames.resolve(J._yay.map((X) => X.userId)),
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
	const I = (C) => {
			p.current ||
				((p.current = !0),
				v(!0),
				_(null),
				e.client.convex
					.mutation(e.client.api.plugins_data.user_manage_scope, { action: C })
					.then((L) => {
						if (L._nay) {
							_(L._nay.message);
							return;
						}
						return R().then(() => {});
					})
					.catch(() =>
						R().then((L) => {
							L.kind !== "cancelled" &&
								_(
									L.kind === "unavailable"
										? "We could not confirm the change, and the current people list could not be loaded."
										: L.principals === null
											? "We could not confirm the change, and this people list is no longer readable."
											: "We could not confirm the change. The current people list is shown.",
								);
						}),
					)
					.finally(() => {
						((p.current = !1), v(!1));
					}));
		},
		D = new Set((i ?? []).map((C) => C.userId)),
		q = (i ?? []).some((C) => C.userId === e.selfUserId && C.level === "manage"),
		O = () => {
			m || e.onClose();
		};
	return (0, S.jsxs)(Wu, {
		labelledBy: n,
		onClose: O,
		children: [
			(0, S.jsxs)("h2", { id: n, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, S.jsx)("p", { className: "field-note", children: nm }),
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
													q && C.userId !== e.selfUserId
														? (0, S.jsx)("button", {
																type: "button",
																className: "button channel-item-action",
																disabled: m,
																onClick: () =>
																	I({ kind: "remove_principal", scopeId: e.channel.key, userId: C.userId }),
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
			l && i !== void 0 && i !== null && q
				? (0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, S.jsx)(wS, {
								client: e.client,
								selfUserId: e.selfUserId,
								selected: [...D],
								disabled: m,
								onToggle: (C, L) =>
									I(
										L
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
						onClick: O,
						children: "Close",
					}),
				],
			}),
		],
	});
}
function dD(e) {
	const n = (0, b.useId)(),
		i = () => {
			e.busy || e.onClose();
		};
	return (0, S.jsxs)(Wu, {
		labelledBy: n,
		onClose: i,
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
function hD(e) {
	const n = (0, b.useId)(),
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
					const w = Xs(p);
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
	return (0, S.jsxs)(Wu, {
		labelledBy: n,
		onClose: v,
		children: [
			(0, S.jsx)("h2", {
				id: n,
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
var mD = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Im(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function Lm(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function vD(e) {
	const n = [];
	for (const l of e.channels) {
		if (hn(l.key)) {
			const f = e.privateActivity.get(l.key),
				h = e.privateCursors.get(l.key)?.activity ?? pr;
			f !== void 0 && !Ks(h, f.activity) && n.push({ channel: l, at: f.at, mentionCount: 0, preview: null });
			continue;
		}
		const o = e.publicUnreads.get(l.key);
		o !== void 0 && n.push({ channel: l, at: o.latest.timestamp, mentionCount: o.mentionCount, preview: o.latest });
	}
	n.sort((l, o) => o.at - l.at);
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
			n.length === 0
				? (0, S.jsx)("div", { className: "channel-status", children: "You are all caught up." })
				: (0, S.jsx)("ul", {
						className: "view-rows",
						children: n.map((l) =>
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
											(0, S.jsx)("span", { className: "view-row-time", children: pc(l.at, u) }),
											l.preview !== null
												? (0, S.jsx)("span", {
														className: "view-row-preview",
														children: `${Im(i.get(l.preview.createdBy))}: ${Lm(l.preview.value.text)}`,
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
function gD(e) {
	const n = new Map(e.channels.map((o) => [o.key, o])),
		i = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = rm(o.key),
			h = f === null ? void 0 : n.get(f);
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
															(0, S.jsx)("span", { className: "view-row-title", children: Im(u.get(h.createdBy)) }),
															(0, S.jsx)("span", { className: "view-row-time", children: pc(h.timestamp, l) }),
															(0, S.jsx)("span", { className: "view-row-preview", children: Lm(h.value.text) }),
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
function yD(e) {
	const n = Va(e.client.api.plugins_data.watch_recent, { collection: "replies", limit: 100, order: "desc" }),
		i = (0, b.useMemo)(() => (n == null ? [] : Yo(sc).apply_window(n.docs)), [n]),
		u = n !== void 0,
		l = n === null,
		o = new Map(e.channels.map((v) => [v.key, v])),
		f = new Map();
	for (const v of i) {
		if (v.value.deletedAt !== null) continue;
		const g = nl(v.key),
			_ = g === null ? null : rm(g),
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
												(0, S.jsx)("span", { className: "view-row-time", children: pc(g.newest.timestamp, m) }),
												(0, S.jsx)("span", {
													className: "view-row-preview",
													children: `${g.count} ${g.count === 1 ? "reply" : "replies"} · ${Im(h.get(g.newest.createdBy))}: ${Lm(g.newest.value.text)}`,
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
function pD(e) {
	return Date.now() >= e.session.expiresAt()
		? "This Chitchat session expired. Reload the page to continue."
		: "Chitchat can no longer read its data. Reload the page to try again.";
}
var bD = class extends b.Component {
		state = { failed: !1 };
		static getDerivedStateFromError() {
			return { failed: !0 };
		}
		componentDidCatch(e, n) {
			console.error("[chitchat] A live read failed", { message: e.message, componentStack: n.componentStack });
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
	Kp = 8,
	_D = 2e3,
	sa = 250,
	Yp = 4e3,
	SD = 250,
	wD = 4e3,
	ED =
		"Chitchat cannot confirm whether this private channel was created because no channel is readable at its saved key. Retry checks the same key, or Cancel.",
	TD = "This private channel exists, but you are not in its current access list. Retry checks the same key, or Cancel.",
	Gp = 250,
	Fp = 4e3,
	gh = "Wait for pending message changes to finish before leaving this channel or thread.";
function xD(e) {
	return (
		hk(e.scopeId) &&
		e.keyPrefix === e.scopeId &&
		e.collections.length === kh.length &&
		kh.every((n) => e.collections.includes(n)) &&
		Number.isSafeInteger(e.membershipRevision) &&
		e.membershipRevision >= 0 &&
		e.appendActivity.every(
			(n) =>
				Number.isSafeInteger(n.at) &&
				n.at >= 0 &&
				Number.isSafeInteger(n.sequence) &&
				n.sequence >= 0 &&
				n.createdByUserId !== "",
		)
	);
}
function AD(e) {
	return (
		Array.isArray(e) &&
		e.every(
			(n) =>
				typeof n == "object" &&
				n !== null &&
				"userId" in n &&
				typeof n.userId == "string" &&
				n.userId !== "" &&
				"level" in n &&
				(n.level === "member" || n.level === "manage"),
		)
	);
}
function Xs(e) {
	return e === null || AD(e) ? { _yay: e } : null;
}
var pr = { messages: 0, replies: 0 };
function Si(e, n) {
	return { messages: Math.max(e.messages, n.messages), replies: Math.max(e.replies, n.replies) };
}
function Ks(e, n) {
	return e.messages >= n.messages && e.replies >= n.replies;
}
function RD(e) {
	let n = 0,
		i = pr;
	for (const u of e.appendActivity)
		u.collection === "messages"
			? ((n = Math.max(n, u.at)), (i = Si(i, { messages: u.sequence, replies: 0 })))
			: u.collection === "replies" && ((n = Math.max(n, u.at)), (i = Si(i, { messages: 0, replies: u.sequence })));
	return { at: n, activity: i };
}
function Xp(e) {
	((e.cancelled = !0), e.retryTimer !== null && clearTimeout(e.retryTimer));
}
function Jp(e, n) {
	return n.revision <= e.revision
		? !1
		: ((e.revision = n.revision),
			(e.storedAt = Math.max(e.storedAt, n.at)),
			(e.storedActivity = Si(e.storedActivity, n.activity)),
			(e.waitingForRefresh = !1),
			!0);
}
function Qo(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function yh(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function ph(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function CD(e) {
	const { client: n } = e,
		i = n.context.userId,
		u = oD(n),
		l = Va(n.api.plugins_data.watch_documents, { collection: "channels", limit: 100 }),
		o = (0, b.useMemo)(() => (l == null ? [] : Yo(Hs).apply_window(l.docs.filter((E) => !hn(E.key)))), [l]),
		f = l !== void 0,
		h = l != null && l.truncated,
		[m, v] = (0, b.useState)([]),
		[g, _] = (0, b.useState)({}),
		[p, w] = (0, b.useState)(null),
		x = Va(n.api.plugins_data.watch_recent, { collection: "messages", limit: 100, order: "desc" }),
		R = (0, b.useMemo)(() => (x == null ? [] : Yo(sc).apply_window(x.docs)), [x]),
		I = x === null,
		[D, q] = (0, b.useState)({}),
		[O, C] = (0, b.useState)(0),
		[L, J] = (0, b.useState)(null),
		[X, M] = (0, b.useState)({}),
		[$, B] = (0, b.useState)(null),
		[P, ce] = (0, b.useState)(null),
		[se, te] = (0, b.useState)(!1),
		[ne, N] = (0, b.useState)(null),
		[V, Q] = (0, b.useState)(!1),
		[ve, pe] = (0, b.useState)(!1),
		[$e, k] = (0, b.useState)(!1),
		[j, le] = (0, b.useState)(!1),
		[de, he] = (0, b.useState)(!1),
		[Se, ye] = (0, b.useState)(null),
		[Ne, Ue] = (0, b.useState)(!1),
		[Ze, st] = (0, b.useState)({ sequence: 0, text: "" }),
		[kn, mn] = (0, b.useState)(""),
		[lt, be] = (0, b.useState)(!1),
		Re = (0, b.useRef)(null),
		He = (0, b.useRef)(null),
		Oe = (0, b.useRef)(null),
		$t = (0, b.useRef)(null),
		ft = (0, b.useRef)(null),
		fe = (0, b.useRef)(null),
		ke = (0, b.useRef)(null),
		St = (0, b.useRef)(new Set());
	St.current = new Set(o.map((E) => E.key));
	const ze = (0, b.useRef)(null),
		dt = (0, b.useRef)(null),
		Rt = (0, b.useRef)(null),
		ut = (0, b.useRef)(null),
		Ot = (0, b.useRef)(new Map()),
		on = (0, b.useRef)(new Map()),
		an = (0, b.useRef)(new Map()),
		Gn = (0, b.useRef)(new Set()),
		Et = (0, b.useRef)(new Map()),
		vn = (0, b.useRef)(new Map()),
		bt = (0, b.useRef)(new Map()),
		En = (0, b.useRef)(new Set()),
		It = (0, b.useRef)(new Map()),
		Fn = (0, b.useRef)(new Map()),
		cn = (0, b.useRef)(new Map()),
		ur = (0, b.useRef)(new Map()),
		Tn = (0, b.useRef)(new Map()),
		Pt = (0, b.useRef)(new Set()),
		sr = (0, b.useRef)(new Map()),
		qn = (0, b.useRef)(0),
		zt = (0, b.useRef)(!0),
		ht = (0, b.useRef)(new Map()),
		wr = (0, b.useRef)(new Set()),
		fn = (0, b.useRef)(new Map()),
		Kt = (0, b.useRef)(new Map()),
		zr = (0, b.useRef)(null),
		[Er, Tr] = (0, b.useState)(!1),
		Oi = (0, b.useCallback)(
			(E, A) => {
				const H = ke.current;
				if (H !== null && H.revision > E) return;
				const Y = Date.now(),
					oe = {
						key: Xd(i),
						value: A,
						revision: E,
						createdBy: i,
						updatedBy: i,
						createdAt: H?.createdAt ?? Y,
						updatedAt: Y,
						ownership: "owned",
						timestamp: H?.timestamp ?? Y,
					};
				((ke.current = oe), w(oe));
			},
			[i],
		),
		zi = (0, b.useCallback)(
			function E() {
				const A = ut.current,
					H = ke.current,
					Y = H?.revision ?? 0;
				if (
					!zt.current ||
					A === null ||
					A.running ||
					A.retryTimer !== null ||
					(Y === A.attemptedRevision && !A.retryCurrentRevision)
				)
					return;
				if (A.waitBeforeRetry) {
					const Ce = A.retryDelayMs;
					((A.waitBeforeRetry = !1),
						(A.retryTimer = setTimeout(() => {
							((A.retryTimer = null), (A.retryDelayMs = Math.min(Ce * 2, Yp)), E());
						}, Ce)));
					return;
				}
				const oe = { channels: A.channels };
				((A.channels = {}), (A.attemptedRevision = Y), (A.retryCurrentRevision = !1));
				const me = A.needsCompaction;
				A.needsCompaction = !1;
				const Ee = Nu(H?.value ?? { channels: {} }, oe),
					Me = me
						? { channels: Object.fromEntries(Object.entries(Ee.channels).filter(([Ce]) => St.current.has(Ce))) }
						: Ee;
				if (me && Object.keys(Me.channels).length === Object.keys(Ee.channels).length) {
					((A.channels = Nu({ channels: A.channels }, oe).channels),
						(A.needsCompaction = !0),
						console.warn("[chitchat] The read-cursor map is still too large after cleanup"));
					return;
				}
				((A.running = !0),
					n.convex
						.mutation(n.api.plugins_data.user_put_owned_document, {
							collection: "cursors",
							key: "me",
							value: Me,
							expectedRevision: Y,
						})
						.then((Ce) => {
							if (((A.running = !1), !(!zt.current || ut.current !== A))) {
								if (Ce._yay) ((A.retryDelayMs = sa), Oi(Ce._yay.revision, Me));
								else if (Ce._nay.name === "conflict")
									((A.channels = Nu({ channels: A.channels }, oe).channels),
										(A.needsCompaction ||= me),
										(A.retryCurrentRevision = A.waitBeforeRetry),
										(A.retryDelayMs = sa));
								else if (Ce._nay.name === "storage_full") {
									if (
										((A.channels = Nu({ channels: A.channels }, oe).channels),
										(A.needsCompaction = !0),
										(A.retryCurrentRevision = !0),
										(A.retryDelayMs = sa),
										me)
									) {
										console.warn("[chitchat] The compacted read-cursor retry was refused", {
											message: Ce._nay.message,
										});
										return;
									}
								} else console.warn("[chitchat] A read-cursor retry was refused", { message: Ce._nay.message });
								if (Object.keys(A.channels).length === 0) {
									ut.current = null;
									return;
								}
								E();
							}
						})
						.catch(() => {
							((A.running = !1),
								!(!zt.current || ut.current !== A) &&
									((A.channels = Nu({ channels: A.channels }, oe).channels),
									(A.needsCompaction ||= me),
									(A.retryCurrentRevision = !0),
									(A.waitBeforeRetry = !0),
									E()));
						}));
			},
			[Oi, n],
		),
		Yr = (E, A, H) => {
			if (!zt.current) return;
			const Y = ut.current ?? {
				channels: {},
				attemptedRevision: A,
				running: !1,
				needsCompaction: !1,
				retryCurrentRevision: !1,
				waitBeforeRetry: !1,
				retryDelayMs: sa,
				retryTimer: null,
			};
			((Y.channels = Nu({ channels: Y.channels }, E).channels),
				(Y.attemptedRevision = Math.max(Y.attemptedRevision, A)),
				H === "storage_full"
					? ((Y.needsCompaction = !0), (Y.retryCurrentRevision = !0))
					: H === "unavailable" && ((Y.retryCurrentRevision = !0), Y.retryTimer === null && (Y.waitBeforeRetry = !0)),
				(ut.current = Y),
				zi());
		},
		xr = (0, b.useCallback)(
			function E(A) {
				const H = () => A.storedAt >= A.pendingAt && Ks(A.storedActivity, A.pendingActivity),
					Y = (Ce) => {
						if (A.cancelled || !zt.current || !Pt.current.has(A.channelKey) || H() || A.retryTimer !== null) return;
						const We = A.retryDelayMs;
						A.retryTimer = setTimeout(() => {
							((A.retryTimer = null), (A.retryDelayMs = Math.min(We * 2, Yp)), Ce());
						}, We);
					},
					oe = () => {
						if (
							A.cancelled ||
							!zt.current ||
							!Pt.current.has(A.channelKey) ||
							!A.waitingForRefresh ||
							A.running ||
							A.retryTimer !== null
						)
							return;
						A.running = !0;
						const Ce = `${J0(A.channelKey)}:${i}`;
						n.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: Ce })
							.then((We) => {
								if (ht.current.get(A.channelKey) !== A || A.cancelled) return;
								if (((A.running = !1), !A.waitingForRefresh)) {
									E(A);
									return;
								}
								const Ct = We.status === 200 ? W0(We.body.document) : null;
								if (Ct !== null && Ct.key === Ce && Ct.channelKey === A.channelKey && Ct.createdBy === i && Jp(A, Ct)) {
									((A.retryDelayMs = sa), E(A));
									return;
								}
								Y(oe);
							})
							.catch(() => {
								if (!(ht.current.get(A.channelKey) !== A || A.cancelled)) {
									if (((A.running = !1), !A.waitingForRefresh)) {
										E(A);
										return;
									}
									Y(oe);
								}
							});
					};
				if (A.running || A.retryTimer !== null || A.cancelled || !Pt.current.has(A.channelKey)) return;
				if (A.waitingForRefresh) {
					oe();
					return;
				}
				if (H()) {
					ht.current.delete(A.channelKey);
					return;
				}
				const me = Math.max(A.pendingAt, A.storedAt),
					Ee = Si(A.pendingActivity, A.storedActivity),
					Me = A.revision;
				((A.running = !0),
					n.convex
						.mutation(n.api.plugins_data.user_put_owned_document, {
							collection: "channels",
							key: J0(A.channelKey),
							value: { at: me, activity: Ee },
							expectedRevision: Me,
						})
						.then((Ce) => {
							if (!(ht.current.get(A.channelKey) !== A || A.cancelled)) {
								if (((A.running = !1), Ce._yay)) {
									((A.retryDelayMs = sa),
										(A.revision = Math.max(A.revision, Ce._yay.revision)),
										(A.storedAt = Math.max(A.storedAt, me)),
										(A.storedActivity = Si(A.storedActivity, Ee)),
										E(A));
									return;
								}
								if (Ce._nay.name === "conflict") {
									if (A.revision !== Me) {
										E(A);
										return;
									}
									((A.waitingForRefresh = !0), oe());
									return;
								}
								(console.warn("[chitchat] A private read-cursor write was refused", { message: Ce._nay.message }),
									ht.current.delete(A.channelKey));
							}
						})
						.catch((Ce) => {
							ht.current.get(A.channelKey) !== A ||
								A.cancelled ||
								((A.running = !1),
								console.warn("[chitchat] A private read-cursor write failed", { message: zn(Ce) }),
								Y(() => E(A)));
						}));
			},
			[n, i],
		),
		Xn = (0, b.useMemo)(() => new Set(m.map((E) => E.scopeId)), [m]),
		Gr = (0, b.useMemo)(
			() => m.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: E.collections })),
			[
				JSON.stringify(
					m
						.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: [...E.collections].sort() }))
						.sort((E, A) => E.scopeId.localeCompare(A.scopeId)),
				),
			],
		),
		Mn = (0, b.useMemo)(() => [...Gr].sort((E, A) => E.scopeId.localeCompare(A.scopeId)).slice(0, Kp), [Gr]),
		mt = (0, b.useMemo)(() => {
			const E = [...Gr].sort((H, Y) => H.scopeId.localeCompare(Y.scopeId)),
				A = L !== null && hn(L) ? E.find((H) => H.scopeId === L) : void 0;
			return A === void 0 || Mn.some((H) => H.scopeId === A.scopeId)
				? Mn
				: [A, ...E.filter((H) => H.scopeId !== A.scopeId).slice(0, 7)].sort((H, Y) =>
						H.scopeId.localeCompare(Y.scopeId),
					);
		}, [Mn, Gr, L]),
		un = (0, b.useMemo)(() => new Set(mt.map((E) => E.scopeId)), [mt]),
		Yt = [...o, ...Object.entries(g).flatMap(([E, A]) => (Xn.has(E) && un.has(E) ? A : []))].sort((E, A) =>
			E.value.name.localeCompare(A.value.name),
		),
		In = new Map(
			Object.entries(D).flatMap(([E, A]) => (Xn.has(E) && un.has(E) ? A.map((H) => [H.channelKey, H]) : [])),
		),
		Fr = new Map(m.map((E) => [E.scopeId, RD(E)])),
		Di = (0, b.useMemo)(() => Nk({ docs: R, cursorChannels: p?.value.channels ?? {}, selfUserId: i }), [R, p, i]),
		Xr = (E) => {
			if (E.key === L || E.value.archivedAt !== null) return !1;
			if (hn(E.key)) {
				const A = Fr.get(E.key)?.activity ?? pr;
				return !Ks(In.get(E.key)?.activity ?? pr, A);
			}
			return Di.has(E.key);
		},
		ee = (E) => (hn(E.key) ? (In.get(E.key)?.at ?? 0) : (p?.value.channels[E.key] ?? 0)),
		ge = (E) => (E.key === L || E.value.archivedAt !== null ? 0 : (Di.get(E.key)?.mentionCount ?? 0)),
		qe = (0, b.useId)(),
		Ge = (0, b.useId)(),
		Qe = (0, b.useCallback)((E) => {
			st((A) => ({ sequence: A.sequence + 1, text: E }));
		}, []),
		Fe = (0, b.useCallback)((E) => {
			const A = (on.current.get(E) ?? 0) + 1;
			(on.current.set(E, A), M(Object.fromEntries(on.current)));
		}, []),
		rt = (0, b.useCallback)((E) => {
			const A = on.current.get(E) ?? 0;
			A !== 0 && (A === 1 ? on.current.delete(E) : on.current.set(E, A - 1), M(Object.fromEntries(on.current)));
		}, []),
		wt = (0, b.useCallback)(
			(E) => {
				if (!En.current.has(E.scopeId) || (Fn.current.get(E.scopeId) ?? -1) >= E.membershipRevision) return;
				const A = cn.current.get(E.scopeId);
				if (A !== void 0) {
					A.scope = E;
					return;
				}
				const H = { scope: E, running: !1, retryDelayMs: Gp, retryTimer: null, cancelled: !1 };
				cn.current.set(E.scopeId, H);
				const Y = () => zt.current && !H.cancelled && cn.current.get(E.scopeId) === H,
					oe = () => {
						(ph(H), cn.current.get(E.scopeId) === H && cn.current.delete(E.scopeId));
					},
					me = () => {
						const Me = H.scope;
						(oe(),
							En.current.delete(Me.scopeId),
							Fn.current.delete(Me.scopeId),
							fn.current.delete(Me.scopeId),
							Gn.current.delete(Me.scopeId),
							Et.current.delete(Me.scopeId),
							vn.current.delete(Me.scopeId));
						const Ce = new Set(Pt.current);
						(Ce.add(Me.scopeId),
							(Pt.current = Ce),
							ur.current.set(Me.scopeId, Me.membershipRevision),
							(qn.current += 1),
							v((We) => {
								const Ct = We.findIndex((Ui) => Ui.scopeId === Me.scopeId);
								if (Ct === -1) return [...We, Me];
								const qr = [...We];
								return ((qr[Ct] = Me), qr);
							}),
							C(qn.current));
					},
					Ee = () => {
						if (!Y() || H.running || H.retryTimer !== null) return;
						H.running = !0;
						const Me = H.scope.membershipRevision,
							Ce = () => {
								if (!Y() || H.retryTimer !== null) return;
								const Ct = H.retryDelayMs;
								H.retryTimer = setTimeout(() => {
									((H.retryTimer = null), (H.retryDelayMs = Math.min(Ct * 2, Fp)), Ee());
								}, Ct);
							},
							We = () => {
								if (((H.running = !1), H.scope.membershipRevision !== Me)) {
									Ee();
									return;
								}
								(Fn.current.set(E.scopeId, Me), oe());
							};
						Promise.resolve()
							.then(() => n.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: E.scopeId }))
							.then((Ct) => {
								if (!Y()) return;
								if (Ct.status !== 200) {
									((H.running = !1), Ce());
									return;
								}
								if (Ct.body.document === null) {
									We();
									return;
								}
								const qr = Hs(Ct.body.document);
								if (Ct.body.document.collection !== "channels" || qr === null || qr.key !== E.scopeId || !hn(qr.key)) {
									((H.running = !1), Ce());
									return;
								}
								return n.convex.query(n.api.plugins_data.watch_scope_principals, { scopeId: qr.key }).then((Ui) => {
									if (!Y()) return;
									H.running = !1;
									const _a = Xs(Ui);
									if (_a === null) {
										Ce();
										return;
									}
									const is = _a._yay;
									if (is === null) {
										We();
										return;
									}
									if (H.scope.membershipRevision !== Me) {
										Ee();
										return;
									}
									if (is.some((Rn) => Rn.userId === i)) {
										me();
										return;
									}
									(Fn.current.set(E.scopeId, Me), oe());
								});
							})
							.catch(() => {
								Y() && ((H.running = !1), Ce());
							});
					};
				Ee();
			},
			[n, i],
		);
	((0, b.useEffect)(() => {
		if (Ze.text === "") return;
		mn("");
		const E = requestAnimationFrame(() => mn(Ze.text));
		return () => cancelAnimationFrame(E);
	}, [Ze]),
		(0, b.useEffect)(() => {
			const E = (H) => {
					const Y = H.target;
					Y instanceof Node && !Re.current?.contains(Y) && (ft.current = null);
				},
				A = () => {
					ft.current = null;
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
			be(E.matches);
			const A = (H) => {
				const Y = ft.current;
				((fe.current = H.matches
					? P !== null && (Y === "sidebar" || Y === "separator")
						? "thread"
						: Y === "sidebar" && !Ne
							? "drawer"
							: null
					: Y === "drawer"
						? "selected"
						: null),
					be(H.matches));
			};
			return (E.addEventListener("change", A), () => E.removeEventListener("change", A));
		}, [Ne, P]),
		(0, b.useLayoutEffect)(() => {
			const E = fe.current;
			fe.current = null;
			const A = () => {
				const H = Re.current?.querySelector(".thread") ?? null;
				if (H === null) return !1;
				const Y = H?.querySelector(".thread-head button") ?? null;
				return (
					Y?.focus(),
					document.activeElement !== Y && H.focus(),
					document.activeElement === Y || document.activeElement === H
				);
			};
			if (E === "drawer") (P === null || !A()) && Oe.current?.focus();
			else if (E === "thread") A() || Oe.current?.focus();
			else if (E === "selected") {
				const H = He.current?.querySelector('[aria-current="page"]') ?? null;
				(H?.focus(), document.activeElement !== H && He.current?.focus());
			}
		}, [lt, P]));
	const Ln = Va(n.api.plugins_data.watch_my_scopes, {});
	(0, b.useEffect)(() => {
		if (Ln == null) return;
		const E = Ln.filter(xD);
		It.current = new Map(E.map((Y) => [Y.scopeId, Y]));
		for (const [Y, oe] of cn.current) It.current.has(Y) || (ph(oe), cn.current.delete(Y));
		const A = E.filter((Y) => (En.current.has(Y.scopeId) ? (wt(Y), !1) : !0)),
			H = new Set(A.map((Y) => Y.scopeId));
		for (const [Y, oe] of ht.current) H.has(Y) || (Xp(oe), ht.current.delete(Y));
		((ur.current = new Map(A.map((Y) => [Y.scopeId, Y.membershipRevision]))),
			(qn.current += 1),
			(Pt.current = H),
			v(A),
			C(qn.current));
	}, [Ln, wt]);
	const xn = ec(
		(0, b.useMemo)(
			() =>
				Object.fromEntries(
					mt.map((E) => [
						E.scopeId,
						{
							query: n.api.plugins_data.watch_documents,
							args: { collection: "channels", keyPrefix: E.keyPrefix, limit: 100 },
						},
					]),
				),
			[n, mt],
		),
	);
	(0, b.useEffect)(() => {
		for (const E of sr.current.keys()) mt.some((A) => A.scopeId === E) || sr.current.delete(E);
		for (const E of mt) {
			const A = xn[E.scopeId];
			if (A == null || A instanceof Error || sr.current.get(E.scopeId) === A) continue;
			sr.current.set(E.scopeId, A);
			const H = Yo(Hs).apply_window(A.docs.filter((oe) => oe.key === E.scopeId));
			_((oe) => ({ ...oe, [E.scopeId]: H }));
			const Y = A.docs.map(W0).filter((oe) => oe !== null && oe.channelKey === E.scopeId && oe.createdBy === i);
			for (const oe of Y) {
				const me = ht.current.get(oe.channelKey);
				me !== void 0 &&
					Jp(me, oe) &&
					(me.retryTimer !== null && (clearTimeout(me.retryTimer), (me.retryTimer = null)),
					(me.retryDelayMs = sa),
					xr(me));
			}
			q((oe) => ({ ...oe, [E.scopeId]: Y }));
		}
	}, [xn, mt, xr, i]);
	const Un = ec(
		(0, b.useMemo)(
			() => ({
				cursors: {
					query: n.api.plugins_data.watch_documents,
					args: { collection: "cursors", keyPrefix: Xd(i), limit: 1 },
				},
			}),
			[n, i],
		),
	).cursors;
	((0, b.useEffect)(() => {
		if (Un === void 0) return;
		const E = Xd(i),
			A =
				Un === null || Un instanceof Error
					? null
					: (Un.docs.map(Mk).find((H) => H !== null && H.key === E && H.createdBy === i && H.ownership === "owned") ??
						null);
		(w(A), (ke.current = A));
	}, [Un, i]),
		(0, b.useEffect)(() => {
			if (L === null) {
				const E = Yt.find((A) => A.value.archivedAt === null);
				E !== void 0 && J((A) => A ?? E.key);
			}
		}, [Yt, L]),
		(0, b.useEffect)(() => {
			let E = !1;
			for (const [A, H] of Kt.current) {
				const Y = Yt.find((oe) => oe.key === H.channelKey);
				if (Y === void 0) {
					(Kt.current.delete(A), (E = !0));
					continue;
				}
				Y.revision <= H.sourceRevision ||
					(Kt.current.delete(A), (Y.value.archivedAt !== null) === H.archived && (E = !0));
			}
			E && Tr(!0);
		}, [Yt]),
		(0, b.useEffect)(() => {
			Ne && He.current?.focus();
		}, [Ne]));
	const El = () => window.matchMedia("(max-width: 719px)").matches,
		Tl = (E, A) => {
			const H = ke.current,
				Y = H?.value.channels ?? {};
			if ((Y[E] ?? 0) >= A) return;
			const oe = { channels: { ...Y, [E]: A } },
				me = H?.revision ?? 0;
			n.convex
				.mutation(n.api.plugins_data.user_put_owned_document, {
					collection: "cursors",
					key: "me",
					value: oe,
					expectedRevision: me,
				})
				.then((Ee) => {
					if (Ee._yay) {
						Oi(Ee._yay.revision, oe);
						return;
					}
					if (Ee._nay.name === "conflict") {
						Yr(oe, me, "conflict");
						return;
					}
					if (Ee._nay.name === "storage_full") {
						Yr(oe, me, "storage_full");
						return;
					}
					console.warn("[chitchat] A read-cursor write was refused", { message: Ee._nay.message });
				})
				.catch((Ee) => {
					(console.warn("[chitchat] A read-cursor write failed", { message: zn(Ee) }), Yr(oe, me, "unavailable"));
				});
		},
		xl = (E, A, H) => {
			if (!Pt.current.has(E.key)) return;
			const Y = ht.current.get(E.key);
			if (Y !== void 0) {
				((Y.pendingAt = Math.max(Y.pendingAt, A)), (Y.pendingActivity = Si(Y.pendingActivity, H)), xr(Y));
				return;
			}
			const oe = In.get(E.key);
			if ((oe?.at ?? 0) >= A && Ks(oe?.activity ?? pr, H)) return;
			const me = {
				channelKey: E.key,
				pendingAt: A,
				pendingActivity: H,
				storedAt: oe?.at ?? 0,
				storedActivity: oe?.activity ?? pr,
				revision: oe?.revision ?? 0,
				running: !1,
				waitingForRefresh: !1,
				retryDelayMs: sa,
				retryTimer: null,
				cancelled: !1,
			};
			(ht.current.set(E.key, me), xr(me));
		},
		Al = (E, A, H) => {
			hn(E.key) ? xl(E, A, H ?? pr) : Tl(E.key, A);
		},
		ya = (E, A = !0) => {
			const H = Ot.current.get(E);
			if ((H !== void 0 && (clearTimeout(H), Ot.current.delete(E)), an.current.delete(E), A)) {
				const Y = ht.current.get(E);
				Y !== void 0 && ((Y.cancelled = !0), Y.retryTimer !== null && clearTimeout(Y.retryTimer), ht.current.delete(E));
			}
		},
		ji = (E, A, H) => {
			const Y = an.current.get(E.key);
			(an.current.set(E.key, {
				channel: E,
				at: Math.max(Y?.at ?? 0, A),
				activity: H === null ? null : Si(Y?.activity ?? pr, H),
			}),
				!Ot.current.has(E.key) &&
					Ot.current.set(
						E.key,
						setTimeout(() => {
							Ot.current.delete(E.key);
							const oe = an.current.get(E.key);
							(an.current.delete(E.key), oe !== void 0 && !Gn.current.has(E.key) && Al(oe.channel, oe.at, oe.activity));
						}, _D),
					));
		},
		Ar = (E, A) => {
			const H = hn(E.key) ? Fr.get(E.key) : void 0,
				Y = { channel: E, at: Math.max(A, H?.at ?? 0), activity: H?.activity ?? (hn(E.key) ? pr : null) };
			if (Gn.current.has(E.key)) {
				const oe = Et.current.get(E.key);
				Et.current.set(E.key, {
					channel: E,
					at: Math.max(oe?.at ?? 0, Y.at),
					activity: Y.activity === null ? null : Si(oe?.activity ?? pr, Y.activity),
				});
				return;
			}
			ji(E, Y.at, Y.activity);
		},
		sn = L === null ? void 0 : Fr.get(L),
		Wa = sn?.at ?? 0;
	((0, b.useEffect)(() => {
		if (L === null || sn === void 0 || !hn(L)) return;
		const E = Yt.find((H) => H.key === L),
			A = In.get(L);
		E !== void 0 && ((A?.at ?? 0) < Wa || !Ks(A?.activity ?? pr, sn.activity)) && ji(E, Wa, sn.activity);
	}, [L, Wa, sn?.activity.messages ?? 0, sn?.activity.replies ?? 0]),
		(0, b.useEffect)(() => {
			const E = wr.current;
			for (const A of Xn) fn.current.delete(A);
			for (const A of E) {
				if (Xn.has(A)) continue;
				const H = g[A]?.find((Y) => Y.key === A);
				(H !== void 0 && fn.current.set(A, H), ya(A));
			}
			wr.current = new Set(Xn);
		}, [Xn, g]),
		(0, b.useEffect)(() => {
			if (ne !== null) return;
			let E = !1;
			for (const [A, H] of fn.current) {
				const Y = vn.current.get(A);
				if (Y === "pending") continue;
				const oe = Y !== void 0;
				(Qe(
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
					L === A && (J(null), ce(null), B(null)),
					(L === A || oe) && (E = !0),
					Gn.current.delete(A),
					Et.current.delete(A),
					vn.current.delete(A),
					fn.current.delete(A));
			}
			E && Tr(!0);
		}, [Qe, ne, Xn, L]),
		(0, b.useLayoutEffect)(() => {
			if (!Er || ne !== null) return;
			const E = document.activeElement;
			if (E instanceof HTMLElement && E !== document.body && E.isConnected) {
				Tr(!1);
				return;
			}
			if (lt && !Ne) {
				if (P !== null) {
					const A = Re.current?.querySelector(".thread-head button") ?? null;
					if (A !== null && (A.focus(), document.activeElement === A)) {
						Tr(!1);
						return;
					}
				}
				(Tr(!1), Oe.current?.focus());
			} else (Tr(!1), He.current?.focus());
		}, [ne, Ne, lt, Er, P]),
		(0, b.useEffect)(() => {
			const E = zr.current;
			if (!(E === null || ne !== null)) {
				if (((zr.current = null), lt && !Ne)) {
					if (P !== null) {
						const A = Re.current?.querySelector(".thread-head button") ?? null;
						if (A !== null && (A.focus(), document.activeElement === A)) return;
					}
					Oe.current?.focus();
					return;
				}
				for (const A of Re.current?.querySelectorAll(".channel-item") ?? [])
					if (A.dataset.channelKey === E) {
						const H = A.querySelector(".ChannelRowMenu-trigger");
						if (H !== null && (H.focus(), document.activeElement === H)) return;
					}
				He.current?.focus();
			}
		}, [ne, Ne, lt, P]));
	const es = () => (L === null || (on.current.get(L) ?? 0) === 0 ? !1 : (Qe(gh), !0)),
		qi = (E) => {
			if ((E.key !== L || P !== null) && es()) return !1;
			if ((J(E.key), ce(null), Xr(E) || ge(E) > 0)) {
				B(ee(E));
				const A = Fr.get(E.key),
					H = Di.get(E.key)?.latest.timestamp ?? 0;
				Al(E, A?.at ?? H, A?.activity ?? null);
			} else B(null);
			return (Qe(`#${E.value.name}`), Ne && El() && (Ue(!1), Oe.current?.focus()), !0);
		},
		Rl = (E) => {
			(E.key !== L && es()) || (J(E.key), ce(null), Qe(E.name), Ne && El() && (Ue(!1), Oe.current?.focus()));
		},
		eu = (E, A) => {
			qi(E) && ce(A);
		},
		$c = () => {
			es() || N({ kind: "create" });
		};
	((0, b.useEffect)(() => {
		zi();
	}, [p, o, zi]),
		(0, b.useEffect)(
			() => (
				(zt.current = !0),
				() => {
					zt.current = !1;
					const E = ut.current;
					(E !== null && E.retryTimer !== null && clearTimeout(E.retryTimer), (ut.current = null));
					for (const H of Ot.current.values()) clearTimeout(H);
					(Ot.current.clear(), an.current.clear());
					for (const H of ht.current.values()) Xp(H);
					(ht.current.clear(), Gn.current.clear(), Et.current.clear(), vn.current.clear());
					for (const H of bt.current.values()) yh(H);
					bt.current.clear();
					for (const H of cn.current.values()) ph(H);
					(cn.current.clear(),
						En.current.clear(),
						Fn.current.clear(),
						It.current.clear(),
						ur.current.clear(),
						Tn.current.clear(),
						on.current.clear());
					const A = dt.current;
					A !== null && (Qo(A), (dt.current = null));
				}
			),
			[],
		));
	const gn = (E) => {
			const A = bt.current.get(E);
			(A !== void 0 && (yh(A), bt.current.delete(E)), Tn.current.delete(E), Gn.current.delete(E), vn.current.delete(E));
			const H = Et.current.get(E);
			(Et.current.delete(E), zt.current && H !== void 0 && Pt.current.has(E) && ji(H.channel, H.at, H.activity));
		},
		An = () => {
			(ne?.kind === "exit" && bt.current.has(ne.channel.key) && gn(ne.channel.key), (ze.current = null));
			const E = dt.current;
			(E !== null && Qo(E),
				(dt.current = null),
				k(!1),
				le(!1),
				(Rt.current = null),
				he(!1),
				pe(!1),
				N(null),
				Q(!1),
				ye(null));
		},
		ts = (E) => {
			(fn.current.delete(E), gn(E), (zr.current = E), An());
		},
		Ii = (E, A) => {
			const H = bt.current.get(E.key);
			(H !== void 0 && (yh(H), bt.current.delete(E.key)),
				Tn.current.delete(E.key),
				vn.current.set(E.key, A),
				fn.current.set(E.key, E));
			const Y = new Set(Pt.current);
			(Y.delete(E.key),
				(Pt.current = Y),
				ur.current.delete(E.key),
				v((oe) => oe.filter((me) => me.scopeId !== E.key)),
				An());
		},
		Jr = (E) => {
			const A = () => zt.current && !E.cancelled && bt.current.get(E.channel.key) === E,
				H = () => {
					(En.current.add(E.channel.key),
						Fn.current.delete(E.channel.key),
						Ii(E.channel, E.action === "leave" ? "left" : "delete_unconfirmed"));
					const oe = It.current.get(E.channel.key);
					oe !== void 0 && wt(oe);
				},
				Y = () => {
					if (!A() || E.retryTimer !== null) return;
					const oe = E.retryDelayMs;
					E.retryTimer = setTimeout(() => {
						((E.retryTimer = null), (E.retryDelayMs = Math.min(oe * 2, Fp)), Jr(E));
					}, oe);
				};
			!A() ||
				E.running ||
				E.retryTimer !== null ||
				((E.running = !0),
				Promise.resolve()
					.then(() => n.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: E.channel.key }))
					.then((oe) => {
						if (!A()) return;
						if (oe.status !== 200) {
							((E.running = !1), Y());
							return;
						}
						if (oe.body.document === null) {
							((E.running = !1), H());
							return;
						}
						const me = Hs(oe.body.document);
						if (oe.body.document.collection !== "channels" || me === null || me.key !== E.channel.key || !hn(me.key)) {
							((E.running = !1), Y());
							return;
						}
						return n.convex.query(n.api.plugins_data.watch_scope_principals, { scopeId: me.key }).then((Ee) => {
							if (!A()) return;
							E.running = !1;
							const Me = Xs(Ee);
							if (Me === null) {
								Y();
								return;
							}
							const Ce = Me._yay;
							if (Ce === null) {
								H();
								return;
							}
							if (!Ce.some((We) => We.userId === i)) {
								H();
								return;
							}
							(fn.current.delete(me.key), gn(me.key), pe(!1), Q(!1));
						});
					})
					.catch(() => {
						A() && ((E.running = !1), Y());
					}));
		},
		Cl = (E, A, H) => {
			if (Gn.current.has(E.key)) return;
			if ((on.current.get(E.key) ?? 0) > 0) {
				(Q(!1), ye(gh), Qe(gh));
				return;
			}
			const Y = an.current.get(E.key);
			if (Y !== void 0) {
				const Ee = Et.current.get(E.key);
				Et.current.set(E.key, {
					channel: Y.channel,
					at: Math.max(Ee?.at ?? 0, Y.at),
					activity: Y.activity === null ? null : Si(Ee?.activity ?? pr, Y.activity),
				});
			}
			(Gn.current.add(E.key), vn.current.set(E.key, "pending"), ya(E.key, !1), Q(!0), ye(null));
			const oe = n.convex.mutation(n.api.plugins_data.user_manage_scope, {
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
				me = (Ee) => {
					const Me = { channel: E, action: A, running: !1, retryDelayMs: Gp, retryTimer: null, cancelled: !1 };
					(bt.current.set(E.key, Me), Q(!1), pe(!0), ye(Ee), Jr(Me));
				};
			oe.then((Ee) => {
				if (zt.current) {
					if (Ee._nay) {
						(gn(E.key),
							Q(!1),
							ye(
								Ee._nay.name === "conflict"
									? "Who is in this channel changed. Close it and try again."
									: Ee._nay.message,
							));
						return;
					}
					if (A === "leave" && !Ee._yay.deleted) {
						const Me = ur.current.get(E.key);
						if (Me === void 0) {
							Ii(E, "left");
							return;
						}
						if (Me > Ee._yay.membershipRevision) {
							ts(E.key);
							return;
						}
						Tn.current.set(E.key, { channel: E, membershipRevision: Ee._yay.membershipRevision });
						return;
					}
					Ii(E, Ee._yay.deleted ? "deleted" : "left");
				}
			}).catch((Ee) => {
				zt.current && me(zn(Ee));
			});
		};
	(0, b.useEffect)(() => {
		for (const [E, A] of Tn.current) {
			const H = ur.current.get(E);
			if (H === void 0) {
				Ii(A.channel, "left");
				continue;
			}
			H > A.membershipRevision && ts(E);
		}
	}, [O]);
	const ns = (E) => {
		const A = () => zt.current && !E.cancelled && dt.current === E,
			H = () => {
				if (!A() || E.retryTimer !== null) return;
				const oe = E.retryDelayMs;
				E.retryTimer = setTimeout(() => {
					((E.retryTimer = null), (E.retryDelayMs = Math.min(oe * 2, wD)), ns(E));
				}, oe);
			},
			Y = (oe) => {
				(Qo(E), (dt.current = null), k(!0), le(!1), Q(!1), ye(oe));
			};
		!A() ||
			E.running ||
			E.retryTimer !== null ||
			((E.running = !0),
			Promise.resolve()
				.then(() => n.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: E.key }))
				.then((oe) => {
					if (!A()) return;
					if (oe.status !== 200) {
						((E.running = !1), H());
						return;
					}
					if (oe.body.document === null) {
						((E.running = !1), Y(ED));
						return;
					}
					const me = Hs(oe.body.document);
					if (oe.body.document.collection !== "channels" || me === null || me.key !== E.key || !hn(me.key)) {
						((E.running = !1), H());
						return;
					}
					return n.convex.query(n.api.plugins_data.watch_scope_principals, { scopeId: me.key }).then((Ee) => {
						if (!A()) return;
						E.running = !1;
						const Me = Xs(Ee);
						if (Me === null) {
							H();
							return;
						}
						const Ce = Me._yay;
						if (Ce === null || !Ce.some((We) => We.userId === i)) {
							Y(TD);
							return;
						}
						(Qo(E), (dt.current = null), J(E.key), B(null), An());
					});
				})
				.catch(() => {
					A() && ((E.running = !1), H());
				}));
	};
	(0, b.useEffect)(() => {
		const E = Rt.current;
		if (
			!de ||
			E === null ||
			ne === null ||
			(ne.kind !== "rename" && ne.kind !== "archive") ||
			ne.channel.key !== E.channelKey
		)
			return;
		const A = Yt.find((H) => H.key === E.channelKey);
		if (A === void 0) {
			An();
			return;
		}
		if (!(A.revision <= E.expectedRevision)) {
			if (
				E.sectionMoveRequestId === null
					? A.value.name === E.value.name && (A.value.topic ?? "") === (E.value.topic ?? "")
					: A.value.archivedAt !== null
			) {
				An();
				return;
			}
			((Rt.current = null),
				he(!1),
				Q(!1),
				N((H) =>
					H !== null && (H.kind === "rename" || H.kind === "archive") && H.channel.key === A.key
						? { ...H, channel: A }
						: H,
				),
				ye("Someone else changed this channel while the request was pending. Review it and try again."));
		}
	}, [de, Yt, ne]);
	const Li = (E, A, H) => {
			(Q(!0), ye(null));
			const Y = ze.current,
				oe = $e && Y !== null,
				me = oe
					? Y
					: {
							key: dk(H.isPrivate ? "private" : "public"),
							name: E,
							topic: A,
							isPrivate: H.isPrivate,
							userIds: [...H.userIds],
							clientRequestId: crypto.randomUUID(),
						};
			((ze.current = me),
				k(!1),
				le(!1),
				(async () => {
					const Ee = (We) => {
						(J(We), B(null), An());
					};
					if (!me.isPrivate) {
						const We = await Za(n, "channel-manage", {
							action: "create",
							name: me.name,
							topic: me.topic === "" ? null : me.topic,
							clientRequestId: me.clientRequestId,
						});
						if ("_nay" in We) {
							if (We._nay.name === "unavailable") {
								(k(!0), le(!1), Q(!1), ye(We._nay.message));
								return;
							}
							((ze.current = null), k(!1), Q(!1), ye(We._nay.message));
							return;
						}
						const Ct = We._yay.channelKey;
						if (typeof Ct != "string") {
							((ze.current = null), k(!1), Q(!1), ye("The Chitchat backend answered without a channel key"));
							return;
						}
						Ee(Ct);
						return;
					}
					const Me = { name: me.name, archivedAt: null, ...(me.topic === "" ? {} : { topic: me.topic }) },
						Ce = await n.convex.mutation(n.api.plugins_data.user_manage_scope, {
							action: {
								kind: "create_with_document",
								scopeId: me.key,
								collections: kh,
								keyPrefix: me.key,
								principals: me.userIds.map((We) => ({ userId: We, level: "member" })),
								document: { collection: "channels", key: me.key, value: Me },
							},
						});
					if (Ce._nay) {
						if (oe && Ce._nay.name === "conflict") {
							const We = { key: me.key, running: !1, retryDelayMs: SD, retryTimer: null, cancelled: !1 };
							((dt.current = We),
								k(!0),
								le(!0),
								Q(!1),
								ye("Checking whether this private channel was created."),
								ns(We));
							return;
						}
						((ze.current = null), k(!1), Q(!1), ye(Ce._nay.message));
						return;
					}
					Ee(me.key);
				})().catch((Ee) => {
					(k(!0), le(!1), Q(!1), ye(zn(Ee)));
				}));
		},
		kl = (E, A) => {
			const H = Rt.current,
				Y = de && H !== null,
				oe = (E.value.archivedAt !== null) != (A.archivedAt !== null),
				me = Y
					? H
					: { channelKey: E.key, value: A, expectedRevision: E.revision, sectionMoveRequestId: oe ? Symbol() : null };
			((Rt.current = me),
				he(!1),
				!Y &&
					me.sectionMoveRequestId !== null &&
					Kt.current.set(me.sectionMoveRequestId, {
						channelKey: me.channelKey,
						sourceRevision: me.expectedRevision,
						archived: me.value.archivedAt !== null,
					}),
				Q(!0),
				ye(null),
				Za(n, "channel-manage", {
					action: "update",
					channelKey: me.channelKey,
					name: me.value.name,
					topic: me.value.topic ?? null,
					archived: me.value.archivedAt !== null,
				})
					.then((Ee) => {
						if ("_nay" in Ee) {
							if (Ee._nay.name === "unavailable" || (Y && Ee._nay.name === "conflict")) {
								(he(!0), Q(!1), ye(Ee._nay.message));
								return;
							}
							((Rt.current = null),
								he(!1),
								me.sectionMoveRequestId !== null &&
									Ee._nay.name !== "conflict" &&
									Kt.current.delete(me.sectionMoveRequestId),
								Q(!1),
								ye(
									Ee._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: Ee._nay.message,
								));
							return;
						}
						An();
					})
					.catch((Ee) => {
						(he(!0), Q(!1), ye(zn(Ee)));
					}));
		},
		Ml = (E) => {
			const A = Symbol();
			(Kt.current.set(A, { channelKey: E.key, sourceRevision: E.revision, archived: !1 }),
				Za(n, "channel-manage", { action: "update", channelKey: E.key, archived: !1 })
					.then((H) => {
						"_nay" in H &&
							(H._nay.name !== "conflict" && H._nay.name !== "unavailable" && Kt.current.delete(A), Qe(H._nay.message));
					})
					.catch((H) => {
						Qe(zn(H));
					}));
		};
	if (l === null)
		return (0, S.jsx)("div", {
			className: "chitchat",
			children: (0, S.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, S.jsx)("h1", { children: "Chitchat" }), (0, S.jsx)("p", { children: pD(n) })],
			}),
		});
	const rs = (E, A) => E.value.name.localeCompare(A.value.name),
		Dr = Yt.filter((E) => E.value.archivedAt === null).sort(rs),
		Bc = Yt.filter((E) => E.value.archivedAt !== null).sort(rs),
		jr = Yt.find((E) => E.key === L) ?? null,
		Wr = jr !== null && (X[jr.key] ?? 0) > 0,
		lr = Dr.filter(Xr).length,
		pa = Dr.reduce((E, A) => E + ge(A), 0),
		ba = Math.max(0, m.length - mt.length),
		ei = (E, A, H) =>
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
									const oe = Xr(Y),
										me = ge(Y),
										Ee = m.find((Me) => Me.scopeId === Y.key);
									return (0, S.jsxs)(
										"li",
										{
											className: "channel-item",
											"data-channel-key": Y.key,
											children: [
												(0, S.jsxs)("button", {
													type: "button",
													className: oe || me > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": Y.key === L ? "page" : void 0,
													disabled: Wr && (Y.key !== L || P !== null),
													onClick: () => qi(Y),
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
																hn(Y.key) ? " (private)" : "",
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
															: oe
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
													children: (0, S.jsx)(sD, {
														channelName: Y.value.name,
														items: [
															...(hn(Y.key)
																? [
																		{
																			id: "people",
																			label: `People in #${Y.value.name}`,
																			onSelect: () => N({ kind: "people", channel: Y }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${Y.value.name}`,
																onSelect: () => N({ kind: "rename", channel: Y }),
															},
															Y.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${Y.value.name}`,
																		onSelect: () => N({ kind: "archive", channel: Y }),
																	}
																: { id: "unarchive", label: `Unarchive #${Y.value.name}`, onSelect: () => Ml(Y) },
															...(Ee
																? [
																		{ id: "private-exit-separator", separator: !0 },
																		{
																			id: "leave",
																			label: `Leave #${Y.value.name}`,
																			danger: !0,
																			onSelect: () => N({ kind: "exit", action: "leave", channel: Y }),
																		},
																		...(Ee.level === "manage"
																			? [
																					{
																						id: "delete",
																						label: `Delete #${Y.value.name} for everyone`,
																						danger: !0,
																						onSelect: () => N({ kind: "exit", action: "delete", channel: Y }),
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
		ref: Re,
		className: "chitchat",
		onFocusCapture: (E) => {
			const A = E.target;
			ft.current =
				A === Oe.current
					? "drawer"
					: He.current?.contains(A)
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
						ref: Oe,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": Ne,
						onClick: () => Ue((E) => !E),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: He,
				className: ["sidebar", Ne ? "is-open" : "", se ? "is-expanded" : ""].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: lt && !Ne ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									ref: $t,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": se,
									"aria-label": se ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => te((E) => !E),
									children: se ? "«" : "»",
								}),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: Wr,
									onClick: $c,
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
						ba > 0
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${Kp} private channels at a time; ${ba} more ${ba === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: mD.map((E) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												E.key === "view:unreads" && (lr > 0 || pa > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": L === E.key ? "page" : void 0,
											disabled: Wr,
											onClick: () => Rl(E),
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: E.name.slice(0, 1),
												}),
												(0, S.jsx)("span", { className: "channel-name", children: E.name }),
												E.key === "view:unreads" && pa > 0
													? (0, S.jsxs)("span", {
															className: "mention-badge",
															children: [
																pa,
																(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: E.key === "view:unreads" && lr > 0
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
							? Yt.length === 0
								? (0, S.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, S.jsxs)(S.Fragment, { children: [ei("Channels", Dr, qe), ei("Archived", Bc, Ge)] })
							: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, S.jsx)("main", {
				className: "main",
				children:
					L === "view:unreads"
						? (0, S.jsx)(vD, {
								channels: Dr,
								publicUnreads: Di,
								privateCursors: In,
								privateActivity: Fr,
								recentDead: I,
								memberNames: u,
								onSelectChannel: qi,
							})
						: L === "view:threads"
							? (0, S.jsx)(yD, { client: n, channels: Dr, memberNames: u, onOpenThread: eu })
							: L === "view:activity"
								? (0, S.jsx)(gD, {
										feed: R,
										channels: Dr,
										selfUserId: i,
										recentDead: I,
										memberNames: u,
										onSelectChannel: qi,
									})
								: jr !== null
									? (0, S.jsx)(
											Ez,
											{
												client: n,
												userId: i,
												channel: jr,
												memberNames: u,
												announce: Qe,
												threadRootKey: P,
												setThreadRootKey: ce,
												isNarrow: lt,
												onRequestStart: () => Fe(jr.key),
												onRequestSettled: () => rt(jr.key),
												sendInFlight: Wr,
												onNewestVisible: (E) => Ar(jr, E),
												openedAtLastReadAt: $,
											},
											jr.key,
										)
									: f
										? Yt.length === 0
											? (0, S.jsx)("div", {
													className: "channel-status",
													children: (0, S.jsx)("span", { children: "No channels yet — create the first one." }),
												})
											: (0, S.jsx)("div", { className: "channel-status", children: "Select a channel." })
										: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
			}),
			ne !== null && ne.kind === "create"
				? (0, S.jsx)(Pp, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: n, selfUserId: i },
						busy: V,
						waiting: j,
						fieldsLocked: $e,
						error: Se,
						onSubmit: Li,
						onClose: An,
					})
				: null,
			ne !== null && ne.kind === "people"
				? (0, S.jsx)(fD, { client: n, channel: ne.channel, selfUserId: i, memberNames: u, onClose: An })
				: null,
			ne !== null && ne.kind === "rename"
				? (0, S.jsx)(Pp, {
						title: `Rename #${ne.channel.value.name}`,
						submitLabel: "Rename",
						initialName: ne.channel.value.name,
						initialTopic: ne.channel.value.topic ?? "",
						privacy: null,
						busy: V,
						waiting: !1,
						fieldsLocked: de,
						error: Se,
						onSubmit: (E, A) =>
							kl(ne.channel, { ...ne.channel.value, name: E, ...(A === "" ? { topic: void 0 } : { topic: A }) }),
						onClose: An,
					})
				: null,
			ne !== null && ne.kind === "archive"
				? (0, S.jsx)(dD, {
						channelName: ne.channel.value.name,
						busy: V,
						retry: de,
						error: Se,
						onConfirm: () => kl(ne.channel, { ...ne.channel.value, archivedAt: Date.now() }),
						onClose: An,
					})
				: null,
			ne !== null && ne.kind === "exit"
				? (0, S.jsx)(hD, {
						client: n,
						channel: ne.channel,
						action: ne.action,
						busy: V,
						waiting: ve,
						error: Se,
						onConfirm: (E) => Cl(ne.channel, ne.action, E),
						onClose: An,
					})
				: null,
			(0, S.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, S.jsx)("span", { "data-announcement-sequence": String(Ze.sequence) }), kn],
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
var Ph = (0, lk.createRoot)(TS);
Ph.render((0, S.jsx)(ES, { message: "Connecting…" }));
yT().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			Ph.render(
				(0, S.jsx)(XE, {
					client: e.convex,
					children: (0, S.jsx)(bD, { client: e, children: (0, S.jsx)(CD, { client: e }) }),
				}),
			));
	},
	(e) => {
		Ph.render((0, S.jsx)(ES, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
