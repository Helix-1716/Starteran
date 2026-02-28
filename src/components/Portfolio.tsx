import { useState } from 'react';
import {
    Download, Share2, Globe, Shield, Trophy,
    Swords, FileCheck, Star, Sparkles,
    X, Linkedin, Twitter, Mail, Link as LinkIcon, Edit,
    Printer, MessageCircle
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';

// Mock Data
const SKILL_DATA = [
    { subject: 'Frontend', A: 90, fullMark: 100 },
    { subject: 'Backend', A: 65, fullMark: 100 },
    { subject: 'AI/ML', A: 45, fullMark: 100 },
    { subject: 'Leadership', A: 85, fullMark: 100 },
    { subject: 'UI/UX', A: 75, fullMark: 100 },
    { subject: 'DevOps', A: 50, fullMark: 100 },
];

const BATTLES = [
    { id: 1, opponent: 'CodeNinjas', result: 'Win', date: '2 days ago', xp: '+500' },
    { id: 2, opponent: 'Stanford AI Labs', result: 'Loss', date: '1 week ago', xp: '+50' },
    { id: 3, opponent: 'AnonymousUser', result: 'Win', date: '2 weeks ago', xp: '+250' },
];

const COMPETITIONS = [
    { id: 1, name: 'Global Web3 Hackathon', status: 'Winner - 1st Place', date: 'Feb 2024' },
    { id: 2, name: 'AI Build Sprint', status: 'Top 10 Finalist', date: 'Jan 2024' },
];

const EXPERIENCES = [
    {
        id: '1',
        title: 'React Landing Page Optimization',
        org: 'FastServe Inc. (Micro-Internship)',
        duration: 'Oct 2023 - 2 Days',
        impact: 'Reduced LCP from 3.2s to 1.1s. Implemented lazy loading and optimized asset delivery.',
    },
    {
        id: '2',
        title: 'Open Source Contributor',
        org: 'StartEarn Toolkit',
        duration: 'Aug 2023 - Present',
        impact: 'Merged 14 PRs focusing on accessibility and core UI components. Increased Lighthouse accessibility score to 100.',
    }
];

export default function Portfolio() {
    const { xp, level, levelTitle } = useGame();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isPublic, setIsPublic] = useState(true);
    const [showPublicModal, setShowPublicModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [publicLink] = useState(`startearn.com/u/${user?.email?.split('@')[0] || 'anirban'}`);

    const handleTogglePublic = () => {
        if (!isPublic) {
            setShowPublicModal(true);
        } else {
            setIsPublic(false);
        }
    };

    const confirmMakePublic = () => {
        setIsPublic(true);
        setShowPublicModal(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://${publicLink}`);
        alert('Link copied to clipboard!');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-full bg-[#F8FAFC] font-sans text-gray-900 relative">

            {/* --- SCREEN VIEW ONLY --- */}
            <div className="p-4 md:p-8 print:hidden">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Top Action Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm gap-4">
                        <div className="flex items-center gap-4">
                            {/* Toggle Switch */}
                            <button
                                onClick={handleTogglePublic}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPublic ? 'bg-emerald-500' : 'bg-gray-300'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPublic ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                            <div>
                                <h2 className="font-bold text-gray-900 leading-tight flex items-center gap-2">
                                    {isPublic ? (
                                        <><Globe className="w-4 h-4 text-emerald-600" /> Public Profile Active</>
                                    ) : (
                                        <><Shield className="w-4 h-4 text-gray-500" /> Profile is Private</>
                                    )}
                                </h2>
                                <p className="text-xs font-medium text-gray-500">
                                    {isPublic ? 'Your profile is visible to recruiters.' : 'Hidden from talent network.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => isPublic && setShowShareModal(true)}
                                disabled={!isPublic}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 border text-sm font-semibold py-2 px-4 rounded-xl transition-colors ${isPublic ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer' : 'bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button
                                onClick={() => setShowPdfModal(true)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm"
                            >
                                <Download className="w-4 h-4" /> Export PDF
                            </button>
                        </div>
                    </div>

                    {/* Profile Strength */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm text-gray-900">Profile Strength: Intermediate</span>
                                <div className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">80%</div>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-[#2563EB] rounded-full w-4/5"></div>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Suggestion: Add 2 more achievements to reach "Advanced" state.</p>
                        </div>
                        <button className="hidden sm:block text-sm font-bold text-[#2563EB] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Complete Profile</button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Profile Card */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative">
                                <button className="absolute top-4 right-4 p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <img
                                    src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'StartEarn'}`}
                                    alt="Avatar"
                                    className="w-24 h-24 rounded-full border-4 border-gray-50 shadow-sm mb-4 bg-white"
                                />
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.full_name || 'Anirban'}</h1>
                                <div className="text-sm font-medium text-gray-500 mb-3">Computer Science · Your College</div>

                                <div className="flex items-center gap-1.5 text-[#2563EB] font-bold text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                    <Star className="w-4 h-4 fill-[#2563EB]" />
                                    Level {level} · {levelTitle}
                                </div>

                                <div className="w-full mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                                    <div>
                                        <div className="text-2xl font-black text-gray-900">{xp}</div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total XP</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-gray-900">#42</div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rank</div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm">
                                    <MessageCircle className="w-4 h-4" /> Message
                                </button>
                            </div>

                            {/* AI Summary */}
                            <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 shadow-sm overflow-hidden">
                                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-indigo-400 opacity-50" />
                                <h3 className="font-bold text-indigo-900 mb-3 text-sm flex items-center gap-1.5 uppercase tracking-wider">
                                    AI Summary
                                </h3>
                                <p className="text-indigo-800 text-sm leading-relaxed font-medium">
                                    "{user?.full_name || 'Anirban'} is a <strong className="font-bold text-[#2563EB]">Level {level} {levelTitle}</strong> specializing in Frontend and Leadership innovation. With clear impact demonstrated through micro-internships and collaborative competitions, they display strong potential for product engineering roles."
                                </p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Verified Skills Overview */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Verified Skills</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-blue-50 border border-blue-100 text-[#2563EB] px-3 py-1.5 rounded-lg text-sm font-bold">React (90%)</span>
                                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold">Leadership (85%)</span>
                                    <span className="bg-purple-50 border border-purple-100 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-bold">UI/UX (75%)</span>
                                    <span className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold">Backend (65%)</span>
                                </div>
                                <div className="h-48 relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                                            <PolarGrid stroke="#e5e7eb" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 10, fontWeight: 600 }} />
                                            <Radar name="Skills" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} />
                                            <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Micro Internships / Experience */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileCheck className="w-5 h-5 text-[#2563EB]" />
                                    Verified Micro-Internships
                                </h3>
                                <div className="space-y-6">
                                    {EXPERIENCES.map((exp, i) => (
                                        <div key={exp.id} className={`${i !== EXPERIENCES.length - 1 ? 'border-b border-gray-100 pb-6' : ''}`}>
                                            <h4 className="font-bold text-gray-900">{exp.title}</h4>
                                            <div className="text-sm font-medium text-[#2563EB] mb-1">{exp.org}</div>
                                            <div className="text-xs text-gray-400 font-bold tracking-wider mb-2">{exp.duration}</div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                {exp.impact}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Competitions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        Achievements
                                    </h3>
                                    <div className="space-y-4">
                                        {COMPETITIONS.map(comp => (
                                            <div key={comp.id} className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0 border border-yellow-100">
                                                    <Star className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-gray-900 leading-tight">{comp.name}</h4>
                                                    <p className="text-xs font-bold text-[#2563EB] mt-0.5">{comp.status}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Swords className="w-5 h-5 text-[#2563EB]" />
                                        Community & Battles
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            <div>
                                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Helpful Answers</div>
                                                <div className="font-black text-xl text-gray-900">42</div>
                                            </div>
                                            <Globe className="w-6 h-6 text-[#2563EB] opacity-50" />
                                        </div>
                                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            <div>
                                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Battle Win Rate</div>
                                                <div className="font-black text-xl text-emerald-600">68%</div>
                                            </div>
                                            <Trophy className="w-6 h-6 text-emerald-500 opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Confirm Public Modal */}
            {showPublicModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm print:hidden">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Make Profile Public?</h3>
                        <p className="text-gray-500 text-center text-sm font-medium mb-6">
                            Your profile, skills, and achievements will be visible to recruiters and the StartEarn community at your unique URL.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowPublicModal(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors">Cancel</button>
                            <button onClick={confirmMakePublic} className="flex-1 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">Make Public</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm print:hidden">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Share Profile</h3>
                            <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                        </div>

                        {/* Preview Card */}
                        <div className="border border-gray-200 rounded-xl p-4 mb-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 -mr-10 -mt-10 rounded-full blur-2xl"></div>
                            <div className="flex gap-4 relative z-10">
                                <img src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'StartEarn'}`} className="w-16 h-16 rounded-full border border-gray-200" alt="Avatar" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{user?.full_name || 'Anirban'}</h4>
                                    <div className="text-sm font-semibold text-[#2563EB] mb-1">Level {level} {levelTitle}</div>
                                    <p className="text-xs text-gray-500 line-clamp-2">Top verified skills in Frontend, React, and Leadership. Active global contender on StartEarn.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center group-hover:bg-[#0A66C2] group-hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold text-gray-500">LinkedIn</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors"><Twitter className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold text-gray-500">X</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors"><Mail className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold text-gray-500">Email</span>
                            </button>
                            <button onClick={copyToClipboard} className="flex flex-col items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-gray-200 transition-colors"><LinkIcon className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold text-gray-500">Copy</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                            <input type="text" readOnly value={publicLink} className="bg-transparent text-sm w-full outline-none text-gray-600 font-medium px-2" />
                            <button onClick={copyToClipboard} className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">Copy</button>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Preview Modal */}
            {showPdfModal && (
                <div className="fixed inset-0 z-[100] flex flex-col p-4 bg-gray-900/80 backdrop-blur-md print:hidden">
                    <div className="flex-1 flex flex-col max-h-full">
                        {/* Header Controls */}
                        <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl shadow-lg shrink-0 max-w-4xl mx-auto w-full">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Document Preview</h3>
                                <p className="text-xs font-medium text-gray-500">ATS-Friendly Structured Resume</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setShowPdfModal(false)} className="text-gray-500 hover:text-gray-700 font-bold text-sm px-4 py-2 hover:bg-gray-100 rounded-lg">Close</button>
                                <button onClick={handlePrint} className="bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold px-5 py-2 rounded-lg flex items-center gap-2 shadow-sm">
                                    <Printer className="w-4 h-4" /> Confirm Export
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Preview Area for visual representation */}
                        <div className="flex-1 overflow-y-auto w-full pb-8">
                            {/* This is a visual proxy of the print layout rendered on screen */}
                            <div className="max-w-[210mm] mx-auto bg-white p-[20mm] shadow-2xl rounded-sm">
                                {/* Resume Header */}
                                <div className="border-b-2 border-gray-900 pb-4 mb-6">
                                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-1">{user?.full_name || 'Anirban'}</h1>
                                    <div className="text-gray-800 font-bold mb-2">Level {level} {levelTitle} · {user?.email}</div>
                                    <div className="text-sm text-[#2563EB] font-bold">StarEarn Profile: {publicLink}</div>
                                </div>

                                {/* Summary */}
                                <div className="mb-6">
                                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
                                    <p className="text-sm text-gray-800 leading-relaxed font-medium">Auto-generated profile summary highlighting core proficiencies in Frontend and Leadership innovation. Established track record of consistent hackathon finishes and top-tier community engagement on the StartEarn verified network.</p>
                                </div>

                                {/* Skills */}
                                <div className="mb-6">
                                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Core Competencies</h2>
                                    <ul className="text-sm text-gray-800 grid grid-cols-2 gap-y-2 font-medium list-disc pl-4">
                                        <li>Frontend Development (90%)</li>
                                        <li>Leadership & Management (85%)</li>
                                        <li>UI/UX Design (75%)</li>
                                        <li>Backend Architecture (65%)</li>
                                    </ul>
                                </div>

                                {/* Experience */}
                                <div className="mb-6">
                                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Verified Experience</h2>
                                    <div className="space-y-4">
                                        {EXPERIENCES.map((exp) => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                                    <span className="text-xs font-bold text-gray-600">{exp.duration}</span>
                                                </div>
                                                <div className="text-sm font-bold italic text-gray-700 mb-1">{exp.org}</div>
                                                <ul className="list-disc pl-4 text-sm text-gray-800">
                                                    <li>{exp.impact}</li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Competitions */}
                                <div>
                                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Notable Achievements</h2>
                                    <ul className="list-disc pl-4 text-sm text-gray-800 space-y-1">
                                        {COMPETITIONS.map(comp => (
                                            <li key={comp.id}><strong>{comp.status}</strong> — {comp.name} <em>({comp.date})</em></li>
                                        ))}
                                        <li><strong>Top Community Contributor</strong> with exceptionally high Battle Win Rate (68%).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TRUE PRINT LAYOUT (Hidden from screen, injected into print renderer) --- */}
            {/* Using standard Tailwind styling tailored for print output */}
            <div className="hidden print:block bg-white text-black p-[10mm] text-[11pt] font-sans h-full w-full absolute top-0 left-0 bg-transparent z-[999]">
                {/* PDF Header */}
                <div className="border-b-2 border-black pb-4 mb-6">
                    <h1 className="text-3xl font-black uppercase tracking-tight mb-1">{user?.full_name || 'Anirban'}</h1>
                    <div className="font-bold mb-1">Level {level} {levelTitle} · {user?.email}</div>
                    <div className="text-sm">StartEarn Profile: {publicLink}</div>
                </div>

                {/* PDF Summary */}
                <div className="mb-6 break-inside-avoid">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                    <p className="leading-relaxed">Auto-generated profile summary highlighting core proficiencies in Frontend and Leadership innovation. Established track record of consistent hackathon finishes and top-tier community engagement on the StartEarn verified network.</p>
                </div>

                {/* PDF Skills */}
                <div className="mb-6 break-inside-avoid">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Core Competencies</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 pl-4">
                        <div className="list-item">Frontend Development (90%)</div>
                        <div className="list-item">Leadership & Management (85%)</div>
                        <div className="list-item">UI/UX Design (75%)</div>
                        <div className="list-item">Backend Architecture (65%)</div>
                    </div>
                </div>

                {/* PDF Experience */}
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Verified Experience (Micro-Internships)</h2>
                    <div className="space-y-4">
                        {EXPERIENCES.map((exp) => (
                            <div key={exp.id} className="break-inside-avoid mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{exp.title}</h3>
                                    <span className="text-sm italic">{exp.duration}</span>
                                </div>
                                <div className="text-sm italic font-bold mb-1">{exp.org}</div>
                                <div className="pl-4 list-item list-disc ml-4 text-justify pr-8">{exp.impact}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PDF Competitions */}
                <div className="break-inside-avoid">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Notable Achievements</h2>
                    <div className="space-y-1 pl-4 ml-4">
                        {COMPETITIONS.map(comp => (
                            <div key={comp.id} className="list-item list-disc">
                                <span className="font-bold">{comp.status}</span> — {comp.name} <em>({comp.date})</em>
                            </div>
                        ))}
                        <div className="list-item list-disc">
                            <span className="font-bold">Top Community Contributor</span> with 68% competitive win rate and 42 verified helpful technical solutions.
                        </div>
                    </div>
                </div>

                {/* PDF Footer Wrapper */}
                <div className="mt-12 text-center text-[9pt] text-gray-500 pt-4 border-t border-gray-200">
                    Auto-generated and verified by StartEarn Network Engine.
                </div>
            </div>

        </div>
    );
}
