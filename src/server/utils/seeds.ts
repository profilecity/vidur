import { metaDataTable } from '../db/schema';
import type { SeedFn } from '../tasks/seed-database';

/**
 * Seed 1
 * (Initialise settings)
 */
const seed1: SeedFn = async (ctx, _) => {
  const db = ctx.db;

  await db.insert(metaDataTable).values([
    {
      key: 'seoConfig',
      value: '{}',
    },
    {
      key: 'organizationConfig',
      value: '{ "links": [], "overview": { "socials": [] } }',
    },
  ]);
};

/**
 * Seed 2
 * (Initialise start key)
 */
const seed2: SeedFn = async (ctx, payload) => {
  const db = ctx.db;

  await db.insert(metaDataTable).values([
    {
      key: 'firstSetupAccessKey',
      value: payload.startKey,
    },
  ]);
};

export const seeds = [seed1, seed2];
