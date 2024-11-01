import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';

import pg from 'pg';

let client: pg.Client | null;
let drizzleInstance: NodePgDatabase;

export async function useDatabase() {
  const config = useRuntimeConfig();
  if (client && drizzleInstance) return drizzleInstance;

  if (!config.db.host) throw new Error('Missing db.host in runtime config');

  client = new pg.Client({
    ...config.db,
    ssl: IS_DEV
      ? false
      : {
          rejectUnauthorized: false, // TODO: fix this.
        },
  });
  await client.connect();

  drizzleInstance = drizzle(client, { casing: 'snake_case' });
  return drizzleInstance;
}
