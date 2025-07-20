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
    // Remove all non-digit characters first
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Remove leading '0' if present and phone doesn't start with '+' (national prefix removal)
    let processedPhone = cleanPhone;
    if (!phone.startsWith('+') && cleanPhone.startsWith('0') && !cleanPhone.startsWith('00')) {
      processedPhone = cleanPhone.substring(1);
    }
    
    // If already formatted with +, clean and validate
    if (phone.startsWith('+')) {
      const withoutPlus = phone.substring(1).replace(/\D/g, '');
      return `+${withoutPlus}`;
    }
    
    // Ensure minimum length for valid phone numbers
    if (processedPhone.length < 7) {
      throw new Error('Phone number too short');
    }
    
    // Ensure maximum length for valid phone numbers (E.164 allows max 15 digits)
    if (processedPhone.length > 15) {
      throw new Error('Phone number too long');
    }
    
    // Country code detection and formatting
    // Check for 3-digit country codes first (longest match)
    if (processedPhone.startsWith('593')) return `+${processedPhone}`; // Ecuador
    if (processedPhone.startsWith('598')) return `+${processedPhone}`; // Uruguay
    if (processedPhone.startsWith('595')) return `+${processedPhone}`; // Paraguay
    if (processedPhone.startsWith('591')) return `+${processedPhone}`; // Bolivia
    if (processedPhone.startsWith('594')) return `+${processedPhone}`; // French Guiana
    if (processedPhone.startsWith('597')) return `+${processedPhone}`; // Suriname
    if (processedPhone.startsWith('592')) return `+${processedPhone}`; // Guyana
    if (processedPhone.startsWith('358')) return `+${processedPhone}`; // Finland
    if (processedPhone.startsWith('353')) return `+${processedPhone}`; // Ireland
    if (processedPhone.startsWith('351')) return `+${processedPhone}`; // Portugal
    if (processedPhone.startsWith('420')) return `+${processedPhone}`; // Czech Republic
    if (processedPhone.startsWith('421')) return `+${processedPhone}`; // Slovakia
    if (processedPhone.startsWith('359')) return `+${processedPhone}`; // Bulgaria
    if (processedPhone.startsWith('385')) return `+${processedPhone}`; // Croatia
    if (processedPhone.startsWith('386')) return `+${processedPhone}`; // Slovenia
    if (processedPhone.startsWith('372')) return `+${processedPhone}`; // Estonia
    if (processedPhone.startsWith('371') && processedPhone.length >= 11) return `+${processedPhone}`; // Latvia
    if (processedPhone.startsWith('370')) return `+${processedPhone}`; // Lithuania
    if (processedPhone.startsWith('356')) return `+${processedPhone}`; // Malta
    if (processedPhone.startsWith('357')) return `+${processedPhone}`; // Cyprus
    if (processedPhone.startsWith('352')) return `+${processedPhone}`; // Luxembourg
    if (processedPhone.startsWith('389')) return `+${processedPhone}`; // North Macedonia
    if (processedPhone.startsWith('964')) return `+${processedPhone}`; // Iraq
    if (processedPhone.startsWith('962')) return `+${processedPhone}`; // Jordan
    if (processedPhone.startsWith('961')) return `+${processedPhone}`; // Lebanon
    if (processedPhone.startsWith('963')) return `+${processedPhone}`; // Syria
    if (processedPhone.startsWith('966')) return `+${processedPhone}`; // Saudi Arabia
    if (processedPhone.startsWith('965')) return `+${processedPhone}`; // Kuwait
    if (processedPhone.startsWith('973')) return `+${processedPhone}`; // Bahrain
    if (processedPhone.startsWith('974')) return `+${processedPhone}`; // Qatar
    if (processedPhone.startsWith('971')) return `+${processedPhone}`; // UAE
    if (processedPhone.startsWith('968')) return `+${processedPhone}`; // Oman
    if (processedPhone.startsWith('967')) return `+${processedPhone}`; // Yemen
    
    // Check for 2-digit country codes
    if (processedPhone.startsWith('61') && processedPhone.length >= 10) return `+${processedPhone}`; // Australia
    if (processedPhone.startsWith('64') && processedPhone.length >= 9) return `+${processedPhone}`; // New Zealand
    if (processedPhone.startsWith('66') && processedPhone.length >= 9) return `+${processedPhone}`; // Thailand
    if (processedPhone.startsWith('86') && processedPhone.length >= 11) return `+${processedPhone}`; // China
    if (processedPhone.startsWith('81') && processedPhone.length >= 10) return `+${processedPhone}`; // Japan
    if (processedPhone.startsWith('82') && processedPhone.length >= 10) return `+${processedPhone}`; // South Korea
    if (processedPhone.startsWith('91') && processedPhone.length >= 10) return `+${processedPhone}`; // India
    if (processedPhone.startsWith('44') && processedPhone.length >= 10) return `+${processedPhone}`; // UK
    if (processedPhone.startsWith('52') && processedPhone.length >= 10) return `+${processedPhone}`; // Mexico
    if (processedPhone.startsWith('54')) return `+${processedPhone}`; // Argentina
    if (processedPhone.startsWith('55')) return `+${processedPhone}`; // Brazil
    if (processedPhone.startsWith('56')) return `+${processedPhone}`; // Chile
    if (processedPhone.startsWith('57')) return `+${processedPhone}`; // Colombia
    if (processedPhone.startsWith('58')) return `+${processedPhone}`; // Venezuela
    if (processedPhone.startsWith('51')) return `+${processedPhone}`; // Peru
    if (processedPhone.startsWith('33')) return `+${processedPhone}`; // France
    if (processedPhone.startsWith('49')) return `+${processedPhone}`; // Germany
    if (processedPhone.startsWith('39')) return `+${processedPhone}`; // Italy
    if (processedPhone.startsWith('34')) return `+${processedPhone}`; // Spain
    if (processedPhone.startsWith('31')) return `+${processedPhone}`; // Netherlands
    if (processedPhone.startsWith('32')) return `+${processedPhone}`; // Belgium
    if (processedPhone.startsWith('43')) return `+${processedPhone}`; // Austria
    if (processedPhone.startsWith('41')) return `+${processedPhone}`; // Switzerland
    if (processedPhone.startsWith('45')) return `+${processedPhone}`; // Denmark
    if (processedPhone.startsWith('46')) return `+${processedPhone}`; // Sweden
    if (processedPhone.startsWith('47')) return `+${processedPhone}`; // Norway
    if (processedPhone.startsWith('30')) return `+${processedPhone}`; // Greece
    if (processedPhone.startsWith('48')) return `+${processedPhone}`; // Poland
    if (processedPhone.startsWith('36')) return `+${processedPhone}`; // Hungary
    if (processedPhone.startsWith('40')) return `+${processedPhone}`; // Romania
    if (processedPhone.startsWith('90')) return `+${processedPhone}`; // Turkey
    if (processedPhone.startsWith('98')) return `+${processedPhone}`; // Iran
    if (processedPhone.startsWith('93')) return `+${processedPhone}`; // Afghanistan
    if (processedPhone.startsWith('92')) return `+${processedPhone}`; // Pakistan
    if (processedPhone.startsWith('94')) return `+${processedPhone}`; // Sri Lanka
    if (processedPhone.startsWith('95')) return `+${processedPhone}`; // Myanmar
    if (processedPhone.startsWith('60')) return `+${processedPhone}`; // Malaysia
    if (processedPhone.startsWith('65')) return `+${processedPhone}`; // Singapore
    if (processedPhone.startsWith('63')) return `+${processedPhone}`; // Philippines
    if (processedPhone.startsWith('62')) return `+${processedPhone}`; // Indonesia
    if (processedPhone.startsWith('84')) return `+${processedPhone}`; // Vietnam
    if (processedPhone.startsWith('85')) return `+${processedPhone}`; // Cambodia/Hong Kong
    if (processedPhone.startsWith('88')) return `+${processedPhone}`; // Bangladesh
    if (processedPhone.startsWith('20')) return `+${processedPhone}`; // Egypt
    if (processedPhone.startsWith('27')) return `+${processedPhone}`; // South Africa
    if (processedPhone.startsWith('7') && processedPhone.length >= 10) return `+${processedPhone}`; // Russia/Kazakhstan
    
    // Check for single digit (North America)
    if (processedPhone.startsWith('1')) return `+${processedPhone}`;
    
    // Default handling for unrecognized patterns
    if (processedPhone.length === 10) return `+1${processedPhone}`; // Default to US/Canada
    if (processedPhone.length === 9) return `+61${processedPhone}`; // Default to Australia mobile
    
    // Return with + prefix for any other cases
    return `+${processedPhone}`;
  };

  const sendVerificationCode = async (contact: string, method: 'email' | 'phone') => {
    try {
      console.log(`🔄 Sending ${method} OTP to: ${contact}`);
      
      if (method === 'email') {
        console.log('📧 Sending EMAIL OTP (6-digit code)');
        
        // Use signInWithOtp for email with OTP-only configuration
        const { data, error } = await supabase.auth.signInWithOtp({
          email: contact,
          options: {
            shouldCreateUser: true,
            // Force OTP by explicitly setting emailRedirectTo to undefined
            emailRedirectTo: undefined,
            data: {
              verification_type: 'email_otp'
            }
          }
        });
        
        if (error) {
          console.error('❌ Email OTP error:', error);
          throw error;
        }
        
        setPendingVerification({ contact, method, code: 'pending' });
        console.log(`✅ EMAIL OTP (6-digit code) sent to ${contact}`);
        
      } else {
        // Phone SMS OTP
        const formattedPhone = formatPhoneNumber(contact);
        console.log(`📱 Formatted phone: ${contact} -> ${formattedPhone}`);
        
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
          options: {
            shouldCreateUser: true,
          }
        });
        
        if (error) {
          console.error('❌ Phone OTP error:', error);
          throw error;
        }
        
        setPendingVerification({ contact: formattedPhone, method, code: 'pending' });
        console.log(`✅ SMS OTP (6-digit code) sent to ${formattedPhone}`);
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
      
      let verifyParams;
      
      if (pendingVerification.method === 'email') {
        verifyParams = {
          email: pendingVerification.contact,
          token: code,
          type: 'email' as const
        };
        console.log('📧 Verifying EMAIL OTP');
      } else {
        verifyParams = {
          phone: pendingVerification.contact,
          token: code,
          type: 'sms' as const
        };
        console.log('📱 Verifying SMS OTP (6-digit code)');
        console.log('📱 Verifying SMS OTP');
      }
      
      const { error, data } = await supabase.auth.verifyOtp(verifyParams);
      
      if (error) {
        console.error('❌ OTP verification error:', error);
        throw error;
      }
      
      if (data?.user) {
        console.log('✅ OTP VERIFICATION SUCCESSFUL!');
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
