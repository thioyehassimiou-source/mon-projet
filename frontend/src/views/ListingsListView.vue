<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen pb-24 font-display">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-6">
       <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Annonces</h1>
          <button @click="$router.push('/listings/add')" class="size-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 active:scale-95 transition-all">
            <span class="material-symbols-outlined font-bold">add</span>
          </button>
       </div>
       
       <!-- Filter Categories -->
       <div class="flex gap-4 overflow-x-auto hide-scrollbar sm:justify-center">
         <button 
           v-for="cat in categories" 
           :key="cat.label" 
           class="flex flex-col items-center gap-2 group transition-all"
           @click="activeCat = cat.label"
         >
           <div :class="[
             'size-14 rounded-2xl flex items-center justify-center transition-all border',
             activeCat === cat.label 
               ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
               : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500'
           ]">
             <span class="material-symbols-outlined text-2xl" :style="activeCat === cat.label ? 'font-variation-settings: \'FILL\' 1' : ''">{{ cat.icon }}</span>
           </div>
           <span :class="['text-[11px] font-black uppercase tracking-widest transition-colors', activeCat === cat.label ? 'text-primary' : 'text-slate-400']">{{ cat.label }}</span>
         </button>
       </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Listings Grid -->
      <div v-if="listingsStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="h-64 bg-white dark:bg-slate-800 rounded-3xl animate-pulse"></div>
      </div>

      <div v-else-if="listings.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
          <div class="size-20 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-200 shadow-sm mb-6">
            <span class="material-symbols-outlined text-4xl">inventory_2</span>
          </div>
          <h3 class="text-xl font-black tracking-tight">Aucune annonce</h3>
          <p class="text-sm font-medium text-slate-400 mt-2">Commencez par ajouter votre premier logement.</p>
          <button @click="$router.push('/listings/add')" class="mt-6 bg-primary text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all text-xs">Ajouter maintenant</button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="l in listings" 
          :key="l.id" 
          class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-50 dark:border-slate-800 group transition-all hover:shadow-xl hover:border-primary/10"
        >
          <div class="relative h-56 overflow-hidden">
            <img :src="getImage(l)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute top-4 left-4 flex gap-2">
               <span v-if="l.is_premium" class="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Premium</span>
               <span class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Nouveau</span>
            </div>
            <div class="absolute bottom-4 right-4 flex gap-2">
               <button v-if="canManage(l)" @click.stop="onEdit(l.id)" class="size-10 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-center text-primary shadow-lg active:scale-90 transition-transform">
                  <span class="material-symbols-outlined text-xl">edit_square</span>
               </button>
               <button v-if="canManage(l)" @click.stop="confirmDelete(l)" class="size-10 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                  <span class="material-symbols-outlined text-xl">delete</span>
               </button>
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
               <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-black tracking-tight text-slate-900 dark:text-white truncate">{{ l.title }}</h3>
                  <div class="flex items-center text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">
                     <span class="material-symbols-outlined text-sm mr-1.5 text-primary">location_on</span>
                     {{ l.neighborhood || l.city }}
                  </div>
               </div>
               <div class="text-right">
                  <span class="text-xl font-black text-primary dark:text-slate-100">{{ formatPrice(l.price) }}</span>
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block">GNF / Mois</span>
               </div>
            </div>
            
            <div class="flex items-center gap-6 pt-4 border-t border-slate-50 dark:border-slate-700/50">
               <div v-if="l.bedrooms" class="flex items-center gap-2 text-slate-500">
                  <span class="material-symbols-outlined text-primary text-lg">bed</span>
                  <span class="text-xs font-black">{{ l.bedrooms }}</span>
               </div>
               <div v-if="l.bathrooms" class="flex items-center gap-2 text-slate-500">
                  <span class="material-symbols-outlined text-primary text-lg">bathtub</span>
                  <span class="text-xs font-black">{{ l.bathrooms }}</span>
               </div>
               <div v-if="l.surface_area" class="flex items-center gap-2 text-slate-500">
                  <span class="material-symbols-outlined text-primary text-lg">square_foot</span>
                  <span class="text-xs font-black">{{ l.surface_area }}m²</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <ConfirmationModal
      :show="showConfirm"
      title="Supprimer l'annonce"
      :message="confirmMessage"
      @confirm="onDeleteConfirmed"
      @cancel="showConfirm = false"
    />

    <BottomNav />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useListingsStore } from '@/stores/listings';
import { useAuthStore } from '@/stores/auth';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { useRouter } from 'vue-router';
import BottomNav from '@/components/BottomNav.vue';

const listingsStore = useListingsStore();
const authStore = useAuthStore();
const router = useRouter();

const showConfirm = ref(false);
const deleteTarget = ref(null);
const confirmMessage = ref('');
const activeCat = ref('Tout');

const listings = computed(() => listingsStore.listings.filter(l => l.is_active !== false));

const categories = [
  { label: 'Tout', icon: 'grid_view' },
  { label: 'Appartements', icon: 'apartment' },
  { label: 'Villas', icon: 'villa' },
  { label: 'Studios', icon: 'meeting_room' },
  { label: 'Terrains', icon: 'landscape' }
];

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('fr-GN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

function getImage(item) {
  return item.images?.[0]?.full_url || item.images?.[0]?.url || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80';
}

function canManage(listing) {
  return authStore.user && listing.owner === authStore.user.id;
}

function onEdit(id) {
  router.push(`/listings/${id}/edit`);
}

function confirmDelete(listing) {
  deleteTarget.value = listing;
  confirmMessage.value = `Supprimer "${listing.title}" ? Cette action désactivera l'annonce.`;
  showConfirm.value = true;
}

async function onDeleteConfirmed() {
  showConfirm.value = false;
  if (!deleteTarget.value) return;

  const result = await listingsStore.deleteExistingListing(deleteTarget.value.id);
  if (result.success) {
    // Refresh or UI feedback
  } else {
    alert(result.error || 'Erreur lors de la suppression');
  }

  deleteTarget.value = null;
}

onMounted(async () => {
  await listingsStore.fetchListings({ is_active: true });
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
