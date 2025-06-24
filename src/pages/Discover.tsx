
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, X, MapPin, Calendar, MessageCircle } from 'lucide-react';

const sampleProfiles = [
  {
    id: 1,
    name: 'Alex Chen',
    age: 24,
    location: 'San Francisco, CA',
    distance: '2 miles',
    hobbies: ['Photography', 'Hiking', 'Cooking'],
    interests: ['Technology', 'Travel', 'Art'],
    bio: 'Love exploring the city with my camera and finding new hiking trails. Always down for trying new restaurants!',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Sam Rodriguez',
    age: 28,
    location: 'San Francisco, CA',
    distance: '5 miles',
    hobbies: ['Gaming', 'Reading', 'Board Games'],
    interests: ['Science', 'Movies', 'History'],
    bio: 'Sci-fi enthusiast and board game collector. Looking for someone to explore museums and try new games with.',
    avatar: '/placeholder.svg'
  }
];

const Discover = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);

  const currentProfile = sampleProfiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatches([...matches, currentProfile.id]);
      console.log('Liked profile:', currentProfile.id);
    } else {
      console.log('Passed on profile:', currentProfile.id);
    }

    if (currentProfileIndex < sampleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">No more profiles</h2>
          <p>Check back later for new connections!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 p-4">
      <div className="max-w-sm mx-auto pt-8 space-y-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Discover</h1>
          <p className="opacity-90">Find your tribe</p>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 overflow-hidden animate-scale-in">
          <CardContent className="p-0">
            <div className="relative">
              <div className="h-96 bg-gradient-to-b from-transparent to-black/50 flex items-end p-6">
                <Avatar className="w-full h-full absolute inset-0 rounded-none">
                  <AvatarImage src={currentProfile.avatar} />
                  <AvatarFallback className="text-6xl bg-gradient-to-br from-purple-400 to-pink-400 rounded-none">
                    {currentProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="relative z-10 text-white">
                  <h2 className="text-2xl font-bold mb-1">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center text-sm opacity-90 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentProfile.distance}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-white/90 text-sm leading-relaxed">
                {currentProfile.bio}
              </p>

              <div>
                <h3 className="text-white font-semibold mb-2">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.hobbies.map((hobby) => (
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
                  {currentProfile.interests.map((interest) => (
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

        <div className="flex justify-center space-x-8">
          <Button
            onClick={() => handleSwipe('left')}
            size="lg"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/30"
          >
            <X className="w-8 h-8 text-white" />
          </Button>
          
          <Button
            onClick={() => handleSwipe('right')}
            size="lg"
            className="w-16 h-16 rounded-full bg-white hover:bg-white/90 text-purple-600"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>

        {matches.length > 0 && (
          <div className="text-center">
            <Badge className="bg-white text-purple-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              {matches.length} new matches!
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
