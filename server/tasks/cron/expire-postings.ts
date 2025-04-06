export default defineTask({
  meta: {
    name: 'cron:expire-postings',
    description: 'Expire postings who have expired',
  },
  async run() {
    const db = await useDatabase();
    try {
      await expireJobPostings(db);
      return { result: true };
    } catch (error) {
      logger.error(`[CRON] expire-postings failed. ${new Date().toISOString()}`, error);
      return { result: false };
    }
  },
});
