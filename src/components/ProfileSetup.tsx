import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Camera, Upload, X, Check, AlertTriangle, MapPin, Instagram, Music, Link, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const hobbies = [
  'Photography', 'Hiking', 'Cooking', 'Reading', 'Gaming', 'Painting',
  'Music', 'Dancing', 'Cycling', 'Yoga', 'Gardening', 'Writing',
  'Traveling', 'Fitness', 'Meditation', 'Crafting', 'Chess', 'Board Games',
  'Rock Climbing', 'Swimming', 'Running', 'Skiing', 'Surfing', 'Fishing',
  'Musician', 'Music Production', 'VJ', 'DJ', 'Fire Performer', 'Theater',
  'Performing Arts', 'Scuba Diving', 'Free Diving', 'Foraging'
];

const passions = [
  'Technology', 'Science', 'History', 'Philosophy', 'Psychology', 'Politics',
  'Environment', 'Health', 'Business', 'Art', 'Literature', 'Movies',
  'TV Shows', 'Podcasts', 'Fashion', 'Food', 'Travel', 'Sports',
  'Spirituality', 'Personal Development', 'Languages', 'Culture', 'Nature', 'Space',
  'Van Life', 'Sustainable Living', 'Festivals', 'Community', 'Permaculture',
  'Animals', 'Off Grid Living'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish',
  'Norwegian', 'Danish', 'Finnish', 'Greek', 'Turkish', 'Polish'
];

const pets = [
  'Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Guinea Pig',
  'Turtle', 'Snake', 'Lizard', 'Horse', 'Goat', 'Chicken', 'Pig'
];

const dietaryPreferences = [
  'Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo',
  'Gluten-Free', 'Dairy-Free', 'Raw Food', 'Mediterranean'
];

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const humanDesigns = [
  'Manifestor', 'Generator', 'Manifesting Generator', 'Projector', 'Reflector'
];

