export const STRIPE_CONFIG = {
  // Replace these with your actual Stripe Price IDs from your Stripe Dashboard
  PRICE_IDS: {
    // Personal Plans
    bloodline_monthly: 'price_1234567890abcdef', // $3.33/month
    oracle_6months: 'price_1234567891abcdef',   // $17.77/6 months
    inner_circle_yearly: 'price_1234567892abcdef', // $33.33/year
    
    // Professional Plans
    trade_guild_monthly: 'price_1234567893abcdef', // $9.99/month
    trade_council_yearly: 'price_1234567894abcdef', // $99.99/year
  },
  
  // Webhook endpoints
  WEBHOOK_ENDPOINTS: {
    subscription_created: '/api/webhooks/stripe/subscription-created',
    subscription_updated: '/api/webhooks/stripe/subscription-updated',
    subscription_deleted: '/api/webhooks/stripe/subscription-deleted',
    payment_succeeded: '/api/webhooks/stripe/payment-succeeded',
    payment_failed: '/api/webhooks/stripe/payment-failed',
  }
} as const;

export const getStripePriceId = (planId: string): string => {
  const priceId = STRIPE_CONFIG.PRICE_IDS[planId as keyof typeof STRIPE_CONFIG.PRICE_IDS];
  if (!priceId) {
    throw new Error(`No Stripe price ID found for plan: ${planId}`);
  }
  return priceId;
};