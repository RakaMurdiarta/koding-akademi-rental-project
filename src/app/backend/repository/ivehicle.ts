import { Vehicle } from "@prisma/client";

export interface IVehicle {
  addVehicle(vehicle : Vehicle ,customer_id : string) : Promise<Vehicle | null>
  getVehicleById(vId:string) : Promise<Vehicle | null>
  getListVehicles(): Promise<Vehicle[] | null>
}