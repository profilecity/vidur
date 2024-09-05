import type { Hook } from '~~/server/db/schema';
import type { Session } from '~~/shared/types/profile-types';

export function useSessionState() {
  return useState<Session>('oauth_session');
}

export function useHooksState() {
  return useObjectState<Hook[]>('integration-hooks', () => []);
}

function useObjectState<T>(key: string, initFn?: () => T) {
  const data = useState<T>(key, initFn);
  const firstFetched = useState<boolean>(`${key}-first-fetch`, () => false);
  const fetching = useState<boolean>(`${key}-fetching`);

  return { data, firstFetched, fetching };
}
