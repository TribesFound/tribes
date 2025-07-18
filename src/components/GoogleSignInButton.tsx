
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Google auth is disabled - redirect to OTP authentication
      throw new Error('Please use email or phone OTP verification instead.');
    } catch (error: any) {
      console.error('Google sign in not available:', error);
      onError?.(error.message || 'Use OTP authentication instead');
    } finally {
      setIsLoading(false);
    }
  };

  // Component is hidden - OTP authentication is preferred
  return null;
};

export default GoogleSignInButton;
