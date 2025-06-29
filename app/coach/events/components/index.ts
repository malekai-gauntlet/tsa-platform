/**
 * Coach Events Components
 *
 * This file exports all event-related components for easier imports.
 */

export { default as EventHeader } from './EventHeader';
export { default as EventActions } from './EventActions';
export { default as RSVPSection } from './RSVPSection';
// Define the RSVP interface directly here to avoid import issues
export interface RSVP {
  rsvp_id: string;
  event_id: string;
  parent_name: string;
  parent_email: string;
  parent_phone?: string;
  student_name: string;
  student_age?: number;
  rsvp_status: 'confirmed' | 'pending' | 'declined' | 'waitlist';
  rsvp_date: string;
  special_requirements?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  additional_notes?: string;
  created_at: string;
  updated_at: string;
}
