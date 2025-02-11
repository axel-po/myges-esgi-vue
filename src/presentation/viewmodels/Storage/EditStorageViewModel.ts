import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthGuard } from "@/presentation/composables/useAuthGuard";
import { useStorageStore } from "@/presentation/store/storage.store";

export function useEditStorageViewModel() {
  const storages = ref<Storage[]>([]);
  const storageStore = useStorageStore();

  const url = ref("");
  const error = ref<string | null>(null);

  const router = useRouter();
  const route = useRoute();
  const { getCurrentUserOrThrow } = useAuthGuard();

  const editStorage = async () => {
    if (!url.value) {
      error.value = "Veuillez fournir une URL.";
      return;
    }

    try {
      const userId = getCurrentUserOrThrow();
      const storageId = route.params.id as string;

      await storageStore.updateStorage(storageId, {
        url: url.value,
        userId,
      });

      error.value = null;
      router.push("/");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour du document.";
      console.error(err);
    }
  };

  onMounted(async () => {
    const userId = getCurrentUserOrThrow();
    await storageStore.fetchStorages(userId);

    const storageId = route.params.id as string;
    const storage = await storageStore.fetchStorages(storageId);
    if (storage) {
      url.value = storage[0].url;
    }
  });

  return {
    storages,
    url,
    error,
    editStorage,
  };
}
