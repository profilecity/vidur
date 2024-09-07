export function useRemoteAsset(slug: string) {
  const remoteAssetBase = useRemoteAssetBaseState();
  const url = remoteAssetBase.value + '/' + slug;

  return { url };
}

export function useOnboardingStatus() {
  return useOnboardingStatusState();
}
