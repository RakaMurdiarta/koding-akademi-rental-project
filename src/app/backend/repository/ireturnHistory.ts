import { ReturnHistory } from "@prisma/client";

export type NewReturnType = Omit<ReturnHistory,"id">
export interface IReturnHistory {
  insert(data: NewReturnType) : Promise<ReturnHistory| null>
}