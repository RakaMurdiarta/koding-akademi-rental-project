import { Availability } from "@prisma/client";

export interface IAvailability {
  insert( availability : Availability) : Promise<Availability>
}