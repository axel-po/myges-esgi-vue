import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/domain/entities/User";
import { FirebaseUserRepository } from "@/infrastructure/firebase/repositories/FirebaseUserRepository";
import { FetchAllUsersUseCase } from "@/application/usecases/users/FetchAllUsersUseCase";

const userRepository = new FirebaseUserRepository();
const fetchAllUsersUseCase = new FetchAllUsersUseCase(userRepository);

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUsers() {
    loading.value = true;
    error.value = null;

    try {
      users.value = await fetchAllUsersUseCase.execute();
    } catch (err) {
      error.value = "Erreur lors de la récupération des utilisateurs.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    fetchUsers,
    loading,
    error,
  };
});
