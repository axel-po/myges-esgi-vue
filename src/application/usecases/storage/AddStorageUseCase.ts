import type { Storage } from "@/domain/entities/Storage";
import type { IStorageRepository } from "@/domain/repositories/IStorageRepository";

export class AddStorageUseCase {
  constructor(private storageRepository: IStorageRepository) {}

  async execute(storage: Omit<Storage, "id">): Promise<void> {
    await this.storageRepository.addStorage(storage);
  }
}
