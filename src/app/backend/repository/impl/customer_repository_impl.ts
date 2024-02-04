import { Customer, PrismaClient } from "@prisma/client";
import { ICustomer } from "../customer_repository";
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
    cname?: string,
    initial?: string
  ): Promise<Customer | null> {
    const customer: Customer = await this.repository.customer.create({
      data: {
        Email: email,
        Customer_type: type,
        Password: password,
        Phone: phone,
        Lname: lname,
        Initial: initial,
        Cname: cname,
        Fname: fname,
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
