/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly CODEX_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
