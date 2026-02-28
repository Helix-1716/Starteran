import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Zap, Target, Brain, ArrowRight, Award } from 'lucide-react';

// Interfaces
interface Opportunity {
    id: string;
    name: string;
    organizer: string;
    matchScore: number;
    winProbability: number;
    explanation: string;
    details: string;
}

interface SkillData {
    subject: string;
    A: number;
    fullMark: number;
}

// -------------------------------------------------------------------
// 1. MATCH SCORE RING COMPONENT
// -------------------------------------------------------------------
const MatchScoreRing = ({ score }: { score: number }) => {
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = score / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= score) {
                setCurrentScore(score);
                clearInterval(timer);
            } else {
                setCurrentScore(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [score]);

    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (currentScore / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
                <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    className="stroke-gray-200"
                    strokeWidth="4"
                    fill="none"
                />
                <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    className="stroke-[#2563EB] transition-all duration-300 ease-out"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-[#2563EB] font-bold text-sm">
                {currentScore}%
            </span>
        </div>
    );
};

// -------------------------------------------------------------------
// 2. AI MATCH CARD COMPONENT
// -------------------------------------------------------------------
const AIMatchCard = ({ opp }: { opp: Opportunity }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 relative group transition-all"
        >
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">

                {/* Left Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-[#2563EB]" />
                        <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
                            {opp.winProbability}% Win Probability
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#2563EB] transition-colors">
                        {opp.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 font-medium">by {opp.organizer}</p>

                    <div className="relative mb-5 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <p className="text-gray-700 text-sm leading-relaxed italic">
                            "{opp.explanation}"
                        </p>
                    </div>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-gray-600 text-sm mb-5 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100"
                            >
                                <p className="font-semibold text-gray-800 mb-2">AI Match Analysis:</p>
                                {opp.details}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-colors">
                            Apply Now <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 px-3 py-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
                        >
                            {expanded ? (
                                <><ChevronUp className="w-4 h-4" /> Close</>
                            ) : (
                                <><ChevronDown className="w-4 h-4" /> Why this matches you</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Content - Score */}
                <div className="flex flex-row md:flex-col items-center justify-between md:justify-center bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl border border-gray-100 md:border-none shrink-0 gap-3 md:gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium hidden md:block">Match Score</span>
                    <MatchScoreRing score={opp.matchScore} />
                </div>
            </div>
        </motion.div>
    );
};

// -------------------------------------------------------------------
// 3. SKILL RADAR COMPONENT
// -------------------------------------------------------------------
const SkillRadar = ({ data }: { data: SkillData[] }) => {
    return (
        <div className="w-full h-[300px] flex items-center justify-center relative bg-white rounded-xl">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#2563EB"
                        strokeWidth={2}
                        fill="url(#colorUv)"
                        fillOpacity={0.2}
                        isAnimationActive={true}
                        animationDuration={1500}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: '#111827' }}
                        itemStyle={{ color: '#2563EB', fontWeight: 'bold' }}
                        cursor={false}
                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

