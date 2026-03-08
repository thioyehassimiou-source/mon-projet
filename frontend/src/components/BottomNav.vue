<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 pb-6 pt-3 z-50 flex justify-between items-center shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.1)]">
    <router-link to="/" class="flex flex-col items-center gap-1 flex-1 py-1 transition-colors" :class="isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
      <span class="material-symbols-outlined" :class="{ 'fill-1': isActive('/') }">home</span>
      <span class="text-[10px] font-medium">Accueil</span>
    </router-link>
    
    <router-link to="/listings" class="flex flex-col items-center gap-1 flex-1 py-1 transition-colors" :class="isActive('/listings') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
      <span class="material-symbols-outlined" :class="{ 'fill-1': isActive('/listings') }">list_alt</span>
      <span class="text-[10px] font-medium">Mes Biens</span>
    </router-link>
    
    <router-link to="/listings/add" class="flex flex-col items-center gap-1 flex-1 py-1 transition-colors" :class="isActive('/listings/add') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
      <div class="bg-primary/10 rounded-full p-2 mb-[-4px] transition-transform active:scale-90">
        <span class="material-symbols-outlined" :class="{ 'fill-1': isActive('/listings/add') }">add_circle</span>
      </div>
      <span class="text-[10px] font-bold">Ajouter</span>
    </router-link>
    
    <router-link to="/messages" class="flex flex-col items-center gap-1 flex-1 py-1 transition-colors" :class="isActive('/messages') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
      <span class="material-symbols-outlined" :class="{ 'fill-1': isActive('/messages') }">chat_bubble</span>
      <span class="text-[10px] font-medium">Messages</span>
    </router-link>
    
    <router-link to="/mon-profil" class="flex flex-col items-center gap-1 flex-1 py-1 transition-colors" :class="isActive('/mon-profil') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
      <span class="material-symbols-outlined" :class="{ 'fill-1': isActive('/mon-profil') }">person</span>
      <span class="text-[10px] font-medium">Profil</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.fill-1 {
  font-variation-settings: 'FILL' 1;
}
</style>
