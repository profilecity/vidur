import { Driver as UnstorageDriver } from 'unstorage';
import fsLite from 'unstorage/drivers/fs';
import { s3Driver } from '@profilecity/unstorage-s3-driver';
import { BLOB_STORAGE_KEY } from '../utils/storage';

export default defineNitroPlugin(() => {
  const storage = useStorage();

  const config = useRuntimeConfig().storage;

  let driver: UnstorageDriver;

  switch(config.engine) {
    case 's3':
      driver = s3Driver({
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey,
        bucket: config.s3.partition,
        endpoint: config.s3.endpoint,
        region: config.s3.region,
      });
      break;
    case 'local':
      driver = fsLite({
        base: config.local.baseDir,
      })
      break;
    default:
      throw new Error("No storage engine specified. Storage functions will not work.");
  }

  console.log(`Mounting ${config.engine} driver.`);

  storage.mount(BLOB_STORAGE_KEY, driver);
})