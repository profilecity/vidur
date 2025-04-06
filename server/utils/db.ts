import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';

import pg from 'pg';

let client: pg.Client | null;
let drizzleInstance: NodePgDatabase;

const isRunningLocally = () =>
  process.env.NUXT_DB_HOST?.includes('localhost') || process.env.NUXT_DB_HOST?.includes('127.0.0.1');

export async function useDatabase() {
  try {
    const config = useRuntimeConfig();
    if (client && drizzleInstance) {
      logger.info('Reusing existing database connection.');
      return drizzleInstance;
    }

    if (!config.db.host) throw new Error('Missing db.host in runtime config');

    client = new pg.Client({
      ...config.db,
      ssl: isRunningLocally()
        ? false
        : {
            rejectUnauthorized: false,
          },
    });
    logger.start('Connecting to PostgreSQL');
    await client.connect();
    logger.success('Connected to PostgreSQL');

    drizzleInstance = drizzle(client);
    return drizzleInstance;
  } catch (error) {
    logger.error('Error setting up database', error);
    process.exit(1);
  }
}
