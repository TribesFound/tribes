
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, Users, Eye } from 'lucide-react';

const Friends = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [bonds, setBonds] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  const allUsers = [
    {
      id: '1',
      name: 'Maya',
      avatar: '/placeholder.svg',
      lastActive: '2 hours ago',
      mutualFriends: 3
    },
    {
      id: '2',
      name: 'Jordan',
      avatar: '/placeholder.svg',
      lastActive: '1 day ago',
      mutualFriends: 5
    },
    {
      id: '3',
      name: 'Riley',
      avatar: '/placeholder.svg',
      lastActive: '30 min ago',
      mutualFriends: 2
    },
    {
      id: '4',
      name: 'Casey',
      avatar: '/placeholder.svg',
      lastActive: '1 day ago',
      mutualFriends: 4
    }
  ];

  useEffect(() => {
    const userBonds = JSON.parse(localStorage.getItem('user_bonds') || '[]');
    const userFriends = JSON.parse(localStorage.getItem('user_friends') || '[]');

    const bondsData = allUsers.filter(user => userBonds.includes(user.id));
    const friendsData = allUsers.filter(user => userFriends.includes(user.id));

    setBonds(bondsData);
    setFriends(friendsData);
  }, []);

  const handleChatClick = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-10 h-10 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Your Tribe</h1>
          <p className="text-orange-200">{bonds.length + friends.length} connections</p>
        </div>

        {/* Your Bonds */}
        {bonds.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold cave-font text-white mb-4">
              Your Bonds ({bonds.length})
            </h2>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {bonds.map((bond) => (
                <div
                  key={bond.id}
                  className="flex-shrink-0 text-center cursor-pointer"
                  onClick={() => handleViewProfile(bond.id)}
                >
                  <Avatar className="w-16 h-16 ring-2 ring-orange-200 mx-auto mb-2">
                    <AvatarImage src={bond.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white">
                      {bond.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-white text-sm font-medium">{bond.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Friends */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 cave-input border-amber-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold cave-font text-white">
            Friends ({friends.length})
          </h2>
          
          {filteredFriends.map((friend) => (
            <Card
              key={friend.id}
              className="cave-card hover:bg-orange-50/10 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewProfile(friend.id)}
                  >
                    <Avatar className="w-16 h-16 ring-2 ring-orange-200">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white cave-font">
                        {friend.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-amber-900 font-semibold text-lg cave-font cursor-pointer hover:text-orange-600"
                      onClick={() => handleViewProfile(friend.id)}
                    >
                      {friend.name}
                    </h3>
                    <p className="text-amber-700 text-sm">
                      Active {friend.lastActive}
                    </p>
                    <p className="text-amber-600 text-xs">
                      {friend.mutualFriends} mutual connections
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="cave-button"
                      onClick={() => handleChatClick(friend.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cave-button-outline"
                      onClick={() => handleViewProfile(friend.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFriends.length === 0 && friends.length > 0 && (
            <Card className="cave-card">
              <CardContent className="p-8 text-center">
                <Search className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                <h3 className="text-amber-900 text-xl font-semibold mb-2 cave-font">
                  No friends found
                </h3>
                <p className="text-amber-700">
                  Try adjusting your search terms
                </p>
              </CardContent>
            </Card>
          )}

          {friends.length === 0 && (
            <Card className="cave-card">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                <h3 className="text-amber-900 text-xl font-semibold mb-2 cave-font">
                  No friends yet
                </h3>
                <p className="text-amber-700">
                  Add friends from your bonds to see them here!
                </p>
                <Button 
                  className="cave-button mt-4"
                  onClick={() => navigate('/bonds')}
                >
                  View Your Messages
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
