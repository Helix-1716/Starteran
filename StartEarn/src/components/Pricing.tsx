import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Home, Compass, PlusCircle, MessageSquare, User } from 'lucide-react';

type BillingCycle = 'monthly' | 'yearly';

export default function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-40 shadow-sm">
        <div className="w-full max-w-6xl mx-auto px-6 h-16 flex items-center justify-center relative">
          <button
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="absolute left-6 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Pricing Plans</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full pb-32">
        <div className="w-full max-w-6xl mx-auto px-6 pt-12 space-y-12">
          {/* Toggle */}
          <div className="flex items-center justify-center">
            <div className="inline-flex bg-gray-100 rounded-full p-2 shadow-inner">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="w-full h-full rounded-2xl border border-gray-200 shadow-lg bg-white p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Plan</h2>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">0 Rs</p>
                  <p className="text-lg font-medium text-gray-500">/month</p>
                </div>
                <button className="w-full max-w-xs rounded-full bg-gray-100 text-gray-700 py-4 font-semibold hover:bg-gray-200 transition-colors duration-200 text-base">
                  Current Plan
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h3>
                <ul className="space-y-4 text-gray-700">
                  {[
                    '1 Project Slot',
                    'Basic Collaboration Tools',
                    'Community Support',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="font-medium text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="w-full h-full rounded-2xl border-2 border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 to-white p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                Popular
              </div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Plan</h2>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">1999 Rs</p>
                  <p className="text-lg font-medium text-gray-500">/month</p>
                </div>
                <button className="w-full max-w-xs rounded-full bg-blue-600 text-white py-4 font-semibold hover:bg-blue-700 transition-colors duration-200 text-base shadow-lg hover:shadow-xl">
                  Upgrade Now
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h3>
                <ul className="space-y-4 text-gray-700">
                  {[
                    'Unlimited Project Slots',
                    'Advanced Collaboration Tools',
                    'AI-Powered Idea Validation',
                    'Analytics Dashboard',
                    'Priority Support',
                    'Exclusive Mentor Access',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="font-medium text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="w-full max-w-md mx-auto px-8 py-4 grid grid-cols-5 gap-4 text-sm">
          <Link to="/" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-700 transition-colors duration-200">
            <Home className="w-6 h-6" />
            <span className="mt-2 font-medium">Home</span>
          </Link>
          <Link to="/explore-ideas" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-700 transition-colors duration-200">
            <Compass className="w-6 h-6" />
            <span className="mt-2 font-medium">Explore</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-700 transition-colors duration-200">
            <PlusCircle className="w-6 h-6" />
            <span className="mt-2 font-medium">Create</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-700 transition-colors duration-200">
            <MessageSquare className="w-6 h-6" />
            <span className="mt-2 font-medium">Messages</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center text-blue-600">
            <User className="w-6 h-6" />
            <span className="mt-2 font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}


