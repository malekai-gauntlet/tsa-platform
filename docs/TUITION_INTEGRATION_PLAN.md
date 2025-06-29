# TSA Platform Stripe Connect Integration Plan

## Overview

This document outlines the implementation plan for integrating Stripe Connect into the TSA Platform to enable coaches to collect tuition payments. The integration will use Stripe Connect Express accounts and follow the marketplace model.

## Implementation Requirements

- **Tuition Amount**: $15,000 yearly
- **Deposit Amount**: $500
- **Account Type**: Full identity verification Express accounts
- **Platform Fee**: Based on $4,000 platform cost for $15,000 yearly tuition
- **Payout Schedule**: Monthly payouts to coaches
- **Payment Options**: Support for installment payments (minimum monthly = annual ÷ 12)
- **Geographic Scope**: US-only, no international support
- **Integration Type**: Amplify Gen2 with custom Lambda functions
- **Custom Tuition**: Coaches can set custom tuition plans per student/program
- **Automatic Recurring Charges**: Implementation of automatic installment billing

## Implementation Checklist

### 1. Setup & Configuration

- [ ] Install Stripe dependencies
  - [ ] `npm install stripe @stripe/stripe-js`
  - [ ] `npm install @stripe/react-stripe-js`

- [ ] Configure environment variables
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_PUBLISHABLE_KEY`
  - [ ] `STRIPE_CONNECT_CLIENT_ID`
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `PLATFORM_FEE_PERCENT`
  - [ ] `BASE_URL` (for redirect URLs)
  - [ ] `STRIPE_WEBHOOK_IPS` (optional, for IP filtering)

### 2. Amplify Lambda Functions

- [ ] Create Stripe Connect onboarding function
  - [ ] Create `amplify/functions/stripe-connect/resource.ts`
  - [ ] Create `amplify/functions/stripe-connect/handler.ts`
  - [ ] Implement account creation
  - [ ] Implement account links generation
  - [ ] Implement status checking

- [ ] Create Stripe webhook handler function
  - [ ] Create `amplify/functions/stripe-webhook/resource.ts`
  - [ ] Create `amplify/functions/stripe-webhook/handler.ts`
  - [ ] Implement signature verification
  - [ ] Implement IP filtering for security
  - [ ] Implement event handlers
    - [ ] `account.updated`
    - [ ] `payment_intent.succeeded`
    - [ ] `payment_intent.failed`
    - [ ] `payout.paid`
    - [ ] `subscription.created`
    - [ ] `subscription.updated`
    - [ ] `invoice.paid`
    - [ ] `invoice.payment_failed`

- [ ] Create payment link generation function
  - [ ] Create `amplify/functions/payment-link/resource.ts`
  - [ ] Create `amplify/functions/payment-link/handler.ts`
  - [ ] Implement checkout session creation
  - [ ] Implement payment link generation
  - [ ] Implement subscription creation for recurring payments

### 3. Backend API Routes

- [ ] Create webhook endpoint
  - [ ] Create `app/api/stripe/webhook/route.ts`
  - [ ] Implement webhook verification with signature checking
  - [ ] Add rate limiting and IP filtering
  - [ ] Implement comprehensive logging for security audit

- [ ] Create Connect onboarding endpoint
  - [ ] Create `app/api/stripe/connect/route.ts`

- [ ] Create payment link endpoint
  - [ ] Create `app/api/stripe/payment/route.ts`

### 4. Frontend Pages & Components

- [ ] Create tuition main page
  - [ ] Create `app/coach/tuition/page.tsx`
  - [ ] Implement dashboard layout with metrics

- [ ] Create tuition settings page
  - [ ] Create `app/coach/tuition/settings/page.tsx`
  - [ ] Implement tuition configuration form
  - [ ] Add custom tuition plan creation interface

- [ ] Create Connect onboarding flow
  - [ ] Create `app/coach/tuition/onboarding/page.tsx`
  - [ ] Create redirect handlers for onboarding completion

- [ ] Create payment link generation page
  - [ ] Create `app/coach/tuition/payment/page.tsx`
  - [ ] Implement student selector
  - [ ] Implement payment link generation UI
  - [ ] Add tuition plan selection dropdown

- [ ] Create payment tracking components
  - [ ] Create `app/coach/tuition/components/PaymentTable.tsx`
  - [ ] Create `app/coach/tuition/components/PayoutHistory.tsx`
  - [ ] Create `app/coach/tuition/components/ConnectStatus.tsx`
  - [ ] Create `app/coach/tuition/components/TuitionPlanManager.tsx`

### 5. Sidebar Navigation Update

- [ ] Update sidebar navigation to include tuition section
  - [ ] Ensure the sidebar already has the tuition item (already present)
  - [ ] Add necessary icons and styles

### 6. Data Operations

- [ ] Implement TuitionSetting operations
  - [ ] Create function to fetch coach's tuition settings
  - [ ] Create function to update tuition settings
  - [ ] Create function to toggle Stripe Connect status
  - [ ] Add functions for custom tuition plan management

- [ ] Implement PaymentRecord operations
  - [ ] Create function to list payments by coach
  - [ ] Create function to filter payments by status
  - [ ] Create function to update payment status
  - [ ] Create function for subscription tracking

- [ ] Implement CoachPayout operations
  - [ ] Create function to track monthly payouts
  - [ ] Create function to calculate payout statistics

### 7. Payment Flow Implementation

- [ ] Implement initial deposit flow
  - [ ] Create deposit payment link generation
  - [ ] Implement success/failure handling

- [ ] Implement automatic recurring payment flow
  - [ ] Set up Stripe subscription creation
  - [ ] Configure billing cycle settings
  - [ ] Implement subscription management dashboard

- [ ] Implement payment tracking system
  - [ ] Create payment status dashboard
  - [ ] Implement payment history view

### 8. Testing & Validation

- [ ] Create Stripe test accounts
  - [ ] Set up test Connect account
  - [ ] Configure test webhooks

- [ ] Test payment flows
  - [ ] Test successful payments
  - [ ] Test failed payments
  - [ ] Test refund process

- [ ] Test Connect onboarding
  - [ ] Test successful onboarding
  - [ ] Test incomplete onboarding
  - [ ] Test account updates

### 9. Reporting & Analytics

- [ ] Implement revenue dashboard
  - [ ] Create monthly collection metrics
  - [ ] Create projection calculations

- [ ] Implement payout tracking
  - [ ] Create payout history view
  - [ ] Create upcoming payout preview

### 10. Deployment & Launch

- [ ] Configure production environment
  - [ ] Set up production Stripe webhook
  - [ ] Configure live API keys

- [ ] Create documentation
  - [ ] Create coach onboarding guide
  - [ ] Create parent payment guide

## Technical Implementation Details

### Stripe Connect Account Creation Flow

```javascript
async function createConnectAccount(coachId, email) {
  // Create Stripe Connect Express account
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: 'individual',
  });

  // Store account ID in TuitionSetting
  await client.models.TuitionSetting.create({
    coachId,
    coachEmail: email,
    defaultTuition: 15000,
    defaultDeposit: 500,
    allowPaymentPlans: true,
    paymentPlanOptions: JSON.stringify(['monthly', 'quarterly', 'annual']),
    stripeConnectAccountId: account.id,
    marketplaceEnabled: false,
  });

  // Generate onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.BASE_URL}/coach/tuition/onboarding/refresh`,
    return_url: `${process.env.BASE_URL}/coach/tuition/onboarding/complete`,
    type: 'account_onboarding',
  });

  return accountLink.url;
}
```

### Custom Tuition Plan Structure

```typescript
interface TuitionPlan {
  planId: string;
  name: string;
  description: string;
  amount: number;
  depositAmount: number;
  paymentOptions: string[]; // ['monthly', 'quarterly', 'annual']
  ageGroups?: string[];
  programTypes?: string[];
}

