import { Customer, PrismaClient } from "@prisma/client";
import { ICustomer } from "../icustomer";
import prisma from "@/app/backend/config/prismaSingleton";
import { ApiError } from "../../exception/baseError";

class CustomerRepository implements ICustomer {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async insert(
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type: string,
    isOwner: boolean,
    cname?: string,
    initial?: string
  ): Promise<Customer | null> {
    const customer: Customer = await this.repository.customer.create({
      data: {
        email,
        customerType: type,
        password,
        phone,
        lname,
        initial,
        cname,
        fname,
        isOwner,
      },
    });

    if (!customer) {
      throw new ApiError("failed to create customer");
      return null;
    } else {
      return customer;
    }
  }
}

export default CustomerRepository;
