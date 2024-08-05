export function useRemoteAsset(slug: string) {
  const remoteAssetBase = useRuntimeConfig().public.remoteAssetBase;
  const url = useState(slug, () => remoteAssetBase);
  const tickTs = useState(`tick-time-${slug}`, () => new Date().getTime());

  url.value = `${remoteAssetBase}/${slug}?tickTs=${tickTs}`;

  const tick = () => {
    tickTs.value = new Date().getTime();
    url.value = `${remoteAssetBase}/${slug}?tickTs=${tickTs}`;
  };
  
  return { url, tick };
}
