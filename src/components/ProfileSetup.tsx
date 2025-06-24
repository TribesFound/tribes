
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, X, Check, AlertTriangle } from 'lucide-react';

const hobbies = [
  'Photography', 'Hiking', 'Cooking', 'Reading', 'Gaming', 'Painting',
  'Music', 'Dancing', 'Cycling', 'Yoga', 'Gardening', 'Writing',
  'Traveling', 'Fitness', 'Meditation', 'Crafting', 'Chess', 'Board Games',
  'Rock Climbing', 'Swimming', 'Running', 'Skiing', 'Surfing', 'Fishing',
  'Astronomy', 'Volunteering', 'Languages', 'Martial Arts', 'Pottery', 'Knitting'
];

const interests = [
  'Technology', 'Science', 'History', 'Philosophy', 'Psychology', 'Politics',
  'Environment', 'Health', 'Business', 'Art', 'Literature', 'Movies',
  'TV Shows', 'Podcasts', 'Fashion', 'Food', 'Travel', 'Sports',
  'Spirituality', 'Personal Development', 'Languages', 'Culture', 'Nature', 'Space',
  'Entrepreneurship', 'Social Justice', 'Mental Health', 'Sustainability', 'Innovation', 'Education'
];

const bannedKeywords = [
  'onlyfans', 'fansly', 'premium', 'paypal', 'venmo', 'cashapp', 'snapchat', 
  'instagram', 'telegram', 'whatsapp', 'kik', 'discord'
];

interface ProfileSetupProps {
  onComplete: (profileData: any) => void;
  userVerificationData: any;
}

const ProfileSetup = ({ onComplete, userVerificationData }: ProfileSetupProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalPhotosRef = useRef<HTMLInputElement>(null);

  // Simulated nudity detection
  const detectNudity = async (imageData: string): Promise<boolean> => {
    // In a real app, this would use NSFW.js or a similar library
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random nudity detection for demo
        resolve(Math.random() < 0.1); // 10% chance of "detecting" nudity
      }, 1000);
    });
  };

  const checkForBannedContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return bannedKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handlePhotoUpload = async (file: File, isProfile = true) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      
      try {
        const hasNudity = await detectNudity(imageData);
        if (hasNudity) {
          setUploadError('Image contains inappropriate content and cannot be uploaded');
          return;
        }

        setUploadError('');
        if (isProfile) {
          setProfilePhoto(imageData);
        } else {
          if (additionalPhotos.length < 5) {
            setAdditionalPhotos([...additionalPhotos, imageData]);
          }
        }
      } catch (error) {
        setUploadError('Error processing image');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBioChange = (value: string) => {
    if (value.length <= 500) {
      if (checkForBannedContent(value)) {
        setUploadError('Bio contains prohibited content or links');
        return;
      }
      setUploadError('');
      setBio(value);
    }
  };

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else if (selectedHobbies.length < 10) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const canProceedStep1 = name.trim() && profilePhoto;
  const canProceedStep2 = selectedHobbies.length >= 1 && selectedInterests.length >= 1;

  const handleComplete = () => {
    const profileData = {
      name,
      bio,
      profilePhoto,
      additionalPhotos,
      hobbies: selectedHobbies,
      interests: selectedInterests,
      location: userVerificationData.location,
      verifiedContact: userVerificationData.email || userVerificationData.phone,
      dateOfBirth: userVerificationData.dateOfBirth
    };
    onComplete(profileData);
  };

  return (
    <div className="min-h-screen cave-gradient p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center text-amber-900 mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-4xl font-bold cave-font mb-2">Build Your Tribe Profile</h1>
          <p className="text-lg cave-text">Step {step} of 2</p>
        </div>

        <Card className="cave-card">
          <CardHeader>
            <CardTitle className="text-2xl cave-font text-center text-amber-900">
              {step === 1 ? 'Basic Information' : 'Your Interests & Hobbies'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="text-center">
                  <Label className="text-lg font-semibold mb-4 block cave-text">Profile Photo *</Label>
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Avatar className="w-32 h-32 ring-4 ring-orange-200">
                        <AvatarImage src={profilePhoto || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white text-3xl cave-font">
                          {name ? name[0]?.toUpperCase() : <Camera className="w-12 h-12" />}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 rounded-full w-10 h-10 cave-button p-0"
                      >
                        <Camera className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0], true)}
                    className="hidden"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="cave-text">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="cave-input"
                    placeholder="Your name"
                  />
                </div>

                {/* Location Display */}
                <div className="space-y-2">
                  <Label className="cave-text">Location</Label>
                  <div className="cave-input p-3 bg-orange-50">
                    <span className="cave-text">
                      {userVerificationData.location?.city}, {userVerificationData.location?.country}
                    </span>
                  </div>
                </div>

                {/* Additional Photos */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold cave-text">Additional Photos (Optional - up to 5)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {additionalPhotos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img src={photo} alt={`Additional ${index + 1}`} className="w-full h-24 object-cover rounded-lg ring-2 ring-orange-200" />
                        <Button
                          onClick={() => setAdditionalPhotos(additionalPhotos.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {additionalPhotos.length < 5 && (
                      <Button
                        onClick={() => additionalPhotosRef.current?.click()}
                        className="h-24 border-2 border-dashed border-orange-300 hover:border-orange-400 bg-transparent hover:bg-orange-50 cave-button-outline"
                        variant="outline"
                      >
                        <Upload className="w-6 h-6 text-orange-400" />
                      </Button>
                    )}
                  </div>
                  <input
                    ref={additionalPhotosRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0], false)}
                    className="hidden"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="cave-text">Bio (Optional - max 500 characters)</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => handleBioChange(e.target.value)}
                    className="cave-input min-h-24"
                    placeholder="Tell your tribe about yourself..."
                  />
                  <div className="text-right text-sm cave-text">
                    {bio.length}/500
                  </div>
                </div>

                {uploadError && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm">{uploadError}</span>
                  </div>
                )}

                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full cave-button"
                >
                  Continue to Interests
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Hobbies */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block cave-text">
                    Hobbies * (Select 1-10: {selectedHobbies.length}/10)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hobbies.map((hobby) => (
                      <Badge
                        key={hobby}
                        variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                        className={`cursor-pointer p-3 text-center justify-center transition-all hover:scale-105 ${
                          selectedHobbies.includes(hobby)
                            ? 'cave-badge'
                            : 'cave-badge-outline'
                        }`}
                        onClick={() => toggleHobby(hobby)}
                      >
                        {selectedHobbies.includes(hobby) && <Check className="w-4 h-4 mr-2" />}
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block cave-text">
                    Interests * (Select 1-10: {selectedInterests.length}/10)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer p-3 text-center justify-center transition-all hover:scale-105 ${
                          selectedInterests.includes(interest)
                            ? 'cave-badge'
                            : 'cave-badge-outline'
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {selectedInterests.includes(interest) && <Check className="w-4 h-4 mr-2" />}
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 cave-button-outline"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={!canProceedStep2}
                    className="flex-1 cave-button"
                  >
                    Complete Profile
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
