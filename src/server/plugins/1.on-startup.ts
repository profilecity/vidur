import { randomUUID } from "uncrypto";
import { SeedPayload } from "../tasks/seed-database";

export default defineNitroPlugin(async () => {
  const startKey = randomUUID();

  const payload: SeedPayload = {
    startKey,
  }

  runTask('seed-database', { payload });
})