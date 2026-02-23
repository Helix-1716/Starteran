import { useState, useEffect } from 'react';
import { MessageSquarePlus, Lightbulb, ThumbsUp, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Feedback() {
    const [formData, setFormData] = useState({ name: '', email: '', type: 'Feedback', rating: '5', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', type: 'Feedback', rating: '5', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center z-10">
                    <Link to="/" className="inline-flex flex-row items-center text-white/80 hover:text-white mb-6 transition-colors absolute left-4 sm:left-6 top-0">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>
                    <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6 backdrop-blur-sm border border-white/30">
                        <MessageSquarePlus className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Feedback & Suggestions</h1>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        Help us build the perfect platform for you. Let us know what you love, what's broken, or what new features you dream of!
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10 w-full mb-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">

                    {isSubmitted ? (
                        <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 h-full">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h3>
                            <p className="text-lg text-gray-600 max-w-md mx-auto">
                                Your input is incredibly valuable to us. Our product team reads every submission to make StartEarn better for everyone.
                            </p>
                        </div>
                    ) : null}

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col items-center text-center">
                            <ThumbsUp className="w-8 h-8 text-orange-500 mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">General Feedback</h3>
                            <p className="text-sm text-gray-600">Tell us about your experience using the site.</p>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center text-center">
                            <Lightbulb className="w-8 h-8 text-red-500 mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">Feature Suggestions</h3>
                            <p className="text-sm text-gray-600">Have a bold idea? We want to build it.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">What is this regarding? <span className="text-red-500">*</span></label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-colors appearance-none"
                                >
                                    <option value="Feedback">General Feedback</option>
                                    <option value="Suggestion">Feature Suggestion</option>
                                    <option value="Bug">Reporting a Bug / Glitch</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rate your experience</label>
                                <select
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-colors appearance-none"
                                >
                                    <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                                    <option value="4">⭐⭐⭐⭐ (Good) </option>
                                    <option value="3">⭐⭐⭐ (Average)</option>
                                    <option value="2">⭐⭐ (Poor)</option>
                                    <option value="1">⭐ (Terrible)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your thoughts <span className="text-red-500">*</span></label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none"
                                placeholder="Please be as detailed as possible..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-orange-500/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Submit Feedback</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
