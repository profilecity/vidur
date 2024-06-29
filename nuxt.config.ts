// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    experimental: {
      tasks: true,
    },
    inlineDynamicImports: true,
  },
  srcDir: 'src/',
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vee-validate/nuxt'],
  css: [
    '~/assets/css/style.css',
    '~/assets/css/additional-styles/range-slider.css',
    '~/assets/css/additional-styles/theme.css',
    '~/assets/css/additional-styles/toggle-switch.css',
    '~/assets/css/additional-styles/utility-patterns.css',
  ],
  devtools: { enabled: true },
  plugins: ['~/plugins/toastification.client.ts'],
  build:{
    // vue-toastification - old commonjs module 
    transpile: ['vue-toastification'],
  },
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
