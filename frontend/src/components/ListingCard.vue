<template>
  <!-- VARIANT: FEATURED (Vertical, Large, Immersive) -->
  <div v-if="variant === 'featured'" 
       class="group relative"
       @click="$emit('click', listing.id)">
    <div class="relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
      <img 
        :src="mainImage" 
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
      
      <!-- Badges -->
      <div class="absolute top-4 left-4">
        <span v-if="listing.is_premium" class="bg-accent-gold text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg">
          Premium
        </span>
        <span v-else-if="isNew" class="bg-accent-red text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg">
          Nouveau
        </span>
      </div>

      <!-- Content Overlay -->
      <div class="absolute bottom-4 left-4 right-4 text-white">
        <p class="text-xs font-medium opacity-80 flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">location_on</span> {{ listing.neighborhood || listing.city }}
        </p>
        <h3 class="text-lg font-bold leading-tight mt-1">{{ listing.title }}</h3>
        <div class="flex items-center justify-between mt-3">
          <span class="text-lg font-extrabold text-accent-gold">
            {{ formatPrice(listing.price) }} <span class="text-[10px] font-normal text-white/70">/mois</span>
          </span>
        </div>
      </div>
    </div>
  </div>


  <!-- VARIANT: HORIZONTAL (Compact List Item) -->
  <div v-else-if="variant === 'horizontal'" 
       class="bg-white dark:bg-neutral-800 rounded-2xl p-3 flex gap-4 shadow-sm border border-neutral-100 dark:border-neutral-700 active:scale-[0.98] transition-all"
       @click="$emit('click', listing.id)">
    <div class="w-28 h-28 shrink-0 bg-center bg-cover rounded-xl overflow-hidden relative">
      <img 
        :src="mainImage" 
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        @error="handleImageError"
      />
      <div v-if="listing.is_verified" class="absolute top-2 right-2 flex items-center justify-center size-5 bg-primary text-white rounded-full shadow-lg border-2 border-white dark:border-neutral-800">
        <span class="material-symbols-outlined text-[10px] font-black">check</span>
      </div>
    </div>
    
    <div class="flex flex-col justify-between py-1 flex-1 min-w-0">
      <div>
        <h4 class="font-bold text-sm leading-tight text-gray-900 dark:text-white truncate">{{ listing.title }}</h4>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1 truncate">
          <span class="material-symbols-outlined text-[12px]">location_on</span> {{ listing.neighborhood || listing.city }}
        </p>
      </div>
      
      <div class="flex items-center gap-3 mt-2 text-neutral-500 dark:text-neutral-400">
        <span v-if="listing.bedrooms" class="flex items-center gap-1 text-[10px] font-semibold">
          <span class="material-symbols-outlined text-[14px]">bed</span> {{ listing.bedrooms }}
        </span>
        <span v-if="listing.bathrooms" class="flex items-center gap-1 text-[10px] font-semibold">
          <span class="material-symbols-outlined text-[14px]">bathtub</span> {{ listing.bathrooms }}
        </span>
        <span v-if="listing.surface_area" class="flex items-center gap-1 text-[10px] font-semibold">
          <span class="material-symbols-outlined text-[14px]">square_foot</span> {{ listing.surface_area }}m²
        </span>
      </div>
      
      <div class="flex items-center justify-between mt-2">
        <span class="text-primary dark:text-accent-gold font-extrabold text-sm">{{ formatPrice(listing.price) }}</span>
        <button @click.stop.prevent="toggleFavorite" class="p-1 group/fav">
          <span 
            class="material-symbols-outlined text-lg transition-all"
            :class="listing.is_favorited ? 'text-primary fill-1' : 'text-neutral-300'"
          >
            favorite
          </span>
        </button>
      </div>
    </div>
  </div>


  <!-- VARIANT: DEFAULT (Grid Card) -->
  <div v-else 
       class="group bg-white dark:bg-neutral-800 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full active:scale-95"
       @click="$emit('click', listing.id)">
    <div class="relative overflow-hidden aspect-[4/3.5]">
      <img 
        :src="mainImage" 
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div class="absolute top-4 left-4 flex flex-col gap-2">
        <span v-if="listing.is_premium" class="bg-accent-gold text-black text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-2xl">Premium</span>
        <span v-if="listing.is_verified" class="bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-2xl flex items-center gap-1">Vérifié</span>
      </div>
      
      <button @click.stop.prevent="toggleFavorite" class="absolute top-4 right-4 p-2.5 bg-white/30 backdrop-blur-md rounded-full text-white shadow-xl hover:bg-white hover:text-red-500 transition-all active:scale-75">
        <span 
          class="material-symbols-outlined text-[22px]"
          :style="listing.is_favorited ? 'font-variation-settings: \'FILL\' 1' : ''"
        >
          favorite
        </span>
      </button>

      <div class="absolute bottom-4 left-4">
        <div class="bg-primary text-white p-2.5 rounded-2xl font-black text-xs shadow-2xl">
          {{ formatPrice(listing.price) }}
        </div>
      </div>
    </div>
    
    <div class="p-6 pt-5">
      <p class="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em] mb-1">{{ getPropertyTypeLabel(listing.property_type) }}</p>
      <h3 class="text-base font-black text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
        {{ listing.title }}
      </h3>
      <div class="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold">
        <span class="material-symbols-outlined text-[16px] text-primary">location_on</span>
        {{ listing.city }}{{ listing.neighborhood ? ` • ${listing.neighborhood}` : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useListingsStore } from '@/stores/listings';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  listing: { type: Object, required: true },
  variant: { type: String, default: 'default' } // 'default', 'featured', 'horizontal'
});

const emit = defineEmits(['click']);

const listingsStore = useListingsStore();
const authStore = useAuthStore();

const mainImage = computed(() => {
  return props.listing.images?.[0]?.full_url || props.listing.images?.[0]?.url || 'http://localhost:8000/static/placeholder-house.svg';
});

const isNew = computed(() => {
  const date = new Date(props.listing.created_at);
  const diffDays = (new Date() - date) / (1000 * 60 * 60 * 24);
  return diffDays < 7;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-GN', {
    style: 'currency',
    currency: 'GNF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('GNF', 'GNF').trim();
};

const getPropertyTypeLabel = (type) => {
  const labels = {
    apartment: 'Appartement',
    house: 'Maison',
    land: 'Terrain',
    studio: 'Studio',
    villa: 'Villa',
    other: 'Autre'
  };
  return labels[type] || type;
};

const handleImageError = (event) => {
  event.target.src = 'http://localhost:8000/static/placeholder-house.svg';
};

const toggleFavorite = async () => {
  await listingsStore.toggleListingFavorite(props.listing.id);
};
</script>
