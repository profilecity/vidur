import type { GeneralSettings } from '~/schemas/setting';

export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useState('remote-asset-base-url', () => '');
  try {
    const remoteAssetConfig = await useAsyncData('remove-asset-base-url-fetch', () =>
      $fetch('/api/public/remote-assets-config'),
    );
    if (!remoteAssetConfig.data.value?.base) {
      throw new Error('base url not found in response ' + remoteAssetConfig.data.value);
    }
    remoteAssetBase.value = remoteAssetConfig.data.value?.base;
  } catch (error) {
    console.error('error fetching remote-asset-config', error);
  }

  const publicGeneralSettings = useState<GeneralSettings>('public-general-settings');
  try {
    const publicGeneralSettingsResponse = await useAsyncData('public-general-settings-fetch', () =>
      $fetch('/api/public/settings'),
    );
    if (!publicGeneralSettingsResponse.data.value) {
      throw new Error('Invalid response ' + publicGeneralSettingsResponse.data.value);
    }
    publicGeneralSettings.value = publicGeneralSettingsResponse.data.value;
  } catch (error) {
    console.error('error fetching public-general-settings', error);
  }
});
