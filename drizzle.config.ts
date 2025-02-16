import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const isRunningLocally = () =>
  process.env.NUXT_DB_HOST?.includes('localhost') || process.env.NUXT_DB_HOST?.includes('127.0.0.1');

export default {
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.NUXT_DB_HOST!,
    port: parseInt(process.env.NUXT_DB_PORT!, 10),
    user: process.env.NUXT_DB_USER!,
    password: process.env.NUXT_DB_PASSWORD!,
    database: process.env.NUXT_DB_DATABASE!,
    ssl: !isRunningLocally(),
  },
} satisfies Config;
