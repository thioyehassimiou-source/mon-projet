import api from './api';

export async function getListings(params = {}) {
  const response = await api.get('/listings', { params });
  return response.data;
}

export async function getListing(id) {
  const response = await api.get(`/listings/${id}`);
  return response.data;
}

export async function createListing(data) {
  const response = await api.post('/listings', data);
  return response.data;
}

export async function updateListing(id, data) {
  const response = await api.put(`/listings/${id}`, data);
  return response.data;
}

export async function deleteListing(id) {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
}

export async function toggleFavorite(listingId) {
  // Support for favorites can be added to the User model or a separate Favorite model
  const response = await api.post(`/listings/${listingId}/favorite`);
  return response.data;
}

export async function getUserListings() {
  // We can filter by owner in the backend or have a specific route
  const response = await api.get('/listings', { params: { my_listings: true } });
  return response.data;
}

export async function getUserFavorites() {
  const response = await api.get('/auth/favorites');
  return response.data;
}
