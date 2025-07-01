
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    isDelivered: boolean;
  };
  isCurrentUser: boolean;
  senderName?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isCurrentUser, 
  senderName 
}) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isCurrentUser
            ? 'bg-orange-500 text-white rounded-br-md'
            : 'bg-white border border-orange-200 text-amber-900 rounded-bl-md'
        } shadow-sm`}
      >
        {!isCurrentUser && senderName && (
          <p className="text-xs font-semibold mb-1 text-amber-700">{senderName}</p>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className={`flex items-center justify-end mt-2 space-x-1 ${
          isCurrentUser ? 'text-orange-100' : 'text-amber-600'
        }`}>
          <span className="text-xs">{formatTime(message.timestamp)}</span>
          {isCurrentUser && (
            <div className="flex">
              {message.isDelivered ? (
                message.isRead ? (
                  <CheckCheck className="w-3 h-3 text-green-300" />
                ) : (
                  <CheckCheck className="w-3 h-3 text-orange-200" />
                )
              ) : (
                <Check className="w-3 h-3 text-orange-200" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
