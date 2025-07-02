import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import EventCard from '@/components/EventCard';
import BusinessProfile from '@/components/BusinessProfile';
import { Search, Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('events');

  // Mock data - replace with real API calls
  const mockEvents = [
    {
      id: '1',
      title: 'Hiking Adventure at Sunrise Peak',
      description: 'Join us for an early morning hike to catch the beautiful sunrise at the peak. Perfect for photography enthusiasts and nature lovers.',
      date: '2024-01-15',
      time: '6:00 AM',
      location: 'Sunrise Peak Trail, Mountain View',
      organizer: {
        name: 'Mountain Adventures Co.',
        avatar: '/placeholder.svg',
        businessProfile: true
      },
      attendees: 12,
      maxAttendees: 20,
      category: 'Outdoor',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Coffee & Connect Meetup',
      description: 'Casual networking event for local professionals. Great opportunity to make new connections and share ideas.',
      date: '2024-01-18',
      time: '7:00 PM',
      location: 'Downtown Coffee House',
      organizer: {
        name: 'Sarah Chen',
        avatar: '/placeholder.svg',
        businessProfile: false
      },
      attendees: 8,
      maxAttendees: 15,
      category: 'Networking',
      imageUrl: '/placeholder.svg'
    }
  ];

  const mockBusinesses = [
    {
      id: '1',
      name: 'Mountain Adventures Co.',
      description: 'Your premier outdoor adventure company specializing in hiking, camping, and wilderness experiences.',
      category: 'Outdoor Recreation',
      location: 'Mountain View, CA',
      hours: 'Mon-Sun: 6:00 AM - 8:00 PM',
      phone: '(555) 123-4567',
      website: 'mountainadventures.com',
      rating: 4.8,
      reviewCount: 124,
      avatar: '/placeholder.svg',
      coverImage: '/placeholder.svg',
      verified: true
    },
    {
      id: '2',
      name: 'Brew & Bond Cafe',
      description: 'Cozy cafe perfect for meetings, dates, and community gatherings. Locally sourced coffee and pastries.',
      category: 'Food & Beverage',
      location: 'Downtown District',
      hours: 'Mon-Fri: 6:00 AM - 10:00 PM, Weekends: 7:00 AM - 11:00 PM',
      phone: '(555) 987-6543',
      website: 'brewandbond.com',
      rating: 4.6,
      reviewCount: 89,
      avatar: '/placeholder.svg',
      coverImage: '/placeholder.svg',
      verified: true
    }
  ];

  const handleCreateEvent = () => {
    navigate('/event-setup');
  };

  const handleJoinEvent = (eventId: string) => {
    toast({
      title: "Event joined!",
      description: "You've successfully joined the event. Check your calendar for details.",
    });
  };

  const handleViewEventDetails = (eventId: string) => {
    toast({
      title: "Event details",
      description: "Event details page will be available soon!",
    });
  };

  const handleContactBusiness = (businessId: string) => {
    toast({
      title: "Contact business",
      description: "Business contact feature will be available soon!",
    });
  };

  const handleViewBusinessEvents = (businessId: string) => {
    setActiveTab('events');
    toast({
      title: "Business events",
      description: "Showing events from this business.",
    });
  };

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBusinesses = mockBusinesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen cave-gradient pb-20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-orange-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold cave-font text-amber-900">Events</h1>
          <Button className="cave-button" onClick={handleCreateEvent}>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
          <Input
            placeholder="Search events and businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cave-input pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 cave-card">
            <TabsTrigger 
              value="events" 
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-amber-900"
            >
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="businesses"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-amber-900"
            >
              Businesses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onJoin={handleJoinEvent}
                      onViewDetails={handleViewEventDetails}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-amber-600">No events found matching your search.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="businesses" className="mt-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((business) => (
                    <BusinessProfile
                      key={business.id}
                      business={business}
                      onContact={handleContactBusiness}
                      onViewEvents={handleViewBusinessEvents}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-amber-600">No businesses found matching your search.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
