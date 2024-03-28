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

  addOwner = async (owner: Omit<Owner, "id">): Promise<Owner> => {
    //should remove this when get data from owner repository
    const resp: Owner | null = null;
    /* 

        @TODO : call method insert from owner repository 
    */

    if (!resp) {
      throw new ApiError("failed create owner", HttpStatusCode.BadRequest);
    }
    return resp;
  };

  postVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
    //should remove this when get data from admin repository
    const postVehicle: Vehicle | null = null;

    /* 

        @TODO : call method addVehicle from vehicle repository 
    */

    if (!postVehicle) {
      throw new ApiError("failed post vehicle", HttpStatusCode.BadRequest);
    }

    return postVehicle;
  };
}

export const ownerservice = new OwnerService();
