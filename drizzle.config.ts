import 'dotenv/config';
import type { Config } from 'drizzle-kit';
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
    ssl: false,
  },
  casing: 'snake_case',
} satisfies Config;
