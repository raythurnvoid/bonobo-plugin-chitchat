var Fx = Object.create,
	Cw = Object.defineProperty,
	Qx = Object.getOwnPropertyDescriptor,
	Yx = Object.getOwnPropertyNames,
	Kx = Object.getPrototypeOf,
	Tw = Object.prototype.hasOwnProperty,
	sr = (e, n) => () => (n || (e((n = { exports: {} }).exports, n, n.exports), (e = null)), n.exports),
	Gx = (e, n, i, o) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var u = Yx(n), l = 0, f = u.length, h; l < f; l++)
				((h = u[l]),
					!Tw.call(e, h) &&
						h !== i &&
						Cw(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(o = Qx(n, h)) || o.enumerable }));
		return e;
	},
	Xx = (e, n, i) => (
		(i = e != null ? Fx(Kx(e)) : {}),
		Gx(n || !e || !e.__esModule || !Tw.call(e, "default") ? Cw(i, "default", { value: e, enumerable: !0 }) : i, e)
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
var Jx = sr((e) => {
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
			M = Object.assign,
			L = {};
		function A(j, ae, W) {
			((this.props = j), (this.context = ae), (this.refs = L), (this.updater = W || x));
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
		function k() {}
		k.prototype = A.prototype;
		function N(j, ae, W) {
			((this.props = j), (this.context = ae), (this.refs = L), (this.updater = W || x));
		}
		var I = (N.prototype = new k());
		((I.constructor = N), M(I, A.prototype), (I.isPureReactComponent = !0));
		var O = Array.isArray;
		function q() {}
		var $ = { H: null, A: null, T: null, S: null },
			ne = Object.prototype.hasOwnProperty;
		function D(j, ae, W) {
			var fe = W.ref;
			return { $$typeof: n, type: j, key: ae, ref: fe !== void 0 ? fe : null, props: W };
		}
		function R(j, ae) {
			return D(j.type, ae, j.props);
		}
		function B(j) {
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
		var G = /\/+/g;
		function V(j, ae) {
			return typeof j == "object" && j !== null && j.key != null ? F("" + j.key) : ae.toString(36);
		}
		function ee(j) {
			switch (j.status) {
				case "fulfilled":
					return j.value;
				case "rejected":
					throw j.reason;
				default:
					switch (
						(typeof j.status == "string"
							? j.then(q, q)
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
					(Ce = fe === "" ? "." + V(j, 0) : fe),
					O(Ee)
						? ((W = ""),
							Ce != null && (W = Ce.replace(G, "$&/") + "/"),
							re(Ee, ae, W, "", function (Ge) {
								return Ge;
							}))
						: Ee != null &&
							(B(Ee) &&
								(Ee = R(
									Ee,
									W + (Ee.key == null || (j && j.key === Ee.key) ? "" : ("" + Ee.key).replace(G, "$&/") + "/") + Ce,
								)),
							ae.push(Ee)),
					1
				);
			Ce = 0;
			var ce = fe === "" ? "." : fe + ":";
			if (O(j))
				for (var ve = 0; ve < j.length; ve++) ((fe = j[ve]), (_e = ce + V(fe, ve)), (Ce += re(fe, ae, W, _e, Ee)));
			else if (((ve = T(j)), typeof ve == "function"))
				for (j = ve.call(j), ve = 0; !(fe = j.next()).done;)
					((fe = fe.value), (_e = ce + V(fe, ve++)), (Ce += re(fe, ae, W, _e, Ee)));
			else if (_e === "object") {
				if (typeof j.then == "function") return re(ee(j), ae, W, fe, Ee);
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
		function te(j) {
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
		var Y =
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
			var ae = $.T,
				W = {};
			((W.types = ae !== null ? ae.types : null), ($.T = W));
			try {
				var fe = j(),
					Ee = $.S;
				(Ee !== null && Ee(W, fe),
					typeof fe == "object" && fe !== null && typeof fe.then == "function" && fe.then(q, Y));
			} catch (_e) {
				Y(_e);
			} finally {
				(ae !== null && W.types !== null && (ae.types = W.types), ($.T = ae));
			}
		}
		function xe(j) {
			var ae = $.T;
			if (ae !== null) {
				var W = ae.types;
				W === null ? (ae.types = [j]) : W.indexOf(j) === -1 && W.push(j);
			} else ue(xe.bind(null, j));
		}
		var me = {
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
				if (!B(j)) throw Error("React.Children.only expected to receive a single React element child.");
				return j;
			},
		};
		((e.Activity = y),
			(e.Children = me),
			(e.Component = A),
			(e.Fragment = o),
			(e.Profiler = l),
			(e.PureComponent = N),
			(e.StrictMode = u),
			(e.Suspense = g),
			(e.ViewTransition = w),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (j) {
					return $.H.useMemoCache(j);
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
				var fe = M({}, j.props),
					Ee = j.key;
				if (ae != null)
					for (_e in (ae.key !== void 0 && (Ee = "" + ae.key), ae))
						!ne.call(ae, _e) ||
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
				return D(j.type, Ee, fe);
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
						ne.call(ae, fe) && fe !== "key" && fe !== "__self" && fe !== "__source" && (Ee[fe] = ae[fe]);
				var Ce = arguments.length - 2;
				if (Ce === 1) Ee.children = W;
				else if (1 < Ce) {
					for (var ce = Array(Ce), ve = 0; ve < Ce; ve++) ce[ve] = arguments[ve + 2];
					Ee.children = ce;
				}
				if (j && j.defaultProps) for (fe in ((Ce = j.defaultProps), Ce)) Ee[fe] === void 0 && (Ee[fe] = Ce[fe]);
				return D(j, _e, Ee);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (j) {
				return { $$typeof: m, render: j };
			}),
			(e.isValidElement = B),
			(e.lazy = function (j) {
				return { $$typeof: b, _payload: { _status: -1, _result: j }, _init: te };
			}),
			(e.memo = function (j, ae) {
				return { $$typeof: p, type: j, compare: ae === void 0 ? null : ae };
			}),
			(e.startTransition = ue),
			(e.unstable_useCacheRefresh = function () {
				return $.H.useCacheRefresh();
			}),
			(e.use = function (j) {
				return $.H.use(j);
			}),
			(e.useActionState = function (j, ae, W) {
				return $.H.useActionState(j, ae, W);
			}),
			(e.useCallback = function (j, ae) {
				return $.H.useCallback(j, ae);
			}),
			(e.useContext = function (j) {
				return $.H.useContext(j);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (j, ae) {
				return $.H.useDeferredValue(j, ae);
			}),
			(e.useEffect = function (j, ae) {
				return $.H.useEffect(j, ae);
			}),
			(e.useEffectEvent = function (j) {
				return $.H.useEffectEvent(j);
			}),
			(e.useId = function () {
				return $.H.useId();
			}),
			(e.useImperativeHandle = function (j, ae, W) {
				return $.H.useImperativeHandle(j, ae, W);
			}),
			(e.useInsertionEffect = function (j, ae) {
				return $.H.useInsertionEffect(j, ae);
			}),
			(e.useLayoutEffect = function (j, ae) {
				return $.H.useLayoutEffect(j, ae);
			}),
			(e.useMemo = function (j, ae) {
				return $.H.useMemo(j, ae);
			}),
			(e.useOptimistic = function (j, ae) {
				return $.H.useOptimistic(j, ae);
			}),
			(e.useReducer = function (j, ae, W) {
				return $.H.useReducer(j, ae, W);
			}),
			(e.useRef = function (j) {
				return $.H.useRef(j);
			}),
			(e.useState = function (j) {
				return $.H.useState(j);
			}),
			(e.useSyncExternalStore = function (j, ae, W) {
				return $.H.useSyncExternalStore(j, ae, W);
			}),
			(e.useTransition = function () {
				return $.H.useTransition();
			}),
			(e.version = "19.3.1"));
	}),
	tf = sr((e, n) => {
		n.exports = Jx();
	}),
	Dr = [],
	ir = [],
	Wx = Uint8Array,
	tm = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var jo = 0, eO = tm.length; jo < eO; ++jo) ((Dr[jo] = tm[jo]), (ir[tm.charCodeAt(jo)] = jo));
ir[45] = 62;
ir[95] = 63;
function tO(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = n);
	var o = i === n ? 0 : 4 - (i % 4);
	return [i, o];
}
function nO(e, n, i) {
	return ((n + i) * 3) / 4 - i;
}
function lu(e) {
	for (
		var n, i = tO(e), o = i[0], u = i[1], l = new Wx(nO(e, o, u)), f = 0, h = u > 0 ? o - 4 : o, m = 0;
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
function rO(e) {
	return Dr[(e >> 18) & 63] + Dr[(e >> 12) & 63] + Dr[(e >> 6) & 63] + Dr[e & 63];
}
function iO(e, n, i) {
	for (var o, u = [], l = n; l < i; l += 3)
		((o = ((e[l] << 16) & 16711680) + ((e[l + 1] << 8) & 65280) + (e[l + 2] & 255)), u.push(rO(o)));
	return u.join("");
}
function cu(e) {
	for (var n, i = e.length, o = i % 3, u = [], l = 16383, f = 0, h = i - o; f < h; f += l)
		u.push(iO(e, f, f + l > h ? h : f + l));
	return (
		o === 1
			? ((n = e[i - 1]), u.push(Dr[n >> 2] + Dr[(n << 4) & 63] + "=="))
			: o === 2 &&
				((n = (e[i - 2] << 8) + e[i - 1]), u.push(Dr[n >> 10] + Dr[(n >> 4) & 63] + Dr[(n << 2) & 63] + "=")),
		u.join("")
	);
}
function ai(e) {
	if (e === void 0) return {};
	if (!xw(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function aO(e) {
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
	oO = BigInt("8"),
	sO = BigInt("256"),
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
	uO = new Aw();
function Rw(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function lO(e) {
	e < Om && (e -= Ho + Ho);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const i = new Uint8Array(new ArrayBuffer(8));
	let o = 0;
	for (const u of n.match(/.{2}/g).reverse()) (i.set([parseInt(u, 16)], o++), (e >>= oO));
	return cu(i);
}
function cO(e) {
	const n = lu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let i = Om,
		o = Om;
	for (const u of n) ((i += BigInt(u) * sO ** o), o++);
	return (i > tg && (i += Ho + Ho), i);
}
function fO(e) {
	if (e < Ho || tg < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), cu(new Uint8Array(n)));
}
function dO(e) {
	const n = lu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var hO = DataView.prototype.setBigInt64 ? fO : lO,
	mO = DataView.prototype.getBigInt64 ? dO : cO,
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
			return mO(e.$integer);
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
			return uO;
		}
		if (o === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (o === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const i = {};
	for (const [o, u] of Object.entries(e)) (Am(o), (i[o] = Zo(u)));
	return i;
}
var gO = 16384;
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
	if (n.length > gO) {
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
		return { $integer: hO(e) };
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
		h !== void 0 ? (Am(f), (u[f] = Mc(h, n, i + `.${f}`, !1))) : o && (Am(f), (u[f] = vO(h, n, i + `.${f}`)));
	return u;
}
function rm(e, n, i, o) {
	return e
		? `${n}${Bo(i)} is not a supported Convex type (present at path ${e} in original object ${Bo(o)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${Bo(i)} is not a supported Convex type.`;
}
function vO(e, n, i) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${Bo(e)} but original value is undefined`);
	return Mc(e, n, i, !1);
}
function gr(e) {
	return Mc(e, e, "", !1);
}
var yO = Object.defineProperty,
	pO = (e, n, i) => (n in e ? yO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	bt = (e, n, i) => pO(e, typeof n != "symbol" ? n + "" : n, i),
	bO = "https://docs.convex.dev/error#undefined-validator";
function fu(e, n) {
	const i = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${i} in ${e}. This is often caused by circular imports. See ${bO} for details.`,
	);
}
var In = class {
		constructor({ isOptional: e }) {
			(bt(this, "type"),
				bt(this, "fieldPaths"),
				bt(this, "isOptional"),
				bt(this, "isConvexValidator"),
				(this.isOptional = e),
				(this.isConvexValidator = !0));
		}
	},
	SO = class Nw extends In {
		constructor({ isOptional: n, tableName: i }) {
			if ((super({ isOptional: n }), bt(this, "tableName"), bt(this, "kind", "id"), typeof i != "string"))
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
			(super(...arguments), bt(this, "kind", "float64"));
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
			(super(...arguments), bt(this, "kind", "int64"));
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
	wO = class zw extends In {
		constructor() {
			(super(...arguments), bt(this, "kind", "commitTs"));
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
			(super(...arguments), bt(this, "kind", "boolean"));
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
	_O = class kw extends In {
		constructor() {
			(super(...arguments), bt(this, "kind", "bytes"));
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
	CO = class jw extends In {
		constructor() {
			(super(...arguments), bt(this, "kind", "string"));
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
	TO = class qw extends In {
		constructor() {
			(super(...arguments), bt(this, "kind", "null"));
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
	xO = class Lw extends In {
		constructor() {
			(super(...arguments), bt(this, "kind", "any"));
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
	OO = class qo extends In {
		constructor({ isOptional: n, fields: i }) {
			(super({ isOptional: n }),
				bt(this, "fields"),
				bt(this, "kind", "object"),
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
	AO = class Uw extends In {
		constructor({ isOptional: n, value: i }) {
			if (
				(super({ isOptional: n }),
				bt(this, "value"),
				bt(this, "kind", "literal"),
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
	RO = class Vw extends In {
		constructor({ isOptional: n, element: i }) {
			(super({ isOptional: n }),
				bt(this, "element"),
				bt(this, "kind", "array"),
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
	NO = class Bw extends In {
		constructor({ isOptional: n, key: i, value: o }) {
			if (
				(super({ isOptional: n }),
				bt(this, "key"),
				bt(this, "value"),
				bt(this, "kind", "record"),
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
	MO = class Pw extends In {
		constructor({ isOptional: n, members: i }) {
			(super({ isOptional: n }),
				bt(this, "members"),
				bt(this, "kind", "union"),
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
	be = {
		id: (e) => new SO({ isOptional: "required", tableName: e }),
		null: () => new TO({ isOptional: "required" }),
		number: () => new Sb({ isOptional: "required" }),
		float64: () => new Sb({ isOptional: "required" }),
		bigint: () => new wb({ isOptional: "required" }),
		int64: () => new wb({ isOptional: "required" }),
		commitTs: () => new wO({ isOptional: "required" }),
		boolean: () => new EO({ isOptional: "required" }),
		string: () => new CO({ isOptional: "required" }),
		bytes: () => new _O({ isOptional: "required" }),
		literal: (e) => new AO({ isOptional: "required", value: e }),
		array: (e) => new RO({ isOptional: "required", element: e }),
		object: (e) => new OO({ isOptional: "required", fields: e }),
		record: (e, n) => new NO({ isOptional: "required", key: e, value: n }),
		union: (...e) => new MO({ isOptional: "required", members: e }),
		any: () => new xO({ isOptional: "required" }),
		optional: (e) => e.asOptional(),
		nullable: (e) => be.union(e, be.null()),
	},
	DO = Object.defineProperty,
	zO = (e, n, i) => (n in e ? DO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	im = (e, n, i) => zO(e, typeof n != "symbol" ? n + "" : n, i),
	Eb,
	_b,
	IO = Symbol.for("ConvexError"),
	Rm = class extends ((_b = Error), (Eb = IO), _b) {
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
	jO = (e, n, i) => (n in e ? kO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Tb = (e, n, i) => jO(e, typeof n != "symbol" ? n + "" : n, i),
	qO = "color:rgb(0, 145, 255)";
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
		e.log(`%c[CONVEX ${l}(${o})] [${h}]`, qO, m);
	} else e.error(`[CONVEX ${l}(${o})] ${u}`);
}
function LO(e, n) {
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
var UO = Object.defineProperty,
	VO = (e, n, i) => (n in e ? UO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Mr = (e, n, i) => VO(e, typeof n != "symbol" ? n + "" : n, i),
	BO = class {
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
	PO = Object.defineProperty,
	$O = (e, n, i) => (n in e ? PO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	dc = (e, n, i) => $O(e, typeof n != "symbol" ? n + "" : n, i),
	HO = class {
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
function ZO(e) {
	return e[Qw] ?? null;
}
function FO(e) {
	return e.startsWith("function://");
}
function QO(e) {
	let n;
	if (typeof e == "string") FO(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[du]) n = { name: e[du] };
	else {
		const i = ZO(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		n = { reference: i };
	}
	return n;
}
function yn(e) {
	const n = QO(e);
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
	YO = Object.defineProperty,
	KO = (e, n, i) => (n in e ? YO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	zc = (e, n, i) => KO(e, typeof n != "symbol" ? n + "" : n, i),
	Ob = class Mm {
		constructor(n) {
			(zc(this, "queryResults"), zc(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...i) {
			const o = ai(i[0]),
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
			const u = ai(i),
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
	GO = class {
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
	XO = Object.defineProperty,
	JO = (e, n, i) => (n in e ? XO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	am = (e, n, i) => JO(e, typeof n != "symbol" ? n + "" : n, i),
	wu = class ri {
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
			return new ri(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? Ab : n >= WO ? eA : new ri((n % au) | 0, (n / au) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(au) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				ri.isLong(n) || (n = ri.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				ri.isLong(n) || (n = ri.fromValue(n)),
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
			return typeof n == "number" ? ri.fromNumber(n) : new ri(n.low, n.high);
		}
	},
	Ab = new wu(0, 0),
	Rb = 65536,
	au = Rb * Rb,
	WO = au * au,
	eA = new wu(-1, -1),
	tA = Object.defineProperty,
	nA = (e, n, i) => (n in e ? tA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	hc = (e, n, i) => nA(e, typeof n != "symbol" ? n + "" : n, i),
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
function rA(e) {
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
function iA(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: rA(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
	}
}
var aA = Object.defineProperty,
	oA = (e, n, i) => (n in e ? aA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Pt = (e, n, i) => oA(e, typeof n != "symbol" ? n + "" : n, i),
	sA = 1e3,
	uA = 1001,
	lA = 1005,
	cA = 4040,
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
function fA(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(Gw)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var dA = class {
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
					n.code !== sA && n.code !== uA && n.code !== lA && n.code !== cA)
				) {
					let o = `WebSocket closed with code ${n.code}`;
					(n.reason && (o += `: ${n.reason}`),
						this.logger.log(o),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(o));
				}
				const i = fA(n.reason);
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
			const i = iA(e),
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
function hA() {
	return mA();
}
function mA() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var nu = class extends Error {};
nu.prototype.name = "InvalidTokenError";
function gA(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, i) => {
			let o = i.charCodeAt(0).toString(16).toUpperCase();
			return (o.length < 2 && (o = "0" + o), "%" + o);
		}),
	);
}
function vA(e) {
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
		return gA(n);
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
		u = vA(o);
	} catch (l) {
		throw new nu(`Invalid token specified: invalid base64 for part #${i + 1} (${l.message})`);
	}
	try {
		return JSON.parse(u);
	} catch (l) {
		throw new nu(`Invalid token specified: invalid json for part #${i + 1} (${l.message})`);
	}
}
var yA = Object.defineProperty,
	pA = (e, n, i) => (n in e ? yA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Nn = (e, n, i) => pA(e, typeof n != "symbol" ? n + "" : n, i),
	bA = 1728e6,
	zb = 2,
	SA = class {
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
			let h = Math.min(bA, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
	wA = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function EA(e, n) {
	const i = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function _A(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function CA(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const i of wA) {
		const o = performance
			.getEntriesByName(i)
			.filter((u) => u.entryType === "mark")
			.filter((u) => u.detail.sessionId === e);
		n.push(...o);
	}
	return n.map(_A);
}
var TA = Object.defineProperty,
	xA = (e, n, i) => (n in e ? TA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	$t = (e, n, i) => xA(e, typeof n != "symbol" ? n + "" : n, i),
	OA = class {
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
					this.debug && EA(y, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && aO(e), (i = { ...i }));
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
			((this.state = new BO()),
				(this.remoteQuerySet = new Nb((y) => this.state.queryPath(y), this.logger)),
				(this.requestManager = new HO(this.logger, this.markConnectionStateDirty)));
			const p = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new SA(
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
				(this.optimisticQueryResults = new GO()),
				this.addOnTransitionHandler((y) => {
					n(y.queries.map((w) => w.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = hA()));
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
			((this.webSocketManager = new dA(
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
								const w = LO(this.logger, y.error);
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
			const o = ai(n),
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
			const i = ai(n),
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
			const i = ai(n),
				o = Na(e, i);
			return this.optimisticQueryResults.queryLogs(o);
		}
		queryJournal(e, n) {
			const i = ai(n),
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
			const u = ai(n);
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
			const o = ai(n),
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
				const e = CA(this.sessionId);
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
var AA = Object.defineProperty,
	RA = (e, n, i) => (n in e ? AA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	Ib = (e, n, i) => RA(e, typeof n != "symbol" ? n + "" : n, i),
	NA = class {
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
	_ = Xx(tf(), 1);
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
var MA = Object.defineProperty,
	DA = (e, n, i) => (n in e ? MA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	ni = (e, n, i) => DA(e, typeof n != "symbol" ? n + "" : n, i),
	zA = 5e3;
if (typeof _.default > "u") throw new Error("Required dependency 'react' not found");
function Ww(e, n, i) {
	function o(u) {
		return (qA(u), n.mutation(e, u, { optimisticUpdate: i }));
	}
	return (
		(o.withOptimisticUpdate = function (l) {
			if (i !== void 0) throw new Error(`Already specified optimistic update for mutation ${yn(e)}`);
			return Ww(e, n, l);
		}),
		o
	);
}
function IA(e, n) {
	return function (i) {
		return n.action(e, i);
	};
}
var eE = class {
		constructor(e, n) {
			if (
				(ni(this, "address"),
				ni(this, "cachedSync"),
				ni(this, "cachedPaginatedQueryClient"),
				ni(this, "listeners"),
				ni(this, "options"),
				ni(this, "closed", !1),
				ni(this, "_logger"),
				ni(this, "adminAuth"),
				ni(this, "fakeUserIdentity"),
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
				: ((this.cachedSync = this.options.baseClient ?? new OA(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new NA(this.cachedSync, (e) => this.handleTransition(e))),
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
			const n = e.extendSubscriptionFor ?? zA,
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
		o = n[0] === "skip" ? {} : ai(n[0]),
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
	return (0, _.useMemo)(() => IA(i, n), [n, yn(i)]);
}
function jA() {
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
function qA(e) {
	if (typeof e == "object" && e !== null && "bubbles" in e && "persist" in e && "isDefaultPrevented" in e)
		throw new Error(
			"Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like `const handler = () => myMutation();` and using `handler` in the event handler.",
		);
}
var LA = Object.defineProperty,
	UA = (e, n, i) => (n in e ? LA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[n] = i)),
	um = (e, n, i) => UA(e, typeof n != "symbol" ? n + "" : n, i),
	VA = class {
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
	return BA(
		e,
		(0, _.useMemo)(
			() =>
				(i, o, { journal: u, paginationOptions: l }) =>
					l ? n.watchPaginatedQuery(i, o, l) : n.watchQuery(i, o, u ? { journal: u } : {}),
			[n],
		),
	);
}
function BA(e, n) {
	const [i] = (0, _.useState)(() => new VA(n));
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
var PA = () => nE("components", []),
	$A = Kw,
	kb = 6e4,
	HA = 500,
	ZA = 1e4,
	FA = 1e3,
	QA = 3e4,
	YA = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
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
function qb(e) {
	const n = document.documentElement;
	for (const [i, o] of Object.entries(e.tokens)) n.style.setProperty(i, o);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function KA(e) {
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
function GA() {
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
	if (!YA.test(l)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: u, nonce: l };
}
async function XA() {
	const { parentOrigin: e, nonce: n } = GA();
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
		return Date.now() >= u - kb ? w() : o;
	}
	function w() {
		if (b) return b;
		const N = crypto.randomUUID();
		return (
			(b = new Promise((I, O) => {
				const q = setTimeout(() => {
					(p.delete(N), O(new Error("Plugin frame token refresh timed out")));
				}, ZA);
				p.set(N, { resolve: I, reject: O, timeout: q });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: N }, e);
				} catch ($) {
					(clearTimeout(q), p.delete(N), O($));
				}
			}).finally(() => {
				b = null;
			})),
			b
		);
	}
	const E = () => l !== "" && Date.now() < f - kb,
		T = (N) => {
			typeof N.jwt == "string" && typeof N.jwtExpiresAt == "number" && Number.isFinite(N.jwtExpiresAt)
				? ((l = N.jwt), (f = N.jwtExpiresAt))
				: ((l = ""), (f = 0));
		};
	async function x(N, I, O) {
		const q = JSON.stringify(I),
			$ = (R) => {
				const B = new Headers(O?.headers);
				return (
					B.set("Authorization", `Bearer ${R}`),
					B.set("Content-Type", "application/json"),
					fetch(i + N, { ...O, method: "POST", body: q, headers: B, redirect: "error" })
				);
			},
			ne = await y();
		let D = await $(ne);
		return (D.status === 401 && (await D.body?.cancel(), (D = await $(o !== ne ? o : await w()))), D);
	}
	async function M(N, I, O) {
		const q = new Headers(O?.headers);
		q.set("Accept", "application/json");
		const $ = await x(N, I, { ...O, headers: q }),
			ne = await $.text();
		let D = null;
		try {
			D = JSON.parse(ne);
		} catch {}
		return { status: $.status, body: D };
	}
	async function L(N) {
		const I = new Headers(N);
		return (I.set("Authorization", `Bearer ${await y()}`), I);
	}
	const A = (N) =>
		fetch(i + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: N }),
		});
	async function k(N) {
		const I = N?.forceRefreshToken === !0;
		for (let O = 0; ; O += 1) {
			if (E() && !I) return l;
			let q = null;
			try {
				if (l !== "" && (await w(), E())) return l;
				((q = await A(await y())), q.status === 401 && (q = await A(await w())));
			} catch {
				q = null;
			}
			if (q?.ok) {
				const $ = await q.json().catch(() => null),
					ne = $?._yay?.jwt,
					D = $?._yay?.sessionExpiresAt;
				return typeof ne != "string" || typeof D != "number" ? null : ((u = D), (l = ne), (f = D), ne);
			}
			if (!(q === null || q.status === 429 || q.status >= 500) || O >= 2) return null;
			await new Promise(($) => setTimeout($, 1e3 * (O + 1)));
		}
	}
	return new Promise((N) => {
		let I = !1,
			O;
		const q = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			$ = () => {
				clearInterval(O);
			},
			ne = (D) => {
				if (D.source !== window.parent || D.origin !== e) return;
				const R = D.data;
				if (!(typeof R != "object" || R === null)) {
					if (
						R.type === "bonobo:init" &&
						!I &&
						R.nonce === n &&
						typeof R.apiOrigin == "string" &&
						typeof R.convexUrl == "string" &&
						typeof R.token == "string" &&
						typeof R.tokenExpiresAt == "number" &&
						Number.isFinite(R.tokenExpiresAt) &&
						KA(R.context)
					) {
						((I = !0),
							$(),
							window.removeEventListener("pagehide", $),
							(i = R.apiOrigin),
							(o = R.token),
							(u = R.tokenExpiresAt),
							T(R));
						const B = new eE(R.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let F = Date.now();
						const G = setInterval(() => {
							const V = Date.now();
							(V - F >= QA && B.setAuth(k), (F = V));
						}, FA);
						(B.setAuth(k),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(G), B.close());
								},
								{ once: !0 },
							),
							(h = jb(R.theme)),
							h && qb(h),
							N({
								context: R.context,
								apiOrigin: i,
								getToken: y,
								refreshToken: w,
								fetchRaw: x,
								fetchJson: M,
								authorize: L,
								convex: B,
								api: $A,
								session: { expiresAt: () => u, fetchJwt: k },
								theme: {
									current: () => h,
									subscribe(V) {
										return (
											m.add(V),
											() => {
												m.delete(V);
											}
										);
									},
								},
								agent: {
									registerTool(V, ee) {
										return (
											g.set(V, ee),
											() => {
												g.get(V) === ee && g.delete(V);
											}
										);
									},
								},
							}));
					} else if (
						I &&
						R.nonce === n &&
						R.type === "bonobo:token" &&
						typeof R.requestId == "string" &&
						typeof R.token == "string" &&
						typeof R.tokenExpiresAt == "number" &&
						Number.isFinite(R.tokenExpiresAt)
					) {
						const B = p.get(R.requestId);
						B &&
							(p.delete(R.requestId),
							clearTimeout(B.timeout),
							(o = R.token),
							(u = R.tokenExpiresAt),
							T(R),
							B.resolve(R.token));
					} else if (I && R.nonce === n && R.type === "bonobo:theme") {
						const B = jb(R.theme);
						if (B) {
							((h = B), qb(B));
							for (const F of m) F(B);
						}
					} else if (
						I &&
						R.nonce === n &&
						R.type === "bonobo:token-error" &&
						typeof R.requestId == "string" &&
						typeof R.message == "string"
					) {
						const B = p.get(R.requestId);
						B && (p.delete(R.requestId), clearTimeout(B.timeout), B.reject(new Error(R.message)));
					} else if (
						I &&
						R.nonce === n &&
						R.type === "bonobo:agent-tool-call" &&
						typeof R.callId == "string" &&
						typeof R.toolName == "string"
					) {
						const B = R.callId,
							F = (V) => {
								try {
									window.parent.postMessage({ type: "bonobo:agent-tool-result", nonce: n, callId: B, ...V }, e);
								} catch {
									window.parent.postMessage(
										{
											type: "bonobo:agent-tool-result",
											nonce: n,
											callId: B,
											ok: !1,
											error: "The tool output could not be sent",
										},
										e,
									);
								}
							},
							G = g.get(R.toolName);
						G
							? Promise.resolve()
									.then(() => G(R.input))
									.then(
										(V) => F({ ok: !0, output: V }),
										(V) => F({ ok: !1, error: V instanceof Error ? V.message : String(V) }),
									)
							: F({ ok: !1, error: `This page has no tool named ${R.toolName}` });
					}
				}
			};
		(window.addEventListener("message", ne),
			window.addEventListener("pagehide", $, { once: !0 }),
			q(),
			(O = setInterval(q, HA)));
	});
}
var JA = sr((e) => {
		function n(V, ee) {
			var re = V.length;
			V.push(ee);
			e: for (; 0 < re;) {
				var U = (re - 1) >>> 1,
					te = V[U];
				if (0 < u(te, ee)) ((V[U] = ee), (V[re] = te), (re = U));
				else break e;
			}
		}
		function i(V) {
			return V.length === 0 ? null : V[0];
		}
		function o(V) {
			if (V.length === 0) return null;
			var ee = V[0],
				re = V.pop();
			if (re !== ee) {
				V[0] = re;
				e: for (var U = 0, te = V.length, Y = te >>> 1; U < Y;) {
					var ue = 2 * (U + 1) - 1,
						xe = V[ue],
						me = ue + 1,
						j = V[me];
					if (0 > u(xe, re))
						me < te && 0 > u(j, xe) ? ((V[U] = j), (V[me] = re), (U = me)) : ((V[U] = xe), (V[ue] = re), (U = ue));
					else if (me < te && 0 > u(j, re)) ((V[U] = j), (V[me] = re), (U = me));
					else break e;
				}
			}
			return ee;
		}
		function u(V, ee) {
			var re = V.sortIndex - ee.sortIndex;
			return re !== 0 ? re : V.id - ee.id;
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
			M = typeof setTimeout == "function" ? setTimeout : null,
			L = typeof clearTimeout == "function" ? clearTimeout : null,
			A = typeof setImmediate < "u" ? setImmediate : null;
		function k(V) {
			for (var ee = i(g); ee !== null;) {
				if (ee.callback === null) o(g);
				else if (ee.startTime <= V) (o(g), (ee.sortIndex = ee.expirationTime), n(m, ee));
				else break;
				ee = i(g);
			}
		}
		function N(V) {
			if (((T = !1), k(V), !E))
				if (i(m) !== null) ((E = !0), I || ((I = !0), R()));
				else {
					var ee = i(g);
					ee !== null && G(N, ee.startTime - V);
				}
		}
		var I = !1,
			O = -1,
			q = 5,
			$ = -1;
		function ne() {
			return x ? !0 : !(e.unstable_now() - $ < q);
		}
		function D() {
			if (((x = !1), I)) {
				var V = e.unstable_now();
				$ = V;
				var ee = !0;
				try {
					e: {
						((E = !1), T && ((T = !1), L(O), (O = -1)), (w = !0));
						var re = y;
						try {
							t: {
								for (k(V), b = i(m); b !== null && !(b.expirationTime > V && ne());) {
									var U = b.callback;
									if (typeof U == "function") {
										((b.callback = null), (y = b.priorityLevel));
										var te = U(b.expirationTime <= V);
										if (((V = e.unstable_now()), typeof te == "function")) {
											((b.callback = te), k(V), (ee = !0));
											break t;
										}
										(b === i(m) && o(m), k(V));
									} else o(m);
									b = i(m);
								}
								if (b !== null) ee = !0;
								else {
									var Y = i(g);
									(Y !== null && G(N, Y.startTime - V), (ee = !1));
								}
							}
							break e;
						} finally {
							((b = null), (y = re), (w = !1));
						}
						ee = void 0;
					}
				} finally {
					ee ? R() : (I = !1);
				}
			}
		}
		var R;
		if (typeof A == "function")
			R = function () {
				A(D);
			};
		else if (typeof MessageChannel < "u") {
			var B = new MessageChannel(),
				F = B.port2;
			((B.port1.onmessage = D),
				(R = function () {
					F.postMessage(null);
				}));
		} else
			R = function () {
				M(D, 0);
			};
		function G(V, ee) {
			O = M(function () {
				V(e.unstable_now());
			}, ee);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (V) {
				V.callback = null;
			}),
			(e.unstable_forceFrameRate = function (V) {
				0 > V || 125 < V
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (q = 0 < V ? Math.floor(1e3 / V) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return y;
			}),
			(e.unstable_next = function (V) {
				switch (y) {
					case 1:
					case 2:
					case 3:
						var ee = 3;
						break;
					default:
						ee = y;
				}
				var re = y;
				y = ee;
				try {
					return V();
				} finally {
					y = re;
				}
			}),
			(e.unstable_requestPaint = function () {
				x = !0;
			}),
			(e.unstable_runWithPriority = function (V, ee) {
				switch (V) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						V = 3;
				}
				var re = y;
				y = V;
				try {
					return ee();
				} finally {
					y = re;
				}
			}),
			(e.unstable_scheduleCallback = function (V, ee, re) {
				var U = e.unstable_now();
				switch (
					(typeof re == "object" && re !== null
						? ((re = re.delay), (re = typeof re == "number" && 0 < re ? U + re : U))
						: (re = U),
					V)
				) {
					case 1:
						var te = -1;
						break;
					case 2:
						te = 250;
						break;
					case 5:
						te = 1073741823;
						break;
					case 4:
						te = 1e4;
						break;
					default:
						te = 5e3;
				}
				return (
					(te = re + te),
					(V = { id: p++, callback: ee, priorityLevel: V, startTime: re, expirationTime: te, sortIndex: -1 }),
					re > U
						? ((V.sortIndex = re),
							n(g, V),
							i(m) === null && V === i(g) && (T ? (L(O), (O = -1)) : (T = !0), G(N, re - U)))
						: ((V.sortIndex = te), n(m, V), E || w || ((E = !0), I || ((I = !0), R()))),
					V
				);
			}),
			(e.unstable_shouldYield = ne),
			(e.unstable_wrapCallback = function (V) {
				var ee = y;
				return function () {
					var re = y;
					y = ee;
					try {
						return V.apply(this, arguments);
					} finally {
						y = re;
					}
				};
			}));
	}),
	WA = sr((e, n) => {
		n.exports = JA();
	}),
	eR = sr((e) => {
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
		(i(), (n.exports = eR()));
	}),
	tR = sr((e) => {
		var n = WA(),
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
		function M(t) {
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
		var L = null,
			A = null;
		function k(t, r, a) {
			return t === a ? !0 : t === r ? ((L = t), !0) : !1;
		}
		function N(t, r, a) {
			return t === a ? ((A = t), !1) : t === r ? (A !== null && (L = t), !0) : !1;
		}
		function I(t) {
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
		var q = Object.assign,
			$ = Symbol.for("react.element"),
			ne = Symbol.for("react.transitional.element"),
			D = Symbol.for("react.portal"),
			R = Symbol.for("react.fragment"),
			B = Symbol.for("react.strict_mode"),
			F = Symbol.for("react.profiler"),
			G = Symbol.for("react.consumer"),
			V = Symbol.for("react.context"),
			ee = Symbol.for("react.forward_ref"),
			re = Symbol.for("react.suspense"),
			U = Symbol.for("react.suspense_list"),
			te = Symbol.for("react.memo"),
			Y = Symbol.for("react.lazy"),
			ue = Symbol.for("react.activity"),
			xe = Symbol.for("react.legacy_hidden"),
			me = Symbol.for("react.memo_cache_sentinel"),
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
				case R:
					return "Fragment";
				case F:
					return "Profiler";
				case B:
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
					case D:
						return "Portal";
					case V:
						return t.displayName || "Context";
					case G:
						return (t._context.displayName || "Context") + ".Consumer";
					case ee:
						var r = t.render;
						return (
							(t = t.displayName),
							t || ((t = r.displayName || r.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case te:
						return ((r = t.displayName || null), r !== null ? r : _e(t.type) || "Memo");
					case Y:
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
		function Et(t) {
			return { current: t };
		}
		function et(t) {
			0 > mt || ((t.current = ct[mt]), (ct[mt] = null), mt--);
		}
		function Ue(t, r) {
			(mt++, (ct[mt] = t.current), (t.current = r));
		}
		var Qe = Et(null),
			dn = Et(null),
			At = Et(null),
			Fn = Et(null);
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
		function _t() {
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
		var Qt, ge;
		function Te(t) {
			if (Qt === void 0)
				try {
					throw Error();
				} catch (a) {
					var r = a.stack.trim().match(/\n( *(at )?)/);
					((Qt = (r && r[1]) || ""),
						(ge =
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
				ge
			);
		}
		var pt = !1;
		function Ct(t, r) {
			if (!t || pt) return "";
			pt = !0;
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
									} catch (he) {
										var H = he;
									}
									Reflect.construct(t, [], oe);
								} else {
									try {
										oe.call();
									} catch (he) {
										H = he;
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
								} catch (he) {
									H = he;
								}
								(oe = t()) && typeof oe.catch == "function" && oe.catch(function () {});
							}
						} catch (he) {
							if (he && H && typeof he.stack == "string") return [he.stack, H.stack];
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
					var z = v.split(`
`),
						Q = C.split(`
`);
					for (c = s = 0; s < z.length && !z[s].includes("DetermineComponentFrameRoot");) s++;
					for (; c < Q.length && !Q[c].includes("DetermineComponentFrameRoot");) c++;
					if (s === z.length || c === Q.length)
						for (s = z.length - 1, c = Q.length - 1; 1 <= s && 0 <= c && z[s] !== Q[c];) c--;
					for (; 1 <= s && 0 <= c; s--, c--)
						if (z[s] !== Q[c]) {
							if (s !== 1 || c !== 1)
								do
									if ((s--, c--, 0 > c || z[s] !== Q[c])) {
										var J =
											`
` + z[s].replace(" at new ", " at ");
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
				((pt = !1), (Error.prepareStackTrace = a));
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
					return Ct(t.type, !1);
				case 11:
					return Ct(t.type.render, !1);
				case 1:
					return Ct(t.type, !0);
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
			hi = n.unstable_scheduleCallback,
			pr = n.unstable_cancelCallback,
			mi = n.unstable_shouldYield,
			br = n.unstable_requestPaint,
			tn = n.unstable_now,
			de = n.unstable_getCurrentPriorityLevel,
			Be = n.unstable_ImmediatePriority,
			Rt = n.unstable_UserBlockingPriority,
			ft = n.unstable_NormalPriority,
			pn = n.unstable_LowPriority,
			mn = n.unstable_IdlePriority,
			jn = n.log,
			le = n.unstable_setDisableYieldValue,
			Oe = null,
			ze = null;
		function ye(t) {
			if ((typeof jn == "function" && le(t), ze && typeof ze.setStrictMode == "function"))
				try {
					ze.setStrictMode(Oe, t);
				} catch {}
		}
		var Me = Math.clz32 ? Math.clz32 : gi,
			Yt = Math.log,
			Sr = Math.LN2;
		function gi(t) {
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
		function mC(t, r) {
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
		function gC(t, r, a, s, c, d) {
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
				z = t.expirationTimes,
				Q = t.hiddenUpdates;
			for (a = v & ~a; 0 < a;) {
				var J = 31 - Me(a),
					oe = 1 << J;
				((C[J] = 0), (z[J] = -1));
				var H = Q[J];
				if (H !== null)
					for (Q[J] = null, J = 0; J < H.length; J++) {
						var X = H[J];
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
			var t = ve.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : hb(t.type));
		}
		function cv(t, r) {
			var a = ve.p;
			try {
				return ((ve.p = t), r());
			} finally {
				ve.p = a;
			}
		}
		var Vr = Math.random().toString(36).slice(2),
			nn = "__reactFiber$" + Vr,
			Cn = "__reactProps$" + Vr,
			ss = "__reactContainer$" + Vr,
			fv = "__reactEvents$" + Vr,
			vC = "__reactListeners$" + Vr,
			yC = "__reactHandles$" + Vr,
			dv = "__reactResources$" + Vr,
			us = "__reactMarker$" + Vr,
			Zu = "__reactLoad$" + Vr;
		function Fu(t) {
			(delete t[nn], delete t[Cn], delete t[vC], delete t[yC]);
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
		var pC = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			vv = {},
			yv = {};
		function bC(t) {
			return ta.call(yv, t) ? !0 : ta.call(vv, t) ? !1 : pC.test(t) ? (yv[t] = !0) : ((vv[t] = !0), !1);
		}
		var Xe = !1;
		function pv() {
			var t = Xe;
			return ((Xe = !1), t);
		}
		function Qu(t, r, a) {
			if (bC(r))
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
		function Br(t, r, a, s) {
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
		function SC(t, r, a) {
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
				t._valueTracker = SC(t, r, "" + t[r]);
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
		var wC = /[\n"\\]/g;
		function Yn(t) {
			return t.replace(wC, function (r) {
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
		var EC = new Set(
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
					: typeof a != "number" || a === 0 || EC.has(r)
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
		var _C = new Map([
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
			CC =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Ku(t) {
			return CC.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function wr() {}
		var kf = null;
		function jf(t) {
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
		var Pr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Lf = !1;
		if (Pr)
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
		var vi = null,
			Uf = null,
			Gu = null;
		function Av() {
			if (Gu) return Gu;
			var t,
				r = Uf,
				a = r.length,
				s,
				c = "value" in vi ? vi.value : vi.textContent,
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
				q(r.prototype, {
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
		var yi = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Wu = bn(yi),
			ds = q({}, yi, { view: 0, detail: 0 }),
			TC = bn(ds),
			Vf,
			Bf,
			hs,
			el = q({}, ds, {
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
			xC = bn(q({}, el, { dataTransfer: 0 })),
			Pf = bn(q({}, ds, { relatedTarget: 0 })),
			OC = bn(q({}, yi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			AC = bn(
				q({}, yi, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Mv = bn(q({}, yi, { data: 0 })),
			RC = {
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
			NC = {
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
			MC = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function DC(t) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(t) : (t = MC[t]) ? !!r[t] : !1;
		}
		function $f() {
			return DC;
		}
		var zC = bn(
				q({}, ds, {
					key: function (t) {
						if (t.key) {
							var r = RC[t.key] || t.key;
							if (r !== "Unidentified") return r;
						}
						return t.type === "keypress"
							? ((t = Xu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? NC[t.keyCode] || "Unidentified"
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
				q({}, el, {
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
			IC = bn(q({}, yi, { submitter: 0 })),
			kC = bn(
				q({}, ds, {
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
			jC = bn(q({}, yi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			qC = bn(
				q({}, el, {
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
			LC = bn(q({}, yi, { newState: 0, oldState: 0, source: 0 })),
			UC = [9, 13, 27, 32],
			Hf = Pr && "CompositionEvent" in window,
			ms = null;
		Pr && "documentMode" in document && (ms = document.documentMode);
		var VC = Pr && "TextEvent" in window && !ms,
			zv = Pr && (!Hf || (ms && 8 < ms && 11 >= ms)),
			Iv = " ",
			kv = !1;
		function jv(t, r) {
			switch (t) {
				case "keyup":
					return UC.indexOf(r.keyCode) !== -1;
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
		function BC(t, r) {
			switch (t) {
				case "compositionend":
					return qv(r);
				case "keypress":
					return r.which !== 32 ? null : ((kv = !0), Iv);
				case "textInput":
					return ((t = r.data), t === Iv && kv ? null : t);
				default:
					return null;
			}
		}
		function PC(t, r) {
			if (eo)
				return t === "compositionend" || (!Hf && jv(t, r)) ? ((t = Av()), (Gu = Uf = vi = null), (eo = !1), t) : null;
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
		var $C = {
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
			return r === "input" ? !!$C[t.type] : r === "textarea";
		}
		function Uv(t, r, a, s) {
			(Ja ? (Wa ? Wa.push(s) : (Wa = [s])) : (Ja = s),
				(r = tc(r, "onChange")),
				0 < r.length && ((a = new Wu("onChange", "change", null, a, s)), t.push({ event: a, listeners: r })));
		}
		var gs = null,
			vs = null;
		function HC(t) {
			_p(t, 0);
		}
		function tl(t) {
			if (Sv(ls(t))) return t;
		}
		function Vv(t, r) {
			if (t === "change") return r;
		}
		var Bv = !1;
		if (Pr) {
			var Zf;
			if (Pr) {
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
				(Uv(r, vs, t, jf(t)), Ov(HC, r));
			}
		}
		function ZC(t, r, a) {
			t === "focusin" ? ($v(), (gs = r), (vs = a), gs.attachEvent("onpropertychange", Hv)) : t === "focusout" && $v();
		}
		function FC(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return tl(vs);
		}
		function QC(t, r) {
			if (t === "click") return tl(r);
		}
		function YC(t, r) {
			if (t === "input" || t === "change") return tl(r);
		}
		function KC(t, r) {
			return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
		}
		var Ln = typeof Object.is == "function" ? Object.is : KC;
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
		var GC = Pr && "documentMode" in document && 11 >= document.documentMode,
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
		Pr &&
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
			XC = oa("transitionrun"),
			JC = oa("transitionstart"),
			WC = oa("transitioncancel"),
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
		var eT = 0;
		function $r(t, r) {
			if (t.name != null && t.name !== "auto") return t.name;
			if (r.autoName !== null) return r.autoName;
			t = hr.identifierPrefix;
			var a = eT++;
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
		function Hr(t, r) {
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
		function tT(t, r, a, s) {
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
			return new tT(t, r, a, s);
		}
		function td(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function Zr(t, r) {
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
				v = Nx(t, a, Qe.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (s) {
					case ue:
						return ((t = Tn(31, a, r, c)), (t.elementType = ue), (t.lanes = d), t);
					case R:
						return ua(a.children, c, d, r);
					case B:
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
								case V:
									v = 10;
									break e;
								case G:
									v = 9;
									break e;
								case ee:
									v = 11;
									break e;
								case te:
									v = 14;
									break e;
								case Y:
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
			pi = null,
			Er = 1,
			_r = "";
		function Fr(t, r) {
			((ao[oo++] = bs), (ao[oo++] = sl), (sl = t), (bs = r));
		}
		function sy(t, r, a) {
			((Xn[Jn++] = Er), (Xn[Jn++] = _r), (Xn[Jn++] = pi), (pi = t));
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
			t.return !== null && (Fr(t, 1), sy(t, 1, 0));
		}
		function id(t) {
			for (; t === sl;) ((sl = ao[--oo]), (ao[oo] = null), (bs = ao[--oo]), (ao[oo] = null));
			for (; t === pi;)
				((pi = Xn[--Jn]), (Xn[Jn] = null), (_r = Xn[--Jn]), (Xn[Jn] = null), (Er = Xn[--Jn]), (Xn[Jn] = null));
		}
		function uy(t, r) {
			((Xn[Jn++] = Er), (Xn[Jn++] = _r), (Xn[Jn++] = pi), (Er = r.id), (_r = r.overflow), (pi = t));
		}
		var Gt = null,
			gt = null,
			Ve = !1,
			bi = null,
			Wn = !1,
			ad = Error(u(519));
		function Si(t) {
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
				r || Si(t, !0));
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
				a && gt && Si(t),
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
					? ((r = gt), Ii(t.type) ? ((t = $h), ($h = null), (gt = t)) : (gt = r))
					: (gt = Gt ? nr(t.stateNode.nextSibling) : null);
			return !0;
		}
		function la() {
			((gt = Gt = null), (Ve = !1));
		}
		function od() {
			var t = bi;
			return (t !== null && (An === null ? (An = t) : An.push.apply(An, t), (bi = null)), t);
		}
		function Ss(t) {
			bi === null ? (bi = [t]) : bi.push(t);
		}
		var sd = Et(null),
			ca = null,
			Qr = null;
		function wi(t, r, a) {
			(Ue(sd, r._currentValue), (r._currentValue = a));
		}
		function Yr(t) {
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
						for (var z = 0; z < r.length; z++)
							if (C.context === r[z]) {
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
			((ca = t), (Qr = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function rn(t) {
			return cy(ca, t);
		}
		function dl(t, r) {
			return (ca === null && da(t), cy(t, r));
		}
		function cy(t, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), Qr === null)) {
				if (t === null) throw Error(u(308));
				((Qr = r), (t.dependencies = { lanes: 0, firstContext: r }), (t.flags |= 524288));
			} else Qr = Qr.next = r;
			return a;
		}
		var nT =
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
			rT = n.unstable_scheduleCallback,
			iT = n.unstable_NormalPriority,
			Lt = { $$typeof: V, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function ld() {
			return { controller: new nT(), data: new Map(), refCount: 0 };
		}
		function ws(t) {
			(t.refCount--,
				t.refCount === 0 &&
					rT(iT, function () {
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
		function aT(t) {
			var r = t.transitionTypes;
			return ((t.transitionTypes = null), r);
		}
		var _s = null,
			cd = 0,
			ha = 0,
			uo = null;
		function oT(t, r) {
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
		function sT(t, r) {
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
			if (((np = tn()), typeof r == "object" && r !== null && typeof r.then == "function" && oT(t, r), Es !== null))
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
		var ma = Et(null);
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
		function Ei(t, r) {
			((r = r.props.ref), (t.ref = r !== void 0 ? r : null));
		}
		function yl(t, r) {
			throw r.$$typeof === $
				? Error(u(525))
				: ((t = Object.prototype.toString.call(r)),
					Error(u(31, t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t)));
		}
		function by(t) {
			function r(Z, P) {
				if (t) {
					var K = Z.deletions;
					K === null ? ((Z.deletions = [P]), (Z.flags |= 16)) : K.push(P);
				}
			}
			function a(Z, P) {
				if (!t) return null;
				for (; P !== null;) (r(Z, P), (P = P.sibling));
				return null;
			}
			function s(Z) {
				for (var P = new Map(); Z !== null;) (Z.key === null ? P.set(Z.index, Z) : P.set(Z.key, Z), (Z = Z.sibling));
				return P;
			}
			function c(Z, P) {
				return ((Z = Zr(Z, P)), (Z.index = 0), (Z.sibling = null), Z);
			}
			function d(Z, P, K) {
				return (
					(Z.index = K),
					t
						? ((K = Z.alternate),
							K !== null ? ((K = K.index), K < P ? ((Z.flags |= 2), P) : K) : ((Z.flags |= 134217730), P))
						: ((Z.flags |= 1048576), P)
				);
			}
			function v(Z) {
				return (t && Z.alternate === null && (Z.flags |= 134217730), Z);
			}
			function C(Z, P, K, ie) {
				return P === null || P.tag !== 6
					? ((P = nd(K, Z.mode, ie)), (P.return = Z), P)
					: ((P = c(P, K)), (P.return = Z), P);
			}
			function z(Z, P, K, ie) {
				var Se = K.type;
				return Se === R
					? ((Z = J(Z, P, K.props.children, ie, K.key)), Ei(Z, K), Z)
					: P !== null &&
						  (P.elementType === Se || (typeof Se == "object" && Se !== null && Se.$$typeof === Y && ga(Se) === P.type))
						? ((P = c(P, K.props)), Ei(P, K), (P.return = Z), P)
						: ((P = ol(K.type, K.key, K.props, null, Z.mode, ie)), Ei(P, K), (P.return = Z), P);
			}
			function Q(Z, P, K, ie) {
				return P === null ||
					P.tag !== 4 ||
					P.stateNode.containerInfo !== K.containerInfo ||
					P.stateNode.implementation !== K.implementation
					? ((P = rd(K, Z.mode, ie)), (P.return = Z), P)
					: ((P = c(P, K.children || [])), (P.return = Z), P);
			}
			function J(Z, P, K, ie, Se) {
				return P === null || P.tag !== 7
					? ((P = ua(K, Z.mode, ie, Se)), (P.return = Z), P)
					: ((P = c(P, K)), (P.return = Z), P);
			}
			function oe(Z, P, K) {
				if ((typeof P == "string" && P !== "") || typeof P == "number" || typeof P == "bigint")
					return ((P = nd("" + P, Z.mode, K)), (P.return = Z), P);
				if (typeof P == "object" && P !== null) {
					switch (P.$$typeof) {
						case ne:
							return ((K = ol(P.type, P.key, P.props, null, Z.mode, K)), Ei(K, P), (K.return = Z), K);
						case D:
							return ((P = rd(P, Z.mode, K)), (P.return = Z), P);
						case Y:
							return ((P = ga(P)), oe(Z, P, K));
					}
					if (Ce(P) || fe(P)) return ((P = ua(P, Z.mode, K, null)), (P.return = Z), P);
					if (typeof P.then == "function") return oe(Z, vl(P), K);
					if (P.$$typeof === V) return oe(Z, dl(Z, P), K);
					yl(Z, P);
				}
				return null;
			}
			function H(Z, P, K, ie) {
				var Se = P !== null ? P.key : null;
				if ((typeof K == "string" && K !== "") || typeof K == "number" || typeof K == "bigint")
					return Se !== null ? null : C(Z, P, "" + K, ie);
				if (typeof K == "object" && K !== null) {
					switch (K.$$typeof) {
						case ne:
							return K.key === Se ? z(Z, P, K, ie) : null;
						case D:
							return K.key === Se ? Q(Z, P, K, ie) : null;
						case Y:
							return ((K = ga(K)), H(Z, P, K, ie));
					}
					if (Ce(K) || fe(K)) return Se !== null ? null : J(Z, P, K, ie, null);
					if (typeof K.then == "function") return H(Z, P, vl(K), ie);
					if (K.$$typeof === V) return H(Z, P, dl(Z, K), ie);
					yl(Z, K);
				}
				return null;
			}
			function X(Z, P, K, ie, Se) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(K) || null), C(P, Z, "" + ie, Se));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case ne:
							return ((Z = Z.get(ie.key === null ? K : ie.key) || null), z(P, Z, ie, Se));
						case D:
							return ((Z = Z.get(ie.key === null ? K : ie.key) || null), Q(P, Z, ie, Se));
						case Y:
							return ((ie = ga(ie)), X(Z, P, K, ie, Se));
					}
					if (Ce(ie) || fe(ie)) return ((Z = Z.get(K) || null), J(P, Z, ie, Se, null));
					if (typeof ie.then == "function") return X(Z, P, K, vl(ie), Se);
					if (ie.$$typeof === V) return X(Z, P, K, dl(P, ie), Se);
					yl(P, ie);
				}
				return null;
			}
			function he(Z, P, K, ie) {
				for (var Se = null, Ze = null, Re = P, Ie = (P = 0), Bt = null; Re !== null && Ie < K.length; Ie++) {
					Re.index > Ie ? ((Bt = Re), (Re = null)) : (Bt = Re.sibling);
					var Ye = H(Z, Re, K[Ie], ie);
					if (Ye === null) {
						Re === null && (Re = Bt);
						break;
					}
					(t && Re && Ye.alternate === null && r(Z, Re),
						(P = d(Ye, P, Ie)),
						Ze === null ? (Se = Ye) : (Ze.sibling = Ye),
						(Ze = Ye),
						(Re = Bt));
				}
				if (Ie === K.length) return (a(Z, Re), Ve && Fr(Z, Ie), Se);
				if (Re === null) {
					for (; Ie < K.length; Ie++)
						((Re = oe(Z, K[Ie], ie)),
							Re !== null && ((P = d(Re, P, Ie)), Ze === null ? (Se = Re) : (Ze.sibling = Re), (Ze = Re)));
					return (Ve && Fr(Z, Ie), Se);
				}
				for (Re = s(Re); Ie < K.length; Ie++)
					((Bt = X(Re, Z, Ie, K[Ie], ie)),
						Bt !== null &&
							(t && ((Ye = Bt.alternate), Ye !== null && Re.delete(Ye.key === null ? Ie : Ye.key)),
							(P = d(Bt, P, Ie)),
							Ze === null ? (Se = Bt) : (Ze.sibling = Bt),
							(Ze = Bt)));
				return (
					t &&
						Re.forEach(function (Ui) {
							return r(Z, Ui);
						}),
					Ve && Fr(Z, Ie),
					Se
				);
			}
			function we(Z, P, K, ie) {
				if (K == null) throw Error(u(151));
				for (
					var Se = null, Ze = null, Re = P, Ie = (P = 0), Bt = null, Ye = K.next();
					Re !== null && !Ye.done;
					Ie++, Ye = K.next()
				) {
					Re.index > Ie ? ((Bt = Re), (Re = null)) : (Bt = Re.sibling);
					var Ui = H(Z, Re, Ye.value, ie);
					if (Ui === null) {
						Re === null && (Re = Bt);
						break;
					}
					(t && Re && Ui.alternate === null && r(Z, Re),
						(P = d(Ui, P, Ie)),
						Ze === null ? (Se = Ui) : (Ze.sibling = Ui),
						(Ze = Ui),
						(Re = Bt));
				}
				if (Ye.done) return (a(Z, Re), Ve && Fr(Z, Ie), Se);
				if (Re === null) {
					for (; !Ye.done; Ie++, Ye = K.next())
						((Ye = oe(Z, Ye.value, ie)),
							Ye !== null && ((P = d(Ye, P, Ie)), Ze === null ? (Se = Ye) : (Ze.sibling = Ye), (Ze = Ye)));
					return (Ve && Fr(Z, Ie), Se);
				}
				for (Re = s(Re); !Ye.done; Ie++, Ye = K.next())
					((Ye = X(Re, Z, Ie, Ye.value, ie)),
						Ye !== null &&
							(t && ((Bt = Ye.alternate), Bt !== null && Re.delete(Bt.key === null ? Ie : Bt.key)),
							(P = d(Ye, P, Ie)),
							Ze === null ? (Se = Ye) : (Ze.sibling = Ye),
							(Ze = Ye)));
				return (
					t &&
						Re.forEach(function (Zx) {
							return r(Z, Zx);
						}),
					Ve && Fr(Z, Ie),
					Se
				);
			}
			function Le(Z, P, K, ie) {
				if (
					(typeof K == "object" &&
						K !== null &&
						K.type === R &&
						K.key === null &&
						K.props.ref === void 0 &&
						(K = K.props.children),
					typeof K == "object" && K !== null)
				) {
					switch (K.$$typeof) {
						case ne:
							e: {
								for (var Se = K.key; P !== null;) {
									if (P.key === Se) {
										if (((Se = K.type), Se === R)) {
											if (P.tag === 7) {
												(a(Z, P.sibling), (ie = c(P, K.props.children)), Ei(ie, K), (ie.return = Z), (Z = ie));
												break e;
											}
										} else if (
											P.elementType === Se ||
											(typeof Se == "object" && Se !== null && Se.$$typeof === Y && ga(Se) === P.type)
										) {
											(a(Z, P.sibling), (ie = c(P, K.props)), Ei(ie, K), (ie.return = Z), (Z = ie));
											break e;
										}
										a(Z, P);
										break;
									} else r(Z, P);
									P = P.sibling;
								}
								K.type === R
									? ((ie = ua(K.props.children, Z.mode, ie, K.key)), Ei(ie, K), (ie.return = Z), (Z = ie))
									: ((ie = ol(K.type, K.key, K.props, null, Z.mode, ie)), Ei(ie, K), (ie.return = Z), (Z = ie));
							}
							return v(Z);
						case D:
							e: {
								for (Se = K.key; P !== null;) {
									if (P.key === Se)
										if (
											P.tag === 4 &&
											P.stateNode.containerInfo === K.containerInfo &&
											P.stateNode.implementation === K.implementation
										) {
											(a(Z, P.sibling), (ie = c(P, K.children || [])), (ie.return = Z), (Z = ie));
											break e;
										} else {
											a(Z, P);
											break;
										}
									else r(Z, P);
									P = P.sibling;
								}
								((ie = rd(K, Z.mode, ie)), (ie.return = Z), (Z = ie));
							}
							return v(Z);
						case Y:
							return ((K = ga(K)), Le(Z, P, K, ie));
					}
					if (Ce(K)) return he(Z, P, K, ie);
					if (fe(K)) {
						if (((Se = fe(K)), typeof Se != "function")) throw Error(u(150));
						return ((K = Se.call(K)), we(Z, P, K, ie));
					}
					if (typeof K.then == "function") return Le(Z, P, vl(K), ie);
					if (K.$$typeof === V) return Le(Z, P, dl(Z, K), ie);
					yl(Z, K);
				}
				return (typeof K == "string" && K !== "") || typeof K == "number" || typeof K == "bigint"
					? ((K = "" + K),
						P !== null && P.tag === 6
							? (a(Z, P.sibling), (ie = c(P, K)), (ie.return = Z), (Z = ie))
							: (a(Z, P), (ie = nd(K, Z.mode, ie)), (ie.return = Z), (Z = ie)),
						v(Z))
					: a(Z, P);
			}
			return function (Z, P, K, ie) {
				try {
					Cs = 0;
					var Se = Le(Z, P, K, ie);
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
			_i = !1;
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
			_i = !1;
			var d = c.firstBaseUpdate,
				v = c.lastBaseUpdate,
				C = c.shared.pending;
			if (C !== null) {
				c.shared.pending = null;
				var z = C,
					Q = z.next;
				((z.next = null), v === null ? (d = Q) : (v.next = Q), (v = z));
				var J = t.alternate;
				J !== null &&
					((J = J.updateQueue),
					(C = J.lastBaseUpdate),
					C !== v && (C === null ? (J.firstBaseUpdate = Q) : (C.next = Q), (J.lastBaseUpdate = z)));
			}
			if (d !== null) {
				var oe = c.baseState;
				((v = 0), (J = Q = z = null), (C = d));
				do {
					var H = C.lane & -536870913,
						X = H !== C.lane;
					if (X ? (He & H) === H : (s & H) === H) {
						(H !== 0 && H === ha && (vd = !0),
							J !== null && (J = J.next = { lane: 0, tag: C.tag, payload: C.payload, callback: null, next: null }));
						e: {
							var he = t,
								we = C;
							H = r;
							var Le = a;
							switch (we.tag) {
								case 1:
									if (((he = we.payload), typeof he == "function")) {
										oe = he.call(Le, oe, H);
										break e;
									}
									oe = he;
									break e;
								case 3:
									he.flags = (he.flags & -65537) | 128;
								case 0:
									if (((he = we.payload), (H = typeof he == "function" ? he.call(Le, oe, H) : he), H == null)) break e;
									oe = q({}, oe, H);
									break e;
								case 2:
									_i = !0;
							}
						}
						((H = C.callback),
							H !== null &&
								((t.flags |= 64),
								X && (t.flags |= 8192),
								(X = c.callbacks),
								X === null ? (c.callbacks = [H]) : X.push(H)));
					} else
						((X = { lane: H, tag: C.tag, payload: C.payload, callback: C.callback, next: null }),
							J === null ? ((Q = J = X), (z = oe)) : (J = J.next = X),
							(v |= H));
					if (((C = C.next), C === null)) {
						if (((C = c.shared.pending), C === null)) break;
						((X = C), (C = X.next), (X.next = null), (c.lastBaseUpdate = X), (c.shared.pending = null));
					}
				} while (!0);
				(J === null && (z = oe),
					(c.baseState = z),
					(c.firstBaseUpdate = Q),
					(c.lastBaseUpdate = J),
					d === null && (c.shared.lanes = 0),
					(Ni |= v),
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
		var Ci = Et(null),
			pl = Et(0);
		function _y(t, r) {
			((t = Wr), Ue(pl, t), Ue(Ci, r), (Wr = t | r.baseLanes));
		}
		function yd() {
			(Ue(pl, Wr), Ue(Ci, Ci.current));
		}
		function pd() {
			((Wr = pl.current), et(Ci), et(pl));
		}
		var an = Et(null),
			vn = null;
		function Ti(t) {
			var r = t.alternate;
			(Ue(on, on.current & 1),
				Ue(an, t),
				vn === null && (r === null || Ci.current !== null || r.memoizedState !== null) && (vn = t));
		}
		function bd(t) {
			(Ue(on, on.current), Ue(an, t), vn === null && (vn = t));
		}
		function Cy(t) {
			t.tag === 22 ? (Ue(on, on.current), Ue(an, t), vn === null && (vn = t)) : xi();
		}
		function xi() {
			(Ue(on, on.current), Ue(an, an.current));
		}
		function Un(t) {
			(et(an), vn === t && (vn = null), et(on));
		}
		var on = Et(0);
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
		var Kr = 0,
			qe = null,
			lt = null,
			Ut = null,
			Sl = !1,
			fo = !1,
			Sa = !1,
			wl = 0,
			Rs = 0,
			ho = null,
			uT = 0;
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
				(Kr = d),
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
			if (((Kr = 0), (Ut = lt = qe = null), (Sl = !1), (Rs = 0), (ho = null), r)) throw Error(u(300));
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
				((ce.H = vT), (d = r(a, s)));
			} while (fo);
			return d;
		}
		function lT() {
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
			((Kr = 0), (Ut = lt = qe = null), (fo = !1), (Rs = wl = 0), (ho = null));
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
				if (t.$$typeof === V) return rn(t);
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
				for (a = r.data[r.index] = Array(t), s = 0; s < t; s++) a[s] = me;
			return (r.index++, a);
		}
		function Gr(t, r) {
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
					z = null,
					Q = r,
					J = !1;
				do {
					var oe = Q.lane & -536870913;
					if (oe !== Q.lane ? (He & oe) === oe : (Kr & oe) === oe) {
						var H = Q.revertLane;
						if (H === 0)
							(z !== null &&
								(z = z.next =
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
						else if ((Kr & H) === H) {
							((Q = Q.next), H === ha && (J = !0));
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
								z === null ? ((C = z = oe), (v = d)) : (z = z.next = oe),
								(qe.lanes |= H),
								(Ni |= H));
						((oe = Q.action), Sa && a(d, oe), (d = Q.hasEagerState ? Q.eagerState : a(d, oe)));
					} else
						((H = {
							lane: oe,
							revertLane: Q.revertLane,
							gesture: Q.gesture,
							action: Q.action,
							hasEagerState: Q.hasEagerState,
							eagerState: Q.eagerState,
							next: null,
						}),
							z === null ? ((C = z = H), (v = d)) : (z = z.next = H),
							(qe.lanes |= oe),
							(Ni |= oe));
					Q = Q.next;
				} while (Q !== null && Q !== r);
				if ((z === null ? (v = d) : (z.next = C), !Ln(d, t.memoizedState) && ((Vt = !0), J && ((a = uo), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = v), (t.baseQueue = z), (s.lastRenderedState = d));
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
				d || (Kr & 127) !== 0 || Ay(s, r, a);
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
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Gr, lastRenderedState: t }),
				r
			);
		}
		function zy(t, r, a, s) {
			return ((t.baseState = a), Od(t, lt, typeof s == "function" ? s : Gr));
		}
		function cT(t, r, a, s, c) {
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
						z = ce.S;
					(z !== null && z(v, C), ky(t, r, C));
				} catch (Q) {
					Nd(t, r, Q);
				} finally {
					(d !== null && v.types !== null && (d.types = v.types), (ce.T = d));
				}
			} else
				try {
					((d = a(c, s)), ky(t, r, d));
				} catch (Q) {
					Nd(t, r, Q);
				}
		}
		function ky(t, r, a) {
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
							Si(s);
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
				(d = jd.bind(null, qe, !1, s.queue)),
				(s = Sn()),
				(c = { state: r, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(a = cT.bind(null, qe, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = t),
				[r, a, !1]
			);
		}
		function Vy(t) {
			return By(zt(), lt, t);
		}
		function By(t, r, a) {
			if (((r = Od(t, r, Ly)[0]), (t = Cl(Gr)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
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
				a !== r.memoizedState && ((qe.flags |= 2048), mo(9, { destroy: void 0 }, fT.bind(null, c, a), null)),
				[s, d, t]
			);
		}
		function fT(t, r) {
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
		function dT(t) {
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
				dT({ ref: r, nextImpl: t }),
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
			return a === void 0 || ((Kr & 1073741824) !== 0 && (He & 261930) === 0)
				? (t.memoizedState = r)
				: ((t.memoizedState = a), (t = ip()), (qe.lanes |= t), (Ni |= t), a);
		}
		function Jy(t, r, a, s) {
			return Ln(a, r)
				? a
				: Ci.current !== null
					? ((t = zd(t, a, s)), Ln(t, r) || (Vt = !0), t)
					: (Kr & 106) === 0 || ((Kr & 1073741824) !== 0 && (He & 261930) === 0)
						? ((Vt = !0), (t.memoizedState = a))
						: ((t = ip()), (qe.lanes |= t), (Ni |= t), r);
		}
		function Wy(t, r, a, s, c) {
			var d = ve.p;
			ve.p = d !== 0 && 8 > d ? d : 8;
			var v = ce.T,
				C = {};
			((C.types = v !== null ? v.types : null), (ce.T = C), jd(t, !1, r, a));
			try {
				var z = c(),
					Q = ce.S;
				(Q !== null && Q(C, z),
					z !== null && typeof z == "object" && typeof z.then == "function"
						? Ms(t, r, sT(z, s), tr(t))
						: Ms(t, r, s, tr(t)));
			} catch (J) {
				Ms(t, r, { then: function () {}, status: "rejected", reason: J }, tr());
			} finally {
				((ve.p = d), v !== null && C.types !== null && (v.types = C.types), (ce.T = v));
			}
		}
		function hT() {}
		function Id(t, r, a, s) {
			if (t.tag !== 5) throw Error(u(476));
			var c = e0(t).queue;
			Wy(
				t,
				c,
				r,
				Ge,
				a === null
					? hT
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
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Gr, lastRenderedState: Ge },
				next: null,
			};
			var a = {};
			return (
				(r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Gr, lastRenderedState: a },
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
		function kd() {
			return rn(zo);
		}
		function n0() {
			return zt().memoizedState;
		}
		function r0() {
			return zt().memoizedState;
		}
		function mT(t) {
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
		function gT(t, r, a) {
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
		function jd(t, r, a, s) {
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
						if (Sa) {
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
						(t = t.dispatch = gT.bind(null, qe, t)),
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
					} else ((a = uT++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = r);
				},
				useHostTransitionStatus: kd,
				useFormState: Uy,
				useActionState: Uy,
				useOptimistic: function (t) {
					var r = Sn();
					r.memoizedState = r.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = jd.bind(null, qe, !0, a)), (a.dispatch = r), [t, r]);
				},
				useMemoCache: xd,
				useCacheRefresh: function () {
					return (Sn().memoizedState = mT.bind(null, qe));
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
					return Cl(Gr);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					return Jy(zt(), lt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = Cl(Gr)[0],
						r = zt().memoizedState;
					return [typeof t == "boolean" ? t : Ns(t), r];
				},
				useSyncExternalStore: Oy,
				useId: n0,
				useHostTransitionStatus: kd,
				useFormState: Vy,
				useActionState: Vy,
				useOptimistic: function (t, r) {
					return zy(zt(), lt, t, r);
				},
				useMemoCache: xd,
				useCacheRefresh: r0,
				useEffectEvent: Zy,
			},
			vT = {
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
					return Ad(Gr);
				},
				useDebugValue: Dd,
				useDeferredValue: function (t, r) {
					var a = zt();
					return lt === null ? zd(a, t, r) : Jy(a, lt.memoizedState, t, r);
				},
				useTransition: function () {
					var t = Ad(Gr)[0],
						r = zt().memoizedState;
					return [typeof t == "boolean" ? t : Ns(t), r];
				},
				useSyncExternalStore: Oy,
				useId: n0,
				useHostTransitionStatus: kd,
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
				(a = a == null ? r : q({}, r, a)),
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
				a === r && (a = q({}, a));
				for (var c in t) a[c] === void 0 && (a[c] = t[c]);
			}
			return a;
		}
		function yT(t) {
			nl(t);
		}
		function pT(t) {
			console.error(t);
		}
		function bT(t) {
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
					(f0(r, a, s), typeof c != "function" && (Mi === null ? (Mi = new Set([this])) : Mi.add(this)));
					var C = s.stack;
					this.componentDidCatch(s.value, { componentStack: C !== null ? C : "" });
				});
		}
		function ST(t, r, a, s, c) {
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
									(d !== null && typeof d.componentDidCatch == "function" && (Mi === null || !Mi.has(d)))))
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
				t !== null && !Vt ? (Cd(t, r, c), Xr(t, r, c)) : (Ve && C && ul(r), (r.flags |= 1), Ft(t, r, s, c), r.child)
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
				if (((a = a.compare), (a = a !== null ? a : ys), a(v, s) && t.ref === r.ref)) return Xr(t, r, c);
			}
			return ((r.flags |= 1), (t = Zr(d, s)), (t.ref = r.ref), (t.return = r), (r.child = t));
		}
		function v0(t, r, a, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (ys(d, s) && t.ref === r.ref)
					if (((Vt = !1), (r.pendingProps = s = d), Yd(t, c))) (t.flags & 131072) !== 0 && (Vt = !0);
					else return ((r.lanes = t.lanes), Xr(t, r, c));
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
					? (hl(r, d.cachePool), _y(r, d), xi(), (r.memoizedState = null))
					: (t !== null && hl(r, null), yd(), xi());
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
		function wT(t, r, a) {
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
										treeContext: pi !== null ? { id: Er, overflow: _r } : null,
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
						throw Si(r);
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
					if (Ci.current === null) {
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
						(bi = null),
						(Wn = !1),
						t !== null && uy(r, t),
						(r = Nl(r, s)),
						(r.flags |= 134221824));
				return r;
			}
			return (
				(t = Zr(t.child, { mode: s.mode, children: s.children })),
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
				t !== null && !Vt ? (Cd(t, r, c), Xr(t, r, c)) : (Ve && s && ul(r), (r.flags |= 1), Ft(t, r, a, c), r.child)
			);
		}
		function S0(t, r, a, s, c, d) {
			return (
				da(r),
				(r.updateQueue = null),
				(a = xy(r, s, a, c)),
				Ty(t),
				(s = _d()),
				t !== null && !Vt ? (Cd(t, r, d), Xr(t, r, d)) : (Ve && s && ul(r), (r.flags |= 1), Ft(t, r, a, d), r.child)
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
					z = wa(a, C);
				d.props = z;
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
					(_i = !1));
				var H = r.memoizedState;
				((d.state = H),
					Os(r, s, d, c),
					xs(),
					(Q = r.memoizedState),
					C || H !== Q || _i
						? (typeof oe == "function" && (qd(r, a, oe, s), (Q = r.memoizedState)),
							(z = _i || l0(r, a, z, s, H, Q, v))
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
							(s = z))
						: (typeof d.componentDidMount == "function" && (r.flags |= 4194308), (s = !1)));
			} else {
				((d = r.stateNode),
					md(t, r),
					(v = r.memoizedProps),
					(J = wa(a, v)),
					(d.props = J),
					(oe = r.pendingProps),
					(H = d.context),
					(Q = a.contextType),
					(z = io),
					typeof Q == "object" && Q !== null && (z = rn(Q)),
					(C = a.getDerivedStateFromProps),
					(Q = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((v !== oe || H !== z) && c0(r, d, s, z)),
					(_i = !1),
					(H = r.memoizedState),
					(d.state = H),
					Os(r, s, d, c),
					xs());
				var X = r.memoizedState;
				v !== oe || H !== X || _i || (t !== null && t.dependencies !== null && fl(t.dependencies))
					? (typeof C == "function" && (qd(r, a, C, s), (X = r.memoizedState)),
						(J = _i || l0(r, a, J, s, H, X, z) || (t !== null && t.dependencies !== null && fl(t.dependencies)))
							? (Q ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, X, z),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, X, z)),
								typeof d.componentDidUpdate == "function" && (r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(v === t.memoizedProps && H === t.memoizedState) ||
									(r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(v === t.memoizedProps && H === t.memoizedState) ||
									(r.flags |= 1024),
								(r.memoizedProps = s),
								(r.memoizedState = X)),
						(d.props = s),
						(d.state = X),
						(d.context = z),
						(s = J))
					: (typeof d.componentDidUpdate != "function" ||
							(v === t.memoizedProps && H === t.memoizedState) ||
							(r.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(v === t.memoizedProps && H === t.memoizedState) ||
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
					: (t = Xr(t, r, c)),
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
						(c ? Ti(r) : xi(),
						(t = gt)
							? ((t = Qp(t, Wn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((r.memoizedState = {
										dehydrated: t,
										treeContext: pi !== null ? { id: Er, overflow: _r } : null,
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
						throw Si(r);
					return (Ph(t) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				return (
					(d = s.children),
					(s = s.fallback),
					c
						? (xi(),
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
						: (Ti(r), Zd(r, d))
				);
			}
			var C = t.memoizedState;
			if (C !== null) {
				var z = C.dehydrated;
				if (z !== null) return ET(t, r, d, v, s, z, C, a);
			}
			return c
				? (xi(),
					(c = s.fallback),
					(d = r.mode),
					(C = t.child),
					(z = C.sibling),
					(s = Zr(C, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = C.subtreeFlags & 1206910976),
					z !== null ? (c = Zr(z, c)) : ((c = ua(c, d, a, null)), (c.flags |= 2)),
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
				: (Ti(r),
					(a = t.child),
					(t = a.sibling),
					(a = Zr(a, { mode: "visible", children: s.children })),
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
		function ET(t, r, a, s, c, d, v, C) {
			if (a)
				return r.flags & 256
					? (Ti(r), (r.flags &= -257), Dl(t, r, C))
					: r.memoizedState !== null
						? (xi(), (r.child = t.child), (r.flags |= 128), null)
						: (xi(),
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
			if ((Ti(r), Ph(d))) {
				if (((s = d.nextSibling && d.nextSibling.dataset), s)) var z = s.dgst;
				return (
					(s = z),
					s !== "" &&
						((c = Error(u(419))), (c.stack = ""), (c.digest = s), Ss({ value: c, source: null, stack: null })),
					Dl(t, r, C)
				);
			}
			if ((Vt || fa(t, r, C, !1), (s = (C & t.childLanes) !== 0), Vt || s)) {
				if (Ci.current !== null) return Dl(t, r, C);
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
					(bi = null),
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
			return (wi(r, r.type, s.value), Ft(t, r, s.children, a), r.child);
		}
		function Xr(t, r, a) {
			if ((t !== null && (r.dependencies = t.dependencies), (Ni |= r.lanes), (a & r.childLanes) === 0))
				if (t !== null) {
					if ((fa(t, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && r.child !== t.child) throw Error(u(153));
			if (r.child !== null) {
				for (t = r.child, a = Zr(t, t.pendingProps), r.child = a, a.return = r; t.sibling !== null;)
					((t = t.sibling), (a = a.sibling = Zr(t, t.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function Yd(t, r) {
			return (t.lanes & r) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && fl(t)));
		}
		function _T(t, r, a) {
			switch (r.tag) {
				case 3:
					(Qn(r, r.stateNode.containerInfo), wi(r, Lt, t.memoizedState.cache), la());
					break;
				case 27:
				case 5:
					qt(r);
					break;
				case 4:
					Qn(r, r.stateNode.containerInfo);
					break;
				case 10:
					wi(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), bd(r), null);
					break;
				case 13:
					var s = r.memoizedState;
					if (s !== null) {
						if (s.dehydrated !== null) return (Ti(r), (r.flags |= 128), null);
						s = fa(t, r, a, !1);
						var c = r.child.childLanes;
						return s || (a & c) !== 0 ? _0(t, r, a) : (Ti(r), (t = Xr(t, r, a)), t !== null ? t.sibling : null);
					}
					Ti(r);
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
					wi(r, Lt, t.memoizedState.cache);
			}
			return Xr(t, r, a);
		}
		function O0(t, r, a) {
			if (t !== null)
				if (t.memoizedProps !== r.pendingProps) Vt = !0;
				else {
					if (!Yd(t, a) && (r.flags & 128) === 0) return ((Vt = !1), _T(t, r, a));
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
								if (c === ee) {
									((r.tag = 11), (r = m0(null, r, t, s, a)));
									break e;
								} else if (c === te) {
									((r.tag = 14), (r = g0(null, r, t, s, a)));
									break e;
								} else if (c === V) {
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
							((s = v.cache), wi(r, Lt, s), s !== d.cache && ud(r, [Lt], a, !0), xs(), (s = v.element), d.isDehydrated)
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
								for (gt = nr(t.firstChild), Gt = r, Ve = !0, bi = null, Wn = !0, a = Sy(r, null, s, a), r.child = a; a;)
									((a.flags = (a.flags & -3) | 134221824), (a = a.sibling));
							}
						else {
							if ((la(), s === c)) {
								r = Xr(t, r, a);
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
							Ii(r.type) ? (($h = c), (gt = nr(s.firstChild))) : (gt = c)),
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
								((s = gx(s, r.type, r.pendingProps, Wn)),
								s !== null ? ((r.stateNode = s), (Gt = r), (gt = nr(s.firstChild)), (Wn = !1), (c = !0)) : (c = !1)),
							c || Si(r)),
						qt(r),
						(c = r.type),
						(d = r.pendingProps),
						(v = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Ih(c, d) ? (s = null) : v !== null && Ih(c, v) && (r.flags |= 32),
						r.memoizedState !== null && ((c = Ed(t, r, lT, null, null, a)), (zo._currentValue = c)),
						go(t, r),
						Ft(t, r, s, a),
						r.child
					);
				case 6:
					return (
						t === null &&
							Ve &&
							((t = a = gt) &&
								((a = vx(a, r.pendingProps, Wn)),
								a !== null ? ((r.stateNode = a), (Gt = r), (gt = null), (t = !0)) : (t = !1)),
							t || Si(r)),
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
					return wT(t, r, a);
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
								wi(r, Lt, c))
							: ((t.lanes & a) !== 0 && (md(t, r), Os(r, null, null, a), xs()),
								(c = t.memoizedState),
								(d = r.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										wi(r, Lt, s))
									: ((s = d.cache), wi(r, Lt, s), s !== c.cache && ud(r, [Lt], a, !0))),
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
		function Jr(t) {
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
		function CT(t, r, a) {
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
						Yr(Lt),
						_t(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(so(r)
								? Jr(r)
								: t === null || (t.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), od())),
						vt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						t === null
							? (Jr(r), d !== null ? (vt(r), A0(r, d)) : (vt(r), Kd(r, c, null, s, a)))
							: d
								? d !== t.memoizedState
									? (Jr(r), vt(r), A0(r, d))
									: (vt(r), (r.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && Jr(r), vt(r), Kd(r, c, t, s, a)),
						null
					);
				case 27:
					if ((hn(r), (a = At.current), (c = r.type), t !== null && r.stateNode != null))
						t.memoizedProps !== s && Jr(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(u(166));
							return (vt(r), (r.subtreeFlags &= -33554433), null);
						}
						((t = Qe.current), so(r) ? ly(r, t) : ((t = Gp(c, s, a)), (r.stateNode = t), Jr(r)));
					}
					return (vt(r), (r.subtreeFlags &= -33554433), null);
				case 5:
					if ((hn(r), (c = r.type), t !== null && r.stateNode != null)) t.memoizedProps !== s && Jr(r);
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
							s && Jr(r);
						}
					}
					return (
						vt(r),
						(r.subtreeFlags &= -33554433),
						Kd(r, r.type, t === null ? null : t.memoizedProps, r.pendingProps, a),
						null
					);
				case 6:
					if (t && r.stateNode != null) t.memoizedProps !== s && Jr(r);
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
								t || Si(r, !0));
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
					return (_t(), t === null && Cp(r.stateNode.containerInfo), (r.flags |= 67108864), vt(r), null);
				case 10:
					return (Yr(r.type), vt(r), null);
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
										return (As(r, (on.current & 1) | 2), Ve && Fr(r, s.treeForkCount), r.child);
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
							Ve && Fr(r, s.treeForkCount),
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
						Yr(Lt),
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
		function TT(t, r) {
			switch ((id(r), r.tag)) {
				case 1:
					return ((t = r.flags), t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null);
				case 3:
					return (
						Yr(Lt),
						_t(),
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
					return (_t(), null);
				case 10:
					return (Yr(r.type), null);
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
					return (Yr(Lt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function R0(t, r) {
			switch ((id(r), r.tag)) {
				case 3:
					(Yr(Lt), _t());
					break;
				case 26:
				case 27:
				case 5:
					hn(r);
					break;
				case 4:
					_t();
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
					Yr(r.type);
					break;
				case 22:
				case 23:
					(Un(r), pd(), t !== null && et(ma));
					break;
				case 24:
					Yr(Lt);
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
		function Oi(t, r, a) {
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
								var z = a,
									Q = C;
								try {
									Q();
								} catch (J) {
									ot(c, z, J);
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
								d = $r(t.memoizedProps, c);
							((c.ref === null || c.ref.name !== d) && (c.ref = Vp(d)), (s = c.ref));
							break;
						case 7:
							if (t.stateNode === null) {
								var v = new $n(t);
								(y(t.child, !1, hx, v, void 0, void 0), (t.stateNode = v));
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
		function kl(t, r) {
			if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && r !== null)
				for (var a = 0; a < r.length; a++) Fp(t.stateNode, r[a]);
		}
		function D0(t) {
			for (var r = t.return; r !== null && (Xd(r) && Fp(t.stateNode, r.stateNode), !Gd(r));) r = r.return;
		}
		function ks(t) {
			for (var r = t.return; r !== null && (Xd(r) && mx(t.stateNode, r.stateNode), !Gd(r));) r = r.return;
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
				(KT(s, t.type, a, r), (s[Cn] = r));
			} catch (c) {
				ot(t, t.return, c);
			}
		}
		function z0(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Ii(t.type)) || t.tag === 4;
		}
		function eh(t) {
			e: for (;;) {
				for (; t.sibling === null;) {
					if (t.return === null || z0(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;) {
					if ((t.tag === 27 && Ii(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
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
					kl(t, s),
					(Xe = !0));
			else if (
				c !== 4 &&
				(c === 27 && (kl(t, s), (s = null), Ii(t.type) && ((a = t.stateNode), (r = null))), (t = t.child), t !== null)
			)
				for (th(t, r, a, s), t = t.sibling; t !== null;) (th(t, r, a, s), (t = t.sibling));
		}
		function jl(t, r, a, s) {
			var c = t.tag;
			if (c === 5 || c === 6) ((c = t.stateNode), r ? a.insertBefore(c, r) : a.appendChild(c), kl(t, s), (Xe = !0));
			else if (
				c !== 4 &&
				(c === 27 && (kl(t, s), (s = null), Ii(t.type) && (a = t.stateNode)), (t = t.child), t !== null)
			)
				for (jl(t, r, a, s), t = t.sibling; t !== null;) (jl(t, r, a, s), (t = t.sibling));
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
		function k0(t) {
			(t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ql = !0);
		}
		var Tr = null;
		function j0() {
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
						((r = Hr(r.default, r.share)), r !== "none" && (vo(t, a, r, null, !1) || xr(t.child, !1)));
					}
					t = t.sibling;
				}
		}
		function nh(t, r) {
			if (t.tag === 30) {
				var a = t.stateNode,
					s = t.memoizedProps,
					c = $r(s, a),
					d = Hr(s.default, a.paired ? s.share : s.enter);
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
										var d = Hr(a.default, a.share);
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
					a = $r(r, t.stateNode),
					s = Vn !== null ? Vn.get(a) : void 0,
					c = Hr(r.default, s !== void 0 ? r.share : r.exit);
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
						a = $r(r, t.stateNode);
					((r = Hr(r.default, r.update)), (t.flags &= -5), r !== "none" && vo(t, a, r, (t.memoizedState = []), !1));
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
					var z = r.stateNode;
					if (d !== null && xn < d.length) {
						var Q = d[xn],
							J = qh(z);
						(Q.view || J.view) && (C = !0);
						var oe;
						if ((oe = (t.flags & 4) === 0))
							if (J.clip) oe = !0;
							else {
								oe = Q.rect;
								var H = J.rect;
								oe = oe.y !== H.y || oe.x !== H.x || oe.height !== H.height || oe.width !== H.width;
							}
						(oe && (t.flags |= 4),
							J.abs ? (J = !Q.abs) : ((Q = Q.rect), (J = J.rect), (J = Q.height !== J.height || Q.width !== J.width)),
							J && (t.flags |= 32));
					} else t.flags |= 32;
					((t.flags & 4) !== 0 && qp(z, xn === 0 ? a : a + "_" + xn, c),
						(C && (t.flags & 4) !== 0) ||
							(Tr === null && (Tr = []), Tr.push(z, xn === 0 ? s : s + "_" + xn, r.memoizedProps)),
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
						c = $r(a, s),
						d = Hr(a.default, a.update);
					if (r) {
						s = s.clones;
						var v = s === null ? null : s.map(tx);
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
			js = !1,
			Vl = !1,
			uh = !1;
		function xT(t, r, a) {
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
								z = -1,
								Q = -1,
								J = 0,
								oe = 0,
								H = t,
								X = null;
							t: for (;;) {
								for (
									var he;
									H !== s || (d !== 0 && H.nodeType !== 3) || (z = C + d),
										H !== v || (c !== 0 && H.nodeType !== 3) || (Q = C + c),
										H.nodeType === 3 && (C += H.nodeValue.length),
										(he = H.firstChild) !== null;
								)
									((X = H), (H = he));
								for (;;) {
									if (H === t) break t;
									if (
										(X === s && ++J === d && (z = C), X === v && ++oe === c && (Q = C), (he = H.nextSibling) !== null)
									)
										break;
									((H = X), (X = H.parentNode));
								}
								H = he;
							}
							s = z === -1 || Q === -1 ? null : { start: z, end: Q };
						} else s = null;
					}
				s = s || { start: 0, end: 0 };
			} else s = null;
			for (
				zh = { focusedElem: t, selectionRange: s }, Io = !1, a = (a & 335544064) === a, Jt = r, r = a ? 9270 : 1024;
				Jt !== null;
			) {
				if (((t = Jt), a && ((s = t.deletions), s !== null))) for (d = 0; d < s.length; d++) a && ih(s[d]);
				if (t.alternate === null && (t.flags & 2) !== 0) (a && k0(t), Bl(a));
				else {
					if (t.tag === 22) {
						if (((s = t.alternate), t.memoizedState !== null)) {
							(s !== null && s.memoizedState === null && a && ih(s), Bl(a));
							continue;
						} else if (s !== null && s.memoizedState !== null) {
							(a && k0(t), Bl(a));
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
							((a = $r(s.memoizedProps, s.stateNode)),
							(c = r.memoizedProps),
							(c = Hr(c.default, c.update)),
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
							t !== null && ((t = t.dehydrated), t !== null && ((a = LT.bind(null, a)), yx(t, a)))));
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
					} catch (z) {
						ot(t, t.return, z);
					}
					ch(t, r);
					break;
				case 6:
					try {
						((t.stateNode.nodeValue = r ? "" : t.memoizedProps), (Xe = !0));
					} catch (z) {
						ot(t, t.return, z);
					}
					break;
				case 18:
					try {
						var C = t.stateNode;
						r ? jp(C, !0) : jp(t.stateNode, !1);
					} catch (z) {
						ot(t, t.return, z);
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
		var St = null,
			On = !1;
		function cr(t, r, a) {
			for (a = a.child; a !== null;) (Z0(t, r, a), (a = a.sibling));
		}
		function Z0(t, r, a) {
			if (ze && typeof ze.onCommitFiberUnmount == "function")
				try {
					ze.onCommitFiberUnmount(Oe, a);
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
					(rt || sn(a, r), ks(a));
					var s = St,
						c = On;
					(Ii(a.type) && ((St = a.stateNode), (On = !1)),
						cr(t, r, a),
						Xp(a.stateNode, a.type, a.memoizedProps),
						(St = s),
						(On = c));
					break;
				case 5:
					(rt || sn(a, r), ks(a));
				case 6:
					if ((a.tag === 6 && ks(a), (s = St), (c = On), (St = null), cr(t, r, a), (St = s), (On = c), St !== null))
						if (On)
							try {
								((St.nodeType === 9 ? St.body : St.nodeName === "HTML" ? St.ownerDocument.body : St).removeChild(
									a.stateNode,
								),
									(Xe = !0));
							} catch (d) {
								ot(a, r, d);
							}
						else
							try {
								(St.removeChild(a.stateNode), (Xe = !0));
							} catch (d) {
								ot(a, r, d);
							}
					break;
				case 18:
					St !== null &&
						(On
							? ((t = St),
								kp(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								ko(t))
							: kp(St, a.stateNode));
					break;
				case 4:
					((s = St), (c = On), (St = a.stateNode.containerInfo), (On = !0), cr(t, r, a), (St = s), (On = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Oi(2, a, r), rt || Oi(4, a, r), cr(t, r, a));
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
					ko(t);
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
					ko(t);
				} catch (a) {
					ot(r, r.return, a);
				}
		}
		function OT(t) {
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
			var a = OT(t);
			r.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = UT.bind(null, t, s);
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
						z = C;
					e: for (; z !== null;) {
						switch (z.tag) {
							case 27:
								if (Ii(z.type)) {
									((St = z.stateNode), (On = !1));
									break e;
								}
								break;
							case 5:
								((St = z.stateNode), (On = !1));
								break e;
							case 3:
							case 4:
								((St = z.stateNode.containerInfo), (On = !0));
								break e;
						}
						z = z.return;
					}
					if (St === null) throw Error(u(160));
					(Z0(v, C, d), (St = null), (On = !1), (v = d.alternate), v !== null && (v.return = null), (d.return = null));
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
					(wn(r, t, a), En(t), c & 4 && (Oi(3, t, t.return), Is(3, t), Oi(5, t, t.return)));
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
							ko(r.containerInfo);
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
						Xe && js && (Vl = !0),
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
						z = rt,
						Q = Or;
					((Xt = C || d),
						(Or = Q || d),
						(rt = z || v),
						wn(r, t, a),
						(rt = z),
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
								((r = v || rt), (a = Xt), (s = rt), (Xt = d || Xt), (rt = r), Ai(t, 2), (Xt = a), (rt = s)),
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
						(d = js),
						(v = (a & 335544064) === a),
						(C = t.memoizedProps),
						(js = v && Hr(C.default, C.update) !== "none"),
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
							jl(t, eh(t), C, v);
							break;
						case 5:
							var z = a.stateNode;
							(a.flags & 32 && (Xa(z, ""), (a.flags &= -33)), jl(t, eh(t), z, v));
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
						if (((uh = Ar = !1), j0(), yo(r, t), !Ar && !Vl)) {
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
						((s = Ar), (c = j0()), (Ar = !1), yo(r, t), Ar && (t.flags |= 4));
						var d = t.memoizedProps,
							v = t.stateNode;
						((r = $r(d, v)), (v = $r(a.memoizedProps, v)));
						var C = Hr(d.default, d.update);
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
		function Ai(t, r) {
			for (t = t.child; t !== null;) {
				var a = t,
					s = r;
				switch (a.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Oi(4, a, a.return), Ai(a, s));
						break;
					case 1:
						sn(a, a.return);
						var c = a.stateNode;
						(typeof c.componentWillUnmount == "function" && M0(a, a.return, c), Ai(a, s));
						break;
					case 27:
						(s & 2) !== 0 && Xp(a.stateNode, a.type, a.memoizedProps);
					case 5:
						(sn(a, a.return), (a.tag !== 5 && a.tag !== 27) || ks(a), Ai(a, s));
						break;
					case 6:
						ks(a);
						break;
					case 26:
						(sn(a, a.return),
							(c = a.stateNode),
							a.memoizedState !== null || c === null || rt || c.parentNode.removeChild(c),
							Ai(a, s));
						break;
					case 22:
						a.memoizedState === null && Ai(a, s);
						break;
					case 30:
						(sn(a, a.return), Ai(a, s));
						break;
					case 7:
						sn(a, a.return);
					default:
						Ai(a, s);
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
							var z = s.stateNode;
							try {
								var Q = c.shared.hiddenCallbacks;
								if (Q !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < Q.length; c++) wy(Q[c], z);
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
						((z = d.stateNode),
							d.memoizedState !== null || z === null || Xt || Qh(Zs(z.ownerDocument), d.type, z),
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
								z = v.onPostCommit;
							typeof z == "function" && z(C, r.alternate === null ? "mount" : "update", d.passiveEffectDuration, -0);
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
					z = s,
					Q = v.flags;
				switch (v.tag) {
					case 0:
					case 11:
					case 15:
						(po(d, v, C, z, c), Is(8, v));
						break;
					case 23:
						break;
					case 22:
						var J = v.stateNode;
						(v.memoizedState !== null
							? J._visibility & 2
								? po(d, v, C, z, c)
								: qs(d, v)
							: ((J._visibility |= 2), po(d, v, C, z, c)),
							c && Q & 2048 && fh(v.alternate, v));
						break;
					case 24:
						(po(d, v, C, z, c), c && Q & 2048 && dh(v.alternate, v));
						break;
					default:
						po(d, v, C, z, c);
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
								? Mx(a, fr, t.memoizedState, t.memoizedProps)
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
					(Ls(t), t.flags & 2048 && Oi(9, t, t.return));
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
						(Oi(8, r, r.return), $l(r));
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
						Oi(8, a, r);
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
		var AT = {
				getCacheForType: function (t) {
					var r = rn(Lt),
						a = r.data.get(t);
					return (a === void 0 && ((a = t()), r.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return rn(Lt).controller.signal;
				},
			},
			RT = typeof WeakMap == "function" ? WeakMap : Map,
			tt = 0,
			dt = null,
			Pe = null,
			He = 0,
			at = 0,
			Bn = null,
			Ri = !1,
			bo = !1,
			hh = !1,
			Wr = 0,
			Mt = 0,
			Ni = 0,
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
			Mi = null,
			Tt = 0,
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
				(s === null && (s = a.ref = Vp($r(t.memoizedProps, a))), Eo === null && (Eo = []), Eo.push(r.bind(null, s)));
			}
		}
		function Rn(t, r, a) {
			(((t === dt && (at === 2 || at === 9)) || t.cancelPendingCommit !== null) && (To(t, 0), Di(t, He, Pn, !1)),
				Hu(t, a),
				((tt & 2) === 0 || t !== dt) &&
					(t === dt && ((tt & 2) === 0 && (Ca |= a), Mt === 4 && Di(t, He, Pn, !1)), ei(t)));
		}
		function ap(t, r, a) {
			if ((tt & 6) !== 0) throw Error(u(327));
			var s = (!a && (r & 127) === 0 && (r & t.expiredLanes) === 0) || os(t, r),
				c = s ? DT(t, r) : ph(t, r, !0),
				d = s;
			do {
				if (c === 0) {
					bo && !s && Di(t, r, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !NT(a))) {
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
								var z = C.current.memoizedState.isDehydrated;
								if ((z && (To(C, v).flags |= 256), (v = ph(C, v, !1)), v !== 2 && v !== 6)) {
									if (hh && !z) {
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
						(To(t, 0), Di(t, r, 0, !0));
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
								Di(s, r, Pn, !Ri);
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
							if ((Di(s, r, Pn, !Ri), $u(s, 0, !0) !== 0)) break e;
							((Nr = r),
								(s.timeoutHandle = jh(op.bind(null, s, a, An, Ql, mh, r, Pn, Ca, So, Ri, d, "Throttled", -0, 0), c)));
							break e;
						}
						op(s, a, An, Ql, mh, r, Pn, Ca, So, Ri, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			ei(t);
		}
		function op(t, r, a, s, c, d, v, C, z, Q, J, oe, H, X) {
			t.timeoutHandle = -1;
			var he = r.subtreeFlags,
				we = (d & 335544064) === d;
			if (
				((oe = null),
				(we || he & 8192 || (he & 16785408) === 16785408) &&
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
						((he = oe),
						(we = t.containerInfo),
						(we = (we.nodeType === 9 ? we : we.ownerDocument).__reactViewTransition),
						we != null &&
							(he.count++, (he.waitingForViewTransition = !0), (he = Ys.bind(he)), we.finished.then(he, he))),
					(he = (d & 62914560) === d ? Zl - tn() : (d & 4194048) === d ? np - tn() : 0),
					(he = Dx(oe, he)),
					he !== null))
			) {
				((Nr = d),
					(t.cancelPendingCommit = he(mp.bind(null, t, r, d, a, s, c, v, C, z, Q, J, oe, null, H, X))),
					Di(t, d, v, !Q));
				return;
			}
			mp(t, r, d, a, s, c, v, C, z, Q, J, oe);
		}
		function NT(t) {
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
		function Di(t, r, a, s) {
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
				else ((t = Pe), (Qr = ca = null), Td(t), (co = null), (Cs = 0), (t = Pe));
				for (; t !== null;) (R0(t.alternate, t), (t = t.return));
				Pe = null;
			}
		}
		function To(t, r) {
			var a = t.timeoutHandle;
			return (
				a !== -1 && ((t.timeoutHandle = -1), JT(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(Nr = 0),
				yh(),
				(dt = t),
				(Pe = a = Zr(t.current, null)),
				(He = r),
				(at = 0),
				(Bn = null),
				(Ri = !1),
				(bo = os(t, r)),
				(hh = !1),
				(So = Pn = Hl = Ca = Ni = Mt = 0),
				(An = Us = null),
				(mh = !1),
				(Wr = rv(t, r)),
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
			return ((ce.A = AT), t);
		}
		function Gl() {
			((Mt = 4),
				Ri || ((He & 4194048) !== He && an.current !== null) || (bo = !0),
				((Ni & 134217727) === 0 && (Ca & 134217727) === 0) || dt === null || Di(dt, He, Pn, !1));
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
							z = Bn;
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
								if (((at = 0), (Bn = null), xo(t, C, z, Q), a && bo)) {
									v = 0;
									break e;
								}
								break;
							default:
								((Q = at), (at = 0), (Bn = null), xo(t, C, z, Q));
						}
					}
					(MT(), (v = Mt));
					break;
				} catch (J) {
					sp(t, J);
				}
			while (!0);
			return (
				r && t.shellSuspendCounter++,
				(Qr = ca = null),
				(tt = s),
				(ce.H = c),
				(ce.A = d),
				Pe === null && ((dt = null), (He = 0), rl()),
				v
			);
		}
		function MT() {
			for (; Pe !== null;) fp(Pe);
		}
		function DT(t, r) {
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
									((at !== 2 && at !== 9) || dt !== t || (at = 7), ei(t));
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
											var z = C.sibling;
											if (z !== null) Pe = z;
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
					zT();
					break;
				} catch (J) {
					sp(t, J);
				}
			while (!0);
			return ((Qr = ca = null), (ce.H = s), (ce.A = c), (tt = a), Pe !== null ? 0 : ((dt = null), (He = 0), rl(), Mt));
		}
		function zT() {
			for (; Pe !== null && !mi();) fp(Pe);
		}
		function fp(t) {
			var r = O0(t.alternate, t, Wr);
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
					(R0(a, r), (r = Pe = iy(r, Wr)), (r = O0(a, r, Wr)));
			}
			((t.memoizedProps = t.pendingProps), r === null ? Xl(t) : (Pe = r));
		}
		function xo(t, r, a, s) {
			((Qr = ca = null), Td(r), (co = null), (Cs = 0));
			var c = r.return;
			try {
				if (ST(t, c, r, a, He)) {
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
							: ((Ri = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = an.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					hp(r, t))
				: Xl(r);
		}
		function Xl(t) {
			var r = t;
			do {
				if ((r.flags & 32768) !== 0) {
					hp(r, Ri);
					return;
				}
				t = r.return;
				var a = CT(r.alternate, r, Wr);
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
				var a = TT(t.alternate, t);
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
		function mp(t, r, a, s, c, d, v, C, z, Q, J, oe) {
			t.cancelPendingCommit = null;
			do Jl();
			while (Tt !== 0);
			if ((tt & 6) !== 0) throw Error(u(327));
			if (r !== null) {
				if (r === t.current) throw Error(u(177));
				(t === dt && ((Pe = dt = null), (He = 0)),
					(Ta = r),
					(hr = t),
					(Nr = a),
					(vh = c),
					(rp = s),
					IT(t, r, a, v, C, z, oe));
			}
		}
		function IT(t, r, a, s, c, d, v) {
			var C = r.lanes | r.childLanes;
			if (
				((gh = C),
				(C |= Wf),
				gC(t, a, C, s, c, d),
				(Eo = null),
				(a & 335544064) === a ? ((_o = aT(t)), (s = 10262)) : ((_o = null), (s = 10256)),
				(r.subtreeFlags & s) !== 0 || (r.flags & s) !== 0
					? ((t.callbackNode = null),
						(t.callbackPriority = 0),
						VT(ft, function () {
							return (Eh(), null);
						}))
					: ((t.callbackNode = null), (t.callbackPriority = 0)),
				(ql = !1),
				(s = (r.flags & 13878) !== 0),
				(r.subtreeFlags & 13878) !== 0 || s)
			) {
				((s = ce.T), (ce.T = null), (c = ve.p), (ve.p = 2), (d = tt), (tt |= 4));
				try {
					xT(t, r, a);
				} finally {
					((tt = d), (ve.p = c), (ce.T = s));
				}
			}
			((Tt = 1), ql ? (wo = ix(v, t.containerInfo, _o, bh, Sh, jT, wh, Eh, kT, null, null)) : (bh(), Sh(), wh()));
		}
		function kT(t) {
			if (Tt !== 0) {
				var r = hr.onRecoverableError;
				r(t, { componentStack: null });
			}
		}
		function jT() {
			Tt === 3 && ((Tt = 0), G0(Ta, hr), (Tt = 4));
		}
		function bh() {
			if (Tt === 1) {
				Tt = 0;
				var t = hr,
					r = Ta,
					a = Nr,
					s = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || s) {
					((s = ce.T), (ce.T = null));
					var c = ve.p;
					ve.p = 2;
					var d = tt;
					tt |= 4;
					try {
						((js = Vl = !1), Y0(r, t, a), (a = zh));
						var v = Yv(t.containerInfo),
							C = a.focusedElem,
							z = a.selectionRange;
						if (v !== C && C && C.ownerDocument && Qv(C.ownerDocument.documentElement, C)) {
							if (z !== null && Yf(C)) {
								var Q = z.start,
									J = z.end;
								if ((J === void 0 && (J = Q), "selectionStart" in C))
									((C.selectionStart = Q), (C.selectionEnd = Math.min(J, C.value.length)));
								else {
									var oe = C.ownerDocument || document,
										H = (oe && oe.defaultView) || window;
									if (H.getSelection) {
										var X = H.getSelection(),
											he = C.textContent.length,
											we = Math.min(z.start, he),
											Le = z.end === void 0 ? we : Math.min(z.end, he);
										!X.extend && we > Le && ((v = Le), (Le = we), (we = v));
										var Z = Fv(C, we),
											P = Fv(C, Le);
										if (
											Z &&
											P &&
											(X.rangeCount !== 1 ||
												X.anchorNode !== Z.node ||
												X.anchorOffset !== Z.offset ||
												X.focusNode !== P.node ||
												X.focusOffset !== P.offset)
										) {
											var K = oe.createRange();
											(K.setStart(Z.node, Z.offset),
												X.removeAllRanges(),
												we > Le
													? (X.addRange(K), X.extend(P.node, P.offset))
													: (K.setEnd(P.node, P.offset), X.addRange(K)));
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
						((tt = d), (ve.p = c), (ce.T = s));
					}
				}
				((t.current = r), (Tt = 2));
			}
		}
		function Sh() {
			if (Tt === 2) {
				Tt = 0;
				var t = hr,
					r = Ta,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = ce.T), (ce.T = null));
					var s = ve.p;
					ve.p = 2;
					var c = tt;
					tt |= 4;
					try {
						P0(t, r.alternate, r);
					} finally {
						((tt = c), (ve.p = s), (ce.T = a));
					}
				}
				Tt = 3;
			}
		}
		function wh() {
			if (Tt === 4 || Tt === 3) {
				Tt = 0;
				var t = wo;
				((wo = null), br());
				var r = hr,
					a = Ta,
					s = Nr,
					c = rp,
					d = (s & 335544064) === s ? 10262 : 10256;
				if (
					((a.subtreeFlags & d) !== 0 || (a.flags & d) !== 0
						? (Tt = 5)
						: ((Tt = 0), (Ta = hr = null), gp(r, r.pendingLanes)),
					(d = r.pendingLanes),
					d === 0 && (Mi = null),
					Nf(s),
					(a = a.stateNode),
					ze && typeof ze.onCommitFiberRoot == "function")
				)
					try {
						ze.onCommitFiberRoot(Oe, a, void 0, (a.current.flags & 128) === 128);
					} catch {}
				if (c !== null) {
					((a = ce.T), (d = ve.p), (ve.p = 2), (ce.T = null));
					try {
						for (var v = r.onRecoverableError, C = 0; C < c.length; C++) {
							var z = c[C];
							v(z.value, { componentStack: z.stack });
						}
					} finally {
						((ce.T = a), (ve.p = d));
					}
				}
				if (((c = Eo), (v = _o), (_o = null), c !== null && ((Eo = null), v === null && (v = []), t !== null)))
					for (z = 0; z < c.length; z++) ((a = (0, c[z])(v)), a !== void 0 && t.finished.finally(a));
				((Nr & 3) !== 0 && Jl(),
					ei(r),
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
			if (Tt !== 5) return !1;
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
				if (((Tt = 0), (Ta = hr = null), (Nr = 0), (tt & 6) !== 0)) throw Error(u(331));
				var C = tt;
				if (
					((tt |= 4),
					ep(d.current),
					X0(d, d.current, v, a),
					(tt = C),
					Bs(0, !1),
					ze && typeof ze.onPostCommitFiberRoot == "function")
				)
					try {
						ze.onPostCommitFiberRoot(Oe, d);
					} catch {}
				return !0;
			} finally {
				((ve.p = c), (ce.T = s), gp(t, r));
			}
		}
		function vp(t, r, a) {
			((r = Gn(a, r)), (r = Ud(t.stateNode, r, 2)), (t = ba(t, r, 2)), t !== null && (Hu(t, 2), ei(t)));
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
							(typeof s.componentDidCatch == "function" && (Mi === null || !Mi.has(s)))
						) {
							((t = Gn(a, t)), (a = d0(2)), (s = ba(r, a, 2)), s !== null && (h0(a, s, r, t), Hu(s, 2), ei(s)));
							break;
						}
					}
					r = r.return;
				}
		}
		function _h(t, r, a) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new RT();
				var c = new Set();
				s.set(r, c);
			} else ((c = s.get(r)), c === void 0 && ((c = new Set()), s.set(r, c)));
			c.has(a) || ((hh = !0), c.add(a), (t = qT.bind(null, t, r, a)), r.then(t, t));
		}
		function qT(t, r, a) {
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
				ei(t));
		}
		function yp(t, r) {
			(r === 0 && (r = iv()), (t = sa(t, r)), t !== null && (Hu(t, r), ei(t)));
		}
		function LT(t) {
			var r = t.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), yp(t, a));
		}
		function UT(t, r) {
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
		function VT(t, r) {
			return hi(t, r);
		}
		var Oo = null,
			Ao = null,
			Ch = !1,
			Wl = !1,
			Th = !1,
			zi = 0;
		function ei(t) {
			(t !== Ao && t.next === null && (Ao === null ? (Oo = Ao = t) : (Ao = Ao.next = t)),
				(Wl = !0),
				Ch || ((Ch = !0), PT()));
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
		function BT() {
			pp();
		}
		function pp() {
			Wl = Ch = !1;
			var t = 0;
			zi !== 0 && XT() && (t = zi);
			for (var r = tn(), a = null, s = Oo; s !== null;) {
				var c = s.next,
					d = bp(s, r);
				(d === 0
					? ((s.next = null), a === null ? (Oo = c) : (a.next = c), c === null && (Ao = a))
					: ((a = s), (t !== 0 || (d & 3) !== 0) && (Wl = !0)),
					(s = c));
			}
			((Tt !== 0 && Tt !== 5) || Bs(t, !1), zi !== 0 && (zi = 0));
		}
		function bp(t, r) {
			for (var a = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d;) {
				var v = 31 - Me(d),
					C = 1 << v,
					z = c[v];
				(z === -1 ? ((C & a) === 0 || (C & s) !== 0) && (c[v] = mC(C, r)) : z <= r && (t.expiredLanes |= C), (d &= ~C));
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
				return ((s = Sp.bind(null, t)), (a = hi(a, s)), (t.callbackPriority = r), (t.callbackNode = a), r);
			}
			return (s !== null && s !== null && pr(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function Sp(t, r) {
			if (Tt !== 0 && Tt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
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
		function PT() {
			WT(function () {
				(tt & 6) !== 0 ? hi(Be, BT) : pp();
			});
		}
		function xh() {
			if (zi === 0) {
				var t = ha;
				(t === 0 && ((t = gn), (gn <<= 1), (gn & 261888) === 0 && (gn = 256)), (zi = t));
			}
			return zi;
		}
		function Ep(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ku(t);
		}
		function $T(t, r, a, s, c) {
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
									if (zi !== 0) {
										var z = new FormData(c, v);
										Id(a, { pending: !0, data: z, method: c.method, action: d }, null, z);
									}
								} else
									typeof d == "function" &&
										(C.preventDefault(),
										(z = new FormData(c, v)),
										Id(a, { pending: !0, data: z, method: c.method, action: d }, d, z));
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
			lr(XC, "onTransitionRun"),
			lr(JC, "onTransitionStart"),
			lr(WC, "onTransitionCancel"),
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
			HT = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ps));
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
								z = C.instance,
								Q = C.currentTarget;
							if (((C = C.listener), z !== d && c.isPropagationStopped())) break e;
							((d = C), (c.currentTarget = Q));
							try {
								d(c);
							} catch (J) {
								nl(J);
							}
							((c.currentTarget = null), (d = z));
						}
					else
						for (v = 0; v < s.length; v++) {
							if (
								((C = s[v]),
								(z = C.instance),
								(Q = C.currentTarget),
								(C = C.listener),
								z !== d && c.isPropagationStopped())
							)
								break e;
							((d = C), (c.currentTarget = Q));
							try {
								d(c);
							} catch (J) {
								nl(J);
							}
							((c.currentTarget = null), (d = z));
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
						a !== "selectionchange" && (HT.has(a) || Rh(a, !1, t), Rh(a, !0, t));
					}));
				var r = t.nodeType === 9 ? t : t.ownerDocument;
				r === null || r[ec] || ((r[ec] = !0), Rh("selectionchange", !1, r));
			}
		}
		function Tp(t, r, a, s) {
			switch (hb(r)) {
				case 2:
					var c = Lx;
					break;
				case 8:
					c = Ux;
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
								var z = v.tag;
								if ((z === 3 || z === 4) && v.stateNode.containerInfo === c) return;
								v = v.return;
							}
						for (; C !== null;) {
							if (((v = ra(C)), v === null)) return;
							if (((z = v.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
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
					J = jf(a),
					oe = [];
				e: {
					var H = ty.get(t);
					if (H !== void 0) {
						var X = Wu,
							he = t;
						switch (t) {
							case "keypress":
								if (Xu(a) === 0) break e;
							case "keydown":
							case "keyup":
								X = zC;
								break;
							case "focusin":
								((he = "focus"), (X = Pf));
								break;
							case "focusout":
								((he = "blur"), (X = Pf));
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
								X = xC;
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
								X = OC;
								break;
							case ey:
								X = jC;
								break;
							case "scroll":
							case "scrollend":
								X = TC;
								break;
							case "wheel":
								X = qC;
								break;
							case "copy":
							case "cut":
							case "paste":
								X = AC;
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
								X = IC;
								break;
							case "toggle":
							case "beforetoggle":
								X = LC;
						}
						var we = (r & 4) !== 0,
							Le = !we && (t === "scroll" || t === "scrollend"),
							Z = we ? (H !== null ? H + "Capture" : null) : H;
						we = [];
						for (var P = Q, K; P !== null;) {
							var ie = P;
							if (
								((K = ie.stateNode),
								(ie = ie.tag),
								(ie !== 5 && ie !== 26 && ie !== 27) ||
									K === null ||
									Z === null ||
									((ie = cs(P, Z)), ie != null && we.push($s(P, ie, K))),
								Le)
							)
								break;
							P = P.return;
						}
						0 < we.length && ((H = new X(H, he, null, a, J)), oe.push({ event: H, listeners: we }));
					}
				}
				if ((r & 7) === 0) {
					e: {
						if (
							((X = t === "mouseover" || t === "pointerover"),
							(H = t === "mouseout" || t === "pointerout"),
							X && a !== kf && (he = a.relatedTarget || a.fromElement) && (ra(he) || he[ss]))
						)
							break e;
						(H || X) &&
							((he = J.window === J ? J : (X = J.ownerDocument) ? X.defaultView || X.parentWindow : window),
							H
								? ((X = a.relatedTarget || a.toElement),
									(H = Q),
									(X = X ? ra(X) : null),
									X !== null &&
										((Le = f(X)), (we = X.tag), X !== Le || (we !== 5 && we !== 27 && we !== 6)) &&
										(X = null))
								: ((H = null), (X = Q)),
							H !== X &&
								((we = Nv),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(P = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((we = Dv), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (P = "pointer")),
								(Le = H == null ? he : ls(H)),
								(K = X == null ? he : ls(X)),
								(he = new we(ie, P + "leave", H, a, J)),
								(he.target = Le),
								(he.relatedTarget = K),
								(ie = null),
								ra(J) === Q &&
									((we = new we(Z, P + "enter", X, a, J)), (we.target = K), (we.relatedTarget = Le), (ie = we)),
								(Le = ie),
								(we = H && X ? O(H, X, ZT) : null),
								H !== null && xp(oe, he, H, we, !1),
								X !== null && Le !== null && xp(oe, Le, X, we, !0)));
					}
					e: {
						if (
							((H = Q ? ls(Q) : window),
							(X = H.nodeName && H.nodeName.toLowerCase()),
							X === "select" || (X === "input" && H.type === "file"))
						)
							var Se = Vv;
						else if (Lv(H))
							if (Bv) Se = YC;
							else {
								Se = FC;
								var Ze = ZC;
							}
						else
							((X = H.nodeName),
								!X || X.toLowerCase() !== "input" || (H.type !== "checkbox" && H.type !== "radio")
									? Q && If(Q.elementType) && (Se = Vv)
									: (Se = QC));
						if (Se && (Se = Se(t, Q))) {
							Uv(oe, Se, a, J);
							break e;
						}
						Ze && Ze(t, H, Q);
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
							if (GC) break;
						case "keydown":
						case "keyup":
							Kv(oe, a, J);
					}
					var Re;
					if (Hf)
						e: {
							switch (t) {
								case "compositionstart":
									var Ie = "onCompositionStart";
									break e;
								case "compositionend":
									Ie = "onCompositionEnd";
									break e;
								case "compositionupdate":
									Ie = "onCompositionUpdate";
									break e;
							}
							Ie = void 0;
						}
					else
						eo
							? jv(t, a) && (Ie = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (Ie = "onCompositionStart");
					(Ie &&
						(zv &&
							a.locale !== "ko" &&
							(eo || Ie !== "onCompositionStart"
								? Ie === "onCompositionEnd" && eo && (Re = Av())
								: ((vi = J), (Uf = "value" in vi ? vi.value : vi.textContent), (eo = !0))),
						(Ze = tc(Q, Ie)),
						0 < Ze.length &&
							((Ie = new Mv(Ie, t, null, a, J)),
							oe.push({ event: Ie, listeners: Ze }),
							Re ? (Ie.data = Re) : ((Re = qv(a)), Re !== null && (Ie.data = Re)))),
						(Re = VC ? BC(t, a) : PC(t, a)) &&
							((Ie = tc(Q, "onBeforeInput")),
							0 < Ie.length &&
								((Ze = new Mv("onBeforeInput", "beforeinput", null, a, J)),
								oe.push({ event: Ze, listeners: Ie }),
								(Ze.data = Re))),
						$T(oe, t, Q, a, J));
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
		function ZT(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function xp(t, r, a, s, c) {
			for (var d = r._reactName, v = []; a !== null && a !== s;) {
				var C = a,
					z = C.alternate,
					Q = C.stateNode;
				if (((C = C.tag), z !== null && z === s)) break;
				((C !== 5 && C !== 26 && C !== 27) ||
					Q === null ||
					((z = Q),
					c
						? ((Q = cs(a, d)), Q != null && v.unshift($s(a, Q, z)))
						: c || ((Q = cs(a, d)), Q != null && v.push($s(a, Q, z)))),
					(a = a.return));
			}
			v.length !== 0 && t.push({ event: r, listeners: v });
		}
		var FT = /\r\n?/g,
			QT = /\u0000|\uFFFD/g;
		function Op(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					FT,
					`
`,
				)
				.replace(QT, "");
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
					Br(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					Br(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					Br(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					Br(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					Br(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					Br(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					Br(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					Br(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					Br(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					Qu(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					return;
				default:
					if (!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N"))
						((a = _C.get(a) || a), Qu(t, a, s));
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
						z = null,
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
										z = J;
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
					wv(t, d, C, z, Q, v, c, !1);
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
					for (z in a)
						if (a.hasOwnProperty(z) && ((s = a[z]), s != null))
							switch (z) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									st(t, r, z, s, a, null);
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
		var YT = {};
		function KT(t, r, a, s) {
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
						z = null,
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
									z = oe;
								default:
									s.hasOwnProperty(X) || st(t, r, X, null, s, oe);
							}
					}
					for (var H in s) {
						var X = s[H];
						if (((oe = a[H]), s.hasOwnProperty(H) && (X != null || oe != null)))
							switch (H) {
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
									X !== oe && st(t, r, H, X, s, oe);
							}
					}
					Df(t, v, C, z, Q, J, d, c);
					return;
				case "select":
					X = v = C = H = null;
					for (d in a)
						if (((z = a[d]), a.hasOwnProperty(d) && z != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									X = z;
								default:
									s.hasOwnProperty(d) || st(t, r, d, null, s, z);
							}
					for (c in s)
						if (((d = s[c]), (z = a[c]), s.hasOwnProperty(c) && (d != null || z != null)))
							switch (c) {
								case "value":
									(d !== z && (Xe = !0), (H = d));
									break;
								case "defaultValue":
									(d !== z && (Xe = !0), (C = d));
									break;
								case "multiple":
									(d !== z && (Xe = !0), (v = d));
								default:
									d !== z && st(t, r, c, d, s, z);
							}
					((r = C),
						(a = v),
						(s = X),
						H != null
							? Ga(t, !!a, H, !1)
							: !!s != !!a && (r != null ? Ga(t, !!a, r, !0) : Ga(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					X = H = null;
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
									(c !== d && (Xe = !0), (H = c));
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
					Ev(t, H, X);
					return;
				case "option":
					for (var he in a)
						if (((H = a[he]), a.hasOwnProperty(he) && H != null && !s.hasOwnProperty(he)))
							switch (he) {
								case "selected":
									t.selected = !1;
									break;
								default:
									st(t, r, he, null, s, H);
							}
					for (z in s)
						if (((H = s[z]), (X = a[z]), s.hasOwnProperty(z) && H !== X && (H != null || X != null)))
							switch (z) {
								case "selected":
									(H !== X && (Xe = !0), (t.selected = H && typeof H != "function" && typeof H != "symbol"));
									break;
								default:
									st(t, r, z, H, s, X);
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
						((H = a[we]), a.hasOwnProperty(we) && H != null && !s.hasOwnProperty(we) && st(t, r, we, null, s, H));
					for (Q in s)
						if (((H = s[Q]), (X = a[Q]), s.hasOwnProperty(Q) && H !== X && (H != null || X != null)))
							switch (Q) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (H != null) throw Error(u(137, r));
									break;
								default:
									st(t, r, Q, H, s, X);
							}
					return;
				default:
					if (If(r)) {
						for (var Le in a)
							((H = a[Le]),
								a.hasOwnProperty(Le) && H !== void 0 && !s.hasOwnProperty(Le) && Mh(t, r, Le, void 0, s, H));
						for (J in s)
							((H = s[J]),
								(X = a[J]),
								!s.hasOwnProperty(J) || H === X || (H === void 0 && X === void 0) || Mh(t, r, J, H, s, X));
						return;
					}
			}
			for (var Z in a)
				((H = a[Z]), a.hasOwnProperty(Z) && H != null && !s.hasOwnProperty(Z) && st(t, r, Z, null, s, H));
			for (oe in s)
				((H = s[oe]),
					(X = a[oe]),
					!s.hasOwnProperty(oe) || H === X || (H == null && X == null) || st(t, r, oe, H, s, X));
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
		function GT() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, r = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						v = c.initiatorType,
						C = c.duration;
					if (d && C && Rp(v)) {
						for (v = 0, C = c.responseEnd, s += 1; s < a.length; s++) {
							var z = a[s],
								Q = z.startTime;
							if (Q > C) break;
							var J = z.transferSize,
								oe = z.initiatorType;
							J && Rp(oe) && ((z = z.responseEnd), (v += J * (z < C ? 1 : (C - Q) / (z - Q))));
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
		var kh = null;
		function XT() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === kh ? !1 : ((kh = t), !0)) : ((kh = null), !1);
		}
		var jh = typeof setTimeout == "function" ? setTimeout : void 0,
			JT = typeof clearTimeout == "function" ? clearTimeout : void 0,
			zp = typeof Promise == "function" ? Promise : void 0,
			Ip = typeof requestAnimationFrame == "function" ? requestAnimationFrame : jh,
			WT =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof zp < "u"
						? function (t) {
								return zp.resolve(null).then(t).catch(ex);
							}
						: jh;
		function ex(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function Ii(t) {
			return t === "head";
		}
		function kp(t, r) {
			var a = r,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(t.removeChild(c), ko(r));
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
			ko(r);
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
		function tx(t) {
			var r = t.getBoundingClientRect();
			r = new DOMRect(r.x + 2e4, r.y + 2e4, r.width, r.height);
			var a = getComputedStyle(t);
			return Up(r, a, t);
		}
		function nx(t) {
			return t.documentElement.clientHeight;
		}
		function rx(t) {
			(this.addEventListener("load", t), this.addEventListener("error", t));
		}
		function ix(t, r, a, s, c, d, v, C, z) {
			var Q = r.nodeType === 9 ? r : r.ownerDocument;
			try {
				var J = Q.startViewTransition({
					update: function () {
						var H = Q.defaultView,
							X = H.navigation && H.navigation.transition,
							he = Q.fonts.status;
						s();
						var we = [];
						if (
							(he === "loaded" && (nx(Q), Q.fonts.status === "loading" && we.push(Q.fonts.ready)),
							(he = we.length),
							t !== null)
						)
							for (var Le = t.suspenseyImages, Z = 0, P = 0; P < Le.length; P++) {
								var K = Le[P];
								if (!K.complete) {
									var ie = K.getBoundingClientRect();
									if (0 < ie.bottom && 0 < ie.right && ie.top < H.innerHeight && ie.left < H.innerWidth) {
										if (((Z += ob(K)), Z > ic)) {
											we.length = he;
											break;
										}
										((K = new Promise(rx.bind(K))), we.push(K));
									}
								}
							}
						if (0 < we.length)
							return (
								(H = Promise.race([
									Promise.all(we),
									new Promise(function (Se) {
										return setTimeout(Se, 500);
									}),
								]).then(c, c)),
								(X ? Promise.allSettled([X.finished, H]) : H).then(d, d)
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
							for (var H = Q.documentElement.getAnimations({ subtree: !0 }), X = 0; X < H.length; X++) {
								var he = H[X],
									we = he.effect,
									Le = we.pseudoElement;
								if (Le != null && Le.startsWith("::view-transition")) {
									(oe.push(he), (he = we.getKeyframes()));
									for (var Z = (Le = void 0), P = !0, K = 0; K < he.length; K++) {
										var ie = he[K],
											Se = ie.width;
										if (Le === void 0) Le = Se;
										else if (Le !== Se) {
											P = !1;
											break;
										}
										if (((Se = ie.height), Z === void 0)) Z = Se;
										else if (Z !== Se) {
											P = !1;
											break;
										}
										(delete ie.width, delete ie.height, ie.transform === "none" && delete ie.transform);
									}
									P &&
										Le !== void 0 &&
										Z !== void 0 &&
										(we.setKeyframes(he),
										(P = getComputedStyle(we.target, we.pseudoElement)),
										P.width !== Le || P.height !== Z) &&
										((P = he[0]),
										(P.width = Le),
										(P.height = Z),
										(P = he[he.length - 1]),
										(P.width = Le),
										(P.height = Z),
										we.setKeyframes(he));
								}
							}
							v();
						},
						function (H) {
							Q.__reactViewTransition === J && (Q.__reactViewTransition = null);
							try {
								if (typeof H == "object" && H !== null)
									switch (H.name) {
										case "InvalidStateError":
											(H.message === "View transition was skipped because document visibility state is hidden." ||
												H.message === "Skipping view transition because document visibility state has become hidden." ||
												H.message === "Skipping view transition because viewport size changed." ||
												H.message === "Transition was aborted because of invalid state") &&
												(H = null);
									}
								H !== null && z(H);
							} finally {
								(s(), c(), v());
							}
						},
					),
					J.finished.finally(function () {
						for (var H = 0; H < oe.length; H++) oe[H].cancel();
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
				(r = typeof r == "number" ? { duration: r } : q({}, r)),
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
						(C = function (z) {
							(v.removeEventListener(t, r, a), typeof r == "function" ? r.call(this, z) : r.handleEvent(z));
						}),
						s !== null &&
							((c = v.removeEventListener.bind(v, t, r, a)),
							s.addEventListener("abort", c, { once: !0 }),
							(c = s.removeEventListener.bind(s, "abort", c))),
						(s = Ro(a)),
						d.push({ type: t, listener: r, optionsOrUseCapture: a, attachedListener: C, cleanup: c }),
						y(this._fragmentFiber.child, !1, ax, t, C, s));
				}
				this._eventListeners = d;
			}
		};
		function ax(t, r, a, s) {
			return (M(t).addEventListener(r, a, s), !1);
		}
		$n.prototype.removeEventListener = function (t, r, a) {
			var s = this._eventListeners;
			if (s !== null && ((r = Pp(s, t, r, a)), r !== -1)) {
				var c = s[r];
				a = c.attachedListener;
				var d = c.cleanup;
				((c = Ro(c.optionsOrUseCapture)),
					y(this._fragmentFiber.child, !1, ox, t, a, c),
					s.splice(r, 1),
					d !== null && d());
			}
		};
		function ox(t, r, a, s) {
			return (M(t).removeEventListener(r, a, s), !1);
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
			r = M(r);
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
			return t.tag === 6 ? !1 : ((t = M(t)), px(t, r));
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
				((t = M(t)), (t = Hs(t).activeElement), t !== null && y(this._fragmentFiber.child, !1, sx, t, void 0, void 0));
		};
		function sx(t, r) {
			return t.tag === 6 ? !1 : ((t = M(t)), t === r || t.contains(r) ? (r.blur(), !0) : !1);
		}
		$n.prototype.observeUsing = function (t) {
			(this._observers === null && (this._observers = new Set()),
				this._observers.add(t),
				y(this._fragmentFiber.child, !1, ux, t, void 0, void 0));
		};
		function ux(t, r) {
			return (t.tag === 6 || ((t = M(t)), r.observe(t)), !1);
		}
		$n.prototype.unobserveUsing = function (t) {
			var r = this._observers;
			if (r !== null && r.has(t)) {
				(r.delete(t), y(this._fragmentFiber.child, !1, lx, t, void 0, void 0));
				for (var a = (r = 0); a < mr.length; a++) {
					var s = mr[a];
					s.fragmentInstance === this && s.observer === t ? t.unobserve(s.instance) : (mr[r++] = s);
				}
				mr.length = r;
			}
		};
		function lx(t, r) {
			return (t.tag === 6 || ((t = M(t)), r.unobserve(t)), !1);
		}
		var mr = [],
			Uh = !1;
		function cx(t, r, a) {
			(mr.push({ fragmentInstance: t, observer: r, instance: a }),
				Uh ||
					((Uh = !0),
					bx(function () {
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
			return (y(this._fragmentFiber.child, !1, fx, t, void 0, void 0), t);
		};
		function fx(t, r) {
			if (t.tag === 6) {
				t = t.stateNode;
				var a = t.ownerDocument.createRange();
				(a.selectNodeContents(t), r.push.apply(r, a.getClientRects()));
			} else ((t = M(t)), r.push.apply(r, t.getClientRects()));
			return !1;
		}
		(($n.prototype.getRootNode = function (t) {
			var r = w(this._fragmentFiber);
			return r === null ? this : M(r).getRootNode(t);
		}),
			($n.prototype.compareDocumentPosition = function (t) {
				var r = w(this._fragmentFiber);
				if (r === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
				var a = [];
				y(this._fragmentFiber.child, !1, Lh, a, void 0, void 0);
				var s = M(r);
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
									: ((t = M(a).compareDocumentPosition(t)),
										(c =
											t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING
												? Node.DOCUMENT_POSITION_FOLLOWING
												: Node.DOCUMENT_POSITION_PRECEDING))),
						(c |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)
					);
				}
				((r = M(a[0])), (c = M(a[a.length - 1])));
				var d = E(this._fragmentFiber) ? r.parentElement : s;
				if (d == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
				((s = d.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY),
					(d = d.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_CONTAINED_BY));
				var v = r.compareDocumentPosition(t),
					C = c.compareDocumentPosition(t),
					z = v & Node.DOCUMENT_POSITION_CONTAINED_BY || C & Node.DOCUMENT_POSITION_CONTAINED_BY;
				return (
					(C = s && d && v & Node.DOCUMENT_POSITION_FOLLOWING && C & Node.DOCUMENT_POSITION_PRECEDING),
					(r =
						(s && r === t) || (d && c === t) || z || C
							? Node.DOCUMENT_POSITION_CONTAINED_BY
							: (!s && r === t) || (!d && c === t)
								? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
								: v),
					r & Node.DOCUMENT_POSITION_DISCONNECTED ||
					r & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC ||
					dx(r, this._fragmentFiber, a[0], a[a.length - 1], t)
						? r
						: Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
				);
			}));
		function dx(t, r, a, s, c) {
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
						((r = O(a, d, I)), r === null ? (r = !1) : (y(r, !0, k, d, a), (d = L), (L = null), (r = d !== null))),
					r)
				: t & Node.DOCUMENT_POSITION_FOLLOWING
					? ((r = !!d) &&
							!(r = d === s) &&
							((r = O(s, d, I)),
							r === null ? (r = !1) : (y(r, !0, N, d, s), (d = L), (A = L = null), (r = d !== null))),
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
					((t = M(s)), Hp(t, a));
					return;
				}
				if (((s = M(s)), s.nodeType !== 9)) {
					if (s.nodeType === 11) {
						((a = "host" in s ? s.host : null), a !== null && a.scrollIntoView(t));
						return;
					}
					s.scrollIntoView(t);
				}
			}
			for (s = a ? r.length - 1 : 0; s !== (a ? -1 : r.length);) {
				var c = r[s];
				(c.tag === 6 ? ((c = M(c)), Hp(c, a)) : M(c).scrollIntoView(t), (s += a ? -1 : 1));
			}
		};
		function hx(t, r) {
			return ((t = M(t)), Zp(t, r), !1);
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
							var z = mr[C];
							(z.fragmentInstance !== r || z.observer !== d || z.instance !== t) && (mr[v++] = z);
						}
						((mr.length = v), d.observe(t));
					}),
				Zp(t, r));
		}
		function mx(t, r) {
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
						typeof d.rootMargin == "string" ? cx(r, d, t) : d.unobserve(t);
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
		function gx(t, r, a, s) {
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
		function vx(t, r, a) {
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
		function yx(t, r) {
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
		function px(t, r) {
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
		function bx(t) {
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
				a.hasOwnProperty(s) && c != null && st(t, r, s, null, YT, c);
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
		var ti = ve.d;
		ve.d = { f: Sx, r: wx, D: Ex, C: _x, L: Cx, m: Tx, X: Ox, S: xx, M: Ax };
		function Sx() {
			var t = ti.f(),
				r = Kl();
			return t || r;
		}
		function wx(t) {
			var r = Qa(t);
			r !== null && r.tag === 5 && r.type === "form" ? t0(r) : ti.r(t);
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
		function Ex(t) {
			(ti.D(t), Wp("dns-prefetch", t, null));
		}
		function _x(t, r) {
			(ti.C(t, r), Wp("preconnect", t, r));
		}
		function Cx(t, r, a) {
			ti.L(t, r, a);
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
					((t = q({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : t, as: r }, a)),
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
		function Tx(t, r) {
			ti.m(t, r);
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
				if (!rr.has(d) && ((t = q({ rel: "modulepreload", href: t }, r)), rr.set(d, t), a.querySelector(c) === null)) {
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
		function xx(t, r, a) {
			ti.S(t, r, a);
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
						((t = q({ rel: "stylesheet", href: t, "data-precedence": r }, a)), (a = rr.get(d)) && Zh(t, a));
						var z = (v = s.createElement("link"));
						(Kt(z),
							un(z, "link", t),
							(z._p = new Promise(function (Q, J) {
								((z.onload = Q), (z.onerror = J));
							})),
							z.addEventListener("load", function () {
								C.loading |= 1;
							}),
							z.addEventListener("error", function () {
								C.loading |= 2;
							}),
							(C.loading |= 4),
							nc(v, r, s));
					}
					((v = { type: "stylesheet", instance: v, count: 1, state: C }), c.set(d, v));
				}
			}
		}
		function Ox(t, r) {
			ti.X(t, r);
			var a = No;
			if (a && t) {
				var s = Ya(a).hoistableScripts,
					c = Do(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Qs(c))),
					d ||
						((t = q({ src: t, async: !0 }, r)),
						(r = rr.get(c)) && Fh(t, r),
						(d = a.createElement("script")),
						Kt(d),
						un(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function Ax(t, r) {
			ti.M(t, r);
			var a = No;
			if (a && t) {
				var s = Ya(a).hoistableScripts,
					c = Do(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(Qs(c))),
					d ||
						((t = q({ src: t, async: !0, type: "module" }, r)),
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
										Rx(c, t, d, v.state))),
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
			return q({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function Rx(t, r, a, s) {
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
						var c = q({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
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
							(v._p = new Promise(function (C, z) {
								((v.onload = C), (v.onerror = z));
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
									(c = rr.get(d)) && ((s = q({}, a)), Fh(s, c)),
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
		function Nx(t, r, a) {
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
				(t = zx.bind(t)),
				r.decode().then(t, t));
		}
		function Mx(t, r, a, s) {
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
					((v._p = new Promise(function (C, z) {
						((v.onload = C), (v.onerror = z));
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
		function Dx(t, r) {
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
							0 < t.imgBytes && ic === 0 && (ic = 62500 * GT());
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
		function zx() {
			(this.imgCount--, ub(this));
		}
		var ac = null;
		function oc(t, r) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (ac = new Map()), r.forEach(Ix, t), (ac = null), Ys.call(t)));
		}
		function Ix(t, r) {
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
		var zo = { $$typeof: V, Provider: null, Consumer: null, _currentValue: Ge, _currentValue2: Ge, _threadCount: 0 };
		function kx(t, r, a, s, c, d, v, C, z) {
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
				(this.formState = z),
				(this.transitionTypes = null),
				(this.incompleteTransitions = new Map()));
		}
		function jx(t, r, a, s, c, d, v, C, z, Q, J, oe) {
			return (
				(t = new kx(t, r, a, v, z, Q, J, oe, C)),
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
		function qx(t) {
			return t ? ((t = io), t) : io;
		}
		function lb(t, r, a, s, c, d) {
			((c = qx(c)),
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
		function Lx(t, r, a, s) {
			var c = ce.T;
			ce.T = null;
			var d = ve.p;
			try {
				((ve.p = 2), Kh(t, r, a, s));
			} finally {
				((ve.p = d), (ce.T = c));
			}
		}
		function Ux(t, r, a, s) {
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
			if (Io) {
				var c = Gh(s);
				if (c === null) (Nh(t, r, s, sc, a), mb(t, s));
				else if (Bx(c, t, r, a, s)) s.stopPropagation();
				else if ((mb(t, s), r & 4 && -1 < Vx.indexOf(t))) {
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
												var z = 1 << (31 - Me(v));
												((C.entanglements[1] |= z), (v &= ~z));
											}
											(ei(d), (tt & 6) === 0 && ((Fl = tn() + 500), Bs(0, !1)));
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
			return ((t = jf(t)), Xh(t));
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
			ji = null,
			qi = null,
			Ks = new Map(),
			Gs = new Map(),
			Li = [],
			Vx =
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
					ji = null;
					break;
				case "mouseover":
				case "mouseout":
					qi = null;
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
		function Bx(t, r, a, s, c) {
			switch (r) {
				case "focusin":
					return ((ki = Xs(ki, t, r, a, s, c)), !0);
				case "dragenter":
					return ((ji = Xs(ji, t, r, a, s, c)), !0);
				case "mouseover":
					return ((qi = Xs(qi, t, r, a, s, c)), !0);
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
					((kf = s), a.target.dispatchEvent(s), (kf = null));
				} else return ((r = Qa(a)), r !== null && fb(r), (t.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function vb(t, r, a) {
			uc(t) && a.delete(r);
		}
		function Px() {
			((Jh = !1),
				ki !== null && uc(ki) && (ki = null),
				ji !== null && uc(ji) && (ji = null),
				qi !== null && uc(qi) && (qi = null),
				Ks.forEach(vb),
				Gs.forEach(vb));
		}
		function lc(t, r) {
			t.blockedOn === r &&
				((t.blockedOn = null), Jh || ((Jh = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Px)));
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
		function ko(t) {
			function r(z) {
				return lc(z, t);
			}
			(ki !== null && lc(ki, t), ji !== null && lc(ji, t), qi !== null && lc(qi, t), Ks.forEach(r), Gs.forEach(r));
			for (var a = 0; a < Li.length; a++) {
				var s = Li[a];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Li.length && ((a = Li[0]), a.blockedOn === null);) (gb(a), a.blockedOn === null && Li.shift());
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
		function $x() {
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
				for (var a = 0; a < Li.length && r !== 0 && r < Li[a].priority; a++);
				(Li.splice(a, 0, t), a === 0 && gb(t));
			}
		};
		var pb = i.version;
		if (pb !== "19.3.1") throw Error(u(527, pb, "19.3.1"));
		ve.findDOMNode = function (t) {
			var r = t._reactInternals;
			if (r === void 0)
				throw typeof t.render == "function" ? Error(u(188)) : ((t = Object.keys(t).join(",")), Error(u(268, t)));
			return ((t = p(r)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Hx = {
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
					((Oe = fc.inject(Hx)), (ze = fc));
				} catch {}
		}
		e.createRoot = function (t, r) {
			if (!l(t)) throw Error(u(299));
			var a = !1,
				s = "",
				c = yT,
				d = pT,
				v = bT;
			return (
				r != null &&
					(r.unstable_strictMode === !0 && (a = !0),
					r.identifierPrefix !== void 0 && (s = r.identifierPrefix),
					r.onUncaughtError !== void 0 && (c = r.onUncaughtError),
					r.onCaughtError !== void 0 && (d = r.onCaughtError),
					r.onRecoverableError !== void 0 && (v = r.onRecoverableError)),
				(r = jx(t, 1, !1, null, null, a, s, null, c, d, v, $x)),
				(t[ss] = r.current),
				Cp(t),
				new Wh(r)
			);
		};
	}),
	nR = sr((e, n) => {
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
	rR = nR(),
	je = Kw,
	uL = PA(),
	iR = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
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
		"Only the people added here and the organization owner can read this channel. Chitchat does not save private channels to Files.",
	aR = "Someone with no name yet";
function oE(e) {
	return e !== null && e !== "" ? e : aR;
}
function oR(e, n) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (i === null) return null;
	const o = i[1] ?? "";
	return { start: n - o.length - 1, query: o };
}
function sR(e, n, i) {
	const o = n.toLowerCase();
	return e
		.filter((u) => u.userId !== i)
		.map((u) => ({ ...u, label: oE(u.displayName) }))
		.filter((u) => u.label.toLowerCase().includes(o))
		.sort((u, l) => u.label.localeCompare(l.label));
}
function uR(e, n, i, o) {
	return { text: `${e.slice(0, n)}@${o} ${e.slice(i)}`, caret: n + o.length + 2 };
}
function lR(e, n) {
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
var cR = sr((e) => {
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
	fR = sr((e, n) => {
		n.exports = cR();
	}),
	S = fR();
function oi(e) {
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
function Pi(e) {
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
function xt(e, n, ...i) {
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
var dR = class {
	constructor(e) {
		((this._getter = e), (this._value = void 0));
	}
	get value() {
		const e = this._getter;
		return (e !== void 0 && ((this._value = e()), (this._getter = void 0)), this._value);
	}
};
function ag(e) {
	return new dR(e);
}
function hR(e) {
	return e == null;
}
function og(e) {
	const n = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, i);
}
function mR(e, n) {
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
function ci(e) {
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
function ka(e, n, i, o) {
	const u = ci(n);
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
function gR(e, n) {
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
function vR(e) {
	return JSON.stringify(e);
}
function yR(e) {
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
var pR = ag(() => {
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
var bR = new Set(["string", "number", "symbol"]);
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
function SR(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin !== void 0 && e[n]._zod.optout === "optional");
}
var hE = {
		safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
	},
	wR = {
		int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
		uint64: [BigInt(0), BigInt("18446744073709551615")],
	};
function ER(e, n) {
	const i = e._zod.def,
		o = i.checks;
	if (o && o.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	const u = {};
	return (ka(u, e, af(e, n)), Gi(e, Hn(i, { shape: u, checks: [] })));
}
function af(e, n) {
	const i = ci(e),
		o = [];
	for (const u of Reflect.ownKeys(n)) {
		if (!Object.getOwnPropertyDescriptor(i, u)?.enumerable) throw new Error(`Unrecognized key: "${String(u)}"`);
		n[u] && o.push(u);
	}
	return o;
}
function _R(e, n) {
	const i = e._zod.def,
		o = i.checks;
	if (o && o.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	const u = new Set(af(e, n)),
		l = {};
	return (
		ka(
			l,
			e,
			Reflect.ownKeys(ci(e)).filter((f) => !u.has(f)),
		),
		Gi(e, Hn(i, { shape: l, checks: [] }))
	);
}
function CR(e, n) {
	if (!mu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const o = ci(e);
		for (const u of Reflect.ownKeys(n))
			if (Object.getOwnPropertyDescriptor(o, u) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Gi(e, Hn(e._zod.def, { shape: mE(e, n) }));
}
function mE(e, n) {
	const i = {};
	return (ka(i, e, Reflect.ownKeys(ci(e))), gR(i, n), i);
}
function TR(e, n) {
	if (!mu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return Gi(e, Hn(e._zod.def, { shape: mE(e, n) }));
}
function xR(e, n) {
	if (!n?._zod?.def)
		throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	const i = {};
	return (
		ka(i, e, Reflect.ownKeys(ci(e))),
		ka(i, n, Reflect.ownKeys(ci(n))),
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
		ka(f, n, Reflect.ownKeys(ci(n)), e && ((h, m) => (l && !l.has(m) ? h : new e({ type: "optional", innerType: h })))),
		Gi(n, Hn(n._zod.def, { shape: f, checks: [] }))
	);
}
function OR(e, n, i) {
	const o = i ? new Set(af(n, i)) : void 0,
		u = {};
	return (
		ka(u, n, Reflect.ownKeys(ci(n)), (l, f) => (o && !o.has(f) ? l : new e({ type: "nonoptional", innerType: l }))),
		Gi(n, Hn(n._zod.def, { shape: u }))
	);
}
function si(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let i = n; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function AR(e, n = 0) {
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
function km(e, n, i) {
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
var RR = /[\uD800-\uDBFF]/;
function sg(e) {
	const n = e.length;
	if (!RR.test(e)) return n;
	let i = n;
	for (let o = 0; o < n - 1; o++)
		(e.charCodeAt(o) & 64512) === 55296 && (e.charCodeAt(o + 1) & 64512) === 56320 && (i--, o++);
	return i;
}
function ug(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function NR(e) {
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
function MR(e, n) {
	for (const i in n) {
		const o = Object.getOwnPropertyDescriptor(n, i);
		o.get ? Object.defineProperty(e, i, { ...o, enumerable: !1 }) : DR(e, i, o.value);
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
function DR(e, n, i) {
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
function zR(e, n) {
	const i = Object.getPrototypeOf(e);
	return n in i ? void 0 : i;
}
var lm,
	Bi = !1,
	IR = {
		configurable: !0,
		get() {
			Bi = !0;
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
				Object.defineProperty(this, n, IR);
				const u = Bi;
				Bi = !1;
				try {
					const l = i(this);
					return (
						Bi ? delete this[n] : Object.defineProperty(this, n, { configurable: !0, writable: !0, value: l }),
						(Bi = Bi || u),
						l
					);
				} catch (l) {
					throw (delete this[n], (Bi = Bi || u), l);
				}
			},
			set(u) {
				Object.defineProperty(this, n, { configurable: !0, writable: !0, value: u });
			},
		}));
}
function kR(e, n, i, o) {
	const u = zR(e, n);
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
function qR(e) {
	const n = () => e;
	return ((n[jR] = !0), n);
}
var Pb,
	cm = { value: void 0, enumerable: !1 },
	$b = "captureStackTrace" in Error ? Error : null;
function LR(e) {
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
			let M = T;
			for (; M && M !== x;) M = Object.getPrototypeOf(M);
			const L = M ?? T;
			h.has(L) || (h.add(L), MR(L, f));
		}
		const E = b.prototype;
		for (const T in E) Object.prototype.hasOwnProperty.call(E, T) && (T in y || (y[T] = E[T].bind(y)));
	}
	const g = o?.Parent ?? Object;
	class p extends g {}
	Object.defineProperty(p, "name", { value: e });
	function b(y) {
		const w = o?.Parent ? LR(p) : this;
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
function UR() {
	const e = this._zod;
	return (e.message ?? (e.message = JSON.stringify(e.def, Im, 2)), e.message);
}
function VR(e) {
	this._zod.message = e;
}
var BR = { get: UR, set: VR, enumerable: !0, configurable: !0 },
	fm = { value: void 0, enumerable: !1 },
	Hb = new WeakSet([Object.prototype, Error.prototype]),
	PR = (e, n) => {
		((e.name = "$ZodError"),
			(fm.value = n),
			Object.defineProperty(e, "issues", fm),
			(fm.value = void 0),
			Object.defineProperty(e, "message", BR));
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
	$R = se("$ZodError", PR);
function HR(e, n, i) {
	return (
		Object.prototype.hasOwnProperty.call(e, n) ||
			(n === "__proto__"
				? Object.defineProperty(e, n, { value: i(), writable: !0, enumerable: !0, configurable: !0 })
				: (e[n] = i())),
		e[n]
	);
}
function ZR(e, n = (i) => i.message) {
	const i = {},
		o = [];
	for (const u of e.issues) u.path.length > 0 ? HR(i, u.path[0], () => []).push(n(u)) : o.push(n(u));
	return { formErrors: o, fieldErrors: i };
}
function FR(e, n = (i) => i.message) {
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
	QR = Symbol.for("zod.compile.invalid"),
	YR = Symbol.for("zod.compile.fallback"),
	KR = (e, n, i) => {
		const o = e._zod.bag.validator;
		if (o !== void 0) {
			if (o(n) !== QR) return !0;
			if (o.definite === !0 && i === void 0) return !1;
		}
		return GR(e, n, i);
	};
function GR(e, n, i) {
	const o = i ? { ...i, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 },
		u = e._zod.bag.fallbackRun;
	let l;
	if (
		(u ? ((o[YR] = !0), (l = u({ value: n, issues: [] }, o))) : (l = e._zod.run({ value: n, issues: [] }, o)),
		l instanceof Promise)
	)
		throw new Da();
	return l.issues.length === 0;
}
var XR = async (e, n, i) => {
		const o = i ? { ...i, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 };
		let u = e._zod.run({ value: n, issues: [] }, o);
		return (u instanceof Promise && (u = await u), u.issues.length === 0);
	},
	JR = (e) => {
		const n = lg(e),
			i = (o, u, l, f) => {
				const h = l ? { ...l, direction: "backward" } : { direction: "backward" };
				return n(o, u, h, of(i, f));
			};
		return i;
	},
	WR = (e) => {
		const n = lg(e),
			i = (o, u, l, f) => n(o, u, l, of(i, f));
		return i;
	},
	eN = (e) => {
		const n = cg(e),
			i = async (o, u, l, f) => {
				const h = l ? { ...l, direction: "backward" } : { direction: "backward" };
				return await n(o, u, h, of(i, f));
			};
		return i;
	},
	tN = (e) => {
		const n = cg(e),
			i = async (o, u, l, f) => await n(o, u, l, of(i, f));
		return i;
	},
	nN = (e) => (n, i, o) => {
		const u = o ? { ...o, direction: "backward" } : { direction: "backward" };
		return fg(e)(n, i, u);
	},
	rN = (e) => (n, i, o) => fg(e)(n, i, o),
	iN = (e) => async (n, i, o) => {
		const u = o ? { ...o, direction: "backward" } : { direction: "backward" };
		return dg(e)(n, i, u);
	},
	aN = (e) => async (n, i, o) => dg(e)(n, i, o),
	oN = /^[cC][0-9a-z]{6,}$/,
	sN = /^[0-9a-z]+$/,
	uN = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,
	lN = /^[0-9a-vA-V]{20}$/,
	cN = /^[A-Za-z0-9]{27}$/,
	fN = /^[a-zA-Z0-9_-]{21}$/;
function dN(e) {
	return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var hN = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	mN = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Zb = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	gN = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	vN =
		"^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function yN() {
	return new RegExp(vN, "u");
}
var pN =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	bN =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	SN =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	wN =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	EN = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	_N = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/,
	CN = /^https?$/,
	TN = /^\+[1-9]\d{6,14}$/,
	SE =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function xN(e) {
	return new RegExp(`^${e}$`);
}
var ON = xN(SE);
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
function AN(e) {
	return new RegExp(`^${jm(e)}$`);
}
function RN(e) {
	const n = ["Z"];
	e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	const i = `${jm({ precision: e.precision, seconds: !0 })}(?:${n.join("|")})`,
		o = e.local ? `${i}|${jm({ precision: e.precision })}` : i;
	return new RegExp(`^${SE}T(?:${o})$`);
}
var NN = /^[\s\S]{0,}$/,
	MN = /^-?\d+(?:\.\d+)?$/,
	DN = /^[^A-Z]*$/,
	zN = /^[^a-z]*$/,
	kn = se("$ZodCheck", (e, n) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	hg = (e) => {
		const n = e.value;
		return !hR(n) && n.length !== void 0;
	},
	kc = { number: "number", bigint: "bigint", object: "date" },
	wE = se("$ZodCheckLessThan", (e, n) => {
		kn.init(e, n);
		const i = kc[typeof n.value];
		e._zod.check = (o) => {
			(n.inclusive ? o.value <= n.value : o.value < n.value) ||
				o.issues.push({
					origin: kc[typeof o.value] ?? i,
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
		kn.init(e, n);
		const i = kc[typeof n.value];
		e._zod.check = (o) => {
			(n.inclusive ? o.value >= n.value : o.value > n.value) ||
				o.issues.push({
					origin: kc[typeof o.value] ?? i,
					code: "too_small",
					minimum: typeof n.value == "object" ? n.value.getTime() : n.value,
					input: o.value,
					inclusive: n.inclusive,
					inst: e,
					continue: !n.abort,
				});
		};
	}),
	IN = se("$ZodCheckMultipleOf", (e, n) => {
		(kn.init(e, n),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint"
					? n.value !== BigInt(0) && i.value % n.value === BigInt(0)
					: mR(i.value, n.value) === 0) ||
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
		(kn.init(e, n), (n.format = n.format || "float64"));
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
	jN = se("$ZodCheckMaxLength", (e, n) => {
		var i;
		(kn.init(e, n),
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
	qN = se("$ZodCheckMinLength", (e, n) => {
		var i;
		(kn.init(e, n),
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
	LN = se("$ZodCheckLengthEquals", (e, n) => {
		var i;
		(kn.init(e, n),
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
		(kn.init(e, n),
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
	UN = se("$ZodCheckRegex", (e, n) => {
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
	VN = se("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = DN), sf.init(e, n));
	}),
	BN = se("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = zN), sf.init(e, n));
	}),
	PN = se("$ZodCheckIncludes", (e, n) => {
		kn.init(e, n);
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
	$N = se("$ZodCheckStartsWith", (e, n) => {
		kn.init(e, n);
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
	HN = se("$ZodCheckEndsWith", (e, n) => {
		kn.init(e, n);
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
	ZN = se("$ZodCheckOverwrite", (e, n) => {
		(kn.init(e, n),
			(e._zod.check = (i) => {
				i.value = n.tx(i.value);
			}));
	}),
	FN = class {
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
	QN = { major: 4, minor: 6, patch: 7 },
	It = se(
		"$ZodType",
		(e, n) => {
			var i;
			(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = QN));
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
						let p = si(h),
							b;
						for (const y of m) {
							if (y._zod.def.when) {
								if (AR(h) || !y._zod.def.when(h)) continue;
							} else if (p) continue;
							const w = h.issues.length,
								E = y._zod.check(h);
							if (E instanceof Promise && g?.async === !1) throw new Da();
							if (b || E instanceof Promise)
								b = (b ?? Promise.resolve()).then(async () => {
									(await E, h.issues.length !== w && (km(h.issues, w, e), p || (p = si(h, w))));
								});
							else {
								if (h.issues.length === w) continue;
								(km(h.issues, w, e), p || (p = si(h, w)));
							}
						}
						return b ? b.then(() => h) : h;
					},
					f = (h, m, g) => {
						if (si(h)) return ((h.aborted = !0), h);
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
async function YN(e, n) {
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
			return YN(e, n);
		},
		vendor: "zod",
		version: 1,
	};
}
var mg = se("$ZodString", (e, n) => {
		(It.init(e, n),
			(e._zod.pattern = n.pattern ?? NN),
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
	wt = se("$ZodStringFormat", (e, n) => {
		(sf.init(e, n), mg.init(e, n));
	}),
	KN = se("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = mN), wt.init(e, n));
	}),
	GN = se("$ZodUUID", (e, n) => {
		if (n.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = Zb(i));
		} else n.pattern ?? (n.pattern = Zb());
		wt.init(e, n);
	}),
	XN = se("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = gN), wt.init(e, n));
	});
function TE(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function JN(e, n) {
	return !("normalize" in n) && !("hostname" in n) && !("protocol" in n) ? TE(e) || 2 : WN(e, n);
}
function WN(e, n) {
	if (!n.normalize && n.protocol?.source === CN.source && !/^https?:\/\//i.test(e)) return 1;
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
var eM = /[\t\n\r]/g;
function Fb(e) {
	return e.replace(eM, "");
}
function tM(e, n) {
	return ((n.lastIndex = 0), n.test(e.hostname));
}
function nM(e, n) {
	return ((n.lastIndex = 0), n.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol));
}
var rM = se("$ZodURL", (e, n) => {
		(wt.init(e, n),
			(e._zod.check = (i) => {
				try {
					const o = i.value.trim(),
						u = JN(o, n);
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
						!tM(u, n.hostname) &&
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
							!nM(u, n.protocol) &&
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
	iM = se("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = yN()), wt.init(e, n));
	}),
	aM = se("$ZodNanoID", (e, n) => {
		if (n.length !== void 0 && (!Number.isInteger(n.length) || n.length < 1))
			throw new Error(`Invalid nanoid length: ${n.length}`);
		(n.pattern ?? (n.pattern = n.length === void 0 ? fN : dN(n.length)), wt.init(e, n));
	}),
	oM = se("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = oN), wt.init(e, n));
	}),
	sM = se("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = sN), wt.init(e, n));
	}),
	uM = se("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = uN), wt.init(e, n));
	}),
	lM = se("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = lN), wt.init(e, n));
	}),
	cM = se("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = cN), wt.init(e, n));
	}),
	fM = se("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = RN(n)), wt.init(e, n));
	}),
	dM = se("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = ON), wt.init(e, n));
	}),
	hM = se("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = AN(n)), wt.init(e, n));
	}),
	mM = se("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = hN), wt.init(e, n));
	}),
	gM = se("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = pN), wt.init(e, n));
	}),
	vM = /^[0-9a-fA-F:.]+$/;
function xE(e) {
	return vM.test(e) ? TE(`http://[${e}]`) : !1;
}
var yM = se("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = bN),
			wt.init(e, n),
			(e._zod.check = (i) => {
				xE(i.value) ||
					i.issues.push({ code: "invalid_format", format: "ipv6", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	pM = se("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = SN), wt.init(e, n));
	});
function bM(e) {
	const n = e.split("/");
	if (n.length !== 2) return !1;
	const [i, o] = n;
	if (!o) return !1;
	const u = Number(o);
	return `${u}` !== o || u < 0 || u > 128 ? !1 : xE(i);
}
var SM = se("$ZodCIDRv6", (e, n) => {
	(n.pattern ?? (n.pattern = wN),
		wt.init(e, n),
		(e._zod.check = (i) => {
			bM(i.value) ||
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
	wM = se("$ZodBase64", (e, n) => {
		(n.pattern ?? (n.pattern = AE),
			wt.init(e, n),
			(e._zod.check = (i) => {
				OE(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	gg = /^[A-Za-z0-9_-]*$/;
function EM(e) {
	if (!gg.test(e)) return !1;
	const n = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return OE(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var _M = se("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = gg),
			wt.init(e, n),
			(e._zod.check = (i) => {
				EM(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	CM = se("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = TN), wt.init(e, n));
	});
function TM(e, n = null) {
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
var xM = se("$ZodJWT", (e, n) => {
		(wt.init(e, n),
			(e._zod.check = (i) => {
				TM(i.value, n.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !n.abort });
			}));
	}),
	RE = se("$ZodNumber", (e, n) => {
		(It.init(e, n),
			(e._zod.pattern = MN),
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
	OM = se("$ZodNumberFormat", (e, n) => {
		(kN.init(e, n), RE.init(e, n));
	}),
	AM = se("$ZodUnknown", (e, n) => {
		(It.init(e, n), (e._zod.parse = (i) => i));
	}),
	RM = se("$ZodNever", (e, n) => {
		(It.init(e, n),
			(e._zod.parse = (i, o) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function NM(e, n) {
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
					return (g._zod.check(l), (l.issues[p].continue = !1), km(l.issues, p, e), l);
				}
		}
		return u(l, f);
	};
}
var MM = (e) => (Array.isArray(e) ? e.length : -1);
function Qb(e, n, i) {
	(e.issues.length && n.issues.push(...gE(i, e.issues)), (n.value[i] = e.value));
}
var DM = se("$ZodArray", (e, n) => {
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
				else if ((Qb(p, o, m), h && p.issues.length !== 0 && si(p))) break;
			}
			return f.length ? Promise.all(f).then(() => o) : o;
		}),
		NM(e, MM));
});
function jc(e, n, i, o, u, l) {
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
var zM = [];
function NE(e) {
	const n = Object.keys(e.shape),
		i = Object.getOwnPropertySymbols(e.shape),
		o = i.length ? i : zM,
		u = o.length ? [...n, ...o] : n;
	for (const f of u)
		if (!e.shape?.[f]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${String(f)}": expected a Zod schema`);
	const l = SR(e.shape);
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
			if (si(i, w)) break;
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
var IM = se("$ZodObject", (e, n) => {
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
						if (si(g, T)) break;
						T = g.issues.length;
					}
					if (x === "__proto__") continue;
					const M = w[x],
						L = M._zod.optin,
						A = M._zod.optout,
						k = M._zod.run({ value: b[x], issues: [] }, p);
					k instanceof Promise ? y.push(k.then((N) => jc(N, g, x, b, L, A))) : jc(k, g, x, b, L, A);
				}
				return f ? ME(y, b, g, p, u.value, e, E === !0) : y.length ? Promise.all(y).then(() => g) : g;
			}));
	}),
	kM = se("$ZodObjectJIT", (e, n) => {
		IM.init(e, n);
		const i = e._zod.parse,
			o = ag(() => NE(n)),
			u = kr.memoizer,
			l = (w) => {
				const E = o.value,
					T = E.symbolKeys,
					x = new FN(["payload", "ctx"], { shape: w, inst: e, memo: u, syms: T }),
					M = (N) => `shape[${N}]._zod.run({ value: input[${N}], issues: [] }, ctx)`,
					L = (N, I) => `
          let ${N}_ab = false;
          for (let i = 0; i < ${N}.issues.length; i++) {
            const iss = ${N}.issues[i];
            iss.path = iss.path ? [${I}, ...iss.path] : [${I}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${N}_ab = true;
          }
          if (${N}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
				x.write("const input = payload.value;");
				const A = Object.create(null);
				let k = 0;
				for (const N of E.allKeys) A[N] = `key_${k++}`;
				x.write(u ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
				for (const N of E.allKeys) {
					if (N === "__proto__") continue;
					const I = A[N],
						O = typeof N == "symbol" ? `syms[${T.indexOf(N)}]` : vR(N),
						q = `${O} in input`,
						$ = w[N],
						ne = $?._zod?.optin,
						D = ne !== void 0,
						R = $?._zod?.optout === "optional";
					if ((x.write(`const ${I} = ${M(O)};`), D && R)) {
						const B = ne === "optional" ? `${I}_present` : `${I}.value !== undefined || ${I}_present`;
						x.write(`
        const ${I}_present = ${q};
        if (!${I}.issues.length || ${I}_present) {
          if (${I}.issues.length) {${L(I, O)}
          }

          if (${B}) {
            newResult[${O}] = ${I}.value;
          }
        }

      `);
					} else
						D
							? (x.write(`
        if (${I}.issues.length) {${L(I, O)}
        }
      `),
								ne === "defaulted"
									? x.write(`newResult[${O}] = ${I}.value;`)
									: x.write(`
        if (${I}.value !== undefined || ${q}) {
          newResult[${O}] = ${I}.value;
        }
      `))
							: x.write(`
        const ${I}_present = ${q};
        if (${I}.issues.length) {${L(I, O)}
        }
        if (!${I}_present && !${I}.issues.length) {
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

        if (${I}_present) {
          newResult[${O}] = ${I}.value;
        }

      `);
				}
				return (x.write("payload.value = newResult;"), x.write("return payload;"), x.compile());
			};
		let f;
		const h = Ic,
			m = !kr.jitless,
			p = m && pR.value,
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
	const u = e.filter((l) => !si(l));
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
var jM = se("$ZodUnion", (e, n) => {
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
	qM = se("$ZodIntersection", (e, n) => {
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
		if (si(e)) return e;
		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(m.mergeErrorPath)}`);
	}
	return ((e.value = m.data), e);
}
var LM = se("$ZodEnum", (e, n) => {
		It.init(e, n);
		const i = zm(n.entries),
			o = new Set(i);
		((e._zod.values = o),
			it(e, "pattern", (u) => {
				const l = zm(u.def.entries).filter((f) => bR.has(typeof f));
				return new RegExp(l.length ? `^(${l.map((f) => Fo(f.toString())).join("|")})$` : "^[^\\s\\S]$");
			}),
			(e._zod.parse = (u, l) => {
				const f = u.value;
				return (o.has(f) || u.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), u);
			}));
	}),
	UM = se("$ZodLiteral", (e, n) => {
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
	VM = se("$ZodTransform", (e, n) => {
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
	BM = se("$ZodExactOptional", (e, n) => {
		(DE.init(e, n),
			it(e, "values", (i) => i.def.innerType._zod.values),
			it(e, "pattern", (i) => i.def.innerType._zod.pattern),
			(e._zod.parse = (i, o) => n.innerType._zod.run(i, o)));
	}),
	PM = se("$ZodNullable", (e, n) => {
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
	$M = se("$ZodDefault", (e, n) => {
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
var HM = se("$ZodPrefault", (e, n) => {
		(It.init(e, n),
			(e._zod.optin = "defaulted"),
			it(e, "values", (i) => i.def.innerType._zod.values),
			(e._zod.parse = (i, o) => (
				o.direction === "backward" || (i.value === void 0 && (i.value = n.defaultValue)),
				n.innerType._zod.run(i, o)
			)));
	}),
	ZM = se("$ZodNonOptional", (e, n) => {
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
var FM = se("$ZodCatch", (e, n) => {
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
	QM = se("$ZodPipe", (e, n) => {
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
var YM = se("$ZodReadonly", (e, n) => {
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
var KM = se("$ZodCustom", (e, n) => {
	(kn.init(e, n),
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
var GM = class extends Error {
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
	return (n.delete(e), XM(e, u));
}
function XM(e, n) {
	return (n !== xc && IE.set(e, n === ou), n);
}
function JM(e, n) {
	let i = e.buckets.get(n);
	return (i || ((i = new WeakMap()), e.buckets.set(n, i)), i);
}
var gc,
	vc = [],
	WM = {
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
							if (l.direction !== "backward" && tD(l, u.value)) throw new GM();
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
								const M = Oc(e, new Set(), !1);
								if (M === ru) return ((e._zod.parse = f), e._zod.run === h && (e._zod.run = f), f(m, g));
								M === ou || o ? (i = !0) : (o = !0);
							}
							const p = m.value;
							if (!zE(p)) return f(m, g);
							let b = g[Lm];
							b || ((b = { buckets: new WeakMap(), backEdges: void 0 }), (g[Lm] = b));
							let y;
							u === g ? (y = l) : ((y = JM(b, e)), (u = g), (l = y));
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
								? T.then((M) => (x && (x.issues = M.issues.length ? dm(M.issues) : nS), M))
								: (x && (x.issues = T.issues.length ? dm(T.issues) : nS), T);
						};
					((e._zod.parse = h), e._zod.run === f && (e._zod.run = h));
				}));
		},
	};
function eD() {
	return WM;
}
function tD(e, n) {
	const i = e[Lm]?.backEdges;
	return i !== void 0 && zE(n) && i.has(n);
}
var nD = () => {
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
				return `Invalid input: expected ${u(l.expected)}, received ${u(NR(l.input), l.input)}`;
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
function rD() {
	return { localeError: nD() };
}
var rS,
	iD = class {
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
function aD() {
	return new iD();
}
(rS = globalThis).__zod_globalRegistry ?? (rS.__zod_globalRegistry = aD());
var iu = globalThis.__zod_globalRegistry;
function kE(e) {
	return (e.checks && (e.checks = [...e.checks]), e);
}
function oD(e, n) {
	return new e(kE({ type: "string", ...De(n) }));
}
function sD(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...De(n) });
}
function uD(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...De(n) });
}
function lD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...De(n) });
}
function cD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...De(n) });
}
function fD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...De(n) });
}
function dD(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...De(n) });
}
function hD(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...De(n) });
}
function mD(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...De(n) });
}
function gD(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...De(n) });
}
function vD(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...De(n) });
}
function yD(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...De(n) });
}
function pD(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...De(n) });
}
function bD(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...De(n) });
}
function SD(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...De(n) });
}
function wD(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...De(n) });
}
function ED(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...De(n) });
}
function _D(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...De(n) });
}
function CD(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...De(n) });
}
function TD(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...De(n) });
}
function xD(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...De(n) });
}
function OD(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...De(n) });
}
function AD(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...De(n) });
}
function RD(e, n) {
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
function ND(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...De(n) });
}
function MD(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...De(n) });
}
function DD(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...De(n) });
}
function zD(e, n) {
	return new e(kE({ type: "number", checks: [], ...De(n) }));
}
function ID(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...De(n) });
}
function kD(e) {
	return new e({ type: "unknown" });
}
function jD(e, n) {
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
	return new IN({ check: "multiple_of", ...De(n), value: e });
}
function jE(e, n) {
	return new jN({ check: "max_length", ...De(n), maximum: e });
}
function qc(e, n) {
	return new qN({ check: "min_length", ...De(n), minimum: e });
}
function qE(e, n) {
	return new LN({ check: "length_equals", ...De(n), length: e });
}
function qD(e, n) {
	return new UN({ check: "string_format", format: "regex", ...De(n), pattern: e });
}
function LD(e) {
	return new VN({ check: "string_format", format: "lowercase", ...De(e) });
}
function UD(e) {
	return new BN({ check: "string_format", format: "uppercase", ...De(e) });
}
function VD(e, n) {
	return new PN({ check: "string_format", format: "includes", ...De(n), includes: e });
}
function BD(e, n) {
	return new $N({ check: "string_format", format: "starts_with", ...De(n), prefix: e });
}
function PD(e, n) {
	return new HN({ check: "string_format", format: "ends_with", ...De(n), suffix: e });
}
function ts(e) {
	return new ZN({ check: "overwrite", tx: e });
}
function $D(e) {
	return ts((n) => n.normalize(e));
}
function HD() {
	return ts((e) => e.trim());
}
function ZD() {
	return ts((e) => e.toLowerCase());
}
function FD() {
	return ts((e) => e.toUpperCase());
}
function QD() {
	return ts((e) => yR(e));
}
function YD(e, n, i) {
	return new e({ type: "array", element: n, ...De(i) });
}
function KD(e, n, i) {
	return new e({ type: "custom", check: "custom", fn: n, ...De(i) });
}
function GD(e, n) {
	const i = XD(
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
function XD(e, n) {
	const i = new kn({ check: "custom", ...De(n) });
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
function JD(e) {
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
			for (const m of e.intersections) for (const g of h.get(m) ?? []) JD(g);
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
var WD =
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
	ez = {
		greater_than: (e, n) => Qo(e, n.inclusive ? "minimum" : "exclusiveMinimum", n.value),
		less_than: (e, n) => Yo(e, n.inclusive ? "maximum" : "exclusiveMaximum", n.value),
		multiple_of: (e, n) => $E(e, n.value),
		number_format: hS(hE),
		bigint_format: hS(wR),
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
function zr(e) {
	const n = {},
		i = e._zod.def,
		o = e._zod.traits.has("$ZodCheck") ? [e, ...(i.checks ?? [])] : (i.checks ?? []);
	for (const l of o) ez[l._zod.def.check]?.(n, l._zod.def);
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
var tz = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	nz = new Map([
		[AE, EN],
		[gg, _N],
	]),
	rz = (e) => nz.get(e) ?? e,
	iz = (e, n, i, o) => {
		const u = i;
		u.type = "string";
		const { minimum: l, maximum: f, format: h, patterns: m, contentEncoding: g, laxFormat: p } = zr(e);
		if (
			(typeof l == "number" && (u.minLength = l),
			typeof f == "number" && (u.maxLength = f),
			h && ((u.format = tz[h] ?? h), u.format === "" && delete u.format, (h === "time" || p) && delete u.format),
			g && (u.contentEncoding = g),
			m && m.size > 0)
		) {
			const b = [...m].map(rz);
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
	az = (e, n, i, o) => {
		const u = i,
			{ minimum: l, maximum: f, multipleOf: h, exclusiveMaximum: m, exclusiveMinimum: g, isInt: p } = zr(e);
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
			for (const M of h)
				Number.isFinite(M) && M !== 0
					? E.add(Math.abs(M))
					: Fi(e, n, u, o, `A multipleOf divisor of ${M} cannot be represented in JSON Schema`);
			const [T, ...x] = E;
			(T !== void 0 && (u.multipleOf = T),
				x.length && (u.allOf = [...(u.allOf ?? []), ...x.map((M) => ({ multipleOf: M }))]));
		}
	},
	oz = (e, n, i, o) => {
		i.not = {};
	},
	sz = (e, n, i, o) => {},
	uz = (e, n, i, o) => {
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
	lz = (e, n, i, o) => {
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
	cz = (e, n, i, o) => {
		Fi(e, n, i, o, "Custom types cannot be represented in JSON Schema");
	},
	fz = (e, n, i, o) => {
		Fi(e, n, i, o, "Transforms cannot be represented in JSON Schema");
	},
	dz = (e, n, i, o) => {
		const u = i,
			l = e._zod.def,
			{ minimum: f, maximum: h } = zr(e);
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
var hz = (e, n, i, o) => {
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
	mz = (e, n, i, o) => {
		const u = e._zod.def,
			l = u.inclusive === !1,
			f = u.options.map((h, m) => fn(h, n, { ...o, path: [...o.path, l ? "oneOf" : "anyOf", m] }));
		l ? (i.oneOf = f) : (i.anyOf = f);
	},
	gz = (e, n, i, o) => {
		const u = e._zod.def,
			l = fn(u.left, n, { ...o, path: [...o.path, "allOf", 0] }),
			f = fn(u.right, n, { ...o, path: [...o.path, "allOf", 1] }),
			h = (g) => "allOf" in g && Object.keys(g).length === 1,
			m = [...(h(l) ? l.allOf : [l]), ...(h(f) ? f.allOf : [f])];
		((i.allOf = m), n.intersections.push(m));
	},
	vz = (e, n, i, o) => {
		const u = e._zod.def,
			l = fn(u.innerType, n, o),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = u.innerType), (i.nullable = !0)) : (i.anyOf = [l, { type: "null" }]);
	},
	yz = (e, n, i, o) => {
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
var pz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		l.ref = u.innerType;
		const f = QE(u.defaultValue, e, n, i, o);
		f !== vg && (i.default = f);
	},
	bz = (e, n, i, o) => {
		const u = e._zod.def;
		fn(u.innerType, n, o);
		const l = n.seen.get(e);
		if (((l.ref = u.innerType), n.io !== "input")) return;
		const f = QE(u.defaultValue, e, n, i, o);
		f !== vg && (i._prefault = f);
	},
	Sz = (e, n, i, o) => {
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
	wz = (e, n, i, o) => {
		const u = e._zod.def,
			l = u.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (l ? u.out : u.in) : u.out;
		fn(f, n, o);
		const h = n.seen.get(e);
		h.ref = f;
	},
	Ez = (e, n, i, o) => {
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
var _z = (e, n) => {
		($R.init(e, n), (e.name = "ZodError"));
		const i = Object.getPrototypeOf(e);
		mS.has(i) ||
			(mS.add(i),
			yc(i, "format", (o) => (u) => FR(o, u)),
			yc(i, "flatten", (o) => (u) => ZR(o, u)),
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
	ur = se("ZodError", _z, void 0, { Parent: Error }),
	Cz = lg(ur),
	Tz = cg(ur),
	xz = fg(ur),
	Oz = dg(ur),
	Az = JR(ur),
	Rz = WR(ur),
	Nz = eN(ur),
	Mz = tN(ur),
	Dz = nN(ur),
	zz = rN(ur),
	Iz = iN(ur),
	kz = aN(ur);
function jz() {
	kr.localeError || Xi(rD());
}
function yg() {
	kr.memoizer || Xi({ memoizer: eD() });
}
var kt = se("ZodType", (e, n) => (jz(), It.init(e, n), (e.def = n), (e.type = n.type), e), {
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
			return this.check(j2(e, n));
		},
		overwrite(e) {
			return this.check(ts(e));
		},
		optional() {
			return pS(this);
		},
		exactOptional() {
			return E2(this);
		},
		nullable() {
			return bS(this);
		},
		nullish() {
			return pS(bS(this));
		},
		nonoptional(e) {
			return A2(this, e);
		},
		array() {
			return d2(this);
		},
		or(e) {
			return g2([this, e]);
		},
		and(e) {
			return y2(this, e);
		},
		transform(e) {
			return SS(this, w2(e));
		},
		default(e) {
			return T2(this, e);
		},
		prefault(e) {
			return O2(this, e);
		},
		catch(e) {
			return N2(this, e);
		},
		pipe(e) {
			return SS(this, e);
		},
		readonly() {
			return z2(this);
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
			return Cz(this, n, i, { callee: e });
		},
		parseAsync: async function e(n, i) {
			return await Tz(this, n, i, { callee: e });
		},
		safeParse(e, n) {
			return xz(this, e, n);
		},
		async safeParseAsync(e, n) {
			return Oz(this, e, n);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			Zi(this, "spa", e);
		},
		validate(e, n) {
			return KR(this, e, n);
		},
		validateAsync(e, n) {
			return XR(this, e, n);
		},
		encode: function e(n, i) {
			return Az(this, n, i, { callee: e });
		},
		decode: function e(n, i) {
			return Rz(this, n, i, { callee: e });
		},
		encodeAsync: async function e(n, i) {
			return await Nz(this, n, i, { callee: e });
		},
		decodeAsync: async function e(n, i) {
			return await Mz(this, n, i, { callee: e });
		},
		safeEncode(e, n) {
			return Dz(this, e, n);
		},
		safeDecode(e, n) {
			return zz(this, e, n);
		},
		async safeEncodeAsync(e, n) {
			return Iz(this, e, n);
		},
		async safeDecodeAsync(e, n) {
			return kz(this, e, n);
		},
		toJSONSchema(e) {
			return WD(this, {})(e);
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
			(mg.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => iz(e, i, o, u)));
		},
		yE(
			{
				format: (e) => zr(e).format ?? null,
				minLength: (e) => zr(e).minimum ?? null,
				maxLength: (e) => zr(e).maximum ?? null,
			},
			{
				regex(...e) {
					return this.check(qD(...e));
				},
				includes(...e) {
					return this.check(VD(...e));
				},
				startsWith(...e) {
					return this.check(BD(...e));
				},
				endsWith(...e) {
					return this.check(PD(...e));
				},
				min(...e) {
					return this.check(qc(...e));
				},
				max(...e) {
					return this.check(jE(...e));
				},
				length(...e) {
					return this.check(qE(...e));
				},
				nonempty(...e) {
					return this.check(qc(1, ...e));
				},
				lowercase(e) {
					return this.check(LD(e));
				},
				uppercase(e) {
					return this.check(UD(e));
				},
				trim() {
					return this.check(HD());
				},
				normalize(...e) {
					return this.check($D(...e));
				},
				toLowerCase() {
					return this.check(ZD());
				},
				toUpperCase() {
					return this.check(FD());
				},
				slugify() {
					return this.check(QD());
				},
			},
		),
	),
	qz = se(
		"ZodString",
		(e, n) => {
			(mg.init(e, n), KE.init(e, n));
		},
		{
			email(e) {
				return this.check(sD($z, e));
			},
			url(e) {
				return this.check(hD(Zz, e));
			},
			jwt(e) {
				return this.check(AD(o2, e));
			},
			emoji(e) {
				return this.check(mD(Fz, e));
			},
			guid(e) {
				return this.check(uD(Hz, e));
			},
			uuid(e) {
				return this.check(lD(pc, e));
			},
			uuidv4(e) {
				return this.check(cD(pc, e));
			},
			uuidv6(e) {
				return this.check(fD(pc, e));
			},
			uuidv7(e) {
				return this.check(dD(pc, e));
			},
			nanoid(e) {
				return this.check(gD(Qz, e));
			},
			cuid(e) {
				return this.check(vD(Yz, e));
			},
			cuid2(e) {
				return this.check(yD(Kz, e));
			},
			ulid(e) {
				return this.check(pD(Gz, e));
			},
			base64(e) {
				return this.check(TD(r2, e));
			},
			base64url(e) {
				return this.check(xD(i2, e));
			},
			xid(e) {
				return this.check(bD(Xz, e));
			},
			ksuid(e) {
				return this.check(SD(Jz, e));
			},
			ipv4(e) {
				return this.check(wD(Wz, e));
			},
			ipv6(e) {
				return this.check(ED(e2, e));
			},
			cidrv4(e) {
				return this.check(_D(t2, e));
			},
			cidrv6(e) {
				return this.check(CD(n2, e));
			},
			e164(e) {
				return this.check(OD(a2, e));
			},
			datetime(e) {
				return this.check(RD(Uz, e));
			},
			date(e) {
				return this.check(ND(Vz, e));
			},
			time(e) {
				return this.check(MD(Bz, e));
			},
			duration(e) {
				return this.check(DD(Pz, e));
			},
		},
	);
function Lz(e) {
	return oD(qz, e);
}
var Ot = se("ZodStringFormat", (e, n) => {
		(wt.init(e, n), KE.init(e, n));
	}),
	Uz = se("ZodISODateTime", (e, n) => {
		(fM.init(e, n), Ot.init(e, n));
	}),
	Vz = se("ZodISODate", (e, n) => {
		(dM.init(e, n), Ot.init(e, n));
	}),
	Bz = se("ZodISOTime", (e, n) => {
		(hM.init(e, n), Ot.init(e, n));
	}),
	Pz = se("ZodISODuration", (e, n) => {
		(mM.init(e, n), Ot.init(e, n));
	}),
	$z = se("ZodEmail", (e, n) => {
		(XN.init(e, n), Ot.init(e, n));
	}),
	Hz = se("ZodGUID", (e, n) => {
		(KN.init(e, n), Ot.init(e, n));
	}),
	pc = se("ZodUUID", (e, n) => {
		(GN.init(e, n), Ot.init(e, n));
	}),
	Zz = se("ZodURL", (e, n) => {
		(rM.init(e, n), Ot.init(e, n));
	}),
	Fz = se("ZodEmoji", (e, n) => {
		(iM.init(e, n), Ot.init(e, n));
	}),
	Qz = se("ZodNanoID", (e, n) => {
		(aM.init(e, n), Ot.init(e, n));
	}),
	Yz = se("ZodCUID", (e, n) => {
		(oM.init(e, n), Ot.init(e, n));
	}),
	Kz = se("ZodCUID2", (e, n) => {
		(sM.init(e, n), Ot.init(e, n));
	}),
	Gz = se("ZodULID", (e, n) => {
		(uM.init(e, n), Ot.init(e, n));
	}),
	Xz = se("ZodXID", (e, n) => {
		(lM.init(e, n), Ot.init(e, n));
	}),
	Jz = se("ZodKSUID", (e, n) => {
		(cM.init(e, n), Ot.init(e, n));
	}),
	Wz = se("ZodIPv4", (e, n) => {
		(gM.init(e, n), Ot.init(e, n));
	}),
	e2 = se("ZodIPv6", (e, n) => {
		(yM.init(e, n), Ot.init(e, n));
	}),
	t2 = se("ZodCIDRv4", (e, n) => {
		(pM.init(e, n), Ot.init(e, n));
	}),
	n2 = se("ZodCIDRv6", (e, n) => {
		(SM.init(e, n), Ot.init(e, n));
	}),
	r2 = se("ZodBase64", (e, n) => {
		(wM.init(e, n), Ot.init(e, n));
	}),
	i2 = se("ZodBase64URL", (e, n) => {
		(_M.init(e, n), Ot.init(e, n));
	}),
	a2 = se("ZodE164", (e, n) => {
		(CM.init(e, n), Ot.init(e, n));
	}),
	o2 = se("ZodJWT", (e, n) => {
		(xM.init(e, n), Ot.init(e, n));
	}),
	GE = se(
		"ZodNumber",
		(e, n) => {
			(RE.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => az(e, i, o, u)), (e.isFinite = !0));
		},
		yE(
			{
				minValue: (e) => {
					const { minimum: n, exclusiveMinimum: i } = zr(e);
					return Math.max(n ?? Number.NEGATIVE_INFINITY, i ?? Number.NEGATIVE_INFINITY);
				},
				maxValue: (e) => {
					const { maximum: n, exclusiveMaximum: i } = zr(e);
					return Math.min(n ?? Number.POSITIVE_INFINITY, i ?? Number.POSITIVE_INFINITY);
				},
				isInt: (e) => {
					const { isInt: n, multipleOf: i } = zr(e);
					return !!n || !!i?.some(Number.isSafeInteger);
				},
				format: (e) => zr(e).format ?? null,
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
	return zD(GE, e);
}
var s2 = se("ZodNumberFormat", (e, n) => {
	(OM.init(e, n), GE.init(e, n));
});
function gS(e) {
	return ID(s2, e);
}
var u2 = se("ZodUnknown", (e, n) => {
	(AM.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => sz(e, i, o, u)));
});
function vS() {
	return kD(u2);
}
var l2 = se("ZodNever", (e, n) => {
	(RM.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => oz(e, i, o, u)));
});
function c2(e) {
	return jD(l2, e);
}
var f2 = se(
	"ZodArray",
	(e, n) => {
		(yg(),
			DM.init(e, n),
			kt.init(e, n),
			(e._zod.processJSONSchema = (i, o, u) => dz(e, i, o, u)),
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
			return this.check(jE(e, n));
		},
		length(e, n) {
			return this.check(qE(e, n));
		},
		unwrap() {
			return this.element;
		},
	},
);
function d2(e, n) {
	return YD(f2, e, n);
}
var h2 = se(
	"ZodObject",
	(e, n) => {
		(yg(),
			kM.init(e, n),
			kt.init(e, n),
			(e._zod.processJSONSchema = (i, o, u) => hz(e, i, o, u)),
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
			return this.clone(Hn(this._zod.def, { catchall: c2() }));
		},
		strip() {
			return this.clone(Hn(this._zod.def, { catchall: void 0 }));
		},
		extend(e) {
			return CR(this, e);
		},
		safeExtend(e) {
			return TR(this, e);
		},
		merge(e) {
			return xR(this, e);
		},
		pick(e) {
			return ER(this, e);
		},
		omit(e) {
			return _R(this, e);
		},
		partial(...e) {
			return Vb(JE, this, e[0]);
		},
		exactPartial(...e) {
			return Vb(WE, this, e[0], "exactPartial");
		},
		required(...e) {
			return OR(e_, this, e[0]);
		},
	},
);
function yS(e, n) {
	const i = { type: "object", shape: e ?? {}, ...De(n) };
	return new h2(i);
}
var m2 = se("ZodUnion", (e, n) => {
	(jM.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => mz(e, i, o, u)), (e.options = n.options));
});
function g2(e, n) {
	return new m2({ type: "union", options: e, ...De(n) });
}
var v2 = se("ZodIntersection", (e, n) => {
	(qM.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => gz(e, i, o, u)));
});
function y2(e, n) {
	return new v2({ type: "intersection", left: e, right: n });
}
var Bm = se("ZodEnum", (e, n) => {
	(LM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (o, u, l) => uz(e, o, u, l)),
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
var p2 = se("ZodLiteral", (e, n) => {
	(UM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => lz(e, i, o, u)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function b2(e, n) {
	return new p2({ type: "literal", values: Array.isArray(e) ? e : [e], ...De(n) });
}
var S2 = se("ZodTransform", (e, n) => {
	(yg(),
		VM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => fz(e, i, o, u)),
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
function w2(e) {
	return new S2({ type: "transform", transform: e });
}
var JE = se("ZodOptional", (e, n) => {
	(DE.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => YE(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function pS(e) {
	return new JE({ type: "optional", innerType: e });
}
var WE = se("ZodExactOptional", (e, n) => {
	(BM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => YE(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function E2(e) {
	return new WE({ type: "optional", innerType: e });
}
var _2 = se("ZodNullable", (e, n) => {
	(PM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => vz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function bS(e) {
	return new _2({ type: "nullable", innerType: e });
}
var C2 = se("ZodDefault", (e, n) => {
	($M.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => pz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function T2(e, n) {
	return new C2({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : fE(n);
		},
	});
}
var x2 = se("ZodPrefault", (e, n) => {
	(HM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => bz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function O2(e, n) {
	return new x2({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : fE(n);
		},
	});
}
var e_ = se("ZodNonOptional", (e, n) => {
	(ZM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => yz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function A2(e, n) {
	return new e_({ type: "nonoptional", innerType: e, ...De(n) });
}
var R2 = se("ZodCatch", (e, n) => {
	(FM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => Sz(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function N2(e, n) {
	return new R2({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : qR(n) });
}
var M2 = se("ZodPipe", (e, n) => {
	(QM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => wz(e, i, o, u)),
		(e.in = n.in),
		(e.out = n.out));
});
function SS(e, n) {
	return new M2({ type: "pipe", in: e, out: n });
}
var D2 = se("ZodReadonly", (e, n) => {
	(YM.init(e, n),
		kt.init(e, n),
		(e._zod.processJSONSchema = (i, o, u) => Ez(e, i, o, u)),
		(e.unwrap = () => e._zod.def.innerType));
});
function z2(e) {
	return new D2({ type: "readonly", innerType: e });
}
var I2 = se("ZodCustom", (e, n) => {
	(KM.init(e, n), kt.init(e, n), (e._zod.processJSONSchema = (i, o, u) => cz(e, i, o, u)));
});
function k2(e, n = {}) {
	return KD(I2, e, n);
}
function j2(e, n) {
	return GD(e, n);
}
var q2 = "Getting the member list ready… Chitchat will open by itself.";
function L2(e) {
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
	function w(M) {
		if (!p) {
			i = { ...i, ...M };
			for (const L of o) L();
		}
	}
	function E(M) {
		((b = M),
			M && performance.now() < i.deadline
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
	function x(M) {
		return !M.forceRefreshToken && u && performance.now() < i.deadline
			? Promise.resolve(u)
			: l ||
					(w({ refreshing: !0 }),
					(l = (async () => {
						const L = performance.now();
						f = new AbortController();
						const A = setTimeout(() => f?.abort(), 25e3);
						let k = null;
						try {
							const N = await e.getToken(),
								I = "https://exuberant-hippopotamus-790.convex.site/auth/lease",
								O = {
									method: "POST",
									redirect: "error",
									headers: { "Content-Type": "application/json" },
									signal: f.signal,
								};
							let q = await fetch(I, { ...O, body: JSON.stringify({ pressToken: N }) });
							if (q.status === 401) {
								const B = await e.refreshToken();
								q = await fetch(I, { ...O, body: JSON.stringify({ pressToken: B }) });
							}
							const $ = await q.json(),
								ne = yS({ jwt: Lz(), expiresAt: gm(), validForMs: gm().min(0).max(3e4) }).safeParse($),
								D = yS({ code: b2("syncing"), phase: XE(["members", "events"]), retryAfterMs: gm() }).safeParse($);
							if (
								((y = q.status === 503 && D.success ? (y ?? performance.now()) : null),
								D.success && y !== null && performance.now() - y < 12e4)
							)
								throw (
									(k = Math.min(3e4, Math.max(1e3, D.data.retryAfterMs))),
									w({ phase: "syncing", message: q2 }),
									new Error("Chitchat access is syncing")
								);
							if (!q.ok || !ne.success) {
								const B = q.status === 401 || q.status === 403;
								throw (
									w({
										phase: B ? "denied" : "unavailable",
										message: B
											? "Bonobo Senate no longer allows this Chitchat session."
											: "Chitchat is reconnecting. Your draft is kept.",
									}),
									new Error("Chitchat lease was refused")
								);
							}
							const R = L + ne.data.validForMs;
							if (R <= performance.now()) throw new Error("Chitchat lease expired in transit");
							return (
								(u = ne.data.jwt),
								(g = 0),
								h && clearTimeout(h),
								(h = setTimeout(
									() => {
										((u = null),
											w({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
											l || ((b = !1), n.clearAuth(), T()));
									},
									Math.max(0, R - performance.now()),
								)),
								w({ phase: b ? "ready" : "connecting", deadline: R, message: null }),
								u
							);
						} catch {
							return (
								(u = null),
								k !== null
									? ((m = setTimeout(T, Math.min(3e4, k * 2 ** Math.min(g, 4)))), (g += 1), null)
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
		subscribe: (M) => (
			o.add(M),
			() => {
				o.delete(M);
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
function U2(e) {
	const [n] = (0, _.useState)(() => L2(e.client));
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
		i = jA(),
		o = n.phase === "ready" && performance.now() < n.deadline,
		u = Po(je.sessions.current, o ? {} : "skip"),
		l = Po(je.sessions.status, o ? {} : "skip"),
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
		i = oi(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		o = xt(n, je.members.list, { paginationOpts: { numItems: 100, cursor: i.cursor } });
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
			(0, S.jsx)(Pi, { page: i, result: o, label: "People" }),
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
		h = xt(i, je.channels.permissions, e.channel ? { channelId: e.channel._id } : "skip"),
		[m, g] = (0, _.useState)(e.channel?.name ?? ""),
		[p, b] = (0, _.useState)(e.channel?.topic ?? ""),
		[y, w] = (0, _.useState)(!1),
		[E, T] = (0, _.useState)([]),
		[x, M] = (0, _.useState)(null),
		[L, A] = (0, _.useState)(!1),
		[k, N] = (0, _.useState)(null),
		I = L || x !== null,
		O = async () => {
			if (L) return;
			if (!i.can_request_now()) {
				N("Reconnect before saving. Your changes are kept.");
				return;
			}
			if (m.trim().length === 0 || m.trim().length > 64 || p.trim().length > 250) {
				N("Use a name of 1–64 characters and a topic of at most 250 characters.");
				return;
			}
			const q =
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
			(M(q), A(!0), N(null));
			try {
				const $ =
					q.kind === "create"
						? await n.mutation(je.channels.create, q.args)
						: await n.mutation(je.channels.update, q.args);
				if ($._nay) {
					(M(null), N($._nay.message));
					return;
				}
				$._yay.kind === "channel" && e.onSaved($._yay.channelId);
			} catch {
				N("The save may have reached Chitchat. Retry to check the same request.");
			} finally {
				A(!1);
			}
		};
	return (0, S.jsxs)(Wo, {
		labelledBy: o,
		accessUnavailable: !i.refreshing && (!i.ready || (e.channel !== null && h === null)),
		onReconnect: i.retry,
		onClose: () => {
			L || e.onClose();
		},
		children: [
			(0, S.jsx)("h2", {
				id: o,
				className: "dialog-title",
				children: e.channel ? `Rename #${e.channel.name}` : "Create channel",
			}),
			(0, S.jsxs)("form", {
				onSubmit: (q) => {
					(q.preventDefault(), O());
				},
				onKeyDown: (q) => {
					q.key === "Enter" && q.nativeEvent.isComposing && q.preventDefault();
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
								disabled: I,
								"aria-describedby": k ? f : void 0,
								onInput: (q) => g(q.currentTarget.value),
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
								disabled: I,
								onInput: (q) => b(q.currentTarget.value),
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
												disabled: I,
												onChange: (q) => w(q.currentTarget.checked),
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
														disabled: I,
														onToggle: (q, $) => T((ne) => ($ ? [...ne, q] : ne.filter((D) => D !== q))),
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
					k ? (0, S.jsx)("p", { id: f, className: "form-error", role: "alert", children: k }) : null,
					(0, S.jsxs)("div", {
						className: "dialog-actions",
						children: [
							(0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: L,
								onClick: e.onClose,
								children: x ? "Stop checking" : "Cancel",
							}),
							(0, S.jsx)("button", {
								type: "submit",
								className: "button button-primary",
								disabled: L || !(x ? i.connected : i.canSend),
								children: L ? "Saving…" : x ? "Retry" : e.channel ? "Rename" : "Create",
							}),
						],
					}),
				],
			}),
		],
	});
}
function V2(e) {
	const n = Ba(),
		i = vr(),
		o = (0, _.useId)(),
		[u, l] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, g] = (0, _.useState)(null),
		p = xt(i, je.channels.get, { channelId: e.channelId }),
		b = xt(i, je.channels.list_members, { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } }),
		y = xt(i, je.channels.permissions, { channelId: e.channelId }),
		w = xt(i, je.members.resolve, b ? { userIds: b.page.map((x) => x.hostUserId) } : "skip"),
		E = async (x) => {
			if (!f) {
				if (!i.can_request_now()) {
					g("Reconnect before changing channel access.");
					return;
				}
				(l(x), h(!0), g(null));
				try {
					const M = await n.mutation(je.channel_members.change, x);
					(l(null), M._nay && g(M._nay.message));
				} catch {
					g("This change may have reached Chitchat. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		T = (x, M) => {
			b &&
				E({
					channelId: e.channelId,
					clientRequestId: crypto.randomUUID(),
					expectedMembershipRevision: b.membershipRevision,
					expectedPrincipalCount: b.memberCount,
					hostUserId: x,
					level: M,
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
			b
				? (0, S.jsx)("ul", {
						className: "people-list current-people",
						"aria-label": "People in this channel",
						children: b.page.map((x) =>
							(0, S.jsxs)(
								"li",
								{
									className: "people-item",
									children: [
										(0, S.jsxs)("span", {
											children: [
												w?.[x.hostUserId] ?? "Unnamed member",
												x.level === "manage" ? " (can add people)" : x.level === "read" ? " (can read)" : "",
											],
										}),
										y?.canManage && x.hostUserId !== e.selfUserId
											? (0, S.jsxs)(S.Fragment, {
													children: [
														(0, S.jsxs)("select", {
															"aria-label": `Access for ${w?.[x.hostUserId] ?? "member"}`,
															value: x.level,
															disabled: f || u !== null,
															onChange: (M) => {
																const L = M.currentTarget.value;
																(L === "read" || L === "write" || L === "manage") && T(x.hostUserId, L);
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
															onClick: () => T(x.hostUserId, null),
															children: "Remove",
														}),
													],
												})
											: null,
									],
								},
								x.hostUserId,
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
								selected: b.page.map((x) => x.hostUserId),
								disabled: f || u !== null,
								onToggle: (x, M) => T(x, M ? "write" : null),
							}),
						],
					})
				: null,
			m ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					u
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !i.canSend,
								onClick: () => void E(u),
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
function B2(e) {
	const n = Ba(),
		i = vr(),
		o = (0, _.useId)(),
		[u] = (0, _.useState)(() => crypto.randomUUID()),
		[l, f] = (0, _.useState)(!1),
		[h, m] = (0, _.useState)(!1),
		[g, p] = (0, _.useState)(null),
		b = xt(i, je.channels.permissions, { channelId: e.channel._id }),
		y =
			e.action === "archive"
				? "Archive"
				: e.action === "unarchive"
					? "Unarchive"
					: e.action === "leave"
						? "Leave"
						: "Delete",
		w = async () => {
			if (!l) {
				if (!i.can_request_now()) {
					p("Reconnect before changing this channel.");
					return;
				}
				(f(!0), m(!0), p(null));
				try {
					const T =
						e.action === "archive" || e.action === "unarchive"
							? await n.mutation(je.channels.archive, {
									channelId: e.channel._id,
									clientRequestId: u,
									expectedRevision: e.channel.revision,
									archived: e.action === "archive",
								})
							: e.action === "leave"
								? await n.mutation(je.channel_members.leave, {
										channelId: e.channel._id,
										clientRequestId: u,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									})
								: await n.mutation(je.channel_members.delete_channel, {
										channelId: e.channel._id,
										clientRequestId: u,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									});
					if (T._nay) {
						(m(!1), p(T._nay.message));
						return;
					}
					e.onDone();
				} catch {
					p("This change may have reached Chitchat. Retry to check the same request.");
				} finally {
					f(!1);
				}
			}
		},
		E = e.action === "delete" || (e.action === "leave" && e.channel.memberCount === 1);
	return (0, S.jsxs)(Wo, {
		labelledBy: o,
		accessUnavailable: !i.refreshing && (!i.ready || b === null),
		onReconnect: i.retry,
		onClose: () => {
			l || e.onClose();
		},
		children: [
			(0, S.jsxs)("h2", {
				id: o,
				className: "dialog-title",
				children: [y, " #", e.channel.name, e.action === "delete" ? " for everyone" : "", "?"],
			}),
			(0, S.jsx)("p", {
				children:
					e.action === "archive"
						? "The channel is hidden from the active list. Its messages stay stored and it can be unarchived any time."
						: e.action === "unarchive"
							? "The channel returns to the active list."
							: E
								? `This deletes the channel for all ${e.channel.memberCount} people in it. Nobody can open it again. This cannot be undone.`
								: "You stop seeing this channel and its messages. Other people keep it. Somebody who can add people has to add you back.",
			}),
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
						children: "Cancel",
					}),
					(0, S.jsx)("button", {
						type: "button",
						className: `button ${E || e.action === "archive" ? "button-danger" : "button-primary"}`,
						disabled: l || !(e.action === "leave" || h ? i.connected : i.canSend),
						onClick: () => void w(),
						children: l ? "Saving…" : h ? "Retry" : `${y} channel`,
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
	return P2(e) ? e($2(n) ? n() : n) : e;
}
function P2(e) {
	return typeof e == "function";
}
function $2(e) {
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
function H2(e, n) {
	const i = { ...e };
	for (const o of n) zn(i, o) && delete i[o];
	return i;
}
function Z2(e, n) {
	const i = {};
	for (const o of n) zn(e, o) && (i[o] = e[o]);
	return i;
}
function a_(e) {
	return e;
}
function F2(e = za) {
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
var Ji = Q2();
function Q2() {
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
function Y2(e, n) {
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
	return $m(i) && Y2(i, n) ? i : window;
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
function ja(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? K2.indexOf(e.type) !== -1 : !1;
}
var K2 = ["button", "color", "file", "image", "reset", "submit"];
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
var G2 = ["dialog", "menu", "listbox", "tree", "grid"],
	TS = { menu: "menuitem", listbox: "option", tree: "treeitem" };
function _u(e, n) {
	const i = e?.getAttribute("role");
	return i && G2.indexOf(i) !== -1 ? i : n;
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
function X2(e, n) {
	const i = e.map((u, l) => [l, u]);
	let o = !1;
	return (
		i.sort(([u, l], [f, h]) => {
			const m = n(l),
				g = n(h);
			return m === g || !m || !g ? 0 : J2(m, g) ? (u > f && (o = !0), -1) : (u < f && (o = !0), 1);
		}),
		o ? i.map(([u, l]) => l) : e
	);
}
function J2(e, n) {
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
function W2() {
	return Ji && /firefox\//i.test(navigator.userAgent);
}
function eI() {
	return Ji && navigator.platform.startsWith("Mac") && !d_();
}
function tI(e) {
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
function nI(e, n, i) {
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
var rI = {
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
function iI(e, n) {
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
				if (!zn(rI, f)) return Reflect.get(i, f);
			},
		},
	);
}
function xS(e, n) {
	const i = ar(e),
		o = new (i.PointerEvent ?? i.MouseEvent)("click", iI(i, n));
	return e.dispatchEvent(o);
}
function Aa(e, n) {
	const i = n || e.currentTarget,
		o = e.relatedTarget;
	return !Uc(o) || !ht(i, o);
}
function aI(e) {
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
function oI(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function ln(e) {
	return !(!e.matches(ff) || !Hm(e) || e.closest("[inert]"));
}
function Ko(e) {
	if (!ln(e) || oI(e)) return !1;
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
function sI(e, n) {
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
	return i ? sI(e) : null;
}
function v_({ container: e, includeContainer: n, reverse: i, fallbackToEdge: o, fallbackToFocusable: u }) {
	const l = Zn(e),
		f = df(e, n);
	i && f.reverse();
	const h = f.indexOf(l),
		m = f.slice(h + 1);
	return m.find(Ko) || (o ? f.find(Ko) : null) || (u ? m[0] : null) || null;
}
function uI(e, n, i, o) {
	return v_({ container: e, includeContainer: n, fallbackToEdge: i, fallbackToFocusable: o });
}
function ym(e, n) {
	return uI(document.body, !1, e, n);
}
function lI(e, n, i, o) {
	return v_({ container: e, includeContainer: n, reverse: !0, fallbackToEdge: i, fallbackToFocusable: o });
}
function OS(e, n) {
	return lI(document.body, !1, e, n);
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
function cI(e) {
	const n = e.getAttribute("tabindex") ?? "";
	(e.setAttribute("data-tabindex", n), e.setAttribute("tabindex", "-1"));
}
function fI(e, n) {
	const i = wg(e, n);
	for (const o of i) cI(o);
}
function dI(e) {
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
var lL = hI();
function hI({ limit: e = 100 } = {}) {
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
function mI(e) {
	return e.accessibleWhenDisabled ?? e.onLoadedMetadataCapture?.[p_];
}
var Eg = "data-truly-disabled";
function gI(e) {
	return e.getAttribute(Eg) === "true";
}
function vI(e) {
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
function yI(e) {
	return e.nodeType === e.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
function qa(e) {
	const n = e?.getRootNode();
	return n && yI(n) && n.activeElement ? n.activeElement : Zn(e);
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
function pI(e, n, i) {
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
			u.includes(l) && ((l.disposed = !0), pI(o, n, u));
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
function bI(e, n = "") {
	return en(La(e, Go(), !0), La(e, Go(n), !0));
}
function E_(e, n = "") {
	return en(La(e, Go("", "ancestor"), !0), La(e, Go(n, "ancestor"), !0));
}
function SI(e, n) {
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
	w_(n, ...o) || mf({ walk: e, element: n, kind: "mark", setup: () => bI(n, i) });
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
function wI(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function EI(e) {
	return wI(e) ? { ...e.props }.ref || e.ref : null;
}
function _I(e, n) {
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
	cL = xg.useDeferredValue,
	CI = xg.useInsertionEffect ?? ((e) => e()),
	Ne = Ji ? _.useLayoutEffect : _.useEffect;
function TI(e) {
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
		CI(() => {
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
function jt(...e) {
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
function xI(e) {
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
function OI(e) {
	const n = A_();
	return e || n;
}
var AI = A_ ? OI : xI;
function Lr(e) {
	return AI(e);
}
function RI(e, n) {
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
	const o = TI(i),
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
function NI(e, n) {
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
	return { portalRef: jt(o, n), portalNode: i, domReady: !e || i };
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
				(Wt("mousemove", DI, !0),
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
function MI(e) {
	const n = e.movementX || e.screenX - DS,
		i = e.movementY || e.screenY - zS;
	return ((DS = e.screenX), (zS = e.screenY), n || i || !1);
}
function DI(e) {
	MI(e) && (Ng = !0);
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
		l = jt(n.ref, EI(o));
	let f;
	if (_.isValidElement(o)) {
		const h = { ...o.props, ref: l };
		f = _.cloneElement(o, _I(u, h));
	} else o ? (f = o(u)) : (f = (0, S.jsx)(e, { ...u }));
	return i ? i(f) : f;
}
function We(e) {
	const n = (i = {}) => e(i);
	return ((n.displayName = e.name), n);
}
function Ur(e = [], n = []) {
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
var zI = "div",
	M_ = Sg(),
	D_ = 1,
	z_ = 2,
	IS = 3,
	II = [
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
			? II.includes(o)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function jI(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function qI(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function LI(e) {
	let n = 0;
	return (jI(e) && (n |= D_), qI(e) && (n |= z_), n);
}
function UI(e) {
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
function VI({
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
var kS = !1,
	Hc = !0;
function BI(e) {
	const n = e.target;
	Mn(n) && !n.hasAttribute("data-focus-visible") && (Hc = !1);
}
function PI(e) {
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
				n && (kS || (Wt("mousedown", BI, !0), Wt("keydown", PI, !0), (kS = !0)));
			}, [n]));
		const g = n && $a(l),
			p = g && !i,
			[b, y] = (0, _.useState)(!1),
			w = (0, _.useRef)(!1),
			E = (0, _.useRef)(null),
			T = Ae((Y) => {
				(E.current?.(), (E.current = null), (w.current = !1), Y?.removeAttribute("data-focus-visible"));
			});
		((0, _.useEffect)(() => {
			(n && !p) || (T(f.current), b && y(!1));
		}, [n, p, b, T]),
			(0, _.useEffect)(() => {
				if (!n || !b) return;
				const Y = f.current;
				if (!Y || typeof IntersectionObserver > "u") return;
				const ue = new IntersectionObserver(() => {
					ln(Y) || ((w.current = !1), y(!1));
				});
				return (ue.observe(Y), () => ue.disconnect());
			}, [n, b]),
			(0, _.useEffect)(() => () => E.current?.(), []));
		const x = wc(l.onKeyPressCapture, g),
			M = wc(l.onMouseDownCapture, g),
			L = wc(l.onClickCapture, g),
			A = wc(l.onAuxClickCapture, g),
			k = (Y, ue) => {
				if ((ue && (Y.currentTarget = ue), !n)) return;
				const xe = Y.currentTarget;
				if (xe && S_(xe) && (u?.(Y), !Y.defaultPrevented)) {
					if (((xe.dataset.focusVisible = "true"), (w.current = !0), UI(xe))) {
						if ((E.current?.(), (E.current = null), typeof IntersectionObserver < "u")) {
							const me = new IntersectionObserver(() => {
								ln(xe) || T(xe);
							});
							(me.observe(xe), (E.current = () => me.disconnect()));
						}
						return;
					}
					y(!0);
				}
			},
			N = l.onKeyDownCapture,
			I = Ae((Y) => {
				if (
					(N?.(Y),
					Y.defaultPrevented || !n || b || w.current || ((Y.metaKey || Y.altKey || Y.ctrlKey) && !b_(Y.key)) || !cn(Y))
				)
					return;
				const ue = Y.currentTarget;
				Pc(ue, "focusout", () => k(Y, ue));
			}),
			O = l.onFocusCapture,
			q = Ae((Y) => {
				if ((O?.(Y), Y.defaultPrevented || !n)) return;
				if (!cn(Y)) {
					y(!1);
					return;
				}
				const ue = Y.currentTarget,
					xe = () => k(Y, ue);
				Hc || kI(Y.target) ? Pc(Y.target, "focusout", xe) : y(!1);
			}),
			$ = l.onBlur,
			ne = Ae((Y) => {
				($?.(Y), n && Aa(Y) && (T(Y.currentTarget), y(!1)));
			}),
			D = (0, _.useContext)(O_),
			R = Ae((Y) => {
				n &&
					o &&
					Y &&
					D &&
					queueMicrotask(() => {
						ns(Y) || (ln(Y) && Y.focus());
					});
			}),
			[B, F] = (0, _.useState)(IS);
		Ne(() => {
			const Y = f.current;
			if (!Y) return;
			const ue = LI(Y.tagName.toLowerCase());
			ue !== IS && F(ue);
		}, []);
		const G = n && !!(B & D_),
			V = n && !!(B & z_),
			[ee, re] = (0, _.useState)(!1);
		M_ &&
			(0, _.useEffect)(() => {
				if (!n) return;
				const Y = f.current;
				if (!Y) return;
				const { type: ue } = Y,
					xe = Y.tagName === "INPUT" && (ue === "checkbox" || ue === "radio");
				re(ja(Y) || xe);
			}, [n]);
		const U = l.style,
			te = (0, _.useMemo)(() => (p ? { pointerEvents: "none", ...U } : U), [p, U]);
		return (
			(l = {
				"data-focus-visible": (n && b) || void 0,
				"data-autofocus": o || void 0,
				"aria-disabled": g || void 0,
				...l,
				...m,
				ref: jt(f, R, l.ref),
				style: te,
				tabIndex: VI({
					focusable: n,
					trulyDisabled: p,
					nativeTabbable: G,
					supportsDisabled: V,
					safariTabIndex: ee,
					tabIndexProp: l.tabIndex,
				}),
				disabled: V && p ? !0 : void 0,
				[Eg]: g ? p : void 0,
				contentEditable: g ? void 0 : l.contentEditable,
				onKeyPressCapture: x,
				onClickCapture: L,
				onAuxClickCapture: A,
				onMouseDownCapture: M,
				onKeyDownCapture: I,
				onFocusCapture: q,
				onBlur: ne,
			}),
			lf(l)
		);
	}),
	fL = Fe(function (n) {
		const i = xu(n);
		return Je(zI, i);
	}),
	Ou = Ur(),
	dL = Ou.useContext,
	hL = Ou.useScopedContext,
	Mg = Ou.useProviderContext,
	$I = Ou.ContextProvider,
	HI = Ou.ScopedContextProvider,
	Au = Ur([$I], [HI]),
	mL = Au.useContext,
	gL = Au.useScopedContext,
	Ru = Au.useProviderContext,
	ZI = Au.ContextProvider,
	Dg = Au.ScopedContextProvider,
	I_ = (0, _.createContext)(void 0),
	FI = (0, _.createContext)(void 0),
	k_ = new WeakMap();
function QI(e, n, i) {
	const { KeyboardEvent: o } = ar(e),
		u = new o(n.type, i);
	return (k_.set(u, Fm(n)), e.dispatchEvent(u));
}
function Fm(e) {
	return k_.get(e) ?? e;
}
function Ha(e, n) {
	const i = e.__unstableInternals;
	return (Zt(i, "Invalid store"), i[n]);
}
function j_(e, n) {
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
	for (const l of o_(n)) uu(n[l], i[l]) || (o !== void 0 && j_([l], o)) || ((u ??= { ...e }), (u[l] = n[l]));
	return u;
}
var YI = 100;
function KI(e, n, i) {
	if (n)
		for (const o of n) {
			let u = e.get(o);
			(u || ((u = new Set()), e.set(o, u)), u.add(i));
		}
}
function GI(e, n, i) {
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
function XI(e, n, i) {
	for (const o of e) o.group === n && (o.recovering || (zg(o, i) && (Zc(o), o.notifiedListeners?.add(i))));
}
function JI({ fastPathFrames: e, group: n, keys: i, listener: o }) {
	const u = n.listeners.has(o);
	for (const l of e)
		l.group === n &&
			(l.recovering ||
				(i.includes(l.updatedKey) &&
					(zg(l, o) ? (Zc(l), l.notifiedListeners?.add(o)) : u && (Zc(l), (l.recoverToLive = !0)))));
}
function WI(e, n, i) {
	for (const o of e) o.group === n && o.notifiedListeners?.delete(i);
}
function ek({ fastPathFrames: e, group: n, keys: i, listener: o }) {
	for (const u of e) u.group === n && (u.recovering || (i.includes(u.updatedKey) && u.keyedListeners.add(o)));
}
function tk(e, n) {
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
function jS({ group: e, getState: n, prevState: i, updatedKey: o, notifiedListeners: u }) {
	const l = e.allKeysListeners;
	for (const f of e.listeners)
		u?.has(f) || (!l?.has(f) && !j_(e.listenerKeys.get(f), o)) || (u?.add(f), V_(e, f, n(), i, n, o));
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
		y = (D) => (g.add(D), () => g.delete(D)),
		w = () => {
			const D = m.size,
				R = Symbol();
			m.add(R);
			const B = () => {
				m.delete(R) && (m.size || u());
			};
			if (D) return B;
			const F = o_(i),
				G = [];
			for (const re of n) {
				const U = re?.getState?.();
				if (!U) continue;
				const te = F.filter((Y) => zn(U, Y));
				if (te.length) {
					if (n.length === 1 || te.length === F.length) {
						for (const Y of te)
							G.push(
								nt(re, [Y], (ue) => {
									$(Y, ue[Y], !0);
								}),
							);
						continue;
					}
					G.push(
						fi(re, te, (Y, ue) => {
							for (const xe of te) Y[xe] !== ue[xe] && $(xe, Y[xe], !0);
						}),
					);
					for (const Y of te) {
						const ue = re?.getState?.();
						ue && $(Y, ue[Y], !0);
					}
				}
			}
			const V = [];
			for (const re of g) V.push(re());
			const ee = n.map(Ig);
			return ((u = en(...G, ...V, ...ee)), B);
		},
		E = (D, R, B) => {
			B !== void 0 && (B ? GI(D.listenersByKey, B, R) : D.allKeysListeners?.delete(R));
		},
		T = [],
		x = (D, R, B = p) => {
			const F = D ? [...D] : null,
				G = B.listeners.has(R);
			return (
				G || WI(T, B, R),
				F ? JI({ fastPathFrames: T, group: B, keys: F, listener: R }) : (G && pm(T, B), XI(T, B, R)),
				G && (pm(T, B, R), E(B, R, B.listenerKeys.get(R))),
				B.listeners.add(R),
				F
					? ((B.listenersByKey ??= new Map()),
						KI(B.listenersByKey, F, R),
						ek({ fastPathFrames: T, group: B, keys: F, listener: R }))
					: ((B.allKeysListeners ??= new Set()), B.allKeysListeners.add(R)),
				B.listenerKeys.set(R, F),
				() => {
					const V = B.disposables.get(R);
					(B.disposables.delete(R), pm(T, B, R));
					const ee = B.listenerKeys.get(R);
					(E(B, R, F), ee !== F && E(B, R, ee), B.listenerKeys.delete(R), B.listeners.delete(R), V?.());
				}
			);
		},
		M = (D, R) => x(D, R),
		L = (D, R, B) => {
			const F = D.listeners.has(R);
			if (F) {
				D.suspendCounts ??= new Map();
				const V = D.suspendCounts.get(R) ?? 0;
				D.suspendCounts.set(R, V + 1);
			}
			let G;
			try {
				const V = i;
				(tk(D, R), i !== V && (G = q_(B, i, V)));
				const ee = R(i, G ?? B);
				ee && U_(D, R, ee);
			} finally {
				if (F) {
					const V = D.suspendCounts,
						ee = V?.get(R);
					(ee && ee > 1 ? V?.set(R, ee - 1) : V?.delete(R), V?.size || delete D.suspendCounts);
				}
			}
		},
		A = (D, R) => (L(p, R, i), x(D, R)),
		k = (D, R) => (!b.listeners.size && !f && (o = i), L(b, R, o), x(D, R, b)),
		N = (D) => or(Z2(i, D), ne),
		I = (D) => or(H2(i, D), ne),
		O = () => i,
		q = (D, R, B) => {
			if (!(B instanceof Set) && !D.allKeysListeners?.size) {
				const F = D.listenersByKey?.get(B);
				if (!F) return;
				const G = { group: D, keyedListeners: F, updatedKey: B, currentListener: null };
				T.push(G);
				try {
					for (const V of F) {
						if (
							G.notifiedListeners?.has(V) ||
							((G.currentListener = V),
							G.notifiedListeners?.add(V),
							V_(D, V, i, R, O, B),
							!D.allKeysListeners?.size && !G.recoverToLive)
						)
							continue;
						const ee = G.notifiedListeners ?? L_(G);
						((G.notifiedListeners = ee),
							(G.recovering = !0),
							jS({ group: D, getState: O, prevState: R, updatedKey: B, notifiedListeners: ee }));
						return;
					}
				} finally {
					T.pop();
				}
				return;
			}
			jS({ group: D, getState: O, prevState: R, updatedKey: B });
		},
		$ = (D, R, B = !1) => {
			if (!zn(i, D)) return;
			const F = i[D],
				G = uf(R, () => F);
			if (uu(G, F)) return;
			const V = f;
			f = !0;
			const ee = i,
				re = { ...i, [D]: G };
			i = re;
			let U = !1;
			try {
				if (!B && n.length) {
					for (const te of n)
						if ((te?.setState?.(D, G), !uu(i[D], G))) {
							U = !0;
							break;
						}
					if (U) {
						let te = 0;
						for (; te < YI; te += 1) {
							let Y = !1;
							for (const ue of n) {
								const xe = i[D];
								(ue?.setState?.(D, xe), uu(i[D], xe) || (Y = !0));
							}
							if (!Y) break;
						}
					}
				}
				if (!U) {
					const te = i === re ? ee : { ...i, [D]: ee[D] };
					q(p, te, D);
				}
			} finally {
				f = V;
			}
			if (!b.listeners.size) {
				f || (o = i);
				return;
			}
			(h.add(D),
				!l &&
					((l = !0),
					queueMicrotask(() => {
						l = !1;
						const te = i,
							Y = h;
						h = new Set();
						const ue = o;
						(q(b, ue, Y), o === ue && (o = te));
					})));
		},
		ne = {
			getState: O,
			setState: $,
			__unstableInternals: { setup: y, init: w, subscribe: M, sync: A, batch: k, pick: N, omit: I },
		};
	return ne;
}
function yt(e, ...n) {
	if (e) return Ha(e, "setup")(...n);
}
function Ig(e, ...n) {
	if (e) return Ha(e, "init")(...n);
}
function fi(e, ...n) {
	if (e) return Ha(e, "subscribe")(...n);
}
function nt(e, ...n) {
	if (e) return Ha(e, "sync")(...n);
}
function pu(e, ...n) {
	if (e) return Ha(e, "batch")(...n);
}
function kg(e, ...n) {
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
var nk = sr((e) => {
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
				M = T[1];
			return (
				f(
					function () {
						((x.value = E), (x.getSnapshot = w), g(x) && M({ inst: x }));
					},
					[y, E, w],
				),
				l(
					function () {
						return (
							g(x) && M({ inst: x }),
							y(function () {
								g(x) && M({ inst: x });
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
	rk = sr((e, n) => {
		n.exports = nk();
	}),
	P_ = rk(),
	Fc = () => () => {};
function Qc(e) {
	return Array.isArray(e);
}
function Qm(e, n) {
	return e === n || (e !== e && n !== n);
}
function ik(e, n) {
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
	if (ik(n, e)) return n;
	const o = [...e];
	return (i(o), o);
}
function pe(e, n = a_, i) {
	const o = $_(Qc(n) ? n : typeof n == "function" ? null : [n]),
		u = _.useCallback((f) => (!e || o?.length === 0 ? Fc() : fi(e, o, f)), [e, o]),
		l = () => {
			const f = e?.getState();
			if (Qc(n)) return i?.(f);
			if (typeof n == "function") return n(f);
			if (f && zn(f, n)) return f[n];
		};
	return (0, P_.useSyncExternalStore)(u, l, l);
}
function ak(e, n) {
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
		f = $_(ak(o, u)),
		h = _.useCallback((g) => (!e || f?.length === 0 ? Fc() : fi(e, f, g)), [e, f]),
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
			return fi(e, [i], (m, g) => {
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
	const u = _.useCallback((l) => pe(i, l), [i]);
	return [
		_.useMemo(() => ({ ...i, useState: u }), [i, u]),
		Ae(() => {
			o((l) => e({ ...n, ...l.getState() }));
		}),
	];
}
var ok = "div";
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
function sk(e) {
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
var jg = We(function ({ store: n, alwaysVisible: i, unstable_otherElementRef: o, ...u }) {
		const l = Mg();
		((n = n || l), Zt(n, !1));
		const f = (0, _.useRef)(null),
			h = Lr(u.id),
			[m, g] = (0, _.useState)(null),
			{
				open: p,
				mounted: b,
				animated: y,
				contentElement: w,
			} = Yc(n, { open: "open", mounted: "mounted", animated: "animated", contentElement: "contentElement" }),
			E = pe(n.disclosure, "contentElement"),
			T = (0, _.useRef)(!1);
		(Ne(() => {
			f.current && n?.setContentElement(f.current);
		}, [n]),
			Ne(() => {
				let A;
				return (
					n?.setState("animated", (k) => ((A = k), !0)),
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
				return F2(() => {
					g(p ? "enter" : b ? "leave" : null);
				});
			}, [y, w, p, b]),
			Ne(() => {
				if (!n || !y || !m || !w) return;
				const A = () => n?.setState("animating", !1),
					k = () => (0, hu.flushSync)(A);
				if ((m === "leave" && p) || (m === "enter" && !p)) return;
				if (typeof y == "number") return qS(y, k);
				const N = [w];
				E && N.push(E);
				const I = o?.current;
				I && N.push(I);
				const O = Math.max(...N.map(sk));
				if (!O) {
					(m === "enter" && n.setState("animated", !1), A());
					return;
				}
				return qS(Math.max(O - 1e3 / 60, 0), k);
			}, [n, y, w, E, o, p, m]),
			(u = Ht(u, (A) => (0, S.jsx)(Dg, { value: n, children: A }), [n])));
		const x = Nu(b, u.hidden, i),
			M = u.style,
			L = (0, _.useMemo)(() => (x ? { ...M, display: "none" } : M), [x, M]);
		return (
			(u = {
				"data-open": p || void 0,
				"data-enter": m === "enter" || void 0,
				"data-leave": m === "leave" || void 0,
				hidden: x,
				...u,
				id: h,
				ref: jt(h ? n.setContentElement : null, f, u.ref),
				style: L,
			}),
			lf(u)
		);
	}),
	uk = Fe(function (n) {
		const i = jg(n);
		return Je(ok, i);
	}),
	vL = Fe(function ({ unmountOnHide: n, ...i }) {
		const o = Mg(),
			u = i.store || o;
		return pe(u, ["mounted"], (l) => !n || l?.mounted) === !1 ? null : (0, S.jsx)(uk, { ...i });
	}),
	lk = "div",
	H_ = We(function ({ autoFocusOnShow: n = !0, ...i }) {
		return ((i = Ht(i, (o) => (0, S.jsx)(O_.Provider, { value: n, children: o }), [n])), i);
	}),
	yL = Fe(function (n) {
		const i = H_(n);
		return Je(lk, i);
	}),
	VS = (0, _.createContext)(0);
function ck({ level: e, children: n }) {
	const i = (0, _.useContext)(VS),
		o = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, S.jsx)(VS.Provider, { value: o, children: n });
}
var fk = "span";
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
	pL = Fe(function (n) {
		const i = F_(n);
		return Je(fk, i);
	}),
	dk = "span",
	hk = We(function (n) {
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
		const i = hk(n);
		return Je(dk, i);
	}),
	BS = (0, _.createContext)(null),
	mk = "div";
function Q_(e, n) {
	const i = Ke(e),
		o = n || i.body,
		{ fullscreenElement: u } = i,
		l = ar(e).HTMLElement;
	return !l || !(u instanceof l) || ht(u, o) ? o : n && !ht(n, u) ? n : u;
}
function gk(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : Ke(e).createElement("div");
}
function vk(e, n) {
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
function yk(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Vi(e) {
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
			m = jt(h, f.ref),
			g = (0, _.useContext)(BS),
			[p, b] = (0, _.useState)(null),
			[y, w] = (0, _.useState)(null),
			E = (0, _.useRef)(null),
			T = (0, _.useRef)(null),
			x = (0, _.useRef)(null),
			M = (0, _.useRef)(null),
			L = yu(u),
			A = (0, _.useRef)(null);
		return (
			Ne(() => {
				const k = h.current;
				if (!k || !l) {
					b(null);
					return;
				}
				const N = gk(k, o);
				if (!N) {
					b(null);
					return;
				}
				const I = N.isConnected;
				(I || Q_(k, g).appendChild(N),
					N.id || (N.id = k.id ? `portal/${k.id}` : yk()),
					b(N),
					(A.current = PS(L.current, N)));
				const O = o ? void 0 : vk(N, g);
				return () => {
					O?.();
					const q = A.current;
					(q && ((A.current = null), $S(q)), I || N.remove());
				};
			}, [l, o, g, L]),
			Ne(() => {
				const k = A.current;
				k && k.ref !== u && ($S(k), (A.current = PS(u, k.node)));
			}, [u]),
			Ne(() => {
				if (!l || !n || !i) return;
				const k = Ke(i).createElement("span");
				return (
					(k.style.position = "fixed"),
					i.insertAdjacentElement("afterend", k),
					w(k),
					() => {
						(k.remove(), w(null));
					}
				);
			}, [l, n, i]),
			(0, _.useEffect)(() => {
				if (!p || !n) return;
				let k = 0;
				const N = (I) => {
					if (!Aa(I)) return;
					const O = I.type === "focusin";
					if ((cancelAnimationFrame(k), O)) return dI(p);
					k = requestAnimationFrame(() => {
						fI(p, !0);
					});
				};
				return (
					p.addEventListener("focusin", N, !0),
					p.addEventListener("focusout", N, !0),
					() => {
						(cancelAnimationFrame(k),
							p.removeEventListener("focusin", N, !0),
							p.removeEventListener("focusout", N, !0));
					}
				);
			}, [p, n]),
			(f = Ht(
				f,
				(k) => {
					if (((k = (0, S.jsx)(BS.Provider, { value: p || g, children: k })), !l)) return k;
					if (!p) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((k = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								(0, S.jsx)(Ec, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (I) => {
										Aa(I, p) ? Vi(ym()) : Vi(E.current);
									},
								}),
							k,
							n &&
								(0, S.jsx)(Ec, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (I) => {
										Aa(I, p) ? Vi(OS()) : Vi(M.current);
									},
								}),
						],
					})),
						(k = (0, hu.createPortal)(k, p)));
					let N = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								(0, S.jsx)(Ec, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (I) => {
										I.relatedTarget !== M.current && Aa(I, p) ? Vi(T.current) : Vi(OS());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": p.id, style: { position: "fixed" } }),
							n &&
								(0, S.jsx)(Ec, {
									ref: M,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (I) => {
										if (Aa(I, p)) Vi(x.current);
										else {
											const O = ym();
											if (O === T.current) {
												requestAnimationFrame(() => ym()?.focus());
												return;
											}
											Vi(O);
										}
									},
								}),
						],
					});
					return (y && n && (N = (0, hu.createPortal)(N, y)), (0, S.jsxs)(S.Fragment, { children: [N, k] }));
				},
				[p, g, l, f.id, n, y],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	bL = Fe(function (n) {
		const i = Y_(n);
		return Je(mk, i);
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
function pk(e, n) {
	return X_(K_(e), n);
}
function X_(e, n) {
	const i = [];
	for (const o of n) i.push(La(o, e, !0));
	return () => {
		for (const o of i) o();
	};
}
var bk = ["SCRIPT", "STYLE"];
function Sk(e, n) {
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
function wk(e, n, i) {
	return bk.includes(n.tagName) || !Sk(e, n) ? !1 : !J_(n, i);
}
function Ek(e, n, i) {
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
					if (wk(e, p, n)) {
						i(p, h);
						continue;
					}
					Ek(e, p, n) && (o?.(p, h), m(p));
				}
			};
		for (; u.parentElement && u !== f.body;) (o?.(u.parentElement, h), l || m(u.parentElement), (u = u.parentElement));
	}
}
function _k(e, n) {
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
		en(La(i, qg(e), !0), G_(e, o), pk(e, u))
	);
}
function Ck(e, n, i) {
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
function Tk(e) {
	const n = e?.unstable_onHideRequest,
		i = e?.unstable_requestHide;
	if (n && i) return { onHideRequest: n, requestHide: i };
}
function W_(e = {}) {
	const n = e.store || e.disclosure ? gf(e.store, kg(e.disclosure, ["contentElement", "disclosureElement"])) : void 0;
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
			fi(f, ["open"], () => {
				f.getState().animated && f.setState("animating", !0);
			}),
		),
		yt(f, () =>
			nt(f, ["open", "animating"], (y) => {
				f.setState("mounted", y.open || y.animating);
			}),
		));
	const h = Tk(e.store),
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
function xk(e = {}) {
	const [n, i] = vf(W_, e);
	return e1(n, i, e);
}
var Ok = [
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
	Ak = "div",
	SL = We(function (n) {
		return n;
	}),
	Kc = Fe(function (n) {
		return Je(Ak, n);
	});
Object.assign(
	Kc,
	Ok.reduce(
		(e, n) => (
			(e[n] = Fe(function (o) {
				return Je(n, o);
			})),
			e
		),
		{},
	),
);
function Rk({ store: e, backdrop: n, backdropRef: i, onElementChange: o, alwaysVisible: u, hidden: l }) {
	const [f, h] = (0, _.useState)(null),
		m = xk({ disclosure: e }),
		g = pe(e, "contentElement");
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
	const p = jg({
		ref: jt(h, i),
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
function Nk(e) {
	return _g(e, "aria-hidden", "true");
}
function Mk(e, ...n) {
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
	return en(...i, Nk(e), Ac(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }));
}
function Dk({ walk: e, element: n, elements: i, ids: o }) {
	w_(n, ...o) || Mk(n, ...o) || yf(n, ...o) || mf({ walk: e, element: n, kind: "disable", setup: () => i1(n, i) });
}
function zk(e, n, i) {
	n.hasAttribute("role") &&
		(i.some((o) => o && ht(o, n)) || mf({ walk: e, element: n, kind: "role", setup: () => _g(n, "role", "none") }));
}
function Ik(e, n, i) {
	i && !Ug() && Tg(i);
	const o = __(i),
		u = n.map((l) => l?.id);
	return (
		Lg(
			e,
			n,
			(l) => {
				(T_({ walk: o, element: l, id: e, ids: u }), Dk({ walk: o, element: l, elements: n, ids: u }));
			},
			(l, f) => {
				(x_({ walk: o, ancestor: l, element: f, id: e }), zk(o, l, n));
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
function kk(e, n, i) {
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
function jk(e, n) {
	if (!e) return !1;
	if (ht(e, n)) return !0;
	const i = n.getAttribute("aria-activedescendant");
	if (i) {
		const o = Ke(n).getElementById(i);
		if (o) return ht(e, o);
	}
	return !1;
}
function qk(e, n) {
	if (!("clientY" in e)) return !1;
	const i = n.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function Lk(e, n, i) {
	return ht(n, e) || jk(i, e) || e.hasAttribute("data-focus-trap") || yf(e, n.id) ? !0 : Cg(e, n);
}
function u1(e, n, i) {
	return e.elements.some((o) => Lk(o, n, i));
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
				(Ke(E ?? T) === x && qk(p, b)) || (f.current && !hf(T, b.id)) || h(p);
			},
			g = l ? s1(l) : void 0;
		return Wt(n, m, o, g);
	}, [u, o, e, n, h, l, f]);
}
function Sm(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function Uk({ store: e, hideOnInteractOutside: n, domReady: i, interactedOutsideRef: o, focusedStoreRef: u }) {
	const l = pe(e, "open"),
		f = pe(e, "contentElement"),
		h = f ? s1(f) : void 0,
		m = kk(l, h, f),
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
function Vk(e) {
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
function Bk({ attribute: e, contentId: n, contentElement: i, enabled: o }) {
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
var l1 = cf() && !eI(),
	Pk = l1 ? _.useEffect : Ne;
function $k(e) {
	const { CSS: n } = e;
	return !!n?.supports("scrollbar-gutter", "stable");
}
function FS(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function Hk(e, n, i) {
	const o = Bk({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: i });
	Pk(() => {
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
					x = (k) => !k || k === "visible",
					M = !x(w.getPropertyValue("overflow-x")) || !x(w.getPropertyValue("overflow-y")),
					L = () => en(bc(f, "overflow-x", "hidden"), bc(f, "overflow-y", "hidden")),
					A = (k) => (M ? en(k, L()) : k);
				return !T && !g
					? A(Ac(h, { overflow: "hidden" }))
					: T || $k(l)
						? en(bc(f, "scrollbar-gutter", T ? E : "stable"), L())
						: A(en(bc(f, "--scrollbar-width", `${g}px`), Ac(h, { overflow: "hidden", [FS(f)]: `${g}px` })));
			},
			b = () => {
				const { scrollX: w, scrollY: E, visualViewport: T } = l,
					x = T?.offsetLeft ?? 0,
					M = T?.offsetTop ?? 0,
					L = Ac(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(E - Math.floor(M))}px`,
						left: `${-(w - Math.floor(x))}px`,
						right: "0",
						[FS(f)]: `${g}px`,
					});
				return () => {
					(L(), l.scrollTo({ left: w, top: E, behavior: "instant" }));
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
function Zk(e) {
	c1.add(e);
}
function f1(e) {
	return c1.has(e);
}
var Xo = new Map();
function Fk(e, n = {}) {
	Xo.set(e, n);
}
function Qk(e) {
	Xo.delete(e);
}
function Yk(e) {
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
function Kk(e) {
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
var Gk = "div",
	Xk = Sg(),
	Ym = new WeakSet(),
	QS = new WeakSet();
function Jk(e) {
	const n = Zn(e);
	return !n || (e && ht(e, n)) || yf(n, e?.id) ? !1 : !!ln(n);
}
function Wk(e) {
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
function ej(e) {
	const n = e.querySelectorAll("[data-dialog-dismiss]");
	for (const i of n) if (i.closest("[data-dialog]") === e) return !0;
	return !1;
}
function KS(e, n = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (n ? (ln(i) ? i : null) : i) : null;
}
function tj(e) {
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
	unstable_treeSnapshotKey: M,
	unstable_wrapperElement: L,
	...A
}) {
	const k = Ru(),
		N = (0, _.useRef)(null),
		I = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		q = l && f && !A.portalElement,
		$ = (0, _.useRef)(!1),
		ne = Ae(() => {
			const le = N.current;
			if (!le) return !0;
			const Oe = new Event("close", { bubbles: !1, cancelable: !0 });
			return (o && le.addEventListener("close", o, { once: !0 }), le.dispatchEvent(Oe), !Oe.defaultPrevented);
		}),
		D = r1({
			store: n || k,
			open: i,
			setOpen(le) {
				le || $.current || ne() || D.setOpen(!0);
			},
		});
	Ne(
		() =>
			D.unstable_onHideRequest((le) => {
				if (!$.current) {
					$.current = !0;
					try {
						if (!ne()) return;
						le();
					} finally {
						$.current = !1;
					}
				}
			}),
		[D, ne],
	);
	const { portalRef: R, portalNode: B, domReady: F } = Og(f, A.portalRef),
		G = yu(B),
		V = yu(L),
		ee = A.preserveTabOrder,
		re = pe(D, ["mounted"], (le) => ee && !l && le.mounted),
		U = Lr(A.id),
		te = pe(D, "open"),
		Y = pe(D, "mounted"),
		ue = pe(D, "contentElement"),
		xe = Nu(Y, A.hidden, A.alwaysVisible);
	Hk(ue, U, b && !xe);
	const me = (0, _.useRef)(!1),
		j = (0, _.useRef)(null);
	(Ne(
		() =>
			nt(D, ["open"], (le) => {
				if (!le.open) {
					j.current = null;
					return;
				}
				((me.current = !1), j.current !== D && (j.current = null));
			}),
		[D],
	),
		Uk({ store: D, hideOnInteractOutside: g, domReady: F, interactedOutsideRef: me, focusedStoreRef: j }));
	const { wrapElement: ae, nestedDialogs: W } = Vk(D);
	A = Ht(A, ae, [ae]);
	const fe = (0, _.useRef)(null);
	(Xk &&
		(0, _.useEffect)(() => {
			if (!F) return;
			const le = N.current;
			if (!le) return;
			const Oe = Ke(le),
				ze = (ye) => {
					fe.current = ye.target;
				};
			return (
				Oe.addEventListener("mousedown", ze, !0),
				() => {
					Oe.removeEventListener("mousedown", ze, !0);
				}
			);
		}, [F]),
		Ne(() => {
			if (!te || j.current === D) return;
			const le = N.current;
			if (
				(() => {
					const { disclosureElement: Me } = D.getState();
					return !(!Me || f1(Me) || !Me.isConnected || (le && ht(le, Me)));
				})()
			)
				return;
			const ze = (Me) => {
					(Zk(Me), D.setDisclosureElement(Me));
				},
				ye = Zn(le, { activeDescendant: !0 });
			if (ye) {
				if (ye.tagName === "BODY") {
					const Me = fe.current;
					if (((fe.current = null), !Me?.isConnected || !ln(Me) || (le && ht(le, Me)))) return;
					ze(Me);
					return;
				}
				(le && ht(le, ye)) || ze(ye);
			}
		}, [D, te]),
		(0, _.useEffect)(() => {
			if (!Y || !F) return;
			const le = N.current;
			if (!le) return;
			const Oe = ar(le),
				ze = Oe.visualViewport || Oe,
				ye = () => {
					const Me = Oe.visualViewport?.height ?? Oe.innerHeight;
					le.style.setProperty("--dialog-viewport-height", `${Me}px`);
				};
			return (
				ye(),
				ze.addEventListener("resize", ye),
				() => {
					ze.removeEventListener("resize", ye);
				}
			);
		}, [Y, F]));
	const [Ee, _e] = (0, _.useState)(!1);
	(Ne(() => {
		if (!(l && te && F) || !ue) {
			_e(!1);
			return;
		}
		const le = () => {
			_e(!ej(ue));
		};
		le();
		const { MutationObserver: Oe } = ar(ue),
			ze = new Oe(le);
		return (ze.observe(ue, { childList: !0, subtree: !0 }), () => ze.disconnect());
	}, [l, te, F, ue]),
		Ne(() => {
			if (!Ug() || te || !Y || !F) return;
			const le = N.current;
			if (le) return i1(le);
		}, [te, Y, F]));
	const Ce = te && F,
		ce = (0, _.useRef)(null);
	Ne(() => {
		if (!U || !q || !Ce || !B) {
			ce.current = null;
			return;
		}
		const le = N.current;
		if (!le || !ht(B, le)) {
			ce.current = null;
			return;
		}
		return (
			ce.current?.portal !== B && (ce.current = { portal: B, peers: tj(le) }),
			Ym.add(B),
			() => {
				Ym.delete(B);
			}
		);
	}, [U, Ce, q, B]);
	const ve = !!Ce,
		[Ge, ct] = (0, _.useState)(0);
	(Ne(() => {
		ve &&
			Fk(N, {
				getOutsideCleanups: () => Qe.current?.outsideCleanups,
				getPortalNode: () => G.current,
				getWrapperElement: () => V.current,
				getBackdropElement: () => I.current,
				getHiddenDismissElement: () => O.current,
				onEarlierDialogElementChange: () => {
					ct((le) => le + 1);
				},
			});
	}, [ve, G, V]),
		Ne(() => {
			if (te) return () => Qk(N);
		}, [te]));
	const mt = (0, _.useRef)(null);
	Ne(() => {
		if (!ve) {
			mt.current = null;
			return;
		}
		if (!ue) return;
		const le = mt.current;
		((mt.current = ue), le && le !== ue && wm(N));
	}, [ve, ue]);
	const Et = (0, _.useCallback)(() => {
		wm(N);
	}, []);
	Ne(() => {
		Ee && wm(N);
	}, [Ee]);
	const et = (0, _.useRef)(null);
	(Ne(() => {
		if (!U || !Ce) return;
		const le = N.current;
		if (!le) return;
		const Oe = le.getRootNode(),
			ze = et.current;
		if (ze?.rootNode === Oe) return;
		ze?.restore();
		const ye = _k(U, [le]);
		et.current = { rootNode: Oe, restore: ye };
	}, [U, Ce, M]),
		Ne(() => {
			if (te)
				return () => {
					(et.current?.restore(), (et.current = null));
				};
		}, [U, te, M]),
		Ne(() => {
			if (!U || !Ce) return;
			const le = Yk(N);
			return G_(U, le);
		}, [U, Ce, Ge]));
	const Ue = Ae(p),
		Qe = (0, _.useRef)(null);
	(Ne(
		() => () => {
			const le = Qe.current;
			le && ((Qe.current = null), le.restoreInsideMarks(), Tg(le.outsideCleanups));
		},
		[U, D, Ce, ue, l, q, Ue, M],
	),
		Ne(() => {
			if (!U || !Ce) return;
			const { disclosureElement: le } = D.getState(),
				Oe = ue ?? N.current;
			if (!Oe) return;
			const ze = [Oe, ...(Ue() || []), ...(ce.current?.peers || []), ...W.map((Sr) => Sr.getState().contentElement)],
				ye = Qe.current;
			ye?.restoreInsideMarks();
			const Me = SI(Oe, ze),
				Yt = l ? Ik(U, ze, ye?.outsideCleanups) : Ck(U, [le, ...ze], ye?.outsideCleanups);
			Qe.current = { restoreInsideMarks: Me, outsideCleanups: Yt };
		}, [U, D, Ce, ue, l, q, Ue, W, M, Ge]));
	const dn = !!y,
		At = ut(y),
		[Fn, Qn] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!te || !dn || !F || !ue?.isConnected) return;
		const le = KS(E, !0) || ue.querySelector("[data-autofocus=true],[autofocus]") || Zm(ue, !0, f && re) || ue,
			Oe = ln(le);
		At(Oe ? le : null) &&
			(Qn(!0),
			queueMicrotask(() => {
				const { open: ze, disclosureElement: ye } = D.getState();
				if (!ze) return;
				const Me = Zn(ue, { frame: !1 }),
					Yt = Me && Wk(Me);
				(j.current === D && Me && Yt && ln(Yt) && !YS(Me, ue, ye) && !YS(Yt, ue, ye)) ||
					(ln(le) && le.scrollIntoView({ block: "nearest", inline: "nearest" }), le.focus({ preventScroll: !0 }));
			}));
	}, [te, dn, F, ue, E, f, re, D, At, j]);
	const _t = !!w,
		qt = ut(w),
		[hn, Qt] = (0, _.useState)(!1);
	Ne(() => {
		if (te) return (Qt(!0), () => Qt(!1));
	}, [te]);
	const ge = (0, _.useCallback)(
			(le, Oe = !0) => {
				if (me.current) return;
				const { disclosureElement: ze } = D.getState();
				if (Jk(le)) return;
				let ye = KS(T) || ze;
				if (ye?.id) {
					const Yt = Ke(ye),
						Sr = `[aria-activedescendant="${ye.id}"]`,
						gi = Yt.querySelector(Sr);
					gi && (ye = gi);
				}
				if (ye && !ln(ye)) {
					const Yt = ye.closest("[data-dialog]");
					if (Yt?.id) {
						const Sr = Ke(Yt),
							gi = `[aria-controls~="${Yt.id}"]`,
							gn = Sr.querySelector(gi);
						gn && (ye = gn);
					}
				}
				const Me = ye && ln(ye);
				if (!Me && Oe) {
					requestAnimationFrame(() => ge(le, !1));
					return;
				}
				qt(Me ? ye : null) && Me && ye?.focus();
			},
			[D, T, qt],
		),
		Te = (0, _.useRef)(!1);
	(Ne(() => {
		if (te || !hn || !_t) return;
		const le = N.current;
		((Te.current = !0), ge(le));
	}, [te, hn, F, _t, ge]),
		(0, _.useEffect)(() => {
			if (!hn || !_t) return;
			const le = N.current;
			return () => {
				if (Te.current) {
					Te.current = !1;
					return;
				}
				ge(le);
			};
		}, [hn, _t, ge]));
	const pt = ut(m),
		[Ct] = (0, _.useState)(() => new WeakMap()),
		[ea] = (0, _.useState)(() => new WeakMap()),
		Fa = A.onKeyDown,
		ta = A.onKeyDownCapture,
		hi = A.onFocusCapture,
		pr = Ae((le) => {
			if ((hi?.(le), !D.getState().open)) return;
			const Oe = le.target;
			Uc(Oe) && ht(le.currentTarget, Oe) && (j.current = D);
		}),
		mi = Ae((le) => {
			if (le.key !== "Escape" || !le.bubbles) return !1;
			const Oe = Ct.get(le);
			if (Oe) return le.defaultPrevented && !Oe.defaultPrevented ? !1 : Oe.accepted;
			if (le.defaultPrevented) return !1;
			const ze = N.current;
			if (!Y || !ze) return !1;
			const ye = Fm(le);
			let Me = ea.get(ye);
			return (
				Me || ((Me = { accepted: !Kk(N) && !QS.has(ye) && pt(le), hidden: !1 }), ea.set(ye, Me)),
				Ct.set(le, { accepted: Me.accepted, defaultPrevented: le.defaultPrevented }),
				Me.accepted
			);
		}),
		br = Ae((le) => {
			const Oe = mi(le);
			if ((Ct.delete(le), !Oe)) return !1;
			const ze = Fm(le),
				ye = ea.get(ze);
			return (ye?.hidden || (ye && (ye.hidden = !0), QS.add(ze), D.hide()), !0);
		}),
		tn = Ae((le) => {
			const Oe = le.nativeEvent,
				ze = Oe.cancelBubble;
			if ((Fa?.(le), ze)) {
				Ct.delete(Oe);
				return;
			}
			br(Oe) && le.stopPropagation();
		}),
		de = Ae((le) => {
			const Oe = le.nativeEvent,
				ze = Oe.cancelBubble;
			if ((ta?.(le), ze)) {
				Ct.delete(Oe);
				return;
			}
			mi(Oe) && (le.isPropagationStopped() || Oe.cancelBubble) && br(Oe);
		});
	((0, _.useEffect)(() => {
		if (!F || !Y) return;
		const le = (ye) => {
				if (ye.key !== "Escape" || !ye.bubbles) return;
				if (ye.cancelBubble) {
					Ct.delete(ye);
					return;
				}
				if (Ct.has(ye)) return;
				const Me = N.current;
				if (!Me) return;
				const Yt = [ye.target, ye.composedPath()[0]].filter(Uc),
					{ disclosureElement: Sr } = D.getState(),
					gi = (gn) =>
						!!(
							(Mn(gn) && gn.tagName === "BODY") ||
							ht(Me, gn) ||
							!Sr ||
							ht(Sr, gn) ||
							(Mn(gn) && hf(gn, Me.id)) ||
							(Mn(gn) && yf(gn, Me.id))
						);
				Yt.some(gi) && mi(ye) && ye.cancelBubble && br(ye);
			},
			Oe = (ye) => {
				if (Ct.has(ye)) {
					if (ye.cancelBubble) {
						Ct.delete(ye);
						return;
					}
					br(ye) && ye.stopPropagation();
				}
			},
			ze = ue ? ar(ue) : void 0;
		return en(Wt("keydown", le, !0, ze), Wt("keydown", Oe, !1, ze));
	}, [D, F, Y, ue, br, mi, Ct]),
		(A = Ht(A, (le) => (0, S.jsx)(ck, { level: l ? 1 : void 0, children: le }), [l])));
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
							onClick: D.hide,
							children: "Dismiss popup",
						}),
					le,
				],
			}),
		[Ee, U, D],
	)),
		(A = Ht(
			A,
			(le) =>
				(0, S.jsxs)(S.Fragment, {
					children: [
						!!h &&
							(0, S.jsx)(Rk, {
								store: D,
								backdrop: h,
								backdropRef: I,
								onElementChange: Et,
								hidden: Be,
								alwaysVisible: Rt,
							}),
						le,
					],
				}),
			[D, h, Et, Be, Rt],
		)));
	const [ft, pn] = (0, _.useState)(),
		[mn, jn] = (0, _.useState)();
	return (
		(A = Ht(
			A,
			(le) =>
				(0, S.jsx)(Dg, {
					value: D,
					children: (0, S.jsx)(I_.Provider, {
						value: pn,
						children: (0, S.jsx)(FI.Provider, { value: jn, children: le }),
					}),
				}),
			[D],
		)),
		(A = {
			"data-dialog": "",
			role: "dialog",
			tabIndex: u ? -1 : void 0,
			"aria-labelledby": A["aria-label"] != null ? void 0 : ft,
			"aria-describedby": mn,
			...A,
			"data-dialog-portal": q ? B?.id : void 0,
			id: U,
			ref: jt(N, A.ref),
			onFocusCapture: pr,
			onKeyDown: tn,
			onKeyDownCapture: de,
		}),
		(A = H_({ ...A, autoFocusOnShow: Fn })),
		(A = jg({ store: D, ...A, unstable_otherElementRef: I })),
		(A = xu({ ...A, focusable: u })),
		(A = Y_({ portal: f, ...A, portalRef: R, preserveTabOrder: re })),
		A
	);
});
function Mu(e, n = Ru) {
	return Fe(function (o) {
		const u = n(),
			l = o.store || u;
		return pe(l, ["mounted"], (f) => !o.unmountOnHide || f?.mounted || !!o.open) ? (0, S.jsx)(e, { ...o }) : null;
	});
}
var h1 = Mu(
		Fe(function (n) {
			const i = d1(n);
			return Je(Gk, i);
		}),
		Ru,
	),
	nj = Fe(function (n) {
		const i = r1({ open: n.open });
		return (0, S.jsx)(h1, { ...n, store: i });
	}),
	wL = Fe(function (n) {
		const i = Ru();
		return n.store || i || !n.unmountOnHide ? (0, S.jsx)(h1, { ...n }) : (0, S.jsx)(nj, { ...n });
	}),
	Du = Ur([ZI], [Dg]),
	EL = Du.useContext,
	_L = Du.useScopedContext,
	Vg = Du.useProviderContext,
	m1 = Du.ContextProvider,
	pf = Du.ScopedContextProvider;
function Bg(e) {
	return e.split("-")[0];
}
var Qi = Math.min,
	ui = Math.max,
	Gc = Math.round,
	_c = Math.floor,
	li = (e) => ({ x: e, y: e }),
	rj = { left: "right", right: "left", bottom: "top", top: "bottom" };
function g1(e, n, i) {
	return ui(e, Qi(n, i));
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
function Ir(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function Hg(e) {
	return Pg(Ir(e));
}
function ij(e, n, i) {
	i === void 0 && (i = !1);
	const o = is(e),
		u = Hg(e),
		l = $g(u);
	let f = u === "x" ? (o === (i ? "end" : "start") ? "right" : "left") : o === "start" ? "bottom" : "top";
	return (n.reference[l] > n.floating[l] && (f = Xc(f)), [f, Xc(f)]);
}
function aj(e) {
	const n = Xc(e);
	return [Km(e), n, Km(n)];
}
function Km(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var GS = ["left", "right"],
	XS = ["right", "left"],
	oj = ["top", "bottom"],
	sj = ["bottom", "top"];
function uj(e, n, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (n ? XS : GS) : n ? GS : XS;
		case "left":
		case "right":
			return n ? oj : sj;
		default:
			return [];
	}
}
function lj(e, n, i, o) {
	const u = is(e);
	let l = uj(Ki(e), i === "start", o);
	return (u && ((l = l.map((f) => f + "-" + u)), n && (l = l.concat(l.map(Km)))), l);
}
function Xc(e) {
	const n = Ki(e);
	return rj[n] + e.slice(n.length);
}
function cj(e) {
	var n, i, o, u;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (o = e.bottom) != null ? o : 0,
		left: (u = e.left) != null ? u : 0,
	};
}
function v1(e) {
	return typeof e != "number" ? cj(e) : { top: e, right: e, bottom: e, left: e };
}
function Jc(e) {
	const { x: n, y: i, width: o, height: u } = e;
	return { width: o, height: u, top: i, left: n, right: n + o, bottom: i + u, x: n, y: i };
}
function JS(e, n, i) {
	let { reference: o, floating: u } = e;
	const l = Ir(n),
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
async function fj(e, n) {
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
		M = b === "floating" ? { x: o, y: u, width: f.floating.width, height: f.floating.height } : f.reference,
		L = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(h.floating)),
		A = ((await (l.isElement == null ? void 0 : l.isElement(L))) &&
			(await (l.getScale == null ? void 0 : l.getScale(L)))) || { x: 1, y: 1 },
		k = Jc(
			l.convertOffsetParentRelativeRectToViewportRelativeRect
				? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: M,
						offsetParent: L,
						strategy: m,
					})
				: M,
		);
	return {
		top: (x.top - k.top + E.top) / A.y,
		bottom: (k.bottom - x.bottom + E.bottom) / A.y,
		left: (x.left - k.left + E.left) / A.x,
		right: (k.right - x.right + E.right) / A.x,
	};
}
var dj = 50,
	hj = async (e, n, i) => {
		const { placement: o = "bottom", strategy: u = "absolute", middleware: l = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: fj },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let g = await f.getElementRects({ reference: e, floating: n, strategy: u }),
			{ x: p, y: b } = JS(g, o, m),
			y = o,
			w = 0;
		const E = {};
		for (let T = 0; T < l.length; T++) {
			const x = l[T];
			if (!x) continue;
			const { name: M, fn: L } = x,
				{
					x: A,
					y: k,
					data: N,
					reset: I,
				} = await L({
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
				(b = k ?? b),
				(E[M] = { ...E[M], ...N }),
				I &&
					w < dj &&
					(w++,
					typeof I == "object" &&
						(I.placement && (y = I.placement),
						I.rects &&
							(g = I.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: u }) : I.rects),
						({ x: p, y: b } = JS(g, y, m))),
					(T = -1)));
		}
		return { x: p, y: b, placement: y, strategy: u, middlewareData: E };
	},
	mj = (e) => ({
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
				M = x ? "top" : "left",
				L = x ? "bottom" : "right",
				A = x ? "clientHeight" : "clientWidth",
				k = l.reference[E] + l.reference[w] - y[w] - l.floating[E],
				N = y[w] - l.reference[w],
				I = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(g));
			let O = I ? I[A] : 0;
			(!O || !(await (f.isElement == null ? void 0 : f.isElement(I)))) && (O = h.floating[A] || l.floating[E]);
			const q = k / 2 - N / 2,
				$ = O / 2 - T[E] / 2 - 1,
				ne = Qi(b[M], $),
				D = Qi(b[L], $),
				R = O - T[E] - D,
				B = O / 2 - T[E] / 2 + q,
				F = g1(ne, B, R),
				G = !m.arrow && is(u) != null && B !== F && l.reference[E] / 2 - (B < ne ? ne : D) - T[E] / 2 < 0,
				V = G ? (B < ne ? B - ne : B - R) : 0;
			return { [w]: y[w] + V, data: { [w]: F, centerOffset: B - F - V, ...(G && { alignmentOffset: V }) }, reset: G };
		},
	}),
	gj = function (e) {
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
					const M = Ki(u),
						L = Ir(h),
						A = Ki(h) === h,
						k = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)),
						N = y || (A || !T ? [Xc(h)] : aj(h)),
						I = E !== "none";
					!y && I && N.push(...lj(h, T, E, k));
					const O = [h, ...N],
						q = await m.detectOverflow(n, x),
						$ = [];
					let ne = ((o = l.flip) == null ? void 0 : o.overflows) || [];
					if ((p && $.push(q[M]), b)) {
						const F = ij(u, f, k);
						$.push(q[F[0]], q[F[1]]);
					}
					if (((ne = [...ne, { placement: u, overflows: $ }]), !$.every((F) => F <= 0))) {
						var D, R;
						const F = (((D = l.flip) == null ? void 0 : D.index) || 0) + 1,
							G = O[F];
						if (
							G &&
							(!(b === "alignment" && L !== Ir(G)) ||
								ne.every((ee) => (Ir(ee.placement) === L ? ee.overflows[0] > 0 : !0)))
						)
							return { data: { index: F, overflows: ne }, reset: { placement: G } };
						let V =
							(R = ne.filter((ee) => ee.overflows[0] <= 0).sort((ee, re) => ee.overflows[1] - re.overflows[1])[0]) ==
							null
								? void 0
								: R.placement;
						if (!V)
							switch (w) {
								case "bestFit": {
									var B;
									const ee =
										(B = ne
											.filter((re) => {
												if (I) {
													const U = Ir(re.placement);
													return U === L || U === "y";
												}
												return !0;
											})
											.map((re) => [re.placement, re.overflows.filter((U) => U > 0).reduce((U, te) => U + te, 0)])
											.sort((re, U) => re[1] - U[1])[0]) == null
											? void 0
											: B[0];
									ee && (V = ee);
									break;
								}
								case "initialPlacement":
									V = h;
							}
						if (u !== V) return { reset: { placement: V } };
					}
					return {};
				},
			}
		);
	},
	y1 = new Set(["left", "top"]);
async function vj(e, n) {
	const { placement: i, platform: o, elements: u } = e,
		l = await (o.isRTL == null ? void 0 : o.isRTL(u.floating)),
		f = Ki(i),
		h = is(i),
		m = Ir(i) === "y",
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
var yj = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var i, o;
					const { x: u, y: l, placement: f, middlewareData: h } = n,
						m = await vj(n, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (o = h.arrow) != null && o.alignmentOffset
						? {}
						: { x: u + m.x, y: l + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	pj = function (e) {
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
								fn: (L) => {
									let { x: A, y: k } = L;
									return { x: A, y: k };
								},
							},
							...g
						} = Yi(e, n),
						p = { x: i, y: o },
						b = await l.detectOverflow(n, g),
						y = Ir(u),
						w = Pg(y);
					let E = p[w],
						T = p[y];
					const x = (L, A) => g1(A + b[L === "y" ? "top" : "left"], A, A - b[L === "y" ? "bottom" : "right"]);
					(f && (E = x(w, E)), h && (T = x(y, T)));
					const M = m.fn({ ...n, [w]: E, [y]: T });
					return { ...M, data: { x: M.x - i, y: M.y - o, enabled: { [w]: f, [y]: h } } };
				},
			}
		);
	},
	bj = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var i, o;
					const { x: u, y: l, placement: f, rects: h, middlewareData: m } = n,
						{ offset: g = 0, mainAxis: p = !0, crossAxis: b = !0 } = Yi(e, n),
						y = { x: u, y: l },
						w = Ir(f),
						E = Pg(w);
					let T = y[E],
						x = y[w];
					const M = Yi(g, n),
						L =
							typeof M == "number"
								? { mainAxis: M, crossAxis: 0 }
								: { mainAxis: (i = M.mainAxis) != null ? i : 0, crossAxis: (o = M.crossAxis) != null ? o : 0 };
					if (p) {
						const N = E === "y" ? "height" : "width",
							I = h.reference[E] - h.floating[N] + L.mainAxis,
							O = h.reference[E] + h.reference[N] - L.mainAxis;
						T < I ? (T = I) : T > O && (T = O);
					}
					if (b) {
						var A, k;
						const N = E === "y" ? "width" : "height",
							I = y1.has(Ki(f)),
							O =
								h.reference[w] -
								h.floating[N] +
								((I && ((A = m.offset) == null ? void 0 : A[w])) || 0) +
								(I ? 0 : L.crossAxis),
							q =
								h.reference[w] +
								h.reference[N] +
								(I ? 0 : ((k = m.offset) == null ? void 0 : k[w]) || 0) -
								(I ? L.crossAxis : 0);
						x < O ? (x = O) : x > q && (x = q);
					}
					return { [E]: T, [w]: x };
				},
			}
		);
	},
	Sj = function (e) {
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
						b = Ir(i) === "y",
						{ width: y, height: w } = o.floating;
					let E, T;
					g === "top" || g === "bottom"
						? ((E = g),
							(T =
								p === ((await (u.isRTL == null ? void 0 : u.isRTL(l.floating))) ? "start" : "end") ? "left" : "right"))
						: ((T = g), (E = p === "end" ? "top" : "bottom"));
					const x = w - m.top - m.bottom,
						M = y - m.left - m.right,
						L = Qi(w - m[E], x),
						A = Qi(y - m[T], M),
						k = n.middlewareData.shift,
						N = !k;
					let I = L,
						O = A;
					(k != null && k.enabled.x && (O = M),
						k != null && k.enabled.y && (I = x),
						N && !p && (b ? (O = y - 2 * ui(m.left, m.right)) : (I = w - 2 * ui(m.top, m.bottom))),
						await f({ ...n, availableWidth: O, availableHeight: I }));
					const q = await u.getDimensions(l.floating);
					return y !== q.width || w !== q.height ? { reset: { rects: !0 } } : {};
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
function di(e) {
	var n;
	return (n = (p1(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function p1(e) {
	return bf() ? e instanceof Node || e instanceof Dn(e).Node : !1;
}
function jr(e) {
	return bf() ? e instanceof Element || e instanceof Dn(e).Element : !1;
}
function Wi(e) {
	return bf() ? e instanceof HTMLElement || e instanceof Dn(e).HTMLElement : !1;
}
function WS(e) {
	return !bf() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Dn(e).ShadowRoot;
}
function Sf(e) {
	const { overflow: n, overflowX: i, overflowY: o, display: u } = qr(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + o + i) && u !== "inline" && u !== "contents";
}
function wj(e) {
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
var Ej = /transform|translate|scale|rotate|perspective|filter/,
	_j = /paint|layout|strict|content/,
	Oa = (e) => !!e && e !== "none",
	Em;
function Zg(e) {
	const n = jr(e) ? qr(e) : e;
	return (
		Oa(n.transform) ||
		Oa(n.translate) ||
		Oa(n.scale) ||
		Oa(n.rotate) ||
		Oa(n.perspective) ||
		(!Fg() && (Oa(n.backdropFilter) || Oa(n.filter))) ||
		Ej.test(n.willChange || "") ||
		_j.test(n.contain || "")
	);
}
function Cj(e) {
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
function qr(e) {
	return Dn(e).getComputedStyle(e);
}
function Ef(e) {
	return jr(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ua(e) {
	if (as(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (WS(e) && e.host) || di(e);
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
	const n = qr(e);
	let i = parseFloat(n.width) || 0,
		o = parseFloat(n.height) || 0;
	const u = Wi(e),
		l = u ? e.offsetWidth : i,
		f = u ? e.offsetHeight : o,
		h = Gc(i) !== l || Gc(o) !== f;
	return (h && ((i = l), (o = f)), { width: i, height: o, $: h });
}
function Qg(e) {
	return jr(e) ? e : e.contextElement;
}
function $o(e) {
	const n = Qg(e);
	if (!Wi(n)) return li(1);
	const i = n.getBoundingClientRect(),
		{ width: o, height: u, $: l } = S1(n);
	let f = (l ? Gc(i.width) : i.width) / o,
		h = (l ? Gc(i.height) : i.height) / u;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var Tj = li(0);
function w1(e) {
	const n = Dn(e);
	return !Fg() || !n.visualViewport ? Tj : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function xj(e, n, i) {
	return (n === void 0 && (n = !1), !!i && n && i === Dn(e));
}
function Va(e, n, i, o) {
	(n === void 0 && (n = !1), i === void 0 && (i = !1));
	const u = e.getBoundingClientRect(),
		l = Qg(e);
	let f = li(1);
	n && (o ? jr(o) && (f = $o(o)) : (f = $o(e)));
	const h = xj(l, i, o) ? w1(l) : li(0);
	let m = (u.left + h.x) / f.x,
		g = (u.top + h.y) / f.y,
		p = u.width / f.x,
		b = u.height / f.y;
	if (l && o) {
		const y = Dn(l),
			w = jr(o) ? Dn(o) : o;
		let E = y,
			T = Gm(E);
		for (; T && w !== E;) {
			const x = $o(T),
				M = T.getBoundingClientRect(),
				L = qr(T),
				A = M.left + (T.clientLeft + parseFloat(L.paddingLeft)) * x.x,
				k = M.top + (T.clientTop + parseFloat(L.paddingTop)) * x.y;
			((m *= x.x), (g *= x.y), (p *= x.x), (b *= x.y), (m += A), (g += k), (E = Dn(T)), (T = Gm(E)));
		}
	}
	return Jc({ width: p, height: b, x: m, y: g });
}
function _f(e, n) {
	const i = Ef(e).scrollLeft;
	return n ? n.left + i : Va(di(e)).left + i;
}
function E1(e, n) {
	const i = e.getBoundingClientRect();
	return { x: i.left + n.scrollLeft - _f(e, i), y: i.top + n.scrollTop };
}
function Oj(e) {
	let { elements: n, rect: i, offsetParent: o, strategy: u } = e;
	const l = u === "fixed",
		f = di(o),
		h = n ? wf(n.floating) : !1;
	if (o === f || (h && l)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		g = li(1);
	const p = li(0),
		b = Wi(o);
	if ((b || !l) && ((as(o) !== "body" || Sf(f)) && (m = Ef(o)), b)) {
		const w = Va(o);
		((g = $o(o)), (p.x = w.x + o.clientLeft), (p.y = w.y + o.clientTop));
	}
	const y = f && !b && !l ? E1(f, m) : li(0);
	return {
		width: i.width * g.x,
		height: i.height * g.y,
		x: i.x * g.x - m.scrollLeft * g.x + p.x + y.x,
		y: i.y * g.y - m.scrollTop * g.y + p.y + y.y,
	};
}
function Aj(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Rj(e) {
	const n = Ef(e),
		i = e.ownerDocument.body,
		o = ui(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		u = ui(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let l = -n.scrollLeft + _f(e);
	const f = -n.scrollTop;
	return (
		qr(i).direction === "rtl" && (l += ui(e.clientWidth, i.clientWidth) - o),
		{ width: o, height: u, x: l, y: f }
	);
}
var Nj = 25;
function Mj(e, n, i) {
	i === void 0 && (i = "viewport");
	const o = i === "layoutViewport",
		u = Dn(e),
		l = di(e),
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
		x <= Nj && (h -= x);
	}
	return { width: h, height: m, x: g, y: p };
}
function Dj(e, n) {
	const i = Va(e, !0, n === "fixed"),
		o = i.top + e.clientTop,
		u = i.left + e.clientLeft,
		l = $o(e);
	return { width: e.clientWidth * l.x, height: e.clientHeight * l.y, x: u * l.x, y: o * l.y };
}
function ew(e, n, i) {
	let o;
	if (n === "viewport" || n === "layoutViewport") o = Mj(e, i, n);
	else if (n === "document") o = Rj(di(e));
	else if (jr(n)) o = Dj(n, i);
	else {
		const u = w1(e);
		o = { x: n.x - u.x, y: n.y - u.y, width: n.width, height: n.height };
	}
	return Jc(o);
}
function zj(e, n) {
	const i = n.get(e);
	if (i) return i;
	let o = Su(e, [], !1).filter((h) => jr(h) && as(h) !== "body"),
		u = null;
	const l = qr(e).position === "fixed";
	let f = l ? Ua(e) : e;
	for (; jr(f) && !bu(f);) {
		const h = qr(f),
			m = Zg(f),
			g = u ? u.position : l ? "fixed" : "";
		(!m && (g === "fixed" || (g === "absolute" && h.position === "static")) ? (o = o.filter((p) => p !== f)) : (u = h),
			(f = Ua(f)));
	}
	return (n.set(e, o), o);
}
function Ij(e) {
	let { element: n, boundary: i, rootBoundary: o, strategy: u } = e;
	const l = [...(i === "clippingAncestors" ? (wf(n) ? [] : zj(n, this._c)) : [].concat(i)), o],
		f = ew(n, l[0], u);
	let h = f.top,
		m = f.right,
		g = f.bottom,
		p = f.left;
	for (let b = 1; b < l.length; b++) {
		const y = ew(n, l[b], u);
		((h = ui(y.top, h)), (m = Qi(y.right, m)), (g = Qi(y.bottom, g)), (p = ui(y.left, p)));
	}
	return { width: m - p, height: g - h, x: p, y: h };
}
function kj(e) {
	const { width: n, height: i } = S1(e);
	return { width: n, height: i };
}
function jj(e, n, i) {
	const o = Wi(n),
		u = di(n),
		l = i === "fixed",
		f = Va(e, !0, l, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = li(0);
	if ((o || !l) && ((as(n) !== "body" || Sf(u)) && (h = Ef(n)), o)) {
		const p = Va(n, !0, l, n);
		((m.x = p.x + n.clientLeft), (m.y = p.y + n.clientTop));
	}
	!o && u && (m.x = _f(u));
	const g = u && !o && !l ? E1(u, h) : li(0);
	return { x: f.left + h.scrollLeft - m.x - g.x, y: f.top + h.scrollTop - m.y - g.y, width: f.width, height: f.height };
}
function _m(e) {
	return qr(e).position === "static";
}
function tw(e, n) {
	if (!Wi(e) || qr(e).position === "fixed") return null;
	if (n) return n(e);
	let i = e.offsetParent;
	return (di(e) === i && (i = i.ownerDocument.body), i);
}
function _1(e, n) {
	const i = Dn(e);
	if (wf(e)) return i;
	if (!Wi(e)) {
		let u = Ua(e);
		for (; u && !bu(u);) {
			if (jr(u) && !_m(u)) return u;
			u = Ua(u);
		}
		return i;
	}
	let o = tw(e, n);
	for (; o && wj(o) && _m(o);) o = tw(o, n);
	return o && bu(o) && _m(o) && !Zg(o) ? i : o || Cj(e) || i;
}
var qj = async function (e) {
	const n = this.getOffsetParent || _1,
		i = this.getDimensions,
		o = await i(e.floating);
	return {
		reference: jj(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: o.width, height: o.height },
	};
};
function Lj(e) {
	return qr(e).direction === "rtl";
}
var Uj = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Oj,
	getDocumentElement: di,
	getClippingRect: Ij,
	getOffsetParent: _1,
	getElementRects: qj,
	getClientRects: Aj,
	getDimensions: kj,
	getScale: $o,
	isElement: jr,
	isRTL: Lj,
};
function C1(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function Vj(e, n, i) {
	let o = null,
		u;
	const l = di(e);
	function f() {
		var p;
		(clearTimeout(u), (p = o) == null || p.disconnect(), (o = null));
	}
	function h(p, b) {
		(p === void 0 && (p = !1), b === void 0 && (b = 1), f());
		const y = e.getBoundingClientRect(),
			{ left: w, top: E, width: T, height: x } = y;
		if ((p || n(), !T || !x)) return;
		const M = _c(E),
			L = _c(l.clientWidth - (w + T)),
			A = _c(l.clientHeight - (E + x)),
			k = _c(w),
			N = { rootMargin: -M + "px " + -L + "px " + -A + "px " + -k + "px", threshold: ui(0, Qi(1, b)) || 1 };
		let I = !0;
		function O(q) {
			const $ = q[0].intersectionRatio;
			if (!C1(y, e.getBoundingClientRect())) return h();
			if ($ !== b) {
				if (!I) return h();
				$
					? h(!1, $)
					: (u = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			I = !1;
		}
		try {
			o = new IntersectionObserver(O, { ...N, root: l.ownerDocument });
		} catch {
			o = new IntersectionObserver(O, N);
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
function Bj(e, n, i, o) {
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
	p.forEach((M) => {
		(u && M.addEventListener("scroll", i), l && M.addEventListener("resize", i));
	});
	const b = g && h ? Vj(g, i, l) : null;
	let y = -1,
		w = null;
	f &&
		((w = new ResizeObserver((M) => {
			let [L] = M;
			(L &&
				L.target === g &&
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
		const M = Va(e);
		(T && !C1(T, M) && i(), (T = M), (E = requestAnimationFrame(x)));
	}
	return (
		i(),
		() => {
			var M;
			(p.forEach((L) => {
				(u && L.removeEventListener("scroll", i), l && L.removeEventListener("resize", i));
			}),
				b?.(),
				(M = w) == null || M.disconnect(),
				(w = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var Pj = yj,
	$j = pj,
	Hj = gj,
	Zj = Sj,
	Fj = mj,
	Qj = bj,
	Yj = (e, n, i) => {
		const o = new Map(),
			u = i ?? {},
			l = { ...Uj, ...u.platform, _c: o };
		return hj(e, n, { ...u, platform: l });
	},
	Kj = "div",
	Ws = new WeakMap();
function nw(e = 0, n = 0, i = 0, o = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, i, o);
	const u = { x: e, y: n, width: i, height: o, top: n, right: e + i, bottom: n + o, left: e };
	return { ...u, toJSON: () => u };
}
function Gj(e) {
	if (!e) return nw();
	const { x: n, y: i, width: o, height: u } = e;
	return nw(n, i, o, u);
}
function Xj(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				o = n?.(i);
			return o || !i ? Gj(o) : i.getBoundingClientRect();
		},
	};
}
function Jj(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function rw(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function Wj(e) {
	return typeof e == "number" ? e : Math.max(e.left ?? 0, e.right ?? 0);
}
function e4(e, n) {
	return Pj(({ placement: i }) => {
		const o = (e?.clientHeight || 0) / 2,
			u = typeof n.gutter == "number" ? n.gutter + o : (n.gutter ?? o);
		return { crossAxis: i.split("-")[1] ? void 0 : n.shift, mainAxis: u, alignmentAxis: n.shift };
	});
}
function t4(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Zt(!n || n.every(Jj), !1), Hj({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function n4(e) {
	if (!(!e.slide && !e.overlap))
		return $j({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: Qj() });
}
function r4(e, n) {
	return Zj({
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
function i4(e, n) {
	if (e) return Fj({ element: e, padding: n.arrowPadding });
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
		getAnchorRect: M,
		updatePosition: L,
		...A
	}) {
		const k = Vg();
		((n = n || k), Zt(n, !1));
		const N = pe(n, "arrowElement"),
			I = pe(n, "anchorElement"),
			O = u && o && !i,
			q = pe(n, O ? ["disclosureElement"] : [], (ce) => (O ? ce.disclosureElement : null)),
			$ = pe(n, "popoverElement"),
			ne = pe(n, "unstable_placing"),
			D = pe(n, "contentElement"),
			R = pe(n, "placement"),
			B = pe(n, "mounted"),
			F = pe(n, "rendered"),
			G = (0, _.useRef)(null),
			V = (0, _.useRef)(null),
			ee = !!$ && V.current === $,
			re = !ne || ee,
			U = ut(l),
			te = Ae((ce) => {
				const ve = U(ce);
				return (n?.getState().unstable_placing || (V.current = $), ve);
			});
		Ne(
			() =>
				nt(n, ["open"], () => {
					V.current = null;
				}),
			[n],
		);
		const { portalRef: Y, domReady: ue } = Og(o, A.portalRef),
			xe = Ae(M),
			me = Ae(L),
			j = !!L,
			ae = typeof x == "number" ? x : (x.top ?? 0),
			W = typeof x == "number" ? x : (x.right ?? 0),
			fe = typeof x == "number" ? x : (x.bottom ?? 0),
			Ee = typeof x == "number" ? x : (x.left ?? 0),
			_e = !B && Nu(B, A.hidden, A.alwaysVisible);
		(Ne(() => {
			if ((B && n?.setState("unstable_placing", !0), !$?.isConnected)) return;
			const ce = { top: ae, right: W, bottom: fe, left: Ee };
			if (($.style.setProperty("--popover-overflow-padding", `${Wj(ce)}px`), _e && !j)) return;
			const ve = Xj(I, xe);
			let Ge = !1,
				ct = !1;
			const mt = () => !!(Ge || !$.isConnected),
				Et = async () => {
					if (mt() || !B) return;
					N || (G.current = G.current || document.createElement("div"));
					const Qe = N || G.current,
						dn = [
							e4(Qe, { gutter: E, shift: g }),
							t4({ flip: m, overflowPadding: ce }),
							n4({ slide: p, shift: g, overlap: b, overflowPadding: ce }),
							i4(Qe, { arrowPadding: T }),
							r4({ sameWidth: y, fitViewport: w, overflowPadding: ce }, mt),
						],
						At = await Yj(ve, $, { placement: R, strategy: h ? "fixed" : "absolute", middleware: dn });
					if (mt()) return;
					n?.setState("currentPlacement", At.placement);
					const Fn = rw(At.x),
						Qn = rw(At.y);
					if (
						(Object.assign($.style, { top: "0", left: "0", transform: `translate3d(${Fn}px,${Qn}px,0)` }),
						(ct = !0),
						Qe && At.middlewareData.arrow)
					) {
						const { x: _t, y: qt } = At.middlewareData.arrow,
							hn = Bg(At.placement),
							Qt = Qe.clientWidth / 2,
							ge = Qe.clientHeight / 2,
							Te = _t != null ? _t + Qt : -Qt,
							pt = qt != null ? qt + ge : -ge;
						($.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${Te}px calc(100% + ${ge}px)`,
								bottom: `${Te}px ${-ge}px`,
								left: `calc(100% + ${Qt}px) ${pt}px`,
								right: `${-Qt}px ${pt}px`,
							}[hn],
						),
							Object.assign(Qe.style, {
								left: _t != null ? `${_t}px` : "",
								top: qt != null ? `${qt}px` : "",
								right: "",
								bottom: "",
								[hn]: "100%",
							}));
					}
				},
				Ue = Bj(
					ve,
					$,
					async () => {
						if (!mt()) {
							try {
								j ? await me({ updatePosition: Et }) : await Et();
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
		}, [n, F, $, N, I, R, B, _e, ue, h, m, g, p, b, y, w, E, T, ae, W, fe, Ee, xe, j, me]),
			Ne(() => {
				if (!B || !ue || !$?.isConnected || !D?.isConnected) return;
				const ce = () => {
					$.style.zIndex = getComputedStyle(D).zIndex;
				};
				ce();
				let ve = requestAnimationFrame(() => {
					ve = requestAnimationFrame(ce);
				});
				return () => cancelAnimationFrame(ve);
			}, [B, ue, $, D]),
			Ne(() => {
				if (!n) return;
				const ce = n;
				Ws.set(ce, (Ws.get(ce) ?? 0) + 1);
				const ve = nt(ce, ["mounted"], (Ge) => {
					ce.setState("unstable_placing", Ge.mounted);
				});
				return () => {
					(ve(),
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
			(A = { "data-placing": ne || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = d1({
				store: n,
				modal: i,
				portal: o,
				preserveTabOrder: u,
				preserveTabOrderAnchor: q || I,
				autoFocusOnShow: re && !!l && te,
				...A,
				portalRef: Y,
				unstable_wrapperElement: $,
			})),
			A
		);
	}),
	CL = Mu(
		Fe(function (n) {
			const i = Yg(n);
			return Je(Kj, i);
		}),
		Vg,
	),
	zu = Ur([m1], [pf]),
	TL = zu.useContext,
	xL = zu.useScopedContext,
	T1 = zu.useProviderContext,
	a4 = zu.ContextProvider,
	x1 = zu.ScopedContextProvider;
function O1(e) {
	return [e.clientX, e.clientY];
}
function o4(e, n) {
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
			M = (w - T) * (i - y) - (y - E) * (o - w);
		if (T < w) {
			if (o >= T && o < w) {
				if (M === 0) return !0;
				M > 0 && (o === T ? o > x && (u = !u) : (u = !u));
			}
		} else if (w < T) {
			if (o > w && o <= T) {
				if (M === 0) return !0;
				M < 0 && (o === T ? o < x && (u = !u) : (u = !u));
			}
		} else if (o === w && ((i >= E && i <= y) || (i >= y && i <= E))) return !0;
	}
	return u;
}
function s4(e, n) {
	const { top: i, right: o, bottom: u, left: l } = n,
		[f, h] = e;
	return [f < l ? "left" : f > o ? "right" : null, h < i ? "top" : h > u ? "bottom" : null];
}
function u4(e, n) {
	const i = e.getBoundingClientRect(),
		{ top: o, right: u, bottom: l, left: f } = i,
		[h, m] = s4(n, i),
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
var l4 = "div";
function c4(e, n, i, o) {
	return !!(Hi(n) || e.includes(n) || i.some((u) => u && e.includes(u)) || o?.some((u) => Hi(u) || e.includes(u)));
}
function iw({ event: e, element: n, enterPointRef: i, disablePointerEvents: o, refreshEnterPoint: u = !1 }) {
	const l = i.current;
	if (!l) return !1;
	const f = O1(e),
		h = u4(n, l);
	return o4(f, h) ? (u && (i.current = f), o(e) && (e.preventDefault(), e.stopPropagation()), !0) : !1;
}
function f4({ store: e, ...n }) {
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
			M = ut(l),
			L = !!f,
			A = ut(f),
			k = pe(n, "open"),
			N = pe(n, "mounted"),
			I = (0, _.useCallback)(() => {
				(window.clearTimeout(b.current), (b.current = 0));
			}, []);
		((0, _.useEffect)(() => {
			if (!E || !N || (!x && !L)) return;
			const R = g.current;
			return R
				? en(
						Wt(
							"mousemove",
							(F) => {
								if (!n || !T()) return;
								const { anchorElement: G, disclosureElement: V, hideTimeout: ee, timeout: re } = n.getState(),
									U = F.composedPath(),
									te = [G, V],
									Y = te.find((ue) => ue && U.includes(ue));
								if (c4(U, R, te, p.current)) {
									((y.current = Y ? O1(F) : null), I());
									return;
								}
								b.current ||
									iw({ event: F, element: R, enterPointRef: y, disablePointerEvents: A, refreshEnterPoint: !0 }) ||
									(M(F) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ee ?? re)));
							},
							!0,
						),
						I,
					)
				: void 0;
		}, [n, T, E, N, x, L, p, I, A, M]),
			(0, _.useEffect)(() => {
				if (!E || !N || !L) return;
				const R = (B) => {
					const F = g.current;
					F && iw({ event: B, element: F, enterPointRef: y, disablePointerEvents: A });
				};
				return en(Wt("mouseenter", R, !0), Wt("mouseover", R, !0), Wt("mouseout", R, !0), Wt("mouseleave", R, !0));
			}, [E, N, L, A]),
			(0, _.useEffect)(() => {
				E && (k || n?.setAutoFocusOnShow(!1));
			}, [n, E, k]));
		const O = yu(k);
		(0, _.useEffect)(() => {
			if (E)
				return () => {
					O.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, E]);
		const q = (0, _.useContext)(aw);
		Ne(() => {
			if (i || !o || !N || !E) return;
			const R = g.current;
			if (R) return q?.(R);
		}, [i, o, N, E, q]);
		const $ = (0, _.useCallback)(
			(R) => {
				(I(), (p.current = [...p.current, R]));
				const B = q?.(R);
				return () => {
					(I(), (p.current = p.current.filter((F) => F !== R)), B?.());
				};
			},
			[I, q],
		);
		((h = Ht(h, (R) => (0, S.jsx)(x1, { value: n, children: (0, S.jsx)(aw.Provider, { value: $, children: R }) }), [
			n,
			$,
		])),
			(h = { ...h, ref: jt(g, h.ref) }),
			(h = f4({ store: n, ...h })));
		const ne = pe(n, ["autoFocusOnShow"], (R) => i || R.autoFocusOnShow),
			D = A1({
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
				autoFocusOnShow: ne,
				...h,
				portalRef: w,
				hideOnEscape: D.hideOnEscape,
				onClose: D.onClose,
			})),
			h
		);
	}),
	OL = Mu(
		Fe(function (n) {
			const i = R1(n);
			return Je(l4, i);
		}),
		T1,
	),
	Iu = Ur(),
	d4 = Iu.useContext,
	AL = Iu.useScopedContext,
	RL = Iu.useProviderContext,
	h4 = Iu.ContextProvider,
	m4 = Iu.ScopedContextProvider,
	ku = Ur([h4], [m4]),
	NL = ku.useContext,
	Cf = ku.useScopedContext,
	g4 = ku.useProviderContext,
	Tf = ku.ContextProvider,
	ju = ku.ScopedContextProvider,
	v4 = (0, _.createContext)(void 0),
	y4 = (0, _.createContext)(void 0),
	qu = Ur([Tf], [ju]),
	p4 = qu.useContext,
	b4 = qu.useScopedContext,
	ML = qu.useProviderContext,
	DL = qu.ContextProvider,
	zL = qu.ScopedContextProvider,
	Lu = Ur([Tf, a4], [ju, x1]),
	N1 = Lu.useContext,
	S4 = Lu.useScopedContext,
	xf = Lu.useProviderContext,
	M1 = Lu.ContextProvider,
	w4 = Lu.ScopedContextProvider,
	IL = (0, _.createContext)(void 0),
	D1 = (0, _.createContext)(!1),
	E4 = new WeakMap();
function _4(e) {
	const n = [];
	let i = e.element.parentElement;
	for (; i;) {
		const o = E4.get(i)?.(e);
		(o && n.push(o), (i = i.parentElement));
	}
	return () => {
		for (const o of n) o();
	};
}
function C4(e) {
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
function T4(e) {
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
function x4(e = {}) {
	e.store;
	const n = e.store?.getState(),
		i = ke(e.items, n?.items, e.defaultItems, []),
		o = T4(e.store),
		u = o?.__unstableCollectionLookup ?? {
			controlledItems: new Map(i.map((L) => [L.id, L])),
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
		y = (L) => {
			const A = X2(L, (k) => k.element);
			(b.setState("renderedItems", A), p.setState("renderedItems", A));
		},
		w = (L) => {
			if (L !== u.controlledItemsSource) {
				((u.controlledItemsSource = L), l.clear());
				for (const A of L) l.set(A.id, A);
			}
		},
		E = (L, A) => {
			if (L !== "items") {
				p.setState(L, A);
				return;
			}
			p.setState("items", (k) => {
				const N = uf(A, k);
				return N === k ? k : ((u.propagatedItems = N), w(N), N);
			});
		};
	(yt(p, () => Ig(b)),
		o ||
			(fi(p, ["items"], ({ items: L }) => {
				L !== u.propagatedItems && ((u.propagatedItems = L), w(L));
			}),
			yt(b, () =>
				pu(b, ["items"], ({ items: L }) => {
					((u.propagatedItems = L), p.setState("items", L));
				}),
			)),
		yt(b, () =>
			pu(b, ["renderedItems"], (L) => {
				if (
					(L.renderedItems !== p.getState().renderedItems && y(L.renderedItems),
					typeof IntersectionObserver != "function")
				)
					return;
				let A = !0,
					k = 0;
				const N = () => {
						if (A) {
							A = !1;
							return;
						}
						(cancelAnimationFrame(k), (k = requestAnimationFrame(() => y(L.renderedItems))));
					},
					I = C4(L.renderedItems),
					O = new IntersectionObserver(N, { root: I });
				for (const q of L.renderedItems) q.element && O.observe(q.element);
				return () => {
					(cancelAnimationFrame(k), O.disconnect());
				};
			}),
		));
	const T = (L, A, k) => {
			const N = k?.registeredItems,
				I = k?.controlledItems;
			return (O) => {
				const q = N?.get(O.id),
					$ = !!q || !!I?.has(O.id);
				let ne;
				return (
					b.setState(L, (R) => {
						const B = A.ids || (R.length >= Wc && !$) ? ow(R, A) : void 0,
							F = B && !B.has(O.id) ? -1 : R.findIndex(({ id: V }) => V === O.id),
							G = R.slice();
						if (F !== -1) {
							ne = R[F];
							const V = { ...ne, ...O };
							((G[F] = V), N?.set(O.id, V));
						} else (G.push(O), N?.set(O.id, O), B?.add(O.id));
						return ((A.ids || (F === -1 && G.length >= Wc)) && Cm(G, A, B), G);
					}),
					() => {
						(N && (q ? N.set(O.id, q) : N.delete(O.id)),
							b.setState(L, (R) => {
								const B = A.ids ? ow(R, A) : void 0;
								if (!ne) {
									const V = R.filter(({ id: ee }) => ee !== O.id);
									return (B?.delete(O.id), A.ids && Cm(V, A, B), V);
								}
								const F = R.findIndex(({ id: V }) => V === O.id);
								if (F === -1) return R;
								const G = R.slice();
								return ((G[F] = ne), A.ids && Cm(G, A, B), G);
							}));
					}
				);
			};
		},
		x = T("items", h, u),
		M = T("renderedItems", m);
	return {
		...p,
		setState: E,
		registerItem: x,
		renderItem: (L) => en(x(L), M(L)),
		item: (L) => (L ? (f.size ? (f.get(L) ?? l.get(L) ?? null) : (l.get(L) ?? null)) : null),
		__unstablePrivateStore: b,
	};
}
var O4 = { id: null };
function ii(e, n) {
	return e.find((i) => (n ? !i.disabled && i.id !== n : !i.disabled));
}
function A4(e) {
	for (let n = e.length - 1; n >= 0; n -= 1) {
		const i = e[n];
		if (i && !i.disabled) return i;
	}
}
function R4(e, n) {
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
	return [...e.slice(o + 1), ...(i ? [O4] : []), ...e.slice(0, o)];
}
var N4 = 48,
	M4 = 4;
function D4(e) {
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
function z4(e) {
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
		(u.push(m), l ? l.set(f.rowId, m) : u.length === M4 && (l = new Map(u.map((g) => [g[0]?.rowId, g]))));
	}
	return u;
}
function Kg(e) {
	return e.length >= N4 ? z4(e) : D4(e);
}
function I1(e) {
	let n = 0;
	for (const { length: i } of e) i > n && (n = i);
	return n;
}
function I4(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function k4(e, n, i) {
	const o = I1(e);
	for (const u of e)
		for (let l = 0; l < o; l += 1) {
			const f = u[l];
			if (!f || (i && f.disabled)) {
				const h = l === 0 && i ? ii(u) : u[l - 1];
				u[l] = h && n !== h.id && i ? h : I4(h?.rowId);
			}
		}
	return e;
}
function j4(e) {
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
function k1(e = {}) {
	const n = e.store?.getState(),
		i = x4(e),
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
				h.setState("activeId", (b) => (b !== void 0 ? b : ii(p.renderedItems)?.id));
			}),
		));
	const m = (p = "next", b = {}) => {
			const y = h.getState(),
				w = ke(b.compositeElementInFocusOrder, b.includesBaseElement, y.compositeElementInFocusOrder),
				{
					skip: E = 0,
					activeId: T = y.activeId,
					focusShift: x = y.focusShift,
					focusLoop: M = y.focusLoop,
					focusWrap: L = y.focusWrap,
					renderedItems: A = y.renderedItems,
					rtl: k = y.rtl,
				} = b,
				N = p === "up" || p === "down",
				I = p === "next" || p === "down",
				O = I ? k && !N : !k || N,
				q = x && !E;
			if (!E && !L && !w && T != null && (!N || (!q && !A.some((U) => U.rowId != null)))) {
				let U = -1;
				if (A === y.renderedItems) {
					const Y = A[0];
					if (Y && i.item(Y.id) === Y) {
						const ue = i.item(T);
						ue?.id === T && (U = A.indexOf(ue));
					}
				}
				U === -1 && (U = A.findIndex((Y) => Y.id === T));
				const te = A[U];
				if (te) {
					const Y = O ? -1 : 1,
						ue = uw({ items: A, fromIndex: U + Y, step: Y, rowId: te.rowId, excludeId: T });
					return ue !== void 0
						? ue
						: M && (N ? M !== "horizontal" : M !== "vertical")
							? uw({ items: A, fromIndex: Y === 1 ? 0 : A.length - 1, step: Y, rowId: te.rowId, excludeId: T })
							: void 0;
				}
			}
			let $ = N ? r_(k4(Kg(A), T, q)) : A;
			if ((($ = O ? i_($) : $), ($ = N ? j4($) : $), T == null)) return ii($)?.id;
			const ne = $.find((U) => U.id === T);
			if (!ne) return ii($)?.id;
			const D = $.some((U) => U.rowId),
				R = $.indexOf(ne),
				B = $.slice(R + 1),
				F = sw(B, ne.rowId);
			if (E) {
				const U = R4(F, T);
				return (U.slice(E)[0] || U[U.length - 1])?.id;
			}
			const G = M && (N ? M !== "horizontal" : M !== "vertical"),
				V = D && L && (N ? L !== "horizontal" : L !== "vertical"),
				ee = I ? (!D || N) && G && w : N ? w : !1;
			if (G) return ii(z1(V && !ee ? $ : sw($, ne.rowId), T, ee), T)?.id;
			if (V) {
				const U = ii(ee ? F : B, T);
				return ee ? U?.id || null : U?.id;
			}
			const re = ii(F, T);
			return !re && ee ? null : re?.id;
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
		first: () => ii(h.getState().renderedItems)?.id,
		last: () => A4(h.getState().renderedItems)?.id,
		next: (p) => g("next", p),
		previous: (p) => g("previous", p),
		down: (p) => g("down", p),
		up: (p) => g("up", p),
	};
}
var q4 = z1,
	L4 = ii,
	U4 = Kg,
	ef = new WeakSet();
function V4(e) {
	Zn(e) === e && (ef.add(e), queueMicrotask(() => ef.delete(e)));
}
function B4(e) {
	ef.delete(e);
}
function P4(e, n) {
	const { virtualFocus: i, compositeElement: o } = e.getState();
	if (!i || !o || !yr(o)) {
		n();
		return;
	}
	const u = o.scrollLeft,
		l = o.scrollTop;
	(n(), (o.scrollLeft = u), (o.scrollTop = l));
}
function j1(e) {
	const n = e.getState();
	return "contentElement" in n ? n.contentElement : null;
}
function q1(e) {
	const { compositeElement: n } = e.getState(),
		i = qa(n);
	return i ? (n?.contains(i) || $i(e, i) ? !0 : !!j1(e)?.contains(i)) : !1;
}
function $4({
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
		M = u ? l || x : null,
		L = !!T?.contains(x),
		A = (G) => {
			if (!M) return !0;
			const V = qa(M);
			return V === M || V === G ? !0 : q1(e);
		},
		k = (G) => {
			if ("mounted" in G) {
				if (G.mounted) w = !0;
				else if (w) return !0;
			}
			if ("open" in G) {
				if (G.open) E = !0;
				else if (E) return !0;
			}
			return n != null && G.activeId != null && G.activeId !== n;
		},
		N = (G, V) => {
			if (!("open" in G) || G.open) return !1;
			const ee = j1(e);
			if (!ee?.contains(V)) return !1;
			const { compositeElement: re } = G;
			return !re || ee.contains(re) ? !1 : Hm(V);
		},
		I = (G) => {
			const V = Ra(e, g ?? (n === void 0 ? G.activeId : n));
			return V?.element?.isConnected ? ((g = V.id), V.element) : null;
		};
	let O, q, $;
	const ne = () => {
		((y = !0), O?.(), q?.(), $?.());
	};
	let D = !1;
	const R = () => {
			D || ((D = !0), h?.());
		},
		B = () => {
			if ((q?.(), !y)) return (R(), ne());
		},
		F = () => {
			if (y) return;
			const G = e.getState();
			if (k(G)) return B();
			let V = !1;
			if (m) {
				if (!m.isConnected && ((V = p && !b && Zn(m) === Ke(m).body), (m = I(G)), !m)) return B();
			} else if (((m = I(G)), !m)) return;
			if (V) p = !1;
			else if (!A(m)) return B();
			const ee = i && L && N(G, m);
			if (ee) {
				const { activeId: U } = G;
				if (U != null && U !== g) return B();
			}
			if (i && !p && !ee) {
				((p = !0), R(), (b = !1));
				const U = m;
				O?.();
				const te = () => {
						b = !ef.has(U);
					},
					Y = () => {
						b = !1;
					};
				if (
					(U.addEventListener("blur", te),
					U.addEventListener("focus", Y),
					(O = () => {
						(U.removeEventListener("blur", te), U.removeEventListener("focus", Y));
					}),
					P4(e, () => {
						U.focus({ preventScroll: !0 });
					}),
					y)
				)
					return;
			}
			if (o && !m.hasAttribute("data-autofocus")) return ee ? void 0 : B();
			if (!Hm(m) || ("unstable_placing" in G && G.unstable_placing)) return;
			ee || B();
			const re = m;
			if (
				(q?.(),
				(q = _4({
					element: re,
					isCurrent: () => {
						const U = e.getState();
						return k(U) || U.activeId !== g ? !1 : A(re);
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
		($ = fi(e, ["activeId", "items", "mounted", "open", "unstable_placing"], F)),
		F(),
		Object.assign(ne, { settle: B })
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
				const f = $4({ store: e, ...l });
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
function H4(e, n = !1) {
	if (yr(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = Ke(e).getSelection();
		(i?.selectAllChildren(e), n && i?.collapseToEnd());
	}
}
var Xm = Symbol("FOCUS_SILENTLY");
function Z4(e) {
	((e[Xm] = !0), e.focus({ preventScroll: !0 }));
}
function F4(e) {
	const n = e[Xm];
	return (delete e[Xm], n);
}
function $i(e, n, i) {
	if (!n || n === i) return !1;
	const o = e.item(n.id);
	return !(!o || (i && o.element === i));
}
var Q4 = Symbol("cancelled"),
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
			f.activeId !== h.activeId && (l.targetId = Q4);
		}),
		l
	);
}
var Y4 = "div";
function K4(e) {
	return e.some((n) => !!n.rowId);
}
function G4(e) {
	const n = e.target;
	return n && !yr(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function X4(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function lw(e, n, i) {
	return Ae((o) => {
		if ((n?.(o), o.defaultPrevented || o.isPropagationStopped() || !cn(o) || X4(o) || G4(o))) return;
		const u = e.getState(),
			l = Ra(e, u.activeId)?.element;
		if (!l) return;
		const { view: f, ...h } = o;
		(l !== i?.current && l.focus({ preventScroll: !0 }),
			QI(l, o.nativeEvent, h) || o.preventDefault(),
			o.currentTarget.contains(l) && o.stopPropagation());
	});
}
function J4(e) {
	return L4(r_(i_(U4(e))));
}
function cw(e, n) {
	const { consumedBy: i } = Jo(e);
	return !i || i === n;
}
function fw(e, n, i) {
	e.getState().moves === i && (Jo(e).consumedBy = n);
}
var W4 = Tu(function ({ store: n, focusOnMove: i, previousElementRef: o, present: u, scrollIntoView: l }) {
		const f = pe(n, "moves"),
			h = pe(n, "compositeElement"),
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
		const h = g4();
		((n = n || h), Zt(n, !1));
		const m = (0, _.useRef)(null),
			g = (0, _.useRef)(null),
			p = L1(n),
			b = (0, _.useRef)(void 0);
		Ne(() => {
			if (!i) return;
			let D = null,
				R = !1,
				B = !1;
			const F = () => {
					if (((R = !1), B)) return;
					const { activeId: ee, compositeElement: re } = n.getState(),
						U = !!re && re === m.current && qa(re) === re,
						te = n.item(ee)?.element,
						Y = U && te?.isConnected && te !== re ? te : null;
					D !== Y && (D?.removeAttribute("data-focus"), Y?.setAttribute("data-focus", "true"), (D = Y));
				},
				G = () => {
					R || ((R = !0), queueMicrotask(F));
				};
			b.current = G;
			const V = fi(n, ["activeId", "items", "compositeElement"], G);
			return (
				G(),
				() => {
					((B = !0), (b.current = void 0), V(), D?.removeAttribute("data-focus"));
				}
			);
		}, [n, i]);
		const [, y] = R_(i ? n.setCompositeElement : null),
			w = pe(n, "virtualFocus"),
			E = pe(n, i && w ? ["activeId"] : [], (D) => (i && w ? D.activeId : null));
		Ne(() => {
			if (!n || !i || !w) return;
			const D = g.current;
			if (((g.current = null), !D)) return;
			const R = Ra(n, E)?.element || Zn(D);
			R !== D && Uo(D, { relatedTarget: R });
		}, [n, E, w, i]);
		const T = lw(n, f.onKeyDownCapture, g),
			x = lw(n, f.onKeyUpCapture, g),
			M = f.onFocusCapture,
			L = Ae((D) => {
				if ((b.current?.(), M?.(D), D.defaultPrevented || !n)) return;
				const { virtualFocus: R } = n.getState();
				if (!R) return;
				const B = D.relatedTarget,
					F = F4(D.currentTarget);
				cn(D) && F && (D.stopPropagation(), (g.current = B));
			}),
			A = f.onFocus,
			k = Ae((D) => {
				if ((A?.(D), D.defaultPrevented || !i || !n)) return;
				const { relatedTarget: R } = D,
					{ virtualFocus: B } = n.getState();
				if (B)
					cn(D) &&
						!$i(n, R) &&
						queueMicrotask(() => p({ focus: !0, markedOnly: !0, requireFocus: !0, scrollIntoView: l }));
				else if (cn(D)) {
					if (!$i(n, R)) {
						const { activeId: F } = n.getState();
						F != null && p({ id: F, markedOnly: !0, requireFocus: !0, scrollIntoView: l });
					}
					n.setActiveId(null);
				}
			}),
			N = f.onBlurCapture,
			I = Ae((D) => {
				if ((b.current?.(), N?.(D), D.defaultPrevented || !n)) return;
				const { virtualFocus: R, activeId: B, compositeElement: F } = n.getState();
				if (!R || D.currentTarget !== F) return;
				const G = Ra(n, B)?.element,
					V = D.relatedTarget,
					ee = $i(n, V),
					re = g.current;
				((g.current = null),
					cn(D) && ee
						? (V === G ? re && re !== V && Uo(re, D) : G ? Uo(G, D) : re && Uo(re, D), D.stopPropagation())
						: !$i(n, D.target) && G && Uo(G, D));
			}),
			O = f.onKeyDown,
			q = ut(u),
			$ = Ae((D) => {
				if ((O?.(D), D.nativeEvent.isComposing || D.defaultPrevented || !n || !cn(D))) return;
				const { orientation: R, items: B, renderedItems: F, activeId: G, rtl: V } = n.getState(),
					ee = Ra(n, G);
				if (ee?.element?.isConnected) return;
				const re = ee && G != null,
					U = re ? B : F,
					te = R !== "horizontal",
					Y = R !== "vertical",
					ue = K4(U);
				if (
					(D.key === "ArrowLeft" || D.key === "ArrowRight" || D.key === "Home" || D.key === "End") &&
					yr(D.currentTarget)
				)
					return;
				const W = {
					ArrowUp: (ue || te) && (() => (re ? n.up({ activeId: G, renderedItems: U }) : ue ? J4(F)?.id : n?.last())),
					ArrowRight: (ue || Y) && (() => (re ? n.next({ activeId: G, renderedItems: U }) : V ? n.last() : n.first())),
					ArrowDown: (ue || te) && (() => (re ? n.down({ activeId: G, renderedItems: U }) : n.first())),
					ArrowLeft:
						(ue || Y) && (() => (re ? n.previous({ activeId: G, renderedItems: U }) : V ? n.first() : n.last())),
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[D.key];
				if (W) {
					const fe = W();
					if (fe !== void 0) {
						if (!q(D)) return;
						(D.preventDefault(), n.move(fe));
					}
				}
			});
		((f = Ht(
			f,
			(D) =>
				(0, S.jsxs)(ju, {
					value: n,
					children: [
						D,
						i && (0, S.jsx)(W4, { store: n, focusOnMove: o, previousElementRef: g, present: p, scrollIntoView: l }),
					],
				}),
			[n, i, o, p],
		)),
			(f = {
				"aria-activedescendant": pe(n, i && w ? ["items"] : [], () => {
					if (n && i && w) return Ra(n, E)?.id;
				}),
				...f,
				ref: jt(m, y, f.ref),
				onKeyDownCapture: T,
				onKeyUpCapture: x,
				onFocusCapture: L,
				onFocus: k,
				onBlurCapture: I,
				onKeyDown: $,
			}));
		const ne = pe(n, i && !w ? ["activeId"] : [], (D) => i && (w || D.activeId === null));
		return ((f = xu({ focusable: ne, ...f })), f);
	}),
	kL = Fe(function (n) {
		const i = Gg(n);
		return Je(Y4, i);
	}),
	e3 = "div",
	dw = new WeakMap();
function t3(e) {
	let n = dw.get(e);
	return (n || ((n = { chars: "", cleanupTimeout: 0 }), dw.set(e, n)), n);
}
function Cc(e) {
	e.chars = "";
}
function n3(e, n) {
	const i = e.target;
	return i && yr(i)
		? !1
		: e.key === " " && n.chars.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function r3(e, n) {
	if (cn(e)) return !0;
	const i = e.target;
	return i ? n.some((o) => o.element === i) : !1;
}
function i3(e) {
	return e.filter((n) => !n.disabled);
}
function Nc(e, n) {
	const i = e.typeaheadText ?? (e.element?.textContent || e.children || ("value" in e && e.value));
	return i ? Pm(i).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function a3({ activeId: e, char: n, items: i, typeaheadState: o }) {
	if (!e) return i;
	const u = i.find((f) => f.id === e);
	if (!u || !Nc(u, n)) return i;
	const { chars: l } = o;
	return l !== n && Nc(u, l)
		? i
		: ((o.chars = n),
			q4(
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
				const m = t3(n);
				if (!n3(h, m)) return Cc(m);
				const { renderedItems: g, items: p, activeId: b } = n.getState();
				let y = i3(p.length > g.length ? p : g);
				if (!r3(h, y)) return Cc(m);
				(h.preventDefault(),
					window.clearTimeout(m.cleanupTimeout),
					(m.cleanupTimeout = window.setTimeout(() => {
						Cc(m);
					}, 500)));
				const w = h.key.toLowerCase();
				((m.chars += w), (y = a3({ activeId: b, char: w, items: y, typeaheadState: m })));
				const E = y.find((T) => Nc(T, m.chars));
				E ? n.move(E.id) : Cc(m);
			});
		return ((o = { ...o, onKeyDownCapture: f }), lf(o));
	}),
	jL = Fe(function (n) {
		const i = Of(n);
		return Je(e3, i);
	}),
	o3 = "div";
function s3({ store: e, ...n }) {
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
var U1 = We(function ({ store: n, alwaysVisible: i, composite: o, ...u }) {
		const l = xf();
		((n = n || l), Zt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			g = Lr(u.id),
			p = u.onKeyDown,
			b = pe(n, ["placement"], (N) => Bg(N.placement)),
			y = pe(n, ["orientation"], (N) => (N.orientation === "both" ? void 0 : N.orientation)),
			w = y !== "vertical",
			E = pe(h, ["orientation"], (N) => !!N && N.orientation !== "vertical"),
			T = Ae((N) => {
				if ((p?.(N), N.defaultPrevented)) return;
				const I = N.target;
				if (!(!cn(N) && !$i(n, I))) {
					if (Vc(I)) {
						const O = Bc(I),
							q = N.key === "ArrowLeft" || N.key === "ArrowUp",
							$ = N.key === "ArrowRight" || N.key === "ArrowDown";
						if ((q && O.start !== 0) || ($ && O.end !== l_(I).length)) return;
					}
					if (m || (h && !w)) {
						const O = {
							ArrowRight: () => b === "left" && !w,
							ArrowLeft: () => b === "right" && !w,
							ArrowUp: () => b === "bottom" && w,
							ArrowDown: () => b === "top" && w,
						}[N.key];
						if (O?.()) return (N.stopPropagation(), N.preventDefault(), n?.hide());
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
							}[N.key],
							q = O?.();
						q !== void 0 && (N.stopPropagation(), N.preventDefault(), h.move(q));
					}
				}
			});
		u = Ht(u, (N) => (0, S.jsx)(w4, { value: n, children: N }), [n]);
		const x = s3({ store: n, ...u }),
			M = pe(n, "mounted"),
			L = Nu(M, u.hidden, i),
			A = L ? { ...u.style, display: "none" } : u.style;
		((u = Ht(u, (N) => (0, S.jsx)(D1.Provider, { value: L, children: N }), [L])),
			(u = {
				"aria-labelledby": x,
				hidden: L,
				...u,
				id: g,
				ref: jt(g ? n.setContentElement : null, u.ref),
				style: A,
				onKeyDown: T,
			}));
		const k = !!n.combobox;
		return (
			(o = o ?? !k),
			o && (u = { role: "menu", "aria-orientation": y, ...u }),
			(u = Gg({ store: n, composite: o, ...u })),
			(u = Of({ store: n, typeahead: !k, ...u })),
			u
		);
	}),
	qL = Fe(function (n) {
		const i = U1(n);
		return Je(o3, i);
	}),
	u3 = "div";
function l3(e, n) {
	const i = qa(e);
	return !i || !Cg(i, e) || !ln(i)
		? !1
		: i !== n.compositeElement
			? !0
			: n.renderedItems.some((o) => o.id === n.activeId && !o.disabled);
}
var c3 = We(function ({
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
			M = T ? !1 : i;
		p = { ...p, ref: jt(y, p.ref) };
		const { "aria-labelledby": L, ...A } = U1({ store: n, alwaysVisible: h, ...p });
		p = A;
		const [k, N] = (0, _.useState)(),
			I = (0, _.useRef)(!0),
			O = pe(n, "open"),
			q = pe(n, ["autoFocusOnShow", "initialFocus", "renderedItems", "compositeElement"], (U) => {
				if (!U.autoFocusOnShow) return;
				const te = (Y) => !Y.disabled && !!Y.element;
				switch (U.initialFocus) {
					case "first":
						return U.renderedItems.find(te)?.element || null;
					case "last":
						for (let Y = U.renderedItems.length - 1; Y >= 0; Y -= 1) {
							const ue = U.renderedItems[Y];
							if (ue && te(ue)) return ue.element;
						}
						return null;
					default:
						return U.compositeElement;
				}
			});
		(0, _.useEffect)(() => {
			let U = !1;
			const te = y.current,
				Y = !I.current && !!te && l3(te, n.getState());
			return (
				(I.current = !O || (q === null && !Y)),
				N((ue) => {
					if (U) return;
					if (M && O && q === void 0) return ue;
					if (q === void 0) return;
					if (q && q === ue?.current) return ue;
					if (Y && ue) return ((ue.current = q), ue);
					const xe = (0, _.createRef)();
					return ((xe.current = q), xe);
				}),
				() => {
					U = !0;
				}
			);
		}, [n, M, O, q]);
		const $ = !!k || !!p.initialFocus || M,
			ne = l === !1 ? !1 : $ && l,
			D = pe(n, ["disclosureElement", "anchorElement"], (U) => U.disclosureElement || U.anchorElement),
			R = pe(n, ["disclosureElement", "contentElement"], (U) => {
				const { disclosureElement: te, contentElement: Y } = U;
				return !te?.isConnected || f1(te) || Y?.contains(te) ? null : te;
			}),
			B = M ? R : null,
			F = (0, _.useMemo)(() => [g, B], [g, B]),
			G = pe(n.combobox || n, "contentElement"),
			V = pe(w?.combobox || w, "contentElement"),
			ee = (0, _.useMemo)(() => {
				if (!V || !G) return;
				const U = G.getAttribute("role"),
					te = V.getAttribute("role");
				if (!((te === "menu" || te === "menubar") && U === "menu")) return V;
			}, [G, V]);
		ee !== void 0 && (p = { preserveTabOrderAnchor: ee, ...p });
		const re = A1({ hideOnEscape: u, onClose: p.onClose, onEscapeClose: () => w?.hideAll() });
		return (
			(p = R1({
				store: n,
				alwaysVisible: h,
				initialFocus: k,
				autoFocusOnShow: ne,
				finalFocus: D,
				...p,
				hideOnEscape: re.hideOnEscape,
				onClose: re.onClose,
				hideOnHoverOutside(U) {
					const te = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(U) : (f ?? (T ? !0 : x ? (te ? !Hi(te) : !0) : !1)))
						? U.defaultPrevented || !T || !te || (nI(te, "mouseout", U), !Hi(te))
							? !0
							: (requestAnimationFrame(() => {
									Hi(te) || n?.hide();
								}),
								!1)
						: !1;
				},
				getPersistentElements() {
					const U = m?.() || [];
					return !M || !R ? U : [...U, R];
				},
				unstable_treeSnapshotKey: F,
				modal: M,
				portal: o,
				backdrop: T ? !1 : p.backdrop,
			})),
			(p = { "aria-labelledby": L, ...p }),
			p
		);
	}),
	f3 = Mu(
		Fe(function (n) {
			const i = c3(n);
			return Je(u3, i);
		}),
		xf,
	);
function d3(e, n, i) {
	return (rs(n, [i.store, n]), Dt(e, i, "items", "setItems"), e);
}
function h3(e) {
	return { id: Lr(e.id), ...e };
}
function V1(e, n, i) {
	((e = d3(e, n, i)), Jo(e, i.store), Dt(e, i, "activeId", "setActiveId"));
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
var m3 = "button";
function hw(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? ja(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? ja(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var g3 = Symbol("command"),
	Xg = We(function ({ clickOnEnter: n = !0, clickOnSpace: i = !0, ...o }) {
		const u = (0, _.useRef)(null),
			[l, f] = (0, _.useState)(!1),
			h = o.type;
		(0, _.useEffect)(() => {
			const k = u.current;
			if (!k) return;
			const N = ja(k);
			(h !== void 0 && N && k.type === "button") || f(N);
		}, [h]);
		const [m, g] = (0, _.useState)(!1),
			p = (0, _.useRef)(!1),
			b = $a(o),
			[y, w] = Ag(o, g3, !0);
		Ne(() => {
			b && ((p.current = !1), g(!1));
		}, [b]);
		const E = o.onKeyDown,
			T = Ae((k) => {
				E?.(k);
				const N = k.currentTarget;
				if (k.defaultPrevented || y || b || !cn(k) || yr(N) || N.isContentEditable) return;
				const I = n && k.key === "Enter",
					O = i && k.key === " ",
					q = k.key === "Enter" && !n,
					$ = k.key === " " && !i;
				if (q || $) {
					k.preventDefault();
					return;
				}
				if (I || O) {
					const ne = hw(k);
					if (I) {
						if (!ne) {
							k.preventDefault();
							const { view: D, ...R } = k,
								B = () => xS(N, R);
							W2() ? Pc(N, "keyup", B) : queueMicrotask(B);
						}
					} else O && ((p.current = !0), ne || (k.preventDefault(), g(!0)));
				}
			}),
			x = o.onKeyUp,
			M = Ae((k) => {
				if ((x?.(k), y)) return;
				const N = i && k.key === " ";
				if (!p.current || !N) return;
				const I = hw(k);
				if (((p.current = !1), I || g(!1), k.defaultPrevented || !cn(k) || b || k.metaKey || I)) return;
				k.preventDefault();
				const O = k.currentTarget,
					{ view: q, ...$ } = k;
				queueMicrotask(() => xS(O, $));
			}),
			L = o.onBlur,
			A = Ae((k) => {
				(L?.(k), p.current && ((p.current = !1), g(!1)));
			});
		return (
			(o = {
				"data-active": m || void 0,
				type: l ? "button" : void 0,
				...w,
				...o,
				ref: jt(u, o.ref),
				onKeyDown: T,
				onKeyUp: M,
				onBlur: A,
			}),
			(o = xu(o)),
			o
		);
	}),
	LL = Fe(function (n) {
		const i = Xg(Za(n));
		return Je(m3, i);
	}),
	B1 = "button",
	P1 = We(function (n) {
		const i = (0, _.useRef)(null),
			o = RI(i, B1),
			[u, l] = (0, _.useState)(() => !!o && ja({ tagName: o, type: n.type }));
		return (
			(0, _.useEffect)(() => {
				i.current && l(ja(i.current));
			}, []),
			(n = { role: !u && o !== "a" ? "button" : void 0, ...n, ref: jt(i, n.ref) }),
			(n = Xg(n)),
			n
		);
	}),
	UL = Fe(function (n) {
		const i = P1(Za(n));
		return Je(B1, i);
	}),
	v3 = "button",
	y3 = Symbol("disclosure"),
	$1 = We(function ({ store: n, toggleOnClick: i = !0, ...o }) {
		const u = Mg();
		((n = n || u), Zt(n, !1));
		const l = (0, _.useRef)(null),
			[f, h] = (0, _.useState)(!1),
			m = pe(n, "disclosureElement"),
			g = pe(n, "open"),
			p = (0, _.useCallback)(
				(x) => {
					const M = l.current;
					if (((l.current = x), x)) {
						n?.getState().disclosureElement?.isConnected || n.setDisclosureElement(x);
						return;
					}
					n?.getState().disclosureElement === M && n.setDisclosureElement(null);
				},
				[n],
			);
		(0, _.useEffect)(() => {
			let x = m === l.current;
			(m?.isConnected || (n?.setDisclosureElement(l.current), (x = !0)), h(g && x));
		}, [m, n, g]);
		const b = o.onClick,
			y = ut(i),
			[w, E] = Ag(o, y3, !0),
			T = Ae((x) => {
				(b?.(x), !x.defaultPrevented && (w || (y(x) && (n?.setDisclosureElement(x.currentTarget), n?.toggle()))));
			});
		return (
			(o = {
				"aria-expanded": f,
				"aria-controls": pe(n, "contentElement")?.id,
				...E,
				...o,
				ref: jt(p, o.ref),
				onClick: T,
			}),
			(o = P1(o)),
			o
		);
	}),
	VL = Fe(function (n) {
		const i = $1(Za(n));
		return Je(v3, i);
	}),
	p3 = "button",
	H1 = We(function ({ store: n, ...i }) {
		const o = Ru();
		((n = n || o), Zt(n, !1));
		const u = pe(n, "contentElement");
		return ((i = { "aria-haspopup": _u(u, "dialog"), ...i }), (i = $1({ store: n, ...i })), i);
	}),
	BL = Fe(function (n) {
		const i = H1(Za(n));
		return Je(p3, i);
	}),
	b3 = "button",
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
	PL = Fe(function (n) {
		const i = Z1(Za(n));
		return Je(b3, i);
	}),
	S3 = We(function ({
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
			p = Ae((A) => (f && !h ? !0 : gI(A)));
		((0, _.useEffect)(() => () => window.clearTimeout(g.current), []),
			(0, _.useEffect)(
				() =>
					Wt(
						"mouseleave",
						(k) => {
							const N = m.current;
							N && k.target === N && (window.clearTimeout(g.current), (g.current = 0));
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
				const k = A.currentTarget;
				if (p(k) || ((f || s_(k)) && !w(A)) || !y(A)) return;
				(u && n.setAnchorElement(k), n.setDisclosureElement(k));
				const { showTimeout: N, timeout: I } = n.getState(),
					O = () => {
						((g.current = 0),
							E() &&
								(p(k) ||
									(u && n.setAnchorElement(k),
									n.show(),
									queueMicrotask(() => {
										n.setDisclosureElement(k);
									}))));
					},
					q = N ?? I;
				q === 0 ? O() : (g.current = window.setTimeout(O, q));
			}),
			x = l.onClick,
			M = Ae((A) => {
				(x?.(A), window.clearTimeout(g.current), (g.current = 0));
			}),
			L = (0, _.useCallback)(
				(A) => {
					if (((m.current = A), !u)) return;
					const { anchorElement: k } = n.getState();
					k?.isConnected || n.setAnchorElement(A);
				},
				[n, u],
			);
		return ((l = { ...l, ref: jt(L, l.ref), onMouseMove: T, onClick: M }), (l = xu(l)), l);
	}),
	w3 = "button";
function E3(e, n) {
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
var _3 = We(function ({
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
			E = (R) => w || s_(R),
			T = () => {
				const R = m.current;
				R && (n?.setDisclosureElement(R), n?.show());
			},
			x = f.onFocus,
			M = Ae((R) => {
				if (
					(x?.(R),
					E(R.currentTarget) || R.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !p) || !y)
				)
					return;
				const { items: B } = p.getState();
				mw(B, R.currentTarget) && T();
			}),
			L = pe(n, ["placement"], (R) => Bg(R.placement)),
			A = f.onKeyDown,
			k = Ae((R) => {
				if ((A?.(R), E(R.currentTarget) || R.defaultPrevented)) return;
				const B = E3(R, L);
				if (B) {
					R.preventDefault();
					const { open: F } = n.getState();
					if (F) {
						const G = B === "last" ? n.last() : n.first();
						n.move(G);
						return;
					}
					(T(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(B));
				}
			}),
			N = f.onClick,
			I = Ae((R) => {
				if ((N?.(R), R.defaultPrevented || !n)) return;
				const B = !R.detail,
					{ open: F } = n.getState();
				((!F || B) && ((!b || B) && n.setAutoFocusOnShow(!0), n.setInitialFocus(B ? "first" : "container")), b && T());
			});
		((f = Ht(f, (R) => (0, S.jsx)(M1, { value: n, children: R }), [n])),
			b && (f = { ...f, render: (0, S.jsx)(Kc.div, { render: f.render }) }));
		const O = Lr(f.id),
			q = pe(g?.combobox || g, "contentElement"),
			$ = b || y ? f_(q, "menuitem") : void 0,
			ne = pe(n, "contentElement"),
			D = !!n.combobox;
		return (
			(f = {
				role: $,
				"aria-haspopup": _u(ne, D ? "dialog" : "menu"),
				...f,
				id: O,
				ref: jt(m, f.ref),
				onFocus: M,
				onKeyDown: k,
				onClick: I,
			}),
			(f = S3({
				store: n,
				focusable: i,
				accessibleWhenDisabled: o,
				...f,
				unstable_showOnHoverWhenDisabled: l,
				showOnHover: (R) => {
					if (
						!(() => {
							if (typeof u == "function") return u(R);
							if (u != null) return u;
							if (b) return !0;
							if (!p) return !1;
							const { items: G } = p.getState();
							return y && mw(G);
						})()
					)
						return !1;
					const F = y ? p : g;
					return (F && F.setActiveId(R.currentTarget.id), !0);
				},
			})),
			(f = Z1({ store: n, toggleOnClick: !b, focusable: i, accessibleWhenDisabled: o, ...f })),
			(f = Of({ store: n, typeahead: y, ...f })),
			f
		);
	}),
	C3 = Fe(function (n) {
		const i = _3(n);
		return Je(w3, Za(i));
	}),
	T3 = "div";
function x3(e) {
	const n = e.relatedTarget;
	return Mn(n) ? ht(e.currentTarget, n) : !1;
}
var Jm = Symbol("composite-hover");
function O3(e) {
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
						(x3(E) ||
							O3(E) ||
							(m(E) && b(E) && (n?.setActiveId(null), n?.getState().compositeElement?.focus({ preventScroll: !0 })))));
			}),
			w = (0, _.useCallback)((E) => {
				E && (E[Jm] = !0);
			}, []);
		return ((u = { ...u, ref: jt(w, u.ref), onMouseMove: g, onMouseLeave: y }), u);
	}),
	$L = Tu(
		Fe(function (n) {
			const i = Jg(n);
			return Je(T3, i);
		}),
	),
	A3 = "div",
	F1 = We(function ({ store: n, shouldRegisterItem: i = !0, getItem: o = a_, element: u, ...l }) {
		const f = d4();
		n = n || f;
		const h = Lr(l.id),
			m = (0, _.useRef)(u);
		return (
			(0, _.useEffect)(() => {
				const g = m.current;
				if (!h || !g || !i) return;
				const p = o({ id: h, element: g });
				return n?.renderItem(p);
			}, [h, i, o, n]),
			(l = { ...l, ref: jt(m, l.ref) }),
			l
		);
	}),
	HL = Fe(function (n) {
		const i = F1(n);
		return Je(A3, i);
	}),
	R3 = "button";
function N3(e) {
	return Vc(e) ? !0 : e.tagName === "INPUT" && !ja(e);
}
function M3(e, n = !1) {
	const i = e.clientHeight,
		{ top: o } = e.getBoundingClientRect(),
		u = Math.max(i * 0.875, i - 40) * 1.5,
		l = n ? i - u + o : u + o;
	return e.tagName === "HTML" ? l + e.scrollTop : l;
}
function D3(e, n = !1) {
	const { top: i } = e.getBoundingClientRect();
	return n ? i + e.clientHeight : i;
}
function gw(e, n, i, o = !1) {
	if (!n || !i) return;
	const { renderedItems: u } = n.getState(),
		l = bg(e);
	if (!l) return;
	const f = M3(l, o);
	let h, m;
	for (let g = 0; g < u.length; g += 1) {
		const p = h;
		if (((h = i(g)), !h)) break;
		if (h === p) continue;
		const b = Ra(n, h)?.element;
		if (!b) continue;
		const y = D3(b, o) - f,
			w = Math.abs(y);
		if ((o && y <= 0) || (!o && y >= 0)) {
			m !== void 0 && m < w && (h = p);
			break;
		}
		m = w;
	}
	return h;
}
function z3(e, n) {
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
		const w = mI(b),
			E = Lr(b.id),
			T = (0, _.useRef)(null),
			x = (0, _.useRef)(null),
			M = (0, _.useCallback)((W) => {
				const fe = x.current;
				(!W && fe && V4(fe), W && B4(W), (x.current = W));
			}, []),
			L = (0, _.useContext)(y4),
			A = $a(b),
			k = A && !w,
			N = A && b.focusable === !1,
			I = b.shouldRegisterItem,
			O = (W) => {
				if (i) return i;
				if (W && L?.compositeElement && L.compositeElement === W.compositeElement) return L.id;
			},
			{
				rowId: q,
				compositeElement: $,
				ariaSetSize: ne,
				ariaPosInSet: D,
			} = Yc(n, ["compositeElement", "renderedItems"], {
				rowId: O,
				compositeElement(W) {
					return W?.compositeElement || void 0;
				},
				ariaSetSize(W) {
					if (m != null) return m;
					if (W && L?.ariaSetSize && L.compositeElement === W.compositeElement) return L.ariaSetSize;
				},
				ariaPosInSet(W) {
					if (g != null) return g;
					if (!W || !L?.ariaPosInSet || L.compositeElement !== W.compositeElement) return;
					const fe = O(W),
						Ee = W.renderedItems.filter((_e) => _e.rowId === fe);
					return L.ariaPosInSet + Ee.findIndex((_e) => _e.id === E);
				},
			}),
			{ isActiveItem: R, isTabbable: B } = Yc(
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
					const fe = (W.element ? vI(W.element) : void 0) ?? (N || k),
						Ee = { ...W, id: E || W.id, rowId: q, disabled: fe, children: W.element?.textContent, typeaheadText: h };
					return f ? f(Ee) : Ee;
				},
				[E, q, N, k, h, f],
			),
			G = b.onFocus,
			V = (0, _.useRef)(!1),
			ee = (0, _.useRef)(null),
			re = L1(n),
			U = Ae((W) => {
				if ((G?.(W), W.defaultPrevented || tI(W) || !E || !n || z3(W, n))) return;
				const { virtualFocus: fe, compositeElement: Ee } = n.getState();
				if ((n.setActiveId(E), Vc(W.currentTarget) && H4(W.currentTarget), !fe)) {
					cn(W) && n.item(E) && re({ id: E, markedOnly: !0, requireFocus: !0, scrollIntoView: p });
					return;
				}
				if (!cn(W) || N3(W.currentTarget)) return;
				const _e = (Ge, ct) => {
					if (!ln(ct)) return;
					const mt = Ge === ct || $i(n, Ge);
					(n.item(E) && re({ id: E, markedOnly: !0, requireFocus: !0, scrollIntoView: p }),
						(V.current = !0),
						mt ? Z4(ct) : ct.focus({ preventScroll: !0 }));
				};
				if (Ee?.isConnected) {
					_e(W.relatedTarget, Ee);
					return;
				}
				if (I === !1) return;
				const { currentTarget: Ce, relatedTarget: ce } = W,
					ve = () => {
						(ee.current?.(), (ee.current = null));
					};
				(ve(),
					(ee.current = fi(n, null, () => {
						if (Zn(Ce) !== Ce) {
							ve();
							return;
						}
						const Ge = n.getState(),
							ct = Ge.compositeElement;
						ct?.isConnected && (ve(), Ge.virtualFocus && _e(ce, ct));
					})));
			}),
			te = b.onBlurCapture,
			Y = Ae((W) => {
				(te?.(W),
					!W.defaultPrevented &&
						n?.getState()?.virtualFocus &&
						V.current &&
						((V.current = !1), W.preventDefault(), W.stopPropagation()));
			}),
			ue = b.onKeyDown,
			xe = ut(o),
			me = ut(u),
			j = Ae((W) => {
				if ((ue?.(W), W.defaultPrevented || !cn(W) || !n)) return;
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
						PageUp: () => gw(fe, n, n?.up, !0),
						PageDown: () => gw(fe, n, n?.down),
					}[W.key];
				if (Ge) {
					if (Vc(fe)) {
						const mt = Bc(fe),
							Et = ce && W.key === "ArrowLeft",
							et = ce && W.key === "ArrowRight",
							Ue = Ce && W.key === "ArrowUp",
							Qe = Ce && W.key === "ArrowDown";
						if (et || Qe) {
							const { length: dn } = l_(fe);
							if (mt.end !== dn) return;
						} else if ((Et || Ue) && mt.start !== 0) return;
					}
					const ct = Ge();
					if (xe(W) || ct !== void 0) {
						if (!me(W)) return;
						(W.preventDefault(), n.move(ct));
					}
				}
			}),
			ae = (0, _.useMemo)(() => ({ id: E, compositeElement: $ }), [E, $]);
		return (
			(b = Ht(b, (W) => (0, S.jsx)(v4.Provider, { value: ae, children: W }), [ae])),
			(b = {
				"data-active-item": R || void 0,
				...b,
				id: E,
				ref: jt(T, M, b.ref),
				tabIndex: B ? b.tabIndex : -1,
				onFocus: U,
				onBlurCapture: Y,
				onKeyDown: j,
			}),
			(b = Xg(b)),
			(b = F1({ store: n, ...b, getItem: F, shouldRegisterItem: E ? I : !1 })),
			{ ...b, "aria-setsize": ne, "aria-posinset": D }
		);
	}),
	ZL = Tu(
		Fe(function (n) {
			const i = Wg(Za(n));
			return Je(R3, i);
		}),
	),
	I3 = "div";
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
var j3 = We(function ({
		store: n,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: o = !0,
		focusOnHover: u,
		blurOnHoverEnd: l,
		...f
	}) {
		const h = S4(!0),
			m = b4();
		((n = n || h || m), Zt(n, !1));
		const g = f.onClick,
			p = ut(i),
			b = "hideAll" in n ? n.hideAll : void 0,
			y = !!b,
			w = Ae((x) => {
				if ((g?.(x), x.defaultPrevented || g_(x) || m_(x) || !b)) return;
				const M = x.currentTarget.getAttribute("aria-haspopup");
				(M && M !== "false") || (p(x) && b());
			}),
			E = pe(n, ["contentElement"], (x) => ("contentElement" in x ? x.contentElement : null)),
			T = (0, _.useContext)(D1);
		return (
			(f = { role: f_(E, "menuitem"), ...f, onClick: w }),
			(f = Wg({ store: n, preventScrollOnKeyDown: o, ...f, shouldRegisterItem: T ? !1 : f.shouldRegisterItem })),
			(f = Jg({
				store: n,
				...f,
				focusOnHover(x) {
					const M = () => (typeof u == "function" ? u(x) : (u ?? !0));
					if (!n || !M()) return !1;
					const { compositeElement: L, items: A } = n.getState();
					return y
						? (x.currentTarget.hasAttribute("aria-expanded") && x.currentTarget.focus({ preventScroll: !0 }), !0)
						: k3(L, A, x.currentTarget)
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
	q3 = Tu(
		Fe(function (n) {
			const i = j3(n);
			return Je(I3, i);
		}),
	),
	Q1 = (0, _.createContext)(null),
	Uu = Ur([m1, Tf], [pf, ju]),
	L3 = Uu.useContext,
	ev = Uu.useScopedContext,
	Af = Uu.useProviderContext,
	FL = Uu.ContextProvider,
	U3 = Uu.ScopedContextProvider,
	V3 = (0, _.createContext)(void 0),
	B3 = (0, _.createContext)(!1),
	vw = (0, _.createContext)(null);
function Y1({ popover: e, ...n } = {}) {
	const i = gf(
		n.store,
		kg(e, [
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
function P3(e = {}) {
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
function $3(e, n, i) {
	return (Dt(e, i, "timeout"), Dt(e, i, "showTimeout"), Dt(e, i, "hideTimeout"), K1(e, n, i));
}
function H3({ combobox: e, parent: n, menubar: i, ...o } = {}) {
	const u = !!i && !n,
		l = gf(
			o.store,
			B_(n, ["values"]),
			kg(e, [
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
		m = k1({ ...o, store: l, orientation: ke(o.orientation, f.orientation, "vertical") }),
		g = P3({
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
function Z3(e, n, i) {
	return (
		rs(n, [i.combobox, i.parent, i.menubar, n]),
		Dt(e, i, "values", "setValues"),
		Object.assign($3(V1(e, n, i), n, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function F3(e = {}) {
	const n = N1(),
		i = p4(),
		o = Af();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : o,
	};
	const [u, l] = vf(H3, e);
	return Z3(u, l, e);
}
function Q3(e = {}) {
	const n = F3(e);
	return (0, S.jsx)(M1, { value: n, children: e.children });
}
var Y3 = "hr",
	G1 = We(function ({ orientation: n = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": n, ...i }), i);
	}),
	QL = Fe(function (n) {
		const i = G1(n);
		return Je(Y3, i);
	}),
	K3 = "hr",
	X1 = We(function ({ store: n, orientation: i, ...o }) {
		const u = Cf();
		((n = n || u), Zt(n, !1));
		const l = pe(n, ["orientation"], (f) => i ?? (f.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((o = G1({ ...o, orientation: l })), o);
	}),
	YL = Fe(function (n) {
		const i = X1(n);
		return Je(K3, i);
	}),
	G3 = "hr",
	X3 = We(function ({ store: n, ...i }) {
		const o = N1();
		return ((n = n || o), (i = X1({ store: n, ...i })), i);
	}),
	J3 = Fe(function (n) {
		const i = X3(n);
		return Je(G3, i);
	}),
	W3 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	eq = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, i, o) => (o ? o.toUpperCase() : i.toLowerCase())),
	yw = (e) => {
		const n = eq(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	J1 = (...e) =>
		e
			.filter((n, i, o) => !!n && n.trim() !== "" && o.indexOf(n) === i)
			.join(" ")
			.trim(),
	tq = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	nq = {
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
	rq = (0, _.forwardRef)(
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
					...nq,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: o ? (Number(i) * 24) / Number(n) : i,
					className: J1("lucide", u),
					...(!l && !tq(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([g, p]) => (0, _.createElement)(g, p)), ...(Array.isArray(l) ? l : [l])],
			),
	),
	tv = (e, n) => {
		const i = (0, _.forwardRef)(({ className: o, ...u }, l) =>
			(0, _.createElement)(rq, { ref: l, iconNode: n, className: J1(`lucide-${W3(yw(e))}`, `lucide-${e}`, o), ...u }),
		);
		return ((i.displayName = yw(e)), i);
	},
	iq = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	aq = tv("arrow-up", iq),
	oq = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	sq = tv("ellipsis", oq),
	uq = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	lq = tv("paperclip", uq),
	cq = (0, _.memo)(function (n) {
		const { channelName: i, items: o } = n;
		return (0, S.jsxs)(Q3, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(C3, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, S.jsx)(sq, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(f3, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: o.map((u) =>
						"separator" in u
							? (0, S.jsx)(J3, { className: "ChannelRowMenu-separator" }, u.id)
							: (0, S.jsx)(
									q3,
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
function fq(e, n) {
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
function dq(e, n) {
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
		const h = fq(o, u);
		if (!h) return eu(o);
		dq(o, h);
	};
	return (pw.set(e, i), i);
}
function hq(e) {
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
var mq = "input";
function gq(e, n, i) {
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
function vq(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function yq(e) {
	return e.find((n) => (n.disabled ? !1 : n.element?.getAttribute("role") !== "tab"))?.id;
}
var pq = We(function ({
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
		form: M,
		disabled: L,
		...A
	}) {
		const k = ev(!0),
			N = Af();
		((n = n || N || k), Zt(n, !1));
		const I = (0, _.useRef)(null),
			[O, q] = N_(),
			$ = (0, _.useRef)(!1),
			ne = (0, _.useRef)(!1),
			D = (0, _.useRef)(null),
			R = () => {
				const de = D.current;
				de != null && (cancelAnimationFrame(de), (D.current = null));
			},
			B = pe(n, ["virtualFocus"], (de) => de.virtualFocus && o),
			F = T === "inline" || T === "both",
			[G, V] = (0, _.useState)(F);
		NI(() => {
			F && V(!0);
		}, [F]);
		const ee = pe(n, "inputValue"),
			re = pe(n, ["selectedValue"], (de) => {
				if (x && Array.isArray(de.selectedValue)) return de.selectedValue;
			}),
			U = Array.isArray(re),
			te = (0, _.useRef)(void 0);
		(0, _.useEffect)(
			() =>
				nt(n, ["selectedValue", "activeId"], (de, Be) => {
					te.current = Be.selectedValue;
				}),
			[n],
		);
		const Y = pe(n, ["activeValue", "selectedValue", "activeId"], (de) => {
				if (
					F &&
					G &&
					!(
						de.activeValue &&
						Array.isArray(de.selectedValue) &&
						(de.selectedValue.includes(de.activeValue) || te.current?.includes(de.activeValue))
					)
				)
					return de.activeValue;
			}),
			ue = pe(n, "renderedItems"),
			xe = pe(n, "open"),
			me = pe(n, "contentElement"),
			j = pe(n, "unstable_placing"),
			ae = gq(ue, Y, B),
			W = (0, _.useMemo)(() => {
				if (!F || !G) return ee;
				if (ae) {
					if (Sw(ee, Y)) {
						const de = Y?.slice(ee.length) || "";
						return ee + de;
					}
					return ee;
				}
				return Y || ee;
			}, [F, G, ae, Y, ee]);
		((0, _.useEffect)(() => {
			const de = I.current;
			if (!de) return;
			const Be = () => V(!0);
			return (
				de.addEventListener("combobox-item-move", Be),
				() => {
					de.removeEventListener("combobox-item-move", Be);
				}
			);
		}, []),
			(0, _.useEffect)(() => {
				if (!F || !G || !Y || !ae || !Sw(ee, Y)) return;
				let de = za;
				return (
					queueMicrotask(() => {
						const Be = I.current;
						if (!Be) return;
						const { start: Rt, end: ft } = Bc(Be),
							pn = ee.length,
							mn = Y.length;
						(vm(Be, pn, mn),
							(de = () => {
								if (!ns(Be)) return;
								const { start: jn, end: le } = Bc(Be);
								jn === pn && le === mn && vm(Be, Rt, ft);
							}));
					}),
					() => de()
				);
			}, [O, F, G, Y, ae, ee]));
		const fe = Ae(u),
			Ee = (0, _.useRef)(null),
			_e = (0, _.useRef)(void 0),
			Ce = (0, _.useRef)(!1),
			ce = (0, _.useRef)(!1);
		((0, _.useEffect)(() => {
			if (!xe || !me) return;
			const de = bg(me);
			if (!de) return;
			const Be = () => {
					(($.current = !1), (Ce.current = !0));
				},
				Rt = () => {
					if ((ce.current || (Ce.current = !0), !n || !$.current)) return;
					const { activeId: pn } = n.getState();
					pn !== null && pn !== Ee.current && ($.current = !1);
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
		}, [xe, me, n]),
			Ne(() => {
				((Ce.current = !1), ee && (ne.current || ($.current = !0)));
			}, [ee]),
			Ne(() => {
				(B !== "always" && xe) || ($.current = xe);
			}, [B, xe]),
			Ne(() => {
				xe || (_e.current = void 0);
			}, [xe]));
		const ve = pe(n, "resetValueOnSelect");
		(rs(() => {
			const de = $.current;
			if (!n || !xe || ne.current || (!de && (!ve || Ce.current))) return;
			const Be = n.getState(),
				{ compositeElement: Rt, activeId: ft, selectElement: pn, selectedValue: mn } = Be;
			if ((Rt && !S_(Rt)) || Be.unstable_placing) return;
			const jn = n.item(ft)?.value,
				le = jn != null && (Array.isArray(mn) ? mn.includes(jn) : mn === jn);
			if (B && de && !(pn && !ee && le)) {
				const Oe = fe(ue),
					ze = Oe !== void 0 ? Oe : (yq(ue) ?? n.first());
				Ee.current = ze;
				const ye = ze ?? null,
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
		}, [n, xe, j, O, ee, B, ve, fe, ue]),
			(0, _.useEffect)(() => {
				if (!F) return;
				const de = I.current;
				if (!de) return;
				const Be = [de, me].filter((ft) => !!ft),
					Rt = (ft) => {
						Be.every((pn) => Aa(ft, pn)) && n?.setInputValue(W);
					};
				for (const ft of Be) ft.addEventListener("focusout", Rt);
				return () => {
					for (const ft of Be) ft.removeEventListener("focusout", Rt);
				};
			}, [F, me, n, W]));
		const Ge = (de) => de.currentTarget.value.length >= f,
			ct = A.onChange,
			mt = ut(h ?? Ge),
			Et = ut(l ?? !n.tag),
			et = Ae((de) => {
				if ((ct?.(de), de.defaultPrevented || !n)) return;
				const Be = de.currentTarget,
					{ value: Rt, selectionStart: ft, selectionEnd: pn } = Be,
					mn = de.nativeEvent;
				if ((($.current = !0), aI(mn) && (mn.isComposing && (($.current = !1), (ne.current = !0)), F))) {
					const jn = mn.inputType === "insertText" || mn.inputType === "insertCompositionText",
						le = ft === Rt.length;
					V(jn && le);
				}
				if (Et(de)) {
					const jn = Rt === n.getState().inputValue;
					(n.setInputValue(Rt),
						queueMicrotask(() => {
							vm(Be, ft, pn);
						}),
						F && B && jn && q());
				}
				(mt(de) && n.show(), (!B || !$.current) && n.setActiveId(null));
			});
		(0, _.useEffect)(() => R, []);
		const Ue = A.onCompositionStart,
			Qe = Ae((de) => {
				(R(), ($.current = !1), (ne.current = !0), Ue?.(de));
			}),
			dn = A.onCompositionEnd,
			At = Ae((de) => {
				(($.current = !0),
					(ne.current = !1),
					dn?.(de),
					!de.defaultPrevented &&
						B &&
						(R(),
						(D.current = requestAnimationFrame(() => {
							((D.current = null), !ne.current && q());
						}))));
			}),
			Fn = A.onMouseDown,
			Qn = ut(y ?? (() => n.getState().compositeElementInFocusOrder)),
			_t = ut(w),
			qt = ut(g ?? Ge),
			hn = Ae((de) => {
				(Fn?.(de),
					!de.defaultPrevented &&
						(de.button ||
							de.ctrlKey ||
							(n &&
								(Qn(de) && n.setActiveId(null),
								_t(de) && n.setInputValue(W),
								qt(de) && Pc(de.currentTarget, "mouseup", n.show)))));
			}),
			Qt = A.onKeyDown,
			ge = ut(b ?? Ge),
			Te = Ae((de) => {
				if ((Qt?.(de), de.repeat || ($.current = !1), de.defaultPrevented || !n)) return;
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
					((de.key === "ArrowUp" || de.key === "ArrowDown") && ge(de) && (de.preventDefault(), n.show()));
			}),
			pt = A.onBlur,
			Ct = Ae((de) => {
				(($.current = !1), pt?.(de));
			}),
			ea = Lr(A.id),
			Fa = vq(T) ? T : void 0,
			ta = pe(n, ["activeId"], (de) => de.activeId === null),
			hi = $a({ disabled: L, "aria-disabled": A["aria-disabled"] }),
			pr = A.composite !== !1,
			[, mi] = R_(pr ? null : n.setCompositeElement),
			br = pe(n, U ? ["compositeElement"] : [], (de) => (U ? de.compositeElement : null));
		((A = Ht(
			A,
			(de) =>
				!x || !Array.isArray(re) || (pr && !br)
					? de
					: (0, S.jsxs)(S.Fragment, {
							children: [
								de,
								re.map((Be, Rt) =>
									(0, S.jsx)("input", { type: "hidden", name: x, form: M, disabled: hi, value: Be }, Rt),
								),
							],
						}),
			[x, M, hi, pr, br, re],
		)),
			(A = {
				role: "combobox",
				"aria-autocomplete": Fa,
				"aria-haspopup": _u(me, "listbox"),
				"aria-expanded": xe,
				"aria-controls": me?.id,
				"data-active-item": ta || void 0,
				value: W,
				...A,
				id: ea,
				name: U ? void 0 : x,
				form: M,
				disabled: L,
				ref: jt(I, n.setInputElement, pr ? void 0 : mi, A.ref),
				onChange: et,
				onCompositionStart: Qe,
				onCompositionEnd: At,
				onMouseDown: hn,
				onKeyDown: Te,
				onBlur: Ct,
			}));
		const tn = eC(n);
		return (
			(A = Gg({
				store: n,
				unstable_scrollIntoView: tn,
				focusable: i,
				...A,
				moveOnKeyPress: (de) => (pg(E, de) ? !1 : (F && V(!0), !0)),
			})),
			{ autoComplete: "off", ...A }
		);
	}),
	bq = Fe(function (n) {
		const i = pq(n);
		return Je(mq, i);
	}),
	Sq = "div";
function wq(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function Eq(e) {
	return c_(e) ?? "option";
}
var _q = We(function ({
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
		const w = Lr(b.id),
			E = (0, _.useContext)(Q1),
			T = E?.store === n,
			{
				resetValueOnSelectState: x,
				multiSelectable: M,
				selected: L,
				autoFocusSelected: A,
				selectElement: k,
				contentElement: N,
			} = Yc(n, ["selectedValue"], {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(me) {
					return Array.isArray(me.selectedValue);
				},
				selected(me) {
					return wq(me.selectedValue, i);
				},
				autoFocusSelected(me) {
					return i == null
						? !1
						: Array.isArray(me.selectedValue)
							? me.selectedValue[me.selectedValue.length - 1] === i
							: me.selectedValue === i;
				},
				selectElement: "selectElement",
				contentElement: "contentElement",
			}),
			I = !!k,
			O = !!k,
			q = $a(b),
			$ = (0, _.useCallback)(
				(me) => {
					const j = { ...me, value: O && q ? void 0 : i };
					return p ? p(j) : j;
				},
				[O, q, i, p],
			);
		((u = u ?? (!O && !M)), (o = o ?? (i != null && !M)), (g = g ?? O));
		const ne = T ? E?.role : _u(N),
			D = Eq(typeof ne == "string" ? ne : void 0),
			R = b.onClick,
			B = ut(u),
			F = ut(l),
			G = ut(f ?? x),
			V = ut(o),
			ee = Ae((me) => {
				(R?.(me),
					!me.defaultPrevented &&
						(g_(me) ||
							m_(me) ||
							(i != null &&
								(F(me) &&
									(G(me) && n?.resetInputValue(),
									n?.setSelectedValue((j) =>
										Array.isArray(j) ? (j.includes(i) ? j.filter((ae) => ae !== i) : [...j, i]) : i,
									)),
								B(me) && n?.setInputValue(i)),
							V(me) && n?.hide())));
			}),
			re = b.onKeyDown,
			U = Ae((me) => {
				if ((re?.(me), me.defaultPrevented)) return;
				const j = n?.getState().compositeElement;
				if (!j || ns(j)) return;
				const ae = me.key.length === 1 && !me.ctrlKey && !me.metaKey,
					W = (cf() ? me.metaKey : me.ctrlKey) && me.key.toLowerCase() === "v",
					fe = me.key === "Backspace" || me.key === "Delete";
				if (ae || W || fe) {
					if (j === k) return;
					if (yr(j)) {
						(queueMicrotask(() => j.focus()), n?.setInputValue(j.value));
						return;
					}
					(j.focus(), "value" in j && typeof j.value == "string" && n?.setInputValue(j.value));
				}
			});
		((O || M) && L != null && (b = { "aria-selected": L, ...b }),
			(b = Ht(
				b,
				(me) =>
					(0, S.jsx)(V3.Provider, { value: i, children: (0, S.jsx)(B3.Provider, { value: L ?? !1, children: me }) }),
				[i, L],
			)));
		const te = I ? A : void 0;
		((b = { role: D, children: i, ...b, id: w, onClick: ee, onKeyDown: U }),
			b.autoFocus === void 0 && te !== void 0 && ((b.autoFocus = !1), (b["data-autofocus"] = te || void 0)));
		const Y = ut(m),
			ue = eC(n);
		b = Wg({
			store: n,
			unstable_scrollIntoView: ue,
			...b,
			getItem: $,
			preventScrollOnKeyDown: g,
			moveOnKeyPress: (me) => {
				if (!Y(me)) return !1;
				const j = new Event("combobox-item-move");
				return (n?.getState().compositeElement?.dispatchEvent(j), !0);
			},
		});
		const xe = ut(h ?? O);
		return (
			(b = Jg({
				store: n,
				...b,
				focusOnHover(me) {
					return !n.getState().open || !xe(me) ? !1 : n.getState().open;
				},
			})),
			b
		);
	}),
	Cq = Tu(
		Fe(function (n) {
			const i = _q(n);
			return Je(Sq, i);
		}),
	),
	Tq = "div",
	tC = We(function ({ store: n, alwaysVisible: i, ...o }) {
		const u = ev(!0),
			l = L3();
		n = n || l;
		const f = !!n && n === u;
		Zt(n, !1);
		const h = o.onFocus,
			m = Ae((B) => {
				if ((h?.(B), B.defaultPrevented || !cn(B))) return;
				const F = n.getState().compositeElement;
				if (!F || !ln(F)) return;
				const G = B.currentTarget;
				queueMicrotask(() => {
					qa(G) === G && F.focus();
				});
			}),
			g = (0, _.useRef)(null),
			p = Lr(o.id),
			b = pe(n, "mounted"),
			y = Nu(b, o.hidden, i),
			w = y ? { ...o.style, display: "none" } : o.style,
			E = pe(n, ["selectedValue"], (B) => Array.isArray(B.selectedValue)),
			T = NS(g, "role", o.role),
			x = (0, _.useMemo)(() => ({ store: n, role: T }), [n, T]),
			M = ((T === "listbox" || T === "tree" || T === "grid") && E) || void 0,
			[L, A] = (0, _.useState)(!1),
			k = pe(n, "contentElement"),
			N = (0, _.useContext)(vw),
			I = (0, _.useState)(),
			[O, q] = N || I,
			$ = (0, _.useMemo)(() => [O, q], [O, q]);
		(Ne(() => {
			if (!b) return;
			const B = g.current;
			if (!B || k !== B) return;
			const F = () => {
					A(!!B.querySelector("[data-combobox-list]"));
				},
				G = new MutationObserver(F);
			return (G.observe(B, { subtree: !0, childList: !0 }), F(), () => G.disconnect());
		}, [b, k]),
			L || (o = { role: "listbox", "aria-multiselectable": M, ...o }),
			(o = Ht(
				o,
				(B) =>
					(0, S.jsx)(U3, {
						value: n,
						children: (0, S.jsx)(vw.Provider, {
							value: $,
							children: (0, S.jsx)(I_.Provider, {
								value: q,
								children: (0, S.jsx)(Q1.Provider, { value: x, children: B }),
							}),
						}),
					}),
				[n, x, $],
			)));
		const ne = p && (!u || !f) ? n.setContentElement : null,
			D = pe(n, ["labelElement", "selectLabelElement"], (B) => (O ? null : B.selectLabelElement || B.labelElement));
		NS(D, "id");
		const R = O || D?.id;
		return (
			(o = {
				"data-combobox-list": "",
				"aria-labelledby": o["aria-label"] != null ? void 0 : R,
				hidden: y,
				...o,
				id: p,
				onFocus: m,
				ref: jt(ne, g, o.ref),
				style: w,
				tabIndex: -1,
			}),
			o
		);
	}),
	KL = Fe(function (n) {
		const i = tC(n);
		return Je(Tq, i);
	}),
	xq = "div";
function Oq(e, ...n) {
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
var Aq = We(function ({
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
			M = (0, _.useRef)(null),
			L = (0, _.useRef)(!1),
			A = (0, _.useRef)(!1),
			k = (0, _.useRef)(null),
			N = (0, _.useRef)(n.getState().selectedValue);
		(0, _.useEffect)(() => {
			const F = n.getState();
			L.current = F.open;
			let G = F.moves;
			return (
				(N.current = F.selectedValue),
				nt(n, ["open", "moves", "selectedValue"], (V, ee) => {
					if (!V.open) {
						(ee.open && (A.current = L.current), (L.current = !1));
						return;
					}
					if (!ee.open) {
						const re = k.current;
						(re !== null ? ((L.current = re), (k.current = null)) : (L.current = !0), (G = V.moves));
					}
					(V.moves !== G && (L.current = !1), L.current && (N.current = V.selectedValue));
				})
			);
		}, [n]);
		const I = ut(l ?? x),
			O = pe(n.tag, ["renderedItems"], (F) => F?.renderedItems.length),
			q = (0, _.useMemo)(() => [m, O], [m, O]);
		((g = tC({ store: n, alwaysVisible: u, ...g })), (g = Of({ store: n, typeahead: !y, ...g })));
		const $ = ut(g.hideOnEscape ?? !0),
			ne = g.onClose,
			D = g.getPersistentElements,
			R = Ae((F) => {
				if (!$(F)) return !1;
				const G = { event: F, defaultPrevented: F.defaultPrevented, cancelBubble: F.cancelBubble };
				return (
					(M.current = G),
					setTimeout(() => {
						M.current === G && (M.current = null);
					}),
					!0
				);
			}),
			B = Ae((F) => {
				const G = M.current;
				if (((M.current = null), ne?.(F), F.defaultPrevented)) {
					if (n.getState().open) return;
					((k.current = A.current),
						queueMicrotask(() => {
							k.current = null;
						}));
					return;
				}
				G &&
					((G.event.defaultPrevented && !G.defaultPrevented) ||
						(G.event.cancelBubble && !G.cancelBubble) ||
						Array.isArray(n.getState().selectedValue) ||
						(I(G.event) && n.setSelectedValue(N.current)));
			});
		return (
			(g = Yg({
				store: n,
				modal: i,
				alwaysVisible: u,
				backdrop: !1,
				autoFocusOnShow: T,
				initialFocus: T ? y || hq(n) : void 0,
				finalFocus: w || b,
				preserveTabOrderAnchor: null,
				...g,
				unstable_treeSnapshotKey: q,
				hideOnEscape: R,
				onClose: B,
				getPersistentElements() {
					const F = D?.() || [];
					if (!i || !n) return F;
					const { compositeElement: G, contentElement: V, inputElement: ee, selectElement: re } = n.getState(),
						U = [G, ee, re],
						te = re || ee || G;
					if (!te) return F;
					const Y = new Set(F),
						ue = (ae) => {
							ae && (V?.contains(ae) || Y.add(ae));
						};
					U.forEach(ue);
					const xe = Ke(te),
						me = new Set();
					for (const ae of [V, ...U]) ae?.id && me.add(`[aria-controls~="${ae.id}"]`);
					if (!me.size) return [...Y];
					const j = [...me].join(",");
					return (xe.querySelectorAll(j).forEach(ue), [...Y]);
				},
				autoFocusOnHide(F) {
					return pg(f, F) ? !1 : E.current ? ((E.current = !1), !1) : !0;
				},
				hideOnInteractOutside(F) {
					const G = n?.getState(),
						V = G?.contentElement?.id,
						ee = G?.compositeElement?.id;
					if (Oq(F.target, V, ee)) return !1;
					const re = typeof h == "function" ? h(F) : h;
					return (re && (E.current = F.type === "click"), re);
				},
			})),
			g
		);
	}),
	Rq = Mu(
		Fe(function (n) {
			const i = Aq(n);
			return Je(xq, i);
		}),
		Af,
	),
	GL = (0, _.createContext)(null),
	XL = (0, _.createContext)(null),
	Vu = Ur([Tf], [ju]),
	Nq = Vu.useContext,
	JL = Vu.useScopedContext,
	WL = Vu.useProviderContext,
	e6 = Vu.ContextProvider,
	t6 = Vu.ScopedContextProvider,
	Mq = Sg() && d_();
function Dq({ tag: e, ...n } = {}) {
	const i = gf(n.store, B_(e, ["value", "rtl"])),
		o = ke(n.defaultInputValue, n.defaultValue);
	({ ...n });
	const u = e?.getState(),
		l = i?.getState(),
		f = ke(n.activeId, l?.activeId, n.defaultActiveId, null),
		h = k1({
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
	let M = w.compositeElement === w.selectElement ? w.selectElement : null;
	const L = w.selectElement || w.compositeElement || w.disclosureElement;
	let A = w.anchorElement === L ? w.anchorElement : null;
	(yt(E, () =>
		nt(E, ["compositeElement", "selectElement"], (O) => {
			if (!(!O.selectElement && !M)) {
				if (O.compositeElement && O.compositeElement === O.selectElement) {
					M = O.selectElement;
					return;
				}
				if (O.compositeElement && O.compositeElement !== M) {
					M = null;
					return;
				}
				((M = O.selectElement), E.setState("compositeElement", M));
			}
		}),
	),
		yt(E, () =>
			nt(E, ["selectElement"], (O) => {
				if (!O.selectElement) return;
				const { focusLoop: q, focusWrap: $, compositeElementInFocusOrder: ne, resetValueOnSelect: D } = E.getState();
				return (
					x.has("focusLoop") && h.setState("focusLoop", !1),
					x.has("focusWrap") && h.setState("focusWrap", !1),
					x.has("compositeElementInFocusOrder") && h.setState("compositeElementInFocusOrder", !1),
					x.has("resetValueOnSelect") && E.setState("resetValueOnSelect", !0),
					() => {
						const R = E.getState();
						(x.has("focusLoop") && !R.focusLoop && h.setState("focusLoop", q),
							x.has("focusWrap") && !R.focusWrap && h.setState("focusWrap", $),
							x.has("compositeElementInFocusOrder") &&
								!R.compositeElementInFocusOrder &&
								h.setState("compositeElementInFocusOrder", ne),
							x.has("resetValueOnSelect") && R.resetValueOnSelect && E.setState("resetValueOnSelect", D));
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
			nt(E, ["items", "selectedValue", "selectElement"], (O, q) => {
				if (b) {
					if (O.selectedValue !== q.selectedValue) {
						b = !1;
						return;
					}
					O.selectElement &&
						queueMicrotask(() => {
							if (!b) return;
							const $ = E.getState();
							if (!$.selectElement) return;
							const ne = $.items.find((D) => !D.disabled && D.value != null);
							ne?.value != null && ((b = !1), E.setState("selectedValue", ne.value));
						});
				}
			}),
		),
		Mq &&
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
			nt(E, ["moves", "activeId"], (O, q) => {
				(O.moves !== q.moves && (T = !1),
					O.activeId !== q.activeId && (T = !1),
					O.moves === q.moves && E.setState("activeValue", void 0));
			}),
		),
		yt(E, () =>
			pu(E, ["moves", "renderedItems"], (O, q) => {
				if (O.moves === q.moves) return;
				const { activeId: $ } = E.getState(),
					ne = h.item($);
				E.setState("activeValue", ne?.value);
			}),
		),
		yt(E, () =>
			nt(E, ["items", "mounted", "open", "selectedValue", "selectElement"], (O) => {
				if (!O.selectElement || (O.mounted && !T)) return;
				const q = Array.isArray(O.selectedValue) ? O.selectedValue : [O.selectedValue],
					$ = q[q.length - 1];
				if ($ == null) return;
				const ne = O.items.find((D) => !D.disabled && D.value === $);
				ne && ((T = !1), E.setState("activeId", ne.id));
			}),
		),
		yt(E, () =>
			pu(E, ["selectOnMove", "moves"], (O) => {
				const { activeId: q, open: $, selectedValue: ne, selectElement: D } = E.getState();
				if (!D || (!O.selectOnMove && $) || Array.isArray(ne) || !O.moves || !q) return;
				const R = h.item(q);
				!R || R.disabled || R.value == null || E.setState("selectedValue", R.value);
			}),
		));
	const k = (O) => {
			E.setState("inputValue", O);
		},
		N = () => k(w.inputValue),
		I = (O, q) => {
			(x.delete(O),
				O === "includesBaseElement" && x.delete("compositeElementInFocusOrder"),
				O === "selectedValue" && (b = !1),
				E.setState(O, q));
		};
	return {
		...m,
		...h,
		...E,
		setState: I,
		tag: e,
		setInputValue: k,
		resetInputValue: N,
		setValue: k,
		resetValue: N,
		setSelectedValue: (O) => I("selectedValue", O),
		setInputElement: (O) => E.setState("inputElement", O),
		setLabelElement: (O) => E.setState("labelElement", O),
		setSelectElement: (O) => E.setState("selectElement", O),
		setSelectLabelElement: (O) => E.setState("selectLabelElement", O),
	};
}
function zq(e) {
	const n = Nq();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), h3(e));
}
function Iq(e, n, i) {
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
	e = zq(e);
	const [n, i] = vf(Dq, e);
	return Iq(n, i, e);
}
var jq = be.union(
		be.literal("thumbs_up"),
		be.literal("heart"),
		be.literal("laugh"),
		be.literal("wow"),
		be.literal("sad"),
		be.literal("party"),
		be.literal("rocket"),
		be.literal("eyes"),
	),
	n6 = be.object({ fileNodeId: be.string(), name: be.string() }),
	r6 = be.union(be.literal("read"), be.literal("write"), be.literal("manage")),
	qq = be.object({ message: be.string(), name: be.optional(be.string()) }),
	Lq = be.union(
		be.object({
			kind: be.literal("message"),
			messageId: be.id("messages"),
			revision: be.number(),
			sequence: be.number(),
		}),
		be.object({ kind: be.literal("channel"), channelId: be.id("channels"), revision: be.number() }),
		be.object({ kind: be.literal("reaction"), messageId: be.id("messages"), token: jq, on: be.boolean() }),
		be.object({
			kind: be.literal("membership"),
			channelId: be.id("channels"),
			membershipRevision: be.number(),
			left: be.boolean(),
			deleted: be.boolean(),
		}),
	),
	i6 = be.union(be.object({ _yay: Lq }), be.object({ _nay: qq })),
	a6 = be.union(
		be.object({
			kind: be.literal("block"),
			messageId: be.id("messages"),
			rootSequence: be.number(),
			replySequence: be.number(),
			renderedBlock: be.string(),
			sourceRevision: be.number(),
		}),
		be.object({ kind: be.literal("header"), name: be.string(), topic: be.string() }),
		be.object({ kind: be.literal("archive"), archived: be.boolean() }),
	),
	o6 = be.union(
		be.literal("auth_expired"),
		be.literal("permission"),
		be.literal("sponsor_gone"),
		be.literal("conflict"),
		be.literal("too_large"),
		be.literal("temporary"),
	),
	s6 = be.object({ failures: be.number(), since: be.number() });
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
var Uq = { text: "", attachments: [], mentions: [], pending: [] },
	ww = new WeakMap();
function Vq() {
	const e = new Map(),
		n = new Set();
	return {
		get: (i) => e.get(i) ?? Uq,
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
	i || ((i = Vq()), ww.set(e, i));
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
		f = Po(je.messages.get, o && u ? { messageId: u._id } : "skip"),
		h = Po(je.messages.latest_roots, o && "channelId" in e.target ? e.target : "skip"),
		m = Po(je.messages.latest_replies, o && "rootMessageId" in e.target ? e.target : "skip"),
		g = n ? m : h,
		[p, b] = (0, _.useState)(null),
		y = (0, _.useRef)(0),
		w = (0, _.useRef)(new Map()),
		E = (0, _.useRef)({ head: null, rows: [] }),
		T = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		x = o && (g !== null || e.retain),
		M = (0, _.useMemo)(
			() =>
				Object.fromEntries(
					(x ? (p?.pages ?? []) : []).map((U) => [
						String(U.id),
						{
							query: n ? je.messages.list_replies : je.messages.list_roots,
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
		L = rg(M),
		A = e.retain ? E.current.head : (g ?? null),
		k = g === null && !e.retain,
		N = new Set(p?.pages.map((U) => U.id));
	for (const U of w.current.keys()) (!N.has(U) || k || !o) && w.current.delete(U);
	const I =
			p?.pages.map((U) => {
				const te = L[String(U.id)];
				return (
					e.enabled && g !== null && te && !(te instanceof Error) && w.current.set(U.id, te),
					{ descriptor: U, result: te ?? w.current.get(U.id) }
				);
			}) ?? [],
		O = I.find((U) => U.result instanceof Error)?.result,
		q = I.filter((U) => U.result !== void 0 && !(U.result instanceof Error)),
		$ = p === null ? (A?.messages ?? []) : q.flatMap((U) => U.result.page),
		ne = f === void 0 ? u : f,
		D =
			ne &&
			("rootMessageId" in e.target ? ne.rootMessageId === e.target.rootMessageId : ne.rootMessageId === null) &&
			ne.deletedAt === null &&
			!$.some((U) => U._id === ne._id)
				? [...$, ne].sort((U, te) => te.sequence - U.sequence)
				: $,
		R = e.retain ? E.current.rows : k ? [] : e.enabled ? D : [],
		B = new TextEncoder().encode(JSON.stringify({ rows: R, head: A })).byteLength,
		F = q.at(-1),
		G = e.enabled && g !== null && (A === null || I.some((U) => L[String(U.descriptor.id)] === void 0));
	((0, _.useEffect)(() => {
		((!e.enabled && !e.retain) || k || (!e.retain && (f === null || f?.deletedAt != null))) && l(null);
	}, [e.enabled, e.retain, k, f]),
		(0, _.useEffect)(() => {
			!e.enabled && !e.retain
				? ((E.current = { head: null, rows: [] }), b(null))
				: e.enabled && (E.current = { head: A, rows: R });
		}, [e.enabled, e.retain, A, R]),
		(0, _.useEffect)(() => {
			if (!p || !e.enabled) return;
			const U = q.some(({ descriptor: te, result: Y }) => !te.endCursor && !Y.isDone);
			if (q.some(({ result: te }) => te.pageStatus === "SplitRequired")) {
				const te = $[0]?.sequence ?? p.anchor;
				b({ anchor: te, pages: [{ id: ++y.current, cursor: null }], newerAnchor: p.newerAnchor, extend: !1 });
			} else
				B > i && p.pages.length > 1
					? b({ ...p, pages: p.pages.slice(1), newerAnchor: $[0]?.sequence ?? p.anchor })
					: p.extend && F
						? b({
								...p,
								extend: !1,
								pages: F.result.isDone
									? p.pages
									: [
											...p.pages.map((te) => ({ ...te, endCursor: F.result.continueCursor })),
											{ id: ++y.current, cursor: F.result.continueCursor },
										],
							})
						: U &&
							b({
								...p,
								pages: p.pages.map((te) => {
									const Y = L[String(te.id)];
									return !te.endCursor && Y && !(Y instanceof Error) && !Y.isDone
										? { ...te, endCursor: Y.continueCursor }
										: te;
								}),
							});
		}, [p, e.enabled, L, B]));
	const V = () => b(null),
		ee = () => {
			if (!e.enabled || G || !A) return;
			if (!p) {
				(A.messages.at(-1)?.sequence ?? 0) > 1 &&
					b({ anchor: A.sequence, pages: [{ id: ++y.current, cursor: null }], newerAnchor: A.sequence, extend: !0 });
				return;
			}
			if (!F || F.result.isDone) return;
			const U = [...p.pages, { id: ++y.current, cursor: F.result.continueCursor }],
				te = n ? 2 : 5;
			b({ ...p, pages: U.slice(-te), newerAnchor: U.length > te ? ($[0]?.sequence ?? p.anchor) : p.newerAnchor });
		},
		re = () => {
			!p?.newerAnchor ||
				!e.enabled ||
				G ||
				(p.newerAnchor >= (A?.sequence ?? 0)
					? V()
					: b({
							anchor: p.newerAnchor,
							pages: [{ id: ++y.current, cursor: null }],
							newerAnchor: Math.min(A?.sequence ?? p.newerAnchor, p.newerAnchor + 50),
							extend: !1,
						}));
		};
	return {
		rows: R,
		editingMessageId: u?._id ?? null,
		setEditingMessage: l,
		denied: k,
		loading: G,
		error: k ? "Messages are unavailable. Your access may have changed." : O instanceof Error ? O.message : null,
		sequence: A?.sequence ?? 0,
		atLatest: p === null,
		hasOlder: p === null ? (A?.messages.at(-1)?.sequence ?? 0) > 1 : !!F && !F.result.isDone,
		hasNewer: p !== null,
		newCount: p ? Math.max(0, (A?.sequence ?? 0) - p.anchor) : 0,
		older: ee,
		newer: re,
		latest: V,
	};
}
var Ew = 128;
function Bq(e) {
	return new TextEncoder().encode(e).byteLength;
}
function Pq(e) {
	if (e === null) return null;
	const n = e
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (n === "") return null;
	if (Bq(n) <= Ew) return n;
	const i = new TextEncoder().encode(n).slice(0, Ew);
	return new TextDecoder().decode(i).replace(/�$/, "");
}
function aC(e) {
	const n = vr(),
		i = Ma(je.messages.send),
		o = Ma(je.messages.reply),
		u = tE(je.files.authorize_selection),
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
					if (b.attachments.some((x) => !T._yay.some((M) => M.fileNodeId === x.fileNodeId && M.name === x.name)))
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
			const E = nC({ text: b, attachments: y, mentions: w, authorName: Pq(n.member?.displayName ?? null) });
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
function $q(e) {
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
function Hq(e) {
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
					.then((M) => {
						if (!x) {
							if (M.status !== 200) {
								w(M.body?.message ?? "Files could not be loaded.");
								return;
							}
							if (!M.body) {
								w("Files could not be loaded.");
								return;
							}
							(o(M.body.items), h(M.body.cursor), g(M.body.isDone));
						}
					})
					.catch((M) => {
						x || w(rf(M));
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
		y = xt(o, je.members.list, m !== null ? { paginationOpts: { numItems: 100, cursor: p } } : "skip"),
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
		M = m && y ? sR(y.page, m.query, e.userId).slice(0, 8) : [],
		L = m !== null && (o.ready || o.refreshing),
		A = (O) => h(e.draft.set({ ...e.draft.get(), ...O })),
		k = (O) => {
			if (!m) return;
			const q = uR(w, m.start, E.current?.selectionStart ?? w.length, O.label),
				$ = new Map(e.draft.value.mentions);
			($.set(O.userId, O.label), A({ text: q.text, mentions: [...$] }), (T.current = q.caret), x.hide());
		},
		N = () => {
			if (e.busy || e.disabled) return;
			const O = w.trim();
			(!O && e.draft.value.attachments.length === 0) ||
				(e.onSend(O, e.draft.value.attachments, lR(e.draft.value.mentions, O)) && x.hide());
		},
		I = (O) => {
			if (!(O.nativeEvent.isComposing || O.keyCode === 229)) {
				if (L) {
					if (O.key === "ArrowLeft" || O.key === "ArrowRight") {
						x.hide();
						return;
					}
					if (O.key === "Escape") {
						(O.preventDefault(), O.stopPropagation(), x.hide());
						return;
					}
					if ((O.key === "Enter" || O.key === "Tab") && !O.shiftKey && M.length) {
						(O.preventDefault(), k(M.find((q) => `${i}-${q.userId}` === x.getState().activeId) ?? M[0]));
						return;
					}
				}
				O.key === "Enter" && !O.shiftKey && (O.preventDefault(), N());
			}
		};
	return (
		(0, _.useLayoutEffect)(() => {
			x.setOpen(L);
		}, [x, L]),
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
													A({ attachments: e.draft.value.attachments.filter((q) => q.fileNodeId !== O.fileNodeId) }),
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
						(0, S.jsx)(bq, {
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
									const q = O.currentTarget.value;
									A({ text: q });
									const $ = oR(q, O.currentTarget.selectionStart);
									(g($), x.setValue($?.query ?? ""));
								},
								onKeyDown: I,
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
							children: (0, S.jsx)(lq, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: N,
							children: (0, S.jsx)(aq, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(Rq, {
					store: x,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !L,
					getAnchorRect: () => E.current?.getBoundingClientRect() ?? null,
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						y ? null : (0, S.jsx)("div", { role: "status", children: "Loading people…" }),
						y && M.length === 0 ? (0, S.jsx)("div", { role: "status", children: "No match on this page." }) : null,
						M.map((O) =>
							(0, S.jsx)(
								Cq,
								{
									id: `${i}-${O.userId}`,
									value: O.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (q) => q.preventDefault(),
									onClick: () => k(O),
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
					? (0, S.jsx)(Hq, {
							client: e.client,
							onClose: () => l(!1),
							onPick: (O) => {
								(e.draft.value.attachments.some((q) => q.fileNodeId === O.fileNodeId) ||
									A({ attachments: [...e.draft.value.attachments, O] }),
									l(!1));
							},
						})
					: null,
			],
		})
	);
}
function Zq(e) {
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
						children: iR.map((f, h) => {
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
function Fq(e) {
	const n = new Date(e).toDateString();
	return n === new Date().toDateString()
		? "Today"
		: n === new Date(Date.now() - sC).toDateString()
			? "Yesterday"
			: Wm(e);
}
function Qq(e) {
	const n = e?.trim().split(/\s+/u);
	return n?.[0] ? `${n[0][0]}${n.length > 1 ? n.at(-1)[0] : ""}`.toUpperCase() : "•";
}
function Yq(e, n, i) {
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
		o = xt(i, je.reactions.get_for_message, { messageId: n._id }),
		u = xt(i, je.threads.get_summary, e.onOpenThread ? { rootMessageId: n._id } : "skip"),
		l = Ma(je.messages.edit),
		f = Ma(je.messages.remove),
		h = Ma(je.reactions.set),
		[m, g] = (0, _.useState)(!1),
		[p, b] = (0, _.useState)(""),
		y = (0, _.useRef)(null),
		[w, E] = (0, _.useState)(!1),
		[T, x] = (0, _.useState)(!1),
		[M, L] = (0, _.useState)(null),
		[A, k] = (0, _.useState)(!1),
		N = (0, _.useRef)(null),
		I = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		q = (0, _.useRef)(null),
		$ = (0, _.useId)(),
		ne = n.deletedAt !== null,
		D = e.canWrite && i.canSend;
	((0, _.useEffect)(() => {
		m && I.current?.focus();
	}, [m]),
		(0, _.useEffect)(() => {
			if (ne) {
				const U = O.current?.contains(document.activeElement);
				(g(!1), b(""), (y.current = null), m && e.onEditingChange?.(null), E(!1), U && O.current?.focus());
			}
		}, [ne]));
	const R = async () => {
			if (!(T || !N.current || !i.can_request_now())) {
				(x(!0), L(null), e.onRequestStart());
				try {
					const U = await N.current();
					if (U._nay) {
						(L(U._nay.message), (N.current = null), k(!1));
						return;
					}
					((N.current = null),
						k(!1),
						g(!1),
						b(""),
						(y.current = null),
						m && e.onEditingChange?.(null),
						E(!1),
						queueMicrotask(() => (ne ? O.current : q.current)?.focus()));
				} catch (U) {
					(L(rf(U)), k(!0));
				} finally {
					(x(!1), e.onRequestSettled());
				}
			}
		},
		B = () => {
			if (!(!D && !N.current)) {
				if (!N.current) {
					const U = y.current,
						te = U.mentions.filter((xe) => {
							const me = e.memberNames.get(xe);
							return !!me && p.includes(`@${me}`);
						}),
						Y = nC({ ...n, text: p.trim(), mentions: te });
					if (Y) {
						L(Y);
						return;
					}
					const ue = {
						messageId: n._id,
						clientRequestId: crypto.randomUUID(),
						expectedRevision: U.revision,
						text: p.trim(),
						mentions: te,
					};
					N.current = () => l(ue);
				}
				R();
			}
		},
		F = () => {
			if (!(!D && !N.current)) {
				if (!N.current) {
					const U = { messageId: n._id, clientRequestId: crypto.randomUUID(), expectedRevision: n.revision };
					N.current = () => f(U);
				}
				R();
			}
		},
		G = (U, te) => {
			if (!D || T || N.current || !i.can_request_now()) return;
			const Y = { messageId: n._id, clientRequestId: crypto.randomUUID(), token: U, on: !te };
			((N.current = () => h(Y)), R());
		},
		V = () => {
			T ||
				((N.current = null),
				k(!1),
				g(!1),
				b(""),
				(y.current = null),
				m && e.onEditingChange?.(null),
				E(!1),
				L(null),
				queueMicrotask(() => q.current?.focus()));
		},
		ee = e.memberNames.get(n.authorHostUserId),
		re = Date.now() - n.createdAt < 7 * sC;
	return (0, S.jsxs)("li", {
		ref: O,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: Qq(ee) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: ee === null ? "Former member" : (ee ?? "…") }),
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
			ne
				? (0, S.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: m
					? (0, S.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, S.jsx)("textarea", {
									ref: I,
									className: "composer-input",
									"aria-label": "Edit message",
									value: p,
									readOnly: T || A,
									onChange: (U) => b(U.currentTarget.value),
									onKeyDown: (U) => {
										U.nativeEvent.isComposing ||
											U.keyCode === 229 ||
											(U.key === "Escape"
												? (U.preventDefault(), U.stopPropagation(), V())
												: U.key === "Enter" && !U.shiftKey && (U.preventDefault(), B()));
									},
								}),
								(0, S.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: T,
											onClick: V,
											children: "Cancel",
										}),
										(0, S.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: T || (!D && !A),
											onClick: B,
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
										Yq(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, S.jsx)($q, { client: e.client, attachments: n.attachments }) : null,
								o?.length
									? (0, S.jsx)("div", {
											className: "message-reactions",
											children: o.map((U) =>
												(0, S.jsxs)(
													"button",
													{
														type: "button",
														disabled: !D || T,
														className: U.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": U.reactedByMe,
														"aria-label": `${aE[U.token]}, ${U.count} ${U.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => G(U.token, U.reactedByMe),
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
			!ne && !m
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
							(0, S.jsx)(Zq, { groups: o ?? [], disabled: !D || T, onPick: G }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												ref: q,
												type: "button",
												className: "button message-action",
												disabled: T || A || (e.editingMessageId != null && e.editingMessageId !== n._id),
												onClick: () => {
													((y.current = { revision: n.revision, mentions: n.mentions }),
														b(n.text),
														g(!0),
														e.onEditingChange?.(n),
														L(null));
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
			M && !w
				? (0, S.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							M,
							A && !m
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												type: "button",
												className: "button",
												disabled: T || !i.ready,
												onClick: () => void R(),
												children: "Retry change",
											}),
											(0, S.jsx)("button", {
												type: "button",
												className: "button",
												disabled: T,
												onClick: V,
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
						labelledBy: $,
						onClose: V,
						children: [
							(0, S.jsx)("h2", { id: $, className: "dialog-title", children: "Delete message?" }),
							(0, S.jsx)("p", { children: "The message is replaced by a “Message deleted” placeholder for everyone." }),
							M ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: M }) : null,
							(0, S.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, S.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: T,
										onClick: V,
										children: "Cancel",
									}),
									(0, S.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: T || (!D && !A),
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
				Kq,
				{
					...e,
					doc: o,
					isContinuation: m,
					newDay: f ? Fq(o.createdAt) : null,
					newMark: h,
					replyTriggerRef: e.setReplyTrigger ? (g) => e.setReplyTrigger?.(o._id, g) : void 0,
				},
				o._id,
			);
		}),
	});
}
function Kq(e) {
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
function Gq(e) {
	const n = vr(),
		i = n.ready && e.channel !== null,
		o = xt(n, je.messages.get, i || n.refreshing ? { messageId: e.rootMessageId } : "skip"),
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
var Xq = 420,
	tu = 244,
	xm = 340;
function Jq(e) {
	return (0, S.jsx)(Wq, { ...e }, `${e.userId}:${e.channelId}`);
}
function Wq(e) {
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
		[M, L] = (0, _.useState)(0),
		A = Math.max(tu, w - Xq),
		k = Math.min(A, Math.max(tu, T));
	((0, _.useEffect)(() => {
		if (!e.threadRootId || !h.current) return;
		const I = h.current;
		E(I.clientWidth);
		const O = new ResizeObserver(() => E(I.clientWidth));
		return (O.observe(I), () => O.disconnect());
	}, [e.threadRootId]),
		(0, _.useEffect)(() => {
			const I = [...new Set(u.rows.map((q) => q.authorHostUserId))],
				O = [...new Set([...I, ...u.rows.flatMap((q) => q.mentions)])];
			O.length && e.memberNames.resolve(O, I);
		}, [u.rows, e.memberNames]),
		(0, _.useLayoutEffect)(() => {
			if (!(!m.current || o)) {
				if (p.current && u.atLatest) ((m.current.scrollTop = m.current.scrollHeight), L(u.sequence));
				else if (b.current) {
					const I = [...m.current.querySelectorAll("[data-key]")].find((O) => O.dataset.key === b.current.id);
					I && (m.current.scrollTop += I.getBoundingClientRect().top - b.current.top);
				}
			}
		}, [u.rows, u.atLatest, u.sequence, o]),
		(0, _.useEffect)(() => {
			(y.current !== null && u.sequence > y.current && u.atLatest && e.announce("New messages in this channel."),
				(y.current = u.sequence));
		}, [u.sequence, u.atLatest, e.announce]),
		(0, _.useEffect)(() => {
			const I = () => {
				i &&
					!o &&
					!u.denied &&
					u.atLatest &&
					p.current &&
					document.visibilityState === "visible" &&
					M === u.sequence &&
					e.onObservedRead({ rootSequence: M });
			};
			return (
				I(),
				document.addEventListener("visibilitychange", I),
				() => document.removeEventListener("visibilitychange", I)
			);
		}, [i, u.atLatest, M, u.sequence, o, u.denied, e.onObservedRead]));
	const N = () => {
		if (e.sendInFlight) return;
		const I = e.threadRootId;
		(e.setThreadRootId(null), I && queueMicrotask(() => (g.current.get(I) ?? m.current)?.focus()));
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
				style: { "--thread-width": `${k}px` },
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
							const I = m.current;
							if (!I) return;
							((p.current = I.scrollHeight - I.scrollTop - I.clientHeight < 80),
								p.current && u.atLatest && L(u.sequence));
							const O = [...I.querySelectorAll("[data-key]")].find(
								(q) => q.getBoundingClientRect().bottom >= I.getBoundingClientRect().top,
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
										onOpenThread: (I) => {
											e.sendInFlight || e.setThreadRootId(I);
										},
										threadDisabled: e.sendInFlight,
										setReplyTrigger: (I, O) => {
											O ? g.current.set(I, O) : g.current.delete(I);
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
										"aria-valuenow": k,
										"aria-valuemin": tu,
										"aria-valuemax": A,
										onKeyDown: (I) => {
											["ArrowLeft", "ArrowRight", "Home"].includes(I.key) &&
												(I.preventDefault(),
												x(Math.min(A, Math.max(tu, I.key === "Home" ? xm : k + (I.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (I) => {
											(I.preventDefault(), I.currentTarget.setPointerCapture(I.pointerId));
										},
										onPointerMove: (I) => {
											I.currentTarget.hasPointerCapture(I.pointerId) &&
												h.current &&
												x(Math.min(A, Math.max(tu, h.current.getBoundingClientRect().right - I.clientX)));
										},
										onDoubleClick: () => x(xm),
									}),
									(0, S.jsx)(Gq, { ...e, rootMessageId: e.threadRootId, onClose: N }, e.threadRootId),
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
function eL(e) {
	const n = vr(),
		i = xt(n, je.transcripts.status, { channelId: e.channelId }),
		o = tE(je.transcripts.connect),
		u = Ma(je.transcripts.retry),
		l = Ma(je.transcripts.reconcile),
		[f, h] = (0, _.useState)(!1),
		[m, g] = (0, _.useState)(null),
		[p, b] = (0, _.useState)(!1),
		[y, w] = (0, _.useState)(!1),
		E = (0, _.useRef)(null),
		T = (0, _.useRef)(null),
		x = (0, _.useId)(),
		M = (0, _.useId)(),
		L = async () => {
			if (!f) {
				if (!n.can_request_now()) {
					g("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				((E.current ??= crypto.randomUUID()), h(!0), g(null));
				try {
					const ne = await e.client.getToken();
					if (!n.can_request_now()) {
						g("Chitchat is reconnecting. Try again shortly.");
						return;
					}
					const D = await o({ channelId: e.channelId, pluginToken: ne, clientRequestId: E.current });
					D._nay ? g(D._nay.message) : (E.current = null);
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
					const ne = await u({ channelId: e.channelId });
					ne._nay && g(ne._nay.message);
				} catch {
					g("Could not restart transcript sync. Try again.");
				} finally {
					h(!1);
				}
			}
		},
		k = async () => {
			if (!(f || !y || !i?.canReconcile)) {
				if (!n.can_request_now()) {
					g("Chitchat is reconnecting. Try again shortly.");
					return;
				}
				if (n.canSend) {
					((T.current ??= crypto.randomUUID()), h(!0), g(null));
					try {
						const ne = await l({ channelId: e.channelId, clientRequestId: T.current });
						ne._nay ? g(ne._nay.message) : ((T.current = null), b(!1), w(!1));
					} catch {
						g("Could not confirm the rebuild request. Retry to check it.");
					} finally {
						h(!1);
					}
				}
			}
		},
		N = i?.status === "blocked" ? i.errorCode : i?.indexStatus === "blocked" ? i.indexErrorCode : null,
		I = N === "auth_expired" || N === "sponsor_gone",
		O = !!i && i.status !== "blocked" && i.retryingSince !== null && Date.now() - i.retryingSince >= 3e5,
		q = i ? `#${i.channelName}` : "",
		$ = i
			? i.status === "ready"
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
							? `Chat is saved. Saving ${q} to Files is paused because the Files connection expired.${i.canConnect ? " Reconnect Files to continue. New messages will be copied after you reconnect." : " Ask a channel manager to reconnect Files."}`
							: i.errorCode === "permission"
								? `Chat is saved. Saving ${q} to Files is paused. Chitchat can no longer write to ${i.folderPath ?? "its folder"}.${i.canConnect ? " Check Chitchat's My file permissions. Wait for your choice to apply, then choose Reconnect Files." : " Ask a channel manager to fix the folder access."}`
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
					(0, S.jsx)("span", { role: "status", children: $ }),
					i?.canConnect
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void L(),
								children: f ? "Connecting…" : i.status === "not_connected" ? "Connect Files" : "Reconnect Files",
							})
						: null,
					(i?.status === "blocked" || i?.indexStatus === "blocked" || O) && i.canConnect && !I
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
													? "In Chitchat's My file permissions, choose Can edit for this folder. Wait until it applies, then choose Reconnect Files. You also need your normal Files access."
													: "A channel manager must connect Files. In Chitchat's My file permissions, choose Whole workspace with Can edit. Wait until it applies, then choose Reconnect Files. You also need your normal Files access.",
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
								htmlFor: M,
								children: [
									(0, S.jsx)("input", {
										id: M,
										type: "checkbox",
										checked: y,
										disabled: f,
										onChange: (ne) => w(ne.currentTarget.checked),
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
										onClick: () => void k(),
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
					M = i
						.query(je.members.resolve, { userIds: x })
						.then((L) => {
							if (!(l.current !== p || !L)) {
								for (const A of x) {
									const k = u.current.get(A)?.author === !0 || o.current.get(A)?.author === !0;
									(o.current.delete(A), o.current.set(A, { name: L[A] ?? null, at: Date.now(), author: k }));
								}
								for (; o.current.size > 1e3;) {
									const A = [...o.current].find(([, k]) => !k.author)?.[0] ?? o.current.keys().next().value;
									A !== void 0 && o.current.delete(A);
								}
							}
						})
						.catch(() => {})
						.finally(() => {
							if (l.current === p) for (const L of x) u.current.delete(L);
						});
				for (const L of x) u.current.set(L, { promise: M, author: b.has(L) });
				w.add(M);
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
	const n = oi(`${e.scopeKey}:public`),
		i = oi(`${e.scopeKey}:private`),
		o = xt(e.session, je.views.unreads, { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } }),
		u = xt(e.session, je.views.unreads, { visibility: "private", paginationOpts: { numItems: 50, cursor: i.cursor } });
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
										(0, S.jsx)(Pi, { page: h, result: m, label: f }),
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
	const n = oi(e.scopeKey),
		i = xt(e.session, je.views.activity, { paginationOpts: { numItems: 50, cursor: n.cursor } });
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
			(0, S.jsx)(Pi, { page: n, result: i, label: "Activity" }),
		],
	});
}
function iL(e) {
	const n = oi(e.scopeKey),
		i = xt(e.session, je.views.threads, { paginationOpts: { numItems: 50, cursor: n.cursor } });
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
				(0, S.jsx)(Pi, { page: n, result: i, label: "Threads" }),
			],
		})
	);
}
function aL(e) {
	const n = xt(e.session, je.channels.permissions, { channelId: e.channel._id }),
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
				children: (0, S.jsx)(cq, {
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
var oL = class extends _.Component {
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
				? i.mutation(je.read_states.mark_thread_read, {
						rootMessageId: e.rootMessageId,
						replySequence: e.replySequence,
					})
				: i.mutation(je.read_states.mark_read, { channelId: e.channelId, rootSequence: e.rootSequence })
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
function sL(e) {
	const n = Ba(),
		i = vr(),
		o = e.client.context.userId,
		u = `${i.member?.generation ?? "loading"}:${i.member?.membershipLifetime ?? 0}`,
		l = tL(u, i.ready || i.refreshing),
		f = oi(`${u}:public`),
		h = oi(`${u}:private`),
		m = oi(`${u}:archived`),
		g = oi(`${u}:archived-private`),
		[p, b] = (0, _.useState)(!1),
		y = xt(i, je.channels.list_public, { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } }),
		w = xt(i, je.channels.list_mine, { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } }),
		E = xt(i, je.channels.list_mine, p ? { archived: !0, paginationOpts: { numItems: 50, cursor: g.cursor } } : "skip"),
		T = xt(
			i,
			je.channels.list_public,
			p ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[x, M] = (0, _.useState)(null),
		[L, A] = (0, _.useState)(null),
		[k, N] = (0, _.useState)(null),
		[I, O] = (0, _.useState)(!1),
		[q, $] = (0, _.useState)(!1),
		[ne, D] = (0, _.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[R, B] = (0, _.useState)(0),
		[F, G] = (0, _.useState)({ sequence: 0, text: "" }),
		[V, ee] = (0, _.useState)(null),
		[re, U] = (0, _.useState)(null),
		te = ne && L !== null,
		Y = x?.kind === "channel" ? x.id : null,
		ue = xt(i, je.channels.get, Y ? { channelId: Y } : "skip"),
		xe = xt(i, je.channels.permissions, Y ? { channelId: Y } : "skip"),
		me = ue ?? null,
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
		ve = (0, _.useId)(),
		Ge = (0, _.useId)(),
		ct = (0, _.useMemo)(
			() => [...(y?.page ?? []), ...(w?.page ?? []), ...(T?.page ?? []), ...(E?.page ?? [])],
			[y, w, T, E],
		),
		mt = (0, _.useMemo)(
			() =>
				Object.fromEntries(
					ct.map((ge) => [ge._id, { query: je.read_states.get_for_channel, args: { channelId: ge._id } }]),
				),
			[ct],
		),
		Et = rg(mt),
		et = ct.filter((ge) => {
			const Te = Et[ge._id];
			return ge.archivedAt === null && !(Te instanceof Error) && Te?.hasUnread;
		}).length,
		Ue = !y?.isDone || !w?.isDone || f.number > 1 || h.number > 1,
		Qe = (0, _.useCallback)((ge) => G((Te) => ({ sequence: Te.sequence + 1, text: ge })), []),
		dn = (0, _.useCallback)(() => B((ge) => ge + 1), []),
		At = (0, _.useCallback)(() => B((ge) => Math.max(0, ge - 1)), []),
		Fn = (0, _.useCallback)(
			(ge) => {
				Y &&
					ee((Te) =>
						Te?.channelId === Y && Te.scopeKey === u && Te.rootSequence >= ge.rootSequence
							? Te
							: {
									scopeKey: u,
									channelId: Y,
									rootSequence: Math.max(
										Te?.channelId === Y && Te.scopeKey === u ? Te.rootSequence : 0,
										ge.rootSequence,
									),
								},
					);
			},
			[Y, u],
		),
		Qn = (0, _.useCallback)(
			(ge) => {
				U((Te) =>
					Te?.scopeKey === u && Te.rootMessageId === ge.rootMessageId && Te.replySequence >= ge.replySequence
						? Te
						: { scopeKey: u, ...ge },
				);
			},
			[u],
		);
	(_w(V, V?.scopeKey === u && i.connected && i.can_request_now() && V?.channelId === ue?._id),
		_w(re, re?.scopeKey === u && i.connected && i.can_request_now() && !!ue && re?.rootMessageId === L));
	const _t = (0, _.useCallback)(
			async (ge, Te) => {
				if (R > 0 || !i.ready) return;
				const pt = ++_e.current;
				try {
					const Ct = await n.query(je.read_states.get_for_channel, { channelId: ge._id });
					if (pt !== _e.current) return;
					(M({ kind: "channel", id: ge._id, openedAtReadSequence: Ct?.state?.rootSequence ?? 0 }),
						A(Te ?? null),
						O(!1),
						$(!1),
						Qe(`Opened #${ge.name}`));
				} catch {
					Qe("Could not open this channel. Try again.");
				}
			},
			[n, R, i.ready, Qe],
		),
		qt = (0, _.useCallback)(() => {
			(N(null), (Ee.current = "selected"));
		}, []),
		hn = (0, _.useCallback)(() => {
			(N(null), b(!0), (Ee.current = "selected"));
		}, []);
	((0, _.useEffect)(() => {
		const ge = (pt) => {
				pt.target instanceof Node && !j.current?.contains(pt.target) && (fe.current = null);
			},
			Te = () => {
				fe.current = null;
			};
		return (
			document.addEventListener("focusin", ge),
			window.addEventListener("blur", Te),
			() => {
				(document.removeEventListener("focusin", ge), window.removeEventListener("blur", Te));
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const ge = window.matchMedia("(max-width: 719px)"),
				Te = (pt) => {
					((Ee.current = pt.matches
						? L && fe.current !== null
							? "thread"
							: fe.current === "sidebar" && !I
								? "drawer"
								: null
						: fe.current === "drawer"
							? "selected"
							: null),
						pt.matches && L && O(!1),
						D(pt.matches));
				};
			return (ge.addEventListener("change", Te), () => ge.removeEventListener("change", Te));
		}, [I, L]),
		(0, _.useLayoutEffect)(() => {
			if (document.querySelector(".dialog-overlay")) return;
			const ge = Ee.current;
			if (((Ee.current = null), ge === "thread" || (ge !== null && ne && L))) {
				const Te = j.current?.querySelector(".thread"),
					pt = Te?.querySelector(".thread-head button:not([disabled])");
				pt ? pt.focus() : Te ? Te.focus() : W.current?.focus();
			} else if (ge === "drawer" || (ge === "selected" && ne && !I)) W.current?.focus();
			else if (ge === "selected") {
				const Te = ae.current?.querySelector('[aria-current="page"]');
				Te && !Te.disabled ? Te.focus() : ae.current?.focus();
			}
		}, [k, ne, L, I]));
	const Qt = (ge, Te, pt) =>
		pt.length === 0
			? null
			: (0, S.jsxs)("div", {
					className: "channel-section",
					children: [
						(0, S.jsx)("h2", { id: Te, className: "channel-section-title", children: ge }),
						(0, S.jsx)("ul", {
							className: "channel-list",
							"aria-labelledby": Te,
							children: pt.map((Ct) =>
								(0, S.jsx)(
									aL,
									{
										channel: Ct,
										selected: Y === Ct._id,
										blocked: R > 0,
										session: i,
										unread: Et[Ct._id],
										onOpen: _t,
										onDialog: N,
									},
									Ct._id,
								),
							),
						}),
					],
				});
	return (0, S.jsxs)("div", {
		ref: j,
		className: "chitchat",
		"data-chitchat-connection": i.connection,
		onFocusCapture: (ge) => {
			const Te = ge.target;
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
				inert: te || void 0,
				children: [
					(0, S.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, S.jsx)("button", {
						ref: W,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": I,
						onClick: () => O((ge) => !ge),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: ae,
				inert: te || void 0,
				className: ["sidebar", I && "is-open", q && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (ge) => {
					ge.key === "Escape" && ne && I && (O(!1), W.current?.focus());
				},
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: ne && !I ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": q,
									"aria-label": q ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => $((ge) => !ge),
									children: q ? "«" : "»",
								}),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: R > 0 || !i.canSend,
									onClick: () => N({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: ["unreads", "threads", "activity"].map((ge) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												ge === "unreads" && et > 0 ? "channel-link view-link is-unread" : "channel-link view-link",
											"aria-current": x?.kind === ge ? "page" : void 0,
											disabled: R > 0,
											onClick: () => {
												((_e.current += 1), M({ kind: ge }), A(null), O(!1), Qe(`Opened ${ge}`));
											},
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: ge[0].toUpperCase(),
												}),
												(0, S.jsx)("span", { className: "channel-name", children: ge[0].toUpperCase() + ge.slice(1) }),
												ge === "unreads" && et > 0
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
									ge,
								),
							),
						}),
						(i.ready || i.refreshing) && y && w
							? (0, S.jsxs)(S.Fragment, {
									children: [
										Qt("Channels", Ce, y.page),
										(0, S.jsx)(Pi, { page: f, result: y, label: "Public channels" }),
										Qt("Private channels", ce, w.page),
										(0, S.jsx)(Pi, { page: h, result: w, label: "Private channels" }),
										ct.length === 0
											? (0, S.jsx)("p", { className: "channel-status", children: "No channels on this page" })
											: null,
										(0, S.jsx)("button", {
											type: "button",
											className: "button sidebar-archive-toggle",
											"aria-expanded": p,
											onClick: () => b((ge) => !ge),
											children: p ? "Hide archived channels" : "Show archived channels",
										}),
										p
											? (0, S.jsxs)(S.Fragment, {
													children: [
														Qt("Archived", ve, T?.page ?? []),
														(0, S.jsx)(Pi, { page: m, result: T, label: "Archived channels" }),
														Qt("Archived private channels", Ge, E?.page ?? []),
														(0, S.jsx)(Pi, { page: g, result: E, label: "Archived private channels" }),
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
						inert: te || void 0,
						children: [
							Y && me?.visibility === "public"
								? (0, S.jsx)(eL, { client: e.client, channelId: Y }, `transcript:${Y}`)
								: null,
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
						? (0, S.jsx)(nL, { scopeKey: u, session: i, memberNames: l, onOpen: _t })
						: x?.kind === "activity"
							? (0, S.jsx)(rL, { scopeKey: u, session: i, userId: o, memberNames: l, onOpen: _t })
							: x?.kind === "threads"
								? (0, S.jsx)(iL, { scopeKey: u, session: i, memberNames: l, onOpen: _t })
								: x?.kind === "channel"
									? (0, S.jsx)(
											Jq,
											{
												client: e.client,
												channelId: x.id,
												channel: me,
												userId: o,
												memberNames: l,
												announce: Qe,
												threadRootId: L,
												setThreadRootId: (ge) => {
													(A(ge), ge && O(!1));
												},
												isNarrow: ne,
												canWrite: xe?.canWrite ?? !1,
												online: i.connected,
												openedAtReadSequence: x.openedAtReadSequence,
												onObservedRead: Fn,
												onObservedThreadRead: Qn,
												onRequestStart: dn,
												onRequestSettled: At,
												sendInFlight: R > 0,
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
			k?.kind === "create"
				? (0, S.jsx)(wS, {
						channel: null,
						selfUserId: o,
						onClose: qt,
						onSaved: (ge) => {
							(qt(), M({ kind: "channel", id: ge, openedAtReadSequence: 0 }), A(null));
						},
					})
				: null,
			k?.kind === "rename" ? (0, S.jsx)(wS, { channel: k.channel, selfUserId: o, onClose: qt, onSaved: qt }) : null,
			k?.kind === "people" ? (0, S.jsx)(V2, { channelId: k.channel._id, selfUserId: o, onClose: qt }) : null,
			k && k.kind !== "create" && k.kind !== "rename" && k.kind !== "people"
				? (0, S.jsx)(B2, { channel: k.channel, action: k.kind, onClose: qt, onDone: hn })
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
function dC(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var hC = document.getElementById("root");
if (!hC) throw new Error("index.html is missing the #root element");
var eg = (0, rR.createRoot)(hC);
eg.render((0, S.jsx)(dC, { message: "Connecting…" }));
XA().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			eg.render(
				(0, S.jsx)(oL, { client: e, children: (0, S.jsx)(U2, { client: e, children: (0, S.jsx)(sL, { client: e }) }) }),
			));
	},
	(e) => {
		eg.render((0, S.jsx)(dC, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
