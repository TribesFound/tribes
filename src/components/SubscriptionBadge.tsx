
import React from 'react';
import { Badge } from '@/components/ui/badge';

// Cave painting style subscription tier glyphs
const BloodlineBadge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="8"/>
    <path d="M8 12h8M12 8v8"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const OracleBadge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6M12 17v6"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const InnerCircleBadge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 2v4M12 18v4M22 12h-4M6 12H2"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const TradeGuildBadge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 9h6v6H9z"/>
    <path d="M3 9h6M15 9h6M9 3v6M9 15v6"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const TradeCouncilBadge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polygon points="12,2 2,7 12,12 22,7"/>
    <polyline points="2,17 12,22 22,17"/>
    <polyline points="2,12 12,17 22,12"/>
    <circle cx="12" cy="7" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
);

export type SubscriptionTier = 'Bloodline' | 'Oracle' | 'Inner Circle' | 'Trade Guild' | 'Trade Council';

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ 
  tier, 
  size = 'md', 
  showLabel = true,
  className = '' 
}) => {
  const getBadgeComponent = () => {
    switch (tier) {
      case 'Bloodline':
        return BloodlineBadge;
      case 'Oracle':
        return OracleBadge;
      case 'Inner Circle':
        return InnerCircleBadge;
      case 'Trade Guild':
        return TradeGuildBadge;
      case 'Trade Council':
        return TradeCouncilBadge;
      default:
        return BloodlineBadge;
    }
  };

  const getBadgeColor = () => {
    switch (tier) {
      case 'Bloodline':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Oracle':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Inner Circle':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Trade Guild':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Trade Council':
        return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const BadgeIcon = getBadgeComponent();

  return (
    <Badge 
      className={`${getBadgeColor()} border-2 cave-font font-semibold ${className}`}
      variant="outline"
    >
      <BadgeIcon className={`${getIconSize()} mr-1`} />
      {showLabel && tier}
    </Badge>
  );
};

export default SubscriptionBadge;
