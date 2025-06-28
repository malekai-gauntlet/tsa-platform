import type { AuthUser } from 'aws-amplify/auth';

export interface ParentInvitation {
  invitation_id: string;
  parent_email: string;
  student_first_name: string;
  student_last_name: string;
  status: 'pending' | 'accepted' | 'expired';
  created_at: string;
  expires_at: string;
  accepted_at?: string;
}

export interface SchedulingBooking {
  id: string;
  eventTypeId: string;
  coachId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no_show';
  parentName: string;
  parentEmail: string;
  studentName: string;
  eventType: 'call' | 'tour' | 'shadow-day';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  coachId: string;

  // Student Information
  studentFirstName: string;
  studentLastName: string;
  studentDateOfBirth: string;
  studentGrade: string;
  startTerm: string;
  currentSchool?: string;

  // Parent 1 Information
  parentName: string;
  parentRelationship: string;
  parentEmail: string;
  parentPhone?: string;

  // Parent 2 Information
  parent2Name?: string;
  parent2Email?: string;
  parent2Relationship?: string;
  parent2Phone?: string;

  // Location & Address
  location: string;
  address?: string;

  // Application Questions
  whyApplying?: string;
  tellUsMore?: string;
  specialAccommodations?: string;
  tellUsAboutYou?: string;

  // Application Metadata
  type: 'application' | 'interest-form';
  status: 'pending' | 'under-review' | 'accepted' | 'rejected' | 'waitlisted';
  submittedAt: string;
  lastUpdated: string;

  // Legacy fields for backward compatibility
  parentFirstName?: string;
  parentLastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  schoolYear?: string;
  notes?: string;
  additionalInfo?: string;
  customFields?: { [key: string]: any };
}

export interface CoachData {
  currentUser: AuthUser | null;
  coachRecord: any;
  profileRecord: any;
  coachLocation: string;
  greeting: string;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  accepted: number;
  thisWeek: number;
}

export interface InvitationStats {
  totalInvites: number;
  pendingInvites: number;
  acceptedInvites: number;
  weekChange: string;
}
