
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventType } from '@/utils/eventTypes';

const EventSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: {
      address: '',
      city: '',
      coordinates: { lat: 0, lng: 0 }
    },
    maxAttendees: '',
    isPaid: false,
    price: '',
    tags: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, child: string, value: any) => {
    setEventData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as object),
        [child]: value
      }
    }));
  };

  const handleSubmit = () => {
    if (!eventData.title || !eventData.description || !eventData.category || !eventData.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Save event data to localStorage for now
    const events = JSON.parse(localStorage.getItem('user_events') || '[]');
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdBy: 'current_user',
      attendees: [],
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    localStorage.setItem('user_events', JSON.stringify(events));

    toast({
      title: "Event created!",
      description: "Your event has been successfully created",
    });

    navigate('/events');
  };

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/events')}
            className="text-white hover:bg-orange-200/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Create Event</h1>
        </div>

        <div className="space-y-6">
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="cave-input mt-2 min-h-[100px]"
                  placeholder="Describe your event..."
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={eventData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="cave-input mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="recreational">Recreational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="cave-input mt-2"
                />
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={eventData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="cave-input mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={eventData.location.address}
                  onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="Street address"
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={eventData.location.city}
                  onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="City"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={eventData.maxAttendees}
                  onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="Maximum number of attendees"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full cave-button text-lg py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventSetup;
