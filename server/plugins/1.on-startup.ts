import { randomUUID } from 'uncrypto';
import { seedDatabase, type SeedPayload } from '../utils/tasks/seed-database';
import { runMigrations } from '../tasks/db/migrate';

export default defineNitroPlugin(async () => {
  const startKey = randomUUID();

  const payload: SeedPayload = {
    startKey,
  };

  await runMigrations();
  await seedDatabase(payload);
  await configureStorage();
  await configureCache();
  await logFirstAccessKeyIfPresent();
  await replayCron();
});
