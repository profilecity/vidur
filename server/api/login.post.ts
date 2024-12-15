import { loginSchema } from '~~/shared/schemas/authentication';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getRole } from '../utils/auth';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse);

  const db = await useDatabase();

  const users = await db
    .select({ id: usersTable.id, password: usersTable.password, isAdmin: usersTable.isAdmin })
    .from(usersTable)
    .where(eq(usersTable.email, body.email));

  if (users.length === 1) {
    const adminOrUser = users[0]!;
    const isPasswordCorrect = await verifyPassword(adminOrUser.password, body.password);
    if (isPasswordCorrect) {
      await setUserSession(event, {
        user: {
          role: getRole(adminOrUser),
          id: adminOrUser.id,
        },
      });
      return sendNoContent(event);
    }
  }
  throw createError({
    statusCode: 401,
    message: 'Invalid credentials',
  });
});
