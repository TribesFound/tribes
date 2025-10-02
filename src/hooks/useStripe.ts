import { useState } from 'react';
import { stripePromise, createCheckoutSession, redirectToCheckout } from '@/lib/stripe';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useStripe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const createSubscription = async (priceId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive"
      });
      return;
    }

    if (!user.email) {
      toast({
        title: "Email required",
        description: "Please ensure your email is verified",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const sessionId = await createCheckoutSession(priceId, user.id, user.email);
      await redirectToCheckout(sessionId);

    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to start subscription process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPortalSession = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to manage your subscription",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
          returnUrl: `${window.location.origin}/subscription`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;

    } catch (error: any) {
      console.error('Portal session error:', error);
      toast({
        title: "Failed to open billing portal",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSubscription,
    createPortalSession,
    isLoading
  };
}