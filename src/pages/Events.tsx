import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Users, Search, Plus, Clock, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const hobbies = [
  'Photography', 'Hiking', 'Cooking', 'Reading', 'Gaming', 'Painting',
  'Music', 'Dancing', 'Cycling', 'Yoga', 'Gardening', 'Writing',
  'Traveling', 'Fitness', 'Meditation', 'Crafting', 'Chess', 'Board Games',
  'Rock Climbing', 'Swimming', 'Running', 'Skiing', 'Surfing', 'Fishing',
  'Musician', 'Music Production', 'VJ', 'DJ', 'Fire Performer', 'Theater',
  'Performing Arts', 'Scuba Diving', 'Free Diving', 'Foraging'
];

const passions = [
  'Technology', 'Science', 'History', 'Philosophy', 'Psychology', 'Politics',
  'Environment', 'Health', 'Business', 'Art', 'Literature', 'Movies',
  'TV Shows', 'Podcasts', 'Fashion', 'Food', 'Travel', 'Sports',
  'Spirituality', 'Personal Development', 'Languages', 'Culture', 'Nature', 'Space',
  'Van Life', 'Sustainable Living', 'Festivals', 'Community', 'Permaculture',
  'Animals', 'Off Grid Living'
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const mockEvents = [
    {
      id: 1,
      title: 'Beach Volleyball Tournament',
      organizer: 'Sarah Chen',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Santa Monica Beach',
      tags: ['Sports', 'Outdoor', 'Competition'],
      hobbies: ['Swimming', 'Fitness'],
      passions: ['Health', 'Community'],
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
      hobbies: ['Photography', 'Traveling'],
      passions: ['Art', 'Culture'],
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
      hobbies: ['Gardening'],
      passions: ['Environment', 'Community', 'Sustainable Living'],
      attendees: 8,
      maxAttendees: 20,
      isRSVPed: false
    },
    {
      id: 4,
      title: 'Van Life Meetup',
      organizer: 'Nomad Collective',
      date: '2024-01-28',
      time: '6:00 PM',
      location: 'Malibu Beach Parking',
      tags: ['Van Life', 'Travel', 'Community'],
      hobbies: ['Traveling'],
      passions: ['Van Life', 'Community', 'Off Grid Living'],
      attendees: 18,
      maxAttendees: 25,
      isRSVPed: false
    }
  ];

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else if (selectedHobbies.length < 5) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else if (selectedPassions.length < 5) {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHobbies = selectedHobbies.length === 0 || 
                          selectedHobbies.some(hobby => event.hobbies.includes(hobby));
    
    const matchesPassions = selectedPassions.length === 0 || 
                           selectedPassions.some(passion => event.passions.includes(passion));
    
    return matchesSearch && matchesHobbies && matchesPassions;
  });

  const clearFilters = () => {
    setSelectedHobbies([]);
    setSelectedPassions([]);
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const handleRSVP = (eventId: number) => {
    console.log(`RSVP for event ${eventId}`);
  };

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold cave-font text-amber-900">Gather</h1>
          </div>
          <div className="flex space-x-2">
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="cave-button-ghost p-2">
                  <Filter className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="cave-card w-full max-w-md">
                <SheetHeader>
                  <SheetTitle className="cave-font text-amber-900">Event Filters</SheetTitle>
                  <SheetDescription className="cave-text">
                    Find events matching your interests
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Hobbies Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Hobbies (max 5): {selectedHobbies.length}/5
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {hobbies.map((hobby) => (
                        <Badge
                          key={hobby}
                          variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                          className={`cursor-pointer text-xs p-2 transition-all ${
                            selectedHobbies.includes(hobby)
                              ? 'cave-badge'
                              : 'cave-badge-outline'
                          } ${selectedHobbies.length >= 5 && !selectedHobbies.includes(hobby) ? 'opacity-50' : ''}`}
                          onClick={() => toggleHobby(hobby)}
                        >
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Passions Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium cave-text">
                      Passions (max 5): {selectedPassions.length}/5
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {passions.map((passion) => (
                        <Badge
                          key={passion}
                          variant={selectedPassions.includes(passion) ? "default" : "outline"}
                          className={`cursor-pointer text-xs p-2 transition-all ${
                            selectedPassions.includes(passion)
                              ? 'cave-badge'
                              : 'cave-badge-outline'
                          } ${selectedPassions.length >= 5 && !selectedPassions.includes(passion) ? 'opacity-50' : ''}`}
                          onClick={() => togglePassion(passion)}
                        >
                          {passion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="flex-1 cave-button-outline"
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={applyFilters}
                      className="flex-1 cave-button"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button className="cave-button p-2">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cave-input pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="cave-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg cave-font text-amber-900 mb-2">
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
                    <Badge key={tag} className="cave-badge-outline text-xs">
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
                      className={event.isRSVPed ? 'cave-button-outline' : 'cave-button'}
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
            <h3 className="text-xl font-bold cave-font text-amber-900 mb-2">
              No events found
            </h3>
            <p className="text-amber-700">
              {searchTerm || selectedHobbies.length > 0 || selectedPassions.length > 0
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
