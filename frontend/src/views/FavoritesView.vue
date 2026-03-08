<template>
  <div class="px-6 pt-8 space-y-8 pb-32">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-black text-gray-900 dark:text-white">Mes Favoris</h1>
      <span class="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
        {{ favoriteListings.length }} Annonces
      </span>
    </div>

    <div v-if="favoriteListings.length > 0" class="flex flex-col gap-4">
      <ListingCard 
        v-for="listing in favoriteListings" 
        :key="listing.id"
        :listing="listing"
        variant="horizontal"
        @click="$router.push(`/listings/${listing.id}`)"
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-24 text-center space-y-6">
      <div class="size-24 bg-surface-warm dark:bg-neutral-800 rounded-[2rem] flex items-center justify-center text-neutral-300">
        <span class="material-symbols-outlined text-5xl">favorite</span>
      </div>
      <div>
        <h3 class="text-xl font-black text-gray-900 dark:text-white mb-2">Aucun coup de cœur ?</h3>
        <p class="text-sm font-medium text-neutral-500 leading-relaxed max-w-[240px] mx-auto">
          Explorez nos annonces premium et ajoutez vos préférées ici pour les retrouver facilement.
        </p>
      </div>
      <button @click="$router.push('/')" class="bg-primary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">
        Découvrir les annonces
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useListingsStore } from '@/stores/listings';
import ListingCard from '@/components/ListingCard.vue';

const listingsStore = useListingsStore();

const favoriteListings = computed(() => listingsStore.favorites || []);

onMounted(() => {
  listingsStore.fetchFavorites();
});
</script>
