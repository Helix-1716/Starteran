import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, setDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { createMessageNotification } from '../lib/notificationService';

export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    text: string;
    type: 'text' | 'voice' | 'image' | 'video' | 'file';
    createdAt: any;
    status: 'sent' | 'delivered' | 'read';
    voiceUrl?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
}

export function useChat(chatId: string | null) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!chatId) {
            setMessages([]);
            return;
        }

        const q = query(
            collection(db, 'chatRooms', chatId, 'messages'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgsData = snapshot.docs.map(doc => {
                const data = doc.data();
                let dateObj = new Date(); // fallback
                if (data.createdAt) {
                    if (typeof data.createdAt.toDate === 'function') {
                        dateObj = data.createdAt.toDate();
                    } else if (typeof data.createdAt === 'number' || typeof data.createdAt === 'string') {
                        dateObj = new Date(data.createdAt);
                    }
                }

                return {
                    id: doc.id,
                    ...data,
                    createdAt: dateObj,
                } as ChatMessage;
            });

            setMessages(msgsData);

            // Auto-mark as read if they are from the other user
            if (user) {
                const unreadMsgs = msgsData.filter(msg => msg.senderId !== user.id && msg.status !== 'read');

                if (unreadMsgs.length > 0) {
                    // Update unread status individually (non-blocking)
                    unreadMsgs.forEach(msg => {
                        updateDoc(doc(db, 'chatRooms', chatId, 'messages', msg.id), {
                            status: 'read'
                        }).catch(console.warn);
                    });

                    // Update total unread metadata counters
                    setDoc(doc(db, 'chatRooms', chatId), {
                        [`unread_${user.id}`]: 0
                    }, { merge: true }).catch(console.warn);
                }
            }
        });

        return () => unsubscribe();
    }, [chatId, user]);

    const sendMessage = async (
        text: string,
        type: 'text' | 'voice' | 'image' | 'video' | 'file' = 'text',
        voiceUrl?: string,
        fileUrl?: string,
        fileName?: string,
        fileSize?: number
    ) => {
        if (!chatId || !user) return;

        const payload: any = {
            senderId: user.id,
            senderName: user.full_name || 'User',
            text,
            type,
            status: 'sent',
            createdAt: serverTimestamp(),
        };

        if (voiceUrl) payload.voiceUrl = voiceUrl;
        if (fileUrl) payload.fileUrl = fileUrl;
        if (fileName) payload.fileName = fileName;
        if (fileSize) payload.fileSize = fileSize;

        await addDoc(collection(db, 'chatRooms', chatId, 'messages'), payload);

        // Update WhatsApp-style Chat Room Metadata for unread checks
        const otherUserId = chatId.split('_').find(id => id !== user.id);
        if (otherUserId) {
            let lastMsgText = text;
            if (type === 'voice') lastMsgText = '🎙️ Voice Message';
            else if (type === 'image') lastMsgText = '📷 Image';
            else if (type === 'video') lastMsgText = '🎥 Video';
            else if (type === 'file') lastMsgText = '📄 File';

            await setDoc(doc(db, 'chatRooms', chatId), {
                lastMessage: lastMsgText,
                lastMessageTime: serverTimestamp(),
                updatedAt: serverTimestamp(),
                [`unread_${otherUserId}`]: increment(1)
            }, { merge: true });

            // Push to global notification bell listener IF not muted by the target user
            const roomDoc = await getDoc(doc(db, 'chatRooms', chatId));
            const isTargetUserMuted = roomDoc.data()?.[`muted_${otherUserId}`];

            if (!isTargetUserMuted) {
                await createMessageNotification(
                    otherUserId,
                    user.full_name || 'User',
                    lastMsgText
                ).catch(err => console.warn("Failed sending notification", err));
            }
        }
    };

    return {
        messages,
        sendMessage
    };
}
