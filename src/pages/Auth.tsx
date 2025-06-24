
import React, { useState } from 'react';
import VerificationStep from '@/components/VerificationStep';
import ProfileSetup from '@/components/ProfileSetup';

const Auth = () => {
  const [currentStep, setCurrentStep] = useState<'verification' | 'profile' | 'complete'>('verification');
  const [verificationData, setVerificationData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const handleVerificationComplete = (data: any) => {
    setVerificationData(data);
    setCurrentStep('profile');
  };

  const handleProfileComplete = (data: any) => {
    setProfileData(data);
    setCurrentStep('complete');
    console.log('User registration complete:', { verification: verificationData, profile: data });
    // Navigate to main app
    window.location.href = '/discover';
  };

  if (currentStep === 'verification') {
    return <VerificationStep onComplete={handleVerificationComplete} />;
  }

  if (currentStep === 'profile') {
    return <ProfileSetup onComplete={handleProfileComplete} userVerificationData={verificationData} />;
  }

  return (
    <div className="min-h-screen tribal-gradient flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold tribal-font mb-4">Welcome to Your Tribe!</h1>
        <p className="text-lg">Setting up your experience...</p>
      </div>
    </div>
  );
};

export default Auth;
