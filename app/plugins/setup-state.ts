export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useRemoteAssetBaseState();
  const onboardingStatus = useOnboardingStatusState();
  const careerSiteConfigObjectState = useCareerSiteConfigObjectState();
  const seoConfigObjectState = useSeoConfigObjectState();
  const totalActivePostings = useTotalActivePostingsState();

  try {
    const publicConfigRequest = await useFetch('/api/public/config');
    if (!publicConfigRequest.data.value) {
      throw new Error('config not received in response ' + publicConfigRequest.data.value);
    }
    const publicConfig = publicConfigRequest.data.value;

    remoteAssetBase.value = publicConfig.remoteAssetBase;
    onboardingStatus.value = publicConfig.onboardingStatus;
    totalActivePostings.value = publicConfig.totalActivePostings;
    careerSiteConfigObjectState.setData(publicConfig.settings.careerSite);
    seoConfigObjectState.setData(publicConfig.settings.seo);
  } catch (error) {
    console.error('error fetching remote-asset-config', error);
  }
});
