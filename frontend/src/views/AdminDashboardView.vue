<template>
  <div class="min-h-screen bg-slate-50 dark:bg-background-dark p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-black text-slate-900 dark:text-white">Tableau de Bord Admin</h1>
          <p class="text-slate-500 font-medium">Gestion de la confiance et sécurité (Phase 2)</p>
        </div>
        <div class="flex gap-4">
          <button @click="activeTab = 'logements'" :class="activeTab === 'logements' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-500'" class="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm transition-all">
            Logements à valider ({{ pendingListings.length }})
          </button>
          <button @click="activeTab = 'users'" :class="activeTab === 'users' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-500'" class="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm transition-all">
            Utilisateurs KYC ({{ pendingUsers.length }})
          </button>
        </div>
      </div>

      <!-- Content -->
      <div v-if="activeTab === 'logements'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in pendingListings" :key="item.id" class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
          <div class="h-48 bg-slate-100 dark:bg-slate-800 relative">
            <img v-if="item.images && item.images[0]" :src="item.images[0]" class="w-full h-full object-cover" />
            <div class="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary">
              {{ item.exigences?.type || 'Logement' }}
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="font-black text-slate-900 dark:text-white mb-2">{{ item.titre }}</h3>
            <p class="text-xs text-slate-500 mb-4 flex-1">{{ item.localisation }}</p>
            <div class="flex items-center gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
                {{ item.owner_name?.charAt(0) }}
              </div>
              <div class="text-[10px]">
                <p class="font-black text-slate-900 dark:text-white">{{ item.owner_name }}</p>
                <p class="text-slate-400 font-medium">{{ item.owner_email }}</p>
              </div>
            </div>
            <div class="flex gap-3">
              <button @click="updateStatus(item.id, 'disponible')" class="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                Approuver
              </button>
              <button @click="updateStatus(item.id, 'rejeté')" class="flex-1 py-3 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all">
                Rejeter
              </button>
            </div>
          </div>
        </div>
        <div v-if="pendingListings.length === 0" class="col-span-full py-20 text-center">
          <span class="material-symbols-outlined text-6xl text-slate-200 mb-4">check_circle</span>
          <p class="text-slate-400 font-bold">Aucun logement en attente de validation.</p>
        </div>
      </div>

      <div v-if="activeTab === 'users'" class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-800">
              <th class="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Utilisateur</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Document</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
            <tr v-for="u in pendingUsers" :key="u.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-8 py-6 text-sm font-bold text-slate-900 dark:text-white">{{ u.name }} ({{ u.email }})</td>
              <td class="px-8 py-6 text-sm text-primary font-black uppercase tracking-widest">
                <a :href="baseUrl + u.id_document" target="_blank" class="hover:underline flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm">visibility</span>
                  Voir la pièce
                </a>
              </td>
              <td class="px-8 py-6 text-sm text-slate-500">{{ u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Date inconnue' }}</td>
              <td class="px-8 py-6">
                <button @click="validateUser(u.id)" class="px-6 py-2 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                  Certifier
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="pendingUsers.length === 0" class="py-20 text-center">
          <span class="material-symbols-outlined text-6xl text-slate-200 mb-4">verified</span>
          <p class="text-slate-400 font-bold">Tous les utilisateurs sont vérifiés.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeTab = ref('logements');
const pendingListings = ref([]);
const pendingUsers = ref([]);
const baseUrl = import.meta.env.VITE_API_URL || 'https://guineelogement-api.onrender.com/api';

const fetchPending = async () => {
  const token = localStorage.getItem('token');
  try {
    const resListings = await fetch(`${baseUrl}/admin/pending-listings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    pendingListings.value = await resListings.json();

    const resUsers = await fetch(`${baseUrl}/admin/pending-users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    pendingUsers.value = await resUsers.json();
  } catch (err) {
    console.error(err);
  }
};

const updateStatus = async (id, status) => {
  const token = localStorage.getItem('token');
  try {
    await fetch(`${baseUrl}/admin/listings/${id}/status`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    fetchPending();
  } catch (err) {
    console.error(err);
  }
};

const validateUser = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await fetch(`${baseUrl}/admin/users/${id}/verify`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ is_verified: true })
    });
    fetchPending();
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchPending);
</script>
