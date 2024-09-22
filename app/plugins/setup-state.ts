export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useRemoteAssetBaseState();
  const onboardingStatus = useOnboardingStatusState();
  const careerSiteConfigObjectState = useCareerSiteConfigObjectState();
  const seoConfigObjectState = useSeoConfigObjectState();
  const totalPositionsState = usePositionState();

  try {
    const publicConfigRequest = await useFetch('/api/public/config');
    if (!publicConfigRequest.data.value) {
      throw new Error('config not received in response ' + publicConfigRequest.data.value);
    }
    const pubicConfig = publicConfigRequest.data.value;

    remoteAssetBase.value = pubicConfig.remoteAssetBase;
    onboardingStatus.value = pubicConfig.onboardingStatus;
    totalPositionsState.value = pubicConfig.totalPositions;
    careerSiteConfigObjectState.setData(pubicConfig.settings.careerSite);
    seoConfigObjectState.setData(pubicConfig.settings.seo);
  } catch (error) {
    console.error('error fetching remote-asset-config', error);
  }
});
