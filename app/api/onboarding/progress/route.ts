import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@amplify/data/resource';
import { ensureAmplifyBackendConfig } from '@/lib/amplify-backend-config';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Ensure Amplify is configured for backend operations
ensureAmplifyBackendConfig();

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

// GET: Retrieve onboarding progress
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const invitationToken = searchParams.get('invitationToken');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log('📋 Getting onboarding progress for:', email);

    const { data: progressList } = await client.models.OnboardingProgress.list({
      filter: { email: { eq: email } },
    });

    const progress = progressList[0];

    if (progress) {
      const formattedProgress = {
        user_id: progress.userId,
        email: progress.email,
        current_step: progress.currentStep?.toLowerCase().replace('_', '-') || 'personal-info',
        completed_steps: progress.completedSteps || [],
        step_data: progress.stepData || {},
        last_updated: progress.lastUpdated,
        invitation_based: progress.invitationBased,
        invitation_id: progress.invitationId,
      };

      console.log('✅ Progress found:', {
        email: formattedProgress.email,
        current_step: formattedProgress.current_step,
        completed_steps: formattedProgress.completed_steps.length,
      });

      return NextResponse.json(formattedProgress);
    }

    // Create new progress if none exists
    console.log('🆕 Creating new onboarding progress for:', email);

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { data: newProgress } = await client.models.OnboardingProgress.create({
      userId,
      email,
      currentStep: 'PERSONAL_INFO',
      completedSteps: [],
      stepData: {},
      invitationBased: !!invitationToken,
      invitationId: invitationToken || undefined,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!newProgress) {
      throw new Error('Failed to create onboarding progress');
    }

    const formattedNewProgress = {
      user_id: newProgress.userId,
      email: newProgress.email,
      current_step: 'personal-info',
      completed_steps: [],
      step_data: {},
      last_updated: newProgress.lastUpdated,
      invitation_based: !!invitationToken,
      invitation_id: invitationToken || undefined,
    };

    console.log('✅ New progress created:', formattedNewProgress.user_id);

    return NextResponse.json(formattedNewProgress);
  } catch (error) {
    console.error('❌ Error getting onboarding progress:', error);
    return NextResponse.json({ error: 'Failed to get onboarding progress' }, { status: 500 });
  }
}

// PUT: Update onboarding progress
export async function PUT(request: NextRequest) {
  try {
    const { email, currentStep, stepData, completedSteps, invitationToken } = await request.json();

    if (!email || !currentStep) {
      return NextResponse.json({ error: 'Email and currentStep are required' }, { status: 400 });
    }

    console.log('💾 Updating onboarding progress:', {
      email,
      currentStep,
      completedStepsCount: completedSteps?.length || 0,
    });

    const { data: progressList } = await client.models.OnboardingProgress.list({
      filter: { email: { eq: email } },
    });

    const progress = progressList[0];
    const stepEnum = currentStep.toUpperCase().replace('-', '_') as any;

    if (progress) {
      // Update existing progress
      const { data: updatedProgress } = await client.models.OnboardingProgress.update({
        id: progress.id,
        currentStep: stepEnum,
        completedSteps: completedSteps || progress.completedSteps || [],
        stepData: stepData || progress.stepData || {},
        lastUpdated: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log('✅ Progress updated successfully');

      return NextResponse.json({
        success: true,
        message: 'Progress updated successfully',
        progress: {
          user_id: updatedProgress?.userId || progress.userId,
          email: updatedProgress?.email || progress.email,
          current_step: currentStep,
          completed_steps: completedSteps || progress.completedSteps || [],
          step_data: stepData || progress.stepData || {},
          last_updated: updatedProgress?.lastUpdated || new Date().toISOString(),
        },
      });
    } else {
      // Create new progress
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data: newProgress } = await client.models.OnboardingProgress.create({
        userId,
        email,
        currentStep: stepEnum,
        completedSteps: completedSteps || [],
        stepData: stepData || {},
        invitationBased: !!invitationToken,
        invitationId: invitationToken || undefined,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log('✅ New progress created successfully');

      return NextResponse.json({
        success: true,
        message: 'Progress created successfully',
        progress: {
          user_id: newProgress?.userId || userId,
          email: newProgress?.email || email,
          current_step: currentStep,
          completed_steps: completedSteps || [],
          step_data: stepData || {},
          last_updated: newProgress?.lastUpdated || new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error('❌ Error updating onboarding progress:', error);
    return NextResponse.json({ error: 'Failed to update onboarding progress' }, { status: 500 });
  }
}
