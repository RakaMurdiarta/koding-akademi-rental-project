import { PrismaClient, Vehicle } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";
import { IVehicle } from "../ivehicle";

export class VehcileRepository implements IVehicle {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  addVehicle = async (
    vehicle: Omit<Vehicle, "id">
  ): Promise<Vehicle | null> => {
    const owner = await this.repository.vehicle.create({
      data: vehicle,
    });

    if (!owner) {
      return null;
    }

    return owner;
  };

  getVehicleById = async (vId: string): Promise<Vehicle | null> => {
    const vehicle = await this.repository.vehicle.findFirst({
      where: {
        id: vId,
      },
      include: {
        owner: {
          include: {
            customer: {
              select: {
                phone: true,
                fullname: true,
              },
            },
          },
        },
      },
    });

    if (!vehicle) {
      return null;
    }

    return vehicle;
  };

  getListVehicles = async (): Promise<Vehicle[] | null> => {
    try {
      const vehicles = await this.repository.vehicle.findMany({
        include: {
          owner: {
            include: {
              customer: {
                select: {
                  phone: true,
                  fullname: true,
                },
              },
            },
          },
        },
      });

      if (!vehicles) {
        return null;
      }

      return vehicles;
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      return null;
    }
  };
}
