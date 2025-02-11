import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthGuard } from "@/presentation/composables/useAuthGuard";
import { useStorageStore } from "@/presentation/store/storage.store";

export function useAddStorageViewModel() {
  const storages = ref<Storage[]>([]);
  const storageStore = useStorageStore();

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

  onMounted(() => {
    const userId = getCurrentUserOrThrow();
    storageStore.fetchStorages(userId);
  });

  return {
    storages,
    url,
    error,
    addStorage,
  };
}
