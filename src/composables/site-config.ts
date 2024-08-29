export function useRemoteAsset(slug: string) {
  const remoteAssetBase = useState<string>("remote-asset-base-url");
  const url = remoteAssetBase.value + "/" + slug;
  
  return { url };
}

export function useOnboardingStatus() {
  return useState<boolean>('onboarding-status', () => false);
}