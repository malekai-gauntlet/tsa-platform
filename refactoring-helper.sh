#!/bin/bash

# Helper script for refactoring operations in the worktree
# Usage: ./refactoring-helper.sh [command] [args...]

REFACTOR_DIR="/Users/tsaplatformdeveloper/Desktop/tsa-platform-refactor"

# Function to create utility files in the refactoring worktree
create_utility_file() {
  local file_path=$1
  local file_content=$2
  mkdir -p "$(dirname "${REFACTOR_DIR}/${file_path}")"
  echo "${file_content}" > "${REFACTOR_DIR}/${file_path}"
  echo "Created file: ${file_path}"
}

# Function to update files in the refactoring worktree
update_file() {
  local file_path=$1
  local search=$2
  local replace=$3
  sed -i '' "s/${search}/${replace}/g" "${REFACTOR_DIR}/${file_path}"
  echo "Updated file: ${file_path}"
}

# Function to run commands in the refactoring worktree
run_in_worktree() {
  (cd "${REFACTOR_DIR}" && eval "$1")
}

case $1 in
  "create-date-utils")
    echo "Creating date utility file..."
    create_utility_file "lib/utils/dates.ts" "/**
 * Centralized date utilities
 */

/**
 * Format a date with a consistent format, conditionally showing year only if different from current year
 * @param date - Date to format (Date object or string)
 * @param includeYear - Force inclusion of year regardless of whether it's the current year
 * @returns Formatted date string (e.g., 'Jan 15' or 'Jan 15, 2023')
 */
export function formatDate(date: Date | string, includeYear = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const showYear = includeYear || dateObj.getFullYear() !== now.getFullYear();

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: showYear ? 'numeric' : undefined,
  });
}

/**
 * Format a date with weekday
 * @param date - Date to format (Date object or string)
 * @returns Formatted date string with weekday (e.g., 'Mon, Jan 15')
 */
