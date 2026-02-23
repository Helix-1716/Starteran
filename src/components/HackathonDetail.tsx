import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Trophy, Building, MapPin, Share2, Heart, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { mockHackathons } from './HackathonSlider';
import { useAuth } from '../contexts/AuthContext';

export default function HackathonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const hackathon = mockHackathons.find(h => h.id === Number(id));

    if (!hackathon) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hackathon Not Found</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] pb-24 font-sans">
            {/* Dynamic Header/Banner */}
            <div className="relative h-[300px] md:h-[350px] w-full bg-gray-900 border-b-4 border-blue-600">
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                {/* Top Navigation Overlay */}
                <div className="absolute top-0 w-full p-4 md:p-6 flex items-center justify-between z-10 max-w-7xl mx-auto left-0 right-0">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex space-x-3">
                        <button className="flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area overlapping the banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column (Main Info) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm ${hackathon.status === 'ongoing' ? 'bg-red-100 text-red-700 border border-red-200' :
                                    hackathon.status === 'pre-live' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                        'bg-green-100 text-green-700 border border-green-200'
                                    }`}>
                                    {hackathon.status.replace('-', ' ')}
                                </span>
                                {hackathon.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {hackathon.title}
                            </h1>

                            <div className="flex items-center mb-6 border-b border-gray-100 pb-6">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4 border border-blue-100">
                                    <Building className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Organized by</p>
                                    <p className="font-bold text-gray-900 text-lg">{hackathon.org}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                                    <p className="text-xs text-gray-500 font-semibold mb-1">DATES</p>
                                    <p className="text-sm font-bold text-gray-900">{hackathon.date}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Users className="w-5 h-5 text-indigo-600 mb-2" />
                                    <p className="text-xs text-gray-500 font-semibold mb-1">REGISTERED</p>
                                    <p className="text-sm font-bold text-gray-900">{hackathon.participants}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <MapPin className="w-5 h-5 text-green-600 mb-2" />
                                    <p className="text-xs text-gray-500 font-semibold mb-1">MODE</p>
                                    <p className="text-sm font-bold text-gray-900">Online</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <CheckCircle className="w-5 h-5 text-orange-600 mb-2" />
                                    <p className="text-xs text-gray-500 font-semibold mb-1">ELIGIBILITY</p>
                                    <p className="text-sm font-bold text-gray-900">Open to All</p>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <Award className="w-6 h-6 mr-3 text-blue-600" /> All that you need to know
                            </h2>
                            <div className="prose max-w-none text-gray-600 space-y-4 text-base leading-relaxed">
                                <p>
                                    Welcome to the <strong>{hackathon.title}</strong> hosted by <strong>{hackathon.org}</strong>! This is your chance to solve real-world problems and push the boundaries of technology. Whether you are a student, professional, or enthusiast, we welcome participants from all backgrounds to build innovative solutions.
                                </p>
                                <p>
                                    Get ready for intense coding, mentorship sessions, workshops, and massive prize pools. Showcase your skills to top recruiters and network with brilliant minds globally.
                                </p>
                                <h4 className="text-gray-900 font-bold mt-6 mb-2">Rules & Guidelines:</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Participants can register individually or in teams of up to 4 members.</li>
                                    <li>All submissions must be original work created during the hackathon timeline.</li>
                                    <li>Use of open-source libraries and frameworks is allowed.</li>
                                    <li>Final presentations will be strictly 5 minutes, followed by a Q&A.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar / CTA / Prizes) */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Register CTA Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-600">
                            <div className="text-center mb-6">
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">Registration Closes In</p>
                                <div className="flex justify-center space-x-3 text-gray-900">
                                    <div className="flex flex-col"><span className="text-2xl font-bold bg-gray-100 px-3 py-2 rounded-lg">12</span><span className="text-[10px] mt-1 text-gray-500">DAYS</span></div>
                                    <div className="text-2xl font-bold py-2">:</div>
                                    <div className="flex flex-col"><span className="text-2xl font-bold bg-gray-100 px-3 py-2 rounded-lg">04</span><span className="text-[10px] mt-1 text-gray-500">HOURS</span></div>
                                    <div className="text-2xl font-bold py-2">:</div>
                                    <div className="flex flex-col"><span className="text-2xl font-bold bg-gray-100 px-3 py-2 rounded-lg">45</span><span className="text-[10px] mt-1 text-gray-500">MINS</span></div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center group mb-3">
                                Register Now
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                            {user ? (
                                <p className="text-center text-xs text-green-600 font-medium bg-green-50 py-2 rounded-lg">You are logged in as {user.full_name}</p>
                            ) : (
                                <p className="text-center text-xs text-gray-500 mt-2">Log in required to register.</p>
                            )}
                        </div>

                        {/* Prizes Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center border-b border-gray-100 pb-3">
                                <Trophy className="w-5 h-5 mr-3 text-yellow-500" /> Rewards & Prizes
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 shadow-sm border border-yellow-200">🥇</div>
                                    <div>
                                        <p className="text-xs text-yellow-800 font-bold tracking-wider uppercase mb-0.5">Winner</p>
                                        <p className="text-lg font-bold text-gray-900">{hackathon.prize}</p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 shadow-sm border border-gray-300">🥈</div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold tracking-wider uppercase mb-0.5">1st Runner Up</p>
                                        <p className="text-lg font-bold text-gray-900">₹1,00,000</p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 shadow-sm border border-orange-200">🥉</div>
                                    <div>
                                        <p className="text-xs text-orange-800 font-bold tracking-wider uppercase mb-0.5">2nd Runner Up</p>
                                        <p className="text-lg font-bold text-gray-900">₹50,000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline / Rounds */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center border-b border-gray-100 pb-3">
                                <Clock className="w-5 h-5 mr-3 text-blue-500" /> Stages & Timelines
                            </h3>
                            <div className="relative border-l-2 border-blue-100 ml-3 space-y-6 mt-4">
                                <div className="relative pl-6">
                                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-1 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"></div>
                                    <h4 className="font-bold text-gray-900 text-[15px]">Registration Deadline</h4>
                                    <p className="text-xs text-gray-500 mt-1">Today</p>
                                </div>
                                <div className="relative pl-6">
                                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7.5px] top-1.5 border-2 border-white"></div>
                                    <h4 className="font-bold text-gray-600 text-[15px]">Idea Submission Phase</h4>
                                    <p className="text-xs text-gray-500 mt-1">Next Week</p>
                                </div>
                                <div className="relative pl-6">
                                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7.5px] top-1.5 border-2 border-white"></div>
                                    <h4 className="font-bold text-gray-600 text-[15px]">Grand Finale (Live)</h4>
                                    <p className="text-xs text-gray-500 mt-1">End of Month</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
