import type { Schema } from '../../data/resource';

export const handler: Schema['coachInvite']['functionHandler'] = async event => {
  console.log('Coach Application Received:', event.arguments);

  // Arguments are automatically typed from the schema definition
  const { name, email, cell, location, d1_athletics_count, bio } = event.arguments;

  try {
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

    // Create invitation record (this would typically be done via GraphQL)
    // For now, returning the structured data that can be used by your existing systems
    const invitationData = {
      email,
      firstName,
      lastName,
      phone: formattedPhone,
      city,
      state: state.toUpperCase(),
      bio,
      token: invitationToken,
      d1_athletics_count,
      message: `Welcome to Texas Sports Academy! We're excited to have a coach with ${d1_athletics_count || 0} D1/pro athletes join our team.`,
      createdAt: new Date().toISOString(),
    };

    console.log('✅ Coach application processed successfully');

    // Return typed response matching the schema
    return {
      success: true,
      message: `Application received for ${name} (${email})`,
      invitationToken,
      invitationData,
    };
  } catch (error: any) {
    console.error('❌ Error processing coach application:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to process coach application',
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
