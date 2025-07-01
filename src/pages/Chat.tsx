
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [isTyping, setIsTyping] = useState(false);
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

    // Mock messages with delivery status
    setMessages([
      {
        id: '1',
        senderId: userId || '1',
        content: 'Hey! Love your hiking photos 📸',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        isRead: true,
        isDelivered: true
      },
      {
        id: '2',
        senderId: currentUserId,
        content: 'Thanks! That trail was amazing. Have you been there?',
        timestamp: new Date(Date.now() - 6900000).toISOString(), // 1h 55m ago
        isRead: true,
        isDelivered: true
      },
      {
        id: '3',
        senderId: userId || '1',
        content: 'Not yet, but it\'s definitely on my list now! Maybe we could go together sometime?',
        timestamp: new Date(Date.now() - 6600000).toISOString(), // 1h 50m ago
        isRead: true,
        isDelivered: true
      },
      {
        id: '4',
        senderId: currentUserId,
        content: 'That sounds great! I know some other trails too if you\'re interested.',
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        isRead: false,
        isDelivered: true
      }
    ]);
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
      senderId: currentUserId,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
      isDelivered: false
    };
    
    setMessages(prev => [...prev, newMessage]);

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

    // Simulate other user reading message
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
        senderId: userId || '1',
        content: randomResponse,
        timestamp: new Date().toISOString(),
        isRead: false,
        isDelivered: true
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 4000);
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
      <ChatHeader
        chatUser={chatUser}
        onViewProfile={handleViewProfile}
        onAddFriend={handleAddFriend}
      />

      {/* Messages Area */}
      <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === currentUserId}
                senderName={message.senderId !== currentUserId ? chatUser.name : undefined}
              />
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
