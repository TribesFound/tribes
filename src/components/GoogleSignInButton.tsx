
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
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // This component is deprecated - Google auth has been removed
      onError?.('Google authentication is currently disabled');
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
      disabled={true}
      className={`w-full cave-button bg-gray-300 text-gray-500 cursor-not-allowed ${className}`}
    >
      <Chrome className="w-5 h-5 mr-3" />
      Google Sign-in Disabled
    </Button>
  );
};

export default GoogleSignInButton;