// Store in TuitionSetting.paymentPlanOptions as JSON
const tuitionPlans: TuitionPlan[] = [
  {
    planId: 'default',
    name: 'Standard Tuition',
    description: 'Standard annual tuition for full-time students',
    amount: 15000,
    depositAmount: 500,
    paymentOptions: ['monthly', 'quarterly', 'annual'],
  },
  // Additional custom plans
];
```

### Payment Link Generation

```javascript
async function createPaymentLink(
  studentName,
  tuitionAmount,
  depositAmount,
  coachConnectId,
  planId
) {
  // Create a payment link for the deposit
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Tuition Deposit for ${studentName}`,
            description: 'Initial deposit for annual tuition',
          },
          unit_amount: depositAmount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    application_fee_amount: Math.round(
      ((depositAmount * process.env.PLATFORM_FEE_PERCENT) / 100) * 100
    ),
    transfer_data: {
      destination: coachConnectId,
    },
    after_completion: {
      type: 'redirect',
      redirect: {
        url: `${process.env.BASE_URL}/payment/confirmation?planId=${planId}`,
      },
    },
  });

  return paymentLink.url;
}
```

### Automatic Recurring Payments

```javascript
async function createSubscription(
  customerId,
  tuitionAmount,
  depositAmount,
  coachConnectId,
  planId
) {
  const monthlyAmount = (tuitionAmount - depositAmount) / 12;

  // Create subscription product
  const product = await stripe.products.create({
    name: `Monthly Tuition Payment`,
    metadata: {
      planId: planId,
    },
  });

  // Create price for the subscription
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: Math.round(monthlyAmount * 100), // Convert to cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      interval_count: 1,
    },
  });

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: price.id }],
    application_fee_percent: process.env.PLATFORM_FEE_PERCENT,
    transfer_data: {
      destination: coachConnectId,
    },
    metadata: {
      planId: planId,
    },
  });

  return subscription;
}
```

### Enhanced Webhook Security

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { AmplifyGraphQLClient } from '@aws-amplify/api-graphql';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const client = new AmplifyGraphQLClient();

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    // IP verification (optional)
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const allowedIPs = process.env.STRIPE_WEBHOOK_IPS?.split(',') || [];
    if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
      console.warn(`Webhook request from unauthorized IP: ${clientIP}`);
    }

    // Log webhook event
    await client.models.AuditLog.create({
      userId: 'system',
      action: `STRIPE_WEBHOOK_${event.type.toUpperCase()}`,
      resource: 'STRIPE',
      resourceId: event.id,
      changes: JSON.stringify(event.data.object),
      metadata: JSON.stringify({
        eventType: event.type,
        eventId: event.id,
      }),
      ipAddress: clientIP,
      timestamp: new Date().toISOString(),
    });

    // Process webhook event
    await processWebhookEvent(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);

    // Log failed webhook attempt
    await client.models.AuditLog.create({
      userId: 'system',
      action: 'STRIPE_WEBHOOK_ERROR',
      resource: 'STRIPE',
      changes: JSON.stringify({ error: error.message }),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }
}
```

### Frontend Components

```jsx
function TuitionDashboard() {
  const [tuitionSettings, setTuitionSettings] = useState(null);
  const [payments, setPayments] = useState([]);
  const [connectStatus, setConnectStatus] = useState('not_connected');

  useEffect(() => {
    // Fetch data from API
    async function loadData() {
      // Fetch tuition settings, payments, Connect status
    }

    loadData();
  }, []);

  // Render dashboard with metrics and tables
  return (
    <div>
      <ConnectStatusCard status={connectStatus} />
      <TuitionMetricsCard payments={payments} />
      <RecentPaymentsTable payments={payments} />
      <PayoutHistoryTable payments={payments} />
    </div>
  );
}
```

## Amplify Gen2 Integration

### Data Client Operations

```typescript
// Using Amplify Gen2 client to interact with data models
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

