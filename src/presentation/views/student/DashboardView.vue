`
<template>
  <ProfileView />
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard étudiant</h1>

      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">emploi du temps</h2>
        <div class="space-y-4">
          <CalendarCoursesView />
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <StudentGradesView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileView from "../profile/ProfileView.vue";
import StudentGradesView from "@/presentation/components/Grades/StudentGradesView/StudentGradesView.vue";
import CalendarCoursesView from "@/presentation/views/student/courses/CalendarCoursesView.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
