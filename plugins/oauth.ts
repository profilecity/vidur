interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default defineNuxtPlugin(async (nuxtApp) => {
  addRouteMiddleware("login", async (to) => {
    const { authConfig, setBearerToken, isSignedIn } = await useAuth();

    const nextURLCookie = await nuxtApp.runWithContext(() => useCookie('oauth_next_url'));

    if (isSignedIn.value) {
      const next: Ref<string> = ref(authConfig.redirect.home ?? "/");
      if (nextURLCookie.value) {
        next.value = nextURLCookie.value;
        nextURLCookie.value = undefined;
      }

      return nuxtApp.runWithContext(() => navigateTo(next.value));
    }

    if (
      to.path === authConfig.redirect.callback ||
      to.path === authConfig.redirect.callback + "/"
    ) {
      if (to.query["code"]) { // This means leg 2 is going on
        const code = to.query["code"] as string;
        const stateFromRequest = to.query["state"] as string;
        const stateFromCookie = await nuxtApp.runWithContext(() =>
          useCookie<string>("oauth_state")
        );
        const codeVerifier = await nuxtApp.runWithContext(() =>
          useCookie<string>("oauth_code_verifier")
        );

        if (stateFromRequest !== stateFromCookie.value) {
          console.warn(
            "State mismatch",
            stateFromRequest,
            stateFromCookie.value
          );
          return nuxtApp.runWithContext(() =>
            navigateTo(authConfig.redirect.login)
          );
        }

        const formData = new FormData();
        formData.append("grant_type", "authorization_code");
        formData.append("client_id", authConfig.clientId);
        formData.append(
          "redirect_uri",
          authConfig.origin + authConfig.redirect.callback
        );
        formData.append("code_verifier", codeVerifier.value);
        formData.append("code", code);

        const response = await nuxtApp.runWithContext(() =>
          useAsyncData("fetchAccessToken", () =>
            $fetch<AccessToken>(authConfig.endpoints.token, {
              method: "POST",
              body: formData,
            })
          )
        );

        if (response.error.value) {
          console.warn("Failed to fetch token", response.error.value);
          return nuxtApp.runWithContext(() =>
            navigateTo(authConfig.redirect.login)
          );
        }

        const data = response.data.value;

        if (!data) {
          console.warn("Failed to get data", response.status.value);
          return nuxtApp.runWithContext(() =>
            navigateTo(authConfig.redirect.login)
          );
        }

        await setBearerToken(data.access_token, data.token_type, data.expires_in);

        if (isSignedIn.value) {
          const next: Ref<string> = ref(authConfig.redirect.home ?? "/");
          if (nextURLCookie.value) {
            next.value = nextURLCookie.value;
            nextURLCookie.value = undefined;
          }

          return nuxtApp.runWithContext(() => navigateTo(next.value));
        }
      } else { // This means leg 1 is going on
        const state = await nuxtApp.runWithContext(() => useCookie<string>('oauth_state'));
        state.value = generateRandomString();

        // create oauth authorization url
        const params = new URLSearchParams({
          client_id: authConfig.clientId,
          redirect_uri: authConfig.origin + authConfig.redirect.callback,
          response_type: 'code',
          scope: authConfig.scope.join(' '),
          state: state.value,
        })

        const codeVerifier = await nuxtApp.runWithContext(() => useCookie<string>('oauth_code_verifier'));
        codeVerifier.value = generateRandomString();

        params.set('code_challenge', await getChallengeFromVerifier(codeVerifier.value))
        params.set('code_challenge_method', 'S256')

        console.log(`${authConfig.endpoints.authorization}?${params.toString()}`);

        return nuxtApp.runWithContext(() => navigateTo(`${authConfig.endpoints.authorization}?${params.toString()}`, { external: true }));
      }
    } else {
      throw new Error(
        "Login Middleware should only be applied to path mentioned in `authConfig.redirect.callback`"
      );
    }
  });
  addRouteMiddleware("auth", async (to) => {
    const { getBearerToken, authConfig } = await useAuth();
    if (!getBearerToken()) {
      const nextURL = await nuxtApp.runWithContext(() => useCookie<string>('oauth_next_url'));
      nextURL.value = to.fullPath;
      
      return nuxtApp.runWithContext(() => navigateTo(authConfig.redirect.login, {
        external: true,
      }));
    }
  });
});