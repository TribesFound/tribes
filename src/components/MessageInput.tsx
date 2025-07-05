
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-t border-orange-200 p-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-2">
          <Paperclip className="w-5 h-5 text-amber-700" />
        </Button>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 cave-input border-amber-200 focus:border-orange-400 focus:ring-orange-400"
          disabled={disabled}
        />
        
        <Button variant="ghost" size="sm" className="p-2">
          <Smile className="w-5 h-5 text-amber-700" />
        </Button>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="cave-button p-3 min-w-[48px]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
