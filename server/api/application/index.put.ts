import { postingApplicantsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';
// import { applicationUpdateSchema } from '~~/shared/schemas/application';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const body = await readBody(event);

  // TODO: fix typing
  const updateApplicationRequest: any = {
    id: body.id,
  };

  if (body.reviewTagId) {
    updateApplicationRequest.status = body.reviewTagId;
  }

  const db = await useDatabase();
  await db.update(postingApplicantsTable).set(updateApplicationRequest);

  return sendNoContent(event);
});
