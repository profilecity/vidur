import { metaDataTable } from '../db/schema';
import type { SeedContext, SeedFn } from '../tasks/seed-database';

/**
 * Seed 1
 * (Initialise settings)
 */
export const seed1: SeedFn = async (ctx: SeedContext) => {
  const db = ctx.db;

  await db.insert(metaDataTable).values([
    {
      key: 'seoConfig',
      value: '{}',
    },
    {
      key: 'organizationConfig',
      value: '{}',
    },
  ]);
};
