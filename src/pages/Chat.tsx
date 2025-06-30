
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, MoreVertical, User, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'current-user'; // This would come from auth context

  // Mock data - replace with real API calls
  useEffect(() => {
    // Mock chat user data
    setChatUser({
      id: userId || '1',
      name: 'Alex Chen',
      avatar: '/placeholder.svg',
      isOnline: true
    });

    // Mock messages
    setMessages([
      {
        id: '1',
        senderId: userId || '1',
        content: 'Hey! Love your hiking photos 📸',
        timestamp: '2:30 PM',
        isRead: true
      },
      {
        id: '2',
        senderId: currentUserId,
        content: 'Thanks! That trail was amazing. Have you been there?',
        timestamp: '2:35 PM',
        isRead: true
      },
      {
        id: '3',
        senderId: userId || '1',
        content: 'Not yet, but it\'s definitely on my list now! Maybe we could go together sometime?',
        timestamp: '2:40 PM',
        isRead: true
      }
    ]);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleViewProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const handleAddFriend = () => {
    console.log('Sending friend request to:', chatUser?.name);
    // Implement friend request logic
  };

  if (!chatUser) {
    return (
      <div className="min-h-screen cave-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cave-gradient flex flex-col">
      {/* Chat Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-orange-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => navigate('/matches')}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5 text-amber-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="cave-card">
            <DropdownMenuItem
              onClick={handleViewProfile}
              className="text-amber-800 hover:bg-orange-100"
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleAddFriend}
              className="text-amber-800 hover:bg-orange-100"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Friend
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.senderId === currentUserId
                    ? 'bg-orange-500 text-white rounded-br-md'
                    : 'bg-white border border-orange-200 text-amber-900 rounded-bl-md'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.senderId === currentUserId ? 'text-orange-100' : 'text-amber-600'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-orange-200 p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 cave-input"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="cave-button p-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
