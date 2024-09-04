import { sleep } from '~/utils/general';

export default defineEventHandler(async () => {
  if (IS_DEV && useRuntimeConfig().delayResponse) {
    await sleep(1000);
  }
});
