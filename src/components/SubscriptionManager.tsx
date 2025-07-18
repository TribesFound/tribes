import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, CreditCard, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStripe } from '@/hooks/useStripe';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionStatus {
  isActive: boolean;
  planName: string;
  amount: number;
  currency: string;
  interval: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
}

const SubscriptionManager: React.FC = () => {
  const { user } = useAuth();
  const { createPortalSession, isLoading } = useStripe();
  const { toast } = useToast();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      // In a real app, fetch from your backend API
      // For now, we'll use mock data based on user's subscription tier
      const mockStatus: SubscriptionStatus = {
        isActive: user?.subscriptionTier !== 'Free',
        planName: user?.subscriptionTier || 'Free',
        amount: user?.subscriptionTier === 'Oracle' ? 17.77 : 
               user?.subscriptionTier === 'Bloodline' ? 3.33 : 0,
        currency: 'USD',
        interval: user?.subscriptionTier === 'Oracle' ? '6 months' : 'month',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        status: user?.subscriptionTier !== 'Free' ? 'active' : 'canceled'
      };

      setSubscriptionStatus(mockStatus);
    } catch (error) {
      console.error('Failed to fetch subscription status:', error);
      toast({
        title: "Failed to load subscription",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleManageSubscription = () => {
    createPortalSession();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'past_due':
      case 'unpaid':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  if (loadingStatus) {
    return (
      <Card className="cave-card">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading subscription details...</p>
        </CardContent>
      </Card>
    );
  }

  if (!subscriptionStatus) {
    return (
      <Card className="cave-card">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold cave-font text-amber-900 mb-2">
            Unable to load subscription
          </h3>
          <p className="text-amber-700 mb-4">
            We couldn't load your subscription details. Please try again.
          </p>
          <Button onClick={fetchSubscriptionStatus} className="cave-button">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cave-card">
      <CardHeader>
        <CardTitle className="cave-font text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Current Subscription</span>
          </div>
          <Badge className={`${getStatusColor(subscriptionStatus.status)} flex items-center space-x-1`}>
            {getStatusIcon(subscriptionStatus.status)}
            <span className="capitalize">{subscriptionStatus.status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-amber-600">Plan</p>
            <p className="font-semibold text-amber-900">{subscriptionStatus.planName}</p>
          </div>
          <div>
            <p className="text-sm text-amber-600">Amount</p>
            <p className="font-semibold text-amber-900">
              {subscriptionStatus.amount > 0 
                ? `$${subscriptionStatus.amount} ${subscriptionStatus.currency.toUpperCase()}`
                : 'Free'
              }
            </p>
          </div>
        </div>

        {subscriptionStatus.isActive && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-600">Billing cycle</span>
              <span className="text-sm font-medium text-amber-900">
                Every {subscriptionStatus.interval}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-600">Next billing date</span>
              <span className="text-sm font-medium text-amber-900">
                {new Date(subscriptionStatus.currentPeriodEnd).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {subscriptionStatus.cancelAtPeriodEnd && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Subscription will cancel on {new Date(subscriptionStatus.currentPeriodEnd).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2 pt-4">
          {subscriptionStatus.isActive ? (
            <Button 
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="w-full cave-button-outline"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {isLoading ? 'Loading...' : 'Manage Subscription'}
            </Button>
          ) : (
            <Button 
              onClick={() => window.location.href = '/subscription'}
              className="w-full cave-button"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          )}
        </div>

        <p className="text-xs text-amber-600 text-center">
          Manage billing, update payment methods, or cancel your subscription anytime.
        </p>
      </CardContent>
    </Card>
  );
};

export default SubscriptionManager;