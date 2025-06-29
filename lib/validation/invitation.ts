/**
 * TSA Platform - Invitation Validation
 * 
 * This module provides validation functions for invitation data.
 */

export interface InvitationValidationResult {
  isValid: boolean;
  errors: Array<{ field: string; message: string }>;
}

export interface InvitationValidationData {
  name: string;
  email: string;
  cell: string;
  location: string;
  d1_athletics_count: number;
  bio: string;
}

/**
 * Validates invitation input data
 * @param data The data to validate
 * @returns Validation result with errors (if any)
 */
export function validateInvitationData(data: InvitationValidationData): InvitationValidationResult {
  const errors: Array<{ field: string; message: string }> = [];

  // Required field validation
  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!data.cell?.trim()) {
    errors.push({ field: 'cell', message: 'Phone number is required' });
  } else if (!validatePhone(data.cell)) {
    errors.push({ field: 'cell', message: 'Please provide a valid phone number' });
  }

  if (!data.location?.trim()) {
    errors.push({ field: 'location', message: 'Location is required' });
  }

  if (typeof data.d1_athletics_count !== 'undefined' && data.d1_athletics_count < 0) {
    errors.push({ field: 'd1_athletics_count', message: 'D1 athletics count cannot be negative' });
  }

  if (!data.bio?.trim()) {
    errors.push({ field: 'bio', message: 'Bio is required' });
  } else if (data.bio.length < 10) {
    errors.push({ field: 'bio', message: 'Bio must be at least 10 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates an email address
 * @param email The email to validate
 * @returns Whether the email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * @param phone The phone number to validate
 * @returns Whether the phone number is valid
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Formats a phone number to a consistent format
 * @param phone The phone number to format
 * @returns The formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  return phone;
}

/**
 * Generates a unique invitation token
 * @returns A unique token for the invitation
 */
export function generateInvitationToken(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `coach_${timestamp}_${random}`;
}