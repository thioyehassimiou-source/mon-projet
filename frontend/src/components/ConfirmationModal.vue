<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
      <p class="text-sm text-neutral-600 mb-4">{{ message }}</p>
      <div class="flex justify-end gap-3">
        <button @click="$emit('cancel')" class="px-4 py-2 rounded bg-gray-100">Annuler</button>
        <button @click="$emit('confirm')" class="px-4 py-2 rounded bg-red-600 text-white">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmer' },
  message: { type: String, default: 'Êtes-vous sûr(e) ?' }
});
</script>

<style scoped>
</style>
