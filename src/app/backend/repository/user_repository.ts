export interface IUser {
  insert(email: string, password: string): Promise<void>;
  update(user_id: string): Promise<void>;
}
