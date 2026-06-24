/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_INTAKE_API_URL?: string;
  readonly VITE_LEAD_INTAKE_UPDATE_API_URL?: string;
  readonly VITE_AI_CHAT_API_URL?: string;
  readonly VITE_AI_CHAT_COMPANY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
