<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
      <div class="size-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="material-symbols-outlined text-6xl">cancel</span>
      </div>
      <h1 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Paiement Annulé</h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        La transaction a été interrompue ou a échoué. Aucun montant n'a été débité de votre compte.
      </p>
      
      <div class="space-y-4">
        <button 
          @click="$router.back()" 
          class="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Réessayer
        </button>
        <router-link 
          to="/" 
          class="block w-full py-4 bg-slate-100 dark:bg-neutral-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-neutral-600 transition-all"
        >
          Retour à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
