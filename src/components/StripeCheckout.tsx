import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession, redirectToCheckout, STRIPE_PRICES } from '@/lib/stripe';

interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceId: string;
  icon: string;
  features: string[];
  color: string;
  popular?: boolean;
  savings?: string;
  category: 'personal' | 'professional';
}

const StripeCheckout: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'bloodline',
      name: 'Bloodline',
      duration: '1 Month',
      price: 3.33,
      priceId: STRIPE_PRICES.bloodline_monthly,
      icon: '🔥',
      features: [
        'Unlimited swipes',
        'See who liked you',
        'Advanced filters',
        'Priority support',
        'Read receipts',
        'Boost profile visibility'
      ],
      color: 'red',
      category: 'personal'
    },
    {
      id: 'oracle',
      name: 'Oracle',
      duration: '6 Months',
      price: 17.77,
      priceId: STRIPE_PRICES.oracle_6months,
      icon: '🔮',
      features: [
        'Everything in Bloodline',
        'Advanced compatibility matching',
        'Personality insights',
        'Premium badge',
        'Super likes',
        'Travel mode'
      ],
      color: 'purple',
      popular: true,
      savings: 'Save 17%',
      category: 'personal'
    },
    {
      id: 'inner-circle',
      name: 'Inner Circle',
      duration: '1 Year',
      price: 33.33,
      priceId: STRIPE_PRICES.inner_circle_yearly,
      icon: '👑',
      features: [
        'Everything in Oracle',
        'Exclusive events access',
        'VIP customer support',
        'Profile verification',
        'Advanced analytics',
        'Custom preferences'
      ],
      color: 'yellow',
      savings: 'Save 25%',
      category: 'personal'
    },
    {
      id: 'trade-guild',
      name: 'Trade Guild',
      duration: '1 Month',
      price: 9.99,
      priceId: STRIPE_PRICES.trade_guild_monthly,
      icon: '⚡',
      features: [
        'Business profile features',
        'Event creation tools',
        'Analytics dashboard',
        'Lead generation',
        'Priority listings',
        'Community networking'
      ],
      color: 'blue',
      category: 'professional'
    },
    {
      id: 'trade-council',
      name: 'Trade Council',
      duration: '1 Year',
      price: 99.99,
      priceId: STRIPE_PRICES.trade_council_yearly,
      icon: '🏛️',
      features: [
        'Everything in Trade Guild',
        'Advanced business tools',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'White-label solutions',
        'ROG token rewards'
      ],
      color: 'indigo',
      savings: 'Save 17%',
      category: 'professional'
    }
  ];

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive"
      });
      return;
    }

    setLoadingPlan(plan.id);

    try {
      // Create checkout session
      const sessionId = await createCheckoutSession(plan.priceId, user.id);
      
      // Redirect to Stripe Checkout
      await redirectToCheckout(sessionId);
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to start subscription process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'border-red-200 hover:border-red-300',
      purple: 'border-purple-200 hover:border-purple-300',
      yellow: 'border-yellow-200 hover:border-yellow-300',
      blue: 'border-blue-200 hover:border-blue-300',
      indigo: 'border-indigo-200 hover:border-indigo-300'
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  const personalPlans = subscriptionPlans.filter(plan => plan.category === 'personal');
  const professionalPlans = subscriptionPlans.filter(plan => plan.category === 'professional');

  return (
    <div className="space-y-8">
      {/* Personal Plans */}
      <div>
        <h2 className="text-xl font-bold cave-font text-amber-900 mb-4">Personal Plans</h2>
        <div className="space-y-4">
          {personalPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`cave-card border-2 ${getColorClasses(plan.color)} relative transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <CardTitle className="cave-font text-amber-900 flex items-center justify-center space-x-2">
                  <span>{plan.name}</span>
                  {user?.subscriptionTier === plan.name && <Crown className="w-4 h-4 text-yellow-500" />}
                </CardTitle>
                <div className="text-2xl font-bold cave-font text-amber-900">
                  ${plan.price}
                  <span className="text-sm font-normal">/{plan.duration}</span>
                </div>
                {plan.savings && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {plan.savings}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm cave-text">
                      <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSubscribe(plan)}
                  disabled={loadingPlan === plan.id || user?.subscriptionTier === plan.name}
                  className="w-full cave-button"
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : user?.subscriptionTier === plan.name ? (
                    'Current Plan'
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Plans */}
      <div>
        <h2 className="text-xl font-bold cave-font text-amber-900 mb-4">Professional Plans</h2>
        <div className="space-y-4">
          {professionalPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`cave-card border-2 ${getColorClasses(plan.color)} transition-all hover:shadow-lg`}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <CardTitle className="cave-font text-amber-900">
                  {plan.name}
                </CardTitle>
                <div className="text-2xl font-bold cave-font text-amber-900">
                  ${plan.price}
                  <span className="text-sm font-normal">/{plan.duration}</span>
                </div>
                {plan.savings && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {plan.savings}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm cave-text">
                      <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSubscribe(plan)}
                  disabled={loadingPlan === plan.id || user?.subscriptionTier === plan.name}
                  className="w-full cave-button"
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : user?.subscriptionTier === plan.name ? (
                    'Current Plan'
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;