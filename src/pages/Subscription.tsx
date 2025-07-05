
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, ArrowLeft } from 'lucide-react';

const Subscription = () => {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState('Free');

  const personalPlans = [
    {
      id: 'bloodline',
      name: 'Bloodline',
      duration: '1 Month',
      price: 3.33,
      icon: '🔥',
      stripeUrl: 'https://buy.stripe.com/dRm28r0DodH17nJgSu3oA01',
      features: [
        'Unlimited swipes',
        'See who liked you',
        'Advanced filters',
        'Priority support',
        'Read receipts',
        'Boost profile visibility'
      ],
      color: 'red',
      popular: false
    },
    {
      id: 'oracle',
      name: 'Oracle',
      duration: '6 Months',
      price: 17.77,
      icon: '🔮',
      stripeUrl: 'https://buy.stripe.com/7sY9AT71M8mH6jFfOq3oA02',
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
      savings: 'Save 17%'
    },
    {
      id: 'inner-circle',
      name: 'Inner Circle',
      duration: '1 Year',
      price: 33.33,
      icon: '👑',
      stripeUrl: 'https://buy.stripe.com/5kQ28r2Lw7iDdM76dQ3oA03',
      features: [
        'Everything in Oracle',
        'Exclusive events access',
        'VIP customer support',
        'Profile verification',
        'Advanced analytics',
        'Custom preferences'
      ],
      color: 'yellow',
      popular: false,
      savings: 'Save 25%'
    }
  ];

  const professionalPlans = [
    {
      id: 'trade-guild',
      name: 'Trade Guild',
      duration: '1 Month',
      price: 9.99,
      icon: '⚡',
      stripeUrl: 'https://buy.stripe.com/dRm9ATcm6auPazV0Tw3oA04',
      features: [
        'Business profile features',
        'Event creation tools',
        'Analytics dashboard',
        'Lead generation',
        'Priority listings',
        'Community networking'
      ],
      color: 'blue'
    },
    {
      id: 'trade-council',
      name: 'Trade Council',
      duration: '1 Year',
      price: 99.99,
      icon: '🏛️',
      stripeUrl: 'https://buy.stripe.com/7sY7sLgCm1Yj7nJeKm3oA05',
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
      savings: 'Save 17%'
    }
  ];

  const handleSubscribe = (stripeUrl: string) => {
    // Open Stripe checkout in a new tab
    window.open(stripeUrl, '_blank');
  };

  const getColorClasses = (color: string, isSelected: boolean = false) => {
    const colors = {
      gray: isSelected ? 'border-gray-400 bg-gray-50' : 'border-gray-200',
      red: isSelected ? 'border-red-400 bg-red-50' : 'border-red-200',
      purple: isSelected ? 'border-purple-400 bg-purple-50' : 'border-purple-200',
      yellow: isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-yellow-200',
      blue: isSelected ? 'border-blue-400 bg-blue-50' : 'border-blue-200',
      indigo: isSelected ? 'border-indigo-400 bg-indigo-50' : 'border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')}
            className="text-white hover:bg-orange-100/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold tribal-font text-white">Subscription Plans</h1>
          <div className="w-8"></div>
        </div>

        {/* Personal Plans */}
        <div>
          <h2 className="text-xl font-bold tribal-font text-white mb-4">Personal Plans</h2>
          <div className="space-y-4">
            {personalPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`tribal-card border-2 ${getColorClasses(plan.color, currentPlan === plan.name)} relative`}
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
                  <CardTitle className="tribal-font text-amber-900 flex items-center justify-center space-x-2">
                    <span>{plan.name}</span>
                    {currentPlan === plan.name && <Crown className="w-4 h-4 text-yellow-500" />}
                  </CardTitle>
                  <div className="text-2xl font-bold tribal-font text-amber-900">
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
                      <li key={index} className="flex items-center text-sm tribal-text">
                        <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleSubscribe(plan.stripeUrl)}
                    className="w-full tribal-button"
                  >
                    Subscribe to {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Plans */}
        <div>
          <h2 className="text-xl font-bold tribal-font text-white mb-4">Professional Plans</h2>
          <div className="space-y-4">
            {professionalPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`tribal-card border-2 ${getColorClasses(plan.color)}`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <CardTitle className="tribal-font text-amber-900">
                    {plan.name}
                  </CardTitle>
                  <div className="text-2xl font-bold tribal-font text-amber-900">
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
                      <li key={index} className="flex items-center text-sm tribal-text">
                        <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleSubscribe(plan.stripeUrl)}
                    className="w-full tribal-button"
                  >
                    Subscribe to {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Management */}
        <Card className="tribal-card">
          <CardContent className="p-4 text-center">
            <p className="text-sm tribal-text mb-4">
              Need to manage your subscription? Access billing, cancel, or upgrade anytime.
            </p>
            <Button variant="outline" className="tribal-button-outline">
              Manage Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
