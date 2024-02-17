import { Rents } from "@prisma/client";

export interface IRent{
  getRentById(rent_id: string) : Promise<Rents | null>
}