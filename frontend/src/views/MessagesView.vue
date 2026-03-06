<template>
  <div class="h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors overflow-hidden flex flex-col lg:flex-row">
    
    <!-- 1. Main Sidebar Navigation (Desktop only) -->
    <aside class="hidden lg:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shrink-0">
      <div class="p-6 flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined">apartment</span>
        </div>
        <div>
          <h1 class="font-bold text-primary dark:text-white leading-tight">GuinéeLogement</h1>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Gestion Immobilière</p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 space-y-1 mt-4">
        <router-link to="/mon-profil" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="text-sm font-bold">Tableau de bord</span>
        </router-link>
        <router-link to="/messages" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary dark:text-white font-bold shadow-sm">
          <span class="material-symbols-outlined fill-1">chat_bubble</span>
          <span class="text-sm font-bold">Messages</span>
        </router-link>
        <router-link to="/listings" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <span class="material-symbols-outlined">home_work</span>
          <span class="text-sm font-bold">Propriétés</span>
        </router-link>
        <router-link to="/paiements" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <span class="material-symbols-outlined">payments</span>
          <span class="text-sm font-bold">Revenus</span>
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white dark:border-slate-700">
            <img v-if="user?.photo" :src="user.photo" class="w-full h-full object-cover" />
            <span v-else class="material-symbols-outlined flex items-center justify-center h-full text-slate-400">person</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-black truncate">{{ user?.nom || user?.username }}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{{ user?.role || 'Membre' }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- 2. Conversations List Area -->
    <div 
      class="w-full lg:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 relative transition-all h-full"
      :class="{ 'hidden lg:flex': activeConversation && isMobile }"
    >
      <div class="p-6 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-black tracking-tight">Messages</h2>
          <button class="size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-xl">edit_square</span>
          </button>
        </div>
        <div class="relative group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">search</span>
          <input 
            v-model="searchQuery"
            class="w-full pl-10 pr-4 h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary transition-all" 
            placeholder="Rechercher..." 
            type="text"
          />
        </div>
      </div>
      
      <div class="flex border-b border-slate-100 dark:border-slate-800 px-2 lg:px-4">
        <button 
          v-for="tab in filterTabs" :key="tab.key"
          @click="activeFilter = tab.key"
          :class="[
            'flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative',
            activeFilter === tab.key 
              ? 'text-primary' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          ]"
        >
          {{ tab.label }}
          <div v-if="activeFilter === tab.key" class="absolute bottom-0 left-4 right-4 h-1 bg-primary rounded-full"></div>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-1">
        <div v-if="filteredConversations.length === 0" class="flex flex-col items-center justify-center py-20 text-center text-slate-300">
           <span class="material-symbols-outlined text-4xl mb-2">chat_bubble</span>
           <p class="text-[10px] font-bold uppercase tracking-widest">Vide</p>
        </div>
        
        <!-- Conversation Items -->
        <button 
          v-for="conv in filteredConversations" 
          :key="conv.id"
          @click="selectConversation(conv)"
          :class="[
            'w-full p-4 flex gap-4 rounded-3xl transition-all active:scale-[0.98] border text-left',
            activeConversation?.id === conv.id 
              ? 'bg-primary/5 border-primary/10 shadow-sm' 
              : 'hover:bg-slate-100/50 dark:hover:bg-slate-800 border-transparent'
          ]"
        >
          <div class="relative shrink-0">
            <div class="size-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-slate-300 font-black text-xl border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
              <span v-if="!conv.participant_photo" class="material-symbols-outlined">person</span>
              <img v-else :src="conv.participant_photo" class="w-full h-full object-cover">
            </div>
            <div v-if="conv.unread" class="absolute -top-1 -right-1 size-4 bg-primary border-4 border-white dark:border-slate-900 rounded-full"></div>
            <div v-if="conv.is_online" class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-1">
              <h3 :class="['text-sm truncate tracking-tight', conv.unread ? 'font-black text-slate-900 dark:text-white' : 'font-bold text-slate-700 dark:text-slate-400']">
                {{ conv.participant_name }}
              </h3>
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{{ formatTime(conv.updated_at) }}</span>
            </div>
            <p v-if="conv.listing_title" class="text-[10px] text-primary font-black truncate mb-1 italic tracking-tight opacity-70">
              {{ conv.listing_title }}
            </p>
            <p :class="['text-xs truncate leading-snug', conv.unread ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-500']">
              {{ conv.last_message }}
            </p>
          </div>
        </button>
      </div>
      
      <!-- Mobile Bottom Nav (Persistent on conversation list) -->
      <BottomNav v-if="isMobile" class="lg:hidden" />
    </div>

    <!-- 3. Main Chat Area -->
    <main 
      class="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-hidden relative"
      :class="{ 'hidden lg:flex': !activeConversation && isMobile }"
    >
      <div v-if="activeConversation" class="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
        <!-- Chat Header (Mockup Style) -->
        <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-30">
          <div class="flex items-center p-4 pb-2 justify-between">
            <div class="flex items-center gap-3">
              <button @click="activeConversation = null" class="lg:hidden size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined font-bold text-slate-600 dark:text-slate-400">arrow_back</span>
              </button>
              <div class="shrink-0 relative">
                <div class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-primary/10 overflow-hidden">
                   <img v-if="activeConversation.participant_photo" :src="activeConversation.participant_photo" class="w-full h-full object-cover">
                   <span v-else class="material-symbols-outlined flex items-center justify-center h-full text-primary/50 text-xl font-bold">person</span>
                </div>
              </div>
              <div class="flex flex-col">
                <h2 class="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">{{ activeConversation.participant_name }}</h2>
                <span class="text-[10px] text-green-600 font-bold flex items-center gap-1 uppercase tracking-widest">
                  <span class="size-1.5 rounded-full bg-green-600"></span> En ligne
                </span>
              </div>
            </div>
            <div class="flex gap-1">
              <button class="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-slate-600 dark:text-slate-400">call</span>
              </button>
              <button class="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span class="material-symbols-outlined text-slate-600 dark:text-slate-400">videocam</span>
              </button>
            </div>
          </div>
          
          <!-- Context Property Bar (Mockup Style) -->
          <div v-if="activeListing" class="flex items-center gap-4 bg-primary/5 dark:bg-primary/20 px-4 min-h-[64px] py-2 justify-between border-t border-slate-50 dark:border-slate-800/50">
            <div class="flex items-center gap-3">
              <div class="size-12 rounded-lg bg-cover bg-center shadow-sm" :style="{ backgroundImage: `url(${activeListing.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=100&q=80'})` }"></div>
              <div class="flex flex-col justify-center max-w-[200px] sm:max-w-xs">
                <p class="text-slate-900 dark:text-slate-100 text-sm font-bold line-clamp-1 leading-tight">{{ activeListing.title || activeListing.titre }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Réf: {{ activeListing.id.slice(0,8).toUpperCase() }} • {{ formatPrice(activeListing.price || activeListing.prix) }} <span class="tracking-normal">GNF/mois</span></p>
              </div>
            </div>
            <div class="shrink-0">
              <button @click="$router.push(`/listings/${activeListing.id}`)" class="text-primary dark:text-blue-400 flex size-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Message Thread (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth" ref="messageContainer">
          <div class="flex justify-center my-6">
            <span class="text-[11px] font-black text-slate-400 dark:text-slate-500 bg-slate-200/40 dark:bg-slate-800 px-4 py-1.5 rounded-full uppercase tracking-widest">Aujourd'hui</span>
          </div>
          
          <div class="flex flex-col gap-6">
            <div v-for="(msg, index) in messages" :key="index" 
                 :class="['flex items-end gap-2 max-w-[88%] lg:max-w-[75%]', msg.sender_is_me ? 'ml-auto flex-row-reverse' : '']">
              
              <!-- Avatar for Recipient -->
              <div v-if="!msg.sender_is_me" class="size-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0 mb-1 overflow-hidden border border-white dark:border-slate-700">
                <img v-if="activeConversation.participant_photo" :src="activeConversation.participant_photo" class="w-full h-full object-cover">
                <span v-else class="material-symbols-outlined text-sm flex items-center justify-center h-full text-slate-400">person</span>
              </div>

              <div class="flex flex-col gap-1">
                <div :class="[
                  'text-sm font-semibold px-4 py-3 shadow-sm transition-all',
                  msg.sender_is_me 
                    ? 'bg-primary text-white rounded-2xl rounded-br-none shadow-primary/10' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-800'
                ]">
                  {{ msg.text }}
                </div>
                <div :class="['flex items-center gap-1.5 px-1', msg.sender_is_me ? 'justify-end' : 'justify-start']">
                  <p class="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{{ formatTime(msg.created_at) }}</p>
                  <span v-if="msg.sender_is_me" class="material-symbols-outlined text-[14px] text-primary">done_all</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Footer Input (Mockup Style) -->
        <footer class="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div class="max-w-4xl mx-auto flex items-center gap-3">
            <button type="button" class="flex size-11 grow-0 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 active:scale-95 transition-all">
              <span class="material-symbols-outlined">add</span>
            </button>
            <div class="relative flex-1 group">
              <input 
                v-model="newMessage"
                @keydown.enter.exact.prevent="handleSendMessage"
                class="w-full h-11 pl-4 pr-11 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:text-slate-100 placeholder-slate-500/70 transition-all" 
                placeholder="Votre message..." 
                type="text"
              />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full text-slate-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">mood</span>
              </button>
            </div>
            <button 
              @click="handleSendMessage"
              :disabled="!newMessage.trim()"
              class="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/20 active:scale-90 disabled:opacity-50 disabled:grayscale transition-all"
            >
              <span class="material-symbols-outlined text-[20px] font-bold">send</span>
            </button>
          </div>
          <!-- Mobile indicators can go here -->
        </footer>
      </div>
      
      <!-- Empty State for Desktop -->
      <div v-else class="hidden lg:flex flex-col items-center justify-center h-full px-10 text-center space-y-6 bg-slate-50 dark:bg-slate-950/20">
         <div class="size-40 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center text-slate-200 dark:text-slate-800 border border-slate-100 dark:border-slate-800">
            <span class="material-symbols-outlined text-7xl font-light">mail</span>
         </div>
         <div>
            <h3 class="text-3xl font-black tracking-tight">Messagerie Immo</h3>
            <p class="text-slate-500 font-medium mt-3 max-w-sm mx-auto leading-relaxed">Sélectionnez une conversation pour discuter avec un locataire ou un propriétaire.</p>
         </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { useMessagingStore } from '@/stores/messaging';
