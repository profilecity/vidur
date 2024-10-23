import { applicationCreateSchema } from '~~/shared/schemas/application';
import authenticateRequest from '../utils/auth';
import { and, count, eq, sql } from 'drizzle-orm';
import { jobPostingsTable, postingApplicantsTable } from '../db/schema';

export default defineEventHandler(async (event) => {
  const session = await authenticateRequest(event);
  const body = await readValidatedBody(event, applicationCreateSchema.parse);

  if (IS_DEV) {
    console.log('user', session.user.id, 'applying to', body.postingId);
  }

  const database = await useDatabase();

  const postingExistsAndIsPublished =
    ((
      await database
        .select({ count: count() })
        .from(jobPostingsTable)
        .where(
          and(
            eq(jobPostingsTable.id, body.postingId),
            eq(jobPostingsTable.isPublished, true),
            eq(jobPostingsTable.isExpired, false)
          )
        )
    )[0]?.count || 0) == 1;

  if (!postingExistsAndIsPublished) {
    if (IS_DEV) {
      console.log('posting not found.', 'applying to', body.postingId);
    }
    throw createError({
      statusCode: 404,
      message: 'Posting Not Found',
    });
  }

  const userAlreadyApplied =
    ((
      await database
        .select({ count: count() })
        .from(postingApplicantsTable)
        .where(
          and(
            eq(postingApplicantsTable.postingId, body.postingId),
            eq(postingApplicantsTable.candidateId, session.user.id)
          )
        )
    )[0]?.count || 0) == 1;

  if (userAlreadyApplied) {
    if (IS_DEV) {
      console.log('user already applied. userId', session.user.id, 'applying to', body.postingId);
    }
    throw createError({
      statusCode: 400,
      message: 'Already Applied',
    });
  }

  await database.transaction(async (tx) => {
    const p1 = tx.insert(postingApplicantsTable).values({
      candidateId: session.user.id,
      postingId: body.postingId,
    });

    const p2 = tx
      .update(jobPostingsTable)
      .set({ totalApplicants: sql`${jobPostingsTable.totalApplicants} + 1` })
      .where(eq(jobPostingsTable.id, body.postingId));

    await Promise.all([p1, p2]);
  });

  if (IS_DEV) {
    console.log('calling hook:application-create');
  }

  // Don't await for task.
  runTask('hooks:application-create', {
    payload: {
      applicantId: session.user.id,
      postingId: body.postingId,
      bearerToken: session.accessToken,
    },
  });

  if (IS_DEV) {
    console.log('user', session.user.id, "'s application successful for", body.postingId);
  }
});
