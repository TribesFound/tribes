import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already completed profile setup (returning user)
      const hasProfile = localStorage.getItem('tribes_profile_complete');
      
      if (hasProfile) {
        // Returning user - go straight to discover
        navigate('/discover');
      } else {
        // New user - show welcome flow
        navigate('/welcome');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen tribal-gradient flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgTCAwIDYwIE0gMzAgMzAgbCAzMCAtMzAiIHN0cm9rZT0icmdiYSgxMzksIDExNSwgODUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="text-center z-10">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto animate-pulse">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-full h-full animate-scale-in"
            />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-orange-400 rounded-full animate-ping opacity-25"></div>
        </div>
        
        <h1 className="text-6xl font-bold tribal-font text-white mb-4 animate-fade-in">
          TRIBES
        </h1>
        <p className="text-xl text-orange-200 opacity-90 animate-fade-in">
          Find Your Tribe
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