import { useAuthStore } from '@/stores/auth';
import { useListingsStore } from '@/stores/listings';
import BottomNav from '@/components/BottomNav.vue';

const messagingStore = useMessagingStore();
const authStore = useAuthStore();
const listingsStore = useListingsStore();

const activeConversation = ref(null);
const newMessage = ref('');
const messageContainer = ref(null);
const searchQuery = ref('');
const activeFilter = ref('all');
const screenWidth = ref(window.innerWidth);

const user = computed(() => authStore.user);
const isMobile = computed(() => screenWidth.value < 1024);

const filterTabs = [
  { key: 'all', label: 'Tous' },
  { key: 'tenant', label: 'Messages' },
  { key: 'owner', label: 'Agences' }
];

const conversations = computed(() => messagingStore.conversations);
const messages = computed(() => messagingStore.messages);

const filteredConversations = computed(() => {
  let result = conversations.value;
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(c => 
      c.participant_name?.toLowerCase().includes(q) || 
      c.last_message?.toLowerCase().includes(q)
    );
  }
  return result;
});

const activeListing = computed(() => {
  if (!activeConversation.value?.listing_id) return null;
  return (listingsStore.listings || []).find(l => l.id === activeConversation.value.listing_id);
});

const selectConversation = async (conv) => {
  activeConversation.value = conv;
  await messagingStore.fetchMessages(conv.id);
  if (conv.listing_id && listingsStore.listings.length === 0) {
    await listingsStore.fetchListings();
  }
  scrollToBottom();
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim() || !activeConversation.value) return;
  const text = newMessage.value;
  newMessage.value = '';
  const result = await messagingStore.sendNewMessage(activeConversation.value.id, text);
  if (result.success) {
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const formatPrice = (price) => {
  if (price == null) return 'N/A';
  return new Intl.NumberFormat('fr-GN').format(price);
};

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener('resize', updateWidth);
  await messagingStore.fetchConversations();
  await listingsStore.fetchListings();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

watch(messages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
