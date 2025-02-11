import { useAuthStore } from "@/presentation/store/auth.store";

export function useAuthGuard() {
  const authStore = useAuthStore();

  function getCurrentUserOrThrow(): string {
    if (!authStore.currentUser?.uid) {
      throw new Error("Aucun utilisateur connecté.");
    }
    return authStore.currentUser.uid;
  }

  return {
    getCurrentUserOrThrow,
  };
}
