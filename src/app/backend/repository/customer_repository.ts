import { Customer } from "@prisma/client";

export interface ICustomer {
  insert(
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type: string,
    cname?: string,
    intial?: string
  ): Promise<Customer | null>;
  // update(user_id: string): Promise<void>;
}
