import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
crons.interval("retry due transcript work", { minutes: 1 }, internal.transcripts_worker.sweep, {});
export default crons;
