import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar as CalendarIcon, Upload, X, Edit, Trash2, CreditCard, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface EventFormData {
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  phone?: string;
  email?: string;
  website?: string;
  ticketPrice?: number;
  enableROGPayment: boolean;
  externalPaymentLink?: string;
  maxAttendees: number;
}

const EventSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [eventCreated, setEventCreated] = useState(false);
  const [createdEventId, setCreatedEventId] = useState<string>('');

  const form = useForm<EventFormData>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      time: '',
      phone: '',
      email: '',
      website: '',
      ticketPrice: 0,
      enableROGPayment: false,
      externalPaymentLink: '',
      maxAttendees: 50
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && uploadedImages.length < 5) {
      const newImages: string[] = [];
      Array.from(files).forEach((file, index) => {
        if (uploadedImages.length + newImages.length < 5) {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        }
      });
      setUploadedImages([...uploadedImages, ...newImages]);
      
      toast({
        title: 'Images uploaded',
        description: `${newImages.length} image(s) added successfully.`
      });
    } else if (uploadedImages.length >= 5) {
      toast({
        title: 'Upload limit reached',
        description: 'Maximum 5 images allowed per event.',
        variant: 'destructive'
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
  };

  const onSubmit = (data: EventFormData) => {
    if (!selectedDate) {
      toast({
        title: 'Date required',
        description: 'Please select an event date.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate event creation
    const eventId = `event_${Date.now()}`;
    setCreatedEventId(eventId);
    setEventCreated(true);

    toast({
      title: 'Event created successfully!',
      description: `${data.title} has been created and published.`
    });

    console.log('Event data:', {
      ...data,
      date: selectedDate,
      images: uploadedImages,
      eventId
    });
  };

  const handleEditEvent = () => {
    toast({
      title: 'Edit mode',
      description: 'Event editing functionality will be available soon!'
    });
  };

  const handleCancelEvent = () => {
    toast({
      title: 'Event cancelled',
      description: 'Your event has been cancelled and removed.'
    });
    navigate('/events');
  };

  const handleROGPaymentInfo = () => {
    navigate('/rog-payments');
  };

  if (eventCreated) {
    return (
      <div className="min-h-screen cave-gradient p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="cave-card">
            <CardHeader className="text-center">
              <CardTitle className="cave-font text-amber-900 text-2xl">
                🎉 Event Created Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-amber-700">
                Your event has been published and is now visible to the community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleEditEvent}
                  className="cave-button"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Event
                </Button>
                
                <Button 
                  onClick={handleCancelEvent}
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel Event
                </Button>
                
                <Button 
                  onClick={() => navigate('/events')}
                  variant="outline"
                  className="cave-button-outline"
                >
                  View All Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/events')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold cave-font text-white">Create Event</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Event Details Card */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="cave-font text-amber-900">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: 'Event title is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Event Title *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter event title"
                          className="cave-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: 'Event description is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Description *</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Describe your event..."
                          className="cave-input min-h-[100px] resize-none"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  rules={{ required: 'Event location is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Location *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Event location or address"
                          className="cave-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-amber-800 text-sm font-medium mb-2 block">
                      Date *
                    </label>
                    <Sheet open={showCalendar} onOpenChange={setShowCalendar}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal cave-input"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[400px]">
                        <SheetHeader>
                          <SheetTitle>Select Event Date</SheetTitle>
                        </SheetHeader>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            setShowCalendar(false);
                          }}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border mt-4"
                        />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <FormField
                    control={form.control}
                    name="time"
                    rules={{ required: 'Event time is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-800">Time *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            className="cave-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Max Attendees */}
                <FormField
                  control={form.control}
                  name="maxAttendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Maximum Attendees</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          placeholder="50"
                          className="cave-input"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 50)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="cave-font text-amber-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="cave-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="contact@example.com"
                          className="cave-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Website */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Website (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://example.com"
                          className="cave-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Photo Upload Card */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="cave-font text-amber-900">Event Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-amber-700 mb-2">Upload up to 5 photos</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="cave-button-outline"
                    >
                      Choose Photos
                    </Button>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Integration Card */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="cave-font text-amber-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Ticket Sales & Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="ticketPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">Ticket Price (USD)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="cave-input"
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('ticketPrice') > 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="externalPaymentLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-amber-800">External Payment Link</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="url"
                              placeholder="https://your-payment-page.com"
                              className="cave-input"
                            />
                          </FormControl>
                          <p className="text-xs text-amber-600">
                            Link to your external payment page (Stripe, PayPal, etc.)
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-amber-800">ROG Token Payments</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleROGPaymentInfo}
                          className="text-amber-700 border-amber-300"
                        >
                          Learn More
                        </Button>
                      </div>
                      <p className="text-amber-700 text-sm mb-3">
                        Accept payments in Roots of Gaia (ROG) tokens with only 1% fees!
                      </p>
                      <Button
                        type="button"
                        onClick={handleROGPaymentInfo}
                        className="cave-button w-full"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Set Up ROG Payments
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Create Event Button */}
            <Button
              type="submit"
              className="w-full cave-button text-lg py-6"
              disabled={!form.formState.isValid}
            >
              Create Event
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EventSetup;
