import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { listingService } from '@/services/api-fetch';
import { useAuthStore } from '@/stores/auth';

export const useListingsStore = defineStore('listings', () => {
  const listings = ref([]);
  const currentListing = ref(null);
  const userListings = ref([]);
  const favorites = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const premiumListings = computed(() =>
    listings.value.filter(listing => listing.is_premium)
  );

  const recentListings = computed(() =>
    listings.value.slice(0, 10)
  );

  // Actions
  async function fetchListings(params = {}) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await listingService.getAll(params);
      listings.value = response;
      loadLocalFavorites(); // Appliquer les favoris locaux
      return { success: true };
    } catch (err) {
      error.value = 'Erreur lors du chargement des annonces';
      console.error('Fetch listings error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchListing(id) {
    isLoading.value = true;
    error.value = null;

    try {
      const listing = await listingService.getById(id);
      currentListing.value = listing;
      return { success: true, listing };
    } catch (err) {
      error.value = 'Erreur lors du chargement de l\'annonce';
      console.error('Fetch listing error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  async function createNewListing(listingData) {
    isLoading.value = true;
    error.value = null;

    try {
      const newListing = await listingService.create(listingData);
      listings.value.unshift(newListing);
      return { success: true, listing: newListing };
    } catch (err) {
      error.value = 'Erreur lors de la création de l\'annonce';
      console.error('Create listing error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  async function updateExistingListing(id, listingData) {
    isLoading.value = true;
    error.value = null;

    try {
      const updatedListing = await listingService.update(id, listingData);
      const index = listings.value.findIndex(l => l.id === id);
      if (index !== -1) {
        listings.value[index] = updatedListing;
      }
      if (currentListing.value?.id === id) {
        currentListing.value = updatedListing;
      }
      return { success: true, listing: updatedListing };
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de l\'annonce';
      console.error('Update listing error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteExistingListing(id) {
    isLoading.value = true;
    error.value = null;

    try {
      await listingService.delete(id);
      listings.value = listings.value.filter(l => l.id !== id);
      userListings.value = userListings.value.filter(l => l.id !== id);
      return { success: true };
    } catch (err) {
      error.value = 'Erreur lors de la suppression de l\'annonce';
      console.error('Delete listing error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  async function toggleListingFavorite(listingId) {
    const authStore = useAuthStore();

    // Si l'utilisateur est connecté, on utilise l'API
    if (authStore.isAuthenticated) {
      try {
        const response = await listingService.toggleFavorite(listingId);

        // Mettre à jour l'état local dans la liste globale
        const listing = listings.value.find(l => l.id === listingId);
        if (listing) {
          listing.is_favorited = response.is_favorited;
        }

        // Mettre à jour la collection des favoris
        if (response.is_favorited) {
          if (listing && !favorites.value.find(f => f.id === listingId)) {
            favorites.value.push(listing);
          }
        } else {
          favorites.value = favorites.value.filter(f => f.id !== listingId);
        }

        return { success: true, is_favorited: response.is_favorited };
      } catch (err) {
        error.value = 'Erreur lors de la gestion des favoris';
        console.error('Toggle favorite error:', err);
        return { success: false, error: error.value };
      }
    } else {
      // MODE INVITÉ : Sauvegarde locale dans localStorage
      let localFavs = JSON.parse(localStorage.getItem('guest_favorites') || '[]');
      const isFavorited = localFavs.includes(listingId);

      if (isFavorited) {
        localFavs = localFavs.filter(id => id !== listingId);
      } else {
        localFavs.push(listingId);
      }

      localStorage.setItem('guest_favorites', JSON.stringify(localFavs));

      // Mettre à jour l'état réactif
      const listing = listings.value.find(l => l.id === listingId);
      if (listing) {
        listing.is_favorited = !isFavorited;
      }

      return { success: true, is_favorited: !isFavorited };
    }
  }

  // Fonction pour charger et synchroniser les favoris
  function loadLocalFavorites() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      const localFavs = JSON.parse(localStorage.getItem('guest_favorites') || '[]');
      listings.value.forEach(listing => {
        listing.is_favorited = localFavs.includes(listing.id);
      });
    }
  }

  async function fetchUserListings() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await listingService.getUserListings();
      userListings.value = response;
      return { success: true };
    } catch (err) {
      error.value = 'Erreur lors du chargement de vos annonces';
      console.error('Fetch user listings error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchFavorites() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await listingService.getFavorites();
      favorites.value = response;
      return { success: true };
    } catch (err) {
      error.value = 'Erreur lors du chargement des favoris';
      console.error('Fetch favorites error:', err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  }

  function clearError() {
    error.value = null;
  }

  function clearCurrentListing() {
    currentListing.value = null;
  }

  return {
    // State
    listings,
    currentListing,
    userListings,
    favorites,
    isLoading,
    error,

    // Getters
    premiumListings,
    recentListings,

    // Actions
    fetchListings,
    fetchListing,
    createNewListing,
    updateExistingListing,
    deleteExistingListing,
    toggleListingFavorite,
    fetchUserListings,
    fetchFavorites,
    loadLocalFavorites,
    clearError,
    clearCurrentListing
  };
});