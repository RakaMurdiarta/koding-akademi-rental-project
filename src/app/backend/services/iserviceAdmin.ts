import { Admin, Customer } from "@prisma/client";

export interface IAdminService {
  addAdmin(admin: Omit<Admin, "id">): Promise<Admin>;
}
