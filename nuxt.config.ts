import pkgJson from './package.json';

const composeVersion = () => {
  if (!pkgJson || !pkgJson.version) {
    return 'Unknown Version';
  } else {
    return `v${pkgJson.version}`;
  }
};

const cronSchedule: Record<string, string[]> = {
  // Every day, at 00:00.
  '0 0 * * *': ['cron:expire-postings'],
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      dirs: ['server/utils/**/*.ts'],
    },
    scheduledTasks: cronSchedule,
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
    'nuxt-auth-utils',
  ],
  css: ['~/assets/utility-patterns.css'],
  googleFonts: {
    families: {
      'Noto+Sans': [400, 500, 600, 700],
      Lato: [400, 500, 600, 700],
      Nunito: [400, 500, 600, 700],
    },
    useStylesheet: true,
  },
  imports: {
    dirs: ['composables/**/*.ts'],
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
        baseDir: './.data',
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
    remoteAssetBase: '/assets',
    public: {
      origin: 'http://localhost:3001',
      github: 'https://github.com/profilecity/vidur',
      discord: 'https://discord.gg/9ms5uYF8xF',
      twitter: 'https://x.com/profilecityhq',
      vidur: 'https://profilecity.xyz/vidur',
      version: composeVersion(),
    },
  },
  compatibilityDate: '2024-07-31',
});
