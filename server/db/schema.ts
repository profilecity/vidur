import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  smallint,
  serial,
  date,
  char,
  pgEnum,
  json,
} from 'drizzle-orm/pg-core';
import { employmentTypeIds } from '../../shared/employment-types';
import type { PostalAddressList, Salary } from '../../shared/types/posting-types';

const defaultUuidPkField = () =>
  uuid('id')
    .primaryKey()
    .$default(() => sql`gen_random_uuid()`);

const defaultSerialPkField = () => serial('id').primaryKey();

export const employmentTypeEnum = pgEnum('employment_type', employmentTypeIds);

//---------------**************----------------

export const adminsTable = pgTable('admins', {
  id: defaultUuidPkField(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }),
  picture: text('picture'),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: char('password', { length: 133 }).notNull(), // length of adonis scrypt output
  isDeleted: boolean('is_admin').default(false).notNull(),
  permission: integer('permission').default(0).notNull(),
});

export type Admin = typeof adminsTable.$inferSelect;

//---------------**************----------------

export const jobPostingsTable = pgTable('job_postings', {
  id: defaultUuidPkField(),
  title: varchar('title', { length: 150 }).notNull(),
  contents: text('contents'),
  tagsCSV: text('tags_csv'),

  isPublished: boolean('is_published').default(false).notNull(),
  validTill: date('valid_till', { mode: 'date' }),
  employmentType: employmentTypeEnum('employment_type').default(employmentTypeIds[0]).notNull(),
  jobLocations: json('job_locations').$type<PostalAddressList>(),
  isRemote: boolean('is_remote').default(false).notNull(),
  baseSalary: json('base_salary').$type<Salary>(),

  totalApplicants: integer('total_applicants').default(0).notNull(),
  isExpired: boolean('is_expired').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  owner: uuid('owner_id').references(() => adminsTable.id, {
    onDelete: 'set null',
  }),
});

export type JobPosting = typeof jobPostingsTable.$inferSelect;

//---------------**************----------------

export const candidatesTable = pgTable('candidate_pool', {
  id: defaultUuidPkField(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
});

export type Candidate = typeof candidatesTable.$inferSelect;

//---------------**************----------------

export const postingApplicantsTable = pgTable('posting_applicants', {
  id: defaultUuidPkField(),
  candidateId: uuid('candidate_id')
    .references(() => candidatesTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  postingId: uuid('job_id')
    .references(() => jobPostingsTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  status: integer('status_id').default(-1),
  statusType: smallint('status_type').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type PostingApplication = typeof postingApplicantsTable.$inferSelect;

//---------------**************----------------

export const reviewTagsTable = pgTable('review_tags', {
  id: defaultSerialPkField(),
  title: varchar('title', { length: 32 }).notNull(),
  parent: smallint('parent').notNull(),
});

export type ReviewTag = typeof reviewTagsTable.$inferSelect;

//---------------**************----------------

export const hooksTable = pgTable('hooks', {
  id: defaultUuidPkField(),
  title: varchar('title', { length: 40 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  prefs: integer('prefs').default(0).notNull(),
  lastExecutedAt: timestamp('last_executed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Hook = typeof hooksTable.$inferSelect;

//---------------**************----------------

export const metaDataTable = pgTable('metadata_entries', {
  key: varchar('key', { length: 48 }).primaryKey().notNull(),
  value: text('value'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type MetadataEntry = typeof metaDataTable.$inferSelect;

//---------------**************----------------
