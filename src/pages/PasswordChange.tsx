
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordChange = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'current' | 'verification' | 'new'>('current');
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');

  const handleCurrentPasscode = () => {
    if (currentPasscode.length === 6) {
      // Simulate passcode verification
      toast({
        title: "Passcode verified",
        description: "You can now create a new passcode",
      });
      setStep('new');
    } else {
      toast({
        title: "Invalid passcode",
        description: "Please enter your 6-digit passcode",
        variant: "destructive"
      });
    }
  };

  const handleForgotPasscode = () => {
    setStep('verification');
  };

  const handleVerificationCode = () => {
    if (verificationCode.length === 6) {
      toast({
        title: "Code verified",
        description: "You can now create a new passcode",
      });
      setStep('new');
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
    }
  };

  const handleNewPasscode = () => {
    if (newPasscode.length === 6 && newPasscode === confirmPasscode) {
      toast({
        title: "Passcode updated",
        description: "Your passcode has been successfully changed",
      });
      navigate('/settings');
    } else if (newPasscode !== confirmPasscode) {
      toast({
        title: "Passcodes don't match",
        description: "Please make sure both passcodes are identical",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Invalid passcode",
        description: "Passcode must be 6 digits",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen tribal-gradient p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/settings')}
            className="text-white hover:bg-orange-200/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold tribal-font text-white">Change Passcode</h1>
        </div>

        <Card className="tribal-card">
          <CardHeader>
            <CardTitle className="text-lg tribal-font text-amber-900 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              {step === 'current' && 'Current Passcode'}
              {step === 'verification' && 'Verification'}
              {step === 'new' && 'New Passcode'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'current' && (
              <>
                <div>
                  <Label htmlFor="current-passcode">Enter your current passcode</Label>
                  <Input
                    id="current-passcode"
                    type="password"
                    maxLength={6}
                    value={currentPasscode}
                    onChange={(e) => setCurrentPasscode(e.target.value)}
                    className="tribal-input mt-2"
                    placeholder="000000"
                  />
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleCurrentPasscode}
                    className="w-full tribal-button"
                    disabled={currentPasscode.length !== 6}
                  >
                    Verify Passcode
                  </Button>
                  <Button
                    onClick={handleForgotPasscode}
                    variant="outline"
                    className="w-full tribal-button-outline"
                  >
                    Forgot Passcode?
                  </Button>
                </div>
              </>
            )}

            {step === 'verification' && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label>Choose verification method</Label>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        variant={contactMethod === 'email' ? 'default' : 'outline'}
                        onClick={() => setContactMethod('email')}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        variant={contactMethod === 'phone' ? 'default' : 'outline'}
                        onClick={() => setContactMethod('phone')}
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact">
                      Enter your {contactMethod === 'email' ? 'email address' : 'phone number'}
                    </Label>
                    <Input
                      id="contact"
                      type={contactMethod === 'email' ? 'email' : 'tel'}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      className="tribal-input mt-2"
                      placeholder={contactMethod === 'email' ? 'your@email.com' : '+1 (555) 123-4567'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="verification-code">Enter verification code</Label>
                    <Input
                      id="verification-code"
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="tribal-input mt-2"
                      placeholder="123456"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleVerificationCode}
                  className="w-full tribal-button"
                  disabled={verificationCode.length !== 6 || !contactValue}
                >
                  Verify Code
                </Button>
              </>
            )}

            {step === 'new' && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-passcode">New passcode</Label>
                    <Input
                      id="new-passcode"
                      type="password"
                      maxLength={6}
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      className="tribal-input mt-2"
                      placeholder="000000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-passcode">Confirm new passcode</Label>
                    <Input
                      id="confirm-passcode"
                      type="password"
                      maxLength={6}
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      className="tribal-input mt-2"
                      placeholder="000000"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleNewPasscode}
                  className="w-full tribal-button"
                  disabled={newPasscode.length !== 6 || confirmPasscode.length !== 6}
                >
                  Update Passcode
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordChange;
