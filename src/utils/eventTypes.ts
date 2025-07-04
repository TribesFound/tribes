
export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface EventLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  venue?: string;
}

export interface EventRSVP {
  userId: string;
  userName: string;
  userAvatar: string;
  status: 'going' | 'interested' | 'maybe';
  timestamp: string;
}

export interface EnhancedEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: EventLocation;
  date: string;
  time: string;
  duration: number; // in minutes
  maxAttendees?: number;
  minAttendees?: number;
  price: number;
  currency: string;
  paymentRequired: boolean;
  paymentUrl?: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
    type: 'individual' | 'business';
  };
  images: string[];
  tags: string[];
  rsvps: EventRSVP[];
  requirements?: string[];
  whatToBring?: string[];
  ageRestriction?: {
    min: number;
    max?: number;
  };
  features: {
    isRecurring: boolean;
    recurringPattern?: 'weekly' | 'monthly' | 'custom';
    allowsGuestList: boolean;
    requiresApproval: boolean;
    isPrivate: boolean;
    hasWaitlist: boolean;
  };
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export const eventCategories: EventCategory[] = [
  {
    id: 'social',
    name: 'Social',
    icon: '🎉',
    color: 'bg-pink-500',
    description: 'Parties, meetups, and social gatherings'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    icon: '🧘‍♀️',
    color: 'bg-green-500',
    description: 'Yoga, meditation, fitness, and health'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: '🏔️',
    color: 'bg-blue-500',
    description: 'Hiking, climbing, outdoor activities'
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: '🎨',
    color: 'bg-purple-500',
    description: 'Art shows, museums, cultural events'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: '🍽️',
    color: 'bg-orange-500',
    description: 'Restaurants, cooking, wine tasting'
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: '📚',
    color: 'bg-indigo-500',
    description: 'Workshops, classes, educational events'
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    color: 'bg-gray-500',
    description: 'Networking, conferences, professional'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    color: 'bg-red-500',
    description: 'Games, tournaments, sports activities'
  }
];
