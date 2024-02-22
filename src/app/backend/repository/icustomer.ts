import { Customer, CustomerType } from "@prisma/client";

export interface ICustomer {
  insert(
    email: string,
    password: string,
    fullname: string,
    phone: string,
    type: CustomerType,
    cname?: string,
  ): Promise<Customer | null>;
  // update(user_id: string): Promise<void>;
  getCustomerByEmail(email:string) : Promise<Customer | null> 
  requestOwner(customerId : string) : Promise<string | null>
  isOwner(customerId : string) : Promise<string>
}
