import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { MapPin, Heart, X, Filter, Search, Settings, Sparkles } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CompatibilityScore from '@/components/CompatibilityScore';
import { matchingAlgorithm, UserProfile } from '@/utils/matchingAlgorithm';

const hobbies = [
  'Photography', 'Hiking', 'Cooking', 'Reading', 'Gaming', 'Painting',
  'Music', 'Dancing', 'Cycling', 'Yoga', 'Gardening', 'Writing',
  'Traveling', 'Fitness', 'Meditation', 'Crafting', 'Chess', 'Board Games',
  'Rock Climbing', 'Swimming', 'Running', 'Skiing', 'Surfing', 'Fishing',
  'Musician', 'Music Production', 'VJ', 'DJ', 'Fire Performer', 'Theater',
  'Performing Arts', 'Scuba Diving', 'Free Diving', 'Foraging'
];

const passions = [
  'Technology', 'Science', 'History', 'Philosophy', 'Psychology', 'Politics',
  'Environment', 'Health', 'Business', 'Art', 'Literature', 'Movies',
  'TV Shows', 'Podcasts', 'Fashion', 'Food', 'Travel', 'Sports',
  'Spirituality', 'Personal Development', 'Languages', 'Culture', 'Nature', 'Space',
  'Van Life', 'Sustainable Living', 'Festivals', 'Community', 'Permaculture',
  'Animals', 'Off Grid Living'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish',
  'Norwegian', 'Danish', 'Finnish', 'Greek', 'Turkish', 'Polish'
];

const dietaryPreferences = [
  'Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo',
  'Gluten-Free', 'Dairy-Free', 'Raw Food', 'Mediterranean'
];

// Enhanced mock users with personality and lifestyle data
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    distance: 2,
    bio: 'Love hiking and photography. Always looking for new adventures!',
    hobbies: ['Photography', 'Hiking', 'Cooking'],
    passions: ['Travel', 'Nature', 'Art'],
    languages: ['English', 'Spanish'],
    dietaryPreference: 'vegetarian',
    avatar: '/placeholder.svg',
    photos: ['/placeholder.svg', '/placeholder.svg'],
    personality: {
      extroversion: 7,
      openness: 9,
      conscientiousness: 8,
      agreeableness: 8,
      neuroticism: 3
    },
    lifestyle: {
      fitnessLevel: 8,
      socialLevel: 7,
      adventureLevel: 9,
      creativityLevel: 8
    }
  },
  {
    id: '2',
    name: 'Marcus',
    age: 32,
    distance: 5,
    bio: 'Tech enthusiast and weekend warrior. Coffee lover ☕',
    hobbies: ['Gaming', 'Cycling', 'Reading'],
    passions: ['Technology', 'Business', 'Science'],
    languages: ['English'],
    dietaryPreference: 'omnivore',
    avatar: '/placeholder.svg',
    photos: ['/placeholder.svg'],
    personality: {
      extroversion: 6,
      openness: 8,
      conscientiousness: 9,
      agreeableness: 7,
      neuroticism: 4
    },
    lifestyle: {
      fitnessLevel: 7,
      socialLevel: 6,
      adventureLevel: 6,
      creativityLevel: 7
    }
  },
  {
    id: '3',
    name: 'Elena',
    age: 26,
    distance: 8,
    bio: 'Artist and yoga instructor. Seeking genuine connections 🧘‍♀️',
    hobbies: ['Yoga', 'Painting', 'Meditation', 'Dancing'],
    passions: ['Art', 'Spirituality', 'Health', 'Nature'],
    languages: ['English', 'Italian', 'Spanish'],
    dietaryPreference: 'vegan',
    avatar: '/placeholder.svg',
    photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    personality: {
      extroversion: 5,
      openness: 10,
      conscientiousness: 7,
      agreeableness: 9,
      neuroticism: 2
    },
    lifestyle: {
      fitnessLevel: 9,
      socialLevel: 8,
      adventureLevel: 7,
      creativityLevel: 10
    }
  }
];

