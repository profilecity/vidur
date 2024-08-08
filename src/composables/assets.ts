export function useRemoteAsset(slug: string) {
  const remoteAssetBase = useState("remote-asset-base-url");
  const url = useState(slug, () => remoteAssetBase.value);
  const tickTs = useState(`tick-time-${slug}`, () => new Date().getTime());

  url.value = `${remoteAssetBase.value}/${slug}?tickTs=${tickTs}`;

  const tick = () => {
    tickTs.value = new Date().getTime();
    url.value = `${remoteAssetBase.value}/${slug}?tickTs=${tickTs.value}`;
  };
  
  return { url, tick };
}
