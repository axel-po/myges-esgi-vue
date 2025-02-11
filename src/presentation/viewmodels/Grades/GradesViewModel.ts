import { ref } from "vue";
import { useGradeStore } from "@/presentation/store/grade.store";
import { useAuthGuard } from "@/presentation/composables/useAuthGuard";
import type { Grade } from "@/domain/entities/Grade";

export function useStudentGradesViewModel() {
  const studentStore = useGradeStore();
  const { getCurrentUserOrThrow } = useAuthGuard();

  const grades = ref<(Grade & { courseName: string })[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchGrades = async () => {
    loading.value = true;
    error.value = null;

    try {
      const studentId = getCurrentUserOrThrow();
      const fetchedGrades = await studentStore.fetchGrades(studentId);

      grades.value = fetchedGrades.map((grade) => ({
        ...grade,
        courseName: grade.courseName || "Cours inconnu",
      }));
    } catch (err: any) {
      error.value = err.message || "Une erreur s'est produite.";
      console.error("Erreur lors de la récupération des notes :", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    grades,
    loading,
    error,
    fetchGrades,
  };
}
