import { eq, inArray } from 'drizzle-orm';
import { postingApplicantsTable, User, UserHandle, userHandlesTable, usersTable } from '../db/schema';
import authenticateAdminRequest from '../utils/admin';
import { applicationsLookupSchema } from '~/schemas/application';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const query = await getValidatedQuery(event, (q: any) => {
    const postingIdsCSV = q.postingIds;
    const postingIds: string[] = [];
    if (postingIdsCSV && typeof postingIdsCSV === 'string') {
      postingIds.push(...postingIdsCSV.split(',').map((p) => p.trim()));
    }
    return applicationsLookupSchema.parse({ postingIds });
  });

  if (query.postingIds.length == 0) {
    if (IS_DEV) {
      console.log('applications lookup', 'no posting ids found in query');
    }
    return {
      applications: [],
      applicants: {},
    };
  }

  const db = await useDatabase();

  const applications = await db
    .select()
    .from(postingApplicantsTable)
    .where(inArray(postingApplicantsTable.postingId, query.postingIds));

  const applicantIdsMayContainDuplicate = applications.map((a) => a.candidateId);
  const applicantIds: string[] = [];

  new Set(applicantIdsMayContainDuplicate).forEach((e) => e && applicantIds.push(e));

  const applicantRecords = await db
    .select({ user: usersTable, handle: userHandlesTable })
    .from(usersTable)
    .leftJoin(userHandlesTable, eq(usersTable.id, userHandlesTable.userId))
    .where(inArray(usersTable.id, applicantIds));

  const applicants: Record<string, { user: User; handles: UserHandle[] }> = {};

  applicantRecords.forEach((a) => {
    if (!a.handle) return;

    if (applicants[a.user.id]) {
      applicants[a.user.id].handles.push(a.handle);
    } else {
      applicants[a.user.id] = {
        user: a.user,
        handles: [a.handle],
      };
    }
  });

  // Final validation: all candidates should be present;
  applications.forEach(a => {
    if (!applicants[a.candidateId]) {
      console.error("candidate id", a.candidateId, "is missing from database response");
      throw createError({
        statusCode: 500,
      })
    }
  })

  return {
    applications,
    applicants,
  };
});
