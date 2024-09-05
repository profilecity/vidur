import type { Hook } from '~~/server/db/schema';
import type { Session } from '~~/shared/types/profile-types';

export function useSessionState() {
  return useState<Session>('oauth_session');
}

export function useHooksState() {
  return useObjectState<Hook[]>('integration-hooks', () => []);
}

export function useObjectState<T>(key: string, initFn?: () => T) {
  const data = useState<T>(key, initFn);
  const firstFetched = useState<boolean>(`${key}-first-fetch`, () => false);
  const fetching = useState<boolean>(`${key}-fetching`);
  const changing = useState<boolean>(`${key}-changing`);

  const setData = (d: T) => {
    data.value = d;
  };

  return { data, setData, firstFetched, fetching, changing };
}
