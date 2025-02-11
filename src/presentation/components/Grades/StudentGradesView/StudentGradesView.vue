<template>
  <div class="grades-container">
    <h1 class="text-2xl font-bold mb-4">Mes Notes</h1>

    <div v-if="loading" class="text-center">
      <p>Chargement des notes...</p>
    </div>

    <div v-else>
      <ul v-if="grades.length > 0">
        <li
          v-for="grade in grades"
          :key="grade.id"
          class="mb-2 p-4 bg-white shadow rounded"
        >
          <p><strong>Matière :</strong> {{ grade.courseName }}</p>

          <p><strong>Note :</strong> {{ grade.note }}</p>
          <p>
            <strong>Date :</strong>
            {{ new Date(grade.date).toLocaleDateString() }}
          </p>
        </li>
      </ul>

      <p v-else class="text-gray-500">Aucune note disponible.</p>
    </div>

    <div v-if="error" class="text-red-500 text-center mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStudentGradesViewModel } from "@/presentation/viewmodels/Grades/GradesViewModel";

const { fetchGrades, grades, loading, error } = useStudentGradesViewModel();

onMounted(() => {
  fetchGrades();
});
</script>
