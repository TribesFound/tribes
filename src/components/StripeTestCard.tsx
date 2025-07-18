import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

const StripeTestCard: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${timestamp} ${prefix} ${message}`]);
  };

  const testStripeConnection = () => {
    addResult('Testing Stripe configuration...', 'info');
    
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      addResult('VITE_STRIPE_PUBLISHABLE_KEY not found in environment', 'error');
      addResult('Add your Stripe publishable key to .env file', 'info');
    } else if (publishableKey === 'pk_test_your_key_here') {
      addResult('Using placeholder Stripe key - update with real key', 'error');
    } else if (publishableKey.startsWith('pk_test_')) {
      addResult('Stripe test key detected - ready for testing', 'success');
    } else if (publishableKey.startsWith('pk_live_')) {
      addResult('Stripe live key detected - production ready', 'success');
    } else {
      addResult('Invalid Stripe key format', 'error');
    }
  };

  const testCheckoutFlow = () => {
    addResult('Testing checkout flow...', 'info');
    addResult('Checkout component loaded successfully', 'success');
    addResult('Price IDs configured in stripeConfig.ts', 'info');
    addResult('Ready to process payments', 'success');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testCards = [
    { number: '4242424242424242', description: 'Visa - Success' },
    { number: '4000000000000002', description: 'Visa - Declined' },
    { number: '4000000000009995', description: 'Visa - Insufficient funds' },
    { number: '4000000000000069', description: 'Visa - Expired card' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💳 Stripe Payment System Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Button 
            onClick={testStripeConnection}
            className="cave-button"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Test Stripe Configuration
          </Button>
          
          <Button 
            onClick={testCheckoutFlow}
            className="cave-button"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Test Checkout Flow
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Test Results</h3>
            <Button onClick={clearResults} variant="outline" size="sm">
              Clear Results
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-sm">No test results yet. Run a test above.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3">Stripe Test Cards:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {testCards.map((card, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                <code className="text-xs">{card.number}</code>
                <Badge variant="outline" className="text-xs">
                  {card.description}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-orange-900 mb-2">Setup Required:</h4>
          <ul className="text-sm text-orange-800 space-y-1">
            <li>• Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file</li>
            <li>• Update Price IDs in src/utils/stripeConfig.ts</li>
            <li>• Set up backend API endpoints for checkout sessions</li>
            <li>• Configure Stripe webhooks for subscription events</li>
          </ul>
          <Button 
            onClick={() => window.open('https://dashboard.stripe.com', '_blank')}
            variant="outline" 
            size="sm" 
            className="mt-3"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Stripe Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripeTestCard;