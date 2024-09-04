import { applicationCreateSchema } from '~/schemas/application';
import authenticateRequest from '../utils/auth';
import { and, count, eq } from 'drizzle-orm';
import { postingApplicantsTable } from '../db/schema';

export default defineEventHandler(async (event) => {
  const session = await authenticateRequest(event);
  const query = await getValidatedQuery(event, applicationCreateSchema.parse);

  if (IS_DEV) {
    console.log('checking user', session.user.id, 'applied', query.postingId);
  }

  const database = await useDatabase();

  const userAlreadyApplied =
    (
      await database
        .select({ count: count() })
        .from(postingApplicantsTable)
        .where(
          and(
            eq(postingApplicantsTable.postingId, query.postingId),
            eq(postingApplicantsTable.candidateId, session.user.id)
          )
        )
    )[0].count == 1;

  return { userAlreadyApplied };
});
