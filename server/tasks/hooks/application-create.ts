import { eq, inArray } from 'drizzle-orm';
import { hooksTable, jobPostingsTable, adminsTable } from '~~/server/db/schema';

export default defineTask<boolean>({
  meta: {
    name: 'hooks:application-created',
    description: 'Post processing for applications',
  },
  async run({ payload }) {
    const postingId = payload.postingId as string;
    const applicantId = payload.applicantId as string;
    const bearerToken = payload.bearerToken as string;

    if (!bearerToken) {
      logger.error('hooks:application-create', 'bearer token missing from payload. aborting as failure...');
      return { result: false };
    }

    const db = await useDatabase();

    const hooks = await db.select().from(hooksTable);

    if (hooks.length == 0) {
      if (IS_DEV) {
        logger.info('hooks:application-create', 'no-hooks-found. aborting as success...');
      }
      return { result: true };
    }

    const applicantResult = await db
      .select({
        id: adminsTable.id,
        firstName: adminsTable.firstName,
        lastName: adminsTable.lastName,
        email: adminsTable.email,
      })
      .from(adminsTable)
      .where(eq(adminsTable.id, applicantId));

    if (!(Array.isArray(applicantResult) && applicantResult.length == 1)) {
      logger.error('hooks:application-create', 'no applicant found. applicant id', applicantId);
      return { result: false };
    }

    const applicant = applicantResult[0];

    const jobPostingsResult = await db
      .select({
        id: jobPostingsTable.id,
        title: jobPostingsTable.title,
      })
      .from(jobPostingsTable)
      .where(eq(jobPostingsTable.id, postingId));

    if (!(Array.isArray(applicantResult) && applicantResult.length == 1)) {
      logger.error('hooks:application-create', 'no posting found. posting id', postingId);
      return { result: false };
    }

    const posting = jobPostingsResult[0];

    const hookIds = hooks.map((h) => h.id);

    for (let index = 0; index < hooks.length; index++) {
      const hook = hooks[index];

      if (!hook) continue;
      // TODO: respect preferences. to be implemented later.

      if (IS_DEV) {
        logger.info(
          'calling hooks:application-create hook',
          hook.url,
          'applicantId',
          applicantId,
          'postingId',
          postingId
        );
      }

      $fetch(hook.url, {
        // No await. just send.
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: {
          posting,
          applicant,
        },
      }).catch((e) => {
        logger.error(
          'failed calling hooks:application-create hook',
          hook.url,
          'applicantId',
          applicantId,
          'postingId',
          postingId,
          IS_DEV ? e : undefined
        );
      });
    }

    const lastExecutedAt = new Date();
    await db.update(hooksTable).set({ lastExecutedAt }).where(inArray(hooksTable.id, hookIds));

    return { result: true };
  },
});
