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
        baseDir: '/tmp/vidur-jobs-dev',
      },
      s3: {
        accessKeyId: '',
        secretAccessKey: '',
        partition: '',
        endpoint: '',
        region: '',
      },
    },
    bypassAdmin: false, // THIS IS ONLY FOR DEMO INSTANCES / DEV MODE. NOT MEANT TO BE USED AS A FULL FEATURE.
    delayResponse: false, // IT WILL ONLY TAKE EFFECT IN DEV MODE, USEFUL TO DO REALISTIC TESTING.
    services: {
      profileCity: 'https://api.thenirvanalabs.com',
      atlas: 'https://atlas.thenirvanalabs.com',
    },
    remoteAssetBase: '/assets',
    oauth: {
      clientId: 'profilecity-connect',
    },
    public: {
      origin: 'http://localhost:3001',
    }
  },
  compatibilityDate: '2024-07-31',
});
