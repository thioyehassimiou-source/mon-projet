import api from './api';

const AUTH_TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Enregistrer le token et les informations de l'utilisateur
export function setAuthData(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Récupérer le token d'authentification
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Récupérer les informations de l'utilisateur connecté
export function getCurrentUser() {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

// Vérifier si l'utilisateur est connecté
export function isAuthenticated() {
  return !!getAuthToken();
}

// Déconnexion
export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Connexion
export async function login(credentials) {
  try {
    const response = await api.post('/auth/login', credentials);

    if (response.data.token) {
      const { token, ...user } = response.data;
      setAuthData(token, user);
      return { success: true, user };
    }

    return { success: false, error: 'Réponse inattendue du serveur' };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erreur de connexion';
    return { success: false, error: errorMessage };
  }
}

// Inscription
export async function register(userData) {
  try {
    const response = await api.post('/auth/register', userData);

    if (response.data.token) {
      const { token, ...user } = response.data;
      setAuthData(token, user);
      return { success: true, user };
    }

    return { success: false, error: 'Réponse inattendue du serveur' };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erreur lors de l\'inscription';
    return { success: false, error: errorMessage };
  }
}

// Récupérer le profil utilisateur
export async function fetchProfile() {
  try {
    const response = await api.get('/auth/profile');
    return { success: true, user: response.data };
  } catch (error) {
    return { success: false, error: 'Impossible de charger le profil' };
  }
}