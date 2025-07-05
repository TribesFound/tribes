
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Shield, Eye, Users, MapPin, MessageSquare, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PrivacySettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showLocation: true,
    showOnlineStatus: true,
    allowMessages: 'everyone',
    showInterests: true,
    showPhotos: true,
    pushNotifications: true,
    emailNotifications: false,
    readReceipts: true,
    blockScreenshots: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('privacy_settings', JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your privacy settings have been updated successfully",
    });
  };

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/settings')}
            className="text-white hover:bg-orange-200/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Privacy Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Profile Visibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profileVisibility">Who can see my profile</Label>
                <Select 
                  value={settings.profileVisibility} 
                  onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                >
                  <SelectTrigger className="cave-input mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Everyone</SelectItem>
                    <SelectItem value="friends">Friends only</SelectItem>
                    <SelectItem value="private">Only me</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showLocation">Show location</Label>
                  <p className="text-sm text-amber-600">Display your city and distance</p>
                </div>
                <Switch
                  id="showLocation"
                  checked={settings.showLocation}
                  onCheckedChange={(checked) => handleSettingChange('showLocation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showOnlineStatus">Show online status</Label>
                  <p className="text-sm text-amber-600">Let others see when you're active</p>
                </div>
                <Switch
                  id="showOnlineStatus"
                  checked={settings.showOnlineStatus}
                  onCheckedChange={(checked) => handleSettingChange('showOnlineStatus', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showInterests">Show interests</Label>
                  <p className="text-sm text-amber-600">Display your hobbies and interests</p>
                </div>
                <Switch
                  id="showInterests"
                  checked={settings.showInterests}
                  onCheckedChange={(checked) => handleSettingChange('showInterests', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showPhotos">Show all photos</Label>
                  <p className="text-sm text-amber-600">Allow others to see your photo gallery</p>
                </div>
                <Switch
                  id="showPhotos"
                  checked={settings.showPhotos}
                  onCheckedChange={(checked) => handleSettingChange('showPhotos', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Messaging Privacy */}
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Messaging & Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="allowMessages">Who can message me</Label>
                <Select 
                  value={settings.allowMessages} 
                  onValueChange={(value) => handleSettingChange('allowMessages', value)}
                >
                  <SelectTrigger className="cave-input mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="matches">Matches only</SelectItem>
                    <SelectItem value="friends">Friends only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="readReceipts">Read receipts</Label>
                  <p className="text-sm text-amber-600">Show when you've read messages</p>
                </div>
                <Switch
                  id="readReceipts"
                  checked={settings.readReceipts}
                  onCheckedChange={(checked) => handleSettingChange('readReceipts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="blockScreenshots">Block screenshots</Label>
                  <p className="text-sm text-amber-600">Prevent screenshots in private chats</p>
                </div>
                <Switch
                  id="blockScreenshots"
                  checked={settings.blockScreenshots}
                  onCheckedChange={(checked) => handleSettingChange('blockScreenshots', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push notifications</Label>
                  <p className="text-sm text-amber-600">Receive notifications on your device</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email notifications</Label>
                  <p className="text-sm text-amber-600">Receive updates via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Security */}
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Data & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full cave-button-outline"
                onClick={() => {
                  toast({
                    title: "Data export started",
                    description: "You'll receive an email with your data within 24 hours",
                  });
                }}
              >
                Download my data
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full cave-button-outline text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => {
                  toast({
                    title: "Account deletion requested",
                    description: "We're sorry to see you go. Your account will be deleted within 30 days.",
                    variant: "destructive"
                  });
                }}
              >
                Delete my account
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button onClick={handleSaveSettings} className="w-full cave-button text-lg py-6">
            <Shield className="w-5 h-5 mr-2" />
            Save Privacy Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
