import authenticateRequest from '../utils/auth';

export default defineEventHandler(async (event) => {
  const { user: profile } = await authenticateRequest(event, {
    useTokenFromHeader: true,
  });

  const session = {
    profile,
  };

  return session;
});
