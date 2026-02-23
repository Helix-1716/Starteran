import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    getDocs,
    doc,
    updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Helper to create or fetch a unique chat between two people
export const getOrCreateChatId = async (user1Id: string, user2Id: string) => {
    // Standardize the ID so it doesn't matter who clicked who
    const sortedIds = [user1Id, user2Id].sort();
    const uniqueChatId = `${sortedIds[0]}_${sortedIds[1]}`;
    return uniqueChatId;
};

// Step 1: Subscribe to messages directly
export const subscribeToMessages = (chatId: string, callback: (messages: any[]) => void) => {
    const q = query(
        collection(db, 'messages'),
        where('chatId', '==', chatId),
        orderBy('timestamp', 'asc')
    );

    // This creates an active websocket with Firebase.
    // Every time a new message is added to this chatId, it calls this code!
    return onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Ensure timestamp converts properly to JS Dates for our UI
            timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));

        callback(messagesData);
    });
};

// Send a new message to the database
export const sendMessage = async (
    chatId: string,
    senderId: string,
    senderName: string,
    content: string,
    type: 'text' | 'audio' | 'image' | 'file' = 'text',
    audioUrl?: string
) => {
    try {
        const payload: any = {
            chatId,
            senderId,
            senderName,
            content,
            type,
            status: 'sent', // Initially sent
            timestamp: serverTimestamp(), // Very important: Uses Firebase Server Time
        };
        if (audioUrl) {
            payload.audioUrl = audioUrl;
            payload.content = "🎙️ Voice Message";
        }
        await addDoc(collection(db, 'messages'), payload);
    } catch (e) {
        console.error("Error sending message: ", e);
    }
};

// Step 3: Mark incoming messages as read
export const markMessagesAsRead = async (chatId: string, currentUserId: string) => {
    try {
        const q = query(
            collection(db, 'messages'),
            where('chatId', '==', chatId),
            where('senderId', '!=', currentUserId),
            where('status', 'in', ['sent', 'delivered'])
        );

        const snapshot = await getDocs(q);

        // Loop through unread messages and update their status to 'read'
        snapshot.forEach(async (messageDoc) => {
            await updateDoc(doc(db, 'messages', messageDoc.id), {
                status: 'read'
            });
        });
    } catch (e) {
        console.error("Error marking messages as read: ", e);
    }
};
