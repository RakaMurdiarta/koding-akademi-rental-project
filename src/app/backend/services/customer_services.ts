import { Customer } from "@prisma/client";

export interface ICustomerService {
  addCustomer(
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type: string,
    cname?: string,
    intial?: string
  ): Promise<Customer>;
}
