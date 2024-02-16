import { $Enums, Admin, OwnerRequestHistory } from "@prisma/client";
import { AdminRepository } from "../../repository/impl/admin_impl";
import { OwnerRepository } from "../../repository/impl/owner_impl";
import { IAdminService } from "../iserviceAdmin";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";

class AdminService implements IAdminService {
  private readonly adminrepo: AdminRepository;
  private readonly ownerRepo: OwnerRepository;

  constructor() {
    this.adminrepo = new AdminRepository();
    this.ownerRepo = new OwnerRepository();
  }

  addAdmin = async (admin: Omit<Admin, "id">): Promise<Admin> => {
    const adm = await this.adminrepo.insert(admin.username, admin.password);

    if (!adm) {
      throw new ApiError("failed create admin", HttpStatusCode.BadRequest);
    }
    return adm;
  };

  acceptOwnerRequest = async (customerId: string): Promise<boolean> => {
    const resp = await this.adminrepo.acceptRequestOwner(customerId);

    if (resp) {
      await this.ownerRepo.insert(customerId);
    }
    //addOwner
    return resp;
  };

  getListRequestOwner = async (): Promise<OwnerRequestHistory[]> => {
    return await this.adminrepo.getListRequesttOwner();
  };
}

export const adminservice = new AdminService();
