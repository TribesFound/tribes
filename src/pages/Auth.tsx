
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import VerificationStep from '@/components/VerificationStep';

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
    <VerificationStep onComplete={handleVerificationComplete} />
  );
};

export default Auth;
