
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    avatar: string;
    businessProfile?: boolean;
  };
  attendees: number;
  maxAttendees: number;
  category: string;
  imageUrl?: string;
}

interface EventCardProps {
  event: Event;
  onJoin: (eventId: string) => void;
  onViewDetails: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoin, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="cave-card overflow-hidden">
      {event.imageUrl && (
        <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-400 relative">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-amber-800">
            {event.category}
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="cave-font text-amber-900 text-lg">
            {event.title}
          </CardTitle>
          {event.organizer.businessProfile && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Business
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-amber-700 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-amber-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 ml-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-amber-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center text-amber-600 text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.attendees}/{event.maxAttendees} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={event.organizer.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white text-xs">
                {event.organizer.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-amber-700">{event.organizer.name}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(event.id)}
              className="text-amber-700 border-amber-300"
            >
              Details
            </Button>
            <Button
              size="sm"
              onClick={() => onJoin(event.id)}
              className="cave-button"
              disabled={event.attendees >= event.maxAttendees}
            >
              {event.attendees >= event.maxAttendees ? 'Full' : 'Join'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
