//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
var _a$1;
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod)
			Object.defineProperty(inst, "_zod", {
				value: {
					def,
					constr: _,
					traits: /* @__PURE__ */ new Set(),
				},
				enumerable: false,
			});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, {
		value: (inst) => {
			if (params?.Parent && inst instanceof params.Parent) return true;
			return inst?._zod?.traits?.has(name);
		},
	});
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries)
		.filter(([k, _]) => numericValues.indexOf(+k) === -1)
		.map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return {
		get value() {
			{
				const value = getter();
				Object.defineProperty(this, "value", { value });
				return value;
			}
			throw new Error("cached value already set");
		},
	};
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const ratio = val / step;
	const roundedRatio = Math.round(ratio);
	const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
	if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
	return ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__*/ Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true,
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true,
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__*/ cached(() => {
	if (globalConfig.jitless) return false;
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		return false;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	if (o instanceof Map) return new Map(o);
	if (o instanceof Set) return new Set(o);
	return o;
}
var propertyKeyTypes = /* @__PURE__*/ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string")
		return {
			...params,
			error: () => params.error,
		};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
var NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(
		schema,
		mergeDefs(schema._zod.def, {
			get shape() {
				const newShape = {};
				for (const key in mask) {
					if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					newShape[key] = currDef.shape[key];
				}
				assignProp(this, "shape", newShape);
				return newShape;
			},
			checks: [],
		}),
	);
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(
		schema,
		mergeDefs(schema._zod.def, {
			get shape() {
				const newShape = { ...schema._zod.def.shape };
				for (const key in mask) {
					if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					delete newShape[key];
				}
				assignProp(this, "shape", newShape);
				return newShape;
			},
			checks: [],
		}),
	);
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape)
			if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(
		schema,
		mergeDefs(schema._zod.def, {
			get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape,
				};
				assignProp(this, "shape", _shape);
				return _shape;
			},
		}),
	);
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(
		schema,
		mergeDefs(schema._zod.def, {
			get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape,
				};
				assignProp(this, "shape", _shape);
				return _shape;
			},
		}),
	);
}
function merge(a, b) {
	if (a._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return clone(
		a,
		mergeDefs(a._zod.def, {
			get shape() {
				const _shape = {
					...a._zod.def.shape,
					...b._zod.def.shape,
				};
				assignProp(this, "shape", _shape);
				return _shape;
			},
			get catchall() {
				return b._zod.def.catchall;
			},
			checks: b._zod.def.checks ?? [],
		}),
	);
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0)
		throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(
		schema,
		mergeDefs(schema._zod.def, {
			get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask)
					for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class
							? new Class({
									type: "optional",
									innerType: oldShape[key],
								})
							: oldShape[key];
					}
				else
					for (const key in oldShape)
						shape[key] = Class
							? new Class({
									type: "optional",
									innerType: oldShape[key],
								})
							: oldShape[key];
				assignProp(this, "shape", shape);
				return shape;
			},
			checks: [],
		}),
	);
}
function required(Class, schema, mask) {
	return clone(
		schema,
		mergeDefs(schema._zod.def, {
			get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask)
					for (const key in mask) {
						if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = new Class({
							type: "nonoptional",
							innerType: oldShape[key],
						});
					}
				else
					for (const key in oldShape)
						shape[key] = new Class({
							type: "nonoptional",
							innerType: oldShape[key],
						});
				assignProp(this, "shape", shape);
				return shape;
			},
		}),
	);
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const message = iss.message
		? iss.message
		: (unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
			unwrapMessage(ctx?.error?.(iss)) ??
			unwrapMessage(config.customError?.(iss)) ??
			unwrapMessage(config.localeError?.(iss)) ??
			"Invalid input");
	const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
	rest.path ?? (rest.path = []);
	rest.message = message;
	if (ctx?.reportInput) rest.input = _input;
	return rest;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string")
		return {
			message: iss,
			code: "custom",
			input,
			inst,
		};
	return { ...iss };
}
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
var initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false,
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false,
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false,
	});
};
var $ZodError = $constructor("$ZodError", initializer$1);
var $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues)
		if (sub.path.length > 0) {
			fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
			fieldErrors[sub.path[0]].push(mapper(sub));
		} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors,
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error, path = []) => {
		for (const issue of error.issues)
			if (issue.code === "invalid_union" && issue.errors.length)
				issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
			else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else {
				const fullpath = [...path, ...issue.path];
				if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
				else {
					let curr = fieldErrors;
					let i = 0;
					while (i < fullpath.length) {
						const el = fullpath[i];
						if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
						else {
							curr[el] = curr[el] || { _errors: [] };
							curr[el]._errors.push(mapper(issue));
						}
						curr = curr[el];
						i++;
					}
				}
			}
	};
	processError(error);
	return fieldErrors;
}
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx
		? {
				..._ctx,
				async: false,
			}
		: { async: false };
	const result = schema._zod.run(
		{
			value,
			issues: [],
		},
		ctx,
	);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx
		? {
				..._ctx,
				async: true,
			}
		: { async: true };
	let result = schema._zod.run(
		{
			value,
			issues: [],
		},
		ctx,
	);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx
		? {
				..._ctx,
				async: false,
			}
		: { async: false };
	const result = schema._zod.run(
		{
			value,
			issues: [],
		},
		ctx,
	);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length
		? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
			}
		: {
				success: true,
				data: result.value,
			};
};
var safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx
		? {
				..._ctx,
				async: true,
			}
		: { async: true };
	let result = schema._zod.run(
		{
			value,
			issues: [],
		},
		ctx,
	);
	if (result instanceof Promise) result = await result;
	return result.issues.length
		? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
			}
		: {
				success: true,
				data: result.value,
			};
};
var safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx
		? {
				..._ctx,
				direction: "backward",
			}
		: { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
var _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx
		? {
				..._ctx,
				direction: "backward",
			}
		: { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx
		? {
				..._ctx,
				direction: "backward",
			}
		: { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx
		? {
				..._ctx,
				direction: "backward",
			}
		: { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
var duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
 *
 * @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
var uuid = (version) => {
	if (!version)
		return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(
		`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
	);
};
/** Practical email validation */
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
var ipv4 =
	/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 =
	/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 =
	/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 =
	/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number"
		? args.precision === -1
			? `${hhmm}`
			: args.precision === 0
				? `${hhmm}:[0-5]\\d`
				: `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
		: `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
var integer = /^-?\d+$/;
var number$1 = /^-?\d+(?:\.\d+)?$/;
var boolean$1 = /^(?:true|false)$/i;
var _undefined$2 = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
var $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date",
};
var $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr)
			if (def.inclusive) bag.maximum = def.value;
			else bag.exclusiveMaximum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr)
			if (def.inclusive) bag.minimum = def.value;
			else bag.exclusiveMinimum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		var _a;
		(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value)
			throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (
			typeof payload.value === "bigint"
				? payload.value % def.value === BigInt(0)
				: floatSafeRemainder(payload.value, def.value) === 0
		)
			return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
		if (isInt) bag.pattern = integer;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: false,
					input,
					inst,
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0)
					payload.issues.push({
						input,
						code: "too_big",
						maximum: Number.MAX_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort,
					});
				else
					payload.issues.push({
						input,
						code: "too_small",
						minimum: Number.MIN_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort,
					});
				return;
			}
		}
		if (input < minimum)
			payload.issues.push({
				origin: "number",
				input,
				code: "too_small",
				minimum,
				inclusive: true,
				inst,
				continue: !def.abort,
			});
		if (input > maximum)
			payload.issues.push({
				origin: "number",
				input,
				code: "too_big",
				maximum,
				inclusive: true,
				inst,
				continue: !def.abort,
			});
	};
});
var $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ??
		(_a.when = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ??
		(_a.when = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ??
		(_a.when = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		});
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...(tooBig
				? {
						code: "too_big",
						maximum: def.length,
					}
				: {
						code: "too_small",
						minimum: def.length,
					}),
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern)
		(_a = inst._zod).check ??
			(_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...(def.pattern ? { pattern: def.pattern.toString() } : {}),
					inst,
					continue: !def.abort,
				});
			});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
var version = {
	major: 4,
	minor: 4,
	patch: 3,
};
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
var $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...(inst._zod.def.checks ?? [])];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload)) continue;
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise)
					asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
						await _;
						if (payload.issues.length === currLen) return;
						if (!isAborted) isAborted = aborted(payload, currLen);
					});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult)
				return asyncResult.then(() => {
					return payload;
				});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse(
					{
						value: payload.value,
						issues: [],
					},
					{
						...ctx,
						skipChecks: true,
					},
				);
				if (canary instanceof Promise)
					return canary.then((canary) => {
						return handleCanaryResult(canary, payload, ctx);
					});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	defineLazy(inst, "~standard", () => ({
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => (r.success ? { value: r.data } : { issues: r.error?.issues }));
			}
		},
		vendor: "zod",
		version: 1,
	}));
});
var $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...(inst?._zod.bag?.patterns ?? [])].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce)
			try {
				payload.value = String(payload.value);
			} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst,
		});
		return payload;
	};
});
var $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
var $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
var $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8,
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
var $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
var $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			if (!def.normalize && def.protocol?.source === httpProtocol.source) {
				if (!/^https?:\/\//i.test(trimmed)) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: payload.value,
						inst,
						continue: !def.abort,
					});
					return;
				}
			}
			const url = new URL(trimmed);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url.hostname))
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid hostname",
						pattern: def.hostname.source,
						input: payload.value,
						inst,
						continue: !def.abort,
					});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol))
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid protocol",
						pattern: def.protocol.source,
						input: payload.value,
						inst,
						continue: !def.abort,
					});
			}
			if (def.normalize) payload.value = url.href;
			else payload.value = trimmed;
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort,
			});
		}
	};
});
var $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
var $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
var $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
var $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv6`;
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort,
			});
		}
	};
});
var $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const parts = payload.value.split("/");
		try {
			if (parts.length !== 2) throw new Error();
			const [address, prefix] = parts;
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort,
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (/\s/.test(data)) return false;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
var $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64";
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => (c === "-" ? "+" : "/"));
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
var $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64url";
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
var $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort,
		});
	};
});
var $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce)
			try {
				payload.value = Number(payload.value);
			} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received =
			typeof input === "number"
				? Number.isNaN(input)
					? "NaN"
					: !Number.isFinite(input)
						? "Infinity"
						: void 0
				: void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...(received ? { received } : {}),
		});
		return payload;
	};
});
var $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
var $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce)
			try {
				payload.value = Boolean(payload.value);
			} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst,
		});
		return payload;
	};
});
var $ZodUndefined = /*@__PURE__*/ $constructor("$ZodUndefined", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = _undefined$2;
	inst._zod.values = /* @__PURE__ */ new Set([void 0]);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "undefined") return payload;
		payload.issues.push({
			expected: "undefined",
			code: "invalid_type",
			input,
			inst,
		});
		return payload;
	};
});
var $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst,
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst,
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run(
				{
					value: item,
					issues: [],
				},
				ctx,
			);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
	const isPresent = key in input;
	if (result.issues.length) {
		if (isOptionalIn && isOptionalOut && !isPresent) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (!isPresent && !isOptionalIn) {
		if (!result.issues.length)
			final.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [key],
			});
		return;
	}
	if (result.value === void 0) {
		if (isPresent) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys)
		if (!def.shape?.[k]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys),
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalIn = _catchall.optin === "optional";
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (key === "__proto__") continue;
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run(
			{
				value: input[key],
				issues: [],
			},
			ctx,
		);
		if (r instanceof Promise)
			proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
	}
	if (unrecognized.length)
		payload.issues.push({
			code: "unrecognized_keys",
			keys: unrecognized,
			input,
			inst,
		});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
