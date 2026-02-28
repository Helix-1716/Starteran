import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, GraduationCap, Crown, Zap } from 'lucide-react';

interface LeaderboardUser {
    id: string;
    rank: number;
    name: string;
    xp: number;
    levelTitle: string;
    avatar: string;
    isCurrentUser?: boolean;
}

const mockGlobalUsers: LeaderboardUser[] = [
    { id: '1', rank: 1, name: 'Alex Thompson', xp: 24500, levelTitle: 'Legend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: '2', rank: 2, name: 'Sarah Chen', xp: 23100, levelTitle: 'Legend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: '3', rank: 3, name: 'Mike Johnson', xp: 21800, levelTitle: 'Grandmaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    { id: '4', rank: 4, name: 'Emma Davis', xp: 19400, levelTitle: 'Grandmaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    { id: '5', rank: 5, name: 'You (Anirban)', xp: 1240, levelTitle: 'Rising Star', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anirban', isCurrentUser: true },
    { id: '6', rank: 6, name: 'Chris Lee', xp: 1100, levelTitle: 'Rising Star', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' },
];

const mockCollegeUsers: LeaderboardUser[] = [
    { id: '3', rank: 1, name: 'Mike Johnson', xp: 21800, levelTitle: 'Grandmaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    { id: '5', rank: 2, name: 'You (Anirban)', xp: 1240, levelTitle: 'Rising Star', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anirban', isCurrentUser: true },
    { id: '6', rank: 3, name: 'Chris Lee', xp: 1100, levelTitle: 'Rising Star', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' },
];

const mockFriendsUsers: LeaderboardUser[] = [
    { id: '5', rank: 1, name: 'You (Anirban)', xp: 1240, levelTitle: 'Rising Star', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anirban', isCurrentUser: true },
    { id: '7', rank: 2, name: 'David Smith', xp: 950, levelTitle: 'Novice Learner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
];

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState<'global' | 'college' | 'friends'>('global');

    const getUsers = () => {
        switch (activeTab) {
            case 'global': return mockGlobalUsers;
            case 'college': return mockCollegeUsers;
            case 'friends': return mockFriendsUsers;
            default: return mockGlobalUsers;
        }
    };

    const users = getUsers();

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-500 bg-yellow-50 border-yellow-200';
        if (rank === 2) return 'text-gray-500 bg-gray-50 border-gray-200';
        if (rank === 3) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-gray-500 bg-white border-gray-100';
    };

    return (
        <div className="min-h-full bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] font-sans selection:bg-blue-100 text-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto pt-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                            <Trophy className="w-8 h-8 text-[#2563EB]" />
                            Leaderboard
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Climb the ranks by completing tasks, projects, and hackathons.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-white border border-gray-200 rounded-xl w-full md:w-fit mb-8 shadow-sm">
                    <button
                        onClick={() => setActiveTab('global')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${activeTab === 'global' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                        <Zap className="w-4 h-4" /> Global
                    </button>
                    <button
                        onClick={() => setActiveTab('college')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${activeTab === 'college' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                        <GraduationCap className="w-4 h-4" /> College
                    </button>
                    <button
                        onClick={() => setActiveTab('friends')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${activeTab === 'friends' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                        <Users className="w-4 h-4" /> Friends
                    </button>
                </div>

                {/* List */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {users.map((user, index) => (
                            <motion.div
                                key={user.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`flex items-center justify-between p-4 rounded-2xl border ${user.isCurrentUser ? 'border-[#2563EB] bg-blue-50/30 shadow-md' : 'border-gray-200 bg-white hover:shadow-sm transition-shadow'}`}
                            >
                                <div className="flex items-center gap-4 md:gap-6 w-full">
                                    {/* Rank */}
                                    <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-xl font-bold text-lg border ${getRankColor(user.rank)}`}>
                                        {user.rank <= 3 ? <Crown className="w-5 h-5 md:w-6 md:h-6" /> : `#${user.rank}`}
                                    </div>

                                    {/* Avatar & Info */}
                                    <div className="flex items-center gap-3 md:gap-4 flex-1">
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white shadow-sm" />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 text-sm md:text-base flex items-center gap-2">
                                                {user.name}
                                                {user.isCurrentUser && <span className="bg-[#2563EB] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">You</span>}
                                            </span>
                                            <span className="text-gray-500 text-xs md:text-sm font-medium">{user.levelTitle}</span>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="text-right">
                                        <div className="font-bold text-[#2563EB] text-base md:text-lg">{user.xp.toLocaleString()}</div>
                                        <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">XP</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
