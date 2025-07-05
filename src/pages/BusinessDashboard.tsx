
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  MessageSquare, 
  Eye,
  ArrowLeft,
  Megaphone,
  Zap,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const handleComingSoon = () => {
    toast({
      title: "COMING SOON",
      description: "This feature will be available in a future update!",
    });
  };

  const stats = [
    { label: 'Profile Views', value: '1,234', icon: Eye, change: '+12%' },
    { label: 'Event Attendees', value: '89', icon: Users, change: '+8%' },
    { label: 'Messages', value: '456', icon: MessageSquare, change: '+15%' },
    { label: 'Events Created', value: '12', icon: Calendar, change: '+3%' }
  ];

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="text-white hover:bg-orange-200/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold cave-font text-white">Business Dashboard</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            onClick={() => setActiveTab('overview')}
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            className={activeTab === 'overview' ? 'cave-button' : 'cave-button-outline'}
            size="sm"
          >
            Overview
          </Button>
          <Button
            onClick={() => setActiveTab('promote')}
            variant={activeTab === 'promote' ? 'default' : 'outline'}
            className={activeTab === 'promote' ? 'cave-button' : 'cave-button-outline'}
            size="sm"
          >
            Promote
          </Button>
          <Button
            onClick={() => setActiveTab('analytics')}
            variant={activeTab === 'analytics' ? 'default' : 'outline'}
            className={activeTab === 'analytics' ? 'cave-button' : 'cave-button-outline'}
            size="sm"
          >
            Analytics
          </Button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="cave-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-amber-700">{stat.label}</p>
                        <p className="text-2xl font-bold cave-font text-amber-900">{stat.value}</p>
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </div>
                      <stat.icon className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="text-lg cave-font text-amber-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => navigate('/event-setup')} className="w-full cave-button">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create New Event
                </Button>
                <Button onClick={() => navigate('/edit-profile')} className="w-full cave-button-outline">
                  <Users className="w-4 h-4 mr-2" />
                  Update Business Profile
                </Button>
                <Button onClick={() => navigate('/subscription')} className="w-full cave-button-outline">
                  <Crown className="w-4 h-4 mr-2" />
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="text-lg cave-font text-amber-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-amber-700">New event attendee registered</p>
                    <Badge className="ml-auto cave-badge">2m ago</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-amber-700">Profile viewed by 12 users</p>
                    <Badge className="ml-auto cave-badge">1h ago</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-sm text-amber-700">New message received</p>
                    <Badge className="ml-auto cave-badge">3h ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'promote' && (
          <div className="space-y-6">
            {/* Coming Soon Message */}
            <Card className="cave-card border-orange-300 bg-orange-50/20">
              <CardContent className="p-6 text-center">
                <Megaphone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold cave-font text-orange-700 mb-2">COMING SOON</h3>
                <p className="text-orange-600">
                  Advanced promotional features are being developed and will be available soon!
                </p>
              </CardContent>
            </Card>

            {/* Profile Boost */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Profile Boost
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-amber-700">Increase your profile visibility and reach more potential customers.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-amber-900">24 Hour Boost</h4>
                      <p className="text-sm text-amber-700">3x more visibility</p>
                    </div>
                    <Button onClick={handleComingSoon} className="cave-button">
                      $4.99
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-amber-900">Weekly Boost</h4>
                      <p className="text-sm text-amber-700">5x more visibility</p>
                    </div>
                    <Button onClick={handleComingSoon} className="cave-button">
                      $19.99
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-amber-900">Monthly Boost</h4>
                      <p className="text-sm text-amber-700">10x more visibility</p>
                    </div>
                    <Button onClick={handleComingSoon} className="cave-button">
                      $59.99
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                  <BarChart className="w-5 h-5 mr-2" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">Profile Completion</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-amber-900">80%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">Engagement Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-amber-900">65%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">Event Success Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-18 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-amber-900">90%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Events */}
            <Card className="cave-card">
              <CardHeader>
                <CardTitle className="text-lg cave-font text-amber-900">Top Performing Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-amber-900">Networking Mixer</h4>
                      <p className="text-sm text-amber-700">45 attendees</p>
                    </div>
                    <Badge className="cave-badge">Top Event</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-amber-900">Product Launch</h4>
                      <p className="text-sm text-amber-700">32 attendees</p>
                    </div>
                    <Badge variant="outline" className="border-amber-300">Popular</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
