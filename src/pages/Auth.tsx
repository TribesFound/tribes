
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationStep from '@/components/VerificationStep';
import ProfileSetup from '@/components/ProfileSetup';
import AccountTypeSelection from '@/components/AccountTypeSelection';
import ProfessionalSetup from '@/components/ProfessionalSetup';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseOperations } from '@/hooks/useSupabaseOperations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const { updateUserProfile, updateUserPreferences } = useSupabaseOperations();
  const [currentStep, setCurrentStep] = useState<'auth-method' | 'verification' | 'account-type' | 'profile' | 'professional' | 'complete'>('auth-method');
  const [verificationData, setVerificationData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [accountType, setAccountType] = useState<'personal' | 'professional' | null>(null);
  const [error, setError] = useState('');

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
    } catch (error: any) {
      console.error('Failed to create user account:', error);
      setError(error.message || 'Failed to create user account');
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
      
      // Navigate to passcode setup
      navigate('/passcode-setup');
    } catch (error: any) {
      console.error('Failed to complete profile setup:', error);
      setError(error.message || 'Failed to complete profile setup');
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
        subscriptionTier: 'Free',
        accountType: 'professional',
        isVerified: true
      });

      setProfileData(data);
      // For professional accounts, redirect to passcode setup first
      navigate('/passcode-setup');
    } catch (error: any) {
      console.error('Failed to complete professional setup:', error);
      setError(error.message || 'Failed to complete professional setup');
    }
  };

  const handleGoogleSuccess = () => {
    // Google auth will redirect automatically, but we can navigate to passcode setup
    navigate('/passcode-setup');
  };

  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // If user is already authenticated, redirect to appropriate page
  React.useEffect(() => {
    if (user && user.isVerified) {
      navigate('/passcode-setup');
    }
  }, [user, navigate]);

  if (currentStep === 'auth-method') {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center text-amber-900 mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
                alt="Tribes Hand Logo" 
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-4xl font-bold cave-font mb-2">Welcome to Tribes</h1>
            <p className="text-lg opacity-90 cave-text">Choose how you'd like to join</p>
          </div>

          <Card className="cave-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl cave-font text-amber-900">
                Get Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <GoogleSignInButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

              <div className="relative">
                <Separator className="my-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-sm text-amber-700">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep('verification')}
                className="w-full cave-button"
              >
                Phone or Email Verification
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-amber-700 mb-2">
                  Already have an account?
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
