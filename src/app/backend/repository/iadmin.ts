import { Admin } from "@prisma/client";

export interface IAdmin {
  insert(username: string, password: string): Promise<Admin | null>;
}
