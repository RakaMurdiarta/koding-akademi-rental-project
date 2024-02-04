import { Admin } from "@prisma/client";
import { AdminRepository } from "../../repository/impl/admin_impl";
import { IAdminService } from "../iserviceAdmin";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";

class AdminService implements IAdminService {
  private readonly adminrepo: AdminRepository;

  constructor() {
    this.adminrepo = new AdminRepository();
  }

  addAdmin = async (admin: Omit<Admin, "id">): Promise<Admin> => {
    const adm = await this.adminrepo.insert(admin.username, admin.password);

    if (!adm) {
      throw new ApiError("failed create admin", HttpStatusCode.BadRequest);
    }
    return adm;
  };
}

export const adminservice = new AdminService();
