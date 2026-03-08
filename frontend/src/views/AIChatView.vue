<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden h-screen flex flex-col md:flex-row">
    
    <!-- Mobile Header (Visible only on small screens) -->
    <header class="md:hidden h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 shrink-0">
      <div class="flex items-center gap-2">
        <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 text-primary">
          <span class="material-symbols-outlined notranslate" translate="no">{{ isSidebarOpen ? 'close' : 'menu' }}</span>
        </button>
        <h2 class="font-bold text-lg">AI Assistant</h2>
      </div>
      <div class="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
        <img v-if="authStore.user?.photo" :src="authStore.user.photo" class="w-full h-full object-cover" />
        <span v-else class="material-symbols-outlined flex items-center justify-center h-full notranslate" translate="no">person</span>
      </div>
    </header>

    <!-- Sidebar Navigation -->
    <aside 
      :class="[
        'w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col fixed inset-y-0 left-0 z-[60] transition-transform md:translate-x-0 md:static',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="p-6 flex items-center gap-3">
        <div class="bg-primary rounded-lg p-2 text-white">
          <span class="material-symbols-outlined notranslate" translate="no">apartment</span>
        </div>
        <div>
          <h1 class="font-bold text-lg leading-none text-primary">GuinéeLogement</h1>
          <p class="text-xs text-slate-500 mt-1">Plateforme Immobilière AI</p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 space-y-1 mt-4">
        <router-link to="/" class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span class="material-symbols-outlined notranslate" translate="no">home</span>
          <span class="text-sm font-medium">Accueil</span>
        </router-link>
        <router-link to="/assistant-ia" class="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg">
          <span class="material-symbols-outlined notranslate" translate="no">chat_bubble</span>
          <span class="text-sm font-medium">AI Assistant</span>
        </router-link>
        <router-link to="/search" class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span class="material-symbols-outlined notranslate" translate="no">search</span>
          <span class="text-sm font-medium">Recherche</span>
        </router-link>
        <router-link to="/mon-profil" class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span class="material-symbols-outlined notranslate" translate="no">account_circle</span>
          <span class="text-sm font-medium">Profil</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-200 dark:border-slate-800">
        <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Historique récent</h3>
        <div class="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          <div 
            v-for="conv in conversations" 
            :key="conv.id"
            @click="loadConversation(conv.id)"
            :class="[
              'p-2 rounded-lg cursor-pointer transition-colors',
              currentConvId === conv.id ? 'bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
            ]"
          >
            <p class="text-xs font-medium truncate">{{ conv.title || 'Nouvelle Discussion' }}</p>
            <p class="text-[10px] text-slate-400">{{ formatDateRelative(conv.date_creation) }}</p>
          </div>
        </div>
        <button 
          @click="createNewConversation"
          class="w-full mt-4 bg-primary text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span class="material-symbols-outlined text-sm notranslate" translate="no">add</span>
          Nouvelle Discussion
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-50 md:hidden"
    ></div>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col min-w-0 h-full">
      <!-- Header Desktop -->
      <header class="hidden h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-bold">Assistant AI Immobilier</h2>
          <span class="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide">En ligne</span>
        </div>
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <span class="material-symbols-outlined notranslate" translate="no">notifications</span>
          </button>
          <div class="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
             <img v-if="authStore.user?.photo" :src="authStore.user.photo" class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <!-- Chat Area Wrapper -->
      <div class="flex-1 flex overflow-hidden">
        <!-- Messages -->
        <div class="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
          <div class="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar" ref="chatContainer">
            
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              :class="['flex gap-4 max-w-3xl', msg.role === 'user' ? 'ml-auto flex-row-reverse' : '']"
            >
              <div 
                :class="[
                  'w-10 h-10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden',
                  msg.role === 'user' ? 'bg-slate-200' : 'bg-primary text-white'
                ]"
              >
                <span v-if="msg.role !== 'user'" class="material-symbols-outlined notranslate" translate="no">smart_toy</span>
                <img v-else-if="authStore.user?.photo" :src="authStore.user.photo" class="w-full h-full object-cover" />
                <span v-else class="material-symbols-outlined notranslate" translate="no">person</span>
              </div>
              
              <div :class="['space-y-2', msg.role === 'user' ? 'items-end flex flex-col' : '']">
                <div 
                  :class="[
                    'p-4 rounded-xl shadow-sm border',
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none border-transparent' 
                      : 'bg-white dark:bg-slate-900 rounded-tl-none border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                  ]"
                >
                  <p class="text-sm leading-relaxed">{{ msg.content }}</p>
                  
                  <!-- Property Results (Phase 5) -->
                  <div v-if="msg.results && msg.results.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                     <div 
                       v-for="prop in msg.results" 
                       :key="prop.id"
                       @click="$router.push(`/listings/${prop.id}`)"
                       class="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary transition-all cursor-pointer group"
                     >
                        <div class="h-32 overflow-hidden relative">
                           <img :src="prop.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           <div class="absolute top-2 left-2 bg-primary text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest">{{ prop.exigences?.type || 'Logement' }}</div>
                        </div>
                        <div class="p-3">
                           <p class="text-xs font-black truncate text-slate-900 dark:text-white">{{ prop.titre }}</p>
                           <p class="text-[10px] text-primary font-black mt-1">{{ Number(prop.price).toLocaleString() }} GNF</p>
                           <div class="flex items-center gap-1 mt-2 text-slate-500">
                              <span class="material-symbols-outlined text-xs notranslate" translate="no">location_on</span>
                              <span class="text-[9px] font-bold truncate">{{ prop.localisation }}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
                <span :class="['text-[10px] text-slate-400', msg.role === 'user' ? 'mr-1' : 'ml-1']">
                  {{ formatDate(msg.timestamp) }}
                </span>
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex gap-4 max-w-3xl">
              <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-white animate-pulse notranslate" translate="no">smart_toy</span>
              </div>
              <div class="bg-white dark:bg-slate-900 p-4 rounded-xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-sm">
                <div class="flex gap-1">
                  <div class="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                  <div class="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <div class="max-w-4xl mx-auto">
              <div class="relative flex items-center">
                <input 
                  v-model="newMessage"
                  @keyup.enter="handleSendMessage"
                  class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-4 pl-6 pr-16 focus:ring-2 focus:ring-primary text-sm" 
                  placeholder="Posez une question sur l'immobilier en Guinée..." 
                  type="text"
                />
                <div class="absolute right-2 flex gap-1">
                  <button 
                    @click="handleSendMessage"
                    :disabled="!newMessage.trim() || isTyping"
                    class="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <span class="material-symbols-outlined notranslate" translate="no">send</span>
                  </button>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-3 justify-center">
                <button 
                  v-for="hint in hints" 
                  :key="hint"
                  @click="newMessage = hint; handleSendMessage()"
                  class="text-[10px] md:text-[11px] font-semibold text-slate-500 hover:text-primary border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-all"
                >
                  {{ hint }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Side Panel Details -->
        <div class="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hidden lg:block overflow-y-auto custom-scrollbar">
          <h3 class="font-bold text-slate-900 dark:text-slate-100 mb-6">Localisation : {{ contextInfo.location || 'Ratoma' }}</h3>
          <div class="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 overflow-hidden relative border border-slate-200 dark:border-slate-800">
            <div class="absolute inset-0 bg-cover bg-center opacity-70" style="background-image: url('https://w0.peakpx.com/wallpaper/32/984/HD-wallpaper-minimalist-map-conakry-guinea.jpg');"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="bg-primary/20 p-4 rounded-full animate-pulse">
                <div class="bg-primary w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-6">
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Statistiques du quartier</h4>
              <div class="space-y-4">
                <div v-for="stat in contextInfo.stats" :key="stat.label">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-600 dark:text-slate-400">{{ stat.label }}</span>
                    <span :class="['font-bold', stat.colorClass || 'text-primary']">{{ stat.value }}</span>
                  </div>
                  <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div :class="['h-full rounded-full', stat.bgClass || 'bg-primary']" :style="{ width: stat.percentage + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 class="text-xs font-bold text-primary uppercase tracking-widest mb-2">Conseil de l'IA</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ contextInfo.aiAdvice || "Sélectionnez un quartier pour obtenir des conseils personnalisés." }}
              </p>
            </div>

            <div class="pt-6">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Documents requis</h4>
              <ul class="space-y-2">
                <li v-for="doc in contextInfo.docs" :key="doc.label" class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span class="material-symbols-outlined text-sm notranslate" translate="no" :class="doc.required ? 'text-green-500' : 'text-slate-300'">
                    {{ doc.required ? 'check_circle' : 'circle' }}
                  </span>
                  {{ doc.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue';
import { aiService } from '@/services/api-fetch';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isSidebarOpen = ref(false);
const isTyping = ref(false);
const newMessage = ref('');
const chatContainer = ref(null);
const currentConvId = ref(null);

const messages = ref([
  { 
    role: 'assistant', 
    content: 'Bonjour ! Je suis votre assistant GuinéeLogement. Comment puis-je vous aider dans votre recherche immobilière aujourd\'hui ?', 
    timestamp: new Date() 
  }
]);

const conversations = ref([]);

const hints = [
  "Quelles sont les garanties ?",
  "Planifier une visite",
  "Comparer avec d'autres quartiers",
  "Budget maison à Lambandji"
];

const contextInfo = ref({
  location: 'Ratoma',
  aiAdvice: 'Le budget de 8M GNF est très compétitif pour Ratoma. Je vous suggère de visiter rapidement car les biens dans cette zone partent en moins de 48h.',
  stats: [
    { label: 'Demande locative', value: 'Haute', percentage: 80, bgClass: 'bg-primary', colorClass: 'text-primary' },
    { label: 'Sécurité moyenne', value: '8.4/10', percentage: 84, bgClass: 'bg-green-500', colorClass: 'text-green-600' }
  ],
  docs: [
    { label: "Pièce d'identité valide", required: true },
    { label: "Justificatif de revenus", required: true },
    { label: "Caution (3-6 mois selon proprio)", required: false }
  ]
});

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDateRelative = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  if (diff < 1000 * 60 * 60) return "Il y a un instant";
  if (diff < 1000 * 60 * 60 * 24) return "Aujourd'hui";
  return d.toLocaleDateString();
};

const handleSendMessage = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }
  if (!newMessage.value.trim() || isTyping.value) return;

  const content = newMessage.value;
  newMessage.value = '';
  
  messages.value.push({
    role: 'user',
    content: content,
    timestamp: new Date()
  });

  await scrollToBottom();
  isTyping.value = true;
  
  try {
    // Si pas de conversation, on en crée une
    if (!currentConvId.value) {
      const conv = await aiService.createConversation();
      currentConvId.value = conv.id;
      loadConversations();
    }

    const data = await aiService.sendMessage({ 
      role: 'user', 
      contenu: content,
      id_conversation: currentConvId.value 
    });

    messages.value.push({
      role: 'assistant',
      content: data.contenu || "Je ne sais pas comment répondre à cela.",
      timestamp: new Date(),
      results: data.results || [] // Phase 5: Pass real results to UI
    });
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: "Désolé, je rencontre une petite difficulté technique. Pouvez-vous reformuler ?",
      timestamp: new Date()
    });
  } finally {
    isTyping.value = false;
    await scrollToBottom();
  }
};

