import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef');

export { stripePromise };

// Stripe Price IDs - Replace with your actual Stripe Price IDs
export const STRIPE_PRICES = {
  bloodline_monthly: 'price_1QYourBloodlinePriceId',
  oracle_6months: 'price_1QYourOraclePriceId', 
  inner_circle_yearly: 'price_1QYourInnerCirclePriceId',
  trade_guild_monthly: 'price_1QYourTradeGuildPriceId',
  trade_council_yearly: 'price_1QYourTradeCouncilPriceId',
} as const;

export const createCheckoutSession = async (priceId: string, userId: string, userEmail: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        priceId,
        userId,
        userEmail,
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/subscription/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string | null) => {
  if (!sessionId) {
    throw new Error('No session ID provided');
  }
  
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }