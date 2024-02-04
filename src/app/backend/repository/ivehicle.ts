import { Vehicle } from "@prisma/client";

export interface IVehicle {
  addVehicle(vehicle : Vehicle) : Promise<Vehicle | null>
}