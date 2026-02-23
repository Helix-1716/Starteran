import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Clock, Building, MapPin, Award } from 'lucide-react';

const categoryData: Record<string, { title: string; emoji: string; desc: string; heroBg: string }> = {
    'internships': {
        title: 'Explore Internships',
        emoji: '💼',
        desc: 'Kickstart your career with top internships from global companies.',
        heroBg: 'from-blue-600 to-indigo-700'
    },
    'jobs': {
        title: 'Explore Jobs',
        emoji: '🔍',
        desc: 'Find your dream full-time role across the best tech and corporate firms.',
        heroBg: 'from-emerald-600 to-teal-700'
    },
    'competitions': {
        title: 'Featured Competitions',
        emoji: '🏆',
        desc: 'Participate in Hackathons & coding challenges to prove your mettle.',
        heroBg: 'from-orange-500 to-red-600'
    },
    'mock-tests': {
        title: 'Mock Tests',
        emoji: '📝',
        desc: 'Prepare for assessments with our curated mock tests and sample papers.',
        heroBg: 'from-purple-600 to-fuchsia-700'
    },
    'mock-interviews': {
        title: 'Mock Interviews',
        emoji: '💻',
        desc: 'Practice with industry experts and ace your actual interview.',
        heroBg: 'from-cyan-600 to-blue-700'
    },
    'mentorships': {
        title: 'Find a Mentor',
        emoji: '🤝',
        desc: 'Get 1-on-1 guidance from top professionals to accelerate your growth.',
        heroBg: 'from-amber-500 to-orange-600'
    },
    'courses': {
        title: 'Premium Courses',
        emoji: '🎓',
        desc: 'Upskill with carefully crafted crash courses and certifications.',
        heroBg: 'from-indigo-600 to-purple-700'
    },
    'projects': {
        title: 'Live Projects',
        emoji: '🚀',
        desc: 'Work on live projects to build a stellar portfolio.',
        heroBg: 'from-rose-500 to-pink-600'
    }
};

const mockListings = [
    { id: 1, title: 'Software Engineering Intern', company: 'TechNova', location: 'Remote', duration: '3 Months', stipend: '₹20,000/mo', type: 'Internship', tags: ['React', 'Node.js'] },
    { id: 2, title: 'Product Design Challenge', company: 'DesignHub', location: 'Online', duration: '2 Days', stipend: '₹50,000 Prize', type: 'Competition', tags: ['UI/UX', 'Figma'] },
    { id: 3, title: 'Data Science Mock Test', company: 'StartEarn Prep', location: 'Online', duration: '90 Mins', stipend: 'Free', type: 'Mock Test', tags: ['Python', 'ML'] },
    { id: 4, title: 'Full Stack Developer', company: 'InnovateX', location: 'Bangalore', duration: 'Full Time', stipend: '₹12L - ₹18L', type: 'Job', tags: ['MERN', 'AWS'] },
    { id: 5, title: 'System Design Interview Prep', company: 'Expert Panel', location: 'Video Call', duration: '60 Mins', stipend: '₹999/session', type: 'Mentorship', tags: ['System Design', 'FAANG'] },
];

export default function CategoryPage() {
    const { categorySlug } = useParams();
    const navigate = useNavigate();

    // Normalize slug to match our dictionary
    const slug = categorySlug?.toLowerCase() || '';
    const info = categoryData[slug];

    if (!info) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className={`pt-20 pb-16 bg-gradient-to-r ${info.heroBg} relative overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl mix-blend-overlay pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </button>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-5xl sm:text-6xl drop-shadow-md">{info.emoji}</span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">{info.title}</h1>
                    </div>
                    <p className="text-xl text-white/90 max-w-2xl font-medium">{info.desc}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-30px] relative z-20">

                {/* Search & Filter Bar */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100 mb-8">
                    <div className="relative w-full md:w-[60%] lg:w-[70%]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder={`Search inside ${info.title}...`}
                        />
                    </div>
                    <div className="flex w-full md:w-auto gap-3">
                        <button className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                            <Filter className="w-4 h-4 mr-2" /> Filters
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                            Search
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">

                    {/* Left Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-1 space-y-6">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Status</h3>
                            <div className="space-y-3">
                                <label className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600">
                                    <input type="checkbox" className="mr-3 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" defaultChecked /> Open
                                </label>
                                <label className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600">
                                    <input type="checkbox" className="mr-3 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" /> Closed
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Location</h3>
                            <div className="space-y-3">
                                <label className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600">
                                    <input type="checkbox" className="mr-3 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" /> Work from Home
                                </label>
                                <label className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600">
                                    <input type="checkbox" className="mr-3 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" /> In-Office
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'UI/UX', 'Python', 'Marketing', 'Java', 'Sales'].map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Main Content Listings */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Found <span className="text-blue-600">24+</span> Opportunities</h2>
                            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none">
                                <option>Sort by: Relevant</option>
                                <option>Sort by: Newest</option>
                                <option>Sort by: Most popular</option>
                            </select>
                        </div>

                        {/* Cards */}
                        {mockListings.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-100 transition-all group flex flex-col md:flex-row gap-6 cursor-pointer transform hover:-translate-y-1">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden shadow-inner">
                                    {/* Logo Placeholder */}
                                    <Building className="w-8 h-8 text-gray-400" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                            <p className="text-gray-500 font-medium">{item.company}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
                                            Active
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {item.location}</div>
                                        <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-gray-400" /> {item.duration}</div>
                                        <div className="flex items-center"><Award className="w-4 h-4 mr-1.5 text-gray-400" /> {item.stipend}</div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-5 border-t border-gray-50 pt-4">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex md:flex-col items-center justify-center md:items-end gap-3 mt-4 md:mt-0 shrink-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                    <button className="px-6 py-2.5 w-full md:w-auto bg-white border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors focus:ring-4 focus:ring-blue-100">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Pagination (Visual) */}
                        <div className="flex justify-center mt-10 pt-6">
                            <nav className="flex items-center gap-2">
                                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 bg-white"><ArrowLeft className="w-4 h-4" /></button>
                                <button className="w-10 h-10 border border-blue-600 bg-blue-50 text-blue-600 rounded-lg font-bold">1</button>
                                <button className="w-10 h-10 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 rounded-lg font-medium">2</button>
                                <button className="w-10 h-10 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 rounded-lg font-medium">3</button>
                                <span className="text-gray-400 px-2">...</span>
                                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 bg-white"><ArrowLeft className="w-4 h-4 rotate-180" /></button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
