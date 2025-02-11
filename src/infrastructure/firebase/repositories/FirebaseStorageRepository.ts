import { collection, doc, addDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/infrastructure/config/firebase";
import { FIREBASE_COLLECTIONS } from "@/infrastructure/config/firebaseCollections";
import type { Storage } from "@/domain/entities/Storage";
import type { IStorageRepository } from "@/domain/repositories/IStorageRepository";
import { useLoadingStore } from "@/presentation/store/loading.store";
import { query, getDocs } from "firebase/firestore";

export class FirebaseStorageRepository implements IStorageRepository {
  async addStorage(storage: Omit<Storage, "id">): Promise<void> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();
      const storageRef = collection(db, FIREBASE_COLLECTIONS.STORAGE);
      await addDoc(storageRef, storage);
    } catch (err) {
      console.error("Erreur lors de l'ajout du document :", err);
      throw new Error("Impossible d'ajouter le document. Veuillez réessayer.");
    } finally {
      loadingStore.stopLoading();
    }
  }

  async updateStorage(
    storageId: string,
    updatedData: Partial<Storage>
  ): Promise<void> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const storageRef = doc(db, FIREBASE_COLLECTIONS.STORAGE, storageId);
      await updateDoc(storageRef, updatedData);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du document :", err);
      throw new Error(
        "Impossible de mettre à jour le document. Veuillez réessayer."
      );
    } finally {
      loadingStore.stopLoading();
    }
  }

  async getStorages(userId: string): Promise<Storage[]> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();
      const storageRef = collection(db, FIREBASE_COLLECTIONS.STORAGE);
      const storageQuery = query(storageRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(storageQuery);
      const storages: Storage[] = [];

      querySnapshot.forEach((doc) => {
        storages.push({ id: doc.id, ...doc.data() } as Storage);
      });

      return storages;
    } catch (err) {
      console.error("Erreur lors de la récupération des documents :", err);
      throw new Error(
        "Impossible de récupérer les documents. Veuillez réessayer."
      );
    } finally {
      loadingStore.stopLoading();
    }
  }
}
