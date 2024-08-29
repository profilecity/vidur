import { prefixStorage } from "unstorage";

export const BLOB_STORAGE_KEY = "blobStorage";
export const blobStorage = useStorage(BLOB_STORAGE_KEY);

export const MEMORY_STORAGE_KEY = "memoryStorage";
export const memoryStorage = useStorage(MEMORY_STORAGE_KEY);

export const MEMORY_STORAGE_KEY__SETTINGS = "settings";
export const settings_memoryStorage = prefixStorage(memoryStorage, "settings");

export const MEMORY_STORAGE_KEY__GENERAL = "general";
export const general_memoryStorage = prefixStorage(memoryStorage, "general");