const loadConversations = async () => {
  try {
    conversations.value = await aiService.getConversations();
  } catch (err) {
    console.error("Erreur historique");
  }
};

const createNewConversation = async () => {
  currentConvId.value = null;
  messages.value = [
    { 
      role: 'assistant', 
      content: 'Bonjour ! Je suis votre assistant GuinéeLogement. Comment puis-je vous aider aujourd\'hui ?', 
      timestamp: new Date() 
    }
  ];
  if (window.innerWidth < 768) isSidebarOpen.value = false;
};

const loadConversation = async (id) => {
  currentConvId.value = id;
  if (window.innerWidth < 768) isSidebarOpen.value = false;
  try {
    // Note: This endpoint should be added to api-fetch if not already there
    const msgs = await aiService.getMessagesByConversation(id);
    messages.value = msgs.map(m => ({
      role: m.role,
      content: m.contenu,
      timestamp: m.date_message
    }));
    await scrollToBottom();
  } catch (err) {
    console.error("Erreur chargement messages");
  }
};

onMounted(async () => {
  // Redirection guard (Phase 5)
  if (!authStore.isAuthenticated) {
    router.push({ 
      path: '/login', 
      query: { 
        redirect: route.fullPath,
        message: 'Veuillez vous connecter pour utiliser l\'assistant IA.' 
      } 
    });
    return;
  }

  loadConversations();
  await scrollToBottom();

  // Handle initial query from HomeView (Phase 5)
  if (route.query.q) {
    newMessage.value = route.query.q;
    handleSendMessage();
  }
});

watch(messages, () => scrollToBottom(), { deep: true });
</script>

<style>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>
