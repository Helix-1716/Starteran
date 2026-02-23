import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Users, MessageCircle, CheckCircle, ArrowRight, Star, Building, User, Sparkles, Zap, Target, LogOut, Menu, X } from 'lucide-react';
import HackathonSlider from './HackathonSlider';
import CategorySlider from './CategorySlider';
import BigCircularNeuralFlow from './BigCircularNeuralFlow';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 group">
              <img src="/logo.png" alt="StartEarn" className="w-10 h-10 object-contain transform group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                StartEarn
              </span>
            </div>

            {user ? (
              // Logged in user - show profile and navigation
              <div className="flex items-center space-x-1 sm:space-x-4">
                <Link
                  to="/dashboard"
                  className="hidden md:block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="hidden md:block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Messages
                </Link>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <img
                    src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.full_name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:inline-block text-gray-700 font-medium max-w-[100px] truncate">{user.full_name}</span>
                  <button
                    onClick={logout}
                    className="hidden md:block p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            ) : (
              // Not logged in - show Get Started button
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth"
                  className="hidden md:inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50 animate-in slide-in-from-top-2">
            <div className="px-4 py-3 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Dashboard</Link>
                  <Link to="/chat" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Messages</Link>
                  <button onClick={() => { setIsMenuOpen(false); logout(); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-red-600 hover:bg-red-50 transition-colors">Sign Out</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center transition-colors">Get Started</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-pulse">
                <Sparkles className="w-4 h-4 mr-2" />
                Join 10,000+ professionals
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Connect
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent animate-pulse"> Talent </span>
                with
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent animate-pulse"> Opportunity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Not just jobs, but build your career. From small tasks to CEO positions - every opportunity is here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {user ? (
                  // Logged in user - show dashboard buttons
                  <>
                    <Link
                      to="/dashboard"
                      className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                    >
                      <User className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                      Go to Dashboard
                    </Link>
                    <Link
                      to="/chat"
                      className="group inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                    >
                      <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      View Messages
                    </Link>
                  </>
                ) : (
                  // Not logged in - show signup buttons
                  <>
                    <Link
                      to="/auth"
                      className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                    >
                      <User className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                      I'm Looking for Work
                    </Link>
                    <Link
                      to="/auth"
                      className="group inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                    >
                      <Building className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      I'm Hiring
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>

              {/* Massive Oversized Network Background Wrapper */}
              <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <BigCircularNeuralFlow particleCount={220} speed={0.9} connectionDistance={160} glowIntensity={1.2} />
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">React Developer</p>
                      <p className="text-sm text-gray-600">₹8,00,000 - ₹12,00,000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Startup CEO</p>
                      <p className="text-sm text-gray-600">Equity + Salary</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">Content Writer</p>
                      <p className="text-sm text-gray-600">₹500/article</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      <CategorySlider />

      <HackathonSlider />

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">StartEarn</span>?
            </h2>
            <p className="text-xl text-gray-600">Features of our platform that help you grow</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Search",
                description: "Find your perfect job or candidate with advanced filters.",
                color: "blue",
                delay: 0
              },
              {
                icon: Users,
                title: "Verified Profiles",
                description: "Trusted connections with verified profiles of all users.",
                color: "green",
                delay: 100
              },
              {
                icon: MessageCircle,
                title: "Real-time Chat",
                description: "Direct communication with instant messaging.",
                color: "purple",
                delay: 200
              },
              {
                icon: CheckCircle,
                title: "Easy Hiring",
                description: "Seamless hiring process with built-in offer management.",
                color: "orange",
                delay: 300
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-${feature.color}-50 to-${feature.color === 'purple' ? 'violet' : feature.color}-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-${feature.color}-100/50 hover:border-${feature.color}-200`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-200">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10,000+", label: "Active Job Seekers" },
              { number: "2,500+", label: "Companies Hiring" },
              { number: "15,000+", label: "Jobs Posted" }
            ].map((stat, index) => (
              <div key={index} className="text-white group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-blue-100 group-hover:text-white transition-colors duration-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Real Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "StartEarn helped me find the perfect job. It's a very user-friendly platform.",
                name: "Rahul Sharma",
                role: "Software Developer",
                image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                quote: "Our company found the best talent here. The hiring process was very smooth.",
                name: "Priya Patel",
                role: "HR Manager",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                quote: "Perfect platform for freelancing. Quality clients are found here.",
                name: "Amit Kumar",
                role: "Freelance Designer",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-200" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-200">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-200">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" />
            Ready to Start?
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join today and find your perfect match.
          </p>
          <Link
            to="/auth"
            className="group inline-flex items-center px-10 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-lg"
          >
            Join StartEarn Today
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-2 ${!user ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-8`}>
            <div>
              <div className="flex items-center space-x-2 mb-4 group">
                <img src="/logo.png" alt="StartEarn" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-200">StartEarn</span>
              </div>
              <p className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
                Connecting talent with opportunity across India.
              </p>
            </div>
            {(user?.role === 'student' || user?.role === 'employee' || !user) && (
              <div>
                <h3 className="text-white font-semibold mb-4 hover:text-blue-200 transition-colors duration-200">For Job Seekers</h3>
                <ul className="space-y-2 text-gray-400">
                  {['Browse Jobs', 'Career Resources', 'Resume Builder', 'Interview Tips'].map((item, index) => (
                    <li key={index} className="hover:text-white transition-colors duration-200 cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {(user?.role === 'recruiter' || !user) && (
              <div>
                <h3 className="text-white font-semibold mb-4 hover:text-blue-200 transition-colors duration-200">For Employers</h3>
                <ul className="space-y-2 text-gray-400">
                  {['Post a Job', 'Search Candidates', 'Recruitment Solutions', 'Pricing'].map((item, index) => (
                    <li key={index} className="hover:text-white transition-colors duration-200 cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="text-white font-semibold mb-4 hover:text-blue-200 transition-colors duration-200">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors duration-200 block">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors duration-200 block">Contact Us</Link></li>
                <li><Link to="/feedback" className="hover:text-white transition-colors duration-200 block">Feedback & Suggestions</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors duration-200 block">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors duration-200 block">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 hover:text-blue-200 transition-colors duration-200">Connect</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
              <p className="text-sm text-gray-400 mb-3 block">Subscribe to Newsletter</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-3 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-sm border-y border-l border-gray-700 hover:border-gray-600 transition-colors" />
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-r-lg transition-colors text-white border border-blue-600 flex items-center justify-center min-w-[40px]">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StartEarn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}