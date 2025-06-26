
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Chrome, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      onSuccess?.();
      navigate('/onboarding');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed';
      console.error('Google sign-in error:', errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={`w-full cave-button bg-white text-amber-900 border-2 border-orange-300 hover:bg-orange-50 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
      ) : (
        <Chrome className="w-5 h-5 mr-3" />
      )}
      {isLoading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleSignInButton;