var $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
		const sh = def.shape;
		Object.defineProperty(def, "shape", {
			get: () => {
				const newSh = { ...sh };
				Object.defineProperty(def, "shape", { value: newSh });
				return newSh;
			},
		});
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const isObject$2 = isObject;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst,
			});
			return payload;
		}
		payload.value = {};
		const proms = [];
		const shape = value.shape;
		for (const key of value.keys) {
			const el = shape[key];
			const isOptionalIn = el._zod.optin === "optional";
			const isOptionalOut = el._zod.optout === "optional";
			const r = el._zod.run(
				{
					value: input[key],
					issues: [],
				},
				ctx,
			);
			if (r instanceof Promise)
				proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	};
});
var $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const generateFastpass = (shape) => {
		const doc = new Doc(["shape", "payload", "ctx"]);
		const normalized = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {};`);
		for (const key of normalized.keys) {
			const id = ids[key];
			const k = esc(key);
			const schema = shape[key];
			const isOptionalIn = schema?._zod?.optin === "optional";
			const isOptionalOut = schema?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(key)};`);
			if (isOptionalIn && isOptionalOut)
				doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			else if (!isOptionalIn)
				doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			else
				doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst,
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results)
		if (result.issues.length === 0) {
			final.value = result.value;
			return final;
		}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
	});
	return final;
}
var $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => (def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0));
	defineLazy(inst._zod, "optout", () => (def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0));
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values))
			return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run(
				{
					value: payload.value,
					issues: [],
				},
				ctx,
			);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
var $ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
	def.inclusive = false;
	$ZodUnion.init(inst, def);
	const _super = inst._zod.parse;
	defineLazy(inst._zod, "propValues", () => {
		const propValues = {};
		for (const option of def.options) {
			const pv = option._zod.propValues;
			if (!pv || Object.keys(pv).length === 0)
				throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
			for (const [k, v] of Object.entries(pv)) {
				if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
				for (const val of v) propValues[k].add(val);
			}
		}
		return propValues;
	});
	const disc = cached(() => {
		const opts = def.options;
		const map = /* @__PURE__ */ new Map();
		for (const o of opts) {
			const values = o._zod.propValues?.[def.discriminator];
			if (!values || values.size === 0)
				throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
			for (const v of values) {
				if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
				map.set(v, o);
			}
		}
		return map;
	});
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				code: "invalid_type",
				expected: "object",
				input,
				inst,
			});
			return payload;
		}
		const opt = disc.value.get(input?.[def.discriminator]);
		if (opt) return opt._zod.run(payload, ctx);
		if (def.unionFallback || ctx.direction === "backward") return _super(payload, ctx);
		payload.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: def.discriminator,
			options: Array.from(disc.value.keys()),
			input,
			path: [def.discriminator],
			inst,
		});
		return payload;
	};
});
var $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run(
			{
				value: input,
				issues: [],
			},
			ctx,
		);
		const right = def.right._zod.run(
			{
				value: input,
				issues: [],
			},
			ctx,
		);
		if (left instanceof Promise || right instanceof Promise)
			return Promise.all([left, right]).then(([left, right]) => {
				return handleIntersectionResults(payload, left, right);
			});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b)
		return {
			valid: true,
			data: a,
		};
	if (a instanceof Date && b instanceof Date && +a === +b)
		return {
			valid: true,
			data: a,
		};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b,
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid)
				return {
					valid: false,
					mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
				};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj,
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length)
			return {
				valid: false,
				mergeErrorPath: [],
			};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid)
				return {
					valid: false,
					mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
				};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray,
		};
	}
	return {
		valid: false,
		mergeErrorPath: [],
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	for (const iss of left.issues)
		if (iss.code === "unrecognized_keys") {
			unrecIssue ?? (unrecIssue = iss);
			for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).l = true;
			}
		} else result.issues.push(iss);
	for (const iss of right.issues)
		if (iss.code === "unrecognized_keys")
			for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
		else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue)
		result.issues.push({
			...unrecIssue,
			keys: bothKeys,
		});
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
var $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isPlainObject(input)) {
			payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst,
			});
			return payload;
		}
		const proms = [];
		const values = def.keyType._zod.values;
		if (values) {
			payload.value = {};
			const recordKeys = /* @__PURE__ */ new Set();
			for (const key of values)
				if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
					recordKeys.add(typeof key === "number" ? key.toString() : key);
					const keyResult = def.keyType._zod.run(
						{
							value: key,
							issues: [],
						},
						ctx,
					);
					if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (keyResult.issues.length) {
						payload.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
							input: key,
							path: [key],
							inst,
						});
						continue;
					}
					const outKey = keyResult.value;
					const result = def.valueType._zod.run(
						{
							value: input[key],
							issues: [],
						},
						ctx,
					);
					if (result instanceof Promise)
						proms.push(
							result.then((result) => {
								if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
								payload.value[outKey] = result.value;
							}),
						);
					else {
						if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
						payload.value[outKey] = result.value;
					}
				}
			let unrecognized;
			for (const key in input)
				if (!recordKeys.has(key)) {
					unrecognized = unrecognized ?? [];
					unrecognized.push(key);
				}
			if (unrecognized && unrecognized.length > 0)
				payload.issues.push({
					code: "unrecognized_keys",
					input,
					inst,
					keys: unrecognized,
				});
		} else {
			payload.value = {};
			for (const key of Reflect.ownKeys(input)) {
				if (key === "__proto__") continue;
				if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
				let keyResult = def.keyType._zod.run(
					{
						value: key,
						issues: [],
					},
					ctx,
				);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
					const retryResult = def.keyType._zod.run(
						{
							value: Number(key),
							issues: [],
						},
						ctx,
					);
					if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (retryResult.issues.length === 0) keyResult = retryResult;
				}
				if (keyResult.issues.length) {
					if (def.mode === "loose") payload.value[key] = input[key];
					else
						payload.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
							input: key,
							path: [key],
							inst,
						});
					continue;
				}
				const result = def.valueType._zod.run(
					{
						value: input[key],
						issues: [],
					},
					ctx,
				);
				if (result instanceof Promise)
					proms.push(
						result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}),
					);
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
var $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	inst._zod.pattern = new RegExp(
		`^(${values
			.filter((k) => propertyKeyTypes.has(typeof k))
			.map((o) => (typeof o === "string" ? escapeRegex(o) : o.toString()))
			.join("|")})$`,
	);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst,
		});
		return payload;
	};
});
var $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
	const values = new Set(def.values);
	inst._zod.values = values;
	inst._zod.pattern = new RegExp(
		`^(${def.values.map((o) => (typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o))).join("|")})$`,
	);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst,
		});
		return payload;
	};
});
var $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async)
			return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
				payload.value = output;
				payload.fallback = true;
				return payload;
			});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		payload.fallback = true;
		return payload;
	};
});
function handleOptionalResult(result, input) {
	if (input === void 0 && (result.issues.length || result.fallback))
		return {
			issues: [],
			value: void 0,
		};
	return result;
}
var $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") {
			const input = payload.value;
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
			return handleOptionalResult(result, input);
		}
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			 * $ZodDefault returns the default value immediately in forward direction.
			 * It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
var $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0)
		payload.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: payload.value,
			inst,
		});
	return payload;
}
var $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise)
			return result.then((result) => {
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value,
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value,
			});
			payload.issues = [];
			payload.fallback = true;
		}
		return payload;
	};
});
var $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run(
		{
			value: left.value,
			issues: left.issues,
			fallback: left.fallback,
		},
		ctx,
	);
}
var $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
	defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
