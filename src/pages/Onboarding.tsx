
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

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

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else if (selectedHobbies.length < 10) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(i => i !== passion));
    } else if (selectedPassions.length < 10) {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedHobbies.length >= 1) {
      setStep(2);
    } else if (step === 2 && selectedPassions.length >= 1) {
      console.log('Onboarding complete:', { selectedHobbies, selectedPassions });
      // Navigate to passcode setup or main app
      window.location.href = '/passcode-setup';
    }
  };

  return (
    <div className="min-h-screen cave-gradient p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold cave-font text-white">Join Your Tribe</h1>
        </div>

        <Card className="cave-card mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl cave-font text-amber-900">
              {step === 1 ? 'Choose Your Hobbies' : 'Select Your Passions'}
            </CardTitle>
            <p className="text-amber-800">
              {step === 1 
                ? `Select 1-10 hobbies that you enjoy (${selectedHobbies.length}/10)`
                : `Select 1-10 passions that fascinate you (${selectedPassions.length}/10)`
              }
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {(step === 1 ? hobbies : passions).map((item) => {
                const isSelected = step === 1 
                  ? selectedHobbies.includes(item)
                  : selectedPassions.includes(item);
                
                return (
                  <Badge
                    key={item}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center transition-all hover:scale-105 cave-font ${
                      isSelected 
                        ? 'cave-badge' 
                        : 'cave-badge-outline'
                    }`}
                    onClick={() => step === 1 ? toggleHobby(item) : togglePassion(item)}
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
                variant="ghost"
                className="cave-button-ghost"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && selectedHobbies.length === 0) ||
                  (step === 2 && selectedPassions.length === 0)
                }
                className="cave-button"
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
