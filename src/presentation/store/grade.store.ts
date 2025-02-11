import { defineStore } from "pinia";
import { ref } from "vue";
import type { Grade } from "@/domain/entities/Grade";
import { FirebaseGradesRepository } from "@/infrastructure/firebase/repositories/FirebaseGradesRepository";
import { FetchStudentGradesUseCase } from "@/application/usecases/grades/FetchStudentGradesUseCase";
import { AddGradeUseCase } from "@/application/usecases/grades/AddGradeUseCase";
import { UpdateGradeUseCase } from "@/application/usecases/grades/UpdateGradeUseCase";

const gradesRepository = new FirebaseGradesRepository();
const fetchStudentGradesUseCase = new FetchStudentGradesUseCase(
  gradesRepository
);
const addGradeUseCase = new AddGradeUseCase(gradesRepository);
const updateGradeUseCase = new UpdateGradeUseCase(gradesRepository);

export const useGradeStore = defineStore("grade", () => {
  const grades = ref<Grade[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchGrades(studentId: string) {
    loading.value = true;
    error.value = null;

    try {
      grades.value = await fetchStudentGradesUseCase.execute(studentId);
    } catch (err) {
      error.value = "Erreur lors de la récupération des notes.";
      console.error("Erreur lors de la récupération des notes :", err);
    } finally {
      loading.value = false;
    }

    return grades.value;
  }

  async function addGrade(newGrade: Omit<Grade, "id">) {
    loading.value = true;
    error.value = null;

    try {
      await addGradeUseCase.execute(newGrade);
      console.log("Note ajoutée avec succès !");
    } catch (err) {
      error.value = "Erreur lors de l'ajout de la note.";
      console.error("Erreur lors de l'ajout de la note :", err);
    } finally {
      loading.value = false;
    }
  }

  async function updateGrade(gradeId: string, updatedData: Partial<Grade>) {
    loading.value = true;
    error.value = null;

    try {
      await updateGradeUseCase.execute(gradeId, updatedData);

      const gradeIndex = grades.value.findIndex(
        (grade) => grade.id === gradeId
      );
      if (gradeIndex !== -1) {
        grades.value[gradeIndex] = {
          ...grades.value[gradeIndex],
          ...updatedData,
        };
      }

      console.log("Note mise à jour avec succès !");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour de la note.";
      console.error("Erreur lors de la mise à jour de la note :", err);
    } finally {
      loading.value = false;
    }
  }

  return {
    grades,
    loading,
    error,
    fetchGrades,
    addGrade,
    updateGrade,
  };
});
