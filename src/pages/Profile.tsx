
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Crown, Shield, Heart, MessageCircle, Camera, MapPin, Languages, Users, Wine, Cigarette, UtensilsCrossed, Star, Eye, Sparkles, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SocialMediaConnect from '@/components/SocialMediaConnect';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState({
    name: 'Jordan Smith',
    age: 26,
    location: 'San Francisco, CA',
    bio: 'Adventure seeker and tech enthusiast. Love capturing moments through photography and exploring new places. Always looking for new trails to hike and people to share experiences with.',
    lookingFor: 'Meaningful connections and outdoor adventure partners',
    hobbies: ['Photography', 'Hiking', 'Cooking', 'Reading', 'Yoga'],
    passions: ['Technology', 'Travel', 'Art', 'Science', 'Environment'],
    languages: ['English', 'Spanish', 'French'],
    pets: ['Dog', 'Cat'],
    hasPets: true,
    drinkPreference: 'Socially',
    smokePreference: 'No',
    dietaryPreference: 'Vegetarian',
    zodiacSign: 'Leo',
    humanDesign: 'Generator',
    mayanDreamspell: 'Blue Night',
    instagramConnected: true,
    instagramUsername: '@jordan_adventures',
    spotifyConnected: true,
    websiteUrl: 'https://jordansmith.com',
    avatar: '/placeholder.svg',
    additionalPhotos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    isPro: true,
    isBusinessProfile: true,
    allowDiscussionChat: true,
    matchCount: 12,
    friendCount: 8,
    verifiedEmail: 'jordan@example.com',
    locationShared: true
  });

  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (file: File) => {
    if (!file) return;
    
    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Photo uploaded successfully!",
        description: "Your profile photo has been updated.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleInstagramConnect = () => {
    setUser(prev => ({ ...prev, instagramConnected: true, instagramUsername: '@jordan_adventures' }));
  };

  const handleSpotifyConnect = () => {
    setUser(prev => ({ ...prev, spotifyConnected: true }));
  };

  const handleWebsiteUpdate = (url: string) => {
    setUser(prev => ({ ...prev, websiteUrl: url }));
  };

  const handleInstagramDisconnect = () => {
    setUser(prev => ({ ...prev, instagramConnected: false, instagramUsername: '' }));
  };

  const handleSpotifyDisconnect = () => {
    setUser(prev => ({ ...prev, spotifyConnected: false }));
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="text-center text-white mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
          </div>
          <h1 className="text-3xl font-bold tribal-font">Your Tribe Profile</h1>
        </div>

        <Card className="tribal-card">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-orange-200">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white text-3xl tribal-font">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <Button
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 tribal-button"
                  disabled={uploading}
                >
                  {uploading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Camera className="w-5 h-5" />}
                </Button>
                
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold tribal-font text-amber-900">
                  {user.name}, {user.age}
                </h2>
                {user.isPro && <Crown className="w-6 h-6 text-yellow-500" />}
                {user.isBusinessProfile && (
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    Professional
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-center tribal-text mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{user.location}</span>
              </div>

              <div className="flex justify-center space-x-2 mb-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
                {user.locationShared && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <MapPin className="w-3 h-3 mr-1" />
                    Location Shared
                  </Badge>
                )}
              </div>
            </div>

            {/* Social Media & Professional Connections */}
            <div className="mb-6">
              <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900">Social Connections</h3>
              <SocialMediaConnect
                instagramConnected={user.instagramConnected}
                instagramUsername={user.instagramUsername}
                spotifyConnected={user.spotifyConnected}
                websiteUrl={user.websiteUrl}
                isBusinessProfile={user.isBusinessProfile}
                onInstagramConnect={handleInstagramConnect}
                onSpotifyConnect={handleSpotifyConnect}
                onWebsiteUpdate={handleWebsiteUpdate}
                onInstagramDisconnect={handleInstagramDisconnect}
                onSpotifyDisconnect={handleSpotifyDisconnect}
              />
            </div>

            {/* Business Profile Settings */}
            {user.isBusinessProfile && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-bold tribal-font text-lg mb-3 text-purple-800">Professional Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-purple-700">Allow Discussion Chat</Label>
                      <p className="text-xs text-purple-600">Let people chat about your events</p>
                    </div>
                    <Switch 
                      checked={user.allowDiscussionChat}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {user.additionalPhotos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900">Photos</h3>
                <div className="grid grid-cols-3 gap-2">
                  {user.additionalPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg ring-2 ring-orange-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center tribal-card p-4">
                <div className="text-2xl font-bold tribal-font text-orange-600">{user.matchCount}</div>
                <div className="text-sm tribal-text">Connections</div>
              </div>
              <div className="text-center tribal-card p-4">
                <div className="text-2xl font-bold tribal-font text-green-600">{user.friendCount}</div>
                <div className="text-sm tribal-text">Friends</div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Bio */}
              {user.bio && (
                <div>
                  <h3 className="font-bold tribal-font text-lg mb-2 text-amber-900">About Me</h3>
                  <p className="tribal-text text-sm leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              )}

              {/* Looking For */}
              {user.lookingFor && (
                <div>
                  <h3 className="font-bold tribal-font text-lg mb-2 text-amber-900">Looking For</h3>
                  <p className="tribal-text text-sm leading-relaxed">
                    {user.lookingFor}
                  </p>
                </div>
              )}

              {/* Hobbies */}
              <div>
                <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {user.hobbies.map((hobby) => (
                    <Badge key={hobby} className="tribal-badge">
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Passions */}
              <div>
                <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900">Passions</h3>
                <div className="flex flex-wrap gap-2">
                  {user.passions.map((passion) => (
                    <Badge key={passion} className="tribal-badge">
                      {passion}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              {user.languages.length > 0 && (
                <div>
                  <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900 flex items-center">
                    <Languages className="w-5 h-5 mr-2" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.languages.map((language) => (
                      <Badge key={language} className="tribal-badge bg-blue-100 text-blue-800 border-blue-200">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Pets */}
              {user.hasPets && user.pets.length > 0 && (
                <div>
                  <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Pets
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.pets.map((pet) => (
                      <Badge key={pet} className="tribal-badge bg-green-100 text-green-800 border-green-200">
                        {pet}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Lifestyle Preferences */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-3 tribal-card">
                  <div className="flex items-center space-x-2">
                    <Wine className="w-5 h-5 text-purple-600" />
                    <span className="tribal-text font-medium">Drinking</span>
                  </div>
                  <Badge className="tribal-badge bg-purple-100 text-purple-800 border-purple-200">
                    {user.drinkPreference}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 tribal-card">
                  <div className="flex items-center space-x-2">
                    <Cigarette className="w-5 h-5 text-gray-600" />
                    <span className="tribal-text font-medium">Smoking</span>
                  </div>
                  <Badge className="tribal-badge bg-gray-100 text-gray-800 border-gray-200">
                    {user.smokePreference}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 tribal-card">
                  <div className="flex items-center space-x-2">
                    <UtensilsCrossed className="w-5 h-5 text-green-600" />
                    <span className="tribal-text font-medium">Diet</span>
                  </div>
                  <Badge className="tribal-badge bg-green-100 text-green-800 border-green-200">
                    {user.dietaryPreference}
                  </Badge>
                </div>
              </div>

              {/* Spiritual & Personality */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-3 tribal-card">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="tribal-text font-medium">Zodiac</span>
                  </div>
                  <Badge className="tribal-badge bg-yellow-100 text-yellow-800 border-yellow-200">
                    {user.zodiacSign}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 tribal-card">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    <span className="tribal-text font-medium">Human Design</span>
                  </div>
                  <Badge className="tribal-badge bg-indigo-100 text-indigo-800 border-indigo-200">
                    {user.humanDesign}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 tribal-card">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                    <span className="tribal-text font-medium">Mayan Dreamspell</span>
                  </div>
                  <Badge className="tribal-badge bg-cyan-100 text-cyan-800 border-cyan-200">
                    {user.mayanDreamspell}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="space-y-4">
          {!user.isPro && (
            <Card className="tribal-card border-2 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold tribal-font flex items-center text-amber-900">
                      <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                      Upgrade to Pro
                    </h3>
                    <p className="text-sm tribal-text">
                      Access events and premium features
                    </p>
                  </div>
                  <Button className="tribal-button">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => navigate('/bonds')}
              className="tribal-card h-16 flex-col border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50" 
              variant="outline"
            >
              <MessageCircle className="w-6 h-6 mb-1 text-orange-600" />
              <span className="text-sm font-medium tribal-text">Messages</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/friends')}
              className="tribal-card h-16 flex-col border-2 border-green-200 hover:border-green-300 hover:bg-green-50" 
              variant="outline"
            >
              <Heart className="w-6 h-6 mb-1 text-green-600" />
              <span className="text-sm font-medium tribal-text">Friends</span>
            </Button>
          </div>

          <Button 
            onClick={() => navigate('/settings')}
            className="w-full tribal-card border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50" 
            variant="outline"
          >
            <Settings className="w-5 h-5 mr-2" />
            <span className="tribal-text">Account Settings</span>
          </Button>

          <Card className="tribal-card border-2 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-bold tribal-font text-amber-900">Community Standing</h3>
                    <p className="text-sm tribal-text">Good member • 0 strikes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
