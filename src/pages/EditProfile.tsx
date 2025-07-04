
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera, Upload, X, Plus, Check, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/ui/file-upload';

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: 'Alex Rivera',
    bio: 'Adventure seeker and coffee enthusiast. Love exploring new places and meeting interesting people.',
    location: 'San Francisco, CA',
    interests: ['Photography', 'Hiking', 'Cooking', 'Travel', 'Art'],
    hobbies: ['Rock Climbing', 'Guitar', 'Reading', 'Yoga']
  });
  
  const [profilePhoto, setProfilePhoto] = useState('/placeholder.svg');
  const [additionalPhotos, setAdditionalPhotos] = useState([
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ]);
  
  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (file: File, index?: number) => {
    const url = URL.createObjectURL(file);
    if (index === undefined) {
      setProfilePhoto(url);
    } else {
      setAdditionalPhotos(prev => {
        const newPhotos = [...prev];
        newPhotos[index] = url;
        return newPhotos;
      });
    }
  };

  const removePhoto = (index: number) => {
    setAdditionalPhotos(prev => {
      const newPhotos = [...prev];
      newPhotos[index] = '/placeholder.svg';
      return newPhotos;
    });
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      setProfileData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const removeHobby = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully",
    });
    
    // Simulate saving to backend
    setTimeout(() => {
      toast({
        title: "✅ Changes saved",
        description: "Your profile has been updated",
      });
    }, 1000);
  };

  const handleGoToDiscover = () => {
    navigate('/discover');
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
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
          <h1 className="text-2xl font-bold tribal-font text-white">Edit Profile</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Photo Section */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900">Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24 ring-4 ring-orange-200">
                  <AvatarImage src={profilePhoto} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white text-xl">
                    AR
                  </AvatarFallback>
                </Avatar>
                <FileUpload onFileSelect={(file) => handlePhotoUpload(file)}>
                  <Button className="tribal-button">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Profile Photo
                  </Button>
                </FileUpload>
              </div>
            </CardContent>
          </Card>

          {/* Additional Photos */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900">Additional Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {additionalPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <FileUpload onFileSelect={(file) => handlePhotoUpload(file, index)}>
                          <Button size="sm" variant="secondary">
                            <Upload className="w-3 h-3" />
                          </Button>
                        </FileUpload>
                        {photo !== '/placeholder.svg' && (
                          <Button size="sm" variant="destructive" onClick={() => removePhoto(index)}>
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="tribal-input mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="tribal-input mt-2"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="location">Location (Cannot be changed)</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  disabled
                  className="tribal-input mt-2 bg-gray-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900">Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <Badge key={index} className="tribal-badge">
                    {interest}
                    <button
                      onClick={() => removeInterest(index)}
                      className="ml-2 text-amber-600 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add new interest"
                  className="tribal-input"
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button onClick={addInterest} className="tribal-button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hobbies */}
          <Card className="tribal-card">
            <CardHeader>
              <CardTitle className="text-lg tribal-font text-amber-900">Hobbies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.hobbies.map((hobby, index) => (
                  <Badge key={index} className="tribal-badge-outline">
                    {hobby}
                    <button
                      onClick={() => removeHobby(index)}
                      className="ml-2 text-amber-600 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  placeholder="Add new hobby"
                  className="tribal-input"
                  onKeyPress={(e) => e.key === 'Enter' && addHobby()}
                />
                <Button onClick={addHobby} className="tribal-button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes */}
          <div className="space-y-4">
            <Button onClick={handleSave} className="w-full tribal-button text-lg py-6">
              <Check className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
            
            <Button onClick={handleGoToDiscover} className="w-full tribal-button-outline">
              Go back to Discover
            </Button>
          </div>

          {/* Change Password */}
          <Card className="tribal-card">
            <CardContent className="pt-6">
              <Button 
                onClick={() => navigate('/password-change')}
                className="w-full tribal-button-outline"
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
