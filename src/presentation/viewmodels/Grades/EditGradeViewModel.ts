import { ref, onMounted } from "vue";
import { useGradeStore } from "@/presentation/store/grade.store";
import { useUserStore } from "@/presentation/store/user.store";
import type { Grade } from "@/domain/entities/Grade";
import type { User } from "@/domain/entities/User";

export function useEditGradeViewModel() {
  const gradeStore = useGradeStore();
  const userStore = useUserStore();

  const students = ref<User[]>([]);
  const selectedStudent = ref<string>("");
  const grades = ref<Grade[]>([]);
  const selectedGrade = ref<string>("");
  const updatedNote = ref<number | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const isEditing = ref(false);

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

  const fetchGrades = async () => {
    if (!selectedStudent.value) {
      error.value = "Veuillez sélectionner un étudiant.";
      return;
    }

    try {
      loading.value = true;
      grades.value = await gradeStore.fetchGrades(selectedStudent.value);
    } catch (err) {
      error.value = "Erreur lors de la récupération des notes.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateGrade = async () => {
    if (
      !selectedGrade.value ||
      updatedNote.value === null ||
      updatedNote.value < 0 ||
      updatedNote.value > 20
    ) {
      error.value = "Veuillez fournir une note valide (entre 0 et 20).";
      return;
    }

    try {
      loading.value = true;
      await gradeStore.updateGrade(selectedGrade.value, {
        note: updatedNote.value,
      });

      const gradeIndex = grades.value.findIndex(
        (grade) => grade.id === selectedGrade.value
      );
      if (gradeIndex !== -1) {
        grades.value[gradeIndex].note = updatedNote.value;
      }

      isEditing.value = false;
      updatedNote.value = null;
      selectedGrade.value = "";
      error.value = null;

      console.log("Note mise à jour avec succès !");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour de la note.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchStudents();
  });

  return {
    students,
    selectedStudent,
    grades,
    selectedGrade,
    updatedNote,
    error,
    loading,
    isEditing,
    fetchGrades,
    updateGrade,
  };
}
