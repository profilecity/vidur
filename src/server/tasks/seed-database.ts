import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { metaDataTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { seeds } from '../utils/seeds';

export type SeedContext = { db: NodePgDatabase };
export type SeedPayload = { startKey: string };
export type SeedFn = (ctx: SeedContext, payload: SeedPayload) => Promise<void> | void;

const seedDatabase = async (payload: SeedPayload) => {
  const db = await useDatabase();

  const dbResponse = await db.select().from(metaDataTable).where(eq(metaDataTable.key, 'seedVersion'));

  const currentSeedVersion = dbResponse.length > 0 ? parseInt(dbResponse[dbResponse.length - 1].value || '0') : 0;
  const seedingForFirstTime = !(dbResponse.length > 0);

  console.log('Current Seed Version', currentSeedVersion, 'Total Seed Versions', seeds.length);

  let success = true;

  await db.transaction(async (tx) => {
    const seedCtx: SeedContext = { db: tx };

    for (let index = currentSeedVersion; index < seeds.length; index++) {
      const seedFn = seeds[index];
      console.log('Applying SeedCTX', index + 1);
      try {
        await seedFn(seedCtx, payload);
      } catch (e) {
        console.error('Error applying seed', index, e);
        console.log('Rolling back...');
        tx.rollback();
        success = false;
        break;
      }
    }
    const updatedSeedVersion = seeds.length.toString();
    if (seedingForFirstTime) {
      await tx.insert(metaDataTable).values({ key: 'seedVersion', value: updatedSeedVersion });
    } else {
      await tx
        .update(metaDataTable)
        .set({ value: updatedSeedVersion, updatedAt: new Date() })
        .where(eq(metaDataTable.key, 'seedVersion'));
    }
  });

  return success;
};

export default defineTask<boolean>({
  meta: {
    name: 'seed-database',
    description: 'This task runs when Nitro server boots up. It initialises database with default metadata',
  },
  async run({ payload }) {
    const seedPayload = payload as SeedPayload;

    console.log('Seeding Database');
    const result = await seedDatabase(seedPayload);
    return {
      result,
    };
  },
});