// Current user profile (this would normally come from auth context)
const currentUserProfile: UserProfile = {
  id: 'current-user',
  name: 'You',
  age: 29,
  bio: 'Looking for meaningful connections',
  hobbies: ['Photography', 'Hiking', 'Reading'],
  passions: ['Travel', 'Technology', 'Art'],
  languages: ['English'],
  dietaryPreference: 'vegetarian',
  avatar: '/placeholder.svg',
  photos: [],
  personality: {
    extroversion: 6,
    openness: 8,
    conscientiousness: 7,
    agreeableness: 8,
    neuroticism: 4
  },
  lifestyle: {
    fitnessLevel: 7,
    socialLevel: 7,
    adventureLevel: 8,
    creativityLevel: 6
  },
  preferences: {
    ageRange: [22, 35],
    maxDistance: 50,
    importanceWeights: {
      hobbies: 0.25,
      passions: 0.3,
      languages: 0.1,
      personality: 0.2,
      lifestyle: 0.1,
      dietary: 0.05
    }
  }
};

const Discover = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [distanceRange, setDistanceRange] = useState([100]);
  const [ageRange, setAgeRange] = useState([18, 100]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [showNoMatches, setShowNoMatches] = useState(false);
  const [rankedUsers, setRankedUsers] = useState<(UserProfile & { compatibility: any })[]>([]);
  const [showCompatibilityDetails, setShowCompatibilityDetails] = useState(false);

  // Load saved filters on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('tribes_discovery_filters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      setDistanceRange(filters.distance || [100]);
      setAgeRange(filters.ageRange || [18, 100]);
      setSelectedHobbies(filters.hobbies || []);
      setSelectedPassions(filters.passions || []);
      setSelectedLanguages(filters.languages || []);
      setSelectedDietary(filters.dietary || []);
    }
  }, []);

  // Calculate compatibility and rank users
  useEffect(() => {
    const ranked = matchingAlgorithm.rankUsers(currentUserProfile, mockUsers);
    setRankedUsers(ranked);
    console.log('Ranked users by compatibility:', ranked);
  }, []);

  // Save filters whenever they change
  useEffect(() => {
    const filters = {
      distance: distanceRange,
      ageRange,
      hobbies: selectedHobbies,
      passions: selectedPassions,
      languages: selectedLanguages,
      dietary: selectedDietary
    };
    localStorage.setItem('tribes_discovery_filters', JSON.stringify(filters));
  }, [distanceRange, ageRange, selectedHobbies, selectedPassions, selectedLanguages, selectedDietary]);

  const currentUser = rankedUsers[currentUserIndex];

  const handlePass = () => {
    setCurrentUserIndex((prev) => (prev + 1) % rankedUsers.length);
  };

  const handleLike = () => {
    if (currentUser) {
      console.log(`Liked ${currentUser.name} with ${Math.round(currentUser.compatibility.overall * 100)}% compatibility`);
    }
    setCurrentUserIndex((prev) => (prev + 1) % rankedUsers.length);
  };

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else if (selectedHobbies.length < 5) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else if (selectedPassions.length < 5) {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const toggleDietary = (dietary: string) => {
    if (selectedDietary.includes(dietary)) {
      setSelectedDietary(selectedDietary.filter(d => d !== dietary));
    } else {
      setSelectedDietary([...selectedDietary, dietary]);
    }
  };

  const applyFilters = () => {
    console.log('Applying filters:', {
      distance: distanceRange[0],
      ageRange,
      hobbies: selectedHobbies,
      passions: selectedPassions,
      languages: selectedLanguages,
      dietary: selectedDietary
    });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setDistanceRange([100]);
    setAgeRange([18, 100]);
    setSelectedHobbies([]);
    setSelectedPassions([]);
    setSelectedLanguages([]);
    setSelectedDietary([]);
  };

  if (!currentUser && !showNoMatches) {
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
          <p className="cave-text mb-4">No one matches your current filters.</p>
          <Button
            onClick={() => setShowNoMatches(true)}
            className="cave-button mb-2"
          >
            Show people with different interests
          </Button>
          <Button
            onClick={() => setShowFilters(true)}
            variant="outline"
            className="cave-button-outline"
          >
            Adjust Filters
          </Button>
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
              variant="ghost"
              className="cave-button-ghost p-2"
              onClick={() => setShowCompatibilityDetails(!showCompatibilityDetails)}
            >
              <Sparkles className="w-5 h-5" />
            </Button>
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="cave-button-ghost p-2">
                  <Filter className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="cave-card w-full max-w-md">
                <SheetHeader>
                  <SheetTitle className="cave-font text-amber-900">Discovery Filters</SheetTitle>
                  <SheetDescription className="cave-text">
                    Customize your tribe discovery preferences
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Distance Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Distance: {distanceRange[0]} km
                    </label>
                    <Slider
                      value={distanceRange}
                      onValueChange={setDistanceRange}
                      max={100}
                      min={1}
                      step={1}
                      className="cave-slider"
                    />
                  </div>

                  {/* Age Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Age: {ageRange[0]} - {ageRange[1]} years
                    </label>
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      max={100}
                      min={18}
                      step={1}
                      className="cave-slider"
                    />
                  </div>

                  {/* Hobbies Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Hobbies (max 5): {selectedHobbies.length}/5
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {hobbies.slice(0, 12).map((hobby) => (
                        <Badge
                          key={hobby}
                          variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                          className={`cursor-pointer text-xs p-2 transition-all ${
                            selectedHobbies.includes(hobby)
                              ? 'cave-badge'
                              : 'cave-badge-outline'
                          } ${selectedHobbies.length >= 5 && !selectedHobbies.includes(hobby) ? 'opacity-50' : ''}`}
                          onClick={() => toggleHobby(hobby)}
                        >
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Passions Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Passions (max 5): {selectedPassions.length}/5
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {passions.slice(0, 12).map((passion) => (
                        <Badge
                          key={passion}
                          variant={selectedPassions.includes(passion) ? "default" : "outline"}
                          className={`cursor-pointer text-xs p-2 transition-all ${
                            selectedPassions.includes(passion)
                              ? 'cave-badge'
                              : 'cave-badge-outline'
                          } ${selectedPassions.length >= 5 && !selectedPassions.includes(passion) ? 'opacity-50' : ''}`}
                          onClick={() => togglePassion(passion)}
                        >
                          {passion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Languages: {selectedLanguages.length} selected
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto">
                      {languages.slice(0, 10).map((language) => (
                        <Badge
                          key={language}
                          variant={selectedLanguages.includes(language) ? "default" : "outline"}
                          className={`cursor-pointer text-xs p-2 transition-all ${
                            selectedLanguages.includes(language)
                              ? 'cave-badge'
                              : 'cave-badge-outline'
                          }`}
                          onClick={() => toggleLanguage(language)}
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Dietary: {selectedDietary.length} selected
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {dietaryPreferences.map((dietary) => (
                        <Badge
                          key={dietary}
                          variant={selectedDietary.includes(dietary) ? "default" : "outline"}
                          className={`cursor-pointer text-xs p-2 transition-all ${
                            selectedDietary.includes(dietary)
                              ? 'cave-badge'
                              : 'cave-badge-outline'
                          }`}
                          onClick={() => toggleDietary(dietary)}
                        >
                          {dietary}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="flex-1 cave-button-outline"
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={applyFilters}
                      className="flex-1 cave-button"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Compatibility Score */}
        {currentUser && showCompatibilityDetails && (
          <div className="mb-4">
            <CompatibilityScore 
              score={currentUser.compatibility} 
              showDetails={true}
            />
          </div>
        )}

        {/* User Card */}
        {currentUser && (
          <Card className="cave-card mb-6 overflow-hidden">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 rounded-full px-3 py-1 flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-amber-900">
                    {Math.round(currentUser.compatibility.overall * 100)}%
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-end justify-between text-white">
                  <div>
                    <h2 className="text-3xl font-bold cave-font">
                      {currentUser.name}, {currentUser.age}
                    </h2>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm cave-text text-white">{currentUser.distance} km away</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              {/* Compatibility preview */}
              {!showCompatibilityDetails && (
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold cave-font text-amber-900">
                      {Math.round(currentUser.compatibility.overall * 100)}% Match
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCompatibilityDetails(true)}
                      className="text-xs cave-button-ghost"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                  </div>
                  <p className="text-xs cave-text text-amber-700">
                    {currentUser.compatibility.reasons[0]}
                  </p>
                </div>
              )}

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
                <h3 className="font-bold cave-font text-amber-900 mb-2">Passions</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.passions.map((passion) => (
                    <Badge key={passion} className="cave-badge">
                      {passion}
                    </Badge>
                  ))}
                </div>
              </div>

              {currentUser.languages.length > 0 && (
                <div>
                  <h3 className="font-bold cave-font text-amber-900 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.languages.map((language) => (
                      <Badge key={language} className="cave-badge-outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

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
        )}

        {/* Action Buttons */}
        {currentUser && (
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
        )}
      </div>
    </div>
  );
};

export default Discover;
