
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, X, MapPin, Briefcase, Settings, Filter } from 'lucide-react';
import { testProfiles } from '@/utils/testProfiles';
import SwipeableCard from '@/components/SwipeableCard';
import MatchPopup from '@/components/MatchPopup';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import TestRunner from '@/components/TestRunner';

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [userBonds, setUserBonds] = useState<string[]>([]);
  const [matchPopup, setMatchPopup] = useState({
    isOpen: false,
    matchedProfile: null as any
  });
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  useEffect(() => {
    // Load user's bonds from localStorage
    const bonds = JSON.parse(localStorage.getItem('user_bonds') || '[]');
    setUserBonds(bonds);
  }, []);

  // Show diagnostics if user is not authenticated or if there are issues
  useEffect(() => {
    if (!isLoading && !user) {
      setShowDiagnostics(true);
    }
  }, [user, isLoading]);

  const currentProfile = testProfiles[currentProfileIndex];
  
  // Transform the profile to match SwipeableCard expectations
  const transformedProfile = currentProfile ? {
    ...currentProfile,
    photos: currentProfile.images // Map images to photos
  } : null;

  const handleSwipeLeft = () => {
    console.log('Swiped left on:', currentProfile?.name);
    moveToNextProfile();
  };

  const handleSwipeRight = () => {
    console.log('Swiped right on:', currentProfile?.name);
    
    // Create a match (since all test profiles "like" the user)
    const updatedBonds = [...userBonds, currentProfile.id];
    setUserBonds(updatedBonds);
    localStorage.setItem('user_bonds', JSON.stringify(updatedBonds));

    // Show match popup
    setMatchPopup({
      isOpen: true,
      matchedProfile: transformedProfile
    });

    moveToNextProfile();
  };

  const moveToNextProfile = () => {
    if (currentProfileIndex < testProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // Reset to beginning or show "no more profiles" message
      setCurrentProfileIndex(0);
      toast({
        title: "You've seen all profiles!",
        description: "Check back later for new members in your area.",
      });
    }
  };

  const handleMatchMessage = () => {
    if (matchPopup.matchedProfile) {
      navigate(`/chat/${matchPopup.matchedProfile.id}`);
    }
    setMatchPopup({ isOpen: false, matchedProfile: null });
  };

  const handleCloseMatchPopup = () => {
    setMatchPopup({ isOpen: false, matchedProfile: null });
  };

  // Show diagnostics overlay if needed
  if (showDiagnostics) {
    return (
      <div className="min-h-screen cave-gradient p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold cave-font text-white mb-4">
              🔧 System Diagnostics
            </h1>
            <p className="text-white/80">
              Running comprehensive system checks...
            </p>
          </div>
          
          <TestRunner />
          
          <div className="text-center mt-8">
            <Button
              onClick={() => navigate('/auth')}
              className="cave-button mr-4"
            >
              Go to Authentication
            </Button>
            <Button
              onClick={() => setShowDiagnostics(false)}
              variant="outline"
              className="cave-button-outline"
            >
              Hide Diagnostics
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your tribes...</p>
        </div>
      </div>
    );
  }

  if (!transformedProfile) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
        <Card className="cave-card">
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-amber-900 text-xl font-semibold mb-2 cave-font">
              No more profiles
            </h3>
            <p className="text-amber-700">
              Check back later for new members in your area!
            </p>
            <Button onClick={() => setCurrentProfileIndex(0)} className="cave-button mt-4">
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold cave-font text-white">Discover</h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-orange-200/20"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
              className="text-white hover:bg-orange-200/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* User Info Display */}
        {user && (
          <div className="mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-white text-sm">
              Welcome, {user.name} • {user.subscriptionTier} Tier
              {user.isVerified && ' • ✓ Verified'}
            </p>
          </div>
        )}

        {/* Swipeable Profile Card */}
        <div className="relative mb-8">
          <SwipeableCard
            profile={transformedProfile}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <Button
            onClick={handleSwipeLeft}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            <X className="w-8 h-8" />
          </Button>
          
          <Button
            onClick={handleSwipeRight}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>

        {/* Profile Counter */}
        <div className="text-center mt-6">
          <Badge className="cave-badge">
            {currentProfileIndex + 1} of {testProfiles.length}
          </Badge>
        </div>

        {/* Debug Controls */}
        <div className="text-center mt-4">
          <Button
            onClick={() => setShowDiagnostics(true)}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            Show Diagnostics
          </Button>
        </div>
      </div>

      {/* Match Popup */}
      <MatchPopup
        isOpen={matchPopup.isOpen}
        onClose={handleCloseMatchPopup}
        onMessage={handleMatchMessage}
        userPhoto="/placeholder.svg"
        matchPhoto={matchPopup.matchedProfile?.photos?.[0] || "/placeholder.svg"}
        matchName={matchPopup.matchedProfile?.name || ""}
        userName="You"
      />
    </div>
  );
};

export default Discover;
