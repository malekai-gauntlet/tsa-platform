/**
 * Onboarding Data Transformation Utilities
 * Clean, simple functions to convert between data formats
 */

import type {
  OnboardingFormData,
  OnboardingSubmissionData,
  PersonalInfoData,
  RoleExperienceData,
  SchoolSetupData,
  SchoolFocusData,
  StudentPlanningData,
  AgreementsData,
  UserCreateInput,
  ProfileCreateInput,
  EducationOrganizationCreateInput,
  SchoolCreateInput,
  StaffCreateInput,
  Address,
  CoachPreferences,
  InvitationData,
} from '@/lib/types/onboarding';
import { convertToEdFiGradeLevels } from '@/lib/types/onboarding';

// =================================================================
// DATA TRANSFORMATION FUNCTIONS
// =================================================================

/**
 * Transform invitation data to onboarding form data
 * Pre-fills onboarding form with invitation data
 */
export function transformInvitationToOnboardingData(
  invitationData: InvitationData,
  baseData?: Partial<OnboardingFormData>
): Partial<OnboardingFormData> {
  const transformed: Partial<OnboardingFormData> = {
    ...baseData,

    // Personal Information from invitation
    email: invitationData.email,
    firstName: invitationData.firstName || baseData?.firstName || '',
    lastName: invitationData.lastName || baseData?.lastName || '',
    phone: invitationData.phone || baseData?.phone || '',

    // School Information from invitation
    nameOfInstitution: invitationData.schoolName || baseData?.nameOfInstitution || '',
    schoolType: invitationData.schoolType || baseData?.schoolType || '',
    sport: invitationData.sport || baseData?.sport || '',

    // Location information
    schoolCity: invitationData.city || baseData?.schoolCity || '',
    schoolState: invitationData.state || baseData?.schoolState || '',

    // Role information
    roleType: (invitationData.role || baseData?.roleType || 'COACH') as
      | 'COACH'
      | 'PARENT'
      | 'STUDENT',

    // Bio from invitation
    bio: invitationData.bio || baseData?.bio || '',

    // System fields
    invitationToken: invitationData.token,
    invitationBased: true,
    source: 'invitation' as const,
  };

  return transformed;
}

/**
 * Transform complete onboarding form data into Amplify submission format
 * This replaces the complex transformation logic in the complete page
 * Now works with flattened OnboardingFormData structure
 */
