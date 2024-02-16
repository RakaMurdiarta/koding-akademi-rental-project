import { Admin, Customer, OwnerRequestHistory } from "@prisma/client";

export interface IAdminService {
  addAdmin(admin: Omit<Admin, "id">): Promise<Admin>;
  acceptOwnerRequest(customerId : string) : Promise<boolean>
  getListRequestOwner() : Promise<OwnerRequestHistory[]>
}
