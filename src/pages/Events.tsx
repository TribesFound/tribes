
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Plus, Search, Filter, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventDiscoveryCard from '@/components/EventDiscoveryCard';
import { EnhancedEvent, eventCategories } from '@/utils/eventTypes';
import { useToast } from '@/hooks/use-toast';

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userRSVPs, setUserRSVPs] = useState<{[eventId: string]: 'going' | 'interested' | 'maybe'}>({});

  // Enhanced mock events
  const mockEvents: EnhancedEvent[] = [
    {
      id: '1',
      title: 'Sunset Hiking Adventure',
      description: 'Join us for a beautiful sunset hike through the local trails. Perfect for photographers and nature lovers!',
      category: eventCategories.find(c => c.id === 'adventure')!,
      location: {
        address: '123 Trail Head Dr',
        city: 'Boulder',
        state: 'CO',
        zipCode: '80301',
        venue: 'Chautauqua Park'
      },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      time: '6:00 PM',
      duration: 180,
      maxAttendees: 15,
      price: 0,
      currency: 'USD',
      paymentRequired: false,
      organizer: {
        id: 'org1',
        name: 'Adventure Club',
        avatar: '/placeholder.svg',
        isVerified: true,
        type: 'business'
      },
      images: ['/placeholder.svg'],
      tags: ['hiking', 'sunset', 'photography', 'nature'],
      rsvps: [
        {
          userId: '1',
          userName: 'Sarah',
          userAvatar: '/placeholder.svg',
          status: 'going',
          timestamp: new Date().toISOString()
        },
        {
          userId: '2',
          userName: 'Marcus',
          userAvatar: '/placeholder.svg',
          status: 'interested',
          timestamp: new Date().toISOString()
        }
      ],
      requirements: ['Basic fitness level', 'Comfortable hiking shoes'],
      whatToBring: ['Water bottle', 'Camera', 'Light jacket'],
      features: {
        isRecurring: false,
        allowsGuestList: true,
        requiresApproval: false,
        isPrivate: false,
        hasWaitlist: false
      },
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Yoga & Mindfulness Workshop',
      description: 'Start your weekend with inner peace. A gentle yoga session followed by guided meditation.',
      category: eventCategories.find(c => c.id === 'wellness')!,
      location: {
        address: '456 Wellness Way',
        city: 'Boulder',
        state: 'CO',
        zipCode: '80302',
        venue: 'Serenity Studio'
      },
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      time: '9:00 AM',
      duration: 90,
      maxAttendees: 12,
      price: 25,
      currency: 'USD',
      paymentRequired: true,
      paymentUrl: 'https://example.com/payment',
      organizer: {
        id: 'org2',
        name: 'Maya Chen',
        avatar: '/placeholder.svg',
        isVerified: true,
        type: 'individual'
      },
      images: ['/placeholder.svg'],
      tags: ['yoga', 'mindfulness', 'wellness', 'meditation'],
      rsvps: [
        {
          userId: '3',
          userName: 'Elena',
          userAvatar: '/placeholder.svg',
          status: 'going',
          timestamp: new Date().toISOString()
        }
      ],
      requirements: ['All levels welcome'],
      whatToBring: ['Yoga mat', 'Water bottle', 'Comfortable clothes'],
      features: {
        isRecurring: true,
        recurringPattern: 'weekly',
        allowsGuestList: false,
        requiresApproval: false,
        isPrivate: false,
        hasWaitlist: true
      },
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Tech Networking Mixer',
      description: 'Connect with fellow tech professionals over drinks and appetizers. Great for expanding your network!',
      category: eventCategories.find(c => c.id === 'business')!,
      location: {
        address: '789 Innovation Blvd',
        city: 'Boulder',
        state: 'CO',
        zipCode: '80303',
        venue: 'The Hub'
      },
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      time: '6:30 PM',
      duration: 120,
      maxAttendees: 50,
      price: 15,
      currency: 'USD',
      paymentRequired: true,
      paymentUrl: 'https://example.com/payment',
      organizer: {
        id: 'org3',
        name: 'Boulder Tech Community',
        avatar: '/placeholder.svg',
        isVerified: true,
        type: 'business'
      },
      images: ['/placeholder.svg'],
      tags: ['networking', 'tech', 'professional', 'drinks'],
      rsvps: [
        {
          userId: '2',
          userName: 'Marcus',
          userAvatar: '/placeholder.svg',
          status: 'going',
          timestamp: new Date().toISOString()
        },
        {
          userId: '4',
          userName: 'Jordan',
          userAvatar: '/placeholder.svg',
          status: 'going',
          timestamp: new Date().toISOString()
        }
      ],
      requirements: ['Professional attire recommended'],
      whatToBring: ['Business cards', 'Networking mindset'],
      features: {
        isRecurring: true,
        recurringPattern: 'monthly',
        allowsGuestList: true,
        requiresApproval: true,
        isPrivate: false,
        hasWaitlist: false
      },
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const [events, setEvents] = useState<EnhancedEvent[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<EnhancedEvent[]>(mockEvents);

  useEffect(() => {
    // Load user RSVPs from localStorage
    const savedRSVPs = localStorage.getItem('user_event_rsvps');
    if (savedRSVPs) {
      setUserRSVPs(JSON.parse(savedRSVPs));
    }
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category.id === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);

  const handleRSVP = (eventId: string, status: 'going' | 'interested' | 'maybe') => {
    const updatedRSVPs = { ...userRSVPs, [eventId]: status };
    setUserRSVPs(updatedRSVPs);
    localStorage.setItem('user_event_rsvps', JSON.stringify(updatedRSVPs));

    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: `RSVP Updated!`,
        description: `You're now marked as "${status}" for ${event.title}`,
      });
    }
  };

  const handleViewDetails = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleCreateEvent = () => {
    navigate('/event-setup');
  };

  const myEvents = events.filter(event => 
    Object.keys(userRSVPs).includes(event.id) && userRSVPs[event.id] === 'going'
  );

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold cave-font text-amber-900">Events</h1>
          </div>
          <Button
            onClick={handleCreateEvent}
            className="cave-button"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="discover" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 cave-tabs">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-events">My Events ({myEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-6">
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 cave-input"
                />
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' ? 'cave-button' : 'cave-button-outline'}
                >
                  All
                </Button>
                {eventCategories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`whitespace-nowrap ${
                      selectedCategory === category.id ? 'cave-button' : 'cave-button-outline'
                    }`}
                  >
                    {category.icon} {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <EventDiscoveryCard
                  key={event.id}
                  event={event}
                  onRSVP={handleRSVP}
                  onViewDetails={handleViewDetails}
                  currentUserRSVP={userRSVPs[event.id]}
                />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <Card className="cave-card">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="text-amber-900 text-xl font-semibold mb-2 cave-font">
                    No events found
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Try adjusting your search or browse different categories.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="cave-button"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-events" className="mt-6">
            <div className="space-y-4">
              {myEvents.map(event => (
                <EventDiscoveryCard
                  key={event.id}
                  event={event}
                  onRSVP={handleRSVP}
                  onViewDetails={handleViewDetails}
                  currentUserRSVP={userRSVPs[event.id]}
                />
              ))}
            </div>

            {myEvents.length === 0 && (
              <Card className="cave-card">
                <CardContent className="p-8 text-center">
                  <Users className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="text-amber-900 text-xl font-semibold mb-2 cave-font">
                    No events yet
                  </h3>
                  <p className="text-amber-700 mb-4">
                    RSVP to events to see them here!
                  </p>
                  <Button
                    onClick={() => {
                      const tabsTrigger = document.querySelector('[value="discover"]') as HTMLElement;
                      tabsTrigger?.click();
                    }}
                    className="cave-button"
                  >
                    Discover Events
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
