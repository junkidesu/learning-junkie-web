/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BACKEND_URL: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}