import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthGuard } from "@/presentation/composables/useAuthGuard";
import { useStorageStore } from "@/presentation/store/storage.store";
import type { Storage } from "@/domain/entities/Storage";

export function useStorageViewModel() {
  const storages = ref<Storage[]>([]);
  const storageStore = useStorageStore();
  const loading = ref(false);

  const url = ref("");
  const error = ref<string | null>(null);

  const router = useRouter();
  const { getCurrentUserOrThrow } = useAuthGuard();

  const addStorage = async () => {
    if (!url.value) {
      error.value = "Veuillez fournir une URL.";
      return;
    }

    try {
      const userId = getCurrentUserOrThrow();

      await storageStore.addStorage({
        url: url.value,
        userId,
        createdAt: new Date(),
        classesId: [],
      });

      error.value = null;
      router.push("/");
    } catch (err) {
      error.value = "Erreur lors de l'ajout du document.";
      console.error(err);
    }
  };

  const fetchStorages = async () => {
    try {
      const userId = getCurrentUserOrThrow();
      await storageStore.fetchStorages(userId);
      storages.value = storageStore.storages;
    } catch (err) {
      error.value = "Erreur lors de la récupération des documents.";
      console.error(err);
    }
  };

  onMounted(() => {
    fetchStorages();
  });

  return {
    storages,
    url,
    error,
    loading,
    addStorage,
    fetchStorages,
  };
}
