import { PrismaClient } from "@prisma/client";
import { IOwner } from "../iowner";
import { Owner } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";

export class OwnerRepository implements IOwner {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  insert = async (
    type: string,
    lname: string,
    fname: string,
    customerId: string,
    cname?: string | undefined,
    bname?: string | undefined
  ): Promise<Owner | null> => {
    const owner = await this.repository.owner.create({
      data: {
        fname,
        lname,
        ownerType: type,
        cname,
        bname,
        customerId,
      },
    });

    if (!owner) {
      return null;
    }

    return owner;
  };
}
