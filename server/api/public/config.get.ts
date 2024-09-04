import { general_memoryStorage } from '~~/server/utils/storage';

export default defineEventHandler(async () => {
  const remoteAssetBase = (await general_memoryStorage.getItem(
    'remoteAssetBase'
  )) as string;
  const onboardingStatus = !((await general_memoryStorage.getItem(
    'firstSetupAccessKey'
  )) as string);

  return { remoteAssetBase, onboardingStatus };
});
