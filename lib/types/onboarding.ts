/**
 * Standardized Onboarding Types
 * Maps directly to Amplify data schema models to eliminate transformation complexity
 */

import type { Schema } from '@amplify/data/resource';

// =================================================================
// AMPLIFY MODEL TYPES (direct mapping)
// =================================================================

export type UserCreateInput = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'COACH' | 'PARENT' | 'ADMIN' | 'STUDENT';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  amplifyUserId?: string;
  staffUSI?: number;
};

export type ProfileCreateInput = {
  userId: string;
  profileType: 'COACH' | 'PARENT' | 'STUDENT';
  bio?: string;
  experience?: string;
  specialties?: string[];
  certifications?: string[];
  preferences?: CoachPreferences;
  address?: Address;
  onboardingComplete: boolean;
};

export type EducationOrganizationCreateInput = {
  educationOrganizationId: number;
  nameOfInstitution: string;
  shortNameOfInstitution?: string;
  webSite?: string;
  operationalStatus: string;
  addresses?: Address[];
  telephones?: Telephone[];
};

export type SchoolCreateInput = {
  schoolId: number; // Same as educationOrganizationId
  localEducationAgencyId?: number;
  schoolType?: string;
  gradeLevels?: string[]; // Ed-Fi format: ["Kindergarten", "1st grade", ...]
  schoolCategories?: string[];
};

export type StaffCreateInput = {
  staffUniqueId: string;
  firstName: string;
  middleName?: string;
  lastSurname: string;
  generationCodeSuffix?: string;
  birthDate?: string;
  sex?: string;
  personalEmailAddress?: string;
  hispanicLatinoEthnicity?: boolean;
  races?: string[];
  yearsOfPriorProfessionalExperience?: number;
  isActive: boolean;
};

// =================================================================
// NESTED TYPES
// =================================================================

export type Address = {
  addressType?: string;
  streetNumberName: string;
  city: string;
  stateAbbreviation: string;
  postalCode: string;
};

export type Telephone = {
  telephoneNumberType: string;
  telephoneNumber: string;
};

export type CoachPreferences = {
  certificationLevel?: string;
  programFocus?: string[];
  footballType?: string;
  hasPhysicalLocation?: boolean;
  website?: string;
  academicYear?: string;
  estimatedStudentCount?: number;
  enrollmentCapacity?: number;
  hasCurrentStudents?: boolean;
  currentStudentDetails?: string;
  platformAgreement?: boolean;
};

// =================================================================
// ONBOARDING STEP DATA (standardized field names)
// =================================================================

export type PersonalInfoData = {
  // Core identity
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;

  // Birth information
  birthDate?: string;
  birthCity?: string;
  birthStateAbbreviation?: string;

  // Demographics (Ed-Fi compliance)
  sex?: string;
  hispanicLatinoEthnicity?: boolean;
  races?: string[];
  generationCodeSuffix?: string;
};

export type RoleExperienceData = {
  roleType: 'COACH' | 'PARENT' | 'STUDENT';
  experience?: string;
  certificationLevel?: string;
  specialties?: string[];
  bio?: string;
  certifications?: string[];
};

export type SchoolSetupData = {
  schoolName: string;
  schoolType: string;
  gradeLevels: string[]; // Store in Ed-Fi format from the start
  hasPhysicalLocation: boolean;
  website?: string;
  academicYear: string;

  // Address (optional)
  address?: Address;
  schoolPhone?: string;
};

export type SchoolFocusData = {
  sport: string;
  footballType?: string;
  schoolCategories: string[];
  programFocus?: string[];
};

export type StudentPlanningData = {
  estimatedStudentCount: number;
  enrollmentCapacity: number;
  hasCurrentStudents: boolean;
  currentStudentDetails?: string;
  studentGradeLevels?: string[];
};

export type AgreementsData = {
  platformAgreement: boolean;
};

// =================================================================
// COMBINED ONBOARDING DATA
// =================================================================

// =================================================================
// FLAT ONBOARDING DATA (eliminates nested complexity)
// =================================================================

