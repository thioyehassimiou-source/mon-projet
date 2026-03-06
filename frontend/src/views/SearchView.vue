<template>
  <div class="h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
    <!-- Header Premium & Responsive -->
    <header class="bg-white dark:bg-neutral-900 px-6 pt-6 md:pt-10 pb-4 space-y-4 z-20 border-b border-neutral-100 dark:border-neutral-800 shadow-sm transition-all text-gray-900 dark:text-white">
      <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-center justify-between md:justify-start gap-6">
          <div class="flex items-center gap-4">
            <button @click="$router.push('/')" class="size-11 bg-surface-warm dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-primary active:scale-95 transition-all">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-2xl md:text-3xl font-black tracking-tight">Recherche</h1>
          </div>
          
          <!-- Mobile Toggle (Hidden on Desktop split view) -->
          <div class="md:hidden flex items-center bg-surface-warm dark:bg-neutral-800 rounded-2xl p-1.5 border border-black/5">
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'text-neutral-400'"
              class="size-11 rounded-xl flex items-center justify-center transition-all duration-300"
            >
              <span class="material-symbols-outlined">format_list_bulleted</span>
            </button>
            <button
              @click="viewMode = 'map'"
              :class="viewMode === 'map' ? 'bg-primary text-white shadow-lg' : 'text-neutral-400'"
              class="size-11 rounded-xl flex items-center justify-center transition-all duration-300"
            >
              <span class="material-symbols-outlined">map</span>
            </button>
          </div>
        </div>

        <!-- Search & Quick Filters -->
        <div class="flex flex-col md:flex-row flex-1 items-center gap-4">
          <div class="relative w-full md:max-w-md group">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-primary group-focus-within:scale-110 transition-transform">search</span>
            </div>
            <input
              type="text"
              v-model="searchQuery"
              @keyup.enter="performSearch"
              class="w-full pl-12 pr-4 py-4 md:py-3.5 bg-surface-warm dark:bg-neutral-800 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-neutral-400"
              placeholder="Quartier, ville, titre..."
            />
          </div>

          <div class="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0">
            <button 
              @click="showFilterModal = true"
              class="flex items-center gap-2 px-6 py-3.5 md:py-3 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 shadow-sm active:scale-95 transition-all whitespace-nowrap"
            >
              <span class="material-symbols-outlined text-[18px] text-primary">tune</span>
              <span class="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-neutral-300">Filtres</span>
              <span v-if="activeFilterCount > 0" class="size-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full leading-none">
                {{ activeFilterCount }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Zone de résultats Split View on Desktop -->
    <main class="flex-1 relative overflow-hidden flex flex-col md:flex-row">
      
      <!-- Vue Liste (Sidebar on Desktop) -->
      <div 
        :class="[
          'h-full overflow-y-auto px-6 pb-32 space-y-6 transition-all duration-500',
          viewMode === 'list' ? 'flex-1' : 'hidden md:block md:w-[450px] md:border-r border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900',
          'md:flex-none md:w-[400px] lg:w-[480px] md:bg-white md:dark:bg-neutral-900'
        ]"
      >
        <div class="pt-8 space-y-6">
          <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
            <div class="animate-spin size-10 border-4 border-primary border-t-transparent rounded-full"></div>
            <p class="text-[10px] font-black uppercase tracking-widest text-neutral-400">Recherche en cours...</p>
          </div>

          <div v-else-if="filteredListings.length === 0" class="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div class="size-20 bg-surface-warm dark:bg-neutral-800 rounded-[2rem] flex items-center justify-center text-neutral-300">
              <span class="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <div>
              <h3 class="text-xl font-black text-gray-900 dark:text-white mb-2">Aucun résultat</h3>
              <p class="text-xs font-medium text-neutral-500 leading-relaxed max-w-[240px]">
                Nous n'avons trouvé aucun bien correspondant à vos critères.
              </p>
            </div>
            <button @click="resetFilters" class="text-primary font-black text-[10px] uppercase tracking-widest underline">
              Réinitialiser les filtres
            </button>
          </div>

          <div v-else class="space-y-6 animate-slide-up">
            <div class="flex items-center justify-between px-2">
              <span class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{{ filteredListings.length }} résultats</span>
              <select v-model="sortBy" class="bg-transparent border-none p-0 text-[10px] font-black text-primary uppercase tracking-widest focus:ring-0">
                <option value="newest">Plus récent</option>
                <option value="price_low">Prix min</option>
                <option value="price_high">Prix max</option>
              </select>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <ListingCard 
                v-for="listing in filteredListings" 
                :key="listing.id"
                :id="`listing-${listing.id}`"
                :listing="listing"
                variant="horizontal"
                @click="goToListing"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Vue Carte (Main on Desktop) -->
      <div 
        :class="[
          'relative z-10 transition-all duration-500',
          viewMode === 'map' ? 'flex-1' : 'hidden md:block md:flex-1',
          'h-full'
        ]"
      >
        <MapComponent :listings="filteredListings" @marker-click="onMarkerClick" />
      </div>
    </main>

    <!-- Modal de Filtres (Drawer Style) -->
    <transition name="drawer">
      <div v-if="showFilterModal" class="fixed inset-0 z-[100] flex justify-end">
        <div @click="showFilterModal = false" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-md h-full bg-white dark:bg-neutral-900 shadow-3xl flex flex-col animate-slide-left">
          <div class="p-8 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-surface-warm dark:bg-neutral-800/50">
            <div class="text-gray-900 dark:text-white">
              <h3 class="text-2xl font-black">Filtres</h3>
              <p class="text-[9px] font-black uppercase text-primary tracking-widest mt-1">Personnalisez votre recherche</p>
            </div>
            <button @click="showFilterModal = false" class="size-12 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center text-neutral-500 hover:text-primary transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-8 space-y-10">
            <!-- Property Type chips in modal too -->
            <div class="space-y-4">
              <label class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Type de bien</label>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="type in propertyTypes" 
                  :key="type.value"
                  @click="togglePropertyType(type.value)"
                  class="px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all"
                  :class="filters.propertyType === type.value ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-surface-warm dark:bg-neutral-800 text-neutral-500 border-transparent'"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>

            <!-- Transaction Type -->
            <div class="space-y-4">
              <label class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Transaction</label>
              <div class="flex gap-3">
                <button 
                  v-for="type in transactionTypes" 
                  :key="type.value"
                  @click="filters.transactionType = type.value"
                  class="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                  :class="filters.transactionType === type.value ? 'bg-primary text-white shadow-lg' : 'bg-surface-warm dark:bg-neutral-800 text-neutral-500'"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>

            <!-- Price Range -->
            <div class="space-y-4">
              <label class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Budget mensuel (GNF)</label>
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <input v-model="filters.minPrice" type="number" placeholder="Min" class="w-full bg-surface-warm dark:bg-neutral-800 border-none rounded-2xl p-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 text-gray-900 dark:text-white" />
                </div>
                <div class="relative">
                  <input v-model="filters.maxPrice" type="number" placeholder="Max" class="w-full bg-surface-warm dark:bg-neutral-800 border-none rounded-2xl p-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            <!-- Rooms -->
            <div class="space-y-4">
              <label class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Caractéristiques</label>
              <div class="grid grid-cols-1 gap-4">
                <div class="flex items-center justify-between p-4 bg-surface-warm dark:bg-neutral-800 rounded-2xl text-gray-900 dark:text-white">
                  <span class="text-sm font-bold">Nombre de chambres</span>
                  <div class="flex items-center gap-4">
                    <button @click="filters.bedrooms = Math.max(0, parseInt(filters.bedrooms || 0) - 1)" class="size-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center text-primary shadow-sm">-</button>
                    <span class="font-black w-4 text-center">{{ filters.bedrooms || 0 }}</span>
                    <button @click="filters.bedrooms = parseInt(filters.bedrooms || 0) + 1" class="size-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center text-primary shadow-sm">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8 border-t border-neutral-100 dark:border-neutral-800 pb-12 bg-white dark:bg-neutral-900">
            <button @click="performSearch(); showFilterModal = false" class="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-3xl shadow-primary/30 active:scale-95 transition-all">
              Afficher les {{ filteredListings.length }} résultats
            </button>
            <button @click="resetFilters" class="w-full mt-4 text-[10px] font-black uppercase text-neutral-400 tracking-widest hover:text-primary transition-colors">Tout effacer</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useListingsStore } from '@/stores/listings';
