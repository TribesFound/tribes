
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Crown, Shield, Heart, MessageCircle, Calendar, Camera, MapPin } from 'lucide-react';

const Profile = () => {
  const [user] = useState({
    name: 'Jordan Smith',
    age: 26,
    location: 'San Francisco, CA',
    hobbies: ['Photography', 'Hiking', 'Cooking', 'Reading'],
    interests: ['Technology', 'Travel', 'Art', 'Science'],
    bio: 'Adventure seeker and tech enthusiast. Love capturing moments through photography and exploring new places. Always looking for new trails to hike and people to share experiences with.',
    avatar: '/placeholder.svg',
    additionalPhotos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    isPro: false,
    matchCount: 12,
    friendCount: 8,
    verifiedEmail: 'jordan@example.com'
  });

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="text-center text-amber-900 mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
          </div>
          <h1 className="text-3xl font-bold cave-font">Your Tribe Profile</h1>
        </div>

        <Card className="cave-card">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-orange-200">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white text-3xl cave-font">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold cave-font text-amber-900">
                  {user.name}, {user.age}
                </h2>
                {user.isPro && <Crown className="w-6 h-6 text-yellow-500" />}
              </div>
              
              <div className="flex items-center justify-center cave-text mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{user.location}</span>
              </div>

              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>

            {/* Photo Gallery */}
            {user.additionalPhotos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold cave-font text-lg mb-3 text-amber-900">Photos</h3>
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

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center cave-card p-4">
                  <div className="text-2xl font-bold cave-font text-orange-600">{user.matchCount}</div>
                  <div className="text-sm cave-text">Connections</div>
                </div>
                <div className="text-center cave-card p-4">
                  <div className="text-2xl font-bold cave-font text-green-600">{user.friendCount}</div>
                  <div className="text-sm cave-text">Friends</div>
                </div>
              </div>

              {user.bio && (
                <div>
                  <h3 className="font-bold cave-font text-lg mb-2 text-amber-900">About Me</h3>
                  <p className="cave-text text-sm leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-bold cave-font text-lg mb-3 text-amber-900">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {user.hobbies.map((hobby) => (
                    <Badge key={hobby} className="cave-badge">
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold cave-font text-lg mb-3 text-amber-900">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} className="cave-badge">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {!user.isPro && (
            <Card className="cave-card border-2 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold cave-font flex items-center text-amber-900">
                      <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                      Upgrade to Pro
                    </h3>
                    <p className="text-sm cave-text">
                      Access events and premium features
                    </p>
                  </div>
                  <Button className="cave-button">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button className="cave-card h-16 flex-col border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50" variant="outline">
              <MessageCircle className="w-6 h-6 mb-1 text-orange-600" />
              <span className="text-sm font-medium cave-text">Messages</span>
            </Button>
            
            <Button className="cave-card h-16 flex-col border-2 border-green-200 hover:border-green-300 hover:bg-green-50" variant="outline">
              <Heart className="w-6 h-6 mb-1 text-green-600" />
              <span className="text-sm font-medium cave-text">Favorites</span>
            </Button>
          </div>

          <Button className="w-full cave-card border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50" variant="outline">
            <Settings className="w-5 h-5 mr-2" />
            <span className="cave-text">Account Settings</span>
          </Button>

          <Card className="cave-card border-2 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-bold cave-font text-amber-900">Community Standing</h3>
                    <p className="text-sm cave-text">Good member • 0 strikes</p>
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
