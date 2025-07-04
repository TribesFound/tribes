
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { EnhancedEvent } from '@/utils/eventTypes';
import { format } from 'date-fns';

interface EventDiscoveryCardProps {
  event: EnhancedEvent;
  onRSVP: (eventId: string, status: 'going' | 'interested' | 'maybe') => void;
  onViewDetails: (eventId: string) => void;
  currentUserRSVP?: 'going' | 'interested' | 'maybe';
}

const EventDiscoveryCard: React.FC<EventDiscoveryCardProps> = ({
  event,
  onRSVP,
  onViewDetails,
  currentUserRSVP
}) => {
  const goingCount = event.rsvps.filter(rsvp => rsvp.status === 'going').length;
  const interestedCount = event.rsvps.filter(rsvp => rsvp.status === 'interested').length;
  
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  
  return (
    <Card className="cave-card hover:shadow-lg transition-all cursor-pointer">
      <div className="relative">
        <img
          src={event.images[0] || '/placeholder.svg'}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${event.category.color} text-white`}>
            {event.category.icon} {event.category.name}
          </Badge>
        </div>
        {event.price > 0 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-amber-900 border border-amber-200">
              <DollarSign className="w-3 h-3 mr-1" />
              ${event.price}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold cave-font text-amber-900 text-lg mb-1">
              {event.title}
            </h3>
            <p className="cave-text text-amber-700 text-sm line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm cave-text text-amber-700">
            <Calendar className="w-4 h-4" />
            <span>{format(eventDate, 'MMM d, yyyy')}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm cave-text text-amber-700">
            <MapPin className="w-4 h-4" />
            <span className="truncate">
              {event.location.venue ? `${event.location.venue}, ` : ''}
              {event.location.city}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm cave-text text-amber-700">
            <Users className="w-4 h-4" />
            <span>{goingCount} going</span>
            {interestedCount > 0 && (
              <span>• {interestedCount} interested</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={event.organizer.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white text-xs">
                {event.organizer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium cave-font text-amber-900">
                {event.organizer.name}
              </p>
              <p className="text-xs cave-text text-amber-600">
                {event.organizer.type === 'business' ? 'Business' : 'Individual'}
              </p>
            </div>
          </div>
          
          {event.organizer.isVerified && (
            <Badge className="cave-badge text-xs">
              ✓ Verified
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="cave-badge-outline text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            className={`flex-1 ${currentUserRSVP === 'going' ? 'cave-button' : 'cave-button-outline'}`}
            onClick={() => onRSVP(event.id, 'going')}
          >
            {currentUserRSVP === 'going' ? 'Going' : 'Join'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`flex-1 ${currentUserRSVP === 'interested' ? 'cave-button' : 'cave-button-outline'}`}
            onClick={() => onRSVP(event.id, 'interested')}
          >
            {currentUserRSVP === 'interested' ? 'Interested' : 'Interested'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="cave-button-ghost"
            onClick={() => onViewDetails(event.id)}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDiscoveryCard;
