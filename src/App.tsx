
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import StudentDashboard from './components/StudentDashboard';
import JobDetails from './components/JobDetails';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import ExploreIdeas from './components/ExploreIdeas';
import ExploreAITools from './components/ExploreAITools';
import RatingPage from './components/RatingPage';
import Pricing from './components/Pricing';
import Settings from './components/Settings';
import HackathonDetail from './components/HackathonDetail';
import CategoryPage from './components/CategoryPage';
import ContactUs from './components/ContactUs';
import HelpCenter from './components/HelpCenter';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Feedback from './components/Feedback';

import AuthLoader from './components/AuthLoader';

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoader />;
  }

  // Don't show navbar on landing page or auth page
  const showNavbar = user && location.pathname !== '/' && location.pathname !== '/auth';

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/explore-ideas" element={<ExploreIdeas />} />
        <Route path="/explore-ai-tools" element={<ExploreAITools />} />
        <Route path="/rate-us" element={<RatingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/hackathon/:id" element={<HackathonDetail />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;