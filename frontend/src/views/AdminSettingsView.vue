<template>
  <div class="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 overflow-hidden">
    <!-- Sidebar (Desktop Only) -->
    <aside class="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shrink-0 z-50">
      <div class="p-6 flex items-center gap-4 group cursor-pointer" @click="$router.push('/admin')">
        <div class="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined font-black">dashboard</span>
        </div>
        <div>
          <h1 class="text-primary dark:text-slate-100 text-lg font-black leading-tight tracking-tight">AdminPanel</h1>
          <p class="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Configuration</p>
        </div>
      </div>
      
      <nav class="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p class="px-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 mt-2">Navigation</p>
        <router-link to="/admin" class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-sm">
          <span class="material-symbols-outlined text-xl">arrow_back</span>
          <span>Retour au Dashboard</span>
        </router-link>

        <p class="px-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 mt-8">Paramètres Système</p>
        <a v-for="section in sideSections" :key="section.id" 
           :href="'#' + section.id"
           @click.prevent="scrollToSection(section.id)"
           :class="[
             'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm group',
             activeSection === section.id 
               ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
               : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-light'
           ]"
        >
          <span class="material-symbols-outlined text-xl" :class="{ 'fill-1': activeSection === section.id }">{{ section.icon }}</span>
          <span class="tracking-tight">{{ section.label }}</span>
        </a>
      </nav>

      <div class="p-4 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
          <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20">AD</div>
          <div class="flex-1 min-w-0 pr-2">
            <p class="text-[11px] font-black text-slate-900 dark:text-white truncate">Admin Principal</p>
            <p class="text-[9px] text-slate-500 font-bold truncate">admin@guineelogement.gn</p>
          </div>
          <button @click="$router.push('/login')" class="size-8 flex items-center justify-center rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-500 transition-colors">
            <span class="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- MOBILE VIEW (lg:hidden) -->
      <div class="lg:hidden flex flex-col w-full bg-background-light dark:bg-background-dark min-h-screen">
        <!-- Mobile Header -->
        <header class="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-primary/10">
          <div class="flex items-center p-4">
            <button @click="$router.back()" class="text-primary dark:text-slate-100 p-1 active:scale-90 transition-transform shrink-0">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-black leading-tight tracking-tight flex-1 text-center pr-8">Paramètres avancés</h1>
          </div>
        </header>

        <!-- Mobile Scrollable Content -->
        <div class="flex-1 overflow-y-auto pb-32">
          <!-- Category: Administration -->
          <h3 class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] px-5 pb-3 pt-8">Administration & Revenus</h3>
          <div class="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            <div v-for="item in mobileAdminItems" :key="item.id" 
                 class="flex items-center gap-4 px-5 py-5 active:bg-slate-50 dark:active:bg-slate-800 transition-colors group"
                 @click="scrollToSection(item.id, true)"
            >
              <div class="flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 shrink-0 size-10 text-primary group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-xl">{{ item.icon }}</span>
              </div>
              <div class="flex-1">
                <p class="text-sm font-black text-slate-900 dark:text-white tracking-tight">{{ item.label }}</p>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{{ item.desc }}</p>
              </div>
              <div class="shrink-0 text-slate-300">
                <span class="material-symbols-outlined text-xl">chevron_right</span>
              </div>
            </div>
          </div>

          <!-- Category: Sécurité & Technique -->
          <h3 class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] px-5 pb-3 pt-8">Sécurité & Technique</h3>
          <div class="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            <div v-for="item in mobileTechItems" :key="item.id" 
                 class="flex items-center gap-4 px-5 py-5 active:bg-slate-50 dark:active:bg-slate-800 transition-colors group"
                 @click="scrollToSection(item.id, true)"
            >
              <div class="flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 shrink-0 size-10 text-primary group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-xl">{{ item.icon }}</span>
              </div>
              <div class="flex-1">
                <p class="text-sm font-black text-slate-900 dark:text-white tracking-tight">{{ item.label }}</p>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{{ item.desc }}</p>
              </div>
              <div class="shrink-0 text-slate-300">
                <span class="material-symbols-outlined text-xl">chevron_right</span>
              </div>
            </div>
          </div>

          <!-- Mobile Help Card -->
          <div class="px-5 mt-8">
            <div class="rounded-3xl bg-primary/5 dark:bg-primary/10 p-6 border border-primary/10">
              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-primary mt-0.5">help_outline</span>
                <div>
                  <p class="text-xs font-black text-primary uppercase tracking-widest">Besoin d'assistance ?</p>
                  <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-2 font-bold leading-relaxed">
                    Les modifications dans ces sections peuvent affecter le fonctionnement global de la plateforme. Contactez l'administrateur système en cas de doute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Navigation Bar (Mobile) -->
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

      <!-- DESKTOP VIEW (lg:flex as children of main) -->
      <div class="hidden lg:flex flex-col w-full h-full overflow-hidden">
        <!-- Header -->
        <header class="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 shrink-0 z-40">
          <div class="flex items-center gap-4">
            <h1 class="text-2xl font-black tracking-tight">Configuration Avancée</h1>
            <span class="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-widest border border-primary/10">v2.4.0</span>
          </div>
          <div class="flex items-center gap-6">
            <div class="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 border border-slate-200 dark:border-slate-700">
               <span class="material-symbols-outlined text-sm">schedule</span>
               <span class="text-[10px] font-black uppercase tracking-widest">Dernière modif: Il y a 5 min</span>
            </div>
            <button @click="saveAll" class="bg-primary hover:bg-primary/95 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-primary/20">
              <span class="material-symbols-outlined text-lg">save</span>
              Sauvegarder tout
            </button>
          </div>
        </header>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar pb-32" @scroll="handleScroll">
          <!-- Commissions Section -->
          <section class="max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all" id="commissions">
            <div class="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-start">
              <div class="space-y-1">
                <h3 class="text-xl font-black flex items-center gap-3 tracking-tight">
                  <span class="material-symbols-outlined text-primary text-2xl">account_balance_wallet</span>
                  Configuration des Commissions
                </h3>
                <p class="text-sm text-slate-500 font-medium">Définissez les prélèvements sur chaque transaction immobilière.</p>
              </div>
              <div class="flex items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                <span class="material-symbols-outlined text-xs">sync_saved_locally</span>
                Live
              </div>
            </div>
            <div class="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Taux de commission (%)</label>
                <div class="relative">
                  <input v-model="settings.commission_rate" class="w-full h-14 px-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-black outline-none shadow-inner" step="0.1" type="number"/>
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">%</span>
                </div>
              </div>
              <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Frais fixes par transaction (GNF)</label>
                <div class="relative">
                  <input v-model="settings.fixed_fee" class="w-full h-14 px-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-black outline-none shadow-inner" type="text"/>
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-black uppercase tracking-widest">GNF</span>
                </div>
              </div>
            </div>
          </section>

          <!-- AI Settings Section -->
          <section class="max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all" id="ai-settings">
            <div class="p-10 border-b border-slate-50 dark:border-slate-800">
              <h3 class="text-xl font-black flex items-center gap-3 tracking-tight">
                <span class="material-symbols-outlined text-primary text-2xl">psychology</span>
                Paramètres de l'Intelligence Artificielle
              </h3>
              <p class="text-sm text-slate-500 font-medium">Gestion de l'assistant IA pour l'aide à la rédaction d'annonces.</p>
            </div>
            <div class="p-10 space-y-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-3">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Modèle de langage</label>
                  <div class="relative">
                    <select v-model="settings.ai_model" class="w-full h-14 px-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-black outline-none shadow-inner appearance-none cursor-pointer">
                      <option>GPT-4o (Recommandé)</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>Llama 3 70B (Local)</option>
                    </select>
                    <span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between px-1">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Température (Créativité)</label>
                    <span class="text-[10px] font-black text-primary">{{ settings.ai_temp }}</span>
                  </div>
                  <input v-model="settings.ai_temp" class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary mt-4" max="1" min="0" step="0.1" type="range"/>
                  <div class="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>Précis</span>
                    <span>Créatif</span>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Prompt Système</label>
                <textarea v-model="settings.ai_prompt" class="w-full p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold outline-none shadow-inner leading-relaxed overflow-hidden" rows="4"></textarea>
              </div>
            </div>
          </section>

          <!-- Roles & Permissions -->
          <section class="max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all" id="roles">
            <div class="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <div class="space-y-1">
                <h3 class="text-xl font-black flex items-center gap-3 tracking-tight">
                  <span class="material-symbols-outlined text-primary text-2xl">groups</span>
                  Rôles et Permissions
                </h3>
                <p class="text-sm text-slate-500 font-medium tracking-tight">Contrôlez les accès aux différentes parties du système.</p>
              </div>
              <button class="bg-primary/10 text-primary px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all border border-primary/10 active:scale-95">Nouveau Rôle</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black uppercase text-slate-400">
                  <tr>
                    <th class="px-10 py-5 tracking-widest">Rôle</th>
                    <th class="px-10 py-5 tracking-widest text-center">Utilisateurs</th>
                    <th class="px-10 py-5 tracking-widest">Accès Clés</th>
                    <th class="px-10 py-5 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                  <tr v-for="role in roles" :key="role.name" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-10 py-6">
                      <div class="flex items-center gap-4">
                        <div :class="['size-2.5 rounded-full shadow-lg', role.dotColor]"></div>
                        <span class="font-black text-sm tracking-tight">{{ role.name }}</span>
                      </div>
                    </td>
                    <td class="px-10 py-6 text-sm font-black text-center text-slate-400">{{ role.count }}</td>
                    <td class="px-10 py-6">
                      <div class="flex flex-wrap gap-2">
                        <span v-for="access in role.access" :key="access" class="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500">
                          {{ access }}
                        </span>
                      </div>
                    </td>
                    <td class="px-10 py-6 text-right">
                      <button class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all active:scale-90 border border-slate-100 dark:border-slate-700/50">
                        <span class="material-symbols-outlined text-xl">edit</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Payment Settings -->
          <section class="max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all" id="payments">
            <div class="p-10 border-b border-slate-50 dark:border-slate-800">
              <h3 class="text-xl font-black flex items-center gap-3 tracking-tight">
                <span class="material-symbols-outlined text-primary text-2xl">api</span>
                Paramètres de Paiement (Passerelle)
              </h3>
              <p class="text-sm text-slate-500 font-medium">Configuration des paiements via Orange Money, Mobile Money et Cartes.</p>
            </div>
            <div class="p-10 space-y-10">
              <div class="flex items-center justify-between p-8 bg-primary/5 dark:bg-primary/20 rounded-[2rem] border border-primary/10">
                <div class="flex items-center gap-5">
                  <div class="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <span class="material-symbols-outlined text-2xl font-light">settings_input_component</span>
                  </div>
                  <div>
                    <p class="text-sm font-black tracking-tight">Mode de l'environnement</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Basculez entre le mode test et production.</p>
                  </div>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-[10px] font-black tracking-[0.2em]" :class="!settings.is_production ? 'text-amber-600' : 'text-slate-400'">TEST</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.is_production" class="sr-only peer" />
                    <div class="w-16 h-8 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[24px] after:w-[24px] after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                  <span class="text-[10px] font-black tracking-[0.2em]" :class="settings.is_production ? 'text-emerald-600' : 'text-slate-400'">PROD</span>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-10">
                <div class="space-y-3">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clé API Publique ({{ settings.is_production ? 'Production' : 'Test' }})</label>
                  <div class="relative">
                    <input :value="settings.is_production ? 'pk_prod_928374928374928374' : 'pk_test_1234567890'" class="w-full h-14 px-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-black outline-none shadow-inner pr-14" type="password" readonly/>
                    <span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-primary transition-colors">visibility</span>
                  </div>
                </div>
                <div class="space-y-3">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clé API Secrète ({{ settings.is_production ? 'Production' : 'Test' }})</label>
                  <div class="relative">
                    <input value="sk_prod_*********************" class="w-full h-14 px-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-black outline-none shadow-inner pr-14" type="password" readonly/>
                    <span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-primary transition-colors">visibility</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Security & Audit Logs -->
          <section class="max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" id="security">
            <div class="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div class="space-y-1">
                <h3 class="text-xl font-black flex items-center gap-3 tracking-tight">
                  <span class="material-symbols-outlined text-primary text-2xl">history</span>
                  Journal d'audit & Sécurité
                </h3>
                <p class="text-sm text-slate-500 font-medium tracking-tight">Suivi en temps réel de l'activité critique du système.</p>
              </div>
              <button class="text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                <span class="material-symbols-outlined text-lg">download</span>
                Exporter CSV
              </button>
            </div>
            <div class="p-6 space-y-4">
              <div v-for="log in logs" :key="log.id" class="flex gap-6 items-start p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-3xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
                <div :class="['size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform', log.bgClass]">
                  <span class="material-symbols-outlined text-xl" :class="log.iconColor">{{ log.icon }}</span>
                </div>
                <div class="flex-1 min-w-0 pt-1">
                  <div class="flex justify-between items-start">
                    <p class="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-tight">{{ log.title }}</p>
                    <span class="text-[9px] text-slate-400 uppercase font-black tracking-widest">{{ log.time }}</span>
                  </div>
                  <p class="text-[11px] text-slate-500 font-bold mt-1.5 leading-relaxed">{{ log.desc }}</p>
                  <p class="text-[9px] text-slate-300 dark:text-slate-600 font-black uppercase tracking-[0.2em] mt-3">ID: {{ log.userId }} • IP: {{ log.ip }}</p>
                </div>
              </div>
            </div>
            <div class="p-8 bg-slate-50/50 dark:bg-slate-800/30 text-center border-t border-slate-50 dark:border-slate-800">
              <button class="text-primary text-[10px] font-black uppercase tracking-widest hover:underline leading-none">Voir tout le journal d'activité</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const activeSection = ref('commissions');

