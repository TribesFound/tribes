
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find your Tribe",
      description: "Connect with like-minded people who share your passions and interests",
      image: "🏕️"
    },
    {
      title: "Connect through shared passions",
      description: "Discover meaningful connections based on hobbies, interests, and shared experiences",
      image: "🤝"
    },
    {
      title: "No dating. No filters. Only shared vibes.",
      description: "Build genuine friendships and communities without the pressure of dating apps",
      image: "✨"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/signup-method');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen tribal-gradient p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold tribal-font text-white">Welcome to Tribes</h1>
        </div>

        <Card className="tribal-card mb-8 min-h-[400px]">
          <CardContent className="p-8 text-center flex flex-col justify-center">
            <div className="text-6xl mb-6">{slides[currentSlide].image}</div>
            <h2 className="text-2xl font-bold tribal-font text-amber-900 mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg text-amber-800 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-orange-500 w-8' : 'bg-orange-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>

          <Button
            onClick={nextSlide}
            className="tribal-button px-8"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            {currentSlide < slides.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
