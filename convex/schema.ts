import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
	chat_attachment,
	chat_member_level,
	chat_reaction_token,
	chat_transcript_operation,
	chat_write_receipt,
} from "../shared/chat";

export default defineSchema({
	installations: defineTable({
		hostInstallationId: v.string(),
		hostOrganizationId: v.string(),
		hostWorkspaceId: v.string(),
		hostPluginVersionId: v.string(),
		hostServiceAccountId: v.string(),
		organizationOwnerUserId: v.string(),
		status: v.union(v.literal("bootstrapping"), v.literal("ready"), v.literal("blocked"), v.literal("revoked")),
		appliedAccessRevision: v.number(),
		invalidatedAtRevision: v.number(),
		bootstrapStartRevision: v.union(v.number(), v.null()),
		bootstrapCursor: v.union(v.string(), v.null()),
		bootstrapPhase: v.union(v.literal("members"), v.literal("cleanup"), v.literal("events")),
		bootstrapTargetRevision: v.number(),
		generation: v.string(),
		outputRoot: v.union(v.string(), v.null()),
	}).index("by_hostInstallationId", ["hostInstallationId"]),
	workspace_members: defineTable({
		installationId: v.id("installations"),
		hostUserId: v.string(),
		hostMembershipId: v.union(v.string(), v.null()),
		membershipLifetime: v.number(),
		active: v.boolean(),
		displayName: v.union(v.string(), v.null()),
		revision: v.number(),
		canRead: v.boolean(),
		canWrite: v.boolean(),
		isOwner: v.boolean(),
		cleanupPending: v.boolean(),
	})
		.index("by_installation_hostUserId", ["installationId", "hostUserId"])
		.index("by_installation_active_hostUserId", ["installationId", "active", "hostUserId"])
		.index("by_installation_revision", ["installationId", "revision"])
		.index("by_installation_cleanupPending", ["installationId", "cleanupPending"]),
	sessions: defineTable({
		installationId: v.id("installations"),
		hostSessionId: v.string(),
		exchangeId: v.string(),
		hostUserId: v.string(),
		hostMembershipId: v.string(),
		membershipLifetime: v.number(),
		requiredRevision: v.number(),
		validatedAt: v.number(),
		expiresAt: v.number(),
		canRead: v.boolean(),
		canWrite: v.boolean(),
		isOwner: v.boolean(),
		displayName: v.union(v.string(), v.null()),
		revokedAt: v.union(v.number(), v.null()),
		revokedRevision: v.union(v.number(), v.null()),
		expiryJobId: v.union(v.id("_scheduled_functions"), v.null()),
	})
		.index("by_hostSessionId", ["hostSessionId"])
		.index("by_expiresAt", ["expiresAt"]),
	revoked_sessions: defineTable({
		installationId: v.id("installations"),
		hostSessionId: v.string(),
		revision: v.number(),
	}).index("by_hostSessionId", ["hostSessionId"]),
	attachment_proofs: defineTable({
		installationId: v.id("installations"),
		hostUserId: v.string(),
		membershipLifetime: v.number(),
		fileNodeId: v.string(),
		name: v.string(),
		expiresAt: v.number(),
	})
		.index("by_installation_hostUserId_fileNodeId", ["installationId", "hostUserId", "fileNodeId"])
		.index("by_expiresAt", ["expiresAt"]),
	channels: defineTable({
		installationId: v.id("installations"),
		generation: v.string(),
		publicId: v.string(),
		visibility: v.union(v.literal("public"), v.literal("private")),
		name: v.string(),
		sortName: v.string(),
		topic: v.string(),
		createdBy: v.string(),
		createdAt: v.number(),
		revision: v.number(),
		membershipRevision: v.number(),
		memberCount: v.number(),
		archivedAt: v.union(v.number(), v.null()),
		deletedAt: v.union(v.number(), v.null()),
		lastRootSequence: v.number(),
		lastReplySequence: v.number(),
		lastRootAt: v.number(),
		lastReplyAt: v.number(),
		transcriptSlug: v.string(),
	})
		.index("by_installation_visibility_archivedAt_sortName", ["installationId", "visibility", "archivedAt", "sortName"])
		.index("by_installation_publicId", ["installationId", "publicId"])
		.index("by_installation_generation_transcriptSlug", ["installationId", "generation", "transcriptSlug"]),
	channel_members: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		hostUserId: v.string(),
		membershipLifetime: v.number(),
		level: chat_member_level,
		joinedAt: v.number(),
	})
		.index("by_channel_hostUserId", ["channelId", "hostUserId"])
		.index("by_installation_hostUserId_channel", ["installationId", "hostUserId", "channelId"])
		.index("by_installation_hostUserId_membershipLifetime", ["installationId", "hostUserId", "membershipLifetime"]),
	channel_access_changes: defineTable({
		channelId: v.id("channels"),
		installationId: v.id("installations"),
		actorHostUserId: v.string(),
		actorLifetime: v.number(),
		clientRequestId: v.string(),
		operation: v.string(),
		fingerprint: v.string(),
		expectedMembershipRevision: v.number(),
		readerRevision: v.number(),
		principals: v.array(v.object({ hostUserId: v.string(), membershipLifetime: v.number(), level: chat_member_level })),
		deleted: v.boolean(),
		left: v.boolean(),
		status: v.union(v.literal("pending"), v.literal("complete"), v.literal("cancelled")),
		createdAt: v.number(),
		hostReceiptId: v.union(v.string(), v.null()),
	})
		.index("by_channel_status", ["channelId", "status"])
		.index("by_installation_actorHostUserId_clientRequestId", ["installationId", "actorHostUserId", "clientRequestId"]),
	messages: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		visibility: v.union(v.literal("public"), v.literal("private")),
		rootMessageId: v.union(v.id("messages"), v.null()),
		publicId: v.string(),
		marker: v.string(),
		authorHostUserId: v.string(),
		authorName: v.union(v.string(), v.null()),
		createdAt: v.number(),
		sequence: v.number(),
		channelReplySequence: v.union(v.number(), v.null()),
		text: v.string(),
		attachments: v.array(chat_attachment),
		mentions: v.array(v.string()),
		revision: v.number(),
		editedAt: v.union(v.number(), v.null()),
		deletedAt: v.union(v.number(), v.null()),
	})
		.index("by_channel_rootMessage_sequence", ["channelId", "rootMessageId", "sequence"])
		.index("by_channel_channelReplySequence", ["channelId", "channelReplySequence"])
		.index("by_rootMessage_deletedAt_sequence", ["rootMessageId", "deletedAt", "sequence"])
		.index("by_channel_rootMessage_author_deletedAt_sequence", [
			"channelId",
			"rootMessageId",
			"authorHostUserId",
			"deletedAt",
			"sequence",
		])
		.index("by_installation_publicId", ["installationId", "publicId"])
		.index("by_installation_visibility_rootMessage_createdAt", [
			"installationId",
			"visibility",
			"rootMessageId",
			"createdAt",
		]),
	thread_summaries: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		visibility: v.union(v.literal("public"), v.literal("private")),
		rootMessageId: v.id("messages"),
		totalReplyCount: v.number(),
		activeReplyCount: v.number(),
		lastReplySequence: v.number(),
		latestReplyAt: v.union(v.number(), v.null()),
		latestActiveReplyId: v.union(v.id("messages"), v.null()),
		latestActiveReplyAt: v.union(v.number(), v.null()),
		revision: v.number(),
	})
		.index("by_rootMessage", ["rootMessageId"])
		.index("by_installation_visibility_latestActiveReplyAt", ["installationId", "visibility", "latestActiveReplyAt"]),
	reactions: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		messageId: v.id("messages"),
		hostUserId: v.string(),
		token: chat_reaction_token,
	})
		.index("by_message_token_hostUserId", ["messageId", "token", "hostUserId"])
		.index("by_message_hostUserId", ["messageId", "hostUserId"]),
	reaction_counts: defineTable({ messageId: v.id("messages"), token: chat_reaction_token, count: v.number() }).index(
		"by_message_token",
		["messageId", "token"],
	),
	read_states: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		hostUserId: v.string(),
		membershipLifetime: v.number(),
		rootSequence: v.number(),
		replySequence: v.number(),
		revision: v.number(),
	})
		.index("by_channel_hostUserId", ["channelId", "hostUserId"])
		.index("by_installation_hostUserId_membershipLifetime", ["installationId", "hostUserId", "membershipLifetime"]),
	thread_read_states: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		rootMessageId: v.id("messages"),
		hostUserId: v.string(),
		membershipLifetime: v.number(),
		replySequence: v.number(),
	})
		.index("by_rootMessage_hostUserId", ["rootMessageId", "hostUserId"])
		.index("by_installation_hostUserId_membershipLifetime", ["installationId", "hostUserId", "membershipLifetime"]),
	channel_author_activity: defineTable({
		channelId: v.id("channels"),
		authorHostUserId: v.string(),
		latestRootMessageId: v.id("messages"),
		latestSequence: v.number(),
		latestAt: v.number(),
	})
		.index("by_channel_authorHostUserId", ["channelId", "authorHostUserId"])
		.index("by_channel_latestSequence", ["channelId", "latestSequence"]),
	mentions: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		messageId: v.id("messages"),
		recipientHostUserId: v.string(),
		sequence: v.number(),
	})
		.index("by_channel_recipient_sequence", ["channelId", "recipientHostUserId", "sequence"])
		.index("by_message", ["messageId"]),
	request_results: defineTable({
		installationId: v.id("installations"),
		actorHostUserId: v.string(),
		clientRequestId: v.string(),
		operation: v.string(),
		fingerprint: v.string(),
		result: chat_write_receipt,
		createdAt: v.number(),
	}).index("by_installation_actorHostUserId_clientRequestId", ["installationId", "actorHostUserId", "clientRequestId"]),
	transcript_channels: defineTable({
		channelId: v.id("channels"),
		desiredSequence: v.number(),
		renderedSequence: v.number(),
		appliedSequence: v.number(),
		workerGeneration: v.number(),
		status: v.union(v.literal("pending"), v.literal("running"), v.literal("blocked"), v.literal("ready")),
		error: v.union(v.string(), v.null()),
		nextAttemptAt: v.number(),
		readerRevision: v.number(),
	})
		.index("by_channel", ["channelId"])
		.index("by_status_nextAttemptAt", ["status", "nextAttemptAt"]),
	// Deletion waits for its accepted copies, then archives exact transcript files in bounded steps.
	transcript_deletions: defineTable({
		channelId: v.id("channels"),
		installationId: v.id("installations"),
		actorHostUserId: v.union(v.string(), v.null()),
		actorLifetime: v.union(v.number(), v.null()),
		barrier: v.number(),
		archiveStartedAt: v.union(v.number(), v.null()),
		completedAt: v.union(v.number(), v.null()),
		cursor: v.number(),
		claim: v.string(),
		leaseUntil: v.number(),
		nextAttemptAt: v.number(),
		error: v.union(v.string(), v.null()),
		prepared: v.union(
			v.object({
				fileId: v.id("transcript_files"),
				order: v.number(),
				path: v.string(),
				nodeId: v.string(),
				writerGeneration: v.number(),
				operationId: v.string(),
			}),
			v.null(),
		),
	})
		.index("by_channel", ["channelId"])
		.index("by_completedAt_nextAttemptAt", ["completedAt", "nextAttemptAt"])
		.index("by_installation_completedAt", ["installationId", "completedAt"])
		.index("by_installation_actor_lifetime_completedAt", ["installationId", "actorHostUserId", "actorLifetime", "completedAt"]),
	transcript_jobs: defineTable({
		channelId: v.id("channels"),
		sequence: v.number(),
		operation: chat_transcript_operation,
		status: v.union(
			v.literal("pending"),
			v.literal("running"),
			v.literal("blocked"),
			v.literal("complete"),
			v.literal("superseded"),
		),
		attempts: v.number(),
		nextAttemptAt: v.number(),
		workerGeneration: v.number(),
		createdAt: v.number(),
		error: v.union(v.string(), v.null()),
	})
		.index("by_channel_sequence", ["channelId", "sequence"])
		.index("by_channel_kind_status_sequence", ["channelId", "operation.kind", "status", "sequence"])
		.index("by_kind_status_nextAttemptAt", ["operation.kind", "status", "nextAttemptAt"])
		.index("by_status_nextAttemptAt", ["status", "nextAttemptAt"]),
	transcript_indexes: defineTable({
		installationId: v.id("installations"),
		grantChannelId: v.optional(v.id("channels")),
		generation: v.string(),
		desiredSequence: v.number(),
		appliedSequence: v.number(),
		foldedSequence: v.number(),
		entryBytes: v.number(),
		entryCount: v.number(),
		activeRunId: v.union(v.id("transcript_index_runs"), v.null()),
		nodeId: v.union(v.string(), v.null()),
		contentRevision: v.union(v.string(), v.null()),
		writerId: v.union(v.string(), v.null()),
		writerGeneration: v.number(),
		parentNodeId: v.union(v.string(), v.null()),
		status: v.union(v.literal("pending"), v.literal("running"), v.literal("blocked"), v.literal("ready")),
		error: v.union(v.string(), v.null()),
	})
		.index("by_installation_generation", ["installationId", "generation"])
		.index("by_status", ["status"]),
	transcript_index_jobs: defineTable({
		indexId: v.id("transcript_indexes"),
		sequence: v.number(),
		channelId: v.id("channels"),
		name: v.string(),
		slug: v.string(),
		active: v.boolean(),
		status: v.union(v.literal("pending"), v.literal("complete")),
	}).index("by_index_sequence", ["indexId", "sequence"]),

	// Transcript attempts keep their inputs until all host receipts and placements are saved.
	host_grants: defineTable({
		installationId: v.id("installations"),
		channelId: v.id("channels"),
		sponsorUserId: v.string(),
		sponsorLifetime: v.number(),
		clientRequestId: v.string(),
		rootPath: v.string(),
		selectIndexOnReady: v.boolean(),
		phase: v.union(
			v.literal("exchange"),
			v.literal("renew"),
			v.literal("seal"),
			v.literal("ready"),
			v.literal("blocked"),
		),
		lifecycleRequestId: v.string(),
		sourceSecret: v.string(),
		interactiveSecret: v.union(v.string(), v.null()),
		interactiveExpiresAt: v.number(),
		sealedSecret: v.union(v.string(), v.null()),
		sealedExpiresAt: v.number(),
		error: v.union(v.string(), v.null()),
		updatedAt: v.number(),
	})
		.index("by_channel", ["channelId"])
		.index("by_installation", ["installationId"])
		.index("by_updatedAt", ["updatedAt"])
		.index("by_phase_updatedAt", ["phase", "updatedAt"]),
	transcript_requests: defineTable({
		installationId: v.id("installations"),
		actorUserId: v.string(),
		actorLifetime: v.number(),
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		operation: v.union(v.literal("connect"), v.literal("reconcile")),
		runId: v.union(v.id("transcript_runs"), v.null()),
		grantId: v.union(v.id("host_grants"), v.null()),
	}).index("by_installation_actor_request", ["installationId", "actorUserId", "clientRequestId"]),
	transcript_destinations: defineTable({
		channelId: v.id("channels"),
		writerId: v.string(),
		rootWriterId: v.string(),
		rootNodeId: v.string(),
		folderNodeId: v.string(),
		folderPath: v.string(),
		writerGeneration: v.number(),
		readerRevision: v.union(v.number(), v.null()),
		detached: v.boolean(),
		header: v.string(),
		tailOrder: v.number(),
		runId: v.union(v.id("transcript_runs"), v.null()),
		readerRunId: v.union(v.id("transcript_runs"), v.null()),
		readerError: v.union(v.string(), v.null()),
	}).index("by_channel", ["channelId"]),
	transcript_runs: defineTable({
		channelId: v.id("channels"),
		recoveryRunId: v.union(v.id("transcript_runs"), v.null()),
		barrier: v.number(),
		kind: v.union(v.literal("incremental"), v.literal("reconcile"), v.literal("readers")),
		fenceUncertain: v.boolean(),
		phase: v.union(
			v.literal("recover"),
			v.literal("fence"),
			v.literal("copy"),
			v.literal("fold"),
			v.literal("stage"),
			v.literal("prepare"),
			v.literal("validate"),
			v.literal("publish"),
			v.literal("archive"),
			v.literal("place"),
			v.literal("finish"),
			v.literal("activate"),
			v.literal("jobs"),
			v.literal("complete"),
		),
		writerGeneration: v.number(),
		leaseUntil: v.number(),
		claim: v.string(),
		startOrder: v.number(),
		endOrder: v.number(),
		cursor: v.union(v.string(), v.null()),
		foldedSequence: v.number(),
		header: v.string(),
		outputOrder: v.number(),
		buffer: v.string(),
		outputCount: v.number(),
		error: v.union(v.string(), v.null()),
		createdAt: v.number(),
		readerReceiptId: v.union(v.string(), v.null()),
		readerOriginalReceiptId: v.union(v.string(), v.null()),
		readerSourceSecret: v.union(v.string(), v.null()),
		readerRollbackSecret: v.union(v.string(), v.null()),
		readerAttempt: v.number(),
		readerRefresh: v.boolean(),
		readerStep: v.number(),
		readerSnapshot: v.union(
			v.object({
				revision: v.number(),
				readers: v.array(v.object({ userId: v.string(), membershipLifetime: v.number() })),
			}),
			v.null(),
		),
	}).index("by_channel", ["channelId"]),
	transcript_files: defineTable({
		channelId: v.id("channels"),
		order: v.number(),
		path: v.string(),
		nodeId: v.string(),
		contentRevision: v.string(),
		content: v.string(),
		header: v.string(),
		active: v.boolean(),
	}).index("by_channel_active_order", ["channelId", "active", "order"]),
	transcript_paths: defineTable({
		channelId: v.id("channels"),
		path: v.string(),
		fileId: v.id("transcript_files"),
		archived: v.boolean(),
	})
		.index("by_channel_path", ["channelId", "path"])
		.index("by_channel_archived_path", ["channelId", "archived", "path"]),
	transcript_blocks: defineTable({
		channelId: v.id("channels"),
		messageId: v.id("messages"),
		rootSequence: v.number(),
		replySequence: v.number(),
		text: v.string(),
		fileId: v.id("transcript_files"),
		start: v.number(),
		end: v.number(),
		sourceRevision: v.number(),
	})
		.index("by_message", ["messageId"])
		.index("by_channel_rootSequence_replySequence", ["channelId", "rootSequence", "replySequence"])
		.index("by_file_start", ["fileId", "start"]),
	transcript_staged_blocks: defineTable({
		runId: v.id("transcript_runs"),
		messageId: v.id("messages"),
		rootSequence: v.number(),
		replySequence: v.number(),
		text: v.string(),
		prefix: v.string(),
		suffix: v.string(),
		sourceRevision: v.number(),
		outputOrder: v.union(v.number(), v.null()),
		start: v.number(),
		end: v.number(),
		placed: v.boolean(),
	})
		.index("by_run_message", ["runId", "messageId"])
		.index("by_run_rootSequence_replySequence", ["runId", "rootSequence", "replySequence"])
		.index("by_run_placed", ["runId", "placed"]),
	transcript_writes: defineTable({
		runId: v.id("transcript_runs"),
		order: v.number(),
		path: v.string(),
		content: v.string(),
		contentHash: v.string(),
		expectedParentNodeId: v.string(),
		expectedNodeId: v.union(v.string(), v.null()),
		expectedContentRevision: v.union(v.string(), v.null()),
		expectedReaderRevision: v.union(v.number(), v.null()),
		operationId: v.string(),
		nodeId: v.union(v.string(), v.null()),
		contentRevision: v.union(v.string(), v.null()),
		fileId: v.union(v.id("transcript_files"), v.null()),
		status: v.union(v.literal("staged"), v.literal("prepared"), v.literal("published"), v.literal("discarded")),
	})
		.index("by_run_order", ["runId", "order"])
		.index("by_run_status_order", ["runId", "status", "order"]),
	transcript_inputs: defineTable({
		runId: v.id("transcript_runs"),
		fileId: v.id("transcript_files"),
		order: v.number(),
		path: v.string(),
		nodeId: v.string(),
		contentRevision: v.string(),
		tail: v.string(),
		archived: v.boolean(),
	})
		.index("by_run_order", ["runId", "order"])
		.index("by_run_path", ["runId", "path"]),
	transcript_index_entries: defineTable({
		indexId: v.id("transcript_indexes"),
		channelId: v.id("channels"),
		name: v.string(),
		slug: v.string(),
	})
		.index("by_index_channel", ["indexId", "channelId"])
		.index("by_index", ["indexId"]),
	transcript_index_runs: defineTable({
		indexId: v.id("transcript_indexes"),
		grantChannelId: v.id("channels"),
		barrier: v.number(),
		phase: v.union(
			v.literal("fence"),
			v.literal("fold"),
			v.literal("render"),
			v.literal("publish"),
			v.literal("complete"),
		),
		reconcile: v.boolean(),
		reconcileAfterPublish: v.boolean(),
		cursor: v.union(v.string(), v.null()),
		entries: v.array(v.object({ name: v.string(), slug: v.string() })),
		content: v.string(),
		leaseUntil: v.number(),
		retryAt: v.number(),
		failures: v.number(),
		claim: v.string(),
		expectedNodeId: v.union(v.string(), v.null()),
		expectedContentRevision: v.union(v.string(), v.null()),
		prepared: v.boolean(),
		writerId: v.string(),
		writerGeneration: v.number(),
		parentNodeId: v.string(),
	}).index("by_index", ["indexId"]),
});
