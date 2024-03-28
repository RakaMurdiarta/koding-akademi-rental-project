import {
  $Enums,
  Admin,
  OwnerRequestHistory,
  PrismaClient,
  StatusRequestOwner,
} from "@prisma/client";
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

  acceptRequestOwner = async (customerId: string): Promise<boolean> => {
    try {
      const update = await this.repository.ownerRequestHistory.update({
        where: { customerId },
        data: { status: StatusRequestOwner.accepted },
      });
      
      if (update) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error accepting owner request:", error);
      return false;
    }
  };

  getListRequesttOwner = async (): Promise<OwnerRequestHistory[] | []> => {
    const list = await this.repository.ownerRequestHistory.findMany();

    if (list.length <= 0) {
      return [];
    }

    return list;
  };

  getAdminByEmail = async (
    email: string
  ): Promise<{ id: string; username: string; password: string } | null> => {
    const admin = await this.repository.admin.findFirst({
      where: { username: email },
    });

    if(!admin){
      return null
    }

    return admin
  };
}
