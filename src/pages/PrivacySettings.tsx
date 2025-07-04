
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Flag, 
  UserX, 
  AlertTriangle,
  MapPin,
  Bell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PrivacySettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    locationSharing: true,
    onlineStatus: true,
    readReceipts: true,
    allowMessages: 'connections',
    showAge: true,
    showDistance: true,
    dataCollection: true,
    marketingEmails: false,
    pushNotifications: true
  });

  const [reportData, setReportData] = useState({
    reportType: '',
    description: '',
    userId: ''
  });

  const [blockedUsers] = useState([
    { id: '1', name: 'Anonymous User', blockedAt: '2024-01-10' },
    { id: '2', name: 'Spam Account', blockedAt: '2024-01-05' }
  ]);

  const handleSettingChange = (setting: string, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Privacy setting updated",
      description: "Your privacy preferences have been saved.",
    });
  };

  const handleReport = () => {
    if (!reportData.reportType || !reportData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all report details.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe. We'll review your report.",
    });
    
    setReportData({ reportType: '', description: '', userId: '' });
  };

  const handleUnblock = (userId: string, userName: string) => {
    toast({
      title: "User unblocked",
      description: `${userName} has been unblocked and can now interact with you.`,
    });
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/settings')}
            className="text-white hover:bg-orange-100/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold tribal-font text-white">Privacy & Security</h1>
          <div className="w-8"></div>
        </div>

        {/* Profile Privacy */}
        <Card className="tribal-card">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Profile Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Show Online Status</Label>
                <p className="text-xs tribal-text text-amber-600">Let others see when you're active</p>
              </div>
              <Switch
                checked={settings.onlineStatus}
                onCheckedChange={(checked) => handleSettingChange('onlineStatus', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Location Sharing</Label>
                <p className="text-xs tribal-text text-amber-600">Show your location to nearby users</p>
              </div>
              <Switch
                checked={settings.locationSharing}
                onCheckedChange={(checked) => handleSettingChange('locationSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Show Distance</Label>
                <p className="text-xs tribal-text text-amber-600">Display distance in your profile</p>
              </div>
              <Switch
                checked={settings.showDistance}
                onCheckedChange={(checked) => handleSettingChange('showDistance', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Show Age</Label>
                <p className="text-xs tribal-text text-amber-600">Display your age on profile</p>
              </div>
              <Switch
                checked={settings.showAge}
                onCheckedChange={(checked) => handleSettingChange('showAge', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Message Privacy */}
        <Card className="tribal-card">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Message Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Read Receipts</Label>
                <p className="text-xs tribal-text text-amber-600">Show when you've read messages</p>
              </div>
              <Switch
                checked={settings.readReceipts}
                onCheckedChange={(checked) => handleSettingChange('readReceipts', checked)}
              />
            </div>

            <div>
              <Label className="tribal-text font-medium mb-2 block">Who can message you</Label>
              <div className="space-y-2">
                {['everyone', 'connections', 'friends'].map((option) => (
                  <Button
                    key={option}
                    variant={settings.allowMessages === option ? 'default' : 'outline'}
                    className={`w-full justify-start ${
                      settings.allowMessages === option ? 'tribal-button' : 'tribal-button-outline'
                    }`}
                    onClick={() => handleSettingChange('allowMessages', option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Notifications */}
        <Card className="tribal-card">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Data & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Data Collection</Label>
                <p className="text-xs tribal-text text-amber-600">Help improve our services</p>
              </div>
              <Switch
                checked={settings.dataCollection}
                onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Marketing Emails</Label>
                <p className="text-xs tribal-text text-amber-600">Receive promotional content</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="tribal-text font-medium">Push Notifications</Label>
                <p className="text-xs tribal-text text-amber-600">Get notified of new activity</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Report User */}
        <Card className="tribal-card border-red-200">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <Flag className="w-5 h-5 mr-2" />
              Report a User
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="tribal-text font-medium">Report Type</Label>
              <select
                value={reportData.reportType}
                onChange={(e) => setReportData(prev => ({ ...prev, reportType: e.target.value }))}
                className="w-full p-2 border border-orange-200 rounded-md tribal-input"
              >
                <option value="">Select reason</option>
                <option value="harassment">Harassment</option>
                <option value="spam">Spam</option>
                <option value="fake-profile">Fake Profile</option>
                <option value="inappropriate-content">Inappropriate Content</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label className="tribal-text font-medium">User ID (optional)</Label>
              <Input
                value={reportData.userId}
                onChange={(e) => setReportData(prev => ({ ...prev, userId: e.target.value }))}
                placeholder="Enter user ID or username"
                className="tribal-input"
              />
            </div>

            <div>
              <Label className="tribal-text font-medium">Description</Label>
              <Textarea
                value={reportData.description}
                onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue..."
                className="tribal-input"
                rows={3}
              />
            </div>

            <Button onClick={handleReport} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Flag className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </CardContent>
        </Card>

        {/* Blocked Users */}
        <Card className="tribal-card">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <UserX className="w-5 h-5 mr-2" />
              Blocked Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {blockedUsers.length > 0 ? (
              <div className="space-y-3">
                {blockedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium tribal-text">{user.name}</p>
                      <p className="text-xs tribal-text text-amber-600">
                        Blocked on {new Date(user.blockedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUnblock(user.id, user.name)}
                      className="tribal-button-outline"
                    >
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <UserX className="w-12 h-12 mx-auto text-amber-300 mb-2" />
                <p className="tribal-text">No blocked users</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="tribal-card border-orange-200">
          <CardHeader>
            <CardTitle className="tribal-font text-amber-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Safety Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm tribal-text">
              Your safety is our priority. Use these resources if you need help.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full tribal-button-outline justify-start">
                Safety Tips & Guidelines
              </Button>
              <Button variant="outline" className="w-full tribal-button-outline justify-start">
                Emergency Contacts
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacySettings;