// -------------------------------------------------------------------
// 4. AI INSIGHT PANEL COMPONENT
// -------------------------------------------------------------------
const AIInsightPanel = ({ weakSkill }: { weakSkill: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB]" />

            <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-gray-900 font-bold text-lg">Where You Can Improve</h3>
            </div>

            <div className="space-y-5">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Identified Area:</p>
                    <p className="text-gray-800 font-semibold mt-1 flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md border border-gray-100">
                        ⚠️ {weakSkill}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm font-medium mb-3">Suggested Actions:</p>
                    <ul className="space-y-3">
                        {['Complete recommended specialized cohort', 'Contribute to open source projects', 'Join a weekly seminar or workshop'].map((action, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <Target className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                                <span className="leading-snug">{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-gray-500 text-sm font-medium mb-2">Recommended Category:</p>
                    <p className="text-[#2563EB] font-semibold flex items-center gap-2 bg-blue-50 w-fit px-3 py-1.5 rounded-full text-sm">
                        <Award className="w-4 h-4" /> AI/ML Hackathons
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// -------------------------------------------------------------------
// MAIN MODULE COMPONENT
// -------------------------------------------------------------------
export default function AIMatchingModule() {
    const [loading, setLoading] = useState(true);

    // Mock Data
    const skillData: SkillData[] = [
        { subject: 'Technical', A: 85, fullMark: 100 },
        { subject: 'Communication', A: 65, fullMark: 100 },
        { subject: 'Leadership', A: 50, fullMark: 100 }, // Weakest
        { subject: 'Analytics', A: 75, fullMark: 100 },
        { subject: 'Domain Knowledge', A: 90, fullMark: 100 },
    ];

    const opportunities: Opportunity[] = [
        {
            id: '1',
            name: 'Global AI Hackathon 2026',
            organizer: 'OpenAI & Devpost',
            matchScore: 94,
            winProbability: 78,
            explanation: 'Your high Domain Knowledge and Technical skills align perfectly with the AI constraints of this hackathon.',
            details: 'Based on our scoring engine: (Technical Overlap 0.6) + (Interest Match 0.2) + (Experience Fit + 0.1) + (Past Perf 0.1). Your background in Next.js and Firebase makes you a prime candidate for full-stack AI implementations.'
        },
        {
            id: '2',
            name: 'Web3 Builders Fellowship',
            organizer: 'Ethereum Foundation',
            matchScore: 82,
            winProbability: 64,
            explanation: 'Strong technical fit, though leadership experience requires bolstering. Perfect opportunity for growth.',
            details: 'This fellowship prioritizes code quality and domain understanding. We recommend applying, as your Recharts/Frontend skills can secure a UI/UX role on a founding team.'
        },
        {
            id: '3',
            name: 'Data Science Bootcamp Sprint',
            organizer: 'Kaggle',
            matchScore: 71,
            winProbability: 55,
            explanation: 'Moderate match. Good stepping stone to elevate your Analytics scoring.',
            details: 'While your current analytics score is 75, this sprint focuses heavily on predictive modeling. It will push your limits but significantly improve your radar chart balance.'
        }
    ];

    useEffect(() => {
        // Simulate AI Loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] flex flex-col items-center justify-center relative overflow-hidden z-10">
                <div className="relative z-10 flex flex-col items-center p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
                    <Brain className="w-12 h-12 text-[#2563EB] mb-6 animate-pulse" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Profile</h2>
                    <p className="text-gray-500 text-sm font-medium animate-pulse">Mapping skills to optimized opportunities...</p>

                    <div className="mt-6 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="h-full bg-[#2563EB]"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] font-sans selection:bg-blue-100 text-gray-900 relative">
            <div className="max-w-[1280px] mx-auto p-4 md:p-8 relative z-10 pt-10 md:pt-14">

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        AI Curated <span className="text-[#2563EB]">For You</span>
                    </h1>
                    <p className="text-gray-600 md:text-lg max-w-2xl font-normal">
                        StartEarn maps your profile to optimize your growth. We've matched these opportunities specifically for your skill level.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left/Top Column: Radar & Insights */}
                    <div className="w-full lg:w-[32%] flex flex-col gap-6 order-1 lg:order-2 shrink-0">
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden group">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">Your Skill Overview</h3>
                            <SkillRadar data={skillData} />
                        </div>
                        <AIInsightPanel weakSkill="Leadership (Score: 50)" />
                    </div>

                    {/* Right/Bottom Column: Feed */}
                    <div className="w-full lg:w-[68%] flex flex-col gap-5 order-2 lg:order-1">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Target className="w-5 h-5 text-[#2563EB]" /> Active Opportunities
                            </h2>
                            <span className="text-xs bg-blue-50 text-[#2563EB] border border-blue-100 px-3 py-1 rounded-full font-semibold">
                                {opportunities.length} Matches Found
                            </span>
                        </div>

                        <div className="space-y-4">
                            {opportunities.map((opp) => (
                                <AIMatchCard key={opp.id} opp={opp} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
