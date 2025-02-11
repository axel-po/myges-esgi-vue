<template>
  <ProfileView />
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Dashboard Professeur
      </h1>

      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Gestion des notes</h2>
        <div class="space-y-4">
          <button
            @click="navigateToAddGrade"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter une Note
          </button>

          <EditGradeView />
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6 mt-6">
        <h2 class="text-xl font-semibold mb-4">Vos documents</h2>
        <div class="space-y-4">
          <button
            @click="navigateToAddDocument"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter un document
          </button>

          <ViewStorage />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditGradeView from "@/presentation/components/Grades/EditGradeView/EditGradeView.vue";
import ProfileView from "../profile/ProfileView.vue";
import { useRouter } from "vue-router";
import ViewStorage from "@/presentation/components/Storage/ViewStorage.vue";

const router = useRouter();

const navigateToAddGrade = () => {
  router.push("/teacher/add-grade");
};

const navigateToAddDocument = () => {
  router.push("/storage/add");
};
</script>
