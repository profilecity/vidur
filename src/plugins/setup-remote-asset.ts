export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useState("remote-asset-base-url", () => "");
  try {
    const remoteAssetConfig = await useAsyncData('remove-asset-base-url-fetch', () => $fetch("/api/public/remote-assets-config"));
    if(!remoteAssetConfig.data.value?.base) {
      throw new Error("base url not found in response " + remoteAssetConfig.data.value);
    }
    remoteAssetBase.value = remoteAssetConfig.data.value?.base;
  } catch (error) {
    console.error("error fetching remote-asset-config", error);
  }
})