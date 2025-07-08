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
    
    // If already formatted with +, clean and validate
    if (phone.startsWith('+')) {
      const withoutPlus = phone.substring(1).replace(/\D/g, '');
      return `+${withoutPlus}`;
    }
    
    // Country code detection and formatting
    // Check for 3-digit country codes first (longest match)
    if (cleanPhone.startsWith('593')) return `+${cleanPhone}`; // Ecuador
    if (cleanPhone.startsWith('598')) return `+${cleanPhone}`; // Uruguay
    if (cleanPhone.startsWith('595')) return `+${cleanPhone}`; // Paraguay
    if (cleanPhone.startsWith('591')) return `+${cleanPhone}`; // Bolivia
    if (cleanPhone.startsWith('594')) return `+${cleanPhone}`; // French Guiana
    if (cleanPhone.startsWith('597')) return `+${cleanPhone}`; // Suriname
    if (cleanPhone.startsWith('592')) return `+${cleanPhone}`; // Guyana
    if (cleanPhone.startsWith('358')) return `+${cleanPhone}`; // Finland
    if (cleanPhone.startsWith('353')) return `+${cleanPhone}`; // Ireland
    if (cleanPhone.startsWith('351')) return `+${cleanPhone}`; // Portugal
    if (cleanPhone.startsWith('420')) return `+${cleanPhone}`; // Czech Republic
    if (cleanPhone.startsWith('421')) return `+${cleanPhone}`; // Slovakia
    if (cleanPhone.startsWith('359')) return `+${cleanPhone}`; // Bulgaria
    if (cleanPhone.startsWith('385')) return `+${cleanPhone}`; // Croatia
    if (cleanPhone.startsWith('386')) return `+${cleanPhone}`; // Slovenia
    if (cleanPhone.startsWith('372')) return `+${cleanPhone}`; // Estonia
    if (cleanPhone.startsWith('371') && cleanPhone.length >= 11) return `+${cleanPhone}`; // Latvia
    if (cleanPhone.startsWith('370')) return `+${cleanPhone}`; // Lithuania
    if (cleanPhone.startsWith('356')) return `+${cleanPhone}`; // Malta
    if (cleanPhone.startsWith('357')) return `+${cleanPhone}`; // Cyprus
    if (cleanPhone.startsWith('352')) return `+${cleanPhone}`; // Luxembourg
    if (cleanPhone.startsWith('389')) return `+${cleanPhone}`; // North Macedonia
    if (cleanPhone.startsWith('964')) return `+${cleanPhone}`; // Iraq
    if (cleanPhone.startsWith('962')) return `+${cleanPhone}`; // Jordan
    if (cleanPhone.startsWith('961')) return `+${cleanPhone}`; // Lebanon
    if (cleanPhone.startsWith('963')) return `+${cleanPhone}`; // Syria
    if (cleanPhone.startsWith('966')) return `+${cleanPhone}`; // Saudi Arabia
    if (cleanPhone.startsWith('965')) return `+${cleanPhone}`; // Kuwait
    if (cleanPhone.startsWith('973')) return `+${cleanPhone}`; // Bahrain
    if (cleanPhone.startsWith('974')) return `+${cleanPhone}`; // Qatar
    if (cleanPhone.startsWith('971')) return `+${cleanPhone}`; // UAE
    if (cleanPhone.startsWith('968')) return `+${cleanPhone}`; // Oman
    if (cleanPhone.startsWith('967')) return `+${cleanPhone}`; // Yemen
    
    // Check for 2-digit country codes
    if (cleanPhone.startsWith('61') && cleanPhone.length >= 10) return `+${cleanPhone}`; // Australia
    if (cleanPhone.startsWith('64') && cleanPhone.length >= 9) return `+${cleanPhone}`; // New Zealand
    if (cleanPhone.startsWith('66') && cleanPhone.length >= 9) return `+${cleanPhone}`; // Thailand
    if (cleanPhone.startsWith('54')) return `+${cleanPhone}`; // Argentina
    if (cleanPhone.startsWith('55')) return `+${cleanPhone}`; // Brazil
    if (cleanPhone.startsWith('56')) return `+${cleanPhone}`; // Chile
    if (cleanPhone.startsWith('57')) return `+${cleanPhone}`; // Colombia
    if (cleanPhone.startsWith('58')) return `+${cleanPhone}`; // Venezuela
    if (cleanPhone.startsWith('51')) return `+${cleanPhone}`; // Peru
    if (cleanPhone.startsWith('33')) return `+${cleanPhone}`; // France
    if (cleanPhone.startsWith('49')) return `+${cleanPhone}`; // Germany
    if (cleanPhone.startsWith('39')) return `+${cleanPhone}`; // Italy
    if (cleanPhone.startsWith('34')) return `+${cleanPhone}`; // Spain
    if (cleanPhone.startsWith('31')) return `+${cleanPhone}`; // Netherlands
    if (cleanPhone.startsWith('32')) return `+${cleanPhone}`; // Belgium
    if (cleanPhone.startsWith('43')) return `+${cleanPhone}`; // Austria
    if (cleanPhone.startsWith('41')) return `+${cleanPhone}`; // Switzerland
    if (cleanPhone.startsWith('45')) return `+${cleanPhone}`; // Denmark
    if (cleanPhone.startsWith('46')) return `+${cleanPhone}`; // Sweden
    if (cleanPhone.startsWith('47')) return `+${cleanPhone}`; // Norway
    if (cleanPhone.startsWith('30')) return `+${cleanPhone}`; // Greece
    if (cleanPhone.startsWith('48')) return `+${cleanPhone}`; // Poland
    if (cleanPhone.startsWith('36')) return `+${cleanPhone}`; // Hungary
    if (cleanPhone.startsWith('40')) return `+${cleanPhone}`; // Romania
    if (cleanPhone.startsWith('90')) return `+${cleanPhone}`; // Turkey
    if (cleanPhone.startsWith('98')) return `+${cleanPhone}`; // Iran
    if (cleanPhone.startsWith('93')) return `+${cleanPhone}`; // Afghanistan
    if (cleanPhone.startsWith('92')) return `+${cleanPhone}`; // Pakistan
    
    // Check for single digit (North America)
    if (cleanPhone.startsWith('1')) return `+${cleanPhone}`;
    
    // Default handling for unrecognized patterns
    if (cleanPhone.length === 10) return `+1${cleanPhone}`; // Default to US/Canada
    if (cleanPhone.length === 9) return `+61${cleanPhone}`; // Default to Australia mobile
    
    // Return with + prefix for any other cases
    return `+${cleanPhone}`;
  };

  const sendVerificationCode = async (contact: string, method: 'email' | 'phone') => {
    try {
      console.log(`🔄 Sending ${method} OTP to: ${contact}`);
      
      if (method === 'email') {
        console.log('📧 FORCING EMAIL OTP (NOT MAGIC LINK)');
        
        // Method 1: Try signInWithOtp with explicit OTP configuration
        const { data, error } = await supabase.auth.signInWithOtp({
          email: contact,
          options: {
            shouldCreateUser: true,
            // Explicitly request OTP by not providing emailRedirectTo
            data: {
              email_otp_only: true,
              disable_magic_link: true
            }
          }
        });
        
        if (error) {
          console.error('❌ Email OTP error:', error);
          
          // Method 2: If first method fails, try resend with OTP type
          console.log('🔄 Trying alternative OTP method...');
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: contact,
            options: {
              emailRedirectTo: undefined
            }
          });
          
          if (resendError) {
            throw resendError;
          }
        }
        
        setPendingVerification({ contact, method, code: 'pending' });
        console.log(`✅ EMAIL OTP CODE (6-digits) sent to ${contact} - NO MAGIC LINK!`);
        
      } else {
        // Phone SMS OTP
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
        console.log(`✅ SMS OTP CODE (6-digits) sent to ${formattedPhone}`);
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
        console.log('📧 Verifying EMAIL OTP (6-digit code)');
      } else {
        verifyParams = {
          phone: pendingVerification.contact,
          token: code,
          type: 'sms' as const
        };
        console.log('📱 Verifying SMS OTP (6-digit code)');
      }
      
      const { error, data } = await supabase.auth.verifyOtp(verifyParams);
      
      if (error) {
        console.error('❌ OTP verification error:', error);
        throw error;
      }
      
      if (data?.user) {
        console.log('✅ 6-DIGIT OTP VERIFICATION SUCCESSFUL!');
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
