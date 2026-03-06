<template>
  <div class="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 overflow-hidden">
    <!-- DESKTOP TOP NAVIGATION (Hidden on mobile) -->
    <header class="hidden md:block sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md shrink-0">
      <div class="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div class="flex items-center gap-4 group cursor-pointer" @click="$router.push('/')">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined font-black">shield_with_house</span>
          </div>
          <div>
            <h2 class="text-lg font-black leading-tight tracking-tight text-primary dark:text-slate-100">GuinéeLogement</h2>
            <p class="text-[9px] font-black text-primary/60 dark:text-slate-500 uppercase tracking-[0.2em]">Portail de Signature Sécurisé</p>
          </div>
        </div>
        
        <div class="flex items-center gap-8">
          <nav class="flex items-center gap-8">
            <a v-for="link in navLinks" :key="link.label" href="#" class="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">{{ link.label }}</a>
          </nav>
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div class="flex items-center gap-4">
            <button class="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all active:scale-90 border border-slate-100 dark:border-slate-700">
              <span class="material-symbols-outlined text-xl">notifications</span>
              <span class="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50"></span>
            </button>
            <div class="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-slate-200 shadow-md">
              <img class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVQ5SdXxagl2CMaG_1h5mX1JoQwYhgnfmQg380fht8-ITJDEajBJJRfaRlZaAxnR_xK6KvhVFHZAxK70svia-0s9XEy1Mm9_nl1JyOM5RDSveoSyxlC9XQ4F4ZHjjZBlMBCGcwb6EoIrEGYRfLzZzA-3xYf7zC-AB8grumCPThZMu2jNeZ1gpd-m84qGjlK8xyMcE0zAjVjuWJX2jcnbr2Mh2Rv4U7K6_WPmyoyLuJgHGcNcQRADuiq0078MuQhup3luR1EKIk78_F" alt="User Avatar"/>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- MOBILE HEADER (Only on mobile) -->
    <header class="md:hidden sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-primary/10 flex items-center p-4">
      <button @click="$router.back()" class="text-primary dark:text-slate-100 p-2 active:scale-90 transition-transform shrink-0">
        <span class="material-symbols-outlined font-black">arrow_back</span>
      </button>
      <h1 class="text-lg font-black leading-tight tracking-tight flex-1 text-center pr-10">Signature du Contrat</h1>
    </header>

    <!-- MAIN CONTENT -->
    <main class="mx-auto flex w-full max-w-[1440px] flex-1 gap-8 md:p-6 overflow-hidden">
      <!-- DOCUMENT COLUMN (PDF Viewer) -->
      <section class="hidden md:flex flex-1 flex-col overflow-hidden rounded-[2.5rem] border border-primary/10 bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-sm shadow-inner transition-all">
        <!-- Document Toolbar -->
        <div class="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-10 py-5">
          <div class="flex items-center gap-4">
            <div class="size-10 bg-rose-50 dark:bg-rose-900/20 text-rose-600 flex items-center justify-center rounded-xl shadow-inner">
              <span class="material-symbols-outlined text-xl">picture_as_pdf</span>
            </div>
            <div>
              <span class="text-sm font-black text-primary dark:text-slate-100 tracking-tight">CONTRAT_BAIL_RESIDENTIEL_GL892.pdf</span>
              <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Dernière version • 2.4 MB</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
              <button class="size-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all text-slate-500"><span class="material-symbols-outlined text-lg">zoom_out</span></button>
              <span class="text-[10px] font-black text-slate-400 px-3 uppercase tracking-widest">100%</span>
              <button class="size-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all text-slate-500"><span class="material-symbols-outlined text-lg">zoom_in</span></button>
            </div>
            <div class="mx-2 h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
            <button class="size-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-xl">print</span></button>
            <button class="size-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-primary"><span class="material-symbols-outlined text-xl">download</span></button>
          </div>
        </div>

        <!-- PDF Simulation View -->
        <div class="flex-1 overflow-y-auto p-12 custom-scrollbar flex justify-center bg-slate-200/50 dark:bg-slate-800/20">
          <div class="w-full max-w-3xl space-y-12 bg-white dark:bg-slate-900 p-16 shadow-2xl min-h-[1400px] relative rounded-lg border border-slate-200 dark:border-slate-800 transition-colors">
            <div class="flex justify-between border-b-2 border-slate-50 dark:border-slate-800 pb-10 mb-12">
              <div class="flex flex-col gap-2">
                <div class="h-14 w-40 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/10">
                  <span class="text-[11px] font-black text-primary tracking-[0.3em] uppercase">GuinéeLogement</span>
                </div>
              </div>
              <div class="text-right flex flex-col justify-end">
                <h3 class="text-3xl font-black text-primary dark:text-slate-100 uppercase tracking-tighter leading-none">Contrat de Bail</h3>
                <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Réf: GL-2023-0892</p>
              </div>
            </div>
            <div class="space-y-6">
              <div class="h-5 w-1/3 bg-slate-50 dark:bg-slate-800 rounded-lg"></div>
              <div class="space-y-3">
                <div class="h-3 w-full bg-slate-50/50 dark:bg-slate-800/50 rounded-full"></div>
                <div class="h-3 w-full bg-slate-50/50 dark:bg-slate-800/50 rounded-full"></div>
                <div class="h-3 w-5/6 bg-slate-50/50 dark:bg-slate-800/50 rounded-full"></div>
              </div>
            </div>
            <div class="mt-32 grid grid-cols-2 gap-20 pt-20 border-t border-slate-50 dark:border-slate-800 relative">
              <div class="flex flex-col text-center">
                <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-500 mb-12">Le Bailleur</p>
                <div class="h-24 w-full border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 flex flex-col items-center justify-center gap-1 shadow-inner">
                  <span class="material-symbols-outlined text-primary text-2xl">verified</span>
                  <span class="text-[9px] font-black text-primary uppercase tracking-widest">Signé numériquement</span>
                </div>
              </div>
              <div class="flex flex-col text-center">
                <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-500 mb-12">Le Locataire</p>
                <div class="h-24 w-full border-2 border-dashed border-primary/20 rounded-2xl bg-primary/5 dark:bg-primary/20 flex items-center justify-center relative">
                   <div v-if="signatureData" class="absolute inset-0 flex items-center justify-center p-4">
                      <img :src="signatureData" class="max-h-full object-contain filter dark:invert" alt="Signature Locataire"/>
                   </div>
                   <div v-else class="text-[11px] text-primary font-black uppercase tracking-[0.2em] animate-pulse">SIGNER ICI</div>
                </div>
              </div>
            </div>
            <div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] dark:opacity-[0.05] rotate-[35deg]">
              <span class="text-[12rem] font-black text-primary select-none tracking-tighter">OFFICIEL</span>
            </div>
          </div>
        </div>

        <!-- Viewer Footer -->
        <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-primary/10 px-10 py-5 flex items-center justify-between shrink-0">
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visualisation • Page 1 sur 4</span>
          <div class="flex gap-4">
            <button class="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">Précédent</button>
            <button class="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">Suivant</button>
          </div>
        </div>
      </section>

      <!-- MOBILE VIEW SCROLLABLE (Only on mobile) -->
      <section class="md:hidden flex-1 overflow-y-auto pb-32">
        <!-- Location Summary Mobile -->
        <div class="p-4">
          <div class="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/5">
            <h2 class="text-primary dark:text-primary-light text-[10px] font-black uppercase tracking-[0.2em] mb-4">Détails de la location</h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-3">
                <span class="text-slate-500 dark:text-slate-400 text-[11px] font-bold">Logement</span>
                <span class="text-slate-900 dark:text-slate-100 text-xs font-black tracking-tight">Appartement F3 - Conakry</span>
              </div>
              <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-3">
                <span class="text-slate-500 dark:text-slate-400 text-[11px] font-bold">Loyer</span>
                <span class="text-primary text-sm font-black tracking-tighter">4 500 000 GNF / mois</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-500 dark:text-slate-400 text-[11px] font-bold">Durée</span>
                <span class="text-slate-900 dark:text-slate-100 text-xs font-black tracking-tight">12 mois renouvelable</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Document Preview Mobile -->
        <div class="px-4 pb-6">
          <h2 class="text-slate-900 dark:text-white text-lg font-black mb-4 tracking-tight">Aperçu du contrat</h2>
          <div class="relative bg-white dark:bg-slate-900 rounded-3xl aspect-[1/1.4] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group">
            <!-- Simulated PDF lines -->
            <div class="absolute inset-0 p-8 flex flex-col gap-4 pointer-events-none select-none opacity-50">
              <div class="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
              <div class="h-3 w-full bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>
              <div class="h-3 w-full bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>
              <div class="h-3 w-5/6 bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>
              <div class="mt-8 h-6 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
              <div class="h-3 w-full bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>
              <div class="h-3 w-full bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-slate-900 to-transparent flex items-end justify-center pb-8 p-6">
              <button class="w-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 backdrop-blur-md flex items-center justify-center gap-3">
                <span class="material-symbols-outlined text-lg">visibility</span>
                Lire le document complet
              </button>
            </div>
          </div>
        </div>

        <!-- Signature Pad Mobile -->
        <div class="px-4 pb-12">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-slate-900 dark:text-white text-lg font-black tracking-tight">Signature tactile</h2>
            <button @click="clearSignature" class="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-lg active:scale-95 transition-all">
              <span class="material-symbols-outlined text-sm">delete</span>
              Effacer
            </button>
          </div>
          <div class="relative w-full aspect-[2/1] bg-slate-50/50 dark:bg-slate-800/30 border-2 border-dashed border-primary/20 rounded-[2rem] flex flex-col items-center justify-center p-6 group cursor-crosshair overflow-hidden shadow-inner">
             <div v-if="signatureData" class="absolute inset-0 flex items-center justify-center p-6">
                <img :src="signatureData" class="max-h-full object-contain filter dark:invert" alt="Signature"/>
             </div>
             <div v-else class="flex flex-col items-center opacity-30">
               <span class="material-symbols-outlined text-6xl text-primary font-light mb-2">draw</span>
               <span class="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Signez ici avec votre doigt</span>
             </div>
             <!-- Mock signature line -->
             <div class="absolute bottom-10 left-10 right-10 h-0.5 bg-primary/10"></div>
          </div>
          <div class="mt-6 flex items-start gap-4 p-5 rounded-3xl bg-primary/5 dark:bg-primary/10 border border-primary/5">
            <input class="mt-1 h-6 w-6 rounded-xl border-primary/10 bg-white dark:bg-slate-900 text-primary focus:ring-4 focus:ring-primary/10 transition-all" id="terms-mobile" type="checkbox" v-model="termsAccepted"/>
            <label class="text-[11px] font-bold leading-relaxed text-slate-500 dark:text-slate-400" for="terms-mobile">
              J'ai lu et j'accepte les <a class="text-primary font-black underline underline-offset-4" href="#">Conditions Générales</a> et le règlement de GuinéeLogement.
            </label>
          </div>
        </div>
      </section>

      <!-- DESKTOP CONTROL PANEL (Hidden on mobile) -->
      <aside class="hidden md:flex w-[440px] flex-col gap-8 overflow-y-auto custom-scrollbar shrink-0">
        <div class="rounded-[2.5rem] border border-primary/10 bg-white dark:bg-slate-900 p-10 shadow-xl shadow-primary/5">
          <div class="mb-8 flex items-center justify-between">
            <h3 class="text-lg font-black text-primary dark:text-slate-100 tracking-tight">Résumé de la transaction</h3>
            <span class="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-[9px] font-black text-amber-600 uppercase tracking-widest border border-amber-100 dark:border-amber-800">En cours</span>
          </div>
          <div class="space-y-6">
            <div class="flex justify-between items-center group">
              <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Bien immobilier</span>
              <span class="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">Appartement F3 - Conakry</span>
            </div>
            <div class="flex justify-between items-center group">
              <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Loyer mensuel</span>
              <span class="text-base font-black text-primary tracking-tighter">4.500.000 GNF</span>
            </div>
            <div class="flex justify-between items-center group">
              <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Durée du bail</span>
              <span class="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">12 mois renouvelable</span>
            </div>
          </div>
        </div>

        <!-- Parties Information -->
        <div class="rounded-[2.5rem] border border-primary/10 bg-white dark:bg-slate-900 p-10 shadow-xl shadow-primary/5 flex-1 flex flex-col overflow-hidden">
          <h3 class="text-lg font-black text-primary dark:text-slate-100 mb-8 tracking-tight">Parties Contractantes</h3>
          <div class="space-y-6 pr-2">
            <div class="flex items-start gap-5 rounded-3xl border border-primary/5 bg-slate-50/50 dark:bg-slate-800/30 p-6">
              <div class="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/10 shadow-inner">
                <span class="material-symbols-outlined text-2xl font-light">real_estate_agent</span>
              </div>
              <div class="flex-1">
                <p class="text-[9px] font-black uppercase text-primary/60 tracking-widest mb-1.5">Propriétaire (Bailleur)</p>
                <p class="text-base font-black text-slate-900 dark:text-white">M. Mamadou SYLLA</p>
                <div class="mt-3 flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg w-fit">
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  <span class="uppercase tracking-widest">Identité vérifiée</span>
                </div>
              </div>
            </div>
            <div class="flex items-start gap-5 rounded-3xl border border-primary/5 bg-primary/5 dark:bg-primary/20 p-6 ring-2 ring-primary/5">
              <div class="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
                <span class="material-symbols-outlined text-2xl font-light">person</span>
              </div>
              <div class="flex-1">
                <p class="text-[9px] font-black uppercase text-primary/60 tracking-widest mb-1.5">Locataire (Preneur)</p>
                <p class="text-base font-black text-slate-900 dark:text-white">Mme Aminata CONDE</p>
                <div class="mt-3 flex items-center gap-2 text-[10px] font-black text-primary bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-lg w-fit border border-primary/10 shadow-sm">
                  <span class="material-symbols-outlined text-[16px] animate-pulse">pending</span>
                  <span class="uppercase tracking-widest">En attente de signature</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Signature Pad -->
          <div class="mt-auto pt-10">
            <label class="block text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4">Zone de signature électronique</label>
            <div class="relative overflow-hidden rounded-[2rem] border-2 border-primary/10 bg-slate-50 dark:bg-slate-800/30 shadow-inner group">
              <div class="h-44 w-full cursor-crosshair flex flex-col items-center justify-center p-6 relative">
                 <div class="flex flex-col items-center opacity-30">
                   <span class="material-symbols-outlined text-4xl text-primary font-light mb-2">draw</span>
                   <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dessinez votre signature</p>
                 </div>
                 <div class="absolute bottom-12 left-12 right-12 h-0.5 bg-primary/10"></div>
              </div>
              <div class="flex items-center justify-between border-t border-primary/10 bg-white dark:bg-slate-900 px-6 py-3 shrink-0">
                <button @click="clearSignature" class="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">delete_sweep</span>
                  Effacer
                </button>
                <div class="flex gap-2">
                  <button class="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">Type</button>
                  <button class="px-4 py-2 rounded-lg bg-primary text-[10px] font-black uppercase tracking-widest text-white">Dessin</button>
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-start gap-4 p-4 rounded-2xl bg-primary/5 dark:bg-primary/20 border border-primary/10">
              <input class="mt-1 h-5 w-5 rounded-lg border-primary/20 bg-white text-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer" id="terms-desktop" type="checkbox" v-model="termsAccepted"/>
              <label class="text-[10px] font-bold leading-relaxed text-slate-500 dark:text-slate-400 cursor-pointer" for="terms-desktop">
                Je certifie avoir lu l'intégralité du contrat et j'accepte d'utiliser ma signature électronique pour finaliser cet accord.
              </label>
            </div>
          </div>
        </div>

        <!-- Desktop Action Button -->
        <div class="space-y-4">
          <button @click="finalizeSignature" :disabled="!termsAccepted" class="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-3xl bg-primary py-6 text-white shadow-2xl shadow-primary/30 transition-all hover:translate-y-[-2px] active:translate-y-[2px] disabled:opacity-50">
            <span class="material-symbols-outlined text-2xl font-light">verified_user</span>
            <span class="text-sm font-black uppercase tracking-[0.2em] pt-0.5">Finaliser la Signature</span>
          </button>
          <div class="flex items-center justify-center gap-3 py-2 opacity-50">
            <span class="material-symbols-outlined text-sm">lock</span>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chiffrement SSL 256-bit</span>
          </div>
        </div>
      </aside>
    </main>

    <!-- MOBILE STICKY FOOTER ACTION (Only on mobile) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-[100] pb-8">
      <button @click="finalizeSignature" :disabled="!termsAccepted" class="w-full bg-primary hover:bg-primary/95 text-white h-16 rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95">
        <span class="material-symbols-outlined text-2xl font-light">verified</span>
        <span class="text-xs font-black uppercase tracking-[0.2em] pt-0.5">Signer et Confirmer</span>
      </button>
    </div>

    <!-- Desktop Footer Stats (Hidden on mobile) -->
    <footer class="hidden md:block bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-t border-primary/5 px-10 py-3 shrink-0">
      <div class="mx-auto max-w-[1440px] flex items-center justify-between">
        <div class="flex gap-8">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session:</span>
            <span class="text-[10px] font-black text-primary uppercase animate-pulse">active (14:22)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit ID:</span>
            <span class="text-[10px] font-black text-slate-500 uppercase">GL-LOG-827391-X</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="h-2 w-2 rounded-full bg-emerald-500 animate-glow"></div>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-0.5">Serveurs Opérationnels</span>
        </div>
      </div>
    </footer>

    <!-- Toast Simulation -->
    <Transition name="slide-up">
      <div v-if="showSuccessToast" class="fixed bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/10">
        <div class="size-10 bg-white/20 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined">verified</span>
        </div>
        <div>
          <p class="text-sm font-black leading-none">Contrat signé avec succès !</p>
          <p class="text-[10px] font-bold text-white/70 mt-1 uppercase tracking-widest">Redirection en cours...</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const signatureData = ref(null);
const termsAccepted = ref(false);
const showSuccessToast = ref(false);

const navLinks = [
  { label: 'Tableau de bord', path: '/admin' },
  { label: 'Mes Documents', path: '/documents' },
  { label: 'Support', path: '/aide' }
];

const clearSignature = () => {
  signatureData.value = null;
};

const finalizeSignature = () => {
  if (!termsAccepted.value) return;
  showSuccessToast.value = true;
  setTimeout(() => {
    router.push('/admin');
  }, 2500);
};
</script>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }

@keyframes glow {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
.animate-glow { animation: glow 2s infinite; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translate(-50%, 40px); }
.slide-up-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>
