<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display font-medium transition-colors duration-500">
    <!-- Desktop Header (Hidden on Mobile) -->
    <header v-if="!$route.meta.hideHeader" class="hidden md:block sticky top-0 z-[100] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-800 transition-all">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-3 active:scale-95 transition-all">
          <div class="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-2xl notranslate" translate="no">real_estate_agent</span>
          </div>
          <span class="text-xl font-black tracking-tight text-gray-900 dark:text-white">GuineaLogement</span>
        </router-link>

        <!-- Desktop Menu -->
        <nav class="flex items-center gap-8">
          <router-link 
            v-for="item in [...tabs, ...tabsRight]" 
            :key="item.path" 
            :to="item.path"
            class="text-sm font-black uppercase tracking-widest transition-all hover:text-primary"
            :class="$route.path === item.path ? 'text-primary' : 'text-neutral-500 dark:text-neutral-400'"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <div class="flex items-center gap-4">
          <button @click="toggleTheme" class="size-10 rounded-xl bg-surface-warm dark:bg-neutral-800 flex items-center justify-center text-primary border border-black/5 active:scale-90 transition-all">
            <span class="material-symbols-outlined text-[20px] notranslate" translate="no">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
          </button>
          
          <button 
            v-if="userRole !== 'locataire'"
            @click="handleMainAction"
            class="bg-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Publier une annonce
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile App Bar (Hidden on Desktop) -->
    <header v-if="!$route.meta.hideHeader" class="md:hidden sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl px-4 pt-8 pb-4 transition-all border-b border-neutral-100 dark:border-neutral-800">
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col">
          <span class="text-[10px] font-bold text-primary/70 uppercase tracking-widest">Bienvenue en Guinée</span>
          <router-link to="/" class="text-2xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
            GuineaLogement
          </router-link>
        </div>
        <div class="flex gap-2">
          <button @click="toggleTheme" class="flex size-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 active:scale-90 transition-all">
            <span class="material-symbols-outlined text-primary text-[22px] notranslate" translate="no">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
          </button>
          <button class="flex size-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 active:scale-90 transition-all">
            <span class="material-symbols-outlined text-primary text-[22px] notranslate" translate="no">notifications</span>
          </button>
        </div>
      </div>
      
      <!-- Mobile Quick Search Bar -->
      <div v-if="$route.path === '/'" class="relative flex items-center gap-2 mb-2 animate-fade-in">
        <div class="flex-1 flex items-center bg-white dark:bg-neutral-800 rounded-2xl px-4 py-3 shadow-sm border border-neutral-50 dark:border-neutral-700">
          <span class="material-symbols-outlined text-neutral-400 mr-2 text-[20px] notranslate" translate="no">search</span>
          <input 
            v-model="quickSearch"
            @keyup.enter="handleSearch"
            class="bg-transparent border-none focus:ring-0 p-0 text-sm w-full placeholder:text-neutral-400 font-bold" 
            placeholder="Rechercher Kaloum, Ratoma..." 
            type="text"
          />
        </div>
        <button @click="handleSearch" class="bg-primary p-3 rounded-2xl text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-[22px] notranslate" translate="no">tune</span>
        </button>
      </div>
    </header>

    <!-- Page Content Area -->
    <main class="flex-1 w-full max-w-7xl mx-auto min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Bottom Navigation Bar (Mobile Only) -->
    <nav v-if="!$route.meta.hideBottomNav" class="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-100 dark:border-neutral-800 pb-8 pt-3 z-[60]">
      <div class="flex justify-around items-end px-6 h-full font-black">
        <router-link 
          v-for="item in tabs" 
          :key="item.path"
          :to="item.path"
          class="flex flex-col items-center gap-1 transition-all"
          :class="$route.path === item.path ? 'text-primary' : 'text-neutral-400 dark:text-neutral-500'"
        >
          <span class="material-symbols-outlined text-[26px] notranslate" translate="no" :style="$route.path === item.path ? 'font-variation-settings: \'FILL\' 1' : ''">
            {{ item.icon }}
          </span>
          <span class="text-[9px] uppercase tracking-wider">{{ item.name }}</span>
        </router-link>

        <!-- Middle FAB -->
        <div v-if="userRole !== 'locataire'" class="relative -top-6">
          <button @click="handleMainAction" class="group size-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center border-4 border-background-light dark:border-background-dark hover:scale-110 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-4xl group-hover:rotate-90 transition-transform notranslate" translate="no">add</span>
          </button>
        </div>

        <router-link 
          v-for="item in tabsRight" 
          :key="item.path"
          :to="item.path"
          class="flex flex-col items-center gap-1 transition-all"
          :class="$route.path === item.path ? 'text-primary' : 'text-neutral-400 dark:text-neutral-500'"
        >
          <span class="material-symbols-outlined text-[26px] notranslate" translate="no" :style="$route.path === item.path ? 'font-variation-settings: \'FILL\' 1' : ''">
            {{ item.icon }}
          </span>
          <span class="text-[9px] uppercase tracking-wider">{{ item.name }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Toast Notifications -->
    <transition name="toast">
      <div v-if="notification.show" class="fixed top-24 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[110]">
        <div :class="[
          'px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 ios-blur border-l-4',
          notification.type === 'success' ? 'bg-primary/90 border-accent-gold text-white' : 'bg-red-600/90 border-white text-white'
        ]">
          <span class="material-symbols-outlined notranslate" translate="no">
            {{ notification.type === 'success' ? 'check_circle' : 'error' }}
          </span>
          <p class="font-bold text-sm">{{ notification.message }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Navigation Config
const tabs = [
  { name: 'Accueil', path: '/', icon: 'home' },
  { name: 'Favoris', path: '/favoris', icon: 'favorite' },
];

const tabsRight = [
  { name: 'IA', path: '/assistant-ia', icon: 'smart_toy' },
  { name: 'Messages', path: '/messages', icon: 'chat_bubble' },
  { name: 'Profil', path: '/mon-profil', icon: 'person' },
];

// UI State
const isDark = ref(false);
const quickSearch = ref('');
const notification = ref({ show: false, message: '', type: 'success' });

// Theme
const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// Auth
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userRole = computed(() => authStore.user?.role?.toLowerCase() || 'locataire');

const handleSearch = () => {
  if (!quickSearch.value.trim()) return;
  router.push({ path: '/search', query: { q: quickSearch.value } });
};

// ...

const handleMainAction = () => {
  if (!isAuthenticated.value) {
    router.push('/login');
  } else {
    router.push('/publier');
  }
};

const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type };
  setTimeout(() => notification.value.show = false, 4000);
};

onMounted(() => {
  authStore.checkAuth();
  isDark.value = localStorage.getItem('theme') === 'dark' || 
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  updateTheme();
});

watch(() => authStore.error, (err) => err && showNotification(err, 'error'));
</script>

<style>
/* Transitions & Animations */
.page-enter-active, .page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from { opacity: 0; transform: scale(0.98) translateY(10px); }
.page-leave-to { opacity: 0; transform: scale(1.02) translateY(-10px); }

.toast-enter-active, .toast-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-20px) scale(0.9); }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>

