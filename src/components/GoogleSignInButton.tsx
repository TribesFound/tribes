
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
      // Google auth is disabled - show error message
      throw new Error('Google authentication is currently disabled. Please use email or phone verification.');
    } catch (error: any) {
      console.error('Google sign in disabled:', error);
      onError?.(error.message || 'Google sign in is not available');
    } finally {
      setIsLoading(false);
    }
  };

  // Return null to hide the component completely
  return null;
};

export default GoogleSignInButton;
