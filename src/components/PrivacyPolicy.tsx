import { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-blue-400/30">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-xl text-blue-200">Last updated: February 2026</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-blue max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Welcome to StartEarn. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. The Data We Collect</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, and date of birth.</li>
                        <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                        <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Details</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@startearn.in" className="text-blue-600 hover:text-blue-800">privacy@startearn.in</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
