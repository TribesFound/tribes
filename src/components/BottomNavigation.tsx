
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
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              variant="ghost"
              className={`flex-col h-16 w-16 ${
                isActive(path)
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
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
