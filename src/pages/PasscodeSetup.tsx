
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PasscodeSetup = () => {
  const [step, setStep] = useState<'choice' | 'create' | 'confirm'>('choice');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNumberInput = (number: string) => {
    if (step === 'create') {
      if (passcode.length < 4) {
        setPasscode(passcode + number);
      }
    } else if (step === 'confirm') {
      if (confirmPasscode.length < 4) {
        setConfirmPasscode(confirmPasscode + number);
      }
    }
  };

  const handleDelete = () => {
    if (step === 'create') {
      setPasscode(passcode.slice(0, -1));
    } else if (step === 'confirm') {
      setConfirmPasscode(confirmPasscode.slice(0, -1));
    }
  };

  const handleCreatePasscode = () => {
    if (passcode.length === 4) {
      setStep('confirm');
      setError('');
    }
  };

  const handleConfirmPasscode = () => {
    if (confirmPasscode.length === 4) {
      if (passcode === confirmPasscode) {
        // Save passcode to localStorage or context
        localStorage.setItem('tribes_passcode', passcode);
        localStorage.setItem('tribes_passcode_enabled', 'true');
        navigate('/discover');
      } else {
        setError('Passcodes do not match. Please try again.');
        setConfirmPasscode('');
      }
    }
  };

  const handleSkip = () => {
    localStorage.setItem('tribes_passcode_enabled', 'false');
    navigate('/discover');
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
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold cave-font text-white">Secure Your Tribe</h1>
        </div>

        <Card className="cave-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl cave-font text-amber-900">
              {step === 'choice' && 'App Security'}
              {step === 'create' && 'Create Passcode'}
              {step === 'confirm' && 'Confirm Passcode'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {step === 'choice' && (
              <>
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                  <p className="text-amber-800 mb-6">
                    Would you like to add an extra layer of security with a 4-digit passcode?
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => setStep('create')}
                    className="w-full cave-button"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Create Passcode
                  </Button>
                  <Button
                    onClick={handleSkip}
                    variant="ghost"
                    className="w-full cave-button-ghost"
                  >
                    Skip for Now
                  </Button>
                </div>
              </>
            )}

            {step === 'create' && (
              <>
                <div className="text-center">
                  <p className="text-amber-800 mb-4">Enter a 4-digit passcode</p>
                  <div className="flex justify-center space-x-4 mb-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 ${
                          index < passcode.length
                            ? 'bg-orange-600 border-orange-600'
                            : 'border-amber-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {renderNumberPad()}
                {passcode.length === 4 && (
                  <Button
                    onClick={handleCreatePasscode}
                    className="w-full cave-button mt-6"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                )}
              </>
            )}

            {step === 'confirm' && (
              <>
                <div className="text-center">
                  <p className="text-amber-800 mb-4">Confirm your passcode</p>
                  <div className="flex justify-center space-x-4 mb-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 ${
                          index < confirmPasscode.length
                            ? 'bg-orange-600 border-orange-600'
                            : 'border-amber-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {renderNumberPad()}
                {confirmPasscode.length === 4 && (
                  <Button
                    onClick={handleConfirmPasscode}
                    className="w-full cave-button mt-6"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Confirm
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasscodeSetup;
