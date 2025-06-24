
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Crown, Shield, Heart, MessageCircle, Calendar } from 'lucide-react';

const Profile = () => {
  const [user] = useState({
    name: 'Jordan Smith',
    age: 26,
    location: 'San Francisco, CA',
    hobbies: ['Photography', 'Hiking', 'Cooking', 'Reading'],
    interests: ['Technology', 'Travel', 'Art', 'Science'],
    bio: 'Adventure seeker and tech enthusiast. Love capturing moments through photography and exploring new places.',
    avatar: '/placeholder.svg',
    isPro: false,
    matchCount: 12,
    friendCount: 8
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 p-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="text-center text-white mb-8">
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-3xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h2 className="text-white text-2xl font-bold">
                  {user.name}, {user.age}
                </h2>
                {user.isPro && <Crown className="w-6 h-6 text-yellow-400" />}
              </div>
              
              <p className="text-white/70">{user.location}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-white text-2xl font-bold">{user.matchCount}</div>
                  <div className="text-white/70 text-sm">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-2xl font-bold">{user.friendCount}</div>
                  <div className="text-white/70 text-sm">Friends</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/90 text-sm leading-relaxed">
                  {user.bio}
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {user.hobbies.map((hobby) => (
                    <Badge
                      key={hobby}
                      className="bg-white/20 text-white border-white/20"
                    >
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-white/10 text-white border-white/20"
                    >
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
            <Card className="backdrop-blur-lg bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-300/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                      Upgrade to Pro
                    </h3>
                    <p className="text-white/70 text-sm">
                      Access events and premium features
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:from-orange-500 hover:to-pink-500">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 h-16 flex-col"
            >
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-sm">Messages</span>
            </Button>
            
            <Button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 h-16 flex-col"
            >
              <Heart className="w-6 h-6 mb-1" />
              <span className="text-sm">Favorites</span>
            </Button>
          </div>

          <Button
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </Button>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-white font-semibold">Community Standing</h3>
                    <p className="text-white/70 text-sm">Good member • 0 strikes</p>
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
