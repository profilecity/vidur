import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type ReplayCronCtx = {
  db: NodePgDatabase;
};

/**
 * This function is responsible to perform tasks which would rather have
 * been performed by a cron job if server were running.
 */
export async function replayCron() {
  await runTask('cron:expire-postings');
}
