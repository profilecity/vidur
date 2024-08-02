import authenticateAdminRequest from "~/server/utils/admin"

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  const body = await readMultipartFormData(event);
  if (!body || body.length == 0) {
    throw createError({
      statusCode:400,
      statusMessage: "Missing file from request",
    })
  }
  const file = body[0];
  if (file.name == "logo") {
    const image = Buffer.from(file.data.buffer);
    blobStorage.setItemRaw('orgImage', image);
  }
})