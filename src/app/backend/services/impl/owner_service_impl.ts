import { Owner, Vehicle } from "@prisma/client";
import { OwnerRepository } from "../../repository/impl/owner_impl";
import { IOwnerService } from "../iserviceOwner";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";
import { VehcileRepository } from "../../repository/impl/vehicle_impl";

class OwnerService implements IOwnerService {
  private readonly ownerRepo: OwnerRepository;
  private readonly vehicleRepo: VehcileRepository;

  constructor() {
    this.ownerRepo = new OwnerRepository();
    this.vehicleRepo = new VehcileRepository();
  }

  addOwner = async (owner: Omit<Owner,"id">): Promise<Owner> => {
    const resp = await this.ownerRepo.insert(owner.customerId);

    if (!resp) {
      throw new ApiError("failed create owner", HttpStatusCode.BadRequest);
    }
    return resp;
  };
  postVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
    const postVehicle = await this.vehicleRepo.addVehicle(vehicle);

    if (!postVehicle) {
      throw new ApiError("failed post vehicle", HttpStatusCode.BadRequest);
    }

    return postVehicle;
  };
}

export const ownerservice = new OwnerService();
