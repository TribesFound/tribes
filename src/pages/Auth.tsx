
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import VerificationStep from '@/components/VerificationStep';
import OTPTester from '@/components/OTPTester';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Auth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/onboarding');
    }
  }, [user, isLoading, navigate]);

  const handleVerificationComplete = (data: any) => {
    console.log('Verification completed:', data);
    navigate('/onboarding');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cave-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold cave-font mb-2">Join Tribes</h1>
          <p className="text-lg opacity-90">Authenticate with 6-digit OTP codes</p>
        </div>

        <Tabs defaultValue="auth" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="test">Test OTP System</TabsTrigger>
          </TabsList>

          <TabsContent value="auth">
            <VerificationStep onComplete={handleVerificationComplete} />
          </TabsContent>

          <TabsContent value="test">
            <OTPTester />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
