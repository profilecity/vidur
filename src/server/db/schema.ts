import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const defaultUuidPkField = () =>
  uuid("id")
    .primaryKey()
    .$default(() => sql`gen_random_uuid()`);

//---------------**************----------------

export const usersTable = pgTable("users", {
  id: defaultUuidPkField(),
  firstName: varchar("first_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }),
  picture: text("picture"),
  email: varchar("email", { length: 255 }).unique().notNull(),
  permission: integer("permission").default(0).notNull(),
  top5SkillsCSV: text("top_5_skills_csv"),

  isAdmin: boolean("is_admin").default(false).notNull(),
});

export type User = typeof usersTable.$inferSelect;

//---------------**************----------------

export const userHandlesTable = pgTable("user_handles", {
  userId: uuid("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  key: varchar("key", { length: 15 }).notNull(),
  value: text("value").notNull(),
});

export type UserHandle = typeof userHandlesTable.$inferSelect;

//---------------**************----------------

export const jobPostingsTable = pgTable("job_postings", {
  id: defaultUuidPkField(),
  title: varchar("title", { length: 150 }).notNull(),
  contents: text("contents"),
  tagsCSV: text("tags_csv"),
  owner: uuid("owner_id").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  isPublished: boolean("is_published").default(false).notNull(),
  totalApplicants: integer("total_applicants").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type JobPosting = typeof jobPostingsTable.$inferSelect;

//---------------**************----------------

export const postingApplicantsTable = pgTable("posting_applicants", {
  id: defaultUuidPkField(),
  candidateId: uuid("owner_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }).notNull(),
  postingId: uuid("job_id").references(() => jobPostingsTable.id, {
    onDelete: "cascade",
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PostingApplication = typeof postingApplicantsTable.$inferSelect;

//---------------**************----------------

export const hooksTable = pgTable("hooks", {
  id: defaultUuidPkField(),
  title: varchar('title', { length: 40 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  prefs: integer("prefs").default(0).notNull(),
  lastExecutedAt: timestamp("last_executed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Hook = typeof hooksTable.$inferSelect;

//---------------**************----------------

export const metaDataTable = pgTable("metadata_entries", {
  key: varchar('key', { length: 48 }).primaryKey().notNull(),
  value: text('value'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type MetadataEntry = typeof metaDataTable.$inferSelect;

//---------------**************----------------