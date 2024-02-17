import { HttpStatusCode } from "axios";
import { ApiError } from "../../exception/baseError";
import CustomerRepository from "../../repository/impl/customer_impl";
import { VehcileRepository } from "../../repository/impl/vehicle_impl";
import { IRentServices } from "../irentService";
import { RentRepository } from "../../repository/impl/rent_impl";
import { Rents } from "@prisma/client";
import { calculateNumberOfDays } from "../../utils/helper";
import { DetailsRecipient, Recipient, sendEmail } from "../../mail/mailer";

class RentServices implements IRentServices {
  private readonly customerRepo: CustomerRepository;
  private readonly vehicleRepo: VehcileRepository;
  private readonly rentRepo: RentRepository;

  constructor() {
    this.customerRepo = new CustomerRepository();
    this.vehicleRepo = new VehcileRepository();
    this.rentRepo = new RentRepository();
  }

  rent = async (
    customerId: string,
    vehicleId: string,
    from: string,
    until: string,
    amountDue: number
  ): Promise<string> => {
    //get customerId

    const cust = await this.customerRepo.getCustomerById(customerId);

    if (!cust) {
      throw new ApiError("invalid credential", HttpStatusCode.NotFound);
    }

    const vehi = await this.vehicleRepo.getVehicleById(vehicleId);

    if (!vehi) {
      throw new ApiError("invalid credential", HttpStatusCode.NotFound);
    }
    console.log(new Date(from));
    const noOfDays = calculateNumberOfDays(new Date(from), new Date(until));

    const data: Omit<Rents, "id"> = {
      customerId: cust.id,
      vehicleId: vehi.id,
      startDate: new Date(from),
      returnDate: new Date(until),
      active: true,
      amountDue: amountDue,
      noOfDays,
    };

    const rent = await this.rentRepo.insert(data);

    const payloadEmail: Recipient = {
      to: cust.email,
      subject: "invoices",
      details: {
        name: cust.fullname,
        identityNumber: vehi.model,
        start: from,
        return: until,
        price: vehi.price,
        status: "success",
      },
    };

    await sendEmail(payloadEmail);

    if (!rent) {
      throw new ApiError("rent is failed", HttpStatusCode.BadRequest);
    }

    return rent.id;
  };
}

export const newRentServices = new RentServices();
