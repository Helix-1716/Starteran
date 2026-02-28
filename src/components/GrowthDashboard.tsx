import { useState } from 'react';
import {
    Flame, Shield, TrendingUp, Award, Target,
    Lock, Activity, ArrowUpRight, CheckCircle2,
    Circle, ChevronRight, Star, Zap, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGame } from '../contexts/GameContext';
import {
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// Mock Data for Charts
const XP_HISTORY = [
    { name: 'Mon', xp: 4200 },
    { name: 'Tue', xp: 4450 },
    { name: 'Wed', xp: 4600 },
    { name: 'Thu', xp: 4900 },
    { name: 'Fri', xp: 5120 },
    { name: 'Sat', xp: 5800 },
    { name: 'Sun', xp: 6350 },
];

const WEEKLY_MISSIONS_INITIAL = [
    { id: 1, title: 'Complete 2 Micro-Internships', progress: 1, total: 2, xp: 500, type: 'Work', claimed: false },
    { id: 2, title: 'Win a Coding Battle', progress: 0, total: 1, xp: 300, type: 'Battle', claimed: false },
    { id: 3, title: 'Update Resume in Portfolio', progress: 1, total: 1, xp: 150, type: 'Profile', claimed: false },
];

const ACHIEVEMENTS = [
    { id: 1, title: 'First Victory', desc: 'Win your first live battle against another student.', date: '1 week ago', unlocked: true, icon: Zap },
    { id: 2, title: 'Community Helper', desc: 'Provide 10 verified answers in the community.', date: '3 days ago', unlocked: true, icon: Award },
    { id: 3, title: 'Micro-Intern Pro', desc: 'Consistently complete 5 micro-internships with top ratings.', date: '', unlocked: false, icon: Star },
    { id: 4, title: 'Hackathon Finalist', desc: 'Reach the top 10 in any verified global competition.', date: '', unlocked: false, icon: Target },
];

export default function GrowthDashboard() {
    const { addXp } = useGame();
    const [streakAction, setStreakAction] = useState(false);
    const [streakCount, setStreakCount] = useState(14);
    const [hasClaimedToday, setHasClaimedToday] = useState(false);
    const [missions, setMissions] = useState(WEEKLY_MISSIONS_INITIAL);
    const [isClaiming, setIsClaiming] = useState(false);

    // Calculate claimable XP dynamically
    const claimableMissions = missions.filter(m => m.progress >= m.total && !m.claimed);
    const totalClaimableXp = claimableMissions.reduce((sum, mission) => sum + mission.xp, 0);

    const handleClaimRewards = () => {
        if (totalClaimableXp === 0 || isClaiming) return;

        setIsClaiming(true);

        // Simulate network request
        setTimeout(() => {
            // Trigger Confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2563EB', '#FBBF24', '#34D399']
            });

            // Update Game Context
            addXp(totalClaimableXp, 'Weekly Growth Missions');

            // Mark missions as claimed
            setMissions(prev => prev.map(m =>
                (m.progress >= m.total) ? { ...m, claimed: true } : m
            ));

            setIsClaiming(false);
        }, 600);
    };

    // Simulate streak increase animation
    const triggerStreak = () => {
        if (hasClaimedToday) return;

        setStreakAction(true);

        // Trigger Confetti
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.15, x: 0.85 }, // Top right corner where the button is
            colors: ['#F97316', '#FBBF24', '#34D399']
        });

        setTimeout(() => {
            setStreakCount(prev => prev + 1);
            setHasClaimedToday(true);
            addXp(50, 'Daily Streak Claimed');
            setTimeout(() => setStreakAction(false), 500);
        }, 800);
    };

    return (
        <div className="min-h-full bg-[#F8FAFC] font-sans text-gray-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header & Streak System */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-900 mb-1">
                            <Activity className="w-7 h-7 text-[#2563EB]" />
                            Career Momentum
                        </h1>
                        <p className="text-gray-500 font-medium text-sm">Track your long-term growth and unlock new career milestones.</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        {/* Streak UI */}
                        <div
                            onClick={triggerStreak}
                            className={`flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 ${hasClaimedToday
                                    ? 'bg-gray-50 border-gray-100 cursor-default'
                                    : streakAction
                                        ? 'bg-orange-50 border-orange-200 scale-105 shadow-[0_8px_30px_rgb(249,115,22,0.12)] cursor-default'
                                        : 'bg-gray-50 hover:bg-gray-100 border-gray-100 hover:shadow-sm cursor-pointer hover:-translate-y-0.5'
                                } border border-transparent`}
                        >
                            <div className="relative flex items-center justify-center">
                                <Flame className={`w-6 h-6 transition-colors duration-500 ${hasClaimedToday || streakAction ? 'text-orange-500 fill-orange-500' : 'text-gray-400'} ${streakAction ? 'animate-pulse' : ''}`} />
                                {streakAction && (
                                    <span className="absolute -top-5 -right-3 text-orange-500 font-black text-sm animate-bounce">+1</span>
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className={`text-[15px] font-black leading-tight ${hasClaimedToday || streakAction ? 'text-orange-600' : 'text-gray-900'}`}>{streakCount} Day Streak</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                    <Shield className={`w-3.5 h-3.5 ${hasClaimedToday || streakAction ? 'text-orange-500' : 'text-emerald-500'}`} />
                                    <span className="pt-0.5">2 STREAK SHIELDS ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Momentum Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left & Center - Charts & Main Stats */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Quick Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Global Rank</span>
                                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                        <ArrowUpRight className="w-3 h-3" /> +12
                                    </span>
                                </div>
                                <div className="text-2xl font-black text-gray-900">#42</div>
                                <div className="text-xs font-medium text-gray-500 mt-1">Top 1% of all students</div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">College Position</span>
                                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                        <ArrowUpRight className="w-3 h-3" /> +3
                                    </span>
                                </div>
                                <div className="text-2xl font-black text-gray-900">#2</div>
                                <div className="text-xs font-medium text-gray-500 mt-1">Almost at the top!</div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skill Growth</span>
                                    <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                                </div>
                                <div className="text-2xl font-black text-gray-900">+18%</div>
                                <div className="text-xs font-medium text-gray-500 mt-1">vs last month</div>
                            </div>
                        </div>

                        {/* XP Momentum Graph */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">XP Velocity</h3>
                                    <p className="text-xs font-medium text-gray-500">Your learning and earning velocity over 7 days.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Growth Rate</span>
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={XP_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                            labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                                        />
                                        <Area type="monotone" dataKey="xp" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Achievements Timeline */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Award className="w-5 h-5 text-[#2563EB]" /> Validated Achievements
                            </h3>
                            <div className="space-y-6 border-l-2 border-gray-100 ml-3 pl-5 relative">
                                {ACHIEVEMENTS.map((ach) => {
                                    const Icon = ach.icon;
                                    return (
                                        <div key={ach.id} className="relative">
                                            {/* Timeline Dot */}
                                            <div className={`absolute -left-[30px] w-6 h-6 rounded-full flex items-center justify-center border-4 border-white ${ach.unlocked ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-gray-200 text-gray-400'}`}>
                                                {ach.unlocked ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                            </div>

                                            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 ${ach.unlocked ? 'opacity-100' : 'opacity-60'}`}>
                                                <div>
                                                    <h4 className={`font-bold text-sm ${ach.unlocked ? 'text-gray-900' : 'text-gray-500'} flex items-center gap-2`}>
                                                        <Icon className={`w-4 h-4 ${ach.unlocked ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                                                        {ach.title}
                                                    </h4>
                                                    <p className="text-xs font-medium text-gray-500 mt-1 max-w-sm leading-relaxed">{ach.desc}</p>
                                                </div>
                                                {ach.unlocked && (
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md shrink-0">
                                                        {ach.date}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Missions & Notifications */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Weekly AI Growth Missions */}
                        <div className="bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
                                        <Target className="w-5 h-5 text-indigo-600" /> AI Growth Missions
                                    </h3>
                                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md uppercase tracking-wider">Ends in 2d</span>
                                </div>
                                <p className="text-xs font-medium text-indigo-800/70 mb-6">Personalized tasks generated by AI to optimize your immediate career momentum.</p>

                                <div className="space-y-4">
                                    {missions.map(mission => (
                                        <div key={mission.id} className="bg-white border border-indigo-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    {mission.claimed ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    ) : mission.progress >= mission.total ? (
                                                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                                                    )}
                                                    <h4 className={`font-bold text-sm leading-tight ${mission.claimed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                                        {mission.title}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{mission.type}</span>
                                                <div className="flex items-center gap-2">
                                                    {mission.claimed ? (
                                                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-widest">Claimed</span>
                                                    ) : (
                                                        <>
                                                            <span className="text-xs font-bold font-mono text-gray-500">{mission.progress}/{mission.total}</span>
                                                            <span className="text-xs font-black text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">+{mission.xp} XP</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${mission.claimed ? 'bg-emerald-500' : 'bg-[#2563EB]'}`}
                                                    style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleClaimRewards}
                                    disabled={totalClaimableXp === 0 || isClaiming}
                                    className={`w-full mt-6 font-bold text-sm py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 ${isClaiming ? 'bg-indigo-400 text-white cursor-wait' :
                                        totalClaimableXp > 0 ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 text-white active:scale-95' :
                                            'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none'
                                        }`}
                                >
                                    {isClaiming ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Claiming...</>
                                    ) : totalClaimableXp > 0 ? (
                                        <>Claim +{totalClaimableXp} XP <ChevronRight className="w-4 h-4" /></>
                                    ) : (
                                        <>Complete missions to claim</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Recent Smart Alerts */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Smart Insights</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900"><strong className="font-bold">Momentum Alert:</strong> You are growing 12% faster than peers in your college.</p>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-1">2 hours ago</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <Award className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900"><strong className="font-bold">Social Compare:</strong> 5 friends just overtook you in Global Rank. Time to battle.</p>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-1">Yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
