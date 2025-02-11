import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { User } from "@/domain/entities/User";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    return await this.userRepository.signIn(email, password);
  }
}
