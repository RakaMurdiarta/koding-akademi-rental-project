import { $Enums, Customer, CustomerType, Vehicle } from "@prisma/client";
import CustomerRepository from "../../repository/impl/customer_impl";
import { ICustomerService } from "../iserviceCustomer";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";
import { VehcileRepository } from "../../repository/impl/vehicle_impl";
import { OwnerRepository } from "../../repository/impl/owner_impl";

class CustomerService implements ICustomerService {
  private readonly customerRepository: CustomerRepository;
  private readonly vehicleRepo: VehcileRepository;
  private readonly ownerRepo: OwnerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.vehicleRepo = new VehcileRepository();
    this.ownerRepo = new OwnerRepository();
  }
  addCustomer = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type: CustomerType,
    cname?: string,
    intial?: string
  ): Promise<Customer> => {
    try {
      const customer = await this.customerRepository.insert(
        email,
        password,
        fname,
        lname,
        phone,
        type,
        cname,
        intial
      );

      if (!customer) {
        throw new ApiError(
          "failed to create customer",
          HttpStatusCode.BadRequest
        );
      } else {
        return customer;
      }
    } catch (error: any) {
      throw error;
    }
  };
  postVehicle = async (
    vehicle: Omit<Vehicle, "id" | "ownerId">,
    customer_id: string
  ): Promise<Vehicle> => {
    //add customer id into owner table before post vehicle
    // const owner = await this.ownerRepo.insert(customer_id);
    const owner = await this.ownerRepo.getOwnerByCustomerId(customer_id);

    if (!owner) {
      throw new ApiError("You are not yet registered as an owner. Please make sure to contact the administrator to register as an owner.", HttpStatusCode.BadRequest);
    }
    const data = {
      ...vehicle,
      ownerId : owner.id
    }

    //post vehicle
    const cvehicle = await this.vehicleRepo.addVehicle(data);
    if (!cvehicle) {
      throw new ApiError("failed post vehicle", HttpStatusCode.BadRequest);
    }

    return cvehicle;
  };

  getCustomerByEmail= async (email: string) : Promise<Customer | null> =>{

    const customer = await this.customerRepository.getCustomerByEmail(email)


    if(!customer){
      return null
    }

    return customer
  }
}

export const customerService = new CustomerService();
