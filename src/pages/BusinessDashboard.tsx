
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  Star,
  Share2,
  Target,
  BarChart3
} from 'lucide-react';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  
  const analytics = {
    profileViews: 1247,
    eventViews: 856,
    messages: 34,
    connections: 89,
    eventAttendees: 156,
    rating: 4.8
  };

  const recentEvents = [
    {
      id: 1,
      title: 'Tech Networking Mixer',
      date: '2024-01-15',
      attendees: 45,
      status: 'completed',
      revenue: 675
    },
    {
      id: 2,
      title: 'Startup Pitch Night',
      date: '2024-01-20',
      attendees: 32,
      status: 'upcoming',
      revenue: 0
    }
  ];

  const promotionalTools = [
    {
      id: 'boost',
      name: 'Profile Boost',
      description: 'Increase visibility for 24 hours',
      price: 4.99,
      icon: TrendingUp
    },
    {
      id: 'featured',
      name: 'Featured Event',
      description: 'Promote your next event',
      price: 9.99,
      icon: Star
    },
    {
      id: 'targeted',
      name: 'Targeted Promotion',
      description: 'Reach specific audiences',
      price: 19.99,
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')}
            className="text-white hover:bg-orange-100/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold tribal-font text-white">Business Dashboard</h1>
          <div className="w-8"></div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 tribal-card">
            <TabsTrigger value="analytics" className="tribal-text">Analytics</TabsTrigger>
            <TabsTrigger value="events" className="tribal-text">Events</TabsTrigger>
            <TabsTrigger value="promote" className="tribal-text">Promote</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="tribal-card">
                <CardContent className="p-4 text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold tribal-font text-amber-900">{analytics.profileViews}</div>
                  <div className="text-sm tribal-text">Profile Views</div>
                </CardContent>
              </Card>

              <Card className="tribal-card">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold tribal-font text-amber-900">{analytics.connections}</div>
                  <div className="text-sm tribal-text">Connections</div>
                </CardContent>
              </Card>

              <Card className="tribal-card">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold tribal-font text-amber-900">{analytics.messages}</div>
                  <div className="text-sm tribal-text">Messages</div>
                </CardContent>
              </Card>

              <Card className="tribal-card">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold tribal-font text-amber-900">{analytics.rating}</div>
                  <div className="text-sm tribal-text">Rating</div>
                </CardContent>
              </Card>
            </div>

            {/* Event Performance */}
            <Card className="tribal-card">
              <CardHeader>
                <CardTitle className="tribal-font text-amber-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Event Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="tribal-text">Total Event Views</span>
                  <span className="font-bold tribal-font text-amber-900">{analytics.eventViews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="tribal-text">Total Attendees</span>
                  <span className="font-bold tribal-font text-amber-900">{analytics.eventAttendees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="tribal-text">Conversion Rate</span>
                  <span className="font-bold tribal-font text-amber-900">18.2%</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold tribal-font text-white">Your Events</h3>
              <Button onClick={() => navigate('/event-setup')} className="tribal-button">
                Create Event
              </Button>
            </div>

            <div className="space-y-3">
              {recentEvents.map((event) => (
                <Card key={event.id} className="tribal-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold tribal-font text-amber-900">{event.title}</h4>
                      <Badge className={`tribal-badge ${
                        event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm tribal-text">
                      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                      <p>Attendees: {event.attendees}</p>
                      {event.revenue > 0 && <p>Revenue: ${event.revenue}</p>}
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" className="tribal-button-outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="tribal-button-outline">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="promote" className="space-y-4">
            <h3 className="text-lg font-bold tribal-font text-white">Promotional Tools</h3>
            
            <div className="space-y-4">
              {promotionalTools.map((tool) => (
                <Card key={tool.id} className="tribal-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <tool.icon className="w-6 h-6 text-orange-600" />
                        <div>
                          <h4 className="font-bold tribal-font text-amber-900">{tool.name}</h4>
                          <p className="text-sm tribal-text">{tool.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold tribal-font text-amber-900">${tool.price}</div>
                        <Button size="sm" className="tribal-button mt-1">
                          Purchase
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Promotion History */}
            <Card className="tribal-card">
              <CardHeader>
                <CardTitle className="tribal-font text-amber-900 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Recent Promotions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="tribal-text">No recent promotions</p>
                  <p className="text-sm tribal-text mt-1">Start promoting to boost your visibility!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
