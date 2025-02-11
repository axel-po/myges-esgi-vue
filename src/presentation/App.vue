<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/presentation/store/auth.store";
import Loader from "./components/Loader.vue";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initialize();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold">MyGes</h1>
            </div>
          </div>
          <div class="flex items-center">
            <button
              v-if="authStore.currentUser"
              @click="authStore.logout"
              class="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </nav>
    <Loader />
    <router-view />
  </div>
</template>
