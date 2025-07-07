
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { Separator } from '@/components/ui/separator';

const SignUpMethod = () => {
  const navigate = useNavigate();

  const handleEmailSignup = () => {
    navigate('/auth');
  };

  const handlePhoneSignup = () => {
    navigate('/auth');
  };

  const handleGoogleSuccess = () => {
    navigate('/passcode-setup');
  };

  const handleGoogleError = (error: string) => {
    console.error('Google auth error:', error);
  };

  return (
    <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center text-white mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold cave-font mb-2">Join Your Tribe</h1>
          <p className="text-lg opacity-90">Choose how you'd like to sign up</p>
        </div>

        <Card className="cave-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl cave-font text-amber-900">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleSignInButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            <div className="relative">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-amber-700">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleEmailSignup}
              className="w-full cave-button h-16 flex items-center justify-center space-x-3"
            >
              <Mail className="w-6 h-6" />
              <span className="text-lg">Sign up with Email</span>
            </Button>

            <Button
              onClick={handlePhoneSignup}
              className="w-full cave-button h-16 flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span className="text-lg">Sign up with Phone</span>
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
