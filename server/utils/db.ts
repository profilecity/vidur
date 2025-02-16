import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';

import pg from 'pg';

let client: pg.Client | null;
let drizzleInstance: NodePgDatabase;

const isRunningLocally = () =>
  process.env.NUXT_DB_HOST?.includes('localhost') || process.env.NUXT_DB_HOST?.includes('127.0.0.1');

export async function useDatabase() {
  try {
    const config = useRuntimeConfig();
    if (client && drizzleInstance) return drizzleInstance;

    if (!config.db.host) throw new Error('Missing db.host in runtime config');

    client = new pg.Client({
      ...config.db,
      ssl: isRunningLocally()
        ? false
        : {
            rejectUnauthorized: false,
          },
    });

    await client.connect();

    drizzleInstance = drizzle(client);
    return drizzleInstance;
  } catch (error) {
    console.error('Error setting up database', error);
    process.exit(1);
  }
}
