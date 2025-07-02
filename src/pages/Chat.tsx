
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import PhotoMessage from '@/components/PhotoMessage';
import MessageInput from '@/components/MessageInput';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
  type?: 'text' | 'photo';
  photoUrl?: string;
  expiresAt?: string;
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
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'current-user';

  // Updated mock users data to match Friends.tsx IDs
  const mockUsers: { [key: string]: ChatUser } = {
    // Bonds
    '1': {
      id: '1',
      name: 'Maya',
      avatar: '/placeholder.svg',
      isOnline: true
    },
    '2': {
      id: '2',
      name: 'Jordan',
      avatar: '/placeholder.svg',
      isOnline: false
    },
    '3': {
      id: '3',
      name: 'Riley',
      avatar: '/placeholder.svg',
      isOnline: true
    },
    '4': {
      id: '4',
      name: 'Casey',
      avatar: '/placeholder.svg',
      isOnline: true
    },
    // Friends
    '5': {
      id: '5',
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      isOnline: true
    },
    '6': {
      id: '6',
      name: 'Marcus Rodriguez',
      avatar: '/placeholder.svg',
      isOnline: false
    },
    '7': {
      id: '7',
      name: 'Emma Thompson',
      avatar: '/placeholder.svg',
      isOnline: true
    },
    '8': {
      id: '8',
      name: 'Tech Solutions Co.',
      avatar: '/placeholder.svg',
      isOnline: false
    }
  };

  // Updated mock conversations for each user
  const mockConversations: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        senderId: '1',
        content: 'Hey! How have you been? 🌟',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      }
    ],
    '2': [
      {
        id: '1',
        senderId: '2',
        content: 'That event was amazing! Thanks for the invite 🎉',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      }
    ],
    '3': [
      {
        id: '1',
        senderId: '3',
        content: 'Looking forward to our coffee meetup! ☕',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        isRead: false,
        isDelivered: true,
        type: 'text'
      }
    ],
    '4': [
      {
        id: '1',
        senderId: '4',
        content: 'Great networking opportunity coming up! Interested?',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      }
    ],
    '5': [
      {
        id: '1',
        senderId: '5',
        content: 'Hi there! Love your hiking photos 📸',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      },
      {
        id: '2',
        senderId: currentUserId,
        content: 'Thanks! That trail was amazing. Have you been there?',
        timestamp: new Date(Date.now() - 6900000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      }
    ],
    '6': [
      {
        id: '1',
        senderId: '6',
        content: 'Hey! How was your weekend adventure?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      }
    ],
    '7': [
      {
        id: '1',
        senderId: '7',
        content: 'That board game cafe looks amazing! Let\'s go soon 🎲',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        isRead: false,
        isDelivered: true,
        type: 'text'
      }
    ],
    '8': [
      {
        id: '1',
        senderId: '8',
        content: 'Hello! We have some exciting networking events coming up. Would you like to learn more about our services?',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
        isDelivered: true,
        type: 'text'
      }
    ]
  };

  useEffect(() => {
    if (!userId) {
      navigate('/friends');
      return;
    }

    // Set chat user based on userId
    const user = mockUsers[userId];
    if (user) {
      setChatUser(user);
      // Load conversation history for this specific user
      setMessages(mockConversations[userId] || []);
      console.log(`Loading chat for user: ${user.name} (ID: ${userId})`);
    } else {
      // If user not found, redirect back to friends
      console.log(`User not found for ID: ${userId}`);
      navigate('/friends');
    }
  }, [userId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
    if (!userId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
      isDelivered: false,
      type: 'text'
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Update the mock conversation data
    if (!mockConversations[userId]) {
      mockConversations[userId] = [];
    }
    mockConversations[userId].push(newMessage);

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, isDelivered: true }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, isRead: true }
            : msg
        )
      );
    }, 3000);

    // Simulate typing indicator and response
    setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's awesome! 😊",
        "Sounds like a plan!",
        "I'm excited about this!",
        "Can't wait to explore together!",
        "Perfect timing!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: userId,
        content: randomResponse,
        timestamp: new Date().toISOString(),
        isRead: false,
        isDelivered: true,
        type: 'text'
      };
      
      setMessages(prev => [...prev, responseMessage]);
      mockConversations[userId].push(responseMessage);
    }, 4000);
  };

  const handleViewProfile = () => {
    // Navigate to the chat partner's profile, not current user's profile
    navigate(`/profile/${userId}`);
  };

  const handleAddFriend = () => {
    if (!userId || !chatUser) return;

    // Get current friends from localStorage or use empty array
    const currentFriends = JSON.parse(localStorage.getItem('user_friends') || '[]');
    
    // Check if already a friend
    if (currentFriends.includes(userId)) {
      toast({
        title: "Already friends!",
        description: `You're already friends with ${chatUser.name}`,
      });
      return;
    }

    // Add to friends list
    currentFriends.push(userId);
    localStorage.setItem('user_friends', JSON.stringify(currentFriends));

    // Remove from bonds list if it exists there
    const currentBonds = JSON.parse(localStorage.getItem('user_bonds') || '[]');
    const updatedBonds = currentBonds.filter((bondId: string) => bondId !== userId);
    localStorage.setItem('user_bonds', JSON.stringify(updatedBonds));

    toast({
      title: "Friend added!",
      description: `You've added ${chatUser.name} as a friend`,
    });
    
    // Navigate to friends list after a short delay
    setTimeout(() => {
      navigate('/friends');
    }, 1500);
  };

  const handleSendPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create a temporary URL for the image
        const photoUrl = URL.createObjectURL(file);
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours from now
        
        const photoMessage: Message = {
          id: Date.now().toString(),
          senderId: currentUserId,
          content: 'Photo',
          timestamp: new Date().toISOString(),
          isRead: false,
          isDelivered: true,
          type: 'photo',
          photoUrl,
          expiresAt
        };
        
        setMessages(prev => [...prev, photoMessage]);
        
        if (userId && mockConversations[userId]) {
          mockConversations[userId].push(photoMessage);
        }
        
        toast({
          title: "Photo sent!",
          description: "Photo will be available for 24 hours",
        });
      }
    };
    input.click();
  };

  const handleVideoCall = () => {
    toast({
      title: "Video call feature",
      description: "Video calling will be available in a future update!",
    });
  };

  const handleViewPhoto = (photoUrl: string) => {
    // Open photo in full screen or modal
    window.open(photoUrl, '_blank');
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
      <ChatHeader
        chatUser={chatUser}
        onViewProfile={handleViewProfile}
        onAddFriend={handleAddFriend}
        onSendPhoto={handleSendPhoto}
        onVideoCall={handleVideoCall}
      />

      {/* Messages Area */}
      <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-1">
            {messages.map((message) => (
              message.type === 'photo' ? (
                <PhotoMessage
                  key={message.id}
                  photoUrl={message.photoUrl!}
                  timestamp={message.timestamp}
                  isCurrentUser={message.senderId === currentUserId}
                  onView={() => handleViewPhoto(message.photoUrl!)}
                  expiresAt={message.expiresAt!}
                />
              ) : (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === currentUserId}
                  senderName={message.senderId !== currentUserId ? chatUser.name : undefined}
                />
              )
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-orange-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default Chat;
