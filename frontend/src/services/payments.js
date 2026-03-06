import api from './api';

export async function initiatePayment(listingId, amount, paymentMethod) {
    const response = await api.post('/payments/initiate', { listingId, amount, paymentMethod });
    return response.data;
}

export async function getPaymentHistory() {
    const response = await api.get('/payments/history');
    return response.data;
}
