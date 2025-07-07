import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface User {
  id: string;
  email?: string;
  name?: string;
  profilePhoto?: string;
  dateOfBirth?: string;
  location?: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  subscriptionTier: string;
  accountType: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  session: Session | null;
  signUp: (data: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  sendVerificationCode: (contact: string, method: 'email' | 'phone') => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  pendingVerification: {contact: string, method: 'email' | 'phone', code: string} | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [pendingVerification, setPendingVerification] = useState<{contact: string, method: 'email' | 'phone', code: string} | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setSession(session);
      
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        setIsLoading(false);
        return;
      }

      let parsedLocation = undefined;
      if (profile?.location && typeof profile.location === 'object') {
        try {
          parsedLocation = profile.location as {
            lat: number;
            lng: number;
            city: string;
            country: string;
          };
        } catch (e) {
          console.warn('Failed to parse location data:', e);
        }
      }

      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: profile?.name || supabaseUser.user_metadata?.name || 'User',
        profilePhoto: profile?.profile_photo,
        dateOfBirth: profile?.date_of_birth,
        location: parsedLocation,
        subscriptionTier: profile?.subscription_tier || 'Free',
        accountType: profile?.account_type || 'individual',
        isVerified: profile?.is_verified || false
      };

      setUser(userData);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: any) => {
    setIsLoading(true);
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || crypto.randomUUID().slice(0, 12),
        options: {
          data: {
            name: data.name,
            date_of_birth: data.dateOfBirth,
            location: data.location,
            account_type: data.accountType || 'individual'
          }
        }
      });

      if (authError) throw authError;
      
      console.log('User signed up successfully');
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async (contact: string, method: 'email' | 'phone') => {
    try {
      if (method === 'email') {
        // Use signInWithOtp for email OTP (not magic link)
        const { error } = await supabase.auth.signInWithOtp({
          email: contact,
          options: {
            shouldCreateUser: true,
            data: {
              // Add any additional user metadata here if needed
            }
          }
        });
        
        if (error) throw error;
        
        setPendingVerification({ contact, method, code: 'pending' });
        console.log(`OTP code sent to ${contact} via email`);
      } else {
        // Format phone number for international format
        const formattedPhone = contact.startsWith('+') ? contact : `+1${contact.replace(/\D/g, '')}`;
        
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
          options: {
            shouldCreateUser: true
          }
        });
        
        if (error) throw error;
        
        setPendingVerification({ contact: formattedPhone, method, code: 'pending' });
        console.log(`OTP code sent to ${formattedPhone} via SMS`);
      }
    } catch (error: any) {
      console.error('Failed to send verification code:', error);
      throw new Error(`Failed to send verification code: ${error.message}`);
    }
  };

  const verifyCode = async (code: string) => {
    try {
      if (!pendingVerification) {
        throw new Error('No pending verification');
      }
      
      let verifyParams: any;
      
      if (pendingVerification.method === 'email') {
        verifyParams = {
          email: pendingVerification.contact,
          token: code,
          type: 'email' as const
        };
      } else {
        verifyParams = {
          phone: pendingVerification.contact,
          token: code,
          type: 'sms' as const
        };
      }
      
      const { error } = await supabase.auth.verifyOtp(verifyParams);
      
      if (error) throw error;
      
      setPendingVerification(null);
      return true;
    } catch (error: any) {
      console.error('Code verification failed:', error);
      throw new Error(`Verification failed: ${error.message}`);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setPendingVerification(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    session,
    signUp,
    signIn,
    signOut,
    updateProfile,
    sendVerificationCode,
    verifyCode,
    pendingVerification
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
