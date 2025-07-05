
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, MapPin, Phone, Mail, Globe, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfessionalSetupProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const ProfessionalSetup: React.FC<ProfessionalSetupProps> = ({ onComplete, onBack }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.businessName || !formData.businessType || !formData.description || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onComplete(formData);
  };

  return (
    <div className="min-h-screen cave-gradient p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-orange-200/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold cave-font text-white">Professional Setup</h1>
        </div>

        <div className="space-y-6">
          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger className="cave-input mt-2">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="services">Professional Services</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="fitness">Fitness & Recreation</SelectItem>
                    <SelectItem value="education">Education & Training</SelectItem>
                    <SelectItem value="nonprofit">Non-Profit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="cave-input mt-2 min-h-[100px]"
                  placeholder="Describe your business..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="business@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cave-card">
            <CardHeader>
              <CardTitle className="text-lg cave-font text-amber-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Business Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="123 Business St"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="cave-input mt-2"
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="cave-input mt-2"
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="cave-input mt-2"
                  placeholder="12345"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full cave-button text-lg py-6"
          >
            Continue to Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSetup;
