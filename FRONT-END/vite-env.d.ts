/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DT_KEY: string; // Example key
  readonly VITE_DB_HOST: string; // Add your custom environment variables here
  readonly VITE_DB_USER: string;
  readonly VITE_DB_PASS: string;
  readonly VITE_DB_NAME: string;
  readonly VITE_JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
