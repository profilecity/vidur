// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  routeRules: {
    '/admin/**': { ssr: false },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vee-validate/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-cropper',
    'radix-vue/nuxt',
  ],
  googleFonts: {
    families: {
      'Noto+Sans': [400, 500, 600, 700],
      Lato: [400, 500, 600, 700],
    },
    useStylesheet: true,
  },
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
      github: 'https://github.com/profilecity/vidur',
      discord: 'https://discord.gg/9ms5uYF8xF',
      twitter: 'https://x.com/profilecityhq',
      version: 'v0.0.1',
    },
  },
  compatibilityDate: '2024-07-31',
});