var $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...(inst._zod.def.path ?? [])],
			continue: !inst._zod.def.abort,
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...(this.get(p) ?? {}) };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema),
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link _cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _undefined$1(Class, params) {
	return new Class({
		type: "undefined",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false,
	});
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true,
	});
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false,
	});
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true,
	});
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value,
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum,
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum,
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length,
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern,
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes,
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix,
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix,
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx,
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params),
	});
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
	const norm = normalizeParams(_params);
	norm.abort ?? (norm.abort = true);
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...norm,
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params),
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params),
	});
	ch._zod.check = fn;
	return ch;
}
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0,
	};
}
function process(
	schema,
	ctx,
	_params = {
		path: [],
		schemaPath: [],
	},
) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path,
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path,
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) Object.assign(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && "_prefault" in result.schema)
		(_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0])
				throw new Error(
					`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
				);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`,
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId,
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw")
		for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (seen.cycle)
				throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else Object.assign(schema, refSchema);
			Object.assign(schema, _cached);
			if (zodSchema._zod.parent === ref)
				for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (!(key in _cached)) delete schema[key];
				}
			if (refSchema.$ref && refSeen.def)
				for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key]))
						delete schema[key];
				}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def)
					for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key]))
							delete schema[key];
					}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? [],
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {
	}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) {
			if (seen.def.id === seen.defId) delete seen.def.id;
			defs[seen.defId] = seen.def;
		}
	}
	if (ctx.external) {
	} else if (Object.keys(defs).length > 0)
		if (ctx.target === "draft-2020-12") result.$defs = defs;
		else result.definitions = defs;
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors),
				},
			},
			enumerable: false,
			writable: false,
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (
		def.type === "promise" ||
		def.type === "optional" ||
		def.type === "nonoptional" ||
		def.type === "nullable" ||
		def.type === "readonly" ||
		def.type === "default" ||
		def.type === "prefault"
	)
		return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map")
		return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") {
		if (_schema._zod.traits.has("$ZodCodec")) return true;
		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	}
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
var createToJSONSchemaMethod =
	(schema, processors = {}) =>
	(params) => {
		const ctx = initializeContext({
			...params,
			processors,
		});
		process(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
var createStandardJSONSchemaMethod =
	(schema, io, processors = {}) =>
	(params) => {
		const { libraryOptions, target } = params ?? {};
		const ctx = initializeContext({
			...(libraryOptions ?? {}),
			target,
			io,
			processors,
		});
		process(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: "",
};
var stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time") delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const regexes = [...patterns];
		if (regexes.length === 1) json.pattern = regexes[0].source;
		else if (regexes.length > 1)
			json.allOf = [
				...regexes.map((regex) => ({
					...(ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0"
						? { type: "string" }
						: {}),
					pattern: regex.source,
				})),
			];
	}
};
var numberProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
	if (typeof format === "string" && format.includes("int")) json.type = "integer";
	else json.type = "number";
	const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
	const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
	const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
	if (exMin)
		if (legacy) {
			json.minimum = exclusiveMinimum;
			json.exclusiveMinimum = true;
		} else json.exclusiveMinimum = exclusiveMinimum;
	else if (typeof minimum === "number") json.minimum = minimum;
	if (exMax)
		if (legacy) {
			json.maximum = exclusiveMaximum;
			json.exclusiveMaximum = true;
		} else json.exclusiveMaximum = exclusiveMaximum;
	else if (typeof maximum === "number") json.maximum = maximum;
	if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
};
var neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
var enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
var literalProcessor = (schema, ctx, json, _params) => {
	const def = schema._zod.def;
	const vals = [];
	for (const val of def.values)
		if (val === void 0) {
			if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
		} else if (typeof val === "bigint")
			if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
		else vals.push(val);
	if (vals.length === 0) {
	} else if (vals.length === 1) {
		const val = vals[0];
		json.type = val === null ? "null" : typeof val;
		if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
		else json.const = val;
	} else {
		if (vals.every((v) => typeof v === "number")) json.type = "number";
		if (vals.every((v) => typeof v === "string")) json.type = "string";
		if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
		if (vals.every((v) => v === null)) json.type = "null";
		json.enum = vals;
	}
};
var customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
var transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process(def.element, ctx, {
		...params,
		path: [...params.path, "items"],
	});
};
var objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape)
		json.properties[key] = process(shape[key], ctx, {
			...params,
			path: [...params.path, "properties", key],
		});
	const allKeys = new Set(Object.keys(shape));
	const requiredKeys = new Set(
		[...allKeys].filter((key) => {
			const v = def.shape[key]._zod;
			if (ctx.io === "input") return v.optin === void 0;
			else return v.optout === void 0;
		}),
	);
	if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall)
		json.additionalProperties = process(def.catchall, ctx, {
			...params,
			path: [...params.path, "additionalProperties"],
		});
};
var unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) =>
		process(x, ctx, {
			...params,
			path: [...params.path, isExclusive ? "oneOf" : "anyOf", i],
		}),
	);
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
var intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process(def.left, ctx, {
		...params,
		path: [...params.path, "allOf", 0],
	});
	const b = process(def.right, ctx, {
		...params,
		path: [...params.path, "allOf", 1],
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	json.allOf = [...(isSimpleIntersection(a) ? a.allOf : [a]), ...(isSimpleIntersection(b) ? b.allOf : [b])];
};
var recordProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	const keyType = def.keyType;
	const patterns = keyType._zod.bag?.patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		const valueSchema = process(def.valueType, ctx, {
			...params,
			path: [...params.path, "patternProperties", "*"],
		});
		json.patternProperties = {};
		for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
	} else {
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12")
			json.propertyNames = process(def.keyType, ctx, {
				...params,
				path: [...params.path, "propertyNames"],
			});
		json.additionalProperties = process(def.valueType, ctx, {
			...params,
			path: [...params.path, "additionalProperties"],
		});
	}
	const keyValues = keyType._zod.values;
	if (keyValues) {
		const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
		if (validKeyValues.length > 0) json.required = validKeyValues;
	}
};
var nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		throw new Error("Dynamic catch values are not supported in JSON Schema");
	}
	json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
	const innerType = ctx.io === "input" ? (inIsTransform ? def.out : def.in) : def.out;
	process(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
var optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
var ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
var ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
var ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: {
			value: (issue) => {
				inst.issues.push(issue);
				inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
			},
		},
		addIssues: {
			value: (issues) => {
				inst.issues.push(...issues);
				inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
			},
		},
		isEmpty: {
			get() {
				return inst.issues.length === 0;
			},
		},
	});
};
var ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
var parse = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
//#endregion
//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
var _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
	const proto = Object.getPrototypeOf(inst);
	let installed = _installedGroups.get(proto);
	if (!installed) {
		installed = /* @__PURE__ */ new Set();
		_installedGroups.set(proto, installed);
	}
	if (installed.has(group)) return;
	installed.add(group);
	for (const key in methods) {
		const fn = methods[key];
		Object.defineProperty(proto, key, {
			configurable: true,
			enumerable: false,
			get() {
				const bound = fn.bind(this);
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: bound,
				});
				return bound;
			},
			set(v) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: v,
				});
			},
		});
	}
}
var ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], {
		jsonSchema: {
			input: createStandardJSONSchemaMethod(inst, "input"),
			output: createStandardJSONSchemaMethod(inst, "output"),
		},
	});
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	_installLazyMethods(inst, "ZodType", {
		check(...chks) {
			const def = this.def;
			return this.clone(
				mergeDefs(def, {
					checks: [
						...(def.checks ?? []),
						...chks.map((ch) =>
							typeof ch === "function"
								? {
										_zod: {
											check: ch,
											def: { check: "custom" },
											onattach: [],
										},
									}
								: ch,
						),
					],
				}),
				{ parent: true },
			);
		},
		with(...chks) {
			return this.check(...chks);
		},
		clone(def, params) {
			return clone(this, def, params);
		},
		brand() {
			return this;
		},
		register(reg, meta) {
			reg.add(this, meta);
			return this;
		},
		refine(check, params) {
			return this.check(refine(check, params));
		},
		superRefine(refinement, params) {
			return this.check(superRefine(refinement, params));
		},
		overwrite(fn) {
			return this.check(/* @__PURE__ */ _overwrite(fn));
		},
		optional() {
			return optional(this);
		},
		exactOptional() {
			return exactOptional(this);
		},
		nullable() {
			return nullable(this);
		},
		nullish() {
			return optional(nullable(this));
		},
		nonoptional(params) {
			return nonoptional(this, params);
		},
		array() {
			return array(this);
		},
		or(arg) {
			return union([this, arg]);
		},
		and(arg) {
			return intersection(this, arg);
		},
		transform(tx) {
			return pipe(this, transform(tx));
		},
		default(d) {
			return _default(this, d);
		},
		prefault(d) {
			return prefault(this, d);
		},
		catch(params) {
			return _catch(this, params);
		},
		pipe(target) {
			return pipe(this, target);
		},
		readonly() {
			return readonly(this);
		},
		describe(description) {
			const cl = this.clone();
			globalRegistry.add(cl, { description });
			return cl;
		},
		meta(...args) {
			if (args.length === 0) return globalRegistry.get(this);
			const cl = this.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(fn) {
			return fn(this);
		},
	});
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true,
	});
	return inst;
});
/** @internal */
var _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	_installLazyMethods(inst, "_ZodString", {
		regex(...args) {
			return this.check(/* @__PURE__ */ _regex(...args));
		},
		includes(...args) {
			return this.check(/* @__PURE__ */ _includes(...args));
		},
		startsWith(...args) {
			return this.check(/* @__PURE__ */ _startsWith(...args));
		},
		endsWith(...args) {
			return this.check(/* @__PURE__ */ _endsWith(...args));
		},
		min(...args) {
			return this.check(/* @__PURE__ */ _minLength(...args));
		},
		max(...args) {
			return this.check(/* @__PURE__ */ _maxLength(...args));
		},
		length(...args) {
			return this.check(/* @__PURE__ */ _length(...args));
		},
		nonempty(...args) {
			return this.check(/* @__PURE__ */ _minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(/* @__PURE__ */ _lowercase(params));
		},
		uppercase(params) {
			return this.check(/* @__PURE__ */ _uppercase(params));
		},
		trim() {
			return this.check(/* @__PURE__ */ _trim());
		},
		normalize(...args) {
			return this.check(/* @__PURE__ */ _normalize(...args));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ _toLowerCase());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ _toUpperCase());
		},
		slugify() {
			return this.check(/* @__PURE__ */ _slugify());
		},
	});
});
var ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
	inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
	inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
var ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
var ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	_installLazyMethods(inst, "ZodNumber", {
		gt(value, params) {
			return this.check(/* @__PURE__ */ _gt(value, params));
		},
		gte(value, params) {
			return this.check(/* @__PURE__ */ _gte(value, params));
		},
		min(value, params) {
			return this.check(/* @__PURE__ */ _gte(value, params));
		},
		lt(value, params) {
			return this.check(/* @__PURE__ */ _lt(value, params));
		},
		lte(value, params) {
			return this.check(/* @__PURE__ */ _lte(value, params));
		},
		max(value, params) {
			return this.check(/* @__PURE__ */ _lte(value, params));
		},
		int(params) {
			return this.check(int(params));
		},
		safe(params) {
			return this.check(int(params));
		},
		positive(params) {
			return this.check(/* @__PURE__ */ _gt(0, params));
		},
		nonnegative(params) {
			return this.check(/* @__PURE__ */ _gte(0, params));
		},
		negative(params) {
			return this.check(/* @__PURE__ */ _lt(0, params));
		},
		nonpositive(params) {
			return this.check(/* @__PURE__ */ _lte(0, params));
		},
		multipleOf(value, params) {
			return this.check(/* @__PURE__ */ _multipleOf(value, params));
		},
		step(value, params) {
			return this.check(/* @__PURE__ */ _multipleOf(value, params));
		},
		finite() {
			return this;
		},
	});
	const bag = inst._zod.bag;
	inst.minValue =
		Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue =
		Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
var ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
var ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
var ZodUndefined = /*@__PURE__*/ $constructor("ZodUndefined", (inst, def) => {
	$ZodUndefined.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
});
function _undefined(params) {
	return /* @__PURE__ */ _undefined$1(ZodUndefined, params);
}
var ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
var ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
var ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	_installLazyMethods(inst, "ZodArray", {
		min(n, params) {
			return this.check(/* @__PURE__ */ _minLength(n, params));
		},
		nonempty(params) {
			return this.check(/* @__PURE__ */ _minLength(1, params));
		},
		max(n, params) {
			return this.check(/* @__PURE__ */ _maxLength(n, params));
		},
		length(n, params) {
			return this.check(/* @__PURE__ */ _length(n, params));
		},
		unwrap() {
			return this.element;
		},
	});
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
var ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	_installLazyMethods(inst, "ZodObject", {
		keyof() {
			return _enum(Object.keys(this._zod.def.shape));
		},
		catchall(catchall) {
			return this.clone({
				...this._zod.def,
				catchall,
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: unknown(),
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: unknown(),
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: never(),
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0,
			});
		},
		extend(incoming) {
			return extend(this, incoming);
		},
		safeExtend(incoming) {
			return safeExtend(this, incoming);
		},
		merge(other) {
			return merge(this, other);
		},
		pick(mask) {
			return pick(this, mask);
		},
		omit(mask) {
			return omit(this, mask);
		},
		partial(...args) {
			return partial(ZodOptional, this, args[0]);
		},
		required(...args) {
			return required(ZodNonOptional, this, args[0]);
		},
	});
});
function object(shape, params) {
	return new ZodObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params),
	});
}
var ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params),
	});
}
var ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params),
	});
}
var ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right,
	});
}
var ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	if (!valueType || !valueType._zod)
		return new ZodRecord({
			type: "record",
			keyType: string(),
			valueType: keyType,
			...normalizeParams(valueType),
		});
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params),
	});
}
var ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values)
			if (keys.has(value)) newEntries[value] = def.entries[value];
			else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries,
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values)
			if (keys.has(value)) delete newEntries[value];
			else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries,
		});
	};
});
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params),
	});
}
var ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", {
		get() {
			if (def.values.length > 1)
				throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return def.values[0];
		},
	});
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params),
	});
}
var ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise)
			return output.then((output) => {
				payload.value = output;
				payload.fallback = true;
				return payload;
			});
		payload.value = output;
		payload.fallback = true;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn,
	});
}
var ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType,
	});
}
var ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType,
	});
}
var ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType,
	});
}
var ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		},
	});
}
var ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		},
	});
}
var ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params),
	});
}
var ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue,
	});
}
var ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out,
	});
}
var ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType,
	});
}
var ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function custom(fn, _params) {
	return /* @__PURE__ */ _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return /* @__PURE__ */ _superRefine(fn, params);
}
//#endregion
//#region src/chat-data.ts
/**
 * The fixed reaction palette. Tokens (not raw emoji) live in document keys because emoji
 * keys are unreliable, not uniformly refused: the store's key rule rejects only control
 * and format characters, so simple emoji pass while ZWJ-joined ones fail. A fixed ASCII
 * token set keeps reaction keys predictable; the emoji are only how the page renders them.
 */
var chat_REACTION_TOKENS = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"];
var chat_REACTION_EMOJI = {
	thumbs_up: "👍",
	heart: "❤️",
	laugh: "😂",
	wow: "😮",
	sad: "😢",
	party: "🎉",
	rocket: "🚀",
	eyes: "👀",
};
/**
 * Server-appended keys end with `<invertedPaddedMs>:<rand4>`. The inverted part is
 * `9999999999999 - epochMs` padded to 13 digits, so ascending key order is newest first.
 */
var INVERTED_MS_COMPLEMENT = 9999999999999;
var KEY_TAIL_REGEX = /(?:^|:)(\d{13}):([^:]{1,16})$/;
/**
 * Reads the creation time out of a server-appended key (channel, message, or reply).
 * Returns null when the key does not end with the `<invertedPaddedMs>:<rand>` tail —
 * the store is generic and other writers can put arbitrary ASCII keys in any collection,
 * so an unparseable key means "not one of ours" and the doc is dropped.
 */
function chat_key_timestamp(key) {
	const match = KEY_TAIL_REGEX.exec(key);
	if (!match) return null;
	return INVERTED_MS_COMPLEMENT - Number(match[1]);
}
/**
 * The 13-digit inverted-timestamp segment of an appended key — the exact inverse of
 * `chat_key_timestamp`. The backend mints message and reply keys with it.
 */
function chat_inverted_ms(nowMs) {
	return String(INVERTED_MS_COMPLEMENT - nowMs).padStart(13, "0");
}
/**
 * What a private channel's key starts with, and what its scope covers.
 *
 * A private channel is not a different kind of channel. It is an ordinary channel whose key sits
 * under this prefix, so the scope created over that key hides the channel, its messages, its replies
 * and its reactions in one go — they all key off the channel key. A direct message is a private
 * channel with two people in it and nothing else.
 *
 * `/` and not `:`, because every key parser here splits on `:` and counts the parts.
 */
