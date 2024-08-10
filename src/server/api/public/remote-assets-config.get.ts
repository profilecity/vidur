export default defineCachedEventHandler(() => {
  const config = useRuntimeConfig();
  return { base: config.remoteAssetBase };
});
