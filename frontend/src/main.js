import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';

// Import des vues
import HomeView from './views/HomeView.vue';
import LoginView from './views/auth/LoginView.vue';
import RegisterView from './views/auth/RegisterView.vue';
import ListingDetailView from './views/ListingDetailView.vue';
import SearchView from './views/SearchView.vue';

import ListingsListView from './views/ListingsListView.vue';
import EditListingView from './views/EditListingView.vue';

import SearchMap from './views/SearchMap.vue';
import FavoritesView from './views/FavoritesView.vue';
import MessagesView from './views/MessagesView.vue';
import ProfileView from './views/ProfileView.vue';
import CreateListingView from './views/CreateListingView.vue';
import PaymentsView from './views/PaymentsView.vue';
import AIChatView from './views/AIChatView.vue';
import AdminDashboardView from './views/AdminDashboardView.vue';
import HelpCenterView from './views/HelpCenterView.vue';
import AdminSettingsView from './views/AdminSettingsView.vue';
import ElectronicSignatureView from './views/ElectronicSignatureView.vue';
import OwnerProfileView from './views/OwnerProfileView.vue';
import RateOwnerView from './views/RateOwnerView.vue';
import NotificationSettingsView from './views/NotificationSettingsView.vue';
import AdminAnalyticsView from './views/AdminAnalyticsView.vue';
import AdminAntiFraudView from './views/AdminAntiFraudView.vue';
import AdminAntiFraudConfigView from './views/AdminAntiFraudConfigView.vue';

// Configuration des routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Accueil' }
  },
  {
    path: '/map',
    name: 'map-search',
    component: SearchMap,
    meta: {
      title: 'Recherche sur carte',
      hideHeader: true,
      hideBottomNav: false
    }
  },
  {
    path: '/favoris',
    name: 'favorites',
    component: FavoritesView,
    meta: { title: 'Mes Favoris', requiresAuth: true }
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessagesView,
    meta: { title: 'Messages', requiresAuth: true }
  },
  {
    path: '/mon-profil',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Mon Profil',
      requiresAuth: true
    }
  },
  {
    path: '/publier',
    name: 'create-listing',
    component: CreateListingView,
    meta: {
      title: 'Publier une annonce',
      requiresAuth: true,
      hideHeader: true
    }
  },
  {
    path: '/paiements',
    name: 'payments',
    component: PaymentsView,
    meta: { title: 'Mes Paiements', requiresAuth: true }
  },
  {
    path: '/assistant-ia',
    name: 'ai-assistant',
    component: AIChatView,
    meta: {
      title: 'Assistant IA',
      hideHeader: true,
      hideBottomNav: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Connexion',
      guestOnly: true,
      hideHeader: true,
      hideBottomNav: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Inscription',
      guestOnly: true,
      hideHeader: true,
      hideBottomNav: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: { title: 'Recherche Avancée' }
  },
  {
    path: '/listings/:id',
    name: 'listing-detail',
    component: ListingDetailView,
    meta: {
      title: 'Détail de l\'annonce',
      hideHeader: true
    }
  },
  {
    path: '/listings',
    name: 'listings',
    component: ListingsListView,
    meta: { title: 'Annonces' }
  },
  {
    path: '/listings/:id/edit',
    name: 'edit-listing',
    component: EditListingView,
    meta: { title: 'Modifier l\'annonce', requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: { title: 'Administration', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: AdminSettingsView,
    meta: { title: 'Configuration Avancée', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/contrat/:id',
    name: 'electronic-signature',
    component: ElectronicSignatureView,
    meta: { title: 'Signature Électronique', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/proprietaire/:id',
    name: 'owner-profile',
    component: OwnerProfileView,
    meta: { title: 'Profil Propriétaire', requiresAuth: false }
  },
  {
    path: '/noter/:id',
    name: 'rate-owner',
    component: RateOwnerView,
    meta: { title: 'Noter le Propriétaire', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/notifications',
    name: 'notification-settings',
    component: NotificationSettingsView,
    meta: { title: 'Notifications', requiresAuth: true, hideHeader: true, hideBottomNav: false }
  },
  {
    path: '/admin/analytics',
    name: 'admin-analytics',
    component: AdminAnalyticsView,
    meta: { title: 'Analyses plateforme', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/admin/anti-fraud',
    name: 'admin-anti-fraud',
    component: AdminAntiFraudView,
    meta: { title: 'Sécurité Anti-Fraude', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/admin/anti-fraud/config',
    name: 'admin-anti-fraud-config',
    component: AdminAntiFraudConfigView,
    meta: { title: 'Configuration Sécurité', requiresAuth: true, hideHeader: true, hideBottomNav: true }
  },
  {
    path: '/aide',
    name: 'help-center',
    component: HelpCenterView,
    meta: { title: 'Centre d\'Aide' }
  },
  // Ajoutez d'autres routes ici
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

// Création de l'application
const app = createApp(App);

// Utilisation des plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Importation du store après la création de Pinia
import { useAuthStore } from '@/stores/auth';

// Garde de navigation pour vérifier l'authentification
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Mettre le titre de la page
  document.title = to.meta.title ? `${to.meta.title} | GuineaLogement` : 'GuineaLogement';

  // Vérifier l'authentification si nécessaire
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = await authStore.checkAuth();
    if (!isAuthenticated) {
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
  }

  // Rediriger les utilisateurs connectés des pages d'authentification
  if (to.matched.some(record => record.meta.guestOnly)) {
    const isAuthenticated = await authStore.checkAuth();
    if (isAuthenticated) {
      return next({ name: 'home' });
    }
  }

  next();
});

// Gestion des erreurs globales
app.config.errorHandler = (err, vm, info) => {
  console.error('Erreur Vue:', err);
  console.error('Info:', info);
};

// Gestion des avertissements
app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Avertissement Vue:', msg);
  console.trace(trace);
};

// Directive globale pour le focus
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

// Monter l'application
app.mount('#app');
