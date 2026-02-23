import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we set up your experience.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Redirect based on user role
  switch (user.role) {
    case 'employee':
      return <Navigate to="/employee-dashboard" />;
    case 'recruiter':
      return <Navigate to="/recruiter-dashboard" />;
    case 'student':
      return <Navigate to="/student-dashboard" />;
    default:
      return <Navigate to="/employee-dashboard" />;
  }
}