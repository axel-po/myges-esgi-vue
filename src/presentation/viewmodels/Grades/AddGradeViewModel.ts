import { ref, onMounted } from "vue";
import { useCourseStore } from "@/presentation/store/course.store";
import { useGradeStore } from "@/presentation/store/grade.store";
import { useUserStore } from "@/presentation/store/user.store";
import { useAuthGuard } from "@/presentation/composables/useAuthGuard";
import type { Course } from "@/domain/entities/Course";
import type { User } from "@/domain/entities/User";
import { useRouter } from "vue-router";

export function useAddGradeViewModel() {
  const students = ref<User[]>([]);
  const subjects = ref<Course[]>([]);
  const selectedStudent = ref("");
  const selectedSubject = ref("");
  const note = ref<number | null>(null);
  const date = ref("");
  const error = ref<string | null>(null);

  const courseStore = useCourseStore();
  const gradeStore = useGradeStore();
  const userStore = useUserStore();
  const router = useRouter();

  const { getCurrentUserOrThrow } = useAuthGuard();

  const fetchSubjects = async () => {
    try {
      await courseStore.fetchCourses();
      subjects.value = courseStore.courses;
    } catch (err) {
      error.value = "Erreur lors de la récupération des matières.";
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      await userStore.fetchUsers();
      students.value = userStore.users.filter(
        (user) => user.role === "student"
      );
    } catch (err) {
      error.value = "Erreur lors de la récupération des étudiants.";
      console.error(err);
    }
  };

  const addGrade = async () => {
    if (
      !selectedStudent.value ||
      !selectedSubject.value ||
      note.value === null ||
      !date.value
    ) {
      error.value = "Veuillez remplir tous les champs.";
      return;
    }

    if (note.value < 0 || note.value > 20) {
      error.value = "La note doit être comprise entre 0 et 20.";
      return;
    }

    try {
      const teacherId = getCurrentUserOrThrow();

      await gradeStore.addGrade({
        studentId: selectedStudent.value,
        course_id: selectedSubject.value,
        note: note.value,
        date: new Date(date.value),
        teacherId,
      });

      error.value = null;
      router.push("/");
    } catch (err) {
      error.value = "Erreur lors de l'ajout de la note.";
      console.error(err);
    }
  };

  onMounted(() => {
    fetchSubjects();
    fetchStudents();
  });

  return {
    students,
    subjects,
    selectedStudent,
    selectedSubject,
    note,
    date,
    error,
    fetchSubjects,
    fetchStudents,
    addGrade,
  };
}
