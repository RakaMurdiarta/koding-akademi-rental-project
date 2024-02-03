import { HttpStatusCode } from "axios";
import { ApiError } from "../exception/baseError";
import { DRIVER, EnvConfigOptions } from "../interfaces/envConfig";

class EnvConfig {
  public static config(): EnvConfigOptions {
    const PORT = EnvConfig.getEnv("PORT");
    const DB_HOST = EnvConfig.getEnv("DB_HOST");
    const DB_USER = EnvConfig.getEnv("DB_USER");
    const DB_DRIVER = EnvConfig.getEnv("DB_DRIVER") as DRIVER;
    const DB_PORT = EnvConfig.getEnv("DB_PORT");
    const DB_PASSWORD = EnvConfig.getEnv("DB_PASSWORD");
    const DB_NAME = EnvConfig.getEnv("DB_NAME");

    return {
      DB_HOST,
      DB_PORT,
      DB_DRIVER,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      PORT,
    };
  }

  private static getEnv = (key: string): string => {
    try {
      const env = process.env[key];

      if (env === undefined) {
        throw new ApiError("failed get env", HttpStatusCode.BadRequest);
      }
      return env;
    } catch (error) {
      throw error;
    }
  };
}

export const env = new EnvConfig();
