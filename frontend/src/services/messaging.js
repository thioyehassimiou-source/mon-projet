import api from './api';

export async function getConversations() {
    const response = await api.get('/messaging/conversations/');
    return response.data;
}

export async function getMessages(conversationId) {
    const response = await api.get(`/messaging/conversations/${conversationId}/messages/`);
    return response.data;
}

export async function sendMessage(conversationId, text) {
    const response = await api.post(`/messaging/conversations/${conversationId}/messages/`, { text });
    return response.data;
}

export async function startConversation(listingId, message) {
    const response = await api.post('/messaging/conversations/', { listing_id: listingId, initial_message: message });
    return response.data;
}
