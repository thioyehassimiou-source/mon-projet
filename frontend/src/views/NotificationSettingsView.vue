<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
    <!-- Top Navigation Bar -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 sticky top-0 z-50 backdrop-blur-md">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-4 text-primary dark:text-slate-100 group cursor-pointer" @click="$router.push('/')">
          <div class="size-9 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined font-black">home_work</span>
          </div>
          <h2 class="text-primary dark:text-white text-xl font-black leading-tight tracking-tighter">GuinéeLogement</h2>
        </div>
        <div class="hidden md:flex flex-col min-w-64">
          <div class="flex w-full items-stretch rounded-xl h-10 bg-slate-100 dark:bg-slate-800 border border-transparent focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
            <div class="text-slate-400 flex items-center justify-center pl-4">
              <span class="material-symbols-outlined text-xl">search</span>
            </div>
            <input class="w-full border-none bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm font-medium px-4" placeholder="Rechercher une annonce, un contrat..."/>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary border border-slate-100 dark:border-slate-700 transition-all active:scale-90">
          <span class="material-symbols-outlined text-xl">notifications</span>
        </button>
        <button class="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary border border-slate-100 dark:border-slate-700 transition-all active:scale-90">
          <span class="material-symbols-outlined text-xl">settings</span>
        </button>
        <div class="h-10 w-10 rounded-full border-2 border-primary/20 bg-slate-200 overflow-hidden shadow-md">
          <img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQntzTCfVKRJeYbfvIPDLwdt-iWhnwy8G7ruqca-82lqB0zn0M3am3UhfDOO6-XR7yzpF5G-YS_Db1AkO1Z3DbRCi_ioneyqvmftbglcDAb7GwBb5DrKu90MXazI28XJgbMLrbztgWG4wPTOGa_ER_fcMk6NVm28qZARaid06m3OuOP0nwC4NFsB8BH3UzbxJoMKiLqT43_4w7KCLI3LbbrgmM5XoB_Fjaz8HISmR3AMR06LTzMAj6VuQktVyBLbS6B-xUcUTwSj2"/>
        </div>
      </div>
    </header>

    <div class="flex flex-1 max-w-[1440px] mx-auto w-full overflow-hidden">
      <!-- Sidebar Navigation -->
      <aside class="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col gap-10 hidden lg:flex shrink-0">
        <div class="space-y-2">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Compte Utilisateur</p>
          <a v-for="item in accountLinks" :key="item.label" href="#" 
             class="flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] transition-all group"
             :class="item.active ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary'">
            <span class="material-symbols-outlined transition-colors" :class="item.active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">{{ item.icon }}</span>
            <span class="text-sm font-black tracking-tight" :class="item.active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'">{{ item.label }}</span>
          </a>
        </div>
        <div class="space-y-2">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Support & Légal</p>
          <a v-for="item in supportLinks" :key="item.label" href="#" 
             class="flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary transition-all group">
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">{{ item.icon }}</span>
            <span class="text-sm font-black tracking-tight opacity-80 group-hover:opacity-100">{{ item.label }}</span>
          </a>
        </div>
        
        <div class="mt-auto p-6 rounded-[2rem] bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex flex-col items-center text-center gap-4">
           <div class="size-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
             <span class="material-symbols-outlined text-indigo-500">verified_user</span>
           </div>
           <div>
             <p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Protection GL</p>
             <p class="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic">Vos données sont chiffrées selon les normes ISO/IEC 27001.</p>
           </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 p-10 overflow-y-auto custom-scrollbar">
        <div class="max-w-4xl mx-auto space-y-10">
          <!-- Title Section -->
          <div class="border-b border-slate-100 dark:border-slate-800 pb-10">
            <h1 class="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">Gestion des notifications</h1>
            <p class="text-slate-500 dark:text-slate-400 mt-4 text-base font-medium leading-relaxed">
              Choisissez comment et quand vous souhaitez être informé des activités critiques sur <span class="text-primary font-black italic">GuinéeLogement</span>.
            </p>
          </div>

          <!-- Config Card -->
          <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50 dark:bg-slate-800/50">
                    <th class="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800">Catégorie d'alerte</th>
                    <th v-for="channel in channels" :key="channel" class="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-center text-slate-400 border-b border-slate-100 dark:border-slate-800 w-28">{{ channel }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                  <tr v-for="pref in notificationPrefs" :key="pref.title" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                    <td class="px-8 py-8">
                      <div class="flex flex-col gap-1">
                        <span class="text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">{{ pref.title }}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ pref.desc }}</span>
                      </div>
                    </td>
                    <td v-for="channel in ['email', 'sms', 'push']" :key="channel" class="px-6 py-8 text-center">
                      <label class="relative inline-flex items-center cursor-pointer group/toggle">
                        <input type="checkbox" v-model="pref.channels[channel]" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-inner"></div>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Additional Settings -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-primary/5 shadow-xl shadow-primary/5 flex flex-col gap-6">
              <div class="flex items-center gap-4">
                <div class="size-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                  <span class="material-symbols-outlined">analytics</span>
                </div>
                <h3 class="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Fréquence des rapports</h3>
              </div>
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed">À quelle fréquence voulez-vous recevoir le résumé intelligent des nouvelles opportunités ?</p>
              <select class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-black tracking-tight focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 dark:text-slate-100 h-14 px-6 cursor-pointer">
                <option>Quotidien (Instant)</option>
                <option>Hebdomadaire (Résumé)</option>
                <option>Mensuel (Statistiques)</option>
                <option>Jamais (Silence)</option>
              </select>
            </div>
            
            <div class="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-primary/5 shadow-xl shadow-primary/5 flex flex-col gap-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="size-10 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl flex items-center justify-center">
                    <span class="material-symbols-outlined">nights_stay</span>
                  </div>
                  <h3 class="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Heures de silence</h3>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-inner"></div>
                </label>
              </div>
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed">Désactiver automatiquement les notifications Push durant la nuit pour un sommeil paisible.</p>
              <div class="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Plage active :</span>
                <span class="text-xs font-black text-primary bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-sm border border-primary/5">22:00 — 07:00</span>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100 dark:border-slate-800 pb-20">
            <button class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-rose-500 transition-colors flex items-center gap-2 group">
              <span class="material-symbols-outlined text-lg group-hover:rotate-[-90deg] transition-transform">refresh</span>
              Réinitialiser par défaut
            </button>
            <button @click="saveChanges" :class="{'opacity-50 pointer-events-none': saving}" class="bg-primary hover:bg-primary/95 text-white font-black py-5 px-10 rounded-2xl shadow-2xl shadow-primary/30 transition-all flex items-center gap-4 hover:translate-y-[-2px] active:translate-y-[2px] group">
              <span v-if="!saving" class="text-xs uppercase tracking-[0.2em] pt-0.5">Enregistrer les modifications</span>
              <span v-else class="text-xs uppercase tracking-[0.2em] pt-0.5">Synchronisation...</span>
              <span class="material-symbols-outlined text-xl transition-transform" :class="{'animate-spin': saving, 'group-hover:translate-x-1': !saving}">save</span>
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Bottom Navigation (Simulated) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-[100] backdrop-blur-xl">
       <button v-for="item in mobileNav" :key="item.icon" class="flex flex-col items-center gap-1 group">
         <span class="material-symbols-outlined text-2xl" :class="item.active ? 'text-primary fill-1' : 'text-slate-400 group-active:scale-90 transition-transform'">{{ item.icon }}</span>
         <span class="text-[9px] font-black uppercase tracking-widest" :class="item.active ? 'text-primary' : 'text-slate-400'">{{ item.label }}</span>
       </button>
    </div>

    <!-- Success Toast -->
    <Transition name="slide-up">
      <div v-if="showToast" class="fixed bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/10">
        <div class="size-10 bg-white/20 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined font-black">done_all</span>
        </div>
        <div>
          <p class="text-sm font-black leading-none">Préférences mises à jour !</p>
          <p class="text-[10px] font-bold text-white/70 mt-1 uppercase tracking-widest">Vos réglages sont désormais actifs.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const saving = ref(false);
