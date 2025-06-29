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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Handle both flat data format and structured data format
    const email = data.email || data.user?.email;
    const firstName = data.first_name || data.firstName || data.user?.firstName;
    const lastName = data.last_name || data.lastName || data.user?.lastName;
    const phone = data.cell_phone || data.phone || data.user?.phone;
    const role = data.role_type || data.role || data.user?.role || 'COACH';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log('🚀 Starting onboarding completion for:', email);
    console.log('📊 Data format detected:', {
      hasDirectEmail: !!data.email,
      hasUserEmail: !!data.user?.email,
      hasProfile: !!data.profile,
      hasEducationOrg: !!data.educationOrganization,
      dataKeys: Object.keys(data),
    });

    // Generate user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 1. Create User record first
    const { data: newUser } = await client.models.User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      role: role.toUpperCase() as any,
      status: 'ACTIVE',
      amplifyUserId: null, // Will be updated when they sign in with Cognito
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!newUser) {
      throw new Error('Failed to create user record');
    }

    console.log('✅ User record created:', newUser.id);

    // 2. Create comprehensive profile
    const { data: profile } = await client.models.Profile.create({
      userId: newUser.id,
      profileType: role.toUpperCase() as any,
      bio: data.bio || data.profile?.bio || '',
      experience: data.experience || data.profile?.experience || '',
      specialties: data.specialties || data.profile?.specialties || [],
      certifications: data.certifications || data.profile?.certifications || [],
      preferences: data.profile?.preferences
        ? JSON.stringify(data.profile.preferences)
        : JSON.stringify({
            school_name: data.school_name || data.educationOrganization?.nameOfInstitution,
            school_type: data.school_type || data.school?.schoolType,
            sport: data.sport,
            grade_levels:
              data.student_grade_levels ||
              data.grade_levels_served ||
              data.school?.gradeLevels ||
              [],
            academic_year: data.academic_year,
          }),
      address: data.profile?.address
        ? JSON.stringify(data.profile.address)
        : JSON.stringify({
            city: data.city || data.school_city,
            state: data.state || data.school_state,
            street: data.school_street,
            zip: data.school_zip,
            phone: data.school_phone,
          }),
      emergencyContact: JSON.stringify({
        name: data.emergency_contact,
        phone: data.emergency_contact_phone,
      }),
      onboardingComplete: true,
      wizardProgress: JSON.stringify(data),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!profile) {
      throw new Error('Failed to create profile record');
    }

    console.log('✅ Profile record created:', profile.id);

    // 3. Update onboarding progress to complete
    const { data: progressList } = await client.models.OnboardingProgress.list({
      filter: { email: { eq: email } },
    });

    if (progressList[0]) {
      await client.models.OnboardingProgress.update({
        id: progressList[0].id,
        userId: newUser.id, // Update with real user ID
        currentStep: 'COMPLETE',
        completedSteps: [
          'PERSONAL_INFO',
          'ROLE_EXPERIENCE',
          'SCHOOL_SETUP',
          'SCHOOL_NAME',
          'SCHOOL_FOCUS',
          'STUDENT_PLANNING',
          'AGREEMENTS',
          'FINALIZE',
          'COMPLETE',
        ],
        stepData: data,
        lastUpdated: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log('✅ OnboardingProgress updated to COMPLETE');
    }

    // 4. Update invitation status if this was invitation-based onboarding
    if (data.invitation_token || data.invitation_id) {
      try {
        const invitationToken = data.invitation_token || data.invitation_id;

        // Find the invitation by token or ID
        let invitation = null;

        if (data.invitation_token) {
          const { data: invitationsByToken } = await client.models.Invitation.list({
            filter: { token: { eq: data.invitation_token } },
          });
          invitation = invitationsByToken[0];
        } else if (data.invitation_id) {
          const { data: invitationById } = await client.models.Invitation.get({
            id: data.invitation_id,
          });
          invitation = invitationById;
        }

        if (invitation) {
          await client.models.Invitation.update({
            id: invitation.id,
            status: 'ACCEPTED',
            acceptedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          console.log('✅ Invitation status updated to ACCEPTED:', invitation.id);
        } else {
          console.log('⚠️ Invitation not found for token/ID:', invitationToken);
        }
      } catch (inviteError) {
        console.error('⚠️ Failed to update invitation status (non-critical):', inviteError);
        // Don't fail the entire process if invitation update fails
      }
    }

    console.log('🎉 Onboarding completion successful');

    return NextResponse.json({
      message: 'Onboarding completed successfully',
      user_id: newUser.id,
      profile_id: profile.id,
      status: 'completed',
      invitation_based: !!(data.invitation_token || data.invitation_id),
      next_steps: {
        login_url: `/?email=${encodeURIComponent(email)}`,
        dashboard_url: '/coach',
      },
    });
  } catch (error) {
    console.error('❌ Error completing onboarding:', error);
    return NextResponse.json({ error: 'Failed to complete onboarding' }, { status: 500 });
  }
}
