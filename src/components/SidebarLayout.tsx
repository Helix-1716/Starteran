import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../lib/soundUtils';
import NotificationDropdown from './NotificationDropdown';
import {
    Menu, X, Home, Compass, Cpu, LayoutDashboard,
    Sparkles, MessageSquare, Settings, LogOut,
    ChevronLeft, ChevronRight, Trophy, Swords, Users,
    UserCircle, Briefcase, Activity
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface SidebarLayoutProps {
    children: React.ReactNode;
    showLayout: boolean;
}

export default function SidebarLayout({ children, showLayout }: SidebarLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { playClick } = useSound();
    const {
        level, levelTitle, currentLevelXp, nextLevelXp,
        recentXpGains
    } = useGame();

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        playClick();
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return (
                location.pathname === '/dashboard' ||
                location.pathname === '/employee-dashboard' ||
                location.pathname === '/recruiter-dashboard' ||
                location.pathname === '/student-dashboard'
            );
        }
        return location.pathname === path;
    };

    if (!showLayout) {
        return <div className="min-h-screen bg-gray-50 flex flex-col">{children}</div>;
    }

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Explore Ideas', path: '/explore-ideas', icon: Compass },
        { name: 'Explore AI Tools', path: '/explore-ai-tools', icon: Cpu },
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'AI Curated', path: '/ai-opportunities', icon: Sparkles },
        { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
        { name: 'Portfolio', path: '/portfolio', icon: UserCircle },
        { name: 'Micro-Internships', path: '/micro-internships', icon: Briefcase },
        { name: 'Battle Arena', path: '/battle', icon: Swords },
        { name: 'Community', path: '/community', icon: Users },
        { name: 'Messages', path: '/chat', icon: MessageSquare },
        { name: 'Momentum', path: '/growth', icon: Activity },
    ];

    const sidebarWidth = isCollapsed ? 'w-20' : 'w-60'; // 80px or 240px

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-50 
        flex flex-col bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${sidebarWidth}
        shrink-0
      `}>
                {/* Logo Section */}
                <div className="flex items-center justify-between h-16 px-4 shrink-0">
                    <Link to="/" onClick={() => playClick()} className="flex items-center gap-2 overflow-hidden">
                        <img src="/logo.png" alt="StartEarn" className="w-8 h-8 shrink-0 object-contain" />
                        {!isCollapsed && <span className="text-xl font-bold text-[#2563EB] whitespace-nowrap">StartEarn</span>}
                    </Link>
                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={() => { playClick(); setIsCollapsed(!isCollapsed); }}
                        className="hidden md:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 absolute -right-3 top-5 bg-white border border-gray-200 shadow-sm z-50 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden p-2 -mr-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 py-4 flex flex-col gap-1.5 overflow-y-auto px-3 scrollbar-thin scrollbar-thumb-gray-200">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => playClick()}
                                title={isCollapsed ? item.name : undefined}
                                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 group
                  ${active
                                        ? 'bg-[#EFF6FF] text-[#2563EB]'
                                        : 'text-[#374151] hover:bg-[#F3F4F6]'
                                    }
                  ${isCollapsed ? 'justify-center px-0' : ''}
                `}
                            >
                                {active && !isCollapsed && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full" />
                                )}
                                {active && isCollapsed && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full" />
                                )}
                                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-[#2563EB]' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Section */}
                <div className="p-3 shrink-0 border-t border-gray-100 flex flex-col gap-1.5">
                    {!isCollapsed ? (
                        <Link
                            to="/pricing"
                            onClick={() => playClick()}
                            className="flex items-center justify-center w-full px-4 py-2 mb-2 rounded-lg text-sm font-semibold text-[#2563EB] bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors"
                        >
                            🚀 Join Pro
                        </Link>
                    ) : (
                        <Link
                            to="/pricing"
                            onClick={() => playClick()}
                            title="Join Pro"
                            className="flex items-center justify-center p-2.5 mb-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
                        >
                            🚀
                        </Link>
                    )}

                    <Link
                        to="/settings"
                        onClick={() => playClick()}
                        title={isCollapsed ? "Settings" : undefined}
                        className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors group
              ${isCollapsed ? 'justify-center px-0' : ''}
            `}
                    >
                        <Settings className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-gray-700" />
                        {!isCollapsed && <span>Settings</span>}
                    </Link>

                    <button
                        onClick={handleLogout}
                        title={isCollapsed ? "Logout" : undefined}
                        className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors group w-full text-left
              ${isCollapsed ? 'justify-center px-0' : ''}
            `}
                    >
                        <LogOut className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-gray-700" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#F8FAFC]">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30">
                    <div className="flex items-center">
                        <button
                            onClick={() => { playClick(); setIsMobileOpen(true); }}
                            className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        {/* Optional page title for mobile, keep transparent on desktop */}
                        <span className="text-gray-900 font-semibold md:hidden">StartEarn</span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                            to="/pricing"
                            onClick={() => playClick()}
                            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 shadow-sm transition-colors duration-200"
                        >
                            Join Pro
                        </Link>

                        <NotificationDropdown />

                        {/* XP Notification Toasts */}
                        <div className="absolute top-16 right-4 sm:right-6 lg:right-20 z-50 pointer-events-none flex flex-col gap-2">
                            {recentXpGains.map(gain => (
                                <div key={gain.id} className="animate-[slide-up_0.3s_ease-out] bg-white border border-blue-100 shadow-md rounded-lg px-4 py-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm">+{gain.amount}</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">XP Gained</span>
                                        <span className="text-sm font-semibold text-gray-900">{gain.source}</span>
                                    </div>
                                </div>
                            ))}
                            <style>{`
                                @keyframes slide-up {
                                    0% { opacity: 0; transform: translateY(10px) scale(0.95); }
                                    100% { opacity: 1; transform: translateY(0) scale(1); }
                                }
                            `}</style>
                        </div>

                        {/* Header XP Bar (Desktop) */}
                        <div className="hidden lg:flex flex-col mr-2 w-48">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-bold text-gray-900">LVL {level} <span className="text-gray-400 font-medium tracking-wide">· {levelTitle}</span></span>
                                <span className="text-[10px] font-semibold text-[#2563EB] tracking-wider">{currentLevelXp} / {nextLevelXp}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${Math.min((currentLevelXp / nextLevelXp) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Profile */}
                        <Link
                            to="/profile"
                            onClick={() => playClick()}
                            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-full transition-colors group relative"
                        >
                            <img
                                src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.email || 'user')}`}
                                alt="Profile"
                                className="w-7 h-7 rounded-full border border-gray-200 bg-white"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.email || 'user')}`;
                                }}
                            />
                            <div className="flex flex-col hidden sm:flex">
                                <span className="text-sm font-medium text-gray-700 leading-tight">
                                    {user?.full_name?.split(' ')[0] || 'User'}
                                </span>
                                {/* Mini Level Bar under name */}
                                <div className="lg:hidden flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[9px] font-bold text-[#2563EB]">L{level}</span>
                                    <div className="h-1 w-12 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${Math.min((currentLevelXp / nextLevelXp) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto w-full h-full relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
