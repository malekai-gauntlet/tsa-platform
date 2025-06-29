/**
 * Coach Section Validation Utilities
 *
 * This file provides validation utilities used throughout the Coach section.
 * These functions help ensure data integrity and provide consistent user feedback.
 */

import { EventFormData, TicketType } from '@/lib/types/coach';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates an email address
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * @param phone Phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  // Allow various formats but must have at least 10 digits
  const phoneDigits = phone.replace(/\D/g, '');
  return phoneDigits.length >= 10;
}

/**
 * Validates a date string
 * @param date Date string in YYYY-MM-DD format
 * @returns Boolean indicating if date is valid
 */
export function isValidDate(date: string): boolean {
  if (!date) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

/**
 * Validates a time string
 * @param time Time string in HH:MM format
 * @returns Boolean indicating if time is valid
 */
export function isValidTime(time: string): boolean {
  if (!time) return false;
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
}

/**
 * Validates event form data
 * @param formData Event form data object
 * @returns Validation result with isValid flag and errors object
 */
export function validateEventForm(formData: EventFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Required fields
  if (!formData.title?.trim()) {
    errors.title = 'Event title is required';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Event description is required';
  }

  if (!formData.start_date) {
    errors.start_date = 'Start date is required';
  } else if (!isValidDate(formData.start_date)) {
    errors.start_date = 'Start date is invalid';
  }

  if (!formData.start_time) {
    errors.start_time = 'Start time is required';
  } else if (!isValidTime(formData.start_time)) {
    errors.start_time = 'Start time is invalid';
  }

  // End date/time validation
  if (formData.end_date && !isValidDate(formData.end_date)) {
    errors.end_date = 'End date is invalid';
  }

  if (formData.end_time && !isValidTime(formData.end_time)) {
    errors.end_time = 'End time is invalid';
  }

  // Check end date is after start date if both are provided
  if (formData.start_date && formData.end_date) {
    const start = new Date(`${formData.start_date}T${formData.start_time || '00:00'}`);
    const end = new Date(`${formData.end_date}T${formData.end_time || '23:59'}`);

    if (end < start) {
      errors.end_date = 'End date must be after start date';
    }
  }

  // Registration deadline validation
  if (formData.registration_deadline && !isValidDate(formData.registration_deadline)) {
    errors.registration_deadline = 'Registration deadline is invalid';
  }

  // Capacity validation
  if (formData.capacity && isNaN(Number(formData.capacity))) {
    errors.capacity = 'Capacity must be a number';
  }

  // Ticket validation
  if (formData.ticket_types?.length) {
    const ticketErrors = validateTicketType(formData.ticket_types[0]);
    Object.entries(ticketErrors).forEach(([key, value]) => {
      errors[`ticket_${key}`] = value;
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a ticket type
 * @param ticket Ticket type object
 * @returns Record of error messages
 */
function validateTicketType(ticket: TicketType): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!ticket.name?.trim()) {
    errors.name = 'Ticket name is required';
  }

  if (ticket.cost < 0) {
    errors.cost = 'Ticket cost cannot be negative';
  }

  if (
    ticket.quantity_total !== undefined &&
    (isNaN(Number(ticket.quantity_total)) || Number(ticket.quantity_total) <= 0)
  ) {
    errors.quantity_total = 'Quantity must be a positive number';
  }

  return errors;
}

/**
 * Validates application data
 * @param data Application data object
 * @returns Validation result with isValid flag and errors object
 */
export function validateApplicationData(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.studentName?.trim()) {
    errors.studentName = 'Student name is required';
  }

  if (data.studentAge && (isNaN(Number(data.studentAge)) || Number(data.studentAge) <= 0)) {
    errors.studentAge = 'Age must be a positive number';
  }

  if (data.parentEmail && !isValidEmail(data.parentEmail)) {
    errors.parentEmail = 'Valid parent email is required';
  }

  if (data.parentPhone && !isValidPhone(data.parentPhone)) {
    errors.parentPhone = 'Valid parent phone number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
