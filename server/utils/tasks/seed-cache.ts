import { desc, inArray, eq, count, and } from 'drizzle-orm';
import { jobPostingsTable, reviewTagsTable, metaDataTable } from '~~/server/db/schema';
import type { CareerSiteConfig, SEOConfig } from '~~/shared/schemas/setting';

export async function seedCache() {
  logger.info('Seeding Cache');
  const { remoteAssetBase } = useRuntimeConfig();

  const db = await useDatabase();
  const metadataEntries = await db
    .select()
    .from(metaDataTable)
    .where(inArray(metaDataTable.key, ['seoConfig', 'careerSiteConfig', 'firstSetupAccessKey']));

  const reviewTags = await db.select().from(reviewTagsTable);

  // Do not save totalApplicants in cache
  const jobPostings = (await db.select().from(jobPostingsTable).orderBy(desc(jobPostingsTable.createdAt))).map((p) => ({
    ...p,
    totalApplicants: -1,
  }));

  const totalActivePostings =
    (
      await db
        .select({ count: count(jobPostingsTable.id) })
        .from(jobPostingsTable)
        .where(and(eq(jobPostingsTable.isPublished, true), eq(jobPostingsTable.isExpired, false)))
    )[0]?.count || 0;

  const settings = {
    careerSite: {},
    seo: {},
  } as { careerSite: CareerSiteConfig; seo: SEOConfig }; // Ignore validation errors here.

  let firstSetupAccessKey: string | null = null;

  metadataEntries.forEach((s) => {
    if (s.key == 'seoConfig' && s.value) {
      settings.seo = JSON.parse(s.value);
    } else if (s.key == 'careerSiteConfig' && s.value) {
      settings.careerSite = JSON.parse(s.value);
    } else if (s.key == 'firstSetupAccessKey') {
      firstSetupAccessKey = s.value;
    }
  });

  await Promise.all([
    settings_memoryStorage.setItem('careerSiteConfig', settings.careerSite),
    settings_memoryStorage.setItem('seoConfig', settings.seo),
    general_memoryStorage.setItem('firstSetupAccessKey', firstSetupAccessKey),
    general_memoryStorage.setItem('remoteAssetBase', remoteAssetBase),
    general_memoryStorage.setItem('postings', jobPostings),
    general_memoryStorage.setItem('reviewTags', reviewTags),
    general_memoryStorage.setItem('totalActivePostings', totalActivePostings),
  ]);

  return { result: true };
}
