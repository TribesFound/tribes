import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, UserPlus, Calendar } from 'lucide-react';

const bonds = [
  {
    id: 1,
    name: 'Alex Chen',
    lastMessage: 'Hey! Love your hiking photos 📸',
    timestamp: '2 hours ago',
    isNew: true,
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Sam Rodriguez',
    lastMessage: 'That board game cafe looks amazing!',
    timestamp: '1 day ago',
    isNew: false,
    avatar: '/placeholder.svg'
  }
];

const Matches = () => {
  const navigate = useNavigate();

  const handleChatClick = (bondId: number) => {
    navigate(`/chat/${bondId}`);
  };

  const handleExploreEvents = () => {
    navigate('/events');
  };

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20 overflow-y-auto">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-10 h-10 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Your Messages</h1>
          <p className="text-orange-200">{bonds.length} bonds waiting</p>
        </div>

        <div className="space-y-4">
          {bonds.map((bond) => (
            <Card
              key={bond.id}
              className="cave-card hover:bg-orange-50/10 transition-all cursor-pointer"
              onClick={() => handleChatClick(bond.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-orange-200">
                      <AvatarImage src={bond.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white cave-font">
                        {bond.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {bond.isNew && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-amber-900 font-semibold text-lg cave-font">
                      {bond.name}
                    </h3>
                    <p className="text-amber-700 text-sm truncate">
                      {bond.lastMessage}
                    </p>
                    <p className="text-amber-600 text-xs">
                      {bond.timestamp}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="cave-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChatClick(bond.id);
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cave-button-outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Adding friend:', bond.name);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Friend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {bonds.length === 0 && (
          <Card className="cave-card">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-amber-900 text-xl font-semibold mb-2 cave-font">
                No messages yet
              </h3>
              <p className="text-amber-700">
                Keep swiping to find your tribe and create bonds!
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="cave-card mt-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-amber-900 font-semibold cave-font">Community Events</h3>
                <p className="text-amber-700 text-sm">Discover local meetups</p>
              </div>
              <Button className="cave-button" onClick={handleExploreEvents}>
                <Calendar className="w-4 h-4 mr-2" />
                Explore
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Matches;
