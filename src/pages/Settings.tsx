import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, Crown, Bell, Shield, Instagram, Phone, LogOut } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    matches: true,
    messages: true,
    events: false,
    promotions: false
  });

  const [digitalOnly, setDigitalOnly] = useState(false);

  const userSubscription = {
    tier: 'Free',
    canUpgrade: true
  };

  const connectedAccounts = {
    spotify: false,
    instagram: false,
    soundcloud: false
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold tribal-font text-white">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900 flex items-center">
                <SettingsIcon className="w-5 h-5 mr-2" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/edit-profile')}
                className="w-full tribal-button-outline justify-start"
              >
                Edit Profile Information
              </Button>
              <Button 
                onClick={() => navigate('/business-dashboard')}
                className="w-full tribal-button-outline justify-start"
              >
                Business Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/privacy-settings')}
                className="w-full tribal-button-outline justify-start"
              >
                Privacy & Security
              </Button>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900 flex items-center justify-between">
                <div className="flex items-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Subscription
                </div>
                <Badge className={userSubscription.tier === 'Free' ? 'tribal-badge-outline' : 'tribal-badge'}>
                  {userSubscription.tier}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userSubscription.canUpgrade && (
                <Button 
                  onClick={() => navigate('/subscription')}
                  className="w-full tribal-button"
                >
                  Upgrade to Premium
                </Button>
              )}
              {userSubscription.tier !== 'Free' && (
                <div className="text-sm text-amber-700 mt-2">
                  <p>Next billing: January 20, 2024</p>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0">
                    Cancel Subscription
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Connected Accounts */}
          {userSubscription.tier !== 'Free' && (
            <Card className="tribal-card">
              <CardHeader>
                <CardTitle className="text-lg tribal-font text-amber-900">
                  Connected Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Instagram className="w-5 h-5 mr-2 text-pink-600" />
                    <span>Instagram</span>
                  </div>
                  <Button 
                    variant={connectedAccounts.instagram ? 'destructive' : 'default'}
                    size="sm"
                    className={!connectedAccounts.instagram ? 'tribal-button' : ''}
                  >
                    {connectedAccounts.instagram ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-green-600" />
                    <span>Spotify</span>
                  </div>
                  <Button 
                    variant={connectedAccounts.spotify ? 'destructive' : 'default'}
                    size="sm"
                    className={!connectedAccounts.spotify ? 'tribal-button' : ''}
                  >
                    {connectedAccounts.spotify ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="matches">New Matches</Label>
                <Switch
                  id="matches"
                  checked={notifications.matches}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, matches: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="messages">Messages</Label>
                <Switch
                  id="messages"
                  checked={notifications.messages}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, messages: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="events">Events</Label>
                <Switch
                  id="events"
                  checked={notifications.events}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, events: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions">Promotions</Label>
                <Switch
                  id="promotions"
                  checked={notifications.promotions}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, promotions: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="digital-only">Digital-Only Mode</Label>
                  <p className="text-xs text-amber-600 mt-1">
                    Hide your profile from location-based searches
                  </p>
                </div>
                <Switch
                  id="digital-only"
                  checked={digitalOnly}
                  onCheckedChange={setDigitalOnly}
                />
              </div>
              
              <Button 
                onClick={() => navigate('/privacy-settings')}
                className="w-full tribal-button-outline justify-start"
              >
                Advanced Privacy Settings
              </Button>
              <Button className="w-full tribal-button-outline justify-start">
                Privacy Policy
              </Button>
              <Button className="w-full tribal-button-outline justify-start">
                Terms of Service
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="tribal-card">
            <CardContent className="pt-6 space-y-4">
              <Button className="w-full tribal-button-outline justify-start">
                Help & Support
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start bg-red-600 hover:bg-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
