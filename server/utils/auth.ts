import { H3Event } from 'h3';
import { adminsTable, type Admin } from '../db/schema';
import { eq } from 'drizzle-orm';

export type Credentials = {
  token: string;
  tokenType: string;
};

export function createUnauthorisedError() {
  return createError({
    statusCode: 401,
    message: 'Session not authenticated',
  });
}

export default async function authenticateRequest(event: H3Event): Promise<{ user: Admin }> {
  const session = await getUserSession(event);

  if (IS_DEV) {
    console.log('Authenticating Admin', session.user!.id);
  }

  if (session && session.user) {
    const db = await useDatabase();
    const users = await db.select().from(adminsTable).where(eq(adminsTable.id, session.user.id));
    if (!users || !users.length) {
      throw createUnauthorisedError();
    }
    const user = users[0]!;

    if (user.isDeleted) {
      throw createUnauthorisedError();
    }

    // @ts-expect-error password deleted, but type says otherwise.
    delete user.password;
    return { user };
  } else {
    throw createUnauthorisedError();
  }
}
