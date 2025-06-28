/**
 * TSA Coach Invitation API Client
 * Handles invitation validation and onboarding integration with comprehensive coach data
 */

import { config } from '@/config/environments';
import { invitationOperations, onboardingOperations } from './services/graphql-client';

export interface InvitationData {
  // Basic invitation info
  email: string;
  role: string;

  // Comprehensive coach data (pre-collected from admin)
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  bio?: string;
  message?: string;

  // Generated fields
  fullName: string;
  location: string;
  phoneFormatted: string;

  // Legacy fields for compatibility
  schoolName?: string;
  schoolType?: string;
  sport?: string;
}

export interface InvitationValidationResponse {
  valid: boolean;
  invitation?: InvitationData;
  error?: string;
  status?: string;
}

export interface OnboardingProgress {
  user_id: string;
  email: string;
  current_step: string;
  completed_steps: string[];
  step_data: Record<string, any>;
  last_updated: string;
  invitation_based: boolean;
  invitation_id?: string;
}

export interface OnboardingData {
  // Pre-filled from invitation (should not be re-collected)
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  state: string;
  bio?: string;

  // Ed-Fi compliant personal information
  birth_date?: string;
  birth_city?: string;
  birth_state_abbreviation_descriptor?: string;
  middle_name?: string;
  generation_code_suffix?: string; // Jr., Sr., III, etc.

  // Ed-Fi compliant demographics (optional for coaches, required for students)
  hispanic_latino_ethnicity?: boolean;
  races?: string[]; // Array of race descriptors
  gender?: string;

  // TSA-specific fields
  emergency_contact?: string;
  certifications?: string[];
  experience?: string;
  specialties?: string[];
  school_name?: string;
  school_type?: string;
  grade_levels?: string[];

  // OneRoster compliant organizational data
  role: string; // teacher, administrator, etc.
  org_ids?: string[]; // Array of organization IDs
  enabled_user?: boolean;

  // Progress tracking
  current_step: string;
  completed_steps: string[];

  // Include invitation ID for backend validation
  invitation_id?: string;
}

export interface OnboardingResponse {
  message: string;
  profile_id: string;
  status: string;
  invitation_based: boolean;
  progress?: OnboardingProgress;
}

// Session storage keys
const SESSION_KEYS = {
  INVITATION_DATA: 'onboarding_invitation_data',
  INVITATION_TOKEN: 'onboarding_invitation_token',
  INVITATION_URL: 'onboarding_invitation_url',
  INVITATION_URL_PARAMS: 'onboarding_invitation_url_params',
  ONBOARDING_PROGRESS: 'onboarding_progress',
} as const;

// Onboarding step definitions
export const ONBOARDING_STEPS = {
  PERSONAL_INFO: 'personal-info',
  ROLE_EXPERIENCE: 'role-experience',
  SCHOOL_SETUP: 'school-setup',
  SCHOOL_FOCUS: 'school-focus',
  STUDENT_PLANNING: 'student-planning',
  STUDENTS: 'students',
  AGREEMENTS: 'agreements',
  FINALIZE: 'finalize',
  COMPLETE: 'complete',
} as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[keyof typeof ONBOARDING_STEPS];

class CoachInvitationAPI {
  /**
   * Validate an invitation token and get comprehensive pre-fill data
   */
  async validateInvitation(token: string): Promise<InvitationValidationResponse> {
    const result = await invitationOperations.validateInvitation(token);

    if (!result.valid || !result.invitation) {
      return { valid: false, error: result.error };
    }

    // Transform to match InvitationData interface
    const transformedInvitation: InvitationData = {
      email: result.invitation.email,
      role: result.invitation.role,
      firstName: result.invitation.firstName,
      lastName: result.invitation.lastName,
      phone: result.invitation.phone,
      city: result.invitation.city,
      state: result.invitation.state,
      bio: result.invitation.bio,
      message: result.invitation.message,
      fullName: result.invitation.fullName || '',
      location: result.invitation.location,
      phoneFormatted: result.invitation.phoneFormatted || '',
      schoolName: result.invitation.schoolName,
      sport: result.invitation.sport,
    };

    return { valid: true, invitation: transformedInvitation };
  }