var PRIVATE_CHANNEL_KEY_PREFIX = "p/";
/**
 * Whether a channel is private, read from its own key.
 *
 * The key is the only source. Storing a flag in the channel value would let the two disagree, and
 * the value is writable by everybody who can see the channel while the key never changes.
 */
function chat_channel_is_private(channelKey) {
	return channelKey.startsWith(PRIVATE_CHANNEL_KEY_PREFIX);
}
/** The channel key of a message key, or null when the key is not message-shaped. */
function chat_message_channel_key(messageKey) {
	const parts = messageKey.split(":");
	if (parts.length < 3 || chat_key_timestamp(messageKey) === null) return null;
	return parts.slice(0, -2).join(":");
}
/** The root message key of a reply key, or null when the key is not reply-shaped. */
function chat_reply_root_key(replyKey) {
	const parts = replyKey.split(":");
	if (parts.length < 5) return null;
	const rootKey = parts.slice(0, -2).join(":");
	if (chat_key_timestamp(rootKey) === null || chat_key_timestamp(replyKey) === null) return null;
	return rootKey;
}
var chat_channel_value_schema = object({
	name: string().min(1).max(64),
	archivedAt: number().nullable(),
	/**
	 * Optional, and it must stay optional. Every channel written before the topic existed carries no
	 * `topic`, `chat_validate_channel_doc` drops a value that fails to parse, and the store drops
	 * every null — so a required field would empty the channel list of an existing workspace.
	 */
	topic: string().max(250).optional(),
});
var chat_attachment_schema = object({
	fileNodeId: string().min(1),
	name: string().min(1),
});
/**
 * A `users` table id inside a stored document, as the doors type it. The store hands ids back as
 * plain JSON strings, so the parse brands them here once, and a parsed id then reaches a door
 * with no cast at the call site.
 */
var chat_user_id_schema = custom((value) => typeof value === "string");
var chat_message_value_schema = object({
	text: string(),
	attachments: array(chat_attachment_schema),
	editedAt: number().nullable(),
	deletedAt: number().nullable(),
	/**
	 * User ids the author mentioned with `@Name` in `text`. Only ids whose name is still present
	 * in the text at send time are stored. Optional: messages written before mentions existed
	 * carry none, and a required field would drop them all at validation.
	 */
	mentions: array(chat_user_id_schema).optional(),
});
/**
 * The backend invoke endpoints, shared between the manifest, the worker router, and the page's
 * `client.backend.invoke` calls. Every endpoint runs under the one installation-wide
 * serialization lock so transcript read-modify-write stays ordered.
 */
var chat_BACKEND_ENDPOINTS = [
	{
		id: "message-send",
		path: "/messages/send",
	},
	{
		id: "message-edit",
		path: "/messages/edit",
	},
	{
		id: "message-delete",
		path: "/messages/delete",
	},
	{
		id: "reply-send",
		path: "/replies/send",
	},
	{
		id: "reaction-toggle",
		path: "/reactions/toggle",
	},
	{
		id: "channel-manage",
		path: "/channels/manage",
	},
	{
		id: "reconcile",
		path: "/reconcile",
	},
];
/**
 * Label used when a roster row has no profile name. That includes a member who signed in
 * anonymously. It is not "Former member": that label is only for an id that `members.resolve`
 * maps to null because the person has left.
 */
var chat_ANONYMOUS_MEMBER_LABEL = "Someone with no name yet";
object({ channels: record(string(), number()) });
/** Per-collection durable append positions covered by one private read cursor. */
var chat_private_activity_cursor_schema = object({
	messages: number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	replies: number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
});
union([
	object({
		at: number(),
		activity: chat_private_activity_cursor_schema,
	}),
	object({
		at: number(),
		activity: _undefined().optional(),
	}).transform((value) => ({
		at: value.at,
		activity: {
			messages: 0,
			replies: 0,
		},
	})),
]);
/**
 * The BonoboPublicDoc envelope every read surface returns (plain watch and window
 * updates alike). The store is a generic multi-writer surface, so every doc is runtime
 * validated before the page uses it; a doc that fails is dropped and counted.
 */
var public_doc_schema = object({
	collection: string(),
	key: string().min(1).max(128),
	value: record(string(), unknown()),
	revision: number(),
	createdBy: chat_user_id_schema.refine((id) => id.length > 0),
	updatedBy: chat_user_id_schema,
	ownership: union([literal("shared"), literal("owned")]),
	createdAt: number(),
	updatedAt: number(),
});
object({ removed: literal(true).optional() });
object({ document: public_doc_schema.nullable() });
object({
	items: array(
		object({
			path: string(),
			name: string(),
			kind: union([literal("file"), literal("folder")]),
			nodeId: string(),
			contentType: string().nullable(),
			updatedAt: number(),
		}),
	),
	cursor: string().nullable(),
	isDone: boolean(),
});
object({
	documents: array(public_doc_schema),
	cursor: string().nullable(),
	isDone: boolean(),
});
object({
	items: array(
		object({
			fileNodeId: string(),
			url: string(),
			expiresAt: number(),
		}),
	),
	errors: array(
		object({
			fileNodeId: string(),
			message: string(),
		}),
	),
	truncated: boolean(),
});
//#endregion
//#region src/backend/host.ts
function chatbe_create_host(env) {
	return {
		async post(path, body) {
			const response = await fetch(`${env.BONOBO.host.apiOrigin}${path}`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${env.BONOBO.host.token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const text = await response.text();
			let parsed = null;
			try {
				parsed = text === "" ? null : JSON.parse(text);
			} catch {
				parsed = { message: text };
			}
			return {
				status: response.status,
				body: parsed,
			};
		},
	};
}
/**
 * The human-readable reason of a refused door call, for relaying to the page.
 */
function chatbe_host_message(answer) {
	if (typeof answer.body === "object" && answer.body !== null) {
		const message = answer.body.message;
		if (typeof message === "string" && message !== "") return message;
	}
	return `The host refused this call (status ${answer.status})`;
}
//#endregion
//#region src/backend/markdown.ts
/**
 * The Markdown rendering for projected channel files.
 *
 * The block renderers, the header, and the rollover splitter are copied from the host's
 * `convex/plugins_projections_chitchat.ts` (the old core projection engine) so the block format
 * stays byte-for-byte identical across the cutover. The host module dies once the migration
 * finishes; this file is the surviving copy.
 */
var MISSING_NAME = chat_ANONYMOUS_MEMBER_LABEL;
/**
 * Copied from the host's `PRIVATE_DISCLOSURE`. The organization owner reads every scope and
 * every restricted file before any grant is consulted, so copy that says "private" must say
 * this too. The wording is the file header's, not the chat page's — keep them separate.
 */
var PRIVATE_DISCLOSURE =
	"Only the people in this channel can read this file — and the organization owner, who can read everything in this workspace.";
/**
 * Rollover cap for one projected file, in UTF-8 bytes. The host engine used 600,000; the plugin
 * backend reads files back through `/api/v1/files/read`, which answers 404 above its 128,000-byte
 * cap with no partial read. 100,000 leaves headroom so each send's read-plus-write stays around
 * 200 KB.
 */
var chatbe_ROLLOVER_MAX_BYTES = 1e5;
/** Bound one rendered author label so a hostile profile name cannot bloat every block. */
var AUTHOR_NAME_MAX_BYTES = 128;
var COLLISION_SLUG_MAX_LENGTH = 120;
function chatbe_utf8_byte_size(text) {
	return new TextEncoder().encode(text).byteLength;
}
function pad2(value) {
	return String(value).padStart(2, "0");
}
function format_utc(ms) {
	const date = new Date(ms);
	return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())} UTC`;
}
function author_label(userId, displayNames) {
	const name = displayNames.get(userId);
	if (name !== void 0 && name !== null && name !== "") return name;
	return MISSING_NAME;
}
/**
 * Bound and sanitize one author label before it lands in Markdown. Control and format
 * characters become spaces, `\` and `*` are escaped so a name cannot change block structure,
 * and the result is cut at a UTF-8 byte bound without splitting a code point.
 */
function chatbe_bounded_author_name(name) {
	if (name === null) return null;
	const safeName = name
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (safeName === "") return null;
	if (chatbe_utf8_byte_size(safeName) <= AUTHOR_NAME_MAX_BYTES) return safeName;
	const bytes = new TextEncoder().encode(safeName).slice(0, AUTHOR_NAME_MAX_BYTES);
	return new TextDecoder().decode(bytes).replace(/�$/, "");
}
/**
 * A file-system-safe base name for one channel's projected files. The host derived this through
 * its shared file-name normalizer; the plugin keeps a compact local version with the same
 * intent: path separators become dashes, control characters and reserved punctuation drop out,
 * and an empty result falls back to "channel".
 */
function slug_channel_name(channelName) {
	return (
		channelName
			.replace(/[/\\]+/g, "-")
			.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
			.replace(/[<>:"|?*#%[\]{}^`~]+/g, " ")
			.trim()
			.replace(/\s+/g, "-")
			.replace(/\.+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^[-.]+|[-.]+$/g, "")
			.slice(0, 80) || "channel"
	);
}
async function chatbe_sha256_hex(text) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return Array.from(new Uint8Array(digest))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}
/**
 * The slug used when the plain channel-name slug is already taken by another channel. Hash the
 * full key: UUID prefixes collide at large channel counts, while this fixed digest keeps public
 * file names and private folder names stable and bounded.
 */
async function chatbe_collision_slug(channelName, channelKey) {
	const base = slug_channel_name(channelName);
	const suffix = await chatbe_sha256_hex(channelKey);
	return `${base.slice(0, COLLISION_SLUG_MAX_LENGTH - suffix.length - 1).replace(/[._-]+$/u, "") || "channel"}-${suffix}`;
}
function format_reaction_line(reactions) {
	const counts = /* @__PURE__ */ new Map();
	for (const reaction of reactions) {
		if (reaction.removed) continue;
		counts.set(reaction.token, (counts.get(reaction.token) ?? 0) + 1);
	}
	return format_reaction_counts_line(counts);
}
function format_reaction_counts_line(counts) {
	const parts = [];
	for (const [token, count] of counts) {
		if (count <= 0) continue;
		const emoji = chat_REACTION_EMOJI[token] ?? token;
		parts.push(`${emoji} ${count}`);
	}
	if (parts.length === 0) return null;
	return `reactions: ${parts.join(", ")}`;
}
/**
 * One message or reply block. The `<!-- chitchat:msg:<key> -->` marker line identifies the block
 * across rebuilds; the edit and delete endpoints find a block by this marker and replace it with
 * a block rendered from the store document, never from the file's own text.
 */
function chatbe_format_message_block(args) {
	const { message, indent, displayNames } = args;
	const edited = message.value.editedAt !== null;
	const deleted = message.value.deletedAt !== null;
	const flags = [edited ? "(edited)" : null, deleted ? "(message deleted)" : null].filter((flag) => flag !== null);
	const flagText = flags.length > 0 ? ` ${flags.join(" ")}` : "";
	const lines = [
		`${indent}<!-- chitchat:msg:${message.key} -->`,
		`${indent}**${author_label(message.createdBy, displayNames)}** · ${format_utc(message.createdAt)}${flagText}`,
	];
	if (!deleted) {
		for (const textLine of message.value.text.split("\n")) lines.push(`${indent}${textLine}`);
		if (message.value.attachments.length > 0)
			lines.push(`${indent}attachments: ${message.value.attachments.map((attachment) => attachment.name).join(", ")}`);
	}
	const reactionLine = args.reactionCounts
		? format_reaction_counts_line(args.reactionCounts)
		: format_reaction_line(args.reactions ?? []);
	if (reactionLine !== null) lines.push(`${indent}${reactionLine}`);
	return lines.join("\n");
}
function chatbe_channel_header(channelName, topic, isPrivate) {
	const lines = [
		`# ${channelName}`,
		"",
		isPrivate
			? `Private Chitchat channel. ${PRIVATE_DISCLOSURE} This file is a derived copy. Edit chat in the Chitchat page, not here.`
			: "Public Chitchat channel. This file is a derived copy. Edit chat in the Chitchat page, not here.",
	];
	if (topic !== null && topic !== "") lines.push("", topic);
	return lines.join("\n");
}
/**
 * Split on message-block boundaries so a rollover file never cuts a comment in half.
 * `files[0]` is the oldest (`slug.001.md`). The last file is the newest main (`slug.md`).
 */
