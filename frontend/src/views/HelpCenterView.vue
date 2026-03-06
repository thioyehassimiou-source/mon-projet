<template>
  <div class="flex min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
    <!-- Sidebar Navigation (Desktop Only) -->
    <aside class="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col fixed h-full transition-colors duration-200 z-50">
      <div class="p-6 flex items-center gap-4 group cursor-pointer" @click="$router.push('/')">
        <div class="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined font-black">apartment</span>
        </div>
        <div>
          <h1 class="text-primary dark:text-slate-100 text-lg font-black leading-tight tracking-tight">GuinéeLogement</h1>
          <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Immobilier</p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 py-4 space-y-2">
        <router-link v-for="item in navItems" :key="item.label" 
           :to="item.path"
           :class="[
             'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm',
             $route.path === item.path 
               ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
               : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-light'
           ]"
        >
          <span class="material-symbols-outlined text-xl" :class="{ 'fill-1': $route.path === item.path }">{{ item.icon }}</span>
          <span class="tracking-tight">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-6">
        <button @click="$router.push('/listings/add')" class="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 active:scale-95">
          <span class="material-symbols-outlined">add_circle</span>
          Publier une annonce
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="lg:ml-72 flex-1 flex flex-col min-h-screen">
      <!-- MOBILE VIEW (lg:hidden) -->
      <div class="lg:hidden flex flex-col w-full bg-white dark:bg-background-dark min-h-screen pb-24">
        <!-- Mobile Header & Search -->
        <header class="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-primary/10">
          <div class="flex items-center p-4 gap-4">
            <button @click="$router.back()" class="text-primary dark:text-slate-100 p-1 active:scale-90 transition-transform">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-black leading-tight tracking-tight flex-1">Centre d'aide</h1>
            <button class="text-primary dark:text-slate-100 p-1">
              <span class="material-symbols-outlined">notifications</span>
            </button>
          </div>
          <div class="px-4 pb-4">
            <label class="flex flex-col w-full">
              <div class="flex w-full items-stretch rounded-xl bg-primary/5 dark:bg-white/10 h-12">
                <div class="flex items-center justify-center pl-4 text-primary/60 dark:text-slate-400">
                  <span class="material-symbols-outlined">search</span>
                </div>
                <input v-model="searchQuery" class="w-full border-none bg-transparent focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-primary/40 dark:placeholder:text-slate-500 px-4 text-sm font-bold" placeholder="Comment pouvons-nous vous aider ?" type="text"/>
              </div>
            </label>
          </div>
        </header>

        <!-- Mobile Categories -->
        <section class="p-4">
          <h2 class="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Catégories d'aide</h2>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="cat in categories" :key="cat.title" class="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white dark:bg-slate-900 p-5 hover:border-primary/30 transition-all active:scale-95 shadow-sm">
              <div class="text-primary dark:text-primary/40">
                <span class="material-symbols-outlined text-3xl font-light">{{ cat.icon }}</span>
              </div>
              <div>
                <h3 class="text-xs font-black tracking-tight leading-tight">{{ cat.title }}</h3>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1">{{ cat.mobileDesc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile FAQs -->
        <section class="p-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-black uppercase tracking-widest text-slate-400">FAQs populaires</h2>
            <a class="text-[10px] font-black uppercase tracking-[0.2em] text-primary" href="#">Voir tout</a>
          </div>
          <div class="space-y-2">
            <div v-for="(faq, idx) in faqs" :key="idx" class="flex items-center justify-between p-5 rounded-2xl bg-primary/5 dark:bg-white/5 active:scale-[0.98] transition-all group">
              <span class="text-sm font-bold tracking-tight text-slate-700 dark:text-slate-200">{{ faq.question }}</span>
              <span class="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </div>
        </section>

        <!-- Mobile Support Card -->
        <section class="p-4">
          <div class="bg-primary rounded-[2rem] p-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div class="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-2xl"></div>
            <h3 class="text-xl font-black mb-2 tracking-tight">Besoin d'aide personnalisée ?</h3>
            <p class="text-xs text-white/70 mb-8 font-bold leading-relaxed">Nos conseillers sont disponibles du Lundi au Vendredi de 8h à 18h.</p>
            <div class="flex flex-col gap-3">
              <button class="flex items-center justify-center gap-2 bg-white text-primary font-black py-4 rounded-2xl w-full text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-xl">
                <span class="material-symbols-outlined text-xl">chat</span>
                Discuter avec nous
              </button>
              <button class="flex items-center justify-center gap-2 bg-primary/20 border border-white/30 text-white font-black py-4 rounded-2xl w-full text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                <span class="material-symbols-outlined text-xl">call</span>
                Appeler le support
              </button>
            </div>
          </div>
        </section>

        <!-- Bottom Nav (Mobile) -->
        <nav class="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-4 pb-8 pt-2">
          <div class="flex justify-between items-center max-w-md mx-auto">
            <a v-for="tab in mobileNavTabs" :key="tab.label" 
               href="#" @click.prevent="$router.push(tab.path)"
               :class="[
                 'flex flex-1 flex-col items-center justify-center gap-1.5 py-2 transition-all active:scale-90',
                 $route.path === tab.path || (tab.path === '/aide' && $route.path === '/aide') ? 'text-primary dark:text-slate-100' : 'text-slate-400'
               ]"
            >
              <span class="material-symbols-outlined" :class="{ 'fill-1 font-black': $route.path === tab.path || (tab.path === '/aide' && $route.path === '/aide') }">{{ tab.icon }}</span>
              <span class="text-[9px] uppercase tracking-widest" :class="[ ($route.path === tab.path || (tab.path === '/aide' && $route.path === '/aide')) ? 'font-black' : 'font-bold' ]">{{ tab.label }}</span>
            </a>
          </div>
        </nav>
      </div>

      <!-- DESKTOP VIEW (lg:flex as children of main) -->
      <div class="hidden lg:flex flex-col w-full">
        <!-- Hero Section -->
        <section class="p-12">
          <div class="relative min-h-[420px] flex flex-col items-center justify-center p-16 bg-primary rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 transition-all group">
            <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 40%);"></div>
            
            <div class="flex flex-col gap-6 text-center z-10 max-w-2xl">
              <h1 class="text-white text-6xl font-black leading-tight tracking-tighter">
                Comment pouvons-nous vous aider ?
              </h1>
              <p class="text-slate-200 text-xl font-medium opacity-90 leading-relaxed">
                Recherchez des articles, des guides et des solutions pour vos besoins immobiliers en Guinée.
              </p>
            </div>

            <div class="w-full max-w-2xl z-10 mt-12">
              <div class="relative flex items-center h-22 w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-3 transition-all focus-within:ring-8 focus-within:ring-white/10">
                <div class="text-slate-400 pl-8">
                  <span class="material-symbols-outlined text-3xl">search</span>
                </div>
                <input v-model="searchQuery" class="flex-1 border-none focus:ring-0 text-slate-900 dark:text-white bg-transparent px-8 text-[1.4rem] font-black placeholder:text-slate-400 outline-none" placeholder="Rechercher une solution..." type="text"/>
                <button class="bg-primary text-white px-12 h-full rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Categories Section -->
        <section class="px-12 py-12">
          <h2 class="text-slate-900 dark:text-white text-3xl font-black mb-12 tracking-tight">Parcourir par catégorie</h2>
          <div class="grid grid-cols-4 gap-10">
            <div v-for="cat in categories" :key="cat.title" 
                 class="group bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-3 transition-all cursor-pointer overflow-hidden relative"
            >
               <div :class="['w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-inner transition-colors', cat.bgClass, 'group-hover:bg-primary group-hover:text-white']">
                 <span class="material-symbols-outlined text-4xl font-light">{{ cat.icon }}</span>
               </div>
               <h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{{ cat.title }}</h3>
               <p class="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed">{{ cat.desc }}</p>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="px-12 py-24 bg-slate-50/50 dark:bg-slate-900/30">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-20">
              <h2 class="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Foire Aux Questions</h2>
              <p class="text-slate-500 dark:text-slate-400 mt-6 text-xl font-medium">Les réponses aux questions les plus fréquentes de notre communauté.</p>
            </div>
            
            <div class="space-y-6">
              <div v-for="(faq, idx) in faqs" :key="idx" 
                   class="bg-white dark:bg-slate-900 rounded-[2.2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <button @click="faq.isOpen = !faq.isOpen" class="w-full flex items-center justify-between p-10 cursor-pointer outline-none text-left">
                  <span class="text-xl font-black text-slate-900 dark:text-white tracking-tight">{{ faq.question }}</span>
                  <span class="material-symbols-outlined text-slate-400 transition-transform duration-500" :class="{ 'rotate-180 text-primary scale-125': faq.isOpen }">expand_more</span>
                </button>
                <div v-show="faq.isOpen" class="px-10 pb-10 pt-0 border-t border-slate-50 dark:border-slate-800/50">
                  <p class="text-slate-600 dark:text-slate-400 text-lg leading-loose font-medium mt-8">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Support Section -->
        <section class="px-12 py-32">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-16 text-center tracking-tight">Vous n'avez pas trouvé votre réponse ?</h2>
            <div class="grid grid-cols-3 gap-12">
              <!-- AI Assistant -->
              <div class="bg-primary/5 dark:bg-primary/20 p-12 rounded-[3rem] border border-primary/10 flex flex-col items-center text-center group">
                <div class="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-5xl font-light">smart_toy</span>
                </div>
                <h3 class="text-3xl font-black text-primary dark:text-slate-100 mb-4 tracking-tight">Assistant IA</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-10 font-bold leading-relaxed">Obtenez une réponse instantanée à vos questions 24h/24.</p>
                <button @click="$router.push('/chat')" class="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-2xl shadow-primary/20">Lancer le chat</button>
              </div>
              
              <!-- Support Ticket -->
              <div class="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm group">
                <div class="w-24 h-24 bg-slate-50 dark:bg-slate-800 text-primary dark:text-blue-400 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-5xl font-light">confirmation_number</span>
                </div>
                <h3 class="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Ticket Support</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-10 font-bold leading-relaxed">Envoyez-nous une demande détaillée. Réponse sous 12h.</p>
                <button class="w-full py-5 border-2 border-primary text-primary font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/5 transition-all active:scale-95">Ouvrir un ticket</button>
              </div>

              <!-- Phone Support -->
              <div class="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm group">
                <div class="w-24 h-24 bg-slate-50 dark:bg-slate-800 text-primary dark:text-blue-400 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-5xl font-light">phone_in_talk</span>
                </div>
                <h3 class="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Appelez-nous</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-6 font-bold leading-relaxed">Disponible du Lundi au Vendredi, de 08:00 à 18:00.</p>
                <p class="text-primary font-black text-2xl mb-10 tracking-tighter shadow-inner px-8 py-3 bg-primary/5 rounded-full">+224 620 00 00 00</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="mt-auto py-16 px-12 border-t border-slate-100 dark:border-slate-800 text-center">
          <p class="text-slate-400 dark:text-slate-500 text-sm font-black uppercase tracking-[0.3em] leading-relaxed">
            © 2024 GuinéeLogement. Tous droits réservés.<br/>
            <span class="text-xs opacity-50">Plateforme Immobilière de Référence en Guinée.</span>
          </p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const searchQuery = ref('');

