
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera, Check, X, Plus, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/ui/file-upload';

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: 'Jordan Smith',
    age: 26,
    location: 'San Francisco, CA',
    bio: 'Adventure seeker and tech enthusiast. Love capturing moments through photography and exploring new places.',
    lookingFor: 'Meaningful connections and outdoor adventure partners',
    hobbies: ['Photography', 'Hiking', 'Cooking', 'Reading', 'Yoga'],
    passions: ['Technology', 'Travel', 'Art', 'Science', 'Environment'],
    languages: ['English', 'Spanish', 'French'],
    avatar: '/placeholder.svg',
    additionalPhotos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
  });

  const [newHobby, setNewHobby] = useState('');
  const [newPassion, setNewPassion] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = async (file: File, isMainPhoto = false) => {
    setUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const photoUrl = URL.createObjectURL(file);
      
      if (isMainPhoto) {
        setProfile(prev => ({ ...prev, avatar: photoUrl }));
        toast({
          title: "Profile photo updated!",
          description: "Your main photo has been updated.",
        });
      } else {
        // Add to additional photos
        setProfile(prev => ({
          ...prev,
          additionalPhotos: [...prev.additionalPhotos, photoUrl]
        }));
        toast({
          title: "Photo added!",
          description: "Photo has been added to your gallery.",
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    setProfile(prev => ({
      ...prev,
      additionalPhotos: prev.additionalPhotos.filter((_, i) => i !== index)
    }));
    toast({
      title: "Photo removed",
      description: "Photo has been removed from your gallery.",
    });
  };

  const addHobby = () => {
    if (newHobby.trim() && !profile.hobbies.includes(newHobby.trim())) {
      setProfile(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const removeHobby = (hobby: string) => {
    setProfile(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h !== hobby)
    }));
  };

  const addPassion = () => {
    if (newPassion.trim() && !profile.passions.includes(newPassion.trim())) {
      setProfile(prev => ({
        ...prev,
        passions: [...prev.passions, newPassion.trim()]
      }));
      setNewPassion('');
    }
  };

  const removePassion = (passion: string) => {
    setProfile(prev => ({
      ...prev,
      passions: prev.passions.filter(p => p !== passion)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
      action: <Check className="w-4 h-4 text-green-600" />
    });
  };

  const handleChangePassword = () => {
    navigate('/passcode-entry', { state: { returnTo: '/passcode-setup' } });
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
          <h1 className="text-2xl font-bold tribal-font text-white">Edit Profile</h1>
          <div className="w-8"></div>
        </div>

        <Card className="tribal-card">
          <CardContent className="p-6 space-y-6">
            {/* Profile Photo */}
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-orange-200">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white text-3xl tribal-font">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <FileUpload onFileSelect={(file) => handlePhotoUpload(file, true)}>
                  <Button
                    className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 tribal-button"
                    disabled={uploading}
                  >
                    {uploading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Camera className="w-5 h-5" />}
                  </Button>
                </FileUpload>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="tribal-text font-medium">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="tribal-input"
                />
              </div>

              <div>
                <Label htmlFor="age" className="tribal-text font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="tribal-input"
                />
              </div>

              <div>
                <Label htmlFor="location" className="tribal-text font-medium">Location (Cannot be changed)</Label>
                <Input
                  id="location"
                  value={profile.location}
                  disabled
                  className="tribal-input bg-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="tribal-text font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="tribal-input"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="lookingFor" className="tribal-text font-medium">Looking For</Label>
                <Textarea
                  id="lookingFor"
                  value={profile.lookingFor}
                  onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                  className="tribal-input"
                  rows={2}
                />
              </div>
            </div>

            {/* Additional Photos */}
            <div>
              <Label className="tribal-text font-medium mb-3 block">Additional Photos</Label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {profile.additionalPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg ring-2 ring-orange-200"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                {profile.additionalPhotos.length < 5 && (
                  <FileUpload onFileSelect={(file) => handlePhotoUpload(file, false)}>
                    <div className="w-full h-20 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-50">
                      <Plus className="w-6 h-6 text-orange-600" />
                    </div>
                  </FileUpload>
                )}
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <Label className="tribal-text font-medium mb-3 block">Hobbies</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.hobbies.map((hobby) => (
                  <Badge key={hobby} className="tribal-badge">
                    {hobby}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => removeHobby(hobby)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  placeholder="Add hobby"
                  className="tribal-input"
                />
                <Button onClick={addHobby} className="tribal-button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Passions */}
            <div>
              <Label className="tribal-text font-medium mb-3 block">Passions</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.passions.map((passion) => (
                  <Badge key={passion} className="tribal-badge">
                    {passion}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => removePassion(passion)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newPassion}
                  onChange={(e) => setNewPassion(e.target.value)}
                  placeholder="Add passion"
                  className="tribal-input"
                />
                <Button onClick={addPassion} className="tribal-button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Languages */}
            <div>
              <Label className="tribal-text font-medium mb-3 block">Languages</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.languages.map((language) => (
                  <Badge key={language} className="tribal-badge bg-blue-100 text-blue-800 border-blue-200">
                    {language}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => removeLanguage(language)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add language"
                  className="tribal-input"
                />
                <Button onClick={addLanguage} className="tribal-button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <Button 
              onClick={handleSave}
              className="w-full tribal-button"
              size="lg"
            >
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Save Changes
            </Button>

            {/* Go Back to Discover */}
            <Button 
              onClick={() => navigate('/discover')}
              variant="outline"
              className="w-full tribal-button-outline"
              size="lg"
            >
              Go Back to Discover
            </Button>

            {/* Change Password */}
            <Button 
              onClick={handleChangePassword}
              variant="outline"
              className="w-full tribal-button-outline"
              size="lg"
            >
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
