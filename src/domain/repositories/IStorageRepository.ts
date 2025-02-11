import type { Storage } from "@/domain/entities/Storage";

export interface IStorageRepository {
  addStorage(storage: Omit<Storage, "id">): Promise<void>;
  updateStorage(
    storageId: string,
    updatedData: Partial<Storage>
  ): Promise<void>;
  getStorages(user_id: string): Promise<Storage[]>;
}
