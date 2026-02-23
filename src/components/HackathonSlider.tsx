import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const mockHackathons = [
    {
        id: 1,
        title: "Global AI Innovators Challenge",
        org: "TechGiant Corp",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        date: "Mar 15 - Mar 17, 2025",
        participants: "1,200+ Registered",
        prize: "₹5,00,000",
        tags: ["AI/ML", "Innovation", "Open to All"],
        status: "registration open"
    },
    {
        id: 2,
        title: "FinTech Buildathon 2025",
        org: "NextGen Banking",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        date: "Apr 05 - Apr 07, 2025",
        participants: "850+ Registered",
        prize: "₹3,50,000",
        tags: ["FinTech", "Blockchain", "Students"],
        status: "registration open"
    },
    {
        id: 3,
        title: "GreenTech Sustainability Hack",
        org: "EcoSolutions Ltd",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
        date: "May 20 - May 22, 2025",
        participants: "150+ Registered",
        prize: "₹2,00,000",
        tags: ["Sustainability", "IoT", "Professionals"],
        status: "registration open"
    },
    {
        id: 4,
        title: "Web3 Developer Summit & Hack",
        org: "CryptoFoundation",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
        date: "Jun 10 - Jun 12, 2025",
        participants: "2,000+ Registered",
        prize: "₹10,00,000",
        tags: ["Web3", "Crypto", "Global"],
        status: "registration open"
    },
    {
        id: 5,
        title: "HealthTech UX Designathon",
        org: "MedCare Innovators",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        date: "May 10 - May 12, 2025",
        participants: "450+ Registered",
        prize: "₹1,50,000",
        tags: ["Design", "Healthcare", "UX/UI"],
        status: "registration open"
    }
];

export default function HackathonSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 bg-white border-t border-gray-100 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                            <Trophy className="w-4 h-4 mr-2" />
                            Competitions
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Hackathons & Challenges</h2>
                        <p className="text-lg text-gray-600">Participate, showcase your skills, and win big prizes.</p>
                    </div>
                    <div className="flex space-x-3 pb-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow transition-all"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow transition-all"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* CSS to hide scrollbar but allow native scrolling */}
                <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

                <div
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                    {mockHackathons.map((hackathon) => (
                        <div
                            key={hackathon.id}
                            className="min-w-[320px] max-w-[320px] md:min-w-[380px] md:max-w-[380px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden snap-start flex-shrink-0 border border-gray-100 group cursor-pointer flex flex-col"
                        >
                            <div className="relative h-[180px] overflow-hidden shrink-0">
                                <img
                                    src={hackathon.image}
                                    alt={hackathon.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay gradient for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${hackathon.status === 'ongoing' ? 'bg-red-600 animate-pulse' :
                                        hackathon.status === 'pre-live' ? 'bg-orange-500' : 'bg-green-600'
                                        }`}>
                                        {hackathon.status.replace('-', ' ')}
                                    </span>
                                </div>
                                {/* Organization tag on image */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white font-medium text-sm truncate drop-shadow-md pb-1">{hackathon.org}</p>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {hackathon.tags.map((tag, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-gray-100/80 text-gray-700 text-[11px] font-semibold tracking-wide rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-[19px] leading-tight font-bold text-gray-900 mb-5 group-hover:text-blue-600 transition-colors line-clamp-2">{hackathon.title}</h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                                            <span className="truncate">{hackathon.date}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Users className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                                            <span className="truncate">{hackathon.participants}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Prize Pool</p>
                                        <p className="text-base font-bold text-gray-900">{hackathon.prize}</p>
                                    </div>
                                    <Link to={`/hackathon/${hackathon.id}`} className="px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors duration-300 text-center flex items-center justify-center">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