function chatbe_split_rollover(args) {
	const { header, blocks, maxBytes } = args;
	if (blocks.length === 0) return [header];
	const files = [[]];
	let current = files[0];
	let currentIsMain = true;
	const push_block = (block) => {
		const candidate = currentIsMain ? [header, ...current, block].join("\n\n") : [...current, block].join("\n\n");
		if (current.length > 0 && chatbe_utf8_byte_size(candidate) > maxBytes) {
			files.push([]);
			current = files[files.length - 1];
			currentIsMain = false;
			current.push(block);
			return;
		}
		current.push(block);
	};
	for (const block of [...blocks].reverse()) push_block(block);
	return files
		.map((fileBlocks, index) => {
			const ordered = [...fileBlocks].reverse();
			if (index === 0) return [header, ...ordered].join("\n\n");
			return ordered.join("\n\n");
		})
		.reverse();
}
function block_marker_line(key) {
	return `<!-- chitchat:msg:${key} -->`;
}
/**
 * Find one message block inside a transcript file by its marker line. The block starts at the
 * marker's line (indent included) and ends right before the next blank line followed by another
 * marker, or at the end of the file. Returns null when the marker is not in this file.
 */
function find_block_range(content, key) {
	const marker = block_marker_line(key);
	const markerIndex = content.indexOf(marker);
	if (markerIndex === -1) return null;
	let start = content.lastIndexOf("\n", markerIndex - 1) + 1;
	if (content.slice(start, markerIndex).trim() !== "") return null;
	const nextBlock = /\n\n[ ]*<!-- chitchat:msg:/g;
	nextBlock.lastIndex = markerIndex + marker.length;
	const nextMatch = nextBlock.exec(content);
	return {
		start,
		end: nextMatch ? nextMatch.index : content.length,
	};
}
function chatbe_file_contains_block(content, key) {
	return find_block_range(content, key) !== null;
}
/**
 * Replace one message block in a transcript file with a block rendered from store documents.
 * Returns null when the block is not in this file, so the caller can try an older rollover file.
 */
function chatbe_splice_block(content, key, replacementBlock) {
	const range = find_block_range(content, key);
	if (range === null) return null;
	return content.slice(0, range.start) + replacementBlock + content.slice(range.end);
}
/**
 * Insert a reply block under its root message: after the root block and after every reply block
 * already nested there, so replies keep their order. Returns null when the root is not in this file.
 */
function chatbe_insert_reply_block(content, rootKey, replyBlock) {
	const rootRange = find_block_range(content, rootKey);
	if (rootRange === null) return null;
	let insertAt = rootRange.end;
	const nextBlock = /\n\n([ ]*)<!-- chitchat:msg:([^>]+) -->/g;
	nextBlock.lastIndex = insertAt;
	for (let match = nextBlock.exec(content); match !== null; match = nextBlock.exec(content)) {
		if (match.index !== insertAt || !match[2].startsWith(`${rootKey}:`)) break;
		const range = find_block_range(content, match[2]);
		if (range === null) break;
		insertAt = range.end;
		nextBlock.lastIndex = insertAt;
	}
	return content.slice(0, insertAt) + "\n\n" + replyBlock + content.slice(insertAt);
}
/**
 * Replace everything before the first message block with a freshly rendered header. A file with
 * no block yet is all header. Used when a rename or topic change made the stored header stale.
 */
function chatbe_replace_header(content, header) {
	const firstBlock = /\n\n[ ]*<!-- chitchat:msg:/.exec(content);
	if (firstBlock === null) return header;
	return header + content.slice(firstBlock.index);
}
function chatbe_rollover_path(folderPath, slug, rolloverIndex) {
	if (rolloverIndex === 0) return `${folderPath}/${slug}.md`;
	return `${folderPath}/${slug}.${String(rolloverIndex).padStart(3, "0")}.md`;
}
/**
 * The root README is the channel list: it maps channel names to their projected files so a
 * rename never has to move transcript files. The old engine's README was static text; this one
 * is rewritten by `channel-manage` and by reconcile.
 */
function chatbe_readme_markdown(channels) {
	const lines = [
		"# Chitchat",
		"",
		"These files are a derived copy of Chitchat channels in this workspace.",
		"",
		"- Edit chat in the Chitchat page, not in these files.",
		"- Private channels appear under `private/`. Each channel folder is visible only to the people in that channel — and the organization owner, who can read everything in this workspace.",
		"- Do not share those folders by hand. The plugin resets each folder's sharing to the channel's members.",
		"- Author names are a snapshot written with each message. A rename shows up on later messages.",
		"- The folder is read-only. The workspace agent can read these files with bash.",
	];
	const sorted = [...channels].sort((left, right) => left.name.localeCompare(right.name));
	if (sorted.length > 0) {
		lines.push("", "## Channels", "");
		for (const channel of sorted) lines.push(`- [${channel.name}](./${channel.slug}.md)`);
	}
	return lines.join("\n");
}
//#endregion
//#region src/backend/state.ts
/**
 * Where the backend keeps its projection bookkeeping in the plugin document store.
 *
 * Public state lives in the machine-only `projection` collection (it is not in the manifest's
 * `userWritableCollections`, so members cannot write it). A private channel's state doc must not
 * disclose the channel to non-members, so it lives INSIDE the channel's scope: the `channels`
 * collection with a `<channelKey>:projection` key, which the scope's `<channelKey>` prefix
 * covers. Members of the channel could overwrite that doc through the user door; every read here
 * re-validates, and an unreadable state doc just means "set the projection up again".
 */
var chatbe_PROJECTION_COLLECTION = "projection";
var chatbe_REQUESTS_COLLECTION = "requests";
var chatbe_ROOT_STATE_KEY = "__root__";
var chatbe_root_state_schema = object({
	rootPath: string().min(1),
	readmePath: string().min(1),
});
var chatbe_channel_state_schema = object({
	slug: string().min(1),
	folderPath: string().min(1),
	/** How many rolled-over files exist (`slug.001.md` … `slug.<tailIndex>.md`). 0 = only the tail. */
	tailIndex: number().int().min(0),
	/** The channel name and topic the tail file's header was last rendered with. */
	name: string(),
	topic: string().nullable(),
	archived: boolean(),
});
/**
 * One send request's stored outcome, keyed by the page's `clientRequestId`. The installation
 * serialization lock orders every backend run, so read-then-write on this key is race-free.
 * These docs are kept forever; at dev scale that is accepted debt.
 */
var chatbe_request_state_schema = object({
	endpoint: string(),
	messageKey: string(),
	createdAt: number(),
});
function chatbe_channel_state_location(channelKey) {
	if (chat_channel_is_private(channelKey))
		return {
			collection: "channels",
			key: `${channelKey}:projection`,
		};
	return {
		collection: chatbe_PROJECTION_COLLECTION,
		key: channelKey,
	};
}
function chatbe_tail_path(state) {
	return `${state.folderPath}/${state.slug}.md`;
}
//#endregion
//#region src/backend/worker.ts
/**
 * The Chitchat backend: every chat write goes through these invoke endpoints, and each one
 * updates the document store first (the store is the source of truth) and then the projected
 * Markdown transcript files. A file update that fails or finds no block leaves the store
 * correct; the reconcile endpoint rebuilds the transcript from the store.
 *
 * Authorization model: the host verifies the acting member (`actorUserId`) and every store or
 * file door re-checks scope membership, so a non-member's call on a private channel fails at the
 * door and the refusal is relayed. The worker itself only adds the authorship rule: members may
 * edit and delete their own messages only.
 */
/** The host store door refuses values over this canonical-JSON size; pre-check for a clear message. */
var STORE_VALUE_MAX_BYTES = 16384;
/** How many rolled-over files an edit/delete/reaction scans for a block before giving up. */
var TRANSCRIPT_SCAN_MAX_FILES = 8;
/** Full-rebuild page caps; over these, reconcile degrades to a truncated tail rebuild. */
var RECONCILE_MESSAGE_PAGES = 3;
var RECONCILE_REPLY_PAGES = 2;
var RECONCILE_REACTION_PAGES = 2;
var LIST_PAGE_SIZE = 100;
var DEFAULT_ROOT_PATH = "/chitchat";
var envelope_schema = object({
	pluginRunId: string(),
	event: literal("ui.invoke.requested"),
	organizationId: string().min(1),
	workspaceId: string().min(1),
	actorUserId: string().min(1),
	invoke: object({
		endpointId: string(),
		serializationKey: string().nullable(),
		input: unknown(),
	}),
});
function json_response(status, body) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json" },
	});
}
function refuse(status, message) {
	return json_response(status, { message });
}
/** Relay a refused door answer to the page, keeping the door's status, message, and retry hint. */
function relay_refusal(answer) {
	const retryAfterMs = typeof answer.body === "object" && answer.body !== null ? answer.body.retryAfterMs : void 0;
	return json_response(answer.status, {
		message: chatbe_host_message(answer),
		...(typeof retryAfterMs === "number" ? { retryAfterMs } : {}),
	});
}
async function door(ctx, path, body, schema) {
	const answer = await ctx.host.post(path, body);
	if (answer.status !== 200) return relay_refusal(answer);
	const parsed = schema.safeParse(answer.body);
	if (!parsed.success) return refuse(502, `The host answered ${path} with an unexpected shape`);
	return parsed.data;
}
var read_answer_schema = object({ document: unknown() });
var write_answer_schema = object({
	revision: number(),
	byteSize: number(),
});
var write_batch_answer_schema = object({ documents: unknown() });
var list_answer_schema = object({
	documents: array(unknown()),
	cursor: string().nullable(),
	isDone: boolean(),
});
var files_read_answer_schema = object({
	path: string(),
	content: string(),
});
var files_write_answer_schema = object({
	path: string(),
	nodeId: string(),
});
var folders_ensure_answer_schema = object({
	nodeId: string(),
	path: string(),
	created: boolean(),
});
function data_read(ctx, collection, key) {
	return door(
		ctx,
		"/api/v1/plugin-data/read",
		{
			collection,
			key,
		},
		read_answer_schema,
	);
}
function data_write(ctx, collection, key, value) {
	return door(
		ctx,
		"/api/v1/plugin-data/write",
		{
			collection,
			key,
			value,
		},
		write_answer_schema,
	);
}
function data_write_batch(ctx, documents) {
	return door(ctx, "/api/v1/plugin-data/write-batch", { documents }, write_batch_answer_schema);
}
function data_list(ctx, body) {
	return door(ctx, "/api/v1/plugin-data/list", body, list_answer_schema);
}
/**
 * Read one transcript file; a missing file answers null instead of a refusal, for heal paths.
 * Transcript files stay under the rollover cap, so the route's read cap never truncates one.
 */
async function files_read_or_null(ctx, path) {
	const answer = await ctx.host.post("/api/v1/files/read", { path });
	if (answer.status === 404) return null;
	if (answer.status !== 200) return relay_refusal(answer);
	const parsed = files_read_answer_schema.safeParse(answer.body);
	if (!parsed.success) return refuse(502, "The host answered /api/v1/files/read with an unexpected shape");
	return parsed.data;
}
/**
 * Every transcript write asks for the plugin-named lock. On a create that locks the new file;
 * on an update the door ignores the request and the existing lock stays.
 */
