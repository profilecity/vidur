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
});
