/**
 * Coach Section Formatting Utilities
 *
 * This file provides formatting utilities used throughout the Coach section.
 * Consolidating these functions helps maintain consistency across the UI.
 */

/**
 * Formats a date string to a display format
 * @param dateString ISO date string
 * @param includeTime Whether to include the time in the output
 * @returns Formatted date string
 */
export function formatDate(dateString: string, includeTime = false): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    if (includeTime) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Formats a time string from a date
 * @param dateString ISO date string
 * @returns Formatted time string
 */
export function formatTime(dateString: string): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}

/**
 * Combines separate date and time strings into an ISO date string
 * @param date Date string in YYYY-MM-DD format
 * @param time Time string in HH:MM format
 * @returns ISO date string
 */
export function combineDateAndTime(date: string, time: string): string {
  if (!date || !time) return '';
  try {
    const datetime = new Date(`${date}T${time}`);
    return datetime.toISOString();
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return '';
  }
}

/**
 * Formats a date string to a date and time display format
 * @param dateString ISO date string
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return dateString;
  }
}

/**
 * Returns the appropriate CSS class for a status badge
 * @param status Status string
 * @returns CSS class string for the badge
 */
export function getStatusBadgeVariant(status: string): string {
  const variants: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    WAITLIST: 'bg-blue-100 text-blue-800 border-blue-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
    CONFIRMED: 'bg-green-100 text-green-800 border-green-200',
    COMPLETED: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    DRAFT: 'bg-gray-100 text-gray-800 border-gray-200',
    PUBLISHED: 'bg-green-100 text-green-800 border-green-200',
  };

  // Normalize status to uppercase for consistent matching
  const normalizedStatus = status.toUpperCase();
  return variants[normalizedStatus] || variants.PENDING;
}

/**
 * Returns the appropriate status display text with capitalization
 * @param status Status string
 * @returns Properly formatted status text
 */
export function formatStatusText(status: string): string {
  if (!status) return '';

  // Handle snake_case or kebab-case status values
  const normalizedStatus = status.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ');

  // Capitalize each word
  return normalizedStatus
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a price as a currency string
 * @param price Price number or string
 * @param currency Currency code (defaults to USD)
 * @returns Formatted price string
 */
export function formatPrice(price: number | string, currency = 'USD'): string {
  if (price === undefined || price === null) return '';

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice) || numericPrice === 0) {
    return 'Free';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(numericPrice);
}

/**
 * Generates an address string from address components
 * @param address Address object
 * @returns Formatted address string
 */
export function formatAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}): string {
  if (!address) return '';

  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country !== 'US' ? address.country : '',
  ].filter(Boolean);

  return parts.join(', ');
}

/**
 * Truncates a string with ellipsis if it exceeds maxLength
 * @param str String to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Returns the appropriate color for a status badge used in radix-ui components
 * @param status Status string
 * @returns Color string for use with Badge component
 */
export function getStatusColor(status: string): string {
  if (!status) return 'zinc';

  switch (status.toLowerCase()) {
    case 'scheduled':
    case 'published':
      return 'lime';
    case 'in_progress':
      return 'blue';
    case 'completed':
      return 'zinc';
    case 'cancelled':
    case 'rejected':
      return 'red';
    case 'draft':
      return 'yellow';
    case 'waitlist':
      return 'blue';
    case 'pending':
      return 'amber';
    case 'approved':
    case 'confirmed':
      return 'green';
    default:
      return 'zinc';
  }
}
