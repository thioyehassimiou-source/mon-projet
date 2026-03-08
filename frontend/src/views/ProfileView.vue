<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen transition-colors duration-200">
    <!-- MOBILE VIEW (lg:hidden) -->
    <div class="lg:hidden flex min-h-screen w-full flex-col bg-slate-50 dark:bg-background-dark overflow-x-hidden pb-24">
      <!-- Mobile Header -->
      <header class="flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 sticky top-0 z-[60] border-b border-slate-200 dark:border-slate-800 justify-between">
        <div @click="$router.back()" class="text-primary dark:text-slate-100 flex size-12 shrink-0 items-center justify-start cursor-pointer active:scale-90 transition-transform">
          <span class="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 class="text-slate-900 dark:text-slate-100 text-lg font-black leading-tight tracking-tight flex-1 text-center">Mon Profil</h2>
        <div class="flex w-12 items-center justify-end">
          <button class="flex items-center justify-center rounded-lg h-12 bg-transparent text-primary dark:text-slate-100 active:rotate-45 transition-transform">
            <span class="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </header>

      <!-- Hero Section / Avatar -->
      <div class="flex p-8 flex-col items-center">
        <div class="relative group">
          <div class="size-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl shadow-primary/10">
            <img v-if="user?.photo" :src="user.photo" class="w-full h-full object-cover" alt="Profile" />
            <div v-else class="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <span class="material-symbols-outlined text-4xl">person</span>
            </div>
          </div>
          <button class="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-2xl shadow-lg border-2 border-white dark:border-slate-900 active:scale-90 transition-transform">
            <span class="material-symbols-outlined text-sm font-black">edit</span>
          </button>
        </div>
        <div class="flex flex-col items-center mt-6 space-y-1">
          <p class="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight tracking-tight">{{ user?.name || 'Utilisateur' }}</p>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">{{ user?.localisation || 'Conakry, Guinée' }}</p>
        </div>
      </div>

      <!-- Identity Verification -->
      <div class="px-6 pb-6">
        <div class="flex flex-1 items-center justify-between gap-4 rounded-3xl border border-emerald-200/50 bg-emerald-50 dark:bg-emerald-900/20 p-5 dark:border-emerald-800/30">
          <div class="flex items-center gap-4">
            <div class="bg-emerald-100 dark:bg-emerald-800/50 p-2.5 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <span class="material-symbols-outlined font-black">verified_user</span>
            </div>
            <div>
              <p class="text-emerald-900 dark:text-emerald-400 text-sm font-black leading-tight">Identité vérifiée</p>
              <p class="text-emerald-700/60 dark:text-emerald-500 text-xs font-bold mt-0.5">Badge de confiance actif</p>
            </div>
          </div>
          <button class="flex items-center justify-center rounded-xl h-9 px-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
            <span>Détails</span>
          </button>
        </div>
      </div>

      <!-- Personal Info Section -->
      <div class="px-6 py-2">
        <h3 class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">Informations personnelles</h3>
        <div class="space-y-3">
          <div v-for="info in mobilePersonalInfo" :key="info.label" class="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all shadow-sm">
            <div class="flex items-center gap-4">
              <div class="size-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                <span class="material-symbols-outlined text-xl">{{ info.icon }}</span>
              </div>
              <div>
                <p class="text-[9px] uppercase tracking-widest text-slate-400 font-bold">{{ info.label }}</p>
                <p class="text-sm font-black text-slate-900 dark:text-white mt-0.5">{{ info.value }}</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300 text-xl font-light">chevron_right</span>
          </div>
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="px-6 py-6">
        <h3 class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">Préférences du compte</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
            <div class="flex items-center gap-4">
              <div class="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-xl">language</span>
              </div>
              <p class="text-sm font-black">Langue</p>
            </div>
            <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Français (GN)</p>
          </div>
          <div class="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
            <div class="flex items-center gap-4">
              <div class="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-xl">notifications</span>
              </div>
              <p class="text-sm font-black">Notifications</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="notificationPrefs[0].enabled" class="sr-only peer" />
              <div class="w-12 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Security Section -->
      <div class="px-6 py-2 pb-12">
        <h3 class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">Sécurité</h3>
        <div class="space-y-3">
          <button class="w-full flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm active:scale-[0.98] transition-all">
            <div class="flex items-center gap-4 text-slate-900 dark:text-slate-100">
              <div class="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-xl">lock_reset</span>
              </div>
              <p class="text-sm font-black">Changer le mot de passe</p>
            </div>
            <span class="material-symbols-outlined text-slate-300 text-xl font-light">chevron_right</span>
          </button>
          <button @click="handleLogout" class="w-full flex items-center justify-between p-5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-3xl active:scale-[0.98] transition-all">
            <div class="flex items-center gap-4 text-rose-600 dark:text-rose-400">
              <div class="size-10 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center">
                <span class="material-symbols-outlined text-xl">logout</span>
              </div>
              <p class="text-sm font-black">Déconnexion</p>
            </div>
          </button>
        </div>
      </div>
      
      <!-- Bottom Nav (Mobile) -->
      <nav class="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-4 pb-8 pt-2">
        <div class="flex justify-between items-center max-w-md mx-auto">
          <a v-for="tab in mobileNavTabs" :key="tab.label" 
             href="#" @click.prevent="$router.push(tab.path)"
             :class="[
               'flex flex-1 flex-col items-center justify-center gap-1.5 py-2 transition-all active:scale-90',
               $route.path === tab.path ? 'text-primary dark:text-slate-100' : 'text-slate-400'
             ]"
          >
            <span class="material-symbols-outlined" :class="{ 'fill-1 font-black': $route.path === tab.path }">{{ tab.icon }}</span>
            <span class="text-[9px] uppercase tracking-widest" :class="[ $route.path === tab.path ? 'font-black' : 'font-bold' ]">{{ tab.label }}</span>
          </a>
        </div>
      </nav>
    </div>

    <!-- DESKTOP VIEW (lg:flex) -->
    <div class="hidden lg:flex h-screen overflow-hidden">
      <!-- 1. Side Navigation (Desktop) -->
      <aside class="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 transition-colors duration-200">
        <div class="p-6 flex flex-col h-full">
          <div class="flex items-center gap-3 mb-10 group cursor-pointer" @click="$router.push('/')">
            <div class="bg-primary rounded-xl size-10 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined font-black">real_estate_agent</span>
            </div>
            <div class="flex flex-col">
              <h1 class="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight">GuinéeLogement</h1>
              <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Gestion Immobilière</p>
            </div>
          </div>

          <nav class="flex-1 space-y-1">
            <a v-for="item in navItems" :key="item.label"
               href="#" 
               @click.prevent="item.id === 'logout' ? handleLogout() : (item.path ? $router.push(item.path) : activeSection = item.id)"
               :class="[
                 'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                 activeSection === item.id 
                   ? 'bg-primary/10 text-primary' 
                   : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
               ]"
            >
              <span class="material-symbols-outlined text-xl" :style="activeSection === item.id ? 'font-variation-settings: \'FILL\' 1' : ''">{{ item.icon }}</span>
              <span :class="['text-sm tracking-tight', activeSection === item.id ? 'font-black' : 'font-bold']">{{ item.label }}</span>
            </a>
          </nav>

          <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
            <button @click="handleLogout" class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-black hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/20 transition-all active:scale-95">
              <span class="material-symbols-outlined text-lg">logout</span>
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- 2. Main Content Area (Desktop) -->
      <main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-12">
        <div class="max-w-4xl mx-auto space-y-12">
          <!-- Header -->
          <div class="flex flex-col gap-1">
              <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{{ user?.name || 'Utilisateur' }}</h1>
            <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Gérez vos informations personnelles et vos préférences de sécurité.</p>
          </div>

          <!-- Profile Overview Section -->
          <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm transition-colors duration-200">
            <div class="flex justify-between items-center gap-10">
              <div class="flex items-center gap-10">
                <div class="relative group">
                  <div class="size-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-xl transition-transform group-hover:scale-105">
                    <img v-if="user?.photo" :src="user.photo" class="w-full h-full object-cover" alt="Profile" />
                    <div v-else class="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <span class="material-symbols-outlined text-4xl">person</span>
                    </div>
                  </div>
                  <button class="absolute bottom-1 right-1 size-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-900 hover:scale-110 transition-transform shadow-lg active:scale-90">
                    <span class="material-symbols-outlined text-lg font-black">photo_camera</span>
                  </button>
                </div>
                <div class="space-y-3">
                  <h3 class="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{{ user?.name || 'Utilisateur' }}</h3>
                  <div class="flex items-center gap-4 text-sm">
                    <span class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-[9px] bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full">
                      <span class="material-symbols-outlined text-sm font-black">verified</span> {{ user?.role || 'Locataire' }} vérifié
                    </span>
                    <span class="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Membre depuis {{ formatDate(user?.created_at) }}</span>
                  </div>
                </div>
              </div>
              <button class="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm">
                Modifier la photo
              </button>
            </div>
          </section>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Left Column: Details & Verification -->
            <div class="lg:col-span-2 space-y-12">
              <section v-if="activeSection === 'profile'" class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-200">
                <div class="px-10 py-8 border-b border-slate-100 dark:border-slate-800">
                  <h4 class="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Informations personnelles</h4>
                </div>
                <div class="p-10">
                  <form @submit.prevent="updateProfile" class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-3">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Prénom</label>
                      <input v-model="form.prenom" class="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold outline-none shadow-inner" type="text" placeholder="Entrez votre prénom"/>
                    </div>
                    <div class="space-y-3">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom</label>
                      <input v-model="form.nom" class="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold outline-none shadow-inner" type="text" placeholder="Entrez votre nom"/>
                    </div>
                    <div class="space-y-3 md:col-span-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Adresse e-mail</label>
                      <input v-model="form.email" class="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold outline-none shadow-inner" type="email" placeholder="votre@email.com"/>
                    </div>
                    <div class="space-y-3">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Téléphone</label>
                      <input v-model="form.phone" class="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold outline-none shadow-inner" type="tel" placeholder="+224 ..."/>
                    </div>
                    <div class="flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                      <p class="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">Identité confirmée</p>
                      <p class="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">{{ user?.name || 'Titulaire' }}</p>
                    </div>
                    <div class="space-y-3">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Ville</label>
                      <div class="relative">
                        <select v-model="form.city" class="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold outline-none shadow-inner appearance-none cursor-pointer">
                          <option value="Conakry">Conakry</option>
                          <option value="Kindia">Kindia</option>
                          <option value="Labé">Labé</option>
                          <option value="Kankan">Kankan</option>
                        </select>
                        <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                      </div>
                    </div>
                    <div class="md:col-span-2 pt-4">
                      <button class="bg-primary text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95 shadow-2xl shadow-primary/30" type="submit">
                        Enregistrer les modifications
                      </button>
                    </div>
                  </form>
                </div>
              </section>

              <section v-if="activeSection === 'kyc'" class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-200">
                <div class="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h4 class="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Vérification d'identité (KYC)</h4>
                  <span :class="user?.is_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-4 py-2 text-[10px] font-black rounded-full uppercase tracking-widest">{{ user?.is_verified ? 'Approuvé' : 'En attente' }}</span>
                </div>
                <div class="p-10 space-y-10">
                  <div class="flex items-start gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                    <span class="material-symbols-outlined text-primary text-3xl">info</span>
                    <div class="space-y-4 w-full">
                      <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {{ user?.is_verified ? 'Votre identité a été vérifiée avec succès.' : 'Veuillez uploader une copie recto-verso de votre pièce d\'identité (CNI ou Passeport) pour valider votre compte.' }}
                      </p>
                      
                      <div v-if="!user?.is_verified" class="pt-4 space-y-4">
                        <div class="flex flex-col gap-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document d'identité (JPG, PNG ou PDF)</label>
                          <input type="file" ref="kycFileInput" @change="handleFileChange" class="hidden" accept=".jpg,.jpeg,.png,.pdf" />
                          <div class="flex items-center gap-4">
                            <button @click="$refs.kycFileInput.click()" class="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
                              <span class="material-symbols-outlined text-sm">attach_file</span>
                              {{ selectedFile ? selectedFile.name : 'Choisir un fichier' }}
                            </button>
                            <button v-if="selectedFile" @click="uploadKYC" :disabled="uploading" class="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all">
                              {{ uploading ? 'Envoi...' : 'Envoyer pour validation' }}
                            </button>
                          </div>
                        </div>
                        <p v-if="uploadMessage" :class="uploadError ? 'text-red-500' : 'text-emerald-500'" class="text-xs font-bold">{{ uploadMessage }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section v-if="activeSection === 'security'" class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-10">
                <h4 class="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs mb-8">Paramètres de Sécurité</h4>
                <div class="space-y-6">
                   <div v-for="sec in securityItems" :key="sec.title" class="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                      <div class="flex items-center gap-4">
                         <div class="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <span class="material-symbols-outlined">{{ sec.icon }}</span>
                         </div>
                         <div>
                            <p class="text-sm font-black text-slate-900 dark:text-white">{{ sec.title }}</p>
                            <p class="text-xs text-slate-500">{{ sec.desc }}</p>
                         </div>
                      </div>
                      <button class="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Gérer</button>
                   </div>
                </div>
              </section>
            </div>

            <!-- Right Column -->
            <div class="space-y-12">
              <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-200">
                <div class="px-10 py-8 border-b border-slate-100 dark:border-slate-800">
                  <h4 class="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs leading-none">Sécurité & Confidentialité</h4>
                </div>
                <div class="p-10 space-y-8">
                  <div class="space-y-4">
                    <div v-for="sec in securityItems" :key="sec.title" 
                         class="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                    >
                      <div class="flex items-center gap-5">
                        <div class="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <span class="material-symbols-outlined text-2xl">{{ sec.icon }}</span>
                        </div>
                        <div>
                          <p class="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">{{ sec.title }}</p>
                          <p class="text-[11px] text-slate-400 font-bold mt-2 tracking-tight" :class="{ 'text-emerald-500': sec.status === 'Activé' }">{{ sec.desc }}</p>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-1">chevron_right</span>
                    </div>
                  </div>
                </div>
              </section>

              <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-200">
                <div class="px-10 py-8 border-b border-slate-100 dark:border-slate-800">
                  <h4 class="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs leading-none">Notifications</h4>
                </div>
                <div class="p-10 space-y-10">
                  <div v-for="pref in notificationPrefs" :key="pref.id" class="flex items-center justify-between group">
                    <div class="pr-6">
                      <p class="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">{{ pref.label }}</p>
                      <p class="text-[11px] text-slate-400 font-bold mt-2 tracking-tight">{{ pref.desc }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" v-model="pref.enabled" class="sr-only peer" />
                      <div class="w-14 h-7 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-primary shadow-inner"></div>
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { userService, listingService } from '@/services/api-fetch'; // Added listingService

const router = useRouter();
const authStore = useAuthStore();

const activeSection = ref('profile');
const user = computed(() => authStore.user);

// --- KYC Logic ---
const kycFileInput = ref(null);
const selectedFile = ref(null);
const uploading = ref(false);
const uploadMessage = ref('');
const uploadError = ref(false);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    uploadMessage.value = '';
  }
};

