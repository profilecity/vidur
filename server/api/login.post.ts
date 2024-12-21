import { loginSchema } from '~~/shared/schemas/authentication';
import { adminsTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse);

  const db = await useDatabase();

  const users = await db.select().from(adminsTable).where(eq(adminsTable.email, body.email));

  if (users.length === 1) {
    const admin = users[0]!;
    const isPasswordCorrect = await verifyPassword(admin.password, body.password);
    if (isPasswordCorrect) {
      await setUserSession(event, {
        user: admin,
      });
      return sendNoContent(event);
    }
  }
  throw createError({
    statusCode: 401,
    message: 'Invalid credentials',
  });
});
