
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Heart, X, Filter, Search } from 'lucide-react';

const mockUsers = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    distance: '2 km away',
    bio: 'Love hiking and photography. Always looking for new adventures!',
    hobbies: ['Photography', 'Hiking', 'Cooking'],
    interests: ['Travel', 'Nature', 'Art'],
    avatar: '/placeholder.svg',
    photos: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 2,
    name: 'Marcus',
    age: 32,
    distance: '5 km away',
    bio: 'Tech enthusiast and weekend warrior. Coffee lover ☕',
    hobbies: ['Gaming', 'Cycling', 'Reading'],
    interests: ['Technology', 'Business', 'Science'],
    avatar: '/placeholder.svg',
    photos: ['/placeholder.svg']
  }
];

const Discover = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const currentUser = mockUsers[currentUserIndex];

  const handlePass = () => {
    setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length);
  };

  const handleLike = () => {
    console.log(`Liked ${currentUser.name}`);
    setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center pb-20">
        <div className="text-center text-amber-900">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-2xl font-bold cave-font mb-2">No More Profiles</h2>
          <p className="cave-text">Check back later for new tribe members!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold cave-font text-amber-900">Discover</h1>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="ghost"
              className="cave-button-ghost p-2"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="cave-button-ghost p-2">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* User Card */}
        <Card className="cave-card mb-6 overflow-hidden">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-end justify-between text-white">
                <div>
                  <h2 className="text-3xl font-bold cave-font">
                    {currentUser.name}, {currentUser.age}
                  </h2>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm cave-text text-white">{currentUser.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            {currentUser.bio && (
              <p className="cave-text text-amber-800">{currentUser.bio}</p>
            )}

            <div>
              <h3 className="font-bold cave-font text-amber-900 mb-2">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.hobbies.map((hobby) => (
                  <Badge key={hobby} className="cave-badge">
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold cave-font text-amber-900 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest) => (
                  <Badge key={interest} className="cave-badge">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {currentUser.photos.length > 0 && (
              <div>
                <h3 className="font-bold cave-font text-amber-900 mb-2">More Photos</h3>
                <div className="grid grid-cols-3 gap-2">
                  {currentUser.photos.map((photo, index) => (
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
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8">
          <Button
            onClick={handlePass}
            className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
            variant="outline"
          >
            <X className="w-8 h-8 text-gray-600" strokeWidth={2.5} />
          </Button>
          <Button
            onClick={handleLike}
            className="w-16 h-16 rounded-full cave-button"
          >
            <Heart className="w-8 h-8" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
