
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, Chrome, MapPin, Shield } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  const handleEmailAuth = () => {
    console.log('Email authentication:', { email, password });
    // Firebase auth implementation will go here
  };

  const handlePhoneAuth = () => {
    console.log('Phone authentication:', phone);
    // Firebase SMS auth implementation will go here
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication');
    // Firebase Google auth implementation will go here
  };

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location granted:', position.coords);
          setLocationPermission(true);
        },
        (error) => {
          console.error('Location denied:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Tribes</h1>
          <p className="text-lg opacity-90">Connect through shared passions</p>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Join Tribes</CardTitle>
            <CardDescription className="text-white/80">
              Create meaningful connections based on your interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="email" className="data-[state=active]:bg-white/20">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-white/20">
                  <Phone className="w-4 h-4 mr-2" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="google" className="data-[state=active]:bg-white/20">
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Create a password"
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </TabsContent>

              <TabsContent value="google" className="space-y-4">
                <div className="text-center text-white/80 py-4">
                  <Chrome className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <p>Sign in with your Google account</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="location"
                  checked={locationPermission}
                  onChange={() => !locationPermission && requestLocationPermission()}
                  className="rounded"
                />
                <Label htmlFor="location" className="text-white text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Allow location access (required)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="terms" className="text-white text-sm flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  I am 18+ and agree to Terms & Community Pledge
                </Label>
              </div>

              <Button
                onClick={() => {
                  if (email) handleEmailAuth();
                  else if (phone) handlePhoneAuth();
                  else handleGoogleAuth();
                }}
                disabled={!acceptedTerms || !locationPermission}
                className="w-full bg-white text-purple-600 hover:bg-white/90 transition-colors"
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
