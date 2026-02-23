import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, BookOpen, Briefcase, GraduationCap, Star, Clock, TrendingUp,
    Users, Award, Target, ArrowRight, MapPin,
    DollarSign, Zap, CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Job, subscribeToJobs } from '../lib/jobsService';

interface Course {
    id: string;
    title: string;
    provider: string;
    category: string;
    progress: number;
    duration: string;
    rating: number;
    image: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const featuredCourses: Course[] = [
    {
        id: '1',
        title: 'Full Stack Web Development',
        provider: 'Udemy',
        category: 'Development',
        progress: 65,
        duration: '40 hours',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
        level: 'Intermediate',
    },
    {
        id: '2',
        title: 'UI/UX Design Fundamentals',
        provider: 'Coursera',
        category: 'Design',
        progress: 30,
        duration: '25 hours',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
        level: 'Beginner',
    },
    {
        id: '3',
        title: 'Data Science with Python',
        provider: 'edX',
        category: 'Data Science',
        progress: 0,
        duration: '60 hours',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
        level: 'Advanced',
    },
];

export default function StudentDashboard() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'internships' | 'courses' | 'resources'>('internships');

    useEffect(() => {
        const unsubscribe = subscribeToJobs((jobsData) => {
            setJobs(jobsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getTimeAgo = (timestamp: any) => {
        if (!timestamp) return 'Recently';
        const now = new Date();
        const jobDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const diffMs = now.getTime() - jobDate.getTime();
        const diffInHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return diffInHours + 'h ago';
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return diffInDays + 'd ago';
        return jobDate.toLocaleDateString();
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'bg-green-100 text-green-700';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
            case 'Advanced': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <GraduationCap className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Hey, {user?.full_name?.split(' ')[0] || 'Student'}! 👋
                                    </h1>
                                    <p className="text-green-100 text-sm">Student Dashboard</p>
                                </div>
                            </div>
                            <p className="text-green-100 mt-2 max-w-lg">
                                Explore internships, learn new skills, and kickstart your career. Your journey begins here!
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <Link
                                to="/explore-ideas"
                                className="inline-flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                Explore Ideas
                            </Link>
                            <Link
                                to="/explore-ai-tools"
                                className="inline-flex items-center px-5 py-2.5 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-lg"
                            >
                                <Star className="w-4 h-4 mr-2" />
                                AI Tools
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-8">
                    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-blue-100 rounded-lg">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Internships</p>
                                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-green-100 rounded-lg">
                                <BookOpen className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</p>
                                <p className="text-2xl font-bold text-gray-900">{featuredCourses.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-purple-100 rounded-lg">
                                <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</p>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-orange-100 rounded-lg">
                                <Target className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Completeness */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 mb-8 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Complete Your Profile</h3>
                        </div>
                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">40% Complete</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                        <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: '40%' }}></div>
                    </div>
                    <p className="text-green-100 text-sm">Add your skills, experience, and education to get better internship recommendations.</p>
                    <Link
                        to="/profile"
                        className="inline-flex items-center mt-3 text-sm font-semibold text-white hover:underline"
                    >
                        Update Profile <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-0">
                            {([
                                { id: 'internships' as const, label: 'Internships & Jobs', icon: Briefcase },
                                { id: 'courses' as const, label: 'Courses', icon: BookOpen },
                                { id: 'resources' as const, label: 'Resources', icon: TrendingUp },
                            ]).map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={'flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 ' +
                                            (activeTab === tab.id
                                                ? 'border-green-500 text-green-600 bg-green-50/50'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50')
                                        }
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Internships Tab */}
                        {activeTab === 'internships' && (
                            <div className="space-y-6">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search internships, companies, skills..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                {loading ? (
                                    <div className="text-center py-12">
                                        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading opportunities...</p>
                                    </div>
                                ) : filteredJobs.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
                                        <p className="text-gray-600">Try different search terms or check back later.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {filteredJobs.map((job) => (
                                            <div
                                                key={job.id}
                                                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-200 transition-all duration-200 hover:-translate-y-0.5 group"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4 flex-1">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                            {job.company.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                                                                <Link to={'/job/' + job.id}>{job.title}</Link>
                                                            </h3>
                                                            <p className="text-gray-600 font-medium">{job.company}</p>
                                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                                                                <span className="flex items-center">
                                                                    <MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <DollarSign className="w-3.5 h-3.5 mr-1" /> {job.salary}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Clock className="w-3.5 h-3.5 mr-1" /> {getTimeAgo(job.createdAt)}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {job.skills.slice(0, 4).map((skill, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                                {job.skills.length > 4 && (
                                                                    <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                                                                        +{job.skills.length - 4} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-2 ml-4">
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                            {job.type}
                                                        </span>
                                                        <Link
                                                            to={'/job/' + job.id}
                                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow"
                                                        >
                                                            Apply <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Courses Tab */}
                        {activeTab === 'courses' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900">Recommended Courses</h3>
                                    <span className="text-sm text-gray-500">{featuredCourses.length} courses</span>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredCourses.map((course) => (
                                        <div key={course.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <span className={'px-2.5 py-1 rounded-full text-xs font-medium ' + getLevelColor(course.level)}>
                                                        {course.level}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-3 left-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                                    <span className="text-xs font-medium ml-1 text-gray-700">{course.rating}</span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{course.category}</span>
                                                <h4 className="font-bold text-gray-900 mt-2 mb-1 line-clamp-2">{course.title}</h4>
                                                <p className="text-sm text-gray-500 mb-3">{course.provider} &bull; {course.duration}</p>

                                                {course.progress > 0 ? (
                                                    <div>
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                            <span>Progress</span>
                                                            <span className="font-medium">{course.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                                                style={{ width: course.progress + '%' }}
                                                            ></div>
                                                        </div>
                                                        <button className="w-full mt-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                                                            Continue Learning
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button className="w-full py-2 border border-green-600 text-green-600 text-sm font-medium rounded-lg hover:bg-green-50 transition-colors duration-200">
                                                        Start Course
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Resources Tab */}
                        {activeTab === 'resources' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900">Learning Resources</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            title: 'Resume Building Guide',
                                            description: 'Learn how to create a standout resume that gets you interviews.',
                                            icon: BookOpen,
                                            colorClass: 'bg-blue-100 text-blue-600',
                                            tag: 'Popular',
                                        },
                                        {
                                            title: 'Interview Preparation',
                                            description: 'Practice common interview questions and ace your next interview.',
                                            icon: Users,
                                            colorClass: 'bg-purple-100 text-purple-600',
                                            tag: 'Essential',
                                        },
                                        {
                                            title: 'LinkedIn Optimization',
                                            description: 'Make your LinkedIn profile stand out to recruiters and get noticed.',
                                            icon: TrendingUp,
                                            colorClass: 'bg-green-100 text-green-600',
                                            tag: 'Trending',
                                        },
                                        {
                                            title: 'Freelancing 101',
                                            description: 'Start your freelancing journey and earn while you learn.',
                                            icon: Zap,
                                            colorClass: 'bg-orange-100 text-orange-600',
                                            tag: 'New',
                                        },
                                    ].map((resource, index) => {
                                        const Icon = resource.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-200 transition-all duration-200 cursor-pointer group"
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className={'p-3 rounded-xl ' + resource.colorClass}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                                                                {resource.title}
                                                            </h4>
                                                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                                {resource.tag}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{resource.description}</p>
                                                        <button className="mt-3 flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200">
                                                            Read More <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Tips Section */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                        <Award className="w-5 h-5 text-green-600 mr-2" />
                                        Quick Tips for Students
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {[
                                            'Build projects to showcase your skills',
                                            'Network with professionals on LinkedIn',
                                            'Contribute to open-source projects',
                                            'Attend hackathons and competitions',
                                            'Start a blog to share your learnings',
                                            'Learn at least one in-demand technology',
                                        ].map((tip, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{tip}</span>
                                            </div>
                                        ))}
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
