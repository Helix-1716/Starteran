import { useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                    <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-indigo-400/30">
                        <FileText className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-xl text-indigo-200">Effective from: February 2026</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-indigo max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and StartEarn ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Representations</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        By using the Site, you represent and warrant that:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                        <li>You are not a minor in the jurisdiction in which you reside.</li>
                        <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prohibited Activities</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Generated Contributions</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed">
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <a href="mailto:legal@startearn.in" className="text-indigo-600 hover:text-indigo-800">legal@startearn.in</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
