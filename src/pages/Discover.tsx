import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, X, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SwipeableCard from '@/components/SwipeableCard';
import CompatibilityScoreComponent from '@/components/CompatibilityScore';
import { calculateCompatibilityScore } from '@/utils/matchingAlgorithm';
import { testProfiles, initializeTestProfiles, getTestProfiles } from '@/utils/testProfiles';

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUserId = 'current-user';

  useEffect(() => {
    // Initialize test profiles on first load
    initializeTestProfiles();
  }, []);

  const mockUsers = [
    ...getTestProfiles(), // Add test profiles first
    {
      id: '4',
      name: 'Maya Johnson',
      age: 27,
      location: 'Oakland, CA',
      images: ['/placeholder.svg'],
      interests: ['Art', 'Museums', 'Wine', 'Travel'],
      bio: 'Art curator with a passion for contemporary works and wine tasting.',
      distance: '5.2 km',
      mutualFriends: 2,
      hobbies: ['Art', 'Wine Tasting', 'Travel'],
      passions: ['Art', 'Culture', 'History'],
      languages: ['English', 'French'],
      lifestyle: {
        drinking: 'Socially',
        smoking: 'No',
        diet: 'Omnivore'
      }
    },
    {
      id: '5',
      name: 'Liam O\'Connell',
      age: 32,
      location: 'Berkeley, CA',
      images: ['/placeholder.svg'],
      interests: ['Hiking', 'Photography', 'Camping', 'Outdoors'],
      bio: 'Nature enthusiast and landscape photographer. Always seeking the next great view.',
      distance: '8.1 km',
      mutualFriends: 4,
      hobbies: ['Hiking', 'Photography', 'Camping'],
      passions: ['Nature', 'Travel', 'Adventure'],
      languages: ['English', 'Spanish'],
      lifestyle: {
        drinking: 'Occasionally',
        smoking: 'No',
        diet: 'Paleo'
      }
    },
    {
      id: '6',
      name: 'Ava Patel',
      age: 29,
      location: 'San Jose, CA',
      images: ['/placeholder.svg'],
      interests: ['Tech', 'Startups', 'Coding', 'Innovation'],
      bio: 'Software engineer and startup enthusiast. Passionate about building innovative solutions.',
      distance: '45.6 km',
      mutualFriends: 6,
      hobbies: ['Coding', 'Reading', 'Gaming'],
      passions: ['Technology', 'Startups', 'Innovation'],
      languages: ['English', 'Hindi'],
      lifestyle: {
        drinking: 'Never',
        smoking: 'No',
        diet: 'Vegetarian'
      }
    },
    {
      id: '7',
      name: 'Noah Kim',
      age: 26,
      location: 'Palo Alto, CA',
      images: ['/placeholder.svg'],
      interests: ['Music', 'Concerts', 'Festivals', 'Dancing'],
      bio: 'Music lover and concert-goer. Always looking for new artists and live music experiences.',
      distance: '32.2 km',
      mutualFriends: 3,
      hobbies: ['Music', 'Dancing', 'Travel'],
      passions: ['Music', 'Culture', 'Entertainment'],
      languages: ['English', 'Korean'],
      lifestyle: {
        drinking: 'Regularly',
        smoking: 'Socially',
        diet: 'Omnivore'
      }
    },
    {
      id: '8',
      name: 'Isabella Rodriguez',
      age: 31,
      location: 'San Francisco, CA',
      images: ['/placeholder.svg'],
      interests: ['Food', 'Cooking', 'Restaurants', 'Wine'],
      bio: 'Foodie and home cook. Always exploring new restaurants and experimenting with recipes.',
      distance: '1.5 km',
      mutualFriends: 5,
      hobbies: ['Cooking', 'Eating', 'Travel'],
      passions: ['Food', 'Culture', 'Community'],
      languages: ['English', 'Spanish'],
      lifestyle: {
        drinking: 'Socially',
        smoking: 'No',
        diet: 'Omnivore'
      }
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleSwipe = (direction: 'left' | 'right', userId: string) => {
    console.log(`Swiped ${direction} on user ${userId}`);

    if (direction === 'right') {
      // Simulate liking the user
      toast({
        title: "It's a Match!",
        description: "You and [Name] have liked each other!",
      });
    }

    // Move to the next user
    const newIndex = currentIndex + 1;
    if (newIndex < users.length) {
      setCurrentIndex(newIndex);
    } else {
      // Handle end of users - loop back to start or show a message
      toast({
        title: "No more users",
        description: "You've reached the end of available users.",
      });
      setCurrentIndex(0); // Loop back to the first user
    }
  };

  const handleAddFriend = (userId: string, userName: string) => {
    console.log('Adding friend:', userName);
    
    // Get current friends from localStorage
    const currentFriends = JSON.parse(localStorage.getItem('user_friends') || '[]');
    
    // Check if already a friend
    if (currentFriends.includes(userId)) {
      toast({
        title: "Already friends!",
        description: `You're already friends with ${userName}`,
      });
      return;
    }

    // Add to friends list
    currentFriends.push(userId);
    localStorage.setItem('user_friends', JSON.stringify(currentFriends));

    toast({
      title: "Friend added!",
      description: `You've added ${userName} as a friend`,
    });
  };

  const handleMessageClick = (friendId: string) => {
    console.log(`Opening chat with friend ${friendId}`);
    navigate(`/chat/${friendId}`);
  };

  if (users.length === 0) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  const currentUser = users[currentIndex];
  const compatibilityScore = calculateCompatibilityScore(currentUserId, currentUser);

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20 overflow-y-auto">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-10 h-10 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Discover People</h1>
          <p className="text-orange-200">Find your tribe</p>
        </div>

        <div className="relative h-[600px] mb-6">
          {currentUser && (
            <SwipeableCard user={currentUser} onSwipe={handleSwipe} />
          )}
        </div>

        {currentUser && (
          <div className="space-y-4">
            <CompatibilityScoreComponent score={compatibilityScore} showDetails={false} />

            <div className="flex justify-between">
              <Button 
                className="cave-button-outline w-24"
                onClick={() => handleSwipe('left', currentUser.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Pass
              </Button>
              <Button 
                className="cave-button w-24"
                onClick={() => handleSwipe('right', currentUser.id)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
