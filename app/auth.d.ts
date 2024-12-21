import type { Admin } from '~~/server/db/schema';

declare module '#auth-utils' {
  interface User extends Admin {}
}

export {};
