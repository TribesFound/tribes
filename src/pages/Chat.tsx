
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Phone, Video, MoreVertical, UserPlus, Eye } from 'lucide-react';
import MessageInput from '@/components/MessageInput';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  type: 'text' | 'image';
}

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFriend, setIsFriend] = useState(false);

  const chatPartner = {
    id: userId || '1',
    name: 'Maya',
    avatar: '/placeholder.svg',
    isOnline: true,
    lastSeen: 'Active now'
  };

  useEffect(() => {
    // Load messages for this chat
    const chatKey = `chat_${userId}`;
    const savedMessages = localStorage.getItem(chatKey);
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } else {
      // Default messages
      setMessages([
        {
          id: '1',
          content: 'Hey! How have you been? 🌟',
          timestamp: new Date(Date.now() - 3600000),
          senderId: userId || '1',
          type: 'text'
        },
        {
          id: '2',
          content: 'Hi Maya! I\'ve been great, thanks for asking. How about you?',
          timestamp: new Date(Date.now() - 3300000),
          senderId: 'current_user',
          type: 'text'
        }
      ]);
    }

    // Check if user is friend
    const friends = JSON.parse(localStorage.getItem('user_friends') || '[]');
    setIsFriend(friends.includes(userId));
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      senderId: 'current_user',
      type: 'text'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Save to localStorage
    const chatKey = `chat_${userId}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

    // Simulate response after 2 seconds
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you soon 😊",
        timestamp: new Date(),
        senderId: userId || '1',
        type: 'text'
      };
      
      const finalMessages = [...updatedMessages, responseMessage];
      setMessages(finalMessages);
      localStorage.setItem(chatKey, JSON.stringify(finalMessages));
    }, 2000);
  };

  const handleAddFriend = () => {
    const currentFriends = JSON.parse(localStorage.getItem('user_friends') || '[]');
    
    if (currentFriends.includes(userId)) {
      toast({
        title: "Already friends!",
        description: `You're already friends with ${chatPartner.name}`,
      });
      return;
    }

    currentFriends.push(userId);
    localStorage.setItem('user_friends', JSON.stringify(currentFriends));
    setIsFriend(true);

    // Remove from bonds list
    const bonds = JSON.parse(localStorage.getItem('user_bonds') || '[]');
    const updatedBonds = bonds.filter((id: string) => id !== userId);
    localStorage.setItem('user_bonds', JSON.stringify(updatedBonds));

    toast({
      title: "Friend added!",
      description: `You've added ${chatPartner.name} as a friend`,
    });
  };

  const handleViewProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen cave-gradient">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-orange-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/bonds')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5 text-amber-700" />
            </Button>
            
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleViewProfile}>
              <div className="relative">
                <Avatar className="w-10 h-10 ring-2 ring-orange-200">
                  <AvatarImage src={chatPartner.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white">
                    {chatPartner.name[0]}
                  </AvatarFallback>
                </Avatar>
                {chatPartner.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-amber-900 cave-font">
                  {chatPartner.name}
                </h3>
                <p className="text-xs text-amber-600">
                  {chatPartner.lastSeen}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isFriend && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddFriend}
                className="p-2"
              >
                <UserPlus className="w-5 h-5 text-amber-700" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewProfile}
              className="p-2"
            >
              <Eye className="w-5 h-5 text-amber-700" />
            </Button>

            <Button variant="ghost" size="sm" className="p-2">
              <Phone className="w-5 h-5 text-amber-700" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <Video className="w-5 h-5 text-amber-700" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5 text-amber-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.senderId === 'current_user'
                ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white'
                : 'bg-white/80 text-amber-900 border border-orange-200'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === 'current_user' ? 'text-orange-100' : 'text-amber-600'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