export function formatDateWithWeekday(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date with full details including year
 * @param date - Date to format (Date object or string)
 * @returns Fully formatted date string (e.g., 'January 15, 2023')
 */
export function formatDateFull(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a time
 * @param date - Date to format (Date object or string)
 * @returns Formatted time string (e.g., '3:30 PM')
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format a date range
 * @param startDate - Start date (Date object or string)
 * @param endDate - End date (Date object or string)
 * @returns Formatted date range (e.g., 'Jan 15-17, 2023' or 'Jan 15 - Feb 2, 2023')
 */
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Same month and year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return \`\${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-\${end.getDate()}, \${start.getFullYear()}\`;
  }
  
  // Same year but different months
  if (start.getFullYear() === end.getFullYear()) {
    return \`\${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - \${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, \${start.getFullYear()}\`;
  }
  
  // Different years
  return \`\${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - \${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\`;
}

/**
 * Get the current academic year string (e.g., '2023-2024')
 * @returns Current academic year string
 */
export function getCurrentAcademicYear(): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const academicYearStartMonth = 7; // August (0-indexed months)
  
  // If we're before August, we're in the previous academic year
  if (now.getMonth() < academicYearStartMonth) {
    return \`\${currentYear-1}-\${currentYear}\`;
  } else {
    return \`\${currentYear}-\${currentYear+1}\`;
  }
}

/**
 * Check if a date is in the past
 * @param date - Date to check (Date object or string)
 * @returns True if date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  return dateObj < now;
}

/**
 * Calculate days remaining until a date
 * @param targetDate - Target date (Date object or string)
 * @returns Number of days remaining
 */
export function daysUntil(targetDate: Date | string): number {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
"
    ;;
    
  "create-status-utils")
    echo "Creating status utility file..."
    create_utility_file "lib/utils/status.ts" "/**
 * Centralized status and color utilities
 */

type StatusColorMap = {
  bg: string;
  text: string;
  border: string;
};

/**
 * Get colors for status badges
 * @param status - The status string
 * @returns Object containing background, text, and border colors
 */
export function getStatusBadgeColors(status: string): StatusColorMap {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'active':
    case 'completed':
    case 'approved':
    case 'available':
    case 'published':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200'
      };
      
    case 'pending':
    case 'in progress':
    case 'in-progress':
    case 'current':
    case 'in review':
    case 'under-review':
    case 'waitlist':
    case 'waitlisted':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200'
      };
      
    case 'draft':
    case 'not started':
    case 'inactive':
      return {
        bg: 'bg-zinc-100',
        text: 'text-zinc-800',
        border: 'border-zinc-200'
      };
      
    case 'cancelled':
    case 'rejected':
    case 'failed':
    case 'expired':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-200'
      };
      
    case 'upcoming':
    case 'soon':
    case 'warning':
      return {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-200'
      };
      
    default:
      return {
        bg: 'bg-zinc-100',
        text: 'text-zinc-800',
        border: 'border-zinc-200'
      };
  }
}

/**
 * Get status badge variant for an event
 * @param status - Event status
 * @returns Badge variant for the UI Badge component
 */
export function getEventStatusVariant(status: string): string {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'published':
      return 'default';
    case 'draft':
      return 'secondary';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
}

/**
 * Get status badge text for event status
 * @param status - Event status
 * @returns Human-readable status label
 */
export function getEventStatusLabel(status: string): string {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'published':
      return 'Published';
    case 'draft':
      return 'Draft';
    case 'cancelled':
      return 'Cancelled';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
}

/**
 * Get colors for application status badges
 * @param status - Application status
 * @returns Object containing background, text, and border colors
 */
export function getApplicationStatusColors(status: string): StatusColorMap {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'accepted':
    case 'approved':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200'
      };
      
    case 'pending':
    case 'under-review':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200'
      };
      
    case 'rejected':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-200'
      };
      
    case 'waitlisted':
    case 'waitlist':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-200'
      };
      
    default:
      return {
        bg: 'bg-zinc-100',
        text: 'text-zinc-800',
        border: 'border-zinc-200'
      };
  }
}

/**
 * Get hex color code for a given status (for chart colors, etc.)
 * @param status - Status string
 * @returns Hex color code
 */
export function getStatusHexColor(status: string): string {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'active':
    case 'completed':
    case 'approved':
    case 'accepted':
    case 'published':
      return '#10b981'; // Green
      
    case 'pending':
    case 'in progress':
    case 'in-progress':
    case 'under-review':
      return '#3b82f6'; // Blue
      
    case 'draft':
    case 'inactive':
      return '#6b7280'; // Gray
      
    case 'cancelled':
    case 'rejected':
    case 'failed':
      return '#ef4444'; // Red
      
    case 'waitlisted':
    case 'waitlist':
    case 'upcoming':
      return '#f59e0b'; // Amber
      
    default:
      return '#6b7280'; // Gray
  }
}"
    ;;
    
  "create-validation-utils")
    echo "Creating validation utility file..."
    create_utility_file "lib/utils/validation.ts" "/**
 * Centralized validation utilities
 */

/**
 * Validate an email address
 * @param email - The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML content
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Remove script tags and their contents
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove on* attributes
  sanitized = sanitized.replace(/\s+on\w+=\"[^\"]*\"/gi, '');
  sanitized = sanitized.replace(/\s+on\w+='[^']*'/gi, '');
  
  // Remove data: and javascript: URLs
  const urlAttributeRegex = /\s+(href|src|action)\s*=\s*(['\"]\s*)(javascript:|data:)/gi;
  sanitized = sanitized.replace(urlAttributeRegex, (match, attr, quote) => {
    return ` ${attr}=${quote}#`;
  });
  
  return sanitized;
}

/**
 * Sanitize user input for display in UI
 * @param input - User input string
 * @returns Sanitized string safe for UI display
 */
export function sanitizeUserInput(input: string): string {
  if (!input) return '';
  
  // Escape HTML special chars
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;');
}

/**
 * Validate a phone number
 * @param phone - The phone number to validate
 * @returns Boolean indicating if the phone is valid
 */
