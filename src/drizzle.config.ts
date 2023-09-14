import type { Config } from 'drizzle-kit';

export default {
  schema: './data-access/schema/*',
  out: './migrations',
  driver: 'pg',
  introspect: {
    casing: 'preserve',
  },
  dbCredentials: {
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
} satisfies Config;
