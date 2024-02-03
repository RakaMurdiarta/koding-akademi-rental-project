import { PrismaClient } from "@prisma/client";
import { IUser } from "../user_repository";
import prisma from "@/app/backend/config/prismaSingleton";

class UserRepository implements IUser {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async insert(email: string, password: string): Promise<void> {
    await this.repository.user.create({ data: { email, name: password } });
  }

  async update(user_id: string): Promise<void> {}
}

const userRepo = new UserRepository();

export default userRepo;