const uploadKYC = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  uploadMessage.value = '';
  uploadError.value = false;

  const formData = new FormData();
  formData.append('document', selectedFile.value);

  try {
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/auth/upload-kyc`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      uploadMessage.value = 'Document envoyé avec succès ! Un administrateur va le vérifier.';
      selectedFile.value = null;
      // Optionnel : rafraîchir le profil
      authStore.getProfile();
    } else {
      throw new Error(data.message || 'Erreur lors de l\'envoi');
    }
  } catch (error) {
    uploadError.value = true;
    uploadMessage.value = error.message;
  } finally {
    uploading.value = false;
  }
};
const formatDate = (dateString) => {
  if (!dateString) return '...';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
};
// -----------------

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'dashboard' },
  { id: 'profile', label: 'Profil Personnel', icon: 'person' },
  { id: 'kyc', label: 'Identité KYC', icon: 'verified_user' },
  { id: 'security', label: 'Sécurité & Accès', icon: 'security' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'payments', label: 'Portefeuille', icon: 'payments' },
  { id: 'aide', label: 'Centre d\'Aide', icon: 'help_center', path: '/aide' },
];

const mobileNavTabs = [
  { label: 'Accueil', icon: 'home', path: '/' },
  { label: 'Recherche', icon: 'search', path: '/recherche' },
  { label: 'Favoris', icon: 'favorite', path: '/favoris' },
  { label: 'Profil', icon: 'person', path: '/mon-profil' }
];

const securityItems = [
  { title: 'Mot de passe', desc: 'Dernière modif. il y a 3 mois', icon: 'lock' },
  { title: 'Double Auth (2FA)', desc: 'Plus de sécurité', status: 'Activé', icon: 'phonelink_lock' },
];

const notificationPrefs = reactive([
  { id: 'emails', label: 'Alertes par Emails', desc: 'Factures, nouveaux messages', enabled: true },
  { id: 'sms', label: 'Notifications SMS', desc: 'Alertes de connexion urgentes', enabled: false },
  { id: 'marketing', label: 'Offres Marketing', desc: 'Nouveaux logements exclusifs', enabled: true },
]);

const mobilePersonalInfo = computed(() => [
  { label: 'Nom complet', value: user.value?.name || 'Nom non défini', icon: 'person' },
  { label: 'E-mail', value: user.value?.email || 'email@exemple.gn', icon: 'mail' },
  { label: 'Téléphone', value: user.value?.phone || '+224 ...', icon: 'phone' },
]);

const form = reactive({
  prenom: '',
  nom: '',
  email: '',
  phone: '',
  city: 'Conakry'
});

onMounted(() => {
  if (user.value) {
    const parts = user.value.name?.split(' ') || ['', ''];
    form.prenom = parts[0];
    form.nom = parts.slice(1).join(' ');
    form.email = user.value.email || '';
    form.phone = user.value.phone || '+224 ...';
    form.city = user.value.localisation?.split(',')[0] || 'Conakry';
  }
});

const isUpdating = ref(false);

const updateProfile = async () => {
  isUpdating.value = true;
  try {
    const payload = {
      name: `${form.prenom} ${form.nom}`.trim(),
      email: form.email,
      phone: form.phone
    };
    const response = await userService.updateProfile(payload);
    if (response.success) {
      // Mettre à jour le store auth avec le nouvel utilisateur
      authStore.setUser({ ...authStore.user, ...response.user });
      localStorage.setItem('user', JSON.stringify({ ...authStore.user, ...response.user }));
      alert('Profil mis à jour avec succès !');
    }
  } catch (error) {
    alert(error.message || 'Erreur lors de la mise à jour du profil');
  } finally {
    isUpdating.value = false;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: #334155; }
</style>