export function transformOnboardingData(formData: OnboardingFormData): OnboardingSubmissionData {
  // Generate unique IDs (will be replaced by backend)
  const userId = `temp_${Date.now()}`;
  const schoolId = Math.floor(Math.random() * 1000000); // Temporary ID

  // Transform User data (direct mapping from flat structure)
  const user: UserCreateInput = {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    role: formData.roleType,
    status: 'PENDING',
  };

  // Create address object if address fields provided
  const address: Address | undefined = formData.schoolStreet
    ? {
        addressType: 'Physical',
        streetNumberName: formData.schoolStreet,
        city: formData.schoolCity || '',
        stateAbbreviation: formData.schoolState || '',
        postalCode: formData.schoolZip || '',
      }
    : undefined;

  // Transform Profile data
  const profile: ProfileCreateInput = {
    userId,
    profileType: formData.roleType,
    bio: formData.bio || '',
    experience: formData.experience || '0',
    specialties: formData.specialties || [],
    certifications: formData.certifications || [],
    onboardingComplete: true,

    // Address (if provided)
    address,

    // Coach preferences (flattened data)
    preferences:
      formData.roleType === 'COACH'
        ? ({
            certificationLevel: formData.certificationLevel,
            programFocus: formData.programFocus || [],
            footballType: formData.footballType,
            hasPhysicalLocation: formData.hasPhysicalLocation,
            website: formData.website,
            academicYear: formData.academicYear,
            estimatedStudentCount: formData.estimatedStudentCount,
            enrollmentCapacity: formData.enrollmentCapacity,
            hasCurrentStudents: formData.hasCurrentStudents,
            currentStudentDetails: formData.currentStudentDetails,
            platformAgreement: formData.platformAgreement,
          } as CoachPreferences)
        : undefined,
  };

  // Transform EducationOrganization data
  const educationOrganization: EducationOrganizationCreateInput = {
    educationOrganizationId: schoolId,
    nameOfInstitution: formData.nameOfInstitution,
    shortNameOfInstitution:
      formData.shortNameOfInstitution || formData.nameOfInstitution.substring(0, 50),
    webSite: formData.website,
    operationalStatus: 'Active',

    addresses: address ? [address] : undefined,
    telephones: formData.schoolPhone
      ? [
          {
            telephoneNumberType: 'Main',
            telephoneNumber: formData.schoolPhone,
          },
        ]
      : undefined,
  };

  // Transform School data
  const school: SchoolCreateInput = {
    schoolId: schoolId,
    schoolType: formData.schoolType,
    gradeLevels: convertToEdFiGradeLevels(formData.gradeLevels),
    schoolCategories: formData.schoolCategories,
  };

  // Transform Staff data (Ed-Fi compliant)
  const staff: StaffCreateInput = {
    staffUniqueId: formData.email, // Use email as unique identifier
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastSurname: formData.lastName,
    generationCodeSuffix: formData.generationCodeSuffix,
    birthDate: formData.birthDate,
    sex: formData.sex,
    personalEmailAddress: formData.email,
    hispanicLatinoEthnicity: formData.hispanicLatinoEthnicity || false,
    races: formData.races,
    yearsOfPriorProfessionalExperience: formData.yearsOfPriorProfessionalExperience || 0,
    isActive: true,
  };

  return {
    user,
    profile,
    educationOrganization,
    school,
    staff,
    invitationToken: formData.invitationToken,
    invitationBased: formData.invitationBased,
  };
}

// =================================================================
// DATA VALIDATION FUNCTIONS
// =================================================================

/**
 * Validate personal info step data (updated for flattened structure)
 */
