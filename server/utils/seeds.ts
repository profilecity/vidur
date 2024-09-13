import { metaDataTable, reviewTagsTable } from '../db/schema';

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
      key: 'careerSiteConfig',
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

/**
 * Seeds 3
 * (Initialise review tags)
 */

const seed3: SeedFn = async (ctx, _) => {
  const db = ctx.db;

  await db.insert(reviewTagsTable).values([
    { title: 'Approved', parent: 4 },
    { title: 'Shortlisted', parent: 3 },
    { title: 'Rejected', parent: 2 },
    { title: 'Deferred', parent: 1 },
    { title: 'Pending', parent: 0 },
  ]);
};

export const seeds = [seed1, seed2, seed3];
