export enum NodeLaunch {
  DEV = "development",
  PROD = "production",
}

export interface EnvConfigOptions {
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  PORT: string;
  NODE_ENV: string;
}
