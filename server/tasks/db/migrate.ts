import { migrate } from 'drizzle-orm/node-postgres/migrator';

export const runMigrations = async () => {
  const db = await useDatabase();
  try {
    await migrate(db, {
      migrationsFolder: 'server/db/migrations',
    });
    console.log('Database migrations done');
  } catch (error) {
    console.error('Database migrations failed', error);
  }
};

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },
  async run() {
    await runMigrations();
    return { result: undefined };
  },
});