import MapComponent from '@/components/MapComponent.vue';
import ListingCard from '@/components/ListingCard.vue';

const router = useRouter();
const route = useRoute();
const listingsStore = useListingsStore();

const searchQuery = ref('');
const viewMode = ref('list');
const sortBy = ref('newest');
const loading = ref(false);
const showFilterModal = ref(false);

const filters = ref({
  transactionType: '',
  propertyType: '',
  minPrice: null,
  maxPrice: null,
  bedrooms: '',
  bathrooms: '',
  minSurface: null
});

const propertyTypes = [
  { label: 'Tous', value: '' },
  { label: 'Appartement', value: 'apartment' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
  { label: 'Terrain', value: 'land' },
  { label: 'Maison', value: 'house' }
];

const transactionTypes = [
  { label: 'Tous', value: '' },
  { label: 'Location', value: 'rent' },
  { label: 'Vente', value: 'sale' }
];

const activeFilterCount = computed(() => {
  let count = 0;
  if (filters.value.transactionType) count++;
  if (filters.value.propertyType) count++;
  if (filters.value.minPrice || filters.value.maxPrice) count++;
  if (filters.value.bedrooms) count++;
  if (filters.value.minSurface) count++;
  return count;
});

// Utilise maintenant directement les annonces du store
const listings = computed(() => listingsStore.listings);

// Filtrage client de secours ou tri final
const filteredListings = computed(() => {
  let results = [...listings.value];
  
  // Le backend gère la recherche et les filtres principaux, 
  // on fait juste le tri ICI si besoin, bien que le backend le fasse aussi.
  switch (sortBy.value) {
    case 'price_low': results.sort((a, b) => a.price - b.price); break;
    case 'price_high': results.sort((a, b) => b.price - a.price); break;
    case 'newest': results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
  }
  
  return results;
});

const performSearch = async () => {
  loading.value = true;
  
  // Mapping des noms de paramètres pour coller au backend (listings/views.py)
  const apiParams = {};
  
  if (searchQuery.value) apiParams.search = searchQuery.value;
  if (filters.value.transactionType) apiParams.listing_type = filters.value.transactionType;
  if (filters.value.propertyType) apiParams.property_type = filters.value.propertyType;
  if (filters.value.minPrice) apiParams.min_price = filters.value.minPrice;
  if (filters.value.maxPrice) apiParams.max_price = filters.value.maxPrice;
  if (filters.value.bedrooms) apiParams.bedrooms = filters.value.bedrooms;
  if (filters.value.bathrooms) apiParams.bathrooms = filters.value.bathrooms;
  if (filters.value.minSurface) apiParams.min_surface = filters.value.minSurface;

  // Mise à jour de l'URL pour la persistance
  router.push({ query: { ...apiParams, view: viewMode.value, sort: sortBy.value } });

  try {
    await listingsStore.fetchListings(apiParams);
  } finally {
    loading.value = false;
  }
};

const togglePropertyType = (type) => {
  if (filters.value.propertyType === type) filters.value.propertyType = '';
  else filters.value.propertyType = type;
  performSearch();
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = {
    transactionType: '',
    propertyType: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: '',
    bathrooms: '',
    minSurface: null
  };
  performSearch();
};

const goToListing = (id) => router.push(`/listings/${id}`);

const onMarkerClick = (listing) => {
  // En mode split view ou mobile, quand on clique sur un marqueur, 
  // on veut s'assurer que l'utilisateur voit l'item ou au moins scroll vers lui.
  if (window.innerWidth < 768) {
    // Sur mobile, on repasse peut-être en mode liste ? Ou on affiche un popup.
    // Pour l'instant on se contente de scroller si on est en split view.
  }
  
  const element = document.getElementById(`listing-${listing.id}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('ring-2', 'ring-primary');
    setTimeout(() => element.classList.remove('ring-2', 'ring-primary'), 2000);
  }
};

onMounted(() => {
  // Restaurer depuis l'URL
  if (route.query.search) searchQuery.value = route.query.search;
  if (route.query.listing_type) filters.value.transactionType = route.query.listing_type;
  if (route.query.property_type) filters.value.propertyType = route.query.property_type;
  if (route.query.min_price) filters.value.minPrice = route.query.min_price;
  if (route.query.max_price) filters.value.maxPrice = route.query.max_price;
  if (route.query.bedrooms) filters.value.bedrooms = route.query.bedrooms;
  if (route.query.min_surface) filters.value.minSurface = route.query.min_surface;
  if (route.query.sort) sortBy.value = route.query.sort;
  if (route.query.view) viewMode.value = route.query.view;

  performSearch();
});

watch(() => sortBy.value, () => performSearch());
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-left {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

.drawer-enter-active, .drawer-leave-active { transition: opacity 0.4s ease; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
</style>
