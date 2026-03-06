import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getConversations, getMessages, sendMessage, startConversation } from '@/services/messaging';

export const useMessagingStore = defineStore('messaging', () => {
    const conversations = ref([]);
    const currentConversation = ref(null);
    const messages = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchConversations() {
        isLoading.value = true;
        try {
            const response = await getConversations();
            conversations.value = response.results || response;
        } catch (err) {
            error.value = 'Erreur lors du chargement des conversations';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchMessages(conversationId) {
        isLoading.value = true;
        try {
            const response = await getMessages(conversationId);
            messages.value = response.results || response;
            currentConversation.value = conversations.value.find(c => c.id === conversationId);
        } catch (err) {
            error.value = 'Erreur lors du chargement des messages';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    }

    async function sendNewMessage(conversationId, text) {
        try {
            const newMessage = await sendMessage(conversationId, text);
            messages.value.push(newMessage);

            // Mettre à jour le dernier message de la conversation
            const conv = conversations.value.find(c => c.id === conversationId);
            if (conv) {
                conv.last_message = text;
                conv.updated_at = new Date().toISOString();
            }
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false };
        }
    }

    async function startConversationAction(listingId, message = "Bonjour, je suis intéressé par votre annonce.") {
        isLoading.value = true;
        try {
            const response = await startConversation(listingId, message);
            // On rafraîchit la liste pour inclure la nouvelle conversation
            await fetchConversations();
            return { success: true, conversation: response };
        } catch (err) {
            error.value = 'Erreur lors de la création de la conversation';
            console.error(err);
            return { success: false, error: error.value };
        } finally {
            isLoading.value = false;
        }
    }

    return {
        conversations,
        currentConversation,
        messages,
        isLoading,
        error,
        fetchConversations,
        fetchMessages,
        sendNewMessage,
        startConversationAction
    };
});
