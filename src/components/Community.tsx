import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, CheckCircle2, Users, ArrowUpCircle,
    Medal, TrendingUp, Sparkles, Send, Bot,
    ChevronDown, Calendar
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';

// Types
interface Room {
    id: string;
    title: string;
    hostName: string;
    hostCompany: string;
    hostAvatar: string;
    type: 'live' | 'upcoming' | 'discussion';
    participantCount: number;
    time?: string;
}

interface Contributor {
    id: string;
    name: string;
    avatar: string;
    score: number;
    trend: 'up' | 'stable';
    college: string;
}

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    isTyping?: boolean;
}

// Mock Data
const MOCK_ROOMS: Room[] = [
    {
        id: '1',
        title: 'Startup Founder AMA - Scaling from 0 to 1',
        hostName: 'Sarah Jenkins',
        hostCompany: 'TechVentures',
        hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        type: 'live',
        participantCount: 142
    },
    {
        id: '2',
        title: 'FAANG Recruiter Q&A - Resume Tips',
        hostName: 'David Chen',
        hostCompany: 'Google',
        hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        type: 'upcoming',
        participantCount: 89,
        time: 'Today, 6:00 PM'
    },
    {
        id: '3',
        title: 'Hackathon Strategy Masterclass',
        hostName: 'Alex River',
        hostCompany: 'StartEarn Pro',
        hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        type: 'live',
        participantCount: 315
    },
    {
        id: '4',
        title: 'Internship Guidance & AI Tools',
        hostName: 'Maya Patel',
        hostCompany: 'OpenAI',
        hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        type: 'discussion',
        participantCount: 56
    }
];

