import { seedDatabase, SeedPayload } from "../utils/tasks/seed-database";

export default defineTask<boolean>({
  meta: {
    name: 'seed-database',
    description: 'This task runs when Nitro server boots up. It initialises database with default metadata',
  },
  async run({ payload }) {
    const seedPayload = payload as SeedPayload;
    return seedDatabase(seedPayload);
  },
});
