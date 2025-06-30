/**
 * Coach Section Utilities
 *
 * This file exports all coach-related utility functions
 * for easier imports throughout the application.
 */

// Export formatters
export * from './formatters';

// Export validation utilities
export * from './validation';

// Export error handling utilities
export * from './errorHandler';

/**
 * Creates a URL for school applications
 * @param location School location
 * @returns Application URL
 */
export function createSchoolApplicationURL(location?: string): string {
  const baseURL = `${window.location.protocol}//${window.location.host}/apply`;
  return location ? `${baseURL}?location=${encodeURIComponent(location)}` : baseURL;
}

/**
 * Gets an avatar image URL for a user
 * @param userId User ID
 * @param name User name
 * @returns Avatar URL
 */
export function getUserAvatar(userId?: string, name?: string): string {
  if (!userId && !name) return '/coach.png';

  // Use Gravatar-style fallback
  const identifier = userId || name || '';
  const hash = btoa(identifier).substring(0, 12);

  // Return a consistent avatar from UI Avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Coach')}&background=004aad&color=fff&size=128&rounded=true&bold=true&length=1`;
}

/**
 * Gets a greeting based on time of day
 * @param name Optional name to include in greeting
 * @returns Greeting string
 */
export function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  let greeting = '';

  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return name ? `${greeting}, ${name}` : greeting;
}

/**
 * Calculates application statistics
 * @param applications Array of applications
 * @returns Statistics object
 */
export function calculateApplicationStats(applications: any[]): {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  waitlist: number;
  thisWeek: number;
} {
  if (!applications || !applications.length) {
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      waitlist: 0,
      thisWeek: 0,
    };
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return {
    total: applications.length,
    pending: applications.filter(app => app.status === 'PENDING').length,
    approved: applications.filter(app => app.status === 'APPROVED').length,
    rejected: applications.filter(app => app.status === 'REJECTED').length,
    waitlist: applications.filter(app => app.status === 'WAITLIST').length,
    thisWeek: applications.filter(app => {
      const createdDate = new Date(app.createdAt);
      return createdDate > oneWeekAgo;
    }).length,
  };
}
