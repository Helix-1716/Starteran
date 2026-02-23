import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth, UserProfile } from './AuthContext';

interface Contact extends UserProfile {
    unreadCount?: number;
    lastMessage?: string;
    lastMessageTime?: string;
    timestampMillis?: number;
    isMuted?: boolean;
}

interface ChatContextType {
    contacts: Contact[];
    activeChat: Contact | null;
    setActiveChat: (contact: Contact | null) => void;
    getChatId: (otherUserId: string) => string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [activeChat, setActiveChat] = useState<Contact | null>(null);
    const [chatRoomsData, setChatRoomsData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (!user) {
            setContacts([]);
            return;
        }

        // List all users from 'users' collection who aren't the current user
        const usersQuery = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            const usersData = snapshot.docs
                .map(doc => doc.data() as Contact)
                .filter(u => u.id && u.id !== user.id);

            setContacts(usersData);
        });

        return () => unsubscribe();
    }, [user]);

    // Setup listener for each chat room metadata to get lastMessage and unreadCount
    useEffect(() => {
        if (!user || contacts.length === 0) return;

        const unsubs = contacts.map(contact => {
            const chatId = [user.id, contact.id].sort().join('_');
            return onSnapshot(doc(db, 'chatRooms', chatId), (docSnap) => {
                if (docSnap.exists()) {
                    setChatRoomsData(prev => ({ ...prev, [contact.id]: docSnap.data() }));
                }
            });
        });

        return () => unsubs.forEach(u => u());
    }, [user, contacts.map(c => c.id).join(',')]);

    const getChatId = (otherUserId: string) => {
        if (!user) return '';
        return [user.id, otherUserId].sort().join('_');
    };

    // Merge contacts with chat metadata and sort by most recent message
    const contactsWithMeta = contacts.map(c => {
        const meta = chatRoomsData[c.id];
        const timeMillis = meta?.lastMessageTime?.toMillis?.() || 0;
        const formattedTime = timeMillis
            ? new Date(timeMillis).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            : undefined;

        return {
            ...c,
            lastMessage: meta?.lastMessage,
            lastMessageTime: formattedTime,
            unreadCount: meta?.[`unread_${user?.id}`] || 0,
            timestampMillis: timeMillis,
            isMuted: meta?.[`muted_${user?.id}`] || false
        };
    }).sort((a, b) => {
        const timeA = a.timestampMillis || 0;
        const timeB = b.timestampMillis || 0;
        if (timeB !== timeA) {
            return timeB - timeA;
        }
        // Fallback to alphabetical sort to ensure stable rendering
        return (a.full_name || '').localeCompare(b.full_name || '');
    });

    const currentActiveChat = activeChat ? contactsWithMeta.find(c => c.id === activeChat.id) || activeChat : null;

    const value = {
        contacts: contactsWithMeta,
        activeChat: currentActiveChat,
        setActiveChat,
        getChatId
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}