const navItems = [
  { label: 'Tableau de bord', icon: 'dashboard', path: '/admin' },
  { label: 'Mes annonces', icon: 'house', path: '/listings' },
  { label: 'Messages', icon: 'chat_bubble', path: '/messages' },
  { label: 'Favoris', icon: 'favorite', path: '/favoris' },
  { label: 'Aide & Support', icon: 'help_center', path: '/aide' },
  { label: 'Paramètres', icon: 'settings', path: '/mon-profil' },
];

const mobileNavTabs = [
  { label: 'Accueil', icon: 'home', path: '/' },
  { label: 'Recherche', icon: 'search', path: '/recherche' },
  { label: 'Favoris', icon: 'favorite', path: '/favoris' },
  { label: 'Aide', icon: 'help_outline', path: '/aide' },
  { label: 'Profil', icon: 'person', path: '/mon-profil' }
];

const categories = [
  { title: 'Mon Compte', icon: 'account_circle', desc: 'Gestion de profil, préférences et historique.', mobileDesc: 'Gérer mon profil', bgClass: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  { title: 'Paiements', icon: 'payments', desc: 'Transactions Orange Money, factures et reçus.', mobileDesc: 'Factures et reçus', bgClass: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  { title: 'Location', icon: 'real_estate_agent', desc: 'Guide du locataire, visites virtuelles et réservation.', mobileDesc: 'Guide du locataire', bgClass: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  { title: 'Sécurité', icon: 'verified_user', desc: 'Confidentialité des données et vérification d\'identité.', mobileDesc: 'Confidentialité', bgClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
];

const faqs = reactive([
  { 
    question: 'Comment réserver un logement ?', 
    answer: 'Une fois que vous avez trouvé le logement idéal, cliquez sur "Réserver". Vous serez invité à fournir vos documents d\'identité et à verser un acompte sécurisé via nos partenaires de paiement locaux.',
    isOpen: false 
  },
  { 
    question: 'Quels sont les frais de service ?', 
    answer: 'La recherche est gratuite. Nous prélevons une commission de service de 5% uniquement lors de la signature finale du bail via notre plateforme.',
    isOpen: false 
  },
  { 
    question: 'Comment annuler une visite ?', 
    answer: 'Vous pouvez annuler une visite jusqu\'à 24h à l\'avance via votre messagerie ou l\'historique de vos demandes.',
    isOpen: false 
  },
  { 
    question: 'Mes données sont-elles sécurisées ?', 
    answer: 'Toutes vos transactions et documents d\'identité sont chiffrés et stockés en conformité avec les normes de sécurité en vigueur.',
    isOpen: false 
  },
]);
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: #334155; }
</style>
