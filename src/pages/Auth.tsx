
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationStep from '@/components/VerificationStep';
import ProfileSetup from '@/components/ProfileSetup';
import AccountTypeSelection from '@/components/AccountTypeSelection';
import ProfessionalSetup from '@/components/ProfessionalSetup';

const Auth = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'verification' | 'account-type' | 'profile' | 'professional' | 'complete'>('verification');
  const [verificationData, setVerificationData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [accountType, setAccountType] = useState<'personal' | 'professional' | null>(null);

  const handleVerificationComplete = (data: any) => {
    setVerificationData(data);
    setCurrentStep('account-type');
  };

  const handleAccountTypeSelection = (type: 'personal' | 'professional') => {
    setAccountType(type);
    if (type === 'personal') {
      setCurrentStep('profile');
    } else {
      setCurrentStep('professional');
    }
  };

  const handleProfileComplete = (data: any) => {
    setProfileData(data);
    setCurrentStep('complete');
    console.log('User registration complete:', { verification: verificationData, profile: data, accountType });
    // Navigate to main app
    window.location.href = '/discover';
  };

  const handleProfessionalComplete = (data: any) => {
    setProfileData(data);
    // For professional accounts, redirect to subscription page
    navigate('/subscription');
  };

  if (currentStep === 'verification') {
    return <VerificationStep onComplete={handleVerificationComplete} />;
  }

  if (currentStep === 'account-type') {
    return (
      <AccountTypeSelection
        onSelectPersonal={() => handleAccountTypeSelection('personal')}
        onSelectProfessional={() => handleAccountTypeSelection('professional')}
      />
    );
  }

  if (currentStep === 'profile') {
    return <ProfileSetup onComplete={handleProfileComplete} userVerificationData={verificationData} />;
  }

  if (currentStep === 'professional') {
    return (
      <ProfessionalSetup
        onComplete={handleProfessionalComplete}
        onBack={() => setCurrentStep('account-type')}
      />
    );
  }

  return (
    <div className="min-h-screen cave-gradient flex items-center justify-center">
      <div className="text-center text-amber-900">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
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
