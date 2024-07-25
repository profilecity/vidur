// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  srcDir: 'src/',
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vee-validate/nuxt', "@nuxtjs/google-fonts", "nuxt-cropper"],
  googleFonts: {
    families: {
      "Noto+Sans": [400, 500, 600, 700],
      "Lato": [400, 500, 600, 700],
    },
    useStylesheet: true,
  },
  css: [
    '~/assets/css/style.css',
    '~/assets/css/additional-styles/utility-patterns.css',
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
    services: {
      profileCity: "https://api.thenirvanalabs.com",
      atlas: "https://atlas.thenirvanalabs.com",
    },
    oauth: {
      clientId: 'base-client',
      origin: "http://localhost:3001",
    }
  },
});
