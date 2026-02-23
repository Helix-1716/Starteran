import { useEffect, useState } from 'react';
import { ChatProvider } from '../contexts/ChatContext';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default function Chat() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Security: only authenticated users
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ChatProvider>
      <div className="bg-gray-50 w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] bg-white shadow-sm flex overflow-hidden border-t border-gray-100">
          <ErrorBoundary>
            <ChatList />
          </ErrorBoundary>

          <ErrorBoundary>
            <ChatWindow />
          </ErrorBoundary>
        </div>
      </div>
    </ChatProvider>
  );
}