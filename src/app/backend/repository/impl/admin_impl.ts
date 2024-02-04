import { Admin, PrismaClient } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";
import { IAdmin } from "../iadmin";

export class AdminRepository implements IAdmin {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  insert = async (
    username: string,
    password: string
  ): Promise<Admin | null> => {
    const admin = await this.repository.admin.create({
      data: {
        username,
        password,
      },
    });

    if (!admin) {
      return null;
    }

    return admin;
  };
}