// Generate the typed client
const client = generateClient<Schema>();

// Create/Update Tuition Settings
async function saveTuitionSettings(coachId, settings) {
  const existingSettings = await client.models.TuitionSetting.get({
    coachId,
  });

  if (existingSettings) {
    return client.models.TuitionSetting.update({
      coachId,
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  } else {
    return client.models.TuitionSetting.create({
      coachId,
      coachEmail: settings.coachEmail,
      defaultTuition: settings.defaultTuition || 15000,
      defaultDeposit: settings.defaultDeposit || 500,
      allowPaymentPlans: settings.allowPaymentPlans || true,
      paymentPlanOptions:
        settings.paymentPlanOptions || JSON.stringify(['monthly', 'quarterly', 'annual']),
      currency: 'USD',
      marketplaceEnabled: false,
    });
  }
}

// Create Payment Record
async function createPaymentRecord(paymentData) {
  return client.models.PaymentRecord.create({
    studentId: paymentData.studentId,
    studentName: paymentData.studentName,
    parentEmail: paymentData.parentEmail,
    coachEmail: paymentData.coachEmail,
    applicationId: paymentData.applicationId,
    tuitionAmount: paymentData.tuitionAmount,
    depositAmount: paymentData.depositAmount,
    totalPaid: paymentData.depositAmount,
    paymentStatus: 'deposit_paid',
    paymentPlan: paymentData.paymentPlan,
    stripeCustomerId: paymentData.stripeCustomerId,
    stripePaymentLinkId: paymentData.stripePaymentLinkId,
    stripeConnectAccountId: paymentData.stripeConnectAccountId,
    platformFeeAmount: paymentData.platformFeeAmount,
    coachPayoutAmount: paymentData.coachPayoutAmount,
    isMarketplacePayment: true,
    lastPaymentDate: new Date().toISOString(),
    nextPaymentDue: calculateNextPaymentDate(paymentData.paymentPlan),
    paymentHistory: JSON.stringify([
      {
        amount: paymentData.depositAmount,
        date: new Date().toISOString(),
        type: 'deposit',
        status: 'successful',
      },
    ]),
  });
}
```

### Lambda Functions with Amplify Gen2

```typescript
// amplify/functions/stripe-connect/resource.ts
import { defineFunction } from '@aws-amplify/backend';

export const stripeConnect = defineFunction({
  name: 'stripeConnect',
  environment: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    STRIPE_CONNECT_CLIENT_ID: process.env.STRIPE_CONNECT_CLIENT_ID || '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
    PLATFORM_FEE_PERCENT: '3',
  },
});
```

## Timeline and Resources

### Estimated Timeline

- **Week 1**: Set up Stripe Connect integration and Lambda functions
- **Week 2**: Implement tuition settings and onboarding flow
- **Week 3**: Implement payment link generation and tracking
- **Week 4**: Testing, refinement, and launch preparation

### Resource Requirements

- Stripe Connect account with Express account capability
- AWS Lambda for serverless functions
- Amplify Gen2 for database and authentication
- Frontend developer for React/Next.js components
- Backend developer for Stripe integration and webhooks

## Conclusion

This implementation plan provides a comprehensive approach to integrating Stripe Connect into the TSA Platform for tuition collection. By following this plan, coaches will be able to onboard to Stripe, configure tuition settings, generate payment links for parents, and track payments and payouts within their dashboard. The enhanced features of custom tuition plans, automatic recurring payments, and robust webhook security ensure a flexible and secure payment processing system.
