export enum DRIVER {
  Postgres = "postgres",
  Mysql = "msql",
}

export interface EnvConfigOptions {
  DB_HOST: string;
  DB_PORT: string;
  DB_DRIVER: DRIVER;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  PORT: string;
}
