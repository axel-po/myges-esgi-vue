<script setup lang="ts">
import { useAuthStore } from "@/presentation/store/auth.store";

const authStore = useAuthStore();
const user = authStore.currentUser;
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 bg-white rounded shadow mt-12">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div v-if="user" class="space-y-4">
      <p><strong>ID :</strong> {{ user.uid }}</p>
      <p><strong>Nom :</strong> {{ user.lastName }}</p>
      <p><strong>Prénom :</strong> {{ user.firstName }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Rôle :</strong> {{ user.role }}</p>
    </div>
    <div v-else>
      <p class="text-red-500">Aucun utilisateur connecté.</p>
    </div>
  </div>
</template>
