import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

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
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  sendVerificationCode: (contact: string, method: 'email' | 'phone') => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [pendingVerification, setPendingVerification] = useState<{contact: string, method: 'email' | 'phone', code: string} | null>(null);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          // Defer profile fetch to avoid auth callback issues
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (error) {
                console.error('Error fetching profile:', error);
                // Create a basic user object from auth data
                setUser({
                  id: session.user.id,
                  email: session.user.email,
                  phone: session.user.phone,
                  name: session.user.user_metadata?.name || 'User',
                  dateOfBirth: '',
                  profilePhoto: '',
                  location: { lat: 0, lng: 0, city: '', country: '' },
                  subscriptionTier: 'Free',
                  accountType: 'individual',
                  isVerified: false,
                  createdAt: session.user.created_at
                });
              } else if (profile) {
                // Safely parse location with fallback
                let location = { lat: 0, lng: 0, city: '', country: '' };
                if (profile.location && typeof profile.location === 'object' && profile.location !== null) {
                  const loc = profile.location as any;
                  if (loc.lat && loc.lng && loc.city && loc.country) {
                    location = {
                      lat: Number(loc.lat),
                      lng: Number(loc.lng),
                      city: String(loc.city),
                      country: String(loc.country)
                    };
                  }
                }

                // Safely parse subscription tier with fallback
                const validTiers: User['subscriptionTier'][] = ['Free', 'Bloodline', 'Oracle', 'Inner Circle', 'Trade Guild', 'Trade Council'];
                const subscriptionTier = validTiers.includes(profile.subscription_tier as any) 
                  ? profile.subscription_tier as User['subscriptionTier']
                  : 'Free';

                // Safely parse account type with fallback
                const validAccountTypes: User['accountType'][] = ['individual', 'professional'];
                const accountType = validAccountTypes.includes(profile.account_type as any)
                  ? profile.account_type as User['accountType']
                  : 'individual';

                setUser({
                  id: profile.id,
                  email: session.user.email,
                  phone: session.user.phone,
                  name: profile.name || 'User',
                  dateOfBirth: profile.date_of_birth || '',
                  profilePhoto: profile.profile_photo || '',
                  location,
                  subscriptionTier,
                  accountType,
                  isVerified: Boolean(profile.is_verified),
                  createdAt: profile.created_at
                });
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
            }
          }, 0);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
        const { error } = await supabase.auth.signInWithOtp({
          email: contact,
          options: {
            shouldCreateUser: true
          }
        });
        
        if (error) throw error;
        
        setPendingVerification({ contact, method, code: 'pending' });
        console.log(`Verification code sent to ${contact} via email`);
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
        console.log(`Verification code sent to ${formattedPhone} via SMS`);
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
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setPendingVerification(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (user && session) {
        const { error } = await supabase
          .from('profiles')
          .update({
            name: data.name,
            profile_photo: data.profilePhoto,
            location: data.location,
            subscription_tier: data.subscriptionTier,
            account_type: data.accountType,
            is_verified: data.isVerified
          })
          .eq('id', user.id);

        if (error) throw error;
        
        setUser({ ...user, ...data });
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