export function validatePersonalInfo(data: Partial<OnboardingFormData> | PersonalInfoData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.phone?.trim()) errors.push('Phone number is required');
  if (!data.birthDate?.trim()) errors.push('Birth date is required');
  if (!data.birthCity?.trim()) errors.push('Birth city is required');
  if (!data.birthStateAbbreviation?.trim()) errors.push('Birth state is required');
  if (!data.sex?.trim()) errors.push('Gender is required');

  // Address fields
  if (!data.address?.trim()) errors.push('Street address is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.state?.trim()) errors.push('State is required');
  if (!data.zipCode?.trim()) errors.push('ZIP code is required');

  // Email format validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Birth date validation (must be at least 18 years old)
  if (data.birthDate) {
    const birthDate = new Date(data.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      errors.push('Must be at least 18 years old');
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate role experience step data (updated for flattened structure)
 */
export function validateRoleExperience(data: Partial<OnboardingFormData> | RoleExperienceData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.roleType) errors.push('Role type is required');
  if (
    typeof data.yearsOfPriorProfessionalExperience !== 'number' ||
    data.yearsOfPriorProfessionalExperience < 0
  ) {
    errors.push('Years of experience is required');
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate school setup step data (updated for flattened structure)
 */
export function validateSchoolSetup(data: Partial<OnboardingFormData> | SchoolSetupData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.nameOfInstitution?.trim()) errors.push('School name is required');
  if (!data.schoolType) errors.push('School type is required');
  if (!data.gradeLevels?.length) errors.push('At least one grade level is required');
  if (!data.academicYear) errors.push('Academic year is required');

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate school focus step data (updated for flattened structure)
 */
export function validateSchoolFocus(data: Partial<OnboardingFormData> | SchoolFocusData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.sport?.trim()) errors.push('Primary sport is required');
  if (!data.schoolCategories?.length) errors.push('At least one school category is required');

  // Football-specific validation
  if (data.sport === 'football' && !data.footballType) {
    errors.push('Football type is required when sport is football');
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate student planning step data (updated for flattened structure)
 */
export function validateStudentPlanning(data: Partial<OnboardingFormData> | StudentPlanningData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof data.estimatedStudentCount !== 'number' || data.estimatedStudentCount < 0) {
    errors.push('Valid estimated student count is required');
  }
  if (typeof data.enrollmentCapacity !== 'number' || data.enrollmentCapacity < 0) {
    errors.push('Valid enrollment capacity is required');
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate agreements step data (updated for flattened structure)
 */
export function validateAgreements(data: Partial<OnboardingFormData> | AgreementsData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.platformAgreement) errors.push('Platform agreement must be accepted');

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate complete onboarding form data (updated for flattened structure)
 */
export function validateCompleteOnboarding(data: OnboardingFormData): {
  isValid: boolean;
  errors: string[];
} {
  const allErrors: string[] = [];

  const personalInfoResult = validatePersonalInfo(data);
  const roleExperienceResult = validateRoleExperience(data);
  const schoolSetupResult = validateSchoolSetup(data);
  const schoolFocusResult = validateSchoolFocus(data);
  const studentPlanningResult = validateStudentPlanning(data);
  const agreementsResult = validateAgreements(data);

  allErrors.push(
    ...personalInfoResult.errors,
    ...roleExperienceResult.errors,
    ...schoolSetupResult.errors,
    ...schoolFocusResult.errors,
    ...studentPlanningResult.errors,
    ...agreementsResult.errors
  );

  return { isValid: allErrors.length === 0, errors: allErrors };
}

// =================================================================
// DATA DEFAULTS AND INITIALIZATION
// =================================================================

/**
 * Initialize complete onboarding form data with defaults (flattened structure)
 */
export function initializeOnboardingData(): OnboardingFormData {
  return {
    // Personal Information
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    birthDate: '',
    birthCity: '',
    birthStateAbbreviation: '',
    sex: '',
    hispanicLatinoEthnicity: false,
    races: [],
    generationCodeSuffix: '',

    // Role and Experience
    roleType: 'COACH',
    experience: '0',
    certificationLevel: '',
    specialties: [],
    bio: '',
    certifications: [],
    yearsOfPriorProfessionalExperience: 0,

    // School Information
    nameOfInstitution: '',
    shortNameOfInstitution: '',
    schoolType: '',
    gradeLevels: [],
    hasPhysicalLocation: false,
    website: '',
    academicYear: '2024-2025',

    // Address
    schoolStreet: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    schoolPhone: '',

    // School Focus
    sport: '',
    footballType: '',
    schoolCategories: [],
    programFocus: [],

    // Student Planning
    estimatedStudentCount: 0,
    enrollmentCapacity: 100,
    hasCurrentStudents: false,
    currentStudentDetails: '',
    studentGradeLevels: [],

    // Agreements
    platformAgreement: false,

    // System fields
    invitationBased: false,
    currentStep: 'PERSONAL_INFO',
    completedSteps: [],
  };
}

// =================================================================
// STORAGE KEY UTILITIES
// =================================================================

/**
 * Standardized localStorage keys
 */
export const STORAGE_KEYS = {
  PERSONAL_INFO: 'onboarding_personal_info',
  ROLE_EXPERIENCE: 'onboarding_role_experience',
  SCHOOL_SETUP: 'onboarding_school_setup',
  SCHOOL_FOCUS: 'onboarding_school_focus',
  STUDENT_PLANNING: 'onboarding_student_planning',
  AGREEMENTS: 'onboarding_agreements',
  CURRENT_STEP: 'onboarding_current_step',
  COMPLETED_STEPS: 'onboarding_completed_steps',
  INVITATION_TOKEN: 'invitation_token',
  INVITATION_DATA: 'invitation_data',
} as const;

/**
 * Save step data to localStorage with serialization
 */
export function saveStepData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save step data to localStorage:', error);
  }
}

/**
 * Load step data from localStorage with deserialization
 */
export function loadStepData<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load step data from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Clear all onboarding data from localStorage
 */
export function clearOnboardingData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}