function files_write(ctx, path, content) {
	return door(
		ctx,
		"/api/v1/files/write",
		{
			path,
			content,
			nonCollaborative: true,
			access: { readOnly: true },
		},
		files_write_answer_schema,
	);
}
function folders_ensure(ctx, path, access) {
	return door(
		ctx,
		"/api/v1/files/plugin-folders/ensure",
		{
			path,
			...(access ? { access } : {}),
		},
		folders_ensure_answer_schema,
	);
}
function files_archive(ctx, path) {
	return door(ctx, "/api/v1/files/plugin-archive", { path }, object({ archivedNodes: number() }));
}
var stored_doc_schema = object({
	key: string(),
	value: record(string(), unknown()),
	revision: number(),
	createdBy: string(),
	createdAt: number(),
});
function parse_stored_doc(raw) {
	const parsed = stored_doc_schema.safeParse(raw);
	return parsed.success ? parsed.data : null;
}
function parse_message_doc(raw) {
	const doc = parse_stored_doc(raw);
	if (doc === null) return null;
	const value = chat_message_value_schema.safeParse(doc.value);
	if (!value.success) return null;
	const rawAuthorName = doc.value.authorName;
	return {
		key: doc.key,
		createdBy: doc.createdBy,
		createdAt: chat_key_timestamp(doc.key) ?? doc.createdAt,
		value: value.data,
		authorName: typeof rawAuthorName === "string" ? rawAuthorName : null,
	};
}
/** Which store collection a message-shaped key lives in: 3 segments = root, 5 = reply. */
function message_collection_for_key(key) {
	const parts = key.split(":").length;
	if (parts === 3) return "messages";
	if (parts === 5) return "replies";
	return null;
}
function to_projection_message(doc) {
	return {
		key: doc.key,
		createdAt: doc.createdAt,
		createdBy: doc.createdBy,
		value: {
			text: doc.value.text,
			attachments: doc.value.attachments.map((attachment) => ({ name: attachment.name })),
			editedAt: doc.value.editedAt,
			deletedAt: doc.value.deletedAt,
		},
	};
}
/** Render one block with the message's own author snapshot, per-message, never a shared roster. */
function render_block(doc, reactions) {
	const indent = message_collection_for_key(doc.key) === "replies" ? "  " : "";
	return chatbe_format_message_block({
		message: to_projection_message(doc),
		indent,
		displayNames: /* @__PURE__ */ new Map([[doc.createdBy, chatbe_bounded_author_name(doc.authorName)]]),
		reactions,
	});
}
var reaction_doc_value_schema = object({ removed: boolean() });
/** The live reactions of one message, straight from the store. One page covers the palette. */
async function list_reactions_for(ctx, targetKey) {
	const listed = await data_list(ctx, {
		collection: "reactions",
		keyPrefix: `${targetKey}:`,
		limit: LIST_PAGE_SIZE,
	});
	if (listed instanceof Response) return listed;
	const reactions = [];
	for (const raw of listed.documents) {
		const doc = parse_stored_doc(raw);
		if (doc === null) continue;
		const value = reaction_doc_value_schema.safeParse(doc.value);
		if (!value.success) continue;
		const token = doc.key.slice(targetKey.length + 1).split(":")[0];
		if (!token || !chat_REACTION_TOKENS.includes(token)) continue;
		reactions.push({
			targetKey,
			token,
			removed: value.data.removed,
		});
	}
	return reactions;
}
function random_key_tail() {
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4));
	return Array.from(bytes)
		.map((byte) => (byte % 36).toString(36))
		.join("");
}
function mint_appended_key(prefix, nowMs) {
	return `${prefix}${chat_inverted_ms(nowMs)}:${random_key_tail()}`;
}
function message_value_json(value) {
	return chatbe_utf8_byte_size(JSON.stringify(value));
}
async function read_root_state(ctx) {
	const read = await data_read(ctx, chatbe_PROJECTION_COLLECTION, chatbe_ROOT_STATE_KEY);
	if (read instanceof Response) return read;
	const doc = parse_stored_doc(read.document);
	if (doc === null) return null;
	const state = chatbe_root_state_schema.safeParse(doc.value);
	return state.success ? state.data : null;
}
/** Every public channel's projection state, for README rows and slug-collision checks. */
async function list_public_channel_states(ctx) {
	const states = /* @__PURE__ */ new Map();
	const listed = await data_list(ctx, {
		collection: chatbe_PROJECTION_COLLECTION,
		limit: LIST_PAGE_SIZE,
	});
	if (listed instanceof Response) return listed;
	for (const raw of listed.documents) {
		const doc = parse_stored_doc(raw);
		if (doc === null || doc.key === "__root__") continue;
		const state = chatbe_channel_state_schema.safeParse(doc.value);
		if (state.success) states.set(doc.key, state.data);
	}
	return states;
}
async function write_readme(ctx, rootState, states) {
	const channels = [...states.values()]
		.filter((state) => !state.archived)
		.map((state) => ({
			name: state.name,
			slug: state.slug,
		}));
	return files_write(ctx, rootState.readmePath, chatbe_readme_markdown(channels));
}
/**
 * Make sure the projection root folder, the README, and the root state doc exist. The plan's
 * fallback name was `chitchat-<installation id prefix>`, but the invoke envelope carries no
 * installation id, so a occupied `/chitchat` falls back to a workspace-digest suffix instead.
 */
async function ensure_root(ctx) {
	const existing = await read_root_state(ctx);
	if (existing instanceof Response) return existing;
	if (existing !== null) return existing;
	let rootPath = DEFAULT_ROOT_PATH;
	let ensured = await folders_ensure(ctx, rootPath, { readOnly: true });
	if (ensured instanceof Response) {
		if (ensured.status !== 409) return ensured;
		rootPath = `${DEFAULT_ROOT_PATH}-${(await chatbe_sha256_hex(ctx.rootDigestInput)).slice(0, 8)}`;
		ensured = await folders_ensure(ctx, rootPath, { readOnly: true });
		if (ensured instanceof Response) return ensured;
	}
	const rootState = {
		rootPath,
		readmePath: `${rootPath}/README.md`,
	};
	const states = await list_public_channel_states(ctx);
	if (states instanceof Response) return states;
	const readme = await write_readme(ctx, rootState, states);
	if (readme instanceof Response) return readme;
	const stateWrite = await data_write(ctx, chatbe_PROJECTION_COLLECTION, chatbe_ROOT_STATE_KEY, rootState);
	if (stateWrite instanceof Response) return stateWrite;
	return rootState;
}
async function read_channel_doc(ctx, channelKey) {
	const read = await data_read(ctx, "channels", channelKey);
	if (read instanceof Response) return read;
	const doc = parse_stored_doc(read.document);
	if (doc === null) return refuse(404, "Channel not found");
	const value = chat_channel_value_schema.safeParse(doc.value);
	if (!value.success) return refuse(404, "Channel not found");
	return {
		key: channelKey,
		name: value.data.name,
		topic: value.data.topic ?? null,
		archived: value.data.archivedAt !== null,
		archivedAt: value.data.archivedAt,
	};
}
/**
 * Load one channel's projection state, creating the folder, the tail file, the state doc, and
 * (for a public channel) the README row when they are missing. First send on a fresh channel and
 * healing after a lost state doc both go through here.
 */
async function ensure_channel(ctx, channel) {
	const stateLocation = chatbe_channel_state_location(channel.key);
	const rootState = await ensure_root(ctx);
	if (rootState instanceof Response) return rootState;
	const read = await data_read(ctx, stateLocation.collection, stateLocation.key);
	if (read instanceof Response) return read;
	const existingDoc = parse_stored_doc(read.document);
	if (existingDoc !== null) {
		const existingState = chatbe_channel_state_schema.safeParse(existingDoc.value);
		if (existingState.success)
			return {
				rootState,
				state: existingState.data,
				stateLocation,
			};
	}
	let slug;
	let folderPath;
	if (chat_channel_is_private(channel.key)) {
		const digest = await chatbe_sha256_hex(channel.key);
		slug = `${slug_channel_name(channel.name)}-${digest.slice(0, 8)}`;
		folderPath = `${rootState.rootPath}/private/${slug}`;
		const parent = await folders_ensure(ctx, `${rootState.rootPath}/private`, { readOnly: true });
		if (parent instanceof Response) return parent;
		const folder = await folders_ensure(ctx, folderPath, {
			readOnly: true,
			readScopeId: channel.key,
		});
		if (folder instanceof Response) return folder;
	} else {
		const states = await list_public_channel_states(ctx);
		if (states instanceof Response) return states;
		slug = slug_channel_name(channel.name);
		for (const [stateKey, state] of states)
			if (stateKey !== channel.key && state.slug === slug) {
				slug = await chatbe_collision_slug(channel.name, channel.key);
				break;
			}
		folderPath = rootState.rootPath;
		states.set(channel.key, {
			slug,
			folderPath,
			tailIndex: 0,
			name: channel.name,
			topic: channel.topic,
			archived: channel.archived,
		});
		const readme = await write_readme(ctx, rootState, states);
		if (readme instanceof Response) return readme;
	}
	const state = {
		slug,
		folderPath,
		tailIndex: 0,
		name: channel.name,
		topic: channel.topic,
		archived: channel.archived,
	};
	const existingTail = await files_read_or_null(ctx, chatbe_tail_path(state));
	if (existingTail instanceof Response) return existingTail;
	if (existingTail === null) {
		const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
		const tail = await files_write(ctx, chatbe_tail_path(state), header);
		if (tail instanceof Response) return tail;
	}
	const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
	if (stateWrite instanceof Response) return stateWrite;
	return {
		rootState,
		state,
		stateLocation,
	};
}
/**
 * Append one rendered block to the channel's tail file. Refreshes a stale header (a rename that
 * went past the projection), and rolls the tail over into a numbered read-only file when the
 * append would cross the size cap. The rolled file keeps the old tail verbatim, header included —
 * a small, documented deviation from the core splitter's header-less rollover files.
 */
async function append_block(ctx, projection, channel, block) {
	const { state, stateLocation } = projection;
	const tailPath = chatbe_tail_path(state);
	const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
	const tail = await files_read_or_null(ctx, tailPath);
	if (tail instanceof Response) return tail;
	let content = tail === null ? header : tail.content;
	let stateChanged = false;
	if (state.name !== channel.name || state.topic !== channel.topic) {
		content = chatbe_replace_header(content, header);
		state.name = channel.name;
		state.topic = channel.topic;
		stateChanged = true;
	}
	const appended = `${content}\n\n${block}`;
	if (chatbe_utf8_byte_size(appended) > 1e5) {
		const archived = await files_write(
			ctx,
			chatbe_rollover_path(state.folderPath, state.slug, state.tailIndex + 1),
			content,
		);
		if (archived instanceof Response) return archived;
		const restarted = await files_write(ctx, tailPath, `${header}\n\n${block}`);
		if (restarted instanceof Response) return restarted;
		state.tailIndex += 1;
		stateChanged = true;
	} else {
		const written = await files_write(ctx, tailPath, appended);
		if (written instanceof Response) return written;
	}
	if (stateChanged) {
		const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
		if (stateWrite instanceof Response) return stateWrite;
	}
	return null;
}
/**
 * Find the transcript file containing a block and rewrite it with `edit`. Scans the tail first,
 * then the rolled files newest-first, bounded. Answers false when the block is in none of them —
 * the store is already correct and reconcile will heal the transcript.
 */
