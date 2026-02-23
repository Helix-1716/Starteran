import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Briefcase, Search, Trophy, FileText, MonitorPlay, Users, GraduationCap, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Internships', icon: Briefcase, color: 'text-orange-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: false, delay: '0s' },
    { id: 2, name: 'Jobs', icon: Search, color: 'text-blue-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: false, delay: '0.2s' },
    { id: 3, name: 'Competitions', icon: Trophy, color: 'text-yellow-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: false, delay: '0.4s' },
    { id: 4, name: 'Mock Tests', icon: FileText, color: 'text-emerald-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: true, delay: '0.6s' },
    { id: 5, name: 'Interviews', icon: MonitorPlay, color: 'text-cyan-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: false, delay: '0.8s' },
    { id: 6, name: 'Mentorships', icon: Users, color: 'text-pink-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: false, delay: '1s' },
    { id: 7, name: 'Courses', icon: GraduationCap, color: 'text-purple-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: true, delay: '1.2s' },
    { id: 8, name: 'Projects', icon: Rocket, color: 'text-rose-500', bgColor: 'from-[#f0f7ff] to-[#e0efff]', isSparkle: false, delay: '1.4s' },
];

export default function CategorySlider() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-12 bg-white overflow-hidden relative border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                <button
                    onClick={() => scroll('left')}
                    className="absolute left-1 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 bg-white/90 backdrop-blur shadow-md rounded-full border border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-1 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 bg-white/90 backdrop-blur shadow-md rounded-full border border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>

                <style>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  /* Seamless Z-based 3D Animation for Icons */
                  @keyframes float3D {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                  }
                  @keyframes spin3D {
                    0% { transform: rotateY(0deg) rotateX(15deg); }
                    100% { transform: rotateY(360deg) rotateX(15deg); }
                  }
                `}</style>

                <div
                    ref={sliderRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                            className={`relative min-w-[140px] w-[140px] sm:min-w-[170px] sm:w-[170px] h-[180px] sm:h-[200px] rounded-[32px] bg-gradient-to-br ${category.bgColor} shadow-sm hover:shadow-xl transition-all duration-300 snap-start flex-shrink-0 cursor-pointer overflow-visible border border-white group`}
                        >
                            {/* Glass overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-80 rounded-[32px] pointer-events-none z-0"></div>

                            {category.isSparkle && (
                                <div className="absolute top-6 left-5 text-purple-400 text-xl animate-pulse z-10">
                                    ✨
                                </div>
                            )}

                            <div className="relative p-5 h-full flex flex-col items-center justify-between z-10">
                                <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-800 text-center leading-tight group-hover:text-blue-700 transition-colors">
                                    {category.name}
                                </h3>

                                {/* 3D ANIMATED ICON ENGINE container */}
                                <div className="relative w-full h-24 mt-auto mb-2 flex items-center justify-center [perspective:1000px] pointer-events-none">

                                    {/* The floating base bobbing up and down */}
                                    <div
                                        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
                                        style={{ animation: `float3D 4s ease-in-out infinite`, animationDelay: category.delay }}
                                    >

                                        {/* Ground floating drop shadow */}
                                        <div className="absolute bottom-[-10px] w-14 h-4 bg-black/10 rounded-[100%] blur-[6px] [transform:rotateX(70deg)] group-hover:bg-black/20 transition-all duration-300"></div>

                                        {/* Spinning 3D Extrusion Engine */}
                                        <div
                                            className="relative w-12 h-12 flex items-center justify-center [transform-style:preserve-3d] group-hover:scale-110 transition-transform duration-500"
                                            style={{ animation: 'spin3D 7s linear infinite', animationDelay: category.delay }}
                                        >

                                            {/* Z-Index Front layer (Glowing Face) */}
                                            <div className={`absolute inset-0 flex items-center justify-center [transform:translateZ(8px)] ${category.color} drop-shadow-[0_0_12px_currentColor]`}>
                                                <category.icon className="w-full h-full" strokeWidth={2.5} />
                                            </div>

                                            {/* Middle Extrusion Layers (Creating Solid Volume) */}
                                            <div className={`absolute inset-0 flex items-center justify-center [transform:translateZ(6px)] ${category.color} opacity-90 brightness-90`}>
                                                <category.icon className="w-full h-full" strokeWidth={3} />
                                            </div>
                                            <div className={`absolute inset-0 flex items-center justify-center [transform:translateZ(4px)] ${category.color} opacity-70 brightness-75`}>
                                                <category.icon className="w-full h-full" strokeWidth={3} />
                                            </div>
                                            <div className={`absolute inset-0 flex items-center justify-center [transform:translateZ(2px)] ${category.color} opacity-50 brightness-50`}>
                                                <category.icon className="w-full h-full" strokeWidth={3} />
                                            </div>

                                            {/* Z-Index Back layer (Shadow Face) */}
                                            <div className={`absolute inset-0 flex items-center justify-center [transform:translateZ(0px)] ${category.color} opacity-40 brightness-50 blur-[1px]`}>
                                                <category.icon className="w-full h-full" strokeWidth={2.5} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
