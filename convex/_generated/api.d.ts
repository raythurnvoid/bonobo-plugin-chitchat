/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as access from "../access.js";
import type * as auth from "../auth.js";
import type * as channel_members from "../channel_members.js";
import type * as channels from "../channels.js";
import type * as crons from "../crons.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as members from "../members.js";
import type * as messages from "../messages.js";
import type * as press from "../press.js";
import type * as reactions from "../reactions.js";
import type * as read_states from "../read_states.js";
import type * as sessions from "../sessions.js";
import type * as threads from "../threads.js";
import type * as transcripts from "../transcripts.js";
import type * as transcripts_cleanup from "../transcripts_cleanup.js";
import type * as transcripts_db from "../transcripts_db.js";
import type * as transcripts_grants from "../transcripts_grants.js";
import type * as transcripts_index from "../transcripts_index.js";
import type * as transcripts_secrets from "../transcripts_secrets.js";
import type * as transcripts_worker from "../transcripts_worker.js";
import type * as views from "../views.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  access: typeof access;
  auth: typeof auth;
  channel_members: typeof channel_members;
  channels: typeof channels;
  crons: typeof crons;
  files: typeof files;
  http: typeof http;
  members: typeof members;
  messages: typeof messages;
  press: typeof press;
  reactions: typeof reactions;
  read_states: typeof read_states;
  sessions: typeof sessions;
  threads: typeof threads;
  transcripts: typeof transcripts;
  transcripts_cleanup: typeof transcripts_cleanup;
  transcripts_db: typeof transcripts_db;
  transcripts_grants: typeof transcripts_grants;
  transcripts_index: typeof transcripts_index;
  transcripts_secrets: typeof transcripts_secrets;
  transcripts_worker: typeof transcripts_worker;
  views: typeof views;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
