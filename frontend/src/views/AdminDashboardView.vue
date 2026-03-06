<template>
  <div class="flex min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
    <!-- 1. Sidebar Navigation (Desktop Only) -->
    <aside class="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full transition-colors duration-200 z-50">
      <div class="p-6 flex items-center gap-4">
        <div @click="$router.push('/')" class="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
          <span class="material-symbols-outlined font-black">apartment</span>
        </div>
        <div>
          <h1 class="text-primary dark:text-slate-100 text-lg font-black leading-tight tracking-tight">GuinéeLogement</h1>
          <p class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Administration</p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 py-4 space-y-2">
        <a v-for="item in navItems" :key="item.label" 
           href="#" 
           @click.prevent="item.path ? $router.push(item.path) : activeTab = item.id"
           :class="[
             'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm',
             activeTab === item.id 
               ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
               : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-light'
           ]"
        >
          <span class="material-symbols-outlined text-xl" :class="{ 'fill-1': activeTab === item.id }">{{ item.icon }}</span>
          <span class="tracking-tight">{{ item.label }}</span>
        </a>
      </nav>

      <div class="p-4 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-3 p-3 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
          <div class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-600 shadow-sm">
            <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/a/ACg8ocL_F-jW-W6Y2F-y2XG_J5..." alt="Admin" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-black text-slate-900 dark:text-slate-100 truncate tracking-tight">M. Sylla</p>
            <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Admin Principal</p>
          </div>
          <button @click="logout" class="size-8 flex items-center justify-center rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-500 transition-colors">
            <span class="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- 2. Main Content -->
    <main class="lg:ml-72 flex-1 flex flex-col min-h-screen">
      <!-- Mobile Header (hidden on Desktop) -->
      <header class="lg:hidden sticky top-0 z-[60] flex items-center bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary dark:text-blue-400 font-black">menu</span>
          <h1 class="text-lg font-black leading-tight tracking-tight">Dashboard Admin</h1>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative p-2 text-slate-600 dark:text-slate-400">
            <span class="material-symbols-outlined font-black">notifications</span>
            <span class="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
          </button>
          <div class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/10">
            <span class="material-symbols-outlined text-primary dark:text-blue-400 text-xl font-black">account_circle</span>
          </div>
        </div>
      </header>

      <!-- Desktop Header (hidden on Mobile) -->
      <header class="hidden lg:flex items-center justify-between px-12 py-10 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-40">
        <div class="space-y-1">
          <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Vue d'ensemble</h2>
          <p class="text-slate-500 dark:text-slate-400 font-medium">Bienvenue, voici le résumé de l'activité aujourd'hui.</p>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input v-model="searchQuery" class="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none w-80 transition-all shadow-sm" placeholder="Rechercher..." type="text"/>
          </div>
          <button class="size-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-primary transition-all shadow-sm">
            <span class="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <div class="flex-1 p-4 lg:p-12 space-y-8 lg:space-y-12 pb-32 lg:pb-12">
        <!-- Desktop Stats Grid (lg+) -->
        <section class="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 group">
            <div class="flex items-center justify-between mb-6">
              <div :class="['size-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform', stat.colorClass]">
                <span class="material-symbols-outlined text-2xl font-light">{{ stat.icon }}</span>
              </div>
              <div :class="['flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', stat.trendClass]">
                <span class="material-symbols-outlined text-xs">{{ stat.trend > 0 ? 'trending_up' : 'trending_down' }}</span>
                <span>{{ Math.abs(stat.trend) }}%</span>
              </div>
            </div>
            <p class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">{{ stat.label }}</p>
            <h3 class="text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">{{ stat.label.includes('Revenu') ? stat.value.toLocaleString() + ' GNF' : stat.value }}</h3>
          </div>
        </section>

        <!-- Mobile Key Metrics (<lg) -->
        <section class="lg:hidden space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Indicateurs Clés</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in stats.slice(0, 3)" :key="'mob-'+stat.label" 
                 :class="[
                   'flex flex-col gap-2 rounded-[2rem] p-5 shadow-sm border transition-transform active:scale-95',
                   stat.label.includes('Revenu') ? 'bg-primary/5 border-primary/10 col-span-1' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                 ]"
                 :style="stat.label === 'Annonces Actives' ? 'grid-column: span 2' : ''"
            >
              <div class="flex justify-between items-start">
                <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">{{ stat.label.replace('Total ', '') }}</p>
                <div :class="['flex items-center gap-0.5 text-[9px] font-black', stat.trend > 0 ? 'text-emerald-500' : 'text-rose-500']">
                  <span class="material-symbols-outlined text-[10px] font-black">{{ stat.trend > 0 ? 'trending_up' : 'trending_down' }}</span>
                  <span>{{ Math.abs(stat.trend) }}%</span>
                </div>
              </div>
              <p :class="['text-xl font-black tracking-tight', stat.label.includes('Revenu') ? 'text-primary dark:text-blue-400' : 'text-slate-900 dark:text-white']">
                {{ stat.label.includes('Revenu') ? stat.value + ' FG' : stat.value }}
              </p>
            </div>
          </div>
        </section>

        <!-- Mobile Quick Actions (<lg) -->
        <section class="lg:hidden space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Actions Rapides</h2>
          <div class="grid grid-cols-2 gap-4">
            <button class="flex flex-col items-center justify-center gap-3 rounded-[2.2rem] py-6 px-4 bg-primary text-white shadow-xl shadow-primary/20 active:scale-90 transition-all">
              <span class="material-symbols-outlined text-3xl font-light">rule</span>
              <span class="text-[10px] font-black uppercase tracking-widest leading-none">Valider Annonces</span>
            </button>
            <button class="flex flex-col items-center justify-center gap-3 rounded-[2.2rem] py-6 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm active:scale-90 transition-all">
              <span class="material-symbols-outlined text-3xl font-light">group</span>
              <span class="text-[10px] font-black uppercase tracking-widest leading-none">Gérer Users</span>
            </button>
          </div>
        </section>

        <!-- Alerts & Activities -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Transactions / Alerts -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Mobile Urgent Alerts (<lg) -->
            <div class="lg:hidden space-y-4">
              <div class="flex justify-between items-center px-1">
                <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Alertes Urgentes</h2>
                <span class="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest">4 Nouvelles</span>
              </div>
              <div class="flex flex-col gap-3">
                <div v-for="alert in mobileAlerts" :key="alert.id" 
                     class="flex items-center gap-4 p-4 rounded-[1.8rem] transition-all active:scale-[0.98] border shadow-sm"
                     :class="alert.bgClass"
                >
                  <div :class="['size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner', alert.iconBg]">
                    <span class="material-symbols-outlined text-xl font-black" :class="alert.iconColor">{{ alert.icon }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-tight">{{ alert.title }}</h4>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 truncate">{{ alert.desc }}</p>
                    <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1.5">{{ alert.time }}</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                </div>
              </div>
            </div>

            <!-- Desktop Transactions Table (lg+) -->
            <div class="hidden lg:flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div class="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <h4 class="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-widest">Transactions Récentes</h4>
                <button class="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Voir tout</button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                    <tr>
                      <th class="px-8 py-5">Date</th>
                      <th class="px-8 py-5">Utilisateur</th>
                      <th class="px-8 py-5">Montant</th>
                      <th class="px-8 py-5">Commission</th>
                      <th class="px-8 py-5 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                    <tr v-for="tx in recentTransactions" :key="tx.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td class="px-8 py-6 text-xs font-bold text-slate-400">{{ tx.date }}</td>
                      <td class="px-8 py-6">
                        <div class="flex items-center gap-4">
                          <div class="size-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary text-[10px] font-black border border-primary/10">
                            {{ tx.initials }}
                          </div>
                          <span class="text-sm font-black text-slate-900 dark:text-white tracking-tight">{{ tx.user }}</span>
                        </div>
                      </td>
                      <td class="px-8 py-6 text-sm font-black">{{ tx.amount }} <span class="text-[10px] opacity-50">GNF</span></td>
                      <td class="px-8 py-6 text-sm font-black text-primary">{{ tx.commission }} <span class="text-[10px] opacity-50">GNF</span></td>
                      <td class="px-8 py-6 text-center">
                        <span :class="['inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(tx.status)]">
                          {{ tx.statusLabel }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Desktop Activity Feed (lg+) -->
          <div class="hidden lg:flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden h-full">
            <div class="p-8 border-b border-slate-50 dark:border-slate-800">
              <h4 class="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-widest">Activité Récente</h4>
            </div>
            <div class="p-8 space-y-10 relative">
              <div v-for="(activity, index) in activities" :key="index" class="flex gap-6 relative group">
                <div v-if="index !== activities.length - 1" class="absolute top-12 left-6 -translate-x-1/2 w-0.5 h-12 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary/20 transition-colors"></div>
                <div class="relative shrink-0">
                  <div :class="['size-12 rounded-2xl flex items-center justify-center shadow-sm border border-white dark:border-slate-700 transition-transform group-hover:scale-110', activity.iconBg]">
                    <span class="material-symbols-outlined text-xl" :class="activity.iconColor">{{ activity.icon }}</span>
                  </div>
                </div>
                <div class="min-w-0 pt-1">
                  <p class="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-tight">{{ activity.title }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{{ activity.desc }}</p>
                  <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[10px]">schedule</span>
                    {{ activity.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Bottom Navigation (only on Admin routes) -->
      <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-4 pb-8 pt-2">
        <div class="flex justify-between items-center max-w-md mx-auto">
          <a v-for="tab in mobileTabs" :key="tab.label" 
             href="#" @click.prevent="tab.path ? $router.push(tab.path) : activeTab = tab.id"
             :class="[
               'flex flex-1 flex-col items-center justify-center gap-1.5 py-2 transition-all active:scale-90',
               activeTab === tab.id ? 'text-primary dark:text-blue-400' : 'text-slate-400'
             ]"
          >
            <span class="material-symbols-outlined font-black" :class="{ 'fill-1': activeTab === tab.id }">{{ tab.icon }}</span>
            <span class="text-[9px] font-black uppercase tracking-widest">{{ tab.label }}</span>
          </a>
        </div>
      </nav>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('dashboard');
const searchQuery = ref('');

const navItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: 'dashboard' },
  { id: 'users', label: 'Utilisateurs', icon: 'group' },
  { id: 'listings', label: 'Annonces', icon: 'real_estate_agent' },
  { id: 'payments', label: 'Paiements', icon: 'payments' },
  { id: 'anti-fraud', label: 'Anti-Fraude', icon: 'shield', path: '/admin/anti-fraud' },
  { id: 'commissions', label: 'Commissions', icon: 'account_balance_wallet' },
  { id: 'settings', label: 'Paramètres', icon: 'settings' },
  { id: 'advanced-settings', label: 'Configuration', icon: 'tune', path: '/admin/settings' },
  { id: 'aide', label: 'Aide & Support', icon: 'help_center', path: '/aide' },
];

const mobileTabs = [
  { id: 'dashboard', label: 'Accueil', icon: 'dashboard' },
  { id: 'listings', label: 'Annonces', icon: 'domain' },
  { id: 'users', label: 'Users', icon: 'group' },
  { id: 'stats', label: 'Stats', icon: 'analytics', path: '/admin/analytics' },
  { id: 'settings', label: 'Réglages', icon: 'settings' },
];

const stats = [
  { label: 'Revenu Mensuel', value: '2.5M', trend: 12, icon: 'monetization_on', colorClass: 'bg-primary text-white shadow-xl shadow-primary/20', trendClass: 'bg-green-50/10 text-emerald-400' },
  { label: 'Utilisateurs Registrés', value: '1,240', trend: 5, icon: 'group', colorClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', trendClass: 'bg-green-50 dark:bg-green-900/20 text-green-600' },
  { label: 'Annonces Actives', value: '450', trend: -2, icon: 'apartment', colorClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', trendClass: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' },
  { label: 'Commissions', value: '8.5M', trend: 18, icon: 'pending_actions', colorClass: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', trendClass: 'bg-green-50 dark:bg-green-900/20 text-green-600' },
];

const recentTransactions = [
  { id: 1, date: '12/10/2023', user: 'Mamadou Diallo', initials: 'MD', amount: '2.500.000', commission: '250.000', status: 'completed', statusLabel: 'Complété' },
  { id: 2, date: '12/10/2023', user: 'Aissata Camara', initials: 'AC', amount: '4.000.000', commission: '400.000', status: 'pending', statusLabel: 'En attente' },
  { id: 3, date: '11/10/2023', user: 'Ibrahima Sow', initials: 'IS', amount: '1.800.000', commission: '180.000', status: 'completed', statusLabel: 'Complété' },
  { id: 4, date: '11/10/2023', user: 'Mariama Sylla', initials: 'MS', amount: '5.500.000', commission: '550.000', status: 'cancelled', statusLabel: 'Annulé' },
];

const activities = [
  { title: 'Nouvel utilisateur inscrit', desc: 'Abdoulaye Keita a rejoint la plateforme.', time: 'Il y a 5 min', icon: 'person_add', iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600' },
  { title: 'Nouvelle annonce publiée', desc: 'Villa de luxe à Ratoma (2.5M GNF/mois).', time: 'Il y a 25 min', icon: 'add_home', iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-600' },
  { title: 'Identité vérifiée', desc: 'Le profil de Fatoumata Binta a été validé.', time: 'Il y a 1 heure', icon: 'verified', iconBg: 'bg-purple-50 dark:bg-purple-900/20', iconColor: 'text-purple-600' },
  { title: 'Nouveau ticket support', desc: 'Problème de paiement signalé par ID #4521.', time: 'Il y a 3 heures', icon: 'support_agent', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-600' },
];

const mobileAlerts = [
  { id: 1, title: 'Paiement en attente', desc: 'Villa Kaloum #9823 - 450,000 FG', time: 'Il y a 15 min', icon: 'payments', iconBg: 'bg-rose-100 dark:bg-rose-900/50', iconColor: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/50' },
  { id: 2, title: 'Annonce Signalée', desc: 'Appartement Dixinn - Contenu suspect', time: 'Il y a 2 heures', icon: 'report', iconBg: 'bg-amber-100 dark:bg-amber-900/50', iconColor: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50' },
  { id: 3, title: 'Nouvelle Inscription', desc: 'Agent : Alpha Sylla - Ratoma', time: 'Il y a 5 heures', icon: 'person_add', iconBg: 'bg-slate-100 dark:bg-slate-700', iconColor: 'text-slate-600 dark:text-slate-400', bgClass: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-80' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600';
    case 'pending': return 'bg-amber-50 dark:bg-amber-900/30 text-amber-600';
    case 'cancelled': return 'bg-rose-50 dark:bg-rose-900/30 text-rose-600';
    default: return 'bg-slate-50 dark:bg-slate-800 text-slate-500';
  }
};

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
