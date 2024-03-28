import { PrismaClient, Rents } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";
import { IRent } from "../irent";

export class RentRepository implements IRent {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  insert = async (rent: Omit<Rents, "id">): Promise<Rents | null> => {
    /* 

        @TODO : add data or record into rent table  
    */
    return null;
  };

  getRentById = async (rent_id: string): Promise<Rents | null> => {
    /* 

        @TODO : get data or record by rent id
        @param: rent id  
    */

    return null;
  };

  getListRentByCustomerId = async (custId: string): Promise<Rents[] | []> => {
    /* 

        @TODO : get list of data or record by customer id
        @param: customer id  
    */

    return [];
  };
}
