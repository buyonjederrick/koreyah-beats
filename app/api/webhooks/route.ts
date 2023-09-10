import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';




const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(
  request: Request
) {
    const body = await request.text()
    const sig = headers().get('Stripe-Signature');

    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
      process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;


  return NextResponse.json({ received: true }, { status: 200 });
};