async function update_block_in_transcript(ctx, state, key, edit) {
	const paths = [chatbe_tail_path(state)];
	for (let index = state.tailIndex; index >= 1 && paths.length < TRANSCRIPT_SCAN_MAX_FILES; index -= 1)
		paths.push(chatbe_rollover_path(state.folderPath, state.slug, index));
	for (const path of paths) {
		const file = await files_read_or_null(ctx, path);
		if (file instanceof Response) return file;
		if (file === null) continue;
		const edited = edit(file.content);
		if (edited === null) continue;
		const written = await files_write(ctx, path, edited);
		if (written instanceof Response) return written;
		return true;
	}
	return false;
}
/** A replayed clientRequestId answers the stored outcome instead of sending twice. */
async function read_request_state(ctx, clientRequestId) {
	const read = await data_read(ctx, chatbe_REQUESTS_COLLECTION, clientRequestId);
	if (read instanceof Response) return read;
	const doc = parse_stored_doc(read.document);
	if (doc === null) return null;
	const state = chatbe_request_state_schema.safeParse(doc.value);
	return state.success ? state.data : null;
}
var send_input_schema = object({
	channelKey: string().min(1).max(128),
	text: string().min(1),
	attachments: array(chat_attachment_schema).max(20).default([]),
	mentions: array(chat_user_id_schema).max(50).default([]),
	/** The sender's own display name, snapshotted onto the message for transcript rendering. */
	authorName: string().nullable().default(null),
	clientRequestId: string().min(1).max(64),
});
async function handle_message_send(ctx, input) {
	const replayed = await read_request_state(ctx, input.clientRequestId);
	if (replayed instanceof Response) return replayed;
	if (replayed !== null) {
		const repaired = await repair_replayed_block(ctx, replayed.messageKey);
		if (repaired instanceof Response) return repaired;
		return json_response(200, {
			messageKey: replayed.messageKey,
			replayed: true,
		});
	}
	const channel = await read_channel_doc(ctx, input.channelKey);
	if (channel instanceof Response) return channel;
	if (channel.archived) return refuse(409, "This channel is archived");
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) return projection;
	const messageKey = mint_appended_key(`${input.channelKey}:`, ctx.now);
	const value = {
		text: input.text,
		attachments: input.attachments,
		editedAt: null,
		deletedAt: null,
		...(input.mentions.length > 0 ? { mentions: input.mentions } : {}),
		...(chatbe_bounded_author_name(input.authorName) !== null
			? { authorName: chatbe_bounded_author_name(input.authorName) }
			: {}),
	};
	if (message_value_json(value) > STORE_VALUE_MAX_BYTES)
		return refuse(413, "This message is too long to store. Shorten it and send again.");
	const written = await data_write_batch(ctx, [
		{
			collection: "messages",
			key: messageKey,
			value,
		},
		{
			collection: chatbe_REQUESTS_COLLECTION,
			key: input.clientRequestId,
			value: {
				endpoint: "message-send",
				messageKey,
				createdAt: ctx.now,
			},
		},
	]);
	if (written instanceof Response) return written;
	const doc = parse_message_doc({
		key: messageKey,
		value,
		revision: 1,
		createdBy: ctx.actorUserId,
		createdAt: ctx.now,
	});
	if (doc === null) return refuse(500, "Failed to render the sent message");
	const appended = await append_block(ctx, projection, channel, render_block(doc, []));
	if (appended instanceof Response) return appended;
	return json_response(200, { messageKey });
}
var reply_input_schema = object({
	rootMessageKey: string().min(1).max(200),
	text: string().min(1),
	attachments: array(chat_attachment_schema).max(20).default([]),
	mentions: array(chat_user_id_schema).max(50).default([]),
	authorName: string().nullable().default(null),
	clientRequestId: string().min(1).max(64),
});
async function handle_reply_send(ctx, input) {
	const replayed = await read_request_state(ctx, input.clientRequestId);
	if (replayed instanceof Response) return replayed;
	if (replayed !== null) {
		const repaired = await repair_replayed_block(ctx, replayed.messageKey);
		if (repaired instanceof Response) return repaired;
		return json_response(200, {
			messageKey: replayed.messageKey,
			replayed: true,
		});
	}
	if (message_collection_for_key(input.rootMessageKey) !== "messages")
		return refuse(400, "Replies can only answer a root message");
	const channelKey = chat_message_channel_key(input.rootMessageKey) ?? input.rootMessageKey.split(":")[0];
	const rootRead = await data_read(ctx, "messages", input.rootMessageKey);
	if (rootRead instanceof Response) return rootRead;
	if (parse_message_doc(rootRead.document) === null) return refuse(404, "Message not found");
	const channel = await read_channel_doc(ctx, channelKey);
	if (channel instanceof Response) return channel;
	if (channel.archived) return refuse(409, "This channel is archived");
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) return projection;
	const replyKey = mint_appended_key(`${input.rootMessageKey}:`, ctx.now);
	const value = {
		text: input.text,
		attachments: input.attachments,
		editedAt: null,
		deletedAt: null,
		...(input.mentions.length > 0 ? { mentions: input.mentions } : {}),
		...(chatbe_bounded_author_name(input.authorName) !== null
			? { authorName: chatbe_bounded_author_name(input.authorName) }
			: {}),
	};
	if (message_value_json(value) > STORE_VALUE_MAX_BYTES)
		return refuse(413, "This message is too long to store. Shorten it and send again.");
	const written = await data_write_batch(ctx, [
		{
			collection: "replies",
			key: replyKey,
			value,
		},
		{
			collection: chatbe_REQUESTS_COLLECTION,
			key: input.clientRequestId,
			value: {
				endpoint: "reply-send",
				messageKey: replyKey,
				createdAt: ctx.now,
			},
		},
	]);
	if (written instanceof Response) return written;
	const doc = parse_message_doc({
		key: replyKey,
		value,
		revision: 1,
		createdBy: ctx.actorUserId,
		createdAt: ctx.now,
	});
	if (doc === null) return refuse(500, "Failed to render the sent reply");
	const block = render_block(doc, []);
	const transcriptUpdated = await update_block_in_transcript(ctx, projection.state, input.rootMessageKey, (content) =>
		chatbe_insert_reply_block(content, input.rootMessageKey, block),
	);
	if (transcriptUpdated instanceof Response) return transcriptUpdated;
	return json_response(200, {
		messageKey: replyKey,
		transcriptUpdated,
	});
}
var edit_input_schema = object({
	messageKey: string().min(1).max(200),
	text: string().min(1),
	mentions: array(chat_user_id_schema).max(50).default([]),
});
var delete_input_schema = object({ messageKey: string().min(1).max(200) });
async function load_own_message(ctx, messageKey) {
	const collection = message_collection_for_key(messageKey);
	if (collection === null) return refuse(400, "Not a message key");
	const read = await data_read(ctx, collection, messageKey);
	if (read instanceof Response) return read;
	const doc = parse_message_doc(read.document);
	if (doc === null) return refuse(404, "Message not found");
	if (doc.createdBy !== ctx.actorUserId) return refuse(403, "You can only change your own messages");
	return {
		collection,
		doc,
	};
}
/**
 * Whether a block for `key` is already in one of the channel's transcript files. Scans the same
 * bounded set of files `update_block_in_transcript` scans: the tail first, then rolled files
 * newest-first.
 */
async function transcript_has_block(ctx, state, key) {
	const paths = [chatbe_tail_path(state)];
	for (let index = state.tailIndex; index >= 1 && paths.length < TRANSCRIPT_SCAN_MAX_FILES; index -= 1)
		paths.push(chatbe_rollover_path(state.folderPath, state.slug, index));
	for (const path of paths) {
		const file = await files_read_or_null(ctx, path);
		if (file instanceof Response) return file;
		if (file !== null && chatbe_file_contains_block(file.content, key)) return true;
	}
	return false;
}
/**
 * Write the transcript block of a replayed send when the first attempt never wrote it.
 *
 * The store and the transcript are two systems with one write each. A send writes the store
 * first. If the run dies after that write, the page retries with the same request id, and the
 * replay branch would answer "already done" while the block is still missing from the file. So
 * look for the block first and write it only when it is absent. A block that is already there is
 * left alone, which is what makes this safe to run on every replay.
 */
async function repair_replayed_block(ctx, messageKey) {
	const collection = message_collection_for_key(messageKey);
	if (collection === null) return null;
	const channel = await read_channel_doc(ctx, messageKey.split(":")[0]);
	if (channel instanceof Response) return channel;
	if (channel.archived) return null;
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) return projection;
	const present = await transcript_has_block(ctx, projection.state, messageKey);
	if (present instanceof Response) return present;
	if (present) return null;
	const read = await data_read(ctx, collection, messageKey);
	if (read instanceof Response) return read;
	const doc = parse_message_doc(read.document);
	if (doc === null) return null;
	const block = render_block(doc, []);
	if (collection === "messages") {
		const appended = await append_block(ctx, projection, channel, block);
		return appended instanceof Response ? appended : null;
	}
	const rootKey = chat_reply_root_key(messageKey);
	if (rootKey === null) return null;
	const inserted = await update_block_in_transcript(ctx, projection.state, rootKey, (content) =>
		chatbe_insert_reply_block(content, rootKey, block),
	);
	return inserted instanceof Response ? inserted : null;
}
async function splice_updated_block(ctx, doc) {
	const channelKey = doc.key.split(":")[0];
	const channel = await read_channel_doc(ctx, channelKey);
	if (channel instanceof Response) return channel;
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) return projection;
	const reactions = await list_reactions_for(ctx, doc.key);
	if (reactions instanceof Response) return reactions;
	const block = render_block(doc, reactions);
	return update_block_in_transcript(ctx, projection.state, doc.key, (content) =>
		chatbe_splice_block(content, doc.key, block),
	);
}
async function handle_message_edit(ctx, input) {
	const loaded = await load_own_message(ctx, input.messageKey);
	if (loaded instanceof Response) return loaded;
	if (loaded.doc.value.deletedAt !== null) return refuse(409, "This message was deleted");
	const value = {
		text: input.text,
		attachments: loaded.doc.value.attachments,
		editedAt: ctx.now,
		deletedAt: null,
		...(input.mentions.length > 0 ? { mentions: input.mentions } : {}),
		...(loaded.doc.authorName !== null ? { authorName: loaded.doc.authorName } : {}),
	};
	if (message_value_json(value) > STORE_VALUE_MAX_BYTES)
		return refuse(413, "This message is too long to store. Shorten it and send again.");
	const written = await data_write(ctx, loaded.collection, input.messageKey, value);
	if (written instanceof Response) return written;
	const transcriptUpdated = await splice_updated_block(ctx, {
		...loaded.doc,
		value: {
			...loaded.doc.value,
			text: input.text,
			editedAt: ctx.now,
			mentions: input.mentions,
		},
	});
	if (transcriptUpdated instanceof Response) return transcriptUpdated;
	return json_response(200, {
		transcriptUpdated,
		revision: written.revision,
	});
}
async function handle_message_delete(ctx, input) {
	const loaded = await load_own_message(ctx, input.messageKey);
	if (loaded instanceof Response) return loaded;
	if (loaded.doc.value.deletedAt !== null)
		return json_response(200, {
			transcriptUpdated: false,
			replayed: true,
		});
	const value = {
		text: loaded.doc.value.text,
		attachments: loaded.doc.value.attachments,
		editedAt: loaded.doc.value.editedAt,
		deletedAt: ctx.now,
		...(loaded.doc.value.mentions !== void 0 ? { mentions: loaded.doc.value.mentions } : {}),
		...(loaded.doc.authorName !== null ? { authorName: loaded.doc.authorName } : {}),
	};
	const written = await data_write(ctx, loaded.collection, input.messageKey, value);
	if (written instanceof Response) return written;
	const transcriptUpdated = await splice_updated_block(ctx, {
		...loaded.doc,
		value: {
			...loaded.doc.value,
			deletedAt: ctx.now,
		},
	});
	if (transcriptUpdated instanceof Response) return transcriptUpdated;
	return json_response(200, {
		transcriptUpdated,
		revision: written.revision,
	});
}
var reaction_input_schema = object({
	targetKey: string().min(1).max(200),
	token: _enum(chat_REACTION_TOKENS),
	on: boolean(),
});
async function handle_reaction_toggle(ctx, input) {
	const collection = message_collection_for_key(input.targetKey);
	if (collection === null) return refuse(400, "Not a message key");
	const read = await data_read(ctx, collection, input.targetKey);
	if (read instanceof Response) return read;
	const target = parse_message_doc(read.document);
	if (target === null) return refuse(404, "Message not found");
	const reactionKey = `${input.targetKey}:${input.token}:${ctx.actorUserId}`;
	const written = await data_write(ctx, "reactions", reactionKey, { removed: !input.on });
	if (written instanceof Response) return written;
	const transcriptUpdated = await splice_updated_block(ctx, target);
	if (transcriptUpdated instanceof Response) return transcriptUpdated;
	return json_response(200, {
		transcriptUpdated,
		key: reactionKey,
		revision: written.revision,
	});
}
var channel_manage_input_schema = discriminatedUnion("action", [
	object({
		action: literal("create"),
		name: string().min(1).max(64),
		topic: string().max(250).nullable().default(null),
		clientRequestId: string().min(1).max(64),
	}),
	object({
		action: literal("ensure"),
		channelKey: string().min(1).max(128),
	}),
	object({
		action: literal("update"),
		channelKey: string().min(1).max(128),
		name: string().min(1).max(64).optional(),
		topic: string().max(250).nullable().optional(),
		archived: boolean().optional(),
	}),
]);
/**
 * After a channel doc change, refresh the projection: state fields, the README (public
 * channels), and the tail header — a rename must show in the transcript without waiting for the
 * next append.
 */
