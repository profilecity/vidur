import { randomUUID } from "uncrypto";
import { seedDatabase, SeedPayload } from "../utils/tasks/seed-database";

export default defineNitroPlugin(async () => {
  const startKey = randomUUID();

  const payload: SeedPayload = {
    startKey,
  }

  await seedDatabase(payload)
})