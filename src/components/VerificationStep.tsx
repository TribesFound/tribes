
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Phone, MapPin, Calendar, Shield, CheckCircle } from 'lucide-react';

interface VerificationStepProps {
  onComplete: (data: {
    email?: string;
    phone?: string;
    dateOfBirth: string;
    location: { lat: number; lng: number; city: string; country: string };
  }) => void;
}

const VerificationStep = ({ onComplete }: VerificationStepProps) => {
  const [step, setStep] = useState<'contact' | 'verify' | 'age' | 'location'>('contact');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLocationGranted, setIsLocationGranted] = useState(false);

  const handleSendVerification = async () => {
    setIsVerifying(true);
    // Simulate sending verification code
    setTimeout(() => {
      setIsVerifying(false);
      setStep('verify');
      console.log(`Verification code sent to ${contactMethod === 'email' ? email : phone}`);
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      setStep('age');
    }
  };

  const handleAgeVerification = () => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 18) {
      setStep('location');
    } else {
      alert('You must be 18 or older to use Tribes.');
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simulate reverse geocoding
          setTimeout(() => {
            const mockLocation = {
              lat: latitude,
              lng: longitude,
              city: 'San Francisco',
              country: 'United States'
            };
            setLocation(mockLocation);
            setIsLocationGranted(true);
            
            onComplete({
              [contactMethod]: contactMethod === 'email' ? email : phone,
              dateOfBirth,
              location: mockLocation
            });
          }, 1000);
        },
        (error) => {
          console.error('Location access denied:', error);
          alert('Location access is required to use Tribes.');
        }
      );
    }
  };

  return (
    <div className="min-h-screen tribal-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold tribal-font mb-2">Tribes</h1>
          <p className="text-lg opacity-90">Verify your identity</p>
        </div>

        <Card className="tribal-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl tribal-font">
              {step === 'contact' && 'Contact Information'}
              {step === 'verify' && 'Verify Your Account'}
              {step === 'age' && 'Age Verification'}
              {step === 'location' && 'Location Access'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'contact' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setContactMethod('email')}
                    variant={contactMethod === 'email' ? 'default' : 'outline'}
                    className={contactMethod === 'email' ? 'tribal-button' : ''}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    onClick={() => setContactMethod('phone')}
                    variant={contactMethod === 'phone' ? 'default' : 'outline'}
                    className={contactMethod === 'phone' ? 'tribal-button' : ''}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Button>
                </div>

                {contactMethod === 'email' ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="tribal-input"
                      placeholder="your@email.com"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="tribal-input"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                )}

                <Button
                  onClick={handleSendVerification}
                  disabled={isVerifying || (!email && !phone)}
                  className="w-full tribal-button"
                >
                  {isVerifying ? 'Sending...' : 'Send Verification Code'}
                </Button>
              </>
            )}

            {step === 'verify' && (
              <>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-sm text-gray-600 mb-4">
                    Enter the 6-digit code sent to {contactMethod === 'email' ? email : phone}
                  </p>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => {
                      setVerificationCode(value);
                      if (value.length === 6) {
                        setTimeout(handleVerifyCode, 500);
                      }
                    }}
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} className="tribal-input" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={() => handleSendVerification()}
                  variant="ghost"
                  className="w-full"
                >
                  Resend Code
                </Button>
              </>
            )}

            {step === 'age' && (
              <>
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-sm text-gray-600 mb-4">
                    You must be 18 or older to use Tribes
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="tribal-input"
                  />
                </div>

                <Button
                  onClick={handleAgeVerification}
                  disabled={!dateOfBirth}
                  className="w-full tribal-button"
                >
                  Verify Age
                </Button>
              </>
            )}

            {step === 'location' && (
              <>
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-sm text-gray-600 mb-4">
                    We need your location to show you nearby tribe members
                  </p>
                </div>

                {!isLocationGranted ? (
                  <Button
                    onClick={requestLocation}
                    className="w-full tribal-button"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Allow Location Access
                  </Button>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <p className="text-sm text-gray-600">
                      Location access granted! Setting up your profile...
                    </p>
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
