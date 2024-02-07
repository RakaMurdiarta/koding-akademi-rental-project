import { Vehicle } from "@prisma/client";

export interface IVehicleServices {
  getListvehicles() : Promise<Vehicle[]>
  getVehicleById(vId : string ) : Promise<Vehicle>
}