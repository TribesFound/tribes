
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, X, MapPin, Calendar, MessageCircle, Camera } from 'lucide-react';

const sampleProfiles = [
  {
    id: 1,
    name: 'Alex Chen',
    age: 24,
    location: 'San Francisco, CA',
    distance: '2 miles',
    hobbies: ['Photography', 'Hiking', 'Cooking'],
    interests: ['Technology', 'Travel', 'Art'],
    bio: 'Love exploring the city with my camera and finding new hiking trails. Always down for trying new restaurants and meeting fellow adventurers!',
    photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
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
    bio: 'Sci-fi enthusiast and board game collector. Looking for someone to explore museums and try new games with. Always up for deep conversations!',
    photos: ['/placeholder.svg', '/placeholder.svg'],
    avatar: '/placeholder.svg'
  }
];

const Discover = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const currentProfile = sampleProfiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatches([...matches, currentProfile.id]);
      console.log('Liked profile:', currentProfile.id);
    } else {
      console.log('Passed on profile:', currentProfile.id);
    }

    setCurrentPhotoIndex(0);
    if (currentProfileIndex < sampleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  const nextPhoto = () => {
    const totalPhotos = [currentProfile.avatar, ...currentProfile.photos].filter(Boolean);
    setCurrentPhotoIndex((prev) => (prev + 1) % totalPhotos.length);
  };

  const prevPhoto = () => {
    const totalPhotos = [currentProfile.avatar, ...currentProfile.photos].filter(Boolean);
    setCurrentPhotoIndex((prev) => (prev - 1 + totalPhotos.length) % totalPhotos.length);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen tribal-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold tribal-font mb-4">No more profiles</h2>
          <p className="text-lg">Check back later for new tribe members!</p>
        </div>
      </div>
    );
  }

  const allPhotos = [currentProfile.avatar, ...currentProfile.photos].filter(Boolean);
  const currentPhoto = allPhotos[currentPhotoIndex];

  return (
    <div className="min-h-screen tribal-gradient p-4">
      <div className="max-w-sm mx-auto pt-8 space-y-6">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold tribal-font mb-2">Discover</h1>
          <p className="text-lg opacity-90">Find Your Tribe</p>
        </div>

        <Card className="tribal-card overflow-hidden animate-scale-in">
          <CardContent className="p-0">
            <div className="relative">
              <div className="h-96 bg-gradient-to-b from-transparent to-black/50 flex items-end p-6 relative overflow-hidden">
                <img 
                  src={currentPhoto} 
                  alt={currentProfile.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Photo navigation */}
                {allPhotos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
                    >
                      ›
                    </button>
                    
                    {/* Photo indicators */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {allPhotos.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <div className="relative z-10 text-white">
                  <h2 className="text-2xl font-bold tribal-font mb-1">
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
              {currentProfile.bio && (
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {currentProfile.bio}
                </p>
              )}

              <div>
                <h3 className="font-bold tribal-font text-lg mb-3 text-orange-700">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.hobbies.map((hobby) => (
                    <Badge
                      key={hobby}
                      className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 font-medium"
                    >
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold tribal-font text-lg mb-3 text-green-700">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 font-medium"
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
            className="w-16 h-16 rounded-full bg-white hover:bg-gray-50 border-2 border-red-200 hover:border-red-300 transition-all transform hover:scale-105"
            variant="outline"
          >
            <X className="w-8 h-8 text-red-500" />
          </Button>
          
          <Button
            onClick={() => handleSwipe('right')}
            size="lg"
            className="w-16 h-16 rounded-full tribal-button transform hover:scale-105 transition-all"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>

        {matches.length > 0 && (
          <div className="text-center">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 px-4 py-2">
              <MessageCircle className="w-4 h-4 mr-2" />
              {matches.length} new tribe connection{matches.length > 1 ? 's' : ''}!
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
