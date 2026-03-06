/**
 * API Service for GuinéeLogement
 * Uses native fetch() to connect Stitch frontend to Node.js backend
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Helper to handle fetch requests with JWT authentication
 */
async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
}

// 🟢 AUTHENTIFICATION
export const authService = {
    login: (email, password) =>
        fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    register: (userData) =>
        fetchWithAuth('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    getProfile: () => fetchWithAuth('/auth/profile'),
};

// 🏠 LOGEMENTS
export const listingService = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return fetchWithAuth(`/logements?${params}`);
    },

    getById: (id) => fetchWithAuth(`/logements/${id}`),

    create: (listingData) =>
        fetchWithAuth('/logements', {
            method: 'POST',
            body: JSON.stringify(listingData),
        }),

    update: (id, listingData) =>
        fetchWithAuth(`/logements/${id}`, {
            method: 'PUT',
            body: JSON.stringify(listingData),
        }),

    delete: (id) => fetchWithAuth(`/logements/${id}`, { method: 'DELETE' }),

    getUserListings: () => fetchWithAuth('/utilisateurs/me/logements'),

    getFavorites: () => fetchWithAuth('/utilisateurs/me/favoris'),

    toggleFavorite: (listingId) =>
        fetchWithAuth(`/logements/${listingId}/favori`, { method: 'POST' }),
};

// 💬 MESSAGERIE
export const messageService = {
    getConversation: (userId) => fetchWithAuth(`/messages/conversation/${userId}`),

    sendMessage: (messageData) =>
        fetchWithAuth('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        }),
};

// 💳 PAIEMENTS
export const paymentService = {
    initiate: (paymentData) =>
        fetchWithAuth('/paiements/initiate', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        }),

    getHistory: () => fetchWithAuth('/paiements/historique'),
};

// 🤖 IA ASSISTANT
export const aiService = {
    createConversation: () =>
        fetchWithAuth('/ia/conversations', { method: 'POST' }),

    getConversations: () => fetchWithAuth('/ia/conversations'),

    sendMessage: (msgData) =>
        fetchWithAuth('/ia/chat', {
            method: 'POST',
            body: JSON.stringify(msgData),
        }),

    getMessagesByConversation: (convId) => fetchWithAuth(`/ia/messages/${convId}`),

    updatePreferences: (prefs) =>
        fetchWithAuth('/ia/preferences', {
            method: 'PUT',
            body: JSON.stringify(prefs),
        }),
};
