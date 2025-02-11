import { ref } from "vue";
import { useCourseStore } from "@/presentation/store/course.store";

export function useCoursesViewModel() {
  const courseStore = useCourseStore();
  const courses = ref(courseStore.courses);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCourses = async () => {
    loading.value = true;
    error.value = null;

    try {
      await courseStore.fetchCourses();
    } catch (err) {
      error.value = "Erreur lors de la récupération des cours.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
  };
}
