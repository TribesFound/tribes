
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Filter, Users } from 'lucide-react';

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'active' | 'distance'>('name');

  const mockFriends = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      isOnline: true,
      lastActive: '2 min ago',
      distance: '1.2 km',
      mutualInterests: 3
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      avatar: '/placeholder.svg',
      isOnline: false,
      lastActive: '1 hour ago',
      distance: '3.5 km',
      mutualInterests: 5
    },
    {
      id: 3,
      name: 'Emma Thompson',
      avatar: '/placeholder.svg',
      isOnline: true,
      lastActive: 'Active now',
      distance: '0.8 km',
      mutualInterests: 2
    }
  ];

  const filteredFriends = mockFriends
    .filter(friend => 
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'active':
          return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold tribal-font text-white">My Tribe</h1>
          </div>
          <Badge className="tribal-badge">
            <Users className="w-4 h-4 mr-1" />
            {mockFriends.length}
          </Badge>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tribal-input pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => setSortBy('name')}
              variant={sortBy === 'name' ? 'default' : 'outline'}
              className={sortBy === 'name' ? 'tribal-button' : 'tribal-button-outline'}
              size="sm"
            >
              A-Z
            </Button>
            <Button
              onClick={() => setSortBy('active')}
              variant={sortBy === 'active' ? 'default' : 'outline'}
              className={sortBy === 'active' ? 'tribal-button' : 'tribal-button-outline'}
              size="sm"
            >
              Most Active
            </Button>
            <Button
              onClick={() => setSortBy('distance')}
              variant={sortBy === 'distance' ? 'default' : 'outline'}
              className={sortBy === 'distance' ? 'tribal-button' : 'tribal-button-outline'}
              size="sm"
            >
              Closest
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredFriends.map((friend) => (
            <Card key={friend.id} className="tribal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-orange-200">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white tribal-font">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold tribal-font text-amber-900">
                        {friend.name}
                      </h3>
                      <p className="text-sm text-amber-700">
                        {friend.isOnline ? 'Online' : friend.lastActive}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-amber-600">
                          {friend.distance} away
                        </span>
                        <span className="text-xs text-amber-600">
                          {friend.mutualInterests} shared interests
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="tribal-button p-2"
                    onClick={() => console.log(`Opening chat with ${friend.name}`)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-orange-300 mb-4" />
            <h3 className="text-xl font-bold tribal-font text-white mb-2">
              No friends found
            </h3>
            <p className="text-orange-200">
              {searchTerm ? 'Try a different search term' : 'Start connecting with people to build your tribe!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
