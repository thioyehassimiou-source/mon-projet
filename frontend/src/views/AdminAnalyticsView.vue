<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 pb-24 lg:pb-0 lg:pl-72">
    <!-- Desktop Sidebar (Hidden on mobile) -->
    <aside class="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col p-8 z-50">
      <div class="flex items-center gap-4 text-primary dark:text-slate-100 mb-12 group cursor-pointer" @click="$router.push('/')">
        <div class="size-10 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined font-black">home_work</span>
        </div>
        <h2 class="text-xl font-black leading-tight tracking-tighter">Admin Pro</h2>
      </div>

      <nav class="space-y-2 flex-1">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Navigation Admin</p>
        <a v-for="link in adminLinks" :key="link.label" href="#" 
           @click.prevent="$router.push(link.path)"
           class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group"
           :class="link.active ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary'">
          <span class="material-symbols-outlined transition-colors" :class="link.active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">{{ link.icon }}</span>
          <span class="text-sm font-black tracking-tight">{{ link.label }}</span>
        </a>
      </nav>

      <div class="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-4 px-4">
          <div class="size-10 rounded-full border-2 border-primary/20 bg-slate-200 overflow-hidden shadow-md">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQntzTCfVKRJeYbfvIPDLwdt-iWhnwy8G7ruqca-82lqB0zn0M3am3UhfDOO6-XR7yzpF5G-YS_Db1AkO1Z3DfRCi_ioneyqvmftbglcDAb7GwBb5DrKu90MXazI28XJgbMLrbztgWG4wPTOGa_ER_fcMk6NVm28qZARaid06m3OuOP0nwC4NFsB8BH3UzbxJoMKiLqT43_4w7KCLI3LbbrgmM5XoB_Fjaz8HISmR3AMR06LTzMAj6VuQktVyBLbS6B-xUcUTwSj2" alt="Admin" class="w-full h-full object-cover"/>
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-black text-slate-900 dark:text-white">Admin Système</span>
            <span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Connecté</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Header -->
    <header class="sticky top-0 z-40 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-5 border-b border-primary/5 dark:border-slate-800 lg:bg-transparent lg:border-none">
      <button @click="$router.back()" class="flex size-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-primary border border-slate-100 dark:border-slate-700 active:scale-90 transition-all lg:hidden">
        <span class="material-symbols-outlined font-black">arrow_back</span>
      </button>
      <div class="ml-4 lg:ml-0">
        <h1 class="text-xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white lg:text-3xl">Tableau de Bord Analytique</h1>
        <p class="hidden lg:block text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Période : 1 Janvier — 30 Juin 2024</p>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <button class="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary transition-all">
          <span class="material-symbols-outlined">download</span>
        </button>
      </div>
    </header>

    <main class="flex-1 flex flex-col gap-8 p-6 lg:p-10 max-w-7xl">
      <!-- KPI Grid -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="kpi in kpis" :key="kpi.label" 
             class="flex flex-col gap-4 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-primary/5 shadow-xl shadow-primary/5 hover:translate-y-[-4px] transition-all group">
          <div class="flex items-center justify-between">
            <div class="size-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-2xl">{{ kpi.icon }}</span>
            </div>
            <div class="text-right">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ kpi.label }}</p>
              <p class="text-xl font-black leading-tight tracking-tighter mt-1">{{ kpi.value }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm" :class="kpi.trendUp ? 'text-emerald-500' : 'text-rose-500'">{{ kpi.trendUp ? 'trending_up' : 'trending_down' }}</span>
            <span class="text-[10px] font-black" :class="kpi.trendUp ? 'text-emerald-500' : 'text-rose-500'">{{ kpi.trend }}%</span>
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-auto">vs mois passé</span>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Revenue Chart -->
        <section class="lg:col-span-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-primary/5 p-8 lg:p-10 shadow-2xl shadow-primary/5">
          <div class="flex justify-between items-center mb-10">
            <div>
              <h3 class="text-xl font-black tracking-tight">Évolution du Revenu</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Cumulé des commissions et abonnements</p>
            </div>
            <select class="text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-4 focus:ring-primary/5 px-4 h-10 cursor-pointer">
              <option>6 derniers mois</option>
              <option>1 an</option>
            </select>
          </div>
          
          <div class="h-64 w-full relative">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="chartGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style="stop-color:rgba(26, 53, 91, 0.15); stop-opacity:1"></stop>
                  <stop offset="100%" style="stop-color:rgba(26, 53, 91, 0); stop-opacity:1"></stop>
                </linearGradient>
              </defs>
              <!-- Filled Area -->
              <path d="M0,120 Q50,110 80,60 T160,80 T240,40 T320,70 T400,30 L400,150 L0,150 Z" fill="url(#chartGrad)"></path>
              <!-- Line -->
              <path d="M0,120 Q50,110 80,60 T160,80 T240,40 T320,70 T400,30" fill="none" stroke="#1a355b" stroke-linecap="round" stroke-width="4"></path>
              <!-- Grid Lines -->
              <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" class="text-slate-100 dark:text-slate-800/50" stroke-dasharray="4"></line>
              <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" class="text-slate-100 dark:text-slate-800/50" stroke-dasharray="4"></line>
              <!-- Interaction Points -->
              <circle cx="80" cy="60" fill="#1a355b" r="5" class="shadow-xl"></circle>
              <circle cx="240" cy="40" fill="#1a355b" r="5" class="shadow-xl"></circle>
              <circle cx="400" cy="30" fill="#1a355b" r="5" class="shadow-xl"></circle>
            </svg>
            
            <div class="flex justify-between mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-t border-slate-50 dark:border-slate-800/50 pt-6">
              <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
            </div>
          </div>
        </section>

        <!-- Regional Data -->
        <section class="lg:col-span-4 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-primary/5 p-8 lg:p-10 shadow-2xl shadow-primary/5 flex flex-col">
          <h3 class="text-xl font-black tracking-tight mb-8">Régions Clés</h3>
          <div class="space-y-8 flex-1">
            <div v-for="region in regions" :key="region.name" class="group">
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">{{ region.name }}</span>
                <span class="text-sm font-black text-primary">{{ region.count }}</span>
              </div>
              <div class="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800/50">
                <div class="h-full bg-primary rounded-full transition-all duration-1000 origin-left" :style="{ width: region.percent + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div class="mt-10 p-6 rounded-[2rem] bg-primary/5 border border-primary/5 text-center">
             <p class="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1">Top quartier</p>
             <p class="text-lg font-black tracking-tighter">Ratoma (42%)</p>
          </div>
        </section>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Growth Section -->
        <section class="lg:col-span-4 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-primary/5 p-8 lg:p-10 shadow-2xl shadow-primary/5">
          <h3 class="text-xl font-black tracking-tight mb-10">Croissance Co-Horte</h3>
          <div class="grid grid-cols-2 gap-6">
            <div v-for="growth in userGrowth" :key="growth.label" class="flex flex-col items-center gap-6 p-6 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50 transition-all hover:bg-white dark:hover:bg-slate-800 shadow-inner group">
              <div class="relative size-24 flex items-center justify-center">
                <svg class="size-full rotate-[-90deg]" viewBox="0 0 36 36">
                  <path class="stroke-slate-100 dark:stroke-slate-800/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="3"></path>
                  <path class="stroke-primary transition-all duration-1000" :style="{'stroke-dasharray': growth.percent + ', 100'}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-linecap="round" stroke-width="3"></path>
                </svg>
                <div class="absolute flex flex-col items-center">
                   <span class="text-xl font-black tracking-tighter pt-1">+{{ growth.percent }}%</span>
                </div>
              </div>
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{{ growth.label }}</p>
            </div>
          </div>
        </section>

        <!-- Transaction Feed -->
        <section class="lg:col-span-8 flex flex-col gap-6">
          <div class="flex items-center justify-between px-6">
            <h3 class="text-xl font-black tracking-tight">Flux de Transactions</h3>
            <button class="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:translate-x-1 transition-transform flex items-center gap-2">
              Voir tout l'historique
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div class="space-y-4">
            <div v-for="tx in transactions" :key="tx.id" class="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 border border-primary/5 rounded-[2rem] shadow-xl shadow-primary/5 hover:translate-y-[-2px] transition-all group">
              <div class="size-14 flex items-center justify-center rounded-2xl transition-all group-hover:scale-110" 
                   :class="tx.status === 'Payée' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600'">
                <span class="material-symbols-outlined text-2xl font-black">{{ tx.status === 'Payée' ? 'north_east' : 'schedule' }}</span>
              </div>
              <div class="flex-1 flex flex-col gap-1 overflow-hidden">
                <p class="text-sm font-black text-slate-900 dark:text-white truncate tracking-tight">{{ tx.title }}</p>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ tx.date }} • Ref: <span class="text-primary">{{ tx.ref }}</span></p>
              </div>
              <div class="text-right flex flex-col items-end gap-2">
                <p class="text-lg font-black tracking-tighter text-slate-900 dark:text-white">{{ tx.amount }}</p>
                <span class="text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest border" 
                      :class="tx.status === 'Payée' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-100' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-100'">
                  {{ tx.status }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Mobile Bottom Menu (Hidden on Desktop) -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-8 py-4 pb-8 lg:hidden shadow-2xl">
      <div class="flex items-center justify-between max-w-md mx-auto">
        <button v-for="m in mobileMenu" :key="m.label" 
                @click="m.path ? $router.push(m.path) : null"
                class="flex flex-col items-center gap-1 group">
          <span class="material-symbols-outlined text-2xl" :class="m.active ? 'text-primary' : 'text-slate-400 group-active:scale-90 transition-transform'" :style="m.active ? 'font-variation-settings: \'FILL\' 1' : ''">{{ m.icon }}</span>
          <span class="text-[9px] font-black uppercase tracking-widest" :class="m.active ? 'text-primary' : 'text-slate-400'">{{ m.label }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const adminLinks = [
  { label: 'Analyses', icon: 'bar_chart', active: true, path: '/admin/analytics' },
  { label: 'Utilisateurs', icon: 'group', active: false, path: '/admin' },
  { label: 'Dashboard', icon: 'dashboard', active: false, path: '/admin' },
  { label: 'Paramètres', icon: 'settings', active: false, path: '/admin/settings' }
];

const kpis = [
  { label: 'Revenu Total', value: '450M GNF', icon: 'payments', trend: 12, trendUp: true },
  { label: 'Commissions', value: '85M GNF', icon: 'account_balance_wallet', trend: 8, trendUp: true },
  { label: 'Inscrits', value: '12,450', icon: 'group', trend: 15, trendUp: true },
  { label: 'Annonces', value: '3,200', icon: 'maps_home_work', trend: 5, trendUp: true }
];

const regions = [
  { name: 'Ratoma', count: '1,240', percent: 85 },
  { name: 'Kaloum', count: '890', percent: 65 },
  { name: 'Dixinn', count: '650', percent: 45 },
  { name: 'Matam', count: '420', percent: 30 }
];

const userGrowth = [
  { label: 'Locataires', percent: 75 },
  { label: 'Proprios', percent: 42 }
];

const transactions = [
  { id: 1, title: 'Vente Villa Luxe - Kipé', date: 'Aujourd\'hui, 14:30', amount: '12.5M GNF', status: 'Payée', ref: 'GL-TRX-001' },
  { id: 2, title: 'Commission Location', date: 'Hier, 09:15', amount: '2.8M GNF', status: 'En attente', ref: 'GL-TRX-002' },
  { id: 3, title: 'Frais Abonnement Pro', date: '12 Juin, 18:00', amount: '500k GNF', status: 'Payée', ref: 'GL-TRX-003' }
];

const mobileMenu = [
  { label: 'Dashboard', icon: 'home', active: false, path: '/admin' },
  { label: 'Annonces', icon: 'format_list_bulleted', active: false, path: '/admin' },
  { label: 'Analyses', icon: 'bar_chart', active: true, path: '/admin/analytics' },
  { label: 'Profil', icon: 'person', active: false, path: '/mon-profil' }
];
</script>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }

@keyframes dash {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}
.animate-dash { animation: dash 1s ease-out forwards; }
</style>
