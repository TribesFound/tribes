
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StripeCheckout from '@/components/StripeCheckout';

const Subscription = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')}
            className="text-white hover:bg-orange-100/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold cave-font text-white">Subscription Plans</h1>
          <div className="w-8"></div>
        </div>

        <StripeCheckout />
      </div>
    </div>
  );
};

export default Subscription;
