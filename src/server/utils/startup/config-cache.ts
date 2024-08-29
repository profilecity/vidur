import { createStorage } from "unstorage";
import memoryDriver from 'unstorage/drivers/memory';

export async function configureCache() {
  const storage = useStorage();

  const defaultCache = createStorage({
    driver: memoryDriver(),
  });

  storage.mount(MEMORY_STORAGE_KEY, defaultCache);

  await seedCache();
}
