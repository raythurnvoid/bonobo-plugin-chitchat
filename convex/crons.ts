import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
crons.interval("refresh workspace access", { seconds: 30 }, internal.access.wake_installations, {
	paginationOpts: { cursor: null, numItems: 50 },
});
crons.interval("retry due transcript work", { minutes: 1 }, internal.transcripts_worker.sweep, {});
export default crons;
