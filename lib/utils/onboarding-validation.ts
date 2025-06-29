/**
 * Onboarding validation utilities - enforces standardized field naming and requirements
 */

import type { OnboardingFormData, ValidationError, ValidationResult } from '@/lib/types/onboarding';

// Legacy interface for backward compatibility with complete page
export interface RequiredOnboardingData {
  email: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  gender: string;
  location: string;
  role_type: string;
  school_name: string;
  sport: string;
  school_type: string;
}

// Standardized required data interface
export interface RequiredStandardizedData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  birthCity: string;
  birthStateAbbreviation: string;
  sex: string;
  roleType: 'COACH' | 'PARENT' | 'ADMIN' | 'STUDENT';
  nameOfInstitution: string;
  sport: string;
  schoolType: string;
  gradeLevels: string[];
  platformAgreement: boolean;
}

// Legacy validation result interface for complete page compatibility
export interface LegacyValidationResult {
  isValid: boolean;
  missingFields: string[];
  errors: Record<string, string>;
}

// =================================================================
// STANDARDIZED VALIDATION FUNCTIONS
// =================================================================

/**
 * Validate standardized onboarding data
 */
export function validateStandardizedOnboardingData(
  data: Partial<OnboardingFormData>
): ValidationResult {
  const errors: ValidationError[] = [];

  // Personal Information validation
  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!data.firstName?.trim()) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!data.lastName?.trim()) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (!data.phone?.trim()) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  }

  if (!data.birthDate?.trim()) {
    errors.push({ field: 'birthDate', message: 'Birth date is required' });
  } else {
    // Age validation (must be 18+)
    const birthDate = new Date(data.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      errors.push({ field: 'birthDate', message: 'You must be at least 18 years old' });
    }
  }

  if (!data.birthCity?.trim()) {
    errors.push({ field: 'birthCity', message: 'Birth city is required' });
  }

  if (!data.birthStateAbbreviation?.trim()) {
    errors.push({ field: 'birthStateAbbreviation', message: 'Birth state is required' });
  }

  if (!data.sex?.trim()) {
    errors.push({ field: 'sex', message: 'Gender is required' });
  }

  // Role and Experience validation
  if (!data.roleType) {
    errors.push({ field: 'roleType', message: 'Role type is required' });
  }

  if (
    typeof data.yearsOfPriorProfessionalExperience !== 'number' ||
    data.yearsOfPriorProfessionalExperience < 0
  ) {
    errors.push({
      field: 'yearsOfPriorProfessionalExperience',
      message: 'Years of experience is required',
    });
  }

  // School Information validation
  if (!data.nameOfInstitution?.trim()) {
    errors.push({ field: 'nameOfInstitution', message: 'School name is required' });
  }

  if (!data.schoolType?.trim()) {
    errors.push({ field: 'schoolType', message: 'School type is required' });
  }

  if (!data.gradeLevels?.length) {
    errors.push({ field: 'gradeLevels', message: 'At least one grade level is required' });
  }

  if (!data.academicYear?.trim()) {
    errors.push({ field: 'academicYear', message: 'Academic year is required' });
  }

  // School Focus validation
  if (!data.sport?.trim()) {
    errors.push({ field: 'sport', message: 'Primary sport is required' });
  }

  // Football-specific validation
  if (data.sport === 'football' && !data.footballType?.trim()) {
    errors.push({
      field: 'footballType',
      message: 'Football type is required when sport is football',
    });
  }

  if (!data.schoolCategories?.length) {
    errors.push({ field: 'schoolCategories', message: 'At least one school category is required' });
  }

  // Student Planning validation
  if (typeof data.estimatedStudentCount !== 'number' || data.estimatedStudentCount < 0) {
    errors.push({
      field: 'estimatedStudentCount',
      message: 'Valid estimated student count is required',
    });
  }

  if (typeof data.enrollmentCapacity !== 'number' || data.enrollmentCapacity < 0) {
    errors.push({ field: 'enrollmentCapacity', message: 'Valid enrollment capacity is required' });
  }

  // Agreements validation
  if (!data.platformAgreement) {
    errors.push({ field: 'platformAgreement', message: 'Platform agreement must be accepted' });
  }

  return {
    isValid: errors.length === 0,
    errors,
    missingFields: errors.map(error => error.field),
  };
}

