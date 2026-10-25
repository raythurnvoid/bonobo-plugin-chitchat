var Qx = Object.create,
	Cw = Object.defineProperty,
	Yx = Object.getOwnPropertyDescriptor,
	Kx = Object.getOwnPropertyNames,
	Gx = Object.getPrototypeOf,
	Tw = Object.prototype.hasOwnProperty,
	sr = (e, n) => () => (n || (e((n = { exports: {} }).exports, n, n.exports), (e = null)), n.exports),
	Xx = (e, n, i, o) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var u = Kx(n), l = 0, f = u.length, h; l < f; l++)
				((h = u[l]),
					!Tw.call(e, h) &&
						h !== i &&
						Cw(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(o = Yx(n, h)) || o.enumerable }));
		return e;
	},
	Jx = (e, n, i) => (
		(i = e != null ? Qx(Gx(e)) : {}),
		Xx(n || !e || !e.__esModule || !Tw.call(e, "default") ? Cw(i, "default", { value: e, enumerable: !0 }) : i, e)
	);
(function () {
	const n = document.createElement("link").relList;
	if (n && n.supports && n.supports("modulepreload")) return;
	for (const u of document.querySelectorAll('link[rel="modulepreload"]')) o(u);
	new MutationObserver((u) => {
		for (const l of u)
			if (l.type === "childList")
				for (const f of l.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && o(f);
	}).observe(document, { childList: !0, subtree: !0 });
	function i(u) {
		const l = {};
		return (
			u.integrity && (l.integrity = u.integrity),
			u.referrerPolicy && (l.referrerPolicy = u.referrerPolicy),
			u.crossOrigin === "use-credentials"
				? (l.credentials = "include")
				: u.crossOrigin === "anonymous"
					? (l.credentials = "omit")
					: (l.credentials = "same-origin"),
			l
		);
	}
	function o(u) {
		if (u.ep) return;
		u.ep = !0;
		const l = i(u);
		fetch(u.href, l);
	}
})();
var Wx = sr((e) => {
		var n = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.portal"),
			o = Symbol.for("react.fragment"),
			u = Symbol.for("react.strict_mode"),
			l = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			g = Symbol.for("react.suspense"),
			p = Symbol.for("react.memo"),
			b = Symbol.for("react.lazy"),
			y = Symbol.for("react.activity"),
			w = Symbol.for("react.view_transition"),
			E = Symbol.iterator;
		function T(j) {
			return j === null || typeof j != "object"
				? null
				: ((j = (E && j[E]) || j["@@iterator"]), typeof j == "function" ? j : null);
		}
		var x = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			z = Object.assign,
			M = {};
		function A(j, ae, W) {
			((this.props = j), (this.context = ae), (this.refs = M), (this.updater = W || x));
		}
		((A.prototype.isReactComponent = {}),
			(A.prototype.setState = function (j, ae) {
				if (typeof j != "object" && typeof j != "function" && j != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, j, ae, "setState");
			}),
			(A.prototype.forceUpdate = function (j) {
				this.updater.enqueueForceUpdate(this, j, "forceUpdate");
			}));
		function N() {}
		N.prototype = A.prototype;
		function D(j, ae, W) {
			((this.props = j), (this.context = ae), (this.refs = M), (this.updater = W || x));
		}
		var k = (D.prototype = new N());
		((k.constructor = D), z(k, A.prototype), (k.isPureReactComponent = !0));
		var O = Array.isArray;
		function L() {}
		var H = { H: null, A: null, T: null, S: null },
			te = Object.prototype.hasOwnProperty;
		function R(j, ae, W) {
			var fe = W.ref;
			return { $$typeof: n, type: j, key: ae, ref: fe !== void 0 ? fe : null, props: W };
		}
		function q(j, ae) {
			return R(j.type, ae, j.props);
		}
		function P(j) {
			return typeof j == "object" && j !== null && j.$$typeof === n;
		}
		function F(j) {
			var ae = { "=": "=0", ":": "=2" };
			return (
				"$" +
				j.replace(/[=:]/g, function (W) {
					return ae[W];
				})
			);
		}
		var Y = /\/+/g;
		function B(j, ae) {
			return typeof j == "object" && j !== null && j.key != null ? F("" + j.key) : ae.toString(36);
		}
		function ne(j) {
			switch (j.status) {
				case "fulfilled":
					return j.value;
				case "rejected":
					throw j.reason;
				default:
					switch (
						(typeof j.status == "string"
							? j.then(L, L)
							: ((j.status = "pending"),
								j.then(
									function (ae) {
										j.status === "pending" && ((j.status = "fulfilled"), (j.value = ae));
									},
									function (ae) {
										j.status === "pending" && ((j.status = "rejected"), (j.reason = ae));
									},
								)),
						j.status)
					) {
						case "fulfilled":
							return j.value;
						case "rejected":
							throw j.reason;
					}
			}
			throw j;
		}
		function re(j, ae, W, fe, Ee) {
			var _e = typeof j;
			(_e === "undefined" || _e === "boolean") && (j = null);
			var Ce = !1;
			if (j === null) Ce = !0;
			else
				switch (_e) {
					case "bigint":
					case "string":
					case "number":
						Ce = !0;
						break;
					case "object":
						switch (j.$$typeof) {
							case n:
							case i:
								Ce = !0;
								break;
							case b:
								return ((Ce = j._init), re(Ce(j._payload), ae, W, fe, Ee));
						}
				}
			if (Ce)
				return (
					(Ee = Ee(j)),
					(Ce = fe === "" ? "." + B(j, 0) : fe),
					O(Ee)
						? ((W = ""),
							Ce != null && (W = Ce.replace(Y, "$&/") + "/"),
							re(Ee, ae, W, "", function (Ge) {
								return Ge;
							}))
						: Ee != null &&
							(P(Ee) &&
								(Ee = q(
									Ee,
									W + (Ee.key == null || (j && j.key === Ee.key) ? "" : ("" + Ee.key).replace(Y, "$&/") + "/") + Ce,
								)),
							ae.push(Ee)),
					1
				);
			Ce = 0;
			var ce = fe === "" ? "." : fe + ":";
			if (O(j))
				for (var ye = 0; ye < j.length; ye++) ((fe = j[ye]), (_e = ce + B(fe, ye)), (Ce += re(fe, ae, W, _e, Ee)));
			else if (((ye = T(j)), typeof ye == "function"))
				for (j = ye.call(j), ye = 0; !(fe = j.next()).done;)
					((fe = fe.value), (_e = ce + B(fe, ye++)), (Ce += re(fe, ae, W, _e, Ee)));
			else if (_e === "object") {
				if (typeof j.then == "function") return re(ne(j), ae, W, fe, Ee);
				throw (
					(ae = String(j)),
					Error(
						"Objects are not valid as a React child (found: " +
							(ae === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : ae) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return Ce;
		}
		function U(j, ae, W) {
			if (j == null) return j;
			var fe = [],
				Ee = 0;
			return (
				re(j, fe, "", "", function (_e) {
					return ae.call(W, _e, Ee++);
				}),
				fe
			);
		}
		function ee(j) {
			if (j._status === -1) {
				var ae = j._result,
					W = ae();
				(W.then(
					function (fe) {
						(j._status === 0 || j._status === -1) &&
							((j._status = 1), (j._result = fe), W.status === void 0 && ((W.status = "fulfilled"), (W.value = fe)));
					},
					function (fe) {
						(j._status === 0 || j._status === -1) &&
							((j._status = 2), (j._result = fe), W.status === void 0 && ((W.status = "rejected"), (W.reason = fe)));
					},
				),
					j._status === -1 && ((j._status = 0), (j._result = W)));
			}
			if (j._status === 1) return j._result.default;
			throw j._result;
		}
		var K =
			typeof reportError == "function"
				? reportError
				: function (j) {
						if (typeof window == "object" && typeof window.ErrorEvent == "function") {
							var ae = new window.ErrorEvent("error", {
								bubbles: !0,
								cancelable: !0,
								message:
									typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
								error: j,
							});
							if (!window.dispatchEvent(ae)) return;
						} else if (typeof process == "object" && typeof process.emit == "function") {
							process.emit("uncaughtException", j);
							return;
						}
						console.error(j);
					};
		function ue(j) {
			var ae = H.T,
				W = {};
			((W.types = ae !== null ? ae.types : null), (H.T = W));
			try {
				var fe = j(),
					Ee = H.S;
				(Ee !== null && Ee(W, fe),
					typeof fe == "object" && fe !== null && typeof fe.then == "function" && fe.then(L, K));
			} catch (_e) {
				K(_e);
			} finally {
				(ae !== null && W.types !== null && (ae.types = W.types), (H.T = ae));
			}
		}
		function xe(j) {
			var ae = H.T;
			if (ae !== null) {
				var W = ae.types;
				W === null ? (ae.types = [j]) : W.indexOf(j) === -1 && W.push(j);
			} else ue(xe.bind(null, j));
		}
		var ve = {
			map: U,
			forEach: function (j, ae, W) {
				U(
					j,
					function () {
						ae.apply(this, arguments);
					},
					W,
				);
			},
			count: function (j) {
				var ae = 0;
				return (
					U(j, function () {
						ae++;
					}),
					ae
				);
			},
			toArray: function (j) {
				return (
					U(j, function (ae) {
						return ae;
					}) || []
				);
			},
			only: function (j) {
				if (!P(j)) throw Error("React.Children.only expected to receive a single React element child.");
				return j;
			},
		};
		((e.Activity = y),
			(e.Children = ve),
			(e.Component = A),
			(e.Fragment = o),
			(e.Profiler = l),
			(e.PureComponent = D),
			(e.StrictMode = u),
			(e.Suspense = g),
			(e.ViewTransition = w),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (j) {
					return H.H.useMemoCache(j);
				},
			}),
			(e.addTransitionType = xe),
			(e.cache = function (j) {
				return function () {
					return j.apply(null, arguments);
				};
			}),
			(e.cacheSignal = function () {
				return null;
			}),
			(e.cloneElement = function (j, ae, W) {
				if (j == null) throw Error("The argument must be a React element, but you passed " + j + ".");
				var fe = z({}, j.props),
					Ee = j.key;
				if (ae != null)
					for (_e in (ae.key !== void 0 && (Ee = "" + ae.key), ae))
						!te.call(ae, _e) ||
							_e === "key" ||
							_e === "__self" ||
							_e === "__source" ||
							(_e === "ref" && ae.ref === void 0) ||
							(fe[_e] = ae[_e]);
				var _e = arguments.length - 2;
				if (_e === 1) fe.children = W;
				else if (1 < _e) {
					for (var Ce = Array(_e), ce = 0; ce < _e; ce++) Ce[ce] = arguments[ce + 2];
					fe.children = Ce;
				}
				return R(j.type, Ee, fe);
			}),
			(e.createContext = function (j) {
				return (
					(j = { $$typeof: h, _currentValue: j, _currentValue2: j, _threadCount: 0, Provider: null, Consumer: null }),
					(j.Provider = j),
					(j.Consumer = { $$typeof: f, _context: j }),
					j
				);
			}),
			(e.createElement = function (j, ae, W) {
				var fe,
					Ee = {},
					_e = null;
				if (ae != null)
					for (fe in (ae.key !== void 0 && (_e = "" + ae.key), ae))
						te.call(ae, fe) && fe !== "key" && fe !== "__self" && fe !== "__source" && (Ee[fe] = ae[fe]);
				var Ce = arguments.length - 2;
				if (Ce === 1) Ee.children = W;
				else if (1 < Ce) {
					for (var ce = Array(Ce), ye = 0; ye < Ce; ye++) ce[ye] = arguments[ye + 2];
					Ee.children = ce;
				}
				if (j && j.defaultProps) for (fe in ((Ce = j.defaultProps), Ce)) Ee[fe] === void 0 && (Ee[fe] = Ce[fe]);
				return R(j, _e, Ee);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (j) {
				return { $$typeof: m, render: j };
			}),
			(e.isValidElement = P),
			(e.lazy = function (j) {
				return { $$typeof: b, _payload: { _status: -1, _result: j }, _init: ee };
			}),
			(e.memo = function (j, ae) {
				return { $$typeof: p, type: j, compare: ae === void 0 ? null : ae };
			}),
			(e.startTransition = ue),
			(e.unstable_useCacheRefresh = function () {
				return H.H.useCacheRefresh();
			}),
			(e.use = function (j) {
				return H.H.use(j);
			}),
			(e.useActionState = function (j, ae, W) {
				return H.H.useActionState(j, ae, W);
			}),
			(e.useCallback = function (j, ae) {
				return H.H.useCallback(j, ae);
			}),
			(e.useContext = function (j) {
				return H.H.useContext(j);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (j, ae) {
				return H.H.useDeferredValue(j, ae);
			}),
			(e.useEffect = function (j, ae) {
				return H.H.useEffect(j, ae);
			}),
			(e.useEffectEvent = function (j) {
				return H.H.useEffectEvent(j);
			}),
			(e.useId = function () {
				return H.H.useId();
			}),
			(e.useImperativeHandle = function (j, ae, W) {
				return H.H.useImperativeHandle(j, ae, W);
			}),
			(e.useInsertionEffect = function (j, ae) {
				return H.H.useInsertionEffect(j, ae);
			}),
			(e.useLayoutEffect = function (j, ae) {
				return H.H.useLayoutEffect(j, ae);
			}),
			(e.useMemo = function (j, ae) {
				return H.H.useMemo(j, ae);
			}),
			(e.useOptimistic = function (j, ae) {
				return H.H.useOptimistic(j, ae);
			}),
			(e.useReducer = function (j, ae, W) {
				return H.H.useReducer(j, ae, W);
			}),
			(e.useRef = function (j) {
				return H.H.useRef(j);
			}),
			(e.useState = function (j) {
				return H.H.useState(j);
			}),
			(e.useSyncExternalStore = function (j, ae, W) {
				return H.H.useSyncExternalStore(j, ae, W);
			}),
			(e.useTransition = function () {
				return H.H.useTransition();
			}),
			(e.version = "19.3.1"));
	}),
	tf = sr((e, n) => {
		n.exports = Wx();
	}),
	Dr = [],
	ir = [],
	eO = Uint8Array,
	tm = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var ko = 0, tO = tm.length; ko < tO; ++ko) ((Dr[ko] = tm[ko]), (ir[tm.charCodeAt(ko)] = ko));
ir[45] = 62;
ir[95] = 63;
function nO(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = n);
	var o = i === n ? 0 : 4 - (i % 4);
	return [i, o];
}
function rO(e, n, i) {
	return ((n + i) * 3) / 4 - i;
}
function lu(e) {
	for (
		var n, i = nO(e), o = i[0], u = i[1], l = new eO(rO(e, o, u)), f = 0, h = u > 0 ? o - 4 : o, m = 0;
		m < h;
		m += 4
	)
		((n =
			(ir[e.charCodeAt(m)] << 18) |
			(ir[e.charCodeAt(m + 1)] << 12) |
			(ir[e.charCodeAt(m + 2)] << 6) |
			ir[e.charCodeAt(m + 3)]),
			(l[f++] = (n >> 16) & 255),
			(l[f++] = (n >> 8) & 255),
			(l[f++] = n & 255));
	return (
		u === 2 && ((n = (ir[e.charCodeAt(m)] << 2) | (ir[e.charCodeAt(m + 1)] >> 4)), (l[f++] = n & 255)),
		u === 1 &&
			((n = (ir[e.charCodeAt(m)] << 10) | (ir[e.charCodeAt(m + 1)] << 4) | (ir[e.charCodeAt(m + 2)] >> 2)),
			(l[f++] = (n >> 8) & 255),
			(l[f++] = n & 255)),
		l
	);
}
function iO(e) {
	return Dr[(e >> 18) & 63] + Dr[(e >> 12) & 63] + Dr[(e >> 6) & 63] + Dr[e & 63];
}
function aO(e, n, i) {
	for (var o, u = [], l = n; l < i; l += 3)
		((o = ((e[l] << 16) & 16711680) + ((e[l + 1] << 8) & 65280) + (e[l + 2] & 255)), u.push(iO(o)));
	return u.join("");
}
function cu(e) {
	for (var n, i = e.length, o = i % 3, u = [], l = 16383, f = 0, h = i - o; f < h; f += l)
		u.push(aO(e, f, f + l > h ? h : f + l));
	return (
		o === 1
			? ((n = e[i - 1]), u.push(Dr[n >> 2] + Dr[(n << 4) & 63] + "=="))
			: o === 2 &&
				((n = (e[i - 2] << 8) + e[i - 1]), u.push(Dr[n >> 10] + Dr[(n >> 4) & 63] + Dr[(n << 2) & 63] + "=")),
		u.join("")
	);
}
function oi(e) {
	if (e === void 0) return {};
	if (!xw(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function oO(e) {
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
function xw(e) {
	const n = typeof e == "object",
		i = Object.getPrototypeOf(e),
		o = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return n && o;
}
var Ow = !0,
	Ho = BigInt("-9223372036854775808"),
	tg = BigInt("9223372036854775807"),
	Om = BigInt("0"),
	sO = BigInt("8"),
	uO = BigInt("256"),
	nm =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	Aw = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(nm);
		}
		valueOf() {
			throw new Error(nm);
		}
		toJSON() {
			throw new Error(nm);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	lO = new Aw();
function Rw(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function cO(e) {
	e < Om && (e -= Ho + Ho);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const i = new Uint8Array(new ArrayBuffer(8));
	let o = 0;
	for (const u of n.match(/.{2}/g).reverse()) (i.set([parseInt(u, 16)], o++), (e >>= sO));
	return cu(i);
}
function fO(e) {
	const n = lu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let i = Om,
		o = Om;
	for (const u of n) ((i += BigInt(u) * uO ** o), o++);
	return (i > tg && (i += Ho + Ho), i);
}
function dO(e) {
	if (e < Ho || tg < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), cu(new Uint8Array(n)));
}
function hO(e) {
	const n = lu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var mO = DataView.prototype.setBigInt64 ? dO : cO,
	gO = DataView.prototype.getBigInt64 ? hO : fO,
	bb = 1024;
function Am(e) {
	if (e.length > bb) throw new Error(`Field name ${e} exceeds maximum field name length ${bb}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const i = e.charCodeAt(n);
		if (i < 32 || i >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Zo(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((o) => Zo(o));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const o = n[0][0];
		if (o === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return lu(e.$bytes).buffer;
		}
		if (o === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return gO(e.$integer);
		}
		if (o === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const u = lu(e.$float);
			if (u.byteLength !== 8) throw new Error(`Received ${u.byteLength} bytes, expected 8 for $float`);
			const l = new DataView(u.buffer).getFloat64(0, Ow);
			if (!Rw(l)) throw new Error(`Float ${l} should be encoded as a number`);
			return l;
		}
		if (o === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return lO;
		}
		if (o === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (o === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const i = {};
	for (const [o, u] of Object.entries(e)) (Am(o), (i[o] = Zo(u)));
	return i;
}
var vO = 16384;
function Bo(e) {
	const n = JSON.stringify(e, (i, o) =>
		o === void 0
			? "undefined"
			: typeof o == "function"
				? "[Function]"
				: typeof o == "symbol"
					? String(o)
					: typeof o == "bigint"
						? `${o.toString()}n`
						: o,
	);
	if (n.length > vO) {
		const i = "[...truncated]";
		let o = 16370;
		const u = n.codePointAt(o - 1);
		return (u !== void 0 && u > 65535 && (o -= 1), n.substring(0, o) + i);
	}
	return n;
}
function Mc(e, n, i, o) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Bo(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Ho || tg < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: mO(e) };
	}
	if (typeof e == "number")
		if (Rw(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, Ow), { $float: cu(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: cu(new Uint8Array(e)) };
	if (e instanceof Aw) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Mc(f, n, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(rm(i, "Set", [...e], n));
	if (e instanceof Map) throw new Error(rm(i, "Map", [...e], n));
	if (!xw(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(rm(i, h, e, n));
	}
	const u = {},
		l = Object.entries(e);
	l.sort(([f, h], [m, g]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of l)
		h !== void 0 ? (Am(f), (u[f] = Mc(h, n, i + `.${f}`, !1))) : o && (Am(f), (u[f] = yO(h, n, i + `.${f}`)));
	return u;
}
function rm(e, n, i, o) {
	return e
		? `${n}${Bo(i)} is not a supported Convex type (present at path ${e} in original object ${Bo(o)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${Bo(i)} is not a supported Convex type.`;
}
function yO(e, n, i) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${Bo(e)} but original value is undefined`);
	return Mc(e, n, i, !1);
}
function gr(e) {
	return Mc(e, e, "", !1);
}
var pO = Object.defineProperty,
	bO = (e, n, i) => (n in e ? pO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	St = (e, n, i) => bO(e, typeof n != "symbol" ? n + "" : n, i),
	SO = "https://docs.convex.dev/error#undefined-validator";
function fu(e, n) {
	const i = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${i} in ${e}. This is often caused by circular imports. See ${SO} for details.`,
	);
}
var In = class {
		constructor({ isOptional: e }) {
			(St(this, "type"),
				St(this, "fieldPaths"),
				St(this, "isOptional"),
				St(this, "isConvexValidator"),
				(this.isOptional = e),
				(this.isConvexValidator = !0));
		}
	},
	wO = class Nw extends In {
		constructor({ isOptional: n, tableName: i }) {
			if ((super({ isOptional: n }), St(this, "tableName"), St(this, "kind", "id"), typeof i != "string"))
				throw new Error("v.id(tableName) requires a string");
			this.tableName = i;
		}
		get json() {
			return { type: "id", tableName: this.tableName };
		}
		optional() {
			return new Nw({ isOptional: "optional", tableName: this.tableName });
		}
		asOptional() {
			return this.optional();
		}
	},
	Sb = class Mw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "float64"));
		}
		get json() {
			return { type: "number" };
		}
		optional() {
			return new Mw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	wb = class Dw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "int64"));
		}
		get json() {
			return { type: "bigint" };
		}
		optional() {
			return new Dw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	EO = class zw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "commitTs"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new zw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	_O = class Iw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "boolean"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new Iw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	CO = class jw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "bytes"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new jw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	TO = class kw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "string"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new kw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	xO = class qw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "null"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new qw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	OO = class Lw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "any"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new Lw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	AO = class qo extends In {
		constructor({ isOptional: n, fields: i }) {
			(super({ isOptional: n }),
				St(this, "fields"),
				St(this, "kind", "object"),
				globalThis.Object.entries(i).forEach(([o, u]) => {
					if ((u === void 0 && fu("v.object()", o), !u.isConvexValidator))
						throw new Error("v.object() entries must be validators");
				}),
				(this.fields = i));
		}
		get json() {
			return {
				type: this.kind,
				value: globalThis.Object.fromEntries(
					globalThis.Object.entries(this.fields).map(([n, i]) => [
						n,
						{ fieldType: i.json, optional: i.isOptional === "optional" },
					]),
				),
			};
		}
		optional() {
			return new qo({ isOptional: "optional", fields: this.fields });
		}
		asOptional() {
			return this.optional();
		}
		omit(...n) {
			const i = { ...this.fields };
			for (const o of n) delete i[o];
			return new qo({ isOptional: this.isOptional, fields: i });
		}
		pick(...n) {
			const i = {};
			for (const o of n) i[o] = this.fields[o];
			return new qo({ isOptional: this.isOptional, fields: i });
		}
		partial() {
			const n = {};
			for (const [i, o] of globalThis.Object.entries(this.fields)) n[i] = o.asOptional();
			return new qo({ isOptional: this.isOptional, fields: n });
		}
		extend(n) {
			return new qo({ isOptional: this.isOptional, fields: { ...this.fields, ...n } });
		}
	},
	RO = class Uw extends In {
		constructor({ isOptional: n, value: i }) {
			if (
				(super({ isOptional: n }),
				St(this, "value"),
				St(this, "kind", "literal"),
				typeof i != "string" && typeof i != "boolean" && typeof i != "number" && typeof i != "bigint")
			)
				throw new Error("v.literal(value) must be a string, number, or boolean");
			this.value = i;
		}
		get json() {
			return { type: this.kind, value: gr(this.value) };
		}
		optional() {
			return new Uw({ isOptional: "optional", value: this.value });
		}
		asOptional() {
			return this.optional();
		}
	},
	NO = class Vw extends In {
		constructor({ isOptional: n, element: i }) {
			(super({ isOptional: n }),
				St(this, "element"),
				St(this, "kind", "array"),
				i === void 0 && fu("v.array()"),
				(this.element = i));
		}
		get json() {
			return { type: this.kind, value: this.element.json };
		}
		optional() {
			return new Vw({ isOptional: "optional", element: this.element });
		}
		asOptional() {
			return this.optional();
		}
	},
	MO = class Bw extends In {
		constructor({ isOptional: n, key: i, value: o }) {
			if (
				(super({ isOptional: n }),
				St(this, "key"),
				St(this, "value"),
				St(this, "kind", "record"),
				i === void 0 && fu("v.record()", "key"),
				o === void 0 && fu("v.record()", "value"),
				i.isOptional === "optional")
			)
				throw new Error("Record validator cannot have optional keys");
			if (o.isOptional === "optional") throw new Error("Record validator cannot have optional values");
			if (!i.isConvexValidator || !o.isConvexValidator)
				throw new Error("Key and value of v.record() must be validators");
			((this.key = i), (this.value = o));
		}
		get json() {
			return { type: this.kind, keys: this.key.json, values: { fieldType: this.value.json, optional: !1 } };
		}
		optional() {
			return new Bw({ isOptional: "optional", key: this.key, value: this.value });
		}
		asOptional() {
			return this.optional();
		}
	},
	DO = class Pw extends In {
		constructor({ isOptional: n, members: i }) {
			(super({ isOptional: n }),
				St(this, "members"),
				St(this, "kind", "union"),
				i.forEach((o, u) => {
					if ((o === void 0 && fu("v.union()", `member at index ${u}`), !o.isConvexValidator))
						throw new Error("All members of v.union() must be validators");
				}),
				(this.members = i));
		}
		get json() {
			return { type: this.kind, value: this.members.map((n) => n.json) };
		}
		optional() {
			return new Pw({ isOptional: "optional", members: this.members });
		}
		asOptional() {
			return this.optional();
		}
	},
	ge = {
		id: (e) => new wO({ isOptional: "required", tableName: e }),
		null: () => new xO({ isOptional: "required" }),
		number: () => new Sb({ isOptional: "required" }),
		float64: () => new Sb({ isOptional: "required" }),
		bigint: () => new wb({ isOptional: "required" }),
		int64: () => new wb({ isOptional: "required" }),
		commitTs: () => new EO({ isOptional: "required" }),
		boolean: () => new _O({ isOptional: "required" }),
		string: () => new TO({ isOptional: "required" }),
		bytes: () => new CO({ isOptional: "required" }),
		literal: (e) => new RO({ isOptional: "required", value: e }),
		array: (e) => new NO({ isOptional: "required", element: e }),
		object: (e) => new AO({ isOptional: "required", fields: e }),
		record: (e, n) => new MO({ isOptional: "required", key: e, value: n }),
		union: (...e) => new DO({ isOptional: "required", members: e }),
		any: () => new OO({ isOptional: "required" }),
		optional: (e) => e.asOptional(),
		nullable: (e) => ge.union(e, ge.null()),
	},
	zO = Object.defineProperty,
	IO = (e, n, i) => (n in e ? zO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	im = (e, n, i) => IO(e, typeof n != "symbol" ? n + "" : n, i),
	Eb,
	_b,
	jO = Symbol.for("ConvexError"),
	Rm = class extends ((_b = Error), (Eb = jO), _b) {
		constructor(e) {
			(super(typeof e == "string" ? e : Bo(e)),
				im(this, "name", "ConvexError"),
				im(this, "data"),
				im(this, Eb, !0),
				(this.data = e));
		}
	},
	Cb = "1.47.0",
	kO = Object.defineProperty,
	qO = (e, n, i) => (n in e ? kO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Tb = (e, n, i) => qO(e, typeof n != "symbol" ? n + "" : n, i),
	LO = "color:rgb(0, 145, 255)";
function $w(e) {
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
var Hw = class {
	constructor(e) {
		(Tb(this, "_onLogLineFuncs"), Tb(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function Zw(e) {
	const n = new Hw(e);
	return (
		n.addLogLineListener((i, ...o) => {
			switch (i) {
				case "debug":
					console.debug(...o);
					break;
				case "info":
					console.log(...o);
					break;
				case "warn":
					console.warn(...o);
					break;
				case "error":
					console.error(...o);
					break;
				default:
					console.log(...o);
			}
		}),
		n
	);
}
function Fw(e) {
	return new Hw(e);
}
function Dc(e, n, i, o, u) {
	const l = $w(i);
	if ((typeof u == "object" && (u = `ConvexError ${JSON.stringify(u.errorData, null, 2)}`), n === "info")) {
		const f = u.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${l}(${o})] Could not parse console.log`);
			return;
		}
		const h = u.slice(1, f[0].length - 2),
			m = u.slice(f[0].length);
		e.log(`%c[CONVEX ${l}(${o})] [${h}]`, LO, m);
	} else e.error(`[CONVEX ${l}(${o})] ${u}`);
}
function UO(e, n) {
	const i = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(i), new Error(i));
}
function Vo(e, n, i) {
	return `[CONVEX ${$w(e)}(${n})] ${i.errorMessage}
  Called by client`;
}
function Nm(e, n) {
	return ((n.data = e.errorData), n);
}
function Ia(e) {
	const n = e.split(":");
	let i, o;
	return (
		n.length === 1 ? ((i = n[0]), (o = "default")) : ((i = n.slice(0, n.length - 1).join(":")), (o = n[n.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${o}`
	);
}
function Na(e, n) {
	return JSON.stringify({ udfPath: Ia(e), args: gr(n) });
}
function xb(e, n, i) {
	const { initialNumItems: o, id: u } = i;
	return JSON.stringify({ type: "paginated", udfPath: Ia(e), args: gr(n), options: gr({ initialNumItems: o, id: u }) });
}
var VO = Object.defineProperty,
	BO = (e, n, i) => (n in e ? VO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Mr = (e, n, i) => BO(e, typeof n != "symbol" ? n + "" : n, i),
	PO = class {
		constructor() {
			(Mr(this, "nextQueryId"),
				Mr(this, "querySetVersion"),
				Mr(this, "querySet"),
				Mr(this, "queryIdToToken"),
				Mr(this, "identityVersion"),
				Mr(this, "auth"),
				Mr(this, "outstandingQueriesOlderThanRestart"),
				Mr(this, "outstandingAuthOlderThanRestart"),
				Mr(this, "paused"),
				Mr(this, "pendingQuerySetModifications"),
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
		subscribe(e, n, i, o) {
			const u = Ia(e),
				l = Na(u, n),
				f = this.querySet.get(l);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: l, modification: null, unsubscribe: () => this.removeSubscriber(l) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: u, args: n, numSubscribers: 1, journal: i, componentPath: o };
				(this.querySet.set(l, m), this.queryIdToToken.set(h, l));
				const g = this.querySetVersion,
					p = this.querySetVersion + 1,
					b = { type: "Add", queryId: h, udfPath: u, args: [gr(n)], journal: i, componentPath: o };
				return (
					this.paused ? this.pendingQuerySetModifications.set(h, b) : (this.querySetVersion = p),
					{
						queryToken: l,
						modification: { type: "ModifyQuerySet", baseVersion: g, newVersion: p, modifications: [b] },
						unsubscribe: () => this.removeSubscriber(l),
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
							const o = this.queryIdToToken.get(n.queryId);
							o !== void 0 && (this.querySet.get(o).journal = i);
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
			const i = Ia(e),
				o = Na(i, n),
				u = this.querySet.get(o);
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
			const o = this.identityVersion;
			return (this.paused || (this.identityVersion = o + 1), { type: "Authenticate", baseVersion: o, ...i });
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
			for (const o of this.querySet.values()) {
				const u = {
					type: "Add",
					queryId: o.id,
					udfPath: o.canonicalizedUdfPath,
					args: [gr(o.args)],
					journal: o.journal,
					componentPath: o.componentPath,
				};
				(e.push(u), this.outstandingQueriesOlderThanRestart.add(o.id));
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
					o = this.querySetVersion + 1,
					u = { type: "Remove", queryId: n.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(n.id)
							? this.pendingQuerySetModifications.delete(n.id)
							: this.pendingQuerySetModifications.set(n.id, u)
						: (this.querySetVersion = o),
					{ type: "ModifyQuerySet", baseVersion: i, newVersion: o, modifications: [u] }
				);
			}
		}
	},
	$O = Object.defineProperty,
	HO = (e, n, i) => (n in e ? $O(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	dc = (e, n, i) => HO(e, typeof n != "symbol" ? n + "" : n, i),
	ZO = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				dc(this, "inflightRequests"),
				dc(this, "requestsOlderThanRestart"),
				dc(this, "inflightMutationsCount", 0),
				dc(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, n) {
			const i = new Promise((o) => {
				const u = n ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: u, requestedAt: new Date(), onResult: o },
				}),
					e.type === "Mutation" ? this.inflightMutationsCount++ : e.type === "Action" && this.inflightActionsCount++);
			});
			return (this.markConnectionStateDirty(), i);
		}
		onResponse(e) {
			const n = this.inflightRequests.get(e.requestId);
			if (n === void 0 || n.status.status === "Completed") return null;
			const i = n.message.type === "Mutation" ? "mutation" : "action",
				o = n.message.udfPath;
			for (const h of e.logLines) Dc(this.logger, "info", i, o, h);
			const u = n.status;
			let l, f;
			if (e.success) ((l = { success: !0, logLines: e.logLines, value: Zo(e.result) }), (f = () => u.onResult(l)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Dc(this.logger, "error", i, o, h),
					(l = { success: !1, errorMessage: h, errorData: m !== void 0 ? Zo(m) : void 0, logLines: e.logLines }),
					(f = () => u.onResult(l)));
			}
			return e.type === "ActionResponse" || !e.success
				? (f(),
					this.inflightRequests.delete(e.requestId),
					this.requestsOlderThanRestart.delete(e.requestId),
					n.message.type === "Action"
						? this.inflightActionsCount--
						: n.message.type === "Mutation" && this.inflightMutationsCount--,
					this.markConnectionStateDirty(),
					{ requestId: e.requestId, result: l })
				: ((n.status = { status: "Completed", result: l, ts: e.ts, onResolve: f }), null);
		}
		removeCompleted(e) {
			const n = new Map();
			for (const [i, o] of this.inflightRequests.entries()) {
				const u = o.status;
				u.status === "Completed" &&
					u.ts.lessThanOrEqual(e) &&
					(u.onResolve(),
					n.set(i, u.result),
					o.message.type === "Mutation"
						? this.inflightMutationsCount--
						: o.message.type === "Action" && this.inflightActionsCount--,
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
	du = Symbol.for("functionName"),
	Qw = Symbol.for("toReferencePath");
function FO(e) {
	return e[Qw] ?? null;
}
function QO(e) {
	return e.startsWith("function://");
}
function YO(e) {
	let n;
	if (typeof e == "string") QO(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[du]) n = { name: e[du] };
	else {
		const i = FO(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		n = { reference: i };
	}
	return n;
}
function yn(e) {
	const n = YO(e);
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
	const i = e[du];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function ng(e) {
	return { [du]: e };
}
function Yw(e = []) {
	return new Proxy(
		{},
		{
			get(n, i) {
				if (typeof i == "string") return Yw([...e, i]);
				if (i === du) {
					if (e.length < 2) {
						const l = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${l}\``);
					}
					const o = e.slice(0, -1).join("/"),
						u = e[e.length - 1];
					return u === "default" ? o : o + ":" + u;
				} else return i === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var Kw = Yw(),
	KO = Object.defineProperty,
	GO = (e, n, i) => (n in e ? KO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	zc = (e, n, i) => GO(e, typeof n != "symbol" ? n + "" : n, i),
	Ob = class Mm {
		constructor(n) {
			(zc(this, "queryResults"), zc(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...i) {
			const o = oi(i[0]),
				u = yn(n),
				l = this.queryResults.get(Na(u, o));
			if (l !== void 0) return Mm.queryValue(l.result);
		}
		getAllQueries(n) {
			const i = [],
				o = yn(n);
			for (const u of this.queryResults.values())
				u.udfPath === Ia(o) && i.push({ args: u.args, value: Mm.queryValue(u.result) });
			return i;
		}
		setQuery(n, i, o) {
			const u = oi(i),
				l = yn(n),
				f = Na(l, u);
			let h;
			o === void 0 ? (h = void 0) : (h = { success: !0, value: o, logLines: [] });
			const m = { udfPath: l, args: u, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	XO = class {
		constructor() {
			(zc(this, "queryResults"),
				zc(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((l) => !n.has(l.mutationId));
			const i = this.queryResults;
			this.queryResults = new Map(e);
			const o = new Ob(this.queryResults);
			for (const l of this.optimisticUpdates) l.update(o);
			const u = [];
			for (const [l, f] of this.queryResults) {
				const h = i.get(l);
				(h === void 0 || h.result !== f.result) && u.push(l);
			}
			return u;
		}
		applyOptimisticUpdate(e, n) {
			this.optimisticUpdates.push({ update: e, mutationId: n });
			const i = new Ob(this.queryResults);
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
				throw i.errorData !== void 0 ? Nm(i, new Rm(Vo("query", n.udfPath, i))) : new Error(Vo("query", n.udfPath, i));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	JO = Object.defineProperty,
	WO = (e, n, i) => (n in e ? JO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	am = (e, n, i) => WO(e, typeof n != "symbol" ? n + "" : n, i),
	wu = class ii {
		constructor(n, i) {
			(am(this, "low"),
				am(this, "high"),
				am(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = i | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new ii(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? Ab : n >= eA ? tA : new ii((n % au) | 0, (n / au) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(au) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				ii.isLong(n) || (n = ii.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				ii.isLong(n) || (n = ii.fromValue(n)),
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
			return typeof n == "number" ? ii.fromNumber(n) : new ii(n.low, n.high);
		}
	},
	Ab = new wu(0, 0),
	Rb = 65536,
	au = Rb * Rb,
	eA = au * au,
	tA = new wu(-1, -1),
	nA = Object.defineProperty,
	rA = (e, n, i) => (n in e ? nA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	hc = (e, n, i) => rA(e, typeof n != "symbol" ? n + "" : n, i),
	Nb = class {
		constructor(e, n) {
			(hc(this, "version"),
				hc(this, "remoteQuerySet"),
				hc(this, "queryPath"),
				hc(this, "logger"),
				(this.version = { querySet: 0, ts: wu.fromNumber(0), identity: 0 }),
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
						const o = this.queryPath(i.queryId);
						if (o) for (const l of i.logLines) Dc(this.logger, "info", "query", o, l);
						const u = Zo(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: u, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const o = this.queryPath(i.queryId);
						if (o) for (const l of i.logLines) Dc(this.logger, "info", "query", o, l);
						const { errorData: u } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: u !== void 0 ? Zo(u) : void 0,
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
function om(e) {
	const n = lu(e);
	return wu.fromBytesLE(Array.from(n));
}
function iA(e) {
	const n = new Uint8Array(e.toBytesLE());
	return cu(n);
}
function Mb(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: om(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: om(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: om(e.endVersion.ts) },
			};
	}
}
function aA(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: iA(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
	}
}
var oA = Object.defineProperty,
	sA = (e, n, i) => (n in e ? oA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Pt = (e, n, i) => sA(e, typeof n != "symbol" ? n + "" : n, i),
	uA = 1e3,
	lA = 1001,
	cA = 1005,
	fA = 4040,
	Tc;
function Lo() {
	return (
		Tc === void 0 && (Tc = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Tc + performance.now())
	);
}
function Db() {
	return `t=${Math.round((Lo() - Tc) / 100) / 10}s`;
}
var Gw = {
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
function dA(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(Gw)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var hA = class {
	constructor(e, n, i, o, u, l) {
		((this.markConnectionStateDirty = u),
			(this.debug = l),
			Pt(this, "socket"),
			Pt(this, "connectionCount"),
			Pt(this, "_hasEverConnected", !1),
			Pt(this, "lastCloseReason"),
			Pt(this, "transitionChunkBuffer", null),
			Pt(this, "defaultInitialBackoff"),
			Pt(this, "maxBackoff"),
			Pt(this, "retries"),
			Pt(this, "serverInactivityThreshold"),
			Pt(this, "reconnectDueToServerInactivityTimeout"),
			Pt(this, "scheduledReconnect", null),
			Pt(this, "networkOnlineHandler", null),
			Pt(this, "pendingNetworkRecoveryInfo", null),
			Pt(this, "uri"),
			Pt(this, "onOpen"),
			Pt(this, "onResume"),
			Pt(this, "onMessage"),
			Pt(this, "webSocketConstructor"),
			Pt(this, "logger"),
			Pt(this, "onServerDisconnectError"),
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
			(this.logger = o),
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
			const i = Mb(JSON.parse(n));
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
							clientTs: Lo(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", Db(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", Db())),
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
				let o = Mb(JSON.parse(n.data));
				if ((this._logVerbose(`received ws message with type ${o.type}`), o.type !== "Ping")) {
					if (o.type === "TransitionChunk") {
						const u = this.assembleTransition(o);
						if (!u) return;
						((o = u), this._logVerbose(`assembled full ws message of type ${o.type}`));
					}
					(this.transitionChunkBuffer !== null &&
						((this.transitionChunkBuffer = null),
						this.logger.log(`Received unexpected ${o.type} while buffering TransitionChunks`)),
						o.type === "Transition" && this.reportLargeTransition({ messageLength: i, transition: o }),
						this.onMessage(o).hasSyncedPastLastReconnect && ((this.retries = 0), this.markConnectionStateDirty()));
				}
			}),
			(e.onclose = (n) => {
				if (
					(this._logVerbose("begin ws.onclose"),
					(this.transitionChunkBuffer = null),
					this.lastCloseReason === null && (this.lastCloseReason = n.reason || `closed with code ${n.code}`),
					n.code !== uA && n.code !== lA && n.code !== cA && n.code !== fA)
				) {
					let o = `WebSocket closed with code ${n.code}`;
					(n.reason && (o += `: ${n.reason}`),
						this.logger.log(o),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(o));
				}
				const i = dA(n.reason);
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
			const i = aA(e),
				o = JSON.stringify(i);
			let u = !1;
			try {
				(this.socket.ws.send(o), (u = !0));
			} catch (l) {
				(this.logger.log(`Failed to send message on WebSocket, reconnecting: ${l}`),
					this.closeAndReconnect("FailedToSendMessage"));
			}
			return (
				this._logVerbose(`${u ? "sent" : "failed to send"} message with type ${e.type}: ${JSON.stringify(n)}`),
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
		const i = Lo(),
			o = setTimeout(() => {
				this.scheduledReconnect?.timeout === o && ((this.scheduledReconnect = null), this.connect());
			}, n);
		this.scheduledReconnect = { timeout: o, scheduledAt: i, backoffMs: n };
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
			const n = Lo() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Lo(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : Gw[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(n, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = Lo() - e.clientClockSkew - e.serverTs / 1e6,
			o = `${Math.round(i)}ms`,
			u = `${Math.round(n / 1e4) / 100}MB`,
			l = n / (i / 1e3),
			f = `${Math.round(l / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${u} transition in ${o} at ${f}`),
			n > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${u}) which will take a long time to download on slower connections`,
					)
				: i > 2e4 && this.logger.log(`received query results totaling ${u} which took more than 20s to arrive (${o})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: i, messageLength: n },
				}));
	}
};
function mA() {
	return gA();
}
function gA() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var nu = class extends Error {};
nu.prototype.name = "InvalidTokenError";
function vA(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, i) => {
			let o = i.charCodeAt(0).toString(16).toUpperCase();
			return (o.length < 2 && (o = "0" + o), "%" + o);
		}),
	);
}
function yA(e) {
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
		return vA(n);
	} catch {
		return atob(n);
	}
}
function Xw(e, n) {
	if (typeof e != "string") throw new nu("Invalid token specified: must be a string");
	n || (n = {});
	const i = n.header === !0 ? 0 : 1,
		o = e.split(".")[i];
	if (typeof o != "string") throw new nu(`Invalid token specified: missing part #${i + 1}`);
	let u;
	try {
		u = yA(o);
	} catch (l) {
		throw new nu(`Invalid token specified: invalid base64 for part #${i + 1} (${l.message})`);
	}
	try {
		return JSON.parse(u);
	} catch (l) {
		throw new nu(`Invalid token specified: invalid json for part #${i + 1} (${l.message})`);
	}
}
var pA = Object.defineProperty,
	bA = (e, n, i) => (n in e ? pA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Nn = (e, n, i) => bA(e, typeof n != "symbol" ? n + "" : n, i),
	SA = 1728e6,
	zb = 2,
	wA = class {
		constructor(e, n, i) {
			(Nn(this, "authState", { state: "noAuth" }),
				Nn(this, "configVersion", 0),
				Nn(this, "syncState"),
				Nn(this, "authenticate"),
				Nn(this, "stopSocket"),
				Nn(this, "tryRestartSocket"),
				Nn(this, "pauseSocket"),
				Nn(this, "resumeSocket"),
				Nn(this, "clearAuth"),
				Nn(this, "logger"),
				Nn(this, "refreshTokenLeewaySeconds"),
				Nn(this, "initialAuthTokenReuse"),
				Nn(this, "lastRefreshChange"),
				Nn(this, "tokenConfirmationAttempts", 0),
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
			const o = await this.fetchTokenAndGuardAgainstRace(e, { forceRefreshToken: !1 });
			if (o.isFromOutdatedConfig) return;
			const u = { fetchToken: e, onAuthChange: n, onRefreshChange: i };
			(o.value
				? (this.setAuthState({ state: "waitingForServerConfirmationOfCachedToken", config: u, hasRetried: !1 }),
					this.authenticate(o.value))
				: (this.setAuthState({ state: "initialRefetch", config: u }), await this.refetchToken()),
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= zb))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${zb - this.tokenConfirmationAttempts} attempts remaining`)),
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
			const { iat: o, exp: u } = i;
			if (!o || !u) {
				this.logger.error("Auth token does not have required fields, cannot refetch the token");
				return;
			}
			const l = u - o;
			if (l <= 2) {
				this.logger.error("Auth token does not live long enough, cannot refetch the token");
				return;
			}
			let f;
			n !== void 0 ? ((f = u - (Date.now() - n) / 1e3), f <= 0 && (f = 0)) : (f = l);
			let h = Math.min(SA, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
			const o = await e(n);
			return this.configVersion !== i
				? (this._logVerbose(`stale config version, expected ${i}, got ${this.configVersion}`),
					{ isFromOutdatedConfig: !0 })
				: { isFromOutdatedConfig: !1, value: o };
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
			}
			(this.authState.state === "waitingForScheduledRefetch" && clearTimeout(this.authState.refetchTokenTimeoutId),
				(this.authState = e));
		}
		decodeToken(e) {
			try {
				return Xw(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	EA = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function _A(e, n) {
	const i = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function CA(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function TA(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const i of EA) {
		const o = performance
			.getEntriesByName(i)
			.filter((u) => u.entryType === "mark")
			.filter((u) => u.detail.sessionId === e);
		n.push(...o);
	}
	return n.map(CA);
}
var xA = Object.defineProperty,
	OA = (e, n, i) => (n in e ? xA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	$t = (e, n, i) => OA(e, typeof n != "symbol" ? n + "" : n, i),
	AA = class {
		constructor(e, n, i) {
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
						const y = this.connectionState();
						if (JSON.stringify(y) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = y;
							for (const w of this.connectionStateSubscribers.values()) w(y);
						}
					});
				}),
				$t(this, "mark", (y) => {
					this.debug && _A(y, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && oO(e), (i = { ...i }));
			const o = i.authRefreshTokenLeewaySeconds ?? 10;
			let u = i.webSocketConstructor;
			if (!u && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((u = u || WebSocket),
				(this.debug = i.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					i.logger === !1
						? Fw({ verbose: i.verbose ?? !1 })
						: i.logger !== !0 && i.logger
							? i.logger
							: Zw({ verbose: i.verbose ?? !1 })));
			const l = e.search("://");
			if (l === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(l + 3),
				h = e.substring(0, l);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const g = `${m}://${f}/api/${Cb}/sync`;
			((this.state = new PO()),
				(this.remoteQuerySet = new Nb((y) => this.state.queryPath(y), this.logger)),
				(this.requestManager = new ZO(this.logger, this.markConnectionStateDirty)));
			const p = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new wA(
				this.state,
				{
					authenticate: (y) => {
						const w = this.state.setAuth(y);
						return (this.webSocketManager.sendMessage(w), w.baseVersion);
					},
					stopSocket: () => this.webSocketManager.stop(),
					tryRestartSocket: () => this.webSocketManager.tryRestart(),
					pauseSocket: p,
					resumeSocket: () => this.webSocketManager.resume(),
					clearAuth: () => {
						this.clearAuth();
					},
				},
				{ logger: this.logger, refreshTokenLeewaySeconds: o, initialAuthTokenReuse: i.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new XO()),
				this.addOnTransitionHandler((y) => {
					n(y.queries.map((w) => w.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = mA()));
			const { unsavedChangesWarning: b } = i;
			if (typeof window > "u" || typeof window.addEventListener > "u") {
				if (b === !0)
					throw new Error(
						"unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.",
					);
			} else
				b !== !1 &&
					window.addEventListener("beforeunload", (y) => {
						if (this.requestManager.hasIncompleteRequests()) {
							y.preventDefault();
							const w = "Are you sure you want to leave? Your changes may not be saved.";
							return (((y || window.event).returnValue = w), w);
						}
					});
			((this.webSocketManager = new hA(
				g,
				{
					onOpen: (y) => {
						(this.mark("convexWebSocketOpen"),
							this.webSocketManager.sendMessage({
								...y,
								type: "Connect",
								sessionId: this._sessionId,
								maxObservedTimestamp: this.maxObservedTimestamp,
							}),
							(this.remoteQuerySet = new Nb((T) => this.state.queryPath(T), this.logger)));
						const [w, E] = this.state.restart();
						(E && this.webSocketManager.sendMessage(E), this.webSocketManager.sendMessage(w));
						for (const T of this.requestManager.restart()) this.webSocketManager.sendMessage(T);
					},
					onResume: () => {
						const [y, w] = this.state.resume();
						(w && this.webSocketManager.sendMessage(w), y && this.webSocketManager.sendMessage(y));
						for (const E of this.requestManager.resume()) this.webSocketManager.sendMessage(E);
					},
					onMessage: (y) => {
						switch (
							(this.firstMessageReceived ||
								((this.firstMessageReceived = !0), this.mark("convexFirstMessageReceived"), this.reportMarks()),
							y.type)
						) {
							case "Transition": {
								(this.observedTimestamp(y.endVersion.ts),
									this.authenticationManager.onTransition(y),
									this.remoteQuerySet.transition(y),
									this.state.transition(y));
								const w = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
								this.notifyOnQueryResultChanges(w);
								break;
							}
							case "MutationResponse": {
								y.success && this.observedTimestamp(y.ts);
								const w = this.requestManager.onResponse(y);
								w !== null && this.notifyOnQueryResultChanges(new Map([[w.requestId, w.result]]));
								break;
							}
							case "ActionResponse":
								this.requestManager.onResponse(y);
								break;
							case "AuthError":
								this.authenticationManager.onAuthError(y);
								break;
							case "FatalError": {
								const w = UO(this.logger, y.error);
								throw (this.webSocketManager.terminate(), w);
							}
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: i.onServerDisconnectError,
				},
				u,
				this.logger,
				this.markConnectionStateDirty,
				this.debug,
			)),
				this.mark("convexClientConstructed"),
				i.expectAuth && p());
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
			for (const [u, l] of n) {
				const f = this.state.queryToken(u);
				if (f !== null) {
					const h = { result: l, udfPath: this.state.queryPath(u), args: this.state.queryArgs(u) };
					i.set(f, h);
				}
			}
			const o = this.optimisticQueryResults.ingestQueryResultsFromServer(i, new Set(e.keys()));
			this.handleTransition({
				queries: o.map((u) => ({
					token: u,
					modification: { kind: "Updated", result: this.optimisticQueryResults.rawQueryResult(u) },
				})),
				reflectedMutations: Array.from(e).map(([u, l]) => ({ requestId: u, result: l })),
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
					n = e ? Xw(e.value) : {};
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
			const o = oi(n),
				{ modification: u, queryToken: l, unsubscribe: f } = this.state.subscribe(e, o, i?.journal, i?.componentPath);
			return (
				u !== null && this.webSocketManager.sendMessage(u),
				{
					queryToken: l,
					unsubscribe: () => {
						const h = f();
						h && this.webSocketManager.sendMessage(h);
					},
				}
			);
		}
		localQueryResult(e, n) {
			const i = oi(n),
				o = Na(e, i);
			return this.optimisticQueryResults.queryResult(o);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const i = oi(n),
				o = Na(e, i);
			return this.optimisticQueryResults.queryLogs(o);
		}
		queryJournal(e, n) {
			const i = oi(n),
				o = Na(e, i);
			return this.state.queryJournal(o);
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
			const o = await this.mutationInternal(e, n, i);
			if (!o.success)
				throw o.errorData !== void 0 ? Nm(o, new Rm(Vo("mutation", e, o))) : new Error(Vo("mutation", e, o));
			return o.value;
		}
		async mutationInternal(e, n, i, o) {
			const { mutationPromise: u } = this.enqueueMutation(e, n, i, o);
			return u;
		}
		enqueueMutation(e, n, i, o) {
			const u = oi(n);
			this.tryReportLongDisconnect();
			const l = this.nextRequestId;
			if ((this._nextRequestId++, i !== void 0)) {
				const m = i.optimisticUpdate;
				if (m !== void 0) {
					const g = (b) => {
							m(b, u) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						p = this.optimisticQueryResults.applyOptimisticUpdate(g, l).map((b) => {
							const y = this.localQueryResultByToken(b);
							return {
								token: b,
								modification: {
									kind: "Updated",
									result: y === void 0 ? void 0 : { success: !0, value: y, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: p, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: l, udfPath: e, componentPath: o, args: [gr(u)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: l, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const i = await this.actionInternal(e, n);
			if (!i.success) throw i.errorData !== void 0 ? Nm(i, new Rm(Vo("action", e, i))) : new Error(Vo("action", e, i));
			return i.value;
		}
		async actionInternal(e, n, i) {
			const o = oi(n),
				u = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const l = { type: "Action", requestId: u, udfPath: e, componentPath: i, args: [gr(o)] },
				f = this.webSocketManager.sendMessage(l);
			return this.requestManager.request(l, f);
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
				const e = TA(this.sessionId);
				this.webSocketManager.sendMessage({ type: "Event", eventType: "ClientConnect", event: e });
			}
		}
		tryReportLongDisconnect() {
			if (!this.debug) return;
			const e = this.connectionState().timeOfOldestInflightRequest;
			if (e === null || Date.now() - e.getTime() <= 6e4) return;
			const n = `${this.address}/api/debug_event`;
			fetch(n, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${Cb}` },
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
function sm(e) {
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
var RA = Object.defineProperty,
	NA = (e, n, i) => (n in e ? RA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Ib = (e, n, i) => NA(e, typeof n != "symbol" ? n + "" : n, i),
	MA = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				Ib(this, "paginatedQuerySet", new Map()),
				Ib(this, "lastTransitionTs"),
				(this.lastTransitionTs = wu.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, n, i) {
			const o = Ia(e),
				u = xb(o, n, i),
				l = () => this.removePaginatedQuerySubscriber(u),
				f = this.paginatedQuerySet.get(u);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: u, unsubscribe: l })
				: (this.paginatedQuerySet.set(u, {
						token: u,
						canonicalizedUdfPath: o,
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
					this.addPageToPaginatedQuery(u, null, i.initialNumItems),
					{ paginatedQueryToken: u, unsubscribe: l });
		}
		localQueryResult(e, n, i) {
			const o = Ia(e),
				u = xb(o, n, i);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) return;
			const i = this.activePageQueryTokens(n);
			if (i.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let o = [],
				u = !1,
				l = !1;
			for (const h of i) {
				const m = this.client.localQueryResultByToken(h);
				if (m === void 0) {
					((u = !0), (l = !1));
					continue;
				}
				const g = sm(m);
				((o = o.concat(g.page)), (l = !!g.isDone));
			}
			let f;
			return (
				u ? (f = o.length === 0 ? "LoadingFirstPage" : "LoadingMore") : l ? (f = "Exhausted") : (f = "CanLoadMore"),
				{ results: o, status: f, loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) }
			);
		}
		onBaseTransition(e) {
			const n = e.queries.map((l) => l.token),
				i = this.queriesContainingTokens(n);
			let o = [];
			i.length > 0 &&
				(this.processPaginatedQuerySplits(i, (l) => this.client.localQueryResultByToken(l)),
				(o = i.map((l) => ({ token: l, modification: { kind: "Updated", result: this.localQueryResultByToken(l) } }))));
			const u = { ...e, paginatedQueries: o };
			this.onTransition(u);
		}
		loadMoreOfPaginatedQuery(e, n) {
			this.mustGetPaginatedQuery(e);
			const i = this.queryTokenForLastPageOfPaginatedQuery(e),
				o = this.client.localQueryResultByToken(i);
			if (!o) return !1;
			const u = sm(o);
			if (u.isDone) return !1;
			this.addPageToPaginatedQuery(e, u.continueCursor, n);
			const l = {
				timestamp: this.lastTransitionTs,
				reflectedMutations: [],
				queries: [],
				paginatedQueries: [{ token: e, modification: { kind: "Updated", result: this.localQueryResultByToken(e) } }],
			};
			return (this.onTransition(l), !0);
		}
		queriesContainingTokens(e) {
			if (e.length === 0) return [];
			const n = [],
				i = new Set(e);
			for (const [o, u] of this.paginatedQuerySet)
				for (const l of this.allQueryTokens(u))
					if (i.has(l)) {
						n.push(o);
						break;
					}
			return n;
		}
		processPaginatedQuerySplits(e, n) {
			for (const i of e) {
				const o = this.mustGetPaginatedQuery(i),
					{ ongoingSplits: u, pageKeyToQuery: l, pageKeys: f } = o;
				for (const [h, [m, g]] of u)
					n(l.get(m).queryToken) !== void 0 &&
						n(l.get(g).queryToken) !== void 0 &&
						this.completePaginatedQuerySplit(o, h, m, g);
				for (const h of f) {
					if (u.has(h)) continue;
					const m = l.get(h);
					if (!m) throw new Error(`No page query for active pageKey ${h}`);
					const g = n(m.queryToken);
					if (!g) continue;
					const p = sm(g);
					p.splitCursor &&
						(p.pageStatus === "SplitRecommended" ||
							p.pageStatus === "SplitRequired" ||
							p.page.length > o.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(o, h, m.cursor, p.splitCursor, p.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, n, i, o, u) {
			const l = e.nextPageKey++,
				f = e.nextPageKey++,
				h = { numItems: e.options.initialNumItems, id: e.id },
				m = this.client.subscribe(e.canonicalizedUdfPath, {
					...e.args,
					paginationOpts: { ...h, cursor: i, endCursor: o },
				});
			e.pageKeyToQuery.set(l, { ...m, cursor: i });
			const g = this.client.subscribe(e.canonicalizedUdfPath, {
				...e.args,
				paginationOpts: { ...h, cursor: o, endCursor: u },
			});
			(e.pageKeyToQuery.set(f, { ...g, cursor: o }), e.ongoingSplits.set(n, [l, f]));
		}
		addPageToPaginatedQuery(e, n, i) {
			const o = this.mustGetPaginatedQuery(e),
				u = o.nextPageKey++,
				l = { cursor: n, numItems: i, id: o.id },
				f = { ...o.args, paginationOpts: l },
				h = this.client.subscribe(o.canonicalizedUdfPath, f);
			return (o.pageKeys.push(u), o.pageKeyToQuery.set(u, { ...h, cursor: n }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const n = this.paginatedQuerySet.get(e);
			if (n && ((n.numSubscribers -= 1), !(n.numSubscribers > 0))) {
				for (const i of n.pageKeyToQuery.values()) i.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, n, i, o) {
			const u = e.pageKeyToQuery.get(n);
			e.pageKeyToQuery.delete(n);
			const l = e.pageKeys.indexOf(n);
			(e.pageKeys.splice(l, 1, i, o), e.ongoingSplits.delete(n), u.unsubscribe());
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
	_ = Jx(tf(), 1);
function Jw({ getCurrentValue: e, subscribe: n }) {
	const [i, o] = (0, _.useState)(() => ({ getCurrentValue: e, subscribe: n, value: e() }));
	let u = i.value;
	return (
		(i.getCurrentValue !== e || i.subscribe !== n) && ((u = e()), o({ getCurrentValue: e, subscribe: n, value: u })),
		(0, _.useEffect)(() => {
			let l = !1;
			const f = () => {
					l ||
						o((m) => {
							if (m.getCurrentValue !== e || m.subscribe !== n) return m;
							const g = e();
							return m.value === g ? m : { ...m, value: g };
						});
				},
				h = n(f);
			return (
				f(),
				() => {
					((l = !0), h());
				}
			);
		}, [e, n]),
		u
	);
}
var DA = Object.defineProperty,
	zA = (e, n, i) => (n in e ? DA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	ri = (e, n, i) => zA(e, typeof n != "symbol" ? n + "" : n, i),
	IA = 5e3;
if (typeof _.default > "u") throw new Error("Required dependency 'react' not found");
function Ww(e, n, i) {
	function o(u) {
		return (LA(u), n.mutation(e, u, { optimisticUpdate: i }));
	}
	return (
		(o.withOptimisticUpdate = function (l) {
			if (i !== void 0) throw new Error(`Already specified optimistic update for mutation ${yn(e)}`);
			return Ww(e, n, l);
		}),
		o
	);
}
function jA(e, n) {
	return function (i) {
		return n.action(e, i);
	};
}
var eE = class {
		constructor(e, n) {
			if (
				(ri(this, "address"),
				ri(this, "cachedSync"),
				ri(this, "cachedPaginatedQueryClient"),
				ri(this, "listeners"),
				ri(this, "options"),
				ri(this, "closed", !1),
				ri(this, "_logger"),
				ri(this, "adminAuth"),
				ri(this, "fakeUserIdentity"),
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
						? Fw({ verbose: n?.verbose ?? !1 })
						: n?.logger !== !0 && n?.logger
							? n.logger
							: Zw({ verbose: n?.verbose ?? !1 })),
				(this.options = { ...n, logger: this._logger }));
		}
		get url() {
			return this.address;
		}
		get sync() {
			if (this.closed) throw new Error("ConvexReactClient has already been closed.");
			return this.cachedSync
				? this.cachedSync
				: ((this.cachedSync = this.options.baseClient ?? new AA(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new MA(this.cachedSync, (e) => this.handleTransition(e))),
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
			const [i, o] = n,
				u = yn(e);
			return {
				onUpdate: (l) => {
					const { queryToken: f, unsubscribe: h } = this.sync.subscribe(u, i, o),
						m = this.listeners.get(f);
					return (
						m !== void 0 ? m.add(l) : this.listeners.set(f, new Set([l])),
						() => {
							if (this.closed) return;
							const g = this.listeners.get(f);
							(g.delete(l), g.size === 0 && this.listeners.delete(f), h());
						}
					);
				},
				localQueryResult: () => {
					if (this.cachedSync) return this.cachedSync.localQueryResult(u, i);
				},
				localQueryLogs: () => {
					if (this.cachedSync) return this.cachedSync.localQueryLogs(u, i);
				},
				journal: () => {
					if (this.cachedSync) return this.cachedSync.queryJournal(u, i);
				},
			};
		}
		prewarmQuery(e) {
			const n = e.extendSubscriptionFor ?? IA,
				i = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(i, n);
		}
		watchPaginatedQuery(e, n, i) {
			const o = yn(e);
			return {
				onUpdate: (u) => {
					const { paginatedQueryToken: l, unsubscribe: f } = this.paginatedQueryClient.subscribe(o, n || {}, i),
						h = this.listeners.get(l);
					return (
						h !== void 0 ? h.add(u) : this.listeners.set(l, new Set([u])),
						() => {
							if (this.closed) return;
							const m = this.listeners.get(l);
							(m.delete(u), m.size === 0 && this.listeners.delete(l), f());
						}
					);
				},
				localQueryResult: () => this.paginatedQueryClient.localQueryResult(o, n, i),
			};
		}
		mutation(e, ...n) {
			const [i, o] = n,
				u = yn(e);
			return this.sync.mutation(u, i, o);
		}
		action(e, ...n) {
			const i = yn(e);
			return this.sync.action(i, ...n);
		}
		query(e, ...n) {
			const i = this.watchQuery(e, ...n),
				o = i.localQueryResult();
			return o !== void 0
				? Promise.resolve(o)
				: new Promise((u, l) => {
						const f = i.onUpdate(() => {
							f();
							try {
								u(i.localQueryResult());
							} catch (h) {
								l(h);
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
			const n = e.queries.map((o) => o.token),
				i = e.paginatedQueries.map((o) => o.token);
			this.transition([...n, ...i]);
		}
		transition(e) {
			for (const n of e) {
				const i = this.listeners.get(n);
				if (i) for (const o of i) o();
			}
		}
	},
	Eu = _.createContext(void 0);
function Ba() {
	return (0, _.useContext)(Eu);
}
var kA = ({ client: e, children: n }) => _.createElement(Eu.Provider, { value: e }, n);
function Po(e, ...n) {
	const i = n[0] === "skip",
		o = n[0] === "skip" ? {} : oi(n[0]),
		u = typeof e == "string" ? ng(e) : e,
		l = yn(u),
		f = (0, _.useMemo)(() => (i ? {} : { query: { query: u, args: o } }), [JSON.stringify(gr(o)), l, i]),
		h = rg(f).query;
	if (h instanceof Error) throw h;
	return h;
}
function Ma(e) {
	const n = typeof e == "string" ? ng(e) : e,
		i = (0, _.useContext)(Eu);
	if (i === void 0)
		throw new Error(
			"Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, _.useMemo)(() => Ww(n, i), [i, yn(n)]);
}
function tE(e) {
	const n = (0, _.useContext)(Eu),
		i = typeof e == "string" ? ng(e) : e;
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, _.useMemo)(() => jA(i, n), [n, yn(i)]);
}
function qA() {
	const e = (0, _.useContext)(Eu);
	if (e === void 0)
		throw new Error(
			"Could not find Convex client! `useConvexConnectionState` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	const n = (0, _.useCallback)(() => e.connectionState(), [e]),
		i = (0, _.useCallback)(
			(o) =>
				e.subscribeToConnectionState(() => {
					o();
				}),
			[e],
		);
	return Jw({ getCurrentValue: n, subscribe: i });
}
function LA(e) {
	if (typeof e == "object" && e !== null && "bubbles" in e && "persist" in e && "isDefaultPrevented" in e)
		throw new Error(
			"Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like `const handler = () => myMutation();` and using `handler` in the event handler.",
		);
}
var UA = Object.defineProperty,
	VA = (e, n, i) => (n in e ? UA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	um = (e, n, i) => VA(e, typeof n != "symbol" ? n + "" : n, i),
	BA = class {
		constructor(e) {
			(um(this, "createWatch"),
				um(this, "queries"),
				um(this, "listeners"),
				(this.createWatch = e),
				(this.queries = {}),
				(this.listeners = new Set()));
		}
		setQueries(e) {
			for (const n of Object.keys(e)) {
				const { query: i, args: o, paginationOptions: u } = e[n];
				if ((yn(i), this.queries[n] === void 0)) this.addQuery(n, i, o, u ? { paginationOptions: u } : {});
				else {
					const l = this.queries[n];
					(yn(i) !== yn(l.query) ||
						JSON.stringify(gr(o)) !== JSON.stringify(gr(l.args)) ||
						JSON.stringify(u) !== JSON.stringify(l.paginationOptions)) &&
						(this.removeQuery(n), this.addQuery(n, i, o, u ? { paginationOptions: u } : {}));
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
				const { query: o, args: u } = e[i],
					l = e[i].paginationOptions;
				yn(o);
				const f = this.createWatch(o, u, l ? { paginationOptions: l } : {});
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
				const { query: i, args: o, watch: u, paginationOptions: l } = this.queries[n],
					f = "journal" in u ? u.journal() : void 0;
				(this.removeQuery(n),
					this.addQuery(n, i, o, { ...(f ? { journal: f } : []), ...(l ? { paginationOptions: l } : {}) }));
			}
		}
		destroy() {
			for (const e of Object.keys(this.queries)) this.removeQuery(e);
			this.listeners = new Set();
		}
		addQuery(e, n, i, { paginationOptions: o, journal: u }) {
			if (this.queries[e] !== void 0)
				throw new Error(`Tried to add a new query with identifier ${e} when it already exists.`);
			const l = this.createWatch(n, i, { ...(u ? { journal: u } : []), ...(o ? { paginationOptions: o } : {}) }),
				f = l.onUpdate(() => this.notifyListeners());
			this.queries[e] = { query: n, args: i, watch: l, unsubscribe: f, ...(o ? { paginationOptions: o } : {}) };
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
function rg(e) {
	const n = Ba();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return PA(
		e,
		(0, _.useMemo)(
			() =>
				(i, o, { journal: u, paginationOptions: l }) =>
					l ? n.watchPaginatedQuery(i, o, l) : n.watchQuery(i, o, u ? { journal: u } : {}),
			[n],
		),
	);
}
function PA(e, n) {
	const [i] = (0, _.useState)(() => new BA(n));
	(i.createWatch !== n && i.setCreateWatch(n), (0, _.useEffect)(() => () => i.destroy(), [i]));
	const o = (0, _.useMemo)(
		() => ({ getCurrentValue: () => i.getLocalResults(e), subscribe: (u) => (i.setQueries(e), i.subscribe(u)) }),
		[i, e],
	);
	return Jw(o);
}
function nE(e, n) {
	return new Proxy(
		{},
		{
			get(i, o) {
				if (typeof o == "string") return nE(e, [...n, o]);
				if (o === Qw) {
					if (n.length < 1) {
						const u = [e, ...n].join(".");
						throw new Error(
							`API path is expected to be of the form \`${e}.childComponent.functionName\`. Found: \`${u}\``,
						);
					}
					return "_reference/childComponent/" + n.join("/");
				} else return;
			},
		},
	);
}
var $A = () => nE("components", []),
	HA = Kw,
	jb = 6e4,
	ZA = 500,
	FA = 1e4,
	QA = 1e3,
	YA = 3e4,
	KA = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function kb(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e;
	if ((n.mode !== "light" && n.mode !== "dark") || typeof n.tokens != "object" || n.tokens === null) return null;
	const i = {};
	for (const [o, u] of Object.entries(n.tokens)) {
		if (typeof u != "string") return null;
		i[o] = u;
	}
	return { mode: n.mode, tokens: i };
}
function qb(e) {
	const n = document.documentElement;
	for (const [i, o] of Object.entries(e.tokens)) n.style.setProperty(i, o);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function GA(e) {
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
function XA() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const n = new URLSearchParams(e),
		i = n.getAll("parentOrigin"),
		o = n.getAll("nonce");
	if (n.size !== 2 || i.length !== 1 || o.length !== 1) throw new Error("Invalid host bridge fragment");
	const u = i[0],
		l = o[0];
	let f;
	try {
		f = new URL(u);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if ((f.protocol !== "http:" && f.protocol !== "https:") || f.origin !== u)
		throw new Error("Invalid host bridge parent origin");
	if (!KA.test(l)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: u, nonce: l };
}
async function JA() {
	const { parentOrigin: e, nonce: n } = XA();
	let i = "",
		o = "",
		u = 0,
		l = "",
		f = 0,
		h = null;
	const m = new Set(),
		g = new Map(),
		p = new Map();
	let b = null;
	async function y() {
		return Date.now() >= u - jb ? w() : o;
	}
	function w() {
		if (b) return b;
		const N = crypto.randomUUID();
		return (
			(b = new Promise((D, k) => {
				const O = setTimeout(() => {
					(p.delete(N), k(new Error("Plugin frame token refresh timed out")));
				}, FA);
				p.set(N, { resolve: D, reject: k, timeout: O });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: N }, e);
				} catch (L) {
					(clearTimeout(O), p.delete(N), k(L));
				}
			}).finally(() => {
				b = null;
			})),
			b
		);
	}
	const E = () => l !== "" && Date.now() < f - jb,
		T = (N) => {
			typeof N.jwt == "string" && typeof N.jwtExpiresAt == "number" && Number.isFinite(N.jwtExpiresAt)
				? ((l = N.jwt), (f = N.jwtExpiresAt))
				: ((l = ""), (f = 0));
		};
	async function x(N, D, k) {
		const O = JSON.stringify(D),
			L = (P) => {
				const F = new Headers(k?.headers);
				return (
					F.set("Authorization", `Bearer ${P}`),
					F.set("Content-Type", "application/json"),
					F.set("Accept", "application/json"),
					fetch(i + N, { ...k, method: "POST", body: O, headers: F, redirect: "error" })
				);
			},
			H = await y();
		let te = await L(H);
		te.status === 401 && (te = await L(o !== H ? o : await w()));
		const R = await te.text();
		let q = null;
		try {
			q = JSON.parse(R);
		} catch {}
		return { status: te.status, body: q };
	}
	async function z(N) {
		const D = new Headers(N);
		return (D.set("Authorization", `Bearer ${await y()}`), D);
	}
	const M = (N) =>
		fetch(i + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: N }),
		});
	async function A(N) {
		const D = N?.forceRefreshToken === !0;
		for (let k = 0; ; k += 1) {
			if (E() && !D) return l;
			let O = null;
			try {
				if (l !== "" && (await w(), E())) return l;
				((O = await M(await y())), O.status === 401 && (O = await M(await w())));
			} catch {
				O = null;
			}
			if (O?.ok) {
				const L = await O.json().catch(() => null),
					H = L?._yay?.jwt,
					te = L?._yay?.sessionExpiresAt;
				return typeof H != "string" || typeof te != "number" ? null : ((u = te), (l = H), (f = te), H);
			}
			if (!(O === null || O.status === 429 || O.status >= 500) || k >= 2) return null;
			await new Promise((L) => setTimeout(L, 1e3 * (k + 1)));
		}
	}
	return new Promise((N) => {
		let D = !1,
			k;
		const O = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			L = () => {
				clearInterval(k);
			},
			H = (te) => {
				if (te.source !== window.parent || te.origin !== e) return;
				const R = te.data;
				if (!(typeof R != "object" || R === null)) {
					if (
						R.type === "bonobo:init" &&
						!D &&
						R.nonce === n &&
						typeof R.apiOrigin == "string" &&
						typeof R.convexUrl == "string" &&
						typeof R.token == "string" &&
						typeof R.tokenExpiresAt == "number" &&
						Number.isFinite(R.tokenExpiresAt) &&
						GA(R.context)
					) {
						((D = !0),
							L(),
							window.removeEventListener("pagehide", L),
							(i = R.apiOrigin),
							(o = R.token),
							(u = R.tokenExpiresAt),
							T(R));
						const q = new eE(R.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let P = Date.now();
						const F = setInterval(() => {
							const Y = Date.now();
							(Y - P >= YA && q.setAuth(A), (P = Y));
						}, QA);
						(q.setAuth(A),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(F), q.close());
								},
								{ once: !0 },
							),
							(h = kb(R.theme)),
							h && qb(h),
							N({
								context: R.context,
								apiOrigin: i,
								getToken: y,
								refreshToken: w,
								fetchJson: x,
								authorize: z,
								convex: q,
								api: HA,
								session: { expiresAt: () => u, fetchJwt: A },
								theme: {
									current: () => h,
									subscribe(Y) {
										return (
											m.add(Y),
											() => {
												m.delete(Y);
											}
										);
									},
								},
								agent: {
									registerTool(Y, B) {
										return (
											g.set(Y, B),
											() => {
												g.get(Y) === B && g.delete(Y);
											}
										);
									},
								},
							}));
					} else if (
						D &&
						R.nonce === n &&
						R.type === "bonobo:token" &&
						typeof R.requestId == "string" &&
						typeof R.token == "string" &&
						typeof R.tokenExpiresAt == "number" &&
						Number.isFinite(R.tokenExpiresAt)
					) {
						const q = p.get(R.requestId);
						q &&
							(p.delete(R.requestId),
							clearTimeout(q.timeout),
							(o = R.token),
							(u = R.tokenExpiresAt),
							T(R),
							q.resolve(R.token));
					} else if (D && R.nonce === n && R.type === "bonobo:theme") {
						const q = kb(R.theme);
						if (q) {
							((h = q), qb(q));
							for (const P of m) P(q);
						}
					} else if (
						D &&
						R.nonce === n &&
						R.type === "bonobo:token-error" &&
						typeof R.requestId == "string" &&
						typeof R.message == "string"
					) {
						const q = p.get(R.requestId);
						q && (p.delete(R.requestId), clearTimeout(q.timeout), q.reject(new Error(R.message)));
					} else if (
						D &&
						R.nonce === n &&
						R.type === "bonobo:agent-tool-call" &&
						typeof R.callId == "string" &&
						typeof R.toolName == "string"
					) {
						const q = R.callId,
							P = (Y) => {
								try {
									window.parent.postMessage({ type: "bonobo:agent-tool-result", nonce: n, callId: q, ...Y }, e);
								} catch {
									window.parent.postMessage(
										{
											type: "bonobo:agent-tool-result",
											nonce: n,
											callId: q,
											ok: !1,
											error: "The tool output could not be sent",
										},
										e,
									);
								}
							},
							F = g.get(R.toolName);
						F
							? Promise.resolve()
									.then(() => F(R.input))
									.then(
										(Y) => P({ ok: !0, output: Y }),
										(Y) => P({ ok: !1, error: Y instanceof Error ? Y.message : String(Y) }),
									)
							: P({ ok: !1, error: `This page has no tool named ${R.toolName}` });
					}
				}
			};
		(window.addEventListener("message", H),
			window.addEventListener("pagehide", L, { once: !0 }),
			O(),
			(k = setInterval(O, ZA)));
	});
}
var WA = sr((e) => {
		function n(B, ne) {
			var re = B.length;
			B.push(ne);
			e: for (; 0 < re;) {
				var U = (re - 1) >>> 1,
					ee = B[U];
				if (0 < u(ee, ne)) ((B[U] = ne), (B[re] = ee), (re = U));
				else break e;
			}
		}
		function i(B) {
			return B.length === 0 ? null : B[0];
		}
		function o(B) {
			if (B.length === 0) return null;
			var ne = B[0],
				re = B.pop();
			if (re !== ne) {
				B[0] = re;
				e: for (var U = 0, ee = B.length, K = ee >>> 1; U < K;) {
					var ue = 2 * (U + 1) - 1,
						xe = B[ue],
						ve = ue + 1,
						j = B[ve];
					if (0 > u(xe, re))
						ve < ee && 0 > u(j, xe) ? ((B[U] = j), (B[ve] = re), (U = ve)) : ((B[U] = xe), (B[ue] = re), (U = ue));
					else if (ve < ee && 0 > u(j, re)) ((B[U] = j), (B[ve] = re), (U = ve));
					else break e;
				}
			}
			return ne;
		}
		function u(B, ne) {
			var re = B.sortIndex - ne.sortIndex;
			return re !== 0 ? re : B.id - ne.id;
		}
		if (((e.unstable_now = void 0), typeof performance == "object" && typeof performance.now == "function")) {
			var l = performance;
			e.unstable_now = function () {
				return l.now();
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
			p = 1,
			b = null,
			y = 3,
			w = !1,
			E = !1,
			T = !1,
			x = !1,
			z = typeof setTimeout == "function" ? setTimeout : null,
			M = typeof clearTimeout == "function" ? clearTimeout : null,
			A = typeof setImmediate < "u" ? setImmediate : null;
		function N(B) {
			for (var ne = i(g); ne !== null;) {
				if (ne.callback === null) o(g);
				else if (ne.startTime <= B) (o(g), (ne.sortIndex = ne.expirationTime), n(m, ne));
				else break;
				ne = i(g);
			}
		}
		function D(B) {
			if (((T = !1), N(B), !E))
				if (i(m) !== null) ((E = !0), k || ((k = !0), q()));
				else {
					var ne = i(g);
					ne !== null && Y(D, ne.startTime - B);
				}
		}
		var k = !1,
			O = -1,
			L = 5,
			H = -1;
		function te() {
			return x ? !0 : !(e.unstable_now() - H < L);
		}
		function R() {
			if (((x = !1), k)) {
				var B = e.unstable_now();
				H = B;
				var ne = !0;
				try {
					e: {
						((E = !1), T && ((T = !1), M(O), (O = -1)), (w = !0));
						var re = y;
						try {
							t: {
								for (N(B), b = i(m); b !== null && !(b.expirationTime > B && te());) {
									var U = b.callback;
									if (typeof U == "function") {
										((b.callback = null), (y = b.priorityLevel));
										var ee = U(b.expirationTime <= B);
										if (((B = e.unstable_now()), typeof ee == "function")) {
											((b.callback = ee), N(B), (ne = !0));
											break t;
										}
										(b === i(m) && o(m), N(B));
									} else o(m);
									b = i(m);
								}
								if (b !== null) ne = !0;
								else {
									var K = i(g);
									(K !== null && Y(D, K.startTime - B), (ne = !1));
								}
							}
							break e;
						} finally {
							((b = null), (y = re), (w = !1));
						}
						ne = void 0;
					}
				} finally {
					ne ? q() : (k = !1);
				}
			}
		}
		var q;
		if (typeof A == "function")
			q = function () {
				A(R);
			};
		else if (typeof MessageChannel < "u") {
			var P = new MessageChannel(),
				F = P.port2;
			((P.port1.onmessage = R),
				(q = function () {
					F.postMessage(null);
				}));
		} else
			q = function () {
				z(R, 0);
			};
		function Y(B, ne) {
			O = z(function () {
				B(e.unstable_now());
			}, ne);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (B) {
				B.callback = null;
			}),
			(e.unstable_forceFrameRate = function (B) {
				0 > B || 125 < B
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (L = 0 < B ? Math.floor(1e3 / B) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return y;
			}),
			(e.unstable_next = function (B) {
				switch (y) {
					case 1:
					case 2:
					case 3:
						var ne = 3;
						break;
					default:
						ne = y;
				}
				var re = y;
				y = ne;
				try {
					return B();
				} finally {
					y = re;
				}
			}),
			(e.unstable_requestPaint = function () {
				x = !0;
			}),
			(e.unstable_runWithPriority = function (B, ne) {
				switch (B) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						B = 3;
				}
				var re = y;
				y = B;
				try {
					return ne();
				} finally {
					y = re;
				}
			}),
			(e.unstable_scheduleCallback = function (B, ne, re) {
				var U = e.unstable_now();
				switch (
					(typeof re == "object" && re !== null
						? ((re = re.delay), (re = typeof re == "number" && 0 < re ? U + re : U))
						: (re = U),
					B)
				) {
					case 1:
						var ee = -1;
						break;
					case 2:
						ee = 250;
						break;
					case 5:
						ee = 1073741823;
						break;
					case 4:
						ee = 1e4;
						break;
					default:
						ee = 5e3;
				}
				return (
					(ee = re + ee),
					(B = { id: p++, callback: ne, priorityLevel: B, startTime: re, expirationTime: ee, sortIndex: -1 }),
					re > U
						? ((B.sortIndex = re),
							n(g, B),
							i(m) === null && B === i(g) && (T ? (M(O), (O = -1)) : (T = !0), Y(D, re - U)))
						: ((B.sortIndex = ee), n(m, B), E || w || ((E = !0), k || ((k = !0), q()))),
					B
				);
			}),
			(e.unstable_shouldYield = te),
			(e.unstable_wrapCallback = function (B) {
				var ne = y;
				return function () {
					var re = y;
					y = ne;
					try {
						return B.apply(this, arguments);
					} finally {
						y = re;
					}
				};
			}));
	}),
	eR = sr((e, n) => {
		n.exports = WA();
	}),
	tR = sr((e) => {
		var n = tf();
		function i(b) {
			var y = "https://react.dev/errors/" + b;
			if (1 < arguments.length) {
				y += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var w = 2; w < arguments.length; w++) y += "&args[]=" + encodeURIComponent(arguments[w]);
			}
			return (
				"Minified React error #" +
				b +
				"; visit " +
				y +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function o() {}
		var u = {
				d: {
					f: o,
					r: function () {
						throw Error(i(522));
					},
					D: o,
					C: o,
					L: o,
					m: o,
					X: o,
					S: o,
					M: o,
				},
				p: 0,
				findDOMNode: null,
			},
			l = Symbol.for("react.portal"),
			f = Symbol.for("react.recoverable"),
			h = Symbol.for("react.optimistic_key");
		function m(b, y, w) {
			var E = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return {
				$$typeof: l,
				key: E == null ? null : E === h ? h : "" + E,
				children: b,
				containerInfo: y,
				implementation: w,
			};
		}
		var g = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function p(b, y) {
			if (b === "font") return "";
			if (typeof y == "string") return y === "use-credentials" ? y : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
			(e.browser = function (b) {
				return { $$typeof: f, _reason: b };
			}),
			(e.createPortal = function (b, y) {
				var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(i(299));
				return m(b, y, null, w);
			}),
			(e.flushSync = function (b) {
				var y = g.T,
					w = u.p;
				try {
					if (((g.T = null), (u.p = 2), b)) return b();
				} finally {
					((g.T = y), (u.p = w), u.d.f());
				}
			}),
			(e.preconnect = function (b, y) {
				typeof b == "string" &&
					(y
						? ((y = y.crossOrigin), (y = typeof y == "string" ? (y === "use-credentials" ? y : "") : void 0))
						: (y = null),
					u.d.C(b, y));
			}),
			(e.prefetchDNS = function (b) {
				typeof b == "string" && u.d.D(b);
			}),
			(e.preinit = function (b, y) {
				if (typeof b == "string" && y && typeof y.as == "string") {
					var w = y.as,
						E = p(w, y.crossOrigin),
						T = typeof y.integrity == "string" ? y.integrity : void 0,
						x = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
					w === "style"
						? u.d.S(b, typeof y.precedence == "string" ? y.precedence : void 0, {
								crossOrigin: E,
								integrity: T,
								fetchPriority: x,
							})
						: w === "script" &&
							u.d.X(b, {
								crossOrigin: E,
								integrity: T,
								fetchPriority: x,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							});
				}
			}),
			(e.preinitModule = function (b, y) {
				if (typeof b == "string")
					if (typeof y == "object" && y !== null) {
						if (y.as == null || y.as === "script") {
							var w = p(y.as, y.crossOrigin);
							u.d.M(b, {
								crossOrigin: w,
								integrity: typeof y.integrity == "string" ? y.integrity : void 0,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
								fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
							});
						}
					} else y ?? u.d.M(b);
			}),
			(e.preload = function (b, y) {
				if (typeof b == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
					var w = y.as,
						E = p(w, y.crossOrigin);
					u.d.L(b, w, {
						crossOrigin: E,
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
			(e.preloadModule = function (b, y) {
				if (typeof b == "string")
					if (y) {
						var w = p(y.as, y.crossOrigin);
						u.d.m(b, {
							as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
							crossOrigin: w,
							integrity: typeof y.integrity == "string" ? y.integrity : void 0,
							nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
						});
					} else u.d.m(b);
			}),
			(e.requestFormReset = function (b) {
				u.d.r(b);
			}),
			(e.unstable_batchedUpdates = function (b, y) {
				return b(y);
			}),
			(e.useFormState = function (b, y, w) {
				return g.H.useFormState(b, y, w);
			}),
			(e.useFormStatus = function () {
				return g.H.useHostTransitionStatus();
			}),
			(e.version = "19.3.1"));
	}),
	rE = sr((e, n) => {
		function i() {
			if (!(
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
			))
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
				} catch (o) {
					console.error(o);
				}
		}
		(i(), (n.exports = tR()));
	}),
	nR = sr((e) => {
		var n = eR(),
			i = tf(),
			o = rE();
		function u(t) {
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
		function l(t) {
			return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
		}
		function f(t) {
			for (var r = t, a = r; a && !a.alternate;) ((r = a), (r.flags & 4098) !== 0 && (t = r.return), (a = r.return));
			for (; r.return;) r = r.return;
			return r.tag === 3 ? t : null;
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
		function g(t) {
			if (f(t) !== t) throw Error(u(188));
		}
		function p(t) {
			var r = t.alternate;
			if (!r) {
				if (((r = f(t)), r === null)) throw Error(u(188));
				return r !== t ? null : t;
			}
			for (var a = t, s = r; ;) {
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
					for (d = c.child; d;) {
						if (d === a) return (g(c), t);
						if (d === s) return (g(c), r);
						d = d.sibling;
					}
					throw Error(u(188));
				}
				if (a.return !== s.return) ((a = c), (s = d));
				else {
					for (var v = !1, C = c.child; C;) {
						if (C === a) {
							((v = !0), (a = c), (s = d));
							break;
						}
						if (C === s) {
							((v = !0), (s = c), (a = d));
							break;
						}
						C = C.sibling;
					}
					if (!v) {
						for (C = d.child; C;) {
							if (C === a) {
								((v = !0), (a = d), (s = c));
								break;
							}
							if (C === s) {
								((v = !0), (s = d), (a = c));
								break;
							}
							C = C.sibling;
						}
						if (!v) throw Error(u(189));
					}
				}
				if (a.alternate !== s) throw Error(u(190));
			}
			if (a.tag !== 3) throw Error(u(188));
			return a.stateNode.current === a ? t : r;
		}
		function b(t) {
			var r = t.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return t;
			for (t = t.child; t !== null;) {
				if (((r = b(t)), r !== null)) return r;
				t = t.sibling;
			}
			return null;
		}
		function y(t, r, a, s, c, d) {
			for (; t !== null;) {
				if (
					((t.tag === 5 || t.tag === 27 || t.tag === 6) && a(t, s, c, d)) ||
					((t.tag !== 22 || t.memoizedState === null) &&
						(r || (t.tag !== 5 && t.tag !== 27)) &&
						y(t.child, r, a, s, c, d))
				)
					return !0;
				t = t.sibling;
			}
			return !1;
		}
		function w(t) {
			for (t = t.return; t !== null;) {
				if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
				t = t.return;
			}
			return null;
		}
		function E(t) {
			var r = !1;
			for (t = t.return; t !== null && (t.tag === 4 && (r = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27));)
				t = t.return;
			return r;
		}
		function T(t) {
			var r = [null, null],
				a = w(t);
			return (a === null || x(r, t, a.child, { foundSelf: !1 }), r);
		}
		function x(t, r, a, s) {
			for (; a !== null;) {
				if (a === r) s.foundSelf = !0;
				else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
					if (s.foundSelf) return ((t[1] = a), !0);
					t[0] = a;
				} else if ((a.tag !== 22 || a.memoizedState === null) && x(t, r, a.child, s)) return !0;
				a = a.sibling;
			}
			return !1;
		}
		function z(t) {
			switch (t.tag) {
				case 5:
				case 27:
				case 6:
					return t.stateNode;
				case 3:
					return t.stateNode.containerInfo;
				default:
					throw Error(u(559));
			}
		}
		var M = null,
			A = null;
		function N(t, r, a) {
			return t === a ? !0 : t === r ? ((M = t), !0) : !1;
		}
		function D(t, r, a) {
			return t === a ? ((A = t), !1) : t === r ? (A !== null && (M = t), !0) : !1;
		}
		function k(t) {
			if (t === null) return null;
			do t = t === null ? null : t.return;
			while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
			return t || null;
		}
		function O(t, r, a) {
			for (var s = 0, c = t; c; c = a(c)) s++;
			c = 0;
			for (var d = r; d; d = a(d)) c++;
			for (; 0 < s - c;) ((t = a(t)), s--);
			for (; 0 < c - s;) ((r = a(r)), c--);
			for (; s--;) {
				if (t === r || (r !== null && t === r.alternate)) return t;
				((t = a(t)), (r = a(r)));
			}
			return null;
		}
		var L = Object.assign,
			H = Symbol.for("react.element"),
			te = Symbol.for("react.transitional.element"),
			R = Symbol.for("react.portal"),
			q = Symbol.for("react.fragment"),
			P = Symbol.for("react.strict_mode"),
			F = Symbol.for("react.profiler"),
			Y = Symbol.for("react.consumer"),
			B = Symbol.for("react.context"),
			ne = Symbol.for("react.forward_ref"),
			re = Symbol.for("react.suspense"),
			U = Symbol.for("react.suspense_list"),
			ee = Symbol.for("react.memo"),
			K = Symbol.for("react.lazy"),
			ue = Symbol.for("react.activity"),
			xe = Symbol.for("react.legacy_hidden"),
			ve = Symbol.for("react.memo_cache_sentinel"),
			j = Symbol.for("react.view_transition"),
			ae = Symbol.for("react.recoverable"),
			W = Symbol.iterator;
		function fe(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (W && t[W]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var Ee = Symbol.for("react.client.reference");
		function _e(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === Ee ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case q:
					return "Fragment";
				case F:
					return "Profiler";
				case P:
					return "StrictMode";
				case re:
					return "Suspense";
				case U:
					return "SuspenseList";
				case ue:
					return "Activity";
				case j:
					return "ViewTransition";
			}
			if (typeof t == "object")
				switch (t.$$typeof) {
					case R:
						return "Portal";
					case B:
						return t.displayName || "Context";
					case Y:
						return (t._context.displayName || "Context") + ".Consumer";
					case ne:
						var r = t.render;
						return (
							(t = t.displayName),
							t || ((t = r.displayName || r.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case ee:
						return ((r = t.displayName || null), r !== null ? r : _e(t.type) || "Memo");
					case K:
						((r = t._payload), (t = t._init));
						try {
							return _e(t(r));
						} catch {}
				}
			return null;
		}
		var Ce = Array.isArray,
			ce = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ye = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			Ge = { pending: !1, data: null, method: null, action: null },
			ct = [],
			mt = -1;
		function _t(t) {
			return { current: t };
		}
		function et(t) {
			0 > mt || ((t.current = ct[mt]), (ct[mt] = null), mt--);
		}
		function Ue(t, r) {
			(mt++, (ct[mt] = t.current), (t.current = r));
		}
		var Qe = _t(null),
			dn = _t(null),
			At = _t(null),
			Fn = _t(null);
		function Qn(t, r) {
			switch ((Ue(At, r), Ue(dn, t), Ue(Qe, null), r.nodeType)) {
				case 9:
				case 11:
					t = (t = r.documentElement) && (t = t.namespaceURI) ? Np(t) : 0;
					break;
				default:
					if (((t = r.tagName), (r = r.namespaceURI))) ((r = Np(r)), (t = Mp(r, t)));
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
			(et(Qe), Ue(Qe, t));
		}
		function Ct() {
			(et(Qe), et(dn), et(At));
		}
		function qt(t) {
			var r = t.memoizedState;
			(r !== null && ((zo._currentValue = r.memoizedState), Ue(Fn, t)), (r = Qe.current));
			var a = Mp(r, t.type);
			r !== a && (Ue(dn, t), Ue(Qe, a));
		}
		function hn(t) {
			(dn.current === t && (et(Qe), et(dn)), Fn.current === t && (et(Fn), (zo._currentValue = Ge)));
		}
		var Qt, he;
		function Te(t) {
			if (Qt === void 0)
				try {
					throw Error();
				} catch (a) {
					var r = a.stack.trim().match(/\n( *(at )?)/);
					((Qt = (r && r[1]) || ""),
						(he =
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
				Qt +
				t +
				he
			);
		}
		var bt = !1;
		function Tt(t, r) {
			if (!t || bt) return "";
			bt = !0;
			var a = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var s = {
					DetermineComponentFrameRoot: function () {
						try {
							if (r) {
								var oe = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(oe.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(oe, []);
									} catch (me) {
										var $ = me;
									}
									Reflect.construct(t, [], oe);
								} else {
									try {
										oe.call();
									} catch (me) {
										$ = me;
									}
									oe = !1;
									try {
										var X = Object.getOwnPropertyDescriptor(t.prototype, "props");
										(Object.defineProperty(t.prototype, "props", {
											configurable: !0,
											set: function () {
												throw Error();
											},
										}),
											(oe = !0),
											new t());
									} finally {
										oe && (X !== void 0 ? Object.defineProperty(t.prototype, "props", X) : delete t.prototype.props);
									}
								}
							} else {
								try {
									throw Error();
								} catch (me) {
									$ = me;
								}
								(oe = t()) && typeof oe.catch == "function" && oe.catch(function () {});
							}
						} catch (me) {
							if (me && $ && typeof me.stack == "string") return [me.stack, $.stack];
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
					v = d[0],
					C = d[1];
				if (v && C) {
					var I = v.split(`
`),
						Q = C.split(`
`);
					for (c = s = 0; s < I.length && !I[s].includes("DetermineComponentFrameRoot");) s++;
					for (; c < Q.length && !Q[c].includes("DetermineComponentFrameRoot");) c++;
					if (s === I.length || c === Q.length)
						for (s = I.length - 1, c = Q.length - 1; 1 <= s && 0 <= c && I[s] !== Q[c];) c--;
					for (; 1 <= s && 0 <= c; s--, c--)
						if (I[s] !== Q[c]) {
							if (s !== 1 || c !== 1)
								do
									if ((s--, c--, 0 > c || I[s] !== Q[c])) {
										var J =
											`
` + I[s].replace(" at new ", " at ");
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
				((bt = !1), (Error.prepareStackTrace = a));
			}
			return (a = t ? t.displayName || t.name : "") ? Te(a) : "";
		}
		function ea(t, r) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return Te(t.type);
				case 16:
					return Te("Lazy");
				case 13:
					return t.child !== r && r !== null ? Te("Suspense Fallback") : Te("Suspense");
				case 19:
					return Te("SuspenseList");
				case 0:
				case 15:
					return Tt(t.type, !1);
				case 11:
					return Tt(t.type.render, !1);
				case 1:
					return Tt(t.type, !0);
				case 31:
					return Te("Activity");
				case 30:
					return Te("ViewTransition");
				default:
					return "";
			}
		}
		function Fa(t) {
			try {
				var r = "",
					a = null;
				do ((r += ea(t, a)), (a = t), (t = t.return));
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
		var ta = Object.prototype.hasOwnProperty,
			mi = n.unstable_scheduleCallback,
			pr = n.unstable_cancelCallback,
			gi = n.unstable_shouldYield,
			br = n.unstable_requestPaint,
			tn = n.unstable_now,
			de = n.unstable_getCurrentPriorityLevel,
			Be = n.unstable_ImmediatePriority,
			Rt = n.unstable_UserBlockingPriority,
			ft = n.unstable_NormalPriority,
			pn = n.unstable_LowPriority,
			mn = n.unstable_IdlePriority,
			kn = n.log,
			le = n.unstable_setDisableYieldValue,
			Oe = null,
			Ie = null;
		function pe(t) {
			if ((typeof kn == "function" && le(t), Ie && typeof Ie.setStrictMode == "function"))
				try {
					Ie.setStrictMode(Oe, t);
				} catch {}
		}
		var Me = Math.clz32 ? Math.clz32 : vi,
			Yt = Math.log,
			Sr = Math.LN2;
		function vi(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((Yt(t) / Sr) | 0)) | 0);
		}
		var gn = 256,
			Bu = 262144,
			Pu = 4194304;
		function na(t) {
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
					return t & -t;
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
		function $u(t, r, a) {
			var s = t.pendingLanes;
			if (s === 0) return 0;
			var c = 0,
				d = t.suspendedLanes,
				v = t.pingedLanes;
			t = t.warmLanes;
			var C = s & 134217727;
			return (
				C !== 0
					? ((s = C & ~d),
						s !== 0 ? (c = na(s)) : ((v &= C), v !== 0 ? (c = na(v)) : a || ((a = C & ~t), a !== 0 && (c = na(a)))))
					: ((C = s & ~d), C !== 0 ? (c = na(C)) : v !== 0 ? (c = na(v)) : a || ((a = s & ~t), a !== 0 && (c = na(a)))),
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
		function os(t, r) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
		}
		function rv(t, r) {
			(r & 8) !== 0 && (r |= r & 32);
			var a = t.entangledLanes;
			if (a !== 0)
				for (t = t.entanglements, a &= r; 0 < a;) {
					var s = 31 - Me(a),
						c = 1 << s;
					((r |= t[s]), (a &= ~c));
				}
			return r;
		}
		function gC(t, r) {
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
		function iv() {
			var t = Pu;
			return ((Pu <<= 1), (Pu & 62914560) === 0 && (Pu = 4194304), t);
		}
		function Rf(t) {
			for (var r = [], a = 0; 31 > a; a++) r.push(t);
			return r;
		}
		function Hu(t, r) {
			((t.pendingLanes |= r), r !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function vC(t, r, a, s, c, d) {
			var v = t.pendingLanes;
			((t.pendingLanes = a),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= a),
				(t.entangledLanes &= a),
				(t.errorRecoveryDisabledLanes &= a),
				(t.shellSuspendCounter = 0));
			var C = t.entanglements,
				I = t.expirationTimes,
				Q = t.hiddenUpdates;
			for (a = v & ~a; 0 < a;) {
				var J = 31 - Me(a),
					oe = 1 << J;
				((C[J] = 0), (I[J] = -1));
				var $ = Q[J];
				if ($ !== null)
					for (Q[J] = null, J = 0; J < $.length; J++) {
						var X = $[J];
						X !== null && (X.lane &= -536870913);
					}
				a &= ~oe;
			}
			(s !== 0 && av(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(v & ~r)));
		}
		function av(t, r, a) {
			((t.pendingLanes |= r), (t.suspendedLanes &= ~r));
			var s = 31 - Me(r);
			((t.entangledLanes |= r), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930)));
		}
		function ov(t, r) {
			var a = (t.entangledLanes |= r);
			for (t = t.entanglements; a;) {
				var s = 31 - Me(a),
					c = 1 << s;
				((c & r) | (t[s] & r) && (t[s] |= r), (a &= ~c));
			}
		}
		function sv(t, r) {
			var a = r & -r;
			return ((a = (a & 42) !== 0 ? 1 : uv(a)), (a & (t.suspendedLanes | r)) !== 0 ? 0 : a);
		}
		function uv(t) {
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
		function Nf(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function lv() {
			var t = ye.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : hb(t.type));
		}
		function cv(t, r) {
			var a = ye.p;
			try {
				return ((ye.p = t), r());
			} finally {
				ye.p = a;
			}
		}
		var Br = Math.random().toString(36).slice(2),
			nn = "__reactFiber$" + Br,
			Cn = "__reactProps$" + Br,
			ss = "__reactContainer$" + Br,
			fv = "__reactEvents$" + Br,
			yC = "__reactListeners$" + Br,
			pC = "__reactHandles$" + Br,
			dv = "__reactResources$" + Br,
			us = "__reactMarker$" + Br,
			Zu = "__reactLoad$" + Br;
		function Fu(t) {
			(delete t[nn], delete t[Cn], delete t[yC], delete t[pC]);
		}
		function ra(t) {
			var r;
			if ((r = t[nn])) return r;
			for (var a = t.parentNode; a;) {
				if ((r = a[ss] || a[nn])) {
					if (((a = r.alternate), r.child !== null || (a !== null && a.child !== null)))
						for (t = Kp(t); t !== null;) {
							if ((a = t[nn])) return a;
							t = Kp(t);
						}
					return r;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function Qa(t) {
			if ((t = t[nn] || t[ss])) {
				var r = t.tag;
				if (r === 5 || r === 6 || r === 13 || r === 31 || r === 26 || r === 27 || r === 3) return t;
			}
			return null;
		}
		function ls(t) {
			var r = t.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return t.stateNode;
			throw Error(u(33));
		}
		function Ya(t) {
			var r = t[dv];
			return (r || (r = t[dv] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), r);
		}
		function Kt(t) {
			t[us] = !0;
		}
		function hv(t) {
			t[Zu] = void 0;
		}
		var mv = new Set(),
			gv = {};
		function ia(t, r) {
			(Ka(t, r), Ka(t + "Capture", r));
		}
		function Ka(t, r) {
			for (gv[t] = r, t = 0; t < r.length; t++) mv.add(r[t]);
		}
		var bC = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			vv = {},
			yv = {};
		function SC(t) {
			return ta.call(yv, t) ? !0 : ta.call(vv, t) ? !1 : bC.test(t) ? (yv[t] = !0) : ((vv[t] = !0), !1);
		}
		var Xe = !1;
		function pv() {
			var t = Xe;
			return ((Xe = !1), t);
		}
		function Qu(t, r, a) {
			if (SC(r))
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
					t.setAttribute(r, a);
				}
		}
		function Yu(t, r, a) {
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
				t.setAttribute(r, a);
			}
		}
		function Pr(t, r, a, s) {
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
				t.setAttributeNS(r, a, s);
			}
		}
		function qn(t) {
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
		function bv(t) {
			var r = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
		}
		function wC(t, r, a) {
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
						set: function (v) {
							((a = "" + v), d.call(this, v));
						},
					}),
					Object.defineProperty(t, r, { enumerable: s.enumerable }),
					{
						getValue: function () {
							return a;
						},
						setValue: function (v) {
							a = "" + v;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[r]);
						},
					}
				);
			}
		}
		function Mf(t) {
			if (!t._valueTracker) {
				var r = bv(t) ? "checked" : "value";
				t._valueTracker = wC(t, r, "" + t[r]);
			}
		}
		function Sv(t) {
			if (!t) return !1;
			var r = t._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				s = "";
			return (t && (s = bv(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== a ? (r.setValue(t), !0) : !1);
		}
		var EC = /[\n"\\]/g;
		function Yn(t) {
			return t.replace(EC, function (r) {
				return "\\" + r.charCodeAt(0).toString(16) + " ";
			});
		}
		function Df(t, r, a, s, c, d, v, C) {
			((t.name = ""),
				v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean"
					? (t.type = v)
					: t.removeAttribute("type"),
				r != null
					? v === "number"
						? ((r === 0 && t.value === "") || t.value != r) && (t.value = "" + qn(r))
						: t.value !== "" + qn(r) && (t.value = "" + qn(r))
					: (v !== "submit" && v !== "reset") || t.removeAttribute("value"),
				r != null
					? v === "number" && t.value == r
						? zf(t, qn(t.value))
						: zf(t, qn(r))
					: a != null
						? zf(t, qn(a))
						: s != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean"
					? (t.name = "" + qn(C))
					: t.removeAttribute("name"));
		}
		function wv(t, r, a, s, c, d, v, C) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				r != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || r != null)) {
					Mf(t);
					return;
				}
				((a = a != null ? "" + qn(a) : ""),
					(r = r != null ? "" + qn(r) : a),
					C || r === t.value || (t.value = r),
					(t.defaultValue = r));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(t.checked = C ? t.checked : !!s),
				(t.defaultChecked = !!s),
				v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (t.name = v),
				Mf(t));
		}
		function zf(t, r) {
			t.defaultValue !== "" + r && (t.defaultValue = "" + r);
		}
		function Ga(t, r, a, s) {
			if (((t = t.options), r)) {
				r = {};
				for (var c = 0; c < a.length; c++) r["$" + a[c]] = !0;
				for (a = 0; a < t.length; a++)
					((c = r.hasOwnProperty("$" + t[a].value)),
						t[a].selected !== c && (t[a].selected = c),
						c && s && (t[a].defaultSelected = !0));
			} else {
				for (a = "" + qn(a), r = null, c = 0; c < t.length; c++) {
					if (t[c].value === a) {
						((t[c].selected = !0), s && (t[c].defaultSelected = !0));
						return;
					}
					r !== null || t[c].disabled || (r = t[c]);
				}
				r !== null && (r.selected = !0);
			}
		}
		function Ev(t, r, a) {
			if (r != null && ((r = "" + qn(r)), r !== t.value && (t.value = r), a == null)) {
				t.defaultValue !== r && (t.defaultValue = r);
				return;
			}
			t.defaultValue = a != null ? "" + qn(a) : "";
		}
		function _v(t, r, a, s) {
			if (r == null) {
				if (s != null) {
					if (a != null) throw Error(u(92));
					if (Ce(s)) {
						if (1 < s.length) throw Error(u(93));
						s = s[0];
					}
					a = s;
				}
				((a ??= ""), (r = a));
			}
			((a = qn(r)),
				(t.defaultValue = a),
				(s = t.textContent),
				s === a && s !== "" && s !== null && (t.value = s),
				Mf(t));
		}
		function Xa(t, r) {
			if (r) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = r;
					return;
				}
			}
			t.textContent = r;
		}
		var _C = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Cv(t, r, a) {
			var s = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? s
					? t.setProperty(r, "")
					: r === "float"
						? (t.cssFloat = "")
						: (t[r] = "")
				: s
					? t.setProperty(r, a)
					: typeof a != "number" || a === 0 || _C.has(r)
						? r === "float"
							? (t.cssFloat = a)
							: (t[r] = ("" + a).trim())
						: (t[r] = a + "px");
		}
		function Tv(t, r, a) {
			if (r != null && typeof r != "object") throw Error(u(62));
			if (((t = t.style), a != null)) {
				for (var s in a)
					!a.hasOwnProperty(s) ||
						(r != null && r.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""), (Xe = !0));
				for (var c in r) ((s = r[c]), r.hasOwnProperty(c) && a[c] !== s && (Cv(t, c, s), (Xe = !0)));
			} else for (var d in r) r.hasOwnProperty(d) && Cv(t, d, r[d]);
		}
		function If(t) {
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
		var CC = new Map([
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
				["maskType", "mask-type"],
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
			TC =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Ku(t) {
			return TC.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function wr() {}
		var jf = null;
		function kf(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Ja = null,
			Wa = null;
		function xv(t) {
			var r = Qa(t);
			if (r && (t = r.stateNode)) {
				var a = t[Cn] || null;
				e: switch (((t = r.stateNode), r.type)) {
					case "input":
						if (
							(Df(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(r = a.name),
							a.type === "radio" && r != null)
						) {
							for (a = t; a.parentNode;) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + Yn("" + r) + '"][type="radio"]'), r = 0; r < a.length; r++) {
								var s = a[r];
								if (s !== t && s.form === t.form) {
									var c = s[Cn] || null;
									if (!c) throw Error(u(90));
									Df(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (r = 0; r < a.length; r++) ((s = a[r]), s.form === t.form && Sv(s));
						}
						break e;
					case "textarea":
						Ev(t, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && Ga(t, !!a.multiple, r, !1));
				}
			}
		}
		var qf = !1;
		function Ov(t, r, a) {
			if (qf) return t(r, a);
			qf = !0;
			try {
				return t(r);
			} finally {
				if (((qf = !1), (Ja !== null || Wa !== null) && (Kl(), Ja && ((r = Ja), (t = Wa), (Wa = Ja = null), xv(r), t))))
					for (r = 0; r < t.length; r++) xv(t[r]);
			}
		}
		function cs(t, r) {
			var a = t.stateNode;
			if (a === null) return null;
			var s = a[Cn] || null;
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
			if (a && typeof a != "function") throw Error(u(231, r, typeof a));
			return a;
		}
		var $r = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Lf = !1;
		if ($r)
			try {
				var fs = {};
				(Object.defineProperty(fs, "passive", {
					get: function () {
						Lf = !0;
					},
				}),
					window.addEventListener("test", fs, fs),
					window.removeEventListener("test", fs, fs));
			} catch {
				Lf = !1;
			}
		var yi = null,
			Uf = null,
			Gu = null;
		function Av() {
			if (Gu) return Gu;
			var t,
				r = Uf,
				a = r.length,
				s,
				c = "value" in yi ? yi.value : yi.textContent,
				d = c.length;
			for (t = 0; t < a && r[t] === c[t]; t++);
			var v = a - t;
			for (s = 1; s <= v && r[a - s] === c[d - s]; s++);
			return (Gu = c.slice(t, 1 < s ? 1 - s : void 0));
		}
		function Xu(t) {
			var r = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && r === 13 && (t = 13)) : (t = r),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Ju() {
			return !0;
		}
		function Rv() {
			return !1;
		}
		function bn(t) {
			function r(a, s, c, d, v) {
				((this._reactName = a),
					(this._targetInst = c),
					(this.type = s),
					(this.nativeEvent = d),
					(this.target = v),
					(this.currentTarget = null));
				for (var C in t) t.hasOwnProperty(C) && ((a = t[C]), (this[C] = a ? a(d) : d[C]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Ju
						: Rv),
					(this.isPropagationStopped = Rv),
					this
				);
			}
			return (
				L(r.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var a = this.nativeEvent;
						a &&
							(a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1),
							(this.isDefaultPrevented = Ju));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Ju));
					},
					persist: function () {},
					isPersistent: Ju,
				}),
				r
			);
		}
		var pi = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Wu = bn(pi),
			ds = L({}, pi, { view: 0, detail: 0 }),
			xC = bn(ds),
			Vf,
			Bf,
			hs,
			el = L({}, ds, {
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
				getModifierState: $f,
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
						: (t !== hs &&
								(hs && t.type === "mousemove"
									? ((Vf = t.screenX - hs.screenX), (Bf = t.screenY - hs.screenY))
									: (Bf = Vf = 0),
								(hs = t)),
							Vf);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : Bf;
				},
			}),
			Nv = bn(el),
			OC = bn(L({}, el, { dataTransfer: 0 })),
			Pf = bn(L({}, ds, { relatedTarget: 0 })),
			AC = bn(L({}, pi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			RC = bn(
				L({}, pi, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Mv = bn(L({}, pi, { data: 0 })),
			NC = {
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
			MC = {
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
			DC = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function zC(t) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(t) : (t = DC[t]) ? !!r[t] : !1;
		}
		function $f() {
			return zC;
		}
		var IC = bn(
				L({}, ds, {
					key: function (t) {
						if (t.key) {
							var r = NC[t.key] || t.key;
							if (r !== "Unidentified") return r;
						}
						return t.type === "keypress"
							? ((t = Xu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? MC[t.keyCode] || "Unidentified"
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
					getModifierState: $f,
					charCode: function (t) {
						return t.type === "keypress" ? Xu(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Xu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Dv = bn(
				L({}, el, {
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
			jC = bn(L({}, pi, { submitter: 0 })),
			kC = bn(
				L({}, ds, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: $f,
				}),
			),
			qC = bn(L({}, pi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			LC = bn(
				L({}, el, {
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
			UC = bn(L({}, pi, { newState: 0, oldState: 0, source: 0 })),
			VC = [9, 13, 27, 32],
			Hf = $r && "CompositionEvent" in window,
			ms = null;
		$r && "documentMode" in document && (ms = document.documentMode);
		var BC = $r && "TextEvent" in window && !ms,
			zv = $r && (!Hf || (ms && 8 < ms && 11 >= ms)),
			Iv = " ",
			jv = !1;
		function kv(t, r) {
			switch (t) {
				case "keyup":
					return VC.indexOf(r.keyCode) !== -1;
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
		function qv(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var eo = !1;
		function PC(t, r) {
			switch (t) {
				case "compositionend":
					return qv(r);
				case "keypress":
					return r.which !== 32 ? null : ((jv = !0), Iv);
				case "textInput":
					return ((t = r.data), t === Iv && jv ? null : t);
				default:
					return null;
			}
		}
		function $C(t, r) {
			if (eo)
				return t === "compositionend" || (!Hf && kv(t, r)) ? ((t = Av()), (Gu = Uf = yi = null), (eo = !1), t) : null;
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
					return zv && r.locale !== "ko" ? null : r.data;
				default:
					return null;
			}
		}
		var HC = {
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
		function Lv(t) {
			var r = t && t.nodeName && t.nodeName.toLowerCase();
			return r === "input" ? !!HC[t.type] : r === "textarea";
		}
		function Uv(t, r, a, s) {
			(Ja ? (Wa ? Wa.push(s) : (Wa = [s])) : (Ja = s),
				(r = tc(r, "onChange")),
				0 < r.length && ((a = new Wu("onChange", "change", null, a, s)), t.push({ event: a, listeners: r })));
		}
		var gs = null,
			vs = null;
		function ZC(t) {
			_p(t, 0);
		}
		function tl(t) {
			if (Sv(ls(t))) return t;
		}
		function Vv(t, r) {
			if (t === "change") return r;
		}
		var Bv = !1;
		if ($r) {
			var Zf;
			if ($r) {
				var Ff = "oninput" in document;
				if (!Ff) {
					var Pv = document.createElement("div");
					(Pv.setAttribute("oninput", "return;"), (Ff = typeof Pv.oninput == "function"));
				}
				Zf = Ff;
			} else Zf = !1;
			Bv = Zf && (!document.documentMode || 9 < document.documentMode);
		}
		function $v() {
			gs && (gs.detachEvent("onpropertychange", Hv), (vs = gs = null));
		}
		function Hv(t) {
			if (t.propertyName === "value" && tl(vs)) {
				var r = [];
				(Uv(r, vs, t, kf(t)), Ov(ZC, r));
			}
		}
		function FC(t, r, a) {
			t === "focusin" ? ($v(), (gs = r), (vs = a), gs.attachEvent("onpropertychange", Hv)) : t === "focusout" && $v();
		}
		function QC(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return tl(vs);
		}
		function YC(t, r) {
			if (t === "click") return tl(r);
		}
		function KC(t, r) {
			if (t === "input" || t === "change") return tl(r);
		}
		function GC(t, r) {
			return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
		}
		var Ln = typeof Object.is == "function" ? Object.is : GC;
		function ys(t, r) {
			if (Ln(t, r)) return !0;
			if (typeof t != "object" || t === null || typeof r != "object" || r === null) return !1;
			var a = Object.keys(t),
				s = Object.keys(r);
			if (a.length !== s.length) return !1;
			for (s = 0; s < a.length; s++) {
				var c = a[s];
				if (!ta.call(r, c) || !Ln(t[c], r[c])) return !1;
			}
			return !0;
		}
		function Qf(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		function Zv(t) {
			for (; t && t.firstChild;) t = t.firstChild;
			return t;
		}
		function Fv(t, r) {
			var a = Zv(t);
			t = 0;
			for (var s; a;) {
				if (a.nodeType === 3) {
					if (((s = t + a.textContent.length), t <= r && s >= r)) return { node: a, offset: r - t };
					t = s;
				}
				e: {
					for (; a;) {
						if (a.nextSibling) {
							a = a.nextSibling;
							break e;
						}
						a = a.parentNode;
					}
					a = void 0;
				}
				a = Zv(a);
			}
		}
		function Qv(t, r) {
			return t && r
				? t === r
					? !0
					: t && t.nodeType === 3
						? !1
						: r && r.nodeType === 3
							? Qv(t, r.parentNode)
							: "contains" in t
								? t.contains(r)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(r) & 16)
									: !1
				: !1;
		}
		function Yv(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var r = Qf(t.document); r instanceof t.HTMLIFrameElement;) {
				try {
					var a = typeof r.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = r.contentWindow;
				else break;
				r = Qf(t.document);
			}
			return r;
		}
		function Yf(t) {
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
		var XC = $r && "documentMode" in document && 11 >= document.documentMode,
			to = null,
			Kf = null,
			ps = null,
			Gf = !1;
		function Kv(t, r, a) {
			var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			Gf ||
				to == null ||
				to !== Qf(s) ||
				((s = to),
				"selectionStart" in s && Yf(s)
					? (s = { start: s.selectionStart, end: s.selectionEnd })
					: ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
						(s = {
							anchorNode: s.anchorNode,
							anchorOffset: s.anchorOffset,
							focusNode: s.focusNode,
							focusOffset: s.focusOffset,
						})),
				(ps && ys(ps, s)) ||
					((ps = s),
					(s = tc(Kf, "onSelect")),
					0 < s.length &&
						((r = new Wu("onSelect", "select", null, r, a)), t.push({ event: r, listeners: s }), (r.target = to))));
		}
		function aa(t, r) {
			var a = {};
			return ((a[t.toLowerCase()] = r.toLowerCase()), (a["Webkit" + t] = "webkit" + r), (a["Moz" + t] = "moz" + r), a);
		}
		var no = {
				animationend: aa("Animation", "AnimationEnd"),
				animationiteration: aa("Animation", "AnimationIteration"),
				animationstart: aa("Animation", "AnimationStart"),
				transitionrun: aa("Transition", "TransitionRun"),
				transitionstart: aa("Transition", "TransitionStart"),
				transitioncancel: aa("Transition", "TransitionCancel"),
				transitionend: aa("Transition", "TransitionEnd"),
			},
			Xf = {},
			Gv = {};
		$r &&
			((Gv = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete no.animationend.animation, delete no.animationiteration.animation, delete no.animationstart.animation),
			"TransitionEvent" in window || delete no.transitionend.transition);
		function oa(t) {
			if (Xf[t]) return Xf[t];
			if (!no[t]) return t;
			var r = no[t],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in Gv) return (Xf[t] = r[a]);
			return t;
		}
		var Xv = oa("animationend"),
			Jv = oa("animationiteration"),
			Wv = oa("animationstart"),
			JC = oa("transitionrun"),
			WC = oa("transitionstart"),
			eT = oa("transitioncancel"),
			ey = oa("transitionend"),
			ty = new Map(),
			Jf =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		Jf.push("scrollEnd");
		function lr(t, r) {
			(ty.set(t, r), ia(r, [t]));
		}
		var tT = 0;
		function Hr(t, r) {
			if (t.name != null && t.name !== "auto") return t.name;
			if (r.autoName !== null) return r.autoName;
			t = hr.identifierPrefix;
			var a = tT++;
			return ((t = "_" + t + "t_" + a.toString(32) + "_"), (r.autoName = t));
		}
		function ny(t) {
			if (t == null || typeof t == "string") return t;
			var r = null,
				a = _o;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = t[a[s]];
					if (c != null) {
						if (c === "none") return "none";
						r = r == null ? c : r + (" " + c);
					}
				}
			return r ?? t.default;
		}
		function Zr(t, r) {
			return ((t = ny(t)), (r = ny(r)), r == null ? (t === "auto" ? null : t) : r === "auto" ? null : r);
		}
		var nl =
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
			Kn = [],
			ro = 0,
			Wf = 0;
		function rl() {
			for (var t = ro, r = (Wf = ro = 0); r < t;) {
				var a = Kn[r];
				Kn[r++] = null;
				var s = Kn[r];
				Kn[r++] = null;
				var c = Kn[r];
				Kn[r++] = null;
				var d = Kn[r];
				if (((Kn[r++] = null), s !== null && c !== null)) {
					var v = s.pending;
					(v === null ? (c.next = c) : ((c.next = v.next), (v.next = c)), (s.pending = c));
				}
				d !== 0 && ry(a, c, d);
			}
		}
		function il(t, r, a, s) {
			((Kn[ro++] = t),
				(Kn[ro++] = r),
				(Kn[ro++] = a),
				(Kn[ro++] = s),
				(Wf |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function ed(t, r, a, s) {
			return (il(t, r, a, s), al(t));
		}
		function sa(t, r) {
			return (il(t, null, null, r), al(t));
		}
		function ry(t, r, a) {
			t.lanes |= a;
			var s = t.alternate;
			s !== null && (s.lanes |= a);
			for (var c = !1, d = t.return; d !== null;)
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
						((c = 31 - Me(a)),
						(t = d.hiddenUpdates),
						(s = t[c]),
						s === null ? (t[c] = [r]) : s.push(r),
						(r.lane = a | 536870912)),
					d)
				: null;
		}
		function al(t) {
			if (50 < Vs) throw ((Vs = 0), (Yl = null), Error(u(185)));
			for (var r = t.return; r !== null;) ((t = r), (r = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var io = {};
		function nT(t, r, a, s) {
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
		function Tn(t, r, a, s) {
			return new nT(t, r, a, s);
		}
		function td(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function Fr(t, r) {
			var a = t.alternate;
			return (
				a === null
					? ((a = Tn(t.tag, r, t.key, t.mode)),
						(a.elementType = t.elementType),
						(a.type = t.type),
						(a.stateNode = t.stateNode),
						(a.alternate = t),
						(t.alternate = a))
					: ((a.pendingProps = r), (a.type = t.type), (a.flags = 0), (a.subtreeFlags = 0), (a.deletions = null)),
				(a.flags = t.flags & 1206910976),
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
		function iy(t, r) {
			t.flags &= 1206910978;
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
		function ol(t, r, a, s, c, d) {
			var v = 0;
			if (((s = t), typeof s == "function")) td(s) && (v = 1);
			else if (typeof s == "string")
				v = Mx(t, a, Qe.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (s) {
					case ue:
						return ((t = Tn(31, a, r, c)), (t.elementType = ue), (t.lanes = d), t);
					case q:
						return ua(a.children, c, d, r);
					case P:
						((v = 8), (c |= 24));
						break;
					case F:
						return ((t = Tn(12, a, r, c | 2)), (t.elementType = F), (t.lanes = d), t);
					case re:
						return ((t = Tn(13, a, r, c)), (t.elementType = re), (t.lanes = d), t);
					case U:
						return ((t = Tn(19, a, r, c)), (t.elementType = U), (t.lanes = d), t);
					case xe:
					case j:
						return (
							(t = c | 32),
							(t = Tn(30, a, r, t)),
							(t.elementType = j),
							(t.lanes = d),
							(t.stateNode = { autoName: null, paired: null, clones: null, ref: null }),
							t
						);
					default:
						if (typeof s == "object" && s !== null)
							switch (s.$$typeof) {
								case B:
									v = 10;
									break e;
								case Y:
									v = 9;
									break e;
								case ne:
									v = 11;
									break e;
								case ee:
									v = 14;
									break e;
								case K:
									((v = 16), (s = null));
									break e;
							}
						((v = 29), (a = Error(u(130, t === null ? "null" : typeof t, ""))), (s = null));
				}
			return ((r = Tn(v, a, r, c)), (r.elementType = t), (r.type = s), (r.lanes = d), r);
		}
		function ua(t, r, a, s) {
			return ((t = Tn(7, t, s, r)), (t.lanes = a), t);
		}
		function nd(t, r, a) {
			return ((t = Tn(6, t, null, r)), (t.lanes = a), t);
		}
		function ay(t) {
			var r = Tn(18, null, null, 0);
			return ((r.stateNode = t), r);
		}
		function rd(t, r, a) {
			return (
				(r = Tn(4, t.children !== null ? t.children : [], t.key, r)),
				(r.lanes = a),
				(r.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				r
			);
		}
		var oy = new WeakMap();
		function Gn(t, r) {
			if (typeof t == "object" && t !== null) {
				var a = oy.get(t);
				return a !== void 0 ? a : ((r = { value: t, source: r, stack: Fa(r) }), oy.set(t, r), r);
			}
			return { value: t, source: r, stack: Fa(r) };
		}
		var ao = [],
			oo = 0,
			sl = null,
			bs = 0,
			Xn = [],
			Jn = 0,
			bi = null,
			Er = 1,
			_r = "";
		function Qr(t, r) {
			((ao[oo++] = bs), (ao[oo++] = sl), (sl = t), (bs = r));
		}
		function sy(t, r, a) {
			((Xn[Jn++] = Er), (Xn[Jn++] = _r), (Xn[Jn++] = bi), (bi = t));
			var s = Er;
			t = _r;
			var c = 32 - Me(s) - 1;
			((s &= ~(1 << c)), (a += 1));
			var d = 32 - Me(r) + c;
			if (30 < d) {
				var v = c - (c % 5);
				((d = (s & ((1 << v) - 1)).toString(32)),
					(s >>= v),
					(c -= v),
					(Er = (1 << (32 - Me(r) + c)) | (a << c) | s),
					(_r = d + t));
			} else ((Er = (1 << d) | (a << c) | s), (_r = t));
		}
		function ul(t) {
			t.return !== null && (Qr(t, 1), sy(t, 1, 0));
		}
		function id(t) {
			for (; t === sl;) ((sl = ao[--oo]), (ao[oo] = null), (bs = ao[--oo]), (ao[oo] = null));
			for (; t === bi;)
				((bi = Xn[--Jn]), (Xn[Jn] = null), (_r = Xn[--Jn]), (Xn[Jn] = null), (Er = Xn[--Jn]), (Xn[Jn] = null));
		}
		function uy(t, r) {
			((Xn[Jn++] = Er), (Xn[Jn++] = _r), (Xn[Jn++] = bi), (Er = r.id), (_r = r.overflow), (bi = t));
		}
		var Gt = null,
			gt = null,
			Ve = !1,
			Si = null,
			Wn = !1,
			ad = Error(u(519));
		function wi(t) {
			throw (
				Ss(Gn(Error(u(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				ad
			);
		}
		function ly(t) {
			var r = t.stateNode,
				a = t.type,
				s = t.memoizedProps;
			switch (((r[nn] = t), (r[Cn] = s), a)) {
				case "dialog":
					($e("cancel", r), $e("close", r));
					break;
				case "iframe":
				case "object":
				case "embed":
					$e("load", r);
					break;
				case "video":
				case "audio":
					for (a = 0; a < Ps.length; a++) $e(Ps[a], r);
					break;
				case "source":
					$e("error", r);
					break;
				case "img":
				case "image":
				case "link":
					($e("error", r), $e("load", r));
					break;
				case "details":
					$e("toggle", r);
					break;
				case "input":
					($e("invalid", r), wv(r, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					$e("invalid", r);
					break;
				case "textarea":
					($e("invalid", r), _v(r, s.value, s.defaultValue, s.children));
			}
			((a = s.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				s.suppressHydrationWarning === !0 ||
				Ap(r.textContent, a)
					? (s.popover != null && ($e("beforetoggle", r), $e("toggle", r)),
						s.onScroll != null && $e("scroll", r),
						s.onScrollEnd != null && $e("scrollend", r),
						s.onClick != null && (r.onclick = wr),
						(r = !0))
					: (r = !1),
				r || wi(t, !0));
		}
		function ll(t) {
			for (Gt = t.return; Gt;)
				switch (Gt.tag) {
					case 5:
					case 31:
					case 13:
						Wn = !1;
						return;
					case 27:
					case 3:
						Wn = !0;
						return;
					default:
						Gt = Gt.return;
				}
		}
		function so(t) {
			if (t !== Gt) return !1;
			if (!Ve) return (ll(t), (Ve = !0), !1);
			var r = t.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || Ih(t.type, t.memoizedProps))),
					(a = !a)),
				a && gt && wi(t),
				ll(t),
				r === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(317));
				gt = Yp(t);
			} else if (r === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(317));
				gt = Yp(t);
			} else
				r === 27
					? ((r = gt), ji(t.type) ? ((t = $h), ($h = null), (gt = t)) : (gt = r))
					: (gt = Gt ? nr(t.stateNode.nextSibling) : null);
			return !0;
		}
		function la() {
			((gt = Gt = null), (Ve = !1));
		}
		function od() {
			var t = Si;
			return (t !== null && (An === null ? (An = t) : An.push.apply(An, t), (Si = null)), t);
		}
		function Ss(t) {
			Si === null ? (Si = [t]) : Si.push(t);
		}
		var sd = _t(null),
			ca = null,
			Yr = null;
		function Ei(t, r, a) {
			(Ue(sd, r._currentValue), (r._currentValue = a));
		}
		function Kr(t) {
			((t._currentValue = sd.current), et(sd));
		}
		function cl(t, r, a) {
			for (; t !== null;) {
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
		function ud(t, r, a, s) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null;) {
				var d = c.dependencies;
				if (d !== null) {
					var v = c.child;
					d = d.firstContext;
					e: for (; d !== null;) {
						var C = d;
						d = c;
						for (var I = 0; I < r.length; I++)
							if (C.context === r[I]) {
								((d.lanes |= a), (C = d.alternate), C !== null && (C.lanes |= a), cl(d.return, a, t), s || (v = null));
								break e;
							}
						d = C.next;
					}
				} else if (c.tag === 18) {
					if (((v = c.return), v === null)) throw Error(u(341));
					((v.lanes |= a), (d = v.alternate), d !== null && (d.lanes |= a), cl(v, a, t), (v = null));
				} else
					c.tag === 13 && c.memoizedState !== null && c.memoizedState.dehydrated === null
						? ((c.lanes |= a),
							(v = c.alternate),
							v !== null && (v.lanes |= a),
							cl(c.return, a, t),
							(v = c.child),
							(v = v !== null ? v.sibling : null))
						: (v = c.child);
				if (v !== null) v.return = c;
				else
					for (v = c; v !== null;) {
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
		function fa(t, r, a, s) {
			t = null;
			for (var c = r, d = !1; c !== null;) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var v = c.alternate;
					if (v === null) throw Error(u(387));
					if (((v = v.memoizedProps), v !== null)) {
						var C = c.type;
						Ln(c.pendingProps.value, v.value) || (t !== null ? t.push(C) : (t = [C]));
					}
				} else if (c === Fn.current) {
					if (((v = c.alternate), v === null)) throw Error(u(387));
					v.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(zo) : (t = [zo]));
				}
				c = c.return;
			}
			return (t !== null && ud(r, t, a, s), (r.flags |= 262144), t !== null);
		}
		function fl(t) {
			for (t = t.firstContext; t !== null;) {
				if (!Ln(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function da(t) {
			((ca = t), (Yr = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function rn(t) {
			return cy(ca, t);
		}
		function dl(t, r) {
			return (ca === null && da(t), cy(t, r));
		}
		function cy(t, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), Yr === null)) {
				if (t === null) throw Error(u(308));
				((Yr = r), (t.dependencies = { lanes: 0, firstContext: r }), (t.flags |= 524288));
			} else Yr = Yr.next = r;
			return a;
		}
		var rT =
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
			iT = n.unstable_scheduleCallback,
			aT = n.unstable_NormalPriority,
			Lt = { $$typeof: B, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function ld() {
			return { controller: new rT(), data: new Map(), refCount: 0 };
		}
		function ws(t) {
			(t.refCount--,
				t.refCount === 0 &&
					iT(aT, function () {
						t.controller.abort();
					}));
		}
		function fy(t, r) {
			if ((t.pendingLanes & 4194048) !== 0) {
				var a = t.transitionTypes;
				for (a === null && (a = t.transitionTypes = []), t = 0; t < r.length; t++) {
					var s = r[t];
					a.indexOf(s) === -1 && a.push(s);
				}
			}
		}
		var Es = null;
		function oT(t) {
			var r = t.transitionTypes;
			return ((t.transitionTypes = null), r);
		}
		var _s = null,
			cd = 0,
			ha = 0,
			uo = null;
		function sT(t, r) {
			if (_s === null) {
				var a = (_s = []);
				((cd = 0),
					(ha = xh()),
					(uo = {
						status: "pending",
						value: void 0,
						then: function (s) {
							a.push(s);
						},
					}));
			}
			return (cd++, r.then(dy, dy), r);
		}
		function dy() {
			if (--cd === 0 && ((Es = null), _s !== null)) {
				uo !== null && (uo.status = "fulfilled");
				var t = _s;
				((_s = null), (ha = 0), (uo = null));
				for (var r = 0; r < t.length; r++) (0, t[r])();
			}
		}
		function uT(t, r) {
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
		var hy = ce.S;
		ce.S = function (t, r) {
			if (((np = tn()), typeof r == "object" && r !== null && typeof r.then == "function" && sT(t, r), Es !== null))
				for (var a = Oo; a !== null;) (fy(a, Es), (a = a.next));
			if (((a = t.types), a !== null)) {
				for (var s = Oo; s !== null;) (fy(s, a), (s = s.next));
				if (ha !== 0) {
					((s = Es), s === null && (s = Es = []));
					for (var c = 0; c < a.length; c++) {
						var d = a[c];
						s.indexOf(d) === -1 && s.push(d);
					}
				}
			}
			hy !== null && hy(t, r);
		};
		var ma = _t(null);
		function fd() {
			var t = ma.current;
			return t !== null ? t : dt.pooledCache;
		}
		function hl(t, r) {
			r === null ? Ue(ma, ma.current) : Ue(ma, r.pool);
		}
		function my() {
			var t = fd();
			return t === null ? null : { parent: Lt._currentValue, pool: t };
		}
		var lo = Error(u(460)),
			dd = Error(u(474)),
			ml = Error(u(542)),
			gl = { then: function () {} };
		function gy(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function vy(t, r, a) {
			switch (((a = t[a]), a === void 0 ? t.push(r) : a !== r && (r.then(wr, wr), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((t = r.reason), py(t), t === void 0 && !("reason" in r) ? Error(u(600)) : t);
				default:
					if (typeof r.status == "string") r.then(wr, wr);
					else {
						if (((t = dt), t !== null && 100 < t.shellSuspendCounter)) throw Error(u(482));
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
							throw ((t = r.reason), py(t), t);
					}
					throw ((va = r), lo);
			}
		}
		function ga(t) {
			try {
				var r = t._init;
				return r(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((va = a), lo) : a;
			}
		}
		var va = null;
		function yy() {
			if (va === null) throw Error(u(459));
			var t = va;
			return ((va = null), t);
		}
		function py(t) {
			if (t === lo || t === ml) throw Error(u(483));
		}
		var co = null,
			Cs = 0;
		function vl(t) {
			var r = Cs;
			return ((Cs += 1), co === null && (co = []), vy(co, t, r));
		}
		function _i(t, r) {
			((r = r.props.ref), (t.ref = r !== void 0 ? r : null));
		}
		function yl(t, r) {
			throw r.$$typeof === H
				? Error(u(525))
				: ((t = Object.prototype.toString.call(r)),
					Error(u(31, t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t)));
		}
		function by(t) {
			function r(Z, V) {
				if (t) {
					var G = Z.deletions;
					G === null ? ((Z.deletions = [V]), (Z.flags |= 16)) : G.push(V);
				}
			}
			function a(Z, V) {
				if (!t) return null;
				for (; V !== null;) (r(Z, V), (V = V.sibling));
				return null;
			}
			function s(Z) {
				for (var V = new Map(); Z !== null;) (Z.key === null ? V.set(Z.index, Z) : V.set(Z.key, Z), (Z = Z.sibling));
				return V;
			}
			function c(Z, V) {
				return ((Z = Fr(Z, V)), (Z.index = 0), (Z.sibling = null), Z);
			}
			function d(Z, V, G) {
				return (
					(Z.index = G),
					t
						? ((G = Z.alternate),
							G !== null ? ((G = G.index), G < V ? ((Z.flags |= 2), V) : G) : ((Z.flags |= 134217730), V))
						: ((Z.flags |= 1048576), V)
				);
			}
			function v(Z) {
				return (t && Z.alternate === null && (Z.flags |= 134217730), Z);
			}
			function C(Z, V, G, ie) {
				return V === null || V.tag !== 6
					? ((V = nd(G, Z.mode, ie)), (V.return = Z), V)
					: ((V = c(V, G)), (V.return = Z), V);
			}
			function I(Z, V, G, ie) {
				var Se = G.type;
				return Se === q
					? ((Z = J(Z, V, G.props.children, ie, G.key)), _i(Z, G), Z)
					: V !== null &&
						  (V.elementType === Se || (typeof Se == "object" && Se !== null && Se.$$typeof === K && ga(Se) === V.type))
						? ((V = c(V, G.props)), _i(V, G), (V.return = Z), V)
						: ((V = ol(G.type, G.key, G.props, null, Z.mode, ie)), _i(V, G), (V.return = Z), V);
			}
			function Q(Z, V, G, ie) {
				return V === null ||
					V.tag !== 4 ||
					V.stateNode.containerInfo !== G.containerInfo ||
					V.stateNode.implementation !== G.implementation
					? ((V = rd(G, Z.mode, ie)), (V.return = Z), V)
					: ((V = c(V, G.children || [])), (V.return = Z), V);
			}
			function J(Z, V, G, ie, Se) {
				return V === null || V.tag !== 7
					? ((V = ua(G, Z.mode, ie, Se)), (V.return = Z), V)
					: ((V = c(V, G)), (V.return = Z), V);
			}
			function oe(Z, V, G) {
				if ((typeof V == "string" && V !== "") || typeof V == "number" || typeof V == "bigint")
					return ((V = nd("" + V, Z.mode, G)), (V.return = Z), V);
				if (typeof V == "object" && V !== null) {
					switch (V.$$typeof) {
						case te:
							return ((G = ol(V.type, V.key, V.props, null, Z.mode, G)), _i(G, V), (G.return = Z), G);
						case R:
							return ((V = rd(V, Z.mode, G)), (V.return = Z), V);
						case K:
							return ((V = ga(V)), oe(Z, V, G));
					}
					if (Ce(V) || fe(V)) return ((V = ua(V, Z.mode, G, null)), (V.return = Z), V);
					if (typeof V.then == "function") return oe(Z, vl(V), G);
					if (V.$$typeof === B) return oe(Z, dl(Z, V), G);
					yl(Z, V);
				}
				return null;
			}
			function $(Z, V, G, ie) {
				var Se = V !== null ? V.key : null;
				if ((typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint")
					return Se !== null ? null : C(Z, V, "" + G, ie);
				if (typeof G == "object" && G !== null) {
					switch (G.$$typeof) {
						case te:
							return G.key === Se ? I(Z, V, G, ie) : null;
						case R:
							return G.key === Se ? Q(Z, V, G, ie) : null;
						case K:
							return ((G = ga(G)), $(Z, V, G, ie));
					}
					if (Ce(G) || fe(G)) return Se !== null ? null : J(Z, V, G, ie, null);
					if (typeof G.then == "function") return $(Z, V, vl(G), ie);
					if (G.$$typeof === B) return $(Z, V, dl(Z, G), ie);
					yl(Z, G);
				}
				return null;
			}
			function X(Z, V, G, ie, Se) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(G) || null), C(V, Z, "" + ie, Se));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case te:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), I(V, Z, ie, Se));
						case R:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), Q(V, Z, ie, Se));
						case K:
							return ((ie = ga(ie)), X(Z, V, G, ie, Se));
					}
					if (Ce(ie) || fe(ie)) return ((Z = Z.get(G) || null), J(V, Z, ie, Se, null));
					if (typeof ie.then == "function") return X(Z, V, G, vl(ie), Se);
					if (ie.$$typeof === B) return X(Z, V, G, dl(V, ie), Se);
					yl(V, ie);
				}
				return null;
			}
			function me(Z, V, G, ie) {
				for (var Se = null, Ze = null, Re = V, je = (V = 0), Bt = null; Re !== null && je < G.length; je++) {
					Re.index > je ? ((Bt = Re), (Re = null)) : (Bt = Re.sibling);
					var Ye = $(Z, Re, G[je], ie);
					if (Ye === null) {
						Re === null && (Re = Bt);
						break;
					}
					(t && Re && Ye.alternate === null && r(Z, Re),
						(V = d(Ye, V, je)),
						Ze === null ? (Se = Ye) : (Ze.sibling = Ye),
						(Ze = Ye),
						(Re = Bt));
				}
				if (je === G.length) return (a(Z, Re), Ve && Qr(Z, je), Se);
				if (Re === null) {
					for (; je < G.length; je++)
						((Re = oe(Z, G[je], ie)),
							Re !== null && ((V = d(Re, V, je)), Ze === null ? (Se = Re) : (Ze.sibling = Re), (Ze = Re)));
					return (Ve && Qr(Z, je), Se);
				}
				for (Re = s(Re); je < G.length; je++)
					((Bt = X(Re, Z, je, G[je], ie)),
						Bt !== null &&
							(t && ((Ye = Bt.alternate), Ye !== null && Re.delete(Ye.key === null ? je : Ye.key)),
							(V = d(Bt, V, je)),
							Ze === null ? (Se = Bt) : (Ze.sibling = Bt),
							(Ze = Bt)));
				return (
					t &&
						Re.forEach(function (Vi) {
							return r(Z, Vi);
						}),
					Ve && Qr(Z, je),
					Se
				);
			}
			function we(Z, V, G, ie) {
				if (G == null) throw Error(u(151));
				for (
					var Se = null, Ze = null, Re = V, je = (V = 0), Bt = null, Ye = G.next();
					Re !== null && !Ye.done;
					je++, Ye = G.next()
				) {
					Re.index > je ? ((Bt = Re), (Re = null)) : (Bt = Re.sibling);
					var Vi = $(Z, Re, Ye.value, ie);
					if (Vi === null) {
						Re === null && (Re = Bt);
						break;
					}
					(t && Re && Vi.alternate === null && r(Z, Re),
						(V = d(Vi, V, je)),
						Ze === null ? (Se = Vi) : (Ze.sibling = Vi),
						(Ze = Vi),
						(Re = Bt));
				}
				if (Ye.done) return (a(Z, Re), Ve && Qr(Z, je), Se);
				if (Re === null) {
					for (; !Ye.done; je++, Ye = G.next())
						((Ye = oe(Z, Ye.value, ie)),
							Ye !== null && ((V = d(Ye, V, je)), Ze === null ? (Se = Ye) : (Ze.sibling = Ye), (Ze = Ye)));
					return (Ve && Qr(Z, je), Se);
				}
				for (Re = s(Re); !Ye.done; je++, Ye = G.next())
					((Ye = X(Re, Z, je, Ye.value, ie)),
						Ye !== null &&
							(t && ((Bt = Ye.alternate), Bt !== null && Re.delete(Bt.key === null ? je : Bt.key)),
							(V = d(Ye, V, je)),
							Ze === null ? (Se = Ye) : (Ze.sibling = Ye),
							(Ze = Ye)));
				return (
					t &&
						Re.forEach(function (Fx) {
							return r(Z, Fx);
						}),
					Ve && Qr(Z, je),
					Se
				);
			}
			function Le(Z, V, G, ie) {
				if (
					(typeof G == "object" &&
						G !== null &&
						G.type === q &&
						G.key === null &&
						G.props.ref === void 0 &&
						(G = G.props.children),
					typeof G == "object" && G !== null)
				) {
					switch (G.$$typeof) {
						case te:
							e: {
								for (var Se = G.key; V !== null;) {
									if (V.key === Se) {
										if (((Se = G.type), Se === q)) {
											if (V.tag === 7) {
												(a(Z, V.sibling), (ie = c(V, G.props.children)), _i(ie, G), (ie.return = Z), (Z = ie));
												break e;
											}
										} else if (
											V.elementType === Se ||
											(typeof Se == "object" && Se !== null && Se.$$typeof === K && ga(Se) === V.type)
										) {
											(a(Z, V.sibling), (ie = c(V, G.props)), _i(ie, G), (ie.return = Z), (Z = ie));
											break e;
										}
										a(Z, V);
										break;
									} else r(Z, V);
									V = V.sibling;
								}
								G.type === q
									? ((ie = ua(G.props.children, Z.mode, ie, G.key)), _i(ie, G), (ie.return = Z), (Z = ie))
									: ((ie = ol(G.type, G.key, G.props, null, Z.mode, ie)), _i(ie, G), (ie.return = Z), (Z = ie));
							}
							return v(Z);
						case R:
							e: {
								for (Se = G.key; V !== null;) {
									if (V.key === Se)
										if (
											V.tag === 4 &&
											V.stateNode.containerInfo === G.containerInfo &&
											V.stateNode.implementation === G.implementation
										) {
											(a(Z, V.sibling), (ie = c(V, G.children || [])), (ie.return = Z), (Z = ie));
											break e;
										} else {
											a(Z, V);
											break;
										}
									else r(Z, V);
									V = V.sibling;
								}
								((ie = rd(G, Z.mode, ie)), (ie.return = Z), (Z = ie));
							}
							return v(Z);
						case K:
							return ((G = ga(G)), Le(Z, V, G, ie));
					}
					if (Ce(G)) return me(Z, V, G, ie);
					if (fe(G)) {
						if (((Se = fe(G)), typeof Se != "function")) throw Error(u(150));
						return ((G = Se.call(G)), we(Z, V, G, ie));
					}
					if (typeof G.then == "function") return Le(Z, V, vl(G), ie);
					if (G.$$typeof === B) return Le(Z, V, dl(Z, G), ie);
					yl(Z, G);
				}
				return (typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint"
					? ((G = "" + G),
						V !== null && V.tag === 6
							? (a(Z, V.sibling), (ie = c(V, G)), (ie.return = Z), (Z = ie))
							: (a(Z, V), (ie = nd(G, Z.mode, ie)), (ie.return = Z), (Z = ie)),
						v(Z))
					: a(Z, V);
			}
			return function (Z, V, G, ie) {
				try {
					Cs = 0;
					var Se = Le(Z, V, G, ie);
					return ((co = null), Se);
				} catch (Re) {
					if (Re === lo || Re === ml) throw Re;
					var Ze = Tn(29, Re, null, Z.mode);
					return ((Ze.lanes = ie), (Ze.return = Z), Ze);
				}
			};
		}
		var ya = by(!0),
			Sy = by(!1),
			Ci = !1;
		function hd(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function md(t, r) {
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
		function pa(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function ba(t, r, a) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (tt & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(s.pending = r),
					(r = al(t)),
					ry(t, null, a),
					r
				);
			}
			return (il(t, s, r, a), al(t));
		}
		function Ts(t, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var s = r.lanes;
				((s &= t.pendingLanes), (a |= s), (r.lanes = a), ov(t, a));
			}
		}
		function gd(t, r) {
			var a = t.updateQueue,
				s = t.alternate;
			if (s !== null && ((s = s.updateQueue), a === s)) {
				var c = null,
					d = null;
				if (((a = a.firstBaseUpdate), a !== null)) {
					do {
						var v = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
						(d === null ? (c = d = v) : (d = d.next = v), (a = a.next));
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
		var vd = !1;
		function xs() {
			if (vd) {
				var t = uo;
				if (t !== null) throw t;
			}
		}
		function Os(t, r, a, s) {
			vd = !1;
			var c = t.updateQueue;
			Ci = !1;
			var d = c.firstBaseUpdate,
				v = c.lastBaseUpdate,
				C = c.shared.pending;
			if (C !== null) {
				c.shared.pending = null;
				var I = C,
					Q = I.next;
				((I.next = null), v === null ? (d = Q) : (v.next = Q), (v = I));
				var J = t.alternate;
				J !== null &&
					((J = J.updateQueue),
					(C = J.lastBaseUpdate),
					C !== v && (C === null ? (J.firstBaseUpdate = Q) : (C.next = Q), (J.lastBaseUpdate = I)));
			}
			if (d !== null) {
				var oe = c.baseState;
				((v = 0), (J = Q = I = null), (C = d));
				do {
					var $ = C.lane & -536870913,
						X = $ !== C.lane;
					if (X ? (He & $) === $ : (s & $) === $) {
						($ !== 0 && $ === ha && (vd = !0),
							J !== null && (J = J.next = { lane: 0, tag: C.tag, payload: C.payload, callback: null, next: null }));
						e: {
							var me = t,
								we = C;
							$ = r;
							var Le = a;
							switch (we.tag) {
								case 1:
									if (((me = we.payload), typeof me == "function")) {
										oe = me.call(Le, oe, $);
										break e;
									}
									oe = me;
									break e;
								case 3:
									me.flags = (me.flags & -65537) | 128;
								case 0:
									if (((me = we.payload), ($ = typeof me == "function" ? me.call(Le, oe, $) : me), $ == null)) break e;
									oe = L({}, oe, $);
									break e;
								case 2:
									Ci = !0;
							}
						}
						(($ = C.callback),
							$ !== null &&
								((t.flags |= 64),
								X && (t.flags |= 8192),
								(X = c.callbacks),
								X === null ? (c.callbacks = [$]) : X.push($)));
					} else
						((X = { lane: $, tag: C.tag, payload: C.payload, callback: C.callback, next: null }),
							J === null ? ((Q = J = X), (I = oe)) : (J = J.next = X),
							(v |= $));
					if (((C = C.next), C === null)) {
						if (((C = c.shared.pending), C === null)) break;
						((X = C), (C = X.next), (X.next = null), (c.lastBaseUpdate = X), (c.shared.pending = null));
					}
				} while (!0);
				(J === null && (I = oe),
					(c.baseState = I),
					(c.firstBaseUpdate = Q),
					(c.lastBaseUpdate = J),
					d === null && (c.shared.lanes = 0),
					(Mi |= v),
					(t.lanes = v),
					(t.memoizedState = oe));
			}
		}
		function wy(t, r) {
			if (typeof t != "function") throw Error(u(191, t));
			t.call(r);
		}
		function Ey(t, r) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) wy(a[t], r);
		}
		var Ti = _t(null),
			pl = _t(0);
		function _y(t, r) {
			((t = ei), Ue(pl, t), Ue(Ti, r), (ei = t | r.baseLanes));
		}
		function yd() {
			(Ue(pl, ei), Ue(Ti, Ti.current));
		}
		function pd() {
			((ei = pl.current), et(Ti), et(pl));
		}
		var an = _t(null),
			vn = null;
		function xi(t) {
			var r = t.alternate;
			(Ue(on, on.current & 1),
				Ue(an, t),
				vn === null && (r === null || Ti.current !== null || r.memoizedState !== null) && (vn = t));
		}
		function bd(t) {
			(Ue(on, on.current), Ue(an, t), vn === null && (vn = t));
		}
		function Cy(t) {
			t.tag === 22 ? (Ue(on, on.current), Ue(an, t), vn === null && (vn = t)) : Oi();
		}
		function Oi() {
			(Ue(on, on.current), Ue(an, an.current));
		}
		function Un(t) {
			(et(an), vn === t && (vn = null), et(on));
		}
		var on = _t(0);
		function As(t, r) {
			(Ue(an, an.current), Ue(on, r));
		}
		function Sd(t) {
			(et(on), et(an), vn === t && (vn = null));
		}
		function bl(t) {
			for (var r = t; r !== null;) {
				if (r.tag === 13) {
					var a = r.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Bh(a) || Ph(a))) return r;
				} else if (r.tag === 19 && r.memoizedProps.revealOrder !== "independent") {
					if ((r.flags & 128) !== 0) return r;
				} else if (r.child !== null) {
					((r.child.return = r), (r = r.child));
					continue;
				}
				if (r === t) break;
				for (; r.sibling === null;) {
					if (r.return === null || r.return === t) return null;
					r = r.return;
				}
				((r.sibling.return = r.return), (r = r.sibling));
			}
			return null;
		}
		var Gr = 0,
			qe = null,
			lt = null,
			Ut = null,
			Sl = !1,
			fo = !1,
			Sa = !1,
			wl = 0,
			Rs = 0,
			ho = null,
			lT = 0;
		function Nt() {
			throw Error(u(321));
		}
		function wd(t, r) {
			if (r === null) return !1;
			for (var a = 0; a < r.length && a < t.length; a++) if (!Ln(t[a], r[a])) return !1;
			return !0;
		}
		function Ed(t, r, a, s, c, d) {
			return (
				(Gr = d),
				(qe = r),
				(r.memoizedState = null),
				(r.updateQueue = null),
				(r.lanes = 0),
				(ce.H = t === null || t.memoizedState === null ? s0 : u0),
				(Sa = !1),
				(d = a(s, c)),
				(Sa = !1),
				fo && (d = xy(r, a, s, c)),
				Ty(t),
				d
			);
		}
		function Ty(t) {
			ce.H = Al;
			var r = lt !== null && lt.next !== null;
			if (((Gr = 0), (Ut = lt = qe = null), (Sl = !1), (Rs = 0), (ho = null), r)) throw Error(u(300));
			t === null || Vt || ((t = t.dependencies), t !== null && fl(t) && (Vt = !0));
		}
		function xy(t, r, a, s) {
			qe = t;
			var c = 0;
			do {
				if ((fo && (ho = null), (Rs = 0), (fo = !1), 25 <= c)) throw Error(u(301));
				if (((c += 1), (Ut = lt = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((ce.H = yT), (d = r(a, s)));
			} while (fo);
			return d;
		}
		function cT() {
			var t = ce.H,
				r = t.useState()[0];
			return (
				(r = typeof r.then == "function" ? Ns(r) : r),
				(t = t.useState()[0]),
				(lt !== null ? lt.memoizedState : null) !== t && (qe.flags |= 1024),
				r
			);
		}
		function _d() {
			var t = wl !== 0;
			return ((wl = 0), t);
		}
		function Cd(t, r, a) {
			((r.updateQueue = t.updateQueue), (r.flags &= -2053), (t.lanes &= ~a));
		}
		function Td(t) {
			if (Sl) {
				for (t = t.memoizedState; t !== null;) {
					var r = t.queue;
					(r !== null && (r.pending = null), (t = t.next));
				}
				Sl = !1;
			}
			((Gr = 0), (Ut = lt = qe = null), (fo = !1), (Rs = wl = 0), (ho = null));
		}
		function Sn() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (Ut === null ? (qe.memoizedState = Ut = t) : (Ut = Ut.next = t), Ut);
		}
		function zt() {
			if (lt === null) {
				var t = qe.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = lt.next;
			var r = Ut === null ? qe.memoizedState : Ut.next;
			if (r !== null) ((Ut = r), (lt = t));
			else {
				if (t === null) throw qe.alternate === null ? Error(u(467)) : Error(u(310));
				((lt = t),
					(t = {
						memoizedState: lt.memoizedState,
						baseState: lt.baseState,
						baseQueue: lt.baseQueue,
						queue: lt.queue,
						next: null,
					}),
					Ut === null ? (qe.memoizedState = Ut = t) : (Ut = Ut.next = t));
			}
			return Ut;
		}
		function El() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function Ns(t) {
			var r = Rs;
			return (
				(Rs += 1),
				ho === null && (ho = []),
				(t = vy(ho, t, r)),
				(r = qe),
				(Ut === null ? r.memoizedState : Ut.next) === null &&
					((r = r.alternate), (ce.H = r === null || r.memoizedState === null ? s0 : u0)),
				t
			);
		}
		function _l(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return Ns(t);
				if (t.$$typeof === ae) return;
				if (t.$$typeof === B) return rn(t);
			}
			throw Error(u(438, String(t)));
		}
		function xd(t) {
			var r = null,
				a = qe.updateQueue;
			if ((a !== null && (r = a.memoCache), r == null)) {
				var s = qe.alternate;
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
				a === null && ((a = El()), (qe.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(t), s = 0; s < t; s++) a[s] = ve;
			return (r.index++, a);
		}
		function Xr(t, r) {
			return typeof r == "function" ? r(t) : r;
		}
		function Cl(t) {
			return Od(zt(), lt, t);
		}
		function Od(t, r, a) {
			var s = t.queue;
			if (s === null) throw Error(u(311));
			s.lastRenderedReducer = a;
			var c = t.baseQueue,
				d = s.pending;
			if (d !== null) {
				if (c !== null) {
					var v = c.next;
					((c.next = d.next), (d.next = v));
				}
				((r.baseQueue = c = d), (s.pending = null));
			}
			if (((d = t.baseState), c === null)) t.memoizedState = d;
			else {
				r = c.next;
				var C = (v = null),
					I = null,
					Q = r,
					J = !1;
				do {
					var oe = Q.lane & -536870913;
					if (oe !== Q.lane ? (He & oe) === oe : (Gr & oe) === oe) {
						var $ = Q.revertLane;
						if ($ === 0)
							(I !== null &&
								(I = I.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: Q.action,
										hasEagerState: Q.hasEagerState,
										eagerState: Q.eagerState,
										next: null,
									}),
								oe === ha && (J = !0));
						else if ((Gr & $) === $) {
							((Q = Q.next), $ === ha && (J = !0));
							continue;
						} else
							((oe = {
								lane: 0,
								revertLane: Q.revertLane,
								gesture: null,
								action: Q.action,
								hasEagerState: Q.hasEagerState,
								eagerState: Q.eagerState,
								next: null,
							}),
								I === null ? ((C = I = oe), (v = d)) : (I = I.next = oe),
								(qe.lanes |= $),
								(Mi |= $));
						((oe = Q.action), Sa && a(d, oe), (d = Q.hasEagerState ? Q.eagerState : a(d, oe)));
					} else
						(($ = {
							lane: oe,
							revertLane: Q.revertLane,
							gesture: Q.gesture,
							action: Q.action,
							hasEagerState: Q.hasEagerState,
							eagerState: Q.eagerState,
							next: null,
						}),
							I === null ? ((C = I = $), (v = d)) : (I = I.next = $),
							(qe.lanes |= oe),
							(Mi |= oe));
					Q = Q.next;
				} while (Q !== null && Q !== r);
				if ((I === null ? (v = d) : (I.next = C), !Ln(d, t.memoizedState) && ((Vt = !0), J && ((a = uo), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = v), (t.baseQueue = I), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
		}
		function Ad(t) {
			var r = zt(),
				a = r.queue;
			if (a === null) throw Error(u(311));
			a.lastRenderedReducer = t;
			var s = a.dispatch,
				c = a.pending,
				d = r.memoizedState;
			if (c !== null) {
				a.pending = null;
				var v = (c = c.next);
				do ((d = t(d, v.action)), (v = v.next));
				while (v !== c);
				(Ln(d, r.memoizedState) || (Vt = !0),
					(r.memoizedState = d),
					r.baseQueue === null && (r.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, s];
		}
		function Oy(t, r, a) {
			var s = qe,
				c = zt(),
				d = Ve;
			if (d) {
				if (a === void 0) throw Error(u(407));
				a = a();
			} else a = r();
			var v = !Ln((lt || c).memoizedState, a);
			if (
				(v && ((c.memoizedState = a), (Vt = !0)),
				(c = c.queue),
				Md(Ny.bind(null, s, c, t), [t]),
				(t = c.getSnapshot !== r || v || (Ut !== null && (Ut.memoizedState.tag & 1) !== 0)),
				mo(t ? 9 : 8, { destroy: void 0 }, Ry.bind(null, s, c, a, r), null),
				t)
			) {
				if (((s.flags |= 2048), dt === null)) throw Error(u(349));
				d || (Gr & 127) !== 0 || Ay(s, r, a);
			}
			return a;
		}
		function Ay(t, r, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: r, value: a }),
				(r = qe.updateQueue),
				r === null
					? ((r = El()), (qe.updateQueue = r), (r.stores = [t]))
					: ((a = r.stores), a === null ? (r.stores = [t]) : a.push(t)));
		}
		function Ry(t, r, a, s) {
			((r.value = a), (r.getSnapshot = s), My(r) && Dy(t));
		}
		function Ny(t, r, a) {
			return a(function () {
				My(r) && Dy(t);
			});
		}
		function My(t) {
			var r = t.getSnapshot;
			t = t.value;
			try {
				var a = r();
				return !Ln(t, a);
			} catch {
				return !0;
			}
		}
		function Dy(t) {
			var r = sa(t, 2);
			r !== null && Rn(r, t, 2);
		}
		function Rd(t) {
			var r = Sn();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), Sa)) {
					pe(!0);
					try {
						a();
					} finally {
						pe(!1);
					}
				}
			}
			return (
				(r.memoizedState = r.baseState = t),
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Xr, lastRenderedState: t }),
				r
			);
		}
		function zy(t, r, a, s) {
			return ((t.baseState = a), Od(t, lt, typeof s == "function" ? s : Xr));
		}
		function fT(t, r, a, s, c) {
			if (Ol(t)) throw Error(u(485));
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
					then: function (v) {
						d.listeners.push(v);
					},
				};
				(ce.T !== null ? a(!0) : (d.isTransition = !1),
					s(d),
					(a = r.pending),
					a === null ? ((d.next = r.pending = d), Iy(r, d)) : ((d.next = a.next), (r.pending = a.next = d)));
			}
		}
		function Iy(t, r) {
			var a = r.action,
				s = r.payload,
				c = t.state;
			if (r.isTransition) {
				var d = ce.T,
					v = {};
				((v.types = d !== null ? d.types : null), (ce.T = v));
				try {
					var C = a(c, s),
						I = ce.S;
					(I !== null && I(v, C), jy(t, r, C));
				} catch (Q) {
					Nd(t, r, Q);
				} finally {
					(d !== null && v.types !== null && (d.types = v.types), (ce.T = d));
				}
			} else
				try {
					((d = a(c, s)), jy(t, r, d));
				} catch (Q) {
					Nd(t, r, Q);
				}
		}
		function jy(t, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (s) {
							ky(t, r, s);
						},
						function (s) {
							return Nd(t, r, s);
						},
					)
				: ky(t, r, a);
		}
		function ky(t, r, a) {
			((r.status = "fulfilled"),
				(r.value = a),
				qy(r),
				(t.state = a),
				(r = t.pending),
				r !== null && ((a = r.next), a === r ? (t.pending = null) : ((a = a.next), (r.next = a), Iy(t, a))));
		}
		function Nd(t, r, a) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((r.status = "rejected"), (r.reason = a), qy(r), (r = r.next));
				while (r !== s);
			}
			t.action = null;
		}
		function qy(t) {
			t = t.listeners;
			for (var r = 0; r < t.length; r++) (0, t[r])();
		}
		function Ly(t, r) {
			return r;
		}
		function Uy(t, r) {
			if (Ve) {
				var a = dt.formState;
				if (a !== null) {
					e: {
						var s = qe;
						if (Ve) {
							if (gt) {
								t: {
									for (var c = gt, d = Wn; c.nodeType !== 8;) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = nr(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((gt = nr(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							wi(s);
						}
						s = !1;
					}
					s && (r = a[0]);
				}
			}
			return (
				(a = Sn()),
				(a.memoizedState = a.baseState = r),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Ly, lastRenderedState: r }),
				(a.queue = s),
				(a = i0.bind(null, qe, s)),
				(s.dispatch = a),
				(s = Rd(!1)),
				(d = kd.bind(null, qe, !1, s.queue)),
				(s = Sn()),
				(c = { state: r, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(a = fT.bind(null, qe, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = t),
				[r, a, !1]
			);
		}
		function Vy(t) {
			return By(zt(), lt, t);
		}
		function By(t, r, a) {
			if (((r = Od(t, r, Ly)[0]), (t = Cl(Xr)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var s = Ns(r);
				} catch (v) {
					throw v === lo ? ml : v;
				}
			else s = r;
			r = zt();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((qe.flags |= 2048), mo(9, { destroy: void 0 }, dT.bind(null, c, a), null)),
				[s, d, t]
			);
		}
		function dT(t, r) {
			t.action = r;
		}
		function Py(t) {
			var r = zt(),
				a = lt;
			if (a !== null) return By(r, a, t);
			(zt(), (r = r.memoizedState), (a = zt()));
			var s = a.queue.dispatch;
			return ((a.memoizedState = t), [r, s, !1]);
		}
		function mo(t, r, a, s) {
			return (
				(t = { tag: t, create: a, deps: s, inst: r, next: null }),
				(r = qe.updateQueue),
				r === null && ((r = El()), (qe.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = t.next = t) : ((s = a.next), (a.next = t), (t.next = s), (r.lastEffect = t)),
				t
			);
		}
		function $y() {
			return zt().memoizedState;
		}
		function Tl(t, r, a, s) {
			var c = Sn();
			((qe.flags |= t), (c.memoizedState = mo(1 | r, { destroy: void 0 }, a, s === void 0 ? null : s)));
		}
		function xl(t, r, a, s) {
			var c = zt();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			lt !== null && s !== null && wd(s, lt.memoizedState.deps)
				? (c.memoizedState = mo(r, d, a, s))
				: ((qe.flags |= t), (c.memoizedState = mo(1 | r, d, a, s)));
		}
		function Hy(t, r) {
			Tl(8390656, 8, t, r);
		}
		function Md(t, r) {
			xl(2048, 8, t, r);
		}
		function hT(t) {
			qe.flags |= 4;
			var r = qe.updateQueue;
			if (r === null) ((r = El()), (qe.updateQueue = r), (r.events = [t]));
			else {
				var a = r.events;
				a === null ? (r.events = [t]) : a.push(t);
			}
		}
		function Zy(t) {
			var r = zt().memoizedState;
			return (
				hT({ ref: r, nextImpl: t }),
				function () {
					if ((tt & 2) !== 0) throw Error(u(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function Fy(t, r) {
			return xl(4, 2, t, r);
		}
		function Qy(t, r) {
			return xl(4, 4, t, r);
		}
		function Yy(t, r) {
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
		function Ky(t, r, a) {
			((a = a != null ? a.concat([t]) : null), xl(4, 4, Yy.bind(null, r, t), a));
		}
		function Dd() {}
		function Gy(t, r) {
			var a = zt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			return r !== null && wd(r, s[1]) ? s[0] : ((a.memoizedState = [t, r]), t);
		}
		function Xy(t, r) {
			var a = zt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			if (r !== null && wd(r, s[1])) return s[0];
			if (((s = t()), Sa)) {
				pe(!0);
				try {
					t();
				} finally {
					pe(!1);
				}
			}
			return ((a.memoizedState = [s, r]), s);
		}
		function zd(t, r, a) {
			return a === void 0 || ((Gr & 1073741824) !== 0 && (He & 261930) === 0)
				? (t.memoizedState = r)
				: ((t.memoizedState = a), (t = ip()), (qe.lanes |= t), (Mi |= t), a);
		}
		function Jy(t, r, a, s) {
			return Ln(a, r)
				? a
				: Ti.current !== null
					? ((t = zd(t, a, s)), Ln(t, r) || (Vt = !0), t)
					: (Gr & 106) === 0 || ((Gr & 1073741824) !== 0 && (He & 261930) === 0)
						? ((Vt = !0), (t.memoizedState = a))
						: ((t = ip()), (qe.lanes |= t), (Mi |= t), r);
		}
		function Wy(t, r, a, s, c) {
			var d = ye.p;
			ye.p = d !== 0 && 8 > d ? d : 8;
			var v = ce.T,
				C = {};
			((C.types = v !== null ? v.types : null), (ce.T = C), kd(t, !1, r, a));
			try {
				var I = c(),
					Q = ce.S;
				(Q !== null && Q(C, I),
					I !== null && typeof I == "object" && typeof I.then == "function"
						? Ms(t, r, uT(I, s), tr(t))
						: Ms(t, r, s, tr(t)));
			} catch (J) {
				Ms(t, r, { then: function () {}, status: "rejected", reason: J }, tr());
			} finally {
				((ye.p = d), v !== null && C.types !== null && (v.types = C.types), (ce.T = v));
			}
		}
		function mT() {}
		function Id(t, r, a, s) {
			if (t.tag !== 5) throw Error(u(476));
			var c = e0(t).queue;
			Wy(
				t,
				c,
				r,
				Ge,
				a === null
					? mT
					: function () {
							return (t0(t), a(s));
						},
			);
		}
		function e0(t) {
			var r = t.memoizedState;
			if (r !== null) return r;
			r = {
				memoizedState: Ge,
				baseState: Ge,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Xr, lastRenderedState: Ge },
				next: null,
			};
			var a = {};
			return (
				(r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Xr, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = r),
				(t = t.alternate),
				t !== null && (t.memoizedState = r),
				r
			);
		}
		function t0(t) {
			var r = e0(t);
			(r.next === null && (r = t.alternate.memoizedState), Ms(t, r.next.queue, {}, tr()));
		}
		function jd() {
			return rn(zo);
		}
		function n0() {
			return zt().memoizedState;
		}
		function r0() {
			return zt().memoizedState;
		}
		function gT(t) {
			for (var r = t.return; r !== null;) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = tr();
						t = pa(a);
						var s = ba(r, t, a);
						(s !== null && (Rn(s, r, a), Ts(s, r, a)), (r = { cache: ld() }), (t.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function vT(t, r, a) {
			var s = tr();
			((a = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				Ol(t) ? a0(r, a) : ((a = ed(t, r, a, s)), a !== null && (Rn(a, t, s), o0(a, r, s))));
		}
		function i0(t, r, a) {
			Ms(t, r, a, tr());
		}
		function Ms(t, r, a, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (Ol(t)) a0(r, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var v = r.lastRenderedState,
							C = d(v, a);
						if (((c.hasEagerState = !0), (c.eagerState = C), Ln(C, v)))
							return (il(t, r, c, 0), dt === null && rl(), !1);
					} catch {}
				if (((a = ed(t, r, c, s)), a !== null)) return (Rn(a, t, s), o0(a, r, s), !0);
			}
			return !1;
		}
		function kd(t, r, a, s) {
			if (
				((s = { lane: 2, revertLane: xh(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				Ol(t))
			) {
				if (r) throw Error(u(479));
			} else ((r = ed(t, a, s, 2)), r !== null && Rn(r, t, 2));
		}
		function Ol(t) {
			var r = t.alternate;
			return t === qe || (r !== null && r === qe);
		}
		function a0(t, r) {
			fo = Sl = !0;
			var a = t.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (t.pending = r));
		}
		function o0(t, r, a) {
			if ((a & 4194048) !== 0) {
				var s = r.lanes;
				((s &= t.pendingLanes), (a |= s), (r.lanes = a), ov(t, a));
			}
		}
		var Al = {
				readContext: rn,
				use: _l,
				useCallback: Nt,
				useContext: Nt,
				useEffect: Nt,
				useImperativeHandle: Nt,
				useLayoutEffect: Nt,
				useInsertionEffect: Nt,
				useMemo: Nt,
				useReducer: Nt,
				useRef: Nt,
				useState: Nt,
				useDebugValue: Nt,
				useDeferredValue: Nt,
				useTransition: Nt,
				useSyncExternalStore: Nt,
				useId: Nt,
				useHostTransitionStatus: Nt,
				useFormState: Nt,
				useActionState: Nt,
				useOptimistic: Nt,
				useMemoCache: Nt,
				useCacheRefresh: Nt,
				useEffectEvent: Nt,
			},
			s0 = {
				readContext: rn,
				use: _l,
				useCallback: function (t, r) {
					return ((Sn().memoizedState = [t, r === void 0 ? null : r]), t);
				},
				useContext: rn,
				useEffect: Hy,
				useImperativeHandle: function (t, r, a) {
					((a = a != null ? a.concat([t]) : null), Tl(4194308, 4, Yy.bind(null, r, t), a));
				},
				useLayoutEffect: function (t, r) {
					return Tl(4194308, 4, t, r);
				},
				useInsertionEffect: function (t, r) {
					Tl(4, 2, t, r);
				},
				useMemo: function (t, r) {
					var a = Sn();
					r = r === void 0 ? null : r;
					var s = t();
					if (Sa) {
						pe(!0);
						try {
							t();
						} finally {
							pe(!1);
						}
					}
					return ((a.memoizedState = [s, r]), s);
				},
				useReducer: function (t, r, a) {
					var s = Sn();
					if (a !== void 0) {
						var c = a(r);
						if (Sa) {
							pe(!0);
							try {
								a(r);
							} finally {
								pe(!1);
							}
						}
					} else c = r;
					return (
						(s.memoizedState = s.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(s.queue = t),
						(t = t.dispatch = vT.bind(null, qe, t)),
						[s.memoizedState, t]
					);
				},
				useRef: function (t) {
					var r = Sn();
					return ((t = { current: t }), (r.memoizedState = t));
				},
				useState: function (t) {
					t = Rd(t);
					var r = t.queue,
						a = i0.bind(null, qe, r);
					return ((r.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					return zd(Sn(), t, r);
				},
				useTransition: function () {
					var t = Rd(!1);
					return ((t = Wy.bind(null, qe, t.queue, !0, !1)), (Sn().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, r, a) {
					var s = qe,
						c = Sn();
					if (Ve) {
						if (a === void 0) throw Error(u(407));
						a = a();
					} else {
						if (((a = r()), dt === null)) throw Error(u(349));
						(He & 127) !== 0 || Ay(s, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						Hy(Ny.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						mo(9, { destroy: void 0 }, Ry.bind(null, s, d, a, r), null),
						a
					);
				},
				useId: function () {
					var t = Sn(),
						r = dt.identifierPrefix;
					if (Ve) {
						var a = _r,
							s = Er;
						((a = (s & ~(1 << (32 - Me(s) - 1))).toString(32) + a),
							(r = "_" + r + "R_" + a),
							(a = wl++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = lT++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = r);
				},
				useHostTransitionStatus: jd,
				useFormState: Uy,
				useActionState: Uy,
				useOptimistic: function (t) {
					var r = Sn();
					r.memoizedState = r.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = kd.bind(null, qe, !0, a)), (a.dispatch = r), [t, r]);
				},
				useMemoCache: xd,
				useCacheRefresh: function () {
					return (Sn().memoizedState = gT.bind(null, qe));
				},
				useEffectEvent: function (t) {
					var r = Sn(),
						a = { impl: t };
					return (
						(r.memoizedState = a),
						function () {
							if ((tt & 2) !== 0) throw Error(u(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			u0 = {
				readContext: rn,
				use: _l,
				useCallback: Gy,
				useContext: rn,
				useEffect: Md,
				useImperativeHandle: Ky,
				useInsertionEffect: Fy,
				useLayoutEffect: Qy,
				useMemo: Xy,
				useReducer: Cl,
				useRef: $y,
				useState: function () {
					return Cl(Xr);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					return Jy(zt(), lt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = Cl(Xr)[0],
						r = zt().memoizedState;
					return [typeof t == "boolean" ? t : Ns(t), r];
				},
				useSyncExternalStore: Oy,
				useId: n0,
				useHostTransitionStatus: jd,
				useFormState: Vy,
				useActionState: Vy,
				useOptimistic: function (t, r) {
					return zy(zt(), lt, t, r);
				},
				useMemoCache: xd,
				useCacheRefresh: r0,
				useEffectEvent: Zy,
			},
			yT = {
				readContext: rn,
				use: _l,
				useCallback: Gy,
				useContext: rn,
				useEffect: Md,
				useImperativeHandle: Ky,
				useInsertionEffect: Fy,
				useLayoutEffect: Qy,
				useMemo: Xy,
				useReducer: Ad,
				useRef: $y,
				useState: function () {
					return Ad(Xr);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					var a = zt();
					return lt === null ? zd(a, t, r) : Jy(a, lt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = Ad(Xr)[0],
						r = zt().memoizedState;
					return [typeof t == "boolean" ? t : Ns(t), r];
				},
				useSyncExternalStore: Oy,
				useId: n0,
				useHostTransitionStatus: jd,
				useFormState: Py,
				useActionState: Py,
				useOptimistic: function (t, r) {
					var a = zt();
					return lt !== null ? zy(a, lt, t, r) : ((a.baseState = t), [t, a.queue.dispatch]);
				},
				useMemoCache: xd,
				useCacheRefresh: r0,
				useEffectEvent: Zy,
			};
		function qd(t, r, a, s) {
			((r = t.memoizedState),
				(a = a(s, r)),
				(a = a == null ? r : L({}, r, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var Ld = {
			enqueueSetState: function (t, r, a) {
				t = t._reactInternals;
				var s = tr(),
					c = pa(s);
				((c.payload = r), a != null && (c.callback = a), (r = ba(t, c, s)), r !== null && (Rn(r, t, s), Ts(r, t, s)));
			},
			enqueueReplaceState: function (t, r, a) {
				t = t._reactInternals;
				var s = tr(),
					c = pa(s);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = ba(t, c, s)),
					r !== null && (Rn(r, t, s), Ts(r, t, s)));
			},
			enqueueForceUpdate: function (t, r) {
				t = t._reactInternals;
				var a = tr(),
					s = pa(a);
				((s.tag = 2), r != null && (s.callback = r), (r = ba(t, s, a)), r !== null && (Rn(r, t, a), Ts(r, t, a)));
			},
		};
		function l0(t, r, a, s, c, d, v) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, v)
					: r.prototype && r.prototype.isPureReactComponent
						? !ys(a, s) || !ys(c, d)
						: !0
			);
		}
		function c0(t, r, a, s) {
			((t = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, s),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, s),
				r.state !== t && Ld.enqueueReplaceState(r, r.state, null));
		}
		function wa(t, r) {
			var a = r;
			if ("ref" in r) {
				a = {};
				for (var s in r) s !== "ref" && (a[s] = r[s]);
			}
			if ((t = t.defaultProps)) {
				a === r && (a = L({}, a));
				for (var c in t) a[c] === void 0 && (a[c] = t[c]);
			}
			return a;
		}
		function pT(t) {
			nl(t);
		}
		function bT(t) {
			console.error(t);
		}
		function ST(t) {
			nl(t);
		}
		function Rl(t, r) {
			try {
				var a = t.onUncaughtError;
				a(r.value, { componentStack: r.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function f0(t, r, a) {
			try {
				var s = t.onCaughtError;
				s(a.value, { componentStack: a.stack, errorBoundary: r.tag === 1 ? r.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Ud(t, r, a) {
			return (
				(a = pa(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					Rl(t, r);
				}),
				a
			);
		}
		function d0(t) {
			return ((t = pa(t)), (t.tag = 3), t);
		}
		function h0(t, r, a, s) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						f0(r, a, s);
					}));
			}
			var v = a.stateNode;
			v !== null &&
				typeof v.componentDidCatch == "function" &&
				(t.callback = function () {
					(f0(r, a, s), typeof c != "function" && (Di === null ? (Di = new Set([this])) : Di.add(this)));
					var C = s.stack;
					this.componentDidCatch(s.value, { componentStack: C !== null ? C : "" });
				});
		}
		function wT(t, r, a, s, c) {
			if (((a.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((r = a.alternate), r !== null && fa(r, a, c, !0), (a = an.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
						case 19:
							return (
								vn === null ? Gl() : a.alternate === null && Mt === 0 && (Mt = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								s === gl
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([s])) : r.add(s), _h(t, s, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								s === gl
									? (a.flags |= 16384)
									: ((r = a.updateQueue),
										r === null
											? ((r = { transitions: null, markerInstances: null, retryQueue: new Set([s]) }),
												(a.updateQueue = r))
											: ((a = r.retryQueue), a === null ? (r.retryQueue = new Set([s])) : a.add(s)),
										_h(t, s, c)),
								!1
							);
					}
					throw Error(u(435, a.tag));
				}
				return (_h(t, s, c), Gl(), !1);
			}
			if (Ve)
				return (
					(r = an.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							s !== ad && ((t = Error(u(422), { cause: s })), Ss(Gn(t, a))))
						: (s !== ad && ((r = Error(u(423), { cause: s })), Ss(Gn(r, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(s = Gn(s, a)),
							(c = Ud(t.stateNode, s, c)),
							gd(t, c),
							Mt !== 4 && (Mt = 2)),
					!1
				);
			var d = Error(u(520), { cause: s });
			if (((d = Gn(d, a)), Us === null ? (Us = [d]) : Us.push(d), Mt !== 4 && (Mt = 2), r === null)) return !0;
			((s = Gn(s, a)), (a = r));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = Ud(a.stateNode, s, t)), gd(a, t), !1);
					case 1:
						if (
							((r = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof r.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Di === null || !Di.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = d0(c)), h0(c, t, a, s), gd(a, c), !1);
						break;
					case 22:
						if (a.memoizedState !== null) return ((a.flags |= 65536), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Vd = Error(u(461)),
			Vt = !1;
		function Ft(t, r, a, s) {
			r.child = t === null ? Sy(r, null, a, s) : ya(r, t.child, a, s);
		}
		function m0(t, r, a, s, c) {
			a = a.render;
			var d = r.ref;
			if ("ref" in s) {
				var v = {};
				for (var C in s) C !== "ref" && (v[C] = s[C]);
			} else v = s;
			return (
				da(r),
				(s = Ed(t, r, a, v, d, c)),
				(C = _d()),
				t !== null && !Vt ? (Cd(t, r, c), Jr(t, r, c)) : (Ve && C && ul(r), (r.flags |= 1), Ft(t, r, s, c), r.child)
			);
		}
		function g0(t, r, a, s, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !td(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), v0(t, r, d, s, c))
					: ((t = ol(a.type, null, s, r, r.mode, c)), (t.ref = r.ref), (t.return = r), (r.child = t));
			}
			if (((d = t.child), !Yd(t, c))) {
				var v = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : ys), a(v, s) && t.ref === r.ref)) return Jr(t, r, c);
			}
			return ((r.flags |= 1), (t = Fr(d, s)), (t.ref = r.ref), (t.return = r), (r.child = t));
		}
		function v0(t, r, a, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (ys(d, s) && t.ref === r.ref)
					if (((Vt = !1), (r.pendingProps = s = d), Yd(t, c))) (t.flags & 131072) !== 0 && (Vt = !0);
					else return ((r.lanes = t.lanes), Jr(t, r, c));
			}
			return Bd(t, r, a, s, c);
		}
		function y0(t, r, a, s) {
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
						for (s = r.child = t.child, c = 0; s !== null;) ((c = c | s.lanes | s.childLanes), (s = s.sibling));
						s = c & ~d;
					} else ((s = 0), (r.child = null));
					return p0(t, r, d, a, s);
				}
				if ((a & 536870912) !== 0)
					((r.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && hl(r, d !== null ? d.cachePool : null),
						d !== null ? _y(r, d) : yd(),
						Cy(r));
				else return ((s = r.lanes = 536870912), p0(t, r, d !== null ? d.baseLanes | a : a, a, s));
			} else
				d !== null
					? (hl(r, d.cachePool), _y(r, d), Oi(), (r.memoizedState = null))
					: (t !== null && hl(r, null), yd(), Oi());
			return (Ft(t, r, c, a), r.child);
		}
		function Ds(t, r) {
			return (
				(t !== null && t.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function p0(t, r, a, s, c) {
			var d = fd();
			return (
				(d = d === null ? null : { parent: Lt._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && hl(r, null),
				yd(),
				Cy(r),
				t !== null && fa(t, r, s, !0),
				(r.childLanes = c),
				null
			);
		}
		function Nl(t, r) {
			return (
				(r = Ml({ mode: r.mode, children: r.children }, t.mode)),
				(r.ref = t.ref),
				(t.child = r),
				(r.return = t),
				r
			);
		}
		function b0(t, r, a) {
			return (ya(r, t.child, null, a), (t = Nl(r, r.pendingProps)), (t.flags |= 2), Un(r), (r.memoizedState = null), t);
		}
		function ET(t, r, a) {
			var s = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), t === null)) {
				if (Ve) {
					if (s.mode === "hidden")
						return (
							(t = Nl(r, s)),
							(r.lanes = 536870912),
							(t.memoizedState = { baseLanes: 0, cachePool: null }),
							Ds(null, t)
						);
					if (
						(bd(r),
						(t = gt)
							? ((t = Qp(t, Wn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: bi !== null ? { id: Er, overflow: _r } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = ay(t)),
									(a.return = r),
									(r.child = a),
									(Gt = r),
									(gt = null)))
							: (t = null),
						t === null)
					)
						throw wi(r);
					return ((r.lanes = 536870912), null);
				}
				return Nl(r, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var v = d.dehydrated;
				if ((bd(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = b0(t, r, a)));
					else if (r.memoizedState !== null) ((r.child = t.child), (r.flags |= 128), (r = null));
					else throw Error(u(558));
				else if ((Vt || fa(t, r, a, !1), (c = (a & t.childLanes) !== 0), Vt || c)) {
					if (Ti.current === null) {
						if (((s = dt), s !== null && ((v = sv(s, a)), v !== 0 && v !== d.retryLane)))
							throw ((d.retryLane = v), sa(t, v), Rn(s, t, v), Vd);
						Gl();
					}
					r = b0(t, r, a);
				} else
					((t = d.treeContext),
						(gt = nr(v.nextSibling)),
						(Gt = r),
						(Ve = !0),
						(Si = null),
						(Wn = !1),
						t !== null && uy(r, t),
						(r = Nl(r, s)),
						(r.flags |= 134221824));
				return r;
			}
			return (
				(t = Fr(t.child, { mode: s.mode, children: s.children })),
				(t.ref = r.ref),
				(r.child = t),
				(t.return = r),
				t
			);
		}
		function go(t, r) {
			var a = r.ref;
			if (a === null) t !== null && t.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(u(284));
				(t === null || t.ref !== a) && (r.flags |= 4194816);
			}
		}
		function Bd(t, r, a, s, c) {
			return (
				da(r),
				(a = Ed(t, r, a, s, void 0, c)),
				(s = _d()),
				t !== null && !Vt ? (Cd(t, r, c), Jr(t, r, c)) : (Ve && s && ul(r), (r.flags |= 1), Ft(t, r, a, c), r.child)
			);
		}
		function S0(t, r, a, s, c, d) {
			return (
				da(r),
				(r.updateQueue = null),
				(a = xy(r, s, a, c)),
				Ty(t),
				(s = _d()),
				t !== null && !Vt ? (Cd(t, r, d), Jr(t, r, d)) : (Ve && s && ul(r), (r.flags |= 1), Ft(t, r, a, d), r.child)
			);
		}
		function w0(t, r, a, s, c) {
			if ((da(r), r.stateNode === null)) {
				var d = io,
					v = a.contextType;
				(typeof v == "object" && v !== null && (d = rn(v)),
					(d = new a(s, d)),
					(r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Ld),
					(r.stateNode = d),
					(d._reactInternals = r),
					(d = r.stateNode),
					(d.props = s),
					(d.state = r.memoizedState),
					(d.refs = {}),
					hd(r),
					(v = a.contextType),
					(d.context = typeof v == "object" && v !== null ? rn(v) : io),
					(d.state = r.memoizedState),
					(v = a.getDerivedStateFromProps),
					typeof v == "function" && (qd(r, a, v, s), (d.state = r.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((v = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						v !== d.state && Ld.enqueueReplaceState(d, d.state, null),
						Os(r, s, d, c),
						xs(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(s = !0));
			} else if (t === null) {
				d = r.stateNode;
				var C = r.memoizedProps,
					I = wa(a, C);
				d.props = I;
				var Q = d.context,
					J = a.contextType;
				((v = io), typeof J == "object" && J !== null && (v = rn(J)));
				var oe = a.getDerivedStateFromProps;
				((J = typeof oe == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(C = r.pendingProps !== C),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((C || Q !== v) && c0(r, d, s, v)),
					(Ci = !1));
				var $ = r.memoizedState;
				((d.state = $),
					Os(r, s, d, c),
					xs(),
					(Q = r.memoizedState),
					C || $ !== Q || Ci
						? (typeof oe == "function" && (qd(r, a, oe, s), (Q = r.memoizedState)),
							(I = Ci || l0(r, a, I, s, $, Q, v))
								? (J ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (r.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (r.flags |= 4194308),
									(r.memoizedProps = s),
									(r.memoizedState = Q)),
							(d.props = s),
							(d.state = Q),
							(d.context = v),
							(s = I))
						: (typeof d.componentDidMount == "function" && (r.flags |= 4194308), (s = !1)));
			} else {
				((d = r.stateNode),
					md(t, r),
					(v = r.memoizedProps),
					(J = wa(a, v)),
					(d.props = J),
					(oe = r.pendingProps),
					($ = d.context),
					(Q = a.contextType),
					(I = io),
					typeof Q == "object" && Q !== null && (I = rn(Q)),
					(C = a.getDerivedStateFromProps),
					(Q = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((v !== oe || $ !== I) && c0(r, d, s, I)),
					(Ci = !1),
					($ = r.memoizedState),
					(d.state = $),
					Os(r, s, d, c),
					xs());
				var X = r.memoizedState;
				v !== oe || $ !== X || Ci || (t !== null && t.dependencies !== null && fl(t.dependencies))
					? (typeof C == "function" && (qd(r, a, C, s), (X = r.memoizedState)),
						(J = Ci || l0(r, a, J, s, $, X, I) || (t !== null && t.dependencies !== null && fl(t.dependencies)))
							? (Q ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, X, I),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, X, I)),
								typeof d.componentDidUpdate == "function" && (r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(v === t.memoizedProps && $ === t.memoizedState) ||
									(r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(v === t.memoizedProps && $ === t.memoizedState) ||
									(r.flags |= 1024),
								(r.memoizedProps = s),
								(r.memoizedState = X)),
						(d.props = s),
						(d.state = X),
						(d.context = I),
						(s = J))
					: (typeof d.componentDidUpdate != "function" ||
							(v === t.memoizedProps && $ === t.memoizedState) ||
							(r.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(v === t.memoizedProps && $ === t.memoizedState) ||
							(r.flags |= 1024),
						(s = !1));
			}
			return (
				(d = s),
				go(t, r),
				(s = (r.flags & 128) !== 0),
				d || s
					? ((d = r.stateNode),
						(a = s && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						t !== null && s ? ((r.child = ya(r, t.child, null, c)), (r.child = ya(r, null, a, c))) : Ft(t, r, a, c),
						(r.memoizedState = d.state),
						(t = r.child))
					: (t = Jr(t, r, c)),
				t
			);
		}
		function E0(t, r, a, s) {
			return (la(), (r.flags |= 256), Ft(t, r, a, s), r.child);
		}
		var Pd = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function $d(t) {
			return { baseLanes: t, cachePool: my() };
		}
		function Hd(t, r, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), r && (t |= Pn), t);
		}
		function _0(t, r, a) {
			var s = r.pendingProps,
				c = !1,
				d = (r.flags & 128) !== 0,
				v;
			if (
				((v = d) || (v = t !== null && t.memoizedState === null ? !1 : (on.current & 2) !== 0),
				v && ((c = !0), (r.flags &= -129)),
				(v = (r.flags & 32) !== 0),
				(r.flags &= -33),
				t === null)
			) {
				if (Ve) {
					if (
						(c ? xi(r) : Oi(),
						(t = gt)
							? ((t = Qp(t, Wn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: bi !== null ? { id: Er, overflow: _r } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = ay(t)),
									(a.return = r),
									(r.child = a),
									(Gt = r),
									(gt = null)))
							: (t = null),
						t === null)
					)
						throw wi(r);
					return (Ph(t) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				return (
					(d = s.children),
					(s = s.fallback),
					c
						? (Oi(),
							(c = r.mode),
							(d = Ml({ mode: "hidden", children: d }, c)),
							(s = ua(s, c, a, null)),
							(d.return = r),
							(s.return = r),
							(d.sibling = s),
							(r.child = d),
							(s = r.child),
							(s.memoizedState = $d(a)),
							(s.childLanes = Hd(t, v, a)),
							(r.memoizedState = Pd),
							Ds(null, s))
						: (xi(r), Zd(r, d))
				);
			}
			var C = t.memoizedState;
			if (C !== null) {
				var I = C.dehydrated;
				if (I !== null) return _T(t, r, d, v, s, I, C, a);
			}
			return c
				? (Oi(),
					(c = s.fallback),
					(d = r.mode),
					(C = t.child),
					(I = C.sibling),
					(s = Fr(C, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = C.subtreeFlags & 1206910976),
					I !== null ? (c = Fr(I, c)) : ((c = ua(c, d, a, null)), (c.flags |= 2)),
					(c.return = r),
					(s.return = r),
					(s.sibling = c),
					(r.child = s),
					Ds(null, s),
					(s = r.child),
					(c = t.child.memoizedState),
					c === null
						? (c = $d(a))
						: ((d = c.cachePool),
							d !== null ? ((C = Lt._currentValue), (d = d.parent !== C ? { parent: C, pool: C } : d)) : (d = my()),
							(c = { baseLanes: c.baseLanes | a, cachePool: d })),
					(s.memoizedState = c),
					(s.childLanes = Hd(t, v, a)),
					(r.memoizedState = Pd),
					Ds(t.child, s))
				: (xi(r),
					(a = t.child),
					(t = a.sibling),
					(a = Fr(a, { mode: "visible", children: s.children })),
					(a.return = r),
					(a.sibling = null),
					t !== null && ((v = r.deletions), v === null ? ((r.deletions = [t]), (r.flags |= 16)) : v.push(t)),
					(r.child = a),
					(r.memoizedState = null),
					a);
		}
		function Zd(t, r) {
			return ((r = Ml({ mode: "visible", children: r }, t.mode)), (r.return = t), (t.child = r));
		}
		function Ml(t, r) {
			return ((t = Tn(22, t, null, r)), (t.lanes = 0), t);
		}
		function Dl(t, r, a) {
			return (
				ya(r, t.child, null, a),
				(t = Zd(r, r.pendingProps.children)),
				(t.flags |= 2),
				(r.memoizedState = null),
				t
			);
		}
		function _T(t, r, a, s, c, d, v, C) {
			if (a)
				return r.flags & 256
					? (xi(r), (r.flags &= -257), Dl(t, r, C))
					: r.memoizedState !== null
						? (Oi(), (r.child = t.child), (r.flags |= 128), null)
						: (Oi(),
							(d = c.fallback),
							(v = r.mode),
							(c = Ml({ mode: "visible", children: c.children }, v)),
							(d = ua(d, v, C, null)),
							(d.flags |= 2),
							(c.return = r),
							(d.return = r),
							(c.sibling = d),
							(r.child = c),
							ya(r, t.child, null, C),
							(c = r.child),
							(c.memoizedState = $d(C)),
							(c.childLanes = Hd(t, s, C)),
							(r.memoizedState = Pd),
							Ds(null, c));
			if ((xi(r), Ph(d))) {
				if (((s = d.nextSibling && d.nextSibling.dataset), s)) var I = s.dgst;
				return (
					(s = I),
					s !== "" &&
						((c = Error(u(419))), (c.stack = ""), (c.digest = s), Ss({ value: c, source: null, stack: null })),
					Dl(t, r, C)
				);
			}
			if ((Vt || fa(t, r, C, !1), (s = (C & t.childLanes) !== 0), Vt || s)) {
				if (Ti.current !== null) return Dl(t, r, C);
				if (((s = dt), s !== null && ((c = sv(s, C)), c !== 0 && c !== v.retryLane)))
					throw ((v.retryLane = c), sa(t, c), Rn(s, t, c), Vd);
				return (Bh(d) || Gl(), Dl(t, r, C));
			}
			return Bh(d)
				? ((r.flags |= 192), (r.child = t.child), null)
				: ((t = v.treeContext),
					(gt = nr(d.nextSibling)),
					(Gt = r),
					(Ve = !0),
					(Si = null),
					(Wn = !1),
					t !== null && uy(r, t),
					(r = Zd(r, c.children)),
					(r.flags |= 134221824),
					r);
		}
		function C0(t, r, a) {
			t.lanes |= r;
			var s = t.alternate;
			(s !== null && (s.lanes |= r), cl(t.return, r, a));
		}
		function T0(t) {
			for (var r = null; t !== null;) {
				var a = t.alternate;
				(a !== null && bl(a) === null && (r = t), (t = t.sibling));
			}
			return r;
		}
		function zl(t, r, a, s, c, d) {
			var v = t.memoizedState;
			v === null
				? (t.memoizedState = {
						isBackwards: r,
						rendering: null,
						renderingStartTime: 0,
						last: s,
						tail: a,
						tailMode: c,
						treeForkCount: d,
					})
				: ((v.isBackwards = r),
					(v.rendering = null),
					(v.renderingStartTime = 0),
					(v.last = s),
					(v.tail = a),
					(v.tailMode = c),
					(v.treeForkCount = d));
		}
		function Fd(t) {
			var r = t.child;
			for (t.child = null; r !== null;) {
				var a = r.sibling;
				((r.sibling = t.child), (t.child = r), (r = a));
			}
		}
		function Qd(t, r, a) {
			var s = r.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var v = on.current;
			if (r.flags & 128) return (As(r, v), null);
			var C = (v & 2) !== 0;
			if (
				(C ? ((v = (v & 1) | 2), (r.flags |= 128)) : (v &= 1),
				As(r, v),
				c === "backwards" && t !== null ? (Fd(t), Ft(t, r, s, a), Fd(t)) : Ft(t, r, s, a),
				(s = Ve ? bs : 0),
				!C && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = r.child; t !== null;) {
					if (t.tag === 13) t.memoizedState !== null && C0(t, a, r);
					else if (t.tag === 19) C0(t, a, r);
					else if (t.child !== null) {
						((t.child.return = t), (t = t.child));
						continue;
					}
					if (t === r) break e;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === r) break e;
						t = t.return;
					}
					((t.sibling.return = t.return), (t = t.sibling));
				}
			switch (c) {
				case "backwards":
					((a = T0(r.child)),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null), Fd(r)),
						zl(r, !0, c, null, d, s));
					break;
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null;) {
						if (((t = c.alternate), t !== null && bl(t) === null)) {
							r.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					zl(r, !0, a, null, d, s);
					break;
				case "together":
					zl(r, !1, null, null, void 0, s);
					break;
				case "independent":
					r.memoizedState = null;
					break;
				default:
					((a = T0(r.child)),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						zl(r, !1, c, a, d, s));
			}
			return r.child;
		}
		function x0(t, r, a) {
			var s = r.pendingProps;
			return (Ei(r, r.type, s.value), Ft(t, r, s.children, a), r.child);
		}
		function Jr(t, r, a) {
			if ((t !== null && (r.dependencies = t.dependencies), (Mi |= r.lanes), (a & r.childLanes) === 0))
				if (t !== null) {
					if ((fa(t, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && r.child !== t.child) throw Error(u(153));
			if (r.child !== null) {
				for (t = r.child, a = Fr(t, t.pendingProps), r.child = a, a.return = r; t.sibling !== null;)
					((t = t.sibling), (a = a.sibling = Fr(t, t.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function Yd(t, r) {
			return (t.lanes & r) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && fl(t)));
		}
		function CT(t, r, a) {
			switch (r.tag) {
				case 3:
					(Qn(r, r.stateNode.containerInfo), Ei(r, Lt, t.memoizedState.cache), la());
					break;
				case 27:
				case 5:
					qt(r);
					break;
				case 4:
					Qn(r, r.stateNode.containerInfo);
					break;
				case 10:
					Ei(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), bd(r), null);
					break;
				case 13:
					var s = r.memoizedState;
					if (s !== null) {
						if (s.dehydrated !== null) return (xi(r), (r.flags |= 128), null);
						s = fa(t, r, a, !1);
						var c = r.child.childLanes;
						return s || (a & c) !== 0 ? _0(t, r, a) : (xi(r), (t = Jr(t, r, a)), t !== null ? t.sibling : null);
					}
					xi(r);
					break;
				case 19:
					if (r.flags & 128) return Qd(t, r, a);
					if (
						((c = (t.flags & 128) !== 0),
						(s = (a & r.childLanes) !== 0),
						s || (fa(t, r, a, !1), (s = (a & r.childLanes) !== 0)),
						c)
					) {
						if (s) return Qd(t, r, a);
						r.flags |= 128;
					}
					if (
						((c = r.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						As(r, on.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((r.lanes = 0), y0(t, r, a, r.pendingProps));
				case 24:
					Ei(r, Lt, t.memoizedState.cache);
			}
			return Jr(t, r, a);
		}
		function O0(t, r, a) {
			if (t !== null)
				if (t.memoizedProps !== r.pendingProps) Vt = !0;
				else {
					if (!Yd(t, a) && (r.flags & 128) === 0) return ((Vt = !1), CT(t, r, a));
					Vt = (t.flags & 131072) !== 0;
				}
			else ((Vt = !1), Ve && (r.flags & 1048576) !== 0 && sy(r, bs, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var s = r.pendingProps;
						if (((t = ga(r.elementType)), (r.type = t), typeof t == "function"))
							td(t)
								? ((s = wa(t, s)), (r.tag = 1), (r = w0(null, r, t, s, a)))
								: ((r.tag = 0), (r = Bd(null, r, t, s, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === ne) {
									((r.tag = 11), (r = m0(null, r, t, s, a)));
									break e;
								} else if (c === ee) {
									((r.tag = 14), (r = g0(null, r, t, s, a)));
									break e;
								} else if (c === B) {
									((r.tag = 10), (r.type = t), (r = x0(null, r, a)));
									break e;
								}
							}
							throw ((r = _e(t) || t), Error(u(306, r, "")));
						}
					}
					return r;
				case 0:
					return Bd(t, r, r.type, r.pendingProps, a);
				case 1:
					return ((s = r.type), (c = wa(s, r.pendingProps)), w0(t, r, s, c, a));
				case 3:
					e: {
						if ((Qn(r, r.stateNode.containerInfo), t === null)) throw Error(u(387));
						s = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), md(t, r), Os(r, s, null, a));
						var v = r.memoizedState;
						if (
							((s = v.cache), Ei(r, Lt, s), s !== d.cache && ud(r, [Lt], a, !0), xs(), (s = v.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: v.cache }),
								(r.updateQueue.baseState = d),
								(r.memoizedState = d),
								r.flags & 256)
							) {
								r = E0(t, r, s, a);
								break e;
							} else if (s !== c) {
								((c = Gn(Error(u(424)), r)), Ss(c), (r = E0(t, r, s, a)));
								break e;
							} else {
								switch (((t = r.stateNode.containerInfo), t.nodeType)) {
									case 9:
										t = t.body;
										break;
									default:
										t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
								}
								for (gt = nr(t.firstChild), Gt = r, Ve = !0, Si = null, Wn = !0, a = Sy(r, null, s, a), r.child = a; a;)
									((a.flags = (a.flags & -3) | 134221824), (a = a.sibling));
							}
						else {
							if ((la(), s === c)) {
								r = Jr(t, r, a);
								break e;
							}
							Ft(t, r, s, a);
						}
						r = r.child;
					}
					return r;
				case 26:
					return (
						go(t, r),
						t === null
							? (a = eb(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Ve || (r.stateNode = Dp(r.type, r.pendingProps, At.current, r))
							: (r.memoizedState = eb(r.type, t.memoizedProps, r.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						qt(r),
						t === null &&
							Ve &&
							((s = r.stateNode = Gp(r.type, r.pendingProps, At.current)),
							(Gt = r),
							(Wn = !0),
							(c = gt),
							ji(r.type) ? (($h = c), (gt = nr(s.firstChild))) : (gt = c)),
						Ft(t, r, r.pendingProps.children, a),
						go(t, r),
						t === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						t === null &&
							Ve &&
							((c = s = gt) &&
								((s = vx(s, r.type, r.pendingProps, Wn)),
								s !== null ? ((r.stateNode = s), (Gt = r), (gt = nr(s.firstChild)), (Wn = !1), (c = !0)) : (c = !1)),
							c || wi(r)),
						qt(r),
						(c = r.type),
						(d = r.pendingProps),
						(v = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Ih(c, d) ? (s = null) : v !== null && Ih(c, v) && (r.flags |= 32),
						r.memoizedState !== null && ((c = Ed(t, r, cT, null, null, a)), (zo._currentValue = c)),
						go(t, r),
						Ft(t, r, s, a),
						r.child
					);
				case 6:
					return (
						t === null &&
							Ve &&
							((t = a = gt) &&
								((a = yx(a, r.pendingProps, Wn)),
								a !== null ? ((r.stateNode = a), (Gt = r), (gt = null), (t = !0)) : (t = !1)),
							t || wi(r)),
						null
					);
				case 13:
					return _0(t, r, a);
				case 4:
					return (
						Qn(r, r.stateNode.containerInfo),
						(s = r.pendingProps),
						t === null ? (r.child = ya(r, null, s, a)) : Ft(t, r, s, a),
						r.child
					);
				case 11:
					return m0(t, r, r.type, r.pendingProps, a);
				case 7:
					return ((s = r.pendingProps), go(t, r), Ft(t, r, s, a), r.child);
				case 8:
					return (Ft(t, r, r.pendingProps.children, a), r.child);
				case 12:
					return (Ft(t, r, r.pendingProps.children, a), r.child);
				case 10:
					return x0(t, r, a);
				case 9:
					return (
						(c = r.type._context),
						(s = r.pendingProps.children),
						da(r),
						(c = rn(c)),
						(s = s(c)),
						(r.flags |= 1),
						Ft(t, r, s, a),
						r.child
					);
				case 14:
					return g0(t, r, r.type, r.pendingProps, a);
				case 15:
					return v0(t, r, r.type, r.pendingProps, a);
				case 19:
					return Qd(t, r, a);
				case 31:
					return ET(t, r, a);
				case 22:
					return y0(t, r, a, r.pendingProps);
				case 24:
					return (
						da(r),
						(s = rn(Lt)),
						t === null
							? ((c = fd()),
								c === null &&
									((c = dt),
									(d = ld()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(r.memoizedState = { parent: s, cache: c }),
								hd(r),
								Ei(r, Lt, c))
							: ((t.lanes & a) !== 0 && (md(t, r), Os(r, null, null, a), xs()),
								(c = t.memoizedState),
								(d = r.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Ei(r, Lt, s))
									: ((s = d.cache), Ei(r, Lt, s), s !== c.cache && ud(r, [Lt], a, !0))),
						Ft(t, r, r.pendingProps.children, a),
						r.child
					);
				case 30:
					return (
						r.stateNode === null && (r.stateNode = { autoName: null, paired: null, clones: null, ref: null }),
						(s = r.pendingProps),
						s.name != null && s.name !== "auto" ? (r.flags |= t === null ? 18882560 : 18874368) : Ve && ul(r),
						t !== null && t.memoizedProps.name !== s.name ? (r.flags |= 4194816) : go(t, r),
						Ft(t, r, s.children, a),
						r.child
					);
				case 29:
					throw r.pendingProps;
			}
			throw Error(u(156, r.tag));
		}
		function Wr(t) {
			t.flags |= 4;
		}
		function Kd(t, r, a, s, c) {
			var d;
			if (
				((d = (t.mode & 32) !== 0) &&
					(d = a === null ? ib(r, s) : ib(r, s) && (s.src !== a.src || s.srcSet !== a.srcSet)),
				d)
			) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (up()) t.flags |= 8192;
					else throw ((va = gl), dd);
			} else t.flags &= -16777217;
		}
		function A0(t, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !ab(r)))
				if (up()) t.flags |= 8192;
				else throw ((va = gl), dd);
		}
		function Il(t, r) {
			(r !== null && (t.flags |= 4),
				t.flags & 16384 && ((r = t.tag !== 22 ? iv() : 536870912), (t.lanes |= r), (So |= r)));
		}
		function zs(t, r) {
			if (!Ve)
				switch (t.tailMode) {
					case "visible":
						break;
					case "collapsed":
						for (var a = t.tail, s = null; a !== null;) (a.alternate !== null && (s = a), (a = a.sibling));
						s === null ? (r || t.tail === null ? (t.tail = null) : (t.tail.sibling = null)) : (s.sibling = null);
						break;
					default:
						for (r = t.tail, a = null; r !== null;) (r.alternate !== null && (a = r), (r = r.sibling));
						a === null ? (t.tail = null) : (a.sibling = null);
				}
		}
		function vt(t) {
			var r = t.alternate !== null && t.alternate.child === t.child,
				a = 0,
				s = 0;
			if (r)
				for (var c = t.child; c !== null;)
					((a |= c.lanes | c.childLanes),
						(s |= c.subtreeFlags & 1206910976),
						(s |= c.flags & 1206910976),
						(c.return = t),
						(c = c.sibling));
			else
				for (c = t.child; c !== null;)
					((a |= c.lanes | c.childLanes), (s |= c.subtreeFlags), (s |= c.flags), (c.return = t), (c = c.sibling));
			return ((t.subtreeFlags |= s), (t.childLanes = a), r);
		}
		function TT(t, r, a) {
			var s = r.pendingProps;
			switch ((id(r), r.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (vt(r), null);
				case 1:
					return (vt(r), null);
				case 3:
					return (
						(a = r.stateNode),
						(s = null),
						t !== null && (s = t.memoizedState.cache),
						r.memoizedState.cache !== s && (r.flags |= 2048),
						Kr(Lt),
						Ct(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(so(r)
								? Wr(r)
								: t === null || (t.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), od())),
						vt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						t === null
							? (Wr(r), d !== null ? (vt(r), A0(r, d)) : (vt(r), Kd(r, c, null, s, a)))
							: d
								? d !== t.memoizedState
									? (Wr(r), vt(r), A0(r, d))
									: (vt(r), (r.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && Wr(r), vt(r), Kd(r, c, t, s, a)),
						null
					);
				case 27:
					if ((hn(r), (a = At.current), (c = r.type), t !== null && r.stateNode != null))
						t.memoizedProps !== s && Wr(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(u(166));
							return (vt(r), (r.subtreeFlags &= -33554433), null);
						}
						((t = Qe.current), so(r) ? ly(r, t) : ((t = Gp(c, s, a)), (r.stateNode = t), Wr(r)));
					}
					return (vt(r), (r.subtreeFlags &= -33554433), null);
				case 5:
					if ((hn(r), (c = r.type), t !== null && r.stateNode != null)) t.memoizedProps !== s && Wr(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(u(166));
							return (vt(r), (r.subtreeFlags &= -33554433), null);
						}
						if (((d = Qe.current), so(r))) ly(r, d);
						else {
							var v = Hs(At.current);
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
												typeof s.is == "string" ? v.createElement("select", { is: s.is }) : v.createElement("select")),
												s.multiple ? (d.multiple = !0) : s.size && (d.size = s.size));
											break;
										default:
											d = typeof s.is == "string" ? v.createElement(c, { is: s.is }) : v.createElement(c);
									}
							}
							((d[nn] = r), (d[Cn] = s));
							e: for (v = r.child; v !== null;) {
								if (v.tag === 5 || v.tag === 6) d.appendChild(v.stateNode);
								else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
									((v.child.return = v), (v = v.child));
									continue;
								}
								if (v === r) break e;
								for (; v.sibling === null;) {
									if (v.return === null || v.return === r) break e;
									v = v.return;
								}
								((v.sibling.return = v.return), (v = v.sibling));
							}
							r.stateNode = d;
							e: switch ((un(d, c, s), c)) {
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
							s && Wr(r);
						}
					}
					return (
						vt(r),
						(r.subtreeFlags &= -33554433),
						Kd(r, r.type, t === null ? null : t.memoizedProps, r.pendingProps, a),
						null
					);
				case 6:
					if (t && r.stateNode != null) t.memoizedProps !== s && Wr(r);
					else {
						if (typeof s != "string" && r.stateNode === null) throw Error(u(166));
						if (((t = At.current), so(r))) {
							if (((t = r.stateNode), (a = r.memoizedProps), (s = null), (c = Gt), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[nn] = r),
								(t = !!(t.nodeValue === a || (s !== null && s.suppressHydrationWarning === !0) || Ap(t.nodeValue, a))),
								t || wi(r, !0));
						} else ((t = Hs(t).createTextNode(s)), (t[nn] = r), (r.stateNode = t));
					}
					return (vt(r), null);
				case 31:
					if (((a = r.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = so(r)), a !== null)) {
							if (t === null) {
								if (!s) throw Error(u(318));
								if (((t = r.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(557));
								t[nn] = r;
							} else (la(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(vt(r), (t = !1));
						} else
							((a = od()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return r.flags & 256 ? (Un(r), r) : (Un(r), null);
						if ((r.flags & 128) !== 0) throw Error(u(558));
					}
					return (vt(r), null);
				case 13:
					if (
						((s = r.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = so(r)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(u(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(u(317));
								c[nn] = r;
							} else (la(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(vt(r), (c = !1));
						} else
							((c = od()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return r.flags & 256 ? (Un(r), r) : (Un(r), null);
					}
					return (
						Un(r),
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
								Il(r, r.updateQueue),
								vt(r),
								null)
					);
				case 4:
					return (Ct(), t === null && Cp(r.stateNode.containerInfo), (r.flags |= 67108864), vt(r), null);
				case 10:
					return (Kr(r.type), vt(r), null);
				case 19:
					if ((Sd(r), (s = r.memoizedState), s === null)) return (vt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) zs(s, !1);
						else {
							if (Mt !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = r.child; t !== null;) {
									if (((d = bl(t)), d !== null)) {
										for (
											r.flags |= 128,
												zs(s, !1),
												t = d.updateQueue,
												r.updateQueue = t,
												Il(r, t),
												r.subtreeFlags = 0,
												t = a,
												a = r.child;
											a !== null;
										)
											(iy(a, t), (a = a.sibling));
										return (As(r, (on.current & 1) | 2), Ve && Qr(r, s.treeForkCount), r.child);
									}
									t = t.sibling;
								}
							s.tail !== null && tn() > Fl && ((r.flags |= 128), (c = !0), zs(s, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = bl(d)), t !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(r.updateQueue = t),
									Il(r, t),
									zs(s, !0),
									s.tail === null && s.tailMode !== "collapsed" && s.tailMode !== "visible" && !d.alternate && !Ve)
								)
									return (vt(r), null);
							} else
								2 * tn() - s.renderingStartTime > Fl &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), zs(s, !1), (r.lanes = 4194304));
						s.isBackwards
							? ((d.sibling = r.child), (r.child = d))
							: ((t = s.last), t !== null ? (t.sibling = d) : (r.child = d), (s.last = d));
					}
					if (s.tail !== null) {
						t = s.tail;
						e: {
							for (a = t; a !== null;) {
								if (a.alternate !== null) {
									a = !1;
									break e;
								}
								a = a.sibling;
							}
							a = !0;
						}
						return (
							(s.rendering = t),
							(s.tail = t.sibling),
							(s.renderingStartTime = tn()),
							(t.sibling = null),
							(d = on.current),
							(d = c ? (d & 1) | 2 : d & 1),
							s.tailMode === "visible" || s.tailMode === "collapsed" || !a || Ve
								? As(r, d)
								: ((a = d), Ue(an, r), Ue(on, a), vn === null && (vn = r)),
							Ve && Qr(r, s.treeForkCount),
							t
						);
					}
					return (vt(r), null);
				case 22:
				case 23:
					return (
						Un(r),
						pd(),
						(s = r.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== s && (r.flags |= 8192) : s && (r.flags |= 8192),
						s
							? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (vt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
							: vt(r),
						(a = r.updateQueue),
						a !== null && Il(r, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(s = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (s = r.memoizedState.cachePool.pool),
						s !== a && (r.flags |= 2048),
						t !== null && et(ma),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						r.memoizedState.cache !== a && (r.flags |= 2048),
						Kr(Lt),
						vt(r),
						null
					);
				case 25:
					return null;
				case 30:
					return ((r.flags |= 33554432), vt(r), null);
			}
			throw Error(u(156, r.tag));
		}
		function xT(t, r) {
			switch ((id(r), r.tag)) {
				case 1:
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 3:
					return (
						Kr(Lt),
						Ct(),
						(t = r.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((r.flags = (t & -65537) | 128), r) : null
					);
				case 26:
				case 27:
				case 5:
					return (hn(r), null);
				case 31:
					if (r.memoizedState !== null) {
						if ((Un(r), r.alternate === null)) throw Error(u(340));
						la();
					}
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 13:
					if ((Un(r), (t = r.memoizedState), t !== null && t.dehydrated !== null)) {
						if (r.alternate === null) throw Error(u(340));
						la();
					}
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 19:
					return (
						Sd(r),
						(t = r.flags),
						t & 65536
							? ((r.flags = (t & -65537) | 128),
								(t = r.memoizedState),
								t !== null && ((t.rendering = null), (t.tail = null)),
								(r.flags |= 4),
								r)
							: null
					);
				case 4:
					return (Ct(), null);
				case 10:
					return (Kr(r.type), null);
				case 22:
				case 23:
					return (
						Un(r),
						pd(),
						t !== null && et(ma),
						(t = r.flags),
						t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
					);
				case 24:
					return (Kr(Lt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function R0(t, r) {
			switch ((id(r), r.tag)) {
				case 3:
					(Kr(Lt), Ct());
					break;
				case 26:
				case 27:
				case 5:
					hn(r);
					break;
				case 4:
					Ct();
					break;
				case 31:
					r.memoizedState !== null && Un(r);
					break;
				case 13:
					Un(r);
					break;
				case 19:
					Sd(r);
					break;
				case 10:
					Kr(r.type);
					break;
				case 22:
				case 23:
					(Un(r), pd(), t !== null && et(ma));
					break;
				case 24:
					Kr(Lt);
			}
		}
		function Is(t, r) {
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
								v = a.inst;
							((s = d()), (v.destroy = s));
						}
						a = a.next;
					} while (a !== c);
				}
			} catch (C) {
				ot(r, r.return, C);
			}
		}
		function Ai(t, r, a) {
			try {
				var s = r.updateQueue,
					c = s !== null ? s.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					s = d;
					do {
						if ((s.tag & t) === t) {
							var v = s.inst,
								C = v.destroy;
							if (C !== void 0) {
								((v.destroy = void 0), (c = r));
								var I = a,
									Q = C;
								try {
									Q();
								} catch (J) {
									ot(c, I, J);
								}
							}
						}
						s = s.next;
					} while (s !== d);
				}
			} catch (J) {
				ot(r, r.return, J);
			}
		}
		function N0(t) {
			var r = t.updateQueue;
			if (r !== null) {
				var a = t.stateNode;
				try {
					Ey(r, a);
				} catch (s) {
					ot(t, t.return, s);
				}
			}
		}
		function M0(t, r, a) {
			((a.props = wa(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (s) {
				ot(t, r, s);
			}
		}
		function Cr(t, r) {
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
							var c = t.stateNode,
								d = Hr(t.memoizedProps, c);
							((c.ref === null || c.ref.name !== d) && (c.ref = Vp(d)), (s = c.ref));
							break;
						case 7:
							if (t.stateNode === null) {
								var v = new $n(t);
								(y(t.child, !1, mx, v, void 0, void 0), (t.stateNode = v));
							}
							s = t.stateNode;
							break;
						default:
							s = t.stateNode;
					}
					typeof a == "function" ? (t.refCleanup = a(s)) : (a.current = s);
				}
			} catch (C) {
				ot(t, r, C);
			}
		}
		function sn(t, r) {
			var a = t.ref,
				s = t.refCleanup;
			if (a !== null)
				if (typeof s == "function")
					try {
						s();
					} catch (c) {
						ot(t, r, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						ot(t, r, c);
					}
				else a.current = null;
		}
		function jl(t, r) {
			if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && r !== null)
				for (var a = 0; a < r.length; a++) Fp(t.stateNode, r[a]);
		}
		function D0(t) {
			for (var r = t.return; r !== null && (Xd(r) && Fp(t.stateNode, r.stateNode), !Gd(r));) r = r.return;
		}
		function js(t) {
			for (var r = t.return; r !== null && (Xd(r) && gx(t.stateNode, r.stateNode), !Gd(r));) r = r.return;
		}
		function Gd(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 27;
		}
		function Xd(t) {
			return t && t.tag === 7 && t.stateNode !== null;
		}
		function Jd(t) {
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
				ot(t, t.return, c);
			}
		}
		function Wd(t, r, a) {
			try {
				var s = t.stateNode;
				(GT(s, t.type, a, r), (s[Cn] = r));
			} catch (c) {
				ot(t, t.return, c);
			}
		}
		function z0(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ji(t.type)) || t.tag === 4;
		}
		function eh(t) {
			e: for (;;) {
				for (; t.sibling === null;) {
					if (t.return === null || z0(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;) {
					if ((t.tag === 27 && ji(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function th(t, r, a, s) {
			var c = t.tag;
			if (c === 5 || c === 6)
				((c = t.stateNode),
					r
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(c, r)
						: ((r = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							r.appendChild(c),
							(a = a._reactRootContainer),
							a != null || r.onclick !== null || (r.onclick = wr)),
					jl(t, s),
					(Xe = !0));
			else if (
				c !== 4 &&
				(c === 27 && (jl(t, s), (s = null), ji(t.type) && ((a = t.stateNode), (r = null))), (t = t.child), t !== null)
			)
				for (th(t, r, a, s), t = t.sibling; t !== null;) (th(t, r, a, s), (t = t.sibling));
		}
		function kl(t, r, a, s) {
			var c = t.tag;
			if (c === 5 || c === 6) ((c = t.stateNode), r ? a.insertBefore(c, r) : a.appendChild(c), jl(t, s), (Xe = !0));
			else if (
				c !== 4 &&
				(c === 27 && (jl(t, s), (s = null), ji(t.type) && (a = t.stateNode)), (t = t.child), t !== null)
			)
				for (kl(t, r, a, s), t = t.sibling; t !== null;) (kl(t, r, a, s), (t = t.sibling));
		}
		function I0(t) {
			var r = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var s = t.type, c = r.attributes; c.length;) r.removeAttributeNode(c[0]);
				(un(r, s, a), (r[nn] = t), (r[Cn] = a));
			} catch (d) {
				ot(t, t.return, d);
			}
		}
		var ql = !1,
			Vn = null;
		function j0(t) {
			(t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ql = !0);
		}
		var Tr = null;
		function k0() {
			var t = Tr;
			return ((Tr = null), t);
		}
		var xn = 0;
		function vo(t, r, a, s, c) {
			return ((xn = 0), q0(t.child, r, a, s, c));
		}
		function q0(t, r, a, s, c) {
			for (var d = !1; t !== null;) {
				if (t.tag === 5) {
					var v = t.stateNode;
					if (s !== null) {
						var C = qh(v);
						(s.push(C), C.view && (d = !0));
					} else d || (qh(v).view && (d = !0));
					((ql = !0), qp(v, xn === 0 ? r : r + "_" + xn, a), xn++);
				} else
					(t.tag !== 22 || t.memoizedState === null) && ((t.tag === 30 && c) || (q0(t.child, r, a, s, c) && (d = !0)));
				t = t.sibling;
			}
			return d;
		}
		function xr(t, r) {
			for (; t !== null;)
				(t.tag === 5
					? Lp(t.stateNode, t.memoizedProps)
					: (t.tag !== 22 || t.memoizedState === null) && ((t.tag === 30 && r) || xr(t.child, r)),
					(t = t.sibling));
		}
		function Ll(t) {
			if ((t.subtreeFlags & 18874368) !== 0)
				for (t = t.child; t !== null;) {
					if (
						(t.tag !== 22 || t.memoizedState === null) &&
						(Ll(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)
					) {
						var r = t.memoizedProps;
						if (r.name == null || r.name === "auto") throw Error(u(544));
						var a = r.name;
						((r = Zr(r.default, r.share)), r !== "none" && (vo(t, a, r, null, !1) || xr(t.child, !1)));
					}
					t = t.sibling;
				}
		}
		function nh(t, r) {
			if (t.tag === 30) {
				var a = t.stateNode,
					s = t.memoizedProps,
					c = Hr(s, a),
					d = Zr(s.default, a.paired ? s.share : s.enter);
				d !== "none" ? (vo(t, c, d, null, !1) ? (Ll(t), a.paired || r || Co(t, s.onEnter)) : xr(t.child, !1)) : Ll(t);
			} else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) (nh(t, r), (t = t.sibling));
			else Ll(t);
		}
		function rh(t) {
			if (Vn !== null && Vn.size !== 0) {
				var r = Vn;
				if ((t.subtreeFlags & 18874368) !== 0)
					for (t = t.child; t !== null;) {
						if (t.tag !== 22 || t.memoizedState === null) {
							if (t.tag === 30 && (t.flags & 18874368) !== 0) {
								var a = t.memoizedProps,
									s = a.name;
								if (s != null && s !== "auto") {
									var c = r.get(s);
									if (c !== void 0) {
										var d = Zr(a.default, a.share);
										if (
											(d !== "none" &&
												(vo(t, s, d, null, !1)
													? ((d = t.stateNode), (c.paired = d), (d.paired = c), Co(t, a.onShare))
													: xr(t.child, !1)),
											r.delete(s),
											r.size === 0)
										)
											break;
									}
								}
							}
							rh(t);
						}
						t = t.sibling;
					}
			}
		}
		function ih(t) {
			if (t.tag === 30) {
				var r = t.memoizedProps,
					a = Hr(r, t.stateNode),
					s = Vn !== null ? Vn.get(a) : void 0,
					c = Zr(r.default, s !== void 0 ? r.share : r.exit);
				(c !== "none" &&
					(vo(t, a, c, null, !1)
						? s !== void 0
							? ((c = t.stateNode), (s.paired = c), (c.paired = s), Vn.delete(a), Co(t, r.onShare))
							: Co(t, r.onExit)
						: xr(t.child, !1)),
					Vn !== null && rh(t));
			} else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) (ih(t), (t = t.sibling));
			else Vn !== null && rh(t);
		}
		function L0(t) {
			for (t = t.child; t !== null;) {
				if (t.tag === 30) {
					var r = t.memoizedProps,
						a = Hr(r, t.stateNode);
					((r = Zr(r.default, r.update)), (t.flags &= -5), r !== "none" && vo(t, a, r, (t.memoizedState = []), !1));
				} else (t.subtreeFlags & 33554432) !== 0 && L0(t);
				t = t.sibling;
			}
		}
		function ah(t) {
			if ((t.subtreeFlags & 18874368) !== 0)
				for (t = t.child; t !== null;) {
					if (t.tag !== 22 || t.memoizedState === null) {
						if (t.tag === 30 && (t.flags & 18874368) !== 0) {
							var r = t.stateNode;
							r.paired !== null && ((r.paired = null), xr(t.child, !1));
						}
						ah(t);
					}
					t = t.sibling;
				}
		}
		function Ul(t) {
			if (t.tag === 30) ((t.stateNode.paired = null), xr(t.child, !1), ah(t));
			else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) (Ul(t), (t = t.sibling));
			else ah(t);
		}
		function U0(t) {
			for (t = t.child; t !== null;)
				(t.tag === 30 ? xr(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && U0(t), (t = t.sibling));
		}
		function oh(t, r, a, s, c, d, v) {
			for (var C = !1; r !== null;) {
				if (r.tag === 5) {
					var I = r.stateNode;
					if (d !== null && xn < d.length) {
						var Q = d[xn],
							J = qh(I);
						(Q.view || J.view) && (C = !0);
						var oe;
						if ((oe = (t.flags & 4) === 0))
							if (J.clip) oe = !0;
							else {
								oe = Q.rect;
								var $ = J.rect;
								oe = oe.y !== $.y || oe.x !== $.x || oe.height !== $.height || oe.width !== $.width;
							}
						(oe && (t.flags |= 4),
							J.abs ? (J = !Q.abs) : ((Q = Q.rect), (J = J.rect), (J = Q.height !== J.height || Q.width !== J.width)),
							J && (t.flags |= 32));
					} else t.flags |= 32;
					((t.flags & 4) !== 0 && qp(I, xn === 0 ? a : a + "_" + xn, c),
						(C && (t.flags & 4) !== 0) ||
							(Tr === null && (Tr = []), Tr.push(I, xn === 0 ? s : s + "_" + xn, r.memoizedProps)),
						xn++);
				} else
					(r.tag !== 22 || r.memoizedState === null) &&
						(r.tag === 30 && v ? (t.flags |= r.flags & 32) : oh(t, r.child, a, s, c, d, v) && (C = !0));
				r = r.sibling;
			}
			return C;
		}
		function V0(t, r) {
			for (t = t.child; t !== null;) {
				if (t.tag === 30) {
					var a = t.memoizedProps,
						s = t.stateNode,
						c = Hr(a, s),
						d = Zr(a.default, a.update);
					if (r) {
						s = s.clones;
						var v = s === null ? null : s.map(nx);
					} else ((v = t.memoizedState), (t.memoizedState = null));
					s = t;
					var C = t.child;
					((xn = 0), (c = oh(s, C, c, c, d, v, !1)), (t.flags & 4) !== 0 && c && (r || Co(t, a.onUpdate)));
				} else (t.subtreeFlags & 33554432) !== 0 && V0(t, r);
				t = t.sibling;
			}
		}
		var Xt = !1,
			rt = !1,
			Or = !1,
			sh = !1,
			B0 = typeof WeakSet == "function" ? WeakSet : Set,
			Jt = null,
			Ar = !1,
			ks = !1,
			Vl = !1,
			uh = !1;
		function OT(t, r, a) {
			if (((t = t.containerInfo), (Dh = Io), (t = Yv(t)), Yf(t))) {
				if ("selectionStart" in t) var s = { start: t.selectionStart, end: t.selectionEnd };
				else
					e: {
						s = ((s = t.ownerDocument) && s.defaultView) || window;
						var c = s.getSelection && s.getSelection();
						if (c && c.rangeCount !== 0) {
							s = c.anchorNode;
							var d = c.anchorOffset,
								v = c.focusNode;
							c = c.focusOffset;
							try {
								(s.nodeType, v.nodeType);
							} catch {
								s = null;
								break e;
							}
							var C = 0,
								I = -1,
								Q = -1,
								J = 0,
								oe = 0,
								$ = t,
								X = null;
							t: for (;;) {
								for (
									var me;
									$ !== s || (d !== 0 && $.nodeType !== 3) || (I = C + d),
										$ !== v || (c !== 0 && $.nodeType !== 3) || (Q = C + c),
										$.nodeType === 3 && (C += $.nodeValue.length),
										(me = $.firstChild) !== null;
								)
									((X = $), ($ = me));
								for (;;) {
									if ($ === t) break t;
									if (
										(X === s && ++J === d && (I = C), X === v && ++oe === c && (Q = C), (me = $.nextSibling) !== null)
									)
										break;
									(($ = X), (X = $.parentNode));
								}
								$ = me;
							}
							s = I === -1 || Q === -1 ? null : { start: I, end: Q };
						} else s = null;
					}
				s = s || { start: 0, end: 0 };
			} else s = null;
			for (
				zh = { focusedElem: t, selectionRange: s }, Io = !1, a = (a & 335544064) === a, Jt = r, r = a ? 9270 : 1024;
				Jt !== null;
			) {
				if (((t = Jt), a && ((s = t.deletions), s !== null))) for (d = 0; d < s.length; d++) a && ih(s[d]);
				if (t.alternate === null && (t.flags & 2) !== 0) (a && j0(t), Bl(a));
				else {
					if (t.tag === 22) {
						if (((s = t.alternate), t.memoizedState !== null)) {
							(s !== null && s.memoizedState === null && a && ih(s), Bl(a));
							continue;
						} else if (s !== null && s.memoizedState !== null) {
							(a && j0(t), Bl(a));
							continue;
						}
					}
					((s = t.child), (t.subtreeFlags & r) !== 0 && s !== null ? ((s.return = t), (Jt = s)) : (a && L0(t), Bl(a)));
				}
			}
			Vn = null;
		}
		function Bl(t) {
			for (; Jt !== null;) {
				var r = Jt,
					a = t,
					s = r.alternate,
					c = r.flags;
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						break;
					case 1:
						if ((c & 1024) !== 0 && s !== null) {
							((a = void 0), (c = s.memoizedProps), (s = s.memoizedState));
							var d = r.stateNode;
							try {
								var v = wa(r.type, c);
								((a = d.getSnapshotBeforeUpdate(v, s)), (d.__reactInternalSnapshotBeforeUpdate = a));
							} catch (C) {
								ot(r, r.return, C);
							}
						}
						break;
					case 3:
						if ((c & 1024) !== 0) {
							if (((s = r.stateNode.containerInfo), (a = s.nodeType), a === 9)) Vh(s);
							else if (a === 1)
								switch (s.nodeName) {
									case "HEAD":
									case "HTML":
									case "BODY":
										Vh(s);
										break;
									default:
										s.textContent = "";
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
					case 30:
						a &&
							s !== null &&
							((a = Hr(s.memoizedProps, s.stateNode)),
							(c = r.memoizedProps),
							(c = Zr(c.default, c.update)),
							c !== "none" && vo(s, a, c, (s.memoizedState = []), !0));
						break;
					default:
						if ((c & 1024) !== 0) throw Error(u(163));
				}
				if (((s = r.sibling), s !== null)) {
					((s.return = r.return), (Jt = s));
					break;
				}
				Jt = r.return;
			}
		}
		function P0(t, r, a) {
			var s = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(Rr(t, a), s & 4 && Is(5, a));
					break;
				case 1:
					if ((Rr(t, a), s & 4))
						if (((t = a.stateNode), r === null))
							try {
								t.componentDidMount();
							} catch (v) {
								ot(a, a.return, v);
							}
						else {
							var c = wa(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								t.componentDidUpdate(c, r, t.__reactInternalSnapshotBeforeUpdate);
							} catch (v) {
								ot(a, a.return, v);
							}
						}
					(s & 64 && N0(a), s & 512 && Cr(a, a.return));
					break;
				case 3:
					if ((Rr(t, a), s & 64 && ((t = a.updateQueue), t !== null))) {
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
							Ey(t, r);
						} catch (v) {
							ot(a, a.return, v);
						}
					}
					break;
				case 27:
					r === null && s & 4 && I0(a);
				case 26:
				case 5:
					(Rr(t, a), r === null && s & 4 && Jd(a), s & 512 && Cr(a, a.return));
					break;
				case 12:
					Rr(t, a);
					break;
				case 31:
					(Rr(t, a), s & 4 && F0(t, a));
					break;
				case 13:
					(Rr(t, a),
						s & 4 && Q0(t, a),
						s & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = UT.bind(null, a)), px(t, a)))));
					break;
				case 22:
					if (((s = a.memoizedState !== null || Xt), !s)) {
						var d = (r !== null && r.memoizedState !== null) || rt;
						((r = Xt),
							(c = rt),
							(Xt = s),
							(rt = d) && !c ? ((s = 2), (a.subtreeFlags & 8772) !== 0 && (s |= 1), dr(t, a, s)) : Rr(t, a),
							(Xt = r),
							(rt = c));
					}
					break;
				case 30:
					(Rr(t, a), s & 512 && Cr(a, a.return));
					break;
				case 7:
					s & 512 && Cr(a, a.return);
				default:
					Rr(t, a);
			}
		}
		function lh(t, r) {
			for (t = t.child; t !== null;) ($0(t, r), (t = t.sibling));
		}
		function $0(t, r) {
			switch (t.tag) {
				case 5:
				case 26:
					try {
						var a = t.stateNode;
						if (r) {
							var s = a.style;
							typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : (s.display = "none");
						} else {
							var c = t.stateNode,
								d = t.memoizedProps.style,
								v = d != null && d.hasOwnProperty("display") ? d.display : null;
							c.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
						}
					} catch (I) {
						ot(t, t.return, I);
					}
					ch(t, r);
					break;
				case 6:
					try {
						((t.stateNode.nodeValue = r ? "" : t.memoizedProps), (Xe = !0));
					} catch (I) {
						ot(t, t.return, I);
					}
					break;
				case 18:
					try {
						var C = t.stateNode;
						r ? kp(C, !0) : kp(t.stateNode, !1);
					} catch (I) {
						ot(t, t.return, I);
					}
					break;
				case 22:
				case 23:
					t.memoizedState === null && lh(t, r);
					break;
				default:
					lh(t, r);
			}
		}
		function ch(t, r) {
			if (t.subtreeFlags & 67108864)
				for (t = t.child; t !== null;) {
					e: {
						var a = t,
							s = r;
						switch (a.tag) {
							case 4:
								$0(a, s);
								break e;
							case 22:
								a.memoizedState === null && ch(a, s);
								break e;
							default:
								ch(a, s);
						}
					}
					t = t.sibling;
				}
		}
		function H0(t) {
			var r = t.alternate;
			(r !== null && ((t.alternate = null), H0(r)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((r = t.stateNode), r !== null && Fu(r)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var wt = null,
			On = !1;
		function cr(t, r, a) {
			for (a = a.child; a !== null;) (Z0(t, r, a), (a = a.sibling));
		}
		function Z0(t, r, a) {
			if (Ie && typeof Ie.onCommitFiberUnmount == "function")
				try {
					Ie.onCommitFiberUnmount(Oe, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(rt || sn(a, r),
						cr(t, r, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && !rt && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					(rt || sn(a, r), js(a));
					var s = wt,
						c = On;
					(ji(a.type) && ((wt = a.stateNode), (On = !1)),
						cr(t, r, a),
						Xp(a.stateNode, a.type, a.memoizedProps),
						(wt = s),
						(On = c));
					break;
				case 5:
					(rt || sn(a, r), js(a));
				case 6:
					if ((a.tag === 6 && js(a), (s = wt), (c = On), (wt = null), cr(t, r, a), (wt = s), (On = c), wt !== null))
						if (On)
							try {
								((wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(
									a.stateNode,
								),
									(Xe = !0));
							} catch (d) {
								ot(a, r, d);
							}
						else
							try {
								(wt.removeChild(a.stateNode), (Xe = !0));
							} catch (d) {
								ot(a, r, d);
							}
					break;
				case 18:
					wt !== null &&
						(On
							? ((t = wt),
								jp(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								jo(t))
							: jp(wt, a.stateNode));
					break;
				case 4:
					((s = wt), (c = On), (wt = a.stateNode.containerInfo), (On = !0), cr(t, r, a), (wt = s), (On = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Ai(2, a, r), rt || Ai(4, a, r), cr(t, r, a));
					break;
				case 1:
					(rt || (sn(a, r), (s = a.stateNode), typeof s.componentWillUnmount == "function" && M0(a, r, s)),
						cr(t, r, a));
					break;
				case 21:
					cr(t, r, a);
					break;
				case 22:
					((rt = (s = rt) || a.memoizedState !== null), cr(t, r, a), (rt = s));
					break;
				case 30:
					(sn(a, r), cr(t, r, a));
					break;
				case 7:
					(rt || sn(a, r), cr(t, r, a));
					break;
				default:
					cr(t, r, a);
			}
		}
		function F0(t, r) {
			if (r.memoizedState === null && ((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					jo(t);
				} catch (a) {
					ot(r, r.return, a);
				}
			}
		}
		function Q0(t, r) {
			if (
				r.memoizedState === null &&
				((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					jo(t);
				} catch (a) {
					ot(r, r.return, a);
				}
		}
		function AT(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var r = t.stateNode;
					return (r === null && (r = t.stateNode = new B0()), r);
				case 22:
					return ((t = t.stateNode), (r = t._retryCache), r === null && (r = t._retryCache = new B0()), r);
				default:
					throw Error(u(435, t.tag));
			}
		}
		function Pl(t, r) {
			var a = AT(t);
			r.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = VT.bind(null, t, s);
					s.then(c, c);
				}
			});
		}
		function wn(t, r, a) {
			var s = r.deletions;
			if (s !== null)
				for (var c = 0; c < s.length; c++) {
					var d = s[c],
						v = t,
						C = r,
						I = C;
					e: for (; I !== null;) {
						switch (I.tag) {
							case 27:
								if (ji(I.type)) {
									((wt = I.stateNode), (On = !1));
									break e;
								}
								break;
							case 5:
								((wt = I.stateNode), (On = !1));
								break e;
							case 3:
							case 4:
								((wt = I.stateNode.containerInfo), (On = !0));
								break e;
						}
						I = I.return;
					}
					if (wt === null) throw Error(u(160));
					(Z0(v, C, d), (wt = null), (On = !1), (v = d.alternate), v !== null && (v.return = null), (d.return = null));
				}
			if (r.subtreeFlags & 13886) for (r = r.child; r !== null;) (Y0(r, t, a), (r = r.sibling));
		}
		var fr = null;
		function Y0(t, r, a) {
			var s = t.alternate,
				c = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					if (c & 4 && ((s = t.updateQueue), (s = s !== null ? s.events : null), s !== null))
						for (var d = 0; d < s.length; d++) {
							var v = s[d];
							v.ref.impl = v.nextImpl;
						}
					(wn(r, t, a), En(t), c & 4 && (Ai(3, t, t.return), Is(3, t), Ai(5, t, t.return)));
					break;
				case 1:
					(wn(r, t, a),
						En(t),
						c & 512 && (rt || s === null || sn(s, s.return)),
						c & 64 &&
							Xt &&
							((t = t.updateQueue),
							t !== null &&
								((r = t.callbacks),
								r !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? r : a.concat(r))))));
					break;
				case 26:
					if (((d = fr), wn(r, t, a), En(t), c & 512 && (rt || s === null || sn(s, s.return)), c & 4))
						if (((c = s !== null ? s.memoizedState : null), (a = t.memoizedState), s === null))
							if (a === null)
								if (t.stateNode === null)
									if (Xt) t.stateNode = Dp(t.type, t.memoizedProps, r.containerInfo, t);
									else {
										e: {
											((r = t.type), (a = t.memoizedProps), (c = d.ownerDocument || d));
											t: switch (r) {
												case "title":
													((s = c.getElementsByTagName("title")[0]),
														(!s ||
															s[us] ||
															s[nn] ||
															s.namespaceURI === "http://www.w3.org/2000/svg" ||
															s.hasAttribute("itemprop")) &&
															((s = c.createElement(r)), c.head.insertBefore(s, c.querySelector("head > title"))),
														un(s, r, a),
														(s[nn] = t),
														Kt(s),
														(r = s));
													break e;
												case "link":
													if ((d = rb("link", "href", c).get(r + (a.href || "")))) {
														for (v = 0; v < d.length; v++)
															if (
																((s = d[v]),
																s.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) &&
																	s.getAttribute("rel") === (a.rel == null ? null : a.rel) &&
																	s.getAttribute("title") === (a.title == null ? null : a.title) &&
																	s.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin))
															) {
																d.splice(v, 1);
																break t;
															}
													}
													((s = c.createElement(r)), un(s, r, a), c.head.appendChild(s));
													break;
												case "meta":
													if ((d = rb("meta", "content", c).get(r + (a.content || "")))) {
														for (v = 0; v < d.length; v++)
															if (
																((s = d[v]),
																s.getAttribute("content") === (a.content == null ? null : "" + a.content) &&
																	s.getAttribute("name") === (a.name == null ? null : a.name) &&
																	s.getAttribute("property") === (a.property == null ? null : a.property) &&
																	s.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) &&
																	s.getAttribute("charset") === (a.charSet == null ? null : a.charSet))
															) {
																d.splice(v, 1);
																break t;
															}
													}
													((s = c.createElement(r)), un(s, r, a), c.head.appendChild(s));
													break;
												default:
													throw Error(u(468, r));
											}
											((s[nn] = t), Kt(s), (r = s));
										}
										t.stateNode = r;
									}
								else Xt || Qh(d, t.type, t.stateNode);
							else t.stateNode = nb(d, a, t.memoizedProps);
						else
							c !== a
								? (c === null ? ((r = s.stateNode), r === null || rt || r.parentNode.removeChild(r)) : c.count--,
									a === null ? Xt || Qh(d, t.type, t.stateNode) : nb(d, a, t.memoizedProps))
								: a === null && t.stateNode !== null && Wd(t, t.memoizedProps, s.memoizedProps);
					break;
				case 27:
					(wn(r, t, a),
						En(t),
						c & 512 && (rt || s === null || sn(s, s.return)),
						s !== null && c & 4 && Wd(t, t.memoizedProps, s.memoizedProps));
					break;
				case 5:
					if (
						((d = Or),
						(Or = !1),
						wn(r, t, a),
						(Or = d),
						En(t),
						c & 512 && (rt || s === null || sn(s, s.return)),
						t.flags & 32)
					) {
						r = t.stateNode;
						try {
							(Xa(r, ""), (Xe = !0));
						} catch (J) {
							ot(t, t.return, J);
						}
					}
					(c & 4 && t.stateNode != null && ((r = t.memoizedProps), Wd(t, r, s !== null ? s.memoizedProps : r)),
						c & 1024 && (sh = !0));
					break;
				case 6:
					if ((wn(r, t, a), En(t), c & 4)) {
						if (t.stateNode === null) throw Error(u(162));
						((r = t.memoizedProps), (a = t.stateNode));
						try {
							((a.nodeValue = r), (Xe = !0));
						} catch (J) {
							ot(t, t.return, J);
						}
					}
					break;
				case 3:
					if (
						((Xe = !1),
						(rc = null),
						(d = fr),
						(fr = Zs(r.containerInfo)),
						wn(r, t, a),
						(fr = d),
						En(t),
						c & 4 && s !== null && s.memoizedState.isDehydrated)
					)
						try {
							jo(r.containerInfo);
						} catch (J) {
							ot(t, t.return, J);
						}
					(sh && ((sh = !1), K0(t)), (Xe = !1));
					break;
				case 4:
					((c = Or),
						(Or = Xt),
						(s = pv()),
						(d = fr),
						(fr = Zs(t.stateNode.containerInfo)),
						wn(r, t, a),
						En(t),
						(fr = d),
						Xe && ks && (Vl = !0),
						(Xe = s),
						(Or = c));
					break;
				case 12:
					(wn(r, t, a), En(t));
					break;
				case 31:
					(wn(r, t, a), En(t), c & 4 && ((r = t.updateQueue), r !== null && ((t.updateQueue = null), Pl(t, r))));
					break;
				case 13:
					(wn(r, t, a),
						En(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (s !== null && s.memoizedState !== null) &&
							(Zl = tn()),
						c & 4 && ((r = t.updateQueue), r !== null && ((t.updateQueue = null), Pl(t, r))));
					break;
				case 22:
					((d = t.memoizedState !== null), (v = s !== null && s.memoizedState !== null));
					var C = Xt,
						I = rt,
						Q = Or;
					((Xt = C || d),
						(Or = Q || d),
						(rt = I || v),
						wn(r, t, a),
						(rt = I),
						(Or = Q),
						(Xt = C),
						En(t),
						c & 8192 &&
							((r = t.stateNode),
							(r._visibility = d ? r._visibility & -2 : r._visibility | 1),
							!d ||
								s === null ||
								v ||
								Xt ||
								rt ||
								((r = v || rt), (a = Xt), (s = rt), (Xt = d || Xt), (rt = r), Ri(t, 2), (Xt = a), (rt = s)),
							(!d && Or) || lh(t, d)),
						c & 4 &&
							((r = t.updateQueue),
							r !== null && ((a = r.retryQueue), a !== null && ((r.retryQueue = null), Pl(t, a)))));
					break;
				case 19:
					(wn(r, t, a), En(t), c & 4 && ((r = t.updateQueue), r !== null && ((t.updateQueue = null), Pl(t, r))));
					break;
				case 30:
					(c & 512 && (rt || s === null || sn(s, s.return)),
						(c = pv()),
						(d = ks),
						(v = (a & 335544064) === a),
						(C = t.memoizedProps),
						(ks = v && Zr(C.default, C.update) !== "none"),
						wn(r, t, a),
						En(t),
						v && s !== null && Xe && (t.flags |= 4),
						(ks = d),
						(Xe = c));
					break;
				case 21:
					break;
				case 7:
					(c & 512 && (rt || s === null || sn(s, s.return)),
						s && s.stateNode !== null && (s.stateNode._fragmentFiber = t));
				default:
					(wn(r, t, a), En(t));
			}
		}
		function En(t) {
			var r = t.flags;
			if (r & 2) {
				try {
					for (var a, s = t.return; s !== null;) {
						if (z0(s)) {
							a = s;
							break;
						}
						s = s.return;
					}
					s = null;
					for (var c = t.return; c !== null;) {
						if (Xd(c)) {
							var d = c.stateNode;
							s === null ? (s = [d]) : s.push(d);
						}
						if (Gd(c)) break;
						c = c.return;
					}
					var v = s;
					if (a == null) throw Error(u(160));
					switch (a.tag) {
						case 27:
							var C = a.stateNode;
							kl(t, eh(t), C, v);
							break;
						case 5:
							var I = a.stateNode;
							(a.flags & 32 && (Xa(I, ""), (a.flags &= -33)), kl(t, eh(t), I, v));
							break;
						case 3:
						case 4:
							var Q = a.stateNode.containerInfo;
							th(t, eh(t), Q, v);
							break;
						default:
							throw Error(u(161));
					}
				} catch (J) {
					ot(t, t.return, J);
				}
				t.flags &= -3;
			}
			r & 4096 && (t.flags &= -4097);
		}
		function K0(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null;) {
					var r = t;
					(K0(r),
						r.tag === 5 && r.flags & 1024 && ((r = r.stateNode), (Io = !0), r.reset(), (Io = !1)),
						(t = t.sibling));
				}
		}
		function yo(t, r) {
			if (r.subtreeFlags & 9270) for (r = r.child; r !== null;) (G0(r, t), (r = r.sibling));
			else V0(r, !1);
		}
		function G0(t, r) {
			var a = t.alternate;
			if (a === null) nh(t, !1);
			else
				switch (t.tag) {
					case 3:
						if (((uh = Ar = !1), k0(), yo(r, t), !Ar && !Vl)) {
							if (((t = Tr), t !== null))
								for (var s = 0; s < t.length; s += 3) {
									a = t[s];
									var c = t[s + 1];
									(Lp(a, t[s + 2]),
										(a = a.ownerDocument.documentElement),
										a !== null &&
											a.animate(
												{ opacity: [0, 0], pointerEvents: ["none", "none"] },
												{ duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(" + c + ")" },
											));
								}
							((t = r.containerInfo),
								(t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement),
								t !== null &&
									t.style.viewTransitionName === "" &&
									((t.style.viewTransitionName = "none"),
									t.animate(
										{ opacity: [0, 0], pointerEvents: ["none", "none"] },
										{ duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(root)" },
									),
									t.animate(
										{ width: [0, 0], height: [0, 0] },
										{ duration: 0, fill: "forwards", pseudoElement: "::view-transition" },
									)),
								(uh = !0));
						}
						Tr = null;
						break;
					case 5:
						yo(r, t);
						break;
					case 4:
						((s = Ar), (Ar = !1), yo(r, t), Ar && (Vl = !0), (Ar = s));
						break;
					case 22:
						t.memoizedState === null && (a.memoizedState !== null ? nh(t, !1) : yo(r, t));
						break;
					case 30:
						((s = Ar), (c = k0()), (Ar = !1), yo(r, t), Ar && (t.flags |= 4));
						var d = t.memoizedProps,
							v = t.stateNode;
						((r = Hr(d, v)), (v = Hr(a.memoizedProps, v)));
						var C = Zr(d.default, d.update);
						(C === "none"
							? (r = !1)
							: ((d = a.memoizedState),
								(a.memoizedState = null),
								(a = t.child),
								(xn = 0),
								(r = oh(t, a, r, v, C, d, !0)),
								xn !== (d === null ? 0 : d.length) && (t.flags |= 32)),
							(t.flags & 4) !== 0 && r
								? (Co(t, t.memoizedProps.onUpdate), (Tr = c))
								: c !== null && (c.push.apply(c, Tr), (Tr = c)),
							(Ar = (t.flags & 32) !== 0 ? !0 : s));
						break;
					default:
						yo(r, t);
				}
		}
		function Rr(t, r) {
			if (r.subtreeFlags & 8772) for (r = r.child; r !== null;) (P0(t, r.alternate, r), (r = r.sibling));
		}
		function Ri(t, r) {
			for (t = t.child; t !== null;) {
				var a = t,
					s = r;
				switch (a.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Ai(4, a, a.return), Ri(a, s));
						break;
					case 1:
						sn(a, a.return);
						var c = a.stateNode;
						(typeof c.componentWillUnmount == "function" && M0(a, a.return, c), Ri(a, s));
						break;
					case 27:
						(s & 2) !== 0 && Xp(a.stateNode, a.type, a.memoizedProps);
					case 5:
						(sn(a, a.return), (a.tag !== 5 && a.tag !== 27) || js(a), Ri(a, s));
						break;
					case 6:
						js(a);
						break;
					case 26:
						(sn(a, a.return),
							(c = a.stateNode),
							a.memoizedState !== null || c === null || rt || c.parentNode.removeChild(c),
							Ri(a, s));
						break;
					case 22:
						a.memoizedState === null && Ri(a, s);
						break;
					case 30:
						(sn(a, a.return), Ri(a, s));
						break;
					case 7:
						sn(a, a.return);
					default:
						Ri(a, s);
				}
				t = t.sibling;
			}
		}
		function dr(t, r, a) {
			for (a = (r.subtreeFlags & 8772) !== 0 ? a : a & -2, r = r.child; r !== null;) {
				var s = r.alternate,
					c = t,
					d = r,
					v = d.flags,
					C = (a & 1) !== 0;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(dr(c, d, a), Is(4, d));
						break;
					case 1:
						if ((dr(c, d, a), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (J) {
								ot(s, s.return, J);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var I = s.stateNode;
							try {
								var Q = c.shared.hiddenCallbacks;
								if (Q !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < Q.length; c++) wy(Q[c], I);
							} catch (J) {
								ot(s, s.return, J);
							}
						}
						(C && v & 64 && N0(d), Cr(d, d.return));
						break;
					case 27:
						(a & 2) !== 0 && I0(d);
					case 5:
						((d.tag !== 5 && d.tag !== 27) || D0(d), dr(c, d, a), C && s === null && v & 4 && Jd(d), Cr(d, d.return));
						break;
					case 6:
						D0(d);
						break;
					case 26:
						((I = d.stateNode),
							d.memoizedState !== null || I === null || Xt || Qh(Zs(I.ownerDocument), d.type, I),
							dr(c, d, a),
							C && s === null && v & 4 && Jd(d),
							Cr(d, d.return));
						break;
					case 12:
						dr(c, d, a);
						break;
					case 31:
						(dr(c, d, a), C && v & 4 && F0(c, d));
						break;
					case 13:
						(dr(c, d, a), C && v & 4 && Q0(c, d));
						break;
					case 22:
						(d.memoizedState === null && dr(c, d, a), Cr(d, d.return));
						break;
					case 30:
						(dr(c, d, a), Cr(d, d.return));
						break;
					case 7:
						Cr(d, d.return);
					default:
						dr(c, d, a);
				}
				r = r.sibling;
			}
		}
		function fh(t, r) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				r.memoizedState !== null && r.memoizedState.cachePool !== null && (t = r.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && ws(a)));
		}
		function dh(t, r) {
			((t = null),
				r.alternate !== null && (t = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== t && (r.refCount++, t != null && ws(t)));
		}
		function er(t, r, a, s) {
			var c = (a & 335544064) === a;
			if (r.subtreeFlags & (c ? 10262 : 10256)) for (r = r.child; r !== null;) (X0(t, r, a, s), (r = r.sibling));
			else c && U0(r);
		}
		function X0(t, r, a, s) {
			var c = (a & 335544064) === a;
			c && r.alternate === null && r.return !== null && r.return.alternate !== null && Ul(r);
			var d = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(er(t, r, a, s), d & 2048 && Is(9, r));
					break;
				case 1:
					er(t, r, a, s);
					break;
				case 3:
					(er(t, r, a, s),
						c &&
							uh &&
							((t = t.containerInfo),
							(t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t),
							t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""),
							(t = t.ownerDocument.documentElement),
							t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")),
						d & 2048 &&
							((d = null),
							r.alternate !== null && (d = r.alternate.memoizedState.cache),
							(r = r.memoizedState.cache),
							r !== d && (r.refCount++, d != null && ws(d))));
					break;
				case 12:
					if (d & 2048) {
						(er(t, r, a, s), (d = r.stateNode));
						try {
							var v = r.memoizedProps,
								C = v.id,
								I = v.onPostCommit;
							typeof I == "function" && I(C, r.alternate === null ? "mount" : "update", d.passiveEffectDuration, -0);
						} catch (Q) {
							ot(r, r.return, Q);
						}
					} else er(t, r, a, s);
					break;
				case 31:
					er(t, r, a, s);
					break;
				case 13:
					er(t, r, a, s);
					break;
				case 23:
					break;
				case 22:
					((v = r.stateNode),
						(C = r.alternate),
						r.memoizedState !== null
							? (c && C !== null && C.memoizedState === null && Ul(C), v._visibility & 2 ? er(t, r, a, s) : qs(t, r))
							: (c && C !== null && C.memoizedState !== null && Ul(r),
								v._visibility & 2
									? er(t, r, a, s)
									: ((v._visibility |= 2), po(t, r, a, s, (r.subtreeFlags & 10256) !== 0 || !1))),
						d & 2048 && fh(C, r));
					break;
				case 24:
					(er(t, r, a, s), d & 2048 && dh(r.alternate, r));
					break;
				case 30:
					(c && ((d = r.alternate), d !== null && (xr(d.child, !0), xr(r.child, !0))), er(t, r, a, s));
					break;
				default:
					er(t, r, a, s);
			}
		}
		function po(t, r, a, s, c) {
			for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null;) {
				var d = t,
					v = r,
					C = a,
					I = s,
					Q = v.flags;
				switch (v.tag) {
					case 0:
					case 11:
					case 15:
						(po(d, v, C, I, c), Is(8, v));
						break;
					case 23:
						break;
					case 22:
						var J = v.stateNode;
						(v.memoizedState !== null
							? J._visibility & 2
								? po(d, v, C, I, c)
								: qs(d, v)
							: ((J._visibility |= 2), po(d, v, C, I, c)),
							c && Q & 2048 && fh(v.alternate, v));
						break;
					case 24:
						(po(d, v, C, I, c), c && Q & 2048 && dh(v.alternate, v));
						break;
					default:
						po(d, v, C, I, c);
				}
				r = r.sibling;
			}
		}
		function qs(t, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null;) {
					var a = t,
						s = r,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(qs(a, s), c & 2048 && fh(s.alternate, s));
							break;
						case 24:
							(qs(a, s), c & 2048 && dh(s.alternate, s));
							break;
						default:
							qs(a, s);
					}
					r = r.sibling;
				}
		}
		var Ea = 8192;
		function _a(t, r, a) {
			if (t.subtreeFlags & Ea) for (t = t.child; t !== null;) (J0(t, r, a), (t = t.sibling));
		}
		function J0(t, r, a) {
			switch (t.tag) {
				case 26:
					(_a(t, r, a),
						t.flags & Ea &&
							(t.memoizedState !== null
								? Dx(a, fr, t.memoizedState, t.memoizedProps)
								: ((t = t.stateNode), (r & 335544128) === r && sb(a, t))));
					break;
				case 5:
					(_a(t, r, a), t.flags & Ea && ((t = t.stateNode), (r & 335544128) === r && sb(a, t)));
					break;
				case 3:
				case 4:
					var s = fr;
					((fr = Zs(t.stateNode.containerInfo)), _a(t, r, a), (fr = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = Ea), (Ea = 16777216), _a(t, r, a), (Ea = s)) : _a(t, r, a));
					break;
				case 30:
					if ((t.flags & Ea) !== 0 && ((s = t.memoizedProps.name), s != null && s !== "auto")) {
						var c = t.stateNode;
						((c.paired = null), Vn === null && (Vn = new Map()), Vn.set(s, c));
					}
					_a(t, r, a);
					break;
				default:
					_a(t, r, a);
			}
		}
		function W0(t) {
			var r = t.alternate;
			if (r !== null && ((t = r.child), t !== null)) {
				r.child = null;
				do ((r = t.sibling), (t.sibling = null), (t = r));
				while (t !== null);
			}
		}
		function Ls(t) {
			var r = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((Jt = s), tp(s, t));
					}
				W0(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) (ep(t), (t = t.sibling));
		}
		function ep(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Ls(t), t.flags & 2048 && Ai(9, t, t.return));
					break;
				case 3:
					Ls(t);
					break;
				case 12:
					Ls(t);
					break;
				case 22:
					var r = t.stateNode;
					t.memoizedState !== null && r._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((r._visibility &= -3), $l(t))
						: Ls(t);
					break;
				default:
					Ls(t);
			}
		}
		function $l(t) {
			var r = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((Jt = s), tp(s, t));
					}
				W0(t);
			}
			for (t = t.child; t !== null;) {
				switch (((r = t), r.tag)) {
					case 0:
					case 11:
					case 15:
						(Ai(8, r, r.return), $l(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), $l(r)));
						break;
					default:
						$l(r);
				}
				t = t.sibling;
			}
		}
		function tp(t, r) {
			for (; Jt !== null;) {
				var a = Jt;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						Ai(8, a, r);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var s = a.memoizedState.cachePool.pool;
							s != null && s.refCount++;
						}
						break;
					case 24:
						ws(a.memoizedState.cache);
				}
				if (((s = a.child), s !== null)) ((s.return = a), (Jt = s));
				else
					e: for (a = t; Jt !== null;) {
						s = Jt;
						var c = s.sibling,
							d = s.return;
						if ((H0(s), s === a)) {
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
		var RT = {
				getCacheForType: function (t) {
					var r = rn(Lt),
						a = r.data.get(t);
					return (a === void 0 && ((a = t()), r.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return rn(Lt).controller.signal;
				},
			},
			NT = typeof WeakMap == "function" ? WeakMap : Map,
			tt = 0,
			dt = null,
			Pe = null,
			He = 0,
			at = 0,
			Bn = null,
			Ni = !1,
			bo = !1,
			hh = !1,
			ei = 0,
			Mt = 0,
			Mi = 0,
			Ca = 0,
			Hl = 0,
			Pn = 0,
			So = 0,
			Us = null,
			An = null,
			mh = !1,
			Zl = 0,
			np = 0,
			Fl = 1 / 0,
			Ql = null,
			Di = null,
			xt = 0,
			hr = null,
			Ta = null,
			Nr = 0,
			gh = 0,
			vh = null,
			rp = null,
			wo = null,
			Eo = null,
			_o = null,
			Vs = 0,
			Yl = null;
		function tr() {
			return (tt & 2) !== 0 && He !== 0 ? He & -He : ce.T !== null ? xh() : lv();
		}
		function ip() {
			if (Pn === 0)
				if ((He & 536870912) === 0 || Ve) {
					var t = Bu;
					((Bu <<= 1), (Bu & 3932160) === 0 && (Bu = 262144), (Pn = t));
				} else Pn = 536870912;
			return ((t = an.current), t !== null && (t.flags |= 32), Pn);
		}
		function Co(t, r) {
			if (r != null) {
				var a = t.stateNode,
					s = a.ref;
				(s === null && (s = a.ref = Vp(Hr(t.memoizedProps, a))), Eo === null && (Eo = []), Eo.push(r.bind(null, s)));
			}
		}
		function Rn(t, r, a) {
			(((t === dt && (at === 2 || at === 9)) || t.cancelPendingCommit !== null) && (To(t, 0), zi(t, He, Pn, !1)),
				Hu(t, a),
				((tt & 2) === 0 || t !== dt) &&
					(t === dt && ((tt & 2) === 0 && (Ca |= a), Mt === 4 && zi(t, He, Pn, !1)), ti(t)));
		}
		function ap(t, r, a) {
			if ((tt & 6) !== 0) throw Error(u(327));
			var s = (!a && (r & 127) === 0 && (r & t.expiredLanes) === 0) || os(t, r),
				c = s ? zT(t, r) : ph(t, r, !0),
				d = s;
			do {
				if (c === 0) {
					bo && !s && zi(t, r, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !MT(a))) {
						((c = ph(t, r, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = r), t.errorRecoveryDisabledLanes & d)) var v = 0;
						else ((v = t.pendingLanes & -536870913), (v = v !== 0 ? v : v & 536870912 ? 536870912 : 0));
						if (v !== 0) {
							r = v;
							e: {
								var C = t;
								c = Us;
								var I = C.current.memoizedState.isDehydrated;
								if ((I && (To(C, v).flags |= 256), (v = ph(C, v, !1)), v !== 2 && v !== 6)) {
									if (hh && !I) {
										((C.errorRecoveryDisabledLanes |= d), (Ca |= d), (c = 4));
										break e;
									}
									((d = An), (An = c), d !== null && (An === null ? (An = d) : An.push.apply(An, d)));
								}
								c = v;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(To(t, 0), zi(t, r, 0, !0));
						break;
					}
					e: {
						switch (((s = t), (d = c), d)) {
							case 0:
							case 1:
								throw Error(u(345));
							case 4:
								if ((r & 4194048) !== r && (r & 62914560) !== r) break;
							case 6:
								zi(s, r, Pn, !Ni);
								break e;
							case 2:
								An = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(u(329));
						}
						if ((r & 62914560) === r && ((c = Zl + 300 - tn()), 10 < c)) {
							if ((zi(s, r, Pn, !Ni), $u(s, 0, !0) !== 0)) break e;
							((Nr = r),
								(s.timeoutHandle = kh(op.bind(null, s, a, An, Ql, mh, r, Pn, Ca, So, Ni, d, "Throttled", -0, 0), c)));
							break e;
						}
						op(s, a, An, Ql, mh, r, Pn, Ca, So, Ni, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			ti(t);
		}
		function op(t, r, a, s, c, d, v, C, I, Q, J, oe, $, X) {
			t.timeoutHandle = -1;
			var me = r.subtreeFlags,
				we = (d & 335544064) === d;
			if (
				((oe = null),
				(we || me & 8192 || (me & 16785408) === 16785408) &&
					((oe = {
						stylesheets: null,
						count: 0,
						imgCount: 0,
						imgBytes: 0,
						suspenseyImages: [],
						waitingForImages: !0,
						waitingForViewTransition: !1,
						unsuspend: wr,
					}),
					(Vn = null),
					J0(r, d, oe),
					we &&
						((me = oe),
						(we = t.containerInfo),
						(we = (we.nodeType === 9 ? we : we.ownerDocument).__reactViewTransition),
						we != null &&
							(me.count++, (me.waitingForViewTransition = !0), (me = Ys.bind(me)), we.finished.then(me, me))),
					(me = (d & 62914560) === d ? Zl - tn() : (d & 4194048) === d ? np - tn() : 0),
					(me = zx(oe, me)),
					me !== null))
			) {
				((Nr = d),
					(t.cancelPendingCommit = me(mp.bind(null, t, r, d, a, s, c, v, C, I, Q, J, oe, null, $, X))),
					zi(t, d, v, !Q));
				return;
			}
			mp(t, r, d, a, s, c, v, C, I, Q, J, oe);
		}
		function MT(t) {
			for (var r = t; ;) {
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
							if (!Ln(d(), c)) return !1;
						} catch {
							return !1;
						}
					}
				if (((a = r.child), r.subtreeFlags & 16384 && a !== null)) ((a.return = r), (r = a));
				else {
					if (r === t) break;
					for (; r.sibling === null;) {
						if (r.return === null || r.return === t) return !0;
						r = r.return;
					}
					((r.sibling.return = r.return), (r = r.sibling));
				}
			}
			return !0;
		}
		function zi(t, r, a, s) {
			((r = rv(t, r)),
				(r &= ~Hl),
				(r &= ~Ca),
				(t.suspendedLanes |= r),
				(t.pingedLanes &= ~r),
				s && (t.warmLanes |= r),
				(s = t.expirationTimes));
			for (var c = r; 0 < c;) {
				var d = 31 - Me(c),
					v = 1 << d;
				((s[d] = -1), (c &= ~v));
			}
			a !== 0 && av(t, a, r);
		}
		function Kl() {
			return (tt & 6) === 0 ? (Bs(0, !1), !1) : !0;
		}
		function yh() {
			if (Pe !== null) {
				if (at === 0) var t = Pe.return;
				else ((t = Pe), (Yr = ca = null), Td(t), (co = null), (Cs = 0), (t = Pe));
				for (; t !== null;) (R0(t.alternate, t), (t = t.return));
				Pe = null;
			}
		}
		function To(t, r) {
			var a = t.timeoutHandle;
			return (
				a !== -1 && ((t.timeoutHandle = -1), WT(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(Nr = 0),
				yh(),
				(dt = t),
				(Pe = a = Fr(t.current, null)),
				(He = r),
				(at = 0),
				(Bn = null),
				(Ni = !1),
				(bo = os(t, r)),
				(hh = !1),
				(So = Pn = Hl = Ca = Mi = Mt = 0),
				(An = Us = null),
				(mh = !1),
				(ei = rv(t, r)),
				rl(),
				a
			);
		}
		function sp(t, r) {
			((qe = null),
				(ce.H = Al),
				r === lo || r === ml
					? ((r = yy()), (at = 3))
					: r === dd
						? ((r = yy()), (at = 4))
						: (at = r === Vd ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(Bn = r),
				Pe === null && ((Mt = 1), Rl(t, Gn(r, t.current))));
		}
		function up() {
			var t = an.current;
			return t === null
				? !0
				: (He & 4194048) === He
					? vn === null
					: (He & 62914560) === He || (He & 536870912) !== 0
						? t === vn
						: !1;
		}
		function lp() {
			var t = ce.H;
			return ((ce.H = Al), t === null ? Al : t);
		}
		function cp() {
			var t = ce.A;
			return ((ce.A = RT), t);
		}
		function Gl() {
			((Mt = 4),
				Ni || ((He & 4194048) !== He && an.current !== null) || (bo = !0),
				((Mi & 134217727) === 0 && (Ca & 134217727) === 0) || dt === null || zi(dt, He, Pn, !1));
		}
		function ph(t, r, a) {
			var s = tt;
			tt |= 2;
			var c = lp(),
				d = cp();
			((dt !== t || He !== r) && ((Ql = null), To(t, r)), (r = !1));
			var v = Mt;
			e: do
				try {
					if (at !== 0 && Pe !== null) {
						var C = Pe,
							I = Bn;
						switch (at) {
							case 8:
								(yh(), (v = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								an.current === null && (r = !0);
								var Q = at;
								if (((at = 0), (Bn = null), xo(t, C, I, Q), a && bo)) {
									v = 0;
									break e;
								}
								break;
							default:
								((Q = at), (at = 0), (Bn = null), xo(t, C, I, Q));
						}
					}
					(DT(), (v = Mt));
					break;
				} catch (J) {
					sp(t, J);
				}
			while (!0);
			return (
				r && t.shellSuspendCounter++,
				(Yr = ca = null),
				(tt = s),
				(ce.H = c),
				(ce.A = d),
				Pe === null && ((dt = null), (He = 0), rl()),
				v
			);
		}
		function DT() {
			for (; Pe !== null;) fp(Pe);
		}
		function zT(t, r) {
			var a = tt;
			tt |= 2;
			var s = lp(),
				c = cp();
			dt !== t || He !== r ? ((Ql = null), (Fl = tn() + 500), To(t, r)) : (bo = os(t, r));
			e: do
				try {
					if (at !== 0 && Pe !== null) {
						r = Pe;
						var d = Bn;
						t: switch (at) {
							case 1:
								((at = 0), (Bn = null), xo(t, r, d, 1));
								break;
							case 2:
							case 9:
								if (gy(d)) {
									((at = 0), (Bn = null), dp(r));
									break;
								}
								((r = function () {
									((at !== 2 && at !== 9) || dt !== t || (at = 7), ti(t));
								}),
									d.then(r, r));
								break e;
							case 3:
								at = 7;
								break e;
							case 4:
								at = 5;
								break e;
							case 7:
								gy(d) ? ((at = 0), (Bn = null), dp(r)) : ((at = 0), (Bn = null), xo(t, r, d, 7));
								break;
							case 5:
								var v = null;
								switch (Pe.tag) {
									case 26:
										v = Pe.memoizedState;
									case 5:
									case 27:
										var C = Pe;
										if (v ? ab(v) : C.stateNode.complete) {
											((at = 0), (Bn = null));
											var I = C.sibling;
											if (I !== null) Pe = I;
											else {
												var Q = C.return;
												Q !== null ? ((Pe = Q), Xl(Q)) : (Pe = null);
											}
											break t;
										}
								}
								((at = 0), (Bn = null), xo(t, r, d, 5));
								break;
							case 6:
								((at = 0), (Bn = null), xo(t, r, d, 6));
								break;
							case 8:
								(yh(), (Mt = 6));
								break e;
							default:
								throw Error(u(462));
						}
					}
					IT();
					break;
				} catch (J) {
					sp(t, J);
				}
			while (!0);
			return ((Yr = ca = null), (ce.H = s), (ce.A = c), (tt = a), Pe !== null ? 0 : ((dt = null), (He = 0), rl(), Mt));
		}
		function IT() {
			for (; Pe !== null && !gi();) fp(Pe);
		}
		function fp(t) {
			var r = O0(t.alternate, t, ei);
			((t.memoizedProps = t.pendingProps), r === null ? Xl(t) : (Pe = r));
		}
		function dp(t) {
			var r = t,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = S0(a, r, r.pendingProps, r.type, void 0, He);
					break;
				case 11:
					r = S0(a, r, r.pendingProps, r.type.render, r.ref, He);
					break;
				case 5:
					Td(r);
					var s = r;
					s === Gt && (Ve ? (ll(s), s.tag === 5 && s.stateNode != null && (gt = s.stateNode)) : (ll(s), (Ve = !0)));
				default:
					(R0(a, r), (r = Pe = iy(r, ei)), (r = O0(a, r, ei)));
			}
			((t.memoizedProps = t.pendingProps), r === null ? Xl(t) : (Pe = r));
		}
		function xo(t, r, a, s) {
			((Yr = ca = null), Td(r), (co = null), (Cs = 0));
			var c = r.return;
			try {
				if (wT(t, c, r, a, He)) {
					((Mt = 1), Rl(t, Gn(a, t.current)), (Pe = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Pe = c), d);
				((Mt = 1), Rl(t, Gn(a, t.current)), (Pe = null));
				return;
			}
			r.flags & 32768
				? (Ve || s === 1
						? (t = !0)
						: bo || (He & 536870912) !== 0
							? (t = !1)
							: ((Ni = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = an.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					hp(r, t))
				: Xl(r);
		}
		function Xl(t) {
			var r = t;
			do {
				if ((r.flags & 32768) !== 0) {
					hp(r, Ni);
					return;
				}
				t = r.return;
				var a = TT(r.alternate, r, ei);
				if (a !== null) {
					Pe = a;
					return;
				}
				if (((r = r.sibling), r !== null)) {
					Pe = r;
					return;
				}
				Pe = r = t;
			} while (r !== null);
			Mt === 0 && (Mt = 5);
		}
		function hp(t, r) {
			do {
				var a = xT(t.alternate, t);
				if (a !== null) {
					((a.flags &= 32767), (Pe = a));
					return;
				}
				if (
					((a = t.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!r && ((t = t.sibling), t !== null))
				) {
					Pe = t;
					return;
				}
				Pe = t = a;
			} while (t !== null);
			((Mt = 6), (Pe = null));
		}
		function mp(t, r, a, s, c, d, v, C, I, Q, J, oe) {
			t.cancelPendingCommit = null;
			do Jl();
			while (xt !== 0);
			if ((tt & 6) !== 0) throw Error(u(327));
			if (r !== null) {
				if (r === t.current) throw Error(u(177));
				(t === dt && ((Pe = dt = null), (He = 0)),
					(Ta = r),
					(hr = t),
					(Nr = a),
					(vh = c),
					(rp = s),
					jT(t, r, a, v, C, I, oe));
			}
		}
		function jT(t, r, a, s, c, d, v) {
			var C = r.lanes | r.childLanes;
			if (
				((gh = C),
				(C |= Wf),
				vC(t, a, C, s, c, d),
				(Eo = null),
				(a & 335544064) === a ? ((_o = oT(t)), (s = 10262)) : ((_o = null), (s = 10256)),
				(r.subtreeFlags & s) !== 0 || (r.flags & s) !== 0
					? ((t.callbackNode = null),
						(t.callbackPriority = 0),
						BT(ft, function () {
							return (Eh(), null);
						}))
					: ((t.callbackNode = null), (t.callbackPriority = 0)),
				(ql = !1),
				(s = (r.flags & 13878) !== 0),
				(r.subtreeFlags & 13878) !== 0 || s)
			) {
				((s = ce.T), (ce.T = null), (c = ye.p), (ye.p = 2), (d = tt), (tt |= 4));
				try {
					OT(t, r, a);
				} finally {
					((tt = d), (ye.p = c), (ce.T = s));
				}
			}
			((xt = 1), ql ? (wo = ax(v, t.containerInfo, _o, bh, Sh, qT, wh, Eh, kT, null, null)) : (bh(), Sh(), wh()));
		}
		function kT(t) {
			if (xt !== 0) {
				var r = hr.onRecoverableError;
				r(t, { componentStack: null });
			}
		}
		function qT() {
			xt === 3 && ((xt = 0), G0(Ta, hr), (xt = 4));
		}
		function bh() {
			if (xt === 1) {
				xt = 0;
				var t = hr,
					r = Ta,
					a = Nr,
					s = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || s) {
					((s = ce.T), (ce.T = null));
					var c = ye.p;
					ye.p = 2;
					var d = tt;
					tt |= 4;
					try {
						((ks = Vl = !1), Y0(r, t, a), (a = zh));
						var v = Yv(t.containerInfo),
							C = a.focusedElem,
							I = a.selectionRange;
						if (v !== C && C && C.ownerDocument && Qv(C.ownerDocument.documentElement, C)) {
							if (I !== null && Yf(C)) {
								var Q = I.start,
									J = I.end;
								if ((J === void 0 && (J = Q), "selectionStart" in C))
									((C.selectionStart = Q), (C.selectionEnd = Math.min(J, C.value.length)));
								else {
									var oe = C.ownerDocument || document,
										$ = (oe && oe.defaultView) || window;
									if ($.getSelection) {
										var X = $.getSelection(),
											me = C.textContent.length,
											we = Math.min(I.start, me),
											Le = I.end === void 0 ? we : Math.min(I.end, me);
										!X.extend && we > Le && ((v = Le), (Le = we), (we = v));
										var Z = Fv(C, we),
											V = Fv(C, Le);
										if (
											Z &&
											V &&
											(X.rangeCount !== 1 ||
												X.anchorNode !== Z.node ||
												X.anchorOffset !== Z.offset ||
												X.focusNode !== V.node ||
												X.focusOffset !== V.offset)
										) {
											var G = oe.createRange();
											(G.setStart(Z.node, Z.offset),
												X.removeAllRanges(),
												we > Le
													? (X.addRange(G), X.extend(V.node, V.offset))
													: (G.setEnd(V.node, V.offset), X.addRange(G)));
										}
									}
								}
							}
							for (oe = [], X = C; (X = X.parentNode);)
								X.nodeType === 1 && oe.push({ element: X, left: X.scrollLeft, top: X.scrollTop });
							for (typeof C.focus == "function" && C.focus(), C = 0; C < oe.length; C++) {
								var ie = oe[C];
								((ie.element.scrollLeft = ie.left), (ie.element.scrollTop = ie.top));
							}
						}
						((Io = !!Dh), (zh = Dh = null));
					} finally {
						((tt = d), (ye.p = c), (ce.T = s));
					}
				}
				((t.current = r), (xt = 2));
			}
		}
		function Sh() {
			if (xt === 2) {
				xt = 0;
				var t = hr,
					r = Ta,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = ce.T), (ce.T = null));
					var s = ye.p;
					ye.p = 2;
					var c = tt;
					tt |= 4;
					try {
						P0(t, r.alternate, r);
					} finally {
						((tt = c), (ye.p = s), (ce.T = a));
					}
				}
				xt = 3;
			}
		}
		function wh() {
			if (xt === 4 || xt === 3) {
				xt = 0;
				var t = wo;
				((wo = null), br());
				var r = hr,
					a = Ta,
					s = Nr,
					c = rp,
					d = (s & 335544064) === s ? 10262 : 10256;
				if (
					((a.subtreeFlags & d) !== 0 || (a.flags & d) !== 0
						? (xt = 5)
						: ((xt = 0), (Ta = hr = null), gp(r, r.pendingLanes)),
					(d = r.pendingLanes),
					d === 0 && (Di = null),
					Nf(s),
					(a = a.stateNode),
					Ie && typeof Ie.onCommitFiberRoot == "function")
				)
					try {
						Ie.onCommitFiberRoot(Oe, a, void 0, (a.current.flags & 128) === 128);
					} catch {}
				if (c !== null) {
					((a = ce.T), (d = ye.p), (ye.p = 2), (ce.T = null));
					try {
						for (var v = r.onRecoverableError, C = 0; C < c.length; C++) {
							var I = c[C];
							v(I.value, { componentStack: I.stack });
						}
					} finally {
						((ce.T = a), (ye.p = d));
					}
				}
				if (((c = Eo), (v = _o), (_o = null), c !== null && ((Eo = null), v === null && (v = []), t !== null)))
					for (I = 0; I < c.length; I++) ((a = (0, c[I])(v)), a !== void 0 && t.finished.finally(a));
				((Nr & 3) !== 0 && Jl(),
					ti(r),
					(d = r.pendingLanes),
					(s & 261930) !== 0 && (d & 42) !== 0 ? (r === Yl ? Vs++ : ((Vs = 0), (Yl = r))) : ((Vs = 0), (Yl = null)),
					Bs(0, !1));
			}
		}
		function gp(t, r) {
			(t.pooledCacheLanes &= r) === 0 && ((r = t.pooledCache), r != null && ((t.pooledCache = null), ws(r)));
		}
		function Jl() {
			return (wo !== null && (wo.skipTransition(), (wo = null)), bh(), Sh(), wh(), Eh());
		}
		function Eh() {
			if (xt !== 5) return !1;
			var t = hr,
				r = gh;
			gh = 0;
			var a = Nf(Nr),
				s = ce.T,
				c = ye.p;
			try {
				((ye.p = 32 > a ? 32 : a), (ce.T = null), (a = vh), (vh = null));
				var d = hr,
					v = Nr;
				if (((xt = 0), (Ta = hr = null), (Nr = 0), (tt & 6) !== 0)) throw Error(u(331));
				var C = tt;
				if (
					((tt |= 4),
					ep(d.current),
					X0(d, d.current, v, a),
					(tt = C),
					Bs(0, !1),
					Ie && typeof Ie.onPostCommitFiberRoot == "function")
				)
					try {
						Ie.onPostCommitFiberRoot(Oe, d);
					} catch {}
				return !0;
			} finally {
				((ye.p = c), (ce.T = s), gp(t, r));
			}
		}
		function vp(t, r, a) {
			((r = Gn(a, r)), (r = Ud(t.stateNode, r, 2)), (t = ba(t, r, 2)), t !== null && (Hu(t, 2), ti(t)));
		}
		function ot(t, r, a) {
			if (t.tag === 3) vp(t, t, a);
			else
				for (; r !== null;) {
					if (r.tag === 3) {
						vp(r, t, a);
						break;
					} else if (r.tag === 1) {
						var s = r.stateNode;
						if (
							typeof r.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Di === null || !Di.has(s)))
						) {
							((t = Gn(a, t)), (a = d0(2)), (s = ba(r, a, 2)), s !== null && (h0(a, s, r, t), Hu(s, 2), ti(s)));
							break;
						}
					}
					r = r.return;
				}
		}
		function _h(t, r, a) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new NT();
				var c = new Set();
				s.set(r, c);
			} else ((c = s.get(r)), c === void 0 && ((c = new Set()), s.set(r, c)));
			c.has(a) || ((hh = !0), c.add(a), (t = LT.bind(null, t, r, a)), r.then(t, t));
		}
		function LT(t, r, a) {
			var s = t.pingCache;
			(s !== null && s.delete(r),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				dt === t &&
					(He & a) === a &&
					((Mt === 4 || (Mt === 3 && (He & 62914560) === He && 300 > tn() - Zl)) && (tt & 2) === 0
						? To(t, 0)
						: (Hl |= a),
					So === He && (So = 0)),
				ti(t));
		}
		function yp(t, r) {
			(r === 0 && (r = iv()), (t = sa(t, r)), t !== null && (Hu(t, r), ti(t)));
		}
		function UT(t) {
			var r = t.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), yp(t, a));
		}
		function VT(t, r) {
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
					throw Error(u(314));
			}
			(s !== null && s.delete(r), yp(t, a));
		}
		function BT(t, r) {
			return mi(t, r);
		}
		var Oo = null,
			Ao = null,
			Ch = !1,
			Wl = !1,
			Th = !1,
			Ii = 0;
		function ti(t) {
			(t !== Ao && t.next === null && (Ao === null ? (Oo = Ao = t) : (Ao = Ao.next = t)),
				(Wl = !0),
				Ch || ((Ch = !0), $T()));
		}
		function Bs(t, r) {
			if (!Th && Wl) {
				Th = !0;
				do
					for (var a = !1, s = Oo; s !== null;) {
						if (!r)
							if (t !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var v = s.suspendedLanes,
										C = s.pingedLanes;
									((d = (1 << (31 - Me(42 | t) + 1)) - 1),
										(d &= c & ~(v & ~C)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), wp(s, d));
							} else
								((d = He),
									(d = $u(s, s === dt ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || os(s, d) || ((a = !0), wp(s, d)));
						s = s.next;
					}
				while (a);
				Th = !1;
			}
		}
		function PT() {
			pp();
		}
		function pp() {
			Wl = Ch = !1;
			var t = 0;
			Ii !== 0 && JT() && (t = Ii);
			for (var r = tn(), a = null, s = Oo; s !== null;) {
				var c = s.next,
					d = bp(s, r);
				(d === 0
					? ((s.next = null), a === null ? (Oo = c) : (a.next = c), c === null && (Ao = a))
					: ((a = s), (t !== 0 || (d & 3) !== 0) && (Wl = !0)),
					(s = c));
			}
			((xt !== 0 && xt !== 5) || Bs(t, !1), Ii !== 0 && (Ii = 0));
		}
		function bp(t, r) {
			for (var a = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d;) {
				var v = 31 - Me(d),
					C = 1 << v,
					I = c[v];
				(I === -1 ? ((C & a) === 0 || (C & s) !== 0) && (c[v] = gC(C, r)) : I <= r && (t.expiredLanes |= C), (d &= ~C));
			}
			if (
				((r = dt),
				(a = He),
				(a = $u(t, t === r ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				a === 0 || (t === r && (at === 2 || at === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && pr(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || os(t, a)) {
				if (((r = a & -a), r === t.callbackPriority)) return r;
				switch ((s !== null && pr(s), Nf(a))) {
					case 2:
					case 8:
						a = Rt;
						break;
					case 32:
						a = ft;
						break;
					case 268435456:
						a = mn;
						break;
					default:
						a = ft;
				}
				return ((s = Sp.bind(null, t)), (a = mi(a, s)), (t.callbackPriority = r), (t.callbackNode = a), r);
			}
			return (s !== null && s !== null && pr(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function Sp(t, r) {
			if (xt !== 0 && xt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (Jl() && t.callbackNode !== a) return null;
			var s = He;
			return (
				(s = $u(t, t === dt ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (ap(t, s, r), bp(t, tn()), t.callbackNode != null && t.callbackNode === a ? Sp.bind(null, t) : null)
			);
		}
		function wp(t, r) {
			if (Jl()) return null;
			ap(t, r, !0);
		}
		function $T() {
			ex(function () {
				(tt & 6) !== 0 ? mi(Be, PT) : pp();
			});
		}
		function xh() {
			if (Ii === 0) {
				var t = ha;
				(t === 0 && ((t = gn), (gn <<= 1), (gn & 261888) === 0 && (gn = 256)), (Ii = t));
			}
			return Ii;
		}
		function Ep(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ku(t);
		}
		function HT(t, r, a, s, c) {
			if (r === "submit" && a && a.stateNode === c) {
				var d = Ep((c[Cn] || null).action),
					v = s.submitter;
				v &&
					((r = (r = v[Cn] || null) ? Ep(r.formAction) : v.getAttribute("formAction")),
					r !== null && ((d = r), (v = null)));
				var C = new Wu("action", "action", null, s, c);
				t.push({
					event: C,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (Ii !== 0) {
										var I = new FormData(c, v);
										Id(a, { pending: !0, data: I, method: c.method, action: d }, null, I);
									}
								} else
									typeof d == "function" &&
										(C.preventDefault(),
										(I = new FormData(c, v)),
										Id(a, { pending: !0, data: I, method: c.method, action: d }, d, I));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Oh = 0; Oh < Jf.length; Oh++) {
			var Ah = Jf[Oh];
			lr(Ah.toLowerCase(), "on" + (Ah[0].toUpperCase() + Ah.slice(1)));
		}
		(lr(Xv, "onAnimationEnd"),
			lr(Jv, "onAnimationIteration"),
			lr(Wv, "onAnimationStart"),
			lr("dblclick", "onDoubleClick"),
			lr("focusin", "onFocus"),
			lr("focusout", "onBlur"),
			lr(JC, "onTransitionRun"),
			lr(WC, "onTransitionStart"),
			lr(eT, "onTransitionCancel"),
			lr(ey, "onTransitionEnd"),
			Ka("onMouseEnter", ["mouseout", "mouseover"]),
			Ka("onMouseLeave", ["mouseout", "mouseover"]),
			Ka("onPointerEnter", ["pointerout", "pointerover"]),
			Ka("onPointerLeave", ["pointerout", "pointerover"]),
			ia("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			ia("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			ia("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			ia("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			ia("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			ia("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Ps =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			ZT = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ps));
		function _p(t, r) {
			r = (r & 4) !== 0;
			for (var a = 0; a < t.length; a++) {
				var s = t[a],
					c = s.event;
				s = s.listeners;
				e: {
					var d = void 0;
					if (r)
						for (var v = s.length - 1; 0 <= v; v--) {
							var C = s[v],
								I = C.instance,
								Q = C.currentTarget;
							if (((C = C.listener), I !== d && c.isPropagationStopped())) break e;
							((d = C), (c.currentTarget = Q));
							try {
								d(c);
							} catch (J) {
								nl(J);
							}
							((c.currentTarget = null), (d = I));
						}
					else
						for (v = 0; v < s.length; v++) {
							if (
								((C = s[v]),
								(I = C.instance),
								(Q = C.currentTarget),
								(C = C.listener),
								I !== d && c.isPropagationStopped())
							)
								break e;
							((d = C), (c.currentTarget = Q));
							try {
								d(c);
							} catch (J) {
								nl(J);
							}
							((c.currentTarget = null), (d = I));
						}
				}
			}
		}
		function $e(t, r) {
			var a = r[fv];
			a === void 0 && (a = r[fv] = new Set());
			var s = t + "__bubble";
			a.has(s) || (Tp(r, t, 2, !1), a.add(s));
		}
		function Rh(t, r, a) {
			var s = 0;
			(r && (s |= 4), Tp(a, t, s, r));
		}
		var ec = "_reactListening" + Math.random().toString(36).slice(2);
		function Cp(t) {
			if (!t[ec]) {
				((t[ec] = !0),
					mv.forEach(function (a) {
						a !== "selectionchange" && (ZT.has(a) || Rh(a, !1, t), Rh(a, !0, t));
					}));
				var r = t.nodeType === 9 ? t : t.ownerDocument;
				r === null || r[ec] || ((r[ec] = !0), Rh("selectionchange", !1, r));
			}
		}
		function Tp(t, r, a, s) {
			switch (hb(r)) {
				case 2:
					var c = Ux;
					break;
				case 8:
					c = Vx;
					break;
				default:
					c = Kh;
			}
			((a = c.bind(null, r, a, t)),
				(c = void 0),
				!Lf || (r !== "touchstart" && r !== "touchmove" && r !== "wheel") || (c = !0),
				s
					? c !== void 0
						? t.addEventListener(r, a, { capture: !0, passive: c })
						: t.addEventListener(r, a, !0)
					: c !== void 0
						? t.addEventListener(r, a, { passive: c })
						: t.addEventListener(r, a, !1));
		}
		function Nh(t, r, a, s, c) {
			var d = s;
			if ((r & 1) === 0 && (r & 2) === 0 && s !== null)
				e: for (;;) {
					if (s === null) return;
					var v = s.tag;
					if (v === 3 || v === 4) {
						var C = s.stateNode.containerInfo;
						if (C === c) break;
						if (v === 4)
							for (v = s.return; v !== null;) {
								var I = v.tag;
								if ((I === 3 || I === 4) && v.stateNode.containerInfo === c) return;
								v = v.return;
							}
						for (; C !== null;) {
							if (((v = ra(C)), v === null)) return;
							if (((I = v.tag), I === 5 || I === 6 || I === 26 || I === 27)) {
								s = d = v;
								continue e;
							}
							C = C.parentNode;
						}
					}
					s = s.return;
				}
			Ov(function () {
				var Q = d,
					J = kf(a),
					oe = [];
				e: {
					var $ = ty.get(t);
					if ($ !== void 0) {
						var X = Wu,
							me = t;
						switch (t) {
							case "keypress":
								if (Xu(a) === 0) break e;
							case "keydown":
							case "keyup":
								X = IC;
								break;
							case "focusin":
								((me = "focus"), (X = Pf));
								break;
							case "focusout":
								((me = "blur"), (X = Pf));
								break;
							case "beforeblur":
							case "afterblur":
								X = Pf;
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
								X = Nv;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								X = OC;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								X = kC;
								break;
							case Xv:
							case Jv:
							case Wv:
								X = AC;
								break;
							case ey:
								X = qC;
								break;
							case "scroll":
							case "scrollend":
								X = xC;
								break;
							case "wheel":
								X = LC;
								break;
							case "copy":
							case "cut":
							case "paste":
								X = RC;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								X = Dv;
								break;
							case "submit":
								X = jC;
								break;
							case "toggle":
							case "beforetoggle":
								X = UC;
						}
						var we = (r & 4) !== 0,
							Le = !we && (t === "scroll" || t === "scrollend"),
							Z = we ? ($ !== null ? $ + "Capture" : null) : $;
						we = [];
						for (var V = Q, G; V !== null;) {
							var ie = V;
							if (
								((G = ie.stateNode),
								(ie = ie.tag),
								(ie !== 5 && ie !== 26 && ie !== 27) ||
									G === null ||
									Z === null ||
									((ie = cs(V, Z)), ie != null && we.push($s(V, ie, G))),
								Le)
							)
								break;
							V = V.return;
						}
						0 < we.length && (($ = new X($, me, null, a, J)), oe.push({ event: $, listeners: we }));
					}
				}
				if ((r & 7) === 0) {
					e: {
						if (
							((X = t === "mouseover" || t === "pointerover"),
							($ = t === "mouseout" || t === "pointerout"),
							X && a !== jf && (me = a.relatedTarget || a.fromElement) && (ra(me) || me[ss]))
						)
							break e;
						($ || X) &&
							((me = J.window === J ? J : (X = J.ownerDocument) ? X.defaultView || X.parentWindow : window),
							$
								? ((X = a.relatedTarget || a.toElement),
									($ = Q),
									(X = X ? ra(X) : null),
									X !== null &&
										((Le = f(X)), (we = X.tag), X !== Le || (we !== 5 && we !== 27 && we !== 6)) &&
										(X = null))
								: (($ = null), (X = Q)),
							$ !== X &&
								((we = Nv),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(V = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((we = Dv), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (V = "pointer")),
								(Le = $ == null ? me : ls($)),
								(G = X == null ? me : ls(X)),
								(me = new we(ie, V + "leave", $, a, J)),
								(me.target = Le),
								(me.relatedTarget = G),
								(ie = null),
								ra(J) === Q &&
									((we = new we(Z, V + "enter", X, a, J)), (we.target = G), (we.relatedTarget = Le), (ie = we)),
								(Le = ie),
								(we = $ && X ? O($, X, FT) : null),
								$ !== null && xp(oe, me, $, we, !1),
								X !== null && Le !== null && xp(oe, Le, X, we, !0)));
					}
					e: {
						if (
							(($ = Q ? ls(Q) : window),
							(X = $.nodeName && $.nodeName.toLowerCase()),
							X === "select" || (X === "input" && $.type === "file"))
						)
							var Se = Vv;
						else if (Lv($))
							if (Bv) Se = KC;
							else {
								Se = QC;
								var Ze = FC;
							}
						else
							((X = $.nodeName),
								!X || X.toLowerCase() !== "input" || ($.type !== "checkbox" && $.type !== "radio")
									? Q && If(Q.elementType) && (Se = Vv)
									: (Se = YC));
						if (Se && (Se = Se(t, Q))) {
							Uv(oe, Se, a, J);
							break e;
						}
						Ze && Ze(t, $, Q);
					}
					switch (((Ze = Q ? ls(Q) : window), t)) {
						case "focusin":
							(Lv(Ze) || Ze.contentEditable === "true") && ((to = Ze), (Kf = Q), (ps = null));
							break;
						case "focusout":
							ps = Kf = to = null;
							break;
						case "mousedown":
							Gf = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((Gf = !1), Kv(oe, a, J));
							break;
						case "selectionchange":
							if (XC) break;
						case "keydown":
						case "keyup":
							Kv(oe, a, J);
					}
					var Re;
					if (Hf)
						e: {
							switch (t) {
								case "compositionstart":
									var je = "onCompositionStart";
									break e;
								case "compositionend":
									je = "onCompositionEnd";
									break e;
								case "compositionupdate":
									je = "onCompositionUpdate";
									break e;
							}
							je = void 0;
						}
					else
						eo
							? kv(t, a) && (je = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (je = "onCompositionStart");
					(je &&
						(zv &&
							a.locale !== "ko" &&
							(eo || je !== "onCompositionStart"
								? je === "onCompositionEnd" && eo && (Re = Av())
								: ((yi = J), (Uf = "value" in yi ? yi.value : yi.textContent), (eo = !0))),
						(Ze = tc(Q, je)),
						0 < Ze.length &&
							((je = new Mv(je, t, null, a, J)),
							oe.push({ event: je, listeners: Ze }),
							Re ? (je.data = Re) : ((Re = qv(a)), Re !== null && (je.data = Re)))),
						(Re = BC ? PC(t, a) : $C(t, a)) &&
							((je = tc(Q, "onBeforeInput")),
							0 < je.length &&
								((Ze = new Mv("onBeforeInput", "beforeinput", null, a, J)),
								oe.push({ event: Ze, listeners: je }),
								(Ze.data = Re))),
						HT(oe, t, Q, a, J));
				}
				_p(oe, r);
			});
		}
		function $s(t, r, a) {
			return { instance: t, listener: r, currentTarget: a };
		}
		function tc(t, r) {
			for (var a = r + "Capture", s = []; t !== null;) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = cs(t, a)), c != null && s.unshift($s(t, c, d)), (c = cs(t, r)), c != null && s.push($s(t, c, d))),
					t.tag === 3)
				)
					return s;
				t = t.return;
			}
			return [];
		}
		function FT(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function xp(t, r, a, s, c) {
			for (var d = r._reactName, v = []; a !== null && a !== s;) {
				var C = a,
					I = C.alternate,
					Q = C.stateNode;
				if (((C = C.tag), I !== null && I === s)) break;
				((C !== 5 && C !== 26 && C !== 27) ||
					Q === null ||
					((I = Q),
					c
						? ((Q = cs(a, d)), Q != null && v.unshift($s(a, Q, I)))
						: c || ((Q = cs(a, d)), Q != null && v.push($s(a, Q, I)))),
					(a = a.return));
			}
			v.length !== 0 && t.push({ event: r, listeners: v });
		}
		var QT = /\r\n?/g,
			YT = /\u0000|\uFFFD/g;
		function Op(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					QT,
					`
`,
				)
				.replace(YT, "");
		}
		function Ap(t, r) {
			return ((r = Op(r)), Op(t) === r);
		}
		function st(t, r, a, s, c, d) {
			switch (a) {
				case "children":
					if (typeof s == "string") r === "body" || (r === "textarea" && s === "") || Xa(t, s);
					else if (typeof s == "number" || typeof s == "bigint") r !== "body" && Xa(t, "" + s);
					else return;
					break;
				case "className":
					Yu(t, "class", s);
					break;
				case "tabIndex":
					Yu(t, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Yu(t, a, s);
					break;
				case "style":
					Tv(t, s, d);
					return;
				case "data":
					if (r !== "object") {
						Yu(t, "data", s);
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
					((s = Ku(s)), t.setAttribute(a, s));
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
								? (r !== "input" && st(t, r, "name", c.name, c, null),
									st(t, r, "formEncType", c.formEncType, c, null),
									st(t, r, "formMethod", c.formMethod, c, null),
									st(t, r, "formTarget", c.formTarget, c, null))
								: (st(t, r, "encType", c.encType, c, null),
									st(t, r, "method", c.method, c, null),
									st(t, r, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Ku(s)), t.setAttribute(a, s));
					break;
				case "onClick":
					s != null && (t.onclick = wr);
					return;
				case "onScroll":
					s != null && $e("scroll", t);
					return;
				case "onScrollEnd":
					s != null && $e("scrollend", t);
					return;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(u(61));
						if (((a = s.__html), a != null)) {
							if (c.children != null) throw Error(u(60));
							d?.__html !== a && (t.innerHTML = a);
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
					((a = Ku(s)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					s != null && typeof s != "function" && typeof s != "symbol" ? t.setAttribute(a, s) : t.removeAttribute(a);
					break;
				case "inert":
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "credentialless":
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
					($e("beforetoggle", t), $e("toggle", t), Qu(t, "popover", s));
					break;
				case "xlinkActuate":
					Pr(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					Pr(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					Pr(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					Pr(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					Pr(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					Pr(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					Pr(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					Pr(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					Pr(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					Qu(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					return;
				default:
					if (!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N"))
						((a = CC.get(a) || a), Qu(t, a, s));
					else return;
			}
			Xe = !0;
		}
		function Mh(t, r, a, s, c, d) {
			switch (a) {
				case "style":
					Tv(t, s, d);
					return;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(u(61));
						if (((a = s.__html), a != null)) {
							if (c.children != null) throw Error(u(60));
							d?.__html !== a && (t.innerHTML = a);
						}
					}
					break;
				case "children":
					if (typeof s == "string") Xa(t, s);
					else if (typeof s == "number" || typeof s == "bigint") Xa(t, "" + s);
					else return;
					break;
				case "onScroll":
					s != null && $e("scroll", t);
					return;
				case "onScrollEnd":
					s != null && $e("scrollend", t);
					return;
				case "onClick":
					s != null && (t.onclick = wr);
					return;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref":
					return;
				case "innerText":
				case "textContent":
					return;
				default:
					if (!gv.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(d = a.slice(2, c ? a.length - 7 : void 0)),
								(r = t[Cn] || null),
								(r = r != null ? r[a] : null),
								typeof r == "function" && t.removeEventListener(d, r, c),
								typeof s == "function")
							) {
								(typeof r != "function" &&
									r !== null &&
									(a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
									t.addEventListener(d, s, c));
								break e;
							}
							((Xe = !0), a in t ? (t[a] = s) : s === !0 ? t.setAttribute(a, "") : Qu(t, a, s));
						}
					return;
			}
			Xe = !0;
		}
		function un(t, r, a) {
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
					($e("error", t), $e("load", t));
					var s = !1,
						c = !1,
						d;
					for (d in a)
						if (a.hasOwnProperty(d)) {
							var v = a[d];
							if (v != null)
								switch (d) {
									case "src":
										s = !0;
										break;
									case "srcSet":
										c = !0;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										throw Error(u(137, r));
									default:
										st(t, r, d, v, a, null);
								}
						}
					(c && st(t, r, "srcSet", a.srcSet, a, null), s && st(t, r, "src", a.src, a, null));
					return;
				case "input":
					$e("invalid", t);
					var C = (d = v = c = null),
						I = null,
						Q = null;
					for (s in a)
						if (a.hasOwnProperty(s)) {
							var J = a[s];
							if (J != null)
								switch (s) {
									case "name":
										c = J;
										break;
									case "type":
										v = J;
										break;
									case "checked":
										I = J;
										break;
									case "defaultChecked":
										Q = J;
										break;
									case "value":
										d = J;
										break;
									case "defaultValue":
										C = J;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (J != null) throw Error(u(137, r));
										break;
									default:
										st(t, r, s, J, a, null);
								}
						}
					wv(t, d, C, I, Q, v, c, !1);
					return;
				case "select":
					($e("invalid", t), (s = v = d = null));
					for (c in a)
						if (a.hasOwnProperty(c) && ((C = a[c]), C != null))
							switch (c) {
								case "value":
									d = C;
									break;
								case "defaultValue":
									v = C;
									break;
								case "multiple":
									s = C;
								default:
									st(t, r, c, C, a, null);
							}
					((r = d), (a = v), (t.multiple = !!s), r != null ? Ga(t, !!s, r, !1) : a != null && Ga(t, !!s, a, !0));
					return;
				case "textarea":
					($e("invalid", t), (d = c = s = null));
					for (v in a)
						if (a.hasOwnProperty(v) && ((C = a[v]), C != null))
							switch (v) {
								case "value":
									s = C;
									break;
								case "defaultValue":
									c = C;
									break;
								case "children":
									d = C;
									break;
								case "dangerouslySetInnerHTML":
									if (C != null) throw Error(u(91));
									break;
								default:
									st(t, r, v, C, a, null);
							}
					_v(t, s, c, d);
					return;
				case "option":
					for (I in a)
						if (a.hasOwnProperty(I) && ((s = a[I]), s != null))
							switch (I) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									st(t, r, I, s, a, null);
							}
					return;
				case "dialog":
					($e("beforetoggle", t), $e("toggle", t), $e("cancel", t), $e("close", t));
					break;
				case "iframe":
				case "object":
					$e("load", t);
					break;
				case "video":
				case "audio":
					for (s = 0; s < Ps.length; s++) $e(Ps[s], t);
					break;
				case "image":
					($e("error", t), $e("load", t));
					break;
				case "details":
					$e("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					($e("error", t), $e("load", t));
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
					for (Q in a)
						if (a.hasOwnProperty(Q) && ((s = a[Q]), s != null))
							switch (Q) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(u(137, r));
								default:
									st(t, r, Q, s, a, null);
							}
					return;
				default:
					if (If(r)) {
						for (J in a) a.hasOwnProperty(J) && ((s = a[J]), s !== void 0 && Mh(t, r, J, s, a, void 0));
						return;
					}
			}
			for (C in a) a.hasOwnProperty(C) && ((s = a[C]), s != null && st(t, r, C, s, a, null));
		}
		var KT = {};
		function GT(t, r, a, s) {
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
						v = null,
						C = null,
						I = null,
						Q = null,
						J = null;
					for (X in a) {
						var oe = a[X];
						if (a.hasOwnProperty(X) && oe != null)
							switch (X) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									I = oe;
								default:
									s.hasOwnProperty(X) || st(t, r, X, null, s, oe);
							}
					}
					for (var $ in s) {
						var X = s[$];
						if (((oe = a[$]), s.hasOwnProperty($) && (X != null || oe != null)))
							switch ($) {
								case "type":
									(X !== oe && (Xe = !0), (d = X));
									break;
								case "name":
									(X !== oe && (Xe = !0), (c = X));
									break;
								case "checked":
									(X !== oe && (Xe = !0), (Q = X));
									break;
								case "defaultChecked":
									(X !== oe && (Xe = !0), (J = X));
									break;
								case "value":
									(X !== oe && (Xe = !0), (v = X));
									break;
								case "defaultValue":
									(X !== oe && (Xe = !0), (C = X));
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (X != null) throw Error(u(137, r));
									break;
								default:
									X !== oe && st(t, r, $, X, s, oe);
							}
					}
					Df(t, v, C, I, Q, J, d, c);
					return;
				case "select":
					X = v = C = $ = null;
					for (d in a)
						if (((I = a[d]), a.hasOwnProperty(d) && I != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									X = I;
								default:
									s.hasOwnProperty(d) || st(t, r, d, null, s, I);
							}
					for (c in s)
						if (((d = s[c]), (I = a[c]), s.hasOwnProperty(c) && (d != null || I != null)))
							switch (c) {
								case "value":
									(d !== I && (Xe = !0), ($ = d));
									break;
								case "defaultValue":
									(d !== I && (Xe = !0), (C = d));
									break;
								case "multiple":
									(d !== I && (Xe = !0), (v = d));
								default:
									d !== I && st(t, r, c, d, s, I);
							}
					((r = C),
						(a = v),
						(s = X),
						$ != null
							? Ga(t, !!a, $, !1)
							: !!s != !!a && (r != null ? Ga(t, !!a, r, !0) : Ga(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					X = $ = null;
					for (C in a)
						if (((c = a[C]), a.hasOwnProperty(C) && c != null && !s.hasOwnProperty(C)))
							switch (C) {
								case "value":
									break;
								case "children":
									break;
								default:
									st(t, r, C, null, s, c);
							}
					for (v in s)
						if (((c = s[v]), (d = a[v]), s.hasOwnProperty(v) && (c != null || d != null)))
							switch (v) {
								case "value":
									(c !== d && (Xe = !0), ($ = c));
									break;
								case "defaultValue":
									(c !== d && (Xe = !0), (X = c));
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(u(91));
									break;
								default:
									c !== d && st(t, r, v, c, s, d);
							}
					Ev(t, $, X);
					return;
				case "option":
					for (var me in a)
						if ((($ = a[me]), a.hasOwnProperty(me) && $ != null && !s.hasOwnProperty(me)))
							switch (me) {
								case "selected":
									t.selected = !1;
									break;
								default:
									st(t, r, me, null, s, $);
							}
					for (I in s)
						if ((($ = s[I]), (X = a[I]), s.hasOwnProperty(I) && $ !== X && ($ != null || X != null)))
							switch (I) {
								case "selected":
									($ !== X && (Xe = !0), (t.selected = $ && typeof $ != "function" && typeof $ != "symbol"));
									break;
								default:
									st(t, r, I, $, s, X);
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
					for (var we in a)
						(($ = a[we]), a.hasOwnProperty(we) && $ != null && !s.hasOwnProperty(we) && st(t, r, we, null, s, $));
					for (Q in s)
						if ((($ = s[Q]), (X = a[Q]), s.hasOwnProperty(Q) && $ !== X && ($ != null || X != null)))
							switch (Q) {
								case "children":
								case "dangerouslySetInnerHTML":
									if ($ != null) throw Error(u(137, r));
									break;
								default:
									st(t, r, Q, $, s, X);
							}
					return;
				default:
					if (If(r)) {
						for (var Le in a)
							(($ = a[Le]),
								a.hasOwnProperty(Le) && $ !== void 0 && !s.hasOwnProperty(Le) && Mh(t, r, Le, void 0, s, $));
						for (J in s)
							(($ = s[J]),
								(X = a[J]),
								!s.hasOwnProperty(J) || $ === X || ($ === void 0 && X === void 0) || Mh(t, r, J, $, s, X));
						return;
					}
			}
			for (var Z in a)
				(($ = a[Z]), a.hasOwnProperty(Z) && $ != null && !s.hasOwnProperty(Z) && st(t, r, Z, null, s, $));
			for (oe in s)
				(($ = s[oe]),
					(X = a[oe]),
					!s.hasOwnProperty(oe) || $ === X || ($ == null && X == null) || st(t, r, oe, $, s, X));
		}
		function Rp(t) {
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
		function XT() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, r = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						v = c.initiatorType,
						C = c.duration;
					if (d && C && Rp(v)) {
						for (v = 0, C = c.responseEnd, s += 1; s < a.length; s++) {
							var I = a[s],
								Q = I.startTime;
							if (Q > C) break;
							var J = I.transferSize,
								oe = I.initiatorType;
							J && Rp(oe) && ((I = I.responseEnd), (v += J * (I < C ? 1 : (C - Q) / (I - Q))));
						}
						if ((--s, (r += (8 * (d + v)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return r / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Dh = null,
			zh = null;
		function Hs(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Np(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Mp(t, r) {
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
		function Dp(t, r, a, s) {
			return ((a = Hs(a).createElement(t)), (a[nn] = s), (a[Cn] = r), un(a, t, r), Kt(a), a);
		}
		function Ih(t, r) {
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
		var jh = null;
		function JT() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === jh ? !1 : ((jh = t), !0)) : ((jh = null), !1);
		}
		var kh = typeof setTimeout == "function" ? setTimeout : void 0,
			WT = typeof clearTimeout == "function" ? clearTimeout : void 0,
			zp = typeof Promise == "function" ? Promise : void 0,
			Ip = typeof requestAnimationFrame == "function" ? requestAnimationFrame : kh,
			ex =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof zp < "u"
						? function (t) {
								return zp.resolve(null).then(t).catch(tx);
							}
						: kh;
		function tx(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function ji(t) {
			return t === "head";
		}
		function jp(t, r) {
			var a = r,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(t.removeChild(c), jo(r));
							return;
						}
						s--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") s++;
					else if (a === "html") Hh(t.ownerDocument.documentElement);
					else if (a === "head") {
						((a = t.ownerDocument.head), Hh(a));
						for (var d = a.firstChild; d;) {
							var v = d.nextSibling,
								C = d.nodeName;
							(d[us] ||
								C === "SCRIPT" ||
								C === "STYLE" ||
								(C === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = v));
						}
					} else a === "body" && Hh(t.ownerDocument.body);
				a = c;
			} while (a);
			jo(r);
		}
		function kp(t, r) {
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
		function qp(t, r, a) {
			if (
				((r = CSS.escape(r) !== r ? "r-" + btoa(r).replace(/=/g, "") : r),
				(t.style.viewTransitionName = r),
				a != null && (t.style.viewTransitionClass = a),
				(a = getComputedStyle(t)),
				a.display === "inline")
			) {
				if (((r = t.getClientRects()), r.length === 1)) var s = 1;
				else
					for (var c = (s = 0); c < r.length; c++) {
						var d = r[c];
						0 < d.width && 0 < d.height && s++;
					}
				s === 1 &&
					((t = t.style),
					(t.display = r.length === 1 ? "inline-block" : "block"),
					(t.marginTop = "-" + a.paddingTop),
					(t.marginBottom = "-" + a.paddingBottom));
			}
		}
		function Lp(t, r) {
			((t = t.style), (r = r.style));
			var a =
				r != null
					? r.hasOwnProperty("viewTransitionName")
						? r.viewTransitionName
						: r.hasOwnProperty("view-transition-name")
							? r["view-transition-name"]
							: null
					: null;
			((t.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim()),
				(a =
					r != null
						? r.hasOwnProperty("viewTransitionClass")
							? r.viewTransitionClass
							: r.hasOwnProperty("view-transition-class")
								? r["view-transition-class"]
								: null
						: null),
				(t.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim()),
				t.display === "inline-block" &&
					(r == null
						? (t.display = t.margin = "")
						: ((a = r.display),
							(t.display = a == null || typeof a == "boolean" ? "" : a),
							(a = r.margin),
							a != null
								? (t.margin = a)
								: ((a = r.hasOwnProperty("marginTop") ? r.marginTop : r["margin-top"]),
									(t.marginTop = a == null || typeof a == "boolean" ? "" : a),
									(r = r.hasOwnProperty("marginBottom") ? r.marginBottom : r["margin-bottom"]),
									(t.marginBottom = r == null || typeof r == "boolean" ? "" : r)))));
		}
		function Up(t, r, a) {
			return (
				(a = a.ownerDocument.defaultView),
				{
					rect: t,
					abs: r.position === "absolute" || r.position === "fixed",
					clip:
						r.clipPath !== "none" ||
						r.overflow !== "visible" ||
						r.filter !== "none" ||
						r.mask !== "none" ||
						r.mask !== "none" ||
						r.borderRadius !== "0px",
					view: 0 <= t.bottom && 0 <= t.right && t.top <= a.innerHeight && t.left <= a.innerWidth,
				}
			);
		}
		function qh(t) {
			return Up(t.getBoundingClientRect(), getComputedStyle(t), t);
		}
		function nx(t) {
			var r = t.getBoundingClientRect();
			r = new DOMRect(r.x + 2e4, r.y + 2e4, r.width, r.height);
			var a = getComputedStyle(t);
			return Up(r, a, t);
		}
		function rx(t) {
			return t.documentElement.clientHeight;
		}
		function ix(t) {
			(this.addEventListener("load", t), this.addEventListener("error", t));
		}
		function ax(t, r, a, s, c, d, v, C, I) {
			var Q = r.nodeType === 9 ? r : r.ownerDocument;
			try {
				var J = Q.startViewTransition({
					update: function () {
						var $ = Q.defaultView,
							X = $.navigation && $.navigation.transition,
							me = Q.fonts.status;
						s();
						var we = [];
						if (
							(me === "loaded" && (rx(Q), Q.fonts.status === "loading" && we.push(Q.fonts.ready)),
							(me = we.length),
							t !== null)
						)
							for (var Le = t.suspenseyImages, Z = 0, V = 0; V < Le.length; V++) {
								var G = Le[V];
								if (!G.complete) {
									var ie = G.getBoundingClientRect();
									if (0 < ie.bottom && 0 < ie.right && ie.top < $.innerHeight && ie.left < $.innerWidth) {
										if (((Z += ob(G)), Z > ic)) {
											we.length = me;
											break;
										}
										((G = new Promise(ix.bind(G))), we.push(G));
									}
								}
							}
						if (0 < we.length)
							return (
								($ = Promise.race([
									Promise.all(we),
									new Promise(function (Se) {
										return setTimeout(Se, 500);
									}),
								]).then(c, c)),
								(X ? Promise.allSettled([X.finished, $]) : $).then(d, d)
							);
						if ((c(), X)) return X.finished.then(d, d);
						d();
					},
					types: a,
				});
				Q.__reactViewTransition = J;
				var oe = [];
				return (
					J.ready.then(
						function () {
							for (var $ = Q.documentElement.getAnimations({ subtree: !0 }), X = 0; X < $.length; X++) {
								var me = $[X],
									we = me.effect,
									Le = we.pseudoElement;
								if (Le != null && Le.startsWith("::view-transition")) {
									(oe.push(me), (me = we.getKeyframes()));
									for (var Z = (Le = void 0), V = !0, G = 0; G < me.length; G++) {
										var ie = me[G],
											Se = ie.width;
										if (Le === void 0) Le = Se;
										else if (Le !== Se) {
											V = !1;
											break;
										}
										if (((Se = ie.height), Z === void 0)) Z = Se;
										else if (Z !== Se) {
											V = !1;
											break;
										}
										(delete ie.width, delete ie.height, ie.transform === "none" && delete ie.transform);
									}
									V &&
										Le !== void 0 &&
										Z !== void 0 &&
										(we.setKeyframes(me),
										(V = getComputedStyle(we.target, we.pseudoElement)),
										V.width !== Le || V.height !== Z) &&
										((V = me[0]),
										(V.width = Le),
										(V.height = Z),
										(V = me[me.length - 1]),
										(V.width = Le),
										(V.height = Z),
										we.setKeyframes(me));
								}
							}
							v();
						},
						function ($) {
							Q.__reactViewTransition === J && (Q.__reactViewTransition = null);
							try {
								if (typeof $ == "object" && $ !== null)
									switch ($.name) {
										case "InvalidStateError":
											($.message === "View transition was skipped because document visibility state is hidden." ||
												$.message === "Skipping view transition because document visibility state has become hidden." ||
												$.message === "Skipping view transition because viewport size changed." ||
												$.message === "Transition was aborted because of invalid state") &&
												($ = null);
									}
								$ !== null && I($);
							} finally {
								(s(), c(), v());
							}
						},
					),
					J.finished.finally(function () {
						for (var $ = 0; $ < oe.length; $++) oe[$].cancel();
						(Q.__reactViewTransition === J && (Q.__reactViewTransition = null), C());
					}),
					J
				);
			} catch {
				return (s(), c(), v(), null);
			}
		}
		function xa(t, r) {
			((this._scope = document.documentElement), (this._selector = "::view-transition-" + t + "(" + r + ")"));
		}
		((xa.prototype.animate = function (t, r) {
			return (
				(r = typeof r == "number" ? { duration: r } : L({}, r)),
				(r.pseudoElement = this._selector),
				this._scope.animate(t, r)
			);
		}),
			(xa.prototype.getAnimations = function () {
				for (
					var t = this._scope, r = this._selector, a = t.getAnimations({ subtree: !0 }), s = [], c = 0;
					c < a.length;
					c++
				) {
					var d = a[c].effect;
					d !== null && d.target === t && d.pseudoElement === r && s.push(a[c]);
				}
				return s;
			}),
			(xa.prototype.getComputedStyle = function () {
				return getComputedStyle(this._scope, this._selector);
			}));
		function Vp(t) {
			return {
				name: t,
				group: new xa("group", t),
				imagePair: new xa("image-pair", t),
				old: new xa("old", t),
				new: new xa("new", t),
			};
		}
		function $n(t) {
			((this._fragmentFiber = t), (this._observers = this._eventListeners = null));
		}
		$n.prototype.addEventListener = function (t, r, a) {
			var s = null,
				c = null;
			if (!(a != null && typeof a != "boolean" && ((s = a.signal || null), s !== null && s.aborted))) {
				this._eventListeners === null && (this._eventListeners = []);
				var d = this._eventListeners;
				if (Pp(d, t, r, a) === -1) {
					var v = this,
						C = r;
					(a != null &&
						typeof a != "boolean" &&
						a.once === !0 &&
						(C = function (I) {
							(v.removeEventListener(t, r, a), typeof r == "function" ? r.call(this, I) : r.handleEvent(I));
						}),
						s !== null &&
							((c = v.removeEventListener.bind(v, t, r, a)),
							s.addEventListener("abort", c, { once: !0 }),
							(c = s.removeEventListener.bind(s, "abort", c))),
						(s = Ro(a)),
						d.push({ type: t, listener: r, optionsOrUseCapture: a, attachedListener: C, cleanup: c }),
						y(this._fragmentFiber.child, !1, ox, t, C, s));
				}
				this._eventListeners = d;
			}
		};
		function ox(t, r, a, s) {
			return (z(t).addEventListener(r, a, s), !1);
		}
		$n.prototype.removeEventListener = function (t, r, a) {
			var s = this._eventListeners;
			if (s !== null && ((r = Pp(s, t, r, a)), r !== -1)) {
				var c = s[r];
				a = c.attachedListener;
				var d = c.cleanup;
				((c = Ro(c.optionsOrUseCapture)),
					y(this._fragmentFiber.child, !1, sx, t, a, c),
					s.splice(r, 1),
					d !== null && d());
			}
		};
		function sx(t, r, a, s) {
			return (z(t).removeEventListener(r, a, s), !1);
		}
		function Ro(t) {
			return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal)
				? { capture: t.capture, passive: t.passive }
				: t;
		}
		function Bp(t) {
			return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
		}
		function Pp(t, r, a, s) {
			if (t.length === 0) return -1;
			s = Bp(s);
			for (var c = 0; c < t.length; c++) {
				var d = t[c];
				if (d.type === r && d.listener === a && Bp(d.optionsOrUseCapture) === s) return c;
			}
			return -1;
		}
		(($n.prototype.dispatchEvent = function (t) {
			var r = w(this._fragmentFiber);
			if (r === null) return !0;
			r = z(r);
			var a = this._eventListeners;
			if ((a !== null && 0 < a.length) || !t.bubbles) {
				var s = r.nodeType === 9 ? r.createComment("") : document.createTextNode("");
				if (a)
					for (var c = 0; c < a.length; c++) {
						var d = a[c];
						s.addEventListener(d.type, d.attachedListener, Ro(d.optionsOrUseCapture));
					}
				if ((r.appendChild(s), (t = s.dispatchEvent(t)), a))
					for (c = 0; c < a.length; c++)
						((d = a[c]), s.removeEventListener(d.type, d.attachedListener, Ro(d.optionsOrUseCapture)));
				return (r.removeChild(s), t);
			}
			return r.dispatchEvent(t);
		}),
			($n.prototype.focus = function (t) {
				y(this._fragmentFiber.child, !0, $p, t, void 0, void 0);
			}));
		function $p(t, r) {
			return t.tag === 6 ? !1 : ((t = z(t)), bx(t, r));
		}
		$n.prototype.focusLast = function (t) {
			var r = [];
			y(this._fragmentFiber.child, !0, Lh, r, void 0, void 0);
			for (var a = r.length - 1; 0 <= a && !$p(r[a], t); a--);
		};
		function Lh(t, r) {
			return (r.push(t), !1);
		}
		$n.prototype.blur = function () {
			var t = w(this._fragmentFiber);
			t !== null &&
				((t = z(t)), (t = Hs(t).activeElement), t !== null && y(this._fragmentFiber.child, !1, ux, t, void 0, void 0));
		};
		function ux(t, r) {
			return t.tag === 6 ? !1 : ((t = z(t)), t === r || t.contains(r) ? (r.blur(), !0) : !1);
		}
		$n.prototype.observeUsing = function (t) {
			(this._observers === null && (this._observers = new Set()),
				this._observers.add(t),
				y(this._fragmentFiber.child, !1, lx, t, void 0, void 0));
		};
		function lx(t, r) {
			return (t.tag === 6 || ((t = z(t)), r.observe(t)), !1);
		}
		$n.prototype.unobserveUsing = function (t) {
			var r = this._observers;
			if (r !== null && r.has(t)) {
				(r.delete(t), y(this._fragmentFiber.child, !1, cx, t, void 0, void 0));
				for (var a = (r = 0); a < mr.length; a++) {
					var s = mr[a];
					s.fragmentInstance === this && s.observer === t ? t.unobserve(s.instance) : (mr[r++] = s);
				}
				mr.length = r;
			}
		};
		function cx(t, r) {
			return (t.tag === 6 || ((t = z(t)), r.unobserve(t)), !1);
		}
		var mr = [],
			Uh = !1;
		function fx(t, r, a) {
			(mr.push({ fragmentInstance: t, observer: r, instance: a }),
				Uh ||
					((Uh = !0),
					Sx(function () {
						Uh = !1;
						var s = mr;
						mr = [];
						for (var c = 0; c < s.length; c++) {
							var d = s[c];
							d.observer.unobserve(d.instance);
						}
					})));
		}
		$n.prototype.getClientRects = function () {
			var t = [];
			return (y(this._fragmentFiber.child, !1, dx, t, void 0, void 0), t);
		};
		function dx(t, r) {
			if (t.tag === 6) {
				t = t.stateNode;
				var a = t.ownerDocument.createRange();
				(a.selectNodeContents(t), r.push.apply(r, a.getClientRects()));
			} else ((t = z(t)), r.push.apply(r, t.getClientRects()));
			return !1;
		}
		(($n.prototype.getRootNode = function (t) {
			var r = w(this._fragmentFiber);
			return r === null ? this : z(r).getRootNode(t);
		}),
			($n.prototype.compareDocumentPosition = function (t) {
				var r = w(this._fragmentFiber);
				if (r === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
				var a = [];
				y(this._fragmentFiber.child, !1, Lh, a, void 0, void 0);
				var s = z(r);
				if (a.length === 0) {
					if (((a = s), E(this._fragmentFiber))) {
						e: {
							for (r = this._fragmentFiber.return; r !== null;) {
								if (r.tag === 4) {
									r = r.stateNode.containerInfo;
									break e;
								}
								if (r.tag === 3 || r.tag === 5 || r.tag === 27) break;
								r = r.return;
							}
							r = null;
						}
						r != null && (a = r);
					}
					r = this._fragmentFiber;
					var c = (s = a.compareDocumentPosition(t));
					return (
						a === t
							? (c = Node.DOCUMENT_POSITION_CONTAINS)
							: s & Node.DOCUMENT_POSITION_CONTAINED_BY &&
								((a = T(r)[1]),
								a === null
									? (c = Node.DOCUMENT_POSITION_PRECEDING)
									: ((t = z(a).compareDocumentPosition(t)),
										(c =
											t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING
												? Node.DOCUMENT_POSITION_FOLLOWING
												: Node.DOCUMENT_POSITION_PRECEDING))),
						(c |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)
					);
				}
				((r = z(a[0])), (c = z(a[a.length - 1])));
				var d = E(this._fragmentFiber) ? r.parentElement : s;
				if (d == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
				((s = d.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY),
					(d = d.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_CONTAINED_BY));
				var v = r.compareDocumentPosition(t),
					C = c.compareDocumentPosition(t),
					I = v & Node.DOCUMENT_POSITION_CONTAINED_BY || C & Node.DOCUMENT_POSITION_CONTAINED_BY;
				return (
					(C = s && d && v & Node.DOCUMENT_POSITION_FOLLOWING && C & Node.DOCUMENT_POSITION_PRECEDING),
					(r =
						(s && r === t) || (d && c === t) || I || C
							? Node.DOCUMENT_POSITION_CONTAINED_BY
							: (!s && r === t) || (!d && c === t)
								? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
								: v),
					r & Node.DOCUMENT_POSITION_DISCONNECTED ||
					r & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC ||
					hx(r, this._fragmentFiber, a[0], a[a.length - 1], t)
						? r
						: Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
				);
			}));
		function hx(t, r, a, s, c) {
			var d = ra(c);
			if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
				if ((a = !!d))
					e: {
						for (; d !== null;) {
							if (d.tag === 7 && (d === r || d.alternate === r)) {
								a = !0;
								break e;
							}
							d = d.return;
						}
						a = !1;
					}
				return a;
			}
			if (t & Node.DOCUMENT_POSITION_CONTAINS) {
				if (d === null) return ((d = c.ownerDocument), c === d || c === d.documentElement || c === d.body);
				e: {
					for (d = r, r = w(r); d !== null;) {
						if (!((d.tag !== 5 && d.tag !== 3 && d.tag !== 27) || (d !== r && d.alternate !== r))) {
							d = !0;
							break e;
						}
						d = d.return;
					}
					d = !1;
				}
				return d;
			}
			return t & Node.DOCUMENT_POSITION_PRECEDING
				? ((r = !!d) &&
						!(r = d === a) &&
						((r = O(a, d, k)), r === null ? (r = !1) : (y(r, !0, N, d, a), (d = M), (M = null), (r = d !== null))),
					r)
				: t & Node.DOCUMENT_POSITION_FOLLOWING
					? ((r = !!d) &&
							!(r = d === s) &&
							((r = O(s, d, k)),
							r === null ? (r = !1) : (y(r, !0, D, d, s), (d = M), (A = M = null), (r = d !== null))),
						r)
					: !1;
		}
		function Hp(t, r) {
			var a = t.ownerDocument.createRange();
			(a.selectNodeContents(t),
				(t = a.getBoundingClientRect()),
				window.scrollTo(
					window.scrollX + t.left,
					r ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight,
				));
		}
		$n.prototype.scrollIntoView = function (t) {
			if (typeof t == "object") throw Error(u(566));
			var r = [];
			y(this._fragmentFiber.child, !1, Lh, r, void 0, void 0);
			var a = t !== !1;
			if (r.length === 0) {
				var s = T(this._fragmentFiber);
				if (((s = a ? s[1] || s[0] || w(this._fragmentFiber) : s[0] || s[1]), s === null)) return;
				if (s.tag === 6) {
					((t = z(s)), Hp(t, a));
					return;
				}
				if (((s = z(s)), s.nodeType !== 9)) {
					if (s.nodeType === 11) {
						((a = "host" in s ? s.host : null), a !== null && a.scrollIntoView(t));
						return;
					}
					s.scrollIntoView(t);
				}
			}
			for (s = a ? r.length - 1 : 0; s !== (a ? -1 : r.length);) {
				var c = r[s];
				(c.tag === 6 ? ((c = z(c)), Hp(c, a)) : z(c).scrollIntoView(t), (s += a ? -1 : 1));
			}
		};
		function mx(t, r) {
			return ((t = z(t)), Zp(t, r), !1);
		}
		function Zp(t, r) {
			((t.reactFragments ??= new Set()), t.reactFragments.add(r));
		}
		function Fp(t, r) {
			var a = r._eventListeners;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s];
					t.addEventListener(c.type, c.attachedListener, Ro(c.optionsOrUseCapture));
				}
			t.nodeType !== 3 &&
				((a = r._observers),
				a !== null &&
					a.forEach(function (d) {
						for (var v = 0, C = 0; C < mr.length; C++) {
							var I = mr[C];
							(I.fragmentInstance !== r || I.observer !== d || I.instance !== t) && (mr[v++] = I);
						}
						((mr.length = v), d.observe(t));
					}),
				Zp(t, r));
		}
		function gx(t, r) {
			var a = r._eventListeners;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s];
					t.removeEventListener(c.type, c.attachedListener, Ro(c.optionsOrUseCapture));
				}
			t.nodeType !== 3 &&
				((a = r._observers),
				a !== null &&
					a.forEach(function (d) {
						typeof d.rootMargin == "string" ? fx(r, d, t) : d.unobserve(t);
					}),
				t.reactFragments != null && t.reactFragments.delete(r));
		}
		function Vh(t) {
			var r = t.firstChild;
			for (r && r.nodeType === 10 && (r = r.nextSibling); r;) {
				var a = r;
				switch (((r = r.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Vh(a), Fu(a));
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
		function vx(t, r, a, s) {
			for (; t.nodeType === 1;) {
				var c = a;
				if (t.nodeName.toLowerCase() !== r.toLowerCase()) {
					if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (s) {
					if (!t[us])
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
				if (((t = nr(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function yx(t, r, a) {
			if (r === "") return null;
			for (; t.nodeType !== 3;)
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = nr(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Qp(t, r) {
			for (; t.nodeType !== 8;)
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r) ||
					((t = nr(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Bh(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function Ph(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function px(t, r) {
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
		function nr(t) {
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
		var $h = null;
		function Yp(t) {
			t = t.nextSibling;
			for (var r = 0; t;) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (r === 0) return nr(t.nextSibling);
						r--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || r++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Kp(t) {
			t = t.previousSibling;
			for (var r = 0; t;) {
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
		function bx(t, r) {
			function a() {
				s = !0;
			}
			if (t.ownerDocument.activeElement === t) return !0;
			var s = !1;
			try {
				(t.ownerDocument.addEventListener("focus", a, !0), (t.focus || HTMLElement.prototype.focus).call(t, r));
			} finally {
				t.ownerDocument.removeEventListener("focus", a, !0);
			}
			return s;
		}
		function Sx(t) {
			Ip(function () {
				Ip(function (r) {
					return t(r);
				});
			});
		}
		function Gp(t, r, a) {
			switch (((r = Hs(a)), t)) {
				case "html":
					if (((t = r.documentElement), !t)) throw Error(u(452));
					return t;
				case "head":
					if (((t = r.head), !t)) throw Error(u(453));
					return t;
				case "body":
					if (((t = r.body), !t)) throw Error(u(454));
					return t;
				default:
					throw Error(u(451));
			}
		}
		function Xp(t, r, a) {
			for (var s in a) {
				var c = a[s];
				a.hasOwnProperty(s) && c != null && st(t, r, s, null, KT, c);
			}
			(a.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === wr && (t.onclick = null), Fu(t));
		}
		function Hh(t) {
			for (var r = t.attributes; r.length;) t.removeAttributeNode(r[0]);
			Fu(t);
		}
		var rr = new Map(),
			Jp = new Set();
		function Zs(t) {
			if (typeof t.getRootNode == "function") {
				var r = t.getRootNode();
				if (r.nodeType === 9 || r.nodeType === 11) return r;
			}
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		var ni = ye.d;
		ye.d = { f: wx, r: Ex, D: _x, C: Cx, L: Tx, m: xx, X: Ax, S: Ox, M: Rx };
		function wx() {
			var t = ni.f(),
				r = Kl();
			return t || r;
		}
		function Ex(t) {
			var r = Qa(t);
			r !== null && r.tag === 5 && r.type === "form" ? t0(r) : ni.r(t);
		}
		var No = typeof document > "u" ? null : document;
		function Wp(t, r, a) {
			var s = No;
			if (s && typeof r == "string" && r) {
				var c = Yn(r);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Jp.has(c) ||
						(Jp.add(c),
						(t = { rel: t, crossOrigin: a, href: r }),
						s.querySelector(c) === null &&
							((r = s.createElement("link")), un(r, "link", t), Kt(r), s.head.appendChild(r))));
			}
		}
		function _x(t) {
			(ni.D(t), Wp("dns-prefetch", t, null));
		}
		function Cx(t, r) {
			(ni.C(t, r), Wp("preconnect", t, r));
		}
		function Tx(t, r, a) {
			ni.L(t, r, a);
			var s = No;
			if (s && t && r) {
				var c = 'link[rel="preload"][as="' + Yn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + Yn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + Yn(a.imageSizes) + '"]'))
					: (c += '[href="' + Yn(t) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = Mo(t);
						break;
					case "script":
						d = Do(t);
				}
				if (!(
					rr.has(d) ||
					((t = L({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : t, as: r }, a)),
					rr.set(d, t),
					s.querySelector(c) !== null ||
						(r === "style" && s.querySelector(Fs(d))) ||
						(r === "script" && s.querySelector(Qs(d))))
				)) {
					var v = s.createElement("link");
					(un(v, "link", t),
						r === "style" &&
							((v[Zu] = !0),
							(v.onload = v.onerror =
								function () {
									hv(v);
								})),
						Kt(v),
						s.head.appendChild(v));
				}
			}
		}
		function xx(t, r) {
			ni.m(t, r);
			var a = No;
			if (a && t) {
				var s = r && typeof r.as == "string" ? r.as : "script",
					c = 'link[rel="modulepreload"][as="' + Yn(s) + '"][href="' + Yn(t) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Do(t);
				}
				if (!rr.has(d) && ((t = L({ rel: "modulepreload", href: t }, r)), rr.set(d, t), a.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Qs(d))) return;
					}
					((s = a.createElement("link")), un(s, "link", t), Kt(s), a.head.appendChild(s));
				}
			}
		}
		function Ox(t, r, a) {
			ni.S(t, r, a);
			var s = No;
			if (s && t) {
				var c = Ya(s).hoistableStyles,
					d = Mo(t);
				r = r || "default";
				var v = c.get(d);
				if (!v) {
					var C = { loading: 0, preload: null };
					if ((v = s.querySelector(Fs(d)))) C.loading = 5;
					else {
						((t = L({ rel: "stylesheet", href: t, "data-precedence": r }, a)), (a = rr.get(d)) && Zh(t, a));
						var I = (v = s.createElement("link"));
						(Kt(I),
							un(I, "link", t),
							(I._p = new Promise(function (Q, J) {
								((I.onload = Q), (I.onerror = J));
							})),
							I.addEventListener("load", function () {
								C.loading |= 1;
							}),
							I.addEventListener("error", function () {
								C.loading |= 2;
							}),
							(C.loading |= 4),
							nc(v, r, s));
					}
					((v = { type: "stylesheet", instance: v, count: 1, state: C }), c.set(d, v));
				}
			}
		}
		function Ax(t, r) {
			ni.X(t, r);
			var a = No;
			if (a && t) {
				var s = Ya(a).hoistableScripts,
					c = Do(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Qs(c))),
					d ||
						((t = L({ src: t, async: !0 }, r)),
						(r = rr.get(c)) && Fh(t, r),
						(d = a.createElement("script")),
						Kt(d),
						un(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function Rx(t, r) {
			ni.M(t, r);
			var a = No;
			if (a && t) {
				var s = Ya(a).hoistableScripts,
					c = Do(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Qs(c))),
					d ||
						((t = L({ src: t, async: !0, type: "module" }, r)),
						(r = rr.get(c)) && Fh(t, r),
						(d = a.createElement("script")),
						Kt(d),
						un(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function eb(t, r, a, s) {
			var c = (c = At.current) ? Zs(c) : null;
			if (!c) throw Error(u(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((a = Mo(a.href)),
							(r = Ya(c).hoistableStyles),
							(s = r.get(a)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), r.set(a, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Mo(a.href);
						var d = Ya(c).hoistableStyles,
							v = d.get(t);
						if (
							(v ||
								((c = c.ownerDocument || c),
								(v = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, v),
								(d = c.querySelector(Fs(t)))
									? d._p || ((v.instance = d), (v.state.loading = 5))
									: ((d = rr.get(t)),
										d ||
											((d = {
												rel: "preload",
												as: "style",
												href: a.href,
												crossOrigin: a.crossOrigin,
												integrity: a.integrity,
												media: a.media,
												hrefLang: a.hrefLang,
												referrerPolicy: a.referrerPolicy,
											}),
											rr.set(t, d)),
										Nx(c, t, d, v.state))),
							r && s === null)
						)
							throw Error(u(528, ""));
						return v;
					}
					if (r && s !== null) throw Error(u(529, ""));
					return null;
				case "script":
					return (
						(r = a.async),
						(a = a.src),
						typeof a == "string" && r && typeof r != "function" && typeof r != "symbol"
							? ((a = Do(a)),
								(r = Ya(c).hoistableScripts),
								(s = r.get(a)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), r.set(a, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(u(444, t));
			}
		}
		function Mo(t) {
			return 'href="' + Yn(t) + '"';
		}
		function Fs(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function tb(t) {
			return L({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function Nx(t, r, a, s) {
			if ((r = t.querySelector('link[rel="preload"][as="style"][' + r + "]"))) {
				if (r[Zu] !== !0) {
					s.loading = 1;
					return;
				}
			} else
				((r = t.createElement("link")),
					(r[Zu] = !0),
					(r.onload = r.onerror = hv.bind(null, r)),
					un(r, "link", a),
					Kt(r),
					t.head.appendChild(r));
			((s.preload = r),
				r.addEventListener("load", function () {
					return (s.loading |= 1);
				}),
				r.addEventListener("error", function () {
					return (s.loading |= 2);
				}));
		}
		function Do(t) {
			return '[src="' + Yn(t) + '"]';
		}
		function Qs(t) {
			return "script[async]" + t;
		}
		function nb(t, r, a) {
			if ((r.count++, r.instance === null))
				switch (r.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + Yn(a.href) + '"]');
						if (s) return ((r.instance = s), Kt(s), s);
						var c = L({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							Kt(s),
							un(s, "style", c),
							nc(s, a.precedence, t),
							(r.instance = s)
						);
					case "stylesheet":
						c = Mo(a.href);
						var d = t.querySelector(Fs(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), Kt(d), d);
						((s = tb(a)), (c = rr.get(c)) && Zh(s, c), (d = (t.ownerDocument || t).createElement("link")), Kt(d));
						var v = d;
						return (
							(v._p = new Promise(function (C, I) {
								((v.onload = C), (v.onerror = I));
							})),
							un(d, "link", s),
							(r.state.loading |= 4),
							nc(d, a.precedence, t),
							(r.instance = d)
						);
					case "script":
						return (
							(d = Do(a.src)),
							(c = t.querySelector(Qs(d)))
								? ((r.instance = c), Kt(c), c)
								: ((s = a),
									(c = rr.get(d)) && ((s = L({}, a)), Fh(s, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									Kt(c),
									un(c, "link", s),
									t.head.appendChild(c),
									(r.instance = c))
						);
					case "void":
						return null;
					default:
						throw Error(u(443, r.type));
				}
			else
				r.type === "stylesheet" &&
					(r.state.loading & 4) === 0 &&
					((s = r.instance), (r.state.loading |= 4), nc(s, a.precedence, t));
			return r.instance;
		}
		function nc(t, r, a) {
			for (
				var s = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = s.length ? s[s.length - 1] : null,
					d = c,
					v = 0;
				v < s.length;
				v++
			) {
				var C = s[v];
				if (C.dataset.precedence === r) d = C;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(t, d.nextSibling)
				: ((r = a.nodeType === 9 ? a.head : a), r.insertBefore(t, r.firstChild));
		}
		function Zh(t, r) {
			((t.crossOrigin ??= r.crossOrigin), (t.referrerPolicy ??= r.referrerPolicy), (t.title ??= r.title));
		}
		function Fh(t, r) {
			((t.crossOrigin ??= r.crossOrigin), (t.referrerPolicy ??= r.referrerPolicy), (t.integrity ??= r.integrity));
		}
		var rc = null;
		function rb(t, r, a) {
			if (rc === null) {
				var s = new Map(),
					c = (rc = new Map());
				c.set(a, s);
			} else ((c = rc), (s = c.get(a)), s || ((s = new Map()), c.set(a, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[us] || d[nn] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var v = d.getAttribute(r) || "";
					v = t + v;
					var C = s.get(v);
					C ? C.push(d) : s.set(v, [d]);
				}
			}
			return s;
		}
		function Qh(t, r, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, r === "title" ? t.querySelector("head > title") : null));
		}
		function Mx(t, r, a) {
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
		function ib(t, r) {
			return t === "img" && r.src != null && r.src !== "" && r.onLoad == null && r.loading !== "lazy";
		}
		function ab(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function ob(t) {
			return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
		}
		function sb(t, r) {
			typeof r.decode == "function" &&
				(t.imgCount++,
				r.complete || ((t.imgBytes += ob(r)), t.suspenseyImages.push(r)),
				(t = Ix.bind(t)),
				r.decode().then(t, t));
		}
		function Dx(t, r, a, s) {
			if (
				a.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Mo(s.href),
						d = r.querySelector(Fs(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(t.count++, (t = Ys.bind(t)), r.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							Kt(d));
						return;
					}
					((d = r.ownerDocument || r), (s = tb(s)), (c = rr.get(c)) && Zh(s, c), (d = d.createElement("link")), Kt(d));
					var v = d;
					((v._p = new Promise(function (C, I) {
						((v.onload = C), (v.onerror = I));
					})),
						un(d, "link", s),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, r),
					(r = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Ys.bind(t)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var ic = 0;
		function zx(t, r) {
			return (
				t.stylesheets && t.count === 0 && oc(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var s = setTimeout(function () {
								if ((t.stylesheets && oc(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < t.imgBytes && ic === 0 && (ic = 62500 * XT());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && oc(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > ic ? 50 : 800) + r,
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
		function ub(t) {
			if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
				if (t.stylesheets) oc(t, t.stylesheets);
				else if (t.unsuspend) {
					var r = t.unsuspend;
					((t.unsuspend = null), r());
				}
			}
		}
		function Ys() {
			(this.count--, ub(this));
		}
		function Ix() {
			(this.imgCount--, ub(this));
		}
		var ac = null;
		function oc(t, r) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (ac = new Map()), r.forEach(jx, t), (ac = null), Ys.call(t)));
		}
		function jx(t, r) {
			if (!(r.state.loading & 4)) {
				var a = ac.get(t);
				if (a) var s = a.get(null);
				else {
					((a = new Map()), ac.set(t, a));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var v = c[d];
						(v.nodeName === "LINK" || v.getAttribute("media") !== "not all") &&
							(a.set(v.dataset.precedence, v), (s = v));
					}
					s && a.set(null, s);
				}
				((c = r.instance),
					(v = c.getAttribute("data-precedence")),
					(d = a.get(v) || s),
					d === s && a.set(null, c),
					a.set(v, c),
					this.count++,
					(s = Ys.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var zo = { $$typeof: B, Provider: null, Consumer: null, _currentValue: Ge, _currentValue2: Ge, _threadCount: 0 };
		function kx(t, r, a, s, c, d, v, C, I) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = Rf(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = Rf(0)),
				(this.hiddenUpdates = Rf(null)),
				(this.identifierPrefix = s),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = v),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = I),
				(this.transitionTypes = null),
				(this.incompleteTransitions = new Map()));
		}
		function qx(t, r, a, s, c, d, v, C, I, Q, J, oe) {
			return (
				(t = new kx(t, r, a, v, I, Q, J, oe, C)),
				(r = 1),
				d === !0 && (r |= 24),
				(d = Tn(3, null, null, r)),
				(t.current = d),
				(d.stateNode = t),
				(r = ld()),
				r.refCount++,
				(t.pooledCache = r),
				r.refCount++,
				(d.memoizedState = { element: s, isDehydrated: a, cache: r }),
				hd(d),
				t
			);
		}
		function Lx(t) {
			return t ? ((t = io), t) : io;
		}
		function lb(t, r, a, s, c, d) {
			((c = Lx(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = pa(r)),
				(s.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(a = ba(t, s, r)),
				a !== null && (Rn(a, t, r), Ts(a, t, r)));
		}
		function cb(t, r) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Yh(t, r) {
			(cb(t, r), (t = t.alternate) && cb(t, r));
		}
		function fb(t) {
			if (t.tag === 13 || t.tag === 31) {
				var r = sa(t, 67108864);
				(r !== null && Rn(r, t, 67108864), Yh(t, 67108864));
			}
		}
		function db(t) {
			if (t.tag === 13 || t.tag === 31) {
				var r = tr();
				r = uv(r);
				var a = sa(t, r);
				(a !== null && Rn(a, t, r), Yh(t, r));
			}
		}
		var Io = !0;
		function Ux(t, r, a, s) {
			var c = ce.T;
			ce.T = null;
			var d = ye.p;
			try {
				((ye.p = 2), Kh(t, r, a, s));
			} finally {
				((ye.p = d), (ce.T = c));
			}
		}
		function Vx(t, r, a, s) {
			var c = ce.T;
			ce.T = null;
			var d = ye.p;
			try {
				((ye.p = 8), Kh(t, r, a, s));
			} finally {
				((ye.p = d), (ce.T = c));
			}
		}
		function Kh(t, r, a, s) {
			if (Io) {
				var c = Gh(s);
				if (c === null) (Nh(t, r, s, sc, a), mb(t, s));
				else if (Px(c, t, r, a, s)) s.stopPropagation();
				else if ((mb(t, s), r & 4 && -1 < Bx.indexOf(t))) {
					for (; c !== null;) {
						var d = Qa(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var v = na(d.pendingLanes);
										if (v !== 0) {
											var C = d;
											for (C.pendingLanes |= 2, C.entangledLanes |= 2; v;) {
												var I = 1 << (31 - Me(v));
												((C.entanglements[1] |= I), (v &= ~I));
											}
											(ti(d), (tt & 6) === 0 && ((Fl = tn() + 500), Bs(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((C = sa(d, 2)), C !== null && Rn(C, d, 2), Kl(), Yh(d, 2));
							}
						if (((d = Gh(s)), d === null && Nh(t, r, s, sc, a), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Nh(t, r, s, null, a);
			}
		}
		function Gh(t) {
			return ((t = kf(t)), Xh(t));
		}
		var sc = null;
		function Xh(t) {
			if (((sc = null), (t = ra(t)), t !== null)) {
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
			return ((sc = t), null);
		}
		function hb(t) {
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
				case "fullscreenerror":
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
				case "resize":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave":
					return 8;
				case "message":
					switch (de()) {
						case Be:
							return 2;
						case Rt:
							return 8;
						case ft:
						case pn:
							return 32;
						case mn:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Jh = !1,
			ki = null,
			qi = null,
			Li = null,
			Ks = new Map(),
			Gs = new Map(),
			Ui = [],
			Bx =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function mb(t, r) {
			switch (t) {
				case "focusin":
				case "focusout":
					ki = null;
					break;
				case "dragenter":
				case "dragleave":
					qi = null;
					break;
				case "mouseover":
				case "mouseout":
					Li = null;
					break;
				case "pointerover":
				case "pointerout":
					Ks.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Gs.delete(r.pointerId);
			}
		}
		function Xs(t, r, a, s, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: r, domEventName: a, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = Qa(r)), r !== null && fb(r)),
					t)
				: ((t.eventSystemFlags |= s), (r = t.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), t);
		}
		function Px(t, r, a, s, c) {
			switch (r) {
				case "focusin":
					return ((ki = Xs(ki, t, r, a, s, c)), !0);
				case "dragenter":
					return ((qi = Xs(qi, t, r, a, s, c)), !0);
				case "mouseover":
					return ((Li = Xs(Li, t, r, a, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Ks.set(d, Xs(Ks.get(d) || null, t, r, a, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Gs.set(d, Xs(Gs.get(d) || null, t, r, a, s, c)), !0);
			}
			return !1;
		}
		function gb(t) {
			var r = ra(t.target);
			if (r !== null) {
				var a = f(r);
				if (a !== null) {
					if (((r = a.tag), r === 13)) {
						if (((r = h(a)), r !== null)) {
							((t.blockedOn = r),
								cv(t.priority, function () {
									db(a);
								}));
							return;
						}
					} else if (r === 31) {
						if (((r = m(a)), r !== null)) {
							((t.blockedOn = r),
								cv(t.priority, function () {
									db(a);
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
		function uc(t) {
			if (t.blockedOn !== null) return !1;
			for (var r = t.targetContainers; 0 < r.length;) {
				var a = Gh(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var s = new a.constructor(a.type, a);
					((jf = s), a.target.dispatchEvent(s), (jf = null));
				} else return ((r = Qa(a)), r !== null && fb(r), (t.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function vb(t, r, a) {
			uc(t) && a.delete(r);
		}
		function $x() {
			((Jh = !1),
				ki !== null && uc(ki) && (ki = null),
				qi !== null && uc(qi) && (qi = null),
				Li !== null && uc(Li) && (Li = null),
				Ks.forEach(vb),
				Gs.forEach(vb));
		}
		function lc(t, r) {
			t.blockedOn === r &&
				((t.blockedOn = null), Jh || ((Jh = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, $x)));
		}
		var cc = null;
		function yb(t) {
			cc !== t &&
				((cc = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					cc === t && (cc = null);
					for (var r = 0; r < t.length; r += 3) {
						var a = t[r],
							s = t[r + 1],
							c = t[r + 2];
						if (typeof s != "function") {
							if (Xh(s || a) === null) continue;
							break;
						}
						var d = Qa(a);
						d !== null &&
							(t.splice(r, 3), (r -= 3), Id(d, { pending: !0, data: c, method: a.method, action: s }, s, c));
					}
				}));
		}
		function jo(t) {
			function r(I) {
				return lc(I, t);
			}
			(ki !== null && lc(ki, t), qi !== null && lc(qi, t), Li !== null && lc(Li, t), Ks.forEach(r), Gs.forEach(r));
			for (var a = 0; a < Ui.length; a++) {
				var s = Ui[a];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Ui.length && ((a = Ui[0]), a.blockedOn === null);) (gb(a), a.blockedOn === null && Ui.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (s = 0; s < a.length; s += 3) {
					var c = a[s],
						d = a[s + 1],
						v = c[Cn] || null;
					if (typeof d == "function") v || yb(a);
					else if (v) {
						var C = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (v = d[Cn] || null))) C = v.formAction;
							else if (Xh(c) !== null) continue;
						} else C = v.action;
						(typeof C == "function" ? (a[s + 1] = C) : (a.splice(s, 3), (s -= 3)), yb(a));
					}
				}
		}
		function Hx() {
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
		function Wh(t) {
			this._internalRoot = t;
		}
		((em.prototype.render = Wh.prototype.render =
			function (t) {
				var r = this._internalRoot;
				if (r === null) throw Error(u(409));
				var a = r.current;
				lb(a, tr(), t, r, null, null);
			}),
			(em.prototype.unmount = Wh.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var r = t.containerInfo;
						(lb(t.current, 2, null, t, null, null), Kl(), (r[ss] = null));
					}
				}));
		function em(t) {
			this._internalRoot = t;
		}
		em.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var r = lv();
				t = { blockedOn: null, target: t, priority: r };
				for (var a = 0; a < Ui.length && r !== 0 && r < Ui[a].priority; a++);
				(Ui.splice(a, 0, t), a === 0 && gb(t));
			}
		};
		var pb = i.version;
		if (pb !== "19.3.1") throw Error(u(527, pb, "19.3.1"));
		ye.findDOMNode = function (t) {
			var r = t._reactInternals;
			if (r === void 0)
				throw typeof t.render == "function" ? Error(u(188)) : ((t = Object.keys(t).join(",")), Error(u(268, t)));
			return ((t = p(r)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Zx = {
			bundleType: 0,
			version: "19.3.1",
			rendererPackageName: "react-dom",
			currentDispatcherRef: ce,
			reconcilerVersion: "19.3.1",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var fc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!fc.isDisabled && fc.supportsFiber)
				try {
					((Oe = fc.inject(Zx)), (Ie = fc));
				} catch {}
		}
		e.createRoot = function (t, r) {
			if (!l(t)) throw Error(u(299));
			var a = !1,
				s = "",
				c = pT,
				d = bT,
				v = ST;
			return (
				r != null &&
					(r.unstable_strictMode === !0 && (a = !0),
					r.identifierPrefix !== void 0 && (s = r.identifierPrefix),
					r.onUncaughtError !== void 0 && (c = r.onUncaughtError),
					r.onCaughtError !== void 0 && (d = r.onCaughtError),
					r.onRecoverableError !== void 0 && (v = r.onRecoverableError)),
				(r = qx(t, 1, !1, null, null, a, s, null, c, d, v, Hx)),
				(t[ss] = r.current),
				Cp(t),
				new Wh(r)
			);
		};
	}),
	rR = sr((e, n) => {
		function i() {
			if (!(
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
			))
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
				} catch (o) {
					console.error(o);
				}
		}
		(i(), (n.exports = nR()));
	}),
	iR = rR(),
	ze = Kw,
	lL = $A(),
	aR = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	iE = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	aE = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	ig =
		"Only the people added here and the organization owner can read this channel. Its copies in Files have separate sharing settings. File managers can share those copies, including later updates, with other people.",
	oR = "Someone with no name yet";
function oE(e) {
	return e !== null && e !== "" ? e : oR;
}
function sR(e, n) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (i === null) return null;
	const o = i[1] ?? "";
	return { start: n - o.length - 1, query: o };
}
function uR(e, n, i) {
	const o = n.toLowerCase();
	return e
		.filter((u) => u.userId !== i)
		.map((u) => ({ ...u, label: oE(u.displayName) }))
		.filter((u) => u.label.toLowerCase().includes(o))
		.sort((u, l) => u.label.localeCompare(l.label));
}
function lR(e, n, i, o) {
	return { text: `${e.slice(0, n)}@${o} ${e.slice(i)}`, caret: n + o.length + 2 };
}
function cR(e, n) {
	const i = [];
	for (const [o, u] of e) n.includes(`@${u}`) && i.push(o);
	return i;
}
function nf(e, n) {
	const i = n - e;
	return i < 6e4
		? "just now"
		: i < 36e5
			? `${Math.floor(i / 6e4)}m ago`
			: i < 864e5
				? `${Math.floor(i / 36e5)}h ago`
				: i < 6048e5
					? new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
					: new Date(e).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
}
function rf(e) {
	return e instanceof Error ? e.message : String(e);
}
var fR = sr((e) => {
		var n = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.fragment");
		function o(u, l, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), l.key !== void 0 && (h = "" + l.key), "key" in l)) {
				f = {};
				for (var m in l) m !== "key" && (f[m] = l[m]);
			} else f = l;
			return ((l = f.ref), { $$typeof: n, type: u, key: h, ref: l !== void 0 ? l : null, props: f });
		}
		((e.Fragment = i), (e.jsx = o), (e.jsxs = o));
	}),
	dR = sr((e, n) => {
		n.exports = fR();
	}),
	S = dR();
function zr(e) {
	const [n, i] = (0, _.useState)({ key: e, cursor: null, previous: [], number: 1 });
	return (
		n.key !== e && i({ key: e, cursor: null, previous: [], number: 1 }),
		{
			cursor: n.key === e ? n.cursor : null,
			number: n.number,
			canGoBack: n.previous.length > 0,
			next: (o) =>
				i((u) => ({ key: e, cursor: o, previous: [...u.previous, u.cursor].slice(-20), number: u.number + 1 })),
			back: () =>
				i((o) =>
					o.previous.length === 0
						? o
						: {
								...o,
								cursor: o.previous[o.previous.length - 1],
								previous: o.previous.slice(0, -1),
								number: o.number - 1,
							},
				),
			first: () => i({ key: e, cursor: null, previous: [], number: 1 }),
		}
	);
}
function si(e) {
	return e.page.number === 1 && e.result?.isDone
		? null
		: (0, S.jsxs)("div", {
				className: "page-controls",
				"aria-label": `${e.label} pages`,
				children: [
					e.page.number > 1
						? (0, S.jsx)("button", { type: "button", className: "button", onClick: e.page.first, children: "First" })
						: null,
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						disabled: !e.page.canGoBack,
						onClick: e.page.back,
						children: "Previous",
					}),
					(0, S.jsxs)("span", { children: ["Page ", e.page.number] }),
					(0, S.jsx)("button", {
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
function pt(e, n, ...i) {
	const o = Po(n, ...(e.ready || e.refreshing ? i : ["skip"])),
		u = JSON.stringify([
			yn(n),
			i,
			e.member?.hostUserId,
			e.member?.installationId,
			e.member?.generation,
			e.member?.membershipLifetime,
		]),
		[l, f] = (0, _.useState)({ key: u, value: e.refreshing ? void 0 : o }),
		h = e.refreshing ? (i[0] !== "skip" && l.key === u ? l.value : void 0) : o;
	return ((l.key !== u || l.value !== h) && f({ key: u, value: h }), h);
}
var hu = rE(),
	Dm =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Lb(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(Dm) ? n : (e.querySelector(Dm) ?? e);
}
function Wo(e) {
	const n = (0, _.useRef)(null);
	((0, _.useEffect)(() => {
		const o = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			u = n.current;
		return (
			(u === null ? null : Lb(u))?.focus(),
			() => {
				queueMicrotask(() => {
					if (
						o?.isConnected &&
						o !== document.body &&
						!o.closest("[inert]") &&
						(o.focus(), document.activeElement === o)
					)
						return;
					const l = document.querySelector(".thread");
					(l?.querySelector(".thread-head button:not([disabled])") ?? l)?.focus();
				});
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const o = n.current;
			if (!o) return;
			const u = () => {
					!o.isConnected || document.activeElement !== document.body || Lb(o).focus();
				},
				l = (f) => {
					f.relatedTarget === null && queueMicrotask(u);
				};
			return (o.addEventListener("focusout", l), () => o.removeEventListener("focusout", l));
		}, []));
	const i = (o) => {
		if (o.key === "Escape") {
			(o.stopPropagation(), e.onClose());
			return;
		}
		if (o.key !== "Tab") return;
		const u = n.current;
		if (!u) return;
		const l = [...u.querySelectorAll(Dm)];
		if (l.length === 0) {
			(o.preventDefault(), u.focus());
			return;
		}
		const f = l[0],
			h = l[l.length - 1];
		document.activeElement === u
			? (o.preventDefault(), (o.shiftKey ? h : f).focus())
			: o.shiftKey && document.activeElement === f
				? (o.preventDefault(), h.focus())
				: !o.shiftKey && document.activeElement === h && (o.preventDefault(), f.focus());
	};
	return (0, hu.createPortal)(
		(0, S.jsx)("div", {
			className: "dialog-overlay",
			children: (0, S.jsx)("div", {
				ref: n,
				className: "dialog",
				role: "dialog",
				tabIndex: -1,
				"aria-modal": "true",
				"aria-labelledby": e.accessUnavailable ? void 0 : e.labelledBy,
				"aria-label": e.accessUnavailable ? "Channel access is unavailable" : void 0,
				onKeyDown: i,
				children: e.accessUnavailable
					? (0, S.jsxs)(S.Fragment, {
							children: [
								(0, S.jsx)("h2", { className: "dialog-title", children: "Channel access is unavailable" }),
								(0, S.jsx)("p", { children: "Your changes are kept. Reconnect to continue." }),
								(0, S.jsxs)("div", {
									className: "dialog-actions",
									children: [
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											onClick: e.onClose,
											children: "Close",
										}),
										(0, S.jsx)("button", {
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
function zm(e) {
	const n = Object.values(e).filter((i) => typeof i == "number");
	return Object.entries(e)
		.filter(([i, o]) => n.indexOf(+i) === -1)
		.map(([i, o]) => o);
}
function Ub(e, n = "|") {
	return e.map((i) => dE(i)).join(n);
}
function Im(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
var hR = class {
	constructor(e) {
		((this._getter = e), (this._value = void 0));
	}
	get value() {
		const e = this._getter;
		return (e !== void 0 && ((this._value = e()), (this._getter = void 0)), this._value);
	}
};
function ag(e) {
	return new hR(e);
}
function mR(e) {
	return e == null;
}
function og(e) {
	const n = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, i);
}
function gR(e, n) {
	const i = e / n,
		o = Math.round(i),
		u = 4 * Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - o) < u ? 0 : i - o;
}
function Pa(e, n, i) {
	Object.defineProperty(e, n, { value: i, writable: !0, enumerable: !0, configurable: !0 });
}
function sE(e) {
	const n = Object.getOwnPropertyDescriptor(e, "shape");
	return n?.get ? n.get.raw : n?.value;
}
function fi(e) {
	return sE(e._zod.def) ?? e._zod.def.shape;
}
function uE(e, n, i) {
	Object.defineProperty(e, n, {
		get() {
			const o = i();
			return (Pa(this, n, o), o);
		},
		enumerable: !0,
		configurable: !0,
	});
}
function lE(e, n, i) {
	n in e ? Pa(e, n, i) : (e[n] = i);
}
function ja(e, n, i, o) {
	const u = fi(n);
	for (const l of i) {
		const f = Object.getOwnPropertyDescriptor(u, l);
		f.enumerable &&
			(f.get
				? uE(e, l, () => {
						const h = n._zod.def.shape[l];
						return o ? o(h, l) : h;
					})
				: lE(e, l, o ? o(f.value, l) : f.value));
	}
}
function vR(e, n) {
	for (const i of Reflect.ownKeys(n)) {
		const o = Object.getOwnPropertyDescriptor(n, i);
		o.enumerable && (o.get ? uE(e, i, () => n[i]) : lE(e, i, o.value));
	}
}
function Hn(...e) {
	const n = {};
	for (const i of e) {
		const o = Object.getOwnPropertyDescriptors(i);
		Object.assign(n, o);
	}
	return Object.defineProperties({}, n);
}
function yR(e) {
	return JSON.stringify(e);
}
function pR(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var cE = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Ic(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var bR = ag(() => {
	if (kr.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function mu(e) {
	if (Ic(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const i = n.prototype;
	return !(Ic(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function fE(e) {
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
var SR = new Set(["string", "number", "symbol"]);
function Fo(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Gi(e, n, i) {
	const o = new e._zod.constr(n ?? e._zod.def);
	return ((!n || i?.parent) && (o._zod.parent = e), o);
}
function De(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function dE(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function wR(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin !== void 0 && e[n]._zod.optout === "optional");
}
var hE = {
		safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
	},
	ER = {
		int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
		uint64: [BigInt(0), BigInt("18446744073709551615")],
	};
function _R(e, n) {
	const i = e._zod.def,
		o = i.checks;
	if (o && o.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	const u = {};
	return (ja(u, e, af(e, n)), Gi(e, Hn(i, { shape: u, checks: [] })));
}
function af(e, n) {
	const i = fi(e),
		o = [];
	for (const u of Reflect.ownKeys(n)) {
		if (!Object.getOwnPropertyDescriptor(i, u)?.enumerable) throw new Error(`Unrecognized key: "${String(u)}"`);
		n[u] && o.push(u);
	}
	return o;
}
function CR(e, n) {
	const i = e._zod.def,
		o = i.checks;
	if (o && o.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	const u = new Set(af(e, n)),
		l = {};
	return (
		ja(
			l,
			e,
			Reflect.ownKeys(fi(e)).filter((f) => !u.has(f)),
		),
		Gi(e, Hn(i, { shape: l, checks: [] }))
	);
}
function TR(e, n) {
	if (!mu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const o = fi(e);
		for (const u of Reflect.ownKeys(n))
			if (Object.getOwnPropertyDescriptor(o, u) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Gi(e, Hn(e._zod.def, { shape: mE(e, n) }));
}
function mE(e, n) {
	const i = {};
	return (ja(i, e, Reflect.ownKeys(fi(e))), vR(i, n), i);
}
function xR(e, n) {
	if (!mu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return Gi(e, Hn(e._zod.def, { shape: mE(e, n) }));
}
function OR(e, n) {
	if (!n?._zod?.def)
		throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	const i = {};
	return (
		ja(i, e, Reflect.ownKeys(fi(e))),
		ja(i, n, Reflect.ownKeys(fi(n))),
		Gi(
			e,
			Hn(e._zod.def, {
				shape: i,
				get catchall() {
					return n._zod.def.catchall;
				},
				checks: n._zod.def.checks ?? [],
			}),
		)
	);
}
function Vb(e, n, i, o = "partial") {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(`.${o}() cannot be used on object schemas containing refinements`);
	const l = i ? new Set(af(n, i)) : void 0,
		f = {};
	return (
		ja(f, n, Reflect.ownKeys(fi(n)), e && ((h, m) => (l && !l.has(m) ? h : new e({ type: "optional", innerType: h })))),
		Gi(n, Hn(n._zod.def, { shape: f, checks: [] }))
	);
}
function AR(e, n, i) {
	const o = i ? new Set(af(n, i)) : void 0,
		u = {};
	return (
		ja(u, n, Reflect.ownKeys(fi(n)), (l, f) => (o && !o.has(f) ? l : new e({ type: "nonoptional", innerType: l }))),
		Gi(n, Hn(n._zod.def, { shape: u }))
	);
}
function ui(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function RR(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue === !1) return !0;
	return !1;
}
function gE(e, n) {
	return n.map((i) => {
		var o;
		return ((o = i).path ?? (o.path = []), i.path.unshift(e), i);
	});
}
function Js(e) {
	return typeof e == "string" ? e : e?.message;
}
function Bb(e) {
	const n = [];
	for (const i of e ?? []) {
		const o = i._zod.def;
		if (!/_(length|size)$|_equals$/.test(o.check)) break;
		const u = o.maximum ?? o.length ?? o.size;
		u >= 0 && n.push([u, i]);
	}
	return n;
}
function jm(e, n, i) {
	var o;
	for (let u = n; u < e.length; u++) (o = e[u]).schema ?? (o.schema = i);
}
function es(e, n, i) {
	var o;
	const u = e.inst?._zod?.traits;
	u?.has("$ZodType") && (u.has("$ZodCheck") ? ((o = e).schema ?? (o.schema = e.inst)) : (e.schema = e.inst));
	const l = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0,
		f = e.message
			? e.message
			: (Js(e.inst?._zod.def?.error?.(e)) ??
				Js(l?.(e)) ??
				Js(n?.error?.(e)) ??
				Js(i.customError?.(e)) ??
				Js(i.localeError?.(e)) ??
				"Invalid input"),
		h = {};
	for (const m of Object.keys(e))
		m === "inst" || m === "schema" || m === "continue" || m === "input" || m === "__proto__" || (h[m] = e[m]);
	return (h.path ?? (h.path = []), (h.message = f), n?.reportInput && (h.input = e.input), h);
}
var NR = /[\uD800-\uDBFF]/;
function sg(e) {
	const n = e.length;
	if (!NR.test(e)) return n;
	let i = n;
	for (let o = 0; o < n - 1; o++)
		(e.charCodeAt(o) & 64512) === 55296 && (e.charCodeAt(o + 1) & 64512) === 56320 && (i--, o++);
	return i;
}
function ug(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function MR(e) {
	const n = typeof e;
	switch (n) {
		case "number":
			return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			const i = e;
			if (i && Object.getPrototypeOf(i) !== Object.prototype && "constructor" in i && i.constructor)
				return i.constructor.name;
		}
	}
	return n;
}
function gu(...e) {
	const [n, i, o] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: i, inst: o } : { ...n };
}
function DR(e, n) {
	for (const i in n) {
		const o = Object.getOwnPropertyDescriptor(n, i);
		o.get ? Object.defineProperty(e, i, { ...o, enumerable: !1 }) : zR(e, i, o.value);
	}
}
function Zi(e, n, i, o = !0) {
	return (Object.defineProperty(e, n, { configurable: !0, writable: !0, enumerable: o, value: i }), i);
}
function vE(e, n, i) {
	return Zi(e, n, i, !1);
}
function yE(e, n) {
	for (const i in e) {
		const o = e[i];
		Object.defineProperty(n, i, {
			configurable: !0,
			enumerable: !0,
			get() {
				return Zi(this, i, o(this));
			},
			set(u) {
				Zi(this, i, u);
			},
		});
	}
	return n;
}
function zR(e, n, i) {
	Object.defineProperty(e, n, {
		configurable: !0,
		get() {
			return this == null ? i : Zi(this, n, i.bind(this));
		},
		set(o) {
			Zi(this, n, o);
		},
	});
}
function IR(e, n) {
	const i = Object.getPrototypeOf(e);
	return n in i ? void 0 : i;
}
var lm,
	Pi = !1,
	jR = {
		configurable: !0,
		get() {
			Pi = !0;
		},
	};
function it(e, n, i) {
	const o = Object.getPrototypeOf(e._zod);
	if (n in o && lm !== e._zod) {
		lm = void 0;
		return;
	}
	((lm = e._zod),
		Object.defineProperty(o, n, {
			configurable: !0,
			get() {
				Object.defineProperty(this, n, jR);
				const u = Pi;
				Pi = !1;
				try {
					const l = i(this);
					return (
						Pi ? delete this[n] : Object.defineProperty(this, n, { configurable: !0, writable: !0, value: l }),
						(Pi = Pi || u),
						l
					);
				} catch (l) {
					throw (delete this[n], (Pi = Pi || u), l);
				}
			},
			set(u) {
				Object.defineProperty(this, n, { configurable: !0, writable: !0, value: u });
			},
		}));
}
function kR(e, n, i, o) {
	const u = IR(e, n);
	u &&
		Object.defineProperty(u, n, {
			configurable: !0,
			get() {
				const l = { configurable: !0, writable: !0, enumerable: o, value: void 0 };
				return (Object.defineProperty(this, n, l), (l.value = i(this)), Object.defineProperty(this, n, l), l.value);
			},
			set(l) {
				Object.defineProperty(this, n, { configurable: !0, writable: !0, enumerable: o, value: l });
			},
		});
}
var qR = "~constantCatch";
function LR(e) {
	const n = () => e;
	return ((n[qR] = !0), n);
}
var Pb,
	cm = { value: void 0, enumerable: !1 },
	$b = "captureStackTrace" in Error ? Error : null;
function UR(e) {
	const n = $b;
	if (n) {
		const i = n.stackTraceLimit;
		if (typeof i == "number") {
			try {
				n.stackTraceLimit = 0;
			} catch {
				return (($b = null), new e());
			}
			try {
				return new e();
			} finally {
				n.stackTraceLimit = i;
			}
		}
	}
	return new e();
}
function se(e, n, i, o) {
	const u = {};
	function l(y) {
		((this.def = y), (this.constr = b), (this.traits = new Set()));
	}
	l.prototype = u;
	const f = i,
		h = f && new WeakSet();
	function m(y, w) {
		if (y._zod) {
			if (y._zod.traits.has(e)) return;
		} else {
			cm.value = new l(w);
			try {
				Object.defineProperty(y, "_zod", cm);
			} finally {
				cm.value = void 0;
			}
		}
		if ((y._zod.traits.add(e), n(y, w), h)) {
			const T = Object.getPrototypeOf(y),
				x = y._zod.constr.prototype;
			let z = T;
			for (; z && z !== x;) z = Object.getPrototypeOf(z);
			const M = z ?? T;
			h.has(M) || (h.add(M), DR(M, f));
		}
		const E = b.prototype;
		for (const T in E) Object.prototype.hasOwnProperty.call(E, T) && (T in y || (y[T] = E[T].bind(y)));
	}
	const g = o?.Parent ?? Object;
	class p extends g {}
	Object.defineProperty(p, "name", { value: e });
	function b(y) {
		const w = o?.Parent ? UR(p) : this;
		m(w, y);
		const E = w._zod.deferred;
		if (E) {
			for (const x of E) x();
			w._zod.deferred = void 0;
		}
		const T = globalThis.__zod_globalConfig?.postProcessor;
		return (T && T(w), w);
	}
	return (
		Object.defineProperty(b, "init", { value: m }),
		Object.defineProperty(b, Symbol.hasInstance, {
			value: (y) => (o?.Parent && y instanceof o.Parent ? !0 : y?._zod?.traits?.has(e)),
		}),
		Object.defineProperty(b, "name", { value: e }),
		b
	);
}
var Da = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	pE = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Pb = globalThis).__zod_globalConfig ?? (Pb.__zod_globalConfig = {});
var kr = globalThis.__zod_globalConfig;
function Xi(e) {
	return (e && Object.assign(kr, e), kr);
}
function VR() {
	const e = this._zod;
	return (e.message ?? (e.message = JSON.stringify(e.def, Im, 2)), e.message);
}
function BR(e) {
	this._zod.message = e;
}
var PR = { get: VR, set: BR, enumerable: !0, configurable: !0 },
	fm = { value: void 0, enumerable: !1 },
	Hb = new WeakSet([Object.prototype, Error.prototype]),
	$R = (e, n) => {
		((e.name = "$ZodError"),
			(fm.value = n),
			Object.defineProperty(e, "issues", fm),
			(fm.value = void 0),
			Object.defineProperty(e, "message", PR));
		const i = Object.getPrototypeOf(e);
		Hb.has(i) ||
			(Hb.add(i),
			Object.defineProperty(i, "toString", {
				configurable: !0,
				enumerable: !1,
				get() {
					const o = () => this.message;
					return (Object.defineProperty(this, "toString", { value: o, configurable: !0, writable: !0 }), o);
				},
				set(o) {
					Object.defineProperty(this, "toString", { value: o, configurable: !0, writable: !0 });
				},
			}));
	},
	HR = se("$ZodError", $R);
function ZR(e, n, i) {
	return (
		Object.prototype.hasOwnProperty.call(e, n) ||
			(n === "__proto__"
				? Object.defineProperty(e, n, { value: i(), writable: !0, enumerable: !0, configurable: !0 })
				: (e[n] = i())),
		e[n]
	);
}
function FR(e, n = (i) => i.message) {
	const i = {},
		o = [];
	for (const u of e.issues) u.path.length > 0 ? ZR(i, u.path[0], () => []).push(n(u)) : o.push(n(u));
	return { formErrors: o, fieldErrors: i };
}
function QR(e, n = (i) => i.message) {
	const i = { _errors: [] },
		o = (u, l = []) => {
			for (const f of u.issues)
				if (f.code === "invalid_union" && f.errors.length) f.errors.map((h) => o({ issues: h }, [...l, ...f.path]));
				else if (f.code === "invalid_key") o({ issues: f.issues }, [...l, ...f.path]);
				else if (f.code === "invalid_element") o({ issues: f.issues }, [...l, ...f.path]);
				else {
					const h = [...l, ...f.path];
					if (h.length === 0) i._errors.push(n(f));
					else {
						let m = i,
							g = 0;
						for (; g < h.length;) {
							const p = h[g],
								b = g === h.length - 1;
							if (p === "_errors") {
								(b && m._errors.push(n(f)), g++);
								continue;
							}
							Object.prototype.hasOwnProperty.call(m, p) ||
								Object.defineProperty(m, p, { value: { _errors: [] }, enumerable: !0, writable: !0, configurable: !0 });
							const y = m[p];
							(b && y._errors.push(n(f)), (m = y), g++);
						}
					}
				}
		};
	return (o(e), i);
}
function of(e, n) {
	return { callee: n?.callee ?? e, Err: n?.Err };
}
var lg = (e) => {
		const n = (i, o, u, l) => {
			const f = u ? { ...u, async: !1 } : { async: !1 },
				h = i._zod.run({ value: o, issues: [] }, f);
			if (h instanceof Promise) throw new Da();
			if (h.issues.length) {
				const m = new (l?.Err ?? e)(h.issues.map((g) => es(g, f, Xi())));
				throw (cE(m, l?.callee ?? n), m);
			}
			return h.value;
		};
		return n;
	},
	cg = (e) => {
		const n = async (i, o, u, l) => {
			const f = u ? { ...u, async: !0 } : { async: !0 };
			let h = i._zod.run({ value: o, issues: [] }, f);
			if ((h instanceof Promise && (h = await h), h.issues.length)) {
				const m = new (l?.Err ?? e)(h.issues.map((g) => es(g, f, Xi())));
				throw (cE(m, l?.callee ?? n), m);
			}
			return h.value;
		};
		return n;
	},
	fg = (e) => (n, i, o) => {
		const u = o ? { ...o, async: !1 } : { async: !1 },
			l = n._zod.run({ value: i, issues: [] }, u);
		if (l instanceof Promise) throw new Da();
		return l.issues.length ? bE(e, l.issues, u) : { success: !0, data: l.value };
	};
function bE(e, n, i) {
	let o;
	return {
		success: !1,
		get error() {
			return (o || ((o = new e(n.map((u) => es(u, i, Xi())))), (n = void 0), (i = void 0)), o);
		},
		set error(u) {
			((o = u), (n = void 0), (i = void 0));
		},
	};
}
var dg = (e) => async (n, i, o) => {
		const u = o ? { ...o, async: !0 } : { async: !0 };
		let l = n._zod.run({ value: i, issues: [] }, u);
		return (
			l instanceof Promise && (l = await l),
			l.issues.length ? bE(e, l.issues, u) : { success: !0, data: l.value }
		);
	},
	YR = Symbol.for("zod.compile.invalid"),
	KR = Symbol.for("zod.compile.fallback"),
	GR = (e, n, i) => {
		const o = e._zod.bag.validator;
		if (o !== void 0) {
			if (o(n) !== YR) return !0;
			if (o.definite === !0 && i === void 0) return !1;
		}
		return XR(e, n, i);
	};
function XR(e, n, i) {
	const o = i ? { ...i, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 },
		u = e._zod.bag.fallbackRun;
	let l;
	if (
		(u ? ((o[KR] = !0), (l = u({ value: n, issues: [] }, o))) : (l = e._zod.run({ value: n, issues: [] }, o)),
		l instanceof Promise)
	)
		throw new Da();
	return l.issues.length === 0;
}
var JR = async (e, n, i) => {
		const o = i ? { ...i, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 };
		let u = e._zod.run({ value: n, issues: [] }, o);
		return (u instanceof Promise && (u = await u), u.issues.length === 0);
	},
	WR = (e) => {
		const n = lg(e),
			i = (o, u, l, f) => {
				const h = l ? { ...l, direction: "backward" } : { direction: "backward" };
				return n(o, u, h, of(i, f));
			};
		return i;
	},
	eN = (e) => {
		const n = lg(e),
			i = (o, u, l, f) => n(o, u, l, of(i, f));
		return i;
	},
	tN = (e) => {
		const n = cg(e),
			i = async (o, u, l, f) => {
				const h = l ? { ...l, direction: "backward" } : { direction: "backward" };
				return await n(o, u, h, of(i, f));
			};
		return i;
	},
	nN = (e) => {
		const n = cg(e),
			i = async (o, u, l, f) => await n(o, u, l, of(i, f));
		return i;
	},
	rN = (e) => (n, i, o) => {
		const u = o ? { ...o, direction: "backward" } : { direction: "backward" };
		return fg(e)(n, i, u);
	},
	iN = (e) => (n, i, o) => fg(e)(n, i, o),
	aN = (e) => async (n, i, o) => {
		const u = o ? { ...o, direction: "backward" } : { direction: "backward" };
		return dg(e)(n, i, u);
	},
	oN = (e) => async (n, i, o) => dg(e)(n, i, o),
	sN = /^[cC][0-9a-z]{6,}$/,
	uN = /^[0-9a-z]+$/,
	lN = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,
	cN = /^[0-9a-vA-V]{20}$/,
	fN = /^[A-Za-z0-9]{27}$/,
	dN = /^[a-zA-Z0-9_-]{21}$/;
function hN(e) {
	return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var mN = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	gN = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Zb = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	vN = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	yN =
		"^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function pN() {
	return new RegExp(yN, "u");
}
var bN =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	SN =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	wN =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	EN =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	_N = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	CN = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/,
	TN = /^https?$/,
	xN = /^\+[1-9]\d{6,14}$/,
	SE =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function ON(e) {
	return new RegExp(`^${e}$`);
}
var AN = ON(SE);
function km(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: e.seconds
			? `${n}:[0-5]\\d(?:\\.\\d+)?`
			: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function RN(e) {
	return new RegExp(`^${km(e)}$`);
}
function NN(e) {
	const n = ["Z"];
	e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	const i = `${km({ precision: e.precision, seconds: !0 })}(?:${n.join("|")})`,
		o = e.local ? `${i}|${km({ precision: e.precision })}` : i;
	return new RegExp(`^${SE}T(?:${o})$`);
}
var MN = /^[\s\S]{0,}$/,
	DN = /^-?\d+(?:\.\d+)?$/,
	zN = /^[^A-Z]*$/,
	IN = /^[^a-z]*$/,
	jn = se("$ZodCheck", (e, n) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	hg = (e) => {
		const n = e.value;
		return !mR(n) && n.length !== void 0;
	},
	jc = { number: "number", bigint: "bigint", object: "date" },
	wE = se("$ZodCheckLessThan", (e, n) => {
		jn.init(e, n);
		const i = jc[typeof n.value];
		e._zod.check = (o) => {
			(n.inclusive ? o.value <= n.value : o.value < n.value) ||
				o.issues.push({
					origin: jc[typeof o.value] ?? i,
					code: "too_big",
					maximum: typeof n.value == "object" ? n.value.getTime() : n.value,
					input: o.value,
					inclusive: n.inclusive,
					inst: e,
					continue: !n.abort,
				});
		};
	}),
	EE = se("$ZodCheckGreaterThan", (e, n) => {
		jn.init(e, n);
		const i = jc[typeof n.value];
		e._zod.check = (o) => {
			(n.inclusive ? o.value >= n.value : o.value > n.value) ||
				o.issues.push({
					origin: jc[typeof o.value] ?? i,
					code: "too_small",
					minimum: typeof n.value == "object" ? n.value.getTime() : n.value,
					input: o.value,
					inclusive: n.inclusive,
					inst: e,
					continue: !n.abort,
				});
		};
	}),
	jN = se("$ZodCheckMultipleOf", (e, n) => {
		(jn.init(e, n),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint"
					? n.value !== BigInt(0) && i.value % n.value === BigInt(0)
					: gR(i.value, n.value) === 0) ||
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
	kN = se("$ZodCheckNumberFormat", (e, n) => {
		(jn.init(e, n), (n.format = n.format || "float64"));
		const i = n.format?.includes("int"),
			o = i ? "int" : "number",
			[u, l] = hE[n.format];
		e._zod.check = (f) => {
			const h = f.value;
			if (i) {
				if (!Number.isInteger(h)) {
					f.issues.push({ expected: o, format: n.format, code: "invalid_type", continue: !1, input: h, inst: e });
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
								origin: o,
								inclusive: !0,
								continue: !n.abort,
							})
						: f.issues.push({
								input: h,
								code: "too_small",
								minimum: Number.MIN_SAFE_INTEGER,
								note: "Integers must be within the safe integer range.",
								inst: e,
								origin: o,
								inclusive: !0,
								continue: !n.abort,
							});
					return;
				}
			}
			(h < u &&
				f.issues.push({
					origin: "number",
					input: h,
					code: "too_small",
					minimum: u,
					inclusive: !0,
					inst: e,
					continue: !n.abort,
				}),
				h > l &&
					f.issues.push({
						origin: "number",
						input: h,
						code: "too_big",
						maximum: l,
						inclusive: !0,
						inst: e,
						continue: !n.abort,
					}));
		};
	}),
	qN = se("$ZodCheckMaxLength", (e, n) => {
		var i;
		(jn.init(e, n),
			(i = e._zod.def).when ?? (i.when = hg),
			(e._zod.check = (o) => {
				const u = o.value,
					l = u.length;
				if ((typeof u == "string" && l > n.maximum ? sg(u) : l) <= n.maximum) return;
				const f = ug(u);
				o.issues.push({
					origin: f,
					code: "too_big",
					maximum: n.maximum,
					inclusive: !0,
					input: u,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	LN = se("$ZodCheckMinLength", (e, n) => {
		var i;
		(jn.init(e, n),
			(i = e._zod.def).when ?? (i.when = hg),
			(e._zod.check = (o) => {
				const u = o.value,
					l = u.length;
				if ((typeof u == "string" && l >= n.minimum && l < n.minimum * 2 ? sg(u) : l) >= n.minimum) return;
				const f = ug(u);
				o.issues.push({
					origin: f,
					code: "too_small",
					minimum: n.minimum,
					inclusive: !0,
					input: u,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	UN = se("$ZodCheckLengthEquals", (e, n) => {
		var i;
		(jn.init(e, n),
			(i = e._zod.def).when ?? (i.when = hg),
			(e._zod.check = (o) => {
				const u = o.value,
					l = u.length,
					f = typeof u == "string" && l >= n.length && l <= n.length * 2 ? sg(u) : l;
				if (f === n.length) return;
				const h = ug(u),
					m = f > n.length;
				o.issues.push({
					origin: h,
					...(m ? { code: "too_big", maximum: n.length } : { code: "too_small", minimum: n.length }),
					inclusive: !0,
					exact: !0,
					input: o.value,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	sf = se("$ZodCheckStringFormat", (e, n) => {
		var i, o;
		(jn.init(e, n),
			n.pattern
				? ((i = e._zod).check ??
					(i.check = (u) => {
						((n.pattern.lastIndex = 0),
							!n.pattern.test(u.value) &&
								u.issues.push({
									origin: "string",
									code: "invalid_format",
									format: n.format,
									input: u.value,
									...(n.pattern ? { pattern: n.pattern.toString() } : {}),
									inst: e,
									continue: !n.abort,
								}));
					}))
				: ((o = e._zod).check ?? (o.check = () => {})));
	}),
	VN = se("$ZodCheckRegex", (e, n) => {
		(sf.init(e, n),
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
	BN = se("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = zN), sf.init(e, n));
	}),
	PN = se("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = IN), sf.init(e, n));
	}),
	$N = se("$ZodCheckIncludes", (e, n) => {
		jn.init(e, n);
		const i = Fo(n.includes);
		((n.pattern = new RegExp(typeof n.position == "number" ? `^.{${n.position},}${i}` : i)),
			(e._zod.check = (o) => {
				o.value.includes(n.includes, n.position) ||
					o.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "includes",
						includes: n.includes,
						input: o.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	HN = se("$ZodCheckStartsWith", (e, n) => {
		jn.init(e, n);
		const i = new RegExp(`^${Fo(n.prefix)}.*`);
		(n.pattern ?? (n.pattern = i),
			(e._zod.check = (o) => {
				o.value.startsWith(n.prefix) ||
					o.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "starts_with",
						prefix: n.prefix,
						input: o.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	ZN = se("$ZodCheckEndsWith", (e, n) => {
		jn.init(e, n);
		const i = new RegExp(`.*${Fo(n.suffix)}$`);
		(n.pattern ?? (n.pattern = i),
			(e._zod.check = (o) => {
				o.value.endsWith(n.suffix) ||
					o.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "ends_with",
						suffix: n.suffix,
						input: o.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	FN = se("$ZodCheckOverwrite", (e, n) => {
		(jn.init(e, n),
			(e._zod.check = (i) => {
				i.value = n.tx(i.value);
			}));
	}),
	QN = class {
		constructor(e = [], n = {}) {
			((this.content = []), (this.indent = 0), (this.args = e), (this.closed = n));
		}
		indented(e) {
			this.indent += 1;
			try {
				e(this);
			} finally {
				this.indent -= 1;
			}
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
					.filter((u) => u),
				i = Math.min(...n.map((u) => u.length - u.trimStart().length)),
				o = n.map((u) => u.slice(i)).map((u) => " ".repeat(this.indent * 2) + u);
			for (const u of o) this.content.push(u);
		}
		compile() {
			const e = Function,
				n = this?.content ?? [""];
			return new e(
				...Object.keys(this.closed),
				`return function (${this.args.join(", ")}) {
${n.join(`
`)}
};`,
			)(...Object.values(this.closed));
		}
	},
	YN = { major: 4, minor: 6, patch: 7 },
	It = se(
		"$ZodType",
		(e, n) => {
			var i;
			(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = YN));
			const o = e._zod.def.checks,
				u = e._zod.traits.has("$ZodCheck") ? [e, ...(o ?? [])] : o?.length ? [...o] : [];
			for (const l of u) for (const f of l._zod.onattach) f(e);
			if (u.length === 0)
				((i = e._zod).deferred ?? (i.deferred = []),
					e._zod.deferred?.push(() => {
						e._zod.run = e._zod.parse;
					}));
			else {
				const l = (h, m, g) => {
						if (h.memo) return h;
						let p = ui(h),
							b;
						for (const y of m) {
							if (y._zod.def.when) {
								if (RR(h) || !y._zod.def.when(h)) continue;
							} else if (p) continue;
							const w = h.issues.length,
								E = y._zod.check(h);
							if (E instanceof Promise && g?.async === !1) throw new Da();
							if (b || E instanceof Promise)
								b = (b ?? Promise.resolve()).then(async () => {
									(await E, h.issues.length !== w && (jm(h.issues, w, e), p || (p = ui(h, w))));
								});
							else {
								if (h.issues.length === w) continue;
								(jm(h.issues, w, e), p || (p = ui(h, w)));
							}
						}
						return b ? b.then(() => h) : h;
					},
					f = (h, m, g) => {
						if (ui(h)) return ((h.aborted = !0), h);
						const p = l(m, u, g);
						if (p instanceof Promise) {
							if (g.async === !1) throw new Da();
							return p.then((b) => e._zod.parse(b, g));
						}
						return e._zod.parse(p, g);
					};
				e._zod.run = (h, m) => {
					if (m.skipChecks) return e._zod.parse(h, m);
					if (m.direction === "backward") {
						const p = e._zod.parse({ value: h.value, issues: [] }, { ...m, skipChecks: !0 });
						return p instanceof Promise ? p.then((b) => f(b, h, m)) : f(p, h, m);
					}
					const g = e._zod.parse(h, m);
					if (g instanceof Promise) {
						if (m.async === !1) throw new Da();
						return g.then((p) => l(p, u, m));
					}
					return l(g, u, m);
				};
			}
		},
		{
			get "~standard"() {
				return vE(this, "~standard", CE(this));
			},
			set "~standard"(e) {
				Zi(this, "~standard", e);
			},
		},
	),
	_E = (e, n) => (e.issues.length ? { issues: e.issues.map((i) => es(i, n, Xi())) } : { value: e.value });
async function KN(e, n) {
	const i = { async: !0 };
	return _E(await e._zod.run({ value: n, issues: [] }, i), i);
}
function CE(e) {
	return {
		validate: (n) => {
			const i = { async: !1 };
			try {
				const o = e._zod.run({ value: n, issues: [] }, i);
				if (!(o instanceof Promise)) return _E(o, i);
			} catch {}
			return KN(e, n);
		},
		vendor: "zod",
		version: 1,
	};
}
var mg = se("$ZodString", (e, n) => {
		(It.init(e, n),
			(e._zod.pattern = n.pattern ?? MN),
			(e._zod.parse = (i, o) => {
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
	Et = se("$ZodStringFormat", (e, n) => {
		(sf.init(e, n), mg.init(e, n));
	}),
	GN = se("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = gN), Et.init(e, n));
	}),
	XN = se("$ZodUUID", (e, n) => {
		if (n.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = Zb(i));
		} else n.pattern ?? (n.pattern = Zb());
		Et.init(e, n);
	}),
	JN = se("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = vN), Et.init(e, n));
	});
function TE(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function WN(e, n) {
	return !("normalize" in n) && !("hostname" in n) && !("protocol" in n) ? TE(e) || 2 : eM(e, n);
}
function eM(e, n) {
	if (!n.normalize && n.protocol?.source === TN.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		if (typeof URL < "u") {
			const i = URL;
			if (typeof i.parse == "function") return i.parse(e) ?? 2;
		}
		return new URL(e);
	} catch {
		return 2;
	}
}
var tM = /[\t\n\r]/g;
function Fb(e) {
	return e.replace(tM, "");
}
function nM(e, n) {
	return ((n.lastIndex = 0), n.test(e.hostname));
}
function rM(e, n) {
	return ((n.lastIndex = 0), n.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol));
}
var iM = se("$ZodURL", (e, n) => {
		(Et.init(e, n),
			(e._zod.check = (i) => {
				try {
					const o = i.value.trim(),
						u = WN(o, n);
					if (u === 1) {
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
					if (u === 2) {
						i.issues.push({ code: "invalid_format", format: "url", input: i.value, inst: e, continue: !n.abort });
						return;
					}
					if (u === !0) {
						i.value = Fb(o);
						return;
					}
					(n.hostname &&
						!nM(u, n.hostname) &&
						i.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: n.hostname.source,
							input: i.value,
							inst: e,
							continue: !n.abort,
						}),
						n.protocol &&
							!rM(u, n.protocol) &&
							i.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid protocol",
								pattern: n.protocol.source,
								input: i.value,
								inst: e,
								continue: !n.abort,
							}),
						(i.value = n.normalize ? u.href : Fb(o)));
					return;
				} catch {
					i.issues.push({ code: "invalid_format", format: "url", input: i.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	aM = se("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = pN()), Et.init(e, n));
	}),
	oM = se("$ZodNanoID", (e, n) => {
		if (n.length !== void 0 && (!Number.isInteger(n.length) || n.length < 1))
			throw new Error(`Invalid nanoid length: ${n.length}`);
		(n.pattern ?? (n.pattern = n.length === void 0 ? dN : hN(n.length)), Et.init(e, n));
	}),
	sM = se("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = sN), Et.init(e, n));
	}),
	uM = se("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = uN), Et.init(e, n));
	}),
	lM = se("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = lN), Et.init(e, n));
	}),
	cM = se("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = cN), Et.init(e, n));
	}),
	fM = se("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = fN), Et.init(e, n));
	}),
	dM = se("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = NN(n)), Et.init(e, n));
	}),
	hM = se("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = AN), Et.init(e, n));
	}),
	mM = se("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = RN(n)), Et.init(e, n));
	}),
	gM = se("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = mN), Et.init(e, n));
	}),
	vM = se("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = bN), Et.init(e, n));
	}),
	yM = /^[0-9a-fA-F:.]+$/;
function xE(e) {
	return yM.test(e) ? TE(`http://[${e}]`) : !1;
}
var pM = se("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = SN),
			Et.init(e, n),
			(e._zod.check = (i) => {
				xE(i.value) ||
					i.issues.push({ code: "invalid_format", format: "ipv6", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	bM = se("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = wN), Et.init(e, n));
	});
function SM(e) {
	const n = e.split("/");
	if (n.length !== 2) return !1;
	const [i, o] = n;
	if (!o) return !1;
	const u = Number(o);
	return `${u}` !== o || u < 0 || u > 128 ? !1 : xE(i);
}
var wM = se("$ZodCIDRv6", (e, n) => {
	(n.pattern ?? (n.pattern = EN),
		Et.init(e, n),
		(e._zod.check = (i) => {
			SM(i.value) ||
				i.issues.push({ code: "invalid_format", format: "cidrv6", input: i.value, inst: e, continue: !n.abort });
		}));
});
function OE(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var AE = /^[0-9a-zA-Z+/]*={0,2}$/,
	EM = se("$ZodBase64", (e, n) => {
		(n.pattern ?? (n.pattern = AE),
			Et.init(e, n),
			(e._zod.check = (i) => {
				OE(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	gg = /^[A-Za-z0-9_-]*$/;
function _M(e) {
	if (!gg.test(e)) return !1;
	const n = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return OE(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var CM = se("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = gg),
			Et.init(e, n),
			(e._zod.check = (i) => {
				_M(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	TM = se("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = xN), Et.init(e, n));
	});
function xM(e, n = null) {
	try {
		const i = e.split(".");
		if (i.length !== 3) return !1;
		const [o] = i;
		if (!o) return !1;
		const u = JSON.parse(atob(o));
		return !(("typ" in u && u?.typ !== "JWT") || !u.alg || (n && (!("alg" in u) || u.alg !== n)));
	} catch {
		return !1;
	}
}
var OM = se("$ZodJWT", (e, n) => {
		(Et.init(e, n),
			(e._zod.check = (i) => {
				xM(i.value, n.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	RE = se("$ZodNumber", (e, n) => {
		(It.init(e, n),
			(e._zod.pattern = DN),
			(e._zod.parse = (i, o) => {
				if (n.coerce)
					try {
						i.value = Number(i.value);
					} catch {}
				const u = i.value;
				if (typeof u == "number" && !Number.isNaN(u) && Number.isFinite(u)) return i;
				const l = typeof u == "number" ? (Number.isNaN(u) ? "NaN" : Number.isFinite(u) ? void 0 : String(u)) : void 0;
				return (
					i.issues.push({ expected: "number", code: "invalid_type", input: u, inst: e, ...(l ? { received: l } : {}) }),
					i
				);
			}));
	}),
	AM = se("$ZodNumberFormat", (e, n) => {
		(kN.init(e, n), RE.init(e, n));
	}),
	RM = se("$ZodUnknown", (e, n) => {
		(It.init(e, n), (e._zod.parse = (i) => i));
	}),
	NM = se("$ZodNever", (e, n) => {
		(It.init(e, n),
			(e._zod.parse = (i, o) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function MM(e, n) {
	const i = Bb(e._zod.def.checks);
	if (!i.length) return;
	const o = Math.min(...i.map((l) => l[0])),
		u = e._zod.parse;
	e._zod.parse = (l, f) => {
		const h = n(l.value);
		if (h > o && !f?.skipChecks && f?.direction !== "backward") {
			for (const [m, g] of Bb(e._zod.def.checks))
				if (h > m && g._zod.def.when(l)) {
					const p = l.issues.length;
					return (g._zod.check(l), (l.issues[p].continue = !1), jm(l.issues, p, e), l);
				}
		}
		return u(l, f);
	};
}
var DM = (e) => (Array.isArray(e) ? e.length : -1);
function Qb(e, n, i) {
	(e.issues.length && n.issues.push(...gE(i, e.issues)), (n.value[i] = e.value));
}
var zM = se("$ZodArray", (e, n) => {
	It.init(e, n);
	const i = kr.memoizer;
	(i?.attach(e),
		(e._zod.parse = (o, u) => {
			const l = o.value;
			if (!Array.isArray(l)) return (o.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), o);
			o.value = i ? i.alloc(e, o, Array(l.length), u) : Array(l.length);
			const f = [],
				h = u?.abortEarly;
			for (let m = 0; m < l.length; m++) {
				const g = l[m],
					p = n.element._zod.run({ value: g, issues: [] }, u);
				if (p instanceof Promise) f.push(p.then((b) => Qb(b, o, m)));
				else if ((Qb(p, o, m), h && p.issues.length !== 0 && ui(p))) break;
			}
			return f.length ? Promise.all(f).then(() => o) : o;
		}),
		MM(e, DM));
});
function kc(e, n, i, o, u, l) {
	const f = i in o,
		h = l === "optional";
	if (!(!f && h && u === "optional")) {
		if (e.issues.length) {
			if (u !== void 0 && h && !f) return;
			n.issues.push(...gE(i, e.issues));
		}
		if (!f && u === void 0) {
			e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [i] });
			return;
		}
		e.value === void 0 ? (f || (u === "defaulted" && !h)) && (n.value[i] = void 0) : (n.value[i] = e.value);
	}
}
var IM = [];
function NE(e) {
	const n = Object.keys(e.shape),
		i = Object.getOwnPropertySymbols(e.shape),
		o = i.length ? i : IM,
		u = o.length ? [...n, ...o] : n;
	for (const f of u)
		if (!e.shape?.[f]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${String(f)}": expected a Zod schema`);
	const l = wR(e.shape);
	return { ...e, allKeys: u, symbolKeys: o, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(l) };
}
function ME(e, n, i, o, u, l, f) {
	const h = [],
		m = u.keySet,
		g = u.catchall._zod,
		p = g.def.type,
		b = g.optin,
		y = g.optout;
	let w = 0;
	for (const E in n) {
		if (f && i.issues.length !== w) {
			if (ui(i, w)) break;
			w = i.issues.length;
		}
		if (m.has(E)) continue;
		if (E === "__proto__") {
			p === "never" && h.push(E);
			continue;
		}
		if (p === "never") {
			h.push(E);
			continue;
		}
		const T = g.run({ value: n[E], issues: [] }, o);
		T instanceof Promise ? e.push(T.then((x) => kc(x, i, E, n, b, y))) : kc(T, i, E, n, b, y);
	}
	return (
		h.length && i.issues.push({ code: "unrecognized_keys", keys: h, input: n, inst: l, continue: !0 }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var jM = se("$ZodObject", (e, n) => {
		It.init(e, n);
		const i = Object.getOwnPropertyDescriptor(n, "shape"),
			o = i?.get ? i.get.raw : (n.shape ?? {});
		if (o) {
			const g = () => {
				const p = { ...o };
				return (Object.defineProperty(n, "shape", { value: p }), (g.raw = p), p);
			};
			((g.raw = o), Object.defineProperty(n, "shape", { get: g }));
		}
		const u = ag(() => NE(n));
		it(e, "propValues", (g) => {
			const p = g.def.shape,
				b = {};
			for (const y in p) {
				const w = p[y]._zod;
				if (w.values) {
					Object.prototype.hasOwnProperty.call(b, y) || Pa(b, y, new Set());
					for (const E of w.values) b[y].add(E);
					w.optin !== void 0 && b[y].add(void 0);
				}
			}
			return b;
		});
		const l = Ic,
			f = n.catchall;
		let h;
		const m = kr.memoizer;
		(m?.attach(e),
			(e._zod.parse = (g, p) => {
				h ?? (h = u.value);
				const b = g.value;
				if (!l(b)) return (g.issues.push({ expected: "object", code: "invalid_type", input: b, inst: e }), g);
				g.value = m ? m.alloc(e, g, {}, p) : {};
				const y = [],
					w = h.shape,
					E = p?.abortEarly;
				let T = g.issues.length;
				for (const x of h.allKeys) {
					if (E && g.issues.length !== T) {
						if (ui(g, T)) break;
						T = g.issues.length;
					}
					if (x === "__proto__") continue;
					const z = w[x],
						M = z._zod.optin,
						A = z._zod.optout,
						N = z._zod.run({ value: b[x], issues: [] }, p);
					N instanceof Promise ? y.push(N.then((D) => kc(D, g, x, b, M, A))) : kc(N, g, x, b, M, A);
				}
				return f ? ME(y, b, g, p, u.value, e, E === !0) : y.length ? Promise.all(y).then(() => g) : g;
			}));
	}),
	kM = se("$ZodObjectJIT", (e, n) => {
		jM.init(e, n);
		const i = e._zod.parse,
			o = ag(() => NE(n)),
			u = kr.memoizer,
			l = (w) => {
				const E = o.value,
					T = E.symbolKeys,
					x = new QN(["payload", "ctx"], { shape: w, inst: e, memo: u, syms: T }),
					z = (D) => `shape[${D}]._zod.run({ value: input[${D}], issues: [] }, ctx)`,
					M = (D, k) => `
          let ${D}_ab = false;
          for (let i = 0; i < ${D}.issues.length; i++) {
            const iss = ${D}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${D}_ab = true;
          }
          if (${D}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
				x.write("const input = payload.value;");
				const A = Object.create(null);
				let N = 0;
				for (const D of E.allKeys) A[D] = `key_${N++}`;
				x.write(u ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
				for (const D of E.allKeys) {
					if (D === "__proto__") continue;
					const k = A[D],
						O = typeof D == "symbol" ? `syms[${T.indexOf(D)}]` : yR(D),
						L = `${O} in input`,
						H = w[D],
						te = H?._zod?.optin,
						R = te !== void 0,
						q = H?._zod?.optout === "optional";
					if ((x.write(`const ${k} = ${z(O)};`), R && q)) {
						const P = te === "optional" ? `${k}_present` : `${k}.value !== undefined || ${k}_present`;
						x.write(`
        const ${k}_present = ${L};
        if (!${k}.issues.length || ${k}_present) {
          if (${k}.issues.length) {${M(k, O)}
          }

          if (${P}) {
            newResult[${O}] = ${k}.value;
          }
        }

      `);
					} else
						R
							? (x.write(`
        if (${k}.issues.length) {${M(k, O)}
        }
      `),
								te === "defaulted"
									? x.write(`newResult[${O}] = ${k}.value;`)
									: x.write(`
        if (${k}.value !== undefined || ${L}) {
          newResult[${O}] = ${k}.value;
        }
      `))
							: x.write(`
        const ${k}_present = ${L};
        if (${k}.issues.length) {${M(k, O)}
        }
        if (!${k}_present && !${k}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${O}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${k}_present) {
          newResult[${O}] = ${k}.value;
        }

      `);
				}
				return (x.write("payload.value = newResult;"), x.write("return payload;"), x.compile());
			};
		let f;
		const h = Ic,
			m = !kr.jitless,
			p = m && bR.value,
			b = n.catchall;
		let y;
		e._zod.parse = (w, E) => {
			y ?? (y = o.value);
			const T = w.value;
			return h(T)
				? m && p && E?.async === !1 && E.jitless !== !0
					? (f || (f = l(n.shape)), (w = f(w, E)), b ? ME([], T, w, E, y, e, E?.abortEarly === !0) : w)
					: i(w, E)
				: (w.issues.push({ expected: "object", code: "invalid_type", input: T, inst: e }), w);
		};
	});
function Yb(e, n, i, o) {
	for (const l of e) if (l.issues.length === 0) return ((n.value = l.value), n);
	const u = e.filter((l) => !ui(l));
	return u.length === 1
		? ((n.value = u[0].value), u[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: i,
				errors: e.map((l) => l.issues.map((f) => es(f, o, Xi()))),
			}),
			n);
}
var qM = se("$ZodUnion", (e, n) => {
		(It.init(e, n),
			it(e, "optin", (o) =>
				o.def.options.some((u) => u._zod.optin === "defaulted")
					? "defaulted"
					: o.def.options.some((u) => u._zod.optin !== void 0)
						? "optional"
						: void 0,
			),
			it(e, "optout", (o) => (o.def.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			it(e, "values", (o) => {
				if (o.def.options.every((u) => u._zod.values))
					return new Set(o.def.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			it(e, "pattern", (o) => {
				if (o.def.options.every((u) => u._zod.pattern)) {
					const u = o.def.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => og(l.source)).join("|")})$`);
				}
			}));
		const i = n.options.length === 1 ? n.options[0]._zod.run : null;
		e._zod.parse = (o, u) => {
			if (i) return i(o, u);
			let l = !1;
			const f = [];
			for (const h of n.options) {
				const m = h._zod.run({ value: o.value, issues: [] }, u);
				if (m instanceof Promise) (f.push(m), (l = !0));
				else {
					if (m.issues.length === 0) return m;
					f.push(m);
				}
			}
			return l ? Promise.all(f).then((h) => Yb(h, o, e, u)) : Yb(f, o, e, u);
		};
	}),
	LM = se("$ZodIntersection", (e, n) => {
		(It.init(e, n),
			(e._zod.parse = (i, o) => {
				const u = i.value,
					l = n.left._zod.run({ value: u, issues: [] }, o),
					f = n.right._zod.run({ value: u, issues: [] }, o);
				return l instanceof Promise || f instanceof Promise
					? Promise.all([l, f]).then(([h, m]) => Kb(i, h, m))
					: Kb(i, l, f);
			}));
	});
function qm(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (mu(e) && mu(n)) {
		const i = Object.keys(n),
			o = Object.keys(e).filter((l) => i.indexOf(l) !== -1),
			u = { ...e, ...n };
		Object.prototype.hasOwnProperty.call(u, "__proto__") && delete u.__proto__;
		for (const l of o) {
			if (l === "__proto__") continue;
			const f = qm(e[l], n[l]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [l, ...f.mergeErrorPath] };
			u[l] = f.data;
		}
		return { valid: !0, data: u };
	}
	if (Array.isArray(e) && Array.isArray(n)) {
		if (e.length !== n.length) return { valid: !1, mergeErrorPath: [] };
		const i = [];
		for (let o = 0; o < e.length; o++) {
			const u = e[o],
				l = n[o],
				f = qm(u, l);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			i.push(f.data);
		}
		return { valid: !0, data: i };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Kb(e, n, i) {
	const o = new Map();
	let u;
	const l = new Map(),
		f = (g, p) => {
			let b;
			if (g.code === "unrecognized_keys" && !g.path?.length) (u ?? (u = g), (b = g.keys));
			else if (g.code === "invalid_key" && g.origin === "record" && g.path?.length === 1) {
				const y = String(g.path[0]);
				(l.has(y) || l.set(y, g), (b = [y]));
			} else return !1;
			for (const y of b) (o.has(y) || o.set(y, {}), (o.get(y)[p] = !0));
			return !0;
		};
	for (const g of n.issues) f(g, "l") || e.issues.push(g);
	for (const g of i.issues) f(g, "r") || e.issues.push(g);
	const h = [...o].filter(([, g]) => g.l && g.r).map(([g]) => g);
	if (h.length) {
		const g = u ? h.filter((p) => u.keys.includes(p)) : [];
		g.length && e.issues.push({ ...u, keys: g });
		for (const p of h) !g.includes(p) && l.has(p) && e.issues.push(l.get(p));
	}
	const m = qm(n.value, i.value);
	if (!m.valid) {
		if (ui(e)) return e;
		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(m.mergeErrorPath)}`);
	}
	return ((e.value = m.data), e);
}
var UM = se("$ZodEnum", (e, n) => {
		It.init(e, n);
		const i = zm(n.entries),
			o = new Set(i);
		((e._zod.values = o),
			it(e, "pattern", (u) => {
				const l = zm(u.def.entries).filter((f) => SR.has(typeof f));
				return new RegExp(l.length ? `^(${l.map((f) => Fo(f.toString())).join("|")})$` : "^[^\\s\\S]$");
			}),
			(e._zod.parse = (u, l) => {
				const f = u.value;
				return (o.has(f) || u.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), u);
			}));
	}),
	VM = se("$ZodLiteral", (e, n) => {
		It.init(e, n);
		const i = new Set(n.values);
		((e._zod.values = i),
			it(e, "pattern", (o) => {
				const u = o.def.values;
				return new RegExp(
					u.length
						? `^(${u.map((l) => (typeof l == "string" ? Fo(l) : l ? Fo(l.toString()) : String(l))).join("|")})$`
						: "^[^\\s\\S]$",
				);
			}),
			(e._zod.parse = (o, u) => {
				const l = o.value;
				return (i.has(l) || o.issues.push({ code: "invalid_value", values: n.values, input: l, inst: e }), o);
			}));
	}),
	BM = se("$ZodTransform", (e, n) => {
		(It.init(e, n),
			(e._zod.optin = "optional"),
			kr.memoizer?.guard(e),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") throw new pE(e.constructor.name);
				const u = n.transform(i.value, i);
				if (o.async) return (u instanceof Promise ? u : Promise.resolve(u)).then((l) => ((i.value = l), i));
				if (u instanceof Promise) throw new Da();
				return ((i.value = u), i);
			}));
	});
function Gb(e, n) {
	return ((e.value = n.issues.length ? void 0 : n.value), e);
}
var DE = se("$ZodOptional", (e, n) => {
		(It.init(e, n),
			it(e, "optin", (i) => (i.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional")),
			(e._zod.optout = "optional"),
			it(e, "values", (i) => {
				const o = i.def.innerType._zod.values;
				return o ? new Set([...o, void 0]) : void 0;
			}),
			it(e, "pattern", (i) => {
				const o = i.def.innerType._zod.pattern;
				return o ? new RegExp(`^(${og(o.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, o) => {
				if (i.value === void 0) {
					if (n.innerType._zod.optin !== "defaulted") return i;
					const u = n.innerType._zod.run({ value: i.value, issues: [] }, o);
					return u instanceof Promise ? u.then((l) => Gb(i, l)) : Gb(i, u);
				}
				return n.innerType._zod.run(i, o);
			}));
	}),
	PM = se("$ZodExactOptional", (e, n) => {
		(DE.init(e, n),
			it(e, "values", (i) => i.def.innerType._zod.values),
			it(e, "pattern", (i) => i.def.innerType._zod.pattern),
			(e._zod.parse = (i, o) => n.innerType._zod.run(i, o)));
	}),
	$M = se("$ZodNullable", (e, n) => {
		(It.init(e, n),
			it(e, "optin", (i) => i.def.innerType._zod.optin),
			it(e, "optout", (i) => i.def.innerType._zod.optout),
			it(e, "pattern", (i) => {
				const o = i.def.innerType._zod.pattern;
				return o ? new RegExp(`^(${og(o.source)}|null)$`) : void 0;
			}),
			it(e, "values", (i) => (i.def.innerType._zod.values ? new Set([...i.def.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, o) => (i.value === null ? i : n.innerType._zod.run(i, o))));
	}),
	HM = se("$ZodDefault", (e, n) => {
		(It.init(e, n),
			(e._zod.optin = "defaulted"),
			it(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") return n.innerType._zod.run(i, o);
				if (i.value === void 0) return ((i.value = n.defaultValue), i);
				const u = n.innerType._zod.run(i, o);
				return u instanceof Promise ? u.then((l) => Xb(l, n)) : Xb(u, n);
			}));
	});
function Xb(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var ZM = se("$ZodPrefault", (e, n) => {
		(It.init(e, n),
			(e._zod.optin = "defaulted"),
			it(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => (
				o.direction === "backward" || (i.value === void 0 && (i.value = n.defaultValue)),
				n.innerType._zod.run(i, o)
			)));
	}),
	FM = se("$ZodNonOptional", (e, n) => {
		(It.init(e, n),
			it(e, "values", (i) => {
				const o = i.def.innerType._zod.values;
				return o ? new Set([...o].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, o) => {
				const u = n.innerType._zod.run(i, o);
				return u instanceof Promise ? u.then((l) => Jb(l, e)) : Jb(u, e);
			}));
	});
function Jb(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
function Wb(e, n, i, o) {
	return n.issues.length
		? ((e.value = i.catchValue({
				...n,
				value: e.value,
				error: { issues: n.issues.map((u) => es(u, o, Xi())) },
				input: e.value,
			})),
			e)
		: ((e.value = n.value), n.memo && (e.memo = !0), e);
}
var QM = se("$ZodCatch", (e, n) => {
		(It.init(e, n),
			it(e, "optin", (i) => (i.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional")),
			it(e, "optout", (i) => i.def.innerType._zod.optout),
			it(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") return n.innerType._zod.run(i, o);
				const u = n.innerType._zod.run({ value: i.value, issues: [] }, o);
				return u instanceof Promise ? u.then((l) => Wb(i, l, n, o)) : Wb(i, u, n, o);
			}));
	}),
	YM = se("$ZodPipe", (e, n) => {
		(It.init(e, n),
			it(e, "values", (i) => i.def.in._zod.values),
			it(e, "optin", (i) => i.def.in._zod.optin),
			it(e, "optout", (i) => i.def.out._zod.optout),
			it(e, "propValues", (i) => i.def.in._zod.propValues),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") {
					const l = n.out._zod.run(i, o);
					return l instanceof Promise ? l.then((f) => mc(f, n.in, o)) : mc(l, n.in, o);
				}
				const u = n.in._zod.run(i, o);
				return u instanceof Promise ? u.then((l) => mc(l, n.out, o)) : mc(u, n.out, o);
			}));
	});
function mc(e, n, i) {
	return e.issues.some((o) => o.code !== "unrecognized_keys")
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues }, i);
}
var KM = se("$ZodReadonly", (e, n) => {
	(It.init(e, n),
		it(e, "propValues", (i) => i.def.innerType._zod.propValues),
		it(e, "values", (i) => i.def.innerType._zod.values),
		it(e, "optin", (i) => i.def.innerType?._zod?.optin),
		it(e, "optout", (i) => i.def.innerType?._zod?.optout),
		(e._zod.parse = (i, o) => {
			if (o.direction === "backward") return n.innerType._zod.run(i, o);
			const u = n.innerType._zod.run(i, o);
			return u instanceof Promise ? u.then(eS) : eS(u);
		}));
});
function eS(e) {
	return (e.memo || (e.value = Object.freeze(e.value)), e);
}
var GM = se("$ZodCustom", (e, n) => {
	(jn.init(e, n),
		It.init(e, n),
		(e._zod.parse = (i, o) => i),
		(e._zod.check = (i) => {
			const o = i.value,
				u = n.fn(o);
			if (u instanceof Promise) return u.then((l) => tS(l, i, o, e));
			tS(u, i, o, e);
		}));
});
function tS(e, n, i, o) {
	if (!e) {
		const u = { code: "custom", input: i, inst: o, path: [...(o._zod.def.path ?? [])], continue: !o._zod.def.abort };
		(o._zod.def.params && (u.params = o._zod.def.params), n.issues.push(gu(u)));
	}
}
var XM = class extends Error {
		constructor() {
			(super("Cannot parse a reference cycle that closes through a transform"), (this.name = "ZodCyclicError"));
		}
	},
	Lm = "~memo",
	nS = [];
function zE(e) {
	return e !== null && typeof e == "object";
}
function dm(e) {
	return e.map((n) => (n.path ? { ...n, path: n.path.slice() } : { ...n }));
}
var IE = new WeakMap(),
	ru = 0,
	xc = 1,
	ou = 2;
function Oc(e, n, i) {
	const o = IE.get(e);
	if (o !== void 0) return o ? ou : ru;
	if (n.has(e)) return ou;
	n.add(e);
	let u = ru;
	const l = (g) => {
			if (u !== ou && g?._zod) {
				const p = Oc(g, n, i);
				p > u && (u = p);
			}
		},
		f = (g, p) => {
			let b = ru;
			for (const y of Reflect.ownKeys(g)) {
				const w = Object.getOwnPropertyDescriptor(g, y);
				if (p && !w.enumerable) continue;
				const E = w.get ? xc : w.value?._zod ? Oc(w.value, n, i) : ru;
				E > b && (b = E);
			}
			return b;
		},
		h = (g) => {
			g > u && (u = g);
		},
		m = e._zod.def;
	switch (m.type) {
		case "object": {
			const g = sE(m);
			(h(g ? f(g, !0) : xc), l(m.catchall));
			break;
		}
		case "array":
			l(m.element);
			break;
		case "tuple":
			for (const g of m.items) l(g);
			l(m.rest);
			break;
		case "record":
		case "map":
			(l(m.keyType), l(m.valueType));
			break;
		case "set":
			l(m.valueType);
			break;
		case "union":
			for (const g of m.options) l(g);
			break;
		case "intersection":
			(l(m.left), l(m.right));
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			l(m.innerType);
			break;
		case "pipe":
			(l(m.in), l(m.out));
			break;
		case "function":
			(l(m.input), l(m.output));
			break;
		case "lazy": {
			const g = m._cachedInner ?? (i ? e._zod.innerType : void 0);
			h(g ? Oc(g, n, !1) : xc);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom":
			break;
		default:
			for (const g in m) {
				const p = Object.getOwnPropertyDescriptor(m, g);
				if (!p || p.get) continue;
				const b = p.value;
				if (!(!b || typeof b != "object")) {
					if (b._zod) l(b);
					else if (Array.isArray(b)) for (const y of b) l(y);
				}
			}
	}
	return (n.delete(e), JM(e, u));
}
function JM(e, n) {
	return (n !== xc && IE.set(e, n === ou), n);
}
function WM(e, n) {
	let i = e.buckets.get(n);
	return (i || ((i = new WeakMap()), e.buckets.set(n, i)), i);
}
var gc,
	vc = [],
	eD = {
		alloc(e, n, i) {
			const o = gc;
			if (!o) return i;
			gc = void 0;
			const u = { value: i, issues: null };
			return (o.set(n.value, u), vc.push(u), i);
		},
		guard(e) {
			var n;
			((n = e._zod).deferred ?? (n.deferred = []),
				e._zod.deferred.push(() => {
					const i = e._zod.parse,
						o = (u, l) => {
							if (l.direction !== "backward" && nD(l, u.value)) throw new XM();
							return i(u, l);
						};
					((e._zod.parse = o), e._zod.run === i && (e._zod.run = o));
				}));
		},
		attach(e) {
			var n;
			let i,
				o = !1,
				u,
				l;
			((n = e._zod).deferred ?? (n.deferred = []),
				e._zod.deferred.push(() => {
					const f = e._zod.parse,
						h = (m, g) => {
							if (i === void 0) {
								const z = Oc(e, new Set(), !1);
								if (z === ru) return ((e._zod.parse = f), e._zod.run === h && (e._zod.run = f), f(m, g));
								z === ou || o ? (i = !0) : (o = !0);
							}
							const p = m.value;
							if (!zE(p)) return f(m, g);
							let b = g[Lm];
							b || ((b = { buckets: new WeakMap(), backEdges: void 0 }), (g[Lm] = b));
							let y;
							u === g ? (y = l) : ((y = WM(b, e)), (u = g), (l = y));
							const w = y.get(p);
							if (w)
								return (
									(m.value = w.value),
									w.issues
										? w.issues.length && m.issues.push(...dm(w.issues))
										: ((m.memo = !0), b.backEdges ?? (b.backEdges = new WeakSet()), b.backEdges.add(w.value)),
									m
								);
							gc = y;
							const E = vc.length,
								T = f(m, g);
							gc = void 0;
							const x = vc.length > E ? vc.pop() : void 0;
							return T instanceof Promise
								? T.then((z) => (x && (x.issues = z.issues.length ? dm(z.issues) : nS), z))
								: (x && (x.issues = T.issues.length ? dm(T.issues) : nS), T);
						};
					((e._zod.parse = h), e._zod.run === f && (e._zod.run = h));
				}));
		},
	};
function tD() {
	return eD;
}
function nD(e, n) {
	const i = e[Lm]?.backEdges;
	return i !== void 0 && zE(n) && i.has(n);
}
var rD = () => {
	const e = {
		string: { unit: "characters", verb: "to have" },
		file: { unit: "bytes", verb: "to have" },
		array: { unit: "items", verb: "to have" },
		set: { unit: "items", verb: "to have" },
		map: { unit: "entries", verb: "to have" },
	};
	function n(l) {
		return e[l] ?? null;
	}
	const i = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			mac: "MAC address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			currency_code: "currency code",
			credit_card: "credit card number",
			iban: "IBAN",
			jwt: "JWT",
			template_literal: "input",
		},
		o = { nan: "NaN" };
	function u(l, f) {
		return l === "number" && typeof f == "number" && !Number.isFinite(f) ? String(f) : (o[l] ?? l);
	}
	return (l) => {
		switch (l.code) {
			case "invalid_type":
				return `Invalid input: expected ${u(l.expected)}, received ${u(MR(l.input), l.input)}`;
			case "invalid_value":
				return l.values.length === 1
					? `Invalid input: expected ${dE(l.values[0])}`
					: `Invalid option: expected one of ${Ub(l.values, "|")}`;
			case "too_big": {
				const f = l.exact ? "exactly " : l.inclusive ? "<=" : "<",
					h = n(l.origin);
				return h
					? `Too big: expected ${l.origin ?? "value"} to have ${f}${l.maximum.toString()} ${h.unit ?? "elements"}`
					: `Too big: expected ${l.origin ?? "value"} to be ${f}${l.maximum.toString()}`;
			}
			case "too_small": {
				const f = l.exact ? "exactly " : l.inclusive ? ">=" : ">",
					h = n(l.origin);
				return h
					? `Too small: expected ${l.origin} to have ${f}${l.minimum.toString()} ${h.unit}`
					: `Too small: expected ${l.origin} to be ${f}${l.minimum.toString()}`;
			}
			case "invalid_format": {
				const f = l;
				return f.format === "starts_with"
					? `Invalid string: must start with "${f.prefix}"`
					: f.format === "ends_with"
						? `Invalid string: must end with "${f.suffix}"`
						: f.format === "includes"
							? `Invalid string: must include "${f.includes}"`
							: f.format === "regex"
								? `Invalid string: must match pattern ${f.pattern}`
								: `Invalid ${i[f.format] ?? l.format}`;
			}
			case "not_multiple_of":
				return `Invalid number: must be a multiple of ${l.divisor}`;
			case "unrecognized_keys":
				return `Unrecognized key${l.keys.length > 1 ? "s" : ""}: ${Ub(l.keys, ", ")}`;
			case "invalid_key":
				return `Invalid key in ${l.origin}`;
			case "invalid_union":
				return l.options && Array.isArray(l.options) && l.options.length > 0
					? `Invalid discriminator value. Expected ${l.options.map((f) => `'${f}'`).join(" | ")}`
					: l.inclusive === !1
						? "Invalid input: more than one option matched"
						: "Invalid input";
			case "invalid_element":
				return `Invalid value in ${l.origin}`;
			default:
				return "Invalid input";
		}
	};
};
function iD() {
	return { localeError: rD() };
}
var rS,
	aD = class {
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
				const o = { ...i, ...this._map.get(e) };
				return Object.keys(o).length ? o : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	};
function oD() {
	return new aD();
}
(rS = globalThis).__zod_globalRegistry ?? (rS.__zod_globalRegistry = oD());
var iu = globalThis.__zod_globalRegistry;
function jE(e) {
	return (e.checks && (e.checks = [...e.checks]), e);
}
function sD(e, n) {
	return new e(jE({ type: "string", ...De(n) }));
}
function uD(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...De(n) });
}
function lD(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...De(n) });
}
function cD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...De(n) });
}
function fD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...De(n) });
}
function dD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...De(n) });
}
function hD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...De(n) });
}
function mD(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...De(n) });
}
function gD(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...De(n) });
}
function vD(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...De(n) });
}
function yD(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...De(n) });
}
function pD(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...De(n) });
}
function bD(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...De(n) });
}
function SD(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...De(n) });
}
function wD(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...De(n) });
}
function ED(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...De(n) });
}
function _D(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...De(n) });
}
function CD(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...De(n) });
}
function TD(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...De(n) });
}
function xD(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...De(n) });
}
function OD(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...De(n) });
}
function AD(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...De(n) });
}
function RD(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...De(n) });
}
function ND(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...De(n),
	});
}
function MD(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...De(n) });
}
function DD(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...De(n) });
}
function zD(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...De(n) });
}
function ID(e, n) {
	return new e(jE({ type: "number", checks: [], ...De(n) }));
}
function jD(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...De(n) });
}
function kD(e) {
	return new e({ type: "unknown" });
}
function qD(e, n) {
	return new e({ type: "never", ...De(n) });
}
function iS(e, n) {
	return new wE({ check: "less_than", ...De(n), value: e, inclusive: !1 });
}
function hm(e, n) {
	return new wE({ check: "less_than", ...De(n), value: e, inclusive: !0 });
}
function aS(e, n) {
	return new EE({ check: "greater_than", ...De(n), value: e, inclusive: !1 });
}
function mm(e, n) {
	return new EE({ check: "greater_than", ...De(n), value: e, inclusive: !0 });
}
function oS(e, n) {
	return new jN({ check: "multiple_of", ...De(n), value: e });
}
function kE(e, n) {
	return new qN({ check: "max_length", ...De(n), maximum: e });
}
function qc(e, n) {
	return new LN({ check: "min_length", ...De(n), minimum: e });
}
function qE(e, n) {
	return new UN({ check: "length_equals", ...De(n), length: e });
}
function LD(e, n) {
	return new VN({ check: "string_format", format: "regex", ...De(n), pattern: e });
}
function UD(e) {
	return new BN({ check: "string_format", format: "lowercase", ...De(e) });
}
function VD(e) {
	return new PN({ check: "string_format", format: "uppercase", ...De(e) });
}
function BD(e, n) {
	return new $N({ check: "string_format", format: "includes", ...De(n), includes: e });
}
function PD(e, n) {
	return new HN({ check: "string_format", format: "starts_with", ...De(n), prefix: e });
}
function $D(e, n) {
	return new ZN({ check: "string_format", format: "ends_with", ...De(n), suffix: e });
}
function ts(e) {
	return new FN({ check: "overwrite", tx: e });
}
function HD(e) {
	return ts((n) => n.normalize(e));
}
function ZD() {
	return ts((e) => e.trim());
}
function FD() {
	return ts((e) => e.toLowerCase());
}
function QD() {
	return ts((e) => e.toUpperCase());
}
function YD() {
	return ts((e) => pR(e));
}
function KD(e, n, i) {
	return new e({ type: "array", element: n, ...De(i) });
}
function GD(e, n, i) {
	return new e({ type: "custom", check: "custom", fn: n, ...De(i) });
}
function XD(e, n) {
	const i = JD(
		(o) => (
			(o.addIssue = (u) => {
				if (typeof u == "string") o.issues.push(gu(u, o.value, i._zod.def));
				else {
					const l = u;
					(l.fatal && (l.continue = !1),
						l.code ?? (l.code = "custom"),
						"input" in l || (l.input = o.value),
						l.inst ?? (l.inst = i),
						l.continue ?? (l.continue = !i._zod.def.abort),
						o.issues.push(gu(l)));
				}
			}),
			e(o.value, o)
		),
		n,
	);
	return i;
}
function JD(e, n) {
	const i = new jn({ check: "custom", ...De(n) });
	return ((i._zod.check = e), i);
}
function su(e, ...n) {
	for (const i of n)
		for (const o of Reflect.ownKeys(i)) Object.prototype.propertyIsEnumerable.call(i, o) && Pa(e, o, i[o]);
	return e;
}
function LE(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? iu,
			target: n,
			unrepresentable: e?.unrepresentable ?? "throw",
			override: e?.override ?? (() => {}),
			io: e?.io ?? "output",
			counter: 0,
			seen: new Map(),
			sharedDefsExtractedFor: void 0,
			sharedEmitDoneFor: void 0,
			cycles: e?.cycles ?? "ref",
			reused: e?.reused ?? "inline",
			intersections: [],
			deferred: [],
			external: e?.external ?? void 0,
		}
	);
}
function Fi(e, n, i, o, u) {
	const l =
		typeof n.unrepresentable == "function"
			? n.unrepresentable({ zodSchema: e, path: o.path, message: u })
			: n.unrepresentable;
	if (l === "any") return !1;
	if (l === void 0 || l === "throw") throw new Error(u);
	return (Object.assign(i, l), !0);
}
function fn(e, n, i = { path: [], schemaPath: [] }) {
	var o;
	const u = e._zod.def,
		l = n.seen.get(e);
	if (l) return (l.count++, i.schemaPath.includes(e) && (l.cycle = i.path), l.schema);
	const f = { schema: {}, count: 1, cycle: void 0, path: i.path };
	(n.seen.set(e, f), (n.sharedDefsExtractedFor = void 0), (n.sharedEmitDoneFor = void 0));
	const h = e._zod.toJSONSchema?.();
	if (h) f.schema = h;
	else {
		const g = { ...i, schemaPath: [...i.schemaPath, e], path: i.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(n, f.schema, g);
		else {
			const b = f.schema,
				y = n.processors[u.type];
			if (!y) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${u.type}`);
			y(e, n, b, g);
		}
		const p = e._zod.parent;
		p && (f.ref || (f.ref = p), fn(p, n, g), (n.seen.get(p).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && su(f.schema, m),
		n.io === "input" && _n(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((o = f.schema).default ?? (o.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function sS(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function UE(e, n) {
	const i = e.seen.get(n);
	if (!i) throw new Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	const o = new Map();
	for (const f of e.seen.entries()) {
		const h = e.metadataRegistry.get(f[0])?.id;
		if (h) {
			const m = o.get(h);
			if (m && m !== f[0])
				throw new Error(
					`Duplicate schema id "${h}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
				);
			o.set(h, f[0]);
		}
	}
	const u = (f) => {
			const h = e.target === "draft-2020-12" ? "$defs" : "definitions";
			if (e.external) {
				const b = e.external.registry.get(f[0])?.id,
					y = e.external.uri ?? ((E) => E);
				if (b) return { ref: y(b) };
				const w = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = w), { defId: w, ref: `${y("__shared")}#/${h}/${sS(w)}` });
			}
			const m = "#",
				g = `${m}/${h}/`;
			if (f[1] === i && !f[1].schema.id) return { ref: m };
			const p = f[1].schema.id ?? `__schema${e.counter++}`;
			return { defId: p, ref: g + sS(p) };
		},
		l = (f) => {
			if (f[1].schema.$ref) return;
			const h = f[1],
				{ ref: m, defId: g } = u(f);
			((h.def = { ...h.schema }), g && (h.defId = g));
			const p = h.schema;
			for (const b in p) delete p[b];
			p.$ref = m;
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
			l(f);
			continue;
		}
		if (e.external) {
			const m = e.external.registry.get(f[0])?.id;
			if (n !== f[0] && m) {
				l(f);
				continue;
			}
		}
		if (e.metadataRegistry.get(f[0])?.id) {
			l(f);
			continue;
		}
		if (h.cycle) {
			l(f);
			continue;
		}
		h.count > 1 && e.reused === "ref" && l(f);
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function VE(e) {
	const n = e.anyOf;
	if (!Array.isArray(n) || n.length === 0 || e.type !== void 0) return;
	const i = [];
	for (const o of n) {
		if (!o || typeof o != "object") return;
		VE(o);
		const u = Object.keys(o);
		if (u.length !== 1 || u[0] !== "type") return;
		const l = o.type;
		for (const f of Array.isArray(l) ? l : [l]) {
			if (typeof f != "string") return;
			i.includes(f) || i.push(f);
		}
	}
	(delete e.anyOf, (e.type = i.length === 1 ? i[0] : i));
}
var BE = new Set(["type", "properties", "required", "additionalProperties"]),
	uS = ["oneOf", "anyOf"];
function lS(e) {
	const n = e.additionalProperties;
	return n === void 0 || n === !1 || typeof n != "object" || n === null ? null : Object.keys(n).length ? n : null;
}
function Um(e) {
	const n = [];
	for (const l of e) {
		if (typeof l != "object" || l.type !== "object") return null;
		for (const f in l) if (!BE.has(f)) return null;
		n.push(l);
	}
	const i = {},
		o = new Set();
	for (const l of n) {
		for (const f in l.properties) {
			if (Object.prototype.hasOwnProperty.call(i, f)) continue;
			const h = [];
			for (const g of n) {
				const p = g.properties?.[f] ?? lS(g);
				p != null && (h.some((b) => JSON.stringify(b) === JSON.stringify(p)) || h.push(p));
			}
			const m = h.length === 1 ? h[0] : (Um(h) ?? { allOf: h });
			Pa(i, f, m);
		}
		for (const f of l.required ?? []) o.add(f);
	}
	const u = { type: "object", properties: i };
	if ((o.size && (u.required = [...o]), n.every((l) => l.additionalProperties === !1))) u.additionalProperties = !1;
	else {
		const l = [];
		for (const f of n) {
			const h = lS(f);
			h && !l.some((m) => JSON.stringify(m) === JSON.stringify(h)) && l.push(h);
		}
		l.length === 1 ? (u.additionalProperties = l[0]) : l.length > 1 && (u.additionalProperties = { allOf: l });
	}
	return u;
}
function WD(e) {
	const n = e.allOf;
	if (!Array.isArray(n) || n.length < 2) return;
	for (const u of BE) if (u in e) return;
	const i = n.filter((u) => uS.some((l) => Array.isArray(u[l])));
	let o = null;
	if (!i.length) o = Um(n);
	else {
		const u = i[0],
			l = uS.find((m) => Array.isArray(u[m]));
		if (Object.keys(u).length !== 1) return;
		const f = n.filter((m) => m !== u),
			h = u[l].map((m) => Um([...f, m]));
		if (h.some((m) => !m)) return;
		o = { [l]: h };
	}
	o && (delete e.allOf, su(e, o));
}
function PE(e, n) {
	const i = e.seen.get(n);
	if (!i) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const o = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const g = m.def ?? m.schema,
			p = { ...g },
			b = m.ref;
		if (((m.ref = null), b)) {
			o(b);
			const w = e.seen.get(b),
				E = w.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((g.allOf = g.allOf ?? []), g.allOf.push(E))
					: su(g, E),
				su(g, p),
				h._zod.parent === b)
			)
				for (const T in g) T === "$ref" || T === "allOf" || T in p || delete g[T];
			if (E.$ref && w.def)
				for (const T in g)
					T === "$ref" ||
						T === "allOf" ||
						(T in w.def && JSON.stringify(g[T]) === JSON.stringify(w.def[T]) && delete g[T]);
		}
		const y = h._zod.parent;
		if (y && y !== b) {
			o(y);
			const w = e.seen.get(y);
			if (w?.schema.$ref && ((g.$ref = w.schema.$ref), w.def))
				for (const E in g)
					E === "$ref" ||
						E === "allOf" ||
						(E in w.def && JSON.stringify(g[E]) === JSON.stringify(w.def[E]) && delete g[E]);
		}
		e.override({ zodSchema: h, jsonSchema: g, path: m.path ?? [] });
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (const h of [...e.seen.entries()].reverse()) o(h[0]);
		if (e.target !== "openapi-3.0") for (const h of e.seen.entries()) VE(h[1].def ?? h[1].schema);
		for (const h of e.deferred) h();
		if (e.intersections.length) {
			const h = new Map();
			for (const m of e.seen.values())
				for (const g of [m.schema, m.def]) {
					const p = g?.allOf;
					if (!Array.isArray(p)) continue;
					const b = h.get(p);
					b ? b.push(g) : h.set(p, [g]);
				}
			for (const m of e.intersections) for (const g of h.get(m) ?? []) WD(g);
		}
	}
	const u = {};
	if (
		(e.target === "draft-2020-12"
			? (u.$schema = "https://json-schema.org/draft/2020-12/schema")
			: e.target === "draft-07"
				? (u.$schema = "http://json-schema.org/draft-07/schema#")
				: e.target === "draft-04"
					? (u.$schema = "http://json-schema.org/draft-04/schema#")
					: e.target,
		e.external?.uri)
	) {
		const h = e.external.registry.get(n)?.id;
		if (!h) throw new Error("Schema is missing an `id` property");
		u.$id = e.external.uri(h);
	}
	su(u, i.defId ? i.schema : (i.def ?? i.schema));
	const l = e.metadataRegistry.get(n)?.id;
	l !== void 0 && u.id === l && delete u.id;
	const f = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external)
		for (const h of e.seen.entries()) {
			const m = h[1];
			m.def && m.defId && (m.def.id === m.defId && delete m.def.id, Pa(f, m.defId, m.def));
		}
	(e.external && (e.sharedEmitDoneFor = e.external),
		e.external || (Object.keys(f).length > 0 && (e.target === "draft-2020-12" ? (u.$defs = f) : (u.definitions = f))));
	try {
		const h = JSON.parse(JSON.stringify(u));
		return (
			Object.defineProperty(h, "~standard", {
				value: {
					...n["~standard"],
					jsonSchema: { input: Lc(n, "input", e.processors), output: Lc(n, "output", e.processors) },
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
function _n(e, n) {
	const i = n ?? { seen: new Set() };
	if (i.seen.has(e)) return !1;
	i.seen.add(e);
	const o = e._zod.def;
	if (o.type === "transform") return !0;
	if (o.type === "array") return _n(o.element, i);
	if (o.type === "set") return _n(o.valueType, i);
	if (o.type === "lazy") return _n(o.getter(), i);
	if (
		o.type === "promise" ||
		o.type === "optional" ||
		o.type === "nonoptional" ||
		o.type === "nullable" ||
		o.type === "readonly" ||
		o.type === "default" ||
		o.type === "prefault" ||
		o.type === "catch"
	)
		return _n(o.innerType, i);
	if (o.type === "intersection") return _n(o.left, i) || _n(o.right, i);
	if (o.type === "record" || o.type === "map") return _n(o.keyType, i) || _n(o.valueType, i);
	if (o.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : _n(o.in, i) || _n(o.out, i);
	if (o.type === "object") {
		for (const u in o.shape) if (_n(o.shape[u], i)) return !0;
		return !1;
	}
	if (o.type === "union") {
		for (const u of o.options) if (_n(u, i)) return !0;
		return !1;
	}
	if (o.type === "tuple") {
		for (const u of o.items) if (_n(u, i)) return !0;
		return !!(o.rest && _n(o.rest, i));
	}
	return !1;
}
var ez =
		(e, n = {}) =>
		(i) => {
			const o = LE({ ...i, processors: n });
			return (fn(e, o), UE(o, e), PE(o, e));
		},
	Lc =
		(e, n, i = {}) =>
		(o) => {
			const { libraryOptions: u, target: l } = o ?? {},
				f = LE({ ...(u ?? {}), target: l, io: n, processors: i });
			return (fn(e, f), UE(f, e), PE(f, e));
		},
	Qo = (e, n, i) => {
		(e[n] === void 0 || i > e[n]) && (e[n] = i);
	},
	Yo = (e, n, i) => {
		(e[n] === void 0 || i < e[n]) && (e[n] = i);
	},
	cS = (e, n) => {
		(Qo(e, "minimum", n), Yo(e, "maximum", n));
	},
	$E = (e, n) => {
		(e.multipleOf ?? (e.multipleOf = []), e.multipleOf.includes(n) || e.multipleOf.push(n));
	},
	HE = (e, n) => {
		(e.patterns ?? (e.patterns = new Set()), e.patterns.add(n));
	},
	ZE = (e, n) => {
		e.mime = e.mime ? e.mime.filter((i) => n.includes(i)) : [...n];
	},
	FE = (e, n) => {
		((e.format = n), n.includes("int") && (e.isInt = !0));
	},
	fS = (e, n) => Qo(e, "minimum", n.minimum),
	dS = (e, n) => Yo(e, "maximum", n.maximum),
	hS = (e) => (n, i) => {
		FE(n, i.format);
		const [o, u] = e[i.format];
		(Qo(n, "minimum", o), Yo(n, "maximum", u));
	},
	tz = {
		greater_than: (e, n) => Qo(e, n.inclusive ? "minimum" : "exclusiveMinimum", n.value),
		less_than: (e, n) => Yo(e, n.inclusive ? "maximum" : "exclusiveMaximum", n.value),
		multiple_of: (e, n) => $E(e, n.value),
		number_format: hS(hE),
		bigint_format: hS(ER),
		min_length: fS,
		max_length: dS,
		length_equals: (e, n) => cS(e, n.length),
		min_size: fS,
		max_size: dS,
		size_equals: (e, n) => cS(e, n.size),
		string_format: (e, n) => {
			(FE(e, n.format),
				n.pattern && HE(e, n.pattern),
				(n.format === "base64" || n.format === "base64url") && (e.contentEncoding = n.format),
				(n.local || n.precision === -1) && (e.laxFormat = !0));
		},
		mime_type: (e, n) => ZE(e, n.mime),
	};
function Ir(e) {
	const n = {},
		i = e._zod.def,
		o = e._zod.traits.has("$ZodCheck") ? [e, ...(i.checks ?? [])] : (i.checks ?? []);
	for (const l of o) tz[l._zod.def.check]?.(n, l._zod.def);
	const u = e._zod.bag;
	(u.minimum !== void 0 && Qo(n, "minimum", u.minimum),
		u.exclusiveMinimum !== void 0 && Qo(n, "exclusiveMinimum", u.exclusiveMinimum),
		u.maximum !== void 0 && Yo(n, "maximum", u.maximum),
		u.exclusiveMaximum !== void 0 && Yo(n, "exclusiveMaximum", u.exclusiveMaximum),
		u.multipleOf !== void 0 && $E(n, u.multipleOf),
		u.format !== void 0 && (n.format ?? (n.format = u.format), u.format.includes("int") && (n.isInt = !0)),
		u.mime && ZE(n, u.mime));
	for (const l of u.patterns ?? []) HE(n, l);
	return n;
}
var nz = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	rz = new Map([
		[AE, _N],
		[gg, CN],
	]),
	iz = (e) => rz.get(e) ?? e,
	az = (e, n, i, o) => {
		const u = i;
		u.type = "string";
		const { minimum: l, maximum: f, format: h, patterns: m, contentEncoding: g, laxFormat: p } = Ir(e);
		if (
			(typeof l == "number" && (u.minLength = l),
			typeof f == "number" && (u.maxLength = f),
			h && ((u.format = nz[h] ?? h), u.format === "" && delete u.format, (h === "time" || p) && delete u.format),
			g && (u.contentEncoding = g),
			m && m.size > 0)
		) {
			const b = [...m].map(iz);
			b.length === 1
				? (u.pattern = b[0].source)
				: b.length > 1 &&
					(u.allOf = [
						...b.map((y) => ({
							...(n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: y.source,
						})),
					]);
		}
	},
	oz = (e, n, i, o) => {
		const u = i,
			{ minimum: l, maximum: f, multipleOf: h, exclusiveMaximum: m, exclusiveMinimum: g, isInt: p } = Ir(e);
		u.type = p ? "integer" : "number";
		const b = typeof g == "number" && g >= (l ?? Number.NEGATIVE_INFINITY),
			y = typeof m == "number" && m <= (f ?? Number.POSITIVE_INFINITY),
			w = n.target === "draft-04" || n.target === "openapi-3.0";
		if (
			(b
				? w
					? ((u.minimum = g), (u.exclusiveMinimum = !0))
					: (u.exclusiveMinimum = g)
				: typeof l == "number" && (u.minimum = l),
			y
				? w
					? ((u.maximum = m), (u.exclusiveMaximum = !0))
					: (u.exclusiveMaximum = m)
				: typeof f == "number" && (u.maximum = f),
			h)
		) {
			const E = new Set();
			for (const z of h)
				Number.isFinite(z) && z !== 0
					? E.add(Math.abs(z))
					: Fi(e, n, u, o, `A multipleOf divisor of ${z} cannot be represented in JSON Schema`);
			const [T, ...x] = E;
			(T !== void 0 && (u.multipleOf = T),
				x.length && (u.allOf = [...(u.allOf ?? []), ...x.map((z) => ({ multipleOf: z }))]));
		}
	},
	sz = (e, n, i, o) => {
		i.not = {};
	},
	uz = (e, n, i, o) => {},
	lz = (e, n, i, o) => {
		const u = e._zod.def,
			l = zm(u.entries);
		if (l.length === 0) {
			i.not = {};
			return;
		}
		(l.every((f) => typeof f == "number") && (i.type = "number"),
			l.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = l));
	},
	cz = (e, n, i, o) => {
		const u = e._zod.def;
		if (u.values.length === 0) {
			i.not = {};
			return;
		}
		const l = [];
		for (const f of u.values)
			if (f === void 0) {
				if (Fi(e, n, i, o, "Literal `undefined` cannot be represented in JSON Schema")) return;
			} else if (typeof f == "bigint") {
				if (Fi(e, n, i, o, "BigInt literals cannot be represented in JSON Schema")) return;
				l.push(Number(f));
			} else l.push(f);
		if (l.length !== 0)
			if (l.length === 1) {
				const f = l[0];
				((i.type = f === null ? "null" : typeof f),
					n.target === "draft-04" || n.target === "openapi-3.0" ? (i.enum = [f]) : (i.const = f));
			} else
				(l.every((f) => typeof f == "number") && (i.type = "number"),
					l.every((f) => typeof f == "string") && (i.type = "string"),
					l.every((f) => typeof f == "boolean") && (i.type = "boolean"),
					l.every((f) => f === null) && (i.type = "null"),
					(i.enum = l));
	},
	fz = (e, n, i, o) => {
		Fi(e, n, i, o, "Custom types cannot be represented in JSON Schema");
	},
	dz = (e, n, i, o) => {
		Fi(e, n, i, o, "Transforms cannot be represented in JSON Schema");
	},
	hz = (e, n, i, o) => {
		const u = i,
			l = e._zod.def,
			{ minimum: f, maximum: h } = Ir(e);
		(typeof f == "number" && (u.minItems = f),
			typeof h == "number" && (u.maxItems = h),
			(u.type = "array"),
			(u.items = fn(l.element, n, { ...o, path: [...o.path, "items"] })));
	};
function Vm(e) {
	const n = e._zod.def;
	return n.type === "pipe" && n.in._zod.traits.has("$ZodTransform")
		? Vm(n.out)
		: n.type === "catch"
			? Vm(n.innerType)
			: e._zod.optin;
}
var mz = (e, n, i, o) => {
		const u = i,
			l = e._zod.def,
			f = l.shape;
		if (Object.getOwnPropertySymbols(f).length && Fi(e, n, u, o, "Symbol keys cannot be represented in JSON Schema"))
			return;
		((u.type = "object"), (u.properties = {}));
		for (const m in f) Pa(u.properties, m, fn(f[m], n, { ...o, path: [...o.path, "properties", m] }));
		const h = [];
		for (const m of Object.keys(f)) {
			const g = l.shape[m];
			(n.io === "input" ? Vm(g) === void 0 : g._zod.optout === void 0) && h.push(m);
		}
		(h.length > 0 && (u.required = h),
			l.catchall?._zod.def.type === "never"
				? (u.additionalProperties = !1)
				: l.catchall
					? l.catchall &&
						(u.additionalProperties = fn(l.catchall, n, { ...o, path: [...o.path, "additionalProperties"] }))
					: n.io === "output" && (u.additionalProperties = !1));
	},
	gz = (e, n, i, o) => {
		const u = e._zod.def,
			l = u.inclusive === !1,
			f = u.options.map((h, m) => fn(h, n, { ...o, path: [...o.path, l ? "oneOf" : "anyOf", m] }));
		l ? (i.oneOf = f) : (i.anyOf = f);
	},
	vz = (e, n, i, o) => {
		const u = e._zod.def,
			l = fn(u.left, n, { ...o, path: [...o.path, "allOf", 0] }),
			f = fn(u.right, n, { ...o, path: [...o.path, "allOf", 1] }),
			h = (g) => "allOf" in g && Object.keys(g).length === 1,
			m = [...(h(l) ? l.allOf : [l]), ...(h(f) ? f.allOf : [f])];
		((i.allOf = m), n.intersections.push(m));
	},
	yz = (e, n, i, o) => {
		const u = e._zod.def,
			l = fn(u.innerType, n, o),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = u.innerType), (i.nullable = !0)) : (i.anyOf = [l, { type: "null" }]);
	},
	pz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
	},
	vg = Symbol();
function QE(e, n, i, o, u) {
	let l = !1;
	const f = JSON.stringify(e, (h, m) => (typeof m != "bigint" ? m : ((l = !0), null)));
	return l ? (Fi(n, i, o, u, "BigInt defaults cannot be represented in JSON Schema"), vg) : JSON.parse(f);
}
var bz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
		const f = QE(u.defaultValue, e, n, i, o);
		f !== vg && (i.default = f);
	},
	Sz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		if (((l.ref = u.innerType), n.io !== "input")) return;
		const f = QE(u.defaultValue, e, n, i, o);
		f !== vg && (i._prefault = f);
	},
	wz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
		let f;
		try {
			f = u.catchValue(void 0);
		} catch {
			Fi(e, n, i, o, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		i.default = f;
	},
	Ez = (e, n, i, o) => {
		const u = e._zod.def,
			l = u.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (l ? u.out : u.in) : u.out;
		fn(f, n, o);
		const h = n.seen.get(e);
		h.ref = f;
	},
	_z = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		((l.ref = u.innerType), (i.readOnly = !0));
	},
	YE = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
	},
	mS = new WeakSet([Object.prototype, Error.prototype]);
function yc(e, n, i) {
	Object.defineProperty(e, n, {
		configurable: !0,
		enumerable: !1,
		get() {
			const o = i(this);
			return (Object.defineProperty(this, n, { value: o, configurable: !0, writable: !0 }), o);
		},
		set(o) {
			Object.defineProperty(this, n, { value: o, configurable: !0, writable: !0 });
		},
	});
}
var Cz = (e, n) => {
		(HR.init(e, n), (e.name = "ZodError"));
		const i = Object.getPrototypeOf(e);
		mS.has(i) ||
			(mS.add(i),
			yc(i, "format", (o) => (u) => QR(o, u)),
			yc(i, "flatten", (o) => (u) => FR(o, u)),
			yc(i, "addIssue", (o) => (u) => {
				(o.issues.push(u), (o.message = JSON.stringify(o.issues, Im, 2)));
			}),
			yc(i, "addIssues", (o) => (u) => {
				(o.issues.push(...u), (o.message = JSON.stringify(o.issues, Im, 2)));
			}),
			Object.defineProperty(i, "isEmpty", {
				configurable: !0,
				enumerable: !1,
				get() {
					return this.issues.length === 0;
				},
			}));
	},
	ur = se("ZodError", Cz, void 0, { Parent: Error }),
	Tz = lg(ur),
	xz = cg(ur),
	Oz = fg(ur),
	Az = dg(ur),
	Rz = WR(ur),
	Nz = eN(ur),
	Mz = tN(ur),
	Dz = nN(ur),
	zz = rN(ur),
	Iz = iN(ur),
	jz = aN(ur),
	kz = oN(ur);
function qz() {
	kr.localeError || Xi(iD());
}
function yg() {
	kr.memoizer || Xi({ memoizer: tD() });
}
var jt = se("ZodType", (e, n) => (qz(), It.init(e, n), (e.def = n), (e.type = n.type), e), {
		check(...e) {
			const n = this.def;
			return this.clone(
				Hn(n, {
					checks: [
						...(n.checks ?? []),
						...e.map((i) =>
							typeof i == "function" ? { _zod: { check: i, def: { check: "custom" }, onattach: [] } } : i,
						),
					],
				}),
				{ parent: !0 },
			);
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, n) {
			return Gi(this, e, n);
		},
		brand() {
			return this;
		},
		register(e, n) {
			return (e.add(this, n), this);
		},
		refine(e, n) {
			return this.check(k2(e, n));
		},
		superRefine(e, n) {
			return this.check(q2(e, n));
		},
		overwrite(e) {
			return this.check(ts(e));
		},
		optional() {
			return pS(this);
		},
		exactOptional() {
			return _2(this);
		},
		nullable() {
			return bS(this);
		},
		nullish() {
			return pS(bS(this));
		},
		nonoptional(e) {
			return R2(this, e);
		},
		array() {
			return h2(this);
		},
		or(e) {
			return v2([this, e]);
		},
		and(e) {
			return p2(this, e);
		},
		transform(e) {
			return SS(this, E2(e));
		},
		default(e) {
			return x2(this, e);
		},
		prefault(e) {
			return A2(this, e);
		},
		catch(e) {
			return M2(this, e);
		},
		pipe(e) {
			return SS(this, e);
		},
		readonly() {
			return I2(this);
		},
		describe(e) {
			const n = this.clone();
			return (iu.add(n, { description: e }), n);
		},
		meta(...e) {
			if (e.length === 0) return iu.get(this);
			const n = this.clone();
			return (iu.add(n, e[0]), n);
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(e, ...n) {
			return n.length === 0 ? e(this) : e(this, ...n);
		},
		get "~standard"() {
			return vE(this, "~standard", {
				...CE(this),
				jsonSchema: { input: Lc(this, "input"), output: Lc(this, "output") },
			});
		},
		set "~standard"(e) {
			Zi(this, "~standard", e);
		},
		parse: function e(n, i) {
			return Tz(this, n, i, { callee: e });
		},
		parseAsync: async function e(n, i) {
			return await xz(this, n, i, { callee: e });
		},
		safeParse(e, n) {
			return Oz(this, e, n);
		},
		async safeParseAsync(e, n) {
			return Az(this, e, n);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			Zi(this, "spa", e);
		},
		validate(e, n) {
			return GR(this, e, n);
		},
		validateAsync(e, n) {
			return JR(this, e, n);
		},
		encode: function e(n, i) {
			return Rz(this, n, i, { callee: e });
		},
		decode: function e(n, i) {
			return Nz(this, n, i, { callee: e });
		},
		encodeAsync: async function e(n, i) {
			return await Mz(this, n, i, { callee: e });
		},
		decodeAsync: async function e(n, i) {
			return await Dz(this, n, i, { callee: e });
		},
		safeEncode(e, n) {
			return zz(this, e, n);
		},
		safeDecode(e, n) {
			return Iz(this, e, n);
		},
		async safeEncodeAsync(e, n) {
			return jz(this, e, n);
		},
		async safeDecodeAsync(e, n) {
			return kz(this, e, n);
		},
		toJSONSchema(e) {
			return ez(this, {})(e);
		},
		get description() {
			return iu.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		},
	}),
	KE = se(
		"_ZodString",
		(e, n) => {
			(mg.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => az(e, i, o, u)));
		},
		yE(
			{
				format: (e) => Ir(e).format ?? null,
				minLength: (e) => Ir(e).minimum ?? null,
				maxLength: (e) => Ir(e).maximum ?? null,
			},
			{
				regex(...e) {
					return this.check(LD(...e));
				},
				includes(...e) {
					return this.check(BD(...e));
				},
				startsWith(...e) {
					return this.check(PD(...e));
				},
				endsWith(...e) {
					return this.check($D(...e));
				},
				min(...e) {
					return this.check(qc(...e));
				},
				max(...e) {
					return this.check(kE(...e));
				},
				length(...e) {
					return this.check(qE(...e));
				},
				nonempty(...e) {
					return this.check(qc(1, ...e));
				},
				lowercase(e) {
					return this.check(UD(e));
				},
				uppercase(e) {
					return this.check(VD(e));
				},
				trim() {
					return this.check(ZD());
				},
				normalize(...e) {
					return this.check(HD(...e));
				},
				toLowerCase() {
					return this.check(FD());
				},
				toUpperCase() {
					return this.check(QD());
				},
				slugify() {
					return this.check(YD());
				},
			},
		),
	),
	Lz = se(
		"ZodString",
		(e, n) => {
			(mg.init(e, n), KE.init(e, n));
		},
		{
			email(e) {
				return this.check(uD(Hz, e));
			},
			url(e) {
				return this.check(mD(Fz, e));
			},
			jwt(e) {
				return this.check(RD(s2, e));
			},
			emoji(e) {
				return this.check(gD(Qz, e));
			},
			guid(e) {
				return this.check(lD(Zz, e));
			},
			uuid(e) {
				return this.check(cD(pc, e));
			},
			uuidv4(e) {
				return this.check(fD(pc, e));
			},
			uuidv6(e) {
				return this.check(dD(pc, e));
			},
			uuidv7(e) {
				return this.check(hD(pc, e));
			},
			nanoid(e) {
				return this.check(vD(Yz, e));
			},
			cuid(e) {
				return this.check(yD(Kz, e));
			},
			cuid2(e) {
				return this.check(pD(Gz, e));
			},
			ulid(e) {
				return this.check(bD(Xz, e));
			},
			base64(e) {
				return this.check(xD(i2, e));
			},
			base64url(e) {
				return this.check(OD(a2, e));
			},
			xid(e) {
				return this.check(SD(Jz, e));
			},
			ksuid(e) {
				return this.check(wD(Wz, e));
			},
			ipv4(e) {
				return this.check(ED(e2, e));
			},
			ipv6(e) {
				return this.check(_D(t2, e));
			},
			cidrv4(e) {
				return this.check(CD(n2, e));
			},
			cidrv6(e) {
				return this.check(TD(r2, e));
			},
			e164(e) {
				return this.check(AD(o2, e));
			},
			datetime(e) {
				return this.check(ND(Vz, e));
			},
			date(e) {
				return this.check(MD(Bz, e));
			},
			time(e) {
				return this.check(DD(Pz, e));
			},
			duration(e) {
				return this.check(zD($z, e));
			},
		},
	);
function Uz(e) {
	return sD(Lz, e);
}
var Ot = se("ZodStringFormat", (e, n) => {
		(Et.init(e, n), KE.init(e, n));
	}),
	Vz = se("ZodISODateTime", (e, n) => {
		(dM.init(e, n), Ot.init(e, n));
	}),
	Bz = se("ZodISODate", (e, n) => {
		(hM.init(e, n), Ot.init(e, n));
	}),
	Pz = se("ZodISOTime", (e, n) => {
		(mM.init(e, n), Ot.init(e, n));
	}),
	$z = se("ZodISODuration", (e, n) => {
		(gM.init(e, n), Ot.init(e, n));
	}),
	Hz = se("ZodEmail", (e, n) => {
		(JN.init(e, n), Ot.init(e, n));
	}),
	Zz = se("ZodGUID", (e, n) => {
		(GN.init(e, n), Ot.init(e, n));
	}),
	pc = se("ZodUUID", (e, n) => {
		(XN.init(e, n), Ot.init(e, n));
	}),
	Fz = se("ZodURL", (e, n) => {
		(iM.init(e, n), Ot.init(e, n));
	}),
	Qz = se("ZodEmoji", (e, n) => {
		(aM.init(e, n), Ot.init(e, n));
	}),
	Yz = se("ZodNanoID", (e, n) => {
		(oM.init(e, n), Ot.init(e, n));
	}),
	Kz = se("ZodCUID", (e, n) => {
		(sM.init(e, n), Ot.init(e, n));
	}),
	Gz = se("ZodCUID2", (e, n) => {
		(uM.init(e, n), Ot.init(e, n));
	}),
	Xz = se("ZodULID", (e, n) => {
		(lM.init(e, n), Ot.init(e, n));
	}),
	Jz = se("ZodXID", (e, n) => {
		(cM.init(e, n), Ot.init(e, n));
	}),
	Wz = se("ZodKSUID", (e, n) => {
		(fM.init(e, n), Ot.init(e, n));
	}),
	e2 = se("ZodIPv4", (e, n) => {
		(vM.init(e, n), Ot.init(e, n));
	}),
	t2 = se("ZodIPv6", (e, n) => {
		(pM.init(e, n), Ot.init(e, n));
	}),
	n2 = se("ZodCIDRv4", (e, n) => {
		(bM.init(e, n), Ot.init(e, n));
	}),
	r2 = se("ZodCIDRv6", (e, n) => {
		(wM.init(e, n), Ot.init(e, n));
	}),
	i2 = se("ZodBase64", (e, n) => {
		(EM.init(e, n), Ot.init(e, n));
	}),
	a2 = se("ZodBase64URL", (e, n) => {
		(CM.init(e, n), Ot.init(e, n));
	}),
	o2 = se("ZodE164", (e, n) => {
		(TM.init(e, n), Ot.init(e, n));
	}),
	s2 = se("ZodJWT", (e, n) => {
		(OM.init(e, n), Ot.init(e, n));
	}),
	GE = se(
		"ZodNumber",
		(e, n) => {
			(RE.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => oz(e, i, o, u)), (e.isFinite = !0));
		},
		yE(
			{
				minValue: (e) => {
					const { minimum: n, exclusiveMinimum: i } = Ir(e);
					return Math.max(n ?? Number.NEGATIVE_INFINITY, i ?? Number.NEGATIVE_INFINITY);
				},
				maxValue: (e) => {
					const { maximum: n, exclusiveMaximum: i } = Ir(e);
					return Math.min(n ?? Number.POSITIVE_INFINITY, i ?? Number.POSITIVE_INFINITY);
				},
				isInt: (e) => {
					const { isInt: n, multipleOf: i } = Ir(e);
					return !!n || !!i?.some(Number.isSafeInteger);
				},
				format: (e) => Ir(e).format ?? null,
			},
			{
				gt(e, n) {
					return this.check(aS(e, n));
				},
				gte(e, n) {
					return this.check(mm(e, n));
				},
				min(e, n) {
					return this.check(mm(e, n));
				},
				lt(e, n) {
					return this.check(iS(e, n));
				},
				lte(e, n) {
					return this.check(hm(e, n));
				},
				max(e, n) {
					return this.check(hm(e, n));
				},
				int(e) {
					return this.check(gS(e));
				},
				safe(e) {
					return this.check(gS(e));
				},
				positive(e) {
					return this.check(aS(0, e));
				},
				nonnegative(e) {
					return this.check(mm(0, e));
				},
				negative(e) {
					return this.check(iS(0, e));
				},
				nonpositive(e) {
					return this.check(hm(0, e));
				},
				multipleOf(e, n) {
					return this.check(oS(e, n));
				},
				step(e, n) {
					return this.check(oS(e, n));
				},
				finite() {
					return this;
				},
			},
		),
	);
function gm(e) {
	return ID(GE, e);
}
var u2 = se("ZodNumberFormat", (e, n) => {
	(AM.init(e, n), GE.init(e, n));
});
function gS(e) {
	return jD(u2, e);
}
var l2 = se("ZodUnknown", (e, n) => {
	(RM.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => uz(e, i, o, u)));
});
function vS() {
	return kD(l2);
}
var c2 = se("ZodNever", (e, n) => {
	(NM.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => sz(e, i, o, u)));
});
function f2(e) {
	return qD(c2, e);
}
var d2 = se(
	"ZodArray",
	(e, n) => {
		(yg(),
			zM.init(e, n),
			jt.init(e, n),
			(e._zod.processJSONSchema = (i, o, u) => hz(e, i, o, u)),
			(e.element = n.element));
	},
	{
		min(e, n) {
			return this.check(qc(e, n));
		},
		nonempty(e) {
			return this.check(qc(1, e));
		},
		max(e, n) {
			return this.check(kE(e, n));
		},
		length(e, n) {
			return this.check(qE(e, n));
		},
		unwrap() {
			return this.element;
		},
	},
);
function h2(e, n) {
	return KD(d2, e, n);
}
var m2 = se(
	"ZodObject",
	(e, n) => {
		(yg(),
			kM.init(e, n),
			jt.init(e, n),
			(e._zod.processJSONSchema = (i, o, u) => mz(e, i, o, u)),
			kR(e, "shape", (i) => i._zod.def.shape, !1));
	},
	{
		keyof() {
			return XE(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone(Hn(this._zod.def, { catchall: e }));
		},
		passthrough() {
			return this.clone(Hn(this._zod.def, { catchall: vS() }));
		},
		loose() {
			return this.clone(Hn(this._zod.def, { catchall: vS() }));
		},
		strict() {
			return this.clone(Hn(this._zod.def, { catchall: f2() }));
		},
		strip() {
			return this.clone(Hn(this._zod.def, { catchall: void 0 }));
		},
		extend(e) {
			return TR(this, e);
		},
		safeExtend(e) {
			return xR(this, e);
		},
		merge(e) {
			return OR(this, e);
		},
		pick(e) {
			return _R(this, e);
		},
		omit(e) {
			return CR(this, e);
		},
		partial(...e) {
			return Vb(JE, this, e[0]);
		},
		exactPartial(...e) {
			return Vb(WE, this, e[0], "exactPartial");
		},
		required(...e) {
			return AR(e_, this, e[0]);
		},
	},
);
function yS(e, n) {
	const i = { type: "object", shape: e ?? {}, ...De(n) };
	return new m2(i);
}
var g2 = se("ZodUnion", (e, n) => {
	(qM.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => gz(e, i, o, u)), (e.options = n.options));
});
function v2(e, n) {
	return new g2({ type: "union", options: e, ...De(n) });
}
var y2 = se("ZodIntersection", (e, n) => {
	(LM.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => vz(e, i, o, u)));
});
function p2(e, n) {
	return new y2({ type: "intersection", left: e, right: n });
}
var Bm = se("ZodEnum", (e, n) => {
	(UM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (o, u, l) => lz(e, o, u, l)),
		(e.enum = n.entries),
		(e.options = [...e._zod.values]));
	const i = new Set(Object.keys(n.entries));
	((e.extract = (o, u) => {
		const l = {};
		for (const f of o)
			if (i.has(f)) l[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Bm({ ...n, checks: [], ...De(u), entries: l });
	}),
		(e.exclude = (o, u) => {
			const l = { ...n.entries };
			for (const f of o)
				if (i.has(f)) delete l[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Bm({ ...n, checks: [], ...De(u), entries: l });
		}));
});
function XE(e, n) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((o) => [o, o])) : e;
	return new Bm({ type: "enum", entries: i, ...De(n) });
}
var b2 = se("ZodLiteral", (e, n) => {
	(VM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => cz(e, i, o, u)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function S2(e, n) {
	return new b2({ type: "literal", values: Array.isArray(e) ? e : [e], ...De(n) });
}
var w2 = se("ZodTransform", (e, n) => {
	(yg(),
		BM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => dz(e, i, o, u)),
		(e._zod.parse = (i, o) => {
			if (o.direction === "backward") throw new pE(e.constructor.name);
			i.addIssue = (l) => {
				if (typeof l == "string") i.issues.push(gu(l, i.value, n));
				else {
					const f = l;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						"input" in f || (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(gu(f)));
				}
			};
			const u = n.transform(i.value, i);
			return u instanceof Promise ? u.then((l) => ((i.value = l), i)) : ((i.value = u), i);
		}));
});
function E2(e) {
	return new w2({ type: "transform", transform: e });
}
var JE = se("ZodOptional", (e, n) => {
	(DE.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => YE(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function pS(e) {
	return new JE({ type: "optional", innerType: e });
}
var WE = se("ZodExactOptional", (e, n) => {
	(PM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => YE(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function _2(e) {
	return new WE({ type: "optional", innerType: e });
}
var C2 = se("ZodNullable", (e, n) => {
	($M.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => yz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function bS(e) {
	return new C2({ type: "nullable", innerType: e });
}
var T2 = se("ZodDefault", (e, n) => {
	(HM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => bz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function x2(e, n) {
	return new T2({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : fE(n);
		},
	});
}
var O2 = se("ZodPrefault", (e, n) => {
	(ZM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => Sz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function A2(e, n) {
	return new O2({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : fE(n);
		},
	});
}
var e_ = se("ZodNonOptional", (e, n) => {
	(FM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => pz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function R2(e, n) {
	return new e_({ type: "nonoptional", innerType: e, ...De(n) });
}
var N2 = se("ZodCatch", (e, n) => {
	(QM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => wz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function M2(e, n) {
	return new N2({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : LR(n) });
}
var D2 = se("ZodPipe", (e, n) => {
	(YM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => Ez(e, i, o, u)),
		(e.in = n.in),
		(e.out = n.out));
});
function SS(e, n) {
	return new D2({ type: "pipe", in: e, out: n });
}
var z2 = se("ZodReadonly", (e, n) => {
	(KM.init(e, n),
		jt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => _z(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function I2(e) {
	return new z2({ type: "readonly", innerType: e });
}
var j2 = se("ZodCustom", (e, n) => {
	(GM.init(e, n), jt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => fz(e, i, o, u)));
});
function k2(e, n = {}) {
	return GD(j2, e, n);
}
function q2(e, n) {
	return XD(e, n);
}
var L2 = "Getting the member list ready… Chitchat will open by itself.";
function U2(e) {
	const n = new eE("https://exuberant-hippopotamus-790.convex.cloud", { authRefreshTokenLeewaySeconds: 15 });
	let i = { phase: "connecting", message: null, deadline: 0, refreshing: !1 };
	const o = new Set();
	let u = null,
		l = null,
		f = null,
		h = null,
		m = null,
		g = 0,
		p = !1,
		b = !1,
		y = null;
	function w(z) {
		if (!p) {
			i = { ...i, ...z };
			for (const M of o) M();
		}
	}
	function E(z) {
		((b = z),
			z && performance.now() < i.deadline
				? w({ phase: "ready", message: null })
				: !l &&
					i.phase !== "denied" &&
					i.phase !== "syncing" &&
					w({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }));
	}
	function T() {
		p ||
			l ||
			((u = null),
			m && clearTimeout(m),
			(m = null),
			i.phase !== "syncing" && w({ phase: "connecting", message: null }),
			n.setAuth(x, E));
	}
	function x(z) {
		return !z.forceRefreshToken && u && performance.now() < i.deadline
			? Promise.resolve(u)
			: l ||
					(w({ refreshing: !0 }),
					(l = (async () => {
						const M = performance.now();
						f = new AbortController();
						const A = setTimeout(() => f?.abort(), 25e3);
						let N = null;
						try {
							const D = await e.getToken(),
								k = "https://exuberant-hippopotamus-790.convex.site/auth/lease",
								O = {
									method: "POST",
									redirect: "error",
									headers: { "Content-Type": "application/json" },
									signal: f.signal,
								};
							let L = await fetch(k, { ...O, body: JSON.stringify({ pressToken: D }) });
							if (L.status === 401) {
								const P = await e.refreshToken();
								L = await fetch(k, { ...O, body: JSON.stringify({ pressToken: P }) });
							}
							const H = await L.json(),
								te = yS({ jwt: Uz(), expiresAt: gm(), validForMs: gm().min(0).max(3e4) }).safeParse(H),
								R = yS({ code: S2("syncing"), phase: XE(["members", "events"]), retryAfterMs: gm() }).safeParse(H);
							if (
								((y = L.status === 503 && R.success ? (y ?? performance.now()) : null),
								R.success && y !== null && performance.now() - y < 12e4)
							)
								throw (
									(N = Math.min(3e4, Math.max(1e3, R.data.retryAfterMs))),
									w({ phase: "syncing", message: L2 }),
									new Error("Chitchat access is syncing")
								);
							if (!L.ok || !te.success) {
								const P = L.status === 401 || L.status === 403;
								throw (
									w({
										phase: P ? "denied" : "unavailable",
										message: P
											? "Bonobo Senate no longer allows this Chitchat session."
											: "Chitchat is reconnecting. Your draft is kept.",
									}),
									new Error("Chitchat lease was refused")
								);
							}
							const q = M + te.data.validForMs;
							if (q <= performance.now()) throw new Error("Chitchat lease expired in transit");
							return (
								(u = te.data.jwt),
								(g = 0),
								h && clearTimeout(h),
								(h = setTimeout(
									() => {
										((u = null),
											w({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
											l || ((b = !1), n.clearAuth(), T()));
									},
									Math.max(0, q - performance.now()),
								)),
								w({ phase: b ? "ready" : "connecting", deadline: q, message: null }),
								u
							);
						} catch {
							return (
								(u = null),
								N !== null
									? ((m = setTimeout(T, Math.min(3e4, N * 2 ** Math.min(g, 4)))), (g += 1), null)
									: (i.phase !== "denied" &&
											w({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
										!p &&
											i.phase !== "denied" &&
											((g += 1), (m = setTimeout(T, Math.min(3e4, 2e3 * 2 ** Math.min(g, 4))))),
										null)
							);
						} finally {
							(clearTimeout(A), (f = null), (l = null), w({ refreshing: !1 }));
						}
					})()),
					l);
	}
	return {
		convex: n,
		start: () => n.setAuth(x, E),
		retry: () => {
			((y = null), T());
		},
		getSnapshot: () => i,
		subscribe: (z) => (
			o.add(z),
			() => {
				o.delete(z);
			}
		),
		can_request_now: () =>
			i.phase === "ready" &&
			!i.refreshing &&
			performance.now() < i.deadline &&
			n.connectionState().isWebSocketConnected,
		close: () => {
			((p = !0), f?.abort(), h && clearTimeout(h), m && clearTimeout(m), o.clear(), n.close());
		},
	};
}
var t_ = (0, _.createContext)(null);
function V2(e) {
	const [n] = (0, _.useState)(() => U2(e.client));
	return (
		(0, _.useEffect)(() => {
			n.start();
			const i = () => {
				const o = n.getSnapshot().phase;
				o !== "ready" && o !== "syncing" && n.retry();
			};
			return (
				window.addEventListener("online", i),
				window.addEventListener("focus", i),
				() => {
					(window.removeEventListener("online", i), window.removeEventListener("focus", i), n.close());
				}
			);
		}, [n]),
		(0, S.jsx)(t_.Provider, { value: n, children: (0, S.jsx)(kA, { client: n.convex, children: e.children }) })
	);
}
function vr() {
	const e = (0, _.useContext)(t_);
	if (!e) throw new Error("Chitchat needs its session provider");
	const n = (0, _.useSyncExternalStore)(e.subscribe, e.getSnapshot),
		i = qA(),
		o = n.phase === "ready" && performance.now() < n.deadline,
		u = Po(ze.sessions.current, o ? {} : "skip"),
		l = Po(ze.sessions.status, o ? {} : "skip"),
		[f, h] = (0, _.useState)(u);
	(u && f !== u && h(u), (l === "denied" || n.phase === "denied") && f !== void 0 && h(void 0));
	const m = o && l === "refresh_required",
		g = m ? f : u,
		p = o && l === "ready" && u !== null && u !== void 0;
	return {
		member: g,
		ready: p,
		connection:
			n.phase === "denied" || l === "denied"
				? "denied"
				: n.phase === "syncing"
					? "syncing"
					: p
						? "ready"
						: "reconnecting",
		connected: o && l === "ready" && i.isWebSocketConnected,
		refreshing: m,
		canSend: o && l === "ready" && !!u?.canWrite && !n.refreshing && i.isWebSocketConnected,
		can_request_now: e.can_request_now,
		message:
			n.message ??
			(l === "denied"
				? "Your Chitchat access changed. Reconnect to continue."
				: o && !i.isWebSocketConnected
					? "Chitchat is disconnected. Your draft is kept."
					: null),
		retry: e.retry,
	};
}
function n_(e) {
	const n = vr(),
		i = zr(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		o = pt(n, ze.members.list, { paginationOpts: { numItems: 100, cursor: i.cursor } });
	return (0, S.jsxs)(S.Fragment, {
		children: [
			o
				? (0, S.jsx)("ul", {
						className: "people-list",
						children: o.page
							.filter((u) => u.userId !== e.selfUserId)
							.map((u) =>
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
												oE(u.displayName),
											],
										}),
									},
									u.userId,
								),
							),
					})
				: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			o?.page.length === 0
				? (0, S.jsx)("p", { className: "channel-status", children: "No people on this page." })
				: null,
			(0, S.jsx)(si, { page: i, result: o, label: "People" }),
		],
	});
}
function wS(e) {
	const n = Ba(),
		i = vr(),
		o = (0, _.useId)(),
		u = (0, _.useId)(),
		l = (0, _.useId)(),
		f = (0, _.useId)(),
		h = pt(i, ze.channels.permissions, e.channel ? { channelId: e.channel._id } : "skip"),
		[m, g] = (0, _.useState)(e.channel?.name ?? ""),
		[p, b] = (0, _.useState)(e.channel?.topic ?? ""),
		[y, w] = (0, _.useState)(!1),
		[E, T] = (0, _.useState)([]),
		[x, z] = (0, _.useState)(null),
		[M, A] = (0, _.useState)(!1),
		[N, D] = (0, _.useState)(null),
		k = M || x !== null,
		O = async () => {
			if (M) return;
			if (!i.can_request_now()) {
				D("Reconnect before saving. Your changes are kept.");
				return;
			}
			if (m.trim().length === 0 || m.trim().length > 64 || p.trim().length > 250) {
				D("Use a name of 1–64 characters and a topic of at most 250 characters.");
				return;
			}
			const L =
				x ??
				(e.channel
					? {
							kind: "rename",
							args: {
								channelId: e.channel._id,
								expectedRevision: e.channel.revision,
								clientRequestId: crypto.randomUUID(),
								name: m.trim(),
								topic: p.trim(),
							},
						}
					: {
							kind: "create",
							args: {
								clientRequestId: crypto.randomUUID(),
								name: m.trim(),
								topic: p.trim(),
								visibility: y ? "private" : "public",
								invitedUserIds: y ? E : [],
							},
						});
			(z(L), A(!0), D(null));
			try {
				const H =
					L.kind === "create"
						? await n.mutation(ze.channels.create, L.args)
						: await n.mutation(ze.channels.update, L.args);
				if (H._nay) {
					(z(null), D(H._nay.message));
					return;
				}
				H._yay.kind === "channel" && e.onSaved(H._yay.channelId);
			} catch {
				D("The save may have reached Chitchat. Retry to check the same request.");
			} finally {
				A(!1);
			}
		};
	return (0, S.jsxs)(Wo, {
		labelledBy: o,
		accessUnavailable: !i.refreshing && (!i.ready || (e.channel !== null && h === null)),
		onReconnect: i.retry,
		onClose: () => {
			M || e.onClose();
		},
		children: [
			(0, S.jsx)("h2", {
				id: o,
				className: "dialog-title",
				children: e.channel ? `Rename #${e.channel.name}` : "Create channel",
			}),
			(0, S.jsxs)("form", {
				onSubmit: (L) => {
					(L.preventDefault(), O());
				},
				onKeyDown: (L) => {
					L.key === "Enter" && L.nativeEvent.isComposing && L.preventDefault();
				},
				children: [
					(0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsx)("label", { htmlFor: u, children: "Channel name" }),
							(0, S.jsx)("input", {
								id: u,
								"data-dialog-initial": !0,
								value: m,
								required: !0,
								maxLength: 64,
								disabled: k,
								"aria-describedby": N ? f : void 0,
								onInput: (L) => g(L.currentTarget.value),
							}),
						],
					}),
					(0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsx)("label", { htmlFor: l, children: "Topic (optional)" }),
							(0, S.jsx)("input", {
								id: l,
								value: p,
								maxLength: 250,
								disabled: k,
								onInput: (L) => b(L.currentTarget.value),
							}),
						],
					}),
					e.channel
						? null
						: (0, S.jsxs)("div", {
								className: "field",
								children: [
									(0, S.jsxs)("label", {
										className: "checkbox-label",
										children: [
											(0, S.jsx)("input", {
												type: "checkbox",
												checked: y,
												disabled: k,
												onChange: (L) => w(L.currentTarget.checked),
											}),
											"Private channel",
										],
									}),
									y
										? (0, S.jsxs)(S.Fragment, {
												children: [
													(0, S.jsx)("p", { className: "field-note", children: ig }),
													(0, S.jsx)("p", {
														className: "field-note",
														children:
															"Tick one person for a direct message, or several for a group. Up to 50 people can join.",
													}),
													(0, S.jsx)(n_, {
														selfUserId: e.selfUserId,
														selected: E,
														disabled: k,
														onToggle: (L, H) => T((te) => (H ? [...te, L] : te.filter((R) => R !== L))),
													}),
													(0, S.jsxs)("p", {
														className: "field-note",
														children: [E.length + 1, " people selected, including you."],
													}),
												],
											})
										: null,
								],
							}),
					N ? (0, S.jsx)("p", { id: f, className: "form-error", role: "alert", children: N }) : null,
					(0, S.jsxs)("div", {
						className: "dialog-actions",
						children: [
							(0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: M,
								onClick: e.onClose,
								children: x ? "Stop checking" : "Cancel",
							}),
							(0, S.jsx)("button", {
								type: "submit",
								className: "button button-primary",
								disabled: M || !(x ? i.connected : i.canSend),
								children: M ? "Saving…" : x ? "Retry" : e.channel ? "Rename" : "Create",
							}),
						],
					}),
				],
			}),
		],
	});
}
function B2(e) {
	const n = Ba(),
		i = vr(),
		o = (0, _.useId)(),
		[u, l] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, g] = (0, _.useState)(null),
		p = pt(i, ze.channels.get, { channelId: e.channelId }),
		b = pt(i, ze.channels.list_members, { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } }),
		y = pt(i, ze.channels.permissions, { channelId: e.channelId }),
		w = pt(i, ze.members.resolve, b ? { userIds: b.page.map((M) => M.hostUserId) } : "skip"),
		E = pt(i, ze.channel_members.status, u ? { channelId: e.channelId, clientRequestId: u.clientRequestId } : "skip"),
		T = E?.status === "pending";
	(0, _.useEffect)(() => {
		(E?.status === "complete" && (l(null), g(null)),
			E?.status === "cancelled" &&
				(l(null), g("Access changed before this request finished. Check the people list and try again.")));
	}, [E]);
	const x = async (M) => {
			if (!(f || T)) {
				if (!i.can_request_now()) {
					g("Reconnect before changing channel access.");
					return;
				}
				(l(M), h(!0), g(null));
				try {
					const A = await n.mutation(ze.channel_members.change, M);
					A._nay && (l(null), g(A._nay.message));
				} catch {
					g("This change may have reached Chitchat. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		z = (M, A) => {
			b &&
				x({
					channelId: e.channelId,
					clientRequestId: crypto.randomUUID(),
					expectedMembershipRevision: b.membershipRevision,
					expectedPrincipalCount: b.memberCount,
					hostUserId: M,
					level: A,
				});
		};
	return (0, S.jsxs)(Wo, {
		labelledBy: o,
		accessUnavailable: !i.refreshing && (!i.ready || y === null),
		onReconnect: i.retry,
		onClose: () => {
			f || e.onClose();
		},
		children: [
			(0, S.jsx)("h2", { id: o, className: "dialog-title", children: p ? `People in #${p.name}` : "Channel access" }),
			(0, S.jsx)("p", { className: "field-note", children: ig }),
			T
				? (0, S.jsx)("p", { role: "status", children: "Updating channel and transcript access…" })
				: b
					? (0, S.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: b.page.map((M) =>
								(0, S.jsxs)(
									"li",
									{
										className: "people-item",
										children: [
											(0, S.jsxs)("span", {
												children: [
													w?.[M.hostUserId] ?? "Unnamed member",
													M.level === "manage" ? " (can add people)" : M.level === "read" ? " (can read)" : "",
												],
											}),
											y?.canManage && M.hostUserId !== e.selfUserId
												? (0, S.jsxs)(S.Fragment, {
														children: [
															(0, S.jsxs)("select", {
																"aria-label": `Access for ${w?.[M.hostUserId] ?? "member"}`,
																value: M.level,
																disabled: f || u !== null,
																onChange: (A) => {
																	const N = A.currentTarget.value;
																	(N === "read" || N === "write" || N === "manage") && z(M.hostUserId, N);
																},
																children: [
																	(0, S.jsx)("option", { value: "read", children: "Can read" }),
																	(0, S.jsx)("option", { value: "write", children: "Can write" }),
																	(0, S.jsx)("option", { value: "manage", children: "Can add people" }),
																],
															}),
															(0, S.jsx)("button", {
																type: "button",
																className: "button",
																disabled: f || u !== null,
																onClick: () => z(M.hostUserId, null),
																children: "Remove",
															}),
														],
													})
												: null,
										],
									},
									M.hostUserId,
								),
							),
						})
					: (0, S.jsx)("p", {
							className: "channel-status",
							role: "status",
							children: b === null ? "The people list is not currently available." : "Loading people…",
						}),
			y?.canManage && b
				? (0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, S.jsx)(n_, {
								selfUserId: e.selfUserId,
								selected: b.page.map((M) => M.hostUserId),
								disabled: f || u !== null,
								onToggle: (M, A) => z(M, A ? "write" : null),
							}),
						],
					})
				: null,
			m ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					u && !T
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !i.canSend,
								onClick: () => void x(u),
								children: "Retry",
							})
						: null,
					(0, S.jsx)("button", {
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
function P2(e) {
	const n = Ba(),
		i = vr(),
		o = (0, _.useId)(),
		[u] = (0, _.useState)(() => crypto.randomUUID()),
		[l, f] = (0, _.useState)(!1),
		[h, m] = (0, _.useState)(!1),
		[g, p] = (0, _.useState)(null),
		b = e.action === "leave" || e.action === "delete",
		y = pt(i, ze.channels.permissions, { channelId: e.channel._id }),
		w = pt(i, ze.channel_members.status, h && b ? { channelId: e.channel._id, clientRequestId: u } : "skip"),
		E = w?.status === "pending";
	(0, _.useEffect)(() => {
		(w?.status === "complete" && e.onDone(),
			w?.status === "cancelled" && p("Access changed before this request finished. Close this dialog and try again."));
	}, [w, e.onDone]);
	const T =
			e.action === "archive"
				? "Archive"
				: e.action === "unarchive"
					? "Unarchive"
					: e.action === "leave"
						? "Leave"
						: "Delete",
		x = async () => {
			if (!(l || E)) {
				if (!i.can_request_now()) {
					p("Reconnect before changing this channel.");
					return;
				}
				(f(!0), m(!0), p(null));
				try {
					const M =
						e.action === "archive" || e.action === "unarchive"
							? await n.mutation(ze.channels.archive, {
									channelId: e.channel._id,
									clientRequestId: u,
									expectedRevision: e.channel.revision,
									archived: e.action === "archive",
								})
							: e.action === "leave"
								? await n.mutation(ze.channel_members.leave, {
										channelId: e.channel._id,
										clientRequestId: u,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									})
								: await n.mutation(ze.channel_members.delete_channel, {
										channelId: e.channel._id,
										clientRequestId: u,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									});
					if (M._nay) {
						(m(!1), p(M._nay.message));
						return;
					}
					(M._yay.kind !== "membership" || !M._yay.pending) && e.onDone();
				} catch {
					p("This change may have reached Chitchat. Retry to check the same request.");
				} finally {
					f(!1);
				}
			}
		},
		z = e.action === "delete" || (e.action === "leave" && e.channel.memberCount === 1);
	return (0, S.jsxs)(Wo, {
		labelledBy: o,
		accessUnavailable: !i.refreshing && (!i.ready || y === null),
		onReconnect: i.retry,
		onClose: () => {
			l || e.onClose();
		},
		children: [
			(0, S.jsxs)("h2", {
				id: o,
				className: "dialog-title",
				children: [T, " #", e.channel.name, e.action === "delete" ? " for everyone" : "", "?"],
			}),
			(0, S.jsx)("p", {
				children:
					e.action === "archive"
						? "The channel is hidden from the active list. Its messages stay stored and it can be unarchived any time."
						: e.action === "unarchive"
							? "The channel returns to the active list."
							: z
								? `This deletes the channel for all ${e.channel.memberCount} people in it. Nobody can open it again. Copies in Files follow their own sharing settings. This cannot be undone.`
								: "You stop seeing this channel and its messages. Other people keep it. Somebody who can add people has to add you back. Copies in Files follow their own sharing settings.",
			}),
			E ? (0, S.jsx)("p", { role: "status", children: "Updating channel and transcript access…" }) : null,
			g ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: g }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: l,
						onClick: e.onClose,
						children: E ? "Close" : "Cancel",
					}),
					(0, S.jsx)("button", {
						type: "button",
						className: `button ${z || e.action === "archive" ? "button-danger" : "button-primary"}`,
						disabled: l || E || !(e.action === "leave" || h ? i.connected : i.canSend),
						onClick: () => void x(),
						children: l ? "Saving…" : h ? "Retry" : `${T} channel`,
					}),
				],
			}),
		],
	});
}
function r_(e) {
	const n = [];
	for (const i of e) n.push(...i);
	return n;
}
function i_(e) {
	return e.slice().reverse();
}
function za(...e) {}
function uf(e, n) {
	return $2(e) ? e(H2(n) ? n() : n) : e;
}
function $2(e) {
	return typeof e == "function";
}
function H2(e) {
	return typeof e == "function";
}
function zn(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function en(...e) {
	return (...n) => {
		for (const i of e) typeof i == "function" && i(...n);
	};
}
function Pm(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function Z2(e, n) {
	const i = { ...e };
	for (const o of n) zn(i, o) && delete i[o];
	return i;
}
function F2(e, n) {
	const i = {};
	for (const o of n) zn(e, o) && (i[o] = e[o]);
	return i;
}
function a_(e) {
	return e;
}
function Q2(e = za) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function Zt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function o_(e) {
	return Object.keys(e);
}
function pg(e, ...n) {
	const i = typeof e == "function" ? e(...n) : e;
	return i == null ? !1 : !i;
}
function $a(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function s_(e) {
	return e.getAttribute("aria-disabled") === "true" || ("disabled" in e && e.disabled === !0);
}
function lf(e) {
	const n = {};
	for (const i in e) zn(e, i) && i !== "__proto__" && e[i] !== void 0 && (n[i] = e[i]);
	return n;
}
function ke(...e) {
	for (const n of e) if (n !== void 0) return n;
}
var Ji = Y2();
function Y2() {
	return typeof window < "u" && !!window.document?.createElement;
}
function u_(e, n) {
	let i = e;
	for (; i;) {
		const o = Object.getOwnPropertyDescriptor(i, n);
		if (o?.get) return o.get;
		i = Object.getPrototypeOf(i);
	}
}
var ES = Ji ? u_(Object.getPrototypeOf(window.document), "nodeType") : void 0,
	_S = Ji ? u_(Object.getPrototypeOf(window.document), "activeElement") : void 0;
function $m(e) {
	return e ? e.window === e : !1;
}
function CS(e) {
	if (!e) return !1;
	if (!ES) return e.nodeType === 9;
	try {
		return ES.call(e) === 9;
	} catch {
		return !1;
	}
}
function K2(e, n) {
	try {
		return e.document === n;
	} catch {
		return !1;
	}
}
function Ke(e) {
	if (!e) return document;
	if (CS(e)) return e;
	if ($m(e)) return e.document;
	const n = e.ownerDocument;
	return CS(n) ? n : document;
}
function ar(e) {
	if (!e) return self;
	if ($m(e)) return e;
	const n = Ke(e),
		{ defaultView: i } = n;
	return $m(i) && K2(i, n) ? i : window;
}
function Zn(e, { frame: n = !0, activeDescendant: i = !1 } = {}) {
	const o = Ke(e),
		u = _S ? _S.call(o) : o.activeElement;
	if (!u?.nodeName) return null;
	if (n && vu(u) && u.contentDocument?.body) return Zn(u.contentDocument.body, { frame: n, activeDescendant: i });
	if (i) {
		const l = u.getAttribute("aria-activedescendant");
		if (l) {
			const f = Ke(u).getElementById(l);
			if (f) return f;
		}
	}
	return u;
}
function ht(e, n) {
	return e === n || e.contains(n);
}
function Mn(e) {
	return e?.nodeType === 1;
}
function Uc(e) {
	return typeof e?.nodeType == "number";
}
function vu(e) {
	return e.tagName === "IFRAME";
}
function ka(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? G2.indexOf(e.type) !== -1 : !1;
}
var G2 = ["button", "color", "file", "image", "reset", "submit"];
function Hm(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function yr(e) {
	try {
		return e.tagName === "TEXTAREA" ? !0 : e.tagName !== "INPUT" ? !1 : e.selectionStart !== null;
	} catch {
		return !1;
	}
}
function Vc(e) {
	return e.isContentEditable || yr(e);
}
function l_(e) {
	if (yr(e)) return e.value;
	if (e.isContentEditable) {
		const n = Ke(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function Bc(e) {
	let n = 0,
		i = 0;
	if (yr(e)) ((n = e.selectionStart || 0), (i = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const o = Ke(e).getSelection();
		if (o?.rangeCount && o.anchorNode && ht(e, o.anchorNode) && o.focusNode && ht(e, o.focusNode)) {
			const u = o.getRangeAt(0),
				l = u.cloneRange();
			(l.selectNodeContents(e),
				l.setEnd(u.startContainer, u.startOffset),
				(n = l.toString().length),
				l.setEnd(u.endContainer, u.endOffset),
				(i = l.toString().length));
		}
	}
	return { start: n, end: i };
}
var X2 = ["dialog", "menu", "listbox", "tree", "grid"],
	TS = { menu: "menuitem", listbox: "option", tree: "treeitem" };
function _u(e, n) {
	const i = e?.getAttribute("role");
	return i && X2.indexOf(i) !== -1 ? i : n;
}
function c_(e) {
	if (e != null && zn(TS, e)) return TS[e];
}
function f_(e, n) {
	const i = _u(e);
	return typeof i != "string" ? n : (c_(i) ?? n);
}
function bg(e, n = {}) {
	if (!e) return null;
	const { axis: i, stopAt: o } = n;
	if (e === o) return e;
	const u = (f) => f === "auto" || f === "scroll";
	if (i !== "x" && e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: f } = getComputedStyle(e);
		if (u(f)) return e;
	}
	if (i !== "y" && e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: f } = getComputedStyle(e);
		if (u(f)) return e;
	}
	const l = Ke(e);
	return bg(e.parentElement, n) || l.scrollingElement || l.body;
}
function vm(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function J2(e, n) {
	const i = e.map((u, l) => [l, u]);
	let o = !1;
	return (
		i.sort(([u, l], [f, h]) => {
			const m = n(l),
				g = n(h);
			return m === g || !m || !g ? 0 : W2(m, g) ? (u > f && (o = !0), -1) : (u < f && (o = !0), 1);
		}),
		o ? i.map(([u, l]) => l) : e
	);
}
function W2(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function d_() {
	return Ji && !!navigator.maxTouchPoints;
}
function cf() {
	return Ji ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function Sg() {
	return Ji && cf() && /apple/i.test(navigator.vendor);
}
function eI() {
	return Ji && /firefox\//i.test(navigator.userAgent);
}
function tI() {
	return Ji && navigator.platform.startsWith("Mac") && !d_();
}
function nI(e) {
	const { currentTarget: n, target: i } = e;
	return n ? (Uc(i) ? !ht(n, i) : !0) : !1;
}
function cn(e) {
	return e.target === e.currentTarget;
}
function h_(e) {
	if (!Mn(e)) return !1;
	const n = e,
		i = n.tagName.toLowerCase();
	return i === "a" || (i === "button" && n.type === "submit") || (i === "input" && n.type === "submit");
}
function m_(e) {
	const n = cf();
	return (n && !e.metaKey) || (!n && !e.ctrlKey) ? !1 : h_(e.currentTarget);
}
function g_(e) {
	return e.altKey ? h_(e.currentTarget) : !1;
}
function rI(e, n, i) {
	const { Event: o } = ar(e),
		u = new o(n, i);
	return e.dispatchEvent(u);
}
function Uo(e, n) {
	const { FocusEvent: i } = ar(e),
		o = new i("blur", n),
		u = e.dispatchEvent(o),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new i("focusout", l)), u);
}
var iI = {
	width: !0,
	height: !0,
	pressure: !0,
	tangentialPressure: !0,
	tiltX: !0,
	tiltY: !0,
	twist: !0,
	altitudeAngle: !0,
	azimuthAngle: !0,
	isPrimary: !0,
	coalescedEvents: !0,
	predictedEvents: !0,
	persistentDeviceId: !0,
};
function aI(e, n) {
	const i = n ?? {},
		o = e.Window,
		u = typeof o == "function" && e instanceof o ? e : null;
	return new Proxy(
		{},
		{
			get(l, f) {
				if (f === "view") return u;
				if (f === "composed") return !0;
				if (f === "pointerId") return i.pointerId ?? -1;
				if (f === "pointerType") return i.pointerType ?? "";
				if (!zn(iI, f)) return Reflect.get(i, f);
			},
		},
	);
}
function xS(e, n) {
	const i = ar(e),
		o = new (i.PointerEvent ?? i.MouseEvent)("click", aI(i, n));
	return e.dispatchEvent(o);
}
function Aa(e, n) {
	const i = n || e.currentTarget,
		o = e.relatedTarget;
	return !Uc(o) || !ht(i, o);
}
function oI(e) {
	return e.type === "input";
}
function Pc(e, n, i, o) {
	const l = ((h) => {
			if (o) {
				const g = setTimeout(h, o);
				return () => clearTimeout(g);
			}
			const m = requestAnimationFrame(h);
			return () => cancelAnimationFrame(m);
		})(() => {
			(e.removeEventListener(n, f, !0), i());
		}),
		f = () => {
			(l(), i());
		};
	return (
		e.addEventListener(n, f, { once: !0, capture: !0 }),
		() => {
			(l(), e.removeEventListener(n, f, !0));
		}
	);
}
function Wt(e, n, i, o = window) {
	const u = [];
	try {
		o.document.addEventListener(e, n, i);
		for (const f of Array.from(o.frames)) u.push(Wt(e, n, i, f));
	} catch {}
	return () => {
		try {
			o.document.removeEventListener(e, n, i);
		} catch {}
		for (const f of u) f();
	};
}
var ff =
	"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function sI(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function ln(e) {
	return !(!e.matches(ff) || !Hm(e) || e.closest("[inert]"));
}
function Ko(e) {
	if (!ln(e) || sI(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const i = Zn(e);
	return !i || i === e || !("form" in i) || i.form !== e.form || !("name" in i) || i.name !== e.name;
}
function df(e, n) {
	const i = Array.from(e.querySelectorAll(ff));
	n && i.unshift(e);
	const o = i.filter(ln);
	return (
		o.forEach((u, l) => {
			if (!vu(u)) return;
			const f = u.contentDocument?.body;
			f && o.splice(l, 1, ...df(f));
		}),
		o
	);
}
function uI(e, n) {
	const [i] = df(e, n);
	return i || null;
}
function wg(e, n, i) {
	const o = Array.from(e.querySelectorAll(ff)).filter(Ko);
	return (
		n && Ko(e) && o.unshift(e),
		o.forEach((u, l) => {
			if (!vu(u)) return;
			const f = u.contentDocument?.body;
			if (!f) return;
			const h = wg(f, !1, i);
			o.splice(l, 1, ...h);
		}),
		!o.length && i ? df(e) : o
	);
}
function Zm(e, n, i) {
	if (n && Ko(e)) {
		if (!vu(e)) return e;
		const u = e.contentDocument?.body;
		if (!u) return e;
		const l = Zm(u, !1, i);
		if (l) return l;
	}
	const o = e.querySelectorAll(ff);
	for (const u of o)
		if (Ko(u)) {
			if (vu(u)) {
				const l = u.contentDocument?.body;
				if (!l) return u;
				const f = Zm(l, !1, i);
				if (f) return f;
				continue;
			}
			return u;
		}
	return i ? uI(e) : null;
}
function v_({ container: e, includeContainer: n, reverse: i, fallbackToEdge: o, fallbackToFocusable: u }) {
	const l = Zn(e),
		f = df(e, n);
	i && f.reverse();
	const h = f.indexOf(l),
		m = f.slice(h + 1);
	return m.find(Ko) || (o ? f.find(Ko) : null) || (u ? m[0] : null) || null;
}
function lI(e, n, i, o) {
	return v_({ container: e, includeContainer: n, fallbackToEdge: i, fallbackToFocusable: o });
}
function ym(e, n) {
	return lI(document.body, !1, e, n);
}
function cI(e, n, i, o) {
	return v_({ container: e, includeContainer: n, reverse: !0, fallbackToEdge: i, fallbackToFocusable: o });
}
function OS(e, n) {
	return cI(document.body, !1, e, n);
}
function ns(e) {
	const n = Zn(e);
	if (!n) return !1;
	if (n === e) return !0;
	const i = n.getAttribute("aria-activedescendant");
	return i ? i === e.id : !1;
}
function Hi(e) {
	const n = Zn(e);
	if (!n) return !1;
	if (ht(e, n)) return !0;
	const i = n.getAttribute("aria-activedescendant");
	return !i || !("id" in e) ? !1 : i === e.id ? !0 : !!e.querySelector(`#${CSS.escape(i)}`);
}
function fI(e) {
	const n = e.getAttribute("tabindex") ?? "";
	(e.setAttribute("data-tabindex", n), e.setAttribute("tabindex", "-1"));
}
function dI(e, n) {
	const i = wg(e, n);
	for (const o of i) fI(o);
}
function hI(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		i = (o) => {
			const u = o.getAttribute("data-tabindex");
			(o.removeAttribute("data-tabindex"), u ? o.setAttribute("tabindex", u) : o.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && i(e);
	for (const o of n) i(o);
}
function y_(e) {
	return async () => {
		const n = await e?.();
		return y_(async () => (await n?.(), e));
	};
}
var cL = mI();
function mI({ limit: e = 100 } = {}) {
	const n = [];
	let i = [],
		o = null;
	const u = () => n.length > 0,
		l = () => i.length > 0;
	return {
		canUndo: u,
		canRedo: l,
		undo: async () => {
			u() && ((o = null), i.push(await n.pop()?.()));
		},
		redo: async () => {
			l() && ((o = null), n.push(await i.pop()?.()));
		},
		execute: async (g, p) => {
			if (!g) return;
			const b = p === o;
			o = p ?? null;
			const y = b ? Math.max(0, n.length - 1) : n.length,
				w = await g();
			if (!w) return;
			i = [];
			const E = n[y];
			for (
				n[y] = y_(async () => {
					await w?.();
					const T = await E?.();
					return async () => {
						(await T?.(), await g?.());
					};
				});
				n.length > e;
			)
				n.shift();
		},
	};
}
var p_ = Symbol("accessibleWhenDisabled");
function gI(e) {
	return e.accessibleWhenDisabled ?? e.onLoadedMetadataCapture?.[p_];
}
var Eg = "data-truly-disabled";
function vI(e) {
	return e.getAttribute(Eg) === "true";
}
function yI(e) {
	const n = e.getAttribute(Eg);
	if (n === "true") return !0;
	if (n === "false") return !1;
}
function b_(e) {
	return (
		e === "ArrowUp" ||
		e === "ArrowRight" ||
		e === "ArrowDown" ||
		e === "ArrowLeft" ||
		e === "Home" ||
		e === "End" ||
		e === "PageUp" ||
		e === "PageDown"
	);
}
function pI(e) {
	return e.nodeType === e.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
function qa(e) {
	const n = e?.getRootNode();
	return n && pI(n) && n.activeElement ? n.activeElement : Zn(e);
}
function S_(e) {
	return ns(e) || qa(e) === e;
}
function w_(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !n.length ? !0 : n.some((o) => i === o);
}
var AS = new WeakMap();
function bI(e, n, i) {
	for (; i.length;) {
		const o = i[i.length - 1];
		if (!o) {
			e.delete(n);
			return;
		}
		if (!o.disposed) return;
		(i.pop(), o.cleanup());
	}
	e.delete(n);
}
function Cu(e, n, i) {
	let o = AS.get(e);
	o || ((o = new Map()), AS.set(e, o));
	const u = o.get(n) ?? [],
		l = { cleanup: i(), disposed: !1 };
	return (
		u.length || o.set(n, u),
		u.push(l),
		() => {
			u.includes(l) && ((l.disposed = !0), bI(o, n, u));
		}
	);
}
function _g(e, n, i) {
	return Cu(e, n, () => {
		const u = e.getAttribute(n);
		return (
			e.setAttribute(n, i),
			() => {
				u == null ? e.removeAttribute(n) : e.setAttribute(n, u);
			}
		);
	});
}
function La(e, n, i) {
	return Cu(e, n, () => {
		const u = n in e,
			l = e[n];
		return (
			(e[n] = i),
			() => {
				u ? (e[n] = l) : delete e[n];
			}
		);
	});
}
function Ac(e, n) {
	return e
		? Cu(e, "style", () => {
				const o = e.style.cssText;
				return (
					Object.assign(e.style, n),
					() => {
						e.style.cssText = o;
					}
				);
			})
		: () => {};
}
function bc(e, n, i) {
	return e
		? Cu(e, n, () => {
				const u = e.style.getPropertyValue(n),
					l = e.style.getPropertyPriority(n);
				return (
					e.style.setProperty(n, i),
					() => {
						u ? e.style.setProperty(n, u, l) : e.style.removeProperty(n);
					}
				);
			})
		: () => {};
}
function RS(e, n) {
	if (!n) return !1;
	if (n.get(e)?.has("ancestorMark")) return !0;
	do {
		if (n.get(e)?.has("mark")) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
var Rc = new WeakMap();
function Go(e = "", n = "outside") {
	return `__ariakit-dialog-${n}${e ? `-${e}` : ""}`;
}
function SI(e, n = "") {
	return en(La(e, Go(), !0), La(e, Go(n), !0));
}
function E_(e, n = "") {
	return en(La(e, Go("", "ancestor"), !0), La(e, Go(n, "ancestor"), !0));
}
function wI(e, n) {
	const i = new WeakSet();
	Rc.set(e, i);
	for (const o of n) o && i.add(o);
	return () => {
		Rc.get(e) === i && Rc.delete(e);
	};
}
function Cg(e, n) {
	const i = Rc.get(n);
	if (!i) return !1;
	do {
		if (i.has(e)) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function hf(e, n) {
	const i = Go(n, "ancestor");
	if (e[i]) return !0;
	const o = Go(n);
	do {
		if (e[o]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function __(e) {
	return { cleanups: new Map(), previousCleanups: e };
}
function mf({ walk: e, element: n, kind: i, setup: o }) {
	const u = e.cleanups.get(n) ?? new Map();
	if (u.has(i)) return;
	e.cleanups.set(n, u);
	const l = e.previousCleanups?.get(n),
		f = l?.get(i);
	(l?.delete(i), u.set(i, f ?? o()));
}
function C_(e) {
	return (e.previousCleanups && Tg(e.previousCleanups), e.cleanups);
}
function T_({ walk: e, element: n, id: i, ids: o }) {
	w_(n, ...o) || mf({ walk: e, element: n, kind: "mark", setup: () => SI(n, i) });
}
function x_({ walk: e, ancestor: n, element: i, id: o }) {
	(i.hasAttribute("data-dialog") && i.id !== o) ||
		mf({ walk: e, element: n, kind: "ancestorMark", setup: () => E_(n, o) });
}
function Tg(e) {
	for (const n of e.values()) for (const i of n.values()) i();
	e.clear();
}
var O_ = (0, _.createContext)(!0);
function $c(e, n) {
	if (typeof e == "function") {
		const i = e(n);
		if (typeof i == "function") return i;
	} else e && (e.current = n);
}
function EI(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function _I(e) {
	return EI(e) ? { ...e.props }.ref || e.ref : null;
}
function CI(e, n) {
	const i = { ...e };
	for (const o in n) {
		if (!zn(n, o) || o === "__proto__") continue;
		if (o === "className") {
			const l = "className",
				f = e[l],
				h = n[l];
			f && h ? (i[l] = `${f} ${h}`) : (i[l] = h || f);
			continue;
		}
		if (o === "style") {
			const l = "style";
			i[l] = e[l] ? { ...e[l], ...n[l] } : n[l];
			continue;
		}
		const u = n[o];
		if (u !== void 0) {
			if (o.startsWith("on")) {
				if (typeof u != "function") continue;
				const l = e[o];
				if (typeof l == "function") {
					i[o] = (...f) => {
						(u(...f), l(...f));
					};
					continue;
				}
			}
			i[o] = u;
		}
	}
	return i;
}
var xg = { ..._ },
	A_ = xg.useId,
	fL = xg.useDeferredValue,
	TI = xg.useInsertionEffect ?? ((e) => e()),
	Ne = Ji ? _.useLayoutEffect : _.useEffect;
function xI(e) {
	const [n] = (0, _.useState)(e);
	return n;
}
function yu(e) {
	const n = (0, _.useRef)(e);
	return (
		Ne(() => {
			n.current = e;
		}),
		n
	);
}
function Ae(e) {
	const n = (0, _.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		TI(() => {
			n.current = e;
		}),
		(0, _.useCallback)((...i) => n.current?.(...i), [])
	);
}
function R_(e) {
	const [n, i] = (0, _.useState)(null);
	return (
		Ne(() => {
			if (n == null || !e) return;
			let o = null;
			return (
				e((u) => ((o = u), n)),
				() => {
					e(o);
				}
			);
		}, [n, e]),
		[n, i]
	);
}
function kt(...e) {
	return (0, _.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				const i = [];
				for (const o of e) {
					if (!o) continue;
					const u = $c(o, n);
					i.push({ ref: o, cleanup: typeof u == "function" ? u : void 0 });
				}
				if (i.some((o) => o.cleanup))
					return () => {
						for (const { ref: o, cleanup: u } of i) u ? u() : $c(o, null);
					};
			};
	}, e);
}
function OI(e) {
	const [n, i] = (0, _.useState)(e);
	return (
		Ne(() => {
			if (e || n) return;
			const o = Math.random().toString(36).slice(2, 8);
			i(`id-${o}`);
		}, [e, n]),
		e || n
	);
}
function AI(e) {
	const n = A_();
	return e || n;
}
var RI = A_ ? AI : OI;
function Ur(e) {
	return RI(e);
}
function NI(e, n) {
	const i = (l) => {
			if (typeof l == "string") return l;
		},
		[o, u] = (0, _.useState)(() => i(n));
	return (
		Ne(() => {
			const l = e && "current" in e ? e.current : e;
			u(l?.tagName.toLowerCase() || i(n));
		}, [e, n]),
		o
	);
}
function NS(e, n, i) {
	const o = xI(i),
		[u, l] = (0, _.useState)(o);
	return (
		(0, _.useEffect)(() => {
			const f = e && "current" in e ? e.current : e;
			if (!f) return;
			const h = () => {
					const g = f.getAttribute(n);
					l(g ?? o);
				},
				m = new MutationObserver(h);
			return (m.observe(f, { attributeFilter: [n] }), h(), () => m.disconnect());
		}, [e, n, o]),
		u
	);
}
function rs(e, n) {
	const i = (0, _.useRef)(!1);
	((0, _.useEffect)(() => {
		if (i.current) return e();
		i.current = !0;
	}, n),
		(0, _.useEffect)(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function MI(e, n) {
	const i = (0, _.useRef)(!1);
	(Ne(() => {
		if (i.current) return e();
		i.current = !0;
	}, n),
		Ne(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function N_() {
	return (0, _.useReducer)(() => [], []);
}
function ut(e) {
	return Ae(typeof e == "function" ? e : () => e);
}
function Ht(e, n, i = []) {
	const o = (0, _.useCallback)((u) => (e.wrapElement && (u = e.wrapElement(u)), n(u)), [...i, e.wrapElement]);
	return { ...e, wrapElement: o };
}
function Og(e = !1, n) {
	const [i, o] = (0, _.useState)(null);
	return { portalRef: kt(o, n), portalNode: i, domReady: !e || i };
}
function Ag(e, n, i) {
	const o = e.onLoadedMetadataCapture,
		u = (0, _.useMemo)(() => Object.assign(za.bind(null), o, ...(i !== void 0 ? [{ [n]: i }] : [])), [o, n, i]);
	return [o?.[n], { onLoadedMetadataCapture: u }];
}
var MS = !1;
function Rg() {
	return (
		(0, _.useEffect)(() => {
			MS ||
				(Wt("mousemove", zI, !0),
				Wt("mousedown", Sc, !0),
				Wt("mouseup", Sc, !0),
				Wt("keydown", Sc, !0),
				Wt("scroll", Sc, !0),
				(MS = !0));
		}, []),
		Ae(() => Ng)
	);
}
var Ng = !1,
	DS = 0,
	zS = 0;
function DI(e) {
	const n = e.movementX || e.screenX - DS,
		i = e.movementY || e.screenY - zS;
	return ((DS = e.screenX), (zS = e.screenY), n || i || !1);
}
function zI(e) {
	DI(e) && (Ng = !0);
}
function Sc() {
	Ng = !1;
}
function Fe(e) {
	const n = _.forwardRef((i, o) => e(lf({ ...i, ref: o })));
	return ((n.displayName = e.displayName || e.name), n);
}
function Tu(e, n) {
	return _.memo(e, n);
}
function Je(e, n) {
	const { wrapElement: i, render: o, ...u } = n,
		l = kt(n.ref, _I(o));
	let f;
	if (_.isValidElement(o)) {
		const h = { ...o.props, ref: l };
		f = _.cloneElement(o, CI(u, h));
	} else o ? (f = o(u)) : (f = (0, S.jsx)(e, { ...u }));
	return i ? i(f) : f;
}
function We(e) {
	const n = (i = {}) => e(i);
	return ((n.displayName = e.name), n);
}
function Vr(e = [], n = []) {
	const i = _.createContext(void 0),
		o = _.createContext(void 0),
		u = () => _.useContext(i),
		l = (g = !1) => {
			const p = _.useContext(o),
				b = u();
			return g ? p : p || b;
		},
		f = () => {
			const g = _.useContext(o),
				p = u();
			if (!(g && g === p)) return p;
		},
		h = (g) => e.reduceRight((p, b) => (0, S.jsx)(b, { ...g, children: p }), (0, S.jsx)(i.Provider, { ...g }));
	return {
		context: i,
		scopedContext: o,
		useContext: u,
		useScopedContext: l,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (g) =>
			(0, S.jsx)(h, {
				...g,
				children: n.reduceRight((p, b) => (0, S.jsx)(b, { ...g, children: p }), (0, S.jsx)(o.Provider, { ...g })),
			}),
	};
}
var II = "div",
	M_ = Sg(),
	D_ = 1,
	z_ = 2,
	IS = 3,
	jI = [
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
	];
function kI(e) {
	const { tagName: n, readOnly: i, type: o } = e;
	return (n === "TEXTAREA" && !i) || (n === "SELECT" && !i)
		? !0
		: n === "INPUT" && !i
			? jI.includes(o)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function qI(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function LI(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function UI(e) {
	let n = 0;
	return (qI(e) && (n |= D_), LI(e) && (n |= z_), n);
}
function VI(e) {
	if (e.tagName === "BUTTON") {
		const { type: n } = e;
		return n === "submit";
	}
	if (e.tagName === "INPUT") {
		const { type: n } = e;
		return n === "submit" || n === "image";
	}
	return !1;
}
function BI({
	focusable: e,
	trulyDisabled: n,
	nativeTabbable: i,
	supportsDisabled: o,
	safariTabIndex: u,
	tabIndexProp: l,
}) {
	return e ? (n ? (i && !o ? -1 : void 0) : i ? (u && l == null ? 0 : l) : (l ?? 0)) : l;
}
function wc(e, n) {
	return Ae((i) => {
		(e?.(i), !i.defaultPrevented && n && (i.stopPropagation(), i.preventDefault()));
	});
}
var jS = !1,
	Hc = !0;
function PI(e) {
	const n = e.target;
	Mn(n) && !n.hasAttribute("data-focus-visible") && (Hc = !1);
}
function $I(e) {
	if (b_(e.key)) {
		Hc = !0;
		return;
	}
	e.metaKey || e.ctrlKey || (e.altKey && (!M_ || e.key !== "Tab")) || (Hc = !0);
}
var xu = We(function ({ focusable: n = !0, accessibleWhenDisabled: i, autoFocus: o, onFocusVisible: u, ...l }) {
		const f = (0, _.useRef)(null),
			[h, m] = Ag(l, p_, i);
		((i ??= h),
			(0, _.useEffect)(() => {
				n && (jS || (Wt("mousedown", PI, !0), Wt("keydown", $I, !0), (jS = !0)));
			}, [n]));
		const g = n && $a(l),
			p = g && !i,
			[b, y] = (0, _.useState)(!1),
			w = (0, _.useRef)(!1),
			E = (0, _.useRef)(null),
			T = Ae((K) => {
				(E.current?.(), (E.current = null), (w.current = !1), K?.removeAttribute("data-focus-visible"));
			});
		((0, _.useEffect)(() => {
			(n && !p) || (T(f.current), b && y(!1));
		}, [n, p, b, T]),
			(0, _.useEffect)(() => {
				if (!n || !b) return;
				const K = f.current;
				if (!K || typeof IntersectionObserver > "u") return;
				const ue = new IntersectionObserver(() => {
					ln(K) || ((w.current = !1), y(!1));
				});
				return (ue.observe(K), () => ue.disconnect());
			}, [n, b]),
			(0, _.useEffect)(() => () => E.current?.(), []));
		const x = wc(l.onKeyPressCapture, g),
			z = wc(l.onMouseDownCapture, g),
			M = wc(l.onClickCapture, g),
			A = wc(l.onAuxClickCapture, g),
			N = (K, ue) => {
				if ((ue && (K.currentTarget = ue), !n)) return;
				const xe = K.currentTarget;
				if (xe && S_(xe) && (u?.(K), !K.defaultPrevented)) {
					if (((xe.dataset.focusVisible = "true"), (w.current = !0), VI(xe))) {
						if ((E.current?.(), (E.current = null), typeof IntersectionObserver < "u")) {
							const ve = new IntersectionObserver(() => {
								ln(xe) || T(xe);
							});
							(ve.observe(xe), (E.current = () => ve.disconnect()));
						}
						return;
					}
					y(!0);
				}
			},
			D = l.onKeyDownCapture,
			k = Ae((K) => {
				if (
					(D?.(K),
					K.defaultPrevented || !n || b || w.current || ((K.metaKey || K.altKey || K.ctrlKey) && !b_(K.key)) || !cn(K))
				)
					return;
				const ue = K.currentTarget;
				Pc(ue, "focusout", () => N(K, ue));
			}),
			O = l.onFocusCapture,
			L = Ae((K) => {
				if ((O?.(K), K.defaultPrevented || !n)) return;
				if (!cn(K)) {
					y(!1);
					return;
				}
				const ue = K.currentTarget,
					xe = () => N(K, ue);
				Hc || kI(K.target) ? Pc(K.target, "focusout", xe) : y(!1);
			}),
			H = l.onBlur,
			te = Ae((K) => {
				(H?.(K), n && Aa(K) && (T(K.currentTarget), y(!1)));
			}),
			R = (0, _.useContext)(O_),
			q = Ae((K) => {
				n &&
					o &&
					K &&
					R &&
					queueMicrotask(() => {
						ns(K) || (ln(K) && K.focus());
					});
			}),
			[P, F] = (0, _.useState)(IS);
		Ne(() => {
			const K = f.current;
			if (!K) return;
			const ue = UI(K.tagName.toLowerCase());
			ue !== IS && F(ue);
		}, []);
		const Y = n && !!(P & D_),
			B = n && !!(P & z_),
			[ne, re] = (0, _.useState)(!1);
		M_ &&
			(0, _.useEffect)(() => {
				if (!n) return;
				const K = f.current;
				if (!K) return;
				const { type: ue } = K,
					xe = K.tagName === "INPUT" && (ue === "checkbox" || ue === "radio");
				re(ka(K) || xe);
			}, [n]);
		const U = l.style,
			ee = (0, _.useMemo)(() => (p ? { pointerEvents: "none", ...U } : U), [p, U]);
		return (
			(l = {
				"data-focus-visible": (n && b) || void 0,
				"data-autofocus": o || void 0,
				"aria-disabled": g || void 0,
				...l,
				...m,
				ref: kt(f, q, l.ref),
				style: ee,
				tabIndex: BI({
					focusable: n,
					trulyDisabled: p,
					nativeTabbable: Y,
					supportsDisabled: B,
					safariTabIndex: ne,
					tabIndexProp: l.tabIndex,
				}),
				disabled: B && p ? !0 : void 0,
				[Eg]: g ? p : void 0,
				contentEditable: g ? void 0 : l.contentEditable,
				onKeyPressCapture: x,
				onClickCapture: M,
				onAuxClickCapture: A,
				onMouseDownCapture: z,
				onKeyDownCapture: k,
				onFocusCapture: L,
				onBlur: te,
			}),
			lf(l)
		);
	}),
	dL = Fe(function (n) {
		const i = xu(n);
		return Je(II, i);
	}),
	Ou = Vr(),
	hL = Ou.useContext,
	mL = Ou.useScopedContext,
	Mg = Ou.useProviderContext,
	HI = Ou.ContextProvider,
	ZI = Ou.ScopedContextProvider,
	Au = Vr([HI], [ZI]),
	gL = Au.useContext,
	vL = Au.useScopedContext,
	Ru = Au.useProviderContext,
	FI = Au.ContextProvider,
	Dg = Au.ScopedContextProvider,
	I_ = (0, _.createContext)(void 0),
	QI = (0, _.createContext)(void 0),
	j_ = new WeakMap();
function YI(e, n, i) {
	const { KeyboardEvent: o } = ar(e),
		u = new o(n.type, i);
	return (j_.set(u, Fm(n)), e.dispatchEvent(u));
}
function Fm(e) {
	return j_.get(e) ?? e;
}
function Ha(e, n) {
	const i = e.__unstableInternals;
	return (Zt(i, "Invalid store"), i[n]);
}
function k_(e, n) {
	if (!e) return !0;
	for (const i of e)
		if (n instanceof Set) {
			if (n.has(i)) return !0;
		} else if (uu(i, n)) return !0;
	return !1;
}
function uu(e, n) {
	return e === n || (e !== e && n !== n);
}
function q_(e, n, i, o) {
	let u;
	for (const l of o_(n)) uu(n[l], i[l]) || (o !== void 0 && k_([l], o)) || ((u ??= { ...e }), (u[l] = n[l]));
	return u;
}
var KI = 100;
function GI(e, n, i) {
	if (n)
		for (const o of n) {
			let u = e.get(o);
			(u || ((u = new Set()), e.set(o, u)), u.add(i));
		}
}
function XI(e, n, i) {
	if (e && n)
		for (const o of n) {
			const u = e.get(o);
			u && (u.delete(i), u.size || e.delete(o));
		}
}
function L_(e) {
	const n = new Set(),
		i = e.currentListener;
	if (!i) return n;
	for (const o of e.keyedListeners) if ((n.add(o), o === i)) return n;
	return (n.clear(), n.add(i), n);
}
function Zc(e) {
	e.notifiedListeners ??= L_(e);
}
function zg(e, n) {
	if (!e.currentListener) return !1;
	let i = !1;
	for (const u of e.keyedListeners) {
		if (u === e.currentListener) {
			i = !0;
			continue;
		}
		if (i && u === n) return !1;
	}
	let o = !1;
	for (const u of e.group.listeners) {
		if (u === e.currentListener) return o;
		u === n && (o = !0);
	}
	return !1;
}
function pm(e, n, i) {
	for (const o of e)
		if (o.group === n && !o.recovering && !(i && !o.keyedListeners.has(i))) {
			Zc(o);
			for (const u of o.group.listeners) {
				if (u === o.currentListener) break;
				zg(o, u) && o.notifiedListeners?.add(u);
			}
		}
}
function JI(e, n, i) {
	for (const o of e) o.group === n && (o.recovering || (zg(o, i) && (Zc(o), o.notifiedListeners?.add(i))));
}
function WI({ fastPathFrames: e, group: n, keys: i, listener: o }) {
	const u = n.listeners.has(o);
	for (const l of e)
		l.group === n &&
			(l.recovering ||
				(i.includes(l.updatedKey) &&
					(zg(l, o) ? (Zc(l), l.notifiedListeners?.add(o)) : u && (Zc(l), (l.recoverToLive = !0)))));
}
function ej(e, n, i) {
	for (const o of e) o.group === n && o.notifiedListeners?.delete(i);
}
function tj({ fastPathFrames: e, group: n, keys: i, listener: o }) {
	for (const u of e) u.group === n && (u.recovering || (i.includes(u.updatedKey) && u.keyedListeners.add(o)));
}
function nj(e, n) {
	if (!e.disposables.size) return;
	const i = e.disposables.get(n);
	i && (e.disposables.delete(n), i());
}
function U_(e, n, i) {
	const o = e.disposables.get(n);
	if (!o) {
		e.disposables.set(n, i);
		return;
	}
	e.disposables.set(n, () => {
		(o(), i());
	});
}
function V_(e, n, i, o, u, l) {
	if (e.suspendCounts?.has(n)) return;
	const { disposables: f } = e,
		h = f.size ? f.get(n) : void 0;
	if (h) {
		f.delete(n);
		const g = i;
		(h(), (i = u?.() ?? i), i !== g && (o = q_(o, i, g, l) ?? o));
	}
	const m = n(i, o);
	m && U_(e, n, m);
}
function kS({ group: e, getState: n, prevState: i, updatedKey: o, notifiedListeners: u }) {
	const l = e.allKeysListeners;
	for (const f of e.listeners)
		u?.has(f) || (!l?.has(f) && !k_(e.listenerKeys.get(f), o)) || (u?.add(f), V_(e, f, n(), i, n, o));
}
function or(e, ...n) {
	let i = e,
		o = i,
		u = za,
		l = !1,
		f = !1,
		h = new Set();
	const m = new Set(),
		g = new Set(),
		p = { listeners: new Set(), disposables: new Map(), listenerKeys: new WeakMap() },
		b = { listeners: new Set(), disposables: new Map(), listenerKeys: new WeakMap() },
		y = (R) => (g.add(R), () => g.delete(R)),
		w = () => {
			const R = m.size,
				q = Symbol();
			m.add(q);
			const P = () => {
				m.delete(q) && (m.size || u());
			};
			if (R) return P;
			const F = o_(i),
				Y = [];
			for (const re of n) {
				const U = re?.getState?.();
				if (!U) continue;
				const ee = F.filter((K) => zn(U, K));
				if (ee.length) {
					if (n.length === 1 || ee.length === F.length) {
						for (const K of ee)
							Y.push(
								nt(re, [K], (ue) => {
									H(K, ue[K], !0);
								}),
							);
						continue;
					}
					Y.push(
						di(re, ee, (K, ue) => {
							for (const xe of ee) K[xe] !== ue[xe] && H(xe, K[xe], !0);
						}),
					);
					for (const K of ee) {
						const ue = re?.getState?.();
						ue && H(K, ue[K], !0);
					}
				}
			}
			const B = [];
			for (const re of g) B.push(re());
			const ne = n.map(Ig);
			return ((u = en(...Y, ...B, ...ne)), P);
		},
		E = (R, q, P) => {
			P !== void 0 && (P ? XI(R.listenersByKey, P, q) : R.allKeysListeners?.delete(q));
		},
		T = [],
		x = (R, q, P = p) => {
			const F = R ? [...R] : null,
				Y = P.listeners.has(q);
			return (
				Y || ej(T, P, q),
				F ? WI({ fastPathFrames: T, group: P, keys: F, listener: q }) : (Y && pm(T, P), JI(T, P, q)),
				Y && (pm(T, P, q), E(P, q, P.listenerKeys.get(q))),
				P.listeners.add(q),
				F
					? ((P.listenersByKey ??= new Map()),
						GI(P.listenersByKey, F, q),
						tj({ fastPathFrames: T, group: P, keys: F, listener: q }))
					: ((P.allKeysListeners ??= new Set()), P.allKeysListeners.add(q)),
				P.listenerKeys.set(q, F),
				() => {
					const B = P.disposables.get(q);
					(P.disposables.delete(q), pm(T, P, q));
					const ne = P.listenerKeys.get(q);
					(E(P, q, F), ne !== F && E(P, q, ne), P.listenerKeys.delete(q), P.listeners.delete(q), B?.());
				}
			);
		},
		z = (R, q) => x(R, q),
		M = (R, q, P) => {
			const F = R.listeners.has(q);
			if (F) {
				R.suspendCounts ??= new Map();
				const B = R.suspendCounts.get(q) ?? 0;
				R.suspendCounts.set(q, B + 1);
			}
			let Y;
			try {
				const B = i;
				(nj(R, q), i !== B && (Y = q_(P, i, B)));
				const ne = q(i, Y ?? P);
				ne && U_(R, q, ne);
			} finally {
				if (F) {
					const B = R.suspendCounts,
						ne = B?.get(q);
					(ne && ne > 1 ? B?.set(q, ne - 1) : B?.delete(q), B?.size || delete R.suspendCounts);
				}
			}
		},
		A = (R, q) => (M(p, q, i), x(R, q)),
		N = (R, q) => (!b.listeners.size && !f && (o = i), M(b, q, o), x(R, q, b)),
		D = (R) => or(F2(i, R), te),
		k = (R) => or(Z2(i, R), te),
		O = () => i,
		L = (R, q, P) => {
			if (!(P instanceof Set) && !R.allKeysListeners?.size) {
				const F = R.listenersByKey?.get(P);
				if (!F) return;
				const Y = { group: R, keyedListeners: F, updatedKey: P, currentListener: null };
				T.push(Y);
				try {
					for (const B of F) {
						if (
							Y.notifiedListeners?.has(B) ||
							((Y.currentListener = B),
							Y.notifiedListeners?.add(B),
							V_(R, B, i, q, O, P),
							!R.allKeysListeners?.size && !Y.recoverToLive)
						)
							continue;
						const ne = Y.notifiedListeners ?? L_(Y);
						((Y.notifiedListeners = ne),
							(Y.recovering = !0),
							kS({ group: R, getState: O, prevState: q, updatedKey: P, notifiedListeners: ne }));
						return;
					}
				} finally {
					T.pop();
				}
				return;
			}
			kS({ group: R, getState: O, prevState: q, updatedKey: P });
		},
		H = (R, q, P = !1) => {
			if (!zn(i, R)) return;
			const F = i[R],
				Y = uf(q, () => F);
			if (uu(Y, F)) return;
			const B = f;
			f = !0;
			const ne = i,
				re = { ...i, [R]: Y };
			i = re;
			let U = !1;
			try {
				if (!P && n.length) {
					for (const ee of n)
						if ((ee?.setState?.(R, Y), !uu(i[R], Y))) {
							U = !0;
							break;
						}
					if (U) {
						let ee = 0;
						for (; ee < KI; ee += 1) {
							let K = !1;
							for (const ue of n) {
								const xe = i[R];
								(ue?.setState?.(R, xe), uu(i[R], xe) || (K = !0));
							}
							if (!K) break;
						}
					}
				}
				if (!U) {
					const ee = i === re ? ne : { ...i, [R]: ne[R] };
					L(p, ee, R);
				}
			} finally {
				f = B;
			}
			if (!b.listeners.size) {
				f || (o = i);
				return;
			}
			(h.add(R),
				!l &&
					((l = !0),
					queueMicrotask(() => {
						l = !1;
						const ee = i,
							K = h;
						h = new Set();
						const ue = o;
						(L(b, ue, K), o === ue && (o = ee));
					})));
		},
		te = {
			getState: O,
			setState: H,
			__unstableInternals: { setup: y, init: w, subscribe: z, sync: A, batch: N, pick: D, omit: k },
		};
	return te;
}
function yt(e, ...n) {
	if (e) return Ha(e, "setup")(...n);
}
function Ig(e, ...n) {
	if (e) return Ha(e, "init")(...n);
}
function di(e, ...n) {
	if (e) return Ha(e, "subscribe")(...n);
}
function nt(e, ...n) {
	if (e) return Ha(e, "sync")(...n);
}
function pu(e, ...n) {
	if (e) return Ha(e, "batch")(...n);
}
function jg(e, ...n) {
	if (e) return Ha(e, "omit")(...n);
}
function B_(e, ...n) {
	if (e) return Ha(e, "pick")(...n);
}
function gf(...e) {
	const n = {};
	for (const o of e) {
		const u = o?.getState?.();
		u && Object.assign(n, u);
	}
	const i = or(n, ...e);
	return Object.assign({}, ...e, i);
}
var rj = sr((e) => {
		var n = tf();
		function i(y, w) {
			return (y === w && (y !== 0 || 1 / y === 1 / w)) || (y !== y && w !== w);
		}
		var o = typeof Object.is == "function" ? Object.is : i,
			u = n.useState,
			l = n.useEffect,
			f = n.useLayoutEffect,
			h = n.useDebugValue;
		function m(y, w) {
			var E = w(),
				T = u({ inst: { value: E, getSnapshot: w } }),
				x = T[0].inst,
				z = T[1];
			return (
				f(
					function () {
						((x.value = E), (x.getSnapshot = w), g(x) && z({ inst: x }));
					},
					[y, E, w],
				),
				l(
					function () {
						return (
							g(x) && z({ inst: x }),
							y(function () {
								g(x) && z({ inst: x });
							})
						);
					},
					[y],
				),
				h(E),
				E
			);
		}
		function g(y) {
			var w = y.getSnapshot;
			y = y.value;
			try {
				var E = w();
				return !o(y, E);
			} catch {
				return !0;
			}
		}
		function p(y, w) {
			return w();
		}
		var b = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : b;
	}),
	ij = sr((e, n) => {
		n.exports = rj();
	}),
	P_ = ij(),
	Fc = () => () => {};
function Qc(e) {
	return Array.isArray(e);
}
function Qm(e, n) {
	return e === n || (e !== e && n !== n);
}
function aj(e, n) {
	if (e?.length !== n.length) return !1;
	for (let i = 0; i < e.length; i += 1) {
		const o = e[i];
		if (!Qm(o, n[i])) return !1;
	}
	return !0;
}
function $_(e) {
	const [n, i] = _.useState(() => (e === null ? null : [...e]));
	if (e === null) return (n !== null && i(null), null);
	if (aj(n, e)) return n;
	const o = [...e];
	return (i(o), o);
}
function be(e, n = a_, i) {
	const o = $_(Qc(n) ? n : typeof n == "function" ? null : [n]),
		u = _.useCallback((f) => (!e || o?.length === 0 ? Fc() : di(e, o, f)), [e, o]),
		l = () => {
			const f = e?.getState();
			if (Qc(n)) return i?.(f);
			if (typeof n == "function") return n(f);
			if (f && zn(f, n)) return f[n];
		};
	return (0, P_.useSyncExternalStore)(u, l, l);
}
function oj(e, n) {
	const i = [];
	let o = !1;
	for (const u in e) {
		const l = e[u];
		if (l !== void 0) {
			if (typeof l == "function") {
				o = !0;
				continue;
			}
			i.includes(l) || i.push(l);
		}
	}
	if (!o) return i;
	if (!n) return null;
	for (const u of n) i.includes(u) || i.push(u);
	return i;
}
function Yc(e, n, i) {
	const o = Qc(n) ? (i ?? {}) : n,
		u = Qc(n) ? n : void 0,
		l = _.useRef({}),
		f = $_(oj(o, u)),
		h = _.useCallback((g) => (!e || f?.length === 0 ? Fc() : di(e, f, g)), [e, f]),
		m = () => {
			const g = e?.getState();
			let p = !1;
			const b = l.current;
			for (const y in o) {
				const w = o[y];
				if (w === void 0) continue;
				if (typeof w == "function") {
					const T = w(g);
					Object.is(T, b[y]) || ((b[y] = T), (p = !0));
				}
				if (typeof w == "function") continue;
				const E = g && zn(g, w) ? g[w] : void 0;
				Object.is(E, b[y]) || ((b[y] = E), (p = !0));
			}
			return (p && (l.current = { ...b }), l.current);
		};
	return (0, P_.useSyncExternalStore)(h, m, m);
}
function Dt(e, n, i, o) {
	const u = zn(n, i) ? n[i] : void 0,
		l = o ? n[o] : void 0,
		f = !!l,
		h = yu({ value: u, setValue: l });
	(Ne(() => {
		if (f)
			return di(e, [i], (m, g) => {
				const { value: p, setValue: b } = h.current;
				b && (Qm(m[i], g[i]) || Qm(m[i], p) || b(m[i]));
			});
	}, [e, i, f, h]),
		Ne(() => {
			if (u !== void 0)
				return (
					e.setState(i, u),
					pu(e, [i], () => {
						u !== void 0 && e.setState(i, u);
					})
				);
		}));
}
function vf(e, n) {
	const [i, o] = _.useState(() => e(n));
	Ne(() => Ig(i), [i]);
	const u = _.useCallback((l) => be(i, l), [i]);
	return [
		_.useMemo(() => ({ ...i, useState: u }), [i, u]),
		Ae(() => {
			o((l) => e({ ...n, ...l.getState() }));
		}),
	];
}
var sj = "div";
function qS(e, n) {
	const i = setTimeout(n, e);
	return () => clearTimeout(i);
}
function LS(e) {
	const n = e?.trim() || "0s",
		i = n.endsWith("ms") ? 1 : 1e3,
		o = Number.parseFloat(n) * i;
	return Number.isNaN(o) ? 0 : o;
}
function US(e, n, i) {
	const o = e.split(","),
		u = n.split(","),
		l = i.split(",");
	let f = 0;
	for (const [h, m] of o.entries()) {
		if (m.trim() === "none") continue;
		const g = LS(u[h % u.length]),
			p = LS(l[h % l.length]);
		f = Math.max(f, g + p);
	}
	return f;
}
function uj(e) {
	const {
		transitionProperty: n,
		transitionDuration: i,
		transitionDelay: o,
		animationName: u,
		animationDuration: l,
		animationDelay: f,
	} = getComputedStyle(e);
	return Math.max(US(n, o, i), US(u, f, l));
}
function Nu(e, n, i) {
	return !i && n !== !1 && (!e || !!n);
}
var kg = We(function ({ store: n, alwaysVisible: i, unstable_otherElementRef: o, ...u }) {
		const l = Mg();
		((n = n || l), Zt(n, !1));
		const f = (0, _.useRef)(null),
			h = Ur(u.id),
			[m, g] = (0, _.useState)(null),
			{
				open: p,
				mounted: b,
				animated: y,
				contentElement: w,
			} = Yc(n, { open: "open", mounted: "mounted", animated: "animated", contentElement: "contentElement" }),
			E = be(n.disclosure, "contentElement"),
			T = (0, _.useRef)(!1);
		(Ne(() => {
			f.current && n?.setContentElement(f.current);
		}, [n]),
			Ne(() => {
				let A;
				return (
					n?.setState("animated", (N) => ((A = N), !0)),
					() => {
						A !== void 0 && n?.setState("animated", A);
					}
				);
			}, [n]),
			Ne(() => {
				if (!y) {
					p ? T.current && ((T.current = !1), g("enter")) : ((T.current = !0), g(null));
					return;
				}
				if (!w?.isConnected) {
					g(null);
					return;
				}
				return Q2(() => {
					g(p ? "enter" : b ? "leave" : null);
				});
			}, [y, w, p, b]),
			Ne(() => {
				if (!n || !y || !m || !w) return;
				const A = () => n?.setState("animating", !1),
					N = () => (0, hu.flushSync)(A);
				if ((m === "leave" && p) || (m === "enter" && !p)) return;
				if (typeof y == "number") return qS(y, N);
				const D = [w];
				E && D.push(E);
				const k = o?.current;
				k && D.push(k);
				const O = Math.max(...D.map(uj));
				if (!O) {
					(m === "enter" && n.setState("animated", !1), A());
					return;
				}
				return qS(Math.max(O - 1e3 / 60, 0), N);
			}, [n, y, w, E, o, p, m]),
			(u = Ht(u, (A) => (0, S.jsx)(Dg, { value: n, children: A }), [n])));
		const x = Nu(b, u.hidden, i),
			z = u.style,
			M = (0, _.useMemo)(() => (x ? { ...z, display: "none" } : z), [x, z]);
		return (
			(u = {
				"data-open": p || void 0,
				"data-enter": m === "enter" || void 0,
				"data-leave": m === "leave" || void 0,
				hidden: x,
				...u,
				id: h,
				ref: kt(h ? n.setContentElement : null, f, u.ref),
				style: M,
			}),
			lf(u)
		);
	}),
	lj = Fe(function (n) {
		const i = kg(n);
		return Je(sj, i);
	}),
	yL = Fe(function ({ unmountOnHide: n, ...i }) {
		const o = Mg(),
			u = i.store || o;
		return be(u, ["mounted"], (l) => !n || l?.mounted) === !1 ? null : (0, S.jsx)(lj, { ...i });
	}),
	cj = "div",
	H_ = We(function ({ autoFocusOnShow: n = !0, ...i }) {
		return ((i = Ht(i, (o) => (0, S.jsx)(O_.Provider, { value: n, children: o }), [n])), i);
	}),
	pL = Fe(function (n) {
		const i = H_(n);
		return Je(cj, i);
	}),
	VS = (0, _.createContext)(0);
function fj({ level: e, children: n }) {
	const i = (0, _.useContext)(VS),
		o = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, S.jsx)(VS.Provider, { value: o, children: n });
}
var dj = "span";
function Z_(e) {
	return {
		borderWidth: 0,
		clipPath: "inset(50%)",
		height: "1px",
		margin: "-1px",
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		whiteSpace: "nowrap",
		width: "1px",
		...e,
	};
}
var F_ = We(function (n) {
		return ((n = { ...n, style: Z_(n.style) }), n);
	}),
	bL = Fe(function (n) {
		const i = F_(n);
		return Je(dj, i);
	}),
	hj = "span",
	mj = We(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = F_(n)),
			n
		);
	}),
	Ec = Fe(function (n) {
		const i = mj(n);
		return Je(hj, i);
	}),
	BS = (0, _.createContext)(null),
	gj = "div";
function Q_(e, n) {
	const i = Ke(e),
		o = n || i.body,
		{ fullscreenElement: u } = i,
		l = ar(e).HTMLElement;
	return !l || !(u instanceof l) || ht(u, o) ? o : n && !ht(n, u) ? n : u;
}
function vj(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : Ke(e).createElement("div");
}
function yj(e, n) {
	const i = Ke(e),
		o = () => {
			const u = Q_(e, n);
			e.parentElement !== u && (ht(e, u) || u.appendChild(e));
		};
	return (
		i.addEventListener("fullscreenchange", o),
		() => {
			i.removeEventListener("fullscreenchange", o);
		}
	);
}
function pj(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Bi(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
function PS(e, n) {
	return { ref: e, node: n, cleanup: $c(e, n) };
}
function $S(e) {
	typeof e.cleanup == "function" ? e.cleanup() : $c(e.ref, null);
}
var Y_ = We(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: i,
		portalElement: o,
		portalRef: u,
		portal: l = !0,
		...f
	}) {
		const h = (0, _.useRef)(null),
			m = kt(h, f.ref),
			g = (0, _.useContext)(BS),
			[p, b] = (0, _.useState)(null),
			[y, w] = (0, _.useState)(null),
			E = (0, _.useRef)(null),
			T = (0, _.useRef)(null),
			x = (0, _.useRef)(null),
			z = (0, _.useRef)(null),
			M = yu(u),
			A = (0, _.useRef)(null);
		return (
			Ne(() => {
				const N = h.current;
				if (!N || !l) {
					b(null);
					return;
				}
				const D = vj(N, o);
				if (!D) {
					b(null);
					return;
				}
				const k = D.isConnected;
				(k || Q_(N, g).appendChild(D),
					D.id || (D.id = N.id ? `portal/${N.id}` : pj()),
					b(D),
					(A.current = PS(M.current, D)));
				const O = o ? void 0 : yj(D, g);
				return () => {
					O?.();
					const L = A.current;
					(L && ((A.current = null), $S(L)), k || D.remove());
				};
			}, [l, o, g, M]),
			Ne(() => {
				const N = A.current;
				N && N.ref !== u && ($S(N), (A.current = PS(u, N.node)));
			}, [u]),
			Ne(() => {
				if (!l || !n || !i) return;
				const N = Ke(i).createElement("span");
				return (
					(N.style.position = "fixed"),
					i.insertAdjacentElement("afterend", N),
					w(N),
					() => {
						(N.remove(), w(null));
					}
				);
			}, [l, n, i]),
			(0, _.useEffect)(() => {
				if (!p || !n) return;
				let N = 0;
				const D = (k) => {
					if (!Aa(k)) return;
					const O = k.type === "focusin";
					if ((cancelAnimationFrame(N), O)) return hI(p);
					N = requestAnimationFrame(() => {
						dI(p, !0);
					});
				};
				return (
					p.addEventListener("focusin", D, !0),
					p.addEventListener("focusout", D, !0),
					() => {
						(cancelAnimationFrame(N),
							p.removeEventListener("focusin", D, !0),
							p.removeEventListener("focusout", D, !0));
					}
				);
			}, [p, n]),
			(f = Ht(
				f,
				(N) => {
					if (((N = (0, S.jsx)(BS.Provider, { value: p || g, children: N })), !l)) return N;
					if (!p) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((N = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								(0, S.jsx)(Ec, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (k) => {
										Aa(k, p) ? Bi(ym()) : Bi(E.current);
									},
								}),
							N,
							n &&
								(0, S.jsx)(Ec, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (k) => {
										Aa(k, p) ? Bi(OS()) : Bi(z.current);
									},
								}),
						],
					})),
						(N = (0, hu.createPortal)(N, p)));
					let D = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								(0, S.jsx)(Ec, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (k) => {
										k.relatedTarget !== z.current && Aa(k, p) ? Bi(T.current) : Bi(OS());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": p.id, style: { position: "fixed" } }),
							n &&
								(0, S.jsx)(Ec, {
									ref: z,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (k) => {
										if (Aa(k, p)) Bi(x.current);
										else {
											const O = ym();
											if (O === T.current) {
												requestAnimationFrame(() => ym()?.focus());
												return;
											}
											Bi(O);
										}
									},
								}),
						],
					});
					return (y && n && (D = (0, hu.createPortal)(D, y)), (0, S.jsxs)(S.Fragment, { children: [D, N] }));
				},
				[p, g, l, f.id, n, y],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	SL = Fe(function (n) {
		const i = Y_(n);
		return Je(gj, i);
	});
function qg(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function K_(e) {
	return `__ariakit-dialog-snapshotAncestor-${e}`;
}
function G_(e, n) {
	return X_(qg(e), n);
}
function bj(e, n) {
	return X_(K_(e), n);
}
function X_(e, n) {
	const i = [];
	for (const o of n) i.push(La(o, e, !0));
	return () => {
		for (const o of i) o();
	};
}
var Sj = ["SCRIPT", "STYLE"];
function wj(e, n) {
	const i = Ke(n),
		o = qg(e);
	if (!i.body[o]) return !0;
	do {
		if (n === i.body) return !1;
		if (n[o]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function J_(e, n) {
	return n.some((i) => i && ht(e, i));
}
function Ej(e, n, i) {
	return Sj.includes(n.tagName) || !wj(e, n) ? !1 : !J_(n, i);
}
function _j(e, n, i) {
	return n[K_(e)] ? !J_(n, i) : !1;
}
function Lg(e, n, i, o) {
	for (let u of n) {
		if (!u?.isConnected) continue;
		const l = n.some((g) => (!g || g === u ? !1 : g.contains(u))),
			f = Ke(u),
			h = u,
			m = (g) => {
				for (const p of g.children) {
					if (Ej(e, p, n)) {
						i(p, h);
						continue;
					}
					_j(e, p, n) && (o?.(p, h), m(p));
				}
			};
		for (; u.parentElement && u !== f.body;) (o?.(u.parentElement, h), l || m(u.parentElement), (u = u.parentElement));
	}
}
function Cj(e, n) {
	const { body: i } = Ke(n[0]),
		o = [],
		u = [];
	return (
		Lg(
			e,
			n,
			(l) => {
				o.push(l);
			},
			(l) => {
				u.push(l);
			},
		),
		en(La(i, qg(e), !0), G_(e, o), bj(e, u))
	);
}
function Tj(e, n, i) {
	const o = __(i),
		u = n.map((l) => l?.id);
	return (
		Lg(
			e,
			n,
			(l) => {
				T_({ walk: o, element: l, id: e, ids: u });
			},
			(l, f) => {
				x_({ walk: o, ancestor: l, element: f, id: e });
			},
		),
		C_(o)
	);
}
function xj(e) {
	const n = e?.unstable_onHideRequest,
		i = e?.unstable_requestHide;
	if (n && i) return { onHideRequest: n, requestHide: i };
}
function W_(e = {}) {
	const n = e.store || e.disclosure ? gf(e.store, jg(e.disclosure, ["contentElement", "disclosureElement"])) : void 0;
	const i = n?.getState(),
		o = ke(e.open, i?.open, e.defaultOpen, !1),
		u = ke(e.animated, i?.animated, !1),
		l = {
			open: o,
			animated: u,
			animating: !!u && o,
			mounted: o,
			contentElement: ke(i?.contentElement, null),
			disclosureElement: ke(i?.disclosureElement, null),
		},
		f = n ? or(l, n) : or(l);
	(yt(f, () =>
		nt(f, ["animated", "animating"], (y) => {
			y.animated || f.setState("animating", !1);
		}),
	),
		yt(f, () =>
			di(f, ["open"], () => {
				f.getState().animated && f.setState("animating", !0);
			}),
		),
		yt(f, () =>
			nt(f, ["open", "animating"], (y) => {
				f.setState("mounted", y.open || y.animating);
			}),
		));
	const h = xj(e.store),
		m = new Map(),
		g =
			h?.onHideRequest ??
			((y) =>
				y === p
					? () => {}
					: (m.set(y, (m.get(y) ?? 0) + 1),
						() => {
							const w = m.get(y);
							if (w != null) {
								if (w > 1) {
									m.set(y, w - 1);
									return;
								}
								m.delete(y);
							}
						})),
		p =
			h?.requestHide ??
			((y) => {
				const w = [...m.keys()],
					E = (T) => {
						const x = w[T];
						if (!x) {
							y();
							return;
						}
						x(() => E(T + 1));
					};
				E(0);
			});
	yt(f, () => {
		if (e.disclosure) return g(e.disclosure.unstable_requestHide);
	});
	const b = (y) => {
		const { open: w } = f.getState(),
			E = uf(y, w);
		if (!w || E) {
			f.setState("open", E);
			return;
		}
		p(() => f.setState("open", !1));
	};
	return {
		...f,
		disclosure: e.disclosure,
		setOpen: b,
		show: () => f.setState("open", !0),
		hide: () => b(!1),
		toggle: () => b((y) => !y),
		unstable_onHideRequest: g,
		unstable_requestHide: p,
		stopAnimation: () => f.setState("animating", !1),
		setContentElement: (y) => f.setState("contentElement", y),
		setDisclosureElement: (y) => f.setState("disclosureElement", y),
	};
}
function e1(e, n, i) {
	return (
		rs(n, [i.store, i.disclosure, n]),
		Dt(e, i, "open", "setOpen"),
		Dt(e, i, "mounted", "setMounted"),
		Dt(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function Oj(e = {}) {
	const [n, i] = vf(W_, e);
	return e1(n, i, e);
}
var Aj = [
		"a",
		"abbr",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"bdi",
		"bdo",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"cite",
		"code",
		"col",
		"colgroup",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"hr",
		"html",
		"i",
		"iframe",
		"img",
		"input",
		"ins",
		"kbd",
		"label",
		"legend",
		"li",
		"link",
		"main",
		"map",
		"mark",
		"menu",
		"meta",
		"meter",
		"nav",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"picture",
		"pre",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"script",
		"section",
		"select",
		"slot",
		"small",
		"source",
		"span",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"track",
		"u",
		"ul",
		"var",
		"video",
		"wbr",
		"svg",
	],
	Rj = "div",
	wL = We(function (n) {
		return n;
	}),
	Kc = Fe(function (n) {
		return Je(Rj, n);
	});
Object.assign(
	Kc,
	Aj.reduce(
		(e, n) => (
			(e[n] = Fe(function (o) {
				return Je(n, o);
			})),
			e
		),
		{},
	),
);
function Nj({ store: e, backdrop: n, backdropRef: i, onElementChange: o, alwaysVisible: u, hidden: l }) {
	const [f, h] = (0, _.useState)(null),
		m = Oj({ disclosure: e }),
		g = be(e, "contentElement");
	(Ne(() => {
		const y = g;
		if (!f || !y) return;
		const { zIndex: w } = getComputedStyle(y);
		f.style.setProperty("z-index", w);
	}, [g, f]),
		Ne(() => {
			const y = g?.id;
			if (y && f) return E_(f, y);
		}, [g, f]),
		Ne(() => {
			f && o?.();
		}, [f, o]));
	const p = kg({
		ref: kt(h, i),
		store: m,
		role: "presentation",
		"data-backdrop": g?.id || "",
		alwaysVisible: u,
		...(l != null && { hidden: l }),
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, _.isValidElement)(n)) return (0, S.jsx)(Kc, { ...p, render: n });
	const b = typeof n != "boolean" ? n : "div";
	return (0, S.jsx)(Kc, { ...p, render: (0, S.jsx)(b, {}) });
}
function t1(e = {}) {
	return W_(e);
}
function n1(e, n, i) {
	return e1(e, n, i);
}
function r1(e = {}) {
	const [n, i] = vf(t1, e);
	return n1(n, i, e);
}
function yf(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-dialog-hidden-dismiss");
	return i == null ? !1 : i === "" || !n.length ? !0 : n.some((o) => i === o);
}
function Ug() {
	return "inert" in HTMLElement.prototype;
}
function Mj(e) {
	return _g(e, "aria-hidden", "true");
}
function Dj(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : n.length ? (i === "" ? !1 : n.some((o) => i === o)) : !0;
}
function i1(e, n) {
	if (!("style" in e)) return za;
	if (Ug()) return La(e, "inert", !0);
	const i = wg(e, !0).map((o) => {
		if (n?.some((l) => l && ht(l, o))) return za;
		const u = Cu(
			o,
			"focus",
			() => (
				(o.focus = za),
				() => {
					delete o.focus;
				}
			),
		);
		return en(_g(o, "tabindex", "-1"), u);
	});
	return en(...i, Mj(e), Ac(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }));
}
function zj({ walk: e, element: n, elements: i, ids: o }) {
	w_(n, ...o) || Dj(n, ...o) || yf(n, ...o) || mf({ walk: e, element: n, kind: "disable", setup: () => i1(n, i) });
}
function Ij(e, n, i) {
	n.hasAttribute("role") &&
		(i.some((o) => o && ht(o, n)) || mf({ walk: e, element: n, kind: "role", setup: () => _g(n, "role", "none") }));
}
function jj(e, n, i) {
	i && !Ug() && Tg(i);
	const o = __(i),
		u = n.map((l) => l?.id);
	return (
		Lg(
			e,
			n,
			(l) => {
				(T_({ walk: o, element: l, id: e, ids: u }), zj({ walk: o, element: l, elements: n, ids: u }));
			},
			(l, f) => {
				(x_({ walk: o, ancestor: l, element: f, id: e }), Ij(o, l, n));
			},
		),
		C_(o)
	);
}
function a1(e) {
	const n = [e];
	for (;;) {
		let i;
		try {
			i = ar(e).frameElement;
		} catch {
			return n;
		}
		if (!Mn(i)) return n;
		(n.push(i), (e = i));
	}
}
function o1(e, n) {
	const i = e.composedPath().filter(Mn);
	!i.length && Mn(e.target) && i.push(e.target);
	const o = i[0];
	if (o) for (const l of a1(o).slice(1)) i.includes(l) || i.push(l);
	const u = n?.getRootNode();
	return { elements: i, rootTarget: u ? i.find((l) => l.getRootNode() === u) || e.target : i[0] || e.target };
}
function kj(e, n, i) {
	const o = (0, _.useRef)(null);
	return (
		(0, _.useEffect)(() => {
			if (!e) {
				o.current = null;
				return;
			}
			return Wt(
				"mousedown",
				(l) => {
					o.current = o1(l, i);
				},
				!0,
				n,
			);
		}, [e, n, i]),
		o
	);
}
function s1(e) {
	const n = a1(e).at(-1);
	return ar(n ?? e);
}
function HS(e) {
	return e.isConnected;
}
function qj(e, n) {
	if (!e) return !1;
	if (ht(e, n)) return !0;
	const i = n.getAttribute("aria-activedescendant");
	if (i) {
		const o = Ke(n).getElementById(i);
		if (o) return ht(e, o);
	}
	return !1;
}
function Lj(e, n) {
	if (!("clientY" in e)) return !1;
	const i = n.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function Uj(e, n, i) {
	return ht(n, e) || qj(i, e) || e.hasAttribute("data-focus-trap") || yf(e, n.id) ? !0 : Cg(e, n);
}
function u1(e, n, i) {
	return e.elements.some((o) => Uj(o, n, i));
}
function bm({ store: e, type: n, listener: i, capture: o, open: u, contentElement: l, focusedRef: f }) {
	const h = Ae(i);
	(0, _.useEffect)(() => {
		if (!u) return;
		const m = (p) => {
				const { contentElement: b, disclosureElement: y } = e.getState();
				if (!b) return;
				const w = o1(p, b),
					E = w.elements[0],
					T = w.rootTarget;
				if (!Mn(T) || (E && !HS(E)) || !HS(T) || u1(w, b, y)) return;
				const x = Ke(b);
				if (Ke(T) !== x) {
					h(p);
					return;
				}
				(Ke(E ?? T) === x && Lj(p, b)) || (f.current && !hf(T, b.id)) || h(p);
			},
			g = l ? s1(l) : void 0;
		return Wt(n, m, o, g);
	}, [u, o, e, n, h, l, f]);
}
function Sm(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function Vj({ store: e, hideOnInteractOutside: n, domReady: i, interactedOutsideRef: o, focusedStoreRef: u }) {
	const l = be(e, "open"),
		f = be(e, "contentElement"),
		h = f ? s1(f) : void 0,
		m = kj(l, h, f),
		g = (0, _.useRef)(!1);
	(Ne(() => {
		l && (g.current = !1);
	}, [l, e]),
		Ne(() => {
			if (!l || !i || !f) return;
			const y = () => {
				((g.current = !0), (u.current = e));
			};
			return (f.addEventListener("focusin", y, !0), () => f.removeEventListener("focusin", y, !0));
		}, [l, i, f, e, u]));
	const p = { store: e, capture: !0, open: l, contentElement: f, focusedRef: g },
		b = () => {
			(e.hide(), e.getState().open && (o.current = !1));
		};
	(bm({
		...p,
		type: "click",
		listener: (y) => {
			const { contentElement: w, disclosureElement: E } = e.getState(),
				T = m.current;
			if (!T || !w || u1(T, w, E)) return;
			const x = T.rootTarget;
			Mn(x) && ((Ke(x) === Ke(w) && !hf(x, w.id)) || (Sm(n, y) && ((o.current = !0), b())));
		},
	}),
		bm({
			...p,
			type: "focusin",
			listener: (y) => {
				const { contentElement: w } = e.getState();
				if (!w || y.target === Ke(w) || !Sm(n, y)) return;
				const E = y.target;
				(Mn(E) && Ke(E) !== Ke(w) && (o.current = !0), b());
			},
		}),
		bm({
			...p,
			type: "contextmenu",
			listener: (y) => {
				Sm(n, y) && ((o.current = !0), b());
			},
		}));
}
var ZS = (0, _.createContext)({});
function Bj(e) {
	const n = (0, _.useContext)(ZS),
		[i, o] = (0, _.useState)([]),
		u = (0, _.useCallback)(
			(f) => (
				o((h) => [...h, f]),
				en(n.add?.(f), () => {
					o((h) => h.filter((m) => m !== f));
				})
			),
			[n],
		);
	Ne(
		() =>
			nt(e, ["open", "contentElement"], (f) => {
				if (f.open && f.contentElement) return n.add?.(e);
			}),
		[e, n],
	);
	const l = (0, _.useMemo)(() => ({ store: e, add: u }), [e, u]);
	return {
		wrapElement: (0, _.useCallback)((f) => (0, S.jsx)(ZS.Provider, { value: l, children: f }), [l]),
		nestedDialogs: i,
	};
}
function Pj({ attribute: e, contentId: n, contentElement: i, enabled: o }) {
	const [u, l] = N_(),
		f = (0, _.useCallback)(() => {
			if (!o || !i) return !1;
			const { body: h } = Ke(i),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [u, o, i, e, n]);
	return (
		Ne(() => {
			if (!o || !n || !i) return;
			const { body: h } = Ke(i);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, hu.flushSync)(l));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [u, o, n, i, f, e, l]),
		f
	);
}
var l1 = cf() && !tI(),
	$j = l1 ? _.useEffect : Ne;
function Hj(e) {
	const { CSS: n } = e;
	return !!n?.supports("scrollbar-gutter", "stable");
}
function FS(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function Zj(e, n, i) {
	const o = Pj({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: i });
	$j(() => {
		if (!o() || !e) return;
		const u = Ke(e),
			l = ar(e),
			{ documentElement: f, body: h } = u,
			m = f.style.getPropertyValue("--scrollbar-width"),
			g = m ? Number.parseInt(m, 10) : l.innerWidth - f.clientWidth,
			p = () => {
				const w = l.getComputedStyle(f),
					E = w.getPropertyValue("scrollbar-gutter"),
					T = E.includes("stable"),
					x = (N) => !N || N === "visible",
					z = !x(w.getPropertyValue("overflow-x")) || !x(w.getPropertyValue("overflow-y")),
					M = () => en(bc(f, "overflow-x", "hidden"), bc(f, "overflow-y", "hidden")),
					A = (N) => (z ? en(N, M()) : N);
				return !T && !g
					? A(Ac(h, { overflow: "hidden" }))
					: T || Hj(l)
						? en(bc(f, "scrollbar-gutter", T ? E : "stable"), M())
						: A(en(bc(f, "--scrollbar-width", `${g}px`), Ac(h, { overflow: "hidden", [FS(f)]: `${g}px` })));
			},
			b = () => {
				const { scrollX: w, scrollY: E, visualViewport: T } = l,
					x = T?.offsetLeft ?? 0,
					z = T?.offsetTop ?? 0,
					M = Ac(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(E - Math.floor(z))}px`,
						left: `${-(w - Math.floor(x))}px`,
						right: "0",
						[FS(f)]: `${g}px`,
					});
				return () => {
					(M(), l.scrollTo({ left: w, top: E, behavior: "instant" }));
				};
			};
		if (l1) return b();
		const y = p();
		return () => {
			queueMicrotask(y);
		};
	}, [o, e]);
}
var c1 = new WeakSet();
function Fj(e) {
	c1.add(e);
}
function f1(e) {
	return c1.has(e);
}
var Xo = new Map();
function Qj(e, n = {}) {
	Xo.set(e, n);
}
function Yj(e) {
	Xo.delete(e);
}
function Kj(e) {
	const n = [],
		i = e.current;
	for (const [o, u] of Xo) {
		if (o === e) break;
		const l = [
			u.getPortalNode?.(),
			u.getWrapperElement?.(),
			u.getBackdropElement?.(),
			u.getHiddenDismissElement?.(),
			o.current,
		];
		for (const f of l) f?.isConnected && ((i && ht(f, i)) || n.push(f));
	}
	return n;
}
function wm(e) {
	let n = !1;
	for (const [i, o] of Xo) {
		if (i === e) {
			n = !0;
			continue;
		}
		n && o.onEarlierDialogElementChange?.();
	}
}
function Gj(e) {
	const n = e.current;
	if (!n || !hf(n)) return !1;
	const i = Xo.get(e)?.getOutsideCleanups?.();
	let o = !1,
		u = !1;
	for (const [l, f] of Xo) {
		if (l === e) {
			o = !0;
			continue;
		}
		const h = l.current;
		if (h && RS(n, f.getOutsideCleanups?.())) {
			if (o || !RS(h, i)) return !0;
			u = !0;
		}
	}
	return !(o && u);
}
var Xj = "div",
	Jj = Sg(),
	Ym = new WeakSet(),
	QS = new WeakSet();
function Wj(e) {
	const n = Zn(e);
	return !n || (e && ht(e, n)) || yf(n, e?.id) ? !1 : !!ln(n);
}
function ek(e) {
	let n = e;
	for (; n.shadowRoot;) {
		const i = n.shadowRoot.activeElement;
		if (!Mn(i)) break;
		n = i;
	}
	return n;
}
function YS(e, n, i) {
	return ht(n, e) || (i && ht(i, e)) ? !0 : Cg(e, n);
}
function tk(e) {
	const n = e.querySelectorAll("[data-dialog-dismiss]");
	for (const i of n) if (i.closest("[data-dialog]") === e) return !0;
	return !1;
}
function KS(e, n = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (n ? (ln(i) ? i : null) : i) : null;
}
function nk(e) {
	if (!e.isConnected) return [];
	const n = e.getRootNode(),
		i = n.querySelectorAll("[data-dialog][data-dialog-portal][data-open]"),
		o = [];
	let u = !1;
	for (const l of i) {
		if (l === e) {
			u = !0;
			continue;
		}
		if (!u) continue;
		const f = l.getAttribute("data-dialog-portal");
		if (!f) continue;
		const h = n.getElementById(f);
		!h || !ht(h, l) || Ym.has(h) || o.push(h);
	}
	return o;
}
var d1 = We(function ({
	store: n,
	open: i,
	onClose: o,
	focusable: u = !0,
	modal: l = !0,
	portal: f = l,
	backdrop: h = l,
	hideOnEscape: m = !0,
	hideOnInteractOutside: g = !0,
	getPersistentElements: p,
	preventBodyScroll: b = l,
	autoFocusOnShow: y = !0,
	autoFocusOnHide: w = !0,
	initialFocus: E,
	finalFocus: T,
	unmountOnHide: x,
	unstable_treeSnapshotKey: z,
	unstable_wrapperElement: M,
	...A
}) {
	const N = Ru(),
		D = (0, _.useRef)(null),
		k = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		L = l && f && !A.portalElement,
		H = (0, _.useRef)(!1),
		te = Ae(() => {
			const le = D.current;
			if (!le) return !0;
			const Oe = new Event("close", { bubbles: !1, cancelable: !0 });
			return (o && le.addEventListener("close", o, { once: !0 }), le.dispatchEvent(Oe), !Oe.defaultPrevented);
		}),
		R = r1({
			store: n || N,
			open: i,
			setOpen(le) {
				le || H.current || te() || R.setOpen(!0);
			},
		});
	Ne(
		() =>
			R.unstable_onHideRequest((le) => {
				if (!H.current) {
					H.current = !0;
					try {
						if (!te()) return;
						le();
					} finally {
						H.current = !1;
					}
				}
			}),
		[R, te],
	);
	const { portalRef: q, portalNode: P, domReady: F } = Og(f, A.portalRef),
		Y = yu(P),
		B = yu(M),
		ne = A.preserveTabOrder,
		re = be(R, ["mounted"], (le) => ne && !l && le.mounted),
		U = Ur(A.id),
		ee = be(R, "open"),
		K = be(R, "mounted"),
		ue = be(R, "contentElement"),
		xe = Nu(K, A.hidden, A.alwaysVisible);
	Zj(ue, U, b && !xe);
	const ve = (0, _.useRef)(!1),
		j = (0, _.useRef)(null);
	(Ne(
		() =>
			nt(R, ["open"], (le) => {
				if (!le.open) {
					j.current = null;
					return;
				}
				((ve.current = !1), j.current !== R && (j.current = null));
			}),
		[R],
	),
		Vj({ store: R, hideOnInteractOutside: g, domReady: F, interactedOutsideRef: ve, focusedStoreRef: j }));
	const { wrapElement: ae, nestedDialogs: W } = Bj(R);
	A = Ht(A, ae, [ae]);
	const fe = (0, _.useRef)(null);
	(Jj &&
		(0, _.useEffect)(() => {
			if (!F) return;
			const le = D.current;
			if (!le) return;
			const Oe = Ke(le),
				Ie = (pe) => {
					fe.current = pe.target;
				};
			return (
				Oe.addEventListener("mousedown", Ie, !0),
				() => {
					Oe.removeEventListener("mousedown", Ie, !0);
				}
			);
		}, [F]),
		Ne(() => {
			if (!ee || j.current === R) return;
			const le = D.current;
			if (
				(() => {
					const { disclosureElement: Me } = R.getState();
					return !(!Me || f1(Me) || !Me.isConnected || (le && ht(le, Me)));
				})()
			)
				return;
			const Ie = (Me) => {
					(Fj(Me), R.setDisclosureElement(Me));
				},
				pe = Zn(le, { activeDescendant: !0 });
			if (pe) {
				if (pe.tagName === "BODY") {
					const Me = fe.current;
					if (((fe.current = null), !Me?.isConnected || !ln(Me) || (le && ht(le, Me)))) return;
					Ie(Me);
					return;
				}
				(le && ht(le, pe)) || Ie(pe);
			}
		}, [R, ee]),
		(0, _.useEffect)(() => {
			if (!K || !F) return;
			const le = D.current;
			if (!le) return;
			const Oe = ar(le),
				Ie = Oe.visualViewport || Oe,
				pe = () => {
					const Me = Oe.visualViewport?.height ?? Oe.innerHeight;
					le.style.setProperty("--dialog-viewport-height", `${Me}px`);
				};
			return (
				pe(),
				Ie.addEventListener("resize", pe),
				() => {
					Ie.removeEventListener("resize", pe);
				}
			);
		}, [K, F]));
	const [Ee, _e] = (0, _.useState)(!1);
	(Ne(() => {
		if (!(l && ee && F) || !ue) {
			_e(!1);
			return;
		}
		const le = () => {
			_e(!tk(ue));
		};
		le();
		const { MutationObserver: Oe } = ar(ue),
			Ie = new Oe(le);
		return (Ie.observe(ue, { childList: !0, subtree: !0 }), () => Ie.disconnect());
	}, [l, ee, F, ue]),
		Ne(() => {
			if (!Ug() || ee || !K || !F) return;
			const le = D.current;
			if (le) return i1(le);
		}, [ee, K, F]));
	const Ce = ee && F,
		ce = (0, _.useRef)(null);
	Ne(() => {
		if (!U || !L || !Ce || !P) {
			ce.current = null;
			return;
		}
		const le = D.current;
		if (!le || !ht(P, le)) {
			ce.current = null;
			return;
		}
		return (
			ce.current?.portal !== P && (ce.current = { portal: P, peers: nk(le) }),
			Ym.add(P),
			() => {
				Ym.delete(P);
			}
		);
	}, [U, Ce, L, P]);
	const ye = !!Ce,
		[Ge, ct] = (0, _.useState)(0);
	(Ne(() => {
		ye &&
			Qj(D, {
				getOutsideCleanups: () => Qe.current?.outsideCleanups,
				getPortalNode: () => Y.current,
				getWrapperElement: () => B.current,
				getBackdropElement: () => k.current,
				getHiddenDismissElement: () => O.current,
				onEarlierDialogElementChange: () => {
					ct((le) => le + 1);
				},
			});
	}, [ye, Y, B]),
		Ne(() => {
			if (ee) return () => Yj(D);
		}, [ee]));
	const mt = (0, _.useRef)(null);
	Ne(() => {
		if (!ye) {
			mt.current = null;
			return;
		}
		if (!ue) return;
		const le = mt.current;
		((mt.current = ue), le && le !== ue && wm(D));
	}, [ye, ue]);
	const _t = (0, _.useCallback)(() => {
		wm(D);
	}, []);
	Ne(() => {
		Ee && wm(D);
	}, [Ee]);
	const et = (0, _.useRef)(null);
	(Ne(() => {
		if (!U || !Ce) return;
		const le = D.current;
		if (!le) return;
		const Oe = le.getRootNode(),
			Ie = et.current;
		if (Ie?.rootNode === Oe) return;
		Ie?.restore();
		const pe = Cj(U, [le]);
		et.current = { rootNode: Oe, restore: pe };
	}, [U, Ce, z]),
		Ne(() => {
			if (ee)
				return () => {
					(et.current?.restore(), (et.current = null));
				};
		}, [U, ee, z]),
		Ne(() => {
			if (!U || !Ce) return;
			const le = Kj(D);
			return G_(U, le);
		}, [U, Ce, Ge]));
	const Ue = Ae(p),
		Qe = (0, _.useRef)(null);
	(Ne(
		() => () => {
			const le = Qe.current;
			le && ((Qe.current = null), le.restoreInsideMarks(), Tg(le.outsideCleanups));
		},
		[U, R, Ce, ue, l, L, Ue, z],
	),
		Ne(() => {
			if (!U || !Ce) return;
			const { disclosureElement: le } = R.getState(),
				Oe = ue ?? D.current;
			if (!Oe) return;
			const Ie = [Oe, ...(Ue() || []), ...(ce.current?.peers || []), ...W.map((Sr) => Sr.getState().contentElement)],
				pe = Qe.current;
			pe?.restoreInsideMarks();
			const Me = wI(Oe, Ie),
				Yt = l ? jj(U, Ie, pe?.outsideCleanups) : Tj(U, [le, ...Ie], pe?.outsideCleanups);
			Qe.current = { restoreInsideMarks: Me, outsideCleanups: Yt };
		}, [U, R, Ce, ue, l, L, Ue, W, z, Ge]));
	const dn = !!y,
		At = ut(y),
		[Fn, Qn] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!ee || !dn || !F || !ue?.isConnected) return;
		const le = KS(E, !0) || ue.querySelector("[data-autofocus=true],[autofocus]") || Zm(ue, !0, f && re) || ue,
			Oe = ln(le);
		At(Oe ? le : null) &&
			(Qn(!0),
			queueMicrotask(() => {
				const { open: Ie, disclosureElement: pe } = R.getState();
				if (!Ie) return;
				const Me = Zn(ue, { frame: !1 }),
					Yt = Me && ek(Me);
				(j.current === R && Me && Yt && ln(Yt) && !YS(Me, ue, pe) && !YS(Yt, ue, pe)) ||
					(ln(le) && le.scrollIntoView({ block: "nearest", inline: "nearest" }), le.focus({ preventScroll: !0 }));
			}));
	}, [ee, dn, F, ue, E, f, re, R, At, j]);
	const Ct = !!w,
		qt = ut(w),
		[hn, Qt] = (0, _.useState)(!1);
	Ne(() => {
		if (ee) return (Qt(!0), () => Qt(!1));
	}, [ee]);
	const he = (0, _.useCallback)(
			(le, Oe = !0) => {
				if (ve.current) return;
				const { disclosureElement: Ie } = R.getState();
				if (Wj(le)) return;
				let pe = KS(T) || Ie;
				if (pe?.id) {
					const Yt = Ke(pe),
						Sr = `[aria-activedescendant="${pe.id}"]`,
						vi = Yt.querySelector(Sr);
					vi && (pe = vi);
				}
				if (pe && !ln(pe)) {
					const Yt = pe.closest("[data-dialog]");
					if (Yt?.id) {
						const Sr = Ke(Yt),
							vi = `[aria-controls~="${Yt.id}"]`,
							gn = Sr.querySelector(vi);
						gn && (pe = gn);
					}
				}
				const Me = pe && ln(pe);
				if (!Me && Oe) {
					requestAnimationFrame(() => he(le, !1));
					return;
				}
				qt(Me ? pe : null) && Me && pe?.focus();
			},
			[R, T, qt],
		),
		Te = (0, _.useRef)(!1);
	(Ne(() => {
		if (ee || !hn || !Ct) return;
		const le = D.current;
		((Te.current = !0), he(le));
	}, [ee, hn, F, Ct, he]),
		(0, _.useEffect)(() => {
			if (!hn || !Ct) return;
			const le = D.current;
			return () => {
				if (Te.current) {
					Te.current = !1;
					return;
				}
				he(le);
			};
		}, [hn, Ct, he]));
	const bt = ut(m),
		[Tt] = (0, _.useState)(() => new WeakMap()),
		[ea] = (0, _.useState)(() => new WeakMap()),
		Fa = A.onKeyDown,
		ta = A.onKeyDownCapture,
		mi = A.onFocusCapture,
		pr = Ae((le) => {
			if ((mi?.(le), !R.getState().open)) return;
			const Oe = le.target;
			Uc(Oe) && ht(le.currentTarget, Oe) && (j.current = R);
		}),
		gi = Ae((le) => {
			if (le.key !== "Escape" || !le.bubbles) return !1;
			const Oe = Tt.get(le);
			if (Oe) return le.defaultPrevented && !Oe.defaultPrevented ? !1 : Oe.accepted;
			if (le.defaultPrevented) return !1;
			const Ie = D.current;
			if (!K || !Ie) return !1;
			const pe = Fm(le);
			let Me = ea.get(pe);
			return (
				Me || ((Me = { accepted: !Gj(D) && !QS.has(pe) && bt(le), hidden: !1 }), ea.set(pe, Me)),
				Tt.set(le, { accepted: Me.accepted, defaultPrevented: le.defaultPrevented }),
				Me.accepted
			);
		}),
		br = Ae((le) => {
			const Oe = gi(le);
			if ((Tt.delete(le), !Oe)) return !1;
			const Ie = Fm(le),
				pe = ea.get(Ie);
			return (pe?.hidden || (pe && (pe.hidden = !0), QS.add(Ie), R.hide()), !0);
		}),
		tn = Ae((le) => {
			const Oe = le.nativeEvent,
				Ie = Oe.cancelBubble;
			if ((Fa?.(le), Ie)) {
				Tt.delete(Oe);
				return;
			}
			br(Oe) && le.stopPropagation();
		}),
		de = Ae((le) => {
			const Oe = le.nativeEvent,
				Ie = Oe.cancelBubble;
			if ((ta?.(le), Ie)) {
				Tt.delete(Oe);
				return;
			}
			gi(Oe) && (le.isPropagationStopped() || Oe.cancelBubble) && br(Oe);
		});
	((0, _.useEffect)(() => {
		if (!F || !K) return;
		const le = (pe) => {
				if (pe.key !== "Escape" || !pe.bubbles) return;
				if (pe.cancelBubble) {
					Tt.delete(pe);
					return;
				}
				if (Tt.has(pe)) return;
				const Me = D.current;
				if (!Me) return;
				const Yt = [pe.target, pe.composedPath()[0]].filter(Uc),
					{ disclosureElement: Sr } = R.getState(),
					vi = (gn) =>
						!!(
							(Mn(gn) && gn.tagName === "BODY") ||
							ht(Me, gn) ||
							!Sr ||
							ht(Sr, gn) ||
							(Mn(gn) && hf(gn, Me.id)) ||
							(Mn(gn) && yf(gn, Me.id))
						);
				Yt.some(vi) && gi(pe) && pe.cancelBubble && br(pe);
			},
			Oe = (pe) => {
				if (Tt.has(pe)) {
					if (pe.cancelBubble) {
						Tt.delete(pe);
						return;
					}
					br(pe) && pe.stopPropagation();
				}
			},
			Ie = ue ? ar(ue) : void 0;
		return en(Wt("keydown", le, !0, Ie), Wt("keydown", Oe, !1, Ie));
	}, [R, F, K, ue, br, gi, Tt]),
		(A = Ht(A, (le) => (0, S.jsx)(fj, { level: l ? 1 : void 0, children: le }), [l])));
	const Be = A.hidden,
		Rt = A.alwaysVisible;
	((A = Ht(
		A,
		(le) =>
			(0, S.jsxs)(S.Fragment, {
				children: [
					Ee &&
						(0, S.jsx)("button", {
							ref: O,
							type: "button",
							tabIndex: -1,
							"data-dialog-hidden-dismiss": U || "",
							style: Z_(),
							onClick: R.hide,
							children: "Dismiss popup",
						}),
					le,
				],
			}),
		[Ee, U, R],
	)),
		(A = Ht(
			A,
			(le) =>
				(0, S.jsxs)(S.Fragment, {
					children: [
						!!h &&
							(0, S.jsx)(Nj, {
								store: R,
								backdrop: h,
								backdropRef: k,
								onElementChange: _t,
								hidden: Be,
								alwaysVisible: Rt,
							}),
						le,
					],
				}),
			[R, h, _t, Be, Rt],
		)));
	const [ft, pn] = (0, _.useState)(),
		[mn, kn] = (0, _.useState)();
	return (
		(A = Ht(
			A,
			(le) =>
				(0, S.jsx)(Dg, {
					value: R,
					children: (0, S.jsx)(I_.Provider, {
						value: pn,
						children: (0, S.jsx)(QI.Provider, { value: kn, children: le }),
					}),
				}),
			[R],
		)),
		(A = {
			"data-dialog": "",
			role: "dialog",
			tabIndex: u ? -1 : void 0,
			"aria-labelledby": A["aria-label"] != null ? void 0 : ft,
			"aria-describedby": mn,
			...A,
			"data-dialog-portal": L ? P?.id : void 0,
			id: U,
			ref: kt(D, A.ref),
			onFocusCapture: pr,
			onKeyDown: tn,
			onKeyDownCapture: de,
		}),
		(A = H_({ ...A, autoFocusOnShow: Fn })),
		(A = kg({ store: R, ...A, unstable_otherElementRef: k })),
		(A = xu({ ...A, focusable: u })),
		(A = Y_({ portal: f, ...A, portalRef: q, preserveTabOrder: re })),
		A
	);
});
function Mu(e, n = Ru) {
	return Fe(function (o) {
		const u = n(),
			l = o.store || u;
		return be(l, ["mounted"], (f) => !o.unmountOnHide || f?.mounted || !!o.open) ? (0, S.jsx)(e, { ...o }) : null;
	});
}
var h1 = Mu(
		Fe(function (n) {
			const i = d1(n);
			return Je(Xj, i);
		}),
		Ru,
	),
	rk = Fe(function (n) {
		const i = r1({ open: n.open });
		return (0, S.jsx)(h1, { ...n, store: i });
	}),
	EL = Fe(function (n) {
		const i = Ru();
		return n.store || i || !n.unmountOnHide ? (0, S.jsx)(h1, { ...n }) : (0, S.jsx)(rk, { ...n });
	}),
	Du = Vr([FI], [Dg]),
	_L = Du.useContext,
	CL = Du.useScopedContext,
	Vg = Du.useProviderContext,
	m1 = Du.ContextProvider,
	pf = Du.ScopedContextProvider;
function Bg(e) {
	return e.split("-")[0];
}
var Qi = Math.min,
	li = Math.max,
	Gc = Math.round,
	_c = Math.floor,
	ci = (e) => ({ x: e, y: e }),
	ik = { left: "right", right: "left", bottom: "top", top: "bottom" };
function g1(e, n, i) {
	return li(e, Qi(n, i));
}
function Yi(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function Ki(e) {
	return e.split("-")[0];
}
function is(e) {
	return e.split("-")[1];
}
function Pg(e) {
	return e === "x" ? "y" : "x";
}
function $g(e) {
	return e === "y" ? "height" : "width";
}
function jr(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function Hg(e) {
	return Pg(jr(e));
}
function ak(e, n, i) {
	i === void 0 && (i = !1);
	const o = is(e),
		u = Hg(e),
		l = $g(u);
	let f = u === "x" ? (o === (i ? "end" : "start") ? "right" : "left") : o === "start" ? "bottom" : "top";
	return (n.reference[l] > n.floating[l] && (f = Xc(f)), [f, Xc(f)]);
}
function ok(e) {
	const n = Xc(e);
	return [Km(e), n, Km(n)];
}
function Km(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var GS = ["left", "right"],
	XS = ["right", "left"],
	sk = ["top", "bottom"],
	uk = ["bottom", "top"];
function lk(e, n, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (n ? XS : GS) : n ? GS : XS;
		case "left":
		case "right":
			return n ? sk : uk;
		default:
			return [];
	}
}
function ck(e, n, i, o) {
	const u = is(e);
	let l = lk(Ki(e), i === "start", o);
	return (u && ((l = l.map((f) => f + "-" + u)), n && (l = l.concat(l.map(Km)))), l);
}
function Xc(e) {
	const n = Ki(e);
	return ik[n] + e.slice(n.length);
}
function fk(e) {
	var n, i, o, u;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (o = e.bottom) != null ? o : 0,
		left: (u = e.left) != null ? u : 0,
	};
}
function v1(e) {
	return typeof e != "number" ? fk(e) : { top: e, right: e, bottom: e, left: e };
}
function Jc(e) {
	const { x: n, y: i, width: o, height: u } = e;
	return { width: o, height: u, top: i, left: n, right: n + o, bottom: i + u, x: n, y: i };
}
function JS(e, n, i) {
	let { reference: o, floating: u } = e;
	const l = jr(n),
		f = Hg(n),
		h = $g(f),
		m = Ki(n),
		g = l === "y",
		p = o.x + o.width / 2 - u.width / 2,
		b = o.y + o.height / 2 - u.height / 2,
		y = o[h] / 2 - u[h] / 2;
	let w;
	switch (m) {
		case "top":
			w = { x: p, y: o.y - u.height };
			break;
		case "bottom":
			w = { x: p, y: o.y + o.height };
			break;
		case "right":
			w = { x: o.x + o.width, y: b };
			break;
		case "left":
			w = { x: o.x - u.width, y: b };
			break;
		default:
			w = { x: o.x, y: o.y };
	}
	const E = is(n);
	return (E && (w[f] += y * (E === "end" ? 1 : -1) * (i && g ? -1 : 1)), w);
}
async function dk(e, n) {
	var i;
	n === void 0 && (n = {});
	const { x: o, y: u, platform: l, rects: f, elements: h, strategy: m } = e,
		{
			boundary: g = "clippingAncestors",
			rootBoundary: p = "viewport",
			elementContext: b = "floating",
			altBoundary: y = !1,
			padding: w = 0,
		} = Yi(n, e),
		E = v1(w),
		T = h[y ? (b === "floating" ? "reference" : "floating") : b],
		x = Jc(
			await l.getClippingRect({
				element:
					(i = await (l.isElement == null ? void 0 : l.isElement(T))) == null || i
						? T
						: T.contextElement || (await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(h.floating))),
				boundary: g,
				rootBoundary: p,
				strategy: m,
			}),
		),
		z = b === "floating" ? { x: o, y: u, width: f.floating.width, height: f.floating.height } : f.reference,
		M = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(h.floating)),
		A = ((await (l.isElement == null ? void 0 : l.isElement(M))) &&
			(await (l.getScale == null ? void 0 : l.getScale(M)))) || { x: 1, y: 1 },
		N = Jc(
			l.convertOffsetParentRelativeRectToViewportRelativeRect
				? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: z,
						offsetParent: M,
						strategy: m,
					})
				: z,
		);
	return {
		top: (x.top - N.top + E.top) / A.y,
		bottom: (N.bottom - x.bottom + E.bottom) / A.y,
		left: (x.left - N.left + E.left) / A.x,
		right: (N.right - x.right + E.right) / A.x,
	};
}
var hk = 50,
	mk = async (e, n, i) => {
		const { placement: o = "bottom", strategy: u = "absolute", middleware: l = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: dk },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let g = await f.getElementRects({ reference: e, floating: n, strategy: u }),
			{ x: p, y: b } = JS(g, o, m),
			y = o,
			w = 0;
		const E = {};
		for (let T = 0; T < l.length; T++) {
			const x = l[T];
			if (!x) continue;
			const { name: z, fn: M } = x,
				{
					x: A,
					y: N,
					data: D,
					reset: k,
				} = await M({
					x: p,
					y: b,
					initialPlacement: o,
					placement: y,
					strategy: u,
					middlewareData: E,
					rects: g,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((p = A ?? p),
				(b = N ?? b),
				(E[z] = { ...E[z], ...D }),
				k &&
					w < hk &&
					(w++,
					typeof k == "object" &&
						(k.placement && (y = k.placement),
						k.rects &&
							(g = k.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: u }) : k.rects),
						({ x: p, y: b } = JS(g, y, m))),
					(T = -1)));
		}
		return { x: p, y: b, placement: y, strategy: u, middlewareData: E };
	},
	gk = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: i, y: o, placement: u, rects: l, platform: f, elements: h, middlewareData: m } = n,
				{ element: g, padding: p = 0 } = Yi(e, n) || {};
			if (g == null) return {};
			const b = v1(p),
				y = { x: i, y: o },
				w = Hg(u),
				E = $g(w),
				T = await f.getDimensions(g),
				x = w === "y",
				z = x ? "top" : "left",
				M = x ? "bottom" : "right",
				A = x ? "clientHeight" : "clientWidth",
				N = l.reference[E] + l.reference[w] - y[w] - l.floating[E],
				D = y[w] - l.reference[w],
				k = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(g));
			let O = k ? k[A] : 0;
			(!O || !(await (f.isElement == null ? void 0 : f.isElement(k)))) && (O = h.floating[A] || l.floating[E]);
			const L = N / 2 - D / 2,
				H = O / 2 - T[E] / 2 - 1,
				te = Qi(b[z], H),
				R = Qi(b[M], H),
				q = O - T[E] - R,
				P = O / 2 - T[E] / 2 + L,
				F = g1(te, P, q),
				Y = !m.arrow && is(u) != null && P !== F && l.reference[E] / 2 - (P < te ? te : R) - T[E] / 2 < 0,
				B = Y ? (P < te ? P - te : P - q) : 0;
			return { [w]: y[w] + B, data: { [w]: F, centerOffset: P - F - B, ...(Y && { alignmentOffset: B }) }, reset: Y };
		},
	}),
	vk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var i, o;
					const { placement: u, middlewareData: l, rects: f, initialPlacement: h, platform: m, elements: g } = n,
						{
							mainAxis: p = !0,
							crossAxis: b = !0,
							fallbackPlacements: y,
							fallbackStrategy: w = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: T = !0,
							...x
						} = Yi(e, n);
					if ((i = l.arrow) != null && i.alignmentOffset) return {};
					const z = Ki(u),
						M = jr(h),
						A = Ki(h) === h,
						N = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)),
						D = y || (A || !T ? [Xc(h)] : ok(h)),
						k = E !== "none";
					!y && k && D.push(...ck(h, T, E, N));
					const O = [h, ...D],
						L = await m.detectOverflow(n, x),
						H = [];
					let te = ((o = l.flip) == null ? void 0 : o.overflows) || [];
					if ((p && H.push(L[z]), b)) {
						const F = ak(u, f, N);
						H.push(L[F[0]], L[F[1]]);
					}
					if (((te = [...te, { placement: u, overflows: H }]), !H.every((F) => F <= 0))) {
						var R, q;
						const F = (((R = l.flip) == null ? void 0 : R.index) || 0) + 1,
							Y = O[F];
						if (
							Y &&
							(!(b === "alignment" && M !== jr(Y)) ||
								te.every((ne) => (jr(ne.placement) === M ? ne.overflows[0] > 0 : !0)))
						)
							return { data: { index: F, overflows: te }, reset: { placement: Y } };
						let B =
							(q = te.filter((ne) => ne.overflows[0] <= 0).sort((ne, re) => ne.overflows[1] - re.overflows[1])[0]) ==
							null
								? void 0
								: q.placement;
						if (!B)
							switch (w) {
								case "bestFit": {
									var P;
									const ne =
										(P = te
											.filter((re) => {
												if (k) {
													const U = jr(re.placement);
													return U === M || U === "y";
												}
												return !0;
											})
											.map((re) => [re.placement, re.overflows.filter((U) => U > 0).reduce((U, ee) => U + ee, 0)])
											.sort((re, U) => re[1] - U[1])[0]) == null
											? void 0
											: P[0];
									ne && (B = ne);
									break;
								}
								case "initialPlacement":
									B = h;
							}
						if (u !== B) return { reset: { placement: B } };
					}
					return {};
				},
			}
		);
	},
	y1 = new Set(["left", "top"]);
async function yk(e, n) {
	const { placement: i, platform: o, elements: u } = e,
		l = await (o.isRTL == null ? void 0 : o.isRTL(u.floating)),
		f = Ki(i),
		h = is(i),
		m = jr(i) === "y",
		g = y1.has(f) ? -1 : 1,
		p = l && m ? -1 : 1,
		b = Yi(n, e);
	let {
		mainAxis: y,
		crossAxis: w,
		alignmentAxis: E,
	} = typeof b == "number"
		? { mainAxis: b, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: b.mainAxis || 0, crossAxis: b.crossAxis || 0, alignmentAxis: b.alignmentAxis };
	return (
		h && typeof E == "number" && (w = h === "end" ? E * -1 : E),
		m ? { x: w * p, y: y * g } : { x: y * g, y: w * p }
	);
}
var pk = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var i, o;
					const { x: u, y: l, placement: f, middlewareData: h } = n,
						m = await yk(n, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (o = h.arrow) != null && o.alignmentOffset
						? {}
						: { x: u + m.x, y: l + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	bk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "shift",
				options: e,
				async fn(n) {
					const { x: i, y: o, placement: u, platform: l } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (M) => {
									let { x: A, y: N } = M;
									return { x: A, y: N };
								},
							},
							...g
						} = Yi(e, n),
						p = { x: i, y: o },
						b = await l.detectOverflow(n, g),
						y = jr(u),
						w = Pg(y);
					let E = p[w],
						T = p[y];
					const x = (M, A) => g1(A + b[M === "y" ? "top" : "left"], A, A - b[M === "y" ? "bottom" : "right"]);
					(f && (E = x(w, E)), h && (T = x(y, T)));
					const z = m.fn({ ...n, [w]: E, [y]: T });
					return { ...z, data: { x: z.x - i, y: z.y - o, enabled: { [w]: f, [y]: h } } };
				},
			}
		);
	},
	Sk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var i, o;
					const { x: u, y: l, placement: f, rects: h, middlewareData: m } = n,
						{ offset: g = 0, mainAxis: p = !0, crossAxis: b = !0 } = Yi(e, n),
						y = { x: u, y: l },
						w = jr(f),
						E = Pg(w);
					let T = y[E],
						x = y[w];
					const z = Yi(g, n),
						M =
							typeof z == "number"
								? { mainAxis: z, crossAxis: 0 }
								: { mainAxis: (i = z.mainAxis) != null ? i : 0, crossAxis: (o = z.crossAxis) != null ? o : 0 };
					if (p) {
						const D = E === "y" ? "height" : "width",
							k = h.reference[E] - h.floating[D] + M.mainAxis,
							O = h.reference[E] + h.reference[D] - M.mainAxis;
						T < k ? (T = k) : T > O && (T = O);
					}
					if (b) {
						var A, N;
						const D = E === "y" ? "width" : "height",
							k = y1.has(Ki(f)),
							O =
								h.reference[w] -
								h.floating[D] +
								((k && ((A = m.offset) == null ? void 0 : A[w])) || 0) +
								(k ? 0 : M.crossAxis),
							L =
								h.reference[w] +
								h.reference[D] +
								(k ? 0 : ((N = m.offset) == null ? void 0 : N[w]) || 0) -
								(k ? M.crossAxis : 0);
						x < O ? (x = O) : x > L && (x = L);
					}
					return { [E]: T, [w]: x };
				},
			}
		);
	},
	wk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: i, rects: o, platform: u, elements: l } = n,
						{ apply: f = () => {}, ...h } = Yi(e, n),
						m = await u.detectOverflow(n, h),
						g = Ki(i),
						p = is(i),
						b = jr(i) === "y",
						{ width: y, height: w } = o.floating;
					let E, T;
					g === "top" || g === "bottom"
						? ((E = g),
							(T =
								p === ((await (u.isRTL == null ? void 0 : u.isRTL(l.floating))) ? "start" : "end") ? "left" : "right"))
						: ((T = g), (E = p === "end" ? "top" : "bottom"));
					const x = w - m.top - m.bottom,
						z = y - m.left - m.right,
						M = Qi(w - m[E], x),
						A = Qi(y - m[T], z),
						N = n.middlewareData.shift,
						D = !N;
					let k = M,
						O = A;
					(N != null && N.enabled.x && (O = z),
						N != null && N.enabled.y && (k = x),
						D && !p && (b ? (O = y - 2 * li(m.left, m.right)) : (k = w - 2 * li(m.top, m.bottom))),
						await f({ ...n, availableWidth: O, availableHeight: k }));
					const L = await u.getDimensions(l.floating);
					return y !== L.width || w !== L.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function bf() {
	return typeof window < "u";
}
function as(e) {
	return p1(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Dn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function hi(e) {
	var n;
	return (n = (p1(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function p1(e) {
	return bf() ? e instanceof Node || e instanceof Dn(e).Node : !1;
}
function qr(e) {
	return bf() ? e instanceof Element || e instanceof Dn(e).Element : !1;
}
function Wi(e) {
	return bf() ? e instanceof HTMLElement || e instanceof Dn(e).HTMLElement : !1;
}
function WS(e) {
	return !bf() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Dn(e).ShadowRoot;
}
function Sf(e) {
	const { overflow: n, overflowX: i, overflowY: o, display: u } = Lr(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + o + i) && u !== "inline" && u !== "contents";
}
function Ek(e) {
	return /^(table|td|th)$/.test(as(e));
}
function wf(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var _k = /transform|translate|scale|rotate|perspective|filter/,
	Ck = /paint|layout|strict|content/,
	Oa = (e) => !!e && e !== "none",
	Em;
function Zg(e) {
	const n = qr(e) ? Lr(e) : e;
	return (
		Oa(n.transform) ||
		Oa(n.translate) ||
		Oa(n.scale) ||
		Oa(n.rotate) ||
		Oa(n.perspective) ||
		(!Fg() && (Oa(n.backdropFilter) || Oa(n.filter))) ||
		_k.test(n.willChange || "") ||
		Ck.test(n.contain || "")
	);
}
function Tk(e) {
	let n = Ua(e);
	for (; Wi(n) && !bu(n);) {
		if (Zg(n)) return n;
		if (wf(n)) return null;
		n = Ua(n);
	}
	return null;
}
function Fg() {
	return (Em == null && (Em = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Em);
}
function bu(e) {
	return /^(html|body|#document)$/.test(as(e));
}
function Lr(e) {
	return Dn(e).getComputedStyle(e);
}
function Ef(e) {
	return qr(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ua(e) {
	if (as(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (WS(e) && e.host) || hi(e);
	return WS(n) ? n.host : n;
}
function b1(e) {
	const n = Ua(e);
	return bu(n) ? (e.ownerDocument || e).body : Wi(n) && Sf(n) ? n : b1(n);
}
function Su(e, n, i) {
	var o;
	(n === void 0 && (n = []), i === void 0 && (i = !0));
	const u = b1(e),
		l = u === ((o = e.ownerDocument) == null ? void 0 : o.body),
		f = Dn(u);
	if (l) {
		const h = Gm(f);
		return n.concat(f, f.visualViewport || [], Sf(u) ? u : [], h && i ? Su(h) : []);
	} else return n.concat(u, Su(u, [], i));
}
function Gm(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function S1(e) {
	const n = Lr(e);
	let i = parseFloat(n.width) || 0,
		o = parseFloat(n.height) || 0;
	const u = Wi(e),
		l = u ? e.offsetWidth : i,
		f = u ? e.offsetHeight : o,
		h = Gc(i) !== l || Gc(o) !== f;
	return (h && ((i = l), (o = f)), { width: i, height: o, $: h });
}
function Qg(e) {
	return qr(e) ? e : e.contextElement;
}
function $o(e) {
	const n = Qg(e);
	if (!Wi(n)) return ci(1);
	const i = n.getBoundingClientRect(),
		{ width: o, height: u, $: l } = S1(n);
	let f = (l ? Gc(i.width) : i.width) / o,
		h = (l ? Gc(i.height) : i.height) / u;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var xk = ci(0);
function w1(e) {
	const n = Dn(e);
	return !Fg() || !n.visualViewport ? xk : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function Ok(e, n, i) {
	return (n === void 0 && (n = !1), !!i && n && i === Dn(e));
}
function Va(e, n, i, o) {
	(n === void 0 && (n = !1), i === void 0 && (i = !1));
	const u = e.getBoundingClientRect(),
		l = Qg(e);
	let f = ci(1);
	n && (o ? qr(o) && (f = $o(o)) : (f = $o(e)));
	const h = Ok(l, i, o) ? w1(l) : ci(0);
	let m = (u.left + h.x) / f.x,
		g = (u.top + h.y) / f.y,
		p = u.width / f.x,
		b = u.height / f.y;
	if (l && o) {
		const y = Dn(l),
			w = qr(o) ? Dn(o) : o;
		let E = y,
			T = Gm(E);
		for (; T && w !== E;) {
			const x = $o(T),
				z = T.getBoundingClientRect(),
				M = Lr(T),
				A = z.left + (T.clientLeft + parseFloat(M.paddingLeft)) * x.x,
				N = z.top + (T.clientTop + parseFloat(M.paddingTop)) * x.y;
			((m *= x.x), (g *= x.y), (p *= x.x), (b *= x.y), (m += A), (g += N), (E = Dn(T)), (T = Gm(E)));
		}
	}
	return Jc({ width: p, height: b, x: m, y: g });
}
function _f(e, n) {
	const i = Ef(e).scrollLeft;
	return n ? n.left + i : Va(hi(e)).left + i;
}
function E1(e, n) {
	const i = e.getBoundingClientRect();
	return { x: i.left + n.scrollLeft - _f(e, i), y: i.top + n.scrollTop };
}
function Ak(e) {
	let { elements: n, rect: i, offsetParent: o, strategy: u } = e;
	const l = u === "fixed",
		f = hi(o),
		h = n ? wf(n.floating) : !1;
	if (o === f || (h && l)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		g = ci(1);
	const p = ci(0),
		b = Wi(o);
	if ((b || !l) && ((as(o) !== "body" || Sf(f)) && (m = Ef(o)), b)) {
		const w = Va(o);
		((g = $o(o)), (p.x = w.x + o.clientLeft), (p.y = w.y + o.clientTop));
	}
	const y = f && !b && !l ? E1(f, m) : ci(0);
	return {
		width: i.width * g.x,
		height: i.height * g.y,
		x: i.x * g.x - m.scrollLeft * g.x + p.x + y.x,
		y: i.y * g.y - m.scrollTop * g.y + p.y + y.y,
	};
}
function Rk(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Nk(e) {
	const n = Ef(e),
		i = e.ownerDocument.body,
		o = li(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		u = li(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let l = -n.scrollLeft + _f(e);
	const f = -n.scrollTop;
	return (
		Lr(i).direction === "rtl" && (l += li(e.clientWidth, i.clientWidth) - o),
		{ width: o, height: u, x: l, y: f }
	);
}
var Mk = 25;
function Dk(e, n, i) {
	i === void 0 && (i = "viewport");
	const o = i === "layoutViewport",
		u = Dn(e),
		l = hi(e),
		f = u.visualViewport;
	let h = l.clientWidth,
		m = l.clientHeight,
		g = 0,
		p = 0;
	if (f) {
		const b = !Fg() || n === "fixed";
		o
			? b || ((g = -f.offsetLeft), (p = -f.offsetTop))
			: ((h = f.width), (m = f.height), b && ((g = f.offsetLeft), (p = f.offsetTop)));
	}
	if (_f(l) <= 0) {
		const b = l.ownerDocument,
			y = b.body,
			w = getComputedStyle(y),
			E = (b.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight)) || 0,
			T = Math.abs(l.clientWidth - y.clientWidth - E),
			x = getComputedStyle(l).scrollbarGutter === "stable both-edges" ? T / 2 : T;
		x <= Mk && (h -= x);
	}
	return { width: h, height: m, x: g, y: p };
}
function zk(e, n) {
	const i = Va(e, !0, n === "fixed"),
		o = i.top + e.clientTop,
		u = i.left + e.clientLeft,
		l = $o(e);
	return { width: e.clientWidth * l.x, height: e.clientHeight * l.y, x: u * l.x, y: o * l.y };
}
function ew(e, n, i) {
	let o;
	if (n === "viewport" || n === "layoutViewport") o = Dk(e, i, n);
	else if (n === "document") o = Nk(hi(e));
	else if (qr(n)) o = zk(n, i);
	else {
		const u = w1(e);
		o = { x: n.x - u.x, y: n.y - u.y, width: n.width, height: n.height };
	}
	return Jc(o);
}
function Ik(e, n) {
	const i = n.get(e);
	if (i) return i;
	let o = Su(e, [], !1).filter((h) => qr(h) && as(h) !== "body"),
		u = null;
	const l = Lr(e).position === "fixed";
	let f = l ? Ua(e) : e;
	for (; qr(f) && !bu(f);) {
		const h = Lr(f),
			m = Zg(f),
			g = u ? u.position : l ? "fixed" : "";
		(!m && (g === "fixed" || (g === "absolute" && h.position === "static")) ? (o = o.filter((p) => p !== f)) : (u = h),
			(f = Ua(f)));
	}
	return (n.set(e, o), o);
}
function jk(e) {
	let { element: n, boundary: i, rootBoundary: o, strategy: u } = e;
	const l = [...(i === "clippingAncestors" ? (wf(n) ? [] : Ik(n, this._c)) : [].concat(i)), o],
		f = ew(n, l[0], u);
	let h = f.top,
		m = f.right,
		g = f.bottom,
		p = f.left;
	for (let b = 1; b < l.length; b++) {
		const y = ew(n, l[b], u);
		((h = li(y.top, h)), (m = Qi(y.right, m)), (g = Qi(y.bottom, g)), (p = li(y.left, p)));
	}
	return { width: m - p, height: g - h, x: p, y: h };
}
function kk(e) {
	const { width: n, height: i } = S1(e);
	return { width: n, height: i };
}
function qk(e, n, i) {
	const o = Wi(n),
		u = hi(n),
		l = i === "fixed",
		f = Va(e, !0, l, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = ci(0);
	if ((o || !l) && ((as(n) !== "body" || Sf(u)) && (h = Ef(n)), o)) {
		const p = Va(n, !0, l, n);
		((m.x = p.x + n.clientLeft), (m.y = p.y + n.clientTop));
	}
	!o && u && (m.x = _f(u));
	const g = u && !o && !l ? E1(u, h) : ci(0);
	return { x: f.left + h.scrollLeft - m.x - g.x, y: f.top + h.scrollTop - m.y - g.y, width: f.width, height: f.height };
}
function _m(e) {
	return Lr(e).position === "static";
}
function tw(e, n) {
	if (!Wi(e) || Lr(e).position === "fixed") return null;
	if (n) return n(e);
	let i = e.offsetParent;
	return (hi(e) === i && (i = i.ownerDocument.body), i);
}
function _1(e, n) {
	const i = Dn(e);
	if (wf(e)) return i;
	if (!Wi(e)) {
		let u = Ua(e);
		for (; u && !bu(u);) {
			if (qr(u) && !_m(u)) return u;
			u = Ua(u);
		}
		return i;
	}
	let o = tw(e, n);
	for (; o && Ek(o) && _m(o);) o = tw(o, n);
	return o && bu(o) && _m(o) && !Zg(o) ? i : o || Tk(e) || i;
}
var Lk = async function (e) {
	const n = this.getOffsetParent || _1,
		i = this.getDimensions,
		o = await i(e.floating);
	return {
		reference: qk(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: o.width, height: o.height },
	};
};
function Uk(e) {
	return Lr(e).direction === "rtl";
}
var Vk = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Ak,
	getDocumentElement: hi,
	getClippingRect: jk,
	getOffsetParent: _1,
	getElementRects: Lk,
	getClientRects: Rk,
	getDimensions: kk,
	getScale: $o,
	isElement: qr,
	isRTL: Uk,
};
function C1(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function Bk(e, n, i) {
	let o = null,
		u;
	const l = hi(e);
	function f() {
		var p;
		(clearTimeout(u), (p = o) == null || p.disconnect(), (o = null));
	}
	function h(p, b) {
		(p === void 0 && (p = !1), b === void 0 && (b = 1), f());
		const y = e.getBoundingClientRect(),
			{ left: w, top: E, width: T, height: x } = y;
		if ((p || n(), !T || !x)) return;
		const z = _c(E),
			M = _c(l.clientWidth - (w + T)),
			A = _c(l.clientHeight - (E + x)),
			N = _c(w),
			D = { rootMargin: -z + "px " + -M + "px " + -A + "px " + -N + "px", threshold: li(0, Qi(1, b)) || 1 };
		let k = !0;
		function O(L) {
			const H = L[0].intersectionRatio;
			if (!C1(y, e.getBoundingClientRect())) return h();
			if (H !== b) {
				if (!k) return h();
				H
					? h(!1, H)
					: (u = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			k = !1;
		}
		try {
			o = new IntersectionObserver(O, { ...D, root: l.ownerDocument });
		} catch {
			o = new IntersectionObserver(O, D);
		}
		o.observe(e);
	}
	const m = Dn(e),
		g = () => h(i);
	return (
		m.addEventListener("resize", g),
		h(!0),
		() => {
			(m.removeEventListener("resize", g), f());
		}
	);
}
function Pk(e, n, i, o) {
	o === void 0 && (o = {});
	const {
			ancestorScroll: u = !0,
			ancestorResize: l = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = o,
		g = Qg(e),
		p = u || l ? [...(g ? Su(g) : []), ...(n ? Su(n) : [])] : [];
	p.forEach((z) => {
		(u && z.addEventListener("scroll", i), l && z.addEventListener("resize", i));
	});
	const b = g && h ? Bk(g, i, l) : null;
	let y = -1,
		w = null;
	f &&
		((w = new ResizeObserver((z) => {
			let [M] = z;
			(M &&
				M.target === g &&
				w &&
				n &&
				(w.unobserve(n),
				cancelAnimationFrame(y),
				(y = requestAnimationFrame(() => {
					var A;
					(A = w) == null || A.observe(n);
				}))),
				i());
		})),
		g && !m && w.observe(g),
		n && w.observe(n));
	let E,
		T = m ? Va(e) : null;
	m && x();
	function x() {
		const z = Va(e);
		(T && !C1(T, z) && i(), (T = z), (E = requestAnimationFrame(x)));
	}
	return (
		i(),
		() => {
			var z;
			(p.forEach((M) => {
				(u && M.removeEventListener("scroll", i), l && M.removeEventListener("resize", i));
			}),
				b?.(),
				(z = w) == null || z.disconnect(),
				(w = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var $k = pk,
	Hk = bk,
	Zk = vk,
	Fk = wk,
	Qk = gk,
	Yk = Sk,
	Kk = (e, n, i) => {
		const o = new Map(),
			u = i ?? {},
			l = { ...Vk, ...u.platform, _c: o };
		return mk(e, n, { ...u, platform: l });
	},
	Gk = "div",
	Ws = new WeakMap();
function nw(e = 0, n = 0, i = 0, o = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, i, o);
	const u = { x: e, y: n, width: i, height: o, top: n, right: e + i, bottom: n + o, left: e };
	return { ...u, toJSON: () => u };
}
function Xk(e) {
	if (!e) return nw();
	const { x: n, y: i, width: o, height: u } = e;
	return nw(n, i, o, u);
}
function Jk(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				o = n?.(i);
			return o || !i ? Xk(o) : i.getBoundingClientRect();
		},
	};
}
function Wk(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function rw(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function e4(e) {
	return typeof e == "number" ? e : Math.max(e.left ?? 0, e.right ?? 0);
}
function t4(e, n) {
	return $k(({ placement: i }) => {
		const o = (e?.clientHeight || 0) / 2,
			u = typeof n.gutter == "number" ? n.gutter + o : (n.gutter ?? o);
		return { crossAxis: i.split("-")[1] ? void 0 : n.shift, mainAxis: u, alignmentAxis: n.shift };
	});
}
function n4(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Zt(!n || n.every(Wk), !1), Zk({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function r4(e) {
	if (!(!e.slide && !e.overlap))
		return Hk({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: Yk() });
}
function i4(e, n) {
	return Fk({
		padding: e.overflowPadding,
		apply({ elements: i, availableWidth: o, availableHeight: u, rects: l }) {
			if (n?.()) return;
			const f = i.floating,
				h = Math.round(l.reference.width);
			((o = Math.floor(o)),
				(u = Math.floor(u)),
				f.style.setProperty("--popover-anchor-width", `${h}px`),
				f.style.setProperty("--popover-available-width", `${o}px`),
				f.style.setProperty("--popover-available-height", `${u}px`),
				e.sameWidth && (f.style.width = `${h}px`),
				e.fitViewport && ((f.style.maxWidth = `${o}px`), (f.style.maxHeight = `${u}px`)));
		},
	});
}
function a4(e, n) {
	if (e) return Qk({ element: e, padding: n.arrowPadding });
}
var Yg = We(function ({
		store: n,
		modal: i = !1,
		portal: o = i,
		preserveTabOrder: u = !0,
		autoFocusOnShow: l = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: g = 0,
		slide: p = !0,
		overlap: b = !1,
		sameWidth: y = !1,
		fitViewport: w = !1,
		gutter: E,
		arrowPadding: T = 4,
		overflowPadding: x = 8,
		getAnchorRect: z,
		updatePosition: M,
		...A
	}) {
		const N = Vg();
		((n = n || N), Zt(n, !1));
		const D = be(n, "arrowElement"),
			k = be(n, "anchorElement"),
			O = u && o && !i,
			L = be(n, O ? ["disclosureElement"] : [], (ce) => (O ? ce.disclosureElement : null)),
			H = be(n, "popoverElement"),
			te = be(n, "unstable_placing"),
			R = be(n, "contentElement"),
			q = be(n, "placement"),
			P = be(n, "mounted"),
			F = be(n, "rendered"),
			Y = (0, _.useRef)(null),
			B = (0, _.useRef)(null),
			ne = !!H && B.current === H,
			re = !te || ne,
			U = ut(l),
			ee = Ae((ce) => {
				const ye = U(ce);
				return (n?.getState().unstable_placing || (B.current = H), ye);
			});
		Ne(
			() =>
				nt(n, ["open"], () => {
					B.current = null;
				}),
			[n],
		);
		const { portalRef: K, domReady: ue } = Og(o, A.portalRef),
			xe = Ae(z),
			ve = Ae(M),
			j = !!M,
			ae = typeof x == "number" ? x : (x.top ?? 0),
			W = typeof x == "number" ? x : (x.right ?? 0),
			fe = typeof x == "number" ? x : (x.bottom ?? 0),
			Ee = typeof x == "number" ? x : (x.left ?? 0),
			_e = !P && Nu(P, A.hidden, A.alwaysVisible);
		(Ne(() => {
			if ((P && n?.setState("unstable_placing", !0), !H?.isConnected)) return;
			const ce = { top: ae, right: W, bottom: fe, left: Ee };
			if ((H.style.setProperty("--popover-overflow-padding", `${e4(ce)}px`), _e && !j)) return;
			const ye = Jk(k, xe);
			let Ge = !1,
				ct = !1;
			const mt = () => !!(Ge || !H.isConnected),
				_t = async () => {
					if (mt() || !P) return;
					D || (Y.current = Y.current || document.createElement("div"));
					const Qe = D || Y.current,
						dn = [
							t4(Qe, { gutter: E, shift: g }),
							n4({ flip: m, overflowPadding: ce }),
							r4({ slide: p, shift: g, overlap: b, overflowPadding: ce }),
							a4(Qe, { arrowPadding: T }),
							i4({ sameWidth: y, fitViewport: w, overflowPadding: ce }, mt),
						],
						At = await Kk(ye, H, { placement: q, strategy: h ? "fixed" : "absolute", middleware: dn });
					if (mt()) return;
					n?.setState("currentPlacement", At.placement);
					const Fn = rw(At.x),
						Qn = rw(At.y);
					if (
						(Object.assign(H.style, { top: "0", left: "0", transform: `translate3d(${Fn}px,${Qn}px,0)` }),
						(ct = !0),
						Qe && At.middlewareData.arrow)
					) {
						const { x: Ct, y: qt } = At.middlewareData.arrow,
							hn = Bg(At.placement),
							Qt = Qe.clientWidth / 2,
							he = Qe.clientHeight / 2,
							Te = Ct != null ? Ct + Qt : -Qt,
							bt = qt != null ? qt + he : -he;
						(H.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${Te}px calc(100% + ${he}px)`,
								bottom: `${Te}px ${-he}px`,
								left: `calc(100% + ${Qt}px) ${bt}px`,
								right: `${-Qt}px ${bt}px`,
							}[hn],
						),
							Object.assign(Qe.style, {
								left: Ct != null ? `${Ct}px` : "",
								top: qt != null ? `${qt}px` : "",
								right: "",
								bottom: "",
								[hn]: "100%",
							}));
					}
				},
				Ue = Pk(
					ye,
					H,
					async () => {
						if (!mt()) {
							try {
								j ? await ve({ updatePosition: _t }) : await _t();
							} catch (Qe) {
								throw (ct && !mt() && n?.setState("unstable_placing", !1), Qe);
							}
							mt() || n?.setState("unstable_placing", !1);
						}
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				((Ge = !0), Ue());
			};
		}, [n, F, H, D, k, q, P, _e, ue, h, m, g, p, b, y, w, E, T, ae, W, fe, Ee, xe, j, ve]),
			Ne(() => {
				if (!P || !ue || !H?.isConnected || !R?.isConnected) return;
				const ce = () => {
					H.style.zIndex = getComputedStyle(R).zIndex;
				};
				ce();
				let ye = requestAnimationFrame(() => {
					ye = requestAnimationFrame(ce);
				});
				return () => cancelAnimationFrame(ye);
			}, [P, ue, H, R]),
			Ne(() => {
				if (!n) return;
				const ce = n;
				Ws.set(ce, (Ws.get(ce) ?? 0) + 1);
				const ye = nt(ce, ["mounted"], (Ge) => {
					ce.setState("unstable_placing", Ge.mounted);
				});
				return () => {
					(ye(),
						Ws.set(ce, (Ws.get(ce) ?? 1) - 1),
						queueMicrotask(() => {
							Ws.get(ce) || ce.setState("unstable_placing", !1);
						}));
				};
			}, [n]));
		const Ce = h ? "fixed" : "absolute";
		return (
			(A = Ht(
				A,
				(ce) =>
					(0, S.jsx)("div", {
						...f,
						style: { position: Ce, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: ce,
					}),
				[n, Ce, f],
			)),
			(A = Ht(A, (ce) => (0, S.jsx)(pf, { value: n, children: ce }), [n])),
			(A = { "data-placing": te || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = d1({
				store: n,
				modal: i,
				portal: o,
				preserveTabOrder: u,
				preserveTabOrderAnchor: L || k,
				autoFocusOnShow: re && !!l && ee,
				...A,
				portalRef: K,
				unstable_wrapperElement: H,
			})),
			A
		);
	}),
	TL = Mu(
		Fe(function (n) {
			const i = Yg(n);
			return Je(Gk, i);
		}),
		Vg,
	),
	zu = Vr([m1], [pf]),
	xL = zu.useContext,
	OL = zu.useScopedContext,
	T1 = zu.useProviderContext,
	o4 = zu.ContextProvider,
	x1 = zu.ScopedContextProvider;
function O1(e) {
	return [e.clientX, e.clientY];
}
function s4(e, n) {
	const [i, o] = e;
	let u = !1;
	const l = n.length;
	for (let f = l, h = 0, m = f - 1; h < f; m = h++) {
		const g = n[h],
			p = n[m],
			b = n[m === 0 ? f - 1 : m - 1];
		if (g == null || p == null || b == null) return !1;
		const [y, w] = g,
			[E, T] = p,
			[, x] = b,
			z = (w - T) * (i - y) - (y - E) * (o - w);
		if (T < w) {
			if (o >= T && o < w) {
				if (z === 0) return !0;
				z > 0 && (o === T ? o > x && (u = !u) : (u = !u));
			}
		} else if (w < T) {
			if (o > w && o <= T) {
				if (z === 0) return !0;
				z < 0 && (o === T ? o < x && (u = !u) : (u = !u));
			}
		} else if (o === w && ((i >= E && i <= y) || (i >= y && i <= E))) return !0;
	}
	return u;
}
function u4(e, n) {
	const { top: i, right: o, bottom: u, left: l } = n,
		[f, h] = e;
	return [f < l ? "left" : f > o ? "right" : null, h < i ? "top" : h > u ? "bottom" : null];
}
function l4(e, n) {
	const i = e.getBoundingClientRect(),
		{ top: o, right: u, bottom: l, left: f } = i,
		[h, m] = u4(n, i),
		g = [n];
	return (
		h
			? (m !== "top" && g.push([h === "left" ? f : u, o]),
				g.push([h === "left" ? u : f, o]),
				g.push([h === "left" ? u : f, l]),
				m !== "bottom" && g.push([h === "left" ? f : u, l]))
			: m === "top"
				? (g.push([f, o]), g.push([f, l]), g.push([u, l]), g.push([u, o]))
				: (g.push([f, l]), g.push([f, o]), g.push([u, o]), g.push([u, l])),
		g
	);
}
function A1({ hideOnEscape: e, onClose: n, onEscapeClose: i }) {
	const o = (0, _.useRef)(null);
	return {
		hideOnEscape: Ae((u) => {
			if (pg(e, u)) return !1;
			const l = {};
			return (
				(o.current = l),
				setTimeout(() => {
					o.current === l && (o.current = null);
				}),
				!0
			);
		}),
		onClose: Ae((u) => {
			const l = o.current;
			((o.current = null), n?.(u), !u.defaultPrevented && l && i());
		}),
	};
}
var c4 = "div";
function f4(e, n, i, o) {
	return !!(Hi(n) || e.includes(n) || i.some((u) => u && e.includes(u)) || o?.some((u) => Hi(u) || e.includes(u)));
}
function iw({ event: e, element: n, enterPointRef: i, disablePointerEvents: o, refreshEnterPoint: u = !1 }) {
	const l = i.current;
	if (!l) return !1;
	const f = O1(e),
		h = l4(n, l);
	return s4(f, h) ? (u && (i.current = f), o(e) && (e.preventDefault(), e.stopPropagation()), !0) : !1;
}
function d4({ store: e, ...n }) {
	const [i, o] = (0, _.useState)(!1),
		u = be(e, "mounted");
	(0, _.useEffect)(() => {
		u || o(!1);
	}, [u]);
	const l = n.onFocus,
		f = Ae((m) => {
			(l?.(m), !m.defaultPrevented && o(!0));
		}),
		h = (0, _.useRef)(null);
	return (
		(0, _.useEffect)(
			() =>
				nt(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[e],
		),
		(n = { autoFocusOnHide: i, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var aw = (0, _.createContext)(null),
	R1 = We(function ({
		store: n,
		modal: i = !1,
		portal: o = i,
		hideOnEscape: u = !0,
		hideOnHoverOutside: l = !0,
		disablePointerEventsOnApproach: f = !!l,
		...h
	}) {
		const m = T1();
		((n = n || m), Zt(n, !1));
		const g = (0, _.useRef)(null),
			p = (0, _.useRef)([]),
			b = (0, _.useRef)(0),
			y = (0, _.useRef)(null),
			{ portalRef: w, domReady: E } = Og(o, h.portalRef),
			T = Rg(),
			x = !!l,
			z = ut(l),
			M = !!f,
			A = ut(f),
			N = be(n, "open"),
			D = be(n, "mounted"),
			k = (0, _.useCallback)(() => {
				(window.clearTimeout(b.current), (b.current = 0));
			}, []);
		((0, _.useEffect)(() => {
			if (!E || !D || (!x && !M)) return;
			const q = g.current;
			return q
				? en(
						Wt(
							"mousemove",
							(F) => {
								if (!n || !T()) return;
								const { anchorElement: Y, disclosureElement: B, hideTimeout: ne, timeout: re } = n.getState(),
									U = F.composedPath(),
									ee = [Y, B],
									K = ee.find((ue) => ue && U.includes(ue));
								if (f4(U, q, ee, p.current)) {
									((y.current = K ? O1(F) : null), k());
									return;
								}
								b.current ||
									iw({ event: F, element: q, enterPointRef: y, disablePointerEvents: A, refreshEnterPoint: !0 }) ||
									(z(F) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ne ?? re)));
							},
							!0,
						),
						k,
					)
				: void 0;
		}, [n, T, E, D, x, M, p, k, A, z]),
			(0, _.useEffect)(() => {
				if (!E || !D || !M) return;
				const q = (P) => {
					const F = g.current;
					F && iw({ event: P, element: F, enterPointRef: y, disablePointerEvents: A });
				};
				return en(Wt("mouseenter", q, !0), Wt("mouseover", q, !0), Wt("mouseout", q, !0), Wt("mouseleave", q, !0));
			}, [E, D, M, A]),
			(0, _.useEffect)(() => {
				E && (N || n?.setAutoFocusOnShow(!1));
			}, [n, E, N]));
		const O = yu(N);
		(0, _.useEffect)(() => {
			if (E)
				return () => {
					O.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, E]);
		const L = (0, _.useContext)(aw);
		Ne(() => {
			if (i || !o || !D || !E) return;
			const q = g.current;
			if (q) return L?.(q);
		}, [i, o, D, E, L]);
		const H = (0, _.useCallback)(
			(q) => {
				(k(), (p.current = [...p.current, q]));
				const P = L?.(q);
				return () => {
					(k(), (p.current = p.current.filter((F) => F !== q)), P?.());
				};
			},
			[k, L],
		);
		((h = Ht(h, (q) => (0, S.jsx)(x1, { value: n, children: (0, S.jsx)(aw.Provider, { value: H, children: q }) }), [
			n,
			H,
		])),
			(h = { ...h, ref: kt(g, h.ref) }),
			(h = d4({ store: n, ...h })));
		const te = be(n, ["autoFocusOnShow"], (q) => i || q.autoFocusOnShow),
			R = A1({
				hideOnEscape: u,
				onClose: h.onClose,
				onEscapeClose() {
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							n?.getState().open && n.hide();
						});
					});
				},
			});
		return (
			(h = Yg({
				store: n,
				modal: i,
				portal: o,
				autoFocusOnShow: te,
				...h,
				portalRef: w,
				hideOnEscape: R.hideOnEscape,
				onClose: R.onClose,
			})),
			h
		);
	}),
	AL = Mu(
		Fe(function (n) {
			const i = R1(n);
			return Je(c4, i);
		}),
		T1,
	),
	Iu = Vr(),
	h4 = Iu.useContext,
	RL = Iu.useScopedContext,
	NL = Iu.useProviderContext,
	m4 = Iu.ContextProvider,
	g4 = Iu.ScopedContextProvider,
	ju = Vr([m4], [g4]),
	ML = ju.useContext,
	Cf = ju.useScopedContext,
	v4 = ju.useProviderContext,
	Tf = ju.ContextProvider,
	ku = ju.ScopedContextProvider,
	y4 = (0, _.createContext)(void 0),
	p4 = (0, _.createContext)(void 0),
	qu = Vr([Tf], [ku]),
	b4 = qu.useContext,
	S4 = qu.useScopedContext,
	DL = qu.useProviderContext,
	zL = qu.ContextProvider,
	IL = qu.ScopedContextProvider,
	Lu = Vr([Tf, o4], [ku, x1]),
	N1 = Lu.useContext,
	w4 = Lu.useScopedContext,
	xf = Lu.useProviderContext,
	M1 = Lu.ContextProvider,
	E4 = Lu.ScopedContextProvider,
	jL = (0, _.createContext)(void 0),
	D1 = (0, _.createContext)(!1),
	_4 = new WeakMap();
function C4(e) {
	const n = [];
	let i = e.element.parentElement;
	for (; i;) {
		const o = _4.get(i)?.(e);
		(o && n.push(o), (i = i.parentElement));
	}
	return () => {
		for (const o of n) o();
	};
}
function T4(e) {
	const n = e.find((u) => !!u.element),
		i = [...e].reverse().find((u) => !!u.element)?.element;
	let o = n?.element?.parentElement;
	if (!i) return Ke(o).body;
	for (; o;) {
		if (o.contains(i)) return o;
		o = o.parentElement;
	}
	return Ke(o).body;
}
function x4(e) {
	return e?.__unstablePrivateStore;
}
var Wc = 64;
function ow(e, n) {
	if (e.length < Wc) {
		n.ids && ((n.items = void 0), (n.ids = void 0));
		return;
	}
	if (n.items === e) return n.ids;
	const i = new Set();
	for (const o of e) i.add(o.id);
	return ((n.items = e), (n.ids = i), i);
}
function Cm(e, n, i) {
	if (e.length < Wc) {
		n.ids && ((n.items = void 0), (n.ids = void 0));
		return;
	}
	if (!i) {
		i = new Set();
		for (const o of e) i.add(o.id);
	}
	((n.items = e), (n.ids = i));
}
function O4(e = {}) {
	e.store;
	const n = e.store?.getState(),
		i = ke(e.items, n?.items, e.defaultItems, []),
		o = x4(e.store),
		u = o?.__unstableCollectionLookup ?? {
			controlledItems: new Map(i.map((M) => [M.id, M])),
			registeredItems: new Map(),
			controlledItemsSource: i,
			propagatedItems: i,
		},
		{ controlledItems: l, registeredItems: f } = u,
		h = {},
		m = {},
		g = { items: i, renderedItems: ke(n?.renderedItems, []) },
		p = or(g, e.store),
		b = Object.assign(or({ items: i, renderedItems: g.renderedItems }, o), { __unstableCollectionLookup: u }),
		y = (M) => {
			const A = J2(M, (N) => N.element);
			(b.setState("renderedItems", A), p.setState("renderedItems", A));
		},
		w = (M) => {
			if (M !== u.controlledItemsSource) {
				((u.controlledItemsSource = M), l.clear());
				for (const A of M) l.set(A.id, A);
			}
		},
		E = (M, A) => {
			if (M !== "items") {
				p.setState(M, A);
				return;
			}
			p.setState("items", (N) => {
				const D = uf(A, N);
				return D === N ? N : ((u.propagatedItems = D), w(D), D);
			});
		};
	(yt(p, () => Ig(b)),
		o ||
			(di(p, ["items"], ({ items: M }) => {
				M !== u.propagatedItems && ((u.propagatedItems = M), w(M));
			}),
			yt(b, () =>
				pu(b, ["items"], ({ items: M }) => {
					((u.propagatedItems = M), p.setState("items", M));
				}),
			)),
		yt(b, () =>
			pu(b, ["renderedItems"], (M) => {
				if (
					(M.renderedItems !== p.getState().renderedItems && y(M.renderedItems),
					typeof IntersectionObserver != "function")
				)
					return;
				let A = !0,
					N = 0;
				const D = () => {
						if (A) {
							A = !1;
							return;
						}
						(cancelAnimationFrame(N), (N = requestAnimationFrame(() => y(M.renderedItems))));
					},
					k = T4(M.renderedItems),
					O = new IntersectionObserver(D, { root: k });
				for (const L of M.renderedItems) L.element && O.observe(L.element);
				return () => {
					(cancelAnimationFrame(N), O.disconnect());
				};
			}),
		));
	const T = (M, A, N) => {
			const D = N?.registeredItems,
				k = N?.controlledItems;
			return (O) => {
				const L = D?.get(O.id),
					H = !!L || !!k?.has(O.id);
				let te;
				return (
					b.setState(M, (q) => {
						const P = A.ids || (q.length >= Wc && !H) ? ow(q, A) : void 0,
							F = P && !P.has(O.id) ? -1 : q.findIndex(({ id: B }) => B === O.id),
							Y = q.slice();
						if (F !== -1) {
							te = q[F];
							const B = { ...te, ...O };
							((Y[F] = B), D?.set(O.id, B));
						} else (Y.push(O), D?.set(O.id, O), P?.add(O.id));
						return ((A.ids || (F === -1 && Y.length >= Wc)) && Cm(Y, A, P), Y);
					}),
					() => {
						(D && (L ? D.set(O.id, L) : D.delete(O.id)),
							b.setState(M, (q) => {
								const P = A.ids ? ow(q, A) : void 0;
								if (!te) {
									const B = q.filter(({ id: ne }) => ne !== O.id);
									return (P?.delete(O.id), A.ids && Cm(B, A, P), B);
								}
								const F = q.findIndex(({ id: B }) => B === O.id);
								if (F === -1) return q;
								const Y = q.slice();
								return ((Y[F] = te), A.ids && Cm(Y, A, P), Y);
							}));
					}
				);
			};
		},
		x = T("items", h, u),
		z = T("renderedItems", m);
	return {
		...p,
		setState: E,
		registerItem: x,
		renderItem: (M) => en(x(M), z(M)),
		item: (M) => (M ? (f.size ? (f.get(M) ?? l.get(M) ?? null) : (l.get(M) ?? null)) : null),
		__unstablePrivateStore: b,
	};
}
var A4 = { id: null };
function ai(e, n) {
	return e.find((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function R4(e) {
	for (let n = e.length - 1; n >= 0; n -= 1) {
		const i = e[n];
		if (i && !i.disabled) return i;
	}
}
function N4(e, n) {
	return e.filter((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function sw(e, n) {
	return e.filter((i) => i.rowId === n);
}
function uw({ items: e, fromIndex: n, step: i, rowId: o, excludeId: u }) {
	for (let l = n; l >= 0 && l < e.length; l += i) {
		const f = e[l];
		if (!f || f.rowId !== o || f.disabled) continue;
		const h = f.id;
		if (!(u != null && h === u)) return h;
	}
}
function z1(e, n, i = !1) {
	const o = e.findIndex((u) => u.id === n);
	return [...e.slice(o + 1), ...(i ? [A4] : []), ...e.slice(0, o)];
}
var M4 = 48,
	D4 = 4;
function z4(e) {
	const n = [];
	let i, o;
	for (const u of e) {
		const l = u.rowId;
		if (i && o === l) {
			i.push(u);
			continue;
		}
		const f = n.find((h) => h[0]?.rowId === l);
		(f ? (f.push(u), (i = f)) : ((i = [u]), n.push(i)), (o = l));
	}
	return n;
}
function I4(e) {
	const n = e[0];
	if (!n) return [];
	let i = 1;
	for (; i < e.length && e[i]?.rowId === n.rowId;) i += 1;
	const o = e.slice(0, i);
	if (i === e.length) return [o];
	const u = [o];
	let l;
	for (; i < e.length; i += 1) {
		const f = e[i];
		if (!f) continue;
		const h = l ? l.get(f.rowId) : u.find((g) => g[0]?.rowId === f.rowId);
		if (h) {
			h.push(f);
			continue;
		}
		const m = [f];
		(u.push(m), l ? l.set(f.rowId, m) : u.length === D4 && (l = new Map(u.map((g) => [g[0]?.rowId, g]))));
	}
	return u;
}
function Kg(e) {
	return e.length >= M4 ? I4(e) : z4(e);
}
function I1(e) {
	let n = 0;
	for (const { length: i } of e) i > n && (n = i);
	return n;
}
function j4(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function k4(e, n, i) {
	const o = I1(e);
	for (const u of e)
		for (let l = 0; l < o; l += 1) {
			const f = u[l];
			if (!f || (i && f.disabled)) {
				const h = l === 0 && i ? ai(u) : u[l - 1];
				u[l] = h && n !== h.id && i ? h : j4(h?.rowId);
			}
		}
	return e;
}
function q4(e) {
	const n = Kg(e),
		i = I1(n),
		o = [];
	for (let u = 0; u < i; u += 1)
		for (const l of n) {
			const f = l[u];
			f && o.push({ ...f, rowId: f.rowId ? `${u}` : void 0 });
		}
	return o;
}
function j1(e = {}) {
	const n = e.store?.getState(),
		i = O4(e),
		o = ke(e.activeId, n?.activeId, e.defaultActiveId),
		u = ke(n?.compositeElement, n?.baseElement, null),
		l = ke(
			e.compositeElementInFocusOrder,
			e.includesBaseElement,
			n?.compositeElementInFocusOrder,
			n?.includesBaseElement,
			o === null,
		),
		f = {
			...i.getState(),
			id: ke(e.id, n?.id) ?? `id-${Math.random().toString(36).slice(2, 8)}`,
			activeId: o,
			compositeElement: u,
			baseElement: u,
			compositeElementInFocusOrder: l,
			includesBaseElement: l,
			moves: ke(n?.moves, 0),
			orientation: ke(e.orientation, n?.orientation, "both"),
			rtl: ke(e.rtl, n?.rtl, !1),
			virtualFocus: ke(e.virtualFocus, n?.virtualFocus, !1),
			focusLoop: ke(e.focusLoop, n?.focusLoop, !1),
			focusWrap: ke(e.focusWrap, n?.focusWrap, !1),
			focusShift: ke(e.focusShift, n?.focusShift, !1),
		},
		h = or(f, i, e.store);
	(yt(h, () =>
		en(
			nt(h, ["compositeElement"], (p) => {
				h.setState("baseElement", p.compositeElement);
			}),
			nt(h, ["baseElement"], (p) => {
				h.setState("compositeElement", p.baseElement);
			}),
			nt(h, ["compositeElementInFocusOrder"], (p) => {
				h.setState("includesBaseElement", p.compositeElementInFocusOrder);
			}),
			nt(h, ["includesBaseElement"], (p) => {
				h.setState("compositeElementInFocusOrder", p.includesBaseElement);
			}),
		),
	),
		yt(h, () =>
			nt(h, ["renderedItems", "activeId"], (p) => {
				h.setState("activeId", (b) => (b !== void 0 ? b : ai(p.renderedItems)?.id));
			}),
		));
	const m = (p = "next", b = {}) => {
			const y = h.getState(),
				w = ke(b.compositeElementInFocusOrder, b.includesBaseElement, y.compositeElementInFocusOrder),
				{
					skip: E = 0,
					activeId: T = y.activeId,
					focusShift: x = y.focusShift,
					focusLoop: z = y.focusLoop,
					focusWrap: M = y.focusWrap,
					renderedItems: A = y.renderedItems,
					rtl: N = y.rtl,
				} = b,
				D = p === "up" || p === "down",
				k = p === "next" || p === "down",
				O = k ? N && !D : !N || D,
				L = x && !E;
			if (!E && !M && !w && T != null && (!D || (!L && !A.some((U) => U.rowId != null)))) {
				let U = -1;
				if (A === y.renderedItems) {
					const K = A[0];
					if (K && i.item(K.id) === K) {
						const ue = i.item(T);
						ue?.id === T && (U = A.indexOf(ue));
					}
				}
				U === -1 && (U = A.findIndex((K) => K.id === T));
				const ee = A[U];
				if (ee) {
					const K = O ? -1 : 1,
						ue = uw({ items: A, fromIndex: U + K, step: K, rowId: ee.rowId, excludeId: T });
					return ue !== void 0
						? ue
						: z && (D ? z !== "horizontal" : z !== "vertical")
							? uw({ items: A, fromIndex: K === 1 ? 0 : A.length - 1, step: K, rowId: ee.rowId, excludeId: T })
							: void 0;
				}
			}
			let H = D ? r_(k4(Kg(A), T, L)) : A;
			if (((H = O ? i_(H) : H), (H = D ? q4(H) : H), T == null)) return ai(H)?.id;
			const te = H.find((U) => U.id === T);
			if (!te) return ai(H)?.id;
			const R = H.some((U) => U.rowId),
				q = H.indexOf(te),
				P = H.slice(q + 1),
				F = sw(P, te.rowId);
			if (E) {
				const U = N4(F, T);
				return (U.slice(E)[0] || U[U.length - 1])?.id;
			}
			const Y = z && (D ? z !== "horizontal" : z !== "vertical"),
				B = R && M && (D ? M !== "horizontal" : M !== "vertical"),
				ne = k ? (!R || D) && Y && w : D ? w : !1;
			if (Y) return ai(z1(B && !ne ? H : sw(H, te.rowId), T, ne), T)?.id;
			if (B) {
				const U = ai(ne ? F : P, T);
				return ne ? U?.id || null : U?.id;
			}
			const re = ai(F, T);
			return !re && ne ? null : re?.id;
		},
		g = (p, b) => (typeof b == "number" ? m(p, { skip: b }) : m(p, b));
	return {
		...i,
		...h,
		setCompositeElement: (p) => h.setState("compositeElement", p),
		setBaseElement: (p) => h.setState("compositeElement", p),
		setActiveId: (p) => h.setState("activeId", p),
		move: (p) => {
			p !== void 0 && (h.setState("activeId", p), h.setState("moves", (b) => b + 1));
		},
		first: () => ai(h.getState().renderedItems)?.id,
		last: () => R4(h.getState().renderedItems)?.id,
		next: (p) => g("next", p),
		previous: (p) => g("previous", p),
		down: (p) => g("down", p),
		up: (p) => g("up", p),
	};
}
var L4 = z1,
	U4 = ai,
	V4 = Kg,
	ef = new WeakSet();
function B4(e) {
	Zn(e) === e && (ef.add(e), queueMicrotask(() => ef.delete(e)));
}
function P4(e) {
	ef.delete(e);
}
function $4(e, n) {
	const { virtualFocus: i, compositeElement: o } = e.getState();
	if (!i || !o || !yr(o)) {
		n();
		return;
	}
	const u = o.scrollLeft,
		l = o.scrollTop;
	(n(), (o.scrollLeft = u), (o.scrollTop = l));
}
function k1(e) {
	const n = e.getState();
	return "contentElement" in n ? n.contentElement : null;
}
function q1(e) {
	const { compositeElement: n } = e.getState(),
		i = qa(n);
	return i ? (n?.contains(i) || $i(e, i) ? !0 : !!k1(e)?.contains(i)) : !1;
}
function H4({
	store: e,
	id: n,
	focus: i,
	markedOnly: o,
	requireFocus: u,
	focusOwner: l,
	scrollIntoView: f,
	onConsume: h,
}) {
	let m = null,
		g,
		p = !1,
		b = !1,
		y = !1,
		w = !1,
		E = !1;
	const T = e.getState().compositeElement,
		x = qa(T),
		z = u ? l || x : null,
		M = !!T?.contains(x),
		A = (Y) => {
			if (!z) return !0;
			const B = qa(z);
			return B === z || B === Y ? !0 : q1(e);
		},
		N = (Y) => {
			if ("mounted" in Y) {
				if (Y.mounted) w = !0;
				else if (w) return !0;
			}
			if ("open" in Y) {
				if (Y.open) E = !0;
				else if (E) return !0;
			}
			return n != null && Y.activeId != null && Y.activeId !== n;
		},
		D = (Y, B) => {
			if (!("open" in Y) || Y.open) return !1;
			const ne = k1(e);
			if (!ne?.contains(B)) return !1;
			const { compositeElement: re } = Y;
			return !re || ne.contains(re) ? !1 : Hm(B);
		},
		k = (Y) => {
			const B = Ra(e, g ?? (n === void 0 ? Y.activeId : n));
			return B?.element?.isConnected ? ((g = B.id), B.element) : null;
		};
	let O, L, H;
	const te = () => {
		((y = !0), O?.(), L?.(), H?.());
	};
	let R = !1;
	const q = () => {
			R || ((R = !0), h?.());
		},
		P = () => {
			if ((L?.(), !y)) return (q(), te());
		},
		F = () => {
			if (y) return;
			const Y = e.getState();
			if (N(Y)) return P();
			let B = !1;
			if (m) {
				if (!m.isConnected && ((B = p && !b && Zn(m) === Ke(m).body), (m = k(Y)), !m)) return P();
			} else if (((m = k(Y)), !m)) return;
			if (B) p = !1;
			else if (!A(m)) return P();
			const ne = i && M && D(Y, m);
			if (ne) {
				const { activeId: U } = Y;
				if (U != null && U !== g) return P();
			}
			if (i && !p && !ne) {
				((p = !0), q(), (b = !1));
				const U = m;
				O?.();
				const ee = () => {
						b = !ef.has(U);
					},
					K = () => {
						b = !1;
					};
				if (
					(U.addEventListener("blur", ee),
					U.addEventListener("focus", K),
					(O = () => {
						(U.removeEventListener("blur", ee), U.removeEventListener("focus", K));
					}),
					$4(e, () => {
						U.focus({ preventScroll: !0 });
					}),
					y)
				)
					return;
			}
			if (o && !m.hasAttribute("data-autofocus")) return ne ? void 0 : P();
			if (!Hm(m) || ("unstable_placing" in Y && Y.unstable_placing)) return;
			ne || P();
			const re = m;
			if (
				(L?.(),
				(L = C4({
					element: re,
					isCurrent: () => {
						const U = e.getState();
						return N(U) || U.activeId !== g ? !1 : A(re);
					},
				})),
				f)
			) {
				f(m);
				return;
			}
			m.scrollIntoView({ block: "nearest", inline: "nearest" });
		};
	return (
		(H = di(e, ["activeId", "items", "mounted", "open", "unstable_placing"], F)),
		F(),
		Object.assign(te, { settle: P })
	);
}
function L1(e) {
	const n = (0, _.useRef)(null),
		i = (0, _.useRef)(e),
		o = (0, _.useCallback)(() => {
			(n.current?.(), (n.current = null));
		}, []),
		u = (0, _.useCallback)(
			(l) => {
				if (!e || i.current !== e) return;
				(n.current?.settle(), (n.current = null));
				const f = H4({ store: e, ...l });
				return ((n.current = f), f);
			},
			[e],
		);
	return (
		Ne(
			() => (
				(i.current = e),
				() => {
					((i.current = void 0), o());
				}
			),
			[e, o],
		),
		u
	);
}
function Ra(e, n) {
	return (n && e.item(n)) || null;
}
function Z4(e, n = !1) {
	if (yr(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = Ke(e).getSelection();
		(i?.selectAllChildren(e), n && i?.collapseToEnd());
	}
}
var Xm = Symbol("FOCUS_SILENTLY");
function F4(e) {
	((e[Xm] = !0), e.focus({ preventScroll: !0 }));
}
function Q4(e) {
	const n = e[Xm];
	return (delete e[Xm], n);
}
function $i(e, n, i) {
	if (!n || n === i) return !1;
	const o = e.item(n.id);
	return !(!o || (i && o.element === i));
}
var Y4 = Symbol("cancelled"),
	Tm = new WeakMap();
function Jo(e, n) {
	const i = e.getState,
		o = Tm.get(i);
	if (o) return o;
	const u = n?.getState();
	if (n && u && zn(u, "moves") && zn(u, "activeId")) {
		const f = Jo(n);
		return (Tm.set(i, f), f);
	}
	const l = { consumedBy: null, targetId: e.getState().activeId };
	return (
		Tm.set(i, l),
		nt(e, ["moves", "activeId"], (f, h) => {
			if (f.moves !== h.moves) {
				((l.consumedBy = null), (l.targetId = f.activeId));
				return;
			}
			f.activeId !== h.activeId && (l.targetId = Y4);
		}),
		l
	);
}
var K4 = "div";
function G4(e) {
	return e.some((n) => !!n.rowId);
}
function X4(e) {
	const n = e.target;
	return n && !yr(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function J4(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function lw(e, n, i) {
	return Ae((o) => {
		if ((n?.(o), o.defaultPrevented || o.isPropagationStopped() || !cn(o) || J4(o) || X4(o))) return;
		const u = e.getState(),
			l = Ra(e, u.activeId)?.element;
		if (!l) return;
		const { view: f, ...h } = o;
		(l !== i?.current && l.focus({ preventScroll: !0 }),
			YI(l, o.nativeEvent, h) || o.preventDefault(),
			o.currentTarget.contains(l) && o.stopPropagation());
	});
}
function W4(e) {
	return U4(r_(i_(V4(e))));
}
function cw(e, n) {
	const { consumedBy: i } = Jo(e);
	return !i || i === n;
}
function fw(e, n, i) {
	e.getState().moves === i && (Jo(e).consumedBy = n);
}
var e3 = Tu(function ({ store: n, focusOnMove: i, previousElementRef: o, present: u, scrollIntoView: l }) {
		const f = be(n, "moves"),
			h = be(n, "compositeElement"),
			m = (0, _.useMemo)(() => ({}), [n.getState]);
		return (
			(0, _.useEffect)(() => {
				const g = Jo(n);
				if (!f || !i || !cw(n, m)) return;
				const { activeId: p } = n.getState();
				if (p != null && p === g.targetId)
					return u({ id: p, requireFocus: q1(n), focus: !0, scrollIntoView: l, onConsume: () => fw(n, m, f) });
			}, [n, f, i, h, u, l, m]),
			Ne(() => {
				const g = Jo(n);
				if (!f || !h || !cw(n, m)) return;
				const { activeId: p } = n.getState();
				if (p !== null || p !== g.targetId) return;
				fw(n, m, f);
				const b = o.current;
				((o.current = null),
					b && Uo(b, { relatedTarget: h }),
					ns(h) ||
						(ln(h) && h.scrollIntoView({ block: "nearest", inline: "nearest" }), h.focus({ preventScroll: !0 })));
			}, [n, f, h, o, m]),
			null
		);
	}),
	Gg = We(function ({
		store: n,
		composite: i = !0,
		focusOnMove: o = i,
		moveOnKeyPress: u = !0,
		unstable_scrollIntoView: l,
		...f
	}) {
		const h = v4();
		((n = n || h), Zt(n, !1));
		const m = (0, _.useRef)(null),
			g = (0, _.useRef)(null),
			p = L1(n),
			b = (0, _.useRef)(void 0);
		Ne(() => {
			if (!i) return;
			let R = null,
				q = !1,
				P = !1;
			const F = () => {
					if (((q = !1), P)) return;
					const { activeId: ne, compositeElement: re } = n.getState(),
						U = !!re && re === m.current && qa(re) === re,
						ee = n.item(ne)?.element,
						K = U && ee?.isConnected && ee !== re ? ee : null;
					R !== K && (R?.removeAttribute("data-focus"), K?.setAttribute("data-focus", "true"), (R = K));
				},
				Y = () => {
					q || ((q = !0), queueMicrotask(F));
				};
			b.current = Y;
			const B = di(n, ["activeId", "items", "compositeElement"], Y);
			return (
				Y(),
				() => {
					((P = !0), (b.current = void 0), B(), R?.removeAttribute("data-focus"));
				}
			);
		}, [n, i]);
		const [, y] = R_(i ? n.setCompositeElement : null),
			w = be(n, "virtualFocus"),
			E = be(n, i && w ? ["activeId"] : [], (R) => (i && w ? R.activeId : null));
		Ne(() => {
			if (!n || !i || !w) return;
			const R = g.current;
			if (((g.current = null), !R)) return;
			const q = Ra(n, E)?.element || Zn(R);
			q !== R && Uo(R, { relatedTarget: q });
		}, [n, E, w, i]);
		const T = lw(n, f.onKeyDownCapture, g),
			x = lw(n, f.onKeyUpCapture, g),
			z = f.onFocusCapture,
			M = Ae((R) => {
				if ((b.current?.(), z?.(R), R.defaultPrevented || !n)) return;
				const { virtualFocus: q } = n.getState();
				if (!q) return;
				const P = R.relatedTarget,
					F = Q4(R.currentTarget);
				cn(R) && F && (R.stopPropagation(), (g.current = P));
			}),
			A = f.onFocus,
			N = Ae((R) => {
				if ((A?.(R), R.defaultPrevented || !i || !n)) return;
				const { relatedTarget: q } = R,
					{ virtualFocus: P } = n.getState();
				if (P)
					cn(R) &&
						!$i(n, q) &&
						queueMicrotask(() => p({ focus: !0, markedOnly: !0, requireFocus: !0, scrollIntoView: l }));
				else if (cn(R)) {
					if (!$i(n, q)) {
						const { activeId: F } = n.getState();
						F != null && p({ id: F, markedOnly: !0, requireFocus: !0, scrollIntoView: l });
					}
					n.setActiveId(null);
				}
			}),
			D = f.onBlurCapture,
			k = Ae((R) => {
				if ((b.current?.(), D?.(R), R.defaultPrevented || !n)) return;
				const { virtualFocus: q, activeId: P, compositeElement: F } = n.getState();
				if (!q || R.currentTarget !== F) return;
				const Y = Ra(n, P)?.element,
					B = R.relatedTarget,
					ne = $i(n, B),
					re = g.current;
				((g.current = null),
					cn(R) && ne
						? (B === Y ? re && re !== B && Uo(re, R) : Y ? Uo(Y, R) : re && Uo(re, R), R.stopPropagation())
						: !$i(n, R.target) && Y && Uo(Y, R));
			}),
			O = f.onKeyDown,
			L = ut(u),
			H = Ae((R) => {
				if ((O?.(R), R.nativeEvent.isComposing || R.defaultPrevented || !n || !cn(R))) return;
				const { orientation: q, items: P, renderedItems: F, activeId: Y, rtl: B } = n.getState(),
					ne = Ra(n, Y);
				if (ne?.element?.isConnected) return;
				const re = ne && Y != null,
					U = re ? P : F,
					ee = q !== "horizontal",
					K = q !== "vertical",
					ue = G4(U);
				if (
					(R.key === "ArrowLeft" || R.key === "ArrowRight" || R.key === "Home" || R.key === "End") &&
					yr(R.currentTarget)
				)
					return;
				const W = {
					ArrowUp: (ue || ee) && (() => (re ? n.up({ activeId: Y, renderedItems: U }) : ue ? W4(F)?.id : n?.last())),
					ArrowRight: (ue || K) && (() => (re ? n.next({ activeId: Y, renderedItems: U }) : B ? n.last() : n.first())),
					ArrowDown: (ue || ee) && (() => (re ? n.down({ activeId: Y, renderedItems: U }) : n.first())),
					ArrowLeft:
						(ue || K) && (() => (re ? n.previous({ activeId: Y, renderedItems: U }) : B ? n.first() : n.last())),
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[R.key];
				if (W) {
					const fe = W();
					if (fe !== void 0) {
						if (!L(R)) return;
						(R.preventDefault(), n.move(fe));
					}
				}
			});
		((f = Ht(
			f,
			(R) =>
				(0, S.jsxs)(ku, {
					value: n,
					children: [
						R,
						i && (0, S.jsx)(e3, { store: n, focusOnMove: o, previousElementRef: g, present: p, scrollIntoView: l }),
					],
				}),
			[n, i, o, p],
		)),
			(f = {
				"aria-activedescendant": be(n, i && w ? ["items"] : [], () => {
					if (n && i && w) return Ra(n, E)?.id;
				}),
				...f,
				ref: kt(m, y, f.ref),
				onKeyDownCapture: T,
				onKeyUpCapture: x,
				onFocusCapture: M,
				onFocus: N,
				onBlurCapture: k,
				onKeyDown: H,
			}));
		const te = be(n, i && !w ? ["activeId"] : [], (R) => i && (w || R.activeId === null));
		return ((f = xu({ focusable: te, ...f })), f);
	}),
	kL = Fe(function (n) {
		const i = Gg(n);
		return Je(K4, i);
	}),
	t3 = "div",
	dw = new WeakMap();
function n3(e) {
	let n = dw.get(e);
	return (n || ((n = { chars: "", cleanupTimeout: 0 }), dw.set(e, n)), n);
}
function Cc(e) {
	e.chars = "";
}
function r3(e, n) {
	const i = e.target;
	return i && yr(i)
		? !1
		: e.key === " " && n.chars.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function i3(e, n) {
	if (cn(e)) return !0;
	const i = e.target;
	return i ? n.some((o) => o.element === i) : !1;
}
function a3(e) {
	return e.filter((n) => !n.disabled);
}
function Nc(e, n) {
	const i = e.typeaheadText ?? (e.element?.textContent || e.children || ("value" in e && e.value));
	return i ? Pm(i).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function o3({ activeId: e, char: n, items: i, typeaheadState: o }) {
	if (!e) return i;
	const u = i.find((f) => f.id === e);
	if (!u || !Nc(u, n)) return i;
	const { chars: l } = o;
	return l !== n && Nc(u, l)
		? i
		: ((o.chars = n),
			L4(
				i.filter((f) => Nc(f, n)),
				e,
			).filter((f) => f.id !== e));
}
var Of = We(function ({ store: n, typeahead: i = !0, ...o }) {
		const u = Cf();
		((n = n || u), Zt(n, !1));
		const l = o.onKeyDownCapture,
			f = Ae((h) => {
				if ((l?.(h), h.defaultPrevented || !i || !n)) return;
				const m = n3(n);
				if (!r3(h, m)) return Cc(m);
				const { renderedItems: g, items: p, activeId: b } = n.getState();
				let y = a3(p.length > g.length ? p : g);
				if (!i3(h, y)) return Cc(m);
				(h.preventDefault(),
					window.clearTimeout(m.cleanupTimeout),
					(m.cleanupTimeout = window.setTimeout(() => {
						Cc(m);
					}, 500)));
				const w = h.key.toLowerCase();
				((m.chars += w), (y = o3({ activeId: b, char: w, items: y, typeaheadState: m })));
				const E = y.find((T) => Nc(T, m.chars));
				E ? n.move(E.id) : Cc(m);
			});
		return ((o = { ...o, onKeyDownCapture: f }), lf(o));
	}),
	qL = Fe(function (n) {
		const i = Of(n);
		return Je(t3, i);
	}),
	s3 = "div";
function u3({ store: e, ...n }) {
	const [i, o] = (0, _.useState)(void 0),
		u = n["aria-label"],
		l = be(e, "disclosureElement"),
		f = be(e, "contentElement");
	return (
		(0, _.useEffect)(() => {
			const h = f;
			if (!h) return;
			const m = u || h.hasAttribute("aria-label") ? void 0 : l?.id || void 0;
			o(m);
		}, [u, l, f]),
		i
	);
}
var U1 = We(function ({ store: n, alwaysVisible: i, composite: o, ...u }) {
		const l = xf();
		((n = n || l), Zt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			g = Ur(u.id),
			p = u.onKeyDown,
			b = be(n, ["placement"], (D) => Bg(D.placement)),
			y = be(n, ["orientation"], (D) => (D.orientation === "both" ? void 0 : D.orientation)),
			w = y !== "vertical",
			E = be(h, ["orientation"], (D) => !!D && D.orientation !== "vertical"),
			T = Ae((D) => {
				if ((p?.(D), D.defaultPrevented)) return;
				const k = D.target;
				if (!(!cn(D) && !$i(n, k))) {
					if (Vc(k)) {
						const O = Bc(k),
							L = D.key === "ArrowLeft" || D.key === "ArrowUp",
							H = D.key === "ArrowRight" || D.key === "ArrowDown";
						if ((L && O.start !== 0) || (H && O.end !== l_(k).length)) return;
					}
					if (m || (h && !w)) {
						const O = {
							ArrowRight: () => b === "left" && !w,
							ArrowLeft: () => b === "right" && !w,
							ArrowUp: () => b === "bottom" && w,
							ArrowDown: () => b === "top" && w,
						}[D.key];
						if (O?.()) return (D.stopPropagation(), D.preventDefault(), n?.hide());
					}
					if (h) {
						const O = {
								ArrowRight: () => {
									if (E) return h.next();
								},
								ArrowLeft: () => {
									if (E) return h.previous();
								},
								ArrowDown: () => {
									if (!E) return h.down();
								},
								ArrowUp: () => {
									if (!E) return h.up();
								},
							}[D.key],
							L = O?.();
						L !== void 0 && (D.stopPropagation(), D.preventDefault(), h.move(L));
					}
				}
			});
		u = Ht(u, (D) => (0, S.jsx)(E4, { value: n, children: D }), [n]);
		const x = u3({ store: n, ...u }),
			z = be(n, "mounted"),
			M = Nu(z, u.hidden, i),
			A = M ? { ...u.style, display: "none" } : u.style;
		((u = Ht(u, (D) => (0, S.jsx)(D1.Provider, { value: M, children: D }), [M])),
			(u = {
				"aria-labelledby": x,
				hidden: M,
				...u,
				id: g,
				ref: kt(g ? n.setContentElement : null, u.ref),
				style: A,
				onKeyDown: T,
			}));
		const N = !!n.combobox;
		return (
			(o = o ?? !N),
			o && (u = { role: "menu", "aria-orientation": y, ...u }),
			(u = Gg({ store: n, composite: o, ...u })),
			(u = Of({ store: n, typeahead: !N, ...u })),
			u
		);
	}),
	LL = Fe(function (n) {
		const i = U1(n);
		return Je(s3, i);
	}),
	l3 = "div";
function c3(e, n) {
	const i = qa(e);
	return !i || !Cg(i, e) || !ln(i)
		? !1
		: i !== n.compositeElement
			? !0
			: n.renderedItems.some((o) => o.id === n.activeId && !o.disabled);
}
var f3 = We(function ({
		store: n,
		modal: i = !1,
		portal: o = i,
		hideOnEscape: u = !0,
		autoFocusOnShow: l = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		getPersistentElements: m,
		unstable_treeSnapshotKey: g,
		...p
	}) {
		const b = xf();
		((n = n || b), Zt(n, !1));
		const y = (0, _.useRef)(null),
			w = n.parent,
			E = n.menubar,
			T = !!w,
			x = !!E && !T,
			z = T ? !1 : i;
		p = { ...p, ref: kt(y, p.ref) };
		const { "aria-labelledby": M, ...A } = U1({ store: n, alwaysVisible: h, ...p });
		p = A;
		const [N, D] = (0, _.useState)(),
			k = (0, _.useRef)(!0),
			O = be(n, "open"),
			L = be(n, ["autoFocusOnShow", "initialFocus", "renderedItems", "compositeElement"], (U) => {
				if (!U.autoFocusOnShow) return;
				const ee = (K) => !K.disabled && !!K.element;
				switch (U.initialFocus) {
					case "first":
						return U.renderedItems.find(ee)?.element || null;
					case "last":
						for (let K = U.renderedItems.length - 1; K >= 0; K -= 1) {
							const ue = U.renderedItems[K];
							if (ue && ee(ue)) return ue.element;
						}
						return null;
					default:
						return U.compositeElement;
				}
			});
		(0, _.useEffect)(() => {
			let U = !1;
			const ee = y.current,
				K = !k.current && !!ee && c3(ee, n.getState());
			return (
				(k.current = !O || (L === null && !K)),
				D((ue) => {
					if (U) return;
					if (z && O && L === void 0) return ue;
					if (L === void 0) return;
					if (L && L === ue?.current) return ue;
					if (K && ue) return ((ue.current = L), ue);
					const xe = (0, _.createRef)();
					return ((xe.current = L), xe);
				}),
				() => {
					U = !0;
				}
			);
		}, [n, z, O, L]);
		const H = !!N || !!p.initialFocus || z,
			te = l === !1 ? !1 : H && l,
			R = be(n, ["disclosureElement", "anchorElement"], (U) => U.disclosureElement || U.anchorElement),
			q = be(n, ["disclosureElement", "contentElement"], (U) => {
				const { disclosureElement: ee, contentElement: K } = U;
				return !ee?.isConnected || f1(ee) || K?.contains(ee) ? null : ee;
			}),
			P = z ? q : null,
			F = (0, _.useMemo)(() => [g, P], [g, P]),
			Y = be(n.combobox || n, "contentElement"),
			B = be(w?.combobox || w, "contentElement"),
			ne = (0, _.useMemo)(() => {
				if (!B || !Y) return;
				const U = Y.getAttribute("role"),
					ee = B.getAttribute("role");
				if (!((ee === "menu" || ee === "menubar") && U === "menu")) return B;
			}, [Y, B]);
		ne !== void 0 && (p = { preserveTabOrderAnchor: ne, ...p });
		const re = A1({ hideOnEscape: u, onClose: p.onClose, onEscapeClose: () => w?.hideAll() });
		return (
			(p = R1({
				store: n,
				alwaysVisible: h,
				initialFocus: N,
				autoFocusOnShow: te,
				finalFocus: R,
				...p,
				hideOnEscape: re.hideOnEscape,
				onClose: re.onClose,
				hideOnHoverOutside(U) {
					const ee = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(U) : (f ?? (T ? !0 : x ? (ee ? !Hi(ee) : !0) : !1)))
						? U.defaultPrevented || !T || !ee || (rI(ee, "mouseout", U), !Hi(ee))
							? !0
							: (requestAnimationFrame(() => {
									Hi(ee) || n?.hide();
								}),
								!1)
						: !1;
				},
				getPersistentElements() {
					const U = m?.() || [];
					return !z || !q ? U : [...U, q];
				},
				unstable_treeSnapshotKey: F,
				modal: z,
				portal: o,
				backdrop: T ? !1 : p.backdrop,
			})),
			(p = { "aria-labelledby": M, ...p }),
			p
		);
	}),
	d3 = Mu(
		Fe(function (n) {
			const i = f3(n);
			return Je(l3, i);
		}),
		xf,
	);
function h3(e, n, i) {
	return (rs(n, [i.store, n]), Dt(e, i, "items", "setItems"), e);
}
function m3(e) {
	return { id: Ur(e.id), ...e };
}
function V1(e, n, i) {
	((e = h3(e, n, i)), Jo(e, i.store), Dt(e, i, "activeId", "setActiveId"));
	const o = { compositeElementInFocusOrder: i.compositeElementInFocusOrder ?? i.includesBaseElement };
	return (
		Dt(e, o, "compositeElementInFocusOrder"),
		Dt(e, i, "virtualFocus"),
		Dt(e, i, "orientation"),
		Dt(e, i, "rtl"),
		Dt(e, i, "focusLoop"),
		Dt(e, i, "focusWrap"),
		Dt(e, i, "focusShift"),
		e
	);
}
function Za(e) {
	const { render: n, type: i } = e;
	return n || i !== void 0 ? e : { ...e, type: "button" };
}
var g3 = "button";
function hw(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? ka(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? ka(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var v3 = Symbol("command"),
	Xg = We(function ({ clickOnEnter: n = !0, clickOnSpace: i = !0, ...o }) {
		const u = (0, _.useRef)(null),
			[l, f] = (0, _.useState)(!1),
			h = o.type;
		(0, _.useEffect)(() => {
			const N = u.current;
			if (!N) return;
			const D = ka(N);
			(h !== void 0 && D && N.type === "button") || f(D);
		}, [h]);
		const [m, g] = (0, _.useState)(!1),
			p = (0, _.useRef)(!1),
			b = $a(o),
			[y, w] = Ag(o, v3, !0);
		Ne(() => {
			b && ((p.current = !1), g(!1));
		}, [b]);
		const E = o.onKeyDown,
			T = Ae((N) => {
				E?.(N);
				const D = N.currentTarget;
				if (N.defaultPrevented || y || b || !cn(N) || yr(D) || D.isContentEditable) return;
				const k = n && N.key === "Enter",
					O = i && N.key === " ",
					L = N.key === "Enter" && !n,
					H = N.key === " " && !i;
				if (L || H) {
					N.preventDefault();
					return;
				}
				if (k || O) {
					const te = hw(N);
					if (k) {
						if (!te) {
							N.preventDefault();
							const { view: R, ...q } = N,
								P = () => xS(D, q);
							eI() ? Pc(D, "keyup", P) : queueMicrotask(P);
						}
					} else O && ((p.current = !0), te || (N.preventDefault(), g(!0)));
				}
			}),
			x = o.onKeyUp,
			z = Ae((N) => {
				if ((x?.(N), y)) return;
				const D = i && N.key === " ";
				if (!p.current || !D) return;
				const k = hw(N);
				if (((p.current = !1), k || g(!1), N.defaultPrevented || !cn(N) || b || N.metaKey || k)) return;
				N.preventDefault();
				const O = N.currentTarget,
					{ view: L, ...H } = N;
				queueMicrotask(() => xS(O, H));
			}),
			M = o.onBlur,
			A = Ae((N) => {
				(M?.(N), p.current && ((p.current = !1), g(!1)));
			});
		return (
			(o = {
				"data-active": m || void 0,
				type: l ? "button" : void 0,
				...w,
				...o,
				ref: kt(u, o.ref),
				onKeyDown: T,
				onKeyUp: z,
				onBlur: A,
			}),
			(o = xu(o)),
			o
		);
	}),
	UL = Fe(function (n) {
		const i = Xg(Za(n));
		return Je(g3, i);
	}),
	B1 = "button",
	P1 = We(function (n) {
		const i = (0, _.useRef)(null),
			o = NI(i, B1),
			[u, l] = (0, _.useState)(() => !!o && ka({ tagName: o, type: n.type }));
		return (
			(0, _.useEffect)(() => {
				i.current && l(ka(i.current));
			}, []),
			(n = { role: !u && o !== "a" ? "button" : void 0, ...n, ref: kt(i, n.ref) }),
			(n = Xg(n)),
			n
		);
	}),
	VL = Fe(function (n) {
		const i = P1(Za(n));
		return Je(B1, i);
	}),
	y3 = "button",
	p3 = Symbol("disclosure"),
	$1 = We(function ({ store: n, toggleOnClick: i = !0, ...o }) {
		const u = Mg();
		((n = n || u), Zt(n, !1));
		const l = (0, _.useRef)(null),
			[f, h] = (0, _.useState)(!1),
			m = be(n, "disclosureElement"),
			g = be(n, "open"),
			p = (0, _.useCallback)(
				(x) => {
					const z = l.current;
					if (((l.current = x), x)) {
						n?.getState().disclosureElement?.isConnected || n.setDisclosureElement(x);
						return;
					}
					n?.getState().disclosureElement === z && n.setDisclosureElement(null);
				},
				[n],
			);
		(0, _.useEffect)(() => {
			let x = m === l.current;
			(m?.isConnected || (n?.setDisclosureElement(l.current), (x = !0)), h(g && x));
		}, [m, n, g]);
		const b = o.onClick,
			y = ut(i),
			[w, E] = Ag(o, p3, !0),
			T = Ae((x) => {
				(b?.(x), !x.defaultPrevented && (w || (y(x) && (n?.setDisclosureElement(x.currentTarget), n?.toggle()))));
			});
		return (
			(o = {
				"aria-expanded": f,
				"aria-controls": be(n, "contentElement")?.id,
				...E,
				...o,
				ref: kt(p, o.ref),
				onClick: T,
			}),
			(o = P1(o)),
			o
		);
	}),
	BL = Fe(function (n) {
		const i = $1(Za(n));
		return Je(y3, i);
	}),
	b3 = "button",
	H1 = We(function ({ store: n, ...i }) {
		const o = Ru();
		((n = n || o), Zt(n, !1));
		const u = be(n, "contentElement");
		return ((i = { "aria-haspopup": _u(u, "dialog"), ...i }), (i = $1({ store: n, ...i })), i);
	}),
	PL = Fe(function (n) {
		const i = H1(Za(n));
		return Je(b3, i);
	}),
	S3 = "button",
	Z1 = We(function ({ store: n, ...i }) {
		const o = Vg();
		return (
			(n = n || o),
			Zt(n, !1),
			(i = Ht(i, (u) => (0, S.jsx)(pf, { value: n, children: u }), [n])),
			(i = H1({ store: n, ...i })),
			i
		);
	}),
	$L = Fe(function (n) {
		const i = Z1(Za(n));
		return Je(S3, i);
	}),
	w3 = We(function ({
		store: n,
		showOnHover: i = !0,
		unstable_showOnHoverWhenDisabled: o = !0,
		setAnchorElement: u = !1,
		...l
	}) {
		const f = $a(l),
			h = l.focusable !== !1,
			m = (0, _.useRef)(null),
			g = (0, _.useRef)(0),
			p = Ae((A) => (f && !h ? !0 : vI(A)));
		((0, _.useEffect)(() => () => window.clearTimeout(g.current), []),
			(0, _.useEffect)(
				() =>
					Wt(
						"mouseleave",
						(N) => {
							const D = m.current;
							D && N.target === D && (window.clearTimeout(g.current), (g.current = 0));
						},
						!0,
					),
				[],
			));
		const b = l.onMouseMove,
			y = ut(i),
			w = ut(o),
			E = Rg(),
			T = Ae((A) => {
				if ((b?.(A), A.defaultPrevented || g.current || !E())) return;
				const N = A.currentTarget;
				if (p(N) || ((f || s_(N)) && !w(A)) || !y(A)) return;
				(u && n.setAnchorElement(N), n.setDisclosureElement(N));
				const { showTimeout: D, timeout: k } = n.getState(),
					O = () => {
						((g.current = 0),
							E() &&
								(p(N) ||
									(u && n.setAnchorElement(N),
									n.show(),
									queueMicrotask(() => {
										n.setDisclosureElement(N);
									}))));
					},
					L = D ?? k;
				L === 0 ? O() : (g.current = window.setTimeout(O, L));
			}),
			x = l.onClick,
			z = Ae((A) => {
				(x?.(A), window.clearTimeout(g.current), (g.current = 0));
			}),
			M = (0, _.useCallback)(
				(A) => {
					if (((m.current = A), !u)) return;
					const { anchorElement: N } = n.getState();
					N?.isConnected || n.setAnchorElement(A);
				},
				[n, u],
			);
		return ((l = { ...l, ref: kt(M, l.ref), onMouseMove: T, onClick: z }), (l = xu(l)), l);
	}),
	E3 = "button";
function _3(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function mw(e, n) {
	return !!e?.some((i) => (!i.element || i.element === n ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var C3 = We(function ({
		store: n,
		focusable: i,
		accessibleWhenDisabled: o,
		showOnHover: u,
		unstable_showOnHoverWhenDisabled: l = !1,
		...f
	}) {
		const h = xf();
		((n = n || h), Zt(n, !1));
		const m = (0, _.useRef)(null),
			g = n.parent,
			p = n.menubar,
			b = !!g,
			y = !!p && !b,
			w = $a(f),
			E = (q) => w || s_(q),
			T = () => {
				const q = m.current;
				q && (n?.setDisclosureElement(q), n?.show());
			},
			x = f.onFocus,
			z = Ae((q) => {
				if (
					(x?.(q),
					E(q.currentTarget) || q.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !p) || !y)
				)
					return;
				const { items: P } = p.getState();
				mw(P, q.currentTarget) && T();
			}),
			M = be(n, ["placement"], (q) => Bg(q.placement)),
			A = f.onKeyDown,
			N = Ae((q) => {
				if ((A?.(q), E(q.currentTarget) || q.defaultPrevented)) return;
				const P = _3(q, M);
				if (P) {
					q.preventDefault();
					const { open: F } = n.getState();
					if (F) {
						const Y = P === "last" ? n.last() : n.first();
						n.move(Y);
						return;
					}
					(T(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(P));
				}
			}),
			D = f.onClick,
			k = Ae((q) => {
				if ((D?.(q), q.defaultPrevented || !n)) return;
				const P = !q.detail,
					{ open: F } = n.getState();
				((!F || P) && ((!b || P) && n.setAutoFocusOnShow(!0), n.setInitialFocus(P ? "first" : "container")), b && T());
			});
		((f = Ht(f, (q) => (0, S.jsx)(M1, { value: n, children: q }), [n])),
			b && (f = { ...f, render: (0, S.jsx)(Kc.div, { render: f.render }) }));
		const O = Ur(f.id),
			L = be(g?.combobox || g, "contentElement"),
			H = b || y ? f_(L, "menuitem") : void 0,
			te = be(n, "contentElement"),
			R = !!n.combobox;
		return (
			(f = {
				role: H,
				"aria-haspopup": _u(te, R ? "dialog" : "menu"),
				...f,
				id: O,
				ref: kt(m, f.ref),
				onFocus: z,
				onKeyDown: N,
				onClick: k,
			}),
			(f = w3({
				store: n,
				focusable: i,
				accessibleWhenDisabled: o,
				...f,
				unstable_showOnHoverWhenDisabled: l,
				showOnHover: (q) => {
					if (
						!(() => {
							if (typeof u == "function") return u(q);
							if (u != null) return u;
							if (b) return !0;
							if (!p) return !1;
							const { items: Y } = p.getState();
							return y && mw(Y);
						})()
					)
						return !1;
					const F = y ? p : g;
					return (F && F.setActiveId(q.currentTarget.id), !0);
				},
			})),
			(f = Z1({ store: n, toggleOnClick: !b, focusable: i, accessibleWhenDisabled: o, ...f })),
			(f = Of({ store: n, typeahead: y, ...f })),
			f
		);
	}),
	T3 = Fe(function (n) {
		const i = C3(n);
		return Je(E3, Za(i));
	}),
	x3 = "div";
function O3(e) {
	const n = e.relatedTarget;
	return Mn(n) ? ht(e.currentTarget, n) : !1;
}
var Jm = Symbol("composite-hover");
function A3(e) {
	const { relatedTarget: n } = e;
	if (!Mn(n)) return !1;
	let i = n;
	do {
		if (zn(i, Jm) && i[Jm]) return !0;
		i = i.parentElement;
	} while (i);
	return !1;
}
var Jg = We(function ({ store: n, focusOnHover: i = !0, blurOnHoverEnd: o = !!i, ...u }) {
		const l = Cf();
		((n = n || l), Zt(n, !1));
		const f = Rg(),
			h = u.onMouseMove,
			m = ut(i),
			g = Ae((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!Hi(E.currentTarget)) {
						const T = n?.getState().compositeElement;
						T && !ns(T) && T.focus({ preventScroll: !0 });
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			p = u.onMouseLeave,
			b = ut(o),
			y = Ae((E) => {
				(p?.(E),
					!E.defaultPrevented &&
						f() &&
						(O3(E) ||
							A3(E) ||
							(m(E) && b(E) && (n?.setActiveId(null), n?.getState().compositeElement?.focus({ preventScroll: !0 })))));
			}),
			w = (0, _.useCallback)((E) => {
				E && (E[Jm] = !0);
			}, []);
		return ((u = { ...u, ref: kt(w, u.ref), onMouseMove: g, onMouseLeave: y }), u);
	}),
	HL = Tu(
		Fe(function (n) {
			const i = Jg(n);
			return Je(x3, i);
		}),
	),
	R3 = "div",
	F1 = We(function ({ store: n, shouldRegisterItem: i = !0, getItem: o = a_, element: u, ...l }) {
		const f = h4();
		n = n || f;
		const h = Ur(l.id),
			m = (0, _.useRef)(u);
		return (
			(0, _.useEffect)(() => {
				const g = m.current;
				if (!h || !g || !i) return;
				const p = o({ id: h, element: g });
				return n?.renderItem(p);
			}, [h, i, o, n]),
			(l = { ...l, ref: kt(m, l.ref) }),
			l
		);
	}),
	ZL = Fe(function (n) {
		const i = F1(n);
		return Je(R3, i);
	}),
	N3 = "button";
function M3(e) {
	return Vc(e) ? !0 : e.tagName === "INPUT" && !ka(e);
}
function D3(e, n = !1) {
	const i = e.clientHeight,
		{ top: o } = e.getBoundingClientRect(),
		u = Math.max(i * 0.875, i - 40) * 1.5,
		l = n ? i - u + o : u + o;
	return e.tagName === "HTML" ? l + e.scrollTop : l;
}
function z3(e, n = !1) {
	const { top: i } = e.getBoundingClientRect();
	return n ? i + e.clientHeight : i;
}
function gw(e, n, i, o = !1) {
	if (!n || !i) return;
	const { renderedItems: u } = n.getState(),
		l = bg(e);
	if (!l) return;
	const f = D3(l, o);
	let h, m;
	for (let g = 0; g < u.length; g += 1) {
		const p = h;
		if (((h = i(g)), !h)) break;
		if (h === p) continue;
		const b = Ra(n, h)?.element;
		if (!b) continue;
		const y = z3(b, o) - f,
			w = Math.abs(y);
		if ((o && y <= 0) || (!o && y >= 0)) {
			m !== void 0 && m < w && (h = p);
			break;
		}
		m = w;
	}
	return h;
}
function I3(e, n) {
	return cn(e) ? !1 : $i(n, e.target);
}
var Wg = We(function ({
		store: n,
		rowId: i,
		preventScrollOnKeyDown: o = !1,
		moveOnKeyPress: u = !0,
		tabbable: l = !1,
		getItem: f,
		typeaheadText: h,
		"aria-setsize": m,
		"aria-posinset": g,
		unstable_scrollIntoView: p,
		...b
	}) {
		const y = Cf();
		n = n || y;
		const w = gI(b),
			E = Ur(b.id),
			T = (0, _.useRef)(null),
			x = (0, _.useRef)(null),
			z = (0, _.useCallback)((W) => {
				const fe = x.current;
				(!W && fe && B4(fe), W && P4(W), (x.current = W));
			}, []),
			M = (0, _.useContext)(p4),
			A = $a(b),
			N = A && !w,
			D = A && b.focusable === !1,
			k = b.shouldRegisterItem,
			O = (W) => {
				if (i) return i;
				if (W && M?.compositeElement && M.compositeElement === W.compositeElement) return M.id;
			},
			{
				rowId: L,
				compositeElement: H,
				ariaSetSize: te,
				ariaPosInSet: R,
			} = Yc(n, ["compositeElement", "renderedItems"], {
				rowId: O,
				compositeElement(W) {
					return W?.compositeElement || void 0;
				},
				ariaSetSize(W) {
					if (m != null) return m;
					if (W && M?.ariaSetSize && M.compositeElement === W.compositeElement) return M.ariaSetSize;
				},
				ariaPosInSet(W) {
					if (g != null) return g;
					if (!W || !M?.ariaPosInSet || M.compositeElement !== W.compositeElement) return;
					const fe = O(W),
						Ee = W.renderedItems.filter((_e) => _e.rowId === fe);
					return M.ariaPosInSet + Ee.findIndex((_e) => _e.id === E);
				},
			}),
			{ isActiveItem: q, isTabbable: P } = Yc(
				n,
				["activeId", "compositeElement", "renderedItems", "virtualFocus", "items"],
				{
					isActiveItem(W) {
						return !!W && W.activeId === E;
					},
					isTabbable(W) {
						if (!W || (!W.compositeElement && !W.renderedItems.length)) return !0;
						if (W.virtualFocus) return !1;
						if (!W.renderedItems.length || l) return !0;
						if (W.activeId === null) return !1;
						const fe = n?.item(W.activeId);
						return fe?.disabled || !fe?.element ? !0 : W.activeId === E;
					},
				},
			),
			F = (0, _.useCallback)(
				(W) => {
					const fe = (W.element ? yI(W.element) : void 0) ?? (D || N),
						Ee = { ...W, id: E || W.id, rowId: L, disabled: fe, children: W.element?.textContent, typeaheadText: h };
					return f ? f(Ee) : Ee;
				},
				[E, L, D, N, h, f],
			),
			Y = b.onFocus,
			B = (0, _.useRef)(!1),
			ne = (0, _.useRef)(null),
			re = L1(n),
			U = Ae((W) => {
				if ((Y?.(W), W.defaultPrevented || nI(W) || !E || !n || I3(W, n))) return;
				const { virtualFocus: fe, compositeElement: Ee } = n.getState();
				if ((n.setActiveId(E), Vc(W.currentTarget) && Z4(W.currentTarget), !fe)) {
					cn(W) && n.item(E) && re({ id: E, markedOnly: !0, requireFocus: !0, scrollIntoView: p });
					return;
				}
				if (!cn(W) || M3(W.currentTarget)) return;
				const _e = (Ge, ct) => {
					if (!ln(ct)) return;
					const mt = Ge === ct || $i(n, Ge);
					(n.item(E) && re({ id: E, markedOnly: !0, requireFocus: !0, scrollIntoView: p }),
						(B.current = !0),
						mt ? F4(ct) : ct.focus({ preventScroll: !0 }));
				};
				if (Ee?.isConnected) {
					_e(W.relatedTarget, Ee);
					return;
				}
				if (k === !1) return;
				const { currentTarget: Ce, relatedTarget: ce } = W,
					ye = () => {
						(ne.current?.(), (ne.current = null));
					};
				(ye(),
					(ne.current = di(n, null, () => {
						if (Zn(Ce) !== Ce) {
							ye();
							return;
						}
						const Ge = n.getState(),
							ct = Ge.compositeElement;
						ct?.isConnected && (ye(), Ge.virtualFocus && _e(ce, ct));
					})));
			}),
			ee = b.onBlurCapture,
			K = Ae((W) => {
				(ee?.(W),
					!W.defaultPrevented &&
						n?.getState()?.virtualFocus &&
						B.current &&
						((B.current = !1), W.preventDefault(), W.stopPropagation()));
			}),
			ue = b.onKeyDown,
			xe = ut(o),
			ve = ut(u),
			j = Ae((W) => {
				if ((ue?.(W), W.defaultPrevented || !cn(W) || !n)) return;
				const { currentTarget: fe } = W,
					Ee = n.getState(),
					_e = !!n.item(E)?.rowId,
					Ce = Ee.orientation !== "horizontal",
					ce = Ee.orientation !== "vertical",
					ye = () => !!(_e || ce || !Ee.compositeElement || !yr(Ee.compositeElement)),
					Ge = {
						ArrowUp: (_e || Ce) && n.up,
						ArrowRight: (_e || ce) && n.next,
						ArrowDown: (_e || Ce) && n.down,
						ArrowLeft: (_e || ce) && n.previous,
						Home: () => {
							if (ye()) return !_e || W.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (ye()) return !_e || W.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => gw(fe, n, n?.up, !0),
						PageDown: () => gw(fe, n, n?.down),
					}[W.key];
				if (Ge) {
					if (Vc(fe)) {
						const mt = Bc(fe),
							_t = ce && W.key === "ArrowLeft",
							et = ce && W.key === "ArrowRight",
							Ue = Ce && W.key === "ArrowUp",
							Qe = Ce && W.key === "ArrowDown";
						if (et || Qe) {
							const { length: dn } = l_(fe);
							if (mt.end !== dn) return;
						} else if ((_t || Ue) && mt.start !== 0) return;
					}
					const ct = Ge();
					if (xe(W) || ct !== void 0) {
						if (!ve(W)) return;
						(W.preventDefault(), n.move(ct));
					}
				}
			}),
			ae = (0, _.useMemo)(() => ({ id: E, compositeElement: H }), [E, H]);
		return (
			(b = Ht(b, (W) => (0, S.jsx)(y4.Provider, { value: ae, children: W }), [ae])),
			(b = {
				"data-active-item": q || void 0,
				...b,
				id: E,
				ref: kt(T, z, b.ref),
				tabIndex: P ? b.tabIndex : -1,
				onFocus: U,
				onBlurCapture: K,
				onKeyDown: j,
			}),
			(b = Xg(b)),
			(b = F1({ store: n, ...b, getItem: F, shouldRegisterItem: E ? k : !1 })),
			{ ...b, "aria-setsize": te, "aria-posinset": R }
		);
	}),
	FL = Tu(
		Fe(function (n) {
			const i = Wg(Za(n));
			return Je(N3, i);
		}),
	),
	j3 = "div";
function k3(e, n, i) {
	if (!e) return !1;
	if (Hi(e)) return !0;
	const o = n
		?.find((l) => (l.element === i ? !1 : l.element?.getAttribute("aria-expanded") === "true"))
		?.element?.getAttribute("aria-controls");
	if (!o) return !1;
	const u = Ke(e).getElementById(o);
	return u ? (Hi(u) ? !0 : !!u.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var q3 = We(function ({
		store: n,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: o = !0,
		focusOnHover: u,
		blurOnHoverEnd: l,
		...f
	}) {
		const h = w4(!0),
			m = S4();
		((n = n || h || m), Zt(n, !1));
		const g = f.onClick,
			p = ut(i),
			b = "hideAll" in n ? n.hideAll : void 0,
			y = !!b,
			w = Ae((x) => {
				if ((g?.(x), x.defaultPrevented || g_(x) || m_(x) || !b)) return;
				const z = x.currentTarget.getAttribute("aria-haspopup");
				(z && z !== "false") || (p(x) && b());
			}),
			E = be(n, ["contentElement"], (x) => ("contentElement" in x ? x.contentElement : null)),
			T = (0, _.useContext)(D1);
		return (
			(f = { role: f_(E, "menuitem"), ...f, onClick: w }),
			(f = Wg({ store: n, preventScrollOnKeyDown: o, ...f, shouldRegisterItem: T ? !1 : f.shouldRegisterItem })),
			(f = Jg({
				store: n,
				...f,
				focusOnHover(x) {
					const z = () => (typeof u == "function" ? u(x) : (u ?? !0));
					if (!n || !z()) return !1;
					const { compositeElement: M, items: A } = n.getState();
					return y
						? (x.currentTarget.hasAttribute("aria-expanded") && x.currentTarget.focus({ preventScroll: !0 }), !0)
						: k3(M, A, x.currentTarget)
							? (x.currentTarget.focus({ preventScroll: !0 }), !0)
							: !1;
				},
				blurOnHoverEnd(x) {
					return typeof l == "function" ? l(x) : (l ?? y);
				},
			})),
			f
		);
	}),
	L3 = Tu(
		Fe(function (n) {
			const i = q3(n);
			return Je(j3, i);
		}),
	),
	Q1 = (0, _.createContext)(null),
	Uu = Vr([m1, Tf], [pf, ku]),
	U3 = Uu.useContext,
	ev = Uu.useScopedContext,
	Af = Uu.useProviderContext,
	QL = Uu.ContextProvider,
	V3 = Uu.ScopedContextProvider,
	B3 = (0, _.createContext)(void 0),
	P3 = (0, _.createContext)(!1),
	vw = (0, _.createContext)(null);
function Y1({ popover: e, ...n } = {}) {
	const i = gf(
		n.store,
		jg(e, [
			"arrowElement",
			"anchorElement",
			"contentElement",
			"popoverElement",
			"disclosureElement",
			"unstable_placing",
		]),
	);
	const o = i?.getState(),
		u = t1({ ...n, store: i }),
		l = ke(n.placement, o?.placement, "bottom"),
		f = {
			...u.getState(),
			placement: l,
			currentPlacement: l,
			anchorElement: ke(o?.anchorElement, null),
			popoverElement: ke(o?.popoverElement, null),
			arrowElement: ke(o?.arrowElement, null),
			rendered: Symbol("rendered"),
			unstable_placing: !1,
		},
		h = or(f, u, i);
	let m = f.anchorElement === f.disclosureElement ? f.anchorElement : null;
	return (
		yt(h, () =>
			nt(h, ["anchorElement", "disclosureElement"], (g) => {
				if (g.anchorElement && g.anchorElement !== m) {
					m = null;
					return;
				}
				((m = g.disclosureElement), h.setState("anchorElement", m));
			}),
		),
		yt(h, () => e?.unstable_onHideRequest(u.unstable_requestHide)),
		{
			...u,
			...h,
			setAnchorElement: (g) => h.setState("anchorElement", g),
			setPopoverElement: (g) => h.setState("popoverElement", g),
			setArrowElement: (g) => h.setState("arrowElement", g),
			render: () => h.setState("rendered", Symbol("rendered")),
		}
	);
}
function K1(e, n, i) {
	return (rs(n, [i.popover, n]), Dt(e, i, "placement"), n1(e, n, i));
}
function $3(e = {}) {
	const n = e.store?.getState(),
		i = Y1({ ...e, placement: ke(e.placement, n?.placement, "bottom") }),
		o = ke(e.timeout, n?.timeout, 500),
		u = {
			...i.getState(),
			timeout: o,
			showTimeout: ke(e.showTimeout, n?.showTimeout),
			hideTimeout: ke(e.hideTimeout, n?.hideTimeout),
			autoFocusOnShow: ke(n?.autoFocusOnShow, !1),
		},
		l = or(u, i, e.store);
	return { ...i, ...l, setAutoFocusOnShow: (f) => l.setState("autoFocusOnShow", f) };
}
function H3(e, n, i) {
	return (Dt(e, i, "timeout"), Dt(e, i, "showTimeout"), Dt(e, i, "hideTimeout"), K1(e, n, i));
}
function Z3({ combobox: e, parent: n, menubar: i, ...o } = {}) {
	const u = !!i && !n,
		l = gf(
			o.store,
			B_(n, ["values"]),
			jg(e, [
				"arrowElement",
				"anchorElement",
				"contentElement",
				"popoverElement",
				"disclosureElement",
				"placement",
				"currentPlacement",
			]),
		);
	const f = l.getState(),
		h = (n || i)?.getState().orientation === "vertical" ? "right-start" : "bottom-start",
		m = j1({ ...o, store: l, orientation: ke(o.orientation, f.orientation, "vertical") }),
		g = $3({
			...o,
			store: l,
			placement: ke(o.placement, f.placement, h),
			timeout: ke(o.timeout, f.timeout, u ? 0 : 150),
			hideTimeout: ke(o.hideTimeout, f.hideTimeout, 0),
		}),
		p = {
			...m.getState(),
			...g.getState(),
			initialFocus: ke(f.initialFocus, "container"),
			values: ke(o.values, f.values, o.defaultValues, {}),
		},
		b = or(p, m, g, l);
	return (
		yt(b, () => e?.unstable_onHideRequest(g.unstable_requestHide)),
		yt(b, () =>
			nt(b, ["mounted"], (y) => {
				y.mounted || b.setState("activeId", null);
			}),
		),
		{
			...m,
			...g,
			...b,
			combobox: e,
			parent: n,
			menubar: i,
			hideAll: () => {
				(g.hide(), n?.hideAll());
			},
			setInitialFocus: (y) => b.setState("initialFocus", y),
			setValues: (y) => b.setState("values", y),
			setValue: (y, w) => {
				y !== "__proto__" &&
					y !== "constructor" &&
					(Array.isArray(y) ||
						b.setState("values", (E) => {
							const T = E[y],
								x = uf(w, T);
							return x === T ? E : { ...E, [y]: x !== void 0 && x };
						}));
			},
		}
	);
}
function F3(e, n, i) {
	return (
		rs(n, [i.combobox, i.parent, i.menubar, n]),
		Dt(e, i, "values", "setValues"),
		Object.assign(H3(V1(e, n, i), n, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function Q3(e = {}) {
	const n = N1(),
		i = b4(),
		o = Af();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : o,
	};
	const [u, l] = vf(Z3, e);
	return F3(u, l, e);
}
function Y3(e = {}) {
	const n = Q3(e);
	return (0, S.jsx)(M1, { value: n, children: e.children });
}
var K3 = "hr",
	G1 = We(function ({ orientation: n = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": n, ...i }), i);
	}),
	YL = Fe(function (n) {
		const i = G1(n);
		return Je(K3, i);
	}),
	G3 = "hr",
	X1 = We(function ({ store: n, orientation: i, ...o }) {
		const u = Cf();
		((n = n || u), Zt(n, !1));
		const l = be(n, ["orientation"], (f) => i ?? (f.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((o = G1({ ...o, orientation: l })), o);
	}),
	KL = Fe(function (n) {
		const i = X1(n);
		return Je(G3, i);
	}),
	X3 = "hr",
	J3 = We(function ({ store: n, ...i }) {
		const o = N1();
		return ((n = n || o), (i = X1({ store: n, ...i })), i);
	}),
	W3 = Fe(function (n) {
		const i = J3(n);
		return Je(X3, i);
	}),
	eq = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	tq = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, i, o) => (o ? o.toUpperCase() : i.toLowerCase())),
	yw = (e) => {
		const n = tq(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	J1 = (...e) =>
		e
			.filter((n, i, o) => !!n && n.trim() !== "" && o.indexOf(n) === i)
			.join(" ")
			.trim(),
	nq = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	rq = {
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
	iq = (0, _.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: n = 24,
				strokeWidth: i = 2,
				absoluteStrokeWidth: o,
				className: u = "",
				children: l,
				iconNode: f,
				...h
			},
			m,
		) =>
			(0, _.createElement)(
				"svg",
				{
					ref: m,
					...rq,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: o ? (Number(i) * 24) / Number(n) : i,
					className: J1("lucide", u),
					...(!l && !nq(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([g, p]) => (0, _.createElement)(g, p)), ...(Array.isArray(l) ? l : [l])],
			),
	),
	tv = (e, n) => {
		const i = (0, _.forwardRef)(({ className: o, ...u }, l) =>
			(0, _.createElement)(iq, { ref: l, iconNode: n, className: J1(`lucide-${eq(yw(e))}`, `lucide-${e}`, o), ...u }),
		);
		return ((i.displayName = yw(e)), i);
	},
	aq = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	oq = tv("arrow-up", aq),
	sq = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	uq = tv("ellipsis", sq),
	lq = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	cq = tv("paperclip", lq),
	fq = (0, _.memo)(function (n) {
		const { channelName: i, items: o } = n;
		return (0, S.jsxs)(Y3, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(T3, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, S.jsx)(uq, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(d3, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: o.map((u) =>
						"separator" in u
							? (0, S.jsx)(W3, { className: "ChannelRowMenu-separator" }, u.id)
							: (0, S.jsx)(
									L3,
									{
										className: u.danger ? "ChannelRowMenu-item ChannelRowMenu-item-danger" : "ChannelRowMenu-item",
										onClick: u.onSelect,
										children: u.label,
									},
									u.id,
								),
					),
				}),
			],
		});
	}),
	W1 = new WeakMap(),
	pw = new WeakMap(),
	bw = new WeakMap();
function eu(e) {
	e.scrollIntoView({ block: "nearest", inline: "nearest" });
}
function dq(e, n) {
	const i = ar(e);
	if (!i.getComputedStyle(n).writingMode.startsWith("horizontal")) return null;
	let o = null,
		u = null,
		l = e.parentElement;
	for (; l && n.contains(l);) {
		const f = i.getComputedStyle(l);
		if (f.overflowY !== "visible" && f.overflowY !== "clip" && l.scrollHeight > l.clientHeight) {
			if (o) return null;
			o = l;
		}
		if (f.overflowX !== "visible" && f.overflowX !== "clip" && l.scrollWidth > l.clientWidth) {
			if (u) return null;
			u = l;
		}
		if (l === n) break;
		l = l.parentElement;
	}
	return u && u !== o ? null : o;
}
function hq(e, n) {
	const i = e.getBoundingClientRect(),
		o = n.getBoundingClientRect(),
		u = o.width / n.offsetWidth || 1,
		l = o.left + n.clientLeft * u,
		f = l + n.clientWidth * u,
		h = n.clientWidth * u,
		m = i.left < l,
		g = i.right > f,
		p = (m && !g && i.width < h) || (g && !m && i.width > h),
		b = (m && !g && i.width > h) || (g && !m && i.width < h);
	let y = 0;
	p ? (y = (i.left - l) / u) : b && (y = (i.right - f) / u);
	const w = o.height / n.offsetHeight || 1,
		E = (i.top + i.height / 2 - (o.top + (n.clientTop + n.clientHeight / 2) * w)) / w;
	n.scrollBy({ left: y, top: E });
}
function eC(e) {
	if (!e) return eu;
	const n = pw.get(e);
	if (n) return n;
	const i = (o) => {
		const { contentElement: u, moves: l, selectElement: f } = e.getState();
		if (!f || l !== W1.get(f) || !u?.contains(o)) return eu(o);
		const h = dq(o, u);
		if (!h) return eu(o);
		hq(o, h);
	};
	return (pw.set(e, i), i);
}
function mq(e) {
	const n = bw.get(e);
	if (n) return n;
	const i = {
		get current() {
			const { activeId: o, contentElement: u, moves: l, selectElement: f } = e.getState();
			if (!f) return null;
			const h = W1.get(f),
				m = h != null && l !== h,
				g = e.item(o)?.element;
			return m && g ? g : !u || u.querySelector("[data-autofocus=true],[autofocus]") ? null : g || u;
		},
	};
	return (bw.set(e, i), i);
}
var gq = "input";
function vq(e, n, i) {
	return i ? e.find((o) => !o.disabled && o.value)?.value === n : !1;
}
function Sw(e, n) {
	if (!n || e == null) return !1;
	const i = Pm(e),
		o = Pm(n);
	return i.length !== e.length || o.length !== n.length
		? !1
		: o.length > i.length && o.toLowerCase().startsWith(i.toLowerCase());
}
function yq(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function pq(e) {
	return e.find((n) => (n.disabled ? !1 : n.element?.getAttribute("role") !== "tab"))?.id;
}
var bq = We(function ({
		store: n,
		focusable: i = !0,
		autoSelect: o = !1,
		getAutoSelectId: u,
		setValueOnChange: l,
		showMinLength: f = 0,
		showOnChange: h,
		showOnMouseDown: m,
		showOnClick: g = m,
		showOnKeyDown: p,
		showOnKeyPress: b = p,
		blurActiveItemOnClick: y,
		setValueOnClick: w = !0,
		moveOnKeyPress: E = !0,
		autoComplete: T = "list",
		name: x,
		form: z,
		disabled: M,
		...A
	}) {
		const N = ev(!0),
			D = Af();
		((n = n || D || N), Zt(n, !1));
		const k = (0, _.useRef)(null),
			[O, L] = N_(),
			H = (0, _.useRef)(!1),
			te = (0, _.useRef)(!1),
			R = (0, _.useRef)(null),
			q = () => {
				const de = R.current;
				de != null && (cancelAnimationFrame(de), (R.current = null));
			},
			P = be(n, ["virtualFocus"], (de) => de.virtualFocus && o),
			F = T === "inline" || T === "both",
			[Y, B] = (0, _.useState)(F);
		MI(() => {
			F && B(!0);
		}, [F]);
		const ne = be(n, "inputValue"),
			re = be(n, ["selectedValue"], (de) => {
				if (x && Array.isArray(de.selectedValue)) return de.selectedValue;
			}),
			U = Array.isArray(re),
			ee = (0, _.useRef)(void 0);
		(0, _.useEffect)(
			() =>
				nt(n, ["selectedValue", "activeId"], (de, Be) => {
					ee.current = Be.selectedValue;
				}),
			[n],
		);
		const K = be(n, ["activeValue", "selectedValue", "activeId"], (de) => {
				if (
					F &&
					Y &&
					!(
						de.activeValue &&
						Array.isArray(de.selectedValue) &&
						(de.selectedValue.includes(de.activeValue) || ee.current?.includes(de.activeValue))
					)
				)
					return de.activeValue;
			}),
			ue = be(n, "renderedItems"),
			xe = be(n, "open"),
			ve = be(n, "contentElement"),
			j = be(n, "unstable_placing"),
			ae = vq(ue, K, P),
			W = (0, _.useMemo)(() => {
				if (!F || !Y) return ne;
				if (ae) {
					if (Sw(ne, K)) {
						const de = K?.slice(ne.length) || "";
						return ne + de;
					}
					return ne;
				}
				return K || ne;
			}, [F, Y, ae, K, ne]);
		((0, _.useEffect)(() => {
			const de = k.current;
			if (!de) return;
			const Be = () => B(!0);
			return (
				de.addEventListener("combobox-item-move", Be),
				() => {
					de.removeEventListener("combobox-item-move", Be);
				}
			);
		}, []),
			(0, _.useEffect)(() => {
				if (!F || !Y || !K || !ae || !Sw(ne, K)) return;
				let de = za;
				return (
					queueMicrotask(() => {
						const Be = k.current;
						if (!Be) return;
						const { start: Rt, end: ft } = Bc(Be),
							pn = ne.length,
							mn = K.length;
						(vm(Be, pn, mn),
							(de = () => {
								if (!ns(Be)) return;
								const { start: kn, end: le } = Bc(Be);
								kn === pn && le === mn && vm(Be, Rt, ft);
							}));
					}),
					() => de()
				);
			}, [O, F, Y, K, ae, ne]));
		const fe = Ae(u),
			Ee = (0, _.useRef)(null),
			_e = (0, _.useRef)(void 0),
			Ce = (0, _.useRef)(!1),
			ce = (0, _.useRef)(!1);
		((0, _.useEffect)(() => {
			if (!xe || !ve) return;
			const de = bg(ve);
			if (!de) return;
			const Be = () => {
					((H.current = !1), (Ce.current = !0));
				},
				Rt = () => {
					if ((ce.current || (Ce.current = !0), !n || !H.current)) return;
					const { activeId: pn } = n.getState();
					pn !== null && pn !== Ee.current && (H.current = !1);
				},
				ft = { passive: !0, capture: !0 };
			return (
				de.addEventListener("wheel", Be, ft),
				de.addEventListener("touchmove", Be, ft),
				de.addEventListener("scroll", Rt, ft),
				() => {
					(de.removeEventListener("wheel", Be, !0),
						de.removeEventListener("touchmove", Be, !0),
						de.removeEventListener("scroll", Rt, !0));
				}
			);
		}, [xe, ve, n]),
			Ne(() => {
				((Ce.current = !1), ne && (te.current || (H.current = !0)));
			}, [ne]),
			Ne(() => {
				(P !== "always" && xe) || (H.current = xe);
			}, [P, xe]),
			Ne(() => {
				xe || (_e.current = void 0);
			}, [xe]));
		const ye = be(n, "resetValueOnSelect");
		(rs(() => {
			const de = H.current;
			if (!n || !xe || te.current || (!de && (!ye || Ce.current))) return;
			const Be = n.getState(),
				{ compositeElement: Rt, activeId: ft, selectElement: pn, selectedValue: mn } = Be;
			if ((Rt && !S_(Rt)) || Be.unstable_placing) return;
			const kn = n.item(ft)?.value,
				le = kn != null && (Array.isArray(mn) ? mn.includes(kn) : mn === kn);
			if (P && de && !(pn && !ne && le)) {
				const Oe = fe(ue),
					Ie = Oe !== void 0 ? Oe : (pq(ue) ?? n.first());
				Ee.current = Ie;
				const pe = Ie ?? null,
					Me = n.item(pe)?.value,
					Yt = _e.current;
				pe !== ft || Yt?.id !== pe || Yt?.value !== Me
					? ((_e.current = { id: pe, value: Me }), n.move(pe))
					: n.setState("activeValue", Me);
			} else {
				const Oe = n.item(ft || n.first())?.element;
				Oe &&
					"scrollIntoView" in Oe &&
					((ce.current = !0),
					Oe.scrollIntoView({ block: "nearest", inline: "nearest" }),
					requestAnimationFrame(() => {
						ce.current = !1;
					}));
			}
		}, [n, xe, j, O, ne, P, ye, fe, ue]),
			(0, _.useEffect)(() => {
				if (!F) return;
				const de = k.current;
				if (!de) return;
				const Be = [de, ve].filter((ft) => !!ft),
					Rt = (ft) => {
						Be.every((pn) => Aa(ft, pn)) && n?.setInputValue(W);
					};
				for (const ft of Be) ft.addEventListener("focusout", Rt);
				return () => {
					for (const ft of Be) ft.removeEventListener("focusout", Rt);
				};
			}, [F, ve, n, W]));
		const Ge = (de) => de.currentTarget.value.length >= f,
			ct = A.onChange,
			mt = ut(h ?? Ge),
			_t = ut(l ?? !n.tag),
			et = Ae((de) => {
				if ((ct?.(de), de.defaultPrevented || !n)) return;
				const Be = de.currentTarget,
					{ value: Rt, selectionStart: ft, selectionEnd: pn } = Be,
					mn = de.nativeEvent;
				if (((H.current = !0), oI(mn) && (mn.isComposing && ((H.current = !1), (te.current = !0)), F))) {
					const kn = mn.inputType === "insertText" || mn.inputType === "insertCompositionText",
						le = ft === Rt.length;
					B(kn && le);
				}
				if (_t(de)) {
					const kn = Rt === n.getState().inputValue;
					(n.setInputValue(Rt),
						queueMicrotask(() => {
							vm(Be, ft, pn);
						}),
						F && P && kn && L());
				}
				(mt(de) && n.show(), (!P || !H.current) && n.setActiveId(null));
			});
		(0, _.useEffect)(() => q, []);
		const Ue = A.onCompositionStart,
			Qe = Ae((de) => {
				(q(), (H.current = !1), (te.current = !0), Ue?.(de));
			}),
			dn = A.onCompositionEnd,
			At = Ae((de) => {
				((H.current = !0),
					(te.current = !1),
					dn?.(de),
					!de.defaultPrevented &&
						P &&
						(q(),
						(R.current = requestAnimationFrame(() => {
							((R.current = null), !te.current && L());
						}))));
			}),
			Fn = A.onMouseDown,
			Qn = ut(y ?? (() => n.getState().compositeElementInFocusOrder)),
			Ct = ut(w),
			qt = ut(g ?? Ge),
			hn = Ae((de) => {
				(Fn?.(de),
					!de.defaultPrevented &&
						(de.button ||
							de.ctrlKey ||
							(n &&
								(Qn(de) && n.setActiveId(null),
								Ct(de) && n.setInputValue(W),
								qt(de) && Pc(de.currentTarget, "mouseup", n.show)))));
			}),
			Qt = A.onKeyDown,
			he = ut(b ?? Ge),
			Te = Ae((de) => {
				if ((Qt?.(de), de.repeat || (H.current = !1), de.defaultPrevented || !n)) return;
				const { open: Be } = n.getState();
				if (Be && de.key === "Enter") {
					de.preventDefault();
					return;
				}
				de.ctrlKey ||
					de.altKey ||
					de.shiftKey ||
					de.metaKey ||
					Be ||
					((de.key === "ArrowUp" || de.key === "ArrowDown") && he(de) && (de.preventDefault(), n.show()));
			}),
			bt = A.onBlur,
			Tt = Ae((de) => {
				((H.current = !1), bt?.(de));
			}),
			ea = Ur(A.id),
			Fa = yq(T) ? T : void 0,
			ta = be(n, ["activeId"], (de) => de.activeId === null),
			mi = $a({ disabled: M, "aria-disabled": A["aria-disabled"] }),
			pr = A.composite !== !1,
			[, gi] = R_(pr ? null : n.setCompositeElement),
			br = be(n, U ? ["compositeElement"] : [], (de) => (U ? de.compositeElement : null));
		((A = Ht(
			A,
			(de) =>
				!x || !Array.isArray(re) || (pr && !br)
					? de
					: (0, S.jsxs)(S.Fragment, {
							children: [
								de,
								re.map((Be, Rt) =>
									(0, S.jsx)("input", { type: "hidden", name: x, form: z, disabled: mi, value: Be }, Rt),
								),
							],
						}),
			[x, z, mi, pr, br, re],
		)),
			(A = {
				role: "combobox",
				"aria-autocomplete": Fa,
				"aria-haspopup": _u(ve, "listbox"),
				"aria-expanded": xe,
				"aria-controls": ve?.id,
				"data-active-item": ta || void 0,
				value: W,
				...A,
				id: ea,
				name: U ? void 0 : x,
				form: z,
				disabled: M,
				ref: kt(k, n.setInputElement, pr ? void 0 : gi, A.ref),
				onChange: et,
				onCompositionStart: Qe,
				onCompositionEnd: At,
				onMouseDown: hn,
				onKeyDown: Te,
				onBlur: Tt,
			}));
		const tn = eC(n);
		return (
			(A = Gg({
				store: n,
				unstable_scrollIntoView: tn,
				focusable: i,
				...A,
				moveOnKeyPress: (de) => (pg(E, de) ? !1 : (F && B(!0), !0)),
			})),
			{ autoComplete: "off", ...A }
		);
	}),
	Sq = Fe(function (n) {
		const i = bq(n);
		return Je(gq, i);
	}),
	wq = "div";
function Eq(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function _q(e) {
	return c_(e) ?? "option";
}
var Cq = We(function ({
		store: n,
		value: i,
		hideOnClick: o,
		setValueOnClick: u,
		selectValueOnClick: l = !0,
		resetValueOnSelect: f,
		focusOnHover: h,
		moveOnKeyPress: m = !0,
		preventScrollOnKeyDown: g,
		getItem: p,
		...b
	}) {
		const y = ev();
		((n = n || y), Zt(n, !1));
		const w = Ur(b.id),
			E = (0, _.useContext)(Q1),
			T = E?.store === n,
			{
				resetValueOnSelectState: x,
				multiSelectable: z,
				selected: M,
				autoFocusSelected: A,
				selectElement: N,
				contentElement: D,
			} = Yc(n, ["selectedValue"], {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(ve) {
					return Array.isArray(ve.selectedValue);
				},
				selected(ve) {
					return Eq(ve.selectedValue, i);
				},
				autoFocusSelected(ve) {
					return i == null
						? !1
						: Array.isArray(ve.selectedValue)
							? ve.selectedValue[ve.selectedValue.length - 1] === i
							: ve.selectedValue === i;
				},
				selectElement: "selectElement",
				contentElement: "contentElement",
			}),
			k = !!N,
			O = !!N,
			L = $a(b),
			H = (0, _.useCallback)(
				(ve) => {
					const j = { ...ve, value: O && L ? void 0 : i };
					return p ? p(j) : j;
				},
				[O, L, i, p],
			);
		((u = u ?? (!O && !z)), (o = o ?? (i != null && !z)), (g = g ?? O));
		const te = T ? E?.role : _u(D),
			R = _q(typeof te == "string" ? te : void 0),
			q = b.onClick,
			P = ut(u),
			F = ut(l),
			Y = ut(f ?? x),
			B = ut(o),
			ne = Ae((ve) => {
				(q?.(ve),
					!ve.defaultPrevented &&
						(g_(ve) ||
							m_(ve) ||
							(i != null &&
								(F(ve) &&
									(Y(ve) && n?.resetInputValue(),
									n?.setSelectedValue((j) =>
										Array.isArray(j) ? (j.includes(i) ? j.filter((ae) => ae !== i) : [...j, i]) : i,
									)),
								P(ve) && n?.setInputValue(i)),
							B(ve) && n?.hide())));
			}),
			re = b.onKeyDown,
			U = Ae((ve) => {
				if ((re?.(ve), ve.defaultPrevented)) return;
				const j = n?.getState().compositeElement;
				if (!j || ns(j)) return;
				const ae = ve.key.length === 1 && !ve.ctrlKey && !ve.metaKey,
					W = (cf() ? ve.metaKey : ve.ctrlKey) && ve.key.toLowerCase() === "v",
					fe = ve.key === "Backspace" || ve.key === "Delete";
				if (ae || W || fe) {
					if (j === N) return;
					if (yr(j)) {
						(queueMicrotask(() => j.focus()), n?.setInputValue(j.value));
						return;
					}
					(j.focus(), "value" in j && typeof j.value == "string" && n?.setInputValue(j.value));
				}
			});
		((O || z) && M != null && (b = { "aria-selected": M, ...b }),
			(b = Ht(
				b,
				(ve) =>
					(0, S.jsx)(B3.Provider, { value: i, children: (0, S.jsx)(P3.Provider, { value: M ?? !1, children: ve }) }),
				[i, M],
			)));
		const ee = k ? A : void 0;
		((b = { role: R, children: i, ...b, id: w, onClick: ne, onKeyDown: U }),
			b.autoFocus === void 0 && ee !== void 0 && ((b.autoFocus = !1), (b["data-autofocus"] = ee || void 0)));
		const K = ut(m),
			ue = eC(n);
		b = Wg({
			store: n,
			unstable_scrollIntoView: ue,
			...b,
			getItem: H,
			preventScrollOnKeyDown: g,
			moveOnKeyPress: (ve) => {
				if (!K(ve)) return !1;
				const j = new Event("combobox-item-move");
				return (n?.getState().compositeElement?.dispatchEvent(j), !0);
			},
		});
		const xe = ut(h ?? O);
		return (
			(b = Jg({
				store: n,
				...b,
				focusOnHover(ve) {
					return !n.getState().open || !xe(ve) ? !1 : n.getState().open;
				},
			})),
			b
		);
	}),
	Tq = Tu(
		Fe(function (n) {
			const i = Cq(n);
			return Je(wq, i);
		}),
	),
	xq = "div",
	tC = We(function ({ store: n, alwaysVisible: i, ...o }) {
		const u = ev(!0),
			l = U3();
		n = n || l;
		const f = !!n && n === u;
		Zt(n, !1);
		const h = o.onFocus,
			m = Ae((P) => {
				if ((h?.(P), P.defaultPrevented || !cn(P))) return;
				const F = n.getState().compositeElement;
				if (!F || !ln(F)) return;
				const Y = P.currentTarget;
				queueMicrotask(() => {
					qa(Y) === Y && F.focus();
				});
			}),
			g = (0, _.useRef)(null),
			p = Ur(o.id),
			b = be(n, "mounted"),
			y = Nu(b, o.hidden, i),
			w = y ? { ...o.style, display: "none" } : o.style,
			E = be(n, ["selectedValue"], (P) => Array.isArray(P.selectedValue)),
			T = NS(g, "role", o.role),
			x = (0, _.useMemo)(() => ({ store: n, role: T }), [n, T]),
			z = ((T === "listbox" || T === "tree" || T === "grid") && E) || void 0,
			[M, A] = (0, _.useState)(!1),
			N = be(n, "contentElement"),
			D = (0, _.useContext)(vw),
			k = (0, _.useState)(),
			[O, L] = D || k,
			H = (0, _.useMemo)(() => [O, L], [O, L]);
		(Ne(() => {
			if (!b) return;
			const P = g.current;
			if (!P || N !== P) return;
			const F = () => {
					A(!!P.querySelector("[data-combobox-list]"));
				},
				Y = new MutationObserver(F);
			return (Y.observe(P, { subtree: !0, childList: !0 }), F(), () => Y.disconnect());
		}, [b, N]),
			M || (o = { role: "listbox", "aria-multiselectable": z, ...o }),
			(o = Ht(
				o,
				(P) =>
					(0, S.jsx)(V3, {
						value: n,
						children: (0, S.jsx)(vw.Provider, {
							value: H,
							children: (0, S.jsx)(I_.Provider, {
								value: L,
								children: (0, S.jsx)(Q1.Provider, { value: x, children: P }),
							}),
						}),
					}),
				[n, x, H],
			)));
		const te = p && (!u || !f) ? n.setContentElement : null,
			R = be(n, ["labelElement", "selectLabelElement"], (P) => (O ? null : P.selectLabelElement || P.labelElement));
		NS(R, "id");
		const q = O || R?.id;
		return (
			(o = {
				"data-combobox-list": "",
				"aria-labelledby": o["aria-label"] != null ? void 0 : q,
				hidden: y,
				...o,
				id: p,
				onFocus: m,
				ref: kt(te, g, o.ref),
				style: w,
				tabIndex: -1,
			}),
			o
		);
	}),
	GL = Fe(function (n) {
		const i = tC(n);
		return Je(xq, i);
	}),
	Oq = "div";
function Aq(e, ...n) {
	if (!e) return !1;
	if ("id" in e) {
		const i = n
			.filter(Boolean)
			.map((o) => `[aria-controls~="${o}"]`)
			.join(", ");
		return i ? e.matches(i) : !1;
	}
	return !1;
}
var Rq = We(function ({
		store: n,
		modal: i,
		tabIndex: o,
		alwaysVisible: u,
		resetOnEscape: l,
		autoFocusOnHide: f = !0,
		hideOnInteractOutside: h = !0,
		unstable_treeSnapshotKey: m,
		...g
	}) {
		const p = Af();
		((n = n || p), Zt(n, !1));
		const b = be(n, "compositeElement"),
			y = be(n, "inputElement"),
			w = be(n, "selectElement"),
			E = (0, _.useRef)(!1),
			T = !!w,
			x = be(n, "selectOnMove"),
			z = (0, _.useRef)(null),
			M = (0, _.useRef)(!1),
			A = (0, _.useRef)(!1),
			N = (0, _.useRef)(null),
			D = (0, _.useRef)(n.getState().selectedValue);
		(0, _.useEffect)(() => {
			const F = n.getState();
			M.current = F.open;
			let Y = F.moves;
			return (
				(D.current = F.selectedValue),
				nt(n, ["open", "moves", "selectedValue"], (B, ne) => {
					if (!B.open) {
						(ne.open && (A.current = M.current), (M.current = !1));
						return;
					}
					if (!ne.open) {
						const re = N.current;
						(re !== null ? ((M.current = re), (N.current = null)) : (M.current = !0), (Y = B.moves));
					}
					(B.moves !== Y && (M.current = !1), M.current && (D.current = B.selectedValue));
				})
			);
		}, [n]);
		const k = ut(l ?? x),
			O = be(n.tag, ["renderedItems"], (F) => F?.renderedItems.length),
			L = (0, _.useMemo)(() => [m, O], [m, O]);
		((g = tC({ store: n, alwaysVisible: u, ...g })), (g = Of({ store: n, typeahead: !y, ...g })));
		const H = ut(g.hideOnEscape ?? !0),
			te = g.onClose,
			R = g.getPersistentElements,
			q = Ae((F) => {
				if (!H(F)) return !1;
				const Y = { event: F, defaultPrevented: F.defaultPrevented, cancelBubble: F.cancelBubble };
				return (
					(z.current = Y),
					setTimeout(() => {
						z.current === Y && (z.current = null);
					}),
					!0
				);
			}),
			P = Ae((F) => {
				const Y = z.current;
				if (((z.current = null), te?.(F), F.defaultPrevented)) {
					if (n.getState().open) return;
					((N.current = A.current),
						queueMicrotask(() => {
							N.current = null;
						}));
					return;
				}
				Y &&
					((Y.event.defaultPrevented && !Y.defaultPrevented) ||
						(Y.event.cancelBubble && !Y.cancelBubble) ||
						Array.isArray(n.getState().selectedValue) ||
						(k(Y.event) && n.setSelectedValue(D.current)));
			});
		return (
			(g = Yg({
				store: n,
				modal: i,
				alwaysVisible: u,
				backdrop: !1,
				autoFocusOnShow: T,
				initialFocus: T ? y || mq(n) : void 0,
				finalFocus: w || b,
				preserveTabOrderAnchor: null,
				...g,
				unstable_treeSnapshotKey: L,
				hideOnEscape: q,
				onClose: P,
				getPersistentElements() {
					const F = R?.() || [];
					if (!i || !n) return F;
					const { compositeElement: Y, contentElement: B, inputElement: ne, selectElement: re } = n.getState(),
						U = [Y, ne, re],
						ee = re || ne || Y;
					if (!ee) return F;
					const K = new Set(F),
						ue = (ae) => {
							ae && (B?.contains(ae) || K.add(ae));
						};
					U.forEach(ue);
					const xe = Ke(ee),
						ve = new Set();
					for (const ae of [B, ...U]) ae?.id && ve.add(`[aria-controls~="${ae.id}"]`);
					if (!ve.size) return [...K];
					const j = [...ve].join(",");
					return (xe.querySelectorAll(j).forEach(ue), [...K]);
				},
				autoFocusOnHide(F) {
					return pg(f, F) ? !1 : E.current ? ((E.current = !1), !1) : !0;
				},
				hideOnInteractOutside(F) {
					const Y = n?.getState(),
						B = Y?.contentElement?.id,
						ne = Y?.compositeElement?.id;
					if (Aq(F.target, B, ne)) return !1;
					const re = typeof h == "function" ? h(F) : h;
					return (re && (E.current = F.type === "click"), re);
				},
			})),
			g
		);
	}),
	Nq = Mu(
		Fe(function (n) {
			const i = Rq(n);
			return Je(Oq, i);
		}),
		Af,
	),
	XL = (0, _.createContext)(null),
	JL = (0, _.createContext)(null),
	Vu = Vr([Tf], [ku]),
	Mq = Vu.useContext,
	WL = Vu.useScopedContext,
	e6 = Vu.useProviderContext,
	t6 = Vu.ContextProvider,
	n6 = Vu.ScopedContextProvider,
	Dq = Sg() && d_();
function zq({ tag: e, ...n } = {}) {
	const i = gf(n.store, B_(e, ["value", "rtl"])),
		o = ke(n.defaultInputValue, n.defaultValue);
	({ ...n });
	const u = e?.getState(),
		l = i?.getState(),
		f = ke(n.activeId, l?.activeId, n.defaultActiveId, null),
		h = j1({
			...n,
			activeId: f,
			compositeElementInFocusOrder: ke(
				n.compositeElementInFocusOrder,
				n.includesBaseElement,
				l?.compositeElementInFocusOrder,
				l?.includesBaseElement,
				!0,
			),
			orientation: ke(n.orientation, l?.orientation, "vertical"),
			focusLoop: ke(n.focusLoop, l?.focusLoop, !0),
			focusWrap: ke(n.focusWrap, l?.focusWrap, !0),
			virtualFocus: ke(n.virtualFocus, l?.virtualFocus, !0),
		}),
		m = Y1({ ...n, placement: ke(n.placement, l?.placement, "bottom-start") }),
		g = ke(n.inputValue, n.value, l?.inputValue, l?.value, o, ""),
		p = ke(n.selectedValue, l?.selectedValue, u?.values, n.defaultSelectedValue, "");
	let b =
		n.selectedValue === void 0 &&
		l?.selectedValue === void 0 &&
		u?.values === void 0 &&
		n.defaultSelectedValue === void 0;
	const y = Array.isArray(p),
		w = {
			...h.getState(),
			...m.getState(),
			inputValue: g,
			value: g,
			selectedValue: p,
			resetValueOnSelect: ke(n.resetValueOnSelect, l?.resetValueOnSelect, y),
			resetValueOnHide: ke(n.resetValueOnHide, l?.resetValueOnHide, y && !e),
			selectOnMove: ke(n.selectOnMove, l?.selectOnMove, !1),
			activeValue: l?.activeValue,
			inputElement: ke(l?.inputElement, null),
			labelElement: ke(l?.labelElement, null),
			selectElement: ke(l?.selectElement, null),
			selectLabelElement: ke(l?.selectLabelElement, null),
		},
		E = or(w, h, m, i);
	yt(E, () =>
		en(
			nt(E, ["inputValue"], (O) => {
				E.setState("value", O.inputValue);
			}),
			nt(E, ["value"], (O) => {
				E.setState("inputValue", O.value);
			}),
		),
	);
	let T = !1;
	const x = new Set();
	(n.focusLoop === void 0 && l?.focusLoop === void 0 && x.add("focusLoop"),
		n.focusWrap === void 0 && l?.focusWrap === void 0 && x.add("focusWrap"),
		n.compositeElementInFocusOrder === void 0 &&
			n.includesBaseElement === void 0 &&
			l?.compositeElementInFocusOrder === void 0 &&
			l?.includesBaseElement === void 0 &&
			x.add("compositeElementInFocusOrder"),
		n.resetValueOnSelect === void 0 && l?.resetValueOnSelect === void 0 && x.add("resetValueOnSelect"));
	let z = w.compositeElement === w.selectElement ? w.selectElement : null;
	const M = w.selectElement || w.compositeElement || w.disclosureElement;
	let A = w.anchorElement === M ? w.anchorElement : null;
	(yt(E, () =>
		nt(E, ["compositeElement", "selectElement"], (O) => {
			if (!(!O.selectElement && !z)) {
				if (O.compositeElement && O.compositeElement === O.selectElement) {
					z = O.selectElement;
					return;
				}
				if (O.compositeElement && O.compositeElement !== z) {
					z = null;
					return;
				}
				((z = O.selectElement), E.setState("compositeElement", z));
			}
		}),
	),
		yt(E, () =>
			nt(E, ["selectElement"], (O) => {
				if (!O.selectElement) return;
				const { focusLoop: L, focusWrap: H, compositeElementInFocusOrder: te, resetValueOnSelect: R } = E.getState();
				return (
					x.has("focusLoop") && h.setState("focusLoop", !1),
					x.has("focusWrap") && h.setState("focusWrap", !1),
					x.has("compositeElementInFocusOrder") && h.setState("compositeElementInFocusOrder", !1),
					x.has("resetValueOnSelect") && E.setState("resetValueOnSelect", !0),
					() => {
						const q = E.getState();
						(x.has("focusLoop") && !q.focusLoop && h.setState("focusLoop", L),
							x.has("focusWrap") && !q.focusWrap && h.setState("focusWrap", H),
							x.has("compositeElementInFocusOrder") &&
								!q.compositeElementInFocusOrder &&
								h.setState("compositeElementInFocusOrder", te),
							x.has("resetValueOnSelect") && q.resetValueOnSelect && E.setState("resetValueOnSelect", R));
					}
				);
			}),
		),
		yt(E, () =>
			nt(E, ["anchorElement", "compositeElement", "disclosureElement", "selectElement"], (O) => {
				if (O.anchorElement && O.anchorElement !== A) {
					A = null;
					return;
				}
				((A = O.selectElement || O.compositeElement || O.disclosureElement), E.setState("anchorElement", A));
			}),
		),
		yt(E, () =>
			nt(E, ["items", "selectedValue", "selectElement"], (O, L) => {
				if (b) {
					if (O.selectedValue !== L.selectedValue) {
						b = !1;
						return;
					}
					O.selectElement &&
						queueMicrotask(() => {
							if (!b) return;
							const H = E.getState();
							if (!H.selectElement) return;
							const te = H.items.find((R) => !R.disabled && R.value != null);
							te?.value != null && ((b = !1), E.setState("selectedValue", te.value));
						});
				}
			}),
		),
		Dq &&
			yt(E, () =>
				nt(E, ["virtualFocus"], () => {
					E.setState("virtualFocus", !1);
				}),
			),
		yt(E, () => {
			if (e)
				return en(
					nt(E, ["selectedValue"], (O) => {
						Array.isArray(O.selectedValue) && e.setValues(O.selectedValue);
					}),
					nt(e, ["values"], (O) => {
						E.setState("selectedValue", O.values);
					}),
				);
		}),
		yt(E, () =>
			nt(E, ["resetValueOnHide", "mounted"], (O) => {
				O.resetValueOnHide && (O.mounted || E.setState("inputValue", g));
			}),
		),
		yt(E, () =>
			nt(E, ["open"], (O) => {
				if (O.open) {
					T = !0;
					return;
				}
				((T = !1), E.setState("activeId", f), E.setState("moves", 0));
			}),
		),
		yt(E, () =>
			nt(E, ["moves", "activeId"], (O, L) => {
				(O.moves !== L.moves && (T = !1),
					O.activeId !== L.activeId && (T = !1),
					O.moves === L.moves && E.setState("activeValue", void 0));
			}),
		),
		yt(E, () =>
			pu(E, ["moves", "renderedItems"], (O, L) => {
				if (O.moves === L.moves) return;
				const { activeId: H } = E.getState(),
					te = h.item(H);
				E.setState("activeValue", te?.value);
			}),
		),
		yt(E, () =>
			nt(E, ["items", "mounted", "open", "selectedValue", "selectElement"], (O) => {
				if (!O.selectElement || (O.mounted && !T)) return;
				const L = Array.isArray(O.selectedValue) ? O.selectedValue : [O.selectedValue],
					H = L[L.length - 1];
				if (H == null) return;
				const te = O.items.find((R) => !R.disabled && R.value === H);
				te && ((T = !1), E.setState("activeId", te.id));
			}),
		),
		yt(E, () =>
			pu(E, ["selectOnMove", "moves"], (O) => {
				const { activeId: L, open: H, selectedValue: te, selectElement: R } = E.getState();
				if (!R || (!O.selectOnMove && H) || Array.isArray(te) || !O.moves || !L) return;
				const q = h.item(L);
				!q || q.disabled || q.value == null || E.setState("selectedValue", q.value);
			}),
		));
	const N = (O) => {
			E.setState("inputValue", O);
		},
		D = () => N(w.inputValue),
		k = (O, L) => {
			(x.delete(O),
				O === "includesBaseElement" && x.delete("compositeElementInFocusOrder"),
				O === "selectedValue" && (b = !1),
				E.setState(O, L));
		};
	return {
		...m,
		...h,
		...E,
		setState: k,
		tag: e,
		setInputValue: N,
		resetInputValue: D,
		setValue: N,
		resetValue: D,
		setSelectedValue: (O) => k("selectedValue", O),
		setInputElement: (O) => E.setState("inputElement", O),
		setLabelElement: (O) => E.setState("labelElement", O),
		setSelectElement: (O) => E.setState("selectElement", O),
		setSelectLabelElement: (O) => E.setState("selectLabelElement", O),
	};
}
function Iq(e) {
	const n = Mq();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), m3(e));
}
function jq(e, n, i) {
	rs(n, [i.tag, n]);
	const o = { inputValue: i.inputValue ?? i.value, setInputValue: i.setInputValue ?? i.setValue };
	return (
		Dt(e, o, "inputValue", "setInputValue"),
		Dt(e, i, "selectedValue", "setSelectedValue"),
		Dt(e, i, "selectOnMove"),
		Dt(e, i, "resetValueOnHide"),
		Dt(e, i, "resetValueOnSelect"),
		Object.assign(V1(K1(e, n, i), n, i), { tag: i.tag })
	);
}
function kq(e = {}) {
	e = Iq(e);
	const [n, i] = vf(zq, e);
	return jq(n, i, e);
}
var qq = ge.union(
		ge.literal("thumbs_up"),
		ge.literal("heart"),
		ge.literal("laugh"),
		ge.literal("wow"),
		ge.literal("sad"),
		ge.literal("party"),
		ge.literal("rocket"),
		ge.literal("eyes"),
	),
	r6 = ge.object({ fileNodeId: ge.string(), name: ge.string() }),
	i6 = ge.union(ge.literal("read"), ge.literal("write"), ge.literal("manage")),
	Lq = ge.object({ message: ge.string(), name: ge.optional(ge.string()) }),
	Uq = ge.union(
		ge.object({
			kind: ge.literal("message"),
			messageId: ge.id("messages"),
			revision: ge.number(),
			sequence: ge.number(),
		}),
		ge.object({ kind: ge.literal("channel"), channelId: ge.id("channels"), revision: ge.number() }),
		ge.object({ kind: ge.literal("reaction"), messageId: ge.id("messages"), token: qq, on: ge.boolean() }),
		ge.object({
			kind: ge.literal("membership"),
			channelId: ge.id("channels"),
			membershipRevision: ge.number(),
			left: ge.boolean(),
			deleted: ge.boolean(),
			pending: ge.boolean(),
		}),
	),
	a6 = ge.union(ge.object({ _yay: Uq }), ge.object({ _nay: Lq })),
	o6 = ge.union(
		ge.object({
			kind: ge.literal("block"),
			messageId: ge.id("messages"),
			rootSequence: ge.number(),
			replySequence: ge.number(),
			renderedBlock: ge.string(),
			sourceRevision: ge.number(),
		}),
		ge.object({ kind: ge.literal("header"), name: ge.string(), topic: ge.string(), isPrivate: ge.boolean() }),
		ge.object({ kind: ge.literal("archive"), archived: ge.boolean() }),
		ge.object({
			kind: ge.literal("readers"),
			readerRevision: ge.number(),
			readers: ge.array(ge.object({ userId: ge.string(), membershipLifetime: ge.number() })),
			deleted: ge.boolean(),
		}),
	),
	s6 = ge.union(
		ge.literal("auth_expired"),
		ge.literal("permission"),
		ge.literal("sponsor_gone"),
		ge.literal("conflict"),
		ge.literal("too_large"),
		ge.literal("temporary"),
	),
	u6 = ge.object({ failures: ge.number(), since: ge.number() });
function nC(e) {
	if (e.text.trim() === "" && e.attachments.length === 0) return "Enter a message or attach a file.";
	if (e.attachments.length > 20 || e.attachments.some((i) => !i.fileNodeId || !i.name))
		return "A message can attach up to 20 named files.";
	if (e.mentions.length > 50 || e.mentions.some((i) => !i)) return "A message can mention up to 50 people.";
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
var Vq = { text: "", attachments: [], mentions: [], pending: [] },
	ww = new WeakMap();
function Bq() {
	const e = new Map(),
		n = new Set();
	return {
		get: (i) => e.get(i) ?? Vq,
		subscribe: (i) => (
			n.add(i),
			() => {
				n.delete(i);
			}
		),
		set: (i, o) => {
			if (o.text.length > 16384) return "This draft is too long. Shorten it before adding more text.";
			if (o.mentions.length > 50) return "A message can mention up to 50 people.";
			const u = o.text !== "" || o.attachments.length > 0 || o.pending.length > 0;
			if (u && !e.has(i) && e.size >= 20) return "You have 20 saved drafts. Send or clear one before starting another.";
			if (
				o.pending.length > 5 ||
				[...e.entries()].reduce((l, [f, h]) => l + (f === i ? 0 : h.pending.length), o.pending.length) > 20
			)
				return "Retry or remove an unconfirmed message before sending another.";
			u ? e.set(i, o) : e.delete(i);
			for (const l of n) l();
			return null;
		},
	};
}
function rC(e, n) {
	let i = ww.get(e);
	i || ((i = Bq()), ww.set(e, i));
	const o = i;
	return {
		value: (0, _.useSyncExternalStore)(o.subscribe, () => o.get(n)),
		get: () => o.get(n),
		set: (u) => o.set(n, u),
	};
}
function iC(e) {
	const n = "rootMessageId" in e.target,
		i = 3112960 - (n ? 32768 : 0),
		o = e.enabled || e.retain,
		[u, l] = (0, _.useState)(null),
		f = Po(ze.messages.get, o && u ? { messageId: u._id } : "skip"),
		h = Po(ze.messages.latest_roots, o && "channelId" in e.target ? e.target : "skip"),
		m = Po(ze.messages.latest_replies, o && "rootMessageId" in e.target ? e.target : "skip"),
		g = n ? m : h,
		[p, b] = (0, _.useState)(null),
		y = (0, _.useRef)(0),
		w = (0, _.useRef)(new Map()),
		E = (0, _.useRef)({ head: null, rows: [] }),
		T = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		x = o && (g !== null || e.retain),
		z = (0, _.useMemo)(
			() =>
				Object.fromEntries(
					(x ? (p?.pages ?? []) : []).map((U) => [
						String(U.id),
						{
							query: n ? ze.messages.list_replies : ze.messages.list_roots,
							args: {
								...(n ? { rootMessageId: T } : { channelId: T }),
								anchorSequence: p.anchor,
								paginationOpts: { numItems: 50, cursor: U.cursor, ...(U.endCursor ? { endCursor: U.endCursor } : {}) },
							},
						},
					]),
				),
			[x, p, n, T],
		),
		M = rg(z),
		A = e.retain ? E.current.head : (g ?? null),
		N = g === null && !e.retain,
		D = new Set(p?.pages.map((U) => U.id));
	for (const U of w.current.keys()) (!D.has(U) || N || !o) && w.current.delete(U);
	const k =
			p?.pages.map((U) => {
				const ee = M[String(U.id)];
				return (
					e.enabled && g !== null && ee && !(ee instanceof Error) && w.current.set(U.id, ee),
					{ descriptor: U, result: ee ?? w.current.get(U.id) }
				);
			}) ?? [],
		O = k.find((U) => U.result instanceof Error)?.result,
		L = k.filter((U) => U.result !== void 0 && !(U.result instanceof Error)),
		H = p === null ? (A?.messages ?? []) : L.flatMap((U) => U.result.page),
		te = f === void 0 ? u : f,
		R =
			te &&
			("rootMessageId" in e.target ? te.rootMessageId === e.target.rootMessageId : te.rootMessageId === null) &&
			te.deletedAt === null &&
			!H.some((U) => U._id === te._id)
				? [...H, te].sort((U, ee) => ee.sequence - U.sequence)
				: H,
		q = e.retain ? E.current.rows : N ? [] : e.enabled ? R : [],
		P = new TextEncoder().encode(JSON.stringify({ rows: q, head: A })).byteLength,
		F = L.at(-1),
		Y = e.enabled && g !== null && (A === null || k.some((U) => M[String(U.descriptor.id)] === void 0));
	((0, _.useEffect)(() => {
		((!e.enabled && !e.retain) || N || (!e.retain && (f === null || f?.deletedAt != null))) && l(null);
	}, [e.enabled, e.retain, N, f]),
		(0, _.useEffect)(() => {
			!e.enabled && !e.retain
				? ((E.current = { head: null, rows: [] }), b(null))
				: e.enabled && (E.current = { head: A, rows: q });
		}, [e.enabled, e.retain, A, q]),
		(0, _.useEffect)(() => {
			if (!p || !e.enabled) return;
			const U = L.some(({ descriptor: ee, result: K }) => !ee.endCursor && !K.isDone);
			if (L.some(({ result: ee }) => ee.pageStatus === "SplitRequired")) {
				const ee = H[0]?.sequence ?? p.anchor;
				b({ anchor: ee, pages: [{ id: ++y.current, cursor: null }], newerAnchor: p.newerAnchor, extend: !1 });
			} else
				P > i && p.pages.length > 1
					? b({ ...p, pages: p.pages.slice(1), newerAnchor: H[0]?.sequence ?? p.anchor })
					: p.extend && F
						? b({
								...p,
								extend: !1,
								pages: F.result.isDone
									? p.pages
									: [
											...p.pages.map((ee) => ({ ...ee, endCursor: F.result.continueCursor })),
											{ id: ++y.current, cursor: F.result.continueCursor },
										],
							})
						: U &&
							b({
								...p,
								pages: p.pages.map((ee) => {
									const K = M[String(ee.id)];
									return !ee.endCursor && K && !(K instanceof Error) && !K.isDone
										? { ...ee, endCursor: K.continueCursor }
										: ee;
								}),
							});
		}, [p, e.enabled, M, P]));
	const B = () => b(null),
		ne = () => {
			if (!e.enabled || Y || !A) return;
			if (!p) {
				(A.messages.at(-1)?.sequence ?? 0) > 1 &&
					b({ anchor: A.sequence, pages: [{ id: ++y.current, cursor: null }], newerAnchor: A.sequence, extend: !0 });
				return;
			}
			if (!F || F.result.isDone) return;
			const U = [...p.pages, { id: ++y.current, cursor: F.result.continueCursor }],
				ee = n ? 2 : 5;
			b({ ...p, pages: U.slice(-ee), newerAnchor: U.length > ee ? (H[0]?.sequence ?? p.anchor) : p.newerAnchor });
		},
		re = () => {
			!p?.newerAnchor ||
				!e.enabled ||
				Y ||
				(p.newerAnchor >= (A?.sequence ?? 0)
					? B()
					: b({
							anchor: p.newerAnchor,
							pages: [{ id: ++y.current, cursor: null }],
							newerAnchor: Math.min(A?.sequence ?? p.newerAnchor, p.newerAnchor + 50),
							extend: !1,
						}));
		};
	return {
		rows: q,
		editingMessageId: u?._id ?? null,
		setEditingMessage: l,
		denied: N,
		loading: Y,
		error: N ? "Messages are unavailable. Your access may have changed." : O instanceof Error ? O.message : null,
		sequence: A?.sequence ?? 0,
		atLatest: p === null,
		hasOlder: p === null ? (A?.messages.at(-1)?.sequence ?? 0) > 1 : !!F && !F.result.isDone,
		hasNewer: p !== null,
		newCount: p ? Math.max(0, (A?.sequence ?? 0) - p.anchor) : 0,
		older: ne,
		newer: re,
		latest: B,
	};
}
var Ew = 128;
function Pq(e) {
	return new TextEncoder().encode(e).byteLength;
}
function $q(e) {
	if (e === null) return null;
	const n = e
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (n === "") return null;
	if (Pq(n) <= Ew) return n;
	const i = new TextEncoder().encode(n).slice(0, Ew);
	return new TextDecoder().decode(i).replace(/�$/, "");
}
function aC(e) {
	const n = vr(),
		i = Ma(ze.messages.send),
		o = Ma(ze.messages.reply),
		u = tE(ze.files.authorize_selection),
		l = (0, _.useRef)(new Set()),
		f = (0, _.useRef)(e.onRequestSettled);
	f.current = e.onRequestSettled;
	const [h, m] = (0, _.useState)(null),
		g = async (b) => {
			if (l.current.has(b.clientRequestId)) return;
			if (!n.ready || !n.can_request_now()) {
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((E) =>
							E.clientRequestId === b.clientRequestId
								? { ...E, status: "failed", error: "Chitchat is reconnecting. Retry when it is ready." }
								: E,
						),
				});
				return;
			}
			(l.current.add(b.clientRequestId),
				e.onRequestStart(),
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((E) =>
							E.clientRequestId === b.clientRequestId ? { ...E, status: "sending", error: null } : E,
						),
				}));
			const y = { clientRequestId: b.clientRequestId, text: b.text, attachments: b.attachments, mentions: b.mentions },
				w = () => (e.rootMessageId ? o({ ...y, rootMessageId: e.rootMessageId }) : i({ ...y, channelId: e.channelId }));
			try {
				let E = await w();
				if (E._nay?.message === "Check attachment access again before sending.") {
					const T = await u({
						pressToken: await e.client.getToken(),
						fileNodeIds: b.attachments.map((x) => x.fileNodeId),
					});
					if (T._nay) throw new Error(T._nay.message);
					if (b.attachments.some((x) => !T._yay.some((z) => z.fileNodeId === x.fileNodeId && z.name === x.name)))
						throw new Error("An attachment was renamed. Remove this pending send and select the file again.");
					if (!n.can_request_now()) throw new Error("Chitchat is reconnecting. Retry when it is ready.");
					E = await w();
				}
				if (E._nay) throw new Error(E._nay.message);
				e.draft.set({
					...e.draft.get(),
					pending: e.draft.get().pending.filter((T) => T.clientRequestId !== b.clientRequestId),
				});
			} catch (E) {
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((T) =>
							T.clientRequestId === b.clientRequestId ? { ...T, status: "failed", error: rf(E) } : T,
						),
				});
			} finally {
				(l.current.delete(b.clientRequestId), f.current());
			}
		};
	return {
		enqueue: (b, y, w) => {
			if (!e.canWrite || !n.canSend || !n.can_request_now())
				return (m("Chitchat is reconnecting or read-only. Your draft is kept."), !1);
			const E = nC({ text: b, attachments: y, mentions: w, authorName: $q(n.member?.displayName ?? null) });
			if (E) return (m(E), !1);
			const T = {
					clientRequestId: crypto.randomUUID(),
					text: b,
					attachments: y,
					mentions: w,
					status: "sending",
					error: null,
				},
				x = e.draft.set({
					...e.draft.get(),
					text: "",
					attachments: [],
					mentions: [],
					pending: [...e.draft.get().pending, T],
				});
			return x ? (m(x), !1) : (m(null), g(T), !0);
		},
		retry: (b) => void g(b),
		error: h,
		busy: e.draft.value.pending.some((b) => b.status === "sending"),
	};
}
function Hq(e) {
	const [n, i] = (0, _.useState)({}),
		[o, u] = (0, _.useState)(!1),
		[l, f] = (0, _.useState)(null),
		h = (0, _.useRef)(new Map()),
		m = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		m.current && (h.current.get(m.current)?.focus(), (m.current = null));
	}, [n]);
	const g = async (p) => {
		(u(!0), f(null), (m.current = p));
		try {
			const b = await e.client.fetchJson("/api/v1/files/download-urls", {
				fileNodeIds: e.attachments.map((w) => w.fileNodeId),
				download: !0,
			});
			if (b.status !== 200 || !b.body) throw new Error(b.body?.message ?? "The file links are unavailable.");
			i(Object.fromEntries(b.body.items.map((w) => [w.fileNodeId, { url: w.url, expiresAt: w.expiresAt }])));
			const y = b.body.errors.find((w) => w.fileNodeId === p);
			y && f(y.message);
		} catch (b) {
			f(rf(b));
		} finally {
			u(!1);
		}
	};
	return (0, S.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((p) =>
				(0, S.jsx)(
					"span",
					{
						className: "attachment",
						children: n[p.fileNodeId]
							? (0, S.jsxs)(S.Fragment, {
									children: [
										(0, S.jsx)("a", {
											ref: (b) => {
												b ? h.current.set(p.fileNodeId, b) : h.current.delete(p.fileNodeId);
											},
											className: "attachment-link",
											href: n[p.fileNodeId].url,
											download: p.name,
											rel: "noreferrer",
											onClick: (b) => {
												n[p.fileNodeId].expiresAt <= Date.now() &&
													(b.preventDefault(), f("This download link expired. Use Refresh link to try again."));
											},
											children: p.name,
										}),
										(0, S.jsx)("button", {
											type: "button",
											className: "attachment-button",
											disabled: o,
											onClick: () => void g(p.fileNodeId),
											children: "Refresh link",
										}),
									],
								})
							: (0, S.jsx)("button", {
									type: "button",
									className: "attachment-button",
									disabled: o,
									onClick: () => void g(p.fileNodeId),
									children: o ? `Getting link for ${p.name}…` : p.name,
								}),
					},
					p.fileNodeId,
				),
			),
			l ? (0, S.jsx)("span", { className: "attachment-error", role: "alert", children: l }) : null,
		],
	});
}
function Zq(e) {
	const n = (0, _.useId)(),
		[i, o] = (0, _.useState)([]),
		[u, l] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(null),
		[m, g] = (0, _.useState)(!1),
		[p, b] = (0, _.useState)(!0),
		[y, w] = (0, _.useState)(null),
		[E, T] = (0, _.useState)(0);
	return (
		(0, _.useEffect)(() => {
			let x = !1;
			return (
				b(!0),
				w(null),
				o([]),
				e.client
					.fetchJson("/api/v1/files/list", {
						path: "/",
						recursive: !0,
						kind: "file",
						limit: 100,
						scanLimit: 1e4,
						contentTypePrefixes: ["image/", "video/", "audio/", "application/", "text/"],
						cursor: u,
					})
					.then((z) => {
						if (!x) {
							if (z.status !== 200) {
								w(z.body?.message ?? "Files could not be loaded.");
								return;
							}
							if (!z.body) {
								w("Files could not be loaded.");
								return;
							}
							(o(z.body.items), h(z.body.cursor), g(z.body.isDone));
						}
					})
					.catch((z) => {
						x || w(rf(z));
					})
					.finally(() => {
						x || b(!1);
					}),
				() => {
					x = !0;
				}
			);
		}, [e.client, u, E]),
		(0, S.jsxs)(Wo, {
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
				(0, S.jsx)("ul", {
					className: "picker-list",
					children: i.map((x) =>
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
				}),
				p ? (0, S.jsx)("p", { role: "status", children: "Loading files…" }) : null,
				y
					? (0, S.jsxs)("p", {
							role: "alert",
							children: [y, " ", (0, S.jsx)("button", { type: "button", onClick: () => T(E + 1), children: "Retry" })],
						})
					: null,
				!p && !y && i.length === 0
					? (0, S.jsx)("p", { children: m ? "No files found." : "No matching files on this page." })
					: null,
				u !== null
					? (0, S.jsx)("button", {
							type: "button",
							className: "button",
							disabled: p,
							onClick: () => l(null),
							children: "First page",
						})
					: null,
				m
					? null
					: (0, S.jsx)("button", {
							type: "button",
							className: "button",
							disabled: p || !!y,
							onClick: () => l(f),
							children: "Next files",
						}),
			],
		})
	);
}
function oC(e) {
	const n = (0, _.useId)(),
		i = (0, _.useId)(),
		o = vr(),
		[u, l] = (0, _.useState)(!1),
		[f, h] = (0, _.useState)(null),
		[m, g] = (0, _.useState)(null),
		[p, b] = (0, _.useState)(null),
		y = pt(o, ze.members.list, m !== null ? { paginationOpts: { numItems: 100, cursor: p } } : "skip"),
		w = e.draft.value.text,
		E = (0, _.useRef)(null),
		T = (0, _.useRef)(null),
		x = kq({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (O) => {
				O || g(null);
			},
		}),
		z = m && y ? uR(y.page, m.query, e.userId).slice(0, 8) : [],
		M = m !== null && (o.ready || o.refreshing),
		A = (O) => h(e.draft.set({ ...e.draft.get(), ...O })),
		N = (O) => {
			if (!m) return;
			const L = lR(w, m.start, E.current?.selectionStart ?? w.length, O.label),
				H = new Map(e.draft.value.mentions);
			(H.set(O.userId, O.label), A({ text: L.text, mentions: [...H] }), (T.current = L.caret), x.hide());
		},
		D = () => {
			if (e.busy || e.disabled) return;
			const O = w.trim();
			(!O && e.draft.value.attachments.length === 0) ||
				(e.onSend(O, e.draft.value.attachments, cR(e.draft.value.mentions, O)) && x.hide());
		},
		k = (O) => {
			if (!(O.nativeEvent.isComposing || O.keyCode === 229)) {
				if (M) {
					if (O.key === "ArrowLeft" || O.key === "ArrowRight") {
						x.hide();
						return;
					}
					if (O.key === "Escape") {
						(O.preventDefault(), O.stopPropagation(), x.hide());
						return;
					}
					if ((O.key === "Enter" || O.key === "Tab") && !O.shiftKey && z.length) {
						(O.preventDefault(), N(z.find((L) => `${i}-${L.userId}` === x.getState().activeId) ?? z[0]));
						return;
					}
				}
				O.key === "Enter" && !O.shiftKey && (O.preventDefault(), D());
			}
		};
	return (
		(0, _.useLayoutEffect)(() => {
			x.setOpen(M);
		}, [x, M]),
		(0, _.useLayoutEffect)(() => {
			T.current !== null &&
				E.current &&
				(E.current.focus(), E.current.setSelectionRange(T.current, T.current), (T.current = null));
		}, [w]),
		(0, S.jsxs)("div", {
			className: "composer",
			inert: e.inert || void 0,
			children: [
				e.draft.value.attachments.length
					? (0, S.jsx)("ul", {
							className: "composer-attachments",
							children: e.draft.value.attachments.map((O) =>
								(0, S.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, S.jsx)("span", { children: O.name }),
											(0, S.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${O.name}`,
												onClick: () =>
													A({ attachments: e.draft.value.attachments.filter((L) => L.fileNodeId !== O.fileNodeId) }),
												children: "×",
											}),
										],
									},
									O.fileNodeId,
								),
							),
						})
					: null,
				(0, S.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, S.jsx)(Sq, {
							store: x,
							autoSelect: !0,
							value: w,
							showOnClick: !1,
							showOnChange: !1,
							showOnKeyPress: !1,
							setValueOnChange: !1,
							render: (0, S.jsx)("textarea", {
								ref: E,
								className: "composer-input",
								"aria-label": e.label,
								"aria-describedby": n,
								placeholder: e.label,
								rows: 1,
								onChange: (O) => {
									const L = O.currentTarget.value;
									A({ text: L });
									const H = sR(L, O.currentTarget.selectionStart);
									(g(H), x.setValue(H?.query ?? ""));
								},
								onKeyDown: k,
								onPointerDown: x.hide,
								onScroll: x.render,
							}),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled || e.draft.value.attachments.length >= 20,
							onClick: () => l(!0),
							children: (0, S.jsx)(cq, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: D,
							children: (0, S.jsx)(oq, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(Nq, {
					store: x,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !M,
					getAnchorRect: () => E.current?.getBoundingClientRect() ?? null,
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						y ? null : (0, S.jsx)("div", { role: "status", children: "Loading people…" }),
						y && z.length === 0 ? (0, S.jsx)("div", { role: "status", children: "No match on this page." }) : null,
						z.map((O) =>
							(0, S.jsx)(
								Tq,
								{
									id: `${i}-${O.userId}`,
									value: O.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (L) => L.preventDefault(),
									onClick: () => N(O),
									children: O.label,
								},
								O.userId,
							),
						),
						p !== null
							? (0, S.jsx)("button", { type: "button", onClick: () => b(null), children: "First people" })
							: null,
						y && !y.isDone
							? (0, S.jsx)("button", { type: "button", onClick: () => b(y.continueCursor), children: "Next people" })
							: null,
					],
				}),
				(0, S.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: f }) : null,
				u
					? (0, S.jsx)(Zq, {
							client: e.client,
							onClose: () => l(!1),
							onPick: (O) => {
								(e.draft.value.attachments.some((L) => L.fileNodeId === O.fileNodeId) ||
									A({ attachments: [...e.draft.value.attachments, O] }),
									l(!1));
							},
						})
					: null,
			],
		})
	);
}
function Fq(e) {
	const [n, i] = (0, _.useState)(!1),
		o = (0, _.useRef)(null),
		u = (0, _.useRef)([]);
	(0, _.useEffect)(() => {
		n && u.current[0]?.focus();
	}, [n]);
	const l = () => {
		(i(!1), o.current?.focus());
	};
	return (0, S.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, S.jsx)("button", {
				ref: o,
				type: "button",
				className: "button message-action",
				disabled: e.disabled,
				"aria-expanded": n,
				onClick: () => (n ? l() : i(!0)),
				children: "Add reaction",
			}),
			n
				? (0, S.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: aR.map((f, h) => {
							const m = e.groups.some((g) => g.token === f && g.reactedByMe);
							return (0, S.jsx)(
								"button",
								{
									ref: (g) => {
										u.current[h] = g;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": m,
									"aria-label": aE[f],
									onKeyDown: (g) => {
										g.key === "Escape"
											? (g.preventDefault(), g.stopPropagation(), l())
											: ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(g.key) &&
												(g.preventDefault(),
												u.current[(h + (["ArrowRight", "ArrowDown"].includes(g.key) ? 1 : 7)) % 8]?.focus());
									},
									onClick: () => {
										(e.onPick(f, m), l());
									},
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: iE[f] }),
								},
								f,
							);
						}),
					})
				: null,
		],
	});
}
var sC = 864e5;
function Wm(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function Qq(e) {
	const n = new Date(e).toDateString();
	return n === new Date().toDateString()
		? "Today"
		: n === new Date(Date.now() - sC).toDateString()
			? "Yesterday"
			: Wm(e);
}
function Yq(e) {
	const n = e?.trim().split(/\s+/u);
	return n?.[0] ? `${n[0][0]}${n.length > 1 ? n.at(-1)[0] : ""}`.toUpperCase() : "•";
}
function Kq(e, n, i) {
	const o = e.mentions
			.map((f) => ({ id: f, name: n.get(f) }))
			.filter((f) => typeof f.name == "string" && f.name !== "")
			.sort((f, h) => h.name.length - f.name.length),
		u = [];
	let l = e.text;
	for (; l;) {
		const f = o
			.map((h) => ({ ...h, at: l.indexOf(`@${h.name}`) }))
			.filter((h) => h.at >= 0)
			.sort((h, m) => h.at - m.at)[0];
		if (!f) {
			u.push(l);
			break;
		}
		(f.at && u.push(l.slice(0, f.at)), u.push(f), (l = l.slice(f.at + f.name.length + 1)));
	}
	return u.map((f, h) =>
		typeof f == "string"
			? f
			: (0, S.jsxs)("span", { className: f.id === i ? "mention mention-self" : "mention", children: ["@", f.name] }, h),
	);
}
function uC(e) {
	const { doc: n } = e,
		i = vr(),
		o = pt(i, ze.reactions.get_for_message, { messageId: n._id }),
		u = pt(i, ze.threads.get_summary, e.onOpenThread ? { rootMessageId: n._id } : "skip"),
		l = Ma(ze.messages.edit),
		f = Ma(ze.messages.remove),
		h = Ma(ze.reactions.set),
		[m, g] = (0, _.useState)(!1),
		[p, b] = (0, _.useState)(""),
		y = (0, _.useRef)(null),
		[w, E] = (0, _.useState)(!1),
		[T, x] = (0, _.useState)(!1),
		[z, M] = (0, _.useState)(null),
		[A, N] = (0, _.useState)(!1),
		D = (0, _.useRef)(null),
		k = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		L = (0, _.useRef)(null),
		H = (0, _.useId)(),
		te = n.deletedAt !== null,
		R = e.canWrite && i.canSend;
	((0, _.useEffect)(() => {
		m && k.current?.focus();
	}, [m]),
		(0, _.useEffect)(() => {
			if (te) {
				const U = O.current?.contains(document.activeElement);
				(g(!1), b(""), (y.current = null), m && e.onEditingChange?.(null), E(!1), U && O.current?.focus());
			}
		}, [te]));
	const q = async () => {
			if (!(T || !D.current || !i.can_request_now())) {
				(x(!0), M(null), e.onRequestStart());
				try {
					const U = await D.current();
					if (U._nay) {
						(M(U._nay.message), (D.current = null), N(!1));
						return;
					}
					((D.current = null),
						N(!1),
						g(!1),
						b(""),
						(y.current = null),
						m && e.onEditingChange?.(null),
						E(!1),
						queueMicrotask(() => (te ? O.current : L.current)?.focus()));
				} catch (U) {
					(M(rf(U)), N(!0));
				} finally {
					(x(!1), e.onRequestSettled());
				}
			}
		},
		P = () => {
			if (!(!R && !D.current)) {
				if (!D.current) {
					const U = y.current,
						ee = U.mentions.filter((xe) => {
							const ve = e.memberNames.get(xe);
							return !!ve && p.includes(`@${ve}`);
						}),
						K = nC({ ...n, text: p.trim(), mentions: ee });
					if (K) {
						M(K);
						return;
					}
					const ue = {
						messageId: n._id,
						clientRequestId: crypto.randomUUID(),
						expectedRevision: U.revision,
						text: p.trim(),
						mentions: ee,
					};
					D.current = () => l(ue);
				}
				q();
			}
		},
		F = () => {
			if (!(!R && !D.current)) {
				if (!D.current) {
					const U = { messageId: n._id, clientRequestId: crypto.randomUUID(), expectedRevision: n.revision };
					D.current = () => f(U);
				}
				q();
			}
		},
		Y = (U, ee) => {
			if (!R || T || D.current || !i.can_request_now()) return;
			const K = { messageId: n._id, clientRequestId: crypto.randomUUID(), token: U, on: !ee };
			((D.current = () => h(K)), q());
		},
		B = () => {
			T ||
				((D.current = null),
				N(!1),
				g(!1),
				b(""),
				(y.current = null),
				m && e.onEditingChange?.(null),
				E(!1),
				M(null),
				queueMicrotask(() => L.current?.focus()));
		},
		ne = e.memberNames.get(n.authorHostUserId),
		re = Date.now() - n.createdAt < 7 * sC;
	return (0, S.jsxs)("li", {
		ref: O,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: Yq(ne) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: ne === null ? "Former member" : (ne ?? "…") }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(n.createdAt).toISOString(),
						children: [
							re ? (0, S.jsxs)("span", { className: "visually-hidden", children: [Wm(n.createdAt), " "] }) : null,
							(0, S.jsx)("span", {
								className: "message-clock",
								children: re
									? new Date(n.createdAt).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
									: Wm(n.createdAt),
							}),
						],
					}),
				],
			}),
			te
				? (0, S.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: m
					? (0, S.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, S.jsx)("textarea", {
									ref: k,
									className: "composer-input",
									"aria-label": "Edit message",
									value: p,
									readOnly: T || A,
									onChange: (U) => b(U.currentTarget.value),
									onKeyDown: (U) => {
										U.nativeEvent.isComposing ||
											U.keyCode === 229 ||
											(U.key === "Escape"
												? (U.preventDefault(), U.stopPropagation(), B())
												: U.key === "Enter" && !U.shiftKey && (U.preventDefault(), P()));
									},
								}),
								(0, S.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: T,
											onClick: B,
											children: "Cancel",
										}),
										(0, S.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: T || (!R && !A),
											onClick: P,
											children: T ? "Saving…" : A ? "Retry" : "Save",
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
										Kq(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, S.jsx)(Hq, { client: e.client, attachments: n.attachments }) : null,
								o?.length
									? (0, S.jsx)("div", {
											className: "message-reactions",
											children: o.map((U) =>
												(0, S.jsxs)(
													"button",
													{
														type: "button",
														disabled: !R || T,
														className: U.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": U.reactedByMe,
														"aria-label": `${aE[U.token]}, ${U.count} ${U.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => Y(U.token, U.reactedByMe),
														children: [
															(0, S.jsx)("span", { "aria-hidden": "true", children: iE[U.token] }),
															(0, S.jsx)("span", { className: "reaction-chip-count", children: U.count }),
														],
													},
													U.token,
												),
											),
										})
									: null,
							],
						}),
			e.onOpenThread && (u?.totalReplyCount ?? 0) > 0
				? (0, S.jsxs)("button", {
						ref: e.replyTriggerRef,
						type: "button",
						className: "message-thread-summary",
						disabled: e.threadDisabled,
						onClick: () => e.onOpenThread?.(n._id),
						children: [
							(0, S.jsx)("span", { className: "message-thread-summary-icon", "aria-hidden": "true", children: "↳" }),
							(0, S.jsxs)("span", {
								className: "message-thread-summary-count",
								children: [u.totalReplyCount, " ", u.totalReplyCount === 1 ? "reply" : "replies"],
							}),
							u?.latestReplyAt
								? (0, S.jsxs)("span", {
										className: "message-thread-summary-recency",
										children: ["Last reply ", nf(u.latestReplyAt, Date.now())],
									})
								: null,
						],
					})
				: null,
			!te && !m
				? (0, S.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread && !u?.totalReplyCount
								? (0, S.jsx)("button", {
										ref: e.replyTriggerRef,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(n._id),
										children: u === void 0 ? "View thread" : "Reply in thread",
									})
								: null,
							(0, S.jsx)(Fq, { groups: o ?? [], disabled: !R || T, onPick: Y }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												ref: L,
												type: "button",
												className: "button message-action",
												disabled: T || A || (e.editingMessageId != null && e.editingMessageId !== n._id),
												onClick: () => {
													((y.current = { revision: n.revision, mentions: n.mentions }),
														b(n.text),
														g(!0),
														e.onEditingChange?.(n),
														M(null));
												},
												children: "Edit",
											}),
											(0, S.jsx)("button", {
												type: "button",
												className: "button message-action button-danger",
												disabled: T || A,
												onClick: () => E(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			z && !w
				? (0, S.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							z,
							A && !m
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												type: "button",
												className: "button",
												disabled: T || !i.ready,
												onClick: () => void q(),
												children: "Retry change",
											}),
											(0, S.jsx)("button", {
												type: "button",
												className: "button",
												disabled: T,
												onClick: B,
												children: "Dismiss",
											}),
										],
									})
								: null,
						],
					})
				: null,
			w
				? (0, S.jsxs)(Wo, {
						labelledBy: H,
						onClose: B,
						children: [
							(0, S.jsx)("h2", { id: H, className: "dialog-title", children: "Delete message?" }),
							(0, S.jsx)("p", { children: "The message is replaced by a “Message deleted” placeholder for everyone." }),
							z ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: z }) : null,
							(0, S.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, S.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: T,
										onClick: B,
										children: "Cancel",
									}),
									(0, S.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: T || (!R && !A),
										onClick: F,
										children: T ? "Deleting…" : A ? "Retry delete" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function lC(e) {
	return (0, S.jsx)(S.Fragment, {
		children: e.draft.value.pending.map((n) =>
			(0, S.jsxs)(
				"li",
				{
					className: n.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending",
					children: [
						(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: "•" }),
						(0, S.jsxs)("div", {
							className: "message-head",
							children: [
								(0, S.jsx)("span", { className: "message-author", children: "You" }),
								(0, S.jsx)("span", {
									className: "message-time",
									children: n.status === "sending" ? "Sending…" : "Not confirmed",
								}),
							],
						}),
						(0, S.jsx)("p", { className: "message-text", children: n.text }),
						n.attachments.length
							? (0, S.jsx)("p", { className: "message-text", children: n.attachments.map((i) => i.name).join(", ") })
							: null,
						n.status === "failed"
							? (0, S.jsxs)("div", {
									className: "message-send-error",
									role: "alert",
									children: [
										(0, S.jsx)("span", { children: n.error }),
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: e.disabled || e.queue.busy,
											onClick: () => e.queue.retry(n),
											children: "Retry sending message",
										}),
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											onClick: () =>
												e.draft.set({
													...e.draft.get(),
													pending: e.draft.get().pending.filter((i) => i.clientRequestId !== n.clientRequestId),
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
function cC(e) {
	return (0, S.jsxs)("div", {
		className: "log-older",
		children: [
			e.window.hasOlder
				? (0, S.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.disabled || e.window.loading,
						onClick: e.window.older,
						children: "Load older",
					})
				: null,
			e.window.hasNewer
				? (0, S.jsxs)(S.Fragment, {
						children: [
							(0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: e.disabled || e.window.loading,
								onClick: e.window.newer,
								children: "Newer messages",
							}),
							(0, S.jsxs)("button", {
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
				? (0, S.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							e.window.error,
							(0, S.jsx)("button", { type: "button", onClick: e.window.latest, children: "Reload messages" }),
						],
					})
				: null,
		],
	});
}
function fC(e) {
	const n = [...e.rows].reverse();
	let i = !1;
	return (0, S.jsx)(S.Fragment, {
		children: n.map((o, u) => {
			const l = n[u - 1],
				f = l && new Date(l.createdAt).toDateString() !== new Date(o.createdAt).toDateString(),
				h =
					!i &&
					e.readSequence !== void 0 &&
					o.sequence > e.readSequence &&
					o.authorHostUserId !== e.userId &&
					o.deletedAt === null;
			h && (i = !0);
			const m = !!l && !f && !h && l.authorHostUserId === o.authorHostUserId && o.createdAt - l.createdAt <= 3e5;
			return (0, S.jsx)(
				Gq,
				{
					...e,
					doc: o,
					isContinuation: m,
					newDay: f ? Qq(o.createdAt) : null,
					newMark: h,
					replyTriggerRef: e.setReplyTrigger ? (g) => e.setReplyTrigger?.(o._id, g) : void 0,
				},
				o._id,
			);
		}),
	});
}
function Gq(e) {
	return (0, S.jsxs)(S.Fragment, {
		children: [
			e.newDay ? (0, S.jsx)("li", { className: "day-divider", children: e.newDay }) : null,
			e.newMark
				? (0, S.jsx)("li", {
						className: "new-divider",
						children: (0, S.jsx)("span", { className: "new-divider-label", children: "New messages" }),
					})
				: null,
			(0, S.jsx)(uC, { ...e }),
		],
	});
}
function Xq(e) {
	const n = vr(),
		i = n.ready && e.channel !== null,
		o = pt(n, ze.messages.get, i || n.refreshing ? { messageId: e.rootMessageId } : "skip"),
		u = iC({ target: { rootMessageId: e.rootMessageId }, enabled: i && o !== null, retain: n.refreshing }),
		l = rC(e.client, `${e.userId}:${e.channelId}:${e.rootMessageId}`),
		f = aC({
			...e,
			rootMessageId: e.rootMessageId,
			draft: l,
			canWrite: e.canWrite && !u.denied && e.channel?.archivedAt === null,
		}),
		h = (0, _.useRef)(null),
		m = (0, _.useRef)(null),
		g = (0, _.useRef)(!0),
		p = (0, _.useRef)(null),
		[b, y] = (0, _.useState)(0);
	return (
		(0, _.useEffect)(() => {
			h.current?.focus();
		}, []),
		(0, _.useEffect)(() => {
			const w = o ? [o, ...u.rows] : u.rows,
				E = [...new Set(w.map((x) => x.authorHostUserId))],
				T = [...new Set([...E, ...w.flatMap((x) => x.mentions)])];
			T.length && e.memberNames.resolve(T, E);
		}, [u.rows, o, e.memberNames]),
		(0, _.useLayoutEffect)(() => {
			if (m.current) {
				if (g.current && u.atLatest) ((m.current.scrollTop = m.current.scrollHeight), y(u.sequence));
				else if (p.current) {
					const w = [...m.current.querySelectorAll("[data-key]")].find((E) => E.dataset.key === p.current.id);
					w && (m.current.scrollTop += w.getBoundingClientRect().top - p.current.top);
				}
			}
		}, [u.rows, u.atLatest, u.sequence]),
		(0, _.useEffect)(() => {
			const w = () => {
				i &&
					o &&
					!u.denied &&
					u.atLatest &&
					g.current &&
					document.visibilityState === "visible" &&
					b === u.sequence &&
					e.onObservedThreadRead({ rootMessageId: e.rootMessageId, replySequence: b });
			};
			return (
				w(),
				document.addEventListener("visibilitychange", w),
				() => document.removeEventListener("visibilitychange", w)
			);
		}, [i, o, u.denied, u.atLatest, b, u.sequence, e.rootMessageId, e.onObservedThreadRead]),
		(0, S.jsxs)("section", {
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
				o
					? (0, S.jsx)("ul", {
							className: "message-list thread-root",
							children: (0, S.jsx)(uC, {
								...e,
								doc: o,
								isContinuation: !1,
								editingMessageId: u.editingMessageId,
								onEditingChange: u.setEditingMessage,
							}),
						})
					: (0, S.jsx)("p", {
							className: "channel-status",
							children: i && o === void 0 ? "Loading thread…" : "This thread is unavailable.",
						}),
				(0, S.jsxs)("div", {
					ref: m,
					className: "thread-replies",
					onScroll: () => {
						const w = m.current;
						if (!w) return;
						((g.current = w.scrollHeight - w.scrollTop - w.clientHeight < 80),
							g.current && u.atLatest && y(u.sequence));
						const E = [...w.querySelectorAll("[data-key]")].find(
							(T) => T.getBoundingClientRect().bottom >= w.getBoundingClientRect().top,
						);
						p.current = E ? { id: E.dataset.key, top: E.getBoundingClientRect().top } : null;
					},
					children: [
						(0, S.jsx)(cC, { window: u, disabled: e.sendInFlight || !i }),
						u.loading
							? (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading replies…" })
							: null,
						i && !u.denied && !u.loading && !u.rows.length
							? (0, S.jsx)("p", { className: "channel-status", children: "No replies yet" })
							: null,
						(0, S.jsxs)("ul", {
							className: "message-list",
							children: [
								(0, S.jsx)(fC, {
									...e,
									rows: u.rows,
									editingMessageId: u.editingMessageId,
									onEditingChange: u.setEditingMessage,
								}),
								(0, S.jsx)(lC, { draft: l, queue: f, disabled: !n.ready || !n.can_request_now() }),
							],
						}),
					],
				}),
				f.error ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
				(0, S.jsx)(oC, {
					client: e.client,
					userId: e.userId,
					draft: l,
					label: "Reply in thread",
					busy: f.busy,
					disabled: !i || !o || u.denied || !e.canWrite || !n.canSend || e.channel?.archivedAt !== null,
					onSend: f.enqueue,
				}),
			],
		})
	);
}
var Jq = 420,
	tu = 244,
	xm = 340;
function Wq(e) {
	return (0, S.jsx)(eL, { ...e }, `${e.userId}:${e.channelId}`);
}
function eL(e) {
	const n = vr(),
		i = n.ready && e.channel !== null,
		o = e.isNarrow && e.threadRootId !== null,
		u = iC({ target: { channelId: e.channelId }, enabled: i, retain: n.refreshing }),
		l = rC(e.client, `${e.userId}:${e.channelId}`),
		f = aC({
			...e,
			rootMessageId: null,
			draft: l,
			canWrite: e.canWrite && !u.denied && e.channel?.archivedAt === null,
		}),
		h = (0, _.useRef)(null),
		m = (0, _.useRef)(null),
		g = (0, _.useRef)(new Map()),
		p = (0, _.useRef)(!0),
		b = (0, _.useRef)(null),
		y = (0, _.useRef)(null),
		[w, E] = (0, _.useState)(0),
		[T, x] = (0, _.useState)(xm),
		[z, M] = (0, _.useState)(0),
		A = Math.max(tu, w - Jq),
		N = Math.min(A, Math.max(tu, T));
	((0, _.useEffect)(() => {
		if (!e.threadRootId || !h.current) return;
		const k = h.current;
		E(k.clientWidth);
		const O = new ResizeObserver(() => E(k.clientWidth));
		return (O.observe(k), () => O.disconnect());
	}, [e.threadRootId]),
		(0, _.useEffect)(() => {
			const k = [...new Set(u.rows.map((L) => L.authorHostUserId))],
				O = [...new Set([...k, ...u.rows.flatMap((L) => L.mentions)])];
			O.length && e.memberNames.resolve(O, k);
		}, [u.rows, e.memberNames]),
		(0, _.useLayoutEffect)(() => {
			if (!(!m.current || o)) {
				if (p.current && u.atLatest) ((m.current.scrollTop = m.current.scrollHeight), M(u.sequence));
				else if (b.current) {
					const k = [...m.current.querySelectorAll("[data-key]")].find((O) => O.dataset.key === b.current.id);
					k && (m.current.scrollTop += k.getBoundingClientRect().top - b.current.top);
				}
			}
		}, [u.rows, u.atLatest, u.sequence, o]),
		(0, _.useEffect)(() => {
			(y.current !== null && u.sequence > y.current && u.atLatest && e.announce("New messages in this channel."),
				(y.current = u.sequence));
		}, [u.sequence, u.atLatest, e.announce]),
		(0, _.useEffect)(() => {
			const k = () => {
				i &&
					!o &&
					!u.denied &&
					u.atLatest &&
					p.current &&
					document.visibilityState === "visible" &&
					z === u.sequence &&
					e.onObservedRead({ rootSequence: z });
			};
			return (
				k(),
				document.addEventListener("visibilitychange", k),
				() => document.removeEventListener("visibilitychange", k)
			);
		}, [i, u.atLatest, z, u.sequence, o, u.denied, e.onObservedRead]));
	const D = () => {
		if (e.sendInFlight) return;
		const k = e.threadRootId;
		(e.setThreadRootId(null), k && queueMicrotask(() => (g.current.get(k) ?? m.current)?.focus()));
	};
	return (0, S.jsxs)("div", {
		className: "channel",
		children: [
			(0, S.jsxs)("header", {
				className: "channel-head",
				inert: o || void 0,
				children: [
					(0, S.jsxs)("div", {
						className: "channel-head-main",
						children: [
							(0, S.jsx)("h2", {
								className: "channel-title",
								children: e.channel ? `#${e.channel.name}` : "Channel unavailable",
							}),
							e.channel?.topic ? (0, S.jsx)("p", { className: "channel-topic", children: e.channel.topic }) : null,
							e.channel?.visibility === "private"
								? (0, S.jsx)("p", { className: "channel-privacy", children: ig })
								: null,
						],
					}),
					e.channel?.archivedAt
						? (0, S.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
						: null,
				],
			}),
			(0, S.jsxs)("div", {
				ref: h,
				className: "channel-body",
				style: { "--thread-width": `${N}px` },
				children: [
					(0, S.jsxs)("div", {
						ref: m,
						className: "message-log",
						inert: o || void 0,
						role: "log",
						tabIndex: 0,
						"aria-live": "off",
						"aria-label": e.channel ? `Messages in #${e.channel.name}` : "Messages",
						onScroll: () => {
							const k = m.current;
							if (!k) return;
							((p.current = k.scrollHeight - k.scrollTop - k.clientHeight < 80),
								p.current && u.atLatest && M(u.sequence));
							const O = [...k.querySelectorAll("[data-key]")].find(
								(L) => L.getBoundingClientRect().bottom >= k.getBoundingClientRect().top,
							);
							b.current = O ? { id: O.dataset.key, top: O.getBoundingClientRect().top } : null;
						},
						children: [
							!i && !n.refreshing
								? (0, S.jsx)("p", {
										className: "channel-status",
										role: "status",
										children: "Messages are hidden until Chitchat can confirm your access. Your draft is kept.",
									})
								: null,
							(0, S.jsx)(cC, { window: u, disabled: e.sendInFlight || !i }),
							u.loading
								? (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading messages…" })
								: null,
							i && !u.denied && !u.loading && !u.rows.length && !l.value.pending.length
								? (0, S.jsx)("p", { className: "channel-status", children: "No messages yet" })
								: null,
							(0, S.jsxs)("ul", {
								className: "message-list",
								children: [
									(0, S.jsx)(fC, {
										...e,
										rows: u.rows,
										editingMessageId: u.editingMessageId,
										onEditingChange: u.setEditingMessage,
										readSequence: e.openedAtReadSequence,
										onOpenThread: (k) => {
											e.sendInFlight || e.setThreadRootId(k);
										},
										threadDisabled: e.sendInFlight,
										setReplyTrigger: (k, O) => {
											O ? g.current.set(k, O) : g.current.delete(k);
										},
									}),
									(0, S.jsx)(lC, { draft: l, queue: f, disabled: !n.ready || !n.can_request_now() }),
								],
							}),
						],
					}),
					e.threadRootId
						? (0, S.jsxs)(S.Fragment, {
								children: [
									(0, S.jsx)("div", {
										className: "thread-resize",
										inert: o || void 0,
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": N,
										"aria-valuemin": tu,
										"aria-valuemax": A,
										onKeyDown: (k) => {
											["ArrowLeft", "ArrowRight", "Home"].includes(k.key) &&
												(k.preventDefault(),
												x(Math.min(A, Math.max(tu, k.key === "Home" ? xm : N + (k.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (k) => {
											(k.preventDefault(), k.currentTarget.setPointerCapture(k.pointerId));
										},
										onPointerMove: (k) => {
											k.currentTarget.hasPointerCapture(k.pointerId) &&
												h.current &&
												x(Math.min(A, Math.max(tu, h.current.getBoundingClientRect().right - k.clientX)));
										},
										onDoubleClick: () => x(xm),
									}),
									(0, S.jsx)(Xq, { ...e, rootMessageId: e.threadRootId, onClose: D }, e.threadRootId),
								],
							})
						: null,
				],
			}),
			e.sendInFlight
				? (0, S.jsx)("p", {
						className: "channel-status",
						role: "status",
						children: "Wait for pending message changes to finish before leaving this channel or thread.",
					})
				: null,
			f.error ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
			(0, S.jsx)(oC, {
				client: e.client,
				userId: e.userId,
				draft: l,
				label: e.channel ? `Message #${e.channel.name}` : "Message draft",
				busy: f.busy,
				disabled: !i || u.denied || !e.canWrite || !n.canSend || !e.online || e.channel?.archivedAt !== null,
				inert: o,
				onSend: f.enqueue,
			}),
		],
	});
}
function dC(e) {
	const n = vr(),
		i = pt(n, ze.transcripts.status, { channelId: e.channelId }),
		o = tE(ze.transcripts.connect),
		u = Ma(ze.transcripts.retry),
		l = Ma(ze.transcripts.reconcile),
		[f, h] = (0, _.useState)(!1),
		[m, g] = (0, _.useState)(null),
		[p, b] = (0, _.useState)(!1),
		[y, w] = (0, _.useState)(!1),
		E = (0, _.useRef)(null),
		T = (0, _.useRef)(null),
		x = (0, _.useId)(),
		z = (0, _.useId)(),
		M = async () => {
			if (!f) {
				if (!n.can_request_now()) {
					g("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				((E.current ??= crypto.randomUUID()), h(!0), g(null));
				try {
					const te = await e.client.getToken();
					if (!n.can_request_now()) {
						g("Chitchat is reconnecting. Try again shortly.");
						return;
					}
					const R = await o({ channelId: e.channelId, pluginToken: te, clientRequestId: E.current });
					R._nay ? g(R._nay.message) : (E.current = null);
				} catch {
					g("Could not confirm the Files connection. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		A = async () => {
			if (!f) {
				if (!n.can_request_now()) {
					g("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				(h(!0), g(null));
				try {
					const te = await u({ channelId: e.channelId });
					te._nay && g(te._nay.message);
				} catch {
					g("Could not restart transcript sync. Try again.");
				} finally {
					h(!1);
				}
			}
		},
		N = async () => {
			if (!(f || !y || !i?.canReconcile)) {
				if (!n.can_request_now()) {
					g("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				if (n.canSend) {
					((T.current ??= crypto.randomUUID()), h(!0), g(null));
					try {
						const te = await l({ channelId: e.channelId, clientRequestId: T.current });
						te._nay ? g(te._nay.message) : ((T.current = null), b(!1), w(!1));
					} catch {
						g("Could not confirm the rebuild request. Retry to check it.");
					} finally {
						h(!1);
					}
				}
			}
		},
		D = i?.status === "blocked" ? i.errorCode : i?.indexStatus === "blocked" ? i.indexErrorCode : null,
		k = D === "auth_expired" || D === "sponsor_gone",
		O = !!i && i.status !== "blocked" && i.retryingSince !== null && Date.now() - i.retryingSince >= 3e5,
		L = i ? `#${i.channelName}` : "",
		H = i
			? i.deletionPhase
				? i.status === "blocked"
					? i.errorCode === "auth_expired"
						? `${L} was deleted. Archiving its Files copies is paused because the connection expired. ${i.canConnect ? "Reconnect Files to finish." : "Ask a channel manager to reconnect Files to finish."}`
						: "Channel deleted. Its Files copies need attention."
					: i.deletionPhase === "copy"
						? "Channel deleted. Saving its last messages in Files…"
						: "Channel deleted. Archiving its Files copies…"
				: i.status === "ready"
					? i.indexStatus === "blocked"
						? i.indexErrorCode === "auth_expired"
							? "Chat is saved. The channel list file (README.md) is paused because its Files connection expired. Reconnect Files from any channel."
							: "Chat is saved. The channel index needs attention."
						: i.indexStatus === "ready"
							? "Saved in Files"
							: "Channel saved. Updating the channel index…"
					: i.status === "not_connected"
						? "Chat is saved. Connect Files to keep Markdown copies."
						: i.status === "blocked"
							? i.errorCode === "auth_expired"
								? `Chat is saved. Saving ${L} to Files is paused because the Files connection expired.${i.canConnect ? " Reconnect Files to continue. New messages will be copied after you reconnect." : " Ask a channel manager to reconnect Files."}`
								: i.errorCode === "permission"
									? `Chat is saved. Saving ${L} to Files is paused. Chitchat can no longer write to ${i.folderPath ?? "its folder"}.${i.canConnect ? " Give the Chitchat service account Can manage on that folder, then choose Retry sync." : " Ask a channel manager to fix the folder access."}`
									: i.errorCode === "sponsor_gone"
										? `Chat is saved. The person who connected Files no longer has access.${i.canConnect ? " Reconnect Files to use your own connection." : " Ask a channel manager to reconnect Files."}`
										: `Chat is saved. Transcript sync needs attention.${i.canConnect ? "" : " Ask a channel manager to check it."}`
							: O
								? i.nextAttemptAt === null
									? "Chat is saved. Saving to Files is delayed. Chitchat keeps trying."
									: `Chat is saved. Saving to Files is delayed. Next try at ${new Date(i.nextAttemptAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
								: "Chat is saved. Updating Files…"
			: "Checking transcript access…";
	return (0, S.jsxs)(S.Fragment, {
		children: [
			(0, S.jsxs)("div", {
				className: "transcript-status",
				children: [
					(0, S.jsx)("span", { role: "status", children: H }),
					i?.canConnect
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void M(),
								children: f ? "Connecting…" : i.status === "not_connected" ? "Connect Files" : "Reconnect Files",
							})
						: null,
					(i?.status === "blocked" || i?.indexStatus === "blocked" || O) && i.canConnect && !k
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void A(),
								children: O ? "Retry now" : "Retry sync",
							})
						: null,
					i
						? (0, S.jsxs)("details", {
								children: [
									(0, S.jsx)("summary", { children: "Transcript details" }),
									i.folderPath
										? (0, S.jsxs)("p", {
												children: [
													i.folderNodeId ? "Folder in Bonobo Senate Files" : "Planned folder in Bonobo Senate Files",
													":",
													" ",
													(0, S.jsx)("code", { children: i.folderPath }),
												],
											})
										: null,
									i.readerMode === "manual"
										? (0, S.jsx)("p", { children: "Files sharing is managed in Bonobo Senate." })
										: null,
									i.error ? (0, S.jsx)("p", { role: "alert", children: i.error }) : null,
									(0, S.jsxs)("p", {
										children: [
											"Channel index:",
											" ",
											i.indexStatus === "ready"
												? "saved"
												: i.indexStatus === "blocked"
													? "needs attention"
													: "updating",
											".",
										],
									}),
									i.indexError ? (0, S.jsx)("p", { role: "alert", children: i.indexError }) : null,
									i.status === "blocked" && i.folderPath && (i.errorCode === null || i.errorCode === "permission")
										? (0, S.jsx)("p", {
												children: i.folderNodeId
													? "If folder access is missing, open this folder in Bonobo Senate Files. Give the Chitchat service account Can manage, then reconnect."
													: "If permissions blocked setup, ask a workspace admin to connect. Both the person connecting and the Chitchat service account need Can manage on the parent folder or workspace to create the locked folder.",
											})
										: null,
									i.canReconcile
										? (0, S.jsx)("button", {
												type: "button",
												className: "button",
												disabled: f || !n.connected,
												onClick: () => {
													(b(!0), g(null));
												},
												children: "Rebuild copies",
											})
										: null,
								],
							})
						: null,
					m && !p ? (0, S.jsx)("span", { role: "alert", children: m }) : null,
				],
			}),
			p
				? (0, S.jsxs)(Wo, {
						labelledBy: x,
						accessUnavailable: !n.refreshing && (!n.ready || i === null),
						onReconnect: n.retry,
						onClose: () => {
							f || b(!1);
						},
						children: [
							(0, S.jsx)("h2", { id: x, className: "dialog-title", children: "Rebuild transcript copies?" }),
							(0, S.jsx)("p", {
								children:
									"This replaces the generated Markdown copies from saved chat. Edits made directly to those copies will be replaced. File sharing and write permissions still apply.",
							}),
							(0, S.jsxs)("label", {
								htmlFor: z,
								children: [
									(0, S.jsx)("input", {
										id: z,
										type: "checkbox",
										checked: y,
										disabled: f,
										onChange: (te) => w(te.currentTarget.checked),
									}),
									"Replace edits in the generated transcripts",
								],
							}),
							m ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
							(0, S.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, S.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: f,
										onClick: () => b(!1),
										children: "Cancel",
									}),
									(0, S.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: f || !y || !n.connected,
										onClick: () => void N(),
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
function tL(e, n) {
	const i = Ba(),
		o = (0, _.useRef)(new Map()),
		u = (0, _.useRef)(new Map()),
		l = (0, _.useRef)(0),
		[, f] = (0, _.useState)(0);
	(0, _.useEffect)(() => {
		((l.current += 1), o.current.clear(), u.current.clear());
	}, [e, n]);
	const h = (0, _.useCallback)(
		async (m, g = []) => {
			if (!n) return;
			const p = l.current,
				b = new Set(g);
			for (const T of g) {
				const x = o.current.get(T);
				x && (o.current.delete(T), o.current.set(T, { ...x, author: !0 }));
			}
			const y = [...new Set(m)]
					.slice(0, 1e3)
					.filter((T) => !o.current.has(T) || Date.now() - o.current.get(T).at >= 3e5),
				w = new Set(),
				E = [];
			for (const T of y) {
				const x = u.current.get(T);
				x ? (b.has(T) && (x.author = !0), w.add(x.promise)) : E.push(T);
			}
			for (let T = 0; T < E.length; T += 50) {
				const x = E.slice(T, T + 50),
					z = i
						.query(ze.members.resolve, { userIds: x })
						.then((M) => {
							if (!(l.current !== p || !M)) {
								for (const A of x) {
									const N = u.current.get(A)?.author === !0 || o.current.get(A)?.author === !0;
									(o.current.delete(A), o.current.set(A, { name: M[A] ?? null, at: Date.now(), author: N }));
								}
								for (; o.current.size > 1e3;) {
									const A = [...o.current].find(([, N]) => !N.author)?.[0] ?? o.current.keys().next().value;
									A !== void 0 && o.current.delete(A);
								}
							}
						})
						.catch(() => {})
						.finally(() => {
							if (l.current === p) for (const M of x) u.current.delete(M);
						});
				for (const M of x) u.current.set(M, { promise: z, author: b.has(M) });
				w.add(z);
			}
			w.size > 0 && (await Promise.all(w), l.current === p && f((T) => T + 1));
		},
		[i, n],
	);
	return (
		(0, _.useEffect)(() => {
			if (!n) return;
			const m = setInterval(() => {
				h([...o.current.keys()]);
			}, 6e4);
			return () => clearInterval(m);
		}, [h, n]),
		(0, _.useMemo)(() => ({ get: (m) => o.current.get(m)?.name, resolve: h }), [h])
	);
}
function nv(e, n) {
	const i = e.get(n);
	return i === void 0 ? "…" : (i ?? "Former member");
}
function nL(e) {
	const n = zr(`${e.scopeKey}:public`),
		i = zr(`${e.scopeKey}:private`),
		o = pt(e.session, ze.views.unreads, { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } }),
		u = pt(e.session, ze.views.unreads, { visibility: "private", paginationOpts: { numItems: 50, cursor: i.cursor } });
	(0, _.useEffect)(() => {
		e.memberNames.resolve((o?.page ?? []).flatMap((f) => (f.latest ? [f.latest.authorHostUserId] : [])));
	}, [o, e.memberNames]);
	const l = n.number === 1 && i.number === 1 && o?.isDone && u?.isDone && o.page.length === 0 && u.page.length === 0;
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
				children: "Unread channels across this workspace. Private channels show their name only.",
			}),
			l
				? (0, S.jsx)("p", { className: "channel-status", children: "You are all caught up." })
				: (0, S.jsx)(S.Fragment, {
						children: [
							{ label: "Public channels", page: n, result: o },
							{ label: "Private channels", page: i, result: u },
						].map(({ label: f, page: h, result: m }) =>
							(0, S.jsxs)(
								"section",
								{
									className: "view-group",
									children: [
										(0, S.jsx)("h3", { className: "view-group-title", children: f }),
										m
											? m.page.length === 0
												? (0, S.jsx)("p", { className: "channel-status", children: "No unread channels on this page." })
												: (0, S.jsx)("ul", {
														className: "view-rows",
														children: m.page.map((g) =>
															(0, S.jsx)(
																"li",
																{
																	className: "view-row",
																	children: (0, S.jsxs)("button", {
																		type: "button",
																		className: "view-row-button",
																		onClick: () => e.onOpen(g.channel),
																		children: [
																			(0, S.jsxs)("span", {
																				className: "view-row-title",
																				children: [
																					"#",
																					g.channel.name,
																					g.mentionCount > 0
																						? (0, S.jsxs)("span", {
																								className: "mention-badge",
																								children: [
																									g.mentionCount >= 100 ? "99+" : g.mentionCount,
																									(0, S.jsx)("span", {
																										className: "visually-hidden",
																										children: " mentions of you",
																									}),
																								],
																							})
																						: null,
																				],
																			}),
																			(0, S.jsx)("span", {
																				className: "view-row-time",
																				children: nf(g.lastActivityAt, Date.now()),
																			}),
																			g.latest
																				? (0, S.jsxs)("span", {
																						className: "view-row-preview",
																						children: [
																							nv(e.memberNames, g.latest.authorHostUserId),
																							":",
																							" ",
																							g.latest.text.slice(0, 160),
																						],
																					})
																				: null,
																		],
																	}),
																},
																g.channel._id,
															),
														),
													})
											: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading unreads…" }),
										(0, S.jsx)(si, { page: h, result: m, label: f }),
									],
								},
								f,
							),
						),
					}),
		],
	});
}
function rL(e) {
	const n = zr(e.scopeKey),
		i = pt(e.session, ze.views.activity, { paginationOpts: { numItems: 50, cursor: n.cursor } });
	(0, _.useEffect)(() => {
		e.memberNames.resolve((i?.page ?? []).map((u) => u.message.authorHostUserId));
	}, [i, e.memberNames]);
	const o = [];
	for (const u of i?.page ?? []) {
		const l = o[o.length - 1];
		l?.channel._id === u.channel._id
			? l.messages.push(u.message)
			: o.push({ channel: u.channel, messages: [u.message] });
	}
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
				children: "Public messages, newest first. Private channels are not shown here.",
			}),
			i
				? o.length === 0
					? (0, S.jsx)("p", { className: "channel-status", children: "No public messages on this page." })
					: (0, S.jsx)("div", {
							className: "view-groups",
							children: o.map((u, l) =>
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
													onClick: () => e.onOpen(u.channel),
													children: ["#", u.channel.name],
												}),
											}),
											(0, S.jsx)("ul", {
												className: "view-rows",
												children: u.messages.map((f) =>
													(0, S.jsxs)(
														"li",
														{
															className: f.mentions.includes(e.userId) ? "view-row mention-self" : "view-row",
															children: [
																(0, S.jsx)("span", {
																	className: "view-row-title",
																	children: nv(e.memberNames, f.authorHostUserId),
																}),
																(0, S.jsx)("span", {
																	className: "view-row-time",
																	children: nf(f.createdAt, Date.now()),
																}),
																(0, S.jsx)("span", { className: "view-row-preview", children: f.text.slice(0, 160) }),
															],
														},
														f._id,
													),
												),
											}),
										],
									},
									`${u.channel._id}:${l}`,
								),
							),
						})
				: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading activity…" }),
			(0, S.jsx)(si, { page: n, result: i, label: "Activity" }),
		],
	});
}
function iL(e) {
	const n = zr(e.scopeKey),
		i = pt(e.session, ze.views.threads, { paginationOpts: { numItems: 50, cursor: n.cursor } });
	return (
		(0, _.useEffect)(() => {
			e.memberNames.resolve((i?.page ?? []).map((o) => o.latest.authorHostUserId));
		}, [i, e.memberNames]),
		(0, S.jsxs)("section", {
			className: "view",
			"aria-label": "Threads",
			children: [
				(0, S.jsx)("header", {
					className: "view-head",
					children: (0, S.jsx)("h2", { className: "view-title", children: "Threads" }),
				}),
				(0, S.jsx)("p", {
					className: "view-note",
					children: "Public threads with replies. Private channels are not shown here.",
				}),
				i
					? i.page.length === 0
						? (0, S.jsx)("p", { className: "channel-status", children: "No thread activity on this page." })
						: (0, S.jsx)("ul", {
								className: "view-rows",
								children: i.page.map((o) =>
									(0, S.jsx)(
										"li",
										{
											className: "view-row",
											children: (0, S.jsxs)("button", {
												type: "button",
												className: "view-row-button",
												onClick: () => e.onOpen(o.channel, o.summary.rootMessageId),
												children: [
													(0, S.jsxs)("span", { className: "view-row-title", children: ["#", o.channel.name] }),
													(0, S.jsx)("span", {
														className: "view-row-time",
														children: nf(o.latest.createdAt, Date.now()),
													}),
													(0, S.jsxs)("span", {
														className: "view-row-preview",
														children: [
															o.summary.activeReplyCount,
															" ",
															o.summary.activeReplyCount === 1 ? "reply" : "replies",
															" ·",
															" ",
															nv(e.memberNames, o.latest.authorHostUserId),
															": ",
															o.latest.text.slice(0, 160),
														],
													}),
												],
											}),
										},
										o.summary._id,
									),
								),
							})
					: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading threads…" }),
				(0, S.jsx)(si, { page: n, result: i, label: "Threads" }),
			],
		})
	);
}
function aL(e) {
	const n = zr(e.scopeKey),
		i = pt(e.session, ze.transcripts.list_deletions, { paginationOpts: { numItems: 20, cursor: n.cursor } });
	return (0, S.jsxs)("section", {
		className: "view",
		"aria-label": "Files sync",
		children: [
			(0, S.jsx)("header", {
				className: "view-head",
				children: (0, S.jsx)("h2", { className: "view-title", children: "Deleted channel copies" }),
			}),
			(0, S.jsx)("p", {
				className: "view-note",
				children: "Finish saving and archiving the Files copies for deleted channels.",
			}),
			i
				? i.page.length === 0
					? (0, S.jsx)("p", {
							className: "channel-status",
							children: "No deleted channel copies need attention on this page.",
						})
					: (0, S.jsx)("ul", {
							className: "view-rows",
							children: i.page.map((o) =>
								(0, S.jsxs)(
									"li",
									{
										className: "view-row",
										children: [
											(0, S.jsxs)("h3", { className: "view-row-title", children: ["#", o.name] }),
											(0, S.jsx)(dC, { client: e.client, channelId: o.channelId }),
										],
									},
									o.channelId,
								),
							),
						})
				: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Checking Files sync…" }),
			(0, S.jsx)(si, { page: n, result: i, label: "Deleted channel copies" }),
		],
	});
}
function oL(e) {
	const n = pt(e.session, ze.channels.permissions, { channelId: e.channel._id }),
		i = e.unread instanceof Error ? null : e.unread,
		o = e.channel;
	return (0, S.jsxs)("li", {
		className: "channel-item",
		"data-channel-key": o._id,
		children: [
			(0, S.jsxs)("button", {
				type: "button",
				className: i?.hasUnread || i?.mentionCount ? "channel-link is-unread" : "channel-link",
				"aria-current": e.selected ? "page" : void 0,
				disabled: e.blocked,
				onClick: () => e.onOpen(o),
				children: [
					(0, S.jsx)("span", {
						className: "channel-initial",
						"aria-hidden": "true",
						children: o.name.slice(0, 1).toUpperCase(),
					}),
					(0, S.jsxs)("span", {
						className: "channel-name",
						children: [
							"#",
							o.name,
							o.visibility === "private" ? " (private)" : "",
							o.archivedAt !== null ? " (archived)" : "",
						],
					}),
					i && i.mentionCount > 0
						? (0, S.jsxs)("span", {
								className: "mention-badge",
								children: [
									i.mentionCount >= 100 ? "99+" : i.mentionCount,
									(0, S.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
								],
							})
						: i?.hasUnread
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
				children: (0, S.jsx)(fq, {
					channelName: o.name,
					items: [
						...(o.visibility === "private"
							? [
									{
										id: "people",
										label: `People in #${o.name}`,
										onSelect: () => e.onDialog({ kind: "people", channel: o }),
									},
								]
							: []),
						...(n?.canWrite
							? [
									{
										id: "rename",
										label: `Rename #${o.name}`,
										onSelect: () => e.onDialog({ kind: "rename", channel: o }),
									},
									{
										id: "archive",
										label: `${o.archivedAt === null ? "Archive" : "Unarchive"} #${o.name}`,
										onSelect: () => e.onDialog({ kind: o.archivedAt === null ? "archive" : "unarchive", channel: o }),
									},
								]
							: []),
						...(o.visibility === "private"
							? [
									{
										id: "leave",
										label: `Leave #${o.name}`,
										danger: !0,
										onSelect: () => e.onDialog({ kind: "leave", channel: o }),
									},
								]
							: []),
						...(o.visibility === "private" && n?.canManage
							? [
									{
										id: "delete",
										label: `Delete #${o.name} for everyone`,
										danger: !0,
										onSelect: () => e.onDialog({ kind: "delete", channel: o }),
									},
								]
							: []),
					],
				}),
			}),
		],
	});
}
var sL = class extends _.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e, n) {
		console.error("Chitchat could not render", { error: e.message, componentStack: n.componentStack });
	}
	render() {
		return this.state.failed
			? (0, S.jsxs)("main", {
					className: "page-dead",
					role: "alert",
					children: [
						(0, S.jsx)("h1", { children: "Chitchat" }),
						(0, S.jsx)("p", { children: "Chitchat could not load this view. Bonobo Senate is still available." }),
						(0, S.jsx)("button", {
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
function _w(e, n) {
	const i = Ba(),
		[o, u] = (0, _.useState)(0),
		l = (0, _.useRef)(0),
		f = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		if (!e || !n) return;
		const h = JSON.stringify(e);
		if (f.current === h) return;
		let m = !1,
			g;
		const p = () => {
			m ||
				((l.current += 1),
				(g = setTimeout(() => u((b) => b + 1), Math.min(3e4, 1e3 * 2 ** Math.min(l.current - 1, 5)))));
		};
		return (
			("rootMessageId" in e
				? i.mutation(ze.read_states.mark_thread_read, {
						rootMessageId: e.rootMessageId,
						replySequence: e.replySequence,
					})
				: i.mutation(ze.read_states.mark_read, { channelId: e.channelId, rootSequence: e.rootSequence })
			)
				.then((b) => {
					"_nay" in b ? p() : m || ((f.current = h), (l.current = 0));
				})
				.catch(p),
			() => {
				((m = !0), g && clearTimeout(g));
			}
		);
	}, [i, e, n, o]);
}
function uL(e) {
	const n = Ba(),
		i = vr(),
		o = e.client.context.userId,
		u = `${i.member?.generation ?? "loading"}:${i.member?.membershipLifetime ?? 0}`,
		l = tL(u, i.ready || i.refreshing),
		f = zr(`${u}:public`),
		h = zr(`${u}:private`),
		m = zr(`${u}:archived`),
		g = zr(`${u}:archived-private`),
		[p, b] = (0, _.useState)(!1),
		y = pt(i, ze.channels.list_public, { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } }),
		w = pt(i, ze.channels.list_mine, { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } }),
		E = pt(i, ze.channels.list_mine, p ? { archived: !0, paginationOpts: { numItems: 50, cursor: g.cursor } } : "skip"),
		T = pt(
			i,
			ze.channels.list_public,
			p ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[x, z] = (0, _.useState)(null),
		[M, A] = (0, _.useState)(null),
		[N, D] = (0, _.useState)(null),
		[k, O] = (0, _.useState)(!1),
		[L, H] = (0, _.useState)(!1),
		[te, R] = (0, _.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[q, P] = (0, _.useState)(0),
		[F, Y] = (0, _.useState)({ sequence: 0, text: "" }),
		[B, ne] = (0, _.useState)(null),
		[re, U] = (0, _.useState)(null),
		ee = te && M !== null,
		K = x?.kind === "channel" ? x.id : null,
		ue = pt(i, ze.channels.get, K ? { channelId: K } : "skip"),
		xe = pt(i, ze.channels.permissions, K ? { channelId: K } : "skip"),
		ve = ue ?? null,
		j = (0, _.useRef)(null),
		ae = (0, _.useRef)(null),
		W = (0, _.useRef)(null),
		fe = (0, _.useRef)(null),
		Ee = (0, _.useRef)(null),
		_e = (0, _.useRef)(0);
	(0, _.useEffect)(() => {
		_e.current += 1;
	}, [i.ready, u]);
	const Ce = (0, _.useId)(),
		ce = (0, _.useId)(),
		ye = (0, _.useId)(),
		Ge = (0, _.useId)(),
		ct = (0, _.useMemo)(
			() => [...(y?.page ?? []), ...(w?.page ?? []), ...(T?.page ?? []), ...(E?.page ?? [])],
			[y, w, T, E],
		),
		mt = (0, _.useMemo)(
			() =>
				Object.fromEntries(
					ct.map((he) => [he._id, { query: ze.read_states.get_for_channel, args: { channelId: he._id } }]),
				),
			[ct],
		),
		_t = rg(mt),
		et = ct.filter((he) => {
			const Te = _t[he._id];
			return he.archivedAt === null && !(Te instanceof Error) && Te?.hasUnread;
		}).length,
		Ue = !y?.isDone || !w?.isDone || f.number > 1 || h.number > 1,
		Qe = (0, _.useCallback)((he) => Y((Te) => ({ sequence: Te.sequence + 1, text: he })), []),
		dn = (0, _.useCallback)(() => P((he) => he + 1), []),
		At = (0, _.useCallback)(() => P((he) => Math.max(0, he - 1)), []),
		Fn = (0, _.useCallback)(
			(he) => {
				K &&
					ne((Te) =>
						Te?.channelId === K && Te.scopeKey === u && Te.rootSequence >= he.rootSequence
							? Te
							: {
									scopeKey: u,
									channelId: K,
									rootSequence: Math.max(
										Te?.channelId === K && Te.scopeKey === u ? Te.rootSequence : 0,
										he.rootSequence,
									),
								},
					);
			},
			[K, u],
		),
		Qn = (0, _.useCallback)(
			(he) => {
				U((Te) =>
					Te?.scopeKey === u && Te.rootMessageId === he.rootMessageId && Te.replySequence >= he.replySequence
						? Te
						: { scopeKey: u, ...he },
				);
			},
			[u],
		);
	(_w(B, B?.scopeKey === u && i.connected && i.can_request_now() && B?.channelId === ue?._id),
		_w(re, re?.scopeKey === u && i.connected && i.can_request_now() && !!ue && re?.rootMessageId === M));
	const Ct = (0, _.useCallback)(
			async (he, Te) => {
				if (q > 0 || !i.ready) return;
				const bt = ++_e.current;
				try {
					const Tt = await n.query(ze.read_states.get_for_channel, { channelId: he._id });
					if (bt !== _e.current) return;
					(z({ kind: "channel", id: he._id, openedAtReadSequence: Tt?.state?.rootSequence ?? 0 }),
						A(Te ?? null),
						O(!1),
						H(!1),
						Qe(`Opened #${he.name}`));
				} catch {
					Qe("Could not open this channel. Try again.");
				}
			},
			[n, q, i.ready, Qe],
		),
		qt = (0, _.useCallback)(() => {
			(D(null), (Ee.current = "selected"));
		}, []),
		hn = (0, _.useCallback)(() => {
			(D(null), b(!0), (Ee.current = "selected"));
		}, []);
	((0, _.useEffect)(() => {
		const he = (bt) => {
				bt.target instanceof Node && !j.current?.contains(bt.target) && (fe.current = null);
			},
			Te = () => {
				fe.current = null;
			};
		return (
			document.addEventListener("focusin", he),
			window.addEventListener("blur", Te),
			() => {
				(document.removeEventListener("focusin", he), window.removeEventListener("blur", Te));
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const he = window.matchMedia("(max-width: 719px)"),
				Te = (bt) => {
					((Ee.current = bt.matches
						? M && fe.current !== null
							? "thread"
							: fe.current === "sidebar" && !k
								? "drawer"
								: null
						: fe.current === "drawer"
							? "selected"
							: null),
						bt.matches && M && O(!1),
						R(bt.matches));
				};
			return (he.addEventListener("change", Te), () => he.removeEventListener("change", Te));
		}, [k, M]),
		(0, _.useLayoutEffect)(() => {
			if (document.querySelector(".dialog-overlay")) return;
			const he = Ee.current;
			if (((Ee.current = null), he === "thread" || (he !== null && te && M))) {
				const Te = j.current?.querySelector(".thread"),
					bt = Te?.querySelector(".thread-head button:not([disabled])");
				bt ? bt.focus() : Te ? Te.focus() : W.current?.focus();
			} else if (he === "drawer" || (he === "selected" && te && !k)) W.current?.focus();
			else if (he === "selected") {
				const Te = ae.current?.querySelector('[aria-current="page"]');
				Te && !Te.disabled ? Te.focus() : ae.current?.focus();
			}
		}, [N, te, M, k]));
	const Qt = (he, Te, bt) =>
		bt.length === 0
			? null
			: (0, S.jsxs)("div", {
					className: "channel-section",
					children: [
						(0, S.jsx)("h2", { id: Te, className: "channel-section-title", children: he }),
						(0, S.jsx)("ul", {
							className: "channel-list",
							"aria-labelledby": Te,
							children: bt.map((Tt) =>
								(0, S.jsx)(
									oL,
									{
										channel: Tt,
										selected: K === Tt._id,
										blocked: q > 0,
										session: i,
										unread: _t[Tt._id],
										onOpen: Ct,
										onDialog: D,
									},
									Tt._id,
								),
							),
						}),
					],
				});
	return (0, S.jsxs)("div", {
		ref: j,
		className: "chitchat",
		"data-chitchat-connection": i.connection,
		onFocusCapture: (he) => {
			const Te = he.target;
			fe.current =
				Te === W.current
					? "drawer"
					: ae.current?.contains(Te)
						? "sidebar"
						: Te.classList.contains("thread-resize")
							? "separator"
							: j.current?.contains(Te) && !Te.closest(".thread")
								? "main"
								: null;
		},
		children: [
			(0, S.jsxs)("header", {
				className: "app-bar",
				inert: ee || void 0,
				children: [
					(0, S.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, S.jsx)("button", {
						ref: W,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": k,
						onClick: () => O((he) => !he),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: ae,
				inert: ee || void 0,
				className: ["sidebar", k && "is-open", L && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (he) => {
					he.key === "Escape" && te && k && (O(!1), W.current?.focus());
				},
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: te && !k ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": L,
									"aria-label": L ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => H((he) => !he),
									children: L ? "«" : "»",
								}),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: q > 0 || !i.canSend,
									onClick: () => D({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: ["unreads", "threads", "activity", "transcripts"].map((he) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												he === "unreads" && et > 0 ? "channel-link view-link is-unread" : "channel-link view-link",
											"aria-current": x?.kind === he ? "page" : void 0,
											disabled: q > 0,
											onClick: () => {
												((_e.current += 1),
													z({ kind: he }),
													A(null),
													O(!1),
													Qe(`Opened ${he === "transcripts" ? "Files sync" : he}`));
											},
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: he === "transcripts" ? "F" : he[0].toUpperCase(),
												}),
												(0, S.jsx)("span", {
													className: "channel-name",
													children: he === "transcripts" ? "Files sync" : he[0].toUpperCase() + he.slice(1),
												}),
												he === "unreads" && et > 0
													? (0, S.jsxs)("span", {
															className: "mention-badge",
															children: [
																et,
																Ue ? "+" : "",
																(0, S.jsx)("span", {
																	className: "visually-hidden",
																	children: " unread channels shown",
																}),
															],
														})
													: null,
											],
										}),
									},
									he,
								),
							),
						}),
						(i.ready || i.refreshing) && y && w
							? (0, S.jsxs)(S.Fragment, {
									children: [
										Qt("Channels", Ce, y.page),
										(0, S.jsx)(si, { page: f, result: y, label: "Public channels" }),
										Qt("Private channels", ce, w.page),
										(0, S.jsx)(si, { page: h, result: w, label: "Private channels" }),
										ct.length === 0
											? (0, S.jsx)("p", { className: "channel-status", children: "No channels on this page" })
											: null,
										(0, S.jsx)("button", {
											type: "button",
											className: "button sidebar-archive-toggle",
											"aria-expanded": p,
											onClick: () => b((he) => !he),
											children: p ? "Hide archived channels" : "Show archived channels",
										}),
										p
											? (0, S.jsxs)(S.Fragment, {
													children: [
														Qt("Archived", ye, T?.page ?? []),
														(0, S.jsx)(si, { page: m, result: T, label: "Archived channels" }),
														Qt("Archived private channels", Ge, E?.page ?? []),
														(0, S.jsx)(si, { page: g, result: E, label: "Archived private channels" }),
													],
												})
											: null,
									],
								})
							: (0, S.jsx)("p", {
									className: "channel-status",
									role: "status",
									children:
										i.message && i.connection !== "syncing" ? "Channel access is unavailable." : "Loading channels…",
								}),
					],
				}),
			}),
			(0, S.jsxs)("main", {
				className: "main",
				tabIndex: -1,
				children: [
					(0, S.jsxs)("div", {
						className: "main-notices",
						inert: ee || void 0,
						children: [
							K ? (0, S.jsx)(dC, { client: e.client, channelId: K }, `transcript:${K}`) : null,
							i.connection === "syncing"
								? (0, S.jsx)("div", { className: "connection-status", role: "status", children: i.message })
								: i.message
									? (0, S.jsxs)("div", {
											className: "connection-status",
											role: "alert",
											children: [
												i.message,
												(0, S.jsx)("button", {
													type: "button",
													className: "button",
													onClick: i.retry,
													children: "Reconnect",
												}),
											],
										})
									: null,
						],
					}),
					x?.kind === "unreads"
						? (0, S.jsx)(nL, { scopeKey: u, session: i, memberNames: l, onOpen: Ct })
						: x?.kind === "activity"
							? (0, S.jsx)(rL, { scopeKey: u, session: i, userId: o, memberNames: l, onOpen: Ct })
							: x?.kind === "threads"
								? (0, S.jsx)(iL, { scopeKey: u, session: i, memberNames: l, onOpen: Ct })
								: x?.kind === "transcripts"
									? (0, S.jsx)(aL, { client: e.client, scopeKey: u, session: i })
									: x?.kind === "channel"
										? (0, S.jsx)(
												Wq,
												{
													client: e.client,
													channelId: x.id,
													channel: ve,
													userId: o,
													memberNames: l,
													announce: Qe,
													threadRootId: M,
													setThreadRootId: (he) => {
														(A(he), he && O(!1));
													},
													isNarrow: te,
													canWrite: xe?.canWrite ?? !1,
													online: i.connected,
													openedAtReadSequence: x.openedAtReadSequence,
													onObservedRead: Fn,
													onObservedThreadRead: Qn,
													onRequestStart: dn,
													onRequestSettled: At,
													sendInFlight: q > 0,
												},
												`channel:${x.id}`,
											)
										: (0, S.jsx)("p", {
												className: "channel-status",
												children: i.ready
													? ct.length === 0
														? Ue
															? "No channels on this page. Use the page controls to continue."
															: "No channels yet — create the first one."
														: "Select a channel."
													: "Connecting to Chitchat…",
											}),
				],
			}),
			N?.kind === "create"
				? (0, S.jsx)(wS, {
						channel: null,
						selfUserId: o,
						onClose: qt,
						onSaved: (he) => {
							(qt(), z({ kind: "channel", id: he, openedAtReadSequence: 0 }), A(null));
						},
					})
				: null,
			N?.kind === "rename" ? (0, S.jsx)(wS, { channel: N.channel, selfUserId: o, onClose: qt, onSaved: qt }) : null,
			N?.kind === "people" ? (0, S.jsx)(B2, { channelId: N.channel._id, selfUserId: o, onClose: qt }) : null,
			N && N.kind !== "create" && N.kind !== "rename" && N.kind !== "people"
				? (0, S.jsx)(P2, { channel: N.channel, action: N.kind, onClose: qt, onDone: hn })
				: null,
			(0, S.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, S.jsx)("span", { "data-announcement-sequence": F.sequence }), F.text],
			}),
		],
	});
}
function hC(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var mC = document.getElementById("root");
if (!mC) throw new Error("index.html is missing the #root element");
var eg = (0, iR.createRoot)(mC);
eg.render((0, S.jsx)(hC, { message: "Connecting…" }));
JA().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			eg.render(
				(0, S.jsx)(sL, { client: e, children: (0, S.jsx)(V2, { client: e, children: (0, S.jsx)(uL, { client: e }) }) }),
			));
	},
	(e) => {
		eg.render((0, S.jsx)(hC, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
