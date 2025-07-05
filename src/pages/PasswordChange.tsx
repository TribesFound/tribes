
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordChange = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPasscode: '',
    email: '',
    phone: '',
    verificationCode: ''
  });
  const [step, setStep] = useState<'current' | 'forgot' | 'verify' | 'new'>('current');

  const handleCurrentPasscodeSubmit = () => {
    if (formData.currentPasscode.length !== 4) {
      toast({
        title: "Invalid passcode",
        description: "Please enter your 4-digit passcode",
        variant: "destructive"
      });
      return;
    }

    // Simulate passcode verification
    if (formData.currentPasscode === '1234') { // Mock verification
      navigate('/passcode-setup');
    } else {
      toast({
        title: "Incorrect passcode",
        description: "Please try again or choose 'Forgot Passcode'",
        variant: "destructive"
      });
    }
  };

  const handleForgotPasscode = () => {
    setStep('forgot');
  };

  const handleSendVerificationCode = () => {
    if (!formData.email && !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please enter your email or phone number",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending verification code
    toast({
      title: "Verification code sent",
      description: `Code sent to ${formData.email || formData.phone}. Check your ${formData.email ? 'email' : 'messages'}.`,
    });
    setStep('verify');
  };

  const handleVerifyCode = () => {
    if (formData.verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    // Simulate code verification
    if (formData.verificationCode === '123456') { // Mock verification
      navigate('/passcode-setup');
    } else {
      toast({
        title: "Invalid verification code",
        description: "Please check your code and try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen cave-gradient p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/edit-profile')}
            className="text-white hover:bg-orange-200/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Change Passcode</h1>
        </div>

        {step === 'current' && (
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Enter Current Passcode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPasscode">Current 4-Digit Passcode</Label>
                <div className="relative mt-2">
                  <Input
                    id="currentPasscode"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPasscode}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentPasscode: e.target.value.slice(0, 4) }))}
                    className="cave-input pr-10"
                    placeholder="Enter your 4-digit passcode"
                    maxLength={4}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCurrentPasscodeSubmit}
                  className="w-full cave-button"
                  disabled={formData.currentPasscode.length !== 4}
                >
                  Verify Passcode
                </Button>

                <Button
                  onClick={handleForgotPasscode}
                  variant="outline"
                  className="w-full cave-button-outline"
                >
                  Forgot Passcode?
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'forgot' && (
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900">Reset Passcode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-700">
                Enter the email or phone number associated with your account to receive a verification code.
              </p>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value, phone: '' }))}
                  className="cave-input mt-2"
                  placeholder="your@email.com"
                />
              </div>

              <div className="text-center">
                <span className="text-amber-700">or</span>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value, email: '' }))}
                  className="cave-input mt-2"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleSendVerificationCode}
                  className="w-full cave-button"
                  disabled={!formData.email && !formData.phone}
                >
                  Send Verification Code
                </Button>

                <Button
                  onClick={() => setStep('current')}
                  variant="outline"
                  className="w-full cave-button-outline"
                >
                  Back to Passcode Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'verify' && (
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900">Enter Verification Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-700">
                We sent a 6-digit code to {formData.email || formData.phone}. Enter it below to continue.
              </p>

              <div>
                <Label htmlFor="verificationCode">6-Digit Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationCode: e.target.value.slice(0, 6) }))}
                  className="cave-input mt-2 text-center text-lg tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleVerifyCode}
                  className="w-full cave-button"
                  disabled={formData.verificationCode.length !== 6}
                >
                  Verify Code
                </Button>

                <Button
                  onClick={handleSendVerificationCode}
                  variant="outline"
                  className="w-full cave-button-outline"
                >
                  Resend Code
                </Button>

                <Button
                  onClick={() => setStep('forgot')}
                  variant="ghost"
                  className="w-full text-amber-700 hover:bg-orange-50"
                >
                  Change Email/Phone
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