const sideSections = [
  { id: 'commissions', label: 'Commissions', icon: 'percent' },
  { id: 'ai-settings', label: 'IA Configuration', icon: 'memory' },
  { id: 'roles', label: 'Rôles & Accès', icon: 'admin_panel_settings' },
  { id: 'payments', label: 'Paiements API', icon: 'payments' },
  { id: 'security', label: 'Audit & Sécurité', icon: 'shield' },
];

const mobileAdminItems = [
  { id: 'commissions', label: 'Commissions et Frais', desc: 'Gérer les taux et prélèvements', icon: 'payments' },
  { id: 'ai-settings', label: 'Configuration de l\'IA', desc: 'Assistant virtuel et prédictions', icon: 'smart_toy' },
];

const mobileTechItems = [
  { id: 'roles', label: 'Sécurité et Accès', desc: 'Authentification et permissions', icon: 'shield_lock' },
  { id: 'payments', label: 'Intégrations API', desc: 'Clés d\'accès et webhooks', icon: 'api' },
  { id: 'security', label: 'Maintenance du système', desc: 'Mises à jour et logs serveur', icon: 'settings_suggest' },
];

const mobileNavTabs = [
  { label: 'Accueil', icon: 'home', path: '/' },
  { label: 'Recherche', icon: 'search', path: '/recherche' },
  { label: 'Favoris', icon: 'favorite', path: '/favoris' },
  { label: 'Aide', icon: 'help_outline', path: '/aide' },
  { label: 'Profil', icon: 'person', path: '/mon-profil' }
];

