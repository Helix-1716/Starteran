import { useState } from 'react';
import {
    Clock, Search, Filter,
    Briefcase, Code, Rocket, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MICRO_GIGS = [
    {
        id: '1',
        title: 'Optimize React App Landing Page',
        company: 'FastServe Inc.',
        desc: 'Reduce LCP to under 1.5s using Lighthouse recommendations. Need strong React and Core Web Vitals knowledge.',
        skills: ['React', 'Performance', 'Web Vitals'],
        time: '3-4 Hrs',
        deadline: 'In 2 days',
        payment: '₹1,500',
        paymentValue: 1500,
        xp: '+200 XP',
        isPro: false,
    },
    {
        id: '2',
        title: 'Train Customer Service GPT Model',
        company: 'FinTech Growth',
        desc: 'Review 500 lines of prompt tuning data for our finance chatbot and adjust tone strictly to brand guidelines.',
        skills: ['AI/ML', 'Data Processing', 'Prompt Engineering'],
        time: '6 Hrs',
        deadline: 'In 4 days',
        payment: '₹3,000',
        paymentValue: 3000,
        xp: '+350 XP',
        isPro: true, // Pro restricted access
    },
    {
        id: '3',
        title: 'Design Pitch Deck Template',
        company: 'StartUp Alpha',
        desc: 'Create a clean, minimalist 10-slide B2B pitch deck template in Figma following our new brand book.',
        skills: ['Figma', 'UI/UX', 'Presentation'],
        time: '2-3 Hrs',
        deadline: 'Tomorrow',
        payment: '₹1,000',
        paymentValue: 1000,
        xp: '+150 XP',
        isPro: false,
    },
    {
        id: '4',
        title: 'Fix Node.js Auth Middleware Bug',
        company: 'SecureLogin',
        desc: 'Identify and patch a token expiration bug in our Express.js custom authentication middleware stack.',
        skills: ['Node.js', 'Express', 'Security'],
        time: '2 Hrs',
        deadline: 'In 12 hours',
        payment: '₹2,500',
        paymentValue: 2500,
        xp: '+300 XP',
        isPro: false,
    }
];

export default function MicroInternships() {
    const navigate = useNavigate();
    const [filterSkill, setFilterSkill] = useState('');
    const [filterPayment, setFilterPayment] = useState(0);

    const filteredGigs = MICRO_GIGS.filter(gig => {
        const matchSkill = filterSkill.trim() === '' || gig.skills.some(s => s.toLowerCase().includes(filterSkill.toLowerCase()));
        const matchPay = filterPayment === 0 || gig.paymentValue >= filterPayment;
        return matchSkill && matchPay;
    });

    return (
        <div className="min-h-full bg-[#F8FAFC] font-sans text-gray-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900 mb-2">
                        <Briefcase className="w-8 h-8 text-[#2563EB]" />
                        Micro-Internship Marketplace
                    </h1>
                    <p className="text-gray-500 font-medium">Fast, skill-based, paid gigs to build your portfolio and earn XP instantly.</p>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Filter by skill (e.g. React)"
                            value={filterSkill}
                            onChange={(e) => setFilterSkill(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-gray-600">Min Payment:</span>
                        <select
                            value={filterPayment}
                            onChange={(e) => setFilterPayment(Number(e.target.value))}
                            className="text-sm border border-gray-200 rounded-xl bg-gray-50 px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value={0}>Any</option>
                            <option value={1000}>₹1,000+</option>
                            <option value={2000}>₹2,000+</option>
                            <option value={3000}>₹3,000+</option>
                        </select>
                    </div>
                </div>

                {/* Gig Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGigs.map(gig => (
                        <div key={gig.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">

                            {/* Pro Overlay */}
                            {gig.isPro && (
                                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center border-2 border-indigo-100/50">
                                    <div className="bg-indigo-900 text-white rounded-xl p-4 text-center max-w-[80%] shadow-xl shadow-indigo-900/20">
                                        <Lock className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                                        <h4 className="font-bold mb-1">Early Access Gig</h4>
                                        <p className="text-xs text-indigo-200 mb-4">Pro users get 48 hours early access to premium marketplace tasks.</p>
                                        <button onClick={() => navigate('/pricing')} className="bg-[#2563EB] hover:bg-blue-400 w-full py-2 rounded-lg font-bold text-sm transition-colors">
                                            Unlock Pro
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className={`flex flex-col h-full ${gig.isPro ? 'blur-sm select-none' : ''}`}>
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{gig.title}</h3>
                                    <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">{gig.company}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {gig.skills.map(s => (
                                            <span key={s} className="bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded-md text-[10px] font-bold border border-blue-100 uppercase tracking-widest">{s}</span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium line-clamp-2">{gig.desc}</p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-500">
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100"><Clock className="w-3.5 h-3.5" /> {gig.time}</div>
                                        <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-2 py-1.5 rounded-lg border border-red-100"><Rocket className="w-3.5 h-3.5" /> {gig.deadline}</div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Reward</span>
                                            <span className="font-black text-[#2563EB] text-xl leading-none">{gig.payment}</span>
                                        </div>
                                        <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-5 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2">
                                            Apply <span className="bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded group-hover:bg-gray-700">{gig.xp}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredGigs.length === 0 && (
                    <div className="text-center py-12">
                        <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No matching gigs found</h3>
                        <p className="text-gray-500 font-medium mt-1">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
