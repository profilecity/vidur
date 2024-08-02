import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import { MEMORY_STORAGE_KEY } from '../utils/storage';

export default defineNitroPlugin(async () => {
  const storage = useStorage();

  const defaultCache = createStorage({
    driver: memoryDriver(),
  });

  storage.mount(MEMORY_STORAGE_KEY, defaultCache);
})