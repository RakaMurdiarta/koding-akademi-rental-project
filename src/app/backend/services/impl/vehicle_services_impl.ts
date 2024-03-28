import { $Enums, Admin, Vehicle } from "@prisma/client";
import { AdminRepository } from "../../repository/impl/admin_impl";
import { IAdminService } from "../iserviceAdmin";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";
import { IVehicleServices } from "../ivehicle";
import { VehcileRepository } from "../../repository/impl/vehicle_impl";

class VehicleServices implements IVehicleServices {
  private readonly vehicleRepo: VehcileRepository;

  constructor() {
    this.vehicleRepo = new VehcileRepository();
  }

  getListvehicles = async (): Promise<Vehicle[]> => {
    /* 

        @TODO : call method getListVehicles from vehicle repository 
    */

    //should remove this when get data from admin repository
    const vehicles: Vehicle[] = [];

    if (!vehicles) {
      throw new ApiError(
        "failed get list of vehicle",
        HttpStatusCode.BadRequest
      );
    }

    return vehicles;
  };

  getVehicleById = async (vId: string): Promise<Vehicle> => {
    const vehicle: Vehicle | null = null;

    /* 
        @TODO : call method getVehicleById from vehicle repository 
    */

    if (!vehicle) {
      throw new ApiError("failed get vehicle", HttpStatusCode.BadRequest);
    }

    return vehicle;
  };
}

export const newVehicleServices = new VehicleServices();
