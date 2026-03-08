<template>
  <div class="relative h-screen w-full flex flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#101818] dark:text-white antialiased">
    
    <!-- Full-Screen Map Background (Leaflet) -->
    <div class="absolute inset-0 z-0">
      <MapComponent 
        :listings="listings" 
        v-model:zoom="mapZoom"
        v-model:center="mapCenter"
        @marker-click="onMarkerClick" 
      />
      <!-- Map Gradient Overlays -->
      <div class="absolute inset-0 map-gradient-overlay pointer-events-none"></div>
    </div>

    <!-- Floating Top Search Bar & Filters -->
    <div class="relative z-20 px-4 pt-6">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <button @click="$router.push('/')" class="size-14 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-xl rounded-xl flex items-center justify-center text-primary active:scale-95 transition-all border border-white/20">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="flex-1 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-xl rounded-xl h-14 flex items-center px-4 border border-white/20">
            <span class="material-symbols-outlined text-primary mr-3">search</span>
            <input 
              v-model="filters.neighborhood"
              @keyup.enter="applyFilters"
              class="bg-transparent border-none focus:ring-0 w-full text-sm font-medium placeholder:text-gray-500" 
              placeholder="Quartier, ville (ex: Kaloum)" 
              type="text"
            />
            <div class="h-6 w-[1px] bg-gray-300 mx-2"></div>
            <button @click="isFilterMenuOpen = !isFilterMenuOpen" class="p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              <span class="material-symbols-outlined text-gray-600">tune</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Control Buttons -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      <button @click="getUserLocation" class="p-4 rounded-2xl shadow-2xl bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border border-white/20 text-primary active:scale-95 transition-all">
        <span class="material-symbols-outlined">my_location</span>
      </button>
    </div>

    <!-- Dynamic Property Carousel Dock -->
    <div class="mt-auto relative z-20 pb-8 animate-slide-up">
      <div v-if="loading" class="flex justify-center mb-8">
        <div class="bg-primary px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-2">
          <div class="animate-spin size-3 border-2 border-white border-t-transparent rounded-full"></div>
          Recherche...
        </div>
      </div>

      <div 
        ref="carousel"
        class="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 gap-4 scroll-smooth"
      >
        <ListingCard 
          v-for="listing in listings" 
          :key="listing.id"
          :listing="listing"
          variant="featured"
          :class="['snap-center shrink-0 w-[85%] max-w-[320px] shadow-2xl transition-all duration-300', { 'ring-4 ring-primary': selectedListingId === listing.id }]"
          :id="`listing-${listing.id}`"
          @click="goToDetail(listing.id)"
        />
        
        <div v-if="listings.length === 0 && !loading" class="snap-center shrink-0 w-[85%] max-w-[320px] aspect-video bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col items-center justify-center border border-white/20 p-8 text-center ml-4">
          <div class="size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-3xl text-primary">search_off</span>
          </div>
          <h4 class="text-lg font-bold">Aucun résultat</h4>
          <p class="text-xs text-neutral-500">Essayez un autre quartier.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MapComponent from '@/components/MapComponent.vue';
import ListingCard from '@/components/ListingCard.vue';
import { useListingsStore } from '@/stores/listings';

const router = useRouter();
const listingsStore = useListingsStore();
const listings = ref([]);
const loading = ref(true);
const isFilterMenuOpen = ref(false);
const carousel = ref(null);
const selectedListingId = ref(null);
const mapZoom = ref(13);
const mapCenter = ref([9.509, -13.712]); // Par défaut Kaloum

const filters = reactive({
  neighborhood: ''
});

const applyFilters = async () => {
  loading.value = true;
  try {
    await listingsStore.fetchListings({ q: filters.neighborhood });
    listings.value = listingsStore.listings;
    
    // Centrer la carte sur le premier résultat si dispo
    if (listings.value.length > 0 && listings.value[0].exigences?.gps) {
        const { lat, lng } = listings.value[0].exigences.gps;
        mapCenter.value = [lat, lng];
    }
  } catch (e) {
    console.error("Erreur chargement annonces", e);
  } finally {
    loading.value = false;
  }
};

const onMarkerClick = (listing) => {
  selectedListingId.value = listing.id;
  const element = document.getElementById(`listing-${listing.id}`);
  if (element && carousel.value) {
    carousel.value.scrollTo({
      left: element.offsetLeft - 32,
      behavior: 'smooth'
    });
  }
};

const goToDetail = (id) => {
  router.push(`/logement/${id}`);
};

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      mapCenter.value = [position.coords.latitude, position.coords.longitude];
      mapZoom.value = 15;
    });
  }
};

onMounted(() => {
  applyFilters();
});
</script>

<style scoped>
.map-gradient-overlay {
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.4) 0%, 
      rgba(255, 255, 255, 0) 20%, 
      rgba(255, 255, 255, 0) 80%, 
      rgba(255, 255, 255, 0.8) 100%);
}

.dark .map-gradient-overlay {
    background: linear-gradient(to bottom, 
      rgba(15, 23, 42, 0.4) 0%, 
      rgba(15, 23, 42, 0) 20%, 
      rgba(15, 23, 42, 0) 80%, 
      rgba(15, 23, 42, 0.8) 100%);
}

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
</style>

