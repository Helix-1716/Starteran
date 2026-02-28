import { useState } from 'react';
import { Search, CheckCheck, BellOff } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';

export default function ChatList() {
    const { contacts, activeChat, setActiveChat } = useChatContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = contacts.filter(contact =>
        contact.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`bg-white border-r border-gray-200 flex-col flex-shrink-0 z-20 ${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-[30%] md:min-w-[320px] md:max-w-[420px]`}>
            {/* Search */}
            <div className="px-3 py-2 bg-white border-b border-gray-100 shrink-0">
                <div className="relative flex items-center bg-gray-100 rounded-lg px-3 py-1.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 transition-all border border-transparent focus-within:border-blue-500">
                    <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search contacts"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none text-[15px] focus:ring-0 outline-none placeholder-gray-400 h-6 flex-1"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto bg-white">
                {filteredUsers.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 text-sm">No contacts found</div>
                ) : (
                    filteredUsers.map((chatUser) => (
                        <div
                            key={chatUser.id}
                            onClick={() => setActiveChat(chatUser)}
                            className={`flex items-center px-3 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeChat?.id === chatUser.id ? 'bg-blue-50' : ''
                                }`}
                        >
                            <div className="relative shrink-0 w-[49px] h-[49px]">
                                <img
                                    src={chatUser.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(chatUser.email || chatUser.full_name)}`}
                                    alt={chatUser.full_name}
                                    className="w-full h-full rounded-full object-cover bg-white"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(chatUser.email || chatUser.full_name)}`;
                                    }}
                                />
                                {chatUser.online && (
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 border-b border-gray-100 pb-3 -mb-3 ml-3">
                                <div className="flex items-center justify-between mb-0.5">
                                    <p className="text-[17px] text-gray-900 truncate">{chatUser.full_name}</p>
                                    <div className="flex items-center">
                                        {chatUser.isMuted && <BellOff className="w-3.5 h-3.5 text-gray-400 mr-1.5" />}
                                        {chatUser.lastMessageTime && (
                                            <span className={`text-[12px] ${chatUser.unreadCount && chatUser.unreadCount > 0 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                                                {chatUser.lastMessageTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center truncate text-[14px] text-gray-600 pr-2">
                                        {chatUser.lastMessage ? (
                                            <div className="flex items-center truncate">
                                                <CheckCheck className={`w-[15px] h-[15px] mr-1 shrink-0 ${chatUser.unreadCount === 0 ? 'text-blue-500' : 'text-gray-400'}`} />
                                                <p className={`truncate ${chatUser.unreadCount && chatUser.unreadCount > 0 ? 'font-medium text-gray-900' : ''}`}>{chatUser.lastMessage}</p>
                                            </div>
                                        ) : (
                                            <p className="truncate text-gray-400 text-sm italic">
                                                {chatUser.online ? "Online" : "Offline"}
                                            </p>
                                        )}
                                    </div>
                                    {chatUser.unreadCount && chatUser.unreadCount > 0 ? (
                                        <div className="w-[20px] h-[20px] bg-green-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shrink-0">
                                            {chatUser.unreadCount}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
