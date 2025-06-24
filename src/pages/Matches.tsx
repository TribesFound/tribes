
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, UserPlus, Calendar } from 'lucide-react';

const matches = [
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 p-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Your Matches</h1>
          <p className="opacity-90">{matches.length} connections waiting</p>
        </div>

        <div className="space-y-4">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                        {match.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {match.isNew && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg">
                      {match.name}
                    </h3>
                    <p className="text-white/70 text-sm truncate">
                      {match.lastMessage}
                    </p>
                    <p className="text-white/50 text-xs">
                      {match.timestamp}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="bg-white text-purple-600 hover:bg-white/90"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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

        {matches.length === 0 && (
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">
                No matches yet
              </h3>
              <p className="text-white/70">
                Keep swiping to find your tribe!
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Community Events</h3>
                <p className="text-white/70 text-sm">Discover local meetups</p>
              </div>
              <Button
                className="bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:from-orange-500 hover:to-pink-500"
              >
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
