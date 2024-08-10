// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  srcDir: 'src/',
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vee-validate/nuxt', '@nuxtjs/google-fonts', 'nuxt-cropper'],
  googleFonts: {
    families: {
      'Noto+Sans': [400, 500, 600, 700],
      Lato: [400, 500, 600, 700],
    },
    useStylesheet: true,
  },
  css: ['~/assets/css/style.css', '~/assets/css/additional-styles/utility-patterns.css'],
  devtools: { enabled: true },
  /**
   * Sensible defaults, overriden by env vars.
   */
  runtimeConfig: {
    db: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgrespw',
      database: 'vidur',
    },
    storage: {
      engine: 'local',
      local: {
        baseDir: './src/public/tmp',
      },
      s3: {
        accessKeyId: '',
        secretAccessKey: '',
        partition: '',
        endpoint: '',
        region: '',
      },
    },
    services: {
      profileCity: 'https://api.thenirvanalabs.com',
      atlas: 'https://atlas.thenirvanalabs.com',
    },
    oauth: {
      clientId: 'profilecity-connect',
    },
    public: {
      remoteAssetBase: '/tmp',
      origin: 'http://localhost:3001',
    }
  },
  compatibilityDate: '2024-07-31',
});
