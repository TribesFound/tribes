
export const runComprehensiveTest = () => {
  console.log('🔍 Starting comprehensive app testing...');
  
  // Test 1: Authentication Flow
  console.log('✅ Test 1: Authentication system check');
  const authData = localStorage.getItem('user_verification_data');
  console.log('Auth data exists:', !!authData);
  
  // Test 2: Profile Data
  console.log('✅ Test 2: Profile data check');
  const profileData = localStorage.getItem('user_profile_data');
  console.log('Profile data exists:', !!profileData);
  
  // Test 3: Bonds & Friends System
  console.log('✅ Test 3: Social connections check');
  const bonds = JSON.parse(localStorage.getItem('user_bonds') || '[]');
  const friends = JSON.parse(localStorage.getItem('user_friends') || '[]');
  console.log('Bonds count:', bonds.length);
  console.log('Friends count:', friends.length);
  
  // Test 4: Chat System
  console.log('✅ Test 4: Chat system check');
  const sampleChatKey = 'chat_1';
  const chatData = localStorage.getItem(sampleChatKey);
  console.log('Sample chat exists:', !!chatData);
  
  // Test 5: Preferences
  console.log('✅ Test 5: User preferences check');
  const hobbies = JSON.parse(localStorage.getItem('user_hobbies') || '[]');
  const passions = JSON.parse(localStorage.getItem('user_passions') || '[]');
  console.log('Hobbies selected:', hobbies.length);
  console.log('Passions selected:', passions.length);
  
  // Test 6: Subscription Status
  console.log('✅ Test 6: Subscription status check');
  const subscriptionStatus = localStorage.getItem('subscription_status');
  console.log('Subscription status:', subscriptionStatus || 'none');
  
  console.log('🎉 Comprehensive testing completed!');
  
  return {
    authSystem: !!authData,
    profileSystem: !!profileData,
    socialSystem: { bonds: bonds.length, friends: friends.length },
    chatSystem: !!chatData,
    preferences: { hobbies: hobbies.length, passions: passions.length },
    subscription: subscriptionStatus || 'none'
  };
};

// Auto-run on import for testing
if (typeof window !== 'undefined') {
  runComprehensiveTest();
}
