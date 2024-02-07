import { Customer, CustomerType, Vehicle } from "@prisma/client";

export interface ICustomerService {
  addCustomer(
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type?: CustomerType,
    cname?: string,
    intial?: string
  ): Promise<Customer>;

  postVehicle(vehicle: Vehicle , customer_id : string): Promise<Vehicle>;
  getCustomerByEmail(email: string) : Promise<Customer | null>
}
