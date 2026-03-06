<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Modifier l'annonce</h1>

    <div v-if="isLoading">Chargement de l'annonce...</div>
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <form v-if="!isLoading" @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Titre</label>
        <input v-model="form.title" class="w-full border rounded p-2" />
      </div>

      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea v-model="form.description" rows="6" class="w-full border rounded p-2"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium">Prix</label>
        <input type="number" v-model.number="form.price" class="w-full border rounded p-2" />
      </div>

      <div class="flex gap-3">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        <button type="button" @click="onCancel" class="px-4 py-2 bg-gray-200 rounded">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useListingsStore } from '@/stores/listings';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const listingsStore = useListingsStore();

const id = route.params.id;
const isLoading = ref(true);
const error = ref(null);

const form = ref({ title: '', description: '', price: 0 });

async function load() {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await listingsStore.fetchListing(id);
    if (res.success) {
      const l = res.listing;
      const authStore = useAuthStore();
      if (authStore.user && l.owner !== authStore.user.id) {
        error.value = 'Vous n\'êtes pas autorisé(e) à modifier cette annonce.';
        // Naviguer en arrière après un petit délai
        setTimeout(() => router.back(), 1000);
        return;
      }
      form.value.title = l.title;
      form.value.description = l.description;
      form.value.price = l.price;
    } else {
      error.value = res.error || 'Impossible de charger l\'annonce';
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement';
  } finally {
    isLoading.value = false;
  }
}

async function onSubmit() {
  isLoading.value = true;
  error.value = null;
  try {
    const result = await listingsStore.updateExistingListing(id, {
      title: form.value.title,
      description: form.value.description,
      price: form.value.price
    });

    if (result.success) {
      alert('Annonce mise à jour');
      // Retour à la liste
      router.push('/listings');
    } else {
      error.value = result.error || 'Erreur lors de la mise à jour';
    }
  } catch (err) {
    error.value = 'Erreur inattendue';
  } finally {
    isLoading.value = false;
  }
}

function onCancel() {
  router.back();
}

onMounted(load);
</script>

<style scoped>
</style>
