/**
 * RSVP Type Definitions
 *
 * Types for event RSVPs based on the Amplify Schema.
 */

import { Schema } from '@/amplify/data/resource';

// Extract EventRegistration type from Amplify Schema
export type EventRegistrationType = NonNullable<Schema['models']['EventRegistration']['record']>;

/**
 * RSVP interface that maps between our frontend needs and the Amplify Schema
 * This maintains compatibility with our existing components
 */
export interface RSVP {
  // ID fields
  rsvp_id: string; // Maps to EventRegistration.id
  event_id: string; // Maps to EventRegistration.eventId

  // Parent Information
  parent_name: string; // Derived from User data
  parent_email: string; // Derived from User data
  parent_phone?: string; // Derived from User data

  // Student Information
  student_name: string; // Maps to EventRegistration.studentName
  student_age?: number; // From registrationData if available

  // Status Information
  rsvp_status: 'confirmed' | 'pending' | 'declined' | 'waitlist'; // Maps to EventRegistration.registrationStatus
  rsvp_date: string; // Maps to EventRegistration.createdAt

  // Additional Information
  special_requirements?: string; // From registrationData if available
  emergency_contact?: string; // From registrationData if available
  emergency_phone?: string; // From registrationData if available
  additional_notes?: string; // Maps to EventRegistration.notes

  // Tracking fields
  created_at: string; // Maps to EventRegistration.createdAt
  updated_at: string; // Maps to EventRegistration.updatedAt
}

/**
 * Maps an EventRegistration from the Amplify Schema to our RSVP interface
 * @param registration The EventRegistration from Amplify
 * @returns An RSVP object
 */
export function mapEventRegistrationToRSVP(registration: EventRegistrationType): RSVP {
  // Extract registration data fields (if available)
  const regData = registration.registrationData || {};

  return {
    rsvp_id: registration.id,
    event_id: registration.eventId,
    parent_name: regData.parentName || 'Unknown Parent',
    parent_email: regData.parentEmail || 'Unknown Email',
    parent_phone: regData.parentPhone,
    student_name: registration.studentName || 'Unknown Student',
    student_age: regData.studentAge,
    rsvp_status: (registration.registrationStatus?.toLowerCase() as any) || 'pending',
    rsvp_date: registration.createdAt || new Date().toISOString(),
    special_requirements: regData.specialRequirements,
    emergency_contact: regData.emergencyContact,
    emergency_phone: regData.emergencyPhone,
    additional_notes: registration.notes,
    created_at: registration.createdAt || new Date().toISOString(),
    updated_at: registration.updatedAt || new Date().toISOString(),
  };
}

/**
 * Maps our RSVP interface to an EventRegistration update for the Amplify Schema
 * @param rsvp The RSVP object
 * @returns An object suitable for updating an EventRegistration
 */
export function mapRSVPToEventRegistrationUpdate(
  rsvp: Partial<RSVP>
): Partial<EventRegistrationType> {
  // Create registration data from our RSVP fields
  const registrationData = {
    parentName: rsvp.parent_name,
    parentEmail: rsvp.parent_email,
    parentPhone: rsvp.parent_phone,
    studentAge: rsvp.student_age,
    specialRequirements: rsvp.special_requirements,
    emergencyContact: rsvp.emergency_contact,
    emergencyPhone: rsvp.emergency_phone,
  };

  return {
    id: rsvp.rsvp_id,
    eventId: rsvp.event_id,
    studentName: rsvp.student_name,
    registrationStatus: rsvp.rsvp_status?.toUpperCase() as any,
    notes: rsvp.additional_notes,
    registrationData,
  };
}
