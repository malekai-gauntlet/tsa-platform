/**
 * TSA Platform - Invitation Data Operations
 * 
 * This module provides functions for working with invitation data,
 * abstracting away the details of the underlying data access layer.
 */

import { getDataClient } from './client';

/**
 * Interface for invitation data
 */
export interface InvitationData {
  email: string;
  invitedBy: string;
  invitationType: 'COACH' | 'PARENT';
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED' | 'REVOKED';
  token: string;
  expiresAt: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  state?: string;
  bio?: string;
  message?: string;
  sport?: string;
  schoolName?: string;
  schoolType?: string;
  lastSentAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create a new invitation
 * @param invitationData The data for the new invitation
 * @returns The created invitation or an error
 */
export async function createInvitation(invitationData: InvitationData): Promise<{ data?: any; error?: string }> {
  // Convert InvitationData to the expected format for Amplify models
  const modelData = invitationData as any;
  try {
    const client = getDataClient();
    
    // Create the invitation record
    const result = await client.models.Invitation.create(modelData);
    
    // Handle errors
    if (result.errors) {
      console.error('Database error creating invitation:', result.errors);
      return {
        error: `Failed to create invitation: ${result.errors.map(e => e.message).join(', ')}`
      };
    }
    
    // Return the created invitation
    return {
      data: result.data
    };
  } catch (error: any) {
    console.error('Error creating invitation:', error);
    return {
      error: error.message || 'Unknown error creating invitation'
    };
  }
}

/**
 * Get an invitation by token
 * @param token The invitation token to look up
 * @returns The invitation or null if not found
 */
export async function getInvitationByToken(token: string): Promise<{ data?: any; error?: string }> {
  try {
    const client = getDataClient();
    
    const result = await client.models.Invitation.list({
      filter: {
        token: { eq: token }
      },
      limit: 1
    });
    
    if (result.errors) {
      console.error('Error fetching invitation by token:', result.errors);
      return {
        error: `Failed to fetch invitation: ${result.errors.map(e => e.message).join(', ')}`
      };
    }
    
    // Return the first invitation found or null
    return {
      data: result.data && result.data.length > 0 ? result.data[0] : null
    };
  } catch (error: any) {
    console.error('Error getting invitation by token:', error);
    return {
      error: error.message || 'Unknown error fetching invitation'
    };
  }
}

/**
 * Get invitations by email
 * @param email The email to look up
 * @returns The invitations for the email
 */
export async function getInvitationsByEmail(email: string): Promise<{ data?: any[]; error?: string }> {
  try {
    const client = getDataClient();
    
    const result = await client.models.Invitation.list({
      filter: {
        email: { eq: email }
      }
    });
    
    if (result.errors) {
      console.error('Error fetching invitations by email:', result.errors);
      return {
        error: `Failed to fetch invitations: ${result.errors.map(e => e.message).join(', ')}`
      };
    }
    
    return {
      data: result.data || []
    };
  } catch (error: any) {
    console.error('Error getting invitations by email:', error);
    return {
      error: error.message || 'Unknown error fetching invitations'
    };
  }
}

/**
 * Update an invitation
 * @param id The ID of the invitation to update
 * @param updateData The fields to update
 * @returns The updated invitation or an error
 */
export async function updateInvitation(id: string, updateData: Partial<InvitationData>): Promise<{ data?: any; error?: string }> {
  try {
    const client = getDataClient();
    
    // Create update payload with ID
    const updatePayload = {
      id,
      ...updateData
    } as any;
    
    const result = await client.models.Invitation.update(updatePayload);
    
    if (result.errors) {
      console.error('Error updating invitation:', result.errors);
      return {
        error: `Failed to update invitation: ${result.errors.map(e => e.message).join(', ')}`
      };
    }
    
    return {
      data: result.data
    };
  } catch (error: any) {
    console.error('Error updating invitation:', error);
    return {
      error: error.message || 'Unknown error updating invitation'
    };
  }
}