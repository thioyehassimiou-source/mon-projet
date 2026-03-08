import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/api-fetch';

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref(getCurrentUser());
  const isAuthenticated = computed(() => !!user.value);
  const isLoading = ref(false);
  const error = ref(null);

  // Définir l'utilisateur actuel
  function setUser(userData) {
    user.value = userData;
  }

  // Effacer l'utilisateur actuel
  function clearUser() {
    user.value = null;
  }

  // Effacer les erreurs
  function clearError() {
    error.value = null;
  }

  // Connexion
  async function login(credentials) {
    isLoading.value = true;
    error.value = null;

    try {
      const { email, password } = credentials;
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (err) {
      error.value = err.message || 'Une erreur est survenue lors de la connexion';
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  // Inscription
  async function register(userData) {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await authService.register(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (err) {
      error.value = err.message || 'Une erreur est survenue lors de l\'inscription';
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  // Déconnexion
  async function logout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      clearUser();
      return { success: true };
    } catch (err) {
      error.value = 'Erreur lors de la déconnexion';
      return { success: false, error: error.value };
    }
  }

  // Vérifier l'authentification
  async function checkAuth() {
    if (isAuthenticated.value) {
      try {
        const data = await authService.getProfile();
        setUser(data);
        return true;
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'authentification:', err);
      }
    }

    // Si on arrive ici, l'utilisateur n'est pas authentifié
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearUser();
    return false;
  }

  return {
    // State
    user,
    isLoading,
    error,

    // Getters
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    checkAuth,
    clearError
  };
});
