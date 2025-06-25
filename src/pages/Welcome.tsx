
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Cave painting style glyphs for welcome slides
const TribeGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="30" cy="25" r="8"/>
    <circle cx="70" cy="25" r="8"/>
    <circle cx="50" cy="50" r="8"/>
    <path d="M30 35v20M70 35v20M50 60v15"/>
    <path d="M20 55h20M60 55h20"/>
    <path d="M30 75h40"/>
    <circle cx="30" cy="25" r="2" fill="currentColor"/>
    <circle cx="70" cy="25" r="2" fill="currentColor"/>
    <circle cx="50" cy="50" r="2" fill="currentColor"/>
  </svg>
);

const HandshakeGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 40h25l10 10 10-10h25"/>
    <path d="M30 30v20M70 30v20"/>
    <path d="M45 45l10 5 10-5"/>
    <circle cx="30" cy="25" r="3" fill="currentColor"/>
    <circle cx="70" cy="25" r="3" fill="currentColor"/>
    <path d="M25 55c5 10 15 15 25 15s20-5 25-15"/>
  </svg>
);

const CommunityGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="50" cy="50" r="35"/>
    <circle cx="35" cy="35" r="5"/>
    <circle cx="65" cy="35" r="5"/>
    <circle cx="35" cy="65" r="5"/>
    <circle cx="65" cy="65" r="5"/>
    <circle cx="50" cy="25" r="5"/>
    <circle cx="25" cy="50" r="5"/>
    <circle cx="75" cy="50" r="5"/>
    <circle cx="50" cy="75" r="5"/>
    <path d="M50 50l-15-15M50 50l15-15M50 50l-15 15M50 50l15 15"/>
    <path d="M50 50v-25M50 50h-25M50 50h25M50 50v25"/>
    <circle cx="50" cy="50" r="3" fill="currentColor"/>
  </svg>
);

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find your Tribe",
      description: "Connect with like-minded people who share your passions and interests",
      glyph: TribeGlyph
    },
    {
      title: "Connect through shared passions",
      description: "Discover meaningful connections based on hobbies, interests, and shared experiences",
      glyph: HandshakeGlyph
    },
    {
      title: "No dating. No filters. Only shared vibes.",
      description: "Build genuine friendships and communities without the pressure of dating apps",
      glyph: CommunityGlyph
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

  const CurrentGlyph = slides[currentSlide].glyph;

  return (
    <div className="min-h-screen cave-gradient p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold cave-font text-white">Welcome to Tribes</h1>
        </div>

        <Card className="cave-card mb-8 min-h-[400px]">
          <CardContent className="p-8 text-center flex flex-col justify-center">
            <div className="mb-6 flex justify-center">
              <CurrentGlyph className="w-24 h-24 text-amber-700" />
            </div>
            <h2 className="text-2xl font-bold cave-font text-amber-900 mb-4">
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
            className="cave-button px-8"
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
