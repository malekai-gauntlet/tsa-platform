import type { Schema } from '../../data/resource';
import { generateClient } from 'aws-amplify/data';

// In Amplify Gen 2, functions used as GraphQL resolvers are automatically configured
const client = generateClient<Schema>();

export const handler: Schema['coachInvite']['functionHandler'] = async event => {
  const { name, email, cell, location, d1_athletics_count, bio } = event.arguments;

  try {
    // Validate required fields
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    if (!validatePhone(cell)) {
      throw new Error('Invalid phone number format');
    }
    
    // Generate invitation token
    const invitationToken = generateInvitationToken();

    // Parse name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Parse location into city and state
    const locationParts = location.split(',').map(part => part.trim());
    const city = locationParts[0] || '';
    const state = locationParts[1] || 'TX';

    // Format phone number
    const formattedPhone = formatPhoneNumber(cell);

    // Create expiration date (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create invitation record in database
    const { data: invitation, errors } = await client.models.Invitation.create({
      email,
      invitedBy: 'system',
      invitationType: 'COACH',
      status: 'PENDING',
      token: invitationToken,
      expiresAt: expiresAt.toISOString(),
      
      // Pre-fill data for onboarding
      firstName,
      lastName,
      phone: formattedPhone,
      city,
      state: state.toUpperCase(),
      bio,
      message: `Welcome to Texas Sports Academy! We're excited to have a coach with ${d1_athletics_count || 0} D1/pro athletes join our team.`,
      
      // Additional metadata
      sport: 'Multi-Sport',
      lastSentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (errors || !invitation) {
      throw new Error(`Failed to create invitation record: ${errors?.map(e => e.message).join(', ') || 'Unknown database error'}`);
    }

    // Return success response
    return {
      success: true,
      message: `Application received for ${name} (${email})`,
      invitationToken,
      invitationData: {
        id: invitation.id,
        email,
        firstName,
        lastName,
        phone: formattedPhone,
        city,
        state: state.toUpperCase(),
        bio,
        token: invitationToken,
        d1_athletics_count,
        message: invitation.message,
        createdAt: invitation.createdAt,
        expiresAt: invitation.expiresAt,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to process coach application',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Helper functions
function generateInvitationToken(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `coach_${timestamp}_${random}`;
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  return phone;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}
