<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-24">
    <!-- Hero Section -->
    <section class="max-w-md mx-auto px-4 pt-10 pb-8 text-center sm:max-w-2xl sm:text-left">
      <h2 class="text-3xl font-black leading-tight mb-4 md:text-5xl md:mb-8 text-slate-900 dark:text-white">Découvrez votre prochain foyer en toute simplicité</h2>
      
      <!-- AI Search Bar -->
      <div class="relative group max-w-2xl mx-auto sm:mx-0">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="material-symbols-outlined text-primary notranslate" translate="no">auto_awesome</span>
        </div>
        <input 
          v-model="searchQuery"
          @keyup.enter="handleAISearch"
          class="block w-full h-16 pl-12 pr-4 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-xl shadow-primary/5 focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 transition-all" 
          placeholder="Demander à l'assistant IA..." 
          type="text"
        />
        <button 
          @click="handleAISearch"
          class="absolute right-2 top-2 bottom-2 bg-primary text-white px-5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/10"
        >
          <span class="material-symbols-outlined text-sm notranslate" translate="no">search</span>
          <span class="hidden sm:inline">Rechercher</span>
        </button>
      </div>
    </section>

    <!-- Categories / Filters -->
    <section class="mb-10">
      <div class="flex gap-4 px-4 overflow-x-auto hide-scrollbar max-w-7xl mx-auto sm:justify-center">
        <button 
          v-for="cat in categories" 
          :key="cat.type"
          @click="selectedCategory = cat.type"
          :class="[
            'flex flex-col items-center gap-2 min-w-[72px] transition-all group',
            selectedCategory === cat.type ? 'scale-105' : 'opacity-70 grayscale'
          ]"
        >
          <div 
            :class="[
              'size-14 rounded-2xl flex items-center justify-center transition-all shadow-sm border',
              selectedCategory === cat.type 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-50 dark:group-hover:bg-slate-750'
            ]"
          >
            <span class="material-symbols-outlined text-2xl notranslate" translate="no" :style="selectedCategory === cat.type ? 'font-variation-settings: \'FILL\' 1' : ''">{{ cat.icon }}</span>
          </div>
          <span :class="['text-[11px] font-bold tracking-tight', selectedCategory === cat.type ? 'text-primary dark:text-slate-100' : 'text-slate-500']">{{ cat.name }}</span>
        </button>
      </div>
    </section>

    <!-- Featured Listings Section -->
    <section class="max-w-md mx-auto px-4 sm:max-w-7xl">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Annonces prioritaires</h3>
        <router-link to="/search" class="text-primary dark:text-slate-300 font-bold text-sm flex items-center gap-1 hover:underline">
          Voir tout
          <span class="material-symbols-outlined text-sm notranslate" translate="no">arrow_forward</span>
        </router-link>
      </div>

      <!-- Grid responsive -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="listing in premiumListings" 
          :key="listing.id"
          class="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-50 dark:border-slate-800 group cursor-pointer hover:shadow-xl hover:border-primary/10 transition-all duration-300 active:scale-[0.98]"
          @click="$router.push(`/listings/${listing.id}`)"
        >
          <div class="relative h-60">
            <img 
              :src="listing.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" 
              :alt="listing.titre" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute top-4 left-4">
               <span class="bg-primary/95 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Premium</span>
            </div>
            <button 
              @click.stop="toggleFavorite(listing.id)"
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 dark:text-white shadow-lg active:scale-90 transition-transform"
            >
              <span 
                :class="['material-symbols-outlined text-xl notranslate', listing.is_favorited ? 'fill-1 text-red-500' : '']"
                translate="no"
              >
                favorite
              </span>
            </button>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-start gap-4 mb-4">
              <div class="flex-1 min-w-0">
                <h4 class="font-black text-lg text-slate-900 dark:text-white truncate tracking-tight">{{ listing.titre }}</h4>
                <div class="flex items-center text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
                  <span class="material-symbols-outlined text-sm mr-1 text-primary notranslate" translate="no">location_on</span>
                  {{ listing.localisation }}
                </div>
              </div>
              <div class="text-right">
                <span class="text-primary dark:text-slate-100 font-black text-xl leading-none">{{ (listing.price || 0).toLocaleString() }}</span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-1">GNF / MOIS</span>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-2 py-4 border-t border-slate-50 dark:border-slate-700/50">
              <div class="flex flex-col items-center gap-1">
                <span class="material-symbols-outlined text-primary text-xl notranslate" translate="no">bed</span>
                <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">{{ listing.exigences?.chambres || 0 }} CH</span>
              </div>
              <div class="flex flex-col items-center gap-1 border-x border-slate-50 dark:border-slate-700/50">
                <span class="material-symbols-outlined text-primary text-xl notranslate" translate="no">bathtub</span>
                <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">{{ listing.exigences?.salles_de_bain || 0 }} SDB</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <span class="material-symbols-outlined text-primary text-xl notranslate" translate="no">square_foot</span>
                <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">{{ listing.exigences?.surface || 0 }} m²</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Skeleton if loading -->
        <template v-if="isLoading && premiumListings.length === 0">
           <div v-for="i in 3" :key="i" class="h-[420px] bg-white dark:bg-slate-800 rounded-3xl animate-pulse border border-slate-100 dark:border-slate-800"></div>
        </template>
        
        <!-- Empty state -->
        <div v-if="!isLoading && premiumListings.length === 0" class="col-span-full py-16 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-50 dark:border-slate-800 shadow-sm">
          <div class="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-slate-400 text-3xl notranslate" translate="no">sentiment_dissatisfied</span>
          </div>
          <p class="text-slate-500 font-bold">Aucune annonce disponible.</p>
          <button @click="listingsStore.fetchListings()" class="text-primary text-sm font-bold mt-2 underline">Réessayer</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useListingsStore } from '@/stores/listings';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const listingsStore = useListingsStore();
const authStore = useAuthStore();

const selectedCategory = ref('Tous');
const premiumListings = computed(() => {
  let list = (listingsStore.listings || []).filter(l => l.is_premium);
  if (list.length === 0) list = (listingsStore.listings || []); // Fallback to avoid empty static page
  
  if (selectedCategory.value === 'Tous') {
    return list.slice(0, 6);
  }
  return list.filter(p => 
    p.exigences?.type?.toLowerCase() === selectedCategory.value.toLowerCase()
  ).slice(0, 6);
});
const searchQuery = ref('');
const isLoading = computed(() => listingsStore.isLoading);

const categories = [
  { type: 'Tous', name: 'Tous', icon: 'grid_view' },
  { type: 'apartment', name: 'Appartement', icon: 'apartment' },
  { type: 'villa', name: 'Villa', icon: 'villa' },
  { type: 'studio', name: 'Studio', icon: 'holiday_village' },
  { type: 'chambre', name: 'Chambres', icon: 'bed' },
  { type: 'concession', name: 'Concession', icon: 'home_work' }
];

const listings = computed(() => listingsStore.listings || []);

const handleAISearch = () => {
  if (!authStore.isAuthenticated) {
    router.push({ 
      path: '/login', 
      query: { 
        redirect: '/assistant-ia',
        message: 'Veuillez vous connecter pour utiliser la recherche intelligente.' 
      } 
    });
    return;
  }
  if (searchQuery.value.trim()) {
    router.push({ path: '/assistant-ia', query: { q: searchQuery.value } });
  }
};

const toggleFavorite = async (id) => {
  await listingsStore.toggleListingFavorite(id);
};

onMounted(async () => {
  await listingsStore.fetchListings();
});
</script>

<style scoped>
  .fill-1 { font-variation-settings: 'FILL' 1; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
