export async function logFirstAccessKeyIfPresent() {
  const firstSetupAccessKey = await general_memoryStorage.getItem('firstSetupAccessKey');

  if (IS_DEV) {
    logger.start('Checking if access key present');
  }

  if (firstSetupAccessKey) {
    logger.info('*******---------*******--------*******');
    logger.info('*******     First Setup Key    *******');
    logger.box(firstSetupAccessKey);
    logger.info('*******---------*******--------*******');
  } else {
    if (IS_DEV) {
      logger.success('Access key not found, it means vidur instance is setup');
    }
  }
}
