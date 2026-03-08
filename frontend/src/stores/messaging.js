import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { messageService } from '@/services/api-fetch';

export const useMessagingStore = defineStore('messaging', () => {
    const conversations = ref([]);
    const currentConversation = ref(null);
    const messages = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchConversations() {
        isLoading.value = true;
        try {
            const response = await messageService.getConversations();
            conversations.value = response;
        } catch (err) {
            error.value = 'Erreur lors du chargement des conversations';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchMessages(otherUserId) {
        isLoading.value = true;
        try {
            const response = await messageService.getConversation(otherUserId);
            messages.value = response;
            currentConversation.value = conversations.value.find(c => c.id === otherUserId);
        } catch (err) {
            error.value = 'Erreur lors du chargement des messages';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    }

    async function sendNewMessage(id_destinataire, text) {
        try {
            const newMessage = await messageService.sendMessage(id_destinataire, text);
            messages.value.push(newMessage);

            // Mettre à jour le dernier message de la conversation
            const conv = conversations.value.find(c => c.id === id_destinataire);
            if (conv) {
                conv.last_message = text;
                conv.last_message_date = new Date().toISOString();
            }
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, error: err.message };
        }
    }

    async function startConversationAction(listingId, ownerId, message = "Bonjour, je suis intéressé par votre annonce.") {
        isLoading.value = true;
        try {
            const response = await messageService.startConversation(ownerId, listingId, message);
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
