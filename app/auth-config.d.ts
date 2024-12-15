import type { BaseUserFields } from '~~/server/db/schema';

declare module '#auth-utils' {
  interface User {
    role: 'admin' | 'user';
    id: string;
  }

  interface UserSession {}

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