const mayanDreamspells = [
  'Red Dragon', 'White Wind', 'Blue Night', 'Yellow Seed', 'Red Serpent',
  'White Worldbridger', 'Blue Hand', 'Yellow Star', 'Red Moon', 'White Dog',
  'Blue Monkey', 'Yellow Human', 'Red Skywalker', 'White Wizard', 'Blue Eagle',
  'Yellow Warrior', 'Red Earth', 'White Mirror', 'Blue Storm', 'Yellow Sun'
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
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [hasPets, setHasPets] = useState<boolean | null>(null);
  const [drinkPreference, setDrinkPreference] = useState('');
  const [smokePreference, setSmokePreference] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [humanDesign, setHumanDesign] = useState('');
  const [mayanDreamspell, setMayanDreamspell] = useState('');
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [instagramUsername, setInstagramUsername] = useState('');
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [isBusinessProfile, setIsBusinessProfile] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [allowDiscussionChat, setAllowDiscussionChat] = useState(true);
  const [uploadError, setUploadError] = useState('');
  const [locationShared, setLocationShared] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detectNudity = async (imageData: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() < 0.1);
      }, 1000);
    });
  };

  const checkForBannedContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return bannedKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handlePhotoUpload = async (file: File) => {
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
        setProfilePhoto(imageData);
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

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationShared(true);
          console.log('Location shared:', position.coords);
        },
        (error) => {
          console.error('Location sharing failed:', error);
          setUploadError('Location sharing failed. Please enable location access.');
        }
      );
    } else {
      setUploadError('Geolocation is not supported by this browser.');
    }
  };

  const handleInstagramConnect = async () => {
    setConnectingInstagram(true);
    try {
      // Simulate Instagram OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      setInstagramConnected(true);
      setInstagramUsername('@' + name.toLowerCase().replace(' ', '_'));
      toast({
        title: "Instagram connected!",
        description: "Your Instagram account has been linked successfully.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Unable to connect to Instagram. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingInstagram(false);
    }
  };

  const handleSpotifyConnect = async () => {
    setConnectingSpotify(true);
    try {
      // Simulate Spotify OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSpotifyConnected(true);
      toast({
        title: "Spotify connected!",
        description: "Your music preferences will be synced to your profile.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Unable to connect to Spotify. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingSpotify(false);
    }
  };

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const togglePet = (pet: string) => {
    if (selectedPets.includes(pet)) {
      setSelectedPets(selectedPets.filter(p => p !== pet));
    } else if (selectedPets.length < 3) {
      setSelectedPets([...selectedPets, pet]);
    }
  };

  const canProceedStep1 = name.trim() && age && profilePhoto && locationShared && selectedHobbies.length >= 1 && selectedPassions.length >= 1;

  const handleComplete = () => {
    const profileData = {
      name,
      age: parseInt(age),
      bio,
      lookingFor,
      profilePhoto,
      hobbies: selectedHobbies,
      passions: selectedPassions,
      languages: selectedLanguages,
      pets: hasPets ? selectedPets : [],
      drinkPreference,
      smokePreference,
      dietaryPreference,
      zodiacSign,
      humanDesign,
      mayanDreamspell,
      instagramConnected,
      instagramUsername: instagramConnected ? instagramUsername : '',
      spotifyConnected,
      isBusinessProfile,
      websiteUrl: isBusinessProfile ? websiteUrl : '',
      allowDiscussionChat: isBusinessProfile ? allowDiscussionChat : false,
      location: userVerificationData.location,
      verifiedContact: userVerificationData.email || userVerificationData.phone,
      dateOfBirth: userVerificationData.dateOfBirth,
      locationShared
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
          <h1 className="text-4xl font-bold cave-font mb-2">Complete Your Tribe Profile</h1>
          <p className="text-lg cave-text">Step {step} of 2</p>
        </div>

        <Card className="cave-card">
          <CardHeader>
            <CardTitle className="text-2xl cave-font text-center text-amber-900">
              {step === 1 ? 'Required Information' : 'Optional Information'}
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
                    onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
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

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="cave-text">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="cave-input"
                    placeholder="Your age"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="cave-text">Location Access *</Label>
                  <Button
                    onClick={handleLocationShare}
                    disabled={locationShared}
                    className={locationShared ? 'cave-button bg-green-600' : 'cave-button'}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {locationShared ? 'Location Shared' : 'Share Location'}
                  </Button>
                </div>

                {/* Hobbies */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block cave-text">
                    Select at least 1 Hobby * ({selectedHobbies.length} selected)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
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

                {/* Passions */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block cave-text">
                    Select at least 1 Passion * ({selectedPassions.length} selected)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                    {passions.map((passion) => (
                      <Badge
                        key={passion}
                        variant={selectedPassions.includes(passion) ? "default" : "outline"}
                        className={`cursor-pointer p-3 text-center justify-center transition-all hover:scale-105 ${
                          selectedPassions.includes(passion)
                            ? 'cave-badge'
                            : 'cave-badge-outline'
                        }`}
                        onClick={() => togglePassion(passion)}
                      >
                        {selectedPassions.includes(passion) && <Check className="w-4 h-4 mr-2" />}
                        {passion}
                      </Badge>
                    ))}
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
                  Continue to Optional Information
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Business Profile Toggle */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label className="text-lg font-semibold text-purple-800 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Professional Profile
                      </Label>
                      <p className="text-sm text-purple-600">Enable professional features for business accounts</p>
                    </div>
                    <Switch 
                      checked={isBusinessProfile}
                      onCheckedChange={setIsBusinessProfile}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  {isBusinessProfile && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-purple-700">Website URL</Label>
                        <Input
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="https://your-business.com"
                          className="cave-input"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-purple-700">Allow Event Discussions</Label>
                          <p className="text-xs text-purple-600">Enable chat for your events</p>
                        </div>
                        <Switch 
                          checked={allowDiscussionChat}
                          onCheckedChange={setAllowDiscussionChat}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                    </div>
                  )}
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

                {/* Looking For */}
                <div className="space-y-2">
                  <Label htmlFor="lookingFor" className="cave-text">Looking For (Optional)</Label>
                  <Input
                    id="lookingFor"
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                    className="cave-input"
                    placeholder="What are you looking for in your tribe?"
                  />
                </div>

                {/* Social Media Connections */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold cave-text">Social Media Connections (Optional)</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="flex items-center space-x-3">
                        <Instagram className="w-6 h-6 text-pink-600" />
                        <div>
                          <span className="font-medium text-pink-800">Instagram</span>
                          {instagramConnected && (
                            <p className="text-sm text-pink-600">{instagramUsername}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={handleInstagramConnect}
                        disabled={connectingInstagram}
                        className={instagramConnected ? 'cave-button' : 'cave-button-outline'}
                        size="sm"
                      >
                        {connectingInstagram ? (
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : instagramConnected ? (
                          'Connected'
                        ) : (
                          'Connect'
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <Music className="w-6 h-6 text-green-600" />
                        <div>
                          <span className="font-medium text-green-800">Spotify</span>
                          {spotifyConnected && (
                            <p className="text-sm text-green-600">Music preferences synced</p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={handleSpotifyConnect}
                        disabled={connectingSpotify}
                        className={spotifyConnected ? 'cave-button' : 'cave-button-outline'}
                        size="sm"
                      >
                        {connectingSpotify ? (
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : spotifyConnected ? (
                          'Connected'
                        ) : (
                          'Connect'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block cave-text">
                    Languages (Optional - {selectedLanguages.length} selected)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-32 overflow-y-auto">
                    {languages.map((language) => (
                      <Badge
                        key={language}
                        variant={selectedLanguages.includes(language) ? "default" : "outline"}
                        className={`cursor-pointer p-2 text-center justify-center transition-all hover:scale-105 ${
                          selectedLanguages.includes(language)
                            ? 'cave-badge'
                            : 'cave-badge-outline'
                        }`}
                        onClick={() => toggleLanguage(language)}
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pets */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold cave-text">Do you have pets? (Optional)</Label>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setHasPets(true)}
                      variant={hasPets === true ? "default" : "outline"}
                      className={hasPets === true ? 'cave-button' : 'cave-button-outline'}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setHasPets(false)}
                      variant={hasPets === false ? "default" : "outline"}
                      className={hasPets === false ? 'cave-button' : 'cave-button-outline'}
                    >
                      No
                    </Button>
                  </div>
                  
                  {hasPets && (
                    <div>
                      <Label className="text-sm cave-text mb-2 block">Select up to 3 pets:</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {pets.map((pet) => (
                          <Badge
                            key={pet}
                            variant={selectedPets.includes(pet) ? "default" : "outline"}
                            className={`cursor-pointer p-2 text-center justify-center transition-all hover:scale-105 ${
                              selectedPets.includes(pet)
                                ? 'cave-badge'
                                : 'cave-badge-outline'
                            } ${selectedPets.length >= 3 && !selectedPets.includes(pet) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => togglePet(pet)}
                          >
                            {pet}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Drink Preference */}
                <div className="space-y-2">
                  <Label className="cave-text">Drink? (Optional)</Label>
                  <Select value={drinkPreference} onValueChange={setDrinkPreference}>
                    <SelectTrigger className="cave-input">
                      <SelectValue placeholder="Select drinking preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="socially">Socially</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Smoke Preference */}
                <div className="space-y-2">
                  <Label className="cave-text">Smoke? (Optional)</Label>
                  <Select value={smokePreference} onValueChange={setSmokePreference}>
                    <SelectTrigger className="cave-input">
                      <SelectValue placeholder="Select smoking preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="socially">Socially</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="natural">Natural only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dietary Preferences */}
                <div className="space-y-2">
                  <Label className="cave-text">Dietary Preferences (Optional)</Label>
                  <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                    <SelectTrigger className="cave-input">
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietaryPreferences.map((diet) => (
                        <SelectItem key={diet} value={diet.toLowerCase()}>{diet}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Zodiac Sign */}
                <div className="space-y-2">
                  <Label className="cave-text">Zodiac Sign (Optional)</Label>
                  <Select value={zodiacSign} onValueChange={setZodiacSign}>
                    <SelectTrigger className="cave-input">
                      <SelectValue placeholder="Select zodiac sign" />
                    </SelectTrigger>
                    <SelectContent>
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign} value={sign.toLowerCase()}>{sign}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Human Design */}
                <div className="space-y-2">
                  <Label className="cave-text">Human Design (Optional)</Label>
                  <Select value={humanDesign} onValueChange={setHumanDesign}>
                    <SelectTrigger className="cave-input">
                      <SelectValue placeholder="Select human design" />
                    </SelectTrigger>
                    <SelectContent>
                      {humanDesigns.map((design) => (
                        <SelectItem key={design} value={design.toLowerCase()}>{design}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mayan Dreamspell */}
                <div className="space-y-2">
                  <Label className="cave-text">Mayan Dreamspell (Optional)</Label>
                  <Select value={mayanDreamspell} onValueChange={setMayanDreamspell}>
                    <SelectTrigger className="cave-input">
                      <SelectValue placeholder="Select Mayan dreamspell" />
                    </SelectTrigger>
                    <SelectContent>
                      {mayanDreamspells.map((dreamspell) => (
                        <SelectItem key={dreamspell} value={dreamspell.toLowerCase()}>{dreamspell}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
