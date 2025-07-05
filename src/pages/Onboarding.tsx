
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const hobbies = [
    'Photography', 'Reading', 'Cooking', 'Gaming', 'Hiking', 'Music',
    'Art', 'Sports', 'Dancing', 'Traveling', 'Gardening', 'Writing',
    'Fitness', 'Movies', 'Technology', 'Fashion', 'Yoga', 'Cycling'
  ];

  const passions = [
    'Environment', 'Education', 'Health', 'Technology', 'Arts', 'Social Justice',
    'Entrepreneurship', 'Volunteering', 'Mental Health', 'Innovation',
    'Community Building', 'Sustainability', 'Culture', 'Science', 'Adventure',
    'Personal Growth', 'Creativity', 'Leadership'
  ];

  const steps = ['Hobbies', 'Passions', 'Complete'];

  const toggleSelection = (item: string, type: 'hobbies' | 'passions') => {
    if (type === 'hobbies') {
      setSelectedHobbies(prev => 
        prev.includes(item) 
          ? prev.filter(h => h !== item)
          : [...prev, item]
      );
    } else {
      setSelectedPassions(prev => 
        prev.includes(item) 
          ? prev.filter(p => p !== item)
          : [...prev, item]
      );
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      // Scroll to top when moving to passions step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleComplete = () => {
    // Save preferences to localStorage
    localStorage.setItem('user_hobbies', JSON.stringify(selectedHobbies));
    localStorage.setItem('user_passions', JSON.stringify(selectedPassions));
    
    // Navigate to discover page
    navigate('/discover');
  };

  const canProceed = () => {
    if (currentStep === 0) return selectedHobbies.length >= 3;
    if (currentStep === 1) return selectedPassions.length >= 3;
    return true;
  };

  return (
    <div className="min-h-screen cave-gradient p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold cave-font text-white mb-2">
            Build Your Tribe
          </h1>
          <p className="text-orange-200">
            Help us find your perfect matches
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-orange-400 text-white' 
                  : 'bg-white/20 text-orange-200'
              }`}>
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < currentStep ? 'bg-orange-400' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card className="cave-card">
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div>
                <h2 className="text-2xl font-bold cave-font text-amber-900 mb-2">
                  Select Your Hobbies
                </h2>
                <p className="text-amber-700 mb-6">
                  Choose at least 3 hobbies that interest you
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {hobbies.map((hobby) => (
                    <Badge
                      key={hobby}
                      onClick={() => toggleSelection(hobby, 'hobbies')}
                      className={`cursor-pointer text-center p-3 transition-all ${
                        selectedHobbies.includes(hobby)
                          ? 'bg-orange-400 text-white hover:bg-orange-500'
                          : 'bg-orange-100 text-amber-900 hover:bg-orange-200'
                      }`}
                    >
                      {hobby}
                    </Badge>
                  ))}
                </div>

                <p className="text-amber-600 text-sm mb-4">
                  Selected: {selectedHobbies.length} / {hobbies.length}
                </p>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full cave-button"
                >
                  Next
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold cave-font text-amber-900 mb-2">
                  Select Your Passions
                </h2>
                <p className="text-amber-700 mb-6">
                  Choose at least 3 things you're passionate about
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {passions.map((passion) => (
                    <Badge
                      key={passion}
                      onClick={() => toggleSelection(passion, 'passions')}
                      className={`cursor-pointer text-center p-3 transition-all ${
                        selectedPassions.includes(passion)
                          ? 'bg-orange-400 text-white hover:bg-orange-500'
                          : 'bg-orange-100 text-amber-900 hover:bg-orange-200'
                      }`}
                    >
                      {passion}
                    </Badge>
                  ))}
                </div>

                <p className="text-amber-600 text-sm mb-4">
                  Selected: {selectedPassions.length} / {passions.length}
                </p>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full cave-button"
                >
                  Complete Setup
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold cave-font text-amber-900 mb-2">
                  You're All Set!
                </h2>
                <p className="text-amber-700 mb-6">
                  Time to discover your tribe and make meaningful connections
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-sm text-amber-600">
                    Hobbies: {selectedHobbies.length} selected
                  </p>
                  <p className="text-sm text-amber-600">
                    Passions: {selectedPassions.length} selected
                  </p>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full cave-button"
                >
                  Start Discovering
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
