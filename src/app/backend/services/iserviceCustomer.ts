import { Customer, CustomerType, ReturnHistory, Vehicle } from "@prisma/client";

export interface ICustomerService {
  addCustomer(
    email: string,
    password: string,
    fullname: string,
    phone: string,
    type?: CustomerType,
    cname?: string,
  ): Promise<Customer>;

  postVehicle(vehicle: Vehicle , customer_id : string): Promise<Vehicle>;
  getCustomerByEmail(email: string) : Promise<Customer | null>
  createRequestOwner(customerId: string) : Promise<string>
  isOwner(customerId: string) : Promise<string> 
  createReturnHistory(rent_id: string) : Promise<ReturnHistory>
}
