// Credits: @bitinflow/nuxt-oauth

// This code has been modified to work with SSR as opposed to @bitinflow/nuxt-oauth

import type { CookieRef } from "#app";
import type { Session } from "~/types/profile-types";

export default async () => {
  const nuxtApp = useNuxtApp();

  const authConfig = useRuntimeConfig().public.oauth;
  const user: Ref<Session | null> = useState('oauth_user');
  const accessToken: CookieRef<any> = await nuxtApp.runWithContext(() =>useCookie('oauth_access_token'));

  const getBearerToken = () => {
    if (!accessToken.value) {
      throw new Error("`getBearerToken` called without authorization. Reason might be `auth` middleware is not applied.")
    }
    return `${accessToken.value.tokenType} ${accessToken.value.token}`;
  }

  const signOut = async () => {
    accessToken.value = null;
    user.value = null;

    return nuxtApp.runWithContext(() => navigateTo(authConfig.redirect.logout, { external: true }))
  }

  const fetchUser = async (): Promise<void> => {
    try {
      if (!accessToken.value) {
        return;
      }
      const response = await nuxtApp.runWithContext(() => useAsyncData('fetchUser', () => $fetch<Session>(authConfig.endpoints.userInfo, {
        headers: {
          Accept: 'application/json',
          Authorization: getBearerToken(),
        }
      })));

      if (response.error.value?.statusCode == 401) {
        await signOut();
        return;
      }

      user.value = response.data.value;
    } catch (e) {
      console.error("Error fetching user.", e);
      user.value = null;
    }
  }

  if (accessToken.value && !user.value) {
    await fetchUser();
  }

  const signIn = async (): Promise<void> => {
    await nuxtApp.runWithContext(() => navigateTo("/login"));
  };

  const setBearerToken = async (token: string, tokenType: string, expires: number) => {
    accessToken.value = {token, tokenType, expires: Date.now() + expires * 1000};
    await fetchUser();
  }

  const isSignedIn = computed(() => !!accessToken.value);

  return {
    user,
    signIn,
    signOut,
    isSignedIn,
    setBearerToken,
    getBearerToken,
    authConfig
  }
}