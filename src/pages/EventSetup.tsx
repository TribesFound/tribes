
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, MapPin, Users, DollarSign, Crown, ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { eventCategories, EventCategory } from '@/utils/eventTypes';

const EventSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: eventCategories[0],
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      venue: ''
    },
    date: '',
    time: '',
    duration: 120,
    maxAttendees: undefined as number | undefined,
    minAttendees: undefined as number | undefined,
    price: 0,
    paymentRequired: false,
    paymentUrl: '',
    requirements: [] as string[],
    whatToBring: [] as string[],
    ageRestriction: {
      min: 18,
      max: undefined as number | undefined
    },
    isRecurring: false,
    requiresApproval: false,
    isPrivate: false
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newWhatToBring, setNewWhatToBring] = useState('');

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEventData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setEventData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCategorySelect = (category: EventCategory) => {
    setEventData(prev => ({ ...prev, category }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setEventData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setEventData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addWhatToBring = () => {
    if (newWhatToBring.trim()) {
      setEventData(prev => ({
        ...prev,
        whatToBring: [...prev.whatToBring, newWhatToBring.trim()]
      }));
      setNewWhatToBring('');
    }
  };

  const removeWhatToBring = (index: number) => {
    setEventData(prev => ({
      ...prev,
      whatToBring: prev.whatToBring.filter((_, i) => i !== index)
    }));
  };

  const handleCreateEvent = () => {
    if (!eventData.title || !eventData.date || !eventData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, date, time)",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Created!",
      description: `${eventData.title} has been created successfully`,
    });

    setTimeout(() => {
      navigate('/events');
    }, 1500);
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/events')}
            className="text-white hover:bg-orange-100/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold tribal-font text-white">Create Event</h1>
          <div className="w-8"></div>
        </div>

        <Card className="tribal-card">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-500" />
              Professional Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="tribal-text font-medium">Event Title *</Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  className="tribal-input"
                />
              </div>

              <div>
                <Label htmlFor="description" className="tribal-text font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your event..."
                  className="tribal-input resize-none min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <Label className="tribal-text font-medium mb-3 block">Event Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {eventCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={eventData.category.id === category.id ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                      eventData.category.id === category.id 
                        ? 'tribal-button' 
                        : 'tribal-button-outline'
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-xs text-center">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="tribal-text font-medium">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="tribal-input"
                />
              </div>
              <div>
                <Label htmlFor="time" className="tribal-text font-medium">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={eventData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="tribal-input"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Label className="tribal-text font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </Label>
              <div className="space-y-2">
                <Input
                  placeholder="Venue name"
                  value={eventData.location.venue}
                  onChange={(e) => handleInputChange('location.venue', e.target.value)}
                  className="tribal-input"
                />
                <Input
                  placeholder="Street address"
                  value={eventData.location.address}
                  onChange={(e) => handleInputChange('location.address', e.target.value)}
                  className="tribal-input"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="City"
                    value={eventData.location.city}
                    onChange={(e) => handleInputChange('location.city', e.target.value)}
                    className="tribal-input"
                  />
                  <Input
                    placeholder="ZIP"
                    value={eventData.location.zipCode}
                    onChange={(e) => handleInputChange('location.zipCode', e.target.value)}
                    className="tribal-input"
                  />
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxAttendees" className="tribal-text font-medium">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={eventData.maxAttendees || ''}
                  onChange={(e) => handleInputChange('maxAttendees', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="No limit"
                  className="tribal-input"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="tribal-text font-medium">Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={eventData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  className="tribal-input"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <Label className="tribal-text font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Pricing
              </Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="tribal-text">Payment Required</span>
                  <Button
                    variant={eventData.paymentRequired ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange('paymentRequired', !eventData.paymentRequired)}
                    className={eventData.paymentRequired ? 'tribal-button' : 'tribal-button-outline'}
                  >
                    {eventData.paymentRequired ? 'Yes' : 'No'}
                  </Button>
                </div>
                
                {eventData.paymentRequired && (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Price ($)"
                      value={eventData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      className="tribal-input"
                    />
                    <Input
                      placeholder="Payment URL (external link)"
                      value={eventData.paymentUrl}
                      onChange={(e) => handleInputChange('paymentUrl', e.target.value)}
                      className="tribal-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Create Event Button */}
            <Button 
              onClick={handleCreateEvent}
              className="w-full tribal-button"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventSetup;
