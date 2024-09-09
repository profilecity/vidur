import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { seeds } from '../seeds';
import { metaDataTable } from '~~/server/db/schema';

export type SeedContext = { db: NodePgDatabase };
export type SeedPayload = { startKey: string };
export type SeedFn = (ctx: SeedContext, payload: SeedPayload) => Promise<void> | void;

export async function seedDatabase(payload: SeedPayload) {
  console.log('Seeding Database');

  const db = await useDatabase();

  const dbResponse = await db.select().from(metaDataTable).where(eq(metaDataTable.key, 'seedVersion'));

  const currentSeedVersion = dbResponse.length > 0 ? parseInt(dbResponse[dbResponse.length - 1]?.value || '0') : 0;
  const seedingForFirstTime = !(dbResponse.length > 0);

  console.log('Current Seed Version', currentSeedVersion, 'Total Seed Versions', seeds.length);

  let success = true;

  await db.transaction(async (tx) => {
    const seedCtx: SeedContext = { db: tx };

    for (let index = currentSeedVersion; index < seeds.length; index++) {
      const seedFn = seeds[index];
      if (!seedFn) throw new Error('Invalid SeedCTX at index ' + (index + 1));
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

  return { result: success };
}
