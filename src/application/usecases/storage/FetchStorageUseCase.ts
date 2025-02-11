import type { Storage } from "@/domain/entities/Storage";
import type { IStorageRepository } from "@/domain/repositories/IStorageRepository";

export class FetchStorageUseCase {
  constructor(private storageRepository: IStorageRepository) {}

  async execute(user_id: string): Promise<Storage[]> {
    return await this.storageRepository.getStorages(user_id);
  }
}