const showToast = ref(false);

const channels = ['Email', 'SMS', 'Push'];

const notificationPrefs = ref([
  { 
    title: 'Nouvelles correspondances de biens', 
    desc: 'Alertes basées sur vos critères de recherche',
    channels: { email: true, sms: false, push: true }
  },
  { 
    title: 'Messages du chat', 
    desc: 'Nouveaux messages des propriétaires ou agences',
    channels: { email: true, sms: true, push: true }
  },
  { 
    title: 'Rappels de paiement de loyer', 
    desc: 'Notifications de facturation et d\'échéances',
    channels: { email: true, sms: true, push: true }
  },
  { 
    title: 'Signatures de contrat', 
    desc: 'Mises à jour sur l\'état de vos signatures électroniques',
    channels: { email: true, sms: false, push: true }
  },
  { 
    title: 'Offres marketing', 
    desc: 'Nouveautés, conseils et promotions exclusives',
    channels: { email: false, sms: false, push: false }
  }
]);

const accountLinks = [
  { label: 'Profil', icon: 'person', active: false },
  { label: 'Sécurité', icon: 'security', active: false },
  { label: 'Notifications', icon: 'notifications_active', active: true },
  { label: 'Paiements', icon: 'payments', active: false }
];

const supportLinks = [
  { label: 'Aide', icon: 'help_center' },
  { label: 'Conditions', icon: 'description' }
];

const mobileNav = [
  { label: 'Accueil', icon: 'home', active: false },
  { label: 'Favoris', icon: 'favorite', active: false },
  { label: 'Profil', icon: 'person', active: true },
  { label: 'Menu', icon: 'grid_view', active: false }
];

const saveChanges = () => {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    showToast.value = true;
    setTimeout(() => { showToast.value = false; }, 3000);
  }, 1500);
};
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translate(-50%, 40px); }
.slide-up-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>
