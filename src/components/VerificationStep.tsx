
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Phone, MapPin, Calendar, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { requestSecureLocation, LocationError } from '@/utils/geolocation';
import { verifyAge } from '@/utils/ageVerification';
import { useAuth } from '@/contexts/AuthContext';

interface VerificationStepProps {
  onComplete: (data: {
    email?: string;
    phone?: string;
    dateOfBirth: string;
    location: { lat: number; lng: number; city: string; country: string };
  }) => void;
}

const VerificationStep = ({ onComplete }: VerificationStepProps) => {
  const [step, setStep] = useState<'method' | 'contact' | 'verify' | 'age' | 'location'>('method');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLocationGranted, setIsLocationGranted] = useState(false);
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  
  const { sendVerificationCode, verifyCode, user } = useAuth();

  // Auto-redirect when verification is complete
  useEffect(() => {
    if (isCodeVerified) {
      const timer = setTimeout(() => {
        setStep('age');
        setError('');
        console.log('✅ Verification successful - proceeding to age verification');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isCodeVerified]);

  const handleSendVerification = async () => {
    setIsVerifying(true);
    setError('');
    
    try {
      const contact = contactMethod === 'email' ? email : phone;
      await sendVerificationCode(contact, contactMethod);
      setStep('verify');
      console.log(`Verification code sent to ${contact} via ${contactMethod}`);
    } catch (error: any) {
      setError('Failed to send verification code. Please check your connection and try again.');
      console.error('Verification send error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length === 6) {
      setIsVerifying(true);
      try {
        const isValid = await verifyCode(verificationCode);
        if (isValid) {
          setIsCodeVerified(true);
          setError('');
          console.log('✅ Verification successful - auto-redirecting...');
        } else {
          setError('Invalid verification code. Please try again.');
        }
      } catch (error: any) {
        setError('Verification failed. Please try again.');
        console.error('Code verification error:', error);
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
          [contactMethod]: contactMethod === 'email' ? email : phone,
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
        [contactMethod]: contactMethod === 'email' ? email : phone,
        dateOfBirth,
        location
      });
    }
  };

  // If user is already authenticated, skip verification
  useEffect(() => {
    if (user && user.isVerified) {
      console.log('User already verified, skipping verification steps');
      // Could redirect to profile setup or dashboard
    }
  }, [user]);

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
              {step === 'verify' && 'Verify Your Account'}
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
                  <p className="text-amber-700 cave-text">Choose how you'd like to verify your account</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      setContactMethod('email');
                      setStep('contact');
                    }}
                    className="cave-button h-16 flex-col space-y-2"
                  >
                    <Mail className="w-6 h-6" />
                    <span>Email</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setContactMethod('phone');
                      setStep('contact');
                    }}
                    className="cave-button h-16 flex-col space-y-2"
                  >
                    <Phone className="w-6 h-6" />
                    <span>Phone</span>
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
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="cave-text">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="cave-input"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
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
                    disabled={isVerifying || (contactMethod === 'email' ? !email : !phone)}
                    className="flex-1 cave-button"
                  >
                    {isVerifying ? 'Sending...' : 'Send Code'}
                  </Button>
                </div>
              </>
            )}

            {step === 'verify' && (
              <>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-sm cave-text mb-4">
                    Enter the 6-digit code sent to {contactMethod === 'email' ? email : phone}
                  </p>
                  {isCodeVerified && (
                    <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Code verified! Redirecting...</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => {
                      setVerificationCode(value);
                      if (value.length === 6 && !isCodeVerified) {
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
                      Resend Code
                    </Button>
                    
                    <Button
                      onClick={() => setStep('age')}
                      variant="outline"
                      className="w-full cave-button-outline"
                    >
                      Continue Manually
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
                    You must be 18 or older to use Tribes
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="cave-text">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="cave-input"
                    max={new Date().toISOString().split('T')[0]}
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
                  <p className="text-sm cave-text mb-4">
                    We need your location to show you nearby tribe members. Your precise location is kept secure and private.
                  </p>
                </div>

                {!isLocationGranted ? (
                  <Button
                    onClick={requestLocation}
                    className="w-full cave-button"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Allow Secure Location Access
                  </Button>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <p className="text-sm cave-text mb-2">
                      Location verified: {location?.city}, {location?.country}
                    </p>
                    {isRedirecting ? (
                      <div className="space-y-3">
                        <p className="text-xs text-amber-600">
                          Redirecting automatically in 2 seconds...
                        </p>
                        <Button
                          onClick={handleManualContinue}
                          className="w-full cave-button"
                        >
                          Continue Now
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleManualContinue}
                        className="w-full cave-button"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationStep;
