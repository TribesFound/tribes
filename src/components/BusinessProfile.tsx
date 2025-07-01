
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, Phone, Globe, Star } from 'lucide-react';

interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  hours: string;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  coverImage?: string;
  verified: boolean;
}

interface BusinessProfileProps {
  business: BusinessProfile;
  onContact: (businessId: string) => void;
  onViewEvents: (businessId: string) => void;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ 
  business, 
  onContact, 
  onViewEvents 
}) => {
  return (
    <Card className="cave-card overflow-hidden">
      {business.coverImage && (
        <div className="h-32 bg-gradient-to-br from-orange-400 to-amber-400 relative">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="w-16 h-16 ring-2 ring-orange-200">
            <AvatarImage src={business.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-400 text-white">
              {business.name[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="cave-font text-amber-900">
                {business.name}
              </CardTitle>
              {business.verified && (
                <Badge className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              )}
            </div>
            
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 mt-1">
              {business.category}
            </Badge>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(business.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-amber-600 ml-2">
                {business.rating} ({business.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-amber-700 text-sm">
          {business.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-amber-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{business.location}</span>
          </div>
          
          <div className="flex items-center text-amber-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{business.hours}</span>
          </div>
          
          {business.phone && (
            <div className="flex items-center text-amber-600 text-sm">
              <Phone className="w-4 h-4 mr-2" />
              <span>{business.phone}</span>
            </div>
          )}
          
          {business.website && (
            <div className="flex items-center text-amber-600 text-sm">
              <Globe className="w-4 h-4 mr-2" />
              <span className="truncate">{business.website}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewEvents(business.id)}
            className="flex-1 text-amber-700 border-amber-300"
          >
            View Events
          </Button>
          <Button
            size="sm"
            onClick={() => onContact(business.id)}
            className="flex-1 cave-button"
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessProfile;
