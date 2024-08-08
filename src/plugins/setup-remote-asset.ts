export default defineNuxtPlugin(async () => {
  const remoteAssetBase = useState("remote-asset-base-url", () => "");
  try {
    const remoteAssetConfig = await $fetch("/api/public/remote-assets-config");
    remoteAssetBase.value = remoteAssetConfig.base;
  } catch (error) {
    console.error("error fetching remote-asset-config", error);
  }
})