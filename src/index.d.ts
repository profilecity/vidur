import type { Driver } from "unstorage";

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    storage: {
      engine: 's3' | 'local';
      s3?: {
        accessKeyId: string;
        secretAccessKey: string;
        partition: string;
        endpoint: string;
        region: string;
      };
      local?: {
        baseDir: string;
      }
    };
    db: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    }
  }
}

export {};
