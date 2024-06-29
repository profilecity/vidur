// plugins/toastification.client.ts
import { defineNuxtPlugin } from '#app';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 5000,
    closeOnClick: true,
  };

  nuxtApp.vueApp.use(Toast, options);
});
