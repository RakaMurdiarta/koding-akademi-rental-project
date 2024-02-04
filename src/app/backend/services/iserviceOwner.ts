import { Owner, Vehicle } from "@prisma/client";

export interface IOwnerService {
  addOwner(owner: Owner): Promise<Owner>;
  postVehicle(vehicle: Vehicle): Promise<Vehicle>;
}
