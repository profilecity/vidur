import { H3Event } from 'h3';
import type { User } from '../db/schema';
import { UserRole } from '~~/shared/types/profile-types';

export type Credentials = {
  token: string;
  tokenType: string;
};

export default async function authenticateRequest(
  event: H3Event,
  options: { useTokenFromHeader?: boolean } = { useTokenFromHeader: false }
): Promise<{ user: User }> {
  // @ts-ignore
  return { user: null };
}

export function getRole(user: Partial<User>): UserRole {
  if (user.isAdmin) {
    return 'admin';
  }
  return 'user';
}
