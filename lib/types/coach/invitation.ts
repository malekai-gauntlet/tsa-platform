/**
 * Invitation Type Definitions
 *
 * Types for event invitations based on the Amplify Schema.
 */

import { Schema } from '@/amplify/data/resource';

// Extract Invitation type from Amplify Schema
export type InvitationType = NonNullable<Schema['models']['Invitation']['record']>;

/**
 * EventInvitation interface that maps between our frontend needs and the Amplify Schema
 * This maintains compatibility with our existing components
 */
export interface EventInvitation {
  // ID fields
  invitation_id: string; // Maps to Invitation.id
  event_id: string; // Stored in message field or related metadata

  // Contact details
  invitee_email: string; // Maps to Invitation.email
  invitee_name?: string; // Derived from firstName + lastName in Schema

  // Status information
  status: 'pending' | 'sent' | 'accepted' | 'declined'; // Mapped from Schema's PENDING/ACCEPTED states
  sent_at?: string; // Maps to Invitation.lastSentAt
  responded_at?: string; // Maps to Invitation.acceptedAt
  created_at: string; // Maps to Invitation.createdAt

  // Additional data
  message?: string; // Maps to Invitation.message
}

/**
 * Map InvitationType from Amplify Schema to EventInvitation
 * @param invitation Invitation record from Amplify Schema
 * @returns EventInvitation formatted for our UI
 */
export function mapInvitationToEventInvitation(invitation: InvitationType): EventInvitation {
  // Extract event ID from message content if available (we store this as JSON)
  let eventId = '';
  try {
    const messageData = invitation.message ? JSON.parse(invitation.message) : {};
    eventId = messageData.event_id || '';
  } catch {
    // If parsing fails, leave eventId empty
  }

  // Map the status from Schema to our frontend format
  let status: 'pending' | 'sent' | 'accepted' | 'declined' = 'pending';
  switch (invitation.status) {
    case 'ACCEPTED':
      status = 'accepted';
      break;
    case 'EXPIRED':
    case 'CANCELLED':
    case 'REVOKED':
      status = 'declined';
      break;
    case 'PENDING':
      status = invitation.lastSentAt ? 'sent' : 'pending';
      break;
  }

  // Combine name fields into a single field
  const fullName = [invitation.firstName, invitation.lastName].filter(Boolean).join(' ');

  return {
    invitation_id: invitation.id,
    event_id: eventId,
    invitee_email: invitation.email,
    invitee_name: fullName || undefined,
    status,
    sent_at: invitation.lastSentAt,
    responded_at: invitation.acceptedAt,
    created_at: invitation.createdAt,
    message: invitation.message,
  };
}

/**
 * Form data for sending invitations
 */
export interface InvitationForm {
  invitee_email: string;
  invitee_name: string;
  message: string;
}

/**
 * Maps invitation form data to Amplify Schema format
 * @param form Invitation form data
 * @param eventId The event ID
 * @param inviterId The user ID of the person sending the invitation
 * @returns Data formatted for creating an Invitation
 */
export function mapFormToInvitationInput(
  form: InvitationForm,
  eventId: string,
  inviterId: string
): Partial<InvitationType> {
  // Extract first and last name
  const nameParts = form.invitee_name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Create a token (would typically be done server-side)
  const token = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

  // Create expiration date (30 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // Store event ID in message field as JSON
  const messageData = {
    event_id: eventId,
    custom_message: form.message,
  };

  return {
    email: form.invitee_email,
    invitedBy: inviterId,
    invitationType: 'PARENT', // For event invitations, we typically invite parents
    status: 'PENDING',
    token,
    expiresAt: expiresAt.toISOString(),
    firstName,
    lastName,
    message: JSON.stringify(messageData),
  };
}
