<template>
  <div class="edit-grade-container">
    <h1 class="text-2xl font-bold mb-4">Modifier une Note</h1>

    <div class="mb-4">
      <label class="block font-bold mb-1" for="student">Étudiant :</label>
      <select
        id="student"
        v-model="selectedStudent"
        class="border rounded p-2 w-full"
        @change="fetchGrades"
        required
      >
        <option disabled value="">Sélectionnez un étudiant</option>
        <option
          v-for="student in students"
          :key="student.uid"
          :value="student.uid"
        >
          {{ student.firstName }} {{ student.lastName }}
        </option>
      </select>
    </div>

    <div v-if="grades.length > 0" class="mb-4">
      <h2 class="text-xl font-semibold mb-2">Notes de l'étudiant :</h2>
      <ul>
        <li
          v-for="grade in grades"
          :key="grade.id"
          class="p-4 bg-gray-100 shadow rounded mb-2"
        >
          <div class="flex justify-between items-center">
            <span> <strong>Matière :</strong> {{ grade.course_id }} </span>
            <span> <strong>Note :</strong> {{ grade.note }} </span>
            <button
              @click="startEditing(grade.id, grade.note)"
              class="text-blue-500 underline"
            >
              Modifier
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="isEditing" class="mt-6 p-4 bg-white shadow rounded">
      <h3 class="text-lg font-bold mb-2">Modifier la Note</h3>

      <div class="mb-4">
        <label class="block font-bold mb-1" for="new-note"
          >Nouvelle Note :</label
        >
        <input
          id="new-note"
          type="number"
          v-model.number="updatedNote"
          class="border rounded p-2 w-full"
          placeholder="Entrez une note entre 0 et 20"
          required
        />
        <p
          v-if="updatedNote !== null && (updatedNote < 0 || updatedNote > 20)"
          class="text-red-500"
        >
          La note doit être comprise entre 0 et 20.
        </p>
      </div>

      <button
        @click="updateGrade"
        class="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Sauvegarder
      </button>
    </div>

    <div v-if="error" class="text-red-500 text-center mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { useEditGradeViewModel } from "@/presentation/viewmodels/Grades/EditGradeViewModel";

const {
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
} = useEditGradeViewModel();

const startEditing = (gradeId, currentNote) => {
  selectedGrade.value = gradeId;
  updatedNote.value = currentNote;
  isEditing.value = true;
};
</script>

<style scoped>
.edit-grade-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
