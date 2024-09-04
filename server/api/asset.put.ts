import { randomUUID } from 'uncrypto';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  const body = await readMultipartFormData(event);
  if (!body || body.length == 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file from request',
    });
  }
  const file = body[0];
  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File not present in request body',
    });
  }
  if (file.name == 'asset') {
    const asset = Buffer.from(file.data.buffer);
    const assetId = randomUUID();
    await blobStorage.setItemRaw(assetId, asset);
    return { id: assetId };
  }

  throw createError({
    statusCode: 400,
    message: 'Invalid file key',
  });
});