const settings = reactive({
  commission_rate: 5.5,
  fixed_fee: '25.000',
  ai_model: 'GPT-4o (Recommandé)',
  ai_temp: 0.7,
  ai_prompt: "Tu es l'assistant expert de GuinéeLogement. Aide les utilisateurs à rédiger des descriptions immobilières attrayantes et précises en mettant en avant les points forts (localisation, sécurité, équipements) dans un ton professionnel et accueillant.",
  is_production: true
});

const roles = [
  { name: 'Super Admin', count: 2, access: ['ACCÈS TOTAL'], dotColor: 'bg-rose-500' },
  { name: 'Modérateur', count: 12, access: ['ANNONCES', 'USERS', 'REPORTS'], dotColor: 'bg-blue-500' },
  { name: 'Support client', count: 5, access: ['TICKETS', 'CHATS', 'REFUNDS'], dotColor: 'bg-emerald-500' },
];

const logs = [
  { id: 1, title: 'Tentative de connexion échouée', desc: 'Saisie multiple de mot de passe incorrect.', time: 'Il y a 5 min', icon: 'login', bgClass: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-700 dark:text-amber-400', userId: 'EXTERN', ip: '197.234.xx.xxx' },
  { id: 2, title: 'Modification des commissions', desc: 'Taux de commission ajusté de 5% à 5.5%.', time: 'Il y a 1 heure', icon: 'edit', bgClass: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-700 dark:text-emerald-400', userId: 'ADMIN_042', ip: '41.222.xx.xx' },
  { id: 3, title: 'Mise à jour du modèle IA', desc: 'Passage automatique à GPT-4o-mini réussi.', time: 'Aujourd\'hui, 09:12', icon: 'sync', bgClass: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-700 dark:text-blue-400', userId: 'SYSTEM', ip: 'LOCAL' },
];

const scrollToSection = (id, isMobile = false) => {
  activeSection.value = id;
  // On mobile, we might want to navigate to a sub-view or just scroll in the dashboard
  // For this refinement, we'll scroll or handle the logic if these were separate pages
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleScroll = (e) => {
  const scrollPos = e.target.scrollTop;
  for (const section of sideSections) {
    const el = document.getElementById(section.id);
    if (el && el.offsetTop <= scrollPos + 150) {
      activeSection.value = section.id;
    }
  }
};

const saveAll = () => {
  console.log('Saving all settings:', settings);
};

onMounted(() => {
});
</script>

<style scoped>
.fill-1 { font-variation-settings: 'FILL' 1; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
::-webkit-scrollbar { width: 6px; }
</style>
