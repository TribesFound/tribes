
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Users, Search, Plus, Clock } from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const mockEvents = [
    {
      id: 1,
      title: 'Beach Volleyball Tournament',
      organizer: 'Sarah Chen',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Santa Monica Beach',
      tags: ['Sports', 'Outdoor', 'Competition'],
      attendees: 24,
      maxAttendees: 30,
      isRSVPed: false
    },
    {
      id: 2,
      title: 'Photography Walking Tour',
      organizer: 'Marcus Rodriguez',
      date: '2024-01-22',
      time: '2:00 PM',
      location: 'Downtown LA',
      tags: ['Photography', 'Art', 'Walking'],
      attendees: 12,
      maxAttendees: 15,
      isRSVPed: true
    },
    {
      id: 3,
      title: 'Community Garden Workday',
      organizer: 'Green Thumb Society',
      date: '2024-01-25',
      time: '9:00 AM',
      location: 'Venice Community Garden',
      tags: ['Volunteering', 'Environment', 'Community'],
      attendees: 8,
      maxAttendees: 20,
      isRSVPed: false
    }
  ];

  const categories = ['all', 'Sports', 'Art', 'Volunteering', 'Community', 'Outdoor'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || 
                           event.tags.some(tag => tag.toLowerCase() === filterCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleRSVP = (eventId: number) => {
    console.log(`RSVP for event ${eventId}`);
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold tribal-font text-white">Events</h1>
          </div>
          <Button className="tribal-button p-2">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tribal-input pl-10"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilterCategory(category)}
                variant={filterCategory === category ? 'default' : 'outline'}
                className={filterCategory === category ? 'tribal-button' : 'tribal-button-outline'}
                size="sm"
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="tribal-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg tribal-font text-amber-900 mb-2">
                      {event.title}
                    </CardTitle>
                    <p className="text-sm text-amber-700 mb-3">
                      Organized by {event.organizer}
                    </p>
                  </div>
                  {event.isRSVPed && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      RSVP'd
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} className="tribal-badge-outline text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-amber-700">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-amber-700">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-amber-700">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                    
                    <Button
                      onClick={() => handleRSVP(event.id)}
                      className={event.isRSVPed ? 'tribal-button-outline' : 'tribal-button'}
                      size="sm"
                    >
                      {event.isRSVPed ? 'Cancel RSVP' : 'RSVP'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-orange-300 mb-4" />
            <h3 className="text-xl font-bold tribal-font text-white mb-2">
              No events found
            </h3>
            <p className="text-orange-200">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Check back soon for upcoming events!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
