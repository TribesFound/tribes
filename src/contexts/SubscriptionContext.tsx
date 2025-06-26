
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionTier = 'Free' | 'Bloodline' | 'Oracle' | 'Inner Circle' | 'Trade Guild' | 'Trade Council';

export interface SubscriptionLimits {
  dailySwipes: number;
  dailyMessages: number;
  hasGatherAccess: boolean;
  canCreateProfessional: boolean;
  professionalDiscount: number;
}

export interface SubscriptionContextType {
  currentTier: SubscriptionTier;
  limits: SubscriptionLimits;
  dailyUsage: {
    swipes: number;
    messages: number;
  };
  canSwipe: boolean;
  canMessage: boolean;
  incrementUsage: (type: 'swipe' | 'message') => boolean;
  resetDailyLimits: () => void;
  upgradeTier: (tier: SubscriptionTier) => void;
}

const subscriptionLimits: Record<SubscriptionTier, SubscriptionLimits> = {
  'Free': {
    dailySwipes: 15,
    dailyMessages: 15,
    hasGatherAccess: false,
    canCreateProfessional: false,
    professionalDiscount: 0
  },
  'Bloodline': {
    dailySwipes: -1, // unlimited
    dailyMessages: -1, // unlimited
    hasGatherAccess: true,
    canCreateProfessional: true,
    professionalDiscount: 50
  },
  'Oracle': {
    dailySwipes: -1,
    dailyMessages: -1,
    hasGatherAccess: true,
    canCreateProfessional: true,
    professionalDiscount: 50
  },
  'Inner Circle': {
    dailySwipes: -1,
    dailyMessages: -1,
    hasGatherAccess: true,
    canCreateProfessional: true,
    professionalDiscount: 50
  },
  'Trade Guild': {
    dailySwipes: 0, // professionals don't swipe
    dailyMessages: -1,
    hasGatherAccess: true,
    canCreateProfessional: false,
    professionalDiscount: 0
  },
  'Trade Council': {
    dailySwipes: 0,
    dailyMessages: -1,
    hasGatherAccess: true,
    canCreateProfessional: false,
    professionalDiscount: 0
  }
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [dailyUsage, setDailyUsage] = useState({ swipes: 0, messages: 0 });
  const [lastResetDate, setLastResetDate] = useState<string>('');

  const currentTier = user?.subscriptionTier || 'Free';
  const limits = subscriptionLimits[currentTier];

  useEffect(() => {
    // Load daily usage from localStorage
    const savedUsage = localStorage.getItem('tribes_daily_usage');
    const savedResetDate = localStorage.getItem('tribes_last_reset_date');
    const today = new Date().toDateString();

    if (savedResetDate !== today) {
      // Reset daily limits if it's a new day
      resetDailyLimits();
    } else if (savedUsage) {
      setDailyUsage(JSON.parse(savedUsage));
    }

    setLastResetDate(savedResetDate || today);
  }, []);

  const canSwipe = limits.dailySwipes === -1 || dailyUsage.swipes < limits.dailySwipes;
  const canMessage = limits.dailyMessages === -1 || dailyUsage.messages < limits.dailyMessages;

  const incrementUsage = (type: 'swipe' | 'message'): boolean => {
    if (type === 'swipe' && !canSwipe) return false;
    if (type === 'message' && !canMessage) return false;

    const newUsage = {
      ...dailyUsage,
      [type === 'swipe' ? 'swipes' : 'messages']: dailyUsage[type === 'swipe' ? 'swipes' : 'messages'] + 1
    };

    setDailyUsage(newUsage);
    localStorage.setItem('tribes_daily_usage', JSON.stringify(newUsage));
    return true;
  };

  const resetDailyLimits = () => {
    const newUsage = { swipes: 0, messages: 0 };
    const today = new Date().toDateString();
    
    setDailyUsage(newUsage);
    setLastResetDate(today);
    localStorage.setItem('tribes_daily_usage', JSON.stringify(newUsage));
    localStorage.setItem('tribes_last_reset_date', today);
  };

  const upgradeTier = (tier: SubscriptionTier) => {
    // This would integrate with payment processing
    console.log(`Upgrading to ${tier}`);
    // Update user's subscription tier through auth context
  };

  const value = {
    currentTier,
    limits,
    dailyUsage,
    canSwipe,
    canMessage,
    incrementUsage,
    resetDailyLimits,
    upgradeTier
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
