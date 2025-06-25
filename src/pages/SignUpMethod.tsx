
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Chrome } from 'lucide-react';

const SignUpMethod = () => {
  const navigate = useNavigate();

  const handleEmailSignup = () => {
    navigate('/auth');
  };

  const handlePhoneSignup = () => {
    navigate('/auth');
  };

  const handleGoogleSignup = () => {
    // Simulate Google OAuth
    console.log('Google signup initiated');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen tribal-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center text-white mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold tribal-font mb-2">Join Your Tribe</h1>
          <p className="text-lg opacity-90">Choose how you'd like to sign up</p>
        </div>

        <Card className="tribal-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl tribal-font text-amber-900">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleSignup}
              className="w-full tribal-button bg-white text-amber-900 border-2 border-orange-300 hover:bg-orange-50"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>

            <Button
              onClick={handleEmailSignup}
              className="w-full tribal-button"
            >
              <Mail className="w-5 h-5 mr-3" />
              Sign up with Email
            </Button>

            <Button
              onClick={handlePhoneSignup}
              className="w-full tribal-button"
            >
              <Phone className="w-5 h-5 mr-3" />
              Sign up with Phone
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-amber-700 mb-2">
                Already have an account?
              </p>
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpMethod;
