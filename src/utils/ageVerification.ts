
export interface AgeVerificationResult {
  isValid: boolean;
  age: number;
  error?: string;
}

export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const verifyAge = (dateOfBirth: string): AgeVerificationResult => {
  try {
    // Validate date format
    const birthDate = new Date(dateOfBirth);
    
    if (isNaN(birthDate.getTime())) {
      return {
        isValid: false,
        age: 0,
        error: 'Invalid date format'
      };
    }

    // Check if date is not in the future
    const today = new Date();
    if (birthDate > today) {
      return {
        isValid: false,
        age: 0,
        error: 'Date of birth cannot be in the future'
      };
    }

    // Check if date is reasonable (not more than 120 years ago)
    const maxAge = 120;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxAge);
    
    if (birthDate < minDate) {
      return {
        isValid: false,
        age: 0,
        error: 'Date of birth is too far in the past'
      };
    }

    const age = calculateAge(dateOfBirth);
    const minimumAge = 18;

    return {
      isValid: age >= minimumAge,
      age,
      error: age < minimumAge ? `You must be at least ${minimumAge} years old to use Tribes` : undefined
    };
  } catch (error) {
    return {
      isValid: false,
      age: 0,
      error: 'Failed to verify age'
    };
  }
};

export const isValidDateOfBirth = (dateString: string): boolean => {
  const verification = verifyAge(dateString);
  return verification.isValid;
};
