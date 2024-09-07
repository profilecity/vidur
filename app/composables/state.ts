import {
  type CareerSiteConfig,
  type SEOConfig,
} from '~~/shared/schemas/setting';
import type { Session } from '~~/shared/types/profile-types';

export function useSessionState() {
  return useState<Session>('oauth_session');
}

export function useRemoteAssetBaseState() {
  return useState<string>('remote-asset-base-url');
}

export function useOnboardingStatusState() {
  return useState<boolean>('onboarding-status', () => false);
}

export function useCareerSiteConfigObjectState() {
  return useObjectState<CareerSiteConfig>('career-site-config');
}

export function useSeoConfigObjectState() {
  return useObjectState<SEOConfig>('seo-config');
}

export function useObjectState<T>(key: string, initFn?: () => T) {
  const data = useState<T>(key, initFn);
  const firstFetched = useState<boolean>(`${key}-first-fetch`, () => false);
  const fetching = useState<boolean>(`${key}-fetching`);
  const changing = useState<boolean>(`${key}-changing`);

  const setData = (d: T) => {
    firstFetched.value = true;
    data.value = d;
  };

  return { data, setData, firstFetched, fetching, changing };
}
