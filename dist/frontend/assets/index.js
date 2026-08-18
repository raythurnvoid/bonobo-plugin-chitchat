//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes)
				if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true,
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/index.js
var version$1 = "1.44.0";
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/values/base64.js
var lookup = [];
var revLookup = [];
var Arr = Uint8Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
	lookup[i] = code[i];
	revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
	var len = b64.length;
	if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var validLen = b64.indexOf("=");
	if (validLen === -1) validLen = len;
	var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);
	return [validLen, placeHoldersLen];
}
function _byteLength(_b64, validLen, placeHoldersLen) {
	return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
}
function toByteArray(b64) {
	var tmp;
	var lens = getLens(b64);
	var validLen = lens[0];
	var placeHoldersLen = lens[1];
	var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
	var curByte = 0;
	var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
	var i;
	for (i = 0; i < len; i += 4) {
		tmp =
			(revLookup[b64.charCodeAt(i)] << 18) |
			(revLookup[b64.charCodeAt(i + 1)] << 12) |
			(revLookup[b64.charCodeAt(i + 2)] << 6) |
			revLookup[b64.charCodeAt(i + 3)];
		arr[curByte++] = (tmp >> 16) & 255;
		arr[curByte++] = (tmp >> 8) & 255;
		arr[curByte++] = tmp & 255;
	}
	if (placeHoldersLen === 2) {
		tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
		arr[curByte++] = tmp & 255;
	}
	if (placeHoldersLen === 1) {
		tmp =
			(revLookup[b64.charCodeAt(i)] << 10) |
			(revLookup[b64.charCodeAt(i + 1)] << 4) |
			(revLookup[b64.charCodeAt(i + 2)] >> 2);
		arr[curByte++] = (tmp >> 8) & 255;
		arr[curByte++] = tmp & 255;
	}
	return arr;
}
function tripletToBase64(num) {
	return lookup[(num >> 18) & 63] + lookup[(num >> 12) & 63] + lookup[(num >> 6) & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
	var tmp;
	var output = [];
	for (var i = start; i < end; i += 3) {
		tmp = ((uint8[i] << 16) & 16711680) + ((uint8[i + 1] << 8) & 65280) + (uint8[i + 2] & 255);
		output.push(tripletToBase64(tmp));
	}
	return output.join("");
}
function fromByteArray(uint8) {
	var tmp;
	var len = uint8.length;
	var extraBytes = len % 3;
	var parts = [];
	var maxChunkLength = 16383;
	for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)
		parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	if (extraBytes === 1) {
		tmp = uint8[len - 1];
		parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 63] + "==");
	} else if (extraBytes === 2) {
		tmp = (uint8[len - 2] << 8) + uint8[len - 1];
		parts.push(lookup[tmp >> 10] + lookup[(tmp >> 4) & 63] + lookup[(tmp << 2) & 63] + "=");
	}
	return parts.join("");
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/common/index.js
function parseArgs(args) {
	if (args === void 0) return {};
	if (!isSimpleObject(args)) throw new Error(`The arguments to a Convex function must be an object. Received: ${args}`);
	return args;
}
function validateDeploymentUrl(deploymentUrl) {
	if (typeof deploymentUrl === "undefined")
		throw new Error(
			`Client created with undefined deployment address. If you used an environment variable, check that it's set.`,
		);
	if (typeof deploymentUrl !== "string") throw new Error(`Invalid deployment address: found ${deploymentUrl}".`);
	if (!(deploymentUrl.startsWith("http:") || deploymentUrl.startsWith("https:")))
		throw new Error(`Invalid deployment address: Must start with "https://" or "http://". Found "${deploymentUrl}".`);
	try {
		new URL(deploymentUrl);
	} catch {
		throw new Error(
			`Invalid deployment address: "${deploymentUrl}" is not a valid URL. If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`,
		);
	}
	if (deploymentUrl.endsWith(".convex.site"))
		throw new Error(
			`Invalid deployment address: "${deploymentUrl}" ends with .convex.site, which is used for HTTP Actions. Convex deployment URLs typically end with .convex.cloud? If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`,
		);
}
function isSimpleObject(value) {
	const isObject = typeof value === "object";
	const prototype = Object.getPrototypeOf(value);
	const isSimple = prototype === null || prototype === Object.prototype || prototype?.constructor?.name === "Object";
	return isObject && isSimple;
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/values/value.js
var LITTLE_ENDIAN = true;
var MIN_INT64 = BigInt("-9223372036854775808");
var MAX_INT64 = BigInt("9223372036854775807");
var ZERO = BigInt("0");
var EIGHT = BigInt("8");
var TWOFIFTYSIX = BigInt("256");
var COMMIT_TS_UNRESOLVED =
	"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.";
var CommitTsPlaceholder = class {
	[Symbol.toPrimitive](hint) {
		if (hint === "string") return this.toString();
		throw new Error(COMMIT_TS_UNRESOLVED);
	}
	valueOf() {
		throw new Error(COMMIT_TS_UNRESOLVED);
	}
	toJSON() {
		throw new Error(COMMIT_TS_UNRESOLVED);
	}
	toString() {
		return "[unresolved commit timestamp]";
	}
};
var commitTsPlaceholder = new CommitTsPlaceholder();
function isSpecial(n) {
	return Number.isNaN(n) || !Number.isFinite(n) || Object.is(n, -0);
}
function slowBigIntToBase64(value) {
	if (value < ZERO) value -= MIN_INT64 + MIN_INT64;
	let hex = value.toString(16);
	if (hex.length % 2 === 1) hex = "0" + hex;
	const bytes = new Uint8Array(/* @__PURE__ */ new ArrayBuffer(8));
	let i = 0;
	for (const hexByte of hex.match(/.{2}/g).reverse()) {
		bytes.set([parseInt(hexByte, 16)], i++);
		value >>= EIGHT;
	}
	return fromByteArray(bytes);
}
function slowBase64ToBigInt(encoded) {
	const integerBytes = toByteArray(encoded);
	if (integerBytes.byteLength !== 8)
		throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
	let value = ZERO;
	let power = ZERO;
	for (const byte of integerBytes) {
		value += BigInt(byte) * TWOFIFTYSIX ** power;
		power++;
	}
	if (value > MAX_INT64) value += MIN_INT64 + MIN_INT64;
	return value;
}
function modernBigIntToBase64(value) {
	if (value < MIN_INT64 || MAX_INT64 < value)
		throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
	const buffer = /* @__PURE__ */ new ArrayBuffer(8);
	new DataView(buffer).setBigInt64(0, value, true);
	return fromByteArray(new Uint8Array(buffer));
}
function modernBase64ToBigInt(encoded) {
	const integerBytes = toByteArray(encoded);
	if (integerBytes.byteLength !== 8)
		throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
	return new DataView(integerBytes.buffer).getBigInt64(0, true);
}
var bigIntToBase64 = DataView.prototype.setBigInt64 ? modernBigIntToBase64 : slowBigIntToBase64;
var base64ToBigInt = DataView.prototype.getBigInt64 ? modernBase64ToBigInt : slowBase64ToBigInt;
var MAX_IDENTIFIER_LEN = 1024;
function validateObjectField(k) {
	if (k.length > MAX_IDENTIFIER_LEN)
		throw new Error(`Field name ${k} exceeds maximum field name length ${MAX_IDENTIFIER_LEN}.`);
	if (k.startsWith("$")) throw new Error(`Field name ${k} starts with a '$', which is reserved.`);
	for (let i = 0; i < k.length; i += 1) {
		const charCode = k.charCodeAt(i);
		if (charCode < 32 || charCode >= 127)
			throw new Error(
				`Field name ${k} has invalid character '${k[i]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function jsonToConvex(value) {
	if (value === null) return value;
	if (typeof value === "boolean") return value;
	if (typeof value === "number") return value;
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map((value2) => jsonToConvex(value2));
	if (typeof value !== "object") throw new Error(`Unexpected type of ${value}`);
	const entries = Object.entries(value);
	if (entries.length === 1) {
		const key = entries[0][0];
		if (key === "$bytes") {
			if (typeof value.$bytes !== "string") throw new Error(`Malformed $bytes field on ${value}`);
			return toByteArray(value.$bytes).buffer;
		}
		if (key === "$integer") {
			if (typeof value.$integer !== "string") throw new Error(`Malformed $integer field on ${value}`);
			return base64ToBigInt(value.$integer);
		}
		if (key === "$float") {
			if (typeof value.$float !== "string") throw new Error(`Malformed $float field on ${value}`);
			const floatBytes = toByteArray(value.$float);
			if (floatBytes.byteLength !== 8)
				throw new Error(`Received ${floatBytes.byteLength} bytes, expected 8 for $float`);
			const float = new DataView(floatBytes.buffer).getFloat64(0, LITTLE_ENDIAN);
			if (!isSpecial(float)) throw new Error(`Float ${float} should be encoded as a number`);
			return float;
		}
		if (key === "$commitTs") {
			if (value.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${value}`);
			return commitTsPlaceholder;
		}
		if (key === "$set") throw new Error(`Received a Set which is no longer supported as a Convex type.`);
		if (key === "$map") throw new Error(`Received a Map which is no longer supported as a Convex type.`);
	}
	const out = {};
	for (const [k, v] of Object.entries(value)) {
		validateObjectField(k);
		out[k] = jsonToConvex(v);
	}
	return out;
}
var MAX_VALUE_FOR_ERROR_LEN = 16384;
function stringifyValueForError(value) {
	const str = JSON.stringify(value, (_key, value2) => {
		if (value2 === void 0) return "undefined";
		if (typeof value2 === "bigint") return `${value2.toString()}n`;
		return value2;
	});
	if (str.length > MAX_VALUE_FOR_ERROR_LEN) {
		const rest = "[...truncated]";
		let truncateAt = MAX_VALUE_FOR_ERROR_LEN - 14;
		const codePoint = str.codePointAt(truncateAt - 1);
		if (codePoint !== void 0 && codePoint > 65535) truncateAt -= 1;
		return str.substring(0, truncateAt) + rest;
	}
	return str;
}
function convexToJsonInternal(value, originalValue, context, includeTopLevelUndefined) {
	if (value === void 0) {
		const contextText =
			context && ` (present at path ${context} in original object ${stringifyValueForError(originalValue)})`;
		throw new Error(
			`undefined is not a valid Convex value${contextText}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (value === null) return value;
	if (typeof value === "bigint") {
		if (value < MIN_INT64 || MAX_INT64 < value)
			throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
		return { $integer: bigIntToBase64(value) };
	}
	if (typeof value === "number")
		if (isSpecial(value)) {
			const buffer = /* @__PURE__ */ new ArrayBuffer(8);
			new DataView(buffer).setFloat64(0, value, LITTLE_ENDIAN);
			return { $float: fromByteArray(new Uint8Array(buffer)) };
		} else return value;
	if (typeof value === "boolean") return value;
	if (typeof value === "string") return value;
	if (value instanceof ArrayBuffer) return { $bytes: fromByteArray(new Uint8Array(value)) };
	if (value instanceof CommitTsPlaceholder) return { $commitTs: null };
	if (Array.isArray(value))
		return value.map((value2, i) => convexToJsonInternal(value2, originalValue, context + `[${i}]`, false));
	if (value instanceof Set) throw new Error(errorMessageForUnsupportedType(context, "Set", [...value], originalValue));
	if (value instanceof Map) throw new Error(errorMessageForUnsupportedType(context, "Map", [...value], originalValue));
	if (!isSimpleObject(value)) {
		const theType = value?.constructor?.name;
		const typeName = theType ? `${theType} ` : "";
		throw new Error(errorMessageForUnsupportedType(context, typeName, value, originalValue));
	}
	const out = {};
	const entries = Object.entries(value);
	entries.sort(([k1, _v1], [k2, _v2]) => (k1 === k2 ? 0 : k1 < k2 ? -1 : 1));
	for (const [k, v] of entries)
		if (v !== void 0) {
			validateObjectField(k);
			out[k] = convexToJsonInternal(v, originalValue, context + `.${k}`, false);
		} else if (includeTopLevelUndefined) {
			validateObjectField(k);
			out[k] = convexOrUndefinedToJsonInternal(v, originalValue, context + `.${k}`);
		}
	return out;
}
function errorMessageForUnsupportedType(context, typeName, value, originalValue) {
	if (context)
		return `${typeName}${stringifyValueForError(value)} is not a supported Convex type (present at path ${context} in original object ${stringifyValueForError(originalValue)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`;
	else return `${typeName}${stringifyValueForError(value)} is not a supported Convex type.`;
}
function convexOrUndefinedToJsonInternal(value, originalValue, context) {
	if (value === void 0) return { $undefined: null };
	else {
		if (originalValue === void 0)
			throw new Error(
				`Programming error. Current value is ${stringifyValueForError(value)} but original value is undefined`,
			);
		return convexToJsonInternal(value, originalValue, context, false);
	}
}
function convexToJson(value) {
	return convexToJsonInternal(value, value, "", false);
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/values/errors.js
var __defProp$11 = Object.defineProperty;
var __defNormalProp$11 = (obj, key, value) =>
	key in obj
		? __defProp$11(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$11 = (obj, key, value) => __defNormalProp$11(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a$2;
var _b;
var IDENTIFYING_FIELD = Symbol.for("ConvexError");
var ConvexError = class extends ((_b = Error), (_a$2 = IDENTIFYING_FIELD), _b) {
	constructor(data) {
		super(typeof data === "string" ? data : stringifyValueForError(data));
		__publicField$11(this, "name", "ConvexError");
		__publicField$11(this, "data");
		__publicField$11(this, _a$2, true);
		this.data = data;
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/logging.js
var __defProp$10 = Object.defineProperty;
var __defNormalProp$10 = (obj, key, value) =>
	key in obj
		? __defProp$10(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$10 = (obj, key, value) => __defNormalProp$10(obj, typeof key !== "symbol" ? key + "" : key, value);
var INFO_COLOR = "color:rgb(0, 145, 255)";
function prefix_for_source(source) {
	switch (source) {
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
var DefaultLogger = class {
	constructor(options) {
		__publicField$10(this, "_onLogLineFuncs");
		__publicField$10(this, "_verbose");
		this._onLogLineFuncs = {};
		this._verbose = options.verbose;
	}
	addLogLineListener(func) {
		let id = Math.random().toString(36).substring(2, 15);
		for (let i = 0; i < 10; i++) {
			if (this._onLogLineFuncs[id] === void 0) break;
			id = Math.random().toString(36).substring(2, 15);
		}
		this._onLogLineFuncs[id] = func;
		return () => {
			delete this._onLogLineFuncs[id];
		};
	}
	logVerbose(...args) {
		if (this._verbose)
			for (const func of Object.values(this._onLogLineFuncs))
				func("debug", `${/* @__PURE__ */ new Date().toISOString()}`, ...args);
	}
	log(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("info", ...args);
	}
	warn(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("warn", ...args);
	}
	error(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("error", ...args);
	}
};
function instantiateDefaultLogger(options) {
	const logger = new DefaultLogger(options);
	logger.addLogLineListener((level, ...args) => {
		switch (level) {
			case "debug":
				console.debug(...args);
				break;
			case "info":
				console.log(...args);
				break;
			case "warn":
				console.warn(...args);
				break;
			case "error":
				console.error(...args);
				break;
			default:
				console.log(...args);
		}
	});
	return logger;
}
function instantiateNoopLogger(options) {
	return new DefaultLogger(options);
}
function logForFunction(logger, type, source, udfPath, message) {
	const prefix = prefix_for_source(source);
	if (typeof message === "object") message = `ConvexError ${JSON.stringify(message.errorData, null, 2)}`;
	if (type === "info") {
		const match = message.match(/^\[.*?\] /);
		if (match === null) {
			logger.error(`[CONVEX ${prefix}(${udfPath})] Could not parse console.log`);
			return;
		}
		const level = message.slice(1, match[0].length - 2);
		const args = message.slice(match[0].length);
		logger.log(`%c[CONVEX ${prefix}(${udfPath})] [${level}]`, INFO_COLOR, args);
	} else logger.error(`[CONVEX ${prefix}(${udfPath})] ${message}`);
}
function logFatalError(logger, message) {
	const errorMessage = `[CONVEX FATAL ERROR] ${message}`;
	logger.error(errorMessage);
	return new Error(errorMessage);
}
function createHybridErrorStacktrace(source, udfPath, result) {
	return `[CONVEX ${prefix_for_source(source)}(${udfPath})] ${result.errorMessage}
  Called by client`;
}
function forwardData(result, error) {
	error.data = result.errorData;
	return error;
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/udf_path_utils.js
function canonicalizeUdfPath(udfPath) {
	const pieces = udfPath.split(":");
	let moduleName;
	let functionName;
	if (pieces.length === 1) {
		moduleName = pieces[0];
		functionName = "default";
	} else {
		moduleName = pieces.slice(0, pieces.length - 1).join(":");
		functionName = pieces[pieces.length - 1];
	}
	if (moduleName.endsWith(".js")) moduleName = moduleName.slice(0, -3);
	return `${moduleName}:${functionName}`;
}
function serializePathAndArgs(udfPath, args) {
	return JSON.stringify({
		udfPath: canonicalizeUdfPath(udfPath),
		args: convexToJson(args),
	});
}
function serializePaginatedPathAndArgs(udfPath, args, options) {
	const { initialNumItems, id } = options;
	return JSON.stringify({
		type: "paginated",
		udfPath: canonicalizeUdfPath(udfPath),
		args: convexToJson(args),
		options: convexToJson({
			initialNumItems,
			id,
		}),
	});
}
function serializedQueryTokenIsPaginated(token) {
	return JSON.parse(token).type === "paginated";
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/local_state.js
var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) =>
	key in obj
		? __defProp$9(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$9 = (obj, key, value) => __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
var LocalSyncState = class {
	constructor() {
		__publicField$9(this, "nextQueryId");
		__publicField$9(this, "querySetVersion");
		__publicField$9(this, "querySet");
		__publicField$9(this, "queryIdToToken");
		__publicField$9(this, "identityVersion");
		__publicField$9(this, "auth");
		__publicField$9(this, "outstandingQueriesOlderThanRestart");
		__publicField$9(this, "outstandingAuthOlderThanRestart");
		__publicField$9(this, "paused");
		__publicField$9(this, "pendingQuerySetModifications");
		this.nextQueryId = 0;
		this.querySetVersion = 0;
		this.identityVersion = 0;
		this.querySet = /* @__PURE__ */ new Map();
		this.queryIdToToken = /* @__PURE__ */ new Map();
		this.outstandingQueriesOlderThanRestart = /* @__PURE__ */ new Set();
		this.outstandingAuthOlderThanRestart = false;
		this.paused = false;
		this.pendingQuerySetModifications = /* @__PURE__ */ new Map();
	}
	hasSyncedPastLastReconnect() {
		return this.outstandingQueriesOlderThanRestart.size === 0 && !this.outstandingAuthOlderThanRestart;
	}
	markAuthCompletion() {
		this.outstandingAuthOlderThanRestart = false;
	}
	subscribe(udfPath, args, journal, componentPath) {
		const canonicalizedUdfPath = canonicalizeUdfPath(udfPath);
		const queryToken = serializePathAndArgs(canonicalizedUdfPath, args);
		const existingEntry = this.querySet.get(queryToken);
		if (existingEntry !== void 0) {
			existingEntry.numSubscribers += 1;
			return {
				queryToken,
				modification: null,
				unsubscribe: () => this.removeSubscriber(queryToken),
			};
		} else {
			const queryId = this.nextQueryId++;
			const query = {
				id: queryId,
				canonicalizedUdfPath,
				args,
				numSubscribers: 1,
				journal,
				componentPath,
			};
			this.querySet.set(queryToken, query);
			this.queryIdToToken.set(queryId, queryToken);
			const baseVersion = this.querySetVersion;
			const newVersion = this.querySetVersion + 1;
			const add = {
				type: "Add",
				queryId,
				udfPath: canonicalizedUdfPath,
				args: [convexToJson(args)],
				journal,
				componentPath,
			};
			if (this.paused) this.pendingQuerySetModifications.set(queryId, add);
			else this.querySetVersion = newVersion;
			return {
				queryToken,
				modification: {
					type: "ModifyQuerySet",
					baseVersion,
					newVersion,
					modifications: [add],
				},
				unsubscribe: () => this.removeSubscriber(queryToken),
			};
		}
	}
	transition(transition) {
		for (const modification of transition.modifications)
			switch (modification.type) {
				case "QueryUpdated":
				case "QueryFailed": {
					this.outstandingQueriesOlderThanRestart.delete(modification.queryId);
					const journal = modification.journal;
					if (journal !== void 0) {
						const queryToken = this.queryIdToToken.get(modification.queryId);
						if (queryToken !== void 0) this.querySet.get(queryToken).journal = journal;
					}
					break;
				}
				case "QueryRemoved":
					this.outstandingQueriesOlderThanRestart.delete(modification.queryId);
					break;
				default:
					throw new Error(`Invalid modification ${modification.type}`);
			}
	}
	queryId(udfPath, args) {
		const queryToken = serializePathAndArgs(canonicalizeUdfPath(udfPath), args);
		const existingEntry = this.querySet.get(queryToken);
		if (existingEntry !== void 0) return existingEntry.id;
		return null;
	}
	isCurrentOrNewerAuthVersion(version) {
		return version >= this.identityVersion;
	}
	getAuth() {
		return this.auth;
	}
	setAuth(value) {
		this.auth = {
			tokenType: "User",
			value,
		};
		const baseVersion = this.identityVersion;
		if (!this.paused) this.identityVersion = baseVersion + 1;
		return {
			type: "Authenticate",
			baseVersion,
			...this.auth,
		};
	}
	setAdminAuth(value, actingAs) {
		const auth = {
			tokenType: "Admin",
			value,
			impersonating: actingAs,
		};
		this.auth = auth;
		const baseVersion = this.identityVersion;
		if (!this.paused) this.identityVersion = baseVersion + 1;
		return {
			type: "Authenticate",
			baseVersion,
			...auth,
		};
	}
	clearAuth() {
		this.auth = void 0;
		this.markAuthCompletion();
		const baseVersion = this.identityVersion;
		if (!this.paused) this.identityVersion = baseVersion + 1;
		return {
			type: "Authenticate",
			tokenType: "None",
			baseVersion,
		};
	}
	hasAuth() {
		return !!this.auth;
	}
	isNewAuth(value) {
		return this.auth?.value !== value;
	}
	queryPath(queryId) {
		const pathAndArgs = this.queryIdToToken.get(queryId);
		if (pathAndArgs) return this.querySet.get(pathAndArgs).canonicalizedUdfPath;
		return null;
	}
	queryArgs(queryId) {
		const pathAndArgs = this.queryIdToToken.get(queryId);
		if (pathAndArgs) return this.querySet.get(pathAndArgs).args;
		return null;
	}
	queryToken(queryId) {
		return this.queryIdToToken.get(queryId) ?? null;
	}
	queryJournal(queryToken) {
		return this.querySet.get(queryToken)?.journal;
	}
	restart() {
		this.unpause();
		this.outstandingQueriesOlderThanRestart.clear();
		const modifications = [];
		for (const localQuery of this.querySet.values()) {
			const add = {
				type: "Add",
				queryId: localQuery.id,
				udfPath: localQuery.canonicalizedUdfPath,
				args: [convexToJson(localQuery.args)],
				journal: localQuery.journal,
				componentPath: localQuery.componentPath,
			};
			modifications.push(add);
			this.outstandingQueriesOlderThanRestart.add(localQuery.id);
		}
		this.querySetVersion = 1;
		const querySet = {
			type: "ModifyQuerySet",
			baseVersion: 0,
			newVersion: 1,
			modifications,
		};
		if (!this.auth) {
			this.identityVersion = 0;
			return [querySet, void 0];
		}
		this.outstandingAuthOlderThanRestart = true;
		const authenticate = {
			type: "Authenticate",
			baseVersion: 0,
			...this.auth,
		};
		this.identityVersion = 1;
		return [querySet, authenticate];
	}
	pause() {
		this.paused = true;
	}
	resume() {
		const querySet =
			this.pendingQuerySetModifications.size > 0
				? {
						type: "ModifyQuerySet",
						baseVersion: this.querySetVersion,
						newVersion: ++this.querySetVersion,
						modifications: Array.from(this.pendingQuerySetModifications.values()),
					}
				: void 0;
		const authenticate =
			this.auth !== void 0
				? {
						type: "Authenticate",
						baseVersion: this.identityVersion++,
						...this.auth,
					}
				: void 0;
		this.unpause();
		return [querySet, authenticate];
	}
	unpause() {
		this.paused = false;
		this.pendingQuerySetModifications.clear();
	}
	removeSubscriber(queryToken) {
		const localQuery = this.querySet.get(queryToken);
		if (localQuery.numSubscribers > 1) {
			localQuery.numSubscribers -= 1;
			return null;
		} else {
			this.querySet.delete(queryToken);
			this.queryIdToToken.delete(localQuery.id);
			this.outstandingQueriesOlderThanRestart.delete(localQuery.id);
			const baseVersion = this.querySetVersion;
			const newVersion = this.querySetVersion + 1;
			const remove = {
				type: "Remove",
				queryId: localQuery.id,
			};
			if (this.paused)
				if (this.pendingQuerySetModifications.has(localQuery.id))
					this.pendingQuerySetModifications.delete(localQuery.id);
				else this.pendingQuerySetModifications.set(localQuery.id, remove);
			else this.querySetVersion = newVersion;
			return {
				type: "ModifyQuerySet",
				baseVersion,
				newVersion,
				modifications: [remove],
			};
		}
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/request_manager.js
var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) =>
	key in obj
		? __defProp$8(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$8 = (obj, key, value) => __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
var RequestManager = class {
	constructor(logger, markConnectionStateDirty) {
		this.logger = logger;
		this.markConnectionStateDirty = markConnectionStateDirty;
		__publicField$8(this, "inflightRequests");
		__publicField$8(this, "requestsOlderThanRestart");
		__publicField$8(this, "inflightMutationsCount", 0);
		__publicField$8(this, "inflightActionsCount", 0);
		this.inflightRequests = /* @__PURE__ */ new Map();
		this.requestsOlderThanRestart = /* @__PURE__ */ new Set();
	}
	request(message, sent) {
		const result = new Promise((resolve) => {
			const status = sent ? "Requested" : "NotSent";
			this.inflightRequests.set(message.requestId, {
				message,
				status: {
					status,
					requestedAt: /* @__PURE__ */ new Date(),
					onResult: resolve,
				},
			});
			if (message.type === "Mutation") this.inflightMutationsCount++;
			else if (message.type === "Action") this.inflightActionsCount++;
		});
		this.markConnectionStateDirty();
		return result;
	}
	/**
	 * Update the state after receiving a response.
	 *
	 * @returns A RequestId if the request is complete and its optimistic update
	 * can be dropped, null otherwise.
	 */
	onResponse(response) {
		const requestInfo = this.inflightRequests.get(response.requestId);
		if (requestInfo === void 0) return null;
		if (requestInfo.status.status === "Completed") return null;
		const udfType = requestInfo.message.type === "Mutation" ? "mutation" : "action";
		const udfPath = requestInfo.message.udfPath;
		for (const line of response.logLines) logForFunction(this.logger, "info", udfType, udfPath, line);
		const status = requestInfo.status;
		let result;
		let onResolve;
		if (response.success) {
			result = {
				success: true,
				logLines: response.logLines,
				value: jsonToConvex(response.result),
			};
			onResolve = () => status.onResult(result);
		} else {
			const errorMessage = response.result;
			const { errorData } = response;
			logForFunction(this.logger, "error", udfType, udfPath, errorMessage);
			result = {
				success: false,
				errorMessage,
				errorData: errorData !== void 0 ? jsonToConvex(errorData) : void 0,
				logLines: response.logLines,
			};
			onResolve = () => status.onResult(result);
		}
		if (response.type === "ActionResponse" || !response.success) {
			onResolve();
			this.inflightRequests.delete(response.requestId);
			this.requestsOlderThanRestart.delete(response.requestId);
			if (requestInfo.message.type === "Action") this.inflightActionsCount--;
			else if (requestInfo.message.type === "Mutation") this.inflightMutationsCount--;
			this.markConnectionStateDirty();
			return {
				requestId: response.requestId,
				result,
			};
		}
		requestInfo.status = {
			status: "Completed",
			result,
			ts: response.ts,
			onResolve,
		};
		return null;
	}
	removeCompleted(ts) {
		const completeRequests = /* @__PURE__ */ new Map();
		for (const [requestId, requestInfo] of this.inflightRequests.entries()) {
			const status = requestInfo.status;
			if (status.status === "Completed" && status.ts.lessThanOrEqual(ts)) {
				status.onResolve();
				completeRequests.set(requestId, status.result);
				if (requestInfo.message.type === "Mutation") this.inflightMutationsCount--;
				else if (requestInfo.message.type === "Action") this.inflightActionsCount--;
				this.inflightRequests.delete(requestId);
				this.requestsOlderThanRestart.delete(requestId);
			}
		}
		if (completeRequests.size > 0) this.markConnectionStateDirty();
		return completeRequests;
	}
	restart() {
		this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
		const allMessages = [];
		for (const [requestId, value] of this.inflightRequests) {
			if (value.status.status === "NotSent") {
				value.status.status = "Requested";
				allMessages.push(value.message);
				continue;
			}
			if (value.message.type === "Mutation") allMessages.push(value.message);
			else if (value.message.type === "Action") {
				this.inflightRequests.delete(requestId);
				this.requestsOlderThanRestart.delete(requestId);
				this.inflightActionsCount--;
				if (value.status.status === "Completed") throw new Error("Action should never be in 'Completed' state");
				value.status.onResult({
					success: false,
					errorMessage: "Connection lost while action was in flight",
					logLines: [],
				});
			}
		}
		this.markConnectionStateDirty();
		return allMessages;
	}
	resume() {
		const allMessages = [];
		for (const [, value] of this.inflightRequests)
			if (value.status.status === "NotSent") {
				value.status.status = "Requested";
				allMessages.push(value.message);
				continue;
			}
		return allMessages;
	}
	/**
	 * @returns true if there are any requests that have been requested but have
	 * not be completed yet.
	 */
	hasIncompleteRequests() {
		for (const requestInfo of this.inflightRequests.values())
			if (requestInfo.status.status === "Requested") return true;
		return false;
	}
	/**
	 * @returns true if there are any inflight requests, including ones that have
	 * completed on the server, but have not been applied.
	 */
	hasInflightRequests() {
		return this.inflightRequests.size > 0;
	}
	/**
	 * @returns true if there are any inflight requests, that have been hanging around
	 * since prior to the most recent restart.
	 */
	hasSyncedPastLastReconnect() {
		return this.requestsOlderThanRestart.size === 0;
	}
	timeOfOldestInflightRequest() {
		if (this.inflightRequests.size === 0) return null;
		let oldestInflightRequest = Date.now();
		for (const request of this.inflightRequests.values())
			if (request.status.status !== "Completed") {
				if (request.status.requestedAt.getTime() < oldestInflightRequest)
					oldestInflightRequest = request.status.requestedAt.getTime();
			}
		return new Date(oldestInflightRequest);
	}
	/**
	 * @returns The number of mutations currently in flight.
	 */
	inflightMutations() {
		return this.inflightMutationsCount;
	}
	/**
	 * @returns The number of actions currently in flight.
	 */
	inflightActions() {
		return this.inflightActionsCount;
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/server/functionName.js
var functionName = Symbol.for("functionName");
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/server/components/paths.js
var toReferencePath = Symbol.for("toReferencePath");
function extractReferencePath(reference) {
	return reference[toReferencePath] ?? null;
}
function isFunctionHandle(s) {
	return s.startsWith("function://");
}
function getFunctionAddress(functionReference) {
	let functionAddress;
	if (typeof functionReference === "string")
		if (isFunctionHandle(functionReference)) functionAddress = { functionHandle: functionReference };
		else functionAddress = { name: functionReference };
	else if (functionReference[functionName]) functionAddress = { name: functionReference[functionName] };
	else {
		const referencePath = extractReferencePath(functionReference);
		if (!referencePath) throw new Error(`${functionReference} is not a functionReference`);
		functionAddress = { reference: referencePath };
	}
	return functionAddress;
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/server/api.js
function getFunctionName(functionReference) {
	const address = getFunctionAddress(functionReference);
	if (address.name === void 0) {
		if (address.functionHandle !== void 0)
			throw new Error(
				`Expected function reference like "api.file.func" or "internal.file.func", but received function handle ${address.functionHandle}`,
			);
		else if (address.reference !== void 0)
			throw new Error(
				`Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference ${address.reference}`,
			);
		throw new Error(
			`Expected function reference like "api.file.func" or "internal.file.func", but received ${JSON.stringify(address)}`,
		);
	}
	if (typeof functionReference === "string") return functionReference;
	const name = functionReference[functionName];
	if (!name) throw new Error(`${functionReference} is not a functionReference`);
	return name;
}
function createApi(pathParts = []) {
	return new Proxy(
		{},
		{
			get(_, prop) {
				if (typeof prop === "string") return createApi([...pathParts, prop]);
				else if (prop === functionName) {
					if (pathParts.length < 2) {
						const found = ["api", ...pathParts].join(".");
						throw new Error(
							`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${found}\``,
						);
					}
					const path = pathParts.slice(0, -1).join("/");
					const exportName = pathParts[pathParts.length - 1];
					if (exportName === "default") return path;
					else return path + ":" + exportName;
				} else if (prop === Symbol.toStringTag) return "FunctionReference";
				else return;
			},
		},
	);
}
var anyApi = createApi();
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/optimistic_updates_impl.js
var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) =>
	key in obj
		? __defProp$7(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
var OptimisticLocalStoreImpl = class OptimisticLocalStoreImpl {
	constructor(queryResults) {
		__publicField$7(this, "queryResults");
		__publicField$7(this, "modifiedQueries");
		this.queryResults = queryResults;
		this.modifiedQueries = [];
	}
	getQuery(query, ...args) {
		const queryArgs = parseArgs(args[0]);
		const name = getFunctionName(query);
		const queryResult = this.queryResults.get(serializePathAndArgs(name, queryArgs));
		if (queryResult === void 0) return;
		return OptimisticLocalStoreImpl.queryValue(queryResult.result);
	}
	getAllQueries(query) {
		const queriesWithName = [];
		const name = getFunctionName(query);
		for (const queryResult of this.queryResults.values())
			if (queryResult.udfPath === canonicalizeUdfPath(name))
				queriesWithName.push({
					args: queryResult.args,
					value: OptimisticLocalStoreImpl.queryValue(queryResult.result),
				});
		return queriesWithName;
	}
	setQuery(queryReference, args, value) {
		const queryArgs = parseArgs(args);
		const name = getFunctionName(queryReference);
		const queryToken = serializePathAndArgs(name, queryArgs);
		let result;
		if (value === void 0) result = void 0;
		else
			result = {
				success: true,
				value,
				logLines: [],
			};
		const query = {
			udfPath: name,
			args: queryArgs,
			result,
		};
		this.queryResults.set(queryToken, query);
		this.modifiedQueries.push(queryToken);
	}
	static queryValue(result) {
		if (result === void 0) return;
		else if (result.success) return result.value;
		else return;
	}
};
var OptimisticQueryResults = class {
	constructor() {
		__publicField$7(this, "queryResults");
		__publicField$7(this, "optimisticUpdates");
		this.queryResults = /* @__PURE__ */ new Map();
		this.optimisticUpdates = [];
	}
	/**
	 * Apply all optimistic updates on top of server query results
	 */
	ingestQueryResultsFromServer(serverQueryResults, optimisticUpdatesToDrop) {
		this.optimisticUpdates = this.optimisticUpdates.filter((updateAndId) => {
			return !optimisticUpdatesToDrop.has(updateAndId.mutationId);
		});
		const oldQueryResults = this.queryResults;
		this.queryResults = new Map(serverQueryResults);
		const localStore = new OptimisticLocalStoreImpl(this.queryResults);
		for (const updateAndId of this.optimisticUpdates) updateAndId.update(localStore);
		const changedQueries = [];
		for (const [queryToken, query] of this.queryResults) {
			const oldQuery = oldQueryResults.get(queryToken);
			if (oldQuery === void 0 || oldQuery.result !== query.result) changedQueries.push(queryToken);
		}
		return changedQueries;
	}
	applyOptimisticUpdate(update, mutationId) {
		this.optimisticUpdates.push({
			update,
			mutationId,
		});
		const localStore = new OptimisticLocalStoreImpl(this.queryResults);
		update(localStore);
		return localStore.modifiedQueries;
	}
	/**
	 * "Raw" with respect to errors vs values, but query results still have
	 * optimistic updates applied.
	 *
	 * @internal
	 */
	rawQueryResult(queryToken) {
		const query = this.queryResults.get(queryToken);
		if (query === void 0) return;
		return query.result;
	}
	queryResult(queryToken) {
		const query = this.queryResults.get(queryToken);
		if (query === void 0) return;
		const result = query.result;
		if (result === void 0) return;
		else if (result.success) return result.value;
		else {
			if (result.errorData !== void 0)
				throw forwardData(result, new ConvexError(createHybridErrorStacktrace("query", query.udfPath, result)));
			throw new Error(createHybridErrorStacktrace("query", query.udfPath, result));
		}
	}
	hasQueryResult(queryToken) {
		return this.queryResults.get(queryToken) !== void 0;
	}
	/**
	 * @internal
	 */
	queryLogs(queryToken) {
		return this.queryResults.get(queryToken)?.result?.logLines;
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/vendor/long.js
var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) =>
	key in obj
		? __defProp$6(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
var Long = class Long {
	constructor(low, high) {
		__publicField$6(this, "low");
		__publicField$6(this, "high");
		__publicField$6(this, "__isUnsignedLong__");
		this.low = low | 0;
		this.high = high | 0;
		this.__isUnsignedLong__ = true;
	}
	static isLong(obj) {
		return (obj && obj.__isUnsignedLong__) === true;
	}
	static fromBytesLE(bytes) {
		return new Long(
			bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24),
			bytes[4] | (bytes[5] << 8) | (bytes[6] << 16) | (bytes[7] << 24),
		);
	}
	toBytesLE() {
		const hi = this.high;
		const lo = this.low;
		return [
			lo & 255,
			(lo >>> 8) & 255,
			(lo >>> 16) & 255,
			lo >>> 24,
			hi & 255,
			(hi >>> 8) & 255,
			(hi >>> 16) & 255,
			hi >>> 24,
		];
	}
	static fromNumber(value) {
		if (isNaN(value)) return UZERO;
		if (value < 0) return UZERO;
		if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
		return new Long((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0);
	}
	toString() {
		return (BigInt(this.high) * BigInt(TWO_PWR_32_DBL) + BigInt(this.low)).toString();
	}
	equals(other) {
		if (!Long.isLong(other)) other = Long.fromValue(other);
		if (this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
		return this.high === other.high && this.low === other.low;
	}
	notEquals(other) {
		return !this.equals(other);
	}
	comp(other) {
		if (!Long.isLong(other)) other = Long.fromValue(other);
		if (this.equals(other)) return 0;
		return other.high >>> 0 > this.high >>> 0 || (other.high === this.high && other.low >>> 0 > this.low >>> 0)
			? -1
			: 1;
	}
	lessThanOrEqual(other) {
		return this.comp(other) <= 0;
	}
	static fromValue(val) {
		if (typeof val === "number") return Long.fromNumber(val);
		return new Long(val.low, val.high);
	}
};
var UZERO = new Long(0, 0);
var TWO_PWR_16_DBL = 65536;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var MAX_UNSIGNED_VALUE = new Long(-1, -1);
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/remote_query_set.js
var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) =>
	key in obj
		? __defProp$5(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
var RemoteQuerySet = class {
	constructor(queryPath, logger) {
		__publicField$5(this, "version");
		__publicField$5(this, "remoteQuerySet");
		__publicField$5(this, "queryPath");
		__publicField$5(this, "logger");
		this.version = {
			querySet: 0,
			ts: Long.fromNumber(0),
			identity: 0,
		};
		this.remoteQuerySet = /* @__PURE__ */ new Map();
		this.queryPath = queryPath;
		this.logger = logger;
	}
	transition(transition) {
		const start = transition.startVersion;
		if (
			this.version.querySet !== start.querySet ||
			this.version.ts.notEquals(start.ts) ||
			this.version.identity !== start.identity
		)
			throw new Error(
				`Invalid start version: ${start.ts.toString()}:${start.querySet}:${start.identity}, transitioning from ${this.version.ts.toString()}:${this.version.querySet}:${this.version.identity}`,
			);
		for (const modification of transition.modifications)
			switch (modification.type) {
				case "QueryUpdated": {
					const queryPath = this.queryPath(modification.queryId);
					if (queryPath)
						for (const line of modification.logLines) logForFunction(this.logger, "info", "query", queryPath, line);
					const value = jsonToConvex(modification.value ?? null);
					this.remoteQuerySet.set(modification.queryId, {
						success: true,
						value,
						logLines: modification.logLines,
					});
					break;
				}
				case "QueryFailed": {
					const queryPath = this.queryPath(modification.queryId);
					if (queryPath)
						for (const line of modification.logLines) logForFunction(this.logger, "info", "query", queryPath, line);
					const { errorData } = modification;
					this.remoteQuerySet.set(modification.queryId, {
						success: false,
						errorMessage: modification.errorMessage,
						errorData: errorData !== void 0 ? jsonToConvex(errorData) : void 0,
						logLines: modification.logLines,
					});
					break;
				}
				case "QueryRemoved":
					this.remoteQuerySet.delete(modification.queryId);
					break;
				default:
					throw new Error(`Invalid modification ${modification.type}`);
			}
		this.version = transition.endVersion;
	}
	remoteQueryResults() {
		return this.remoteQuerySet;
	}
	timestamp() {
		return this.version.ts;
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/protocol.js
function u64ToLong(encoded) {
	const integerBytes = toByteArray(encoded);
	return Long.fromBytesLE(Array.from(integerBytes));
}
function longToU64(raw) {
	return fromByteArray(new Uint8Array(raw.toBytesLE()));
}
function parseServerMessage(encoded) {
	switch (encoded.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...encoded };
		case "MutationResponse":
			if (encoded.success)
				return {
					...encoded,
					ts: u64ToLong(encoded.ts),
				};
			else return { ...encoded };
		case "Transition":
			return {
				...encoded,
				startVersion: {
					...encoded.startVersion,
					ts: u64ToLong(encoded.startVersion.ts),
				},
				endVersion: {
					...encoded.endVersion,
					ts: u64ToLong(encoded.endVersion.ts),
				},
			};
		default:
	}
}
function encodeClientMessage(message) {
	switch (message.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...message };
		case "Connect":
			if (message.maxObservedTimestamp !== void 0)
				return {
					...message,
					maxObservedTimestamp: longToU64(message.maxObservedTimestamp),
				};
			else
				return {
					...message,
					maxObservedTimestamp: void 0,
				};
		default:
	}
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/web_socket_manager.js
var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) =>
	key in obj
		? __defProp$4(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
var CLOSE_NORMAL = 1e3;
var CLOSE_GOING_AWAY = 1001;
var CLOSE_NO_STATUS = 1005;
var CLOSE_NOT_FOUND = 4040;
var firstTime;
function monotonicMillis() {
	if (firstTime === void 0) firstTime = Date.now();
	if (typeof performance === "undefined" || !performance.now) return Date.now();
	return Math.round(firstTime + performance.now());
}
function prettyNow() {
	return `t=${Math.round((monotonicMillis() - firstTime) / 100) / 10}s`;
}
var serverDisconnectErrors = {
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
function classifyDisconnectError(s) {
	if (s === void 0) return "Unknown";
	for (const prefix of Object.keys(serverDisconnectErrors)) if (s.startsWith(prefix)) return prefix;
	return "Unknown";
}
var WebSocketManager = class {
	constructor(uri, callbacks, webSocketConstructor, logger, markConnectionStateDirty, debug) {
		this.markConnectionStateDirty = markConnectionStateDirty;
		this.debug = debug;
		__publicField$4(this, "socket");
		__publicField$4(this, "connectionCount");
		__publicField$4(this, "_hasEverConnected", false);
		__publicField$4(this, "lastCloseReason");
		__publicField$4(this, "transitionChunkBuffer", null);
		/** Upon HTTPS/WSS failure, the first jittered backoff duration, in ms. */
		__publicField$4(this, "defaultInitialBackoff");
		/** We backoff exponentially, but we need to cap that--this is the jittered max. */
		__publicField$4(this, "maxBackoff");
		/** How many times have we failed consecutively? */
		__publicField$4(this, "retries");
		/** How long before lack of server response causes us to initiate a reconnect,
		 * in ms */
		__publicField$4(this, "serverInactivityThreshold");
		__publicField$4(this, "reconnectDueToServerInactivityTimeout");
		/** Scheduled reconnect state: timeout handle and timing info */
		__publicField$4(this, "scheduledReconnect", null);
		__publicField$4(this, "networkOnlineHandler", null);
		/** Pending event to send after reconnecting due to network recovery */
		__publicField$4(this, "pendingNetworkRecoveryInfo", null);
		__publicField$4(this, "uri");
		__publicField$4(this, "onOpen");
		__publicField$4(this, "onResume");
		__publicField$4(this, "onMessage");
		__publicField$4(this, "webSocketConstructor");
		__publicField$4(this, "logger");
		__publicField$4(this, "onServerDisconnectError");
		this.webSocketConstructor = webSocketConstructor;
		this.socket = { state: "disconnected" };
		this.connectionCount = 0;
		this.lastCloseReason = "InitialConnect";
		this.defaultInitialBackoff = 1e3;
		this.maxBackoff = 16e3;
		this.retries = 0;
		this.serverInactivityThreshold = 6e4;
		this.reconnectDueToServerInactivityTimeout = null;
		this.uri = uri;
		this.onOpen = callbacks.onOpen;
		this.onResume = callbacks.onResume;
		this.onMessage = callbacks.onMessage;
		this.onServerDisconnectError = callbacks.onServerDisconnectError;
		this.logger = logger;
		this.setupNetworkListener();
		this.connect();
	}
	setSocketState(state) {
		this.socket = state;
		this._logVerbose(
			`socket state changed: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}`,
		);
		this.markConnectionStateDirty();
	}
	setupNetworkListener() {
		if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
		if (this.networkOnlineHandler !== null) return;
		this.networkOnlineHandler = () => {
			this._logVerbose("network online event detected");
			this.tryReconnectImmediately();
		};
		window.addEventListener("online", this.networkOnlineHandler);
		this._logVerbose("network online event listener registered");
	}
	cleanupNetworkListener() {
		if (
			this.networkOnlineHandler &&
			typeof window !== "undefined" &&
			typeof window.removeEventListener === "function"
		) {
			window.removeEventListener("online", this.networkOnlineHandler);
			this.networkOnlineHandler = null;
			this._logVerbose("network online event listener removed");
		}
	}
	assembleTransition(chunk) {
		if (
			chunk.partNumber < 0 ||
			chunk.partNumber >= chunk.totalParts ||
			chunk.totalParts === 0 ||
			(this.transitionChunkBuffer &&
				(this.transitionChunkBuffer.totalParts !== chunk.totalParts ||
					this.transitionChunkBuffer.transitionId !== chunk.transitionId))
		) {
			this.transitionChunkBuffer = null;
			throw new Error("Invalid TransitionChunk");
		}
		if (this.transitionChunkBuffer === null)
			this.transitionChunkBuffer = {
				chunks: [],
				totalParts: chunk.totalParts,
				transitionId: chunk.transitionId,
			};
		if (chunk.partNumber !== this.transitionChunkBuffer.chunks.length) {
			const expectedLength = this.transitionChunkBuffer.chunks.length;
			this.transitionChunkBuffer = null;
			throw new Error(
				`TransitionChunk received out of order: expected part ${expectedLength}, got ${chunk.partNumber}`,
			);
		}
		this.transitionChunkBuffer.chunks.push(chunk.chunk);
		if (this.transitionChunkBuffer.chunks.length === chunk.totalParts) {
			const fullJson = this.transitionChunkBuffer.chunks.join("");
			this.transitionChunkBuffer = null;
			const transition = parseServerMessage(JSON.parse(fullJson));
			if (transition.type !== "Transition")
				throw new Error(`Expected Transition, got ${transition.type} after assembling chunks`);
			return transition;
		}
		return null;
	}
	connect() {
		if (this.socket.state === "terminated") return;
		if (this.socket.state !== "disconnected" && this.socket.state !== "stopped")
			throw new Error("Didn't start connection from disconnected state: " + this.socket.state);
		const ws = new this.webSocketConstructor(this.uri);
		this._logVerbose("constructed WebSocket");
		this.setSocketState({
			state: "connecting",
			ws,
			paused: "no",
		});
		this.resetServerInactivityTimeout();
		ws.onopen = () => {
			this.logger.logVerbose("begin ws.onopen");
			if (this.socket.state !== "connecting") throw new Error("onopen called with socket not in connecting state");
			this.setSocketState({
				state: "ready",
				ws,
				paused: this.socket.paused === "yes" ? "uninitialized" : "no",
			});
			this.resetServerInactivityTimeout();
			if (this.socket.paused === "no") {
				this._hasEverConnected = true;
				this.onOpen({
					connectionCount: this.connectionCount,
					lastCloseReason: this.lastCloseReason,
					clientTs: monotonicMillis(),
				});
			}
			if (this.lastCloseReason !== "InitialConnect")
				if (this.lastCloseReason)
					this.logger.log("WebSocket reconnected at", prettyNow(), "after disconnect due to", this.lastCloseReason);
				else this.logger.log("WebSocket reconnected at", prettyNow());
			this.connectionCount += 1;
			this.lastCloseReason = null;
			if (this.pendingNetworkRecoveryInfo !== null) {
				const { timeSavedMs } = this.pendingNetworkRecoveryInfo;
				this.pendingNetworkRecoveryInfo = null;
				this.sendMessage({
					type: "Event",
					eventType: "NetworkRecoveryReconnect",
					event: { timeSavedMs },
				});
				this.logger.log(`Network recovery reconnect saved ~${Math.round(timeSavedMs / 1e3)}s of waiting`);
			}
		};
		ws.onerror = (error) => {
			this.transitionChunkBuffer = null;
			const message = error.message;
			if (message) this.logger.log(`WebSocket error message: ${message}`);
		};
		ws.onmessage = (message) => {
			this.resetServerInactivityTimeout();
			const messageLength = message.data.length;
			let serverMessage = parseServerMessage(JSON.parse(message.data));
			this._logVerbose(`received ws message with type ${serverMessage.type}`);
			if (serverMessage.type === "Ping") return;
			if (serverMessage.type === "TransitionChunk") {
				const transition = this.assembleTransition(serverMessage);
				if (!transition) return;
				serverMessage = transition;
				this._logVerbose(`assembled full ws message of type ${serverMessage.type}`);
			}
			if (this.transitionChunkBuffer !== null) {
				this.transitionChunkBuffer = null;
				this.logger.log(`Received unexpected ${serverMessage.type} while buffering TransitionChunks`);
			}
			if (serverMessage.type === "Transition")
				this.reportLargeTransition({
					messageLength,
					transition: serverMessage,
				});
			if (this.onMessage(serverMessage).hasSyncedPastLastReconnect) {
				this.retries = 0;
				this.markConnectionStateDirty();
			}
		};
		ws.onclose = (event) => {
			this._logVerbose("begin ws.onclose");
			this.transitionChunkBuffer = null;
			if (this.lastCloseReason === null) this.lastCloseReason = event.reason || `closed with code ${event.code}`;
			if (
				event.code !== CLOSE_NORMAL &&
				event.code !== CLOSE_GOING_AWAY &&
				event.code !== CLOSE_NO_STATUS &&
				event.code !== CLOSE_NOT_FOUND
			) {
				let msg = `WebSocket closed with code ${event.code}`;
				if (event.reason) msg += `: ${event.reason}`;
				this.logger.log(msg);
				if (this.onServerDisconnectError && event.reason) this.onServerDisconnectError(msg);
			}
			const reason = classifyDisconnectError(event.reason);
			this.scheduleReconnect(reason);
		};
	}
	/**
	 * @returns The state of the {@link Socket}.
	 */
	socketState() {
		return this.socket.state;
	}
	/**
	 * @param message - A ClientMessage to send.
	 * @returns Whether the message (might have been) sent.
	 */
	sendMessage(message) {
		const messageForLog = {
			type: message.type,
			...(message.type === "Authenticate" && message.tokenType === "User"
				? { value: `...${message.value.slice(-7)}` }
				: {}),
		};
		if (this.socket.state === "ready" && this.socket.paused === "no") {
			const encodedMessage = encodeClientMessage(message);
			const request = JSON.stringify(encodedMessage);
			let sent = false;
			try {
				this.socket.ws.send(request);
				sent = true;
			} catch (error) {
				this.logger.log(`Failed to send message on WebSocket, reconnecting: ${error}`);
				this.closeAndReconnect("FailedToSendMessage");
			}
			this._logVerbose(
				`${sent ? "sent" : "failed to send"} message with type ${message.type}: ${JSON.stringify(messageForLog)}`,
			);
			return true;
		}
		this._logVerbose(
			`message not sent (socket state: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}): ${JSON.stringify(messageForLog)}`,
		);
		return false;
	}
	resetServerInactivityTimeout() {
		if (this.socket.state === "terminated") return;
		if (this.reconnectDueToServerInactivityTimeout !== null) {
			clearTimeout(this.reconnectDueToServerInactivityTimeout);
			this.reconnectDueToServerInactivityTimeout = null;
		}
		this.reconnectDueToServerInactivityTimeout = setTimeout(() => {
			this.closeAndReconnect("InactiveServer");
		}, this.serverInactivityThreshold);
	}
	scheduleReconnect(reason) {
		if (this.scheduledReconnect) {
			clearTimeout(this.scheduledReconnect.timeout);
			this.scheduledReconnect = null;
		}
		this.socket = { state: "disconnected" };
		const backoff = this.nextBackoff(reason);
		this.markConnectionStateDirty();
		this.logger.log(`Attempting reconnect in ${Math.round(backoff)}ms`);
		const scheduledAt = monotonicMillis();
		const timeoutId = setTimeout(() => {
			if (this.scheduledReconnect?.timeout === timeoutId) {
				this.scheduledReconnect = null;
				this.connect();
			}
		}, backoff);
		this.scheduledReconnect = {
			timeout: timeoutId,
			scheduledAt,
			backoffMs: backoff,
		};
	}
	/**
	 * Close the WebSocket and schedule a reconnect.
	 *
	 * This should be used when we hit an error and would like to restart the session.
	 */
	closeAndReconnect(closeReason) {
		this._logVerbose(`begin closeAndReconnect with reason ${closeReason}`);
		switch (this.socket.state) {
			case "disconnected":
			case "terminated":
			case "stopped":
				return;
			case "connecting":
			case "ready":
				this.lastCloseReason = closeReason;
				this.close();
				this.scheduleReconnect("client");
				return;
			default:
				this.socket;
		}
	}
	/**
	 * Close the WebSocket, being careful to clear the onclose handler to avoid re-entrant
	 * calls. Use this instead of directly calling `ws.close()`
	 *
	 * It is the callers responsibility to update the state after this method is called so that the
	 * closed socket is not accessible or used again after this method is called
	 */
	close() {
		this.transitionChunkBuffer = null;
		switch (this.socket.state) {
			case "disconnected":
			case "terminated":
			case "stopped":
				return Promise.resolve();
			case "connecting": {
				const ws = this.socket.ws;
				ws.onmessage = (_message) => {
					this._logVerbose("Ignoring message received after close");
				};
				return new Promise((r) => {
					ws.onclose = () => {
						this._logVerbose("Closed after connecting");
						r();
					};
					ws.onopen = () => {
						this._logVerbose("Opened after connecting");
						ws.close();
					};
				});
			}
			case "ready": {
				this._logVerbose("ws.close called");
				const ws = this.socket.ws;
				ws.onmessage = (_message) => {
					this._logVerbose("Ignoring message received after close");
				};
				const result = new Promise((r) => {
					ws.onclose = () => {
						r();
					};
				});
				ws.close();
				return result;
			}
			default:
				this.socket;
				return Promise.resolve();
		}
	}
	/**
	 * Close the WebSocket and do not reconnect.
	 * @returns A Promise that resolves when the WebSocket `onClose` callback is called.
	 */
	terminate() {
		if (this.reconnectDueToServerInactivityTimeout) clearTimeout(this.reconnectDueToServerInactivityTimeout);
		if (this.scheduledReconnect) {
			clearTimeout(this.scheduledReconnect.timeout);
			this.scheduledReconnect = null;
		}
		this.cleanupNetworkListener();
		switch (this.socket.state) {
			case "terminated":
			case "stopped":
			case "disconnected":
			case "connecting":
			case "ready": {
				const result = this.close();
				this.setSocketState({ state: "terminated" });
				return result;
			}
			default:
				this.socket;
				throw new Error(`Invalid websocket state: ${this.socket.state}`);
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
				const result = this.close();
				this.socket = { state: "stopped" };
				return result;
			}
			default:
				this.socket;
				return Promise.resolve();
		}
	}
	/**
	 * Create a new WebSocket after a previous `stop()`, unless `terminate()` was
	 * called before.
	 */
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
		this.setupNetworkListener();
		this.connect();
	}
	pause() {
		switch (this.socket.state) {
			case "disconnected":
			case "stopped":
			case "terminated":
				return;
			case "connecting":
			case "ready":
				this.socket = {
					...this.socket,
					paused: "yes",
				};
				return;
			default:
				this.socket;
				return;
		}
	}
	/**
	 * Try to reconnect immediately, canceling any scheduled reconnect.
	 * This is useful when detecting network recovery.
	 * Only takes action if we're in disconnected state (waiting to reconnect).
	 */
	tryReconnectImmediately() {
		this._logVerbose("tryReconnectImmediately called");
		if (this.socket.state !== "disconnected") {
			this._logVerbose(`tryReconnectImmediately called but socket state is ${this.socket.state}, no action taken`);
			return;
		}
		let timeSavedMs = null;
		if (this.scheduledReconnect) {
			const elapsed = monotonicMillis() - this.scheduledReconnect.scheduledAt;
			timeSavedMs = Math.max(0, this.scheduledReconnect.backoffMs - elapsed);
			this._logVerbose(
				`would have waited ${Math.round(timeSavedMs)}ms more (backoff was ${Math.round(this.scheduledReconnect.backoffMs)}ms, elapsed ${Math.round(elapsed)}ms)`,
			);
			clearTimeout(this.scheduledReconnect.timeout);
			this.scheduledReconnect = null;
			this._logVerbose("canceled scheduled reconnect");
		}
		this.logger.log("Network recovery detected, reconnecting immediately");
		this.pendingNetworkRecoveryInfo = timeSavedMs !== null ? { timeSavedMs } : null;
		this.connect();
	}
	/**
	 * Resume the state machine if previously paused.
	 */
	resume() {
		switch (this.socket.state) {
			case "connecting":
				this.socket = {
					...this.socket,
					paused: "no",
				};
				return;
			case "ready":
				if (this.socket.paused === "uninitialized") {
					this.socket = {
						...this.socket,
						paused: "no",
					};
					this._hasEverConnected = true;
					this.onOpen({
						connectionCount: this.connectionCount,
						lastCloseReason: this.lastCloseReason,
						clientTs: monotonicMillis(),
					});
				} else if (this.socket.paused === "yes") {
					this.socket = {
						...this.socket,
						paused: "no",
					};
					this.onResume();
				}
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
	_logVerbose(message) {
		this.logger.logVerbose(message);
	}
	nextBackoff(reason) {
		const baseBackoff =
			(reason === "client"
				? 100
				: reason === "Unknown"
					? this.defaultInitialBackoff
					: serverDisconnectErrors[reason].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const actualBackoff = Math.min(baseBackoff, this.maxBackoff);
		return actualBackoff + actualBackoff * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition, messageLength }) {
		if (transition.clientClockSkew === void 0 || transition.serverTs === void 0) return;
		const transitionTransitTime = monotonicMillis() - transition.clientClockSkew - transition.serverTs / 1e6;
		const prettyTransitionTime = `${Math.round(transitionTransitTime)}ms`;
		const prettyMessageMB = `${Math.round(messageLength / 1e4) / 100}MB`;
		const bytesPerSecond = messageLength / (transitionTransitTime / 1e3);
		const prettyBytesPerSecond = `${Math.round(bytesPerSecond / 1e4) / 100}MB per second`;
		this._logVerbose(`received ${prettyMessageMB} transition in ${prettyTransitionTime} at ${prettyBytesPerSecond}`);
		if (messageLength > 2e7)
			this.logger.log(
				`received query results totaling more that 20MB (${prettyMessageMB}) which will take a long time to download on slower connections`,
			);
		else if (transitionTransitTime > 2e4)
			this.logger.log(
				`received query results totaling ${prettyMessageMB} which took more than 20s to arrive (${prettyTransitionTime})`,
			);
		if (this.debug)
			this.sendMessage({
				type: "Event",
				eventType: "ClientReceivedTransition",
				event: {
					transitionTransitTime,
					messageLength,
				},
			});
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/session.js
function newSessionId() {
	return uuidv4();
}
function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		return (c === "x" ? r : (r & 3) | 8).toString(16);
	});
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/vendor/jwt-decode/index.js
var InvalidTokenError = class extends Error {};
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
	return decodeURIComponent(
		atob(str).replace(/(.)/g, (_m, p) => {
			let code = p.charCodeAt(0).toString(16).toUpperCase();
			if (code.length < 2) code = "0" + code;
			return "%" + code;
		}),
	);
}
function base64UrlDecode(str) {
	let output = str.replace(/-/g, "+").replace(/_/g, "/");
	switch (output.length % 4) {
		case 0:
			break;
		case 2:
			output += "==";
			break;
		case 3:
			output += "=";
			break;
		default:
			throw new Error("base64 string is not of the correct length");
	}
	try {
		return b64DecodeUnicode(output);
	} catch {
		return atob(output);
	}
}
function jwtDecode(token, options) {
	if (typeof token !== "string") throw new InvalidTokenError("Invalid token specified: must be a string");
	options || (options = {});
	const pos = options.header === true ? 0 : 1;
	const part = token.split(".")[pos];
	if (typeof part !== "string") throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
	let decoded;
	try {
		decoded = base64UrlDecode(part);
	} catch (e) {
		throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
	}
	try {
		return JSON.parse(decoded);
	} catch (e) {
		throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
	}
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/authentication_manager.js
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) =>
	key in obj
		? __defProp$3(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
var MAXIMUM_REFRESH_DELAY = 480 * 60 * 60 * 1e3;
var MAX_TOKEN_CONFIRMATION_ATTEMPTS = 2;
var AuthenticationManager = class {
	constructor(syncState, callbacks, config) {
		__publicField$3(this, "authState", { state: "noAuth" });
		__publicField$3(this, "configVersion", 0);
		__publicField$3(this, "syncState");
		__publicField$3(this, "authenticate");
		__publicField$3(this, "stopSocket");
		__publicField$3(this, "tryRestartSocket");
		__publicField$3(this, "pauseSocket");
		__publicField$3(this, "resumeSocket");
		__publicField$3(this, "clearAuth");
		__publicField$3(this, "logger");
		__publicField$3(this, "refreshTokenLeewaySeconds");
		__publicField$3(this, "initialAuthTokenReuse");
		__publicField$3(this, "lastRefreshChange");
		__publicField$3(this, "tokenConfirmationAttempts", 0);
		this.syncState = syncState;
		this.authenticate = callbacks.authenticate;
		this.stopSocket = callbacks.stopSocket;
		this.tryRestartSocket = callbacks.tryRestartSocket;
		this.pauseSocket = callbacks.pauseSocket;
		this.resumeSocket = callbacks.resumeSocket;
		this.clearAuth = callbacks.clearAuth;
		this.logger = config.logger;
		this.refreshTokenLeewaySeconds = config.refreshTokenLeewaySeconds;
		this.initialAuthTokenReuse = config.initialAuthTokenReuse;
		this.lastRefreshChange = false;
	}
	notifyRefreshChange(isRefreshing) {
		if (
			this.authState.state !== "noAuth" &&
			this.authState.state !== "initialRefetch" &&
			this.authState.config.onRefreshChange &&
			this.lastRefreshChange !== isRefreshing
		) {
			this.lastRefreshChange = isRefreshing;
			this.authState.config.onRefreshChange(isRefreshing);
		}
	}
	async setConfig(fetchToken, onChange, onRefreshChange) {
		this.resetAuthState();
		this._logVerbose("pausing WS for auth token fetch");
		this.pauseSocket();
		const token = await this.fetchTokenAndGuardAgainstRace(fetchToken, { forceRefreshToken: false });
		if (token.isFromOutdatedConfig) return;
		const config = {
			fetchToken,
			onAuthChange: onChange,
			onRefreshChange,
		};
		if (token.value) {
			this.setAuthState({
				state: "waitingForServerConfirmationOfCachedToken",
				config,
				hasRetried: false,
			});
			this.authenticate(token.value);
		} else {
			this.setAuthState({
				state: "initialRefetch",
				config,
			});
			await this.refetchToken();
		}
		this._logVerbose("resuming WS after auth token fetch");
		this.resumeSocket();
	}
	onTransition(serverMessage) {
		if (!this.syncState.isCurrentOrNewerAuthVersion(serverMessage.endVersion.identity)) return;
		if (serverMessage.endVersion.identity <= serverMessage.startVersion.identity) return;
		this._logVerbose(`auth state is ${this.authState.state} when handling transition`);
		this.syncState.markAuthCompletion();
		if (this.authState.state === "waitingForServerConfirmationOfCachedToken") {
			this._logVerbose("server confirmed auth token is valid");
			const cachedToken = this.syncState.getAuth()?.value;
			if (this.initialAuthTokenReuse && cachedToken)
				this.scheduleTokenRefetch(cachedToken, serverMessage.clientClockSkew);
			else this.refetchToken();
			this.authState.config.onAuthChange(true);
			return;
		}
		if (this.authState.state === "waitingForServerConfirmationOfFreshToken") {
			this._logVerbose("server confirmed new auth token is valid");
			this.notifyRefreshChange(false);
			this.scheduleTokenRefetch(this.authState.token);
			this.tokenConfirmationAttempts = 0;
			if (!this.authState.hadAuth) this.authState.config.onAuthChange(true);
		}
	}
	onAuthError(serverMessage) {
		if (
			serverMessage.authUpdateAttempted === false &&
			(this.authState.state === "waitingForServerConfirmationOfFreshToken" ||
				this.authState.state === "waitingForServerConfirmationOfCachedToken")
		) {
			this._logVerbose("ignoring non-auth token expired error");
			return;
		}
		const { baseVersion } = serverMessage;
		if (!this.syncState.isCurrentOrNewerAuthVersion(baseVersion + 1)) {
			this._logVerbose("ignoring auth error for previous auth attempt");
			return;
		}
		this.tryToReauthenticate(serverMessage);
	}
	async tryToReauthenticate(serverMessage) {
		this._logVerbose(`attempting to reauthenticate: ${serverMessage.error}`);
		if (
			this.authState.state === "noAuth" ||
			(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
				this.tokenConfirmationAttempts >= MAX_TOKEN_CONFIRMATION_ATTEMPTS)
		) {
			this.logger.error(`Failed to authenticate: "${serverMessage.error}", check your server auth config`);
			if (this.syncState.hasAuth()) this.syncState.clearAuth();
			if (this.authState.state !== "noAuth") this.setAndReportAuthFailed(this.authState.config.onAuthChange);
			return;
		}
		if (this.authState.state === "waitingForServerConfirmationOfFreshToken") {
			this.tokenConfirmationAttempts++;
			this._logVerbose(
				`retrying reauthentication, ${MAX_TOKEN_CONFIRMATION_ATTEMPTS - this.tokenConfirmationAttempts} attempts remaining`,
			);
		}
		this.notifyRefreshChange(true);
		await this.stopSocket();
		if (this.authState.state === "noAuth") return;
		const token = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, {
			forceRefreshToken: true,
		});
		if (token.isFromOutdatedConfig) return;
		if (token.value && this.syncState.isNewAuth(token.value)) {
			this.authenticate(token.value);
			this.setAuthState({
				state: "waitingForServerConfirmationOfFreshToken",
				config: this.authState.config,
				token: token.value,
				hadAuth: this.authState.state === "notRefetching" || this.authState.state === "waitingForScheduledRefetch",
			});
		} else {
			this._logVerbose("reauthentication failed, could not fetch a new token");
			if (this.syncState.hasAuth()) this.syncState.clearAuth();
			this.setAndReportAuthFailed(this.authState.config.onAuthChange);
		}
		this.tryRestartSocket();
	}
	async refetchToken() {
		if (this.authState.state === "noAuth") return;
		this._logVerbose("refetching auth token");
		const token = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, {
			forceRefreshToken: true,
		});
		if (token.isFromOutdatedConfig) return;
		if (token.value)
			if (this.syncState.isNewAuth(token.value)) {
				this.setAuthState({
					state: "waitingForServerConfirmationOfFreshToken",
					hadAuth: this.syncState.hasAuth(),
					token: token.value,
					config: this.authState.config,
				});
				this.authenticate(token.value);
			} else
				this.setAuthState({
					state: "notRefetching",
					config: this.authState.config,
				});
		else {
			this._logVerbose("refetching token failed");
			if (this.syncState.hasAuth()) this.clearAuth();
			this.setAndReportAuthFailed(this.authState.config.onAuthChange);
		}
		this._logVerbose("restarting WS after auth token fetch (if currently stopped)");
		this.tryRestartSocket();
	}
	scheduleTokenRefetch(token, clientClockSkewMs) {
		if (this.authState.state === "noAuth") return;
		const decodedToken = this.decodeToken(token);
		if (!decodedToken) {
			this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
			return;
		}
		const { iat, exp } = decodedToken;
		if (!iat || !exp) {
			this.logger.error("Auth token does not have required fields, cannot refetch the token");
			return;
		}
		const fullLifetimeSeconds = exp - iat;
		if (fullLifetimeSeconds <= 2) {
			this.logger.error("Auth token does not live long enough, cannot refetch the token");
			return;
		}
		let tokenValiditySeconds;
		if (clientClockSkewMs !== void 0) {
			tokenValiditySeconds = exp - (Date.now() - clientClockSkewMs) / 1e3;
			if (tokenValiditySeconds <= 0) tokenValiditySeconds = 0;
		} else tokenValiditySeconds = fullLifetimeSeconds;
		let delay = Math.min(MAXIMUM_REFRESH_DELAY, (tokenValiditySeconds - this.refreshTokenLeewaySeconds) * 1e3);
		if (delay <= 0) {
			this.logger.warn(
				`Refetching auth token immediately, configured leeway ${this.refreshTokenLeewaySeconds}s is larger than the token's lifetime ${tokenValiditySeconds}s`,
			);
			delay = 0;
		}
		const refetchTokenTimeoutId = setTimeout(() => {
			this._logVerbose("running scheduled token refetch");
			this.refetchToken();
		}, delay);
		this.setAuthState({
			state: "waitingForScheduledRefetch",
			refetchTokenTimeoutId,
			config: this.authState.config,
		});
		this._logVerbose(`scheduled preemptive auth token refetching in ${delay}ms`);
	}
	async fetchTokenAndGuardAgainstRace(fetchToken, fetchArgs) {
		const originalConfigVersion = ++this.configVersion;
		this._logVerbose(`fetching token with config version ${originalConfigVersion}`);
		const token = await fetchToken(fetchArgs);
		if (this.configVersion !== originalConfigVersion) {
			this._logVerbose(`stale config version, expected ${originalConfigVersion}, got ${this.configVersion}`);
			return { isFromOutdatedConfig: true };
		}
		return {
			isFromOutdatedConfig: false,
			value: token,
		};
	}
	stop() {
		this.resetAuthState();
		this.configVersion++;
		this._logVerbose(`config version bumped to ${this.configVersion}`);
	}
	setAndReportAuthFailed(onAuthChange) {
		onAuthChange(false);
		this.resetAuthState();
	}
	resetAuthState() {
		this.notifyRefreshChange(false);
		this.setAuthState({ state: "noAuth" });
	}
	setAuthState(newAuth) {
		const authStateForLog =
			newAuth.state === "waitingForServerConfirmationOfFreshToken"
				? {
						hadAuth: newAuth.hadAuth,
						state: newAuth.state,
						token: `...${newAuth.token.slice(-7)}`,
					}
				: { state: newAuth.state };
		this._logVerbose(`setting auth state to ${JSON.stringify(authStateForLog)}`);
		switch (newAuth.state) {
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
		if (this.authState.state === "waitingForScheduledRefetch") clearTimeout(this.authState.refetchTokenTimeoutId);
		this.authState = newAuth;
	}
	decodeToken(token) {
		try {
			return jwtDecode(token);
		} catch (e) {
			this._logVerbose(`Error decoding token: ${e instanceof Error ? e.message : "Unknown error"}`);
			return null;
		}
	}
	_logVerbose(message) {
		this.logger.logVerbose(`${message} [v${this.configVersion}]`);
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/metrics.js
var markNames = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function mark(name, sessionId) {
	const detail = { sessionId };
	if (typeof performance === "undefined" || !performance.mark) return;
	performance.mark(name, { detail });
}
function performanceMarkToJson(mark2) {
	let name = mark2.name.slice(6);
	name = name.charAt(0).toLowerCase() + name.slice(1);
	return {
		name,
		startTime: mark2.startTime,
	};
}
function getMarksReport(sessionId) {
	if (typeof performance === "undefined" || !performance.getEntriesByName) return [];
	const allMarks = [];
	for (const name of markNames) {
		const marks = performance
			.getEntriesByName(name)
			.filter((entry) => entry.entryType === "mark")
			.filter((mark2) => mark2.detail.sessionId === sessionId);
		allMarks.push(...marks);
	}
	return allMarks.map(performanceMarkToJson);
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/client.js
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) =>
	key in obj
		? __defProp$2(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
var BaseConvexClient = class {
	/**
	 * @param address - The url of your Convex deployment, often provided
	 * by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
	 * @param onTransition - A callback receiving an array of query tokens
	 * corresponding to query results that have changed -- additional handlers
	 * can be added via `addOnTransitionHandler`.
	 * @param options - See {@link BaseConvexClientOptions} for a full description.
	 */
	constructor(address, onTransition, options) {
		__publicField$2(this, "address");
		__publicField$2(this, "state");
		__publicField$2(this, "requestManager");
		__publicField$2(this, "webSocketManager");
		__publicField$2(this, "authenticationManager");
		__publicField$2(this, "remoteQuerySet");
		__publicField$2(this, "optimisticQueryResults");
		__publicField$2(this, "_transitionHandlerCounter", 0);
		__publicField$2(this, "_nextRequestId");
		__publicField$2(this, "_onTransitionFns", /* @__PURE__ */ new Map());
		__publicField$2(this, "_sessionId");
		__publicField$2(this, "firstMessageReceived", false);
		__publicField$2(this, "debug");
		__publicField$2(this, "logger");
		__publicField$2(this, "maxObservedTimestamp");
		__publicField$2(this, "connectionStateSubscribers", /* @__PURE__ */ new Map());
		__publicField$2(this, "nextConnectionStateSubscriberId", 0);
		__publicField$2(this, "_lastPublishedConnectionState");
		/**
		 * Call this whenever the connection state may have changed in a way that could
		 * require publishing it. Schedules a possibly update.
		 */
		__publicField$2(this, "markConnectionStateDirty", () => {
			Promise.resolve().then(() => {
				const curConnectionState = this.connectionState();
				if (JSON.stringify(curConnectionState) !== JSON.stringify(this._lastPublishedConnectionState)) {
					this._lastPublishedConnectionState = curConnectionState;
					for (const cb of this.connectionStateSubscribers.values()) cb(curConnectionState);
				}
			});
		});
		__publicField$2(this, "mark", (name) => {
			if (this.debug) mark(name, this.sessionId);
		});
		if (typeof address === "object")
			throw new Error(
				"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
			);
		if (options?.skipConvexDeploymentUrlCheck !== true) validateDeploymentUrl(address);
		options = { ...options };
		const authRefreshTokenLeewaySeconds = options.authRefreshTokenLeewaySeconds ?? 10;
		let webSocketConstructor = options.webSocketConstructor;
		if (!webSocketConstructor && typeof WebSocket === "undefined")
			throw new Error(
				"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
			);
		webSocketConstructor = webSocketConstructor || WebSocket;
		this.debug = options.reportDebugInfoToConvex ?? false;
		this.address = address;
		this.logger =
			options.logger === false
				? instantiateNoopLogger({ verbose: options.verbose ?? false })
				: options.logger !== true && options.logger
					? options.logger
					: instantiateDefaultLogger({ verbose: options.verbose ?? false });
		const i = address.search("://");
		if (i === -1) throw new Error("Provided address was not an absolute URL.");
		const origin = address.substring(i + 3);
		const protocol = address.substring(0, i);
		let wsProtocol;
		if (protocol === "http") wsProtocol = "ws";
		else if (protocol === "https") wsProtocol = "wss";
		else throw new Error(`Unknown parent protocol ${protocol}`);
		const wsUri = `${wsProtocol}://${origin}/api/${version$1}/sync`;
		this.state = new LocalSyncState();
		this.remoteQuerySet = new RemoteQuerySet((queryId) => this.state.queryPath(queryId), this.logger);
		this.requestManager = new RequestManager(this.logger, this.markConnectionStateDirty);
		const pauseSocket = () => {
			this.webSocketManager.pause();
			this.state.pause();
		};
		this.authenticationManager = new AuthenticationManager(
			this.state,
			{
				authenticate: (token) => {
					const message = this.state.setAuth(token);
					this.webSocketManager.sendMessage(message);
					return message.baseVersion;
				},
				stopSocket: () => this.webSocketManager.stop(),
				tryRestartSocket: () => this.webSocketManager.tryRestart(),
				pauseSocket,
				resumeSocket: () => this.webSocketManager.resume(),
				clearAuth: () => {
					this.clearAuth();
				},
			},
			{
				logger: this.logger,
				refreshTokenLeewaySeconds: authRefreshTokenLeewaySeconds,
				initialAuthTokenReuse: options.initialAuthTokenReuse ?? false,
			},
		);
		this.optimisticQueryResults = new OptimisticQueryResults();
		this.addOnTransitionHandler((transition) => {
			onTransition(transition.queries.map((q) => q.token));
		});
		this._nextRequestId = 0;
		this._sessionId = newSessionId();
		const { unsavedChangesWarning } = options;
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") {
			if (unsavedChangesWarning === true)
				throw new Error(
					"unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.",
				);
		} else if (unsavedChangesWarning !== false)
			window.addEventListener("beforeunload", (e) => {
				if (this.requestManager.hasIncompleteRequests()) {
					e.preventDefault();
					const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
					(e || window.event).returnValue = confirmationMessage;
					return confirmationMessage;
				}
			});
		this.webSocketManager = new WebSocketManager(
			wsUri,
			{
				onOpen: (reconnectMetadata) => {
					this.mark("convexWebSocketOpen");
					this.webSocketManager.sendMessage({
						...reconnectMetadata,
						type: "Connect",
						sessionId: this._sessionId,
						maxObservedTimestamp: this.maxObservedTimestamp,
					});
					this.remoteQuerySet = new RemoteQuerySet((queryId) => this.state.queryPath(queryId), this.logger);
					const [querySetModification, authModification] = this.state.restart();
					if (authModification) this.webSocketManager.sendMessage(authModification);
					this.webSocketManager.sendMessage(querySetModification);
					for (const message of this.requestManager.restart()) this.webSocketManager.sendMessage(message);
				},
				onResume: () => {
					const [querySetModification, authModification] = this.state.resume();
					if (authModification) this.webSocketManager.sendMessage(authModification);
					if (querySetModification) this.webSocketManager.sendMessage(querySetModification);
					for (const message of this.requestManager.resume()) this.webSocketManager.sendMessage(message);
				},
				onMessage: (serverMessage) => {
					if (!this.firstMessageReceived) {
						this.firstMessageReceived = true;
						this.mark("convexFirstMessageReceived");
						this.reportMarks();
					}
					switch (serverMessage.type) {
						case "Transition": {
							this.observedTimestamp(serverMessage.endVersion.ts);
							this.authenticationManager.onTransition(serverMessage);
							this.remoteQuerySet.transition(serverMessage);
							this.state.transition(serverMessage);
							const completedRequests = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
							this.notifyOnQueryResultChanges(completedRequests);
							break;
						}
						case "MutationResponse": {
							if (serverMessage.success) this.observedTimestamp(serverMessage.ts);
							const completedMutationInfo = this.requestManager.onResponse(serverMessage);
							if (completedMutationInfo !== null)
								this.notifyOnQueryResultChanges(
									/* @__PURE__ */ new Map([[completedMutationInfo.requestId, completedMutationInfo.result]]),
								);
							break;
						}
						case "ActionResponse":
							this.requestManager.onResponse(serverMessage);
							break;
						case "AuthError":
							this.authenticationManager.onAuthError(serverMessage);
							break;
						case "FatalError": {
							const error = logFatalError(this.logger, serverMessage.error);
							this.webSocketManager.terminate();
							throw error;
						}
						default:
					}
					return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
				},
				onServerDisconnectError: options.onServerDisconnectError,
			},
			webSocketConstructor,
			this.logger,
			this.markConnectionStateDirty,
			this.debug,
		);
		this.mark("convexClientConstructed");
		if (options.expectAuth) pauseSocket();
	}
	/**
	 * Return true if there is outstanding work from prior to the time of the most recent restart.
	 * This indicates that the client has not proven itself to have gotten past the issue that
	 * potentially led to the restart. Use this to influence when to reset backoff after a failure.
	 */
	hasSyncedPastLastReconnect() {
		return this.requestManager.hasSyncedPastLastReconnect() && this.state.hasSyncedPastLastReconnect();
	}
	observedTimestamp(observedTs) {
		if (this.maxObservedTimestamp === void 0 || this.maxObservedTimestamp.lessThanOrEqual(observedTs))
			this.maxObservedTimestamp = observedTs;
	}
	getMaxObservedTimestamp() {
		return this.maxObservedTimestamp;
	}
	/**
	 * Compute the current query results based on the remoteQuerySet and the
	 * current optimistic updates and call `onTransition` for all the changed
	 * queries.
	 *
	 * @param completedMutations - A set of mutation IDs whose optimistic updates
	 * are no longer needed.
	 */
	notifyOnQueryResultChanges(completedRequests) {
		const remoteQueryResults = this.remoteQuerySet.remoteQueryResults();
		const queryTokenToValue = /* @__PURE__ */ new Map();
		for (const [queryId, result] of remoteQueryResults) {
			const queryToken = this.state.queryToken(queryId);
			if (queryToken !== null) {
				const query = {
					result,
					udfPath: this.state.queryPath(queryId),
					args: this.state.queryArgs(queryId),
				};
				queryTokenToValue.set(queryToken, query);
			}
		}
		const changedQueryTokens = this.optimisticQueryResults.ingestQueryResultsFromServer(
			queryTokenToValue,
			new Set(completedRequests.keys()),
		);
		this.handleTransition({
			queries: changedQueryTokens.map((token) => {
				return {
					token,
					modification: {
						kind: "Updated",
						result: this.optimisticQueryResults.rawQueryResult(token),
					},
				};
			}),
			reflectedMutations: Array.from(completedRequests).map(([requestId, result]) => ({
				requestId,
				result,
			})),
			timestamp: this.remoteQuerySet.timestamp(),
		});
	}
	handleTransition(transition) {
		for (const fn of this._onTransitionFns.values()) fn(transition);
	}
	/**
	 * Add a handler that will be called on a transition.
	 *
	 * Any external side effects (e.g. setting React state) should be handled here.
	 *
	 * @param fn
	 *
	 * @returns
	 */
	addOnTransitionHandler(fn) {
		const id = this._transitionHandlerCounter++;
		this._onTransitionFns.set(id, fn);
		return () => this._onTransitionFns.delete(id);
	}
	/**
	 * Get the current JWT auth token and decoded claims.
	 */
	getCurrentAuthClaims() {
		const authToken = this.state.getAuth();
		let decoded = {};
		if (authToken && authToken.tokenType === "User")
			try {
				decoded = authToken ? jwtDecode(authToken.value) : {};
			} catch {
				decoded = {};
			}
		else return;
		return {
			token: authToken.value,
			decoded,
		};
	}
	/**
	 * Set the authentication token to be used for subsequent queries and mutations.
	 * `fetchToken` will be called automatically again if a token expires.
	 * `fetchToken` should return `null` if the token cannot be retrieved, for example
	 * when the user's rights were permanently revoked.
	 * @param fetchToken - an async function returning the JWT-encoded OpenID Connect Identity Token
	 * @param onChange - a callback that will be called when the authentication status changes
	 * @param onRefreshChange - a callback called with `true` when the socket is paused to fetch a replacement token after a server rejection, and `false` when refresh completes
	 */
	setAuth(fetchToken, onChange, onRefreshChange) {
		this.authenticationManager.setConfig(fetchToken, onChange, onRefreshChange);
	}
	hasAuth() {
		return this.state.hasAuth();
	}
	/** @internal */
	setAdminAuth(value, fakeUserIdentity) {
		const message = this.state.setAdminAuth(value, fakeUserIdentity);
		this.webSocketManager.sendMessage(message);
	}
	clearAuth() {
		const message = this.state.clearAuth();
		this.webSocketManager.sendMessage(message);
	}
	/**
	* Subscribe to a query function.
	*
	* Whenever this query's result changes, the `onTransition` callback
	* passed into the constructor will be called.
	*
	* @param name - The name of the query.
	* @param args - An arguments object for the query. If this is omitted, the
	* arguments will be `{}`.
	* @param options - A {@link SubscribeOptions} options object for this query.
	
	* @returns An object containing a {@link QueryToken} corresponding to this
	* query and an `unsubscribe` callback.
	*/
	subscribe(name, args, options) {
		const argsObject = parseArgs(args);
		const { modification, queryToken, unsubscribe } = this.state.subscribe(
			name,
			argsObject,
			options?.journal,
			options?.componentPath,
		);
		if (modification !== null) this.webSocketManager.sendMessage(modification);
		return {
			queryToken,
			unsubscribe: () => {
				const modification2 = unsubscribe();
				if (modification2) this.webSocketManager.sendMessage(modification2);
			},
		};
	}
	/**
	 * A query result based only on the current, local state.
	 *
	 * The only way this will return a value is if we're already subscribed to the
	 * query or its value has been set optimistically.
	 */
	localQueryResult(udfPath, args) {
		const queryToken = serializePathAndArgs(udfPath, parseArgs(args));
		return this.optimisticQueryResults.queryResult(queryToken);
	}
	/**
	 * Get query result by query token based on current, local state
	 *
	 * The only way this will return a value is if we're already subscribed to the
	 * query or its value has been set optimistically.
	 *
	 * @internal
	 */
	localQueryResultByToken(queryToken) {
		return this.optimisticQueryResults.queryResult(queryToken);
	}
	/**
	 * Whether local query result is available for a token.
	 *
	 * This method does not throw if the result is an error.
	 *
	 * @internal
	 */
	hasLocalQueryResultByToken(queryToken) {
		return this.optimisticQueryResults.hasQueryResult(queryToken);
	}
	/**
	 * @internal
	 */
	localQueryLogs(udfPath, args) {
		const queryToken = serializePathAndArgs(udfPath, parseArgs(args));
		return this.optimisticQueryResults.queryLogs(queryToken);
	}
	/**
	 * Retrieve the current {@link QueryJournal} for this query function.
	 *
	 * If we have not yet received a result for this query, this will be `undefined`.
	 *
	 * @param name - The name of the query.
	 * @param args - The arguments object for this query.
	 * @returns The query's {@link QueryJournal} or `undefined`.
	 */
	queryJournal(name, args) {
		const queryToken = serializePathAndArgs(name, parseArgs(args));
		return this.state.queryJournal(queryToken);
	}
	/**
	 * Get the current {@link ConnectionState} between the client and the Convex
	 * backend.
	 *
	 * @returns The {@link ConnectionState} with the Convex backend.
	 */
	connectionState() {
		const wsConnectionState = this.webSocketManager.connectionState();
		return {
			hasInflightRequests: this.requestManager.hasInflightRequests(),
			isWebSocketConnected: wsConnectionState.isConnected,
			hasEverConnected: wsConnectionState.hasEverConnected,
			connectionCount: wsConnectionState.connectionCount,
			connectionRetries: wsConnectionState.connectionRetries,
			timeOfOldestInflightRequest: this.requestManager.timeOfOldestInflightRequest(),
			inflightMutations: this.requestManager.inflightMutations(),
			inflightActions: this.requestManager.inflightActions(),
		};
	}
	/**
	 * Subscribe to the {@link ConnectionState} between the client and the Convex
	 * backend, calling a callback each time it changes.
	 *
	 * Subscribed callbacks will be called when any part of ConnectionState changes.
	 * ConnectionState may grow in future versions (e.g. to provide a array of
	 * inflight requests) in which case callbacks would be called more frequently.
	 *
	 * @returns An unsubscribe function to stop listening.
	 */
	subscribeToConnectionState(cb) {
		const id = this.nextConnectionStateSubscriberId++;
		this.connectionStateSubscribers.set(id, cb);
		return () => {
			this.connectionStateSubscribers.delete(id);
		};
	}
	/**
	* Execute a mutation function.
	*
	* @param name - The name of the mutation.
	* @param args - An arguments object for the mutation. If this is omitted,
	* the arguments will be `{}`.
	* @param options - A {@link MutationOptions} options object for this mutation.
	
	* @returns - A promise of the mutation's result.
	*/
	async mutation(name, args, options) {
		const result = await this.mutationInternal(name, args, options);
		if (!result.success) {
			if (result.errorData !== void 0)
				throw forwardData(result, new ConvexError(createHybridErrorStacktrace("mutation", name, result)));
			throw new Error(createHybridErrorStacktrace("mutation", name, result));
		}
		return result.value;
	}
	/**
	 * @internal
	 */
	async mutationInternal(udfPath, args, options, componentPath) {
		const { mutationPromise } = this.enqueueMutation(udfPath, args, options, componentPath);
		return mutationPromise;
	}
	/**
	 * @internal
	 */
	enqueueMutation(udfPath, args, options, componentPath) {
		const mutationArgs = parseArgs(args);
		this.tryReportLongDisconnect();
		const requestId = this.nextRequestId;
		this._nextRequestId++;
		if (options !== void 0) {
			const optimisticUpdate = options.optimisticUpdate;
			if (optimisticUpdate !== void 0) {
				const wrappedUpdate = (localQueryStore) => {
					if (optimisticUpdate(localQueryStore, mutationArgs) instanceof Promise)
						this.logger.warn("Optimistic update handler returned a Promise. Optimistic updates should be synchronous.");
				};
				const changedQueries = this.optimisticQueryResults
					.applyOptimisticUpdate(wrappedUpdate, requestId)
					.map((token) => {
						const localResult = this.localQueryResultByToken(token);
						return {
							token,
							modification: {
								kind: "Updated",
								result:
									localResult === void 0
										? void 0
										: {
												success: true,
												value: localResult,
												logLines: [],
											},
							},
						};
					});
				this.handleTransition({
					queries: changedQueries,
					reflectedMutations: [],
					timestamp: this.remoteQuerySet.timestamp(),
				});
			}
		}
		const message = {
			type: "Mutation",
			requestId,
			udfPath,
			componentPath,
			args: [convexToJson(mutationArgs)],
		};
		const mightBeSent = this.webSocketManager.sendMessage(message);
		return {
			requestId,
			mutationPromise: this.requestManager.request(message, mightBeSent),
		};
	}
	/**
	 * Execute an action function.
	 *
	 * @param name - The name of the action.
	 * @param args - An arguments object for the action. If this is omitted,
	 * the arguments will be `{}`.
	 * @returns A promise of the action's result.
	 */
	async action(name, args) {
		const result = await this.actionInternal(name, args);
		if (!result.success) {
			if (result.errorData !== void 0)
				throw forwardData(result, new ConvexError(createHybridErrorStacktrace("action", name, result)));
			throw new Error(createHybridErrorStacktrace("action", name, result));
		}
		return result.value;
	}
	/**
	 * @internal
	 */
	async actionInternal(udfPath, args, componentPath) {
		const actionArgs = parseArgs(args);
		const requestId = this.nextRequestId;
		this._nextRequestId++;
		this.tryReportLongDisconnect();
		const message = {
			type: "Action",
			requestId,
			udfPath,
			componentPath,
			args: [convexToJson(actionArgs)],
		};
		const mightBeSent = this.webSocketManager.sendMessage(message);
		return this.requestManager.request(message, mightBeSent);
	}
	/**
	 * Close any network handles associated with this client and stop all subscriptions.
	 *
	 * Call this method when you're done with an {@link BaseConvexClient} to
	 * dispose of its sockets and resources.
	 *
	 * @returns A `Promise` fulfilled when the connection has been completely closed.
	 */
	async close() {
		this.authenticationManager.stop();
		return this.webSocketManager.terminate();
	}
	/**
	 * Return the address for this client, useful for creating a new client.
	 *
	 * Not guaranteed to match the address with which this client was constructed:
	 * it may be canonicalized.
	 */
	get url() {
		return this.address;
	}
	/**
	 * @internal
	 */
	get nextRequestId() {
		return this._nextRequestId;
	}
	/**
	 * @internal
	 */
	get sessionId() {
		return this._sessionId;
	}
	/**
	 * Reports performance marks to the server. This should only be called when
	 * we have a functional websocket.
	 */
	reportMarks() {
		if (this.debug) {
			const report = getMarksReport(this.sessionId);
			this.webSocketManager.sendMessage({
				type: "Event",
				eventType: "ClientConnect",
				event: report,
			});
		}
	}
	tryReportLongDisconnect() {
		if (!this.debug) return;
		const timeOfOldestRequest = this.connectionState().timeOfOldestInflightRequest;
		if (timeOfOldestRequest === null || Date.now() - timeOfOldestRequest.getTime() <= 60 * 1e3) return;
		const endpoint = `${this.address}/api/debug_event`;
		fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Convex-Client": `npm-${version$1}`,
			},
			body: JSON.stringify({ event: "LongWebsocketDisconnect" }),
		})
			.then((response) => {
				if (!response.ok) this.logger.warn("Analytics request failed with response:", response.body);
			})
			.catch((error) => {
				this.logger.warn("Analytics response failed with error:", error);
			});
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/pagination.js
function asPaginationResult(value) {
	if (
		typeof value !== "object" ||
		value === null ||
		!Array.isArray(value.page) ||
		typeof value.isDone !== "boolean" ||
		typeof value.continueCursor !== "string"
	)
		throw new Error(`Not a valid paginated query result: ${value?.toString()}`);
	return value;
}
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/sync/paginated_query_client.js
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) =>
	key in obj
		? __defProp$1(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
var PaginatedQueryClient = class {
	constructor(client, onTransition) {
		this.client = client;
		this.onTransition = onTransition;
		__publicField$1(this, "paginatedQuerySet", /* @__PURE__ */ new Map());
		__publicField$1(this, "lastTransitionTs");
		this.lastTransitionTs = Long.fromNumber(0);
		this.client.addOnTransitionHandler((transition) => this.onBaseTransition(transition));
	}
	/**
	 * Subscribe to a paginated query.
	 *
	 * @param name - The name of the paginated query function
	 * @param args - Arguments for the query (excluding paginationOpts)
	 * @param options - Pagination options including initialNumItems
	 * @returns Object with paginatedQueryToken and unsubscribe function
	 */
	subscribe(name, args, options) {
		const canonicalizedUdfPath = canonicalizeUdfPath(name);
		const token = serializePaginatedPathAndArgs(canonicalizedUdfPath, args, options);
		const unsubscribe = () => this.removePaginatedQuerySubscriber(token);
		const existingEntry = this.paginatedQuerySet.get(token);
		if (existingEntry) {
			existingEntry.numSubscribers += 1;
			return {
				paginatedQueryToken: token,
				unsubscribe,
			};
		}
		this.paginatedQuerySet.set(token, {
			token,
			canonicalizedUdfPath,
			args,
			numSubscribers: 1,
			options: { initialNumItems: options.initialNumItems },
			nextPageKey: 0,
			pageKeys: [],
			pageKeyToQuery: /* @__PURE__ */ new Map(),
			ongoingSplits: /* @__PURE__ */ new Map(),
			skip: false,
			id: options.id,
		});
		this.addPageToPaginatedQuery(token, null, options.initialNumItems);
		return {
			paginatedQueryToken: token,
			unsubscribe,
		};
	}
	/**
	 * Get current results for a paginated query based on local state.
	 *
	 * Throws an error when one of the pages has errored.
	 */
	localQueryResult(name, args, options) {
		const token = serializePaginatedPathAndArgs(canonicalizeUdfPath(name), args, options);
		return this.localQueryResultByToken(token);
	}
	/**
	 * @internal
	 */
	localQueryResultByToken(token) {
		const paginatedQuery = this.paginatedQuerySet.get(token);
		if (!paginatedQuery) return;
		const activePages = this.activePageQueryTokens(paginatedQuery);
		if (activePages.length === 0)
			return {
				results: [],
				status: "LoadingFirstPage",
				loadMore: (numItems) => {
					return this.loadMoreOfPaginatedQuery(token, numItems);
				},
			};
		let allResults = [];
		let hasUndefined = false;
		let isDone = false;
		for (const pageToken of activePages) {
			const result = this.client.localQueryResultByToken(pageToken);
			if (result === void 0) {
				hasUndefined = true;
				isDone = false;
				continue;
			}
			const paginationResult = asPaginationResult(result);
			allResults = allResults.concat(paginationResult.page);
			isDone = !!paginationResult.isDone;
		}
		let status;
		if (hasUndefined) status = allResults.length === 0 ? "LoadingFirstPage" : "LoadingMore";
		else if (isDone) status = "Exhausted";
		else status = "CanLoadMore";
		return {
			results: allResults,
			status,
			loadMore: (numItems) => {
				return this.loadMoreOfPaginatedQuery(token, numItems);
			},
		};
	}
	onBaseTransition(transition) {
		const changedBaseTokens = transition.queries.map((q) => q.token);
		const changed = this.queriesContainingTokens(changedBaseTokens);
		let paginatedQueries = [];
		if (changed.length > 0) {
			this.processPaginatedQuerySplits(changed, (token) => this.client.localQueryResultByToken(token));
			paginatedQueries = changed.map((token) => ({
				token,
				modification: {
					kind: "Updated",
					result: this.localQueryResultByToken(token),
				},
			}));
		}
		const extendedTransition = {
			...transition,
			paginatedQueries,
		};
		this.onTransition(extendedTransition);
	}
	/**
	 * Load more items for a paginated query.
	 *
	 * This *always* causes a transition, the status of the query
	 * has probably changed from "CanLoadMore" to "LoadingMore".
	 * Data might have changed too: maybe a subscription to this page
	 * query already exists (unlikely but possible) or this page query
	 * has an optimistic update providing some initial data.
	 *
	 * @internal
	 */
	loadMoreOfPaginatedQuery(token, numItems) {
		this.mustGetPaginatedQuery(token);
		const lastPageToken = this.queryTokenForLastPageOfPaginatedQuery(token);
		const lastPageResult = this.client.localQueryResultByToken(lastPageToken);
		if (!lastPageResult) return false;
		const paginationResult = asPaginationResult(lastPageResult);
		if (paginationResult.isDone) return false;
		this.addPageToPaginatedQuery(token, paginationResult.continueCursor, numItems);
		const loadMoreTransition = {
			timestamp: this.lastTransitionTs,
			reflectedMutations: [],
			queries: [],
			paginatedQueries: [
				{
					token,
					modification: {
						kind: "Updated",
						result: this.localQueryResultByToken(token),
					},
				},
			],
		};
		this.onTransition(loadMoreTransition);
		return true;
	}
	/**
	 * @internal
	 */
	queriesContainingTokens(queryTokens) {
		if (queryTokens.length === 0) return [];
		const changed = [];
		const queryTokenSet = new Set(queryTokens);
		for (const [paginatedToken, paginatedQuery] of this.paginatedQuerySet)
			for (const pageToken of this.allQueryTokens(paginatedQuery))
				if (queryTokenSet.has(pageToken)) {
					changed.push(paginatedToken);
					break;
				}
		return changed;
	}
	/**
	 * @internal
	 */
	processPaginatedQuerySplits(changed, getResult) {
		for (const paginatedQueryToken of changed) {
			const paginatedQuery = this.mustGetPaginatedQuery(paginatedQueryToken);
			const { ongoingSplits, pageKeyToQuery, pageKeys } = paginatedQuery;
			for (const [pageKey, [splitKey1, splitKey2]] of ongoingSplits)
				if (
					getResult(pageKeyToQuery.get(splitKey1).queryToken) !== void 0 &&
					getResult(pageKeyToQuery.get(splitKey2).queryToken) !== void 0
				)
					this.completePaginatedQuerySplit(paginatedQuery, pageKey, splitKey1, splitKey2);
			for (const pageKey of pageKeys) {
				if (ongoingSplits.has(pageKey)) continue;
				const pageEntry = pageKeyToQuery.get(pageKey);
				if (!pageEntry) throw new Error(`No page query for active pageKey ${pageKey}`);
				const pageResult = getResult(pageEntry.queryToken);
				if (!pageResult) continue;
				const result = asPaginationResult(pageResult);
				if (
					result.splitCursor &&
					(result.pageStatus === "SplitRecommended" ||
						result.pageStatus === "SplitRequired" ||
						result.page.length > paginatedQuery.options.initialNumItems * 2)
				)
					this.splitPaginatedQueryPage(
						paginatedQuery,
						pageKey,
						pageEntry.cursor,
						result.splitCursor,
						result.continueCursor,
					);
			}
		}
	}
	splitPaginatedQueryPage(paginatedQuery, pageKey, startCursor, splitCursor, continueCursor) {
		const splitKey1 = paginatedQuery.nextPageKey++;
		const splitKey2 = paginatedQuery.nextPageKey++;
		const paginationOpts = {
			numItems: paginatedQuery.options.initialNumItems,
			id: paginatedQuery.id,
		};
		const firstSubscription = this.client.subscribe(paginatedQuery.canonicalizedUdfPath, {
			...paginatedQuery.args,
			paginationOpts: {
				...paginationOpts,
				cursor: startCursor,
				endCursor: splitCursor,
			},
		});
		paginatedQuery.pageKeyToQuery.set(splitKey1, {
			...firstSubscription,
			cursor: startCursor,
		});
		const secondSubscription = this.client.subscribe(paginatedQuery.canonicalizedUdfPath, {
			...paginatedQuery.args,
			paginationOpts: {
				...paginationOpts,
				cursor: splitCursor,
				endCursor: continueCursor,
			},
		});
		paginatedQuery.pageKeyToQuery.set(splitKey2, {
			...secondSubscription,
			cursor: splitCursor,
		});
		paginatedQuery.ongoingSplits.set(pageKey, [splitKey1, splitKey2]);
	}
	/**
	 * @internal
	 */
	addPageToPaginatedQuery(token, continueCursor, numItems) {
		const paginatedQuery = this.mustGetPaginatedQuery(token);
		const pageKey = paginatedQuery.nextPageKey++;
		const paginationOpts = {
			cursor: continueCursor,
			numItems,
			id: paginatedQuery.id,
		};
		const pageArgs = {
			...paginatedQuery.args,
			paginationOpts,
		};
		const subscription = this.client.subscribe(paginatedQuery.canonicalizedUdfPath, pageArgs);
		paginatedQuery.pageKeys.push(pageKey);
		paginatedQuery.pageKeyToQuery.set(pageKey, {
			...subscription,
			cursor: continueCursor,
		});
		return subscription;
	}
	removePaginatedQuerySubscriber(token) {
		const paginatedQuery = this.paginatedQuerySet.get(token);
		if (!paginatedQuery) return;
		paginatedQuery.numSubscribers -= 1;
		if (paginatedQuery.numSubscribers > 0) return;
		for (const subscription of paginatedQuery.pageKeyToQuery.values()) subscription.unsubscribe();
		this.paginatedQuerySet.delete(token);
	}
	completePaginatedQuerySplit(paginatedQuery, pageKey, splitKey1, splitKey2) {
		const originalQuery = paginatedQuery.pageKeyToQuery.get(pageKey);
		paginatedQuery.pageKeyToQuery.delete(pageKey);
		const pageIndex = paginatedQuery.pageKeys.indexOf(pageKey);
		paginatedQuery.pageKeys.splice(pageIndex, 1, splitKey1, splitKey2);
		paginatedQuery.ongoingSplits.delete(pageKey);
		originalQuery.unsubscribe();
	}
	/** The query tokens for all active pages, in result order */
	activePageQueryTokens(paginatedQuery) {
		return paginatedQuery.pageKeys.map((pageKey) => paginatedQuery.pageKeyToQuery.get(pageKey).queryToken);
	}
	allQueryTokens(paginatedQuery) {
		return Array.from(paginatedQuery.pageKeyToQuery.values()).map((sub) => sub.queryToken);
	}
	queryTokenForLastPageOfPaginatedQuery(token) {
		const paginatedQuery = this.mustGetPaginatedQuery(token);
		const lastPageKey = paginatedQuery.pageKeys[paginatedQuery.pageKeys.length - 1];
		if (lastPageKey === void 0) throw new Error(`No pages for paginated query ${token}`);
		return paginatedQuery.pageKeyToQuery.get(lastPageKey).queryToken;
	}
	mustGetPaginatedQuery(token) {
		const paginatedQuery = this.paginatedQuerySet.get(token);
		if (!paginatedQuery) throw new Error("paginated query no longer exists for token " + token);
		return paginatedQuery;
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.44.0_react@19.2.8/node_modules/convex/dist/esm/browser/simple_client.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
	key in obj
		? __defProp(obj, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value,
			})
		: (obj[key] = value);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var defaultWebSocketConstructor;
var ConvexClient = class {
	/**
	 * Construct a client and immediately initiate a WebSocket connection to the passed address.
	 *
	 * @public
	 */
	constructor(address, options = {}) {
		__publicField(this, "listeners");
		__publicField(this, "_client");
		__publicField(this, "_paginatedClient");
		__publicField(this, "callNewListenersWithCurrentValuesTimer");
		__publicField(this, "_closed");
		__publicField(this, "_disabled");
		if (options.skipConvexDeploymentUrlCheck !== true) validateDeploymentUrl(address);
		const { disabled, ...baseOptions } = options;
		this._closed = false;
		this._disabled = !!disabled;
		if (defaultWebSocketConstructor && !("webSocketConstructor" in baseOptions) && typeof WebSocket === "undefined")
			baseOptions.webSocketConstructor = defaultWebSocketConstructor;
		if (typeof window === "undefined" && !("unsavedChangesWarning" in baseOptions))
			baseOptions.unsavedChangesWarning = false;
		if (!this.disabled) {
			this._client = new BaseConvexClient(address, () => {}, baseOptions);
			this._paginatedClient = new PaginatedQueryClient(this._client, (transition) => this._transition(transition));
		}
		this.listeners = /* @__PURE__ */ new Set();
	}
	/**
	 * Once closed no registered callbacks will fire again.
	 */
	get closed() {
		return this._closed;
	}
	get client() {
		if (this._client) return this._client;
		throw new Error("ConvexClient is disabled");
	}
	/**
	 * @internal
	 */
	get paginatedClient() {
		if (this._paginatedClient) return this._paginatedClient;
		throw new Error("ConvexClient is disabled");
	}
	get disabled() {
		return this._disabled;
	}
	/**
	 * Call a callback whenever a new result for a query is received. The callback
	 * will run soon after being registered if a result for the query is already
	 * in memory.
	 *
	 * The return value is an {@link Unsubscribe} object which is both a function
	 * an an object with properties. Both of the patterns below work with this object:
	 *
	 *```ts
	 * // call the return value as a function
	 * const unsubscribe = client.onUpdate(api.messages.list, {}, (messages) => {
	 *   console.log(messages);
	 * });
	 * unsubscribe();
	 *
	 * // unpack the return value into its properties
	 * const {
	 *   getCurrentValue,
	 *   unsubscribe,
	 * } = client.onUpdate(api.messages.list, {}, (messages) => {
	 *   console.log(messages);
	 * });
	 *```
	 *
	 * @param query - A {@link server.FunctionReference} for the public query to run.
	 * @param args - The arguments to run the query with.
	 * @param callback - Function to call when the query result updates.
	 * @param onError - Function to call when the query result updates with an error.
	 * If not provided, errors will be thrown instead of calling the callback.
	 *
	 * @return an {@link Unsubscribe} function to stop calling the onUpdate function.
	 */
	onUpdate(query, args, callback, onError) {
		if (this.disabled) return this.createDisabledUnsubscribe();
		const { queryToken, unsubscribe } = this.client.subscribe(getFunctionName(query), args);
		const queryInfo = {
			queryToken,
			callback,
			onError,
			unsubscribe,
			hasEverRun: false,
			query,
			args,
			paginationOptions: void 0,
		};
		this.listeners.add(queryInfo);
		if (this.queryResultReady(queryToken) && this.callNewListenersWithCurrentValuesTimer === void 0)
			this.callNewListenersWithCurrentValuesTimer = setTimeout(() => this.callNewListenersWithCurrentValues(), 0);
		const unsubscribeProps = {
			unsubscribe: () => {
				if (this.closed) return;
				this.listeners.delete(queryInfo);
				unsubscribe();
			},
			getCurrentValue: () => this.client.localQueryResultByToken(queryToken),
			getQueryLogs: () => this.client.localQueryLogs(queryToken),
		};
		const ret = unsubscribeProps.unsubscribe;
		Object.assign(ret, unsubscribeProps);
		return ret;
	}
	/**
	 * Call a callback whenever a new result for a paginated query is received.
	 *
	 * This is an experimental preview: the final API may change.
	 * In particular, caching behavior, page splitting, and required paginated query options
	 * may change.
	 *
	 * @param query - A {@link server.FunctionReference} for the public query to run.
	 * @param args - The arguments to run the query with.
	 * @param options - Options for the paginated query including initialNumItems and id.
	 * @param callback - Function to call when the query result updates.
	 * @param onError - Function to call when the query result updates with an error.
	 *
	 * @return an {@link Unsubscribe} function to stop calling the callback.
	 */
	onPaginatedUpdate_experimental(query, args, options, callback, onError) {
		if (this.disabled) return this.createDisabledUnsubscribe();
		const paginationOptions = {
			initialNumItems: options.initialNumItems,
			id: -1,
		};
		const { paginatedQueryToken, unsubscribe } = this.paginatedClient.subscribe(
			getFunctionName(query),
			args,
			paginationOptions,
		);
		const queryInfo = {
			queryToken: paginatedQueryToken,
			callback,
			onError,
			unsubscribe,
			hasEverRun: false,
			query,
			args,
			paginationOptions,
		};
		this.listeners.add(queryInfo);
		if (
			!!this.paginatedClient.localQueryResultByToken(paginatedQueryToken) &&
			this.callNewListenersWithCurrentValuesTimer === void 0
		)
			this.callNewListenersWithCurrentValuesTimer = setTimeout(() => this.callNewListenersWithCurrentValues(), 0);
		const unsubscribeProps = {
			unsubscribe: () => {
				if (this.closed) return;
				this.listeners.delete(queryInfo);
				unsubscribe();
			},
			getCurrentValue: () => {
				return this.paginatedClient.localQueryResult(getFunctionName(query), args, paginationOptions);
			},
			getQueryLogs: () => [],
		};
		const ret = unsubscribeProps.unsubscribe;
		Object.assign(ret, unsubscribeProps);
		return ret;
	}
	callNewListenersWithCurrentValues() {
		this.callNewListenersWithCurrentValuesTimer = void 0;
		this._transition(
			{
				queries: [],
				paginatedQueries: [],
			},
			true,
		);
	}
	queryResultReady(queryToken) {
		return this.client.hasLocalQueryResultByToken(queryToken);
	}
	createDisabledUnsubscribe() {
		const disabledUnsubscribe = () => {};
		Object.assign(disabledUnsubscribe, {
			unsubscribe: disabledUnsubscribe,
			getCurrentValue: () => void 0,
			getQueryLogs: () => void 0,
		});
		return disabledUnsubscribe;
	}
	async close() {
		if (this.disabled) return;
		this.listeners.clear();
		this._closed = true;
		if (this._paginatedClient) this._paginatedClient = void 0;
		return this.client.close();
	}
	/**
	 * Get the current JWT auth token and decoded claims.
	 */
	getAuth() {
		if (this.disabled) return;
		return this.client.getCurrentAuthClaims();
	}
	/**
	 * Set the authentication token to be used for subsequent queries and mutations.
	 * `fetchToken` will be called automatically again if a token expires.
	 * `fetchToken` should return `null` if the token cannot be retrieved, for example
	 * when the user's rights were permanently revoked.
	 * @param fetchToken - an async function returning the JWT (typically an OpenID Connect Identity Token)
	 * @param onChange - a callback that will be called when the authentication status changes
	 */
	setAuth(fetchToken, onChange) {
		if (this.disabled) return;
		this.client.setAuth(fetchToken, onChange ?? (() => {}));
	}
	/**
	 * @internal
	 */
	setAdminAuth(token, identity) {
		if (this.closed) throw new Error("ConvexClient has already been closed.");
		if (this.disabled) return;
		this.client.setAdminAuth(token, identity);
	}
	/**
	 * @internal
	 */
	_transition({ queries, paginatedQueries }, callNewListeners = false) {
		const updatedQueries = [...queries.map((q) => q.token), ...paginatedQueries.map((q) => q.token)];
		for (const queryInfo of this.listeners) {
			const { callback, queryToken, onError, hasEverRun } = queryInfo;
			const isPaginatedQuery = serializedQueryTokenIsPaginated(queryToken);
			const hasResultReady = isPaginatedQuery
				? !!this.paginatedClient.localQueryResultByToken(queryToken)
				: this.client.hasLocalQueryResultByToken(queryToken);
			if (updatedQueries.includes(queryToken) || (callNewListeners && !hasEverRun && hasResultReady)) {
				queryInfo.hasEverRun = true;
				let newValue;
				try {
					if (isPaginatedQuery) newValue = this.paginatedClient.localQueryResultByToken(queryToken);
					else newValue = this.client.localQueryResultByToken(queryToken);
				} catch (error) {
					if (!(error instanceof Error)) throw error;
					if (onError) onError(error, "Second argument to onUpdate onError is reserved for later use");
					else Promise.reject(error);
					continue;
				}
				callback(newValue, "Second argument to onUpdate callback is reserved for later use");
			}
		}
	}
	/**
	 * Execute a mutation function.
	 *
	 * @param mutation - A {@link server.FunctionReference} for the public mutation
	 * to run.
	 * @param args - An arguments object for the mutation.
	 * @param options - A {@link MutationOptions} options object for the mutation.
	 * @returns A promise of the mutation's result.
	 */
	async mutation(mutation, args, options) {
		if (this.disabled) throw new Error("ConvexClient is disabled");
		return await this.client.mutation(getFunctionName(mutation), args, options);
	}
	/**
	 * Execute an action function.
	 *
	 * @param action - A {@link server.FunctionReference} for the public action
	 * to run.
	 * @param args - An arguments object for the action.
	 * @returns A promise of the action's result.
	 */
	async action(action, args) {
		if (this.disabled) throw new Error("ConvexClient is disabled");
		return await this.client.action(getFunctionName(action), args);
	}
	/**
	 * Fetch a query result once.
	 *
	 * @param query - A {@link server.FunctionReference} for the public query
	 * to run.
	 * @param args - An arguments object for the query.
	 * @returns A promise of the query's result.
	 */
	async query(query, args) {
		if (this.disabled) throw new Error("ConvexClient is disabled");
		const value = this.client.localQueryResult(getFunctionName(query), args);
		if (value !== void 0) return Promise.resolve(value);
		return new Promise((resolve, reject) => {
			const { unsubscribe } = this.onUpdate(
				query,
				args,
				(value2) => {
					unsubscribe();
					resolve(value2);
				},
				(e) => {
					unsubscribe();
					reject(e);
				},
			);
		});
	}
	/**
	 * Get the current {@link ConnectionState} between the client and the Convex
	 * backend.
	 *
	 * @returns The {@link ConnectionState} with the Convex backend.
	 */
	connectionState() {
		if (this.disabled) throw new Error("ConvexClient is disabled");
		return this.client.connectionState();
	}
	/**
	 * Subscribe to the {@link ConnectionState} between the client and the Convex
	 * backend, calling a callback each time it changes.
	 *
	 * Subscribed callbacks will be called when any part of ConnectionState changes.
	 * ConnectionState may grow in future versions (e.g. to provide a array of
	 * inflight requests) in which case callbacks would be called more frequently.
	 *
	 * @returns An unsubscribe function to stop listening.
	 */
	subscribeToConnectionState(cb) {
		if (this.disabled) return () => {};
		return this.client.subscribeToConnectionState(cb);
	}
};
//#endregion
//#region node_modules/.pnpm/bonobo-plugin-sdk@https+++c_f8305e0ddeba007231fb0fd668a00ec8/node_modules/bonobo-plugin-sdk/frontend.js
/**
 * Bonobo plugin frontend SDK — hand-written browser ESM, no build step.
 *
 * Runs inside the host app's sandboxed plugin iframe for plugin pages and plugin file views alike.
 * The host handshake is a strict postMessage contract: the page announces `bonobo:ready`, the host
 * answers `bonobo:init` with a short-lived scoped session token (`plu_...`), the page context, and
 * the Convex deployment URL. From then on the page acts on its own:
 *
 * - Public `/api/v1/*` calls go straight to the iframe's own origin with
 *   `Authorization: Bearer <token>`.
 * - The `data` and `members` APIs run on the page's OWN Convex client. The client authenticates
 *   with a short-lived plugin-session JWT, minted by exchanging the session token at the
 *   same-origin `/plugins-ui/session-jwt` route. The host window is not part of that data path;
 *   it only answers session-token refreshes over the bridge.
 */
/** `getToken` refreshes when the token is expired or expires within this margin. */
var TOKEN_EXPIRY_MARGIN_MS = 6e4;
var READY_RETRY_MS = 500;
var REFRESH_DEADLINE_MS = 1e4;
var BRIDGE_NONCE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var DATA_MAX_NAME_LENGTH = 128;
var DATA_MAX_KEY_PREFIX_LENGTH = 109;
var DATA_MAX_LIST_PAGE_SIZE = 100;
var DATA_KEY_PREFIX_REGEX = /^[\x21-\x7e]+$/;
var MAX_WATCH_SUBSCRIPTIONS = 8;
var MAX_WINDOW_INTERVALS = 6;
var MAX_PAGE_SERVER_SUBSCRIPTIONS = 24;
/**
 * Validates the `bonobo:init` context union: `kind: "page"` or `kind: "file_view"`.
 *
 * @param {unknown} value
 */
function is_ui_context(value) {
	if (typeof value !== "object" || value === null) return false;
	const context = value;
	if (
		typeof context.pluginName !== "string" ||
		typeof context.userId !== "string" ||
		typeof context.organizationId !== "string" ||
		typeof context.workspaceId !== "string"
	)
		return false;
	if (context.kind === "page") return typeof context.pageId === "string" && typeof context.pageTitle === "string";
	if (context.kind === "file_view") {
		if (typeof context.fileViewId !== "string" || typeof context.fileViewTitle !== "string") return false;
		if (typeof context.file !== "object" || context.file === null) return false;
		const file = context.file;
		return (
			typeof file.fileNodeId === "string" &&
			typeof file.name === "string" &&
			typeof file.path === "string" &&
			typeof file.contentType === "string"
		);
	}
	return false;
}
/**
 * Reads the host origin and frame nonce from the URL fragment. The fragment is available to the
 * page but is not sent in the asset request, cache key, or referrer.
 */
function read_bridge_bootstrap() {
	const fragment = window.location.hash.slice(1);
	if (!fragment) throw new Error("Missing host bridge fragment — the page must be embedded by the Bonobo host app");
	const params = new URLSearchParams(fragment);
	const parentOrigins = params.getAll("parentOrigin");
	const bridgeNonces = params.getAll("bridgeNonce");
	if (params.size !== 2 || parentOrigins.length !== 1 || bridgeNonces.length !== 1)
		throw new Error("Invalid host bridge fragment");
	const parentOrigin = parentOrigins[0];
	const bridgeNonce = bridgeNonces[0];
	let parsedParentOrigin;
	try {
		parsedParentOrigin = new URL(parentOrigin);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if (
		(parsedParentOrigin.protocol !== "http:" && parsedParentOrigin.protocol !== "https:") ||
		parsedParentOrigin.origin !== parentOrigin
	)
		throw new Error("Invalid host bridge parent origin");
	if (!BRIDGE_NONCE_PATTERN.test(bridgeNonce)) throw new Error("Invalid host bridge nonce");
	return {
		parentOrigin,
		bridgeNonce,
	};
}
/**
 * Client-side pre-check for watch inputs. Returns a refusal message, or `null` when the inputs
 * pass. Input that passes here can still die on the server with the same bare null a denial gets.
 *
 * @param {{ collection: string, keyPrefix?: string, limit: number }} args
 */
function validate_watch_inputs(args) {
	if (args.collection.length === 0 || args.collection.length > DATA_MAX_NAME_LENGTH)
		return `Collection names must be 1 to ${DATA_MAX_NAME_LENGTH} characters`;
	if (
		args.keyPrefix !== void 0 &&
		(args.keyPrefix.length > DATA_MAX_KEY_PREFIX_LENGTH || !DATA_KEY_PREFIX_REGEX.test(args.keyPrefix))
	)
		return `Key prefixes must be 1 to ${DATA_MAX_KEY_PREFIX_LENGTH} printable ASCII characters`;
	if (!Number.isInteger(args.limit) || args.limit < 1 || args.limit > DATA_MAX_LIST_PAGE_SIZE)
		return `Watch limits must be integers from 1 to ${DATA_MAX_LIST_PAGE_SIZE}`;
	return null;
}
/**
 * One key interval of a document window: one server subscription over
 * `(gt start .. lte end]`, where a `null` side is unbounded. `docs` is the last delivered array
 * and `previousFirstKey` the first key of the delivery before it — the only legal split
 * fencepost, because the current first key may be a brand-new arrival.
 *
 * @typedef {object} DocumentsWindowInterval
 * @property {string | null} start
 * @property {string | null} end
 * @property {import("bonobo-plugin-sdk").BonoboPublicDoc[] | null} docs
 * @property {boolean} truncated
 * @property {string | undefined} previousFirstKey
 * @property {() => void} stop Dispose the watcher and release its server slot, exactly once.
 */
/**
 * The page-derived watch args. Interval bounds are excluded from this shape on purpose: they are
 * fenceposts the window manager computes itself and passes as their own parameter, so caller
 * input can never smuggle a bound into a query.
 *
 * @typedef {{ collection: string, keyPrefix?: string, limit: number }} DataWatchQueryArgs
 * @typedef {{ keyStartExclusive?: string, keyEndInclusive?: string } | null} DataWatchBounds
 * @typedef {{ value: { docs: import("bonobo-plugin-sdk").BonoboPublicDoc[], truncated: boolean } | null } | { queryError: unknown }} DataWatchOutcome
 * @typedef {(queryArgs: DataWatchQueryArgs, bounds: DataWatchBounds, onResult: (outcome: DataWatchOutcome) => void) => ({ dispose: () => void } | null)} DataStartWatch
 */
/**
 * A reactive document window: an ordered list of disjoint, contiguous key intervals whose
 * fenceposts are keys the server itself delivered. The page sees one flattened doc list that
 * RETAINS loaded history — arrivals grow an interval and splits absorb the overflow, instead of
 * older docs sliding out of a single capped read.
 *
 * The window manager never compares keys. Fenceposts are picked positionally (an element of a
 * delivered array, or a bound stored at creation), because a JS string comparison disagrees with
 * the index's UTF-8 order on supplementary-plane characters. Everything order-related is the
 * server's job.
 *
 * Swap discipline: the committed interval list is the only flatten source. At most one pending
 * replacement (a split or a merge) exists at a time; the replaced intervals stay committed and
 * keep delivering until every replacement has a result, then the swap commits atomically in the
 * last delivery's callback. Re-seats bypass this: they keep the interval's delivered docs across
 * a dispose-and-create, so they are content-neutral by construction.
 *
 * Kill rule: any interval — committed or pending — answering `null` or erroring kills the whole
 * window: every watcher is disposed synchronously, the page gets exactly one `docs: null`, and
 * later callbacks are ignored. `dead` is checked before every watcher start so an in-flight
 * grow cannot resurrect a killed window.
 *
 * @param {{
 *   queryArgs: DataWatchQueryArgs,
 *   start_watch: DataStartWatch,
 *   acquire_server_slot: () => boolean,
 *   release_server_slot: () => void,
 *   page_at_ceiling: () => boolean,
 *   post_update: (payload: { docs: import("bonobo-plugin-sdk").BonoboPublicDoc[], hasMore: boolean, atCapacity: boolean, incomplete: boolean }) => void,
 *   on_dead: () => void,
 * }} deps
 */
function create_documents_window(deps) {
	const state = {
		/** @type {DocumentsWindowInterval[]} */
		intervals: [],
		/** @type {{ from: number, removeCount: number, replacements: DocumentsWindowInterval[] } | null} */
		pending: null,
		queuedLoadOlder: false,
		/** Sticky: set on the first re-seat, when older docs are first known to exist. */
		bottomOpen: false,
		loadingOlder: false,
		/** @type {DocumentsWindowInterval | null} */
		awaitingTail: null,
		/** One-shot: a refused load-older reports atCapacity on the next flush. */
		forceAtCapacity: false,
		flushScheduled: false,
		/** @type {string | null} */
		lastPayloadJson: null,
		dead: false,
	};
	const stop_all = () => {
		state.dead = true;
		for (const interval of state.intervals) interval.stop();
		for (const interval of state.pending?.replacements ?? []) interval.stop();
		state.pending = null;
	};
	const kill = () => {
		if (state.dead) return;
		stop_all();
		deps.on_dead();
	};
	/** @param {DocumentsWindowInterval} interval */
	const start_interval = (interval) => {
		if (state.dead || !deps.acquire_server_slot()) return false;
		let stopped = false;
		const subscription = deps.start_watch(
			deps.queryArgs,
			{
				...(interval.start === null ? {} : { keyStartExclusive: interval.start }),
				...(interval.end === null ? {} : { keyEndInclusive: interval.end }),
			},
			(outcome) => {
				if (!stopped) handle_result(interval, outcome);
			},
		);
		if (!subscription) {
			deps.release_server_slot();
			return false;
		}
		interval.stop = () => {
			if (stopped) return;
			stopped = true;
			subscription.dispose();
			deps.release_server_slot();
		};
		return true;
	};
	/**
	 * Whether a truncated bounded interval can be split. The fencepost is the previously
	 * delivered first key when one exists (so the left side isolates new arrivals); an interval
	 * whose very first delivery already truncated uses its own last delivered key instead, so
	 * the repeat-split that extends coverage does not stall waiting for a second delivery.
	 * Degenerate splits are refused: a fencepost equal to a bound would recreate the parent's
	 * exact args, and Convex dedupes identical-args subscriptions into one token, which would
	 * double-flatten the range.
	 *
	 * @param {DocumentsWindowInterval} interval
	 */
	const split_fencepost = (interval) => {
		if (interval.docs === null || interval.docs.length === 0) return null;
		const fencepost = interval.previousFirstKey ?? interval.docs[interval.docs.length - 1].key;
		if (fencepost === interval.start || fencepost === interval.end) return null;
		if (new Set(interval.docs.map((doc) => doc.key)).size < 2) return null;
		return fencepost;
	};
	const window_interval_count = () => state.intervals.length + (state.pending?.replacements.length ?? 0);
	const compute_payload = () => {
		const docs = state.intervals.flatMap((interval) => interval.docs ?? []);
		const last = state.intervals[state.intervals.length - 1];
		return {
			docs,
			hasMore: state.bottomOpen && !(last !== void 0 && last.end === null && last.docs !== null && !last.truncated),
			atCapacity: state.forceAtCapacity || state.intervals.length >= MAX_WINDOW_INTERVALS || deps.page_at_ceiling(),
			incomplete: state.intervals.some((interval, index) => {
				if (interval.end === null || !interval.truncated || interval.docs === null) return false;
				if (state.pending && index >= state.pending.from && index < state.pending.from + state.pending.removeCount)
					return false;
				return (
					split_fencepost(interval) === null ||
					window_interval_count() + 1 > MAX_WINDOW_INTERVALS ||
					deps.page_at_ceiling()
				);
			}),
		};
	};
	const schedule_flush = () => {
		if (state.flushScheduled || state.dead) return;
		state.flushScheduled = true;
		queueMicrotask(() => {
			state.flushScheduled = false;
			if (state.dead) return;
			const payload = compute_payload();
			state.forceAtCapacity = false;
			const payloadJson = JSON.stringify(payload);
			if (payloadJson === state.lastPayloadJson) return;
			state.lastPayloadJson = payloadJson;
			deps.post_update(payload);
		});
	};
	const report_at_capacity = () => {
		if (state.dead) return;
		state.forceAtCapacity = true;
		schedule_flush();
	};
	/**
	 * Re-seat an unbounded interval that just delivered truncated: pin its lower side to its own
	 * largest delivered key and restart the watcher over that closed range. The delivered docs
	 * stay on the interval, so the swap is content-neutral and needs no pending machinery. From
	 * here on, arrivals inside the range grow the interval instead of sliding docs out of a
	 * capped read, and the range below the fencepost belongs to load-older.
	 *
	 * @param {DocumentsWindowInterval} interval
	 */
	const reseat_tail = (interval) => {
		const docs = interval.docs;
		const fencepost = docs[docs.length - 1].key;
		interval.stop();
		interval.end = fencepost;
		interval.truncated = false;
		state.bottomOpen = true;
		if (!start_interval(interval)) kill();
	};
	const execute_load_older = () => {
		if (state.dead || state.loadingOlder || state.pending || !compute_payload().hasMore) return;
		const last = state.intervals[state.intervals.length - 1];
		if (!last || last.end === null) return;
		if (window_interval_count() + 1 > MAX_WINDOW_INTERVALS || deps.page_at_ceiling()) {
			report_at_capacity();
			return;
		}
		/** @type {DocumentsWindowInterval} */
		const tail = {
			start: last.end,
			end: null,
			docs: null,
			truncated: false,
			previousFirstKey: void 0,
			stop: () => {},
		};
		if (!start_interval(tail)) {
			report_at_capacity();
			return;
		}
		state.intervals.push(tail);
		state.loadingOlder = true;
		state.awaitingTail = tail;
	};
	/**
	 * The single re-evaluation point after every delivery and commit: re-seat a truncated
	 * unbounded tail, run a queued load-older, then start at most one pending swap — a split of
	 * the first truncated bounded interval, or a merge of the first adjacent pair small enough
	 * to share one subscription again.
	 */
	const reconcile = () => {
		if (state.dead) return;
		const last = state.intervals[state.intervals.length - 1];
		if (last && last.end === null && last.docs !== null && last.truncated) {
			reseat_tail(last);
			if (state.dead) return;
		}
		if (state.pending) return;
		if (state.queuedLoadOlder) {
			state.queuedLoadOlder = false;
			execute_load_older();
		}
		for (const [index, interval] of state.intervals.entries()) {
			if (interval.end === null || !interval.truncated || interval.docs === null) continue;
			const fencepost = split_fencepost(interval);
			if (fencepost === null) continue;
			if (window_interval_count() + 1 > MAX_WINDOW_INTERVALS) break;
			/** @type {DocumentsWindowInterval} */
			const left = {
				start: interval.start,
				end: fencepost,
				docs: null,
				truncated: false,
				previousFirstKey: void 0,
				stop: () => {},
			};
			/** @type {DocumentsWindowInterval} */
			const right = {
				start: fencepost,
				end: interval.end,
				docs: null,
				truncated: false,
				previousFirstKey: void 0,
				stop: () => {},
			};
			if (!start_interval(left)) break;
			if (!start_interval(right)) {
				left.stop();
				break;
			}
			state.pending = {
				from: index,
				removeCount: 1,
				replacements: [left, right],
			};
			return;
		}
		for (let index = 0; index + 1 < state.intervals.length; index += 1) {
			const first = state.intervals[index];
			const second = state.intervals[index + 1];
			if (first.docs === null || second.docs === null) continue;
			if (first.docs.length + second.docs.length >= deps.queryArgs.limit) continue;
			/** @type {DocumentsWindowInterval} */
			const merged = {
				start: first.start,
				end: second.end,
				docs: null,
				truncated: false,
				previousFirstKey: void 0,
				stop: () => {},
			};
			if (!start_interval(merged)) break;
			state.pending = {
				from: index,
				removeCount: 2,
				replacements: [merged],
			};
			return;
		}
	};
	const commit_pending = () => {
		const pending = state.pending;
		state.pending = null;
		const replaced = state.intervals.splice(pending.from, pending.removeCount, ...pending.replacements);
		for (const interval of replaced) interval.stop();
		schedule_flush();
		reconcile();
	};
	/**
	 * @param {DocumentsWindowInterval} interval
	 * @param {DataWatchOutcome} outcome
	 */
	const handle_result = (interval, outcome) => {
		if (state.dead) return;
		if ("queryError" in outcome) {
			console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", outcome.queryError);
			kill();
			return;
		}
		if (outcome.value === null) {
			kill();
			return;
		}
		interval.previousFirstKey = interval.docs?.[0]?.key;
		interval.docs = outcome.value.docs;
		interval.truncated = outcome.value.truncated;
		if (state.awaitingTail === interval) {
			state.awaitingTail = null;
			state.loadingOlder = false;
		}
		if (state.pending?.replacements.includes(interval)) {
			if (state.pending.replacements.every((replacement) => replacement.docs !== null)) commit_pending();
			return;
		}
		schedule_flush();
		reconcile();
	};
	/** @type {DocumentsWindowInterval} */
	const head = {
		start: null,
		end: null,
		docs: null,
		truncated: false,
		previousFirstKey: void 0,
		stop: () => {},
	};
	if (!start_interval(head)) return null;
	state.intervals.push(head);
	return {
		load_older: () => {
			if (state.dead) return;
			if (state.pending) {
				state.queuedLoadOlder = true;
				return;
			}
			execute_load_older();
		},
		dispose: () => {
			if (state.dead) return;
			stop_all();
		},
	};
}
/**
 * Builds the client's `data` and `members` APIs over an injectable reactive-read primitive.
 * `bonobo_ui_connect` wires it to the page's own Convex client; the SDK test suite injects a
 * fake `start_watch` instead, so the watch and window semantics run without a server. Plugin
 * code should use the client from `bonobo_ui_connect`, never call this directly.
 *
 * The `start_watch` dep starts one reactive read of the plugin's document store. `onResult`
 * receives `{ value }` (the query answer — `null` is the store's denial) or `{ queryError }`,
 * and results NEVER arrive synchronously from the start call, cached ones included. It returns
 * `{ dispose }`, or `null` when the read cannot start at all.
 *
 * @param {{
 *   start_watch: DataStartWatch,
 *   run_user_write: (op: "append" | "put" | "remove" | "putOwned" | "removeOwned", fields: Record<string, unknown>) => Promise<unknown>,
 *   resolve_member_display: (userIds: string[]) => Promise<{ members: Record<string, string | null> } | null>,
 * }} deps
 * @returns {{ data: import("bonobo-plugin-sdk/frontend").BonoboUiFrontendClient["data"], members: import("bonobo-plugin-sdk/frontend").BonoboUiFrontendClient["members"] }}
 */
function bonobo_ui_create_data_api(deps) {
	/** @type {Set<object>} */
	const registrations = /* @__PURE__ */ new Set();
	let serverSubscriptionCount = 0;
	const acquire_server_slot = () => {
		if (serverSubscriptionCount >= MAX_PAGE_SERVER_SUBSCRIPTIONS) return false;
		serverSubscriptionCount += 1;
		return true;
	};
	const release_server_slot = () => {
		serverSubscriptionCount -= 1;
	};
	const page_at_ceiling = () => serverSubscriptionCount >= MAX_PAGE_SERVER_SUBSCRIPTIONS;
	/**
	 * @param {(docs: null, info?: { reason: string, message: string }) => void} onUpdate
	 * @param {{ reason: string, message: string }} [info]
	 */
	const deliver_death_async = (onUpdate, info) => {
		setTimeout(() => {
			if (info) onUpdate(null, info);
			else onUpdate(null);
		}, 0);
	};
	/** @param {(docs: null, info?: { reason: string, message: string }) => void} onUpdate */
	const refuse_capacity = (onUpdate) => {
		console.warn("[bonobo-plugin-sdk] Data watch refused, subscription cap reached");
		deliver_death_async(onUpdate, {
			reason: "capacity",
			message: "Subscription limit reached for this page",
		});
	};
	/** @type {import("bonobo-plugin-sdk/frontend").BonoboUiFrontendClient["data"]} */
	const data = {
		watch(opts, onUpdate) {
			const invalid = validate_watch_inputs({
				collection: opts.collection,
				...(opts.keyPrefix === void 0 ? {} : { keyPrefix: opts.keyPrefix }),
				limit: opts.limit,
			});
			if (invalid) {
				deliver_death_async(onUpdate, {
					reason: "invalid",
					message: invalid,
				});
				return () => {};
			}
			if (registrations.size >= MAX_WATCH_SUBSCRIPTIONS || page_at_ceiling()) {
				refuse_capacity(onUpdate);
				return () => {};
			}
			if (!acquire_server_slot()) {
				refuse_capacity(onUpdate);
				return () => {};
			}
			const entry = {};
			registrations.add(entry);
			/** @type {{ dispose: () => void } | null} */
			let subscription = null;
			const stop = () => {
				if (!registrations.delete(entry)) return;
				subscription?.dispose();
				release_server_slot();
			};
			subscription = deps.start_watch(
				{
					collection: opts.collection,
					...(opts.keyPrefix === void 0 ? {} : { keyPrefix: opts.keyPrefix }),
					limit: opts.limit,
				},
				null,
				(outcome) => {
					if (!registrations.has(entry)) return;
					if ("queryError" in outcome) {
						console.error("[bonobo-plugin-sdk] Plugin data watch failed:", outcome.queryError);
						stop();
						onUpdate(null);
						return;
					}
					if (outcome.value === null) {
						stop();
						onUpdate(null);
						return;
					}
					onUpdate(outcome.value.docs);
				},
			);
			if (!subscription) {
				stop();
				console.error("[bonobo-plugin-sdk] Plugin data watch could not start");
				deliver_death_async(onUpdate);
				return () => {};
			}
			return function unsubscribe() {
				stop();
			};
		},
		watchWindow(opts, onUpdate) {
			const inertHandle = {
				loadOlder() {},
				unsubscribe() {},
			};
			const invalid = validate_watch_inputs({
				collection: opts.collection,
				...(opts.keyPrefix === void 0 ? {} : { keyPrefix: opts.keyPrefix }),
				limit: opts.pageSize,
			});
			if (invalid) {
				deliver_death_async(onUpdate, {
					reason: "invalid",
					message: invalid,
				});
				return inertHandle;
			}
			if (registrations.size >= MAX_WATCH_SUBSCRIPTIONS || page_at_ceiling()) {
				refuse_capacity(onUpdate);
				return inertHandle;
			}
			const entry = {};
			registrations.add(entry);
			const documentsWindow = create_documents_window({
				queryArgs: {
					collection: opts.collection,
					...(opts.keyPrefix === void 0 ? {} : { keyPrefix: opts.keyPrefix }),
					limit: opts.pageSize,
				},
				start_watch: deps.start_watch,
				acquire_server_slot,
				release_server_slot,
				page_at_ceiling,
				post_update: (payload) => onUpdate(payload),
				on_dead: () => {
					registrations.delete(entry);
					onUpdate(null);
				},
			});
			if (!documentsWindow) {
				registrations.delete(entry);
				console.error("[bonobo-plugin-sdk] Plugin data window could not start");
				deliver_death_async(onUpdate);
				return inertHandle;
			}
			return {
				loadOlder() {
					if (registrations.has(entry)) documentsWindow.load_older();
				},
				unsubscribe() {
					if (registrations.delete(entry)) documentsWindow.dispose();
				},
			};
		},
		append(opts) {
			return run_write("append", {
				collection: opts.collection,
				...(opts.keyPrefix === void 0 ? {} : { keyPrefix: opts.keyPrefix }),
				value: opts.value,
				...(opts.clientRequestId === void 0 ? {} : { clientRequestId: opts.clientRequestId }),
			});
		},
		put(opts) {
			return run_write("put", {
				collection: opts.collection,
				key: opts.key,
				value: opts.value,
				...(opts.expectedRevision === void 0 ? {} : { expectedRevision: opts.expectedRevision }),
			});
		},
		remove(opts) {
			return run_write("remove", {
				collection: opts.collection,
				key: opts.key,
				...(opts.expectedRevision === void 0 ? {} : { expectedRevision: opts.expectedRevision }),
			});
		},
		putOwned(opts) {
			return run_write("putOwned", {
				collection: opts.collection,
				key: opts.key,
				value: opts.value,
				...(opts.expectedRevision === void 0 ? {} : { expectedRevision: opts.expectedRevision }),
			});
		},
		removeOwned(opts) {
			return run_write("removeOwned", {
				collection: opts.collection,
				key: opts.key,
				...(opts.expectedRevision === void 0 ? {} : { expectedRevision: opts.expectedRevision }),
			});
		},
	};
	/**
	 * Every write resolves with the store door's Result as-is, `_yay` and `_nay` alike. A thrown
	 * call (network loss, a payload the Convex client cannot serialize) resolves the stable
	 * generic `_nay`; the real cause stays in the log.
	 *
	 * @param {"append" | "put" | "remove" | "putOwned" | "removeOwned"} op
	 * @param {Record<string, unknown>} fields
	 */
	function run_write(op, fields) {
		return Promise.resolve()
			.then(() => deps.run_user_write(op, fields))
			.catch((error) => {
				console.error("[bonobo-plugin-sdk] Plugin data write failed:", error);
				return { _nay: { message: "Failed to write plugin data" } };
			});
	}
	return {
		data,
		members: {
			resolve(userIds) {
				return Promise.resolve()
					.then(() => deps.resolve_member_display(userIds))
					.then((result) => {
						return result === null ? {} : result.members;
					})
					.catch((error) => {
						console.error("[bonobo-plugin-sdk] Failed to resolve plugin member names:", error);
						return {};
					});
			},
		},
	};
}
/**
 * Wires the data api's deps to the page's own Convex client.
 *
 * - `start_watch` adapts the client's `onUpdate`: the client delivers an already-cached result
 *   on a `setTimeout(0)`, so results never come back synchronously from the start call —
 *   exactly the delivery contract `bonobo_ui_create_data_api` requires. `onError` is always
 *   passed, because without it the client turns a query error into an unhandled rejection
 *   instead of a callback.
 * - The write and member doors read everything else they need from the session named by the
 *   JWT, so the args carry only the operation itself.
 *
 * @param {import("convex/browser").ConvexClient} convexClient
 */
function create_convex_data_deps(convexClient) {
	/** @type {DataStartWatch} */
	const start_watch = (queryArgs, bounds, onResult) => {
		try {
			const unsubscribe = convexClient.onUpdate(
				anyApi.plugins_data.watch_documents,
				{
					...queryArgs,
					...(bounds?.keyStartExclusive === void 0 ? {} : { keyStartExclusive: bounds.keyStartExclusive }),
					...(bounds?.keyEndInclusive === void 0 ? {} : { keyEndInclusive: bounds.keyEndInclusive }),
				},
				(value) => onResult({ value }),
				(queryError) => onResult({ queryError }),
			);
			return { dispose: () => void unsubscribe() };
		} catch {
			return null;
		}
	};
	return {
		start_watch,
		/**
		 * @param {"append" | "put" | "remove" | "putOwned" | "removeOwned"} op
		 * @param {Record<string, unknown>} fields
		 */
		run_user_write: (op, fields) => {
			switch (op) {
				case "append":
					return convexClient.mutation(anyApi.plugins_data.user_append_document, fields);
				case "put":
					return convexClient.mutation(anyApi.plugins_data.user_put_document, fields);
				case "remove":
					return convexClient.mutation(anyApi.plugins_data.user_remove_document, fields);
				case "putOwned":
					return convexClient.mutation(anyApi.plugins_data.user_put_owned_document, fields);
				case "removeOwned":
					return convexClient.mutation(anyApi.plugins_data.user_remove_owned_document, fields);
			}
		},
		/** @param {string[]} userIds */
		resolve_member_display: (userIds) => convexClient.query(anyApi.plugins_data.resolve_member_display, { userIds }),
	};
}
/**
 * Connects the page to the embedding host app. It installs one shared `message` listener (for
 * init and token responses), posts `{ type: "bonobo:ready", bridgeNonce }` to `window.parent`,
 * and resolves with the frontend client when the host's `bonobo:init` arrives. `bonobo:init`
 * messages after the first are ignored.
 *
 * The host puts its canonical HTTP(S) origin and a fresh frame nonce in the URL fragment. The SDK
 * validates both before connecting, sends ready only to that exact origin, and accepts host
 * messages only from that origin, `window.parent`, and the matching nonce. The session token
 * travels over postMessage only and is never placed in a URL.
 *
 * On init the SDK also opens the page's own Convex client against the init's `convexUrl`. The
 * client authenticates with short-lived plugin-session JWTs minted by exchanging the session
 * token at the same-origin `/plugins-ui/session-jwt` route; the `data` and `members` APIs run on
 * that client directly.
 *
 * @returns {Promise<import("bonobo-plugin-sdk/frontend").BonoboUiFrontendClient>}
 */
async function bonobo_ui_connect() {
	const { parentOrigin, bridgeNonce } = read_bridge_bootstrap();
	let apiOrigin = "";
	let token = "";
	let tokenExpiresAt = 0;
	/** @type {Map<string, { resolve: (token: string) => void, reject: (error: Error) => void, timeout: ReturnType<typeof setTimeout> }>} */
	const pending_refreshes = /* @__PURE__ */ new Map();
	/** @type {Promise<string> | null} */
	let refresh_in_flight = null;
	/**
	 * Returns the current session token, refreshing it first when it is expired or within
	 * `TOKEN_EXPIRY_MARGIN_MS` of `tokenExpiresAt`.
	 *
	 * @returns {Promise<string>}
	 */
	async function getToken() {
		if (Date.now() >= tokenExpiresAt - TOKEN_EXPIRY_MARGIN_MS) return refreshToken();
		return token;
	}
	/**
	 * Asks the host for a fresh session token. Concurrent callers share one in-flight
	 * `bonobo:token-refresh-request`; it resolves on the matching `bonobo:token` and rejects on
	 * the matching `bonobo:token-error`.
	 *
	 * @returns {Promise<string>}
	 */
	function refreshToken() {
		if (refresh_in_flight) return refresh_in_flight;
		const requestId = crypto.randomUUID();
		refresh_in_flight = new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				pending_refreshes.delete(requestId);
				reject(/* @__PURE__ */ new Error("Plugin page token refresh timed out"));
			}, REFRESH_DEADLINE_MS);
			pending_refreshes.set(requestId, {
				resolve,
				reject,
				timeout,
			});
			try {
				window.parent.postMessage(
					{
						type: "bonobo:token-refresh-request",
						bridgeNonce,
						requestId,
					},
					parentOrigin,
				);
			} catch (error) {
				clearTimeout(timeout);
				pending_refreshes.delete(requestId);
				reject(error);
			}
		}).finally(() => {
			refresh_in_flight = null;
		});
		return refresh_in_flight;
	}
	/**
	 * `fetch` against `apiOrigin + path` with `Authorization: Bearer <token>`. When `init.body`
	 * is set it is JSON-encoded and sent with `Content-Type: application/json`, and the default
	 * method is `POST`; without a body the default method is `GET`. On a `401` the client
	 * refreshes the token and retries exactly once. Ok responses resolve with the parsed JSON
	 * body; non-ok responses throw an `Error` carrying `status` and `responseText`.
	 *
	 * @param {string} path - Public API path starting with `/`, e.g. `"/api/v1/files/list"`.
	 * @param {{ method?: string, headers?: Record<string, string>, body?: unknown }} [init]
	 * @returns {Promise<any>}
	 */
	async function fetchJson(path, init) {
		const has_body = init?.body !== void 0;
		/** @param {string} bearer */
		const send = (bearer) => {
			const headers = new Headers(init?.headers);
			headers.set("Authorization", `Bearer ${bearer}`);
			if (has_body) headers.set("Content-Type", "application/json");
			return fetch(apiOrigin + path, {
				method: init?.method ?? (has_body ? "POST" : "GET"),
				headers,
				body: has_body ? JSON.stringify(init.body) : void 0,
			});
		};
		const firstBearer = await getToken();
		let response = await send(firstBearer);
		if (response.status === 401) response = await send(token !== firstBearer ? token : await refreshToken());
		if (!response.ok) {
			const responseText = await response.text();
			throw Object.assign(/* @__PURE__ */ new Error(`${path} responded ${response.status}: ${responseText}`), {
				status: response.status,
				responseText,
			});
		}
		return response.json();
	}
	/**
	 * Exchanges the session token for a short-lived plugin-session JWT at the asset origin's
	 * `/plugins-ui/session-jwt` route. A same-origin JSON POST, so there is no preflight; the
	 * route answers only same-origin pages, so the JWT never becomes readable cross-origin.
	 *
	 * @param {string} sessionToken
	 */
	const exchange_session_jwt = (sessionToken) =>
		fetch(apiOrigin + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: sessionToken }),
		});
	/**
	 * The Convex client's auth callback. Every call mints a fresh JWT, so a repeated call never
	 * hands back a stale one.
	 *
	 * This chain is also what keeps an open healthy page alive: `getToken()` refreshes the
	 * session token through the host when the session is within 60 seconds of its expiry, and
	 * that host refresh EXTENDS the session and moves its scheduled deletion. A page that slept
	 * past the session expiry cannot recover here — the session doc is gone, every path below
	 * answers null, and null tells the Convex client this page is unauthenticated (its
	 * subscriptions die; the host frame's Retry or a reload mints a fresh session).
	 */
	async function fetch_convex_jwt() {
		try {
			let response = await exchange_session_jwt(await getToken());
			if (response.status === 401) response = await exchange_session_jwt(await refreshToken());
			if (!response.ok) return null;
			const body = await response.json();
			const jwt = body?._yay?.jwt;
			const sessionExpiresAt = body?._yay?.sessionExpiresAt;
			if (typeof jwt !== "string" || typeof sessionExpiresAt !== "number") return null;
			tokenExpiresAt = sessionExpiresAt;
			return jwt;
		} catch {
			return null;
		}
	}
	return new Promise((resolve) => {
		let initialized = false;
		/** @type {ReturnType<typeof setInterval> | undefined} */
		let readyInterval;
		const post_ready = () => {
			window.parent.postMessage(
				{
					type: "bonobo:ready",
					bridgeNonce,
				},
				parentOrigin,
			);
		};
		const stop_ready = () => {
			clearInterval(readyInterval);
		};
		/** @param {MessageEvent} event */
		const handle_message = (event) => {
			if (event.source !== window.parent || event.origin !== parentOrigin) return;
			const message = event.data;
			if (typeof message !== "object" || message === null) return;
			if (
				message.type === "bonobo:init" &&
				!initialized &&
				message.bridgeNonce === bridgeNonce &&
				typeof message.apiOrigin === "string" &&
				typeof message.convexUrl === "string" &&
				typeof message.token === "string" &&
				typeof message.tokenExpiresAt === "number" &&
				Number.isFinite(message.tokenExpiresAt) &&
				is_ui_context(message.context)
			) {
				initialized = true;
				stop_ready();
				window.removeEventListener("pagehide", stop_ready);
				apiOrigin = message.apiOrigin;
				token = message.token;
				tokenExpiresAt = message.tokenExpiresAt;
				const convexClient = new ConvexClient(message.convexUrl, {
					expectAuth: true,
					unsavedChangesWarning: false,
				});
				convexClient.setAuth(fetch_convex_jwt);
				window.addEventListener("pagehide", () => void convexClient.close(), { once: true });
				const { data, members } = bonobo_ui_create_data_api(create_convex_data_deps(convexClient));
				resolve({
					context: message.context,
					apiOrigin,
					getToken,
					refreshToken,
					fetchJson,
					data,
					members,
				});
			} else if (
				initialized &&
				message.bridgeNonce === bridgeNonce &&
				message.type === "bonobo:token" &&
				typeof message.requestId === "string" &&
				typeof message.token === "string" &&
				typeof message.tokenExpiresAt === "number" &&
				Number.isFinite(message.tokenExpiresAt)
			) {
				const pending = pending_refreshes.get(message.requestId);
				if (pending) {
					pending_refreshes.delete(message.requestId);
					clearTimeout(pending.timeout);
					token = message.token;
					tokenExpiresAt = message.tokenExpiresAt;
					pending.resolve(message.token);
				}
			} else if (
				initialized &&
				message.bridgeNonce === bridgeNonce &&
				message.type === "bonobo:token-error" &&
				typeof message.requestId === "string" &&
				typeof message.message === "string"
			) {
				const pending = pending_refreshes.get(message.requestId);
				if (pending) {
					pending_refreshes.delete(message.requestId);
					clearTimeout(pending.timeout);
					pending.reject(new Error(message.message));
				}
			}
		};
		window.addEventListener("message", handle_message);
		window.addEventListener("pagehide", stop_ready, { once: true });
		post_ready();
		readyInterval = setInterval(post_ready, READY_RETRY_MS);
	});
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/constants.js
/** Reset all mode flags */
var RESET_MODE = -161;
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
var MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/util.js
var isArray$1 = Array.isArray;
/**
 * Assign properties from `props` to `obj`
 * @template O, P The obj and props types
 * @param {O} obj The object to copy properties to
 * @param {P} props The object to copy properties from
 * @returns {O & P}
 */
function assign$1(obj, props) {
	for (let i in props) obj[i] = props[i];
	return obj;
}
/**
 * Remove a child node from its parent if attached. This is a workaround for
 * IE11 which doesn't support `Element.prototype.remove()`. Using this function
 * is smaller than including a dedicated polyfill.
 * @param {import('./index').ContainerNode} node The node to remove
 */
function removeNode(node) {
	if (node && node.parentNode) node.parentNode.removeChild(node);
}
var slice = EMPTY_ARR.slice;
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/diff/catch-error.js
/**
 * Find the closest error boundary to a thrown error and call it
 * @param {object} error The thrown value
 * @param {import('../internal').VNode} vnode The vnode that threw the error that was caught (except
 * for unmounting when this parameter is the highest parent that was being
 * unmounted)
 * @param {import('../internal').VNode} [oldVNode]
 * @param {import('../internal').ErrorInfo} [errorInfo]
 */
function _catchError(error, vnode, oldVNode, errorInfo) {
	/** @type {import('../internal').Component} */
	let component, ctor, handled;
	for (; (vnode = vnode._parent); )
		if ((component = vnode._component) && !component._processingException)
			try {
				ctor = component.constructor;
				if (ctor && ctor.getDerivedStateFromError != null) {
					component.setState(ctor.getDerivedStateFromError(error));
					handled = component._dirty;
				}
				if (component.componentDidCatch != null) {
					component.componentDidCatch(error, errorInfo || {});
					handled = component._dirty;
				}
				if (handled) return (component._pendingError = component);
			} catch (e) {
				error = e;
			}
	throw error;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/options.js
/**
 * The `option` object can potentially contain callback functions
 * that are called during various stages of our renderer. This is the
 * foundation on which all our addons like `preact/debug`, `preact/compat`,
 * and `preact/hooks` are based on. See the `Options` type in `internal.d.ts`
 * for a full list of available option hooks (most editors/IDEs allow you to
 * ctrl+click or cmd+click on mac the type definition below).
 * @type {import('./internal').Options}
 */
var options$1 = { _catchError };
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/create-element.js
var vnodeId$1 = 0;
/**
 * Create an virtual node (used for JSX)
 * @param {import('./internal').VNode["type"]} type The node name or Component constructor for this
 * virtual node
 * @param {object | null | undefined} [props] The properties of the virtual node
 * @param {Array<import('.').ComponentChildren>} [children] The children of the
 * virtual node
 * @returns {import('./internal').VNode}
 */
function createElement(type, props, children) {
	let normalizedProps = {},
		key,
		ref,
		i;
	for (i in props)
		if (i == "key") key = props[i];
		else if (i == "ref") ref = props[i];
		else normalizedProps[i] = props[i];
	if (arguments.length > 2) normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
	if (typeof type == "function" && type.defaultProps != null) {
		for (i in type.defaultProps) if (normalizedProps[i] === void 0) normalizedProps[i] = type.defaultProps[i];
	}
	return createVNode$1(type, normalizedProps, key, ref, null);
}
/**
 * Create a VNode (used internally by Preact)
 * @param {import('./internal').VNode["type"]} type The node name or Component
 * Constructor for this virtual node
 * @param {object | string | number | null} props The properties of this virtual node.
 * If this virtual node represents a text node, this is the text of the node (string or number).
 * @param {string | number | null} key The key for this virtual node, used when
 * diffing it against its children
 * @param {import('./internal').VNode["ref"]} ref The ref property that will
 * receive a reference to its created child
 * @returns {import('./internal').VNode}
 */
function createVNode$1(type, props, key, ref, original) {
	/** @type {import('./internal').VNode} */
	const vnode = {
		type,
		props,
		key,
		ref,
		_children: null,
		_parent: null,
		_depth: 0,
		_dom: null,
		_component: null,
		constructor: void 0,
		_original: original == null ? ++vnodeId$1 : original,
		_index: -1,
		_flags: 0,
	};
	if (original == null && options$1.vnode != null) options$1.vnode(vnode);
	return vnode;
}
function Fragment(props) {
	return props.children;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/component.js
/**
 * Base Component class. Provides `setState()` and `forceUpdate()`, which
 * trigger rendering
 * @param {object} props The initial component props
 * @param {object} context The initial context from parent components'
 * getChildContext
 */
function BaseComponent(props, context) {
	this.props = props;
	this.context = context;
}
/**
 * Update component state and schedule a re-render.
 * @this {import('./internal').Component}
 * @param {object | ((s: object, p: object) => object)} update A hash of state
 * properties to update with new values or a function that given the current
 * state and props returns a new partial state
 * @param {() => void} [callback] A function to be called once component state is
 * updated
 */
BaseComponent.prototype.setState = function (update, callback) {
	let s;
	if (this._nextState != null && this._nextState != this.state) s = this._nextState;
	else s = this._nextState = assign$1({}, this.state);
	if (typeof update == "function") update = update(assign$1({}, s), this.props);
	if (update) assign$1(s, update);
	if (update == null) return;
	if (this._vnode) {
		if (callback) this._stateCallbacks.push(callback);
		enqueueRender(this);
	}
};
/**
 * Immediately perform a synchronous re-render of the component
 * @this {import('./internal').Component}
 * @param {() => void} [callback] A function to be called after component is
 * re-rendered
 */
BaseComponent.prototype.forceUpdate = function (callback) {
	if (this._vnode) {
		this._force = true;
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	}
};
/**
 * Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
 * Virtual DOM is generally constructed via [JSX](https://jasonformat.com/wtf-is-jsx).
 * @param {object} props Props (eg: JSX attributes) received from parent
 * element/component
 * @param {object} state The component's current state
 * @param {object} context Context object, as returned by the nearest
 * ancestor's `getChildContext()`
 * @returns {ComponentChildren | void}
 */
BaseComponent.prototype.render = Fragment;
/**
 * @param {import('./internal').VNode} vnode
 * @param {number | null} [childIndex]
 */
function getDomSibling(vnode, childIndex) {
	if (childIndex == null) return vnode._parent ? getDomSibling(vnode._parent, vnode._index + 1) : null;
	let sibling;
	for (; childIndex < vnode._children.length; childIndex++) {
		sibling = vnode._children[childIndex];
		if (sibling != null && sibling._dom != null) return sibling._dom;
	}
	return typeof vnode.type == "function" ? getDomSibling(vnode) : null;
}
/**
 * Trigger in-place re-rendering of a component.
 * @param {import('./internal').Component} component The component to rerender
 */
function renderComponent(component) {
	if (component._parentDom && component._dirty) {
		let oldVNode = component._vnode,
			oldDom = oldVNode._dom,
			commitQueue = [],
			refQueue = [],
			newVNode = assign$1({}, oldVNode);
		newVNode._original = oldVNode._original + 1;
		if (options$1.vnode) options$1.vnode(newVNode);
		diff(
			component._parentDom,
			newVNode,
			oldVNode,
			component._globalContext,
			component._parentDom.namespaceURI,
			oldVNode._flags & 32 ? [oldDom] : null,
			commitQueue,
			oldDom == null ? getDomSibling(oldVNode) : oldDom,
			!!(oldVNode._flags & 32),
			refQueue,
		);
		newVNode._original = oldVNode._original;
		newVNode._parent._children[newVNode._index] = newVNode;
		commitRoot(commitQueue, newVNode, refQueue);
		oldVNode._dom = oldVNode._parent = null;
		if (newVNode._dom != oldDom) updateParentDomPointers(newVNode);
	}
}
/**
 * @param {import('./internal').VNode} vnode
 */
function updateParentDomPointers(vnode) {
	if ((vnode = vnode._parent) != null && vnode._component != null) {
		vnode._dom = vnode._component.base = null;
		vnode._children.some((child) => {
			if (child != null && child._dom != null) return (vnode._dom = vnode._component.base = child._dom);
		});
		return updateParentDomPointers(vnode);
	}
}
/**
 * The render queue
 * @type {Array<import('./internal').Component>}
 */
var rerenderQueue = [];
var prevDebounce;
var defer = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
/**
 * Enqueue a rerender of a component
 * @param {import('./internal').Component} c The component to rerender
 */
function enqueueRender(c) {
	if (
		(!c._dirty && (c._dirty = true) && rerenderQueue.push(c) && !process$1._rerenderCount++) ||
		prevDebounce != options$1.debounceRendering
	) {
		prevDebounce = options$1.debounceRendering;
		(prevDebounce || defer)(process$1);
	}
}
/**
 * @param {import('./internal').Component} a
 * @param {import('./internal').Component} b
 */
var depthSort = (a, b) => a._vnode._depth - b._vnode._depth;
/** Flush the render queue by rerendering all queued components */
function process$1() {
	try {
		let c,
			l = 1;
		while (rerenderQueue.length) {
			if (rerenderQueue.length > l) rerenderQueue.sort(depthSort);
			c = rerenderQueue.shift();
			l = rerenderQueue.length;
			renderComponent(c);
		}
	} finally {
		rerenderQueue.length = process$1._rerenderCount = 0;
	}
}
process$1._rerenderCount = 0;
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/diff/children.js
/**
 * @typedef {import('../internal').ComponentChildren} ComponentChildren
 * @typedef {import('../internal').Component} Component
 * @typedef {import('../internal').PreactElement} PreactElement
 * @typedef {import('../internal').VNode} VNode
 */
/**
 * Diff the children of a virtual node
 * @param {PreactElement} parentDom The DOM element whose children are being
 * diffed
 * @param {ComponentChildren[]} renderResult
 * @param {VNode} newParentVNode The new virtual node whose children should be
 * diff'ed against oldParentVNode
 * @param {VNode} oldParentVNode The old virtual node whose children should be
 * diff'ed against newParentVNode
 * @param {object} globalContext The current context object - modified by
 * getChildContext
 * @param {string} namespace Current namespace of the DOM node (HTML, SVG, or MathML)
 * @param {Array<PreactElement>} excessDomChildren
 * @param {Array<Component>} commitQueue List of components which have callbacks
 * to invoke in commitRoot
 * @param {PreactElement} oldDom The current attached DOM element any new dom
 * elements should be placed around. Likely `null` on first render (except when
 * hydrating). Can be a sibling DOM element when diffing Fragments that have
 * siblings. In most cases, it starts out as `oldChildren[0]._dom`.
 * @param {boolean} isHydrating Whether or not we are in hydration
 * @param {any[]} refQueue an array of elements needed to invoke refs
 */
function diffChildren(
	parentDom,
	renderResult,
	newParentVNode,
	oldParentVNode,
	globalContext,
	namespace,
	excessDomChildren,
	commitQueue,
	oldDom,
	isHydrating,
	refQueue,
) {
	let i, oldVNode, childVNode, newDom, firstChildDom;
	/** @type {VNode[]} */
	let oldChildren = (oldParentVNode && oldParentVNode._children) || EMPTY_ARR;
	let newChildrenLength = renderResult.length;
	oldDom = constructNewChildrenArray(newParentVNode, renderResult, oldChildren, oldDom, newChildrenLength);
	for (i = 0; i < newChildrenLength; i++) {
		childVNode = newParentVNode._children[i];
		if (childVNode == null) continue;
		oldVNode = (childVNode._index != -1 && oldChildren[childVNode._index]) || EMPTY_OBJ;
		childVNode._index = i;
		let result = diff(
			parentDom,
			childVNode,
			oldVNode,
			globalContext,
			namespace,
			excessDomChildren,
			commitQueue,
			oldDom,
			isHydrating,
			refQueue,
		);
		newDom = childVNode._dom;
		if (childVNode.ref && oldVNode.ref != childVNode.ref) {
			if (oldVNode.ref) applyRef(oldVNode.ref, null, childVNode);
			refQueue.push(childVNode.ref, childVNode._component || newDom, childVNode);
		}
		if (firstChildDom == null && newDom != null) firstChildDom = newDom;
		if (childVNode._flags & 4) {
			oldDom = insert(childVNode, oldDom, parentDom);
			if (oldVNode._dom) oldVNode._dom = null;
		} else if (typeof childVNode.type == "function" && result !== void 0) oldDom = result;
		else if (newDom) oldDom = newDom.nextSibling;
		childVNode._flags &= -7;
	}
	newParentVNode._dom = firstChildDom;
	return oldDom;
}
/**
 * @param {VNode} newParentVNode
 * @param {ComponentChildren[]} renderResult
 * @param {VNode[]} oldChildren
 */
function constructNewChildrenArray(newParentVNode, renderResult, oldChildren, oldDom, newChildrenLength) {
	/** @type {number} */
	let i;
	/** @type {VNode} */
	let childVNode;
	/** @type {VNode} */
	let oldVNode;
	let oldChildrenLength = oldChildren.length,
		remainingOldChildren = oldChildrenLength;
	let skew = 0;
	newParentVNode._children = new Array(newChildrenLength);
	for (i = 0; i < newChildrenLength; i++) {
		childVNode = renderResult[i];
		if (childVNode == null || typeof childVNode == "boolean" || typeof childVNode == "function") {
			newParentVNode._children[i] = null;
			continue;
		} else if (
			typeof childVNode == "string" ||
			typeof childVNode == "number" ||
			typeof childVNode == "bigint" ||
			childVNode.constructor == String
		)
			childVNode = newParentVNode._children[i] = createVNode$1(null, childVNode, null, null, null);
		else if (isArray$1(childVNode))
			childVNode = newParentVNode._children[i] = createVNode$1(Fragment, { children: childVNode }, null, null, null);
		else if (childVNode.constructor === void 0 && childVNode._depth > 0)
			childVNode = newParentVNode._children[i] = createVNode$1(
				childVNode.type,
				childVNode.props,
				childVNode.key,
				childVNode.ref ? childVNode.ref : null,
				childVNode._original,
			);
		else newParentVNode._children[i] = childVNode;
		const skewedIndex = i + skew;
		childVNode._parent = newParentVNode;
		childVNode._depth = newParentVNode._depth + 1;
		const matchingIndex = (childVNode._index = findMatchingIndex(
			childVNode,
			oldChildren,
			skewedIndex,
			remainingOldChildren,
		));
		oldVNode = null;
		if (matchingIndex != -1) {
			oldVNode = oldChildren[matchingIndex];
			remainingOldChildren--;
			if (oldVNode) oldVNode._flags |= 2;
		}
		if (oldVNode == null || oldVNode._original == null) {
			if (matchingIndex == -1) {
				if (newChildrenLength > oldChildrenLength) skew--;
				else if (newChildrenLength < oldChildrenLength) skew++;
			}
			if (typeof childVNode.type != "function") childVNode._flags |= 4;
		} else if (matchingIndex != skewedIndex)
			if (matchingIndex == skewedIndex - 1) skew--;
			else if (matchingIndex == skewedIndex + 1) skew++;
			else {
				if (matchingIndex > skewedIndex) skew--;
				else skew++;
				childVNode._flags |= 4;
			}
	}
	if (remainingOldChildren)
		for (i = 0; i < oldChildrenLength; i++) {
			oldVNode = oldChildren[i];
			if (oldVNode != null && (oldVNode._flags & 2) == 0) {
				if (oldVNode._dom == oldDom) oldDom = getDomSibling(oldVNode);
				unmount(oldVNode, oldVNode);
			}
		}
	return oldDom;
}
/**
 * @param {VNode} parentVNode
 * @param {PreactElement} oldDom
 * @param {PreactElement} parentDom
 * @returns {PreactElement}
 */
function insert(parentVNode, oldDom, parentDom) {
	if (typeof parentVNode.type == "function") {
		let children = parentVNode._children;
		for (let i = 0; children && i < children.length; i++)
			if (children[i]) {
				children[i]._parent = parentVNode;
				oldDom = insert(children[i], oldDom, parentDom);
			}
		return oldDom;
	} else if (parentVNode._dom != oldDom) {
		if (oldDom && parentVNode.type && !oldDom.parentNode) oldDom = getDomSibling(parentVNode);
		oldDom = parentDom.insertBefore(parentVNode._dom, oldDom || null);
	}
	do oldDom = oldDom && oldDom.nextSibling;
	while (oldDom != null && oldDom.nodeType == 8);
	return oldDom;
}
/**
 * Flatten and loop through the children of a virtual node
 * @param {ComponentChildren} children The unflattened children of a virtual
 * node
 * @returns {VNode[]}
 */
function toChildArray(children, out) {
	out = out || [];
	if (children == null || typeof children == "boolean") {
	} else if (isArray$1(children))
		children.some((child) => {
			toChildArray(child, out);
		});
	else out.push(children);
	return out;
}
/**
 * @param {VNode} childVNode
 * @param {VNode[]} oldChildren
 * @param {number} skewedIndex
 * @param {number} remainingOldChildren
 * @returns {number}
 */
function findMatchingIndex(childVNode, oldChildren, skewedIndex, remainingOldChildren) {
	const key = childVNode.key;
	const type = childVNode.type;
	let oldVNode = oldChildren[skewedIndex];
	const matched = oldVNode != null && (oldVNode._flags & 2) == 0;
	let shouldSearch = remainingOldChildren > (matched ? 1 : 0);
	if ((oldVNode === null && key == null) || (matched && key == oldVNode.key && type == oldVNode.type))
		return skewedIndex;
	else if (shouldSearch) {
		let x = skewedIndex - 1;
		let y = skewedIndex + 1;
		while (x >= 0 || y < oldChildren.length) {
			const childIndex = x >= 0 ? x-- : y++;
			oldVNode = oldChildren[childIndex];
			if (oldVNode != null && (oldVNode._flags & 2) == 0 && key == oldVNode.key && type == oldVNode.type)
				return childIndex;
		}
	}
	return -1;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/diff/props.js
var _id = Math.random().toString(8);
var EVENT_DISPATCHED = "__d" + _id;
var EVENT_ATTACHED = "__a" + _id;
function setStyle(style, key, value) {
	if (key[0] == "-") style.setProperty(key, value == null ? "" : value);
	else if (value == null) style[key] = "";
	else if (typeof value != "number" || IS_NON_DIMENSIONAL.test(key)) style[key] = value;
	else style[key] = value + "px";
}
var CAPTURE_REGEX = /(PointerCapture)$|Capture$/i;
var eventClock = 0;
/**
 * Set a property value on a DOM node
 * @param {import('../internal').PreactElement} dom The DOM node to modify
 * @param {string} name The name of the property to set
 * @param {*} value The value to set the property to
 * @param {*} oldValue The old value the property had
 * @param {string} namespace Whether or not this DOM node is an SVG node or not
 */
function setProperty(dom, name, value, oldValue, namespace) {
	let useCapture;
	o: if (name == "style")
		if (typeof value == "string") dom.style.cssText = value;
		else {
			if (typeof oldValue == "string") dom.style.cssText = oldValue = "";
			if (oldValue) {
				for (name in oldValue) if (!(value && name in value)) setStyle(dom.style, name, "");
			}
			if (value) {
				for (name in value) if (!oldValue || value[name] != oldValue[name]) setStyle(dom.style, name, value[name]);
			}
		}
	else if (name[0] == "o" && name[1] == "n") {
		useCapture = name != (name = name.replace(CAPTURE_REGEX, "$1"));
		const lowerCaseName = name.toLowerCase();
		if (lowerCaseName in dom || name == "onFocusOut" || name == "onFocusIn") name = lowerCaseName.slice(2);
		else name = name.slice(2);
		if (!dom._listeners) dom._listeners = {};
		dom._listeners[name + useCapture] = value;
		if (value)
			if (!oldValue) {
				value[EVENT_ATTACHED] = eventClock;
				dom.addEventListener(name, useCapture ? eventProxyCapture : eventProxy, useCapture);
			} else value[EVENT_ATTACHED] = oldValue[EVENT_ATTACHED];
		else dom.removeEventListener(name, useCapture ? eventProxyCapture : eventProxy, useCapture);
	} else {
		if (namespace == "http://www.w3.org/2000/svg") name = name.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (
			name != "width" &&
			name != "height" &&
			name != "href" &&
			name != "list" &&
			name != "form" &&
			name != "tabIndex" &&
			name != "download" &&
			name != "rowSpan" &&
			name != "colSpan" &&
			name != "role" &&
			name != "popover" &&
			name in dom
		)
			try {
				dom[name] = value == null ? "" : value;
				break o;
			} catch (e) {}
		if (typeof value == "function") {
		} else if (value != null && (value !== false || name[4] == "-"))
			dom.setAttribute(name, name == "popover" && value == true ? "" : value);
		else dom.removeAttribute(name);
	}
}
/**
 * Create an event proxy function.
 * @param {boolean} useCapture Is the event handler for the capture phase.
 * @private
 */
function createEventProxy(useCapture) {
	/**
	 * Proxy an event to hooked event handlers
	 * @param {import('../internal').PreactEvent} e The event object from the browser
	 * @private
	 */
	return function (e) {
		if (this._listeners) {
			const eventHandler = this._listeners[e.type + useCapture];
			if (e[EVENT_DISPATCHED] == null) e[EVENT_DISPATCHED] = eventClock++;
			else if (e[EVENT_DISPATCHED] < eventHandler[EVENT_ATTACHED]) return;
			return eventHandler(options$1.event ? options$1.event(e) : e);
		}
	};
}
var eventProxy = createEventProxy(false);
var eventProxyCapture = createEventProxy(true);
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/diff/index.js
/**
 * @typedef {import('../internal').ComponentChildren} ComponentChildren
 * @typedef {import('../internal').Component} Component
 * @typedef {import('../internal').PreactElement} PreactElement
 * @typedef {import('../internal').VNode} VNode
 */
/**
 * @template {any} T
 * @typedef {import('../internal').Ref<T>} Ref<T>
 */
/**
 * Diff two virtual nodes and apply proper changes to the DOM
 * @param {PreactElement} parentDom The parent of the DOM element
 * @param {VNode} newVNode The new virtual node
 * @param {VNode} oldVNode The old virtual node
 * @param {object} globalContext The current context object. Modified by
 * getChildContext
 * @param {string} namespace Current namespace of the DOM node (HTML, SVG, or MathML)
 * @param {Array<PreactElement>} excessDomChildren
 * @param {Array<Component>} commitQueue List of components which have callbacks
 * to invoke in commitRoot
 * @param {PreactElement} oldDom The current attached DOM element any new dom
 * elements should be placed around. Likely `null` on first render (except when
 * hydrating). Can be a sibling DOM element when diffing Fragments that have
 * siblings. In most cases, it starts out as `oldChildren[0]._dom`.
 * @param {boolean} isHydrating Whether or not we are in hydration
 * @param {any[]} refQueue an array of elements needed to invoke refs
 */
function diff(
	parentDom,
	newVNode,
	oldVNode,
	globalContext,
	namespace,
	excessDomChildren,
	commitQueue,
	oldDom,
	isHydrating,
	refQueue,
) {
	/** @type {any} */
	let tmp,
		newType = newVNode.type;
	if (newVNode.constructor !== void 0) return null;
	if (oldVNode._flags & 128) {
		isHydrating = !!(oldVNode._flags & 32);
		oldDom = newVNode._dom = oldVNode._dom;
		excessDomChildren = [oldDom];
	}
	if ((tmp = options$1._diff)) tmp(newVNode);
	outer: if (typeof newType == "function") {
		let oldCommitQueueLength = commitQueue.length;
		try {
			let c, isNew, oldProps, oldState, snapshot, clearProcessingException;
			let newProps = newVNode.props;
			const isClassComponent = newType.prototype && newType.prototype.render;
			tmp = newType.contextType;
			let provider = tmp && globalContext[tmp._id];
			let componentContext = tmp ? (provider ? provider.props.value : tmp._defaultValue) : globalContext;
			if (oldVNode._component) {
				c = newVNode._component = oldVNode._component;
				clearProcessingException = c._processingException = c._pendingError;
			} else {
				if (isClassComponent) newVNode._component = c = new newType(newProps, componentContext);
				else {
					newVNode._component = c = new BaseComponent(newProps, componentContext);
					c.constructor = newType;
					c.render = doRender;
				}
				if (provider) provider.sub(c);
				if (!c.state) c.state = {};
				c._globalContext = globalContext;
				isNew = c._dirty = true;
				c._renderCallbacks = [];
				c._stateCallbacks = [];
			}
			if (isClassComponent && c._nextState == null) c._nextState = c.state;
			if (isClassComponent && newType.getDerivedStateFromProps != null) {
				if (c._nextState == c.state) c._nextState = assign$1({}, c._nextState);
				assign$1(c._nextState, newType.getDerivedStateFromProps(newProps, c._nextState));
			}
			oldProps = c.props;
			oldState = c.state;
			c._vnode = newVNode;
			if (isNew) {
				if (isClassComponent && newType.getDerivedStateFromProps == null && c.componentWillMount != null)
					c.componentWillMount();
				if (isClassComponent && c.componentDidMount != null) c._renderCallbacks.push(c.componentDidMount);
			} else {
				if (
					isClassComponent &&
					newType.getDerivedStateFromProps == null &&
					newProps !== oldProps &&
					c.componentWillReceiveProps != null
				)
					c.componentWillReceiveProps(newProps, componentContext);
				if (
					newVNode._original == oldVNode._original ||
					(!c._force &&
						c.shouldComponentUpdate != null &&
						c.shouldComponentUpdate(newProps, c._nextState, componentContext) === false)
				) {
					if (newVNode._original != oldVNode._original) {
						c.props = newProps;
						c.state = c._nextState;
						c._dirty = false;
					}
					newVNode._dom = oldVNode._dom;
					newVNode._children = oldVNode._children;
					newVNode._children.some((vnode) => {
						if (vnode) vnode._parent = newVNode;
					});
					EMPTY_ARR.push.apply(c._renderCallbacks, c._stateCallbacks);
					c._stateCallbacks = [];
					if (c._renderCallbacks.length) commitQueue.push(c);
					oldDom = getDomSibling(oldVNode);
					break outer;
				}
				if (c.componentWillUpdate != null) c.componentWillUpdate(newProps, c._nextState, componentContext);
				if (isClassComponent && c.componentDidUpdate != null)
					c._renderCallbacks.push(() => {
						c.componentDidUpdate(oldProps, oldState, snapshot);
					});
			}
			c.context = componentContext;
			c.props = newProps;
			c._parentDom = parentDom;
			c._force = false;
			let renderHook = options$1._render,
				count = 0;
			if (isClassComponent) {
				c.state = c._nextState;
				c._dirty = false;
				if (renderHook) renderHook(newVNode);
				tmp = c.render(c.props, c.state, c.context);
				EMPTY_ARR.push.apply(c._renderCallbacks, c._stateCallbacks);
				c._stateCallbacks = [];
			} else
				do {
					c._dirty = false;
					if (renderHook) renderHook(newVNode);
					tmp = c.render(c.props, c.state, c.context);
					c.state = c._nextState;
				} while (c._dirty && ++count < 25);
			c.state = c._nextState;
			if (c.getChildContext != null) globalContext = assign$1(assign$1({}, globalContext), c.getChildContext());
			if (isClassComponent && !isNew && c.getSnapshotBeforeUpdate != null)
				snapshot = c.getSnapshotBeforeUpdate(oldProps, oldState);
			let renderResult = tmp != null && tmp.type === Fragment && tmp.key == null ? cloneNode(tmp.props.children) : tmp;
			oldDom = diffChildren(
				parentDom,
				isArray$1(renderResult) ? renderResult : [renderResult],
				newVNode,
				oldVNode,
				globalContext,
				namespace,
				excessDomChildren,
				commitQueue,
				oldDom,
				isHydrating,
				refQueue,
			);
			c.base = newVNode._dom;
			newVNode._flags &= RESET_MODE;
			if (c._renderCallbacks.length) commitQueue.push(c);
			if (clearProcessingException) c._pendingError = c._processingException = null;
		} catch (e) {
			commitQueue.length = oldCommitQueueLength;
			newVNode._original = null;
			if (isHydrating || excessDomChildren != null) {
				if (e.then) {
					newVNode._flags |= isHydrating ? 160 : 128;
					while (oldDom && oldDom.nodeType == 8 && oldDom.nextSibling) oldDom = oldDom.nextSibling;
					if (excessDomChildren != null) excessDomChildren[excessDomChildren.indexOf(oldDom)] = null;
					newVNode._dom = oldDom;
				} else if (excessDomChildren != null)
					for (let i = excessDomChildren.length; i--; ) removeNode(excessDomChildren[i]);
			} else newVNode._dom = oldVNode._dom;
			if (newVNode._children == null) newVNode._children = oldVNode._children || [];
			if (!e.then) markAsForce(newVNode);
			options$1._catchError(e, newVNode, oldVNode);
		}
	} else if (excessDomChildren == null && newVNode._original == oldVNode._original) {
		newVNode._children = oldVNode._children;
		newVNode._dom = oldVNode._dom;
	} else
		oldDom = newVNode._dom = diffElementNodes(
			oldVNode._dom,
			newVNode,
			oldVNode,
			globalContext,
			namespace,
			excessDomChildren,
			commitQueue,
			isHydrating,
			refQueue,
		);
	if ((tmp = options$1.diffed)) tmp(newVNode);
	return newVNode._flags & 128 ? void 0 : oldDom;
}
function markAsForce(vnode) {
	if (vnode) {
		if (vnode._component) vnode._component._force = true;
		if (vnode._children) vnode._children.some(markAsForce);
	}
}
/**
 * @param {Array<Component>} commitQueue List of components
 * which have callbacks to invoke in commitRoot
 * @param {VNode} root
 */
function commitRoot(commitQueue, root, refQueue) {
	for (let i = 0; i < refQueue.length; i++) applyRef(refQueue[i], refQueue[++i], refQueue[++i]);
	if (options$1._commit) options$1._commit(root, commitQueue);
	commitQueue.some((c) => {
		try {
			commitQueue = c._renderCallbacks;
			c._renderCallbacks = [];
			commitQueue.some((cb) => {
				cb.call(c);
			});
		} catch (e) {
			options$1._catchError(e, c._vnode);
		}
	});
}
function cloneNode(node) {
	if (typeof node != "object" || node == null || node._depth > 0) return node;
	if (isArray$1(node)) return node.map(cloneNode);
	if (node.constructor !== void 0) return null;
	return assign$1({}, node);
}
/**
 * Diff two virtual nodes representing DOM element
 * @param {PreactElement} dom The DOM element representing the virtual nodes
 * being diffed
 * @param {VNode} newVNode The new virtual node
 * @param {VNode} oldVNode The old virtual node
 * @param {object} globalContext The current context object
 * @param {string} namespace Current namespace of the DOM node (HTML, SVG, or MathML)
 * @param {Array<PreactElement>} excessDomChildren
 * @param {Array<Component>} commitQueue List of components which have callbacks
 * to invoke in commitRoot
 * @param {boolean} isHydrating Whether or not we are in hydration
 * @param {any[]} refQueue an array of elements needed to invoke refs
 * @returns {PreactElement}
 */
function diffElementNodes(
	dom,
	newVNode,
	oldVNode,
	globalContext,
	namespace,
	excessDomChildren,
	commitQueue,
	isHydrating,
	refQueue,
) {
	let oldProps = oldVNode.props || EMPTY_OBJ;
	let newProps = newVNode.props;
	let nodeType = newVNode.type;
	/** @type {any} */
	let i;
	/** @type {{ __html?: string }} */
	let newHtml;
	/** @type {{ __html?: string }} */
	let oldHtml;
	/** @type {ComponentChildren} */
	let newChildren;
	let value;
	let inputValue;
	let checked;
	if (nodeType == "svg") namespace = SVG_NAMESPACE;
	else if (nodeType == "math") namespace = MATH_NAMESPACE;
	else if (!namespace) namespace = XHTML_NAMESPACE;
	if (excessDomChildren != null)
		for (i = 0; i < excessDomChildren.length; i++) {
			value = excessDomChildren[i];
			if (
				value &&
				"setAttribute" in value == !!nodeType &&
				(nodeType ? value.localName == nodeType : value.nodeType == 3)
			) {
				dom = value;
				excessDomChildren[i] = null;
				break;
			}
		}
	if (dom == null) {
		if (nodeType == null) return document.createTextNode(newProps);
		dom = document.createElementNS(namespace, nodeType, newProps.is && newProps);
		if (isHydrating) {
			if (options$1._hydrationMismatch) options$1._hydrationMismatch(newVNode, excessDomChildren);
			isHydrating = false;
		}
		excessDomChildren = null;
	}
	if (nodeType == null) {
		if (oldProps !== newProps && (!isHydrating || dom.data != newProps)) dom.data = newProps;
	} else {
		excessDomChildren =
			nodeType == "textarea" && newProps.defaultValue != null ? null : excessDomChildren && slice.call(dom.childNodes);
		if (!isHydrating && excessDomChildren != null) {
			oldProps = {};
			for (i = 0; i < dom.attributes.length; i++) {
				value = dom.attributes[i];
				oldProps[value.name] = value.value;
			}
		}
		for (i in oldProps) {
			value = oldProps[i];
			if (i == "dangerouslySetInnerHTML") oldHtml = value;
			else if (
				i != "children" &&
				!(i in newProps) &&
				!(i == "value" && "defaultValue" in newProps) &&
				!(i == "checked" && "defaultChecked" in newProps)
			)
				setProperty(dom, i, null, value, namespace);
		}
		for (i in newProps) {
			value = newProps[i];
			if (i == "children") newChildren = value;
			else if (i == "dangerouslySetInnerHTML") newHtml = value;
			else if (i == "value") inputValue = value;
			else if (i == "checked") checked = value;
			else if ((!isHydrating || typeof value == "function") && oldProps[i] !== value)
				setProperty(dom, i, value, oldProps[i], namespace);
		}
		if (newHtml) {
			if (!isHydrating && (!oldHtml || (newHtml.__html != oldHtml.__html && newHtml.__html != dom.innerHTML)))
				dom.innerHTML = newHtml.__html;
			newVNode._children = [];
		} else {
			if (oldHtml) dom.innerHTML = "";
			diffChildren(
				newVNode.type == "template" ? dom.content : dom,
				isArray$1(newChildren) ? newChildren : [newChildren],
				newVNode,
				oldVNode,
				globalContext,
				nodeType == "foreignObject" ? XHTML_NAMESPACE : namespace,
				excessDomChildren,
				commitQueue,
				excessDomChildren ? excessDomChildren[0] : oldVNode._children && getDomSibling(oldVNode, 0),
				isHydrating,
				refQueue,
			);
			if (excessDomChildren != null) for (i = excessDomChildren.length; i--; ) removeNode(excessDomChildren[i]);
		}
		if (!isHydrating || nodeType == "textarea") {
			i = "value";
			if (nodeType == "progress" && inputValue == null) dom.removeAttribute("value");
			else if (
				inputValue != void 0 &&
				(inputValue !== dom[i] ||
					(nodeType == "progress" && !inputValue) ||
					(nodeType == "option" && inputValue != oldProps[i]))
			)
				setProperty(dom, i, inputValue, oldProps[i], namespace);
			i = "checked";
			if (checked != void 0 && checked != dom[i]) setProperty(dom, i, checked, oldProps[i], namespace);
		}
	}
	return dom;
}
/**
 * Invoke or update a ref, depending on whether it is a function or object ref.
 * @param {Ref<any> & { _unmount?: unknown }} ref
 * @param {any} value
 * @param {VNode} vnode
 */
function applyRef(ref, value, vnode) {
	try {
		if (typeof ref == "function") {
			let hasRefUnmount = typeof ref._unmount == "function";
			if (hasRefUnmount) ref._unmount();
			if (!hasRefUnmount || value != null) ref._unmount = ref(value);
		} else ref.current = value;
	} catch (e) {
		options$1._catchError(e, vnode);
	}
}
/**
 * Unmount a virtual node from the tree and apply DOM changes
 * @param {VNode} vnode The virtual node to unmount
 * @param {VNode} parentVNode The parent of the VNode that initiated the unmount
 * @param {boolean} [skipRemove] Flag that indicates that a parent node of the
 * current element is already detached from the DOM.
 */
function unmount(vnode, parentVNode, skipRemove) {
	let r;
	if (options$1.unmount) options$1.unmount(vnode);
	if ((r = vnode.ref)) {
		if (!r.current || r.current == vnode._dom) applyRef(r, null, parentVNode);
	}
	if ((r = vnode._component) != null) {
		if (r.componentWillUnmount)
			try {
				r.componentWillUnmount();
			} catch (e) {
				options$1._catchError(e, parentVNode);
			}
		r.base = r._parentDom = r._globalContext = null;
	}
	if ((r = vnode._children)) {
		for (let i = 0; i < r.length; i++)
			if (r[i]) unmount(r[i], parentVNode, skipRemove || typeof vnode.type != "function");
	}
	if (!skipRemove) removeNode(vnode._dom);
	vnode._component = vnode._parent = vnode._dom = void 0;
}
/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/src/render.js
/**
 * Render a Preact virtual node into a DOM element
 * @param {import('./internal').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to render into
 * @param {import('./internal').PreactElement | object} [replaceNode] Optional: Attempt to re-use an
 * existing DOM tree rooted at `replaceNode`
 */
function render$1(vnode, parentDom, replaceNode) {
	if (parentDom == document) parentDom = document.documentElement;
	if (options$1._root) options$1._root(vnode, parentDom);
	let isHydrating = typeof replaceNode == "function";
	let oldVNode = isHydrating ? null : (replaceNode && replaceNode._children) || parentDom._children;
	vnode = ((!isHydrating && replaceNode) || parentDom)._children = createElement(Fragment, null, [vnode]);
	let commitQueue = [],
		refQueue = [];
	diff(
		parentDom,
		vnode,
		oldVNode || EMPTY_OBJ,
		EMPTY_OBJ,
		parentDom.namespaceURI,
		!isHydrating && replaceNode
			? [replaceNode]
			: oldVNode
				? null
				: parentDom.firstChild
					? slice.call(parentDom.childNodes)
					: null,
		commitQueue,
		!isHydrating && replaceNode ? replaceNode : oldVNode ? oldVNode._dom : parentDom.firstChild,
		isHydrating,
		refQueue,
	);
	commitRoot(commitQueue, vnode, refQueue);
	vnode.props.children = null;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/hooks/src/index.js
/** @type {number} */
var currentIndex;
/** @type {import('./internal').Component} */
var currentComponent$1;
/** @type {import('./internal').Component} */
var previousComponent;
/** @type {number} */
var currentHook = 0;
/** @type {Array<import('./internal').Component>} */
var afterPaintEffects = [];
var options = options$1;
var oldBeforeDiff = options._diff;
var oldBeforeRender$1 = options._render;
var oldAfterDiff = options.diffed;
var oldCommit = options._commit;
var oldBeforeUnmount = options.unmount;
var oldRoot = options._root;
var RAF_TIMEOUT = 35;
var prevRaf;
/** @type {(vnode: import('./internal').VNode) => void} */
options._diff = (vnode) => {
	currentComponent$1 = null;
	if (oldBeforeDiff) oldBeforeDiff(vnode);
};
options._root = (vnode, parentDom) => {
	if (vnode && parentDom._children && parentDom._children._mask) vnode._mask = parentDom._children._mask;
	if (oldRoot) oldRoot(vnode, parentDom);
};
/** @type {(vnode: import('./internal').VNode) => void} */
options._render = (vnode) => {
	if (oldBeforeRender$1) oldBeforeRender$1(vnode);
	currentComponent$1 = vnode._component;
	currentIndex = 0;
	const hooks = currentComponent$1.__hooks;
	if (hooks)
		if (previousComponent === currentComponent$1) {
			hooks._pendingEffects = [];
			currentComponent$1._renderCallbacks = [];
			hooks._list.some((hookItem) => {
				if (hookItem._nextValue) hookItem._value = hookItem._nextValue;
				hookItem._pendingArgs = hookItem._nextValue = void 0;
			});
		} else {
			hooks._pendingEffects.some(invokeCleanup);
			hooks._pendingEffects.some(invokeEffect);
			hooks._pendingEffects = [];
			currentIndex = 0;
		}
	previousComponent = currentComponent$1;
};
/** @type {(vnode: import('./internal').VNode) => void} */
options.diffed = (vnode) => {
	if (oldAfterDiff) oldAfterDiff(vnode);
	const c = vnode._component;
	if (c && c.__hooks) {
		if (c.__hooks._pendingEffects.length) afterPaint(afterPaintEffects.push(c));
		c.__hooks._list.some((hookItem) => {
			if (hookItem._pendingArgs) {
				hookItem._args = hookItem._pendingArgs;
				hookItem._pendingArgs = void 0;
			}
		});
	}
	previousComponent = currentComponent$1 = null;
};
/** @type {(vnode: import('./internal').VNode, commitQueue: any) => void} */
options._commit = (vnode, commitQueue) => {
	commitQueue.some((component) => {
		try {
			component._renderCallbacks.some(invokeCleanup);
			component._renderCallbacks = component._renderCallbacks.filter((cb) => (cb._value ? invokeEffect(cb) : true));
		} catch (e) {
			commitQueue.some((c) => {
				if (c._renderCallbacks) c._renderCallbacks = [];
			});
			commitQueue = [];
			options._catchError(e, component._vnode);
		}
	});
	if (oldCommit) oldCommit(vnode, commitQueue);
};
/** @type {(vnode: import('./internal').VNode) => void} */
options.unmount = (vnode) => {
	if (oldBeforeUnmount) oldBeforeUnmount(vnode);
	const c = vnode._component;
	if (c && c.__hooks) {
		let hasErrored;
		c.__hooks._list.some((s) => {
			try {
				invokeCleanup(s);
			} catch (e) {
				hasErrored = e;
			}
		});
		c.__hooks = void 0;
		if (hasErrored) options._catchError(hasErrored, c._vnode);
	}
};
/**
 * Get a hook's state from the currentComponent
 * @param {number} index The index of the hook to get
 * @param {number} type The index of the hook to get
 * @returns {any}
 */
function getHookState(index, type) {
	if (options._hook) options._hook(currentComponent$1, index, currentHook || type);
	currentHook = 0;
	const hooks =
		currentComponent$1.__hooks ||
		(currentComponent$1.__hooks = {
			_list: [],
			_pendingEffects: [],
		});
	if (index >= hooks._list.length) hooks._list.push({});
	return hooks._list[index];
}
/**
 * @template {unknown} S
 * @param {import('./index').Dispatch<import('./index').StateUpdater<S>>} [initialState]
 * @returns {[S, (state: S) => void]}
 */
function useState(initialState) {
	currentHook = 1;
	return useReducer(invokeOrReturn, initialState);
}
/**
 * @template {unknown} S
 * @template {unknown} A
 * @param {import('./index').Reducer<S, A>} reducer
 * @param {import('./index').Dispatch<import('./index').StateUpdater<S>>} initialState
 * @param {(initialState: any) => void} [init]
 * @returns {[ S, (state: S) => void ]}
 */
function useReducer(reducer, initialState, init) {
	/** @type {import('./internal').ReducerHookState} */
	const hookState = getHookState(currentIndex++, 2);
	hookState._reducer = reducer;
	if (!hookState._component) {
		hookState._value = [
			!init ? invokeOrReturn(void 0, initialState) : init(initialState),
			(action) => {
				const currentValue = hookState._nextValue ? hookState._nextValue[0] : hookState._value[0];
				const nextValue = hookState._reducer(currentValue, action);
				if (currentValue !== nextValue) {
					hookState._nextValue = [nextValue, hookState._value[1]];
					hookState._component.setState({});
				}
			},
		];
		hookState._component = currentComponent$1;
		if (!currentComponent$1._hasScuFromHooks) {
			currentComponent$1._hasScuFromHooks = true;
			let prevScu = currentComponent$1.shouldComponentUpdate;
			const prevCWU = currentComponent$1.componentWillUpdate;
			currentComponent$1.componentWillUpdate = function (p, s, c) {
				if (this._force) {
					let tmp = prevScu;
					prevScu = void 0;
					updateHookState(p, s, c);
					prevScu = tmp;
				}
				if (prevCWU) prevCWU.call(this, p, s, c);
			};
			/**
			 *
			 * @type {import('./internal').Component["shouldComponentUpdate"]}
			 */
			function updateHookState(p, s, c) {
				if (!hookState._component.__hooks) return true;
				let updatedHook = false;
				let shouldUpdate = hookState._component.props !== p;
				hookState._component.__hooks._list.some((hookItem) => {
					if (hookItem._nextValue) {
						updatedHook = true;
						const currentValue = hookItem._value[0];
						hookItem._value = hookItem._nextValue;
						hookItem._nextValue = void 0;
						if (currentValue !== hookItem._value[0]) shouldUpdate = true;
					}
				});
				if (prevScu) {
					const result = prevScu.call(this, p, s, c);
					return updatedHook ? result || shouldUpdate : result;
				}
				return !updatedHook || shouldUpdate;
			}
			currentComponent$1.shouldComponentUpdate = updateHookState;
		}
	}
	return hookState._nextValue || hookState._value;
}
/**
 * @param {import('./internal').Effect} callback
 * @param {unknown[]} args
 * @returns {void}
 */
function useEffect(callback, args) {
	/** @type {import('./internal').EffectHookState} */
	const state = getHookState(currentIndex++, 3);
	if (!options._skipEffects && argsChanged(state._args, args)) {
		state._value = callback;
		state._pendingArgs = args;
		currentComponent$1.__hooks._pendingEffects.push(state);
	}
}
/** @type {(initialValue: unknown) => unknown} */
function useRef(initialValue) {
	currentHook = 5;
	return useMemo(() => ({ current: initialValue }), []);
}
/**
 * @template {unknown} T
 * @param {() => T} factory
 * @param {unknown[]} args
 * @returns {T}
 */
function useMemo(factory, args) {
	/** @type {import('./internal').MemoHookState<T>} */
	const state = getHookState(currentIndex++, 7);
	if (argsChanged(state._args, args)) {
		state._value = factory();
		state._args = args;
		state._factory = factory;
	}
	return state._value;
}
/**
 * @param {() => void} callback
 * @param {unknown[]} args
 * @returns {() => void}
 */
function useCallback(callback, args) {
	currentHook = 8;
	return useMemo(() => callback, args);
}
/** @type {() => string} */
function useId() {
	/** @type {import('./internal').IdHookState} */
	const state = getHookState(currentIndex++, 11);
	if (!state._value) {
		/** @type {import('./internal').VNode} */
		let root = currentComponent$1._vnode;
		while (root !== null && !root._mask && root._parent !== null) root = root._parent;
		let mask = root._mask || (root._mask = [0, 0]);
		state._value = "P" + mask[0] + "-" + mask[1]++;
	}
	return state._value;
}
/**
 * After paint effects consumer.
 */
function flushAfterPaintEffects() {
	let component;
	while ((component = afterPaintEffects.shift())) {
		const hooks = component.__hooks;
		if (!component._parentDom || !hooks) continue;
		try {
			hooks._pendingEffects.some(invokeCleanup);
			hooks._pendingEffects.some(invokeEffect);
			hooks._pendingEffects = [];
		} catch (e) {
			hooks._pendingEffects = [];
			options._catchError(e, component._vnode);
		}
	}
}
var HAS_RAF = typeof requestAnimationFrame == "function";
/**
 * Schedule a callback to be invoked after the browser has a chance to paint a new frame.
 * Do this by combining requestAnimationFrame (rAF) + setTimeout to invoke a callback after
 * the next browser frame.
 *
 * Also, schedule a timeout in parallel to the the rAF to ensure the callback is invoked
 * even if RAF doesn't fire (for example if the browser tab is not visible)
 *
 * @param {() => void} callback
 */
function afterNextFrame(callback) {
	const done = () => {
		clearTimeout(timeout);
		if (HAS_RAF) cancelAnimationFrame(raf);
		setTimeout(callback);
	};
	const timeout = setTimeout(done, RAF_TIMEOUT);
	let raf;
	if (HAS_RAF) raf = requestAnimationFrame(done);
}
/**
 * Schedule afterPaintEffects flush after the browser paints
 * @param {number} newQueueLength
 * @returns {void}
 */
function afterPaint(newQueueLength) {
	if (newQueueLength === 1 || prevRaf !== options.requestAnimationFrame) {
		prevRaf = options.requestAnimationFrame;
		(prevRaf || afterNextFrame)(flushAfterPaintEffects);
	}
}
/**
 * @param {import('./internal').HookState} hook
 * @returns {void}
 */
function invokeCleanup(hook) {
	const comp = currentComponent$1;
	let cleanup = hook._cleanup;
	if (typeof cleanup == "function") {
		hook._cleanup = void 0;
		cleanup();
	}
	currentComponent$1 = comp;
}
/**
 * Invoke a Hook's effect
 * @param {import('./internal').EffectHookState} hook
 * @returns {void}
 */
function invokeEffect(hook) {
	const comp = currentComponent$1;
	hook._cleanup = hook._value();
	currentComponent$1 = comp;
}
/**
 * @param {unknown[]} oldArgs
 * @param {unknown[]} newArgs
 * @returns {boolean}
 */
function argsChanged(oldArgs, newArgs) {
	return !oldArgs || oldArgs.length !== newArgs.length || newArgs.some((arg, index) => arg !== oldArgs[index]);
}
/**
 * @template Arg
 * @param {Arg} arg
 * @param {(arg: Arg) => any} f
 * @returns {any}
 */
function invokeOrReturn(arg, f) {
	return typeof f == "function" ? f(arg) : f;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/util.js
/**
 * Assign properties from `props` to `obj`
 * @template O, P The obj and props types
 * @param {O} obj The object to copy properties to
 * @param {P} props The object to copy properties from
 * @returns {O & P}
 */
function assign(obj, props) {
	for (let i in props) obj[i] = props[i];
	return obj;
}
/**
 * Check if two objects have a different shape
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
function shallowDiffers(a, b) {
	for (let i in a) if (i !== "__source" && !(i in b)) return true;
	for (let i in b) if (i !== "__source" && a[i] !== b[i]) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/PureComponent.js
/**
 * Component class with a predefined `shouldComponentUpdate` implementation
 */
function PureComponent(p, c) {
	this.props = p;
	this.context = c;
}
PureComponent.prototype = new BaseComponent();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/forwardRef.js
var oldDiffHook = options$1._diff;
options$1._diff = (vnode) => {
	if (vnode.type && vnode.type._forwarded && vnode.ref) {
		vnode.props.ref = vnode.ref;
		vnode.ref = null;
	}
	if (oldDiffHook) oldDiffHook(vnode);
};
typeof Symbol != "undefined" && Symbol.for;
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/suspense.js
var oldCatchError = options$1._catchError;
options$1._catchError = function (error, newVNode, oldVNode, errorInfo) {
	if (error.then) {
		/** @type {import('./internal').Component} */
		let component;
		let vnode = newVNode;
		for (; (vnode = vnode._parent); )
			if ((component = vnode._component) && component._childDidSuspend) {
				if (newVNode._dom == null) {
					newVNode._dom = oldVNode._dom;
					newVNode._children = oldVNode._children || [];
				}
				return component._childDidSuspend(error, newVNode);
			}
	}
	oldCatchError(error, newVNode, oldVNode, errorInfo);
};
var oldUnmount = options$1.unmount;
options$1.unmount = function (vnode) {
	/** @type {import('./internal').Component} */
	const component = vnode._component;
	if (component) component._unmounted = true;
	if (component && component._onResolve) component._onResolve();
	if (component && vnode._flags & 32) vnode.type = null;
	if (oldUnmount) oldUnmount(vnode);
};
function detachedClone(vnode, detachedParent, parentDom) {
	if (vnode) {
		if (vnode._component && vnode._component.__hooks) {
			vnode._component.__hooks._list.forEach((effect) => {
				if (typeof effect._cleanup == "function") effect._cleanup();
			});
			vnode._component.__hooks = null;
		}
		vnode = assign({}, vnode);
		if (vnode._component != null) {
			if (vnode._component._parentDom === parentDom) vnode._component._parentDom = detachedParent;
			vnode._component._force = true;
			vnode._component = null;
		}
		vnode._children =
			vnode._children && vnode._children.map((child) => detachedClone(child, detachedParent, parentDom));
	}
	return vnode;
}
function removeOriginal(vnode, detachedParent, originalParent) {
	if (vnode && originalParent) {
		vnode._original = null;
		vnode._children =
			vnode._children && vnode._children.map((child) => removeOriginal(child, detachedParent, originalParent));
		if (vnode._component) {
			if (vnode._component._parentDom === detachedParent) {
				if (vnode._dom) originalParent.appendChild(vnode._dom);
				vnode._component._force = true;
				vnode._component._parentDom = originalParent;
			}
		}
	}
	return vnode;
}
function Suspense() {
	this._pendingSuspensionCount = 0;
	this._suspenders = null;
	this._detachOnNextRender = null;
}
Suspense.prototype = new BaseComponent();
/**
 * @this {import('./internal').SuspenseComponent}
 * @param {Promise} promise The thrown promise
 * @param {import('./internal').VNode<any, any>} suspendingVNode The suspending component
 */
Suspense.prototype._childDidSuspend = function (promise, suspendingVNode) {
	const suspendingComponent = suspendingVNode._component;
	/** @type {import('./internal').SuspenseComponent} */
	const c = this;
	if (c._suspenders == null) c._suspenders = [];
	c._suspenders.push(suspendingComponent);
	const resolve = suspended(c._vnode);
	let resolved = false;
	const onResolved = () => {
		if (resolved || c._unmounted) return;
		resolved = true;
		suspendingComponent._onResolve = null;
		if (resolve) resolve(onSuspensionComplete);
		else onSuspensionComplete();
	};
	suspendingComponent._onResolve = onResolved;
	const originalParentDom = suspendingComponent._parentDom;
	suspendingComponent._parentDom = null;
	const onSuspensionComplete = () => {
		if (!--c._pendingSuspensionCount) {
			if (c.state._suspended) {
				const suspendedVNode = c.state._suspended;
				c._vnode._children[0] = removeOriginal(
					suspendedVNode,
					suspendedVNode._component._parentDom,
					suspendedVNode._component._originalParentDom,
				);
			}
			c.setState({ _suspended: (c._detachOnNextRender = null) });
			let suspended;
			while ((suspended = c._suspenders.pop())) {
				suspended._parentDom = originalParentDom;
				suspended.forceUpdate();
			}
		}
	};
	/**
	 * We do not set `suspended: true` during hydration because we want the actual markup
	 * to remain on screen and hydrate it when the suspense actually gets resolved.
	 * While in non-hydration cases the usual fallback -> component flow would occour.
	 */
	if (!c._pendingSuspensionCount++ && !(suspendingVNode._flags & 32))
		c.setState({ _suspended: (c._detachOnNextRender = c._vnode._children[0]) });
	promise.then(onResolved, onResolved);
};
Suspense.prototype.componentWillUnmount = function () {
	this._suspenders = [];
};
/**
 * @this {import('./internal').SuspenseComponent}
 * @param {import('./internal').SuspenseComponent["props"]} props
 * @param {import('./internal').SuspenseState} state
 */
Suspense.prototype.render = function (props, state) {
	if (this._detachOnNextRender) {
		if (this._vnode._children) {
			const detachedParent = document.createElement("div");
			const detachedComponent = this._vnode._children[0]._component;
			this._vnode._children[0] = detachedClone(
				this._detachOnNextRender,
				detachedParent,
				(detachedComponent._originalParentDom = detachedComponent._parentDom),
			);
		}
		this._detachOnNextRender = null;
	}
	/** @type {import('./internal').VNode} */
	const fallback = state._suspended && createElement(Fragment, null, props.fallback);
	if (fallback) fallback._flags &= -33;
	return [createElement(Fragment, null, state._suspended ? null : props.children), fallback];
};
/**
 * Checks and calls the parent component's _suspended method, passing in the
 * suspended vnode. This is a way for a parent (e.g. SuspenseList) to get notified
 * that one of its children/descendants suspended.
 *
 * The parent MAY return a callback. The callback will get called when the
 * suspension resolves, notifying the parent of the fact.
 * Moreover, the callback gets function `unsuspend` as a parameter. The resolved
 * child descendant will not actually get unsuspended until `unsuspend` gets called.
 * This is a way for the parent to delay unsuspending.
 *
 * If the parent does not return a callback then the resolved vnode
 * gets unsuspended immediately when it resolves.
 *
 * @param {import('./internal').VNode} vnode
 * @returns {((unsuspend: () => void) => void)?}
 */
function suspended(vnode) {
	let component = vnode._parent && vnode._parent._component;
	return component && component._suspended && component._suspended(vnode);
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/suspense-list.js
var SUSPENDED_COUNT = 0;
var RESOLVED_COUNT = 1;
var NEXT_NODE = 2;
function SuspenseList() {
	this._next = null;
	this._map = null;
}
var resolve = (list, child, node) => {
	if (++node[RESOLVED_COUNT] === node[SUSPENDED_COUNT]) list._map.delete(child);
	if (!list.props.revealOrder || (list.props.revealOrder[0] === "t" && list._map.size)) return;
	node = list._next;
	while (node) {
		while (node.length > 3) node.pop()();
		if (node[RESOLVED_COUNT] < node[SUSPENDED_COUNT]) break;
		list._next = node = node[NEXT_NODE];
	}
};
SuspenseList.prototype = new BaseComponent();
SuspenseList.prototype._suspended = function (child) {
	const list = this;
	const delegated = suspended(list._vnode);
	let node = list._map.get(child);
	node[SUSPENDED_COUNT]++;
	return (unsuspend) => {
		const wrappedUnsuspend = () => {
			if (!list.props.revealOrder) unsuspend();
			else {
				node.push(unsuspend);
				resolve(list, child, node);
			}
		};
		if (delegated) delegated(wrappedUnsuspend);
		else wrappedUnsuspend();
	};
};
SuspenseList.prototype.render = function (props) {
	this._next = null;
	this._map = /* @__PURE__ */ new Map();
	const children = toChildArray(props.children);
	if (props.revealOrder && props.revealOrder[0] === "b") children.reverse();
	for (let i = children.length; i--; ) this._map.set(children[i], (this._next = [1, 0, this._next]));
	return props.children;
};
SuspenseList.prototype.componentDidUpdate = SuspenseList.prototype.componentDidMount = function () {
	this._map.forEach((node, child) => {
		resolve(this, child, node);
	});
};
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/render.js
var REACT_ELEMENT_TYPE = (typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element")) || 60103;
var CAMEL_PROPS =
	/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var ON_ANI = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var CAMEL_REPLACE = /[A-Z0-9]/g;
var IS_DOM = typeof document !== "undefined";
var onChangeInputType = (type) =>
	(typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(type);
BaseComponent.prototype.isReactComponent = true;
["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach((key) => {
	Object.defineProperty(BaseComponent.prototype, key, {
		configurable: true,
		get() {
			return this["UNSAFE_" + key];
		},
		set(v) {
			Object.defineProperty(this, key, {
				configurable: true,
				writable: true,
				value: v,
			});
		},
	});
});
/**
 * Proxy render() since React returns a Component reference.
 * @param {import('./internal').VNode} vnode VNode tree to render
 * @param {import('./internal').PreactElement} parent DOM node to render vnode tree into
 * @param {() => void} [callback] Optional callback that will be called after rendering
 * @returns {import('./internal').Component | null} The root component reference or null
 */
function render(vnode, parent, callback) {
	if (parent._children == null) parent.textContent = "";
	render$1(vnode, parent);
	if (typeof callback == "function") callback();
	return vnode ? vnode._component : null;
}
var oldEventHook = options$1.event;
options$1.event = (e) => {
	if (oldEventHook) e = oldEventHook(e);
	e.persist = () => {};
	e.isPropagationStopped = function isPropagationStopped() {
		return this.cancelBubble;
	};
	e.isDefaultPrevented = function isDefaultPrevented() {
		return this.defaultPrevented;
	};
	return (e.nativeEvent = e);
};
var classNameDescriptorNonEnumberable = {
	configurable: true,
	get() {
		return this.class;
	},
};
function handleDomVNode(vnode) {
	let props = vnode.props,
		type = vnode.type,
		normalizedProps = {},
		isNonDashedType = type.indexOf("-") == -1;
	for (let i in props) {
		let value = props[i];
		if (
			(i === "value" && "defaultValue" in props && value == null) ||
			(IS_DOM && i === "children" && type === "noscript") ||
			i === "class" ||
			i === "className"
		)
			continue;
		let lowerCased = i.toLowerCase();
		if (i === "defaultValue" && "value" in props && props.value == null) i = "value";
		else if (i === "download" && value === true) value = "";
		else if (lowerCased === "translate" && value === "no") value = false;
		else if (lowerCased[0] === "o" && lowerCased[1] === "n") {
			if (lowerCased === "ondoubleclick") i = "ondblclick";
			else if (lowerCased === "onchange" && (type === "input" || type === "textarea") && !onChangeInputType(props.type))
				lowerCased = i = "oninput";
			else if (lowerCased === "onfocus") i = "onfocusin";
			else if (lowerCased === "onblur") i = "onfocusout";
			else if (ON_ANI.test(i)) i = lowerCased;
		} else if (isNonDashedType && CAMEL_PROPS.test(i)) i = i.replace(CAMEL_REPLACE, "-$&").toLowerCase();
		else if (value === null) value = void 0;
		if (lowerCased === "oninput") {
			i = lowerCased;
			if (normalizedProps[i]) i = "oninputCapture";
		}
		normalizedProps[i] = value;
	}
	if (type == "select") {
		if (normalizedProps.multiple && Array.isArray(normalizedProps.value))
			normalizedProps.value = toChildArray(props.children).forEach((child) => {
				child.props.selected = normalizedProps.value.indexOf(child.props.value) != -1;
			});
		if (normalizedProps.defaultValue != null)
			normalizedProps.value = toChildArray(props.children).forEach((child) => {
				if (normalizedProps.multiple)
					child.props.selected = normalizedProps.defaultValue.indexOf(child.props.value) != -1;
				else child.props.selected = normalizedProps.defaultValue == child.props.value;
			});
	}
	if (props.class && !props.className) {
		normalizedProps.class = props.class;
		Object.defineProperty(normalizedProps, "className", classNameDescriptorNonEnumberable);
	} else if (props.className) normalizedProps.class = normalizedProps.className = props.className;
	vnode.props = normalizedProps;
}
var oldVNodeHook = options$1.vnode;
options$1.vnode = (vnode) => {
	if (typeof vnode.type === "string") handleDomVNode(vnode);
	vnode.$$typeof = REACT_ELEMENT_TYPE;
	if (oldVNodeHook) oldVNodeHook(vnode);
};
var oldBeforeRender = options$1._render;
options$1._render = function (vnode) {
	if (oldBeforeRender) oldBeforeRender(vnode);
	vnode._component;
};
var oldDiffed = options$1.diffed;
/** @type {(vnode: import('./internal').VNode) => void} */
options$1.diffed = function (vnode) {
	if (oldDiffed) oldDiffed(vnode);
	const props = vnode.props;
	const dom = vnode._dom;
	if (dom != null && vnode.type === "textarea" && "value" in props && props.value !== dom.value)
		dom.value = props.value == null ? "" : props.value;
};
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/src/index.js
/**
 * Remove a component tree from the DOM, including state and event handlers.
 * @param {import('./internal').PreactElement} container
 * @returns {boolean}
 */
function unmountComponentAtNode(container) {
	if (container._children) {
		render$1(null, container);
		return true;
	}
	return false;
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/client.mjs
function createRoot(container) {
	return {
		render: function (children) {
			render(children, container);
		},
		unmount: function () {
			unmountComponentAtNode(container);
		},
	};
}
//#endregion
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
var chat_REACTION_LABELS = {
	thumbs_up: "Thumbs up",
	heart: "Heart",
	laugh: "Laugh",
	wow: "Wow",
	sad: "Sad",
	party: "Party",
	rocket: "Rocket",
	eyes: "Eyes",
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
 * Channel keys are client-generated so channels are created through `put`, which makes the
 * doc SHARED — any member can rename or archive it. A UUID is printable ASCII and short
 * enough (36 chars) to leave room for the message and reply segments under the 128 budget.
 */
function chat_create_channel_key() {
	return crypto.randomUUID();
}
/** Message keys are `<channelKey>:<invertedPaddedMs>:<rand4>` — appended under this prefix. */
function chat_message_key_prefix(channelKey) {
	return `${channelKey}:`;
}
/** Reply keys are `<rootMessageKey>:<invertedPaddedMs>:<rand4>` — appended under this prefix. */
function chat_reply_key_prefix(rootMessageKey) {
	return `${rootMessageKey}:`;
}
/**
 * The caller key for putOwned/removeOwned on a reaction. The server appends `:<userId>`,
 * so the stored key is `<messageKey>:<token>:<userId>` and nobody can forge another
 * member's reaction key through this op.
 */
function chat_reaction_caller_key(messageKey, token) {
	return `${messageKey}:${token}`;
}
/**
 * Splits a stored reaction key into the reacted-to message key, the palette token, and the
 * server-appended user id tail. Returns null for foreign or malformed keys. The tail is
 * parsed for completeness only — counting always groups by the doc's `createdBy`, because
 * a caller can smuggle any id into the caller part of the key while `createdBy` is stamped
 * by the server.
 */
function chat_parse_reaction_key(storedKey) {
	const parts = storedKey.split(":");
	if (parts.length < 4) return null;
	const token = parts[parts.length - 2];
	if (!chat_REACTION_TOKENS.includes(token)) return null;
	const targetKey = parts.slice(0, -2).join(":");
	if (chat_key_timestamp(targetKey) === null) return null;
	return {
		targetKey,
		token,
		keyTailUserId: parts[parts.length - 1],
	};
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
});
var chat_attachment_schema = object({
	fileNodeId: string().min(1),
	name: string().min(1),
});
var chat_message_value_schema = object({
	text: string(),
	attachments: array(chat_attachment_schema),
	editedAt: number().nullable(),
	deletedAt: number().nullable(),
});
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
	createdBy: string().min(1),
	updatedBy: string(),
	ownership: union([literal("shared"), literal("owned")]),
	createdAt: number(),
	updatedAt: number(),
});
function validate_keyed_doc(raw, valueSchema) {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) return null;
	const timestamp = chat_key_timestamp(envelope.data.key);
	if (timestamp === null) return null;
	const value = valueSchema.safeParse(envelope.data.value);
	if (!value.success) return null;
	return {
		key: envelope.data.key,
		value: value.data,
		revision: envelope.data.revision,
		createdBy: envelope.data.createdBy,
		updatedBy: envelope.data.updatedBy,
		createdAt: envelope.data.createdAt,
		updatedAt: envelope.data.updatedAt,
		timestamp,
	};
}
function chat_validate_channel_doc(raw) {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) return null;
	const value = chat_channel_value_schema.safeParse(envelope.data.value);
	if (!value.success) return null;
	return {
		key: envelope.data.key,
		value: value.data,
		revision: envelope.data.revision,
		createdBy: envelope.data.createdBy,
		updatedBy: envelope.data.updatedBy,
		createdAt: envelope.data.createdAt,
		updatedAt: envelope.data.updatedAt,
		timestamp: envelope.data.createdAt,
	};
}
function chat_validate_message_doc(raw) {
	return validate_keyed_doc(raw, chat_message_value_schema);
}
function chat_validate_reaction_doc(raw) {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) return null;
	const parsed = chat_parse_reaction_key(envelope.data.key);
	if (parsed === null) return null;
	return {
		key: envelope.data.key,
		targetKey: parsed.targetKey,
		token: parsed.token,
		createdBy: envelope.data.createdBy,
		revision: envelope.data.revision,
	};
}
/** Response of `POST /api/v1/files/list`. */
var chat_files_list_response_schema = object({
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
/** Response of `POST /api/v1/files/download-urls`. */
var chat_download_urls_response_schema = object({
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
function chat_get_error_message(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region src/chat-store.ts
/**
 * The accumulate-by-key seam store for messages and thread replies. Every update merges
 * into one map keyed by document key: keys are never reused, deletes are value
 * tombstones (`deletedAt`), and a doc only advances forward (a lower revision never
 * overwrites a higher one). The revision-forward merge is also what lets an optimistic
 * local echo coexist with the server's later delivery of the same key.
 */
function chat_create_accumulating_store(validate) {
	const byKey = /* @__PURE__ */ new Map();
	let dropped = 0;
	const merge_one = (doc) => {
		const existing = byKey.get(doc.key);
		if (existing === void 0 || doc.revision >= existing.revision) byKey.set(doc.key, doc);
	};
	const merge_raw = (docs) => {
		const valid = [];
		for (const raw of docs) {
			const doc = validate(raw);
			if (doc === null) {
				dropped += 1;
				continue;
			}
			valid.push(doc);
			merge_one(doc);
		}
		return valid;
	};
	return {
		apply_window: merge_raw,
		apply_local: merge_one,
		get_sorted() {
			return [...byKey.values()].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
		},
		dropped_count: () => dropped,
	};
}
/**
 * The replace-from-window seam store for reactions (and channels). Each watch update
 * replaces the whole content — a reaction physically removed by removeOwned must
 * disappear, so reactions never accumulate across updates.
 */
function chat_create_window_store(validate) {
	let items = [];
	let dropped = 0;
	return {
		apply_window(docs) {
			const next = [];
			for (const raw of docs) {
				const item = validate(raw);
				if (item === null) {
					dropped += 1;
					continue;
				}
				next.push(item);
			}
			items = next;
			return next;
		},
		get_all: () => items,
		dropped_count: () => dropped,
	};
}
/**
 * Groups reaction docs per reacted-to key, in palette order, counting distinct reactors.
 * Grouping keys on the doc's `createdBy`, never on the key tail: the server stamps
 * `createdBy`, while the caller part of a putOwned key can smuggle any user id.
 */
function chat_group_reactions(docs, myUserId) {
	const reactorsByTarget = /* @__PURE__ */ new Map();
	for (const doc of docs) {
		let byToken = reactorsByTarget.get(doc.targetKey);
		if (byToken === void 0) {
			byToken = /* @__PURE__ */ new Map();
			reactorsByTarget.set(doc.targetKey, byToken);
		}
		let reactors = byToken.get(doc.token);
		if (reactors === void 0) {
			reactors = /* @__PURE__ */ new Set();
			byToken.set(doc.token, reactors);
		}
		reactors.add(doc.createdBy);
	}
	const groups = /* @__PURE__ */ new Map();
	for (const [targetKey, byToken] of reactorsByTarget) {
		const targetGroups = [];
		for (const token of chat_REACTION_TOKENS) {
			const reactors = byToken.get(token);
			if (reactors === void 0 || reactors.size === 0) continue;
			targetGroups.push({
				token,
				count: reactors.size,
				reactedByMe: reactors.has(myUserId),
			});
		}
		groups.set(targetKey, targetGroups);
	}
	return groups;
}
/** Replies per root message key, counted from the bounded channel-wide replies watch. */
function chat_count_replies(docs) {
	const counts = /* @__PURE__ */ new Map();
	for (const doc of docs) {
		const rootKey = chat_reply_root_key(doc.key);
		if (rootKey === null) continue;
		counts.set(rootKey, (counts.get(rootKey) ?? 0) + 1);
	}
	return counts;
}
/**
 * Reply counts are exact once the replies window has nothing more below it. While
 * `hasMore` says replies may still be missing, cap a large count at "99+" instead of
 * pretending precision.
 */
function chat_format_reply_count(count, hasMore) {
	return count > 99 && hasMore ? "99+" : String(count);
}
//#endregion
//#region node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/src/index.js
var vnodeId = 0;
Array.isArray;
/**
 * @fileoverview
 * This file exports various methods that implement Babel's "automatic" JSX runtime API:
 * - jsx(type, props, key)
 * - jsxs(type, props, key)
 * - jsxDEV(type, props, key, __source, __self)
 *
 * The implementation of createVNode here is optimized for performance.
 * Benchmarks: https://esbench.com/bench/5f6b54a0b4632100a7dcd2b3
 */
/**
 * JSX.Element factory used by Babel's {runtime:"automatic"} JSX transform
 * @param {VNode['type']} type
 * @param {VNode['props']} props
 * @param {VNode['key']} [key]
 * @param {unknown} [isStaticChildren]
 * @param {unknown} [__source]
 * @param {unknown} [__self]
 */
function createVNode(type, props, key, isStaticChildren, __source, __self) {
	if (!props) props = {};
	let normalizedProps = props,
		ref,
		i;
	if ("ref" in normalizedProps) {
		normalizedProps = {};
		for (i in props)
			if (i == "ref") ref = props[i];
			else normalizedProps[i] = props[i];
	}
	/** @type {VNode & { __source: any; __self: any }} */
	const vnode = {
		type,
		props: normalizedProps,
		key,
		ref,
		_children: null,
		_parent: null,
		_depth: 0,
		_dom: null,
		_component: null,
		constructor: void 0,
		_original: --vnodeId,
		_index: -1,
		_flags: 0,
		__source,
		__self,
	};
	if (typeof type === "function" && (ref = type.defaultProps)) {
		for (i in ref) if (normalizedProps[i] === void 0) normalizedProps[i] = ref[i];
	}
	if (options$1.vnode) options$1.vnode(vnode);
	return vnode;
}
//#endregion
//#region src/dialog.tsx
var FOCUSABLE_SELECTOR =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
/**
 * Modal dialog: focus is trapped inside, Escape closes, and closing gives focus back to
 * the control that opened it. Content marks the initial-focus control (a non-destructive
 * one, per the a11y contract) with `data-dialog-initial`; without the mark the first
 * focusable control is used.
 */
function Dialog(props) {
	const panelRef = useRef(null);
	useEffect(() => {
		const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		const panel = panelRef.current;
		(panel?.querySelector("[data-dialog-initial]") ?? panel?.querySelector(FOCUSABLE_SELECTOR))?.focus();
		return () => {
			opener?.focus();
		};
	}, []);
	const handle_key_down = (event) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			props.onClose();
			return;
		}
		if (event.key !== "Tab") return;
		const panel = panelRef.current;
		if (!panel) return;
		const focusables = [...panel.querySelectorAll(FOCUSABLE_SELECTOR)];
		if (focusables.length === 0) return;
		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};
	return /* @__PURE__ */ createVNode("div", {
		className: "dialog-overlay",
		children: /* @__PURE__ */ createVNode("div", {
			ref: panelRef,
			className: "dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": props.labelledBy,
			onKeyDown: handle_key_down,
			children: props.children,
		}),
	});
}
//#endregion
//#region src/channel-view.tsx
/**
 * Optimistic sends for one composer. Every logical send mints one clientRequestId and
 * every retry of that send reuses it verbatim, so a replayed append answers the stored
 * key instead of writing the message twice.
 */
function use_send_queue(opts) {
	const [pending, setPending] = useState([]);
	const start = (entry) => {
		const value = {
			text: entry.text,
			attachments: entry.attachments,
			editedAt: null,
			deletedAt: null,
		};
		opts.client.data
			.append({
				collection: opts.collection,
				keyPrefix: opts.keyPrefix,
				value,
				clientRequestId: entry.clientRequestId,
			})
			.then((result) => {
				if ("_nay" in result) {
					setPending((prev) =>
						prev.map((p) =>
							p.clientRequestId === entry.clientRequestId
								? {
										...p,
										status: "failed",
										errorMessage: result._nay.message,
									}
								: p,
						),
					);
					return;
				}
				setPending((prev) => prev.filter((p) => p.clientRequestId !== entry.clientRequestId));
				const key = result._yay.key;
				const timestamp = chat_key_timestamp(key) ?? Date.now();
				opts.onDelivered({
					key,
					value,
					revision: 0,
					createdBy: opts.userId,
					updatedBy: opts.userId,
					createdAt: timestamp,
					updatedAt: timestamp,
					timestamp,
				});
			})
			.catch((error) => {
				setPending((prev) =>
					prev.map((p) =>
						p.clientRequestId === entry.clientRequestId
							? {
									...p,
									status: "failed",
									errorMessage: chat_get_error_message(error),
								}
							: p,
					),
				);
			});
	};
	const send = (text, attachments) => {
		const clientRequestId = crypto.randomUUID();
		setPending((prev) => [
			...prev,
			{
				clientRequestId,
				text,
				attachments,
				status: "sending",
				errorMessage: null,
			},
		]);
		start({
			clientRequestId,
			text,
			attachments,
		});
	};
	const retry = (entry) => {
		setPending((prev) =>
			prev.map((p) =>
				p.clientRequestId === entry.clientRequestId
					? {
							...p,
							status: "sending",
							errorMessage: null,
						}
					: p,
			),
		);
		start(entry);
	};
	return {
		pending,
		send,
		retry,
		busy: pending.some((p) => p.status === "sending"),
	};
}
/** Content-type families the attachment picker lists: images, media, and documents. */
var ATTACHABLE_CONTENT_TYPE_PREFIXES = ["image/", "video/", "audio/", "application/", "text/"];
function AttachmentLink(props) {
	const [state, setState] = useState({ kind: "idle" });
	const handle_resolve = () => {
		setState({ kind: "loading" });
		props.client
			.fetchJson("/api/v1/files/download-urls", { body: { fileNodeIds: [props.attachment.fileNodeId] } })
			.then((raw) => {
				const parsed = chat_download_urls_response_schema.safeParse(raw);
				if (!parsed.success) {
					setState({
						kind: "error",
						message: "Unexpected response for the download link",
					});
					return;
				}
				const item = parsed.data.items.find((candidate) => candidate.fileNodeId === props.attachment.fileNodeId);
				if (item !== void 0) {
					setState({
						kind: "ready",
						url: item.url,
					});
					return;
				}
				const failure = parsed.data.errors.find((candidate) => candidate.fileNodeId === props.attachment.fileNodeId);
				setState({
					kind: "error",
					message: failure?.message ?? "Failed to get a download link",
				});
			})
			.catch((error) => {
				setState({
					kind: "error",
					message: chat_get_error_message(error),
				});
			});
	};
	if (state.kind === "ready")
		return /* @__PURE__ */ createVNode("span", {
			className: "attachment",
			children: [
				/* @__PURE__ */ createVNode("a", {
					className: "attachment-link",
					href: state.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: props.attachment.name,
				}),
				/* @__PURE__ */ createVNode("span", {
					className: "attachment-hint",
					children: "Link ready — it expires after a few minutes.",
				}),
			],
		});
	return /* @__PURE__ */ createVNode("span", {
		className: "attachment",
		children: [
			/* @__PURE__ */ createVNode("button", {
				type: "button",
				className: "attachment-button",
				disabled: state.kind === "loading",
				onClick: handle_resolve,
				children: state.kind === "loading" ? `Getting link for ${props.attachment.name}…` : props.attachment.name,
			}),
			state.kind === "error"
				? /* @__PURE__ */ createVNode("span", {
						className: "attachment-error",
						role: "alert",
						children: state.message,
					})
				: null,
		],
	});
}
function AttachmentPickerDialog(props) {
	const titleId = useId();
	const [items, setItems] = useState([]);
	const [cursor, setCursor] = useState(null);
	const [isDone, setIsDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const seenNodeIdsRef = useRef(/* @__PURE__ */ new Set());
	const startedRef = useRef(false);
	const handle_load = () => {
		setLoading(true);
		setError(null);
		props.client
			.fetchJson("/api/v1/files/list", {
				body: {
					path: "/",
					recursive: true,
					kind: "file",
					limit: 100,
					scanLimit: 1e4,
					contentTypePrefixes: ATTACHABLE_CONTENT_TYPE_PREFIXES,
					cursor,
				},
			})
			.then((raw) => {
				setLoading(false);
				const parsed = chat_files_list_response_schema.safeParse(raw);
				if (!parsed.success) {
					setError("Unexpected response from the file list");
					return;
				}
				const fresh = parsed.data.items.filter((item) => !seenNodeIdsRef.current.has(item.nodeId));
				for (const item of fresh) seenNodeIdsRef.current.add(item.nodeId);
				setItems((prev) => [...prev, ...fresh]);
				setCursor(parsed.data.cursor);
				setIsDone(parsed.data.isDone);
			})
			.catch((loadError) => {
				setLoading(false);
				setError(chat_get_error_message(loadError));
			});
	};
	useEffect(() => {
		if (startedRef.current) return;
		startedRef.current = true;
		handle_load();
	}, []);
	return /* @__PURE__ */ createVNode(Dialog, {
		labelledBy: titleId,
		onClose: props.onClose,
		children: [
			/* @__PURE__ */ createVNode("h2", {
				id: titleId,
				className: "dialog-title",
				children: "Attach a file",
			}),
			/* @__PURE__ */ createVNode("button", {
				type: "button",
				className: "button",
				"data-dialog-initial": true,
				onClick: props.onClose,
				children: "Cancel",
			}),
			items.length > 0
				? /* @__PURE__ */ createVNode("ul", {
						className: "picker-list",
						children: items.map((item) =>
							/* @__PURE__ */ createVNode(
								"li",
								{
									children: /* @__PURE__ */ createVNode("button", {
										type: "button",
										className: "picker-item",
										onClick: () =>
											props.onPick({
												fileNodeId: item.nodeId,
												name: item.name,
											}),
										children: [
											/* @__PURE__ */ createVNode("span", {
												className: "picker-item-name",
												children: item.name,
											}),
											/* @__PURE__ */ createVNode("span", {
												className: "picker-item-path",
												children: item.path,
											}),
										],
									}),
								},
								item.nodeId,
							),
						),
					})
				: null,
			loading
				? /* @__PURE__ */ createVNode("div", {
						className: "channel-status",
						role: "status",
						children: "Loading files…",
					})
				: null,
			error !== null
				? /* @__PURE__ */ createVNode("div", {
						className: "channel-status is-error",
						role: "alert",
						children: [
							/* @__PURE__ */ createVNode("span", { children: error }),
							/* @__PURE__ */ createVNode("button", {
								type: "button",
								className: "button",
								onClick: handle_load,
								children: "Retry",
							}),
						],
					})
				: null,
			!loading && error === null && items.length === 0 && isDone
				? /* @__PURE__ */ createVNode("div", {
						className: "channel-status",
						children: "No files found.",
					})
				: null,
			!isDone && !loading && error === null
				? /* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button",
						onClick: handle_load,
						children: "Load more",
					})
				: null,
		],
	});
}
function Composer(props) {
	const hintId = useId();
	const [text, setText] = useState("");
	const [attachments, setAttachments] = useState([]);
	const [pickerOpen, setPickerOpen] = useState(false);
	const handle_send = () => {
		if (props.busy) return;
		const trimmed = text.trim();
		if (trimmed === "" && attachments.length === 0) return;
		props.onSend(trimmed, attachments);
		setText("");
		setAttachments([]);
	};
	const handle_key_down = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handle_send();
		}
	};
	return /* @__PURE__ */ createVNode("div", {
		className: "composer",
		children: [
			attachments.length > 0
				? /* @__PURE__ */ createVNode("ul", {
						className: "composer-attachments",
						children: attachments.map((attachment) =>
							/* @__PURE__ */ createVNode(
								"li",
								{
									className: "composer-attachment",
									children: [
										/* @__PURE__ */ createVNode("span", { children: attachment.name }),
										/* @__PURE__ */ createVNode("button", {
											type: "button",
											className: "composer-attachment-remove",
											"aria-label": `Remove attachment ${attachment.name}`,
											onClick: () =>
												setAttachments((prev) => prev.filter((entry) => entry.fileNodeId !== attachment.fileNodeId)),
											children: "×",
										}),
									],
								},
								attachment.fileNodeId,
							),
						),
					})
				: null,
			/* @__PURE__ */ createVNode("textarea", {
				className: "composer-input",
				"aria-label": props.label,
				"aria-describedby": hintId,
				rows: 2,
				value: text,
				onInput: (event) => setText(event.currentTarget.value),
				onKeyDown: handle_key_down,
			}),
			/* @__PURE__ */ createVNode("div", {
				className: "composer-row",
				children: [
					/* @__PURE__ */ createVNode("span", {
						id: hintId,
						className: "composer-hint",
						children: "Enter sends · Shift+Enter for a new line",
					}),
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button",
						onClick: () => setPickerOpen(true),
						children: "Attach file",
					}),
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button button-primary",
						disabled: props.busy,
						onClick: handle_send,
						children: props.busy ? "Sending…" : "Send",
					}),
				],
			}),
			pickerOpen
				? /* @__PURE__ */ createVNode(AttachmentPickerDialog, {
						client: props.client,
						onPick: (attachment) => {
							setAttachments((prev) =>
								prev.some((entry) => entry.fileNodeId === attachment.fileNodeId) ? prev : [...prev, attachment],
							);
							setPickerOpen(false);
						},
						onClose: () => setPickerOpen(false),
					})
				: null,
		],
	});
}
function AddReactionButton(props) {
	const [open, setOpen] = useState(false);
	const openerRef = useRef(null);
	const itemRefs = useRef([]);
	useEffect(() => {
		if (open) itemRefs.current[0]?.focus();
	}, [open]);
	const close = () => {
		setOpen(false);
		openerRef.current?.focus();
	};
	const handle_item_key_down = (event, index) => {
		if (event.key === "Escape") {
			event.preventDefault();
			close();
		} else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
			event.preventDefault();
			itemRefs.current[(index + 1) % chat_REACTION_TOKENS.length]?.focus();
		} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
			event.preventDefault();
			itemRefs.current[(index + chat_REACTION_TOKENS.length - 1) % chat_REACTION_TOKENS.length]?.focus();
		}
	};
	return /* @__PURE__ */ createVNode("span", {
		className: "add-reaction",
		children: [
			/* @__PURE__ */ createVNode("button", {
				ref: openerRef,
				type: "button",
				className: "button message-action",
				"aria-expanded": open,
				onClick: () => (open ? close() : setOpen(true)),
				children: "Add reaction",
			}),
			open
				? /* @__PURE__ */ createVNode("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: chat_REACTION_TOKENS.map((token, index) => {
							const pressed = props.groups.find((group) => group.token === token)?.reactedByMe ?? false;
							return /* @__PURE__ */ createVNode(
								"button",
								{
									ref: (el) => {
										itemRefs.current[index] = el;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": pressed,
									"aria-label": chat_REACTION_LABELS[token],
									onKeyDown: (event) => handle_item_key_down(event, index),
									onClick: () => {
										props.onPick(token, pressed);
										close();
									},
									children: /* @__PURE__ */ createVNode("span", {
										"aria-hidden": "true",
										children: chat_REACTION_EMOJI[token],
									}),
								},
								token,
							);
						}),
					})
				: null,
		],
	});
}
function MessageRow(props) {
	const { client, collection, doc, isOwn } = props;
	const confirmTitleId = useId();
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState("");
	const [busy, setBusy] = useState(false);
	const [rowError, setRowError] = useState(null);
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const editInputRef = useRef(null);
	const editButtonRef = useRef(null);
	useEffect(() => {
		if (editing) editInputRef.current?.focus();
	}, [editing]);
	const apply_value = (value, onDone) => {
		setBusy(true);
		setRowError(null);
		client.data
			.put({
				collection,
				key: doc.key,
				value,
			})
			.then((result) => {
				setBusy(false);
				if ("_nay" in result) {
					setRowError(result._nay.message);
					return;
				}
				props.onApplyLocal({
					...doc,
					value,
					revision: doc.revision + 1,
					updatedAt: Date.now(),
				});
				onDone();
			})
			.catch((error) => {
				setBusy(false);
				setRowError(chat_get_error_message(error));
			});
	};
	const handle_edit_save = () => {
		if (busy) return;
		const trimmed = editText.trim();
		if (trimmed === "") return;
		apply_value(
			{
				...doc.value,
				text: trimmed,
				editedAt: Date.now(),
			},
			() => {
				setEditing(false);
				editButtonRef.current?.focus();
			},
		);
	};
	const handle_edit_cancel = () => {
		setEditing(false);
		editButtonRef.current?.focus();
	};
	const handle_delete = () => {
		apply_value(
			{
				...doc.value,
				deletedAt: Date.now(),
			},
			() => {
				setConfirmingDelete(false);
			},
		);
	};
	const handle_toggle_reaction = (token, currentlyPressed) => {
		setRowError(null);
		(currentlyPressed
			? client.data.removeOwned({
					collection: "reactions",
					key: chat_reaction_caller_key(doc.key, token),
				})
			: client.data.putOwned({
					collection: "reactions",
					key: chat_reaction_caller_key(doc.key, token),
					value: {},
				})
		)
			.then((result) => {
				if ("_nay" in result) setRowError(result._nay.message);
			})
			.catch((error) => {
				setRowError(chat_get_error_message(error));
			});
	};
	const isDeleted = doc.value.deletedAt !== null;
	return /* @__PURE__ */ createVNode("li", {
		className: "message",
		"data-key": doc.key,
		children: [
			/* @__PURE__ */ createVNode("div", {
				className: "message-head",
				children: [
					/* @__PURE__ */ createVNode("span", {
						className: "message-author",
						children: props.authorName === null ? "Former member" : (props.authorName ?? "…"),
					}),
					/* @__PURE__ */ createVNode("time", {
						className: "message-time",
						children: new Date(doc.timestamp).toLocaleString(),
					}),
				],
			}),
			isDeleted
				? /* @__PURE__ */ createVNode("p", {
						className: "message-text is-deleted",
						children: "Message deleted",
					})
				: editing
					? /* @__PURE__ */ createVNode("div", {
							className: "message-edit",
							children: [
								/* @__PURE__ */ createVNode("textarea", {
									ref: editInputRef,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: editText,
									onInput: (event) => setEditText(event.currentTarget.value),
									onKeyDown: (event) => {
										if (event.key === "Escape") {
											event.preventDefault();
											handle_edit_cancel();
										} else if (event.key === "Enter" && !event.shiftKey) {
											event.preventDefault();
											handle_edit_save();
										}
									},
								}),
								/* @__PURE__ */ createVNode("div", {
									className: "message-edit-actions",
									children: [
										/* @__PURE__ */ createVNode("button", {
											type: "button",
											className: "button",
											disabled: busy,
											onClick: handle_edit_cancel,
											children: "Cancel",
										}),
										/* @__PURE__ */ createVNode("button", {
											type: "button",
											className: "button button-primary",
											disabled: busy,
											onClick: handle_edit_save,
											children: busy ? "Saving…" : "Save",
										}),
									],
								}),
							],
						})
					: /* @__PURE__ */ createVNode(Fragment, {
							children: [
								/* @__PURE__ */ createVNode("p", {
									className: "message-text",
									children: [
										doc.value.text,
										doc.value.editedAt !== null
											? /* @__PURE__ */ createVNode("span", {
													className: "message-edited",
													children: " (edited)",
												})
											: null,
									],
								}),
								doc.value.attachments.length > 0
									? /* @__PURE__ */ createVNode("div", {
											className: "message-attachments",
											children: doc.value.attachments.map((attachment) =>
												/* @__PURE__ */ createVNode(
													AttachmentLink,
													{
														client,
														attachment,
													},
													attachment.fileNodeId,
												),
											),
										})
									: null,
								props.reactionGroups.length > 0
									? /* @__PURE__ */ createVNode("div", {
											className: "message-reactions",
											children: props.reactionGroups.map((group) =>
												/* @__PURE__ */ createVNode(
													"button",
													{
														type: "button",
														className: group.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": group.reactedByMe,
														"aria-label": `${chat_REACTION_LABELS[group.token]}, ${group.count} ${group.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => handle_toggle_reaction(group.token, group.reactedByMe),
														children: [
															/* @__PURE__ */ createVNode("span", {
																"aria-hidden": "true",
																children: chat_REACTION_EMOJI[group.token],
															}),
															/* @__PURE__ */ createVNode("span", {
																className: "reaction-chip-count",
																children: group.count,
															}),
														],
													},
													group.token,
												),
											),
										})
									: null,
							],
						}),
			!isDeleted && !editing
				? /* @__PURE__ */ createVNode("div", {
						className: "message-actions",
						children: [
							props.onOpenThread !== null && props.replyCount !== null
								? /* @__PURE__ */ createVNode("button", {
										ref: props.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										onClick: () => props.onOpenThread?.(doc),
										children:
											props.replyCount === "unknown"
												? "View thread"
												: props.replyCount === 0
													? "Reply in thread"
													: `${chat_format_reply_count(props.replyCount, props.repliesHasMore)} ${props.replyCount === 1 ? "reply" : "replies"}`,
									})
								: null,
							/* @__PURE__ */ createVNode(AddReactionButton, {
								groups: props.reactionGroups,
								onPick: handle_toggle_reaction,
							}),
							isOwn
								? /* @__PURE__ */ createVNode(Fragment, {
										children: [
											/* @__PURE__ */ createVNode("button", {
												ref: editButtonRef,
												type: "button",
												className: "button message-action",
												onClick: () => {
													setEditText(doc.value.text);
													setEditing(true);
												},
												children: "Edit",
											}),
											/* @__PURE__ */ createVNode("button", {
												type: "button",
												className: "button message-action button-danger",
												onClick: () => setConfirmingDelete(true),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			rowError !== null
				? /* @__PURE__ */ createVNode("p", {
						className: "form-error",
						role: "alert",
						children: rowError,
					})
				: null,
			confirmingDelete
				? /* @__PURE__ */ createVNode(Dialog, {
						labelledBy: confirmTitleId,
						onClose: () => setConfirmingDelete(false),
						children: [
							/* @__PURE__ */ createVNode("h2", {
								id: confirmTitleId,
								className: "dialog-title",
								children: "Delete message?",
							}),
							/* @__PURE__ */ createVNode("p", {
								children: 'The message is replaced by a "Message deleted" placeholder for everyone.',
							}),
							/* @__PURE__ */ createVNode("div", {
								className: "dialog-actions",
								children: [
									/* @__PURE__ */ createVNode("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": true,
										disabled: busy,
										onClick: () => setConfirmingDelete(false),
										children: "Cancel",
									}),
									/* @__PURE__ */ createVNode("button", {
										type: "button",
										className: "button button-danger",
										disabled: busy,
										onClick: handle_delete,
										children: busy ? "Deleting…" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function PendingRow(props) {
	return /* @__PURE__ */ createVNode("li", {
		className: props.pending.status === "failed" ? "message is-pending is-failed" : "message is-pending",
		children: [
			/* @__PURE__ */ createVNode("div", {
				className: "message-head",
				children: [
					/* @__PURE__ */ createVNode("span", {
						className: "message-author",
						children: "You",
					}),
					/* @__PURE__ */ createVNode("span", {
						className: "message-time",
						children: props.pending.status === "sending" ? "Sending…" : "Not sent",
					}),
				],
			}),
			/* @__PURE__ */ createVNode("p", {
				className: "message-text",
				children: props.pending.text,
			}),
			props.pending.attachments.length > 0
				? /* @__PURE__ */ createVNode("p", {
						className: "message-text",
						children: props.pending.attachments.map((attachment) => attachment.name).join(", "),
					})
				: null,
			props.pending.status === "failed"
				? /* @__PURE__ */ createVNode("div", {
						className: "message-send-error",
						role: "alert",
						children: [
							/* @__PURE__ */ createVNode("span", { children: props.pending.errorMessage ?? "Failed to send message" }),
							/* @__PURE__ */ createVNode("button", {
								type: "button",
								className: "button",
								onClick: props.onRetry,
								children: "Retry sending message",
							}),
						],
					})
				: null,
		],
	});
}
function ThreadPanel(props) {
	const { client, userId, root, memberNames } = props;
	const [replies, setReplies] = useState([]);
	const [repliesLoaded, setRepliesLoaded] = useState(false);
	const storeRef = useRef(null);
	const closeButtonRef = useRef(null);
	useEffect(() => {
		closeButtonRef.current?.focus();
	}, []);
	useEffect(() => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		storeRef.current = store;
		return client.data.watch(
			{
				collection: "replies",
				keyPrefix: chat_reply_key_prefix(root.key),
				limit: 100,
			},
			(docs) => {
				if (docs === null) return;
				store.apply_window(docs);
				setReplies(store.get_sorted());
				setRepliesLoaded(true);
			},
		);
	}, [client, root.key]);
	const queue = use_send_queue({
		client,
		collection: "replies",
		keyPrefix: chat_reply_key_prefix(root.key),
		userId,
		onDelivered: (doc) => {
			storeRef.current?.apply_local(doc);
			setReplies(storeRef.current?.get_sorted() ?? []);
		},
	});
	useEffect(() => {
		const ids = [...new Set(replies.map((doc) => doc.createdBy))];
		if (ids.length > 0) memberNames.resolve(ids);
	}, [replies, memberNames]);
	const handle_key_down = (event) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			props.onClose();
		}
	};
	return /* @__PURE__ */ createVNode("section", {
		className: "thread",
		"aria-label": "Thread",
		onKeyDown: handle_key_down,
		children: [
			/* @__PURE__ */ createVNode("div", {
				className: "thread-head",
				children: [
					/* @__PURE__ */ createVNode("h3", {
						className: "thread-title",
						children: "Thread",
					}),
					/* @__PURE__ */ createVNode("button", {
						ref: closeButtonRef,
						type: "button",
						className: "button",
						onClick: props.onClose,
						children: "Close thread",
					}),
				],
			}),
			/* @__PURE__ */ createVNode("ul", {
				className: "message-list thread-root",
				children: /* @__PURE__ */ createVNode(MessageRow, {
					client,
					collection: "messages",
					doc: root,
					isOwn: root.createdBy === userId,
					authorName: memberNames.get(root.createdBy),
					reactionGroups: props.reactionGroupsByTarget.get(root.key) ?? [],
					replyCount: null,
					repliesHasMore: false,
					onOpenThread: null,
					replyTriggerRef: null,
					onApplyLocal: props.onApplyLocalRoot,
				}),
			}),
			!repliesLoaded
				? /* @__PURE__ */ createVNode("div", {
						className: "channel-status",
						role: "status",
						children: "Loading replies…",
					})
				: replies.length === 0 && queue.pending.length === 0
					? /* @__PURE__ */ createVNode("div", {
							className: "channel-status",
							children: "No replies yet",
						})
					: /* @__PURE__ */ createVNode("ul", {
							className: "message-list thread-replies",
							children: [
								[...replies].reverse().map((doc) =>
									/* @__PURE__ */ createVNode(
										MessageRow,
										{
											client,
											collection: "replies",
											doc,
											isOwn: doc.createdBy === userId,
											authorName: memberNames.get(doc.createdBy),
											reactionGroups: props.reactionGroupsByTarget.get(doc.key) ?? [],
											replyCount: null,
											repliesHasMore: false,
											onOpenThread: null,
											replyTriggerRef: null,
											onApplyLocal: (updated) => {
												storeRef.current?.apply_local(updated);
												setReplies(storeRef.current?.get_sorted() ?? []);
											},
										},
										doc.key,
									),
								),
								queue.pending.map((pending) =>
									/* @__PURE__ */ createVNode(
										PendingRow,
										{
											pending,
											onRetry: () => queue.retry(pending),
										},
										pending.clientRequestId,
									),
								),
							],
						}),
			/* @__PURE__ */ createVNode(Composer, {
				client,
				label: "Reply in thread",
				busy: queue.busy,
				onSend: queue.send,
			}),
		],
	});
}
/**
 * Message and reply keys are `<channel uuid (36)>:<inverted ms (13)>:<rand (4)>...`, so the
 * first 55 characters of any chitchat-minted key name its root message. Companion keys
 * (reactions, replies) extend a root key, so the same slice normalizes them all.
 */
var ROOT_KEY_LENGTH = 55;
/**
 * One open channel: message log, reactive document windows, composer, and thread panel.
 * The parent keys this component by channel key, so every mount owns exactly one channel.
 */
function ChannelView(props) {
	const { client, userId, channel, memberNames, announce } = props;
	const [messages, setMessages] = useState([]);
	const [messagesLoaded, setMessagesLoaded] = useState(false);
	const [messagesDead, setMessagesDead] = useState(false);
	const [messagesWindow, setMessagesWindow] = useState({
		hasMore: false,
		atCapacity: false,
		incomplete: false,
	});
	const [reactionDocs, setReactionDocs] = useState([]);
	const [channelReplies, setChannelReplies] = useState([]);
	const [replyCoverage, setReplyCoverage] = useState({
		hasMore: false,
		deepestRoot: null,
	});
	const [threadRootKey, setThreadRootKey] = useState(null);
	const messagesStoreRef = useRef(null);
	const messagesWindowRef = useRef(null);
	const reactionsWindowRef = useRef(null);
	const repliesWindowRef = useRef(null);
	const reactionsCoverageRef = useRef(null);
	const repliesCoverageRef = useRef(null);
	const oldestRootRef = useRef(null);
	const channelNameRef = useRef(channel.value.name);
	const seenKeysRef = useRef(null);
	const replyTriggersRef = useRef(/* @__PURE__ */ new Map());
	const logRef = useRef(null);
	const newestKeyRef = useRef(null);
	const pendingCountRef = useRef(0);
	useEffect(() => {
		channelNameRef.current = channel.value.name;
	}, [channel.value.name]);
	const evaluate_companion_catch_up = () => {
		const oldestRoot = oldestRootRef.current;
		if (oldestRoot === null) return;
		for (const companion of [
			{
				coverage: reactionsCoverageRef.current,
				windowHandle: reactionsWindowRef.current,
			},
			{
				coverage: repliesCoverageRef.current,
				windowHandle: repliesWindowRef.current,
			},
		]) {
			if (companion.coverage === null || !companion.coverage.hasMore || companion.coverage.atCapacity) continue;
			if (companion.coverage.deepestRoot === null || companion.coverage.deepestRoot < oldestRoot)
				companion.windowHandle?.loadOlder();
		}
	};
	useEffect(() => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		messagesStoreRef.current = store;
		const watchWindow = client.data.watchWindow(
			{
				collection: "messages",
				keyPrefix: chat_message_key_prefix(channel.key),
				pageSize: 100,
			},
			(update) => {
				if (update === null) {
					setMessagesDead(true);
					return;
				}
				const windowDocs = store.apply_window(update.docs);
				const sorted = store.get_sorted();
				setMessages(sorted);
				setMessagesLoaded(true);
				setMessagesWindow({
					hasMore: update.hasMore,
					atCapacity: update.atCapacity,
					incomplete: update.incomplete,
				});
				oldestRootRef.current = sorted.length > 0 ? sorted[sorted.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null;
				evaluate_companion_catch_up();
				const seen = seenKeysRef.current;
				if (seen === null) {
					seenKeysRef.current = new Set(windowDocs.map((doc) => doc.key));
					return;
				}
				const arrivals = windowDocs.filter(
					(doc) => !seen.has(doc.key) && doc.createdBy !== userId && doc.value.deletedAt === null,
				);
				for (const doc of windowDocs) seen.add(doc.key);
				if (arrivals.length === 1) {
					const arrival = arrivals[0];
					memberNames
						.resolve([arrival.createdBy])
						.then(() => {
							const name = memberNames.get(arrival.createdBy) ?? null;
							const text = arrival.value.text;
							const preview = text.length > 80 ? `${text.slice(0, 80)}…` : text;
							announce(`${name ?? "Former member"}: ${preview}`);
						})
						.catch(() => {
							announce(`New message in #${channelNameRef.current}`);
						});
				} else if (arrivals.length > 1) announce(`${arrivals.length} new messages in #${channelNameRef.current}`);
			},
		);
		messagesWindowRef.current = watchWindow;
		return () => {
			messagesWindowRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key, userId, memberNames, announce]);
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_reaction_doc);
		const watchWindow = client.data.watchWindow(
			{
				collection: "reactions",
				keyPrefix: chat_message_key_prefix(channel.key),
				pageSize: 100,
			},
			(update) => {
				if (update === null) {
					reactionsCoverageRef.current = null;
					return;
				}
				const validated = store.apply_window(update.docs);
				setReactionDocs(validated);
				reactionsCoverageRef.current = {
					hasMore: update.hasMore,
					atCapacity: update.atCapacity,
					deepestRoot: validated.length > 0 ? validated[validated.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null,
				};
				evaluate_companion_catch_up();
			},
		);
		reactionsWindowRef.current = watchWindow;
		return () => {
			reactionsWindowRef.current = null;
			reactionsCoverageRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key]);
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_message_doc);
		const watchWindow = client.data.watchWindow(
			{
				collection: "replies",
				keyPrefix: chat_message_key_prefix(channel.key),
				pageSize: 100,
			},
			(update) => {
				if (update === null) {
					repliesCoverageRef.current = null;
					return;
				}
				const validated = store.apply_window(update.docs);
				setChannelReplies(validated);
				const deepestRoot = validated.length > 0 ? validated[validated.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null;
				repliesCoverageRef.current = {
					hasMore: update.hasMore,
					atCapacity: update.atCapacity,
					deepestRoot,
				};
				setReplyCoverage({
					hasMore: update.hasMore,
					deepestRoot,
				});
				evaluate_companion_catch_up();
			},
		);
		repliesWindowRef.current = watchWindow;
		return () => {
			repliesWindowRef.current = null;
			repliesCoverageRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key]);
	const queue = use_send_queue({
		client,
		collection: "messages",
		keyPrefix: chat_message_key_prefix(channel.key),
		userId,
		onDelivered: (doc) => {
			messagesStoreRef.current?.apply_local(doc);
			seenKeysRef.current?.add(doc.key);
			setMessages(messagesStoreRef.current?.get_sorted() ?? []);
		},
	});
	useEffect(() => {
		const ids = /* @__PURE__ */ new Set();
		for (const doc of messages) ids.add(doc.createdBy);
		for (const doc of channelReplies) ids.add(doc.createdBy);
		if (ids.size > 0) memberNames.resolve([...ids]);
	}, [messages, channelReplies, memberNames]);
	useEffect(() => {
		const newestKey = messages.length > 0 ? messages[0].key : null;
		const newestChanged = newestKey !== null && newestKey !== newestKeyRef.current;
		const pendingGrew = queue.pending.length > pendingCountRef.current;
		newestKeyRef.current = newestKey;
		pendingCountRef.current = queue.pending.length;
		if ((newestChanged || pendingGrew) && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
	}, [messages, queue.pending.length]);
	const handle_load_older = () => {
		messagesWindowRef.current?.loadOlder();
	};
	const reactionGroupsByTarget = useMemo(() => chat_group_reactions(reactionDocs, userId), [reactionDocs, userId]);
	const replyCounts = useMemo(() => chat_count_replies(channelReplies), [channelReplies]);
	const apply_local_message = (doc) => {
		messagesStoreRef.current?.apply_local(doc);
		setMessages(messagesStoreRef.current?.get_sorted() ?? []);
	};
	const handle_close_thread = () => {
		const key = threadRootKey;
		setThreadRootKey(null);
		if (key !== null) replyTriggersRef.current.get(key)?.focus();
	};
	const threadRoot = threadRootKey === null ? null : (messages.find((doc) => doc.key === threadRootKey) ?? null);
	if (messagesDead)
		return /* @__PURE__ */ createVNode("div", {
			className: "channel",
			children: /* @__PURE__ */ createVNode("div", {
				className: "channel-dead",
				role: "alert",
				children: [
					"Access to messages in #",
					channel.value.name,
					" ended. Your permissions may have changed — reload the page to try again.",
				],
			}),
		});
	return /* @__PURE__ */ createVNode("div", {
		className: "channel",
		children: [
			/* @__PURE__ */ createVNode("header", {
				className: "channel-head",
				children: [
					/* @__PURE__ */ createVNode("h2", {
						className: "channel-title",
						children: ["#", channel.value.name],
					}),
					channel.value.archivedAt !== null
						? /* @__PURE__ */ createVNode("span", {
								className: "channel-archived-badge",
								children: "Archived",
							})
						: null,
				],
			}),
			/* @__PURE__ */ createVNode("div", {
				className: "channel-body",
				children: [
					/* @__PURE__ */ createVNode("div", {
						ref: logRef,
						className: "message-log",
						role: "log",
						"aria-live": "off",
						"aria-label": `Messages in #${channel.value.name}`,
						children: [
							messagesLoaded && messagesWindow.hasMore && !messagesWindow.atCapacity
								? /* @__PURE__ */ createVNode("div", {
										className: "log-older",
										children: /* @__PURE__ */ createVNode("button", {
											type: "button",
											className: "button",
											onClick: handle_load_older,
											children: "Load older",
										}),
									})
								: null,
							messagesLoaded && messagesWindow.hasMore && messagesWindow.atCapacity
								? /* @__PURE__ */ createVNode("div", {
										className: "channel-status",
										children: "Older messages can't be loaded right now.",
									})
								: null,
							messagesWindow.incomplete
								? /* @__PURE__ */ createVNode("div", {
										className: "channel-status",
										role: "alert",
										children: "Some messages in this range could not be loaded.",
									})
								: null,
							!messagesLoaded
								? /* @__PURE__ */ createVNode("div", {
										className: "channel-status",
										role: "status",
										children: "Loading messages…",
									})
								: messages.length === 0 && queue.pending.length === 0
									? /* @__PURE__ */ createVNode("div", {
											className: "channel-status",
											children: "No messages yet",
										})
									: /* @__PURE__ */ createVNode("ul", {
											className: "message-list",
											children: [
												[...messages].reverse().map((doc) =>
													/* @__PURE__ */ createVNode(
														MessageRow,
														{
															client,
															collection: "messages",
															doc,
															isOwn: doc.createdBy === userId,
															authorName: memberNames.get(doc.createdBy),
															reactionGroups: reactionGroupsByTarget.get(doc.key) ?? [],
															replyCount:
																!replyCoverage.hasMore ||
																(replyCoverage.deepestRoot !== null &&
																	doc.key.slice(0, ROOT_KEY_LENGTH) < replyCoverage.deepestRoot)
																	? (replyCounts.get(doc.key) ?? 0)
																	: "unknown",
															repliesHasMore: replyCoverage.hasMore,
															onOpenThread: (root) => setThreadRootKey(root.key),
															replyTriggerRef: (el) => {
																if (el === null) replyTriggersRef.current.delete(doc.key);
																else replyTriggersRef.current.set(doc.key, el);
															},
															onApplyLocal: apply_local_message,
														},
														doc.key,
													),
												),
												queue.pending.map((pending) =>
													/* @__PURE__ */ createVNode(
														PendingRow,
														{
															pending,
															onRetry: () => queue.retry(pending),
														},
														pending.clientRequestId,
													),
												),
											],
										}),
						],
					}),
					threadRoot !== null
						? /* @__PURE__ */ createVNode(
								ThreadPanel,
								{
									client,
									userId,
									root: threadRoot,
									reactionGroupsByTarget,
									memberNames,
									onApplyLocalRoot: apply_local_message,
									onClose: handle_close_thread,
								},
								threadRoot.key,
							)
						: null,
				],
			}),
			/* @__PURE__ */ createVNode(Composer, {
				client,
				label: `Message #${channel.value.name}`,
				busy: queue.busy,
				onSend: queue.send,
			}),
		],
	});
}
//#endregion
//#region src/app.tsx
/**
 * One cached member-name resolver for the whole page. Names live in a ref (async
 * resolutions read and write the latest map without stale-closure risk). When a
 * resolution lands, a state counter bumps purely to re-render consumers.
 *
 * The returned object must keep ONE identity for the page's lifetime: the messages watch
 * effect lists it as a dependency, and a fresh object per render would tear down and
 * rebuild the subscription and its accumulated store — collapsing "Load older" history
 * back to the newest window on every remote arrival.
 */
function use_member_names(client) {
	const namesRef = useRef(/* @__PURE__ */ new Map());
	const requestedRef = useRef(/* @__PURE__ */ new Set());
	const [, setResolutionCount] = useState(0);
	const get = useCallback((userId) => {
		return namesRef.current.has(userId) ? namesRef.current.get(userId) : void 0;
	}, []);
	const resolve = useCallback(
		async (userIds) => {
			const missing = [...new Set(userIds)].filter((id) => !requestedRef.current.has(id));
			if (missing.length === 0) return;
			for (const id of missing) requestedRef.current.add(id);
			for (let start = 0; start < missing.length; start += 50) {
				const batch = missing.slice(start, start + 50);
				try {
					const members = await client.members.resolve(batch);
					for (const id of batch) namesRef.current.set(id, members[id] ?? null);
				} catch {
					for (const id of batch) requestedRef.current.delete(id);
				}
			}
			setResolutionCount((current) => current + 1);
		},
		[client],
	);
	return useMemo(
		() => ({
			get,
			resolve,
		}),
		[get, resolve],
	);
}
function ChannelNameDialog(props) {
	const titleId = useId();
	const inputId = useId();
	const [name, setName] = useState(props.initialName);
	const [validationError, setValidationError] = useState(null);
	const handle_submit = () => {
		if (props.busy) return;
		const trimmed = name.trim();
		if (trimmed.length < 1 || trimmed.length > 64) {
			setValidationError(`Enter a name between 1 and 64 characters.`);
			return;
		}
		setValidationError(null);
		props.onSubmit(trimmed);
	};
	const error = validationError ?? props.error;
	return /* @__PURE__ */ createVNode(Dialog, {
		labelledBy: titleId,
		onClose: props.onClose,
		children: [
			/* @__PURE__ */ createVNode("h2", {
				id: titleId,
				className: "dialog-title",
				children: props.title,
			}),
			/* @__PURE__ */ createVNode("div", {
				className: "field",
				children: [
					/* @__PURE__ */ createVNode("label", {
						htmlFor: inputId,
						children: "Channel name",
					}),
					/* @__PURE__ */ createVNode("input", {
						id: inputId,
						"data-dialog-initial": true,
						type: "text",
						value: name,
						maxLength: 64,
						onInput: (event) => setName(event.currentTarget.value),
						onKeyDown: (event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								handle_submit();
							}
						},
					}),
				],
			}),
			error !== null
				? /* @__PURE__ */ createVNode("p", {
						className: "form-error",
						role: "alert",
						children: error,
					})
				: null,
			/* @__PURE__ */ createVNode("div", {
				className: "dialog-actions",
				children: [
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button",
						disabled: props.busy,
						onClick: props.onClose,
						children: "Cancel",
					}),
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button button-primary",
						disabled: props.busy,
						onClick: handle_submit,
						children: props.busy ? "Saving…" : props.submitLabel,
					}),
				],
			}),
		],
	});
}
function ArchiveChannelDialog(props) {
	const titleId = useId();
	return /* @__PURE__ */ createVNode(Dialog, {
		labelledBy: titleId,
		onClose: props.onClose,
		children: [
			/* @__PURE__ */ createVNode("h2", {
				id: titleId,
				className: "dialog-title",
				children: ["Archive #", props.channelName, "?"],
			}),
			/* @__PURE__ */ createVNode("p", {
				children: "The channel is hidden from the list. Its messages stay stored and it can be unarchived any time.",
			}),
			props.error !== null
				? /* @__PURE__ */ createVNode("p", {
						className: "form-error",
						role: "alert",
						children: props.error,
					})
				: null,
			/* @__PURE__ */ createVNode("div", {
				className: "dialog-actions",
				children: [
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": true,
						disabled: props.busy,
						onClick: props.onClose,
						children: "Cancel",
					}),
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button button-danger",
						disabled: props.busy,
						onClick: props.onConfirm,
						children: props.busy ? "Archiving…" : "Archive channel",
					}),
				],
			}),
		],
	});
}
function App(props) {
	const { client } = props;
	const userId = client.context.userId;
	const memberNames = use_member_names(client);
	const [channels, setChannels] = useState([]);
	const [channelsLoaded, setChannelsLoaded] = useState(false);
	const [channelsDead, setChannelsDead] = useState(false);
	const [selectedKey, setSelectedKey] = useState(null);
	const [showArchived, setShowArchived] = useState(false);
	const [dialog, setDialog] = useState(null);
	const [dialogBusy, setDialogBusy] = useState(false);
	const [dialogError, setDialogError] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [announcement, setAnnouncement] = useState({
		sequence: 0,
		text: "",
	});
	const navRef = useRef(null);
	const drawerToggleRef = useRef(null);
	const announce = useCallback((text) => {
		setAnnouncement((current) => ({
			sequence: current.sequence + 1,
			text,
		}));
	}, []);
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_channel_doc);
		return client.data.watch(
			{
				collection: "channels",
				limit: 100,
			},
			(docs) => {
				if (docs === null) {
					setChannelsDead(true);
					return;
				}
				const sorted = [...store.apply_window(docs)].sort((a, b) => a.value.name.localeCompare(b.value.name));
				setChannels(sorted);
				setChannelsLoaded(true);
			},
		);
	}, [client]);
	useEffect(() => {
		if (selectedKey === null) {
			const firstActive = channels.find((channel) => channel.value.archivedAt === null);
			if (firstActive !== void 0) setSelectedKey(firstActive.key);
		}
	}, [channels, selectedKey]);
	useEffect(() => {
		if (drawerOpen) navRef.current?.focus();
	}, [drawerOpen]);
	const is_narrow = () => window.matchMedia("(max-width: 719px)").matches;
	const handle_select_channel = (channel) => {
		setSelectedKey(channel.key);
		announce(`#${channel.value.name}`);
		if (drawerOpen && is_narrow()) {
			setDrawerOpen(false);
			drawerToggleRef.current?.focus();
		}
	};
	const close_dialog = () => {
		setDialog(null);
		setDialogBusy(false);
		setDialogError(null);
	};
	const handle_create_channel = (name) => {
		setDialogBusy(true);
		setDialogError(null);
		const key = chat_create_channel_key();
		client.data
			.put({
				collection: "channels",
				key,
				value: {
					name,
					archivedAt: null,
				},
			})
			.then((result) => {
				if ("_nay" in result) {
					setDialogBusy(false);
					setDialogError(result._nay.message);
					return;
				}
				setSelectedKey(key);
				close_dialog();
			})
			.catch((error) => {
				setDialogBusy(false);
				setDialogError(chat_get_error_message(error));
			});
	};
	const put_channel_value = (channel, value) => {
		setDialogBusy(true);
		setDialogError(null);
		client.data
			.put({
				collection: "channels",
				key: channel.key,
				value,
				expectedRevision: channel.revision,
			})
			.then((result) => {
				if ("_nay" in result) {
					setDialogBusy(false);
					setDialogError(
						result._nay.name === "conflict"
							? "Someone else changed this channel while the dialog was open. Close it and try again."
							: result._nay.message,
					);
					return;
				}
				close_dialog();
			})
			.catch((error) => {
				setDialogBusy(false);
				setDialogError(chat_get_error_message(error));
			});
	};
	const handle_unarchive = (channel) => {
		client.data
			.put({
				collection: "channels",
				key: channel.key,
				value: {
					...channel.value,
					archivedAt: null,
				},
				expectedRevision: channel.revision,
			})
			.then((result) => {
				if ("_nay" in result) announce(result._nay.message);
			})
			.catch((error) => {
				announce(chat_get_error_message(error));
			});
	};
	if (channelsDead)
		return /* @__PURE__ */ createVNode("div", {
			className: "chitchat",
			children: /* @__PURE__ */ createVNode("div", {
				className: "page-dead",
				role: "alert",
				children: [
					/* @__PURE__ */ createVNode("h1", { children: "Chitchat" }),
					/* @__PURE__ */ createVNode("p", {
						children:
							"Access to this plugin's data ended — the plugin may have been disabled or your permissions changed. The composer is disabled. Reload the page after access is restored.",
					}),
				],
			}),
		});
	const visibleChannels = channels.filter((channel) => showArchived || channel.value.archivedAt === null);
	const selected = channels.find((channel) => channel.key === selectedKey) ?? null;
	return /* @__PURE__ */ createVNode("div", {
		className: "chitchat",
		children: [
			/* @__PURE__ */ createVNode("button", {
				ref: drawerToggleRef,
				type: "button",
				className: "button drawer-toggle",
				"aria-expanded": drawerOpen,
				onClick: () => setDrawerOpen((current) => !current),
				children: "Channels",
			}),
			/* @__PURE__ */ createVNode("nav", {
				ref: navRef,
				className: drawerOpen ? "sidebar is-open" : "sidebar",
				"aria-label": "Channels",
				tabIndex: -1,
				children: [
					/* @__PURE__ */ createVNode("div", {
						className: "sidebar-head",
						children: [
							/* @__PURE__ */ createVNode("h1", {
								className: "sidebar-title",
								children: "Chitchat",
							}),
							/* @__PURE__ */ createVNode("button", {
								type: "button",
								className: "button",
								onClick: () => setDialog({ kind: "create" }),
								children: "Create channel",
							}),
						],
					}),
					!channelsLoaded
						? /* @__PURE__ */ createVNode("div", {
								className: "channel-status",
								role: "status",
								children: "Loading channels…",
							})
						: visibleChannels.length === 0
							? /* @__PURE__ */ createVNode("div", {
									className: "channel-status",
									children: "No channels yet",
								})
							: /* @__PURE__ */ createVNode("ul", {
									className: "channel-list",
									children: visibleChannels.map((channel) =>
										/* @__PURE__ */ createVNode(
											"li",
											{
												className: "channel-item",
												children: [
													/* @__PURE__ */ createVNode("button", {
														type: "button",
														className: "channel-link",
														"aria-current": channel.key === selectedKey ? "page" : void 0,
														onClick: () => handle_select_channel(channel),
														children: ["#", channel.value.name, channel.value.archivedAt !== null ? " (archived)" : ""],
													}),
													/* @__PURE__ */ createVNode("span", {
														className: "channel-item-actions",
														children: [
															/* @__PURE__ */ createVNode("button", {
																type: "button",
																className: "button channel-item-action",
																"aria-label": `Rename #${channel.value.name}`,
																onClick: () =>
																	setDialog({
																		kind: "rename",
																		channel,
																	}),
																children: "Rename",
															}),
															channel.value.archivedAt === null
																? /* @__PURE__ */ createVNode("button", {
																		type: "button",
																		className: "button channel-item-action",
																		"aria-label": `Archive #${channel.value.name}`,
																		onClick: () =>
																			setDialog({
																				kind: "archive",
																				channel,
																			}),
																		children: "Archive",
																	})
																: /* @__PURE__ */ createVNode("button", {
																		type: "button",
																		className: "button channel-item-action",
																		"aria-label": `Unarchive #${channel.value.name}`,
																		onClick: () => handle_unarchive(channel),
																		children: "Unarchive",
																	}),
														],
													}),
												],
											},
											channel.key,
										),
									),
								}),
					/* @__PURE__ */ createVNode("button", {
						type: "button",
						className: "button sidebar-archived-toggle",
						"aria-pressed": showArchived,
						onClick: () => setShowArchived((current) => !current),
						children: "Show archived",
					}),
				],
			}),
			/* @__PURE__ */ createVNode("main", {
				className: "main",
				children:
					selected !== null
						? /* @__PURE__ */ createVNode(
								ChannelView,
								{
									client,
									userId,
									channel: selected,
									memberNames,
									announce,
								},
								selected.key,
							)
						: !channelsLoaded
							? /* @__PURE__ */ createVNode("div", {
									className: "channel-status",
									role: "status",
									children: "Loading channels…",
								})
							: channels.length === 0
								? /* @__PURE__ */ createVNode("div", {
										className: "channel-status",
										children: /* @__PURE__ */ createVNode("span", {
											children: "No channels yet — create the first one.",
										}),
									})
								: /* @__PURE__ */ createVNode("div", {
										className: "channel-status",
										children: "Select a channel.",
									}),
			}),
			dialog !== null && dialog.kind === "create"
				? /* @__PURE__ */ createVNode(ChannelNameDialog, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						busy: dialogBusy,
						error: dialogError,
						onSubmit: handle_create_channel,
						onClose: close_dialog,
					})
				: null,
			dialog !== null && dialog.kind === "rename"
				? /* @__PURE__ */ createVNode(ChannelNameDialog, {
						title: `Rename #${dialog.channel.value.name}`,
						submitLabel: "Rename",
						initialName: dialog.channel.value.name,
						busy: dialogBusy,
						error: dialogError,
						onSubmit: (name) =>
							put_channel_value(dialog.channel, {
								...dialog.channel.value,
								name,
							}),
						onClose: close_dialog,
					})
				: null,
			dialog !== null && dialog.kind === "archive"
				? /* @__PURE__ */ createVNode(ArchiveChannelDialog, {
						channelName: dialog.channel.value.name,
						busy: dialogBusy,
						error: dialogError,
						onConfirm: () =>
							put_channel_value(dialog.channel, {
								...dialog.channel.value,
								archivedAt: Date.now(),
							}),
						onClose: close_dialog,
					})
				: null,
			/* @__PURE__ */ createVNode("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ createVNode("span", {
						"data-announcement-sequence": String(announcement.sequence),
						children: announcement.sequence,
					}),
					announcement.text !== "" ? ` ${announcement.text}` : "",
				],
			}),
		],
	});
}
//#endregion
//#region src/main.tsx
function BootScreen(props) {
	return /* @__PURE__ */ createVNode("div", {
		className: props.isError ? "boot-screen is-error" : "boot-screen",
		role: props.isError ? "alert" : "status",
		"aria-live": props.isError ? void 0 : "polite",
		children: props.message,
	});
}
var container = document.getElementById("root");
if (!container) throw new Error("index.html is missing the #root element");
var root = createRoot(container);
root.render(/* @__PURE__ */ createVNode(BootScreen, { message: "Connecting…" }));
bonobo_ui_connect().then(
	(client) => {
		if (client.context.kind === "page") document.title = client.context.pageTitle;
		root.render(/* @__PURE__ */ createVNode(App, { client }));
	},
	(error) => {
		root.render(
			/* @__PURE__ */ createVNode(BootScreen, {
				message: error instanceof Error ? error.message : String(error),
				isError: true,
			}),
		);
	},
);
//#endregion
