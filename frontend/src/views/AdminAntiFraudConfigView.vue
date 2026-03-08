<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
    
    <!-- DESKTOP VIEW -->
    <div class="hidden lg:flex flex-col grow">
      <!-- Top Navigation Bar -->
      <header class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 sticky top-0 z-50 backdrop-blur-md">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3 text-primary dark:text-blue-400 cursor-pointer group" @click="$router.push('/admin')">
            <div class="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <span class="material-symbols-outlined font-black">shield_person</span>
            </div>
            <h2 class="text-slate-900 dark:text-slate-100 text-lg font-black leading-tight tracking-tighter">GuinéeLogement <span class="font-medium text-slate-400 italic">Modération</span></h2>
          </div>
          <div class="hidden md:flex items-center gap-8">
            <a @click="$router.push('/admin')" class="text-slate-500 dark:text-slate-400 hover:text-primary text-xs font-black uppercase tracking-widest transition-colors cursor-pointer">Tableau de bord</a>
            <a class="text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400 text-xs font-black uppercase tracking-widest pb-1 cursor-default">Règles</a>
            <a @click="$router.push('/admin/anti-fraud')" class="text-slate-500 dark:text-slate-400 hover:text-primary text-xs font-black uppercase tracking-widest transition-colors cursor-pointer">Historique</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative hidden sm:block">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input class="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl text-sm font-medium w-64 transition-all" placeholder="Rechercher une règle..." type="text"/>
          </div>
          <button class="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <div class="h-9 w-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden cursor-pointer" @click="$router.push('/mon-profil')">
            <img alt="Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZieWDFGHAyEi8kyH0ARMT1VWlfXv50rVMGD7Pq5bXFAHjiAeymoXvGa31xlyjnr7_nocSKyaWMT-MDatmeN4RJQg_9X_4CqxMlegzx8h26ZwHOK5OH7-URiGRhgAE-y-cFT9so4ERZ3M_sJrxYJ0tNf6eNVMzF9ZX6ZXvjO3i0qWF_EUP68MJo3E-nyLJ9J1zeBO0xC6hSasEQyxhmvtIODJbMf4s5ptUvjy4AO_G_e9nQtId98WR8rhCDATSX95V9nj1MKfXbAO"/>
          </div>
        </div>
      </header>

      <div class="flex flex-1 flex-col lg:flex-row">
        <!-- Sidebar -->
        <aside class="w-full lg:w-72 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-8 space-y-10">
          <div>
            <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-2">Navigation</h3>
            <nav class="space-y-2">
              <a class="flex items-center gap-4 px-4 py-3 rounded-2xl bg-primary/10 text-primary font-black text-sm shadow-sm" href="#">
                <span class="material-symbols-outlined text-xl">gavel</span>
                <span class="tracking-tight">Auto-Modération</span>
              </a>
              <a class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all font-black text-sm" href="#">
                <span class="material-symbols-outlined text-xl">verified_user</span>
                <span class="tracking-tight">Vérification KYC</span>
              </a>
              <a class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all font-black text-sm" href="#">
                <span class="material-symbols-outlined text-xl">list_alt</span>
                <span class="tracking-tight">Logs Système</span>
              </a>
            </nav>
          </div>
          <div class="pt-8 border-t border-slate-100 dark:border-slate-800">
            <div class="p-6 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 shadow-inner">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">État du système</p>
              <div class="flex items-center gap-3">
                <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span class="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">Actif & Sécurisé</span>
              </div>
              <p class="text-[9px] text-slate-400 italic mt-3 font-medium">Dernière mise à jour : 5 min</p>
            </div>
          </div>
        </aside>

        <!-- Main Content (Desktop) -->
        <main class="flex-1 p-6 lg:p-12 space-y-10 max-w-6xl mx-auto w-full overflow-y-auto custom-scrollbar">
          <!-- Header Title -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-1">
              <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">Configuration Anti-Fraude</h1>
              <p class="text-slate-500 dark:text-slate-400 font-medium text-lg">Gérez les algorithmes et les seuils de sécurité de GuinéeLogement.</p>
            </div>
            <div class="flex gap-4">
              <button class="h-14 px-8 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">Exporter PDF</button>
              <button @click="saveRules" class="h-14 px-8 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">Enregistrer</button>
            </div>
          </div>

          <!-- Desktop Sections (Risk Scores, Filters, etc.) -->
          <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden font-display">
            <div class="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined font-black">analytics</span>
                </div>
                <h2 class="text-xl font-black tracking-tight">1. Seuils de score de risque</h2>
              </div>
              <span class="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100/50">IA Active</span>
            </div>
            <div class="p-10 space-y-12">
              <div class="space-y-6">
                <div class="flex justify-between items-center">
                  <label class="font-black text-sm text-slate-700 dark:text-slate-300 uppercase tracking-tight">Seuil de blocage automatique</label>
                  <span class="bg-primary/5 text-primary text-lg font-black px-5 py-2 rounded-2xl border border-primary/10 shadow-inner">{{ autoBlockThreshold }}%</span>
                </div>
                <div class="relative pt-2">
                   <input v-model="autoBlockThreshold" class="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary" max="100" min="0" type="range"/>
                   <div class="absolute -bottom-6 left-0 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sensibilité faible</div>
                   <div class="absolute -bottom-6 right-0 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Blocage strict</div>
                </div>
              </div>
            </div>
          </section>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <!-- Filter Section (Desktop) -->
            <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 flex flex-col">
              <div class="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                <div class="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined font-black">filter_list</span>
                </div>
                <h2 class="text-xl font-black tracking-tight">2. Filtres de contenu</h2>
              </div>
              <div class="p-8 space-y-6">
                <div v-for="toggle in contentToggles" :key="toggle.label" class="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700">
                   <div>
                     <p class="font-black text-sm text-slate-900 dark:text-white tracking-tight">{{ toggle.label }}</p>
                     <p class="text-[10px] text-slate-400 font-bold mt-1">{{ toggle.desc }}</p>
                   </div>
                   <button @click="toggle.active = !toggle.active" class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out" :class="toggle.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'">
                     <span class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200" :class="toggle.active ? 'translate-x-5' : 'translate-x-0'"></span>
                   </button>
                </div>
              </div>
            </section>

            <!-- KYC Section (Desktop) -->
            <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 flex flex-col">
              <div class="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                <div class="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined font-black">verified_user</span>
                </div>
                <h2 class="text-xl font-black tracking-tight">3. Vérification KYC</h2>
              </div>
              <div class="p-8 space-y-4">
                <label v-for="rule in kycRules" :key="rule.label" class="flex items-center gap-4 p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl cursor-pointer border-2" :class="rule.active ? 'border-primary/20 bg-primary/5' : 'border-transparent'">
                  <input v-model="rule.active" type="checkbox" class="size-6 border-2 border-slate-200 dark:border-slate-700 rounded-lg checked:bg-primary"/>
                  <span class="text-sm font-black text-slate-900 dark:text-white tracking-tight">{{ rule.label }}</span>
                </label>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>

    <!-- MOBILE VIEW (Auto-modération) -->
    <div class="lg:hidden flex flex-col grow pb-24 relative overflow-x-hidden">
      <!-- Mobile Header -->
      <div class="flex items-center bg-white dark:bg-background-dark p-4 border-b border-primary/10 justify-between sticky top-0 z-[100] backdrop-blur-xl">
        <div @click="$router.push('/admin/anti-fraud')" class="text-primary dark:text-slate-100 flex size-10 items-center cursor-pointer active:scale-90 transition-transform">
          <span class="material-symbols-outlined font-black">arrow_back</span>
        </div>
        <h1 class="text-primary dark:text-slate-100 text-lg font-black leading-tight flex-1 text-center tracking-tighter">Auto-modération</h1>
        <div class="flex w-10 items-center justify-end">
          <button class="flex items-center justify-center rounded-xl size-10 bg-primary/10 text-primary dark:text-slate-100 active:rotate-90 transition-transform">
            <span class="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>

      <!-- AI Status Card -->
      <div class="p-4">
        <div class="bg-primary rounded-[2rem] p-6 text-white shadow-2xl shadow-primary/30 overflow-hidden relative">
          <div class="relative z-10 space-y-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-white/60 text-[10px] font-black uppercase tracking-widest">État de l'IA</p>
                <h3 class="text-2xl font-black tracking-tighter">Actif & Vigilant</h3>
              </div>
              <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <span class="bg-emerald-400 h-2 w-2 rounded-full animate-pulse"></span>
                <span class="text-[9px] font-black uppercase">En ligne</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-inner">
                <p class="text-[9px] text-white/50 font-black uppercase tracking-widest">Actions (24h)</p>
                <p class="text-xl font-black tracking-tighter">142</p>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-inner">
                <p class="text-[9px] text-white/50 font-black uppercase tracking-widest">Taux précision</p>
                <p class="text-xl font-black tracking-tighter">99.2%</p>
              </div>
            </div>
          </div>
          <div class="absolute -right-8 -bottom-8 opacity-10">
            <span class="material-symbols-outlined text-[150px] font-black">smart_toy</span>
          </div>
        </div>
      </div>

      <!-- Main Filters Section -->
      <div class="px-4 py-4 space-y-4">
        <h2 class="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] px-2">Filtres de sécurité</h2>
        <div class="space-y-4">
          <div v-for="toggle in contentToggles" :key="'m-'+toggle.label" @click="toggle.active = !toggle.active" class="flex items-center gap-4 bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-primary/5 shadow-sm active:scale-[0.98] transition-all">
            <div class="size-14 text-primary dark:text-blue-400 flex items-center justify-center rounded-[1.2rem] bg-slate-50 dark:bg-primary/20 shrink-0 shadow-inner">
              <span class="material-symbols-outlined text-2xl font-black">{{ getIconForFilter(toggle.label) }}</span>
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <p class="text-slate-900 dark:text-white text-base font-black leading-tight tracking-tight">{{ toggle.label }}</p>
              <p class="text-slate-400 text-[10px] font-bold mt-1 leading-snug">{{ toggle.desc }}</p>
            </div>
            <div class="shrink-0">
              <div class="relative flex h-8 w-14 cursor-pointer items-center rounded-full transition-colors p-1" :class="toggle.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'">
                <div class="h-6 w-6 rounded-full bg-white shadow-xl transition-transform" :class="toggle.active ? 'translate-x-6' : 'translate-x-0'"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Automatic Block Threshold Slider (Mobile) -->
      <div class="p-4">
        <div class="bg-primary/5 dark:bg-white/5 rounded-[2.5rem] p-6 border-2 border-primary/5 shadow-inner">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-primary dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Seuil de blocage</h2>
            <span class="bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{{ getThresholdLabel(autoBlockThreshold) }}</span>
          </div>
          <input v-model="autoBlockThreshold" class="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary mb-4" max="100" min="0" type="range"/>
          <div class="flex justify-between text-[9px] text-slate-400 font-black uppercase tracking-[0.1em]">
            <span>Tolérant</span>
            <span>Équililibré</span>
            <span>Strict</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-[10px] font-bold mt-6 italic leading-relaxed text-center px-4">
            L'IA bloquera automatiquement tout contenu dont le score de risque dépasse <span class="text-primary font-black">{{ autoBlockThreshold }}%</span>.
          </p>
        </div>
      </div>

      <!-- Recent Actions (Mobile) -->
      <div class="px-4 pb-12 mt-4">
        <div class="flex justify-between items-center mb-4 px-2">
          <h2 class="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Actions récentes</h2>
          <button class="text-primary text-[10px] font-black uppercase tracking-widest">Voir tout</button>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-sm divide-y divide-slate-50 dark:divide-slate-700">
          <div v-for="log in auditLogs" :key="'m-'+log.id" class="flex items-center gap-4 p-5 active:bg-slate-50 dark:active:bg-slate-700 transition-colors">
            <div :class="['size-10 flex items-center justify-center rounded-full shrink-0', log.action === 'Bloqué' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600']">
              <span class="material-symbols-outlined text-[20px] font-black">{{ log.action === 'Bloqué' ? 'block' : 'flag' }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-900 dark:text-white truncate tracking-tight">{{ log.object }} {{ log.action === 'Bloqué' ? 'bloquée' : 'signalé' }}</p>
              <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ log.time }} • Motif: {{ log.rule }}</p>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation Bar (Mobile) -->
      <div class="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 dark:bg-slate-950/95 border-t border-primary/10 px-6 pb-8 pt-3 backdrop-blur-xl">
        <div class="flex justify-between items-center">
          <a v-for="tab in mobileNavTabs" :key="tab.label" 
             class="flex flex-col items-center gap-1.5 transition-all active:scale-90"
             :class="tab.active ? 'text-primary' : 'text-slate-400'" href="#">
            <span class="material-symbols-outlined text-2xl" :class="{'fill-1': tab.active}">{{ tab.icon }}</span>
            <p class="text-[9px] font-black leading-normal uppercase tracking-widest">{{ tab.label }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Success Feedback Overlay -->
    <Transition name="fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[200] flex items-center justify-center bg-primary/95 backdrop-blur-2xl">
        <div class="flex flex-col items-center gap-8 animate-in zoom-in-50 duration-300">
          <div class="size-24 bg-white rounded-full flex items-center justify-center shadow-2xl scale-110">
            <span class="material-symbols-outlined text-5xl text-primary font-black">check_circle</span>
          </div>
          <div class="text-center space-y-2">
            <h2 class="text-white text-3xl font-black tracking-tighter">Paramètres mis à jour</h2>
            <p class="text-white/70 text-[10px] font-black uppercase tracking-[0.3em]">IA Protection Active</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const autoBlockThreshold = ref(85);
const manualReviewThreshold = ref(65);
const showSuccess = ref(false);

const contentToggles = ref([
  { label: 'Spam et Publicité', desc: 'Bloque les liens et messages répétitifs', active: true },
  { label: 'Contenu Inapproprié', desc: 'Filtre les propos offensants via NLP', active: true },
  { label: 'Tentatives de Fraude', desc: 'Détecte les arnaques de paiement par patterns', active: false }
]);

const kycRules = ref([
  { label: 'Appartements de luxe (> 20M GNF)', active: true },
  { label: 'Agences immobilières nouvelles', active: true },
  { label: 'Locations saisonnières', active: false }
]);

const auditLogs = [
  { id: 1, time: 'Il y a 12 min', object: 'Appartement Kaloum', rule: 'Spam détecté', action: 'Bloqué', score: 94 },
  { id: 2, time: 'Il y a 45 min', object: 'Villa Lambanyi', rule: 'Suspicion fraude', action: 'Signalé', score: 72 },
  { id: 3, time: 'Il y a 2h', object: 'Terrain Dubreka', rule: 'Confiance profile', action: 'Vérifié', score: 98 }
];

const mobileNavTabs = [
  { label: 'Annonces', icon: 'home', active: false },
  { label: 'Messages', icon: 'chat_bubble', active: false },
  { label: 'Modération', icon: 'gpp_maybe', active: true },
  { label: 'Profil', icon: 'person', active: false }
];

const getIconForFilter = (label) => {
  if (label.includes('Spam')) return 'shield_person';
  if (label.includes('Inapproprié')) return 'block';
  if (label.includes('Fraude')) return 'payments';
  return 'security';
};

const getThresholdLabel = (val) => {
  if (val < 40) return 'Tolérant';
  if (val < 75) return 'Équilibré';
  return 'Strict';
};

const saveRules = () => {
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 2000);
};
</script>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.fill-1 { font-variation-settings: 'FILL' 1; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