  /**
   * Get or create onboarding progress for a coach
   */
  async getOnboardingProgress(
    email: string,
    invitationToken?: string
  ): Promise<OnboardingProgress | null> {
    const result = await onboardingOperations.getOnboardingProgress(email, invitationToken);

    if (!result) {
      return null;
    }

    // Transform to match OnboardingProgress interface with type guards
    return {
      user_id: result.user_id,
      email: result.email,
      current_step: result.current_step || 'PERSONAL_INFO',
      completed_steps: (result.completed_steps || []).filter(
        (step): step is string => step !== null
      ),
      step_data:
        typeof result.step_data === 'object' ? (result.step_data as Record<string, any>) : {},
      last_updated: result.last_updated,
      invitation_based: result.invitation_based,
      invitation_id: result.invitation_id,
    };
  }

  /**
   * Update onboarding progress and step data
   */
  async updateOnboardingProgress(
    email: string,
    currentStep: OnboardingStep,
    stepData: Record<string, any>,
    completedSteps: string[] = [],
    invitationToken?: string
  ): Promise<boolean> {
    return await onboardingOperations.updateOnboardingProgress(
      email,
      currentStep,
      stepData,
      completedSteps,
      invitationToken
    );
  }

  /**
   * Complete onboarding with invitation data
   */
  async completeOnboarding(data: OnboardingData): Promise<OnboardingResponse> {
    // Transform snake_case data to camelCase for GraphQL operation
    return await onboardingOperations.completeOnboarding({
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      city: data.city,
      state: data.state,
      bio: data.bio,
      role: data.role,
      schoolName: data.school_name,
      completedSteps: data.completed_steps,
      invitationId: data.invitation_id,
    });
  }
}

// Export singleton instance
export const invitationAPI = new CoachInvitationAPI();

/**
 * Get invitation token from URL params or cache
 */
export function getInvitationTokenFromURL(): string | null {
  if (typeof window === 'undefined') return null;

  // First check current URL for multiple possible parameter names
  const urlParams = new URLSearchParams(window.location.search);

  // Check both 'invite' and 'invitation' parameters for compatibility
  const token = urlParams.get('invite') || urlParams.get('invitation');

  if (token) {
    console.log('🔍 Found invitation token in URL:', token.substring(0, 20) + '...');
    // Store the token for the session
    storeInvitationToken(token);
    // Store the full URL with params for propagation
    storeInvitationURL(window.location.href);
    return token;
  }

  // Fall back to cached token
  const cachedToken = getCachedInvitationToken();
  if (cachedToken) {
    console.log('🔍 Using cached invitation token:', cachedToken.substring(0, 20) + '...');
  } else {
    console.log('❌ No invitation token found in URL or cache');
  }

  return cachedToken;
}

/**
 * Store invitation token in session/local storage
 */
export function storeInvitationToken(token: string): void {
  if (typeof window === 'undefined') return;

  try {
    // Store in both session and local storage for redundancy
    sessionStorage.setItem(SESSION_KEYS.INVITATION_TOKEN, token);
    localStorage.setItem(SESSION_KEYS.INVITATION_TOKEN, token);
  } catch (error) {
    console.error('Error storing invitation token:', error);
  }
}

/**
 * Get cached invitation token
 */
export function getCachedInvitationToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    // Try session storage first, then local storage
    return (
      sessionStorage.getItem(SESSION_KEYS.INVITATION_TOKEN) ||
      localStorage.getItem(SESSION_KEYS.INVITATION_TOKEN)
    );
  } catch (error) {
    console.error('Error getting cached invitation token:', error);
    return null;
  }
}

/**
 * Store full invitation URL for propagation (handles both invitation and bypass mode)
 */
export function storeInvitationURL(url: string): void {
  if (typeof window === 'undefined') return;

  try {
    const urlObj = new URL(url);
    const params = Object.fromEntries(urlObj.searchParams);

    sessionStorage.setItem(SESSION_KEYS.INVITATION_URL, url);
    sessionStorage.setItem(SESSION_KEYS.INVITATION_URL_PARAMS, JSON.stringify(params));
    localStorage.setItem(SESSION_KEYS.INVITATION_URL, url);
    localStorage.setItem(SESSION_KEYS.INVITATION_URL_PARAMS, JSON.stringify(params));
  } catch (error) {
    console.error('Error storing invitation URL:', error);
  }
}

/**
 * Get invitation URL with params for propagation to other pages
 */
export function getInvitationURL(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return (
      sessionStorage.getItem(SESSION_KEYS.INVITATION_URL) ||
      localStorage.getItem(SESSION_KEYS.INVITATION_URL)
    );
  } catch (error) {
    console.error('Error getting invitation URL:', error);
    return null;
  }
}

/**
 * Get invitation URL params
 */
