<template>
  <div class="storage-container">
    <h1 class="text-2xl font-bold mb-4">Mon Stockage</h1>

    <div v-if="loading" class="text-center">
      <p>Chargement du stockage...</p>
    </div>

    <div v-else>
      <ul v-if="storages.length > 0">
        <li
          v-for="item in storages"
          :key="item.id"
          class="mb-2 p-4 bg-white shadow rounded"
        >
          <p><strong>Url:</strong> {{ item.url }}</p>
          <p>
            <strong>Date d'ajout :</strong>
            {{ new Date(item.createdAt.seconds * 1000).toLocaleDateString() }}
          </p>
        </li>
      </ul>

      <p v-else class="text-gray-500">Aucun élément de stockage disponible.</p>
    </div>

    <div v-if="error" class="text-red-500 text-center mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStorageViewModel } from "@/presentation/viewmodels/Storage/StorageViewModel";

const { fetchStorages, storages, loading, error } = useStorageViewModel();

onMounted(() => {
  fetchStorages();
});
</script>