export function isValidPhone(phone: string): boolean {
  // Allow formats like: (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Format a phone number to (XXX) XXX-XXXX
 * @param phone - The phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Strip all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if we have a 10-digit number
  if (cleaned.length === 10) {
    return \`(\${cleaned.slice(0, 3)}) \${cleaned.slice(3, 6)}-\${cleaned.slice(6, 10)}\`;
  }
  
  // Just return the original if not properly formattable
  return phone;
}

/**
 * Validate a zip code
 * @param zipCode - The zip code to validate
 * @returns Boolean indicating if the zip code is valid
 */
export function isValidZipCode(zipCode: string): boolean {
  // Basic US zip code validation (5 digits or 5+4)
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
}

/**
 * Validate a required field
 * @param value - The field value
 * @returns Boolean indicating if the field is valid
 */
export function isRequiredFieldValid(value: any): boolean {
  if (value === undefined || value === null) return false;
  
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  return true;
}

/**
 * Create a URL-friendly slug from a string
 * @param input - String to convert to a slug
 * @returns URL-friendly slug
 */
export function createSlug(input: string): string {
  if (!input) return '';
  
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove non-word chars
    .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}"
    ;;
    
  "standardize-event-interface")
    echo "Creating standardized Event interface..."
    create_utility_file "lib/types/events.ts" "/**
 * Standardized Event related interfaces
 */

export enum EventType {
  TRAINING = 'TRAINING',
  BOOTCAMP = 'BOOTCAMP',
  WORKSHOP = 'WORKSHOP',
  COMPETITION = 'COMPETITION',
  CAMP = 'CAMP',
  TOURNAMENT = 'TOURNAMENT',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  ALL_LEVELS = 'ALL_LEVELS',
}

export interface EventAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  formattedAddress?: string;
  lat?: number;
  lng?: number;
}

export interface EventImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface EventPrice {
  amount: number;
  currency: string;
  discountAmount?: number;
  discountCode?: string;
}

/**
 * Comprehensive Event interface used across the application
 */
export interface Event {
  id: string;
  title: string;
  description?: string;
  shortDescription?: string;
  eventType: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  venue?: string;
  location?: EventAddress;
  address?: EventAddress;
  isOnline: boolean;
  capacity?: number;
  registeredCount?: number;
  price?: EventPrice;
  coachId: string;
  coachName?: string;
  tags?: string[];
  images?: EventImage[];
  skillLevel?: SkillLevel;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Event statistics interface
 */
export interface EventStats {
  total: number;
  published: number;
  draft: number;
  upcoming: number;
  totalRegistrations: number;
}

/**
 * Registration for an event
 */
export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'WAITLIST';
  registeredAt: string;
  attendeeInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  paymentStatus?: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  paymentAmount?: number;
  notes?: string;
}

/**
 * Transform an event from GraphQL to our standardized format
 * @param graphqlEvent - Event from GraphQL API
 * @returns Standardized Event object
 */
export function transformEventFromGraphQL(graphqlEvent: any): Event {
  if (!graphqlEvent) return null as unknown as Event;
  
  return {
    id: graphqlEvent.id,
    title: graphqlEvent.title,
    description: graphqlEvent.description,
    shortDescription: graphqlEvent.shortDescription,
    eventType: graphqlEvent.eventType as EventType,
    status: graphqlEvent.status as EventStatus,
    startDate: graphqlEvent.startDate,
    endDate: graphqlEvent.endDate,
    venue: graphqlEvent.venue,
    location: graphqlEvent.location,
    address: graphqlEvent.address,
    isOnline: graphqlEvent.isOnline || false,
    capacity: graphqlEvent.capacity,
    registeredCount: graphqlEvent.registeredCount || 0,
    price: graphqlEvent.price ? {
      amount: graphqlEvent.price.amount || 0,
      currency: graphqlEvent.price.currency || 'USD',
      discountAmount: graphqlEvent.price.discountAmount,
      discountCode: graphqlEvent.price.discountCode
    } : undefined,
    coachId: graphqlEvent.coachId,
    coachName: graphqlEvent.coachName,
    tags: graphqlEvent.tags || [],
    images: graphqlEvent.images || [],
    skillLevel: graphqlEvent.skillLevel as SkillLevel,
    isPublic: graphqlEvent.isPublic || false,
    createdAt: graphqlEvent.createdAt,
    updatedAt: graphqlEvent.updatedAt
  };
}
"
    ;;
    
  "build")
    echo "Building the project in the worktree..."
    run_in_worktree "npm run build"
    ;;
    
  "lint")
    echo "Running linter in the worktree..."
    run_in_worktree "npm run lint"
    ;;
    
  "commit")
    echo "Committing changes in the worktree..."
    run_in_worktree "git add ."
    run_in_worktree "git commit -m \"$2\""
    ;;
    
  *)
    echo "Unknown command: $1"
    echo "Available commands:"
    echo "  create-date-utils        Create centralized date utility file"
    echo "  create-status-utils      Create centralized status utility file"
    echo "  create-validation-utils  Create centralized validation utility file"
    echo "  standardize-event-interface Create standardized Event interface"
    echo "  build                    Build the project in the worktree"
    echo "  lint                     Run linter in the worktree"
    echo "  commit \"message\"         Commit changes in the worktree"
    ;;
esac