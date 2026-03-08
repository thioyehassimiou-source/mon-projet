<template>
  <div class="h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors overflow-x-hidden flex flex-col">
    
    <!-- 1. Header Section -->
    <!-- Desktop Header (lg+) -->
    <header class="hidden lg:flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 sticky top-0 z-50">
      <div class="flex items-center gap-8">
        <div @click="$router.push('/')" class="flex items-center gap-3 text-primary cursor-pointer">
          <div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span class="material-symbols-outlined">apartment</span>
          </div>
          <h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">GuinéeLogement</h2>
        </div>
        <div class="flex items-center gap-6">
          <router-link to="/mon-profil" class="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Tableau de bord</router-link>
          <router-link to="/listings" class="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Propriétés</router-link>
          <router-link to="/paiements" class="text-primary text-sm font-bold border-b-2 border-primary py-1">Transactions</router-link>
          <router-link to="/messages" class="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Messages</router-link>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <label class="flex flex-col min-w-40 h-10 max-w-64">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div class="text-slate-500 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
              <span class="material-symbols-outlined text-xl">search</span>
            </div>
            <input v-model="searchQuery" class="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 focus:ring-0 h-full placeholder:text-slate-500 px-4 rounded-r-lg text-sm" placeholder="Rechercher..." />
          </div>
        </label>
        <button @click="$router.push('/mon-profil')" class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90">
          <span class="material-symbols-outlined mr-2">person</span>
          <span class="truncate">Mon Profil</span>
        </button>
      </div>
    </header>

    <!-- Mobile Header (<lg) -->
    <header class="lg:hidden flex items-center bg-white dark:bg-slate-900 p-4 sticky top-0 z-[60] border-b border-slate-100 dark:border-slate-800 justify-between">
      <button @click="$router.push('/mon-profil')" class="text-primary dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
        <span class="material-symbols-outlined font-black">arrow_back</span>
      </button>
      <h2 class="text-slate-900 dark:text-slate-100 text-lg font-black tracking-tight flex-1 text-center">Paiements</h2>
      <button class="flex size-10 items-center justify-end rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
        <span class="material-symbols-outlined font-bold text-slate-700 dark:text-slate-300">notifications</span>
      </button>
    </header>

    <main class="flex-1 overflow-y-auto pb-32 lg:pb-10 bg-background-light dark:bg-background-dark">
      <div class="max-w-[1280px] w-full mx-auto md:px-10 lg:py-8 space-y-6 md:space-y-8">
        
        <!-- Mobile-Only Quick Stats Hero Adaptation -->
        <div class="lg:hidden flex flex-wrap gap-4 p-4 mt-2">
          <div class="flex min-w-[140px] flex-1 flex-col gap-3 rounded-[2rem] p-6 bg-primary text-white shadow-xl shadow-primary/20 transition-transform active:scale-95">
            <p class="text-white/60 text-[10px] font-black uppercase tracking-widest">Total Payé</p>
            <p class="text-white tracking-tight text-xl font-black">{{ stats.totalPaid.toLocaleString() }} <span class="text-[10px] opacity-70">GNF</span></p>
            <div class="flex items-center gap-1.5 text-emerald-300 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-2 py-1 rounded-lg">
              <span class="material-symbols-outlined text-[12px] font-black">trending_up</span>
              <span>+5%</span>
            </div>
          </div>
          <div class="flex min-w-[140px] flex-1 flex-col gap-3 rounded-[2rem] p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform active:scale-95">
            <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Reçu</p>
            <p class="text-slate-900 dark:text-slate-100 tracking-tight text-xl font-black">1.200.000 <span class="text-[10px] opacity-70">GNF</span></p>
            <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-lg">
              <span class="material-symbols-outlined text-[12px] font-black">trending_up</span>
              <span>+12%</span>
            </div>
          </div>
        </div>

        <!-- Desktop-Only Header Logic -->
        <div class="hidden lg:flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 sm:px-0">
          <div class="flex flex-col gap-1">
            <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Gestion des Paiements</h1>
            <p class="text-slate-500 dark:text-slate-400 text-base">Consultez votre historique et autorisez vos nouveaux loyers.</p>
          </div>
          <button class="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <span class="material-symbols-outlined">verified_user</span>
            <span>Autoriser Paiement</span>
          </button>
        </div>

        <!-- Desktop Summary Cards (hidden on mobile context) -->
        <div class="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-primary/10">
            <div class="flex items-center justify-between">
              <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Payé (Cumul)</p>
              <span class="material-symbols-outlined text-primary">account_balance_wallet</span>
            </div>
            <div class="flex flex-col">
              <p class="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight">{{ stats.totalPaid.toLocaleString() }} <span class="text-xs">GNF</span></p>
              <p class="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold mt-2 flex items-center gap-1 uppercase tracking-widest">
                <span class="material-symbols-outlined text-xs">trending_up</span>
                <span>+5.2% vs l'année dernière</span>
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
             <!-- Same as above but for next rent -->
             <div class="flex items-center justify-between">
              <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Loyer en attente</p>
              <span class="material-symbols-outlined text-amber-500">pending_actions</span>
            </div>
            <div class="flex flex-col">
              <p class="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight">{{ stats.nextRent.toLocaleString() }} <span class="text-xs">GNF</span></p>
              <p class="text-slate-400 text-[10px] font-bold mt-2 uppercase tracking-widest">Échéance dans 5 jours</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
             <div class="flex items-center justify-between">
              <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Prochain Prélèvement</p>
              <span class="material-symbols-outlined text-primary">calendar_today</span>
            </div>
            <div class="flex flex-col">
              <p class="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight">01/04/2026</p>
              <p class="text-rose-500 text-[10px] font-bold mt-2 uppercase tracking-widest">Action requise bientôt</p>
            </div>
          </div>
        </div>

        <!-- 2. Mobile-Only Quick Actions -->
        <div class="lg:hidden px-4 py-2">
          <h3 class="text-slate-900 dark:text-slate-100 text-sm font-black uppercase tracking-widest mb-4 px-1 opacity-60">Actions Rapides</h3>
          <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <button class="flex flex-col items-center justify-center min-w-[110px] aspect-square rounded-[2rem] bg-primary/10 dark:bg-primary/20 text-primary dark:text-slate-100 border border-primary/10 transition-all active:scale-90 shadow-sm">
              <span class="material-symbols-outlined mb-2 text-3xl font-light">payments</span>
              <span class="text-[10px] font-black uppercase tracking-widest">Payer Loyer</span>
            </button>
            <button class="flex flex-col items-center justify-center min-w-[110px] aspect-square rounded-[2rem] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 transition-all active:scale-90 shadow-sm">
              <span class="material-symbols-outlined mb-2 text-3xl font-light">receipt_long</span>
              <span class="text-[10px] font-black uppercase tracking-widest">Reçus</span>
            </button>
            <button class="flex flex-col items-center justify-center min-w-[110px] aspect-square rounded-[2rem] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 transition-all active:scale-90 shadow-sm">
              <span class="material-symbols-outlined mb-2 text-3xl font-light">account_balance_wallet</span>
              <span class="text-[10px] font-black uppercase tracking-widest">Méthodes</span>
            </button>
          </div>
        </div>

        <!-- 3. Desktop Body Layout (History + Sidebar) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-0">
          
          <!-- Desktop Transactions Table (lg+) -->
          <div class="hidden lg:flex col-span-2 flex-col gap-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <h3 class="text-slate-900 dark:text-slate-100 text-lg font-black tracking-tight uppercase tracking-widest">Historique Complet</h3>
              <button class="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Exporter PDF</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 dark:bg-slate-800/50">
                    <th class="px-8 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Date</th>
                    <th class="px-8 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Propriété</th>
                    <th class="px-8 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">Montant (GNF)</th>
                    <th class="px-8 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">Statut</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                  <tr v-if="isLoading" v-for="i in 5" :key="i" class="animate-pulse">
                    <td colspan="4" class="px-8 py-4 h-16 bg-slate-50/20 dark:bg-slate-800/10"></td>
                  </tr>
                  <tr v-else v-for="tx in transactions" :key="tx.id" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td class="px-8 py-5 text-sm font-bold text-slate-400">{{ tx.date }}</td>
                    <td class="px-8 py-5 text-sm font-black">{{ tx.title }}</td>
                    <td class="px-8 py-5 text-sm font-black text-right" :class="tx.amount.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'">{{ tx.amount }}</td>
                    <td class="px-8 py-5 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" :class="getStatusClass(tx.status)">
                        {{ tx.statusLabel }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile-Specific Transaction List (<lg) -->
          <div class="lg:hidden space-y-4">
            <div class="flex items-center justify-between mb-4 px-1">
              <h3 class="text-slate-900 dark:text-slate-100 text-sm font-black uppercase tracking-widest opacity-60">Transactions Récentes</h3>
              <button class="text-primary dark:text-slate-300 text-xs font-black uppercase tracking-widest">Tout voir</button>
            </div>
            <div class="space-y-3">
              <div v-if="isLoading" v-for="i in 4" :key="i" class="h-20 bg-white dark:bg-slate-900 rounded-[2rem] animate-pulse"></div>
              <div v-else v-for="tx in transactions" :key="tx.id" class="flex items-center gap-4 p-4 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform">
                <div :class="[
                  'size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border',
                  tx.amount.startsWith('-') 
                    ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 border-rose-100 dark:border-rose-900/50' 
                    : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 border-emerald-100 dark:border-emerald-900/50'
                ]">
                  <span class="material-symbols-outlined text-2xl font-black">
                    {{ tx.amount.startsWith('-') ? 'arrow_downward' : 'arrow_upward' }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-black tracking-tight text-slate-900 dark:text-white truncate">{{ tx.title }}</p>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{{ tx.date }} • Mobile Money</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-black" :class="tx.amount.startsWith('-') ? 'text-slate-900 dark:text-white' : 'text-emerald-500'">{{ tx.amount }}</p>
                  <p class="text-[9px] font-black uppercase tracking-widest mt-1" :class="getStatusClass(tx.status, 'text')">{{ tx.statusLabel }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar (Payment Methods + CTA) -->
          <div class="flex flex-col gap-8">
            <!-- Cards List -->
            <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex flex-col gap-6 transition-all hover:border-primary/10">
              <div class="flex items-center justify-between">
                <h3 class="text-slate-900 dark:text-slate-100 font-black tracking-tight uppercase tracking-widest text-sm">Moyens de Paiement</h3>
                <button class="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">+ Ajouter</button>
              </div>
              
              <!-- Credit Card UI -->
              <div class="flex flex-col gap-6">
                <div class="relative w-full aspect-[1.58/1] bg-gradient-to-br from-primary via-primary/95 to-slate-900 rounded-[2.2rem] p-7 text-white flex flex-col justify-between overflow-hidden shadow-2xl shadow-primary/30 active:scale-95 transition-transform group">
                  <div class="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <div class="flex justify-between items-start relative z-10">
                    <span class="material-symbols-outlined text-4xl font-light opacity-80">contactless</span>
                    <div class="px-3 py-1.5 bg-white/20 rounded-xl backdrop-blur-md border border-white/20 text-[10px] font-black tracking-widest">VISA</div>
                  </div>
                  <div class="flex flex-col gap-1.5 relative z-10">
                    <p class="text-[10px] text-white/50 font-black uppercase tracking-widest">Numéro de carte</p>
                    <p class="text-2xl font-black tracking-[0.25em] drop-shadow-lg">•••• •••• •••• 4242</p>
                  </div>
                  <div class="flex justify-between items-end relative z-10 pt-2">
                    <div class="flex flex-col">
                      <p class="text-[9px] text-white/40 uppercase font-black tracking-widest">Titulaire</p>
                      <p class="text-sm font-black uppercase tracking-tight">{{ user?.name || 'Propriétaire' }}</p>
                    </div>
                    <div class="flex flex-col items-end">
                      <p class="text-[9px] text-white/40 uppercase font-black tracking-widest">Expire</p>
                      <p class="text-sm font-black">12/25</p>
                    </div>
                  </div>
                </div>

                <!-- Mobile Money Option -->
                <div class="flex items-center justify-between p-5 rounded-[1.8rem] border border-slate-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer transition-all active:scale-[0.98]">
                  <div class="flex items-center gap-4">
                    <div class="size-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 shadow-inner">
                      <span class="material-symbols-outlined text-2xl font-black">smartphone</span>
                    </div>
                    <div>
                      <p class="text-base font-black tracking-tight">Orange Money</p>
                      <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">+224 620 •• •• ••</p>
                    </div>
                  </div>
                  <div class="size-7 rounded-full border-[3px] border-primary flex items-center justify-center p-1.5 shadow-sm">
                    <div class="size-full rounded-full bg-primary animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Authorization CTA -->
            <div class="bg-primary/5 dark:bg-primary/10 rounded-[2.5rem] border border-primary/10 p-8 flex flex-col gap-6 transition-all hover:bg-primary/[0.08]">
              <div class="flex items-start gap-4">
                <div class="size-12 rounded-[1.2rem] bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <span class="material-symbols-outlined text-2xl font-black">shield_with_heart</span>
                </div>
                <div class="flex flex-col gap-2 pt-1">
                  <p class="text-base font-black tracking-tight text-slate-900 dark:text-slate-100">Prélèvement Automatique</p>
                  <p class="text-xs text-slate-500 font-bold leading-relaxed">Activez le prélèvement pour vos échéances de loyer.</p>
                </div>
              </div>
              <button class="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5 active:scale-95">
                Activer maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Desktop Footer (lg+) -->
    <footer class="hidden lg:block border-t border-slate-100 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 px-10">
      <div class="max-w-[1280px] mx-auto flex justify-between items-center text-slate-400">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-sm font-black">copyright</span>
          <span class="text-[10px] font-black uppercase tracking-widest">2026 GuinéeLogement Immo. Tous droits réservés.</span>
        </div>
        <div class="flex gap-8">
          <a class="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors" href="#">Conditions</a>
          <a class="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors" href="#">Support</a>
          <a class="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors" href="#">Sécurité</a>
        </div>
      </div>
    </footer>

    <!-- Mobile Bottom Navigation (<lg) -->
    <BottomNav class="lg:hidden" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { paymentService } from '@/services/api-fetch';
import BottomNav from '@/components/BottomNav.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const transactions = ref([]);
const stats = ref({ totalPaid: 0, nextRent: 2500000 });
const isLoading = ref(true);
const searchQuery = ref('');
const screenWidth = ref(window.innerWidth);

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener('resize', updateWidth);
  try {
    const history = await paymentService.getHistory();
    transactions.value = history.map(tx => ({
      id: tx.id,
      title: tx.statut === 'reussi' ? `Loyer - Logement #${tx.id_logement}` : `Transaction #${tx.id}`,
      date: new Date(tx.date_paiement).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: (tx.statut === 'echoue' ? '' : '-') + new Intl.NumberFormat('fr-GN').format(tx.montant_total),
      status: tx.statut,
      statusLabel: tx.statut === 'reussi' ? 'Réussi' : tx.statut === 'en_attente' ? 'En cours' : 'Échoué',
      icon: 'payments'
    }));

    stats.value.totalPaid = history.reduce((sum, tx) => sum + parseFloat(tx.montant_total), 0);
  } catch (error) {
    console.error("Erreur paiements:", error);
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const getStatusClass = (status, type = 'badge') => {
  if (type === 'text') {
    switch (status) {
      case 'reussi': return 'text-emerald-600';
      case 'en_attente': return 'text-amber-600';
      case 'echoue': return 'text-rose-600';
      default: return 'text-slate-500';
    }
  }
  
  switch (status) {
    case 'reussi': return 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    case 'en_attente': return 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    case 'echoue': return 'bg-rose-100/50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
    default: return 'bg-slate-100 text-slate-600';
  }
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.form-input { outline: none; }
</style>
