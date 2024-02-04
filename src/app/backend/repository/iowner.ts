import { Customer, Owner } from "@prisma/client";

export interface IOwner {
  insert(
    type: string,
    lname: string,
    fname: string,
    customerId: string,
    cname?: string,
    bname?: string
  ): Promise<Owner | null>;
  // update(user_id: string): Promise<void>;
}
