import { HttpStatusCode } from "axios";
import { ApiError } from "../exception/baseError";
import { EnvConfigOptions} from "../interfaces/env";

class EnvConfig {
  public static config(): EnvConfigOptions {
    const PORT = EnvConfig.getEnv("PORT");
    const DB_HOST = EnvConfig.getEnv("DB_HOST");
    const DB_USER = EnvConfig.getEnv("DB_USER");
    const DB_PORT = EnvConfig.getEnv("DB_PORT");
    const DB_PASSWORD = EnvConfig.getEnv("DB_PASSWORD");
    const DB_NAME = EnvConfig.getEnv("DB_NAME");
    const NODE_ENV = EnvConfig.getEnv("NODE_ENV");


    return {
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      PORT,
      NODE_ENV
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

export default EnvConfig
