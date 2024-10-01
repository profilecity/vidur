import { randomUUID } from 'uncrypto';
import { seedDatabase, type SeedPayload } from '../utils/tasks/seed-database';
import { dbMigrations } from '../db/migration';

export default defineNitroPlugin(async () => {
  const startKey = randomUUID();

  const payload: SeedPayload = {
    startKey,
  };

  await dbMigrations();
  await seedDatabase(payload);
  await configureStorage();
  await configureCache();
  await logFirstAccessKeyIfPresent();
});
