import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

export { stripePromise };

export const STRIPE_PRICES = {
  // Personal Plans
  bloodline_monthly: 'price_1234567890abcdef', // Replace with actual Stripe price IDs
  oracle_6months: 'price_1234567891abcdef',
  inner_circle_yearly: 'price_1234567892abcdef',
  
  // Professional Plans
  trade_guild_monthly: 'price_1234567893abcdef',
  trade_council_yearly: 'price_1234567894abcdef',
} as const;

export const createCheckoutSession = async (priceId: string, userId: string) => {
  try {
    // For development, we'll use a mock API endpoint
    // In production, replace this with your actual backend API
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    const response = await fetch(`${apiUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        userEmail: 'user@example.com', // Replace with actual user email
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/subscription/cancel`,
      }),
    });

    if (!response.ok) {
      // For development, simulate a successful response
      console.warn('Backend API not available, using mock checkout');
      
      // Redirect to Stripe's test checkout page
      const testCheckoutUrl = `https://checkout.stripe.com/pay/test_session_${Date.now()}`;
      window.location.href = testCheckoutUrl;
      return null;
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // For development, provide fallback
    console.warn('Using fallback checkout method');
    const fallbackUrl = `https://buy.stripe.com/test_fallback_${priceId}`;
    window.location.href = fallbackUrl;
    return null;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }
};