async function refresh_channel_projection(ctx, channel) {
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) return projection;
	const { state, stateLocation, rootState } = projection;
	if (state.name !== channel.name || state.topic !== channel.topic || state.archived !== channel.archived) {
		if (state.name !== channel.name || state.topic !== channel.topic) {
			const tailPath = chatbe_tail_path(state);
			const tail = await files_read_or_null(ctx, tailPath);
			if (tail instanceof Response) return tail;
			if (tail !== null) {
				const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
				const written = await files_write(ctx, tailPath, chatbe_replace_header(tail.content, header));
				if (written instanceof Response) return written;
			}
		}
		state.name = channel.name;
		state.topic = channel.topic;
		state.archived = channel.archived;
		const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
		if (stateWrite instanceof Response) return stateWrite;
	}
	if (!chat_channel_is_private(channel.key)) {
		const states = await list_public_channel_states(ctx);
		if (states instanceof Response) return states;
		const readme = await write_readme(ctx, rootState, states);
		if (readme instanceof Response) return readme;
	}
	return null;
}
async function handle_channel_manage(ctx, input) {
	if (input.action === "create") {
		const replayed = await read_request_state(ctx, input.clientRequestId);
		if (replayed instanceof Response) return replayed;
		if (replayed !== null) {
			const channel = await read_channel_doc(ctx, replayed.messageKey);
			if (channel instanceof Response) return channel;
			const ensured = await ensure_channel(ctx, channel);
			if (ensured instanceof Response) return ensured;
			return json_response(200, {
				channelKey: replayed.messageKey,
				replayed: true,
			});
		}
		const channelKey = crypto.randomUUID();
		const written = await data_write_batch(ctx, [
			{
				collection: "channels",
				key: channelKey,
				value: {
					name: input.name,
					archivedAt: null,
					...(input.topic !== null && input.topic !== "" ? { topic: input.topic } : {}),
				},
			},
			{
				collection: chatbe_REQUESTS_COLLECTION,
				key: input.clientRequestId,
				value: {
					endpoint: "channel-manage",
					messageKey: channelKey,
					createdAt: ctx.now,
				},
			},
		]);
		if (written instanceof Response) return written;
		const ensured = await ensure_channel(ctx, {
			key: channelKey,
			name: input.name,
			topic: input.topic !== "" ? input.topic : null,
			archived: false,
			archivedAt: null,
		});
		if (ensured instanceof Response) return ensured;
		return json_response(200, { channelKey });
	}
	const channel = await read_channel_doc(ctx, input.channelKey);
	if (channel instanceof Response) return channel;
	if (input.action === "ensure") {
		const ensured = await ensure_channel(ctx, channel);
		if (ensured instanceof Response) return ensured;
		return json_response(200, {});
	}
	const archivedAt =
		input.archived === void 0 ? channel.archivedAt : input.archived ? (channel.archivedAt ?? ctx.now) : null;
	const updated = {
		key: channel.key,
		name: input.name ?? channel.name,
		topic: input.topic !== void 0 ? input.topic : channel.topic,
		archived: archivedAt !== null,
		archivedAt,
	};
	const value = {
		name: updated.name,
		archivedAt: updated.archivedAt,
		...(updated.topic !== null ? { topic: updated.topic } : {}),
	};
	const written = await data_write(ctx, "channels", channel.key, value);
	if (written instanceof Response) return written;
	const refreshed = await refresh_channel_projection(ctx, updated);
	if (refreshed instanceof Response) return refreshed;
	return json_response(200, {});
}
var reconcile_input_schema = object({ channelKey: string().min(1).max(128).nullable().default(null) });
/**
 * Rebuild one channel's transcript from the store. When the channel fits the run's list caps,
 * the whole file set is rewritten; a larger channel gets a truncated tail-only rebuild and says
 * so — a deviation from the plan's unbounded resumable rebuild, sized to dev-scale data.
 */
async function handle_reconcile(ctx, input) {
	if (input.channelKey === null) {
		const rootState = await ensure_root(ctx);
		if (rootState instanceof Response) return rootState;
		const states = await list_public_channel_states(ctx);
		if (states instanceof Response) return states;
		const readme = await write_readme(ctx, rootState, states);
		if (readme instanceof Response) return readme;
		return json_response(200, { done: true });
	}
	const channel = await read_channel_doc(ctx, input.channelKey);
	if (channel instanceof Response) return channel;
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) return projection;
	const { state, stateLocation } = projection;
	const collect = async (collection, maxPages) => {
		const documents = [];
		let cursor = null;
		let isDone = false;
		for (let page = 0; page < maxPages && !isDone; page += 1) {
			const listed = await data_list(ctx, {
				collection,
				keyPrefix: `${input.channelKey}:`,
				limit: LIST_PAGE_SIZE,
				...(cursor !== null ? { cursor } : {}),
			});
			if (listed instanceof Response) return listed;
			documents.push(...listed.documents);
			cursor = listed.cursor;
			isDone = listed.isDone;
		}
		return {
			documents,
			isDone,
		};
	};
	const [messagesRaw, repliesRaw, reactionsRaw] = [
		await collect("messages", RECONCILE_MESSAGE_PAGES),
		await collect("replies", RECONCILE_REPLY_PAGES),
		await collect("reactions", RECONCILE_REACTION_PAGES),
	];
	if (messagesRaw instanceof Response) return messagesRaw;
	if (repliesRaw instanceof Response) return repliesRaw;
	if (reactionsRaw instanceof Response) return reactionsRaw;
	const messages = [];
	for (const raw of messagesRaw.documents) {
		const doc = parse_message_doc(raw);
		if (doc !== null && message_collection_for_key(doc.key) === "messages") messages.push(doc);
	}
	const repliesByRoot = /* @__PURE__ */ new Map();
	for (const raw of repliesRaw.documents) {
		const doc = parse_message_doc(raw);
		if (doc === null || message_collection_for_key(doc.key) !== "replies") continue;
		const rootKey = doc.key.split(":").slice(0, 3).join(":");
		const bucket = repliesByRoot.get(rootKey) ?? [];
		bucket.push(doc);
		repliesByRoot.set(rootKey, bucket);
	}
	const reactionsByTarget = /* @__PURE__ */ new Map();
	for (const raw of reactionsRaw.documents) {
		const doc = parse_stored_doc(raw);
		if (doc === null) continue;
		const value = reaction_doc_value_schema.safeParse(doc.value);
		if (!value.success) continue;
		const parts = doc.key.split(":");
		const token = parts[parts.length - 2];
		if (!token || !chat_REACTION_TOKENS.includes(token)) continue;
		const targetKey = parts.slice(0, -2).join(":");
		const bucket = reactionsByTarget.get(targetKey) ?? [];
		bucket.push({
			targetKey,
			token,
			removed: value.data.removed,
		});
		reactionsByTarget.set(targetKey, bucket);
	}
	const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
	const sort = (docs) =>
		[...docs].sort((left, right) =>
			left.createdAt !== right.createdAt
				? left.createdAt - right.createdAt
				: left.key < right.key
					? -1
					: left.key > right.key
						? 1
						: 0,
		);
	const blocks = [];
	for (const message of sort(messages)) {
		blocks.push(render_block(message, reactionsByTarget.get(message.key) ?? []));
		for (const reply of sort(repliesByRoot.get(message.key) ?? []))
			blocks.push(render_block(reply, reactionsByTarget.get(reply.key) ?? []));
	}
	if (!messagesRaw.isDone || !repliesRaw.isDone || !reactionsRaw.isDone) {
		const files = chatbe_split_rollover({
			header,
			blocks,
			maxBytes: chatbe_ROLLOVER_MAX_BYTES,
		});
		const written = await files_write(ctx, chatbe_tail_path(state), files[files.length - 1]);
		if (written instanceof Response) return written;
		return json_response(200, {
			done: true,
			truncated: true,
		});
	}
	const files = chatbe_split_rollover({
		header,
		blocks,
		maxBytes: chatbe_ROLLOVER_MAX_BYTES,
	});
	for (let index = 0; index < files.length - 1; index += 1) {
		const written = await files_write(ctx, chatbe_rollover_path(state.folderPath, state.slug, index + 1), files[index]);
		if (written instanceof Response) return written;
	}
	const tailWritten = await files_write(ctx, chatbe_tail_path(state), files[files.length - 1]);
	if (tailWritten instanceof Response) return tailWritten;
	const newTailIndex = files.length - 1;
	for (let index = newTailIndex + 1; index <= state.tailIndex; index += 1) {
		const archived = await files_archive(ctx, chatbe_rollover_path(state.folderPath, state.slug, index));
		if (archived instanceof Response) return archived;
	}
	if (state.tailIndex !== newTailIndex || state.name !== channel.name || state.topic !== channel.topic) {
		state.tailIndex = newTailIndex;
		state.name = channel.name;
		state.topic = channel.topic;
		state.archived = channel.archived;
		const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
		if (stateWrite instanceof Response) return stateWrite;
	}
	return json_response(200, {
		done: true,
		files: files.length,
	});
}
async function handle_invoke(ctx, endpointId, input) {
	const parse = (schema) => {
		const parsed = schema.safeParse(input ?? {});
		if (!parsed.success) return refuse(400, "Invalid input for this endpoint");
		return parsed.data;
	};
	switch (endpointId) {
		case "message-send": {
			const parsed = parse(send_input_schema);
			return parsed instanceof Response ? parsed : handle_message_send(ctx, parsed);
		}
		case "message-edit": {
			const parsed = parse(edit_input_schema);
			return parsed instanceof Response ? parsed : handle_message_edit(ctx, parsed);
		}
		case "message-delete": {
			const parsed = parse(delete_input_schema);
			return parsed instanceof Response ? parsed : handle_message_delete(ctx, parsed);
		}
		case "reply-send": {
			const parsed = parse(reply_input_schema);
			return parsed instanceof Response ? parsed : handle_reply_send(ctx, parsed);
		}
		case "reaction-toggle": {
			const parsed = parse(reaction_input_schema);
			return parsed instanceof Response ? parsed : handle_reaction_toggle(ctx, parsed);
		}
		case "channel-manage": {
			const parsed = parse(channel_manage_input_schema);
			return parsed instanceof Response ? parsed : handle_channel_manage(ctx, parsed);
		}
		case "reconcile": {
			const parsed = parse(reconcile_input_schema);
			return parsed instanceof Response ? parsed : handle_reconcile(ctx, parsed);
		}
		default:
			return refuse(404, "Unknown endpoint");
	}
}
var worker = {
	async fetch(request, env) {
		let body;
		try {
			body = await request.json();
		} catch {
			return refuse(400, "Invalid request body");
		}
		const envelope = envelope_schema.safeParse(body);
		if (!envelope.success) return refuse(400, "Unsupported event");
		if (!chat_BACKEND_ENDPOINTS.some((endpoint) => endpoint.id === envelope.data.invoke.endpointId))
			return refuse(404, "Unknown endpoint");
		return handle_invoke(
			{
				host: chatbe_create_host(env),
				actorUserId: envelope.data.actorUserId,
				now: Date.now(),
				rootDigestInput: `${envelope.data.organizationId}:${envelope.data.workspaceId}`,
			},
			envelope.data.invoke.endpointId,
			envelope.data.invoke.input,
		);
	},
};
//#endregion
export { worker as default };
