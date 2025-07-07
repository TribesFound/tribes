
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Phone, Shield, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PasscodeResetProps {
  onComplete: () => void;
  onCancel: () => void;
}

const PasscodeReset = ({ onComplete, onCancel }: PasscodeResetProps) => {
  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { user } = useAuth();

  const handleSendVerification = async () => {
    setIsVerifying(true);
    // Simulate sending verification code
    setTimeout(() => {
      setIsVerifying(false);
      console.log(`Verification code sent to ${user?.email}`);
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      // Simulate verification
      if (verificationCode === '123456') { // Mock verification
        setStep('reset');
        setError('');
      } else {
        setError('Invalid verification code');
      }
    }
  };

  const handleNumberInput = (number: string) => {
    if (newPasscode.length < 4 && confirmPasscode.length === 0) {
      setNewPasscode(newPasscode + number);
    } else if (confirmPasscode.length < 4) {
      setConfirmPasscode(confirmPasscode + number);
    }
  };

  const handleDelete = () => {
    if (confirmPasscode.length > 0) {
      setConfirmPasscode(confirmPasscode.slice(0, -1));
    } else {
      setNewPasscode(newPasscode.slice(0, -1));
    }
  };

  const handleResetPasscode = () => {
    if (newPasscode.length === 4 && confirmPasscode.length === 4) {
      if (newPasscode === confirmPasscode) {
        localStorage.setItem('tribes_passcode', newPasscode);
        onComplete();
      } else {
        setError('Passcodes do not match');
        setConfirmPasscode('');
      }
    }
  };

  const renderNumberPad = () => (
    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button
          key={num}
          onClick={() => handleNumberInput(num.toString())}
          className="cave-button aspect-square text-2xl font-bold"
          size="lg"
        >
          {num}
        </Button>
      ))}
      <div></div>
      <Button
        onClick={() => handleNumberInput('0')}
        className="cave-button aspect-square text-2xl font-bold"
        size="lg"
      >
        0
      </Button>
      <Button
        onClick={handleDelete}
        variant="outline"
        className="cave-button-outline aspect-square"
        size="lg"
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen cave-gradient p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="cave-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl cave-font text-amber-900">
              {step === 'verify' ? 'Verify Identity' : 'Reset Passcode'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {step === 'verify' && (
              <>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-amber-800 mb-4">
                    We'll send a verification code to {user?.email}
                  </p>
                </div>

                {!isVerifying && verificationCode.length === 0 && (
                  <Button
                    onClick={handleSendVerification}
                    className="w-full cave-button"
                  >
                    Send Verification Code
                  </Button>
                )}

                {(isVerifying || verificationCode.length > 0) && (
                  <>
                    <div className="text-center">
                      <p className="text-sm cave-text mb-4">
                        {isVerifying ? 'Sending code...' : 'Enter the 6-digit code'}
                      </p>
                    </div>

                    {!isVerifying && (
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
                              <InputOTPSlot key={i} index={i} className="cave-input" />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {step === 'reset' && (
              <>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <p className="text-amber-800 mb-4">
                    {newPasscode.length < 4 ? 'Enter new passcode' : 'Confirm new passcode'}
                  </p>
                  <div className="flex justify-center space-x-4 mb-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 ${
                          (newPasscode.length < 4 ? index < newPasscode.length : index < confirmPasscode.length)
                            ? 'bg-orange-600 border-orange-600'
                            : 'border-amber-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {renderNumberPad()}

                {newPasscode.length === 4 && confirmPasscode.length === 4 && (
                  <Button
                    onClick={handleResetPasscode}
                    className="w-full cave-button mt-6"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Reset Passcode
                  </Button>
                )}
              </>
            )}

            <Button
              onClick={onCancel}
              variant="ghost"
              className="w-full cave-button-ghost"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasscodeReset;
