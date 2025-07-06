
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationStep from '@/components/VerificationStep';
import ProfileSetup from '@/components/ProfileSetup';
import AccountTypeSelection from '@/components/AccountTypeSelection';
import ProfessionalSetup from '@/components/ProfessionalSetup';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseOperations } from '@/hooks/useSupabaseOperations';

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const { updateUserProfile, updateUserPreferences } = useSupabaseOperations();
  const [currentStep, setCurrentStep] = useState<'verification' | 'account-type' | 'profile' | 'professional' | 'complete'>('verification');
  const [verificationData, setVerificationData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [accountType, setAccountType] = useState<'personal' | 'professional' | null>(null);

  const handleVerificationComplete = async (data: any) => {
    console.log('Verification completed with data:', data);
    
    try {
      // Create user account with Supabase
      await signUp({
        email: data.email,
        phone: data.phone,
        name: 'New User', // This will be updated in profile setup
        dateOfBirth: data.dateOfBirth,
        location: data.location,
        accountType: 'individual' // Default, will be updated if needed
      });
      
      setVerificationData(data);
      setCurrentStep('account-type');
    } catch (error) {
      console.error('Failed to create user account:', error);
      // Handle error appropriately
    }
  };

  const handleAccountTypeSelection = (type: 'personal' | 'professional') => {
    setAccountType(type);
    if (type === 'personal') {
      setCurrentStep('profile');
    } else {
      setCurrentStep('professional');
    }
  };

  const handleProfileComplete = async (data: any) => {
    try {
      // Update user profile in Supabase
      await updateUserProfile({
        name: data.name,
        profilePhoto: data.profilePhoto,
        dateOfBirth: verificationData?.dateOfBirth,
        location: verificationData?.location,
        subscriptionTier: 'Free',
        accountType: accountType === 'professional' ? 'professional' : 'individual',
        isVerified: true
      });

      // Update user preferences if provided
      if (data.interests || data.hobbies) {
        await updateUserPreferences({
          interests: data.interests,
          hobbies: data.hobbies,
          ageRange: data.ageRange,
          locationRadius: data.locationRadius || 50,
          relationshipGoals: data.relationshipGoals
        });
      }

      setProfileData(data);
      console.log('User registration complete:', { 
        verification: verificationData, 
        profile: data, 
        accountType 
      });
      
      // Navigate to main app
      navigate('/discover');
    } catch (error) {
      console.error('Failed to complete profile setup:', error);
      // Handle error appropriately
    }
  };

  const handleProfessionalComplete = async (data: any) => {
    try {
      // Update user profile for professional account
      await updateUserProfile({
        name: data.businessName || data.name,
        profilePhoto: data.profilePhoto,
        dateOfBirth: verificationData?.dateOfBirth,
        location: data.businessLocation || verificationData?.location,
        subscriptionTier: 'Free', // Professionals might want to upgrade
        accountType: 'professional',
        isVerified: true
      });

      setProfileData(data);
      // For professional accounts, redirect to subscription page
      navigate('/subscription');
    } catch (error) {
      console.error('Failed to complete professional setup:', error);
      // Handle error appropriately
    }
  };

  // If user is already authenticated, redirect to appropriate page
  React.useEffect(() => {
    if (user && user.isVerified) {
      navigate('/discover');
    }
  }, [user, navigate]);

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
