import { randomUUID } from 'uncrypto';

export default defineNitroPlugin(async () => {
  const startKey = randomUUID();

  const payload: SeedPayload = {
    startKey,
  };

  await seedDatabase(payload);
  await configureStorage();
  await configureCache();
  await logFirstAccessKeyIfPresent();
  await replayCron();
});
