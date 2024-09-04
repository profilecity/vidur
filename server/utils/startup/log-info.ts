export async function logFirstAccessKeyIfPresent() {
  const firstSetupAccessKey = await general_memoryStorage.getItem(
    'firstSetupAccessKey'
  );

  if (IS_DEV) {
    console.log('Checking if access key present');
  }

  if (firstSetupAccessKey) {
    console.log('*******---------*******--------*******');
    console.log('*******     First Setup Key    *******');
    console.log(firstSetupAccessKey);
    console.log('*******---------*******--------*******');
  } else {
    if (IS_DEV) {
      console.log('Access key not found, it means vidur instance is setup');
    }
  }
}
