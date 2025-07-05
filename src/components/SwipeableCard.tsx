
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, X, MapPin, Users } from 'lucide-react';

interface SwipeableCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    photos: string[];
    interests: string[];
    bio: string;
    distance: string;
    mutualFriends: number;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ profile, onSwipeLeft, onSwipeRight }) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitX(200);
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      setExitX(-200);
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileDrag={{ scale: 1.05 }}
    >
      <Card className="cave-card h-full overflow-hidden relative">
        <div className="relative h-64 bg-gradient-to-br from-orange-200 to-amber-200">
          <img
            src={profile.photos[0]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          
          {/* Swipe indicators */}
          <motion.div
            className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <Heart className="w-4 h-4 inline mr-1" />
            LIKE
          </motion.div>
          
          <motion.div
            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <X className="w-4 h-4 inline mr-1" />
            PASS
          </motion.div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold cave-font text-amber-900">
              {profile.name}, {profile.age}
            </h3>
            <div className="flex items-center text-amber-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.distance}
            </div>
          </div>

          <p className="text-amber-700 text-sm line-clamp-2">
            {profile.bio}
          </p>

          <div className="flex items-center text-amber-600 text-sm">
            <Users className="w-4 h-4 mr-1" />
            {profile.mutualFriends} mutual connections
          </div>

          <div className="flex flex-wrap gap-1">
            {profile.interests.slice(0, 3).map((interest, index) => (
              <Badge key={index} className="cave-badge text-xs">
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 3 && (
              <Badge className="cave-badge text-xs">
                +{profile.interests.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SwipeableCard;
