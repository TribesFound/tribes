
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MatchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onMessage: () => void;
  userPhoto: string;
  matchPhoto: string;
  matchName: string;
  userName: string;
}

const MatchPopup: React.FC<MatchPopupProps> = ({
  isOpen,
  onClose,
  onMessage,
  userPhoto,
  matchPhoto,
  matchName,
  userName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Background glyphs */}
        <div className="absolute inset-0 opacity-10">
          <Sparkles className="absolute top-4 left-4 w-6 h-6 text-white" />
          <Heart className="absolute top-8 right-6 w-8 h-8 text-white" />
          <Sparkles className="absolute bottom-12 left-8 w-4 h-4 text-white" />
          <Heart className="absolute bottom-6 right-4 w-6 h-6 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Avatar className="w-20 h-20 ring-4 ring-white">
              <AvatarImage src={userPhoto} />
              <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                {userName[0]}
              </AvatarFallback>
            </Avatar>
            
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-white"
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
            
            <Avatar className="w-20 h-20 ring-4 ring-white">
              <AvatarImage src={matchPhoto} />
              <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                {matchName[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white cave-font mb-2"
          >
            Bonding!
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 mb-6"
          >
            You and {matchName} have created a bond!
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Button
              onClick={onMessage}
              className="w-full bg-white text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-xl"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Message {matchName}
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-white hover:bg-white/10 py-3 rounded-xl"
            >
              Continue Discovering
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchPopup;
