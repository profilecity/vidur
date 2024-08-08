export default defineCachedEventHandler(async (event) => {
  const key = getRouterParam(event, "key");
  if (!key) {
    throw createError({
      statusCode: 404,
      statusMessage: `No file with name ${key} found.`,
    })
  }
  const asset = await blobStorage.getItemRaw(key);

  if (IS_DEV) {
    console.log("grabbing asset", key);
  }

  return asset;
}, {
  maxAge: 60 * 60,
  getKey(event) {
    return getRouterParam(event, "key") || "";
  },
})