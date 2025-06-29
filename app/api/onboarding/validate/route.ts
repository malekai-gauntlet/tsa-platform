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
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ valid: false, error: 'Token is required' }, { status: 400 });
    }

    console.log('🔍 Validating invitation token:', token.substring(0, 20) + '...');

    // Find invitation by token
    const { data: invitations } = await client.models.Invitation.list({
      filter: {
        token: { eq: token },
        status: { eq: 'PENDING' },
      },
    });

    console.log('🔍 Found invitations:', invitations.length);

    const invitation = invitations.find(
      inv =>
        inv.token === token && inv.status === 'PENDING' && new Date(inv.expiresAt!) > new Date()
    );

    if (!invitation) {
      console.log('❌ No valid invitation found');
      return NextResponse.json(
        { valid: false, error: 'Invitation not found or expired' },
        { status: 404 }
      );
    }

    console.log('✅ Valid invitation found:', invitation.email);

    // Extract comprehensive pre-fill data
    const prefilledData = {
      email: invitation.email,
      role: invitation.invitationType || 'COACH',
      first_name: invitation.firstName || '',
      last_name: invitation.lastName || '',
      phone: invitation.phone || '',
      city: invitation.city || '',
      state: invitation.state || '',
      bio: invitation.bio || '',
      message: invitation.message || '',

      // Computed fields
      full_name: `${invitation.firstName || ''} ${invitation.lastName || ''}`.trim(),
      location:
        invitation.city && invitation.state ? `${invitation.city}, ${invitation.state}` : '',
      phone_formatted: invitation.phone || '',

      // School information if available
      school_name: invitation.schoolName || '',
      school_type: invitation.schoolType || '',
      sport: invitation.sport || '',

      // Invitation metadata
      invitation_id: invitation.id,
      invitation_token: token,
      expires_at: invitation.expiresAt,
    };

    console.log('✅ Pre-filled data prepared:', {
      email: prefilledData.email,
      first_name: prefilledData.first_name,
      last_name: prefilledData.last_name,
      role: prefilledData.role,
      has_phone: !!prefilledData.phone,
      has_location: !!prefilledData.location,
    });

    return NextResponse.json({
      valid: true,
      invitation: prefilledData,
    });
  } catch (error) {
    console.error('❌ Error validating invitation:', error);
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 });
  }
}