const TOP_CONTRIBUTORS: Contributor[] = [
    { id: '1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', score: 1420, trend: 'up', college: 'MIT' },
    { id: '2', name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', score: 980, trend: 'up', college: 'Stanford' },
    { id: '3', name: 'You (Anirban)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anirban', score: 840, trend: 'up', college: 'Your College' },
];

export default function Community() {
    const { xp, level, levelTitle, addXp } = useGame();

    // AI Mentor State
    const [isMentorOpen, setIsMentorOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            text: `Hi Anirban! I am your AI Career Mentor. I have analyzed your profile (Level ${level} - ${levelTitle}). How can I help you grow today?`,
            sender: 'ai'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMentorMessage = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: ChatMessage = { id: Date.now().toString(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Add typical "typing" indicator
        const typingId = 'typing-' + Date.now();
        setMessages(prev => [...prev, { id: typingId, text: '', sender: 'ai', isTyping: true }]);

        // Simulate AI response after 1.5s
        setTimeout(() => {
            let aiResponse = "";
            if (text.includes("Analyze")) {
                aiResponse = "Based on your current ~1240 XP and participation history:\n• **Strengths:** High engagement in hackathons.\n• **Gap Area:** Leadership and open-source contributions.\n• **Recommendation:** Try mentoring a junior team in the next event to boost your leadership score by ~20%.";
            } else if (text.includes("Next Move")) {
                aiResponse = `Here are your next 3 optimal growth actions:\n1. **Join** the 'FAANG Recruiter Q&A' room tonight.\n2. **Apply** for the 'Web3 Frontend Internship' (82% Match).\n3. **Complete** 2 more community help responses to hit Level ${level + 1}!`;
            } else {
                aiResponse = "That's a great question. Research shows that consistent daily coding sprints and answering questions in the Community Rooms increase your recruiter visibility by 3x. Keep pushing!";
            }

            setMessages(prev => prev.map(m => m.id === typingId ? { id: Date.now().toString(), text: aiResponse, sender: 'ai' } : m));

            // Randomly award 10 XP for using the mentor
            if (Math.random() > 0.5) addXp(10, 'Career Learning');

        }, 1500);
    };

    return (
        <div className="flex h-full bg-[#F8FAFC] font-sans text-gray-900 relative">

            {/* Main Content Area (Scrollable Grid) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:pr-[360px]"> {/* Leave room for fixed panel on desktop */}

                <div className="max-w-4xl mx-auto space-y-10">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Users className="w-8 h-8 text-[#2563EB]" />
                            Community & Network
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Collaborate, learn from verified founders, and rise through the community ranks.</p>
                    </div>

                    {/* Section 1: Verified Rooms */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Verified Career Rooms</h2>
                            <button className="text-[#2563EB] text-sm font-semibold hover:underline">View All</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {MOCK_ROOMS.map(room => (
                                <div key={room.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            {room.type === 'live' && <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md"><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" /> LIVE</span>}
                                            {room.type === 'upcoming' && <span className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-1 rounded-md"><Calendar className="w-3.5 h-3.5" /> UPCOMING</span>}
                                            {room.type === 'discussion' && <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md"><MessageSquare className="w-3.5 h-3.5" /> FORUM</span>}
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                                            <Users className="w-4 h-4" /> {room.participantCount}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1">{room.title}</h3>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3">
                                            <img src={room.hostAvatar} alt={room.hostName} className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50" />
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-bold text-gray-900">{room.hostName}</span>
                                                    <div className="relative group flex items-center justify-center">
                                                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] fill-blue-50" />
                                                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-max bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                                                            Verified by StartEarn
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium text-gray-500">{room.hostCompany}</span>
                                            </div>
                                        </div>
                                        <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded-lg text-sm transition-colors shadow-sm">
                                            Join {room.type === 'live' ? 'Room' : 'Waitlist'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Contribution Ecosystem */}
                    <section className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Medal className="w-6 h-6 text-[#2563EB]" /> Community Help Score
                                </h2>
                                <p className="text-sm text-gray-500 font-medium">Gain XP by answering questions and getting 'Helpful' upvotes.</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-[#2563EB]">{xp}</div>
                                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">Your Total XP</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-2">Top Contributors This Week</h3>
                            {TOP_CONTRIBUTORS.map((contributor, i) => (
                                <div key={contributor.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-3 rounded-xl border gap-3 sm:gap-0 ${contributor.id === '3' ? 'border-[#2563EB] bg-blue-50/30' : 'border-gray-100 bg-gray-50/50'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 text-center font-bold text-gray-400">#{i + 1}</div>
                                        <img src={contributor.avatar} alt={contributor.name} className="w-10 h-10 rounded-full border border-gray-200 bg-white shrink-0" />
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">{contributor.name}</div>
                                            <div className="text-xs font-medium text-gray-500">{contributor.college}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-10 sm:pl-0 w-full sm:w-auto">
                                        <div className="flex flex-col items-start sm:items-end">
                                            <div className="font-bold text-[#2563EB]">{contributor.score} <span className="text-xs text-gray-400">XP</span></div>
                                            {contributor.trend === 'up' && <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><ArrowUpCircle className="w-3 h-3" /> Rising</span>}
                                        </div>
                                        <button className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 transition-colors cursor-help group shrink-0 shadow-sm">
                                            <ArrowUpCircle className="w-4 h-4 text-emerald-500 group-hover:-translate-y-0.5 transition-transform" />
                                            Helpful
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* AI Mentor - Fixed Right Panel (Desktop) / Bottom Modal (Mobile) */}

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMentorOpen(!isMentorOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-[60] shrink-0 bg-[#2563EB] text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-transform active:scale-95 flex items-center gap-2"
            >
                <Bot className="w-6 h-6" />
                {messages.length > 1 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#2563EB] rounded-full animate-pulse" />}
            </button>

            {/* AI Panel */}
            <aside className={`
                fixed lg:absolute top-0 right-0 z-[70] lg:z-10 bg-white h-full 
                w-full lg:w-[360px] border-l border-gray-200 shadow-2xl lg:shadow-none flex flex-col
                transition-transform duration-300 ease-in-out
                ${isMentorOpen ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-y-0 lg:translate-x-full'}
            `}>

                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#2563EB]">
                                <Bot className="w-6 h-6" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base leading-tight">AI Career Mentor</h3>
                            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Online & Personalized
                            </p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={() => setIsMentorOpen(false)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Social Proof Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border-b border-blue-100 shrink-0 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-xs font-semibold text-[#2563EB]">Students utilizing AI Mentor improved match rates by 34%.</span>
                </div>

                {/* Chat Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`
                                    max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm
                                    ${msg.sender === 'user'
                                        ? 'bg-[#2563EB] text-white rounded-br-sm'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                                    }
                                `}>
                                    {msg.isTyping ? (
                                        <div className="flex items-center gap-1.5 h-5">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    ) : (
                                        <div dangerouslySetInnerHTML={{
                                            // Quick simple markdown parser for bold and lists
                                            __html: msg.text
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n• /g, '<br/>• ')
                                                .replace(/\n1\. /g, '<br/>1. ')
                                                .replace(/\n2\. /g, '<br/>2. ')
                                                .replace(/\n3\. /g, '<br/>3. ')
                                        }} />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                        <button onClick={() => handleSendMentorMessage("Analyze My Profile")} className="shrink-0 bg-blue-50 text-[#2563EB] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                            Analyze My Profile
                        </button>
                        <button onClick={() => handleSendMentorMessage("Suggest My Next Move")} className="shrink-0 bg-blue-50 text-[#2563EB] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                            Suggest My Next Move
                        </button>
                        <button onClick={() => handleSendMentorMessage("How Can I Improve My Leadership?")} className="shrink-0 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                            Improve Leadership
                        </button>
                    </div>
                    {/* Input */}
                    <div className="relative mt-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMentorMessage(inputValue)}
                            placeholder="Ask for career guidance..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
                        />
                        <button
                            onClick={() => handleSendMentorMessage(inputValue)}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${inputValue.trim() ? 'bg-[#2563EB] text-white shadow-sm' : 'text-gray-400'}`}
                            disabled={!inputValue.trim()}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </aside>

            {/* Desktop Overlay for Mobile Drawer */}
            {isMentorOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[65] lg:hidden"
                    onClick={() => setIsMentorOpen(false)}
                />
            )}

        </div>
    );
}
