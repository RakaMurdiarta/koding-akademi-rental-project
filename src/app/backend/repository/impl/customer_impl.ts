import {
  Customer,
  CustomerType,
  PrismaClient,
  StatusRequestOwner,
} from "@prisma/client";
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
    fullname: string,
    phone: string,
    type: CustomerType,
    cname?: string
  ): Promise<Customer | null> {
    const customer: Customer = await this.repository.customer.create({
      data: {
        email,
        customerType: type,
        password,
        phone,
        cname,
        fullname,
      },
    });

    if (!customer) {
      throw new ApiError("failed to create customer");
    } else {
      return customer;
    }
  }

  getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    const customer = await this.repository.customer.findFirst({
      where: {
        email,
      },
    });

    if (!customer) {
      return null;
    }

    return customer;
  };

  getCustomerById = async (custId: string): Promise<Customer | null> => {
    const customer = await this.repository.customer.findFirst({
      where: {
        id: custId,
      },
    });

    if (!customer) {
      return null;
    }

    return customer;
  };

  requestOwner = async (customerId: string): Promise<string | null> => {
    const requsetOwner = await this.repository.ownerRequestHistory.create({
      data: {
        customerId: customerId,
        status: StatusRequestOwner.requested,
      },
    });

    if (!requsetOwner) {
      return null;
    }
    return "request is success. waiting for admin reviewing";
  };
  async isOwner(customerId: string): Promise<string> {
    const history = await this.repository.ownerRequestHistory.findFirst({
      where: { customerId },
    });

    if (!history) {
      return "notOwner";
    }

    if (
      history.status.toLowerCase() ===
      StatusRequestOwner.requested.toLowerCase()
    ) {
      return "pending";
    }

    return "isOwner";
  }
}

export default CustomerRepository;
