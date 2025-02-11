import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/domain/entities/User";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { FirebaseUserRepository } from "@/infrastructure/firebase/repositories/FirebaseUserRepository";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/infrastructure/config/firebase";
import { useRouter } from "vue-router";

const userRepository = new FirebaseUserRepository();
const loginUseCase = new LoginUseCase(userRepository);

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const router = useRouter();

  async function initialize() {
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userData = await userRepository.getCurrentUser();
          currentUser.value = userData || null;
        } else {
          currentUser.value = null;
        }
        resolve();
      });
    });
  }

  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      currentUser.value = await loginUseCase.execute(email, password);
    } catch (err) {
      error.value = "Invalid credentials";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    await userRepository.signOut();
    currentUser.value = null;
    router.push("/login");
  }

  return {
    currentUser,
    loading,
    error,
    initialize,
    login,
    logout,
  };
});
