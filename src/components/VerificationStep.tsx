
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Phone, MapPin, Calendar, Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { requestSecureLocation, LocationError } from '@/utils/geolocation';
import { verifyAge } from '@/utils/ageVerification';
import { useAuth } from '@/contexts/AuthContext';

interface VerificationStepProps {
  onComplete: (data: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    dateOfBirth: string;
    location: { lat: number; lng: number; city: string; country: string };
  }) => void;
}

const VerificationStep = ({ onComplete }: VerificationStepProps) => {
  const [step, setStep] = useState<'method' | 'contact' | 'verify' | 'age' | 'location'>('method');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | 'whatsapp'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLocationGranted, setIsLocationGranted] = useState(false);
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [otpSentAt, setOtpSentAt] = useState<Date | null>(null);
  
  const { sendVerificationCode, verifyCode, user } = useAuth();

  // Auto-redirect when verification is complete
  useEffect(() => {
    if (isCodeVerified) {
      const timer = setTimeout(() => {
        setStep('age');
        setError('');
        console.log('✅ Verification complete - proceeding to age verification');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isCodeVerified]);

  const handleSendVerification = async () => {
    setIsVerifying(true);
    setError('');
    
    try {
      const contact = contactMethod === 'email' ? email : 
                     contactMethod === 'phone' ? phone : whatsapp;
      
      if (!contact) {
        throw new Error('Please enter your contact information');
      }
      
      if (contactMethod === 'phone' || contactMethod === 'whatsapp') {
        // Phone validation
        const cleanPhone = contact.replace(/\D/g, '');
        if (cleanPhone.length < 8) {
          throw new Error('Please enter a valid phone number with country code');
        }
      }
      
      if (contactMethod === 'email') {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address');
        }
      }
      
      console.log(`🚀 Sending ${contactMethod.toUpperCase()} OTP...`);
      await sendVerificationCode(contact, contactMethod);
      
      setOtpSentAt(new Date());
      setStep('verify');
      console.log(`✅ ${contactMethod} OTP sent to ${contact}`);
    } catch (error: any) {
      console.error('❌ OTP delivery failed:', error);
      setError(error.message || `Failed to send ${contactMethod.toUpperCase()} verification code. Please try again.`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length === 6) {
      setIsVerifying(true);
      setError('');
      
      try {
        console.log(`🔍 Verifying OTP code: ${verificationCode}`);
        const isValid = await verifyCode(verificationCode);
        if (isValid) {
          setIsCodeVerified(true);
          console.log('✅ OTP verification successful');
        }
      } catch (error: any) {
        console.error('❌ OTP verification failed:', error);
        setError(error.message || 'Invalid 6-digit verification code. Please try again.');
        setVerificationCode('');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleAgeVerification = () => {
    const verification = verifyAge(dateOfBirth);
    
    if (!verification.isValid) {
      setError(verification.error || 'Age verification failed');
      return;
    }

    setError('');
    setStep('location');
  };

  const requestLocation = async () => {
    setError('');
    
    try {
      const locationData = await requestSecureLocation();
      
      setLocation({
        lat: locationData.lat,
        lng: locationData.lng,
        city: locationData.city,
        country: locationData.country
      });
      
      setIsLocationGranted(true);
      setIsRedirecting(true);
      
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        onComplete({
          [contactMethod]: contactMethod === 'email' ? email : contactMethod === 'phone' ? phone : whatsapp,
          dateOfBirth,
          location: {
            lat: locationData.lat,
            lng: locationData.lng,
            city: locationData.city,
            country: locationData.country
          }
        });
      }, 2000);
    } catch (locationError) {
      const error = locationError as LocationError;
      setError(`Location access failed: ${error.message}`);
    }
  };

  const handleManualContinue = () => {
    if (isLocationGranted && location) {
      onComplete({
        [contactMethod]: contactMethod === 'email' ? email : contactMethod === 'phone' ? phone : whatsapp,
        dateOfBirth,
        location
      });
    }
  };

  return (
    <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center text-amber-900 mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-4xl font-bold cave-font mb-2">Tribes</h1>
          <p className="text-lg opacity-90 cave-text">Verify your identity</p>
        </div>

        <Card className="cave-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl cave-font text-amber-900">
              {step === 'method' && 'Choose Verification Method'}
              {step === 'contact' && 'Contact Information'}
              {step === 'verify' && 'Enter 6-Digit OTP Code'}
              {step === 'age' && 'Age Verification'}
              {step === 'location' && 'Location Access'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {step === 'method' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-amber-700 cave-text">Choose how you'd like to receive your 6-digit OTP code</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      setContactMethod('email');
                      setStep('contact');
                    }}
                    className="cave-button h-20 flex-col space-y-2"
                  >
                    <Mail className="w-6 h-6" />
                    <span className="text-sm">Email OTP</span>
                    <span className="text-xs opacity-75">6-digit code</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setContactMethod('phone');
                      setStep('contact');
                    }}
                    className="cave-button h-20 flex-col space-y-2"
                  >
                    <Phone className="w-6 h-6" />
                    <span className="text-sm">SMS OTP</span>
                    <span className="text-xs opacity-75">6-digit code</span>
                  </Button>
                </div>
                
                <Button
                  onClick={() => {
                    setContactMethod('whatsapp');
                    setStep('contact');
                  }}
                  className="cave-button w-full h-16 flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-medium">WhatsApp OTP</div>
                    <div className="text-xs opacity-75">6-digit code via WhatsApp</div>
                  </div>
                </Button>
                  </Button>
                </div>
              </div>
            )}

            {step === 'contact' && (
              <>
                {contactMethod === 'email' ? (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="cave-text">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="cave-input"
                      placeholder="your@email.com"
                      required
                    />
                    <p className="text-xs text-amber-600">
                      ✅ You will receive a 6-digit OTP code (NOT a magic link)
                    </p>
                  </div>
                ) : contactMethod === 'phone' ? (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="cave-text">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="cave-input"
                      placeholder="+1 555 000 0000"
                      required
                    />
                    <p className="text-xs text-amber-600">
                      ✅ SMS OTP via Twilio - Worldwide coverage
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="cave-text">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="cave-input"
                      placeholder="+1 555 000 0000"
                      required
                    />
                    <p className="text-xs text-amber-600">
                      ✅ WhatsApp OTP via Twilio - Worldwide coverage
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button
                    onClick={() => setStep('method')}
                    variant="outline"
                    className="flex-1 cave-button-outline"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSendVerification}
                    disabled={isVerifying || (contactMethod === 'email' ? !email : contactMethod === 'phone' ? !phone : !whatsapp)}
                    className="flex-1 cave-button"
                  >
                    {isVerifying ? 'Sending OTP...' : 'Send 6-Digit Code'}
                  </Button>
                </div>
              </>
            )}

            {step === 'verify' && (
              <>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-sm cave-text mb-2">
                    Enter the 6-digit OTP code sent to {contactMethod === 'email' ? email : 
                    contactMethod === 'phone' ? phone : whatsapp} via {contactMethod.toUpperCase()}
                  </p>
                  {otpSentAt && (
                    <div className="flex items-center justify-center space-x-1 text-xs text-amber-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>Code expires in 5 minutes</span>
                    </div>
                  )}
                  {isCodeVerified && (
                    <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">6-digit OTP verified! Redirecting...</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => {
                      setVerificationCode(value);
                      if (value.length === 6 && !isCodeVerified && !isVerifying) {
                        setTimeout(() => handleVerifyCode(), 500);
                      }
                    }}
                    disabled={isVerifying || isCodeVerified}
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} className="cave-input" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {!isCodeVerified && (
                  <>
                    <Button
                      onClick={() => handleSendVerification()}
                      variant="ghost"
                      className="w-full cave-button-ghost"
                      disabled={isVerifying}
                    >
                      Resend 6-Digit Code
                    </Button>
                    
                    <Button
                      onClick={() => setStep('contact')}
                      variant="outline"
                      className="w-full cave-button-outline"
                    >
                      Change Contact Method
                    </Button>
                  </>
                )}
              </>
            )}

            {step === 'age' && (
              <>
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-sm cave-text mb-4">
                    Please confirm your date of birth for age verification
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="cave-text">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="cave-input"
                    required
                  />
                </div>

                <Button
                  onClick={handleAgeVerification}
                  disabled={!dateOfBirth}
                  className="w-full cave-button"
                >
                  Verify Age
                </Button>
              </>
            )}

            {step === 'location' && (
              <>
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  {!isLocationGranted ? (
                    <>
                      <p className="text-sm cave-text mb-4">
                        We need your location to connect you with nearby tribe members
                      </p>
                      <Button
                        onClick={requestLocation}
                        className="cave-button"
                      >
                        Grant Location Access
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Location granted!</span>
                      </div>
                      <p className="text-sm cave-text mb-4">
                        Location: {location?.city}, {location?.country}
                      </p>
                      {isRedirecting ? (
                        <p className="text-sm text-orange-600">Redirecting...</p>
                      ) : (
                        <Button
                          onClick={handleManualContinue}
                          className="cave-button"
                        >
                          Continue
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationStep;
