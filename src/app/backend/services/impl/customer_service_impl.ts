import { Customer } from "@prisma/client";
import CustomerRepository from "../../repository/impl/customer_impl";
import { ICustomerService } from "../iserviceCustomer";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";

class CustomerService implements ICustomerService {
  private readonly customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }
  addCustomer = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    type: string,
    isOwner: boolean,
    cname?: string,
    intial?: string
  ): Promise<Customer> => {
    try {
      const customer = await this.customerRepository.insert(
        email,
        password,
        fname,
        lname,
        phone,
        type,
        isOwner,
        cname,
        intial
      );

      if (!customer) {
        throw new ApiError(
          "failed to create customer",
          HttpStatusCode.BadRequest
        );
      } else {
        return customer;
      }
    } catch (error: any) {
      throw error;
    }
  };
}

export const customerService = new CustomerService();