/**
 * Validate specific onboarding step
 */
export function validateOnboardingStep(
  step: string,
  data: Partial<OnboardingFormData>
): ValidationResult {
  const errors: ValidationError[] = [];

  switch (step) {
    case 'PERSONAL_INFO':
      if (!data.email?.trim()) errors.push({ field: 'email', message: 'Email is required' });
      if (!data.firstName?.trim())
        errors.push({ field: 'firstName', message: 'First name is required' });
      if (!data.lastName?.trim())
        errors.push({ field: 'lastName', message: 'Last name is required' });
      if (!data.phone?.trim()) errors.push({ field: 'phone', message: 'Phone is required' });
      if (!data.birthDate?.trim())
        errors.push({ field: 'birthDate', message: 'Birth date is required' });
      if (!data.birthCity?.trim())
        errors.push({ field: 'birthCity', message: 'Birth city is required' });
      if (!data.birthStateAbbreviation?.trim())
        errors.push({ field: 'birthStateAbbreviation', message: 'Birth state is required' });
      if (!data.sex?.trim()) errors.push({ field: 'sex', message: 'Gender is required' });
      break;

    case 'ROLE_EXPERIENCE':
      if (!data.roleType) errors.push({ field: 'roleType', message: 'Role type is required' });
      if (typeof data.yearsOfPriorProfessionalExperience !== 'number') {
        errors.push({
          field: 'yearsOfPriorProfessionalExperience',
          message: 'Years of experience is required',
        });
      }
      break;

    case 'SCHOOL_SETUP':
      if (!data.nameOfInstitution?.trim())
        errors.push({ field: 'nameOfInstitution', message: 'School name is required' });
      if (!data.schoolType?.trim())
        errors.push({ field: 'schoolType', message: 'School type is required' });
      if (!data.gradeLevels?.length)
        errors.push({ field: 'gradeLevels', message: 'Grade levels are required' });
      if (!data.academicYear?.trim())
        errors.push({ field: 'academicYear', message: 'Academic year is required' });
      break;

    case 'SCHOOL_FOCUS':
      if (!data.sport?.trim())
        errors.push({ field: 'sport', message: 'Primary sport is required' });
      if (data.sport === 'football' && !data.footballType?.trim()) {
        errors.push({ field: 'footballType', message: 'Football type is required' });
      }
      if (!data.schoolCategories?.length)
        errors.push({ field: 'schoolCategories', message: 'School categories are required' });
      break;

    case 'STUDENT_PLANNING':
      if (typeof data.estimatedStudentCount !== 'number') {
        errors.push({ field: 'estimatedStudentCount', message: 'Student count is required' });
      }
      if (typeof data.enrollmentCapacity !== 'number') {
        errors.push({ field: 'enrollmentCapacity', message: 'Enrollment capacity is required' });
      }
      break;

    case 'AGREEMENTS':
      if (!data.platformAgreement) {
        errors.push({ field: 'platformAgreement', message: 'Platform agreement is required' });
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
    missingFields: errors.map(error => error.field),
  };
}

// =================================================================
// LEGACY VALIDATION FUNCTIONS (for backward compatibility)
// =================================================================

export function validateRequiredFields(data: any): LegacyValidationResult {
  const requiredFields: (keyof RequiredOnboardingData)[] = [
    'email',
    'first_name',
    'last_name',
    'cell_phone',
    'birth_date',
    'gender',
    'location',
    'role_type',
    'school_name',
    'sport',
    'school_type',
  ];

  const missingFields: string[] = [];
  const errors: Record<string, string> = {};

  requiredFields.forEach(field => {
    const value = data[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      missingFields.push(field);
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    }
  });

  // Additional validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.birth_date) {
    const birthDate = new Date(data.birth_date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      errors.birth_date = 'You must be at least 18 years old';
    }
  }

  return {
    isValid: missingFields.length === 0 && Object.keys(errors).length === 0,
    missingFields,
    errors,
  };
}

export function assertRequiredData(data: any): RequiredOnboardingData {
  const validation = validateRequiredFields(data);

  if (!validation.isValid) {
    throw new Error(`Missing required fields: ${validation.missingFields.join(', ')}`);
  }

  return data as RequiredOnboardingData;
}
