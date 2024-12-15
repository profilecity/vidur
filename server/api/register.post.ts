import { registerSchema } from '~~/shared/schemas/authentication';
import { usersTable } from '../db/schema';
import { count, eq } from 'drizzle-orm';
import { getRole } from '../utils/auth';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);
  const onboardingToken = getHeader(event, 'x-onboarding-token');

  const db = await useDatabase();

  const userAlreadyExist =
    (await db.select({ count: count() }).from(usersTable).where(eq(usersTable.email, body.email)))[0]!.count === 1;

  if (userAlreadyExist) {
    throw createError({
      statusCode: 400,
      message: 'Email taken',
    });
  }

  const actualOnboardingToken = await general_memoryStorage.getItem('firstSetupAccessKey');

  let isAdmin = false;
  if (actualOnboardingToken && onboardingToken === actualOnboardingToken) {
    isAdmin = true;
  }

  const insertedUsers = await db
    .insert(usersTable)
    .values({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await hashPassword(body.password),
      isAdmin,
    })
    .returning();

  if (insertedUsers && insertedUsers.length === 1) {
    const user = insertedUsers[0]!;
    await setUserSession(event, {
      user: {
        id: user.id,
        role: getRole(user),
      },
    });
    return sendNoContent(event);
  }

  throw createError({
    statusCode: 500,
    message: 'User not created',
  });
});
