import { ref } from "vue";
import { useUserStore } from "@/presentation/store/user.store";
import type { User } from "@/domain/entities/User";

export function useUserViewModel() {
  const userStore = useUserStore();
  const users = ref<User[]>(userStore.users);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      await userStore.fetchUsers();
      users.value = userStore.users;
    } catch (err) {
      error.value = "Erreur lors de la récupération des utilisateurs.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}
