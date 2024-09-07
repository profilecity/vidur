export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useRemoteAssetBaseState();
  const onboardingStatus = useOnboardingStatusState();
  const careerSiteConfigObjectState = useCareerSiteConfigObjectState();
  const seoConfigObjectState = useSeoConfigObjectState();

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
    careerSiteConfigObjectState.setData(pubicConfig.settings.careerSite);
    seoConfigObjectState.setData(pubicConfig.settings.seo);

    console.log(pubicConfig);
  } catch (error) {
    console.error('error fetching remote-asset-config', error);
  }
});
