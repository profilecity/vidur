import { H3Event } from 'h3';
import type { User } from '../db/schema';
import { getToken } from './jwt';

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
