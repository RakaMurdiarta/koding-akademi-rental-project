import { Customer, CustomerType, PrismaClient } from "@prisma/client";
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
    type: CustomerType,
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
      },
    });

    if (!customer) {
      throw new ApiError("failed to create customer");
    } else {
      return customer;
    }
  }

  getCustomerByEmail = async (email:string) : Promise<Customer | null> => {
      const customer = await this.repository.customer.findFirst({
        where : {
          email
        }
      })

      if(!customer){
        return null
      }

      return customer
  }

  getCustomerById = async (custId:string) : Promise<Customer | null> => {
    const customer = await this.repository.customer.findFirst({
      where : {
        id : custId
      }
    })

    if(!customer){
      return null
    }

    return customer
}
}

export default CustomerRepository;
