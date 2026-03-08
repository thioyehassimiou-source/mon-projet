<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 pb-20 lg:pb-0">
    <!-- Desktop Layout Container -->
    <div class="hidden lg:flex flex-col grow">
      <!-- Desktop Header -->
      <header class="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-slate-900 px-10 py-4 sticky top-0 z-50 backdrop-blur-md">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3 text-primary dark:text-slate-100 cursor-pointer group" @click="$router.push('/')">
            <div class="size-9 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <span class="material-symbols-outlined font-black">shield</span>
            </div>
            <h2 class="text-slate-900 dark:text-white text-lg font-black tracking-tighter">GuinéeLogement <span class="text-primary/70">Admin</span></h2>
          </div>
          <div class="flex items-stretch rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus-within:border-primary/30 w-80 transition-all">
            <div class="text-slate-400 flex items-center pl-4">
              <span class="material-symbols-outlined text-lg">search</span>
            </div>
            <input class="w-full border-none bg-transparent focus:ring-0 h-10 placeholder:text-slate-400 px-4 text-sm font-medium" placeholder="Rechercher une alerte..."/>
          </div>
        </div>
        <div class="flex items-center gap-8">
          <nav class="flex items-center gap-8">
            <a @click="$router.push('/admin')" class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Dashboard</a>
            <a class="text-primary dark:text-white text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-1 cursor-default">Anti-Fraude</a>
            <a class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Users</a>
            <a @click="$router.push('/admin/settings')" class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Settings</a>
          </nav>
          <div class="flex items-center gap-4">
            <button class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 hover:text-primary transition-all">
              <span class="material-symbols-outlined">notifications</span>
            </button>
            <div class="size-10 rounded-full border-2 border-primary/20 bg-slate-200 overflow-hidden cursor-pointer" @click="$router.push('/mon-profil')">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfa-Nd2nplemTsgX1tV2LzQ7LEWavw9h7jPsdBtTJ4QdRpbeNAKBZH-twSssYpjmYwjsicmJZpARafwPHZ3bo0nJRmz8b3cvrUNUbljpuPffG5DxCOr2gaBn7_5XpaxYvXm159bvxp3ovVy4M1a2Q0PS2Nf05omB6RQhA9ygZJyd8RLmPIYEmgbxhwxBvT6ISPeUX2XIcrtqa2zFc5ioj1C1PVAS2psWyEdQOVNYSeADH0O4fJTSwnl7sqmFIHJ_Jxe_f7BrhazKL8" class="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 px-10 py-10 max-w-[1440px] mx-auto w-full space-y-12">
        <!-- Desktop Hero -->
        <div class="flex justify-between items-end">
          <div class="space-y-1">
            <h1 class="text-4xl font-black tracking-tighter">Système Anti-Fraude</h1>
            <p class="text-slate-500 font-medium text-lg">Surveillance proactively des activités suspectes.</p>
          </div>
          <div class="flex gap-4">
            <button @click="$router.push('/admin/anti-fraud/config')" class="h-14 px-8 rounded-2xl bg-white dark:bg-slate-800 text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
              <span class="material-symbols-outlined">settings_suggest</span>
              Config
            </button>
            <button class="h-14 px-8 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
              <span class="material-symbols-outlined">download</span>
              Rapport
            </button>
          </div>
        </div>

        <!-- Desktop Stats -->
        <div class="grid grid-cols-3 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 group transition-transform hover:-translate-y-1">
            <div class="flex justify-between items-start mb-6">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{{ stat.label }}</p>
              <div :class="['p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-inner', stat.bgClass]">
                <span class="material-symbols-outlined text-2xl" :class="stat.iconColor">{{ stat.icon }}</span>
              </div>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black tracking-tighter">{{ stat.value }}</span>
              <span class="text-emerald-500 text-xs font-bold">+{{ stat.trend }}%</span>
            </div>
          </div>
        </div>

        <!-- Desktop Content Grid -->
        <div class="grid grid-cols-12 gap-10">
          <div class="col-span-8 space-y-6">
            <h2 class="text-xl font-black tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-primary rounded-full"></div>
              Récent
            </h2>
            <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden">
              <table class="w-full text-left">
                <thead class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Entité</th>
                    <th class="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Score</th>
                    <th class="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                  <tr v-for="alert in alerts" :key="alert.id" @click="selectedAlert = alert" class="hover:bg-primary/5 transition-all cursor-pointer group" :class="{'bg-primary/5': selectedAlert?.id === alert.id}">
                    <td class="px-8 py-6">
                      <div class="flex flex-col">
                        <span class="text-sm font-black text-slate-900 dark:text-white">{{ alert.name }}</span>
                        <span class="text-[10px] text-slate-400 font-bold uppercase">{{ alert.type }} • #{{ alert.ref }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-6 text-center">
                      <div :class="['inline-flex items-center justify-center w-10 h-10 rounded-full border-4 font-black text-[10px]', alert.score >= 80 ? 'border-rose-500 text-rose-600' : 'border-amber-400 text-amber-600']">
                        {{ alert.score }}
                      </div>
                    </td>
                    <td class="px-6 py-6 text-xs font-bold text-slate-500">{{ alert.reason }}</td>
                    <td class="px-8 py-6 text-right">
                      <button class="text-primary text-[10px] font-black uppercase hover:underline underline-offset-4">Détails</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-span-4 space-y-6">
             <!-- Desktop sidebar details -->
             <h2 class="text-xl font-black tracking-tight">Focus</h2>
             <div v-if="selectedAlert" class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/10 overflow-hidden flex flex-col">
                <div class="h-40 bg-slate-100 relative group overflow-hidden">
                  <img :src="selectedAlert.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p class="text-[10px] font-black text-white/70 uppercase tracking-widest">{{ selectedAlert.type }}</p>
                    <h3 class="text-white font-black tracking-tight">{{ selectedAlert.name }}</h3>
                  </div>
                </div>
                <div class="p-8 space-y-6">
                  <div class="flex flex-col gap-4">
                    <div v-for="(f, i) in selectedAlert.factors" :key="i" class="flex gap-3 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span class="material-symbols-outlined text-rose-500">report</span>
                      <span>{{ f }}</span>
                    </div>
                  </div>
                  <div class="pt-4 space-y-3">
                    <button class="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">Valider</button>
                    <div class="grid grid-cols-2 gap-3">
                      <button class="py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-slate-400">Ignorer</button>
                      <button class="py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20">Bloquer</button>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Layout Container -->
    <div class="lg:hidden flex flex-col grow">
      <!-- Mobile Header -->
      <header class="sticky top-0 z-50 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 border-b border-primary/10 p-4 backdrop-blur-md">
        <div class="flex items-center gap-3">
          <div class="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-2xl font-black">security</span>
          </div>
          <h1 class="text-lg font-black tracking-tighter text-slate-900 dark:text-white">Anti-Fraude</h1>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 active:scale-90 transition-all">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 flex h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white dark:border-slate-800 ring-2 ring-rose-500/20"></span>
          </button>
          <button class="size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 active:scale-90 transition-all">
            <span class="material-symbols-outlined">menu_open</span>
          </button>
        </div>
      </header>

      <!-- Mobile Content -->
      <div class="flex flex-col gap-6 p-4">
        <!-- Mobile Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div v-for="stat in stats.slice(1, 4)" :key="'m-'+stat.label" class="flex flex-col gap-2 rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-primary/5 active:scale-95 transition-transform">
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{{ stat.label.split(' ')[0] }}</span>
              <span class="material-symbols-outlined text-lg" :class="stat.iconColor">{{ stat.icon }}</span>
            </div>
            <p class="text-2xl font-black tracking-tighter text-primary dark:text-blue-400">{{ stat.value }}</p>
            <div class="flex items-center gap-1">
               <span class="text-[9px] font-black text-emerald-500">+{{ stat.trend }}%</span>
               <span class="text-[8px] font-bold text-slate-400 uppercase">Aujourd'hui</span>
            </div>
          </div>
        </div>

        <!-- Mobile Critical Alerts Section -->
        <section class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-sm font-black tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <div class="size-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
              Alertes Critiques
            </h2>
            <button class="text-[10px] font-black text-primary uppercase tracking-widest">Tout voir</button>
          </div>
          
          <div class="space-y-3">
            <div v-for="alert in alerts.slice(0, 2)" :key="'c-'+alert.id" class="rounded-[1.8rem] bg-white dark:bg-slate-800 shadow-sm border-l-4 border-rose-500 overflow-hidden active:scale-[0.98] transition-all">
              <div class="p-5">
                <div class="flex items-start justify-between gap-4 mb-5">
                  <div class="size-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-900/50">
                    <span class="material-symbols-outlined text-2xl font-black">phishing</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-black text-slate-900 dark:text-white truncate tracking-tight">{{ alert.reason }}</p>
                    <p class="text-[10px] font-bold text-slate-500 mt-0.5">{{ alert.name }} • {{ alert.location }}</p>
                  </div>
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-700 px-2.5 py-1 rounded-full">Il y a 2m</span>
                </div>
                <div class="flex gap-3 mt-4">
                  <button class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-rose-500/20 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">block</span> Bloquer
                  </button>
                  <button @click="selectedAlert = alert" class="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-primary/10 bg-primary/5 py-4 text-[10px] font-black uppercase tracking-widest text-primary active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">policy</span> Analyser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile Suspect Activity List -->
        <section class="space-y-4">
          <h2 class="text-sm font-black tracking-tight text-slate-800 dark:text-slate-100 px-1">Activité Suspecte</h2>
          <div class="flex flex-col gap-3">
             <div v-for="i in [1, 2]" :key="i" class="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700 active:bg-slate-50 transition-colors">
               <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                 <span class="material-symbols-outlined font-black">{{ i === 1 ? 'vpn_key' : 'person_alert' }}</span>
               </div>
               <div class="flex-1 min-w-0">
                 <p class="text-xs font-black text-slate-900 dark:text-white truncate tracking-tight">{{ i === 1 ? 'Connexions multiples IP' : 'Profil non vérifié' }}</p>
                 <p class="text-[10px] font-bold text-slate-400 mt-0.5 truncate">{{ i === 1 ? '3 échecs en 10s (Koné IP...)' : '15 annonces postées en 1h' }}</p>
               </div>
               <span class="material-symbols-outlined text-slate-300">chevron_right</span>
             </div>
          </div>
        </section>

        <!-- Mobile Tabbed History Section -->
        <section class="mt-4 pb-12">
           <h2 class="text-sm font-black tracking-tight text-slate-800 dark:text-slate-100 px-1 mb-4">Historique Notifications</h2>
           <div class="rounded-[2rem] overflow-hidden bg-white dark:bg-slate-800 border-2 border-primary/5 shadow-inner">
             <div class="flex border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
               <button class="flex-1 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-primary text-primary">Envoyées</button>
               <button class="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">En attente</button>
             </div>
             <div class="p-4 space-y-4">
               <div v-for="n in 2" :key="n" class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 dark:border-slate-700/30">
                 <div class="size-8 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600">
                   <span class="material-symbols-outlined text-lg font-black">check_circle</span>
                 </div>
                 <div class="flex-1">
                   <p class="text-[11px] font-black text-slate-700 dark:text-slate-200 tracking-tight">{{ n === 1 ? 'Alerte fraude envoyée' : 'Notification de blocage (#442)' }}</p>
                   <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Aujourd'hui, 09:41</p>
                 </div>
               </div>
             </div>
           </div>
        </section>
      </div>

      <!-- Mobile Administrative Bottom Nav -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-950/95 border-t border-primary/10 px-6 pb-8 pt-3 flex justify-between items-center z-[100] backdrop-blur-xl">
        <button v-for="tab in mobileNav" :key="tab.label" 
                @click="tab.path ? $router.push(tab.path) : null"
                class="flex flex-col items-center gap-1.5 transition-all active:scale-90"
                :class="tab.active ? 'text-primary' : 'text-slate-400'">
          <span class="material-symbols-outlined text-2xl" :class="{'fill-1': tab.active}">{{ tab.icon }}</span>
          <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ tab.label }}</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stats = [
  { label: 'Alertes Totales', value: '1,284', trend: 12, icon: 'warning', bgClass: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600' },
  { label: 'Critiques', value: '12', trend: 5, icon: 'error_outline', bgClass: 'bg-rose-50 dark:bg-rose-900/20', iconColor: 'text-rose-600' },
  { label: 'Suspects', value: '45', trend: -2, icon: 'group', bgClass: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-600' },
  { label: 'Bannis', value: '156', trend: 18, icon: 'block', bgClass: 'bg-slate-50 dark:bg-slate-800', iconColor: 'text-slate-600' }
];

const alerts = ref([
  { 
    id: 1, 
    name: 'Utilisateur Suspect', 
    type: 'Utilisateur', 
    ref: '8821', 
    score: 95, 
    reason: 'Hameçonnage détecté', 
    location: 'Conakry',
    impact: 'Critique (Paiement)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc4X_CsYuUKz_MCwKZUvFvUeLmgXQdnY6NUzMVocu-KNMQA3tFAKVYA6ps1zLLa48L1fLtDE6-37MCqbwfPzLk4d_bnnn9_M-3TnMKj-gAPlXbznrS4TFhJJyXirVRTATDNOmU69On5MOKSbmnGHcfonqXwl6hm0Fj6vrY6YUE5sMU9jhsavWbIAj3aRrjzJj6HL2C3G7FGS_pNFGTm6umPjlr9LjNsEqHL9O8E_UFZ5lF4HS_xBILl0n3R23s2hH3goyLfiPCnfA5',
    factors: ['Numéro blacklisté', 'IP suspecte (VPN)', 'Contenu doublon']
  },
  { 
    id: 2, 
    name: 'Villa Kipe', 
    type: 'Annonce', 
    ref: '8819', 
    score: 82, 
    reason: 'Prix anormalement bas', 
    location: 'Kipé, Conakry',
    impact: '500k GNF/mois',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc4X_CsYuUKz_MCwKZUvFvUeLmgXQdnY6NUzMVocu-KNMQA3tFAKVYA6ps1zLLa48L1fLtDE6-37MCqbwfPzLk4d_bnnn9_M-3TnMKj-gAPlXbznrS4TFhJJyXirVRTATDNOmU69On5MOKSbmnGHcfonqXwl6hm0Fj6vrY6YUE5sMU9jhsavWbIAj3aRrjzJj6HL2C3G7FGS_pNFGTm6umPjlr9LjNsEqHL9O8E_UFZ5lF4HS_xBILl0n3R23s2hH3goyLfiPCnfA5',
    factors: ['Photos déjà utilisées', 'Hôte non identifié']
  }
]);

const mobileNav = [
  { label: 'Accueil', icon: 'home', active: false, path: '/admin' },
  { label: 'Sécurité', icon: 'shield_with_heart', active: true, path: '/admin/anti-fraud' },
  { label: 'Rapports', icon: 'analytics', active: false, path: '/admin/analytics' },
  { label: 'Profil', icon: 'person', active: false, path: '/mon-profil' }
];

const selectedAlert = ref(alerts.value[0]);
</script>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.fill-1 { font-variation-settings: 'FILL' 1; }
</style>
