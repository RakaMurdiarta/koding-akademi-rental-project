import { PrismaClient, Vehicle } from "@prisma/client";
import { IOwner } from "../iowner";
import { Owner } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";
import { IVehicle } from "../ivehicle";

export class VehcileRepository implements IVehicle {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  addVehicle = async (vehicle: Vehicle): Promise<Vehicle | null> => {
    const owner = await this.repository.vehicle.create({
      data: vehicle,
    });

    if (!owner) {
      return null;
    }

    return owner;
  };
}
