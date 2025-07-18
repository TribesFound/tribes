import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setIsProcessing(false);
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      // In a real app, you'd verify the payment with your backend
      // For now, we'll simulate the verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock subscription details - replace with actual Stripe session retrieval
      const mockSubscriptionDetails = {
        planName: 'Oracle',
        amount: 17.77,
        currency: 'USD',
        interval: '6 months',
        status: 'active'
      };

      setSubscriptionDetails(mockSubscriptionDetails);

      // Update user's subscription tier
      if (user) {
        await updateProfile({
          subscriptionTier: mockSubscriptionDetails.planName
        });
      }

      toast({
        title: "Subscription activated!",
        description: `Welcome to ${mockSubscriptionDetails.planName}! Your premium features are now active.`,
      });

    } catch (error) {
      console.error('Payment verification failed:', error);
      toast({
        title: "Verification failed",
        description: "We couldn't verify your payment. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
        <Card className="cave-card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-bold cave-font text-amber-900 mb-2">
              Processing your subscription...
            </h2>
            <p className="text-amber-700">
              Please wait while we activate your premium features.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!subscriptionDetails) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
        <Card className="cave-card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h2 className="text-xl font-bold cave-font text-amber-900 mb-2">
              Payment verification failed
            </h2>
            <p className="text-amber-700 mb-4">
              We couldn't verify your payment. Please try again or contact support.
            </p>
            <Button onClick={() => navigate('/subscription')} className="cave-button">
              Back to Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
      <Card className="cave-card max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="cave-font text-amber-900 text-2xl">
            Welcome to {subscriptionDetails.planName}!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-amber-800">Premium Activated</span>
            </div>
            <p className="text-sm text-amber-700">
              Your subscription is now active and all premium features are unlocked!
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-amber-700">Plan:</span>
              <span className="font-semibold text-amber-900">{subscriptionDetails.planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-700">Amount:</span>
              <span className="font-semibold text-amber-900">
                ${subscriptionDetails.amount} {subscriptionDetails.currency.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-700">Billing:</span>
              <span className="font-semibold text-amber-900">Every {subscriptionDetails.interval}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-700">Status:</span>
              <span className="font-semibold text-green-600 capitalize">{subscriptionDetails.status}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/discover')}
              className="w-full cave-button"
            >
              Start Exploring Premium Features
            </Button>
            
            <Button 
              onClick={() => navigate('/profile')}
              variant="outline"
              className="w-full cave-button-outline"
            >
              View My Profile
            </Button>
          </div>

          <p className="text-xs text-amber-600">
            You can manage your subscription anytime in your profile settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSuccess;