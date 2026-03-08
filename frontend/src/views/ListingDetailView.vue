<template>
  <div class="relative bg-background-light dark:bg-background-dark min-h-screen font-display text-[#111715] dark:text-[#f8f4ed] antialiased">
    <!-- Top Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-black/5 dark:border-white/5">
      <div class="flex items-center justify-between px-4 h-16 max-w-[430px] mx-auto">
        <button @click="goBack" class="flex items-center justify-center size-10 rounded-full bg-white/50 dark:bg-black/20 active:scale-90 transition-all">
          <span class="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 class="text-sm font-bold uppercase tracking-widest opacity-70">Détails du Logement</h2>
        <button @click="toggleFavorite" class="flex items-center justify-center size-10 rounded-full bg-white/50 dark:bg-black/20 active:scale-90 transition-all">
          <span 
            class="material-symbols-outlined text-2xl"
            :class="listing?.is_favorited ? 'text-primary fill-1' : ''"
          >
            favorite
          </span>
        </button>
      </div>
    </nav>

    <main v-if="listing" class="pb-32 pt-16 max-w-[430px] mx-auto">
      <!-- Hero Carousel Section -->
      <section class="relative">
        <div class="flex overflow-x-auto no-scrollbar snap-x snap-mandatory" @scroll="onScrollGallery">
          <div v-for="(img, index) in listing.images" :key="index" class="flex-none w-full snap-start px-4">
            <div class="aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative">
              <img 
                :src="typeof img === 'string' ? img : (img.full_url || img.url)" 
                class="absolute inset-0 w-full h-full object-cover" 
                @error="handleImageError"
              />
              <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
                {{ index + 1 }} / {{ listing.images.length }}
              </div>
            </div>
          </div>
          <div v-if="!listing.images || listing.images.length === 0" class="flex-none w-full snap-start px-4">
             <div class="aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative flex items-center justify-center">
                <span class="material-symbols-outlined text-6xl text-neutral-400">image</span>
             </div>
          </div>
        </div>
      </section>

      <!-- Header Content -->
      <section class="px-4 mt-6">
        <div class="flex items-center gap-2 mb-2">
          <span v-if="listing.is_premium" class="bg-accent-gold text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg">Premium</span>
          <span v-if="listing.is_verified" class="bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg flex items-center gap-1">
            <span class="material-symbols-outlined text-[10px] font-black">check</span>
            Vérifié
          </span>
          <span v-if="isNew" class="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">Nouveau</span>
        </div>
        <h1 class="text-3xl font-bold leading-tight mb-2">{{ listing.titre }}</h1>
        <div class="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-sm mb-4">
          <span class="material-symbols-outlined text-sm">location_on</span>
          <span>{{ listing.localisation }}</span>
        </div>
        <div class="text-primary dark:text-primary/90 text-2xl font-bold">
          {{ formatPrice(listing.price) }} <span class="text-sm font-medium text-zinc-500">/ mois</span>
        </div>
      </section>

      <!-- Quick Stats Chips -->
      <section class="mt-6 px-4">
        <div class="flex gap-3 overflow-x-auto no-scrollbar">
          <div v-if="listing.exigences?.chambres" class="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white dark:bg-zinc-800/50 rounded-xl border border-black/5 dark:border-white/5">
            <span class="material-symbols-outlined text-primary mb-1">bed</span>
            <span class="text-xs font-bold">{{ listing.exigences.chambres }} Ch.</span>
          </div>
          <div v-if="listing.exigences?.salles_de_bain" class="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white dark:bg-zinc-800/50 rounded-xl border border-black/5 dark:border-white/5">
            <span class="material-symbols-outlined text-primary mb-1">bathtub</span>
            <span class="text-xs font-bold">{{ listing.exigences.salles_de_bain }} Sdb.</span>
          </div>
          <div v-if="listing.exigences?.surface" class="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white dark:bg-zinc-800/50 rounded-xl border border-black/5 dark:border-white/5">
            <span class="material-symbols-outlined text-primary mb-1">square_foot</span>
            <span class="text-xs font-bold">{{ listing.exigences.surface }} m²</span>
          </div>
          <div v-if="listing.exigences?.type" class="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white dark:bg-zinc-800/50 rounded-xl border border-black/5 dark:border-white/5">
            <span class="material-symbols-outlined text-primary mb-1">home</span>
            <span class="text-xs font-bold uppercase text-[9px]">{{ getPropertyTypeLabel(listing.exigences.type) }}</span>
          </div>
        </div>
      </section>

      <!-- Description -->
      <section class="mt-8 px-4">
        <h3 class="text-lg font-bold mb-3">Description</h3>
        <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm" :class="{ 'line-clamp-3': !showFullDescription }">
          {{ listing.description }}
        </p>
        <button @click="showFullDescription = !showFullDescription" class="mt-2 text-primary text-sm font-bold flex items-center gap-1">
          {{ showFullDescription ? 'Réduire' : 'Lire la suite' }} 
          <span class="material-symbols-outlined text-sm" :class="{ 'rotate-180': showFullDescription }">expand_more</span>
        </button>
      </section>

      <!-- Amenities -->
      <section v-if="hasAmenities" class="mt-8 px-4">
        <h3 class="text-lg font-bold mb-4">Équipements</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-if="listing.near_transport" class="flex items-center gap-3">
            <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">directions_bus</span>
            </div>
            <span class="text-sm font-medium">Transport</span>
          </div>
          <div v-if="listing.near_university" class="flex items-center gap-3">
            <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">school</span>
            </div>
            <span class="text-sm font-medium">Université</span>
          </div>
          <div v-if="listing.near_hospital" class="flex items-center gap-3">
            <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">medical_services</span>
            </div>
            <span class="text-sm font-medium">Hôpital</span>
          </div>
          <div v-if="listing.near_market" class="flex items-center gap-3">
            <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">shopping_basket</span>
            </div>
            <span class="text-sm font-medium">Marché</span>
          </div>
        </div>
      </section>

      <!-- Location Map (Static Placeholder) -->
      <section class="mt-8 px-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold">Localisation</h3>
          <button @click="openInMaps" class="text-xs font-bold text-primary uppercase tracking-wider">Ouvrir Plans</button>
        </div>
        <div class="w-full h-48 rounded-xl overflow-hidden relative border border-black/5 dark:border-white/5 bg-zinc-100 dark:bg-zinc-800">
           <div class="absolute inset-0 flex items-center justify-center">
             <div class="size-12 rounded-full bg-primary/20 flex items-center justify-center border-4 border-white/50 animate-pulse">
               <div class="size-4 rounded-full bg-primary shadow-lg"></div>
             </div>
           </div>
           <!-- Local text hint -->
           <div class="absolute bottom-2 left-2 bg-white/80 dark:bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase font-black">
             {{ listing.localisation }}
           </div>
        </div>
      </section>
      
      <!-- Host Info -->
      <section class="mt-8 px-4 mb-20">
        <div class="p-4 bg-white dark:bg-zinc-800/50 rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-4">
          <div class="size-14 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {{ listing.owner_display?.[0] }}
          </div>
          <div>
            <p class="font-bold">{{ listing.owner_display }}</p>
            <p class="text-[10px] font-bold uppercase text-primary tracking-widest">Hôte vérifié GuineaLogement</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Loading State -->
    <div v-else-if="loading" class="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
      <div class="animate-spin size-12 border-4 border-primary border-t-transparent rounded-full"></div>
      <p class="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Immersion...</p>
    </div>

    <!-- Bottom Sticky Action Bar -->
    <div v-if="listing" class="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 glass-nav border-t border-black/5 dark:border-white/5">
      <div class="flex items-center gap-4 max-w-[430px] mx-auto">
        <button @click="contactOwner" class="flex items-center justify-center size-14 rounded-xl border border-primary text-primary bg-transparent shrink-0 active:scale-95 transition-all">
          <span class="material-symbols-outlined">chat_bubble</span>
        </button>
        <button @click="initiateBooking" :disabled="isPaying" class="flex-1 h-14 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform disabled:opacity-50">
          <span v-if="!isPaying" class="material-symbols-outlined">payments</span>
          <div v-else class="size-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
          {{ isPaying ? 'Initialisation...' : 'Réserver ce bien' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useListingsStore } from '@/stores/listings';
import { useAuthStore } from '@/stores/auth';
import { useMessagingStore } from '@/stores/messaging';
import { listingService, paymentService } from '@/services/api-fetch';

const route = useRoute();
const router = useRouter();
const listingsStore = useListingsStore();
const authStore = useAuthStore();
const messagingStore = useMessagingStore();

const loading = ref(true);
const showFullDescription = ref(false);

const listing = computed(() => listingsStore.currentListing);

const isNew = computed(() => {
  if (!listing.value) return false;
  const date = new Date(listing.value.created_at);
  const diffDays = (new Date() - date) / (1000 * 60 * 60 * 24);
  return diffDays < 7;
});

const hasAmenities = computed(() => {
  return listing.value?.near_university || 
         listing.value?.near_hospital || 
         listing.value?.near_market || 
         listing.value?.near_transport;
});

const mainImage = computed(() => {
  const img = listing.value?.images?.[0];
  if (!img) return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80';
  return typeof img === 'string' ? img : (img.full_url || img.url);
});

const formatPrice = (price) => {
  if (!price) return '0 GNF';
  return new Intl.NumberFormat('fr-GN', {
    style: 'currency',
    currency: 'GNF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).trim();
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

const goBack = () => router.go(-1);

const toggleFavorite = async () => {
  if (!listing.value) return;
  await listingsStore.toggleListingFavorite(listing.value.id);
};

const contactOwner = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }
  
  const result = await messagingStore.startConversationAction(listing.value.id, listing.value.owner_id);
  if (result.success) {
    router.push('/messages');
  } else {
    alert(result.error || 'Erreur lors du démarrage de la discussion');
  }
};

const callOwner = () => {
  if (listing.value?.owner_phone) {
    window.location.href = `tel:${listing.value.owner_phone}`;
  } else {
    contactOwner();
  }
};

const isPaying = ref(false);

const initiateBooking = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }

  isPaying.value = true;
  try {
    const response = await paymentService.initiate({
      amount: listing.value.price, // Par exemple
      id_logement: listing.value.id,
      description: `Réservation de : ${listing.value.title}`
    });

    if (response.success && response.payment_url) {
      // Redirection vers CinetPay
      window.location.href = response.payment_url;
    } else {
      alert("Erreur lors de l'initiation du paiement");
    }
  } catch (err) {
    console.error(err);
    alert("Erreur de paiement : " + err.message);
  } finally {
    isPaying.value = false;
  }
};

const openInMaps = () => {
  if (listing.value) {
    const q = encodeURIComponent(`${listing.value.neighborhood}, ${listing.value.city}, Guinea`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`);
  }
};

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80';
};

const loadData = async (id) => {
  loading.value = true;
  try {
    await listingsStore.fetchListing(id);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData(route.params.id);
});

watch(() => route.params.id, (newId) => {
  if (newId) loadData(newId);
});
</script>

<style scoped>
.glass-nav {
  background: rgba(248, 244, 237, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.dark .glass-nav {
  background: rgba(28, 29, 27, 0.8);
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.fill-1 { font-variation-settings: 'FILL' 1; }
</style>

