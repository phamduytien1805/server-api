import { pgTable, serial, smallint, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    precision: 3,
  }).defaultNow(),
  updated_at: timestamp('updated_at', {
    withTimezone: true,
    precision: 3,
  }).defaultNow(),
  state: smallint('state').notNull().default(0),
  stated_at: timestamp('stated_at', { withTimezone: true }),
  last_seen: timestamp('stated_at', { withTimezone: true }),
});
