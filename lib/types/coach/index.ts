/**
 * Coach Section Type Definitions
 *
 * This file provides TypeScript type definitions for the Coach section.
 * Types are based on the Amplify Schema and adapted for frontend use.
 */

// Re-export directly (without importing first)
export { mapEventRegistrationToRSVP, mapRSVPToEventRegistrationUpdate } from './rsvp';
export type { EventRegistrationType, RSVP } from './rsvp';

// Application statistics interface
export interface ApplicationStats {
  total: number;
  pending: number;
  accepted: number;
  thisWeek: number;
}

export { mapInvitationToEventInvitation, mapFormToInvitationInput } from './invitation';
export type { EventInvitation, InvitationType, InvitationForm } from './invitation';

export { mapFormDataToEventInput } from './event';
export type { EventType } from './event';

// Keep these renamed exports but commented out until needed
// export { EventFormData as EventFormDefinition } from './event';
// export { TicketType as TicketTypeDefinition } from './event';

// Core data types
export interface CoachProfilePreferences {
  profile_photo_url?: string;
  first_name?: string;
  last_name?: string;
  certification_level?: string;
  program_focus?: string[];
  football_type?: string;
  has_physical_location?: boolean;
  website?: string;
  academic_year?: string;
  [key: string]: any; // Allow additional preference fields for flexibility
}

export interface CoachAddress {
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
  email?: string;
}

export interface CoachProfile {
  userId: string;
  email?: string;
  name?: string;
  profilePhoto?: string;
  profileType?: string;
  bio?: string;
  experience?: string;
  specialties?: string[];
  certifications?: string[];
  preferences?: CoachProfilePreferences;
  address?: CoachAddress;
  emergencyContact?: EmergencyContact;
  backgroundCheckStatus?: string;
  backgroundCheckDate?: string;
  onboardingComplete?: boolean;
  wizardProgress?: Record<string, any>;
  marketingProgress?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventType?: 'TRAINING' | 'BOOTCAMP' | 'WORKSHOP' | 'COMPETITION' | 'CAMP' | 'TOURNAMENT';
  status?: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
  startDate: string;
  endDate: string;
  timezone?: string;
  venue?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  capacity?: number;
  registeredCount?: number;
  price?: number;
  currency?: string;
  coachId: string;
  coachName?: string;
  requirements?: string[];
  equipment?: string[];
  tags?: string[];
  images?: string[];
  isPublic?: boolean;
  isOnline?: boolean;
  meetingUrl?: string;
  registrationDeadline?: string;
  ageGroups?: string[];
  skillLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  googleCalendarEventId?: string;
  googleMeetUrl?: string;
  googleCalendarSyncEnabled?: boolean;
  googleCalendarLastSynced?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Application status type
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED';

export interface Application {
  id: string;
  parentId: string;
  studentName: string;
  studentAge?: number;
  studentGrade?: string;
  enrollmentType?: 'FULL_TIME' | 'PART_TIME' | 'AFTER_SCHOOL';
  status: ApplicationStatus;
  applicationData?: Record<string, any>;
  documents?: Record<string, any>;
  tuitionPlan?: Record<string, any>;
  startDate?: string;
  academicYear?: string;
  schoolPreferences?: Record<string, any>;
  coachName?: string;
  sportInterest?: string;
  currentStep?: number;
  totalSteps?: number;
  timelineSteps?: Record<string, any>;
  timelineStatus?: string;
  createdAt: string;
  updatedAt: string;
  
  // Additional fields used in transformations but not in the core model
  submittedAt?: string;
  coachId?: string;
  studentFirstName?: string;
  studentLastName?: string;
  studentDateOfBirth?: string;
  currentSchool?: string;
  parentName?: string;
  parentRelationship?: string;
  parentEmail?: string;
  parentPhone?: string;
  parent2Name?: string;
  parent2Email?: string;
  parent2Relationship?: string;
  parent2Phone?: string;
  location?: string;
  address?: string;
  whyApplying?: string;
  tellUsMore?: string;
  specialAccommodations?: string;
  tellUsAboutYou?: string;
  type?: string;
  lastUpdated?: string;
  notes?: string;
}

// This interface is renamed to EventRSVP to resolve export conflicts with the type imported from ./rsvp
export interface EventRSVP {
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

// Coach Data from Auth and User records
export interface CoachData {
  currentUser: any;
  coachRecord: any;
  profileRecord: any;
  coachLocation: string;
  greeting: string;
}

// State types
export interface CoachState {
  profile: {
    data: CoachProfile | null;
    loading: boolean;
    error: string | null;
  };
  events: {
    data: Event[];
    loading: boolean;
    error: string | null;
  };
  applications: {
    data: Application[];
    loading: boolean;
    error: string | null;
  };
}

// API Response types
export interface APIResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
}

// Form data types
export interface EventFormData {
  title: string;
  description: string;
  venue_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  timezone: string;
  category: string;
  capacity: string;
  registration_deadline: string;
  visibility: 'public' | 'private';
  ticket_types: TicketType[];
  image: File | null;
  bannerImage: File | null;
}

export interface TicketType {
  name: string;
  description: string;
  cost: number;
  currency: string;
  quantity_total?: number;
  include_fee: boolean;
}

// Component prop types
export interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
  showActions?: boolean;
}

export interface ApplicationCardProps {
  application: Application;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
}

export interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Error and loading state types
export interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
}

export interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}
