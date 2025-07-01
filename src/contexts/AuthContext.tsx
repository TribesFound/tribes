
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  dateOfBirth: string;
  profilePhoto: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  subscriptionTier: 'Free' | 'Bloodline' | 'Oracle' | 'Inner Circle' | 'Trade Guild' | 'Trade Council';
  accountType: 'individual' | 'professional';
  isVerified: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (data: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  sendVerificationCode: (contact: string, method: 'email' | 'phone') => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState<{contact: string, method: 'email' | 'phone', code: string} | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuthState = async () => {
      try {
        const storedUser = localStorage.getItem('tribes_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth state check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const signUp = async (data: any) => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: crypto.randomUUID(),
        ...data,
        subscriptionTier: 'Free' as const,
        accountType: 'individual' as const,
        isVerified: true,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('tribes_user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Signing in with:', email, password);
      
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        name: 'Demo User',
        dateOfBirth: '1990-01-01',
        profilePhoto: '',
        location: {
          lat: 37.7749,
          lng: -122.4194,
          city: 'San Francisco',
          country: 'United States'
        },
        subscriptionTier: 'Free',
        accountType: 'individual',
        isVerified: true,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('tribes_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth redirect
      console.log('Redirecting to Google OAuth...');
      
      // In a real implementation, this would redirect to Google's OAuth URL
      const googleAuthUrl = `https://accounts.google.com/oauth/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}/auth/google/callback&response_type=code&scope=email%20profile`;
      
      // For demo purposes, simulate successful Google sign-in after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockGoogleUser: User = {
        id: crypto.randomUUID(),
        email: 'user@gmail.com',
        name: 'Google User',
        dateOfBirth: '1990-01-01',
        profilePhoto: '',
        location: {
          lat: 37.7749,
          lng: -122.4194,
          city: 'San Francisco',
          country: 'United States'
        },
        subscriptionTier: 'Free',
        accountType: 'individual',
        isVerified: true,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('tribes_user', JSON.stringify(mockGoogleUser));
      setUser(mockGoogleUser);
      
      // In production, you would actually redirect:
      // window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async (contact: string, method: 'email' | 'phone') => {
    try {
      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the verification code for validation
      setPendingVerification({ contact, method, code: verificationCode });
      
      // Simulate sending the code
      console.log(`Sending verification code ${verificationCode} to ${contact} via ${method}`);
      
      if (method === 'email') {
        console.log(`📧 Email sent to ${contact}: Your Tribes verification code is ${verificationCode}`);
        // In production, integrate with email service like SendGrid, Mailgun, etc.
      } else {
        console.log(`📱 SMS sent to ${contact}: Your Tribes verification code is ${verificationCode}`);
        // In production, integrate with SMS service like Twilio, AWS SNS, etc.
      }
      
      // For demo purposes, show the code in console
      alert(`Demo: Verification code sent! Check console for code: ${verificationCode}`);
      
    } catch (error) {
      console.error('Failed to send verification code:', error);
      throw error;
    }
  };

  const verifyCode = async (code: string) => {
    try {
      if (!pendingVerification) {
        throw new Error('No pending verification');
      }
      
      const isValid = code === pendingVerification.code;
      
      if (isValid) {
        console.log('✅ Verification successful');
        setPendingVerification(null);
      } else {
        console.log('❌ Invalid verification code');
      }
      
      return isValid;
    } catch (error) {
      console.error('Code verification failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('tribes_user');
      setUser(null);
      setPendingVerification(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...data };
        localStorage.setItem('tribes_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    sendVerificationCode,
    verifyCode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
