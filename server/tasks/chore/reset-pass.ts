import { eq } from 'drizzle-orm';
import { adminsTable } from '~~/server/db/schema';

export default defineTask({
  meta: {
    name: 'chore:reset-pass',
    description: "Helps reset a user's password",
  },
  async run({ payload }) {
    try {
      const db = await useDatabase();

      const email = payload.email as string;
      const newPassword = payload.password as string;

      await db
        .update(adminsTable)
        .set({
          password: await hashPassword(newPassword),
        })
        .where(eq(adminsTable.email, email));

      logger.info(`chore:reset-pass success. ${new Date().toISOString()}`);
      return { result: true };
    } catch (error) {
      logger.error(`chore:reset-pass failed. ${new Date().toISOString()}`, error);
      return { result: false };
    }
  },
});
