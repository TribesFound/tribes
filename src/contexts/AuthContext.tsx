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

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Country code mappings for supported regions
    const countryPrefixes = {
      // Australia & New Zealand
      '61': 'AU',   // Australia
      '64': 'NZ',   // New Zealand
      
      // North America
      '1': 'US/CA', // USA/Canada
      
      // South America
      '54': 'AR',   // Argentina
      '55': 'BR',   // Brazil
      '56': 'CL',   // Chile
      '57': 'CO',   // Colombia
      '58': 'VE',   // Venezuela
      '51': 'PE',   // Peru
      '593': 'EC',  // Ecuador
      '598': 'UY',  // Uruguay
      '595': 'PY',  // Paraguay
      '591': 'BO',  // Bolivia
      '594': 'GF',  // French Guiana
      '597': 'SR',  // Suriname
      '592': 'GY',  // Guyana
      
      // European Union
      '33': 'FR',   // France
      '49': 'DE',   // Germany
      '39': 'IT',   // Italy
      '34': 'ES',   // Spain
      '31': 'NL',   // Netherlands
      '32': 'BE',   // Belgium
      '43': 'AT',   // Austria
      '41': 'CH',   // Switzerland
      '45': 'DK',   // Denmark
      '46': 'SE',   // Sweden
      '47': 'NO',   // Norway
      '358': 'FI',  // Finland
      '353': 'IE',  // Ireland
      '351': 'PT',  // Portugal
      '30': 'GR',   // Greece
      '48': 'PL',   // Poland
      '420': 'CZ',  // Czech Republic
      '421': 'SK',  // Slovakia
      '36': 'HU',   // Hungary
      '40': 'RO',   // Romania
      '359': 'BG',  // Bulgaria
      '385': 'HR',  // Croatia
      '386': 'SI',  // Slovenia
      '372': 'EE',  // Estonia
      '371': 'LV',  // Latvia
      '370': 'LT',  // Lithuania
      '356': 'MT',  // Malta
      '357': 'CY',  // Cyprus
      '352': 'LU',  // Luxembourg
      
      // Thailand
      '66': 'TH',   // Thailand
      
      // North Macedonia
      '389': 'MK',  // North Macedonia
      
      // Middle East (excluding Israel)
      '90': 'TR',   // Turkey
      '964': 'IQ',  // Iraq
      '962': 'JO',  // Jordan
      '961': 'LB',  // Lebanon
      '963': 'SY',  // Syria
      '966': 'SA',  // Saudi Arabia
      '965': 'KW',  // Kuwait
      '973': 'BH',  // Bahrain
      '974': 'QA',  // Qatar
      '971': 'AE',  // UAE
      '968': 'OM',  // Oman
      '967': 'YE',  // Yemen
      '98': 'IR',   // Iran
      '93': 'AF',   // Afghanistan
      '92': 'PK',   // Pakistan
    };
    
    // If already has + prefix, validate and return
    if (phone.startsWith('+')) {
      const withoutPlus = phone.substring(1);
      const cleanWithoutPlus = withoutPlus.replace(/\D/g, '');
      
      // Check if it matches any supported country code
      for (const [code] of Object.entries(countryPrefixes)) {
        if (cleanWithoutPlus.startsWith(code)) {
          return `+${cleanWithoutPlus}`;
        }
      }
      return `+${cleanWithoutPlus}`;
    }
    
    // Try to detect country code from the number
    for (const [code] of Object.entries(countryPrefixes)) {
      if (cleanPhone.startsWith(code)) {
        return `+${cleanPhone}`;
      }
    }
    
    // Default to US/Canada if no country code detected and number is 10 digits
    if (cleanPhone.length === 10) {
      return `+1${cleanPhone}`;
    }
    
    // Default to Australia if 9 digits (mobile without country code)
    if (cleanPhone.length === 9) {
      return `+61${cleanPhone}`;
    }
    
    // Return with + prefix for any other length
    return `+${cleanPhone}`;
  };

  const sendVerificationCode = async (contact: string, method: 'email' | 'phone') => {
    try {
      console.log(`🔄 Sending ${method} OTP to: ${contact}`);
      
      if (method === 'email') {
        // Force OTP for email - explicitly disable magic link
        const { error } = await supabase.auth.signInWithOtp({
          email: contact,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: undefined, // Explicitly disable magic link
          }
        });
        
        if (error) {
          console.error('❌ Email OTP error:', error);
          throw error;
        }
        
        setPendingVerification({ contact, method, code: 'pending' });
        console.log(`✅ Email OTP sent successfully to ${contact}`);
        
      } else {
        // Format phone number with international support
        const formattedPhone = formatPhoneNumber(contact);
        console.log(`📱 Formatted phone: ${contact} -> ${formattedPhone}`);
        
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
          options: {
            shouldCreateUser: true
          }
        });
        
        if (error) {
          console.error('❌ Phone OTP error:', error);
          throw error;
        }
        
        setPendingVerification({ contact: formattedPhone, method, code: 'pending' });
        console.log(`✅ SMS OTP sent successfully to ${formattedPhone}`);
      }
    } catch (error: any) {
      console.error('❌ Failed to send verification code:', error);
      throw new Error(`Failed to send ${method} verification code: ${error.message}`);
    }
  };

  const verifyCode = async (code: string) => {
    try {
      if (!pendingVerification) {
        throw new Error('No pending verification');
      }
      
      console.log(`🔍 Verifying ${pendingVerification.method} OTP: ${code}`);
      
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
      
      const { error, data } = await supabase.auth.verifyOtp(verifyParams);
      
      if (error) {
        console.error('❌ OTP verification error:', error);
        throw error;
      }
      
      if (data?.user) {
        console.log('✅ OTP verification successful');
        setPendingVerification(null);
        return true;
      }
      
      throw new Error('Verification failed - no user returned');
    } catch (error: any) {
      console.error('❌ Code verification failed:', error);
      throw new Error(`OTP verification failed: ${error.message}`);
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
