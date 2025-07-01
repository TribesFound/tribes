
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Eye } from 'lucide-react';

interface PhotoMessageProps {
  photoUrl: string;
  timestamp: string;
  isCurrentUser: boolean;
  onView: () => void;
  expiresAt: string;
}

const PhotoMessage: React.FC<PhotoMessageProps> = ({
  photoUrl,
  timestamp,
  isCurrentUser,
  onView,
  expiresAt
}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isExpired) {
    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}>
        <div
          className={`max-w-xs px-4 py-3 rounded-2xl ${
            isCurrentUser
              ? 'bg-gray-300 text-gray-600 rounded-br-md'
              : 'bg-gray-200 text-gray-600 rounded-bl-md'
          } shadow-sm`}
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Photo expired</span>
          </div>
          <div className="text-xs mt-1 opacity-70">
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-xs rounded-2xl overflow-hidden ${
          isCurrentUser
            ? 'bg-orange-500 rounded-br-md'
            : 'bg-white border border-orange-200 rounded-bl-md'
        } shadow-sm`}
      >
        <div className="relative">
          <img
            src={photoUrl}
            alt="Shared photo"
            className="w-full h-48 object-cover"
          />
          <Button
            onClick={onView}
            className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center"
            variant="ghost"
          >
            <Eye className="w-6 h-6 text-white" />
          </Button>
        </div>
        
        <div className={`px-3 py-2 flex items-center justify-between ${
          isCurrentUser ? 'text-orange-100' : 'text-amber-600'
        }`}>
          <span className="text-xs">{formatTime(timestamp)}</span>
          <div className="flex items-center space-x-1 text-xs">
            <Clock className="w-3 h-3" />
            <span>{timeLeft}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoMessage;
