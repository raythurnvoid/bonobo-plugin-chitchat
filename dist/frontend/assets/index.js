var Zx = Object.create,
	_w = Object.defineProperty,
	Fx = Object.getOwnPropertyDescriptor,
	Qx = Object.getOwnPropertyNames,
	Yx = Object.getPrototypeOf,
	Cw = Object.prototype.hasOwnProperty,
	sr = (e, n) => () => (n || (e((n = { exports: {} }).exports, n, n.exports), (e = null)), n.exports),
	Kx = (e, n, i, o) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var u = Qx(n), l = 0, f = u.length, h; l < f; l++)
				((h = u[l]),
					!Cw.call(e, h) &&
						h !== i &&
						_w(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(o = Fx(n, h)) || o.enumerable }));
		return e;
	},
	Gx = (e, n, i) => (
		(i = e != null ? Zx(Yx(e)) : {}),
		Kx(n || !e || !e.__esModule || !Cw.call(e, "default") ? _w(i, "default", { value: e, enumerable: !0 }) : i, e)
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
var Xx = sr((e) => {
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
		function T(k) {
			return k === null || typeof k != "object"
				? null
				: ((k = (E && k[E]) || k["@@iterator"]), typeof k == "function" ? k : null);
		}
		var x = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			j = Object.assign,
			M = {};
		function A(k, ae, W) {
			((this.props = k), (this.context = ae), (this.refs = M), (this.updater = W || x));
		}
		((A.prototype.isReactComponent = {}),
			(A.prototype.setState = function (k, ae) {
				if (typeof k != "object" && typeof k != "function" && k != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, k, ae, "setState");
			}),
			(A.prototype.forceUpdate = function (k) {
				this.updater.enqueueForceUpdate(this, k, "forceUpdate");
			}));
		function N() {}
		N.prototype = A.prototype;
		function D(k, ae, W) {
			((this.props = k), (this.context = ae), (this.refs = M), (this.updater = W || x));
		}
		var z = (D.prototype = new N());
		((z.constructor = D), j(z, A.prototype), (z.isPureReactComponent = !0));
		var O = Array.isArray;
		function U() {}
		var H = { H: null, A: null, T: null, S: null },
			re = Object.prototype.hasOwnProperty;
		function R(k, ae, W) {
			var fe = W.ref;
			return { $$typeof: n, type: k, key: ae, ref: fe !== void 0 ? fe : null, props: W };
		}
		function q(k, ae) {
			return R(k.type, ae, k.props);
		}
		function P(k) {
			return typeof k == "object" && k !== null && k.$$typeof === n;
		}
		function F(k) {
			var ae = { "=": "=0", ":": "=2" };
			return (
				"$" +
				k.replace(/[=:]/g, function (W) {
					return ae[W];
				})
			);
		}
		var Y = /\/+/g;
		function B(k, ae) {
			return typeof k == "object" && k !== null && k.key != null ? F("" + k.key) : ae.toString(36);
		}
		function te(k) {
			switch (k.status) {
				case "fulfilled":
					return k.value;
				case "rejected":
					throw k.reason;
				default:
					switch (
						(typeof k.status == "string"
							? k.then(U, U)
							: ((k.status = "pending"),
								k.then(
									function (ae) {
										k.status === "pending" && ((k.status = "fulfilled"), (k.value = ae));
									},
									function (ae) {
										k.status === "pending" && ((k.status = "rejected"), (k.reason = ae));
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
		function ne(k, ae, W, fe, Ee) {
			var _e = typeof k;
			(_e === "undefined" || _e === "boolean") && (k = null);
			var Ce = !1;
			if (k === null) Ce = !0;
			else
				switch (_e) {
					case "bigint":
					case "string":
					case "number":
						Ce = !0;
						break;
					case "object":
						switch (k.$$typeof) {
							case n:
							case i:
								Ce = !0;
								break;
							case b:
								return ((Ce = k._init), ne(Ce(k._payload), ae, W, fe, Ee));
						}
				}
			if (Ce)
				return (
					(Ee = Ee(k)),
					(Ce = fe === "" ? "." + B(k, 0) : fe),
					O(Ee)
						? ((W = ""),
							Ce != null && (W = Ce.replace(Y, "$&/") + "/"),
							ne(Ee, ae, W, "", function (Ge) {
								return Ge;
							}))
						: Ee != null &&
							(P(Ee) &&
								(Ee = q(
									Ee,
									W + (Ee.key == null || (k && k.key === Ee.key) ? "" : ("" + Ee.key).replace(Y, "$&/") + "/") + Ce,
								)),
							ae.push(Ee)),
					1
				);
			Ce = 0;
			var ce = fe === "" ? "." : fe + ":";
			if (O(k))
				for (var ve = 0; ve < k.length; ve++) ((fe = k[ve]), (_e = ce + B(fe, ve)), (Ce += ne(fe, ae, W, _e, Ee)));
			else if (((ve = T(k)), typeof ve == "function"))
				for (k = ve.call(k), ve = 0; !(fe = k.next()).done;)
					((fe = fe.value), (_e = ce + B(fe, ve++)), (Ce += ne(fe, ae, W, _e, Ee)));
			else if (_e === "object") {
				if (typeof k.then == "function") return ne(te(k), ae, W, fe, Ee);
				throw (
					(ae = String(k)),
					Error(
						"Objects are not valid as a React child (found: " +
							(ae === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : ae) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return Ce;
		}
		function L(k, ae, W) {
			if (k == null) return k;
			var fe = [],
				Ee = 0;
			return (
				ne(k, fe, "", "", function (_e) {
					return ae.call(W, _e, Ee++);
				}),
				fe
			);
		}
		function ee(k) {
			if (k._status === -1) {
				var ae = k._result,
					W = ae();
				(W.then(
					function (fe) {
						(k._status === 0 || k._status === -1) &&
							((k._status = 1), (k._result = fe), W.status === void 0 && ((W.status = "fulfilled"), (W.value = fe)));
					},
					function (fe) {
						(k._status === 0 || k._status === -1) &&
							((k._status = 2), (k._result = fe), W.status === void 0 && ((W.status = "rejected"), (W.reason = fe)));
					},
				),
					k._status === -1 && ((k._status = 0), (k._result = W)));
			}
			if (k._status === 1) return k._result.default;
			throw k._result;
		}
		var K =
			typeof reportError == "function"
				? reportError
				: function (k) {
						if (typeof window == "object" && typeof window.ErrorEvent == "function") {
							var ae = new window.ErrorEvent("error", {
								bubbles: !0,
								cancelable: !0,
								message:
									typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
								error: k,
							});
							if (!window.dispatchEvent(ae)) return;
						} else if (typeof process == "object" && typeof process.emit == "function") {
							process.emit("uncaughtException", k);
							return;
						}
						console.error(k);
					};
		function se(k) {
			var ae = H.T,
				W = {};
			((W.types = ae !== null ? ae.types : null), (H.T = W));
			try {
				var fe = k(),
					Ee = H.S;
				(Ee !== null && Ee(W, fe),
					typeof fe == "object" && fe !== null && typeof fe.then == "function" && fe.then(U, K));
			} catch (_e) {
				K(_e);
			} finally {
				(ae !== null && W.types !== null && (ae.types = W.types), (H.T = ae));
			}
		}
		function xe(k) {
			var ae = H.T;
			if (ae !== null) {
				var W = ae.types;
				W === null ? (ae.types = [k]) : W.indexOf(k) === -1 && W.push(k);
			} else se(xe.bind(null, k));
		}
		var ge = {
			map: L,
			forEach: function (k, ae, W) {
				L(
					k,
					function () {
						ae.apply(this, arguments);
					},
					W,
				);
			},
			count: function (k) {
				var ae = 0;
				return (
					L(k, function () {
						ae++;
					}),
					ae
				);
			},
			toArray: function (k) {
				return (
					L(k, function (ae) {
						return ae;
					}) || []
				);
			},
			only: function (k) {
				if (!P(k)) throw Error("React.Children.only expected to receive a single React element child.");
				return k;
			},
		};
		((e.Activity = y),
			(e.Children = ge),
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
				c: function (k) {
					return H.H.useMemoCache(k);
				},
			}),
			(e.addTransitionType = xe),
			(e.cache = function (k) {
				return function () {
					return k.apply(null, arguments);
				};
			}),
			(e.cacheSignal = function () {
				return null;
			}),
			(e.cloneElement = function (k, ae, W) {
				if (k == null) throw Error("The argument must be a React element, but you passed " + k + ".");
				var fe = j({}, k.props),
					Ee = k.key;
				if (ae != null)
					for (_e in (ae.key !== void 0 && (Ee = "" + ae.key), ae))
						!re.call(ae, _e) ||
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
				return R(k.type, Ee, fe);
			}),
			(e.createContext = function (k) {
				return (
					(k = { $$typeof: h, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null }),
					(k.Provider = k),
					(k.Consumer = { $$typeof: f, _context: k }),
					k
				);
			}),
			(e.createElement = function (k, ae, W) {
				var fe,
					Ee = {},
					_e = null;
				if (ae != null)
					for (fe in (ae.key !== void 0 && (_e = "" + ae.key), ae))
						re.call(ae, fe) && fe !== "key" && fe !== "__self" && fe !== "__source" && (Ee[fe] = ae[fe]);
				var Ce = arguments.length - 2;
				if (Ce === 1) Ee.children = W;
				else if (1 < Ce) {
					for (var ce = Array(Ce), ve = 0; ve < Ce; ve++) ce[ve] = arguments[ve + 2];
					Ee.children = ce;
				}
				if (k && k.defaultProps) for (fe in ((Ce = k.defaultProps), Ce)) Ee[fe] === void 0 && (Ee[fe] = Ce[fe]);
				return R(k, _e, Ee);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (k) {
				return { $$typeof: m, render: k };
			}),
			(e.isValidElement = P),
			(e.lazy = function (k) {
				return { $$typeof: b, _payload: { _status: -1, _result: k }, _init: ee };
			}),
			(e.memo = function (k, ae) {
				return { $$typeof: p, type: k, compare: ae === void 0 ? null : ae };
			}),
			(e.startTransition = se),
			(e.unstable_useCacheRefresh = function () {
				return H.H.useCacheRefresh();
			}),
			(e.use = function (k) {
				return H.H.use(k);
			}),
			(e.useActionState = function (k, ae, W) {
				return H.H.useActionState(k, ae, W);
			}),
			(e.useCallback = function (k, ae) {
				return H.H.useCallback(k, ae);
			}),
			(e.useContext = function (k) {
				return H.H.useContext(k);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (k, ae) {
				return H.H.useDeferredValue(k, ae);
			}),
			(e.useEffect = function (k, ae) {
				return H.H.useEffect(k, ae);
			}),
			(e.useEffectEvent = function (k) {
				return H.H.useEffectEvent(k);
			}),
			(e.useId = function () {
				return H.H.useId();
			}),
			(e.useImperativeHandle = function (k, ae, W) {
				return H.H.useImperativeHandle(k, ae, W);
			}),
			(e.useInsertionEffect = function (k, ae) {
				return H.H.useInsertionEffect(k, ae);
			}),
			(e.useLayoutEffect = function (k, ae) {
				return H.H.useLayoutEffect(k, ae);
			}),
			(e.useMemo = function (k, ae) {
				return H.H.useMemo(k, ae);
			}),
			(e.useOptimistic = function (k, ae) {
				return H.H.useOptimistic(k, ae);
			}),
			(e.useReducer = function (k, ae, W) {
				return H.H.useReducer(k, ae, W);
			}),
			(e.useRef = function (k) {
				return H.H.useRef(k);
			}),
			(e.useState = function (k) {
				return H.H.useState(k);
			}),
			(e.useSyncExternalStore = function (k, ae, W) {
				return H.H.useSyncExternalStore(k, ae, W);
			}),
			(e.useTransition = function () {
				return H.H.useTransition();
			}),
			(e.version = "19.3.1"));
	}),
	ef = sr((e, n) => {
		n.exports = Xx();
	}),
	Dr = [],
	ir = [],
	Jx = Uint8Array,
	tm = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var jo = 0, Wx = tm.length; jo < Wx; ++jo) ((Dr[jo] = tm[jo]), (ir[tm.charCodeAt(jo)] = jo));
ir[45] = 62;
ir[95] = 63;
function eO(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = n);
	var o = i === n ? 0 : 4 - (i % 4);
	return [i, o];
}
function tO(e, n, i) {
	return ((n + i) * 3) / 4 - i;
}
function uu(e) {
	for (
		var n, i = eO(e), o = i[0], u = i[1], l = new Jx(tO(e, o, u)), f = 0, h = u > 0 ? o - 4 : o, m = 0;
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
function nO(e) {
	return Dr[(e >> 18) & 63] + Dr[(e >> 12) & 63] + Dr[(e >> 6) & 63] + Dr[e & 63];
}
function rO(e, n, i) {
	for (var o, u = [], l = n; l < i; l += 3)
		((o = ((e[l] << 16) & 16711680) + ((e[l + 1] << 8) & 65280) + (e[l + 2] & 255)), u.push(nO(o)));
	return u.join("");
}
function lu(e) {
	for (var n, i = e.length, o = i % 3, u = [], l = 16383, f = 0, h = i - o; f < h; f += l)
		u.push(rO(e, f, f + l > h ? h : f + l));
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
	if (!Tw(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function iO(e) {
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
function Tw(e) {
	const n = typeof e == "object",
		i = Object.getPrototypeOf(e),
		o = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return n && o;
}
var xw = !0,
	$o = BigInt("-9223372036854775808"),
	eg = BigInt("9223372036854775807"),
	xm = BigInt("0"),
	aO = BigInt("8"),
	oO = BigInt("256"),
	nm =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	Ow = class {
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
	sO = new Ow();
function Aw(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function uO(e) {
	e < xm && (e -= $o + $o);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const i = new Uint8Array(new ArrayBuffer(8));
	let o = 0;
	for (const u of n.match(/.{2}/g).reverse()) (i.set([parseInt(u, 16)], o++), (e >>= aO));
	return lu(i);
}
function lO(e) {
	const n = uu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let i = xm,
		o = xm;
	for (const u of n) ((i += BigInt(u) * oO ** o), o++);
	return (i > eg && (i += $o + $o), i);
}
function cO(e) {
	if (e < $o || eg < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), lu(new Uint8Array(n)));
}
function fO(e) {
	const n = uu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var dO = DataView.prototype.setBigInt64 ? cO : uO,
	hO = DataView.prototype.getBigInt64 ? fO : lO,
	pb = 1024;
function Om(e) {
	if (e.length > pb) throw new Error(`Field name ${e} exceeds maximum field name length ${pb}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const i = e.charCodeAt(n);
		if (i < 32 || i >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Ho(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((o) => Ho(o));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const o = n[0][0];
		if (o === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return uu(e.$bytes).buffer;
		}
		if (o === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return hO(e.$integer);
		}
		if (o === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const u = uu(e.$float);
			if (u.byteLength !== 8) throw new Error(`Received ${u.byteLength} bytes, expected 8 for $float`);
			const l = new DataView(u.buffer).getFloat64(0, xw);
			if (!Aw(l)) throw new Error(`Float ${l} should be encoded as a number`);
			return l;
		}
		if (o === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return sO;
		}
		if (o === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (o === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const i = {};
	for (const [o, u] of Object.entries(e)) (Om(o), (i[o] = Ho(u)));
	return i;
}
var mO = 16384;
function Vo(e) {
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
	if (n.length > mO) {
		const i = "[...truncated]";
		let o = 16370;
		const u = n.codePointAt(o - 1);
		return (u !== void 0 && u > 65535 && (o -= 1), n.substring(0, o) + i);
	}
	return n;
}
function Nc(e, n, i, o) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Vo(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < $o || eg < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: dO(e) };
	}
	if (typeof e == "number")
		if (Aw(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, xw), { $float: lu(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: lu(new Uint8Array(e)) };
	if (e instanceof Ow) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Nc(f, n, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(rm(i, "Set", [...e], n));
	if (e instanceof Map) throw new Error(rm(i, "Map", [...e], n));
	if (!Tw(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(rm(i, h, e, n));
	}
	const u = {},
		l = Object.entries(e);
	l.sort(([f, h], [m, g]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of l)
		h !== void 0 ? (Om(f), (u[f] = Nc(h, n, i + `.${f}`, !1))) : o && (Om(f), (u[f] = gO(h, n, i + `.${f}`)));
	return u;
}
function rm(e, n, i, o) {
	return e
		? `${n}${Vo(i)} is not a supported Convex type (present at path ${e} in original object ${Vo(o)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${Vo(i)} is not a supported Convex type.`;
}
function gO(e, n, i) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${Vo(e)} but original value is undefined`);
	return Nc(e, n, i, !1);
}
function gr(e) {
	return Nc(e, e, "", !1);
}
var vO = Object.defineProperty,
	yO = (e, n, i) => (n in e ? vO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	St = (e, n, i) => yO(e, typeof n != "symbol" ? n + "" : n, i),
	pO = "https://docs.convex.dev/error#undefined-validator";
function cu(e, n) {
	const i = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${i} in ${e}. This is often caused by circular imports. See ${pO} for details.`,
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
	bO = class Rw extends In {
		constructor({ isOptional: n, tableName: i }) {
			if ((super({ isOptional: n }), St(this, "tableName"), St(this, "kind", "id"), typeof i != "string"))
				throw new Error("v.id(tableName) requires a string");
			this.tableName = i;
		}
		get json() {
			return { type: "id", tableName: this.tableName };
		}
		optional() {
			return new Rw({ isOptional: "optional", tableName: this.tableName });
		}
		asOptional() {
			return this.optional();
		}
	},
	bb = class Nw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "float64"));
		}
		get json() {
			return { type: "number" };
		}
		optional() {
			return new Nw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	Sb = class Mw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "int64"));
		}
		get json() {
			return { type: "bigint" };
		}
		optional() {
			return new Mw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	SO = class Dw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "commitTs"));
		}
		get json() {
			return { type: this.kind };
		}
		optional() {
			return new Dw({ isOptional: "optional" });
		}
		asOptional() {
			return this.optional();
		}
	},
	wO = class zw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "boolean"));
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
	EO = class Iw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "bytes"));
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
	_O = class jw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "string"));
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
	CO = class kw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "null"));
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
	TO = class qw extends In {
		constructor() {
			(super(...arguments), St(this, "kind", "any"));
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
	xO = class ko extends In {
		constructor({ isOptional: n, fields: i }) {
			(super({ isOptional: n }),
				St(this, "fields"),
				St(this, "kind", "object"),
				globalThis.Object.entries(i).forEach(([o, u]) => {
					if ((u === void 0 && cu("v.object()", o), !u.isConvexValidator))
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
			return new ko({ isOptional: "optional", fields: this.fields });
		}
		asOptional() {
			return this.optional();
		}
		omit(...n) {
			const i = { ...this.fields };
			for (const o of n) delete i[o];
			return new ko({ isOptional: this.isOptional, fields: i });
		}
		pick(...n) {
			const i = {};
			for (const o of n) i[o] = this.fields[o];
			return new ko({ isOptional: this.isOptional, fields: i });
		}
		partial() {
			const n = {};
			for (const [i, o] of globalThis.Object.entries(this.fields)) n[i] = o.asOptional();
			return new ko({ isOptional: this.isOptional, fields: n });
		}
		extend(n) {
			return new ko({ isOptional: this.isOptional, fields: { ...this.fields, ...n } });
		}
	},
	OO = class Lw extends In {
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
			return new Lw({ isOptional: "optional", value: this.value });
		}
		asOptional() {
			return this.optional();
		}
	},
	AO = class Uw extends In {
		constructor({ isOptional: n, element: i }) {
			(super({ isOptional: n }),
				St(this, "element"),
				St(this, "kind", "array"),
				i === void 0 && cu("v.array()"),
				(this.element = i));
		}
		get json() {
			return { type: this.kind, value: this.element.json };
		}
		optional() {
			return new Uw({ isOptional: "optional", element: this.element });
		}
		asOptional() {
			return this.optional();
		}
	},
	RO = class Vw extends In {
		constructor({ isOptional: n, key: i, value: o }) {
			if (
				(super({ isOptional: n }),
				St(this, "key"),
				St(this, "value"),
				St(this, "kind", "record"),
				i === void 0 && cu("v.record()", "key"),
				o === void 0 && cu("v.record()", "value"),
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
			return new Vw({ isOptional: "optional", key: this.key, value: this.value });
		}
		asOptional() {
			return this.optional();
		}
	},
	NO = class Bw extends In {
		constructor({ isOptional: n, members: i }) {
			(super({ isOptional: n }),
				St(this, "members"),
				St(this, "kind", "union"),
				i.forEach((o, u) => {
					if ((o === void 0 && cu("v.union()", `member at index ${u}`), !o.isConvexValidator))
						throw new Error("All members of v.union() must be validators");
				}),
				(this.members = i));
		}
		get json() {
			return { type: this.kind, value: this.members.map((n) => n.json) };
		}
		optional() {
			return new Bw({ isOptional: "optional", members: this.members });
		}
		asOptional() {
			return this.optional();
		}
	},
	be = {
		id: (e) => new bO({ isOptional: "required", tableName: e }),
		null: () => new CO({ isOptional: "required" }),
		number: () => new bb({ isOptional: "required" }),
		float64: () => new bb({ isOptional: "required" }),
		bigint: () => new Sb({ isOptional: "required" }),
		int64: () => new Sb({ isOptional: "required" }),
		commitTs: () => new SO({ isOptional: "required" }),
		boolean: () => new wO({ isOptional: "required" }),
		string: () => new _O({ isOptional: "required" }),
		bytes: () => new EO({ isOptional: "required" }),
		literal: (e) => new OO({ isOptional: "required", value: e }),
		array: (e) => new AO({ isOptional: "required", element: e }),
		object: (e) => new xO({ isOptional: "required", fields: e }),
		record: (e, n) => new RO({ isOptional: "required", key: e, value: n }),
		union: (...e) => new NO({ isOptional: "required", members: e }),
		any: () => new TO({ isOptional: "required" }),
		optional: (e) => e.asOptional(),
		nullable: (e) => be.union(e, be.null()),
	},
	MO = Object.defineProperty,
	DO = (e, n, i) => (n in e ? MO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	im = (e, n, i) => DO(e, typeof n != "symbol" ? n + "" : n, i),
	wb,
	Eb,
	zO = Symbol.for("ConvexError"),
	Am = class extends ((Eb = Error), (wb = zO), Eb) {
		constructor(e) {
			(super(typeof e == "string" ? e : Vo(e)),
				im(this, "name", "ConvexError"),
				im(this, "data"),
				im(this, wb, !0),
				(this.data = e));
		}
	},
	_b = "1.47.0",
	IO = Object.defineProperty,
	jO = (e, n, i) => (n in e ? IO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Cb = (e, n, i) => jO(e, typeof n != "symbol" ? n + "" : n, i),
	kO = "color:rgb(0, 145, 255)";
function Pw(e) {
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
var $w = class {
	constructor(e) {
		(Cb(this, "_onLogLineFuncs"), Cb(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function Hw(e) {
	const n = new $w(e);
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
function Zw(e) {
	return new $w(e);
}
function Mc(e, n, i, o, u) {
	const l = Pw(i);
	if ((typeof u == "object" && (u = `ConvexError ${JSON.stringify(u.errorData, null, 2)}`), n === "info")) {
		const f = u.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${l}(${o})] Could not parse console.log`);
			return;
		}
		const h = u.slice(1, f[0].length - 2),
			m = u.slice(f[0].length);
		e.log(`%c[CONVEX ${l}(${o})] [${h}]`, kO, m);
	} else e.error(`[CONVEX ${l}(${o})] ${u}`);
}
function qO(e, n) {
	const i = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(i), new Error(i));
}
function Uo(e, n, i) {
	return `[CONVEX ${Pw(e)}(${n})] ${i.errorMessage}
  Called by client`;
}
function Rm(e, n) {
	return ((n.data = e.errorData), n);
}
function za(e) {
	const n = e.split(":");
	let i, o;
	return (
		n.length === 1 ? ((i = n[0]), (o = "default")) : ((i = n.slice(0, n.length - 1).join(":")), (o = n[n.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${o}`
	);
}
function Ra(e, n) {
	return JSON.stringify({ udfPath: za(e), args: gr(n) });
}
function Tb(e, n, i) {
	const { initialNumItems: o, id: u } = i;
	return JSON.stringify({ type: "paginated", udfPath: za(e), args: gr(n), options: gr({ initialNumItems: o, id: u }) });
}
var LO = Object.defineProperty,
	UO = (e, n, i) => (n in e ? LO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Mr = (e, n, i) => UO(e, typeof n != "symbol" ? n + "" : n, i),
	VO = class {
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
			const u = za(e),
				l = Ra(u, n),
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
			const i = za(e),
				o = Ra(i, n),
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
	BO = Object.defineProperty,
	PO = (e, n, i) => (n in e ? BO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	fc = (e, n, i) => PO(e, typeof n != "symbol" ? n + "" : n, i),
	$O = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				fc(this, "inflightRequests"),
				fc(this, "requestsOlderThanRestart"),
				fc(this, "inflightMutationsCount", 0),
				fc(this, "inflightActionsCount", 0),
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
			for (const h of e.logLines) Mc(this.logger, "info", i, o, h);
			const u = n.status;
			let l, f;
			if (e.success) ((l = { success: !0, logLines: e.logLines, value: Ho(e.result) }), (f = () => u.onResult(l)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Mc(this.logger, "error", i, o, h),
					(l = { success: !1, errorMessage: h, errorData: m !== void 0 ? Ho(m) : void 0, logLines: e.logLines }),
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
	fu = Symbol.for("functionName"),
	Fw = Symbol.for("toReferencePath");
function HO(e) {
	return e[Fw] ?? null;
}
function ZO(e) {
	return e.startsWith("function://");
}
function FO(e) {
	let n;
	if (typeof e == "string") ZO(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[fu]) n = { name: e[fu] };
	else {
		const i = HO(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		n = { reference: i };
	}
	return n;
}
function yn(e) {
	const n = FO(e);
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
	const i = e[fu];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function tg(e) {
	return { [fu]: e };
}
function Qw(e = []) {
	return new Proxy(
		{},
		{
			get(n, i) {
				if (typeof i == "string") return Qw([...e, i]);
				if (i === fu) {
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
var Yw = Qw(),
	QO = Object.defineProperty,
	YO = (e, n, i) => (n in e ? QO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Dc = (e, n, i) => YO(e, typeof n != "symbol" ? n + "" : n, i),
	xb = class Nm {
		constructor(n) {
			(Dc(this, "queryResults"), Dc(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...i) {
			const o = oi(i[0]),
				u = yn(n),
				l = this.queryResults.get(Ra(u, o));
			if (l !== void 0) return Nm.queryValue(l.result);
		}
		getAllQueries(n) {
			const i = [],
				o = yn(n);
			for (const u of this.queryResults.values())
				u.udfPath === za(o) && i.push({ args: u.args, value: Nm.queryValue(u.result) });
			return i;
		}
		setQuery(n, i, o) {
			const u = oi(i),
				l = yn(n),
				f = Ra(l, u);
			let h;
			o === void 0 ? (h = void 0) : (h = { success: !0, value: o, logLines: [] });
			const m = { udfPath: l, args: u, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	KO = class {
		constructor() {
			(Dc(this, "queryResults"),
				Dc(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((l) => !n.has(l.mutationId));
			const i = this.queryResults;
			this.queryResults = new Map(e);
			const o = new xb(this.queryResults);
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
			const i = new xb(this.queryResults);
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
				throw i.errorData !== void 0 ? Rm(i, new Am(Uo("query", n.udfPath, i))) : new Error(Uo("query", n.udfPath, i));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	GO = Object.defineProperty,
	XO = (e, n, i) => (n in e ? GO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	am = (e, n, i) => XO(e, typeof n != "symbol" ? n + "" : n, i),
	Su = class ii {
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
			return isNaN(n) || n < 0 ? Ob : n >= JO ? WO : new ii((n % iu) | 0, (n / iu) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(iu) + BigInt(this.low)).toString();
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
	Ob = new Su(0, 0),
	Ab = 65536,
	iu = Ab * Ab,
	JO = iu * iu,
	WO = new Su(-1, -1),
	eA = Object.defineProperty,
	tA = (e, n, i) => (n in e ? eA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	dc = (e, n, i) => tA(e, typeof n != "symbol" ? n + "" : n, i),
	Rb = class {
		constructor(e, n) {
			(dc(this, "version"),
				dc(this, "remoteQuerySet"),
				dc(this, "queryPath"),
				dc(this, "logger"),
				(this.version = { querySet: 0, ts: Su.fromNumber(0), identity: 0 }),
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
						if (o) for (const l of i.logLines) Mc(this.logger, "info", "query", o, l);
						const u = Ho(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: u, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const o = this.queryPath(i.queryId);
						if (o) for (const l of i.logLines) Mc(this.logger, "info", "query", o, l);
						const { errorData: u } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: u !== void 0 ? Ho(u) : void 0,
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
	const n = uu(e);
	return Su.fromBytesLE(Array.from(n));
}
function nA(e) {
	const n = new Uint8Array(e.toBytesLE());
	return lu(n);
}
function Nb(e) {
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
function rA(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: nA(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
	}
}
var iA = Object.defineProperty,
	aA = (e, n, i) => (n in e ? iA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Vt = (e, n, i) => aA(e, typeof n != "symbol" ? n + "" : n, i),
	oA = 1e3,
	sA = 1001,
	uA = 1005,
	lA = 4040,
	Cc;
function qo() {
	return (
		Cc === void 0 && (Cc = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Cc + performance.now())
	);
}
function Mb() {
	return `t=${Math.round((qo() - Cc) / 100) / 10}s`;
}
var Kw = {
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
function cA(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(Kw)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var fA = class {
	constructor(e, n, i, o, u, l) {
		((this.markConnectionStateDirty = u),
			(this.debug = l),
			Vt(this, "socket"),
			Vt(this, "connectionCount"),
			Vt(this, "_hasEverConnected", !1),
			Vt(this, "lastCloseReason"),
			Vt(this, "transitionChunkBuffer", null),
			Vt(this, "defaultInitialBackoff"),
			Vt(this, "maxBackoff"),
			Vt(this, "retries"),
			Vt(this, "serverInactivityThreshold"),
			Vt(this, "reconnectDueToServerInactivityTimeout"),
			Vt(this, "scheduledReconnect", null),
			Vt(this, "networkOnlineHandler", null),
			Vt(this, "pendingNetworkRecoveryInfo", null),
			Vt(this, "uri"),
			Vt(this, "onOpen"),
			Vt(this, "onResume"),
			Vt(this, "onMessage"),
			Vt(this, "webSocketConstructor"),
			Vt(this, "logger"),
			Vt(this, "onServerDisconnectError"),
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
			const i = Nb(JSON.parse(n));
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
							clientTs: qo(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", Mb(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", Mb())),
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
				let o = Nb(JSON.parse(n.data));
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
					n.code !== oA && n.code !== sA && n.code !== uA && n.code !== lA)
				) {
					let o = `WebSocket closed with code ${n.code}`;
					(n.reason && (o += `: ${n.reason}`),
						this.logger.log(o),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(o));
				}
				const i = cA(n.reason);
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
			const i = rA(e),
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
		const i = qo(),
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
			const n = qo() - this.scheduledReconnect.scheduledAt;
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
							clientTs: qo(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : Kw[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(n, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = qo() - e.clientClockSkew - e.serverTs / 1e6,
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
function dA() {
	return hA();
}
function hA() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var tu = class extends Error {};
tu.prototype.name = "InvalidTokenError";
function mA(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, i) => {
			let o = i.charCodeAt(0).toString(16).toUpperCase();
			return (o.length < 2 && (o = "0" + o), "%" + o);
		}),
	);
}
function gA(e) {
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
		return mA(n);
	} catch {
		return atob(n);
	}
}
function Gw(e, n) {
	if (typeof e != "string") throw new tu("Invalid token specified: must be a string");
	n || (n = {});
	const i = n.header === !0 ? 0 : 1,
		o = e.split(".")[i];
	if (typeof o != "string") throw new tu(`Invalid token specified: missing part #${i + 1}`);
	let u;
	try {
		u = gA(o);
	} catch (l) {
		throw new tu(`Invalid token specified: invalid base64 for part #${i + 1} (${l.message})`);
	}
	try {
		return JSON.parse(u);
	} catch (l) {
		throw new tu(`Invalid token specified: invalid json for part #${i + 1} (${l.message})`);
	}
}
var vA = Object.defineProperty,
	yA = (e, n, i) => (n in e ? vA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Nn = (e, n, i) => yA(e, typeof n != "symbol" ? n + "" : n, i),
	pA = 1728e6,
	Db = 2,
	bA = class {
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= Db))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${Db - this.tokenConfirmationAttempts} attempts remaining`)),
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
			let h = Math.min(pA, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return Gw(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	SA = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function wA(e, n) {
	const i = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function EA(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function _A(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const i of SA) {
		const o = performance
			.getEntriesByName(i)
			.filter((u) => u.entryType === "mark")
			.filter((u) => u.detail.sessionId === e);
		n.push(...o);
	}
	return n.map(EA);
}
var CA = Object.defineProperty,
	TA = (e, n, i) => (n in e ? CA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Bt = (e, n, i) => TA(e, typeof n != "symbol" ? n + "" : n, i),
	xA = class {
		constructor(e, n, i) {
			if (
				(Bt(this, "address"),
				Bt(this, "state"),
				Bt(this, "requestManager"),
				Bt(this, "webSocketManager"),
				Bt(this, "authenticationManager"),
				Bt(this, "remoteQuerySet"),
				Bt(this, "optimisticQueryResults"),
				Bt(this, "_transitionHandlerCounter", 0),
				Bt(this, "_nextRequestId"),
				Bt(this, "_onTransitionFns", new Map()),
				Bt(this, "_sessionId"),
				Bt(this, "firstMessageReceived", !1),
				Bt(this, "debug"),
				Bt(this, "logger"),
				Bt(this, "maxObservedTimestamp"),
				Bt(this, "connectionStateSubscribers", new Map()),
				Bt(this, "nextConnectionStateSubscriberId", 0),
				Bt(this, "_lastPublishedConnectionState"),
				Bt(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const y = this.connectionState();
						if (JSON.stringify(y) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = y;
							for (const w of this.connectionStateSubscribers.values()) w(y);
						}
					});
				}),
				Bt(this, "mark", (y) => {
					this.debug && wA(y, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && iO(e), (i = { ...i }));
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
						? Zw({ verbose: i.verbose ?? !1 })
						: i.logger !== !0 && i.logger
							? i.logger
							: Hw({ verbose: i.verbose ?? !1 })));
			const l = e.search("://");
			if (l === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(l + 3),
				h = e.substring(0, l);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const g = `${m}://${f}/api/${_b}/sync`;
			((this.state = new VO()),
				(this.remoteQuerySet = new Rb((y) => this.state.queryPath(y), this.logger)),
				(this.requestManager = new $O(this.logger, this.markConnectionStateDirty)));
			const p = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new bA(
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
				(this.optimisticQueryResults = new KO()),
				this.addOnTransitionHandler((y) => {
					n(y.queries.map((w) => w.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = dA()));
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
			((this.webSocketManager = new fA(
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
							(this.remoteQuerySet = new Rb((T) => this.state.queryPath(T), this.logger)));
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
								const w = qO(this.logger, y.error);
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
					n = e ? Gw(e.value) : {};
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
				o = Ra(e, i);
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
				o = Ra(e, i);
			return this.optimisticQueryResults.queryLogs(o);
		}
		queryJournal(e, n) {
			const i = oi(n),
				o = Ra(e, i);
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
				throw o.errorData !== void 0 ? Rm(o, new Am(Uo("mutation", e, o))) : new Error(Uo("mutation", e, o));
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
			if (!i.success) throw i.errorData !== void 0 ? Rm(i, new Am(Uo("action", e, i))) : new Error(Uo("action", e, i));
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
				const e = _A(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${_b}` },
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
var OA = Object.defineProperty,
	AA = (e, n, i) => (n in e ? OA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	zb = (e, n, i) => AA(e, typeof n != "symbol" ? n + "" : n, i),
	RA = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				zb(this, "paginatedQuerySet", new Map()),
				zb(this, "lastTransitionTs"),
				(this.lastTransitionTs = Su.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, n, i) {
			const o = za(e),
				u = Tb(o, n, i),
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
			const o = za(e),
				u = Tb(o, n, i);
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
	_ = Gx(ef(), 1);
function Xw({ getCurrentValue: e, subscribe: n }) {
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
var NA = Object.defineProperty,
	MA = (e, n, i) => (n in e ? NA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	ri = (e, n, i) => MA(e, typeof n != "symbol" ? n + "" : n, i),
	DA = 5e3;
if (typeof _.default > "u") throw new Error("Required dependency 'react' not found");
function Jw(e, n, i) {
	function o(u) {
		return (kA(u), n.mutation(e, u, { optimisticUpdate: i }));
	}
	return (
		(o.withOptimisticUpdate = function (l) {
			if (i !== void 0) throw new Error(`Already specified optimistic update for mutation ${yn(e)}`);
			return Jw(e, n, l);
		}),
		o
	);
}
function zA(e, n) {
	return function (i) {
		return n.action(e, i);
	};
}
var Ww = class {
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
						? Zw({ verbose: n?.verbose ?? !1 })
						: n?.logger !== !0 && n?.logger
							? n.logger
							: Hw({ verbose: n?.verbose ?? !1 })),
				(this.options = { ...n, logger: this._logger }));
		}
		get url() {
			return this.address;
		}
		get sync() {
			if (this.closed) throw new Error("ConvexReactClient has already been closed.");
			return this.cachedSync
				? this.cachedSync
				: ((this.cachedSync = this.options.baseClient ?? new xA(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new RA(this.cachedSync, (e) => this.handleTransition(e))),
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
			const n = e.extendSubscriptionFor ?? DA,
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
	wu = _.createContext(void 0);
function Va() {
	return (0, _.useContext)(wu);
}
var IA = ({ client: e, children: n }) => _.createElement(wu.Provider, { value: e }, n);
function Bo(e, ...n) {
	const i = n[0] === "skip",
		o = n[0] === "skip" ? {} : oi(n[0]),
		u = typeof e == "string" ? tg(e) : e,
		l = yn(u),
		f = (0, _.useMemo)(() => (i ? {} : { query: { query: u, args: o } }), [JSON.stringify(gr(o)), l, i]),
		h = ng(f).query;
	if (h instanceof Error) throw h;
	return h;
}
function Na(e) {
	const n = typeof e == "string" ? tg(e) : e,
		i = (0, _.useContext)(wu);
	if (i === void 0)
		throw new Error(
			"Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, _.useMemo)(() => Jw(n, i), [i, yn(n)]);
}
function eE(e) {
	const n = (0, _.useContext)(wu),
		i = typeof e == "string" ? tg(e) : e;
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, _.useMemo)(() => zA(i, n), [n, yn(i)]);
}
function jA() {
	const e = (0, _.useContext)(wu);
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
	return Xw({ getCurrentValue: n, subscribe: i });
}
function kA(e) {
	if (typeof e == "object" && e !== null && "bubbles" in e && "persist" in e && "isDefaultPrevented" in e)
		throw new Error(
			"Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like `const handler = () => myMutation();` and using `handler` in the event handler.",
		);
}
var qA = Object.defineProperty,
	LA = (e, n, i) => (n in e ? qA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	um = (e, n, i) => LA(e, typeof n != "symbol" ? n + "" : n, i),
	UA = class {
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
function ng(e) {
	const n = Va();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return VA(
		e,
		(0, _.useMemo)(
			() =>
				(i, o, { journal: u, paginationOptions: l }) =>
					l ? n.watchPaginatedQuery(i, o, l) : n.watchQuery(i, o, u ? { journal: u } : {}),
			[n],
		),
	);
}
function VA(e, n) {
	const [i] = (0, _.useState)(() => new UA(n));
	(i.createWatch !== n && i.setCreateWatch(n), (0, _.useEffect)(() => () => i.destroy(), [i]));
	const o = (0, _.useMemo)(
		() => ({ getCurrentValue: () => i.getLocalResults(e), subscribe: (u) => (i.setQueries(e), i.subscribe(u)) }),
		[i, e],
	);
	return Xw(o);
}
function tE(e, n) {
	return new Proxy(
		{},
		{
			get(i, o) {
				if (typeof o == "string") return tE(e, [...n, o]);
				if (o === Fw) {
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
var BA = () => tE("components", []),
	PA = Yw,
	Ib = 6e4,
	$A = 500,
	HA = 1e4,
	ZA = 1e3,
	FA = 3e4,
	QA = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function jb(e) {
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
function kb(e) {
	const n = document.documentElement;
	for (const [i, o] of Object.entries(e.tokens)) n.style.setProperty(i, o);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function YA(e) {
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
function KA() {
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
	if (!QA.test(l)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: u, nonce: l };
}
async function GA() {
	const { parentOrigin: e, nonce: n } = KA();
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
		return Date.now() >= u - Ib ? w() : o;
	}
	function w() {
		if (b) return b;
		const N = crypto.randomUUID();
		return (
			(b = new Promise((D, z) => {
				const O = setTimeout(() => {
					(p.delete(N), z(new Error("Plugin frame token refresh timed out")));
				}, HA);
				p.set(N, { resolve: D, reject: z, timeout: O });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: N }, e);
				} catch (U) {
					(clearTimeout(O), p.delete(N), z(U));
				}
			}).finally(() => {
				b = null;
			})),
			b
		);
	}
	const E = () => l !== "" && Date.now() < f - Ib,
		T = (N) => {
			typeof N.jwt == "string" && typeof N.jwtExpiresAt == "number" && Number.isFinite(N.jwtExpiresAt)
				? ((l = N.jwt), (f = N.jwtExpiresAt))
				: ((l = ""), (f = 0));
		};
	async function x(N, D, z) {
		const O = JSON.stringify(D),
			U = (P) => {
				const F = new Headers(z?.headers);
				return (
					F.set("Authorization", `Bearer ${P}`),
					F.set("Content-Type", "application/json"),
					F.set("Accept", "application/json"),
					fetch(i + N, { ...z, method: "POST", body: O, headers: F, redirect: "error" })
				);
			},
			H = await y();
		let re = await U(H);
		re.status === 401 && (re = await U(o !== H ? o : await w()));
		const R = await re.text();
		let q = null;
		try {
			q = JSON.parse(R);
		} catch {}
		return { status: re.status, body: q };
	}
	async function j(N) {
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
		for (let z = 0; ; z += 1) {
			if (E() && !D) return l;
			let O = null;
			try {
				if (l !== "" && (await w(), E())) return l;
				((O = await M(await y())), O.status === 401 && (O = await M(await w())));
			} catch {
				O = null;
			}
			if (O?.ok) {
				const U = await O.json().catch(() => null),
					H = U?._yay?.jwt,
					re = U?._yay?.sessionExpiresAt;
				return typeof H != "string" || typeof re != "number" ? null : ((u = re), (l = H), (f = re), H);
			}
			if (!(O === null || O.status === 429 || O.status >= 500) || z >= 2) return null;
			await new Promise((U) => setTimeout(U, 1e3 * (z + 1)));
		}
	}
	return new Promise((N) => {
		let D = !1,
			z;
		const O = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			U = () => {
				clearInterval(z);
			},
			H = (re) => {
				if (re.source !== window.parent || re.origin !== e) return;
				const R = re.data;
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
						YA(R.context)
					) {
						((D = !0),
							U(),
							window.removeEventListener("pagehide", U),
							(i = R.apiOrigin),
							(o = R.token),
							(u = R.tokenExpiresAt),
							T(R));
						const q = new Ww(R.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let P = Date.now();
						const F = setInterval(() => {
							const Y = Date.now();
							(Y - P >= FA && q.setAuth(A), (P = Y));
						}, ZA);
						(q.setAuth(A),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(F), q.close());
								},
								{ once: !0 },
							),
							(h = jb(R.theme)),
							h && kb(h),
							N({
								context: R.context,
								apiOrigin: i,
								getToken: y,
								refreshToken: w,
								fetchJson: x,
								authorize: j,
								convex: q,
								api: PA,
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
						const q = jb(R.theme);
						if (q) {
							((h = q), kb(q));
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
			window.addEventListener("pagehide", U, { once: !0 }),
			O(),
			(z = setInterval(O, $A)));
	});
}
var XA = sr((e) => {
		function n(B, te) {
			var ne = B.length;
			B.push(te);
			e: for (; 0 < ne;) {
				var L = (ne - 1) >>> 1,
					ee = B[L];
				if (0 < u(ee, te)) ((B[L] = te), (B[ne] = ee), (ne = L));
				else break e;
			}
		}
		function i(B) {
			return B.length === 0 ? null : B[0];
		}
		function o(B) {
			if (B.length === 0) return null;
			var te = B[0],
				ne = B.pop();
			if (ne !== te) {
				B[0] = ne;
				e: for (var L = 0, ee = B.length, K = ee >>> 1; L < K;) {
					var se = 2 * (L + 1) - 1,
						xe = B[se],
						ge = se + 1,
						k = B[ge];
					if (0 > u(xe, ne))
						ge < ee && 0 > u(k, xe) ? ((B[L] = k), (B[ge] = ne), (L = ge)) : ((B[L] = xe), (B[se] = ne), (L = se));
					else if (ge < ee && 0 > u(k, ne)) ((B[L] = k), (B[ge] = ne), (L = ge));
					else break e;
				}
			}
			return te;
		}
		function u(B, te) {
			var ne = B.sortIndex - te.sortIndex;
			return ne !== 0 ? ne : B.id - te.id;
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
			j = typeof setTimeout == "function" ? setTimeout : null,
			M = typeof clearTimeout == "function" ? clearTimeout : null,
			A = typeof setImmediate < "u" ? setImmediate : null;
		function N(B) {
			for (var te = i(g); te !== null;) {
				if (te.callback === null) o(g);
				else if (te.startTime <= B) (o(g), (te.sortIndex = te.expirationTime), n(m, te));
				else break;
				te = i(g);
			}
		}
		function D(B) {
			if (((T = !1), N(B), !E))
				if (i(m) !== null) ((E = !0), z || ((z = !0), q()));
				else {
					var te = i(g);
					te !== null && Y(D, te.startTime - B);
				}
		}
		var z = !1,
			O = -1,
			U = 5,
			H = -1;
		function re() {
			return x ? !0 : !(e.unstable_now() - H < U);
		}
		function R() {
			if (((x = !1), z)) {
				var B = e.unstable_now();
				H = B;
				var te = !0;
				try {
					e: {
						((E = !1), T && ((T = !1), M(O), (O = -1)), (w = !0));
						var ne = y;
						try {
							t: {
								for (N(B), b = i(m); b !== null && !(b.expirationTime > B && re());) {
									var L = b.callback;
									if (typeof L == "function") {
										((b.callback = null), (y = b.priorityLevel));
										var ee = L(b.expirationTime <= B);
										if (((B = e.unstable_now()), typeof ee == "function")) {
											((b.callback = ee), N(B), (te = !0));
											break t;
										}
										(b === i(m) && o(m), N(B));
									} else o(m);
									b = i(m);
								}
								if (b !== null) te = !0;
								else {
									var K = i(g);
									(K !== null && Y(D, K.startTime - B), (te = !1));
								}
							}
							break e;
						} finally {
							((b = null), (y = ne), (w = !1));
						}
						te = void 0;
					}
				} finally {
					te ? q() : (z = !1);
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
				j(R, 0);
			};
		function Y(B, te) {
			O = j(function () {
				B(e.unstable_now());
			}, te);
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
					: (U = 0 < B ? Math.floor(1e3 / B) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return y;
			}),
			(e.unstable_next = function (B) {
				switch (y) {
					case 1:
					case 2:
					case 3:
						var te = 3;
						break;
					default:
						te = y;
				}
				var ne = y;
				y = te;
				try {
					return B();
				} finally {
					y = ne;
				}
			}),
			(e.unstable_requestPaint = function () {
				x = !0;
			}),
			(e.unstable_runWithPriority = function (B, te) {
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
				var ne = y;
				y = B;
				try {
					return te();
				} finally {
					y = ne;
				}
			}),
			(e.unstable_scheduleCallback = function (B, te, ne) {
				var L = e.unstable_now();
				switch (
					(typeof ne == "object" && ne !== null
						? ((ne = ne.delay), (ne = typeof ne == "number" && 0 < ne ? L + ne : L))
						: (ne = L),
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
					(ee = ne + ee),
					(B = { id: p++, callback: te, priorityLevel: B, startTime: ne, expirationTime: ee, sortIndex: -1 }),
					ne > L
						? ((B.sortIndex = ne),
							n(g, B),
							i(m) === null && B === i(g) && (T ? (M(O), (O = -1)) : (T = !0), Y(D, ne - L)))
						: ((B.sortIndex = ee), n(m, B), E || w || ((E = !0), z || ((z = !0), q()))),
					B
				);
			}),
			(e.unstable_shouldYield = re),
			(e.unstable_wrapCallback = function (B) {
				var te = y;
				return function () {
					var ne = y;
					y = te;
					try {
						return B.apply(this, arguments);
					} finally {
						y = ne;
					}
				};
			}));
	}),
	JA = sr((e, n) => {
		n.exports = XA();
	}),
	WA = sr((e) => {
		var n = ef();
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
	nE = sr((e, n) => {
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
		(i(), (n.exports = WA()));
	}),
	eR = sr((e) => {
		var n = JA(),
			i = ef(),
			o = nE();
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
		function j(t) {
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
		function z(t) {
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
		var U = Object.assign,
			H = Symbol.for("react.element"),
			re = Symbol.for("react.transitional.element"),
			R = Symbol.for("react.portal"),
			q = Symbol.for("react.fragment"),
			P = Symbol.for("react.strict_mode"),
			F = Symbol.for("react.profiler"),
			Y = Symbol.for("react.consumer"),
			B = Symbol.for("react.context"),
			te = Symbol.for("react.forward_ref"),
			ne = Symbol.for("react.suspense"),
			L = Symbol.for("react.suspense_list"),
			ee = Symbol.for("react.memo"),
			K = Symbol.for("react.lazy"),
			se = Symbol.for("react.activity"),
			xe = Symbol.for("react.legacy_hidden"),
			ge = Symbol.for("react.memo_cache_sentinel"),
			k = Symbol.for("react.view_transition"),
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
				case ne:
					return "Suspense";
				case L:
					return "SuspenseList";
				case se:
					return "Activity";
				case k:
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
					case te:
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
			ve = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
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
					t = (t = r.documentElement) && (t = t.namespaceURI) ? Rp(t) : 0;
					break;
				default:
					if (((t = r.tagName), (r = r.namespaceURI))) ((r = Rp(r)), (t = Np(r, t)));
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
		function jt(t) {
			var r = t.memoizedState;
			(r !== null && ((Do._currentValue = r.memoizedState), Ue(Fn, t)), (r = Qe.current));
			var a = Np(r, t.type);
			r !== a && (Ue(dn, t), Ue(Qe, a));
		}
		function hn(t) {
			(dn.current === t && (et(Qe), et(dn)), Fn.current === t && (et(Fn), (Do._currentValue = Ge)));
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
		function Wi(t, r) {
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
		function Za(t) {
			try {
				var r = "",
					a = null;
				do ((r += Wi(t, a)), (a = t), (t = t.return));
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
		var ea = Object.prototype.hasOwnProperty,
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
		function ye(t) {
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
			Vu = 262144,
			Bu = 4194304;
		function ta(t) {
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
		function Pu(t, r, a) {
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
						s !== 0 ? (c = ta(s)) : ((v &= C), v !== 0 ? (c = ta(v)) : a || ((a = C & ~t), a !== 0 && (c = ta(a)))))
					: ((C = s & ~d), C !== 0 ? (c = ta(C)) : v !== 0 ? (c = ta(v)) : a || ((a = s & ~t), a !== 0 && (c = ta(a)))),
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
		function as(t, r) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
		}
		function nv(t, r) {
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
		function hC(t, r) {
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
		function rv() {
			var t = Bu;
			return ((Bu <<= 1), (Bu & 62914560) === 0 && (Bu = 4194304), t);
		}
		function Rf(t) {
			for (var r = [], a = 0; 31 > a; a++) r.push(t);
			return r;
		}
		function $u(t, r) {
			((t.pendingLanes |= r), r !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function mC(t, r, a, s, c, d) {
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
			(s !== 0 && iv(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(v & ~r)));
		}
		function iv(t, r, a) {
			((t.pendingLanes |= r), (t.suspendedLanes &= ~r));
			var s = 31 - Me(r);
			((t.entangledLanes |= r), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930)));
		}
		function av(t, r) {
			var a = (t.entangledLanes |= r);
			for (t = t.entanglements; a;) {
				var s = 31 - Me(a),
					c = 1 << s;
				((c & r) | (t[s] & r) && (t[s] |= r), (a &= ~c));
			}
		}
		function ov(t, r) {
			var a = r & -r;
			return ((a = (a & 42) !== 0 ? 1 : sv(a)), (a & (t.suspendedLanes | r)) !== 0 ? 0 : a);
		}
		function sv(t) {
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
		function uv() {
			var t = ve.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : db(t.type));
		}
		function lv(t, r) {
			var a = ve.p;
			try {
				return ((ve.p = t), r());
			} finally {
				ve.p = a;
			}
		}
		var Br = Math.random().toString(36).slice(2),
			nn = "__reactFiber$" + Br,
			Cn = "__reactProps$" + Br,
			os = "__reactContainer$" + Br,
			cv = "__reactEvents$" + Br,
			gC = "__reactListeners$" + Br,
			vC = "__reactHandles$" + Br,
			fv = "__reactResources$" + Br,
			ss = "__reactMarker$" + Br,
			Hu = "__reactLoad$" + Br;
		function Zu(t) {
			(delete t[nn], delete t[Cn], delete t[gC], delete t[vC]);
		}
		function na(t) {
			var r;
			if ((r = t[nn])) return r;
			for (var a = t.parentNode; a;) {
				if ((r = a[os] || a[nn])) {
					if (((a = r.alternate), r.child !== null || (a !== null && a.child !== null)))
						for (t = Yp(t); t !== null;) {
							if ((a = t[nn])) return a;
							t = Yp(t);
						}
					return r;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function Fa(t) {
			if ((t = t[nn] || t[os])) {
				var r = t.tag;
				if (r === 5 || r === 6 || r === 13 || r === 31 || r === 26 || r === 27 || r === 3) return t;
			}
			return null;
		}
		function us(t) {
			var r = t.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return t.stateNode;
			throw Error(u(33));
		}
		function Qa(t) {
			var r = t[fv];
			return (r || (r = t[fv] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), r);
		}
		function Kt(t) {
			t[ss] = !0;
		}
		function dv(t) {
			t[Hu] = void 0;
		}
		var hv = new Set(),
			mv = {};
		function ra(t, r) {
			(Ya(t, r), Ya(t + "Capture", r));
		}
		function Ya(t, r) {
			for (mv[t] = r, t = 0; t < r.length; t++) hv.add(r[t]);
		}
		var yC = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			gv = {},
			vv = {};
		function pC(t) {
			return ea.call(vv, t) ? !0 : ea.call(gv, t) ? !1 : yC.test(t) ? (vv[t] = !0) : ((gv[t] = !0), !1);
		}
		var Xe = !1;
		function yv() {
			var t = Xe;
			return ((Xe = !1), t);
		}
		function Fu(t, r, a) {
			if (pC(r))
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
		function Qu(t, r, a) {
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
		function pv(t) {
			var r = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
		}
		function bC(t, r, a) {
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
				var r = pv(t) ? "checked" : "value";
				t._valueTracker = bC(t, r, "" + t[r]);
			}
		}
		function bv(t) {
			if (!t) return !1;
			var r = t._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				s = "";
			return (t && (s = pv(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== a ? (r.setValue(t), !0) : !1);
		}
		var SC = /[\n"\\]/g;
		function Yn(t) {
			return t.replace(SC, function (r) {
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
		function Sv(t, r, a, s, c, d, v, C) {
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
		function Ka(t, r, a, s) {
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
		function wv(t, r, a) {
			if (r != null && ((r = "" + qn(r)), r !== t.value && (t.value = r), a == null)) {
				t.defaultValue !== r && (t.defaultValue = r);
				return;
			}
			t.defaultValue = a != null ? "" + qn(a) : "";
		}
		function Ev(t, r, a, s) {
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
		function Ga(t, r) {
			if (r) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = r;
					return;
				}
			}
			t.textContent = r;
		}
		var wC = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function _v(t, r, a) {
			var s = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? s
					? t.setProperty(r, "")
					: r === "float"
						? (t.cssFloat = "")
						: (t[r] = "")
				: s
					? t.setProperty(r, a)
					: typeof a != "number" || a === 0 || wC.has(r)
						? r === "float"
							? (t.cssFloat = a)
							: (t[r] = ("" + a).trim())
						: (t[r] = a + "px");
		}
		function Cv(t, r, a) {
			if (r != null && typeof r != "object") throw Error(u(62));
			if (((t = t.style), a != null)) {
				for (var s in a)
					!a.hasOwnProperty(s) ||
						(r != null && r.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""), (Xe = !0));
				for (var c in r) ((s = r[c]), r.hasOwnProperty(c) && a[c] !== s && (_v(t, c, s), (Xe = !0)));
			} else for (var d in r) r.hasOwnProperty(d) && _v(t, d, r[d]);
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
		var EC = new Map([
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
			_C =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Yu(t) {
			return _C.test("" + t)
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
		var Xa = null,
			Ja = null;
		function Tv(t) {
			var r = Fa(t);
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
							for (r = 0; r < a.length; r++) ((s = a[r]), s.form === t.form && bv(s));
						}
						break e;
					case "textarea":
						wv(t, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && Ka(t, !!a.multiple, r, !1));
				}
			}
		}
		var qf = !1;
		function xv(t, r, a) {
			if (qf) return t(r, a);
			qf = !0;
			try {
				return t(r);
			} finally {
				if (((qf = !1), (Xa !== null || Ja !== null) && (Yl(), Xa && ((r = Xa), (t = Ja), (Ja = Xa = null), Tv(r), t))))
					for (r = 0; r < t.length; r++) Tv(t[r]);
			}
		}
		function ls(t, r) {
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
				var cs = {};
				(Object.defineProperty(cs, "passive", {
					get: function () {
						Lf = !0;
					},
				}),
					window.addEventListener("test", cs, cs),
					window.removeEventListener("test", cs, cs));
			} catch {
				Lf = !1;
			}
		var yi = null,
			Uf = null,
			Ku = null;
		function Ov() {
			if (Ku) return Ku;
			var t,
				r = Uf,
				a = r.length,
				s,
				c = "value" in yi ? yi.value : yi.textContent,
				d = c.length;
			for (t = 0; t < a && r[t] === c[t]; t++);
			var v = a - t;
			for (s = 1; s <= v && r[a - s] === c[d - s]; s++);
			return (Ku = c.slice(t, 1 < s ? 1 - s : void 0));
		}
		function Gu(t) {
			var r = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && r === 13 && (t = 13)) : (t = r),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Xu() {
			return !0;
		}
		function Av() {
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
						? Xu
						: Av),
					(this.isPropagationStopped = Av),
					this
				);
			}
			return (
				U(r.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var a = this.nativeEvent;
						a &&
							(a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1),
							(this.isDefaultPrevented = Xu));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Xu));
					},
					persist: function () {},
					isPersistent: Xu,
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
			Ju = bn(pi),
			fs = U({}, pi, { view: 0, detail: 0 }),
			CC = bn(fs),
			Vf,
			Bf,
			ds,
			Wu = U({}, fs, {
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
						: (t !== ds &&
								(ds && t.type === "mousemove"
									? ((Vf = t.screenX - ds.screenX), (Bf = t.screenY - ds.screenY))
									: (Bf = Vf = 0),
								(ds = t)),
							Vf);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : Bf;
				},
			}),
			Rv = bn(Wu),
			TC = bn(U({}, Wu, { dataTransfer: 0 })),
			Pf = bn(U({}, fs, { relatedTarget: 0 })),
			xC = bn(U({}, pi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			OC = bn(
				U({}, pi, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Nv = bn(U({}, pi, { data: 0 })),
			AC = {
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
			RC = {
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
			NC = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function MC(t) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(t) : (t = NC[t]) ? !!r[t] : !1;
		}
		function $f() {
			return MC;
		}
		var DC = bn(
				U({}, fs, {
					key: function (t) {
						if (t.key) {
							var r = AC[t.key] || t.key;
							if (r !== "Unidentified") return r;
						}
						return t.type === "keypress"
							? ((t = Gu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? RC[t.keyCode] || "Unidentified"
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
						return t.type === "keypress" ? Gu(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Gu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Mv = bn(
				U({}, Wu, {
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
			zC = bn(U({}, pi, { submitter: 0 })),
			IC = bn(
				U({}, fs, {
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
			jC = bn(U({}, pi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			kC = bn(
				U({}, Wu, {
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
			qC = bn(U({}, pi, { newState: 0, oldState: 0, source: 0 })),
			LC = [9, 13, 27, 32],
			Hf = $r && "CompositionEvent" in window,
			hs = null;
		$r && "documentMode" in document && (hs = document.documentMode);
		var UC = $r && "TextEvent" in window && !hs,
			Dv = $r && (!Hf || (hs && 8 < hs && 11 >= hs)),
			zv = " ",
			Iv = !1;
		function jv(t, r) {
			switch (t) {
				case "keyup":
					return LC.indexOf(r.keyCode) !== -1;
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
		function kv(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var Wa = !1;
		function VC(t, r) {
			switch (t) {
				case "compositionend":
					return kv(r);
				case "keypress":
					return r.which !== 32 ? null : ((Iv = !0), zv);
				case "textInput":
					return ((t = r.data), t === zv && Iv ? null : t);
				default:
					return null;
			}
		}
		function BC(t, r) {
			if (Wa)
				return t === "compositionend" || (!Hf && jv(t, r)) ? ((t = Ov()), (Ku = Uf = yi = null), (Wa = !1), t) : null;
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
					return Dv && r.locale !== "ko" ? null : r.data;
				default:
					return null;
			}
		}
		var PC = {
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
		function qv(t) {
			var r = t && t.nodeName && t.nodeName.toLowerCase();
			return r === "input" ? !!PC[t.type] : r === "textarea";
		}
		function Lv(t, r, a, s) {
			(Xa ? (Ja ? Ja.push(s) : (Ja = [s])) : (Xa = s),
				(r = ec(r, "onChange")),
				0 < r.length && ((a = new Ju("onChange", "change", null, a, s)), t.push({ event: a, listeners: r })));
		}
		var ms = null,
			gs = null;
		function $C(t) {
			Ep(t, 0);
		}
		function el(t) {
			if (bv(us(t))) return t;
		}
		function Uv(t, r) {
			if (t === "change") return r;
		}
		var Vv = !1;
		if ($r) {
			var Zf;
			if ($r) {
				var Ff = "oninput" in document;
				if (!Ff) {
					var Bv = document.createElement("div");
					(Bv.setAttribute("oninput", "return;"), (Ff = typeof Bv.oninput == "function"));
				}
				Zf = Ff;
			} else Zf = !1;
			Vv = Zf && (!document.documentMode || 9 < document.documentMode);
		}
		function Pv() {
			ms && (ms.detachEvent("onpropertychange", $v), (gs = ms = null));
		}
		function $v(t) {
			if (t.propertyName === "value" && el(gs)) {
				var r = [];
				(Lv(r, gs, t, kf(t)), xv($C, r));
			}
		}
		function HC(t, r, a) {
			t === "focusin" ? (Pv(), (ms = r), (gs = a), ms.attachEvent("onpropertychange", $v)) : t === "focusout" && Pv();
		}
		function ZC(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return el(gs);
		}
		function FC(t, r) {
			if (t === "click") return el(r);
		}
		function QC(t, r) {
			if (t === "input" || t === "change") return el(r);
		}
		function YC(t, r) {
			return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
		}
		var Ln = typeof Object.is == "function" ? Object.is : YC;
		function vs(t, r) {
			if (Ln(t, r)) return !0;
			if (typeof t != "object" || t === null || typeof r != "object" || r === null) return !1;
			var a = Object.keys(t),
				s = Object.keys(r);
			if (a.length !== s.length) return !1;
			for (s = 0; s < a.length; s++) {
				var c = a[s];
				if (!ea.call(r, c) || !Ln(t[c], r[c])) return !1;
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
		function Hv(t) {
			for (; t && t.firstChild;) t = t.firstChild;
			return t;
		}
		function Zv(t, r) {
			var a = Hv(t);
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
				a = Hv(a);
			}
		}
		function Fv(t, r) {
			return t && r
				? t === r
					? !0
					: t && t.nodeType === 3
						? !1
						: r && r.nodeType === 3
							? Fv(t, r.parentNode)
							: "contains" in t
								? t.contains(r)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(r) & 16)
									: !1
				: !1;
		}
		function Qv(t) {
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
		var KC = $r && "documentMode" in document && 11 >= document.documentMode,
			eo = null,
			Kf = null,
			ys = null,
			Gf = !1;
		function Yv(t, r, a) {
			var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			Gf ||
				eo == null ||
				eo !== Qf(s) ||
				((s = eo),
				"selectionStart" in s && Yf(s)
					? (s = { start: s.selectionStart, end: s.selectionEnd })
					: ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
						(s = {
							anchorNode: s.anchorNode,
							anchorOffset: s.anchorOffset,
							focusNode: s.focusNode,
							focusOffset: s.focusOffset,
						})),
				(ys && vs(ys, s)) ||
					((ys = s),
					(s = ec(Kf, "onSelect")),
					0 < s.length &&
						((r = new Ju("onSelect", "select", null, r, a)), t.push({ event: r, listeners: s }), (r.target = eo))));
		}
		function ia(t, r) {
			var a = {};
			return ((a[t.toLowerCase()] = r.toLowerCase()), (a["Webkit" + t] = "webkit" + r), (a["Moz" + t] = "moz" + r), a);
		}
		var to = {
				animationend: ia("Animation", "AnimationEnd"),
				animationiteration: ia("Animation", "AnimationIteration"),
				animationstart: ia("Animation", "AnimationStart"),
				transitionrun: ia("Transition", "TransitionRun"),
				transitionstart: ia("Transition", "TransitionStart"),
				transitioncancel: ia("Transition", "TransitionCancel"),
				transitionend: ia("Transition", "TransitionEnd"),
			},
			Xf = {},
			Kv = {};
		$r &&
			((Kv = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete to.animationend.animation, delete to.animationiteration.animation, delete to.animationstart.animation),
			"TransitionEvent" in window || delete to.transitionend.transition);
		function aa(t) {
			if (Xf[t]) return Xf[t];
			if (!to[t]) return t;
			var r = to[t],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in Kv) return (Xf[t] = r[a]);
			return t;
		}
		var Gv = aa("animationend"),
			Xv = aa("animationiteration"),
			Jv = aa("animationstart"),
			GC = aa("transitionrun"),
			XC = aa("transitionstart"),
			JC = aa("transitioncancel"),
			Wv = aa("transitionend"),
			ey = new Map(),
			Jf =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		Jf.push("scrollEnd");
		function lr(t, r) {
			(ey.set(t, r), ra(r, [t]));
		}
		var WC = 0;
		function Hr(t, r) {
			if (t.name != null && t.name !== "auto") return t.name;
			if (r.autoName !== null) return r.autoName;
			t = hr.identifierPrefix;
			var a = WC++;
			return ((t = "_" + t + "t_" + a.toString(32) + "_"), (r.autoName = t));
		}
		function ty(t) {
			if (t == null || typeof t == "string") return t;
			var r = null,
				a = Eo;
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
			return ((t = ty(t)), (r = ty(r)), r == null ? (t === "auto" ? null : t) : r === "auto" ? null : r);
		}
		var tl =
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
			no = 0,
			Wf = 0;
		function nl() {
			for (var t = no, r = (Wf = no = 0); r < t;) {
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
				d !== 0 && ny(a, c, d);
			}
		}
		function rl(t, r, a, s) {
			((Kn[no++] = t),
				(Kn[no++] = r),
				(Kn[no++] = a),
				(Kn[no++] = s),
				(Wf |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function ed(t, r, a, s) {
			return (rl(t, r, a, s), il(t));
		}
		function oa(t, r) {
			return (rl(t, null, null, r), il(t));
		}
		function ny(t, r, a) {
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
		function il(t) {
			if (50 < Us) throw ((Us = 0), (Ql = null), Error(u(185)));
			for (var r = t.return; r !== null;) ((t = r), (r = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var ro = {};
		function eT(t, r, a, s) {
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
			return new eT(t, r, a, s);
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
		function ry(t, r) {
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
		function al(t, r, a, s, c, d) {
			var v = 0;
			if (((s = t), typeof s == "function")) td(s) && (v = 1);
			else if (typeof s == "string")
				v = Rx(t, a, Qe.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (s) {
					case se:
						return ((t = Tn(31, a, r, c)), (t.elementType = se), (t.lanes = d), t);
					case q:
						return sa(a.children, c, d, r);
					case P:
						((v = 8), (c |= 24));
						break;
					case F:
						return ((t = Tn(12, a, r, c | 2)), (t.elementType = F), (t.lanes = d), t);
					case ne:
						return ((t = Tn(13, a, r, c)), (t.elementType = ne), (t.lanes = d), t);
					case L:
						return ((t = Tn(19, a, r, c)), (t.elementType = L), (t.lanes = d), t);
					case xe:
					case k:
						return (
							(t = c | 32),
							(t = Tn(30, a, r, t)),
							(t.elementType = k),
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
								case te:
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
		function sa(t, r, a, s) {
			return ((t = Tn(7, t, s, r)), (t.lanes = a), t);
		}
		function nd(t, r, a) {
			return ((t = Tn(6, t, null, r)), (t.lanes = a), t);
		}
		function iy(t) {
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
		var ay = new WeakMap();
		function Gn(t, r) {
			if (typeof t == "object" && t !== null) {
				var a = ay.get(t);
				return a !== void 0 ? a : ((r = { value: t, source: r, stack: Za(r) }), ay.set(t, r), r);
			}
			return { value: t, source: r, stack: Za(r) };
		}
		var io = [],
			ao = 0,
			ol = null,
			ps = 0,
			Xn = [],
			Jn = 0,
			bi = null,
			Er = 1,
			_r = "";
		function Qr(t, r) {
			((io[ao++] = ps), (io[ao++] = ol), (ol = t), (ps = r));
		}
		function oy(t, r, a) {
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
		function sl(t) {
			t.return !== null && (Qr(t, 1), oy(t, 1, 0));
		}
		function id(t) {
			for (; t === ol;) ((ol = io[--ao]), (io[ao] = null), (ps = io[--ao]), (io[ao] = null));
			for (; t === bi;)
				((bi = Xn[--Jn]), (Xn[Jn] = null), (_r = Xn[--Jn]), (Xn[Jn] = null), (Er = Xn[--Jn]), (Xn[Jn] = null));
		}
		function sy(t, r) {
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
				bs(Gn(Error(u(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				ad
			);
		}
		function uy(t) {
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
					for (a = 0; a < Bs.length; a++) $e(Bs[a], r);
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
					($e("invalid", r), Sv(r, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					$e("invalid", r);
					break;
				case "textarea":
					($e("invalid", r), Ev(r, s.value, s.defaultValue, s.children));
			}
			((a = s.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				s.suppressHydrationWarning === !0 ||
				Op(r.textContent, a)
					? (s.popover != null && ($e("beforetoggle", r), $e("toggle", r)),
						s.onScroll != null && $e("scroll", r),
						s.onScrollEnd != null && $e("scrollend", r),
						s.onClick != null && (r.onclick = wr),
						(r = !0))
					: (r = !1),
				r || wi(t, !0));
		}
		function ul(t) {
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
		function oo(t) {
			if (t !== Gt) return !1;
			if (!Ve) return (ul(t), (Ve = !0), !1);
			var r = t.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || Ih(t.type, t.memoizedProps))),
					(a = !a)),
				a && gt && wi(t),
				ul(t),
				r === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(317));
				gt = Qp(t);
			} else if (r === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(317));
				gt = Qp(t);
			} else
				r === 27
					? ((r = gt), ji(t.type) ? ((t = $h), ($h = null), (gt = t)) : (gt = r))
					: (gt = Gt ? nr(t.stateNode.nextSibling) : null);
			return !0;
		}
		function ua() {
			((gt = Gt = null), (Ve = !1));
		}
		function od() {
			var t = Si;
			return (t !== null && (An === null ? (An = t) : An.push.apply(An, t), (Si = null)), t);
		}
		function bs(t) {
			Si === null ? (Si = [t]) : Si.push(t);
		}
		var sd = _t(null),
			la = null,
			Yr = null;
		function Ei(t, r, a) {
			(Ue(sd, r._currentValue), (r._currentValue = a));
		}
		function Kr(t) {
			((t._currentValue = sd.current), et(sd));
		}
		function ll(t, r, a) {
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
								((d.lanes |= a), (C = d.alternate), C !== null && (C.lanes |= a), ll(d.return, a, t), s || (v = null));
								break e;
							}
						d = C.next;
					}
				} else if (c.tag === 18) {
					if (((v = c.return), v === null)) throw Error(u(341));
					((v.lanes |= a), (d = v.alternate), d !== null && (d.lanes |= a), ll(v, a, t), (v = null));
				} else
					c.tag === 13 && c.memoizedState !== null && c.memoizedState.dehydrated === null
						? ((c.lanes |= a),
							(v = c.alternate),
							v !== null && (v.lanes |= a),
							ll(c.return, a, t),
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
		function ca(t, r, a, s) {
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
					v.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(Do) : (t = [Do]));
				}
				c = c.return;
			}
			return (t !== null && ud(r, t, a, s), (r.flags |= 262144), t !== null);
		}
		function cl(t) {
			for (t = t.firstContext; t !== null;) {
				if (!Ln(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function fa(t) {
			((la = t), (Yr = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function rn(t) {
			return ly(la, t);
		}
		function fl(t, r) {
			return (la === null && fa(t), ly(t, r));
		}
		function ly(t, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), Yr === null)) {
				if (t === null) throw Error(u(308));
				((Yr = r), (t.dependencies = { lanes: 0, firstContext: r }), (t.flags |= 524288));
			} else Yr = Yr.next = r;
			return a;
		}
		var tT =
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
			nT = n.unstable_scheduleCallback,
			rT = n.unstable_NormalPriority,
			kt = { $$typeof: B, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function ld() {
			return { controller: new tT(), data: new Map(), refCount: 0 };
		}
		function Ss(t) {
			(t.refCount--,
				t.refCount === 0 &&
					nT(rT, function () {
						t.controller.abort();
					}));
		}
		function cy(t, r) {
			if ((t.pendingLanes & 4194048) !== 0) {
				var a = t.transitionTypes;
				for (a === null && (a = t.transitionTypes = []), t = 0; t < r.length; t++) {
					var s = r[t];
					a.indexOf(s) === -1 && a.push(s);
				}
			}
		}
		var ws = null;
		function iT(t) {
			var r = t.transitionTypes;
			return ((t.transitionTypes = null), r);
		}
		var Es = null,
			cd = 0,
			da = 0,
			so = null;
		function aT(t, r) {
			if (Es === null) {
				var a = (Es = []);
				((cd = 0),
					(da = xh()),
					(so = {
						status: "pending",
						value: void 0,
						then: function (s) {
							a.push(s);
						},
					}));
			}
			return (cd++, r.then(fy, fy), r);
		}
		function fy() {
			if (--cd === 0 && ((ws = null), Es !== null)) {
				so !== null && (so.status = "fulfilled");
				var t = Es;
				((Es = null), (da = 0), (so = null));
				for (var r = 0; r < t.length; r++) (0, t[r])();
			}
		}
		function oT(t, r) {
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
		var dy = ce.S;
		ce.S = function (t, r) {
			if (((tp = tn()), typeof r == "object" && r !== null && typeof r.then == "function" && aT(t, r), ws !== null))
				for (var a = xo; a !== null;) (cy(a, ws), (a = a.next));
			if (((a = t.types), a !== null)) {
				for (var s = xo; s !== null;) (cy(s, a), (s = s.next));
				if (da !== 0) {
					((s = ws), s === null && (s = ws = []));
					for (var c = 0; c < a.length; c++) {
						var d = a[c];
						s.indexOf(d) === -1 && s.push(d);
					}
				}
			}
			dy !== null && dy(t, r);
		};
		var ha = _t(null);
		function fd() {
			var t = ha.current;
			return t !== null ? t : dt.pooledCache;
		}
		function dl(t, r) {
			r === null ? Ue(ha, ha.current) : Ue(ha, r.pool);
		}
		function hy() {
			var t = fd();
			return t === null ? null : { parent: kt._currentValue, pool: t };
		}
		var uo = Error(u(460)),
			dd = Error(u(474)),
			hl = Error(u(542)),
			ml = { then: function () {} };
		function my(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function gy(t, r, a) {
			switch (((a = t[a]), a === void 0 ? t.push(r) : a !== r && (r.then(wr, wr), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((t = r.reason), yy(t), t === void 0 && !("reason" in r) ? Error(u(600)) : t);
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
							throw ((t = r.reason), yy(t), t);
					}
					throw ((ga = r), uo);
			}
		}
		function ma(t) {
			try {
				var r = t._init;
				return r(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((ga = a), uo) : a;
			}
		}
		var ga = null;
		function vy() {
			if (ga === null) throw Error(u(459));
			var t = ga;
			return ((ga = null), t);
		}
		function yy(t) {
			if (t === uo || t === hl) throw Error(u(483));
		}
		var lo = null,
			_s = 0;
		function gl(t) {
			var r = _s;
			return ((_s += 1), lo === null && (lo = []), gy(lo, t, r));
		}
		function _i(t, r) {
			((r = r.props.ref), (t.ref = r !== void 0 ? r : null));
		}
		function vl(t, r) {
			throw r.$$typeof === H
				? Error(u(525))
				: ((t = Object.prototype.toString.call(r)),
					Error(u(31, t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t)));
		}
		function py(t) {
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
						  (V.elementType === Se || (typeof Se == "object" && Se !== null && Se.$$typeof === K && ma(Se) === V.type))
						? ((V = c(V, G.props)), _i(V, G), (V.return = Z), V)
						: ((V = al(G.type, G.key, G.props, null, Z.mode, ie)), _i(V, G), (V.return = Z), V);
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
					? ((V = sa(G, Z.mode, ie, Se)), (V.return = Z), V)
					: ((V = c(V, G)), (V.return = Z), V);
			}
			function oe(Z, V, G) {
				if ((typeof V == "string" && V !== "") || typeof V == "number" || typeof V == "bigint")
					return ((V = nd("" + V, Z.mode, G)), (V.return = Z), V);
				if (typeof V == "object" && V !== null) {
					switch (V.$$typeof) {
						case re:
							return ((G = al(V.type, V.key, V.props, null, Z.mode, G)), _i(G, V), (G.return = Z), G);
						case R:
							return ((V = rd(V, Z.mode, G)), (V.return = Z), V);
						case K:
							return ((V = ma(V)), oe(Z, V, G));
					}
					if (Ce(V) || fe(V)) return ((V = sa(V, Z.mode, G, null)), (V.return = Z), V);
					if (typeof V.then == "function") return oe(Z, gl(V), G);
					if (V.$$typeof === B) return oe(Z, fl(Z, V), G);
					vl(Z, V);
				}
				return null;
			}
			function $(Z, V, G, ie) {
				var Se = V !== null ? V.key : null;
				if ((typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint")
					return Se !== null ? null : C(Z, V, "" + G, ie);
				if (typeof G == "object" && G !== null) {
					switch (G.$$typeof) {
						case re:
							return G.key === Se ? I(Z, V, G, ie) : null;
						case R:
							return G.key === Se ? Q(Z, V, G, ie) : null;
						case K:
							return ((G = ma(G)), $(Z, V, G, ie));
					}
					if (Ce(G) || fe(G)) return Se !== null ? null : J(Z, V, G, ie, null);
					if (typeof G.then == "function") return $(Z, V, gl(G), ie);
					if (G.$$typeof === B) return $(Z, V, fl(Z, G), ie);
					vl(Z, G);
				}
				return null;
			}
			function X(Z, V, G, ie, Se) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(G) || null), C(V, Z, "" + ie, Se));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case re:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), I(V, Z, ie, Se));
						case R:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), Q(V, Z, ie, Se));
						case K:
							return ((ie = ma(ie)), X(Z, V, G, ie, Se));
					}
					if (Ce(ie) || fe(ie)) return ((Z = Z.get(G) || null), J(V, Z, ie, Se, null));
					if (typeof ie.then == "function") return X(Z, V, G, gl(ie), Se);
					if (ie.$$typeof === B) return X(Z, V, G, fl(V, ie), Se);
					vl(V, ie);
				}
				return null;
			}
			function me(Z, V, G, ie) {
				for (var Se = null, Ze = null, Re = V, je = (V = 0), Ut = null; Re !== null && je < G.length; je++) {
					Re.index > je ? ((Ut = Re), (Re = null)) : (Ut = Re.sibling);
					var Ye = $(Z, Re, G[je], ie);
					if (Ye === null) {
						Re === null && (Re = Ut);
						break;
					}
					(t && Re && Ye.alternate === null && r(Z, Re),
						(V = d(Ye, V, je)),
						Ze === null ? (Se = Ye) : (Ze.sibling = Ye),
						(Ze = Ye),
						(Re = Ut));
				}
				if (je === G.length) return (a(Z, Re), Ve && Qr(Z, je), Se);
				if (Re === null) {
					for (; je < G.length; je++)
						((Re = oe(Z, G[je], ie)),
							Re !== null && ((V = d(Re, V, je)), Ze === null ? (Se = Re) : (Ze.sibling = Re), (Ze = Re)));
					return (Ve && Qr(Z, je), Se);
				}
				for (Re = s(Re); je < G.length; je++)
					((Ut = X(Re, Z, je, G[je], ie)),
						Ut !== null &&
							(t && ((Ye = Ut.alternate), Ye !== null && Re.delete(Ye.key === null ? je : Ye.key)),
							(V = d(Ut, V, je)),
							Ze === null ? (Se = Ut) : (Ze.sibling = Ut),
							(Ze = Ut)));
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
					var Se = null, Ze = null, Re = V, je = (V = 0), Ut = null, Ye = G.next();
					Re !== null && !Ye.done;
					je++, Ye = G.next()
				) {
					Re.index > je ? ((Ut = Re), (Re = null)) : (Ut = Re.sibling);
					var Vi = $(Z, Re, Ye.value, ie);
					if (Vi === null) {
						Re === null && (Re = Ut);
						break;
					}
					(t && Re && Vi.alternate === null && r(Z, Re),
						(V = d(Vi, V, je)),
						Ze === null ? (Se = Vi) : (Ze.sibling = Vi),
						(Ze = Vi),
						(Re = Ut));
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
							(t && ((Ut = Ye.alternate), Ut !== null && Re.delete(Ut.key === null ? je : Ut.key)),
							(V = d(Ye, V, je)),
							Ze === null ? (Se = Ye) : (Ze.sibling = Ye),
							(Ze = Ye)));
				return (
					t &&
						Re.forEach(function (Hx) {
							return r(Z, Hx);
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
						case re:
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
											(typeof Se == "object" && Se !== null && Se.$$typeof === K && ma(Se) === V.type)
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
									? ((ie = sa(G.props.children, Z.mode, ie, G.key)), _i(ie, G), (ie.return = Z), (Z = ie))
									: ((ie = al(G.type, G.key, G.props, null, Z.mode, ie)), _i(ie, G), (ie.return = Z), (Z = ie));
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
							return ((G = ma(G)), Le(Z, V, G, ie));
					}
					if (Ce(G)) return me(Z, V, G, ie);
					if (fe(G)) {
						if (((Se = fe(G)), typeof Se != "function")) throw Error(u(150));
						return ((G = Se.call(G)), we(Z, V, G, ie));
					}
					if (typeof G.then == "function") return Le(Z, V, gl(G), ie);
					if (G.$$typeof === B) return Le(Z, V, fl(Z, G), ie);
					vl(Z, G);
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
					_s = 0;
					var Se = Le(Z, V, G, ie);
					return ((lo = null), Se);
				} catch (Re) {
					if (Re === uo || Re === hl) throw Re;
					var Ze = Tn(29, Re, null, Z.mode);
					return ((Ze.lanes = ie), (Ze.return = Z), Ze);
				}
			};
		}
		var va = py(!0),
			by = py(!1),
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
		function ya(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function pa(t, r, a) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (tt & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(s.pending = r),
					(r = il(t)),
					ny(t, null, a),
					r
				);
			}
			return (rl(t, s, r, a), il(t));
		}
		function Cs(t, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var s = r.lanes;
				((s &= t.pendingLanes), (a |= s), (r.lanes = a), av(t, a));
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
		function Ts() {
			if (vd) {
				var t = so;
				if (t !== null) throw t;
			}
		}
		function xs(t, r, a, s) {
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
						($ !== 0 && $ === da && (vd = !0),
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
									oe = U({}, oe, $);
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
		function Sy(t, r) {
			if (typeof t != "function") throw Error(u(191, t));
			t.call(r);
		}
		function wy(t, r) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) Sy(a[t], r);
		}
		var Ti = _t(null),
			yl = _t(0);
		function Ey(t, r) {
			((t = ei), Ue(yl, t), Ue(Ti, r), (ei = t | r.baseLanes));
		}
		function yd() {
			(Ue(yl, ei), Ue(Ti, Ti.current));
		}
		function pd() {
			((ei = yl.current), et(Ti), et(yl));
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
		function _y(t) {
			t.tag === 22 ? (Ue(on, on.current), Ue(an, t), vn === null && (vn = t)) : Oi();
		}
		function Oi() {
			(Ue(on, on.current), Ue(an, an.current));
		}
		function Un(t) {
			(et(an), vn === t && (vn = null), et(on));
		}
		var on = _t(0);
		function Os(t, r) {
			(Ue(an, an.current), Ue(on, r));
		}
		function Sd(t) {
			(et(on), et(an), vn === t && (vn = null));
		}
		function pl(t) {
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
			qt = null,
			bl = !1,
			co = !1,
			ba = !1,
			Sl = 0,
			As = 0,
			fo = null,
			sT = 0;
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
				(ce.H = t === null || t.memoizedState === null ? o0 : s0),
				(ba = !1),
				(d = a(s, c)),
				(ba = !1),
				co && (d = Ty(r, a, s, c)),
				Cy(t),
				d
			);
		}
		function Cy(t) {
			ce.H = Ol;
			var r = lt !== null && lt.next !== null;
			if (((Gr = 0), (qt = lt = qe = null), (bl = !1), (As = 0), (fo = null), r)) throw Error(u(300));
			t === null || Lt || ((t = t.dependencies), t !== null && cl(t) && (Lt = !0));
		}
		function Ty(t, r, a, s) {
			qe = t;
			var c = 0;
			do {
				if ((co && (fo = null), (As = 0), (co = !1), 25 <= c)) throw Error(u(301));
				if (((c += 1), (qt = lt = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((ce.H = gT), (d = r(a, s)));
			} while (co);
			return d;
		}
		function uT() {
			var t = ce.H,
				r = t.useState()[0];
			return (
				(r = typeof r.then == "function" ? Rs(r) : r),
				(t = t.useState()[0]),
				(lt !== null ? lt.memoizedState : null) !== t && (qe.flags |= 1024),
				r
			);
		}
		function _d() {
			var t = Sl !== 0;
			return ((Sl = 0), t);
		}
		function Cd(t, r, a) {
			((r.updateQueue = t.updateQueue), (r.flags &= -2053), (t.lanes &= ~a));
		}
		function Td(t) {
			if (bl) {
				for (t = t.memoizedState; t !== null;) {
					var r = t.queue;
					(r !== null && (r.pending = null), (t = t.next));
				}
				bl = !1;
			}
			((Gr = 0), (qt = lt = qe = null), (co = !1), (As = Sl = 0), (fo = null));
		}
		function Sn() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (qt === null ? (qe.memoizedState = qt = t) : (qt = qt.next = t), qt);
		}
		function zt() {
			if (lt === null) {
				var t = qe.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = lt.next;
			var r = qt === null ? qe.memoizedState : qt.next;
			if (r !== null) ((qt = r), (lt = t));
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
					qt === null ? (qe.memoizedState = qt = t) : (qt = qt.next = t));
			}
			return qt;
		}
		function wl() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function Rs(t) {
			var r = As;
			return (
				(As += 1),
				fo === null && (fo = []),
				(t = gy(fo, t, r)),
				(r = qe),
				(qt === null ? r.memoizedState : qt.next) === null &&
					((r = r.alternate), (ce.H = r === null || r.memoizedState === null ? o0 : s0)),
				t
			);
		}
		function El(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return Rs(t);
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
				a === null && ((a = wl()), (qe.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(t), s = 0; s < t; s++) a[s] = ge;
			return (r.index++, a);
		}
		function Xr(t, r) {
			return typeof r == "function" ? r(t) : r;
		}
		function _l(t) {
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
								oe === da && (J = !0));
						else if ((Gr & $) === $) {
							((Q = Q.next), $ === da && (J = !0));
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
						((oe = Q.action), ba && a(d, oe), (d = Q.hasEagerState ? Q.eagerState : a(d, oe)));
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
				if ((I === null ? (v = d) : (I.next = C), !Ln(d, t.memoizedState) && ((Lt = !0), J && ((a = so), a !== null))))
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
				(Ln(d, r.memoizedState) || (Lt = !0),
					(r.memoizedState = d),
					r.baseQueue === null && (r.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, s];
		}
		function xy(t, r, a) {
			var s = qe,
				c = zt(),
				d = Ve;
			if (d) {
				if (a === void 0) throw Error(u(407));
				a = a();
			} else a = r();
			var v = !Ln((lt || c).memoizedState, a);
			if (
				(v && ((c.memoizedState = a), (Lt = !0)),
				(c = c.queue),
				Md(Ry.bind(null, s, c, t), [t]),
				(t = c.getSnapshot !== r || v || (qt !== null && (qt.memoizedState.tag & 1) !== 0)),
				ho(t ? 9 : 8, { destroy: void 0 }, Ay.bind(null, s, c, a, r), null),
				t)
			) {
				if (((s.flags |= 2048), dt === null)) throw Error(u(349));
				d || (Gr & 127) !== 0 || Oy(s, r, a);
			}
			return a;
		}
		function Oy(t, r, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: r, value: a }),
				(r = qe.updateQueue),
				r === null
					? ((r = wl()), (qe.updateQueue = r), (r.stores = [t]))
					: ((a = r.stores), a === null ? (r.stores = [t]) : a.push(t)));
		}
		function Ay(t, r, a, s) {
			((r.value = a), (r.getSnapshot = s), Ny(r) && My(t));
		}
		function Ry(t, r, a) {
			return a(function () {
				Ny(r) && My(t);
			});
		}
		function Ny(t) {
			var r = t.getSnapshot;
			t = t.value;
			try {
				var a = r();
				return !Ln(t, a);
			} catch {
				return !0;
			}
		}
		function My(t) {
			var r = oa(t, 2);
			r !== null && Rn(r, t, 2);
		}
		function Rd(t) {
			var r = Sn();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), ba)) {
					ye(!0);
					try {
						a();
					} finally {
						ye(!1);
					}
				}
			}
			return (
				(r.memoizedState = r.baseState = t),
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Xr, lastRenderedState: t }),
				r
			);
		}
		function Dy(t, r, a, s) {
			return ((t.baseState = a), Od(t, lt, typeof s == "function" ? s : Xr));
		}
		function lT(t, r, a, s, c) {
			if (xl(t)) throw Error(u(485));
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
					a === null ? ((d.next = r.pending = d), zy(r, d)) : ((d.next = a.next), (r.pending = a.next = d)));
			}
		}
		function zy(t, r) {
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
					(I !== null && I(v, C), Iy(t, r, C));
				} catch (Q) {
					Nd(t, r, Q);
				} finally {
					(d !== null && v.types !== null && (d.types = v.types), (ce.T = d));
				}
			} else
				try {
					((d = a(c, s)), Iy(t, r, d));
				} catch (Q) {
					Nd(t, r, Q);
				}
		}
		function Iy(t, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (s) {
							jy(t, r, s);
						},
						function (s) {
							return Nd(t, r, s);
						},
					)
				: jy(t, r, a);
		}
		function jy(t, r, a) {
			((r.status = "fulfilled"),
				(r.value = a),
				ky(r),
				(t.state = a),
				(r = t.pending),
				r !== null && ((a = r.next), a === r ? (t.pending = null) : ((a = a.next), (r.next = a), zy(t, a))));
		}
		function Nd(t, r, a) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((r.status = "rejected"), (r.reason = a), ky(r), (r = r.next));
				while (r !== s);
			}
			t.action = null;
		}
		function ky(t) {
			t = t.listeners;
			for (var r = 0; r < t.length; r++) (0, t[r])();
		}
		function qy(t, r) {
			return r;
		}
		function Ly(t, r) {
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
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: qy, lastRenderedState: r }),
				(a.queue = s),
				(a = r0.bind(null, qe, s)),
				(s.dispatch = a),
				(s = Rd(!1)),
				(d = kd.bind(null, qe, !1, s.queue)),
				(s = Sn()),
				(c = { state: r, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(a = lT.bind(null, qe, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = t),
				[r, a, !1]
			);
		}
		function Uy(t) {
			return Vy(zt(), lt, t);
		}
		function Vy(t, r, a) {
			if (((r = Od(t, r, qy)[0]), (t = _l(Xr)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var s = Rs(r);
				} catch (v) {
					throw v === uo ? hl : v;
				}
			else s = r;
			r = zt();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((qe.flags |= 2048), ho(9, { destroy: void 0 }, cT.bind(null, c, a), null)),
				[s, d, t]
			);
		}
		function cT(t, r) {
			t.action = r;
		}
		function By(t) {
			var r = zt(),
				a = lt;
			if (a !== null) return Vy(r, a, t);
			(zt(), (r = r.memoizedState), (a = zt()));
			var s = a.queue.dispatch;
			return ((a.memoizedState = t), [r, s, !1]);
		}
		function ho(t, r, a, s) {
			return (
				(t = { tag: t, create: a, deps: s, inst: r, next: null }),
				(r = qe.updateQueue),
				r === null && ((r = wl()), (qe.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = t.next = t) : ((s = a.next), (a.next = t), (t.next = s), (r.lastEffect = t)),
				t
			);
		}
		function Py() {
			return zt().memoizedState;
		}
		function Cl(t, r, a, s) {
			var c = Sn();
			((qe.flags |= t), (c.memoizedState = ho(1 | r, { destroy: void 0 }, a, s === void 0 ? null : s)));
		}
		function Tl(t, r, a, s) {
			var c = zt();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			lt !== null && s !== null && wd(s, lt.memoizedState.deps)
				? (c.memoizedState = ho(r, d, a, s))
				: ((qe.flags |= t), (c.memoizedState = ho(1 | r, d, a, s)));
		}
		function $y(t, r) {
			Cl(8390656, 8, t, r);
		}
		function Md(t, r) {
			Tl(2048, 8, t, r);
		}
		function fT(t) {
			qe.flags |= 4;
			var r = qe.updateQueue;
			if (r === null) ((r = wl()), (qe.updateQueue = r), (r.events = [t]));
			else {
				var a = r.events;
				a === null ? (r.events = [t]) : a.push(t);
			}
		}
		function Hy(t) {
			var r = zt().memoizedState;
			return (
				fT({ ref: r, nextImpl: t }),
				function () {
					if ((tt & 2) !== 0) throw Error(u(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function Zy(t, r) {
			return Tl(4, 2, t, r);
		}
		function Fy(t, r) {
			return Tl(4, 4, t, r);
		}
		function Qy(t, r) {
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
		function Yy(t, r, a) {
			((a = a != null ? a.concat([t]) : null), Tl(4, 4, Qy.bind(null, r, t), a));
		}
		function Dd() {}
		function Ky(t, r) {
			var a = zt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			return r !== null && wd(r, s[1]) ? s[0] : ((a.memoizedState = [t, r]), t);
		}
		function Gy(t, r) {
			var a = zt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			if (r !== null && wd(r, s[1])) return s[0];
			if (((s = t()), ba)) {
				ye(!0);
				try {
					t();
				} finally {
					ye(!1);
				}
			}
			return ((a.memoizedState = [s, r]), s);
		}
		function zd(t, r, a) {
			return a === void 0 || ((Gr & 1073741824) !== 0 && (He & 261930) === 0)
				? (t.memoizedState = r)
				: ((t.memoizedState = a), (t = rp()), (qe.lanes |= t), (Mi |= t), a);
		}
		function Xy(t, r, a, s) {
			return Ln(a, r)
				? a
				: Ti.current !== null
					? ((t = zd(t, a, s)), Ln(t, r) || (Lt = !0), t)
					: (Gr & 106) === 0 || ((Gr & 1073741824) !== 0 && (He & 261930) === 0)
						? ((Lt = !0), (t.memoizedState = a))
						: ((t = rp()), (qe.lanes |= t), (Mi |= t), r);
		}
		function Jy(t, r, a, s, c) {
			var d = ve.p;
			ve.p = d !== 0 && 8 > d ? d : 8;
			var v = ce.T,
				C = {};
			((C.types = v !== null ? v.types : null), (ce.T = C), kd(t, !1, r, a));
			try {
				var I = c(),
					Q = ce.S;
				(Q !== null && Q(C, I),
					I !== null && typeof I == "object" && typeof I.then == "function"
						? Ns(t, r, oT(I, s), tr(t))
						: Ns(t, r, s, tr(t)));
			} catch (J) {
				Ns(t, r, { then: function () {}, status: "rejected", reason: J }, tr());
			} finally {
				((ve.p = d), v !== null && C.types !== null && (v.types = C.types), (ce.T = v));
			}
		}
		function dT() {}
		function Id(t, r, a, s) {
			if (t.tag !== 5) throw Error(u(476));
			var c = Wy(t).queue;
			Jy(
				t,
				c,
				r,
				Ge,
				a === null
					? dT
					: function () {
							return (e0(t), a(s));
						},
			);
		}
		function Wy(t) {
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
		function e0(t) {
			var r = Wy(t);
			(r.next === null && (r = t.alternate.memoizedState), Ns(t, r.next.queue, {}, tr()));
		}
		function jd() {
			return rn(Do);
		}
		function t0() {
			return zt().memoizedState;
		}
		function n0() {
			return zt().memoizedState;
		}
		function hT(t) {
			for (var r = t.return; r !== null;) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = tr();
						t = ya(a);
						var s = pa(r, t, a);
						(s !== null && (Rn(s, r, a), Cs(s, r, a)), (r = { cache: ld() }), (t.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function mT(t, r, a) {
			var s = tr();
			((a = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				xl(t) ? i0(r, a) : ((a = ed(t, r, a, s)), a !== null && (Rn(a, t, s), a0(a, r, s))));
		}
		function r0(t, r, a) {
			Ns(t, r, a, tr());
		}
		function Ns(t, r, a, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (xl(t)) i0(r, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var v = r.lastRenderedState,
							C = d(v, a);
						if (((c.hasEagerState = !0), (c.eagerState = C), Ln(C, v)))
							return (rl(t, r, c, 0), dt === null && nl(), !1);
					} catch {}
				if (((a = ed(t, r, c, s)), a !== null)) return (Rn(a, t, s), a0(a, r, s), !0);
			}
			return !1;
		}
		function kd(t, r, a, s) {
			if (
				((s = { lane: 2, revertLane: xh(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				xl(t))
			) {
				if (r) throw Error(u(479));
			} else ((r = ed(t, a, s, 2)), r !== null && Rn(r, t, 2));
		}
		function xl(t) {
			var r = t.alternate;
			return t === qe || (r !== null && r === qe);
		}
		function i0(t, r) {
			co = bl = !0;
			var a = t.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (t.pending = r));
		}
		function a0(t, r, a) {
			if ((a & 4194048) !== 0) {
				var s = r.lanes;
				((s &= t.pendingLanes), (a |= s), (r.lanes = a), av(t, a));
			}
		}
		var Ol = {
				readContext: rn,
				use: El,
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
			o0 = {
				readContext: rn,
				use: El,
				useCallback: function (t, r) {
					return ((Sn().memoizedState = [t, r === void 0 ? null : r]), t);
				},
				useContext: rn,
				useEffect: $y,
				useImperativeHandle: function (t, r, a) {
					((a = a != null ? a.concat([t]) : null), Cl(4194308, 4, Qy.bind(null, r, t), a));
				},
				useLayoutEffect: function (t, r) {
					return Cl(4194308, 4, t, r);
				},
				useInsertionEffect: function (t, r) {
					Cl(4, 2, t, r);
				},
				useMemo: function (t, r) {
					var a = Sn();
					r = r === void 0 ? null : r;
					var s = t();
					if (ba) {
						ye(!0);
						try {
							t();
						} finally {
							ye(!1);
						}
					}
					return ((a.memoizedState = [s, r]), s);
				},
				useReducer: function (t, r, a) {
					var s = Sn();
					if (a !== void 0) {
						var c = a(r);
						if (ba) {
							ye(!0);
							try {
								a(r);
							} finally {
								ye(!1);
							}
						}
					} else c = r;
					return (
						(s.memoizedState = s.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(s.queue = t),
						(t = t.dispatch = mT.bind(null, qe, t)),
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
						a = r0.bind(null, qe, r);
					return ((r.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					return zd(Sn(), t, r);
				},
				useTransition: function () {
					var t = Rd(!1);
					return ((t = Jy.bind(null, qe, t.queue, !0, !1)), (Sn().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, r, a) {
					var s = qe,
						c = Sn();
					if (Ve) {
						if (a === void 0) throw Error(u(407));
						a = a();
					} else {
						if (((a = r()), dt === null)) throw Error(u(349));
						(He & 127) !== 0 || Oy(s, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						$y(Ry.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						ho(9, { destroy: void 0 }, Ay.bind(null, s, d, a, r), null),
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
							(a = Sl++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = sT++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = r);
				},
				useHostTransitionStatus: jd,
				useFormState: Ly,
				useActionState: Ly,
				useOptimistic: function (t) {
					var r = Sn();
					r.memoizedState = r.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = kd.bind(null, qe, !0, a)), (a.dispatch = r), [t, r]);
				},
				useMemoCache: xd,
				useCacheRefresh: function () {
					return (Sn().memoizedState = hT.bind(null, qe));
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
			s0 = {
				readContext: rn,
				use: El,
				useCallback: Ky,
				useContext: rn,
				useEffect: Md,
				useImperativeHandle: Yy,
				useInsertionEffect: Zy,
				useLayoutEffect: Fy,
				useMemo: Gy,
				useReducer: _l,
				useRef: Py,
				useState: function () {
					return _l(Xr);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					return Xy(zt(), lt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = _l(Xr)[0],
						r = zt().memoizedState;
					return [typeof t == "boolean" ? t : Rs(t), r];
				},
				useSyncExternalStore: xy,
				useId: t0,
				useHostTransitionStatus: jd,
				useFormState: Uy,
				useActionState: Uy,
				useOptimistic: function (t, r) {
					return Dy(zt(), lt, t, r);
				},
				useMemoCache: xd,
				useCacheRefresh: n0,
				useEffectEvent: Hy,
			},
			gT = {
				readContext: rn,
				use: El,
				useCallback: Ky,
				useContext: rn,
				useEffect: Md,
				useImperativeHandle: Yy,
				useInsertionEffect: Zy,
				useLayoutEffect: Fy,
				useMemo: Gy,
				useReducer: Ad,
				useRef: Py,
				useState: function () {
					return Ad(Xr);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					var a = zt();
					return lt === null ? zd(a, t, r) : Xy(a, lt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = Ad(Xr)[0],
						r = zt().memoizedState;
					return [typeof t == "boolean" ? t : Rs(t), r];
				},
				useSyncExternalStore: xy,
				useId: t0,
				useHostTransitionStatus: jd,
				useFormState: By,
				useActionState: By,
				useOptimistic: function (t, r) {
					var a = zt();
					return lt !== null ? Dy(a, lt, t, r) : ((a.baseState = t), [t, a.queue.dispatch]);
				},
				useMemoCache: xd,
				useCacheRefresh: n0,
				useEffectEvent: Hy,
			};
		function qd(t, r, a, s) {
			((r = t.memoizedState),
				(a = a(s, r)),
				(a = a == null ? r : U({}, r, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var Ld = {
			enqueueSetState: function (t, r, a) {
				t = t._reactInternals;
				var s = tr(),
					c = ya(s);
				((c.payload = r), a != null && (c.callback = a), (r = pa(t, c, s)), r !== null && (Rn(r, t, s), Cs(r, t, s)));
			},
			enqueueReplaceState: function (t, r, a) {
				t = t._reactInternals;
				var s = tr(),
					c = ya(s);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = pa(t, c, s)),
					r !== null && (Rn(r, t, s), Cs(r, t, s)));
			},
			enqueueForceUpdate: function (t, r) {
				t = t._reactInternals;
				var a = tr(),
					s = ya(a);
				((s.tag = 2), r != null && (s.callback = r), (r = pa(t, s, a)), r !== null && (Rn(r, t, a), Cs(r, t, a)));
			},
		};
		function u0(t, r, a, s, c, d, v) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, v)
					: r.prototype && r.prototype.isPureReactComponent
						? !vs(a, s) || !vs(c, d)
						: !0
			);
		}
		function l0(t, r, a, s) {
			((t = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, s),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, s),
				r.state !== t && Ld.enqueueReplaceState(r, r.state, null));
		}
		function Sa(t, r) {
			var a = r;
			if ("ref" in r) {
				a = {};
				for (var s in r) s !== "ref" && (a[s] = r[s]);
			}
			if ((t = t.defaultProps)) {
				a === r && (a = U({}, a));
				for (var c in t) a[c] === void 0 && (a[c] = t[c]);
			}
			return a;
		}
		function vT(t) {
			tl(t);
		}
		function yT(t) {
			console.error(t);
		}
		function pT(t) {
			tl(t);
		}
		function Al(t, r) {
			try {
				var a = t.onUncaughtError;
				a(r.value, { componentStack: r.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function c0(t, r, a) {
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
				(a = ya(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					Al(t, r);
				}),
				a
			);
		}
		function f0(t) {
			return ((t = ya(t)), (t.tag = 3), t);
		}
		function d0(t, r, a, s) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						c0(r, a, s);
					}));
			}
			var v = a.stateNode;
			v !== null &&
				typeof v.componentDidCatch == "function" &&
				(t.callback = function () {
					(c0(r, a, s), typeof c != "function" && (Di === null ? (Di = new Set([this])) : Di.add(this)));
					var C = s.stack;
					this.componentDidCatch(s.value, { componentStack: C !== null ? C : "" });
				});
		}
		function bT(t, r, a, s, c) {
			if (((a.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((r = a.alternate), r !== null && ca(r, a, c, !0), (a = an.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
						case 19:
							return (
								vn === null ? Kl() : a.alternate === null && Mt === 0 && (Mt = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								s === ml
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([s])) : r.add(s), _h(t, s, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								s === ml
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
				return (_h(t, s, c), Kl(), !1);
			}
			if (Ve)
				return (
					(r = an.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							s !== ad && ((t = Error(u(422), { cause: s })), bs(Gn(t, a))))
						: (s !== ad && ((r = Error(u(423), { cause: s })), bs(Gn(r, a))),
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
			if (((d = Gn(d, a)), Ls === null ? (Ls = [d]) : Ls.push(d), Mt !== 4 && (Mt = 2), r === null)) return !0;
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
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = f0(c)), d0(c, t, a, s), gd(a, c), !1);
						break;
					case 22:
						if (a.memoizedState !== null) return ((a.flags |= 65536), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Vd = Error(u(461)),
			Lt = !1;
		function Ft(t, r, a, s) {
			r.child = t === null ? by(r, null, a, s) : va(r, t.child, a, s);
		}
		function h0(t, r, a, s, c) {
			a = a.render;
			var d = r.ref;
			if ("ref" in s) {
				var v = {};
				for (var C in s) C !== "ref" && (v[C] = s[C]);
			} else v = s;
			return (
				fa(r),
				(s = Ed(t, r, a, v, d, c)),
				(C = _d()),
				t !== null && !Lt ? (Cd(t, r, c), Jr(t, r, c)) : (Ve && C && sl(r), (r.flags |= 1), Ft(t, r, s, c), r.child)
			);
		}
		function m0(t, r, a, s, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !td(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), g0(t, r, d, s, c))
					: ((t = al(a.type, null, s, r, r.mode, c)), (t.ref = r.ref), (t.return = r), (r.child = t));
			}
			if (((d = t.child), !Yd(t, c))) {
				var v = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : vs), a(v, s) && t.ref === r.ref)) return Jr(t, r, c);
			}
			return ((r.flags |= 1), (t = Fr(d, s)), (t.ref = r.ref), (t.return = r), (r.child = t));
		}
		function g0(t, r, a, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (vs(d, s) && t.ref === r.ref)
					if (((Lt = !1), (r.pendingProps = s = d), Yd(t, c))) (t.flags & 131072) !== 0 && (Lt = !0);
					else return ((r.lanes = t.lanes), Jr(t, r, c));
			}
			return Bd(t, r, a, s, c);
		}
		function v0(t, r, a, s) {
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
					return y0(t, r, d, a, s);
				}
				if ((a & 536870912) !== 0)
					((r.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && dl(r, d !== null ? d.cachePool : null),
						d !== null ? Ey(r, d) : yd(),
						_y(r));
				else return ((s = r.lanes = 536870912), y0(t, r, d !== null ? d.baseLanes | a : a, a, s));
			} else
				d !== null
					? (dl(r, d.cachePool), Ey(r, d), Oi(), (r.memoizedState = null))
					: (t !== null && dl(r, null), yd(), Oi());
			return (Ft(t, r, c, a), r.child);
		}
		function Ms(t, r) {
			return (
				(t !== null && t.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function y0(t, r, a, s, c) {
			var d = fd();
			return (
				(d = d === null ? null : { parent: kt._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && dl(r, null),
				yd(),
				_y(r),
				t !== null && ca(t, r, s, !0),
				(r.childLanes = c),
				null
			);
		}
		function Rl(t, r) {
			return (
				(r = Nl({ mode: r.mode, children: r.children }, t.mode)),
				(r.ref = t.ref),
				(t.child = r),
				(r.return = t),
				r
			);
		}
		function p0(t, r, a) {
			return (va(r, t.child, null, a), (t = Rl(r, r.pendingProps)), (t.flags |= 2), Un(r), (r.memoizedState = null), t);
		}
		function ST(t, r, a) {
			var s = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), t === null)) {
				if (Ve) {
					if (s.mode === "hidden")
						return (
							(t = Rl(r, s)),
							(r.lanes = 536870912),
							(t.memoizedState = { baseLanes: 0, cachePool: null }),
							Ms(null, t)
						);
					if (
						(bd(r),
						(t = gt)
							? ((t = Fp(t, Wn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: bi !== null ? { id: Er, overflow: _r } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = iy(t)),
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
				return Rl(r, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var v = d.dehydrated;
				if ((bd(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = p0(t, r, a)));
					else if (r.memoizedState !== null) ((r.child = t.child), (r.flags |= 128), (r = null));
					else throw Error(u(558));
				else if ((Lt || ca(t, r, a, !1), (c = (a & t.childLanes) !== 0), Lt || c)) {
					if (Ti.current === null) {
						if (((s = dt), s !== null && ((v = ov(s, a)), v !== 0 && v !== d.retryLane)))
							throw ((d.retryLane = v), oa(t, v), Rn(s, t, v), Vd);
						Kl();
					}
					r = p0(t, r, a);
				} else
					((t = d.treeContext),
						(gt = nr(v.nextSibling)),
						(Gt = r),
						(Ve = !0),
						(Si = null),
						(Wn = !1),
						t !== null && sy(r, t),
						(r = Rl(r, s)),
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
		function mo(t, r) {
			var a = r.ref;
			if (a === null) t !== null && t.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(u(284));
				(t === null || t.ref !== a) && (r.flags |= 4194816);
			}
		}
		function Bd(t, r, a, s, c) {
			return (
				fa(r),
				(a = Ed(t, r, a, s, void 0, c)),
				(s = _d()),
				t !== null && !Lt ? (Cd(t, r, c), Jr(t, r, c)) : (Ve && s && sl(r), (r.flags |= 1), Ft(t, r, a, c), r.child)
			);
		}
		function b0(t, r, a, s, c, d) {
			return (
				fa(r),
				(r.updateQueue = null),
				(a = Ty(r, s, a, c)),
				Cy(t),
				(s = _d()),
				t !== null && !Lt ? (Cd(t, r, d), Jr(t, r, d)) : (Ve && s && sl(r), (r.flags |= 1), Ft(t, r, a, d), r.child)
			);
		}
		function S0(t, r, a, s, c) {
			if ((fa(r), r.stateNode === null)) {
				var d = ro,
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
					(d.context = typeof v == "object" && v !== null ? rn(v) : ro),
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
						xs(r, s, d, c),
						Ts(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(s = !0));
			} else if (t === null) {
				d = r.stateNode;
				var C = r.memoizedProps,
					I = Sa(a, C);
				d.props = I;
				var Q = d.context,
					J = a.contextType;
				((v = ro), typeof J == "object" && J !== null && (v = rn(J)));
				var oe = a.getDerivedStateFromProps;
				((J = typeof oe == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(C = r.pendingProps !== C),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((C || Q !== v) && l0(r, d, s, v)),
					(Ci = !1));
				var $ = r.memoizedState;
				((d.state = $),
					xs(r, s, d, c),
					Ts(),
					(Q = r.memoizedState),
					C || $ !== Q || Ci
						? (typeof oe == "function" && (qd(r, a, oe, s), (Q = r.memoizedState)),
							(I = Ci || u0(r, a, I, s, $, Q, v))
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
					(J = Sa(a, v)),
					(d.props = J),
					(oe = r.pendingProps),
					($ = d.context),
					(Q = a.contextType),
					(I = ro),
					typeof Q == "object" && Q !== null && (I = rn(Q)),
					(C = a.getDerivedStateFromProps),
					(Q = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((v !== oe || $ !== I) && l0(r, d, s, I)),
					(Ci = !1),
					($ = r.memoizedState),
					(d.state = $),
					xs(r, s, d, c),
					Ts());
				var X = r.memoizedState;
				v !== oe || $ !== X || Ci || (t !== null && t.dependencies !== null && cl(t.dependencies))
					? (typeof C == "function" && (qd(r, a, C, s), (X = r.memoizedState)),
						(J = Ci || u0(r, a, J, s, $, X, I) || (t !== null && t.dependencies !== null && cl(t.dependencies)))
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
				mo(t, r),
				(s = (r.flags & 128) !== 0),
				d || s
					? ((d = r.stateNode),
						(a = s && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						t !== null && s ? ((r.child = va(r, t.child, null, c)), (r.child = va(r, null, a, c))) : Ft(t, r, a, c),
						(r.memoizedState = d.state),
						(t = r.child))
					: (t = Jr(t, r, c)),
				t
			);
		}
		function w0(t, r, a, s) {
			return (ua(), (r.flags |= 256), Ft(t, r, a, s), r.child);
		}
		var Pd = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function $d(t) {
			return { baseLanes: t, cachePool: hy() };
		}
		function Hd(t, r, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), r && (t |= Pn), t);
		}
		function E0(t, r, a) {
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
							? ((t = Fp(t, Wn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: bi !== null ? { id: Er, overflow: _r } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = iy(t)),
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
							(d = Nl({ mode: "hidden", children: d }, c)),
							(s = sa(s, c, a, null)),
							(d.return = r),
							(s.return = r),
							(d.sibling = s),
							(r.child = d),
							(s = r.child),
							(s.memoizedState = $d(a)),
							(s.childLanes = Hd(t, v, a)),
							(r.memoizedState = Pd),
							Ms(null, s))
						: (xi(r), Zd(r, d))
				);
			}
			var C = t.memoizedState;
			if (C !== null) {
				var I = C.dehydrated;
				if (I !== null) return wT(t, r, d, v, s, I, C, a);
			}
			return c
				? (Oi(),
					(c = s.fallback),
					(d = r.mode),
					(C = t.child),
					(I = C.sibling),
					(s = Fr(C, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = C.subtreeFlags & 1206910976),
					I !== null ? (c = Fr(I, c)) : ((c = sa(c, d, a, null)), (c.flags |= 2)),
					(c.return = r),
					(s.return = r),
					(s.sibling = c),
					(r.child = s),
					Ms(null, s),
					(s = r.child),
					(c = t.child.memoizedState),
					c === null
						? (c = $d(a))
						: ((d = c.cachePool),
							d !== null ? ((C = kt._currentValue), (d = d.parent !== C ? { parent: C, pool: C } : d)) : (d = hy()),
							(c = { baseLanes: c.baseLanes | a, cachePool: d })),
					(s.memoizedState = c),
					(s.childLanes = Hd(t, v, a)),
					(r.memoizedState = Pd),
					Ms(t.child, s))
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
			return ((r = Nl({ mode: "visible", children: r }, t.mode)), (r.return = t), (t.child = r));
		}
		function Nl(t, r) {
			return ((t = Tn(22, t, null, r)), (t.lanes = 0), t);
		}
		function Ml(t, r, a) {
			return (
				va(r, t.child, null, a),
				(t = Zd(r, r.pendingProps.children)),
				(t.flags |= 2),
				(r.memoizedState = null),
				t
			);
		}
		function wT(t, r, a, s, c, d, v, C) {
			if (a)
				return r.flags & 256
					? (xi(r), (r.flags &= -257), Ml(t, r, C))
					: r.memoizedState !== null
						? (Oi(), (r.child = t.child), (r.flags |= 128), null)
						: (Oi(),
							(d = c.fallback),
							(v = r.mode),
							(c = Nl({ mode: "visible", children: c.children }, v)),
							(d = sa(d, v, C, null)),
							(d.flags |= 2),
							(c.return = r),
							(d.return = r),
							(c.sibling = d),
							(r.child = c),
							va(r, t.child, null, C),
							(c = r.child),
							(c.memoizedState = $d(C)),
							(c.childLanes = Hd(t, s, C)),
							(r.memoizedState = Pd),
							Ms(null, c));
			if ((xi(r), Ph(d))) {
				if (((s = d.nextSibling && d.nextSibling.dataset), s)) var I = s.dgst;
				return (
					(s = I),
					s !== "" &&
						((c = Error(u(419))), (c.stack = ""), (c.digest = s), bs({ value: c, source: null, stack: null })),
					Ml(t, r, C)
				);
			}
			if ((Lt || ca(t, r, C, !1), (s = (C & t.childLanes) !== 0), Lt || s)) {
				if (Ti.current !== null) return Ml(t, r, C);
				if (((s = dt), s !== null && ((c = ov(s, C)), c !== 0 && c !== v.retryLane)))
					throw ((v.retryLane = c), oa(t, c), Rn(s, t, c), Vd);
				return (Bh(d) || Kl(), Ml(t, r, C));
			}
			return Bh(d)
				? ((r.flags |= 192), (r.child = t.child), null)
				: ((t = v.treeContext),
					(gt = nr(d.nextSibling)),
					(Gt = r),
					(Ve = !0),
					(Si = null),
					(Wn = !1),
					t !== null && sy(r, t),
					(r = Zd(r, c.children)),
					(r.flags |= 134221824),
					r);
		}
		function _0(t, r, a) {
			t.lanes |= r;
			var s = t.alternate;
			(s !== null && (s.lanes |= r), ll(t.return, r, a));
		}
		function C0(t) {
			for (var r = null; t !== null;) {
				var a = t.alternate;
				(a !== null && pl(a) === null && (r = t), (t = t.sibling));
			}
			return r;
		}
		function Dl(t, r, a, s, c, d) {
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
			if (r.flags & 128) return (Os(r, v), null);
			var C = (v & 2) !== 0;
			if (
				(C ? ((v = (v & 1) | 2), (r.flags |= 128)) : (v &= 1),
				Os(r, v),
				c === "backwards" && t !== null ? (Fd(t), Ft(t, r, s, a), Fd(t)) : Ft(t, r, s, a),
				(s = Ve ? ps : 0),
				!C && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = r.child; t !== null;) {
					if (t.tag === 13) t.memoizedState !== null && _0(t, a, r);
					else if (t.tag === 19) _0(t, a, r);
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
					((a = C0(r.child)),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null), Fd(r)),
						Dl(r, !0, c, null, d, s));
					break;
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null;) {
						if (((t = c.alternate), t !== null && pl(t) === null)) {
							r.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					Dl(r, !0, a, null, d, s);
					break;
				case "together":
					Dl(r, !1, null, null, void 0, s);
					break;
				case "independent":
					r.memoizedState = null;
					break;
				default:
					((a = C0(r.child)),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						Dl(r, !1, c, a, d, s));
			}
			return r.child;
		}
		function T0(t, r, a) {
			var s = r.pendingProps;
			return (Ei(r, r.type, s.value), Ft(t, r, s.children, a), r.child);
		}
		function Jr(t, r, a) {
			if ((t !== null && (r.dependencies = t.dependencies), (Mi |= r.lanes), (a & r.childLanes) === 0))
				if (t !== null) {
					if ((ca(t, r, a, !1), (a & r.childLanes) === 0)) return null;
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
			return (t.lanes & r) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && cl(t)));
		}
		function ET(t, r, a) {
			switch (r.tag) {
				case 3:
					(Qn(r, r.stateNode.containerInfo), Ei(r, kt, t.memoizedState.cache), ua());
					break;
				case 27:
				case 5:
					jt(r);
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
						s = ca(t, r, a, !1);
						var c = r.child.childLanes;
						return s || (a & c) !== 0 ? E0(t, r, a) : (xi(r), (t = Jr(t, r, a)), t !== null ? t.sibling : null);
					}
					xi(r);
					break;
				case 19:
					if (r.flags & 128) return Qd(t, r, a);
					if (
						((c = (t.flags & 128) !== 0),
						(s = (a & r.childLanes) !== 0),
						s || (ca(t, r, a, !1), (s = (a & r.childLanes) !== 0)),
						c)
					) {
						if (s) return Qd(t, r, a);
						r.flags |= 128;
					}
					if (
						((c = r.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						Os(r, on.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((r.lanes = 0), v0(t, r, a, r.pendingProps));
				case 24:
					Ei(r, kt, t.memoizedState.cache);
			}
			return Jr(t, r, a);
		}
		function x0(t, r, a) {
			if (t !== null)
				if (t.memoizedProps !== r.pendingProps) Lt = !0;
				else {
					if (!Yd(t, a) && (r.flags & 128) === 0) return ((Lt = !1), ET(t, r, a));
					Lt = (t.flags & 131072) !== 0;
				}
			else ((Lt = !1), Ve && (r.flags & 1048576) !== 0 && oy(r, ps, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var s = r.pendingProps;
						if (((t = ma(r.elementType)), (r.type = t), typeof t == "function"))
							td(t)
								? ((s = Sa(t, s)), (r.tag = 1), (r = S0(null, r, t, s, a)))
								: ((r.tag = 0), (r = Bd(null, r, t, s, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === te) {
									((r.tag = 11), (r = h0(null, r, t, s, a)));
									break e;
								} else if (c === ee) {
									((r.tag = 14), (r = m0(null, r, t, s, a)));
									break e;
								} else if (c === B) {
									((r.tag = 10), (r.type = t), (r = T0(null, r, a)));
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
					return ((s = r.type), (c = Sa(s, r.pendingProps)), S0(t, r, s, c, a));
				case 3:
					e: {
						if ((Qn(r, r.stateNode.containerInfo), t === null)) throw Error(u(387));
						s = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), md(t, r), xs(r, s, null, a));
						var v = r.memoizedState;
						if (
							((s = v.cache), Ei(r, kt, s), s !== d.cache && ud(r, [kt], a, !0), Ts(), (s = v.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: v.cache }),
								(r.updateQueue.baseState = d),
								(r.memoizedState = d),
								r.flags & 256)
							) {
								r = w0(t, r, s, a);
								break e;
							} else if (s !== c) {
								((c = Gn(Error(u(424)), r)), bs(c), (r = w0(t, r, s, a)));
								break e;
							} else {
								switch (((t = r.stateNode.containerInfo), t.nodeType)) {
									case 9:
										t = t.body;
										break;
									default:
										t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
								}
								for (gt = nr(t.firstChild), Gt = r, Ve = !0, Si = null, Wn = !0, a = by(r, null, s, a), r.child = a; a;)
									((a.flags = (a.flags & -3) | 134221824), (a = a.sibling));
							}
						else {
							if ((ua(), s === c)) {
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
						mo(t, r),
						t === null
							? (a = Wp(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Ve || (r.stateNode = Mp(r.type, r.pendingProps, At.current, r))
							: (r.memoizedState = Wp(r.type, t.memoizedProps, r.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						jt(r),
						t === null &&
							Ve &&
							((s = r.stateNode = Kp(r.type, r.pendingProps, At.current)),
							(Gt = r),
							(Wn = !0),
							(c = gt),
							ji(r.type) ? (($h = c), (gt = nr(s.firstChild))) : (gt = c)),
						Ft(t, r, r.pendingProps.children, a),
						mo(t, r),
						t === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						t === null &&
							Ve &&
							((c = s = gt) &&
								((s = mx(s, r.type, r.pendingProps, Wn)),
								s !== null ? ((r.stateNode = s), (Gt = r), (gt = nr(s.firstChild)), (Wn = !1), (c = !0)) : (c = !1)),
							c || wi(r)),
						jt(r),
						(c = r.type),
						(d = r.pendingProps),
						(v = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Ih(c, d) ? (s = null) : v !== null && Ih(c, v) && (r.flags |= 32),
						r.memoizedState !== null && ((c = Ed(t, r, uT, null, null, a)), (Do._currentValue = c)),
						mo(t, r),
						Ft(t, r, s, a),
						r.child
					);
				case 6:
					return (
						t === null &&
							Ve &&
							((t = a = gt) &&
								((a = gx(a, r.pendingProps, Wn)),
								a !== null ? ((r.stateNode = a), (Gt = r), (gt = null), (t = !0)) : (t = !1)),
							t || wi(r)),
						null
					);
				case 13:
					return E0(t, r, a);
				case 4:
					return (
						Qn(r, r.stateNode.containerInfo),
						(s = r.pendingProps),
						t === null ? (r.child = va(r, null, s, a)) : Ft(t, r, s, a),
						r.child
					);
				case 11:
					return h0(t, r, r.type, r.pendingProps, a);
				case 7:
					return ((s = r.pendingProps), mo(t, r), Ft(t, r, s, a), r.child);
				case 8:
					return (Ft(t, r, r.pendingProps.children, a), r.child);
				case 12:
					return (Ft(t, r, r.pendingProps.children, a), r.child);
				case 10:
					return T0(t, r, a);
				case 9:
					return (
						(c = r.type._context),
						(s = r.pendingProps.children),
						fa(r),
						(c = rn(c)),
						(s = s(c)),
						(r.flags |= 1),
						Ft(t, r, s, a),
						r.child
					);
				case 14:
					return m0(t, r, r.type, r.pendingProps, a);
				case 15:
					return g0(t, r, r.type, r.pendingProps, a);
				case 19:
					return Qd(t, r, a);
				case 31:
					return ST(t, r, a);
				case 22:
					return v0(t, r, a, r.pendingProps);
				case 24:
					return (
						fa(r),
						(s = rn(kt)),
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
								Ei(r, kt, c))
							: ((t.lanes & a) !== 0 && (md(t, r), xs(r, null, null, a), Ts()),
								(c = t.memoizedState),
								(d = r.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Ei(r, kt, s))
									: ((s = d.cache), Ei(r, kt, s), s !== c.cache && ud(r, [kt], a, !0))),
						Ft(t, r, r.pendingProps.children, a),
						r.child
					);
				case 30:
					return (
						r.stateNode === null && (r.stateNode = { autoName: null, paired: null, clones: null, ref: null }),
						(s = r.pendingProps),
						s.name != null && s.name !== "auto" ? (r.flags |= t === null ? 18882560 : 18874368) : Ve && sl(r),
						t !== null && t.memoizedProps.name !== s.name ? (r.flags |= 4194816) : mo(t, r),
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
					(d = a === null ? rb(r, s) : rb(r, s) && (s.src !== a.src || s.srcSet !== a.srcSet)),
				d)
			) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (sp()) t.flags |= 8192;
					else throw ((ga = ml), dd);
			} else t.flags &= -16777217;
		}
		function O0(t, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !ib(r)))
				if (sp()) t.flags |= 8192;
				else throw ((ga = ml), dd);
		}
		function zl(t, r) {
			(r !== null && (t.flags |= 4),
				t.flags & 16384 && ((r = t.tag !== 22 ? rv() : 536870912), (t.lanes |= r), (bo |= r)));
		}
		function Ds(t, r) {
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
		function _T(t, r, a) {
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
						Kr(kt),
						Ct(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(oo(r)
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
							? (Wr(r), d !== null ? (vt(r), O0(r, d)) : (vt(r), Kd(r, c, null, s, a)))
							: d
								? d !== t.memoizedState
									? (Wr(r), vt(r), O0(r, d))
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
						((t = Qe.current), oo(r) ? uy(r, t) : ((t = Kp(c, s, a)), (r.stateNode = t), Wr(r)));
					}
					return (vt(r), (r.subtreeFlags &= -33554433), null);
				case 5:
					if ((hn(r), (c = r.type), t !== null && r.stateNode != null)) t.memoizedProps !== s && Wr(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(u(166));
							return (vt(r), (r.subtreeFlags &= -33554433), null);
						}
						if (((d = Qe.current), oo(r))) uy(r, d);
						else {
							var v = $s(At.current);
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
						if (((t = At.current), oo(r))) {
							if (((t = r.stateNode), (a = r.memoizedProps), (s = null), (c = Gt), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[nn] = r),
								(t = !!(t.nodeValue === a || (s !== null && s.suppressHydrationWarning === !0) || Op(t.nodeValue, a))),
								t || wi(r, !0));
						} else ((t = $s(t).createTextNode(s)), (t[nn] = r), (r.stateNode = t));
					}
					return (vt(r), null);
				case 31:
					if (((a = r.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = oo(r)), a !== null)) {
							if (t === null) {
								if (!s) throw Error(u(318));
								if (((t = r.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(u(557));
								t[nn] = r;
							} else (ua(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
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
						if (((c = oo(r)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(u(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(u(317));
								c[nn] = r;
							} else (ua(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
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
								zl(r, r.updateQueue),
								vt(r),
								null)
					);
				case 4:
					return (Ct(), t === null && _p(r.stateNode.containerInfo), (r.flags |= 67108864), vt(r), null);
				case 10:
					return (Kr(r.type), vt(r), null);
				case 19:
					if ((Sd(r), (s = r.memoizedState), s === null)) return (vt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) Ds(s, !1);
						else {
							if (Mt !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = r.child; t !== null;) {
									if (((d = pl(t)), d !== null)) {
										for (
											r.flags |= 128,
												Ds(s, !1),
												t = d.updateQueue,
												r.updateQueue = t,
												zl(r, t),
												r.subtreeFlags = 0,
												t = a,
												a = r.child;
											a !== null;
										)
											(ry(a, t), (a = a.sibling));
										return (Os(r, (on.current & 1) | 2), Ve && Qr(r, s.treeForkCount), r.child);
									}
									t = t.sibling;
								}
							s.tail !== null && tn() > Zl && ((r.flags |= 128), (c = !0), Ds(s, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = pl(d)), t !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(r.updateQueue = t),
									zl(r, t),
									Ds(s, !0),
									s.tail === null && s.tailMode !== "collapsed" && s.tailMode !== "visible" && !d.alternate && !Ve)
								)
									return (vt(r), null);
							} else
								2 * tn() - s.renderingStartTime > Zl &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), Ds(s, !1), (r.lanes = 4194304));
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
								? Os(r, d)
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
						a !== null && zl(r, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(s = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (s = r.memoizedState.cachePool.pool),
						s !== a && (r.flags |= 2048),
						t !== null && et(ha),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						r.memoizedState.cache !== a && (r.flags |= 2048),
						Kr(kt),
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
		function CT(t, r) {
			switch ((id(r), r.tag)) {
				case 1:
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 3:
					return (
						Kr(kt),
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
						ua();
					}
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 13:
					if ((Un(r), (t = r.memoizedState), t !== null && t.dehydrated !== null)) {
						if (r.alternate === null) throw Error(u(340));
						ua();
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
						t !== null && et(ha),
						(t = r.flags),
						t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
					);
				case 24:
					return (Kr(kt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function A0(t, r) {
			switch ((id(r), r.tag)) {
				case 3:
					(Kr(kt), Ct());
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
					(Un(r), pd(), t !== null && et(ha));
					break;
				case 24:
					Kr(kt);
			}
		}
		function zs(t, r) {
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
				at(r, r.return, C);
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
									at(c, I, J);
								}
							}
						}
						s = s.next;
					} while (s !== d);
				}
			} catch (J) {
				at(r, r.return, J);
			}
		}
		function R0(t) {
			var r = t.updateQueue;
			if (r !== null) {
				var a = t.stateNode;
				try {
					wy(r, a);
				} catch (s) {
					at(t, t.return, s);
				}
			}
		}
		function N0(t, r, a) {
			((a.props = Sa(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (s) {
				at(t, r, s);
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
							((c.ref === null || c.ref.name !== d) && (c.ref = Up(d)), (s = c.ref));
							break;
						case 7:
							if (t.stateNode === null) {
								var v = new $n(t);
								(y(t.child, !1, dx, v, void 0, void 0), (t.stateNode = v));
							}
							s = t.stateNode;
							break;
						default:
							s = t.stateNode;
					}
					typeof a == "function" ? (t.refCleanup = a(s)) : (a.current = s);
				}
			} catch (C) {
				at(t, r, C);
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
						at(t, r, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						at(t, r, c);
					}
				else a.current = null;
		}
		function Il(t, r) {
			if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && r !== null)
				for (var a = 0; a < r.length; a++) Zp(t.stateNode, r[a]);
		}
		function M0(t) {
			for (var r = t.return; r !== null && (Xd(r) && Zp(t.stateNode, r.stateNode), !Gd(r));) r = r.return;
		}
		function Is(t) {
			for (var r = t.return; r !== null && (Xd(r) && hx(t.stateNode, r.stateNode), !Gd(r));) r = r.return;
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
				at(t, t.return, c);
			}
		}
		function Wd(t, r, a) {
			try {
				var s = t.stateNode;
				(YT(s, t.type, a, r), (s[Cn] = r));
			} catch (c) {
				at(t, t.return, c);
			}
		}
		function D0(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ji(t.type)) || t.tag === 4;
		}
		function eh(t) {
			e: for (;;) {
				for (; t.sibling === null;) {
					if (t.return === null || D0(t.return)) return null;
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
					Il(t, s),
					(Xe = !0));
			else if (
				c !== 4 &&
				(c === 27 && (Il(t, s), (s = null), ji(t.type) && ((a = t.stateNode), (r = null))), (t = t.child), t !== null)
			)
				for (th(t, r, a, s), t = t.sibling; t !== null;) (th(t, r, a, s), (t = t.sibling));
		}
		function jl(t, r, a, s) {
			var c = t.tag;
			if (c === 5 || c === 6) ((c = t.stateNode), r ? a.insertBefore(c, r) : a.appendChild(c), Il(t, s), (Xe = !0));
			else if (
				c !== 4 &&
				(c === 27 && (Il(t, s), (s = null), ji(t.type) && (a = t.stateNode)), (t = t.child), t !== null)
			)
				for (jl(t, r, a, s), t = t.sibling; t !== null;) (jl(t, r, a, s), (t = t.sibling));
		}
		function z0(t) {
			var r = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var s = t.type, c = r.attributes; c.length;) r.removeAttributeNode(c[0]);
				(un(r, s, a), (r[nn] = t), (r[Cn] = a));
			} catch (d) {
				at(t, t.return, d);
			}
		}
		var kl = !1,
			Vn = null;
		function I0(t) {
			(t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (kl = !0);
		}
		var Tr = null;
		function j0() {
			var t = Tr;
			return ((Tr = null), t);
		}
		var xn = 0;
		function go(t, r, a, s, c) {
			return ((xn = 0), k0(t.child, r, a, s, c));
		}
		function k0(t, r, a, s, c) {
			for (var d = !1; t !== null;) {
				if (t.tag === 5) {
					var v = t.stateNode;
					if (s !== null) {
						var C = qh(v);
						(s.push(C), C.view && (d = !0));
					} else d || (qh(v).view && (d = !0));
					((kl = !0), kp(v, xn === 0 ? r : r + "_" + xn, a), xn++);
				} else
					(t.tag !== 22 || t.memoizedState === null) && ((t.tag === 30 && c) || (k0(t.child, r, a, s, c) && (d = !0)));
				t = t.sibling;
			}
			return d;
		}
		function xr(t, r) {
			for (; t !== null;)
				(t.tag === 5
					? qp(t.stateNode, t.memoizedProps)
					: (t.tag !== 22 || t.memoizedState === null) && ((t.tag === 30 && r) || xr(t.child, r)),
					(t = t.sibling));
		}
		function ql(t) {
			if ((t.subtreeFlags & 18874368) !== 0)
				for (t = t.child; t !== null;) {
					if (
						(t.tag !== 22 || t.memoizedState === null) &&
						(ql(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)
					) {
						var r = t.memoizedProps;
						if (r.name == null || r.name === "auto") throw Error(u(544));
						var a = r.name;
						((r = Zr(r.default, r.share)), r !== "none" && (go(t, a, r, null, !1) || xr(t.child, !1)));
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
				d !== "none" ? (go(t, c, d, null, !1) ? (ql(t), a.paired || r || _o(t, s.onEnter)) : xr(t.child, !1)) : ql(t);
			} else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) (nh(t, r), (t = t.sibling));
			else ql(t);
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
												(go(t, s, d, null, !1)
													? ((d = t.stateNode), (c.paired = d), (d.paired = c), _o(t, a.onShare))
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
					(go(t, a, c, null, !1)
						? s !== void 0
							? ((c = t.stateNode), (s.paired = c), (c.paired = s), Vn.delete(a), _o(t, r.onShare))
							: _o(t, r.onExit)
						: xr(t.child, !1)),
					Vn !== null && rh(t));
			} else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) (ih(t), (t = t.sibling));
			else Vn !== null && rh(t);
		}
		function q0(t) {
			for (t = t.child; t !== null;) {
				if (t.tag === 30) {
					var r = t.memoizedProps,
						a = Hr(r, t.stateNode);
					((r = Zr(r.default, r.update)), (t.flags &= -5), r !== "none" && go(t, a, r, (t.memoizedState = []), !1));
				} else (t.subtreeFlags & 33554432) !== 0 && q0(t);
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
		function Ll(t) {
			if (t.tag === 30) ((t.stateNode.paired = null), xr(t.child, !1), ah(t));
			else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) (Ll(t), (t = t.sibling));
			else ah(t);
		}
		function L0(t) {
			for (t = t.child; t !== null;)
				(t.tag === 30 ? xr(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && L0(t), (t = t.sibling));
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
					((t.flags & 4) !== 0 && kp(I, xn === 0 ? a : a + "_" + xn, c),
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
		function U0(t, r) {
			for (t = t.child; t !== null;) {
				if (t.tag === 30) {
					var a = t.memoizedProps,
						s = t.stateNode,
						c = Hr(a, s),
						d = Zr(a.default, a.update);
					if (r) {
						s = s.clones;
						var v = s === null ? null : s.map(ex);
					} else ((v = t.memoizedState), (t.memoizedState = null));
					s = t;
					var C = t.child;
					((xn = 0), (c = oh(s, C, c, c, d, v, !1)), (t.flags & 4) !== 0 && c && (r || _o(t, a.onUpdate)));
				} else (t.subtreeFlags & 33554432) !== 0 && U0(t, r);
				t = t.sibling;
			}
		}
		var Xt = !1,
			rt = !1,
			Or = !1,
			sh = !1,
			V0 = typeof WeakSet == "function" ? WeakSet : Set,
			Jt = null,
			Ar = !1,
			js = !1,
			Ul = !1,
			uh = !1;
		function TT(t, r, a) {
			if (((t = t.containerInfo), (Dh = zo), (t = Qv(t)), Yf(t))) {
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
				zh = { focusedElem: t, selectionRange: s }, zo = !1, a = (a & 335544064) === a, Jt = r, r = a ? 9270 : 1024;
				Jt !== null;
			) {
				if (((t = Jt), a && ((s = t.deletions), s !== null))) for (d = 0; d < s.length; d++) a && ih(s[d]);
				if (t.alternate === null && (t.flags & 2) !== 0) (a && I0(t), Vl(a));
				else {
					if (t.tag === 22) {
						if (((s = t.alternate), t.memoizedState !== null)) {
							(s !== null && s.memoizedState === null && a && ih(s), Vl(a));
							continue;
						} else if (s !== null && s.memoizedState !== null) {
							(a && I0(t), Vl(a));
							continue;
						}
					}
					((s = t.child), (t.subtreeFlags & r) !== 0 && s !== null ? ((s.return = t), (Jt = s)) : (a && q0(t), Vl(a)));
				}
			}
			Vn = null;
		}
		function Vl(t) {
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
								var v = Sa(r.type, c);
								((a = d.getSnapshotBeforeUpdate(v, s)), (d.__reactInternalSnapshotBeforeUpdate = a));
							} catch (C) {
								at(r, r.return, C);
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
							c !== "none" && go(s, a, c, (s.memoizedState = []), !0));
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
		function B0(t, r, a) {
			var s = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(Rr(t, a), s & 4 && zs(5, a));
					break;
				case 1:
					if ((Rr(t, a), s & 4))
						if (((t = a.stateNode), r === null))
							try {
								t.componentDidMount();
							} catch (v) {
								at(a, a.return, v);
							}
						else {
							var c = Sa(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								t.componentDidUpdate(c, r, t.__reactInternalSnapshotBeforeUpdate);
							} catch (v) {
								at(a, a.return, v);
							}
						}
					(s & 64 && R0(a), s & 512 && Cr(a, a.return));
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
							wy(t, r);
						} catch (v) {
							at(a, a.return, v);
						}
					}
					break;
				case 27:
					r === null && s & 4 && z0(a);
				case 26:
				case 5:
					(Rr(t, a), r === null && s & 4 && Jd(a), s & 512 && Cr(a, a.return));
					break;
				case 12:
					Rr(t, a);
					break;
				case 31:
					(Rr(t, a), s & 4 && Z0(t, a));
					break;
				case 13:
					(Rr(t, a),
						s & 4 && F0(t, a),
						s & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = qT.bind(null, a)), vx(t, a)))));
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
			for (t = t.child; t !== null;) (P0(t, r), (t = t.sibling));
		}
		function P0(t, r) {
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
						at(t, t.return, I);
					}
					ch(t, r);
					break;
				case 6:
					try {
						((t.stateNode.nodeValue = r ? "" : t.memoizedProps), (Xe = !0));
					} catch (I) {
						at(t, t.return, I);
					}
					break;
				case 18:
					try {
						var C = t.stateNode;
						r ? jp(C, !0) : jp(t.stateNode, !1);
					} catch (I) {
						at(t, t.return, I);
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
								P0(a, s);
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
		function $0(t) {
			var r = t.alternate;
			(r !== null && ((t.alternate = null), $0(r)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((r = t.stateNode), r !== null && Zu(r)),
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
			for (a = a.child; a !== null;) (H0(t, r, a), (a = a.sibling));
		}
		function H0(t, r, a) {
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
					(rt || sn(a, r), Is(a));
					var s = wt,
						c = On;
					(ji(a.type) && ((wt = a.stateNode), (On = !1)),
						cr(t, r, a),
						Gp(a.stateNode, a.type, a.memoizedProps),
						(wt = s),
						(On = c));
					break;
				case 5:
					(rt || sn(a, r), Is(a));
				case 6:
					if ((a.tag === 6 && Is(a), (s = wt), (c = On), (wt = null), cr(t, r, a), (wt = s), (On = c), wt !== null))
						if (On)
							try {
								((wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(
									a.stateNode,
								),
									(Xe = !0));
							} catch (d) {
								at(a, r, d);
							}
						else
							try {
								(wt.removeChild(a.stateNode), (Xe = !0));
							} catch (d) {
								at(a, r, d);
							}
					break;
				case 18:
					wt !== null &&
						(On
							? ((t = wt),
								Ip(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								Io(t))
							: Ip(wt, a.stateNode));
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
					(rt || (sn(a, r), (s = a.stateNode), typeof s.componentWillUnmount == "function" && N0(a, r, s)),
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
		function Z0(t, r) {
			if (r.memoizedState === null && ((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Io(t);
				} catch (a) {
					at(r, r.return, a);
				}
			}
		}
		function F0(t, r) {
			if (
				r.memoizedState === null &&
				((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Io(t);
				} catch (a) {
					at(r, r.return, a);
				}
		}
		function xT(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var r = t.stateNode;
					return (r === null && (r = t.stateNode = new V0()), r);
				case 22:
					return ((t = t.stateNode), (r = t._retryCache), r === null && (r = t._retryCache = new V0()), r);
				default:
					throw Error(u(435, t.tag));
			}
		}
		function Bl(t, r) {
			var a = xT(t);
			r.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = LT.bind(null, t, s);
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
					(H0(v, C, d), (wt = null), (On = !1), (v = d.alternate), v !== null && (v.return = null), (d.return = null));
				}
			if (r.subtreeFlags & 13886) for (r = r.child; r !== null;) (Q0(r, t, a), (r = r.sibling));
		}
		var fr = null;
		function Q0(t, r, a) {
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
					(wn(r, t, a), En(t), c & 4 && (Ai(3, t, t.return), zs(3, t), Ai(5, t, t.return)));
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
									if (Xt) t.stateNode = Mp(t.type, t.memoizedProps, r.containerInfo, t);
									else {
										e: {
											((r = t.type), (a = t.memoizedProps), (c = d.ownerDocument || d));
											t: switch (r) {
												case "title":
													((s = c.getElementsByTagName("title")[0]),
														(!s ||
															s[ss] ||
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
													if ((d = nb("link", "href", c).get(r + (a.href || "")))) {
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
													if ((d = nb("meta", "content", c).get(r + (a.content || "")))) {
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
							else t.stateNode = tb(d, a, t.memoizedProps);
						else
							c !== a
								? (c === null ? ((r = s.stateNode), r === null || rt || r.parentNode.removeChild(r)) : c.count--,
									a === null ? Xt || Qh(d, t.type, t.stateNode) : tb(d, a, t.memoizedProps))
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
							(Ga(r, ""), (Xe = !0));
						} catch (J) {
							at(t, t.return, J);
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
							at(t, t.return, J);
						}
					}
					break;
				case 3:
					if (
						((Xe = !1),
						(nc = null),
						(d = fr),
						(fr = Hs(r.containerInfo)),
						wn(r, t, a),
						(fr = d),
						En(t),
						c & 4 && s !== null && s.memoizedState.isDehydrated)
					)
						try {
							Io(r.containerInfo);
						} catch (J) {
							at(t, t.return, J);
						}
					(sh && ((sh = !1), Y0(t)), (Xe = !1));
					break;
				case 4:
					((c = Or),
						(Or = Xt),
						(s = yv()),
						(d = fr),
						(fr = Hs(t.stateNode.containerInfo)),
						wn(r, t, a),
						En(t),
						(fr = d),
						Xe && js && (Ul = !0),
						(Xe = s),
						(Or = c));
					break;
				case 12:
					(wn(r, t, a), En(t));
					break;
				case 31:
					(wn(r, t, a), En(t), c & 4 && ((r = t.updateQueue), r !== null && ((t.updateQueue = null), Bl(t, r))));
					break;
				case 13:
					(wn(r, t, a),
						En(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (s !== null && s.memoizedState !== null) &&
							(Hl = tn()),
						c & 4 && ((r = t.updateQueue), r !== null && ((t.updateQueue = null), Bl(t, r))));
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
							r !== null && ((a = r.retryQueue), a !== null && ((r.retryQueue = null), Bl(t, a)))));
					break;
				case 19:
					(wn(r, t, a), En(t), c & 4 && ((r = t.updateQueue), r !== null && ((t.updateQueue = null), Bl(t, r))));
					break;
				case 30:
					(c & 512 && (rt || s === null || sn(s, s.return)),
						(c = yv()),
						(d = js),
						(v = (a & 335544064) === a),
						(C = t.memoizedProps),
						(js = v && Zr(C.default, C.update) !== "none"),
						wn(r, t, a),
						En(t),
						v && s !== null && Xe && (t.flags |= 4),
						(js = d),
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
						if (D0(s)) {
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
							jl(t, eh(t), C, v);
							break;
						case 5:
							var I = a.stateNode;
							(a.flags & 32 && (Ga(I, ""), (a.flags &= -33)), jl(t, eh(t), I, v));
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
					at(t, t.return, J);
				}
				t.flags &= -3;
			}
			r & 4096 && (t.flags &= -4097);
		}
		function Y0(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null;) {
					var r = t;
					(Y0(r),
						r.tag === 5 && r.flags & 1024 && ((r = r.stateNode), (zo = !0), r.reset(), (zo = !1)),
						(t = t.sibling));
				}
		}
		function vo(t, r) {
			if (r.subtreeFlags & 9270) for (r = r.child; r !== null;) (K0(r, t), (r = r.sibling));
			else U0(r, !1);
		}
		function K0(t, r) {
			var a = t.alternate;
			if (a === null) nh(t, !1);
			else
				switch (t.tag) {
					case 3:
						if (((uh = Ar = !1), j0(), vo(r, t), !Ar && !Ul)) {
							if (((t = Tr), t !== null))
								for (var s = 0; s < t.length; s += 3) {
									a = t[s];
									var c = t[s + 1];
									(qp(a, t[s + 2]),
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
						vo(r, t);
						break;
					case 4:
						((s = Ar), (Ar = !1), vo(r, t), Ar && (Ul = !0), (Ar = s));
						break;
					case 22:
						t.memoizedState === null && (a.memoizedState !== null ? nh(t, !1) : vo(r, t));
						break;
					case 30:
						((s = Ar), (c = j0()), (Ar = !1), vo(r, t), Ar && (t.flags |= 4));
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
								? (_o(t, t.memoizedProps.onUpdate), (Tr = c))
								: c !== null && (c.push.apply(c, Tr), (Tr = c)),
							(Ar = (t.flags & 32) !== 0 ? !0 : s));
						break;
					default:
						vo(r, t);
				}
		}
		function Rr(t, r) {
			if (r.subtreeFlags & 8772) for (r = r.child; r !== null;) (B0(t, r.alternate, r), (r = r.sibling));
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
						(typeof c.componentWillUnmount == "function" && N0(a, a.return, c), Ri(a, s));
						break;
					case 27:
						(s & 2) !== 0 && Gp(a.stateNode, a.type, a.memoizedProps);
					case 5:
						(sn(a, a.return), (a.tag !== 5 && a.tag !== 27) || Is(a), Ri(a, s));
						break;
					case 6:
						Is(a);
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
						(dr(c, d, a), zs(4, d));
						break;
					case 1:
						if ((dr(c, d, a), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (J) {
								at(s, s.return, J);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var I = s.stateNode;
							try {
								var Q = c.shared.hiddenCallbacks;
								if (Q !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < Q.length; c++) Sy(Q[c], I);
							} catch (J) {
								at(s, s.return, J);
							}
						}
						(C && v & 64 && R0(d), Cr(d, d.return));
						break;
					case 27:
						(a & 2) !== 0 && z0(d);
					case 5:
						((d.tag !== 5 && d.tag !== 27) || M0(d), dr(c, d, a), C && s === null && v & 4 && Jd(d), Cr(d, d.return));
						break;
					case 6:
						M0(d);
						break;
					case 26:
						((I = d.stateNode),
							d.memoizedState !== null || I === null || Xt || Qh(Hs(I.ownerDocument), d.type, I),
							dr(c, d, a),
							C && s === null && v & 4 && Jd(d),
							Cr(d, d.return));
						break;
					case 12:
						dr(c, d, a);
						break;
					case 31:
						(dr(c, d, a), C && v & 4 && Z0(c, d));
						break;
					case 13:
						(dr(c, d, a), C && v & 4 && F0(c, d));
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
				t !== a && (t != null && t.refCount++, a != null && Ss(a)));
		}
		function dh(t, r) {
			((t = null),
				r.alternate !== null && (t = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== t && (r.refCount++, t != null && Ss(t)));
		}
		function er(t, r, a, s) {
			var c = (a & 335544064) === a;
			if (r.subtreeFlags & (c ? 10262 : 10256)) for (r = r.child; r !== null;) (G0(t, r, a, s), (r = r.sibling));
			else c && L0(r);
		}
		function G0(t, r, a, s) {
			var c = (a & 335544064) === a;
			c && r.alternate === null && r.return !== null && r.return.alternate !== null && Ll(r);
			var d = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(er(t, r, a, s), d & 2048 && zs(9, r));
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
							r !== d && (r.refCount++, d != null && Ss(d))));
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
							at(r, r.return, Q);
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
							? (c && C !== null && C.memoizedState === null && Ll(C), v._visibility & 2 ? er(t, r, a, s) : ks(t, r))
							: (c && C !== null && C.memoizedState !== null && Ll(r),
								v._visibility & 2
									? er(t, r, a, s)
									: ((v._visibility |= 2), yo(t, r, a, s, (r.subtreeFlags & 10256) !== 0 || !1))),
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
		function yo(t, r, a, s, c) {
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
						(yo(d, v, C, I, c), zs(8, v));
						break;
					case 23:
						break;
					case 22:
						var J = v.stateNode;
						(v.memoizedState !== null
							? J._visibility & 2
								? yo(d, v, C, I, c)
								: ks(d, v)
							: ((J._visibility |= 2), yo(d, v, C, I, c)),
							c && Q & 2048 && fh(v.alternate, v));
						break;
					case 24:
						(yo(d, v, C, I, c), c && Q & 2048 && dh(v.alternate, v));
						break;
					default:
						yo(d, v, C, I, c);
				}
				r = r.sibling;
			}
		}
		function ks(t, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null;) {
					var a = t,
						s = r,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(ks(a, s), c & 2048 && fh(s.alternate, s));
							break;
						case 24:
							(ks(a, s), c & 2048 && dh(s.alternate, s));
							break;
						default:
							ks(a, s);
					}
					r = r.sibling;
				}
		}
		var wa = 8192;
		function Ea(t, r, a) {
			if (t.subtreeFlags & wa) for (t = t.child; t !== null;) (X0(t, r, a), (t = t.sibling));
		}
		function X0(t, r, a) {
			switch (t.tag) {
				case 26:
					(Ea(t, r, a),
						t.flags & wa &&
							(t.memoizedState !== null
								? Nx(a, fr, t.memoizedState, t.memoizedProps)
								: ((t = t.stateNode), (r & 335544128) === r && ob(a, t))));
					break;
				case 5:
					(Ea(t, r, a), t.flags & wa && ((t = t.stateNode), (r & 335544128) === r && ob(a, t)));
					break;
				case 3:
				case 4:
					var s = fr;
					((fr = Hs(t.stateNode.containerInfo)), Ea(t, r, a), (fr = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = wa), (wa = 16777216), Ea(t, r, a), (wa = s)) : Ea(t, r, a));
					break;
				case 30:
					if ((t.flags & wa) !== 0 && ((s = t.memoizedProps.name), s != null && s !== "auto")) {
						var c = t.stateNode;
						((c.paired = null), Vn === null && (Vn = new Map()), Vn.set(s, c));
					}
					Ea(t, r, a);
					break;
				default:
					Ea(t, r, a);
			}
		}
		function J0(t) {
			var r = t.alternate;
			if (r !== null && ((t = r.child), t !== null)) {
				r.child = null;
				do ((r = t.sibling), (t.sibling = null), (t = r));
				while (t !== null);
			}
		}
		function qs(t) {
			var r = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((Jt = s), ep(s, t));
					}
				J0(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) (W0(t), (t = t.sibling));
		}
		function W0(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(qs(t), t.flags & 2048 && Ai(9, t, t.return));
					break;
				case 3:
					qs(t);
					break;
				case 12:
					qs(t);
					break;
				case 22:
					var r = t.stateNode;
					t.memoizedState !== null && r._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((r._visibility &= -3), Pl(t))
						: qs(t);
					break;
				default:
					qs(t);
			}
		}
		function Pl(t) {
			var r = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((Jt = s), ep(s, t));
					}
				J0(t);
			}
			for (t = t.child; t !== null;) {
				switch (((r = t), r.tag)) {
					case 0:
					case 11:
					case 15:
						(Ai(8, r, r.return), Pl(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), Pl(r)));
						break;
					default:
						Pl(r);
				}
				t = t.sibling;
			}
		}
		function ep(t, r) {
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
						Ss(a.memoizedState.cache);
				}
				if (((s = a.child), s !== null)) ((s.return = a), (Jt = s));
				else
					e: for (a = t; Jt !== null;) {
						s = Jt;
						var c = s.sibling,
							d = s.return;
						if (($0(s), s === a)) {
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
		var OT = {
				getCacheForType: function (t) {
					var r = rn(kt),
						a = r.data.get(t);
					return (a === void 0 && ((a = t()), r.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return rn(kt).controller.signal;
				},
			},
			AT = typeof WeakMap == "function" ? WeakMap : Map,
			tt = 0,
			dt = null,
			Pe = null,
			He = 0,
			it = 0,
			Bn = null,
			Ni = !1,
			po = !1,
			hh = !1,
			ei = 0,
			Mt = 0,
			Mi = 0,
			_a = 0,
			$l = 0,
			Pn = 0,
			bo = 0,
			Ls = null,
			An = null,
			mh = !1,
			Hl = 0,
			tp = 0,
			Zl = 1 / 0,
			Fl = null,
			Di = null,
			xt = 0,
			hr = null,
			Ca = null,
			Nr = 0,
			gh = 0,
			vh = null,
			np = null,
			So = null,
			wo = null,
			Eo = null,
			Us = 0,
			Ql = null;
		function tr() {
			return (tt & 2) !== 0 && He !== 0 ? He & -He : ce.T !== null ? xh() : uv();
		}
		function rp() {
			if (Pn === 0)
				if ((He & 536870912) === 0 || Ve) {
					var t = Vu;
					((Vu <<= 1), (Vu & 3932160) === 0 && (Vu = 262144), (Pn = t));
				} else Pn = 536870912;
			return ((t = an.current), t !== null && (t.flags |= 32), Pn);
		}
		function _o(t, r) {
			if (r != null) {
				var a = t.stateNode,
					s = a.ref;
				(s === null && (s = a.ref = Up(Hr(t.memoizedProps, a))), wo === null && (wo = []), wo.push(r.bind(null, s)));
			}
		}
		function Rn(t, r, a) {
			(((t === dt && (it === 2 || it === 9)) || t.cancelPendingCommit !== null) && (Co(t, 0), zi(t, He, Pn, !1)),
				$u(t, a),
				((tt & 2) === 0 || t !== dt) &&
					(t === dt && ((tt & 2) === 0 && (_a |= a), Mt === 4 && zi(t, He, Pn, !1)), ti(t)));
		}
		function ip(t, r, a) {
			if ((tt & 6) !== 0) throw Error(u(327));
			var s = (!a && (r & 127) === 0 && (r & t.expiredLanes) === 0) || as(t, r),
				c = s ? MT(t, r) : ph(t, r, !0),
				d = s;
			do {
				if (c === 0) {
					po && !s && zi(t, r, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !RT(a))) {
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
								c = Ls;
								var I = C.current.memoizedState.isDehydrated;
								if ((I && (Co(C, v).flags |= 256), (v = ph(C, v, !1)), v !== 2 && v !== 6)) {
									if (hh && !I) {
										((C.errorRecoveryDisabledLanes |= d), (_a |= d), (c = 4));
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
						(Co(t, 0), zi(t, r, 0, !0));
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
						if ((r & 62914560) === r && ((c = Hl + 300 - tn()), 10 < c)) {
							if ((zi(s, r, Pn, !Ni), Pu(s, 0, !0) !== 0)) break e;
							((Nr = r),
								(s.timeoutHandle = kh(ap.bind(null, s, a, An, Fl, mh, r, Pn, _a, bo, Ni, d, "Throttled", -0, 0), c)));
							break e;
						}
						ap(s, a, An, Fl, mh, r, Pn, _a, bo, Ni, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			ti(t);
		}
		function ap(t, r, a, s, c, d, v, C, I, Q, J, oe, $, X) {
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
					X0(r, d, oe),
					we &&
						((me = oe),
						(we = t.containerInfo),
						(we = (we.nodeType === 9 ? we : we.ownerDocument).__reactViewTransition),
						we != null &&
							(me.count++, (me.waitingForViewTransition = !0), (me = Qs.bind(me)), we.finished.then(me, me))),
					(me = (d & 62914560) === d ? Hl - tn() : (d & 4194048) === d ? tp - tn() : 0),
					(me = Mx(oe, me)),
					me !== null))
			) {
				((Nr = d),
					(t.cancelPendingCommit = me(hp.bind(null, t, r, d, a, s, c, v, C, I, Q, J, oe, null, $, X))),
					zi(t, d, v, !Q));
				return;
			}
			hp(t, r, d, a, s, c, v, C, I, Q, J, oe);
		}
		function RT(t) {
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
			((r = nv(t, r)),
				(r &= ~$l),
				(r &= ~_a),
				(t.suspendedLanes |= r),
				(t.pingedLanes &= ~r),
				s && (t.warmLanes |= r),
				(s = t.expirationTimes));
			for (var c = r; 0 < c;) {
				var d = 31 - Me(c),
					v = 1 << d;
				((s[d] = -1), (c &= ~v));
			}
			a !== 0 && iv(t, a, r);
		}
		function Yl() {
			return (tt & 6) === 0 ? (Vs(0, !1), !1) : !0;
		}
		function yh() {
			if (Pe !== null) {
				if (it === 0) var t = Pe.return;
				else ((t = Pe), (Yr = la = null), Td(t), (lo = null), (_s = 0), (t = Pe));
				for (; t !== null;) (A0(t.alternate, t), (t = t.return));
				Pe = null;
			}
		}
		function Co(t, r) {
			var a = t.timeoutHandle;
			return (
				a !== -1 && ((t.timeoutHandle = -1), XT(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(Nr = 0),
				yh(),
				(dt = t),
				(Pe = a = Fr(t.current, null)),
				(He = r),
				(it = 0),
				(Bn = null),
				(Ni = !1),
				(po = as(t, r)),
				(hh = !1),
				(bo = Pn = $l = _a = Mi = Mt = 0),
				(An = Ls = null),
				(mh = !1),
				(ei = nv(t, r)),
				nl(),
				a
			);
		}
		function op(t, r) {
			((qe = null),
				(ce.H = Ol),
				r === uo || r === hl
					? ((r = vy()), (it = 3))
					: r === dd
						? ((r = vy()), (it = 4))
						: (it = r === Vd ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(Bn = r),
				Pe === null && ((Mt = 1), Al(t, Gn(r, t.current))));
		}
		function sp() {
			var t = an.current;
			return t === null
				? !0
				: (He & 4194048) === He
					? vn === null
					: (He & 62914560) === He || (He & 536870912) !== 0
						? t === vn
						: !1;
		}
		function up() {
			var t = ce.H;
			return ((ce.H = Ol), t === null ? Ol : t);
		}
		function lp() {
			var t = ce.A;
			return ((ce.A = OT), t);
		}
		function Kl() {
			((Mt = 4),
				Ni || ((He & 4194048) !== He && an.current !== null) || (po = !0),
				((Mi & 134217727) === 0 && (_a & 134217727) === 0) || dt === null || zi(dt, He, Pn, !1));
		}
		function ph(t, r, a) {
			var s = tt;
			tt |= 2;
			var c = up(),
				d = lp();
			((dt !== t || He !== r) && ((Fl = null), Co(t, r)), (r = !1));
			var v = Mt;
			e: do
				try {
					if (it !== 0 && Pe !== null) {
						var C = Pe,
							I = Bn;
						switch (it) {
							case 8:
								(yh(), (v = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								an.current === null && (r = !0);
								var Q = it;
								if (((it = 0), (Bn = null), To(t, C, I, Q), a && po)) {
									v = 0;
									break e;
								}
								break;
							default:
								((Q = it), (it = 0), (Bn = null), To(t, C, I, Q));
						}
					}
					(NT(), (v = Mt));
					break;
				} catch (J) {
					op(t, J);
				}
			while (!0);
			return (
				r && t.shellSuspendCounter++,
				(Yr = la = null),
				(tt = s),
				(ce.H = c),
				(ce.A = d),
				Pe === null && ((dt = null), (He = 0), nl()),
				v
			);
		}
		function NT() {
			for (; Pe !== null;) cp(Pe);
		}
		function MT(t, r) {
			var a = tt;
			tt |= 2;
			var s = up(),
				c = lp();
			dt !== t || He !== r ? ((Fl = null), (Zl = tn() + 500), Co(t, r)) : (po = as(t, r));
			e: do
				try {
					if (it !== 0 && Pe !== null) {
						r = Pe;
						var d = Bn;
						t: switch (it) {
							case 1:
								((it = 0), (Bn = null), To(t, r, d, 1));
								break;
							case 2:
							case 9:
								if (my(d)) {
									((it = 0), (Bn = null), fp(r));
									break;
								}
								((r = function () {
									((it !== 2 && it !== 9) || dt !== t || (it = 7), ti(t));
								}),
									d.then(r, r));
								break e;
							case 3:
								it = 7;
								break e;
							case 4:
								it = 5;
								break e;
							case 7:
								my(d) ? ((it = 0), (Bn = null), fp(r)) : ((it = 0), (Bn = null), To(t, r, d, 7));
								break;
							case 5:
								var v = null;
								switch (Pe.tag) {
									case 26:
										v = Pe.memoizedState;
									case 5:
									case 27:
										var C = Pe;
										if (v ? ib(v) : C.stateNode.complete) {
											((it = 0), (Bn = null));
											var I = C.sibling;
											if (I !== null) Pe = I;
											else {
												var Q = C.return;
												Q !== null ? ((Pe = Q), Gl(Q)) : (Pe = null);
											}
											break t;
										}
								}
								((it = 0), (Bn = null), To(t, r, d, 5));
								break;
							case 6:
								((it = 0), (Bn = null), To(t, r, d, 6));
								break;
							case 8:
								(yh(), (Mt = 6));
								break e;
							default:
								throw Error(u(462));
						}
					}
					DT();
					break;
				} catch (J) {
					op(t, J);
				}
			while (!0);
			return ((Yr = la = null), (ce.H = s), (ce.A = c), (tt = a), Pe !== null ? 0 : ((dt = null), (He = 0), nl(), Mt));
		}
		function DT() {
			for (; Pe !== null && !gi();) cp(Pe);
		}
		function cp(t) {
			var r = x0(t.alternate, t, ei);
			((t.memoizedProps = t.pendingProps), r === null ? Gl(t) : (Pe = r));
		}
		function fp(t) {
			var r = t,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = b0(a, r, r.pendingProps, r.type, void 0, He);
					break;
				case 11:
					r = b0(a, r, r.pendingProps, r.type.render, r.ref, He);
					break;
				case 5:
					Td(r);
					var s = r;
					s === Gt && (Ve ? (ul(s), s.tag === 5 && s.stateNode != null && (gt = s.stateNode)) : (ul(s), (Ve = !0)));
				default:
					(A0(a, r), (r = Pe = ry(r, ei)), (r = x0(a, r, ei)));
			}
			((t.memoizedProps = t.pendingProps), r === null ? Gl(t) : (Pe = r));
		}
		function To(t, r, a, s) {
			((Yr = la = null), Td(r), (lo = null), (_s = 0));
			var c = r.return;
			try {
				if (bT(t, c, r, a, He)) {
					((Mt = 1), Al(t, Gn(a, t.current)), (Pe = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Pe = c), d);
				((Mt = 1), Al(t, Gn(a, t.current)), (Pe = null));
				return;
			}
			r.flags & 32768
				? (Ve || s === 1
						? (t = !0)
						: po || (He & 536870912) !== 0
							? (t = !1)
							: ((Ni = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = an.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					dp(r, t))
				: Gl(r);
		}
		function Gl(t) {
			var r = t;
			do {
				if ((r.flags & 32768) !== 0) {
					dp(r, Ni);
					return;
				}
				t = r.return;
				var a = _T(r.alternate, r, ei);
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
		function dp(t, r) {
			do {
				var a = CT(t.alternate, t);
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
		function hp(t, r, a, s, c, d, v, C, I, Q, J, oe) {
			t.cancelPendingCommit = null;
			do Xl();
			while (xt !== 0);
			if ((tt & 6) !== 0) throw Error(u(327));
			if (r !== null) {
				if (r === t.current) throw Error(u(177));
				(t === dt && ((Pe = dt = null), (He = 0)),
					(Ca = r),
					(hr = t),
					(Nr = a),
					(vh = c),
					(np = s),
					zT(t, r, a, v, C, I, oe));
			}
		}
		function zT(t, r, a, s, c, d, v) {
			var C = r.lanes | r.childLanes;
			if (
				((gh = C),
				(C |= Wf),
				mC(t, a, C, s, c, d),
				(wo = null),
				(a & 335544064) === a ? ((Eo = iT(t)), (s = 10262)) : ((Eo = null), (s = 10256)),
				(r.subtreeFlags & s) !== 0 || (r.flags & s) !== 0
					? ((t.callbackNode = null),
						(t.callbackPriority = 0),
						UT(ft, function () {
							return (Eh(), null);
						}))
					: ((t.callbackNode = null), (t.callbackPriority = 0)),
				(kl = !1),
				(s = (r.flags & 13878) !== 0),
				(r.subtreeFlags & 13878) !== 0 || s)
			) {
				((s = ce.T), (ce.T = null), (c = ve.p), (ve.p = 2), (d = tt), (tt |= 4));
				try {
					TT(t, r, a);
				} finally {
					((tt = d), (ve.p = c), (ce.T = s));
				}
			}
			((xt = 1), kl ? (So = rx(v, t.containerInfo, Eo, bh, Sh, jT, wh, Eh, IT, null, null)) : (bh(), Sh(), wh()));
		}
		function IT(t) {
			if (xt !== 0) {
				var r = hr.onRecoverableError;
				r(t, { componentStack: null });
			}
		}
		function jT() {
			xt === 3 && ((xt = 0), K0(Ca, hr), (xt = 4));
		}
		function bh() {
			if (xt === 1) {
				xt = 0;
				var t = hr,
					r = Ca,
					a = Nr,
					s = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || s) {
					((s = ce.T), (ce.T = null));
					var c = ve.p;
					ve.p = 2;
					var d = tt;
					tt |= 4;
					try {
						((js = Ul = !1), Q0(r, t, a), (a = zh));
						var v = Qv(t.containerInfo),
							C = a.focusedElem,
							I = a.selectionRange;
						if (v !== C && C && C.ownerDocument && Fv(C.ownerDocument.documentElement, C)) {
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
										var Z = Zv(C, we),
											V = Zv(C, Le);
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
						((zo = !!Dh), (zh = Dh = null));
					} finally {
						((tt = d), (ve.p = c), (ce.T = s));
					}
				}
				((t.current = r), (xt = 2));
			}
		}
		function Sh() {
			if (xt === 2) {
				xt = 0;
				var t = hr,
					r = Ca,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = ce.T), (ce.T = null));
					var s = ve.p;
					ve.p = 2;
					var c = tt;
					tt |= 4;
					try {
						B0(t, r.alternate, r);
					} finally {
						((tt = c), (ve.p = s), (ce.T = a));
					}
				}
				xt = 3;
			}
		}
		function wh() {
			if (xt === 4 || xt === 3) {
				xt = 0;
				var t = So;
				((So = null), br());
				var r = hr,
					a = Ca,
					s = Nr,
					c = np,
					d = (s & 335544064) === s ? 10262 : 10256;
				if (
					((a.subtreeFlags & d) !== 0 || (a.flags & d) !== 0
						? (xt = 5)
						: ((xt = 0), (Ca = hr = null), mp(r, r.pendingLanes)),
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
					((a = ce.T), (d = ve.p), (ve.p = 2), (ce.T = null));
					try {
						for (var v = r.onRecoverableError, C = 0; C < c.length; C++) {
							var I = c[C];
							v(I.value, { componentStack: I.stack });
						}
					} finally {
						((ce.T = a), (ve.p = d));
					}
				}
				if (((c = wo), (v = Eo), (Eo = null), c !== null && ((wo = null), v === null && (v = []), t !== null)))
					for (I = 0; I < c.length; I++) ((a = (0, c[I])(v)), a !== void 0 && t.finished.finally(a));
				((Nr & 3) !== 0 && Xl(),
					ti(r),
					(d = r.pendingLanes),
					(s & 261930) !== 0 && (d & 42) !== 0 ? (r === Ql ? Us++ : ((Us = 0), (Ql = r))) : ((Us = 0), (Ql = null)),
					Vs(0, !1));
			}
		}
		function mp(t, r) {
			(t.pooledCacheLanes &= r) === 0 && ((r = t.pooledCache), r != null && ((t.pooledCache = null), Ss(r)));
		}
		function Xl() {
			return (So !== null && (So.skipTransition(), (So = null)), bh(), Sh(), wh(), Eh());
		}
		function Eh() {
			if (xt !== 5) return !1;
			var t = hr,
				r = gh;
			gh = 0;
			var a = Nf(Nr),
				s = ce.T,
				c = ve.p;
			try {
				((ve.p = 32 > a ? 32 : a), (ce.T = null), (a = vh), (vh = null));
				var d = hr,
					v = Nr;
				if (((xt = 0), (Ca = hr = null), (Nr = 0), (tt & 6) !== 0)) throw Error(u(331));
				var C = tt;
				if (
					((tt |= 4),
					W0(d.current),
					G0(d, d.current, v, a),
					(tt = C),
					Vs(0, !1),
					Ie && typeof Ie.onPostCommitFiberRoot == "function")
				)
					try {
						Ie.onPostCommitFiberRoot(Oe, d);
					} catch {}
				return !0;
			} finally {
				((ve.p = c), (ce.T = s), mp(t, r));
			}
		}
		function gp(t, r, a) {
			((r = Gn(a, r)), (r = Ud(t.stateNode, r, 2)), (t = pa(t, r, 2)), t !== null && ($u(t, 2), ti(t)));
		}
		function at(t, r, a) {
			if (t.tag === 3) gp(t, t, a);
			else
				for (; r !== null;) {
					if (r.tag === 3) {
						gp(r, t, a);
						break;
					} else if (r.tag === 1) {
						var s = r.stateNode;
						if (
							typeof r.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Di === null || !Di.has(s)))
						) {
							((t = Gn(a, t)), (a = f0(2)), (s = pa(r, a, 2)), s !== null && (d0(a, s, r, t), $u(s, 2), ti(s)));
							break;
						}
					}
					r = r.return;
				}
		}
		function _h(t, r, a) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new AT();
				var c = new Set();
				s.set(r, c);
			} else ((c = s.get(r)), c === void 0 && ((c = new Set()), s.set(r, c)));
			c.has(a) || ((hh = !0), c.add(a), (t = kT.bind(null, t, r, a)), r.then(t, t));
		}
		function kT(t, r, a) {
			var s = t.pingCache;
			(s !== null && s.delete(r),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				dt === t &&
					(He & a) === a &&
					((Mt === 4 || (Mt === 3 && (He & 62914560) === He && 300 > tn() - Hl)) && (tt & 2) === 0
						? Co(t, 0)
						: ($l |= a),
					bo === He && (bo = 0)),
				ti(t));
		}
		function vp(t, r) {
			(r === 0 && (r = rv()), (t = oa(t, r)), t !== null && ($u(t, r), ti(t)));
		}
		function qT(t) {
			var r = t.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), vp(t, a));
		}
		function LT(t, r) {
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
			(s !== null && s.delete(r), vp(t, a));
		}
		function UT(t, r) {
			return mi(t, r);
		}
		var xo = null,
			Oo = null,
			Ch = !1,
			Jl = !1,
			Th = !1,
			Ii = 0;
		function ti(t) {
			(t !== Oo && t.next === null && (Oo === null ? (xo = Oo = t) : (Oo = Oo.next = t)),
				(Jl = !0),
				Ch || ((Ch = !0), BT()));
		}
		function Vs(t, r) {
			if (!Th && Jl) {
				Th = !0;
				do
					for (var a = !1, s = xo; s !== null;) {
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
								d !== 0 && ((a = !0), Sp(s, d));
							} else
								((d = He),
									(d = Pu(s, s === dt ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || as(s, d) || ((a = !0), Sp(s, d)));
						s = s.next;
					}
				while (a);
				Th = !1;
			}
		}
		function VT() {
			yp();
		}
		function yp() {
			Jl = Ch = !1;
			var t = 0;
			Ii !== 0 && GT() && (t = Ii);
			for (var r = tn(), a = null, s = xo; s !== null;) {
				var c = s.next,
					d = pp(s, r);
				(d === 0
					? ((s.next = null), a === null ? (xo = c) : (a.next = c), c === null && (Oo = a))
					: ((a = s), (t !== 0 || (d & 3) !== 0) && (Jl = !0)),
					(s = c));
			}
			((xt !== 0 && xt !== 5) || Vs(t, !1), Ii !== 0 && (Ii = 0));
		}
		function pp(t, r) {
			for (var a = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d;) {
				var v = 31 - Me(d),
					C = 1 << v,
					I = c[v];
				(I === -1 ? ((C & a) === 0 || (C & s) !== 0) && (c[v] = hC(C, r)) : I <= r && (t.expiredLanes |= C), (d &= ~C));
			}
			if (
				((r = dt),
				(a = He),
				(a = Pu(t, t === r ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				a === 0 || (t === r && (it === 2 || it === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && pr(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || as(t, a)) {
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
				return ((s = bp.bind(null, t)), (a = mi(a, s)), (t.callbackPriority = r), (t.callbackNode = a), r);
			}
			return (s !== null && s !== null && pr(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function bp(t, r) {
			if (xt !== 0 && xt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (Xl() && t.callbackNode !== a) return null;
			var s = He;
			return (
				(s = Pu(t, t === dt ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (ip(t, s, r), pp(t, tn()), t.callbackNode != null && t.callbackNode === a ? bp.bind(null, t) : null)
			);
		}
		function Sp(t, r) {
			if (Xl()) return null;
			ip(t, r, !0);
		}
		function BT() {
			JT(function () {
				(tt & 6) !== 0 ? mi(Be, VT) : yp();
			});
		}
		function xh() {
			if (Ii === 0) {
				var t = da;
				(t === 0 && ((t = gn), (gn <<= 1), (gn & 261888) === 0 && (gn = 256)), (Ii = t));
			}
			return Ii;
		}
		function wp(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Yu(t);
		}
		function PT(t, r, a, s, c) {
			if (r === "submit" && a && a.stateNode === c) {
				var d = wp((c[Cn] || null).action),
					v = s.submitter;
				v &&
					((r = (r = v[Cn] || null) ? wp(r.formAction) : v.getAttribute("formAction")),
					r !== null && ((d = r), (v = null)));
				var C = new Ju("action", "action", null, s, c);
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
		(lr(Gv, "onAnimationEnd"),
			lr(Xv, "onAnimationIteration"),
			lr(Jv, "onAnimationStart"),
			lr("dblclick", "onDoubleClick"),
			lr("focusin", "onFocus"),
			lr("focusout", "onBlur"),
			lr(GC, "onTransitionRun"),
			lr(XC, "onTransitionStart"),
			lr(JC, "onTransitionCancel"),
			lr(Wv, "onTransitionEnd"),
			Ya("onMouseEnter", ["mouseout", "mouseover"]),
			Ya("onMouseLeave", ["mouseout", "mouseover"]),
			Ya("onPointerEnter", ["pointerout", "pointerover"]),
			Ya("onPointerLeave", ["pointerout", "pointerover"]),
			ra("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			ra("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			ra("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			ra("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			ra("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			ra("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Bs =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			$T = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bs));
		function Ep(t, r) {
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
								tl(J);
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
								tl(J);
							}
							((c.currentTarget = null), (d = I));
						}
				}
			}
		}
		function $e(t, r) {
			var a = r[cv];
			a === void 0 && (a = r[cv] = new Set());
			var s = t + "__bubble";
			a.has(s) || (Cp(r, t, 2, !1), a.add(s));
		}
		function Rh(t, r, a) {
			var s = 0;
			(r && (s |= 4), Cp(a, t, s, r));
		}
		var Wl = "_reactListening" + Math.random().toString(36).slice(2);
		function _p(t) {
			if (!t[Wl]) {
				((t[Wl] = !0),
					hv.forEach(function (a) {
						a !== "selectionchange" && ($T.has(a) || Rh(a, !1, t), Rh(a, !0, t));
					}));
				var r = t.nodeType === 9 ? t : t.ownerDocument;
				r === null || r[Wl] || ((r[Wl] = !0), Rh("selectionchange", !1, r));
			}
		}
		function Cp(t, r, a, s) {
			switch (db(r)) {
				case 2:
					var c = qx;
					break;
				case 8:
					c = Lx;
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
							if (((v = na(C)), v === null)) return;
							if (((I = v.tag), I === 5 || I === 6 || I === 26 || I === 27)) {
								s = d = v;
								continue e;
							}
							C = C.parentNode;
						}
					}
					s = s.return;
				}
			xv(function () {
				var Q = d,
					J = kf(a),
					oe = [];
				e: {
					var $ = ey.get(t);
					if ($ !== void 0) {
						var X = Ju,
							me = t;
						switch (t) {
							case "keypress":
								if (Gu(a) === 0) break e;
							case "keydown":
							case "keyup":
								X = DC;
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
								X = Rv;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								X = TC;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								X = IC;
								break;
							case Gv:
							case Xv:
							case Jv:
								X = xC;
								break;
							case Wv:
								X = jC;
								break;
							case "scroll":
							case "scrollend":
								X = CC;
								break;
							case "wheel":
								X = kC;
								break;
							case "copy":
							case "cut":
							case "paste":
								X = OC;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								X = Mv;
								break;
							case "submit":
								X = zC;
								break;
							case "toggle":
							case "beforetoggle":
								X = qC;
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
									((ie = ls(V, Z)), ie != null && we.push(Ps(V, ie, G))),
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
							X && a !== jf && (me = a.relatedTarget || a.fromElement) && (na(me) || me[os]))
						)
							break e;
						($ || X) &&
							((me = J.window === J ? J : (X = J.ownerDocument) ? X.defaultView || X.parentWindow : window),
							$
								? ((X = a.relatedTarget || a.toElement),
									($ = Q),
									(X = X ? na(X) : null),
									X !== null &&
										((Le = f(X)), (we = X.tag), X !== Le || (we !== 5 && we !== 27 && we !== 6)) &&
										(X = null))
								: (($ = null), (X = Q)),
							$ !== X &&
								((we = Rv),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(V = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((we = Mv), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (V = "pointer")),
								(Le = $ == null ? me : us($)),
								(G = X == null ? me : us(X)),
								(me = new we(ie, V + "leave", $, a, J)),
								(me.target = Le),
								(me.relatedTarget = G),
								(ie = null),
								na(J) === Q &&
									((we = new we(Z, V + "enter", X, a, J)), (we.target = G), (we.relatedTarget = Le), (ie = we)),
								(Le = ie),
								(we = $ && X ? O($, X, HT) : null),
								$ !== null && Tp(oe, me, $, we, !1),
								X !== null && Le !== null && Tp(oe, Le, X, we, !0)));
					}
					e: {
						if (
							(($ = Q ? us(Q) : window),
							(X = $.nodeName && $.nodeName.toLowerCase()),
							X === "select" || (X === "input" && $.type === "file"))
						)
							var Se = Uv;
						else if (qv($))
							if (Vv) Se = QC;
							else {
								Se = ZC;
								var Ze = HC;
							}
						else
							((X = $.nodeName),
								!X || X.toLowerCase() !== "input" || ($.type !== "checkbox" && $.type !== "radio")
									? Q && If(Q.elementType) && (Se = Uv)
									: (Se = FC));
						if (Se && (Se = Se(t, Q))) {
							Lv(oe, Se, a, J);
							break e;
						}
						Ze && Ze(t, $, Q);
					}
					switch (((Ze = Q ? us(Q) : window), t)) {
						case "focusin":
							(qv(Ze) || Ze.contentEditable === "true") && ((eo = Ze), (Kf = Q), (ys = null));
							break;
						case "focusout":
							ys = Kf = eo = null;
							break;
						case "mousedown":
							Gf = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((Gf = !1), Yv(oe, a, J));
							break;
						case "selectionchange":
							if (KC) break;
						case "keydown":
						case "keyup":
							Yv(oe, a, J);
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
						Wa
							? jv(t, a) && (je = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (je = "onCompositionStart");
					(je &&
						(Dv &&
							a.locale !== "ko" &&
							(Wa || je !== "onCompositionStart"
								? je === "onCompositionEnd" && Wa && (Re = Ov())
								: ((yi = J), (Uf = "value" in yi ? yi.value : yi.textContent), (Wa = !0))),
						(Ze = ec(Q, je)),
						0 < Ze.length &&
							((je = new Nv(je, t, null, a, J)),
							oe.push({ event: je, listeners: Ze }),
							Re ? (je.data = Re) : ((Re = kv(a)), Re !== null && (je.data = Re)))),
						(Re = UC ? VC(t, a) : BC(t, a)) &&
							((je = ec(Q, "onBeforeInput")),
							0 < je.length &&
								((Ze = new Nv("onBeforeInput", "beforeinput", null, a, J)),
								oe.push({ event: Ze, listeners: je }),
								(Ze.data = Re))),
						PT(oe, t, Q, a, J));
				}
				Ep(oe, r);
			});
		}
		function Ps(t, r, a) {
			return { instance: t, listener: r, currentTarget: a };
		}
		function ec(t, r) {
			for (var a = r + "Capture", s = []; t !== null;) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = ls(t, a)), c != null && s.unshift(Ps(t, c, d)), (c = ls(t, r)), c != null && s.push(Ps(t, c, d))),
					t.tag === 3)
				)
					return s;
				t = t.return;
			}
			return [];
		}
		function HT(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function Tp(t, r, a, s, c) {
			for (var d = r._reactName, v = []; a !== null && a !== s;) {
				var C = a,
					I = C.alternate,
					Q = C.stateNode;
				if (((C = C.tag), I !== null && I === s)) break;
				((C !== 5 && C !== 26 && C !== 27) ||
					Q === null ||
					((I = Q),
					c
						? ((Q = ls(a, d)), Q != null && v.unshift(Ps(a, Q, I)))
						: c || ((Q = ls(a, d)), Q != null && v.push(Ps(a, Q, I)))),
					(a = a.return));
			}
			v.length !== 0 && t.push({ event: r, listeners: v });
		}
		var ZT = /\r\n?/g,
			FT = /\u0000|\uFFFD/g;
		function xp(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					ZT,
					`
`,
				)
				.replace(FT, "");
		}
		function Op(t, r) {
			return ((r = xp(r)), xp(t) === r);
		}
		function ot(t, r, a, s, c, d) {
			switch (a) {
				case "children":
					if (typeof s == "string") r === "body" || (r === "textarea" && s === "") || Ga(t, s);
					else if (typeof s == "number" || typeof s == "bigint") r !== "body" && Ga(t, "" + s);
					else return;
					break;
				case "className":
					Qu(t, "class", s);
					break;
				case "tabIndex":
					Qu(t, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Qu(t, a, s);
					break;
				case "style":
					Cv(t, s, d);
					return;
				case "data":
					if (r !== "object") {
						Qu(t, "data", s);
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
					((s = Yu(s)), t.setAttribute(a, s));
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
								? (r !== "input" && ot(t, r, "name", c.name, c, null),
									ot(t, r, "formEncType", c.formEncType, c, null),
									ot(t, r, "formMethod", c.formMethod, c, null),
									ot(t, r, "formTarget", c.formTarget, c, null))
								: (ot(t, r, "encType", c.encType, c, null),
									ot(t, r, "method", c.method, c, null),
									ot(t, r, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Yu(s)), t.setAttribute(a, s));
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
					((a = Yu(s)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
					($e("beforetoggle", t), $e("toggle", t), Fu(t, "popover", s));
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
					Fu(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					return;
				default:
					if (!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N"))
						((a = EC.get(a) || a), Fu(t, a, s));
					else return;
			}
			Xe = !0;
		}
		function Mh(t, r, a, s, c, d) {
			switch (a) {
				case "style":
					Cv(t, s, d);
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
					if (typeof s == "string") Ga(t, s);
					else if (typeof s == "number" || typeof s == "bigint") Ga(t, "" + s);
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
					if (!mv.hasOwnProperty(a))
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
							((Xe = !0), a in t ? (t[a] = s) : s === !0 ? t.setAttribute(a, "") : Fu(t, a, s));
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
										ot(t, r, d, v, a, null);
								}
						}
					(c && ot(t, r, "srcSet", a.srcSet, a, null), s && ot(t, r, "src", a.src, a, null));
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
										ot(t, r, s, J, a, null);
								}
						}
					Sv(t, d, C, I, Q, v, c, !1);
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
									ot(t, r, c, C, a, null);
							}
					((r = d), (a = v), (t.multiple = !!s), r != null ? Ka(t, !!s, r, !1) : a != null && Ka(t, !!s, a, !0));
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
									ot(t, r, v, C, a, null);
							}
					Ev(t, s, c, d);
					return;
				case "option":
					for (I in a)
						if (a.hasOwnProperty(I) && ((s = a[I]), s != null))
							switch (I) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									ot(t, r, I, s, a, null);
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
					for (s = 0; s < Bs.length; s++) $e(Bs[s], t);
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
									ot(t, r, Q, s, a, null);
							}
					return;
				default:
					if (If(r)) {
						for (J in a) a.hasOwnProperty(J) && ((s = a[J]), s !== void 0 && Mh(t, r, J, s, a, void 0));
						return;
					}
			}
			for (C in a) a.hasOwnProperty(C) && ((s = a[C]), s != null && ot(t, r, C, s, a, null));
		}
		var QT = {};
		function YT(t, r, a, s) {
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
									s.hasOwnProperty(X) || ot(t, r, X, null, s, oe);
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
									X !== oe && ot(t, r, $, X, s, oe);
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
									s.hasOwnProperty(d) || ot(t, r, d, null, s, I);
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
									d !== I && ot(t, r, c, d, s, I);
							}
					((r = C),
						(a = v),
						(s = X),
						$ != null
							? Ka(t, !!a, $, !1)
							: !!s != !!a && (r != null ? Ka(t, !!a, r, !0) : Ka(t, !!a, a ? [] : "", !1)));
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
									ot(t, r, C, null, s, c);
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
									c !== d && ot(t, r, v, c, s, d);
							}
					wv(t, $, X);
					return;
				case "option":
					for (var me in a)
						if ((($ = a[me]), a.hasOwnProperty(me) && $ != null && !s.hasOwnProperty(me)))
							switch (me) {
								case "selected":
									t.selected = !1;
									break;
								default:
									ot(t, r, me, null, s, $);
							}
					for (I in s)
						if ((($ = s[I]), (X = a[I]), s.hasOwnProperty(I) && $ !== X && ($ != null || X != null)))
							switch (I) {
								case "selected":
									($ !== X && (Xe = !0), (t.selected = $ && typeof $ != "function" && typeof $ != "symbol"));
									break;
								default:
									ot(t, r, I, $, s, X);
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
						(($ = a[we]), a.hasOwnProperty(we) && $ != null && !s.hasOwnProperty(we) && ot(t, r, we, null, s, $));
					for (Q in s)
						if ((($ = s[Q]), (X = a[Q]), s.hasOwnProperty(Q) && $ !== X && ($ != null || X != null)))
							switch (Q) {
								case "children":
								case "dangerouslySetInnerHTML":
									if ($ != null) throw Error(u(137, r));
									break;
								default:
									ot(t, r, Q, $, s, X);
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
				(($ = a[Z]), a.hasOwnProperty(Z) && $ != null && !s.hasOwnProperty(Z) && ot(t, r, Z, null, s, $));
			for (oe in s)
				(($ = s[oe]),
					(X = a[oe]),
					!s.hasOwnProperty(oe) || $ === X || ($ == null && X == null) || ot(t, r, oe, $, s, X));
		}
		function Ap(t) {
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
		function KT() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, r = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						v = c.initiatorType,
						C = c.duration;
					if (d && C && Ap(v)) {
						for (v = 0, C = c.responseEnd, s += 1; s < a.length; s++) {
							var I = a[s],
								Q = I.startTime;
							if (Q > C) break;
							var J = I.transferSize,
								oe = I.initiatorType;
							J && Ap(oe) && ((I = I.responseEnd), (v += J * (I < C ? 1 : (C - Q) / (I - Q))));
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
		function $s(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Rp(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Np(t, r) {
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
		function Mp(t, r, a, s) {
			return ((a = $s(a).createElement(t)), (a[nn] = s), (a[Cn] = r), un(a, t, r), Kt(a), a);
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
		function GT() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === jh ? !1 : ((jh = t), !0)) : ((jh = null), !1);
		}
		var kh = typeof setTimeout == "function" ? setTimeout : void 0,
			XT = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Dp = typeof Promise == "function" ? Promise : void 0,
			zp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : kh,
			JT =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Dp < "u"
						? function (t) {
								return Dp.resolve(null).then(t).catch(WT);
							}
						: kh;
		function WT(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function ji(t) {
			return t === "head";
		}
		function Ip(t, r) {
			var a = r,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(t.removeChild(c), Io(r));
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
							(d[ss] ||
								C === "SCRIPT" ||
								C === "STYLE" ||
								(C === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = v));
						}
					} else a === "body" && Hh(t.ownerDocument.body);
				a = c;
			} while (a);
			Io(r);
		}
		function jp(t, r) {
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
		function kp(t, r, a) {
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
		function qp(t, r) {
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
		function Lp(t, r, a) {
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
			return Lp(t.getBoundingClientRect(), getComputedStyle(t), t);
		}
		function ex(t) {
			var r = t.getBoundingClientRect();
			r = new DOMRect(r.x + 2e4, r.y + 2e4, r.width, r.height);
			var a = getComputedStyle(t);
			return Lp(r, a, t);
		}
		function tx(t) {
			return t.documentElement.clientHeight;
		}
		function nx(t) {
			(this.addEventListener("load", t), this.addEventListener("error", t));
		}
		function rx(t, r, a, s, c, d, v, C, I) {
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
							(me === "loaded" && (tx(Q), Q.fonts.status === "loading" && we.push(Q.fonts.ready)),
							(me = we.length),
							t !== null)
						)
							for (var Le = t.suspenseyImages, Z = 0, V = 0; V < Le.length; V++) {
								var G = Le[V];
								if (!G.complete) {
									var ie = G.getBoundingClientRect();
									if (0 < ie.bottom && 0 < ie.right && ie.top < $.innerHeight && ie.left < $.innerWidth) {
										if (((Z += ab(G)), Z > rc)) {
											we.length = me;
											break;
										}
										((G = new Promise(nx.bind(G))), we.push(G));
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
		function Ta(t, r) {
			((this._scope = document.documentElement), (this._selector = "::view-transition-" + t + "(" + r + ")"));
		}
		((Ta.prototype.animate = function (t, r) {
			return (
				(r = typeof r == "number" ? { duration: r } : U({}, r)),
				(r.pseudoElement = this._selector),
				this._scope.animate(t, r)
			);
		}),
			(Ta.prototype.getAnimations = function () {
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
			(Ta.prototype.getComputedStyle = function () {
				return getComputedStyle(this._scope, this._selector);
			}));
		function Up(t) {
			return {
				name: t,
				group: new Ta("group", t),
				imagePair: new Ta("image-pair", t),
				old: new Ta("old", t),
				new: new Ta("new", t),
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
				if (Bp(d, t, r, a) === -1) {
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
						(s = Ao(a)),
						d.push({ type: t, listener: r, optionsOrUseCapture: a, attachedListener: C, cleanup: c }),
						y(this._fragmentFiber.child, !1, ix, t, C, s));
				}
				this._eventListeners = d;
			}
		};
		function ix(t, r, a, s) {
			return (j(t).addEventListener(r, a, s), !1);
		}
		$n.prototype.removeEventListener = function (t, r, a) {
			var s = this._eventListeners;
			if (s !== null && ((r = Bp(s, t, r, a)), r !== -1)) {
				var c = s[r];
				a = c.attachedListener;
				var d = c.cleanup;
				((c = Ao(c.optionsOrUseCapture)),
					y(this._fragmentFiber.child, !1, ax, t, a, c),
					s.splice(r, 1),
					d !== null && d());
			}
		};
		function ax(t, r, a, s) {
			return (j(t).removeEventListener(r, a, s), !1);
		}
		function Ao(t) {
			return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal)
				? { capture: t.capture, passive: t.passive }
				: t;
		}
		function Vp(t) {
			return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
		}
		function Bp(t, r, a, s) {
			if (t.length === 0) return -1;
			s = Vp(s);
			for (var c = 0; c < t.length; c++) {
				var d = t[c];
				if (d.type === r && d.listener === a && Vp(d.optionsOrUseCapture) === s) return c;
			}
			return -1;
		}
		(($n.prototype.dispatchEvent = function (t) {
			var r = w(this._fragmentFiber);
			if (r === null) return !0;
			r = j(r);
			var a = this._eventListeners;
			if ((a !== null && 0 < a.length) || !t.bubbles) {
				var s = r.nodeType === 9 ? r.createComment("") : document.createTextNode("");
				if (a)
					for (var c = 0; c < a.length; c++) {
						var d = a[c];
						s.addEventListener(d.type, d.attachedListener, Ao(d.optionsOrUseCapture));
					}
				if ((r.appendChild(s), (t = s.dispatchEvent(t)), a))
					for (c = 0; c < a.length; c++)
						((d = a[c]), s.removeEventListener(d.type, d.attachedListener, Ao(d.optionsOrUseCapture)));
				return (r.removeChild(s), t);
			}
			return r.dispatchEvent(t);
		}),
			($n.prototype.focus = function (t) {
				y(this._fragmentFiber.child, !0, Pp, t, void 0, void 0);
			}));
		function Pp(t, r) {
			return t.tag === 6 ? !1 : ((t = j(t)), yx(t, r));
		}
		$n.prototype.focusLast = function (t) {
			var r = [];
			y(this._fragmentFiber.child, !0, Lh, r, void 0, void 0);
			for (var a = r.length - 1; 0 <= a && !Pp(r[a], t); a--);
		};
		function Lh(t, r) {
			return (r.push(t), !1);
		}
		$n.prototype.blur = function () {
			var t = w(this._fragmentFiber);
			t !== null &&
				((t = j(t)), (t = $s(t).activeElement), t !== null && y(this._fragmentFiber.child, !1, ox, t, void 0, void 0));
		};
		function ox(t, r) {
			return t.tag === 6 ? !1 : ((t = j(t)), t === r || t.contains(r) ? (r.blur(), !0) : !1);
		}
		$n.prototype.observeUsing = function (t) {
			(this._observers === null && (this._observers = new Set()),
				this._observers.add(t),
				y(this._fragmentFiber.child, !1, sx, t, void 0, void 0));
		};
		function sx(t, r) {
			return (t.tag === 6 || ((t = j(t)), r.observe(t)), !1);
		}
		$n.prototype.unobserveUsing = function (t) {
			var r = this._observers;
			if (r !== null && r.has(t)) {
				(r.delete(t), y(this._fragmentFiber.child, !1, ux, t, void 0, void 0));
				for (var a = (r = 0); a < mr.length; a++) {
					var s = mr[a];
					s.fragmentInstance === this && s.observer === t ? t.unobserve(s.instance) : (mr[r++] = s);
				}
				mr.length = r;
			}
		};
		function ux(t, r) {
			return (t.tag === 6 || ((t = j(t)), r.unobserve(t)), !1);
		}
		var mr = [],
			Uh = !1;
		function lx(t, r, a) {
			(mr.push({ fragmentInstance: t, observer: r, instance: a }),
				Uh ||
					((Uh = !0),
					px(function () {
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
			return (y(this._fragmentFiber.child, !1, cx, t, void 0, void 0), t);
		};
		function cx(t, r) {
			if (t.tag === 6) {
				t = t.stateNode;
				var a = t.ownerDocument.createRange();
				(a.selectNodeContents(t), r.push.apply(r, a.getClientRects()));
			} else ((t = j(t)), r.push.apply(r, t.getClientRects()));
			return !1;
		}
		(($n.prototype.getRootNode = function (t) {
			var r = w(this._fragmentFiber);
			return r === null ? this : j(r).getRootNode(t);
		}),
			($n.prototype.compareDocumentPosition = function (t) {
				var r = w(this._fragmentFiber);
				if (r === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
				var a = [];
				y(this._fragmentFiber.child, !1, Lh, a, void 0, void 0);
				var s = j(r);
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
									: ((t = j(a).compareDocumentPosition(t)),
										(c =
											t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING
												? Node.DOCUMENT_POSITION_FOLLOWING
												: Node.DOCUMENT_POSITION_PRECEDING))),
						(c |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)
					);
				}
				((r = j(a[0])), (c = j(a[a.length - 1])));
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
					fx(r, this._fragmentFiber, a[0], a[a.length - 1], t)
						? r
						: Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
				);
			}));
		function fx(t, r, a, s, c) {
			var d = na(c);
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
						((r = O(a, d, z)), r === null ? (r = !1) : (y(r, !0, N, d, a), (d = M), (M = null), (r = d !== null))),
					r)
				: t & Node.DOCUMENT_POSITION_FOLLOWING
					? ((r = !!d) &&
							!(r = d === s) &&
							((r = O(s, d, z)),
							r === null ? (r = !1) : (y(r, !0, D, d, s), (d = M), (A = M = null), (r = d !== null))),
						r)
					: !1;
		}
		function $p(t, r) {
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
					((t = j(s)), $p(t, a));
					return;
				}
				if (((s = j(s)), s.nodeType !== 9)) {
					if (s.nodeType === 11) {
						((a = "host" in s ? s.host : null), a !== null && a.scrollIntoView(t));
						return;
					}
					s.scrollIntoView(t);
				}
			}
			for (s = a ? r.length - 1 : 0; s !== (a ? -1 : r.length);) {
				var c = r[s];
				(c.tag === 6 ? ((c = j(c)), $p(c, a)) : j(c).scrollIntoView(t), (s += a ? -1 : 1));
			}
		};
		function dx(t, r) {
			return ((t = j(t)), Hp(t, r), !1);
		}
		function Hp(t, r) {
			((t.reactFragments ??= new Set()), t.reactFragments.add(r));
		}
		function Zp(t, r) {
			var a = r._eventListeners;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s];
					t.addEventListener(c.type, c.attachedListener, Ao(c.optionsOrUseCapture));
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
				Hp(t, r));
		}
		function hx(t, r) {
			var a = r._eventListeners;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s];
					t.removeEventListener(c.type, c.attachedListener, Ao(c.optionsOrUseCapture));
				}
			t.nodeType !== 3 &&
				((a = r._observers),
				a !== null &&
					a.forEach(function (d) {
						typeof d.rootMargin == "string" ? lx(r, d, t) : d.unobserve(t);
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
						(Vh(a), Zu(a));
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
		function mx(t, r, a, s) {
			for (; t.nodeType === 1;) {
				var c = a;
				if (t.nodeName.toLowerCase() !== r.toLowerCase()) {
					if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (s) {
					if (!t[ss])
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
		function gx(t, r, a) {
			if (r === "") return null;
			for (; t.nodeType !== 3;)
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = nr(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Fp(t, r) {
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
		function vx(t, r) {
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
		function Qp(t) {
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
		function Yp(t) {
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
		function yx(t, r) {
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
		function px(t) {
			zp(function () {
				zp(function (r) {
					return t(r);
				});
			});
		}
		function Kp(t, r, a) {
			switch (((r = $s(a)), t)) {
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
		function Gp(t, r, a) {
			for (var s in a) {
				var c = a[s];
				a.hasOwnProperty(s) && c != null && ot(t, r, s, null, QT, c);
			}
			(a.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === wr && (t.onclick = null), Zu(t));
		}
		function Hh(t) {
			for (var r = t.attributes; r.length;) t.removeAttributeNode(r[0]);
			Zu(t);
		}
		var rr = new Map(),
			Xp = new Set();
		function Hs(t) {
			if (typeof t.getRootNode == "function") {
				var r = t.getRootNode();
				if (r.nodeType === 9 || r.nodeType === 11) return r;
			}
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		var ni = ve.d;
		ve.d = { f: bx, r: Sx, D: wx, C: Ex, L: _x, m: Cx, X: xx, S: Tx, M: Ox };
		function bx() {
			var t = ni.f(),
				r = Yl();
			return t || r;
		}
		function Sx(t) {
			var r = Fa(t);
			r !== null && r.tag === 5 && r.type === "form" ? e0(r) : ni.r(t);
		}
		var Ro = typeof document > "u" ? null : document;
		function Jp(t, r, a) {
			var s = Ro;
			if (s && typeof r == "string" && r) {
				var c = Yn(r);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Xp.has(c) ||
						(Xp.add(c),
						(t = { rel: t, crossOrigin: a, href: r }),
						s.querySelector(c) === null &&
							((r = s.createElement("link")), un(r, "link", t), Kt(r), s.head.appendChild(r))));
			}
		}
		function wx(t) {
			(ni.D(t), Jp("dns-prefetch", t, null));
		}
		function Ex(t, r) {
			(ni.C(t, r), Jp("preconnect", t, r));
		}
		function _x(t, r, a) {
			ni.L(t, r, a);
			var s = Ro;
			if (s && t && r) {
				var c = 'link[rel="preload"][as="' + Yn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + Yn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + Yn(a.imageSizes) + '"]'))
					: (c += '[href="' + Yn(t) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = No(t);
						break;
					case "script":
						d = Mo(t);
				}
				if (!(
					rr.has(d) ||
					((t = U({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : t, as: r }, a)),
					rr.set(d, t),
					s.querySelector(c) !== null ||
						(r === "style" && s.querySelector(Zs(d))) ||
						(r === "script" && s.querySelector(Fs(d))))
				)) {
					var v = s.createElement("link");
					(un(v, "link", t),
						r === "style" &&
							((v[Hu] = !0),
							(v.onload = v.onerror =
								function () {
									dv(v);
								})),
						Kt(v),
						s.head.appendChild(v));
				}
			}
		}
		function Cx(t, r) {
			ni.m(t, r);
			var a = Ro;
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
						d = Mo(t);
				}
				if (!rr.has(d) && ((t = U({ rel: "modulepreload", href: t }, r)), rr.set(d, t), a.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Fs(d))) return;
					}
					((s = a.createElement("link")), un(s, "link", t), Kt(s), a.head.appendChild(s));
				}
			}
		}
		function Tx(t, r, a) {
			ni.S(t, r, a);
			var s = Ro;
			if (s && t) {
				var c = Qa(s).hoistableStyles,
					d = No(t);
				r = r || "default";
				var v = c.get(d);
				if (!v) {
					var C = { loading: 0, preload: null };
					if ((v = s.querySelector(Zs(d)))) C.loading = 5;
					else {
						((t = U({ rel: "stylesheet", href: t, "data-precedence": r }, a)), (a = rr.get(d)) && Zh(t, a));
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
							tc(v, r, s));
					}
					((v = { type: "stylesheet", instance: v, count: 1, state: C }), c.set(d, v));
				}
			}
		}
		function xx(t, r) {
			ni.X(t, r);
			var a = Ro;
			if (a && t) {
				var s = Qa(a).hoistableScripts,
					c = Mo(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Fs(c))),
					d ||
						((t = U({ src: t, async: !0 }, r)),
						(r = rr.get(c)) && Fh(t, r),
						(d = a.createElement("script")),
						Kt(d),
						un(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function Ox(t, r) {
			ni.M(t, r);
			var a = Ro;
			if (a && t) {
				var s = Qa(a).hoistableScripts,
					c = Mo(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Fs(c))),
					d ||
						((t = U({ src: t, async: !0, type: "module" }, r)),
						(r = rr.get(c)) && Fh(t, r),
						(d = a.createElement("script")),
						Kt(d),
						un(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function Wp(t, r, a, s) {
			var c = (c = At.current) ? Hs(c) : null;
			if (!c) throw Error(u(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((a = No(a.href)),
							(r = Qa(c).hoistableStyles),
							(s = r.get(a)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), r.set(a, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = No(a.href);
						var d = Qa(c).hoistableStyles,
							v = d.get(t);
						if (
							(v ||
								((c = c.ownerDocument || c),
								(v = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, v),
								(d = c.querySelector(Zs(t)))
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
										Ax(c, t, d, v.state))),
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
							? ((a = Mo(a)),
								(r = Qa(c).hoistableScripts),
								(s = r.get(a)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), r.set(a, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(u(444, t));
			}
		}
		function No(t) {
			return 'href="' + Yn(t) + '"';
		}
		function Zs(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function eb(t) {
			return U({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function Ax(t, r, a, s) {
			if ((r = t.querySelector('link[rel="preload"][as="style"][' + r + "]"))) {
				if (r[Hu] !== !0) {
					s.loading = 1;
					return;
				}
			} else
				((r = t.createElement("link")),
					(r[Hu] = !0),
					(r.onload = r.onerror = dv.bind(null, r)),
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
		function Mo(t) {
			return '[src="' + Yn(t) + '"]';
		}
		function Fs(t) {
			return "script[async]" + t;
		}
		function tb(t, r, a) {
			if ((r.count++, r.instance === null))
				switch (r.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + Yn(a.href) + '"]');
						if (s) return ((r.instance = s), Kt(s), s);
						var c = U({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							Kt(s),
							un(s, "style", c),
							tc(s, a.precedence, t),
							(r.instance = s)
						);
					case "stylesheet":
						c = No(a.href);
						var d = t.querySelector(Zs(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), Kt(d), d);
						((s = eb(a)), (c = rr.get(c)) && Zh(s, c), (d = (t.ownerDocument || t).createElement("link")), Kt(d));
						var v = d;
						return (
							(v._p = new Promise(function (C, I) {
								((v.onload = C), (v.onerror = I));
							})),
							un(d, "link", s),
							(r.state.loading |= 4),
							tc(d, a.precedence, t),
							(r.instance = d)
						);
					case "script":
						return (
							(d = Mo(a.src)),
							(c = t.querySelector(Fs(d)))
								? ((r.instance = c), Kt(c), c)
								: ((s = a),
									(c = rr.get(d)) && ((s = U({}, a)), Fh(s, c)),
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
					((s = r.instance), (r.state.loading |= 4), tc(s, a.precedence, t));
			return r.instance;
		}
		function tc(t, r, a) {
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
		var nc = null;
		function nb(t, r, a) {
			if (nc === null) {
				var s = new Map(),
					c = (nc = new Map());
				c.set(a, s);
			} else ((c = nc), (s = c.get(a)), s || ((s = new Map()), c.set(a, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[ss] || d[nn] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
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
		function Rx(t, r, a) {
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
		function rb(t, r) {
			return t === "img" && r.src != null && r.src !== "" && r.onLoad == null && r.loading !== "lazy";
		}
		function ib(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function ab(t) {
			return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
		}
		function ob(t, r) {
			typeof r.decode == "function" &&
				(t.imgCount++,
				r.complete || ((t.imgBytes += ab(r)), t.suspenseyImages.push(r)),
				(t = Dx.bind(t)),
				r.decode().then(t, t));
		}
		function Nx(t, r, a, s) {
			if (
				a.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = No(s.href),
						d = r.querySelector(Zs(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(t.count++, (t = Qs.bind(t)), r.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							Kt(d));
						return;
					}
					((d = r.ownerDocument || r), (s = eb(s)), (c = rr.get(c)) && Zh(s, c), (d = d.createElement("link")), Kt(d));
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
						(t.count++, (a = Qs.bind(t)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var rc = 0;
		function Mx(t, r) {
			return (
				t.stylesheets && t.count === 0 && ac(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var s = setTimeout(function () {
								if ((t.stylesheets && ac(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < t.imgBytes && rc === 0 && (rc = 62500 * KT());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && ac(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > rc ? 50 : 800) + r,
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
		function sb(t) {
			if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
				if (t.stylesheets) ac(t, t.stylesheets);
				else if (t.unsuspend) {
					var r = t.unsuspend;
					((t.unsuspend = null), r());
				}
			}
		}
		function Qs() {
			(this.count--, sb(this));
		}
		function Dx() {
			(this.imgCount--, sb(this));
		}
		var ic = null;
		function ac(t, r) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (ic = new Map()), r.forEach(zx, t), (ic = null), Qs.call(t)));
		}
		function zx(t, r) {
			if (!(r.state.loading & 4)) {
				var a = ic.get(t);
				if (a) var s = a.get(null);
				else {
					((a = new Map()), ic.set(t, a));
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
					(s = Qs.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var Do = { $$typeof: B, Provider: null, Consumer: null, _currentValue: Ge, _currentValue2: Ge, _threadCount: 0 };
		function Ix(t, r, a, s, c, d, v, C, I) {
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
		function jx(t, r, a, s, c, d, v, C, I, Q, J, oe) {
			return (
				(t = new Ix(t, r, a, v, I, Q, J, oe, C)),
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
		function kx(t) {
			return t ? ((t = ro), t) : ro;
		}
		function ub(t, r, a, s, c, d) {
			((c = kx(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = ya(r)),
				(s.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(a = pa(t, s, r)),
				a !== null && (Rn(a, t, r), Cs(a, t, r)));
		}
		function lb(t, r) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Yh(t, r) {
			(lb(t, r), (t = t.alternate) && lb(t, r));
		}
		function cb(t) {
			if (t.tag === 13 || t.tag === 31) {
				var r = oa(t, 67108864);
				(r !== null && Rn(r, t, 67108864), Yh(t, 67108864));
			}
		}
		function fb(t) {
			if (t.tag === 13 || t.tag === 31) {
				var r = tr();
				r = sv(r);
				var a = oa(t, r);
				(a !== null && Rn(a, t, r), Yh(t, r));
			}
		}
		var zo = !0;
		function qx(t, r, a, s) {
			var c = ce.T;
			ce.T = null;
			var d = ve.p;
			try {
				((ve.p = 2), Kh(t, r, a, s));
			} finally {
				((ve.p = d), (ce.T = c));
			}
		}
		function Lx(t, r, a, s) {
			var c = ce.T;
			ce.T = null;
			var d = ve.p;
			try {
				((ve.p = 8), Kh(t, r, a, s));
			} finally {
				((ve.p = d), (ce.T = c));
			}
		}
		function Kh(t, r, a, s) {
			if (zo) {
				var c = Gh(s);
				if (c === null) (Nh(t, r, s, oc, a), hb(t, s));
				else if (Vx(c, t, r, a, s)) s.stopPropagation();
				else if ((hb(t, s), r & 4 && -1 < Ux.indexOf(t))) {
					for (; c !== null;) {
						var d = Fa(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var v = ta(d.pendingLanes);
										if (v !== 0) {
											var C = d;
											for (C.pendingLanes |= 2, C.entangledLanes |= 2; v;) {
												var I = 1 << (31 - Me(v));
												((C.entanglements[1] |= I), (v &= ~I));
											}
											(ti(d), (tt & 6) === 0 && ((Zl = tn() + 500), Vs(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((C = oa(d, 2)), C !== null && Rn(C, d, 2), Yl(), Yh(d, 2));
							}
						if (((d = Gh(s)), d === null && Nh(t, r, s, oc, a), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Nh(t, r, s, null, a);
			}
		}
		function Gh(t) {
			return ((t = kf(t)), Xh(t));
		}
		var oc = null;
		function Xh(t) {
			if (((oc = null), (t = na(t)), t !== null)) {
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
			return ((oc = t), null);
		}
		function db(t) {
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
			Ys = new Map(),
			Ks = new Map(),
			Ui = [],
			Ux =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function hb(t, r) {
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
					Ys.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Ks.delete(r.pointerId);
			}
		}
		function Gs(t, r, a, s, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: r, domEventName: a, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = Fa(r)), r !== null && cb(r)),
					t)
				: ((t.eventSystemFlags |= s), (r = t.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), t);
		}
		function Vx(t, r, a, s, c) {
			switch (r) {
				case "focusin":
					return ((ki = Gs(ki, t, r, a, s, c)), !0);
				case "dragenter":
					return ((qi = Gs(qi, t, r, a, s, c)), !0);
				case "mouseover":
					return ((Li = Gs(Li, t, r, a, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Ys.set(d, Gs(Ys.get(d) || null, t, r, a, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Ks.set(d, Gs(Ks.get(d) || null, t, r, a, s, c)), !0);
			}
			return !1;
		}
		function mb(t) {
			var r = na(t.target);
			if (r !== null) {
				var a = f(r);
				if (a !== null) {
					if (((r = a.tag), r === 13)) {
						if (((r = h(a)), r !== null)) {
							((t.blockedOn = r),
								lv(t.priority, function () {
									fb(a);
								}));
							return;
						}
					} else if (r === 31) {
						if (((r = m(a)), r !== null)) {
							((t.blockedOn = r),
								lv(t.priority, function () {
									fb(a);
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
		function sc(t) {
			if (t.blockedOn !== null) return !1;
			for (var r = t.targetContainers; 0 < r.length;) {
				var a = Gh(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var s = new a.constructor(a.type, a);
					((jf = s), a.target.dispatchEvent(s), (jf = null));
				} else return ((r = Fa(a)), r !== null && cb(r), (t.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function gb(t, r, a) {
			sc(t) && a.delete(r);
		}
		function Bx() {
			((Jh = !1),
				ki !== null && sc(ki) && (ki = null),
				qi !== null && sc(qi) && (qi = null),
				Li !== null && sc(Li) && (Li = null),
				Ys.forEach(gb),
				Ks.forEach(gb));
		}
		function uc(t, r) {
			t.blockedOn === r &&
				((t.blockedOn = null), Jh || ((Jh = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Bx)));
		}
		var lc = null;
		function vb(t) {
			lc !== t &&
				((lc = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					lc === t && (lc = null);
					for (var r = 0; r < t.length; r += 3) {
						var a = t[r],
							s = t[r + 1],
							c = t[r + 2];
						if (typeof s != "function") {
							if (Xh(s || a) === null) continue;
							break;
						}
						var d = Fa(a);
						d !== null &&
							(t.splice(r, 3), (r -= 3), Id(d, { pending: !0, data: c, method: a.method, action: s }, s, c));
					}
				}));
		}
		function Io(t) {
			function r(I) {
				return uc(I, t);
			}
			(ki !== null && uc(ki, t), qi !== null && uc(qi, t), Li !== null && uc(Li, t), Ys.forEach(r), Ks.forEach(r));
			for (var a = 0; a < Ui.length; a++) {
				var s = Ui[a];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Ui.length && ((a = Ui[0]), a.blockedOn === null);) (mb(a), a.blockedOn === null && Ui.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (s = 0; s < a.length; s += 3) {
					var c = a[s],
						d = a[s + 1],
						v = c[Cn] || null;
					if (typeof d == "function") v || vb(a);
					else if (v) {
						var C = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (v = d[Cn] || null))) C = v.formAction;
							else if (Xh(c) !== null) continue;
						} else C = v.action;
						(typeof C == "function" ? (a[s + 1] = C) : (a.splice(s, 3), (s -= 3)), vb(a));
					}
				}
		}
		function Px() {
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
				ub(a, tr(), t, r, null, null);
			}),
			(em.prototype.unmount = Wh.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var r = t.containerInfo;
						(ub(t.current, 2, null, t, null, null), Yl(), (r[os] = null));
					}
				}));
		function em(t) {
			this._internalRoot = t;
		}
		em.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var r = uv();
				t = { blockedOn: null, target: t, priority: r };
				for (var a = 0; a < Ui.length && r !== 0 && r < Ui[a].priority; a++);
				(Ui.splice(a, 0, t), a === 0 && mb(t));
			}
		};
		var yb = i.version;
		if (yb !== "19.3.1") throw Error(u(527, yb, "19.3.1"));
		ve.findDOMNode = function (t) {
			var r = t._reactInternals;
			if (r === void 0)
				throw typeof t.render == "function" ? Error(u(188)) : ((t = Object.keys(t).join(",")), Error(u(268, t)));
			return ((t = p(r)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var $x = {
			bundleType: 0,
			version: "19.3.1",
			rendererPackageName: "react-dom",
			currentDispatcherRef: ce,
			reconcilerVersion: "19.3.1",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var cc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!cc.isDisabled && cc.supportsFiber)
				try {
					((Oe = cc.inject($x)), (Ie = cc));
				} catch {}
		}
		e.createRoot = function (t, r) {
			if (!l(t)) throw Error(u(299));
			var a = !1,
				s = "",
				c = vT,
				d = yT,
				v = pT;
			return (
				r != null &&
					(r.unstable_strictMode === !0 && (a = !0),
					r.identifierPrefix !== void 0 && (s = r.identifierPrefix),
					r.onUncaughtError !== void 0 && (c = r.onUncaughtError),
					r.onCaughtError !== void 0 && (d = r.onCaughtError),
					r.onRecoverableError !== void 0 && (v = r.onRecoverableError)),
				(r = jx(t, 1, !1, null, null, a, s, null, c, d, v, Px)),
				(t[os] = r.current),
				_p(t),
				new Wh(r)
			);
		};
	}),
	tR = sr((e, n) => {
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
		(i(), (n.exports = eR()));
	}),
	nR = tR(),
	De = Yw,
	iL = BA(),
	rR = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	rE = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	iE = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	rg =
		"Only the people added here and the organization owner can read this channel. Its copies in Files have separate sharing settings. File managers can share those copies, including later updates, with other people.",
	iR = "Someone with no name yet";
function aE(e) {
	return e !== null && e !== "" ? e : iR;
}
function aR(e, n) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (i === null) return null;
	const o = i[1] ?? "";
	return { start: n - o.length - 1, query: o };
}
function oR(e, n, i) {
	const o = n.toLowerCase();
	return e
		.filter((u) => u.userId !== i)
		.map((u) => ({ ...u, label: aE(u.displayName) }))
		.filter((u) => u.label.toLowerCase().includes(o))
		.sort((u, l) => u.label.localeCompare(l.label));
}
function sR(e, n, i, o) {
	return { text: `${e.slice(0, n)}@${o} ${e.slice(i)}`, caret: n + o.length + 2 };
}
function uR(e, n) {
	const i = [];
	for (const [o, u] of e) n.includes(`@${u}`) && i.push(o);
	return i;
}
function tf(e, n) {
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
function nf(e) {
	return e instanceof Error ? e.message : String(e);
}
var lR = sr((e) => {
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
	cR = sr((e, n) => {
		n.exports = lR();
	}),
	S = cR();
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
	const o = Bo(n, ...(e.ready || e.refreshing ? i : ["skip"])),
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
var du = nE(),
	Mm =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function qb(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(Mm) ? n : (e.querySelector(Mm) ?? e);
}
function Xo(e) {
	const n = (0, _.useRef)(null);
	((0, _.useEffect)(() => {
		const o = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			u = n.current;
		return (
			(u === null ? null : qb(u))?.focus(),
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
					!o.isConnected || document.activeElement !== document.body || qb(o).focus();
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
		const l = [...u.querySelectorAll(Mm)];
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
	return (0, du.createPortal)(
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
function Dm(e) {
	const n = Object.values(e).filter((i) => typeof i == "number");
	return Object.entries(e)
		.filter(([i, o]) => n.indexOf(+i) === -1)
		.map(([i, o]) => o);
}
function Lb(e, n = "|") {
	return e.map((i) => fE(i)).join(n);
}
function zm(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
var fR = class {
	constructor(e) {
		((this._getter = e), (this._value = void 0));
	}
	get value() {
		const e = this._getter;
		return (e !== void 0 && ((this._value = e()), (this._getter = void 0)), this._value);
	}
};
function ig(e) {
	return new fR(e);
}
function dR(e) {
	return e == null;
}
function ag(e) {
	const n = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, i);
}
function hR(e, n) {
	const i = e / n,
		o = Math.round(i),
		u = 4 * Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - o) < u ? 0 : i - o;
}
function Ba(e, n, i) {
	Object.defineProperty(e, n, { value: i, writable: !0, enumerable: !0, configurable: !0 });
}
function oE(e) {
	const n = Object.getOwnPropertyDescriptor(e, "shape");
	return n?.get ? n.get.raw : n?.value;
}
function fi(e) {
	return oE(e._zod.def) ?? e._zod.def.shape;
}
function sE(e, n, i) {
	Object.defineProperty(e, n, {
		get() {
			const o = i();
			return (Ba(this, n, o), o);
		},
		enumerable: !0,
		configurable: !0,
	});
}
function uE(e, n, i) {
	n in e ? Ba(e, n, i) : (e[n] = i);
}
function Ia(e, n, i, o) {
	const u = fi(n);
	for (const l of i) {
		const f = Object.getOwnPropertyDescriptor(u, l);
		f.enumerable &&
			(f.get
				? sE(e, l, () => {
						const h = n._zod.def.shape[l];
						return o ? o(h, l) : h;
					})
				: uE(e, l, o ? o(f.value, l) : f.value));
	}
}
function mR(e, n) {
	for (const i of Reflect.ownKeys(n)) {
		const o = Object.getOwnPropertyDescriptor(n, i);
		o.enumerable && (o.get ? sE(e, i, () => n[i]) : uE(e, i, o.value));
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
function gR(e) {
	return JSON.stringify(e);
}
function vR(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var lE = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function zc(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var yR = ig(() => {
	if (kr.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function hu(e) {
	if (zc(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const i = n.prototype;
	return !(zc(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function cE(e) {
	return hu(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var pR = new Set(["string", "number", "symbol"]);
function rf(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ki(e, n, i) {
	const o = new e._zod.constr(n ?? e._zod.def);
	return ((!n || i?.parent) && (o._zod.parent = e), o);
}
function ze(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function fE(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function bR(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin !== void 0 && e[n]._zod.optout === "optional");
}
var dE = {
		safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
	},
	SR = {
		int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
		uint64: [BigInt(0), BigInt("18446744073709551615")],
	};
function wR(e, n) {
	const i = e._zod.def,
		o = i.checks;
	if (o && o.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	const u = {};
	return (Ia(u, e, af(e, n)), Ki(e, Hn(i, { shape: u, checks: [] })));
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
function ER(e, n) {
	const i = e._zod.def,
		o = i.checks;
	if (o && o.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	const u = new Set(af(e, n)),
		l = {};
	return (
		Ia(
			l,
			e,
			Reflect.ownKeys(fi(e)).filter((f) => !u.has(f)),
		),
		Ki(e, Hn(i, { shape: l, checks: [] }))
	);
}
function _R(e, n) {
	if (!hu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const o = fi(e);
		for (const u of Reflect.ownKeys(n))
			if (Object.getOwnPropertyDescriptor(o, u) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Ki(e, Hn(e._zod.def, { shape: hE(e, n) }));
}
function hE(e, n) {
	const i = {};
	return (Ia(i, e, Reflect.ownKeys(fi(e))), mR(i, n), i);
}
function CR(e, n) {
	if (!hu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return Ki(e, Hn(e._zod.def, { shape: hE(e, n) }));
}
function TR(e, n) {
	if (!n?._zod?.def)
		throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	const i = {};
	return (
		Ia(i, e, Reflect.ownKeys(fi(e))),
		Ia(i, n, Reflect.ownKeys(fi(n))),
		Ki(
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
function Ub(e, n, i, o = "partial") {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(`.${o}() cannot be used on object schemas containing refinements`);
	const l = i ? new Set(af(n, i)) : void 0,
		f = {};
	return (
		Ia(f, n, Reflect.ownKeys(fi(n)), e && ((h, m) => (l && !l.has(m) ? h : new e({ type: "optional", innerType: h })))),
		Ki(n, Hn(n._zod.def, { shape: f, checks: [] }))
	);
}
function xR(e, n, i) {
	const o = i ? new Set(af(n, i)) : void 0,
		u = {};
	return (
		Ia(u, n, Reflect.ownKeys(fi(n)), (l, f) => (o && !o.has(f) ? l : new e({ type: "nonoptional", innerType: l }))),
		Ki(n, Hn(n._zod.def, { shape: u }))
	);
}
function ui(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function OR(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue === !1) return !0;
	return !1;
}
function mE(e, n) {
	return n.map((i) => {
		var o;
		return ((o = i).path ?? (o.path = []), i.path.unshift(e), i);
	});
}
function Xs(e) {
	return typeof e == "string" ? e : e?.message;
}
function Vb(e) {
	const n = [];
	for (const i of e ?? []) {
		const o = i._zod.def;
		if (!/_(length|size)$|_equals$/.test(o.check)) break;
		const u = o.maximum ?? o.length ?? o.size;
		u >= 0 && n.push([u, i]);
	}
	return n;
}
function Im(e, n, i) {
	var o;
	for (let u = n; u < e.length; u++) (o = e[u]).schema ?? (o.schema = i);
}
function Jo(e, n, i) {
	var o;
	const u = e.inst?._zod?.traits;
	u?.has("$ZodType") && (u.has("$ZodCheck") ? ((o = e).schema ?? (o.schema = e.inst)) : (e.schema = e.inst));
	const l = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0,
		f = e.message
			? e.message
			: (Xs(e.inst?._zod.def?.error?.(e)) ??
				Xs(l?.(e)) ??
				Xs(n?.error?.(e)) ??
				Xs(i.customError?.(e)) ??
				Xs(i.localeError?.(e)) ??
				"Invalid input"),
		h = {};
	for (const m of Object.keys(e))
		m === "inst" || m === "schema" || m === "continue" || m === "input" || m === "__proto__" || (h[m] = e[m]);
	return (h.path ?? (h.path = []), (h.message = f), n?.reportInput && (h.input = e.input), h);
}
var AR = /[\uD800-\uDBFF]/;
function og(e) {
	const n = e.length;
	if (!AR.test(e)) return n;
	let i = n;
	for (let o = 0; o < n - 1; o++)
		(e.charCodeAt(o) & 64512) === 55296 && (e.charCodeAt(o + 1) & 64512) === 56320 && (i--, o++);
	return i;
}
function sg(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function RR(e) {
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
function mu(...e) {
	const [n, i, o] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: i, inst: o } : { ...n };
}
function NR(e, n) {
	for (const i in n) {
		const o = Object.getOwnPropertyDescriptor(n, i);
		o.get ? Object.defineProperty(e, i, { ...o, enumerable: !1 }) : MR(e, i, o.value);
	}
}
function Zi(e, n, i, o = !0) {
	return (Object.defineProperty(e, n, { configurable: !0, writable: !0, enumerable: o, value: i }), i);
}
function gE(e, n, i) {
	return Zi(e, n, i, !1);
}
function vE(e, n) {
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
function MR(e, n, i) {
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
function DR(e, n) {
	const i = Object.getPrototypeOf(e);
	return n in i ? void 0 : i;
}
var lm,
	Pi = !1,
	zR = {
		configurable: !0,
		get() {
			Pi = !0;
		},
	};
function ut(e, n, i) {
	const o = Object.getPrototypeOf(e._zod);
	if (n in o && lm !== e._zod) {
		lm = void 0;
		return;
	}
	((lm = e._zod),
		Object.defineProperty(o, n, {
			configurable: !0,
			get() {
				Object.defineProperty(this, n, zR);
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
function IR(e, n, i, o) {
	const u = DR(e, n);
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
var jR = "~constantCatch";
function kR(e) {
	const n = () => e;
	return ((n[jR] = !0), n);
}
var Bb,
	cm = { value: void 0, enumerable: !1 },
	Pb = "captureStackTrace" in Error ? Error : null;
function qR(e) {
	const n = Pb;
	if (n) {
		const i = n.stackTraceLimit;
		if (typeof i == "number") {
			try {
				n.stackTraceLimit = 0;
			} catch {
				return ((Pb = null), new e());
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
function ue(e, n, i, o) {
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
			let j = T;
			for (; j && j !== x;) j = Object.getPrototypeOf(j);
			const M = j ?? T;
			h.has(M) || (h.add(M), NR(M, f));
		}
		const E = b.prototype;
		for (const T in E) Object.prototype.hasOwnProperty.call(E, T) && (T in y || (y[T] = E[T].bind(y)));
	}
	const g = o?.Parent ?? Object;
	class p extends g {}
	Object.defineProperty(p, "name", { value: e });
	function b(y) {
		const w = o?.Parent ? qR(p) : this;
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
var Ma = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	yE = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Bb = globalThis).__zod_globalConfig ?? (Bb.__zod_globalConfig = {});
var kr = globalThis.__zod_globalConfig;
function Gi(e) {
	return (e && Object.assign(kr, e), kr);
}
function LR() {
	const e = this._zod;
	return (e.message ?? (e.message = JSON.stringify(e.def, zm, 2)), e.message);
}
function UR(e) {
	this._zod.message = e;
}
var VR = { get: LR, set: UR, enumerable: !0, configurable: !0 },
	fm = { value: void 0, enumerable: !1 },
	$b = new WeakSet([Object.prototype, Error.prototype]),
	BR = (e, n) => {
		((e.name = "$ZodError"),
			(fm.value = n),
			Object.defineProperty(e, "issues", fm),
			(fm.value = void 0),
			Object.defineProperty(e, "message", VR));
		const i = Object.getPrototypeOf(e);
		$b.has(i) ||
			($b.add(i),
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
	PR = ue("$ZodError", BR);
function $R(e, n, i) {
	return (
		Object.prototype.hasOwnProperty.call(e, n) ||
			(n === "__proto__"
				? Object.defineProperty(e, n, { value: i(), writable: !0, enumerable: !0, configurable: !0 })
				: (e[n] = i())),
		e[n]
	);
}
function HR(e, n = (i) => i.message) {
	const i = {},
		o = [];
	for (const u of e.issues) u.path.length > 0 ? $R(i, u.path[0], () => []).push(n(u)) : o.push(n(u));
	return { formErrors: o, fieldErrors: i };
}
function ZR(e, n = (i) => i.message) {
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
var ug = (e) => {
		const n = (i, o, u, l) => {
			const f = u ? { ...u, async: !1 } : { async: !1 },
				h = i._zod.run({ value: o, issues: [] }, f);
			if (h instanceof Promise) throw new Ma();
			if (h.issues.length) {
				const m = new (l?.Err ?? e)(h.issues.map((g) => Jo(g, f, Gi())));
				throw (lE(m, l?.callee ?? n), m);
			}
			return h.value;
		};
		return n;
	},
	lg = (e) => {
		const n = async (i, o, u, l) => {
			const f = u ? { ...u, async: !0 } : { async: !0 };
			let h = i._zod.run({ value: o, issues: [] }, f);
			if ((h instanceof Promise && (h = await h), h.issues.length)) {
				const m = new (l?.Err ?? e)(h.issues.map((g) => Jo(g, f, Gi())));
				throw (lE(m, l?.callee ?? n), m);
			}
			return h.value;
		};
		return n;
	},
	cg = (e) => (n, i, o) => {
		const u = o ? { ...o, async: !1 } : { async: !1 },
			l = n._zod.run({ value: i, issues: [] }, u);
		if (l instanceof Promise) throw new Ma();
		return l.issues.length ? pE(e, l.issues, u) : { success: !0, data: l.value };
	};
function pE(e, n, i) {
	let o;
	return {
		success: !1,
		get error() {
			return (o || ((o = new e(n.map((u) => Jo(u, i, Gi())))), (n = void 0), (i = void 0)), o);
		},
		set error(u) {
			((o = u), (n = void 0), (i = void 0));
		},
	};
}
var fg = (e) => async (n, i, o) => {
		const u = o ? { ...o, async: !0 } : { async: !0 };
		let l = n._zod.run({ value: i, issues: [] }, u);
		return (
			l instanceof Promise && (l = await l),
			l.issues.length ? pE(e, l.issues, u) : { success: !0, data: l.value }
		);
	},
	FR = Symbol.for("zod.compile.invalid"),
	QR = Symbol.for("zod.compile.fallback"),
	YR = (e, n, i) => {
		const o = e._zod.bag.validator;
		if (o !== void 0) {
			if (o(n) !== FR) return !0;
			if (o.definite === !0 && i === void 0) return !1;
		}
		return KR(e, n, i);
	};
function KR(e, n, i) {
	const o = i ? { ...i, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 },
		u = e._zod.bag.fallbackRun;
	let l;
	if (
		(u ? ((o[QR] = !0), (l = u({ value: n, issues: [] }, o))) : (l = e._zod.run({ value: n, issues: [] }, o)),
		l instanceof Promise)
	)
		throw new Ma();
	return l.issues.length === 0;
}
var GR = async (e, n, i) => {
		const o = i ? { ...i, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 };
		let u = e._zod.run({ value: n, issues: [] }, o);
		return (u instanceof Promise && (u = await u), u.issues.length === 0);
	},
	XR = (e) => {
		const n = ug(e),
			i = (o, u, l, f) => {
				const h = l ? { ...l, direction: "backward" } : { direction: "backward" };
				return n(o, u, h, of(i, f));
			};
		return i;
	},
	JR = (e) => {
		const n = ug(e),
			i = (o, u, l, f) => n(o, u, l, of(i, f));
		return i;
	},
	WR = (e) => {
		const n = lg(e),
			i = async (o, u, l, f) => {
				const h = l ? { ...l, direction: "backward" } : { direction: "backward" };
				return await n(o, u, h, of(i, f));
			};
		return i;
	},
	eN = (e) => {
		const n = lg(e),
			i = async (o, u, l, f) => await n(o, u, l, of(i, f));
		return i;
	},
	tN = (e) => (n, i, o) => {
		const u = o ? { ...o, direction: "backward" } : { direction: "backward" };
		return cg(e)(n, i, u);
	},
	nN = (e) => (n, i, o) => cg(e)(n, i, o),
	rN = (e) => async (n, i, o) => {
		const u = o ? { ...o, direction: "backward" } : { direction: "backward" };
		return fg(e)(n, i, u);
	},
	iN = (e) => async (n, i, o) => fg(e)(n, i, o),
	aN = /^[cC][0-9a-z]{6,}$/,
	oN = /^[0-9a-z]+$/,
	sN = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,
	uN = /^[0-9a-vA-V]{20}$/,
	lN = /^[A-Za-z0-9]{27}$/,
	cN = /^[a-zA-Z0-9_-]{21}$/;
function fN(e) {
	return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var dN = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	hN = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Hb = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	mN = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	gN =
		"^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function vN() {
	return new RegExp(gN, "u");
}
var yN =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	pN =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	bN =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	SN =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	wN = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	EN = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/,
	_N = /^https?$/,
	CN = /^\+[1-9]\d{6,14}$/,
	bE =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function TN(e) {
	return new RegExp(`^${e}$`);
}
var xN = TN(bE);
function jm(e) {
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
function ON(e) {
	return new RegExp(`^${jm(e)}$`);
}
function AN(e) {
	const n = ["Z"];
	e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	const i = `${jm({ precision: e.precision, seconds: !0 })}(?:${n.join("|")})`,
		o = e.local ? `${i}|${jm({ precision: e.precision })}` : i;
	return new RegExp(`^${bE}T(?:${o})$`);
}
var RN = /^[\s\S]{0,}$/,
	NN = /^-?\d+(?:\.\d+)?$/,
	MN = /^[^A-Z]*$/,
	DN = /^[^a-z]*$/,
	jn = ue("$ZodCheck", (e, n) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	dg = (e) => {
		const n = e.value;
		return !dR(n) && n.length !== void 0;
	},
	Ic = { number: "number", bigint: "bigint", object: "date" },
	SE = ue("$ZodCheckLessThan", (e, n) => {
		jn.init(e, n);
		const i = Ic[typeof n.value];
		e._zod.check = (o) => {
			(n.inclusive ? o.value <= n.value : o.value < n.value) ||
				o.issues.push({
					origin: Ic[typeof o.value] ?? i,
					code: "too_big",
					maximum: typeof n.value == "object" ? n.value.getTime() : n.value,
					input: o.value,
					inclusive: n.inclusive,
					inst: e,
					continue: !n.abort,
				});
		};
	}),
	wE = ue("$ZodCheckGreaterThan", (e, n) => {
		jn.init(e, n);
		const i = Ic[typeof n.value];
		e._zod.check = (o) => {
			(n.inclusive ? o.value >= n.value : o.value > n.value) ||
				o.issues.push({
					origin: Ic[typeof o.value] ?? i,
					code: "too_small",
					minimum: typeof n.value == "object" ? n.value.getTime() : n.value,
					input: o.value,
					inclusive: n.inclusive,
					inst: e,
					continue: !n.abort,
				});
		};
	}),
	zN = ue("$ZodCheckMultipleOf", (e, n) => {
		(jn.init(e, n),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint"
					? n.value !== BigInt(0) && i.value % n.value === BigInt(0)
					: hR(i.value, n.value) === 0) ||
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
	IN = ue("$ZodCheckNumberFormat", (e, n) => {
		(jn.init(e, n), (n.format = n.format || "float64"));
		const i = n.format?.includes("int"),
			o = i ? "int" : "number",
			[u, l] = dE[n.format];
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
	jN = ue("$ZodCheckMaxLength", (e, n) => {
		var i;
		(jn.init(e, n),
			(i = e._zod.def).when ?? (i.when = dg),
			(e._zod.check = (o) => {
				const u = o.value,
					l = u.length;
				if ((typeof u == "string" && l > n.maximum ? og(u) : l) <= n.maximum) return;
				const f = sg(u);
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
	kN = ue("$ZodCheckMinLength", (e, n) => {
		var i;
		(jn.init(e, n),
			(i = e._zod.def).when ?? (i.when = dg),
			(e._zod.check = (o) => {
				const u = o.value,
					l = u.length;
				if ((typeof u == "string" && l >= n.minimum && l < n.minimum * 2 ? og(u) : l) >= n.minimum) return;
				const f = sg(u);
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
	qN = ue("$ZodCheckLengthEquals", (e, n) => {
		var i;
		(jn.init(e, n),
			(i = e._zod.def).when ?? (i.when = dg),
			(e._zod.check = (o) => {
				const u = o.value,
					l = u.length,
					f = typeof u == "string" && l >= n.length && l <= n.length * 2 ? og(u) : l;
				if (f === n.length) return;
				const h = sg(u),
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
	sf = ue("$ZodCheckStringFormat", (e, n) => {
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
	LN = ue("$ZodCheckRegex", (e, n) => {
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
	UN = ue("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = MN), sf.init(e, n));
	}),
	VN = ue("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = DN), sf.init(e, n));
	}),
	BN = ue("$ZodCheckIncludes", (e, n) => {
		jn.init(e, n);
		const i = rf(n.includes);
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
	PN = ue("$ZodCheckStartsWith", (e, n) => {
		jn.init(e, n);
		const i = new RegExp(`^${rf(n.prefix)}.*`);
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
	$N = ue("$ZodCheckEndsWith", (e, n) => {
		jn.init(e, n);
		const i = new RegExp(`.*${rf(n.suffix)}$`);
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
	HN = ue("$ZodCheckOverwrite", (e, n) => {
		(jn.init(e, n),
			(e._zod.check = (i) => {
				i.value = n.tx(i.value);
			}));
	}),
	ZN = class {
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
	FN = { major: 4, minor: 6, patch: 7 },
	$t = ue(
		"$ZodType",
		(e, n) => {
			var i;
			(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = FN));
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
								if (OR(h) || !y._zod.def.when(h)) continue;
							} else if (p) continue;
							const w = h.issues.length,
								E = y._zod.check(h);
							if (E instanceof Promise && g?.async === !1) throw new Ma();
							if (b || E instanceof Promise)
								b = (b ?? Promise.resolve()).then(async () => {
									(await E, h.issues.length !== w && (Im(h.issues, w, e), p || (p = ui(h, w))));
								});
							else {
								if (h.issues.length === w) continue;
								(Im(h.issues, w, e), p || (p = ui(h, w)));
							}
						}
						return b ? b.then(() => h) : h;
					},
					f = (h, m, g) => {
						if (ui(h)) return ((h.aborted = !0), h);
						const p = l(m, u, g);
						if (p instanceof Promise) {
							if (g.async === !1) throw new Ma();
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
						if (m.async === !1) throw new Ma();
						return g.then((p) => l(p, u, m));
					}
					return l(g, u, m);
				};
			}
		},
		{
			get "~standard"() {
				return gE(this, "~standard", _E(this));
			},
			set "~standard"(e) {
				Zi(this, "~standard", e);
			},
		},
	),
	EE = (e, n) => (e.issues.length ? { issues: e.issues.map((i) => Jo(i, n, Gi())) } : { value: e.value });
async function QN(e, n) {
	const i = { async: !0 };
	return EE(await e._zod.run({ value: n, issues: [] }, i), i);
}
function _E(e) {
	return {
		validate: (n) => {
			const i = { async: !1 };
			try {
				const o = e._zod.run({ value: n, issues: [] }, i);
				if (!(o instanceof Promise)) return EE(o, i);
			} catch {}
			return QN(e, n);
		},
		vendor: "zod",
		version: 1,
	};
}
var hg = ue("$ZodString", (e, n) => {
		($t.init(e, n),
			(e._zod.pattern = n.pattern ?? RN),
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
	Et = ue("$ZodStringFormat", (e, n) => {
		(sf.init(e, n), hg.init(e, n));
	}),
	YN = ue("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = hN), Et.init(e, n));
	}),
	KN = ue("$ZodUUID", (e, n) => {
		if (n.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = Hb(i));
		} else n.pattern ?? (n.pattern = Hb());
		Et.init(e, n);
	}),
	GN = ue("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = mN), Et.init(e, n));
	});
function CE(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function XN(e, n) {
	return !("normalize" in n) && !("hostname" in n) && !("protocol" in n) ? CE(e) || 2 : JN(e, n);
}
function JN(e, n) {
	if (!n.normalize && n.protocol?.source === _N.source && !/^https?:\/\//i.test(e)) return 1;
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
var WN = /[\t\n\r]/g;
function Zb(e) {
	return e.replace(WN, "");
}
function eM(e, n) {
	return ((n.lastIndex = 0), n.test(e.hostname));
}
function tM(e, n) {
	return ((n.lastIndex = 0), n.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol));
}
var nM = ue("$ZodURL", (e, n) => {
		(Et.init(e, n),
			(e._zod.check = (i) => {
				try {
					const o = i.value.trim(),
						u = XN(o, n);
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
						i.value = Zb(o);
						return;
					}
					(n.hostname &&
						!eM(u, n.hostname) &&
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
							!tM(u, n.protocol) &&
							i.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid protocol",
								pattern: n.protocol.source,
								input: i.value,
								inst: e,
								continue: !n.abort,
							}),
						(i.value = n.normalize ? u.href : Zb(o)));
					return;
				} catch {
					i.issues.push({ code: "invalid_format", format: "url", input: i.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	rM = ue("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = vN()), Et.init(e, n));
	}),
	iM = ue("$ZodNanoID", (e, n) => {
		if (n.length !== void 0 && (!Number.isInteger(n.length) || n.length < 1))
			throw new Error(`Invalid nanoid length: ${n.length}`);
		(n.pattern ?? (n.pattern = n.length === void 0 ? cN : fN(n.length)), Et.init(e, n));
	}),
	aM = ue("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = aN), Et.init(e, n));
	}),
	oM = ue("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = oN), Et.init(e, n));
	}),
	sM = ue("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = sN), Et.init(e, n));
	}),
	uM = ue("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = uN), Et.init(e, n));
	}),
	lM = ue("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = lN), Et.init(e, n));
	}),
	cM = ue("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = AN(n)), Et.init(e, n));
	}),
	fM = ue("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = xN), Et.init(e, n));
	}),
	dM = ue("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = ON(n)), Et.init(e, n));
	}),
	hM = ue("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = dN), Et.init(e, n));
	}),
	mM = ue("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = yN), Et.init(e, n));
	}),
	gM = /^[0-9a-fA-F:.]+$/;
function TE(e) {
	return gM.test(e) ? CE(`http://[${e}]`) : !1;
}
var vM = ue("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = pN),
			Et.init(e, n),
			(e._zod.check = (i) => {
				TE(i.value) ||
					i.issues.push({ code: "invalid_format", format: "ipv6", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	yM = ue("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = bN), Et.init(e, n));
	});
function pM(e) {
	const n = e.split("/");
	if (n.length !== 2) return !1;
	const [i, o] = n;
	if (!o) return !1;
	const u = Number(o);
	return `${u}` !== o || u < 0 || u > 128 ? !1 : TE(i);
}
var bM = ue("$ZodCIDRv6", (e, n) => {
	(n.pattern ?? (n.pattern = SN),
		Et.init(e, n),
		(e._zod.check = (i) => {
			pM(i.value) ||
				i.issues.push({ code: "invalid_format", format: "cidrv6", input: i.value, inst: e, continue: !n.abort });
		}));
});
function xE(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var OE = /^[0-9a-zA-Z+/]*={0,2}$/,
	SM = ue("$ZodBase64", (e, n) => {
		(n.pattern ?? (n.pattern = OE),
			Et.init(e, n),
			(e._zod.check = (i) => {
				xE(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	mg = /^[A-Za-z0-9_-]*$/;
function wM(e) {
	if (!mg.test(e)) return !1;
	const n = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return xE(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var EM = ue("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = mg),
			Et.init(e, n),
			(e._zod.check = (i) => {
				wM(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	_M = ue("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = CN), Et.init(e, n));
	});
function CM(e, n = null) {
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
var TM = ue("$ZodJWT", (e, n) => {
		(Et.init(e, n),
			(e._zod.check = (i) => {
				CM(i.value, n.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	AE = ue("$ZodNumber", (e, n) => {
		($t.init(e, n),
			(e._zod.pattern = NN),
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
	xM = ue("$ZodNumberFormat", (e, n) => {
		(IN.init(e, n), AE.init(e, n));
	}),
	OM = ue("$ZodUnknown", (e, n) => {
		($t.init(e, n), (e._zod.parse = (i) => i));
	}),
	AM = ue("$ZodNever", (e, n) => {
		($t.init(e, n),
			(e._zod.parse = (i, o) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function RM(e, n) {
	const i = Vb(e._zod.def.checks);
	if (!i.length) return;
	const o = Math.min(...i.map((l) => l[0])),
		u = e._zod.parse;
	e._zod.parse = (l, f) => {
		const h = n(l.value);
		if (h > o && !f?.skipChecks && f?.direction !== "backward") {
			for (const [m, g] of Vb(e._zod.def.checks))
				if (h > m && g._zod.def.when(l)) {
					const p = l.issues.length;
					return (g._zod.check(l), (l.issues[p].continue = !1), Im(l.issues, p, e), l);
				}
		}
		return u(l, f);
	};
}
var NM = (e) => (Array.isArray(e) ? e.length : -1);
function Fb(e, n, i) {
	(e.issues.length && n.issues.push(...mE(i, e.issues)), (n.value[i] = e.value));
}
var MM = ue("$ZodArray", (e, n) => {
	$t.init(e, n);
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
				if (p instanceof Promise) f.push(p.then((b) => Fb(b, o, m)));
				else if ((Fb(p, o, m), h && p.issues.length !== 0 && ui(p))) break;
			}
			return f.length ? Promise.all(f).then(() => o) : o;
		}),
		RM(e, NM));
});
function jc(e, n, i, o, u, l) {
	const f = i in o,
		h = l === "optional";
	if (!(!f && h && u === "optional")) {
		if (e.issues.length) {
			if (u !== void 0 && h && !f) return;
			n.issues.push(...mE(i, e.issues));
		}
		if (!f && u === void 0) {
			e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [i] });
			return;
		}
		e.value === void 0 ? (f || (u === "defaulted" && !h)) && (n.value[i] = void 0) : (n.value[i] = e.value);
	}
}
var DM = [];
function RE(e) {
	const n = Object.keys(e.shape),
		i = Object.getOwnPropertySymbols(e.shape),
		o = i.length ? i : DM,
		u = o.length ? [...n, ...o] : n;
	for (const f of u)
		if (!e.shape?.[f]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${String(f)}": expected a Zod schema`);
	const l = bR(e.shape);
	return { ...e, allKeys: u, symbolKeys: o, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(l) };
}
function NE(e, n, i, o, u, l, f) {
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
		T instanceof Promise ? e.push(T.then((x) => jc(x, i, E, n, b, y))) : jc(T, i, E, n, b, y);
	}
	return (
		h.length && i.issues.push({ code: "unrecognized_keys", keys: h, input: n, inst: l, continue: !0 }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var zM = ue("$ZodObject", (e, n) => {
		$t.init(e, n);
		const i = Object.getOwnPropertyDescriptor(n, "shape"),
			o = i?.get ? i.get.raw : (n.shape ?? {});
		if (o) {
			const g = () => {
				const p = { ...o };
				return (Object.defineProperty(n, "shape", { value: p }), (g.raw = p), p);
			};
			((g.raw = o), Object.defineProperty(n, "shape", { get: g }));
		}
		const u = ig(() => RE(n));
		ut(e, "propValues", (g) => {
			const p = g.def.shape,
				b = {};
			for (const y in p) {
				const w = p[y]._zod;
				if (w.values) {
					Object.prototype.hasOwnProperty.call(b, y) || Ba(b, y, new Set());
					for (const E of w.values) b[y].add(E);
					w.optin !== void 0 && b[y].add(void 0);
				}
			}
			return b;
		});
		const l = zc,
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
					const j = w[x],
						M = j._zod.optin,
						A = j._zod.optout,
						N = j._zod.run({ value: b[x], issues: [] }, p);
					N instanceof Promise ? y.push(N.then((D) => jc(D, g, x, b, M, A))) : jc(N, g, x, b, M, A);
				}
				return f ? NE(y, b, g, p, u.value, e, E === !0) : y.length ? Promise.all(y).then(() => g) : g;
			}));
	}),
	IM = ue("$ZodObjectJIT", (e, n) => {
		zM.init(e, n);
		const i = e._zod.parse,
			o = ig(() => RE(n)),
			u = kr.memoizer,
			l = (w) => {
				const E = o.value,
					T = E.symbolKeys,
					x = new ZN(["payload", "ctx"], { shape: w, inst: e, memo: u, syms: T }),
					j = (D) => `shape[${D}]._zod.run({ value: input[${D}], issues: [] }, ctx)`,
					M = (D, z) => `
          let ${D}_ab = false;
          for (let i = 0; i < ${D}.issues.length; i++) {
            const iss = ${D}.issues[i];
            iss.path = iss.path ? [${z}, ...iss.path] : [${z}];
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
					const z = A[D],
						O = typeof D == "symbol" ? `syms[${T.indexOf(D)}]` : gR(D),
						U = `${O} in input`,
						H = w[D],
						re = H?._zod?.optin,
						R = re !== void 0,
						q = H?._zod?.optout === "optional";
					if ((x.write(`const ${z} = ${j(O)};`), R && q)) {
						const P = re === "optional" ? `${z}_present` : `${z}.value !== undefined || ${z}_present`;
						x.write(`
        const ${z}_present = ${U};
        if (!${z}.issues.length || ${z}_present) {
          if (${z}.issues.length) {${M(z, O)}
          }

          if (${P}) {
            newResult[${O}] = ${z}.value;
          }
        }

      `);
					} else
						R
							? (x.write(`
        if (${z}.issues.length) {${M(z, O)}
        }
      `),
								re === "defaulted"
									? x.write(`newResult[${O}] = ${z}.value;`)
									: x.write(`
        if (${z}.value !== undefined || ${U}) {
          newResult[${O}] = ${z}.value;
        }
      `))
							: x.write(`
        const ${z}_present = ${U};
        if (${z}.issues.length) {${M(z, O)}
        }
        if (!${z}_present && !${z}.issues.length) {
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

        if (${z}_present) {
          newResult[${O}] = ${z}.value;
        }

      `);
				}
				return (x.write("payload.value = newResult;"), x.write("return payload;"), x.compile());
			};
		let f;
		const h = zc,
			m = !kr.jitless,
			p = m && yR.value,
			b = n.catchall;
		let y;
		e._zod.parse = (w, E) => {
			y ?? (y = o.value);
			const T = w.value;
			return h(T)
				? m && p && E?.async === !1 && E.jitless !== !0
					? (f || (f = l(n.shape)), (w = f(w, E)), b ? NE([], T, w, E, y, e, E?.abortEarly === !0) : w)
					: i(w, E)
				: (w.issues.push({ expected: "object", code: "invalid_type", input: T, inst: e }), w);
		};
	});
function Qb(e, n, i, o) {
	for (const l of e) if (l.issues.length === 0) return ((n.value = l.value), n);
	const u = e.filter((l) => !ui(l));
	return u.length === 1
		? ((n.value = u[0].value), u[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: i,
				errors: e.map((l) => l.issues.map((f) => Jo(f, o, Gi()))),
			}),
			n);
}
var jM = ue("$ZodUnion", (e, n) => {
		($t.init(e, n),
			ut(e, "optin", (o) =>
				o.def.options.some((u) => u._zod.optin === "defaulted")
					? "defaulted"
					: o.def.options.some((u) => u._zod.optin !== void 0)
						? "optional"
						: void 0,
			),
			ut(e, "optout", (o) => (o.def.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			ut(e, "values", (o) => {
				if (o.def.options.every((u) => u._zod.values))
					return new Set(o.def.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			ut(e, "pattern", (o) => {
				if (o.def.options.every((u) => u._zod.pattern)) {
					const u = o.def.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => ag(l.source)).join("|")})$`);
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
			return l ? Promise.all(f).then((h) => Qb(h, o, e, u)) : Qb(f, o, e, u);
		};
	}),
	kM = ue("$ZodIntersection", (e, n) => {
		($t.init(e, n),
			(e._zod.parse = (i, o) => {
				const u = i.value,
					l = n.left._zod.run({ value: u, issues: [] }, o),
					f = n.right._zod.run({ value: u, issues: [] }, o);
				return l instanceof Promise || f instanceof Promise
					? Promise.all([l, f]).then(([h, m]) => Yb(i, h, m))
					: Yb(i, l, f);
			}));
	});
function km(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (hu(e) && hu(n)) {
		const i = Object.keys(n),
			o = Object.keys(e).filter((l) => i.indexOf(l) !== -1),
			u = { ...e, ...n };
		Object.prototype.hasOwnProperty.call(u, "__proto__") && delete u.__proto__;
		for (const l of o) {
			if (l === "__proto__") continue;
			const f = km(e[l], n[l]);
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
				f = km(u, l);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			i.push(f.data);
		}
		return { valid: !0, data: i };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Yb(e, n, i) {
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
	const m = km(n.value, i.value);
	if (!m.valid) {
		if (ui(e)) return e;
		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(m.mergeErrorPath)}`);
	}
	return ((e.value = m.data), e);
}
var qM = ue("$ZodEnum", (e, n) => {
		$t.init(e, n);
		const i = Dm(n.entries),
			o = new Set(i);
		((e._zod.values = o),
			ut(e, "pattern", (u) => {
				const l = Dm(u.def.entries).filter((f) => pR.has(typeof f));
				return new RegExp(l.length ? `^(${l.map((f) => rf(f.toString())).join("|")})$` : "^[^\\s\\S]$");
			}),
			(e._zod.parse = (u, l) => {
				const f = u.value;
				return (o.has(f) || u.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), u);
			}));
	}),
	LM = ue("$ZodTransform", (e, n) => {
		($t.init(e, n),
			(e._zod.optin = "optional"),
			kr.memoizer?.guard(e),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") throw new yE(e.constructor.name);
				const u = n.transform(i.value, i);
				if (o.async) return (u instanceof Promise ? u : Promise.resolve(u)).then((l) => ((i.value = l), i));
				if (u instanceof Promise) throw new Ma();
				return ((i.value = u), i);
			}));
	});
function Kb(e, n) {
	return ((e.value = n.issues.length ? void 0 : n.value), e);
}
var ME = ue("$ZodOptional", (e, n) => {
		($t.init(e, n),
			ut(e, "optin", (i) => (i.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional")),
			(e._zod.optout = "optional"),
			ut(e, "values", (i) => {
				const o = i.def.innerType._zod.values;
				return o ? new Set([...o, void 0]) : void 0;
			}),
			ut(e, "pattern", (i) => {
				const o = i.def.innerType._zod.pattern;
				return o ? new RegExp(`^(${ag(o.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, o) => {
				if (i.value === void 0) {
					if (n.innerType._zod.optin !== "defaulted") return i;
					const u = n.innerType._zod.run({ value: i.value, issues: [] }, o);
					return u instanceof Promise ? u.then((l) => Kb(i, l)) : Kb(i, u);
				}
				return n.innerType._zod.run(i, o);
			}));
	}),
	UM = ue("$ZodExactOptional", (e, n) => {
		(ME.init(e, n),
			ut(e, "values", (i) => i.def.innerType._zod.values),
			ut(e, "pattern", (i) => i.def.innerType._zod.pattern),
			(e._zod.parse = (i, o) => n.innerType._zod.run(i, o)));
	}),
	VM = ue("$ZodNullable", (e, n) => {
		($t.init(e, n),
			ut(e, "optin", (i) => i.def.innerType._zod.optin),
			ut(e, "optout", (i) => i.def.innerType._zod.optout),
			ut(e, "pattern", (i) => {
				const o = i.def.innerType._zod.pattern;
				return o ? new RegExp(`^(${ag(o.source)}|null)$`) : void 0;
			}),
			ut(e, "values", (i) => (i.def.innerType._zod.values ? new Set([...i.def.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, o) => (i.value === null ? i : n.innerType._zod.run(i, o))));
	}),
	BM = ue("$ZodDefault", (e, n) => {
		($t.init(e, n),
			(e._zod.optin = "defaulted"),
			ut(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") return n.innerType._zod.run(i, o);
				if (i.value === void 0) return ((i.value = n.defaultValue), i);
				const u = n.innerType._zod.run(i, o);
				return u instanceof Promise ? u.then((l) => Gb(l, n)) : Gb(u, n);
			}));
	});
function Gb(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var PM = ue("$ZodPrefault", (e, n) => {
		($t.init(e, n),
			(e._zod.optin = "defaulted"),
			ut(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => (
				o.direction === "backward" || (i.value === void 0 && (i.value = n.defaultValue)),
				n.innerType._zod.run(i, o)
			)));
	}),
	$M = ue("$ZodNonOptional", (e, n) => {
		($t.init(e, n),
			ut(e, "values", (i) => {
				const o = i.def.innerType._zod.values;
				return o ? new Set([...o].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, o) => {
				const u = n.innerType._zod.run(i, o);
				return u instanceof Promise ? u.then((l) => Xb(l, e)) : Xb(u, e);
			}));
	});
function Xb(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
function Jb(e, n, i, o) {
	return n.issues.length
		? ((e.value = i.catchValue({
				...n,
				value: e.value,
				error: { issues: n.issues.map((u) => Jo(u, o, Gi())) },
				input: e.value,
			})),
			e)
		: ((e.value = n.value), n.memo && (e.memo = !0), e);
}
var HM = ue("$ZodCatch", (e, n) => {
		($t.init(e, n),
			ut(e, "optin", (i) => (i.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional")),
			ut(e, "optout", (i) => i.def.innerType._zod.optout),
			ut(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") return n.innerType._zod.run(i, o);
				const u = n.innerType._zod.run({ value: i.value, issues: [] }, o);
				return u instanceof Promise ? u.then((l) => Jb(i, l, n, o)) : Jb(i, u, n, o);
			}));
	}),
	ZM = ue("$ZodPipe", (e, n) => {
		($t.init(e, n),
			ut(e, "values", (i) => i.def.in._zod.values),
			ut(e, "optin", (i) => i.def.in._zod.optin),
			ut(e, "optout", (i) => i.def.out._zod.optout),
			ut(e, "propValues", (i) => i.def.in._zod.propValues),
			(e._zod.parse = (i, o) => {
				if (o.direction === "backward") {
					const l = n.out._zod.run(i, o);
					return l instanceof Promise ? l.then((f) => hc(f, n.in, o)) : hc(l, n.in, o);
				}
				const u = n.in._zod.run(i, o);
				return u instanceof Promise ? u.then((l) => hc(l, n.out, o)) : hc(u, n.out, o);
			}));
	});
function hc(e, n, i) {
	return e.issues.some((o) => o.code !== "unrecognized_keys")
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues }, i);
}
var FM = ue("$ZodReadonly", (e, n) => {
	($t.init(e, n),
		ut(e, "propValues", (i) => i.def.innerType._zod.propValues),
		ut(e, "values", (i) => i.def.innerType._zod.values),
		ut(e, "optin", (i) => i.def.innerType?._zod?.optin),
		ut(e, "optout", (i) => i.def.innerType?._zod?.optout),
		(e._zod.parse = (i, o) => {
			if (o.direction === "backward") return n.innerType._zod.run(i, o);
			const u = n.innerType._zod.run(i, o);
			return u instanceof Promise ? u.then(Wb) : Wb(u);
		}));
});
function Wb(e) {
	return (e.memo || (e.value = Object.freeze(e.value)), e);
}
var QM = ue("$ZodCustom", (e, n) => {
	(jn.init(e, n),
		$t.init(e, n),
		(e._zod.parse = (i, o) => i),
		(e._zod.check = (i) => {
			const o = i.value,
				u = n.fn(o);
			if (u instanceof Promise) return u.then((l) => eS(l, i, o, e));
			eS(u, i, o, e);
		}));
});
function eS(e, n, i, o) {
	if (!e) {
		const u = { code: "custom", input: i, inst: o, path: [...(o._zod.def.path ?? [])], continue: !o._zod.def.abort };
		(o._zod.def.params && (u.params = o._zod.def.params), n.issues.push(mu(u)));
	}
}
var YM = class extends Error {
		constructor() {
			(super("Cannot parse a reference cycle that closes through a transform"), (this.name = "ZodCyclicError"));
		}
	},
	qm = "~memo",
	tS = [];
function DE(e) {
	return e !== null && typeof e == "object";
}
function dm(e) {
	return e.map((n) => (n.path ? { ...n, path: n.path.slice() } : { ...n }));
}
var zE = new WeakMap(),
	nu = 0,
	Tc = 1,
	au = 2;
function xc(e, n, i) {
	const o = zE.get(e);
	if (o !== void 0) return o ? au : nu;
	if (n.has(e)) return au;
	n.add(e);
	let u = nu;
	const l = (g) => {
			if (u !== au && g?._zod) {
				const p = xc(g, n, i);
				p > u && (u = p);
			}
		},
		f = (g, p) => {
			let b = nu;
			for (const y of Reflect.ownKeys(g)) {
				const w = Object.getOwnPropertyDescriptor(g, y);
				if (p && !w.enumerable) continue;
				const E = w.get ? Tc : w.value?._zod ? xc(w.value, n, i) : nu;
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
			const g = oE(m);
			(h(g ? f(g, !0) : Tc), l(m.catchall));
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
			h(g ? xc(g, n, !1) : Tc);
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
	return (n.delete(e), KM(e, u));
}
function KM(e, n) {
	return (n !== Tc && zE.set(e, n === au), n);
}
function GM(e, n) {
	let i = e.buckets.get(n);
	return (i || ((i = new WeakMap()), e.buckets.set(n, i)), i);
}
var mc,
	gc = [],
	XM = {
		alloc(e, n, i) {
			const o = mc;
			if (!o) return i;
			mc = void 0;
			const u = { value: i, issues: null };
			return (o.set(n.value, u), gc.push(u), i);
		},
		guard(e) {
			var n;
			((n = e._zod).deferred ?? (n.deferred = []),
				e._zod.deferred.push(() => {
					const i = e._zod.parse,
						o = (u, l) => {
							if (l.direction !== "backward" && WM(l, u.value)) throw new YM();
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
								const j = xc(e, new Set(), !1);
								if (j === nu) return ((e._zod.parse = f), e._zod.run === h && (e._zod.run = f), f(m, g));
								j === au || o ? (i = !0) : (o = !0);
							}
							const p = m.value;
							if (!DE(p)) return f(m, g);
							let b = g[qm];
							b || ((b = { buckets: new WeakMap(), backEdges: void 0 }), (g[qm] = b));
							let y;
							u === g ? (y = l) : ((y = GM(b, e)), (u = g), (l = y));
							const w = y.get(p);
							if (w)
								return (
									(m.value = w.value),
									w.issues
										? w.issues.length && m.issues.push(...dm(w.issues))
										: ((m.memo = !0), b.backEdges ?? (b.backEdges = new WeakSet()), b.backEdges.add(w.value)),
									m
								);
							mc = y;
							const E = gc.length,
								T = f(m, g);
							mc = void 0;
							const x = gc.length > E ? gc.pop() : void 0;
							return T instanceof Promise
								? T.then((j) => (x && (x.issues = j.issues.length ? dm(j.issues) : tS), j))
								: (x && (x.issues = T.issues.length ? dm(T.issues) : tS), T);
						};
					((e._zod.parse = h), e._zod.run === f && (e._zod.run = h));
				}));
		},
	};
function JM() {
	return XM;
}
function WM(e, n) {
	const i = e[qm]?.backEdges;
	return i !== void 0 && DE(n) && i.has(n);
}
var eD = () => {
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
				return `Invalid input: expected ${u(l.expected)}, received ${u(RR(l.input), l.input)}`;
			case "invalid_value":
				return l.values.length === 1
					? `Invalid input: expected ${fE(l.values[0])}`
					: `Invalid option: expected one of ${Lb(l.values, "|")}`;
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
				return `Unrecognized key${l.keys.length > 1 ? "s" : ""}: ${Lb(l.keys, ", ")}`;
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
function tD() {
	return { localeError: eD() };
}
var nS,
	nD = class {
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
function rD() {
	return new nD();
}
(nS = globalThis).__zod_globalRegistry ?? (nS.__zod_globalRegistry = rD());
var ru = globalThis.__zod_globalRegistry;
function IE(e) {
	return (e.checks && (e.checks = [...e.checks]), e);
}
function iD(e, n) {
	return new e(IE({ type: "string", ...ze(n) }));
}
function aD(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...ze(n) });
}
function oD(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...ze(n) });
}
function sD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...ze(n) });
}
function uD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...ze(n) });
}
function lD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...ze(n) });
}
function cD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...ze(n) });
}
function fD(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...ze(n) });
}
function dD(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...ze(n) });
}
function hD(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...ze(n) });
}
function mD(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...ze(n) });
}
function gD(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...ze(n) });
}
function vD(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...ze(n) });
}
function yD(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...ze(n) });
}
function pD(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...ze(n) });
}
function bD(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...ze(n) });
}
function SD(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...ze(n) });
}
function wD(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...ze(n) });
}
function ED(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...ze(n) });
}
function _D(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...ze(n) });
}
function CD(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...ze(n) });
}
function TD(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...ze(n) });
}
function xD(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...ze(n) });
}
function OD(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...ze(n),
	});
}
function AD(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...ze(n) });
}
function RD(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...ze(n) });
}
function ND(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...ze(n) });
}
function MD(e, n) {
	return new e(IE({ type: "number", checks: [], ...ze(n) }));
}
function DD(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...ze(n) });
}
function zD(e) {
	return new e({ type: "unknown" });
}
function ID(e, n) {
	return new e({ type: "never", ...ze(n) });
}
function rS(e, n) {
	return new SE({ check: "less_than", ...ze(n), value: e, inclusive: !1 });
}
function hm(e, n) {
	return new SE({ check: "less_than", ...ze(n), value: e, inclusive: !0 });
}
function iS(e, n) {
	return new wE({ check: "greater_than", ...ze(n), value: e, inclusive: !1 });
}
function mm(e, n) {
	return new wE({ check: "greater_than", ...ze(n), value: e, inclusive: !0 });
}
function aS(e, n) {
	return new zN({ check: "multiple_of", ...ze(n), value: e });
}
function jE(e, n) {
	return new jN({ check: "max_length", ...ze(n), maximum: e });
}
function kc(e, n) {
	return new kN({ check: "min_length", ...ze(n), minimum: e });
}
function kE(e, n) {
	return new qN({ check: "length_equals", ...ze(n), length: e });
}
function jD(e, n) {
	return new LN({ check: "string_format", format: "regex", ...ze(n), pattern: e });
}
function kD(e) {
	return new UN({ check: "string_format", format: "lowercase", ...ze(e) });
}
function qD(e) {
	return new VN({ check: "string_format", format: "uppercase", ...ze(e) });
}
function LD(e, n) {
	return new BN({ check: "string_format", format: "includes", ...ze(n), includes: e });
}
function UD(e, n) {
	return new PN({ check: "string_format", format: "starts_with", ...ze(n), prefix: e });
}
function VD(e, n) {
	return new $N({ check: "string_format", format: "ends_with", ...ze(n), suffix: e });
}
function Wo(e) {
	return new HN({ check: "overwrite", tx: e });
}
function BD(e) {
	return Wo((n) => n.normalize(e));
}
function PD() {
	return Wo((e) => e.trim());
}
function $D() {
	return Wo((e) => e.toLowerCase());
}
function HD() {
	return Wo((e) => e.toUpperCase());
}
function ZD() {
	return Wo((e) => vR(e));
}
function FD(e, n, i) {
	return new e({ type: "array", element: n, ...ze(i) });
}
function QD(e, n, i) {
	return new e({ type: "custom", check: "custom", fn: n, ...ze(i) });
}
function YD(e, n) {
	const i = KD(
		(o) => (
			(o.addIssue = (u) => {
				if (typeof u == "string") o.issues.push(mu(u, o.value, i._zod.def));
				else {
					const l = u;
					(l.fatal && (l.continue = !1),
						l.code ?? (l.code = "custom"),
						"input" in l || (l.input = o.value),
						l.inst ?? (l.inst = i),
						l.continue ?? (l.continue = !i._zod.def.abort),
						o.issues.push(mu(l)));
				}
			}),
			e(o.value, o)
		),
		n,
	);
	return i;
}
function KD(e, n) {
	const i = new jn({ check: "custom", ...ze(n) });
	return ((i._zod.check = e), i);
}
function ou(e, ...n) {
	for (const i of n)
		for (const o of Reflect.ownKeys(i)) Object.prototype.propertyIsEnumerable.call(i, o) && Ba(e, o, i[o]);
	return e;
}
function qE(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? ru,
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
function es(e, n, i, o, u) {
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
		m && ou(f.schema, m),
		n.io === "input" && _n(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((o = f.schema).default ?? (o.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function oS(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function LE(e, n) {
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
				return ((f[1].defId = w), { defId: w, ref: `${y("__shared")}#/${h}/${oS(w)}` });
			}
			const m = "#",
				g = `${m}/${h}/`;
			if (f[1] === i && !f[1].schema.id) return { ref: m };
			const p = f[1].schema.id ?? `__schema${e.counter++}`;
			return { defId: p, ref: g + oS(p) };
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
function UE(e) {
	const n = e.anyOf;
	if (!Array.isArray(n) || n.length === 0 || e.type !== void 0) return;
	const i = [];
	for (const o of n) {
		if (!o || typeof o != "object") return;
		UE(o);
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
var VE = new Set(["type", "properties", "required", "additionalProperties"]),
	sS = ["oneOf", "anyOf"];
function uS(e) {
	const n = e.additionalProperties;
	return n === void 0 || n === !1 || typeof n != "object" || n === null ? null : Object.keys(n).length ? n : null;
}
function Lm(e) {
	const n = [];
	for (const l of e) {
		if (typeof l != "object" || l.type !== "object") return null;
		for (const f in l) if (!VE.has(f)) return null;
		n.push(l);
	}
	const i = {},
		o = new Set();
	for (const l of n) {
		for (const f in l.properties) {
			if (Object.prototype.hasOwnProperty.call(i, f)) continue;
			const h = [];
			for (const g of n) {
				const p = g.properties?.[f] ?? uS(g);
				p != null && (h.some((b) => JSON.stringify(b) === JSON.stringify(p)) || h.push(p));
			}
			const m = h.length === 1 ? h[0] : (Lm(h) ?? { allOf: h });
			Ba(i, f, m);
		}
		for (const f of l.required ?? []) o.add(f);
	}
	const u = { type: "object", properties: i };
	if ((o.size && (u.required = [...o]), n.every((l) => l.additionalProperties === !1))) u.additionalProperties = !1;
	else {
		const l = [];
		for (const f of n) {
			const h = uS(f);
			h && !l.some((m) => JSON.stringify(m) === JSON.stringify(h)) && l.push(h);
		}
		l.length === 1 ? (u.additionalProperties = l[0]) : l.length > 1 && (u.additionalProperties = { allOf: l });
	}
	return u;
}
function GD(e) {
	const n = e.allOf;
	if (!Array.isArray(n) || n.length < 2) return;
	for (const u of VE) if (u in e) return;
	const i = n.filter((u) => sS.some((l) => Array.isArray(u[l])));
	let o = null;
	if (!i.length) o = Lm(n);
	else {
		const u = i[0],
			l = sS.find((m) => Array.isArray(u[m]));
		if (Object.keys(u).length !== 1) return;
		const f = n.filter((m) => m !== u),
			h = u[l].map((m) => Lm([...f, m]));
		if (h.some((m) => !m)) return;
		o = { [l]: h };
	}
	o && (delete e.allOf, ou(e, o));
}
function BE(e, n) {
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
					: ou(g, E),
				ou(g, p),
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
		if (e.target !== "openapi-3.0") for (const h of e.seen.entries()) UE(h[1].def ?? h[1].schema);
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
			for (const m of e.intersections) for (const g of h.get(m) ?? []) GD(g);
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
	ou(u, i.defId ? i.schema : (i.def ?? i.schema));
	const l = e.metadataRegistry.get(n)?.id;
	l !== void 0 && u.id === l && delete u.id;
	const f = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external)
		for (const h of e.seen.entries()) {
			const m = h[1];
			m.def && m.defId && (m.def.id === m.defId && delete m.def.id, Ba(f, m.defId, m.def));
		}
	(e.external && (e.sharedEmitDoneFor = e.external),
		e.external || (Object.keys(f).length > 0 && (e.target === "draft-2020-12" ? (u.$defs = f) : (u.definitions = f))));
	try {
		const h = JSON.parse(JSON.stringify(u));
		return (
			Object.defineProperty(h, "~standard", {
				value: {
					...n["~standard"],
					jsonSchema: { input: qc(n, "input", e.processors), output: qc(n, "output", e.processors) },
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
var XD =
		(e, n = {}) =>
		(i) => {
			const o = qE({ ...i, processors: n });
			return (fn(e, o), LE(o, e), BE(o, e));
		},
	qc =
		(e, n, i = {}) =>
		(o) => {
			const { libraryOptions: u, target: l } = o ?? {},
				f = qE({ ...(u ?? {}), target: l, io: n, processors: i });
			return (fn(e, f), LE(f, e), BE(f, e));
		},
	Zo = (e, n, i) => {
		(e[n] === void 0 || i > e[n]) && (e[n] = i);
	},
	Fo = (e, n, i) => {
		(e[n] === void 0 || i < e[n]) && (e[n] = i);
	},
	lS = (e, n) => {
		(Zo(e, "minimum", n), Fo(e, "maximum", n));
	},
	PE = (e, n) => {
		(e.multipleOf ?? (e.multipleOf = []), e.multipleOf.includes(n) || e.multipleOf.push(n));
	},
	$E = (e, n) => {
		(e.patterns ?? (e.patterns = new Set()), e.patterns.add(n));
	},
	HE = (e, n) => {
		e.mime = e.mime ? e.mime.filter((i) => n.includes(i)) : [...n];
	},
	ZE = (e, n) => {
		((e.format = n), n.includes("int") && (e.isInt = !0));
	},
	cS = (e, n) => Zo(e, "minimum", n.minimum),
	fS = (e, n) => Fo(e, "maximum", n.maximum),
	dS = (e) => (n, i) => {
		ZE(n, i.format);
		const [o, u] = e[i.format];
		(Zo(n, "minimum", o), Fo(n, "maximum", u));
	},
	JD = {
		greater_than: (e, n) => Zo(e, n.inclusive ? "minimum" : "exclusiveMinimum", n.value),
		less_than: (e, n) => Fo(e, n.inclusive ? "maximum" : "exclusiveMaximum", n.value),
		multiple_of: (e, n) => PE(e, n.value),
		number_format: dS(dE),
		bigint_format: dS(SR),
		min_length: cS,
		max_length: fS,
		length_equals: (e, n) => lS(e, n.length),
		min_size: cS,
		max_size: fS,
		size_equals: (e, n) => lS(e, n.size),
		string_format: (e, n) => {
			(ZE(e, n.format),
				n.pattern && $E(e, n.pattern),
				(n.format === "base64" || n.format === "base64url") && (e.contentEncoding = n.format),
				(n.local || n.precision === -1) && (e.laxFormat = !0));
		},
		mime_type: (e, n) => HE(e, n.mime),
	};
function Ir(e) {
	const n = {},
		i = e._zod.def,
		o = e._zod.traits.has("$ZodCheck") ? [e, ...(i.checks ?? [])] : (i.checks ?? []);
	for (const l of o) JD[l._zod.def.check]?.(n, l._zod.def);
	const u = e._zod.bag;
	(u.minimum !== void 0 && Zo(n, "minimum", u.minimum),
		u.exclusiveMinimum !== void 0 && Zo(n, "exclusiveMinimum", u.exclusiveMinimum),
		u.maximum !== void 0 && Fo(n, "maximum", u.maximum),
		u.exclusiveMaximum !== void 0 && Fo(n, "exclusiveMaximum", u.exclusiveMaximum),
		u.multipleOf !== void 0 && PE(n, u.multipleOf),
		u.format !== void 0 && (n.format ?? (n.format = u.format), u.format.includes("int") && (n.isInt = !0)),
		u.mime && HE(n, u.mime));
	for (const l of u.patterns ?? []) $E(n, l);
	return n;
}
var WD = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	ez = new Map([
		[OE, wN],
		[mg, EN],
	]),
	tz = (e) => ez.get(e) ?? e,
	nz = (e, n, i, o) => {
		const u = i;
		u.type = "string";
		const { minimum: l, maximum: f, format: h, patterns: m, contentEncoding: g, laxFormat: p } = Ir(e);
		if (
			(typeof l == "number" && (u.minLength = l),
			typeof f == "number" && (u.maxLength = f),
			h && ((u.format = WD[h] ?? h), u.format === "" && delete u.format, (h === "time" || p) && delete u.format),
			g && (u.contentEncoding = g),
			m && m.size > 0)
		) {
			const b = [...m].map(tz);
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
	rz = (e, n, i, o) => {
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
			for (const j of h)
				Number.isFinite(j) && j !== 0
					? E.add(Math.abs(j))
					: es(e, n, u, o, `A multipleOf divisor of ${j} cannot be represented in JSON Schema`);
			const [T, ...x] = E;
			(T !== void 0 && (u.multipleOf = T),
				x.length && (u.allOf = [...(u.allOf ?? []), ...x.map((j) => ({ multipleOf: j }))]));
		}
	},
	iz = (e, n, i, o) => {
		i.not = {};
	},
	az = (e, n, i, o) => {},
	oz = (e, n, i, o) => {
		const u = e._zod.def,
			l = Dm(u.entries);
		if (l.length === 0) {
			i.not = {};
			return;
		}
		(l.every((f) => typeof f == "number") && (i.type = "number"),
			l.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = l));
	},
	sz = (e, n, i, o) => {
		es(e, n, i, o, "Custom types cannot be represented in JSON Schema");
	},
	uz = (e, n, i, o) => {
		es(e, n, i, o, "Transforms cannot be represented in JSON Schema");
	},
	lz = (e, n, i, o) => {
		const u = i,
			l = e._zod.def,
			{ minimum: f, maximum: h } = Ir(e);
		(typeof f == "number" && (u.minItems = f),
			typeof h == "number" && (u.maxItems = h),
			(u.type = "array"),
			(u.items = fn(l.element, n, { ...o, path: [...o.path, "items"] })));
	};
function Um(e) {
	const n = e._zod.def;
	return n.type === "pipe" && n.in._zod.traits.has("$ZodTransform")
		? Um(n.out)
		: n.type === "catch"
			? Um(n.innerType)
			: e._zod.optin;
}
var cz = (e, n, i, o) => {
		const u = i,
			l = e._zod.def,
			f = l.shape;
		if (Object.getOwnPropertySymbols(f).length && es(e, n, u, o, "Symbol keys cannot be represented in JSON Schema"))
			return;
		((u.type = "object"), (u.properties = {}));
		for (const m in f) Ba(u.properties, m, fn(f[m], n, { ...o, path: [...o.path, "properties", m] }));
		const h = [];
		for (const m of Object.keys(f)) {
			const g = l.shape[m];
			(n.io === "input" ? Um(g) === void 0 : g._zod.optout === void 0) && h.push(m);
		}
		(h.length > 0 && (u.required = h),
			l.catchall?._zod.def.type === "never"
				? (u.additionalProperties = !1)
				: l.catchall
					? l.catchall &&
						(u.additionalProperties = fn(l.catchall, n, { ...o, path: [...o.path, "additionalProperties"] }))
					: n.io === "output" && (u.additionalProperties = !1));
	},
	fz = (e, n, i, o) => {
		const u = e._zod.def,
			l = u.inclusive === !1,
			f = u.options.map((h, m) => fn(h, n, { ...o, path: [...o.path, l ? "oneOf" : "anyOf", m] }));
		l ? (i.oneOf = f) : (i.anyOf = f);
	},
	dz = (e, n, i, o) => {
		const u = e._zod.def,
			l = fn(u.left, n, { ...o, path: [...o.path, "allOf", 0] }),
			f = fn(u.right, n, { ...o, path: [...o.path, "allOf", 1] }),
			h = (g) => "allOf" in g && Object.keys(g).length === 1,
			m = [...(h(l) ? l.allOf : [l]), ...(h(f) ? f.allOf : [f])];
		((i.allOf = m), n.intersections.push(m));
	},
	hz = (e, n, i, o) => {
		const u = e._zod.def,
			l = fn(u.innerType, n, o),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = u.innerType), (i.nullable = !0)) : (i.anyOf = [l, { type: "null" }]);
	},
	mz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
	},
	gg = Symbol();
function FE(e, n, i, o, u) {
	let l = !1;
	const f = JSON.stringify(e, (h, m) => (typeof m != "bigint" ? m : ((l = !0), null)));
	return l ? (es(n, i, o, u, "BigInt defaults cannot be represented in JSON Schema"), gg) : JSON.parse(f);
}
var gz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
		const f = FE(u.defaultValue, e, n, i, o);
		f !== gg && (i.default = f);
	},
	vz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		if (((l.ref = u.innerType), n.io !== "input")) return;
		const f = FE(u.defaultValue, e, n, i, o);
		f !== gg && (i._prefault = f);
	},
	yz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
		let f;
		try {
			f = u.catchValue(void 0);
		} catch {
			es(e, n, i, o, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		i.default = f;
	},
	pz = (e, n, i, o) => {
		const u = e._zod.def,
			l = u.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (l ? u.out : u.in) : u.out;
		fn(f, n, o);
		const h = n.seen.get(e);
		h.ref = f;
	},
	bz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		((l.ref = u.innerType), (i.readOnly = !0));
	},
	QE = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
	},
	hS = new WeakSet([Object.prototype, Error.prototype]);
function vc(e, n, i) {
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
var Sz = (e, n) => {
		(PR.init(e, n), (e.name = "ZodError"));
		const i = Object.getPrototypeOf(e);
		hS.has(i) ||
			(hS.add(i),
			vc(i, "format", (o) => (u) => ZR(o, u)),
			vc(i, "flatten", (o) => (u) => HR(o, u)),
			vc(i, "addIssue", (o) => (u) => {
				(o.issues.push(u), (o.message = JSON.stringify(o.issues, zm, 2)));
			}),
			vc(i, "addIssues", (o) => (u) => {
				(o.issues.push(...u), (o.message = JSON.stringify(o.issues, zm, 2)));
			}),
			Object.defineProperty(i, "isEmpty", {
				configurable: !0,
				enumerable: !1,
				get() {
					return this.issues.length === 0;
				},
			}));
	},
	ur = ue("ZodError", Sz, void 0, { Parent: Error }),
	wz = ug(ur),
	Ez = lg(ur),
	_z = cg(ur),
	Cz = fg(ur),
	Tz = XR(ur),
	xz = JR(ur),
	Oz = WR(ur),
	Az = eN(ur),
	Rz = tN(ur),
	Nz = nN(ur),
	Mz = rN(ur),
	Dz = iN(ur);
function zz() {
	kr.localeError || Gi(tD());
}
function vg() {
	kr.memoizer || Gi({ memoizer: JM() });
}
var Ht = ue("ZodType", (e, n) => (zz(), $t.init(e, n), (e.def = n), (e.type = n.type), e), {
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
			return Ki(this, e, n);
		},
		brand() {
			return this;
		},
		register(e, n) {
			return (e.add(this, n), this);
		},
		refine(e, n) {
			return this.check(D2(e, n));
		},
		superRefine(e, n) {
			return this.check(z2(e, n));
		},
		overwrite(e) {
			return this.check(Wo(e));
		},
		optional() {
			return yS(this);
		},
		exactOptional() {
			return b2(this);
		},
		nullable() {
			return pS(this);
		},
		nullish() {
			return yS(pS(this));
		},
		nonoptional(e) {
			return T2(this, e);
		},
		array() {
			return l2(this);
		},
		or(e) {
			return h2([this, e]);
		},
		and(e) {
			return g2(this, e);
		},
		transform(e) {
			return bS(this, p2(e));
		},
		default(e) {
			return E2(this, e);
		},
		prefault(e) {
			return C2(this, e);
		},
		catch(e) {
			return O2(this, e);
		},
		pipe(e) {
			return bS(this, e);
		},
		readonly() {
			return N2(this);
		},
		describe(e) {
			const n = this.clone();
			return (ru.add(n, { description: e }), n);
		},
		meta(...e) {
			if (e.length === 0) return ru.get(this);
			const n = this.clone();
			return (ru.add(n, e[0]), n);
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
			return gE(this, "~standard", {
				..._E(this),
				jsonSchema: { input: qc(this, "input"), output: qc(this, "output") },
			});
		},
		set "~standard"(e) {
			Zi(this, "~standard", e);
		},
		parse: function e(n, i) {
			return wz(this, n, i, { callee: e });
		},
		parseAsync: async function e(n, i) {
			return await Ez(this, n, i, { callee: e });
		},
		safeParse(e, n) {
			return _z(this, e, n);
		},
		async safeParseAsync(e, n) {
			return Cz(this, e, n);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			Zi(this, "spa", e);
		},
		validate(e, n) {
			return YR(this, e, n);
		},
		validateAsync(e, n) {
			return GR(this, e, n);
		},
		encode: function e(n, i) {
			return Tz(this, n, i, { callee: e });
		},
		decode: function e(n, i) {
			return xz(this, n, i, { callee: e });
		},
		encodeAsync: async function e(n, i) {
			return await Oz(this, n, i, { callee: e });
		},
		decodeAsync: async function e(n, i) {
			return await Az(this, n, i, { callee: e });
		},
		safeEncode(e, n) {
			return Rz(this, e, n);
		},
		safeDecode(e, n) {
			return Nz(this, e, n);
		},
		async safeEncodeAsync(e, n) {
			return Mz(this, e, n);
		},
		async safeDecodeAsync(e, n) {
			return Dz(this, e, n);
		},
		toJSONSchema(e) {
			return XD(this, {})(e);
		},
		get description() {
			return ru.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		},
	}),
	YE = ue(
		"_ZodString",
		(e, n) => {
			(hg.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => nz(e, i, o, u)));
		},
		vE(
			{
				format: (e) => Ir(e).format ?? null,
				minLength: (e) => Ir(e).minimum ?? null,
				maxLength: (e) => Ir(e).maximum ?? null,
			},
			{
				regex(...e) {
					return this.check(jD(...e));
				},
				includes(...e) {
					return this.check(LD(...e));
				},
				startsWith(...e) {
					return this.check(UD(...e));
				},
				endsWith(...e) {
					return this.check(VD(...e));
				},
				min(...e) {
					return this.check(kc(...e));
				},
				max(...e) {
					return this.check(jE(...e));
				},
				length(...e) {
					return this.check(kE(...e));
				},
				nonempty(...e) {
					return this.check(kc(1, ...e));
				},
				lowercase(e) {
					return this.check(kD(e));
				},
				uppercase(e) {
					return this.check(qD(e));
				},
				trim() {
					return this.check(PD());
				},
				normalize(...e) {
					return this.check(BD(...e));
				},
				toLowerCase() {
					return this.check($D());
				},
				toUpperCase() {
					return this.check(HD());
				},
				slugify() {
					return this.check(ZD());
				},
			},
		),
	),
	Iz = ue(
		"ZodString",
		(e, n) => {
			(hg.init(e, n), YE.init(e, n));
		},
		{
			email(e) {
				return this.check(aD(Vz, e));
			},
			url(e) {
				return this.check(fD(Pz, e));
			},
			jwt(e) {
				return this.check(xD(r2, e));
			},
			emoji(e) {
				return this.check(dD($z, e));
			},
			guid(e) {
				return this.check(oD(Bz, e));
			},
			uuid(e) {
				return this.check(sD(yc, e));
			},
			uuidv4(e) {
				return this.check(uD(yc, e));
			},
			uuidv6(e) {
				return this.check(lD(yc, e));
			},
			uuidv7(e) {
				return this.check(cD(yc, e));
			},
			nanoid(e) {
				return this.check(hD(Hz, e));
			},
			cuid(e) {
				return this.check(mD(Zz, e));
			},
			cuid2(e) {
				return this.check(gD(Fz, e));
			},
			ulid(e) {
				return this.check(vD(Qz, e));
			},
			base64(e) {
				return this.check(_D(e2, e));
			},
			base64url(e) {
				return this.check(CD(t2, e));
			},
			xid(e) {
				return this.check(yD(Yz, e));
			},
			ksuid(e) {
				return this.check(pD(Kz, e));
			},
			ipv4(e) {
				return this.check(bD(Gz, e));
			},
			ipv6(e) {
				return this.check(SD(Xz, e));
			},
			cidrv4(e) {
				return this.check(wD(Jz, e));
			},
			cidrv6(e) {
				return this.check(ED(Wz, e));
			},
			e164(e) {
				return this.check(TD(n2, e));
			},
			datetime(e) {
				return this.check(OD(kz, e));
			},
			date(e) {
				return this.check(AD(qz, e));
			},
			time(e) {
				return this.check(RD(Lz, e));
			},
			duration(e) {
				return this.check(ND(Uz, e));
			},
		},
	);
function jz(e) {
	return iD(Iz, e);
}
var Ot = ue("ZodStringFormat", (e, n) => {
		(Et.init(e, n), YE.init(e, n));
	}),
	kz = ue("ZodISODateTime", (e, n) => {
		(cM.init(e, n), Ot.init(e, n));
	}),
	qz = ue("ZodISODate", (e, n) => {
		(fM.init(e, n), Ot.init(e, n));
	}),
	Lz = ue("ZodISOTime", (e, n) => {
		(dM.init(e, n), Ot.init(e, n));
	}),
	Uz = ue("ZodISODuration", (e, n) => {
		(hM.init(e, n), Ot.init(e, n));
	}),
	Vz = ue("ZodEmail", (e, n) => {
		(GN.init(e, n), Ot.init(e, n));
	}),
	Bz = ue("ZodGUID", (e, n) => {
		(YN.init(e, n), Ot.init(e, n));
	}),
	yc = ue("ZodUUID", (e, n) => {
		(KN.init(e, n), Ot.init(e, n));
	}),
	Pz = ue("ZodURL", (e, n) => {
		(nM.init(e, n), Ot.init(e, n));
	}),
	$z = ue("ZodEmoji", (e, n) => {
		(rM.init(e, n), Ot.init(e, n));
	}),
	Hz = ue("ZodNanoID", (e, n) => {
		(iM.init(e, n), Ot.init(e, n));
	}),
	Zz = ue("ZodCUID", (e, n) => {
		(aM.init(e, n), Ot.init(e, n));
	}),
	Fz = ue("ZodCUID2", (e, n) => {
		(oM.init(e, n), Ot.init(e, n));
	}),
	Qz = ue("ZodULID", (e, n) => {
		(sM.init(e, n), Ot.init(e, n));
	}),
	Yz = ue("ZodXID", (e, n) => {
		(uM.init(e, n), Ot.init(e, n));
	}),
	Kz = ue("ZodKSUID", (e, n) => {
		(lM.init(e, n), Ot.init(e, n));
	}),
	Gz = ue("ZodIPv4", (e, n) => {
		(mM.init(e, n), Ot.init(e, n));
	}),
	Xz = ue("ZodIPv6", (e, n) => {
		(vM.init(e, n), Ot.init(e, n));
	}),
	Jz = ue("ZodCIDRv4", (e, n) => {
		(yM.init(e, n), Ot.init(e, n));
	}),
	Wz = ue("ZodCIDRv6", (e, n) => {
		(bM.init(e, n), Ot.init(e, n));
	}),
	e2 = ue("ZodBase64", (e, n) => {
		(SM.init(e, n), Ot.init(e, n));
	}),
	t2 = ue("ZodBase64URL", (e, n) => {
		(EM.init(e, n), Ot.init(e, n));
	}),
	n2 = ue("ZodE164", (e, n) => {
		(_M.init(e, n), Ot.init(e, n));
	}),
	r2 = ue("ZodJWT", (e, n) => {
		(TM.init(e, n), Ot.init(e, n));
	}),
	KE = ue(
		"ZodNumber",
		(e, n) => {
			(AE.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => rz(e, i, o, u)), (e.isFinite = !0));
		},
		vE(
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
					return this.check(iS(e, n));
				},
				gte(e, n) {
					return this.check(mm(e, n));
				},
				min(e, n) {
					return this.check(mm(e, n));
				},
				lt(e, n) {
					return this.check(rS(e, n));
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
					return this.check(iS(0, e));
				},
				nonnegative(e) {
					return this.check(mm(0, e));
				},
				negative(e) {
					return this.check(rS(0, e));
				},
				nonpositive(e) {
					return this.check(hm(0, e));
				},
				multipleOf(e, n) {
					return this.check(aS(e, n));
				},
				step(e, n) {
					return this.check(aS(e, n));
				},
				finite() {
					return this;
				},
			},
		),
	);
function mS(e) {
	return MD(KE, e);
}
var i2 = ue("ZodNumberFormat", (e, n) => {
	(xM.init(e, n), KE.init(e, n));
});
function gS(e) {
	return DD(i2, e);
}
var a2 = ue("ZodUnknown", (e, n) => {
	(OM.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => az(e, i, o, u)));
});
function vS() {
	return zD(a2);
}
var o2 = ue("ZodNever", (e, n) => {
	(AM.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => iz(e, i, o, u)));
});
function s2(e) {
	return ID(o2, e);
}
var u2 = ue(
	"ZodArray",
	(e, n) => {
		(vg(),
			MM.init(e, n),
			Ht.init(e, n),
			(e._zod.processJSONSchema = (i, o, u) => lz(e, i, o, u)),
			(e.element = n.element));
	},
	{
		min(e, n) {
			return this.check(kc(e, n));
		},
		nonempty(e) {
			return this.check(kc(1, e));
		},
		max(e, n) {
			return this.check(jE(e, n));
		},
		length(e, n) {
			return this.check(kE(e, n));
		},
		unwrap() {
			return this.element;
		},
	},
);
function l2(e, n) {
	return FD(u2, e, n);
}
var c2 = ue(
	"ZodObject",
	(e, n) => {
		(vg(),
			IM.init(e, n),
			Ht.init(e, n),
			(e._zod.processJSONSchema = (i, o, u) => cz(e, i, o, u)),
			IR(e, "shape", (i) => i._zod.def.shape, !1));
	},
	{
		keyof() {
			return v2(Object.keys(this._zod.def.shape));
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
			return this.clone(Hn(this._zod.def, { catchall: s2() }));
		},
		strip() {
			return this.clone(Hn(this._zod.def, { catchall: void 0 }));
		},
		extend(e) {
			return _R(this, e);
		},
		safeExtend(e) {
			return CR(this, e);
		},
		merge(e) {
			return TR(this, e);
		},
		pick(e) {
			return wR(this, e);
		},
		omit(e) {
			return ER(this, e);
		},
		partial(...e) {
			return Ub(GE, this, e[0]);
		},
		exactPartial(...e) {
			return Ub(XE, this, e[0], "exactPartial");
		},
		required(...e) {
			return xR(JE, this, e[0]);
		},
	},
);
function f2(e, n) {
	const i = { type: "object", shape: e ?? {}, ...ze(n) };
	return new c2(i);
}
var d2 = ue("ZodUnion", (e, n) => {
	(jM.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => fz(e, i, o, u)), (e.options = n.options));
});
function h2(e, n) {
	return new d2({ type: "union", options: e, ...ze(n) });
}
var m2 = ue("ZodIntersection", (e, n) => {
	(kM.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => dz(e, i, o, u)));
});
function g2(e, n) {
	return new m2({ type: "intersection", left: e, right: n });
}
var Vm = ue("ZodEnum", (e, n) => {
	(qM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (o, u, l) => oz(e, o, u, l)),
		(e.enum = n.entries),
		(e.options = [...e._zod.values]));
	const i = new Set(Object.keys(n.entries));
	((e.extract = (o, u) => {
		const l = {};
		for (const f of o)
			if (i.has(f)) l[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Vm({ ...n, checks: [], ...ze(u), entries: l });
	}),
		(e.exclude = (o, u) => {
			const l = { ...n.entries };
			for (const f of o)
				if (i.has(f)) delete l[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Vm({ ...n, checks: [], ...ze(u), entries: l });
		}));
});
function v2(e, n) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((o) => [o, o])) : e;
	return new Vm({ type: "enum", entries: i, ...ze(n) });
}
var y2 = ue("ZodTransform", (e, n) => {
	(vg(),
		LM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => uz(e, i, o, u)),
		(e._zod.parse = (i, o) => {
			if (o.direction === "backward") throw new yE(e.constructor.name);
			i.addIssue = (l) => {
				if (typeof l == "string") i.issues.push(mu(l, i.value, n));
				else {
					const f = l;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						"input" in f || (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(mu(f)));
				}
			};
			const u = n.transform(i.value, i);
			return u instanceof Promise ? u.then((l) => ((i.value = l), i)) : ((i.value = u), i);
		}));
});
function p2(e) {
	return new y2({ type: "transform", transform: e });
}
var GE = ue("ZodOptional", (e, n) => {
	(ME.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => QE(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function yS(e) {
	return new GE({ type: "optional", innerType: e });
}
var XE = ue("ZodExactOptional", (e, n) => {
	(UM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => QE(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function b2(e) {
	return new XE({ type: "optional", innerType: e });
}
var S2 = ue("ZodNullable", (e, n) => {
	(VM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => hz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function pS(e) {
	return new S2({ type: "nullable", innerType: e });
}
var w2 = ue("ZodDefault", (e, n) => {
	(BM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => gz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function E2(e, n) {
	return new w2({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : cE(n);
		},
	});
}
var _2 = ue("ZodPrefault", (e, n) => {
	(PM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => vz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function C2(e, n) {
	return new _2({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : cE(n);
		},
	});
}
var JE = ue("ZodNonOptional", (e, n) => {
	($M.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => mz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function T2(e, n) {
	return new JE({ type: "nonoptional", innerType: e, ...ze(n) });
}
var x2 = ue("ZodCatch", (e, n) => {
	(HM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => yz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function O2(e, n) {
	return new x2({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : kR(n) });
}
var A2 = ue("ZodPipe", (e, n) => {
	(ZM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => pz(e, i, o, u)),
		(e.in = n.in),
		(e.out = n.out));
});
function bS(e, n) {
	return new A2({ type: "pipe", in: e, out: n });
}
var R2 = ue("ZodReadonly", (e, n) => {
	(FM.init(e, n),
		Ht.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => bz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function N2(e) {
	return new R2({ type: "readonly", innerType: e });
}
var M2 = ue("ZodCustom", (e, n) => {
	(QM.init(e, n), Ht.init(e, n), (e._zod.processJSONSchema = (i, o, u) => sz(e, i, o, u)));
});
function D2(e, n = {}) {
	return QD(M2, e, n);
}
function z2(e, n) {
	return YD(e, n);
}
function I2(e) {
	const n = new Ww("https://exuberant-hippopotamus-790.convex.cloud", { authRefreshTokenLeewaySeconds: 15 });
	let i = { phase: "connecting", message: null, deadline: 0, refreshing: !1 };
	const o = new Set();
	let u = null,
		l = null,
		f = null,
		h = null,
		m = null,
		g = 0,
		p = !1,
		b = !1;
	function y(x) {
		if (!p) {
			i = { ...i, ...x };
			for (const j of o) j();
		}
	}
	function w(x) {
		((b = x),
			x && performance.now() < i.deadline
				? y({ phase: "ready", message: null })
				: !l &&
					i.phase !== "denied" &&
					y({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }));
	}
	function E() {
		p ||
			l ||
			((u = null), m && clearTimeout(m), (m = null), y({ phase: "connecting", message: null }), n.setAuth(T, w));
	}
	function T(x) {
		return !x.forceRefreshToken && u && performance.now() < i.deadline
			? Promise.resolve(u)
			: l ||
					(y({ refreshing: !0 }),
					(l = (async () => {
						const j = performance.now();
						f = new AbortController();
						const M = setTimeout(() => f?.abort(), 25e3);
						try {
							const A = await e.getToken(),
								N = "https://exuberant-hippopotamus-790.convex.site/auth/lease",
								D = {
									method: "POST",
									redirect: "error",
									headers: { "Content-Type": "application/json" },
									signal: f.signal,
								};
							let z = await fetch(N, { ...D, body: JSON.stringify({ pressToken: A }) });
							if (z.status === 401) {
								const re = await e.refreshToken();
								z = await fetch(N, { ...D, body: JSON.stringify({ pressToken: re }) });
							}
							const O = await z.json(),
								U = f2({ jwt: jz(), expiresAt: mS(), validForMs: mS().min(0).max(3e4) }).safeParse(O);
							if (!z.ok || !U.success) {
								const re = z.status === 401 || z.status === 403;
								throw (
									y({
										phase: re ? "denied" : "unavailable",
										message: re
											? "Bonobo Senate no longer allows this Chitchat session."
											: "Chitchat is reconnecting. Your draft is kept.",
									}),
									new Error("Chitchat lease was refused")
								);
							}
							const H = j + U.data.validForMs;
							if (H <= performance.now()) throw new Error("Chitchat lease expired in transit");
							return (
								(u = U.data.jwt),
								(g = 0),
								h && clearTimeout(h),
								(h = setTimeout(
									() => {
										((u = null),
											y({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
											l || ((b = !1), n.clearAuth(), E()));
									},
									Math.max(0, H - performance.now()),
								)),
								y({ phase: b ? "ready" : "connecting", deadline: H, message: null }),
								u
							);
						} catch {
							return (
								(u = null),
								i.phase !== "denied" &&
									y({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
								!p && i.phase !== "denied" && ((g += 1), (m = setTimeout(E, Math.min(3e4, 2e3 * 2 ** Math.min(g, 4))))),
								null
							);
						} finally {
							(clearTimeout(M), (f = null), (l = null), y({ refreshing: !1 }));
						}
					})()),
					l);
	}
	return {
		convex: n,
		start: () => n.setAuth(T, w),
		retry: E,
		getSnapshot: () => i,
		subscribe: (x) => (
			o.add(x),
			() => {
				o.delete(x);
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
var WE = (0, _.createContext)(null);
function j2(e) {
	const [n] = (0, _.useState)(() => I2(e.client));
	return (
		(0, _.useEffect)(() => {
			n.start();
			const i = () => {
				n.getSnapshot().phase !== "ready" && n.retry();
			};
			return (
				window.addEventListener("online", i),
				window.addEventListener("focus", i),
				() => {
					(window.removeEventListener("online", i), window.removeEventListener("focus", i), n.close());
				}
			);
		}, [n]),
		(0, S.jsx)(WE.Provider, { value: n, children: (0, S.jsx)(IA, { client: n.convex, children: e.children }) })
	);
}
function vr() {
	const e = (0, _.useContext)(WE);
	if (!e) throw new Error("Chitchat needs its session provider");
	const n = (0, _.useSyncExternalStore)(e.subscribe, e.getSnapshot),
		i = jA(),
		o = n.phase === "ready" && performance.now() < n.deadline,
		u = Bo(De.sessions.current, o ? {} : "skip"),
		l = Bo(De.sessions.status, o ? {} : "skip"),
		[f, h] = (0, _.useState)(u);
	(u && f !== u && h(u), (l === "denied" || n.phase === "denied") && f !== void 0 && h(void 0));
	const m = o && l === "refresh_required";
	return {
		member: m ? f : u,
		ready: o && l === "ready" && u !== null && u !== void 0,
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
function e_(e) {
	const n = vr(),
		i = zr(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		o = pt(n, De.members.list, { paginationOpts: { numItems: 100, cursor: i.cursor } });
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
												aE(u.displayName),
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
function SS(e) {
	const n = Va(),
		i = vr(),
		o = (0, _.useId)(),
		u = (0, _.useId)(),
		l = (0, _.useId)(),
		f = (0, _.useId)(),
		h = pt(i, De.channels.permissions, e.channel ? { channelId: e.channel._id } : "skip"),
		[m, g] = (0, _.useState)(e.channel?.name ?? ""),
		[p, b] = (0, _.useState)(e.channel?.topic ?? ""),
		[y, w] = (0, _.useState)(!1),
		[E, T] = (0, _.useState)([]),
		[x, j] = (0, _.useState)(null),
		[M, A] = (0, _.useState)(!1),
		[N, D] = (0, _.useState)(null),
		z = M || x !== null,
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
			const U =
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
			(j(U), A(!0), D(null));
			try {
				const H =
					U.kind === "create"
						? await n.mutation(De.channels.create, U.args)
						: await n.mutation(De.channels.update, U.args);
				if (H._nay) {
					(j(null), D(H._nay.message));
					return;
				}
				H._yay.kind === "channel" && e.onSaved(H._yay.channelId);
			} catch {
				D("The save may have reached Chitchat. Retry to check the same request.");
			} finally {
				A(!1);
			}
		};
	return (0, S.jsxs)(Xo, {
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
				onSubmit: (U) => {
					(U.preventDefault(), O());
				},
				onKeyDown: (U) => {
					U.key === "Enter" && U.nativeEvent.isComposing && U.preventDefault();
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
								disabled: z,
								"aria-describedby": N ? f : void 0,
								onInput: (U) => g(U.currentTarget.value),
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
								disabled: z,
								onInput: (U) => b(U.currentTarget.value),
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
												disabled: z,
												onChange: (U) => w(U.currentTarget.checked),
											}),
											"Private channel",
										],
									}),
									y
										? (0, S.jsxs)(S.Fragment, {
												children: [
													(0, S.jsx)("p", { className: "field-note", children: rg }),
													(0, S.jsx)("p", {
														className: "field-note",
														children:
															"Tick one person for a direct message, or several for a group. Up to 50 people can join.",
													}),
													(0, S.jsx)(e_, {
														selfUserId: e.selfUserId,
														selected: E,
														disabled: z,
														onToggle: (U, H) => T((re) => (H ? [...re, U] : re.filter((R) => R !== U))),
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
function k2(e) {
	const n = Va(),
		i = vr(),
		o = (0, _.useId)(),
		[u, l] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, g] = (0, _.useState)(null),
		p = pt(i, De.channels.get, { channelId: e.channelId }),
		b = pt(i, De.channels.list_members, { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } }),
		y = pt(i, De.channels.permissions, { channelId: e.channelId }),
		w = pt(i, De.members.resolve, b ? { userIds: b.page.map((M) => M.hostUserId) } : "skip"),
		E = pt(i, De.channel_members.status, u ? { channelId: e.channelId, clientRequestId: u.clientRequestId } : "skip"),
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
					const A = await n.mutation(De.channel_members.change, M);
					A._nay && (l(null), g(A._nay.message));
				} catch {
					g("This change may have reached Chitchat. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		j = (M, A) => {
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
	return (0, S.jsxs)(Xo, {
		labelledBy: o,
		accessUnavailable: !i.refreshing && (!i.ready || y === null),
		onReconnect: i.retry,
		onClose: () => {
			f || e.onClose();
		},
		children: [
			(0, S.jsx)("h2", { id: o, className: "dialog-title", children: p ? `People in #${p.name}` : "Channel access" }),
			(0, S.jsx)("p", { className: "field-note", children: rg }),
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
																	(N === "read" || N === "write" || N === "manage") && j(M.hostUserId, N);
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
																onClick: () => j(M.hostUserId, null),
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
							(0, S.jsx)(e_, {
								selfUserId: e.selfUserId,
								selected: b.page.map((M) => M.hostUserId),
								disabled: f || u !== null,
								onToggle: (M, A) => j(M, A ? "write" : null),
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
function q2(e) {
	const n = Va(),
		i = vr(),
		o = (0, _.useId)(),
		[u] = (0, _.useState)(() => crypto.randomUUID()),
		[l, f] = (0, _.useState)(!1),
		[h, m] = (0, _.useState)(!1),
		[g, p] = (0, _.useState)(null),
		b = e.action === "leave" || e.action === "delete",
		y = pt(i, De.channels.permissions, { channelId: e.channel._id }),
		w = pt(i, De.channel_members.status, h && b ? { channelId: e.channel._id, clientRequestId: u } : "skip"),
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
							? await n.mutation(De.channels.archive, {
									channelId: e.channel._id,
									clientRequestId: u,
									expectedRevision: e.channel.revision,
									archived: e.action === "archive",
								})
							: e.action === "leave"
								? await n.mutation(De.channel_members.leave, {
										channelId: e.channel._id,
										clientRequestId: u,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									})
								: await n.mutation(De.channel_members.delete_channel, {
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
		j = e.action === "delete" || (e.action === "leave" && e.channel.memberCount === 1);
	return (0, S.jsxs)(Xo, {
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
							: j
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
						className: `button ${j || e.action === "archive" ? "button-danger" : "button-primary"}`,
						disabled: l || E || !(e.action === "leave" || h ? i.connected : i.canSend),
						onClick: () => void x(),
						children: l ? "Saving…" : h ? "Retry" : `${T} channel`,
					}),
				],
			}),
		],
	});
}
function t_(e) {
	const n = [];
	for (const i of e) n.push(...i);
	return n;
}
function n_(e) {
	return e.slice().reverse();
}
function Da(...e) {}
function uf(e, n) {
	return L2(e) ? e(U2(n) ? n() : n) : e;
}
function L2(e) {
	return typeof e == "function";
}
function U2(e) {
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
function Bm(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function V2(e, n) {
	const i = { ...e };
	for (const o of n) zn(i, o) && delete i[o];
	return i;
}
function B2(e, n) {
	const i = {};
	for (const o of n) zn(e, o) && (i[o] = e[o]);
	return i;
}
function r_(e) {
	return e;
}
function P2(e = Da) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function Zt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function i_(e) {
	return Object.keys(e);
}
function yg(e, ...n) {
	const i = typeof e == "function" ? e(...n) : e;
	return i == null ? !1 : !i;
}
function Pa(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function a_(e) {
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
var Xi = $2();
function $2() {
	return typeof window < "u" && !!window.document?.createElement;
}
function o_(e, n) {
	let i = e;
	for (; i;) {
		const o = Object.getOwnPropertyDescriptor(i, n);
		if (o?.get) return o.get;
		i = Object.getPrototypeOf(i);
	}
}
var wS = Xi ? o_(Object.getPrototypeOf(window.document), "nodeType") : void 0,
	ES = Xi ? o_(Object.getPrototypeOf(window.document), "activeElement") : void 0;
function Pm(e) {
	return e ? e.window === e : !1;
}
function _S(e) {
	if (!e) return !1;
	if (!wS) return e.nodeType === 9;
	try {
		return wS.call(e) === 9;
	} catch {
		return !1;
	}
}
function H2(e, n) {
	try {
		return e.document === n;
	} catch {
		return !1;
	}
}
function Ke(e) {
	if (!e) return document;
	if (_S(e)) return e;
	if (Pm(e)) return e.document;
	const n = e.ownerDocument;
	return _S(n) ? n : document;
}
function ar(e) {
	if (!e) return self;
	if (Pm(e)) return e;
	const n = Ke(e),
		{ defaultView: i } = n;
	return Pm(i) && H2(i, n) ? i : window;
}
function Zn(e, { frame: n = !0, activeDescendant: i = !1 } = {}) {
	const o = Ke(e),
		u = ES ? ES.call(o) : o.activeElement;
	if (!u?.nodeName) return null;
	if (n && gu(u) && u.contentDocument?.body) return Zn(u.contentDocument.body, { frame: n, activeDescendant: i });
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
function Lc(e) {
	return typeof e?.nodeType == "number";
}
function gu(e) {
	return e.tagName === "IFRAME";
}
function ja(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? Z2.indexOf(e.type) !== -1 : !1;
}
var Z2 = ["button", "color", "file", "image", "reset", "submit"];
function $m(e) {
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
function Uc(e) {
	return e.isContentEditable || yr(e);
}
function s_(e) {
	if (yr(e)) return e.value;
	if (e.isContentEditable) {
		const n = Ke(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function Vc(e) {
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
var F2 = ["dialog", "menu", "listbox", "tree", "grid"],
	CS = { menu: "menuitem", listbox: "option", tree: "treeitem" };
function Eu(e, n) {
	const i = e?.getAttribute("role");
	return i && F2.indexOf(i) !== -1 ? i : n;
}
function u_(e) {
	if (e != null && zn(CS, e)) return CS[e];
}
function l_(e, n) {
	const i = Eu(e);
	return typeof i != "string" ? n : (u_(i) ?? n);
}
function pg(e, n = {}) {
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
	return pg(e.parentElement, n) || l.scrollingElement || l.body;
}
function gm(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function Q2(e, n) {
	const i = e.map((u, l) => [l, u]);
	let o = !1;
	return (
		i.sort(([u, l], [f, h]) => {
			const m = n(l),
				g = n(h);
			return m === g || !m || !g ? 0 : Y2(m, g) ? (u > f && (o = !0), -1) : (u < f && (o = !0), 1);
		}),
		o ? i.map(([u, l]) => l) : e
	);
}
function Y2(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function c_() {
	return Xi && !!navigator.maxTouchPoints;
}
function cf() {
	return Xi ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function bg() {
	return Xi && cf() && /apple/i.test(navigator.vendor);
}
function K2() {
	return Xi && /firefox\//i.test(navigator.userAgent);
}
function G2() {
	return Xi && navigator.platform.startsWith("Mac") && !c_();
}
function X2(e) {
	const { currentTarget: n, target: i } = e;
	return n ? (Lc(i) ? !ht(n, i) : !0) : !1;
}
function cn(e) {
	return e.target === e.currentTarget;
}
function f_(e) {
	if (!Mn(e)) return !1;
	const n = e,
		i = n.tagName.toLowerCase();
	return i === "a" || (i === "button" && n.type === "submit") || (i === "input" && n.type === "submit");
}
function d_(e) {
	const n = cf();
	return (n && !e.metaKey) || (!n && !e.ctrlKey) ? !1 : f_(e.currentTarget);
}
function h_(e) {
	return e.altKey ? f_(e.currentTarget) : !1;
}
function J2(e, n, i) {
	const { Event: o } = ar(e),
		u = new o(n, i);
	return e.dispatchEvent(u);
}
function Lo(e, n) {
	const { FocusEvent: i } = ar(e),
		o = new i("blur", n),
		u = e.dispatchEvent(o),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new i("focusout", l)), u);
}
var W2 = {
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
function eI(e, n) {
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
				if (!zn(W2, f)) return Reflect.get(i, f);
			},
		},
	);
}
function TS(e, n) {
	const i = ar(e),
		o = new (i.PointerEvent ?? i.MouseEvent)("click", eI(i, n));
	return e.dispatchEvent(o);
}
function Oa(e, n) {
	const i = n || e.currentTarget,
		o = e.relatedTarget;
	return !Lc(o) || !ht(i, o);
}
function tI(e) {
	return e.type === "input";
}
function Bc(e, n, i, o) {
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
function nI(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function ln(e) {
	return !(!e.matches(ff) || !$m(e) || e.closest("[inert]"));
}
function Qo(e) {
	if (!ln(e) || nI(e)) return !1;
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
			if (!gu(u)) return;
			const f = u.contentDocument?.body;
			f && o.splice(l, 1, ...df(f));
		}),
		o
	);
}
function rI(e, n) {
	const [i] = df(e, n);
	return i || null;
}
function Sg(e, n, i) {
	const o = Array.from(e.querySelectorAll(ff)).filter(Qo);
	return (
		n && Qo(e) && o.unshift(e),
		o.forEach((u, l) => {
			if (!gu(u)) return;
			const f = u.contentDocument?.body;
			if (!f) return;
			const h = Sg(f, !1, i);
			o.splice(l, 1, ...h);
		}),
		!o.length && i ? df(e) : o
	);
}
function Hm(e, n, i) {
	if (n && Qo(e)) {
		if (!gu(e)) return e;
		const u = e.contentDocument?.body;
		if (!u) return e;
		const l = Hm(u, !1, i);
		if (l) return l;
	}
	const o = e.querySelectorAll(ff);
	for (const u of o)
		if (Qo(u)) {
			if (gu(u)) {
				const l = u.contentDocument?.body;
				if (!l) return u;
				const f = Hm(l, !1, i);
				if (f) return f;
				continue;
			}
			return u;
		}
	return i ? rI(e) : null;
}
function m_({ container: e, includeContainer: n, reverse: i, fallbackToEdge: o, fallbackToFocusable: u }) {
	const l = Zn(e),
		f = df(e, n);
	i && f.reverse();
	const h = f.indexOf(l),
		m = f.slice(h + 1);
	return m.find(Qo) || (o ? f.find(Qo) : null) || (u ? m[0] : null) || null;
}
function iI(e, n, i, o) {
	return m_({ container: e, includeContainer: n, fallbackToEdge: i, fallbackToFocusable: o });
}
function vm(e, n) {
	return iI(document.body, !1, e, n);
}
function aI(e, n, i, o) {
	return m_({ container: e, includeContainer: n, reverse: !0, fallbackToEdge: i, fallbackToFocusable: o });
}
function xS(e, n) {
	return aI(document.body, !1, e, n);
}
function ts(e) {
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
function oI(e) {
	const n = e.getAttribute("tabindex") ?? "";
	(e.setAttribute("data-tabindex", n), e.setAttribute("tabindex", "-1"));
}
function sI(e, n) {
	const i = Sg(e, n);
	for (const o of i) oI(o);
}
function uI(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		i = (o) => {
			const u = o.getAttribute("data-tabindex");
			(o.removeAttribute("data-tabindex"), u ? o.setAttribute("tabindex", u) : o.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && i(e);
	for (const o of n) i(o);
}
function g_(e) {
	return async () => {
		const n = await e?.();
		return g_(async () => (await n?.(), e));
	};
}
var aL = lI();
function lI({ limit: e = 100 } = {}) {
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
				n[y] = g_(async () => {
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
var v_ = Symbol("accessibleWhenDisabled");
function cI(e) {
	return e.accessibleWhenDisabled ?? e.onLoadedMetadataCapture?.[v_];
}
var wg = "data-truly-disabled";
function fI(e) {
	return e.getAttribute(wg) === "true";
}
function dI(e) {
	const n = e.getAttribute(wg);
	if (n === "true") return !0;
	if (n === "false") return !1;
}
function y_(e) {
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
function hI(e) {
	return e.nodeType === e.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
function ka(e) {
	const n = e?.getRootNode();
	return n && hI(n) && n.activeElement ? n.activeElement : Zn(e);
}
function p_(e) {
	return ts(e) || ka(e) === e;
}
function b_(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !n.length ? !0 : n.some((o) => i === o);
}
var OS = new WeakMap();
function mI(e, n, i) {
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
function _u(e, n, i) {
	let o = OS.get(e);
	o || ((o = new Map()), OS.set(e, o));
	const u = o.get(n) ?? [],
		l = { cleanup: i(), disposed: !1 };
	return (
		u.length || o.set(n, u),
		u.push(l),
		() => {
			u.includes(l) && ((l.disposed = !0), mI(o, n, u));
		}
	);
}
function Eg(e, n, i) {
	return _u(e, n, () => {
		const u = e.getAttribute(n);
		return (
			e.setAttribute(n, i),
			() => {
				u == null ? e.removeAttribute(n) : e.setAttribute(n, u);
			}
		);
	});
}
function qa(e, n, i) {
	return _u(e, n, () => {
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
function Oc(e, n) {
	return e
		? _u(e, "style", () => {
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
function pc(e, n, i) {
	return e
		? _u(e, n, () => {
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
function AS(e, n) {
	if (!n) return !1;
	if (n.get(e)?.has("ancestorMark")) return !0;
	do {
		if (n.get(e)?.has("mark")) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
var Ac = new WeakMap();
function Yo(e = "", n = "outside") {
	return `__ariakit-dialog-${n}${e ? `-${e}` : ""}`;
}
function gI(e, n = "") {
	return en(qa(e, Yo(), !0), qa(e, Yo(n), !0));
}
function S_(e, n = "") {
	return en(qa(e, Yo("", "ancestor"), !0), qa(e, Yo(n, "ancestor"), !0));
}
function vI(e, n) {
	const i = new WeakSet();
	Ac.set(e, i);
	for (const o of n) o && i.add(o);
	return () => {
		Ac.get(e) === i && Ac.delete(e);
	};
}
function _g(e, n) {
	const i = Ac.get(n);
	if (!i) return !1;
	do {
		if (i.has(e)) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function hf(e, n) {
	const i = Yo(n, "ancestor");
	if (e[i]) return !0;
	const o = Yo(n);
	do {
		if (e[o]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function w_(e) {
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
function E_(e) {
	return (e.previousCleanups && Cg(e.previousCleanups), e.cleanups);
}
function __({ walk: e, element: n, id: i, ids: o }) {
	b_(n, ...o) || mf({ walk: e, element: n, kind: "mark", setup: () => gI(n, i) });
}
function C_({ walk: e, ancestor: n, element: i, id: o }) {
	(i.hasAttribute("data-dialog") && i.id !== o) ||
		mf({ walk: e, element: n, kind: "ancestorMark", setup: () => S_(n, o) });
}
function Cg(e) {
	for (const n of e.values()) for (const i of n.values()) i();
	e.clear();
}
var T_ = (0, _.createContext)(!0);
function Pc(e, n) {
	if (typeof e == "function") {
		const i = e(n);
		if (typeof i == "function") return i;
	} else e && (e.current = n);
}
function yI(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function pI(e) {
	return yI(e) ? { ...e.props }.ref || e.ref : null;
}
function bI(e, n) {
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
var Tg = { ..._ },
	x_ = Tg.useId,
	oL = Tg.useDeferredValue,
	SI = Tg.useInsertionEffect ?? ((e) => e()),
	Ne = Xi ? _.useLayoutEffect : _.useEffect;
function wI(e) {
	const [n] = (0, _.useState)(e);
	return n;
}
function vu(e) {
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
		SI(() => {
			n.current = e;
		}),
		(0, _.useCallback)((...i) => n.current?.(...i), [])
	);
}
function O_(e) {
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
function It(...e) {
	return (0, _.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				const i = [];
				for (const o of e) {
					if (!o) continue;
					const u = Pc(o, n);
					i.push({ ref: o, cleanup: typeof u == "function" ? u : void 0 });
				}
				if (i.some((o) => o.cleanup))
					return () => {
						for (const { ref: o, cleanup: u } of i) u ? u() : Pc(o, null);
					};
			};
	}, e);
}
function EI(e) {
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
function _I(e) {
	const n = x_();
	return e || n;
}
var CI = x_ ? _I : EI;
function Ur(e) {
	return CI(e);
}
function TI(e, n) {
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
function RS(e, n, i) {
	const o = wI(i),
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
function ns(e, n) {
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
function xI(e, n) {
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
function A_() {
	return (0, _.useReducer)(() => [], []);
}
function st(e) {
	return Ae(typeof e == "function" ? e : () => e);
}
function Pt(e, n, i = []) {
	const o = (0, _.useCallback)((u) => (e.wrapElement && (u = e.wrapElement(u)), n(u)), [...i, e.wrapElement]);
	return { ...e, wrapElement: o };
}
function xg(e = !1, n) {
	const [i, o] = (0, _.useState)(null);
	return { portalRef: It(o, n), portalNode: i, domReady: !e || i };
}
function Og(e, n, i) {
	const o = e.onLoadedMetadataCapture,
		u = (0, _.useMemo)(() => Object.assign(Da.bind(null), o, ...(i !== void 0 ? [{ [n]: i }] : [])), [o, n, i]);
	return [o?.[n], { onLoadedMetadataCapture: u }];
}
var NS = !1;
function Ag() {
	return (
		(0, _.useEffect)(() => {
			NS ||
				(Wt("mousemove", AI, !0),
				Wt("mousedown", bc, !0),
				Wt("mouseup", bc, !0),
				Wt("keydown", bc, !0),
				Wt("scroll", bc, !0),
				(NS = !0));
		}, []),
		Ae(() => Rg)
	);
}
var Rg = !1,
	MS = 0,
	DS = 0;
function OI(e) {
	const n = e.movementX || e.screenX - MS,
		i = e.movementY || e.screenY - DS;
	return ((MS = e.screenX), (DS = e.screenY), n || i || !1);
}
function AI(e) {
	OI(e) && (Rg = !0);
}
function bc() {
	Rg = !1;
}
function Fe(e) {
	const n = _.forwardRef((i, o) => e(lf({ ...i, ref: o })));
	return ((n.displayName = e.displayName || e.name), n);
}
function Cu(e, n) {
	return _.memo(e, n);
}
function Je(e, n) {
	const { wrapElement: i, render: o, ...u } = n,
		l = It(n.ref, pI(o));
	let f;
	if (_.isValidElement(o)) {
		const h = { ...o.props, ref: l };
		f = _.cloneElement(o, bI(u, h));
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
var RI = "div",
	R_ = bg(),
	N_ = 1,
	M_ = 2,
	zS = 3,
	NI = [
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
function MI(e) {
	const { tagName: n, readOnly: i, type: o } = e;
	return (n === "TEXTAREA" && !i) || (n === "SELECT" && !i)
		? !0
		: n === "INPUT" && !i
			? NI.includes(o)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function DI(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function zI(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function II(e) {
	let n = 0;
	return (DI(e) && (n |= N_), zI(e) && (n |= M_), n);
}
function jI(e) {
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
function kI({
	focusable: e,
	trulyDisabled: n,
	nativeTabbable: i,
	supportsDisabled: o,
	safariTabIndex: u,
	tabIndexProp: l,
}) {
	return e ? (n ? (i && !o ? -1 : void 0) : i ? (u && l == null ? 0 : l) : (l ?? 0)) : l;
}
function Sc(e, n) {
	return Ae((i) => {
		(e?.(i), !i.defaultPrevented && n && (i.stopPropagation(), i.preventDefault()));
	});
}
var IS = !1,
	$c = !0;
function qI(e) {
	const n = e.target;
	Mn(n) && !n.hasAttribute("data-focus-visible") && ($c = !1);
}
function LI(e) {
	if (y_(e.key)) {
		$c = !0;
		return;
	}
	e.metaKey || e.ctrlKey || (e.altKey && (!R_ || e.key !== "Tab")) || ($c = !0);
}
var Tu = We(function ({ focusable: n = !0, accessibleWhenDisabled: i, autoFocus: o, onFocusVisible: u, ...l }) {
		const f = (0, _.useRef)(null),
			[h, m] = Og(l, v_, i);
		((i ??= h),
			(0, _.useEffect)(() => {
				n && (IS || (Wt("mousedown", qI, !0), Wt("keydown", LI, !0), (IS = !0)));
			}, [n]));
		const g = n && Pa(l),
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
				const se = new IntersectionObserver(() => {
					ln(K) || ((w.current = !1), y(!1));
				});
				return (se.observe(K), () => se.disconnect());
			}, [n, b]),
			(0, _.useEffect)(() => () => E.current?.(), []));
		const x = Sc(l.onKeyPressCapture, g),
			j = Sc(l.onMouseDownCapture, g),
			M = Sc(l.onClickCapture, g),
			A = Sc(l.onAuxClickCapture, g),
			N = (K, se) => {
				if ((se && (K.currentTarget = se), !n)) return;
				const xe = K.currentTarget;
				if (xe && p_(xe) && (u?.(K), !K.defaultPrevented)) {
					if (((xe.dataset.focusVisible = "true"), (w.current = !0), jI(xe))) {
						if ((E.current?.(), (E.current = null), typeof IntersectionObserver < "u")) {
							const ge = new IntersectionObserver(() => {
								ln(xe) || T(xe);
							});
							(ge.observe(xe), (E.current = () => ge.disconnect()));
						}
						return;
					}
					y(!0);
				}
			},
			D = l.onKeyDownCapture,
			z = Ae((K) => {
				if (
					(D?.(K),
					K.defaultPrevented || !n || b || w.current || ((K.metaKey || K.altKey || K.ctrlKey) && !y_(K.key)) || !cn(K))
				)
					return;
				const se = K.currentTarget;
				Bc(se, "focusout", () => N(K, se));
			}),
			O = l.onFocusCapture,
			U = Ae((K) => {
				if ((O?.(K), K.defaultPrevented || !n)) return;
				if (!cn(K)) {
					y(!1);
					return;
				}
				const se = K.currentTarget,
					xe = () => N(K, se);
				$c || MI(K.target) ? Bc(K.target, "focusout", xe) : y(!1);
			}),
			H = l.onBlur,
			re = Ae((K) => {
				(H?.(K), n && Oa(K) && (T(K.currentTarget), y(!1)));
			}),
			R = (0, _.useContext)(T_),
			q = Ae((K) => {
				n &&
					o &&
					K &&
					R &&
					queueMicrotask(() => {
						ts(K) || (ln(K) && K.focus());
					});
			}),
			[P, F] = (0, _.useState)(zS);
		Ne(() => {
			const K = f.current;
			if (!K) return;
			const se = II(K.tagName.toLowerCase());
			se !== zS && F(se);
		}, []);
		const Y = n && !!(P & N_),
			B = n && !!(P & M_),
			[te, ne] = (0, _.useState)(!1);
		R_ &&
			(0, _.useEffect)(() => {
				if (!n) return;
				const K = f.current;
				if (!K) return;
				const { type: se } = K,
					xe = K.tagName === "INPUT" && (se === "checkbox" || se === "radio");
				ne(ja(K) || xe);
			}, [n]);
		const L = l.style,
			ee = (0, _.useMemo)(() => (p ? { pointerEvents: "none", ...L } : L), [p, L]);
		return (
			(l = {
				"data-focus-visible": (n && b) || void 0,
				"data-autofocus": o || void 0,
				"aria-disabled": g || void 0,
				...l,
				...m,
				ref: It(f, q, l.ref),
				style: ee,
				tabIndex: kI({
					focusable: n,
					trulyDisabled: p,
					nativeTabbable: Y,
					supportsDisabled: B,
					safariTabIndex: te,
					tabIndexProp: l.tabIndex,
				}),
				disabled: B && p ? !0 : void 0,
				[wg]: g ? p : void 0,
				contentEditable: g ? void 0 : l.contentEditable,
				onKeyPressCapture: x,
				onClickCapture: M,
				onAuxClickCapture: A,
				onMouseDownCapture: j,
				onKeyDownCapture: z,
				onFocusCapture: U,
				onBlur: re,
			}),
			lf(l)
		);
	}),
	sL = Fe(function (n) {
		const i = Tu(n);
		return Je(RI, i);
	}),
	xu = Vr(),
	uL = xu.useContext,
	lL = xu.useScopedContext,
	Ng = xu.useProviderContext,
	UI = xu.ContextProvider,
	VI = xu.ScopedContextProvider,
	Ou = Vr([UI], [VI]),
	cL = Ou.useContext,
	fL = Ou.useScopedContext,
	Au = Ou.useProviderContext,
	BI = Ou.ContextProvider,
	Mg = Ou.ScopedContextProvider,
	D_ = (0, _.createContext)(void 0),
	PI = (0, _.createContext)(void 0),
	z_ = new WeakMap();
function $I(e, n, i) {
	const { KeyboardEvent: o } = ar(e),
		u = new o(n.type, i);
	return (z_.set(u, Zm(n)), e.dispatchEvent(u));
}
function Zm(e) {
	return z_.get(e) ?? e;
}
function $a(e, n) {
	const i = e.__unstableInternals;
	return (Zt(i, "Invalid store"), i[n]);
}
function I_(e, n) {
	if (!e) return !0;
	for (const i of e)
		if (n instanceof Set) {
			if (n.has(i)) return !0;
		} else if (su(i, n)) return !0;
	return !1;
}
function su(e, n) {
	return e === n || (e !== e && n !== n);
}
function j_(e, n, i, o) {
	let u;
	for (const l of i_(n)) su(n[l], i[l]) || (o !== void 0 && I_([l], o)) || ((u ??= { ...e }), (u[l] = n[l]));
	return u;
}
var HI = 100;
function ZI(e, n, i) {
	if (n)
		for (const o of n) {
			let u = e.get(o);
			(u || ((u = new Set()), e.set(o, u)), u.add(i));
		}
}
function FI(e, n, i) {
	if (e && n)
		for (const o of n) {
			const u = e.get(o);
			u && (u.delete(i), u.size || e.delete(o));
		}
}
function k_(e) {
	const n = new Set(),
		i = e.currentListener;
	if (!i) return n;
	for (const o of e.keyedListeners) if ((n.add(o), o === i)) return n;
	return (n.clear(), n.add(i), n);
}
function Hc(e) {
	e.notifiedListeners ??= k_(e);
}
function Dg(e, n) {
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
function ym(e, n, i) {
	for (const o of e)
		if (o.group === n && !o.recovering && !(i && !o.keyedListeners.has(i))) {
			Hc(o);
			for (const u of o.group.listeners) {
				if (u === o.currentListener) break;
				Dg(o, u) && o.notifiedListeners?.add(u);
			}
		}
}
function QI(e, n, i) {
	for (const o of e) o.group === n && (o.recovering || (Dg(o, i) && (Hc(o), o.notifiedListeners?.add(i))));
}
function YI({ fastPathFrames: e, group: n, keys: i, listener: o }) {
	const u = n.listeners.has(o);
	for (const l of e)
		l.group === n &&
			(l.recovering ||
				(i.includes(l.updatedKey) &&
					(Dg(l, o) ? (Hc(l), l.notifiedListeners?.add(o)) : u && (Hc(l), (l.recoverToLive = !0)))));
}
function KI(e, n, i) {
	for (const o of e) o.group === n && o.notifiedListeners?.delete(i);
}
function GI({ fastPathFrames: e, group: n, keys: i, listener: o }) {
	for (const u of e) u.group === n && (u.recovering || (i.includes(u.updatedKey) && u.keyedListeners.add(o)));
}
function XI(e, n) {
	if (!e.disposables.size) return;
	const i = e.disposables.get(n);
	i && (e.disposables.delete(n), i());
}
function q_(e, n, i) {
	const o = e.disposables.get(n);
	if (!o) {
		e.disposables.set(n, i);
		return;
	}
	e.disposables.set(n, () => {
		(o(), i());
	});
}
function L_(e, n, i, o, u, l) {
	if (e.suspendCounts?.has(n)) return;
	const { disposables: f } = e,
		h = f.size ? f.get(n) : void 0;
	if (h) {
		f.delete(n);
		const g = i;
		(h(), (i = u?.() ?? i), i !== g && (o = j_(o, i, g, l) ?? o));
	}
	const m = n(i, o);
	m && q_(e, n, m);
}
function jS({ group: e, getState: n, prevState: i, updatedKey: o, notifiedListeners: u }) {
	const l = e.allKeysListeners;
	for (const f of e.listeners)
		u?.has(f) || (!l?.has(f) && !I_(e.listenerKeys.get(f), o)) || (u?.add(f), L_(e, f, n(), i, n, o));
}
function or(e, ...n) {
	let i = e,
		o = i,
		u = Da,
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
			const F = i_(i),
				Y = [];
			for (const ne of n) {
				const L = ne?.getState?.();
				if (!L) continue;
				const ee = F.filter((K) => zn(L, K));
				if (ee.length) {
					if (n.length === 1 || ee.length === F.length) {
						for (const K of ee)
							Y.push(
								nt(ne, [K], (se) => {
									H(K, se[K], !0);
								}),
							);
						continue;
					}
					Y.push(
						di(ne, ee, (K, se) => {
							for (const xe of ee) K[xe] !== se[xe] && H(xe, K[xe], !0);
						}),
					);
					for (const K of ee) {
						const se = ne?.getState?.();
						se && H(K, se[K], !0);
					}
				}
			}
			const B = [];
			for (const ne of g) B.push(ne());
			const te = n.map(zg);
			return ((u = en(...Y, ...B, ...te)), P);
		},
		E = (R, q, P) => {
			P !== void 0 && (P ? FI(R.listenersByKey, P, q) : R.allKeysListeners?.delete(q));
		},
		T = [],
		x = (R, q, P = p) => {
			const F = R ? [...R] : null,
				Y = P.listeners.has(q);
			return (
				Y || KI(T, P, q),
				F ? YI({ fastPathFrames: T, group: P, keys: F, listener: q }) : (Y && ym(T, P), QI(T, P, q)),
				Y && (ym(T, P, q), E(P, q, P.listenerKeys.get(q))),
				P.listeners.add(q),
				F
					? ((P.listenersByKey ??= new Map()),
						ZI(P.listenersByKey, F, q),
						GI({ fastPathFrames: T, group: P, keys: F, listener: q }))
					: ((P.allKeysListeners ??= new Set()), P.allKeysListeners.add(q)),
				P.listenerKeys.set(q, F),
				() => {
					const B = P.disposables.get(q);
					(P.disposables.delete(q), ym(T, P, q));
					const te = P.listenerKeys.get(q);
					(E(P, q, F), te !== F && E(P, q, te), P.listenerKeys.delete(q), P.listeners.delete(q), B?.());
				}
			);
		},
		j = (R, q) => x(R, q),
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
				(XI(R, q), i !== B && (Y = j_(P, i, B)));
				const te = q(i, Y ?? P);
				te && q_(R, q, te);
			} finally {
				if (F) {
					const B = R.suspendCounts,
						te = B?.get(q);
					(te && te > 1 ? B?.set(q, te - 1) : B?.delete(q), B?.size || delete R.suspendCounts);
				}
			}
		},
		A = (R, q) => (M(p, q, i), x(R, q)),
		N = (R, q) => (!b.listeners.size && !f && (o = i), M(b, q, o), x(R, q, b)),
		D = (R) => or(B2(i, R), re),
		z = (R) => or(V2(i, R), re),
		O = () => i,
		U = (R, q, P) => {
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
							L_(R, B, i, q, O, P),
							!R.allKeysListeners?.size && !Y.recoverToLive)
						)
							continue;
						const te = Y.notifiedListeners ?? k_(Y);
						((Y.notifiedListeners = te),
							(Y.recovering = !0),
							jS({ group: R, getState: O, prevState: q, updatedKey: P, notifiedListeners: te }));
						return;
					}
				} finally {
					T.pop();
				}
				return;
			}
			jS({ group: R, getState: O, prevState: q, updatedKey: P });
		},
		H = (R, q, P = !1) => {
			if (!zn(i, R)) return;
			const F = i[R],
				Y = uf(q, () => F);
			if (su(Y, F)) return;
			const B = f;
			f = !0;
			const te = i,
				ne = { ...i, [R]: Y };
			i = ne;
			let L = !1;
			try {
				if (!P && n.length) {
					for (const ee of n)
						if ((ee?.setState?.(R, Y), !su(i[R], Y))) {
							L = !0;
							break;
						}
					if (L) {
						let ee = 0;
						for (; ee < HI; ee += 1) {
							let K = !1;
							for (const se of n) {
								const xe = i[R];
								(se?.setState?.(R, xe), su(i[R], xe) || (K = !0));
							}
							if (!K) break;
						}
					}
				}
				if (!L) {
					const ee = i === ne ? te : { ...i, [R]: te[R] };
					U(p, ee, R);
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
						const se = o;
						(U(b, se, K), o === se && (o = ee));
					})));
		},
		re = {
			getState: O,
			setState: H,
			__unstableInternals: { setup: y, init: w, subscribe: j, sync: A, batch: N, pick: D, omit: z },
		};
	return re;
}
function yt(e, ...n) {
	if (e) return $a(e, "setup")(...n);
}
function zg(e, ...n) {
	if (e) return $a(e, "init")(...n);
}
function di(e, ...n) {
	if (e) return $a(e, "subscribe")(...n);
}
function nt(e, ...n) {
	if (e) return $a(e, "sync")(...n);
}
function yu(e, ...n) {
	if (e) return $a(e, "batch")(...n);
}
function Ig(e, ...n) {
	if (e) return $a(e, "omit")(...n);
}
function U_(e, ...n) {
	if (e) return $a(e, "pick")(...n);
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
var JI = sr((e) => {
		var n = ef();
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
				j = T[1];
			return (
				f(
					function () {
						((x.value = E), (x.getSnapshot = w), g(x) && j({ inst: x }));
					},
					[y, E, w],
				),
				l(
					function () {
						return (
							g(x) && j({ inst: x }),
							y(function () {
								g(x) && j({ inst: x });
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
	WI = sr((e, n) => {
		n.exports = JI();
	}),
	V_ = WI(),
	Zc = () => () => {};
function Fc(e) {
	return Array.isArray(e);
}
function Fm(e, n) {
	return e === n || (e !== e && n !== n);
}
function ej(e, n) {
	if (e?.length !== n.length) return !1;
	for (let i = 0; i < e.length; i += 1) {
		const o = e[i];
		if (!Fm(o, n[i])) return !1;
	}
	return !0;
}
function B_(e) {
	const [n, i] = _.useState(() => (e === null ? null : [...e]));
	if (e === null) return (n !== null && i(null), null);
	if (ej(n, e)) return n;
	const o = [...e];
	return (i(o), o);
}
function pe(e, n = r_, i) {
	const o = B_(Fc(n) ? n : typeof n == "function" ? null : [n]),
		u = _.useCallback((f) => (!e || o?.length === 0 ? Zc() : di(e, o, f)), [e, o]),
		l = () => {
			const f = e?.getState();
			if (Fc(n)) return i?.(f);
			if (typeof n == "function") return n(f);
			if (f && zn(f, n)) return f[n];
		};
	return (0, V_.useSyncExternalStore)(u, l, l);
}
function tj(e, n) {
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
function Qc(e, n, i) {
	const o = Fc(n) ? (i ?? {}) : n,
		u = Fc(n) ? n : void 0,
		l = _.useRef({}),
		f = B_(tj(o, u)),
		h = _.useCallback((g) => (!e || f?.length === 0 ? Zc() : di(e, f, g)), [e, f]),
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
	return (0, V_.useSyncExternalStore)(h, m, m);
}
function Dt(e, n, i, o) {
	const u = zn(n, i) ? n[i] : void 0,
		l = o ? n[o] : void 0,
		f = !!l,
		h = vu({ value: u, setValue: l });
	(Ne(() => {
		if (f)
			return di(e, [i], (m, g) => {
				const { value: p, setValue: b } = h.current;
				b && (Fm(m[i], g[i]) || Fm(m[i], p) || b(m[i]));
			});
	}, [e, i, f, h]),
		Ne(() => {
			if (u !== void 0)
				return (
					e.setState(i, u),
					yu(e, [i], () => {
						u !== void 0 && e.setState(i, u);
					})
				);
		}));
}
function vf(e, n) {
	const [i, o] = _.useState(() => e(n));
	Ne(() => zg(i), [i]);
	const u = _.useCallback((l) => pe(i, l), [i]);
	return [
		_.useMemo(() => ({ ...i, useState: u }), [i, u]),
		Ae(() => {
			o((l) => e({ ...n, ...l.getState() }));
		}),
	];
}
var nj = "div";
function kS(e, n) {
	const i = setTimeout(n, e);
	return () => clearTimeout(i);
}
function qS(e) {
	const n = e?.trim() || "0s",
		i = n.endsWith("ms") ? 1 : 1e3,
		o = Number.parseFloat(n) * i;
	return Number.isNaN(o) ? 0 : o;
}
function LS(e, n, i) {
	const o = e.split(","),
		u = n.split(","),
		l = i.split(",");
	let f = 0;
	for (const [h, m] of o.entries()) {
		if (m.trim() === "none") continue;
		const g = qS(u[h % u.length]),
			p = qS(l[h % l.length]);
		f = Math.max(f, g + p);
	}
	return f;
}
function rj(e) {
	const {
		transitionProperty: n,
		transitionDuration: i,
		transitionDelay: o,
		animationName: u,
		animationDuration: l,
		animationDelay: f,
	} = getComputedStyle(e);
	return Math.max(LS(n, o, i), LS(u, f, l));
}
function Ru(e, n, i) {
	return !i && n !== !1 && (!e || !!n);
}
var jg = We(function ({ store: n, alwaysVisible: i, unstable_otherElementRef: o, ...u }) {
		const l = Ng();
		((n = n || l), Zt(n, !1));
		const f = (0, _.useRef)(null),
			h = Ur(u.id),
			[m, g] = (0, _.useState)(null),
			{
				open: p,
				mounted: b,
				animated: y,
				contentElement: w,
			} = Qc(n, { open: "open", mounted: "mounted", animated: "animated", contentElement: "contentElement" }),
			E = pe(n.disclosure, "contentElement"),
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
				return P2(() => {
					g(p ? "enter" : b ? "leave" : null);
				});
			}, [y, w, p, b]),
			Ne(() => {
				if (!n || !y || !m || !w) return;
				const A = () => n?.setState("animating", !1),
					N = () => (0, du.flushSync)(A);
				if ((m === "leave" && p) || (m === "enter" && !p)) return;
				if (typeof y == "number") return kS(y, N);
				const D = [w];
				E && D.push(E);
				const z = o?.current;
				z && D.push(z);
				const O = Math.max(...D.map(rj));
				if (!O) {
					(m === "enter" && n.setState("animated", !1), A());
					return;
				}
				return kS(Math.max(O - 1e3 / 60, 0), N);
			}, [n, y, w, E, o, p, m]),
			(u = Pt(u, (A) => (0, S.jsx)(Mg, { value: n, children: A }), [n])));
		const x = Ru(b, u.hidden, i),
			j = u.style,
			M = (0, _.useMemo)(() => (x ? { ...j, display: "none" } : j), [x, j]);
		return (
			(u = {
				"data-open": p || void 0,
				"data-enter": m === "enter" || void 0,
				"data-leave": m === "leave" || void 0,
				hidden: x,
				...u,
				id: h,
				ref: It(h ? n.setContentElement : null, f, u.ref),
				style: M,
			}),
			lf(u)
		);
	}),
	ij = Fe(function (n) {
		const i = jg(n);
		return Je(nj, i);
	}),
	dL = Fe(function ({ unmountOnHide: n, ...i }) {
		const o = Ng(),
			u = i.store || o;
		return pe(u, ["mounted"], (l) => !n || l?.mounted) === !1 ? null : (0, S.jsx)(ij, { ...i });
	}),
	aj = "div",
	P_ = We(function ({ autoFocusOnShow: n = !0, ...i }) {
		return ((i = Pt(i, (o) => (0, S.jsx)(T_.Provider, { value: n, children: o }), [n])), i);
	}),
	hL = Fe(function (n) {
		const i = P_(n);
		return Je(aj, i);
	}),
	US = (0, _.createContext)(0);
function oj({ level: e, children: n }) {
	const i = (0, _.useContext)(US),
		o = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, S.jsx)(US.Provider, { value: o, children: n });
}
var sj = "span";
function $_(e) {
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
var H_ = We(function (n) {
		return ((n = { ...n, style: $_(n.style) }), n);
	}),
	mL = Fe(function (n) {
		const i = H_(n);
		return Je(sj, i);
	}),
	uj = "span",
	lj = We(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = H_(n)),
			n
		);
	}),
	wc = Fe(function (n) {
		const i = lj(n);
		return Je(uj, i);
	}),
	VS = (0, _.createContext)(null),
	cj = "div";
function Z_(e, n) {
	const i = Ke(e),
		o = n || i.body,
		{ fullscreenElement: u } = i,
		l = ar(e).HTMLElement;
	return !l || !(u instanceof l) || ht(u, o) ? o : n && !ht(n, u) ? n : u;
}
function fj(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : Ke(e).createElement("div");
}
function dj(e, n) {
	const i = Ke(e),
		o = () => {
			const u = Z_(e, n);
			e.parentElement !== u && (ht(e, u) || u.appendChild(e));
		};
	return (
		i.addEventListener("fullscreenchange", o),
		() => {
			i.removeEventListener("fullscreenchange", o);
		}
	);
}
function hj(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Bi(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
function BS(e, n) {
	return { ref: e, node: n, cleanup: Pc(e, n) };
}
function PS(e) {
	typeof e.cleanup == "function" ? e.cleanup() : Pc(e.ref, null);
}
var F_ = We(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: i,
		portalElement: o,
		portalRef: u,
		portal: l = !0,
		...f
	}) {
		const h = (0, _.useRef)(null),
			m = It(h, f.ref),
			g = (0, _.useContext)(VS),
			[p, b] = (0, _.useState)(null),
			[y, w] = (0, _.useState)(null),
			E = (0, _.useRef)(null),
			T = (0, _.useRef)(null),
			x = (0, _.useRef)(null),
			j = (0, _.useRef)(null),
			M = vu(u),
			A = (0, _.useRef)(null);
		return (
			Ne(() => {
				const N = h.current;
				if (!N || !l) {
					b(null);
					return;
				}
				const D = fj(N, o);
				if (!D) {
					b(null);
					return;
				}
				const z = D.isConnected;
				(z || Z_(N, g).appendChild(D),
					D.id || (D.id = N.id ? `portal/${N.id}` : hj()),
					b(D),
					(A.current = BS(M.current, D)));
				const O = o ? void 0 : dj(D, g);
				return () => {
					O?.();
					const U = A.current;
					(U && ((A.current = null), PS(U)), z || D.remove());
				};
			}, [l, o, g, M]),
			Ne(() => {
				const N = A.current;
				N && N.ref !== u && (PS(N), (A.current = BS(u, N.node)));
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
				const D = (z) => {
					if (!Oa(z)) return;
					const O = z.type === "focusin";
					if ((cancelAnimationFrame(N), O)) return uI(p);
					N = requestAnimationFrame(() => {
						sI(p, !0);
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
			(f = Pt(
				f,
				(N) => {
					if (((N = (0, S.jsx)(VS.Provider, { value: p || g, children: N })), !l)) return N;
					if (!p) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((N = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								(0, S.jsx)(wc, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (z) => {
										Oa(z, p) ? Bi(vm()) : Bi(E.current);
									},
								}),
							N,
							n &&
								(0, S.jsx)(wc, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (z) => {
										Oa(z, p) ? Bi(xS()) : Bi(j.current);
									},
								}),
						],
					})),
						(N = (0, du.createPortal)(N, p)));
					let D = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								(0, S.jsx)(wc, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (z) => {
										z.relatedTarget !== j.current && Oa(z, p) ? Bi(T.current) : Bi(xS());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": p.id, style: { position: "fixed" } }),
							n &&
								(0, S.jsx)(wc, {
									ref: j,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (z) => {
										if (Oa(z, p)) Bi(x.current);
										else {
											const O = vm();
											if (O === T.current) {
												requestAnimationFrame(() => vm()?.focus());
												return;
											}
											Bi(O);
										}
									},
								}),
						],
					});
					return (y && n && (D = (0, du.createPortal)(D, y)), (0, S.jsxs)(S.Fragment, { children: [D, N] }));
				},
				[p, g, l, f.id, n, y],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	gL = Fe(function (n) {
		const i = F_(n);
		return Je(cj, i);
	});
function kg(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function Q_(e) {
	return `__ariakit-dialog-snapshotAncestor-${e}`;
}
function Y_(e, n) {
	return K_(kg(e), n);
}
function mj(e, n) {
	return K_(Q_(e), n);
}
function K_(e, n) {
	const i = [];
	for (const o of n) i.push(qa(o, e, !0));
	return () => {
		for (const o of i) o();
	};
}
var gj = ["SCRIPT", "STYLE"];
function vj(e, n) {
	const i = Ke(n),
		o = kg(e);
	if (!i.body[o]) return !0;
	do {
		if (n === i.body) return !1;
		if (n[o]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function G_(e, n) {
	return n.some((i) => i && ht(e, i));
}
function yj(e, n, i) {
	return gj.includes(n.tagName) || !vj(e, n) ? !1 : !G_(n, i);
}
function pj(e, n, i) {
	return n[Q_(e)] ? !G_(n, i) : !1;
}
function qg(e, n, i, o) {
	for (let u of n) {
		if (!u?.isConnected) continue;
		const l = n.some((g) => (!g || g === u ? !1 : g.contains(u))),
			f = Ke(u),
			h = u,
			m = (g) => {
				for (const p of g.children) {
					if (yj(e, p, n)) {
						i(p, h);
						continue;
					}
					pj(e, p, n) && (o?.(p, h), m(p));
				}
			};
		for (; u.parentElement && u !== f.body;) (o?.(u.parentElement, h), l || m(u.parentElement), (u = u.parentElement));
	}
}
function bj(e, n) {
	const { body: i } = Ke(n[0]),
		o = [],
		u = [];
	return (
		qg(
			e,
			n,
			(l) => {
				o.push(l);
			},
			(l) => {
				u.push(l);
			},
		),
		en(qa(i, kg(e), !0), Y_(e, o), mj(e, u))
	);
}
function Sj(e, n, i) {
	const o = w_(i),
		u = n.map((l) => l?.id);
	return (
		qg(
			e,
			n,
			(l) => {
				__({ walk: o, element: l, id: e, ids: u });
			},
			(l, f) => {
				C_({ walk: o, ancestor: l, element: f, id: e });
			},
		),
		E_(o)
	);
}
function wj(e) {
	const n = e?.unstable_onHideRequest,
		i = e?.unstable_requestHide;
	if (n && i) return { onHideRequest: n, requestHide: i };
}
function X_(e = {}) {
	const n = e.store || e.disclosure ? gf(e.store, Ig(e.disclosure, ["contentElement", "disclosureElement"])) : void 0;
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
	const h = wj(e.store),
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
function J_(e, n, i) {
	return (
		ns(n, [i.store, i.disclosure, n]),
		Dt(e, i, "open", "setOpen"),
		Dt(e, i, "mounted", "setMounted"),
		Dt(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function Ej(e = {}) {
	const [n, i] = vf(X_, e);
	return J_(n, i, e);
}
var _j = [
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
	Cj = "div",
	vL = We(function (n) {
		return n;
	}),
	Yc = Fe(function (n) {
		return Je(Cj, n);
	});
Object.assign(
	Yc,
	_j.reduce(
		(e, n) => (
			(e[n] = Fe(function (o) {
				return Je(n, o);
			})),
			e
		),
		{},
	),
);
function Tj({ store: e, backdrop: n, backdropRef: i, onElementChange: o, alwaysVisible: u, hidden: l }) {
	const [f, h] = (0, _.useState)(null),
		m = Ej({ disclosure: e }),
		g = pe(e, "contentElement");
	(Ne(() => {
		const y = g;
		if (!f || !y) return;
		const { zIndex: w } = getComputedStyle(y);
		f.style.setProperty("z-index", w);
	}, [g, f]),
		Ne(() => {
			const y = g?.id;
			if (y && f) return S_(f, y);
		}, [g, f]),
		Ne(() => {
			f && o?.();
		}, [f, o]));
	const p = jg({
		ref: It(h, i),
		store: m,
		role: "presentation",
		"data-backdrop": g?.id || "",
		alwaysVisible: u,
		...(l != null && { hidden: l }),
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, _.isValidElement)(n)) return (0, S.jsx)(Yc, { ...p, render: n });
	const b = typeof n != "boolean" ? n : "div";
	return (0, S.jsx)(Yc, { ...p, render: (0, S.jsx)(b, {}) });
}
function W_(e = {}) {
	return X_(e);
}
function e1(e, n, i) {
	return J_(e, n, i);
}
function t1(e = {}) {
	const [n, i] = vf(W_, e);
	return e1(n, i, e);
}
function yf(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-dialog-hidden-dismiss");
	return i == null ? !1 : i === "" || !n.length ? !0 : n.some((o) => i === o);
}
function Lg() {
	return "inert" in HTMLElement.prototype;
}
function xj(e) {
	return Eg(e, "aria-hidden", "true");
}
function Oj(e, ...n) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : n.length ? (i === "" ? !1 : n.some((o) => i === o)) : !0;
}
function n1(e, n) {
	if (!("style" in e)) return Da;
	if (Lg()) return qa(e, "inert", !0);
	const i = Sg(e, !0).map((o) => {
		if (n?.some((l) => l && ht(l, o))) return Da;
		const u = _u(
			o,
			"focus",
			() => (
				(o.focus = Da),
				() => {
					delete o.focus;
				}
			),
		);
		return en(Eg(o, "tabindex", "-1"), u);
	});
	return en(...i, xj(e), Oc(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }));
}
function Aj({ walk: e, element: n, elements: i, ids: o }) {
	b_(n, ...o) || Oj(n, ...o) || yf(n, ...o) || mf({ walk: e, element: n, kind: "disable", setup: () => n1(n, i) });
}
function Rj(e, n, i) {
	n.hasAttribute("role") &&
		(i.some((o) => o && ht(o, n)) || mf({ walk: e, element: n, kind: "role", setup: () => Eg(n, "role", "none") }));
}
function Nj(e, n, i) {
	i && !Lg() && Cg(i);
	const o = w_(i),
		u = n.map((l) => l?.id);
	return (
		qg(
			e,
			n,
			(l) => {
				(__({ walk: o, element: l, id: e, ids: u }), Aj({ walk: o, element: l, elements: n, ids: u }));
			},
			(l, f) => {
				(C_({ walk: o, ancestor: l, element: f, id: e }), Rj(o, l, n));
			},
		),
		E_(o)
	);
}
function r1(e) {
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
function i1(e, n) {
	const i = e.composedPath().filter(Mn);
	!i.length && Mn(e.target) && i.push(e.target);
	const o = i[0];
	if (o) for (const l of r1(o).slice(1)) i.includes(l) || i.push(l);
	const u = n?.getRootNode();
	return { elements: i, rootTarget: u ? i.find((l) => l.getRootNode() === u) || e.target : i[0] || e.target };
}
function Mj(e, n, i) {
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
					o.current = i1(l, i);
				},
				!0,
				n,
			);
		}, [e, n, i]),
		o
	);
}
function a1(e) {
	const n = r1(e).at(-1);
	return ar(n ?? e);
}
function $S(e) {
	return e.isConnected;
}
function Dj(e, n) {
	if (!e) return !1;
	if (ht(e, n)) return !0;
	const i = n.getAttribute("aria-activedescendant");
	if (i) {
		const o = Ke(n).getElementById(i);
		if (o) return ht(e, o);
	}
	return !1;
}
function zj(e, n) {
	if (!("clientY" in e)) return !1;
	const i = n.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function Ij(e, n, i) {
	return ht(n, e) || Dj(i, e) || e.hasAttribute("data-focus-trap") || yf(e, n.id) ? !0 : _g(e, n);
}
function o1(e, n, i) {
	return e.elements.some((o) => Ij(o, n, i));
}
function pm({ store: e, type: n, listener: i, capture: o, open: u, contentElement: l, focusedRef: f }) {
	const h = Ae(i);
	(0, _.useEffect)(() => {
		if (!u) return;
		const m = (p) => {
				const { contentElement: b, disclosureElement: y } = e.getState();
				if (!b) return;
				const w = i1(p, b),
					E = w.elements[0],
					T = w.rootTarget;
				if (!Mn(T) || (E && !$S(E)) || !$S(T) || o1(w, b, y)) return;
				const x = Ke(b);
				if (Ke(T) !== x) {
					h(p);
					return;
				}
				(Ke(E ?? T) === x && zj(p, b)) || (f.current && !hf(T, b.id)) || h(p);
			},
			g = l ? a1(l) : void 0;
		return Wt(n, m, o, g);
	}, [u, o, e, n, h, l, f]);
}
function bm(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function jj({ store: e, hideOnInteractOutside: n, domReady: i, interactedOutsideRef: o, focusedStoreRef: u }) {
	const l = pe(e, "open"),
		f = pe(e, "contentElement"),
		h = f ? a1(f) : void 0,
		m = Mj(l, h, f),
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
	(pm({
		...p,
		type: "click",
		listener: (y) => {
			const { contentElement: w, disclosureElement: E } = e.getState(),
				T = m.current;
			if (!T || !w || o1(T, w, E)) return;
			const x = T.rootTarget;
			Mn(x) && ((Ke(x) === Ke(w) && !hf(x, w.id)) || (bm(n, y) && ((o.current = !0), b())));
		},
	}),
		pm({
			...p,
			type: "focusin",
			listener: (y) => {
				const { contentElement: w } = e.getState();
				if (!w || y.target === Ke(w) || !bm(n, y)) return;
				const E = y.target;
				(Mn(E) && Ke(E) !== Ke(w) && (o.current = !0), b());
			},
		}),
		pm({
			...p,
			type: "contextmenu",
			listener: (y) => {
				bm(n, y) && ((o.current = !0), b());
			},
		}));
}
var HS = (0, _.createContext)({});
function kj(e) {
	const n = (0, _.useContext)(HS),
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
		wrapElement: (0, _.useCallback)((f) => (0, S.jsx)(HS.Provider, { value: l, children: f }), [l]),
		nestedDialogs: i,
	};
}
function qj({ attribute: e, contentId: n, contentElement: i, enabled: o }) {
	const [u, l] = A_(),
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
			const m = new MutationObserver(() => (0, du.flushSync)(l));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [u, o, n, i, f, e, l]),
		f
	);
}
var s1 = cf() && !G2(),
	Lj = s1 ? _.useEffect : Ne;
function Uj(e) {
	const { CSS: n } = e;
	return !!n?.supports("scrollbar-gutter", "stable");
}
function ZS(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function Vj(e, n, i) {
	const o = qj({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: i });
	Lj(() => {
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
					j = !x(w.getPropertyValue("overflow-x")) || !x(w.getPropertyValue("overflow-y")),
					M = () => en(pc(f, "overflow-x", "hidden"), pc(f, "overflow-y", "hidden")),
					A = (N) => (j ? en(N, M()) : N);
				return !T && !g
					? A(Oc(h, { overflow: "hidden" }))
					: T || Uj(l)
						? en(pc(f, "scrollbar-gutter", T ? E : "stable"), M())
						: A(en(pc(f, "--scrollbar-width", `${g}px`), Oc(h, { overflow: "hidden", [ZS(f)]: `${g}px` })));
			},
			b = () => {
				const { scrollX: w, scrollY: E, visualViewport: T } = l,
					x = T?.offsetLeft ?? 0,
					j = T?.offsetTop ?? 0,
					M = Oc(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(E - Math.floor(j))}px`,
						left: `${-(w - Math.floor(x))}px`,
						right: "0",
						[ZS(f)]: `${g}px`,
					});
				return () => {
					(M(), l.scrollTo({ left: w, top: E, behavior: "instant" }));
				};
			};
		if (s1) return b();
		const y = p();
		return () => {
			queueMicrotask(y);
		};
	}, [o, e]);
}
var u1 = new WeakSet();
function Bj(e) {
	u1.add(e);
}
function l1(e) {
	return u1.has(e);
}
var Ko = new Map();
function Pj(e, n = {}) {
	Ko.set(e, n);
}
function $j(e) {
	Ko.delete(e);
}
function Hj(e) {
	const n = [],
		i = e.current;
	for (const [o, u] of Ko) {
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
function Sm(e) {
	let n = !1;
	for (const [i, o] of Ko) {
		if (i === e) {
			n = !0;
			continue;
		}
		n && o.onEarlierDialogElementChange?.();
	}
}
function Zj(e) {
	const n = e.current;
	if (!n || !hf(n)) return !1;
	const i = Ko.get(e)?.getOutsideCleanups?.();
	let o = !1,
		u = !1;
	for (const [l, f] of Ko) {
		if (l === e) {
			o = !0;
			continue;
		}
		const h = l.current;
		if (h && AS(n, f.getOutsideCleanups?.())) {
			if (o || !AS(h, i)) return !0;
			u = !0;
		}
	}
	return !(o && u);
}
var Fj = "div",
	Qj = bg(),
	Qm = new WeakSet(),
	FS = new WeakSet();
function Yj(e) {
	const n = Zn(e);
	return !n || (e && ht(e, n)) || yf(n, e?.id) ? !1 : !!ln(n);
}
function Kj(e) {
	let n = e;
	for (; n.shadowRoot;) {
		const i = n.shadowRoot.activeElement;
		if (!Mn(i)) break;
		n = i;
	}
	return n;
}
function QS(e, n, i) {
	return ht(n, e) || (i && ht(i, e)) ? !0 : _g(e, n);
}
function Gj(e) {
	const n = e.querySelectorAll("[data-dialog-dismiss]");
	for (const i of n) if (i.closest("[data-dialog]") === e) return !0;
	return !1;
}
function YS(e, n = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (n ? (ln(i) ? i : null) : i) : null;
}
function Xj(e) {
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
		!h || !ht(h, l) || Qm.has(h) || o.push(h);
	}
	return o;
}
var c1 = We(function ({
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
	unstable_treeSnapshotKey: j,
	unstable_wrapperElement: M,
	...A
}) {
	const N = Au(),
		D = (0, _.useRef)(null),
		z = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		U = l && f && !A.portalElement,
		H = (0, _.useRef)(!1),
		re = Ae(() => {
			const le = D.current;
			if (!le) return !0;
			const Oe = new Event("close", { bubbles: !1, cancelable: !0 });
			return (o && le.addEventListener("close", o, { once: !0 }), le.dispatchEvent(Oe), !Oe.defaultPrevented);
		}),
		R = t1({
			store: n || N,
			open: i,
			setOpen(le) {
				le || H.current || re() || R.setOpen(!0);
			},
		});
	Ne(
		() =>
			R.unstable_onHideRequest((le) => {
				if (!H.current) {
					H.current = !0;
					try {
						if (!re()) return;
						le();
					} finally {
						H.current = !1;
					}
				}
			}),
		[R, re],
	);
	const { portalRef: q, portalNode: P, domReady: F } = xg(f, A.portalRef),
		Y = vu(P),
		B = vu(M),
		te = A.preserveTabOrder,
		ne = pe(R, ["mounted"], (le) => te && !l && le.mounted),
		L = Ur(A.id),
		ee = pe(R, "open"),
		K = pe(R, "mounted"),
		se = pe(R, "contentElement"),
		xe = Ru(K, A.hidden, A.alwaysVisible);
	Vj(se, L, b && !xe);
	const ge = (0, _.useRef)(!1),
		k = (0, _.useRef)(null);
	(Ne(
		() =>
			nt(R, ["open"], (le) => {
				if (!le.open) {
					k.current = null;
					return;
				}
				((ge.current = !1), k.current !== R && (k.current = null));
			}),
		[R],
	),
		jj({ store: R, hideOnInteractOutside: g, domReady: F, interactedOutsideRef: ge, focusedStoreRef: k }));
	const { wrapElement: ae, nestedDialogs: W } = kj(R);
	A = Pt(A, ae, [ae]);
	const fe = (0, _.useRef)(null);
	(Qj &&
		(0, _.useEffect)(() => {
			if (!F) return;
			const le = D.current;
			if (!le) return;
			const Oe = Ke(le),
				Ie = (ye) => {
					fe.current = ye.target;
				};
			return (
				Oe.addEventListener("mousedown", Ie, !0),
				() => {
					Oe.removeEventListener("mousedown", Ie, !0);
				}
			);
		}, [F]),
		Ne(() => {
			if (!ee || k.current === R) return;
			const le = D.current;
			if (
				(() => {
					const { disclosureElement: Me } = R.getState();
					return !(!Me || l1(Me) || !Me.isConnected || (le && ht(le, Me)));
				})()
			)
				return;
			const Ie = (Me) => {
					(Bj(Me), R.setDisclosureElement(Me));
				},
				ye = Zn(le, { activeDescendant: !0 });
			if (ye) {
				if (ye.tagName === "BODY") {
					const Me = fe.current;
					if (((fe.current = null), !Me?.isConnected || !ln(Me) || (le && ht(le, Me)))) return;
					Ie(Me);
					return;
				}
				(le && ht(le, ye)) || Ie(ye);
			}
		}, [R, ee]),
		(0, _.useEffect)(() => {
			if (!K || !F) return;
			const le = D.current;
			if (!le) return;
			const Oe = ar(le),
				Ie = Oe.visualViewport || Oe,
				ye = () => {
					const Me = Oe.visualViewport?.height ?? Oe.innerHeight;
					le.style.setProperty("--dialog-viewport-height", `${Me}px`);
				};
			return (
				ye(),
				Ie.addEventListener("resize", ye),
				() => {
					Ie.removeEventListener("resize", ye);
				}
			);
		}, [K, F]));
	const [Ee, _e] = (0, _.useState)(!1);
	(Ne(() => {
		if (!(l && ee && F) || !se) {
			_e(!1);
			return;
		}
		const le = () => {
			_e(!Gj(se));
		};
		le();
		const { MutationObserver: Oe } = ar(se),
			Ie = new Oe(le);
		return (Ie.observe(se, { childList: !0, subtree: !0 }), () => Ie.disconnect());
	}, [l, ee, F, se]),
		Ne(() => {
			if (!Lg() || ee || !K || !F) return;
			const le = D.current;
			if (le) return n1(le);
		}, [ee, K, F]));
	const Ce = ee && F,
		ce = (0, _.useRef)(null);
	Ne(() => {
		if (!L || !U || !Ce || !P) {
			ce.current = null;
			return;
		}
		const le = D.current;
		if (!le || !ht(P, le)) {
			ce.current = null;
			return;
		}
		return (
			ce.current?.portal !== P && (ce.current = { portal: P, peers: Xj(le) }),
			Qm.add(P),
			() => {
				Qm.delete(P);
			}
		);
	}, [L, Ce, U, P]);
	const ve = !!Ce,
		[Ge, ct] = (0, _.useState)(0);
	(Ne(() => {
		ve &&
			Pj(D, {
				getOutsideCleanups: () => Qe.current?.outsideCleanups,
				getPortalNode: () => Y.current,
				getWrapperElement: () => B.current,
				getBackdropElement: () => z.current,
				getHiddenDismissElement: () => O.current,
				onEarlierDialogElementChange: () => {
					ct((le) => le + 1);
				},
			});
	}, [ve, Y, B]),
		Ne(() => {
			if (ee) return () => $j(D);
		}, [ee]));
	const mt = (0, _.useRef)(null);
	Ne(() => {
		if (!ve) {
			mt.current = null;
			return;
		}
		if (!se) return;
		const le = mt.current;
		((mt.current = se), le && le !== se && Sm(D));
	}, [ve, se]);
	const _t = (0, _.useCallback)(() => {
		Sm(D);
	}, []);
	Ne(() => {
		Ee && Sm(D);
	}, [Ee]);
	const et = (0, _.useRef)(null);
	(Ne(() => {
		if (!L || !Ce) return;
		const le = D.current;
		if (!le) return;
		const Oe = le.getRootNode(),
			Ie = et.current;
		if (Ie?.rootNode === Oe) return;
		Ie?.restore();
		const ye = bj(L, [le]);
		et.current = { rootNode: Oe, restore: ye };
	}, [L, Ce, j]),
		Ne(() => {
			if (ee)
				return () => {
					(et.current?.restore(), (et.current = null));
				};
		}, [L, ee, j]),
		Ne(() => {
			if (!L || !Ce) return;
			const le = Hj(D);
			return Y_(L, le);
		}, [L, Ce, Ge]));
	const Ue = Ae(p),
		Qe = (0, _.useRef)(null);
	(Ne(
		() => () => {
			const le = Qe.current;
			le && ((Qe.current = null), le.restoreInsideMarks(), Cg(le.outsideCleanups));
		},
		[L, R, Ce, se, l, U, Ue, j],
	),
		Ne(() => {
			if (!L || !Ce) return;
			const { disclosureElement: le } = R.getState(),
				Oe = se ?? D.current;
			if (!Oe) return;
			const Ie = [Oe, ...(Ue() || []), ...(ce.current?.peers || []), ...W.map((Sr) => Sr.getState().contentElement)],
				ye = Qe.current;
			ye?.restoreInsideMarks();
			const Me = vI(Oe, Ie),
				Yt = l ? Nj(L, Ie, ye?.outsideCleanups) : Sj(L, [le, ...Ie], ye?.outsideCleanups);
			Qe.current = { restoreInsideMarks: Me, outsideCleanups: Yt };
		}, [L, R, Ce, se, l, U, Ue, W, j, Ge]));
	const dn = !!y,
		At = st(y),
		[Fn, Qn] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!ee || !dn || !F || !se?.isConnected) return;
		const le = YS(E, !0) || se.querySelector("[data-autofocus=true],[autofocus]") || Hm(se, !0, f && ne) || se,
			Oe = ln(le);
		At(Oe ? le : null) &&
			(Qn(!0),
			queueMicrotask(() => {
				const { open: Ie, disclosureElement: ye } = R.getState();
				if (!Ie) return;
				const Me = Zn(se, { frame: !1 }),
					Yt = Me && Kj(Me);
				(k.current === R && Me && Yt && ln(Yt) && !QS(Me, se, ye) && !QS(Yt, se, ye)) ||
					(ln(le) && le.scrollIntoView({ block: "nearest", inline: "nearest" }), le.focus({ preventScroll: !0 }));
			}));
	}, [ee, dn, F, se, E, f, ne, R, At, k]);
	const Ct = !!w,
		jt = st(w),
		[hn, Qt] = (0, _.useState)(!1);
	Ne(() => {
		if (ee) return (Qt(!0), () => Qt(!1));
	}, [ee]);
	const he = (0, _.useCallback)(
			(le, Oe = !0) => {
				if (ge.current) return;
				const { disclosureElement: Ie } = R.getState();
				if (Yj(le)) return;
				let ye = YS(T) || Ie;
				if (ye?.id) {
					const Yt = Ke(ye),
						Sr = `[aria-activedescendant="${ye.id}"]`,
						vi = Yt.querySelector(Sr);
					vi && (ye = vi);
				}
				if (ye && !ln(ye)) {
					const Yt = ye.closest("[data-dialog]");
					if (Yt?.id) {
						const Sr = Ke(Yt),
							vi = `[aria-controls~="${Yt.id}"]`,
							gn = Sr.querySelector(vi);
						gn && (ye = gn);
					}
				}
				const Me = ye && ln(ye);
				if (!Me && Oe) {
					requestAnimationFrame(() => he(le, !1));
					return;
				}
				jt(Me ? ye : null) && Me && ye?.focus();
			},
			[R, T, jt],
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
	const bt = st(m),
		[Tt] = (0, _.useState)(() => new WeakMap()),
		[Wi] = (0, _.useState)(() => new WeakMap()),
		Za = A.onKeyDown,
		ea = A.onKeyDownCapture,
		mi = A.onFocusCapture,
		pr = Ae((le) => {
			if ((mi?.(le), !R.getState().open)) return;
			const Oe = le.target;
			Lc(Oe) && ht(le.currentTarget, Oe) && (k.current = R);
		}),
		gi = Ae((le) => {
			if (le.key !== "Escape" || !le.bubbles) return !1;
			const Oe = Tt.get(le);
			if (Oe) return le.defaultPrevented && !Oe.defaultPrevented ? !1 : Oe.accepted;
			if (le.defaultPrevented) return !1;
			const Ie = D.current;
			if (!K || !Ie) return !1;
			const ye = Zm(le);
			let Me = Wi.get(ye);
			return (
				Me || ((Me = { accepted: !Zj(D) && !FS.has(ye) && bt(le), hidden: !1 }), Wi.set(ye, Me)),
				Tt.set(le, { accepted: Me.accepted, defaultPrevented: le.defaultPrevented }),
				Me.accepted
			);
		}),
		br = Ae((le) => {
			const Oe = gi(le);
			if ((Tt.delete(le), !Oe)) return !1;
			const Ie = Zm(le),
				ye = Wi.get(Ie);
			return (ye?.hidden || (ye && (ye.hidden = !0), FS.add(Ie), R.hide()), !0);
		}),
		tn = Ae((le) => {
			const Oe = le.nativeEvent,
				Ie = Oe.cancelBubble;
			if ((Za?.(le), Ie)) {
				Tt.delete(Oe);
				return;
			}
			br(Oe) && le.stopPropagation();
		}),
		de = Ae((le) => {
			const Oe = le.nativeEvent,
				Ie = Oe.cancelBubble;
			if ((ea?.(le), Ie)) {
				Tt.delete(Oe);
				return;
			}
			gi(Oe) && (le.isPropagationStopped() || Oe.cancelBubble) && br(Oe);
		});
	((0, _.useEffect)(() => {
		if (!F || !K) return;
		const le = (ye) => {
				if (ye.key !== "Escape" || !ye.bubbles) return;
				if (ye.cancelBubble) {
					Tt.delete(ye);
					return;
				}
				if (Tt.has(ye)) return;
				const Me = D.current;
				if (!Me) return;
				const Yt = [ye.target, ye.composedPath()[0]].filter(Lc),
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
				Yt.some(vi) && gi(ye) && ye.cancelBubble && br(ye);
			},
			Oe = (ye) => {
				if (Tt.has(ye)) {
					if (ye.cancelBubble) {
						Tt.delete(ye);
						return;
					}
					br(ye) && ye.stopPropagation();
				}
			},
			Ie = se ? ar(se) : void 0;
		return en(Wt("keydown", le, !0, Ie), Wt("keydown", Oe, !1, Ie));
	}, [R, F, K, se, br, gi, Tt]),
		(A = Pt(A, (le) => (0, S.jsx)(oj, { level: l ? 1 : void 0, children: le }), [l])));
	const Be = A.hidden,
		Rt = A.alwaysVisible;
	((A = Pt(
		A,
		(le) =>
			(0, S.jsxs)(S.Fragment, {
				children: [
					Ee &&
						(0, S.jsx)("button", {
							ref: O,
							type: "button",
							tabIndex: -1,
							"data-dialog-hidden-dismiss": L || "",
							style: $_(),
							onClick: R.hide,
							children: "Dismiss popup",
						}),
					le,
				],
			}),
		[Ee, L, R],
	)),
		(A = Pt(
			A,
			(le) =>
				(0, S.jsxs)(S.Fragment, {
					children: [
						!!h &&
							(0, S.jsx)(Tj, {
								store: R,
								backdrop: h,
								backdropRef: z,
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
		(A = Pt(
			A,
			(le) =>
				(0, S.jsx)(Mg, {
					value: R,
					children: (0, S.jsx)(D_.Provider, {
						value: pn,
						children: (0, S.jsx)(PI.Provider, { value: kn, children: le }),
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
			"data-dialog-portal": U ? P?.id : void 0,
			id: L,
			ref: It(D, A.ref),
			onFocusCapture: pr,
			onKeyDown: tn,
			onKeyDownCapture: de,
		}),
		(A = P_({ ...A, autoFocusOnShow: Fn })),
		(A = jg({ store: R, ...A, unstable_otherElementRef: z })),
		(A = Tu({ ...A, focusable: u })),
		(A = F_({ portal: f, ...A, portalRef: q, preserveTabOrder: ne })),
		A
	);
});
function Nu(e, n = Au) {
	return Fe(function (o) {
		const u = n(),
			l = o.store || u;
		return pe(l, ["mounted"], (f) => !o.unmountOnHide || f?.mounted || !!o.open) ? (0, S.jsx)(e, { ...o }) : null;
	});
}
var f1 = Nu(
		Fe(function (n) {
			const i = c1(n);
			return Je(Fj, i);
		}),
		Au,
	),
	Jj = Fe(function (n) {
		const i = t1({ open: n.open });
		return (0, S.jsx)(f1, { ...n, store: i });
	}),
	yL = Fe(function (n) {
		const i = Au();
		return n.store || i || !n.unmountOnHide ? (0, S.jsx)(f1, { ...n }) : (0, S.jsx)(Jj, { ...n });
	}),
	Mu = Vr([BI], [Mg]),
	pL = Mu.useContext,
	bL = Mu.useScopedContext,
	Ug = Mu.useProviderContext,
	d1 = Mu.ContextProvider,
	pf = Mu.ScopedContextProvider;
function Vg(e) {
	return e.split("-")[0];
}
var Fi = Math.min,
	li = Math.max,
	Kc = Math.round,
	Ec = Math.floor,
	ci = (e) => ({ x: e, y: e }),
	Wj = { left: "right", right: "left", bottom: "top", top: "bottom" };
function h1(e, n, i) {
	return li(e, Fi(n, i));
}
function Qi(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function Yi(e) {
	return e.split("-")[0];
}
function rs(e) {
	return e.split("-")[1];
}
function Bg(e) {
	return e === "x" ? "y" : "x";
}
function Pg(e) {
	return e === "y" ? "height" : "width";
}
function jr(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function $g(e) {
	return Bg(jr(e));
}
function ek(e, n, i) {
	i === void 0 && (i = !1);
	const o = rs(e),
		u = $g(e),
		l = Pg(u);
	let f = u === "x" ? (o === (i ? "end" : "start") ? "right" : "left") : o === "start" ? "bottom" : "top";
	return (n.reference[l] > n.floating[l] && (f = Gc(f)), [f, Gc(f)]);
}
function tk(e) {
	const n = Gc(e);
	return [Ym(e), n, Ym(n)];
}
function Ym(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var KS = ["left", "right"],
	GS = ["right", "left"],
	nk = ["top", "bottom"],
	rk = ["bottom", "top"];
function ik(e, n, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (n ? GS : KS) : n ? KS : GS;
		case "left":
		case "right":
			return n ? nk : rk;
		default:
			return [];
	}
}
function ak(e, n, i, o) {
	const u = rs(e);
	let l = ik(Yi(e), i === "start", o);
	return (u && ((l = l.map((f) => f + "-" + u)), n && (l = l.concat(l.map(Ym)))), l);
}
function Gc(e) {
	const n = Yi(e);
	return Wj[n] + e.slice(n.length);
}
function ok(e) {
	var n, i, o, u;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (o = e.bottom) != null ? o : 0,
		left: (u = e.left) != null ? u : 0,
	};
}
function m1(e) {
	return typeof e != "number" ? ok(e) : { top: e, right: e, bottom: e, left: e };
}
function Xc(e) {
	const { x: n, y: i, width: o, height: u } = e;
	return { width: o, height: u, top: i, left: n, right: n + o, bottom: i + u, x: n, y: i };
}
function XS(e, n, i) {
	let { reference: o, floating: u } = e;
	const l = jr(n),
		f = $g(n),
		h = Pg(f),
		m = Yi(n),
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
	const E = rs(n);
	return (E && (w[f] += y * (E === "end" ? 1 : -1) * (i && g ? -1 : 1)), w);
}
async function sk(e, n) {
	var i;
	n === void 0 && (n = {});
	const { x: o, y: u, platform: l, rects: f, elements: h, strategy: m } = e,
		{
			boundary: g = "clippingAncestors",
			rootBoundary: p = "viewport",
			elementContext: b = "floating",
			altBoundary: y = !1,
			padding: w = 0,
		} = Qi(n, e),
		E = m1(w),
		T = h[y ? (b === "floating" ? "reference" : "floating") : b],
		x = Xc(
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
		j = b === "floating" ? { x: o, y: u, width: f.floating.width, height: f.floating.height } : f.reference,
		M = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(h.floating)),
		A = ((await (l.isElement == null ? void 0 : l.isElement(M))) &&
			(await (l.getScale == null ? void 0 : l.getScale(M)))) || { x: 1, y: 1 },
		N = Xc(
			l.convertOffsetParentRelativeRectToViewportRelativeRect
				? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: j,
						offsetParent: M,
						strategy: m,
					})
				: j,
		);
	return {
		top: (x.top - N.top + E.top) / A.y,
		bottom: (N.bottom - x.bottom + E.bottom) / A.y,
		left: (x.left - N.left + E.left) / A.x,
		right: (N.right - x.right + E.right) / A.x,
	};
}
var uk = 50,
	lk = async (e, n, i) => {
		const { placement: o = "bottom", strategy: u = "absolute", middleware: l = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: sk },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let g = await f.getElementRects({ reference: e, floating: n, strategy: u }),
			{ x: p, y: b } = XS(g, o, m),
			y = o,
			w = 0;
		const E = {};
		for (let T = 0; T < l.length; T++) {
			const x = l[T];
			if (!x) continue;
			const { name: j, fn: M } = x,
				{
					x: A,
					y: N,
					data: D,
					reset: z,
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
				(E[j] = { ...E[j], ...D }),
				z &&
					w < uk &&
					(w++,
					typeof z == "object" &&
						(z.placement && (y = z.placement),
						z.rects &&
							(g = z.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: u }) : z.rects),
						({ x: p, y: b } = XS(g, y, m))),
					(T = -1)));
		}
		return { x: p, y: b, placement: y, strategy: u, middlewareData: E };
	},
	ck = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: i, y: o, placement: u, rects: l, platform: f, elements: h, middlewareData: m } = n,
				{ element: g, padding: p = 0 } = Qi(e, n) || {};
			if (g == null) return {};
			const b = m1(p),
				y = { x: i, y: o },
				w = $g(u),
				E = Pg(w),
				T = await f.getDimensions(g),
				x = w === "y",
				j = x ? "top" : "left",
				M = x ? "bottom" : "right",
				A = x ? "clientHeight" : "clientWidth",
				N = l.reference[E] + l.reference[w] - y[w] - l.floating[E],
				D = y[w] - l.reference[w],
				z = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(g));
			let O = z ? z[A] : 0;
			(!O || !(await (f.isElement == null ? void 0 : f.isElement(z)))) && (O = h.floating[A] || l.floating[E]);
			const U = N / 2 - D / 2,
				H = O / 2 - T[E] / 2 - 1,
				re = Fi(b[j], H),
				R = Fi(b[M], H),
				q = O - T[E] - R,
				P = O / 2 - T[E] / 2 + U,
				F = h1(re, P, q),
				Y = !m.arrow && rs(u) != null && P !== F && l.reference[E] / 2 - (P < re ? re : R) - T[E] / 2 < 0,
				B = Y ? (P < re ? P - re : P - q) : 0;
			return { [w]: y[w] + B, data: { [w]: F, centerOffset: P - F - B, ...(Y && { alignmentOffset: B }) }, reset: Y };
		},
	}),
	fk = function (e) {
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
						} = Qi(e, n);
					if ((i = l.arrow) != null && i.alignmentOffset) return {};
					const j = Yi(u),
						M = jr(h),
						A = Yi(h) === h,
						N = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)),
						D = y || (A || !T ? [Gc(h)] : tk(h)),
						z = E !== "none";
					!y && z && D.push(...ak(h, T, E, N));
					const O = [h, ...D],
						U = await m.detectOverflow(n, x),
						H = [];
					let re = ((o = l.flip) == null ? void 0 : o.overflows) || [];
					if ((p && H.push(U[j]), b)) {
						const F = ek(u, f, N);
						H.push(U[F[0]], U[F[1]]);
					}
					if (((re = [...re, { placement: u, overflows: H }]), !H.every((F) => F <= 0))) {
						var R, q;
						const F = (((R = l.flip) == null ? void 0 : R.index) || 0) + 1,
							Y = O[F];
						if (
							Y &&
							(!(b === "alignment" && M !== jr(Y)) ||
								re.every((te) => (jr(te.placement) === M ? te.overflows[0] > 0 : !0)))
						)
							return { data: { index: F, overflows: re }, reset: { placement: Y } };
						let B =
							(q = re.filter((te) => te.overflows[0] <= 0).sort((te, ne) => te.overflows[1] - ne.overflows[1])[0]) ==
							null
								? void 0
								: q.placement;
						if (!B)
							switch (w) {
								case "bestFit": {
									var P;
									const te =
										(P = re
											.filter((ne) => {
												if (z) {
													const L = jr(ne.placement);
													return L === M || L === "y";
												}
												return !0;
											})
											.map((ne) => [ne.placement, ne.overflows.filter((L) => L > 0).reduce((L, ee) => L + ee, 0)])
											.sort((ne, L) => ne[1] - L[1])[0]) == null
											? void 0
											: P[0];
									te && (B = te);
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
	g1 = new Set(["left", "top"]);
async function dk(e, n) {
	const { placement: i, platform: o, elements: u } = e,
		l = await (o.isRTL == null ? void 0 : o.isRTL(u.floating)),
		f = Yi(i),
		h = rs(i),
		m = jr(i) === "y",
		g = g1.has(f) ? -1 : 1,
		p = l && m ? -1 : 1,
		b = Qi(n, e);
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
var hk = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var i, o;
					const { x: u, y: l, placement: f, middlewareData: h } = n,
						m = await dk(n, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (o = h.arrow) != null && o.alignmentOffset
						? {}
						: { x: u + m.x, y: l + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	mk = function (e) {
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
						} = Qi(e, n),
						p = { x: i, y: o },
						b = await l.detectOverflow(n, g),
						y = jr(u),
						w = Bg(y);
					let E = p[w],
						T = p[y];
					const x = (M, A) => h1(A + b[M === "y" ? "top" : "left"], A, A - b[M === "y" ? "bottom" : "right"]);
					(f && (E = x(w, E)), h && (T = x(y, T)));
					const j = m.fn({ ...n, [w]: E, [y]: T });
					return { ...j, data: { x: j.x - i, y: j.y - o, enabled: { [w]: f, [y]: h } } };
				},
			}
		);
	},
	gk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var i, o;
					const { x: u, y: l, placement: f, rects: h, middlewareData: m } = n,
						{ offset: g = 0, mainAxis: p = !0, crossAxis: b = !0 } = Qi(e, n),
						y = { x: u, y: l },
						w = jr(f),
						E = Bg(w);
					let T = y[E],
						x = y[w];
					const j = Qi(g, n),
						M =
							typeof j == "number"
								? { mainAxis: j, crossAxis: 0 }
								: { mainAxis: (i = j.mainAxis) != null ? i : 0, crossAxis: (o = j.crossAxis) != null ? o : 0 };
					if (p) {
						const D = E === "y" ? "height" : "width",
							z = h.reference[E] - h.floating[D] + M.mainAxis,
							O = h.reference[E] + h.reference[D] - M.mainAxis;
						T < z ? (T = z) : T > O && (T = O);
					}
					if (b) {
						var A, N;
						const D = E === "y" ? "width" : "height",
							z = g1.has(Yi(f)),
							O =
								h.reference[w] -
								h.floating[D] +
								((z && ((A = m.offset) == null ? void 0 : A[w])) || 0) +
								(z ? 0 : M.crossAxis),
							U =
								h.reference[w] +
								h.reference[D] +
								(z ? 0 : ((N = m.offset) == null ? void 0 : N[w]) || 0) -
								(z ? M.crossAxis : 0);
						x < O ? (x = O) : x > U && (x = U);
					}
					return { [E]: T, [w]: x };
				},
			}
		);
	},
	vk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: i, rects: o, platform: u, elements: l } = n,
						{ apply: f = () => {}, ...h } = Qi(e, n),
						m = await u.detectOverflow(n, h),
						g = Yi(i),
						p = rs(i),
						b = jr(i) === "y",
						{ width: y, height: w } = o.floating;
					let E, T;
					g === "top" || g === "bottom"
						? ((E = g),
							(T =
								p === ((await (u.isRTL == null ? void 0 : u.isRTL(l.floating))) ? "start" : "end") ? "left" : "right"))
						: ((T = g), (E = p === "end" ? "top" : "bottom"));
					const x = w - m.top - m.bottom,
						j = y - m.left - m.right,
						M = Fi(w - m[E], x),
						A = Fi(y - m[T], j),
						N = n.middlewareData.shift,
						D = !N;
					let z = M,
						O = A;
					(N != null && N.enabled.x && (O = j),
						N != null && N.enabled.y && (z = x),
						D && !p && (b ? (O = y - 2 * li(m.left, m.right)) : (z = w - 2 * li(m.top, m.bottom))),
						await f({ ...n, availableWidth: O, availableHeight: z }));
					const U = await u.getDimensions(l.floating);
					return y !== U.width || w !== U.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function bf() {
	return typeof window < "u";
}
function is(e) {
	return v1(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Dn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function hi(e) {
	var n;
	return (n = (v1(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function v1(e) {
	return bf() ? e instanceof Node || e instanceof Dn(e).Node : !1;
}
function qr(e) {
	return bf() ? e instanceof Element || e instanceof Dn(e).Element : !1;
}
function Ji(e) {
	return bf() ? e instanceof HTMLElement || e instanceof Dn(e).HTMLElement : !1;
}
function JS(e) {
	return !bf() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Dn(e).ShadowRoot;
}
function Sf(e) {
	const { overflow: n, overflowX: i, overflowY: o, display: u } = Lr(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + o + i) && u !== "inline" && u !== "contents";
}
function yk(e) {
	return /^(table|td|th)$/.test(is(e));
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
var pk = /transform|translate|scale|rotate|perspective|filter/,
	bk = /paint|layout|strict|content/,
	xa = (e) => !!e && e !== "none",
	wm;
function Hg(e) {
	const n = qr(e) ? Lr(e) : e;
	return (
		xa(n.transform) ||
		xa(n.translate) ||
		xa(n.scale) ||
		xa(n.rotate) ||
		xa(n.perspective) ||
		(!Zg() && (xa(n.backdropFilter) || xa(n.filter))) ||
		pk.test(n.willChange || "") ||
		bk.test(n.contain || "")
	);
}
function Sk(e) {
	let n = La(e);
	for (; Ji(n) && !pu(n);) {
		if (Hg(n)) return n;
		if (wf(n)) return null;
		n = La(n);
	}
	return null;
}
function Zg() {
	return (wm == null && (wm = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), wm);
}
function pu(e) {
	return /^(html|body|#document)$/.test(is(e));
}
function Lr(e) {
	return Dn(e).getComputedStyle(e);
}
function Ef(e) {
	return qr(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function La(e) {
	if (is(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (JS(e) && e.host) || hi(e);
	return JS(n) ? n.host : n;
}
function y1(e) {
	const n = La(e);
	return pu(n) ? (e.ownerDocument || e).body : Ji(n) && Sf(n) ? n : y1(n);
}
function bu(e, n, i) {
	var o;
	(n === void 0 && (n = []), i === void 0 && (i = !0));
	const u = y1(e),
		l = u === ((o = e.ownerDocument) == null ? void 0 : o.body),
		f = Dn(u);
	if (l) {
		const h = Km(f);
		return n.concat(f, f.visualViewport || [], Sf(u) ? u : [], h && i ? bu(h) : []);
	} else return n.concat(u, bu(u, [], i));
}
function Km(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function p1(e) {
	const n = Lr(e);
	let i = parseFloat(n.width) || 0,
		o = parseFloat(n.height) || 0;
	const u = Ji(e),
		l = u ? e.offsetWidth : i,
		f = u ? e.offsetHeight : o,
		h = Kc(i) !== l || Kc(o) !== f;
	return (h && ((i = l), (o = f)), { width: i, height: o, $: h });
}
function Fg(e) {
	return qr(e) ? e : e.contextElement;
}
function Po(e) {
	const n = Fg(e);
	if (!Ji(n)) return ci(1);
	const i = n.getBoundingClientRect(),
		{ width: o, height: u, $: l } = p1(n);
	let f = (l ? Kc(i.width) : i.width) / o,
		h = (l ? Kc(i.height) : i.height) / u;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var wk = ci(0);
function b1(e) {
	const n = Dn(e);
	return !Zg() || !n.visualViewport ? wk : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function Ek(e, n, i) {
	return (n === void 0 && (n = !1), !!i && n && i === Dn(e));
}
function Ua(e, n, i, o) {
	(n === void 0 && (n = !1), i === void 0 && (i = !1));
	const u = e.getBoundingClientRect(),
		l = Fg(e);
	let f = ci(1);
	n && (o ? qr(o) && (f = Po(o)) : (f = Po(e)));
	const h = Ek(l, i, o) ? b1(l) : ci(0);
	let m = (u.left + h.x) / f.x,
		g = (u.top + h.y) / f.y,
		p = u.width / f.x,
		b = u.height / f.y;
	if (l && o) {
		const y = Dn(l),
			w = qr(o) ? Dn(o) : o;
		let E = y,
			T = Km(E);
		for (; T && w !== E;) {
			const x = Po(T),
				j = T.getBoundingClientRect(),
				M = Lr(T),
				A = j.left + (T.clientLeft + parseFloat(M.paddingLeft)) * x.x,
				N = j.top + (T.clientTop + parseFloat(M.paddingTop)) * x.y;
			((m *= x.x), (g *= x.y), (p *= x.x), (b *= x.y), (m += A), (g += N), (E = Dn(T)), (T = Km(E)));
		}
	}
	return Xc({ width: p, height: b, x: m, y: g });
}
function _f(e, n) {
	const i = Ef(e).scrollLeft;
	return n ? n.left + i : Ua(hi(e)).left + i;
}
function S1(e, n) {
	const i = e.getBoundingClientRect();
	return { x: i.left + n.scrollLeft - _f(e, i), y: i.top + n.scrollTop };
}
function _k(e) {
	let { elements: n, rect: i, offsetParent: o, strategy: u } = e;
	const l = u === "fixed",
		f = hi(o),
		h = n ? wf(n.floating) : !1;
	if (o === f || (h && l)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		g = ci(1);
	const p = ci(0),
		b = Ji(o);
	if ((b || !l) && ((is(o) !== "body" || Sf(f)) && (m = Ef(o)), b)) {
		const w = Ua(o);
		((g = Po(o)), (p.x = w.x + o.clientLeft), (p.y = w.y + o.clientTop));
	}
	const y = f && !b && !l ? S1(f, m) : ci(0);
	return {
		width: i.width * g.x,
		height: i.height * g.y,
		x: i.x * g.x - m.scrollLeft * g.x + p.x + y.x,
		y: i.y * g.y - m.scrollTop * g.y + p.y + y.y,
	};
}
function Ck(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Tk(e) {
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
var xk = 25;
function Ok(e, n, i) {
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
		const b = !Zg() || n === "fixed";
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
		x <= xk && (h -= x);
	}
	return { width: h, height: m, x: g, y: p };
}
function Ak(e, n) {
	const i = Ua(e, !0, n === "fixed"),
		o = i.top + e.clientTop,
		u = i.left + e.clientLeft,
		l = Po(e);
	return { width: e.clientWidth * l.x, height: e.clientHeight * l.y, x: u * l.x, y: o * l.y };
}
function WS(e, n, i) {
	let o;
	if (n === "viewport" || n === "layoutViewport") o = Ok(e, i, n);
	else if (n === "document") o = Tk(hi(e));
	else if (qr(n)) o = Ak(n, i);
	else {
		const u = b1(e);
		o = { x: n.x - u.x, y: n.y - u.y, width: n.width, height: n.height };
	}
	return Xc(o);
}
function Rk(e, n) {
	const i = n.get(e);
	if (i) return i;
	let o = bu(e, [], !1).filter((h) => qr(h) && is(h) !== "body"),
		u = null;
	const l = Lr(e).position === "fixed";
	let f = l ? La(e) : e;
	for (; qr(f) && !pu(f);) {
		const h = Lr(f),
			m = Hg(f),
			g = u ? u.position : l ? "fixed" : "";
		(!m && (g === "fixed" || (g === "absolute" && h.position === "static")) ? (o = o.filter((p) => p !== f)) : (u = h),
			(f = La(f)));
	}
	return (n.set(e, o), o);
}
function Nk(e) {
	let { element: n, boundary: i, rootBoundary: o, strategy: u } = e;
	const l = [...(i === "clippingAncestors" ? (wf(n) ? [] : Rk(n, this._c)) : [].concat(i)), o],
		f = WS(n, l[0], u);
	let h = f.top,
		m = f.right,
		g = f.bottom,
		p = f.left;
	for (let b = 1; b < l.length; b++) {
		const y = WS(n, l[b], u);
		((h = li(y.top, h)), (m = Fi(y.right, m)), (g = Fi(y.bottom, g)), (p = li(y.left, p)));
	}
	return { width: m - p, height: g - h, x: p, y: h };
}
function Mk(e) {
	const { width: n, height: i } = p1(e);
	return { width: n, height: i };
}
function Dk(e, n, i) {
	const o = Ji(n),
		u = hi(n),
		l = i === "fixed",
		f = Ua(e, !0, l, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = ci(0);
	if ((o || !l) && ((is(n) !== "body" || Sf(u)) && (h = Ef(n)), o)) {
		const p = Ua(n, !0, l, n);
		((m.x = p.x + n.clientLeft), (m.y = p.y + n.clientTop));
	}
	!o && u && (m.x = _f(u));
	const g = u && !o && !l ? S1(u, h) : ci(0);
	return { x: f.left + h.scrollLeft - m.x - g.x, y: f.top + h.scrollTop - m.y - g.y, width: f.width, height: f.height };
}
function Em(e) {
	return Lr(e).position === "static";
}
function ew(e, n) {
	if (!Ji(e) || Lr(e).position === "fixed") return null;
	if (n) return n(e);
	let i = e.offsetParent;
	return (hi(e) === i && (i = i.ownerDocument.body), i);
}
function w1(e, n) {
	const i = Dn(e);
	if (wf(e)) return i;
	if (!Ji(e)) {
		let u = La(e);
		for (; u && !pu(u);) {
			if (qr(u) && !Em(u)) return u;
			u = La(u);
		}
		return i;
	}
	let o = ew(e, n);
	for (; o && yk(o) && Em(o);) o = ew(o, n);
	return o && pu(o) && Em(o) && !Hg(o) ? i : o || Sk(e) || i;
}
var zk = async function (e) {
	const n = this.getOffsetParent || w1,
		i = this.getDimensions,
		o = await i(e.floating);
	return {
		reference: Dk(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: o.width, height: o.height },
	};
};
function Ik(e) {
	return Lr(e).direction === "rtl";
}
var jk = {
	convertOffsetParentRelativeRectToViewportRelativeRect: _k,
	getDocumentElement: hi,
	getClippingRect: Nk,
	getOffsetParent: w1,
	getElementRects: zk,
	getClientRects: Ck,
	getDimensions: Mk,
	getScale: Po,
	isElement: qr,
	isRTL: Ik,
};
function E1(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function kk(e, n, i) {
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
		const j = Ec(E),
			M = Ec(l.clientWidth - (w + T)),
			A = Ec(l.clientHeight - (E + x)),
			N = Ec(w),
			D = { rootMargin: -j + "px " + -M + "px " + -A + "px " + -N + "px", threshold: li(0, Fi(1, b)) || 1 };
		let z = !0;
		function O(U) {
			const H = U[0].intersectionRatio;
			if (!E1(y, e.getBoundingClientRect())) return h();
			if (H !== b) {
				if (!z) return h();
				H
					? h(!1, H)
					: (u = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			z = !1;
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
function qk(e, n, i, o) {
	o === void 0 && (o = {});
	const {
			ancestorScroll: u = !0,
			ancestorResize: l = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = o,
		g = Fg(e),
		p = u || l ? [...(g ? bu(g) : []), ...(n ? bu(n) : [])] : [];
	p.forEach((j) => {
		(u && j.addEventListener("scroll", i), l && j.addEventListener("resize", i));
	});
	const b = g && h ? kk(g, i, l) : null;
	let y = -1,
		w = null;
	f &&
		((w = new ResizeObserver((j) => {
			let [M] = j;
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
		T = m ? Ua(e) : null;
	m && x();
	function x() {
		const j = Ua(e);
		(T && !E1(T, j) && i(), (T = j), (E = requestAnimationFrame(x)));
	}
	return (
		i(),
		() => {
			var j;
			(p.forEach((M) => {
				(u && M.removeEventListener("scroll", i), l && M.removeEventListener("resize", i));
			}),
				b?.(),
				(j = w) == null || j.disconnect(),
				(w = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var Lk = hk,
	Uk = mk,
	Vk = fk,
	Bk = vk,
	Pk = ck,
	$k = gk,
	Hk = (e, n, i) => {
		const o = new Map(),
			u = i ?? {},
			l = { ...jk, ...u.platform, _c: o };
		return lk(e, n, { ...u, platform: l });
	},
	Zk = "div",
	Js = new WeakMap();
function tw(e = 0, n = 0, i = 0, o = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, i, o);
	const u = { x: e, y: n, width: i, height: o, top: n, right: e + i, bottom: n + o, left: e };
	return { ...u, toJSON: () => u };
}
function Fk(e) {
	if (!e) return tw();
	const { x: n, y: i, width: o, height: u } = e;
	return tw(n, i, o, u);
}
function Qk(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				o = n?.(i);
			return o || !i ? Fk(o) : i.getBoundingClientRect();
		},
	};
}
function Yk(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function nw(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function Kk(e) {
	return typeof e == "number" ? e : Math.max(e.left ?? 0, e.right ?? 0);
}
function Gk(e, n) {
	return Lk(({ placement: i }) => {
		const o = (e?.clientHeight || 0) / 2,
			u = typeof n.gutter == "number" ? n.gutter + o : (n.gutter ?? o);
		return { crossAxis: i.split("-")[1] ? void 0 : n.shift, mainAxis: u, alignmentAxis: n.shift };
	});
}
function Xk(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Zt(!n || n.every(Yk), !1), Vk({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function Jk(e) {
	if (!(!e.slide && !e.overlap))
		return Uk({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: $k() });
}
function Wk(e, n) {
	return Bk({
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
function e4(e, n) {
	if (e) return Pk({ element: e, padding: n.arrowPadding });
}
var Qg = We(function ({
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
		getAnchorRect: j,
		updatePosition: M,
		...A
	}) {
		const N = Ug();
		((n = n || N), Zt(n, !1));
		const D = pe(n, "arrowElement"),
			z = pe(n, "anchorElement"),
			O = u && o && !i,
			U = pe(n, O ? ["disclosureElement"] : [], (ce) => (O ? ce.disclosureElement : null)),
			H = pe(n, "popoverElement"),
			re = pe(n, "unstable_placing"),
			R = pe(n, "contentElement"),
			q = pe(n, "placement"),
			P = pe(n, "mounted"),
			F = pe(n, "rendered"),
			Y = (0, _.useRef)(null),
			B = (0, _.useRef)(null),
			te = !!H && B.current === H,
			ne = !re || te,
			L = st(l),
			ee = Ae((ce) => {
				const ve = L(ce);
				return (n?.getState().unstable_placing || (B.current = H), ve);
			});
		Ne(
			() =>
				nt(n, ["open"], () => {
					B.current = null;
				}),
			[n],
		);
		const { portalRef: K, domReady: se } = xg(o, A.portalRef),
			xe = Ae(j),
			ge = Ae(M),
			k = !!M,
			ae = typeof x == "number" ? x : (x.top ?? 0),
			W = typeof x == "number" ? x : (x.right ?? 0),
			fe = typeof x == "number" ? x : (x.bottom ?? 0),
			Ee = typeof x == "number" ? x : (x.left ?? 0),
			_e = !P && Ru(P, A.hidden, A.alwaysVisible);
		(Ne(() => {
			if ((P && n?.setState("unstable_placing", !0), !H?.isConnected)) return;
			const ce = { top: ae, right: W, bottom: fe, left: Ee };
			if ((H.style.setProperty("--popover-overflow-padding", `${Kk(ce)}px`), _e && !k)) return;
			const ve = Qk(z, xe);
			let Ge = !1,
				ct = !1;
			const mt = () => !!(Ge || !H.isConnected),
				_t = async () => {
					if (mt() || !P) return;
					D || (Y.current = Y.current || document.createElement("div"));
					const Qe = D || Y.current,
						dn = [
							Gk(Qe, { gutter: E, shift: g }),
							Xk({ flip: m, overflowPadding: ce }),
							Jk({ slide: p, shift: g, overlap: b, overflowPadding: ce }),
							e4(Qe, { arrowPadding: T }),
							Wk({ sameWidth: y, fitViewport: w, overflowPadding: ce }, mt),
						],
						At = await Hk(ve, H, { placement: q, strategy: h ? "fixed" : "absolute", middleware: dn });
					if (mt()) return;
					n?.setState("currentPlacement", At.placement);
					const Fn = nw(At.x),
						Qn = nw(At.y);
					if (
						(Object.assign(H.style, { top: "0", left: "0", transform: `translate3d(${Fn}px,${Qn}px,0)` }),
						(ct = !0),
						Qe && At.middlewareData.arrow)
					) {
						const { x: Ct, y: jt } = At.middlewareData.arrow,
							hn = Vg(At.placement),
							Qt = Qe.clientWidth / 2,
							he = Qe.clientHeight / 2,
							Te = Ct != null ? Ct + Qt : -Qt,
							bt = jt != null ? jt + he : -he;
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
								top: jt != null ? `${jt}px` : "",
								right: "",
								bottom: "",
								[hn]: "100%",
							}));
					}
				},
				Ue = qk(
					ve,
					H,
					async () => {
						if (!mt()) {
							try {
								k ? await ge({ updatePosition: _t }) : await _t();
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
		}, [n, F, H, D, z, q, P, _e, se, h, m, g, p, b, y, w, E, T, ae, W, fe, Ee, xe, k, ge]),
			Ne(() => {
				if (!P || !se || !H?.isConnected || !R?.isConnected) return;
				const ce = () => {
					H.style.zIndex = getComputedStyle(R).zIndex;
				};
				ce();
				let ve = requestAnimationFrame(() => {
					ve = requestAnimationFrame(ce);
				});
				return () => cancelAnimationFrame(ve);
			}, [P, se, H, R]),
			Ne(() => {
				if (!n) return;
				const ce = n;
				Js.set(ce, (Js.get(ce) ?? 0) + 1);
				const ve = nt(ce, ["mounted"], (Ge) => {
					ce.setState("unstable_placing", Ge.mounted);
				});
				return () => {
					(ve(),
						Js.set(ce, (Js.get(ce) ?? 1) - 1),
						queueMicrotask(() => {
							Js.get(ce) || ce.setState("unstable_placing", !1);
						}));
				};
			}, [n]));
		const Ce = h ? "fixed" : "absolute";
		return (
			(A = Pt(
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
			(A = Pt(A, (ce) => (0, S.jsx)(pf, { value: n, children: ce }), [n])),
			(A = { "data-placing": re || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = c1({
				store: n,
				modal: i,
				portal: o,
				preserveTabOrder: u,
				preserveTabOrderAnchor: U || z,
				autoFocusOnShow: ne && !!l && ee,
				...A,
				portalRef: K,
				unstable_wrapperElement: H,
			})),
			A
		);
	}),
	SL = Nu(
		Fe(function (n) {
			const i = Qg(n);
			return Je(Zk, i);
		}),
		Ug,
	),
	Du = Vr([d1], [pf]),
	wL = Du.useContext,
	EL = Du.useScopedContext,
	_1 = Du.useProviderContext,
	t4 = Du.ContextProvider,
	C1 = Du.ScopedContextProvider;
function T1(e) {
	return [e.clientX, e.clientY];
}
function n4(e, n) {
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
			j = (w - T) * (i - y) - (y - E) * (o - w);
		if (T < w) {
			if (o >= T && o < w) {
				if (j === 0) return !0;
				j > 0 && (o === T ? o > x && (u = !u) : (u = !u));
			}
		} else if (w < T) {
			if (o > w && o <= T) {
				if (j === 0) return !0;
				j < 0 && (o === T ? o < x && (u = !u) : (u = !u));
			}
		} else if (o === w && ((i >= E && i <= y) || (i >= y && i <= E))) return !0;
	}
	return u;
}
function r4(e, n) {
	const { top: i, right: o, bottom: u, left: l } = n,
		[f, h] = e;
	return [f < l ? "left" : f > o ? "right" : null, h < i ? "top" : h > u ? "bottom" : null];
}
function i4(e, n) {
	const i = e.getBoundingClientRect(),
		{ top: o, right: u, bottom: l, left: f } = i,
		[h, m] = r4(n, i),
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
function x1({ hideOnEscape: e, onClose: n, onEscapeClose: i }) {
	const o = (0, _.useRef)(null);
	return {
		hideOnEscape: Ae((u) => {
			if (yg(e, u)) return !1;
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
var a4 = "div";
function o4(e, n, i, o) {
	return !!(Hi(n) || e.includes(n) || i.some((u) => u && e.includes(u)) || o?.some((u) => Hi(u) || e.includes(u)));
}
function rw({ event: e, element: n, enterPointRef: i, disablePointerEvents: o, refreshEnterPoint: u = !1 }) {
	const l = i.current;
	if (!l) return !1;
	const f = T1(e),
		h = i4(n, l);
	return n4(f, h) ? (u && (i.current = f), o(e) && (e.preventDefault(), e.stopPropagation()), !0) : !1;
}
function s4({ store: e, ...n }) {
	const [i, o] = (0, _.useState)(!1),
		u = pe(e, "mounted");
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
var iw = (0, _.createContext)(null),
	O1 = We(function ({
		store: n,
		modal: i = !1,
		portal: o = i,
		hideOnEscape: u = !0,
		hideOnHoverOutside: l = !0,
		disablePointerEventsOnApproach: f = !!l,
		...h
	}) {
		const m = _1();
		((n = n || m), Zt(n, !1));
		const g = (0, _.useRef)(null),
			p = (0, _.useRef)([]),
			b = (0, _.useRef)(0),
			y = (0, _.useRef)(null),
			{ portalRef: w, domReady: E } = xg(o, h.portalRef),
			T = Ag(),
			x = !!l,
			j = st(l),
			M = !!f,
			A = st(f),
			N = pe(n, "open"),
			D = pe(n, "mounted"),
			z = (0, _.useCallback)(() => {
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
								const { anchorElement: Y, disclosureElement: B, hideTimeout: te, timeout: ne } = n.getState(),
									L = F.composedPath(),
									ee = [Y, B],
									K = ee.find((se) => se && L.includes(se));
								if (o4(L, q, ee, p.current)) {
									((y.current = K ? T1(F) : null), z());
									return;
								}
								b.current ||
									rw({ event: F, element: q, enterPointRef: y, disablePointerEvents: A, refreshEnterPoint: !0 }) ||
									(j(F) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, te ?? ne)));
							},
							!0,
						),
						z,
					)
				: void 0;
		}, [n, T, E, D, x, M, p, z, A, j]),
			(0, _.useEffect)(() => {
				if (!E || !D || !M) return;
				const q = (P) => {
					const F = g.current;
					F && rw({ event: P, element: F, enterPointRef: y, disablePointerEvents: A });
				};
				return en(Wt("mouseenter", q, !0), Wt("mouseover", q, !0), Wt("mouseout", q, !0), Wt("mouseleave", q, !0));
			}, [E, D, M, A]),
			(0, _.useEffect)(() => {
				E && (N || n?.setAutoFocusOnShow(!1));
			}, [n, E, N]));
		const O = vu(N);
		(0, _.useEffect)(() => {
			if (E)
				return () => {
					O.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, E]);
		const U = (0, _.useContext)(iw);
		Ne(() => {
			if (i || !o || !D || !E) return;
			const q = g.current;
			if (q) return U?.(q);
		}, [i, o, D, E, U]);
		const H = (0, _.useCallback)(
			(q) => {
				(z(), (p.current = [...p.current, q]));
				const P = U?.(q);
				return () => {
					(z(), (p.current = p.current.filter((F) => F !== q)), P?.());
				};
			},
			[z, U],
		);
		((h = Pt(h, (q) => (0, S.jsx)(C1, { value: n, children: (0, S.jsx)(iw.Provider, { value: H, children: q }) }), [
			n,
			H,
		])),
			(h = { ...h, ref: It(g, h.ref) }),
			(h = s4({ store: n, ...h })));
		const re = pe(n, ["autoFocusOnShow"], (q) => i || q.autoFocusOnShow),
			R = x1({
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
			(h = Qg({
				store: n,
				modal: i,
				portal: o,
				autoFocusOnShow: re,
				...h,
				portalRef: w,
				hideOnEscape: R.hideOnEscape,
				onClose: R.onClose,
			})),
			h
		);
	}),
	_L = Nu(
		Fe(function (n) {
			const i = O1(n);
			return Je(a4, i);
		}),
		_1,
	),
	zu = Vr(),
	u4 = zu.useContext,
	CL = zu.useScopedContext,
	TL = zu.useProviderContext,
	l4 = zu.ContextProvider,
	c4 = zu.ScopedContextProvider,
	Iu = Vr([l4], [c4]),
	xL = Iu.useContext,
	Cf = Iu.useScopedContext,
	f4 = Iu.useProviderContext,
	Tf = Iu.ContextProvider,
	ju = Iu.ScopedContextProvider,
	d4 = (0, _.createContext)(void 0),
	h4 = (0, _.createContext)(void 0),
	ku = Vr([Tf], [ju]),
	m4 = ku.useContext,
	g4 = ku.useScopedContext,
	OL = ku.useProviderContext,
	AL = ku.ContextProvider,
	RL = ku.ScopedContextProvider,
	qu = Vr([Tf, t4], [ju, C1]),
	A1 = qu.useContext,
	v4 = qu.useScopedContext,
	xf = qu.useProviderContext,
	R1 = qu.ContextProvider,
	y4 = qu.ScopedContextProvider,
	NL = (0, _.createContext)(void 0),
	N1 = (0, _.createContext)(!1),
	p4 = new WeakMap();
function b4(e) {
	const n = [];
	let i = e.element.parentElement;
	for (; i;) {
		const o = p4.get(i)?.(e);
		(o && n.push(o), (i = i.parentElement));
	}
	return () => {
		for (const o of n) o();
	};
}
function S4(e) {
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
function w4(e) {
	return e?.__unstablePrivateStore;
}
var Jc = 64;
function aw(e, n) {
	if (e.length < Jc) {
		n.ids && ((n.items = void 0), (n.ids = void 0));
		return;
	}
	if (n.items === e) return n.ids;
	const i = new Set();
	for (const o of e) i.add(o.id);
	return ((n.items = e), (n.ids = i), i);
}
function _m(e, n, i) {
	if (e.length < Jc) {
		n.ids && ((n.items = void 0), (n.ids = void 0));
		return;
	}
	if (!i) {
		i = new Set();
		for (const o of e) i.add(o.id);
	}
	((n.items = e), (n.ids = i));
}
function E4(e = {}) {
	e.store;
	const n = e.store?.getState(),
		i = ke(e.items, n?.items, e.defaultItems, []),
		o = w4(e.store),
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
			const A = Q2(M, (N) => N.element);
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
	(yt(p, () => zg(b)),
		o ||
			(di(p, ["items"], ({ items: M }) => {
				M !== u.propagatedItems && ((u.propagatedItems = M), w(M));
			}),
			yt(b, () =>
				yu(b, ["items"], ({ items: M }) => {
					((u.propagatedItems = M), p.setState("items", M));
				}),
			)),
		yt(b, () =>
			yu(b, ["renderedItems"], (M) => {
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
					z = S4(M.renderedItems),
					O = new IntersectionObserver(D, { root: z });
				for (const U of M.renderedItems) U.element && O.observe(U.element);
				return () => {
					(cancelAnimationFrame(N), O.disconnect());
				};
			}),
		));
	const T = (M, A, N) => {
			const D = N?.registeredItems,
				z = N?.controlledItems;
			return (O) => {
				const U = D?.get(O.id),
					H = !!U || !!z?.has(O.id);
				let re;
				return (
					b.setState(M, (q) => {
						const P = A.ids || (q.length >= Jc && !H) ? aw(q, A) : void 0,
							F = P && !P.has(O.id) ? -1 : q.findIndex(({ id: B }) => B === O.id),
							Y = q.slice();
						if (F !== -1) {
							re = q[F];
							const B = { ...re, ...O };
							((Y[F] = B), D?.set(O.id, B));
						} else (Y.push(O), D?.set(O.id, O), P?.add(O.id));
						return ((A.ids || (F === -1 && Y.length >= Jc)) && _m(Y, A, P), Y);
					}),
					() => {
						(D && (U ? D.set(O.id, U) : D.delete(O.id)),
							b.setState(M, (q) => {
								const P = A.ids ? aw(q, A) : void 0;
								if (!re) {
									const B = q.filter(({ id: te }) => te !== O.id);
									return (P?.delete(O.id), A.ids && _m(B, A, P), B);
								}
								const F = q.findIndex(({ id: B }) => B === O.id);
								if (F === -1) return q;
								const Y = q.slice();
								return ((Y[F] = re), A.ids && _m(Y, A, P), Y);
							}));
					}
				);
			};
		},
		x = T("items", h, u),
		j = T("renderedItems", m);
	return {
		...p,
		setState: E,
		registerItem: x,
		renderItem: (M) => en(x(M), j(M)),
		item: (M) => (M ? (f.size ? (f.get(M) ?? l.get(M) ?? null) : (l.get(M) ?? null)) : null),
		__unstablePrivateStore: b,
	};
}
var _4 = { id: null };
function ai(e, n) {
	return e.find((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function C4(e) {
	for (let n = e.length - 1; n >= 0; n -= 1) {
		const i = e[n];
		if (i && !i.disabled) return i;
	}
}
function T4(e, n) {
	return e.filter((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function ow(e, n) {
	return e.filter((i) => i.rowId === n);
}
function sw({ items: e, fromIndex: n, step: i, rowId: o, excludeId: u }) {
	for (let l = n; l >= 0 && l < e.length; l += i) {
		const f = e[l];
		if (!f || f.rowId !== o || f.disabled) continue;
		const h = f.id;
		if (!(u != null && h === u)) return h;
	}
}
function M1(e, n, i = !1) {
	const o = e.findIndex((u) => u.id === n);
	return [...e.slice(o + 1), ...(i ? [_4] : []), ...e.slice(0, o)];
}
var x4 = 48,
	O4 = 4;
function A4(e) {
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
function R4(e) {
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
		(u.push(m), l ? l.set(f.rowId, m) : u.length === O4 && (l = new Map(u.map((g) => [g[0]?.rowId, g]))));
	}
	return u;
}
function Yg(e) {
	return e.length >= x4 ? R4(e) : A4(e);
}
function D1(e) {
	let n = 0;
	for (const { length: i } of e) i > n && (n = i);
	return n;
}
function N4(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function M4(e, n, i) {
	const o = D1(e);
	for (const u of e)
		for (let l = 0; l < o; l += 1) {
			const f = u[l];
			if (!f || (i && f.disabled)) {
				const h = l === 0 && i ? ai(u) : u[l - 1];
				u[l] = h && n !== h.id && i ? h : N4(h?.rowId);
			}
		}
	return e;
}
function D4(e) {
	const n = Yg(e),
		i = D1(n),
		o = [];
	for (let u = 0; u < i; u += 1)
		for (const l of n) {
			const f = l[u];
			f && o.push({ ...f, rowId: f.rowId ? `${u}` : void 0 });
		}
	return o;
}
function z1(e = {}) {
	const n = e.store?.getState(),
		i = E4(e),
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
					focusLoop: j = y.focusLoop,
					focusWrap: M = y.focusWrap,
					renderedItems: A = y.renderedItems,
					rtl: N = y.rtl,
				} = b,
				D = p === "up" || p === "down",
				z = p === "next" || p === "down",
				O = z ? N && !D : !N || D,
				U = x && !E;
			if (!E && !M && !w && T != null && (!D || (!U && !A.some((L) => L.rowId != null)))) {
				let L = -1;
				if (A === y.renderedItems) {
					const K = A[0];
					if (K && i.item(K.id) === K) {
						const se = i.item(T);
						se?.id === T && (L = A.indexOf(se));
					}
				}
				L === -1 && (L = A.findIndex((K) => K.id === T));
				const ee = A[L];
				if (ee) {
					const K = O ? -1 : 1,
						se = sw({ items: A, fromIndex: L + K, step: K, rowId: ee.rowId, excludeId: T });
					return se !== void 0
						? se
						: j && (D ? j !== "horizontal" : j !== "vertical")
							? sw({ items: A, fromIndex: K === 1 ? 0 : A.length - 1, step: K, rowId: ee.rowId, excludeId: T })
							: void 0;
				}
			}
			let H = D ? t_(M4(Yg(A), T, U)) : A;
			if (((H = O ? n_(H) : H), (H = D ? D4(H) : H), T == null)) return ai(H)?.id;
			const re = H.find((L) => L.id === T);
			if (!re) return ai(H)?.id;
			const R = H.some((L) => L.rowId),
				q = H.indexOf(re),
				P = H.slice(q + 1),
				F = ow(P, re.rowId);
			if (E) {
				const L = T4(F, T);
				return (L.slice(E)[0] || L[L.length - 1])?.id;
			}
			const Y = j && (D ? j !== "horizontal" : j !== "vertical"),
				B = R && M && (D ? M !== "horizontal" : M !== "vertical"),
				te = z ? (!R || D) && Y && w : D ? w : !1;
			if (Y) return ai(M1(B && !te ? H : ow(H, re.rowId), T, te), T)?.id;
			if (B) {
				const L = ai(te ? F : P, T);
				return te ? L?.id || null : L?.id;
			}
			const ne = ai(F, T);
			return !ne && te ? null : ne?.id;
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
		last: () => C4(h.getState().renderedItems)?.id,
		next: (p) => g("next", p),
		previous: (p) => g("previous", p),
		down: (p) => g("down", p),
		up: (p) => g("up", p),
	};
}
var z4 = M1,
	I4 = ai,
	j4 = Yg,
	Wc = new WeakSet();
function k4(e) {
	Zn(e) === e && (Wc.add(e), queueMicrotask(() => Wc.delete(e)));
}
function q4(e) {
	Wc.delete(e);
}
function L4(e, n) {
	const { virtualFocus: i, compositeElement: o } = e.getState();
	if (!i || !o || !yr(o)) {
		n();
		return;
	}
	const u = o.scrollLeft,
		l = o.scrollTop;
	(n(), (o.scrollLeft = u), (o.scrollTop = l));
}
function I1(e) {
	const n = e.getState();
	return "contentElement" in n ? n.contentElement : null;
}
function j1(e) {
	const { compositeElement: n } = e.getState(),
		i = ka(n);
	return i ? (n?.contains(i) || $i(e, i) ? !0 : !!I1(e)?.contains(i)) : !1;
}
function U4({
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
		x = ka(T),
		j = u ? l || x : null,
		M = !!T?.contains(x),
		A = (Y) => {
			if (!j) return !0;
			const B = ka(j);
			return B === j || B === Y ? !0 : j1(e);
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
			const te = I1(e);
			if (!te?.contains(B)) return !1;
			const { compositeElement: ne } = Y;
			return !ne || te.contains(ne) ? !1 : $m(B);
		},
		z = (Y) => {
			const B = Aa(e, g ?? (n === void 0 ? Y.activeId : n));
			return B?.element?.isConnected ? ((g = B.id), B.element) : null;
		};
	let O, U, H;
	const re = () => {
		((y = !0), O?.(), U?.(), H?.());
	};
	let R = !1;
	const q = () => {
			R || ((R = !0), h?.());
		},
		P = () => {
			if ((U?.(), !y)) return (q(), re());
		},
		F = () => {
			if (y) return;
			const Y = e.getState();
			if (N(Y)) return P();
			let B = !1;
			if (m) {
				if (!m.isConnected && ((B = p && !b && Zn(m) === Ke(m).body), (m = z(Y)), !m)) return P();
			} else if (((m = z(Y)), !m)) return;
			if (B) p = !1;
			else if (!A(m)) return P();
			const te = i && M && D(Y, m);
			if (te) {
				const { activeId: L } = Y;
				if (L != null && L !== g) return P();
			}
			if (i && !p && !te) {
				((p = !0), q(), (b = !1));
				const L = m;
				O?.();
				const ee = () => {
						b = !Wc.has(L);
					},
					K = () => {
						b = !1;
					};
				if (
					(L.addEventListener("blur", ee),
					L.addEventListener("focus", K),
					(O = () => {
						(L.removeEventListener("blur", ee), L.removeEventListener("focus", K));
					}),
					L4(e, () => {
						L.focus({ preventScroll: !0 });
					}),
					y)
				)
					return;
			}
			if (o && !m.hasAttribute("data-autofocus")) return te ? void 0 : P();
			if (!$m(m) || ("unstable_placing" in Y && Y.unstable_placing)) return;
			te || P();
			const ne = m;
			if (
				(U?.(),
				(U = b4({
					element: ne,
					isCurrent: () => {
						const L = e.getState();
						return N(L) || L.activeId !== g ? !1 : A(ne);
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
		Object.assign(re, { settle: P })
	);
}
function k1(e) {
	const n = (0, _.useRef)(null),
		i = (0, _.useRef)(e),
		o = (0, _.useCallback)(() => {
			(n.current?.(), (n.current = null));
		}, []),
		u = (0, _.useCallback)(
			(l) => {
				if (!e || i.current !== e) return;
				(n.current?.settle(), (n.current = null));
				const f = U4({ store: e, ...l });
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
function Aa(e, n) {
	return (n && e.item(n)) || null;
}
function V4(e, n = !1) {
	if (yr(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = Ke(e).getSelection();
		(i?.selectAllChildren(e), n && i?.collapseToEnd());
	}
}
var Gm = Symbol("FOCUS_SILENTLY");
function B4(e) {
	((e[Gm] = !0), e.focus({ preventScroll: !0 }));
}
function P4(e) {
	const n = e[Gm];
	return (delete e[Gm], n);
}
function $i(e, n, i) {
	if (!n || n === i) return !1;
	const o = e.item(n.id);
	return !(!o || (i && o.element === i));
}
var $4 = Symbol("cancelled"),
	Cm = new WeakMap();
function Go(e, n) {
	const i = e.getState,
		o = Cm.get(i);
	if (o) return o;
	const u = n?.getState();
	if (n && u && zn(u, "moves") && zn(u, "activeId")) {
		const f = Go(n);
		return (Cm.set(i, f), f);
	}
	const l = { consumedBy: null, targetId: e.getState().activeId };
	return (
		Cm.set(i, l),
		nt(e, ["moves", "activeId"], (f, h) => {
			if (f.moves !== h.moves) {
				((l.consumedBy = null), (l.targetId = f.activeId));
				return;
			}
			f.activeId !== h.activeId && (l.targetId = $4);
		}),
		l
	);
}
var H4 = "div";
function Z4(e) {
	return e.some((n) => !!n.rowId);
}
function F4(e) {
	const n = e.target;
	return n && !yr(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function Q4(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function uw(e, n, i) {
	return Ae((o) => {
		if ((n?.(o), o.defaultPrevented || o.isPropagationStopped() || !cn(o) || Q4(o) || F4(o))) return;
		const u = e.getState(),
			l = Aa(e, u.activeId)?.element;
		if (!l) return;
		const { view: f, ...h } = o;
		(l !== i?.current && l.focus({ preventScroll: !0 }),
			$I(l, o.nativeEvent, h) || o.preventDefault(),
			o.currentTarget.contains(l) && o.stopPropagation());
	});
}
function Y4(e) {
	return I4(t_(n_(j4(e))));
}
function lw(e, n) {
	const { consumedBy: i } = Go(e);
	return !i || i === n;
}
function cw(e, n, i) {
	e.getState().moves === i && (Go(e).consumedBy = n);
}
var K4 = Cu(function ({ store: n, focusOnMove: i, previousElementRef: o, present: u, scrollIntoView: l }) {
		const f = pe(n, "moves"),
			h = pe(n, "compositeElement"),
			m = (0, _.useMemo)(() => ({}), [n.getState]);
		return (
			(0, _.useEffect)(() => {
				const g = Go(n);
				if (!f || !i || !lw(n, m)) return;
				const { activeId: p } = n.getState();
				if (p != null && p === g.targetId)
					return u({ id: p, requireFocus: j1(n), focus: !0, scrollIntoView: l, onConsume: () => cw(n, m, f) });
			}, [n, f, i, h, u, l, m]),
			Ne(() => {
				const g = Go(n);
				if (!f || !h || !lw(n, m)) return;
				const { activeId: p } = n.getState();
				if (p !== null || p !== g.targetId) return;
				cw(n, m, f);
				const b = o.current;
				((o.current = null),
					b && Lo(b, { relatedTarget: h }),
					ts(h) ||
						(ln(h) && h.scrollIntoView({ block: "nearest", inline: "nearest" }), h.focus({ preventScroll: !0 })));
			}, [n, f, h, o, m]),
			null
		);
	}),
	Kg = We(function ({
		store: n,
		composite: i = !0,
		focusOnMove: o = i,
		moveOnKeyPress: u = !0,
		unstable_scrollIntoView: l,
		...f
	}) {
		const h = f4();
		((n = n || h), Zt(n, !1));
		const m = (0, _.useRef)(null),
			g = (0, _.useRef)(null),
			p = k1(n),
			b = (0, _.useRef)(void 0);
		Ne(() => {
			if (!i) return;
			let R = null,
				q = !1,
				P = !1;
			const F = () => {
					if (((q = !1), P)) return;
					const { activeId: te, compositeElement: ne } = n.getState(),
						L = !!ne && ne === m.current && ka(ne) === ne,
						ee = n.item(te)?.element,
						K = L && ee?.isConnected && ee !== ne ? ee : null;
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
		const [, y] = O_(i ? n.setCompositeElement : null),
			w = pe(n, "virtualFocus"),
			E = pe(n, i && w ? ["activeId"] : [], (R) => (i && w ? R.activeId : null));
		Ne(() => {
			if (!n || !i || !w) return;
			const R = g.current;
			if (((g.current = null), !R)) return;
			const q = Aa(n, E)?.element || Zn(R);
			q !== R && Lo(R, { relatedTarget: q });
		}, [n, E, w, i]);
		const T = uw(n, f.onKeyDownCapture, g),
			x = uw(n, f.onKeyUpCapture, g),
			j = f.onFocusCapture,
			M = Ae((R) => {
				if ((b.current?.(), j?.(R), R.defaultPrevented || !n)) return;
				const { virtualFocus: q } = n.getState();
				if (!q) return;
				const P = R.relatedTarget,
					F = P4(R.currentTarget);
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
			z = Ae((R) => {
				if ((b.current?.(), D?.(R), R.defaultPrevented || !n)) return;
				const { virtualFocus: q, activeId: P, compositeElement: F } = n.getState();
				if (!q || R.currentTarget !== F) return;
				const Y = Aa(n, P)?.element,
					B = R.relatedTarget,
					te = $i(n, B),
					ne = g.current;
				((g.current = null),
					cn(R) && te
						? (B === Y ? ne && ne !== B && Lo(ne, R) : Y ? Lo(Y, R) : ne && Lo(ne, R), R.stopPropagation())
						: !$i(n, R.target) && Y && Lo(Y, R));
			}),
			O = f.onKeyDown,
			U = st(u),
			H = Ae((R) => {
				if ((O?.(R), R.nativeEvent.isComposing || R.defaultPrevented || !n || !cn(R))) return;
				const { orientation: q, items: P, renderedItems: F, activeId: Y, rtl: B } = n.getState(),
					te = Aa(n, Y);
				if (te?.element?.isConnected) return;
				const ne = te && Y != null,
					L = ne ? P : F,
					ee = q !== "horizontal",
					K = q !== "vertical",
					se = Z4(L);
				if (
					(R.key === "ArrowLeft" || R.key === "ArrowRight" || R.key === "Home" || R.key === "End") &&
					yr(R.currentTarget)
				)
					return;
				const W = {
					ArrowUp: (se || ee) && (() => (ne ? n.up({ activeId: Y, renderedItems: L }) : se ? Y4(F)?.id : n?.last())),
					ArrowRight: (se || K) && (() => (ne ? n.next({ activeId: Y, renderedItems: L }) : B ? n.last() : n.first())),
					ArrowDown: (se || ee) && (() => (ne ? n.down({ activeId: Y, renderedItems: L }) : n.first())),
					ArrowLeft:
						(se || K) && (() => (ne ? n.previous({ activeId: Y, renderedItems: L }) : B ? n.first() : n.last())),
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[R.key];
				if (W) {
					const fe = W();
					if (fe !== void 0) {
						if (!U(R)) return;
						(R.preventDefault(), n.move(fe));
					}
				}
			});
		((f = Pt(
			f,
			(R) =>
				(0, S.jsxs)(ju, {
					value: n,
					children: [
						R,
						i && (0, S.jsx)(K4, { store: n, focusOnMove: o, previousElementRef: g, present: p, scrollIntoView: l }),
					],
				}),
			[n, i, o, p],
		)),
			(f = {
				"aria-activedescendant": pe(n, i && w ? ["items"] : [], () => {
					if (n && i && w) return Aa(n, E)?.id;
				}),
				...f,
				ref: It(m, y, f.ref),
				onKeyDownCapture: T,
				onKeyUpCapture: x,
				onFocusCapture: M,
				onFocus: N,
				onBlurCapture: z,
				onKeyDown: H,
			}));
		const re = pe(n, i && !w ? ["activeId"] : [], (R) => i && (w || R.activeId === null));
		return ((f = Tu({ focusable: re, ...f })), f);
	}),
	ML = Fe(function (n) {
		const i = Kg(n);
		return Je(H4, i);
	}),
	G4 = "div",
	fw = new WeakMap();
function X4(e) {
	let n = fw.get(e);
	return (n || ((n = { chars: "", cleanupTimeout: 0 }), fw.set(e, n)), n);
}
function _c(e) {
	e.chars = "";
}
function J4(e, n) {
	const i = e.target;
	return i && yr(i)
		? !1
		: e.key === " " && n.chars.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function W4(e, n) {
	if (cn(e)) return !0;
	const i = e.target;
	return i ? n.some((o) => o.element === i) : !1;
}
function e3(e) {
	return e.filter((n) => !n.disabled);
}
function Rc(e, n) {
	const i = e.typeaheadText ?? (e.element?.textContent || e.children || ("value" in e && e.value));
	return i ? Bm(i).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function t3({ activeId: e, char: n, items: i, typeaheadState: o }) {
	if (!e) return i;
	const u = i.find((f) => f.id === e);
	if (!u || !Rc(u, n)) return i;
	const { chars: l } = o;
	return l !== n && Rc(u, l)
		? i
		: ((o.chars = n),
			z4(
				i.filter((f) => Rc(f, n)),
				e,
			).filter((f) => f.id !== e));
}
var Of = We(function ({ store: n, typeahead: i = !0, ...o }) {
		const u = Cf();
		((n = n || u), Zt(n, !1));
		const l = o.onKeyDownCapture,
			f = Ae((h) => {
				if ((l?.(h), h.defaultPrevented || !i || !n)) return;
				const m = X4(n);
				if (!J4(h, m)) return _c(m);
				const { renderedItems: g, items: p, activeId: b } = n.getState();
				let y = e3(p.length > g.length ? p : g);
				if (!W4(h, y)) return _c(m);
				(h.preventDefault(),
					window.clearTimeout(m.cleanupTimeout),
					(m.cleanupTimeout = window.setTimeout(() => {
						_c(m);
					}, 500)));
				const w = h.key.toLowerCase();
				((m.chars += w), (y = t3({ activeId: b, char: w, items: y, typeaheadState: m })));
				const E = y.find((T) => Rc(T, m.chars));
				E ? n.move(E.id) : _c(m);
			});
		return ((o = { ...o, onKeyDownCapture: f }), lf(o));
	}),
	DL = Fe(function (n) {
		const i = Of(n);
		return Je(G4, i);
	}),
	n3 = "div";
function r3({ store: e, ...n }) {
	const [i, o] = (0, _.useState)(void 0),
		u = n["aria-label"],
		l = pe(e, "disclosureElement"),
		f = pe(e, "contentElement");
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
var q1 = We(function ({ store: n, alwaysVisible: i, composite: o, ...u }) {
		const l = xf();
		((n = n || l), Zt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			g = Ur(u.id),
			p = u.onKeyDown,
			b = pe(n, ["placement"], (D) => Vg(D.placement)),
			y = pe(n, ["orientation"], (D) => (D.orientation === "both" ? void 0 : D.orientation)),
			w = y !== "vertical",
			E = pe(h, ["orientation"], (D) => !!D && D.orientation !== "vertical"),
			T = Ae((D) => {
				if ((p?.(D), D.defaultPrevented)) return;
				const z = D.target;
				if (!(!cn(D) && !$i(n, z))) {
					if (Uc(z)) {
						const O = Vc(z),
							U = D.key === "ArrowLeft" || D.key === "ArrowUp",
							H = D.key === "ArrowRight" || D.key === "ArrowDown";
						if ((U && O.start !== 0) || (H && O.end !== s_(z).length)) return;
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
							U = O?.();
						U !== void 0 && (D.stopPropagation(), D.preventDefault(), h.move(U));
					}
				}
			});
		u = Pt(u, (D) => (0, S.jsx)(y4, { value: n, children: D }), [n]);
		const x = r3({ store: n, ...u }),
			j = pe(n, "mounted"),
			M = Ru(j, u.hidden, i),
			A = M ? { ...u.style, display: "none" } : u.style;
		((u = Pt(u, (D) => (0, S.jsx)(N1.Provider, { value: M, children: D }), [M])),
			(u = {
				"aria-labelledby": x,
				hidden: M,
				...u,
				id: g,
				ref: It(g ? n.setContentElement : null, u.ref),
				style: A,
				onKeyDown: T,
			}));
		const N = !!n.combobox;
		return (
			(o = o ?? !N),
			o && (u = { role: "menu", "aria-orientation": y, ...u }),
			(u = Kg({ store: n, composite: o, ...u })),
			(u = Of({ store: n, typeahead: !N, ...u })),
			u
		);
	}),
	zL = Fe(function (n) {
		const i = q1(n);
		return Je(n3, i);
	}),
	i3 = "div";
function a3(e, n) {
	const i = ka(e);
	return !i || !_g(i, e) || !ln(i)
		? !1
		: i !== n.compositeElement
			? !0
			: n.renderedItems.some((o) => o.id === n.activeId && !o.disabled);
}
var o3 = We(function ({
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
			j = T ? !1 : i;
		p = { ...p, ref: It(y, p.ref) };
		const { "aria-labelledby": M, ...A } = q1({ store: n, alwaysVisible: h, ...p });
		p = A;
		const [N, D] = (0, _.useState)(),
			z = (0, _.useRef)(!0),
			O = pe(n, "open"),
			U = pe(n, ["autoFocusOnShow", "initialFocus", "renderedItems", "compositeElement"], (L) => {
				if (!L.autoFocusOnShow) return;
				const ee = (K) => !K.disabled && !!K.element;
				switch (L.initialFocus) {
					case "first":
						return L.renderedItems.find(ee)?.element || null;
					case "last":
						for (let K = L.renderedItems.length - 1; K >= 0; K -= 1) {
							const se = L.renderedItems[K];
							if (se && ee(se)) return se.element;
						}
						return null;
					default:
						return L.compositeElement;
				}
			});
		(0, _.useEffect)(() => {
			let L = !1;
			const ee = y.current,
				K = !z.current && !!ee && a3(ee, n.getState());
			return (
				(z.current = !O || (U === null && !K)),
				D((se) => {
					if (L) return;
					if (j && O && U === void 0) return se;
					if (U === void 0) return;
					if (U && U === se?.current) return se;
					if (K && se) return ((se.current = U), se);
					const xe = (0, _.createRef)();
					return ((xe.current = U), xe);
				}),
				() => {
					L = !0;
				}
			);
		}, [n, j, O, U]);
		const H = !!N || !!p.initialFocus || j,
			re = l === !1 ? !1 : H && l,
			R = pe(n, ["disclosureElement", "anchorElement"], (L) => L.disclosureElement || L.anchorElement),
			q = pe(n, ["disclosureElement", "contentElement"], (L) => {
				const { disclosureElement: ee, contentElement: K } = L;
				return !ee?.isConnected || l1(ee) || K?.contains(ee) ? null : ee;
			}),
			P = j ? q : null,
			F = (0, _.useMemo)(() => [g, P], [g, P]),
			Y = pe(n.combobox || n, "contentElement"),
			B = pe(w?.combobox || w, "contentElement"),
			te = (0, _.useMemo)(() => {
				if (!B || !Y) return;
				const L = Y.getAttribute("role"),
					ee = B.getAttribute("role");
				if (!((ee === "menu" || ee === "menubar") && L === "menu")) return B;
			}, [Y, B]);
		te !== void 0 && (p = { preserveTabOrderAnchor: te, ...p });
		const ne = x1({ hideOnEscape: u, onClose: p.onClose, onEscapeClose: () => w?.hideAll() });
		return (
			(p = O1({
				store: n,
				alwaysVisible: h,
				initialFocus: N,
				autoFocusOnShow: re,
				finalFocus: R,
				...p,
				hideOnEscape: ne.hideOnEscape,
				onClose: ne.onClose,
				hideOnHoverOutside(L) {
					const ee = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(L) : (f ?? (T ? !0 : x ? (ee ? !Hi(ee) : !0) : !1)))
						? L.defaultPrevented || !T || !ee || (J2(ee, "mouseout", L), !Hi(ee))
							? !0
							: (requestAnimationFrame(() => {
									Hi(ee) || n?.hide();
								}),
								!1)
						: !1;
				},
				getPersistentElements() {
					const L = m?.() || [];
					return !j || !q ? L : [...L, q];
				},
				unstable_treeSnapshotKey: F,
				modal: j,
				portal: o,
				backdrop: T ? !1 : p.backdrop,
			})),
			(p = { "aria-labelledby": M, ...p }),
			p
		);
	}),
	s3 = Nu(
		Fe(function (n) {
			const i = o3(n);
			return Je(i3, i);
		}),
		xf,
	);
function u3(e, n, i) {
	return (ns(n, [i.store, n]), Dt(e, i, "items", "setItems"), e);
}
function l3(e) {
	return { id: Ur(e.id), ...e };
}
function L1(e, n, i) {
	((e = u3(e, n, i)), Go(e, i.store), Dt(e, i, "activeId", "setActiveId"));
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
function Ha(e) {
	const { render: n, type: i } = e;
	return n || i !== void 0 ? e : { ...e, type: "button" };
}
var c3 = "button";
function dw(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? ja(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? ja(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var f3 = Symbol("command"),
	Gg = We(function ({ clickOnEnter: n = !0, clickOnSpace: i = !0, ...o }) {
		const u = (0, _.useRef)(null),
			[l, f] = (0, _.useState)(!1),
			h = o.type;
		(0, _.useEffect)(() => {
			const N = u.current;
			if (!N) return;
			const D = ja(N);
			(h !== void 0 && D && N.type === "button") || f(D);
		}, [h]);
		const [m, g] = (0, _.useState)(!1),
			p = (0, _.useRef)(!1),
			b = Pa(o),
			[y, w] = Og(o, f3, !0);
		Ne(() => {
			b && ((p.current = !1), g(!1));
		}, [b]);
		const E = o.onKeyDown,
			T = Ae((N) => {
				E?.(N);
				const D = N.currentTarget;
				if (N.defaultPrevented || y || b || !cn(N) || yr(D) || D.isContentEditable) return;
				const z = n && N.key === "Enter",
					O = i && N.key === " ",
					U = N.key === "Enter" && !n,
					H = N.key === " " && !i;
				if (U || H) {
					N.preventDefault();
					return;
				}
				if (z || O) {
					const re = dw(N);
					if (z) {
						if (!re) {
							N.preventDefault();
							const { view: R, ...q } = N,
								P = () => TS(D, q);
							K2() ? Bc(D, "keyup", P) : queueMicrotask(P);
						}
					} else O && ((p.current = !0), re || (N.preventDefault(), g(!0)));
				}
			}),
			x = o.onKeyUp,
			j = Ae((N) => {
				if ((x?.(N), y)) return;
				const D = i && N.key === " ";
				if (!p.current || !D) return;
				const z = dw(N);
				if (((p.current = !1), z || g(!1), N.defaultPrevented || !cn(N) || b || N.metaKey || z)) return;
				N.preventDefault();
				const O = N.currentTarget,
					{ view: U, ...H } = N;
				queueMicrotask(() => TS(O, H));
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
				ref: It(u, o.ref),
				onKeyDown: T,
				onKeyUp: j,
				onBlur: A,
			}),
			(o = Tu(o)),
			o
		);
	}),
	IL = Fe(function (n) {
		const i = Gg(Ha(n));
		return Je(c3, i);
	}),
	U1 = "button",
	V1 = We(function (n) {
		const i = (0, _.useRef)(null),
			o = TI(i, U1),
			[u, l] = (0, _.useState)(() => !!o && ja({ tagName: o, type: n.type }));
		return (
			(0, _.useEffect)(() => {
				i.current && l(ja(i.current));
			}, []),
			(n = { role: !u && o !== "a" ? "button" : void 0, ...n, ref: It(i, n.ref) }),
			(n = Gg(n)),
			n
		);
	}),
	jL = Fe(function (n) {
		const i = V1(Ha(n));
		return Je(U1, i);
	}),
	d3 = "button",
	h3 = Symbol("disclosure"),
	B1 = We(function ({ store: n, toggleOnClick: i = !0, ...o }) {
		const u = Ng();
		((n = n || u), Zt(n, !1));
		const l = (0, _.useRef)(null),
			[f, h] = (0, _.useState)(!1),
			m = pe(n, "disclosureElement"),
			g = pe(n, "open"),
			p = (0, _.useCallback)(
				(x) => {
					const j = l.current;
					if (((l.current = x), x)) {
						n?.getState().disclosureElement?.isConnected || n.setDisclosureElement(x);
						return;
					}
					n?.getState().disclosureElement === j && n.setDisclosureElement(null);
				},
				[n],
			);
		(0, _.useEffect)(() => {
			let x = m === l.current;
			(m?.isConnected || (n?.setDisclosureElement(l.current), (x = !0)), h(g && x));
		}, [m, n, g]);
		const b = o.onClick,
			y = st(i),
			[w, E] = Og(o, h3, !0),
			T = Ae((x) => {
				(b?.(x), !x.defaultPrevented && (w || (y(x) && (n?.setDisclosureElement(x.currentTarget), n?.toggle()))));
			});
		return (
			(o = {
				"aria-expanded": f,
				"aria-controls": pe(n, "contentElement")?.id,
				...E,
				...o,
				ref: It(p, o.ref),
				onClick: T,
			}),
			(o = V1(o)),
			o
		);
	}),
	kL = Fe(function (n) {
		const i = B1(Ha(n));
		return Je(d3, i);
	}),
	m3 = "button",
	P1 = We(function ({ store: n, ...i }) {
		const o = Au();
		((n = n || o), Zt(n, !1));
		const u = pe(n, "contentElement");
		return ((i = { "aria-haspopup": Eu(u, "dialog"), ...i }), (i = B1({ store: n, ...i })), i);
	}),
	qL = Fe(function (n) {
		const i = P1(Ha(n));
		return Je(m3, i);
	}),
	g3 = "button",
	$1 = We(function ({ store: n, ...i }) {
		const o = Ug();
		return (
			(n = n || o),
			Zt(n, !1),
			(i = Pt(i, (u) => (0, S.jsx)(pf, { value: n, children: u }), [n])),
			(i = P1({ store: n, ...i })),
			i
		);
	}),
	LL = Fe(function (n) {
		const i = $1(Ha(n));
		return Je(g3, i);
	}),
	v3 = We(function ({
		store: n,
		showOnHover: i = !0,
		unstable_showOnHoverWhenDisabled: o = !0,
		setAnchorElement: u = !1,
		...l
	}) {
		const f = Pa(l),
			h = l.focusable !== !1,
			m = (0, _.useRef)(null),
			g = (0, _.useRef)(0),
			p = Ae((A) => (f && !h ? !0 : fI(A)));
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
			y = st(i),
			w = st(o),
			E = Ag(),
			T = Ae((A) => {
				if ((b?.(A), A.defaultPrevented || g.current || !E())) return;
				const N = A.currentTarget;
				if (p(N) || ((f || a_(N)) && !w(A)) || !y(A)) return;
				(u && n.setAnchorElement(N), n.setDisclosureElement(N));
				const { showTimeout: D, timeout: z } = n.getState(),
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
					U = D ?? z;
				U === 0 ? O() : (g.current = window.setTimeout(O, U));
			}),
			x = l.onClick,
			j = Ae((A) => {
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
		return ((l = { ...l, ref: It(M, l.ref), onMouseMove: T, onClick: j }), (l = Tu(l)), l);
	}),
	y3 = "button";
function p3(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function hw(e, n) {
	return !!e?.some((i) => (!i.element || i.element === n ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var b3 = We(function ({
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
			w = Pa(f),
			E = (q) => w || a_(q),
			T = () => {
				const q = m.current;
				q && (n?.setDisclosureElement(q), n?.show());
			},
			x = f.onFocus,
			j = Ae((q) => {
				if (
					(x?.(q),
					E(q.currentTarget) || q.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !p) || !y)
				)
					return;
				const { items: P } = p.getState();
				hw(P, q.currentTarget) && T();
			}),
			M = pe(n, ["placement"], (q) => Vg(q.placement)),
			A = f.onKeyDown,
			N = Ae((q) => {
				if ((A?.(q), E(q.currentTarget) || q.defaultPrevented)) return;
				const P = p3(q, M);
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
			z = Ae((q) => {
				if ((D?.(q), q.defaultPrevented || !n)) return;
				const P = !q.detail,
					{ open: F } = n.getState();
				((!F || P) && ((!b || P) && n.setAutoFocusOnShow(!0), n.setInitialFocus(P ? "first" : "container")), b && T());
			});
		((f = Pt(f, (q) => (0, S.jsx)(R1, { value: n, children: q }), [n])),
			b && (f = { ...f, render: (0, S.jsx)(Yc.div, { render: f.render }) }));
		const O = Ur(f.id),
			U = pe(g?.combobox || g, "contentElement"),
			H = b || y ? l_(U, "menuitem") : void 0,
			re = pe(n, "contentElement"),
			R = !!n.combobox;
		return (
			(f = {
				role: H,
				"aria-haspopup": Eu(re, R ? "dialog" : "menu"),
				...f,
				id: O,
				ref: It(m, f.ref),
				onFocus: j,
				onKeyDown: N,
				onClick: z,
			}),
			(f = v3({
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
							return y && hw(Y);
						})()
					)
						return !1;
					const F = y ? p : g;
					return (F && F.setActiveId(q.currentTarget.id), !0);
				},
			})),
			(f = $1({ store: n, toggleOnClick: !b, focusable: i, accessibleWhenDisabled: o, ...f })),
			(f = Of({ store: n, typeahead: y, ...f })),
			f
		);
	}),
	S3 = Fe(function (n) {
		const i = b3(n);
		return Je(y3, Ha(i));
	}),
	w3 = "div";
function E3(e) {
	const n = e.relatedTarget;
	return Mn(n) ? ht(e.currentTarget, n) : !1;
}
var Xm = Symbol("composite-hover");
function _3(e) {
	const { relatedTarget: n } = e;
	if (!Mn(n)) return !1;
	let i = n;
	do {
		if (zn(i, Xm) && i[Xm]) return !0;
		i = i.parentElement;
	} while (i);
	return !1;
}
var Xg = We(function ({ store: n, focusOnHover: i = !0, blurOnHoverEnd: o = !!i, ...u }) {
		const l = Cf();
		((n = n || l), Zt(n, !1));
		const f = Ag(),
			h = u.onMouseMove,
			m = st(i),
			g = Ae((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!Hi(E.currentTarget)) {
						const T = n?.getState().compositeElement;
						T && !ts(T) && T.focus({ preventScroll: !0 });
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			p = u.onMouseLeave,
			b = st(o),
			y = Ae((E) => {
				(p?.(E),
					!E.defaultPrevented &&
						f() &&
						(E3(E) ||
							_3(E) ||
							(m(E) && b(E) && (n?.setActiveId(null), n?.getState().compositeElement?.focus({ preventScroll: !0 })))));
			}),
			w = (0, _.useCallback)((E) => {
				E && (E[Xm] = !0);
			}, []);
		return ((u = { ...u, ref: It(w, u.ref), onMouseMove: g, onMouseLeave: y }), u);
	}),
	UL = Cu(
		Fe(function (n) {
			const i = Xg(n);
			return Je(w3, i);
		}),
	),
	C3 = "div",
	H1 = We(function ({ store: n, shouldRegisterItem: i = !0, getItem: o = r_, element: u, ...l }) {
		const f = u4();
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
			(l = { ...l, ref: It(m, l.ref) }),
			l
		);
	}),
	VL = Fe(function (n) {
		const i = H1(n);
		return Je(C3, i);
	}),
	T3 = "button";
function x3(e) {
	return Uc(e) ? !0 : e.tagName === "INPUT" && !ja(e);
}
function O3(e, n = !1) {
	const i = e.clientHeight,
		{ top: o } = e.getBoundingClientRect(),
		u = Math.max(i * 0.875, i - 40) * 1.5,
		l = n ? i - u + o : u + o;
	return e.tagName === "HTML" ? l + e.scrollTop : l;
}
function A3(e, n = !1) {
	const { top: i } = e.getBoundingClientRect();
	return n ? i + e.clientHeight : i;
}
function mw(e, n, i, o = !1) {
	if (!n || !i) return;
	const { renderedItems: u } = n.getState(),
		l = pg(e);
	if (!l) return;
	const f = O3(l, o);
	let h, m;
	for (let g = 0; g < u.length; g += 1) {
		const p = h;
		if (((h = i(g)), !h)) break;
		if (h === p) continue;
		const b = Aa(n, h)?.element;
		if (!b) continue;
		const y = A3(b, o) - f,
			w = Math.abs(y);
		if ((o && y <= 0) || (!o && y >= 0)) {
			m !== void 0 && m < w && (h = p);
			break;
		}
		m = w;
	}
	return h;
}
function R3(e, n) {
	return cn(e) ? !1 : $i(n, e.target);
}
var Jg = We(function ({
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
		const w = cI(b),
			E = Ur(b.id),
			T = (0, _.useRef)(null),
			x = (0, _.useRef)(null),
			j = (0, _.useCallback)((W) => {
				const fe = x.current;
				(!W && fe && k4(fe), W && q4(W), (x.current = W));
			}, []),
			M = (0, _.useContext)(h4),
			A = Pa(b),
			N = A && !w,
			D = A && b.focusable === !1,
			z = b.shouldRegisterItem,
			O = (W) => {
				if (i) return i;
				if (W && M?.compositeElement && M.compositeElement === W.compositeElement) return M.id;
			},
			{
				rowId: U,
				compositeElement: H,
				ariaSetSize: re,
				ariaPosInSet: R,
			} = Qc(n, ["compositeElement", "renderedItems"], {
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
			{ isActiveItem: q, isTabbable: P } = Qc(
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
					const fe = (W.element ? dI(W.element) : void 0) ?? (D || N),
						Ee = { ...W, id: E || W.id, rowId: U, disabled: fe, children: W.element?.textContent, typeaheadText: h };
					return f ? f(Ee) : Ee;
				},
				[E, U, D, N, h, f],
			),
			Y = b.onFocus,
			B = (0, _.useRef)(!1),
			te = (0, _.useRef)(null),
			ne = k1(n),
			L = Ae((W) => {
				if ((Y?.(W), W.defaultPrevented || X2(W) || !E || !n || R3(W, n))) return;
				const { virtualFocus: fe, compositeElement: Ee } = n.getState();
				if ((n.setActiveId(E), Uc(W.currentTarget) && V4(W.currentTarget), !fe)) {
					cn(W) && n.item(E) && ne({ id: E, markedOnly: !0, requireFocus: !0, scrollIntoView: p });
					return;
				}
				if (!cn(W) || x3(W.currentTarget)) return;
				const _e = (Ge, ct) => {
					if (!ln(ct)) return;
					const mt = Ge === ct || $i(n, Ge);
					(n.item(E) && ne({ id: E, markedOnly: !0, requireFocus: !0, scrollIntoView: p }),
						(B.current = !0),
						mt ? B4(ct) : ct.focus({ preventScroll: !0 }));
				};
				if (Ee?.isConnected) {
					_e(W.relatedTarget, Ee);
					return;
				}
				if (z === !1) return;
				const { currentTarget: Ce, relatedTarget: ce } = W,
					ve = () => {
						(te.current?.(), (te.current = null));
					};
				(ve(),
					(te.current = di(n, null, () => {
						if (Zn(Ce) !== Ce) {
							ve();
							return;
						}
						const Ge = n.getState(),
							ct = Ge.compositeElement;
						ct?.isConnected && (ve(), Ge.virtualFocus && _e(ce, ct));
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
			se = b.onKeyDown,
			xe = st(o),
			ge = st(u),
			k = Ae((W) => {
				if ((se?.(W), W.defaultPrevented || !cn(W) || !n)) return;
				const { currentTarget: fe } = W,
					Ee = n.getState(),
					_e = !!n.item(E)?.rowId,
					Ce = Ee.orientation !== "horizontal",
					ce = Ee.orientation !== "vertical",
					ve = () => !!(_e || ce || !Ee.compositeElement || !yr(Ee.compositeElement)),
					Ge = {
						ArrowUp: (_e || Ce) && n.up,
						ArrowRight: (_e || ce) && n.next,
						ArrowDown: (_e || Ce) && n.down,
						ArrowLeft: (_e || ce) && n.previous,
						Home: () => {
							if (ve()) return !_e || W.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (ve()) return !_e || W.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => mw(fe, n, n?.up, !0),
						PageDown: () => mw(fe, n, n?.down),
					}[W.key];
				if (Ge) {
					if (Uc(fe)) {
						const mt = Vc(fe),
							_t = ce && W.key === "ArrowLeft",
							et = ce && W.key === "ArrowRight",
							Ue = Ce && W.key === "ArrowUp",
							Qe = Ce && W.key === "ArrowDown";
						if (et || Qe) {
							const { length: dn } = s_(fe);
							if (mt.end !== dn) return;
						} else if ((_t || Ue) && mt.start !== 0) return;
					}
					const ct = Ge();
					if (xe(W) || ct !== void 0) {
						if (!ge(W)) return;
						(W.preventDefault(), n.move(ct));
					}
				}
			}),
			ae = (0, _.useMemo)(() => ({ id: E, compositeElement: H }), [E, H]);
		return (
			(b = Pt(b, (W) => (0, S.jsx)(d4.Provider, { value: ae, children: W }), [ae])),
			(b = {
				"data-active-item": q || void 0,
				...b,
				id: E,
				ref: It(T, j, b.ref),
				tabIndex: P ? b.tabIndex : -1,
				onFocus: L,
				onBlurCapture: K,
				onKeyDown: k,
			}),
			(b = Gg(b)),
			(b = H1({ store: n, ...b, getItem: F, shouldRegisterItem: E ? z : !1 })),
			{ ...b, "aria-setsize": re, "aria-posinset": R }
		);
	}),
	BL = Cu(
		Fe(function (n) {
			const i = Jg(Ha(n));
			return Je(T3, i);
		}),
	),
	N3 = "div";
function M3(e, n, i) {
	if (!e) return !1;
	if (Hi(e)) return !0;
	const o = n
		?.find((l) => (l.element === i ? !1 : l.element?.getAttribute("aria-expanded") === "true"))
		?.element?.getAttribute("aria-controls");
	if (!o) return !1;
	const u = Ke(e).getElementById(o);
	return u ? (Hi(u) ? !0 : !!u.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var D3 = We(function ({
		store: n,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: o = !0,
		focusOnHover: u,
		blurOnHoverEnd: l,
		...f
	}) {
		const h = v4(!0),
			m = g4();
		((n = n || h || m), Zt(n, !1));
		const g = f.onClick,
			p = st(i),
			b = "hideAll" in n ? n.hideAll : void 0,
			y = !!b,
			w = Ae((x) => {
				if ((g?.(x), x.defaultPrevented || h_(x) || d_(x) || !b)) return;
				const j = x.currentTarget.getAttribute("aria-haspopup");
				(j && j !== "false") || (p(x) && b());
			}),
			E = pe(n, ["contentElement"], (x) => ("contentElement" in x ? x.contentElement : null)),
			T = (0, _.useContext)(N1);
		return (
			(f = { role: l_(E, "menuitem"), ...f, onClick: w }),
			(f = Jg({ store: n, preventScrollOnKeyDown: o, ...f, shouldRegisterItem: T ? !1 : f.shouldRegisterItem })),
			(f = Xg({
				store: n,
				...f,
				focusOnHover(x) {
					const j = () => (typeof u == "function" ? u(x) : (u ?? !0));
					if (!n || !j()) return !1;
					const { compositeElement: M, items: A } = n.getState();
					return y
						? (x.currentTarget.hasAttribute("aria-expanded") && x.currentTarget.focus({ preventScroll: !0 }), !0)
						: M3(M, A, x.currentTarget)
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
	z3 = Cu(
		Fe(function (n) {
			const i = D3(n);
			return Je(N3, i);
		}),
	),
	Z1 = (0, _.createContext)(null),
	Lu = Vr([d1, Tf], [pf, ju]),
	I3 = Lu.useContext,
	Wg = Lu.useScopedContext,
	Af = Lu.useProviderContext,
	PL = Lu.ContextProvider,
	j3 = Lu.ScopedContextProvider,
	k3 = (0, _.createContext)(void 0),
	q3 = (0, _.createContext)(!1),
	gw = (0, _.createContext)(null);
function F1({ popover: e, ...n } = {}) {
	const i = gf(
		n.store,
		Ig(e, [
			"arrowElement",
			"anchorElement",
			"contentElement",
			"popoverElement",
			"disclosureElement",
			"unstable_placing",
		]),
	);
	const o = i?.getState(),
		u = W_({ ...n, store: i }),
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
function Q1(e, n, i) {
	return (ns(n, [i.popover, n]), Dt(e, i, "placement"), e1(e, n, i));
}
function L3(e = {}) {
	const n = e.store?.getState(),
		i = F1({ ...e, placement: ke(e.placement, n?.placement, "bottom") }),
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
function U3(e, n, i) {
	return (Dt(e, i, "timeout"), Dt(e, i, "showTimeout"), Dt(e, i, "hideTimeout"), Q1(e, n, i));
}
function V3({ combobox: e, parent: n, menubar: i, ...o } = {}) {
	const u = !!i && !n,
		l = gf(
			o.store,
			U_(n, ["values"]),
			Ig(e, [
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
		m = z1({ ...o, store: l, orientation: ke(o.orientation, f.orientation, "vertical") }),
		g = L3({
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
function B3(e, n, i) {
	return (
		ns(n, [i.combobox, i.parent, i.menubar, n]),
		Dt(e, i, "values", "setValues"),
		Object.assign(U3(L1(e, n, i), n, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function P3(e = {}) {
	const n = A1(),
		i = m4(),
		o = Af();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : o,
	};
	const [u, l] = vf(V3, e);
	return B3(u, l, e);
}
function $3(e = {}) {
	const n = P3(e);
	return (0, S.jsx)(R1, { value: n, children: e.children });
}
var H3 = "hr",
	Y1 = We(function ({ orientation: n = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": n, ...i }), i);
	}),
	$L = Fe(function (n) {
		const i = Y1(n);
		return Je(H3, i);
	}),
	Z3 = "hr",
	K1 = We(function ({ store: n, orientation: i, ...o }) {
		const u = Cf();
		((n = n || u), Zt(n, !1));
		const l = pe(n, ["orientation"], (f) => i ?? (f.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((o = Y1({ ...o, orientation: l })), o);
	}),
	HL = Fe(function (n) {
		const i = K1(n);
		return Je(Z3, i);
	}),
	F3 = "hr",
	Q3 = We(function ({ store: n, ...i }) {
		const o = A1();
		return ((n = n || o), (i = K1({ store: n, ...i })), i);
	}),
	Y3 = Fe(function (n) {
		const i = Q3(n);
		return Je(F3, i);
	}),
	K3 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	G3 = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, i, o) => (o ? o.toUpperCase() : i.toLowerCase())),
	vw = (e) => {
		const n = G3(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	G1 = (...e) =>
		e
			.filter((n, i, o) => !!n && n.trim() !== "" && o.indexOf(n) === i)
			.join(" ")
			.trim(),
	X3 = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	J3 = {
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
	W3 = (0, _.forwardRef)(
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
					...J3,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: o ? (Number(i) * 24) / Number(n) : i,
					className: G1("lucide", u),
					...(!l && !X3(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([g, p]) => (0, _.createElement)(g, p)), ...(Array.isArray(l) ? l : [l])],
			),
	),
	ev = (e, n) => {
		const i = (0, _.forwardRef)(({ className: o, ...u }, l) =>
			(0, _.createElement)(W3, { ref: l, iconNode: n, className: G1(`lucide-${K3(vw(e))}`, `lucide-${e}`, o), ...u }),
		);
		return ((i.displayName = vw(e)), i);
	},
	eq = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	tq = ev("arrow-up", eq),
	nq = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	rq = ev("ellipsis", nq),
	iq = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	aq = ev("paperclip", iq),
	oq = (0, _.memo)(function (n) {
		const { channelName: i, items: o } = n;
		return (0, S.jsxs)($3, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(S3, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, S.jsx)(rq, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(s3, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: o.map((u) =>
						"separator" in u
							? (0, S.jsx)(Y3, { className: "ChannelRowMenu-separator" }, u.id)
							: (0, S.jsx)(
									z3,
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
	X1 = new WeakMap(),
	yw = new WeakMap(),
	pw = new WeakMap();
function Ws(e) {
	e.scrollIntoView({ block: "nearest", inline: "nearest" });
}
function sq(e, n) {
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
function uq(e, n) {
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
function J1(e) {
	if (!e) return Ws;
	const n = yw.get(e);
	if (n) return n;
	const i = (o) => {
		const { contentElement: u, moves: l, selectElement: f } = e.getState();
		if (!f || l !== X1.get(f) || !u?.contains(o)) return Ws(o);
		const h = sq(o, u);
		if (!h) return Ws(o);
		uq(o, h);
	};
	return (yw.set(e, i), i);
}
function lq(e) {
	const n = pw.get(e);
	if (n) return n;
	const i = {
		get current() {
			const { activeId: o, contentElement: u, moves: l, selectElement: f } = e.getState();
			if (!f) return null;
			const h = X1.get(f),
				m = h != null && l !== h,
				g = e.item(o)?.element;
			return m && g ? g : !u || u.querySelector("[data-autofocus=true],[autofocus]") ? null : g || u;
		},
	};
	return (pw.set(e, i), i);
}
var cq = "input";
function fq(e, n, i) {
	return i ? e.find((o) => !o.disabled && o.value)?.value === n : !1;
}
function bw(e, n) {
	if (!n || e == null) return !1;
	const i = Bm(e),
		o = Bm(n);
	return i.length !== e.length || o.length !== n.length
		? !1
		: o.length > i.length && o.toLowerCase().startsWith(i.toLowerCase());
}
function dq(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function hq(e) {
	return e.find((n) => (n.disabled ? !1 : n.element?.getAttribute("role") !== "tab"))?.id;
}
var mq = We(function ({
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
		form: j,
		disabled: M,
		...A
	}) {
		const N = Wg(!0),
			D = Af();
		((n = n || D || N), Zt(n, !1));
		const z = (0, _.useRef)(null),
			[O, U] = A_(),
			H = (0, _.useRef)(!1),
			re = (0, _.useRef)(!1),
			R = (0, _.useRef)(null),
			q = () => {
				const de = R.current;
				de != null && (cancelAnimationFrame(de), (R.current = null));
			},
			P = pe(n, ["virtualFocus"], (de) => de.virtualFocus && o),
			F = T === "inline" || T === "both",
			[Y, B] = (0, _.useState)(F);
		xI(() => {
			F && B(!0);
		}, [F]);
		const te = pe(n, "inputValue"),
			ne = pe(n, ["selectedValue"], (de) => {
				if (x && Array.isArray(de.selectedValue)) return de.selectedValue;
			}),
			L = Array.isArray(ne),
			ee = (0, _.useRef)(void 0);
		(0, _.useEffect)(
			() =>
				nt(n, ["selectedValue", "activeId"], (de, Be) => {
					ee.current = Be.selectedValue;
				}),
			[n],
		);
		const K = pe(n, ["activeValue", "selectedValue", "activeId"], (de) => {
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
			se = pe(n, "renderedItems"),
			xe = pe(n, "open"),
			ge = pe(n, "contentElement"),
			k = pe(n, "unstable_placing"),
			ae = fq(se, K, P),
			W = (0, _.useMemo)(() => {
				if (!F || !Y) return te;
				if (ae) {
					if (bw(te, K)) {
						const de = K?.slice(te.length) || "";
						return te + de;
					}
					return te;
				}
				return K || te;
			}, [F, Y, ae, K, te]);
		((0, _.useEffect)(() => {
			const de = z.current;
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
				if (!F || !Y || !K || !ae || !bw(te, K)) return;
				let de = Da;
				return (
					queueMicrotask(() => {
						const Be = z.current;
						if (!Be) return;
						const { start: Rt, end: ft } = Vc(Be),
							pn = te.length,
							mn = K.length;
						(gm(Be, pn, mn),
							(de = () => {
								if (!ts(Be)) return;
								const { start: kn, end: le } = Vc(Be);
								kn === pn && le === mn && gm(Be, Rt, ft);
							}));
					}),
					() => de()
				);
			}, [O, F, Y, K, ae, te]));
		const fe = Ae(u),
			Ee = (0, _.useRef)(null),
			_e = (0, _.useRef)(void 0),
			Ce = (0, _.useRef)(!1),
			ce = (0, _.useRef)(!1);
		((0, _.useEffect)(() => {
			if (!xe || !ge) return;
			const de = pg(ge);
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
		}, [xe, ge, n]),
			Ne(() => {
				((Ce.current = !1), te && (re.current || (H.current = !0)));
			}, [te]),
			Ne(() => {
				(P !== "always" && xe) || (H.current = xe);
			}, [P, xe]),
			Ne(() => {
				xe || (_e.current = void 0);
			}, [xe]));
		const ve = pe(n, "resetValueOnSelect");
		(ns(() => {
			const de = H.current;
			if (!n || !xe || re.current || (!de && (!ve || Ce.current))) return;
			const Be = n.getState(),
				{ compositeElement: Rt, activeId: ft, selectElement: pn, selectedValue: mn } = Be;
			if ((Rt && !p_(Rt)) || Be.unstable_placing) return;
			const kn = n.item(ft)?.value,
				le = kn != null && (Array.isArray(mn) ? mn.includes(kn) : mn === kn);
			if (P && de && !(pn && !te && le)) {
				const Oe = fe(se),
					Ie = Oe !== void 0 ? Oe : (hq(se) ?? n.first());
				Ee.current = Ie;
				const ye = Ie ?? null,
					Me = n.item(ye)?.value,
					Yt = _e.current;
				ye !== ft || Yt?.id !== ye || Yt?.value !== Me
					? ((_e.current = { id: ye, value: Me }), n.move(ye))
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
		}, [n, xe, k, O, te, P, ve, fe, se]),
			(0, _.useEffect)(() => {
				if (!F) return;
				const de = z.current;
				if (!de) return;
				const Be = [de, ge].filter((ft) => !!ft),
					Rt = (ft) => {
						Be.every((pn) => Oa(ft, pn)) && n?.setInputValue(W);
					};
				for (const ft of Be) ft.addEventListener("focusout", Rt);
				return () => {
					for (const ft of Be) ft.removeEventListener("focusout", Rt);
				};
			}, [F, ge, n, W]));
		const Ge = (de) => de.currentTarget.value.length >= f,
			ct = A.onChange,
			mt = st(h ?? Ge),
			_t = st(l ?? !n.tag),
			et = Ae((de) => {
				if ((ct?.(de), de.defaultPrevented || !n)) return;
				const Be = de.currentTarget,
					{ value: Rt, selectionStart: ft, selectionEnd: pn } = Be,
					mn = de.nativeEvent;
				if (((H.current = !0), tI(mn) && (mn.isComposing && ((H.current = !1), (re.current = !0)), F))) {
					const kn = mn.inputType === "insertText" || mn.inputType === "insertCompositionText",
						le = ft === Rt.length;
					B(kn && le);
				}
				if (_t(de)) {
					const kn = Rt === n.getState().inputValue;
					(n.setInputValue(Rt),
						queueMicrotask(() => {
							gm(Be, ft, pn);
						}),
						F && P && kn && U());
				}
				(mt(de) && n.show(), (!P || !H.current) && n.setActiveId(null));
			});
		(0, _.useEffect)(() => q, []);
		const Ue = A.onCompositionStart,
			Qe = Ae((de) => {
				(q(), (H.current = !1), (re.current = !0), Ue?.(de));
			}),
			dn = A.onCompositionEnd,
			At = Ae((de) => {
				((H.current = !0),
					(re.current = !1),
					dn?.(de),
					!de.defaultPrevented &&
						P &&
						(q(),
						(R.current = requestAnimationFrame(() => {
							((R.current = null), !re.current && U());
						}))));
			}),
			Fn = A.onMouseDown,
			Qn = st(y ?? (() => n.getState().compositeElementInFocusOrder)),
			Ct = st(w),
			jt = st(g ?? Ge),
			hn = Ae((de) => {
				(Fn?.(de),
					!de.defaultPrevented &&
						(de.button ||
							de.ctrlKey ||
							(n &&
								(Qn(de) && n.setActiveId(null),
								Ct(de) && n.setInputValue(W),
								jt(de) && Bc(de.currentTarget, "mouseup", n.show)))));
			}),
			Qt = A.onKeyDown,
			he = st(b ?? Ge),
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
			Wi = Ur(A.id),
			Za = dq(T) ? T : void 0,
			ea = pe(n, ["activeId"], (de) => de.activeId === null),
			mi = Pa({ disabled: M, "aria-disabled": A["aria-disabled"] }),
			pr = A.composite !== !1,
			[, gi] = O_(pr ? null : n.setCompositeElement),
			br = pe(n, L ? ["compositeElement"] : [], (de) => (L ? de.compositeElement : null));
		((A = Pt(
			A,
			(de) =>
				!x || !Array.isArray(ne) || (pr && !br)
					? de
					: (0, S.jsxs)(S.Fragment, {
							children: [
								de,
								ne.map((Be, Rt) =>
									(0, S.jsx)("input", { type: "hidden", name: x, form: j, disabled: mi, value: Be }, Rt),
								),
							],
						}),
			[x, j, mi, pr, br, ne],
		)),
			(A = {
				role: "combobox",
				"aria-autocomplete": Za,
				"aria-haspopup": Eu(ge, "listbox"),
				"aria-expanded": xe,
				"aria-controls": ge?.id,
				"data-active-item": ea || void 0,
				value: W,
				...A,
				id: Wi,
				name: L ? void 0 : x,
				form: j,
				disabled: M,
				ref: It(z, n.setInputElement, pr ? void 0 : gi, A.ref),
				onChange: et,
				onCompositionStart: Qe,
				onCompositionEnd: At,
				onMouseDown: hn,
				onKeyDown: Te,
				onBlur: Tt,
			}));
		const tn = J1(n);
		return (
			(A = Kg({
				store: n,
				unstable_scrollIntoView: tn,
				focusable: i,
				...A,
				moveOnKeyPress: (de) => (yg(E, de) ? !1 : (F && B(!0), !0)),
			})),
			{ autoComplete: "off", ...A }
		);
	}),
	gq = Fe(function (n) {
		const i = mq(n);
		return Je(cq, i);
	}),
	vq = "div";
function yq(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function pq(e) {
	return u_(e) ?? "option";
}
var bq = We(function ({
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
		const y = Wg();
		((n = n || y), Zt(n, !1));
		const w = Ur(b.id),
			E = (0, _.useContext)(Z1),
			T = E?.store === n,
			{
				resetValueOnSelectState: x,
				multiSelectable: j,
				selected: M,
				autoFocusSelected: A,
				selectElement: N,
				contentElement: D,
			} = Qc(n, ["selectedValue"], {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(ge) {
					return Array.isArray(ge.selectedValue);
				},
				selected(ge) {
					return yq(ge.selectedValue, i);
				},
				autoFocusSelected(ge) {
					return i == null
						? !1
						: Array.isArray(ge.selectedValue)
							? ge.selectedValue[ge.selectedValue.length - 1] === i
							: ge.selectedValue === i;
				},
				selectElement: "selectElement",
				contentElement: "contentElement",
			}),
			z = !!N,
			O = !!N,
			U = Pa(b),
			H = (0, _.useCallback)(
				(ge) => {
					const k = { ...ge, value: O && U ? void 0 : i };
					return p ? p(k) : k;
				},
				[O, U, i, p],
			);
		((u = u ?? (!O && !j)), (o = o ?? (i != null && !j)), (g = g ?? O));
		const re = T ? E?.role : Eu(D),
			R = pq(typeof re == "string" ? re : void 0),
			q = b.onClick,
			P = st(u),
			F = st(l),
			Y = st(f ?? x),
			B = st(o),
			te = Ae((ge) => {
				(q?.(ge),
					!ge.defaultPrevented &&
						(h_(ge) ||
							d_(ge) ||
							(i != null &&
								(F(ge) &&
									(Y(ge) && n?.resetInputValue(),
									n?.setSelectedValue((k) =>
										Array.isArray(k) ? (k.includes(i) ? k.filter((ae) => ae !== i) : [...k, i]) : i,
									)),
								P(ge) && n?.setInputValue(i)),
							B(ge) && n?.hide())));
			}),
			ne = b.onKeyDown,
			L = Ae((ge) => {
				if ((ne?.(ge), ge.defaultPrevented)) return;
				const k = n?.getState().compositeElement;
				if (!k || ts(k)) return;
				const ae = ge.key.length === 1 && !ge.ctrlKey && !ge.metaKey,
					W = (cf() ? ge.metaKey : ge.ctrlKey) && ge.key.toLowerCase() === "v",
					fe = ge.key === "Backspace" || ge.key === "Delete";
				if (ae || W || fe) {
					if (k === N) return;
					if (yr(k)) {
						(queueMicrotask(() => k.focus()), n?.setInputValue(k.value));
						return;
					}
					(k.focus(), "value" in k && typeof k.value == "string" && n?.setInputValue(k.value));
				}
			});
		((O || j) && M != null && (b = { "aria-selected": M, ...b }),
			(b = Pt(
				b,
				(ge) =>
					(0, S.jsx)(k3.Provider, { value: i, children: (0, S.jsx)(q3.Provider, { value: M ?? !1, children: ge }) }),
				[i, M],
			)));
		const ee = z ? A : void 0;
		((b = { role: R, children: i, ...b, id: w, onClick: te, onKeyDown: L }),
			b.autoFocus === void 0 && ee !== void 0 && ((b.autoFocus = !1), (b["data-autofocus"] = ee || void 0)));
		const K = st(m),
			se = J1(n);
		b = Jg({
			store: n,
			unstable_scrollIntoView: se,
			...b,
			getItem: H,
			preventScrollOnKeyDown: g,
			moveOnKeyPress: (ge) => {
				if (!K(ge)) return !1;
				const k = new Event("combobox-item-move");
				return (n?.getState().compositeElement?.dispatchEvent(k), !0);
			},
		});
		const xe = st(h ?? O);
		return (
			(b = Xg({
				store: n,
				...b,
				focusOnHover(ge) {
					return !n.getState().open || !xe(ge) ? !1 : n.getState().open;
				},
			})),
			b
		);
	}),
	Sq = Cu(
		Fe(function (n) {
			const i = bq(n);
			return Je(vq, i);
		}),
	),
	wq = "div",
	W1 = We(function ({ store: n, alwaysVisible: i, ...o }) {
		const u = Wg(!0),
			l = I3();
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
					ka(Y) === Y && F.focus();
				});
			}),
			g = (0, _.useRef)(null),
			p = Ur(o.id),
			b = pe(n, "mounted"),
			y = Ru(b, o.hidden, i),
			w = y ? { ...o.style, display: "none" } : o.style,
			E = pe(n, ["selectedValue"], (P) => Array.isArray(P.selectedValue)),
			T = RS(g, "role", o.role),
			x = (0, _.useMemo)(() => ({ store: n, role: T }), [n, T]),
			j = ((T === "listbox" || T === "tree" || T === "grid") && E) || void 0,
			[M, A] = (0, _.useState)(!1),
			N = pe(n, "contentElement"),
			D = (0, _.useContext)(gw),
			z = (0, _.useState)(),
			[O, U] = D || z,
			H = (0, _.useMemo)(() => [O, U], [O, U]);
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
			M || (o = { role: "listbox", "aria-multiselectable": j, ...o }),
			(o = Pt(
				o,
				(P) =>
					(0, S.jsx)(j3, {
						value: n,
						children: (0, S.jsx)(gw.Provider, {
							value: H,
							children: (0, S.jsx)(D_.Provider, {
								value: U,
								children: (0, S.jsx)(Z1.Provider, { value: x, children: P }),
							}),
						}),
					}),
				[n, x, H],
			)));
		const re = p && (!u || !f) ? n.setContentElement : null,
			R = pe(n, ["labelElement", "selectLabelElement"], (P) => (O ? null : P.selectLabelElement || P.labelElement));
		RS(R, "id");
		const q = O || R?.id;
		return (
			(o = {
				"data-combobox-list": "",
				"aria-labelledby": o["aria-label"] != null ? void 0 : q,
				hidden: y,
				...o,
				id: p,
				onFocus: m,
				ref: It(re, g, o.ref),
				style: w,
				tabIndex: -1,
			}),
			o
		);
	}),
	ZL = Fe(function (n) {
		const i = W1(n);
		return Je(wq, i);
	}),
	Eq = "div";
function _q(e, ...n) {
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
var Cq = We(function ({
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
		const b = pe(n, "compositeElement"),
			y = pe(n, "inputElement"),
			w = pe(n, "selectElement"),
			E = (0, _.useRef)(!1),
			T = !!w,
			x = pe(n, "selectOnMove"),
			j = (0, _.useRef)(null),
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
				nt(n, ["open", "moves", "selectedValue"], (B, te) => {
					if (!B.open) {
						(te.open && (A.current = M.current), (M.current = !1));
						return;
					}
					if (!te.open) {
						const ne = N.current;
						(ne !== null ? ((M.current = ne), (N.current = null)) : (M.current = !0), (Y = B.moves));
					}
					(B.moves !== Y && (M.current = !1), M.current && (D.current = B.selectedValue));
				})
			);
		}, [n]);
		const z = st(l ?? x),
			O = pe(n.tag, ["renderedItems"], (F) => F?.renderedItems.length),
			U = (0, _.useMemo)(() => [m, O], [m, O]);
		((g = W1({ store: n, alwaysVisible: u, ...g })), (g = Of({ store: n, typeahead: !y, ...g })));
		const H = st(g.hideOnEscape ?? !0),
			re = g.onClose,
			R = g.getPersistentElements,
			q = Ae((F) => {
				if (!H(F)) return !1;
				const Y = { event: F, defaultPrevented: F.defaultPrevented, cancelBubble: F.cancelBubble };
				return (
					(j.current = Y),
					setTimeout(() => {
						j.current === Y && (j.current = null);
					}),
					!0
				);
			}),
			P = Ae((F) => {
				const Y = j.current;
				if (((j.current = null), re?.(F), F.defaultPrevented)) {
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
						(z(Y.event) && n.setSelectedValue(D.current)));
			});
		return (
			(g = Qg({
				store: n,
				modal: i,
				alwaysVisible: u,
				backdrop: !1,
				autoFocusOnShow: T,
				initialFocus: T ? y || lq(n) : void 0,
				finalFocus: w || b,
				preserveTabOrderAnchor: null,
				...g,
				unstable_treeSnapshotKey: U,
				hideOnEscape: q,
				onClose: P,
				getPersistentElements() {
					const F = R?.() || [];
					if (!i || !n) return F;
					const { compositeElement: Y, contentElement: B, inputElement: te, selectElement: ne } = n.getState(),
						L = [Y, te, ne],
						ee = ne || te || Y;
					if (!ee) return F;
					const K = new Set(F),
						se = (ae) => {
							ae && (B?.contains(ae) || K.add(ae));
						};
					L.forEach(se);
					const xe = Ke(ee),
						ge = new Set();
					for (const ae of [B, ...L]) ae?.id && ge.add(`[aria-controls~="${ae.id}"]`);
					if (!ge.size) return [...K];
					const k = [...ge].join(",");
					return (xe.querySelectorAll(k).forEach(se), [...K]);
				},
				autoFocusOnHide(F) {
					return yg(f, F) ? !1 : E.current ? ((E.current = !1), !1) : !0;
				},
				hideOnInteractOutside(F) {
					const Y = n?.getState(),
						B = Y?.contentElement?.id,
						te = Y?.compositeElement?.id;
					if (_q(F.target, B, te)) return !1;
					const ne = typeof h == "function" ? h(F) : h;
					return (ne && (E.current = F.type === "click"), ne);
				},
			})),
			g
		);
	}),
	Tq = Nu(
		Fe(function (n) {
			const i = Cq(n);
			return Je(Eq, i);
		}),
		Af,
	),
	FL = (0, _.createContext)(null),
	QL = (0, _.createContext)(null),
	Uu = Vr([Tf], [ju]),
	xq = Uu.useContext,
	YL = Uu.useScopedContext,
	KL = Uu.useProviderContext,
	GL = Uu.ContextProvider,
	XL = Uu.ScopedContextProvider,
	Oq = bg() && c_();
function Aq({ tag: e, ...n } = {}) {
	const i = gf(n.store, U_(e, ["value", "rtl"])),
		o = ke(n.defaultInputValue, n.defaultValue);
	({ ...n });
	const u = e?.getState(),
		l = i?.getState(),
		f = ke(n.activeId, l?.activeId, n.defaultActiveId, null),
		h = z1({
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
		m = F1({ ...n, placement: ke(n.placement, l?.placement, "bottom-start") }),
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
	let j = w.compositeElement === w.selectElement ? w.selectElement : null;
	const M = w.selectElement || w.compositeElement || w.disclosureElement;
	let A = w.anchorElement === M ? w.anchorElement : null;
	(yt(E, () =>
		nt(E, ["compositeElement", "selectElement"], (O) => {
			if (!(!O.selectElement && !j)) {
				if (O.compositeElement && O.compositeElement === O.selectElement) {
					j = O.selectElement;
					return;
				}
				if (O.compositeElement && O.compositeElement !== j) {
					j = null;
					return;
				}
				((j = O.selectElement), E.setState("compositeElement", j));
			}
		}),
	),
		yt(E, () =>
			nt(E, ["selectElement"], (O) => {
				if (!O.selectElement) return;
				const { focusLoop: U, focusWrap: H, compositeElementInFocusOrder: re, resetValueOnSelect: R } = E.getState();
				return (
					x.has("focusLoop") && h.setState("focusLoop", !1),
					x.has("focusWrap") && h.setState("focusWrap", !1),
					x.has("compositeElementInFocusOrder") && h.setState("compositeElementInFocusOrder", !1),
					x.has("resetValueOnSelect") && E.setState("resetValueOnSelect", !0),
					() => {
						const q = E.getState();
						(x.has("focusLoop") && !q.focusLoop && h.setState("focusLoop", U),
							x.has("focusWrap") && !q.focusWrap && h.setState("focusWrap", H),
							x.has("compositeElementInFocusOrder") &&
								!q.compositeElementInFocusOrder &&
								h.setState("compositeElementInFocusOrder", re),
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
			nt(E, ["items", "selectedValue", "selectElement"], (O, U) => {
				if (b) {
					if (O.selectedValue !== U.selectedValue) {
						b = !1;
						return;
					}
					O.selectElement &&
						queueMicrotask(() => {
							if (!b) return;
							const H = E.getState();
							if (!H.selectElement) return;
							const re = H.items.find((R) => !R.disabled && R.value != null);
							re?.value != null && ((b = !1), E.setState("selectedValue", re.value));
						});
				}
			}),
		),
		Oq &&
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
			nt(E, ["moves", "activeId"], (O, U) => {
				(O.moves !== U.moves && (T = !1),
					O.activeId !== U.activeId && (T = !1),
					O.moves === U.moves && E.setState("activeValue", void 0));
			}),
		),
		yt(E, () =>
			yu(E, ["moves", "renderedItems"], (O, U) => {
				if (O.moves === U.moves) return;
				const { activeId: H } = E.getState(),
					re = h.item(H);
				E.setState("activeValue", re?.value);
			}),
		),
		yt(E, () =>
			nt(E, ["items", "mounted", "open", "selectedValue", "selectElement"], (O) => {
				if (!O.selectElement || (O.mounted && !T)) return;
				const U = Array.isArray(O.selectedValue) ? O.selectedValue : [O.selectedValue],
					H = U[U.length - 1];
				if (H == null) return;
				const re = O.items.find((R) => !R.disabled && R.value === H);
				re && ((T = !1), E.setState("activeId", re.id));
			}),
		),
		yt(E, () =>
			yu(E, ["selectOnMove", "moves"], (O) => {
				const { activeId: U, open: H, selectedValue: re, selectElement: R } = E.getState();
				if (!R || (!O.selectOnMove && H) || Array.isArray(re) || !O.moves || !U) return;
				const q = h.item(U);
				!q || q.disabled || q.value == null || E.setState("selectedValue", q.value);
			}),
		));
	const N = (O) => {
			E.setState("inputValue", O);
		},
		D = () => N(w.inputValue),
		z = (O, U) => {
			(x.delete(O),
				O === "includesBaseElement" && x.delete("compositeElementInFocusOrder"),
				O === "selectedValue" && (b = !1),
				E.setState(O, U));
		};
	return {
		...m,
		...h,
		...E,
		setState: z,
		tag: e,
		setInputValue: N,
		resetInputValue: D,
		setValue: N,
		resetValue: D,
		setSelectedValue: (O) => z("selectedValue", O),
		setInputElement: (O) => E.setState("inputElement", O),
		setLabelElement: (O) => E.setState("labelElement", O),
		setSelectElement: (O) => E.setState("selectElement", O),
		setSelectLabelElement: (O) => E.setState("selectLabelElement", O),
	};
}
function Rq(e) {
	const n = xq();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), l3(e));
}
function Nq(e, n, i) {
	ns(n, [i.tag, n]);
	const o = { inputValue: i.inputValue ?? i.value, setInputValue: i.setInputValue ?? i.setValue };
	return (
		Dt(e, o, "inputValue", "setInputValue"),
		Dt(e, i, "selectedValue", "setSelectedValue"),
		Dt(e, i, "selectOnMove"),
		Dt(e, i, "resetValueOnHide"),
		Dt(e, i, "resetValueOnSelect"),
		Object.assign(L1(Q1(e, n, i), n, i), { tag: i.tag })
	);
}
function Mq(e = {}) {
	e = Rq(e);
	const [n, i] = vf(Aq, e);
	return Nq(n, i, e);
}
var Dq = be.union(
		be.literal("thumbs_up"),
		be.literal("heart"),
		be.literal("laugh"),
		be.literal("wow"),
		be.literal("sad"),
		be.literal("party"),
		be.literal("rocket"),
		be.literal("eyes"),
	),
	JL = be.object({ fileNodeId: be.string(), name: be.string() }),
	WL = be.union(be.literal("read"), be.literal("write"), be.literal("manage")),
	zq = be.object({ message: be.string(), name: be.optional(be.string()) }),
	Iq = be.union(
		be.object({
			kind: be.literal("message"),
			messageId: be.id("messages"),
			revision: be.number(),
			sequence: be.number(),
		}),
		be.object({ kind: be.literal("channel"), channelId: be.id("channels"), revision: be.number() }),
		be.object({ kind: be.literal("reaction"), messageId: be.id("messages"), token: Dq, on: be.boolean() }),
		be.object({
			kind: be.literal("membership"),
			channelId: be.id("channels"),
			membershipRevision: be.number(),
			left: be.boolean(),
			deleted: be.boolean(),
			pending: be.boolean(),
		}),
	),
	e6 = be.union(be.object({ _yay: Iq }), be.object({ _nay: zq })),
	t6 = be.union(
		be.object({
			kind: be.literal("block"),
			messageId: be.id("messages"),
			rootSequence: be.number(),
			replySequence: be.number(),
			renderedBlock: be.string(),
			sourceRevision: be.number(),
		}),
		be.object({ kind: be.literal("header"), name: be.string(), topic: be.string(), isPrivate: be.boolean() }),
		be.object({ kind: be.literal("archive"), archived: be.boolean() }),
		be.object({
			kind: be.literal("readers"),
			readerRevision: be.number(),
			readers: be.array(be.object({ userId: be.string(), membershipLifetime: be.number() })),
			deleted: be.boolean(),
		}),
	);
function eC(e) {
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
var jq = { text: "", attachments: [], mentions: [], pending: [] },
	Sw = new WeakMap();
function kq() {
	const e = new Map(),
		n = new Set();
	return {
		get: (i) => e.get(i) ?? jq,
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
function tC(e, n) {
	let i = Sw.get(e);
	i || ((i = kq()), Sw.set(e, i));
	const o = i;
	return {
		value: (0, _.useSyncExternalStore)(o.subscribe, () => o.get(n)),
		get: () => o.get(n),
		set: (u) => o.set(n, u),
	};
}
function nC(e) {
	const n = "rootMessageId" in e.target,
		i = 3112960 - (n ? 32768 : 0),
		o = e.enabled || e.retain,
		[u, l] = (0, _.useState)(null),
		f = Bo(De.messages.get, o && u ? { messageId: u._id } : "skip"),
		h = Bo(De.messages.latest_roots, o && "channelId" in e.target ? e.target : "skip"),
		m = Bo(De.messages.latest_replies, o && "rootMessageId" in e.target ? e.target : "skip"),
		g = n ? m : h,
		[p, b] = (0, _.useState)(null),
		y = (0, _.useRef)(0),
		w = (0, _.useRef)(new Map()),
		E = (0, _.useRef)({ head: null, rows: [] }),
		T = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		x = o && (g !== null || e.retain),
		j = (0, _.useMemo)(
			() =>
				Object.fromEntries(
					(x ? (p?.pages ?? []) : []).map((L) => [
						String(L.id),
						{
							query: n ? De.messages.list_replies : De.messages.list_roots,
							args: {
								...(n ? { rootMessageId: T } : { channelId: T }),
								anchorSequence: p.anchor,
								paginationOpts: { numItems: 50, cursor: L.cursor, ...(L.endCursor ? { endCursor: L.endCursor } : {}) },
							},
						},
					]),
				),
			[x, p, n, T],
		),
		M = ng(j),
		A = e.retain ? E.current.head : (g ?? null),
		N = g === null && !e.retain,
		D = new Set(p?.pages.map((L) => L.id));
	for (const L of w.current.keys()) (!D.has(L) || N || !o) && w.current.delete(L);
	const z =
			p?.pages.map((L) => {
				const ee = M[String(L.id)];
				return (
					e.enabled && g !== null && ee && !(ee instanceof Error) && w.current.set(L.id, ee),
					{ descriptor: L, result: ee ?? w.current.get(L.id) }
				);
			}) ?? [],
		O = z.find((L) => L.result instanceof Error)?.result,
		U = z.filter((L) => L.result !== void 0 && !(L.result instanceof Error)),
		H = p === null ? (A?.messages ?? []) : U.flatMap((L) => L.result.page),
		re = f === void 0 ? u : f,
		R =
			re &&
			("rootMessageId" in e.target ? re.rootMessageId === e.target.rootMessageId : re.rootMessageId === null) &&
			re.deletedAt === null &&
			!H.some((L) => L._id === re._id)
				? [...H, re].sort((L, ee) => ee.sequence - L.sequence)
				: H,
		q = e.retain ? E.current.rows : N ? [] : e.enabled ? R : [],
		P = new TextEncoder().encode(JSON.stringify({ rows: q, head: A })).byteLength,
		F = U.at(-1),
		Y = e.enabled && g !== null && (A === null || z.some((L) => M[String(L.descriptor.id)] === void 0));
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
			const L = U.some(({ descriptor: ee, result: K }) => !ee.endCursor && !K.isDone);
			if (U.some(({ result: ee }) => ee.pageStatus === "SplitRequired")) {
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
						: L &&
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
		te = () => {
			if (!e.enabled || Y || !A) return;
			if (!p) {
				(A.messages.at(-1)?.sequence ?? 0) > 1 &&
					b({ anchor: A.sequence, pages: [{ id: ++y.current, cursor: null }], newerAnchor: A.sequence, extend: !0 });
				return;
			}
			if (!F || F.result.isDone) return;
			const L = [...p.pages, { id: ++y.current, cursor: F.result.continueCursor }],
				ee = n ? 2 : 5;
			b({ ...p, pages: L.slice(-ee), newerAnchor: L.length > ee ? (H[0]?.sequence ?? p.anchor) : p.newerAnchor });
		},
		ne = () => {
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
		older: te,
		newer: ne,
		latest: B,
	};
}
var ww = 128;
function qq(e) {
	return new TextEncoder().encode(e).byteLength;
}
function Lq(e) {
	if (e === null) return null;
	const n = e
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (n === "") return null;
	if (qq(n) <= ww) return n;
	const i = new TextEncoder().encode(n).slice(0, ww);
	return new TextDecoder().decode(i).replace(/�$/, "");
}
function rC(e) {
	const n = vr(),
		i = Na(De.messages.send),
		o = Na(De.messages.reply),
		u = eE(De.files.authorize_selection),
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
					if (b.attachments.some((x) => !T._yay.some((j) => j.fileNodeId === x.fileNodeId && j.name === x.name)))
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
							T.clientRequestId === b.clientRequestId ? { ...T, status: "failed", error: nf(E) } : T,
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
			const E = eC({ text: b, attachments: y, mentions: w, authorName: Lq(n.member?.displayName ?? null) });
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
function Uq(e) {
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
			f(nf(b));
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
function Vq(e) {
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
					.then((j) => {
						if (!x) {
							if (j.status !== 200) {
								w(j.body?.message ?? "Files could not be loaded.");
								return;
							}
							if (!j.body) {
								w("Files could not be loaded.");
								return;
							}
							(o(j.body.items), h(j.body.cursor), g(j.body.isDone));
						}
					})
					.catch((j) => {
						x || w(nf(j));
					})
					.finally(() => {
						x || b(!1);
					}),
				() => {
					x = !0;
				}
			);
		}, [e.client, u, E]),
		(0, S.jsxs)(Xo, {
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
function iC(e) {
	const n = (0, _.useId)(),
		i = (0, _.useId)(),
		o = vr(),
		[u, l] = (0, _.useState)(!1),
		[f, h] = (0, _.useState)(null),
		[m, g] = (0, _.useState)(null),
		[p, b] = (0, _.useState)(null),
		y = pt(o, De.members.list, m !== null ? { paginationOpts: { numItems: 100, cursor: p } } : "skip"),
		w = e.draft.value.text,
		E = (0, _.useRef)(null),
		T = (0, _.useRef)(null),
		x = Mq({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (O) => {
				O || g(null);
			},
		}),
		j = m && y ? oR(y.page, m.query, e.userId).slice(0, 8) : [],
		M = m !== null && (o.ready || o.refreshing),
		A = (O) => h(e.draft.set({ ...e.draft.get(), ...O })),
		N = (O) => {
			if (!m) return;
			const U = sR(w, m.start, E.current?.selectionStart ?? w.length, O.label),
				H = new Map(e.draft.value.mentions);
			(H.set(O.userId, O.label), A({ text: U.text, mentions: [...H] }), (T.current = U.caret), x.hide());
		},
		D = () => {
			if (e.busy || e.disabled) return;
			const O = w.trim();
			(!O && e.draft.value.attachments.length === 0) ||
				(e.onSend(O, e.draft.value.attachments, uR(e.draft.value.mentions, O)) && x.hide());
		},
		z = (O) => {
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
					if ((O.key === "Enter" || O.key === "Tab") && !O.shiftKey && j.length) {
						(O.preventDefault(), N(j.find((U) => `${i}-${U.userId}` === x.getState().activeId) ?? j[0]));
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
													A({ attachments: e.draft.value.attachments.filter((U) => U.fileNodeId !== O.fileNodeId) }),
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
						(0, S.jsx)(gq, {
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
									const U = O.currentTarget.value;
									A({ text: U });
									const H = aR(U, O.currentTarget.selectionStart);
									(g(H), x.setValue(H?.query ?? ""));
								},
								onKeyDown: z,
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
							children: (0, S.jsx)(aq, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: D,
							children: (0, S.jsx)(tq, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(Tq, {
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
						y && j.length === 0 ? (0, S.jsx)("div", { role: "status", children: "No match on this page." }) : null,
						j.map((O) =>
							(0, S.jsx)(
								Sq,
								{
									id: `${i}-${O.userId}`,
									value: O.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (U) => U.preventDefault(),
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
					? (0, S.jsx)(Vq, {
							client: e.client,
							onClose: () => l(!1),
							onPick: (O) => {
								(e.draft.value.attachments.some((U) => U.fileNodeId === O.fileNodeId) ||
									A({ attachments: [...e.draft.value.attachments, O] }),
									l(!1));
							},
						})
					: null,
			],
		})
	);
}
function Bq(e) {
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
						children: rR.map((f, h) => {
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
									"aria-label": iE[f],
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
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: rE[f] }),
								},
								f,
							);
						}),
					})
				: null,
		],
	});
}
var aC = 864e5;
function Jm(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function Pq(e) {
	const n = new Date(e).toDateString();
	return n === new Date().toDateString()
		? "Today"
		: n === new Date(Date.now() - aC).toDateString()
			? "Yesterday"
			: Jm(e);
}
function $q(e) {
	const n = e?.trim().split(/\s+/u);
	return n?.[0] ? `${n[0][0]}${n.length > 1 ? n.at(-1)[0] : ""}`.toUpperCase() : "•";
}
function Hq(e, n, i) {
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
function oC(e) {
	const { doc: n } = e,
		i = vr(),
		o = pt(i, De.reactions.get_for_message, { messageId: n._id }),
		u = pt(i, De.threads.get_summary, e.onOpenThread ? { rootMessageId: n._id } : "skip"),
		l = Na(De.messages.edit),
		f = Na(De.messages.remove),
		h = Na(De.reactions.set),
		[m, g] = (0, _.useState)(!1),
		[p, b] = (0, _.useState)(""),
		y = (0, _.useRef)(null),
		[w, E] = (0, _.useState)(!1),
		[T, x] = (0, _.useState)(!1),
		[j, M] = (0, _.useState)(null),
		[A, N] = (0, _.useState)(!1),
		D = (0, _.useRef)(null),
		z = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		U = (0, _.useRef)(null),
		H = (0, _.useId)(),
		re = n.deletedAt !== null,
		R = e.canWrite && i.canSend;
	((0, _.useEffect)(() => {
		m && z.current?.focus();
	}, [m]),
		(0, _.useEffect)(() => {
			if (re) {
				const L = O.current?.contains(document.activeElement);
				(g(!1), b(""), (y.current = null), m && e.onEditingChange?.(null), E(!1), L && O.current?.focus());
			}
		}, [re]));
	const q = async () => {
			if (!(T || !D.current || !i.can_request_now())) {
				(x(!0), M(null), e.onRequestStart());
				try {
					const L = await D.current();
					if (L._nay) {
						(M(L._nay.message), (D.current = null), N(!1));
						return;
					}
					((D.current = null),
						N(!1),
						g(!1),
						b(""),
						(y.current = null),
						m && e.onEditingChange?.(null),
						E(!1),
						queueMicrotask(() => (re ? O.current : U.current)?.focus()));
				} catch (L) {
					(M(nf(L)), N(!0));
				} finally {
					(x(!1), e.onRequestSettled());
				}
			}
		},
		P = () => {
			if (!(!R && !D.current)) {
				if (!D.current) {
					const L = y.current,
						ee = L.mentions.filter((xe) => {
							const ge = e.memberNames.get(xe);
							return !!ge && p.includes(`@${ge}`);
						}),
						K = eC({ ...n, text: p.trim(), mentions: ee });
					if (K) {
						M(K);
						return;
					}
					const se = {
						messageId: n._id,
						clientRequestId: crypto.randomUUID(),
						expectedRevision: L.revision,
						text: p.trim(),
						mentions: ee,
					};
					D.current = () => l(se);
				}
				q();
			}
		},
		F = () => {
			if (!(!R && !D.current)) {
				if (!D.current) {
					const L = { messageId: n._id, clientRequestId: crypto.randomUUID(), expectedRevision: n.revision };
					D.current = () => f(L);
				}
				q();
			}
		},
		Y = (L, ee) => {
			if (!R || T || D.current || !i.can_request_now()) return;
			const K = { messageId: n._id, clientRequestId: crypto.randomUUID(), token: L, on: !ee };
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
				queueMicrotask(() => U.current?.focus()));
		},
		te = e.memberNames.get(n.authorHostUserId),
		ne = Date.now() - n.createdAt < 7 * aC;
	return (0, S.jsxs)("li", {
		ref: O,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: $q(te) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: te === null ? "Former member" : (te ?? "…") }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(n.createdAt).toISOString(),
						children: [
							ne ? (0, S.jsxs)("span", { className: "visually-hidden", children: [Jm(n.createdAt), " "] }) : null,
							(0, S.jsx)("span", {
								className: "message-clock",
								children: ne
									? new Date(n.createdAt).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
									: Jm(n.createdAt),
							}),
						],
					}),
				],
			}),
			re
				? (0, S.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: m
					? (0, S.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, S.jsx)("textarea", {
									ref: z,
									className: "composer-input",
									"aria-label": "Edit message",
									value: p,
									readOnly: T || A,
									onChange: (L) => b(L.currentTarget.value),
									onKeyDown: (L) => {
										L.nativeEvent.isComposing ||
											L.keyCode === 229 ||
											(L.key === "Escape"
												? (L.preventDefault(), L.stopPropagation(), B())
												: L.key === "Enter" && !L.shiftKey && (L.preventDefault(), P()));
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
										Hq(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, S.jsx)(Uq, { client: e.client, attachments: n.attachments }) : null,
								o?.length
									? (0, S.jsx)("div", {
											className: "message-reactions",
											children: o.map((L) =>
												(0, S.jsxs)(
													"button",
													{
														type: "button",
														disabled: !R || T,
														className: L.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": L.reactedByMe,
														"aria-label": `${iE[L.token]}, ${L.count} ${L.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => Y(L.token, L.reactedByMe),
														children: [
															(0, S.jsx)("span", { "aria-hidden": "true", children: rE[L.token] }),
															(0, S.jsx)("span", { className: "reaction-chip-count", children: L.count }),
														],
													},
													L.token,
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
										children: ["Last reply ", tf(u.latestReplyAt, Date.now())],
									})
								: null,
						],
					})
				: null,
			!re && !m
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
							(0, S.jsx)(Bq, { groups: o ?? [], disabled: !R || T, onPick: Y }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												ref: U,
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
			j && !w
				? (0, S.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							j,
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
				? (0, S.jsxs)(Xo, {
						labelledBy: H,
						onClose: B,
						children: [
							(0, S.jsx)("h2", { id: H, className: "dialog-title", children: "Delete message?" }),
							(0, S.jsx)("p", { children: "The message is replaced by a “Message deleted” placeholder for everyone." }),
							j ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: j }) : null,
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
function sC(e) {
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
function uC(e) {
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
function lC(e) {
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
				Zq,
				{
					...e,
					doc: o,
					isContinuation: m,
					newDay: f ? Pq(o.createdAt) : null,
					newMark: h,
					replyTriggerRef: e.setReplyTrigger ? (g) => e.setReplyTrigger?.(o._id, g) : void 0,
				},
				o._id,
			);
		}),
	});
}
function Zq(e) {
	return (0, S.jsxs)(S.Fragment, {
		children: [
			e.newDay ? (0, S.jsx)("li", { className: "day-divider", children: e.newDay }) : null,
			e.newMark
				? (0, S.jsx)("li", {
						className: "new-divider",
						children: (0, S.jsx)("span", { className: "new-divider-label", children: "New messages" }),
					})
				: null,
			(0, S.jsx)(oC, { ...e }),
		],
	});
}
function Fq(e) {
	const n = vr(),
		i = n.ready && e.channel !== null,
		o = pt(n, De.messages.get, i || n.refreshing ? { messageId: e.rootMessageId } : "skip"),
		u = nC({ target: { rootMessageId: e.rootMessageId }, enabled: i && o !== null, retain: n.refreshing }),
		l = tC(e.client, `${e.userId}:${e.channelId}:${e.rootMessageId}`),
		f = rC({
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
							children: (0, S.jsx)(oC, {
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
						(0, S.jsx)(uC, { window: u, disabled: e.sendInFlight || !i }),
						u.loading
							? (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading replies…" })
							: null,
						i && !u.denied && !u.loading && !u.rows.length
							? (0, S.jsx)("p", { className: "channel-status", children: "No replies yet" })
							: null,
						(0, S.jsxs)("ul", {
							className: "message-list",
							children: [
								(0, S.jsx)(lC, {
									...e,
									rows: u.rows,
									editingMessageId: u.editingMessageId,
									onEditingChange: u.setEditingMessage,
								}),
								(0, S.jsx)(sC, { draft: l, queue: f, disabled: !n.ready || !n.can_request_now() }),
							],
						}),
					],
				}),
				f.error ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
				(0, S.jsx)(iC, {
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
var Qq = 420,
	eu = 244,
	Tm = 340;
function Yq(e) {
	return (0, S.jsx)(Kq, { ...e }, `${e.userId}:${e.channelId}`);
}
function Kq(e) {
	const n = vr(),
		i = n.ready && e.channel !== null,
		o = e.isNarrow && e.threadRootId !== null,
		u = nC({ target: { channelId: e.channelId }, enabled: i, retain: n.refreshing }),
		l = tC(e.client, `${e.userId}:${e.channelId}`),
		f = rC({
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
		[T, x] = (0, _.useState)(Tm),
		[j, M] = (0, _.useState)(0),
		A = Math.max(eu, w - Qq),
		N = Math.min(A, Math.max(eu, T));
	((0, _.useEffect)(() => {
		if (!e.threadRootId || !h.current) return;
		const z = h.current;
		E(z.clientWidth);
		const O = new ResizeObserver(() => E(z.clientWidth));
		return (O.observe(z), () => O.disconnect());
	}, [e.threadRootId]),
		(0, _.useEffect)(() => {
			const z = [...new Set(u.rows.map((U) => U.authorHostUserId))],
				O = [...new Set([...z, ...u.rows.flatMap((U) => U.mentions)])];
			O.length && e.memberNames.resolve(O, z);
		}, [u.rows, e.memberNames]),
		(0, _.useLayoutEffect)(() => {
			if (!(!m.current || o)) {
				if (p.current && u.atLatest) ((m.current.scrollTop = m.current.scrollHeight), M(u.sequence));
				else if (b.current) {
					const z = [...m.current.querySelectorAll("[data-key]")].find((O) => O.dataset.key === b.current.id);
					z && (m.current.scrollTop += z.getBoundingClientRect().top - b.current.top);
				}
			}
		}, [u.rows, u.atLatest, u.sequence, o]),
		(0, _.useEffect)(() => {
			(y.current !== null && u.sequence > y.current && u.atLatest && e.announce("New messages in this channel."),
				(y.current = u.sequence));
		}, [u.sequence, u.atLatest, e.announce]),
		(0, _.useEffect)(() => {
			const z = () => {
				i &&
					!o &&
					!u.denied &&
					u.atLatest &&
					p.current &&
					document.visibilityState === "visible" &&
					j === u.sequence &&
					e.onObservedRead({ rootSequence: j });
			};
			return (
				z(),
				document.addEventListener("visibilitychange", z),
				() => document.removeEventListener("visibilitychange", z)
			);
		}, [i, u.atLatest, j, u.sequence, o, u.denied, e.onObservedRead]));
	const D = () => {
		if (e.sendInFlight) return;
		const z = e.threadRootId;
		(e.setThreadRootId(null), z && queueMicrotask(() => (g.current.get(z) ?? m.current)?.focus()));
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
								? (0, S.jsx)("p", { className: "channel-privacy", children: rg })
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
							const z = m.current;
							if (!z) return;
							((p.current = z.scrollHeight - z.scrollTop - z.clientHeight < 80),
								p.current && u.atLatest && M(u.sequence));
							const O = [...z.querySelectorAll("[data-key]")].find(
								(U) => U.getBoundingClientRect().bottom >= z.getBoundingClientRect().top,
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
							(0, S.jsx)(uC, { window: u, disabled: e.sendInFlight || !i }),
							u.loading
								? (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading messages…" })
								: null,
							i && !u.denied && !u.loading && !u.rows.length && !l.value.pending.length
								? (0, S.jsx)("p", { className: "channel-status", children: "No messages yet" })
								: null,
							(0, S.jsxs)("ul", {
								className: "message-list",
								children: [
									(0, S.jsx)(lC, {
										...e,
										rows: u.rows,
										editingMessageId: u.editingMessageId,
										onEditingChange: u.setEditingMessage,
										readSequence: e.openedAtReadSequence,
										onOpenThread: (z) => {
											e.sendInFlight || e.setThreadRootId(z);
										},
										threadDisabled: e.sendInFlight,
										setReplyTrigger: (z, O) => {
											O ? g.current.set(z, O) : g.current.delete(z);
										},
									}),
									(0, S.jsx)(sC, { draft: l, queue: f, disabled: !n.ready || !n.can_request_now() }),
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
										"aria-valuemin": eu,
										"aria-valuemax": A,
										onKeyDown: (z) => {
											["ArrowLeft", "ArrowRight", "Home"].includes(z.key) &&
												(z.preventDefault(),
												x(Math.min(A, Math.max(eu, z.key === "Home" ? Tm : N + (z.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (z) => {
											(z.preventDefault(), z.currentTarget.setPointerCapture(z.pointerId));
										},
										onPointerMove: (z) => {
											z.currentTarget.hasPointerCapture(z.pointerId) &&
												h.current &&
												x(Math.min(A, Math.max(eu, h.current.getBoundingClientRect().right - z.clientX)));
										},
										onDoubleClick: () => x(Tm),
									}),
									(0, S.jsx)(Fq, { ...e, rootMessageId: e.threadRootId, onClose: D }, e.threadRootId),
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
			(0, S.jsx)(iC, {
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
function cC(e) {
	const n = vr(),
		i = pt(n, De.transcripts.status, { channelId: e.channelId }),
		o = eE(De.transcripts.connect),
		u = Na(De.transcripts.retry),
		l = Na(De.transcripts.reconcile),
		[f, h] = (0, _.useState)(!1),
		[m, g] = (0, _.useState)(null),
		[p, b] = (0, _.useState)(!1),
		[y, w] = (0, _.useState)(!1),
		E = (0, _.useRef)(null),
		T = (0, _.useRef)(null),
		x = (0, _.useId)(),
		j = (0, _.useId)(),
		M = async () => {
			if (!f) {
				if (!n.can_request_now()) {
					g("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				((E.current ??= crypto.randomUUID()), h(!0), g(null));
				try {
					const z = await e.client.getToken();
					if (!n.can_request_now()) {
						g("Chitchat is reconnecting. Try again shortly.");
						return;
					}
					const O = await o({ channelId: e.channelId, pluginToken: z, clientRequestId: E.current });
					O._nay ? g(O._nay.message) : (E.current = null);
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
					const z = await u({ channelId: e.channelId });
					z._nay && g(z._nay.message);
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
						const z = await l({ channelId: e.channelId, clientRequestId: T.current });
						z._nay ? g(z._nay.message) : ((T.current = null), b(!1), w(!1));
					} catch {
						g("Could not confirm the rebuild request. Retry to check it.");
					} finally {
						h(!1);
					}
				}
			}
		},
		D = i
			? i.deletionPhase
				? i.status === "blocked"
					? "Channel deleted. Its Files copies need attention."
					: i.deletionPhase === "copy"
						? "Channel deleted. Saving its last messages in Files…"
						: "Channel deleted. Archiving its Files copies…"
				: i.status === "ready"
					? i.indexStatus === "blocked"
						? "Chat is saved. The channel index needs attention."
						: i.indexStatus === "ready"
							? "Saved in Files"
							: "Channel saved. Updating the channel index…"
					: i.status === "not_connected"
						? "Chat is saved. Connect Files to keep Markdown copies."
						: i.status === "blocked"
							? "Chat is saved. Transcript sync needs attention."
							: "Chat is saved. Updating Files…"
			: "Checking transcript access…";
	return (0, S.jsxs)(S.Fragment, {
		children: [
			(0, S.jsxs)("div", {
				className: "transcript-status",
				children: [
					(0, S.jsx)("span", { role: "status", children: D }),
					i?.canConnect
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void M(),
								children: f ? "Connecting…" : i.status === "not_connected" ? "Connect Files" : "Reconnect Files",
							})
						: null,
					(i?.status === "blocked" || i?.indexStatus === "blocked") && i.canConnect
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void A(),
								children: "Retry sync",
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
									i.status === "blocked" && i.folderPath
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
				? (0, S.jsxs)(Xo, {
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
								htmlFor: j,
								children: [
									(0, S.jsx)("input", {
										id: j,
										type: "checkbox",
										checked: y,
										disabled: f,
										onChange: (z) => w(z.currentTarget.checked),
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
function Gq(e, n) {
	const i = Va(),
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
					j = i
						.query(De.members.resolve, { userIds: x })
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
				for (const M of x) u.current.set(M, { promise: j, author: b.has(M) });
				w.add(j);
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
function tv(e, n) {
	const i = e.get(n);
	return i === void 0 ? "…" : (i ?? "Former member");
}
function Xq(e) {
	const n = zr(`${e.scopeKey}:public`),
		i = zr(`${e.scopeKey}:private`),
		o = pt(e.session, De.views.unreads, { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } }),
		u = pt(e.session, De.views.unreads, { visibility: "private", paginationOpts: { numItems: 50, cursor: i.cursor } });
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
																				children: tf(g.lastActivityAt, Date.now()),
																			}),
																			g.latest
																				? (0, S.jsxs)("span", {
																						className: "view-row-preview",
																						children: [
																							tv(e.memberNames, g.latest.authorHostUserId),
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
function Jq(e) {
	const n = zr(e.scopeKey),
		i = pt(e.session, De.views.activity, { paginationOpts: { numItems: 50, cursor: n.cursor } });
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
																	children: tv(e.memberNames, f.authorHostUserId),
																}),
																(0, S.jsx)("span", {
																	className: "view-row-time",
																	children: tf(f.createdAt, Date.now()),
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
function Wq(e) {
	const n = zr(e.scopeKey),
		i = pt(e.session, De.views.threads, { paginationOpts: { numItems: 50, cursor: n.cursor } });
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
														children: tf(o.latest.createdAt, Date.now()),
													}),
													(0, S.jsxs)("span", {
														className: "view-row-preview",
														children: [
															o.summary.activeReplyCount,
															" ",
															o.summary.activeReplyCount === 1 ? "reply" : "replies",
															" ·",
															" ",
															tv(e.memberNames, o.latest.authorHostUserId),
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
function eL(e) {
	const n = zr(e.scopeKey),
		i = pt(e.session, De.transcripts.list_deletions, { paginationOpts: { numItems: 20, cursor: n.cursor } });
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
											(0, S.jsx)(cC, { client: e.client, channelId: o.channelId }),
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
function tL(e) {
	const n = pt(e.session, De.channels.permissions, { channelId: e.channel._id }),
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
				children: (0, S.jsx)(oq, {
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
var nL = class extends _.Component {
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
function Ew(e, n) {
	const i = Va(),
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
				? i.mutation(De.read_states.mark_thread_read, {
						rootMessageId: e.rootMessageId,
						replySequence: e.replySequence,
					})
				: i.mutation(De.read_states.mark_read, { channelId: e.channelId, rootSequence: e.rootSequence })
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
function rL(e) {
	const n = Va(),
		i = vr(),
		o = e.client.context.userId,
		u = `${i.member?.generation ?? "loading"}:${i.member?.membershipLifetime ?? 0}`,
		l = Gq(u, i.ready || i.refreshing),
		f = zr(`${u}:public`),
		h = zr(`${u}:private`),
		m = zr(`${u}:archived`),
		g = zr(`${u}:archived-private`),
		[p, b] = (0, _.useState)(!1),
		y = pt(i, De.channels.list_public, { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } }),
		w = pt(i, De.channels.list_mine, { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } }),
		E = pt(i, De.channels.list_mine, p ? { archived: !0, paginationOpts: { numItems: 50, cursor: g.cursor } } : "skip"),
		T = pt(
			i,
			De.channels.list_public,
			p ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[x, j] = (0, _.useState)(null),
		[M, A] = (0, _.useState)(null),
		[N, D] = (0, _.useState)(null),
		[z, O] = (0, _.useState)(!1),
		[U, H] = (0, _.useState)(!1),
		[re, R] = (0, _.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[q, P] = (0, _.useState)(0),
		[F, Y] = (0, _.useState)({ sequence: 0, text: "" }),
		[B, te] = (0, _.useState)(null),
		[ne, L] = (0, _.useState)(null),
		ee = re && M !== null,
		K = x?.kind === "channel" ? x.id : null,
		se = pt(i, De.channels.get, K ? { channelId: K } : "skip"),
		xe = pt(i, De.channels.permissions, K ? { channelId: K } : "skip"),
		ge = se ?? null,
		k = (0, _.useRef)(null),
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
		ve = (0, _.useId)(),
		Ge = (0, _.useId)(),
		ct = (0, _.useMemo)(
			() => [...(y?.page ?? []), ...(w?.page ?? []), ...(T?.page ?? []), ...(E?.page ?? [])],
			[y, w, T, E],
		),
		mt = (0, _.useMemo)(
			() =>
				Object.fromEntries(
					ct.map((he) => [he._id, { query: De.read_states.get_for_channel, args: { channelId: he._id } }]),
				),
			[ct],
		),
		_t = ng(mt),
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
					te((Te) =>
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
				L((Te) =>
					Te?.scopeKey === u && Te.rootMessageId === he.rootMessageId && Te.replySequence >= he.replySequence
						? Te
						: { scopeKey: u, ...he },
				);
			},
			[u],
		);
	(Ew(B, B?.scopeKey === u && i.connected && i.can_request_now() && B?.channelId === se?._id),
		Ew(ne, ne?.scopeKey === u && i.connected && i.can_request_now() && !!se && ne?.rootMessageId === M));
	const Ct = (0, _.useCallback)(
			async (he, Te) => {
				if (q > 0 || !i.ready) return;
				const bt = ++_e.current;
				try {
					const Tt = await n.query(De.read_states.get_for_channel, { channelId: he._id });
					if (bt !== _e.current) return;
					(j({ kind: "channel", id: he._id, openedAtReadSequence: Tt?.state?.rootSequence ?? 0 }),
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
		jt = (0, _.useCallback)(() => {
			(D(null), (Ee.current = "selected"));
		}, []),
		hn = (0, _.useCallback)(() => {
			(D(null), b(!0), (Ee.current = "selected"));
		}, []);
	((0, _.useEffect)(() => {
		const he = (bt) => {
				bt.target instanceof Node && !k.current?.contains(bt.target) && (fe.current = null);
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
							: fe.current === "sidebar" && !z
								? "drawer"
								: null
						: fe.current === "drawer"
							? "selected"
							: null),
						bt.matches && M && O(!1),
						R(bt.matches));
				};
			return (he.addEventListener("change", Te), () => he.removeEventListener("change", Te));
		}, [z, M]),
		(0, _.useLayoutEffect)(() => {
			if (document.querySelector(".dialog-overlay")) return;
			const he = Ee.current;
			if (((Ee.current = null), he === "thread" || (he !== null && re && M))) {
				const Te = k.current?.querySelector(".thread"),
					bt = Te?.querySelector(".thread-head button:not([disabled])");
				bt ? bt.focus() : Te ? Te.focus() : W.current?.focus();
			} else if (he === "drawer" || (he === "selected" && re && !z)) W.current?.focus();
			else if (he === "selected") {
				const Te = ae.current?.querySelector('[aria-current="page"]');
				Te && !Te.disabled ? Te.focus() : ae.current?.focus();
			}
		}, [N, re, M, z]));
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
									tL,
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
		ref: k,
		className: "chitchat",
		onFocusCapture: (he) => {
			const Te = he.target;
			fe.current =
				Te === W.current
					? "drawer"
					: ae.current?.contains(Te)
						? "sidebar"
						: Te.classList.contains("thread-resize")
							? "separator"
							: k.current?.contains(Te) && !Te.closest(".thread")
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
						"aria-expanded": z,
						onClick: () => O((he) => !he),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: ae,
				inert: ee || void 0,
				className: ["sidebar", z && "is-open", U && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (he) => {
					he.key === "Escape" && re && z && (O(!1), W.current?.focus());
				},
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: re && !z ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": U,
									"aria-label": U ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => H((he) => !he),
									children: U ? "«" : "»",
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
													j({ kind: he }),
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
														Qt("Archived", ve, T?.page ?? []),
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
									children: i.message ? "Channel access is unavailable." : "Loading channels…",
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
							K ? (0, S.jsx)(cC, { client: e.client, channelId: K }, `transcript:${K}`) : null,
							i.message
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
						? (0, S.jsx)(Xq, { scopeKey: u, session: i, memberNames: l, onOpen: Ct })
						: x?.kind === "activity"
							? (0, S.jsx)(Jq, { scopeKey: u, session: i, userId: o, memberNames: l, onOpen: Ct })
							: x?.kind === "threads"
								? (0, S.jsx)(Wq, { scopeKey: u, session: i, memberNames: l, onOpen: Ct })
								: x?.kind === "transcripts"
									? (0, S.jsx)(eL, { client: e.client, scopeKey: u, session: i })
									: x?.kind === "channel"
										? (0, S.jsx)(
												Yq,
												{
													client: e.client,
													channelId: x.id,
													channel: ge,
													userId: o,
													memberNames: l,
													announce: Qe,
													threadRootId: M,
													setThreadRootId: (he) => {
														(A(he), he && O(!1));
													},
													isNarrow: re,
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
				? (0, S.jsx)(SS, {
						channel: null,
						selfUserId: o,
						onClose: jt,
						onSaved: (he) => {
							(jt(), j({ kind: "channel", id: he, openedAtReadSequence: 0 }), A(null));
						},
					})
				: null,
			N?.kind === "rename" ? (0, S.jsx)(SS, { channel: N.channel, selfUserId: o, onClose: jt, onSaved: jt }) : null,
			N?.kind === "people" ? (0, S.jsx)(k2, { channelId: N.channel._id, selfUserId: o, onClose: jt }) : null,
			N && N.kind !== "create" && N.kind !== "rename" && N.kind !== "people"
				? (0, S.jsx)(q2, { channel: N.channel, action: N.kind, onClose: jt, onDone: hn })
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
function fC(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var dC = document.getElementById("root");
if (!dC) throw new Error("index.html is missing the #root element");
var Wm = (0, nR.createRoot)(dC);
Wm.render((0, S.jsx)(fC, { message: "Connecting…" }));
GA().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			Wm.render(
				(0, S.jsx)(nL, { client: e, children: (0, S.jsx)(j2, { client: e, children: (0, S.jsx)(rL, { client: e }) }) }),
			));
	},
	(e) => {
		Wm.render((0, S.jsx)(fC, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
