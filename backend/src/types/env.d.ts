declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PASSWORD_GMAIL: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};