export function useRemoteAsset(slug: string) {
  const remoteAssetBase = useRuntimeConfig().public.remoteAssetBase;
  const url = useState(slug, () => remoteAssetBase);
  const tick = () => {
    url.value = `${remoteAssetBase}/${slug}?tickTs=${new Date().getTime()}`;
  };
  tick();
  return { url, tick };
}
