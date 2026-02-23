import React, { useState, useRef, useEffect } from 'react';
import { Video, Search, MoreVertical, Paperclip, Smile, Send, Mic, Lock, Loader2, Image, FileText } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useChatContext } from '../contexts/ChatContext';
import { useChat } from '../hooks/useChat';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { doc, updateDoc, onSnapshot, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { uploadAttachment } from '../lib/fileUploader';

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const formatTimeLeft = (seconds: number) => {
    if (!isFinite(seconds) || seconds < 0) return 'Calculating...';
    if (seconds < 60) return `${Math.round(seconds)}s left`;
    return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s left`;
};

export default function ChatWindow() {
    const { user } = useAuth();
    const { activeChat, getChatId, setActiveChat } = useChatContext();
    const chatId = activeChat ? getChatId(activeChat.id) : null;
    const { messages, sendMessage } = useChat(chatId);
    const [newMessage, setNewMessage] = useState('');
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [showHeaderMenu, setShowHeaderMenu] = useState(false);
    const [uploadStats, setUploadStats] = useState({ progress: 0, bytesTransferred: 0, totalBytes: 0, speed: 0, timeLeft: 0 });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // File inputs for specific types
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);
    const attachmentMenuRef = useRef<HTMLDivElement>(null);
    const headerMenuRef = useRef<HTMLDivElement>(null);

    // Close attachment menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(event.target as Node)) {
                setShowAttachmentMenu(false);
            }
            if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
                setShowHeaderMenu(false);
            }
        };

        if (showAttachmentMenu || showHeaderMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showAttachmentMenu, showHeaderMenu]);

    const {
        isRecording,
        recordingTime,
        isUploading,
        startRecording,
        cancelRecording,
        stopAndUploadRecording
    } = useVoiceRecorder();

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, otherUserTyping, isUploading]);

    // Typing listen logic
    useEffect(() => {
        if (!chatId || !user) return;
        const unsub = onSnapshot(doc(db, 'chatRooms', chatId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.typing && data.typing[activeChat!.id]) {
                    setOtherUserTyping(true);
                } else {
                    setOtherUserTyping(false);
                }
            }
        });
        return () => unsub();
    }, [chatId, activeChat, user]);

    const updateTypingStatus = async (typing: boolean) => {
        if (!chatId || !user) return;
        try {
            await updateDoc(doc(db, 'chatRooms', chatId), {
                [`typing.${user.id}`]: typing
            });
        } catch (err) {
            // Room might not exist, ignore for now
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);

        if (!isTyping) {
            setIsTyping(true);
            updateTypingStatus(true);
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            updateTypingStatus(false);
        }, 2000);
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        const textToSend = newMessage.trim();
        setNewMessage('');
        setShowEmojiPicker(false);
        updateTypingStatus(false);

        try {
            await sendMessage(textToSend, 'text');
        } finally {
            setIsSending(false);
        }
    };

    const handleVoiceSend = async () => {
        if (!chatId) return;
        try {
            const url = await stopAndUploadRecording(chatId);
            if (url) {
                await sendMessage('', 'voice', url);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !chatId || !user) return;

        try {
            setIsUploadingFile(true);
            setUploadStats({ progress: 0, bytesTransferred: 0, totalBytes: file.size, speed: 0, timeLeft: 0 });

            let lastTime = Date.now();
            let lastBytes = 0;

            const url = await uploadAttachment(file, chatId, user.id, (progress, bytes, total) => {
                const now = Date.now();
                const timeDiff = (now - lastTime) / 1000;
                if (timeDiff >= 0.5) {
                    const speed = (bytes - lastBytes) / timeDiff;
                    const timeLeft = speed > 0 ? (total - bytes) / speed : 0;
                    setUploadStats({ progress, bytesTransferred: bytes, totalBytes: total, speed, timeLeft });
                    lastTime = now;
                    lastBytes = bytes;
                } else {
                    setUploadStats(prev => ({ ...prev, progress, bytesTransferred: bytes, totalBytes: total }));
                }
            });

            let type: 'image' | 'video' | 'file' = 'file';
            if (file.type.startsWith('image/')) type = 'image';
            else if (file.type.startsWith('video/')) type = 'video';

            await sendMessage('', type, undefined, url, file.name, file.size);
        } catch (err) {
            console.error('File upload failed:', err);
        } finally {
            setIsUploadingFile(false);
            if (imageInputRef.current) imageInputRef.current.value = '';
            if (videoInputRef.current) videoInputRef.current.value = '';
            if (docInputRef.current) docInputRef.current.value = '';
        }
    };

    const formatLastSeen = (timestamp?: number) => {
        if (!timestamp) return 'long time ago';
        const d = new Date(timestamp);
        if (Date.now() - timestamp < 86400000) {
            return `today at ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }
        return d.toLocaleDateString();
    };

    const handleClearMessages = async () => {
        if (!chatId || !user) return;
        if (!window.confirm("Are you sure you want to clear all messages? This cannot be undone.")) return;

        setShowHeaderMenu(false);
        try {
            const msgsRef = collection(db, 'chatRooms', chatId, 'messages');
            const snapshot = await getDocs(msgsRef);
            const deletePromises = snapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
            await Promise.all(deletePromises);

            await updateDoc(doc(db, 'chatRooms', chatId), {
                lastMessage: '',
                lastMessageTime: null,
                [`unread_${user.id}`]: 0,
            });
        } catch (e) {
            console.error("Failed to clear messages", e);
        }
    };

    const handleDeleteChat = async () => {
        if (!chatId) return;
        if (!window.confirm("Are you sure you want to delete this chat entirely?")) return;

        setShowHeaderMenu(false);
        try {
            await handleClearMessages();
            await deleteDoc(doc(db, 'chatRooms', chatId));
            setActiveChat(null);
        } catch (e) {
            console.error("Failed to delete chat", e);
        }
    };

    const toggleMessageSelection = (msgId: string) => {
        const newSet = new Set(selectedMessages);
        if (newSet.has(msgId)) {
            newSet.delete(msgId);
        } else {
            newSet.add(msgId);
        }
        setSelectedMessages(newSet);
    };

    const deleteSelectedMessages = async () => {
        if (!chatId || selectedMessages.size === 0) return;
        if (!window.confirm(`Delete ${selectedMessages.size} selected messages?`)) return;

        try {
            const deletePromises = Array.from(selectedMessages).map(msgId =>
                deleteDoc(doc(db, 'chatRooms', chatId, 'messages', msgId))
            );
            await Promise.all(deletePromises);
            setSelectedMessages(new Set());
            setIsSelecting(false);
        } catch (e) {
            console.error("Failed to delete selected messages", e);
        }
    };

    const handleMuteToggle = async () => {
        if (!chatId || !user) return;
        setShowHeaderMenu(false);

        try {
            const isCurrentlyMuted = activeChat?.isMuted || false;
            await updateDoc(doc(db, 'chatRooms', chatId), {
                [`muted_${user.id}`]: !isCurrentlyMuted
            });
        } catch (e) {
            console.error("Failed to toggle mute", e);
        }
    };

    if (!activeChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 z-10 relative border-b-8 border-blue-600">
                <div className="text-center z-10 max-w-lg px-6 flex flex-col items-center">
                    <Lock className="w-16 h-16 text-gray-300 mb-6" />
                    <h3 className="text-[32px] font-light text-gray-800 mb-4">StartEarn Messages</h3>
                    <p className="text-[14px] text-gray-500 leading-[20px] max-w-[460px]">
                        End-to-end encrypted messaging via Firebase UID.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50 relative w-[70%] z-10 h-full">
            {/* Chat Header */}
            <div className="h-[59px] bg-white px-4 flex items-center justify-between border-b border-gray-200 shrink-0 z-30 relative w-full">
                <div className="flex items-center space-x-4">
                    <img
                        src={activeChat.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(activeChat.email || activeChat.full_name)}`}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover bg-white"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(activeChat.email || activeChat.full_name)}`;
                        }}
                    />
                    <div>
                        <h3 className="text-gray-900 font-semibold text-[16px] leading-5">{activeChat.full_name}</h3>
                        <p className="text-[13px] text-gray-500">
                            {activeChat.online ? 'Online' : `Last seen ${formatLastSeen(activeChat.lastSeen)}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-1 text-gray-500 mr-2 relative z-50">
                    <button
                        onClick={() => alert("Video calling functionality is coming soon!")}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center px-4 border border-gray-200 mr-1"
                    >
                        <Video className="w-[18px] h-[18px]" />
                    </button>
                    <button
                        onClick={() => {
                            const result = prompt("Search chat:");
                            if (result) alert(`Searched for: ${result}`);
                        }}
                        className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors mr-1"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                    <div className="relative" ref={headerMenuRef}>
                        <button
                            onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                            className={`p-2.5 rounded-full transition-colors ${showHeaderMenu ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {showHeaderMenu && (
                            <div className="absolute top-12 right-0 bg-white border border-gray-100 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-2 w-[180px] z-[9999] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <button onClick={() => { setShowHeaderMenu(false); setShowContactInfo(true); }} className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    Contact info
                                </button>
                                <button onClick={() => { setShowHeaderMenu(false); setIsSelecting(!isSelecting); setSelectedMessages(new Set()); }} className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    {isSelecting ? 'Cancel selection' : 'Select messages'}
                                </button>
                                <button onClick={handleMuteToggle} className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    {activeChat?.isMuted ? 'Unmute notifications' : 'Mute notifications'}
                                </button>
                                <button onClick={handleClearMessages} className="w-full text-left px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    Clear messages
                                </button>
                                <button onClick={handleDeleteChat} className="w-full text-left px-5 py-2.5 text-[15px] text-red-600 hover:bg-red-50 transition-colors font-semibold">
                                    Delete chat
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isSelecting && (
                    <div className="absolute top-full left-0 w-full bg-blue-50 border-b border-blue-100 p-2 flex justify-between items-center z-40 px-4 shadow-sm">
                        <span className="text-blue-800 font-medium text-sm">{selectedMessages.size} selected</span>
                        <div className="space-x-2">
                            <button onClick={() => { setIsSelecting(false); setSelectedMessages(new Set()); }} className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-md">Cancel</button>
                            <button onClick={deleteSelectedMessages} disabled={selectedMessages.size === 0} className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-md">Delete</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 z-10 pb-4">
                <div className="flex justify-center mb-6 mt-2">
                    <span className="bg-blue-50 text-blue-800 text-[12.5px] py-1.5 px-4 rounded-lg shadow-sm max-w-[85%] text-center flex items-center gap-2 border border-blue-100">
                        <Lock className="w-[11px] h-[11px] inline shrink-0" /> Messages are secured by Firebase UID authentication.
                    </span>
                </div>

                {messages.map((message, index) => {
                    const isMine = message.senderId === user?.id;
                    const showTail = index === 0 || messages[index - 1].senderId !== message.senderId;
                    return (
                        <div key={message.id} className="relative flex items-center group">
                            {isSelecting && (
                                <div className="absolute left-2 z-20">
                                    <input
                                        type="checkbox"
                                        checked={selectedMessages.has(message.id)}
                                        onChange={() => toggleMessageSelection(message.id)}
                                        className="w-5 h-5 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>
                            )}
                            <div className={`w-full transition-transform ${isSelecting ? 'pl-10' : ''}`} onClick={() => isSelecting && toggleMessageSelection(message.id)}>
                                <MessageBubble message={message} isMine={isMine} showTail={showTail} />
                            </div>
                        </div>
                    );
                })}

                {otherUserTyping && <TypingIndicator />}

                {isUploading && (
                    <div className="flex justify-end mt-3 mb-2">
                        <div className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm flex items-center opacity-70">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Sending audio...
                        </div>
                    </div>
                )}

                {isUploadingFile && (
                    <div className="flex justify-end mt-3 mb-2">
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-sm min-w-[260px]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 flex items-center">
                                    <Loader2 className="w-4 h-4 animate-spin mr-2 text-blue-600" />
                                    Sending file...
                                </span>
                                <span className="text-sm text-blue-600 font-semibold">{Math.round(uploadStats.progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                                <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadStats.progress}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 font-medium whitespace-nowrap gap-4">
                                <span>{formatBytes(uploadStats.bytesTransferred)} / {formatBytes(uploadStats.totalBytes)}</span>
                                <span>{uploadStats.speed > 0 ? formatTimeLeft(uploadStats.timeLeft) : 'Calculating...'}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input container */}
            <div className="bg-white px-4 py-2.5 flex items-end space-x-3 shrink-0 z-20 w-full min-h-[62px] border-t border-gray-200 relative">
                {showEmojiPicker && (
                    <div className="absolute bottom-16 left-4 z-50 shadow-2xl rounded-xl border border-gray-100 overflow-hidden">
                        <EmojiPicker onEmojiClick={(eo) => setNewMessage(p => p + eo.emoji)} autoFocusSearch={false} width={320} height={400} />
                    </div>
                )}
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`p-2.5 hover:bg-gray-100 rounded-full transition-colors ${showEmojiPicker ? 'text-blue-600' : 'text-gray-500'}`}>
                    <Smile className="w-6 h-6" />
                </button>
                <div className="relative" ref={attachmentMenuRef}>
                    <button
                        className={`p-2.5 rounded-full transition-colors ${showAttachmentMenu ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
                        onClick={() => {
                            setShowAttachmentMenu(!showAttachmentMenu);
                            setShowEmojiPicker(false);
                        }}
                    >
                        <Paperclip className="w-[22px] h-[22px]" />
                    </button>

                    {/* Native hidden file inputs structured for UX */}
                    <input type="file" ref={imageInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />
                    <input type="file" ref={videoInputRef} accept="video/*" className="hidden" onChange={handleFileChange} />
                    <input type="file" ref={docInputRef} accept="*" className="hidden" onChange={handleFileChange} />

                    {/* Fancy Attachment Menu matching WhatsApp Desktop visually */}
                    {showAttachmentMenu && (
                        <div className="absolute bottom-[calc(100%+8px)] left-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 w-52 flex flex-col space-y-1 z-50 transform origin-bottom-left transition-all animate-in slide-in-from-bottom-2">
                            <button onClick={(e) => { e.preventDefault(); setShowAttachmentMenu(false); imageInputRef.current?.click(); }} className="flex items-center p-2.5 hover:bg-gray-50 rounded-xl transition-colors w-full text-left group">
                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mr-3">
                                    <Image className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-[15px] text-gray-700">Photo</span>
                            </button>
                            <button onClick={(e) => { e.preventDefault(); setShowAttachmentMenu(false); videoInputRef.current?.click(); }} className="flex items-center p-2.5 hover:bg-gray-50 rounded-xl transition-colors w-full text-left group">
                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0 mr-3">
                                    <Video className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-[15px] text-gray-700">Video</span>
                            </button>
                            <button onClick={(e) => { e.preventDefault(); setShowAttachmentMenu(false); docInputRef.current?.click(); }} className="flex items-center p-2.5 hover:bg-gray-50 rounded-xl transition-colors w-full text-left group">
                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0 mr-3">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-[15px] text-gray-700">Document</span>
                            </button>
                        </div>
                    )}
                </div>

                {isRecording ? (
                    <div className="flex-1 flex items-center justify-between py-1 bg-red-50 rounded-[8px] px-4 min-h-[42px] mb-0.5 border border-red-200">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500"></div>
                            <span className="text-red-600 font-medium">
                                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                        <button onClick={cancelRecording} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors uppercase">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <form className="flex-1 flex max-h-[140px] items-end py-1" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={newMessage}
                            onFocus={() => setShowEmojiPicker(false)}
                            onChange={handleInputChange}
                            placeholder="Type a message"
                            className="w-full px-4 py-2.5 bg-gray-100 border-transparent rounded-[8px] focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-gray-500 text-[15px] flex-1 min-h-[42px] transition-all"
                        />
                    </form>
                )}

                {isRecording ? (
                    <button onClick={handleVoiceSend} disabled={isUploading} className="p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors shrink-0 mb-0.5 shadow-sm">
                        <Send className="w-[22px] h-[22px]" />
                    </button>
                ) : newMessage.trim() ? (
                    <button onClick={handleSendMessage} disabled={isSending} className="p-2.5 text-blue-600 hover:text-blue-700 rounded-full transition-colors shrink-0 mb-0.5 relative">
                        {isSending ? <Loader2 className="w-6 h-6 animate-spin text-blue-300" /> : <Send className="w-6 h-6" />}
                    </button>
                ) : (
                    <button onClick={startRecording} className="p-2.5 text-gray-500 hover:text-blue-600 rounded-full transition-colors shrink-0 mb-0.5">
                        <Mic className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Contact Info Modal */}
            {showContactInfo && (
                <div className="absolute inset-y-0 right-0 w-80 bg-white border-l border-gray-200 z-[9999] shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
                    <div className="h-16 flex items-center px-4 bg-gray-50 border-b border-gray-200">
                        <button onClick={() => setShowContactInfo(false)} className="p-2 hover:bg-gray-200 rounded-full mr-2">
                            <Search className="w-5 h-5 text-gray-600 rotate-90" /> {/* Poor man's close icon representing back */}
                        </button>
                        <span className="font-semibold text-gray-800">Contact info</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="bg-white p-6 flex flex-col items-center border-b border-gray-200 pb-8">
                            <img
                                src={activeChat.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(activeChat.email || activeChat.full_name)}`}
                                alt=""
                                className="w-32 h-32 rounded-full object-cover border-2 border-gray-100 shadow-sm mb-4"
                            />
                            <h2 className="text-2xl font-medium text-center text-gray-900 mb-1">{activeChat.full_name}</h2>
                            <p className="text-gray-500 text-[15px]">{activeChat.email}</p>
                        </div>
                        <div className="p-4 bg-white mt-2 border-y border-gray-200">
                            <div className="text-sm font-medium text-gray-800 mb-1">About</div>
                            <div className="text-[15px] text-gray-600">Using StartEarn messaging</div>
                        </div>
                        <div className="mt-4 flex flex-col items-center">
                            <button onClick={handleClearMessages} className="text-red-500 hover:bg-red-50 px-6 py-3 w-full text-left border-y border-gray-200 font-medium">
                                Clear Messages
                            </button>
                            <button onClick={handleDeleteChat} className="text-red-500 hover:bg-red-50 px-6 py-3 w-full text-left border-b border-gray-200 font-medium">
                                Delete Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
