import { PrismaClient } from "@prisma/client";
import { IOwner } from "../iowner";
import { Owner } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";

export class OwnerRepository implements IOwner {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  insert = async (customerId: string): Promise<Owner | null> => {
    const owner = await this.repository.owner.create({
      data: {
        customerId,
      },
    });

    if (!owner) {
      return null;
    }

    return owner;
  };

  getOwnerByCustomerId = async (customerId: string): Promise<Owner | null> => {
    const owner = await this.repository.owner.findFirst({
      where: { customer: { id: customerId } },
    });

    if(!owner){
      return null
    }

    return owner
  };
}
