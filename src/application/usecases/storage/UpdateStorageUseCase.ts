import type { Storage } from "@/domain/entities/Storage";
import type { IStorageRepository } from "@/domain/repositories/IStorageRepository";

export class UpdateStorageUseCase {
  constructor(private storageRepository: IStorageRepository) {}

  async execute(
    storageId: string,
    updatedStorage: Partial<Storage>
  ): Promise<void> {
    return this.storageRepository.updateStorage(storageId, updatedStorage);
  }
}
