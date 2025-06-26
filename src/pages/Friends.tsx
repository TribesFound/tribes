
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Filter, Users, Plus } from 'lucide-react';
import SubscriptionBadge, { SubscriptionTier } from '@/components/SubscriptionBadge';

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'active' | 'distance'>('name');

  // Mock bonds/matches data
  const mockBonds = [
    {
      id: 1,
      name: 'Maya',
      avatar: '/placeholder.svg',
      tier: 'Oracle' as SubscriptionTier
    },
    {
      id: 2,
      name: 'Jordan',
      avatar: '/placeholder.svg',
      tier: 'Bloodline' as SubscriptionTier
    },
    {
      id: 3,
      name: 'Riley',
      avatar: '/placeholder.svg',
      tier: 'Inner Circle' as SubscriptionTier
    },
    {
      id: 4,
      name: 'Casey',
      avatar: '/placeholder.svg',
      tier: 'Trade Guild' as SubscriptionTier
    }
  ];

  const mockFriends = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      isOnline: true,
      lastActive: '2 min ago',
      distance: '1.2 km',
      mutualInterests: 3,
      tier: 'Oracle' as SubscriptionTier
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      avatar: '/placeholder.svg',
      isOnline: false,
      lastActive: '1 hour ago',
      distance: '3.5 km',
      mutualInterests: 5,
      tier: 'Inner Circle' as SubscriptionTier
    },
    {
      id: 3,
      name: 'Emma Thompson',
      avatar: '/placeholder.svg',
      isOnline: true,
      lastActive: 'Active now',
      distance: '0.8 km',
      mutualInterests: 2,
      tier: 'Bloodline' as SubscriptionTier
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

  const handleBondClick = (bondId: number) => {
    console.log(`Opening chat with bond ${bondId}`);
    // Navigate to chat page with this person
  };

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold cave-font text-white">My Tribe</h1>
          </div>
          <Badge className="cave-badge">
            <Users className="w-4 h-4 mr-1" />
            {mockFriends.length}
          </Badge>
        </div>

        {/* Bonds Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold cave-font text-white mb-3">Your Bonds</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {mockBonds.map((bond) => (
              <div
                key={bond.id}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => handleBondClick(bond.id)}
              >
                <div className="text-center">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-orange-300 hover:ring-orange-400 transition-all">
                      <AvatarImage src={bond.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white cave-font">
                        {bond.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">
                      <SubscriptionBadge tier={bond.tier} size="sm" showLabel={false} />
                    </div>
                  </div>
                  <p className="text-xs text-white mt-1 cave-font">{bond.name}</p>
                </div>
              </div>
            ))}
            {/* Add new bond button */}
            <div className="flex-shrink-0 cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-200/20 border-2 border-orange-300 border-dashed rounded-full flex items-center justify-center hover:bg-orange-200/30 transition-all">
                  <Plus className="w-6 h-6 text-orange-300" />
                </div>
                <p className="text-xs text-orange-200 mt-1 cave-font">Discover</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cave-input pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => setSortBy('name')}
              variant={sortBy === 'name' ? 'default' : 'outline'}
              className={sortBy === 'name' ? 'cave-button' : 'cave-button-outline'}
              size="sm"
            >
              A-Z
            </Button>
            <Button
              onClick={() => setSortBy('active')}
              variant={sortBy === 'active' ? 'default' : 'outline'}
              className={sortBy === 'active' ? 'cave-button' : 'cave-button-outline'}
              size="sm"
            >
              Most Active
            </Button>
            <Button
              onClick={() => setSortBy('distance')}
              variant={sortBy === 'distance' ? 'default' : 'outline'}
              className={sortBy === 'distance' ? 'cave-button' : 'cave-button-outline'}
              size="sm"
            >
              Closest
            </Button>
          </div>
        </div>

        {/* Friends List */}
        <div>
          <h2 className="text-lg font-bold cave-font text-white mb-3">Friends</h2>
          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <Card key={friend.id} className="cave-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-orange-200">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white cave-font">
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold cave-font text-amber-900">
                            {friend.name}
                          </h3>
                          <SubscriptionBadge tier={friend.tier} size="sm" showLabel={false} />
                        </div>
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
                      className="cave-button p-2"
                      onClick={() => console.log(`Opening chat with ${friend.name}`)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-orange-300 mb-4" />
            <h3 className="text-xl font-bold cave-font text-white mb-2">
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
