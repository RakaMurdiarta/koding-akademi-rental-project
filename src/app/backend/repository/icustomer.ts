import { Customer, CustomerType } from "@prisma/client";

export interface ICustomer {
  insert(
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type: CustomerType,
    cname?: string,
    intial?: string
  ): Promise<Customer | null>;
  // update(user_id: string): Promise<void>;
  getCustomerByEmail(email:string) : Promise<Customer | null> 
}
