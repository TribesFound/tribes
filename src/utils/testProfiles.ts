
export const testProfiles = [
  {
    id: 'test-1',
    name: 'Alex Rivera',
    age: 28,
    location: 'San Francisco, CA',
    images: ['/placeholder.svg', '/placeholder.svg'],
    interests: ['Photography', 'Hiking', 'Coffee', 'Tech', 'Art'],
    bio: 'Adventure photographer seeking fellow explorers. Love capturing the perfect sunrise and discovering hidden gems around the city.',
    distance: '0.8 km',
    mutualFriends: 5,
    isLiked: true, // They already liked the current user
    hobbies: ['Photography', 'Hiking', 'Cooking'],
    passions: ['Travel', 'Art', 'Technology'],
    languages: ['English', 'Spanish'],
    lifestyle: {
      drinking: 'Socially',
      smoking: 'No',
      diet: 'Vegetarian'
    }
  },
  {
    id: 'test-2',
    name: 'Sam Chen',
    age: 25,
    location: 'San Francisco, CA',
    images: ['/placeholder.svg', '/placeholder.svg'],
    interests: ['Yoga', 'Meditation', 'Cooking', 'Books', 'Music'],
    bio: 'Wellness coach and yoga instructor. Always looking for new healthy recipes and mindful adventures to share.',
    distance: '1.2 km',
    mutualFriends: 3,
    isLiked: true,
    hobbies: ['Yoga', 'Reading', 'Cooking'],
    passions: ['Wellness', 'Music', 'Environment'],
    languages: ['English', 'Mandarin'],
    lifestyle: {
      drinking: 'Never',
      smoking: 'No',
      diet: 'Vegan'
    }
  },
  {
    id: 'test-3',
    name: 'Taylor Brooks',
    age: 30,
    location: 'San Francisco, CA',
    images: ['/placeholder.svg', '/placeholder.svg'],
    interests: ['Gaming', 'Tech', 'Movies', 'Board Games', 'Craft Beer'],
    bio: 'Software engineer by day, game master by night. Always up for trying new board games or exploring the latest tech trends.',
    distance: '2.1 km',
    mutualFriends: 7,
    isLiked: true,
    hobbies: ['Gaming', 'Programming', 'Movies'],
    passions: ['Technology', 'Gaming', 'Innovation'],
    languages: ['English'],
    lifestyle: {
      drinking: 'Regularly',
      smoking: 'No',
      diet: 'Omnivore'
    }
  }
];

// Function to initialize test profiles in localStorage
export const initializeTestProfiles = () => {
  const existingProfiles = localStorage.getItem('test_profiles_initialized');
  if (!existingProfiles) {
    localStorage.setItem('test_profiles_initialized', 'true');
    localStorage.setItem('test_profiles', JSON.stringify(testProfiles));
    console.log('Test profiles initialized for testing purposes');
  }
};

export const getTestProfiles = () => {
  const profiles = localStorage.getItem('test_profiles');
  return profiles ? JSON.parse(profiles) : testProfiles;
};

export const clearTestProfiles = () => {
  localStorage.removeItem('test_profiles_initialized');
  localStorage.removeItem('test_profiles');
  console.log('Test profiles cleared');
};
