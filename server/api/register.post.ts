import { registerSchema } from '~~/shared/schemas/authentication';
import { usersTable } from '../db/schema';
import { count, eq } from 'drizzle-orm';
import { getRole } from '../utils/auth';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);

  const onboardingToken = getHeader(event, 'x-onboarding-token');
  const actualOnboardingToken = await general_memoryStorage.getItem('firstSetupAccessKey');

  const db = await useDatabase();

  const users = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, body.email));
  const user = users && users.length === 1 ? users[0] : undefined;

  if (user) {
    throw createError({
      statusCode: 400,
      message: 'Email is already taken',
    });
  }

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
