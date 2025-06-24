
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, MessageCircle, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/matches', icon: MessageCircle, label: 'Matches' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (location.pathname === '/auth' || location.pathname === '/onboarding') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-orange-200 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              variant="ghost"
              className={`flex-col h-16 w-16 transition-all ${
                isActive(path)
                  ? 'bg-orange-100 text-orange-700 transform scale-105'
                  : 'text-gray-500 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
