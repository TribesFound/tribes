
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, MessageCircle, User, Heart } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-800/90 to-orange-800/90 backdrop-blur-lg border-t border-yellow-600/30">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              variant="ghost"
              className={`flex-col h-16 w-16 ${
                isActive(path)
                  ? 'bg-yellow-600/30 text-yellow-100'
                  : 'text-yellow-200/70 hover:text-yellow-100 hover:bg-yellow-600/20'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
