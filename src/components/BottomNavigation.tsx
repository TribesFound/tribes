
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, MessageCircle, User, Users, Calendar } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/friends', icon: Users, label: 'Bonds' },
    { path: '/matches', icon: MessageCircle, label: 'Messages' },
    { path: '/events', icon: Calendar, label: 'Gather' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const hiddenPaths = ['/auth', '/welcome', '/signup-method', '/settings', '/splash'];
  
  if (hiddenPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 tribal-nav">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              variant="ghost"
              className={`flex-col h-16 w-16 transition-all tribal-icon ${
                isActive(path)
                  ? 'bg-orange-100 text-orange-700 transform scale-105'
                  : 'text-amber-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" strokeWidth={2.5} />
              <span className="text-xs font-medium tribal-text">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
