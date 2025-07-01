
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  MoreVertical, 
  User, 
  UserPlus, 
  Phone, 
  Video 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ChatHeaderProps {
  chatUser: ChatUser;
  onViewProfile: () => void;
  onAddFriend: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  chatUser, 
  onViewProfile, 
  onAddFriend 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-orange-200 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button
          onClick={() => navigate('/friends')}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5 text-amber-700" />
        </Button>
        
        <div className="relative">
          <Avatar className="w-10 h-10 ring-2 ring-orange-200">
            <AvatarImage src={chatUser.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white cave-font">
              {chatUser.name[0]}
            </AvatarFallback>
          </Avatar>
          {chatUser.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div>
          <h2 className="font-bold cave-font text-amber-900">{chatUser.name}</h2>
          <p className="text-xs text-amber-600">
            {chatUser.isOnline ? 'Online' : 'Last seen recently'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-2">
          <Phone className="w-5 h-5 text-amber-700" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Video className="w-5 h-5 text-amber-700" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5 text-amber-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="cave-card">
            <DropdownMenuItem
              onClick={onViewProfile}
              className="text-amber-800 hover:bg-orange-100"
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onAddFriend}
              className="text-amber-800 hover:bg-orange-100"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Friend
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
