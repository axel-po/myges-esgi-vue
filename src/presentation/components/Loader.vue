<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/presentation/store/loading.store";
import { computed } from "vue";

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<style scoped>
.loader {
  border: 8px solid rgba(0, 0, 0, 0.2);
  border-top: 8px solid green;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
