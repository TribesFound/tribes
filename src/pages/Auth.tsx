
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
    <div className="min-h-screen cave-gradient flex items-center justify-center">
      <div className="text-center text-amber-900">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-20 h-20"
          />
        </div>
        <h1 className="text-4xl font-bold cave-font mb-4">Welcome to Your Tribe!</h1>
        <p className="text-lg cave-text">Setting up your experience...</p>
      </div>
    </div>
  );
};

export default Auth;
