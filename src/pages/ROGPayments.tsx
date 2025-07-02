
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Coins, Clock, Shield, Zap } from 'lucide-react';

const ROGPayments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold cave-font text-white">ROG Token Payments</h1>
        </div>

        <Card className="cave-card">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="cave-font text-amber-900 text-3xl">
              ROG Token Payments
            </CardTitle>
            <p className="text-amber-700 text-lg">Coming Soon!</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-amber-600 mr-2" />
                <h3 className="font-semibold text-amber-800">Development in Progress</h3>
              </div>
              <p className="text-amber-700">
                We're working hard to bring you seamless ROG token payments. This revolutionary feature will allow you to:
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Instant Payments</h4>
                  <p className="text-amber-700 text-sm">Lightning-fast transactions with blockchain security</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Lower Fees</h4>
                  <p className="text-amber-700 text-sm">Only 1% transaction fee to support the Tribes ecosystem</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Community Rewards</h4>
                  <p className="text-amber-700 text-sm">Earn and spend tokens within the Tribes community</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">What are ROG Tokens?</h4>
              <p className="text-amber-700 text-sm">
                Roots of Gaia (ROG) tokens are the native currency of the Tribes ecosystem. They enable 
                decentralized payments, community governance, and exclusive access to premium features.
              </p>
            </div>

            <div className="text-center pt-4">
              <Button 
                onClick={() => navigate('/events')}
                className="cave-button"
              >
                Back to Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROGPayments;
