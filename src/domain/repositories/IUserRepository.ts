import type { User } from "../entities/User";

export interface IUserRepository {
  getCurrentUser(): Promise<User | null>;
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  getAllUsers(): Promise<User[]>;
}
