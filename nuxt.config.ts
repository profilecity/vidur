// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  css: [
    "~/assets/css/style.css",
    "~/assets/css/additional-styles/range-slider.css",
    "~/assets/css/additional-styles/theme.css",
    "~/assets/css/additional-styles/toggle-switch.css",
    "~/assets/css/additional-styles/utility-patterns.css",
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    db: {
      host: 'localhost',
      port: 55000,
      user: 'postgres',
      password: 'postgrespw',
      database: 'findjedi-local',
    },
    server: {
      userInfo: 'https://api.thenirvanalabs.com/user/info',
    },
    public: {
      oauth: {
        endpoints: {
          authorization: 'https://atlas.thenirvanalabs.com/oauth2/authorize',
          token: 'https://atlas.thenirvanalabs.com/oauth2/token',
          userInfo: 'https://api.thenirvanalabs.com/user/me',
        },
        redirect: {
          home: '/',
          callback: '/login',
          logout: '/',
          login: '/login',
        },
        clientId: 'base-client',
        scope: ['openid'],
        origin: 'http://localhost:3001',
      },
      serverBaseURL: 'https://api.thenirvanalabs.com',
    },
    basicInfoEndpoint: 'https://api.thenirvanalabs.com/user/basic-profile',
    jwksEndpoint: 'https://atlas.thenirvanalabs.com/oauth2/jwks',
  },
});
