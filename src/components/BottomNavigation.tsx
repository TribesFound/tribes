
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Cave painting style glyph components
const ProfileGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <circle cx="12" cy="8" r="1" fill="currentColor"/>
  </svg>
);

const DiscoverGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 3v6M12 15v6M21 12h-6M9 12H3"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const BondsGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    <circle cx="9" cy="7" r="1" fill="currentColor"/>
  </svg>
);

const MessagesGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="9" cy="10" r="1" fill="currentColor"/>
    <circle cx="15" cy="10" r="1" fill="currentColor"/>
    <path d="M9 14h6" strokeWidth="2"/>
  </svg>
);

const GatherGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <circle cx="8" cy="15" r="1" fill="currentColor"/>
    <circle cx="12" cy="15" r="1" fill="currentColor"/>
    <circle cx="16" cy="15" r="1" fill="currentColor"/>
  </svg>
);

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/profile', icon: ProfileGlyph, label: 'Profile' },
    { path: '/discover', icon: DiscoverGlyph, label: 'Discover' },
    { path: '/friends', icon: BondsGlyph, label: 'Bonds' },
    { path: '/bonds', icon: MessagesGlyph, label: 'Messages' },
    { path: '/events', icon: GatherGlyph, label: 'Gather' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const hiddenPaths = ['/auth', '/welcome', '/signup-method', '/settings', '/splash', '/profile-setup', '/passcode-setup', '/passcode-entry', '/onboarding'];
  
  if (hiddenPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 cave-nav">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ path, icon: IconGlyph, label }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              variant="ghost"
              className={`flex-col h-16 w-16 transition-all cave-icon ${
                isActive(path)
                  ? 'bg-orange-100 text-orange-700 transform scale-105'
                  : 'text-amber-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <IconGlyph className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium cave-text">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
