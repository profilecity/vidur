export function useRemoteAsset(slug: string) {
  const remoteAssetBase = useState("remote-asset-base-url");
  const url = remoteAssetBase.value + "/" + slug;
  
  return { url };
}
