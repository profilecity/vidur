import { H3Event } from 'h3';
import authenticateRequest from './auth';

export default async function authenticateAdminRequest(event: H3Event) {
  const session = await authenticateRequest(event);

  const bypassAdmin = useRuntimeConfig().bypassAdmin;

  if (bypassAdmin) {
    logger.info('Bypassing Admin Check.');
    return session;
  }

  return session;
}
