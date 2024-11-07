export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      DATABASE_URL: string;
      GOOGLE_OAUTH_CLIENTID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
    }
  }
}
