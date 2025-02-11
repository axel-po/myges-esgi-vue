import { defineStore } from "pinia";
import { ref } from "vue";
import { FirebaseStorageRepository } from "@/infrastructure/firebase/repositories/FirebaseStorageRepository";
import { AddStorageUseCase } from "@/application/usecases/storage/AddStorageUseCase";
import { UpdateStorageUseCase } from "@/application/usecases/storage/UpdateStorageUseCase";
import { FetchStorageUseCase } from "@/application/usecases/storage/FetchStorageUseCase";
import type { Storage } from "@/domain/entities/Storage";

const storageRepository = new FirebaseStorageRepository();
const addStorageUseCase = new AddStorageUseCase(storageRepository);
const updateStorageUseCase = new UpdateStorageUseCase(storageRepository);
const fetchStorageUseCase = new FetchStorageUseCase(storageRepository);

export const useStorageStore = defineStore("storage", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const storages = ref<Storage[]>([]);

  async function fetchStorages(user_id: string) {
    loading.value = true;
    error.value = null;
    try {
      storages.value = await fetchStorageUseCase.execute(user_id);
    } catch (err) {
      error.value = "Erreur lors de la récupération des documents.";
      console.error("Erreur lors de la récupération des documents :", err);
    } finally {
      loading.value = false;
    }

    return storages.value;
  }

  async function addStorage(newStorage: Omit<Storage, "id">) {
    loading.value = true;
    error.value = null;
    try {
      await addStorageUseCase.execute(newStorage);
      console.log("Document ajoutée avec succès !");
    } catch (err) {
      error.value = "Erreur lors de l'ajout du document.";
      console.error("Erreur lors de l'ajout du document :", err);
    } finally {
      loading.value = false;
    }

    return storages.value;
  }

  async function updateStorage(
    storageId: string,
    updatedData: Partial<Storage>
  ) {
    loading.value = true;
    error.value = null;

    try {
      await updateStorageUseCase.execute(storageId, updatedData);

      const storageIndex = storages.value.findIndex(
        (storage) => storage.id === storageId
      );
      if (storageIndex !== -1) {
        storages.value[storageIndex] = {
          ...storages.value[storageIndex],
          ...updatedData,
        };
      }

      console.log("Document mise à jour avec succès !");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour du document.";
      console.error("Erreur lors de la mise à jour du document :", err);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    storages,
    addStorage,
    updateStorage,
    fetchStorages,
  };
});
