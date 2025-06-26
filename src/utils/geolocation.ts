
export interface GeolocationData {
  lat: number;
  lng: number;
  city: string;
  country: string;
  accuracy?: number;
}

export interface LocationError {
  code: number;
  message: string;
}

export const LOCATION_ERRORS = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
  UNSUPPORTED: 4
} as const;

// Secure geolocation options
const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000, // 10 seconds
  maximumAge: 300000 // 5 minutes cache
};

// Reverse geocoding with error handling
const reverseGeocode = async (lat: number, lng: number): Promise<{ city: string; country: string }> => {
  try {
    // Simulate reverse geocoding - replace with actual service
    // In production, use a service like Google Maps Geocoding API
    const mockLocations = [
      { lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'United States' },
      { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'United States' },
      { lat: 51.5074, lng: -0.1278, city: 'London', country: 'United Kingdom' },
      { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France' }
    ];

    // Find closest mock location
    const closest = mockLocations.reduce((prev, curr) => {
      const prevDistance = Math.sqrt(Math.pow(prev.lat - lat, 2) + Math.pow(prev.lng - lng, 2));
      const currDistance = Math.sqrt(Math.pow(curr.lat - lat, 2) + Math.pow(curr.lng - lng, 2));
      return currDistance < prevDistance ? curr : prev;
    });

    return {
      city: closest.city,
      country: closest.country
    };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return {
      city: 'Unknown',
      country: 'Unknown'
    };
  }
};

// Secure location request with user consent
export const requestSecureLocation = async (): Promise<GeolocationData> => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      reject({
        code: LOCATION_ERRORS.UNSUPPORTED,
        message: 'Geolocation is not supported by this browser'
      });
      return;
    }

    // Request location with secure options
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Log location access for security audit
          console.log('Location accessed:', {
            timestamp: new Date().toISOString(),
            accuracy: accuracy ? `${Math.round(accuracy)}m` : 'unknown'
          });

          // Get city and country
          const location = await reverseGeocode(latitude, longitude);

          resolve({
            lat: latitude,
            lng: longitude,
            city: location.city,
            country: location.country,
            accuracy
          });
        } catch (error) {
          reject({
            code: LOCATION_ERRORS.POSITION_UNAVAILABLE,
            message: 'Failed to process location data'
          });
        }
      },
      (error) => {
        let errorMessage: string;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'Unknown location error';
        }

        reject({
          code: error.code,
          message: errorMessage
        });
      },
      GEOLOCATION_OPTIONS
    );
  });
};

// Check if location permission is granted
export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state === 'granted';
    }
    return false;
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
};

// Privacy-focused location storage
export const storeLocationSecurely = (location: GeolocationData): void => {
  try {
    // Only store necessary location data, not precise coordinates
    const secureLocation = {
      city: location.city,
      country: location.country,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('tribes_location', JSON.stringify(secureLocation));
  } catch (error) {
    console.error('Failed to store location securely:', error);
  }
};

// Clear stored location data
export const clearLocationData = (): void => {
  try {
    localStorage.removeItem('tribes_location');
  } catch (error) {
    console.error('Failed to clear location data:', error);
  }
};
