import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';

const SubscriptionCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
      <Card className="cave-card max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <CardTitle className="cave-font text-amber-900 text-2xl">
            Subscription Cancelled
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <p className="text-amber-700">
            No worries! Your subscription wasn't processed. You can always upgrade later when you're ready.
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
            <h3 className="font-semibold text-amber-800 mb-2">What you can still do:</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Continue using Tribes with free features</li>
              <li>• Explore the community and events</li>
              <li>• Connect with like-minded people</li>
              <li>• Upgrade anytime from your profile</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/discover')}
              className="w-full cave-button"
            >
              Continue with Free Plan
            </Button>
            
            <Button 
              onClick={() => navigate('/subscription')}
              variant="outline"
              className="w-full cave-button-outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subscription Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionCancel;