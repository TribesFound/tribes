
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect to splash screen for proper app flow
    navigate('/splash');
  }, [navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen tribal-gradient flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-orange-400 border-t-transparent"></div>
        <p className="text-lg opacity-90">Loading Tribes...</p>
      </div>
    </div>
  );
};

export default Index;
