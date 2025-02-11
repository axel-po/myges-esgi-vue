import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/presentation/store/auth.store";
import { UserRole } from "@/domain/enums/UserRole";

export function useLoginViewModel() {
  const router = useRouter();
  const authStore = useAuthStore();

  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const error = ref("");

  const handleSubmit = async () => {
    loading.value = true;
    error.value = "";

    try {
      await authStore.login(email.value, password.value);

      const role = authStore.currentUser?.role;

      router.push(role === UserRole.STUDENT ? "/student" : "/teacher");
    } catch (err) {
      error.value = "Email ou mot de passe incorrect";
    } finally {
      loading.value = false;
    }
  };

  return {
    email,
    password,
    loading,
    error,
    handleSubmit,
  };
}
