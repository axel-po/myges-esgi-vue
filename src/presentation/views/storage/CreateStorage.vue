<template>
  <div
    class="add-storage-container max-w-3xl mx-auto p-6 flex flex-col space-y-6"
  >
    <button
      @click="goHome"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit"
    >
      Retour
    </button>

    <h2 class="text-2xl font-bold mb-4">
      Ajouter un document dans le stockage
    </h2>

    <form class="space-y-4" @submit.prevent="addStorage">
      <div>
        <label class="block font-bold mb-1" for="url">Url du document :</label>
        <input
          id="url"
          v-model="url"
          class="border rounded p-2 w-full"
          placeholder="Entrez l'url du document"
          required
        />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAddStorageViewModel } from "@/presentation/viewmodels/Storage/AddStorageViewModel";
import { useRouter } from "vue-router";

const { url, addStorage } = useAddStorageViewModel();

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>
