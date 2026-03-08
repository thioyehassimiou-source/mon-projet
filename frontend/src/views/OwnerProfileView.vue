<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-4 text-primary group cursor-pointer" @click="$router.push('/')">
            <div class="size-10 bg-primary text-white flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined font-black">shield_with_house</span>
            </div>
            <h2 class="text-slate-900 dark:text-slate-100 text-lg font-black leading-tight tracking-tight">GuinéeLogement</h2>
          </div>
          
          <div class="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2 border border-slate-200 dark:border-slate-700 w-96 group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
            <span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input class="bg-transparent border-none focus:ring-0 text-sm font-medium w-full px-3 placeholder:text-slate-400" placeholder="Rechercher une ville, un quartier..." type="text"/>
          </div>
        </div>

        <nav class="hidden md:flex items-center gap-10">
          <a v-for="link in navLinks" :key="link.label" href="#" class="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">{{ link.label }}</a>
          <div class="flex items-center gap-4 ml-4">
            <button class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 hover:text-primary transition-all active:scale-95">
              <span class="material-symbols-outlined">notifications</span>
            </button>
            <div class="size-10 rounded-full border-2 border-primary/20 bg-slate-200 overflow-hidden shadow-md">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrbNf32wiu9f2tLul0jjPO1OCTySCIKu4Q0PMcteeU_ZaceTnqmF4fKZum6B5-NvqOy95ydX7jpr6H5QKY83TATeFXCdImj6d7ZfCCbyQG9X4Sgb54IvJJQYpN1JfNmHauw-emv2VkEmnTPkh1Gx-WeX7xAMzFRihh9lKTkNa5YJuAi4W-8Wp343IJggiFTKIaQbJu3Birz-3LBtMf-LlmBR-O0Qd9pMNWDVKtcEpwqHotNd2XuyP9RIhI6VK0KE5uRFm8UrrHVxVf" alt="Profile" class="w-full h-full object-cover"/>
            </div>
          </div>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button class="md:hidden size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500">
          <span class="material-symbols-outlined font-black">menu</span>
        </button>
      </div>
    </header>

    <main class="flex-1 max-w-[1440px] mx-auto w-full px-6 py-10">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        <a class="hover:text-primary transition-colors" href="#" @click.prevent="$router.push('/')">Accueil</a>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        <span class="hover:text-primary transition-colors cursor-pointer">Propriétaires</span>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        <span class="text-primary dark:text-slate-100">{{ owner?.name || 'Propriétaire' }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Sidebar -->
        <aside class="lg:col-span-4 flex flex-col gap-8">
          <div class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-primary/5 transition-all">
            <div class="flex flex-col items-center text-center">
              <div class="relative mb-8 group">
                <div class="size-40 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden ring-4 ring-primary/5">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBoIBT5bOvu9XEPBD-1gyEsy-KFXjUsZio0Z1o0aXgvAuePuQIP49rD8Xs6CN_SxckFTrPU2PHmiX7_IXHmJfXSUqJ2RA6ehgghgeUXatqweW8-JawVPAUN4nWS5SaDYQfjLL-6hjnEefZMWp1FSpHO73aVi-I9-15CTQS6q2PmfrdDh0wl_lD8P4D4iPEXpKM1oAm6PStKXvnN_qij989CzkblGzxQy-PVz9XUVPq7UXjg-UP8Vc43yxYXd4aCIqLIZwNaupeLjxC" alt="Owner" class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"/>
                </div>
                <div class="absolute bottom-2 right-2 size-10 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl">
                  <span class="material-symbols-outlined text-xl">verified</span>
                </div>
              </div>
              <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{{ owner?.name || 'Propriétaire' }}</h1>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-3 font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-lg">location_on</span>
                Hôte à Conakry, Guinée
              </p>
              
              <div class="mt-8 flex flex-wrap justify-center gap-3">
                <div class="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/30">
                  <span class="material-symbols-outlined text-base">verified_user</span>
                  Vérifié
                </div>
                <div class="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/30">
                  <span class="material-symbols-outlined text-base">bolt</span>
                  Réponse rapide
                </div>
              </div>
            </div>

            <div class="mt-10 space-y-5 border-t border-slate-50 dark:border-slate-800 pt-10">
              <div class="flex justify-between items-center group">
                <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Membre depuis</span>
                <span class="text-sm font-black text-slate-900 dark:text-white">Mars 2022</span>
              </div>
              <div class="flex justify-between items-center group">
                <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Taux de réponse</span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500" style="width: 98%"></div>
                  </div>
                  <span class="text-sm font-black text-emerald-600">98%</span>
                </div>
              </div>
              <div class="flex justify-between items-center group">
                <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Annonces actives</span>
                <span class="text-sm font-black text-primary">12 propriétés</span>
              </div>
            </div>

            <div class="mt-10 flex flex-col gap-4">
              <button @click="contactOwner" class="w-full bg-primary hover:bg-primary/95 text-white py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                <span class="material-symbols-outlined text-xl">mail</span>
                Contacter le propriétaire
              </button>
              <button class="w-full border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98]">
                Partager le profil
              </button>
            </div>
          </div>

          <!-- Verified Badges -->
          <div class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-primary/5">
            <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-8">Informations vérifiées</h3>
            <ul class="space-y-6">
              <li v-for="check in verifications" :key="check" class="flex items-center gap-5 text-sm font-bold text-slate-600 dark:text-slate-400 group">
                <div class="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/30 group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-xl">check_circle</span>
                </div>
                <span class="tracking-tight">{{ check }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main Section -->
        <section class="lg:col-span-8 flex flex-col gap-10 pb-20">
          <!-- Ratings Summary -->
          <div class="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-primary/5">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-10">Avis et Évaluations</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="flex flex-col items-center justify-center p-10 bg-slate-50/50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
                <div class="text-6xl font-black text-primary tracking-tighter mb-4">4.8</div>
                <div class="flex gap-1 text-amber-400 mb-4 scale-125">
                  <span v-for="i in 4" :key="i" class="material-symbols-outlined fill-1">star</span>
                  <span class="material-symbols-outlined fill-1">star_half</span>
                </div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Basé sur 42 avis récents</p>
              </div>

              <div class="flex flex-col justify-center space-y-4">
                <div v-for="rate in ratingDistribution" :key="rate.stars" class="flex items-center gap-5 group">
                  <span class="text-[11px] font-black text-slate-400 w-4">{{ rate.stars }}</span>
                  <div class="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                    <div class="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(26,53,91,0.2)]" :style="{ width: rate.percent + '%' }"></div>
                  </div>
                  <span class="text-[10px] font-black text-slate-600 dark:text-slate-400 w-10 text-right">{{ rate.percent }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Filter -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <h3 class="text-xl font-black tracking-tight self-start">Avis des locataires</h3>
            <div class="flex items-center gap-5 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full md:w-auto">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trier par :</label>
              <select class="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-primary focus:ring-0 cursor-pointer outline-none">
                <option>Plus récents</option>
                <option>Mieux notés</option>
                <option>Moins bien notés</option>
              </select>
            </div>
          </div>

          <!-- Reviews List -->
          <div class="space-y-8">
            <div v-for="review in reviews" :key="review.id" class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-primary/5 shadow-xl shadow-primary/5 hover:translate-y-[-4px] transition-all group">
              <div class="flex justify-between items-start mb-8">
                <div class="flex gap-5">
                  <div class="size-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 group-hover:scale-105 transition-transform">
                    <img :src="review.avatar" :alt="review.name" class="w-full h-full object-cover"/>
                  </div>
                  <div class="flex flex-col justify-center">
                    <h4 class="text-base font-black text-slate-900 dark:text-white tracking-tight">{{ review.name }}</h4>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Locataire de <span class="text-primary">{{ review.property }}</span> • {{ review.date }}</p>
                  </div>
                </div>
                <div class="flex text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <span v-for="s in review.rating" :key="s" class="material-symbols-outlined text-lg fill-1">star</span>
                </div>
              </div>
              <p class="text-slate-600 dark:text-slate-300 font-medium leading-relaxed tracking-tight text-base italic break-words">
                "{{ review.text }}"
              </p>
              <div class="mt-8 flex items-center justify-between">
                <button class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-lg">thumb_up</span>
                  Utile (12)
                </button>
                <button class="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                   Répondre
                   <span class="material-symbols-outlined text-sm">reply</span>
                </button>
              </div>
            </div>

            <div class="flex justify-center pt-8">
              <button class="group flex items-center gap-4 bg-white dark:bg-slate-800 px-10 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] text-primary border border-primary/5 hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5 active:scale-95">
                Voir plus d'avis
                <span class="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-20 mt-20">
      <div class="max-w-[1440px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-3 text-primary mb-6">
            <div class="size-8 bg-primary text-white flex items-center justify-center rounded-lg">
              <span class="material-symbols-outlined text-lg font-black">shield_with_house</span>
            </div>
            <h2 class="text-xl font-black tracking-tighter">GuinéeLogement</h2>
          </div>
          <p class="text-slate-500 text-sm font-medium leading-relaxed">
            Votre partenaire de confiance pour trouver le logement idéal partout en Guinée. Sécurité, transparence et confort garantis.
          </p>
        </div>
        
        <div v-for="group in footerLinks" :key="group.title">
          <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">{{ group.title }}</h4>
          <ul class="space-y-4">
            <li v-for="link in group.links" :key="link">
              <a href="#" class="text-slate-500 hover:text-primary transition-colors text-sm font-bold tracking-tight">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div>
           <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">Newsletter</h4>
           <div class="flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 h-14 p-1">
             <input type="email" placeholder="Email" class="bg-transparent border-none focus:ring-0 flex-1 px-4 text-sm font-medium"/>
             <button class="bg-primary text-white px-6 rounded-xl hover:bg-primary/95 transition-all active:scale-95">
               <span class="material-symbols-outlined">send</span>
             </button>
           </div>
        </div>
      </div>
      <div class="max-w-[1440px] mx-auto px-10 mt-20 pt-10 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2024 GuinéeLogement • Tous droits réservés</p>
        <div class="flex gap-8">
           <a v-for="social in socialLinks" :key="social" href="#" class="text-slate-400 hover:text-primary transition-all">
             <span class="material-symbols-outlined text-xl">{{ social }}</span>
           </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { userService, listingService, messageService } from '@/services/api-fetch';

const route = useRoute();
const owner = ref(null);
const ownerListings = ref([]);
const loading = ref(true);

const navLinks = [
  { label: 'Locations', path: '/search' },
  { label: 'Vendre', path: '/creer-annonce' },
  { label: 'Mes Favoris', path: '/favoris' },
  { label: 'Aide', path: '/aide' }
];

const verifications = ref([
  'Identité confirmée',
  'Adresse email vérifiée',
  'Numéro de téléphone'
]);

const ratingDistribution = [
  { stars: 5, percent: 90 },
  { stars: 4, percent: 8 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 0 },
  { stars: 1, percent: 0 }
];

const reviews = ref([]);

onMounted(async () => {
  const ownerId = route.params.id;
  if (!ownerId) return;

  try {
    // 1. Charger les infos du proprio
    const userData = await userService.getById(ownerId);
    owner.value = userData;

    if (userData.is_verified) {
      verifications.value.push('Documents de propriété');
    }

    // 2. Charger les annonces du proprio (filtrées par son ID)
    const allListings = await listingService.getAll({ owner_id: ownerId });
    ownerListings.value = allListings;

    // 3. Mock des reviews pour la V1 (pas encore de table reviews)
    reviews.value = [
      {
        id: 1,
        name: 'Client GuineaLogement',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        property: allListings[0]?.titre || 'Logement',
        date: 'Récemment',
        rating: 5,
        text: 'Très professionnel et réactif.'
      }
    ];
  } catch (err) {
    console.error("Erreur chargement profil propriétaire:", err);
  } finally {
    loading.value = false;
  }
});

const contactOwner = () => {
  if (owner.value) {
    messageService.startConversation(owner.value.id);
  }
};

const footerLinks = [
  { title: 'Navigation', links: ['À propos', 'Annonces', 'Prix', 'Contact'] },
  { title: 'Légal', links: ['Conditions', 'Confidentialité', 'Cookies', 'Sécurité'] }
];

const socialLinks = ['social_leaderboard', 'camera_enhance', 'alternate_email'];
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>
