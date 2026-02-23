import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Book, MessageSquare, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        category: "Getting Started",
        icon: <Book className="w-5 h-5 text-blue-500" />,
        questions: [
            { q: "How do I create an account?", a: "Click on the 'Get Started' button on the top right, select whether you are looking for work or hiring, and fill in your details or sign in with Google." },
            { q: "Is StartEarn free to use?", a: "Yes, creating an account and applying for jobs is completely free for job seekers. Employers have specific pricing plans for premium listings." },
        ]
    },
    {
        category: "Profile & Account",
        icon: <Shield className="w-5 h-5 text-green-500" />,
        questions: [
            { q: "How do I update my resume?", a: "Go to your Profile section from the dashboard, click on 'Edit Profile', and upload your latest resume in the document section." },
            { q: "How do I reset my password?", a: "Click on 'Forgot Password' on the login screen, enter your registered email, and follow the instructions sent to your inbox." },
        ]
    },
    {
        category: "Applying & Messaging",
        icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
        questions: [
            { q: "How do I chat with employers?", a: "Once you have applied for a role and the employer initiates a chat, you can access the conversation in your 'Messages' tab." },
            { q: "Can I share files in chat?", a: "Yes, you can click the paperclip icon in the chat window to send photos, videos, and documents safely." },
        ]
    }
];

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleOpen = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="flex justify-start mb-6">
                        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How can we help you?</h1>
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for articles, questions, or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 pl-14"
                        />
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
                <div className="space-y-10">
                    {faqs.map((section, sIndex) => {
                        const visibleQuestions = section.questions.filter(q =>
                            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            q.a.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (visibleQuestions.length === 0) return null;

                        return (
                            <div key={sIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{section.category}</h2>
                                </div>

                                <div className="space-y-4">
                                    {visibleQuestions.map((item, qIndex) => {
                                        const id = `${sIndex}-${qIndex}`;
                                        const isOpen = openIndex === id;
                                        return (
                                            <div key={qIndex} className="border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-colors">
                                                <button
                                                    onClick={() => toggleOpen(id)}
                                                    className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-semibold text-gray-800 transition-colors"
                                                >
                                                    <span>{item.q}</span>
                                                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 py-4 text-gray-600 bg-white leading-relaxed">
                                                        {item.a}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {searchQuery && !faqs.some(s => s.questions.some(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))) && (
                        <div className="text-center py-10">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found for "{searchQuery}"</h3>
                            <p className="text-gray-500">Try checking for typos or searching with different keywords.</p>
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Still need help?</h3>
                    <p className="text-gray-600 mb-6">If you couldn't find the answer to your question, our support team is ready to assist you.</p>
                    <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
