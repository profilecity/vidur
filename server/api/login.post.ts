import { loginSchema } from '~~/shared/schemas/authentication';
import { adminsTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse);

  const db = await useDatabase();

  const users = await db
    .select({ id: adminsTable.id, password: adminsTable.password })
    .from(adminsTable)
    .where(eq(adminsTable.email, body.email));

  if (users.length === 1) {
    const user = users[0];
    const isPasswordCorrect = await verifyPassword(user.password, body.password);
    if (isPasswordCorrect) {
      await setUserSession(event, {
        user: {
          role: 'admin',
          id: user.id,
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
