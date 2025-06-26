
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, X, AlertTriangle } from 'lucide-react';

interface PasscodeEntryProps {
  onSuccess: () => void;
  onForgotPasscode: () => void;
}

const PasscodeEntry = ({ onSuccess, onForgotPasscode }: PasscodeEntryProps) => {
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const savedPasscode = localStorage.getItem('tribes_passcode');

  const handleNumberInput = (number: string) => {
    if (enteredPasscode.length < 4) {
      const newPasscode = enteredPasscode + number;
      setEnteredPasscode(newPasscode);
      
      if (newPasscode.length === 4) {
        setTimeout(() => {
          if (newPasscode === savedPasscode) {
            onSuccess();
          } else {
            setError('Incorrect passcode');
            setAttempts(prev => prev + 1);
            setEnteredPasscode('');
            
            if (attempts >= 2) {
              setError('Too many attempts. Use "Forgot Passcode" option.');
            }
          }
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setEnteredPasscode(enteredPasscode.slice(0, -1));
    setError('');
  };

  const renderNumberPad = () => (
    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button
          key={num}
          onClick={() => handleNumberInput(num.toString())}
          className="cave-button aspect-square text-2xl font-bold"
          size="lg"
          disabled={attempts >= 3}
        >
          {num}
        </Button>
      ))}
      <div></div>
      <Button
        onClick={() => handleNumberInput('0')}
        className="cave-button aspect-square text-2xl font-bold"
        size="lg"
        disabled={attempts >= 3}
      >
        0
      </Button>
      <Button
        onClick={handleDelete}
        variant="outline"
        className="cave-button-outline aspect-square"
        size="lg"
        disabled={attempts >= 3}
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
          <h1 className="text-3xl font-bold cave-font text-white">Welcome Back</h1>
        </div>

        <Card className="cave-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl cave-font text-amber-900">
              Enter Passcode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <div className="flex justify-center space-x-4 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 ${
                      index < enteredPasscode.length
                        ? 'bg-orange-600 border-orange-600'
                        : 'border-amber-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {renderNumberPad()}

            <Button
              onClick={onForgotPasscode}
              variant="ghost"
              className="w-full cave-button-ghost mt-6"
              disabled={attempts < 3}
            >
              Forgot Passcode?
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasscodeEntry;
