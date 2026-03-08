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
      <h1 class="text-lg font-bold text-primary dark:text-slate-100">Connexion</h1>
      <div class="w-10"></div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 max-w-md mx-auto w-full">
      <div class="space-y-8 pt-4">
        <!-- Logo / Brand Header -->
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/30 rotate-3">
            <span class="material-symbols-outlined text-white text-5xl font-bold">corporate_fare</span>
          </div>
          <h2 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Bon retour !</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-3 text-center leading-relaxed">Connectez-vous pour accéder à vos favoris, messages et annonces.</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3">
          <span class="material-symbols-outlined text-xl">error</span>
          {{ error }}
        </div>

        <!-- Login Form -->
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">E-mail ou Utilisateur</label>
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
              <input 
                v-model="form.email" 
                required 
                type="email" 
                class="w-full h-14 pl-12 pr-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-semibold shadow-sm" 
                placeholder="Ex: mamadou@email.com" 
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center px-1">
              <label class="text-xs font-black uppercase tracking-widest text-slate-500">Mot de passe</label>
              <a href="#" class="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Oublié ?</a>
            </div>
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
              <input 
                v-model="form.password" 
                required 
                :type="showPassword ? 'text' : 'password'" 
                class="w-full h-14 pl-12 pr-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-semibold shadow-sm" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <div class="pt-6">
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full h-16 bg-primary hover:bg-primary/95 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <div v-if="isLoading" class="animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></div>
              {{ isLoading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-4 py-4">
          <div class="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">ou</span>
          <div class="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 h-14 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-sm active:scale-95">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" class="w-5 h-5" alt="Google">
            <span class="text-xs font-black uppercase tracking-widest">Google</span>
          </button>
          <button class="flex items-center justify-center gap-2 h-14 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-sm active:scale-95">
             <span class="material-symbols-outlined text-xl">apple</span>
            <span class="text-xs font-black uppercase tracking-widest">Apple</span>
          </button>
        </div>

        <div class="pt-10 text-center">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-bold">
            Pas encore de compte ? 
            <router-link to="/register" class="text-primary ml-1 font-black hover:underline">S'inscrire</router-link>
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
const showPassword = ref(false);

const form = reactive({
  email: '',
  password: ''
});

onMounted(() => {
  authStore.clearError();
});

const handleSubmit = async () => {
  error.value = null;
  isLoading.value = true;
  
  try {
    const { email, password } = form;
    const result = await authStore.login({ email, password });
    
    if (result.success) {
      router.push('/');
    } else {
      error.value = result.error || 'Identifiants incorrects';
    }
  } catch (err) {
    error.value = 'Une erreur est survenue';
    console.error('Login error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>
