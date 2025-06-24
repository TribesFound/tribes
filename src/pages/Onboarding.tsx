
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const hobbies = [
  'Photography', 'Hiking', 'Cooking', 'Reading', 'Gaming', 'Painting',
  'Music', 'Dancing', 'Cycling', 'Yoga', 'Gardening', 'Writing',
  'Traveling', 'Fitness', 'Meditation', 'Crafting', 'Chess', 'Board Games',
  'Rock Climbing', 'Swimming', 'Running', 'Skiing', 'Surfing', 'Fishing'
];

const interests = [
  'Technology', 'Science', 'History', 'Philosophy', 'Psychology', 'Politics',
  'Environment', 'Health', 'Business', 'Art', 'Literature', 'Movies',
  'TV Shows', 'Podcasts', 'Fashion', 'Food', 'Travel', 'Sports',
  'Spirituality', 'Personal Development', 'Languages', 'Culture', 'Nature', 'Space'
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else if (selectedHobbies.length < 10) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedHobbies.length >= 1) {
      setStep(2);
    } else if (step === 2 && selectedInterests.length >= 1) {
      console.log('Onboarding complete:', { selectedHobbies, selectedInterests });
      // Navigate to main app
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">
              {step === 1 ? 'Choose Your Hobbies' : 'Select Your Interests'}
            </CardTitle>
            <p className="text-white/80">
              {step === 1 
                ? `Select 1-10 hobbies that you enjoy (${selectedHobbies.length}/10)`
                : `Select 1-10 interests that fascinate you (${selectedInterests.length}/10)`
              }
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {(step === 1 ? hobbies : interests).map((item) => {
                const isSelected = step === 1 
                  ? selectedHobbies.includes(item)
                  : selectedInterests.includes(item);
                
                return (
                  <Badge
                    key={item}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center transition-all hover:scale-105 ${
                      isSelected 
                        ? 'bg-white text-purple-600 hover:bg-white/90' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                    onClick={() => step === 1 ? toggleHobby(item) : toggleInterest(item)}
                  >
                    {isSelected && <Check className="w-4 h-4 mr-2" />}
                    {item}
                  </Badge>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setStep(1)}
                disabled={step === 1}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && selectedHobbies.length === 0) ||
                  (step === 2 && selectedInterests.length === 0)
                }
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                {step === 2 ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
