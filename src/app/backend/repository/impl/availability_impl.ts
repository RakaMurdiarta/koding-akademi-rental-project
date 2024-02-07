import { PrismaClient } from "@prisma/client";
import { IAvailability } from "../iavailability";
import prisma from "@/app/backend/config/prismaSingleton";

export class AvailabilityRepository implements IAvailability {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }
  insert = async (availability: {
    id: string;
    availableDate: Date | null;
    isAvailable: boolean;
    vehicleId: string;
  }): Promise<{
    id: string;
    availableDate: Date | null;
    isAvailable: boolean;
    vehicleId: string;
  }> => {
    const { availableDate, isAvailable, vehicleId } = availability;
    const resp = await this.repository.availability.create({
      data: {
        isAvailable,
        availableDate,
        vehicleId,
      },
    });

    return resp;
  };
}
