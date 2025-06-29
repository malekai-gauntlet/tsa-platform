import type { Schema } from '../../data/resource';
import { AppSyncResolverHandler } from 'aws-lambda';

// Import data access and validation modules
import { createInvitation } from '../../../lib/data-access/invitation';
import { 
  validateInvitationData, 
  formatPhoneNumber, 
  generateInvitationToken 
} from '../../../lib/validation/invitation';

// Type assertion to handle return type compatibility with AppSync
export const handler = async (event: any) => {
  const { name, email, cell, location, d1_athletics_count, bio } = event.arguments;

  try {
    // Validate required fields with structured error responses
    const validation = validateInvitationData({ name, email, cell, location, d1_athletics_count, bio });
    if (!validation.isValid) {
      return {
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Please correct the following errors',
        details: validation.errors,
      };
    }
    
    // Generate invitation token
    const invitationToken = generateInvitationToken();

    // Parse name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Parse location into city and state
    const locationParts = location.split(',').map((part: string) => part.trim());
    const city = locationParts[0] || '';
    const state = locationParts[1] || 'TX';

    // Format phone number
    const formattedPhone = formatPhoneNumber(cell);

    // Create expiration date (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Generate and store invitation using the data access module
    const invitationResult = await createInvitation({
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

    // Handle errors from the data access layer
    if (invitationResult.error) {
      return {
        success: false,
        error: 'DATABASE_ERROR',
        message: invitationResult.error,
        retryable: true,
      };
    }
    
    const invitation = invitationResult.data;

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
    // Handle any unexpected errors
    return {
      success: false,
      error: 'SYSTEM_ERROR',
      message: 'Failed to process coach application. Please try again later.',
      retryable: true,
    };
  }
};

// Enhanced validation function with structured error reporting
