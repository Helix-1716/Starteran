import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import { useSound } from '../lib/soundUtils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { playClick } = useSound();

  const handleLogout = async () => {
    playClick();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Helper to check if a path is active
  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      return (
        location.pathname === '/dashboard' ||
        location.pathname === '/employee-dashboard' ||
        location.pathname === '/recruiter-dashboard'
      );
    }
    return location.pathname === path;
  };

  const handleMenuToggle = () => {
    playClick();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    playClick();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => playClick()}
              className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span>StartEarn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={() => playClick()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive('/') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link
              to="/explore-ideas"
              onClick={() => playClick()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive('/explore-ideas') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Explore Ideas
            </Link>
            <Link
              to="/explore-ai-tools"
              onClick={() => playClick()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive('/explore-ai-tools') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Explore AI Tools
            </Link>
            <Link
              to="/rate-us"
              onClick={() => playClick()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive('/rate-us') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Rate Us!
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => playClick()}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive('/dashboard') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  onClick={() => playClick()}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive('/chat') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Messages
                </Link>
                {/* Notification Dropdown */}
                <NotificationDropdown />
                {/* Join Pro button - positioned next to notification */}
                <Link
                  to="/pricing"
                  onClick={() => playClick()}
                  className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors duration-200"
                >
                  Join Pro
                </Link>
                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => { playClick(); setIsProfileMenuOpen(prev => !prev); }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                    <span className="text-sm font-medium">{user.full_name}</span>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => playClick()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuToggle}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  Join Pro
                </Link>
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={handleNavLinkClick}
            >
              Home
            </Link>
            <Link
              to="/explore-ideas"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/explore-ideas') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={handleNavLinkClick}
            >
              Explore Ideas
            </Link>
            <Link
              to="/explore-ai-tools"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/explore-ai-tools') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={handleNavLinkClick}
            >
              Explore AI Tools
            </Link>
            <Link
              to="/rate-us"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/rate-us') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={handleNavLinkClick}
            >
              Rate Us!
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/dashboard') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
                  onClick={handleNavLinkClick}
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/chat') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
                  onClick={handleNavLinkClick}
                >
                  Messages
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive('/profile') ? 'ring-2 ring-blue-500 bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-600'}`}
                  onClick={handleNavLinkClick}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                onClick={handleNavLinkClick}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}