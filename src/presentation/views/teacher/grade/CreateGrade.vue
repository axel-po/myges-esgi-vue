<template>
  <div class="add-grade-container">
    <button
      @click="goHome"
      class="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
    >
      Retour à la Home
    </button>

    <h1 class="text-2xl font-bold mb-4">Ajouter une Note</h1>

    <form class="space-y-4" @submit.prevent="addGrade">
      <div>
        <label class="block font-bold mb-1" for="student">Étudiant :</label>
        <select
          id="student"
          v-model="selectedStudent"
          class="border rounded p-2 w-full"
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

      <div>
        <label class="block font-bold mb-1" for="subject">Matière :</label>
        <select
          id="subject"
          v-model="selectedSubject"
          class="border rounded p-2 w-full"
          required
        >
          <option disabled value="">Sélectionnez une matière</option>
          <option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id"
          >
            {{ subject.title }}
          </option>
        </select>
      </div>

      <div>
        <label class="block font-bold mb-1" for="note">Note :</label>
        <input
          id="note"
          type="number"
          v-model.number="note"
          class="border rounded p-2 w-full"
          placeholder="Entrez une note entre 0 et 20"
          required
        />
        <p v-if="note !== null && (note < 0 || note > 20)" class="text-red-500">
          La note doit être comprise entre 0 et 20.
        </p>
      </div>

      <div>
        <label class="block font-bold mb-1" for="date">Date :</label>
        <input
          id="date"
          type="date"
          v-model="date"
          class="border rounded p-2 w-full"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Ajouter la Note
      </button>
    </form>

    <div v-if="error" class="text-red-500 text-center mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { useAddGradeViewModel } from "@/presentation/viewmodels/Grades/AddGradeViewModel";
import { useRouter } from "vue-router";

const {
  students,
  subjects,
  selectedStudent,
  selectedSubject,
  note,
  date,
  error,
  addGrade,
} = useAddGradeViewModel();

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

<style scoped>
.add-grade-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