export type OnboardingFormData = {
  // Personal Information (flattened for easier use)
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  birthDate: string;
  birthCity: string;
  birthStateAbbreviation: string;
  sex: string;
  hispanicLatinoEthnicity?: boolean;
  races?: string[];
  generationCodeSuffix?: string;

  // Role and Experience
  roleType: 'COACH' | 'PARENT' | 'STUDENT';
  experience?: string;
  certificationLevel?: string;
  specialties?: string[];
  bio?: string;
  certifications?: string[];
  yearsOfPriorProfessionalExperience: number;

  // School Information
  nameOfInstitution: string;
  shortNameOfInstitution?: string;
  schoolType: string;
  gradeLevels: string[];
  hasPhysicalLocation: boolean;
  website?: string;
  academicYear: string;

  // Address (flattened)
  schoolStreet?: string;
  schoolCity?: string;
  schoolState?: string;
  schoolZip?: string;
  schoolPhone?: string;

  // School Focus
  sport: string;
  footballType?: string;
  schoolCategories: string[];
  programFocus?: string[];

  // Student Planning
  estimatedStudentCount: number;
  enrollmentCapacity: number;
  hasCurrentStudents: boolean;
  currentStudentDetails?: string;
  studentGradeLevels?: string[];

  // Agreements
  platformAgreement: boolean;

  // System fields
  invitationToken?: string;
  invitationBased: boolean;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
};

// =================================================================
// FINAL SUBMISSION DATA (ready for Amplify)
// =================================================================

export type OnboardingSubmissionData = {
  user: UserCreateInput;
  profile: ProfileCreateInput;
  educationOrganization: EducationOrganizationCreateInput;
  school: SchoolCreateInput;
  staff: StaffCreateInput;

  // Metadata
  invitationToken?: string;
  invitationBased: boolean;
};

// =================================================================
// ONBOARDING FLOW TYPES
// =================================================================

export const ONBOARDING_STEPS = {
  PERSONAL_INFO: 'PERSONAL_INFO',
  ROLE_EXPERIENCE: 'ROLE_EXPERIENCE',
  SCHOOL_SETUP: 'SCHOOL_SETUP',
  SCHOOL_NAME: 'SCHOOL_NAME',
  SCHOOL_FOCUS: 'SCHOOL_FOCUS',
  STUDENT_PLANNING: 'STUDENT_PLANNING',
  AGREEMENTS: 'AGREEMENTS',
  FINALIZE: 'FINALIZE',
  COMPLETE: 'COMPLETE',
} as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[keyof typeof ONBOARDING_STEPS];

export type OnboardingStepData = {
  step: OnboardingStep;
  data: Partial<OnboardingFormData>;
  isValid: boolean;
  errors?: string[];
};

export type OnboardingProgress = {
  userId?: string;
  email: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  formData: OnboardingFormData;
  invitationBased: boolean;
  invitationId?: string;
  lastUpdated: string;
};

// =================================================================
// INVITATION TYPES
// =================================================================

export type InvitationData = {
  token: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  state?: string;
  bio?: string;
  schoolName?: string;
  schoolType?: string;
  sport?: string;
  role?: 'COACH' | 'PARENT';
};

// =================================================================
// VALIDATION TYPES
// =================================================================

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
  missingFields: string[];
};

// =================================================================
// API RESPONSE TYPES
// =================================================================

export type OnboardingApiResponse = {
  status: 'success' | 'error';
  message: string;
  profileId?: string;
  userId?: string;
  staffUSI?: number;
  schoolId?: number;
  errors?: ValidationError[];
};

// =================================================================
// UTILITY TYPES
// =================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Grade level conversion utilities
export const GRADE_LEVEL_MAPPINGS: Record<string, string> = {
  K: 'Kindergarten',
  '1': 'First grade',
  '2': 'Second grade',
  '3': 'Third grade',
  '4': 'Fourth grade',
  '5': 'Fifth grade',
  '6': 'Sixth grade',
  '7': 'Seventh grade',
  '8': 'Eighth grade',
  '9': 'Ninth grade',
  '10': 'Tenth grade',
  '11': 'Eleventh grade',
  '12': 'Twelfth grade',
};

export const convertToEdFiGradeLevels = (grades: string[]): string[] => {
  return grades.map(grade => GRADE_LEVEL_MAPPINGS[grade] || grade);
};

export const convertFromEdFiGradeLevels = (edFiGrades: string[]): string[] => {
  const reverseMapping = Object.fromEntries(
    Object.entries(GRADE_LEVEL_MAPPINGS).map(([k, v]) => [v, k])
  );
  return edFiGrades.map(grade => reverseMapping[grade] || grade);
};
