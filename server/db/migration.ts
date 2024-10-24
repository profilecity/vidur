import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { useDatabase } from '../utils/db';

export const dbMigrations = async () => {
  const db = await useDatabase();

  try {
    await migrate(db, {
      migrationsFolder: 'server/db/migrations',
    });
    console.log('Database migrations done');
  } catch (err) {
    console.error('Database migrations failed', err);
  }
};
