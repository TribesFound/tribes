
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  hobbies: string[];
  passions: string[];
  languages: string[];
  dietaryPreference: string;
  location?: { lat: number; lng: number };
  distance?: number;
  photos: string[];
  avatar: string;
  personality?: {
    extroversion: number; // 1-10
    openness: number; // 1-10
    conscientiousness: number; // 1-10
    agreeableness: number; // 1-10
    neuroticism: number; // 1-10
  };
  lifestyle?: {
    fitnessLevel: number; // 1-10
    socialLevel: number; // 1-10
    adventureLevel: number; // 1-10
    creativityLevel: number; // 1-10
  };
  preferences?: {
    ageRange: [number, number];
    maxDistance: number;
    importanceWeights: {
      hobbies: number; // 0-1
      passions: number; // 0-1
      languages: number; // 0-1
      personality: number; // 0-1
      lifestyle: number; // 0-1
      dietary: number; // 0-1
    };
  };
}

export interface CompatibilityScore {
  overall: number;
  breakdown: {
    hobbies: number;
    passions: number;
    languages: number;
    personality: number;
    lifestyle: number;
    dietary: number;
    age: number;
    distance: number;
  };
  reasons: string[];
}

export class MatchingAlgorithm {
  private calculateArraySimilarity(arr1: string[], arr2: string[]): number {
    if (arr1.length === 0 && arr2.length === 0) return 1;
    if (arr1.length === 0 || arr2.length === 0) return 0;
    
    const intersection = arr1.filter(item => arr2.includes(item));
    const union = [...new Set([...arr1, ...arr2])];
    
    return intersection.length / union.length;
  }

  private calculatePersonalitySimilarity(p1?: UserProfile['personality'], p2?: UserProfile['personality']): number {
    if (!p1 || !p2) return 0.5; // neutral if data missing
    
    const traits = ['extroversion', 'openness', 'conscientiousness', 'agreeableness', 'neuroticism'] as const;
    let totalDifference = 0;
    
    traits.forEach(trait => {
      const diff = Math.abs(p1[trait] - p2[trait]);
      totalDifference += diff;
    });
    
    // Convert difference to similarity (0-1 scale)
    const maxPossibleDifference = traits.length * 9; // max diff per trait is 9
    return 1 - (totalDifference / maxPossibleDifference);
  }

  private calculateLifestyleSimilarity(l1?: UserProfile['lifestyle'], l2?: UserProfile['lifestyle']): number {
    if (!l1 || !l2) return 0.5; // neutral if data missing
    
    const aspects = ['fitnessLevel', 'socialLevel', 'adventureLevel', 'creativityLevel'] as const;
    let totalDifference = 0;
    
    aspects.forEach(aspect => {
      const diff = Math.abs(l1[aspect] - l2[aspect]);
      totalDifference += diff;
    });
    
    const maxPossibleDifference = aspects.length * 9;
    return 1 - (totalDifference / maxPossibleDifference);
  }

  private calculateAgeCompatibility(user1: UserProfile, user2: UserProfile): number {
    const ageDiff = Math.abs(user1.age - user2.age);
    
    // Check if within preferred age ranges
    const user1InRange = !user2.preferences?.ageRange || 
      (user1.age >= user2.preferences.ageRange[0] && user1.age <= user2.preferences.ageRange[1]);
    const user2InRange = !user1.preferences?.ageRange || 
      (user2.age >= user1.preferences.ageRange[0] && user2.age <= user1.preferences.ageRange[1]);
    
    if (!user1InRange || !user2InRange) return 0.2; // Low compatibility if outside range
    
    // Score based on age difference (closer ages = higher score)
    if (ageDiff <= 2) return 1;
    if (ageDiff <= 5) return 0.8;
    if (ageDiff <= 10) return 0.6;
    return 0.4;
  }

  private calculateDistanceCompatibility(user1: UserProfile, user2: UserProfile): number {
    const distance = user2.distance || 0;
    
    // Check max distance preferences
    const maxDistance = Math.min(
      user1.preferences?.maxDistance || 100,
      user2.preferences?.maxDistance || 100
    );
    
    if (distance > maxDistance) return 0.1; // Very low if outside preferred distance
    
    // Score inversely related to distance
    if (distance <= 5) return 1;
    if (distance <= 15) return 0.8;
    if (distance <= 30) return 0.6;
    if (distance <= 50) return 0.4;
    return 0.2;
  }

  calculateCompatibility(user1: UserProfile, user2: UserProfile): CompatibilityScore {
    const breakdown = {
      hobbies: this.calculateArraySimilarity(user1.hobbies, user2.hobbies),
      passions: this.calculateArraySimilarity(user1.passions, user2.passions),
      languages: this.calculateArraySimilarity(user1.languages, user2.languages),
      personality: this.calculatePersonalitySimilarity(user1.personality, user2.personality),
      lifestyle: this.calculateLifestyleSimilarity(user1.lifestyle, user2.lifestyle),
      dietary: user1.dietaryPreference === user2.dietaryPreference ? 1 : 0.3,
      age: this.calculateAgeCompatibility(user1, user2),
      distance: this.calculateDistanceCompatibility(user1, user2)
    };

    // Apply user preferences weighting
    const weights = user1.preferences?.importanceWeights || {
      hobbies: 0.2,
      passions: 0.25,
      languages: 0.1,
      personality: 0.2,
      lifestyle: 0.15,
      dietary: 0.1
    };

    const weightedScore = 
      breakdown.hobbies * weights.hobbies +
      breakdown.passions * weights.passions +
      breakdown.languages * weights.languages +
      breakdown.personality * weights.personality +
      breakdown.lifestyle * weights.lifestyle +
      breakdown.dietary * weights.dietary +
      breakdown.age * 0.1 + // Fixed weight for age
      breakdown.distance * 0.05; // Fixed weight for distance

    // Generate compatibility reasons
    const reasons: string[] = [];
    
    if (breakdown.hobbies > 0.7) reasons.push("You share many hobbies");
    if (breakdown.passions > 0.7) reasons.push("You have similar passions");
    if (breakdown.languages > 0.5) reasons.push("You speak common languages");
    if (breakdown.personality > 0.8) reasons.push("Your personalities complement each other");
    if (breakdown.lifestyle > 0.8) reasons.push("You have similar lifestyles");
    if (breakdown.dietary === 1) reasons.push("You have the same dietary preferences");
    if (breakdown.age > 0.8) reasons.push("You're in similar age ranges");
    if (breakdown.distance > 0.8) reasons.push("You're close by");

    if (reasons.length === 0) {
      reasons.push("You might have interesting differences to explore");
    }

    return {
      overall: Math.min(1, weightedScore),
      breakdown,
      reasons
    };
  }

  rankUsers(currentUser: UserProfile, potentialMatches: UserProfile[]): (UserProfile & { compatibility: CompatibilityScore })[] {
    return potentialMatches
      .map(user => ({
        ...user,
        compatibility: this.calculateCompatibility(currentUser, user)
      }))
      .sort((a, b) => b.compatibility.overall - a.compatibility.overall);
  }
}

export const matchingAlgorithm = new MatchingAlgorithm();
