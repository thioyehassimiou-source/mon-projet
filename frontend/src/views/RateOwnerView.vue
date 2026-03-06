<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
    <div class="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-x-hidden">
      <!-- Header -->
      <div class="flex items-center bg-white dark:bg-slate-900 p-5 border-b border-primary/5 dark:border-slate-800 sticky top-0 z-10 backdrop-blur-xl">
        <button @click="$router.back()" class="text-primary dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/5 active:scale-90 transition-all">
          <span class="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h2 class="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight flex-1 text-center pr-10">Noter le propriétaire</h2>
      </div>

      <div class="flex flex-col gap-8 p-8 pb-32">
        <!-- Profile Section -->
        <div class="flex flex-col items-center gap-6">
          <div class="relative group">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 border-4 border-primary/10 shadow-xl overflow-hidden ring-4 ring-primary/5">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBszdwW4pMXNX35j3NatQzzmYi5Z6xVPPo4MVL0V77nw6cd0eis1TKCRjH_lJTjQmZDjjyLOhea6YBEl9YqrNO7b2onh4pb2KDi_wv4ogIPyJLxSjkMenfIa7sVCsqYi5lCunSqJzGjuZqo5pbWnOe39Rb-ANdwubRV-F5ltM8MIeFhLHXcRiuXX67JRB-BHaXxy6pSvFCl3m7cpna_N7pv8qpm1Mu8na5gSw2XnmIinkyDUn8fVxEWq8_6u4O8z1Brq6QIFr0W1-C" alt="Owner" class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"/>
            </div>
            <div class="absolute bottom-1 right-1 bg-emerald-500 h-7 w-7 rounded-full border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
               <span class="material-symbols-outlined text-white text-[14px]">check</span>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center text-center">
            <p class="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tighter">Mamadou Diallo</p>
            <p class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Propriétaire • Annonce <span class="text-primary">#GL-9921</span></p>
          </div>
        </div>

        <!-- Main Rating -->
        <div class="bg-primary/5 dark:bg-primary/10 rounded-[2rem] p-8 flex flex-col items-center gap-4 border border-primary/5">
          <h4 class="text-primary dark:text-primary-light text-[10px] font-black uppercase tracking-[0.2em]">Note globale</h4>
          <div class="flex gap-2">
            <button 
              v-for="star in 5" 
              :key="star" 
              @click="setGlobalRating(star)"
              class="transition-all active:scale-125 hover:scale-110"
            >
              <span 
                class="material-symbols-outlined text-5xl"
                :class="star <= globalRating ? 'text-amber-400 fill-1' : 'text-slate-200 dark:text-slate-700'"
              >
                star
              </span>
            </button>
          </div>
          <p class="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">Appuyez pour noter</p>
        </div>

        <!-- Detailed Categories -->
        <div class="flex flex-col gap-8">
          <h3 class="text-slate-900 dark:text-white text-lg font-black tracking-tight flex items-center gap-3">
            <div class="w-2 h-6 bg-primary rounded-full"></div>
            Critères détaillés
          </h3>
          
          <div v-for="criterion in criteria" :key="criterion.id" class="flex flex-col gap-3 group">
            <div class="flex justify-between items-center">
              <label class="text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest">{{ criterion.label }}</label>
              <span class="text-primary dark:text-primary-light font-black text-sm tracking-tighter bg-primary/5 dark:bg-primary/20 px-3 py-1 rounded-lg border border-primary/5">{{ criterion.value }}/5</span>
            </div>
            <div class="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
              <input 
                type="range" 
                min="1" 
                max="5" 
                v-model="criterion.value"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                class="h-full bg-primary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(26,53,91,0.2)]" 
                :style="{ width: (criterion.value * 20) + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Review Text Area -->
        <div class="flex flex-col gap-4">
          <label class="text-slate-900 dark:text-white text-lg font-black tracking-tight flex items-center gap-3" for="review">
            <div class="w-2 h-6 bg-primary rounded-full"></div>
            Votre expérience
          </label>
          <div class="relative group">
            <textarea 
              v-model="reviewText"
              class="w-full rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:border-primary/20 focus:ring-0 placeholder:text-slate-400 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest font-bold text-sm p-6 transition-all min-h-[160px] resize-none shadow-inner" 
              id="review" 
              placeholder="Décrivez votre séjour et la qualité de l'accueil..."
            ></textarea>
            <div class="absolute bottom-4 right-4 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
              {{ reviewText.length }} caractères
            </div>
          </div>
        </div>

        <!-- Submit Section -->
        <div class="space-y-6">
          <button 
            @click="submitReview"
            :disabled="globalRating === 0"
            class="w-full bg-primary hover:bg-primary/95 text-white font-black py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-primary/20 hover:translate-y-[-2px] active:translate-y-[2px] disabled:opacity-50 disabled:translate-y-0"
          >
            <span class="material-symbols-outlined text-2xl font-light">send</span>
            <span class="text-xs uppercase tracking-[0.2em] pt-0.5">Publier l'avis</span>
          </button>
          
          <div class="flex items-start gap-3 p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
            <span class="material-symbols-outlined text-amber-500 text-lg">info</span>
            <p class="text-slate-500 dark:text-slate-400 text-[10px] font-bold leading-relaxed">
              Votre avis sera examiné par l'équipe de modération pour garantir une expérience constructive et respectueuse pour tous.
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Navigation Mobile Placeholder -->
      <div class="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
    </div>

    <!-- Success Feedback Overlay -->
    <Transition name="fade">
      <div v-if="submitted" class="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-primary/95 backdrop-blur-xl">
        <div class="flex flex-col items-center text-center gap-8">
          <div class="size-24 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <span class="material-symbols-outlined text-5xl text-primary font-black">check_circle</span>
          </div>
          <div class="space-y-3">
            <h2 class="text-white text-3xl font-black tracking-tighter">Merci pour votre avis !</h2>
            <p class="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Votre contribution aide la communauté</p>
          </div>
          <button @click="$router.push('/')" class="mt-4 bg-white text-primary px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
            Retour à l'accueil
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const globalRating = ref(0);
const reviewText = ref('');
const submitted = ref(false);

const criteria = ref([
  { id: 'comm', label: 'Communication', value: 4 },
  { id: 'clean', label: 'Propreté', value: 5 },
  { id: 'acc', label: 'Conformité', value: 4 }
]);

const setGlobalRating = (val) => {
  globalRating.value = val;
};

const submitReview = () => {
  if (globalRating.value === 0) return;
  submitted.value = true;
};
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  border: 4px solid #1a355b;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  border: 4px solid #1a355b;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: pointer;
}
</style>
