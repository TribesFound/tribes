import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Heart, MessageCircle, Check, X, Filter, Instagram, Link, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish',
  'Norwegian', 'Danish', 'Finnish', 'Greek', 'Turkish', 'Polish'
];

const dietaryPreferences = [
  'Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo',
  'Gluten-Free', 'Dairy-Free', 'Raw Food', 'Mediterranean'
];

const Events = () => {
  const { toast } = useToast();
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [attendingEvents, setAttendingEvents] = useState<number[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<number[]>([]);

  const [events] = useState([
    {
      id: 1,
      title: 'Sunset Photography Walk',
      description: 'Join us for a magical golden hour photography session at the beach. Perfect for beginners and pros alike!',
      date: '2024-07-15',
      time: '18:00',
      location: 'Ocean Beach, SF',
      attendees: 24,
      maxAttendees: 30,
      price: 0,
      category: 'Photography',
      organizer: {
        name: 'Sarah Chen',
        avatar: '/placeholder.svg',
        isProfessional: true,
        instagram: '@sarahphoto_sf',
        website: 'https://sarahchen.photography',
        allowDiscussion: true
      },
      hobbies: ['Photography', 'Hiking'],
      passions: ['Art', 'Nature'],
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Vegan Cooking Workshop',
      description: 'Learn to make delicious plant-based meals with fresh, local ingredients. All skill levels welcome!',
      date: '2024-07-18',
      time: '14:00',
      location: 'Community Kitchen, Mission',
      attendees: 18,
      maxAttendees: 20,
      price: 35,
      category: 'Cooking',
      organizer: {
        name: 'Green Earth Cooking',
        avatar: '/placeholder.svg',
        isProfessional: true,
        instagram: '@greenearthcooking',
        website: 'https://greenearthcooking.com',
        allowDiscussion: true
      },
      hobbies: ['Cooking'],
      passions: ['Health', 'Environment'],
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Live Music at The Park',
      description: 'Enjoy an evening of live music with local bands in a relaxed park setting. Bring your picnic blanket!',
      date: '2024-07-22',
      time: '19:00',
      location: 'Golden Gate Park',
      attendees: 42,
      maxAttendees: 50,
      price: 15,
      category: 'Music',
      organizer: {
        name: 'Park Sounds Collective',
        avatar: '/placeholder.svg',
        isProfessional: false,
        instagram: '@parksounds',
        website: null,
        allowDiscussion: false
      },
      hobbies: ['Music', 'Dancing'],
      passions: ['Art', 'Community'],
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Urban Sketching Meetup',
      description: 'Explore the city and capture its beauty through sketching. All skill levels are welcome!',
      date: '2024-07-25',
      time: '10:00',
      location: 'Ferry Building',
      attendees: 12,
      maxAttendees: 15,
      price: 0,
      category: 'Art',
      organizer: {
        name: 'City Sketchers',
        avatar: '/placeholder.svg',
        isProfessional: false,
        instagram: '@citysketchers',
        website: null,
        allowDiscussion: false
      },
      hobbies: ['Painting', 'Writing'],
      passions: ['Art', 'Culture'],
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Beach Cleanup',
      description: 'Join us in making our beaches cleaner and safer for everyone. Gloves and bags provided.',
      date: '2024-07-29',
      time: '11:00',
      location: 'Baker Beach',
      attendees: 30,
      maxAttendees: 40,
      price: 0,
      category: 'Environment',
      organizer: {
        name: 'Eco Warriors SF',
        avatar: '/placeholder.svg',
        isProfessional: false,
        instagram: '@ecowarriorssf',
        website: null,
        allowDiscussion: false
      },
      hobbies: ['Hiking', 'Gardening'],
      passions: ['Environment', 'Community'],
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Board Games Night',
      description: 'Bring your favorite board game or try something new. A fun night for all board game enthusiasts!',
      date: '2024-08-01',
      time: '18:30',
      location: 'Local Game Store',
      attendees: 16,
      maxAttendees: 20,
      price: 5,
      category: 'Gaming',
      organizer: {
        name: 'Game Night SF',
        avatar: '/placeholder.svg',
        isProfessional: false,
        instagram: '@gamenightsf',
        website: null,
        allowDiscussion: false
      },
      hobbies: ['Chess', 'Board Games'],
      passions: ['Community', 'Fun'],
      image: '/placeholder.svg'
    }
  ]);

  const handleAttendance = (eventId: number, type: 'attending' | 'interested') => {
    if (type === 'attending') {
      if (attendingEvents.includes(eventId)) {
        setAttendingEvents(attendingEvents.filter(id => id !== eventId));
        toast({
          title: "Attendance cancelled",
          description: "You're no longer attending this event.",
        });
      } else {
        setAttendingEvents([...attendingEvents, eventId]);
        setInterestedEvents(interestedEvents.filter(id => id !== eventId));
        toast({
          title: "Attendance confirmed!",
          description: "You're now attending this event.",
        });
      }
    } else {
      if (interestedEvents.includes(eventId)) {
        setInterestedEvents(interestedEvents.filter(id => id !== eventId));
        toast({
          title: "Interest removed",
          description: "You're no longer interested in this event.",
        });
      } else {
        setInterestedEvents([...interestedEvents, eventId]);
        setAttendingEvents(attendingEvents.filter(id => id !== eventId));
        toast({
          title: "Interest marked!",
          description: "You're now interested in this event.",
        });
      }
    }
  };

  const openDiscussion = (eventTitle: string) => {
    toast({
      title: "Discussion opened",
      description: `Joining discussion for "${eventTitle}"`,
    });
    // Here you would navigate to the discussion chat
  };

  const visitProfile = (organizerName: string, website?: string) => {
    if (website) {
      window.open(website, '_blank');
    } else {
      toast({
        title: "Profile viewed",
        description: `Viewing ${organizerName}'s profile`,
      });
    }
  };

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const filteredEvents = events.filter(event => {
    const hobbyMatch = selectedHobbies.length === 0 || event.hobbies.some(hobby => selectedHobbies.includes(hobby));
    const passionMatch = selectedPassions.length === 0 || event.passions.some(passion => selectedPassions.includes(passion));
    return hobbyMatch && passionMatch;
  });

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center text-white mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-4xl font-bold tribal-font">Gather</h1>
          <p className="text-lg tribal-text">Discover events that match your tribe</p>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <Button onClick={() => setShowFilters(!showFilters)} className="w-full tribal-button-outline">
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          {showFilters && (
            <Card className="mt-4 p-4 tribal-card">
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900">Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby) => (
                      <Badge
                        key={hobby}
                        variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                        className={`cursor-pointer p-2 text-center justify-center transition-all hover:scale-105 ${
                          selectedHobbies.includes(hobby)
                            ? 'tribal-badge'
                            : 'tribal-badge-outline'
                        }`}
                        onClick={() => toggleHobby(hobby)}
                      >
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold tribal-font text-lg mb-3 text-amber-900">Passions</h3>
                  <div className="flex flex-wrap gap-2">
                    {passions.map((passion) => (
                      <Badge
                        key={passion}
                        variant={selectedPassions.includes(passion) ? "default" : "outline"}
                        className={`cursor-pointer p-2 text-center justify-center transition-all hover:scale-105 ${
                          selectedPassions.includes(passion)
                            ? 'tribal-badge'
                            : 'tribal-badge-outline'
                        }`}
                        onClick={() => togglePassion(passion)}
                      >
                        {passion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="tribal-card overflow-hidden">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="tribal-badge">
                    {event.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold tribal-font text-amber-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="tribal-text text-sm mb-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center justify-between mb-4 p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback className="bg-orange-200 text-orange-800">
                        {event.organizer.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm tribal-text">{event.organizer.name}</span>
                        {event.organizer.isProfessional && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                            Pro
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {event.organizer.instagram && (
                          <Button
                            onClick={() => window.open(`https://instagram.com/${event.organizer.instagram.replace('@', '')}`, '_blank')}
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs"
                          >
                            <Instagram className="w-3 h-3 mr-1" />
                            {event.organizer.instagram}
                          </Button>
                        )}
                        {event.organizer.website && (
                          <Button
                            onClick={() => visitProfile(event.organizer.name, event.organizer.website)}
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs"
                          >
                            <Link className="w-3 h-3 mr-1" />
                            Website
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center tribal-text">
                    <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center tribal-text">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center tribal-text">
                    <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center tribal-text">
                    <Users className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="text-sm">{event.attendees}/{event.maxAttendees}</span>
                  </div>
                </div>

                {/* Interest Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {event.hobbies.map((hobby) => (
                      <Badge key={hobby} className="tribal-badge bg-blue-100 text-blue-800 border-blue-200 text-xs">
                        {hobby}
                      </Badge>
                    ))}
                    {event.passions.map((passion) => (
                      <Badge key={passion} className="tribal-badge bg-green-100 text-green-800 border-green-200 text-xs">
                        {passion}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-bold text-lg tribal-font text-amber-900">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAttendance(event.id, 'attending')}
                    className={`flex-1 ${
                      attendingEvents.includes(event.id)
                        ? 'tribal-button'
                        : 'tribal-button-outline'
                    }`}
                  >
                    {attendingEvents.includes(event.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Attending
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Attend
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => handleAttendance(event.id, 'interested')}
                    variant="outline"
                    className={`flex-1 ${
                      interestedEvents.includes(event.id)
                        ? 'border-pink-300 bg-pink-50 text-pink-700'
                        : 'tribal-button-outline'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${
                      interestedEvents.includes(event.id) ? 'fill-current' : ''
                    }`} />
                    Interested
                  </Button>

                  {event.organizer.allowDiscussion && (
                    <Button
                      onClick={() => openDiscussion(event.title)}
                      variant="outline"
                      className="tribal-button-outline"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
