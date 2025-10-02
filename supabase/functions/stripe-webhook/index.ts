import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!signature || !webhookSecret) {
      throw new Error('Missing webhook signature or secret')
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    console.log('Processing webhook event:', event.type)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const userId = subscription.metadata.userId

        if (!userId) {
          console.error('No userId in subscription metadata')
          break
        }

        // Get customer details
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer

        // Update or create subscription record
        const { error: upsertError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            price_id: subscription.items.data[0]?.price.id,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            raw: subscription,
          })

        if (upsertError) {
          console.error('Error upserting subscription:', upsertError)
        }

        // Update customer record
        const { error: customerError } = await supabase
          .from('customers')
          .upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            email: customer.email,
            raw: customer,
          })

        if (customerError) {
          console.error('Error upserting customer:', customerError)
        }

        // Update user's subscription tier in profiles
        const tierMap: Record<string, string> = {
          'price_1QYourBloodlinePriceId': 'Bloodline',
          'price_1QYourOraclePriceId': 'Oracle',
          'price_1QYourInnerCirclePriceId': 'Inner Circle',
          'price_1QYourTradeGuildPriceId': 'Trade Guild',
          'price_1QYourTradeCouncilPriceId': 'Trade Council',
        }

        const priceId = subscription.items.data[0]?.price.id
        const tier = tierMap[priceId] || 'Free'

        const { error: profileError } = await supabase
          .from('profiles')
          .update({ subscription_tier: tier })
          .eq('id', userId)

        if (profileError) {
          console.error('Error updating profile tier:', profileError)
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.userId

        if (!userId) {
          console.error('No userId in subscription metadata')
          break
        }

        // Update subscription status
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({ 
            status: 'canceled',
            raw: subscription 
          })
          .eq('stripe_subscription_id', subscription.id)

        if (updateError) {
          console.error('Error updating subscription:', updateError)
        }

        // Reset user to free tier
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ subscription_tier: 'Free' })
          .eq('id', userId)

        if (profileError) {
          console.error('Error resetting profile tier:', profileError)
        }

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        // Get subscription to find userId
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.userId

        if (!userId) {
          console.error('No userId in subscription metadata')
          break
        }

        // Record successful payment
        const { error: invoiceError } = await supabase
          .from('invoices')
          .upsert({
            user_id: userId,
            stripe_invoice_id: invoice.id,
            subscription_id: subscriptionId,
            amount_due: invoice.amount_due,
            amount_paid: invoice.amount_paid,
            currency: invoice.currency,
            paid: invoice.paid,
            period_start: new Date(invoice.period_start * 1000).toISOString(),
            period_end: new Date(invoice.period_end * 1000).toISOString(),
            raw: invoice,
          })

        if (invoiceError) {
          console.error('Error recording invoice:', invoiceError)
        }

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        // Get subscription to find userId
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.userId

        if (!userId) {
          console.error('No userId in subscription metadata')
          break
        }

        // Record failed payment
        const { error: invoiceError } = await supabase
          .from('invoices')
          .upsert({
            user_id: userId,
            stripe_invoice_id: invoice.id,
            subscription_id: subscriptionId,
            amount_due: invoice.amount_due,
            amount_paid: invoice.amount_paid,
            currency: invoice.currency,
            paid: invoice.paid,
            period_start: new Date(invoice.period_start * 1000).toISOString(),
            period_end: new Date(invoice.period_end * 1000).toISOString(),
            raw: invoice,
          })

        if (invoiceError) {
          console.error('Error recording failed invoice:', invoiceError)
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})