import api from './api';

export async function chatWithAI(message) {
    const response = await api.post('/ai/chat', { message });
    return response.data;
}

export async function getAIChatHistory() {
    const response = await api.get('/ai/history');
    return response.data;
}