export function getInvitationURLParams(): Record<string, string> | null {
  if (typeof window === 'undefined') return null;

  try {
    const params =
      sessionStorage.getItem(SESSION_KEYS.INVITATION_URL_PARAMS) ||
      localStorage.getItem(SESSION_KEYS.INVITATION_URL_PARAMS);
    return params ? JSON.parse(params) : null;
  } catch (error) {
    console.error('Error getting invitation URL params:', error);
    return null;
  }
}

/**
 * Build URL with invitation params for navigation
 */
export function buildInvitationURL(basePath: string): string {
  if (typeof window === 'undefined') return basePath;

  const token = getCachedInvitationToken();
  const url = new URL(basePath, window.location.origin);

  // Check for bypass mode
  const currentParams = new URLSearchParams(window.location.search);
  const bypassMode = currentParams.get('bypass') === 'true';

  if (token) {
    // Invitation mode: add invite token
    url.searchParams.set('invite', token);

    // Add any other preserved params
    const storedParams = getInvitationURLParams();
    if (storedParams) {
      Object.entries(storedParams).forEach(([key, value]) => {
        if (key !== 'invite') {
          url.searchParams.set(key, value);
        }
      });
    }
  } else if (bypassMode) {
    // Bypass mode: preserve bypass flag
    url.searchParams.set('bypass', 'true');
  } else {
    // No invitation token and no bypass - return base path
    return basePath;
  }

  return url.pathname + url.search;
}

/**
 * Check if this is an invitation-based onboarding
 */
export function isInvitationOnboarding(): boolean {
  return getInvitationTokenFromURL() !== null || getCachedInvitationToken() !== null;
}

/**
 * Store invitation data in localStorage for the onboarding session
 */
export function storeInvitationData(data: InvitationData): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(SESSION_KEYS.INVITATION_DATA, JSON.stringify(data));
    localStorage.setItem(SESSION_KEYS.INVITATION_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing invitation data:', error);
  }
}

/**
 * Get stored invitation data from localStorage
 */
export function getStoredInvitationData(): InvitationData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored =
      sessionStorage.getItem(SESSION_KEYS.INVITATION_DATA) ||
      localStorage.getItem(SESSION_KEYS.INVITATION_DATA);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting stored invitation data:', error);
    return null;
  }
}

/**
 * Store onboarding progress locally (redundancy)
 */
export function storeOnboardingProgress(progress: OnboardingProgress): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(SESSION_KEYS.ONBOARDING_PROGRESS, JSON.stringify(progress));
    localStorage.setItem(SESSION_KEYS.ONBOARDING_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error storing onboarding progress:', error);
  }
}

/**
 * Get stored onboarding progress (local cache)
 */
export function getStoredOnboardingProgress(): OnboardingProgress | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored =
      sessionStorage.getItem(SESSION_KEYS.ONBOARDING_PROGRESS) ||
      localStorage.getItem(SESSION_KEYS.ONBOARDING_PROGRESS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting stored onboarding progress:', error);
    return null;
  }
}

/**
 * Check if a field should be pre-filled from invitation data
 */
export function isFieldPreFilled(
  fieldName: string,
  invitationData: InvitationData | null
): boolean {
  if (!invitationData) return false;

  const preFilledFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'state', 'bio'];

  return (
    preFilledFields.includes(fieldName) &&
    invitationData[fieldName as keyof InvitationData] !== undefined
  );
}

/**
 * Get pre-filled value for a field from invitation data
 */
export function getPreFilledValue(
  fieldName: string,
  invitationData: InvitationData | null
): string {
  if (!invitationData || !isFieldPreFilled(fieldName, invitationData)) {
    return '';
  }

  return String(invitationData[fieldName as keyof InvitationData] || '');
}

/**
 * Clear invitation data from localStorage
 */
export function clearInvitationData(): void {
  if (typeof window === 'undefined') return;

  try {
    // Clear from both storages
    Object.values(SESSION_KEYS).forEach(key => {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    });
    console.log('Cleared all cached invitation data');
  } catch (error) {
    console.error('Error clearing invitation data:', error);
  }
}

/**
 * Debug function: Get current invitation state
 */
export function getInvitationDebugInfo(): object {
  if (typeof window === 'undefined') return {};

  return {
    currentURL: window.location.href,
    urlToken: new URLSearchParams(window.location.search).get('invite'),
    cachedToken: getCachedInvitationToken(),
    cachedData: getStoredInvitationData(),
    cachedURL: getInvitationURL(),
    cachedParams: getInvitationURLParams(),
    cachedProgress: getStoredOnboardingProgress(),
  };
}
