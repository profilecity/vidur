import { randomUUID } from 'uncrypto';
import { seedDatabase, type SeedPayload } from '../utils/tasks/seed-database';

export default defineNitroPlugin(async () => {
  const startKey = randomUUID();

  const payload: SeedPayload = {
    startKey,
  };

  await seedDatabase(payload);
  await configureStorage();
  await configureCache();
  await logFirstAccessKeyIfPresent();
});
