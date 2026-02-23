import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
    Bell, Lock, Shield, Eye, Moon, Globe, Trash2, HelpCircle,
    ChevronRight, ToggleLeft, ToggleRight, AlertTriangle, Key, Smartphone
} from 'lucide-react';
import { useSound } from '../lib/soundUtils';

interface SettingToggleProps {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

const SettingToggle: React.FC<SettingToggleProps> = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between py-4">
        <div>
            <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            role="switch"
            aria-checked={enabled}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    </div>
);

export default function Settings() {
    const { user } = useAuth();
    const { playClick, playSuccess } = useSound();

    const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'privacy' | 'preferences'>('notifications');

    // Mock states for toggles
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [jobAlerts, setJobAlerts] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);
    const [profileVisible, setProfileVisible] = useState(true);
    const [showEmail, setShowEmail] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
        playClick();
        setter(!value);
    };

    const tabs = [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Login', icon: Lock },
        { id: 'privacy', label: 'Privacy', icon: Eye },
        { id: 'preferences', label: 'Preferences', icon: Globe },
    ] as const;

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Not Logged In</h2>
                    <p className="text-gray-600 mb-4">Please sign in to access settings.</p>
                    <Link to="/auth" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account preferences, notifications, and privacy.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* Sidebar */}
                    <div className="w-full md:w-72 bg-gray-50 border-r border-gray-100 p-6 flex flex-col">
                        <div className="space-y-2 flex-grow">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => { playClick(); setActiveTab(tab.id); }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-100' : 'text-gray-400'}`} />
                                        <span className="font-semibold text-sm">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-6 mt-6 border-t border-gray-200">
                            <button
                                onClick={() => playClick()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                            >
                                <Trash2 className="w-5 h-5" />
                                <span className="font-semibold text-sm">Delete Account</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 lg:p-12">

                        {/* Notifications Section */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                                        <Bell className="w-6 h-6 text-blue-600" /> Notifications
                                    </h2>
                                    <p className="text-gray-500">Choose what updates you want to receive and how.</p>
                                </div>

                                <div className="bg-white border text-left border-gray-100 shadow-sm rounded-2xl p-6 space-y-2 divide-y divide-gray-100">
                                    <SettingToggle
                                        label="Email Notifications"
                                        description="Receive daily and weekly summaries right in your inbox."
                                        enabled={emailAlerts}
                                        onToggle={() => handleToggle(setEmailAlerts, emailAlerts)}
                                    />
                                    <SettingToggle
                                        label="Push Notifications"
                                        description="Instant alerts for messages and new applications."
                                        enabled={pushNotifs}
                                        onToggle={() => handleToggle(setPushNotifs, pushNotifs)}
                                    />
                                    <SettingToggle
                                        label="Job Recommendations"
                                        description="Tailored job matches based on your profile and activity."
                                        enabled={jobAlerts}
                                        onToggle={() => handleToggle(setJobAlerts, jobAlerts)}
                                    />
                                    <SettingToggle
                                        label="Marketing Emails"
                                        description="Tips, news, and promotional offers from StartEarn."
                                        enabled={marketingEmails}
                                        onToggle={() => handleToggle(setMarketingEmails, marketingEmails)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                                        <Lock className="w-6 h-6 text-blue-600" /> Security & Login
                                    </h2>
                                    <p className="text-gray-500">Keep your account safe and manage how you sign in.</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Password Change */}
                                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Key className="w-5 h-5" /></div>
                                                <div>
                                                    <h4 className="text-md font-semibold text-gray-900">Password</h4>
                                                    <p className="text-sm text-gray-500">Last changed 2 months ago</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors text-sm">
                                                Update
                                            </button>
                                        </div>
                                    </div>

                                    {/* Two-Factor Auth */}
                                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-green-50 text-green-600 rounded-xl"><Smartphone className="w-5 h-5" /></div>
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-900">Two-Factor Authentication</h4>
                                                <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className={`text-sm font-medium ${twoFactor ? 'text-green-600' : 'text-gray-500'}`}>
                                                {twoFactor ? 'Enabled' : 'Disabled'}
                                            </span>
                                            <button
                                                onClick={() => handleToggle(setTwoFactor, twoFactor)}
                                                className={`px-4 py-2 font-medium rounded-lg transition-colors text-sm ${twoFactor ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                {twoFactor ? 'Disable' : 'Enable 2FA'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Active Sessions */}
                                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                                        <h4 className="text-md font-semibold text-gray-900 mb-4">Active Sessions</h4>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Windows PC • Chrome</p>
                                                <p className="text-xs text-gray-500 mt-1">Mumbai, India • Active now</p>
                                            </div>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded" >Current</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Section */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                                        <Eye className="w-6 h-6 text-blue-600" /> Privacy
                                    </h2>
                                    <p className="text-gray-500">Control who can see your profile and what data you share.</p>
                                </div>

                                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-2 divide-y divide-gray-100">
                                    <SettingToggle
                                        label="Public Profile"
                                        description="Allow recruiters and companies to find you in search results."
                                        enabled={profileVisible}
                                        onToggle={() => handleToggle(setProfileVisible, profileVisible)}
                                    />
                                    <SettingToggle
                                        label="Show Email Address"
                                        description="Display your email on your public profile card."
                                        enabled={showEmail}
                                        onToggle={() => handleToggle(setShowEmail, showEmail)}
                                    />
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-start gap-4">
                                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-md font-semibold text-yellow-900">Data & Privacy Information</h4>
                                        <p className="text-sm text-yellow-700 mt-1 mb-3">
                                            Your privacy is important to us. Read our privacy policy to understand how we process and store your data securely.
                                        </p>
                                        <button className="text-sm font-bold text-yellow-800 hover:text-yellow-900 underline decoration-yellow-400">
                                            View Privacy Policy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences Section */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                                        <Globe className="w-6 h-6 text-blue-600" /> Preferences
                                    </h2>
                                    <p className="text-gray-500">Customize your app experience.</p>
                                </div>

                                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6">

                                    {/* Language */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                                        <select className="w-full md:w-1/2 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                            <option>English (US)</option>
                                            <option>English (UK)</option>
                                            <option>Hindi</option>
                                            <option>Spanish</option>
                                        </select>
                                    </div>

                                    {/* Timezone */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Timezone</label>
                                        <select className="w-full md:w-1/2 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                            <option>(GMT+05:30) India Standard Time</option>
                                            <option>(GMT+00:00) Universal Coordinated Time</option>
                                            <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                                        </select>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Dark Mode */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 text-gray-700 rounded-xl"><Moon className="w-5 h-5" /></div>
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-900">Dark Mode</h4>
                                                <p className="text-sm text-gray-500">Switch to a dark theme (Coming soon).</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggle(setDarkMode, darkMode)}
                                            disabled
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out opacity-50 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
