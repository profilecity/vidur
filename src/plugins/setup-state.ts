import type { GeneralSettings } from '~/schemas/setting';

export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useState('remote-asset-base-url', () => '');
  const onboardingStatus = useState('onboarding-status', () => false);
  try {
    const publicConfigRequest = await useFetch('/api/public/config');
    if (!publicConfigRequest.data.value) {
      throw new Error(
        'config not received in response ' + publicConfigRequest.data.value
      );
    }
    const pubicConfig = publicConfigRequest.data.value;

    remoteAssetBase.value = pubicConfig.remoteAssetBase;
    onboardingStatus.value = pubicConfig.onboardingStatus;
  } catch (error) {
    console.error('error fetching remote-asset-config', error);
  }

  const publicGeneralSettings = useState<GeneralSettings>(
    'public-general-settings'
  );
  try {
    const publicGeneralSettingsResponse = await useFetch(
      '/api/public/settings'
    );
    if (!publicGeneralSettingsResponse.data.value) {
      throw new Error(
        'Invalid response ' + publicGeneralSettingsResponse.data.value
      );
    }
    publicGeneralSettings.value = publicGeneralSettingsResponse.data.value;
  } catch (error) {
    console.error('error fetching public-general-settings', error);
  }
});
