import { Admin, OwnerRequestHistory } from "@prisma/client";

export interface IAdmin {
  insert(username: string, password: string): Promise<Admin | null>;
  acceptRequestOwner(customerId : string) : Promise<boolean>
  getListRequesttOwner() : Promise<OwnerRequestHistory[] | []>
}
