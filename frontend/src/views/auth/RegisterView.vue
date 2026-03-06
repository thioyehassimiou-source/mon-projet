<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-900 dark:text-slate-100 antialiased flex flex-col">
    <!-- Top Navigation Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <button 
        @click="$router.push('/')"
        class="flex items-center justify-center p-2 hover:bg-primary/5 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined text-primary dark:text-slate-100">arrow_back</span>
      </button>
      <h1 class="text-lg font-bold text-primary dark:text-slate-100">Inscription</h1>
      <div class="w-10"></div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 max-w-md mx-auto w-full">
      <div class="space-y-8">
        <!-- Logo / Brand Header -->
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary/20">
            <span class="material-symbols-outlined text-white text-3xl font-bold">corporate_fare</span>
          </div>
          <h2 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Créer un compte</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">Rejoignez la plus grande communauté immobilière en Guinée.</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3">
          <span class="material-symbols-outlined text-xl">error</span>
          {{ error }}
        </div>

        <!-- Register Form -->
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Prénom</label>
              <input v-model="form.first_name" required type="text" class="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all px-4 text-sm font-semibold shadow-sm" placeholder="Ex: Mamadou" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Nom</label>
              <input v-model="form.last_name" required type="text" class="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all px-4 text-sm font-semibold shadow-sm" placeholder="Ex: Sylla" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
            <input v-model="form.email" required type="email" class="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all px-4 text-sm font-semibold shadow-sm" placeholder="votre@email.com" />
          </div>

          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Téléphone</label>
            <input v-model="form.phone" type="tel" class="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all px-4 text-sm font-semibold shadow-sm" placeholder="+224 ..." />
          </div>

          <div class="space-y-4 pt-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1 block">Je suis un(e)</label>
            <div class="flex gap-2">
              <button 
                type="button"
                v-for="type in userTypes" 
                :key="type.value"
                @click="form.user_type = type.value"
                class="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all"
                :class="form.user_type === type.value ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-800 shadow-sm'"
              >
                {{ type.label }}
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Mot de passe</label>
            <input v-model="form.password" required type="password" class="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all px-4 text-sm font-semibold shadow-sm" placeholder="••••••••" />
          </div>

          <div class="flex items-start gap-3 px-1 pt-2">
            <input v-model="form.agree_terms" required type="checkbox" id="terms" class="mt-1 size-5 rounded-lg text-primary focus:ring-primary/20 border-slate-200" />
            <label for="terms" class="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-normal">
              J'accepte les <a href="#" class="text-primary hover:underline">Conditions d'Utilisation</a> et la <a href="#" class="text-primary hover:underline">Politique de Confidentialité</a>.
            </label>
          </div>

          <div class="pt-4">
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full h-16 bg-primary hover:bg-primary/95 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <div v-if="isLoading" class="animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></div>
              {{ isLoading ? 'Création...' : 'Créer mon compte' }}
            </button>
          </div>
        </form>

        <div class="pt-6 text-center">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-bold">
            Déjà un compte ? 
            <router-link to="/login" class="text-primary ml-1 hover:underline">Se connecter</router-link>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const error = ref(null);
const isLoading = ref(false);

const userTypes = [
  { label: 'Locataire', value: 'tenant' },
  { label: 'Proprio', value: 'owner' },
  { label: 'Agence', value: 'agency' }
];

const form = reactive({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  user_type: 'tenant',
  password: '',
  password_confirm: '',
  agree_terms: false
});

onMounted(() => {
  authStore.clearError();
});

const validateForm = () => {
  if (form.password.length < 8) {
    error.value = 'Le mot de passe doit faire au moins 8 caractères';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  // Mock username for backend if required
  form.username = form.email.split('@')[0] + Math.floor(Math.random() * 1000);
  form.password_confirm = form.password;

  if (!validateForm()) return;
  
  error.value = null;
  isLoading.value = true;
  
  try {
    const result = await authStore.register({ ...form });
    if (result.success) {
      router.push('/');
    } else {
      error.value = result.error || 'Erreur lors de l\'inscription';
    }
  } catch (err) {
    error.value = 'Une erreur est survenue';
    console.error('Register error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>
