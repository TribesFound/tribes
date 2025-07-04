
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, MapPin, Briefcase, Heart, Camera, Share2, MessageCircle, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/ui/file-upload';

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { toast } = useToast();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState('/placeholder.svg');
  
  const isOwnProfile = !userId;

  const profileData = {
    name: 'Alex Rivera',
    age: 28,
    bio: 'Adventure seeker and coffee enthusiast. Love exploring new places and meeting interesting people. Always up for a good conversation over coffee or exploring the city.',
    location: 'San Francisco, CA',
    profession: 'UX Designer',
    interests: ['Photography', 'Hiking', 'Cooking', 'Travel', 'Art'],
    photos: [
      profilePhoto,
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    stats: {
      connections: 127,
      events: 23,
      matches: 45
    }
  };

  const handlePhotoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfilePhoto(url);
    toast({
      title: "Photo uploaded!",
      description: "Your profile photo has been updated",
    });
  };

  const handleShare = () => {
    toast({
      title: "Profile shared!",
      description: "Profile link copied to clipboard",
    });
  };

  const handleMessage = () => {
    navigate(`/chat/${userId}`);
  };

  const handleAddFriend = () => {
    toast({
      title: "Friend request sent!",
      description: `You've sent a friend request to ${profileData.name}`,
    });
  };

  return (
    <div className="min-h-screen tribal-gradient p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold tribal-font text-white">
              {isOwnProfile ? 'My Profile' : profileData.name}
            </h1>
          </div>
          {isOwnProfile && (
            <Button
              onClick={() => navigate('/settings')}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-orange-200/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="tribal-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 ring-4 ring-orange-200">
                    <AvatarImage src={profileData.photos[currentPhotoIndex]} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white text-2xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isOwnProfile && (
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                      <FileUpload onFileSelect={handlePhotoUpload}>
                        <Camera className="w-4 h-4 text-orange-600 cursor-pointer" />
                      </FileUpload>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold tribal-font text-amber-900">
                    {profileData.name}, {profileData.age}
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-700">{profileData.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-700">{profileData.profession}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 w-full">
                  {isOwnProfile ? (
                    <>
                      <Button onClick={handleShare} className="flex-1 tribal-button-outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button onClick={() => navigate('/edit-profile')} className="flex-1 tribal-button">
                        Edit Profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleMessage} className="flex-1 tribal-button">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button onClick={handleAddFriend} className="flex-1 tribal-button-outline">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Friend
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="tribal-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold tribal-font text-amber-900">
                    {profileData.stats.connections}
                  </div>
                  <div className="text-sm text-amber-700">Connections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold tribal-font text-amber-900">
                    {profileData.stats.events}
                  </div>
                  <div className="text-sm text-amber-700">Events</div>
                </div>
                <div>
                  <div className="text-2xl font-bold tribal-font text-amber-900">
                    {profileData.stats.matches}
                  </div>
                  <div className="text-sm text-amber-700">Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          <Card className="tribal-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tribal-font text-amber-900 mb-4">Photos</h3>
              <div className="grid grid-cols-3 gap-3">
                {profileData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${
                      currentPhotoIndex === index ? 'ring-2 ring-orange-400' : ''
                    }`}
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card className="tribal-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tribal-font text-amber-900 mb-4">About</h3>
              <p className="text-amber-700 leading-relaxed">{profileData.bio}</p>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="tribal-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tribal-font text-amber-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <Badge key={index} className="tribal-badge">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
